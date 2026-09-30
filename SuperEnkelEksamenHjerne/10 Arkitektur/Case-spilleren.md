---
tags: [arkitektur, moduler, case]
oppdatert: 2026-09-30
---

# Case-spilleren

`js/bundle-case.js`, rute `/caser`. Kjører ett caseintervju som en sekvens av
trinn. Fagnøytral: ethvert fag som fyller `EDU_DATA.cases` får modulen.

## Hvorfor den ikke er [[Eksamenssett-modulen]]

En case er en samtale, ikke et oppgavesett. Rekkefølgen *er* poenget: leser du
intervjuerens struktur før du har skrevet din egen, har du ikke trent, du har
lest en fasit. Derfor er hvert trinn låst til du selv har forsøkt, og derfor kan
ikke settmodulen brukes — den viser alle oppgavene samtidig.

## De åtte trinnartene

| `art` | Hva som skjer | Vurdering |
|---|---|---|
| `forberedelse` | Lesetid før intervjuet: les materialet, noter (PwC-formen) | sjekkliste |
| `oppklaring` | Hvilke spørsmål ville du stilt? | sjekkliste |
| `struktur` | Skriv nedbrytningen før intervjuerens vises | sjekkliste |
| `exhibit` | Les figuren og si hva den betyr | sjekkliste |
| `regne` | Regn på papir, skriv tallet — sjekkes automatisk | sjekkliste, og feil tall gir tak |
| `ide` | Idémyldring mot klokka, kryss så av hva du fikk | telt mot idélisten |
| `drøfting` | Et kvalitativt spørsmål: risiko, gjennomføring, KI, alternativer | sjekkliste |
| `syntese` | Anbefalingen, topp-ned, på tid | sjekkliste |

Skalaen er **Bom / Delvis / Solid / Distinkt**, ikke poeng. «Bestått» og
«distinkt» er to forskjellige ting, og det er nettopp det skillet som trenes.

`forberedelse` og `drøfting` kom med PwC-casene 30. september 2026. Starter en
case med `forberedelse`, merkes promptkortet «Casematerialet», og knappen heter
«Tiden er ute — start intervjuet».

**Trinnraden røper ikke det som kommer.** Den vises fra første skjerm, og en egen
`kort`-tittel som «Payback» eller «Feilkildene» fortalte hva intervjueren skulle
spørre om. Nå står standardnavnet («Regning», «Drøfting») til du er kommet til
trinnet, og den egne tittelen brukes etterpå og i oppsummeringen.

**Tabeller på mobil:** materiale, spørsmål, fasit og bakgrunn går gjennom
`prosa()`, som kaller `S.u.rullTabeller`, så hver `table.data` ruller i sin egen
boks. Fasittabellene i PwC-casene var opptil 375 piksler i et felt på 277, og drog
hele siden sidelengs (fallgruve 7i). Figurene i trinnene lå allerede i en egen
rulleboks.

**Rulling:** «Start casen» går til toppen, der materialet står. Et trinnbytte
(`gåTil()`) ruller til trinnraden. Før landet du midt i det nye trinnet, fordi
knappen for neste trinn står nederst og siden beholdt rulleposisjonen.

## Streng vurdering: nivået regnes ut, det velges ikke

Til 30. september 2026 valgte du nivået selv etter hvert trinn, med kravene som
en liste å se på. Det var for snilt: magefølelsen sier Solid når svaret hadde
halvparten. Nå krysser du av hvert krav svaret ditt **faktisk** inneholdt, og
`strengScore()` regner ut nivået:

| Treff | Nivå |
|---|---|
| alle krav | Distinkt |
| minst tre firedeler | Solid |
| minst 40 prosent | Delvis |
| under det | Bom |

To ting setter **Delvis som tak**: at du svarer ja på «Gikk du i fella?», og feil
eller manglende tall på et regnetrinn. Tiden er ikke med i nivået, fordi det tar
lengre tid å skrive et svar enn å si det, men går du mer enn 25 prosent over,
står det i tilbakemeldingen.

Etter hvert trinn står det som manglet. Etter hele casen samler `tilbakemelding()`
nivå per trinn, treff per kriterium der kravene er merket med ett, de tre dyreste
manglene (fra de svakeste trinnene), feller og tid.

- **Kravene er tekst eller `{ k, t }`.** `k` er et kriterium, og navnet hentes
  fra `EDU_DATA.caseKriterier`, som er innhold. PwC-casene merker kravene med
  PwCs fem kriterier; de gamle casene har ren tekst og får ingen fordeling.
- **Idémyldring** telles fortsatt mot idélisten, ikke mot kravene.
- **Enkeltmodus** (market sizing) har fortsatt én selvvalgt vurdering.
- Et trinn vurdert på den gamle måten viser «Tidligere egenvurdering» til du
  krysser av.

