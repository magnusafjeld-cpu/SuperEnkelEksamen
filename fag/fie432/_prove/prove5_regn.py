"""Prøveeksamen 5 (FIE432): regner alle tall og bygger prove5.json.

Kjør:  python3 -I prove5_regn.py

Skriptet regner hvert tall i spørsmål, riktig svar og gale alternativer, bygger
settet og skriver det til prove5.json i samme mappe. Til slutt sjekker det at
- riktig svar står på plassen fasitplanen (p5) sier
- hvert alternativ inneholder tallet skriptet har regnet
- teksten følger skrivereglene: ingen tankestrek (—), ingen komma foran «og»
- kalibreringen ligger i målet: 35–48 ord per ledd og 35–55 % ledd med tallsvar
  (målt som tools/sjekk-prove.js gjør)
"""
import json
import math
import re
import sys
from pathlib import Path

HER = Path(__file__).resolve().parent
PLAN = json.loads((HER / "fasitplan.json").read_text(encoding="utf8"))["p5"]


def kr(x, d=0):
    """Norsk tallformat: mellomrom som tusenskille, komma som desimaltegn."""
    neg = x < 0 and round(abs(x), d) != 0
    s = f"{abs(x):,.{d}f}".replace(",", " ").replace(".", ",")
    return ("−" if neg else "") + s


def pst(x, d=1):
    return kr(100 * x, d) + " %"


def P(*avsnitt):
    return "".join(f"<p>{a}</p>" for a in avsnitt)


def losning(regel, regn=None, gale=None, kontroll=None, strategi=None, ekstra=None):
    """Løsning i stilen fra h2022/h2025: Regelen, Regnestykket, Hvorfor de andre er gale, Kontroll."""
    ut = f"<p><b>Regelen.</b> {regel}</p>"
    if regn:
        ut += "<p><b>Regnestykket.</b></p><p>" + "<br>".join(regn) + "</p>"
    if ekstra:
        ut += ekstra
    if gale:
        ut += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(gale) + "</p>"
    if kontroll:
        ut += f"<p><b>Kontroll.</b> {kontroll}</p>"
    if strategi:
        ut += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    return ut


LEDD = []  # (ledd-dict, verdier per alternativ i rekkefølgen [riktig] + gale)


def ledd(body, riktig, gale, solution, verdier=None):
    """Riktig svar settes inn på plassen fasitplanen sier. `gale` står i ønsket rekkefølge.
    `verdier` er tallene skriptet har regnet, i rekkefølgen [riktig] + gale (None = ren tekst)."""
    i = len(LEDD)
    pos = PLAN[i]
    opts = list(gale)
    opts.insert(pos, riktig)
    v = list(verdier) if verdier else [None] * 4
    v_ord = v[1:]
    v_ord.insert(pos, v[0])
    d = {"body": body, "options": opts, "answer": pos, "solution": solution}
    LEDD.append((d, v_ord))
    print(f"  ledd {i + 1:2d}: fasit {'ABCD'[pos]}  riktig {riktig[:60]!r}")
    return d


OPPG = []


def oppg(title, topic, chapters, body, deler):
    n = len(OPPG) + 1
    if body is None:  # ett ledd: hele spørsmålet står i oppgaven
        (d,) = deler
        e = {"n": n, "title": title, "points": 3, "topic": topic, "chapters": chapters,
             "body": d["body"], "options": d["options"], "answer": d["answer"], "solution": d["solution"]}
    else:
        parts = []
        for k, d in enumerate(deler):
            parts.append({"label": "abcdefg"[k], "points": 3, "body": d["body"],
                          "options": d["options"], "answer": d["answer"], "solution": d["solution"]})
        e = {"n": n, "title": title, "points": 3 * len(parts), "topic": topic, "chapters": chapters,
             "body": body, "parts": parts}
    OPPG.append(e)


TE = 1.72 * 0.22  # effektiv eierskatt 37,84 %

# ======================================================================= SKATT
# ---------------------------------------------------------------- Oppgave 1
print("\nOppgave 1: skjerming over tre år (Vilde)")
K, r = 50_000, 0.03
utb = [1_000, 2_500, 3_000]
ub = 0.0
rad = []
for D in utb:
    S = K + ub
    fr = S * r
    samlet = fr + ub
    skpl = max(0.0, D - samlet)
    ub_ut = max(0.0, samlet - D)
    rad.append(dict(S=S, fr=fr, samlet=samlet, D=D, skpl=skpl, ub=ub_ut))
    print(f"   grunnlag {S:9.2f} årets {fr:8.2f} samlet {samlet:8.2f} utbytte {D:6} skpl {skpl:8.2f} ubenyttet {ub_ut:8.2f}")
    ub = ub_ut
ub1 = rad[0]["ub"]
assert ub1 == 500
a_forrentet = ub1 * (1 + r)                       # resten forrentet allerede i år 1
skpl2 = rad[1]["skpl"]
assert abs(skpl2 - 485) < 1e-9
b_bare_grunnlag = 2_500 - rad[1]["fr"]            # lagt til grunnlaget, ikke trukket fra
b_glemt = 2_500 - K * r                            # glemt helt
b_bare_trekk = 2_500 - K * r - ub1                 # trukket fra, ikke lagt til grunnlaget
skatt3 = rad[2]["skpl"] * TE
c_gammelt_grunnlag = (3_000 - (K + ub1) * r) * TE  # grunnlaget fra år 2 brukt på nytt
c_dobbel = (3_000 - (K + ub1) * r - ub1) * TE      # resten fra år 1 brukt to ganger
c_uten_oppj = rad[2]["skpl"] * 0.22
c_begge = (3_000 - (K + ub1) * r) * 0.22         # gammelt grunnlag og glemt oppjustering
print(f"   a {ub1} (forrentet {a_forrentet})  b {skpl2} ({b_bare_grunnlag}, {b_glemt}, {b_bare_trekk})")
print(f"   c {skatt3:.4f} (gammelt grunnlag {c_gammelt_grunnlag:.4f}, dobbel {c_dobbel:.4f}, uten oppj {c_uten_oppj:.4f})")
kontroll_samlet2 = ub1 * (1 + r) + K * r
assert abs(kontroll_samlet2 - rad[1]["samlet"]) < 1e-9

o1_body = P("Vilde kjøpte i januar år 1 én aksje i Havørn ASA for kr 50 000. Hun eier aksjen ved utgangen av "
            "år 1, år 2 og år 3. Skjermingsrenten er 3 % i alle årene. Hun mottar kr 1 000 i utbytte i år 1, "
            "kr 2 500 i år 2 og kr 3 000 i år 3. Med skattepliktig utbytte menes beløpet før oppjustering.")
l1a = ledd(
    P("Hvor stor ubenyttet skjerming framfører Vilde fra år 1 til år 2?"),
    f"Kr {kr(ub1)}", [f"Kr {kr(rad[0]['fr'])}", f"Kr {kr(a_forrentet)}", f"Kr {kr(utb[0])}"],
    losning(
        "Årets skjermingsfradrag er skjermingsgrunnlaget ganget med skjermingsrenten. Grunnlaget i år 1 er "
        "kostprisen. Er fradraget større enn utbyttet, framføres resten som ubenyttet skjerming. Skattepliktig "
        "utbytte kan ikke bli negativt.",
        ["1. Skjermingsfradrag i år 1: 50 000 × 3 % = kr 1 500.",
         "2. Skattepliktig utbytte: maks(0; 1 000 − 1 500) = kr 0.",
         "3. Ubenyttet skjerming: 1 500 − 1 000 = <b>kr 500</b>."],
        ["<b>Kr 1 500</b> = årets skjermingsfradrag, et mellomtall. Utbyttet har brukt opp 1 000 av det.",
         f"<b>Kr {kr(a_forrentet)}</b> = resten forrentet med 3 %. Rentetillegget kommer først i år 2, når resten "
         "legges til grunnlaget. Det hører til fradraget for år 2.",
         "<b>Kr 1 000</b> = utbyttet, ikke fradraget som ble til overs."],
        "Brukt skjerming pluss ubenyttet skjerming skal være lik årets fradrag: 1 000 + 500 = 1 500. ✓"),
    [kr(ub1), kr(rad[0]["fr"]), kr(a_forrentet), kr(utb[0])])
l1b = ledd(
    P("Hva er skattepliktig utbytte i år 2?"),
    f"Kr {kr(skpl2)}", [f"Kr {kr(b_bare_grunnlag)}", f"Kr {kr(b_glemt)}", f"Kr {kr(b_bare_trekk)}"],
    losning(
        "Ubenyttet skjerming virker to ganger året etter. Den legges til skjermingsgrunnlaget. I tillegg trekkes "
        "den fra utbyttet sammen med årets fradrag.",
        ["1. Grunnlag i år 2: 50 000 + 500 = kr 50 500.",
         "2. Årets fradrag: 50 500 × 3 % = kr 1 515. Samlet fradrag: 1 515 + 500 = kr 2 015.",
         "3. Skattepliktig utbytte: 2 500 − 2 015 = <b>kr 485</b>."],
        [f"<b>Kr {kr(b_bare_grunnlag)}</b> = 2 500 − 1 515: resten lagt til grunnlaget, men ikke trukket fra.",
         f"<b>Kr {kr(b_glemt)}</b> = 2 500 − 1 500: resten fra år 1 glemt helt.",
         f"<b>Kr {kr(b_bare_trekk)}</b> = 2 500 − 1 500 − 500: resten trukket fra, men ikke lagt til grunnlaget. "
         "Årets fradrag ble da 15 kroner for lavt."],
        "Resten forrenter seg: 500 × 1,03 + 50 000 × 3 % = 515 + 1 500 = 2 015. ✓ Utbytte minus samlet fradrag: "
        "2 500 − 2 015 = 485.",
        "Alle de gale alternativene er samme regnestykke med ett ledd for mye eller for lite. Skriv grunnlag, "
        "årets fradrag og framført rest på hver sin linje før du trekker fra."),
    [kr(skpl2), kr(b_bare_grunnlag), kr(b_glemt), kr(b_bare_trekk)])
l1c = ledd(
    P("Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Hvor mye betaler Vilde i skatt på utbyttet i år 3? "
      "Svar med to desimaler."),
    f"Kr {kr(skatt3, 2)}", [f"Kr {kr(c_begge, 2)}", f"Kr {kr(c_uten_oppj, 2)}", f"Kr {kr(c_gammelt_grunnlag, 2)}"],
    losning(
        "Når den framførte resten er brukt opp, faller skjermingsgrunnlaget tilbake til kostprisen. Skatten er "
        "skattepliktig utbytte × 1,72 × 22 % = skattepliktig utbytte × 37,84 %.",
        ["1. Ubenyttet skjerming etter år 2 er 0, så grunnlaget i år 3 er kr 50 000.",
         "2. Fradrag: 50 000 × 3 % = 1 500. Skattepliktig utbytte: 3 000 − 1 500 = kr 1 500.",
         f"3. Skatt: 1 500 × 1,72 × 22 % = 1 500 × 37,84 % = <b>kr {kr(skatt3, 2)}</b>."],
        [f"<b>Kr {kr(c_gammelt_grunnlag, 2)}</b> = (3 000 − 1 515) × 37,84 %: grunnlaget på 50 500 fra år 2 brukt "
         "på nytt. Resten fra år 1 ble brukt opp i år 2 og løfter ikke grunnlaget lenger.",
         f"<b>Kr {kr(c_begge, 2)}</b> = (3 000 − 1 515) × 22 %: begge feilene på en gang, gammelt grunnlag og glemt "
         "oppjustering.",
         f"<b>Kr {kr(c_uten_oppj, 2)}</b> = 1 500 × 22 %: oppjusteringen glemt."],
        f"Regn begge veier: 1 500 × 1,72 = 2 580 og 2 580 × 22 % = {kr(skatt3, 2)}. ✓",
        f"Et svar uten oppjustering er alltid 22/37,84 = 58 % av det riktige: {kr(c_uten_oppj, 2)}/{kr(skatt3, 2)} "
        f"= {kr(c_uten_oppj / skatt3, 2)}. Alternativene dekker de fire kombinasjonene av grunnlag (1 500 eller 1 485) "
        "og sats (37,84 % eller 22 %). Avgjør grunnlaget og satsen hver for seg."),
    [kr(skatt3, 2), kr(c_begge, 2), kr(c_uten_oppj, 2), kr(c_gammelt_grunnlag, 2)])
