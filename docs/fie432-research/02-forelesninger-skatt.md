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

---

## 3. Forelesning 3 — Investeringer og skatt: eiendom, aksjer, obligasjoner, folkefinansiering

Fil: `NYE_FORELESNINGER_Forelesning_3GS_Investeringscaser.txt` (66 lysbilder) og
regnearket `Oppgaver_Investeringscase_gjeld.txt`. Ingen gammel versjon av denne
forelesningen ligger i mappa. Tre deler: et gjennomregnet eiendomscase (leilighet
i Sandviken, fire varianter av finansiering × utleie, sensitivitet og et appendiks
om riktig diskonteringsrente); folkefinansiering og gråmarked med et regneeksempel
på hva tapsfradrag er verdt; og korte bolker om aksjer (passiv/aktiv, ASK) og
high-yield-obligasjoner. Alle NV-summene var bilder og er rekonstruert — de
reproduserer lysbildenes tall på kronen (495 675 og −271 547).

### Begreper

| Begrep | Definisjon slik forelesningen gir den |
|---|---|
| **Gearing / brekkstangeffekt** | Lånefinansiering øker avkastningen på egenkapitalen når totalavkastningen på investeringen er høyere enn lånekostnaden — og forsterker tapet når den er lavere. |
| **Utlånsforskriften** | Gjeld ≤ 5 × brutto årsinntekt; belåningsgrad ≤ 90 %; låntaker må tåle +3 pp rente; avdrag hvis belåningsgrad > 60 %; bankene kan fravike for 10 % av lånene (8 % i Oslo). **[dagens regel]** |
| **Belåningsgrad** | Gjeld i prosent av kjøpesum. Caset bruker 18 % EK → 82 % belåning. |
| **Annuitetslån** | Likt terminbeløp hver måned; renteandelen faller over tid. |
| **Stresstest** | Rentekostnad ved lånerente + 3 pp (5 % → 8 %). |
| **Primærbolig** | Boligen du bor i: skattefri utleie av del, skattefritt salg, 75 % verdsettingsrabatt under 10 mill. |
| **Sekundærbolig** | Utleiebolig: 22 % på netto leie, 22 % på gevinst (fradrag for tap), ingen formuesrabatt. |
| **Skattefri utleie** | Du bruker selv minst halvparten målt etter *utleieverdi* (ikke areal). Da rapporteres ikke leien, men du får heller ingen fradrag. |
| **Skattepliktig utleie** | 22 % av (leie − fradragsberettigede kostnader). Mer enn fire boenheter = næring, 50,6 %. |
| **Fradragsberettigede utleiekostnader** | Kommunale avgifter, eiendomsskatt, forsikring, vedlikehold (ikke standardheving), felleskostnader (ikke avdrag/renter på fellesgjeld), strøm/renhold hvis inkludert, annonsering/visning, festeavgift, reiser, depositumsgebyr, slitasje på innbo. |
| **Eiertid / botid / brukshindring** | Skattefritt salg krever eid ≥ 1 år og bodd ≥ 12 av siste 24 mnd (kan være usammenhengende). Flytting pga. jobb/utdanning/sykdom man ikke visste om ved kjøp, gir fortsatt botid. |
| **Dokumentavgift** | 2,5 % av kjøpesum; ikke fradragsberettiget. |
| **Meglerutgifter** | 150–170 000; fradragsberettiget mot salgsgevinsten. Forelesningen lar dok.avgift og megler «utligne hverandre». |
| **Diskonteringsrente etter skatt** | Uvektet fondsavkastning 4,35 % × (1 − 0,22) ≈ 3 %. |
| **EK-rentabilitet** ⟨rekonstruert⟩ | Nåverdi delt på investert egenkapital. Det er dette prosentene 8,3 %, 12 %, 70 %, 45 %, −21,2 % og −4,5 % er. |
| **Break-even salgspris** | Salgssummen som gir NV = 0. |
| **Alternativkostnad (appendiks)** | Leier du ut hele leiligheten, må du bo et annet sted; forelesningen setter kostnaden lik leien for ett rom, 87 000. |
| **Crowdlending / folkefinansiering** | Mange långivere finansierer et prosjekt via digital plattform (Kameo, Oblinor, Monio, Kredd). Renteinntekt skattlegges, tap er fradragsberettiget, plattformen tredjepartsrapporterer. |
| **Belønningsbasert crowdfunding** | Donasjon mot gjenytelse (Spleis, Bidra, Kickstarter, IndieGoGo). Tap gir *ikke* fradrag → krever høy avkastning. |
| **Egenkapitalbasert crowdfunding** | Aksjer kjøpt via plattform: utbytte/gevinst og formuesverdi skal i skattemeldingen. |
| **Gråmarkedslån** | Direkte avtale låntaker–långiver (evt. mellommann). 22 % på rente, selvrapportering, *tap kan ikke fradras* mens gevinst skattlegges. |
| **Prioritet** | Gråmarkedslån har typisk 2. eller 3. prioritet, og det kan være mange med 2. prioritet du ikke vet om. |
| **Risikonøytral investor** | Bryr seg bare om forventet avkastning, ikke spredningen. Brukes i tapsfradragseksempelet. |
| **Markedsporteføljen** | Standardteori (Merton 1969, Tobin 1958): invester passivt i indeksfond. |
| **ASK (aksjesparekonto)** | Kjøp/salg innenfor kontoen er skattefritt; skatt først ved uttak av gevinst (skattekreditt); innskutt beløp kan tas ut skattefritt; ubenyttet skjerming akkumuleres på kontonivå; «gratis opsjon» på realisasjonstidspunkt og skattesats. |
| **High-yield-obligasjon** | Selskapsobligasjon med høy rente (10–20 %) fordi risikoen er høy; kan konverteres til aksjer ved mislighold (DOF Subsea). Rente skattlegges 22 %. |

### Formler og regler

1. **Utlånsforskriften:** G ≤ 5 · Y; G/K ≤ 0,90; tåle r + 3 pp; avdrag hvis
   G/K > 0,60. **[dagens regel]**
2. **Annuitet** ⟨rekonstruert⟩: terminbeløp = L · m / (1 − (1 + m)^−n), m = r/12.
3. **Rentekostnad etter skatt** = L · r · (1 − 0,22). Faller alminnelig sats,
   faller fradragsverdien — men også skatten på lønn.
4. **Brekkstangformelen:** R_E = R_A + (R_A − R_G) · G/E, der R_A er avkastning
   på totalkapital, R_G lånerente, G/E gjeldsgrad.
5. **Netto leieinntekt** = leie − fradragsberettigede kostnader; etter skatt
   × (1 − 0,22) for sekundærbolig. Utleie av ett rom i egen bolig: hele leien
   skattefri, ingen fradrag.
6. **Skatt på salgsgevinst** = (S − K) × 22 % for sekundærbolig. Primærbolig
   med eiertid/botid oppfylt: 0. **[dagens regel]**
7. **Diskonteringsrente:** r = 4,35 % × 0,78 = 3,39 %, forelesningen bruker
   «3 %». Appendiks: er kontantstrømmen skattefri, skal renten være *før*
   skatt (4,4 %).
8. **NV, egenkapitalfinansiert** ⟨rekonstruert⟩:
   NV = −K + Σ_{i=1}^{3} CF_i/(1 + r)^i + (S − T_gev)/(1 + r)³.
9. **NV, gearet og avdragsfritt** ⟨rekonstruert⟩:
   NV = −EK + Σ_{i=1}^{3} (leie − renter etter skatt)/(1 + r)^i + S/(1 + r)³ − L/(1 + r)³.
10. **EK-rentabilitet** ⟨rekonstruert⟩ = NV / investert EK.
11. **Break-even salgspris:** S* = L + (1 + r)³ · (EK + Σ |CF_i|/(1 + r)^i)
    (fra lysbilde 34, løst algebraisk).
12. **Formuesskatt sekundærbolig** = K × 1 % uten rabatt; primærbolig får 75 %
    rabatt under 10 mill. **[dagens regel]**
13. **Forventet avkastning, risikonøytral långiver** ⟨rekonstruert⟩:
    med tapsfradrag E = p · R · (1 − t) − (1 − p) · I · (1 − t);
    uten tapsfradrag E = p · R · (1 − t) − (1 − p) · I.
    Break-even-rente uten fradrag: R* = (1 − p) · I / (p · (1 − t)).
