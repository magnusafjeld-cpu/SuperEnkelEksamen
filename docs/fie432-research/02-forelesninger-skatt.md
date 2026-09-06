# FIE432 Personlig økonomi — kartlegging av skattedelen (forelesning 1–11, GS)

Kartlegging av Guttorm Schjelderups forelesninger høsten 2026, som grunnlag for
en lærebokløs manual. Kilder: tekstuttrekk av lysbildene i
`FIE432 Personlig Økonomi 31. aug/_tekst/`. Tall og formler er eksakte slik
forelesningen gir dem; prosaen er min. Alle regneeksempler er kontrollregnet i
Python (`kontroll.py`, se avsnitt 9).

**Notasjon i dette dokumentet**

- ⟨rekonstruert⟩ = formelen eller tallet var et bilde i lysbildet og finnes ikke
  i tekstuttrekket. Jeg har gjenskapt det fra standardteori og tallene rundt,
  og kontrollert at det reproduserer fasiten der fasit finnes.
- **[dagens regel]** = sats forelesningen presenterer som gjeldende norsk regel
  (2025/2026). **[eksempeltall]** = sats som bare er valgt for regneeksempelet.
- «Gammel versjon» = filene uten `NYE_`-prefiks (forrige gjennomkjøring av kurset).

---

## 0. Kildeoversikt og hva som mangler

### 0.1 Forelesningsplanen (H2026) — skattedelen

| Nr | Dato | Tema | Pensum | Lysbilder i mappa |
|---|---|---|---|---|
| 1 | 19.08 | Introduksjon: om skattesystemet i Norge | J, SSB1, SSB2 | `NYE_..._1GS_Innledning` (+ gammel) |
| 2 | 21.08 | Avkastningen på ulike aktiva over tid | J | `NYE_..._2GS_Avkastning...` (+ gammel) |
| 3 | 26.08 | Investeringer og skatt: eiendom, aksjer, obligasjoner, folkefinansiering | J | `NYE_..._3GS_Investeringscaser` + regneark `Oppgaver_Investeringscase_gjeld` |
| 4 | 28.08 | Aksjonærmodellen og fritaksmetoden | BS1, BS2, BS3, HBS | `NYE_..._4GS._Aksjonærmodellen...` (+ gammel `4og5GS`) |
| 5 | 02.09 | Aksjonærmodellen og fritaksmetoden (forts.) | BS1, BS2, BS3, HBS | samme fil som 4 |
| 6 | 04.09 | Effektivitet, skattearbitrasje, dobbeltbeskatning og demokrati | AS1, AS4 | **MANGLER** |
| 7 | 09.09 | Skatt/emigrasjon, «rettferdig skattesystem», flat skatt | AS3, AM, M, AJB | **MANGLER** |
| 8 | 11.09 | Formuesskatt og eiendomsskatt | BS4, AM, M | **MANGLER** |
| 9 | 16.09 | Hvem betaler egentlig skatten | S (Stiglitz) | `NYE_..._9GS_Hvem_betaler_skatten` |
| 10 | 18.09 | Skatt, aksjer og risiko | AS2, SW | `Forelesning_9GS_Skatt,_aksjer_og_risikotaking_Rev` (filnavnet sier 9, planen sier 10) |
| 11 | 23.09 | Skatteparadiser | GS1, SS | `Nye_oppgaver_Forelesning_11_GS_SkatteparadisREV` (+ gammel `10GS_Skatteparadis`) |

Forelesning 12–16 (Næss/Kvadsheim: sparing, pensjon, lån, finansiell
psykologi) er ikke del av denne kartleggingen.

### 0.2 Det som eksplisitt mangler

1. **Forelesning 6, 7 og 8 har ingen lysbilder i mappa.** Det er de tre
   forelesningene som dekker *skattearbitrasje og nøytralitet* (Sandmo,
   NOU 1989:14), *progressiv beskatning* (Sandmo 2016), *flat skatt* (Sandmo,
   NOU 1999:7), *emigrasjon/exit-skatt*, *formuesskatt og eiendomsskatt*
   (Bjerksund–Schjelderup 2021 «Investor asset valuation under a wealth tax»,
   Adam & Miller 2021, Magma 2026). Begreper som *skattearbitrasje*, *fast
   driftssted*, *unntaksmetode/kreditmetode*, *verdsettingsrabatt* og
   *gjeldsfordeling* nevnes derfor **ikke** som egne definisjoner i noen av
   lysbildene jeg har. Det som finnes om dem, står spredt i forelesning 1–5
   og 10 og er tatt med der. Manualen må hente disse temaene fra pensumartiklene
   eller fra eksamensoppgavene (`Eksamensoppgaver_*`), som ikke er del av denne
   kartleggingen.
