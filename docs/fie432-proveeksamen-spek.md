# FIE432: prøveeksamener i 2026-formatet

Tre hele prøveeksamener som trener eksamen høsten 2026 så tett som mulig. De vises i
Eksamenssett under «Prøveeksamener» (`kind: "mock"`) og kjøres av samme motor som de
ekte settene (`js/bundle-sett.js`).

## Formatet (fast for alle tre)

- 4 timer (`minutes: 240`), skoleeksamen, kalkulator.
- **30 flervalgsledd, fire alternativer hver, nøyaktig ett riktig.**
- **3 poeng for rett, −1 for feil, 0 ubesvart.** I data: hvert ledd `points: 3`, settet
  `"mc": { "wrongFactor": -0.3333333333333333 }`. Totalt 90 poeng.
- Ledd grupperes i oppgaver med felles innledning, slik H2024 og H2025 gjør (en oppgave
  kan ha 1–4 ledd). Omtrent 15–18 oppgaver per eksamen.
- Skattedelen (Schjelderup, forelesning 1–11) er omtrent to tredeler av leddene, finansdelen
  (Næss, forelesning 12–16) omtrent en tredel. Det følger 2026-planen og H2025 (59/41).

## Kildene du skal bygge på

Les disse før du skriver. Ikke finn på stoff som ikke står i dem.

1. `docs/fie432-research/01-eksamens-dna.md`: § 1 (alle 227 spørsmål registrert), § 2b
   (flervalgsæraen), § 3 (formatet og minuspoengene), § 4 (de 20 faste regnerutinene R1–R20
   med fellene), § 5 (hva sensor belønner), § 7 (fasitfeil).
2. `fag/fie432/sett.js`: settene `h2025`, `h2024`, `h2022` og `mc2026` viser ordlyden,
   lengden og hvordan alternativene er bygd. De eldre settene (`h2016`–`h2021`) er åpne
   oppgaver som lærerne gjenbruker: kursgodkjenningen 2026 tok tre spørsmål nesten ordrett
   fra H2019 og H2022.
3. `FIE432_Manual.html` (eller fragmentene `fag/fie432/_fragmenter/kN.html`): fasiten for
   regler, begreper og fakta. Hvert faktaspørsmål skal kunne besvares fra manualen.
4. `docs/fie432-research/05-satser-2026.md`: satsene for 2026.

## Hva «drar fra tidligere eksamener» betyr her

- Bruk **samme regnerutiner og samme feller** som de ekte spørsmålene, med **nye tall, nye
  navn og nye vrier**. Et spørsmål skal kjennes igjen som «typen» fra et bestemt sett, men
  ikke kunne løses ved å huske svaret.
- **Ikke kopier** noe spørsmål fra `h2022`, `h2024`, `h2025` eller `mc2026` med samme tall.
  Begrepsspørsmål kan stille samme prinsipp med ny ordlyd.
- Spørsmål fra de åpne settene (H2016–H2021) kan gjøres om til flervalg. Det er nettopp
  slik lærerne har laget nye flervalg.
- Skriv i lærernes stil: korte scenarioer med navn («Kari eier …»), «Anta at …», alle
  satser oppgitt i teksten, og presis beskjed om avrunding («Svar med to desimaler»,
  «Du kan se bort fra bunnfradrag»).

## Satsene (oppgi dem alltid i oppgaveteksten)

Bruk 2026-regler når oppgaven er satt i dag: alminnelig skatt og selskapsskatt 22 %,
oppjusteringsfaktor 1,72 (effektiv eierskatt 37,84 %), formuesskatt 1,0 % (1,1 % over
21,5 mill.), bunnfradrag 1 900 000 (eller «se bort fra bunnfradrag»), aksjer og aksjefond
80 % av markedsverdi, primærbolig 25 % opp til 14 mill. og 70 % over, sekundærbolig 100 %,
bankinnskudd 100 %. Gjeldsreduksjon gjelder bare aksjer, aksjefond, næringseiendom og
driftsmidler, ikke bolig (kapittel 7). Skjermingsrenten for 2026 er ikke kjent: oppgi en
rente i teksten. Det er lov å bruke enkle tall i stedet for de virkelige (som lærerne gjør,
for eksempel eierskatt 40 % eller formuesskatt 1 %), men da skal teksten si det.

## Alternativene

- **Nøyaktig fire, nøyaktig ett riktig** under forutsetningene i teksten. Hvis to svar kan
  forsvares, skriv om spørsmålet. Unntaket «alle de tre over» er lov når det er entydig.
- **Hvert gale alternativ er en navngitt feil**: glemt skjerming, glemt at ubenyttet
  skjerming legges til grunnlaget, glemt oppjustering, dobbel oppjustering, brutto i stedet
  for netto, feil nevner, fortegn i incidensformelen, konsument- mot produsentpris, gjeld
  fordelt uten rabatt, kostnaden i stedet for kostnaden forrentet, og så videre (§ 4 i
  eksamens-DNA har fellene per rutine). Rent støy skal være unntaket, og løsningen sier fra.
- **Fasitposisjonen er bestemt på forhånd** i `fag/fie432/_prove/fasitplan.json` (indeks 0–3
  per ledd, i rekkefølgen leddene står i settet). Følg den. Bytt rekkefølge på alternativene
  for å få riktig svar på plassen planen sier.
- **Ingen lekkasje**: det riktige alternativet skal ikke være det lengste oftere enn de
  andre, ikke alltid det midterste tallet, og ikke det eneste med en presisering. Talls
  alternativer trenger ikke stå sortert.
- Tall skrives med mellomrom som tusenskille og desimalkomma («kr 1 250 000», «37,84 %»).

## Løsningene

Hver ledd har `solution` i stilen fra `h2022` og `h2025` i `sett.js`:

```
<p><b>Regelen.</b> …</p>
<p><b>Regnestykket.</b></p><p>1. …<br>2. …<br>3. … = <b>svaret</b>.</p>
<p><b>Hvorfor de andre er gale.</b></p><p><b>Alternativ</b> = hvilken feil …<br>…</p>
<p><b>Kontroll.</b> En uavhengig vei til samme svar.</p>
```

For begrepsspørsmål: kort begrunnelse, så hvorfor hvert galt alternativ er galt.
Legg til `<p><b>Strategi med minuspoeng.</b> …</p>` der det hjelper: hvilket alternativ
som kan strykes først, slik at du vet når det lønner seg å svare.

## Dataformatet

Én fil per eksamen: `fag/fie432/_prove/<id>.json`, ett JSON-objekt:

```
{
  "id": "prove1", "kind": "mock", "label": "Prøveeksamen 1",
  "minutes": 240, "points": 90,
  "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
  "note": "<kort: hva eksamenen ligner mest, og hva den vektlegger>",
  "facts": ["…", "…", "…"],
  "practiceNote": "…",
  "mc": { "wrongFactor": -0.3333333333333333 },
  "exercises": [
    { "n": 1, "title": "<beskrivende norsk tittel>", "points": 6, "topic": "Skjerming",
      "chapters": [5], "body": "<p>felles tekst</p>",
      "parts": [
        { "label": "a", "points": 3, "body": "<p>spørsmålet</p>",
          "options": ["…", "…", "…", "…"], "answer": 2, "solution": "<p>…</p>" },
        …
      ] },
    { "n": 2, "title": "…", "points": 3, "topic": "…", "chapters": [7],
      "body": "<p>hele spørsmålet</p>", "options": ["…","…","…","…"], "answer": 0,
      "solution": "<p>…</p>" }
  ]
}
```

- id-ene `prove1`, `prove2`, `prove3` er lagringsnøkler og endres aldri.
- `chapters` er manualens kapittelnumre (1–19).
- `topic` bruker samme navn som de ekte settene: Aksjonærmodellen, Skjerming, Effektiv
  skattesats, Formuesskatt, Formuesskatt som avkastningsskatt, Skatteincidens, Bedriftens
  tilpasning, Progressivitet, Skatt og risiko, Implisitt skatt, Internasjonal skatt,
  Exit-skatt, Skatteparadis, Investeringscaser, Fritaksmetoden, Porteføljevalg, Forsikring
  og forventet nytte, Pensjon, Lån, Sparing, Finansiell psykologi, Indeksfond og aktiv
  forvaltning.
- Ingen `criteria` (det er bare for åpne oppgaver).
- HTML: `p`, `b`, `i`, `br`, `sub`, `sup`, `ul`/`ol`/`li`, `table class="data"` med
  `td class="n"` for tall.

## Skriveregler

Bokmål. Ingen tankestrek (—): bruk kolon, punktum eller «·». Ingen komma foran «og».
Minustegn i tall er «−». Kort og presist, som en eksamensoppgave.

## Kontroll før levering

1. Regn **hvert** tall i spørsmål, riktig svar og gale alternativer i Python
   (`python3 -I`), med et skript i skrapemappen. Ingen tall fra hukommelsen.
2. Gyldig JSON, ingen «—», ingen «, og».
3. Fasitposisjonene følger planen.
4. Strukturkontroll:
   ```
   node -e 'const f=require("fs");f.writeFileSync(process.argv[2],"window.EDU_DATA={};window.EDU_DATA.sets=["+f.readFileSync(process.argv[1],"utf8")+"];")' fag/fie432/_prove/<id>.json <skrapemappe>/sjekk-<id>.js
   node tools/sjekk-sett.js <skrapemappe>/sjekk-<id>.js
   ```
   Ingen feil.

## Fordelingen på de tre eksamenene

Kjernetemaene kommer i alle tre: skjerming og oppjustering, formuesskatt (gjeldsfordeling og
avkastningsskatt), stykkskatt-incidens, Merton med humankapital og forventet nytte med
forsikring. Resten fordeles slik at de tre til sammen dekker hele pensum. Antall ledd i
parentes. Summen er 30 per eksamen.

### Prøveeksamen 1: «ligner H2025» (skatt 20, finans 10)

Skatt:
1. Skjerming over flere år med ubenyttet skjerming framført og lagt til grunnlaget, utbytte
   hvert år (2). R1. Jf. H2024 1, H2025 4, mc2026 1.
2. Salg av aksje med ubenyttet skjerming, skatt på gevinsten med oppjustering (1). R2. Jf. H2024 2, H2025 10.
3. Effektiv skattesats: selskapsskatt pluss eierskatt samlet på overskudd tatt ut som
   utbytte, og avskrivning som senker effektiv sats (2). R3. Jf. H2022 1.4–1.5, H2025 5.
4. Formuesskatt med primærbolig, aksjefond og bankinnskudd, gjeld fordelt forholdsmessig
   med rabatt bare for aksjedelen (2). R4. Jf. H2024 6, H2025 2. Si eksplisitt om gjeldsreduksjon skal brukes.
5. Formuesskatt som avkastningsskatt: avkastning før og etter formuesskatt, hvilken
   inntektsskatt som gir samme proveny, verdsetting av evig kontantstrøm med formuesskatt (3). R6. Jf. H2025 3 og 9.
6. Utbytte som må tas ut for å dekke formuesskatt pluss eierskatt (1). R5. Jf. H2024 7, H2025 6.
7. Stykkskatt-incidens: et talleksempel med lineære kurver (konsumentpris, produsentpris,
   andel av skatten) (2) og ett grensetilfelle (1). R9. Jf. H2025 8, H2018, H2021 2.
8. Bedriftens tilpasning: førsteordensbetingelsen med fullt eller delvis rentefradrag,
   gjeld mot egenkapital (2). R11. Jf. H2025 7, H2020 3.
9. Skatt og risiko (Domar–Musgrave): risikotaking med og uten fullt tapsfradrag (1). Jf. mc2026 7, kapittel 12.
10. Investeringscase: skattefri utleie av egen bolig eller fritaksmetoden med
    treprosentregelen (2). Jf. mc2026 5–6, kapittel 4 og 6.
11. Skatteparadiser: hemmelighold, kjennetegn eller tiltak (1). Kapittel 13.

Finans:
12. Merton med humankapital: aksjeandel uten humankapital, med risikofri humankapital og
    med humankapital korrelert med børsen (3). R14. Jf. H2022 7, H2025 11.
13. Forventet nytte med √W: kjøpe forsikring eller ikke, maksimal premie, delvis dekning (3). R13. Jf. H2024 11, H2025 13.
14. Folketrygden: delingstall og utsatt uttak, eller kompensasjonsgrad (1). R19. Jf. H2025 14, mc2026 19.
15. Indeksfond mot aktive fond, eller kapitalmarkedslinjen (1). Jf. H2025 15–16.
16. Finansiell psykologi: én navngitt skjevhet (1). Kapittel 18. Jf. mc2026 16, 18.
17. Lån: annuitet, rentesum eller når avdragsfrihet er fornuftig (1). R16–R17. Jf. H2022 6, H2024 14.

### Prøveeksamen 2: «ligner H2024», med skatterett-blokk (skatt 21, finans 9)

Skatt:
1. Skjerming for én aksje over tre år: fradrag, skattepliktig utbytte, ubenyttet skjerming
   og året etter (3). R1. Jf. H2024 1 (nye tall og en ny vri, for eksempel salg i år 3).
2. Progressivitet: flat skatt med og uten bunnfradrag, hvilket system som er progressivt (2). R7. Jf. H2024 4, mc2026 8.
3. Gjennomsnittsskatt i et trinnsystem (1). R7. Jf. H2024 5.
4. Formuesskatt: nettoformue med sekundærbolig (100 %), primærbolig over 14 mill.-terskelen
   og aksjer, med gjeldsreduksjon (2). R4. Jf. H2024 6, H2019 2.