> [!bug] `.check` er en rund boks, ikke en rad
> Idélisten brukte `button.check` strukket til full bredde. `.check` er den
> 22 piksler store sirkelen fra studieplanen, så hver idé ble en grønn ellipse.
> Begge listene bruker nå `sjekkRad()` med egen stil (`.sjekk-rad`).

## Enkeltmodus: estimeringscasene har bare ett spørsmål

En case med `format: "ett-spørsmål"` spilles ikke trinn for trinn. Den viser
prompten, en klokke mot `minutter`, et fritekstfelt for ditt eget tall, og
knappen **«Jeg er klar — vis fasiten»**. Da åpner hele gjennomgangen seg på én
gang, med trinnenes egne titler som avsnitt.

Alle 14 market sizing-casene er satt slik. Grunnen er at **market sizing ikke er
en case på linje med de andre.** Det er en liten, kandidatledet komponent, typisk
noen minutter i et førstegangsintervju: du får ett spørsmål, stiller et par
avklaringer, og snakker deg gjennom regnestykket selv mens intervjueren hører på.
Deler man den i seks trinn, deler man samtidig ut strukturen som skulle vurderes.

Derfor er de også satt til **5 minutter (Intro), 6 (Middels) og 8 (Avansert)**, og
`stil: "candidate-led"`. De lå opprinnelig på 20–30 minutter og «interviewer-led»,
som er lengden og formatet på en hel case. Det var feil på begge punkter: en
market sizing tar noen få minutter, og det er kandidaten som driver. De 18 andre
casene ligger fortsatt på 30–35 minutter.

Trinnene ligger urørt i dataene og brukes som avsnitt i gjennomgangen, så
innholdet er nøyaktig det samme. Det er bare oppdelingen i seks klikk som er
borte, og det er derfor omleggingen ikke kostet noe innhold.

Enkeltmodus har **egen lagringsnøkkel** (`case:<id>:enkelt`), ikke trinn 0. Uten
det ville en case som alt var kjørt trinnvis sett avdekket ut i enkeltmodus.
`nullstill()` sletter begge. `snittScore()` leser den ene vurderingen direkte når
casen er i enkeltmodus, siden det ikke finnes trinn å ta snittet over.

## Tallsjekken er enhetsbevisst

Fasiten oppgis i trinnets egen `enhet`, så «78» og «78 mill» er samme svar når
enheten er millioner. Sjekken sammenligner derfor i grunnenheter:

- **med suffiks** — tallet betyr det suffikset sier (`78 mill` → 78 000 000)
- **uten suffiks** — tallet betyr det enheten sier (`78` → 78 000 000)
- **alltid også** — tallet tatt bokstavelig (`78000000`)

Da godtas riktig svar uansett skrivemåte, mens `78 mrd` fortsatt avvises.
Standard slingringsmonn er 2 %, overstyrbart per trinn med `toleranse`.

Fra 30. september 2026 forstår `parseTall` også «minus 30», punktum som
tusenskille («40.000»), «40k», og et helt regnestykke som «120 000 − 80 000 =
40 000», der tallet etter siste likhetstegn er svaret. «tap på 30» leses fortsatt
som 30, derfor ber casene med negativt svar om fortegn.

> [!important] Tallet sjekkes først når utregningen åpnes
> Til 30. september 2026 viste regnetrinnet ✓ eller ✗ ved «Sjekk» og ved blur,
> før fasiten. Da kunne du prøve deg fram til riktig tall, og fella i trinnet bet
> aldri, samtidig som feil tall nå gir Delvis som tak. Nå lagres svaret ved blur
> uten vurdering, sjekkes når du trykker «Vis utregningen», og låses der.

`parseTall` stripper mellomrom (også harde), prosenttegn og gjør komma til
punktum — og normaliserer **ekte minustegn (−, U+2212) og tankestrek til vanlig
bindestrek** før tallet leses ut.

> [!warning] To ekte feil, begge funnet i nettleseren
> Første versjon ganget alltid opp suffikset, så **«78 mill» ble avvist** på en
> oppgave med fasit `78` og enhet «millioner kroner» — altså riktig svar skrevet
> på den mest naturlige måten.
>
> Den andre lå urørt til september 2026, fordi ingen case hadde negativ fasit før
> `kostnadskutt-skadeforsikring` kom med **−18**. `parseTall` matchet bare
> `-?\d+` med ASCII-bindestrek, mens appen selv skriver minus som U+2212 overalt
> — i fasittekst, i tabeller, i regnestykker. Skrev du av tegnet du så, eller
> brukte et telefontastatur som setter inn ekte minus, ble **«−18» lest som 18**
> og riktig svar underkjent. Ingen kodelesning ville avslørt det; det krevde at
> en case faktisk hadde et negativt svar.

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
| `state.exams["case:<id>:t<n>"]` | `{ svar, vist, brukt, score, tikk, kravTikk, fellen }` per trinn |

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