oppg("Skjerming over tre år", "Skjerming", [5], o1_body, [l1a, l1b, l1c])

# ---------------------------------------------------------------- Oppgave 2
print("\nOppgave 2: gevinst mindre enn ubenyttet skjerming (Aksel)")
kost, salg, ubs = 30_000, 31_000, 1_800
gev = salg - kost
skpl_gev = max(0, gev - ubs)
skatt_gev = skpl_gev * TE
g_tap = (gev - ubs) * TE
g_glemt = gev * TE
g_tap22 = (gev - ubs) * 0.22
print(f"   gevinst {gev}, skattepliktig {skpl_gev}, skatt {skatt_gev}; tap {g_tap:.2f}, glemt {g_glemt:.2f}, tap22 {g_tap22:.2f}")
assert skatt_gev == 0
l2 = ledd(
    P("Aksel kjøpte en aksje i Nordlys Solar ASA for kr 30 000. Selskapet har aldri betalt utbytte, så Aksel har "
      "til sammen kr 1 800 i ubenyttet skjerming. I november år 4 selger han aksjen for kr 31 000. Eierskatten er "
      "22 % og oppjusteringsfaktoren 1,72. Aksel har nok annen inntekt til å bruke et eventuelt fradrag. Hvor mye "
      "skatt betaler han på salget? Et negativt beløp betyr at salget gir et fradrag som senker skatten hans."),
    "Kr 0", [f"Kr {kr(g_tap, 2)}", f"Kr {kr(g_glemt, 2)}", f"Kr {kr(g_tap22, 2)}"],
    losning(
        "Ubenyttet skjerming trekkes fra gevinsten ved salg. Den kan redusere gevinsten til null, men den kan verken "
        "skape eller øke et fradragsberettiget tap. Det som ikke blir brukt, faller bort. Selges aksjen før "
        "årsskiftet, gis det heller ingen ny skjerming for salgsåret.",
        ["1. Gevinst før skjerming: 31 000 − 30 000 = kr 1 000.",
         "2. Skattepliktig gevinst: maks(0; 1 000 − 1 800) = kr 0.",
         "3. Skatt: 0 × 37,84 % = <b>kr 0</b>. De resterende 1 800 − 1 000 = kr 800 i skjerming faller bort."],
        [f"<b>Kr {kr(g_tap, 2)}</b> = (1 000 − 1 800) × 37,84 %: skjermingen brukt til å lage et tap. Det er ikke lov.",
         f"<b>Kr {kr(g_glemt, 2)}</b> = 1 000 × 37,84 %: skjermingen glemt.",
         f"<b>Kr {kr(g_tap22, 2)}</b> = −800 × 22 %: samme feil som {kr(g_tap, 2)}, i tillegg uten oppjustering."],
        f"Hadde Aksel solgt for kr 29 000, ville han hatt et ekte tap på 1 000 og fått et fradrag verdt "
        f"1 000 × 37,84 % = kr {kr(1_000 * TE, 2)}. Et ekte tap gir fradrag. Skjermingen kan bare spise opp en "
        "gevinst. Det er asymmetrien Bjerksund og Schjelderup peker på: staten deler oppsiden fullt, men nedsiden "
        "bare delvis.",
        "De to negative alternativene bygger på samme misforståelse. Vet du at skjermingen ikke kan skape et tap, "
        "står du igjen med to alternativer. Da lønner det seg å svare."),
    ["0", kr(g_tap, 2), kr(g_glemt, 2), kr(g_tap22, 2)])
oppg("Salg av aksje med ubenyttet skjerming", "Aksjonærmodellen", [5], None, [l2])

# ---------------------------------------------------------------- Oppgave 3
print("\nOppgave 3: utgiftsføre nå eller avskrive over tre år")
kost3, aar, rente, t = 150_000, 3, 0.08, 0.22
spar_naa = kost3 * t
arlig = kost3 / aar * t
af = (1 - (1 + rente) ** -aar) / rente
nv_avskr = arlig * af
diff3 = spar_naa - nv_avskr
af_forskudd = sum((1 + rente) ** -k for k in range(aar))
diff_forskudd = spar_naa - arlig * af_forskudd
diff_fradrag = kost3 - kost3 / aar * af
aarvis = [arlig / (1 + rente) ** k for k in (1, 2, 3)]
print(f"   nå {spar_naa}, årlig {arlig}, AF {af:.6f}, NV {nv_avskr:.2f}, diff {diff3:.2f}; forskudd {diff_forskudd:.2f}; fradrag {diff_fradrag:.2f}")
print(f"   år for år {[round(x, 2) for x in aarvis]}  sum {sum(aarvis):.2f}; fradrag × 22 % = {diff_fradrag * t:.2f}")
assert abs(diff_fradrag * t - diff3) < 1e-6
l3 = ledd(
    P("Solveig Regnskap AS kjøper datautstyr for kr 150 000. Anta at selskapet kan velge mellom å utgiftsføre hele "
      "beløpet i år eller å avskrive kr 50 000 i året over tre år. Ved utgiftsføring kommer skattebesparelsen i dag. "
      "Ved avskrivning kommer besparelsene ved utgangen av år 1, 2 og 3. Selskapet har nok overskudd til å bruke "
      "fradragene. Selskapsskatten er 22 % og selskapet diskonterer med 8 %. Hvor mye mer er det verdt i nåverdi å "
      "utgiftsføre alt i år? Rund av til nærmeste krone."),
    f"Kr {kr(diff3)}", [f"Kr {kr(diff_fradrag)}", "Kr 0", f"Kr {kr(diff_forskudd)}"],
    losning(
        "Et fradrag er verdt fradraget ganget med skattesatsen, men i nåverdi. Samme sum i kroner er mer verdt jo "
        "tidligere den kommer. Ta fradraget så tidlig du kan, så lenge du har inntekt å trekke det fra.",
        [f"1. Utgiftsføring: 150 000 × 22 % = kr {kr(spar_naa)} i dag.",
         f"2. Avskrivning: 50 000 × 22 % = kr {kr(arlig)} i året i tre år. Annuitetsfaktoren er "
         f"(1 − 1,08<sup>−3</sup>)/0,08 = {kr(af, 4)}, så nåverdien er {kr(arlig)} × {kr(af, 4)} = kr {kr(nv_avskr)}.",
         f"3. Forskjell: {kr(spar_naa)} − {kr(nv_avskr)} = <b>kr {kr(diff3)}</b>."],
        ["<b>Kr 0</b> = kroner sammenlignet i stedet for nåverdier. Begge valgene gir 33 000 til sammen. Det er "
         "bare riktig hvis renten er null.",
         f"<b>Kr {kr(diff_forskudd)}</b> = den første besparelsen regnet som om den kommer i dag: "
         f"{kr(arlig)} × (1 + 1/1,08 + 1/1,08²) = {kr(arlig * af_forskudd)}. Teksten sier at besparelsene kommer ved "
         "utgangen av hvert år.",
         f"<b>Kr {kr(diff_fradrag)}</b> = nåverdien av fradragene, ikke av skatten: 150 000 − 50 000 × {kr(af, 4)}. "
         "Du har glemt å gange med 22 %."],
        f"Regn år for år: {kr(arlig)}/1,08 = {kr(aarvis[0])}, {kr(arlig)}/1,08² = {kr(aarvis[1])} og "
        f"{kr(arlig)}/1,08³ = {kr(aarvis[2])}. Sum {kr(sum(aarvis))}. ✓ Fradragsfeilen er nøyaktig riktig svar "
        f"delt på 22 %: {kr(diff_fradrag)} × 22 % = {kr(diff3)}.",
        "«Det spiller ingen rolle» er bare riktig med null rente. Med positiv rente og nok inntekt å trekke fra kan "
        "du stryke det med en gang."),
    [kr(diff3), kr(diff_fradrag), "0", kr(diff_forskudd)])
oppg("Utgiftsføre nå eller avskrive over tre år", "Fradragets tidsverdi", [2], None, [l3])

# ---------------------------------------------------------------- Oppgave 4
print("\nOppgave 4: bunnfradrag og progressivitet")
sats, B = 0.25, 100_000
Y = {"Live": 200_000, "Gunnar": 600_000}
T = {k: (y - B) * sats for k, y in Y.items()}
gs = {k: T[k] / Y[k] for k in Y}
proveny = sum(T.values())
ny_sats = proveny / sum(Y.values())
ny_T = {k: y * ny_sats for k, y in Y.items()}
endr = {k: ny_T[k] - T[k] for k in Y}
print(f"   skatt {T}, gjsn {gs}; proveny {proveny}, ny sats {ny_sats}, ny skatt {ny_T}, endring {endr}")
assert abs(ny_sats - 0.1875) < 1e-12
o4_body = P("I landet Fjellia betaler alle 25 % skatt av inntekten over et bunnfradrag på kr 100 000. Live har en "
            "inntekt på kr 200 000 og Gunnar en inntekt på kr 600 000. Gjennomsnittsskatten er skatten delt på hele "
            "inntekten.")
l4a = ledd(
    P("Hvilket utsagn om skattesystemet i Fjellia er riktig?"),
    f"Progressivt, fordi gjennomsnittsskatten er {pst(gs['Live'])} for Live og {pst(gs['Gunnar'])} for Gunnar.",
    ["Proporsjonalt, fordi marginalskatten er 25 % både for Live og for Gunnar.",
     "Regressivt, fordi Live og Gunnar får nøyaktig like stort bunnfradrag målt i kroner.",
     "Progressivt, fordi marginalskatten er høyere for Gunnar enn for Live."],
    losning(
        "Et system er progressivt når gjennomsnittsskatten stiger med inntekten. Med flat sats t og bunnfradrag B er "
        "gjennomsnittsskatten t(1 − B/Y), som stiger med Y. Marginalskatten avgjør ikke progressiviteten.",
        [f"1. Live: (200 000 − 100 000) × 25 % = {kr(T['Live'])}, altså {kr(T['Live'])}/200 000 = {pst(gs['Live'])}.",
         f"2. Gunnar: (600 000 − 100 000) × 25 % = {kr(T['Gunnar'])}, altså {kr(T['Gunnar'])}/600 000 = "
         f"<b>{pst(gs['Gunnar'])}</b>.",
         "3. Gjennomsnittsskatten stiger med inntekten, så systemet er <b>progressivt</b>."],
        ["<b>«Marginalskatten er 25 % for begge»</b> er sant, men marginalskatten avgjør ikke om systemet er "
         "progressivt. Det gjør gjennomsnittsskatten.",
         "<b>«Like stort bunnfradrag i kroner»</b> er nettopp det som gjør systemet progressivt: fradraget er en "
         "større andel av en liten inntekt.",
         "<b>«Progressivt, fordi marginalskatten er høyere for Gunnar»</b>: riktig konklusjon, gal begrunnelse. "
         "Marginalskatten er 25 % for begge. Progressiviteten kommer av at gjennomsnittsskatten stiger."],
        f"Formelen t(1 − B/Y): 25 % × (1 − 100/200) = {pst(gs['Live'])} og 25 % × (1 − 100/600) = {pst(gs['Gunnar'])}. ✓"),
    [pst(gs["Live"]), None, None, None])