5. Utbytte for å betale formuesskatten (1). R5.
6. Stykkskatt-incidens som formelgjenkjenning (∂p/∂t, ∂P/∂t, grensetilfeller) (3). R9. Jf. H2024 8. Bruk ny notasjon eller nytt grensetilfelle.
7. Implisitt skatt: rangering og formelen (R − r)/R, eller valgregelen marginalskatt mot
   implisitt sats (2). R10. Jf. H2024 9, H2019 4.
8. Tidsverdien av et fradrag: avskrive alt nå eller over flere år (1). R8. Jf. H2024 3.
9. Internasjonal skatt og exit-skatt i én case med fire land: globalskatteplikt etter intern
   rett, unntaksmetoden, kreditmetoden med tak, ingen avtale, og ett exit-spørsmål med 2026-
   reglene (bunnfradrag 3 mill., tolv rentefrie rater, gave til utlandet over 100 000) (6).
   R12. Jf. H2024 10, H2022 4, H2021 4. Nye land, nye satser, minst ett land der kildesatsen er
   høyere enn den norske.

Finans:
10. Forventet nytte: aktuarisk rettferdig pris, full dekning, maksimal premie (2). R13.
11. Portefølje: diversifisering, korrelasjon, valutasikring eller indeksfond (2). Jf. H2024 12, mc2026 13.
12. Pensjon: innskudd mot ytelse og IPS (2). Jf. H2024 13, H2025 17.
13. Merton uten humankapital (1). R14. Jf. mc2026 12.
14. Lån: avdragsfrihet eller utlånsforskriften (gjeldsgrad 5 × inntekt, stresstest) (1). R18. Jf. H2024 14.
15. Finansiell psykologi (1).

### Prøveeksamen 3: «ligner H2022 og de åpne settene gjort om til flervalg» (skatt 19, finans 11)

Skatt:
1. Lugano-typen: et aksjeselskap med overskudd, selskapsskatt, skjermingsfradrag, gevinst
   ved salg med oppjustering og samlet effektiv sats (4). R1–R3. Jf. H2022 1.
2. Inntektsskiftingslikningen: oppjusteringsfaktoren som gjør marginalskatt på lønn lik
   selskapsskatt pluss eierskatt (1). R3. Jf. mc2026 2, H2020 1c. Bruk den nominelle formen fra 2026.
3. Formuesskatt: verdsetting av ulike formuesobjekter og nettoformue (2). R4. Jf. H2016 2, H2017 1, H2019 2.
4. Formuesskatt som avkastningsskatt med likviditetsproblem: hvor mye av avkastningen
   formuesskatten tar, og utbytte for å betale den (2). R5–R6. Jf. H2021 3.
5. Stykkskatt i et monopol eller med elastisiteter oppgitt som tall (2) og et begrepsspørsmål
   om hvem som bærer skatten (1). R9. Jf. H2021 2, H2022 3, H2016 1.
6. Skattearbitrasje eller nøytralitet: lånefinansiert kjøp av skattefritt papir (1). Kapittel 9.
7. Bosted og exit-skatt: når er man utflyttet, hva utløser exit-skatt (2). Jf. H2022 4, mc2026 4 og 9.
8. Skatteparadiser eller BEPS/minimumsskatt (1). Kapittel 13.
9. Skatt og risiko: repliseringen x/(1 − t) med fullt tapsfradrag (1). Kapittel 12.
10. Fritaksmetoden: holdingselskap mot personlig eie, treprosentregelen (2). Kapittel 6.

Finans:
11. Sparing under usikkerhet: ln-nytte av sluttverdier, subjektive sannsynligheter og
    tapsaversjon (3). R15. Jf. H2022 5, H2019 9.
12. Annuitetslån: terminbeløp og effektiv rente med gebyr (2). R17. Jf. H2022 6, H2016 3.
13. Folketrygden: opptjening og kompensasjonsgrad (1). R19. Jf. mc2026 19, H2016 4.
14. Merton med humankapital som endrer seg over livet (2). R14. Jf. H2022 7, mc2026 17.
15. Forsikring: moralsk hasard, ugunstig utvalg, egenandel (1). Jf. mc2026 15, kapittel 17.
16. Finansiell psykologi (1). Kapittel 18. Ikke samme skjevhet som i eksamen 1 og 2.
17. Utlånsforskriften: maksimalt lån med gjeldsgrad og stresstest (1). R18. Jf. H2020 4, H2021 5.

## Etterkontrollen

Når de tre er skrevet, går hver eksamen gjennom en uavhengig kontroll: en regnekontrollør
som regner hvert ledd på nytt uten å se løsningen først, og en fagkontroll av at hvert
riktig svar er entydig riktig etter manualen og at ingen gale alternativer også kan
forsvares. Funn rettes før settene flettes inn i `fag/fie432/sett.js`.

## Kalibrering mot skoleeksamen (gjelder alle prøveeksamenene fra 29. oktober 2026)

Eksamen i 2026 er en **skoleeksamen** med kalkulator. H2022 var en hjemmeeksamen med alle
hjelpemidler, og oppgavene var derfor lengre og tyngre. Prøveeksamenene skal ligne
skoleeksamenene (H2023, H2024, H2025) og kursgodkjenningen 2026 (`mc2026`), som er laget av
årets forelesere. H2022 og de åpne settene kan levere **temaer**, ikke oppgavetype eller
vanskelighetsgrad.

Målt med `node tools/sjekk-prove.js fie432`:

| | Ord per ledd | Ledd med tallsvar |
|---|---|---|
| Skoleeksamenene H2023–H2025 (snitt) | 44 | 51 % |
| Kursgodkjenningen 2026 | 34 | 20 % |
| H2022 (hjemmeeksamen) | 68 | 61 % |
| **Mål for en prøveeksamen** | **35–48** | **35–55 %** |

Regler:
- **Regneledd:** høyst tre regnetrinn med vanlig kalkulator, og tall som går greit opp. Ingen
  iterasjon (effektiv rente som internrente, løse for n), ingen tabeller over fem rader, ingen
  kjeder der fire ledd bygger på hverandre.
- **Begrepsledd i stilen fra kursgodkjenningen 2026:** «Hvilket utsagn er riktig?», «Hvilken
  av påstandene kan være korrekt?», «Alle de tre påstandene over» som alternativ når det er
  entydig, definisjonsspørsmål (fritaksmetoden, hvem som får skjermingsfradraget, skattefri
  utleie av egen bolig, når man er norsk skattyter) og konsekvensspørsmål (hva delvis
  tapsfradrag gjør med risikotakingen). Les ordene «kan», «alltid», «alle» presist.
- **Ikke gjenta** spørsmål fra noen av de ekte settene eller fra de andre prøveeksamenene med
  samme tall eller samme scenario. Les dem i `fag/fie432/sett.js` før du skriver.

### Prøveeksamen 3, omskrevet: «temaer fra H2022 og de åpne settene, i skoleeksamensformat»

