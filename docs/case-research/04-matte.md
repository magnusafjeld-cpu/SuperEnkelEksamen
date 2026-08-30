---
tittel: Kvantitativ del av konsulent-caseintervju — kartlegging for drillinnhold
opprettet: 2026-08-30
kilde: web-research (40+ søk/fetch), se kildeliste nederst
status: råmateriale for innholdsproduksjon
---

# Den kvantitative delen av caseintervjuet

Dette er delen kandidater oftest ryker på, og den eneste delen som kan trenes
til automatikk. Alt under er kartlagt med tanke på at det skal bli **drill** —
korte, repeterbare oppgaver med fasit — ikke lesestoff.

> **Notasjon i dette dokumentet**
> `[D]` = dokumentert av firmaet selv eller entydig på tvers av mange kilder.
> `[K]` = kandidatrapporter / prep-bransjens gjengivelse, ikke offisielt bekreftet.

---

## 0. Hvorfor dette er den trenbare delen

- Kalkulator er forbudt i det levende caseintervjuet hos MBB. Begrunnelsen
  firmaene selv gir: konsulenter må gi raske, holdbare svar foran klient uten
  hjelpemidler. `[D]`
- Prep-bransjen er samstemt om at **presisjon ikke er kravet** — retningsriktig
  svar levert raskt med skarp tolkning slår 100 % nøyaktig uten innsikt.
- Det som faktisk vurderes er tre ting samtidig: (1) oppsettet — velger du
  riktig formel, (2) utførelsen — regner du riktig nok, (3) formidlingen —
  sier du framgangsmåten høyt så intervjueren kan korrigere deg.
- Referansehastigheter som brukes i prep-materiell `[K]`:

  | Operasjon | Målt tid |
  |---|---|
  | Enkelt prosentregnestykke | < 5 sek |
  | Toleddet prosent | < 10 sek |
  | Breakeven | < 15 sek |
  | Marginnedbrytning i flere ledd | < 20 sek |
  | Markedsestimat, 3–4 ledd | < 45 sek |

---

## 1. Hoderegningen

### 1.1 Operasjonene som faktisk kreves

Under tidspress, uten kalkulator, med penn og papir:

1. **Prosent begge veier.**
   - «Hva er 18 % av 250?» (framover)
   - «250 er hvor mange prosent av 1 400?» (bakover)
   - **Reversere en prosentendring** — den store fellen. Pris falt 20 % til
     1 200; hva var opprinnelig pris? Svar: `1200 / 0,8 = 1 500`, ikke
     `1200 × 1,2 = 1 440`. Feilsvaret 1 440 ligger *alltid* som alternativ i
     flervalgstester.
   - **Prosent vs. prosentpoeng.** Margin fra 8 % til 10 % er +2 prosentpoeng
     = +25 % relativ vekst. Begge tall ligger i svaralternativene.
2. **Vekstrater og CAGR.**
   - Årlig endring: `(ny − gammel) / gammel`
   - CAGR: `(slutt/start)^(1/n) − 1` — skal *ikke* regnes eksakt i hodet, men
     anslås (se 1.2).
   - Kort horisont, lav rate: multipliser lineært. 4 % i 6 år ≈ 24 % ≈ 25 %
     (sant svar 26,5 % — godt nok, og du sier «litt over 25 fordi renters
     rente»).
3. **Brøk ↔ prosent ↔ desimal.** Skal være oppslag, ikke regning.
4. **Multiplikasjon av store tall med nuller.** 32 × 25 000, 96 × 1 300 000.
5. **Divisjon med avrunding.** 4 400 mrd / 5,6 mill, 28 000 / 330.
6. **Forholdstall.** Markedsandel, per capita, per husholdning, per dag.
7. **Vektede snitt.** Blandet margin, blandet pris, mix-effekt.
8. **Breakeven.** `Faste kostnader / dekningsbidrag per enhet`.

### 1.2 Teknikkene proffene lærer bort

**T1 — Strip nullene, fest dem tilbake til slutt.**
Den enkeltteknikken som forebygger flest katastrofer.
`32 × 25 000` → `32 × 25 = 800` → tre nuller tilbake → `800 000`.
`4 000 × 250` → `4 × 25 × 10 000 = 1 000 000`.
Skriv nullene som eget tall i margen mens du regner: «800, og så 10^3».

**T2 — Regn i enheter, ikke i siffer.**
Skriv `250M + 300M + 150M = 700M`. Aldri skriv ut nullene. K/M/B (eller
tusen/mill/mrd) *skal stå på hver linje*. Kilder er samstemte: å droppe enheten
er den vanligste kilden til at millioner og milliarder blandes.

**T3 — 10-potenser som eget regnestykke.**
Del alt i «mantisse × 10^n». `1,4 mrd × 350 kr` → `1,4 × 3,5 = 4,9` og
`10^9 × 10^2 = 10^11` → `490 mrd`. Ordenen sjekkes separat fra sifrene.

**T4 — Prosentankere.** Bygg alt fra 10 % og 1 %.
- 10 % = del på 10, 1 % = del på 100, 5 % = halvparten av 10 %
- 15 % = 10 % + 5 %, 20 % = 2 × 10 %, 35 % = 25 % + 10 %
- 18 % = 20 % − 2 % (raskere enn 10+5+2+1)

**T5 — Rund av, og etterkorriger.**
Fem steg: (a) rund til vennlig tall, (b) regn, (c) mål hvor mye du rundet i
prosent, (d) korriger i motsatt retning, (e) *si begge deler høyt*.
Eksempel: `18 % av 250` → `20 % av 250 = 50` → rundet opp ~11 % →
«ca. 45». Fasit 45.
Tommelfinger fra flere kilder: **ikke rund mer enn 10 %** på ett enkelt ledd.

**T6 — Rund én opp og én ned (kompenserende feil).**
`19 × 41` → `20 × 40 = 800`. Feilene motvirker hverandre; fasit 779.
Motsatt: `19 × 39` → `20 × 40 = 800` er *dårlig* (begge opp) → fasit 741, 8 %
bom. Regelen: rund alltid i motsatt retning på de to faktorene.

