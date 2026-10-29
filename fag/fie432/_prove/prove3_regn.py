#!/usr/bin/env python3
"""Prøveeksamen 3 i FIE432, skoleeksamensformat: alle tall regnes her og skriptet bygger prove3.json.

Temaer fra H2022 og de eldre settene, kalibrert mot skoleeksamenene H2023 til H2025 og
kursgodkjenningen 2026 (docs/fie432-proveeksamen-spek.md, «Kalibrering mot skoleeksamen»).

Kjør:  python3 -I prove3_regn.py  [utfil]
Standard utfil er prove3.json i samme mappe som skriptet.
Fasitposisjonene leses fra fasitplan.json (nøkkel p3) i samme mappe.
"""
import json, math, os, re, sys

HER = os.path.dirname(os.path.abspath(__file__))
PLAN = json.load(open(os.path.join(HER, "fasitplan.json")))["p3"]
UT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HER, "prove3.json")

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


def af(r, n):
    return (1 - (1 + r) ** -n) / r


def annuitet(L, r, n):
    return L * r / (1 - (1 + r) ** -n)


LEDD = []


def ledd(merke, riktig, gale):
    """Plasser riktig alternativ der fasitplanen sier. gale = tre alternativer i rekkefølge."""
    pos = PLAN[len(LEDD)]
    assert len(gale) == 3
    opts = list(gale)
    opts.insert(pos, riktig)
    assert len(set(opts)) == 4, opts
    LEDD.append((merke, opts, pos))
    return opts, pos


def losning(regel, steg, gale, kontroll, strategi=None, ekstra=None):
    s = f"<p><b>Regelen.</b> {regel}</p>"
    s += "<p><b>Regnestykket.</b></p><p>" + "<br>".join(f"{i}. {t}" for i, t in enumerate(steg, 1)) + "</p>"
    s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(gale) + "</p>"
    s += f"<p><b>Kontroll.</b> {kontroll}</p>"
    if ekstra:
        s += ekstra
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    return s


def begrep(regel, gale, kontroll=None, strategi=None):
    s = f"<p><b>Regelen.</b> {regel}</p>"
    s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(gale) + "</p>"
    if kontroll:
        s += f"<p><b>Kontroll.</b> {kontroll}</p>"
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    return s


EX = []
tA, f = 0.22, 1.72
te = f * tA
lik(te, 0.3784)

# =========================================================== OPPGAVE 1 (ledd 1 til 4)
K, pi1, rs1, rs2, rs3 = 1_000_000, 250_000, 0.03, 0.04, 0.03
sel1 = pi1 * tA
utb1 = pi1 - sel1
skj1 = K * rs1
sp1 = utb1 - skj1
eier1 = sp1 * te
lik(eier1, 62_436)
g1a_begge, g1a_skj, g1a_sel = utb1 * tA, utb1 * te, (pi1 - skj1) * te   # begge glemt = 58 % av skjerming glemt
lik(g1a_begge, 42_900)
samlet1 = (sel1 + eier1) / pi1
lik(samlet1, tA + sp1 / pi1 * te)
uten_skj = tA + (1 - tA) * te

D3 = 100_000
skj2 = K * rs2
grunn3 = K + skj2
skj3 = grunn3 * rs3
sp3 = D3 - skj2 - skj3
lik(sp3, 28_800)
g1c_kost, g1c_glemt, g1c_grunn = D3 - skj2 - K * rs3, D3 - K * rs3, D3 - skj3
lik(K * (1 + rs2) * (1 + rs3) - K, skj2 + skj3)

salg = 1_200_000
gev = salg - K - skj2
skatt_gev = gev * te
lik(skatt_gev, 60_544)
g1d_glemt, g1d_salgsar, g1d_begge = (salg - K) * te, (gev - skj3) * te, (salg - K) * tA
lik(g1d_begge, 44_000)

o1a, _ = ledd("1a", Kr(eier1), [Kr(g1a_skj), Kr(g1a_begge), Kr(g1a_sel)])
r1b = "Mindre enn 51,52 %, fordi skjermingen gjør en del av utbyttet skattefri."
w1b = ["22 % + 37,84 % = 59,84 %, siden selskap og eier skattlegges hver for seg.",
       "Nøyaktig 51,52 %, uansett hvor stort skjermingsfradraget er.",
       "Mer enn 51,52 %, fordi utbyttet oppjusteres med 1,72."]
o1b, _ = ledd("1b", r1b, w1b)
o1c, _ = ledd("1c", Kr(sp3), [Kr(g1c_kost), Kr(g1c_glemt), Kr(g1c_grunn)])
o1d, _ = ledd("1d", Kr(skatt_gev), [Kr(g1d_glemt), Kr(g1d_begge), Kr(g1d_salgsar)])

EX.append({
    "n": 1, "title": "Ingrid og Bergamo AS: utbytte, skjerming og gevinst",
    "points": 12, "topic": "Aksjonærmodellen", "chapters": [5],
    "body": (f"<p>Ingrid kjøpte alle aksjene i Bergamo AS for {kr(K)} ved utgangen av år 0. Selskapsskatten er 22 %. "
             "Eierskatten er 22 % ganget med oppjusteringsfaktoren 1,72. Skjermingsrenten er 3 % i år 1, 4 % i år 2 og 3 % i år 3. "
             "Hvert ledd står for seg.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": f"<p>I år 1 tjener Bergamo AS {kr(pi1)} før skatt og deler ut alt som er igjen etter selskapsskatt. Hvor mye eierskatt betaler Ingrid?</p>",
         "options": o1a, "answer": PLAN[0],
         "solution": losning(
             f"Eierskatt = (utbytte {MINUS} skjermingsfradrag) × 1,72 × 22 %. Utbyttet er overskuddet etter selskapsskatt. Skjermingen er kostprisen ganget med skjermingsrenten.",
             [f"Utbytte = {tall(pi1)} × 0,78 = {tall(utb1)}.",
              f"Skjerming = {tall(K)} × 3 % = {tall(skj1)}, så skattepliktig utbytte = {tall(sp1)}.",
              f"Eierskatt = {tall(sp1)} × 37,84 % = <b>{kr(eier1)}</b>."],
             [f"<b>{Kr(g1a_skj)}</b> = {tall(utb1)} × 37,84 %: skjermingen er glemt.",
              f"<b>{Kr(g1a_begge)}</b> = {tall(utb1)} × 22 %: både skjermingen og oppjusteringen er glemt. Tallet er 58 % av {tall(g1a_skj)}, som har glemt skjermingen.",
              f"<b>{Kr(g1a_sel)}</b> = ({tall(pi1)} {MINUS} {tall(skj1)}) × 37,84 %: selskapsskatten er ikke trukket fra før utdelingen."],
             f"Oppjuster grunnlaget i stedet: {tall(sp1)} × 1,72 = {tall(sp1*f)}, og {tall(sp1*f)} × 22 % = {tall(eier1)}. ✓".replace(", og", " og")),
         },
        {"label": "b", "points": 3,
         "body": "<p>Bergamo AS deler ut hele overskuddet etter selskapsskatt i år 1. Hvor stor andel av overskuddet før skatt går samlet til skatt?</p>",
         "options": o1b, "answer": PLAN[1],
         "solution": begrep(
             f"Samlet sats = 22 % + (utbytte {MINUS} skjerming)/overskudd × 37,84 %. Uten skjerming er den 22 % + 78 % × 37,84 % = 51,52 %. Skjermingen gjør en del av utbyttet skattefri, så satsen blir lavere. Med tallene i a: ({tall(sel1)} + {tall(eier1)})/{tall(pi1)} = {pst(samlet1,2)}.",
             ["<b>59,84 %</b>: satsene er lagt sammen. Eierskatten treffer bare det som er igjen etter selskapsskatten.",
              "<b>Nøyaktig 51,52 %</b>: gjelder bare når skjermingsfradraget er null.",
              "<b>Mer enn 51,52 %</b>: oppjusteringen er alt med i 37,84 %. Den kommer ikke i tillegg."],
             f"22 % + {tall(sp1)}/{tall(pi1)} × 37,84 % = 22 % + {tall(sp1/pi1*te*100,2)} % = {pst(samlet1,2)}. ✓"),
         },
        {"label": "c", "points": 3,
         "body": f"<p>Utbyttet i år 1 er større enn skjermingen. I år 2 deler selskapet ikke ut noe. I år 3 får Ingrid {kr(D3)} i utbytte og eier fortsatt aksjene ved årsslutt. Hva er skattepliktig utbytte i år 3, før oppjustering?</p>",
         "options": o1c, "answer": PLAN[2],
         "solution": losning(
             "Ubenyttet skjerming framføres. Den legges til neste års skjermingsgrunnlag og trekkes i tillegg fra neste års utbytte.",
             [f"År 2: {tall(K)} × 4 % = {tall(skj2)}, alt ubenyttet.",
              f"År 3: ({tall(K)} + {tall(skj2)}) × 3 % = {tall(skj3)}.",
              f"Skattepliktig = {tall(D3)} {MINUS} {tall(skj2)} {MINUS} {tall(skj3)} = <b>{kr(sp3)}</b>."],
             [f"<b>{Kr(g1c_kost)}</b>: årets skjerming regnet av kostprisen ({tall(K)} × 3 %), ikke av grunnlaget med framført skjerming.",
              f"<b>{Kr(g1c_glemt)}</b> = {tall(D3)} {MINUS} {tall(K*rs3)}: den framførte skjermingen er glemt helt.",
              f"<b>{Kr(g1c_grunn)}</b> = {tall(D3)} {MINUS} {tall(skj3)}: den framførte skjermingen er lagt til grunnlaget, men ikke trukket fra utbyttet."],
             f"Grunnlaget vokser med renten i år uten utbytte: {tall(K)} × 1,04 × 1,03 = {tall(K*1.04*1.03)}. Skjerming til disposisjon = {tall(skj2+skj3)}, og {tall(D3)} {MINUS} {tall(skj2+skj3)} = {tall(sp3)}. ✓".replace(", og", " og")),
         },
        {"label": "d", "points": 3,
         "body": f"<p>Ingrid har {kr(skj2)} i ubenyttet skjerming fra år 2. Hun selger alle aksjene i juni år 3 for {kr(salg)}. Hvor mye skatt betaler hun på gevinsten?</p>",
         "options": o1d, "answer": PLAN[3],
         "solution": losning(
             f"Gevinst = salgssum {MINUS} kostpris {MINUS} ubenyttet skjerming. Skjermingen for et år går til den som eier aksjen ved årsslutt, så salgsåret gir ingen ny skjerming.",
             [f"Gevinst = {tall(salg)} {MINUS} {tall(K)} {MINUS} {tall(skj2)} = {tall(gev)}.",
              "Ingen skjerming for år 3, siden hun selger i juni.",
              f"Skatt = {tall(gev)} × 37,84 % = <b>{kr(skatt_gev)}</b>."],
             [f"<b>{Kr(g1d_glemt)}</b> = {tall(salg-K)} × 37,84 %: den ubenyttede skjermingen er ikke trukket fra.",
              f"<b>{Kr(g1d_salgsar)}</b> = ({tall(gev)} {MINUS} {tall(skj3)}) × 37,84 %: skjerming også for salgsåret.",
              f"<b>{Kr(g1d_begge)}</b> = {tall(salg-K)} × 22 %: både den ubenyttede skjermingen og oppjusteringen er glemt."],
             f"Ingrid beholder {tall(gev-skatt_gev)} av gevinsten, altså 62,16 % = 1 {MINUS} 37,84 %. ✓",
             strategi=f"{tall(g1d_begge)}/{tall(g1d_glemt)} = {tall(g1d_begge/g1d_glemt,2)}: det lave tallet i et 58 %-par har glemt oppjusteringen, men det høye kan ha en annen feil. Her mangler begge den ubenyttede skjermingen. Regn ferdig før du velger."),
         },
    ],
})