l4b = ledd(
    P("Regjeringen fjerner bunnfradraget og setter satsen slik at Live og Gunnar til sammen betaler like mye skatt "
      "som før. Hvilket utsagn er riktig?"),
    f"Satsen blir {pst(ny_sats, 2)} og systemet blir proporsjonalt. Live betaler kr {kr(endr['Live'])} mer enn før.",
    [f"Satsen blir {pst(ny_sats, 2)} og systemet er fortsatt progressivt, fordi Gunnar betaler flest kroner.",
     f"Satsen blir {pst(ny_sats, 2)} og systemet blir regressivt, fordi Gunnar betaler kr {kr(-endr['Gunnar'])} "
     "mindre enn før.",
     f"Satsen blir {pst(ny_sats, 2)} og systemet blir proporsjonalt. Gunnar betaler kr {kr(-endr['Gunnar'])} mer enn før."],
    losning(
        "Uten bunnfradrag er skatten T = tY. Gjennomsnittsskatten T/Y = t er da lik for alle. Systemet er "
        "proporsjonalt, altså verken progressivt eller regressivt. Fjernes fradraget med uendret proveny, flyttes "
        "skatt fra høye til lave inntekter.",
        [f"1. Proveny før: {kr(T['Live'])} + {kr(T['Gunnar'])} = kr {kr(proveny)}.",
         f"2. Ny sats: {kr(proveny)}/(200 000 + 600 000) = <b>{pst(ny_sats, 2)}</b>.",
         f"3. Live betaler 200 000 × {pst(ny_sats, 2)} = {kr(ny_T['Live'])}, altså <b>kr {kr(endr['Live'])} mer</b>. "
         f"Gunnar betaler 600 000 × {pst(ny_sats, 2)} = {kr(ny_T['Gunnar'])}, altså kr {kr(-endr['Gunnar'])} mindre."],
        ["<b>«Fortsatt progressivt fordi Gunnar betaler flest kroner»</b> blander kroner og andel. Progressivitet "
         f"måles med gjennomsnittsskatten. Den er {pst(ny_sats, 2)} for begge.",
         "<b>«Regressivt»</b> krever at gjennomsnittsskatten faller med inntekten. Den er lik for begge. At Gunnar "
         "betaler mindre enn før, gjør ikke systemet regressivt.",
         "<b>«Gunnar betaler kr 12 500 mer»</b> har fortegnet snudd. Fradraget var verdt mest i forhold til inntekten "
         "for Live, mens satskuttet er verdt mest for Gunnar. Derfor er det Live som betaler mer."],
        f"{kr(ny_T['Live'])} + {kr(ny_T['Gunnar'])} = {kr(sum(ny_T.values()))}. ✓ Provenyet er uendret."),
    [kr(endr["Live"]), None, kr(-endr["Gunnar"]), kr(-endr["Gunnar"])])
oppg("Bunnfradrag og progressivitet", "Progressivitet", [1, 10], o4_body, [l4a, l4b])

# ---------------------------------------------------------------- Oppgave 5
print("\nOppgave 5: gjennomsnittsskatt i et trinnsystem")
trinn = [(0, 80_000, 0.0), (80_000, 600_000, 0.22), (600_000, math.inf, 0.38)]


def trinnskatt(y):
    return sum(max(0, min(y, hi) - lo) * s for lo, hi, s in trinn)


yR, yP = 500_000, 900_000
sR, sP = trinnskatt(yR), trinnskatt(yP)
gR, gP = sR / yR, sP / yP
topp_P = (yP - 80_000) * 0.38 / yP
nev_R, nev_P = sR / (yR - 80_000), sP / (yP - 80_000)
print(f"   Ronja {sR} → {gR:.4f}; Petter {sP} → {gP:.4f}; topp {topp_P:.4f}; nevner {nev_R:.4f}/{nev_P:.4f}")
l5 = ledd(
    P("I landet Sørvik er inntekt opp til kr 80 000 skattefri. Inntekt mellom kr 80 000 og kr 600 000 skattlegges "
      "med 22 %. Inntekt over kr 600 000 skattlegges med 38 %. Ronja har en inntekt på kr 500 000 og Petter en "
      "inntekt på kr 900 000. Hva er gjennomsnittsskatten til Ronja og Petter? Rund av til én desimal."),
    f"Ronja {pst(gR)} og Petter {pst(gP)}",
    ["Ronja 22,0 % og Petter 38,0 %", f"Ronja {pst(gR)} og Petter {pst(topp_P)}",
     f"Ronja {pst(nev_R)} og Petter {pst(nev_P)}"],
    losning(
        "I et trinnsystem gjelder hver sats bare for inntekten innenfor sitt trinn. Gjennomsnittsskatten er samlet "
        "skatt delt på hele inntekten.",
        [f"1. Ronja: (500 000 − 80 000) × 22 % = {kr(sR)}, altså {kr(sR)}/500 000 = <b>{pst(gR)}</b>.",
         f"2. Petter: (600 000 − 80 000) × 22 % = {kr(trinnskatt(600_000))} og (900 000 − 600 000) × 38 % = "
         f"{kr(sP - trinnskatt(600_000))}. Samlet {kr(sP)}.",
         f"3. Petter: {kr(sP)}/900 000 = <b>{pst(gP)}</b>."],
        ["<b>22,0 % og 38,0 %</b> = marginalskatten, altså satsen på den siste kronen.",
         f"<b>{pst(gR)} og {pst(topp_P)}</b> = Petters høyeste sats brukt på all inntekt over 80 000: "
         f"820 000 × 38 % = {kr((yP - 80_000) * 0.38)}.",
         f"<b>{pst(nev_R)} og {pst(nev_P)}</b> = skatten delt på inntekten over 80 000 i stedet for hele inntekten: "
         f"{kr(sR)}/420 000 og {kr(sP)}/820 000."],
        f"Gjennomsnittsskatten må ligge under marginalskatten for begge: {pst(gR)} er under 22 % og {pst(gP)} er "
        "under 38 %. ✓",
        "Når de første kronene er skattefrie, er gjennomsnittsskatten alltid lavere enn marginalskatten. "
        "Alternativet med marginalsatsene kan strykes med en gang."),
    [pst(gP), "38,0 %", pst(topp_P), pst(nev_P)])
oppg("Gjennomsnittsskatt i et trinnsystem", "Progressivitet", [1], None, [l5])

# ---------------------------------------------------------------- Oppgave 6
print("\nOppgave 6: formuesskatt med gjeldsreduksjon (Fredrik)")
BV = {"sekundærbolig": 4_000_000, "aksjer": 3_000_000, "næringseiendom": 2_000_000, "bank": 1_000_000}
rabatt = {"sekundærbolig": 0.0, "aksjer": 0.20, "næringseiendom": 0.20, "bank": 0.0}
G, bunn, fsats = 5_000_000, 1_900_000, 0.01
sumBV = sum(BV.values())
FV = {k: v * (1 - rabatt[k]) for k, v in BV.items()}
sumFV = sum(FV.values())
gjeld = {k: G * v / sumBV for k, v in BV.items()}
red = sum(gjeld[k] * rabatt[k] for k in BV)
red_aksjer = gjeld["aksjer"] * rabatt["aksjer"]
red_fv = sum(G * FV[k] / sumFV * rabatt[k] for k in BV)
red_alt = G * 0.20
netto = sumFV - (G - red)
fskatt = (netto - bunn) * fsats
f_ingen = (sumFV - G - bunn) * fsats
f_aksjer = (sumFV - (G - red_aksjer) - bunn) * fsats
f_fv = (sumFV - (G - red_fv) - bunn) * fsats
print(f"   FV {sumFV:,.0f}; reduksjon {red:,.0f} (aksjer {red_aksjer:,.0f}, FV-fordelt {red_fv:,.2f}, alt {red_alt:,.0f})")
print(f"   netto {netto:,.0f}; skatt {fskatt:,.2f} (ingen {f_ingen:,.0f}, aksjer {f_aksjer:,.0f}, FV {f_fv:,.2f})")
pr_aktivum = {k: FV[k] - gjeld[k] * (1 - rabatt[k]) for k in BV}
assert abs(sum(pr_aktivum.values()) - netto) < 1e-6
o6_body = P("Fredrik er enslig. Ved utgangen av 2026 eier han en sekundærbolig verdt kr 4 000 000, børsnoterte aksjer "
            "verdt kr 3 000 000, en næringseiendom verdt kr 2 000 000 og kr 1 000 000 i bank. Han har kr 5 000 000 i "
            "gjeld. Aksjer og næringseiendom verdsettes til 80 %. Sekundærbolig og bankinnskudd verdsettes til 100 %. "
            "Gjelden fordeles forholdsmessig etter markedsverdi og reduseres der loven krever det.")
l6a = ledd(
    P("Hvor mye skal gjelden reduseres med?"),
    f"Kr {kr(red)}", [f"Kr {kr(red_aksjer)}", f"Kr {kr(red_alt)}", f"Kr {kr(red_fv)}"],
    losning(
        "Gjelden fordeles etter markedsverdi. Den delen som faller på et aktivum med verdsettingsrabatt, reduseres "
        "med samme rabatt. Det gjelder aksjer, aksjefond, næringseiendom og driftsmidler, men ikke primærbolig. "
        "Sekundærbolig og bankinnskudd har ingen rabatt og gir ingen reduksjon.",
        ["1. Andeler av markedsverdien på kr 10 000 000: sekundærbolig 40 %, aksjer 30 %, næringseiendom 20 % og "
         "bank 10 %.",
         f"2. Gjeld på aksjene: 5 000 000 × 30 % = {kr(gjeld['aksjer'])}. Gjeld på næringseiendommen: "
         f"5 000 000 × 20 % = {kr(gjeld['næringseiendom'])}.",
         f"3. Reduksjon: ({kr(gjeld['aksjer'])} + {kr(gjeld['næringseiendom'])}) × 20 % = <b>kr {kr(red)}</b>."],
        [f"<b>Kr {kr(red_aksjer)}</b> = bare aksjegjelden redusert. Næringseiendom har også 20 % rabatt og gir "
         "reduksjon.",
         f"<b>Kr {kr(red_fv)}</b> = gjelden fordelt etter formuesverdi ({kr(sumFV)}) i stedet for markedsverdi: "
         f"5 000 000 × 4 000 000/9 000 000 × 20 %.",
         f"<b>Kr {kr(red_alt)}</b> = 20 % av hele gjelden. Gjelden på sekundærboligen og banken skal ikke reduseres."],
        "Kortformen: reduksjon = G × Σ(markedsverdi × rabatt)/Σ markedsverdi = 5 000 000 × (600 000 + 400 000)/"
        f"10 000 000 = 5 000 000 × 10 % = {kr(red)}. ✓"),
    [kr(red), kr(red_aksjer), kr(red_alt), kr(red_fv)])