**T7 — Halver og doble.** `160 × 350` → `80 × 700 = 56 000`.

**T8 — Omorganiser faktorene.** `125 × 2,5 × 4` → `125 × 4 = 500` → `× 2,5 = 1 250`.

**T9 — Faktoriser med 5 og 2.** `× 5` = `× 10 / 2`. `× 25` = `× 100 / 4`.
`× 50` = `× 100 / 2`. `/ 5` = `× 2 / 10`.

**T10 — Ekspander rundt et rundt tall.**
`96 × 1 300 000` = `(100 − 4) × 1,3M` = `130M − 5,2M` = `124,8M`.

**T11 — Divisjon som brøkoppslag.** Ikke gjør lang divisjon; gjenkjenn brøken.
`/7` → `× 0,143`. `/8` → halver tre ganger. `/9` → del på 10, legg til ~11 %.
`/6` → del på 3, halver.

**T12 — Regel om 72 (og slektningene).**
- Dobling: `år = 72 / vekstrate` → 8 % ⇒ 9 år, 12 % ⇒ 6 år, 6 % ⇒ 12 år
- **Baklengs** — dette er CAGR-trikset: doblet på 10 år ⇒ CAGR ≈ 7,2 %.
  100M → 200M på 5 år ⇒ ≈ 14–15 %.
- Tredobling: `114 / rate`. Firedobling: `144 / rate`.
- Vekstfaktorankere å kunne: 1,21 over 2 år ≈ 10 %; 1,331 over 3 år ≈ 10 %;
  1,1^7 ≈ 2.

**T13 — Venstre mot høyre, ikke høyre mot venstre.**
Skolemetoden gir sifrene i feil rekkefølge for muntlig formidling. Start med
det største leddet, så har du et grovsvar tidlig og kan si det høyt.

**T14 — Slik sier du tallet høyt underveis** (dette scores, ikke bare regningen):
1. **Si formelen før tallene.** «Jeg tar markedet ganger andelen, så trekker
   fra variable kostnader.»
2. **Be om lov til å runde av.** «Er det greit at jeg runder til nærmeste
   million?» — nesten alltid ja, og du har flagget presisjonsnivået.
3. **Si enheten hver gang.** «Åttehundre — millioner kroner — per år.»
4. **Aldri stille i mer enn 15–20 sekunder.** Si «jeg regner 24 ganger 125
   millioner nå» i stedet for å gå i svart.
5. **Lever hodetallet først, så konteksten.** «Ca. 45 millioner. Det er rundt
   en tredjedel av dagens omsetning.»
6. **Flagg retningen på avrundingen.** «Jeg rundet opp, så det virkelige tallet
   ligger litt under 600 millioner — rundt 585.»

### 1.3 Oppslagstabeller som skal sitte som ryggmarg

**Brøk → prosent** (kildene sier: kunn 1/2 til 1/15 flytende)

| Brøk | % | Brøk | % |
|---|---|---|---|
| 1/2 | 50 | 1/9 | 11,1 |
| 1/3 | 33,3 | 1/10 | 10 |
| 1/4 | 25 | 1/11 | 9,1 |
| 1/5 | 20 | 1/12 | 8,3 |
| 1/6 | 16,7 | 1/13 | 7,7 |
| 1/7 | 14,3 | 1/14 | 7,1 |
| 1/8 | 12,5 | 1/15 | 6,7 |

Også: 2/3 = 66,7 %, 3/4 = 75 %, 3/8 = 37,5 %, 5/8 = 62,5 %, 2/7 ≈ 28,6 %.

**Kvadrater 11–25**, og **13 × 17-typen** (to tosifrede) bør drilles separat.

### 1.4 Formlene som må ligge klare

```
Resultat        = Omsetning − Kostnad
Omsetning       = Pris × Volum
Bruttomargin    = (Omsetning − VK) / Omsetning
Driftsmargin    = EBIT / Omsetning
Dekningsbidrag  = Pris − variabel kostnad per enhet
Breakeven enh.  = Faste kostnader / dekningsbidrag per enhet
Breakeven oms.  = Faste kostnader / dekningsgrad
Markedsandel    = Egen omsetning / totalmarked
Markedsstørrelse= Antall kunder × snittforbruk
Vektet snitt    = Σ (vekt_i × verdi_i)
CAGR            = (slutt/start)^(1/n) − 1     (anslås med 72-regelen)
ROI             = (gevinst − kostnad) / kostnad
Tilbakebetaling = investering / årlig netto kontantstrøm
Evigvarende NV  = årlig kontantstrøm / avkastningskrav
Voksende evighet= kontantstrøm / (avkastningskrav − vekst)
LTV             = (månedsinntekt × bruttomargin) / månedlig churn
CAC             = markedsføringskostnad / nye kunder
```

**To avledninger som kommer overraskende ofte:**
- *Volumeffekt bak omsetningsfall*: omsetning −15 %, pris +5 %
  ⇒ volum = `0,85 / 1,05 ≈ 0,81` ⇒ volum ned ~19 %.
- *Hvor mye volum må et priskutt hente inn*: kutt prisen 3 %
  ⇒ `1/0,97 ≈ 1,031` ⇒ trenger +3,1 % volum bare for å stå på stedet hvil.
  (Med margin i bildet trengs mye mer — god oppfølgingsoppgave.)

---

## 2. Estimeringsoppgavene (market sizing)

### 2.1 Topp-ned vs. bunn-opp

| | Topp-ned | Bunn-opp |
|---|---|---|
| Start | Stor makrostørrelse (befolkning, BNP, husholdninger) | Én liten enhet (én butikk, én dag, én maskin) |
| Filtrer | Segmenter nedover til relevant målgruppe | Skaler oppover til hele markedet |
| Passer | Forbrukermarkeder (~80 % av oppgavene) `[K]` | B2B, infrastruktur, kapasitetsbegrensede markeder |
| Typisk feil | For mange segmenteringssteg, mister sporet | Uenheten er ikke representativ |

