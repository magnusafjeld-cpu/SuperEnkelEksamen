FIE432 PERSONLIG ØKONOMI — NHH
DEL II — AKSJONÆR- OG FORMUESBESKATNING

Innhold: Aksjonærmodellen (kap. 5). Fritaksmetoden, selskapsaksjonærer, aksjonærlån og exit-skatt (kap. 6). Formuesskatten: verdsetting, rabatter og gjeldsfordeling (kap. 7). Formuesskatt som avkastningsskatt (kap. 8).

Dette er én del av en lærebok på 20 kapitler. Henvisninger til kapitler utenfor
denne teksten peker på deler som ikke er med her.

Slik leses notasjonen:
- Tall skrives på norsk: mellomrom som tusenskille og komma som desimaltegn.
  «1 467 200» er én million; «37,84 %» er trettisyv komma åtti fire prosent.
- Minustegnet er «−», gangetegnet «×».
- «_» betyr senket skrift og «^» hevet skrift: A_(m,n) er A med fotskrift m,n.
- [dagens regel] merker en sats som faktisk gjelder for inntektsåret 2026.
  [eksempeltall] merker et tall som er oppdiktet eller hentet fra en
  eksamensoppgave, og som altså ikke er gjeldende rett.
- FORMEL / GJENNOMREGNET EKSEMPEL / MEKANISME / ADVARSEL / VANLIG FEIL / TIPS /
  KOBLING er blokktyper fra originalen, beholdt som etiketter.
- FIGUR-linjene beskriver en figur som ikke kan gjengis som tekst.

==============================================================================

## 5 · Aksjonærmodellen: skjerming, utbytte og gevinst

Ingen annen rutine i kurset gir like mange poeng. Skjerming er testet i fem av de ni settene i arkivet og tok 20 % av poengene i H2022; oppjustering og eierskatt går igjen i sju av ni. H2024 åpner med en firedelt skjermingskjede over tre år, H2025 har skjermingsfellen i oppgave 4 og gevinstregningen i oppgave 10, og H2025 oppgave 1 legger utbytteskatt og formuesskatt oppå hverandre. Regnestykket er det samme hver gang, og det har ett ledd som feller folk: ubenyttet skjerming framføres og legges til neste års skjermingsgrunnlag.

### 5.1 Modellen, og hvorfor satsen er 37,84 %

Aksjonærmodellen gjelder personlig aksjonær. Eier du aksjen gjennom et selskap, gjelder fritaksmetoden i stedet, og da er utbyttet i praksis skattefritt. For deg som privatperson skattlegges utbytte og aksjegevinst i to steg: først trekkes et skjermingsfradrag fra, så beskattes resten. Resten kalles eierinntekt, og beskatningen gjøres ved at grunnlaget først ganges med en oppjusteringsfaktor f og deretter med den alminnelige satsen t.

FORMEL:  t_e = f × t = 1,72 × 22 % = 37,84 %
FORMEL:  Skatt = skattepliktig grunnlag × f × t = skattepliktig grunnlag × t_e
   der:  f er oppjusteringsfaktoren og t skatten på alminnelig inntekt; begge er dagens regel for 2026. De to linjene er samme regning: du kan oppjustere grunnlaget og bruke 22 %, eller oppjustere satsen til 37,84 % og bruke grunnlaget som det er. Regn begge veier, alltid. Får du to ulike svar, har du oppjustert to ganger et sted.

MEKANISME — Hvorfor finnes oppjusteringsfaktoren i det hele tatt?
En krone tjent i et selskap og delt ut til eieren beskattes to ganger: 22 % i selskapet, og 37,84 % av de 78 ørene som er igjen. Samlet blir det 22 % + 78 % × 37,84 % = 51,52 %. Det skal ligne på den høyeste marginalskatten på lønn, som er 47,4 % [dagens regel]. Uten oppjusteringen ville samlet sats vært 22 % + 78 % × 22 % = 39,16 %, altså åtte prosentpoeng under lønn, og enhver som eide sitt eget selskap ville tatt lønnen sin som utbytte i stedet. Det er dette som kalles inntektsskifting, og faktoren finnes for å stenge døra.

Faktoren er ikke plukket ut av lufta. Den løses ut av en likevektsbetingelse som forelesningen kaller inntektsskiftningsligningen, og som eksamensfasitene i H2017 og H2020 skriver ut i tekst:

FORMEL:  t_w + a = t + (1 − t) × t × f
FORMEL:  f = (t_w + a − t) / ((1 − t) × t)
   der:  t_w er høyeste marginalskatt på lønn (47,4 %), t den alminnelige satsen (22 %), og a den delen av arbeidsgiveravgiften som veltes over på arbeidstakeren gjennom lavere lønn. Venstresiden er den samlede skatten på en lønnskrone, høyresiden den samlede skatten på en utbyttekrone.

Sett inn tallene. Bærer bedriften hele arbeidsgiveravgiften, er a = 0, og f = (0,474 − 0,22)/(0,78 × 0,22) = 0,254/0,1716 = 1,48, som gir en eierskatt på 1,48 × 22 % = 32,6 %. Veltes hele avgiften over på arbeidstakeren, er a = 12,4 prosentpoeng, og f = 0,378/0,1716 = 2,20, altså en eierskatt på 48,4 %. Dagens f = 1,72 ligger mellom dem og svarer til a ≈ 4,1 prosentpoeng, om lag en tredel av avgiften. Forelesningens påstand er at empirien om overvelting spriker (norske studier finner 15–30 %, én finsk finner ingen), og at satsen derfor hviler på en antakelse som ikke er avklart; motargumentet er at 51,52 % mot 47,4 % uansett er den sammenligningen lovgiveren har villet ha. Du skal kjenne argumentet, ikke ta parti.

### 5.2 Skjermingsrenten: formelen, satsene og året den gjelder

Skjermingsfradraget er skjermingsgrunnlaget ganget med årets skjermingsrente. Grunnlaget starter som aksjens kostpris, altså inngangsverdien, ikke markedsverdien. Skyter du inn ny egenkapital, øker grunnlaget; skrives egenkapitalen ned, faller det.

FORMEL:  r_s = (gjennomsnittlig 3-måneders statskasseveksel + 0,5 prosentpoeng) × (1 − t)
   der:  Skattedirektoratet fastsetter renten i januar året etter inntektsåret og runder den av til nærmeste tidel. Nedjusteringen med 22 % gjør den til en rente etter skatt, som er riktig sammenligningsgrunnlag når selve skjermingen er skattefri.

| Inntektsår | Statskasseveksel, 3 mnd | Regnestykket | Skjermingsrente |
|---|---|---|---|
| 2023 | 3,657 % | (3,657 + 0,5) × 0,78 = 3,24 | 3,2 % |
| 2024 | 4,4498 % | (4,4498 + 0,5) × 0,78 = 3,86 | 3,9 % |
| 2025 | 4,1480 % | (4,1480 + 0,5) × 0,78 = 3,63 | 3,6 % |
| 2026 | — | fastsettes i januar 2027 | ikke kjent |

Merk den siste raden. Skjermingsrenten for 2026 finnes ikke ennå, og kan ikke stå i noen formelsamling. Det er derfor eksamen alltid oppgir renten i oppgaveteksten, og derfor et flerårseksempel må bruke én rente per år: H2025 oppgave 4 bruker 3,5 % i 2023 og 4 % i 2024, mens H2024 oppgave 1 forenkler og setter 2 % i alle år.

MEKANISME — Hvorfor skal normalavkastningen være skattefri?
Et selskap som finansierer seg med gjeld, får trekke fra rentene. Et selskap som finansierer seg med egenkapital, får ikke trekke fra eierens alternativkostnad, selv om den er like reell. Uten en korreksjon ville skattesystemet dermed gjøre egenkapital dyrere enn gjeld og presse avkastningskravet opp. Skjermingsfradraget er korreksjonen: det fritar en risikofri normalavkastning på det eieren har skutt inn, slik at eierskatten bare treffer meravkastningen. I teorien gjør det staten til passiv medinvestor i den risikable delen av avkastningen, verken mer eller mindre.

### 5.3 Skjermingsrutinen: én rad per år

Rutinen er fire linjer, og de skal skrives i denne rekkefølgen hvert eneste år. Bruk år-indeks t, utbytte D og skjermingsgrunnlag S:

FORMEL:  S_t = kostpris + ubenyttet skjerming_t−1
FORMEL:  Skjermingsfradrag_t = S_t × r_s,t
FORMEL:  Skattepliktig utbytte_t = maks(0; D_t − skjermingsfradrag_t − ubenyttet skjerming_t−1)
FORMEL:  Ubenyttet skjerming_t = maks(0; ubenyttet skjerming_t−1 + skjermingsfradrag_t − D_t)
   der:  Legg merke til at «ubenyttet skjerming fra i fjor» står i tre av de fire linjene. Den øker grunnlaget, den trekkes fra utbyttet i tillegg til årets fradrag, og den er utgangspunktet for neste års rest. Skjermingen kan aldri gjøre skattepliktig utbytte negativt, og et ubrukt fradrag gir aldri tap; det framføres.

FIGUR: Figur 5.1 — Eierskatten på et års utbytte, med skjermingsgrunnlag kr 10 000 og skjermingsrente 2 %, altså et skjermingsfradrag på kr 200. Skatten er null helt opp til fradraget, og stiger deretter med 37,84 øre per krone. Den stiplede linjen viser hva skatten ville vært uten skjerming. Avstanden mellom kurvene er konstant så snart utbyttet passerer fradraget, og lik skjermingsfradraget × 37,84 % — her kr 75,68. Skjermingen er altså et bunnfradrag i utbyttet, ikke en lavere sats.
Figuren viser: Eierskatt som funksjon av utbyttets størrelse: null skatt opp til skjermingsfradraget, deretter en rett linje med helning 37,84 prosent

MEKANISME — Hvorfor teller ubenyttet skjerming to ganger?
Fordi den gjør to forskjellige ting. For det første er den et fradrag som ikke ble brukt, og som derfor skal trekkes fra et senere utbytte. For det andre legges den til skjermingsgrunnlaget, slik at neste års fradrag beregnes av et større beløp. Konsekvensen er at framført skjerming forrenter seg: kr 100 ubrukt skjerming gir neste år 100 × 2 % = kr 2 i tillegg, oppå de 100 kronene selv. Glemmer du den andre virkningen, blir svaret systematisk for høyt, og det er nøyaktig det ene av de gale alternativene i H2024 oppgave 1d.

GJENNOMREGNET EKSEMPEL — Gjennomregnet 1: skjermingskjeden over tre år (H2024 oppgave 1)
Kaia eier én aksje kjøpt for kr 10 000. Skjermingsrenten er 2 % i alle år [eksempeltall]. Hun mottar kr 500 i utbytte i år 1, kr 100 i år 2 og kr 400 i år 3. Oppgaven har fire deler, én per spørsmål, og de bygger på hverandre.

| År | Grunnlag S | Årets fradrag | Framført inn | Samlet fradrag | Utbytte | Skattepliktig | Framført ut |
|---|---|---|---|---|---|---|---|
| 1 | 10 000 | 200 | 0 | 200 | 500 | 300 | 0 |
| 2 | 10 000 | 200 | 0 | 200 | 100 | 0 | 100 |
| 3 | 10 100 | 202 | 100 | 302 | 400 | 98 | 0 |

Steg 1 — år 1, fradraget (deloppgave a). I det første året er grunnlaget kostprisen alene, for ingenting er framført ennå: 10 000 × 2 % = kr 200.

Steg 2 — år 1, skattepliktig utbytte (deloppgave b). 500 − 200 = kr 300. Utbyttet var større enn fradraget, så hele fradraget er brukt opp og det framføres ingenting. Skriv den nullen ned; den er premisset for deloppgave c. Merk at spørsmålet ber om grunnlaget, ikke om skatten. Skatten ville vært 300 × 37,84 % = 113,52.

Steg 3 — år 2 (deloppgave c). Grunnlaget er fortsatt 10 000, og fradraget igjen 200. Skattepliktig utbytte blir 100 − 200 = −100, men skjermingen kan ikke gjøre inntekten negativ, så svaret er kr 0. De 100 kronene som ikke ble brukt, framføres.

Steg 4 — år 3 (deloppgave d). Nå slår begge virkningene inn. Grunnlaget: 10 000 + 100 = kr 10 100. Årets fradrag: 10 100 × 2 % = kr 202. Samlet fradrag: 202 + 100 = kr 302. Skattepliktig utbytte: 400 − 302 = kr 98, som gir en skatt på 98 × 37,84 % = 37,08 dersom oppgaven hadde spurt om det.

Kontroll 1 — den framførte skjermingen forrenter seg. Samlet fradrag i år 3 kan regnes som 100 × 1,02 + 10 000 × 2 % = 102 + 200 = 302. Samme tall, annen vei. ✓

Kontroll 2 — delene skal summere til helheten. Utbyttene er 500 + 100 + 400 = 1 000. Skattepliktig utbytte er 300 + 0 + 98 = 398, og brukt skjerming er 200 + 100 + 302 = 602. 398 + 602 = 1 000. ✓ Går ikke den summen opp, har du enten mistet eller doblet et fradrag.

Hvilke gale tall feilene gir. Glemmer du framføringen helt, får du 400 − 200 = 200. Legger du den bare til grunnlaget uten å trekke den fra i tillegg, får du 400 − 202 = 198. Skriver du ned årets fradrag alene, får du 202; skriver du ned det samlede fradraget, får du 302; skriver du ned den framførte resten, får du 100. De tre siste sto som alternativ på eksamen sammen med det riktige 98 — hvert av dem er et korrekt mellomresultat plassert på feil linje.

GJENNOMREGNET EKSEMPEL — Gjennomregnet 2: to år, to renter, to desimaler (H2025 oppgave 4)
Sindre kjøpte en aksje i februar 2023 for kr 100 og hadde rett til utbytte i 2023, men selskapet betalte ingenting det året. Skjermingsrenten var 3,5 % i 2023 og 4 % i 2024 [eksempeltall; de faktiske satsene var 3,2 % og 3,9 %]. I 2024 mottok han kr 20 i utbytte. Hva er skattepliktig utbytte i 2024?

Steg 1 — fradraget i 2023. Grunnlaget er kostprisen kr 100. Fradrag: 100 × 3,5 % = 3,50. Ingen utbytte, så hele beløpet framføres.

Steg 2 — grunnlaget i 2024. 100 + 3,50 = 103,50. Dette leddet er hele oppgaven.

Steg 3 — fradraget i 2024. 103,50 × 4 % = 4,14.

| Post | Beløp |
|---|---|
| Utbytte 2024 | 20,00 |
| − framført ubenyttet skjerming fra 2023 | −3,50 |
| − skjermingsfradrag 2024 (103,50 × 4 %) | −4,14 |
| Skattepliktig utbytte | 12,36 |

