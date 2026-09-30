# PwC-casene — forfatterspesifikasjon

Kontrakten PwC-casene skrives etter. Les først:

1. `docs/case-research/10-pwc-consulting.md` — hva PwC selv sier om casen, kildemerket.
2. `fag/case/_eyp/01-saas-cdd.js` — kvalitetsnivået og dataformatet. En PwC-case
   skal være like konkret og like tallsikker, men formen er en annen (se under).
3. `Case_Manual.html`, kapittel 15 (tallarket: norske ankere) og kapittel 10
   (syntesen). Kapittel 3–10 er det casene lenker til i `ch`.

## Hvorfor PwC-casene har sin egen form

PwC Norge gjennomfører **ett individuelt caseintervju** på intervjudagen, sammen
med et kompetansebasert dybdeintervju. PwCs egne råd: «Les informasjonen du
mottar svært nøye», «dette er en dialog», og «ta nødvendige antagelser dersom du
ikke har all informasjon». PwCs egne eksempelcaser er et **skriftlig scenario** med
en liste «Key considerations», fulgt av **spørsmål fra en engagement manager** i
fast rekkefølge. 30–45 minutter. Det er intervjuerledet.

Det som skiller en PwC Consulting-case fra en MBB-case, er at **gjennomføringen
er en del av svaret**: risiko, veikart, mennesker, gevinstrealisering. En
anbefaling uten neste steg er halv.

## Fil og felter

Én fil per case i `fag/case/_pwc/NN-kortnavn.js`. Filen er **ett objektliteral**,
med en kommentar over som sier hva casen trener og hvorfor den ser ut som den gjør.
Ingen `window.EDU_DATA`-kode; `tools/bygg-pwc-caser.py` setter filene sammen.

```js
{
  id: "pwc-…",                 // lagringsnøkkel, endres aldri etter publisering
  label: "…",                  // kort, konkret, gjerne med mekanismen i seg
  type: "Lønnsomhet",          // Lønnsomhet | Markedsinngang | Vekst | Kostnadskutt | Digitalisering | Offentlig
  nivå: "Middels",             // Intro | Middels | Avansert
  firma: "PwC",
  stil: "interviewer-led",
  minutter: 40,                // 30–45
  ch: [3, 5, 6, 10],           // kapitler i Case_Manual.html casen bygger på
  blurb: "…",                  // ren tekst, 1–2 setninger: hva casen trener. Vises før casen
                               // starter: ikke røp mekanismen, regnegrepet eller innvendingen
  prompt: `…`,                 // CASEMATERIALET, se under
  bakgrunn: `…`,               // om casen: hvilken PwC-tjeneste den speiler, hva den trener
  trinn: [ … ],
}
```

## Casematerialet (`prompt`)

Dette er arket kandidaten får før intervjuet. 180–350 ord, HTML:

- To til fire setninger om klienten og situasjonen, med nøkkeltallene i **fet**.
- `<p><b>Viktige forhold:</b></p><ul>…</ul>` med 3–5 punkter, slik PwCs egne caser
  har «Key considerations». Minst to av dem skal **brukes senere** i casen.
- **Én detalj som bare den som leser nøye får med seg**, og som betyr noe senere:
  en enhet, en periode, hva et tall inkluderer, at noe er stengt deler av året.
  Den skal stå der helt nøytralt, ikke uthevet. Et senere trinn skal ha et krav
  om å bruke den, og en felle for å overse den.
- **Detaljen avsløres ikke før trinnet der den biter.** Ikke i lesetidens krav
  eller eksempelnotater, ikke i oppklaringens krav eller fasit, ikke i det
  intervjueren sier. Fasit og krav vises etter hvert trinn, så et krav i lesetiden
  som sier hva detaljen er, gjør at fella aldri biter. Lesetiden kan ha et generelt
  krav: «Du noterer hvor hvert tall kommer fra og hva det måler.»
- Gjerne en liten tabell (`<table class="data">`) med 3–6 nøkkeltall.
- Avslutt med `<p><b>Klienten spør:</b> …</p>`, ett tydelig spørsmål.

Materialet skal **ikke** avsløre mekanismen casen er bygget på. Det gir fakta, ikke
analyse.

## Trinnene

Rekkefølgen er fast i hovedtrekk:

`forberedelse → oppklaring → struktur → exhibit → regne → drøfting (og/eller ide) → syntese`

7–8 trinn (maks 9). Et ekstra `regne`- eller `drøfting`-trinn er lov der casen
trenger det. Summen av `sek` skal ikke overstige `minutter × 60 × 1,15`.

