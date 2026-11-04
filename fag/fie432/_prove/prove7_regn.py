"""Prøveeksamen 7 (FIE432): regner alle tall, bygger prove7.json og sjekker den.

Kjør:  python3 -I fag/fie432/_prove/prove7_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p7) sier,
3. skriver prove7.json ved siden av seg selv,
4. sjekker fila: gyldig JSON, fasitplanen, at hvert alternativ inneholder
   tallene skriptet har regnet (og ingen andre), skrivereglene (ingen
   tankestrek, ingen komma foran «og», minustegn «−»), og kalibreringen
   mot skoleeksamen (ord per ledd, andel ledd med tallsvar, lekkasje).

Prøveeksamen 7 følger planen i docs/fie432-proveeksamen-spek.md: pensum som
prøveeksamen 1–6 ikke har testet, med minimalt stillas i oppgaveteksten.
"""
import json
import math
import os
import re
from decimal import Decimal, ROUND_HALF_UP

HER = os.path.dirname(os.path.abspath(__file__))
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p7"]
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


def begrep(regel, svar, gale, strategi=None):
    """Løsning for begrepsledd: begrunnelse, riktig svar, hvorfor de andre er gale."""
    s = f"<p><b>Regelen.</b> {regel} <b>{svar}</b></p>"
    s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(
        f"<b>{a}</b> = {b}" for a, b in gale) + "</p>"
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    return s


EX = []

# ======================================================================= 1
print("\nOppgave 1: to aksjeposter i samme selskap")
nA1, kA1, nB1, kB1, D1, rs1, kurs1 = 2_000, 40, 1_000, 160, 4, 0.035, 95
sA1, sB1 = kA1 * rs1, kB1 * rs1                       # skjerming per aksje
assert sA1 < D1 < sB1
skplA1 = (D1 - sA1) * nA1
skpl1 = skplA1 + 0.0                                  # den dyre posten gir 0
ub1 = (sB1 - D1) * nB1
utb1 = D1 * (nA1 + nB1)
skjsum1 = rs1 * (kA1 * nA1 + kB1 * nB1)
g1_netto = utb1 - skjsum1                             # skjerming slått sammen for beholdningen
snitt1 = (kA1 * nA1 + kB1 * nB1) / (nA1 + nB1)
assert lik(g1_netto, (D1 - snitt1 * rs1) * (nA1 + nB1))  # snittkurs gir samme tall
g1_uten = utb1
g1_skatt = skpl1 * TE
g1b_aar = sB1 * nB1                                   # årets fradrag på posten
g1b_rente = ub1 * (1 + rs1)                           # forrentet for tidlig
assert lik(skpl1, 5200) and lik(ub1, 1600)
assert lik(utb1, skpl1 + sA1 * nA1 + D1 * nB1)
print(f"   skattepliktig {skpl1}, ubenyttet {ub1}; gale {g1_netto}, {g1_uten}, {g1_skatt}; {g1b_aar}, 0, {g1b_rente}")
body1 = (f"<p>Halvor kjøpte {kr(nA1)} aksjer i Fjordnett ASA i 2019 for kr {kr(kA1)} per aksje. I 2025 kjøpte han "
         f"{kr(nB1)} aksjer til i samme selskap for kr {kr(kB1)} per aksje. Han eier alle aksjene hele 2026. Ingen av "
         f"aksjene har ubenyttet skjerming fra tidligere år. I 2026 betaler selskapet kr {kr(D1)} i utbytte per aksje. Skjermingsrenten for 2026 er "
         f"{pst(rs1, 1)}. Kursen ved utgangen av 2026 er kr {kr(kurs1)}.</p>")
pa = ledd("a", "<p>Hva er Halvors skattepliktige utbytte for 2026?</p>",
          (f"Kr {kr(skpl1)}", [kr(skpl1)]),
          [(f"Kr {kr(g1_netto)}", [kr(g1_netto)]),
           (f"Kr {kr(g1_skatt, 2)}", [kr(g1_skatt, 2)]),
           (f"Kr {kr(g1_uten)}", [kr(g1_uten)])],
          sol("Skjermingen regnes per aksje av den aksjens egen kostpris. Ubenyttet skjerming på én aksje kan ikke brukes mot "
              "utbytte fra en annen, heller ikke når begge er i samme selskap (manualen 5.3).",
              [f"Første post: skjerming {kr(kA1)} × {pst(rs1, 1)} = {kr(sA1, 2)} per aksje. Skattepliktig "
               f"({kr(D1)} − {kr(sA1, 2)}) × {kr(nA1)} = {kr(skplA1)}.",
               f"Andre post: skjerming {kr(kB1)} × {pst(rs1, 1)} = {kr(sB1, 2)} per aksje. Det er mer enn utbyttet på "
               f"kr {kr(D1)}, så skattepliktig utbytte er 0 og resten framføres på disse aksjene.",
               f"Samlet: {kr(skplA1)} + 0 = <b>kr {kr(skpl1)}</b>. Kursen kr {kr(kurs1)} er støy: skjermingen regnes av "
               "kostprisen, aldri av kursen."],
              [(f"Kr {kr(g1_netto)}", f"skjermingen slått sammen for hele beholdningen: {kr(utb1)} − {kr(skjsum1)}. "
                f"Snittkursen kr {kr(snitt1)} gir samme tall. Da brukes skjermingen på den dyre posten mot utbyttet på den "
                "billige. Det er ikke lov."),
               (f"Kr {kr(g1_skatt, 2)}", f"skatten ({kr(skpl1)} × 37,84 %), ikke det skattepliktige utbyttet."),
               (f"Kr {kr(g1_uten)}", "skjermingen glemt: hele utbyttet regnet som skattepliktig.")],
              f"Utbyttet {kr(utb1)} = skattepliktig {kr(skpl1)} + brukt skjerming {kr(sA1 * nA1)} på første post + "
              f"{kr(D1 * nB1)} på andre post. ✓",
              "Har du regnet én skjerming for hele beholdningen, står tallet ditt blant alternativene. Regn posten med den "
              "høyeste kostprisen for seg før du svarer."))
pb = ledd("b", f"<p>Hvor stor ubenyttet skjerming har Halvor etter 2026 på aksjene han kjøpte for kr {kr(kB1)}?</p>",
          (f"Kr {kr(ub1)}", [kr(ub1)]),
          [(f"Kr {kr(g1b_aar)}", [kr(g1b_aar)]),
           ("Kr 0", ["0"]),
           (f"Kr {kr(g1b_rente)}", [kr(g1b_rente)])],
          sol("Ubenyttet skjerming er skjermingsfradraget minus utbyttet på den samme aksjen når fradraget er størst. Den "
              "framføres på aksjen og legges til neste års grunnlag (manualen 5.3).",
              [f"Skjerming på posten: {kr(nB1)} × {kr(kB1)} × {pst(rs1, 1)} = {kr(g1b_aar)}.",
               f"Utbytte på posten: {kr(nB1)} × {kr(D1)} = {kr(D1 * nB1)}.",
               f"Ubenyttet: {kr(g1b_aar)} − {kr(D1 * nB1)} = <b>kr {kr(ub1)}</b>."],
              [(f"Kr {kr(g1b_aar)}", "årets skjermingsfradrag på posten, uten at utbyttet er trukket fra."),
               ("Kr 0", f"skjermingen slått sammen: samlet skjerming {kr(skjsum1)} er mindre enn samlet utbytte "
                        f"{kr(utb1)}, så ingenting blir til overs. Skjermingen følger aksjen, ikke beholdningen."),
               (f"Kr {kr(g1b_rente)}", f"{kr(ub1)} forrentet med {pst(rs1, 1)}. Det skjer først neste år, når beløpet er "
                                       "lagt til grunnlaget.")],
              f"Neste år er grunnlaget for posten {kr(kB1 * nB1)} + {kr(ub1)} = {kr(kB1 * nB1 + ub1)}. Per aksje: "
              f"{kr(sB1, 2)} − {kr(D1)} = {kr(sB1 - D1, 2)}, ganger {kr(nB1)} aksjer = {kr(ub1)}. ✓"))
EX.append(oppgave(1, "Halvor og to aksjeposter i Fjordnett ASA", "Aksjonærmodellen", [5], body1, [pa, pb]))

# ======================================================================= 2
print("\nOppgave 2: uttak fra aksjesparekonto")
inn2, ut2a, verdi2, ut2b = 400_000, 100_000, 650_000, 450_000
rest2 = inn2 - ut2a
skpl2 = max(0, ut2b - rest2)
g2_glemt = ut2b - inn2
g2_forh = ut2b * (verdi2 - rest2) / verdi2
g2_gevinst = verdi2 - rest2
assert lik(skpl2, 150_000)
assert lik(g2_gevinst, skpl2 + (verdi2 - ut2b))
print(f"   skattepliktig {skpl2}; gale {g2_glemt}, {g2_forh:.2f}, {g2_gevinst}")
p = ledd("", f"<p>Iselin åpnet en aksjesparekonto og satte inn kr {kr(inn2)}. Et par år senere tok hun ut kr {kr(ut2a)}. "
             f"Hun har ikke satt inn mer. I 2026 er kontoen verdt kr {kr(verdi2)}. Da tar hun ut kr {kr(ut2b)}. Se bort fra "
             "skjermingsfradrag. Hvor mye av uttaket i 2026 er skattepliktig?</p>",
         (f"Kr {kr(skpl2)}", [kr(skpl2)]),
         [(f"Kr {kr(g2_glemt)}", [kr(g2_glemt)]),
          (f"Kr {kr(g2_forh)}", [kr(g2_forh)]),
          (f"Kr {kr(g2_gevinst)}", [kr(g2_gevinst)])],
         sol("Gevinst og utbytte inne på kontoen skattlegges ikke. Et uttak regnes først som tilbakebetaling av innskuddet, som "
             "er skattefritt. Bare det som går ut over gjenværende innskudd, er skattepliktig (manualen 14.6 og 20.7).",
             [f"Det første uttaket var innskudd: gjenværende innskudd {kr(inn2)} − {kr(ut2a)} = {kr(rest2)}.",
              f"Uttaket i 2026: {kr(ut2b)} − {kr(rest2)} = <b>kr {kr(skpl2)}</b> er skattepliktig. Med 2026-reglene blir "
              f"skatten {kr(skpl2)} × 37,84 % = {kr(skpl2 * TE)}."],
             [(f"Kr {kr(g2_glemt)}", f"det første uttaket glemt: {kr(ut2b)} − {kr(inn2)}."),
              (f"Kr {kr(g2_forh)}", f"uttaket fordelt forholdsmessig på innskudd og gevinst ({kr(g2_gevinst)}/{kr(verdi2)} "
                                    "av uttaket). Slik virker ikke kontoen: innskuddet tas ut først."),
              (f"Kr {kr(g2_gevinst)}", "hele gevinsten på kontoen, også den delen som blir stående.")],
             f"Etter uttaket står {kr(verdi2 - ut2b)} igjen. Innskuddet er brukt opp. Samlet gevinst {kr(g2_gevinst)} = "
             f"{kr(skpl2)} skattlagt nå + {kr(verdi2 - ut2b)} som skattlegges ved senere uttak. ✓"))