14. **Evig etter-skatt-strøm (Anita-oppgaven):** V = CF(1 − t) / (r(1 − t)) =
    CF / r. Når både strøm og avkastningskrav skattlegges med samme sats,
    kansellerer skatten.

### Regneeksempler

**E3.1 Låneforskriften og renten.** Inntekt 600 000 → kan låne 5 × = **3 mill.**
Annuitet 5 %, 20 år: 3 mill. × (0,05/12)/(1 − (1 + 0,05/12)^−240) = **19 799
kr/mnd**. ✓ Renter første måned 3 mill. × 5 %/12 = **12 500**; etter skatt
12 500 × 0,78 = **9 750**. ✓ Stresstest 8 %: **20 000** → **15 600** etter
skatt. ✓

**E3.2 Netto leieinntekt (lysbilde 21).** 174 000 − 12 940 (kommunale) −
7 188 (bredbånd 599 × 12) − 29 364 (felles) − 10 500 (eiendomsskatt) − 4 200
(forsikring) = **109 808**. Etter skatt 109 808 × 0,78 = **85 650**. ✓

**E3.3 Case 1 — hele leiligheten, EK-finansiert.** K = 6 100 000. Salg etter
3 år med 18 %: 6 100 000 × 1,18 = **7 198 000**; gevinst **1 098 000**; skatt
1 098 000 × 22 % = **241 560**. ✓ ⟨rekonstruert NV⟩
NV = −6 100 000 + Σ 85 650/1,03^i + (7 198 000 − 241 560)/1,03³ = −6 100 000 +
242 271 + 6 366 128 = **508 399**. EK-rentabilitet 508 399/6 100 000 =
**8,3 %**. ✓ (lysbilde 26)

**E3.4 Case 2 — bo selv, leie ut ett rom, EK-finansiert.** Leie halveres til
**87 000**, skattefri; ingen gevinstskatt. NV = −6 100 000 + Σ 87 000/1,03^i +
7 198 000/1,03³ = −6 100 000 + 246 089 + 6 587 190 = **733 279** → **12,0 %**. ✓

**E3.5 Case 2 med gearing, 3,5 % rente.** EK 1,1 mill., lån 5 mill.,
avdragsfritt, innfris år 3. Renter etter skatt 5 mill. × 3,5 % × 0,78 =
**136 500**; leie − renter = 87 000 − 136 500 = **−49 500**. ✓
NV = −1 100 000 − Σ 49 500/1,03^i + 7 198 000/1,03³ − 5 000 000/1,03³ =
−1 100 000 − 140 016 + 6 587 190 − 4 575 708 = **771 465** → **70,1 %**. ✓
(«70 % med 3,5 %», lysbilde 30)

**E3.6 Gearing med 6 % rente.** Renter etter skatt 5 mill. × 6 % × 0,78 =
**234 000**; 87 000 − 234 000 = **−147 000**. ✓ NV = −1 100 000 − 415 806 +
6 587 190 − 4 575 708 = **495 675**. ✓ (eksakt lysbildets tall) →
**45,1 %**. ✓

**E3.7 Sensitivitet 1 — gearing 3,5 %, selger til kjøpesum 6,1 mill.**
NV = −1 100 000 − 140 016 + 6 100 000/1,03³ − 5 000 000/1,03³ = −1 100 000 −
140 016 + 5 582 364 − 4 575 708 = **−233 360** → **−21,2 %**. ✓

**E3.8 Sensitivitet 2 — EK, ett rom, selger til 6,1 mill.** NV = −6 100 000 +
246 089 + 5 582 364 = **−271 547**. ✓ (eksakt) → **−4,5 %**. ✓ «Når det går
dårlig, går det mindre dårlig med EK.»

**E3.9 Break-even salgspris (gearing 3,5 %).** S* = 5 000 000 + 1,092727 ×
(1 100 000 + 140 016) = **6 354 999 ≈ 6 355 000**; nødvendig prisstigning
255 000 = **+4,2 %** over tre år. ✓

**E3.10 Regnearket `Oppgaver_Investeringscase_gjeld`** er et *fjerde* case
lysbildene ikke viser: gearing (EK 1,1 mill., lån 5 mill., 3,5 %) *og* utleie
av hele leiligheten med skatt. Det bruker leie etter skatt 85 650 (ikke 87 000),
så årlig strøm er 85 650 − 136 500 = −50 850, og trekker fra gevinstskatt.
NV = 6 587 190 − 4 575 708 − 221 062 − 143 823 − 1 100 000 = **546 597** →
**49,7 %**. Regnearkets tredje ledd «46 523» skal være 46 535 (50 850/1,03³) —
skrivefeil på 12 kr.

**E3.11 Tapsfradrag i crowdlending.** I = 1 mill., R = 200 000 (20 %),
p = 90 %, t = 22 % **[eksempeltall]**.
- Full avskrivning: 0,9 × 200 000 × 0,78 − 0,1 × 1 000 000 × 0,78 = 140 400 −
  78 000 = **62 400 = 6,24 %**. ✓
- Ingen avskrivning: 140 400 − 100 000 = **40 400 = 4,04 %**. ✓
- 6,24/4,04 = 1,545 → «tapsfradrag gir 55 % høyere avkastning». ✓

**E3.12 Suksess 80 %, ingen tapsfradrag.** R* = 0,2 × 1 000 000/(0,8 × 0,78) =
**320 513 ≈ 32 %** for null forventet avkastning. ✓ Med 40 % rente:
0,8 × 400 000 × 0,78 − 200 000 = **+49 600 = 4,96 %** ⟨rekonstruert; tallet var
bilde⟩.

**E3.13 Appendiks — riktig rente for skattefrie strømmer.** Case 2 EK
diskontert med 4,4 % før skatt: NV = −6 100 000 + 87 000 × 2,754156 +
7 198 000/1,044³ = −6 100 000 + 239 612 + 6 325 725 = **465 337** → **7,6 %**.
Lysbilde 64 sier 7,5 %, lysbilde 66 sier 7,6 % — begge er avrundinger av 7,63 %.
«Riktig rente senker avkastningen» (fra 8,3 % — merk at forelesningen her
sammenligner med case 1-tallet, ikke case 2-tallet 12 %). Merk også at 4,35 %
× 0,78 = 3,39 %, ikke 3 %; forelesningen runder grovt.

**E3.14 Alternativkostnad i case 1** ⟨rekonstruert⟩. Trekkes 87 000 fra som
kostnad for å bo et annet sted: årlig strøm 85 650 − 87 000 = −1 350. NV =
−6 100 000 − 3 819 + 6 366 128 = **262 309** → **4,3 %**. Enda mindre attraktivt
enn ett rom (7,6 % med riktig rente).

**E3.15 Det som er holdt utenfor.** Dok.avgift 2,5 % × 6,1 mill. = **152 500**
(ikke fradrag); megler 150–170 000 (fradrag); formuesskatt sekundærbolig
6,1 mill. × 1 % = **61 000/år** (ikke fradrag, ingen rabatt).

### Argumenter

- **Gearing → avkastningen på investeringen (18 % prisstigning + leie) er
  langt høyere enn lånekostnaden etter skatt (2,7 %) → brekkstangformelen gir
  70 % på EK mot 12 % ugearet; selv dobling av renten gir 45 %.**
- **Bo selv og lei ut ett rom → skattefri leie, skattefritt salg, 75 %
  formuesrabatt → 12 % mot 8,3 % for hele leiligheten (EK). Skattereglene, ikke
  avkastningen, avgjør hva som lønner seg.**
- **Salgsprisen er den kritiske faktoren → uten prisstigning gir gearing
  −21,2 % (EK −4,5 %); break-even krever +4,2 % på tre år med 3,5 % rente,
  mye mer med 6 % → forklarer hvorfor boligmarkedet er dempet: nedside på
  priser (Oslo), rente mer sannsynlig opp enn ned, dagens lånerente ca. 5 %.**
- **«Renteøkning betyr lite for boligprisene» (figur) → «Tror vi på det?» —
  forelesningen sår tvil uten å konkludere.**