**Beste praksis:** gjør den ene, sanity-sjekk med den andre. «Jeg fikk 2,8 mrd
topp-ned. La meg krysspeile bunn-opp: 3 800 butikker × 1 900 kr/dag × 310 dager
≈ 2,2 mrd. Samme størrelsesorden — jeg lander på 2–3 milliarder.»

### 2.2 Strukturen intervjueren vil se

5–7 steg, uttalt *før* du regner:

1. Avklar hva som skal måles: **enheter eller kroner? per år? geografi?**
2. Velg tilnærming og si hvorfor.
3. Skriv opp ligningen i symboler: `Befolkning × andel × frekvens × pris`.
4. Segmenter langs **én** akse om gangen (alder, geografi, inntekt, bruksgrad).
5. Sett tall på hver forutsetning og **si hvor tallet kommer fra**.
6. Regn, med avrunding flagget.
7. Sanity-sjekk, oppgi svaret med enhet og usikkerhetsspenn.

**Segmenteringsakser som betaler seg:**
- alder (barn / yrkesaktiv / pensjonist)
- husholdning vs. individ (kritisk: TV, bil, vaskemaskin er per *husholdning*)
- by / land (Norge: ~15 % av alle bor i Oslo kommune)
- bruker / ikke-bruker, og deretter tung/lett bruker
- nysalg vs. erstatningssalg (installert base / levetid = årlig erstatningsvolum)

**Levetidstrikset**, som løser en tredjedel av alle sizing-oppgaver:
`årlig marked = installert base / gjennomsnittlig levetid`.
Eks.: 2,94 mill. personbiler i Norge, snittlevetid ~17 år ⇒ ~173 000 nye biler
per år. Faktisk førstegangsregistrert i 2025: 184 705. Treffer på 6 %.

### 2.3 Norske tall verdt å memorere

Alle fra SSB med mindre annet er nevnt. **Bruk de runde tallene i kolonnen til
høyre når du drilles** — det er de som skal sitte.

| Størrelse | Faktisk | Drilltall |
|---|---|---|
| Befolkning (1.1.2026) | 5 627 400 | **5,6 mill.** |
| Husholdninger (2025) | 2 649 395 | **2,65 mill.** |
| Personer per husholdning | 2,1 | **~2,1** |
| Barn 0–12 år | ~761 000 | **0,75 mill.** |
| Ungdom 13–19 år | ~478 000 | **0,5 mill.** |
| 20–44 år | 1 865 473 | **1,9 mill.** |
| 45–66 år | 1 563 660 | **1,55 mill.** |
| 67 år og eldre | ~960 000 | **~1,0 mill.** |
| Innvandrere | 987 120 | **~1,0 mill. (18 %)** |
| Fødsler per år | ~55 000 | **~55 000** |
| Dødsfall per år | ~43 000 | **~43 000** |
| Sysselsatte (juli 2026) | 2 929 000 | **2,9 mill.** |
| Arbeidsstyrken | ~3 067 000 | **3,1 mill.** |
| Arbeidsledighet | 4,5 % | **~4,5 %** |
| Aktive bedrifter (2026) | 656 500 | **0,65 mill.** |
| — med ansatte | 207 800 | **0,2 mill.** |
| BNP 2025 | 5 518 mrd kr | **5 500 mrd** |
| Fastlands-BNP 2025 | 4 400 mrd kr | **4 400 mrd** |
| BNP per innbygger | ~980 000 kr | **~1 mill. kr** |
| Gj.snittlig månedslønn 2025 | 62 070 kr | **62 000 kr** |
| Medianlønn 2025 | 55 800 kr | **56 000 kr** |
| Nedre/øvre kvartil lønn | 45 470 / 69 490 | **45k / 70k** |
| Medianinntekt husholdning e. skatt (2024) | 676 100 kr | **~675 000 kr** |
| Boutgift per husholdning (2022) | 136 000 kr/år (31 %) | **~135 000 kr** |
| Transportutgift per husholdning (2022) | 82 000 kr/år (19 %) | **~80 000 kr** |
| Personbiler (2025) | 2 944 403 | **2,9 mill.** |
| — elbiler | 945 185 | **0,95 mill. (32 %)** |
| Nyregistrerte personbiler 2025 | 184 705 (94,7 % el) | **~185 000** |
| Oslo kommune | 728 714 | **0,73 mill.** |
| Bergen | 294 860 | **0,3 mill.** |
| Trondheim | 218 460 | **0,22 mill.** |
| Dagligvaremarkedet (2024) | 227 mrd kr | **~230 mrd** |
| — NorgesGruppen / Coop / Rema / Bunnpris | 43,5 / 29,2 / 23,9 / 3,3 % | **44/29/24/3** |

**Avledede tall som er verdt å kunne som ferdig resultat:**
- Dagligvare per husholdning: `230 mrd / 2,65 mill ≈ 87 000 kr/år` ≈ 1 700 kr/uke
- Dagligvare per innbygger: `230 mrd / 5,6 mill ≈ 41 000 kr/år`
- Lønnssum i Norge grovt: `2,9 mill × 62 000 × 12 ≈ 2 160 mrd kr` ≈ halvparten
  av fastlands-BNP. Dette er en **glimrende sanity-sjekk-ankring**.
- Ett prosentpoeng av dagligvaremarkedet = 2,3 mrd kr.
- Én krone per nordmann per dag = `5,6 mill × 365 ≈ 2 mrd kr/år`.
  (Dette er kanskje det nyttigste enkeltanker i norsk market sizing.)

### 2.4 Internasjonale tall