# =========================================================== OPPGAVE 2 (ledd 5)
tw, aL, tA2, t2 = 0.48, 0.12, 0.24, 0.24
y = (tw + aL - tA2) / t2
lik(y, 1.5)
y_gml = (tw + aL - tA2) / ((1 - tA2) * t2)   # eldre effektiv form med avgift
y_aga = (tw - tA2) / t2                      # avgiften glemt
y_bed = (tw - tA2 - aL) / t2                 # avgiften lagt hos bedriften


def yopt(yv):
    ev = yv * t2
    assert round(round(yv, 2) * t2 * 100) == round(ev * 100)
    return f"Oppjusteringsfaktor {tall(yv,2)} og eierskattesats {tall(ev*100,0)} %"


o2, _ = ledd("2", yopt(y), [yopt(y_gml), yopt(y_bed), yopt(y_aga)])
EX.append({
    "n": 2, "title": "Inntektsskiftingslikningen med nye satser",
    "points": 3, "topic": "Aksjonærmodellen", "chapters": [5],
    "body": ("<p>Regjeringen vil at det ikke skal lønne seg å ta ut lønn som utbytte. Høyeste marginalskatt på lønn er 48 %. "
             "Arbeidstakeren bærer arbeidsgiveravgift som utgjør 12 % av lønnskostnaden. Selskapsskatten er 24 %. "
             "Eierskatten er 24 % ganget med en oppjusteringsfaktor. Bruk inntektsskiftingslikningen slik den forelestes i 2026.</p>"
             "<p>Hva blir oppjusteringsfaktoren og eierskattesatsen (faktoren ganget med 24 %)?</p>"),
    "options": o2, "answer": PLAN[4],
    "solution": losning(
        "Likningen fra forelesning 5 i 2026 legger nominelle satser sammen: t<sub>w</sub> + a = t<sub>A</sub> + y × t, der t er satsen eierskatten regnes med før oppjustering. Med dagens satser: 47,4 % + 12,4 % = 22 % + 22 % × y, som gir y ≈ 1,72.",
        ["Venstre side: 48 % + 12 % = 60 %.",
         f"60 % = 24 % + 24 % × y ⇒ y = 36/24 = <b>{tall(y,2)}</b>.",
         f"Eierskattesats = 24 % × {tall(y,2)} = <b>36 %</b>."],
        [f"<b>{tall(y_gml,2)} og {tall(y_gml*t2*100,0)} %</b>: den eldre likningen fra H2017 og H2020 med effektive satser, 60 % = 24 % + 76 % × 24 % × y. Den gjelder ikke i 2026.",
         f"<b>{tall(y_bed,2)} og {tall(y_bed*t2*100,0)} %</b>: avgiften er flyttet til høyre side, som om bedriften bærer den.",
         f"<b>{tall(y_aga,2)} og {tall(y_aga*t2*100,0)} %</b>: arbeidsgiveravgiften er glemt, 48 % = 24 % + 24 % × y."],
        "24 % + 36 % = 60 % = 48 % + 12 %. ✓ Bare ett alternativ gir 60 % på høyre side."),
})

# =========================================================== OPPGAVE 3 (ledd 6 og 7)
villa, leil, fond, bank, G = 160 * 100_000, 50 * 90_000, 2_500_000, 1_000_000, 12_000_000
T14 = 14_000_000
fv_villa = 0.25 * T14 + 0.70 * (villa - T14)
FV = fv_villa + leil + 0.8 * fond + bank
lik(FV, 12_400_000)
g3_ingen = 0.25 * villa + leil + 0.8 * fond + bank
g3_10 = 0.25 * 10_000_000 + 0.70 * (villa - 10_000_000) + leil + 0.8 * fond + bank
g3_70 = 0.70 * villa + leil + 0.8 * fond + bank
MV = villa + leil + fond + bank
gj_fond = G * fond / MV
FRAD = G - 0.2 * gj_fond
netto = FV - FRAD
lik(netto, 650_000)
o3a, _ = ledd("3a", Kr(FV), [Kr(g3_10), Kr(g3_70), Kr(g3_ingen)])
r3b = "Gjelden fordeles etter markedsverdi. Bare den delen som faller på aksjefondet, reduseres med 20 %."
w3b = ["Gjelden fordeles etter formuesverdi, slik at villaen får en mindre del av gjelden enn etter markedsverdi.",
       "Gjelden som faller på villaen, reduseres med 75 %, på samme måte som villaen verdsettes.",
       "Gjelden som faller på leiligheten, reduseres med 20 %, fordi en utleiebolig regnes som næringseiendom."]
