#!/usr/bin/env python3
"""Prøveeksamen 4 i FIE432: alle tall regnes her og skriptet bygger prove4.json.

«Ligner H2023 og kursgodkjenningen 2026» (docs/fie432-proveeksamen-spek.md, delen
«Kalibrering mot skoleeksamen»). Skatt 21 ledd, finans 9 ledd.

Kjør:  python3 -I prove4_regn.py  [utfil]
Standard utfil er prove4.json i samme mappe som skriptet.
Fasitposisjonene leses fra fasitplan.json (nøkkel p4) i samme mappe.

Skriptet sjekker
- at riktig svar står der fasitplanen sier
- at hvert talls alternativ inneholder tallet skriptet har regnet
- skrivereglene: ingen tankestrek, ingen komma foran «og»
- kalibreringen: ord per ledd og andel ledd med tallsvar, målt som tools/sjekk-prove.js
"""
import json, math, os, re, sys

HER = os.path.dirname(os.path.abspath(__file__))
PLAN = json.load(open(os.path.join(HER, "fasitplan.json")))["p4"]
UT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HER, "prove4.json")

# ------------------------------------------------------------------ hjelpere
MINUS = "−"
GT, LT = "&gt;", "&lt;"


def tall(x, d=0):
    """Norsk talltekst: mellomrom som tusenskille, desimalkomma, ekte minus."""
    s = f"{abs(x):,.{d}f}".replace(",", " ").replace(".", ",")
    return (MINUS if round(x, d) < 0 else "") + s


def kr(x, d=0):
    return "kr " + tall(x, d)


def Kr(x, d=0):
    return "Kr " + tall(x, d)


def pst(f, d=1):
    return tall(f * 100, d) + " %"


def lik(a, b, tol=1e-6):
    assert abs(a - b) < tol, (a, b)


LEDD = []      # (merke, alternativer, posisjon)
TALLSJEKK = []  # (merke, alternativer, liste med tall-tekster som skal stå i hvert alternativ)


def ledd(merke, riktig, gale, tallbiter=None):
    """Plasser riktig alternativ der fasitplanen sier. gale = tre alternativer i rekkefølge.

    tallbiter: (riktig_bit, [gale_bit, ...]) med tallene skriptet har regnet, formatert.
    Hvert alternativ må inneholde sin bit. Sjekkes til slutt."""
    pos = PLAN[len(LEDD)]
    assert len(gale) == 3
    opts = list(gale)
    opts.insert(pos, riktig)
    assert len(set(opts)) == 4, opts
    LEDD.append((merke, opts, pos))
    if tallbiter is not None:
        rb, gb = tallbiter
        biter = list(gb)
        biter.insert(pos, rb)
        TALLSJEKK.append((merke, opts, biter))
    return opts, pos


def losning(regel, steg, gale, kontroll, strategi=None, ekstra=None):
    s = f"<p><b>Regelen.</b> {regel}</p>"
    if ekstra:
        s += ekstra
    s += "<p><b>Regnestykket.</b></p><p>" + "<br>".join(f"{i}. {t}" for i, t in enumerate(steg, 1)) + "</p>"
    s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(gale) + "</p>"
    s += f"<p><b>Kontroll.</b> {kontroll}</p>"
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    return s


def begrep(regel, gale, kontroll=None, strategi=None, begrunnelse=None, ekstra=None):
    s = f"<p><b>Regelen.</b> {regel}</p>"
    if begrunnelse:
        s += f"<p><b>Begrunnelsen.</b> {begrunnelse}</p>"
    if ekstra:
        s += ekstra
    s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(gale) + "</p>"
    if kontroll:
        s += f"<p><b>Kontroll.</b> {kontroll}</p>"
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    return s


def tabell(hode, rader):
    s = '<table class="data"><tr>' + "".join(f"<th>{h}</th>" for h in hode) + "</tr>"
    for r in rader:
        s += "<tr>" + "".join(f'<td>{c}</td>' if i == 0 else f'<td class="n">{c}</td>' for i, c in enumerate(r)) + "</tr>"
    return s + "</table>"


EX = []
tA, f = 0.22, 1.72
te = f * tA
lik(te, 0.3784)

# =========================================================== OPPGAVE 1 (ledd 1 til 3)
# Skjermingskjeden over fire år (jf. H2023 1, mc2026 1)
K1 = 40_000
R1 = [0.03, 0.02, 0.035, 0.025]
D1 = [400, 2_000, 600, 0]
rad1 = []
ub = 0.0
for r, D in zip(R1, D1):
    S = K1 + ub
    fr = S * r
    samlet = fr + ub
    skpl = max(0.0, D - samlet)
    ub_ut = max(0.0, samlet - D)
    rad1.append(dict(S=S, r=r, fr=fr, samlet=samlet, D=D, skpl=skpl, ub=ub_ut))
    ub = ub_ut
lik(rad1[0]["ub"], 800); lik(rad1[1]["fr"], 816); lik(rad1[1]["skpl"], 384)
lik(rad1[2]["S"], 40_000); lik(rad1[2]["ub"], 800); lik(rad1[3]["fr"], 1_020); lik(rad1[3]["ub"], 1_820)
for r in rad1:
    print("  år: grunnlag {S:9.2f} rente {r:.3f} fradrag {fr:8.2f} samlet {samlet:8.2f} utbytte {D:5} skpl {skpl:7.2f} ubenyttet {ub:8.2f}".format(**r))

# a) skattepliktig utbytte år 2
a1 = rad1[1]["skpl"]
a1_ikke_trukket = D1[1] - rad1[1]["fr"]                    # lagt til grunnlaget, ikke trukket fra
a1_ikke_grunnlag = D1[1] - K1 * R1[1] - rad1[0]["ub"]      # trukket fra, grunnlaget ikke økt
a1_glemt = D1[1] - K1 * R1[1]                              # framføringen glemt helt
lik(a1_ikke_trukket, 1_184); lik(a1_ikke_grunnlag, 400); lik(a1_glemt, 1_200)
# kontroll: framført skjerming forrenter seg
lik(rad1[0]["ub"] * (1 + R1[1]) + K1 * R1[1], rad1[1]["samlet"])

# b) akkumulert ubenyttet ved utgangen av år 4
b1 = rad1[3]["ub"]
b1_ikke_grunnlag = rad1[2]["ub"] + K1 * R1[3]              # grunnlaget i år 4 ikke økt
b1_bare_aar = rad1[3]["fr"]                                # bare årets skjerming i år 4
b1_aar3 = rad1[2]["ub"]                                    # beholdningen ved utgangen av år 3
ub2_w = rad1[0]["ub"]                                      # feil: de 800 nullstilles ikke i år 2
ub3_w = ub2_w + (K1 + ub2_w) * R1[2] - D1[2]
b1_ikke_nullstilt = ub3_w + (K1 + ub3_w) * R1[3]
lik(ub3_w, 1_628); lik(b1_ikke_nullstilt, 2_668.70)
lik(b1_ikke_grunnlag, 1_800)
lik(K1 * (1 + R1[3]) + rad1[2]["ub"] * (1 + R1[3]) - K1, b1)  # grunnlaget vokser med renten

# c) skatt på gevinsten i år 5
salg1, r5 = 46_000, 0.03
gev1 = salg1 - K1 - b1
skatt1 = gev1 * te
lik(gev1, 4_180); lik(round(skatt1, 2), 1_581.71)
c1_salgsaar = (gev1 - (K1 + b1) * r5) * te                 # skjerming også for salgsåret
c1_opp = gev1 * tA                                         # oppjustering glemt (bare til løsningen)
c1_begge = (salg1 - K1) * tA                               # ubenyttet skjerming og oppjustering glemt
lik(c1_begge, 1_320)
c1_ub = (salg1 - K1) * te                                  # ubenyttet skjerming glemt
lik(gev1 * 1.72 * 0.22, skatt1)
print(f"  1c: gevinst {gev1}, skatt {skatt1:.4f}; salgsår {c1_salgsaar:.4f}; uten oppj {c1_opp:.2f}; uten ub {c1_ub:.2f}")

o1a, p1a = ledd("1a", Kr(a1), [Kr(a1_ikke_trukket), Kr(a1_ikke_grunnlag), Kr(a1_glemt)],
                (tall(a1), [tall(a1_ikke_trukket), tall(a1_ikke_grunnlag), tall(a1_glemt)]))
o1b, p1b = ledd("1b", Kr(b1, 2), [Kr(b1_ikke_grunnlag, 2), Kr(b1_bare_aar, 2), Kr(b1_ikke_nullstilt, 2)],
                (tall(b1, 2), [tall(b1_ikke_grunnlag, 2), tall(b1_bare_aar, 2), tall(b1_ikke_nullstilt, 2)]))
o1c, p1c = ledd("1c", Kr(skatt1, 2), [Kr(c1_salgsaar, 2), Kr(c1_begge, 2), Kr(c1_ub, 2)],
                (tall(skatt1, 2), [tall(c1_salgsaar, 2), tall(c1_begge, 2), tall(c1_ub, 2)]))

tab1 = tabell(["År", "Skjermingsrente", "Utbytte (kr)"],
              [[str(i + 1), pst(r, 1 if (r * 1000) % 10 else 0), tall(D)] for i, (r, D) in enumerate(zip(R1, D1))])
tab1_los = tabell(["År", "Grunnlag", "Rente", "Årets skjerming", "Utbytte", "Skattepliktig", "Ubenyttet ved årets slutt"],
                  [[str(i + 1), tall(x["S"]), pst(x["r"], 1 if (x["r"] * 1000) % 10 else 0), tall(x["fr"]), tall(x["D"]),
                    tall(x["skpl"]), tall(x["ub"])] for i, x in enumerate(rad1)])

EX.append({
    "n": 1, "title": "Skjermingskjeden over fire år og gevinst ved salg",
    "points": 9, "topic": "Skjerming", "chapters": [5],
    "body": (f"<p>Tuva kjøpte i januar år 1 én aksje i Sognefisk ASA for {kr(K1)}. Hun eier aksjen ved utgangen av år 1, 2, 3 og 4. "
             f"Skjermingsrenten og utbyttet hun mottar, er:</p>{tab1}<p>Med skattepliktig utbytte menes beløpet før oppjustering.</p>"),
    "parts": [
        {"label": "a", "points": 3, "body": "<p>Hva er skattepliktig utbytte i år 2?</p>",
         "options": o1a, "answer": p1a,
         "solution": losning(
             "Skjerming som ikke brukes, framføres. Den teller to ganger året etter: den legges til skjermingsgrunnlaget og trekkes i tillegg fra utbyttet sammen med årets fradrag.",
             [f"År 1: skjerming {tall(K1)} × 3 % = {tall(K1*R1[0])}. Utbyttet er {tall(D1[0])}, så {tall(rad1[0]['ub'])} framføres.",
              f"År 2: grunnlaget er {tall(K1)} + {tall(rad1[0]['ub'])} = {tall(rad1[1]['S'])} og årets fradrag {tall(rad1[1]['S'])} × 2 % = {tall(rad1[1]['fr'])}.",
              f"Skattepliktig utbytte: {tall(D1[1])} {MINUS} {tall(rad1[1]['fr'])} {MINUS} {tall(rad1[0]['ub'])} = <b>{kr(a1)}</b>."],
             [f"<b>{Kr(a1_ikke_trukket)}</b> = {tall(D1[1])} {MINUS} {tall(rad1[1]['fr'])}. Du har lagt de {tall(rad1[0]['ub'])} til grunnlaget, men glemt å trekke dem fra.",
              f"<b>{Kr(a1_ikke_grunnlag)}</b> = {tall(D1[1])} {MINUS} {tall(K1*R1[1])} {MINUS} {tall(rad1[0]['ub'])}. Du har trukket dem fra, men regnet årets fradrag av kostprisen.",
              f"<b>{Kr(a1_glemt)}</b> = {tall(D1[1])} {MINUS} {tall(K1*R1[1])}. Du har glemt framføringen helt."],
             f"Framført skjerming forrenter seg med årets rente: {tall(rad1[0]['ub'])} × 1,02 + {tall(K1)} × 2 % = {tall(rad1[0]['ub']*1.02)} + {tall(K1*R1[1])} = {tall(rad1[1]['samlet'])}. "
             f"{tall(D1[1])} {MINUS} {tall(rad1[1]['samlet'])} = {tall(a1)}. ✓ Utbyttet er større enn det samlede fradraget, så ingenting framføres til år 3.",
             f"Alle tre feilene utelater en del av skjermingen og gir for høyt tall. Ser du at år 1 ga ubenyttet skjerming, kan du stryke {kr(a1_glemt)} med en gang.")},
        {"label": "b", "points": 3, "body": "<p>Hvor stor er akkumulert ubenyttet skjerming ved utgangen av år 4?</p>",
         "options": o1b, "answer": p1b,
         "solution": losning(
             "Ubenyttet skjerming framføres og legges til grunnlaget. Når et utbytte bruker den opp, er grunnlaget igjen bare kostprisen.",
             [f"År 2 bruker opp alt (se a), så grunnlaget i år 3 er {tall(K1)}. Skjerming {tall(K1)} × 3,5 % = {tall(rad1[2]['fr'])}. Utbyttet er {tall(D1[2])}, så {tall(rad1[2]['ub'])} framføres.",
              f"År 4: grunnlaget er {tall(K1)} + {tall(rad1[2]['ub'])} = {tall(rad1[3]['S'])} og skjermingen {tall(rad1[3]['S'])} × 2,5 % = {tall(rad1[3]['fr'])}. Ingen utbytte.",
              f"Akkumulert ubenyttet: {tall(rad1[2]['ub'])} + {tall(rad1[3]['fr'])} = <b>{kr(b1)}</b>."],
             [f"<b>{Kr(b1_ikke_grunnlag, 2)}</b> = {tall(rad1[2]['ub'])} + {tall(K1)} × 2,5 %. Du har ikke lagt de {tall(rad1[2]['ub'])} til grunnlaget i år 4.",
              f"<b>{Kr(b1_bare_aar, 2)}</b> er bare årets skjerming i år 4. Resten fra år 3 er glemt.",
              f"<b>{Kr(b1_ikke_nullstilt, 2)}</b>: framføringen fra år 1 er ikke nullstilt, selv om utbyttet i år 2 brukte den opp. Da følger de {tall(ub2_w)} med videre: "
              f"{tall(ub2_w)} + {tall(K1 + ub2_w)} × 3,5 % {MINUS} {tall(D1[2])} = {tall(ub3_w)} i år 3 og {tall(ub3_w)} + {tall(K1 + ub3_w)} × 2,5 % = {tall(b1_ikke_nullstilt, 2)} i år 4."],
             f"I et år uten utbytte vokser grunnlaget med renten: {tall(rad1[3]['S'])} × 1,025 = {tall(rad1[3]['S']*1.025)}. Trekk fra kostprisen: {tall(rad1[3]['S']*1.025)} {MINUS} {tall(K1)} = {tall(b1)}. ✓",
             ekstra=tab1_los)},
        {"label": "c", "points": 3,
         "body": "<p>Tuva selger aksjen i mai år 5 for kr 46 000. Skjermingsrenten for år 5 blir 3 %. Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Hvor mye skatt betaler hun på gevinsten? Svar med to desimaler.</p>",
         "options": o1c, "answer": p1c,
         "solution": losning(
             "Skattepliktig gevinst = salgspris − kostpris − framført ubenyttet skjerming. Skjermingen for et år går til den som eier aksjen 31. desember, så den som selger før årsskiftet, får ingen skjerming for salgsåret. Gevinsten ganges med 1,72 og 22 %.".replace("−", MINUS),
             [f"Ubenyttet skjerming fra b: {tall(b1)}. Ingen skjerming for år 5, fordi Tuva ikke eier aksjen ved årsskiftet.",
              f"Gevinst: {tall(salg1)} {MINUS} {tall(K1)} {MINUS} {tall(b1)} = {tall(gev1)}.",
              f"Skatt: {tall(gev1)} × 1,72 × 22 % = {tall(gev1)} × 37,84 % = <b>{kr(skatt1, 2)}</b>."],
             [f"<b>{Kr(c1_salgsaar, 2)}</b>: skjerming for år 5 er trukket fra i tillegg, {tall(K1+b1)} × 3 % = {tall((K1+b1)*r5, 2)}. Renten for år 5 er støy.",
              f"<b>{Kr(c1_begge, 2)}</b> = {tall(salg1 - K1)} × 22 %. Både den ubenyttede skjermingen og oppjusteringen er glemt.",
              f"<b>{Kr(c1_ub, 2)}</b> = {tall(salg1 - K1)} × 37,84 %. Den ubenyttede skjermingen er glemt."],
             f"Begge veier: {tall(gev1)} × 1,72 = {tall(gev1*1.72, 2)} og {tall(gev1*1.72, 2)} × 22 % = {tall(skatt1, 2)}. ✓",
             f"Alle de gale alternativene er ett eller to glemte ledd. Skriv ned gevinsten før du ganger med satsen, så ser du hvilket ledd som mangler. Glemmer du bare oppjusteringen, får du {kr(c1_opp, 2)}, som ikke står blant alternativene.")},
    ],
})

