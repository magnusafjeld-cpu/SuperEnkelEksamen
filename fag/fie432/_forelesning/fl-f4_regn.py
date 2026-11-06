"""Regneskript for settet «F4 Aksjonærmodellen og fritaksmetoden» (fl-f4). Kjør fra prosjektroten:
python3 -I fag/fie432/_forelesning/fl-f4_regn.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f4")
t = 0.22
y = 1.72
te = t * y  # 37,84 %

# ================================================================ Oppgave 1: delingsmodellen
ov, kap, sj = 900_000, 4_000_000, 0.07
avk = kap * sj
lonn = ov - avk
a1 = S.ledd("", "<p>Hvor stor lønnsinntekt ble Per tilordnet? Hvordan kunne han unngå det?</p>",
    riktig=(f"Kr {kr(lonn)}. Han kunne selge seg ned til 66 % og fortsatt kontrollere selskapet.", [kr(lonn), "66"]),
    gale=[(f"Kr {kr(avk)}. Han kunne selge seg ned til 66 % og fortsatt kontrollere selskapet.", [kr(avk), "66"]),
          (f"Kr {kr(lonn)}. Han kunne ikke unngå det, for regelen gjaldt alle eiere som jobbet i selskapet.", [kr(lonn)]),
          (f"Kr {kr(ov)}. Han kunne ta ut hele overskuddet som utbytte i stedet, skattefritt for aktive eiere.", [kr(ov)])],
    solution=sol(
        "Delingsmodellen tilordnet aktive eiere (eide minst 2/3 og jobbet i bedriften) lønn lik overskuddet minus en sjablongmessig avkastning på investert kapital. Residualen var lønn.",
        [f"Kapitalavkastning: {kr(kap)} × {pst(sj, 0)} = {kr(avk)}.",
         f"Tilordnet lønn: {kr(ov)} − {kr(avk)} = <b>kr {kr(lonn)}</b>.",
         "Eide han under 2/3, var han ikke aktiv eier. Med 66 % hadde han fortsatt flertall og slapp lønnsbeskatningen. I 2006 var det nesten ingen aktive eiere igjen."],
        [(f"Kr {kr(avk)}", "kapitalavkastningen, ikke lønnen."),
         ("Kunne ikke unngå det", "regelen traff bare aktive eiere med minst 2/3 av aksjene. Eierne solgte seg ned under grensen."),
         (f"Kr {kr(ov)}", "hele overskuddet. Det var nettopp utbytte i stedet for lønn delingsmodellen skulle hindre for aktive eiere.")],
        kilde="F4 lb 6–10"),
    dekker=["f4-historikk-02", "f4-historikk-03"])
S.oppgave("Per Bygg AS i 1990-årene", "Skattereformene", [5],
    f"<p>Året er 1998. Per eier alle aksjene i Per Bygg AS og arbeider fulltid i selskapet. Overskuddet er kr {kr(ov)}, investert kapital er kr {kr(kap)} og den sjablongmessige avkastningen på kapital er {pst(sj, 0)}. Delingsmodellen gjelder.</p>",
    [a1])

# ================================================================ Oppgave 2: 2004 til 2006 (påstand)
a2 = S.ledd("", "<p>Hvilken påstand om skattereformene og tilpasningene til dem er riktig?</p>",
    riktig="Etter varselet i 2004 tok mange ut skattefrie utbytter og skjøt dem inn igjen som egenkapital, som senere kan betales ut uten eierskatt.",
    gale=["Etter reformen i 1992 ble utbytte skattlagt med 28 % hos den personlige aksjonæren, i tillegg til de 28 % selskapet betalte av overskuddet.",
          "First Securities anbefalte 2006-reformen for Finansdepartementet fordi aksjonæren selv kunne bestemme når eierskatten ble utløst.",
          "De fleste investerte utbyttene fra 2004 og 2005 privat, fordi innskutt egenkapital ikke øker skjermingsgrunnlaget og ikke kan tas ut igjen."],
    solution=begrep(
        "Oligark-øyeblikket: utbytte var skattefritt i 2004 og 2005. Eierne tømte selskapene og skjøt pengene inn igjen som egenkapital. Innskutt egenkapital øker skjermingsgrunnlaget. Nedsettelse kan betales ut skattefritt. Det utsetter eierskatten (en skattekreditt) og ga en fordel til dem med «gamle penger».",
        "Påstanden om utbytte i 2004 og innskudd som egenkapital er riktig.",
        [("28 % på utbytte etter 1992", "utbytte var skattefritt hos personen fra 1992. 28 % var skatten på overskuddet i selskapet."),
         ("First Securities", "advarte mot reformen, nettopp fordi skattyter selv bestemmer når skatten utløses."),
         ("Investert privat", "var den «dumme» strategien. De fleste skjøt utbyttet inn igjen; Rasmussen-familien tok ut nesten 1,7 mrd. kr.")],
        kilde="F4 lb 5, lb 12, lb 14, lb 15, lb 17 og lb 47"),
    dekker=["f4-historikk-04", "f4-historikk-05", "f4-historikk-01", "f4-historikk-06"])
S.oppgave("Skattereformene og oligark-øyeblikket", "Skattereformene", [5, 6], "", [a2])

# ================================================================ Oppgave 3: fritaksmetoden, 3 %-regelen
utb_h, gev_h, tap_h = 3_000_000, 8_000_000, 1_000_000
skatt_h = utb_h * 0.03 * t
f_gev = (utb_h + gev_h) * 0.03 * t
f_tap = skatt_h - tap_h * t
f_full = utb_h * t
a3 = S.ledd("", "<p>Hva blir skatten for Fjord Holding AS av disse tre postene til sammen?</p>",
    riktig=(f"Kr {kr(skatt_h)}", [kr(skatt_h)]),
    gale=[(f"Kr {kr(f_gev)}", [kr(f_gev)]),
          (f"Kr {kr(f_tap)}", [kr(f_tap)]),
          (f"Kr {kr(f_full)}", [kr(f_full)])],
    solution=sol(
        "Fritaksmetoden: selskaper er i hovedsak fritatt for skatt på mottatt utbytte og aksjegevinst. Tap på aksjer gir ikke fradrag. Eier selskapet under 90 % av den som deler ut, skattlegges 3 % av utbyttet. Regelen gjelder utbytte, ikke gevinst.",
        [f"Utbytte fra Laks AS (eierandel 60 %): {kr(utb_h)} × 3 % × 22 % = {kr(skatt_h)}.",
         f"Gevinsten på {kr(gev_h)} er fritatt.",
         f"Tapet på {kr(tap_h)} gir ikke fradrag. Samlet skatt: <b>kr {kr(skatt_h)}</b>, 0,66 % av utbyttet."],
        [(f"Kr {kr(f_gev)}", "3 %-regelen brukt også på gevinsten."),
         (f"Kr {kr(f_tap)}", "tapet trukket fra med 22 %. Under fritaksmetoden gir tap ikke fradrag."),
         (f"Kr {kr(f_full)}", "22 % av hele utbyttet, som om fritaksmetoden ikke gjaldt.")],
        kilde="F4 lb 22, lb 25 og HBS s. 6"),
    dekker=["f4-fritaksmetoden-03", "f4-fritaksmetoden-01"])
S.oppgave("Fjord Holding AS", "Fritaksmetoden", [6],
    f"<p>Fjord Holding AS eier 60 % av aksjene i Laks AS og mottar kr {kr(utb_h)} i utbytte. Samme år selger holdingselskapet aksjene i Kyst ASA med en gevinst på kr {kr(gev_h)} og aksjene i Tare AS med et tap på kr {kr(tap_h)}. Selskapsskatten er 22 %. Av utbytte fra selskaper der eierandelen er under 90 %, er 3 % skattepliktig.</p>",
    [a3])

# ================================================================ Oppgave 4: fritaksmetoden (påstand)
a4 = S.ledd("", "<p>Hvilken påstand om fritaksmetoden er riktig?</p>",
    riktig="Den skal hindre kjedebeskatning. Et holdingselskap kan selge et datterselskap skattefritt; eierskatt kommer først ved utdeling til en person.",
    gale=["Den skal skjerme normalavkastningen på egenkapitalen, slik at bare meravkastningen skattlegges når holdingselskapet mottar utbytte fra datteren.",
          "Ifølge DN (2019) mottar de rikeste om lag 400 mrd. kr hvert år i skattefrie utbytter og gevinster i holdingselskapene sine.",
          "Den gjelder bare utbytte og gevinst fra norske datterselskaper. Kostnader knyttet til de skattefrie aksjeinntektene gir heller ikke fradrag."],
    solution=begrep(
        "Uten fritaksmetoden ville samme overskudd blitt skattlagt hver gang det gikk fra selskap til selskap. Holdingselskapet mottar utbytte og gevinster skattefritt; overskuddet skattlegges først når det deles ut til personlig aksjonær. Mohn kunne slik plassere 13 mrd. kr i gevinst fra salget av Framo skattefritt i Wimoh.",
        "Påstanden om kjedebeskatning er riktig.",
        [("Normalavkastningen", "skjermes av skjermingsfradraget i aksjonærmodellen, ikke av fritaksmetoden."),
         ("400 mrd. hvert år", "blander tallene: om lag 80 mrd. kr i året i skattefrie inntekter, over 400 mrd. kr i opptjent overskudd samlet."),
         ("Bare norske", "fritaket gjelder i hovedsak aksjeinntekter fra EØS og omfatter derivater. Driftskostnadene gir fullt fradrag.")],
        kilde="F4 lb 22–26, lb 28, HBS s. 6 og BS2 s. 53"),
    dekker=["f4-fritaksmetoden-02", "f4-fritaksmetoden-04", "f4-fritaksmetoden-05", "f4-fritaksmetoden-06"])
S.oppgave("Holdingselskapene", "Fritaksmetoden", [6], "", [a4])

# ================================================================ Oppgave 5: aksjonærmodellen (påstand)
a5 = S.ledd("", "<p>Hvilken påstand om skatt for personlige aksjonærer er riktig? Bruk 2026-satsene: 22 % og oppjusteringsfaktor 1,72.</p>",
    riktig="Utbytte og gevinst ut over skjermingen skattlegges med 37,84 % hos personen. Tap gir fradrag med samme sats.",
    gale=["Et lån på kr 500 000 fra eget aksjeselskap til aksjonæren skattlegges bare gjennom renteinntekten i selskapet, med 22 %.",
          "Ved tap på en aksje legges ubenyttet skjerming til tapet, slik at fradraget på 37,84 % blir større enn uten skjerming.",
          "Aksjonærmodellen gjelder også aksjeselskaper som eier aksjer, slik at utbytte mellom selskaper skattlegges med 37,84 %."],
    solution=begrep(
        "Aksjonærmodellen gjelder personlige aksjonærer: utbytte (eierinntekt) og gevinst etter skjermingsfradrag skattlegges med 22 % × 1,72 = 37,84 %. Tap gir fradrag med samme sats.",
        "Påstanden om 37,84 % på utbytte, gevinst og tap er riktig.",
        [("Aksjonærlån", "skattlegges som utbytte siden 2015. Unntaket er lån under 100 000 kr som betales tilbake innen 60 dager."),
         ("Ubenyttet skjerming og tap", "skjermingen kan bare redusere en gevinst ned til null. Den legges ikke til tapet og går tapt ved salg."),
         ("Selskaper", "går under fritaksmetoden, ikke aksjonærmodellen.")],
        kilde="F4 lb 30, lb 35, lb 57 og BS3 s. 44–46"),
    dekker=["f4-aksjonaermodellen-01", "f4-aksjonaermodellen-06", "f4-aksjonaermodellen-07", "f4-gevinst-05"])
S.oppgave("Aksjonærmodellen", "Aksjonærmodellen", [5], "", [a5])

# ================================================================ Oppgave 6: begrunnelsene (påstand)
a6 = S.ledd("", "<p>Hvilken påstand om begrunnelsene for reglene er riktig?</p>",
    riktig="Oppjusteringsfaktoren skal gjøre det like lønnsomt på marginen å tjene en krone i selskapet som i lønn.",
    gale=["På aksjesparekonto regnes skjermingen per aksje. Ubenyttet skjerming faller bort når en aksje inne på kontoen selges.",
          "Skjermingsfradraget skal fjerne all skatt på utbytte, slik at bare aksjegevinster blir skattlagt hos personlige aksjonærer.",
          "Skaugeutvalget viste at utbytteskatten ikke påvirker når det lønner seg å dele ut. Da tok utvalget hensyn til fritaksmetoden."],
    solution=begrep(
        "Oppjusteringen skal hindre inntektsskifting: uten den ville utbytte bli lavere beskattet enn lønn. Eiere ville da tatt utbytte i stedet. Faktoren bestemmes av inntektsskiftningsligningen.",
        "Påstanden om inntektsskifting er riktig.",
        [("Aksjesparekonto", "skjermingen følger kontoen, ikke aksjen. Ubenyttet skjerming legges til grunnlaget og nye innskudd øker det; handel inne på kontoen endrer ikke grunnlaget."),
         ("Skjermingen", "skal bare skjerme den risikofrie avkastningen, fordi egenkapital har en alternativkostnad som ikke kan trekkes fra. Meravkastningen skattlegges."),
         ("Skaugeutvalget", "(NOU 2003:9 boks 9.1) brukte en renteinvestering som skattlegges løpende i selskapet og så dermed bort fra problemet fritaksmetoden skaper (BS2 s. 55).")],
        kilde="F4 lb 20, lb 40, lb 49; BS2 s. 55 og s. 63"),
    dekker=["f4-aksjonaermodellen-05", "f4-skjerming-13", "f4-bs2-06", "f4-skjerming-14"])
S.oppgave("Hvorfor reglene ser slik ut", "Aksjonærmodellen", [5, 6], "", [a6])

# ================================================================ Oppgave 7: Ingrid og Havbris ASA
kost = 400 * 50
r22, r24, r25, r26 = 0.020, 0.040, 0.035, 0.032
u23, u24 = 1_300, 500
stv, tillegg = 0.035, 0.005
r23 = float(rund((stv + tillegg) * (1 - t) * 100, 1)) / 100
assert lik(r23, 0.031)
ub22 = kost * r22
gr23 = kost + ub22
skj23 = gr23 * r23
sp23 = max(0, u23 - skj23 - ub22)
ub23 = max(0, ub22 + skj23 - u23)
assert ub23 == 0
# gale
r23_f = (stv + tillegg)
f_a1 = u23 - (kost + ub22) * r23_f - ub22
ub22_tv = ub22 * 3 / 12
f_a2 = u23 - (kost + ub22_tv) * r23 - ub22_tv
f_a3 = u23 - kost * r23 - ub22
a7a = S.ledd("a", f"<p>Skjermingsrenten for 2023 står ikke i tabellen. Den bygger på renten på statskasseveksler med tre måneders løpetid, som var {pst(stv, 1)} i 2023, med et tillegg på 0,5 prosentpoeng og alminnelig skattesats 22 %. Renten avrundes til én desimal. Hva er Ingrids skattepliktige utbytte for 2023?</p>",
    riktig=(f"Kr {kr(sp23, 2)}", [kr(sp23, 2)]),
    gale=[(f"Kr {kr(f_a1, 2)}", [kr(f_a1, 2)]),
          (f"Kr {kr(f_a2, 2)}", [kr(f_a2, 2)]),
          (f"Kr {kr(f_a3, 2)}", [kr(f_a3, 2)])],
    solution=sol(
        "Skjermingsrenten er (statskassevekselrente + 0,5 prosentpoeng) × (1 − 22 %). Den som eier aksjen 31.12, får hele årets skjerming, også i kjøpsåret. Ubenyttet skjerming legges til grunnlaget neste år og trekkes i tillegg fra utbyttet.",
        [f"Skjermingsrente 2023: ({kr(100 * stv, 1)} + 0,5) × 0,78 = {kr(100 * (stv + tillegg) * (1 - t), 2)} ≈ {pst(r23, 1)}.",
         f"2022: ingen utbytte, full skjerming {kr(kost)} × {pst(r22, 1)} = {kr(ub22)} ubenyttet. Grunnlag 2023: {kr(kost)} + {kr(ub22)} = {kr(gr23)}.",
         f"Skjerming 2023: {kr(gr23)} × {pst(r23, 1)} = {kr(skj23, 2)}. Skattepliktig: {kr(u23)} − {kr(skj23, 2)} − {kr(ub22)} = <b>kr {kr(sp23, 2)}</b>."],
        [(f"Kr {kr(f_a1, 2)}", f"skjermingsrenten uten (1 − 22 %): {pst(r23_f, 1)}. Skjermingsrenten er en rente etter skatt."),
         (f"Kr {kr(f_a2, 2)}", f"skjermingen for 2022 tidsvektet (3/12 × {kr(ub22)} = {kr(ub22_tv)}). Den som eier aksjen 31.12, får hele årets skjerming."),
         (f"Kr {kr(f_a3, 2)}", "den ubenyttede skjermingen fra 2022 er trukket fra, men ikke lagt til grunnlaget.")],
        kilde="F4 lb 31–33, lb 75 og lb 76; BS3 s. 44"),
    dekker=["f4-skjerming-01", "f4-skjerming-04", "f4-skjerming-09", "f4-skjerming-12"])

skj24 = kost * r24
ub24 = max(0, skj24 - u24)
skj25 = (kost + ub24) * r25
ub25 = ub24 + skj25
f_b1 = skj25
f_b2 = ub24 + kost * r25
ub24_f = gr23 * r24 - u24
f_b3 = ub24_f + (gr23 + ub24_f) * r25
a7b = S.ledd("b", "<p>Hvor stor er Ingrids ubenyttede skjerming på aksjene 31.12.2025? Avrund til to desimaler.</p>",
    riktig=(f"Kr {kr(ub25, 2)}", [kr(ub25, 2)]),
    gale=[(f"Kr {kr(f_b1, 2)}", [kr(f_b1, 2)]),
          (f"Kr {kr(f_b2, 2)}", [kr(f_b2, 2)]),
          (f"Kr {kr(f_b3, 2)}", [kr(f_b3, 2)])],
    solution=sol(
        "Når utbyttet har brukt opp all ubenyttet skjerming, faller grunnlaget tilbake til kostprisen. Et år der utbyttet er mindre enn skjermingen, gir 0 i skattepliktig utbytte og en ubenyttet rest. Restene summeres og legges til grunnlaget.",
        [f"2024: all ubenyttet skjerming ble brukt i 2023, så grunnlaget er {kr(kost)}. Skjerming {kr(kost)} × {pst(r24, 1)} = {kr(skj24)}. Utbytte {kr(u24)} gir 0 skattepliktig og {kr(ub24)} ubenyttet.",
         f"2025: grunnlag {kr(kost)} + {kr(ub24)} = {kr(kost + ub24)}. Skjerming × {pst(r25, 1)} = {kr(skj25, 2)}. Ingen utbytte.",
         f"Saldo 31.12.2025: {kr(ub24)} + {kr(skj25, 2)} = <b>kr {kr(ub25, 2)}</b>."],
        [(f"Kr {kr(f_b1, 2)}", "bare årets skjerming for 2025. Restene fra 2024 faller ikke bort."),
         (f"Kr {kr(f_b2, 2)}", f"resten fra 2024 er ikke lagt til grunnlaget for 2025 ({kr(kost)} × {pst(r25, 1)})."),
         (f"Kr {kr(f_b3, 2)}", f"grunnlaget {kr(gr23)} fra 2023 er brukt videre. Det skulle falle tilbake til kostprisen da den ubenyttede skjermingen var brukt opp.")],
        kilde="F4 lb 33, lb 34 og lb 76"),
    dekker=["f4-skjerming-03", "f4-skjerming-05", "f4-skjerming-06", "f4-skjerming-11"])

salg = 400 * 65
gevinst = salg - kost - ub25
skatt_g = gevinst * te
f_c1 = (salg - kost) * te
f_c2 = (gevinst - (kost + ub25) * r26) * te
f_c3 = gevinst * t
a7c = S.ledd("c", "<p>Selskapet betaler ikke utbytte i 2026. Ingrid selger alle aksjene 15. juni 2026 for kr 65 per aksje. Hva blir skatten på gevinsten? Avrund til to desimaler.</p>",
    riktig=(f"Kr {kr(skatt_g, 2)}", [kr(skatt_g, 2)]),
    gale=[(f"Kr {kr(f_c1, 2)}", [kr(f_c1, 2)]),
          (f"Kr {kr(f_c2, 2)}", [kr(f_c2, 2)]),
          (f"Kr {kr(f_c3, 2)}", [kr(f_c3, 2)])],
    solution=sol(
        "Gevinst = salgspris − kostpris − ubenyttet skjerming fra årene før. Selges aksjen før 31.12, gir salgsåret ingen skjerming. Skatten er gevinst × 1,72 × 22 % = gevinst × 37,84 %.",
        [f"Salgspris: 400 × 65 = {kr(salg)}.",
         f"Gevinst: {kr(salg)} − {kr(kost)} − {kr(ub25, 2)} = {kr(gevinst, 2)}.",
         f"Skatt: {kr(gevinst, 2)} × 1,72 × 22 % = <b>kr {kr(skatt_g, 2)}</b>."],
        [(f"Kr {kr(f_c1, 2)}", "den ubenyttede skjermingen er ikke trukket fra gevinsten."),
         (f"Kr {kr(f_c2, 2)}", f"skjerming for 2026 ({pst(r26, 1)}) er også trukket fra. Ingrid eier ikke aksjene 31.12.2026."),
         (f"Kr {kr(f_c3, 2)}", "bare 22 %: oppjusteringen med 1,72 er glemt.")],
        kontroll=f"Gevinst etter skatt: {kr(gevinst, 2)} − {kr(skatt_g, 2)} = {kr(gevinst - skatt_g, 2)}.",
        kilde="F4 lb 34 og lb 35"),
    dekker=["f4-gevinst-01", "f4-gevinst-02", "f4-skjerming-10", "f4-aksjonaermodellen-02"])
S.oppgave("Ingrid og aksjene i Havbris ASA", "Aksjonærmodellen", [5],
    "<p>Ingrid kjøpte 400 aksjer i Havbris ASA 1. oktober 2022 for kr 50 per aksje. Selskapet betaler utbytte i mai, så hun fikk ikke utbytte i 2022. Hun har ikke kjøpt eller solgt andre aksjer i selskapet. Eierskatten er 22 % × 1,72 = 37,84 %.</p>"
    "<table class=\"data\"><tr><th>År</th><th>Utbytte i alt</th><th>Skjermingsrente</th></tr>"
    "<tr><td>2022</td><td class=\"n\">0</td><td class=\"n\">2,0 %</td></tr>"
    "<tr><td>2023</td><td class=\"n\">1 300</td><td class=\"n\">se a)</td></tr>"
    "<tr><td>2024</td><td class=\"n\">500</td><td class=\"n\">4,0 %</td></tr>"
    "<tr><td>2025</td><td class=\"n\">0</td><td class=\"n\">3,5 %</td></tr>"
    "<tr><td>2026</td><td class=\"n\">0</td><td class=\"n\">3,2 %</td></tr></table>",
    [a7a, a7b, a7c])

# ================================================================ Oppgave 8: to aksjeposter
kA, uA, mA = 60_000, 1_200, 45_000
kB, uB, mB = 150_000, 9_000, 210_000
rs = 0.03
spA = max(0, uA - kA * rs)
spB = max(0, uB - kB * rs)
sp8 = spA + spB
f8_sam = (uA + uB) - (kA + kB) * rs
f8_kurs = max(0, uA - mA * rs) + max(0, uB - mB * rs)
f8_ingen = uA + uB
a8 = S.ledd("", "<p>Hva er Henriks skattepliktige utbytte for 2026?</p>",
    riktig=(f"Kr {kr(sp8)}", [kr(sp8)]),
    gale=[(f"Kr {kr(f8_sam)}", [kr(f8_sam)]),
          (f"Kr {kr(f8_kurs)}", [kr(f8_kurs)]),
          (f"Kr {kr(f8_ingen)}", [kr(f8_ingen)])],
    solution=sol(
        "Skjermingen regnes per aksjepost av postens kostpris. Ubenyttet skjerming på én post kan ikke brukes mot utbytte fra en annen. Markedsverdien er uten betydning.",
        [f"Skogen ASA: skjerming {kr(kA)} × 3 % = {kr(kA * rs)} er mer enn utbyttet {kr(uA)}. Skattepliktig 0; {kr(kA * rs - uA)} framføres på denne posten.",
         f"Bølgen ASA: skjerming {kr(kB)} × 3 % = {kr(kB * rs)}. Skattepliktig {kr(uB)} − {kr(kB * rs)} = {kr(spB)}.",
         f"Samlet: 0 + {kr(spB)} = <b>kr {kr(sp8)}</b>. Markedsverdiene er støy."],
        [(f"Kr {kr(f8_sam)}", "postene slått sammen: den ubenyttede skjermingen på Skogen er brukt mot utbyttet fra Bølgen."),
         (f"Kr {kr(f8_kurs)}", "skjermingen regnet av markedsverdien. Grunnlaget er kostprisen."),
         (f"Kr {kr(f8_ingen)}", "skjermingen glemt: hele utbyttet regnet som skattepliktig.")],
        kontroll=f"Skatten blir {kr(sp8)} × 37,84 % = {kr(sp8 * te, 2)}.",
        kilde="F4 lb 31–33 og H2023 o5"),
    dekker=["f4-skjerming-08", "f4-skjerming-02", "f4-skjerming-07"])
S.oppgave("Henrik og to aksjeposter", "Skjerming", [5],
    f"<p>Henrik har eid aksjer i to selskaper i hele 2026. Ingen av postene har ubenyttet skjerming fra tidligere år. Skjermingsrenten for 2026 er 3,0 %.</p>"
    f"<table class=\"data\"><tr><th>Post</th><th>Kostpris</th><th>Utbytte 2026</th><th>Markedsverdi 31.12</th></tr>"
    f"<tr><td>Skogen ASA</td><td class=\"n\">{kr(kA)}</td><td class=\"n\">{kr(uA)}</td><td class=\"n\">{kr(mA)}</td></tr>"
    f"<tr><td>Bølgen ASA</td><td class=\"n\">{kr(kB)}</td><td class=\"n\">{kr(uB)}</td><td class=\"n\">{kr(mB)}</td></tr></table>",
    [a8])

# ================================================================ Oppgave 9: Lars og Fjellstue AS
kostL, ovL, rL = 900_000, 500_000, 0.03
sskatt = ovL * t
utbL = ovL - sskatt
skjL = kostL * rL
eskatt = (utbL - skjL) * y * t
f9_rekke = (utbL * y - skjL) * t
f9_brutto = (ovL - skjL) * te
f9_22 = (utbL - skjL) * t
a9a = S.ledd("a", "<p>Hvor mye eierskatt betaler Lars? Avrund til nærmeste krone.</p>",
    riktig=(f"Kr {kr(eskatt)}", [kr(eskatt)]),
    gale=[(f"Kr {kr(f9_rekke)}", [kr(f9_rekke)]),
          (f"Kr {kr(f9_brutto)}", [kr(f9_brutto)]),
          (f"Kr {kr(f9_22)}", [kr(f9_22)])],
    solution=sol(
        "Utbyttet er overskuddet etter selskapsskatt. Skjermingen trekkes fra utbyttet før oppjusteringen: eierskatt = (utbytte − skjerming) × 1,72 × 22 %.",
        [f"Selskapsskatt: {kr(ovL)} × 22 % = {kr(sskatt)}. Utbytte: {kr(utbL)}.",
         f"Skjerming: {kr(kostL)} × 3 % = {kr(skjL)}. Skattepliktig: {kr(utbL)} − {kr(skjL)} = {kr(utbL - skjL)}.",
         f"Eierskatt: {kr(utbL - skjL)} × 1,72 = {kr((utbL - skjL) * y)}; × 22 % = <b>kr {kr(eskatt)}</b>."],
        [(f"Kr {kr(f9_rekke)}", "hele utbyttet oppjustert før skjermingen er trukket fra. Rekkefølgen er skjerming først."),
         (f"Kr {kr(f9_brutto)}", "selskapsskatten er glemt: eierskatt regnet av overskuddet før skatt."),
         (f"Kr {kr(f9_22)}", "bare 22 %, uten oppjustering.")],
        kilde="F4 lb 30, lb 31 og lb 64"),
    dekker=["f4-aksjonaermodellen-03", "f4-aksjonaermodellen-04"])
samlet = (sskatt + eskatt) / ovL
f9_utb = eskatt / utbL
f9_sum = t + te
f9_nom = t + (1 - t) * te
a9b = S.ledd("b", "<p>Hvor stor er samlet skatt på selskap og eier i prosent av overskuddet før skatt?</p>",
    riktig=(pst(samlet), [pst(samlet)]),
    gale=[(pst(f9_utb), [pst(f9_utb)]),
          (pst(f9_sum), [pst(f9_sum)]),
          (pst(f9_nom), [pst(f9_nom)])],
    solution=sol(
        "Samlet effektiv skatt = (selskapsskatt + eierskatt) / overskudd før skatt. Effektiv skatt på utbyttet alene har utbyttet som nevner.",
        [f"Selskapsskatt {kr(sskatt)} + eierskatt {kr(eskatt)} = {kr(sskatt + eskatt)}.",
         f"Delt på {kr(ovL)} = <b>{pst(samlet)}</b>."],
        [(pst(f9_utb), "eierskatten delt på utbyttet: effektiv skatt på utbyttet, ikke samlet."),
         (pst(f9_sum), "22 % + 37,84 % lagt sammen. Eierskatten treffer bare det som er igjen etter selskapsskatten."),
         (pst(f9_nom), "22 % + 0,78 × 37,84 %, marginalskatten når skjermingen ses bort fra. Skjermingen gjør tallet lavere.")],
        kilde="F4 lb 64 og Oppgaver F5 o1"),
    dekker=["f4-samlet-skatt-02", "f4-samlet-skatt-01"])
S.oppgave("Lars og Fjellstue AS", "Effektiv skattesats", [1, 5],
    f"<p>Lars eier alle aksjene i Fjellstue AS. Han betalte kr {kr(kostL)} for dem. Det er ingen ubenyttet skjerming. Selskapet har et overskudd før skatt på kr {kr(ovL)} og deler ut hele overskuddet etter skatt. Selskapsskatten er 22 %, skjermingsrenten er 3,0 % og eierskatten er 22 % × 1,72.</p>",
    [a9a, a9b])

# ================================================================ Oppgave 10: overskudd etter skatt oppgitt
ovE, eC = 2_340_000, 0.35
ovB = ovE / (1 - t)
sC = ovB * t
eskC = ovE * eC
samC = (sC + eskC) / ovB
f10_nev = (sC + eskC) / ovE
f10_s = (ovE * t + eskC) / (ovE + ovE * t)
f10_sum = t + eC
a10 = S.ledd("", "<p>Hvor stor er samlet skatt på selskap og eier i prosent av overskuddet før skatt?</p>",
    riktig=(pst(samC), [pst(samC)]),
    gale=[(pst(f10_nev), [pst(f10_nev)]),
          (pst(f10_s), [pst(f10_s)]),
          (pst(f10_sum), [pst(f10_sum)])],
    solution=sol(
        "Overskudd før skatt = overskudd etter skatt / (1 − 22 %). Nevneren er brutto overskudd i selskapet.",
        [f"Før skatt: {kr(ovE)} / 0,78 = {kr(ovB)}. Selskapsskatt: {kr(sC)}.",
         f"Eierskatt: {kr(ovE)} × 35 % = {kr(eskC)}.",
         f"({kr(sC)} + {kr(eskC)}) / {kr(ovB)} = <b>{pst(samC)}</b>."],
        [(pst(f10_nev), "delt på overskuddet etter skatt i stedet for før skatt."),
         (pst(f10_s), f"selskapsskatten regnet som 22 % av {kr(ovE)}. Den er 22 % av overskuddet før skatt."),
         (pst(f10_sum), "satsene lagt sammen. Eierskatten treffer bare 78 % av overskuddet.")],
        kontroll=f"Formelen 0,22 + 0,78 × 0,35 = {pst(t + (1 - t) * eC)} gir det samme når skjermingen ses bort fra.",
        kilde="F4 lb 64"),
    dekker=["f4-samlet-skatt-03"])
S.oppgave("Mona og overskuddet etter skatt", "Effektiv skattesats", [1, 5],
    f"<p>Monas aksjeselskap har et overskudd etter selskapsskatt på kr {kr(ovE)}, som deles ut til henne. Selskapsskatten er 22 %. Bruk en forenklet eierskatt på 35 % og se bort fra skjerming.</p>",
    [a10])

# ================================================================ Oppgave 11: 51,5 % (påstand)
m14 = 0.14 + 0.86 * te
assert lik(round(m14, 3), 0.465)
a11 = S.ledd("", "<p>Offisiell statistikk sier at marginalskatten på eierinntekt er om lag 51,5 %. Hvilken påstand stemmer med forelesningen?</p>",
    riktig="Bruker man at bedriftene i snitt betaler om lag 14 % i effektiv selskapsskatt, blir den marginale eierskatten om lag 46,5 %.",
    gale=["51,5 % er en nedre grense, fordi tallet ser bort fra at mye av overskuddet holdes tilbake i selskapet i stedet for å deles ut.",
          "Må investoren ta utbytte for å betale formuesskatten, blir skattebelastningen langt høyere enn for en lønnstaker med 700 000 kr.",
          "Bjerksund og Schjelderup mener at aksjonærbeskatningen blir nøytral så lenge skjermingsrenten settes riktig."],
    solution=begrep(
        "Med effektiv selskapsskatt 14 %: 0,14 + 0,86 × 37,84 % = 46,5 %. Offisiell statistikk bruker nominelle satser for å kunne sammenligne med andre land.",
        "Påstanden om 46,5 % er riktig.",
        [("Nedre grense", "51,5 % er en øvre grense: alt deles ut med én gang, skjermingen ses bort fra og satsene er nominelle. Alle tre trekker tallet opp."),
         ("Formuesskatt og utbytte", "regnestykket ga om lag 25,6 % effektiv skatt, på linje med en lønnstaker med 700 000 kr."),
         ("Nøytral med riktig skjermingsrente", "BS gir fire grunner til at den ikke er nøytral: ulik behandling av tap og gevinst, lånerenten, tapsaversjon og opsjonen i å vente.")],
        kilde="F4 lb 38, lb 39, lb 64, lb 65; F5 lb 28; BS3 s. 44"),
    dekker=["f4-samlet-skatt-04", "f4-samlet-skatt-05", "f4-utbytte-formuesskatt-05", "f4-tilbakeholdt-04"])
S.oppgave("Hvor høy er eierskatten egentlig?", "Effektiv skattesats", [1, 5], "", [a11])

# ================================================================ Oppgave 12: utbytte for å betale formuesskatten
mv, fs_s, e_s = 1_400_000, 0.0085, 0.34
FS = mv * fs_s
D = FS / (1 - e_s)
f12_opp = FS * (1 + e_s)
f12_rab = mv * 0.8 * fs_s / (1 - e_s)
f12_26 = FS / (1 - te)
a12 = S.ledd("", "<p>Hvor stort utbytte må Nora ta for å dekke formuesskatten og skatten på utbyttet? Avrund til to desimaler.</p>",
    riktig=(f"Kr {kr(D, 2)}", [kr(D, 2)]),
    gale=[(f"Kr {kr(f12_opp, 2)}", [kr(f12_opp, 2)]),
          (f"Kr {kr(f12_rab, 2)}", [kr(f12_rab, 2)]),
          (f"Kr {kr(f12_26, 2)}", [kr(f12_26, 2)])],
    solution=sol(
        "Utbyttet D må dekke formuesskatten F etter eierskatt: D(1 − t<sub>e</sub>) = F, altså D = F / (1 − t<sub>e</sub>).",
        [f"Formuesskatt uten rabatt: {kr(mv)} × 0,85 % = {kr(FS)}.",
         f"Utbytte: {kr(FS)} / (1 − 0,34) = <b>kr {kr(D, 2)}</b>.",
         f"Utbytteskatten er {kr(D, 2)} × 34 % = {kr(D * e_s, 2)} = {kr(D, 2)} − {kr(FS)}."],
        [(f"Kr {kr(f12_opp, 2)}", "skatten lagt oppå formuesskatten: 1,34 × F. Da blir det ikke nok igjen etter eierskatt."),
         (f"Kr {kr(f12_rab, 2)}", "20 % aksjerabatt brukt. Forslaget har ingen rabatt."),
         (f"Kr {kr(f12_26, 2)}", "eierskatten for 2026 (37,84 %) brukt i stedet for forslagets 34 %.")],
        kilde="F4 lb 77 og Oppgaver F4 spm 2"),
    dekker=["f4-utbytte-formuesskatt-01", "f4-utbytte-formuesskatt-04"])
S.oppgave("Nora og Skatteutvalgets forslag", "Formuesskatt", [7, 5],
    f"<p>Nora eier børsnoterte aksjer med markedsverdi kr {kr(mv)}. Hun må ta utbytte for å betale formuesskatten. Bruk Skatteutvalgets forslag: ingen verdsettelsesrabatt på aksjer, formuesskatt 0,85 % og eierskatt 34 %. Se bort fra bunnfradrag og skjerming.</p>",
    [a12])

# ================================================================ Oppgave 13: Eva og 12 millioner
inv, dy, rsk, bunn = 12_000_000, 0.05, 0.034, 1_900_000
utbE = inv * dy
FSE = (inv * 0.8 - bunn) * 0.01
skjE = inv * rsk
USE = (utbE - skjE) * te
effE = (FSE + USE) / utbE
f13_skj = (FSE + utbE * te) / utbE
f13_rab = ((inv - bunn) * 0.01 + USE) / utbE
f13_fs = USE / utbE
a13 = S.ledd("", "<p>Hvor stor andel av utbyttet går til formuesskatt og utbytteskatt til sammen?</p>",
    riktig=(pst(effE), [pst(effE)]),
    gale=[(pst(f13_skj), [pst(f13_skj)]),
          (pst(f13_rab), [pst(f13_rab)]),
          (pst(f13_fs), [pst(f13_fs)])],
    solution=sol(
        "Formuesskatten regnes av 80 % av markedsverdien minus bunnfradraget. Utbytteskatten regnes av utbyttet ut over skjermingen.",
        [f"Formuesskatt: ({kr(inv)} × 0,8 − {kr(bunn)}) × 1 % = {kr(FSE)}.",
         f"Utbytte {kr(utbE)}; skjerming {kr(inv)} × {pst(rsk, 1)} = {kr(skjE)}; utbytteskatt ({kr(utbE)} − {kr(skjE)}) × 37,84 % = {kr(USE, 2)}.",
         f"({kr(FSE)} + {kr(USE, 2)}) / {kr(utbE)} = <b>{pst(effE)}</b>."],
        [(pst(f13_skj), "skjermingen glemt: hele utbyttet skattlagt med 37,84 %."),
         (pst(f13_rab), "aksjerabatten glemt i formuesskatten."),
         (pst(f13_fs), "bare utbytteskatten. Formuesskatten er glemt.")],
        kontroll="Forelesningens eksempel (10 mill., 6 % utbytte) ga om lag 25,6 %, på linje med en lønnstaker med 700 000 kr.",
        kilde="F4 lb 38 og lb 39"),
    dekker=["f4-utbytte-formuesskatt-02"])
S.oppgave("Eva og 12 millioner i børsaksjer", "Formuesskatt", [7, 5],
    f"<p>Eva kjøper børsnoterte aksjer for kr {kr(inv)}. Selskapene betaler {pst(dy, 0)} av investeringsbeløpet i utbytte. Skjermingsrenten er {pst(rsk, 1)}, eierskatten 37,84 % og formuesskatten 1 %. Aksjer verdsettes til 80 % av markedsverdien og bunnfradraget er kr {kr(bunn)}. Markedsverdien er uendret.</p>",
    [a13])

# ================================================================ Oppgave 14: Tor over to år
kT, uT1, uT2, rT1, rT2, eT = 5_000_000, 250_000, 400_000, 0.030, 0.035, 0.40
spT = max(0, uT1 - kT * rT1) + max(0, uT2 - kT * rT2)
assert uT1 > kT * rT1 and uT2 > kT * rT2
eskT = spT * eT
FST = kT * 0.8 * 0.01 * 2
igjen = uT1 + uT2 - eskT - FST
f14_ett = uT1 + uT2 - eskT - FST / 2
f14_rab = uT1 + uT2 - eskT - kT * 0.01 * 2
f14_skj = uT1 + uT2 - (uT1 + uT2) * eT - FST
a14 = S.ledd("", "<p>Hvor mye sitter Tor igjen med av utbyttene etter eierskatt og formuesskatt for de to årene til sammen?</p>",
    riktig=(f"Kr {kr(igjen)}", [kr(igjen)]),
    gale=[(f"Kr {kr(f14_ett)}", [kr(f14_ett)]),
          (f"Kr {kr(f14_rab)}", [kr(f14_rab)]),
          (f"Kr {kr(f14_skj)}", [kr(f14_skj)])],
    solution=sol(
        "Skjermingen regnes av kostprisen hvert år. Formuesskatten betales hvert år av 80 % av markedsverdien.",
        [f"Skattepliktig utbytte: ({kr(uT1)} − {kr(kT * rT1)}) + ({kr(uT2)} − {kr(kT * rT2)}) = {kr(spT)}; eierskatt × 40 % = {kr(eskT)}.",
         f"Formuesskatt: {kr(kT)} × 0,8 × 1 % × 2 år = {kr(FST)}.",
         f"Igjen: {kr(uT1 + uT2)} − {kr(eskT)} − {kr(FST)} = <b>kr {kr(igjen)}</b>."],
        [(f"Kr {kr(f14_ett)}", "formuesskatt for bare ett år."),
         (f"Kr {kr(f14_rab)}", "aksjerabatten glemt: formuesskatt av hele markedsverdien."),
         (f"Kr {kr(f14_skj)}", "skjermingen glemt: eierskatt av hele utbyttet.")],
        kilde="F4 lb 38 og H2025 o1"),
    dekker=["f4-utbytte-formuesskatt-03"])
S.oppgave("Tor og to år med utbytte", "Formuesskatt", [7, 5],
    f"<p>Tor kjøpte aksjer for kr {kr(kT)} i desember 2024. Han mottok kr {kr(uT1)} i utbytte i 2025 og kr {kr(uT2)} i 2026. Skjermingsrenten var {pst(rT1, 1)} i 2025 og {pst(rT2, 1)} i 2026. Bruk en forenklet eierskatt på 40 %, formuesskatt 1 % og verdsettelse av aksjer til 80 % av markedsverdien, som er kr {kr(kT)} begge årene. Se bort fra bunnfradrag.</p>",
    [a14])

# ================================================================ Oppgave 15: Siri selger med liten gevinst
kS, rS, salgS, rS26 = 300_000, 0.035, 307_000, 0.032
ubS = kS * rS
gevS = salgS - kS
assert ubS > gevS
tapS = ubS - gevS
a15 = S.ledd("", "<p>Hva blir skattevirkningen av salget for Siri?</p>",
    riktig="Ingen skatt og ikke noe fradrag.",
    gale=[(f"Fradrag for et tap på kr {kr(tapS)}, verdt kr {kr(tapS * te, 2)}.", [kr(tapS), kr(tapS * te, 2)]),
          (f"Skatt på kr {kr(gevS * te, 2)}, 37,84 % av gevinsten.", [kr(gevS * te, 2), "37,84"]),
          (f"Skatt på kr {kr(gevS * t)}, 22 % av gevinsten.", [kr(gevS * t), "22"])],
    solution=sol(
        "Ubenyttet skjerming fra årene før salget trekkes fra gevinsten, men bare ned til null. Den kan ikke skape eller øke et tap. Resten går tapt.",
        [f"Ubenyttet skjerming fra 2025: {kr(kS)} × {pst(rS, 1)} = {kr(ubS)}.",
         f"Gevinst før skjerming: {kr(salgS)} − {kr(kS)} = {kr(gevS)}. Skjermingen reduserer den til 0.",
         f"<b>Ingen skatt og ikke noe fradrag</b>; {kr(tapS)} av skjermingen går tapt. Skjermingsrenten for 2026 er støy: Siri eier ikke aksjene 31.12.2026."],
        [("Fradrag for tap", "ubenyttet skjerming kan ikke gjøre en gevinst om til et tap. Det er asymmetrien i eierskatten."),
         (f"Skatt {kr(gevS * te, 2)}", "den ubenyttede skjermingen er glemt."),
         (f"Skatt {kr(gevS * t)}", "skjermingen er glemt og satsen er ikke oppjustert.")],
        kilde="F4 lb 33–35, BS3 s. 44 og s. 46"),
    dekker=["f4-gevinst-03", "f4-gevinst-04"])
S.oppgave("Siri og aksjene i Nordkapp AS", "Aksjonærmodellen", [5],
    f"<p>Siri kjøpte aksjer i Nordkapp AS i 2024 for kr {kr(kS)}. Det er ingen ubenyttet skjerming fra 2024. Selskapet betalte ikke utbytte i 2025, da skjermingsrenten var {pst(rS, 1)}. I mars 2026 selger hun aksjene for kr {kr(salgS)}. Skjermingsrenten for 2026 er {pst(rS26, 1)} og eierskatten 37,84 %.</p>",
    [a15])

# ================================================================ Oppgave 16: BS-modellen
r_s, R_l = 0.040, 0.065
Sb = te * (1 + r_s * (1 - t))
Lb = te * (1 + R_l * (1 - t))
Sb_f = te * (1 + r_s)
Lb_f = te * (1 + R_l)
assert Lb > Sb
a16 = S.ledd("", "<p>Hva er skattebesparelsen S og lånekostnaden L ved t = 1 per krone utbytte? Hva lønner seg?</p>",
    riktig=(f"S = {kr(Sb, 4)} og L = {kr(Lb, 4)}: vent med utbyttet til t = 1.", [kr(Sb, 4), kr(Lb, 4), "1"]),
    gale=[(f"S = {kr(Sb, 4)} og L = {kr(Lb, 4)}: ta utbyttet nå, ved t = 0.", [kr(Sb, 4), kr(Lb, 4), "0"]),
          (f"S = {kr(Sb_f, 4)} og L = {kr(Lb_f, 4)}: vent med utbyttet til t = 1.", [kr(Sb_f, 4), kr(Lb_f, 4), "1"]),
          (f"S = {kr(Lb, 4)} og L = {kr(Sb, 4)}: ta utbyttet nå, ved t = 0.", [kr(Lb, 4), kr(Sb, 4), "0"])],
    solution=sol(
        "Tar Kari 1 kr i utbytte nå og skyter den inn igjen, øker inngangsverdien til 1 × (1 + r(1 − t)). Skattebesparelsen er S = t<sub>e</sub>(1 + r(1 − t)). Eierskatten lånes og koster L = t<sub>e</sub>(1 + R(1 − t)). Utbytte nå lønner seg bare hvis S ≥ L, altså r ≥ R.",
        [f"S = 0,3784 × (1 + {kr(100 * r_s, 1)} % × 0,78) = {kr(Sb, 4)}.",
         f"L = 0,3784 × (1 + {kr(100 * R_l, 1)} % × 0,78) = {kr(Lb, 4)}.",
         f"L &gt; S fordi lånerenten er høyere enn skjermingsrenten: <b>vent med utbyttet</b>."],
        [("Samme tall, ta utbytte nå", "snur konklusjonen. Lånekostnaden er større enn skattebesparelsen."),
         (f"S = {kr(Sb_f, 4)}", "rentene er brukt uten (1 − t). Rentefradraget gjør lånet billigere. Skjermingen er etter skatt."),
         ("S og L byttet", "lånerenten er brukt i S og skjermingsrenten i L.")],
        kontroll=f"Differansen L − S = 0,3784 × 0,78 × ({kr(100 * R_l, 1)} − {kr(100 * r_s, 1)}) % = {kr(Lb - Sb, 4)} &gt; 0.",
        kilde="F4 lb 78–80"),
    dekker=["f4-tilbakeholdt-01"])
S.oppgave("Kari: utbytte nå eller om ett år?", "Aksjonærmodellen", [5, 6],
    f"<p>Kari eier et aksjeselskap. Hun vurderer å ta 1 kr i utbytte nå (t = 0), skyte den inn igjen som ny egenkapital og låne privat til eierskatten, eller vente med utbyttet til t = 1. Eierskatten er 37,84 % og alminnelig skattesats 22 %. Skjermingsrenten før skatt er r = {pst(r_s, 1)} og Karis lånerente R = {pst(R_l, 1)}. Bruk Bjerksund–Schjelderup-modellen fra forelesningen.</p>",
    [a16])

# ================================================================ Oppgave 17: latent eierinntekt og exit-skatt (påstand)
a17 = S.ledd("", "<p>Hvilken påstand om tilbakeholdt overskudd og utflytting er riktig?</p>",
    riktig="Exit-skatten på latent gevinst ved utflytting har samme sats som eierskatten. Den kan betales i rentefrie avdrag over 12 år.",
    gale=["Før 2022 var formuesskatten hovedgrunnen til at svært rike flyttet til Sveits; 5-årsregelen betydde lite for beslutningen.",
          "Latent eierinntekt er utbytte som er betalt ut til aksjonærene, men som ennå ikke er skattlagt hos dem.",
          "Finansdepartementet og Bjerksund–Schjelderup er enige om at skattesystemet ikke påvirker når det lønner seg å ta utbytte."],
    solution=begrep(
        "Exit-skatten (37,84 %) skal hindre at gevinster bygget opp i Norge realiseres skattefritt etter utflytting. Den betales ved utflytting, i rentefrie avdrag over 12 år eller i sin helhet etter 12 år.",
        "Påstanden om exit-skatt er riktig.",
        [("Formuesskatten", "5-årsregelen (opphørt 29. november 2022) lot dem realisere latente gevinster nær skattefritt. Det var mer verdt enn å spare formuesskatt."),
         ("Latent eierinntekt", "er overskudd som holdes tilbake i selskapene og ikke betales ut. Den utgjorde 40 % av Oljefondets verdi i 2016."),
         ("Enige", "Finansdepartementet mener skattesystemet ikke påvirker tidspunktet; BS mener det lønner seg å spare i selskapet, med ASK som nest best.")],
        kilde="F4 lb 41–44"),
    dekker=["f4-tilbakeholdt-06", "f4-tilbakeholdt-05", "f4-tilbakeholdt-02", "f4-tilbakeholdt-03"])
S.oppgave("Latent eierinntekt og exit-skatt", "Exit-skatt", [6], "", [a17])

# ================================================================ Oppgave 18: BS3 (påstand)
a18 = S.ledd("", "<p>Hvilken påstand stemmer med Bjerksund og Schjelderup (2021), «Er den norske aksjonærbeskatningen nøytral?»</p>",
    riktig="Med asymmetrisk eierskatt lønner det seg alltid å vente med utbytte, også med riktig skjermingsrente.",
    gale=["Eierskatten er asymmetrisk fordi tap trekkes fra med en lavere sats enn den gevinst og utbytte skattlegges med.",
          "Med asymmetrisk eierskatt lønner det seg å eie en blandet portefølje av aksjer og rentepapirer gjennom selskap.",
          "Med symmetrisk eierskatt er utbyttebeslutningen nøytral med riktig skjermingsrente, uansett hva investoren låner til."],
    solution=begrep(
        "Under asymmetri er forskjellen mellom å vente og å ta utbytte en «butterfly spread» av salgsopsjoner, som alltid er null eller positiv. Aksjonærmodellen er derfor ikke nøytral for utbyttebeslutningen.",
        "Påstanden om at det lønner seg å vente, er riktig.",
        [("Lavere sats på tap", "satsen er den samme. Asymmetrien er at ubenyttet skjerming går tapt og at tap bare gir fradrag mot inngangsverdien."),
         ("Blandet portefølje", "er ulønnsom gjennom selskap under asymmetri (en «bull spread», alltid null eller negativ). Direkte gir fradrag for tap fra første krone."),
         ("Uansett lånerente", "nøytralitet under symmetri krever også at investoren kan låne til skjermingsrenten. Låner hun dyrere, lønner det seg å vente.")],
        kilde="BS3 s. 44–52"),
    dekker=["f4-bs3-04", "f4-bs3-01", "f4-bs3-02", "f4-bs3-03"])
S.oppgave("Er aksjonærbeskatningen nøytral?", "Aksjonærmodellen", [5, 6], "", [a18])

# ================================================================ Oppgave 19: BS1 (påstand)
a19 = S.ledd("", "<p>Hvilken påstand stemmer med Bjerksund og Schjelderup om utbyttebeslutningen og formuesskatt (BS1)?</p>",
    riktig="Fordi lånerenten er høyere enn plasseringsrenten, lønner det seg fortsatt å spare i selskapet, også med formuesskatt.",
    gale=["Med formuesskatt på rentepapirer krever nøytralitet at skjermingsrenten økes med formuesskattesatsen.",
          "Av de fire modellene for nøytralitet anbefaler de å heve skjermingsrenten til aksjonærenes lånerente etter skatt minus formuesskatten.",
          "For de 5 % rikeste utgjør formuesskatten en større andel av bruttoinntekten enn selskapsskatten gjør."],
    solution=begrep(
        "Med lånerente r<sub>L</sub> over plasseringsrenten blir X − Z = (1 − γ) × a × ((r<sub>L</sub>(1 − t) − τ<sub>f</sub>) − i) &gt; 0. Påstanden om at formuesskatten tvinger fram utbytte holder derfor ikke.",
        "Påstanden om at det fortsatt lønner seg å spare i selskapet, er riktig.",
        [("Skjermingsrenten økes", "nøytralitet med risikofri lånerente krever i = r<sub>f</sub>(1 − t) − τ<sub>f</sub>: renten må ned med formuesskattesatsen."),
         ("Heve skjermingsrenten", "BS anbefaler modell (iv): dagens skjermingsrente og en særskatt på eierskattekreditten."),
         ("Formuesskatten større", "selskapsskatten er 4–7 % og formuesskatten 1–2 % av bruttoinntekten til de 5 % rikeste.")],
        kilde="BS1 s. 28–33"),
    dekker=["f4-bs1-02", "f4-bs1-01", "f4-bs1-03", "f4-bs1-04"])
S.oppgave("Formuesskatten og utbyttet", "Formuesskatt", [7, 6], "", [a19])

# ================================================================ Oppgave 20: BS2 (påstand)
a20 = S.ledd("", "<p>Hvilken påstand stemmer med Bjerksund og Schjelderup, «Aksjonærmodellen og fritaksmetoden: Et to-hodet troll» (BS2)?</p>",
    riktig="Effektivitetsprinsippet: skattereglene skal i minst mulig grad påvirke hvilke investeringer som gjøres og hvordan de organiseres.",
    gale=["Ifølge Aaberge mfl. (2020) betalte topp 0,1 % en høyere andel av bruttoinntekten i skatt enn topp 1 % gjorde i perioden 2001–2018.",
          "BS anbefaler å fjerne fritaksmetoden, fordi investorene ikke kan flytte holdingselskapene sine til EU for å unngå det.",
          "I usikkerhetsviften for selskapsverdien etter 15 år ligger medianen over forventet verdi, fordi fordelingen er symmetrisk."],
    solution=begrep(
        "Effektivitetsprinsippet skal sikre at det investeres der avkastningen før skatt er høyest. Evneprinsippet sier at de med høyest skatteevne skal betale en høyere andel. En kreditt som er større for etablerte enn for nystartede selskaper, bryter effektivitetsprinsippet.",
        "Påstanden om effektivitetsprinsippet er riktig.",
        [("Topp 0,1 %", "betalte 9–17 %, lavere enn topp 1 % (22 %). Det bryter evneprinsippet."),
         ("Fjerne fritaksmetoden", "da flytter investorene holdingselskapet til EU og gjeninnfører den i praksis. BS foreslår strengere kostnadskontroll og 10 års utenlandsopphold."),
         ("Medianen", "verdien er lognormalfordelt: median 1,98 mot forventning 2,40 kr per krone.")],
        kilde="BS2 s. 53–62"),
    dekker=["f4-bs2-01", "f4-bs2-03", "f4-bs2-04", "f4-bs2-05"])
S.oppgave("Det to-hodete trollet", "Fritaksmetoden", [6], "", [a20])

# ================================================================ Oppgave 21: eierskattekreditt (BS2)
rK, T, rf, gam = 0.07, 10, 0.03, 0.5
i_s = rf * (1 - t)
EK_ = (1 + rK) ** T
kred = te * (EK_ - gam * (1 + i_s) ** T)
f21_rf = te * (EK_ - gam * (1 + rf) ** T)
f21_ny = te * (EK_ - (1 + i_s) ** T)
f21_g = te * (EK_ - gam)
a21 = S.ledd("", "<p>Hva er forventet eierskattekreditt per krone i det etablerte selskapet ved horisonten? Avrund til fire desimaler.</p>",
    riktig=(f"Kr {kr(kred, 4)}", [kr(kred, 4)]),
    gale=[(f"Kr {kr(f21_rf, 4)}", [kr(f21_rf, 4)]),
          (f"Kr {kr(f21_ny, 4)}", [kr(f21_ny, 4)]),
          (f"Kr {kr(f21_g, 4)}", [kr(f21_g, 4)])],
    solution=sol(
        "Kreditten er eierskattesatsen ganget med forskjellen mellom forventet selskapsverdi og skjermingsgrunnlaget forrentet med skjermingsrenten. Skjermingsrenten er risikofri rente etter skatt: i = r<sub>f</sub>(1 − t).",
        [f"i = {kr(100 * rf, 1)} % × 0,78 = {kr(100 * i_s, 2)} %. (1 + i)<sup>{T}</sup> = {kr((1 + i_s) ** T, 4)}; × γ = {kr(gam * (1 + i_s) ** T, 4)}.",
         f"E(K) = 1,07<sup>{T}</sup> = {kr(EK_, 4)}.",
         f"Kreditt: 0,3784 × ({kr(EK_, 4)} − {kr(gam * (1 + i_s) ** T, 4)}) = <b>kr {kr(kred, 4)}</b>."],
        [(f"Kr {kr(f21_rf, 4)}", "risikofri rente 3 % brukt som skjermingsrente, uten (1 − t)."),
         (f"Kr {kr(f21_ny, 4)}", "γ = 1, som for et nystartet selskap."),
         (f"Kr {kr(f21_g, 4)}", "skjermingsgrunnlaget er ikke forrentet over horisonten.")],
        kontroll=f"Det nystartede selskapet får {kr(f21_ny, 4)}. Det etablerte har allerede (1 − 0,5) × 0,3784 = {kr(0.5 * te, 4)} i kreditt ved start.",
        kilde="BS2 s. 58–60"),
    dekker=["f4-bs2-02"])
S.oppgave("Nytt og etablert selskap", "Aksjonærmodellen", [5, 6],
    f"<p>Bjerksund og Schjelderup (BS2) regner forventet eierskattekreditt per krone investert som a × ((1 + r)<sup>T</sup> − γ(1 + i)<sup>T</sup>), der γ er skjermingsgrunnlaget per krone markedsverdi i dag og i skjermingsrenten. Et etablert selskap har γ = {kr(gam, 1)}. Forventet avkastning er r = {pst(rK, 0)}, horisonten T = {T} år, risikofri rente {pst(rf, 1)}, alminnelig skattesats 22 % og eierskatt a = 37,84 %.</p>",
    [a21])

S.skriv(label="F4 Aksjonærmodellen og fritaksmetoden",
        note="Skattereformene i 1992 og 2006, fritaksmetoden, aksjonærmodellen med skjerming per aksjepost, gevinst og tap, samlet skatt på selskap og eier, utbytte og formuesskatt, BS-modellen og Bjerksund–Schjelderup-artiklene.",
        facts=[f"{S.n} flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
               "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
               "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
               "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
        practiceNote="Før en skjermingstabell år for år med fire kolonner: grunnlag, fradrag, skattepliktig og saldo 31.12. Sjekk hvert år om saldoen ble brukt opp, for da faller grunnlaget tilbake til kostprisen.")