l6b = ledd(
    P("Hvor mye betaler Fredrik i formuesskatt for 2026? Satsen er 1,0 % av nettoformuen over bunnfradraget på "
      "kr 1 900 000."),
    f"Kr {kr(fskatt)}", [f"Kr {kr(f_fv)}", f"Kr {kr(f_ingen)}", f"Kr {kr(f_aksjer)}"],
    losning(
        "Nettoformue = formuesverdier etter rabatt − fradragsberettiget gjeld. Skatten er 1,0 % av det som "
        "overstiger bunnfradraget.",
        [f"1. Formuesverdi: 4 000 000 + 3 000 000 × 80 % + 2 000 000 × 80 % + 1 000 000 = kr {kr(sumFV)}.",
         f"2. Fradragsberettiget gjeld: 5 000 000 − {kr(red)} = {kr(G - red)}. Nettoformue: "
         f"{kr(sumFV)} − {kr(G - red)} = kr {kr(netto)}.",
         f"3. Formuesskatt: ({kr(netto)} − 1 900 000) × 1,0 % = <b>kr {kr(fskatt)}</b>."],
        [f"<b>Kr {kr(f_ingen)}</b> = ingen gjeldsreduksjon: (9 000 000 − 5 000 000 − 1 900 000) × 1 %.",
         f"<b>Kr {kr(f_aksjer)}</b> = bare aksjegjelden redusert, feilen fra a: "
         f"(9 000 000 − {kr(G - red_aksjer)} − 1 900 000) × 1 %.",
         f"<b>Kr {kr(f_fv)}</b> = gjelden fordelt etter formuesverdi: "
         f"(9 000 000 − {kr(G - red_fv)} − 1 900 000) × 1 %."],
        "Regn per aktivum (formuesverdi minus fradragsberettiget gjeld): sekundærbolig "
        f"{kr(FV['sekundærbolig'])} − {kr(gjeld['sekundærbolig'])} = {kr(pr_aktivum['sekundærbolig'])}, aksjer "
        f"{kr(FV['aksjer'])} − {kr(gjeld['aksjer'] * 0.8)} = {kr(pr_aktivum['aksjer'])}, næringseiendom "
        f"{kr(FV['næringseiendom'])} − {kr(gjeld['næringseiendom'] * 0.8)} = {kr(pr_aktivum['næringseiendom'])} og bank "
        f"{kr(FV['bank'])} − {kr(gjeld['bank'])} = {kr(pr_aktivum['bank'])}. Sum {kr(netto)}. ✓",
        f"Gjeldsreduksjonen øker alltid nettoformuen. Riktig svar må derfor ligge over kr {kr(f_ingen)}, som er "
        "svaret uten reduksjon."),
    [kr(fskatt), kr(f_fv), kr(f_ingen), kr(f_aksjer)])
oppg("Formuesskatt med gjeldsreduksjon", "Formuesskatt", [7], o6_body, [l6a, l6b])

# ---------------------------------------------------------------- Oppgave 7
print("\nOppgave 7: utbytte til formuesskatten når skjermingen hjelper (Astrid)")
FVa, fsa, kost7, rs7, te7 = 12_000_000, 0.01, 2_000_000, 0.03, 0.40
F7 = FVa * fsa
S7 = kost7 * rs7
D7 = (F7 - te7 * S7) / (1 - te7)
d_glemt = F7 / (1 - te7)
d_oppaa = F7 + te7 * (F7 - S7)
d_krone = d_glemt - S7
netto_oppaa = d_oppaa - te7 * (d_oppaa - S7)
print(f"   F {F7}, S {S7}, D {D7}; glemt {d_glemt:.2f}, oppå {d_oppaa}, krone {d_krone:.2f}; oppå gir netto {netto_oppaa}")
assert abs(D7 - te7 * (D7 - S7) - F7) < 1e-6
l7 = ledd(
    P("Astrid eier alle aksjene i Bergtind AS. Aksjenes formuesverdi etter rabatt er kr 12 000 000. Hun har ingen "
      "annen formue, ingen gjeld og ingen kontanter. Hun må derfor ta utbytte fra selskapet for å betale "
      "formuesskatten på 1,0 %. Se bort fra bunnfradraget. Aksjene har kostpris kr 2 000 000, skjermingsrenten er "
      "3 % og hun har ingen ubenyttet skjerming fra før. Anta at eierskatten er 40 %. Hvor stort utbytte må hun ta "
      "for å ha nøyaktig nok til formuesskatten etter at skatten på utbyttet er betalt?"),
    f"Kr {kr(D7)}", [f"Kr {kr(d_glemt)}", f"Kr {kr(d_oppaa)}", f"Kr {kr(d_krone)}"],
    losning(
        "Utbyttet D må dekke formuesskatten F etter eierskatt. Skjermingsfradraget S tar en del av utbyttet ut av "
        "skattegrunnlaget: D − 40 % × (D − S) = F, som gir D = (F − 40 % × S)/(1 − 40 %).",
        [f"1. Formuesskatt: 12 000 000 × 1,0 % = kr {kr(F7)}.",
         f"2. Skjermingsfradrag: 2 000 000 × 3 % = kr {kr(S7)}.",
         f"3. D = ({kr(F7)} − 0,4 × {kr(S7)})/0,6 = {kr(F7 - te7 * S7)}/0,6 = <b>kr {kr(D7)}</b>."],
        [f"<b>Kr {kr(d_glemt)}</b> = {kr(F7)}/0,6: skjermingen glemt. Det er formelen fra H2024 og H2025, der "
         "skjermingen var holdt utenfor.",
         f"<b>Kr {kr(d_oppaa)}</b> = skatten lagt oppå i stedet for å brutto-regne: {kr(F7)} + 40 % × "
         f"({kr(F7)} − {kr(S7)}). Et slikt utbytte gir bare {kr(netto_oppaa)} etter skatt.",
         f"<b>Kr {kr(d_krone)}</b> = {kr(d_glemt)} − {kr(S7)}: skjermingen trukket fra utbyttet krone for krone. "
         "Skjermingen senker skattegrunnlaget, ikke utbyttet."],
        f"Utbytte {kr(D7)}, skattepliktig {kr(D7)} − {kr(S7)} = {kr(D7 - S7)}, eierskatt {kr(D7 - S7)} × 40 % = "
        f"{kr(te7 * (D7 - S7))}. Igjen: {kr(D7)} − {kr(te7 * (D7 - S7))} = {kr(F7)}, nøyaktig formuesskatten. ✓",
        f"Skjermingen må gjøre utbyttet mindre enn {kr(d_glemt)}, men aldri mindre enn formuesskatten på {kr(F7)}. "
        f"Det stryker {kr(d_glemt)}. Test så de tre andre som i kontrollen: bare ett av dem gir nøyaktig {kr(F7)} "
        "etter skatt."),
    [kr(D7), kr(d_glemt), kr(d_oppaa), kr(d_krone)])
oppg("Utbytte for å betale formuesskatten", "Formuesskatt som avkastningsskatt", [8, 5], None, [l7])

# ---------------------------------------------------------------- Oppgave 8
print("\nOppgave 8: stykkskatt, elastisiteter og et grensetilfelle")
eS, eD = 1.5, -0.5
andel_k = eS / (eS + abs(eD))
print(f"   eksempel εS {eS}, εD {eD}: konsumentandel {andel_k}, forhold {eS / abs(eD)}")
eps_S = "ε<sub>S</sub>"
eps_D = "ε<sub>D</sub>"
o8_body = P("I et marked med frikonkurranse innfører myndighetene en stykkskatt t per enhet som kreves inn fra "
            "produsentene, slik at P = p + t. Her er P prisen konsumentene betaler og p prisen produsentene sitter "
            f"igjen med. Tilbudselastisiteten er {eps_S} &gt; 0 og etterspørselselastisiteten {eps_D} &lt; 0, begge "
            "målt i likevekten før skatten.")
l8a = ledd(
    P("Hvilket uttrykk viser hvor stor andel av skatten konsumentene bærer?"),
    f"{eps_S}/({eps_S} + |{eps_D}|)",
    [f"|{eps_D}|/({eps_S} + |{eps_D}|)", f"{eps_S}/|{eps_D}|", f"({eps_S} + |{eps_D}|)/{eps_S}"],
    losning(
        "Konsumentenes andel er ∂P/∂t = S′/(S′ − D′). Skrevet med elastisiteter, "
        f"{eps_S} = S′ · p/x og {eps_D} = D′ · P/x med P = p før skatten, faller p/x bort. Andelen blir "
        f"{eps_S}/({eps_S} + |{eps_D}|). Den minst elastiske siden bærer mest.",
        None,
        [f"<b>|{eps_D}|/({eps_S} + |{eps_D}|)</b> = produsentenes andel.",
         f"<b>{eps_S}/|{eps_D}|</b> = forholdet mellom de to andelene, ikke en andel. Med {eps_S} = 1,5 og "
         f"{eps_D} = −0,5 blir det {kr(eS / abs(eD))}, altså 300 %.",
         f"<b>({eps_S} + |{eps_D}|)/{eps_S}</b> = riktig brøk snudd. Den er alltid over 1. Ingen part kan bære "
         "mer enn hele skatten."],
        f"Andelene skal summere til 1: {eps_S}/({eps_S} + |{eps_D}|) + |{eps_D}|/({eps_S} + |{eps_D}|) = 1. ✓ Med "
        f"tallene over bærer konsumentene 1,5/2,0 = {pst(andel_k, 0)}. Og {eps_D} = 0 (helt uelastisk etterspørsel) "
        "gir andel 1: konsumentene bærer alt.",
        "En andel må ligge mellom 0 og 1 uansett elastisiteter. Den regelen stryker to alternativer med en gang.",
        ekstra=P(f"<b>Tallsjekk.</b> Sett {eps_S} = 1,5 og {eps_D} = −0,5. Riktig uttrykk gir 1,5/(1,5 + 0,5) = "
                 f"{pst(andel_k, 0)} til konsumentene og {pst(1 - andel_k, 0)} til produsentene. Etterspørselen er "
                 "minst elastisk og bærer mest.")),
    None)
l8b = ledd(
    P("Anta nå at tilbudet er perfekt elastisk (vannrett), for eksempel fordi varen kan importeres i ubegrenset "
      "mengde til en gitt verdensmarkedspris. Skatten gjelder alle enheter som selges, også de importerte. "
      "Etterspørselen er fallende. Hva blir ∂P/∂t og ∂p/∂t?"),
    "∂P/∂t = 1 og ∂p/∂t = 0: konsumentene bærer hele skatten",
    ["∂P/∂t = 0 og ∂p/∂t = −1: produsentene bærer hele skatten",
     "∂P/∂t = 1 og ∂p/∂t = −1: begge prisene endres med hele skatten",
     "∂P/∂t = 0 og ∂p/∂t = 0: kvantum faller, men ingen av prisene endres"],
    losning(
        "∂P/∂t = S′/(S′ − D′) og ∂p/∂t = D′/(S′ − D′). Når S′ går mot uendelig, går den første brøken mot 1 og den "
        "andre mot 0.",
        ["1. ∂P/∂t = S′/(S′ − D′) → 1 når S′ blir uendelig stor.",
         "2. ∂p/∂t = D′/(S′ − D′) → 0, fordi telleren er endelig og nevneren uendelig.",
         "3. Produsentene får verdensmarkedsprisen uansett. Hele skatten havner hos konsumentene: "
         "<b>∂P/∂t = 1 og ∂p/∂t = 0</b>."],
        ["<b>«∂P/∂t = 0 og ∂p/∂t = −1»</b> = tilfellet med perfekt elastisk etterspørsel eller helt uelastisk "
         "tilbud. Da bærer produsentene alt.",
         "<b>«∂P/∂t = 1 og ∂p/∂t = −1»</b> bryter identiteten ∂P/∂t − ∂p/∂t = 1. Skatten ville blitt båret to ganger.",
         "<b>«Begge er 0»</b> bryter samme identitet. Kilen mellom P og p er t, så minst én av prisene må endres."],
        f"Elastisitetsformen fra a gir det samme: når {eps_S} går mot uendelig, går {eps_S}/({eps_S} + |{eps_D}|) "
        "mot 1. ✓",
        "Identiteten ∂P/∂t − ∂p/∂t = 1 stryker to alternativer uten at du tenker på kurvene. Med to igjen lønner "
        "det seg å svare."),
    None)