o3b, _ = ledd("3b", r3b, w3b)
EX.append({
    "n": 3, "title": "Hildes formue: verdsetting og gjeldsfordeling",
    "points": 6, "topic": "Formuesskatt", "chapters": [7],
    "body": (f"<p>Hilde eier en villa som er primærbolig (160 kvm, kvadratmetersats {kr(100000)}), en utleieleilighet som er sekundærbolig "
             f"(50 kvm, kvadratmetersats {kr(90000)}), et rent aksjefond verdt {kr(fond)} og {kr(bank)} i banken. Hun har {kr(G)} i gjeld. "
             "Markedsverdien av boligene er areal ganget med kvadratmetersats. Bruk 2026-reglene: primærbolig 25 % opp til kr 14 mill. og 70 % over, "
             "sekundærbolig 100 %, aksjefond 80 %, bank 100 %.</p>"),
    "parts": [
        {"label": "a", "points": 3, "body": "<p>Hva er den samlede formuesverdien før gjeld?</p>",
         "options": o3a, "answer": PLAN[5],
         "solution": losning(
             "Formuesverdi = markedsverdi × verdsettingsandel. Primærboligen har to sjikt.",
             [f"Villa: 160 × 100 000 = {tall(villa)}. Formuesverdi {tall(T14)} × 25 % + {tall(villa-T14)} × 70 % = {tall(fv_villa)}.",
              f"Leilighet 50 × 90 000 = {tall(leil)} (100 %). Fond {tall(fond)} × 80 % = {tall(0.8*fond)}. Bank {tall(bank)}.",
              f"Sum = <b>{kr(FV)}</b>."],
             [f"<b>{Kr(g3_ingen)}</b>: hele villaen til 25 %, slik det var før terskelen.",
              f"<b>{Kr(g3_10)}</b>: terskelen på 10 mill. fra 2024 og 2025.",
              f"<b>{Kr(g3_70)}</b>: hele villaen til 70 %."],
             f"Markedsverdi {tall(MV)} minus rabattene {tall(villa-fv_villa)} (villa) og {tall(0.2*fond)} (fond) = {tall(FV)}. ✓"),
         },
        {"label": "b", "points": 3,
         "body": "<p>Gjelden skal fordeles forholdsmessig, og gjeldsreduksjonen skal brukes der loven gir den. Hvilket utsagn er riktig?</p>".replace(", og", " og"),
         "options": o3b, "answer": PLAN[6],
         "solution": begrep(
             f"Gjelden fordeles etter markedsverdi. Gjeld som faller på aksjer og aksjefond, reduseres med samme rabatt som aktivumet (20 %). Primærbolig, sekundærbolig og bank gir ingen reduksjon. "
             f"Her: fondet får {tall(gj_fond)} av gjelden, som reduseres med {tall(0.2*gj_fond)}. Nettoformuen blir {tall(FV)} {MINUS} {tall(FRAD)} = {tall(netto)}.",
             ["<b>Etter formuesverdi</b>: fordelingsnøkkelen er markedsverdien, ikke den rabatterte verdien.",
              "<b>Villagjelden redusert med 75 %</b>: gjeld på primærbolig reduseres aldri. Det er hele grunnen til at belånt bolig er gunstig i formuesskatten.",
              "<b>Leilighetsgjelden redusert</b>: sekundærbolig verdsettes til 100 % og har ingen rabatt å overføre til gjelden."],
             f"Aggregatformelen: {tall(G)} × (1 {MINUS} {tall(fond)} × 20 %/{tall(MV)}) = {tall(FRAD)}. ✓"),
         },
    ],
})

# =========================================================== OPPGAVE 4 (ledd 8 og 9)
r4a = "Jo lavere avkastningen er, desto større andel av den tar formuesskatten."
w4a = ["Formuesskatten tar like stor andel av avkastningen uansett hvor høy avkastningen er.",
       "En formuesskatt på 1 % tilsvarer en skatt på 1 % av avkastningen.",
       "Gir selskapet ingen avkastning et år, betaler Kjersti ingen formuesskatt det året."]
o4a, _ = ledd("4a", r4a, w4a)
FV4 = 30_000_000
F4 = FV4 * 0.01
D4 = F4 / (1 - te)
lik(D4 * (1 - te), F4)
o4b, _ = ledd("4b", Kr(D4), [Kr(F4 / (1 - tA)), Kr(F4), Kr(F4 * (1 + te))])
EX.append({
    "n": 4, "title": "Kjersti: formuesskatten som skatt på avkastningen",
    "points": 6, "topic": "Formuesskatt som avkastningsskatt", "chapters": [8],
    "body": "<p>Kjersti eier alle aksjene i et familieselskap. Formuesskatten er 1 %. Se bort fra rabatter, bunnfradrag og skjerming.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Hvilket utsagn om formuesskatten sett som en skatt på avkastningen er riktig?</p>",
         "options": o4a, "answer": PLAN[7],
         "solution": begrep(
             "Formuesskatten er et fast beløp av formuen, uansett hva formuen kaster av seg. Som skatt på avkastningen blir satsen t = τ/r: ved 5 % avkastning tar 1 % formuesskatt 20 % av avkastningen, ved 2 % tar den 50 %.",
             ["<b>Lik andel uansett avkastning</b>: andelen er τ/r og stiger når r faller.",
              "<b>1 % av avkastningen</b>: forveksler 1 % av formuen med 1 % av avkastningen. Ved 5 % avkastning er det 20 % av avkastningen.",
              "<b>Ingen avkastning, ingen skatt</b>: formuesskatten spør ikke om det er noe å skatte av. Den må da betales av selve formuen."],
             "Med formue 100 og 1 % skatt: ved r = 5 % er skatten 1 av 5 (20 %), ved r = 2 % er den 1 av 2 (50 %). ✓"),
         },
        {"label": "b", "points": 3,
         "body": f"<p>Aksjenes formuesverdi er {kr(FV4)}. Kjersti har ingen andre likvide midler og må ta utbytte for å betale formuesskatten. Eierskatten er 22 % ganget med 1,72. Hvor stort utbytte må hun ta? Avrund til nærmeste krone.</p>",
         "options": o4b, "answer": PLAN[8],
         "solution": losning(
             f"Utbyttet må brutto-regnes: D × (1 {MINUS} 0,3784) = formuesskatten.",
             [f"Formuesskatt = {tall(FV4)} × 1 % = {tall(F4)}.",
              f"D = {tall(F4)}/0,6216 = <b>{kr(D4)}</b>."],
             [f"<b>{Kr(F4*(1+te))}</b> = {tall(F4)} × 1,3784: skatten lagt oppå. Etter skatt gir det bare {tall(F4*(1+te)*(1-te))}.",
              f"<b>{Kr(F4/(1-tA))}</b> = {tall(F4)}/0,78: oppjusteringen er glemt.",
              f"<b>{Kr(F4)}</b>: bare formuesskatten. Utbyttet skattlegges selv."],
             f"{tall(D4,2)} × 37,84 % = {tall(D4*te,2)} i utbytteskatt. {tall(D4,2)} {MINUS} {tall(D4*te,2)} = {tall(D4*(1-te),2)}. ✓"),
         },
    ],
})

# =========================================================== OPPGAVE 5 (ledd 10 til 12)
a5, b5, c5, t5 = 20, 0.5, 6, 4
P0 = a5 - b5 * (a5 - c5) / (2 * b5)
Pt = a5 - b5 * (a5 - c5 - t5) / (2 * b5)
lik(P0, 13); lik(Pt, 15); lik((a5 + c5 + t5) / 2, Pt)
o5a, _ = ledd("5a", Kr(Pt), [Kr(P0 + t5), Kr(c5 + t5), Kr(P0)])
kons = 1.4 / (1.4 + 0.6)
Pk = 40 + kons * 5
pp = Pk - 5
lik(pp, 38.5)
o5b, _ = ledd("5b", Kr(pp, 2), [Kr(40 - 5 / 2, 2), Kr(40 - kons * 5, 2), Kr(35, 2)])
r5c = "Fordelingen blir den samme i (I) og (II). Den avgjøres av helningene på kurvene, ikke av hvem som betaler inn."
w5c = ["I (I) bærer produsentene hele avgiften og i (II) forbrukerne, fordi den som betaler inn, også bærer den.",
       "Forbrukerne bærer hele avgiften i begge tilfeller, fordi produsentene alltid kan velte den over i prisen.",
       "Byrden deles nøyaktig likt mellom forbrukere og produsenter i begge tilfeller, siden markedet har frikonkurranse."]