| | Tall |
|---|---|
| Verden | 8,0 mrd |
| Kina / India | 1,4 mrd hver |
| EU | 450 mill. |
| Europa totalt | ~745 mill. |
| USA | 335 mill. |
| USA husholdninger | 130 mill. (2,5 pers.) |
| Tyskland / Frankrike / Storbritannia | 84 / 68 / 68 mill. |
| Japan | 125 mill. |
| Norden | ~28 mill. (SE 10,6 / DK 6,0 / FI 5,6 / NO 5,6 / IS 0,4) |
| USA BNP | ~28 bill. USD (~84 000 USD per capita) |
| Median husholdningsinntekt USA | ~75 000 USD |

**Tidsankere:** 8 760 timer i året (≈ 9 000), ~2 000 arbeidstimer, 250
arbeidsdager, 104 helgedager, 16 våkne timer i døgnet, 3 måltider per dag.

**Bransjemarginer (grov peiling, brukes til plausibilitetssjekk):**
programvare 70–85 % brutto / 20–30 % drift; dagligvare 25–30 % / 2–4 %;
mote 50–60 % / 8–12 % ; industri 30–40 % / 8–15 %; restaurant 60–70 % / 5–10 %;
flyselskap 20–30 % / 5–10 %; farmasi 65–80 % / 20–30 %.

### 2.5 Sanity-sjekk — fem grep

1. **Størrelsesorden.** Ganger du 125 millioner med 24 skal svaret havne i
   milliarder. Sjekk potensen før du sjekker sifrene.
2. **Per capita / per husholdning.** Del svaret på 5,6 mill. eller 2,65 mill.
   «Det ble 56 mrd — altså 10 000 kr per nordmann per år på hundefôr. Det er
   åpenbart for høyt; jeg har nok gått galt på frekvensen.»
3. **Benchmark mot noe kjent.** Sammenlign med dagligvaremarkedet (230 mrd),
   fastlands-BNP (4 400 mrd) eller statsbudsjettet. Et forbrukermarked i Norge
   som lander over ~50 mrd er stort; over 200 mrd er nesten sikkert feil.
4. **Retningssjekk.** Hvis høyere pris i regnestykket ditt gir høyere volum,
   har du snudd noe.
5. **Baklengs.** Ta svaret og regn tilbake til én forutsetning: «2,2 mrd
   fordelt på 3 800 butikker er 580 000 kr per butikk per år — det er for lite
   for en dagligvarebutikk, så noe skurrer.»

---

## 3. Exhibit-tolkning

### 3.1 Diagramtypene som faktisk brukes

| Type | Hva den skal si | Det som må leses først |
|---|---|---|
| **Stablet søyle** | Total *og* sammensetning | Total først, så **miksendring** over tid |
| **100 % stablet** | Kun miks — ingen totaler | Aldri les nivå ut av denne |
| **Klynget søyle** | Direkte sammenligning innad i kategori | Hvilken dimensjon er gruppert vs. farget |
| **Linje / tidsserie** | Trend, vendepunkt | Er y-aksen absolutt eller indeksert? |
| **Vannfall / bro** | Hvordan A ble til B, ledd for ledd | Fortegn og **rekkefølge** på leddene |
| **Kostnadsbro / PVM** | Pris-, volum- og mikseffekt hver for seg | Hvilken effekt er størst — det er svaret |
| **Spredningsplott** | Sammenheng mellom to variabler | Uteliggere og klynger, ikke bare trendlinjen |
| **Boblediagram** | Tre dimensjoner (x, y, størrelse) | Hva boblestørrelsen faktisk måler |
| **Mekko / markedsandelskart** | Segmentstørrelse (bredde) × andel (høyde) | Areal = kroner. Bredeste søyle ≠ viktigst |
| **Kakediagram** | Andel av helhet, ett tidspunkt | Hva er totalen i kroner? Står den noe sted? |
| **Indeksert tidsserie** | Relativ utvikling fra basisår | Basisår, og at 120 ≠ 120 enheter |

### 3.2 Det intervjueren venter at du sier først

Rekkefølgen er nesten alltid den samme, og den er selv en drillbar ferdighet:

1. **Ta 20–30 sekunder i stillhet.** Si det: «Kan jeg få et halvt minutt til å
   lese dette?» Det er forventet og teller positivt.
2. **Les tittelen høyt.** Bokstavelig.
3. **Les aksene, enhetene og fotnoten høyt.** Enhet er der fellen ligger.
4. **Parafraser hva diagrammet viser, og be om bekreftelse.**
   «Dette viser antall salgsmuligheter fordelt på bransje, sortert synkende,
   og hver søyle er delt etter sannsynlighetsnivå. Stemmer det?»
5. **Én observasjon, deretter én implikasjon.** Ikke les opp alle tallene.
   «Totalen er flat, men miksen har snudd — det er poenget.»
6. **Koble tilbake til spørsmålet du stilte før du fikk arket.**
7. **Si hva du vil vite videre.**

Pyramideprinsippet gjelder: konklusjon først, tall som støtte etterpå.

### 3.3 De klassiske fellene

- **Aksekutt (truncated y-axis).** Y-aksen starter på 90 i stedet for 0, og en
  bevegelse på 4 % ser ut som en halvering. Forskning viser at effekten
  *vedvarer selv etter at folk er opplært i den*, og at grafkompetanse ikke
  beskytter mot den — 83,5 % av deltakerne over fem studier ble påvirket. Eneste
  motgift er en fast vane: **les alltid y-aksens startverdi høyt**.
- **Indeksert forvekslet med absolutt.** «Indeks 100 = 2020». En serie som går
  fra 100 til 130 og en annen fra 100 til 110 sier *ingenting* om hvem som er
  størst. Den lille kan vokse raskest og fortsatt være ubetydelig.
- **Prosent av prosent.** «Marginen økte 2 prosentpoeng» vs. «marginen økte
  2 %». Og: 20 % av segmentet som er 30 % av markedet = 6 % av markedet, ikke
  20 %.
- **Miksendring skjult bak flat total.** Klassikeren: totalt 100 000 kunder
  begge år, men nye kunder gikk fra 25 % til 50 % mens lojale falt fra 30 % til
  20 %. Selskapet vokser ikke — det løper på tredemølle og lekker kunder like
  fort som det skaffer dem.