# =========================================================== OPPGAVE 2 (ledd 4 og 5)
# Oppjusteringsfaktoren som gir en bestemt samlet sats, og samlet sats med skjerming (jf. H2023 2, mc2026 3)
ts2, tn2, mal2 = 0.25, 0.25, 0.55
y2 = (mal2 - ts2) / ((1 - ts2) * tn2)
lik(y2, 1.6)
y2_sum = (mal2 - ts2) / tn2            # nominelle satser lagt sammen
y2_uten = mal2 / tn2                   # selskapsskatten glemt
lik(y2_sum, 1.2); lik(y2_uten, 2.2)
samlet_172 = ts2 + (1 - ts2) * tn2 * 1.72
te2 = tn2 * y2
lik(te2, 0.40)

O2, skj2 = 400_000, 60_000
sel2 = O2 * ts2
utb2 = O2 - sel2
eier2 = (utb2 - skj2) * te2
b2 = (sel2 + eier2) / O2
lik(b2, 0.49)
b2_uten_skj = (sel2 + utb2 * te2) / O2
b2_paa_utb = eier2 / utb2                             # bare til kontroll
b2_y12 = (sel2 + (utb2 - skj2) * tn2 * y2_sum) / O2   # faktoren 1,2 fra fella i a
b2_uten_opp = (sel2 + (utb2 - skj2) * tn2) / O2
lik(b2_uten_skj, 0.55); lik(b2_paa_utb, 0.32); lik(b2_uten_opp, 0.40); lik(b2_y12, 0.43)

o2a, p2a = ledd("2a", tall(y2, 1), [tall(y2_sum, 1), "1,72", tall(y2_uten, 1)],
                (tall(y2, 1), [tall(y2_sum, 1), "1,72", tall(y2_uten, 1)]))
o2b, p2b = ledd("2b", pst(b2, 0), [pst(b2_uten_skj, 0), pst(b2_y12, 0), pst(b2_uten_opp, 0)],
                (tall(b2 * 100), [tall(b2_uten_skj * 100), tall(b2_y12 * 100), tall(b2_uten_opp * 100)]))

EX.append({
    "n": 2, "title": "Reform: oppjusteringsfaktoren og samlet skattesats",
    "points": 6, "topic": "Effektiv skattesats", "chapters": [5, 1],
    "body": ("<p>Regjeringen vurderer en reform. Selskapsskatten skal være 25 %. Eierskatten beregnes ved at skattepliktig utbytte "
             "ganges med en oppjusteringsfaktor og deretter med 25 %. Skjermingsfradraget beholdes.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Faktoren skal settes slik at selskapet og eieren til sammen betaler kr 55 i skatt av hver kr 100 selskapet tjener og deler ut, når eieren ikke har skjerming. Hva må oppjusteringsfaktoren være?</p>",
         "options": o2a, "answer": p2a,
         "solution": losning(
             "Samlet sats på utdelt overskudd = t<sub>s</sub> + (1 − t<sub>s</sub>) × t × y. Eierskatten treffer bare det som er igjen etter selskapsskatten.".replace("−", MINUS),
             ["25 % + 75 % × 25 % × y = 55 %.",
              "18,75 % × y = 30 %.",
              f"y = 30/18,75 = <b>{tall(y2, 1)}</b>."],
             [f"<b>{tall(y2_sum, 1)}</b> = (55 {MINUS} 25)/25. Du har lagt satsene sammen som om eierskatten traff hele overskuddet.",
              f"<b>1,72</b> er dagens faktor. Med 25 % gir den 25 % + 75 % × 43 % = {pst(samlet_172, 2)}.",
              f"<b>{tall(y2_uten, 1)}</b> = 55/25. Du har glemt selskapsskatten."],
             f"Effektiv eierskatt blir 25 % × {tall(y2, 1)} = {pst(te2, 0)}. Av 100 kroner overskudd går 25 i selskapsskatt og 75 × 40 % = 30 i eierskatt, til sammen 55. ✓",
             "Den vanligste feilen er å legge satsene sammen. Sjekk alltid svaret ved å regne 100 kroner gjennom begge skattene.")},
        {"label": "b", "points": 3,
         "body": "<p>Bruk faktoren fra a. Brattli AS tjener kr 400 000 før skatt og deler ut alt som er igjen etter selskapsskatt. Eieren har kr 60 000 i skjermingsfradrag. Hva blir samlet effektiv skattesats på overskuddet?</p>",
         "options": o2b, "answer": p2b,
         "solution": losning(
             "Samlet effektiv sats = (selskapsskatt + eierskatt)/overskudd før skatt. Eierskatten regnes av utbyttet minus skjermingen, oppjustert med faktoren.",
             [f"Selskapsskatt: {tall(O2)} × 25 % = {tall(sel2)}. Utbytte: {tall(utb2)}.",
              f"Eierskatt: ({tall(utb2)} {MINUS} {tall(skj2)}) × {tall(y2, 1)} × 25 % = {tall(utb2 - skj2)} × 40 % = {tall(eier2)}.",
              f"Samlet: ({tall(sel2)} + {tall(eier2)})/{tall(O2)} = <b>{pst(b2, 0)}</b>."],
             [f"<b>{pst(b2_uten_skj, 0)}</b>: skjermingen er glemt. Det er målet fra a.",
              f"<b>{pst(b2_y12, 0)}</b> = ({tall(sel2)} + {tall(utb2 - skj2)} × 1,2 × 25 %)/{tall(O2)}. Faktoren 1,2 fra fella i a er brukt.",
              f"<b>{pst(b2_uten_opp, 0)}</b> = ({tall(sel2)} + {tall(utb2 - skj2)} × 25 %)/{tall(O2)}. Oppjusteringen er glemt."],
             f"Skjermingen sparer {tall(skj2)} × 40 % = {tall(skj2*te2)} i eierskatt, altså {pst(skj2*te2/O2, 0)} av overskuddet: 55 % {MINUS} 6 % = 49 %. ✓",
             "Hvert galt alternativ har nøyaktig én feil: skjermingen er glemt, oppjusteringen er glemt eller faktoren fra a er gal. Kontroller a før du regner b.")},
    ],
})

# =========================================================== OPPGAVE 3 (ledd 6)
# Formuesskatt der gjeldsreduksjonen avgjør (jf. H2023 3)
MV3 = {"bolig": 8_000_000, "fond": 12_000_000}
FVf3 = {"bolig": 0.25, "fond": 0.80}
G3, bf3, ft3 = 10_000_000, 1_900_000, 0.01
sumMV3 = sum(MV3.values())
FV3 = {k: MV3[k] * FVf3[k] for k in MV3}
gj3 = {k: G3 * MV3[k] / sumMV3 for k in MV3}
fr3 = {"bolig": gj3["bolig"], "fond": gj3["fond"] * 0.8}
netto3 = sum(FV3.values()) - sum(fr3.values())
skatt3 = max(0.0, netto3 - bf3) * ft3
lik(netto3, 2_800_000); lik(skatt3, 9_000)
uten_red3 = max(0.0, sum(FV3.values()) - G3 - bf3) * ft3                 # ingen gjeldsreduksjon
alt_red3 = max(0.0, sum(FV3.values()) - G3 * 0.8 - bf3) * ft3            # boliggjelden også redusert
sumFV3 = sum(FV3.values())
fr_fv3 = G3 * FV3["bolig"] / sumFV3 + G3 * FV3["fond"] / sumFV3 * 0.8    # fordelt etter formuesverdi
fv_fordelt3 = max(0.0, sumFV3 - fr_fv3 - bf3) * ft3
lik(uten_red3, 0); lik(alt_red3, 17_000)
print(f"  3: netto {netto3:,.0f}, skatt {skatt3:,.0f}; uten red {uten_red3}; alt red {alt_red3}; etter FV {fv_fordelt3:.2f}")
lik(G3 * (1 - 0.2 * MV3["fond"] / sumMV3), sum(fr3.values()))

o3, p3 = ledd("3", Kr(skatt3), [Kr(uten_red3), Kr(alt_red3), Kr(fv_fordelt3)],
              (tall(skatt3), [tall(uten_red3), tall(alt_red3), tall(fv_fordelt3)]))
