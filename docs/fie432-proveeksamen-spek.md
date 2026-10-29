# FIE432: tre prøveeksamener i 2026-formatet

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