- **Korrelasjon vs. kausalitet.** Spredningsplott inviterer til å si «X driver
  Y». Riktig svar: «Det er en positiv sammenheng. Før jeg konkluderer om
  årsak vil jeg vite om det finnes en tredje variabel og hva som kom først.»
- **Enhet i overskrift eller fotnote.** «Tall i 1 000 kr» — og svaralternativene
  er i hele kroner. Nummer 1-årsak til feilsvar på aggregeringsoppgaver.
- **Betinget informasjon i spørsmålet.** «Snitt for de kvartalene der
  omsetningen oversteg X» — regner du snittet av alle kvartaler får du et
  plausibelt, men galt svar. Det svaret ligger som alternativ.
- **Areal-illusjon i Mekko.** Bredeste segment er ikke nødvendigvis mest
  lønnsomt; det er areal (bredde × høyde) som er kroner.
- **Manglende data.** Riktig svar er noen ganger «dette kan jeg ikke svare på
  med det som står her — jeg trenger X». Å gjette i stedet straffes.

---

## 4. De digitale testene

### 4.1 McKinsey Solve

**Status 2026** `[D]` for at Solve brukes som screening før caseintervju;
`[K]` for detaljene i spillene.

- **Ecosystem Building** er nå **legacy** — sjeldnere brukt, men går igjen i
  eldre guider. Oppgaven: velg 8 arter fra en pool på 39 slik at næringskjeden
  er selvbærende, og velg lokasjon der alle overlever. Kvantitativt innhold er
  lavt; det er begrensningslogikk, ikke regning.
- **Redrock Study (Red Rock)** er den mest matte-tunge og den kandidater synes
  er hardest. `[K]` Rundt **35 minutter**, med kontinuerlig klokke over alle
  deler:
  - *Investigation:* velg relevante data fra tekst, tabeller og diagrammer og
    dra dem inn i en «Research Journal». Ferdigheten er **hensynsløs filtrering**
    — hvert datapunkt er et binært behold/forkast-valg.
  - *Analysis:* 3–5 kvantitative spørsmål. **Kalkulator på skjermen er
    tilgjengelig her.** Feilkildene er enhets- og tidsperiodemismatch, ikke
    aritmetikk.
  - *Report:* fyll ut en malbasert rapport med huller, og **velg riktig
    diagramtype** (linje, søyle, kake) til konklusjonen.
  - *Mini-cases:* seks frittstående oppgaver, hver med eget diagram/tabell og
    ett kvantitativt spørsmål. Beskrives som GMAT-aktige. Rådet som går igjen:
    **spar 10–15 minutter til disse.**
- **Sea Wolf** `[K]`: ~30 min optimeringsoppgave. Velg to profileringsegenskaper,
  kategoriser mikrober, bygg en kandidatpool, velg endelig behandling ved å
  **gjennomsnitte attributtverdier inn i målintervaller**, med krav om at minst
  én bærer ønsket egenskap og ingen bærer uønsket. Reelt matteinnhold:
  vektede/uvektede gjennomsnitt og intervallsjekk under tidspress.
- **Sustainable Futures Lab (SFL)** er meldt som tredje spill i noen 2026-varianter. `[K]`
- **Scoring:** to komponenter — *product score* (traff du målene) og *process
  score* (hvordan du kom dit; museklikk, rekkefølge, om du testet hypoteser).
  McKinsey publiserer **ikke** vekting eller terskel. `[D]` at det ikke
  publiseres; `[K]` at bestått-raten anslås til 20–30 % globalt.
- **Hva den ikke tester** `[D]`: memorerte rammeverk, bransjekunnskap,
  caseintervju-mekanikk.
- **Trening som faktisk hjelper:** grensesnittvane (dra-og-slipp, trepanel-
  layout), prosessdisiplin (mål først, filtrer, så regn), og mønstergjenkjenning
  på tilbakevendende spørsmålstyper — særlig **vekstrateutregninger og
  segmentsammenligninger**.

### 4.2 BCG Online Case / «Casey»

- Chatbot-drevet case, **8–10 spørsmål på 25–35 minutter**, avsluttet med en
  **60-sekunders videoanbefaling** (5 min forberedelse). `[K]`
- **60–70 % kvantitativt** `[K]`. Typiske beregninger: bruttomargin,
  vekstrater, breakeven, vektede snitt — nesten alltid med tall hentet ut av
  et exhibit.
- Første spørsmål rapporteres konsistent som **datasettvalg**: ~8 datakilder,
  velg de relevante før noen analyse. Samme «filtrer først»-ferdighet som Redrock.
- Svarformat: kort fritekst-tall under klokke, pluss flervalg og
  datatolkning.
- **Kalkulator er tillatt.** Utfordringen er lagdelte flerstegsberegninger og
  enhetssporing, ikke hoderegning.
- Typisk oppgaveform (gjengitt eksempel `[K]`): marked 18 mrd USD, vekst 8 %,
  år 1-andel 3 %, faste etableringskostnader 120 mill. USD, variabel kostnad
  85 USD/enhet, pris 250 USD → hvor mange enheter for breakeven år 1?
  (`120M / (250 − 85) ≈ 727 000 enheter` — og så: er det innenfor 3 % av
  markedet? `18 mrd × 3 % = 540 mill. USD` ⇒ ja, med god margin.)

### 4.3 Bain

- **Sova**-testen: psykometrisk pakke laget med Sova (UK), plassert etter
  CV-screening og før caseintervju. Fire deler: **situasjonsvurdering (SJT)**,
  **evnetest (numerisk, verbalt, logisk)**, **personlighet**, og valgfritt
  **videointervju**. Evnedelen: 25–30 flervalg på 30–50 min. `[K]`
- Ikke tidsbegrenset på skjermen, men **tidsbruk registreres** og inngår i
  vurderingen sammen med treffsikkerhet. `[K]`