Samme temaer og samme fasitposisjoner, men kortere tekster og omtrent halvparten begrepsledd.
Effektiv rente med gebyrer (internrente) erstattes. Notatet skal ikke si at eksamenen «ligner
H2022».

### Prøveeksamen 4: «ligner H2023 og kursgodkjenningen 2026» (skatt 21, finans 9)

Skatt:
1. Skjerming i en tabell over fire til fem år: skattepliktig utbytte et år, akkumulert
   ubenyttet skjerming, og gevinstskatt ved salg (3). Jf. H2023 1, mc2026 1.
2. Oppjusteringsfaktoren som gir en bestemt effektiv sats, og samlet effektiv sats for selskap og
   eier (2). Jf. H2023 2, mc2026 3.
3. Formuesskatt med gjeldsfordeling der rabatten avgjør (1). Jf. H2023 3.
4. Formuesskatt utløst av et selskap: skatten, utbyttet som dekker den med eierskatt, og hvilken
   selskapsskatt som gir samme proveny (2). Jf. H2023 4.
5. Skjerming på aksjer i et utenlandsk selskap (1). Jf. H2023 5.
6. Nominell avkastning og realavkastning på en eiendom (1). Jf. H2023 6.
7. Stykkskatt: uttrykket for konsumentprisen og et grensetilfelle (2). Jf. H2023 7.
8. Begrepsledd i kursgodkjenningsstil, ny ordlyd (6): fritaksmetoden, hvem som får
   skjermingsfradraget, skattefri utleie av egen bolig, når man er skattemessig utflyttet,
   progressivitet (hvilket system gir lik gjennomsnittsskatt), og delvis tapsfradrag og
   risikotaking. Jf. mc2026 4–10.
9. Inntektsskiftingslikningen (1). Jf. mc2026 2.
10. Skatteparadiser (1). Kapittel 13.
10b. Exit-skatt med 2026-reglene, for eksempel gave til noen i utlandet (1). Kapittel 6 § 6.6.

Finans:
11. Kapitalmarkedslinjen eller separasjonsteoremet (1). Jf. H2023 8 og 14.
12. Humankapital og aksjeandel uten tall (1). Jf. H2023 9, mc2026 17.
13. Pensjon: levetidsrisiko eller delingstall (1). Jf. H2023 10.
14. Forsikring: når det lønner seg, og hva som kan diversifiseres (2). Jf. H2023 11–12.
15. To aksjer: minimum varians og risikonøytral investor (2). Jf. H2023 13.
16. Forventet nytte: valg mellom kontrakter med samme forventning (1). Jf. mc2026 11.
17. Finansiell psykologi (1). Jf. mc2026 16 og 18, men en annen skjevhet enn prøveeksamen 1–3.

### Prøveeksamen 5: «ligner H2024 og kursgodkjenningen 2026» (skatt 20, finans 10)

Skatt:
1. Skjerming for én aksje over tre år (3). Jf. H2024 1.
2. Gevinst med ubenyttet skjerming (1). Jf. H2024 2.
3. Tidsverdien av et fradrag (1). Jf. H2024 3.
4. Progressivitet med og uten bunnfradrag (2). Jf. H2024 4, mc2026 8.
5. Gjennomsnittsskatt i et trinnsystem (1). Jf. H2024 5.
6. Formuesskatt med gjeldsreduksjon (2). Jf. H2024 6.
7. Utbytte for å betale formuesskatten (1). Jf. H2024 7.
8. Stykkskatt: formelgjenkjenning (2). Jf. H2024 8.
9. Implisitt skatt (2). Jf. H2024 9.
10. Internasjonal skatt, kort blokk: globalskatteplikt, én metode og bosted (3). Jf. H2024 10,
    mc2026 4 og 9.
11. Begrepsledd i kursgodkjenningsstil (2): fritaksmetoden og holdingselskap, hvem som får
    skjermingsfradraget. Ny ordlyd.

Finans:
12. Forventet nytte: aktuarisk premie og maksimal premie (2). Jf. H2024 11.
13. Påstander om porteføljer: «kan være korrekt» (1). Jf. mc2026 13.
14. Indeksfond eller valutasikring (1). Jf. H2024 12.
15. Aktive mot passive fond (1). Jf. mc2026 14.
16. Innskudd mot ytelse og IPS (2). Jf. H2024 13.
17. Avdragsfrihet (1). Jf. H2024 14.
18. Egenandel, moralsk hasard og ugunstig utvalg (1). Jf. mc2026 15.
19. Folketrygden i prosent av sluttlønn (1). Jf. mc2026 19.

### Prøveeksamen 6: «ligner H2025 og kursgodkjenningen 2026» (skatt 19, finans 11)

Skatt:
1. Utbytte etter eierskatt og formuesskatt over to år (1). Jf. H2025 1.
2. Gjeldsfordeling med primærbolig og aksjefond (1). Jf. H2025 2.
3. Formuesskatt som avkastningsskatt: avkastning før og etter, og hvilken kapitalinntektsskatt
   som gir samme proveny (3). Jf. H2025 3 og 9.
4. Ubenyttet skjerming (1). Jf. H2025 4.
5. Effektiv sats med avskrivning (1). Jf. H2025 5.
6. Utbytte for å betale formuesskatten (1). Jf. H2025 6.
7. Bedriftens tilpasning: førsteordensbetingelsen og gjeld mot egenkapital (2). Jf. H2025 7.
8. Stykkskatt med tall og grensetilfeller (3). Jf. H2025 8.
9. Gevinst med oppjustering (1). Jf. H2025 10.
10. Begrepsledd i kursgodkjenningsstil (5): skattefri utleie, utflytting, delvis tapsfradrag,
    inntektsskifting, skatteparadiser. Ny ordlyd.

Finans:
11. Merton: risikoaversjon fra aksjeandelen, og humankapital (3). Jf. H2025 11, mc2026 12 og 17.
12. Hvilke forsikringer som er lovpålagt, eller annen forsikringsfakta fra manualen (1). Jf. H2025 12.
13. Forventet nytte med √W (2). Jf. H2025 13.
14. Delingstall og utsatt uttak (1). Jf. H2025 14.
15. Kapitalmarkedslinjen og giring (1). Jf. H2025 15.
16. Indeksfond mot aktive fond, Forbrukerrådet (1). Jf. H2025 16.
17. Innskuddspensjon (1). Jf. H2025 17.
18. Home bias eller annen skjevhet (1). Jf. mc2026 18.

## Prøveeksamen 7, 8 og 9 (4. november 2026): pensum som 1–6 ikke har testet

Bestilt av Magnus 4. november 2026: tre nye eksamener som ligner de tidligere, men dekker
pensum som prøveeksamen 1–6 ikke har testet og som avdekker kunnskapshull. Grunnlaget er en
kartlegging av alle 106 ledd i prøveeksamen 1–6 mot manualens underkapitler og årets
lysbilder. Hver eksamen har omtrent 18 ledd på kjernetemaene med en ny vri og omtrent 12 ledd
på pensum som ikke er testet før.