| art | Hva intervjueren gjør | `sek` typisk |
|---|---|---|
| `forberedelse` | Lesetid. Kandidaten leser materialet og noterer | 240–480 |
| `oppklaring` | «Før vi går i gang: hva vil du avklare, og hvilke antagelser gjør du?» | 150–180 |
| `struktur` | «Hvordan vil du angripe dette?» Tilnærming, hypotese, hvor du starter | 240–300 |
| `exhibit` | Legger fram data. «Hva ser du, og hva betyr det?» | 240–300 |
| `regne` | Et konkret regnestykke med ett svar | 240–300 |
| `drøfting` | PwCs kvalitative spørsmål: risiko og prioritering, gjennomføring og veikart, alternativer, hvordan KI kan brukes i analysen | 180–240 |
| `ide` | Idémyldring mot klokka, med en liste å krysse av mot | 150–180 |
| `syntese` | Anbefalingen, med motstand eller ny informasjon midtveis | 150–240 |

Hvert trinn har:

- `art`, `sek`, `tittel`, eventuelt `kort` (≤ 13 tegn, vises på trinnknappen).
  Knappene vises fra første skjerm, men den egne tittelen først når kandidaten
  er kommet til trinnet; før det står standardnavnet («Regning», «Drøfting»).
  Da kan `kort` gjerne være innholdsrikt («Payback»), og det brukes i
  oppsummeringen etter casen.
- `sp`: intervjuerens spørsmål i HTML. Skriv det som sagt: «…». Nytt materiale
  intervjueren gir, står her.
- `fasit`: HTML. Slik et sterkt svar ser ut, med tallene og «så hva». I
  `oppklaring` står **«Svarene du får:»** som en liste; det er ny informasjon casen
  bygger videre på. I `syntese` står modellanbefalingen i en `<blockquote>`, og den
  skal kunne sies på tiden spørsmålet gir: **ett minutt er maks rundt 160 ord**
  (svaret, tre grunner med tall, største risiko, neste steg). Svaret på
  innvendingen står som eget, kort avsnitt, maks rundt 80 ord. De første PwC-casene
  hadde 270–390 ord i ett sitat, og et forbilde som er tre ganger for langt, lærer
  bort det motsatte av det det skal.
- `krav`: 4–6 punkter, se under
- `felle`: 1–2 setninger ren tekst: den vanligste konkrete feilen og hva den koster
- `exhibit`: `figur` med `<table class="data">` (tall i `<td class="n">`), eventuelt
  en forklarende `<p class="tiny">` under
- `regne`: `svar` (tall), `enhet` («millioner kroner», «kroner», «prosent»,
  «årsverk», «måneder» …), `toleranse` 0,02–0,05. Er svaret negativt, be om
  fortegn i `sp`. Tallet sjekkes først når utregningen åpnes, og feil tall gir
  Delvis som tak.
- `ide`: `liste` med minst 10 punkter, ren tekst

### Lesetiden (`forberedelse`)

`sp` sier hvor lang tid kandidaten har, og hva gode notater inneholder: målet med
klientens egne ord, tallene som betyr mest, det som mangler, og en foreløpig
hypotese. `fasit` viser **eksempelnotater** etter lesetiden, i stikkordsform. De
skal ikke avsløre mekanismen eller svaret på noe senere trinn. Kravene handler om
notatenes kvalitet.

### Drøftingen (`drøfting`)

Minst ett slikt trinn per case, fordi det er her PwC skiller seg. Eksempler fra
PwCs egne caser: «Hvilke risikoer ser du, og hvilke ville du prioritert?»,
«Hvordan ville du gjennomført dette?», «Hvordan ville du brukt KI i analysen?»,
«Hvilke hindringer kan stoppe veikartet, og hvordan kommer teamet forbi dem?».
Svaret skal være konkret for *denne* klienten, ikke en generisk liste.

### Motstand og ny informasjon

PwC vurderer uttrykkelig «how well do you respond to guidance or new information».
Minst to steder i casen skal intervjueren gi ny informasjon eller presse tilbake,
og ett av dem skal være i `syntese`. Kandidaten skal verken kapitulere eller
overhøre det: ta det inn, si hva det endrer og hva det ikke endrer, og hva som må
sjekkes.

## Kravene: PwCs fem kriterier, og streng vurdering

Kandidaten krysser av kravene etter hvert trinn, og vurderingen regnes ut av det:
**alle** krav og ingen felle gir Distinkt, minst tre firedeler gir Solid, minst
40 prosent gir Delvis, resten er Bom. Går du i fella, eller har feil tall på et
regnetrinn, er Delvis taket. Derfor må hvert krav være noe man kan svare ja eller
nei på uten skjønn.

Hvert krav er et objekt `{ k, t }`, der `k` er ett av PwCs fem kriterier:

| `k` | PwCs ord | Hva det betyr her |
|---|---|---|
| `struktur` | structured thinking | Bryter ned problemet, MECE, prioriterer, sier hvor man starter |
| `uklarhet` | comfort with ambiguity | Tar nødvendige antagelser og sier dem høyt, jobber videre uten all informasjon, sier hva som må sjekkes |
| `kommunikasjon` | communication skills | Konklusjonen først, klart og kort, signposting, «så hva» |
| `tall` | business intuition and basic numeracy | Regner riktig og trygt, sanity-sjekker, kobler tallet til beslutningen |
| `nysgjerrighet` | curiosity and coachability | Stiller spørsmål som endrer analysen, tar imot ny informasjon og innvendinger, justerer med begrunnelse |