- **Viktig 2026-forbehold:** flere kilder melder at Bain i dokumenterte,
  pågående prosesser bruker **TestGorilla**. Rådet er å forberede seg på Sova
  *bare* hvis innkallingen nevner Sova. Behandle testnavnet som variabelt.

### 4.4 Klassiske numeriske resonnementstester (SHL / Kenexa / cut-e / Talent Q)

Brukes bredt av Big 4 og norske hus, ofte tidligere i trakten enn MBB-testene.

- **Format:** tabell eller diagram, 2–3 spørsmål per datasett, flervalg.
  Typisk **21 spørsmål på 30 min**, eller ~20 min for SHL/Talent Q numerisk.
  KPMG bruker SHL-levert kognitiv test på ca. 36 min (numerisk + logisk). `[K]`
  Deloitte bruker Kenexa/TalentLens-baserte numeriske og kritisk
  tenkning-tester. `[K]` cut-e og Kenexa brukes særlig til induktiv/logisk del.
- **Innhold:** tabeller, forholdstall, valuta, prosentendring, indeks,
  renters rente.
- **Kritisk innsikt for drillbygging:** *feilalternativene er ikke tilfeldige.*
  De er regnet ut fra de vanligste feilene — reversert prosent, prosentpoeng
  forvekslet med prosent, feil enhet, snitt av alle rader i stedet for de
  betingede. **Dette er gull for et «finn feilen»-drillformat**: distraktorene
  har pedagogisk innhold.
- **Strategi som anbefales:** les spørsmålet *først*, gå deretter til tabellen
  og hent nøyaktig de to–tre tallene du trenger. Ikke les tabellen først.

### 4.5 Norsk kontekst

- MBB-kontorene i Oslo kjører samme globale prosess. McKinsey Oslo:
  CV + søknad + karakterutskrift, svar innen to uker, intervjuene samlet på
  én dag — tre intervjuer i første runde, to partnerintervjuer i andre. `[D]`
  fra kontorets egen rekrutteringsprofil.
- Jeg fant **ingen dokumentasjon** på en egen norsk variant av evnetestene.
  Norske hus (BCG/McKinsey/Bain Oslo, samt Big 4 Norge) bruker de samme
  internasjonale testleverandørene. Alt annet ville vært spekulasjon.

---

## 5. Typiske fallgruver i regningen

Rangert etter hvor ofte kildene nevner dem.

1. **Å miste en tierpotens.** Nevnt som *den* vanligste feilen. Symptom: svaret
   er 1 000× for stort eller lite, men kandidaten regner videre uanfektet.
   Motgift: skriv M/mrd på hver linje; sjekk potensen separat før sifrene.
2. **Å droppe enheten.** «30 klasserom per elev» i stedet for «30 elever per
   klasserom» er et faktisk rapportert eksempel. Motgift: enhet etter *hvert*
   tall, også i mellomregninger.
3. **Å ikke si framgangsmåten høyt.** Dokumentert som scoringsforskjell:
   kandidater som snakket gjennom regningen scoret høyere på den kvantitative
   dimensjonen enn like nøyaktige kandidater som regnet stille. Stillhet over
   15–20 sekunder er selvskading — intervjueren kan ikke redde deg.
4. **Å regne videre på et feil tall uten sanity-sjekk.** Det er ikke feilen som
   feller kandidaten, men at hun ikke oppdager at 10 000 kr per nordmann per år
   på hundefôr er absurd. Kildene er entydige: å regne riktig men ikke fange
   urimelige svar signaliserer svak konsulentintuisjon.
5. **Å ikke runde av — eller runde feil vei.** For presis regning koster tid og
   gir flere feilmuligheter. Motsatt felle: runde begge faktorer samme vei, som
   dobler feilen i stedet for å nulle den ut. Og: å runde tidlig i en lang
   kjede der feilen forsterkes multiplikativt.
6. **Å ikke be om lov til å runde.** Gratis poeng som ofte glemmes.
7. **Å reversere en prosentendring feil.** `× 1,2` i stedet for `/ 0,8`.
8. **Prosent vs. prosentpoeng.**
9. **Å begynne å regne før oppgaven er avklart.** Steg 1 og 2 i åtte-stegs-
   metoden er «lytt» og «avklar spørsmålet» — ikke regn mens intervjueren snakker.
10. **Å levere et tall uten tolkning.** Svaret er ikke «45 millioner», det er
    «45 millioner, som er en tredjedel av dagens omsetning, så dette er
    materielt og bør forfølges».

---

## 6. Forslag til drillformater (minispill)

Seks formater. Hvert er beskrevet med mekanikk, hva det trener, og et par
konkrete eksempler klare til innholdsproduksjon.

### F1 — «Prosent på 10 sekunder»
**Mekanikk:** ett tall, én operasjon, nedtelling fra 10 sek, tastatur-input.
Serier på 20. Adaptiv: feil svar sender operasjonen tilbake i køen.
**Trener:** prosentankere, brøk↔prosent, reversering.
**Eksempler:**
- «18 % av 250» → 45
- «Hva er 3/8 i prosent?» → 37,5 %
- «Pris falt 20 % til 1 200 kr. Hva var opprinnelig pris?» → 1 500 kr
  (distraktor: 1 440)
- «Marginen gikk fra 8 % til 10 %. Hvor mange prosent økte den?» → 25 %
  (distraktor: 2 %)
- «56 % av 4 400 mrd» → ~2 460 mrd

### F2 — «Er svaret nærmest X, Y eller Z?»
**Mekanikk:** tre alternativer, ingen mellomregning tillatt, 8 sekunder.
Alternativene ligger **en tierpotens fra hverandre** i halvparten av
oppgavene (trener størrelsesorden) og **innenfor 20 %** i den andre halvparten
(trener avrundingspresisjon).
**Trener:** størrelsesordensjekk — den viktigste enkeltferdigheten.
**Eksempler:**
- «2,9 mill. personbiler, snittlevetid 17 år. Nybilsalg per år?»
  A) 17 000 B) 170 000 C) 1,7 mill. → **B**