oppg("Stykkskatt: elastisiteter og et grensetilfelle", "Skatteincidens", [11], o8_body, [l8a, l8b])

# ---------------------------------------------------------------- Oppgave 9
print("\nOppgave 9: implisitt skatt på en skattefri obligasjon")
R9, r9 = 0.040, 0.032
tstar = (R9 - r9) / R9
feil_nevner = (R9 - r9) / r9
diff9 = R9 - r9
andel9 = r9 / R9
print(f"   t* {tstar:.4f}; (R−r)/r {feil_nevner:.4f}; R−r {diff9:.4f}; r/R {andel9:.4f}; 10 %-investor K {R9 * 0.9:.4f}")
assert abs(R9 * (1 - tstar) - r9) < 1e-12
o9_body = P("To obligasjoner har samme risiko og samme løpetid. Obligasjon K gir 4,0 % rente som er skattepliktig. "
            "Obligasjon F gir 3,2 % rente som er skattefri. Kapitalmarkedet er velfungerende og i likevekt.")
l9a = ledd(
    P("Hvor høy er den implisitte skattesatsen på obligasjon F?"),
    pst(tstar), [pst(feil_nevner), "0,8 prosentpoeng", "22,0 %"],
    losning(
        "Like risikable papirer gir samme avkastning etter skatt i likevekt: r = R(1 − t*). Den implisitte "
        "skattesatsen er t* = (R − r)/R. Fallet i renten, R − r, er ikke satsen. Satsen er fallet målt mot R.",
        ["1. R − r = 4,0 % − 3,2 % = 0,8 prosentpoeng.",
         f"2. t* = 0,8/4,0 = <b>{pst(tstar)}</b>."],
        [f"<b>{pst(feil_nevner)}</b> = 0,8/3,2: feil nevner, avkastningen på det skattefrie papiret.",
         "<b>0,8 prosentpoeng</b> = fallet i renten. Det er det fritaket koster kjøperen i rente, ikke skattesatsen.",
         "<b>22,0 %</b> = satsen på alminnelig inntekt i loven. Den implisitte satsen leses av de to rentene alene. "
         "Her gir de 20 %."],
        f"4,0 % × (1 − {pst(tstar)}) = 3,2 %. ✓ En investor med marginalskatt på {pst(tstar, 0)} er likegyldig "
        "mellom de to obligasjonene.",
        "Fallet i renten er ikke en sats. Nevneren skal være R. Det stryker 0,8 prosentpoeng og 25,0 %. Av de to "
        "som er igjen, er 22,0 % lovens sats og ikke markedets."),
    [pst(tstar), pst(feil_nevner), "0,8", "22,0 %"])
l9b = ledd(
    P("Hvilket utsagn om skattefritaket på obligasjon F er riktig?"),
    "Utstederen av F tjener på fritaket, fordi den kan låne til lavere rente.",
    ["Staten får inn den implisitte skatten som en inntekt, akkurat som skatten på K.",
     "Alle som kjøper F, får høyere avkastning etter skatt enn de ville fått med K.",
     "Fritaket gjør at F må gi høyere rente før skatt enn K for å bli kjøpt."],
    losning(
        "Når et papir blir skattefritt, vil flere eie det. Prisen stiger og renten før skatt faller til fordelen er "
        "priset inn. Fallet i renten er det kjøperne betaler i implisitt skatt. Målt mot R gir det den implisitte "
        "skattesatsen. Ingen krever den inn. Den som tjener på fritaket, er utstederen, som låner billigere.",
        None,
        ["<b>«Staten får inn den implisitte skatten»</b>: den implisitte skatten tas ut som lavere rente, ikke som "
         "en innbetaling. Staten får ingenting.",
         "<b>«Alle som kjøper F»</b> faller på ordet «alle». En investor med marginalskatt under 20 % får mer etter "
         f"skatt med K: med 10 % skatt gir K 4,0 % × 0,9 = {pst(R9 * 0.9)}, mer enn 3,2 %.",
         "<b>«F må gi høyere rente før skatt»</b> er motsatt av likevekten: r = 3,2 % er lavere enn R = 4,0 %."],
        "Utstederen av F betaler 3,2 % i stedet for 4,0 % på et like risikabelt lån. Det er 0,8 prosentpoeng i "
        f"året. Det er nøyaktig den implisitte skattesatsen fra a ganget med R: {pst(tstar, 0)} × 4,0 % = 0,8 %. ✓"),
    None)
oppg("Implisitt skatt på en skattefri obligasjon", "Implisitt skatt", [12], o9_body, [l9a, l9b])

# ---------------------------------------------------------------- Oppgave 10
print("\nOppgave 10: Eirik, globalskatteplikt, kredit og bosted")
lonn, leie, honorar = 900_000, 300_000, 100_000
t_es, t_no = 0.25, 0.22
glob = lonn + leie + honorar
skatt_es = leie * t_es
skatt_no_leie = leie * t_no
kreditt = min(skatt_es, skatt_no_leie)
til_norge = skatt_no_leie - kreditt
ukreditert = skatt_es - kreditt
samlet_leie = skatt_es + til_norge
dager = 120 + 160
print(f"   global {glob}; Spania {skatt_es}, norsk {skatt_no_leie}, kreditt {kreditt}, til Norge {til_norge}, "
      f"ukreditert {ukreditert}, samlet {samlet_leie}; dager {dager}")
assert til_norge == 0 and dager > 270
o10_body = (P("Eirik er født og oppvokst i Bergen og bor der fortsatt. I 2026 har han disse inntektene:")
            + "<ul><li>kr 900 000 i lønn fra en norsk arbeidsgiver</li>"
              "<li>kr 300 000 i netto leieinntekt fra en leilighet han eier i Spania</li>"
              "<li>kr 100 000 i honorar for et oppdrag på Caymanøyene</li></ul>"
            + P("Du kan forutsette at:")
            + "<ul><li>leieinntekten skattlegges med 25 % i Spania og som alminnelig inntekt med 22 % i Norge</li>"
              "<li>skatteavtalen mellom Norge og Spania bygger på den vanlige kreditmetoden</li>"
              "<li>Caymanøyene har ingen inntektsskatt og ingen skatteavtale med Norge</li>"
              "<li>Norge lemper dobbeltbeskatning bare når en skatteavtale krever det</li></ul>")
l10a = ledd(
    P("Hvor mye av inntekten er skattepliktig til Norge etter norsk intern rett isolert sett, før skatteavtalen er "
      "tatt hensyn til?"),
    f"Kr {kr(glob)}", [f"Kr {kr(lonn + leie)}", f"Kr {kr(lonn)}", f"Kr {kr(lonn + honorar)}"],
    losning(
        "Den som er bosatt i Norge, har globalskatteplikt: hele inntekten er skattepliktig hit etter norsk intern "
        "rett, uansett hvor den er tjent. Skatteavtaler kan begrense retten, men de er ikke tatt hensyn til ennå.",
        [f"900 000 + 300 000 + 100 000 = <b>kr {kr(glob)}</b>."],
        [f"<b>Kr {kr(lonn)}</b> = bare den norske lønnen: kildeprinsippet brukt på et spørsmål om bostedsprinsippet.",
         f"<b>Kr {kr(lonn + honorar)}</b> = leieinntekten utelatt, som om eiendom i utlandet bare skattlegges der den "
         "ligger. Det kan følge av en avtale, men ikke av norsk intern rett.",
         f"<b>Kr {kr(lonn + leie)}</b> = honoraret utelatt fordi Caymanøyene ikke skattlegger det. At kildestaten lar "
         "være å skattlegge, fjerner ikke Norges rett."],
        "«Isolert sett» betyr alltid hele verdensinntekten for den som er bosatt her. Avtalen kommer i neste spørsmål."),
    [kr(glob), kr(lonn + leie), kr(lonn), kr(lonn + honorar)])
l10b = ledd(
    P("Hvor mye skatt betaler Eirik til Norge på leieinntekten fra Spania når skatteavtalen tas hensyn til?"),
    "Kr 0", [f"Kr {kr(skatt_no_leie)}", f"Kr {kr(samlet_leie)}", f"Kr {kr(ukreditert)}"],
    losning(
        "Under vanlig kreditmetode skattlegger begge land. Norge gir fradrag for spansk skatt, men bare opp til den "
        "norske skatten på samme inntekt: kreditfradrag = min(spansk skatt; norsk skatt). Restskatten til Norge kan "
        "ikke bli negativ.",
        [f"1. Spansk skatt: 300 000 × 25 % = kr {kr(skatt_es)}.",
         f"2. Norsk skatt på samme inntekt: 300 000 × 22 % = kr {kr(skatt_no_leie)}. Kreditfradrag: "
         f"min({kr(skatt_es)}; {kr(skatt_no_leie)}) = kr {kr(kreditt)}.",
         f"3. Til Norge: {kr(skatt_no_leie)} − {kr(kreditt)} = <b>kr 0</b>. De siste {kr(skatt_es)} − "
         f"{kr(kreditt)} = kr {kr(ukreditert)} i spansk skatt får ingen kreditt."],
        [f"<b>Kr {kr(skatt_no_leie)}</b> = norsk skatt uten kreditfradrag, som om det ikke fantes noen avtale.",
         f"<b>Kr {kr(samlet_leie)}</b> = samlet skatt på leieinntekten, ikke det som går til Norge.",
         f"<b>Kr {kr(ukreditert)}</b> = differansen mellom skattene. Restskatt til Norge oppstår bare når kildeskatten "
         "er lavere enn den norske."],
        f"Under vanlig kredit ender samlet sats på den høyeste av de to: maks(22 %; 25 %) = 25 %, altså "
        f"{kr(samlet_leie)}. Alt er betalt i Spania. ✓"),
    ["0", kr(skatt_no_leie), kr(samlet_leie), kr(ukreditert)])
l10c = ledd(
    P("Eiriks kollega Lucía er spansk statsborger og har aldri bodd i Norge før. Hun var i Norge 120 dager i 2025 "
      "og 160 dager i 2026. Oppholdene var fordelt slik at hun aldri var her mer enn 183 dager i løpet av en "
      "tolvmånedersperiode. Hvilket utsagn er riktig etter norsk intern rett?"),
    "Hun er bosatt i Norge, fordi hun har vært her over 270 dager på 36 måneder.",
    ["Hun er ikke bosatt i Norge, fordi hun er spansk statsborger med bosted i Spania.",
     "Hun er ikke bosatt i Norge, fordi hun aldri har vært her over 183 dager i ett år.",
     "Hun er bosatt i Norge, fordi alle som arbeider i Norge har globalskatteplikt hit."],
    losning(
        "Etter skatteloven § 2-1 er du bosatt i Norge hvis du oppholder deg her mer enn 183 dager i løpet av en "
        "tolvmånedersperiode eller mer enn 270 dager i løpet av en trettiseksmånedersperiode. Periodene er "
        "glidende. Statsborgerskap spiller ingen rolle.",
        [f"120 + 160 = {dager} dager innenfor en periode på 36 måneder. Det er over 270, så Lucía er <b>bosatt i "
         "Norge</b> etter intern rett, selv om hun aldri passerte 183-dagersregelen."],
        ["<b>«Spansk statsborger»</b>: bosted følger opphold, ikke pass. Er hun bosatt i Spania også, avgjøres det av "
         "skatteavtalens bostedsregel, ikke av norsk intern rett.",
         "<b>«Aldri over 183 dager i ett år»</b> glemmer den andre regelen: 270 dager i løpet av 36 måneder.",
         "<b>«Alle som arbeider i Norge har globalskatteplikt»</b>: den som arbeider her uten å være bosatt, "
         "skattlegges bare for inntekten som er tjent her (kildeprinsippet)."],
        "Er Lucía bosatt i begge land etter hvert lands interne rett, avgjør avtalens bostedsregel saken. Den prøver "
        "fast bolig, sentrum for livsinteressene, vanlig opphold og statsborgerskap i den rekkefølgen."),
    None)