tab3 = tabell(["Rad", "Primærbolig", "Aksjefond", "Sum"], [
    ["Markedsverdi", tall(MV3["bolig"]), tall(MV3["fond"]), tall(sumMV3)],
    ["Andel", pst(MV3["bolig"] / sumMV3, 0), pst(MV3["fond"] / sumMV3, 0), "100 %"],
    ["Formuesverdi", tall(FV3["bolig"]), tall(FV3["fond"]), tall(sumFV3)],
    ["Gjeld fordelt", tall(gj3["bolig"]), tall(gj3["fond"]), tall(G3)],
    ["Fradragsberettiget gjeld", tall(fr3["bolig"]), tall(fr3["fond"]), tall(sum(fr3.values()))],
])
EX.append({
    "n": 3, "title": "Formuesskatt med bolig, fond og gjeld",
    "points": 3, "topic": "Formuesskatt", "chapters": [7],
    "body": ("<p>Sander er enslig og eier en primærbolig med markedsverdi kr 8 mill. og et aksjefond med markedsverdi kr 12 mill. "
             "Gjelden er kr 10 mill. Boligen verdsettes til 25 % og fondet til 80 %. Gjelden fordeles forholdsmessig etter markedsverdi. "
             "Gjeld som faller på fondet, reduseres med 20 %. Gjeld som faller på boligen, reduseres ikke. "
             "Formuesskatten er 1,0 % av nettoformuen over et bunnfradrag på kr 1,9 mill. Hva betaler Sander i formuesskatt?</p>"),
    "options": o3, "answer": p3,
    "solution": losning(
        "Gjelden fordeles etter markedsverdiene. Den delen som faller på aksjefondet, reduseres med aksjerabatten på 20 %. Den delen som faller på primærboligen, trekkes fra fullt. Skatten er 1,0 % av nettoformuen over bunnfradraget.",
        [f"Andeler 40/60: {tall(gj3['bolig'])} av gjelden faller på boligen og {tall(gj3['fond'])} på fondet.",
         f"Fradragsberettiget gjeld: {tall(gj3['bolig'])} + {tall(gj3['fond'])} × 0,8 = {tall(sum(fr3.values()))}.",
         f"Nettoformue: {tall(sumFV3)} {MINUS} {tall(sum(fr3.values()))} = {tall(netto3)}. Skatt: ({tall(netto3)} {MINUS} {tall(bf3)}) × 1 % = <b>{kr(skatt3)}</b>."],
        [f"<b>{Kr(uten_red3)}</b>: gjelden er trukket fra uten reduksjon. Da blir nettoformuen {tall(sumFV3 - G3)}, under bunnfradraget. Reduksjonen avgjør om Sander betaler skatt.",
         f"<b>{Kr(alt_red3)}</b>: hele gjelden er redusert med 20 %, også boliggjelden. Nettoformuen blir {tall(sumFV3 - 0.8*G3)}.",
         f"<b>{Kr(fv_fordelt3)}</b>: gjelden er fordelt etter formuesverdi ({tall(FV3['fond'])}/{tall(sumFV3)} på fondet) i stedet for etter markedsverdi."],
        f"Snarvei: fradragsberettiget gjeld = {tall(G3)} × (1 {MINUS} 0,2 × 12/20) = {tall(G3)} × 0,88 = {tall(sum(fr3.values()))}. ✓",
        "Formuesverdien på 11,6 mill. er bare så vidt over gjelden på 10 mill. Da vet du at gjeldsreduksjonen avgjør. Kr 0 er fella.",
        ekstra=tab3),
})

# =========================================================== OPPGAVE 4 (ledd 7 og 8)
# Formuesskatt utløst av et selskap (jf. H2023 4)
FV4, rab4, fs4 = 1_500_000, 0.80, 0.01
O4, ts4 = 40_000, 0.22
tn4, y4 = 0.25, 1.6
te4 = tn4 * y4
F4 = FV4 * rab4 * fs4
D4 = F4 / (1 - te4)
lik(F4, 12_000); lik(D4, 20_000)
a4_oppaa = F4 * (1 + te4)
a4_uten_opp = F4 / (1 - tn4)
a4_bare_F = F4
lik(a4_oppaa, 16_800); lik(a4_uten_opp, 16_000)
lik(D4 - D4 * te4, F4)
sel4 = O4 * ts4
b4 = (sel4 + F4) / O4
lik(b4, 0.52)
b4_bare_F = F4 / O4
b4_uten_rab = (sel4 + FV4 * fs4) / O4
b4_utbytte = (sel4 + D4) / O4
b4_nevner = (sel4 + F4) / (O4 - sel4)          # delt på overskuddet etter selskapsskatt (bare kontroll)
b4_sats = ts4 + fs4                             # formuessatsen lagt rett til selskapsskatten
lik(b4_sats, 0.23)
lik(b4_bare_F, 0.30); lik(b4_uten_rab, 0.595); lik(b4_utbytte, 0.72); lik(b4_nevner, 2 / 3)

o4a, p4a = ledd("4a", Kr(D4), [Kr(a4_oppaa), Kr(a4_uten_opp), Kr(a4_bare_F)],
                (tall(D4), [tall(a4_oppaa), tall(a4_uten_opp), tall(a4_bare_F)]))
o4b, p4b = ledd("4b", pst(b4, 1), [pst(b4_sats, 1), pst(b4_uten_rab, 1), pst(b4_utbytte, 1)],
                (tall(b4 * 100, 1), [tall(b4_sats * 100, 1), tall(b4_uten_rab * 100, 1), tall(b4_utbytte * 100, 1)]))
EX.append({
    "n": 4, "title": "Fjellbu AS: utbyttet som dekker formuesskatten og selskapsskatt i stedet",
    "points": 6, "topic": "Formuesskatt som avkastningsskatt", "chapters": [7, 8],
    "body": ("<p>Marius eier alle aksjene i Fjellbu AS. Formuesverdien før rabatt er kr 1 500 000. Aksjer verdsettes til 80 %. "
             "Annen formue dekker bunnfradraget. Formuesskatten er 1 %. Fjellbu AS tjener kr 40 000 før selskapsskatten på 22 %. "
             "Anta at eierskatten er 25 % og oppjusteringsfaktoren 1,6. Se bort fra skjerming.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Marius tar utbytte for å betale formuesskatten selskapet utløser. Hvor stort må utbyttet være når han også betaler eierskatt av det?</p>",
         "options": o4a, "answer": p4a,
         "solution": losning(
             "Utbyttet D må dekke formuesskatten etter at eierskatten er betalt: D × (1 − t<sub>e</sub>) = formuesskatt, altså D = formuesskatt/(1 − t<sub>e</sub>).".replace("−", MINUS),
             [f"Formuesskatt: {tall(FV4)} × 0,8 × 1 % = {tall(F4)}.",
              "Effektiv eierskatt: 25 % × 1,6 = 40 %.",
              f"Utbytte: {tall(F4)}/(1 {MINUS} 0,40) = {tall(F4)}/0,60 = <b>{kr(D4)}</b>."],
             [f"<b>{Kr(a4_oppaa)}</b> = {tall(F4)} × 1,4. Skatten er lagt oppå i stedet for å brutto-regne. Etter eierskatt blir det bare {tall(a4_oppaa*0.6)} igjen.",
              f"<b>{Kr(a4_uten_opp)}</b> = {tall(F4)}/0,75. Eierskatten er regnet uten oppjustering.",
              f"<b>{Kr(a4_bare_F)}</b> er formuesskatten selv. Eierskatten på utbyttet er glemt."],
             f"Eierskatt på utbyttet: {tall(D4)} × 40 % = {tall(D4*te4)}. Igjen: {tall(D4 - D4*te4)}, nøyaktig formuesskatten. ✓ Selskapet har {tall(O4*(1-ts4))} å dele ut, så utbyttet er mulig.",
             "Utbyttet må være større enn formuesskatten, siden noe går til eierskatt. Det stryker kr 12 000 uten regning.")},
        {"label": "b", "points": 3,
         "body": "<p>Regjeringen vil fjerne formuesskatten og heller øke selskapsskatten. Se bort fra eierskatten på utbyttet. Hvilken sats gir staten like mye fra Fjellbu AS som selskapsskatten og formuesskatten gjør i dag?</p>",
         "options": o4b, "answer": p4b,
         "solution": losning(
             "Den nye satsen t skal gi like mye som dagens selskapsskatt og formuesskatt til sammen: t × overskudd = selskapsskatt + formuesskatt.",
             [f"Selskapsskatt i dag: {tall(O4)} × 22 % = {tall(sel4)}.",
              f"Formuesskatt (fra a): {tall(F4)}.",
              f"t = ({tall(sel4)} + {tall(F4)})/{tall(O4)} = {tall(sel4 + F4)}/{tall(O4)} = <b>{pst(b4, 1)}</b>."],
             [f"<b>{pst(b4_sats, 1)}</b> = 22 % + 1 %. Formuesskattesatsen er lagt rett til selskapsskatten, som om formuesskatten traff overskuddet og ikke formuen.",
              f"<b>{pst(b4_uten_rab, 1)}</b> = ({tall(sel4)} + {tall(FV4*fs4)})/{tall(O4)}. Aksjerabatten er glemt.",
              f"<b>{pst(b4_utbytte, 1)}</b> = ({tall(sel4)} + {tall(D4)})/{tall(O4)}. Utbyttet fra a er brukt i stedet for formuesskatten."],
             f"Formuesskatten er {pst(b4_bare_F, 0)} av overskuddet, så satsen må opp 30 prosentpoeng: 22 % + 30 % = 52 %. ✓ Målt mot avkastningen er en formuesskatt på 1 % en tung skatt.")},
    ],
})

# =========================================================== OPPGAVE 5 (ledd 9)
# Skjerming på aksjer i et utenlandsk selskap (jf. H2023 5)
K5n, K5s, rs5, D5n, D5s = 50_000, 30_000, 0.03, 1_000, 2_400
skj5n, skj5s = K5n * rs5, K5s * rs5
sp5n, sp5s = max(0, D5n - skj5n), max(0, D5s - skj5s)
ub5n = max(0, skj5n - D5n)
skatt5 = (sp5n + sp5s) * te
lik(skatt5, 567.60)
w5_nektet = (sp5n + D5s) * te                      # ingen skjerming for den svenske aksjen
w5_samlet = max(0, D5n + D5s - skj5n - skj5s) * te  # skjermingen slått sammen
w5_fritt = sp5n * te                               # utbytte fra utlandet behandlet som skattefritt
lik(w5_nektet, 908.16); lik(w5_samlet, 378.40); lik(w5_fritt, 0)
o5, p5 = ledd("5", Kr(skatt5, 2), [Kr(w5_nektet, 2), Kr(w5_samlet, 2), Kr(w5_fritt, 2)],
              (tall(skatt5, 2), [tall(w5_nektet, 2), tall(w5_samlet, 2), tall(w5_fritt, 2)]))
tab5 = tabell(["Aksje", "Kostpris", "Skjerming 3 %", "Utbytte", "Skattepliktig", "Ubenyttet"], [
    ["Polarkraft", tall(K5n), tall(skj5n), tall(D5n), tall(sp5n), tall(ub5n)],
    ["Kiruna", tall(K5s), tall(skj5s), tall(D5s), tall(sp5s), "0"],
])
EX.append({
    "n": 5, "title": "Utbytte fra en norsk og en svensk aksje",
    "points": 3, "topic": "Skjerming", "chapters": [5],
    "body": ("<p>Arne eier aksjer i Polarkraft ASA på Oslo Børs (kostpris kr 50 000) og i det svenske selskapet Kiruna AB (kostpris kr 30 000). "
             "Skjermingsrenten er 3 %. I år får han kr 1 000 i utbytte fra Polarkraft og kr 2 400 fra Kiruna. "
             "Effektiv eierskatt er 37,84 %. Se bort fra svensk kildeskatt. Hva er samlet eierskatt på utbyttene?</p>"),
    "options": o5, "answer": p5,
    "solution": losning(
        "Skjermingsfradraget gjelder også aksjer i utenlandske selskaper som tilsvarer et norsk aksjeselskap, slik H2023 oppgave 5 og veiledningen sier. Skjermingen beregnes per aksjepost og kan ikke flyttes mellom aksjer.",
        [f"Polarkraft: skjerming {tall(K5n)} × 3 % = {tall(skj5n)} mot {tall(D5n)} i utbytte. Skattepliktig 0. Resten, {tall(ub5n)}, framføres på Polarkraft-aksjen.",
         f"Kiruna: skjerming {tall(K5s)} × 3 % = {tall(skj5s)}. Skattepliktig {tall(D5s)} {MINUS} {tall(skj5s)} = {tall(sp5s)}.",
         f"Eierskatt: {tall(sp5s)} × 37,84 % = <b>{kr(skatt5, 2)}</b>."],
        [f"<b>{Kr(w5_nektet, 2)}</b> = {tall(D5s)} × 37,84 %. Skjermingen er nektet for den svenske aksjen. Det er feilen oppgaven tester.",
         f"<b>{Kr(w5_samlet, 2)}</b> = ({tall(D5n + D5s)} {MINUS} {tall(skj5n + skj5s)}) × 37,84 %. Skjermingen er slått sammen, slik at resten fra Polarkraft er brukt mot Kiruna-utbyttet.",
         f"<b>{Kr(w5_fritt, 2)}</b>: utbyttet fra Sverige er behandlet som skattefritt i Norge. Det er skattepliktig her."],
        f"Brukt skjerming {tall(D5n)} + {tall(skj5s)} = {tall(D5n + skj5s)} og skattepliktig {tall(sp5s)}: sum {tall(D5n + D5s)}, som er utbyttene. ✓ De {tall(ub5n)} kronene på Polarkraft kan brukes mot senere utbytte eller gevinst på samme aksje.",
        ekstra=tab5),
})

# =========================================================== OPPGAVE 6 (ledd 10)
# Nominell og real avkastning på en eiendom (jf. H2023 6), eksakt formel
P0_6, P1_6, leie6, kost6, pi6 = 4_000_000, 4_200_000, 168_000, 42_000, 0.05
netto6 = leie6 - kost6
R6 = (P1_6 - P0_6 + netto6) / P0_6
r6 = (1 + R6) / (1 + pi6) - 1
lik(R6, 0.0815); lik(r6, 0.03)
r6_forenklet = R6 - pi6
R6_brutto = (P1_6 - P0_6 + leie6) / P0_6
r6_brutto = (1 + R6_brutto) / (1 + pi6) - 1
R6_uten = (P1_6 - P0_6) / P0_6
r6_uten = (1 + R6_uten) / (1 + pi6) - 1
r6_brutto_forenklet = R6_brutto - pi6
lik(R6_brutto, 0.092); lik(r6_brutto, 0.04); lik(r6_uten, 0); lik(r6_brutto_forenklet, 0.042)


def o6(R, r):
    return f"Nominell {pst(R, 2)} og real {pst(r, 2)}"


o6x, p6 = ledd("6", o6(R6, r6), [o6(R6, r6_forenklet), o6(R6_brutto, r6_brutto), o6(R6_brutto, r6_brutto_forenklet)],
               (o6(R6, r6), [o6(R6, r6_forenklet), o6(R6_brutto, r6_brutto), o6(R6_brutto, r6_brutto_forenklet)]))