- «Norsk dagligvaremarked per husholdning per år?»
  A) 8 700 kr B) 87 000 kr C) 870 000 kr → **B**
- «Lønnssum i Norge (2,9 mill. sysselsatte × 62 000 kr/mnd)?»
  A) 180 mrd B) 2 200 mrd C) 22 000 mrd → **B**
- «96 × 1 300 000» A) 12,5 mill. B) 125 mill. C) 1,25 mrd → **B**

### F3 — «Finn feilen i utregningen»
**Mekanikk:** vis en ferdig utregning i 4–6 linjer med enheter. Kandidaten
trykker på **linjen der feilen oppstår** og velger feiltype fra en fast liste:
*tierpotens · enhet · reversert prosent · prosentpoeng · feil formel · ingen feil*.
20 % av oppgavene skal være **uten feil** (ellers lærer man å alltid finne én).
**Trener:** feiltypegjenkjenning — direkte overførbart til å fange egne feil.
**Eksempel A (tierpotens):**
```
1  Marked:        230 mrd kr
2  Andel:         24 %
3  Omsetning:     230 × 0,24 = 55,2 mrd kr
4  Dekningsgrad:  4 %
5  Dekningsbidrag: 55,2 × 0,04 = 22,1 mrd kr        ← feil
```
Fasit: linje 5, tierpotens/regnefeil. Riktig: 2,21 mrd kr.

**Eksempel B (reversert prosent):**
```
1  Omsetning i år: 1 200 mill. kr
2  Ned 20 % fra i fjor
3  I fjor: 1 200 × 1,2 = 1 440 mill. kr             ← feil
```
Fasit: linje 3, reversert prosent. Riktig: `1 200 / 0,8 = 1 500 mill. kr`.

**Eksempel C (enhet):**
```
1  Elever:      600 000
2  Klasserom:    20 000
3  Forholdstall: 600 000 / 20 000 = 30
4  Altså 30 klasserom per elev                       ← feil
```
Fasit: linje 4, enhet snudd.

**Eksempel D (prosentpoeng):**
```
1  Margin 2024:  8 %
2  Margin 2025: 10 %
3  Marginen steg med 2 %                             ← feil
```
Fasit: linje 3 — 2 *prosentpoeng*, tilsvarende 25 % vekst.

### F4 — «Les grafen»
**Mekanikk:** SVG-diagram + ett spørsmål + 30 sekunder. Tre undertyper:
(a) **avlesning** — hent riktig tall, (b) **felle** — spørsmålet er utformet så
en av fellene i 3.3 utløses, (c) **innsikt** — «hva er hovedbudskapet?» med
fire påstander der én er sann, to er sanne-men-trivielle og én er den
klassiske feiltolkningen.
**Trener:** akse- og enhetsdisiplin, miksforståelse, indeks vs. absolutt.
**Eksempler:**
- *Stablet søyle, 2 år.* Total 100 000 kunder begge år. Nye: 25 % → 50 %.
  Lojale: 30 % → 20 %. Spørsmål: «Hva er hovedbudskapet?»
  Alternativer: A) «Selskapet er stabilt» (fellen) B) «Nye kunder doblet seg»
  (sant, trivielt) C) «Selskapet lekker lojale kunder like fort som det
  skaffer nye — flat total skjuler en churn-krise» (riktig) D) «Markedet
  krymper» (ikke støttet).
- *Aksekutt.* Søylediagram med y-akse fra 90 til 100. Verdier 94 og 98.
  Spørsmål: «Hvor mye vokste omsetningen?» → 4,3 %, ikke «den doblet seg».
- *Indeksert tidsserie.* Segment A: indeks 100 → 130. Segment B: 100 → 110.
  Fotnote: A hadde 200 mill. i basisår, B hadde 3 mrd.
  Spørsmål: «Hvilket segment bidro mest til vekst i kroner?»
  → B (+300 mill. mot A sine +60 mill.).
- *Vannfall.* Omsetning 2024: 800 mill. → volum −120 → pris +90 → miks +30
  → 2025: 800 mill. Spørsmål: «Hva er historien?» → «Flat topplinje, men
  volumet raser og prisøkning maskerer det — sannsynligvis ikke bærekraftig.»
- *Mekko.* Fire segmenter, bredde = markedsstørrelse, høyde = vår andel.
  Spørsmål: «Hvor har vi mest omsetning?» → areal, ikke bredeste eller høyeste.

### F5 — «Bygg estimatet»
**Mekanikk:** market sizing brutt i steg. Kandidaten velger tilnærming
(topp-ned/bunn-opp), så segmenteringsakse, så settes forutsetningene ett og ett
med glidebryter eller innskriving. Appen regner løpende og viser svaret med
størrelsesorden. Til slutt: **sanity-sjekk-steget** — «per innbygger blir dette
X kr/år. Er det rimelig?» med tre alternativer.
**Trener:** struktur, forutsetningsvalg, og at estimeringen har et *sluttsteg*.
**Eksempler (norske, med fasitspenn):**
- «Hvor mange kopper kaffe drikkes på norske kafeer per år?»
  (5,6 mill × ~40 % kafégjengere × ~1,5 kopp/uke × 52 ≈ 175 mill. kopper)
- «Hvor stort er markedet for barnehageplasser i Norge?»
  (barn 1–5 år ≈ 276 000 × ~93 % dekning × ~250 000 kr/år total kostnad
  ≈ 64 mrd kr)
- «Hvor mange ladepunkter trenger Norge?» (0,95 mill. elbiler, kjørelengde,
  ladefrekvens, kapasitet per punkt)
- «Årlig marked for oppvaskmaskiner i Norge?» (2,65 mill. husholdninger ×
  ~75 % dekning × 1/12 års levetid ≈ 165 000 enheter × ~7 000 kr ≈ 1,2 mrd)