oppg("Eirik og Lucía: inntekt fra flere land", "Internasjonal skatt", [13], o10_body, [l10a, l10b, l10c])

# ---------------------------------------------------------------- Oppgave 11
print("\nOppgave 11: holdingselskap og skjermingsfradrag (begrep)")
print(f"   treprosentregelen: 3 % × 22 % = {0.03 * 0.22:.4f}")
o11_body = P("To uavhengige spørsmål om aksjonærmodellen og fritaksmetoden. Selskapsskatten er 22 % og eierskatten "
             "for personlige aksjonærer 37,84 %.")
l11a = ledd(
    P("Tobias skal begynne å investere i børsnoterte aksjer i selskaper i EØS og vurderer å gjøre det gjennom et "
      "heleid holdingselskap. Hvilket utsagn om fritaksmetoden er riktig?"),
    "Gevinster kan reinvesteres i selskapet uten skatt. Eierskatten kommer når Tobias tar pengene ut.",
    ["Med holdingselskap slipper Tobias eierskatten på gevinstene for godt, også når pengene tas ut.",
     "Utbytte til holdingselskapet skattlegges med 3 %, mens gevinster skattlegges med 22 %.",
     "Tap på aksjene gir fradrag i holdingselskapet, akkurat som et tap gir fradrag for en person."],
    losning(
        "Etter fritaksmetoden (skatteloven § 2-38) betaler et aksjeselskap ikke skatt på gevinst og i hovedsak ikke "
        "på utbytte fra aksjer i selskaper i EØS. Av utbyttet inntektsføres 3 %, som gir 3 % × 22 % = 0,66 % i "
        "skatt når holdingselskapet eier 90 % eller mindre. Tap er ikke fradragsberettiget. Eierskatten kommer når "
        "pengene deles ut til den personlige eieren.",
        None,
        ["<b>«Slipper eierskatten for godt»</b>: utsettelse lest som fritak. Når pengene tas ut, betaler Tobias "
         "37,84 % som før.",
         "<b>«3 % på utbytte og 22 % på gevinster»</b>: 3 % er andelen av utbyttet som inntektsføres, ikke en "
         "skattesats. Gevinster er helt fritatt.",
         "<b>«Tap gir fradrag»</b>: fritaksmetoden tar både oppsiden og nedsiden ut av selskapets skatteregnskap."],
        "For gevinster er samlet skatt omtrent den samme med og uten holdingselskap, bare betalt senere. For utbytte "
        "legger treprosentregelen på 3 % × 22 % = 0,66 % av utbyttet når holdingselskapet eier 90 % eller mindre. "
        "Fordelen er at hele beløpet kan reinvesteres i mellomtiden, som et rentefritt lån fra staten."),
    None)
l11b = ledd(
    P("Oda eier en aksje i Kystnett ASA. Selskapet betalte utbytte i mai, mens Oda eide aksjen. Den 15. desember "
      "selger hun aksjen til Emil, som eier den ved årsskiftet. Hvilket utsagn om årets skjermingsfradrag er riktig?"),
    "Emil får det. Han fikk ikke utbytte i år, så fradraget framføres.",
    ["Oda får det, fordi det var hun som mottok utbyttet fra selskapet i mai.",
     "Oda og Emil deler det etter hvor mange måneder hver av dem eide aksjen.",
     "Ingen av dem får det, fordi aksjen skiftet eier før utgangen av året."],
    losning(
        "Skjermingsfradraget tilordnes den personlige aksjonæren som eier aksjen 31. desember i inntektsåret "
        "(skatteloven § 10-12). Utbytte tilordnes den som eier aksjen når utbyttet vedtas. Selger du før "
        "årsskiftet, mister du årets skjerming.",
        None,
        ["<b>«Oda får det»</b>: utbyttet og skjermingen følger hver sin regel. Oda skattlegges for utbyttet i mai "
         "uten årets skjerming.",
         "<b>«Deler etter måneder»</b>: skjermingen fordeles ikke etter eiertid.",
         "<b>«Ingen får det»</b>: noen eier alltid aksjen 31. desember. Den personen får fradraget."],
        "Emil eier aksjen ved årsskiftet og får fradraget, beregnet av sin egen inngangsverdi. Han har ikke mottatt "
        "utbytte, så fradraget blir ubenyttet skjerming. Den framføres og legges til skjermingsgrunnlaget hans."),
    None)
oppg("Holdingselskap og skjermingsfradrag", "Fritaksmetoden", [6, 5], o11_body, [l11a, l11b])

# ===================================================================== FINANS
# ---------------------------------------------------------------- Oppgave 12
print("\nOppgave 12: forsikring av elbilen med √W (Sofie)")
W, tap, p = 810_000, 450_000, 0.04
EU = (1 - p) * math.sqrt(W) + p * math.sqrt(W - tap)
CE = EU ** 2
Pmax = W - CE
akt = p * tap
EW = (1 - p) * W + p * (W - tap)
risikopremie = EW - CE
EU_bil = (1 - p) * math.sqrt(tap)
P_bil = tap - EU_bil ** 2
EU_null = (1 - p) * math.sqrt(W)                  # formuen satt til 0 når bilen er tapt
P_null = W - EU_null ** 2
premie = 1.2 * akt
U_med = math.sqrt(W - premie)
premie15 = 1.15 * akt
print(f"   E[U] {EU:.6f}, CE {CE:.4f}, Pmax {Pmax:.4f}, aktuarisk {akt}, E[W] {EW}, risikopremie {risikopremie:.4f}")
print(f"   bare bilen: {P_bil:.4f}; påslag 20 %: premie {premie}, U {U_med:.4f} mot {EU:.4f}; 15 %: {premie15} → "
      f"{math.sqrt(W - premie15):.4f}")
assert abs(EU - 888) < 1e-9 and premie > Pmax and math.sqrt(W - premie15) > EU
o12_body = P("Sofie har en samlet formue på kr 810 000. Av den er kr 450 000 en elbil. Med 4 % sannsynlighet blir "
             "bilen totalskadd i løpet av året og mister hele verdien. Resten av formuen er trygg. Nyttefunksjonen "
             "hennes er U(W) = √W, der W er formuen ved årets slutt.")
l12a = ledd(
    P("Hva er den høyeste premien Sofie er villig til å betale for en forsikring med full dekning? Rund av til "
      "nærmeste krone."),
    f"Kr {kr(Pmax)}", [f"Kr {kr(akt)}", f"Kr {kr(P_bil)}", f"Kr {kr(P_null)}"],
    losning(
        "Den høyeste premien gjør henne likegyldig: U(W − P) = E[U uten forsikring]. Med √W er P = W − (E[U])². "
        "W er hele formuen, ikke bare bilen.",
        [f"1. E[U] = 0,96 × √810 000 + 0,04 × √360 000 = 0,96 × 900 + 0,04 × 600 = {kr(EU)}.",
         f"2. Sikkerhetsekvivalent: {kr(EU)}² = {kr(CE)}.",
         f"3. P = 810 000 − {kr(CE)} = <b>kr {kr(Pmax)}</b>."],
        [f"<b>Kr {kr(akt)}</b> = forventet tap, 4 % × 450 000. Det er den aktuarisk rettferdige premien. En "
         "risikoavers person betaler mer enn den.",
         f"<b>Kr {kr(P_bil)}</b> = bare bilen regnet som formue: E[U] = 0,96 × √450 000. Nyttefunksjonen gjelder hele "
         "formuen.",
         f"<b>Kr {kr(P_null)}</b> = formuen satt til 0 når bilen er tapt: E[U] = 0,96 × 900 = {kr(EU_null)}. Hun har "
         "fortsatt 360 000 igjen om bilen blir totalskadd."],
        f"Dekomponer: aktuarisk premie {kr(akt)} + risikopremie ({kr(EW)} − {kr(CE)} = {kr(risikopremie)}) = "
        f"{kr(Pmax)}. ✓",
        f"En risikoavers person betaler mer enn den aktuariske premien på {kr(akt)}, så den kan strykes. Test de "
        f"andre ved å sette dem inn: √(810 000 − P) skal bli {kr(EU)}."),
    [kr(Pmax), kr(akt), kr(P_bil), kr(P_null)])
l12b = ledd(
    P("Et forsikringsselskap tilbyr full dekning. Premien er forventet erstatning pluss et påslag på 20 %. Hvilket "
      "utsagn er riktig?"),
    f"Hun bør ikke kjøpe. Premien blir kr {kr(premie)}, mer enn det meste hun vil betale.",
    ["Hun bør kjøpe, fordi en risikoavers person alltid bør forsikre seg mot et stort tap.",
     f"Hun bør kjøpe. Premien blir kr {kr(premie)}. Forventet nytte blir da høyere med forsikringen.",
     "Hun bør ikke kjøpe, fordi man aldri bør betale mer i premie enn forventet erstatning."],
    losning(
        "Sammenlign nytter, ikke kroner. Hun kjøper bare hvis premien er lavere enn maksimalpremien fra a.",
        [f"1. Premie: {kr(akt)} × 1,2 = kr {kr(premie)}.",
         f"2. Nytte med forsikring: √(810 000 − {kr(premie)}) = √{kr(W - premie)} = {kr(U_med, 2)}.",
         f"3. Uten forsikring: {kr(EU, 2)}. {kr(U_med, 2)} er lavere, så hun bør <b>ikke kjøpe</b>."],
        ["<b>«Bør kjøpe, alltid forsikre seg»</b>: risikoaversjon betyr at hun betaler mer enn forventet tap, men ikke "
         "hva som helst.",
         f"<b>«Bør kjøpe, forventet nytte blir høyere»</b>: {kr(U_med, 2)} er lavere enn {kr(EU, 2)}.",
         f"<b>«Bør ikke kjøpe, aldri mer enn forventet erstatning»</b>: riktig konklusjon, gal begrunnelse. Hun ville betalt "
         f"opptil {kr(Pmax)}, altså mer enn forventet erstatning på {kr(akt)}. Med et påslag på 15 % (premie "
         f"{kr(premie15)}) skulle hun kjøpt."],
        f"{kr(premie)} er høyere enn {kr(Pmax)} fra a. Én sammenligning gir svaret uten en ny kvadratrot."),
    [kr(premie), None, kr(premie), None])
oppg("Forsikring av elbilen med √W", "Forsikring og forventet nytte", [17], o12_body, [l12a, l12b])