EX.append({
    "n": 6, "title": "Nominell og real avkastning på en utleieleilighet",
    "points": 3, "topic": "Investeringscaser", "chapters": [2, 4],
    "body": ("<p>Marte kjøper en utleieleilighet 1. januar for kr 4 000 000 og selger den 31. desember for kr 4 200 000. "
             "Leieinntektene er kr 168 000, mens felleskostnader og vedlikehold koster kr 42 000. Inflasjonen er 5 %. "
             "Se bort fra skatt og diskontering. Hva blir nominell avkastning og realavkastning med den eksakte formelen?</p>"),
    "options": o6x, "answer": p6,
    "solution": losning(
        "Nominell avkastning R = (P<sub>1</sub> − P<sub>0</sub> + netto kontantstrøm)/P<sub>0</sub>. For eiendom er netto kontantstrøm leie minus kostnader. Eksakt realavkastning r = (1 + R)/(1 + π) − 1.".replace("−", MINUS),
        [f"Netto leie: {tall(leie6)} {MINUS} {tall(kost6)} = {tall(netto6)}.",
         f"R = ({tall(P1_6 - P0_6)} + {tall(netto6)})/{tall(P0_6)} = {pst(R6, 2)}.",
         f"r = 1,0815/1,05 {MINUS} 1 = <b>{pst(r6, 2)}</b>."],
        [f"<b>{o6(R6, r6_forenklet)}</b>: den forenklede formelen R {MINUS} π. Oppgaven ber om den eksakte.",
         f"<b>{o6(R6_brutto, r6_brutto)}</b>: brutto leie uten kostnader, ({tall(P1_6 - P0_6)} + {tall(leie6)})/{tall(P0_6)}.",
         f"<b>{o6(R6_brutto, r6_brutto_forenklet)}</b>: begge feilene, brutto leie og den forenklede formelen."],
        f"Regn i kroner. Marte sitter igjen med {tall(P1_6)} + {tall(netto6)} = {tall(P1_6 + netto6)}. I kjøpekraft fra årets start er det {tall(P1_6 + netto6)}/1,05 = {tall((P1_6 + netto6)/1.05)}, "
        f"altså {tall((P1_6 + netto6)/1.05 - P0_6)} mer enn hun la ut: {tall((P1_6 + netto6)/1.05 - P0_6)}/{tall(P0_6)} = 3,00 %. ✓ Den forenklede formelen ligger r × π = 0,15 prosentpoeng for høyt.",
        "Alternativene er to valg ganger to: netto eller brutto leie og eksakt eller forenklet formel. Avgjør hvert valg for seg. Netto leie gir 8,15 % og stryker to alternativer. Formelen avgjør resten."),
})

# =========================================================== OPPGAVE 7 (ledd 11 og 12)
# Stykkskatt med lineære kurver skrevet med symboler: uttrykket for konsumentprisen og et grensetilfelle (jf. H2023 7)
a7, b7, c7, d7 = 1_000.0, 10.0, 200.0, 30.0   # bare til kontrollen i løsningen


def P7(t, b=b7, d=d7):
    """Likevekt a − bP = c + d(P − t) gir P = (a − c + dt)/(b + d)."""
    return (a7 - c7 + d * t) / (b + d)


dP7 = d7 / (b7 + d7)
dp7 = -b7 / (b7 + d7)
lik(P7(1) - P7(0), dP7); lik(dP7, 0.75); lik(dp7, -0.25); lik(dP7 - dp7, 1)
assert P7(1, b=1e9) - P7(0, b=1e9) < 1e-6        # b → ∞: konsumentprisen står stille
lik(P7(1, d=0) - P7(0, d=0), 0)                    # d = 0: loddrett tilbud
r7a = "∂P/∂t = d/(b + d)"
w7a = ["∂P/∂t = b/(b + d)", f"∂P/∂t = {MINUS}b/(b + d)", "∂P/∂t = (b + d)/d"]
o7a, p7a = ledd("7a", r7a, w7a)
r7b = "Konsumentprisen er uendret mens produsentprisen faller med hele skatten"
w7b = ["Konsumentprisen stiger med hele skatten mens produsentprisen er uendret",
       "Konsumentprisen stiger med en halv krone mens produsentprisen faller like mye",
       "Ingen av prisene endres, fordi kjøperne bare går over til substituttene"]
o7b, p7b = ledd("7b", r7b, w7b)
EX.append({
    "n": 7, "title": "Stykkskatt med lineære kurver skrevet med symboler",
    "points": 6, "topic": "Skatteincidens", "chapters": [11],
    "body": ("<p>I et marked med frikonkurranse er etterspørselen x = a − bP og tilbudet x = c + dp, der a, b, c og d er positive konstanter "
             "og x er kvantum. P er prisen konsumentene betaler og p prisen produsentene får. Myndighetene innfører en stykkskatt t per enhet "
             "som produsentene betaler inn, slik at P = p + t.</p>"),
    "parts": [
        {"label": "a", "points": 3, "body": "<p>Hvilket uttrykk viser hvor mye konsumentprisen stiger når skatten øker med én krone?</p>",
         "options": o7a, "answer": p7a,
         "solution": losning(
             "Sett kilen inn i likevekten og løs for P. Svaret er det samme som den generelle formelen ∂P/∂t = S′/(S′ − D′), her med S′ = d og D′ = −b.",
             ["Likevekt: a − bP = c + d(P − t).",
              "Samle P på én side: (b + d)P = a − c + dt, altså P = (a − c + dt)/(b + d).",
              "Deriver med hensyn på t: <b>∂P/∂t = d/(b + d)</b>, konsumentenes andel av skatten."],
             ["<b>b/(b + d)</b> er produsentenes andel, altså tallverdien av ∂p/∂t.",
              "<b>−b/(b + d)</b> er ∂p/∂t, endringen i produsentprisen. Den er negativ.",
              "<b>(b + d)/d</b> er det riktige uttrykket snudd opp ned. Det er større enn 1, så prisen ville steget med mer enn skatten."],
             f"Sett inn b = {tall(b7)} og d = {tall(d7)}: ∂P/∂t = 30/40 = 0,75 og ∂p/∂t = −10/40 = −0,25. Differansen er 1, hele skatten. ✓ "
             "Er tilbudet loddrett (d = 0), gir uttrykket 0: konsumentprisen kan ikke stige.",
             "Svaret må ligge mellom 0 og 1 for alle positive b og d. Det stryker −b/(b + d) og (b + d)/d. Mellom de to som er igjen, avgjør grensetilfellet d = 0.")},
        {"label": "b", "points": 3,
         "body": "<p>Anta at varen har mange nære substitutter, slik at etterspørselen er perfekt elastisk (b → ∞). Tilbudet er som før. Hva skjer når skatten øker med én krone?</p>",
         "options": o7b, "answer": p7b,
         "solution": begrep(
             "Når b → ∞, går ∂P/∂t = d/(b + d) mot 0 og ∂p/∂t = −b/(b + d) mot −1. Produsentene bærer hele skatten.",
             ["<b>«Konsumentprisen stiger med hele skatten»</b> er motsatt grensetilfelle: perfekt uelastisk etterspørsel (b = 0) eller perfekt elastisk tilbud (d → ∞).",
              "<b>«En halv krone hver vei»</b> gjelder når b = d, altså når kurvene er like bratte.",
              "<b>«Ingen av prisene endres»</b> bryter kilen P = p + t. Kvantum faller, men skatten må tas et sted."],
             "H2025 oppgave 8b og 8c hadde samme grensetilfelle med tall: konsumentprisen ble stående på kr 1,50 mens produsentprisen falt med hele skatten til kr 1,00.",
             "Svaret må oppfylle P − p = t. Det stryker «ingen av prisene endres» med en gang.",
             begrunnelse="Med perfekte substitutter går kjøperne over til andre varer straks prisen stiger. Konsumentprisen kan derfor ikke øke. Hele kilen P = p + t må tas av produsentprisen, som faller med hele skatten.")},
    ],
})

# =========================================================== OPPGAVE 8 (ledd 13 og 14)
r8a = "Å hindre kjedebeskatning, der samme overskudd ellers skattlegges på nytt i hvert selskap i en eierkjede"
w8a = ["Å gjøre det billigere å eie aksjer gjennom et selskap enn personlig, slik at eierne sparer mer i selskap",
       "Å gi selskapsaksjonærer samme skatt som personer, ved at 3 % av utbytte og gevinst skattlegges",
       "Å skjerme normalavkastningen på kapitalen eieren har skutt inn, slik at bare meravkastningen skattlegges"]
o8a, p8a = ledd("8a", r8a, w8a)
O8 = 1_000_000
sel8 = O8 * tA
eier8 = (O8 - sel8) * te
lik(sel8 + eier8, 515_152)

K8, rs8, dager8 = 100_000, 0.036, 4
skj8 = K8 * rs8
tid8 = skj8 * dager8 / 365
lik(skj8, 3_600)
r8b = f"Han får hele årets skjerming, {kr(skj8)}, fordi han eier aksjen ved årsskiftet"
w8b = ["Han får ingen skjerming, fordi han bare har eid aksjen i fire dager",
       f"Han får skjerming for fire dager, om lag {kr(tid8)}, fordi den fordeles etter eiertid",
       "Han får ingen skjerming, fordi han ikke mottok noe utbytte i 2026"]
o8b, p8b = ledd("8b", r8b, w8b, (tall(skj8), ["", tall(tid8), ""]))
EX.append({
    "n": 8, "title": "Fritaksmetodens begrunnelse og skjerming ved kjøp i desember",
    "points": 6, "topic": "Fritaksmetoden", "chapters": [6, 5],
    "body": "<p>To spørsmål om aksjeselskaper og personlige aksjonærer.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Fritaksmetoden gjør at aksjeselskaper i hovedsak ikke betaler skatt på utbytte og gevinst på aksjer i andre selskaper. Hva er hovedbegrunnelsen for regelen?</p>",
         "options": o8a, "answer": p8a,
         "solution": begrep(
             "Uten fritaksmetoden ville et overskudd blitt skattlagt i driftsselskapet, så på nytt i hvert selskap det passerer og til slutt hos personen. "
             "Fritaksmetoden (skatteloven § 2-38) beskatter i stedet overskuddet én gang i selskapssektoren og én gang hos den personlige eieren. "
             "Samlet sats blir 22 % + 78 % × 37,84 % = 51,52 % uansett hvor mange ledd kjeden har.",
             ["<b>«Billigere å eie gjennom selskap»</b>: holdingselskapet gir en utsettelse, ikke et fritak. Tas pengene ut, kommer eierskatten som før. Utsettelsen er en følge av reglene, ikke begrunnelsen for dem.",
              "<b>«3 % av utbytte og gevinst»</b>: treprosentregelen gjelder bare utbytte og bare når eierandelen er 90 % eller lavere. Den er en sjablong for kostnader, ikke et forsøk på å gi selskaper samme skatt som personer.",
              "<b>«Skjerme normalavkastningen»</b> er begrunnelsen for skjermingsfradraget i aksjonærmodellen, som gjelder personlige aksjonærer."],
             f"Manualens kjede: driftsselskapet tjener {tall(O8)}, holdingselskapet eier over 90 % og sender alt videre til eieren. "
             f"Samlet skatt blir {tall(sel8)} + {tall(eier8)} = {tall(sel8 + eier8)}, nøyaktig som ved direkte eie. Holdingselskapet flytter bare tidspunktet.",
             "Skill de to regelsettene: aksjonærmodellen gjelder personer og har skjerming, fritaksmetoden gjelder selskaper og hindrer kjedebeskatning. Det stryker skjermingsalternativet.")},
        {"label": "b", "points": 3,
         "body": ("<p>Vidar kjøper én aksje i Kvitfjell ASA for kr 100 000 den 28. desember 2026 og eier den ved årsskiftet. Selskapet betalte utbytte i mai, før Vidar kjøpte. "
                  "Anta at skjermingsrenten for 2026 blir 3,6 %. Hvilket utsagn om Vidars skjermingsfradrag for 2026 er riktig?</p>"),
         "options": o8b, "answer": p8b,
         "solution": begrep(
             "Skjermingsfradraget tilordnes den personlige aksjonæren som eier aksjen 31. desember (skatteloven § 10-12). Det beregnes av hele skjermingsgrunnlaget og fordeles ikke etter hvor lenge aksjen er eid i året.",
             ["<b>«Ingen, fordi han bare har eid aksjen i fire dager»</b>: eiertiden spiller ingen rolle. Det er eierskapet ved årsskiftet som avgjør.",
              f"<b>«Om lag {kr(tid8)} for fire dager»</b> = {tall(skj8)} × 4/365. Skjermingen tidsavkortes ikke.",
              "<b>«Ingen, fordi han ikke fikk utbytte»</b>: skjermingen gis uansett. Er det ikke utbytte å bruke den mot, blir den ubenyttet og framføres på aksjen."],
             f"Vidar får ikke noe utbytte i 2026. Hele skjermingen framføres og legger seg på skjermingsgrunnlaget for 2027: {tall(K8)} + {tall(skj8)} = {tall(K8 + skj8)}. "
             "Selgeren, som eide aksjen da utbyttet ble betalt, får ingen skjerming for 2026. Løsningen på kursgodkjenningen 2026 spørsmål 1 sier det samme: et kjøp i desember gir rett til skjerming for kjøpsåret.",
             "Regelen har ett tidspunkt, 31. desember. Alternativer som deler opp året, kan strykes.",
             begrunnelse=f"Vidar eier aksjen ved årsskiftet og får fradrag for hele året: {tall(K8)} × 3,6 % = {kr(skj8)}.")},
    ],
})