o5c, _ = ledd("5c", r5c, w5c)
EX.append({
    "n": 5, "title": "Stykkskatt: monopol, elastisiteter og hvem som betaler inn",
    "points": 9, "topic": "Skatteincidens", "chapters": [11],
    "body": "<p>Tre spørsmål om hvem som bærer en stykkskatt. Hvert spørsmål står for seg.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": f"<p>En monopolist har etterspørselen P = 20 {MINUS} 0,5Q og konstant grensekostnad 6. Myndighetene innfører en stykkskatt på kr 4 per enhet. Hva blir monopolprisen?</p>",
         "options": o5a, "answer": PLAN[9],
         "solution": losning(
             f"Monopolisten setter MR = MC + t. Med P = a {MINUS} bQ er MR = a {MINUS} 2bQ.",
             [f"MR = 20 {MINUS} Q. Uten skatt: 20 {MINUS} Q = 6 gir Q = 14 og P = 13.",
              f"Med skatt: 20 {MINUS} Q = 10 gir Q = 10 og P = 20 {MINUS} 5 = <b>15</b>.",
              "Prisen stiger med 2, halvparten av skatten."],
             ["<b>Kr 17</b> = 13 + 4: hele skatten veltet over. Det er feilen direktøren gjør i H2021 oppgave 2.",
              "<b>Kr 10</b> = grensekostnad + skatt: prisen satt som under frikonkurranse.",
              "<b>Kr 13</b>: prisen uendret, som om monopolisten bærer alt."],
             "P = (a + c + t)/2 = (20 + 6 + 4)/2 = 15. ✓"),
         },
        {"label": "b", "points": 3,
         "body": f"<p>I et marked med frikonkurranse er likevektsprisen kr 40. Etterspørselselastisiteten er {MINUS}0,6 og tilbudselastisiteten 1,4. Kurvene er lineære. En stykkskatt på kr 5 per enhet legges på produsentene. Hvilken pris sitter produsentene igjen med?</p>",
         "options": o5b, "answer": PLAN[10],
         "solution": losning(
             "Konsumentens andel av skatten er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Den minst elastiske siden bærer mest.",
             ["Konsumentens andel = 1,4/2,0 = 70 %, produsentens 30 %.",
              f"P = 40 + 0,70 × 5 = {tall(Pk,2)}.",
              f"p = {tall(Pk,2)} {MINUS} 5 = <b>{kr(pp,2)}</b>."],
             [f"<b>{Kr(40-5/2,2)}</b> = 40 {MINUS} 2,50: skatten delt likt. Lik deling krever like elastisiteter i tallverdi.",
              f"<b>{Kr(40-kons*5,2)}</b>: andelene byttet om.",
              "<b>Kr 35,00</b>: produsentene bærer alt fordi de betaler inn. Formell og reell insidens er ikke det samme."],
             f"{tall(Pk,2)} {MINUS} {tall(pp,2)} = 5 = t. ✓"),
         },
        {"label": "c", "points": 3,
         "body": "<p>Regjeringen innfører en avgift på kr 2 per liter på en vare. Den kan kreves inn på to måter: (I) produsentene betaler den inn til staten, eller (II) forbrukerne betaler den inn ved kassen. Markedet har frikonkurranse, stigende tilbud og fallende etterspørsel. Hvilket utsagn er riktig?</p>",
         "options": o5c, "answer": PLAN[11],
         "solution": begrep(
             "Likevekten D(p + t) = S(p) er den samme uansett hvem som betaler inn. Fordelingen avgjøres av helningene: ∂P/∂t = S′/(S′ " + MINUS + " D′) og ∂p/∂t = D′/(S′ " + MINUS + " D′).",
             ["<b>Den som betaler inn, bærer</b>: formell insidens forvekslet med reell.",
              "<b>Forbrukerne bærer alt</b>: gjelder bare med perfekt uelastisk etterspørsel eller perfekt elastisk tilbud.",
              "<b>Delt likt</b>: krever like helninger i tallverdi. Frikonkurranse sier ingenting om det."],
             "Med D′ = " + MINUS + "2 og S′ = 3 bærer forbrukerne 60 % og produsentene 40 % i begge innkrevingsformene. ✓"),
         },
    ],
})

# =========================================================== OPPGAVE 6 (ledd 13)
L6, r6 = 2_000_000, 0.045
rente6 = L6 * r6
gev6 = rente6 * tA
lik(gev6, 19_800)
lik_r6 = r6 * (1 - tA)
r6o = f"Han tjener {kr(gev6)} i året, inntil markedet byr renten på papiret ned til {tall(lik_r6*100,2)} %."
w6 = ["Han tjener ingenting, fordi renteinntekten og rentekostnaden er like store hvert år.",
      f"Han tjener {kr(rente6*0.474)} i året, fordi rentefradraget er verdt marginalskatten hans på lønn.",
      f"Han tjener {kr(rente6)} i året, fordi hele renteinntekten er skattefri."]
o6, _ = ledd("6", r6o, w6)
EX.append({
    "n": 6, "title": "Tore låner med fradrag og plasserer skattefritt",
    "points": 3, "topic": "Skattearbitrasje", "chapters": [9, 12],
    "body": f"<p>Tore låner {kr(L6)} til 4,5 % rente med rentefradrag på 22 %. Han plasserer pengene i et papir med samme risiko som gir 4,5 % skattefritt. Hvilket utsagn er riktig?</p>",
    "options": o6, "answer": PLAN[12],
    "solution": begrep(
        f"Skattearbitrasje: gevinst = r × L × (t<sub>fradrag</sub> {MINUS} t<sub>avkastning</sub>) = {tall(rente6)} × 22 % = {tall(gev6)} i året. I et velfungerende marked vil alle ha papiret, og renten bys ned til 4,5 % × 0,78 = {tall(lik_r6*100,2)} %. Fallet er den implisitte skatten på 22 %.".replace(", og", " og"),
        ["<b>Ingenting</b>: glemmer at rentekostnaden gir fradrag mens renteinntekten er skattefri.",
         f"<b>{Kr(rente6*0.474)}</b>: rentefradraget er verdt 22 %, ikke marginalskatten på lønn.",
         f"<b>{Kr(rente6)}</b>: renteinntekten alene, som om lånet var gratis."],
        f"Kostnad etter skatt {tall(rente6*(1-tA))}, skattefri inntekt {tall(rente6)}, differanse {tall(gev6)}. ✓"),
})

# =========================================================== OPPGAVE 7 (ledd 14 og 15)
o7a, _ = ledd("7a", "2030", ["2027", "2029", "2026"])
mv7, iv7 = 480_000, 300_000
gev7 = mv7 - iv7
skatt7 = gev7 * te
lik(skatt7, 68_112)
o7b, _ = ledd("7b", Kr(skatt7), [Kr((gev7 - 100_000) * te), Kr(mv7 * te), Kr(0)])
EX.append({
    "n": 7, "title": "Sigrid flytter til Spania",
    "points": 6, "topic": "Exit-skatt", "chapters": [13, 6],
    "body": ("<p>Sigrid har bodd i Norge hele livet. I februar 2026 flytter hun til Spania. Fra 2027 er hun høyst 30 dager i året i Norge. "
             "Verken hun eller nærstående disponerer bolig her.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Fra og med hvilket inntektsår er Sigrid ikke lenger skattemessig bosatt i Norge etter norsk intern rett?</p>",
         "options": o7a, "answer": PLAN[13],
         "solution": begrep(
             "Skatteloven § 2-1 tredje ledd: har du bodd i Norge i minst ti år før utflyttingsåret, opphører bostedet først etter tre hele inntektsår etter utflyttingsåret. Utflyttingsåret 2026 teller ikke. 2027, 2028 og 2029 er de tre årene. Hun er utflyttet fra <b>2030</b>.",
             ["<b>2026 eller 2027</b>: regelen i bokstav a, der bostedet opphører det første året vilkårene er oppfylt. Den gjelder bare dem som har bodd i Norge kortere enn ti år. Flyttingen alene avgjør heller ikke bostedet.",
              "<b>2029</b>: utflyttingsåret er talt med, eller svaret er det siste året hun er bosatt."],
             "Samme mønster som H2022 og kursgodkjenningen 2026: flytting i 2022 gir utflyttet fra 2026. Flytteåret pluss fire."),
         },
        {"label": "b", "points": 3,
         "body": (f"<p>Faren Odd bor i Norge. I 2026 gir han Sigrid aksjer verdt {kr(mv7)} med inngangsverdi {kr(iv7)}. "
                  "Etter skatteavtalen mellom Norge og Spania anses Sigrid som bosatt i Spania fra 2026. Eierskatten er 22 % ganget med 1,72. "
                  "Se bort fra skjerming. Hvor mye exit-skatt utløser gaven for Odd?</p>"),
         "options": o7b, "answer": PLAN[14],
         "solution": losning(
             "Gave av aksjer til en person som ikke har skatteplikt etter § 2-1, eller som etter skatteavtale er bosatt i en annen stat, utløser exit-skatt for giveren når netto gevinst overstiger kr 100 000 i året (skatteloven § 10-70). Grensen er en terskel, ikke et fradrag. Bunnfradraget på 3 mill. kr gjelder bare når skattyteren selv flytter.",
             ["Sigrid er bosatt i Norge etter intern rett (se a), men i Spania etter skatteavtalen. Vilkåret er oppfylt.",
              f"Gevinst = {tall(mv7)} {MINUS} {tall(iv7)} = {tall(gev7)}, over terskelen, så hele gevinsten skattlegges.",
              f"Skatt = {tall(gev7)} × 37,84 % = <b>{kr(skatt7)}</b>."],
             [f"<b>{Kr((gev7-100_000)*te)}</b>: terskelen brukt som fradrag.",
              f"<b>{Kr(mv7*te)}</b>: markedsverdien brukt som grunnlag.",
              "<b>Kr 0</b>: bunnfradraget brukt, eller Sigrid behandlet som norsk etter intern rett. Etter skatteavtalen er hun bosatt i Spania."],
             "Hadde mottakeren også etter skatteavtalen vært bosatt i Norge, ville gaven ikke utløst exit-skatt. Da overtar hun farens inngangsverdi, og skatten kommer når hun selger.".replace(", og", " og")),
         },
    ],
})