- **Lavere alminnelig sats (22 → 20 %) → rentefradraget blir mindre verdt,
  men skatten på lønn faller også → nettoeffekten avhenger av gjeldens
  størrelse og renten.**
- **Crowdlending-plattformen bærer ikke tap av hovedstol → svake insentiver
  til riktig risikovurdering → du må stole på en vurdering plattformen ikke
  har skin in the game for; du kjenner ikke låntakernes kreditthistorikk.**
- **Gråmarkedet: tap uten fradrag, gevinst skattlagt (asymmetri) + ukjent
  antall 2.-prioritetskreditorer (asymmetrisk informasjon) → høy sannsynlighet
  for tap → høye renter.**
- **Tapsfradrag gir «bare» 6,2 % mot 4 % → liten forskjell i forventning,
  men ved 80 % suksess må renten opp til 32 % → det er risikoen, ikke
  skatten, som avgjør — og manglende fradrag gjør belønningsbasert crowdfunding
  svært dyrt.**
- **Standardteori sier indeksfond → nordmenn kjøper enkeltaksjer og aktive
  fond, diversifiserer for lite (French & Poterba 1991) → forvalternes
  «NVIDIA-argument» om konsentrasjon i indeksen skjuler at aktive fond har
  færre aksjer og høyere honorarer → risikoen er større der.**
- **Forbrukerrådet: globale aktive fond −1,1 pp/år mot indeks over 20 år; men
  norske aktive fond +0,86 %/år → kjenner norske forvaltere enkeltaksjene
  bedre enn indeksen? Rapporten tyder på det.**
- **Hvorfor vi investerer feil → overdreven selvtillit, forstår ikke
  diversifisering, influensere, pågående meglere, gamblingpreferanser.**
- **ASK → skattekreditt og fri valg av realisasjonstidspunkt → «gratis
  opsjon» på framtidige skattesatser → privatpersoner bør bruke ASK.**
- **High yield → 10–20 % rente, men NHH-masteroppgave fant 0,51 % annualisert
  2005–2011 → konvertering til aksjer (DOF) betyr at hovedstol og renter går
  tapt mot et håp om kursstigning.**

### Empiri

| Fakta | Verdi | Kilde |
|---|---|---|
| Noterte eiendomsaksjefond, 1 år / 3 år p.a. / 5 år p.a. | ODIN Eiendom A: −16,7 % / +4,1 % / −11,5 %; FIRST Nordic Real Estate: −16,4 % / +8,1 % / −7,2 % | ODIN 31.07.2026, FIRST 20.08.2026 |
| Unoterte eiendomsfond | Storebrand Eiendomsfond Norge KS: +9,8 % / +3,5 % / +3,8 %; DNB Eiendomsfond Core Plus: +9,8 % (lansert 2021) | Storebrand, DNB |
| Uvektet fondsavkastning siste 10 år | 4,35 % → 3 % etter skatt | forelesningen |
| Prisstigning Bergen 2023–2026 | ≈ 18–20 % over tre år | anslag |
| Bergenhus, kvm-pris leilighet 2. kv. 2026 | 80 816 kr/m²; +10,7 % i 2024 | |
| Dagens lånerente | ca. 5 % (caset bruker 3,5 % og 6 %) | |
| Leilighet Sandviken (prospekt) | 6 100 000 inkl. omkostninger; leie 14 500/mnd; felles 29 364; kommunale 12 940; bredbånd 599/mnd; eiendomsskatt 10 500; forsikring 4 200 | prospekt |
| Aktive globale fond vs indeks, 20 år | −1,1 pp per år | Forbrukerrådet |
| Aktive norske fond vs referanseindeks | +0,86 % (20 år), +0,81 % (15 år), +1,13 % (25 år) | Forbrukerrådet |
| High-yield-obligasjoner 2005–2011 | 0,51 % annualisert; rente 10–20 % | NHH-masteroppgave |
| Crowdlending-plattformer | Kameo, Oblinor, Monio, Kredd; belønningsbasert: Spleis, Bidra, Kickstarter, IndieGoGo | |
| Små investorer diversifiserer for lite | | French & Poterba 1991 |

### Oppgavene (`Nye_oppgaver_Oppgaver_forelesning_3` — Anita)

Anita kjøper leilighet for 5 mill. kontant; netto leie før skatt 240 000/år
evig og sikker; avkastningskrav før skatt 8 %; skatt 22 %.
- **Spm. 1:** Justér både strøm og rente for skatt: V = 240 000 × 0,78 /
  (8 % × 0,78) = 187 200/0,0624 = **3 000 000**. Fasitlysbildet sier
  **2 925 000** — det tallet krever 6,4 % etter skatt (= 8 % × 0,80), altså 20 %
  skatt på renten men 22 % på leien. **Går ikke opp** med konsistente satser;
  formelen var et bilde. Lærepunkt: når begge sider skattlegges likt,
  kansellerer skatten og V = 240 000/0,08.
- **Spm. 2:** Investeringen skaper 3 mill. (fasit: 2 925 000), Anita betalte
  5 mill. → for mye.
- **Spm. 3:** Krav 4 % → 3,12 % etter skatt; V = 187 200/0,0312 =
  **6 000 000**. ✓ Godt kjøp.

Oppgaven tester: etter-skatt-justering av *både* teller og nevner i en evig
rekke, og at NV > pris er kriteriet — ikke yield alene.

### Nytt / fjernet mot gammel versjon

- Ingen gammel lysbildefil for forelesning 3 i mappa. Anita-oppgaven er
  identisk med gammel `Oppgaver_forelesning_3` (samme fasit 2 925 000).
- Hele eiendomscaset er oppdatert til 2026-tall (fond per august 2026,
  Bergenhus 2. kv. 2026, lånerente «rundt 5 %», utlånsforskriften). Bolken
  «leie og investere differansen vs kjøpe» som lå i gammel forelesning 2 er
  ikke tatt inn her heller.
- Appendikset (lysbilde 61–66) om før-skatt-rente for skattefrie strømmer og
  alternativkostnad er nytt materiale og retter forelesningens egen
  diskonteringsfeil.

---

## 4. Forelesning 4–5 — Aksjonærmodellen og fritaksmetoden

Fil: `NYE_FORELESNINGER_Forelesning_4GS._Aksjonærmodellen_og_Fritaksmetoden.txt`
(80 lysbilder, brukt over to forelesninger) og gammel `Forelesning_4og5GS...`
(83 lysbilder). Kursets tyngste og mest eksaminerte del. Sju bolker:
1992-reformen og delingsmodellen; 2006-reformen og «oligark-øyeblikket»;
fritaksmetoden; aksjonærmodellen (skjerming, gevinst, formuesskatt-og-utbytte,
5-årsregel, exit-skatt, aksjonærlån); inntektsskiftningsligningen og
arbeidsgiveravgiftens insidens; nominelle, effektive og marginale satser
(AERT); de rikestes skattebelastning; og et appendiks med to «typiske
eksamensoppgaver» og Bjerksund–Schjelderup-modellen. Skjermingsrenteformelen,
inntektsskiftningsligningen, AERT-formlene, nøytralitetsutledningen,
topp-1 %-regnestykket og BS-modellen var alle bilder; de er rekonstruert og
kontrollert mot tallene rundt (og mot eksamensfasitene H2017/H2020, som skriver
inntektsskiftningsligningen ut i tekst).

### Begreper