Kontroll — la grunnlaget vokse. I et år uten utbytte vokser grunnlaget med skjermingsrenten: 100 × 1,035 × 1,04 = 107,64. Samlet skjerming til disposisjon i 2024 er da 107,64 − 100 = 7,64, som er nøyaktig 3,50 + 4,14. Og 20 − 7,64 = 12,36. ✓

Hvilke gale tall feilene gir. Regner du årets fradrag på kostprisen i stedet for på det oppjusterte grunnlaget, får du 100 × 4 % = 4,00 og svaret 12,50 — den vanligste feilen i hele temaet. Trekker du bare fra den framførte skjermingen, får du 16,50; trekker du bare fra årets fradrag, får du 15,86. På eksamen sto alternativene 16,12, 13,64 og 11,50 rundt det riktige svaret, plassert nettopp i disse klyngene.

VANLIG FEIL — Ubenyttet skjerming er ikke penger på bok
Det er lett å lese den framførte resten som et tilgodehavende hos staten. Den er det ikke. Den er en fradragsrett knyttet til den enkelte aksjen, og den har bare verdi hvis den aksjen senere gir utbytte eller gevinst. Går selskapet konkurs, eller selger du med tap, går den ubenyttede skjermingen tapt uten kompensasjon. Den kan redusere en gevinst til null, men kan verken skape eller øke et fradragsberettiget tap. Det er denne asymmetrien Bjerksund og Schjelderup peker på når de hevder at aksjonærmodellen ikke er nøytral: staten tar del i oppsiden, men ikke fullt ut i nedsiden, og da lønner det seg å holde kapitalen i selskapet i stedet for å ta den ut.

### 5.4 Gevinst ved salg

Ved salg byttes utbyttet ut med en gevinst, men resten av rutinen er den samme. Framført ubenyttet skjerming trekkes fra gevinsten, og det som blir igjen oppjusteres én gang.

FORMEL:  Skattepliktig gevinst = salgspris − inngangsverdi − ubenyttet skjerming
FORMEL:  Skatt = gevinst × f × t = gevinst × t_e
   der:  Inngangsverdien er kostprisen, justert for innskutt eller nedskrevet egenkapital. I salgsåret gis det ikke noe nytt skjermingsfradrag dersom du ikke eier aksjen ved årsskiftet; bare den allerede framførte skjermingen kan brukes.

GJENNOMREGNET EKSEMPEL — Gjennomregnet 3: gevinst med framført skjerming (H2025 oppgave 10)
Runar kjøpte en aksje for kr 100 i år 1 og selger den mot slutten av år 2 for kr 160. Han har kr 10 i ubenyttet skjermingsfradrag fra år 1. Oppgaven oppgir eierskatten som 22 % og oppjusteringsfaktoren som 1,72 [samme som dagens regel].

| Post | Beløp |
|---|---|
| Salgspris | 160 |
| − inngangsverdi | −100 |
| − ubenyttet skjerming fra år 1 | −10 |
| Skattepliktig gevinst | 50 |

Steg 1 — gevinsten. 160 − 100 − 10 = 50.

Steg 2 — oppjuster grunnlaget. 50 × 1,72 = 86, og 86 × 22 % = 18,92.

Steg 3 — oppjuster satsen i stedet. 1,72 × 22 % = 37,84 %, og 50 × 37,84 % = 18,92. ✓ De to veiene skal gi identisk svar, og det er den billigste kontrollen i hele kapitlet.

Kontroll. Runar sitter igjen med 50 − 18,92 = 31,08, altså 62,16 % av gevinsten, som er nøyaktig 1 − 37,84 %. ✓

Hvilke gale tall feilene gir. Glemmer du oppjusteringen, får du 50 × 22 % = 11,00 — og 11 sto som alternativ på eksamen. Kjenn den igjen på formen: et glemt oppjusteringssvar er alltid 22/37,84 = 58 % av det riktige. Ser du to alternativer der det ene er knapt seks tideler av det andre, er det oppjusteringsparet, og det høyeste av dem er som regel riktig. Glemmer du i stedet den ubenyttede skjermingen, blir gevinsten 60 og skatten 60 × 37,84 % = 22,70. Bruker du en gammel faktor, gir 1,6 svaret 17,60 og 1,66 svaret 18,26; alternativet 18,2 ligger nettopp der, og fanger den som husker en faktor fra et annet år i stedet for å lese den som står i teksten. Og skatter du av selve skjermingen, 10 × 37,84 % = 3,78, lander du på lokkealternativet 3,89.

Samme rutine, andre tall. H2024 oppgave 2 er identisk bygget: kjøpt for 50, solgt for 60, ubenyttet skjerming 5. Gevinst 60 − 50 − 5 = 5; skatt 5 × 1,72 × 22 % = 1,89. Der er fella at et glemt skjermingsfradrag dobler gevinsten fra 5 til 10 og gir 3,78, som ligger rett ved alternativet 3,89.

ADVARSEL — Årsskifteregelen: selger du før 31.12, får du ingen skjerming det året
Både utbytte og skjermingsfradrag tilordnes den som eier aksjen ved utgangen av året. Selger du i november, får du altså ikke årets skjermingsfradrag, bare den skjermingen som allerede er framført fra tidligere år. H2022 oppgave 1 tester nøyaktig dette: aksjen er kjøpt for kr 500 000, i 2022 er skjermingsrenten 10 % og det betales ikke utbytte, så 500 000 × 10 % = kr 50 000 framføres, og i 2023 selges aksjen for kr 550 000 før årsskiftet. Gevinsten blir 550 000 − 500 000 − 50 000 = 0, og skatten null. Legger du på et skjermingsfradrag for salgsåret også, får du et negativt tall og velger feil alternativ.

TIPS — Slik spørres det
Skjerming og gevinst kommer i tre former. Ett år, ett tall: «hva er skjermingsfradraget i år 1» (H2024 oppgave 1a) — gratis poeng, bare les renten riktig. Flere år med framføring: H2024 oppgave 1c og 1d, H2025 oppgave 4, H2022 oppgave 2 — her er alle de gale alternativene korrekte mellomresultater eller regnestykker med ett ledd utelatt, så skriv ned grunnlag, årets fradrag og framført rest hver for seg før du subtraherer. Gevinst med oppjustering: H2024 oppgave 2, H2025 oppgave 10 — regn begge veier, og se etter 58 %-paret blant alternativene. I alle tre formene lønner det seg å regne ferdig før du ser på alternativene: tallene er lagt tett, og et halvferdig svar treffer nesten alltid et av dem.

### 5.5 Utbytte og formuesskatt i samme regnestykke

Eksamen liker å legge to skatter oppå den samme aksjeposten, fordi de har hvert sitt grunnlag og fristelsen er å blande dem. Eierskatten treffer utbyttet minus skjermingsfradraget. Formuesskatten treffer aksjenes formuesverdi, altså markedsverdien etter verdsettingsrabatt, og den løper én gang per år du eier dem. Skjermingsfradraget har ingenting med formuesskatten å gjøre, og rabatten har ingenting med eierskatten å gjøre.

GJENNOMREGNET EKSEMPEL — Gjennomregnet 4: to skatter over to år (H2025 oppgave 1)
Per kjøpte børsnoterte aksjer i 2023 for kr 10 000 000, som er kostprisen. Han har rett til utbytte i 2023 og 2024. I 2023 mottar han kr 500 000 i utbytte og skjermingsrenten er 2 %; i 2024 kr 600 000 og skjermingsrenten er 4 %. Oppgaven oppgir eierskatten som 40 %, formuesskatten som 1 % og aksjerabatten som 20 % [eksempeltall — dagens eierskatt er 37,84 %]. Børsverdien er uendret. Se bort fra bunnfradrag. Hvor mye sitter Per igjen med av utbyttene?

Steg 1 — skjermingsgrunnlaget begge år. Utbyttet er i begge år større enn skjermingsfradraget, så det oppstår ingen ubenyttet skjerming å framføre. Grunnlaget er kr 10 000 000 begge år. Det er verdt å slå fast eksplisitt, for det er her flerårsfellen fra 5.3 ellers ville slått inn.

Steg 2 — eierskatten i 2023. Fradrag 10 000 000 × 2 % = 200 000. Skattepliktig utbytte 500 000 − 200 000 = 300 000. Skatt 300 000 × 40 % = 120 000.

Steg 3 — eierskatten i 2024. Fradrag 10 000 000 × 4 % = 400 000. Skattepliktig utbytte 600 000 − 400 000 = 200 000. Skatt 200 000 × 40 % = 80 000. Samlet eierskatt 120 000 + 80 000 = 200 000.

Steg 4 — formuesskatten. Formuesverdi 10 000 000 × (1 − 20 %) = 8 000 000. Skatt per år 8 000 000 × 1 % = 80 000, og over to år 160 000.

| Post | Beløp |
|---|---|
| Mottatt utbytte 2023 + 2024 | 1 100 000 |
| − eierskatt | −200 000 |
| − formuesskatt, to år | −160 000 |
| Igjen | 740 000 |

Kontroll. Samlet skatt er 360 000 av 1 100 000, altså 32,73 %. Regnet motsatt vei: 1 100 000 × (1 − 0,3273) = 740 000. ✓ At den samlede satsen ligger under den oppgitte eierskatten på 40 %, er også et rimelighetstegn: skjermingen tok 600 000 av utbyttet ut av grunnlaget og sparte 600 000 × 40 % = 240 000 i eierskatt, mer enn formuesskatten på 160 000 la til.

Hvilke gale tall feilene gir. Bruker du skjermingsfradraget bare i det første året, får du 1 100 000 − 360 000 − 160 000 = 580 000, som sto som alternativ. Glemmer du formuesskatten helt, får du 900 000. Regner du formuesskatten av full børsverdi uten rabatten, får du 700 000. De to siste sto ikke blant alternativene, og det er et signal du skal lære å bruke: treffer tallet ditt ingen av de fire, har du gjort en feil, og da skal du regne om, ikke velge det nærmeste.

En trykkfeil du bør kjenne. Sensorveiledningen skriver i én setning at utbytteskatt og formuesskatt er «200 000 og 120 000». De 120 000 er eierskatten for 2023 som har havnet på feil linje; avsnittet over regner selv 80 000 per år i to år, og sluttsvaret 740 000 forutsetter 160 000. Riktig alternativ er ikke berørt.

KOBLING — Videre til kapittel 7 og 8
Formuesverdien og rabattene er kapittel 7: der lærer du at aksjer og aksjefond verdsettes til 80 %, primærbolig til 25 % under terskelen, og hvordan gjelden fordeles forholdsmessig etter bruttoverdi og avkortes med rabatten for aksjer, men ikke for primærbolig. Kapittel 8 tar det neste spørsmålet: hvor stort utbytte må du ta for å betale formuesskatten når utbyttet selv beskattes. Svaret er D = τ_wW/(1 − t_e), og med formuesskatt kr 1 000 og eierskatt 50 % gir det 1 000/0,5 = kr 2 000, som er H2025 oppgave 6. Feilen som gir alternativet er å legge skatten oppå i stedet for å brutto-regne, altså 1 000 × 1,5 = 1 500.

### 5.6 Når oppgaven oppgir andre satser enn dagens

Satsene har endret seg, og eksamensoppgavene bruker satsene som gjaldt da settet ble laget, eller rene eksempeltall valgt for å gjøre regningen pen. Oppgaveteksten oppgir dem nesten alltid, og da er det oppgavens tall som gjelder, ikke det du husker.

| Sett og oppgave | Faktor f | Sats t | Eierskatt t_e | Merknad |
|---|---|---|---|---|
| H2022 oppgave 1 | 1,6 | 25 % | 40,0 % | Oppgitt i teksten som «2020-regler» |
| H2024 oppgave 2 | 1,72 | 22 % | 37,84 % | Som i dag |
| H2025 oppgave 10 | 1,72 | 22 % | 37,84 % | Som i dag |
| H2025 oppgave 1 | — | — | 40 % | Eierskatten oppgitt direkte |
| 2026 | 1,72 | 22 % | 37,84 % | [dagens regel] |

H2022 oppgave 1 er verdt å kjenne fordi den er den samme regnekjeden med andre tall: selskapet tjener kr 150 000 og betaler 22 % i selskapsskatt, altså kr 33 000. Utbyttet blir 150 000 − 33 000 = kr 117 000. Skjermingen er 500 000 × 5 % = kr 25 000, så skattepliktig utbytte er kr 92 000. Oppjustert: 92 000 × 1,6 = 147 200, og eierskatten 147 200 × 25 % = kr 36 800. Kontrollen den andre veien: 92 000 × 40 % = 36 800. ✓ Effektiv skatt på utbyttet er 36 800/117 000 = 31,5 %, og samlet skatt på selskapets overskudd (33 000 + 36 800)/150 000 = 46,5 %. Med dagens satser ville det siste tallet vært 51,52 %.

ADVARSEL — Satsen i oppgaveteksten går alltid foran hukommelsen
Med minuspoeng koster en gammel sats dobbelt. Tre ting å sjekke i teksten før du regner: hvilken skjermingsrente som gjelder hvert år, om eierskatten er oppgitt som en faktor og en sats som skal ganges sammen eller som én ferdig prosent, og om oppgaven ber om skattepliktig grunnlag eller skattebeløp. Det siste er den billigste feilen som finnes: H2024 oppgave 1b spør om skattepliktig utbytte og har kr 300 som riktig svar, mens skatten av det samme beløpet er 113,52. Er ingen av alternativene skattebeløp, ber oppgaven om grunnlaget.

## 6 · Fritaksmetoden, selskapsaksjonærer, aksjonærlån og exit-skatt

Kapittel 5 lærte deg hva den personlige aksjonæren betaler. Dette kapitlet handler om veiene rundt den regningen, og hvorfor de fleste er stengt. Fritaksmetoden er pensum til forelesning 4 og 5 og premisset for argumentet om de rikestes effektive skatt i kapittel 8. Exit-skatt er testet i to av ni sett: H2022 oppgave 4 ga seks av 35 poeng til fem spørsmål om utflytting, og H2024 oppgave 10 ga ni av 48, der de to siste delspørsmålene er gave til nærstående i utlandet og utflytting av selskapet. Regningen er kort. Faktaene er mange, og det er de som gir poengene.

### 6.1 Fritaksmetoden: hva selskapet slipper, og hva det mister

Regelen står i skatteloven § 2-38: et aksjeselskap betaler ikke skatt på utbytte og gevinst på aksjer i selskap hjemmehørende i EØS, og utenfor EØS bare på vilkår. Motstykket står i samme bestemmelse: tap på slike aksjer er ikke fradragsberettiget. Både oppsiden og nedsiden er tatt ut av selskapets skatteregnskap.

| Hvem eier aksjen | Utbytte | Gevinst | Tap | Regel |
|---|---|---|---|---|
| Personlig aksjonær | 37,84 % over skjermingen | 37,84 % | fradragsberettiget | aksjonærmodellen |
| Selskapsaksjonær | fritatt, men 3 % inntektsføres | helt fritatt | ikke fradragsberettiget | fritaksmetoden § 2-38 |