### Minimalt stillas (Magnus' krav, gjelder bare 7–9)

Oppgavene skal gi så lite hjelp som eksamen gjør på sitt verste. Mønsteret er de knappeste
ekte spørsmålene: mc2026 1 (bare kjøpspris, utbytte, skjermingsrente og kurs), H2025 2
(rabattene, men ingenting om hvordan gjelden fordeles) og H2023 13 (to aksjer, «uavhengige»).

1. **Teksten gir situasjonen, tallene og satsene. Aldri regelen, formelen eller
   framgangsmåten.** Ikke skriv hvordan gjelden fordeles, at ubenyttet skjerming framføres
   eller legges til grunnlaget, «ifølge Mertons formel», «sammenlign forventet nytte», «bruk
   eksakt formel», hvilken metode en skatteavtale bruker utover det et faktum krever, eller noe
   som varsler om fellen.
2. **Satsene.** Det som ikke kan vites, står alltid: skjermingsrente, priser, renter,
   sannsynligheter, inflasjon, G, delingstall, kildeskatt i andre land, effektive satser.
   Standardsatsene for 2026 i k20 (22 %, 1,72, aksjer og aksjefond 80 %, primærbolig 25 % opp
   til 14 mill. og 70 % over, sekundærbolig 100 %, formuesskatt 1,0 % og 1,1 % over 21,5 mill.,
   bunnfradrag 1 900 000, minimumsskatt 15 %, exit-skatt med bunnfradrag 3 mill. og
   gaveterskel 100 000, dokumentavgift 2,5 %, BSU 27 500 og 10 %, korttidsutleie 10 000 og
   85 %, folketrygd 18,1 % opp til 7,1 G) står i omtrent halvparten av regneleddene. I resten
   står bare «Bruk skattereglene for 2026.» Da må studenten kunne satsen. Løsningen sier i så
   fall hvilken sats som ble brukt og hvor den står (k20).
3. **«Du kan se bort fra …»** bare når det trengs for at svaret skal bli entydig.
4. **Nøytrale titler**: navn og situasjon («Kari og aksjene i Nordlys ASA»), aldri metoden
   eller fellen («… med ubenyttet skjerming»). `topic` bruker det bredeste navnet i lista som
   passer (Aksjonærmodellen heller enn Skjerming), fordi chipen vises under eksamen.
5. Delspørsmål kan bygge på hverandre uten å gjenta mellomresultatet, som på eksamen.
6. Begrepsledd har ingen definisjon i stammen. Alternativene bærer begrepene.
7. Noen få ledd har én opplysning som ikke skal brukes, slik aksjekursen i mc2026 1 er støy.
   Løsningen sier at den er støy.

Alt annet i spesifikasjonen gjelder: fire alternativer med nøyaktig ett riktig, gale
alternativer som navngitte feil, fasitplanen (`p7`, `p8`, `p9` i `fasitplan.json`), løsningene i
fast mal, 35–48 ord per ledd, 35–55 % tallsvar, høyst tre regnetrinn, ingen iterasjon.

### Kilder for temaene som ikke er testet før

Manualen dekker det meste (underkapitlene er oppgitt). Det som bare står i lysbildene, hentes
fra tekstuttrekkene i `NHH/7. Semester/FIE432 Persøk/_claude/tekst/`: årets forelesning 1–5 og 9
(«NYE FORELESNINGER __ …»), «Forelesning 9GS  Skatt, aksjer og risikotaking Rev», «Nye
oppgaver __ Forelesning 11 GS  SkatteparadisREV» og Næss' «ForelesningAksjesparing (3)»,
«ForelesningPensjon (5)», «ForelesningLån» og «Finansiell_psykologi (2)». Et faktum som bare
står i et lysbilde, skal gjengis presist og løsningen oppgir forelesning og lysbilde. Ta ikke
med påstander lysbildet ikke dekker entydig.

### Svakhetene som testes på nytt med ny vri

Fra Magnus' usikre og gale svar på prøveeksamen 1–4: skjerming per aksjepost, eksakt
realavkastning, inntektsskiftingslikningen med avgiftsandelen, skattemessig bosted (§ 2-1, 61
dager, ti år), global minimumsskatt (15 % er gulvet), Domar–Musgrave, utleie av egen bolig og
formuesskatt med gjeldsfordeling.

### Prøveeksamen 7: «ligner H2025 og forelesning 1–5 i 2026» (skatt 20, finans 10)

T = tallsvar, B = begrepsledd. Slå sammen beslektede enkeltledd under felles innledning, så
det blir 16–19 oppgaver.

Skatt:
1. Skjerming per aksjepost: to poster i samme selskap kjøpt til ulik pris, samme utbytte per
   aksje. Skattepliktig utbytte for beholdningen og ubenyttet skjerming på den ene posten (2 T).
   Feller: skjerming på snittkurs, netting mellom postene. k5.2–5.3.
2. Aksjesparekonto: skattepliktig beløp ved et uttak når kontoen har gevinst (1 T). k14.6,
   forelesning 3 («Skal du investere i aksjer og er privatperson bruk ASK!»).
3. Effektiv skatt for en rik investor: AERT for eier av børsnotert mot unotert selskap uten
   utbytte (formuesverdi rundt 35 % av markedsverdi for unoterte) og hva som forklarer den lave
   satsen (1 T, 1 B). k8.6, forelesning 5 lysbilde 30–45.
4. Inntektsskiftingslikningen når selskapsskatten endres, slik forelesning 5 viser («Hva skjer
   når en av skattene endres», mindretallet i skatteutvalget med 24 %) (1 T). Bruk den
   forutsetningen om lønnsskatten som lysbildet bruker.
5. Aksjonærlån (1 B). k6.5, forelesning 5.
6. Unoterte aksjer i formuesskatten, Anine-typen: formuesskatt når selskapets skattemessige
   formuesverdi er langt under markedsverdien, med gjeld (1 T) og hva avisregnestykket gjorde
   feil (1 B). k7.5, forelesning 1 lysbilde 14–18, forelesning 2 («Den skattemessige fordelen
   ved å eie unoterte aksjer»). Ny person og nye tall.
7. Bankinnskudd under høy inflasjon: samlet skatt (inntektsskatt og formuesskatt) i prosent av
   den nominelle renten og realavkastning etter skatt (2 T). k2.2, k8.1, forelesning 2
   («Takeaway»). Feller: R − π i stedet for eksakt, skatt på realrenten, glemt formuesskatten.
8. Stykkskatt med lineære kurver: konsumentenes andel av skatten (1 T) og dødvektstapet (1 T).
   k11.2–11.5. Feller: glemt ½, provenyet, produsentenes andel.