| Begrep | Definisjon slik forelesningen gir den |
|---|---|
| **Alminnelig inntekt / alminnelig skattesats** | Innført 1992 (28 %) som én flat sats på lønn, renter, selskapsoverskudd og aksjegevinst. 22 % i 2026. |
| **Personinntekt** | Lønn (og beregnet arbeidsinntekt). Får trinnskatt (5 trinn) og trygdeavgift på toppen av 22 %. |
| **Delingsmodellen (1992–2005)** | Aktiv eier fikk *tilordnet* lønnsinntekt = overskudd − sjablongavkastning på investert kapital. Residualen var lønn. |
| **Aktiv eier** | Eide ≥ 2/3 (66,67 %) av aksjene og jobbet i selskapet. Grensen kom fra selskapsrettens krav til kvalifisert flertall — «juristene vant over fornuften». |
| **Norgesparadokset** | Stor satsforskjell lønn/kapital gjorde det svært lønnsomt å selge seg ned under 2/3 og ta utbytte skattefritt. I 2006 var det nesten ingen aktive eiere igjen. |
| **Inntektsskifting** | Å omdanne høyt beskattet lønn til lavere beskattet kapitalinntekt (utbytte). Oppjusteringsfaktoren finnes for å hindre dette. |
| **Oppjusteringsfaktor (y)** | 1,72. Skattepliktig utbytte/gevinst multipliseres med y før 22 %-satsen. |
| **Eierskatt / eierinntekt** | Utbytte til personlig aksjonær kalles eierinntekt; skatten er 22 % × 1,72 = 37,84 %. |
| **Fritaksmetoden** | Utbytte og aksjegevinst er skattefritt når *mottakeren er et selskap* (AS, ANS mm.) — for å unngå kjedebeskatning. |
| **Kjedebeskatning** | Samme overskudd skattlegges i hvert ledd i en eierkjede (gammel versjon: «trippelbeskatning» hvis også hos personlig aksjonær). |
| **Holdingselskap** | Selskap som eier aksjer i andre selskaper; mottar utbytte og gevinst skattefritt og kan reinvestere uten skatt. |
| **Treprosentregelen** | Eierandel < 90 %: 3 % av mottatt utbytte inntektsføres og skattlegges med 22 % → 0,66 % av utbyttet. «I praksis kan vi glemme den.» |
| **Aksjonærmodellen** | Skattlegging av *personlig* aksjonær: utbytte og gevinst ut over et skjermingsfradrag skattlegges med 37,84 %; tap er fradragsberettiget. |
| **Personlig aksjonær / selskapsaksjonær** | Fysisk person (aksjonærmodellen) vs selskap (fritaksmetoden). |
| **Skjermingsgrunnlag** | Aksjens kostpris (inngangsverdi) + akkumulert ubenyttet skjerming fra tidligere år. Innskutt EK øker det; nedskrivning av EK reduserer det. |
| **Skjermingsrente** | Skal reflektere normalavkastning på egenkapital: 3 mnd statskasseveksel + 0,5 pp, etter 22 % skatt. 3,6 % for 2025. |
| **Skjermingsfradrag** | Skjermingsgrunnlag × skjermingsrente. Den delen av utbyttet som er skattefri. |
| **Ubenyttet skjerming** | Fradrag som ikke ble brukt fordi utbyttet var lavere. Framføres, slås sammen med neste års fradrag, *legges til grunnlaget*, og trekkes fra gevinsten ved salg. Når den er brukt opp, faller grunnlaget tilbake til kostpris. |
| **Årsskifteregelen** | Skjerming og utbytte tilfaller den som eier aksjen 31.12. Selges aksjen før årsskiftet, går årets skjerming tapt. |
| **Skattepliktig utbytte** | Utbytte − årets skjermingsfradrag − framført ubenyttet skjerming, aldri negativt. |
| **Aksjegevinst (skattemessig)** | Salgspris − kostpris − ubenyttet skjerming. |
| **Innskutt EK / nedskrivning av EK** | Innskutt kapital kan tas ut igjen skattefritt ved nedskrivning. Gir skattekreditt, men senker skjermingsgrunnlag og inngangsverdi. |
| **Skattekreditt** | Utsatt skatt: å kunne velge når skatten utløses har verdi (First Securities advarte mot nettopp dette i 2006). |
| **Oligark-øyeblikket** | 2004–2005: utbytteskatt varslet for 2006 → eiere tømte selskapene for skattefrie utbytter og skjøt pengene inn igjen som EK, for senere skattefri nedskrivning. Fordel til «gamle penger». |
| **Latent eierinntekt** | Overskudd holdt tilbake i selskapene (ikke utdelt). 40 % av Oljefondets verdi i 2016. |
| **5-årsregelen** | Bosatt ute > 5 år → latente gevinster kunne realiseres uten norsk skatt. Opphørt 29.11.2022. |
| **Exit-skatt** | Latent gevinst skattlegges med 37,84 % ved utflytting; betales straks, i rentefrie avdrag over 12 år, eller i sin helhet etter 12 år. |
| **Aksjonærlån** | Lån fra selskap til personlig aksjonær skattlegges som utbytte (aksjeloven 2015). Unntak: < 100 000 tilbakebetalt innen 60 dager. |
| **Nominell skattesats** | Den lovvedtatte satsen (22 %). |
| **AERT (Average Effective Rate of Tax)** | Faktisk betalt skatt / brutto inntekt før skatt. Historisk, selskapsspesifikk, varierer år for år (avskrivninger, framførbare underskudd). |
| **Marginal eierskatt** | Skatten på én krone ekstra inntekt i selskapet, hensyn tatt både selskapsskatt og eierskatt. |
| **Skattekile** | Oppstår når skattemessig avskrivning avviker fra virkelig kapitalslit; påvirker atferd og AERT. |
| **Saldoavskrivning** | Fast prosent av gjenstående verdi hvert år (30 % i eksempelet). |
| **Nøytralt skattesystem** | Skatten endrer ikke bedriftens tilpasning; oppnås når alle kostnader kan avskrives straks. |
| **Arbeidsgiveravgift (AGA)** | 14,1 % av utbetalt lønn = 12,4 % av bedriftens lønnskostnad (12,4/87,6 = 14,1 %). |
| **Overvelting av AGA** | Hvor stor del av avgiften som reelt bæres av arbeidstaker (gjennom lavere lønn). Inntektsskiftningsligningen forutsetter full overvelting. |
| **Periodiseringsnøytralitet** (gammel versjon) | Finansdepartementets påstand: aksjonæren er indifferent til *når* utbytte tas. BS bestrider. |
| **BS-modellen** | Bjerksund–Schjelderup: utbytte nå vs senere, med uendret EK og lånefinansiert skatt. Lønnsomt å vente når lånerenten > skjermingsrenten. |
| **Gratis opsjon** | Å vente med utbytte beholder retten til å velge tidspunkt og sats; å ta utbytte «utøver» opsjonen. |

### Formler og regler

1. **Eierskatt** = t_A · y = 22 % × 1,72 = **37,84 %**. **[dagens regel]**
2. **Skjermingsrente** ⟨rekonstruert⟩ = (r_statskasseveksel 3 mnd + 0,5 pp) × (1 − 0,22).
   2025: (4,1 % + 0,5 %) × 0,78 = 3,59 % ≈ **3,6 %**. ✓
3. **Skjermingsgrunnlag_t** = kostpris + ubenyttet skjerming per 31.12 (t − 1).
4. **Skjermingsfradrag_t** = skjermingsgrunnlag_t × skjermingsrente_t.
5. **Skattepliktig utbytte_t** = max(0, utbytte_t − fradrag_t − ubenyttet_{t−1}).
6. **Ubenyttet skjerming_t** = max(0, ubenyttet_{t−1} + fradrag_t − utbytte_t).
7. **Skatt på utbytte** = skattepliktig × 1,72 × 22 % = skattepliktig × 37,84 %.
8. **Skattemessig gevinst** = salgspris − kostpris − ubenyttet skjerming;
   skatt = gevinst × 37,84 %. Tap er fradragsberettiget, men ubenyttet
   skjerming kan ikke skape tap — overskytende går tapt (gammel versjon,
   lysbilde 41).
9. **Årsskifteregelen:** eier du ikke aksjen 31.12, får du verken utbytte
   eller skjerming for året.
10. **Fritaksmetoden:** selskap → selskap skattefritt. Eierandel < 90 %:
    skatt = utbytte × 3 % × 22 % = **0,66 %** av utbyttet. **[dagens regel]**
11. **Formuesskatt på aksjer** = (markedsverdi × (1 − 0,20) − bunnfradrag) × sats.
    Unotert: formuesverdi ≈ 35–40 % av markedsverdi inkl. rabatt (SSB 2022/31,
    2025/21). **[dagens regel]**
12. **Utbytte for å betale formuesskatt F:** U = F / (1 − t_e);
    utbytteskatt = U · t_e. Med 37,84 %: U = 1,609 · F; med 37,8 %: 1,608 · F.