# =========================================================== OPPGAVE 8 (ledd 16)
ov8 = 250_000_000
top8 = (0.15 - 0.03) * ov8
lik(top8, 30_000_000)
o8, _ = ledd("8", Kr(top8), [Kr(0.15 * ov8), Kr(0.22 * ov8), Kr((0.22 - 0.03) * ov8)])
EX.append({
    "n": 8, "title": "Global minimumsskatt",
    "points": 3, "topic": "Skatteparadis", "chapters": [13],
    "body": (f"<p>Et norsk konsern har et datterselskap der den effektive skattesatsen er 3 %. Datterselskapets overskudd er {kr(ov8)}. "
             "Konsernet er omfattet av den globale minimumsskatten på 15 %. Norsk selskapsskatt er 22 %. Se bort fra substansunntaket. "
             "Hvor mye toppskatt må konsernet betale for datterselskapet?</p>"),
    "options": o8, "answer": PLAN[15],
    "solution": losning(
        f"Toppskatt = maks(0; 15 % {MINUS} effektiv sats) × overskudd. Minimumsskatten henter bare inn differansen opp til 15 %.",
        [f"15 % {MINUS} 3 % = 12 %.", f"12 % × {tall(ov8)} = <b>{kr(top8)}</b>."],
        [f"<b>{Kr(0.15*ov8)}</b>: 15 % av hele overskuddet. Den lokale skatten er ikke trukket fra.",
         f"<b>{Kr(0.22*ov8)}</b>: norsk sats på hele overskuddet. Gulvet er 15 %, ikke 22 %.",
         f"<b>{Kr(0.19*ov8)}</b> = (22 % {MINUS} 3 %) × overskudd: norsk sats brukt som gulv."],
        f"Lokal skatt {tall(0.03*ov8)} + toppskatt {tall(top8)} = {tall(0.15*ov8)} = 15 %. ✓"),
})

# =========================================================== OPPGAVE 9 (ledd 17)
x0, t9 = 700_000, 0.30
x9 = x0 / (1 - t9)
lik(x9, 1_000_000)
r9 = f"Hun øker beløpet i fondet til {kr(x9)}, slik at utfallene etter skatt blir som før."
w9 = ["Hun reduserer beløpet i fondet, fordi skatten gjør risikable aktiva mindre lønnsomme.",
      f"Hun beholder {kr(x0)} i fondet, fordi skatten treffer gevinst og tap like mye.",
      f"Hun øker beløpet i fondet med 30 %, til {kr(x0*1.3)}."]
o9, _ = ledd("9", r9, w9)
EX.append({
    "n": 9, "title": "Lene og skatt med fullt tapsfradrag",
    "points": 3, "topic": "Skatt og risiko", "chapters": [12],
    "body": (f"<p>Lene har en formue på {kr(2_000_000)}. Hun har {kr(x0)} i et risikabelt aksjefond og resten i et sikkert aktivum med null avkastning. "
             "Nå innføres en proporsjonal skatt på 30 % på avkastningen med fullt fradrag for tap. "
             "Hva gjør hun ifølge porteføljemodellen i pensum (Mossin og Stiglitz, som Sandmo bygger på)?</p>"),
    "options": o9, "answer": PLAN[16],
    "solution": begrep(
        f"Domar og Musgrave viste at staten med fullt tapsfradrag blir en stille partner: hvert utfall krymper med (1 {MINUS} t). I porteføljemodellen gjenoppretter investoren fordelingen ved å skalere opp til x<sub>0</sub>/(1 {MINUS} t) = {tall(x0)}/0,70 = {tall(x9)}.",
        ["<b>Reduserer</b>: folkemeningen. Den ser bare at staten tar del i gevinsten, ikke at den også bærer en del av tapet.",
         f"<b>Beholder {tall(x0)}</b>: da krymper både forventning og risiko med 30 %, og fordelingen er ikke den hun valgte.".replace(", og", " og"),
         f"<b>{tall(x0*1.3)}</b>: ganget med 1,3. Etter skatt blir utfallene 0,70 × 1,30 = 91 % av de opprinnelige."],
        f"Fondet gir +20 %: før skatt {tall(x0*0.2)}, etter skatt 0,70 × {tall(x9*0.2)} = {tall(0.7*x9*0.2)}. Samme utfall. ✓"),
})

# =========================================================== OPPGAVE 10 (ledd 18 og 19)
r10a = "Holding AS skattlegges for 3 % av utbyttet fra Drift AS, men gevinst ved salg av aksjene er skattefri."
w10a = ["Holding AS betaler ingen skatt på utbytte fra Drift AS, fordi fritaksmetoden gir fullt fritak.",
        "Holding AS kan trekke fra tap ved salg av aksjene i Drift AS i alminnelig inntekt.",
        "Treprosentregelen gjelder både utbytte og gevinst, så begge skattlegges effektivt med 0,66 %."]
o10a, _ = ledd("10a", r10a, w10a)
v10, iv10 = 8_000_000, 3_000_000
diff10 = (v10 - iv10) * te
lik(diff10, 1_892_000)
o10b, _ = ledd("10b", Kr(diff10), [Kr(0), Kr((v10 - iv10) * tA), Kr(v10 * te)])
EX.append({
    "n": 10, "title": "Fritaksmetoden og holdingselskapet",
    "points": 6, "topic": "Fritaksmetoden", "chapters": [6],
    "body": "<p>Selskapsskatten er 22 %. Eierskatten for personlige aksjonærer er 22 % ganget med 1,72. Se bort fra skjerming.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Holding AS eier 70 % av aksjene og stemmene i Drift AS. Hvilket utsagn er riktig?</p>",
         "options": o10a, "answer": PLAN[17],
         "solution": begrep(
             "Fritaksmetoden (skatteloven § 2-38) fritar utbytte og gevinst på aksjer for selskapsaksjonærer. Tap er ikke fradragsberettiget. Eier mottakeren 90 % eller mindre, inntektsføres likevel 3 % av utbyttet, som gir 0,66 % effektiv skatt. Regelen gjelder bare utbytte.".replace(", og", " og"),
             ["<b>Fullt fritak</b>: gjelder bare over 90 % eierskap og stemmer. Her er eierandelen 70 %.",
              "<b>Fradrag for tap</b>: tap er ikke fradragsberettiget under fritaksmetoden. Både oppsiden og nedsiden er tatt ut.",
              "<b>Treprosentregelen på gevinst</b>: den gjelder bare utbytte."],
             "Et utbytte på kr 1 000 000 gir 30 000 inntektsført og 6 600 i skatt."),
         },
        {"label": "b", "points": 3,
         "body": f"<p>Kari eier aksjer verdt {kr(v10)} med inngangsverdi {kr(iv10)}. Hun vil selge og reinvestere alt hun har igjen etter skatt. Hvor mye mer kan hun reinvestere hvis aksjene eies av hennes heleide holdingselskap, enn hvis hun eier dem personlig?</p>",
         "options": o10b, "answer": PLAN[18],
         "solution": losning(
             "Gevinst på aksjer eid av et aksjeselskap er skattefri etter fritaksmetoden. Personlig skattlegges gevinsten med 37,84 %. Holdingselskapet utsetter skatten til pengene tas ut.",
             [f"Gevinst = {tall(v10-iv10)}.",
              f"Personlig skatt = {tall(v10-iv10)} × 37,84 % = {tall(diff10)}. Holdingselskapet betaler ingen skatt.",
              f"Forskjell = <b>{kr(diff10)}</b>."],
             ["<b>Kr 0</b>: «bare en utsettelse» lest som «ingen forskjell». I mellomtiden arbeider hele beløpet.",
              f"<b>{Kr((v10-iv10)*tA)}</b>: oppjusteringen er glemt.",
              f"<b>{Kr(v10*te)}</b>: skatten regnet av hele salgssummen."],
             f"Personlig reinvesterer hun {tall(v10-diff10)}, holdingselskapet {tall(v10)}. Differansen er {tall(diff10)}. ✓"),
         },
    ],
})