2. **Formler som var bilder** er borte fra tekstuttrekket. Det gjelder blant
   annet effektiv-skattesats-brøken (F1), realavkastningsformelen (F2),
   alle NV-summene i eiendomscaset (F3), skjermingsrenteformelen (F4),
   inntektsskiftningsligningen (F4), insidensderivasjonen (F9),
   Domar–Musgrave-utledningen og V1/V2/V3 (F10). Alle er rekonstruert og merket.
3. **Fasit til oppgavene til forelesning 1/2** (Norske Furutrær, Milla) er bilder
   og mangler. Jeg har regnet dem selv.
4. Oppgavefilene er nummerert forskjøvet i forhold til planen:
   `Oppgaver_forelesning_1` = `Nye_oppgaver_Oppgaver_forelesning_2` (avkastning,
   hører til forelesning 2), `Nye_oppgaver_Oppgaver_forelesning_3` = gamle
   `Oppgaver_forelesning_2` (Anita, hører til forelesning 3),
   `Nye_oppgaver_Oppgaver_forelesning_4` («Oppgaver forelesning 3 med fasit»,
   formuesskatt/utbytte, hører til forelesning 4–5),
   `Nye_oppgaver_Oppgaver_forelesning_5` (Kjell Inge/Martine, forelesning 4–5),
   `Oppgaver_aksjer_skatt_og_risiko_(forelesning_9)` (hører til forelesning 10).
   Forelesning 9 og 11 har ingen oppgaver.

### 0.3 Satsene — dagens regler mot eksempeltall

**[dagens regel] slik forelesningene oppgir dem (2025/2026):**

| Sats | Verdi | Hvor |
|---|---|---|
| Alminnelig inntektsskatt (lønn, renter, selskapsoverskudd, leieinntekt, aksjegevinst før oppjustering) | 22 % | F1, F3, F4 |
| Oppjusteringsfaktor for utbytte/aksjegevinst | 1,72 | F4 |
| Eierskatt (effektiv nominell sats på utbytte og gevinst) | 22 % × 1,72 = 37,84 % | F1, F4 |
| Trinnskatt trinn 5 | 17,8 % over 1 467 200 kr (2026) | F3, F4 |
| Trygdeavgift lønn / næring | 7,6 % / 10,8 % (2026) | F4 / F3 |
| Høyeste marginalskatt på lønn (ekskl. AGA) | 47,4 % = 22 + 7,6 + 17,8 | F4 |
| Arbeidsgiveravgift | 14,1 % av lønn = 12,4 % av lønn + avgift | F4 |
| Skatt på næringsinntekt fra utleie (> 4 boenheter) | 50,6 % = 22 + 10,8 + 17,8 | F3 |
| Formuesskatt | 1,0 % ; 1,1 % over 20 mill. | F1, F4 |
| Bunnfradrag formuesskatt | 1,7 mill. (2025) | F1, F4 |
| Verdsettingsrabatt aksjer | 20 % | F1, F2, F4 |
| Verdsettingsrabatt primærbolig | 75 % under 10 mill. | F3 |
| Verdsettingsrabatt sekundærbolig | ingen | F3 |
| Unoterte aksjer, formuesverdi | bokført verdi (aktiva − gjeld) | F1, F2 |
| Børsnoterte aksjer, formuesverdi | kurs 1. januar i skattefastsettingsåret | F2 |
| Skjermingsrente 2025 | 3,6 % (3 mnd statskasseveksel 4,1 % + 0,5 pp, etter 22 % skatt) | F4 |
| Fritaksmetoden, 3 %-regelen | eierandel < 90 %: 3 % av utbyttet skattlegges med 22 % = 0,66 % | F4 |
| Aksjonærlån | skattlegges som utbytte; unntak < 100 000 kr tilbakebetalt innen 60 dager | F4 |
| Exit-skatt | 37,84 % av latent gevinst; betales ved utflytting, i avdrag over 12 år rentefritt, eller i sin helhet etter 12 år | F4 |
| 5-årsregelen | opphørt 29.11.2022 | F4 |
| Dokumentavgift | 2,5 % av kjøpesum | F3 |
| Utlånsforskriften | gjeld ≤ 5 × brutto årsinntekt; belåning ≤ 90 %; tåle +3 pp rente; avdrag hvis belåning > 60 %; fleksikvote 10 % (8 % Oslo) | F3 |
| Skattefri utleie | du bruker selv ≥ halvparten målt etter utleieverdi | F3 |
| Skattefritt boligsalg | eid ≥ 1 år og bodd der ≥ 12 av siste 24 mnd | F3 |
| Ekspropriasjon, kapitaliseringsrente | Høyesterett: realrente, ikke lavere enn 4 % | F2 |
| Kursgodkjenning | 17 av 20 rett; eksamen: 3 poeng rett / −1 feil (eller 6 / −2) | F1 |