13. **Inntektsskiftningsligningen** ⟨rekonstruert; identisk med eksamensfasit
    H2017 og H2020⟩:
    t_w + a = t_A + (1 − t_A) · t_e · y,
    der t_w = høyeste marginalskatt på lønn (47,4 %), a = arbeidsgiveravgift
    overveltet på arbeidstaker (12,4 % ved full overvelting), t_A = 22 %,
    t_e = 22 %. Løst: **y = (t_w + a − t_A) / ((1 − t_A) · t_e)** og effektiv
    eierskatt = y · t_e. Uten a (som i eksamensoppgavene): t_w = t_A + (1 − t_A) t_e y.
14. **AGA-omregning:** 100 kr lønnskostnad = 87,6 lønn + 12,4 avgift; 12,4/87,6 = 14,1 %.
15. **Marginal eierskatt når alt tas ut:** t_A + (1 − t_A) × 37,84 %.
16. **AERT** ⟨rekonstruert⟩: personlig skattyter T/Y; aksjonær
    (selskapsskatt + utbytteskatt + formuesskatt) / selskapets overskudd før skatt.
17. **Nøytralitet og avskrivning** ⟨rekonstruert⟩: skattepliktig overskudd
    R(x) − α·C(x), der α er andelen av kostnadene som kan trekkes fra nå;
    økonomisk overskudd R(x) − C(x). Bedriften maksimerer
    R − C − t(R − αC) → R′(1 − t) = C′(1 − tα). Hvis α = 1: R′ = C′ og
    skatten er nøytral. Hvis α < 1: R′ > C′ → skattekile → underinvestering.
18. **Markedsverdi av evig overskudd:** V = 100 / 0,1222 = **818**.
19. **BS-modellen** ⟨rekonstruert⟩: ta 1 kr utbytte nå, skyt inn 1 kr EK, lån
    0,378 til skatten. Kostnad ved t = 1: 0,378 · (1 + R(1 − t)). Besparelse
    fra økt skjermingsgrunnlag: 0,378 · (1 + r(1 − t)). Utbytte nå lønner seg
    hvis og bare hvis r ≥ R. Norge: r ≪ R → spar i selskapet.

### Regneeksempler

**E4.1 Delingsmodellen.** Overskudd 100, investert kapital 1 000, sjablong 6 %
→ kapitalavkastning 60, tilordnet lønn **40**. Selskapet skattet 28 % av 100. ✓

**E4.2 Skjermingsrenten 2025.** (4,1 + 0,5) × 0,78 = **3,59 ≈ 3,6 %**. Aksje
kjøpt for 100 kan motta **3,6** skattefritt. ✓ ⟨rekonstruert formel⟩

**E4.3 Olsen i AS Industri (lysbilde 34–35).** Kostpris 1 000 ved årsskiftet
2014; solgt 2019 før utbytte for 1 100.

| År | Rente | Utbytte | Grunnlag | Fradrag | Skattepliktig | Ubenyttet 31.12 |
|---|---|---|---|---|---|---|
| 2014 | 2 % | 25 | 1 000 | 20 | 25 − 20 = **5** | 0 |
| 2015 | 3 % | 0 | 1 000 | 30 | 0 | **30** |
| 2016 | 2 % | 10 | 1 030 | 20,6 | 0 (10 − 30 − 20,6 < 0) | 30 + 20,6 − 10 = **40,6** |
| 2017 | 4 % | 90 | 1 040,6 | 41,6 (41,624) | 90 − 40,6 − 41,6 = **7,8** | 0 |
| 2018 | 3 % | 0 | 1 000 | 30 | 0 | **30** |
| 2019 | 4 % | (10) | — | — | solgt før utbytte: ingen skjerming | — |

Alle rader ✓. Gevinst: 1 100 − 1 000 − 30 = **70**; oppjustert 70 × 1,72 =
**120,4**; skatt 120,4 × 22 % = **26,49** (= 70 × 37,84 %); etter skatt
**43,51**. ✓ Merk at grunnlaget faller tilbake til 1 000 i 2018 fordi den
ubenyttede skjermingen ble brukt opp i 2017.

**E4.4 Treprosentregelen.** Utbytte 100, eierandel < 90 %: 3 × 22 % = **0,66**. ✓

**E4.5 «Utbytte for å betale formuesskatten» — 10 mill. i børsnoterte aksjer.**
Skjermingsrente 3,6 %, eierskatt 37,84 %, formuesskatt 1 %, utbytte 6 % =
600 000 **[eksempeltall]**.
- Formuesgrunnlag (10 mill. × 0,8 − 1,7 mill.) = 6,3 mill.; formuesskatt
  **63 000**. ✓
- Skjerming 10 mill. × 3,6 % = **360 000**; skatt på utbytte (600 000 −
  360 000) × 37,84 % = **90 816**. ✓
- Sitter igjen med 600 000 − 63 000 − 90 816 = **446 184**. ✓
- Effektiv sats (63 000 + 90 816)/600 000 = **25,6 %**. Lysbildet sier
  «25,5 % (= (63 000 + 90186)/600 000)» — **90 186 er en talltransposisjon av
  90 816**; riktig er 25,6 %. Poenget står: på nivå med lønnstaker på
  700 000 (25,4 %). «Hva vi mener om det er politikk og ikke fag.»

**E4.6 Effektiv skatt på lønn (sammenligningen).** 400 000 → 19,3 %;
500 000 → 22,1 %; 600 000 → 24,0 %; 700 000 → 25,4 % (uten gjeld og fradrag).

**E4.7 Inntektsskiftningsligningen med tre overveltingsantakelser**
⟨rekonstruert⟩. t_w = 47,4 %, t_A = t_e = 22 %.
- Full overvelting (a = 12,4 %): 59,8 % = 22 % + 78 % × 22 % × y →
  **y = 2,20**, effektiv eierskatt **48,4 %**.
- 50/50 (a = 6,2 %): 53,6 % → **y = 1,84**, eierskatt **40,5 %**.
- Bedriften bærer AGA (a = 0): 47,4 % → **y = 1,48**, eierskatt **32,6 %**.
- Dagens y = 1,72 gir høyresiden 22 % + 78 % × 37,84 % = **51,5 %**, som
  tilsvarer a ≈ 4,1 pp — om lag en tredel av avgiften overveltet. Med full
  overvelting er venstresiden 59,8 % (eller 53,9 % om lønnsdelen skaleres
  med 0,876), så ligningen balanserer *ikke* med 1,72. Det er nettopp
  forelesningens poeng: «hvis AGA deles 50/50 eller 30/70 betyr det en
  betydelig lettelse av eierbeskatningen».
- Lysbilde 51 bruker eldre satser (22 + 7,8 + 17,6 = 47,5 %); lysbilde 49
  bruker 2026-satsene (22 + 7,6 + 17,8 = 47,4 %). Samme sum i praksis.

**E4.8 Marginal eierskatt.** Nominelt: 22 % + 78 % × 37,84 % = **51,5 %**. ✓
Med AERT 14 %: 14 % + 86 % × 37,84 % = **46,5 %**. ✓

**E4.9 AERT vs nominell sats (printeren).** Inntekt 300 000, printer 100 000.
- Full avskrivning: skattbar 200 000; skatt 44 000; AERT 44 000/300 000 =
  **14,7 %**. Lysbildet skriver 14,6 % i tabellen og 15,4 % i noten — **begge
  avviker**; 44/300 = 14,67 %.
- Saldo 30 %: fradrag 30 000; skattbar 270 000; skatt **59 400**; AERT
  **19,8 %**. ✓ (noten sier «20 %»)

**E4.10 Topp-1 %-investoren (lysbilde 69–73).** Selskapet tjener 100/år;
V = 100/0,1222 = **818**. ✓ Unotert formuesverdi 818 × 35 % = **286,3**. ✓
Selskapsskatt AERT 13,1 % (Hopland mfl. 2024) = **13,1**.
- *Børsnotert:* formuesskatt 818 × (1 − 0,20) × **1,1 %** = **7,2**
  ⟨rekonstruert — bare 1,1 %-satsen reproduserer 11,6/4,4⟩; utbytte for å
  dekke den U = 7,2/0,6216 = **11,6**; utbytteskatt 11,6 × 37,84 % = **4,4**. ✓
  AERT = (13,1 + 7,2 + 4,4)/100 = **24,7 %**. ✓