# =========================================================== OPPGAVE 9 (ledd 15)
# Korttidsutleie av egen bolig: 10 000 skattefritt, 85 % av resten skattepliktig
leie9, fri9, andel9 = 50_000, 10_000, 0.85
skpl9 = (leie9 - fri9) * andel9
lik(skpl9, 34_000)
w9_halv = 0
w9_uten_fri = leie9 * andel9
w9_uten85 = leie9 - fri9
w9_20k = (leie9 - 20_000) * andel9            # 20 000-grensen fra langtidsutleie brukt
lik(w9_uten_fri, 42_500); lik(w9_uten85, 40_000); lik(w9_20k, 25_500)
skatt9 = skpl9 * tA
lik(skatt9, (leie9 - fri9) * 0.187)
o9, p9 = ledd("9", Kr(skpl9), [Kr(w9_halv), Kr(w9_uten_fri), Kr(w9_20k)],
              (tall(skpl9), [tall(w9_halv), tall(w9_uten_fri), tall(w9_20k)]))
EX.append({
    "n": 9, "title": "Korttidsutleie av egen bolig",
    "points": 3, "topic": "Investeringscaser", "chapters": [4],
    "body": ("<p>Guro bor i leiligheten sin hele året unntatt fire uker om sommeren. Da leier hun den ut gjennom en korttidsplattform, "
             "til flere leietakere i under 30 dager hver. Til sammen får hun kr 50 000 i leie. Se bort fra kostnader. "
             "Hvor stor skattepliktig leieinntekt har Guro?</p>"),
    "options": o9, "answer": p9,
    "solution": losning(
        "Ved korttidsutleie av egen bolig, altså utleieforhold under 30 dager, gjelder ikke halvparten-regelen. De første kr 10 000 i året er skattefrie. Av det overskytende regnes 85 % som skattepliktig kapitalinntekt.",
        [f"Leie over grensen: {tall(leie9)} {MINUS} {tall(fri9)} = {tall(leie9 - fri9)}.",
         f"Skattepliktig: {tall(leie9 - fri9)} × 0,85 = <b>{kr(skpl9)}</b>."],
        [f"<b>{Kr(w9_halv)}</b>: halvparten-regelen er brukt. Den gjelder bare langtidsutleie. Ved korttidsutleie er leien skattepliktig selv om Guro bruker boligen selv mesteparten av året.",
         f"<b>{Kr(w9_uten_fri)}</b> = {tall(leie9)} × 0,85. De skattefrie {tall(fri9)} er glemt.",
         f"<b>{Kr(w9_20k)}</b> = ({tall(leie9)} {MINUS} 20 000) × 0,85. Grensen på 20 000 fra langtidsutleie er brukt i stedet for 10 000."],
        f"Skatten blir {tall(skpl9)} × 22 % = {tall(skatt9)}, som er {tall(leie9 - fri9)} × 18,7 %. Effektiv sats på kronene over grensen er 85 % × 22 % = 18,7 %. ✓",
        "Spør først om utleien er kort eller lang. Er den kort, faller både kr 0 og halvparten-regelen bort."),
})

# =========================================================== OPPGAVE 10 (ledd 16)
inntekt10 = [200_000, 500_000, 1_000_000]
K10 = [0.20 * y for y in inntekt10]
L10 = [0.20 * (y - 100_000) for y in inntekt10]
M10 = [10_000 + 0.20 * y for y in inntekt10]
gK = [t / y for t, y in zip(K10, inntekt10)]
gL = [t / y for t, y in zip(L10, inntekt10)]
gM = [t / y for t, y in zip(M10, inntekt10)]
assert max(gK) - min(gK) < 1e-12 and gL[0] < gL[1] < gL[2] and gM[0] > gM[1] > gM[2]
for sys_ in (K10, L10, M10):
    lik((sys_[2] - sys_[1]) / (inntekt10[2] - inntekt10[1]), 0.20)
r10 = "System K"
w10 = ["System L", "System M", "Alle tre, fordi marginalskatten er 20 % i alle"]
o10, p10 = ledd("10", r10, w10)
tab10 = tabell(["", "Ida", "Jon", "Kaja"], [
    ["Inntekt", *[tall(y) for y in inntekt10]],
    ["System K", *[tall(t) for t in K10]],
    ["System L", *[tall(t) for t in L10]],
    ["System M", *[tall(t) for t in M10]],
])
tab10_los = tabell(["Gjennomsnittsskatt", "Ida", "Jon", "Kaja", "System"], [
    ["K", *[pst(g, 0) for g in gK], "proporsjonalt"],
    ["L", *[pst(g, 0) for g in gL], "progressivt"],
    ["M", *[pst(g, 0) for g in gM], "regressivt"],
])
EX.append({
    "n": 10, "title": "Hvilket system gir lik gjennomsnittsskatt",
    "points": 3, "topic": "Progressivitet", "chapters": [10, 1],
    "body": f"<p>Tre skattesystemer gir disse skattebeløpene for Ida, Jon og Kaja:</p>{tab10}<p>I hvilket system har alle tre samme gjennomsnittsskatt?</p>",
    "options": o10, "answer": p10,
    "solution": begrep(
        "Gjennomsnittsskatten er skatt delt på inntekt. Bare en flat sats uten fradrag og uten faste beløp gir samme gjennomsnittsskatt for alle. Marginalskatten sier hva den neste kronen koster, ikke hvor stor andel av inntekten som går til skatt.",
        ["<b>System L</b> er T = 20 % × (Y − 100 000), en flat sats med bunnfradrag. Gjennomsnittsskatten stiger med inntekten, så systemet er progressivt.".replace("−", MINUS),
         "<b>System M</b> er T = 10 000 + 20 % × Y, en flat sats pluss et fast beløp (kopiskatt). Gjennomsnittsskatten faller med inntekten, så systemet er regressivt.",
         "<b>«Alle tre»</b>: marginalskatten er riktignok 20 % i alle tre, men lik marginalskatt gir ikke lik gjennomsnittsskatt."],
        "Kursgodkjenningen 2026 spørsmål 8 og H2024 oppgave 4 tester samme skille: med bunnfradrag stiger gjennomsnittsskatten mot satsen, uten fradrag er den lik satsen for alle.",
        "Regn ett tall per system for Ida og Kaja. Er brøkene like, er systemet proporsjonalt. Det tar under et minutt.",
        begrunnelse="System K: 40 000/200 000 = 100 000/500 000 = 200 000/1 000 000 = 20 %. Alle har samme gjennomsnittsskatt.", ekstra=tab10_los),
})

# =========================================================== OPPGAVE 11 (ledd 17)
# Inntektsskiftingslikningen med delt arbeidsgiveravgift (2026-formen, jf. mc2026 2)
tw11, ts11, a11, andel_arb11, t11 = 0.46, 0.20, 0.12, 0.25, 0.20
aL11, aF11 = a11 * andel_arb11, a11 * (1 - andel_arb11)
y11 = (tw11 + aL11 - ts11 - aF11) / t11
lik(y11, 1.0)
y11_full = (tw11 + a11 - ts11) / t11
y11_glemt_F = (tw11 + aL11 - ts11) / t11
y11_uten = (tw11 - ts11) / t11
lik(y11_full, 1.9); lik(y11_glemt_F, 1.45); lik(y11_uten, 1.3)


def o11(y):
    return f"y = {tall(y, 2)} og eierskatt {pst(t11 * y, 0)}"


o11x, p11 = ledd("11", o11(y11), [o11(y11_full), o11(y11_glemt_F), o11(y11_uten)],
                 (tall(y11, 2), [tall(y11_full, 2), tall(y11_glemt_F, 2), tall(y11_uten, 2)]))
EX.append({
    "n": 11, "title": "Inntektsskiftingslikningen når bedriften bærer det meste av avgiften",
    "points": 3, "topic": "Aksjonærmodellen", "chapters": [5],
    "body": ("<p>Høyeste marginalskatt på lønn er 46 % og selskapsskatten 20 %. Arbeidsgiveravgiften er 12 % av lønnskostnaden. "
             "Arbeidstakeren bærer en firedel av den, bedriften resten. Eierskatten er utbytte × y × 20 %. "
             "Bruk inntektsskiftingslikningen fra 2026, der avgiften bedriften bærer, står sammen med selskapsskatten. "
             "Hvilken oppjusteringsfaktor y gjør at det ikke lønner seg å ta ut lønn som utbytte? Hva blir eierskattesatsen?</p>"),
    "options": o11x, "answer": p11,
    "solution": losning(
        "Likningen fra 2026 legger nominelle satser sammen: marginalskatt på lønn + avgiften arbeidstakeren bærer = selskapsskatt + avgiften bedriften bærer + t × y. Den delen bedriften bærer, hører hjemme på selskapssiden.",
        [f"Arbeidstakeren bærer 12 % × ¼ = {pst(aL11, 0)} og bedriften {pst(aF11, 0)}.",
         "46 % + 3 % = 20 % + 9 % + 20 % × y.",
         f"y = (49 {MINUS} 29)/20 = <b>{tall(y11, 2)}</b> og eierskatt 20 % × {tall(y11, 2)} = <b>{pst(t11*y11, 0)}</b>."],
        [f"<b>{o11(y11_full)}</b>: full overvelting, 46 + 12 = 20 + 20y. Det er forelesningens standardantakelse, ikke oppgavens.",
         f"<b>{o11(y11_glemt_F)}</b>: bedriftens del er glemt på høyresiden, 46 + 3 = 20 + 20y.",
         f"<b>{o11(y11_uten)}</b>: avgiften er utelatt helt, 46 = 20 + 20y."],
        "Begge sider er 49: 46 + 3 = 20 + 9 + 20 × 1. ✓ Jo mer av avgiften bedriften bærer, jo lavere blir faktoren. Med full overvelting er den 1,9. Bærer bedriften alt, blir den 0,7.",
        "Alle fire alternativer har eierskatt lik 20 % × y, så bare likningen skiller dem. Sett hvert y inn og se hvilket som gir 49 på begge sider."),
})
lik((tw11 - ts11 - a11) / t11, 0.7)

# =========================================================== OPPGAVE 12 (ledd 18)
# Fra fullt til halvt tapsfradrag for en risikonøytral investor (jf. mc2026 7)
t12, sikker12, G12, L12 = 0.30, 15_000, 100_000, 60_000   # eksempelet står bare i løsningen
E12 = 0.5 * G12 - 0.5 * L12
full_s12 = sikker12 * (1 - t12)
full_r12 = (1 - t12) * E12
halv_r12 = 0.5 * G12 * (1 - t12) - 0.5 * L12 * (1 - 0.5 * t12)
lik(E12, 20_000); lik(full_s12, 10_500); lik(full_r12, 14_000); lik(halv_r12, 9_500)
assert full_r12 > full_s12 > halv_r12   # valget snur
r12 = "Valget vris mot det sikre prosjektet: staten tar fortsatt 30 % av gevinsten, men bærer bare 15 % av tapet"
w12 = ["Ingenting: en risikonøytral investor bryr seg bare om forventet avkastning før skatt",
       "Valget vris mot det sikre prosjektet, fordi staten nå tar en større andel av gevinsten enn før",
       "Valget vris mot det risikable prosjektet, fordi investoren må ta mer risiko for å få samme avkastning etter skatt"]
o12, p12 = ledd("12", r12, w12)
EX.append({
    "n": 12, "title": "Fra fullt til halvt tapsfradrag",
    "points": 3, "topic": "Skatt og risiko", "chapters": [12],
    "body": ("<p>Skatten på avkastning er 30 %. I dag kan et tap trekkes fullt fra mot annen inntekt. Regjeringen foreslår at bare halvparten "
             "av et tap skal kunne trekkes fra. En risikonøytral investor velger mellom et sikkert og et risikabelt prosjekt. "
             "Hva gjør forslaget med valget hennes?</p>"),
    "options": o12, "answer": p12,
    "solution": begrep(
        "Med fullt tapsfradrag tar staten andelen t av både gevinst og tap. Alle prosjekter krymper med (1 − t) og valget endres ikke. "
        "Med bare delvis fradrag tar staten fortsatt t av gevinsten, men bærer mindre av tapet. Det straffer prosjekter med stor spredning. "
        "Valget vris mot det sikre (forelesning 10, Domar og Musgrave).",
        ["<b>«Ingenting»</b>: en risikonøytral investor ser på forventet avkastning <i>etter</i> skatt. Den faller for det risikable prosjektet.",
         "<b>«Staten tar en større andel av gevinsten»</b>: riktig retning, gal begrunnelse. Andelen av gevinsten er fortsatt 30 %. Det er andelen av tapet som faller.",
         "<b>«Mot det risikable»</b>: at investoren skalerer opp den risikable posisjonen, gjelder med fullt tapsfradrag i porteføljemodellen. Uten fullt fradrag snur konklusjonen."],
        "Kursgodkjenningen 2026 spørsmål 7 har samme konklusjon: delvis tapsfradrag gir en risikonøytral investor mindre risikotaking.",
        "To alternativer har riktig retning. Les begrunnelsen: bare den ene stemmer med det som faktisk endres, statens andel av tapet.",
        begrunnelse=(f"Med halvt fradrag bærer staten 0,5 × 30 % = 15 % av et tap. Et eksempel: det sikre prosjektet gir {tall(sikker12)}, det risikable "
                     f"+{tall(G12)} eller {MINUS}{tall(L12)} med like stor sannsynlighet. Med fullt fradrag gir det sikre {tall(full_s12)} etter skatt "
                     f"og det risikable 0,7 × {tall(E12)} = {tall(full_r12)}, så investoren velger det risikable. Med halvt fradrag gir det risikable "
                     f"0,5 × 70 000 {MINUS} 0,5 × 60 000 × 0,85 = {tall(halv_r12)}, mindre enn {tall(full_s12)}. Valget snur.")),
})