**[eksempeltall] (må ikke læres som regler):**

| Tall | Brukes i |
|---|---|
| 34 % skatt, 4 % diskontering (Pia og minstefradraget) | F1 |
| 3 % inflasjon; utbytte 5 på aksje kjøpt 100 solgt 98 | F2 |
| 4,35 % avkastning eiendomsfond → «3 %» etter skatt; 4,4 % i appendiks | F3 |
| 3,5 % og 6 % lånerente; 18 % prisstigning over 3 år; 18 % EK-andel | F3 |
| 20 % lånerente, 90 %/80 % suksess (crowdlending) | F3 |
| 6 % utbytte, 10 mill. investering | F4 |
| 12,22 % realavkastning på aksjer (Norge etter 1980, Jordà) som diskonteringsrente | F4 |
| AERT 13,1 % (Hopland 2024) / 14 % / 7 %; formuesverdi 35 % av markedsverdi | F4, oppg. |
| Skjermingsrente 5 %/10 %, eierskatt 25 %, faktor 1,6 (Kjell Inge — 2020-regler) | oppg. F5 |
| Eierskatt 31,68 % (2021), 34 % (Skatteutvalget); formuesskatt 0,85 %; rabatt 45 %/0 %; bunnfradrag 1,5/6,4 mill. | oppg. F4 |
| 40 % skatt; 100 000 investert; A 20 % sikkert, B forventet 25 % | F10 |
| Obligasjon A 8 % skattlagt, B 6 % skattefri; marginalskatt 30 %/20 % | F10 |
| r_f 4 %, E[r] 10 %, σ 20 %, β 1,2, A = 3 / 1 | F10 |
| 10 % avkastning, 22 % skatt, 45 % marginalskatt (Benedicte) | oppg. F10 |
| Stykkskatt 1 kr, pris 5 → 5,6, kvantum 100 → 90 | F9 |

---

## 1. Forelesning 1 — Introduksjon: om skattesystemet i Norge

Fil: `NYE_FORELESNINGER_Forelesning_1GS_Innledning.txt` (44 lysbilder).
Forelesningen er et blandet opplegg: kursinformasjon, en polemikk mot
«kampanjejournalistikk» om formuesskatt, en definisjonsrunde om progressivitet
og effektiv skattesats, ulikhetstall Norge/USA, og to små regneeksempler som
setter tonen for hele kurset (etter-skatt-tenkning og tidsverdien av fradrag).

### Begreper

| Begrep | Definisjon slik forelesningen gir den |
|---|---|
| **Progressivt skattesystem** | Andelen av inntekten som betales i skatt, *øker* med inntekten. At de rike betaler flere kroner er ikke nok. |
| **Effektiv skattesats** | Betalt skatt delt på brutto inntekt. ⟨rekonstruert brøk⟩ For en aksjonær må telleren inkludere aksjonærens andel av selskapets skatt og nevneren aksjonærens andel av selskapets bruttoinntekt — ellers blir eiere uten utbytte «nullskatteytere». |
| **Personlig aksjonær** | Fysisk person som eier aksjer direkte (i motsetning til selskapsaksjonær). Skattlegges etter aksjonærmodellen. |
| **Eierskatt** | Skatten på utbytte og aksjegevinst til personlig aksjonær: 37,84 %. |
| **Trinnskatt** | Progressiv tilleggsskatt på personinntekt på toppen av 22 %. |
| **Unotert (ikke-børsnotert) selskap** | Verdsettes for formuesskatt til bokført verdi (aktiva − gjeld), ikke markedsverdi. |
| **Aksjerabatt / verdsettingsrabatt** | 20 % reduksjon i formuesverdien av aksjer. |
| **Bunnfradrag** | 1,7 mill. (2025) trekkes fra formuesgrunnlaget før sats. |
| **Formuesskattesats** | 1 % ; 1,1 % over 20 mill. |
| **Latent / tilbakeholdt overskudd** | Overskudd som ikke er utbetalt som utbytte. Forelesningens påstand: det er reelt eid av aksjonæren fordi det kapitaliseres i aksjekursen (børsnotert) eller kontrolleres av dominerende eier (unotert). |
| **Markedsinntekt** | Inntekt før skatt og overføringer (brukes i SSB-tallene). |
| **Lærepunktet** | Vi investerer der avkastningen *etter* skatt er høyest; samfunnet vil ha investeringer der avkastningen *før* skatt er høyest. Skattefavorisering kan gi høy etter-skatt- og lav før-skatt-avkastning. |

### Formler og regler