# ---------------------------------------------------------------- Oppgave 13
print("\nOppgave 13: hva en portefølje av to aksjer kan gjøre")
sig = 0.20
sig_p = math.sqrt(0.5 ** 2 * sig ** 2 + 0.5 ** 2 * sig ** 2)
print(f"   σ_p ved ρ = 0 og σ = 20 %: {sig_p:.4f}")
l13 = ledd(
    P("Du kan investere i to aksjer, X og Y. Du velger selv hvor stor andel du har i hver. Du kan verken låne eller "
      "shortselge. Hvilken av påstandene kan være korrekt?"),
    "En portefølje med halvparten i X og halvparten i Y har lavere standardavvik enn både X og Y.",
    ["Korrelasjonen mellom X og Y er 1. Likevel har en portefølje av dem lavere standardavvik enn den minst "
     "risikable aksjen.",
     "En portefølje av X og Y har høyere forventet avkastning enn både X og Y.",
     "En portefølje av X og Y har høyere standardavvik enn den mest risikable av de to aksjene."],
    losning(
        "«Kan» betyr at det holder med ett tilfelle der påstanden er sann. Uten lån og shortsalg er forventet "
        "avkastning et vektet snitt. Standardavviket er høyst det vektede snittet av standardavvikene. Det er "
        "lik snittet bare når korrelasjonen er 1.",
        [f"Sett σ<sub>X</sub> = σ<sub>Y</sub> = 20 % og ρ = 0. Da er σ<sub>p</sub> = √(0,5² × 0,04 + 0,5² × 0,04) "
         f"= {pst(sig_p)}, lavere enn begge. Diversifisering virker så lenge ρ er under 1."],
        ["<b>«ρ = 1 og lavere enn den minst risikable»</b>: med ρ = 1 er σ<sub>p</sub> = wσ<sub>X</sub> + "
         "(1 − w)σ<sub>Y</sub>, en rett linje. Den kommer aldri under den laveste av de to.",
         "<b>«Høyere forventet avkastning enn begge»</b>: forventningen er et vektet snitt med vekter mellom 0 og 1. "
         "Den ligger derfor mellom de to.",
         "<b>«Høyere standardavvik enn den mest risikable»</b>: σ<sub>p</sub> er aldri over det vektede snittet. "
         "Snittet er aldri over den høyeste."],
        "Tre av påstandene bryter en grense som gjelder for alle korrelasjoner. Bare den første avhenger av ρ. "
        "Derfor er det bare den som kan være sann."),
    None)
oppg("Hva en portefølje av to aksjer kan gjøre", "Porteføljevalg", [14], None, [l13])

# ---------------------------------------------------------------- Oppgave 14
print("\nOppgave 14: indeksfond og aktive fond")
r_for, gebyr_a, gebyr_i, n14 = 0.07, 0.015, 0.002, 20
forhold = ((1 + r_for - gebyr_a) / (1 + r_for - gebyr_i)) ** n14
print(f"   sluttverdi aktivt/indeks etter {n14} år: {forhold:.4f}, altså {1 - forhold:.4f} lavere")
o14_body = P("To uavhengige spørsmål om fond.")
l14a = ledd(
    P("Mathilde vurderer et globalt indeksfond. Hvilken påstand om slike fond er riktig?"),
    "Rundt 70 % av fondet er amerikanske aksjer, så det gir stor eksponering mot dollar.",
    ["Fondet gir normalt høyere avkastning enn det vektede snittet av aksjene i indeksen.",
     "Fondet har omtrent like mye i Kina som i USA, siden begge er store økonomier.",
     "Fondet har ingen valutarisiko for Mathilde når andelene kjøpes og selges i kroner."],
    losning(
        "Et indeksfond eier aksjene i indeksen i markedsverdivekter. De vanlige globale indeksene dekker utviklede "
        "markeder. Der er USA rundt 70 %. Kina er nesten ikke med. Et globalt fond er derfor i praksis en stor "
        "amerikansk posisjon med eksponering mot dollar.",
        None,
        ["<b>«Høyere avkastning enn det vektede snittet»</b>: fondet leverer per definisjon snittet, minus gebyret.",
         "<b>«Like mye i Kina som i USA»</b>: vektene følger markedsverdien i indeksen, ikke størrelsen på "
         "økonomien. Kina er nesten ikke med.",
         "<b>«Ingen valutarisiko»</b>: andelsverdien i kroner svinger med valutakursen, selv om du handler i kroner. "
         "Valutarisikoen fjernes bare med valutasikring."],
        "Norske aksjer er om lag 0,2 % av verdens aksjemarked. Et fond som speiler verdensmarkedet, må derfor "
        "domineres av USA."),
    None)
l14b = ledd(
    P("Et aktivt forvaltet aksjefond tar 1,5 % i årlig forvaltningshonorar. Et indeksfond i samme marked tar 0,2 %. "
      "Hvilket utsagn er riktig?"),
    "Det aktive fondet kan slå indeksen før kostnader og likevel gi kunden lavere avkastning.",
    ["Forskjellen på 1,3 prosentpoeng betyr lite over 20 år, siden den bare trekkes fra avkastningen.",
     "Aktive fond som gruppe må slå indeksen etter kostnader, ellers ville ingen kjøpt dem.",
     "Statistikk over aktive fond gir et riktig bilde, fordi både gode og nedlagte fond er med."],
    losning(
        "Markedet er gjennomsnittet av alle investorer før kostnader. Aktive fond kan slå indeksen før gebyrer, men "
        "gevinsten går ofte til forvalteren gjennom honoraret (Berk og DeMarzo). For kunden er det avkastningen "
        "etter kostnader som teller.",
        None,
        [f"<b>«Betyr lite over 20 år»</b>: gebyret trekkes hvert år og rammer renters rente. Med 7 % før kostnader "
         f"gir indeksfondet 6,8 % og det aktive fondet 5,5 % i året. Etter 20 år er sluttverdien "
         f"(1,055/1,068)<sup>20</sup> = {kr(forhold, 2)} av indeksfondets, altså {pst(1 - forhold, 0)} lavere.",
         "<b>«Må slå indeksen etter kostnader»</b>: som gruppe kan de ikke det, siden de til sammen er markedet før "
         "kostnader. Flertallet slår ikke indeksen etter gebyrer.",
         "<b>«Riktig bilde»</b>: dårlige fond legges ned og forsvinner ut av statistikken (survivorship bias). "
         "Snittet ser derfor bedre ut enn det var."],
        "Indeksfond tar typisk 0,1–0,3 % i året og aktive fond 1–2 %. Forskjellen er det sikreste tallet du har "
        "når du velger fond."),
    None)
oppg("Indeksfond og aktive fond", "Indeksfond og aktiv forvaltning", [14], o14_body, [l14a, l14b])

# ---------------------------------------------------------------- Oppgave 15
print("\nOppgave 15: ytelsespensjon og IPS")
ips, t_alm = 25_000, 0.22
ips_netto = ips * (1 - t_alm)
ips_bsu = ips * 0.9
ips_eier = ips * (1 - TE)
print(f"   IPS egen kostnad {ips_netto}, BSU-feil {ips_bsu}, eierskatt-feil {ips_eier:.2f}")
o15_body = P("To uavhengige spørsmål om pensjonssparing.")
l15a = ledd(
    P("Vegard har ytelsespensjon gjennom arbeidsgiveren sin. Hvilket utsagn om ordningen er riktig?"),
    "Arbeidsgiveren lover en andel av sluttlønnen og bærer selv avkastningsrisikoen.",
    ["Vegard velger selv risikoprofil og bærer avkastningsrisikoen på pensjonskontoen.",
     "Dør Vegard før han går av med pensjon, arves beholdningen av de etterlatte.",
     "Bytter Vegard jobb, tar han med seg det som er spart som et pensjonskapitalbevis."],
    losning(
        "I en ytelsesordning er ytelsen avtalt. I en innskuddsordning er innskuddet avtalt. Den parten som ikke har "
        "fått noe avtalt, bærer risikoen. Ved ytelsespensjon er det arbeidsgiveren.",
        None,
        ["<b>«Velger selv risikoprofil»</b> beskriver innskuddspensjon, der den ansatte bærer risikoen.",
         "<b>«Arves av de etterlatte»</b> beskriver innskuddspensjon. En ytelse arves ikke.",
         "<b>«Pensjonskapitalbevis»</b> beskriver innskuddspensjon. Ved ytelsespensjon får du en fripolise når du "
         "slutter."],
        "Spør hvem som bærer risikoen i hvert alternativ. Passer beskrivelsen på den andre ordningen, stryk den. "
        "Her beskriver alle de tre gale alternativene innskuddspensjon."),
    None)
l15b = ledd(
    P("Ylva setter inn kr 25 000 på en IPS-konto i 2026. Skatten på alminnelig inntekt er 22 %. Hva koster "
      "innskuddet henne etter skattefradraget? Når kan hun tidligst ta ut pengene?"),
    f"Kr {kr(ips_netto)}, fra 62 år",
    [f"Kr {kr(ips_bsu)}, fra 67 år", f"Kr {kr(ips_netto)}, fra 67 år", f"Kr {kr(ips_eier)}, fra 62 år"],
    losning(
        "IPS-innskudd inntil kr 25 000 i året gir fradrag i alminnelig inntekt fra 2026, altså 22 % tilbake. "
        "Pengene er bundet til tidligst 62 år og utbetales over minst ti år. Uttaket skattlegges som alminnelig "
        "inntekt.",
        [f"1. Fradragets verdi: 25 000 × 22 % = kr {kr(ips * t_alm)}.",
         f"2. Egen kostnad: 25 000 − {kr(ips * t_alm)} = <b>kr {kr(ips_netto)}</b>.",
         "3. Tidligste uttak: <b>62 år</b>."],
        [f"<b>Kr {kr(ips_bsu)}, fra 67 år</b> = to feil: fradrag på 10 % direkte i skatten, som for BSU. I tillegg "
         "feil alder. IPS gir fradrag i inntekten og kan tas ut fra 62 år.",
         f"<b>Kr {kr(ips_eier)}</b> = fradrag med eierskatten på 37,84 %. IPS-fradraget er verdt 22 %.",
         f"<b>Kr {kr(ips_netto)}, fra 67 år</b>: riktig beløp, men 67 år er en vanlig pensjonsalder. IPS kan tas ut "
         "fra 62."],
        "Ved uttak betaler hun 22 % igjen. Satsen inn og satsen ut er den samme. Fordelen er utsatt skatt, som i "
        "praksis gjør avkastningen skattefri. I tillegg er kontoen fritatt for formuesskatt. Det er ikke en lavere sats."),
    [kr(ips_netto), kr(ips_bsu), kr(ips_netto), kr(ips_eier)])
oppg("Ytelsespensjon og IPS", "Pensjon", [15], o15_body, [l15a, l15b])

# ---------------------------------------------------------------- Oppgave 16
print("\nOppgave 16: avdragsfrihet")
l16 = ledd(
    P("Jakob har et annuitetslån på boligen. Han skal ha foreldrepermisjon i ett år med lavere inntekt. Banken tilbyr "
      "ham ett års avdragsfrihet i denne perioden. Hvilket utsagn er riktig?"),
    "Han betaler bare renter dette året. Samlet rentekostnad i kroner blir høyere.",
    ["Avdragsfriheten virker som et rentefritt lån fra banken, så lånet blir billigere totalt.",
     "Staten betaler avdragene hans i perioden, slik at gjelden likevel blir nedbetalt.",
     "Avdragsfrihet er aldri lurt, fordi lånet alltid blir dyrere målt i nåverdi."],
    losning(
        "Avdragsfrihet betyr at du bare betaler renter i en periode. Hovedstolen står uendret. Renten løper på hele "
        "beløpet hele tiden. Det er en likviditetsordning, ikke en rabatt. Den kan være lurt når inntekten er "
        "midlertidig lav, fordi den er billigere enn forbrukslån eller kredittkort.",
        None,
        ["<b>«Rentefritt lån»</b>: motsatt. Du betaler mer renter i kroner fordi gjelden står lenger.",
         "<b>«Staten betaler avdragene»</b>: staten har ingen rolle i avtalen. Rentefradraget dekker 22 % av rentene "
         "uansett.",
         "<b>«Aldri lurt, alltid dyrere i nåverdi»</b>: i nåverdi ved lånerenten er kostnaden den samme. Likviditet "
         "har verdi når alternativet er dyrere kreditt."],
        "Avdragskravet i utlånsforskriften gjelder bare når belåningsgraden er over 60 %. Ligger Jakob under, kan "
        "banken gi avdragsfrihet uten å avvike fra forskriften. Ligger han over, er avdragsfriheten et avvik fra "
        "kravet. Da må banken bruke fleksibilitetskvoten."),
    None)