- «Hvor mye brukes på hundefôr i Norge?» (~600 000 hunder × ~5 000 kr/år
  ≈ 3 mrd) — med innebygd sanity-sjekk mot dagligvaremarkedet.

### F6 — «Si det høyt»
**Mekanikk:** oppgaven vises, kandidaten får 45 sekunder og skal trykke seg
gjennom en **rekkefølge av kommunikasjonssteg** i riktig orden (formel → be om
avrunding → regn → enhet → sanity-sjekk → tolkning), eventuelt med lydopptak
og selvevaluering mot en sjekkliste.
**Trener:** det eneste som skiller en riktig utregning fra en god
caseprestasjon. Dette er ferdigheten ingen app trener, og den er scorebærende.
**Sjekkliste som fasit:**
1. Gjentok jeg spørsmålet? 2. Sa jeg formelen før tallene? 3. Ba jeg om lov
til å runde? 4. Var jeg stille i mer enn 20 sek? 5. Sa jeg enheten?
6. Sanity-sjekket jeg høyt? 7. Tolket jeg tallet forretningsmessig?

### Tilleggsformater verdt å vurdere
- **F7 «Tierpotens-sprint»:** kun `10^n`-delen av regnestykker. «1,4 mrd ×
  350 kr — hvilken potens?» 5 sekunder. Rå, men treffer fallgruve nr. 1 direkte.
- **F8 «Brøkflash»:** rene oppslagskort 1/2–1/15 begge veier. Bygges som
  eksisterende drillmotor uten ny mekanikk.
- **F9 «Filtrer datasettet»:** vis 8 datakilder + ett forskningsmål, velg de
  3 relevante. Direkte imitasjon av både Redrock-investigation og Caseys
  første spørsmål — og en ferdighet ingen andre drillformater treffer.
- **F10 «72-regelen begge veier»:** «doblet på 9 år ⇒ CAGR?» / «11 % vekst ⇒
  doblingstid?» 8 sekunder.

---

## Kilder

Hoderegning og formler:
- https://www.preplounge.com/en/case-interview-basics/fast-math
- https://www.roadtooffer.com/blog/mental-math-case-interviews
- https://www.roadtooffer.com/blog/consulting-math-formulas
- https://strategycase.com/case-interview-math-the-ultimate-guide/
- https://mconsultingprep.com/mental-math-in-consulting-case-interview
- https://firmsconsulting.com/quarterly/case-interview-math/
- https://managementconsulted.com/case-interview-math-calculations/

Estimering / market sizing:
- https://casemathpractice.com/blog/market-sizing-cheat-sheet
- https://casecoach.com/b/market-sizing-case-interview/
- https://www.myconsultingoffer.org/case-study-interview-prep/market-sizing/
- https://www.roadtooffer.com/blog/market-sizing-framework
- https://www.casebasix.com/pages/sanity-checks-case-interviews
- https://www.impactinterview.com/2017/01/market-sizing-numbers-to-know/

Norske tall (SSB m.fl.):
- https://www.ssb.no/befolkning/folketall/statistikk/befolkning
- https://www.ssb.no/befolkning/faktaside/befolkningen
- https://www.ssb.no/arbeid-og-lonn/sysselsetting/statistikk/arbeidskraftundersokelsen
- https://www.ssb.no/arbeid-og-lonn/lonn-og-arbeidskraftkostnader/artikler/hva-er-vanlig-lonn-i-norge
- https://www.ssb.no/nasjonalregnskap-og-konjunkturer/nasjonalregnskap/statistikk/nasjonalregnskap
- https://www.ssb.no/transport-og-reiseliv/landtransport/statistikk/bilparken
- https://www.ssb.no/virksomheter-foretak-og-regnskap/virksomheter-og-foretak/statistikk/virksomheter
- https://www.ssb.no/inntekt-og-forbruk/inntekt-og-formue/statistikk/inntekts-og-formuesstatistikk-for-husholdninger
- https://www.ssb.no/inntekt-og-forbruk/forbruk/statistikk/forbruksundersokelsen
- https://www.ssb.no/befolkning/folketall/artikler/de-storste-byene-og-tettstedene-i-norge
- https://konkurransetilsynet.no/wp-content/uploads/2026/04/Dagligvarerapport-2025.pdf

Exhibit / diagram:
- https://mconsultingprep.com/six-types-of-chart-in-case-interview
- https://www.preplounge.com/en/case-interview-basics/charts-and-data-reading
- https://strategycase.com/how-to-interpret-charts-and-data-in-case-interviews/
- https://www.sciencedirect.com/science/article/abs/pii/S2211368120300978 (aksekutt-forskning)
- https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0265823
- https://umbrex.com/resources/frameworks/strategy-frameworks/value-bridge/

Digitale tester:
- https://strategycase.com/mckinsey-solve-game-red-rock-study/
- https://strategycase.com/mckinsey-solve-ocean-cleanup/
- https://www.myconsultingcoach.com/mckinsey-problem-solving-game
- https://www.casebasix.com/pages/mckinsey-psg-scoring-explained
- https://mconsultingprep.com/mckinsey-problem-solving-game-digital-assessment
- https://www.myconsultingcoach.com/casey
- https://www.roadtooffer.com/blog/bcg-online-case-casey-guide
- https://managementconsulted.com/bcg-online-case/
- https://www.roadtooffer.com/blog/bain-sova-test-guide
- https://managementconsulted.com/bain-sova-test/
- https://www.graduatesfirst.com/employer-tests
- https://www.graduatesfirst.com/deloitte-aptitude-tests
- https://jobcannon.io/blog/numerical-reasoning-test-tips
- https://www.assessmentday.co.uk/shl-numerical-reasoning-test.htm
- https://karrierestart.no/karriereprofiler/rekruttereren/1952-hvordan-fa-jobb-hos-mckinsey-company-oslo

Fallgruver:
- http://workingwithmckinsey.blogspot.com/2012/12/McKinsey-case-interviews-6-common-math-mistakes.html
- https://www.casebasix.com/pages/case-interview-math-tips