# =========================================================== OPPGAVE 13 (ledd 19 til 21)
r13a = "Ikke så lenge hun er i Norge mer enn 61 dager i året"
w13a = ["Fra og med 2030, når utflyttingsåret og tre hele år har gått",
        "Fra og med 2027, fordi hun er i Norge færre enn 183 dager i året",
        "Fra og med 2026, fordi hun har solgt leiligheten og flyttet ut"]
o13a, p13a = ledd("13a", r13a, w13a)

g13 = [70_000, 60_000]
sum13 = sum(g13)
assert all(g <= 100_000 for g in g13) and sum13 > 100_000
skatt13 = sum13 * te
lik(skatt13, 49_192)
w13_hver = 0
w13_fradrag = (sum13 - 100_000) * te
w13_opp = sum13 * tA
w13_begge = (sum13 - 100_000) * tA              # grensen som fradrag og oppjustering glemt
lik(w13_fradrag, 11_352); lik(w13_opp, 28_600); lik(w13_begge, 6_600)
o13b, p13b = ledd("13b", Kr(skatt13), [Kr(w13_hver), Kr(w13_fradrag), Kr(w13_begge)],
                  (tall(skatt13), [tall(w13_hver), tall(w13_fradrag), tall(w13_begge)]))

r13c = "De gjør kriminalitet mer lønnsom, fordi utbyttet av den kan skjules og sikres mot myndighetene"
w13c = ["De øker samlet privat inntekt, fordi private får flere muligheter til å plassere pengene sine",
        "De rammer rike land hardest, fordi selskapsskatten er en større del av skatteinntektene der",
        "De trekker kapital dit avkastningen før skatt er høyest. Det svekker veksten i andre land"]
o13c, p13c = ledd("13c", r13c, w13c)
EX.append({
    "n": 13, "title": "Over landegrensene: bosted, gave og skatteparadiser",
    "points": 9, "topic": "Internasjonal skatt", "chapters": [13, 6],
    "body": "<p>Tre spørsmål om skatt over landegrensene. Hvert spørsmål står for seg. Bruk reglene som gjelder i 2026.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": ("<p>Ragnhild har bodd i Norge hele livet og flytter til Italia i mars 2026. Hun selger leiligheten sin og disponerer ingen bolig i Norge. "
                  "Hver sommer jobber hun som guide i Norge i rundt 90 dager og bor da på hotell. Når slutter hun å være skattemessig bosatt i Norge "
                  "etter norsk intern rett?</p>"),
         "options": o13a, "answer": p13a,
         "solution": begrep(
             "Etter skatteloven § 2-1 opphører bostedet først for et inntektsår der du godtgjør to ting: at du ikke har vært i Norge mer enn 61 dager i året og at verken du eller nærstående har disponert bolig her. Har du bodd i Norge i minst ti år, må begge vilkårene være oppfylt i hvert av de tre årene etter utflyttingsåret.",
             ["<b>Fra og med 2030</b> ville vært svaret om hun var i Norge høyst 61 dager i året: utflyttingsåret 2026 og tre hele år, 2027 til 2029. Det er svaret i kursgodkjenningen 2026 spørsmål 9, men her svikter dagkravet.",
              "<b>Fra og med 2027, under 183 dager</b>: 183 dager er grensen for når du <i>blir</i> bosatt. For å slutte å være bosatt er grensen 61 dager. Tiårsregelen gjelder i tillegg.",
              "<b>Fra og med 2026</b>: å selge boligen og flytte ut avslutter ikke det skattemessige bostedet."],
             "Kutter hun sommerjobben ned til høyst 61 dager i året, kan bostedet opphøre etter treårsregelen.",
             "Les vilkårene ett for ett: dager og bolig. Ett vilkår som ikke er oppfylt, er nok til at hun fortsatt er bosatt. Bland heller ikke 183 dager (innflytting) med 61 dager (utflytting).",
             begrunnelse="Ragnhild oppfyller boligvilkåret: hun har solgt leiligheten, og et hotellrom er ikke en bolig hun disponerer. Men hun er i Norge rundt 90 dager hvert år, mer enn 61. Dagkravet er ikke oppfylt i noe år. Hun forblir skattemessig bosatt etter norsk intern rett.".replace("leiligheten, og et", "leiligheten. Et"))},
        {"label": "b", "points": 3,
         "body": ("<p>Arvid bor i Norge og datteren hans i London. I 2026 gir han henne to aksjeposter: i mars en med latent gevinst kr 70 000 "
                  "og i oktober en med latent gevinst kr 60 000. Han gir ingen andre gaver det året. "
                  "Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Se bort fra skjerming. Hvor mye exit-skatt utløser gavene?</p>"),
         "options": o13b, "answer": p13b,
         "solution": losning(
             "Gir du aksjer til en person bosatt i utlandet, utløser det exit-skatt for deg når netto gevinst på slike gaver i året overstiger kr 100 000 (skatteloven § 10-70). Grensen er en terskel, ikke et fradrag: da skattlegges hele gevinsten. Bunnfradraget på 3 mill. gjelder bare når du selv flytter.",
             [f"Samlet gevinst på gavene i 2026: {tall(g13[0])} + {tall(g13[1])} = {tall(sum13)}.",
              f"{tall(sum13)} er over 100 000, så hele gevinsten skattlegges.",
              f"Skatt: {tall(sum13)} × 1,72 × 22 % = {tall(sum13)} × 37,84 % = <b>{kr(skatt13)}</b>."],
             [f"<b>{Kr(w13_hver)}</b>: gavene er vurdert hver for seg, eller bunnfradraget på 3 mill. er brukt. Grensen gjelder samlet gevinst i året.",
              f"<b>{Kr(w13_fradrag)}</b> = ({tall(sum13)} {MINUS} 100 000) × 37,84 %. Grensen er brukt som et fradrag.",
              f"<b>{Kr(w13_begge)}</b> = ({tall(sum13)} {MINUS} 100 000) × 22 %. Grensen er brukt som et fradrag og oppjusteringen er glemt."],
             f"Begge veier: {tall(sum13)} × 1,72 = {tall(sum13*1.72)} og {tall(sum13*1.72)} × 22 % = {tall(skatt13)}. ✓ Hadde Arvid bare gitt den første gaven, ville gevinsten på {tall(g13[0])} vært under grensen og skatten 0.",
             "Kr 0 forutsetter at gavene vurderes hver for seg. Les «i året» i regelen, så faller den.")},
        {"label": "c", "points": 3,
         "body": "<p>Schjelderup peker på flere kanaler der skatteparadiser skader andre land. Hvilket utsagn er i tråd med pensum?</p>",
         "options": o13c, "answer": p13c,
         "solution": begrep(
             "Schjelderup teller sju kanaler. Blant dem: paradisene svekker andre lands skattesystem, de får kapitalen til å gå dit avkastningen etter skatt er høyest i stedet for dit den er høyest før skatt, de gjør kriminalitet mer lønnsom og de reduserer samlet privat inntekt.",
             ["<b>«Øker samlet privat inntekt»</b>: paradisene gir økte muligheter for noen, men lavere samlet inntekt for alle.",
              "<b>«Rammer rike land hardest»</b>: motsatt. Selskapsskatt er 18,6 % av skatteinntektene i Afrika og 15,5 % i Latin-Amerika, mot 9,3 % i OECD-landene. Samme relative tap rammer fattige land hardere.",
              "<b>«Dit avkastningen før skatt er høyest»</b>: det ville vært effektivt. Problemet er at kapitalen går dit avkastningen <i>etter</i> skatt er høyest. Det er det som svekker veksten."],
             "Scandinavian Star-brannen er forelesningens eksempel: de reelle eierne lot seg aldri identifisere og kunne ikke stilles til ansvar.",
             "Ett alternativ snur hvem som rammes hardest, et annet snur før og etter skatt. Stryk dem, så står valget mellom to.",
             begrunnelse="Avkastningen på å tilegne seg andres verdier avhenger av om du får beholde dem. Kan utbyttet skjules og sikres, stiger avkastningen på uproduktiv virksomhet i forhold til produktiv. Flere velger den uproduktive. Da faller samlet inntekt, også for dem som fortsatt driver produktivt (forelesningens bøttediagram).")},
    ],
})

# =========================================================== OPPGAVE 14 (ledd 22 og 23)
rf14, EM14, sM14 = 0.03, 0.08, 0.20
sE14, sL14 = 0.10, 0.30
wE14, wL14 = sE14 / sM14, sL14 / sM14
lik(wE14, 0.5); lik(wL14, 1.5)
EE14, EL14 = rf14 + wE14 * (EM14 - rf14), rf14 + wL14 * (EM14 - rf14)
sh = lambda E, s: (E - rf14) / s
lik(sh(EE14, sE14), sh(EL14, sL14)); lik(sh(EM14, sM14), 0.25)
r14a = "Eva har halvparten i indeksfondet og resten i bank. Leif låner 50 % av egenkapitalen og har 150 % i fondet"
w14a = ["Eva bør eie aksjer med lav volatilitet og Leif aksjer med høy volatilitet, begge uten bank eller lån",
        "Eva har halvparten i indeksfondet og resten i bank. Leif bør heller kjøpe enkeltaksjer med standardavvik 30 %",
        "Begge bør eie indeksfondet, men Leifs portefølje gir høyere forventet avkastning per enhet risiko enn Evas"]
o14a, p14a = ledd("14a", r14a, w14a)
r14b = "Torstein bør ha lavere aksjeandel enn Ingvild, fordi jobben alt gir ham aksjelik risiko"
w14b = ["Torstein bør ha høyere aksjeandel enn Ingvild, fordi han er vant til en inntekt som svinger",
        "De bør ha samme aksjeandel, fordi de har samme alder, samme formue og samme risikoaversjon",
        "Ingvild bør ha lavere aksjeandel enn Torstein, fordi den faste lønnen gjør henne uvant med risiko"]
o14b, p14b = ledd("14b", r14b, w14b)
EX.append({
    "n": 14, "title": "Kapitalmarkedslinjen og humankapitalen",
    "points": 6, "topic": "Porteføljevalg", "chapters": [14],
    "body": "<p>To spørsmål om porteføljevalg. Bruk teorien om optimale porteføljer fra faget.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": ("<p>Risikofri rente er 3 %. Et bredt globalt indeksfond, som er markedsporteføljen, har forventet avkastning 8 % og standardavvik 20 %. "
                  "Eva ønsker en portefølje med standardavvik 10 %. Leif ønsker en med standardavvik 30 %. Hvilket utsagn er riktig?</p>"),
         "options": o14a, "answer": p14a,
         "solution": begrep(
             "Separasjonsteoremet: alle bør eie den samme risikable porteføljen, markedsporteføljen. Risikoviljen avgjør bare hvor mye bank eller lån som blandes inn. Langs kapitalmarkedslinjen er σ<sub>p</sub> = w × σ<sub>M</sub>, der w er andelen i markedsporteføljen.",
             ["<b>«Lav og høy volatilitet»</b>: enkeltaksjer har usystematisk risiko som markedet ikke betaler for. Begge havner under linjen.",
              "<b>«Leif bør kjøpe enkeltaksjer»</b>: Eva-delen stemmer, men Leif får mer forventet avkastning for samme risiko ved å låne og kjøpe mer av indeksfondet.",
              f"<b>«Høyere avkastning per enhet risiko»</b>: alle porteføljer på linjen har samme Sharpe-forhold, ({tall(EL14*100,1)} {MINUS} 3)/30 = ({tall(EE14*100,1)} {MINUS} 3)/10 = {tall(sh(EE14, sE14), 2)}."],
             f"Eva får 3 % + 0,5 × 5 % = {pst(EE14, 1)} og Leif 3 % + 1,5 × 5 % = {pst(EL14, 1)}. Begge ligger på linjen E = 3 % + 0,25 × σ. ✓",
             "Alternativer som anbefaler bestemte enkeltaksjer, kan strykes i alle spørsmål om kapitalmarkedslinjen.",
             begrunnelse=f"Eva: w = 10/20 = 0,5, altså halvparten i fondet og halvparten i bank. Leif: w = 30/20 = 1,5. Han låner 50 % av egenkapitalen til risikofri rente og har 150 % i fondet. Lånt andel = σ<sub>p</sub>/σ<sub>M</sub> {MINUS} 1.")},
        {"label": "b", "points": 3,
         "body": ("<p>Ingvild og Torstein har samme alder, samme finansielle formue og samme risikoaversjon. Ingvild er sykepleier på et offentlig sykehus. "
                  "Torstein er selvstendig eiendomsmegler. Inntekten hans svinger med boligmarkedet og konjunkturene. Hvilket råd er i tråd med faget?</p>"),
         "options": o14b, "answer": p14b,
         "solution": begrep(
             "Aksjeandelen gjelder hele formuen, også humankapitalen. Trygg humankapital virker som et bankinnskudd og gir rom for mer aksjer. Humankapital som svinger med aksjemarkedet, virker som aksjer og tilsier færre.",
             ["<b>«Høyere fordi han er vant til en inntekt som svinger»</b>: vane er ikke det samme som lav risikoaversjon. At inntekten svinger med økonomien, er nettopp grunnen til færre aksjer.",
              "<b>«Samme aksjeandel»</b>: lik finansformue og lik risikoaversjon er ikke nok. Humankapitalen skiller dem.",
              "<b>«Uvant med risiko»</b>: aksjeandelen avhenger av risikoaversjon og humankapital, ikke av vane. Den faste lønnen er grunnen til at Ingvild kan ta mer risiko."],
             "H2023 oppgave 9 (fast stilling mot aksjemegler) og forelesningen om aksjesparing gir samme regel: risikofri arbeidsinntekt tilsier aksjer, aksjelik arbeidsinntekt tilsier risikofri sparing.",
             "To alternativer begrunner aksjeandelen med vane. Vane står ikke i Mertons formel, så de kan strykes.",
             begrunnelse="Torsteins inntekt faller når boligmarkedet og konjunkturene snur, altså gjerne samtidig med aksjemarkedet. Humankapitalen hans virker som en aksjeposisjon. Ingvilds offentlige lønn er nesten risikofri og virker som et bankinnskudd. For samme samlede risiko bør Torstein ta mindre risiko med sparepengene og Ingvild mer.")},
    ],
})