Satsene er [dagens regel] for 2026. Legg merke til symmetrien: personen beskattes symmetrisk for gevinst og tap, selskapet for ingen av delene.

MEKANISME — Hvorfor skal utbytte mellom selskaper være skattefritt?
Fordi alternativet er kjedebeskatning. I en kjede på tre selskaper betaler driftsselskapet 22, mellomselskapet 22 % av de 78 som kommer inn, holdingselskapet 22 % av resten, og til slutt kommer eierskatten: samme krone treffes fire ganger, og resultatet avhenger bare av hvor mange ledd konsernet tilfeldigvis har. Fritaksmetoden beskatter i stedet én gang i selskapssektoren og én gang hos personen.

ADVARSEL — Fritaket gjelder tapet også
Et selskap som taper 10 mill. kr på en aksjepost, får ingenting igjen på skatten; en personlig aksjonær får fradrag verdt 10 mill. × 37,84 % = 3 784 000. Påstanden «fritaksmetoden er en fordel i alle tilfeller» er derfor gal.

### 6.2 Treprosentregelen: 0,66 %, og hvorfor den bare treffer utbytte

Fritaket for utbytte er ikke helt fullt. Etter § 2-38 sjette ledd skal 3 % av mottatt utbytte inntektsføres som alminnelig inntekt hos det mottakende selskapet:

FORMEL:  Effektiv skatt på konsernutbytte = 3 % × t = 3 % × 22 % = 0,66 % av utbyttet
   der:  t er satsen på alminnelig inntekt. Regelen gjelder bare utbytte, ikke gevinst, og ikke når mottakeren eier mer enn 90 % av det utdelende selskapet og har mer enn 90 % av stemmene; innenfor et slikt konsern er utbyttet fullt skattefritt. Alle tre tallene er [dagens regel] og har stått uendret gjennom hele eksamensarkivet.

Regn den én gang, så sitter den. Mottar holdingselskapet kr 100 i utbytte og eier under 90 %, inntektsføres 100 × 3 % = 3, og skatten blir 3 × 22 % = 0,66. Forelesningens kommentar er at «i praksis kan vi glemme den» — for liten til å styre en beslutning, men ikke til å droppe på eksamen.

Begrunnelsen forklarer hvorfor regelen ser så rar ut. Den er ikke en skatt på inntekt, men en sjablong for kostnader: selskapet får trekke fra kostnadene ved å eie aksjene — forvaltning, rådgivning, renter på lånet som finansierer posten — samtidig som inntekten fra dem er skattefri. I stedet for å fordele hver kostnad mellom skattefri og skattepliktig virksomhet, tilbakefører lovgiveren sjablongmessig 3 % av utbyttet. Gevinster er holdt utenfor fordi de kommer sjeldnere og i større klumper, og over 90 % eierskap finnes ingen tredjepart å skyve kostnader til.

### 6.3 Holdingselskapet er en utsettelse, ikke et fritak

Dette er kapitlets viktigste poeng. Legger du et holdingselskap mellom deg og driftsselskapet, endres ikke den samlede skatten på en krone som til slutt havner i lommeboka di — bare når den betales.

FORMEL:  Samlet skatt på utdelt overskudd = τ_c + (1 − τ_c) × t_e = 22 % + 78 % × 37,84 % = 51,52 %
   der:  τ_c er selskapsskatten og t_e eierskatten. Uttrykket inneholder ingen ledd for antall selskaper i kjeden — det er nettopp det fritaksmetoden sørger for. Satsen 51,52 % er den samme som i kapittel 1 og 5, og referansen er toppmarginalskatten på lønn, 47,4 % [dagens regel].

GJENNOMREGNET EKSEMPEL — Gjennomregnet 1: kjeden drift → holding → person, med og uten konsernunntaket
Driftsselskapet tjener kr 1 000 000 og deler alt ut til holdingselskapet, som deler alt videre til den personlige eieren. Satsene er [dagens regel]: selskapsskatt 22 %, eierskatt 37,84 %. Skjermingsfradraget er brukt opp.

Steg 1 — selskapsskatten. 1 000 000 × 22 % = 220 000. Til utdeling: 1 000 000 − 220 000 = 780 000.

Steg 2a — holdingselskapet eier over 90 % (konsern). Utbyttet er fullt skattefritt, og treprosentregelen gjelder ikke. Holdingselskapet mottar og videresender 780 000.

Steg 3a — eierskatten. 780 000 × 37,84 % = 295 152. Eieren sitter igjen med 780 000 − 295 152 = 484 848.

Steg 4a — samlet skatt. 220 000 + 295 152 = 515 152, altså 515 152/1 000 000 = 51,52 % — nøyaktig som ved direkte eie. Holdingselskapet flyttet ingen skatt, bare tidspunktet.

Steg 2b og 3b — holdingselskapet eier 80 %. Treprosentregelen slår inn: inntektsført 780 000 × 3 % = 23 400, skatt 23 400 × 22 % = 5 148, som er det samme som 780 000 × 0,66 % = 5 148. Igjen: 780 000 − 5 148 = 774 852, og eierskatten 774 852 × 37,84 % = 293 204.

Steg 4b — samlet skatt. 220 000 + 5 148 + 293 204 = 518 352, altså 518 352/1 000 000 = 51,84 %.

Kontroll: forskjellen mellom variantene er treprosentskatten minus den eierskatten den sparer deg for, siden den krymper utbyttegrunnlaget: 5 148 × 62,16 % = 3 200, og 515 152 + 3 200 = 518 352. ✓ Treprosentregelen kostet 0,32 prosentpoeng, ikke 3 %.

Hvilke gale tall de vanligste feilene ville gitt. Holdingselskapet skattlagt ordinært: 780 000 × 22 % = 171 600 i tillegg, samlet sats 62,18 %. Fritaksmetoden lest som endelig fritak for eieren: 22 %. «3 %» lest som skattesats: 23 400 i stedet for 5 148. Og treprosentregelen brukt på en gevinst gir en skatt som ikke finnes.

FIGUR: Figur 6.1 — Kjeden fra overskudd til lommebok. Fritaksmetoden gjør mellomleddet gjennomsiktig: selskapsskatt én gang, eierskatt én gang, uansett hvor mange ledd som ligger imellom. Ta med deg at sluttsatsen 51,52 % er uavhengig av kjedens lengde, og at holdingselskapets eneste virkning er at eieren selv bestemmer når den siste pilen tegnes.
Figuren viser: Kjede av tre bokser. Driftsselskapet tjener en million og betaler 220 000 i selskapsskatt. Utbyttet på 780 000 går skattefritt til holdingselskapet etter fritaksmetoden. Holdingselskapet deler ut de samme 780 000 til den personlige eieren, som betaler 295 152 i eierskatt og sitter igjen med 484 848. Samlet skatt er 515 152, altså 51,52 prosent.

VANLIG FEIL — «Med holdingselskap slipper du utbytteskatten»
Halvveis sant, og derfor farlig. Du slipper ikke skatten, du velger tidspunktet: står pengene i holdingselskapet, reinvesterer du hele beløpet i stedet for 62,16 % av det, men tar du dem ut, kommer 37,84 % som før. Det som er verdt penger er utsettelsen. Dagens Næringsliv anslo i 2019 ca. 400 mrd. kr opptjent i selskapene til de 650 rikeste, med ca. 125 mrd. kr i utsatt skatt.

### 6.4 Et to-hodet troll: hva utsettelsen er verdt

Bjerksund og Schjelderup kaller kombinasjonen av aksjonærmodellen og fritaksmetoden et to-hodet troll (BS2, 2021). Sammen gir de to reglene en skattekreditt til den som eier gjennom selskap: fritaksmetoden lar kapitalen omplasseres uten skatt, og aksjonærmodellen lar eieren bestemme når skatten utløses.

GJENNOMREGNET EKSEMPEL — Gjennomregnet 2: samme omplassering, to eierformer
En investor har aksjer verdt kr 10 000 000 med inngangsverdi kr 2 000 000 og vil bytte til et annet selskap. Verdien dobler seg fram til han vil ha pengene ut [eksempeltall; om lag 7 % i året i ti år]. Eierskatten er 37,84 % [dagens regel], og skjermingsfradraget holdes utenfor.

Steg 1 — personlig eie, salget nå. Gevinst 10 000 000 − 2 000 000 = 8 000 000, skatt 8 000 000 × 37,84 % = 3 027 200, igjen å reinvestere 10 000 000 − 3 027 200 = 6 972 800.

Steg 2 — personlig eie, fram til slutten. 6 972 800 × 2 = 13 945 600. Ny gevinst 13 945 600 − 6 972 800 = 6 972 800, skatt 6 972 800 × 37,84 % = 2 638 508, netto 13 945 600 − 2 638 508 = 11 307 092.

Steg 3 — holding, salget nå. Fritaksmetoden gjør gevinsten skattefri, og hele 10 000 000 reinvesteres.

Steg 4 — holding, fram til slutten. 10 000 000 × 2 = 20 000 000, og selskapet tømmes. Inngangsverdien på holdingaksjene er 2 000 000, så skattepliktig beløp er 20 000 000 − 2 000 000 = 18 000 000 og skatten 18 000 000 × 37,84 % = 6 811 200. Netto: 20 000 000 − 6 811 200 = 13 188 800.

| Post | Personlig eie | Holding |
|---|---|---|
| Reinvestert | 6 972 800 | 10 000 000 |
| Verdi ved slutten | 13 945 600 | 20 000 000 |
| Skatt til slutt | 2 638 508 | 6 811 200 |
| Igjen etter all skatt | 11 307 092 | 13 188 800 |

Kontroll: fordelen er 13 188 800 − 11 307 092 = 1 881 708, og den skal være avkastningen på skatten du ikke betalte i dag, etter at avkastningen selv er beskattet: den utsatte skatten 3 027 200 dobler seg og gir like mye i avkastning, hvorav 62,16 % overlever. 3 027 200 × 62,16 % = 1 881 708. ✓

Hvilke gale tall de vanligste feilene ville gitt. Glemt tømming av holdingselskapet: 20 000 000. Fordelen satt lik den utsatte skatten selv: 3 027 200, for høyt, siden skatten kommer tilbake og bare avkastningen på den beholdes. Glemt andre gevinstbeskatning i alternativ 1: 13 945 600. Og 22 % i stedet for 37,84 % gir tall som ligger 58 % feil, akkurat som i kapittel 5.

MEKANISME — Hvorfor er en utsatt skatt verdt penger i det hele tatt?
Fordi utsatt skatt er et rentefritt lån fra staten som du får investere for egen regning, og fordelen vokser med horisonten og avkastningen. Bjerksund og Schjelderup viser at kreditten er størst for den som alt har et etablert selskap: med 15 års horisont er forventet eierskattekreditt kr 0,36 per krone i et nystartet selskap og kr 0,60 i et etablert. Systemet bryter dermed både effektivitetsprinsippet og evneprinsippet.

Grunnartikkelen er BS3, Er den norske aksjonærbeskatningen nøytral? Svaret er nei, i to trinn du bør kunne som påstander. Modellen er asymmetrisk: gevinst over skjermingen skattlegges, mens ubenyttet skjermingsfradrag går tapt ved realisasjon, så staten tar del i oppsiden, men ikke i nedsiden. Og den er ikke nøytral selv under full symmetri: det krever at investoren kan låne til skjermingsrenten, og lånerenten er høyere. Empirien: tilbakeholdt overskudd i norske aksjeselskaper vokste fra ca. 760 mrd. kr i 2000–2004 til ca. 2 486 mrd. kr i 2016. Internasjonalt kalles dette lock-in: når skatten utløses ved realisasjon, blir det å la være å realisere en kilde til avkastning i seg selv. To klassiske posisjoner hører med. Old view: utbytteskatt øker kapitalkostnaden og reduserer investeringene. New view: ikke for selskaper som finansierer seg med tilbakeholdt overskudd, siden skatten treffer likt om pengene tas ut nå eller senere. Kapittel 8 tar tråden videre: lav verdsetting av unoterte aksjer pluss utsatt eierskatt er hovedforklaringen på at effektiv skattesats faller for topp 1 % i figur 1.1.

### 6.5 Aksjonærlån: omveien som ble stengt i 2015

Er eierskatten 37,84 % og pengene står i selskapet, ligger en enkel idé snublende nær: la selskapet låne deg pengene i stedet for å dele dem ut. Et lån er ingen inntekt, og det trenger aldri å bli innfridd. Fram til 2015 fungerte det. Siden 2015 skattlegges lån fra selskap til personlig aksjonær som utbytte på utbetalingstidspunktet.

Låner du kr 500 000 av ditt eget selskap, skattlegges beløpet som utbytte: 500 000 × 37,84 % = 189 200 [dagens regel], i den grad du ikke har skjerming å trekke fra. Du skylder fortsatt selskapet pengene, så du sitter igjen med kontantene, en skatteregning og en gjeld — strengt dårligere enn utbytte. Unntaket er lån under kr 100 000 som tilbakebetales innen 60 dager. Regelen omfatter også lån til aksjonærens nærstående og sikkerhetsstillelse fra selskapet.

MEKANISME — Hvorfor skattlegges et lån som om det var en utdeling?
Fordi realiteten er den samme når låntakeren kontrollerer långiveren: en eier som selv bestemmer rente, avdragsplan og om lånet noen gang blir krevd inn, har i praksis fått pengene utdelt. Prinsippet er substans over form. Regelen er ingen ekstraskatt — den gjør låneveien like dyr som utbytteveien.

### 6.6 Ut av landet og over til neste generasjon: exit-skatt, gave og arv

Den siste veien rundt eierskatten er å flytte. Fram til 29. november 2022 kunne latente gevinster realiseres uten norsk skatt etter mer enn fem år i utlandet — femårsregelen. Den er opphevet. Etter innstrammingen med virkning fra 20. mars 2024 er hovedregelen i skatteloven § 10-70 denne:

FORMEL:  Exit-skatt = (markedsverdi − inngangsverdi − bunnfradrag) × t_e
   der:  Latent gevinst på aksjer, egenkapitalbevis, fondsandeler, aksjesparekonto og fondskonto anses realisert dagen før utflytting, med bunnfradrag 3 mill. kr og eierskatt 37,84 % [dagens regel]. Bare verdistigningen mens du var bosatt i Norge teller. Skatten fastsettes endelig: faller aksjene senere i verdi, settes den ikke ned.

Så velger du én av tre betalingsmåter: (1) rentefrie årlige rater over 12 år, (2) hele beløpet etter 12 år, med renter, eller (3) alt med en gang. Utsettelse forutsetter sikkerhet; pant i aksjene godtas. Tar du utbytte etter utflyttingen, forfaller et beløp lik utdelingen ganget med 0,7. Flytter du tilbake innen 12 år med aksjene i behold, faller skatten bort.