# =========================================================== OPPGAVE 11 (ledd 20 til 22)
bank11, Gd, Bd, p11, lam = 1_150_000, 2_000_000, 470_000, 0.45, 1 / 1.04
lb, lg, ll = math.log(bank11), math.log(Gd), math.log(Bd)
EU = p11 * lg + (1 - p11) * ll
EW = p11 * Gd + (1 - p11) * Bd
lEW = math.log(EW)
assert EW > bank11 and EU < lb < lEW
pstar = (lb - ll) / (lg - ll)
p_rn = (bank11 - Bd) / (Gd - Bd)
p_utenB = lb / lg
EUla = p11 * lg + (1 - p11) * lam * ll
EUla_god = p11 * lam * lg + (1 - p11) * ll
bank_la = lam * lb
EU_bytt = (1 - p11) * lg + p11 * ll          # sannsynlighetene byttet om
assert EU_bytt < lb
EU_la_b = (lb - lam * ll) / (lg - lam * ll)  # tapsvekten brukt i 11b
assert bank_la < EU
lik(pstar * lg + (1 - pstar) * ll, lb)


def n3(x):
    return tall(x, 3)


o11a, _ = ledd("11a", f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EU)} ⇒ velger banken",
               [f"Nytte aksjefond {n3(lEW)} {GT} nytte bank {n3(lb)} ⇒ velger aksjefondet",
                f"Forventet sluttverdi aksjefond {tall(EW)} {GT} bank {tall(bank11)} ⇒ velger aksjefondet",
                f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EU_bytt)} ⇒ velger banken"])
o11b, _ = ledd("11b", pst(pstar), [pst(p_rn), pst(p_utenB), pst(EU_la_b)])
o11c, _ = ledd("11c", f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EUla)} ⇒ velger banken",
               [f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EU)} ⇒ velger banken",
                f"Nytte bank {n3(bank_la)} {LT} nytte aksjefond {n3(EU)} ⇒ velger aksjefondet",
                f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EUla_god)} ⇒ velger banken"])
EX.append({
    "n": 11, "title": "Even velger mellom bank og aksjefond",
    "points": 9, "topic": "Sparing", "chapters": [18, 17],
    "body": (f"<p>Even investerer {kr(800_000)} i 12 år. Banken gir sikkert {kr(bank11)}. Et aksjefond gir {kr(Gd)} i gode tider og {kr(Bd)} i dårlige tider. "
             "Sannsynligheten for gode tider er 45 %. Even har nytten U(W) = ln(W) av sluttverdien W og velger høyest forventet nytte.</p>"),
    "parts": [
        {"label": "a", "points": 3, "body": "<p>Hva velger Even?</p>",
         "options": o11a, "answer": PLAN[19],
         "solution": losning(
             "Sikkert alternativ: ln(W). Usikkert alternativ: Σ p<sub>i</sub> ln(W<sub>i</sub>). Ta logaritmen av hvert utfall først.",
             [f"Bank: ln({tall(bank11)}) = {tall(lb,4)}.",
              f"Fond: 0,45 × {tall(lg,4)} + 0,55 × {tall(ll,4)} = {tall(EU,4)}.",
              f"{n3(lb)} {GT} {n3(EU)}: <b>banken</b>."],
             [f"<b>Aksjefond {n3(lEW)}</b>: ln av forventet sluttverdi. For konkav nytte er E[ln W] {LT} ln E[W].",
              f"<b>Forventet sluttverdi</b>: sammenligner formue, som en risikonøytral investor.",
              f"<b>Aksjefond {n3(EU_bytt)}</b> = 0,55 × {tall(lg,4)} + 0,45 × {tall(ll,4)}: sannsynlighetene byttet om. Konklusjonen blir den samme, men tallet er feil."],
             f"Sikkerhetsekvivalenten til fondet er e<sup>{tall(EU,4)}</sup> = {tall(math.exp(EU))}, under bankens {tall(bank11)}. ✓"),
         },
        {"label": "b", "points": 3,
         "body": "<p>Hvor høy må Evens subjektive sannsynlighet for gode tider minst være for at han skal velge aksjefondet? Svar med én desimal.</p>",
         "options": o11b, "answer": PLAN[20],
         "solution": losning(
             f"Even er likegyldig når p × ln(G) + (1 {MINUS} p) × ln(B) = ln(bank). Sluttverdiene endres ikke, bare vektene.",
             [f"Teller: {tall(lb,4)} {MINUS} {tall(ll,4)} = {tall(lb-ll,4)}.",
              f"Nevner: {tall(lg,4)} {MINUS} {tall(ll,4)} = {tall(lg-ll,4)}.",
              f"p* = {tall(lb-ll,4)}/{tall(lg-ll,4)} = <b>{pst(pstar)}</b>."],
             [f"<b>{pst(p_rn)}</b> = ({tall(bank11)} {MINUS} {tall(Bd)})/({tall(Gd)} {MINUS} {tall(Bd)}): grensen for en risikonøytral investor.",
              f"<b>{pst(p_utenB)}</b> = ln(bank)/ln(G): ln(B) er ikke trukket fra i teller og nevner.",
              f"<b>{pst(EU_la_b)}</b>: tapsvekten 1/1,04 fra c er brukt allerede her, (ln(bank) {MINUS} ln(B)/1,04)/(ln(G) {MINUS} ln(B)/1,04). Leddet har ingen tapsaversjon."],
             f"{tall(pstar,4)} × {tall(lg,4)} + {tall(1-pstar,4)} × {tall(ll,4)} = {tall(lb,4)}. ✓",
             strategi="Med 45 % velger Even banken (a), så grensen må ligge over 45 %. Det stryker 44,4 % uten regning."),
         },
        {"label": "c", "points": 3,
         "body": "<p>Even er tapsavers: nytten av utfall under det han investerte, ganges med 1/1,04. Han bruker sannsynligheten 45 %. Hva blir resultatet?</p>",
         "options": o11c, "answer": PLAN[21],
         "solution": losning(
             "Tapsvekten gjelder bare utfall under referansepunktet på kr 800 000.",
             [f"Bank ({tall(bank11)}) og gode tider ({tall(Gd)}) er gevinster og vektes ikke.",
              f"Dårlige tider: {tall(ll,4)}/1,04 = {tall(lam*ll,4)}.",
              f"Fond: 0,45 × {tall(lg,4)} + 0,55 × {tall(lam*ll,4)} = {tall(EUla,4)}, så <b>banken</b>."],
             [f"<b>Aksjefond {n3(EU)} mot bank {n3(lb)}</b>: tapsaversjonen er ikke brukt. Det er svaret på a.",
              f"<b>Bank {n3(bank_la)}</b>: vekten er lagt på banken i stedet for på det dårlige utfallet. Feilen snur valget.",
              f"<b>Aksjefond {n3(EUla_god)}</b>: vekten er lagt på det gode utfallet."],
             f"{tall(EU,4)} {MINUS} 0,55 × {tall(ll,4)} × (1 {MINUS} 1/1,04) = {tall(EUla,4)}. ✓",
             strategi="Tre alternativer sier «banken». Les hvilke to tall som sammenlignes."),
         },
    ],
})

# =========================================================== OPPGAVE 12 (ledd 23 og 24)
L12, r12, n12 = 350_000, 0.069, 6
A12 = annuitet(L12, r12, n12)
lik(A12 * af(r12, n12), L12)
A12_etab = annuitet(L12 + 4_500, r12, n12)
o12a, _ = ledd("12a", Kr(A12), [Kr(A12_etab), Kr(L12 / n12 + L12 * r12), Kr(L12 / n12)])
r12b = "Den tar med begge gebyrene og blir derfor høyere enn 6,9 %."
w12b = ["Den finnes ved å legge gebyrene i prosent av lånebeløpet til den nominelle renten.",
        "Den er lik den nominelle renten, fordi terminene betales én gang i året.",
        "Den påvirkes ikke av etableringsgebyret, fordi det bare betales én gang."]