# =========================================================== OPPGAVE 15 (ledd 24)
r15 = "Delingstallet stiger for yngre årskull når levealderen øker, så de må jobbe lenger for samme pensjon"
w15 = ["Delingstallet stiger når du utsetter uttaket, slik at den årlige pensjonen din blir lavere",
       "Delingstallet er lavere for kvinner enn for menn, fordi kvinner i gjennomsnitt lever lenger",
       "Delingstallet fastsettes endelig det året du begynner å ta ut pensjon, ut fra helsen din da"]
o15, p15 = ledd("15", r15, w15)
B15, d67, d70 = 4_200_000, 17.5, 15.0   # bare til kontrollen
EX.append({
    "n": 15, "title": "Delingstallet i folketrygden",
    "points": 3, "topic": "Pensjon", "chapters": [15],
    "body": "<p>Hvilken påstand om delingstallet i folketrygdens alderspensjon er riktig?</p>",
    "options": o15, "answer": p15,
    "solution": begrep(
        "Årlig pensjon = pensjonsbeholdning/delingstall. Delingstallet er tilnærmet forventet antall gjenstående leveår ved uttak. Det er felles for kvinner og menn, fastsettes endelig det året årskullet fyller 61, synker med uttaksalderen og stiger fra årskull til årskull når levealderen øker (levealdersjusteringen).",
        ["<b>«Stiger når du utsetter uttaket»</b>: motsatt. Venter du, er det færre år å fordele beholdningen på. Delingstallet synker og den årlige pensjonen stiger (H2025 oppgave 14).",
         "<b>«Lavere for kvinner»</b>: delingstallet er felles for kvinner og menn. Lengre levetid ville dessuten gitt et høyere, ikke lavere, delingstall.",
         "<b>«Fastsettes ved uttak ut fra helsen»</b>: det fastsettes for hele årskullet det året kullet fyller 61. Din helse spiller ingen rolle."],
        f"Med fast teller kan ikke delingstall og pensjon stige samtidig. Eksempel: {tall(B15)}/{tall(d67, 1)} = {tall(B15/d67)} og {tall(B15)}/{tall(d70, 1)} = {tall(B15/d70)}. Lavere delingstall, høyere pensjon.",
        "Delingstallet beveger seg to veier: ned med uttaksalderen innenfor ett kull, opp fra kull til kull. Alternativer som blander de to, kan strykes.",
        begrunnelse="Når forventet levealder øker, skal den samme beholdningen fordeles på flere år. Et yngre kull får derfor høyere delingstall og lavere årlig pensjon ved samme uttaksalder, med mindre det jobber lenger. Det er hensikten med levealdersjusteringen fra pensjonsreformen i 2011."),
})

# =========================================================== OPPGAVE 16 (ledd 25 til 27)
# a) Kontrakter med samme forventning (jf. mc2026 11)
A16 = [(0.5, 400_000), (0.5, 600_000)]
B16 = [(0.5, 200_000), (0.5, 800_000)]
C16 = [(0.75, 300_000), (0.25, 1_100_000)]
E = lambda L: sum(p * x for p, x in L)
SD = lambda L: math.sqrt(sum(p * (x - E(L)) ** 2 for p, x in L))
EU = lambda L, u: sum(p * u(x) for p, x in L)
for L in (A16, B16, C16):
    lik(E(L), 500_000)
euA, euB, euC = (EU(L, math.sqrt) for L in (A16, B16, C16))
assert euA > euC > euB
lnA, lnB, lnC = (EU(L, math.log) for L in (A16, B16, C16))
assert lnA > lnC > lnB


def ssd(X, Y, grid=range(0, 1_200_001, 10_000)):
    """X andreordens stokastisk dominerer Y (lik forventning): integralet av F_Y er minst like stort overalt."""
    def intF(L, x):
        return sum(p * max(0.0, x - v) for p, v in L)
    return all(intF(Y, x) >= intF(X, x) - 1e-9 for x in grid)


assert ssd(A16, B16) and ssd(A16, C16)   # A foretrekkes av enhver risikoavers
r16a = "Avtale 1"
w16a = ["Avtale 2", "Avtale 3", "Alle er like gode, fordi forventet bonus er kr 500 000 i alle tre"]
o16a, p16a = ledd("16a", r16a, w16a)

# b) Hva lønner det seg å forsikre (jf. H2023 11). Sannsynlighetene står bare i løsningen.
W16, hytte16, mob16, bag16, last16 = 2_500_000, 1_200_000, 12_000, 8_000, 0.30
ph, pm = 0.005, 0.10
prem_h = ph * hytte16 * (1 + last16)
prem_m = pm * mob16 * (1 + last16)


def maks_premie(W, tap, p, u, uinv):
    return W - uinv((1 - p) * u(W) + p * u(W - tap))


mp_h_ln = maks_premie(W16, hytte16, ph, math.log, math.exp)
mp_h_sq = maks_premie(W16, hytte16, ph, math.sqrt, lambda v: v * v)
mp_m_ln = maks_premie(W16, mob16, pm, math.log, math.exp)
assert mp_h_ln > prem_h > mp_h_sq     # hytta lønner seg med ln W, ikke med √W: derfor «kan»
assert mp_m_ln < prem_m               # mobilen lønner seg ikke
print(f"  16b: premie hytte {prem_h:.0f}, maks ln {mp_h_ln:.0f}, maks sqrt {mp_h_sq:.0f}; premie mobil {prem_m:.0f}, maks ln {mp_m_ln:.2f}")
r16b = "Det kan lønne seg å forsikre hytta, men ikke mobilen og bagasjen"
w16b = ["Forsikre mobilen og bagasjen, fordi det er der skadene skjer oftest",
        "Ikke forsikre noe, fordi premien er høyere enn forventet erstatning",
        "Forsikre alt, fordi en risikoavers person alltid tjener på forsikring"]
o16b, p16b = ledd("16b", r16b, w16b)

# c) Hva som kan diversifiseres (jf. H2023 12)
r16c = "Vannskader rammer nokså uavhengig av hverandre, mens arbeidsledighet rammer mange samtidig og blir dyrest"
w16c = ["Arbeidsledighet kan diversifiseres best, fordi kundene jobber i ulike bedrifter. Den kan prises lavest",
        "Vannskader kan diversifiseres best, men premien blir den samme fordi forventet erstatning er lik",
        "Ingen av risikoene kan diversifiseres, fordi selskapet ikke vet på forhånd hvilke kunder som rammes"]
o16c, p16c = ledd("16c", r16c, w16c)
EX.append({
    "n": 16, "title": "Risikoaversjon, forsikring og diversifisering",
    "points": 9, "topic": "Forsikring og forventet nytte", "chapters": [17],
    "body": "<p>Tre spørsmål om risikoaversjon og forsikring. Personene er risikoaverse, altså har de en konkav nyttefunksjon.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": ("<p>Selma kan velge mellom tre bonusavtaler for neste år:</p><ul>"
                  "<li>Avtale 1: kr 400 000 eller kr 600 000 med 50 % sannsynlighet hver.</li>"
                  "<li>Avtale 2: kr 200 000 eller kr 800 000 med 50 % sannsynlighet hver.</li>"
                  "<li>Avtale 3: kr 300 000 med 75 % sannsynlighet og kr 1 100 000 med 25 %.</li></ul>"
                  "<p>Hvilken avtale velger hun?</p>"),
         "options": o16a, "answer": p16a,
         "solution": begrep(
             "Med konkav nytte er et lotteri alltid bedre enn et lotteri med samme forventning og ekstra risiko lagt til. Alle tre avtalene har forventning 500 000. Både avtale 2 og 3 er avtale 1 med ekstra risiko.",
             ["<b>Avtale 2</b>: samme forventning, men utfallene er spredt fra 200 000 til 800 000. Avtale 2 er avtale 1 med mer risiko lagt til.",
              "<b>Avtale 3</b>: samme forventning, men 75 % sannsynlighet for bare 300 000. Også avtale 3 er avtale 1 med mer risiko lagt til.",
              "<b>«Alle like gode»</b>: gjelder bare en risikonøytral person, som bare ser på forventningen."],
             f"Med U = √W av bonusen gir avtale 1 {tall(euA, 1)}, avtale 2 {tall(euB, 1)} og avtale 3 {tall(euC, 1)}. Med ln W blir rekkefølgen den samme. Rangeringen mellom 2 og 3 avhenger av nyttefunksjonen, men avtale 1 slår begge for enhver risikoavers person.",
             "Sjekk forventningen først. Er den lik, stryker du «alle like gode» og de to mest spredte avtalene.",
             begrunnelse=f"Forventningene: 0,5 × 400 000 + 0,5 × 600 000 = 500 000, 0,5 × 200 000 + 0,5 × 800 000 = 500 000 og 0,75 × 300 000 + 0,25 × 1 100 000 = 500 000. Standardavvikene er {tall(SD(A16))}, {tall(SD(B16))} og {tall(SD(C16))}. Avtale 1 har minst risiko.")},
        {"label": "b", "points": 3,
         "body": ("<p>Elin har en formue på kr 2,5 mill., der den største eiendelen er en hytte til kr 1,2 mill. Hun får tilbud om tre forsikringer "
                  "med premie 30 % over forventet erstatning: hytta mot brann, mobilen (kr 12 000) mot skade og bagasjen (kr 8 000) på en ferietur. "
                  "Hvilket råd er i tråd med faget?</p>"),
         "options": o16b, "answer": p16b,
         "solution": begrep(
             "Premien har et påslag over forventet erstatning, så forsikring har negativ forventet gevinst. For en risikoavers person kan den likevel gi høyere forventet nytte når tapet er stort i forhold til formuen. Regelen fra kurset: forsikre det du ikke kan bære selv, ikke mobilen.",
             ["<b>«Mobilen og bagasjen, fordi skadene skjer oftest»</b>: hyppighet er ikke poenget. Små tap flytter nesten ikke nytten, så påslaget er bortkastet.",
              "<b>«Ikke noe, fordi premien er høyere enn forventet erstatning»</b>: sammenligner forventet formue, ikke forventet nytte. Da ville ingen risikoavers noen gang forsikret seg.",
              "<b>«Alt, fordi en risikoavers alltid tjener»</b>: «alltid» faller på mobilen og bagasjen."],
             f"Anta 0,5 % brannsannsynlighet. Premien er da {tall(prem_h)}. Med ln W er Elin villig til å betale {tall(mp_h_ln)}, så hun kjøper. Med √W, som er mindre risikoavers, er grensen {tall(mp_h_sq)}. Da lar hun være. "
             f"Derfor «kan». For mobilen med 10 % skadesannsynlighet er premien {tall(prem_m)}, mens selv ln W bare gir {tall(mp_m_ln)}.",
             "To alternativer har «fordi» med en begrunnelse som strider mot forventet nytte. Stryk dem først.")},
        {"label": "c", "points": 3,
         "body": ("<p>Et forsikringsselskap vurderer to produkter med samme forventede erstatning per kunde: forsikring mot vannskade i boliger over hele landet "
                  "og forsikring mot inntektstap ved arbeidsledighet. Hvilket utsagn er riktig?</p>"),
         "options": o16c, "answer": p16c,
         "solution": begrep(
             "Forsikring blir billig når skadene hos kundene er uavhengige av hverandre. Da gjør store tall selskapets samlede utbetaling forutsigbar. Skader som rammer mange samtidig, kan ikke diversifiseres. Selskapet må da holde mer kapital, som kundene betaler for.",
             ["<b>«Arbeidsledighet diversifiseres best»</b>: en lavkonjunktur rammer mange bedrifter samtidig. Ulike arbeidsgivere hjelper lite når hele økonomien faller.",
              "<b>«Lik premie fordi lik forventning»</b>: premien avhenger også av hvor mye risiko selskapet må bære, ikke bare av forventet erstatning.",
              "<b>«Ingen kan diversifiseres»</b>: diversifisering krever ikke at selskapet vet hvem som rammes, bare at skadene er uavhengige."],
             "Arbeidsledighet var riktig svar i H2019 oppgave 7c av samme grunn. Derfor ligger den i folketrygden. H2023 oppgave 12 (husbrann mot pandemi) bruker samme logikk: systematisk risiko må betales for.",
             "Spør om skaden treffer mange samtidig. Gjør den det, er den dyr å forsikre.")},
    ],
})