- *Unotert:* formuesskatt 286,3 × 1,1 % = **3,15**; U = 3,15/0,6216 = **5,1**
  («5»); utbytteskatt 5 × 37,84 % = **1,9**. ✓ AERT = (13,1 + 3,15 + 1,9)/100 =
  **18,1 %**. ✓
- *Portefølje 1/3 børs, 2/3 unotert* ⟨rekonstruert; tallet var bilde⟩:
  (24,7 + 2 × 18,1)/3 = **20,3 %**. Aaberge mfl. (2020): 22 % for topp 1 %,
  9–17 % for topp 0,1 % (2001–2018).

**E4.11 Sindre i Box (appendiks, «typisk eksamensoppgave»).** Kostpris 100 (2018).

| År | Utbytte | Grunnlag | Rente | Fradrag | Skattbart | Akkumulert |
|---|---|---|---|---|---|---|
| 2018 | 3 | 100 | 2 % | 2 | **1** | 0 |
| 2019 | 5 | 100 | 3 % | 3 | **2** | 0 |
| 2020 | 1 | 100 | 5 % | 5 | **0** | 5 − 1 = **4** |
| 2021 | 3 | 104 | 1 % | 1,04 | **0** (3 − 1,04 − 4 < 0) | 4 + 1,04 − 3 = **2,04** |

Skattbart utbytte 2021 = **0**; 2,04 framføres. ✓

**E4.12 Leah Laus — utbytte for å dekke formuesskatt.** Formuesverdi 100,
formuesskatt 1 %, eierskatt 37,8 %. U = 1/(1 − 0,378) = **1,608 ≈ 1,6**;
utbytteskatt 1,6 × 0,378 = **0,6**; 1 + 0,6 = 1,6. ✓ (Lysbildet skriver
«Sindre betaler» — skal være Leah.)

**E4.13 BS-modellen numerisk** ⟨eget eksempel⟩. R = 5 %, r = 3,6 %, t = 22 %:
lånekostnad 0,378 × (1 + 0,05 × 0,78) = **0,3927**; besparelse 0,378 ×
(1 + 0,036 × 0,78) = **0,3886** → vent med utbyttet. Med R = r er de like.

**E4.14 Oligark-øyeblikket (Rasmussen).** 1,7 mrd. tatt ut 2004–2005, skutt
inn som EK og lånt tilbake; kan nedskrives og utbetales skattefritt senere.
(DN 16.12.2019.) Ingen regning i lysbildet.

### Argumenter

- **Delingsmodellen → grensen på 2/3 var juridisk, ikke økonomisk motivert →
  eiere solgte seg ned til 67 %, beholdt kontroll og slapp utbytteskatt →
  nesten ingen aktive eiere igjen i 2006 (Norgesparadokset).**
- **Varslet utbytteskatt 2004 → tøm selskapet skattefritt, skyt inn som EK,
  nedskriv senere → skattekreditt for «gamle penger»; reformen belønnet dem
  som allerede var rike (oligark-øyeblikket).**
- **Fritaksmetoden hindrer kjedebeskatning → men gjør holdingselskapet til en
  skattefri sparebøsse → 80 mrd./år skattefritt hos de rikeste, 400 mrd.
  opptjent, 125 mrd. i utsatt skatt (DN 2019) → Skauge-utvalget advarte:
  skatten kan utsettes «i all evighet». Gini for formue 60 → 72.**
- **Mohn/Framo: 13 mrd. gevinst skattefritt i Wimoh → før 2006 ville salget
  utløst skatt → fritaksmetoden flytter skattetidspunktet til eierens valg.**
- **Skjermingsfradraget → EK har en risikofri alternativkostnad som ikke er
  fradragsberettiget (i motsetning til gjeldsrenter) → skjermingen retter opp
  skjevheten så eierskatten bare treffer den *risikable* delen av
  avkastningen.**
- **«Formuesskatten tvinger fram utbytte» → regn: 10 mill. gir 25,6 % effektiv
  skatt, som en lønnstaker på 700 000 → om det er urettferdig er politikk,
  ikke fag.**
- **Latent eierinntekt hoper seg opp → Finansdepartementet: systemet påvirker
  ikke utbyttetidspunktet → BS (2021, 2022): jo, det lønner seg å spare i
  selskapet (lånerente > skjermingsrente; ASK er nest best) → og opphopingen
  gjorde utflytting (5-årsregelen, Sveits) mer verdt enn formuesskatten →
  exit-skatt som svar.**
- **First Securities advarte i 2006 → skattyter velger selv utløsning →
  skattekreditt → det gamle systemet (godtgjørelse) skattla utbyttet nærmere
  opptjeningen.**
- **Inntektsskiftningsligningen forutsetter full overvelting av AGA →
  empirien (Dale-Olsen, Ku, Stokke: 15–30 %; Gavrilova: full via bonus, ikke
  grunnlønn; Benzarti–Harju: ingen) → med 50/50 eller 30/70 er eierskatten
  satt for høyt → «Skattekommisjonen burde sett på dette»; lavere eierskatt
  kan redusere opphopingen.**
- **Aksjonærlån som omvei rundt 37,84 % → skattlegges som utbytte siden 2015
  → lønner seg ikke.**
- **Offisiell statistikk bruker nominelle satser (51,5 %) → men AERT er
  13–15 % → reell marginal eierskatt 46,5 % → tallet holdes nominelt for
  internasjonal sammenlignbarhet.**
- **Avskrivning ≠ kapitalslit → skattekile → bare full straks-avskrivning gir
  R′ = C′ og nøytralitet.**
- **Topp 1 % (ca. 50 000): nesten ingen lønn, lite eiendom, mesteparten av
  aksjene, 2/3 unotert → regnestykket gir 24,7 % (børs) / 18,1 % (unotert) /
  ca. 20 % (portefølje) → konsistent med Aaberge 22 %; Aaberge topp 0,1 %
  9–17 %.**

### Empiri

| Fakta | Verdi | Kilde |
|---|---|---|
| Før 1992 | marginalskatt lønn 70 %; selskapsskatt 50,8 %; utbytte høyeste sats 19,5 % | |
| 1992-reformen | alminnelig sats 28 %, ingen utbytteskatt, trinnskatt på lønn, delingsmodellen | |
| Rasmussengruppen 2004–2005 | ca. 1,7 mrd. tatt ut, skutt inn som EK/lånt tilbake | DN 16.12.2019 |
| Skattefrie utbytter/gevinster i de rikestes holdingselskaper | ca. 80 mrd./år; 400 mrd. opptjent i selskapene til de 650 rikeste; ca. 125 mrd. i skatt om utdelt | DN 2019 |
| Gini formue | ca. 60 → 72 | DN 2019 |
| Mohn/Framo → Alfa Laval | 13 mrd. gevinst skattefritt i Wimoh | DN 13.12.2019 |
| Statskasseveksel 3 mnd 2025 | 4,1 % → skjermingsrente 3,6 % | |
| Utbytte, 10 største på Oslo Børs | ca. 6 % | |
| Latent eierinntekt 2016 | 40 % av Oljefondets verdi | |
| Effektiv skatt på lønn (uten fradrag) | 400′: 19,3 %; 500′: 22,1 %; 600′: 24,0 %; 700′: 25,4 % | |
| Overvelting av AGA, Norge | Dale-Olsen 2018, Ku mfl. 2020, Stokke 2021: 15–30 %; Gavrilova mfl. 2023: 20–50 % kontraktslønn (upresist), ≈ full på full lønn (bonus/overtid), konsentrert i store bedrifter | Gavrilova, Langørgen & Zoutman 2023, s. 27 |
| Overvelting, Sverige / Finland | Bennmarker 2009 ≈ 25 %; Korkeamäki & Uusitalo 2009 ≈ 50 %; Benzarti & Harju 2021 ingen | samme |
| Gavrilova-designet | sone 1a fikk AGA hevet 10,6 % → 14,1 % i 2004; DiD/«dynamic causal forest», lønnsregister 2002–2008 | |
| AERT norske selskaper | 13,1 % (Hopland mfl. 2024); «13–15 %» | |
| Realavkastning aksjer Norge etter 1980 | 12,22 % (diskonteringsrente for V = 818) | Jordà mfl. 2019 |
| Formuesverdi unoterte aksjer | 35–40 % av markedsverdi | SSB 2022/31, 2025/21 |
| Topp 1 % | ca. 50 000 personer; 2/3 av formuen i unoterte aksjer | |
| Effektiv skatt topp 1 % / topp 0,1 % 2001–2018 | 22 % / 9–17 % | Aaberge mfl. 2020 |
| Marginalskatt lønn 2026 | 47,4 % ekskl. AGA | |