GJENNOMREGNET EKSEMPEL — Gjennomregnet 3: exit-skatten og de tre betalingsvalgene
En aksjonær flytter til Sveits. Aksjene er verdt kr 25 000 000 dagen før utflytting, inngangsverdien er kr 5 000 000, og alt er opptjent mens han bodde i Norge. Satsene er [dagens regel]: bunnfradrag 3 mill. kr, eierskatt 37,84 %.

Steg 1 og 2 — latent gevinst og grunnlag. 25 000 000 − 5 000 000 = 20 000 000, og etter bunnfradraget 20 000 000 − 3 000 000 = 17 000 000.

Steg 3 — skatten. 17 000 000 × 37,84 % = 6 432 800, og tallet er nå låst uansett hva aksjene senere er verdt.

Steg 4 — valg 1, tolv rentefrie rater. 6 432 800/12 = 536 067 i året. Med alternativavkastning 5 % [eksempeltall] er annuitetsfaktoren for tolv år 8,8633, så nåverdien er 536 067 × 8,8633 = 4 751 323.

Steg 5 — valg 3, betale straks. Nåverdi 6 432 800. Ratene sparer 6 432 800 − 4 751 323 = 1 681 477, altså 1 681 477/6 432 800 = 26,14 % av skatten.

Steg 6 — valg 2, alt etter tolv år med renter. Krever staten samme rente som du selv oppnår, er nåverdien nøyaktig 6 432 800 — det samme som å betale straks. Valget lønner seg bare hvis din avkastning overstiger statens rentesats.

Kontroll: rangeringen følger av rentefriheten alene. Valg 1 er den eneste med rentefri kreditt og må være best så lenge avkastningen din er positiv; valg 2 er forrentet og i beste fall like god som å betale straks. Sjekk også at ratene summerer: 12 × 536 067 = 6 432 804, altså 6 432 800 pluss fire kroner avrunding. ✓

Hvilke gale tall de vanligste feilene ville gitt. Glemt bunnfradrag: 20 000 000 × 37,84 % = 7 568 000. Glemt oppjustering, altså 22 % brukt: 17 000 000 × 22 % = 3 740 000. Regnet av markedsverdien i stedet for gevinsten: 25 000 000 × 37,84 % = 9 460 000. Bunnfradraget trukket fra markedsverdien i stedet for fra gevinsten: 22 000 000 × 37,84 % = 8 324 800. Fire feil, fire tall, og alle fire ser ut som ekte skattebeløp.

To utvidelser er testet direkte. Gave til nærstående bosatt i utlandet utløser exit-skatt når netto gevinst overstiger kr 100 000 i året, og tolvårsregelen gjelder ikke gavemottakeren: du trenger ikke flytte selv, det holder at aksjene gjør det. Flytter selskapet ut, gjøres det opp på begge nivåer etter § 10-71, som om selskapet var likvidert: selskapet for eiendelene, aksjonærene for aksjene.

ADVARSEL — Femårsregelen i H2022 er ikke gjeldende rett
H2022 oppgave 4 har et spørsmål der riktig svar er at exit-skatten bortfaller hvis aksjene ikke selges innen fem år etter utflytting. Det var riktig da settet ble laget, men femårsregelen ble opphevet 29. november 2022, og innstrammingen fra 20. mars 2024 erstattet den med tolvårsordningen og bunnfradraget på 3 mill. kr. En foreldet regel koster like mye som en glemt.

TIPS — Slik spørres det
Exit-skatt kommer nesten alltid som faktaspørsmål, og fem former er dokumentert. (1) Når utløses skatten? Dagen før utflytting, og en skatteavtale beskytter deg ikke (H2022 oppgave 4). (2) Når opphører skattemessig bosted? Etter utflyttingsåret pluss tre hele mellomliggende år — flytter du i 2022, er du ute først i 2026 (H2022 oppgave 4). (3) Gave til nærstående i utlandet? Utløser exit-skatt over 100 000 kr i året (H2024 oppgave 10). (4) Selskapet flytter ut? Realisasjonsbeskatning på begge nivåer (H2022 oppgave 4 og H2024 oppgave 10). (5) Selskap stiftet i Norge, ingen skatteavtale — fortsatt hjemmehørende her? Ja (H2022 oppgave 4). Fem fakta, tre minutter å repetere, og temaet tok 19 % av poengene i H2024.

Til slutt et faktum det spørres om fordi de fleste tror det motsatte. Arveavgiften er avskaffet fra 1. januar 2014, men arv og gave er ikke skattefritt: samtidig ble kontinuitetsprinsippet innført i skatteloven § 9-7, slik at mottakeren overtar giverens inngangsverdi og øvrige skatteposisjoner. Den latente gevinsten følger med gaven, og skatten kommer når mottakeren selger.

| Objekt | Mottakerens inngangsverdi | Virkning |
|---|---|---|
| Aksjer og fondsandeler | giverens inngangsverdi (kontinuitet) | latent gevinst arves; skatten kommer ved salg |
| Bolig, fritidsbolig og gårdsbruk giveren kunne solgt skattefritt | antatt salgsverdi på ervervstidspunktet (diskontinuitet) | den latente gevinsten forsvinner |

Unntaket er logisk: kunne giveren solgt boligen skattefritt etter bo- og eiertidsreglene, ville det vært vilkårlig om gaven skapte en skatt salget ikke ville gjort. For aksjer finnes ingen slik skattefrihet. Konsekvensen er også et typisk påstandsalternativ: å gi bort aksjer til barna fjerner ikke skatten, den flytter den — og går gaven til et barn i utlandet, utløses i tillegg exit-skatt over 100 000 kr i året.

KOBLING — Videre til kapittel 13
Bosted, skatteavtaler og unntaks- mot kreditmetoden hører til kapittel 13. Der finner du resten av H2024 oppgave 10: sju delspørsmål om globalskatteplikt, fast driftssted, unntak og kredit, før den lander på de to exit-spørsmålene du nå kan. Øv på dem samlet — det er slik oppgaven er bygget.

## 7 · Formuesskatten: verdsetting, rabatter og gjeldsfordeling

Forholdsmessig gjeldsfordeling er den tyngste enkeltrutinen i faget målt i poeng per spørsmål. Den er i sju av ni eksamenssett, den står for 7,6 % av alle poengene, og den kommer i to varianter som gir forskjellige svar: H2024 oppgave 6 sa uttrykkelig at gjelden skulle avkortes, H2025 oppgave 2 sa det ikke, og der godtok sensor to svar. Verdsettingen er den andre halvparten, med tre sett bak seg. Kapitlet gir deg én fast tabell med seks rader som løser hele familien, og de tallene hver av de vanlige feilene gir.

### 7.1 Satsene, bunnfradraget og den kommunale andelen

Formuesskatten beregnes av nettoformuen: summen av alle formuesverdier etter verdsettingsrabatt, minus fradragsberettiget gjeld. Fra den trekkes bunnfradraget, og resten skattlegges i to trinn.

FORMEL:  Formuesskatt = τ_w,1 × [min(W, K) − B] + τ_w,2 × max(0, W − K)
   der:  W er nettoformuen, B bunnfradraget og K innslagspunktet for den høyeste satsen. For 2026 [dagens regel]: τ_w,1 = 1,0 %, τ_w,2 = 1,1 %, B = 1 900 000 kr for enslige og 3 800 000 kr samlet for ektefeller, K = 21 500 000 kr. Både B og K måles på nettoformuen selv, ikke på et grunnlag som allerede er redusert.

Ett eksempel så du ser trinnene: en enslig med nettoformue 30 000 000 kr betaler 1,0 % av (21 500 000 − 1 900 000) = 196 000 kr, pluss 1,1 % av (30 000 000 − 21 500 000) = 93 500 kr, til sammen 289 500 kr. Kontrollen går den enkle veien: 1,0 % av hele grunnlaget (30 000 000 − 1 900 000) er 281 000 kr, og det ekstra tiendedels prosentpoenget over innslagspunktet er 0,1 % × 8 500 000 = 8 500 kr. 281 000 + 8 500 = 289 500. ✓

| Parameter | 2024 | 2025 | 2026 |
|---|---|---|---|
| Samlet sats, trinn 1 | 1,0 % | 1,0 % | 1,0 % |
| Samlet sats, trinn 2 | 1,1 % | 1,1 % | 1,1 % |
| Innslagspunkt trinn 2 | 20 000 000 | 20 700 000 | 21 500 000 |
| — herav kommunal sats (maks) | 0,70 % | 0,525 % | 0,35 % |
| — herav statlig sats, trinn 1 / trinn 2 | 0,30 / 0,40 % | 0,475 / 0,575 % | 0,65 / 0,75 % |
| Bunnfradrag, enslig | 1 700 000 | 1 760 000 | 1 900 000 |
| Bunnfradrag, ektefeller samlet | 3 400 000 | 3 520 000 | 3 800 000 |
| Terskel for primærboligens 70 %-sjikt | 10 mill. | 10 mill. | 14 mill. |

Legg merke til raden om den kommunale satsen. Den er halvert fra 0,70 % i 2024 til 0,35 % i 2026, mens den statlige satsen er hevet nøyaktig like mye: 0,30 → 0,65 % i trinn 1 og 0,40 → 0,75 % i trinn 2. Summen er 1,0 % og 1,1 % i alle tre år. Det betyr at omleggingen ikke endrer én eneste skatteregning — den flytter bare provenyet fra kommunene til staten, og kommunene kompenseres gjennom inntektssystemet. Dette er et rendyrket faktaspørsmål, og det ser ut som en satsendring uten å være det: alternativet «formuesskatten er satt ned fra 2024 til 2026» er feil, mens «den kommunale andelen er halvert uten at samlet sats er endret» er riktig. Lær raden som tre tall, 0,70 → 0,525 → 0,35, med statlig sats som resten opp til 1,0 og 1,1.

Til bakgrunn: SSB har registrert utlignet formuesskatt for 2024 på 31,1 mrd. kr, betalt av 701 482 personer, altså 15,4 % av alle bosatte over 17 år. Ifølge Prop. 1 LS (2025–2026) har rundt 3 100 personer, 0,07 % av befolkningen, skattepliktig nettoformue over 100 mill. kr.

### 7.2 Verdsettingen: hva hvert aktivum teller med

Formuesskatten treffer aldri markedsverdien. Den treffer formuesverdien, som er markedsverdien redusert med en verdsettingsrabatt ρ som er fastsatt per aktivaklasse. Rabatten er hele grunnen til at to personer med samme reelle formue kan betale svært ulik skatt, og den er hovedkilden til de gale alternativene på eksamen.

| Aktivum | Verdsettes til | Rabatt ρ | Utløser gjeldsreduksjon? |
|---|---|---|---|
| Børsnoterte aksjer og aksjeandel i verdipapirfond | 80 % | 20 % | Ja |
| Unoterte aksjer (av selskapets skattemessige formuesverdi) | 80 % | 20 % | Ja |
| Næringseiendom | 80 % | 20 % | Ja |
| Varebeholdning, driftsmidler, andel i deltakerfastsatt selskap | 80 % | 20 % | Ja |
| Primærbolig, delen opp til 14 mill. | 25 % | 75 % | Nei |
| Primærbolig, delen over 14 mill. | 70 % | 30 % | Nei |
| Sekundærbolig | 100 % | 0 % | — |
| Fritidsbolig | maks 30 % av dokumentert verdi | — | Nei |
| Bankinnskudd, obligasjoner, annen formue | 100 % | 0 % | — |

Alle tallene er [dagens regel] for 2026, og med unntak av primærboligterskelen har de vært uendret siden 2023. To presiseringer du trenger:

- Unoterte aksjer verdsettes ikke til markedsverdi. Grunnlaget er selskapets egen skattemessige formuesverdi, altså bokførte eiendeler minus gjeld, målt 1. januar året før. Først på det tallet legges de 20 prosentene i rabatt. Et selskap markedet priser til 100 mill., men som har 10 mill. i bokførte eiendeler og ingen gjeld, har formuesverdi 10 mill. før rabatt.
- Sekundærbolig og bankinnskudd har ingen rabatt, og de utløser derfor heller ingen reduksjon av gjelden. Det gjør dem til de «dyre» aktivaene i formuesskatten, og det er nettopp derfor de brukes i oppgavene: de er kontrollposten som avslører om du har regnet rabattene riktig andre steder.

MEKANISME — Hvorfor er unotert så mye billigere enn børsnotert?
Fordi de to måles med hver sin målestokk. Børskursen er en markedspris som fanger opp forventet framtidig inntjening; bokført verdi er historisk kostpris minus avskrivninger og gjeld. For et selskap med verdifull kunnskap, merkevare eller kontrakter, men få fysiske eiendeler, er avviket enormt. SSB anslår at unoterte aksjer i gjennomsnitt verdsettes til 35–40 % av markedsverdien, mens forskning på de aller rikeste finner formuesgrunnlag rundt 10 % av markedsverdien. Det er dette som gjør at det kan lønne seg å ta et selskap av børs, og det er den empiriske kjernen i debatten om formuesskattens fordelingsvirkning.

### 7.3 Primærboligens to sjikt og terskelen på 14 millioner

Primærboligen har den største rabatten i systemet, men bare opp til en terskel. Over den faller rabatten fra 75 til 30 %:

FORMEL:  Formuesverdi_primærbolig = 0,25 × min(M, T) + 0,70 × max(0, M − T)
   der:  M er den beregnede eller dokumenterte omsetningsverdien og T terskelen. T = 14 000 000 kr fra og med inntektsåret 2026 [dagens regel], og 10 000 000 kr i 2024 og 2025 — altså i alle eksamenssettene til og med H2025. Sekundærbolig har ingen slik trapp: den verdsettes til 100 % av hele verdien.

Hevingen kom i revidert nasjonalbudsjett i mai 2026 og gjelder for hele inntektsåret. Bakgrunnen var at Skatteetaten fra 2026 tok i bruk SSBs oppdaterte boligverdsettingsmodell, som ga uventet høye beregnede omsetningsverdier. Endringen er den største enkeltendringen i formuesskatten i perioden, og den er lett å regne på:

GJENNOMREGNET EKSEMPEL — en primærbolig til 18 millioner, under to regelsett
Boligen er eierens egen primærbolig, beregnet omsetningsverdi 18 000 000 kr. Ingen gjeld, ingen annen formue. Hva er formuesverdien?

| Steg | 2024/2025 (T = 10 mill.) | 2026 (T = 14 mill.) |
|---|---|---|
| Sjiktet under terskelen, verdsatt til 25 % | 10 000 000 × 0,25 = 2 500 000 | 14 000 000 × 0,25 = 3 500 000 |
| Sjiktet over terskelen, verdsatt til 70 % | 8 000 000 × 0,70 = 5 600 000 | 4 000 000 × 0,70 = 2 800 000 |
| Formuesverdi | 8 100 000 | 6 300 000 |

Steg 1 — del boligen i to. Under 2024-regelen ligger 10 mill. i det billige sjiktet og 8 mill. i det dyre. Under 2026-regelen ligger 14 mill. i det billige og bare 4 mill. i det dyre.