oppg("Avdragsfrihet i foreldrepermisjonen", "Lån", [16], None, [l16])

# ---------------------------------------------------------------- Oppgave 17
print("\nOppgave 17: egenandel, moralsk hasard og ugunstig utvalg")
l17 = ledd(
    P("Et forsikringsselskap selger innboforsikring. Selskapet kan verken se hvor forsiktige kundene er eller hvem "
      "som har høy risiko. Det vurderer å innføre en egenandel og samtidig senke premien. Hvilket utsagn er riktig?"),
    "En egenandel kan dempe både moralsk hasard og ugunstig utvalg.",
    ["Moralsk hasard betyr at kundene med høyest risiko kjøper forsikring, mens de med lav risiko lar være.",
     "Ugunstig utvalg betyr at kundene blir mindre forsiktige etter at de har kjøpt forsikring.",
     "En egenandel gir et dårligere utvalg, fordi forsiktige kunder heller vil ha full dekning."],
    losning(
        "Moralsk hasard er atferd etter avtalen: den som er fullt forsikret, passer dårligere på. Ugunstig utvalg "
        "handler om hvem som kjøper: de med høy risiko kjøper, de med lav risiko lar være. En egenandel virker på "
        "begge. Kunden bærer selv en del av tapet og får grunn til å være forsiktig. Forsiktige kunder velger "
        "egenandel mot lavere premie, mens kunder med høy risiko velger full dekning. Selskapet får et gunstigere "
        "utvalg.",
        None,
        ["<b>«Moralsk hasard = de med høyest risiko kjøper»</b> beskriver ugunstig utvalg.",
         "<b>«Ugunstig utvalg = mindre forsiktige etter kjøpet»</b> beskriver moralsk hasard. Begge alternativene har "
         "byttet om navnene.",
         "<b>«Dårligere utvalg»</b>: motsatt. Forsiktige kunder tjener mest på lav premie med egenandel, så det er "
         "de som velger den."],
        "Kursgodkjenningen 2026 hadde «alle tre» som svar på et spørsmål om egenandel: mindre moralsk hasard, "
        "gunstigere utvalg og færre små krav. Ugunstig utvalg kan i tillegg løses med obligatorisk medlemskap, som i "
        "folketrygden."),
    None)
oppg("Egenandel i forsikring", "Forsikring og forventet nytte", [17], None, [l17])

# ---------------------------------------------------------------- Oppgave 18
print("\nOppgave 18: folketrygden i prosent av sluttlønn (Amalie)")
ar_del, ar_full, stilling, dt = 10, 30, 0.6, 19.0
ekv_ar = ar_del * stilling + ar_full
komp = 0.181 * ekv_ar / dt
komp_full = 0.181 * (ar_del + ar_full) / dt
komp_utelatt = 0.181 * ar_full / dt
komp_ar = 0.181 * ekv_ar / (ar_del + ar_full)
slutt = 600_000
print(f"   år {ekv_ar}, komp {komp:.5f}; full {komp_full:.5f}; utelatt {komp_utelatt:.5f}; delt på år {komp_ar:.5f}")
l18 = ledd(
    P("Amalie er født i 2000 og jobber i 40 år før hun tar ut alderspensjon. De ti første årene jobber hun i 60 % "
      "stilling, deretter i full stilling. Lønnen for full stilling følger lønnsveksten og er hele tiden under 7,1 G. "
      "Hvert år legges 18,1 % av inntekten til pensjonsbeholdningen, som reguleres med lønnsveksten. Delingstallet "
      "blir 19,0. Hvor stor blir pensjonen fra folketrygden i prosent av sluttlønnen? Svar med én desimal."),
    pst(komp), [pst(komp_full), pst(komp_ar), pst(komp_utelatt)],
    losning(
        "Når lønnen følger lønnsveksten og ligger under taket, er hvert år i full stilling verdt 18,1 % av "
        "sluttlønnen i beholdningen. Et år i 60 % stilling er verdt 60 % av det. Pensjonen er beholdningen delt på "
        "delingstallet.",
        [f"1. Opptjeningsår målt i full stilling: 10 × 0,6 + 30 = {kr(ekv_ar)}.",
         f"2. Beholdning: {kr(ekv_ar)} × 18,1 % = {kr(0.181 * ekv_ar, 3)} ganger sluttlønnen.",
         f"3. Pensjon: {kr(0.181 * ekv_ar, 3)}/19,0 = <b>{pst(komp)}</b> av sluttlønnen."],
        [f"<b>{pst(komp_full)}</b> = 18,1 % × 40/19: deltidsårene regnet som full stilling.",
         f"<b>{pst(komp_utelatt)}</b> = 18,1 % × 30/19: deltidsårene utelatt helt. Alleårsregelen gjør at hvert år "
         "med inntekt teller.",
         f"<b>{pst(komp_ar)}</b> = 18,1 % × {kr(ekv_ar)}/40: beholdningen delt på antall år i stedet for "
         "delingstallet."],
        f"Med sluttlønn kr 600 000 blir beholdningen {kr(0.181 * ekv_ar, 3)} × 600 000 = {kr(0.181 * ekv_ar * slutt)} "
        f"og pensjonen {kr(0.181 * ekv_ar * slutt)}/19 = {kr(0.181 * ekv_ar * slutt / dt)} i året. Det er "
        f"{pst(0.181 * ekv_ar * slutt / dt / slutt)} av 600 000. ✓"),
    [pst(komp), pst(komp_full), pst(komp_ar), pst(komp_utelatt)])
oppg("Folketrygden i prosent av sluttlønnen", "Pensjon", [15], None, [l18])

# ================================================================== SETTET
prove = {
    "id": "prove5",
    "kind": "mock",
    "label": "Prøveeksamen 5",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Ligner H2024 og kursgodkjenningen 2026: korte oppgaver i skoleeksamensformat, der halvparten av leddene "
             "har tallsvar og resten er påstandsspørsmål. Skattedelen går gjennom skjerming over tre år, gevinst med "
             "ubenyttet skjerming, fradragets tidsverdi, progressivitet og trinnskatt, formuesskatt "
             "med gjeldsreduksjon, utbytte til formuesskatten, insidens med elastisiteter, implisitt skatt og en kort "
             "blokk om globalskatteplikt, kreditmetoden og bosted. Finansdelen har forsikring med √W, portefølje, "
             "fond, pensjon, avdragsfrihet og folketrygden."),
    "facts": [
        "4 timer, skoleeksamen, kalkulator tillatt.",
        "30 flervalgsledd med fire alternativer og nøyaktig ett riktig.",
        "3 poeng for rett, −1 for feil og 0 for ubesvart. Maksimalt 90 poeng.",
        "Skattedelen har 20 ledd og finansdelen 10 ledd.",
        "Halvparten av leddene har tallsvar. Resten er påstandsspørsmål i stilen fra kursgodkjenningen 2026.",
        "Alle satser du skal regne med, står i oppgaveteksten. Faktaspørsmål om 2026-regler må du kunne.",
    ],
    "practiceNote": ("Kjør settet på tid med minuspoeng slått på. På regneleddene: regn ferdig før du ser på "
                     "alternativene, for de gale er nesten alltid et mellomresultat. På påstandsleddene: les «kan», "
                     "«alltid» og «alle» presist. Kan du stryke ett alternativ, lønner det seg å svare."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": OPPG,
}

# ================================================================ KONTROLL
print("\n================ kontroll")
feil = []
svar = [d["answer"] for d, _ in LEDD]
if svar != PLAN:
    feil.append(f"fasitplanen er ikke fulgt: {svar} mot {PLAN}")
if len(LEDD) != 30:
    feil.append(f"{len(LEDD)} ledd, ikke 30")
if sum(e["points"] for e in OPPG) != 90:
    feil.append("poengene summerer ikke til 90")

for i, (d, v) in enumerate(LEDD, 1):
    o = d["options"]
    if len(o) != 4 or len(set(o)) != 4:
        feil.append(f"ledd {i}: alternativene er ikke fire ulike")
    for k, (alt, tall) in enumerate(zip(o, v)):
        if tall is not None and tall not in alt:
            feil.append(f"ledd {i} alt {'ABCD'[k]}: mangler regnet tall {tall!r} i {alt!r}")
    if v[d["answer"]] is not None and v[d["answer"]] not in d["solution"]:
        feil.append(f"ledd {i}: løsningen nevner ikke riktig tall {v[d['answer']]!r}")

raw = json.dumps({k: v for k, v in prove.items() if k != "mc"}, ensure_ascii=False)
if "—" in raw:
    feil.append(f"tankestrek (—) {raw.count('—')} ganger")
for m in re.finditer(r",\s*og\b", raw):
    feil.append(f"komma foran «og»: …{raw[max(0, m.start() - 50):m.end() + 10]}…")
for m in re.finditer(r"(?<![\d<])-\d", raw):
    feil.append(f"bindestrek som minustegn: …{raw[max(0, m.start() - 20):m.end() + 10]}…")


# Kalibrering og lekkasje, målt som tools/sjekk-prove.js
def strip(s):
    s = re.sub(r"<[^>]+>", " ", str(s or ""))
    s = re.sub(r"&[a-z]+;", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def forste_tall(s):
    t = re.sub(r"\s(?=\d{3}\b)", "", strip(s)).replace("−", "-")
    m = re.search(r"-?\d+(?:,\d+)?", t)
    return float(m.group(0).replace(",", ".")) if m else None


ordsum = n = talledd = 0
lengst = tekst = 0
pos = {"størst": 0, "minst": 0, "midten": 0}
for e in OPPG:
    deler = e.get("parts") or [e]
    felles = len(strip(e["body"]).split(" "))
    for p_ in deler:
        n += 1
        ordsum += felles if p_ is e else felles / len(deler) + len(strip(p_["body"]).split(" "))
        o = p_["options"]
        if all(re.search(r"\d", strip(x)) and len(strip(x)) < 40 for x in o):
            talledd += 1
            t_ = [forste_tall(x) for x in o]
            srt = sorted(t_)
            v_ = t_[p_["answer"]]
            pos["størst" if v_ == srt[3] else "minst" if v_ == srt[0] else "midten"] += 1
        else:
            tekst += 1
            ln = [len(strip(x)) for x in o]
            if ln[p_["answer"]] == max(ln) and ln.count(ln[p_["answer"]]) == 1:
                lengst += 1
ord_per = ordsum / n
andel_tall = talledd / n
print(f"ord per ledd {ord_per:.1f} (mål 35–48), tallsvar {talledd}/{n} = {andel_tall:.0%} (mål 35–55 %)")
print(f"tekstledd {tekst}: riktig er lengst i {lengst}; tallledd {talledd}: {pos}")
print("fasit A–D:", "/".join(str(svar.count(k)) for k in range(4)))
if not 35 <= ord_per <= 48:
    feil.append(f"ord per ledd {ord_per:.1f} utenfor 35–48")
if not 0.35 <= andel_tall <= 0.55:
    feil.append(f"andel tallsvar {andel_tall:.0%} utenfor 35–55 %")

if feil:
    print("\nFEIL:")
    for f in feil:
        print("  " + f)
    sys.exit(1)

(HER / "prove5.json").write_text(json.dumps(prove, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
print(f"\nIngen feil. Skrev {HER / 'prove5.json'}")