### Oppgavene

**`Nye_oppgaver_Oppgaver_forelesning_4` («Oppgaver forelesning 3 med fasit»)
— formuesskatt og utbytte under tre regelsett.** Tabell: 2021 (rabatt 45 %,
formuesskatt 0,85 %, eierskatt 31,68 %, bunnfradrag 1,5 mill.); 2023 (20 %,
1,1 % (1 %), 37,84 %, 1,7 mill.); Skatteutvalget (0 %, 0,85 % (0,5 %), 34 %,
6,4 mill.). Effektiv selskapsskatt 7 %; se bort fra skjerming og bunnfradrag;
bruk høyeste formuesskattesats. Markedsverdi 1 250, formuesverdi 35 % av
markedsverdi. Fasitformlene var bilder — tallene under er mine.
- **Spm. 1:** 2023: 1 250 × 35 % = 437,5 × 1,1 % = **4,81** (leser 35 % som
  «inkl. rabatt», jf. lysbilde 70; legges rabatten på toppen blir det
  437,5 × 0,8 × 1,1 % = 3,85). Skatteutvalget: ingen rabatt, markedsverdi:
  1 250 × 0,85 % = **10,63**.
- **Spm. 2:** utbytte som dekker formuesskatt og utbytteskatt: 2023:
  4,81/(1 − 0,3784) = **7,74**; Skatteutvalget: 10,63/(1 − 0,34) = **16,10**.
- **Spm. 3:** utbytteskatt 2023: 7,74 × 37,84 % = **2,93**; Skatteutvalget:
  16,10 × 34 % = **5,47**.
- **Spm. 4:** sum formuesskatt + utbytteskatt 7,74 mot 16,10 → betydelig
  skjerpelse. ✓ (fasitens konklusjon)
- Selskapsskatten på 7 % brukes ikke i spørsmålene; den ligger der for en
  eventuell AERT-oppfølging: (7 % × overskudd + 7,74)/overskudd.

**`Nye_oppgaver_Oppgaver_forelesning_5` — Kjell Inge og Martine.**
Oppgave 1 (Lugano AS, 2020-regler: skjermingsrente 5 %, eierskatt 25 %,
faktor 1,6 **[eksempeltall]**; identisk med eksamen H2021):
- Spm. 1: selskapsskatt 150 000 × 22 % = **33 000**. ✓
- Spm. 2: skjerming 500 000 × 5 % = **25 000** skattefritt. ✓
- Spm. 3: utbytte 150 000 − 33 000 = 117 000; skattbart 117 000 − 25 000 =
  92 000; grunnlag 92 000 × 1,6 = 147 200; eierskatt 147 200 × 25 % =
  **36 800**. ✓
- Spm. 4: effektiv skatt på utbyttet 36 800/117 000 = **31,5 %**. ✓
- Spm. 5: samlet (33 000 + 36 800)/150 000 = **46,5 %**. ✓
- Spm. 6: ubenyttet skjerming 2022 = 500 000 × 10 % = 50 000 (intet utbytte);
  ingen skjerming 2023 (solgt før årsskiftet); gevinst 550 000 − 500 000 −
  50 000 = **0** → skatt **0**. ✓
Oppgave 2 (Martine i LAX) er identisk med Sindre-eksempelet E4.11: skattbart
utbytte 2021 = **0**, akkumulert 2,04. ✓

Oppgavene tester: skjermingstabellen år for år (grunnlag vokser med ubenyttet
skjerming), oppjustering × sats, effektiv vs samlet skatt, årsskifteregelen,
og «utbytte for å betale formuesskatt» = F/(1 − t_e).

### Nytt / fjernet mot gammel versjon

- **Nytt:** «Dette skjedde» og Rasmussen-lysbildene (12, 18); DN-lysbildet med
  80/400/125 mrd. og Gini 60 → 72 (26); begrunnelsen for skjermingsfradraget
  som risikofri alternativkostnad for EK (40); «attraktivt å flytte til
  Sveits» og BS-konklusjonen «lønnsomt å spare i selskaper, ASK nest best»
  (41, 44); setningen om at grunnlaget faller tilbake til kostpris når
  ubenyttet skjerming er brukt opp (33). «Skattekasseveksler 2005» rettet til
  2025.
- **Rettet:** 10-mill.-eksempelet var feil i gammel versjon (formuesgrunnlag
  «= 0», utbytteskatt regnet som (600′ − 360′) × (1 − 0,3784) ≈ 149 000,
  effektiv sats 24,8 %). Ny versjon regner riktig (63 000 + 90 816), men
  har transposisjonsfeilen 90 186 → 25,5 %.
- **Fjernet:** innledningslysbildet om aksjonærmodellen (utbytte 100,
  skjerming 20 → 80 skattepliktig); «to strategier» før 2006; lysbildet om
  kjedebeskatning/trippelbeskatning og det gamle godtgjørelsessystemet;
  lysbildet om at aksjonærmodellen *i teorien* gjør staten til passiv
  medinvestor, men ikke i praksis (tapsfradrag framføres, konkurs før
  skjerming er brukt, ubenyttet skjerming 50 mot gevinst 20 → 30 går tapt,
  statskassevekselrenten for lav) og Finansdepartementets
  «periodiseringsnøytralitet»; og **Bjerksund–Schjelderups fire grunner til
  at systemet ikke er nøytralt** (asymmetri tap/gevinst; riktig
  skjermingsrente er aksjonærens lånerente; tapsaversjon; utbytte utøver en
  gratis opsjon). De fire grunnene er kjernen i BS2/BS3 (pensum) og bør inn i
  manualen selv om lysbildene er borte.

---

## 5. Forelesning 9 — Hvem betaler egentlig skatten

Fil: `NYE_FORELESNINGER_Forelesning_9GS_Hvem_betaler_skatten.txt` (27 lysbilder).
Ingen gammel versjon og ingen oppgavefil, men eksamen H2024 oppgave 8 tester
derivasjonen direkte (tre flervalg: ∂p/∂t, ∂P/∂t og grensetilfellet D′ = 0).
Forelesningen er kort: motivasjon (moms på melk, selskapsskatt og lønn), den
grafiske stykkskatten, den formelle derivasjonen under frikonkurranse (alle
formlene var bilder), grensetilfellene, monopol, oligopol og plattformer, og
til slutt «dynamisk insidens» — tidsinkonsistens og hytteprisen.

### Begreper

| Begrep | Definisjon slik forelesningen gir den |
|---|---|
| **Insidens / overvelting** | Hvem som *reelt* bærer en skatt, i motsetning til hvem som krever den inn for staten. |
| **Formell vs reell insidens** | Butikken krever inn momsen (formelt), men om prisen ikke øker med hele momsen, bærer butikken en del selv (reelt). |
| **Stykkskatt** | Skatt per enhet solgt, t kroner. Momsen er en verdiskatt, men analyseres likt. |
| **Konsumentpris P / produsentpris p** | P = p + t når produsenten betaler inn skatten. |
| **Frikonkurranse** | Uendelig mange tilbydere. Tilbudskurven = summen av produsentenes grensekostnader; etterspørselen = summen av konsumentenes grensenytter. Helningene avgjør insidensen. |
| **Elastisitet** | Prisfølsomhet. Den *minst* prisfølsomme parten bærer mest av skatten. |
| **Perfekt uelastisk etterspørsel** | D′ = 0. Konsumentene må ha varen uansett (insulin) → bærer alt. |
| **Perfekt elastisk tilbud** | S′ → ∞. Prisen er gitt for tilbyder → konsumenten bærer alt. |
| **Perfekt uelastisk tilbud** | S′ = 0. Fast kvantum uansett pris → produsenten bærer alt. |
| **Velferdstap / dødvektstap** | Tapet som ikke tilfaller noen: lite når etterspørselen er uelastisk, stort når den er elastisk. |
| **Monopol** | Én bedrift; tilpasning MR = MC. Overvelter aldri hele skatten — det er ikke lønnsomt. |
| **Oligopol** | Få bedrifter. Insidensen avhenger av pris-/kvantumskonkurranse, antall bedrifter og funksjonsform → ingen entydig regel. |
| **Tosidig marked / plattform** | Betjener to gjensidig avhengige kundegrupper (aviser/annonsører; brukere/annonsører). Pris = grensekostnad gjelder ikke. En skatt på den ene siden kan senke prisen der. |
| **Direkte vs dynamisk insidens** | Direkte: prisendringen ved innføring. Dynamisk: myndighetene fristes til å endre politikken senere (tidsinkonsistens). |
| **Tidsinkonsistensproblemet** | Politikk som er optimal å love i dag, er ikke optimal å holde i morgen (elbil-fordeler reverseres når mange nok har elbil). |
| **Hold-up** | Aktører lar være å investere/kjøpe fordi de vet lettelsene er midlertidige. |
| **Troverdig binding** | Ulysses og sirenene; Norges Banks uavhengighet i rentesettingen. |
| **Kapitalisering** | En ventet framtidig skatt (eiendomsskatt på hytter) slår inn i prisen i dag. |