EX.append(oppgave(2, "Iselin tar ut fra aksjesparekontoen", "Aksjonærmodellen", [14, 5], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: effektiv skatt for eieren av et unotert selskap")
X3, ts3, MV3, fvand3, tw3 = 20_000_000, 0.13, 150_000_000, 0.35, 0.011
FS3 = MV3 * fvand3 * tw3
D3 = FS3 / (1 - TE)
DS3 = D3 * TE
SS3 = X3 * ts3
tot3 = SS3 + FS3 + DS3
aert3 = tot3 / X3
g3_person = (FS3 + DS3) / X3
g3_utenDS = (SS3 + FS3) / X3
g3_brutto = (SS3 + FS3 + FS3 * TE) / X3
assert lik(D3, FS3 + DS3)
print(f"   FS {FS3}, utbytte {D3:.2f}, utbytteskatt {DS3:.2f}, AERT {aert3:.4%}; gale {g3_person:.4%}, "
      f"{g3_utenDS:.4%}, {g3_brutto:.4%}")
body3 = (f"<p>Bodil eier et unotert selskap som tjener kr {kr(X3)} i året før skatt. Selskapet betaler i praksis "
         f"{pst(ts3, 0)} av overskuddet i selskapsskatt. Aksjene er verdt kr {kr(MV3)}. Formuesverdien etter rabatt er "
         f"{pst(fvand3, 0)} av markedsverdien. Bodil har ingen annen inntekt og tar bare ut så mye utbytte at hun kan betale formuesskatten. Anta at "
         f"formuesskatten er {pst(tw3, 1)} av hele formuesverdien. Eierskatten er 37,84 %. Se bort fra skjerming.</p>")
pa = ledd("a", "<p>Hva er Bodils effektive gjennomsnittlige skattesats (AERT)? Svar med to desimaler.</p>",
          (pst(aert3), [pst(aert3)]),
          [(pst(g3_person), [pst(g3_person)]),
           (pst(g3_utenDS), [pst(g3_utenDS)]),
           (pst(g3_brutto), [pst(g3_brutto)])],
          sol("AERT er all skatt som betales på veien fra selskapet til eieren, delt på den økonomiske inntekten før skatt: "
              "selskapsskatt + formuesskatt + utbytteskatt, delt på selskapets overskudd (forelesning 5, lysbilde 35–39, "
              "manualen 8.6). Utbyttet må dekke både formuesskatten og sin egen skatt.",
              [f"Formuesskatt: {kr(MV3)} × {pst(fvand3, 0)} × {pst(tw3, 1)} = {kr(FS3)}.",
               f"Utbytte: {kr(FS3)}/(1 − 0,3784) = {kr(D3)}. Utbytteskatt: {kr(D3)} × 37,84 % = {kr(DS3)}.",
               f"Samlet skatt: {kr(SS3)} + {kr(FS3)} + {kr(DS3)} = {kr(tot3)}. AERT = {kr(tot3)}/{kr(X3)} = "
               f"<b>{pst(aert3)}</b>."],
              [(pst(g3_person), "bare personskattene. Selskapsskatten mangler i telleren. Det er nettopp feilen AERT for "
                                "eiere skal rette (forelesning 5, lysbilde 22–25)."),
               (pst(g3_utenDS), "utbytteskatten glemt: utbyttet som betaler formuesskatten, skattlegges også."),
               (pst(g3_brutto), f"utbytteskatten regnet som {kr(FS3)} × 37,84 %. Utbyttet må også dekke sin egen skatt, "
                                "så skatten regnes av utbyttet, ikke av formuesskatten.")],
              f"Utbyttet {kr(D3)} går til {kr(FS3)} i formuesskatt og {kr(DS3)} i utbytteskatt, til sammen {kr(D3)}. ✓",
              "Hvert galt alternativ mangler ett ledd. Sjekk at telleren har alle tre skattene og at utbyttet dekker sin "
              "egen skatt."))
pb = ledd("b", "<p>Forskningen forelesningen viser til, finner at den rikeste prosenten betaler en mindre andel av "
               "bruttoinntekten i skatt enn mange lønnstakere. Hva er hovedforklaringen?</p>",
          ("Lav effektiv selskapsskatt i selskapene og lav formuesverdi på unoterte aksjer", []),
          [("Høy gjeld gir de rikeste store rentefradrag som senker skatten deres", []),
           ("Overskuddet flyttes til datterselskaper i skatteparadiser og skattlegges aldri i Norge", []),
           ("Skjermingsfradraget gjør nesten alt utbyttet de tar ut, skattefritt", [])],
          begrep("Forelesning 5 og manualen 8.6 peker på to årsaker. Selskapene betaler i snitt en effektiv selskapsskatt på "
                 "om lag 13 %, ikke 22 %. Unoterte aksjer får en formuesverdi på om lag 35 % av markedsverdien, mot 80 % for "
                 "børsnoterte. De rikeste eier om lag to tredeler unotert. Bodils 17,65 % viser det samme.",
                 "Lav selskapsskatt og lav verdsetting er riktig.",
                 [("Høy gjeld", "motsatt. Gjeldsgraden faller mot toppen av fordelingen. De rikeste er ikke lånefinansiert "
                                "(forelesning 5, lysbilde 33)."),
                  ("Skatteparadiser", "manualen 8.6 sier uttrykkelig at et alternativ som peker på skatteparadis som "
                                      "hovedforklaring, er galt."),
                  ("Skjermingsfradraget", "regnestykket i forelesningen ser bort fra skjermingen og lander likevel på om lag "
                                          "20 %. Den lave satsen kommer ikke derfra.")]))
pc = ledd("c", "<p>I den offisielle statistikken fikk den rikeste prosenten 8,8 % av markedsinntekten i 2018. I SSBs "
               "justerte tall fikk de 19,0 %. Hva forklarer forskjellen?</p>",
          ("Tilbakeholdt overskudd i selskapene regnes ikke som inntekt for eierne i statistikken", []),
          [("De rikeste har mest lønnsinntekt, men høye lønninger fanges ikke opp av skattemeldingen", []),
           ("Utbyttene økte kraftig da utbytteskatten kom, men statistikken har ikke tatt det inn", []),
           ("Den offisielle statistikken trekker formuesskatten fra inntekten før andelene regnes ut", [])],
          begrep("Offisiell inntektsstatistikk bygger på skattemeldingen og ser bare overskudd som er tatt ut som utbytte. Da "
                 "utbytteskatten kom, falt utbyttene til personlige aksjonærer fra 99 mrd. kr i 2005 til 7,4 mrd. kr i 2006. "
                 "SSB erstatter mottatt utbytte med eierens andel av årsresultatet (manualen 3.6, forelesning 1 lysbilde "
                 "19–24).",
                 "Tilbakeholdt overskudd er forklaringen.",
                 [("Lønnsinntekt", "de rikeste har lite lønn. Den økonomiske inntekten ligger i selskapene (forelesning 5, "
                                   "lysbilde 32)."),
                  ("Utbyttene økte", "motsatt. Utbyttene falt kraftig. Det er derfor statistikken undervurderer inntekten."),
                  ("Formuesskatten trekkes fra", "markedsinntekten måles før skatt. Formuesskatten inngår ikke.")]))
EX.append(oppgave(3, "Bodil og det unoterte selskapet", "Effektiv skattesats", [8, 1, 3], body3, [pa, pb, pc]))

# ======================================================================= 4
print("\nOppgave 4: inntektsskiftingslikningen og et aksjonærlån")
tl4, aga4, tc4, tp4 = 0.474, 0.124, 0.25, 0.22
venstre4 = tl4 + aga4
y4 = (venstre4 - tc4) / tp4
te4 = y4 * tp4
assert lik(te4, 0.348)
y4_lonn = (venstre4 + (tc4 - tp4) - tc4) / tp4          # lønnsskatten hevet like mye
y4_aga = (tl4 - tc4) / tp4                              # arbeidsgiveravgiften glemt
y4_fort = (venstre4 - tp4 + (tc4 - tp4)) / tp4          # endringen med feil fortegn
for y in (y4, y4_lonn, y4_aga, y4_fort):
    print(f"   y {y:.4f}, eierskatt {y * tp4:.4f}")


def ypar(y):
    return f"{kr(y, 2)} og {pst(y * tp4, 1)}", [kr(y, 2), pst(y * tp4, 1)]


pa = ledd("a", "<p>Et parti vil heve selskapsskatten fra 22 % til 25 % og beholde 22 % skatt på alminnelig inntekt for "
               "personer. Høyeste marginalskatt på lønn er 47,4 %. Arbeidsgiveravgiften utgjør 12,4 % av lønnskostnaden og "
               "bæres av arbeidstakeren. Oppjusteringsfaktoren skal settes slik at det verken lønner seg å gjøre lønn om til utbytte eller utbytte om til lønn. "
               "Hva blir faktoren og den effektive eierskatten?</p>",
          ypar(y4),
          [ypar(y4_lonn), ypar(y4_aga), ypar(y4_fort)],
          sol("Inntektsskiftingslikningen (forelesning 5, lysbilde 3–8): høyeste marginalskatt på lønn + arbeidsgiveravgiften "
              "arbeidstakeren bærer = selskapsskatt + eierskatt × oppjusteringsfaktoren y. Lysbilde 8 regner mindretallets "
              "forslag om 24 % på samme måte: lønnsskatten står stille, så faktoren må ned.",
              [f"Venstresiden er uendret: 47,4 % + 12,4 % = {pst(venstre4, 1)}.",
               f"{pst(venstre4, 1)} = 25 % + 22 % × y, så 22 % × y = {pst(te4, 1)}.",
               f"y = {kr(100 * te4, 1)}/22 = {kr(y4, 4)} ≈ <b>{kr(y4, 2)}</b>. Effektiv eierskatt er "
               f"<b>{pst(te4, 1)}</b>."],
              [(ypar(y4_lonn)[0], f"skatten på lønn også hevet til 25 %, så venstresiden blir {pst(venstre4 + 0.03, 1)}. "
                                  "Forslaget beholder 22 % for personer."),
               (ypar(y4_aga)[0], f"arbeidsgiveravgiften glemt: 47,4 % − 25 % = {pst(tl4 - tc4, 1)}."),
               (ypar(y4_fort)[0], "økningen i selskapsskatten ført med feil fortegn. Går selskapsskatten opp, må eierskatten "
                                  "ned for at summen skal holde.")],
              f"25 % + {pst(te4, 1)} = {pst(venstre4, 1)}. ✓ Den effektive eierskatten faller med nøyaktig de tre "
              "prosentpoengene selskapsskatten stiger."))
loan4 = 800_000
pb = ledd("b", f"<p>Brage eier alle aksjene i Brage Bygg AS. I 2026 låner han kr {kr(loan4)} av selskapet til markedsrente "
               "med fast nedbetalingsplan. Hvilket utsagn er riktig?</p>",
          ("Lånet skattlegges som utbytte det året han får pengene", []),
          [("Lånet er skattefritt fordi han betaler markedsrente og har en fast nedbetalingsplan", []),
           ("Lånet skattlegges som utbytte, men skatten betales tilbake når lånet er nedbetalt", []),
           ("Lån under kr 1 000 000 er unntatt, så lånet hans skattlegges ikke", ["1 000 000"])],
          begrep("Siden 2015 skattlegges lån fra et selskap til en personlig aksjonær som utbytte på utbetalingstidspunktet, "
                 "uansett rente og nedbetalingsplan (skatteloven § 10-11 fjerde ledd, manualen 6.5, forelesning 5 lysbilde 13). "
                 f"Uten skjerming blir skatten {kr(loan4)} × 37,84 % = {kr(loan4 * TE)}. I tillegg skylder Brage fortsatt "
                 "selskapet pengene.",
                 "Lånet er utbytte det året det utbetales.",
                 [("Skattefritt med markedsrente", "vilkårene endrer ingenting. Regelen ser på substansen: eieren bestemmer "
                                                   "selv om lånet blir krevd inn."),
                  ("Skatten tilbake ved nedbetaling", "tilbakebetaling gir ikke skatten tilbake (manualen 20.2)."),
                  ("Unntak under 1 000 000", "unntaket er kreditt under kr 100 000 som innfris innen 60 dager. Loven har "
                                             "ellers ingen beløpsgrense.")]))
EX.append(oppgave(4, "Selskapsskatten og Brage Bygg AS", "Aksjonærmodellen", [5, 6],
                  "<p>To uavhengige spørsmål.</p>", [pa, pb]))

# ======================================================================= 5
print("\nOppgave 5: unoterte aksjer i formuesskatten")
andel5, eiend5, gjeldS5, pris5, gjeldP5 = 0.30, 25_000_000, 5_000_000, 200_000_000, 1_000_000
rab5, BF5, t1, t2, K5 = 0.80, 1_900_000, 0.010, 0.011, 21_500_000


def fskatt(W):
    return t1 * (min(W, K5) - BF5) + t2 * max(0, W - K5) if W > BF5 else 0.0


fv5 = andel5 * (eiend5 - gjeldS5) * rab5
fg5 = gjeldP5 * rab5                       # eneste eiendel har rabatt: hele gjelden reduseres
netto5 = fv5 - fg5
fs5 = fskatt(netto5)
g5_fullgjeld = fskatt(fv5 - gjeldP5)
g5_sgjeld = fskatt(andel5 * eiend5 * rab5 - fg5)
g5_pris = fskatt(andel5 * pris5 * rab5 - fg5)
avis5 = andel5 * pris5 * t2
assert lik(fs5, 21_000)
print(f"   formuesverdi {fv5}, gjeld {fg5}, skatt {fs5}; gale {g5_fullgjeld}, {g5_sgjeld}, {g5_pris}; avis {avis5}")
body5 = (f"<p>Synnøve er enslig og eier {pst(andel5, 0)} av aksjene i det unoterte selskapet Fjelltech AS. Selskapets "
         f"eiendeler har en skattemessig verdi på kr {kr(eiend5)}. Gjelden er kr {kr(gjeldS5)}. Et fond kjøpte nylig aksjer "
         f"av en annen eier til en pris som verdsetter hele selskapet til kr {kr(pris5)}. Synnøve har ingen annen formue "
         f"og kr {kr(gjeldP5)} i personlig gjeld.</p>")
pa = ledd("a", "<p>Bruk skattereglene for 2026. Hvor mye formuesskatt betaler Synnøve?</p>",
          (f"Kr {kr(fs5)}", [kr(fs5)]),
          [(f"Kr {kr(g5_fullgjeld)}", [kr(g5_fullgjeld)]),
           (f"Kr {kr(g5_sgjeld)}", [kr(g5_sgjeld)]),
           (f"Kr {kr(g5_pris)}", [kr(g5_pris)])],
          sol("Unoterte aksjer verdsettes til eierandelen av selskapets skattemessige formuesverdi (eiendeler minus gjeld), deretter "
              "80 %. Prisen fra et aksjekjøp brukes ikke (manualen 7.5). Gjeld reduseres forholdsmessig når eiendelen "
              "har verdsettingsrabatt. Det gjelder også unoterte aksjer (skatteloven § 4-19, manualen 20.3). Satsene for "
              "2026 står i manualen 20.3: 80 %, 1,0 % opp til kr 21 500 000 og bunnfradrag kr 1 900 000 for enslige.",
              [f"Formuesverdi: {pst(andel5, 0)} × ({kr(eiend5)} − {kr(gjeldS5)}) × 80 % = {kr(fv5)}.",
               f"Fradragsberettiget gjeld: aksjene er eneste eiendel, så {kr(gjeldP5)} × 80 % = {kr(fg5)}.",
               f"Nettoformue {kr(netto5)}. Skatt: ({kr(netto5)} − {kr(BF5)}) × 1,0 % = <b>kr {kr(fs5)}</b>."],
              [(f"Kr {kr(g5_fullgjeld)}", f"gjeldsreduksjonen glemt: hele gjelden på {kr(gjeldP5)} trukket fra."),
               (f"Kr {kr(g5_sgjeld)}", f"selskapets gjeld glemt: {pst(andel5, 0)} × {kr(eiend5)} × 80 % = "
                                       f"{kr(andel5 * eiend5 * rab5)}."),
               (f"Kr {kr(g5_pris)}", f"prisen fra aksjekjøpet brukt: {pst(andel5, 0)} × {kr(pris5)} × 80 % − {kr(fg5)} = "
                                     f"{kr(andel5 * pris5 * rab5 - fg5)}, med 1,1 % over kr 21 500 000.")],
              f"Gjelden kan også regnes med formelen gjeld × (1 − rabatterte verdier × 20 %/samlet verdi). Med aksjene som "
              f"eneste eiendel blir brøken 1. Fradraget blir {kr(gjeldP5)} × 0,80 = {kr(fg5)}. ✓"))
fs5_bors = fskatt(andel5 * pris5 * rab5 - fg5)     # etter en børsnotering til samme verdi
assert lik(fs5_bors, g5_pris)
pb = ledd("b", "<p>Styret i Fjelltech AS vurderer å børsnotere selskapet. Anta at kursen vil verdsette selskapet omtrent "
               "som fondets kjøp gjorde. Hvilket utsagn om Synnøves formuesskatt er riktig?</p>",
          ("Den går kraftig opp, fordi børsnoterte aksjer verdsettes etter kursen", []),
          [("Den endres lite, fordi alle aksjer verdsettes til 80 % av markedsverdien", ["80"]),
           ("Den går ned, fordi børsnoterte aksjer får større verdsettingsrabatt enn unoterte", []),
           ("Den går opp, men bare fordi børsnoterte aksjer ikke får noen verdsettingsrabatt", [])],
          begrep("Unoterte aksjer verdsettes etter selskapets skattemessige formuesverdi, børsnoterte etter kursen. Begge "
                 f"verdsettes til 80 % (manualen 7.5 og 20.3). Etter en børsnotering blir Synnøves aksjer verdt "
                 f"{pst(andel5, 0)} × {kr(pris5)} × 80 % = {kr(andel5 * pris5 * rab5)}. Formuesskatten stiger da fra "
                 f"kr {kr(fs5)} til kr {kr(fs5_bors)}. Forelesningene bruker denne forskjellen til å vise at verdsettingen "
                 "betyr mer enn satsen. Reglene gir også et insentiv til å holde selskaper unotert (forelesning 1 lysbilde "
                 "14–18, forelesning 2 lysbilde 5–7).",
                 "Formuesskatten går kraftig opp.",
                 [("Endres lite", "unoterte aksjer verdsettes ikke etter markedsverdien, men etter selskapets skattemessige "
                                  "verdier. Det er derfor Synnøve betaler så lite i dag."),
                  ("Går ned", "børsnoterte og unoterte aksjer har samme rabatt. Begge verdsettes til 80 %."),
                  ("Bare fordi ingen rabatt", "børsnoterte aksjer verdsettes også til 80 %. Økningen kommer av at kursen "
                                              "erstatter de skattemessige verdiene.")]))
EX.append(oppgave(5, "Synnøve og aksjene i Fjelltech AS", "Formuesskatt", [7], body5, [pa, pb]))

# ======================================================================= 6
print("\nOppgave 6: bankinnskudd med høy inflasjon")
B6, i6, pi6, t6, w6 = 2_000_000, 0.05, 0.04, 0.22, 0.010
skatt6 = i6 * t6 + w6                      # per krone innskudd
andel6 = skatt6 / i6
real_for6 = (1 + i6) / (1 + pi6) - 1
g6a_fs = t6
g6a_bare = w6 / i6
g6a_sum = t6 + w6
r6 = (1 + i6 - skatt6) / (1 + pi6) - 1
g6b_approx = i6 - skatt6 - pi6
g6b_fs = (1 + i6 * (1 - t6)) / (1 + pi6) - 1
g6b_real = real_for6 * (1 - t6) - w6
assert lik(andel6, 0.42)
print(f"   andel {andel6}; gale {g6a_fs}, {g6a_bare}, {g6a_sum}; real {r6:.6f}; gale {g6b_approx}, {g6b_fs:.6f}, {g6b_real:.6f}")
body6 = (f"<p>Gunvor har kr {kr(B6)} på en bankkonto hele året. Renten er {pst(i6, 0)}. Inflasjonen er {pst(pi6, 0)}. "
         f"Renteinntekten skattlegges med {pst(t6, 0)}. Formuesskatten er {pst(w6, 1)} av innskuddet.</p>")
pa = ledd("a", "<p>Hvor stor andel av renteinntekten går til inntektsskatt og formuesskatt til sammen?</p>",
          (pst(andel6), [pst(andel6)]),
          [(pst(g6a_fs), [pst(g6a_fs)]),
           (pst(g6a_sum), [pst(g6a_sum)]),
           (pst(g6a_bare), [pst(g6a_bare)])],
          sol("Begge skattene sammenlignes med renteinntekten. Formuesskatten treffer hele innskuddet, så målt mot renten blir "
              "den τ<sub>w</sub>/i (manualen 8.1). Skatten regnes av den nominelle renten (manualen 2.2).",
              [f"Rente: {kr(B6)} × {pst(i6, 0)} = {kr(B6 * i6)}. Inntektsskatt {kr(B6 * i6 * t6)}.",
               f"Formuesskatt: {kr(B6)} × {pst(w6, 1)} = {kr(B6 * w6)}.",
               f"({kr(B6 * i6 * t6)} + {kr(B6 * w6)})/{kr(B6 * i6)} = <b>{pst(andel6)}</b>."],
              [(pst(g6a_fs), "formuesskatten glemt."),
               (pst(g6a_sum), "satsene lagt sammen. Formuesskatten er 1 % av innskuddet, ikke av renten."),
               (pst(g6a_bare), f"bare formuesskatten: {kr(B6 * w6)}/{kr(B6 * i6)}.")],
              f"Per krone: {kr(i6, 2)} × {kr(t6, 2)} + {kr(w6, 2)} = {kr(skatt6, 3)}. Delt på {kr(i6, 2)} gir det "
              f"{kr(andel6, 2)}. ✓"))
g6b_infl = i6 - skatt6                           # inflasjonen glemt
r6_tilnaerm = i6 - skatt6 - pi6                  # tilnærmingen R − π: skal ikke stå blant alternativene
for g in (g6b_real, g6b_infl, g6b_fs):
    assert pst(g) != pst(r6_tilnaerm)
pb = ledd("b", "<p>Hva er realavkastningen etter skatt? Svar med to desimaler.</p>",
          (pst(r6), [pst(r6)]),
          [(pst(g6b_real), [pst(g6b_real)]),
           (pst(g6b_infl), [pst(g6b_infl)]),
           (pst(g6b_fs), [pst(g6b_fs)])],
          sol("Rekkefølgen er nominelt, så etter skatt, så realt. Realavkastningen er (1 + avkastning etter skatt)/(1 + "
              "inflasjon) − 1. Ber oppgaven om desimaler, skal den eksakte formelen brukes (manualen 2.2 og 20.4, "
              "forelesning 2 lysbilde 41).",
              [f"Nominell avkastning etter skatt: {pst(i6, 2)} − {pst(skatt6, 2)} = {pst(i6 - skatt6, 2)}.",
               f"Real: {kr(1 + i6 - skatt6, 3)}/{kr(1 + pi6, 2)} − 1 = <b>{pst(r6)}</b>."],
              [(pst(g6b_real), f"skatten regnet av realrenten: {pst(real_for6, 2)} × 0,78 − 1 %. Skatten treffer den "
                               "nominelle renten, også inflasjonskompensasjonen."),
               (pst(g6b_infl), "inflasjonen glemt: det er den nominelle avkastningen etter skatt."),
               (pst(g6b_fs), f"formuesskatten glemt: {kr(1 + i6 * (1 - t6), 3)}/{kr(1 + pi6, 2)} − 1. Tilnærmingen gir samme "
                             "tall, men det er galt uansett metode, fordi formuesskatten mangler.")],
              f"I kroner: {kr(B6)} blir {kr(B6 * (1 + i6 - skatt6))} etter skatt, som er "
              f"{kr(B6 * (1 + i6 - skatt6) / (1 + pi6))} i dagens kroner. Det er {pst(r6)} av {kr(B6)}. ✓ Tilnærmingen "
              f"{pst(i6 - skatt6, 2)} − {pst(pi6, 0)} gir {pst(r6_tilnaerm)}. Det tallet står ikke blant alternativene, "
              "fordi fasitene til oppgavene i forelesning 2 selv bruker tilnærmingen. Regner du slik, er det riktige "
              "alternativet likevel det nærmeste.",
              "Tre av alternativene er negative og ligger tett. Regn nominelt, skatt og realt i den rekkefølgen før du ser "
              "på dem."))
EX.append(oppgave(6, "Gunvor og pengene i banken", "Formuesskatt som avkastningsskatt", [2, 8], body6, [pa, pb]))

# ======================================================================= 7
print("\nOppgave 7: avgift med lineære kurver")
a7, b7, c7, d7, t7 = 1_200, 20, 40, 300, 6       # x = a − bP, x = cp − d
P07 = (a7 + d7) / (b7 + c7)
x07 = a7 - b7 * P07
p7 = (a7 - b7 * t7 + d7) / (b7 + c7)
P7 = p7 + t7
x7 = c7 * p7 - d7
assert lik(a7 - b7 * P7, x7)
andel7 = (P7 - P07) / t7
assert lik(andel7, c7 / (b7 + c7))
dvt7 = 0.5 * t7 * (x07 - x7)
assert lik(dvt7, 0.5 * t7 ** 2 * b7 * c7 / (b7 + c7))
prov7 = t7 * x7
print(f"   P0 {P07}, x0 {x07}, p {p7}, P {P7}, x {x7}, andel {andel7}, dødvekt {dvt7}, proveny {prov7}")
body7 = (f"<p>Etterspørselen etter en vare er x = {kr(a7)} − {kr(b7)}P. Tilbudet er x = {kr(c7)}p − {kr(d7)}. Her er x "
         "kvantum, P prisen kjøperne betaler og p prisen selgerne sitter igjen med. Staten innfører en avgift på "
         f"kr {kr(t7)} per enhet som kjøperne betaler inn.</p>")
pa = ledd("a", "<p>Hvor stor andel av avgiften bærer kjøperne?</p>",
          (pst(andel7, 1), [pst(andel7, 1)]),
          [(pst(1 - andel7, 1), [pst(1 - andel7, 1)]),
           (pst(1.0, 1), [pst(1.0, 1)]),
           (pst(0.5, 1), [pst(0.5, 1)])],
          sol("Hvem som betaler inn avgiften, betyr ingenting for hvem som bærer den. Likevekten er D(p + t) = S(p). Den "
              "minst elastiske siden bærer mest. Med lineære kurver er kjøpernes andel S′/(S′ − D′) (manualen 11.2–11.4).",
              [f"Før avgiften: {kr(a7)} − {kr(b7)}P = {kr(c7)}P − {kr(d7)}, så P = {kr(P07)} og x = {kr(x07)}.",
               f"Med avgiften: {kr(a7)} − {kr(b7)}(p + {kr(t7)}) = {kr(c7)}p − {kr(d7)}, så p = {kr(p7)} og P = {kr(P7)}.",
               f"Kjøperne betaler {kr(P7 - P07)} mer av {kr(t7)}: {kr(P7 - P07)}/{kr(t7)} = <b>{pst(andel7, 1)}</b>."],
              [(pst(1 - andel7, 1), f"selgernes andel: prisen de sitter igjen med, faller fra {kr(P07)} til {kr(p7)}."),
               (pst(1.0, 1), "den som betaler inn avgiften, bærer den. Det er formell insidens, ikke reell."),
               (pst(0.5, 1), "lik deling. Delingen følger helningene, ikke en tommelfingerregel.")],
              f"Formelen: {kr(c7)}/({kr(c7)} + {kr(b7)}) = {kr(andel7, 3)}. Andelene summerer til én: "
              f"{pst(andel7, 1)} + {pst(1 - andel7, 1)} = 100 %. ✓"))
pb = ledd("b", "<p>Hvor stort er dødvektstapet?</p>",
          (f"Kr {kr(dvt7)}", [kr(dvt7)]),
          [(f"Kr {kr(2 * dvt7)}", [kr(2 * dvt7)]),
           (f"Kr {kr(prov7)}", [kr(prov7)]),
           (f"Kr {kr(0.5 * t7 * x7)}", [kr(0.5 * t7 * x7)])],
          sol("Dødvektstapet er trekanten mellom kurvene: ½ × t × (x<sub>0</sub> − x<sub>t</sub>). Provenyet er en "
              "overføring til staten og ikke et tap (manualen 11.5).",
              [f"Kvantumet faller fra {kr(x07)} til {kr(x7)}, altså med {kr(x07 - x7)}.",
               f"½ × {kr(t7)} × {kr(x07 - x7)} = <b>kr {kr(dvt7)}</b>."],
              [(f"Kr {kr(2 * dvt7)}", "halvparten glemt: rektangelet i stedet for trekanten."),
               (f"Kr {kr(prov7)}", f"provenyet {kr(t7)} × {kr(x7)}. Det går til staten og er ikke tapt."),
               (f"Kr {kr(0.5 * t7 * x7)}", "trekanten regnet med det nye kvantumet i stedet for kvantumsfallet.")],
              f"Formelen ½ × t² × |S′D′|/(S′ − D′) = ½ × {kr(t7 ** 2)} × {kr(b7 * c7)}/{kr(b7 + c7)} = {kr(dvt7)}. ✓"))
EX.append(oppgave(7, "En avgift på kr 6 per enhet", "Skatteincidens", [11], body7, [pa, pb]))

# ======================================================================= 8
print("\nOppgave 8: giret boligkjøp")
P8, L8, r8, g8, dok8, t8, lonn8 = 5_000_000, 4_500_000, 0.05, 0.06, 0.025, 0.22, 900_000
E8 = P8 - L8                                     # teksten sier at dokumentavgiften holdes utenfor
rente8 = L8 * r8 * (1 - t8)
netto8 = g8 * P8 - rente8
RE8 = netto8 / E8
g8_fradrag = (g8 * P8 - L8 * r8) / E8            # rentefradraget glemt
g8_gevskatt = (g8 * P8 * (1 - t8) - rente8) / E8  # verdistigningen skattlagt
g8_RA = g8 * P8 / P8                             # avkastningen på hele boligen
RA8, RG8 = g8_RA, r8 * (1 - t8)
assert lik(RE8, RA8 + (RA8 - RG8) * L8 / E8)
assert lik(RE8, 0.249)
print(f"   EK {E8}, netto {netto8}, RE {RE8:.4%}; gale {g8_fradrag:.4%}, {g8_gevskatt:.4%}, {g8_RA:.4%}")
body8 = (f"<p>Embla kjøper en selveierleilighet for kr {kr(P8)} og flytter inn. Hun tjener kr {kr(lonn8)} i året. Hun låner "
         f"kr {kr(L8)} til {pst(r8, 0)} rente og betaler resten selv. Lånet er avdragsfritt det første året. Boligprisene stiger "
         f"{pst(g8, 0)} det første året.</p>")
pa = ledd("a", "<p>Bruk skattereglene for 2026. Se bort fra dokumentavgiften, felleskostnader og verdien av å bo i "
               "leiligheten. Hva er avkastningen på egenkapitalen det første året?</p>",
          (pst(RE8), [pst(RE8)]),
          [(pst(g8_fradrag), [pst(g8_fradrag)]),
           (pst(g8_gevskatt), [pst(g8_gevskatt)]),
           (pst(g8_RA), [pst(g8_RA)])],
          sol("Med lån tilfaller hele verdistigningen egenkapitalen, mens lånet koster renter etter fradrag. Rentene gir "
              "fradrag med 22 % (manualen 4.3 og 20.9). Verdistigningen skattlegges ikke: den er ikke realisert. Gevinst ved "
              "salg av egen bolig er dessuten skattefri når eier- og botid er oppfylt (manualen 4.4).",
              [f"Egenkapital: {kr(P8)} − {kr(L8)} = {kr(E8)}.",
               f"Renter {kr(L8)} × {pst(r8, 0)} = {kr(L8 * r8)}, etter fradrag {kr(rente8)}. Verdistigning {kr(g8 * P8)}.",
               f"({kr(g8 * P8)} − {kr(rente8)})/{kr(E8)} = {kr(netto8)}/{kr(E8)} = <b>{pst(RE8)}</b>. Lønnen er støy."],
              [(pst(g8_fradrag), f"rentefradraget glemt: ({kr(g8 * P8)} − {kr(L8 * r8)})/{kr(E8)}."),
               (pst(g8_gevskatt), f"verdistigningen skattlagt med 22 %: ({kr(g8 * P8 * (1 - t8))} − {kr(rente8)})/{kr(E8)}. "
                                  "Ingenting er solgt. Gevinst på egen bolig er dessuten skattefri når vilkårene er oppfylt."),
               (pst(g8_RA), f"avkastningen på hele boligen, {kr(g8 * P8)}/{kr(P8)}. Giringen er oversett.")],
              f"Brekkstangformelen: {pst(RA8)} + ({pst(RA8)} − {pst(RG8)}) × {kr(L8 / E8, 0)} = {pst(RE8)}, der "
              f"{kr(L8 / E8, 0)} = {kr(L8)}/{kr(E8)} er gjeldsgraden. ✓"))
mnd8a, mnd8b = 10, 14
pb = ledd("b", "<p>Hvilket utsagn er riktig?</p>",
          (f"Selger hun etter {mnd8b} måneder og har bodd der hele tiden, er gevinsten skattefri", [str(mnd8b)]),
          [(f"Selger hun etter {mnd8a} måneder og har bodd der hele tiden, er gevinsten skattefri", [str(mnd8a)]),
           (f"Dokumentavgiften på kr {kr(P8 * dok8)} kan hun trekke fra i alminnelig inntekt året hun kjøper",
            [kr(P8 * dok8)]),
           (f"Hadde hun kjøpt en borettslagsandel til samme pris, ville hun også betalt kr {kr(P8 * dok8)} i dokumentavgift",
            [kr(P8 * dok8)])],
          begrep("Gevinst ved salg av egen bolig er skattefri når du har eid boligen i mer enn ett år og har bodd i den minst 12 "
                 "av de siste 24 månedene (manualen 4.4, forelesning 3). Dokumentavgiften betales bare ved tinglysing av skjøte "
                 "på selveierbolig og er ikke fradragsberettiget (manualen 4.1).",
                 f"Salg etter {mnd8b} måneder med botid hele tiden er skattefritt.",
                 [(f"Etter {mnd8a} måneder", "hun har ikke eid boligen i mer enn ett år, så gevinsten er skattepliktig med "
                                             "22 %."),
                  ("Fradrag for dokumentavgiften", "dokumentavgiften gir ikke fradrag i alminnelig inntekt."),
                  ("Borettslagsandel", "ved kjøp av en borettslagsandel betales ingen dokumentavgift, bare et "
                                       "registreringsgebyr.")]))
pc = ledd("c", "<p>Embla har lest at bolig har gitt litt høyere realavkastning enn aksjer i 16 land fra 1870 til 2015 (Jordà "
               "mfl. 2019). Hvilket utsagn om funnene er i tråd med forelesningen?</p>",
          ("Tallene gjelder en bred boligportefølje, så den som eier ett hus, har mer risiko enn tallene viser", []),
          [("Bolig har gitt mest fordi boligprisene har steget mer enn aksjekursene, mens leien betyr lite", []),
           ("Bolig har svingt omtrent like mye som aksjer, så risikoen ved de to er den samme", []),
           ("Siden bolig har gitt mest med minst risiko, er én enkelt bolig en bedre investering enn et globalt aksjefond",
            [])],
          begrep("Jordà mfl. finner 7,3 % realavkastning for bolig og 6,7 % for aksjer, med standardavvik om lag 10 mot 24. "
                 "Tallene er snittet for en boligportefølje. Den som eier ett hus, kan ikke diversifisere bort risikoen knyttet "
                 "til akkurat det huset og stedet (manualen 3.1–3.4, forelesning 2 lysbilde 33–37).",
                 "Ett hus har mer risiko enn tallene viser.",
                 [("Prisstigningen", "motsatt. Realprisstigningen på bolig er bare om lag 1 % i året. Resten er leie, mens "
                                     "kursgevinst er viktigst for aksjer."),
                  ("Like stor svingning", "aksjer har omtrent dobbelt så høyt standardavvik som bolig."),
                  ("Én bolig slår aksjefondet", "slutningen overser at tallene gjelder en diversifisert portefølje. Ett hus er "
                                                "ikke det.")]))
EX.append(oppgave(8, "Embla kjøper leilighet", "Investeringscaser", [4, 3], body8, [pa, pb, pc]))

# ======================================================================= 9
print("\nOppgave 9: folkelån med mislighold")
I9, R9, q9, t9 = 200_000, 0.12, 0.95, 0.22
E9 = (q9 * I9 * R9 - (1 - q9) * I9) / I9
g9_lovet = R9
g9_rente = q9 * R9
g9_begge = (I9 * R9 - (1 - q9) * I9) / I9
E9_med = E9 * (1 - t9)
E9_uten = (q9 * I9 * R9 * (1 - t9) - (1 - q9) * I9) / I9
assert lik(E9, 0.064)
print(f"   E {E9}; gale {g9_lovet}, {g9_rente}, {g9_begge}; etter skatt med fradrag {E9_med}, uten {E9_uten}")
body9 = (f"<p>Maren låner ut kr {kr(I9)} i ett år gjennom en registrert folkefinansieringsplattform. Lånet har "
         f"{pst(R9, 0)} rente. Med {pst(q9, 0)} sannsynlighet betaler låntakeren renten og hele lånet tilbake. Ellers taper "
         "Maren hele beløpet og får ingen rente.</p>")
pa = ledd("a", "<p>Hva er forventet avkastning før skatt?</p>",
          (pst(E9), [pst(E9)]),
          [(pst(g9_lovet), [pst(g9_lovet)]),
           (pst(g9_rente), [pst(g9_rente)]),
           (pst(g9_begge), [pst(g9_begge)])],
          sol("Lovet rente er ikke forventet avkastning. Forventningen vekter renten med sannsynligheten for at lånet betales "
              "og trekker fra det forventede tapet av hovedstolen (manualen 4.6, forelesning 3 lysbilde 38–51).",
              [f"Godt utfall: {pst(q9, 0)} × {kr(I9 * R9)} = {kr(q9 * I9 * R9)}.",
               f"Mislighold: {pst(1 - q9, 0)} × {kr(I9)} = {kr((1 - q9) * I9)} i forventet tap.",
               f"({kr(q9 * I9 * R9)} − {kr((1 - q9) * I9)})/{kr(I9)} = <b>{pst(E9)}</b>."],
              [(pst(g9_lovet), "den lovede renten, som om alle betaler."),
               (pst(g9_rente), "misligholdet tatt med på renten, men ikke på hovedstolen."),
               (pst(g9_begge), "renten talt med også i utfallet der låntakeren ikke betaler.")],
              f"Utfallene: +{kr(I9 * R9)} med {pst(q9, 0)} og −{kr(I9)} med {pst(1 - q9, 0)}. "
              f"{kr(q9 * I9 * R9)} − {kr((1 - q9) * I9)} = {kr(E9 * I9)}. ✓",
              "Alle de gale alternativene er større enn det riktige, fordi hver feil utelater en kostnad."))
pb = ledd("b", f"<p>Maren er risikonøytral. Renteinntekter skattlegges med {pst(t9, 0)}. Hvilket utsagn er riktig?</p>",
          ("Med fradrag for tapet er forventet avkastning etter skatt 78 % av forventet avkastning før skatt", ["78"]),
          [("Med fradrag for tapet er forventet avkastning etter skatt 78 % av den lovede renten", ["78"]),
           ("Uten fradrag for tapet tar staten 22 % av både renten og tapet, så forventningen bare skaleres ned", ["22"]),
           ("Fradraget for tapet har ingen verdi for henne, fordi hun bare bryr seg om forventet avkastning", [])],
          begrep("Med tapsfradrag treffer skatten gevinst og tap med samme sats, så forventningen etter skatt blir (1 − t) "
                 f"ganger forventningen før skatt: {pst(E9)} × 0,78 = {pst(E9_med)}. Uten fradrag tar staten del i renten, "
                 f"men ikke i tapet. Da faller forventningen til {pst(E9_uten)} (manualen 4.6).",
                 "78 % av forventet avkastning før skatt er riktig.",
                 [("78 % av den lovede renten", f"glemmer misligholdet: {pst(R9, 0)} × 0,78 = {pst(R9 * 0.78)}."),
                  ("Uten fradrag skaleres bare ned", "byttet om. Det er med fradrag at staten deler både renten og tapet."),
                  ("Fradraget har ingen verdi", f"nettopp fordi hun bryr seg om forventningen, har fradraget verdi: "
                                                f"{pst(E9_med)} mot {pst(E9_uten)}.")]))
EX.append(oppgave(9, "Maren låner ut penger gjennom en plattform", "Investeringscaser", [4, 12], body9, [pa, pb]))

# ======================================================================= 10
print("\nOppgave 10: bosted etter kort botid")
dager10a, dager10b = 150, 20
assert dager10a > 61 and dager10b <= 61 and dager10a < 183
p = ledd("", "<p>Kasper er dansk og har bodd og jobbet i Norge siden 2020. I mai 2026 flytter han tilbake til Danmark sammen "
             f"med familien og selger leiligheten i Oslo. I 2026 er han i Norge {dager10a} dager til sammen. I 2027 er han "
             f"her {dager10b} dager. Hva er riktig om bostedet hans etter norsk intern rett?</p>",
         ("Bostedet opphører fra og med året etter at han flyttet", []),
         [("Bostedet opphører først etter de tre inntektsårene som følger etter utflyttingsåret", []),
          ("Bostedet opphører allerede i utflyttingsåret, fordi han var i Norge under 183 dager det året", ["183"]),
          ("Han er bosatt også året etter flyttingen, fordi han har vært i Norge mer enn 270 dager de siste 36 månedene",
           ["270", "36"])],
         begrep("Bostedet opphører for det inntektsåret du kan godtgjøre at du ikke har vært i Norge mer enn 61 dager og at "
                "verken du eller nærstående har disponert bolig her. Kravet om tre slike år gjelder bare den som har vært bosatt "
                "i minst ti år før utflyttingsåret (skatteloven § 2-1 tredje ledd, manualen 13.1). Kasper har bodd her i seks år. "
                f"I 2026 var han her {dager10a} dager, så han er bosatt det året. I 2027 er han her {dager10b} dager uten bolig.",
                "Bostedet opphører fra og med 2027.",
                [("Tre år etter utflyttingsåret", "tiårsregelen. Den gjelder ikke for seks års botid."),
                 ("Allerede i utflyttingsåret", "183 dager er grensen for å bli bosatt. For å slutte å være bosatt gjelder "
                                                f"61 dager. Han var her {dager10a}."),
                 ("Bosatt på grunn av 270 dager", "270-dagersregelen avgjør når bosted oppstår, ikke når det opphører.")],
                "Tiårsregelen er det mest fristende gale alternativet. Sjekk alltid hvor lenge personen har bodd i Norge."))
EX.append(oppgave(10, "Kasper flytter hjem til Danmark", "Internasjonal skatt", [13], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: Merton for en ung statsansatt")
F11, H11, ER11, sd11, rf11, gam11 = 500_000, 3_500_000, 0.06, 0.16, 0.02, 2.5
w11 = (ER11 - rf11) / (gam11 * sd11 ** 2)
belop11 = w11 * (F11 + H11)
g11_F = w11 * F11
g11_sd = (ER11 - rf11) / (gam11 * sd11) * (F11 + H11)
g11_ER = ER11 / (gam11 * sd11 ** 2) * (F11 + H11)
assert lik(w11, 0.625) and lik(belop11, 2_500_000)
print(f"   w {w11}, beløp {belop11}; gale {g11_F}, {g11_sd}, {g11_ER}")
body11 = (f"<p>Hedvig er 26 år og fast ansatt i staten. Lønnen hennes svinger ikke med aksjemarkedet. Nåverdien av framtidig "
          f"lønn er kr {kr(H11)}. Finansformuen hennes er kr {kr(F11)}. Et globalt indeksfond har forventet avkastning "
          f"{pst(ER11, 0)} og standardavvik {pst(sd11, 0)}. Risikofri rente er {pst(rf11, 0)}. Hun kan låne til den renten. "
          f"Risikoaversjonen hennes er γ = {kr(gam11, 1)}.</p>")
pa = ledd("a", "<p>Hvor mye bør Hedvig ha i indeksfondet?</p>",
          (f"Kr {kr(belop11)}", [kr(belop11)]),
          [(f"Kr {kr(g11_F)}", [kr(g11_F)]),
           (f"Kr {kr(g11_sd)}", [kr(g11_sd)]),
           (f"Kr {kr(g11_ER)}", [kr(g11_ER)])],
          sol("Mertons andel w* = (E(r) − r<sub>f</sub>)/(γσ²) gjelder hele formuen, også humankapitalen. Sikker lønn virker som "
              "et bankinnskudd, så ønsket aksjebeløp er w* × (F + H). Over 100 % av finansformuen betyr at hun låner "
              "(manualen 14.4–14.5 og 20.7, forelesningen om aksjesparing lysbilde 8).",
              [f"w* = ({pst(ER11, 0)} − {pst(rf11, 0)})/({kr(gam11, 1)} × {kr(sd11, 2)}²) = {kr(ER11 - rf11, 2)}/"
               f"{kr(gam11 * sd11 ** 2, 3)} = {kr(w11, 3)}.",
               f"Samlet formue: {kr(F11)} + {kr(H11)} = {kr(F11 + H11)}.",
               f"{kr(w11, 3)} × {kr(F11 + H11)} = <b>kr {kr(belop11)}</b>. Det er {pst(belop11 / F11, 0)} av "
               f"finansformuen, så hun låner {kr(belop11 - F11)}."],
              [(f"Kr {kr(g11_F)}", "humankapitalen glemt: andelen brukt på finansformuen alene."),
               (f"Kr {kr(g11_sd)}", f"standardavviket ikke kvadrert: w = {kr((ER11 - rf11) / (gam11 * sd11), 2)}."),
               (f"Kr {kr(g11_ER)}", f"forventet avkastning {pst(ER11, 0)} i telleren i stedet for meravkastningen.")],
              f"Hun skal ha {kr(belop11)} i aksjer og {kr(F11 + H11 - belop11)} sikkert. Humankapitalen dekker "
              f"{kr(H11)} av det sikre, så finansielt er hun {kr(F11 + H11 - belop11 - H11)} i bank, altså et lån på "
              f"{kr(belop11 - F11)}. ✓"))
pb = ledd("b", "<p>Hvilket utsagn om å låne til aksjekjøp er i tråd med forelesningen?</p>",
          ("Med sikker lønn og liten finansformue kan det være fornuftig å låne litt til fondssparing, så lenge renten er lav",
           []),
          [("Et forbrukslån til 12 % rente kan lønne seg, siden aksjer har gitt om lag 15 % i året", ["12", "15"]),
           ("Det er aldri rasjonelt å lånefinansiere aksjekjøp, uansett hvor lite risikoavers man er og hvor lav renten er",
            []),
           ("Unge bør låne til aksjer fordi aksjer blir mindre risikable jo lengre tidshorisonten er", [])],
          begrep("Forelesningen om aksjesparing (lysbilde 44–47) bruker en ung statsansatt som eksempel: stor og sikker "
                 "humankapital og liten finansformue gir lite risiko ved å lånefinansiere litt fondssparing. Lånet må ha lav "
                 "rente. Aksjemarkedet har gitt 3–7 prosentpoeng over risikofri rente.",
                 "Litt lån til lav rente kan være fornuftig.",
                 [("Forbrukslån til 12 %", "lysbilde 47: det er åpenbart ikke smart. Det er ingen grunn til å tro på 15 % "
                                           "avkastning."),
                  ("Aldri rasjonelt", "lånefinansiering kan være rasjonelt gitt lav nok risikoaversjon (lysbilde 54). "
                                      "Kapitalmarkedslinjen fortsetter forbi markedsporteføljen med lån."),
                  ("Mindre risiko med lang horisont", "det er selvhjelpsbøkenes argument. Økonomene er ikke enige i det. "
                                                      "Grunnen til mer aksjer for unge er humankapitalen (lysbilde 13).")]))
EX.append(oppgave(11, "Hedvig og indeksfondet", "Porteføljevalg", [14], body11, [pa, pb]))

# ======================================================================= 12
print("\nOppgave 12: forsikring med logaritmisk nytte")
W12, L12, q12, P12tilbud = 2_000_000, 800_000, 0.02, 17_000
EU12 = (1 - q12) * math.log(W12) + q12 * math.log(W12 - L12)
CE12 = math.exp(EU12)
maks12 = W12 - CE12
akt12 = q12 * L12
risiko12 = (W12 - akt12) - CE12
EUs12 = (1 - q12) * math.sqrt(W12) + q12 * math.sqrt(W12 - L12)
g12_rot = W12 - EUs12 ** 2                                   # √W av gammel vane
g12_feilform = W12 - math.exp((1 - q12) * math.log(W12) + q12 * math.log(L12))  # tapet brukt som formuen etter tapet
assert lik(maks12, akt12 + risiko12)
assert P12tilbud < maks12
pstar_noyt = P12tilbud / L12
# kritisk sannsynlighet til tilbudt premie (bare til løsningen)
pstar12 = (math.log(W12) - math.log(W12 - P12tilbud)) / (math.log(W12) - math.log(W12 - L12))
assert pstar12 < q12 < pstar_noyt
# premisset i b skal ikke peke ut svaret i a: tre av fire alternativer i a ligger over tilbudet
assert sum(x > P12tilbud for x in (maks12, akt12, g12_rot, g12_feilform)) == 3
print(f"   E[U] {EU12:.6f}, CE {CE12:.2f}, maks {maks12:.2f}; aktuarisk {akt12}, risikopremie {risiko12:.2f}, "
      f"√W {g12_rot:.2f}, tap som formue {g12_feilform:.2f}; p* {pstar12:.5f}, nøytral {pstar_noyt}")
body12 = (f"<p>Gaute har en formue på kr {kr(W12)}. Av dette er kr {kr(L12)} en hytte. Hytta brenner med sannsynlighet "
          f"{pst(q12, 0)} og er da tapt. Gaute har nyttefunksjonen U(W) = ln W.</p>")
pa = ledd("a", "<p>Hva er den høyeste premien Gaute vil betale for full dekning? Rund av til nærmeste krone.</p>",
          (f"Kr {kr(maks12)}", [kr(maks12)]),
          [(f"Kr {kr(akt12)}", [kr(akt12)]),
           (f"Kr {kr(g12_rot)}", [kr(g12_rot)]),
           (f"Kr {kr(g12_feilform)}", [kr(g12_feilform)])],
          sol("Høyeste premie er formuen minus sikkerhetsekvivalenten. Med ln W går du tilbake til kroner med "
              "eksponentialfunksjonen (manualen 17.3 og 17.5).",
              [f"E[U] = {kr(1 - q12, 2)} × ln {kr(W12)} + {kr(q12, 2)} × ln {kr(W12 - L12)} = {kr(EU12, 6)}.",
               f"Sikkerhetsekvivalent: e<sup>{kr(EU12, 6)}</sup> = {kr(CE12)}.",
               f"{kr(W12)} − {kr(CE12)} = <b>kr {kr(maks12)}</b>."],
              [(f"Kr {kr(akt12)}", f"aktuarisk premie {pst(q12, 0)} × {kr(L12)}. Den betaler en risikonøytral, ikke Gaute."),
               (f"Kr {kr(g12_rot)}", f"√W brukt av gammel vane: sikkerhetsekvivalenten blir {kr(EUs12, 4)}² = "
                                     f"{kr(EUs12 ** 2)}. Med ln W er Gaute mer risikoavers og betaler mer."),
               (f"Kr {kr(g12_feilform)}", f"formuen i skadetilstanden satt til {kr(L12)}, som er tapet. Formuen etter "
                                          f"tapet er {kr(W12 - L12)}.")],
              f"Maksimal premie = aktuarisk premie + risikopremie: {kr(akt12)} + {kr(risiko12)} = {kr(maks12)}. ✓"))
pb = ledd("b", f"<p>Et selskap tilbyr full dekning for kr {kr(P12tilbud)}. Hvilket utsagn om den kritiske "
               "skadesannsynligheten er riktig?</p>",
          (f"Den er lavere enn {pst(q12, 0)}, fordi premien er lavere enn det Gaute høyst vil betale ved {pst(q12, 0)}",
           [pst(q12, 0), pst(q12, 0)]),
          [(f"Den er {pst(pstar_noyt, 3)}, for der er premien lik forventet erstatning", [pst(pstar_noyt, 3)]),
           ("For en person som er mer risikoavers enn Gaute, er den høyere", []),
           ("Er skadesannsynligheten høyere enn den kritiske, lønner det seg ikke for Gaute å kjøpe forsikringen", [])],
          begrep("Den kritiske sannsynligheten er den laveste sannsynligheten som gjør forsikringen lønnsom til en gitt premie "
                 f"(manualen 17.4). Ved {pst(q12, 0)} vil Gaute betale opptil kr {kr(maks12)}. Premien er kr "
                 f"{kr(P12tilbud)}. Han kjøper altså ved {pst(q12, 0)}, så terskelen må ligge under. Regnet ut er den "
                 f"{pst(pstar12)}.",
                 f"Terskelen ligger under {pst(q12, 0)}.",
                 [(f"{pst(pstar_noyt, 3)}", "terskelen for en risikonøytral. Gaute er risikoavers og kjøper allerede ved "
                                         "lavere sannsynlighet."),
                  ("Høyere for mer risikoaverse", "motsatt. Mer risikoaversjon gir høyere betalingsvilje og dermed lavere "
                                                  "terskel."),
                  ("Ikke lønnsomt over terskelen", "motsatt retning. Over terskelen lønner forsikringen seg, under gjør den "
                                                   "det ikke.")]))
EX.append(oppgave(12, "Gaute og hytta", "Forsikring og forventet nytte", [17], body12, [pa, pb]))

# ======================================================================= 13
print("\nOppgave 13: kostnader over 30 år")
B13, R13, fi13, fa13, T13 = 500_000, 0.07, 0.002, 0.016, 30
idx13 = B13 * (1 + R13 - fi13) ** T13
akt13 = B13 * (1 + R13 - fa13) ** T13
diff13 = idx13 - akt13
g13_lin = B13 * T13 * (fa13 - fi13)
g13_brutto = B13 * (1 + R13) ** T13 - akt13
g13_en = B13 * (1 + R13) ** T13 * (fa13 - fi13)
print(f"   indeks {idx13:.2f}, aktiv {akt13:.2f}, differanse {diff13:.2f}; gale {g13_lin}, {g13_brutto:.2f}, {g13_en:.2f}")
p = ledd("", f"<p>Liv setter kr {kr(B13)} i et aksjefond i {T13} år. Begge fondene hun vurderer, gir {pst(R13, 0)} i året "
             f"før honorar. Indeksfondet tar {pst(fi13, 1)} i året, det aktive fondet {pst(fa13, 1)}. Hvor mye mer har hun "
             f"etter {T13} år i indeksfondet? Rund av til nærmeste 1 000 kr.</p>",
         (f"Kr {kr(round(diff13, -3))}", [kr(round(diff13, -3))]),
         [(f"Kr {kr(round(g13_lin, -3))}", [kr(round(g13_lin, -3))]),
          (f"Kr {kr(round(g13_brutto, -3))}", [kr(round(g13_brutto, -3))]),
          (f"Kr {kr(round(g13_en, -3))}", [kr(round(g13_en, -3))])],
         sol("Honoraret trekkes hvert år og rammer derfor renters rente. Regn hvert fond med sin netto avkastning og trekk "
             "sluttverdiene fra hverandre (manualen 14.6).",
             [f"Indeksfond: {kr(B13)} × {kr(1 + R13 - fi13, 3)}<sup>{T13}</sup> = {kr(idx13)}.",
              f"Aktivt fond: {kr(B13)} × {kr(1 + R13 - fa13, 3)}<sup>{T13}</sup> = {kr(akt13)}.",
              f"Differanse {kr(diff13)} ≈ <b>kr {kr(round(diff13, -3))}</b>."],
             [(f"Kr {kr(round(g13_lin, -3))}", f"lineær regning: {pst(fa13 - fi13, 1)} × {T13} × {kr(B13)}."),
              (f"Kr {kr(round(g13_brutto, -3))}", f"indeksfondets eget honorar glemt: {pst(R13, 0)} i stedet for "
                                                  f"{pst(R13 - fi13, 1)}."),
              (f"Kr {kr(round(g13_en, -3))}", f"honorarforskjellen trukket én gang av sluttverdien, i stedet for hvert år.")],
             f"Det aktive fondet ender {pst(1 - akt13 / idx13, 1)} lavere: ({kr(1 + R13 - fa13, 3)}/"
             f"{kr(1 + R13 - fi13, 3)})<sup>{T13}</sup> = {kr(akt13 / idx13, 3)}. ✓"))
EX.append(oppgave(13, "Liv velger fond for 30 år", "Indeksfond og aktiv forvaltning", [14], "", [p]))

# ======================================================================= 14
print("\nOppgave 14: BSU nær taket")
tidl14, vil14, lonn14, aarstak14, tak14, sats14 = 280_000, 35_000, 610_000, 27_500, 300_000, 0.10
rom14 = min(vil14, aarstak14, tak14 - tidl14)
fr14 = sats14 * rom14
g14_aar = sats14 * min(vil14, aarstak14)
g14_uten = sats14 * vil14
g14_22 = 0.22 * rom14
assert lik(fr14, 2_000)
print(f"   rom {rom14}, fradrag {fr14}; gale {g14_aar}, {g14_uten}, {g14_22}")
p = ledd("", f"<p>Eskil er 29 år, eier ikke bolig og tjener kr {kr(lonn14)} i året. Han har til sammen satt inn kr "
             f"{kr(tidl14)} på BSU-kontoen sin tidligere år. I 2026 vil han sette inn kr {kr(vil14)}. Bruk skattereglene "
             "for 2026. Hvor stort skattefradrag kan han få for 2026?</p>",
         (f"Kr {kr(fr14)}", [kr(fr14)]),
         [(f"Kr {kr(g14_aar)}", [kr(g14_aar)]),
          (f"Kr {kr(g14_uten)}", [kr(g14_uten)]),
          (f"Kr {kr(g14_22)}", [kr(g14_22)])],
         sol("BSU gir skattefradrag på 10 % av årets sparing. Sparingen er begrenset til kr 27 500 i året og kr 300 000 til "
             "sammen. Fradraget gis til og med året du fyller 33 og bare til den som ikke eier bolig (manualen 15.6 og "
             "20.8).",
             [f"Plass under samlet tak: {kr(tak14)} − {kr(tidl14)} = {kr(tak14 - tidl14)}.",
              f"Det er mindre enn årstaket på {kr(aarstak14)}, så bare {kr(rom14)} gir fradrag.",
              f"10 % × {kr(rom14)} = <b>kr {kr(fr14)}</b>. Lønnen er støy."],
             [(f"Kr {kr(g14_aar)}", "bare årstaket brukt. Det samlede taket binder først."),
              (f"Kr {kr(g14_uten)}", f"begge takene glemt: 10 % av {kr(vil14)}."),
              (f"Kr {kr(g14_22)}", "22 % brukt, som om BSU var et fradrag i inntekten slik IPS er.")],
             f"Etter 2026 har han {kr(tidl14 + rom14)} på kontoen og kan ikke spare mer med fradrag. ✓"))
EX.append(oppgave(14, "Eskil og BSU-kontoen", "Sparing", [15], "", [p]))

# ======================================================================= 15
print("\nOppgave 15: fast eller flytende rente")
p = ledd("", "<p>Amund og Silje tar opp hvert sitt boliglån. Amund har lav belåningsgrad og god buffer. Silje har lånt så mye "
             "hun kan og har ingen buffer. Banken tilbyr fem års fastrente litt over dagens flytende rente. Hvilket utsagn er "
             "i tråd med pensum?</p>",
         ("Fast rente er en forsikring mot renteøkning som er mest verdt for Silje", []),
         [("Fast rente er et veddemål om renten og bør bare velges av den som tror den stiger mer enn banken venter", []),
          ("Siden fastrenten er høyere enn den flytende renten i dag, taper begge på å velge fast rente", []),
          ("Fast rente passer best for Amund, fordi han har god nok buffer til å betale forsikringspremien", [])],
         begrep("Fast rente er ikke noe som enten lønner seg eller ikke lønner seg. Det er en forsikring mot høyere rente "
                "(forelesningen om lån, lysbilde 25). Banken priser fastrenten ut fra markedets forventninger. Påslaget er "
                "forsikringspremien. Forsikringen er mest verdt for den som er mest sårbar for en renteøkning (manualen "
                "16.6).",
                "Fastrenten er mest verdt for Silje.",
                [("Veddemål", "nettopp det forelesningen sier at fast rente ikke er."),
                 ("Begge taper", "premien er prisen for visshet om terminbeløpet. Det er ikke et tap i seg selv, like lite som "
                                 "en forsikringspremie er det."),
                 ("Best for Amund", "Amund har allerede tryggheten. Han betaler for noe han ikke trenger.")]))
EX.append(oppgave(15, "Amund, Silje og fastrenten", "Lån", [16], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: tjenestepensjon ved jobbskifte")
p = ledd("", "<p>Torunn har jobbet ti år i en privat bedrift med innskuddspensjon. Nå begynner hun i en annen bedrift. Hvilket "
             "utsagn om pensjonen hun har tjent opp i den gamle jobben, er riktig?</p>",
         ("Den blir stående på egen pensjonskonto og fortsetter å vokse med avkastningen", []),
         [("Den blir en fripolise som gir henne en fast andel av sluttlønnen fra den gamle jobben", []),
          ("Den gamle arbeidsgiveren fortsetter å betale innskudd til den fram til hun går av med pensjon", []),
          ("Hun kan ta ut det hun har spart, som kontanter når hun slutter i jobben", [])],
         begrep("Når du slutter i en jobb, slutter også innbetalingene til pensjonsordningen der, men du tar med deg det som er "
                "spart. Fra 2021 har alle med innskuddspensjon en egen pensjonskonto. Det oppsparte blir stående der ved "
                "jobbskifte og vokser videre med avkastningen. Før 2021 ble det oppsparte gjort om til et "
                "pensjonskapitalbevis. Ytelsespensjon blir en fripolise (forelesningen om pensjon, lysbilde 22, manualen "
                "15.4).",
                "Egen pensjonskonto med videre avkastning er riktig.",
                [("Fripolise med fast andel", "det er det som skjer med ytelsespensjon. Torunn har innskuddspensjon."),
                 ("Arbeidsgiveren betaler videre", "innbetalingene stopper når hun slutter (lysbilde 22)."),
                 ("Ta ut kontant", "pensjonsmidlene er bundet til pensjonsalderen.")]))
EX.append(oppgave(16, "Torunn bytter jobb", "Pensjon", [15], "", [p]))

# ======================================================================= 17
print("\nOppgave 17: bias og støy")
p = ledd("", "<p>En bank lar ti rådgivere vurdere de samme tjue lånesøknadene hver for seg. I snitt treffer vurderingene godt, "
             "men to rådgivere gir ofte samme søker svært ulik rente. Hvilket utsagn er riktig?</p>",
         ("Dette er støy som dempes best med faste vurderingsskjemaer eller enkle modeller", []),
         [("Dette er en bias som rettes ved å justere alle vurderingene like mye i motsatt retning", []),
          ("Spredningen spiller ingen rolle så lenge snittet av vurderingene treffer riktig nivå", []),
          ("Dette er støy som forsvinner av seg selv når rådgiverne har fått lang nok erfaring", [])],
         begrep("Bias er en systematisk skjevhet i én retning. Støy er feil uten retning, altså spredning mellom vurderinger av "
                "det samme. Kahnemans forsikringsfunn var om lag 50 % uenighet der ledelsen ventet 10 %. Støy dempes med "
                "algoritmer, enkle modeller og strukturerte vurderinger (manualen 18.1, finansiell psykologi lysbilde 2–6).",
                "Støy, dempet med faste regler, er riktig.",
                [("Bias som justeres", "snittet treffer, så det finnes ingen retning å justere mot. En bias-regel virker ikke "
                                       "på støy."),
                 ("Spiller ingen rolle", "hver søker får en tilfeldig rente. Feilen er reell for den enkelte selv om snittet "
                                         "treffer."),
                 ("Forsvinner med erfaring", "Kahnemans saksbehandlere var erfarne fagfolk. Forelesningens råd er modeller "
                                             "og strukturerte vurderinger, ikke mer erfaring.")]))
EX.append(oppgave(17, "Rådgiverne i banken", "Finansiell psykologi", [18], "", [p]))

# ======================================================================= 18
print("\nOppgave 18: forbrukslån til én aksje")
p = ledd("", "<p>Joakim tar opp et forbrukslån til 14 % rente og kjøper aksjer i ett enkelt bilselskap som har steget kraftig "
             "de siste årene. «Du kommer ingen steder uten risiko», sier han. Hvilket utsagn er i tråd med forelesningen?</p>",
         ("Selskapsspesifikk risiko gir ingen forventet meravkastning, fordi den kan diversifiseres bort", []),
         [("Problemet er bare forbrukslånet. Med egne sparepenger er én enkelt aksje like god som et indeksfond", []),
          ("Risikoen er høy, men markedet betaler ham for den gjennom en tilsvarende høyere forventet avkastning", []),
          ("Lånet er uproblematisk så lenge aksjen har steget mer enn lånerenten de siste årene", [])],
         begrep("Markedet betaler bare for risiko som ikke kan diversifiseres bort. Den selskapsspesifikke risikoen kan fjernes "
                "med et indeksfond, så ingen betaler ham for den. I tillegg er forbrukslånet dyrt: det er ingen grunn til å tro "
                "på avkastning over renten på et slikt lån (forelesningen om aksjesparing, lysbilde 47–56).",
                "Selskapsrisikoen gir ingen betaling.",
                [("Bare forbrukslånet", "halve problemet. Også med egne penger bærer han selskapsrisiko som ingen betaler for. "
                                       "Et indeksfond fjerner den (lysbilde 48–50)."),
                 ("Markedet betaler for risikoen", "bare den systematiske risikoen betales (CAPM). Lotto er også risikabelt "
                                                   "uten å gi betaling."),
                 ("Uproblematisk etter sterk kursutvikling", "historisk kursutvikling i én aksje sier lite om framtiden. "
                                                             "Markedet har gitt 3–7 prosentpoeng over risikofri rente, ikke "
                                                             "14 %.")]))
EX.append(oppgave(18, "Joakim og forbrukslånet", "Porteføljevalg", [14, 18], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove7",
    "kind": "mock",
    "label": "Prøveeksamen 7",
    "badge": "Vanskeligere",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Vanskeligere enn prøveeksamen 1–6. Ligner H2025 og forelesning 1–5 i 2026. Dekker pensum de første seks prøveeksamenene ikke har testet: "
             "aksjonærmodellen og aksjesparekontoen, effektiv skatt for de rikeste, ulikhetsmålingen, aksjonærlån, "
             "formuesskatt på unoterte aksjer, bankinnskudd og inflasjon, bolig og folkelån, bosted, Merton med "
             "humankapital, forsikring, fondskostnader, BSU, lån, pensjon og finansiell psykologi. Teksten gir lite hjelp: ingen formler. Bare halvparten av regneleddene oppgir "
             "2026-satsene."),
    "facts": [
        "Fire timer, kalkulator tillatt. 30 flervalgsledd med fire alternativer og nøyaktig ett riktig.",
        "3 poeng for rett svar, −1 for feil svar og 0 for ubesvart. Totalt 90 poeng.",
        "Oppgave 1–10 er skattedelen (20 ledd). Oppgave 11–18 er finansdelen (10 ledd).",
        "Der det står «Bruk skattereglene for 2026», må du kunne satsen selv.",
        "Laget for trening etter mønster fra H2025, forelesningene i 2026 og manualen. Det er ikke en ekte eksamen. Kurset "
        "har ikke kontrollert løsningene.",
    ],
    "practiceNote": ("Regn ferdig før du ser på alternativene. Teksten sier aldri hvilken regel som gjelder. Hvert galt "
                     "alternativ er en bestemt feil. I begrepsleddene avgjør ett ord, så les «alltid», «aldri» og «eneste» "
                     "presist. Kan du stryke ett alternativ, lønner det seg å svare."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove7.json")
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