o12b, _ = ledd("12b", r12b, w12b)
EX.append({
    "n": 12, "title": "Lars og billånet",
    "points": 6, "topic": "Lån", "chapters": [16],
    "body": (f"<p>Lars tar opp et annuitetslån på {kr(L12)} til 6,9 % nominell rente over 6 år, med én etterskuddsvis termin i året. "
             "Banken tar et etableringsgebyr på kr 4 500 og et termingebyr på kr 600.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": f"<p>Hva er det årlige terminbeløpet uten gebyrer? Bruk A = L · r/(1 {MINUS} (1 + r)<sup>{MINUS}T</sup>).</p>",
         "options": o12a, "answer": PLAN[22],
         "solution": losning(
             "Med årlige terminer er r årsrenten og T antall år.",
             [f"Telleren: {tall(L12)} × 0,069 = {tall(L12*r12)}.",
              f"Nevneren: 1 {MINUS} 1,069<sup>{MINUS}6</sup> = {tall(1-1.069**-6,6)}.",
              f"A = <b>{kr(A12)}</b>."],
             [f"<b>{Kr(A12_etab)}</b>: annuiteten regnet av {tall(L12+4_500)}, altså med etableringsgebyret lagt til lånet. Spørsmålet ber om terminbeløpet uten gebyrer.",
              f"<b>{Kr(L12/n12+L12*r12)}</b>: første termin på et serielån.",
              f"<b>{Kr(L12/n12)}</b>: bare avdrag. Det er en nedre grense for terminbeløpet."],
             f"6 × {tall(A12)} {MINUS} {tall(L12)} = {tall(6*A12-L12)} i renter. Nåverdien av terminene ved 6,9 % er {tall(A12*af(r12,n12))}. ✓"),
         },
        {"label": "b", "points": 3, "body": "<p>Hvilket utsagn om lånets effektive rente er riktig?</p>",
         "options": o12b, "answer": PLAN[23],
         "solution": begrep(
             "Effektiv rente er internrenten i den faktiske kontantstrømmen: Lars får utbetalt lånet minus etableringsgebyret, og hver termin øker med termingebyret. Gebyrene gjør den effektive renten høyere enn den nominelle.".replace(", og", " og"),
             ["<b>Gebyrprosent lagt på renten</b>: gebyrer er kroner på bestemte tidspunkter. De må neddiskonteres, ikke legges på som prosentpoeng.",
              "<b>Lik nominell rente</b>: gjelder bare uten gebyrer. Her er det to gebyrer.",
              "<b>Etableringsgebyret påvirker ikke</b>: det betales i år 0 og virker sterkest av de to gebyrene."],
             "Med gebyrene blir den effektive renten om lag 7,6 %."),
         },
    ],
})

# =========================================================== OPPGAVE 13 (ledd 25)
beh = 0.181 * (12 * 6 + 30 * 7.1)
komp = beh / 18.5 / 9
g13_tak = 0.181 * (12 * 6 + 30 * 9) / 18.5 / 9
g13_alle = 0.181 * 7.1 * 42 / (18.5 * 9)
g13_snar = 0.181 * 42 / 18.5
o13, _ = ledd("13", pst(komp), [pst(g13_alle), pst(g13_snar), pst(g13_tak)])
EX.append({
    "n": 13, "title": "Tones alderspensjon med tak",
    "points": 3, "topic": "Pensjon", "chapters": [15],
    "body": ("<p>Hvert år legges 18,1 % av inntekten opp til 7,1 G til Tones pensjonsbeholdning i folketrygden. Hun jobber i 42 år: først 12 år med 6 G, deretter 30 år med 9 G. "
             "Lønnen følger G. Delingstallet ved uttak er 18,5. Hvor stor blir pensjonen i prosent av sluttlønnen? Svar med én desimal.</p>"),
    "options": o13, "answer": PLAN[24],
    "solution": losning(
        "Opptjening = 18,1 % × min(inntekt; 7,1 G). Pensjon = beholdning/delingstall. Når lønnen følger G, kan alt regnes i G.",
        [f"Beholdning = 0,181 × (12 × 6 + 30 × 7,1) = {tall(beh,3)} G.",
         f"Pensjon = {tall(beh,3)}/18,5 = {tall(beh/18.5,4)} G.",
         f"{tall(beh/18.5,4)}/9 = <b>{pst(komp)}</b>."],
        [f"<b>{pst(g13_tak)}</b>: taket på 7,1 G er glemt for årene med 9 G.",
         f"<b>{pst(g13_alle)}</b>: taket på 7,1 G er brukt på alle 42 år, også de 12 årene med 6 G.",
         f"<b>{pst(g13_snar)}</b> = 0,181 × 42/18,5: snarveien gjelder bare under taket med lik lønn i G hele tiden."],
        f"I kroner med G = {kr(136_549)}: pensjon {tall(beh*136_549/18.5)} mot sluttlønn {tall(9*136_549)} gir {pst(komp,2)}. ✓"),
})

# =========================================================== OPPGAVE 14 (ledd 26 og 27)
w = 0.05 / (2 * 0.25 ** 2)
lik(w, 0.4)
alf1 = w * 3_000_000 / 1_500_000
alf2 = w * 5_000_000 / 4_500_000
lik(alf1, 0.8)
o14a, _ = ledd("14a", pst(alf1, 0), [pst(w, 0), pst(0.05 / (2 * 0.25) * 2, 0), pst(0, 0)])
r14b = f"Aksjeandelen av finansformuen faller til om lag {tall(alf2*100,0)} %, fordi humankapitalen er mindre."
w14b = ["Aksjeandelen av finansformuen er fortsatt 80 %, fordi markedssynet og γ er uendret.",
        "Aksjeandelen av finansformuen er nå 40 %, det samme som andelen av totalformuen.",
        "Aksjeandelen av finansformuen øker, fordi finansformuen er blitt større."]
o14b, _ = ledd("14b", r14b, w14b)
EX.append({
    "n": 14, "title": "Jonas, Merton og humankapitalen over livet",
    "points": 6, "topic": "Porteføljevalg", "chapters": [14],
    "body": (f"<p>Jonas bruker w = (E(R) {MINUS} R<sub>f</sub>)/(γσ<sup>2</sup>) for aksjeandelen av totalformuen. Aksjepremien er 5 %, standardavviket 25 % og γ = 2. "
             "Humankapitalen hans er risikofri. Han låner ikke for å kjøpe aksjer.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": f"<p>Jonas har {kr(1_500_000)} i finansformue og humankapital på {kr(1_500_000)}. Hvor stor andel av finansformuen skal han ha i aksjer?</p>",
         "options": o14a, "answer": PLAN[25],
         "solution": losning(
             "w gjelder totalformuen. Risikofri humankapital virker som bankinnskudd, så aksjebeløpet w(F + H) må ligge i finansformuen: α = w(F + H)/F.",
             ["w = 0,05/(2 × 0,25²) = 0,05/0,125 = 40 %.",
              "Aksjer = 40 % × 3 000 000 = 1 200 000.",
              "α = 1 200 000/1 500 000 = <b>80 %</b>."],
             ["<b>40 %</b>: w brukt på finansformuen alene.",
              "<b>20 %</b>: standardavviket brukt i stedet for variansen, w = 10 %.",
              "<b>0 %</b>: humankapitalen behandlet som aksjer. Teksten sier at den er risikofri."],
             "α = w × (1 + H/F) = 0,40 × 2 = 0,80. ✓"),
         },
        {"label": "b", "points": 3,
         "body": f"<p>Tjue år senere er humankapitalen {kr(500_000)} og finansformuen {kr(4_500_000)}. Hvilket utsagn er riktig?</p>",
         "options": o14b, "answer": PLAN[26],
         "solution": begrep(
             f"Aksjebeløpet er w × (F + H) = 40 % × 5 000 000 = 2 000 000, og α = 2 000 000/4 500 000 = {pst(alf2)}. Når humankapitalen blir til finansformue, faller α.".replace(", og", " og"),
             ["<b>Fortsatt 80 %</b>: w er uendret, men α avhenger også av H/F.",
              "<b>40 %</b>: det er w, andelen av totalformuen. Andelen av finansformuen er høyere så lenge H er positiv.",
              "<b>Øker</b>: snur logikken. Mindre humankapital betyr mindre implisitt bankinnskudd."],
             f"α = 0,40 × (1 + 500 000/4 500 000) = {tall(alf2,4)}. ✓"),
         },
    ],
})

# =========================================================== OPPGAVE 15 (ledd 28)
egen15 = "En egenandel gjør at kunden bærer en del av tapet selv og får grunn til å låse sykkelen."
obl15 = "Forsikringen bør gjøres obligatorisk, slik at også de forsiktigste kundene blir med i ordningen."
r15 = f"Moralsk hasard. {egen15}"
w15 = [f"Ugunstig utvalg. {egen15}", f"Ugunstig utvalg. {obl15}", f"Moralsk hasard. {obl15}"]
o15, _ = ledd("15", r15, w15)
EX.append({
    "n": 15, "title": "Sykkelforsikring uten egenandel",
    "points": 3, "topic": "Forsikring og forventet nytte", "chapters": [17],
    "body": ("<p>Et forsikringsselskap selger sykkelforsikring med full dekning og uten egenandel. Etter kjøpet lar kundene oftere syklene stå ulåst. "
             "Selskapet kan ikke se hvem som gjør det. Hvilket fenomen er dette og hvilket tiltak retter seg mest direkte mot det?</p>"),
    "options": o15, "answer": PLAN[27],
    "solution": begrep(
        "Moralsk hasard er skjult atferd etter avtalen. Egenandelen gir kunden en del av tapet og dermed grunn til å være forsiktig. Ugunstig utvalg handler om hvem som kjøper, før avtalen.",
        ["<b>Ugunstig utvalg og egenandel</b>: riktig tiltak, feil fenomen. Kundene er de samme. Det er atferden som endres etter kjøpet.",
         "<b>Ugunstig utvalg og obligatorisk forsikring</b>: feil fenomen og et tiltak som retter seg mot hvem som kjøper. Obligatorisk medlemskap er svaret på ugunstig utvalg, som i folketrygden.",
         "<b>Moralsk hasard og obligatorisk forsikring</b>: riktig fenomen, men tvang endrer ikke hvordan kunden passer på sykkelen etter kjøpet."],
        "Spør «før eller etter avtalen?». Etter avtalen og skjult atferd betyr moralsk hasard."),
})