### Formler og regler

1. **Prissammenheng:** P = p + t (stykkskatt kreves inn av produsent).
2. **Likevekt:** D(P) = S(p) ⇔ D(p + t) = S(p). ⟨rekonstruert⟩
3. **Produsentprisen** ⟨rekonstruert; identisk med fasit H2024 oppg. 8a⟩:
   totalderiver likevekten mhp. t:
   D′(P) · (∂p/∂t + 1) = S′(p) · ∂p/∂t
   ⇒ **∂p/∂t = D′(P) / (S′(p) − D′(P))**.
   Teller negativ, nevner positiv → ∂p/∂t ∈ [−1, 0]: produsentprisen faller.
4. **Konsumentprisen** ⟨rekonstruert; fasit H2024 oppg. 8b⟩:
   ∂P/∂t = ∂p/∂t + 1 = D′/(S′ − D′) + (S′ − D′)/(S′ − D′)
   ⇒ **∂P/∂t = S′(p) / (S′(p) − D′(P))** ∈ [0, 1].
5. **Fordelingsidentiteten:** ∂P/∂t − ∂p/∂t = 1. Konsumentens andel
   S′/(S′ − D′) og produsentens andel −D′/(S′ − D′) summerer til 1.
6. **Grensetilfeller:**
   - D′ = 0 (uelastisk etterspørsel): ∂p/∂t = 0, ∂P/∂t = 1 → konsumenten alt.
   - S′ → ∞ (elastisk tilbud): ∂P/∂t → 1 → konsumenten alt.
   - S′ = 0 (uelastisk tilbud): ∂P/∂t = 0, ∂p/∂t = −1 → produsenten alt.
   - D′ → −∞ (elastisk etterspørsel): ∂p/∂t → −1 → produsenten alt.
7. **I elastisiteter** ⟨rekonstruert⟩: konsumentens andel = ε_S / (ε_S + |ε_D|).
8. **Monopol, lineære funksjoner** ⟨rekonstruert⟩: p = a − bx, kostnad
   (c + t)x. Profitt π = (a − bx − c − t)x; FOC a − 2bx − c − t = 0 →
   x* = (a − c − t)/2b, p* = (a + c + t)/2 → **∂p/∂t = ½**. Prisen øker
   med halve skatten.
9. **Proveny** = t · x_t. **Dødvektstap** ⟨rekonstruert⟩ ≈ ½ · t · (x₀ − x_t).

### Regneeksempler

**E5.1 Stykkskatt 1 kr under frikonkurranse (lysbilde 8).** Pris 5, kvantum
100. Skatt 1 kr på produsenten → tilbudskurven skifter opp; produsenten
ønsker 6, men kjøperne vil ikke ha 100 til 6. Ny likevekt P = **5,60**,
x = **90**. Konsumenten betaler 5,60 − 5 = **0,60**; produsenten sitter igjen
med 5,60 − 1 = 4,60 og bærer 5 − 4,60 = **0,40**. Deling 40/60. Proveny
90 × 1 = **90**. ✓
- ⟨rekonstruert⟩ Implisitte helninger: D′ = −10/0,6 = −16,7; S′ = 10/0,4 = 25.
  ∂p/∂t = −16,7/(25 + 16,7) = **−0,40**; ∂P/∂t = 25/41,7 = **0,60**. ✓
  Elastisiteter i utgangspunktet: ε_D = −0,83, ε_S = 1,25 → konsumentandel
  1,25/2,08 = 0,60. ✓ Dødvektstap ½ × 1 × 10 = **5**.

**E5.2 Moms på melk (lysbilde 2).** 25 % moms: hever butikken prisen fra 20
til 25? Nei — ikke profittmaksimerende; deler av momsen bæres av butikken.
Ingen tall ut over dette.

**E5.3 Monopol.** Med lineær etterspørsel og kostnad: Δp = ½ Δt. ✓ (formel 8)

### Argumenter

- **Hvem som krever inn skatten er irrelevant → likevekten D(p + t) = S(p)
  er den samme uansett hvem som formelt betaler → bare helningene teller.**
- **Den minst prisfølsomme parten bærer mest → uelastisk etterspørsel
  (insulin) eller elastisk tilbud → konsumenten; uelastisk tilbud →
  produsenten.**
- **Uelastisk etterspørsel gir lite velferdstap, elastisk gir stort →
  kvantumet faller lite/mye.**
- **Monopolisten overvelter ikke hele skatten → full overvelting mister for
  mange kunder → med lineære funksjoner nøyaktig halvparten; ikke-lineært:
  mer jo mindre prisfølsomt markedet er, men aldri alt.**
- **Insidens: frikonkurranse < oligopol < monopol → under oligopol vet vi
  lite; alt avhenger av forutsetningene.**
- **Plattformer → mva på aviser kan gi *lavere* avispris (for å øke
  annonseinntektene); skatt på datainnsamling kan gi månedsavgift for
  brukere → «en vare som skattlegges kan falle i pris».**
- **Økt selskapsskatt → CBO antar 50 % overveltes på lønn og priser →
  «hvem betaler» er empirisk, ikke gitt av loven.**
- **Redusert matmoms → ikke tilsvarende lavere matpriser → overvelting er
  asymmetrisk/ufullstendig.**
- **Tidsinkonsistens → elbil-fritak reverseres når nok kjører elbil → hold-up:
  folk lar være å kjøpe fordi lettelsene er midlertidige → løsningen er
  troverdig binding (Norges Bank uavhengig; Ulysses).**
- **Hytte i kommune uten eiendomsskatt → hytteeiere stemmer ikke lokalt →
  skatten kommer → prisene faller (kapitalisering) → bør du vente? Hva koster
  ventingen, og hvor mye faller prisen? (åpent spørsmål)**
- **Personlig økonomi-poenget: unngå å være låst i et marked eller en
  investering der en ny skatt havner på deg.**

### Empiri

| Fakta | Verdi | Kilde |
|---|---|---|
| Overvelting av selskapsskatt, USA | 50 % på lønninger og produktpriser | Congressional Budget Office |
| Redusert matmoms | gir ikke tilsvarende lavere matpriser | forelesningen |
| Plattformskatt | mva på aviser kan senke avisprisen; skatt på data kan gi brukeravgift | «denne litteraturen» |
| Norges Bank | uavhengig rentesetting som troverdig binding | |
| Elbil | bompengefritak reversert når andelen ble høy | |

### Oppgavene

Ingen oppgavefil. **Eksamen H2024 oppgave 8** (9 poeng) er øvelsen:
(a) ∂p/∂t = D′(P)/(S′(p) − D′(P)); (b) ∂P/∂t = S′(p)/(S′(p) − D′(P));
(c) perfekt uelastisk etterspørsel → ∂p/∂t = 0. Feilalternativene bytter
teller/nevner eller setter D′ − S′ i telleren — kjenn fortegnene:
D′ < 0, S′ > 0, nevner > 0.

### Nytt / fjernet mot gammel versjon

Ingen gammel fil i mappa. Forelesningen er ny i denne formen (H2026-planen
har «Hvem betaler egentlig skatten» som egen forelesning 9 med Stiglitz som
pensum).