Regler for `t`:

- Begynn med «Du …», og beskriv noe **observerbart**: «Du regner kronechurn og
  logo-churn og sier hvorfor de spriker», ikke «God forståelse av churn».
- Ett krav, én ting. Ikke «og» mellom to uavhengige krav.
- Kravet må gjelde noe spørsmålet faktisk ber om. Spør intervjueren bare etter
  bidraget, kan ikke et krav kreve tilbakebetalingstiden; legg da oppfølgingen inn
  i `sp` («Når du har svart, spør hun: …»).
- Godta like gode svar. Krever kravet ett bestemt tall eller én bestemt vei, skriv
  «for eksempel» eller «minst to av». Kontrollen av de første casene fant krav som
  ga Delvis til et svar som var like godt som fasitens.
- 60–200 tegn, ren tekst, ingen markup.
- Hvert kriterium skal vurderes **minst tre ganger** i løpet av casen.
- Minst ett krav i casen skal gjelde detaljen fra «les nøye».

## Tall, språk og realisme

- **Regn hvert tall to ganger**, andre gang med `python3`, og legg ved
  kontrollregningen i rapporten din. Tall i fasiten, i figurer, i `svar` og i
  syntesen skal stemme med hverandre til siste siffer som vises.
- Tallene skal kunne regnes i hodet: runde forutsetninger, få desimaler.
- **Norsk bokmål.** Fagtermene på engelsk der de faktisk sies i rommet:
  *issue tree*, *MECE*, *cost-to-serve*, *payback*, *business case*, *RevPAR*,
  *failure demand*. Ellers norsk.
- **Norsk tallformat:** mellomrom som tusenskille (1 250), komma som desimaltegn
  (3,5), ekte minustegn (−), gangetegn (×). «prosent» i løpende tekst, «%» er greit
  i formler og tabeller.
- **Oppdiktede selskaper** med norsk setting. Ikke bruk ekte selskapsnavn som
  klient. Påstander om ekte regelverk, støtteordninger eller satser: bare hvis du
  er sikker, ellers legg dem inn som klientens opplysninger («Klienten oppgir at …»).
- Bruk norske ankere der det gir mening: 5,63 mill. innbyggere, 2,65 mill.
  husholdninger, 207 800 bedrifter med ansatte (se kapittel 15).
- Korte setninger. Ingen fyllord. Skriv som en erfaren konsulent som forklarer til
  en dyktig student.

## Mekanismen må være ny

Regelen fra resten av biblioteket gjelder: **en ny case av en type som finnes, må
ha en annen mekanisme.** Disse finnes fra før:

| Type | Mekanismer som er tatt |
|---|---|
| Lønnsomhet | isoler én driver i profitt-treet (kino) · vektet snitt og varemiks (apotek) · prisetterslep etter kostnadssjokk (vaskeri) · fordelte mot unngåelige kostnader i et tapssegment (møbel) |
| Markedsinngang | breakeven oversatt til markedsandel (lading i Sverige) |
| Vekst | inntekt per kunde faller i miksen (regnskapsprogram) · kannibalisering og samme-butikk-vekst (hurtigmat) |
| Kostnadskutt | kutt som fjerner arbeid mot kutt som bare flytter det (skadeforsikring) |
| Offentlig | effekt per krone mot en sammenligningsgruppe (arbeidsmarkedstiltak) |
| Prising | verdibasert prising av velferdsteknologi · prisstruktur framfor nivå (padel) |
| Operations | flaskehals (lakseslakteri) · variabilitet og kø (veihjelp) |
| Digitalisering | failure demand, og gevinst vektet etter tid, ikke antall (PwC: kundesenter med KI) |

PwC-casene la til disse, som heller ikke skal gjentas:

| Type | PwC-mekanisme |
|---|---|
| Lønnsomhet | cost-to-serve i nettkanalen: frakt og returer gjør små ordrer ulønnsomme (sportskjede) |
| Kostnadskutt | gapet sitter i kompleksitet, ikke i farten; samordne før automatisering, J-kurve og payback, og frigjort tid er ikke spart kostnad (sjømatkonsern) |
| Vekst | fyll kapasiteten som står tom i lavsesongen før du bygger ny (hotellkjede) |
| Markedsinngang | adresserbart marked er en brøkdel, og monteringskapasitet binder; inngangsmåten er beslutningen (strømselskap og solceller) |
| Offentlig | etterspørselsdrevet vekst: bøy behovskurven, og gevinsten er unngått kostnad (hjemmetjeneste) |

## Kontroll før du leverer

```
node tools/sjekk-caser.js --fragment fag/case/_pwc/NN-kortnavn.js
```

Null feil. Så leser du casen én gang til som kandidat: kan hvert spørsmål
besvares med det som står i materialet og i svarene intervjueren har gitt så langt?
Står det et tall i fasiten som ikke kan utledes fra noe kandidaten har fått?