Steg 2 — regn hvert sjikt for seg. 2 500 000 + 5 600 000 = 8 100 000 mot 3 500 000 + 2 800 000 = 6 300 000.

Steg 3 — hva endringen er verdt. Differansen er 1 800 000 kr i grunnlag. Ved 1,0 % er det 18 000 kr mindre formuesskatt per år.

Kontroll: regn differansen direkte i stedet for som forskjellen mellom to totaler. Terskelhevingen flytter nøyaktig 4 mill. fra 70 %-sjiktet til 25 %-sjiktet, og 4 000 000 × (0,70 − 0,25) = 1 800 000. Samme tall. ✓

Hvilke gale tall feilene gir. Bruker du 25 % på hele boligen, får du 4 500 000 — det er den vanligste feilen, og den bommer med 1,8 mill. Bruker du 70 % på hele, får du 12 600 000. Trekker du terskelen fra etter at du har verdsatt, altså 18 000 000 × 0,25 − 14 000 000, får du et negativt tall, som skal fortelle deg at rekkefølgen er gal. Og regner du et gammelt sett med 2026-terskelen, treffer du 6 300 000 der fasiten sier 8 100 000, uten at noe annet i besvarelsen er feil.

ADVARSEL — Terskelen er 10 millioner i alle eksamenssett du kan trene på
Ingen av de ni gamle settene bruker 14 mill., fordi ingen av dem er fra 2026. Møter du en gammel oppgave uten oppgitte satser, er 10 mill. det riktige tallet. Møter du et spørsmål om hva som gjelder nå, er svaret 14 mill. Skriv begge i margen første gang du ser en boligoppgave, så slipper du å velge under tidspress.

### 7.4 Forholdsmessig gjeldsfordeling: de seks radene

Gjelden kan ikke bare trekkes fra. Skatteloven § 4-19 krever at den fordeles forholdsmessig etter aktivaenes bruttoverdi, og at den delen som havner på et rabattert aktivum, reduseres med samme rabattsats. Uten regelen ville en verdsettingsrabatt virket to ganger: én gang ned på formuen og én gang opp på fradraget.

FORMEL:  Fradragsberettiget gjeld_i = G × (BV_i / ΣBV) × (1 − ρ_i)
FORMEL:  Samlet: fradragsberettiget gjeld = G × [1 − Σ_rabatterte(BV_i × ρ_i) / ΣBV]
   der:  G er samlet gjeld, BV_i aktivum i sin bruttoverdi før rabatt, og ρ_i rabatten. Summen i den andre linjen løper bare over aktiva som utløser reduksjon: aksjer, aksjefond, næringseiendom, varebeholdning, driftsmidler og andeler i deltakerfastsatt selskap. Primærbolig og fritidsbolig er unntatt — de teller med sin fulle bruttoverdi i fordelingsnøkkelen, men gjelden som henføres dit avkortes ikke. Sekundærbolig og bankinnskudd har ingen rabatt og utløser derfor heller ingen reduksjon.

Sett alltid opp den samme tabellen, med én kolonne per aktivum og seks rader. Rekkefølgen er ikke valgfri: hvert steg bruker resultatet fra det forrige, og de vanligste feilene er nettopp å hoppe over en rad eller bytte om på to.

1. Bruttoverdi. Markedsverdien før enhver rabatt.
2. Andel av bruttoformuen. BV_i delt på summen av rad 1. Radene skal summere til 100 %.
3. Formuesverdi etter rabatt. BV_i × (1 − ρ_i).
4. Andel av gjelden. G × andelen fra rad 2. Radene skal summere til hele G.
5. Fradragsberettiget gjeld. Rad 4 × (1 − ρ_i) — men uavkortet for primærbolig.
6. Netto. Rad 3 − rad 5. Negative kolonner motregnes mot positive.

MEKANISME — Hvorfor skal gjelden fordeles i det hele tatt?
Fordi rabatten ellers ville blitt gitt to ganger. Tenk deg en aksjepost på 1 mill. finansiert med 1 mill. i lån. Formuesverdien er 800 000 etter 20 % rabatt. Fikk du trekke fra hele gjelden på 1 mill., ville nettoformuen bli −200 000, og de 200 000 ville redusert skatten på all annen formue du har. Rabatten var ment å senke verdsettingen av aksjen, ikke å skape et fradrag av ingenting. Regelen i § 4-19 sier derfor at gjelden skal måles med samme målestokk som eiendelen den finansierer: 20 % rabatt på aksjen gir 20 % avkorting av gjelden som er henført dit.

MEKANISME — Hvorfor er primærboligen unntatt?
Fordi lovgiveren ville at rabatten på egen bolig skulle komme skattyteren fullt til gode. Kombinasjonen «formuesverdi 25 %, gjeldsfradrag 100 %» er derfor tilsiktet, og den er det som gjør at en belånt primærbolig ofte gir et negativt nettobidrag til formuen. Dette er ikke en feil i regnestykket, det er hele grunnen til at boligeierskap er skattefavorisert i Norge. Det underbygger også lærepunktet fra kapittel 0: kapitalen går dit avkastningen etter skatt er høyest, og formuesskatten skyver den mot bolig.

GJENNOMREGNET EKSEMPEL — H2024 oppgave 6 — gjeldsreduksjonen og nettoformuen
Bottolf har 1 800 000 kr i gjeld og en formue før verdsettingsrabatter på 6 000 000 kr: primærbolig 4 800 000, aksjer med markedsverdi 1 000 000, og bankinnskudd 200 000. Rabattene er 75 % på boligen og 20 % på aksjene [eksempeltall, oppgitt i oppgaveteksten, og identiske med dagens regler]. Oppgaven sier uttrykkelig at gjeld henført til primærbolig ikke skal reduseres. Spørsmål a: hvor mye reduseres gjelden? Spørsmål b: hva er nettoformuen?

| Rad | Primærbolig | Aksjer | Bank | Sum |
|---|---|---|---|---|
| 1 · Bruttoverdi | 4 800 000 | 1 000 000 | 200 000 | 6 000 000 |
| 2 · Andel av bruttoformuen | 80 % | 16⅔ % | 3⅓ % | 100 % |
| 3 · Formuesverdi etter rabatt | 1 200 000 | 800 000 | 200 000 | 2 200 000 |
| 4 · Andel av gjelden | 1 440 000 | 300 000 | 60 000 | 1 800 000 |
| 5 · Fradragsberettiget gjeld | 1 440 000 | 240 000 | 60 000 | 1 740 000 |
| 6 · Netto | −240 000 | 560 000 | 140 000 | 460 000 |

Steg 1 — fordelingsnøkkelen er bruttoverdiene. 4,8/6,0 = 80 %, 1,0/6,0 = 16⅔ %, 0,2/6,0 = 3⅓ %. Ikke formuesverdiene. Dette er rad 2, og det er det stedet flest bommer.

Steg 2 — fordel gjelden. 1 800 000 × 80 % = 1 440 000 på boligen, × 16⅔ % = 300 000 på aksjene, × 3⅓ % = 60 000 på banken. Summen er 1 800 000, som er hele gjelden. ✓

Steg 3 — avkort bare det som skal avkortes. Boliggjelden står uendret. Bankinnskuddet har ingen rabatt. Bare aksjegjelden treffes: 300 000 × 20 % = 60 000 kr i reduksjon, så 240 000 blir fradragsberettiget. Svaret på a er kr 60 000.

Steg 4 — formuesverdiene. 4 800 000 × 25 % = 1 200 000, 1 000 000 × 80 % = 800 000, 200 000 × 100 % = 200 000. Sum 2 200 000.

Steg 5 — nettoformuen. 2 200 000 − 1 740 000 = kr 460 000. Svaret på b.

Kontroll 1 — regn per aktivum i stedet for som sum. Boligen: 1 200 000 − 1 440 000 = −240 000. Aksjene: 800 000 − 240 000 = +560 000. Banken: 200 000 − 60 000 = +140 000. Summen −240 000 + 560 000 + 140 000 = 460 000. ✓ Den negative boligkolonnen er riktig og skal motregnes.

Kontroll 2 — bruk aggregatformelen. Bare aksjene utløser reduksjon: 1 000 000 × 20 % = 200 000, som er 3⅓ % av bruttoformuen på 6 mill. Fradragsberettiget gjeld = 1 800 000 × (1 − 0,0333) = 1 740 000. Samme tall på én linje. ✓ Merk at 3⅓ % er nøyaktig 20 % av de 16⅔ % som ligger på aksjene.

Elimineringen, som tar ti sekunder. Bare ett aktivum har en rabatt som slår inn på gjelden, og gjelden henført dit er 300 000. Reduksjonen kan derfor aldri overstige 20 % × 300 000 = 60 000. Alternativene 145 000, 150 000 og 165 000 ligger alle over dette taket og er umulige — før du har regnet ferdig. Samme grep på b: fradragsberettiget gjeld må ligge mellom 1 740 000 og 1 800 000, så nettoformuen må ligge mellom 400 000 og 460 000. Alternativene 600 000 og 265 000 faller utenfor. Det fjerde, 440 000, ligger inne i båndet og kan ikke strykes på den måten: det forutsetter fradragsberettiget gjeld på 1 760 000, som ingen regel gir, og fanger regnefeil framfor metodefeil.

Hvilke gale tall feilene gir. Glemmer du aksjerabatten på aktivasiden og gjeldsreduksjonen, får du 1 200 000 + 1 000 000 + 200 000 − 1 800 000 = 600 000, som står som alternativ. Hopper du bare over gjeldsavkortingen, får du 2 200 000 − 1 800 000 = 400 000. Avkorter du også boliggjelden med 75 %, blir fradragsberettiget gjeld 1 440 000 × 25 % + 240 000 + 60 000 = 660 000 og nettoformuen 1 540 000 — en reduksjon på 1 140 000, som er nitten ganger for mye. Fordeler du gjelden etter formuesverdiene i rad 3 i stedet for bruttoverdiene i rad 1, får du 530 909, et tall som ikke står som alternativ i det hele tatt. Det siste er et signal du skal bruke: treffer tallet ditt ingen av rutene, har du gjort en metodefeil, og du skal gå tilbake, ikke velge nærmeste.

Merk hva spørsmålet spurte om. Det spurte om nettoformuen, ikke om skatten. Bunnfradraget skal derfor ikke trekkes fra, og satsen ikke brukes. Hadde det spurt om skatten, ville 460 000 ligget godt under bunnfradraget og skatten vært null.

FIGUR: Figur 7.1 — H2024 oppgave 6, kolonne for kolonne. Primærboligen er det eneste aktivumet der den røde søylen er høyere enn den grønne: formuesverdien er bare 25 % av bruttoverdien, mens gjelden henført dit trekkes fra fullt ut. Det gir −240 000 i nettobidrag. Aksjene og banken bærer resten, og summen av de tre er nettoformuen på 460 000 kr. Er den grønne søylen kortere enn den røde et sted der aktivumet ikke er en primærbolig, har du sannsynligvis glemt å avkorte gjelden.
Figuren viser: Søylediagram over H2024 oppgave 6: formuesverdi opp og fradragsberettiget gjeld ned for primærbolig, aksjer og bank, med negativt nettobidrag fra boligen

Aksjerabatten har ikke alltid vært 20 %. I 2021 var den 45 %, altså verdsetting til 55 %, og H2021 oppgave 1c bruker den på nøyaktig det samme oppsettet: gjeld 1 800 000, primærbolig 4 800 000, aksjefond 1 000 000, bank 200 000 [eksempeltall: 2021-regler]. Regn det som en drill på at metoden er den samme selv når rabatten ikke er det. Formuesverdier: 1 200 000 + 550 000 + 200 000 = 1 950 000. Fradragsberettiget gjeld: 1 440 000 + 300 000 × 55 % + 60 000 = 1 440 000 + 165 000 + 60 000 = 1 665 000. Nettoformue 285 000 kr, mot 460 000 med dagens rabatt. Aggregatkontrollen: 1 800 000 × (1 − 1 000 000 × 0,45/6 000 000) = 1 800 000 × 0,925 = 1 665 000. ✓ Bruker du 20 % der oppgaven sier 45 %, får du 460 000 og bommer på et spørsmål du ellers har løst riktig.

VANLIG FEIL — Negativ nettoformue på ett aktivum er ikke en feil
Mange stopper opp når boligkolonnen blir negativ og «retter» den til null. Det er en ekte misforståelse, og den koster hele oppgaven: setter du boligen til 0 i stedet for −240 000, får du 700 000 i stedet for 460 000. Formuesskatten regnes av summen over alle aktiva, ikke aktivum for aktivum, og negative kolonner motregnes mot positive. Sensorveiledningen til H2016 oppgave 2a sier uttrykkelig at kandidater som antar det motsatte ikke skal trekkes for antakelsen i en åpen oppgave — men i flervalg finnes det bare ett riktig tall, og motregningen er forutsatt.

Nå til varianten som godtok to svar. H2024 oppgave 6 skrev regelen inn i oppgaveteksten. H2025 oppgave 2 gjorde det ikke, og da godtok sensor to svar. Dette er den viktigste enkeltobservasjonen om formuesskatt i hele materialet, og den lærer deg noe mer generelt: les hva oppgaven faktisk forutsetter, ikke bare hva du vet at loven sier.

GJENNOMREGNET EKSEMPEL — H2025 oppgave 2 — begge de godtatte svarene
Gunhild har 5 000 000 kr i gjeld og en formue før verdsettingsrabatter på 10 000 000 kr: en primærbolig med markedsverdi 5 000 000 og 75 % rabatt, og aksjefondsandeler med markedsverdi 5 000 000 og 20 % rabatt [eksempeltall, oppgitt i teksten]. Bunnfradrag skal ses bort fra. Hva er den skattepliktige nettoformuen? Alternativene var 750 000, 250 000, −250 000 og −750 000.

| Rad | Primærbolig | Aksjefond | Sum |
|---|---|---|---|
| 1 · Bruttoverdi | 5 000 000 | 5 000 000 | 10 000 000 |
| 2 · Andel av bruttoformuen | 50 % | 50 % | 100 % |
| 3 · Formuesverdi etter rabatt | 1 250 000 | 4 000 000 | 5 250 000 |
| 4 · Andel av gjelden | 2 500 000 | 2 500 000 | 5 000 000 |
| 5 · Fradragsberettiget gjeld | 2 500 000 | 2 000 000 | 4 500 000 |
| 6 · Netto | −1 250 000 | 2 000 000 | 750 000 |

Steg 1 — nøkkelen. Begge aktivaene har bruttoverdi 5 mill., så gjelden fordeles 50/50: 2 500 000 hver.

Steg 2 — formuesverdiene. 5 000 000 × 25 % = 1 250 000 og 5 000 000 × 80 % = 4 000 000. Sum 5 250 000.