1. **Progressivitet:** systemet er progressivt hvis T(Y)/Y er stigende i Y.
2. **Effektiv skattesats** = betalt skatt / brutto inntekt. ⟨rekonstruert⟩
   For eier med selskapsandel α: (α · selskapsskatt + personlig skatt) /
   (α · selskapets bruttoinntekt + annen inntekt).
3. **Formuesskatt** = (formuesverdi × (1 − rabatt) − bunnfradrag) × sats.
   Unotert: formuesverdi = bokførte eiendeler − gjeld. **[dagens regel]**
4. **Etter-skatt-beløp** = før-skatt × (1 − t). Indifferens mellom to inntektstyper:
   R_rente × (1 − 0,22) = G_aksje × (1 − 0,3784).
5. **Nåverdi av et fradrag** = t × fradrag / (1 + r)^i. Et fradrag i dag er verdt
   mer enn samme fradrag senere, så lenge inntekten dekker fradraget.
6. **Null forventet gevinst av gjetting** på MC med 4 alternativer:
   ¼ × R − ¾ × F = 0 → F = R/3. Derfor 3/−1 eller 6/−2.

### Regneeksempler

**E1.1 Anines formuesskatt (VG-oppslaget).** Investor betaler 10 mill. for 10 %
(«verdsettelse 100 mill.»). Anine eier 50 % av resten = 45 % av selskapet.
- Anines regnestykke: 45 mill. × 1,1 % = **495 000 kr**. ✓
- Feilen: selskapet er unotert → formuesverdi = bokført: 10 mill. innskudd − 0
  gjeld = 10 mill. Anines andel 4,5 mill. Med aksjerabatt og bunnfradrag:
  (4,5 mill. × (1 − 0,20) − 1,7 mill.) × 1 % = (3,6 − 1,7) × 1 % = **19 000 kr**. ✓
- Kommentar: hadde selskapet vært børsnotert til 100 mill. var hun i sin rett;
  smarte eiere tar selskaper *av* børs for å senke formuesverdien; i praksis
  brukes innskuddet opp gjennom året, så bokført verdi blir enda lavere.

**E1.2 Pia og Nico — progressivitet.** Pia tjener 1 000, Nico 5 000, begge 25 %
skatt. Nico betaler 5 ganger så mye i kroner, men samme andel → ikke progressivt.

**E1.3 Pia og Nico — effektiv skattesats og «eierløst» overskudd.** Pia: 20 mill.
i bank gir 1 mill. rente, 22 % → 220 000, effektiv sats 22 %. Nico: eneeier av
selskap med 1 mill. overskudd, selskapsskatt 22 % → 220 000, tar ikke utbytte.
Godtar vi at Nico ikke eier overskuddet, har han ingen inntekt og ingen effektiv
skattesats; SSB registrerer ham som «fattig» til utbyttet tas.

**E1.4 Aksjegevinst eller renteinntekt?** 100 000 i rente etter 22 % =
**78 000**. 125 482 i aksjegevinst etter 37,84 % = 125 482 × 0,6216 = **78 000**.
Indifferent. ✓ (Indifferensbeløpet er 78 000 / 0,6216 = 125 483.) Spørsmålet
forelesningen stiller og lar henge: hvorfor er satsene ulike? (Svaret kommer i
F4: oppjusteringsfaktoren skal hindre inntektsskifting fra lønn til utbytte.)

**E1.5 Verdien av skattefradrag (Pia og Listhaug).** Inntekt 600 000 i 3 år,
minstefradrag 100 000/år, skatt 34 %, diskontering 4 % **[eksempeltall]**.
- Dagens ordning: 34 000 spart hvert år. NV = 34 000/1,04 + 34 000/1,04² +
  34 000/1,04³ = **94 353**. ⟨rekonstruert sum⟩
- Listhaug: hele 300 000 i år 1 → 102 000 spart. NV = 102 000/1,04 = **98 077**.
- Differanse **3 724 ≈ «ca. 3 700»**. ✓ (Diskonteres ikke år 1, blir differansen
  3 873, så forelesningen diskonterer alle tre årene.)
- Regel: ta fradraget med en gang hvis inntekten overstiger fradraget.
  Gammel versjon hadde et ekstra lysbilde med forbeholdene: lavere marginalskatt
  i år 1, eller fradrag større enn inntekten det året (uten fremføring), kan snu
  konklusjonen.

### Argumenter

- **«De rike betaler mest, altså er systemet progressivt» → progressivitet
  handler om andel, ikke kroner → påstanden er feil** (E1.2).
- **«Aksjonærer eier ikke overskuddet før utbytte» → tilbakeholdt overskudd
  kapitaliseres i børskursen, og alle kan realisere ved å selge aksjer;
  unoterte selskaper kontrolleres av majoritetseier som velger utbyttetidspunkt →
  påstanden forutsetter at man ikke tror på markedsmekanismen, og gjør at
  ulikhet og effektiv skatt undervurderes.**
