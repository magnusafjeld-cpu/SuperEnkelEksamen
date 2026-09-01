---
tags: [arkitektur, moduler, case]
oppdatert: 2026-08-30
---

# Case-spilleren

`js/bundle-case.js`, rute `/caser`. Kjører ett caseintervju som en sekvens av
trinn. Fagnøytral: ethvert fag som fyller `EDU_DATA.cases` får modulen.

## Hvorfor den ikke er [[Eksamenssett-modulen]]

En case er en samtale, ikke et oppgavesett. Rekkefølgen *er* poenget: leser du
intervjuerens struktur før du har skrevet din egen, har du ikke trent, du har
lest en fasit. Derfor er hvert trinn låst til du selv har forsøkt, og derfor kan
ikke settmodulen brukes — den viser alle oppgavene samtidig.

## De seks trinnartene

| `art` | Hva som skjer | Vurdering |
|---|---|---|
| `oppklaring` | Hvilke spørsmål ville du stilt? | selvvurdert |
| `struktur` | Skriv nedbrytningen før intervjuerens vises | selvvurdert |
| `exhibit` | Les figuren og si hva den betyr | selvvurdert |
| `regne` | Regn på papir, skriv tallet — sjekkes automatisk | maskinelt |
| `ide` | Idémyldring mot klokka, kryss så av hva du fikk | telt |
| `syntese` | Anbefalingen, topp-ned, på tid | selvvurdert |

Skalaen er **Bom / Delvis / Solid / Distinkt**, ikke poeng. «Bestått» og
«distinkt» er to forskjellige ting, og det er nettopp det skillet som trenes.

## Tallsjekken er enhetsbevisst

Fasiten oppgis i trinnets egen `enhet`, så «78» og «78 mill» er samme svar når
enheten er millioner. Sjekken sammenligner derfor i grunnenheter:

- **med suffiks** — tallet betyr det suffikset sier (`78 mill` → 78 000 000)
- **uten suffiks** — tallet betyr det enheten sier (`78` → 78 000 000)
- **alltid også** — tallet tatt bokstavelig (`78000000`)

Da godtas riktig svar uansett skrivemåte, mens `78 mrd` fortsatt avvises.
Standard slingringsmonn er 2 %, overstyrbart per trinn med `toleranse`.

> [!warning] Dette var en ekte feil
> Første versjon ganget alltid opp suffikset, så **«78 mill» ble avvist** på en
> oppgave med fasit `78` og enhet «millioner kroner» — altså riktig svar skrevet
> på den mest naturlige måten. Fanget i nettlesertesten, ikke i kodelesningen.

## Klokka fryses når fasiten åpnes

Trinnklokka teller ned mot måltiden mens du jobber. I det du trykker «vis
fasiten», festes tiden: `avdekk()` lagrer `brukt` i millisekunder, og chipen blir
statisk — «brukte 01:42», grønn under måltiden, gul like over, rød godt over.

Uten dette telte klokka videre mens du **leste** løsningen, og et trinn du brukte
halvannet minutt på å tenke gjennom, endte rødt på «+05:23» fordi fasiten er
lang. Det er lesetid, ikke tenketid, og tallet ble dermed misvisende akkurat der
det skulle vært nyttig.

Den frosne verdien er mer verdt enn bare en stoppet klokke: den er tallet du
sammenligner med måltiden når du vurderer deg selv.

## Diktering

`S.u.diktering(textarea, onEndring, språk)` i `js/bundle-core.js` gir en
mikrofonknapp under skrivefeltene i både case-spilleren og
[[Historieporteføljen]]. Den bruker nettleserens egen `SpeechRecognition` og
**returnerer null der API-et mangler**, så knappen forsvinner i stedet for å
ligge død.

Hele kurset insisterer på at du skal si svaret høyt. Da er det rart å tvinge deg
til å skrive det — særlig i historiene, der talespråk gir et mer troverdig
resultat enn å formulere seg skriftlig først.

| Detalj | Valg |
|---|---|
| Språk | `nb-NO` |
| Modus | `continuous`, med `interimResults` |
| Foreløpig tekst | vises som grå forhåndsvisning, skrives **ikke** inn |
| Endelig tekst | legges til i feltet og lagres med én gang |
| Chrome stopper av seg selv | startes på nytt automatisk, med mindre du trykket stopp |
| Feltet forsvinner fra DOM | mikrofonen lukkes av en vakt hvert andre sekund |

> [!warning] To ting brukeren må få vite, og som står i teksten under knappen
> Lyden går til **nettleserleverandørens servere** — Google i Chrome, Apple i
> Safari. Og norsk diktering setter **ikke tegnsetting**, så den egner seg til
> stikkord, ikke til prosa.

På iPhone finnes dessuten mikrofonen på selve tastaturet, som virker i alle felt
uten at appen gjør noe. Knappen er bare raskere.

## Lagring

| Nøkkel | Innhold |
|---|---|
| `state.exams["case:<id>:run"]` | `{ startedAt, submittedAt }` |
| `state.exams["case:<id>:t<n>"]` | `{ svar, vist, brukt, score, tikk }` per trinn |

`state.exams` er en generisk bøtte som allerede synkes og slås sammen per nøkkel,
så modulen trengte **ingen migrering**. Se [[Datamodell og lagring]].

Fritekstsvar kappes på 2 000 tegn, fordi de ligger i fremdriften som synkes.

## Ting å vite hvis du endrer den

- **Svar lagres ved `blur` og ved avdekking, aldri per tastetrykk.** En
  `S.app.refresh()` midt i skrivingen ville tatt både markøren og halve setningen.
- `åpen` og `steg` er lokal modultilstand, ikke lagret. Nullstiller du
  fremdriften mens en case er åpen, står du fortsatt inne i den — det er riktig,
  men det forvirret testingen.
- Trinnklokka teller oppover mot måltiden og blir rød over. Den stopper
  ingenting; den er der for å bygge tidsfølelse.