Steg 3 — avkortingen. Boliggjelden står. Fondsgjelden avkortes: 2 500 000 × 80 % = 2 000 000. Sum fradragsberettiget 4 500 000.

Steg 4 — hovedsvaret. 5 250 000 − 4 500 000 = 750 000. Dette er svaret som følger loven.

Steg 5 — den andre godtatte veien. Uten avkorting trekkes hele gjelden fra: 5 250 000 − 5 000 000 = 250 000. Sensor godtok dette fordi oppgaveteksten ikke sa at avkortingen skulle brukes.

Kontroll: differansen mellom de to svarene skal være nøyaktig avkortingen. 750 000 − 250 000 = 500 000, og 2 500 000 × 20 % = 500 000. ✓ Aggregatformelen bekrefter fradragsberettiget gjeld: 5 000 000 × (1 − 5 000 000 × 0,20/10 000 000) = 5 000 000 × 0,90 = 4 500 000. ✓ Og kolonnene summerer: −1 250 000 + 2 000 000 = 750 000. ✓

Hvilke gale tall feilene gir. De to negative alternativene, −250 000 og −750 000, er de to riktige tallene med snudd fortegn, og fanger den som regner gjeld minus formue. De kan strykes på ett sekund så snart du ser at formuesverdien på 5 250 000 overstiger gjelden på 5 000 000. Bruker du formuesverdiene som fordelingsnøkkel i stedet for bruttoverdiene, får du 1 190 476 på boligen og 3 809 524 på fondet i gjeld, altså en helt annen fordeling og et svar som ikke står i listen.

TIPS — Slik spørres det
Gjeldsfordelingen har kommet i to former. Enten spør den om selve reduksjonen — «hvor mye skal gjelden på 1,8 mill. reduseres med?» (H2024 oppgave 6a, svar 60 000) — eller om nettoformuen (H2024 oppgave 6b, svar 460 000; H2025 oppgave 2, svar 750 000 med 250 000 også godtatt). De gale alternativene er alltid bygget av de samme fire feilene: gjeld fordelt etter ligningsverdi i stedet for bruttoverdi, gjeld avkortet også på primærboligen, gjeldsavkortingen hoppet over helt, eller fortegnet snudd. Regelen for eksamen med minuspoeng: når to alternativer begge kan forsvares, velg det som følger loven — altså med avkorting — og gå videre. Fortegnsfellene alene gir deg to strøkne alternativer og dermed +1 poeng i forventning selv om du ikke rekker å regne ferdig.

Reglene har atferdskonsekvenser, og H2017 oppgave 1 stiller dem som en beslutning: lønner det seg å bruke bankinnskuddet til å nedbetale gjeld? [eksempeltall: 2017-regler, sekundærbolig med 10 % rabatt, sats 0,85 %] Med 2 mill. i banken og en sekundærbolig til 4 mill., finansiert med 4 mill. i gjeld, er nettoformuen 1,87 mill. Sletter du 2 mill. gjeld med innskuddet, faller den til 1,80 mill., og skatten fra 16 150 til 15 300 kr. Mekanismen er at bankinnskuddet teller 100 % som formue, men trekker til seg gjeld som gir 100 % fradrag: nettobidraget er 2 − 1,33 = 0,67 mill. Hver krone gjeld du i stedet sletter på den rabatterte sekundærboligen, var bare verdt 0,90 kr i fradrag, så boligens nettobidrag stiger med 0,60 mill. Siden 0,60 er mindre enn 0,67, faller nettoformuen med 67 000 kr. Formuesskatten belønner altså å eie det rabatterte og gjøre opp det urabatterte.

### 7.5 Anine-regnestykket: markedsverdi mot bokført verdi

Forelesning 1 åpner med et VG-oppslag der en gründer oppgir sin egen formuesskatt. Regnestykket er feil, og det er feil på nøyaktig de to måtene eksamen tester. Det er kursets billigste illustrasjon på hvorfor verdsettingen betyr mer enn satsen.

GJENNOMREGNET EKSEMPEL — Anines formuesskatt, hennes tall og de riktige
En investor betaler 10 mill. kr for 10 % av selskapet, altså en prising av hele selskapet på 100 mill. Anine eier halvparten av de resterende 90 prosentene, altså 45 %. Selskapet er unotert, har ingen gjeld, og de 10 millionene i emisjonspenger er selskapets eneste bokførte eiendel. Satsene forelesningen bruker [eksempeltall: 1,0 % / 1,1 %, aksjerabatt 20 %, bunnfradrag 1,7 mill., altså 2024-nivå].

Anines eget regnestykke. 45 % av 100 mill. er 45 mill., og 45 000 000 × 1,1 % = 495 000 kr. Aritmetikken stemmer. Premissene gjør det ikke.

Steg 1 — hva er formuesverdien av et unotert selskap? Ikke markedsprisen fra emisjonen, men selskapets skattemessige formuesverdi: bokførte eiendeler minus gjeld. Her 10 000 000 − 0 = 10 000 000 kr for hele selskapet.

Steg 2 — Anines andel. 45 % × 10 000 000 = 4 500 000 kr.

Steg 3 — aksjerabatten. 4 500 000 × 80 % = 3 600 000 kr i formuesverdi.

Steg 4 — bunnfradrag og sats. (3 600 000 − 1 700 000) × 1,0 % = 1 900 000 × 1,0 % = 19 000 kr. Ikke 495 000.

Steg 5 — med 2026-satsene [dagens regel]. Bunnfradraget er 1 900 000 kr, så grunnlaget blir 3 600 000 − 1 900 000 = 1 700 000 og skatten 17 000 kr. Satsen er den samme; det er bunnfradraget som har flyttet seg.

Kontroll — hva ville tallet vært hvis selskapet hadde vært børsnotert til 100 mill.? Da er formuesverdien 45 000 000 × 80 % = 36 000 000, og med 2024-satsene blir skatten (20 000 000 − 1 700 000) × 1,0 % + (36 000 000 − 20 000 000) × 1,1 % = 183 000 + 176 000 = 359 000 kr. Fortsatt ikke 495 000. Kontrollen viser at Anines tall er for høyt selv under de mest ugunstige forutsetningene: hun har brukt markedsverdi på et unotert selskap, droppet aksjerabatten, droppet bunnfradraget, og lagt toppsatsen på hele beløpet.

Hvilke gale tall feilene gir. Fire feil, fire tall: markedsverdi i stedet for bokført gir 495 000; bokført uten aksjerabatt gir (4 500 000 − 1 700 000) × 1,0 % = 28 000; bokført med rabatt, men uten bunnfradrag, gir 3 600 000 × 1,0 % = 36 000; og riktig svar er 19 000. Det er nøyaktig slik et flervalgsspørsmål om verdsetting er bygget.

Forelesningens poeng med eksempelet er dobbelt. Faglig: verdsettingsreglene, ikke satsen, avgjør hva en eier faktisk betaler, og forskjellen mellom børsnotert og unotert er så stor at den skaper en insentiv til å ta selskaper av børs. Metodisk: forelesningen gjengir det som et eksempel på at næringslivspressen driver kampanjejournalistikk om formuesskatt. Dette er en påstand fra forelesningen, ikke et faktum du skal ta stilling til — men eksamen kan spørre hva forelesningen hevder, og da er svaret at saken ble brukt politisk mens regnestykket bak den var galt.

KOBLING — Videre til kapittel 8
Dette kapitlet har regnet formuesskatten som en skatt på en formuesbeholdning. Kapittel 8 snur den: siden skatten faller på formuen ved inngangen til året, tilsvarer den en avkastningsskatt t = τ_w/r, og med 1 % formuesskatt og 5 % avkastning er det 20 % (H2025 oppgave 9). Der finner du også utbyttet som må tas for å betale formuesskatten, D = τ_wW/(1 − t_e), fra H2024 oppgave 7 og H2025 oppgave 6, og argumentene for og mot skatten.

### 7.6 Eiendomsskatt, kort

Eiendomsskatten er en helt annen skatt enn formuesskatten, og den forveksles ofte med den fordi begge treffer boligen. Fire ting skiller dem, og alle fire kan komme som faktaspørsmål.

FORMEL:  Eiendomsskatt = (beregnet omsetningsverdi × 0,7 − bunnfradrag) × promillesats
   der:  Skatten er kommunal og frivillig: kommunestyret bestemmer om den skal skrives ut i det hele tatt. Maksimalsatsen er 4 ‰ for bolig og fritidsbolig og 7 ‰ for næring og annet. Første året kan satsen ikke være over 1 ‰, og den kan økes med høyst 1 ‰ per år. Grunnlaget for bolig er Skatteetatens beregnede omsetningsverdi multiplisert med den obligatoriske reduksjonsfaktoren 0,7. Kommunen kan gi et bunnfradrag per boenhet og fastsetter beløpet fritt. [dagens regel]

Det avgjørende punktet: formuesskattens rabatt på 75 % gjelder ikke for eiendomsskatt. De to skattene bruker forskjellige grunnlag på den samme boligen. En primærbolig med beregnet omsetningsverdi 4 000 000 kr har formuesverdi 4 000 000 × 25 % = 1 000 000 kr, men eiendomsskattegrunnlag 4 000 000 × 0,7 = 2 800 000 kr. Grunnlaget for eiendomsskatt er altså 2,8 ganger så høyt. Ved en sats på 3 ‰ og uten bunnfradrag blir eiendomsskatten 2 800 000 × 3 ‰ = 8 400 kr; ved makssatsen 4 ‰ blir den 11 200 kr. Formuesskatten på den samme boligen er null hvis eieren ikke har annen formue, fordi 1 000 000 ligger under bunnfradraget på 1 900 000.

ADVARSEL — Fire forskjeller du må kunne skille
Hvem skriver den ut: formuesskatten er statlig og kommunal etter lov, eiendomsskatten er valgfri for hver kommune. Hva den treffer: formuesskatten treffer nettoformuen din, eiendomsskatten treffer eiendommen uavhengig av gjeld — det finnes intet gjeldsfradrag i eiendomsskatten, og ingen forholdsmessig fordeling. Hvilket grunnlag: 25 % av verdien mot 70 % av verdien. Hvilken sats: 1,0–1,1 % mot maks 4 ‰, altså 0,4 %. Blander du grunnlagene, får du et tall som er 2,8 ganger for høyt eller 2,8 ganger for lavt — begge er gjenkjennelige distraktorer.

## 8 · Formuesskatt som avkastningsskatt: verdsetting, utbytte og de rikeste

Fem av de tjueni poengene i H2025 lå i dette ene temaet: oppgave 3 med sine fire delspørsmål og oppgave 9. Legger du til oppgave 6, som spør hvor stort utbytte som må til for å dekke formuesskatten, blir det seks poeng — over en femdel av settet. Før H2021 fantes ikke temaet på noen eksamen i faget. Nå er det pensum for forelesning 8, med tre artikler bak seg, og det kommer fra kursansvarlig selv. Kapittel 7 lærte deg å regne ut hvor mye formuesskatt en person skal betale. Dette kapitlet lærer deg hva den skatten er: en skatt på avkastning, forkledd som en skatt på beholdning.

### 8.1 Ekvivalensen: en formuesskatt er en skatt på avkastningen

Formuesskatten faller på formuen ved inngangen til året. Eier du W ved årets start, betaler du τ_w × W, uansett hva formuen kaster av seg i løpet av året. En skatt på kapitalavkastningen med sats t treffer et helt annet grunnlag: avkastningen r × W. De to skattene ser ulike ut, men de kan gi nøyaktig samme proveny, og betingelsen for det er kort:

FORMEL:  τ_w × W = t × r × W ⟹ τ_w = r × t ⟹ t = τ_w/r
FORMEL:  Faller skatten i stedet på formuen ved årets slutt: τ_w × W(1 + r) = t × r × W ⟹ τ_w = t × r/(1 + r)
   der:  W stryker seg på begge sider i den første linjen. Ekvivalensen avhenger bare av forholdet mellom formuesskattesatsen og avkastningen, ikke av hvor stor formuen er. Eksamen skriver ofte formuesskattesatsen som stor T og avkastningsskatten som liten t; les hvilken som er hvilken før du regner.

MEKANISME — Hvorfor gjør inngående formue ekvivalensen ren?
Fordi grunnlaget da er kjent på forhånd og ikke avhenger av avkastningen. W er tallet som står i formuesoppgaven 1. januar; det er gitt før året begynner, og skatten τ_wW er derfor et fast kronebeløp. Sammenligner du det med avkastningsskatten t·r·W, står r bare ett sted, og du kan løse rett ut: t = τ_w/r. Faller skatten på utgående formue W(1 + r), inneholder selve grunnlaget avkastningen, og r dukker opp på begge sider. Da blir svaret τ_w = t·r/(1 + r), som er det samme forholdet dividert på (1 + r) — nesten likt for små r, men ikke likt nok til å treffe riktig alternativ.

GJENNOMREGNET EKSEMPEL — H2025 oppgave 9 — hvilken gevinstskatt gir samme proveny?
Oppgaven gir formuen W = 100 ved periodens begynnelse, avkastningen r = 5 % realisert ved periodens slutt, og en formuesskatt T = 1 % som «faller på formue ved periodens begynnelse». Spørsmålet er hvor høy skatten på kapitalgevinst t må være for at de to skal gi samme proveny. Tallene er [eksempeltall], men formuesskattesatsen på 1 % ligger på dagens nivå.

Steg 1 — formuesskattens proveny. Grunnlaget er de 100 kronene ved inngangen: 100 × 1 % = 1,00.

Steg 2 — gevinstskattens proveny. Grunnlaget er avkastningen: 100 × 5 % = 5. Skatten er 5 × t.

Steg 3 — sett dem like. 5t = 1,00 ⟹ t = 1/5 = 20 %. Med formel: t = T/r = 1 %/5 % = 20 %.

Kontroll: 100 × 0,05 × 0,20 = 1,00, som er nøyaktig formuesskatten. ✓ Kryss-sjekk mot oppgave 3 i samme sett: der falt avkastningen fra 5 % til 4 % da den samme formuesskatten kom til. Ett prosentpoeng av fem er en femdel, altså 20 % av avkastningen. Samme tall, samme mekanisme, to ulike innpakninger.

Hva de gale alternativene er laget av. 21 % er svaret hvis du lar skatten falle på formuen ved periodens slutt: 100 × 1,05 = 105, skatt 1,05, og 1,05/5 = 21 %. 22 % er satsen på alminnelig inntekt, plassert der fordi den er kjent og fristende; den ville krevd et formuesgrunnlag på 110. 23 % svarer ikke til noen regnevei og er et nabotall.

Den andre veien, fra H2021 oppgave 3. Der ble det samme spurt motsatt: hvilken formuesskattesats tilsvarer en avkastningsskatt på 22 % når renten er 3 %, med skatten på utgående formue? Svar: τ_w = 0,22 × 0,03/1,03 = 0,64 %. Med inngående formue ville svaret vært r × t = 0,22 × 0,03 = 0,66 %. To hundredeler av et prosentpoeng skiller dem — og på flervalg er det to ulike ruter.