# =========================================================== OPPGAVE 16 (ledd 29)
fv16 = 50_000 * 1.07 ** 20
lin16 = 50_000 + 20 * 3_500
lik(lin16, 120_000)
evb = "Eksponentiell vekst-bias: hun overser at avkastningen også forrentes."
fork = "Forankring: hun låser seg til det første tallet hun regnet ut."
o16, _ = ledd("16", f"{Kr(fv16)}. {evb}", [f"{Kr(lin16)}. {fork}", f"{Kr(fv16)}. {fork}", f"{Kr(lin16)}. {evb}"])
EX.append({
    "n": 16, "title": "Hanne og rentes rente",
    "points": 3, "topic": "Finansiell psykologi", "chapters": [18],
    "body": ("<p>Hanne setter kr 50 000 i et fond som gir 7 % i året. Hun lar pengene stå i 20 år og regner i hodet: "
             "«7 % av 50 000 er 3 500, så om 20 år har jeg 50 000 + 20 × 3 500 = 120 000.» Hva har hun faktisk etter 20 år og hva kalles feilen hennes?</p>"),
    "options": o16, "answer": PLAN[28],
    "solution": losning(
        "Sparing uten uttak vokser med rentes rente: W<sub>T</sub> = W × (1 + r)<sup>T</sup>. Eksponentiell vekst-bias er å framskrive slik vekst lineært.",
        [f"1,07<sup>20</sup> = {tall(1.07**20,4)}.",
         f"50 000 × {tall(1.07**20,4)} = <b>{kr(fv16)}</b>.",
         f"Hannes anslag er {tall(lin16)}, altså {tall(fv16-lin16)} for lavt."],
        [f"<b>{Kr(lin16)} og forankring</b>: feil tall og feil navn.",
         f"<b>{Kr(fv16)} og forankring</b>: riktig tall, feil navn. Forankring er at et første tall, som en kjøpskurs, styrer vurderingen.",
         f"<b>{Kr(lin16)} og eksponentiell vekst-bias</b>: riktig navn, men tallet er Hannes eget lineære anslag."],
        f"Ved 7 % dobles beløpet omtrent hvert 10. år: 50 000 → 100 000 → 200 000 på 20 år. {tall(fv16)} ligger like under. ✓"),
})

# =========================================================== OPPGAVE 17 (ledd 30)
Y17, bil17, r17 = 720_000, 250_000, 0.036
tak17 = 5 * Y17 - bil17
stress17 = max(r17 + 0.03, 0.07)
lik(tak17, 3_350_000); lik(stress17, 0.07)


def o17(t, s):
    return f"Gjeldsgraden gir et tak på {kr(t)} for nytt boliglån. Stresstesten bruker {tall(s*100,1)} %."


o17x, _ = ledd("17", o17(tak17, stress17), [o17(5 * Y17, stress17), o17(tak17, r17 + 0.03), o17(5 * Y17, r17 + 0.03)])
EX.append({
    "n": 17, "title": "Nina og utlånsforskriften",
    "points": 3, "topic": "Lån", "chapters": [16, 4],
    "body": f"<p>Nina har en brutto årsinntekt på {kr(Y17)} og et billån på {kr(bil17)}. Boliglånsrenten er 3,6 %. Hvilket utsagn er riktig etter utlånsforskriften i 2026?</p>",
    "options": o17x, "answer": PLAN[29],
    "solution": begrep(
        f"Samlet gjeld, billånet medregnet, kan ikke overstige fem ganger brutto årsinntekt: 5 × {tall(Y17)} {MINUS} {tall(bil17)} = {tall(tak17)}. Stresstesten legger 3 prosentpoeng på renten, men minst til 7 %: 3,6 % + 3 = 6,6 %, så gulvet på 7,0 % binder.",
        [f"<b>{tall(5*Y17)} og 7,0 %</b>: billånet er glemt. All gjeld teller med i gjeldsgraden.",
         f"<b>{tall(tak17)} og 6,6 %</b>: minstekravet på 7 % er glemt.",
         f"<b>{tall(5*Y17)} og 6,6 %</b>: begge feilene."],
        "Med rente 4,5 % ville stresstesten brukt 7,5 %. Gulvet binder bare når renten er under 4 %."),
})

# ===================================================== sett-nivå og kontroller
sett = {
    "id": "prove3", "kind": "mock", "label": "Prøveeksamen 3",
    "minutes": 240, "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, " + MINUS + "1 for feil",
    "note": ("Temaer fra H2022 og de eldre settene, i skoleeksamensformat. Omtrent halvparten av leddene er begrepsledd i stilen fra kursgodkjenningen 2026. "
             "Resten er korte regneledd med høyst tre trinn. Skattedelen dekker skjerming og oppjustering, formuesskatt, insidens, skattearbitrasje, exit-skatt, "
             "minimumsskatt, skatt og risiko og fritaksmetoden. Finansdelen dekker ln-nytte og tapsaversjon, lån, folketrygd, Merton, forsikring, finansiell psykologi "
             "og utlånsforskriften. Alle satser er 2026-regler."),
    "facts": [
        "30 flervalgsledd i 17 oppgaver. Fire alternativer per ledd og nøyaktig ett riktig.",
        "3 poeng for rett, " + MINUS + "1 for feil og 0 for ubesvart. Maks 90 poeng.",
        "Skattedelen har 19 ledd (57 poeng) og finansdelen 11 ledd (33 poeng).",
        "Temaer fra H2022 og de eldre settene, i skoleeksamensformat: korte tekster og omtrent halvparten begrepsledd.",
        "2026-regler: eierskatt 37,84 %, primærboligterskel 14 mill., exit-skatt med bunnfradrag 3 mill., stresstest 3 prosentpoeng og minst 7 %.",
    ],
    "practiceNote": ("Begrepsleddene avgjøres av ett ord: les «alltid», «bare» og «kan» presist. I regneleddene er nesten hvert galt alternativ ett glemt ledd. "
                     "Så snart du kan stryke ett alternativ, lønner det seg å svare."),
    "mc": {"wrongFactor": -0.3333333333333333},
    "exercises": EX,
}

alle = [p for ex in EX for p in ex.get("parts", [ex])]
assert len(LEDD) == len(alle) == 30
for i, (p, (merke, opts, pos)) in enumerate(zip(alle, LEDD)):
    assert p["options"] == opts and p["answer"] == PLAN[i] == pos, merke
for ex in EX:
    if "parts" in ex:
        assert sum(p["points"] for p in ex["parts"]) == ex["points"]
assert sum(ex["points"] for ex in EX) == 90
assert sum(len(ex.get("parts", [1])) for ex in EX if ex["n"] <= 10) == 19

tekst = json.dumps(sett, ensure_ascii=False)
assert "—" not in tekst and "–" not in tekst, "tankestrek"
treff = [tekst[max(0, m.start() - 50):m.start() + 15] for m in re.finditer(r",\s*og\b", tekst)]
assert not treff, treff


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
print("Ledd ord tall")
for ex in EX:
    L = ex.get("parts") or [ex]
    felles = len(strip(ex["body"]).split(" "))
    for p in L:
        n += 1
        o = ord_ = felles if p is ex else felles / len(L) + len(strip(p["body"]).split(" "))
        ordsum += ord_
        er_tall = all(re.search(r"\d", strip(x)) and len(strip(x)) < 40 for x in p["options"])
        tl += er_tall
        if er_tall:
            v = [tallverdi(x) for x in p["options"]]
            s = sorted(v)
            rang["størst" if v[p["answer"]] == s[3] else "minst" if v[p["answer"]] == s[0] else "midten"] += 1
        else:
            tekstledd += 1
            ln = [len(strip(x)) for x in p["options"]]
            if ln[p["answer"]] == max(ln) and ln.count(max(ln)) == 1:
                lengst += 1
        print(f"{n:4} {ord_:5.1f} {'T' if er_tall else 'B'}")
print(f"Kalibrering: {ordsum/n:.1f} ord per ledd, {tl/n*100:.0f} % tallsvar ({tl} av {n})")
print(f"Tekstledd {tekstledd}: riktig er lengst i {lengst}. Tallledd: {rang}")

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(sett, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
print("Skrev", UT)