- **Pensjonsrettigheter i folketrygden som «formue» → utbetalingene finansieres
  av samme befolkning, forsvinner ved død og kan ikke arves → gir ikke et
  dekkende bilde av fordelingen. Privat pensjonsfondsandel som arves er derimot
  reell formue.** (Motargument: hvis pensjon er formue, er lønn det også — hva
  er formuen til en ufør 25-åring?)
- **Media og lobby → «det kan være sant selv om det står i avisen», men
  næringslivspressen driver kampanjejournalistikk (Anine-saken ble brukt i
  valgkampen) → skattemeninger er oftere politikk enn fag.**
- **Pengemakt er politisk makt → finansiering av politikk, medieeierskap,
  tenketanker, tilgang, nettverk (Rokkan: «stemmer teller, ressurser avgjør») →
  økt ulikhet bekymrer fordi den forskyver makt.**
- **Skattefavorisering → vi investerer etter etter-skatt-avkastning → kapital
  går ikke dit før-skatt-avkastningen (samfunnets avkastning) er høyest.**

### Empiri

| Fakta | Verdi | Kilde |
|---|---|---|
| Andel selskaper i Norge eid av utlendinger | ca. halvparten (svensker, dansker, amerikanere) | DN-kommentar |
| Inntektsvekst 2001–2018, gjennomsnittshusholdning | Norge 50 %, USA 25 % | Aaberge mfl. 2021 |
| Inntektsvekst nederste 20 % | **USA 35 %, Norge 21 %** (påstand 2 er riktig) | samme |
| Inntektsvekst middelklasse / øvre middelklasse | Norge 38 % / 47 %; USA 20 % / 32 % | samme |
| Inntektsvekst topp 1 % | Norge **187 %**, USA 45 % | samme |
| Topp 1 % andel av markedsinntekt, Norge 2004–2018 | 11 % → 30 % | samme |
| Markedsinntekt til topp 1 % | 25–30 % | samme |
| Antall personer topp 1 % / topp 0,01 % | ca. 40 000 / 300–400 | samme |
| Topp 1 % andel av total formue 1995 → 2016 | 14,8 % → 21 % (drevet av aksjekonsentrasjon) | Aaberge mfl. 2020 |
| Effektiv gjennomsnittsskatt langs fordelingen (2004) | øker til 99. prosentil, faller til ca. 22 % for topp 1 %, ca. 14 % for topp 0,1 % (3 700 personer) → **regressiv på toppen** | Aaberge mfl. 2020 |
| Selskapsskatt siden midten av 80-tallet | 50,8 % → 22 % | |
| Formuesgrunnlag aksjer hos de aller rikeste | ca. 10 % av markedsverdi | Ring, Seim & Zucman 2026 |
| Topp 0,01 % (ca. 300 husholdninger, 2010) skjult i skatteparadis | ca. 20 % av formuen | Alstadsæter, Johannesen & Zucman 2019 |
| Inntekt vs formue over tid | inntekten svak vekst, formuen dramatisk — fordi utbytte ble mindre lønnsomt etter 2006 og aksjeverdiene steg | Aaberge 2020/2024 |
| Formuesskatt | 1 % / 1,1 % over 20 mill.; bunnfradrag 1,7 mill. | |

### Oppgavene

Ingen egen oppgavefil for forelesning 1 (filen `Oppgaver_Oppgaver_forelesning_1`
inneholder avkastningsoppgavene som hører til forelesning 2 — se avsnitt 2).

### Nytt / fjernet mot gammel versjon

- **Fjernet:** Innovasjon Norge-eksempelet; Gilens & Page; Moene 2015 («fire
  ganger så mange rike i Norge, dobbelt så mange superrike»); «Hvorfor lykkes
  Norge bedre enn USA»; forbeholdslysbildet til Listhaug-eksempelet; hele
  bolken om **Old view / New view / New new view / Lock-in** om utbytteskatt
  (Harberger/Poterba–Summers; King/Auerbach/Bradford; Chetty & Saez 2005 —
  utbytteskattekutt 38,6 % → 15 % ga store umiddelbare utbytteøkninger,
  prinsipal–agent-perspektiv; lock-in = skattekreditt ved tilbakeholdelse).
  Denne bolken finnes ikke i noen ny fil, men er relevant pensumstoff (BS1).
- **Nytt:** «Fun facts»-lysbildene (Aaberge 2020, Ring 2026, Alstadsæter 2019),
  pensjonsformue-diskusjonen, «det kan være sant selv om det står i avisen»,
  DN/utenlandsk eierskap, spørsmålet «hvorfor ulik sats på rente og
  aksjegevinst?».

---