ADVARSEL — Én setning i oppgaveteksten skiller 20 % fra 21 %
«Faller på formue ved periodens begynnelse» og «faller på formue ved periodens slutt» er den eneste forskjellen mellom to alternativer som ligger side om side. Norsk formuesskatt bygger på formuen ved inngangen til inntektsåret, så T = r·t er hovedregelen i dette kurset — men oppgaven kan velge det andre, og gjorde det i H2021. Med minuspoeng er dette en dyr slurvefeil: les setningen om tidspunktet før du regner, og skriv den av på kladdearket.

Fordi r står i nevneren i t = τ_w/r, er den ekvivalente avkastningsskatten ikke en fast størrelse. Den stiger dramatisk når avkastningen faller:

| Avkastning r | Ekvivalent avkastningsskatt ved τ_w = 1,0 % | Ved τ_w = 1,1 % |
|---|---|---|
| 10 % | 10,0 % | 11,0 % |
| 8 % | 12,5 % | 13,75 % |
| 5 % | 20,0 % | 22,0 % |
| 3 % | 33,3 % | 36,7 % |
| 2 % | 50,0 % | 55,0 % |
| 1 % | 100,0 % | 110,0 % |
| 0 % | uendelig | uendelig |

Satsene 1,0 % og 1,1 % er dagens regel: 1,0 % av nettoformue over bunnfradraget på kr 1 900 000, og 1,1 % av den delen som overstiger kr 21 500 000 [dagens regel, 2026]. Nederste rad er ikke et regnekunststykke: gir formuen ingen avkastning, må skatten betales av selve formuen, og da finnes det ingen avkastningsskatt som tilsvarer den. Det er dette forelesningen mener med at formuesskatten ikke spør om det er noe å skatte av.

FIGUR: Figur 8.1 — Den ekvivalente skatten på avkastningen, t = τ_w/r, med formuesskattesats 1,0 %. Kurven er en hyperbel: den er flat og lav i høyre halvdel, der avkastningen er god, og eksploderer mot venstre. Ved 10 % avkastning tilsvarer formuesskatten en avkastningsskatt på 10 %; ved 2 % tilsvarer den 50 %. To ting følger av formen. For det første rammer formuesskatten hardest i lavrenteperioder og på lavtavkastende aktiva. For det andre er den ikke en skatt på det du tjener, men på det du har: den er den samme i kroner enten avkastningen er 12 % eller null.
Figuren viser: Kurve som viser at den ekvivalente avkastningsskatten tau delt paa r stiger bratt naar avkastningen faller

### 8.2 Avkastning etter formuesskatt

Ekvivalensen har en direkte konsekvens for hva en investering faktisk gir. Kjøper du et aktivum for W ved årets start, får en kontantstrøm CF gjennom året og selger for W igjen, er avkastningen før formuesskatt r = CF/W. Formuesskatten trekker et fast beløp τ_wW fra, og da blir regnestykket:

FORMEL:  r_etter = (CF − τ_w × W)/W = CF/W − τ_w = r − τ_w
   der:  Formuesskatten trekker nøyaktig τ_w prosentpoeng fra avkastningen, uansett hvor høy avkastningen er. Har aktivumet en verdsettingsrabatt ρ, er formuesverdien (1 − ρ)W og fratrekket τ_w(1 − ρ) prosentpoeng. Med aksjerabatten på 20 % og satsen 1,0 % [dagens regel] blir det 0,8 prosentpoeng, ikke 1,0.

Regn det som en avkastningsskatt: 1,0 prosentpoeng av en avkastning på 5 % er en effektiv sats på 20 %; 0,8 prosentpoeng av samme avkastning er 16 %. Verdsettingsrabatten er altså ikke pynt — den er en direkte reduksjon i den ekvivalente avkastningsskatten, og det er derfor kapittel 7 bruker så mye plass på hvilke aktiva som får hvilken rabatt.

MEKANISME — Hvorfor faller alternativkostnaden også?
Dette er punktet hele kapitlet dreier om, og det er det studenter oftest bommer på. Formuesskatten er en skatt på personen, ikke på aktivumet: du betaler den på alt du eier, i aksjer, i eiendom eller i bank. Blir avkastningen på investering A redusert med τ_w, blir avkastningen på alternativet B redusert med det samme. Alternativkostnaden din i den risikoklassen er derfor ikke 5 %, men 4 % — og det er 4 % du skal diskontere med når du verdsetter noe annet. En investor som senker kontantstrømmen for formuesskatt, men beholder 5 % som avkastningskrav, sammenligner et tall etter skatt med et tall før skatt. Det er den halve justeringen, og den er innebygd som galt alternativ i H2025 oppgave 3.

### 8.3 Verdsetting under formuesskatt: hvorfor verdien ikke faller

Bjerksund og Schjelderup (BS4, gjengitt i Magma-artikkelen som er pensum til forelesning 8) stiller spørsmålet direkte: verdsetter en norsk investor som betaler formuesskatt en aksje lavere enn en utenlandsk investor som ikke gjør det? Forutsetningene er at kapitalmarkedet er effisient og internasjonalt integrert, at alle aktiva i samme risikoklasse gir samme avkastning, og at formuesskatten faller på markedsverdien ved periodens begynnelse. Svaret er nei, og betingelsen viser hvorfor:

FORMEL:  (CF − τ_w × V)/V = r − τ_w ⟺ CF/V − τ_w = r − τ_w ⟺ V = CF/r
FORMEL:  Rammes alternativet ikke av formuesskatt: (CF − τ_w × V)/V = r ⟺ V = CF/(r + τ_w)
   der:  I den første linjen står τ_w på begge sider og stryker seg selv: skatten senker kontantstrømmen og avkastningskravet like mye, og verdien blir den samme som uten formuesskatt. Den andre linjen er kontrafaktisk, og den er den du skal kunne skille fra den første — den gjelder bare hvis alternativkostnaden er upåvirket.

GJENNOMREGNET EKSEMPEL — H2025 oppgave 3, alle fire delspørsmålene
Kapitalmarkedet er effisient, så alle investeringer i samme risikoklasse gir samme avkastning. En investor kjøper aksjer for 200 mill. ved periodens begynnelse, får en kontantstrøm på 10 mill. ved periodens slutt og selger for 200 mill. Den andre investeringen i oppgaven gir en evigvarende årlig kontantstrøm på 5 mill. Formuesskatten er 1 % [eksempeltall, men lik dagens sats], og oppgaven ber deg se bort fra skatt på kapitalavkastning, fra aksjerabatten og fra bunnfradraget.

Steg 1 (delspørsmål a) — avkastningen uten formuesskatt. Totalavkastning er kapitalgevinst pluss direkteavkastning. Kjøpspris og salgspris er begge 200, så kapitalgevinsten er null. r = 10/200 = 5 %. Kontroll: sluttverdien er 210 på en innsats på 200, og 210/200 − 1 = 5 %. ✓

Steg 2 (delspørsmål b) — avkastningen med formuesskatt. Skatten faller på formuen ved inngangen: 200 × 1 % = 2. Avkastningen blir (10 − 2)/200 = 4 %. Kontroll med formelen fra 8.2: r − τ_w = 5 % − 1 % = 4 %. ✓ Dette er nå investorens alternativkostnad i denne risikoklassen, og den skal brukes videre.

Steg 3 (delspørsmål c) — den evige strømmen, uten formuesskatt. Den andre investeringen gir 5 mill. i året i all framtid og er i samme risikoklasse. Setningen om risikoklassen er ikke pynt: den gir deg diskonteringsrenten. V = CF/r = 5/0,05 = 100 mill. Kontroll: en investering som koster 100 og gir 5 i året har avkastning 5/100 = 5 %, altså nøyaktig markedsavkastningen. ✓

Steg 4 (delspørsmål d) — den evige strømmen, med formuesskatt. Formuesverdien er markedsverdien V, så skatten er 0,01V og netto kontantstrøm 5 − 0,01V. Alternativkostnaden er 4 % fra steg 2. Sett opp betingelsen og løs:

(5 − 0,01 × V)/V = 0,04 ⟹ 5/V − 0,01 = 0,04 ⟹ 5/V = 0,05 ⟹ V = 100 mill.

Kontroll: sett V = 100 tilbake inn. Formuesskatt 1, netto kontantstrøm 5 − 1 = 4, avkastning 4/100 = 4 % — nøyaktig alternativkostnaden. Prisen er selvkonsistent, og den er den samme som utlendingens. ✓

Hva de gale alternativene er laget av. I delspørsmål a er 4 % lagt inn som lokkemiddel: det er nabospørsmålets fasit, og teksten sier uttrykkelig at det ikke er skatt her. 6 % er (10 + 2)/200, altså skatten lagt til i stedet for trukket fra, og 3 % er skatten trukket fra to ganger. I delspørsmål c er 80 mill. den vanligste feilen i hele temaet: (5 − 1)/0,05, altså kontantstrømmen justert for formuesskatt mens den uskattede renten på 5 % brukes til å diskontere — den halve justeringen fra boksen over. I delspørsmål d er 95 mill. magefølelsen «skatten må jo ta litt av verdien» (100 − 5), 50 mill. er 5/0,10 med dobbelttelt skatt, og 200 mill. er prisen på den første investeringen, som gir 10 i året og ikke 5.

Når blir svaret et annet? Bare hvis alternativet ikke rammes av samme formuesskatt. Da beholder du 5 % i nevneren: (5 − 0,01V)/V = 0,05 gir V = 5/0,06 = 83,3 mill. Legg merke til at 83,3 ikke står som alternativ, nettopp fordi denne oppgaven har justert alternativkostnaden. Havner du der, har du glemt delspørsmål b.

VANLIG FEIL — «Formuesskatten tvinger norske eiere til å kreve høyere avkastning»
Dette er den store misforståelsen kapitlet er skrevet mot, og den er utbredt i næringslivsdebatten. Påstanden er at formuesskatten er en særskatt som gjør norske investorer mindre villige til å betale for en aksje enn utlendinger, slik at norsk eierskap presses ut. Bjerksund og Schjelderups svar er at det ikke stemmer i et velfungerende marked: skatten senker kontantstrømmen og avkastningskravet med nøyaktig like mye, så betalingsviljen er den samme. En investor som likevel krever et påslag, går glipp av lønnsomme investeringer og skader sin egen formue. Forfatternes videre poeng er at formuesskatten ikke er en skatt på aksjer i det hele tatt: en norsk skattyter betaler den uansett om formuen står i aksjer, eiendom eller bank, og det er den samlede skattebyrden på selskap og eier som er relevant. Merk at resultatet er omstridt: finansprofessorene Jøril Mæland og Karin Thorburn har gått hardt ut mot antakelsen om at avkastningskravet faller proporsjonalt med skattesatsen, og mener modellen bryter med Modigliani–Miller. Til eksamen gjelder forelesningens versjon, som er den H2025-fasiten regner.

Resultatet snus interessant når verdsettingsreglene er ulike. Er alternativet en børsnotert aksje, som verdsettes til 80 % av børskursen, mens investeringen er en unotert aksje, som verdsettes til bokført egenkapital og i snitt kommer inn til om lag halvparten av markedsverdien, betaler den norske investoren mindre formuesskatt på det unoterte alternativet. Da blir hans betalingsvilje for den unoterte aksjen høyere enn utlendingens, ikke lavere. Verdsettingsforskjellen, ikke formuesskatten som sådan, er det som vrir kapitalallokeringen.

TIPS — Slik spørres det
Temaet har tre faste former. (1) Ekvivalensspørsmålet: «hvor høy må skatten på kapitalgevinst være for at de to skattene skal gi samme proveny» — H2025 oppgave 9 (svar 20 %) og H2021 oppgave 3a–b (utledningen τ = tr/(1 + r), svar 0,64 %). Alternativene ligger ett prosentpoeng fra hverandre og skiller på tidspunktet for grunnlaget. (2) Avkastningsspørsmålet: «hva blir avkastningen nå» — H2025 oppgave 3a–b. Her er nabospørsmålets fasit alltid et av de gale alternativene. (3) Verdsettingsspørsmålet: «hvordan verdsetter investoren denne investeringen» — H2025 oppgave 3c–d. Nøkkelen er hvilken rente som står i nevneren: CF/r hvis både strøm og krav er justert, CF/(r + τ_w) hvis bare strømmen er det. Utelukkingsregelen er kort: tell justeringene. Er det gjort én justering i telleren og ingen i nevneren, er svaret galt.

### 8.4 Utbyttet som skal dekke formuesskatten

Ekvivalensen forutsetter at eieren har penger til å betale skatten. En eier av et unotert selskap har ofte ikke det: formuen ligger i selskapet, og for å få den ut må han ta utbytte — som selv beskattes med eierskatten t_e. Skal han sitte igjen med nøyaktig formuesskatten etter at utbytteskatten er betalt, må utbyttet brutto-regnes:

FORMEL:  D × (1 − t_e) = τ_w × W ⟹ D = τ_w × W/(1 − t_e)
FORMEL:  Effektiv belastning som andel av formuesverdien: τ_w/(1 − t_e)
   der:  D er bruttoutbyttet, W formuesverdien og t_e den effektive eierskatten. Kontrollen er alltid den samme: D − D×t_e skal bli nøyaktig formuesskatten. Å legge skatten oppå — altså gange med (1 + t_e) — er den klassiske feilen, og den blir grovere jo høyere satsen er.

GJENNOMREGNET EKSEMPEL — to eksamensvarianter av samme formel
Variant 1 — H2025 oppgave 6. Erna eier en bedrift med formuesverdi kr 100 000. Formuesskatten er 1 % og eierskatten 50 % [eksempeltall]. Se bort fra skjermingsfradrag, aksjerabatt og bunnfradrag.

Steg 1 — regningen som skal dekkes. 100 000 × 1 % = kr 1 000. Dette er beløpet som må ligge i hånden etter at utbytteskatten er betalt.

Steg 2 — hva et utbytte gir netto. Av et utbytte D beholder hun D × (1 − 0,50) = 0,5D.

Steg 3 — løs. 0,5D = 1 000 ⟹ D = 1 000/0,50 = kr 2 000.

Kontroll: utbytte 2 000, eierskatt 2 000 × 50 % = 1 000, igjen 1 000 — nøyaktig formuesskatten. ✓ Samlet belastning er 2 000 av en formuesverdi på 100 000, altså 2 %, dobbelt så mye som den nominelle formuesskattesatsen. Det stemmer med formelen: τ_w/(1 − t_e) = 1 %/0,50 = 2 %.

Hva de gale alternativene er laget av. Kr 1 500 er skatten lagt oppå: 1 000 × (1 + 50 %). Test den — et utbytte på 1 500 gir 750 etter eierskatt, og da mangler du 250 kroner på formuesskatten. Kr 2 500 forutsetter 60 % eierskatt. Kr 1 600 er 1 000/(1 − 0,3784) = 1 609, altså dagens eierskatt [dagens regel: 22 % × 1,72 = 37,84 %] brukt i stedet for oppgavens 50 %. Den siste er den lærerike fellen: bruk satsen som står i teksten, ikke den du har pugget.