9. Giring av bolig: avkastning på egenkapitalen med lån, prisstigning og renter etter skatt
   (1 T). k4.3, forelesning 3 lysbilde 7 og 25–31.
10. Kjøp og salg av bolig: dokumentavgift og vilkårene for skattefritt salg (1 B). k4.1, k4.4,
    forelesning 3 («Kravene for skattefritt salg»).
11. Folkefinansiering: forventet avkastning på et folkelån med lovet rente og
    misligholdssannsynlighet (1 T) og et utsagn om tapsfradrag og forventet avkastning etter
    skatt for en risikonøytral investor (1 B). k4.6, forelesning 3 lysbilde 38–51.
12. Avkastning på aktiva 1870–2015 (Jordà mfl. 2019): bolig mot aksjer, risiko og én bolig
    som ikke er diversifisert (1 B). k3.1–3.4, forelesning 2.
13. Ulikhet og tilbakeholdt overskudd: hvorfor statistikken undervurderer inntekten til de
    rikeste (1 B). k3.6, k1.6, forelesning 1 lysbilde 19–24.
14. Skattemessig bosted for en som har bodd i Norge kortere enn ti år (1 B). k13 (§ 2-1).

Finans:
15. Ung person med stor risikofri humankapital: optimalt aksjebeløp etter Merton er større
    enn finansformuen (1 T) og utsagn om lånefinansierte aksjekjøp for unge (1 B). k14.4–14.5,
    «ForelesningAksjesparing (3)» («Lånefinansiere aksjekjøp», «Gjett hvem som anbefaler denne
    strategien?», «Humankapital og alder»).
16. Forsikring med U(W) = ln W: høyeste premie (1 T) og et utsagn om kritisk
    skadesannsynlighet (1 B). k17.4–17.5.
17. Kostnader over 30 år: sluttverdi i indeksfond mot aktivt fond med samme bruttoavkastning
    (1 T). k14.6. Feller: lineær regning, differansen trukket én gang.
18. BSU: skattefradraget og vilkårene (1 T). k15.6. Feller: 22 %, fradrag over taket, eier bolig.
19. Fast mot flytende rente (1 B). k16.6, «ForelesningLån».
20. Tjenestepensjon ved jobbskifte: pensjonskapitalbevis og egen pensjonskonto (1 B). k15.4.
21. Bias mot støy (Kahneman) (1 B). k18.1, «Finansiell_psykologi (2)».
22. Gearet indeksfond eller markedsporteføljen, det lysbildene i «ForelesningAksjesparing (3)»
    dekker entydig (1 B).

### Prøveeksamen 8: «ligner H2024 og skatteteorien i forelesning 6–11» (skatt 21, finans 9)

Skatt:
1. Skjerming over tre år der aksjene arves i år 2: arvingen overtar inngangsverdi og ubenyttet
   skjerming (kontinuitet, skatteloven § 9-7). Skattepliktig utbytte for giveren, skjermingen
   arvingen overtar og gevinstskatt når arvingen selger (3 T). k5.3, k6.6. Kontroller i k6.6
   at ubenyttet skjerming følger aksjen. Gjør den ikke det, bruk gave i stedet.
2. Nøytralitet når bare en andel β av investeringen kan utgiftsføres: kapitalkostnaden før
   skatt (1 T) og et utsagn om når skatten er nøytral (1 B). k9.1, k9.4, forelesning 5
   («Førsteordensbetingelsen», «Nøytralitet krever at β = 1»).
3. Dobbeltbeskatning og skattearbitrasje (1 B). k9.2–9.3.
4. Formuesskatt med sekundærbolig, børsnoterte aksjer, bankinnskudd og gjeld over trinnet på
   21,5 mill.: formuesverdi etter gjeld (1 T) og formuesskatt (1 T). k7.1–7.4.
5. Argumentene for og mot formuesskatt (1 B). k8.5.
6. Eiendomsskatt som kapitaliseres i boligprisen: prisforskjellen mellom to like hytter i en
   kommune med og en uten eiendomsskatt (1 T). k7.6, k11.6, forelesning 9 (siste lysbilder).
7. Formuesskatt som avkastningsskatt, motsatt vei: formuesskattesatsen som gir samme proveny
   som en gitt avkastningsskatt (1 T). k8.1.
8. Stykkskatt: konsumentpris med lineære kurver (1 T), et utsagn om dødvektstapet (1 B) og
   moms på mat eller plattformmarkeder (1 B). k11.2–11.6, forelesning 9.
9. Evneprinsippet: horisontal og vertikal likhet (1 B). k10.1.
10. Kilen: hva en høyere marginalskatt gjør med arbeidstilbudet (1 B). k10.2.
11. Optimal beskatning (Mirrlees) eller reell mot formell progresjon (1 B). k10.5–10.6.
12. Fast driftssted (1 B) og overskuddsflytting med internpriser (1 T). k13.2, k13.6.
13. Tiltakene mot skatteparadiser: CRS, land-for-land-rapportering, BEPS og hvem som får
    informasjonen (1 B). k13.6.
14. Utbytte fra et utenlandsk selskap med kildeskatt: norsk skatt etter kreditfradrag (1 T).
    k13.3, k5. Feller: kildeskatten trukket fra grunnlaget, ingen kredit, kredit over norsk skatt.

Finans:
15. Forsikring med √W: høyeste premie (1 T) og risikopremien, altså forventet formue minus
    sikkerhetsekvivalenten (1 T). k17.1–17.3.
16. Merton når volatiliteten øker: ny aksjeandel (1 T). k14.4. Feller: 1/σ, uendret.
17. CAPM: forventet avkastning med beta og hvorfor usystematisk risiko ikke gir
    risikopremie (1 T). k14, «ForelesningAksjesparing (3)» («CAPM og diversifisering»).
18. Serielån: første terminbeløp og renter etter skatt (1 T). k16.2, k16.4.
19. Offentlig mot privat tjenestepensjon (1 B). k15.4, «ForelesningPensjon (5)».
20. Herding og sosiale effekter (1 B). k18, «Finansiell_psykologi (2)».
21. Aktive fond over tid: persistens og Buffetts veddemål (1 B). k14.6,
    «ForelesningAksjesparing (3)».
22. Manglende deltakelse i aksjemarkedet (1 B). «Finansiell_psykologi (2)».

### Prøveeksamen 9: «ligner H2023 og kursgodkjenningen 2026, med vekt på finansforelesningene» (skatt 19, finans 11)

Skatt:
1. Skjermingstabell over fire år som ender i salg med tap: skattepliktig utbytte et år,
   akkumulert ubenyttet skjerming og skatteverdien av tapet når ubenyttet skjerming ikke kan
   øke tapet (3 T). k5.3–5.4.
2. Holdingselskap: skatt på utbytte gjennom holdingselskapet (treprosentregelen) (1 T) og hva
   utsettelsen er verdt i nåverdi (1 T). k6.2–6.4, BS2 («Et to-hodet troll»).