## 2. Forelesning 2 — Avkastningen på ulike aktiva over tid

Fil: `NYE_FORELESNINGER_Forelesning_2GS_Avkastning_over_tid_på_ulike_aktiva.txt`
(56 lysbilder). Tre deler: formuesfordeling og hvorfor de rike eier unoterte
aksjer; Jordà et al. (2019) «The rate of return on everything»; og
avkastningsregning (nominell, real, etter skatt, superprofitt, evig
kontantstrøm) med en to-periodemodell for skatt, rente og konsum.

### Begreper

| Begrep | Definisjon |
|---|---|
| **Totalavkastning (R)** | Kapitalgevinst (prisendring) + direkteavkastning (utbytte/leie/kupong), delt på inngangsverdi. |
| **Yield / direkteavkastning** | Netto kontantstrøm fra aktivumet i prosent av verdien. For eiendom: husleie − vedlikehold/utgifter. |
| **Kapitalgevinst** | Prisendring i prosent av kjøpsverdi (kan være negativ). |
| **Realavkastning** | Nominell avkastning korrigert for inflasjon. |
| **Superprofitt («excess return»)** | Avkastning ut over risikofri rente; ofte kalt risikopremien. |
| **Risikable aktiva** | Eiendom (housing) og aksjer (equity). |
| **Sikre aktiva** | Statsobligasjoner. (Høyrenteobligasjoner er risikable og selskapsknyttet — ikke med hos Jordà.) |
| **r > g** | Pikettys betingelse: avkastning på formue over vekstraten → kapitaleiere blir relativt rikere. Jordà finner r > g. |
| **Idiosynkratisk risiko** | Risiko knyttet til ett enkelt hus eller én aksje; kan diversifiseres bort i fond, ikke ved å eie ett hus. |
| **Mean reversion** | Tendens til at markeder beveger seg mot langsiktige gjennomsnitt. |
| **NOTC-listen** | Liste for unoterte aksjer; SSB-studier bruker den til å måle formuesverdi mot markedsverdi. |
| **Skattefastsettingsåret** | Året etter skatteåret; børsnoterte aksjer verdsettes til kursen 1. januar dette året. |
| **Kapitaliseringsrente** | Diskonteringsrenten som brukes for å verdsette en evig kontantstrøm ved ekspropriasjon. |
| **Tidspreferanserate** | Hvorfor vi sparer selv med lik inntekt i alle perioder: utålmodighet mot avkastning. |
| **Substitusjons- og inntektseffekt** | Slutsky-dekomponering av virkningen av renteendring på konsum i dag. |
| **Låntaker / långiver** | Y₁ − C₁ < 0 (låner) eller > 0 (sparer). Avgjør fortegnet på inntektseffekten. |

### Formler og regler

1. **Totalavkastning én periode** ⟨rekonstruert⟩:
   R = (P₁ − P₀ + Y₁) / P₀ = (P₁ − P₀)/P₀ + Y₁/P₀ = kapitalgevinst + direkteavkastning.
   Flerperiode: R_{i→j} måler fra kjøp i periode i til salg i periode j.
2. **Realavkastning** ⟨rekonstruert⟩: 1 + r = (1 + i)/(1 + π), der i er nominell
   avkastning og π inflasjon. Approksimasjon r ≈ i − π, «ok så lenge π ikke er
   veldig stor».
3. **Med skatt:** nominell etter skatt = i × (1 − t); real ≈ i(1 − t) − π.
4. **Superprofitt** = r − r_f. Lysbildet merker r som *real*avkastning og r_f som
   *nominell* sikker rente («sikker avkastning (nominell!)») — en inkonsistens
   forelesningen selv setter utropstegn ved. Vanlig antakelse: r_f =
   3-måneders statskasseveksel.
5. **Fire komponenter i avkastning:** (+) yield, (±) kapitalgevinst, (−) skatt,
   (−) inflasjon.
6. **Evig kontantstrøm:** V = CF / r. Ekspropriasjon: leie 1 mill./år, r ≥ 4 %
   real → V = 1 mill. / 0,04 = **25 mill.** ⟨rekonstruert tall⟩ Med 7 %: 14,3 mill.
   Poenget: leieinntekten er nominell, men Høyesterett krever realrente —
   «juristene kan ikke regne».
7. **Rente etter skatt:** r(1 − t). Skatt opp virker som rente ned (og omvendt).
   Gammel versjon skrev også låntakerens rente etter fradrag: r_L(1 − t).
8. **To-periodemodellen** ⟨rekonstruert⟩: Periode 1: C₁ + S = Y₁. Periode 2:
   C₂ = Y₂ + S(1 + r(1 − t)). Slått sammen:
   C₂ = Y₂ + (Y₁ − C₁)(1 + r(1 − t)). Budsjettlinjens stigningstall er
   −(1 + r(1 − t)); r opp eller t ned gjør linjen brattere → mer lønnsomt å spare.