Variant 2 — H2024 oppgave 7. Samme oppsett, andre tall: formuesverdi kr 100, formuesskatt 1 %, eierskatt 37,8 % [eksempeltall, praktisk talt dagens sats]. Rund av til én desimal.

Steg 1. Formuesskatt = 100 × 1 % = kr 1.

Steg 2. D × (1 − 0,378) = 1 ⟹ D = 1/0,622 = 1,6077 → kr 1,6.

Kontroll: 1,6077 × 37,8 % = 0,6077 i utbytteskatt, og 1,6077 − 0,6077 = 1,0000 går rett til formuesskatten. ✓ Med dagens eierskatt på 37,84 % blir svaret 1/0,6216 = 1,6088, altså samme rute.

Utelukkingen som sparer tid. Alternativene var kr 2, kr 2,1, kr 1,2 og kr 1,6. Eierskatten er 37,8 %, altså under 50 %, og brutto-regning med en sats under 50 % kan aldri mer enn doble beløpet. Både kr 2 og kr 2,1 kan strykes uten å regne. Av de to som står igjen, gir 1,2 × 0,622 = 0,746, som ikke rekker til kr 1. Svaret er gitt før du har brukt kalkulatoren. Med minuspoeng er dette gull: to strøkne alternativer er verdt +1 poeng i forventning selv om du bommer på resten.

En tredje variant, med oppjustering — H2019 oppgave 3a. Formue 100 mill., formuesskatt 0,85 %, alminnelig sats 22 % og oppjusteringsfaktor 1,44 [eksempeltall fra 2019]. Formuesskatt = 100 mill. × 0,85 % = 850 000. Eierskatt t_e = 0,22 × 1,44 = 31,68 %. D = 850 000/(1 − 0,3168) = kr 1 244 145. Kontroll: 1 244 145 × 31,68 % = 394 145, og 1 244 145 − 394 145 = 850 000. ✓ Fella her er å bruke 22 % uten oppjustering: 850 000/0,78 = 1 089 744, som er langt fra riktig rute.

MEKANISME — Hvorfor er dette den harde delen av formuesskatten for en eier?
Fordi hver krone formuesskatt må hentes gjennom en beskatning til. Med dagens eierskatt på 37,84 % er den effektive belastningen τ_w/(1 − t_e) = 1 %/0,6216 = 1,61 % av formuesverdien, ikke 1 %. Oversatt til en avkastningsskatt med r = 5 %: 1,61/5 = 32,2 %, altså over halvannen gang den satsen den nominelle formuesskatten alene tilsvarer (20 %). Det er dette forelesningen bygger sitt hovedargument mot formuesskatten på for eiere uten likvide midler. Motargumentet, som du finner i 8.5, er at problemet i praksis er lite: utsettelsesordningen mot rente er lite brukt, og de selskapene som utløser formuesskatt på eierens hånd, er som regel finansielt sterke.

KOBLING — Tre kapitler møtes her
Regnestykket over ser bort fra skjermingsfradraget. På eksamen gjør det ikke alltid det: skjermingen (kapittel 5) tar en del av utbyttet ut av grunnlaget for eierskatten, slik at det nødvendige bruttoutbyttet blir mindre. Formuesverdien W kommer fra kapittel 7 — markedsverdi ganger (1 − rabatt), med gjelden fordelt forholdsmessig. Og H2025 oppgave 1 setter alt sammen: to år med utbytte, skjerming hvert år og formuesskatt hvert år, der svaret er kr 740 000. Møter du en oppgave som nevner både utbytte og formuesskatt, regn de to skattene uavhengig, med hvert sitt grunnlag, og legg dem sammen til slutt.

### 8.5 Argumentene for og mot en formuesskatt

Forelesning 8 er polemisk, og eksamen kan spørre hva argumentene er, ikke hvem som har rett. To pensumartikler trekker i hver sin retning: Adam og Miller er skeptiske til en årlig formuesskatt, mens Bjerksund og Schjelderup i Magma-artikkelen forsvarer den. Kjenn begge, og kjenn at de er uenige — «hvilken påstand er riktig» er en typisk oppgaveform her.

Adam og Millers hovedskille går mellom en engangsskatt og en årlig skatt. En engangs formuesskatt som kommer uventet og troverdig bare én gang, vrir ingenting: ingen kan gjøre noe for å redusere den, og hvis effektivitet var eneste hensyn, kunne satsen i prinsippet settes til 100 %. Kravet er at verdsettingsdatoen ikke er senere enn kunngjøringsdatoen. Problemet er troverdigheten, siden et parlament ikke kan binde sine etterfølgere, og det verste utfallet er at folk tror formuen kan bli beskattet senere uten at skatten kommer: all vridningen, ingen av inntektene.

MEKANISME — Hvorfor beskatter en årlig formuesskatt akkurat feil del av avkastningen?
Adam og Miller deler avkastningen i fire kilder: normalavkastning (kompensasjon for å utsette konsum), flaks og risiko, renprofitt, og innsats eller forkledd arbeidsinntekt. Alt utenom det første kalles meravkastning, og det er meravkastningen teorien sier man bør beskatte: renprofitt kan beskattes med vilkårlig høy sats uten vridning, risikopremien vris ikke så lenge tap kan fradragsføres like fritt som gevinst beskattes (Domar og Musgrave), og forkledd arbeidsinntekt bør ha samme sats som lønn. Nøkkeleksempelet: to personer eier hver et aktivum på 100. Ved normalavkastning på 5 gir 20 % kapitalinntektsskatt og 1 % formuesskatt begge nøyaktig 1 i skatt. Får den ene i stedet 20 i avkastning, tar formuesskatten fortsatt bare 1, altså 5 % av den faktiske avkastningen, mens kapitalinntektsskatten tar 4. Formuesskatten treffer normalavkastningen hardt og meravkastningen ikke i det hele tatt — stikk motsatt av det teorien anbefaler.

Deres andre hovedinnvending er kumulasjonen. Fordi den samme formuen beskattes om igjen hvert år, stiger den effektive skatten på konsum jo lenger konsumet utsettes. For en som sparer i 40 år med 5 % avkastning, reduserer 1 % årlig formuesskatt sluttverdien med om lag en tredjedel (0,99^40 = 0,669, altså −33,1 %), og 2 % med mer enn halvparten (0,98^40 = 0,446, altså −55,4 %) — i tillegg til all skatt som allerede ligger på avkastningen. Derav også poenget at du betaler mindre hvis du bruker opp eller gir bort formuen raskt, noe som er vanskelig å forsvare prinsipielt. Konklusjonen deres er å beskatte lønn, meravkastning, kanskje arv og eventuelt eksisterende formue, men helst ikke normalavkastningen.

De fører likevel fram tre prinsipielle argumenter for en årlig formuesskatt, og et fjerde av andrebest-typen:

- Sparing avslører skatteevne. Er sparenivået informativt om inntektsevne utover det lønnen sier, kan skatt på sparing omfordele fra dem med høy evne uten å øke lønnsskatten, og dermed lette avveiningen mellom omfordeling og arbeidsinsentiver.
- Formue gir nytte utover kjøpekraften — trygghet, fleksibilitet, prestisje. Da er de formuende bedre stilt enn andre med samme livsløpsinntekt. Forfatterne tar ikke stilling, og påpeker at fleksibiliteten kanskje er en del av hva én krone er verdt.
- Negative eksternaliteter. Status er et nullsumspill, og rikdom kan kjøpe politisk innflytelse. Motargumentet er at klassikerne knytter status til forbruk, ikke til å sitte på formuen, og at en formuesskatt perverst nok ville oppmuntre til å gi mer bort hvis problemet er politiske donasjoner.
- Andrebest-argumentet: effektivitetstapet ved en skatt vokser mer enn proporsjonalt med satsen, så det kan være en gevinst i å spre provenyet over flere skatter framfor å la én sats bli høy. Motvekten er ekstra administrasjons- og etterlevelseskostnader.

Magma-artikkelens forsvar går på empiri framfor teori. Formue er langt skjevere fordelt enn inntekt, så omfordeling treffer bedre når den knyttes til formue. De realøkonomiske innvendingene holder dårlig: registerstudier av små og mellomstore tett eide selskaper finner ingen støtte for at formuesskatten reduserer sysselsettingen, snarere en positiv sammenheng, fordi eieren kan senke formuesskatten ved å investere mer i egen virksomhet. Sparestudier fra Sverige og Danmark finner små utslag, og for Norge finner nyere forskning en positiv effekt; tilpasningen skjer gjennom porteføljevalg og verdsetting, ikke gjennom hvor mye som spares. Likviditetsargumentet svekkes av at utsettelsesordningen mot rente er lite brukt, at bare 15 % av 1 835 gasellebedrifter i én kartlegging utløste formuesskatt på eiernes hånd, og at de aksjene som utløser formuesskatt, i hovedsak kommer fra finansielt sterke selskaper.

Artikkelens egen kritikk retter seg mot verdsettingsreglene, ikke mot skatten: unoterte aksjer verdsettes til bokført egenkapital og kommer i snitt inn til om lag halvparten av markedsverdien, før aksjerabatten på 20 %. Det vrir proveny, børsens virkemåte og kapitalallokeringen, og forklarer hvorfor to tredeler av formuen til de rikeste ligger nettopp i unoterte aksjer. Tre tall til som egner seg for flervalg: i 2026 er det bare Norge, Spania og Sveits som har formuesskatt basert på skattyters nettoformue; skatter på eiendom utgjorde 2,2 % av samlede skatteinntekter i Norge i 2022 mot et OECD-snitt på 5,3 %; og Norge avviklet arveavgiften i 2014. Fjernes formuesskatten, anslås provenytapet konservativt til ca. 30 mrd. kr, som med uendret atferd ville krevd at selskapsskatten gikk fra 22 % til rundt 28 % — og skal samlet beskatning av selskapsoverskudd og utbytte holdes på dagens 51,5 %, måtte utbytteskatten samtidig ned til om lag 32 %.

Til slutt, det punktet der artiklene kolliderer: en simuleringsstudie finner at når avkastningen varierer vedvarende mellom investorer, flytter en formuesskatt kapital fra lavavkastende til høyavkastende eiere, mens en gevinstskatt ikke gjør det — så en provenynøytral omlegging fra kapitalinntektsskatt til formuesskatt øker velferden, og optimal formuesskatt er positiv mens optimal skatt på kapitalinntekt kan være negativ. Magma-artikkelen fører dette som argument for; Adam og Miller avviser det. Merk samtidig at nettopp avkastningsforskjeller mellom investorer er det som bryter ekvivalensen fra 8.1: τ_w = r·t forutsetter at alle har samme r.

### 8.6 Effektiv skatt på de rikeste

Det siste stykket pensum til forelesning 8 er regnestykket som forklarer hvorfor det norske skattesystemet måles som regressivt på toppen. Bakteppet er SSB-forskningen: i perioden 2004–2018 betalte topp 1 % om lag 22 % av bruttoinntekten i skatt, mens gruppen mellom 90. og 99. prosentil betalte 33 %, og topp 0,1 % betalte mellom 9 og 17 %. Kurven for effektiv skattesats stiger altså gjennom hele fordelingen og faller på det siste stykket.

Bjerksund, Hopland og Schjelderup viser hvorfor med ett eksempel. En investor eier et selskap som tjener 100 kr i året før skatt. Med en diskonteringsrente på 12,22 %, som er den norske realavkastningen på aksjer etter 1980, er selskapet verdt 100/0,1222 = 818 kr. Den gjennomsnittlige effektive selskapsskatten i norske selskaper er 13,1 %, ikke den nominelle satsen. Så kommer poenget: et unotert selskap verdsettes for formuesskatt til om lag 35 % av markedsverdien, et børsnotert til 80 % av kursen. De 35 prosentene er det samme anslaget som i 8.5, sett fra den andre siden: om lag halvparten av markedsverdien før aksjerabatten, og 35–40 % etter at rabatten er trukket fra. Regnet med den høyeste formuesskattesatsen på 1,1 % og eierskatten 37,84 % [dagens regel], og uten gjeld:

| Post | Børsnotert | Unotert |
|---|---|---|
| Markedsverdi av selskapet | 818 | 818 |
| Formuesverdi | 818 × 0,80 = 654,4 | 818 × 0,35 = 286,3 |
| Formuesskatt (1,1 %) | 7,20 | 3,15 |
| Utbytte som må til: D = τ_wW/(1 − t_e) | 11,58 | 5,07 |
| Utbytteskatt (37,84 % av D) | 4,38 | 1,92 |
| Selskapsskatt (effektiv sats 13,1 %) | 13,10 | 13,10 |
| Effektiv skatt av bruttoinntekten 100 | 24,7 % | 18,2 % |

Kontrollen er at postene summerer: 13,10 + 7,20 + 4,38 = 24,68 for det børsnoterte, og 13,10 + 3,15 + 1,92 = 18,17 for det unoterte. Forelesningen runder mellomresultatene og skriver 18,1 %; regner du eksakt, får du 18,2 %. En portefølje med en tredel børsnotert og to tredeler unotert, som er omtrent sammensetningen hos topp 1 %, gir (24,7 + 2 × 18,2)/3 ≈ 20 % — som stemmer godt med de 22 % SSB-forskningen måler.

Denne delen kommer som fakta- eller begrepsspørsmål, ikke som regneoppgave, og den tar under et minutt hvis tallene sitter. Kjenn rekkefølgen i fordelingen (topp 1 % ca. 22 %, 90.–99. prosentil 33 %, topp 0,1 % 9–17 %), kjenn årsaken (lav effektiv selskapsskatt og lav formuesverdsetting av unoterte aksjer, ikke omgåelse av utbytteskatten), og kjenn konklusjonen: den lave verdsettingen gjør formuesskatten til et lite effektivt omfordelingsverktøy. Et alternativ som peker på utbytteskatten eller på skatteparadis som hovedforklaring, er galt. Forelesningens eget sammenligningstall er verdt å huske: en eier med 10 mill. i børsnoterte aksjer som tar utbytte for å dekke formuesskatten, ender på en effektiv sats på 25,6 %, omtrent som en lønnstaker med kr 700 000 i inntekt (25,4 %). Foreleserens egen kommentar til det er at hva man mener om tallet, er politikk og ikke fag.

Legg merke til hvordan de tre delene av kapitlet henger sammen. Formuesskatten er en avkastningsskatt med effektiv sats τ_w/r (8.1). Den er nøytral i verdsettingen når den treffer alle alternativene likt (8.3). Men den treffer dem ikke likt, fordi verdsettingsreglene er ulike, og den må ofte finansieres med et utbytte som selv beskattes (8.4). Det er i de to unntakene, ikke i hovedresultatet, at både argumentene og eksamensoppgavene ligger.