3. Formuesskatt: fradragsberettiget gjeld med bankinnskudd, aksjefond og primærbolig (1 T). k7.4.
4. Superprofitt og skjermingsrenten (1 B). k2.3, forelesning 2 («Superprofitt»).
5. To-periodemodellen: hva skatt på renteinntekt gjør med budsjettlinjen og sparingen (1 B).
   k2.6, forelesning 2 lysbilde 50–56.
6. Verdien av en evig kontantstrøm før og etter skatt: skattefri mot skattepliktig leie og
   riktig diskonteringsrente (1 T). k2.5, forelesning 3 (appendiks).
7. Selskapsskatt i en liten åpen økonomi med mobil kapital: hvem bærer den (1 B) og
   konsumentenes andel når tilbudet er lite elastisk (1 T). k11.4, k11.6, forelesning 9 lysbilde 3.
8. Gevinster skattlegges, men tap kan ikke trekkes fra: hva skjer med risikotakingen (1 B).
   k12.3, forelesning 3 («Tapsfradrag vs. ikke tapsfradrag»).
9. Global minimumsskatt med to datterselskaper med ulik effektiv sats (1 T). k13.5–13.6.
10. Utleie av del av egen bolig der egen bruk er under halvparten målt etter utleieverdi (1 B).
    k4.4, forelesning 3 («Skattefri utleie»).
11. Marginalskatt og hvor mye av en lønnsøkning man beholder (1 T). k1.1–1.2.
12. Høyrenteobligasjoner og gråmarkedslån (1 B). k4.6, forelesning 3.
13. Inntektsskiftingslikningen når arbeidsgiveravgiften deles 50/50: eierskatten som følger
    (1 T). Forelesning 5 («Antakelser om overveltning»).
14. Hvem eier hva: husholdningenes formue og de rikestes (1 B). k3.5, forelesning 2.
15. BS-modellen: utbytte og nytt innskudd av egenkapital under formuesskatt (1 B). Forelesning 5
    appendiks, BS1.

Finans:
16. Markedseffisiens: svak, halvsterk og sterk form (1 B). «ForelesningAksjesparing (3)».
17. Verdiaksjer og Fama–French (1 B). «ForelesningAksjesparing (3)».
18. Standardavviket til en portefølje av to aksjer med gitt korrelasjon (1 T). k14.1–14.2.
19. Merton med og uten skatt: aksjeandelen uten skatt (1 T) og med proporsjonal skatt og
    fullt tapsfradrag på all avkastning (1 T). k14.4, k12.2. Feller: uendret, w(1 − t).
20. Regulering av løpende alderspensjon: hva den følger (1 B). k15, «ForelesningPensjon (5)».
21. Forsikring med √W og tre utfall (ingen skade, delskade, totalskade): aktuarisk premie
    (1 T) og høyeste premie (1 T). k17.
22. Present bias og forbrukslån (1 B). «ForelesningLån».
23. Norwegian-aksjen: hvorfor prisen ikke falt (1 B). «Finansiell_psykologi (2)».
24. Dulting: automatisk innmelding og standardvalg (1 B). «Finansiell_psykologi (2)».

## Prøveeksamen 10, 11 og 12 (8. november 2026): så lik eksamen som mulig

Magnus bestilte dette 8. november 2026: tre eksamener med høyest mulig sannsynlighet for å ligne den han faktisk får 12. november, med samme vanskelighetsgrad som H2025.

Grunnlaget er tre kilder:
- **H2025.** Den siste skoleeksamenen, laget av de samme foreleserne i skattedelen.
- **Kursgodkjenningen 2026 (`mc2026`).** Laget av årets forelesere, også Næss, som har finansdelen for første gang.
- **Kunngjøringen fra 6. november 2026.** Satser og regler oppgis på eksamen, veldig gamle oppgaver er utdatert, og man bør lese forelesningsnotatene nøye.

Hver eksamen er bygd som en hel og troverdig eksamen. Kjernerutinene kommer i alle tre. De andre temaene roterer, slik at de tre til sammen dekker alt som har en reell sjanse for å komme.

### Formatet og vanskelighetsgraden (H2025-nivå)

- 30 ledd fordelt på 15–19 oppgaver.
  - **Skattedelen (GS):** 18 ledd, 60 %.
  - **Finansdelen (Næss og Kvadsheim):** 12 ledd, 40 %. H2025 hadde 59/41.
- 4 alternativer, +3/−1, `minutes: 240`.
- **Stillaset er som i H2025, ikke det minimale fra prøveeksamen 7–9.**
  - Alle satser står i teksten, som kunngjort.
  - Lærerne bruker gjerne runde satser («eierskatt 40 %», «formuesskatt 1 %», «verdsettingsrabatt 20 %»). Gjør det samme i omtrent halvparten av regneleddene, og si i teksten at satsene er forenklet.
  - En regel som eksamen ville oppgitt, kan stå i teksten, for eksempel at gjelden fordeles forholdsmessig. Framgangsmåten og fellen skal aldri stå der.
- **Regneledd:** én til tre operasjoner med runde tall som går opp, som H2025 1–10. Ingen lange tabeller. Kjeder (a–d) der hvert ledd er kort, som H2025 3 og 13.
- **Begrepsledd:** i stilen fra mc2026: «Hvilket utsagn er riktig?», «Hvilken av påstandene kan være korrekt?», formelgjenkjenning (H2025 7, H2024 8) og fakta fra lysbildene (H2025 16).
- **Måltall** (`node tools/sjekk-prove.js fie432`):
  - 38–50 ord per ledd
  - 55–65 % tallsvar (H2025 har om lag 65 %)
- Ingen spørsmål med samme tall eller samme scenario som de ekte settene, mc2026 eller prøveeksamen 1–9. Bruk nye navn, og kontroller dem med grep mot `fag/fie432/sett.js`.
- **Pensum er 2026-forelesningene.** Er en gammel fasit i strid med forelesningen, gjelder forelesningen.
- **Satser for 2026:** se «Satsene» over.

### Prøveeksamen 10: «tvillingen til H2025» (samme rekkefølge og samme rutiner som H2025, nye tall og vrier)

Skattedelen (18 ledd):