# =========================================================== OPPGAVE 17 (ledd 28 og 29)
EA, sA, EB, sB, rho = 0.05, 0.10, 0.09, 0.20, 0.25
wmv = (sB**2 - rho * sA * sB) / (sA**2 + sB**2 - 2 * rho * sA * sB)
lik(wmv, 0.875)
var = lambda w: w**2 * sA**2 + (1 - w)**2 * sB**2 + 2 * w * (1 - w) * rho * sA * sB
assert all(var(wmv) <= var(w / 1000) + 1e-15 for w in range(0, 1001))
w_rho0 = sB**2 / (sA**2 + sB**2)
w_sigma = sB / (sA + sB)
lik(w_rho0, 0.8); lik(w_sigma, 2 / 3)
o17a, p17a = ledd("17a", pst(wmv, 1), [pst(w_rho0, 1), pst(1.0, 1), pst(w_sigma, 1)],
                  (tall(wmv * 100, 1), [tall(w_rho0 * 100, 1), "100,0", tall(w_sigma * 100, 1)]))
w_rn = 0.0   # alt i B, som har høyest forventet avkastning
o17b, p17b = ledd("17b", pst(w_rn, 1), [pst(1.0, 1), pst(wmv, 1), pst(0.5, 1)],
                  (tall(0.0, 1), ["100,0", tall(wmv * 100, 1), "50,0"]))
EX.append({
    "n": 17, "title": "Minimum varians og den risikonøytrale investoren",
    "points": 6, "topic": "Porteføljevalg", "chapters": [14],
    "body": ("<p>Aksje A har forventet avkastning 5 % og standardavvik 10 %. Aksje B har forventet avkastning 9 % og standardavvik 20 %. "
             "Korrelasjonen mellom dem er 0,25. Du kan bare investere i disse to aksjene og kan ikke shorte.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Hvor stor andel bør du ha i aksje A hvis du bare bryr deg om å få lavest mulig standardavvik?</p>",
         "options": o17a, "answer": p17a,
         "solution": losning(
             "Andelen i A i minimum-varians-porteføljen er s* = (σ<sub>B</sub>² − ρσ<sub>A</sub>σ<sub>B</sub>)/(σ<sub>A</sub>² + σ<sub>B</sub>² − 2ρσ<sub>A</sub>σ<sub>B</sub>). Forventet avkastning spiller ingen rolle.".replace("−", MINUS),
             ["σ<sub>A</sub>² = 0,01, σ<sub>B</sub>² = 0,04 og ρσ<sub>A</sub>σ<sub>B</sub> = 0,25 × 0,10 × 0,20 = 0,005.",
              f"Teller: 0,04 {MINUS} 0,005 = 0,035. Nevner: 0,01 + 0,04 {MINUS} 2 × 0,005 = 0,04.",
              f"s* = 0,035/0,04 = <b>{pst(wmv, 1)}</b>."],
             [f"<b>{pst(w_rho0, 1)}</b> = 0,04/0,05. Korrelasjonen er satt til null.",
              "<b>100,0 %</b>: alt i aksjen med lavest standardavvik. Så lenge ρ er lavere enn σ<sub>A</sub>/σ<sub>B</sub> = 0,5, senker litt B risikoen.",
              f"<b>{pst(w_sigma, 1)}</b> = 0,20/0,30. Standardavvik er brukt i stedet for varians."],
             f"Standardavviket er {pst(math.sqrt(var(1.0)), 2)} med alt i A, {pst(math.sqrt(var(0.8)), 2)} ved 80 % og {pst(math.sqrt(var(wmv)), 2)} ved 87,5 %, som er minimum. ✓",
             "Med ρ under 0,5 er svaret en indre løsning, så 100 % kan strykes. Med positiv korrelasjon må svaret ligge over 80 %, svaret for ρ = 0.")},
        {"label": "b", "points": 3,
         "body": "<p>En venn av deg bryr seg ikke om risiko og vil bare ha høyest mulig forventet avkastning. Hvor stor andel bør vennen ha i aksje A?</p>",
         "options": o17b, "answer": p17b,
         "solution": losning(
             "Den som ikke bryr seg om risiko, maksimerer forventet avkastning og legger alt i aksjen med høyest forventning.",
             ["Forventet avkastning: A 5 %, B 9 %.",
              "Porteføljens forventning er 5 % × s + 9 % × (1 − s), som faller med s.".replace("−", MINUS),
              "Maksimum ved s = <b>0,0 %</b> i A, altså alt i B."],
             ["<b>100,0 %</b>: A har lavest risiko, men vennen bryr seg ikke om risiko. A har lavest forventning.",
              "<b>87,5 %</b> er minimum-varians-porteføljen fra a, svaret på det andre spørsmålet.",
              "<b>50,0 %</b> er diversifisering for diversifiseringens skyld. Det gir 7 %, mindre enn 9 %."],
             "H2023 oppgave 13 hadde aksjen med lavest risiko også som den med høyest forventning. Her er det omvendt, så de to investorene havner i hver sin ende.",
             "Svaret i b kan ikke være det samme som i a. Det stryker 87,5 % med en gang.")},
    ],
})

# =========================================================== OPPGAVE 18 (ledd 30)
n18, kurt18 = 50, 79
aar18 = n18 * 12 * kurt18
lik(aar18, 47_400)
w18_mnd = n18 * kurt18
w18_dobbel = 2 * aar18


def o18(navn, x):
    return f"{navn}: {kr(x)} i året"


o18x, p18 = ledd("18", o18("Overkonfidens", aar18), [o18("Overkonfidens", w18_dobbel), o18("Flokkatferd", aar18), o18("Flokkatferd", w18_dobbel)],
                 (tall(aar18), [tall(w18_dobbel), tall(aar18), tall(w18_dobbel)]))
EX.append({
    "n": 18, "title": "Stian og kurtasjen",
    "points": 3, "topic": "Finansiell psykologi", "chapters": [18],
    "body": ("<p>Stian er sikker på at han plukker vinneraksjer bedre enn markedet. Han gjør i snitt 50 handler i måneden, der hver handel er ett kjøp "
             "eller ett salg. Kurtasjen er kr 79 per handel. Hvilket alternativ angir både skjevheten Stian viser og kurtasjen han betaler i året?</p>"),
    "options": o18x, "answer": p18,
    "solution": losning(
        "Overkonfidens er å tro at du vet mer om selskapene enn markedet gjør. Den viser seg som hyppig handel. Markedet er gjennomsnittet av alle investorer før kostnader, så kurtasjen kommer oppå et nullspill.",
        [f"Handler i året: {n18} × 12 = {tall(n18*12)}.",
         f"Kurtasje: {tall(n18*12)} × {kurt18} = <b>{kr(aar18)}</b>.",
         "Skjevheten: troen på egne evner til å slå markedet er <b>overkonfidens</b>."],
        [f"<b>{o18('Overkonfidens', w18_dobbel)}</b>: riktig skjevhet, men hver handel er talt som både kjøp og salg. Oppgaven sier at hver handel er ett av dem.",
         f"<b>{o18('Flokkatferd', aar18)}</b>: riktig beløp, men flokkatferd er å følge mengden. Stian stoler på seg selv.",
         f"<b>{o18('Flokkatferd', w18_dobbel)}</b>: begge feilene."],
        f"Forelesningens regnestykke er bygget likt: 3 600 handler à kr 79 gir 79 × 3 600 = 284 400. Stian gjør {tall(n18*12)} handler og betaler {tall(aar18)}. ✓ "
        "Odean (1999) fant at de som handler oftest, sitter igjen med lavest avkastning.",
        "Alternativene er to valg ganger to: skjevheten og beløpet. Avgjør dem hver for seg. Navnet stryker to alternativer, regnestykket ett til."),
})

# ===================================================== sett-nivå og kontroller
sett = {
    "id": "prove4", "kind": "mock", "label": "Prøveeksamen 4",
    "minutes": 240, "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, " + MINUS + "1 for feil",
    "note": ("Ligner H2023 og kursgodkjenningen 2026. Skattedelen åpner med en skjermingstabell over fire år som ender i et salg. "
             "Så følger oppjusteringsfaktoren og samlet sats, formuesskatt med gjeldsfordeling, utbyttet som dekker formuesskatten, "
             "utbytte fra en svensk aksje, realavkastning og stykkskatt med lineære kurver skrevet med symboler. Om lag halvparten av leddene er påstandsspørsmål i stilen "
             "fra kursgodkjenningen: fritaksmetoden, skjerming ved kjøp i desember, korttidsutleie, progressivitet, tapsfradrag, bosted, exit-skatt og skatteparadiser. "
             "Finansdelen er mest begreper, som i H2023, med minimum varians og ett kort regnestykke om kurtasje."),
    "facts": [
        "30 flervalgsledd i 18 oppgaver. Fire alternativer per ledd og nøyaktig ett riktig.",
        "3 poeng for rett, " + MINUS + "1 for feil og 0 for ubesvart. Maks 90 poeng.",
        "Skattedelen har 21 ledd (63 poeng) og finansdelen 9 ledd (27 poeng).",
        "16 av 30 ledd har tallsvar med høyst tre regnetrinn. Resten er påstands- og begrepsspørsmål som i kursgodkjenningen 2026.",
        "2026-regler: eierskatt 37,84 %, formuesskatt 1,0 % over 1,9 mill., exit-skatt på gaver når gevinsten passerer 100 000 i året. Oppgave 2, 4 og 11 bruker egne satser og sier det i teksten.",
    ],
    "practiceNote": ("Kjør settet på tid med minuspoeng slått på. I påstandsspørsmålene avgjør ofte ett ord: les «kan», «alltid» og «så lenge» presist. "
                     "I regneleddene er de gale alternativene nesten alltid et mellomresultat eller samme regnestykke med ett ledd utelatt. "
                     "Regn ferdig før du ser på alternativene. Kan du stryke ett alternativ, lønner det seg å svare."),
    "mc": {"wrongFactor": -0.3333333333333333},
    "exercises": EX,
}

alle = [p for ex in EX for p in ex.get("parts", [ex])]
assert len(LEDD) == len(alle) == 30, (len(LEDD), len(alle))
for i, (p, (merke, opts, pos)) in enumerate(zip(alle, LEDD)):
    assert p["options"] == opts and p["answer"] == PLAN[i] == pos, merke
for ex in EX:
    if "parts" in ex:
        assert sum(p["points"] for p in ex["parts"]) == ex["points"], ex["n"]
        assert all(p["points"] == 3 for p in ex["parts"])
    else:
        assert ex["points"] == 3
assert sum(ex["points"] for ex in EX) == 90
assert sum(len(ex.get("parts", [1])) for ex in EX if ex["n"] <= 13) == 21
assert [ex["n"] for ex in EX] == list(range(1, 19))

# Hvert talls alternativ inneholder tallet skriptet har regnet
for merke, opts, biter in TALLSJEKK:
    for o, b in zip(opts, biter):
        assert b in o, (merke, o, b)
print(f"Tallsjekk: {len(TALLSJEKK)} regneledd, hvert alternativ inneholder sitt regnede tall.")

tekst = json.dumps(sett, ensure_ascii=False)
assert "—" not in tekst and "–" not in tekst, "tankestrek"
treff = [tekst[max(0, m.start() - 50):m.start() + 15] for m in re.finditer(r",\s*og\b", tekst)]
assert not treff, treff
assert "-1 for feil" not in tekst


# Kalibrering med samme metode som tools/sjekk-prove.js
def strip(s):
    return re.sub(r"\s+", " ", re.sub(r"&[a-z]+;", " ", re.sub(r"<[^>]+>", " ", str(s or "")))).strip()


def tallverdi(s):
    t = re.sub(r"\s(?=\d{3}\b)", "", strip(s)).replace(MINUS, "-")
    m = re.search(r"-?\d+(?:,\d+)?", t)
    return float(m.group(0).replace(",", ".")) if m else None


n = ordsum = tl = 0
lengst = tekstledd = 0
rang = {"minst": 0, "midten": 0, "størst": 0}
print("Ledd   ord type lengder (riktig markert)")
for ex in EX:
    L = ex.get("parts") or [ex]
    felles = len(strip(ex["body"]).split(" "))
    for p in L:
        n += 1
        ord_ = felles if p is ex else felles / len(L) + len(strip(p["body"]).split(" "))
        ordsum += ord_
        er_tall = all(re.search(r"\d", strip(x)) and len(strip(x)) < 40 for x in p["options"])
        tl += er_tall
        ln = [len(strip(x)) for x in p["options"]]
        if er_tall:
            v = [tallverdi(x) for x in p["options"]]
            s = sorted(v)
            rang["størst" if v[p["answer"]] == s[3] else "minst" if v[p["answer"]] == s[0] else "midten"] += 1
        else:
            tekstledd += 1
            if ln[p["answer"]] == max(ln) and ln.count(max(ln)) == 1:
                lengst += 1
        merk = " ".join(f"[{x}]" if i == p["answer"] else str(x) for i, x in enumerate(ln))
        print(f"{n:4} {ord_:6.1f} {'T' if er_tall else 'B'}  {merk}")
print(f"Kalibrering: {ordsum/n:.1f} ord per ledd, {tl/n*100:.0f} % tallsvar ({tl} av {n})")
print(f"Tekstledd {tekstledd}: riktig er lengst i {lengst}. Tallledd: {rang}")
print("Fasit A til D:", [sum(1 for p in alle if p["answer"] == k) for k in range(4)])

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(sett, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
print("Skrev", UT)