9. **Slutsky-ligningen** ⟨rekonstruert⟩: dC₁/dr = substitusjonseffekt (−) +
   (Y₁ − C₁) × inntektseffekt. Låntaker (Y₁ − C₁ < 0): begge negative →
   konsumet i dag faller entydig når renten stiger. Långiver: inntektseffekten
   har motsatt fortegn → totaleffekten er ubestemt.
10. **Skattefrihet ved ekspropriasjon:** primærbolig skattefri hvis eid > 1 år og
    brukt som egen bolig minst 1 av siste 2 år; næringseiendom skattepliktig,
    men kan utsettes ved reinvestering innen 3 år. **[dagens regel]**

### Regneeksempler

**E2.1 Aksje: kjøpt 100, solgt 98, utbytte 5, inflasjon 3 %.**
Nominell: (98 − 100 + 5)/100 = **3 %**. Real: 1,03/1,03 − 1 = **0 %** (eksakt
og approksimert). ✓

**E2.2 Samme med skatt.** Skattesatsen var et bilde. Med t = 22 %: nominell
etter skatt 2,34 %, real ≈ −0,66 % (eksakt −0,64 %). Med t = 37,84 %: 1,86 %,
real ≈ −1,14 %. Poenget: etter skatt og inflasjon er realavkastningen negativ.

**E2.3 (lysbilde 13) Kjøpt 1.1.2025 for P₀, solgt 1.1.2026 for P₁, utbytte 10.**
Tallene var bilde; strukturen er E2.1.

**E2.4 Ekspropriasjon:** 1 mill./år, 4 % → 25 mill. (E2 punkt 6).

**E2.5 Renteøkning for låntaker (figur):** A → B substitusjonseffekt (C₁ ned),
B → C inntektseffekt (C₁ ned siden Y₁ − C₁ < 0). Tegnet slik at C₂ er uendret,
men C₂ kan også falle.

### Argumenter

- **Bør vi kopiere de rikeste? → de eier aksjer, 2/3 unoterte, og lite eiendom
  → unoterte aksjer sparer formuesskatt (bokført verdi), men er illikvide,
  informasjonsasymmetriske og dominert av innsidere → ja for å spare
  formuesskatt, men vanskelig for småsparere. Hardere beskatning av eiendom vil
  øke ulikheten (de rike eier relativt lite eiendom).**
- **r > g → kapitaleiere akkumulerer raskere enn økonomien vokser → forklarer
  økt ulikhet i mange land (Jordà bekrefter Piketty empirisk).**
- **Eiendom har lik avkastning og halvparten så høyt standardavvik som aksjer →
  er eiendom «åpenbart bedre»? → Jordàs tall er en eiendoms*portefølje*; ett
  hus bærer idiosynkratisk risiko (Gjerdrum; regionale forskjeller) som ikke
  kan diversifiseres bort → nei, for en som må eie ett hus.**
- **Høy inflasjon → renten på bank/obligasjoner justeres ikke, mens bedrifter
  og husleiekontrakter kan justere priser → i krig/uro (som gir inflasjon)
  taler historien for aksjer/eiendom framfor rentepapirer.**
- **Aksjer i Sverige/Danmark/Finland slo Norge 1980–2015 → bør vi kjøpe nordisk
  indeks? → historiske priser er ingen garanti; Norge er spesielt etter 2015
  (olje slår inn, tjener på uro) → historiske data brukes til å kalibrere
  forventninger, forstå risiko og kriseatferd, ikke til å velge land.**
- **Ekspropriasjon → Høyesterett: erstatningen skal gjenskape kontantstrømmen,
  diskontert med ≥ 4 % realrente → leien er nominell og Oljefondet oppnår
  bare i underkant av 4 % realt → den eksproprierte må «slå oljefondet» for
  å komme skadesløs fra det; ofte brukes 7 % real, som er enda verre.**
- **Skatt er makro → skatt endrer avkastning på sparing, som endrer konsum,
  som endrer priser → for låntakere (flertallet av norske husholdninger)
  reduserer høyere rente/lavere skattefradrag konsumet entydig →
  sammensetningen låntakere/långivere bestemmer virkningen på økonomien og
  boligprisene.**

### Empiri