| Nr. | Innhold | Ledd | Modell |
|---|---|---|---|
| 1 | Kontantstrøm til eieren over to år: utbytte med skjerming og formuesskatt med rabatt, netto til eier | 1 T | H2025 1 |
| 2 | Formuesskatt med bolig og aksjer og felles gjeld. Teksten må gjøre det entydig om gjeldsreduksjonen gjelder | 1 T | H2025 2, der to svar ble godtatt |
| 3 | Formuesskatt som avkastningsskatt: skatt i % av avkastningen med og uten selskapsskatt, verdi av evig kontantstrøm og verdi med formuesskatt | 4 T | H2025 3 |
| 4 | Ubenyttet skjerming fra året før, skattepliktig utbytte per aksje | 1 T | H2025 4 |
| 5 | Effektiv skattesats når en kostnad ikke er fradragsberettiget eller bare delvis | 1 T | H2025 5 |
| 6 | Utbytte som trengs for å betale formuesskatten | 1 T | H2025 6 |
| 7 | Bedriftens tilpasning: F′(K) med avgrenset rentefradrag og skatt på eier som formelgjenkjenning, og et begrepsledd om gjeld mot egenkapital | 2 formel, 1 B | H2025 7 |
| 8 | Stykkskatt med lineære kurver: generelt tilfelle, ett grensetilfelle og produsentprisen | 3 T | H2025 8 |
| 9 | Formuesskatt omregnet til avkastningsskatt. Vrien er formuen ved utgangen av året i stedet for inngangen | 1 T | H2025 9 |
| 10 | Gevinst med oppjustering når aksjen har ubenyttet skjerming | 1 T | H2025 10 |
| 11 | Fritaksmetoden eller aksjonærmodellen | 1 B | mc2026 6 og 10 |

Finansdelen (12 ledd):

| Nr. | Innhold | Ledd | Modell |
|---|---|---|---|
| 12 | Merton-kjeden: γ eller aksjeandel, risikofri humankapital, humankapital med β = 1 og livssyklus | 4 | H2025 11 |
| 13 | Forsikring, egenandel eller lovpålagt | 1 B | H2025 12, mc2026 15 |
| 14 | Forventet nytte med √W: kjøpe eller ikke, kritisk sannsynlighet og delforsikring | 3 | H2025 13 |
| 15 | Delingstall og uttaksalder i folketrygden | 1 B | H2025 14 |
| 16 | Kapitalmarkedslinjen og giring av markedsporteføljen | 1 B | H2025 15 |
| 17 | Indeksfond mot aktive fond, fakta fra Næss | 1 B | H2025 16 |
| 18 | Innskudd mot ytelse | 1 B | H2025 17 |

### Prøveeksamen 11: «H2024 og kursgodkjenningen»

Skattedelen (18 ledd):

| Nr. | Innhold | Ledd | Modell |
|---|---|---|---|
| 1 | Skjermingskjeden over to år: skjerming, skattepliktig, ubenyttet og år 2 med framført skjerming | 4 T | H2024 1, mc2026 1 |
| 2 | Gevinst med oppjustering | 1 T | H2024 2 |
| 3 | Tidsverdien av avskrivning mot straksfradrag | 1 | H2024 3 |
| 4 | Progressivitet: flat sats med bunnfradrag og gjennomsnittsskatt | 1 B, 1 T | H2024 4, mc2026 8 |
| 5 | Formuesskatt: gjeldsreduksjon og nettoformue | 2 T | H2024 6 |
| 6 | Utbytte som trengs for å betale formuesskatt med eierskatt 37,84 % | 1 T | H2024 7 |
| 7 | Stykkskatt som formelgjenkjenning: ∂p/∂t, ∂P/∂t og et grensetilfelle | 3 | H2024 8 |
| 8 | Implisitt skatt: begrep og tall | 2 | H2024 9 |
| 9 | Inntektsskiftingslikningen | 1 T | mc2026 2 |
| 10 | Norsk skattyter, skattemessig bosted eller utflytting | 1 B | mc2026 4 og 9, H2024 10 |

Finansdelen (12 ledd):

| Nr. | Innhold | Ledd | Modell |
|---|---|---|---|
| 11 | Forsikring med √W eller ln W: rettferdig pris, full dekning, kjøpe eller ikke og høyeste premie | 4 | H2024 11 |
| 12 | Indeksfond, eksponering, valutasikring og varians med ρ = 1 | 3 | H2024 12 |
| 13 | Innskudd mot ytelse, IPS og BSU | 2 | H2024 13 |
| 14 | Lån: avdragsfrihet eller rentevalg | 1 | H2024 14, ForelesningLån |
| 15 | Finansiell psykologi: menyeffekt eller home bias | 1 B | mc2026 16 og 18 |
| 16 | CRRA-pensjonist: aksjeandel med γ oppgitt | 1 T | mc2026 12 |

### Prøveeksamen 12: «kursgodkjenningen og 2026-forelesningene»

Skattedelen (18 ledd):

| Nr. | Innhold | Ledd | Modell |
|---|---|---|---|
| 1 | Skjerming over år og salg med ubenyttet skjerming | 2 T | mc2026 1 |
| 2 | Samlet skatt på overskudd tatt ut som utbytte, med oppgitte satser | 1 T | mc2026 3 |
| 3 | Inntektsskiftingslikningen når en sats endres, eller når arbeidsgiveravgiften deles | 1 T | mc2026 2, F5 |
| 4 | AERT eller formuesskatt som avkastningsskatt for børsnotert mot unotert | 1 T, 1 B | F5, F8, H2025 3 |
| 5 | Formuesskatt med primærbolig og aksjer og gjeldsfordeling | 1 T | |
| 6 | Stykkskatt med tall: konsumentpris og konsumentenes andel | 2 T | F9 |
| 7 | Skatt og risiko: delvis tapsfradrag i begrep, og Domar–Musgrave med tall | 2 | mc2026 7, F10 |
| 8 | Bedriftens tilpasning: kapitalkostnad eller nøytralitet | 1 | F6 |
| 9 | Skattefri utleie av egen bolig | 1 B | mc2026 5, F3 |
| 10 | Fritaksmetoden | 1 B | mc2026 6 |
| 11 | Utflytting: når man er utflyttet, og exit-skatt | 2 | mc2026 9, F7 |
| 12 | Skatteparadis | 1 B | F11 |
| 13 | Progressivitet | 1 B | mc2026 8 |

Finansdelen (12 ledd):

| Nr. | Innhold | Ledd | Modell |
|---|---|---|---|
| 14 | Valg mellom pensjonskontrakter ved risikoaversjon | 1 | mc2026 11 |
| 15 | Humankapital: ung mot gammel og Merton med humankapital | 2 | mc2026 17, H2025 11 |
| 16 | Folketrygd: opptjening og delingstall | 1 T | mc2026 19 |
| 17 | Hvilken del av pensjonsformuen som er utsatt for aksjemarkedet | 1 B | mc2026 20 |
| 18 | Aksjeporteføljer og aktive mot passive fond | 2 B | mc2026 13 og 14 |
| 19 | Forsikring: egenandel og høyeste premie med √W | 1 B, 1 T | mc2026 15 |
| 20 | Lån eller sparing (Kvadsheim, ForelesningLån) | 1 | |
| 21 | Finansiell psykologi | 1 B | mc2026 16 og 18 |
| 22 | Aksjesparing: kostnader over tid eller å slå markedet | 1 T | ForelesningAksjesparing |

T betyr tallsvar og B begrepsledd. Oppgavene i lista kan slås sammen eller deles når det gir en naturlig felles innledning. Antall ledd per eksamen står fast.