| Fakta | Verdi | Kilde |
|---|---|---|
| Formuessammensetning norske husholdninger, brutto 2025 | primærbolig 52 %, sekundærbolig/eiendom 14 %, bank 13 %, aksjer/verdipapirer 11 %, annen finanskapital 5 %, næringseiendeler 5 % | SSB |
| Topp 1 % | eier mest aksjer, 2/3 unoterte, relativt lite eiendom | Aaberge 2021 |
| I formuesskatteposisjon | de 10 % rikeste (gammel versjon: 5 %) | |
| Formuesverdi unoterte aksjer (NOTC) | 40–50 % under markedsverdi; med 20 % rabatt 32–40 % av markedsverdi | SSB |
| Formuesgrunnlag hos de aller rikeste | ned mot 10 % av markedsverdi | Ring mfl. 2026 |
| Jordà 1870–2015: totalavkastning real | **eiendom 7,3 %, aksjer 6,7 %** per år | Jordà et al. 2019 |
| Realprisstigning eiendom | ca. 1 % per år | samme |
| Risikopremie | 6–8 % i snitt; høyere i krig (gammel versjon: 4–5 % i fredstid) | samme |
| Standardavvik | eiendom ca. 10, aksjer ca. 24 («nesten dobbelt») | samme |
| Aksjer vs eiendom over tid | eiendom best før 2. verdenskrig; aksjer best etter (1950–2015); små forskjeller over hele perioden | samme |
| Kovarians aksjer/eiendom | lav → diversifiseringsgevinst (jf. Oljefondet) | samme |
| Safe return 1950–1980 | lav pga. høy inflasjon; høyere relativt etter 1980 | samme |
| Norden vs Norge 1980–2015 | svenske, danske, finske aksjer slo norske | samme |
| KLP AksjeNorge Indeks (OSEBX), medio aug. 2026 | 1 år 27,4 %, 3 år 18,8 %, 5 år 12,4 %; kostnad 0,10 % | KLP |
| KLP AksjeNorden Indeks | 6,4 % / 8,9 % / 5,0 %; kostnad 0,10 %; valutarisiko SEK/DKK/EUR | KLP |
| DNB Norge Indeks A | 27,0 % / 18,7 % / 12,7 % | DNB |
| Avanza Zero (OMXS30) | 28,3 % / 16,1 % / 9,6 % | |
| Sparinvest INDEX OMX C25 | 14,0 % / 4,2 % / 0,2 % | |
| Oljefondet 2024 | 13,1 % i valutakurv før kostnader; aksjer 18,2 %; rente 1,3 %; unotert eiendom −0,6 %; unotert infrastruktur −9,8 %; realavkastning årlig «rett under 4 %»; aksjer 72,1 %, rente 25,8 % av porteføljen | NBIM |
| Høyesterett, kapitaliseringsrente | ikke lavere enn 4 % real | |
| Boligmarkedet 2020 | god snittavkastning, men stor regional og lokal spredning (Gjerdrum) | |

### Oppgavene (`Oppgaver_Oppgaver_forelesning_1` = `Nye_oppgaver_Oppgaver_forelesning_2`)

**Oppgave 1 — Norske Furutrær.** Kjøpt 1.1.2022 til 100, solgt 1.1.2023 til 110,
utbytte 5. Inflasjonen står i et bilde som mangler; 3 mnd statskasseveksel 2 %.
- Nominell: (110 − 100 + 5)/100 = **15 %**.
- Real (eksakt): 1,15/(1 + π) − 1. Med π = 3 %: 11,7 %; π = 5 %: 9,5 %.
  Approksimert 15 % − π.
- Superprofitt = realavkastning − 2 % (slik forelesningen definerer det, med
  nominell r_f): 9,7 % ved π = 3 %.
  (Fasit var bilde — tallene over er mine.)

**Oppgave 2 — Milla.** Sekundærbolig kjøpt 4 mill., solgt 3,9 mill. etter ett
år, leie etter skatt 200 000, inflasjon 6 %.
- Nominell: (3,9 − 4 + 0,2)/4 = **2,5 %**.
- Real: 1,025/1,06 − 1 = **−3,3 %** (approksimert 2,5 − 6 = −3,5 %).
  (Fasit var bilde.)

Oppgavene tester: dekomponering i kapitalgevinst + yield, real vs nominell,
superprofitt. Kjernen er formlene 1–4 over.

### Nytt / fjernet mot gammel versjon

- **Nytt:** indeksfondtabellene (KLP, DNB, Avanza, Sparinvest, 2026),
  «Norge er spesielt etter 2015», NBIM-allokering, skatt ved ekspropriasjon,
  regneeksempel med skatt, Høyesterett «ikke lavere enn 4 %» (gammel: «skal være
  4 %»), tallene 7,3 %/6,7 % (gammel: «ca. 7 %»), «10 % rikeste» (gammel: 5 %).
- **Fjernet:** eksplisitt lysbilde om rentefradrag r_L(1 − t) og at t opp virker
  som r ned; «leie og investere differansen vs kjøpe» som to boligstrategier;
  «risikopremie 4–5 % i fredstid».
