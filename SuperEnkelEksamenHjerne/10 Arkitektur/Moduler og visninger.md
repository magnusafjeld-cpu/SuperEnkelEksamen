---
tags: [arkitektur, moduler, pedagogikk]
oppdatert: 2026-09-09
---

# Moduler og visninger

15 moduler + Konto. Faget kan slå av hvilke som helst via `modules` i
[[Fagregisteret]]; Dashboard er alltid med.

| Modul | Rute | Hva den gjør |
|---|---|---|
| Dashboard | `/` | Dagens økt, prosent klar, fremdriftslinjer, neste milepæl, dagens konsepter |
| Studieplan | `/plan`, `/day/:n` | Dagene bygget pedagogisk: rammeverk → måling → vekst → kort sikt → repetisjon |
| Pensum | `/curriculum`, `/chapter/:num` | Kapitlene som rene artikler; marker *lest* / *forstått* / *usikker* |
| Lynlæring | `/lyn` | 13 minispill for mobil, 2–5 min |
| Quiz | `/quiz` | Trekker fra hele pensum, blander gammelt og nytt |
| Flashcards | `/flashcards` | Spaced repetition |
| Dybdetrening | `/dybde` | Selvrettede spørsmålsbanker |
| Oppgavebank | `/oppgaver` | Alle oppgaver med fasit, søk- og filtrerbare |
| Eksamenstrening | `/exam` | Tidligere eksamensoppgaver koblet til temaer og repetisjon |
| Eksamenssett | `/sett` | Hele sett, i øvingsmodus eller på tid — se [[Eksamenssett-modulen]] |
| Repetisjon | `/review` | Hva du bør repetere nå |
| Søk | `/search` | På tvers av begreper, formler, figurer, økonomer, variabler |
| Fremdrift | `/progress` | Statistikk, svakeste temaer, nullstilling, «last innhold på nytt» |
| Kapitteloppgaver | `/kapitteloppgaver`, `/kapitteloppgaver/:num` | Flervalg i eksamensformat per kapittel, med fasit med en gang |
| NotebookLM | `/notebooklm` | Pensum som ren tekst, ett kapittel per kilde, med kopiknapp — se under |
| Konto | `/konto` | Innlogging og synkstatus |

Sidepanelet grupperer dem som *Studieløp* / *Øving* / *Verktøy*. Mobilnavigasjonen
nederst viser seks: Hjem, Lyn, Plan, Quiz, Kort, Dybde. Konto-knappen ligger i
topplinja — på mobil er sidepanelet skjult, og da ville Konto vært uten inngang.

**Merker** i navigasjonen: antall forfalte flashcards, «må øve»-tellingen fra
dybdetrening, antall høyprioriterte repetisjonsforslag, og ⚡ hvis dagens lynøkt
ikke er tatt.

## Kapitteloppgaver — eksamensformatet, ett kapittel om gangen

`/kapitteloppgaver` gir et lite sett flervalgsoppgaver per kapittel, å ta rett
etter lesingen. Fire alternativer, ett riktig, og **minuspoeng for feil**: rett
gir full poengsum, galt gir `wrongFactor` × poengsummen (standard −1/3, altså
3 og −1), ubesvart gir 0.

**Hvorfor dette ikke er quizen om igjen.** Quizen trekker fra hele pensum og
sjekker om du husker. Dette sjekker om du kan *regne*, på ett kapittel, mens det
fortsatt er ferskt: flertrinns oppgaver med tall, der de tre gale alternativene
er laget av hver sin konkrete feil.

**Minuspoengene er poenget.** Fra 2026 koster et feil svar. Å la et alternativ
stå blankt er derfor en ekte strategi, og settet må trene den: et valgt
alternativ kan velges bort igjen, resultatet teller ubesvarte for seg, og
resultatkortet viser hva samme besvarelse ville gitt uten minuspoeng.

Datamodellen ligger i `EDU_DATA.chapterTasks`, med kapittelnummer som nøkkel:

```js
window.EDU_DATA.chapterTasks[5] = {
  minutes: 25,
  tasks: [{
    id: "k5-1",              // lagringsnøkkel — må aldri endres
    topic: "Skjerming", points: 3,
    body: "<p>…</p>",        // HTML
    options: ["…", "…", "…", "…"],   // nøyaktig fire
    answer: 2,
    solution: "<p><b>Steg 1 — …</b> …</p>",
    traps: [ "…", "…", null, "…" ],  // parallelt med options, null på fasiten
  }],
};
```

`traps` er den viktigste delen og den som skiller modulen fra en vanlig quiz:
én setning per galt alternativ som sier hvilken konkret feil alternativet er
laget av. Uten den lærer et galt svar deg ingenting.

Settet vises tre steder: i menyen under Øving, som liste over alle kapitler, og
som **et kort nederst på selve kapittelsiden** — oppgavene skal tas rett etter
lesingen, og da må de ligge der kapitlet slutter, ikke bare i en meny brukeren
må huske å oppsøke.

Kapitlene skrives hver for seg i `fag/<id>/_kapoppg/kN.js` og settes sammen med
`python3 tools/bygg-kapoppgaver.py <fag>`. Kontrolleres med
`node tools/sjekk-kapitteloppgaver.js <fag>`.

> [!warning] Fasitposisjonen styres på forhånd, ikke i etterkant
> Fallgruve 7c gjelder her mer enn noe annet sted, fordi dette *er*
> eksamensformatet. Da FIE402s drill ble skrevet av parallelle agenter, endte
> 161 av 246 riktige svar på indeks 1. Derfor får hver agent en **pålagt** liste
> over hvilket alternativ fasiten skal ligge på i hver oppgave, trukket fra en
> fast seed så fordelingen er jevn globalt og variert innad i kapitlet.
> Kontrollen avviser settet hvis fordelingen likevel skjever mer enn 35 %.

> [!info] Fire alternativer er ikke kosmetikk
> Kontrollen krever nøyaktig fire. Med tre er forventet verdi av blindt gjett
> +0,33 i stedet for 0, og hele gjettestrategien kapittel 19 lærer bort, blir
> feil.

## NotebookLM — pensum som ren tekst

`/notebooklm` gjør de lastede kapitlene om til ren tekst med en kopiknapp per
kapittel. Bruken er å lime pensum inn i noe som bare leser tekst: NotebookLM, en
språkmodell, et notat.

**Enheten er kapitlet, ikke delen.** Et kapittel er 2 000–5 000 ord og handler om
én ting; en hel del er opptil 20 000 og handler om fem. Skal teksten brukes som
kilde et sted som svarer på spørsmål, er det kapitlet som gir presise treff — og
det er kapitlet du selv tenker i når du leter. Delene grupperer bare visningen.
Hvert kapittel bærer sin egen leseveiledning, så det står på egne ben som kilde.

**Teksten genereres av manualen som er lastet nå.** Det er hele poenget med at
den bor i motoren og ikke som ferdige filer i repoet: rettes en regnefeil i et
kapittel, følger eksporten med av seg selv. En ferdigbygget tekstfil ville vært
utdatert fra første retting, og ingen ville oppdaget det.

Konverteringen er en oversettelse, ikke en stripping av tagger:

| I manualen | I teksten |
|---|---|
| `.formula` | `FORMEL:` ligningen, så `der:` |
| `.worked` | `GJENNOMREGNET EKSEMPEL — tittel` |
| `.callout mech/warn/tip/link/mistake` | `MEKANISME` / `ADVARSEL` / `TIPS` / `KOBLING` / `VANLIG FEIL` |
| `table.data` | pipe-tabell |
| `figure` | figurteksten pluss svg-ens `aria-label` |
| `<b>`, `<i>` | droppes — manualen utheder hvert svartall, og som markdown blir det tusen stjernepar støy |
| `<sub>`, `<sup>` | `_` og `^` |

Kapitler utenfor `coreChapters` holdes utenfor. For FIE432 er det k0
(kursintroduksjonen) og k20 (referansekapitlet), som ingen av delene har bruk for
som kilde. Fagets egne notasjonskonvensjoner legges i `copy.notebooklmNotasjon` og
havner i innledningen til hver bolk — FIE432 forklarer der hva `[dagens regel]`
og `[eksempeltall]` betyr.

`tools/manual-til-kilde.py` gjør det samme fra kommandolinjen og skriver til fil:

```
python3 tools/manual-til-kilde.py FIE432_Manual.html 5-8 ut.md
python3 tools/manual-til-kilde.py FIE432_Manual.html 0.1,1-2 ut.md
```

Spesifikasjonen er en kommaliste av kapitler, spenn og enkeltseksjoner. En
enkeltseksjon som `0.1` tas uten kapitteltittelen rundt seg, så en innledning kan
hentes ut av et kapittel man ellers ikke vil ha med. De to implementasjonene ble
sammenlignet tegn for tegn på Del I og Del II og er identiske.

> [!bug] Verktøyet kastet mellomrom, appen gjorde det ikke
> `html.parser`-versjonen droppet tekstnoder som bare var mellomrom. Manualen
> skriver `salgsverdien</b> <b>[dagens regel]</b>`, og mellomrommet mellom de to
> taggene er nettopp en slik node — resultatet ble `salgsverdien[dagens regel]`.
> Nettleserens DOM beholder den, så feilen fantes bare i Python-verktøyet, og den
> ble bare synlig fordi de to ble sammenlignet. Tre steder i Del II alene.

## De fire læringsmotorene

### Spaced repetition (`S.srs`)
Leitner-bokser med intervallene **0, 1, 3, 7, 16, 35 dager**. Karakterene er
`again` (tilbake til boks 0, teller et lapse), `hard` (samme boks, halvt
intervall), `good` (+1 boks), `easy` (+2 bokser). Boks ≥ 4 regnes som *mestret*.
Bunken består av fagets flashcards **pluss** ett kort per rad i formeltabellene
fra [[Pensumparseren]].

### Repetisjonsmotoren (`S.repetition`)
Poengsetter hvert kapittel og sorterer:

| Signal | Poeng |
|---|---|
| Markert som usikker | +55 |
| Dager siden sist sett (≥ 2) | +4 per dag, maks +32 |
| Ikke lest ennå | +8 |
| Sentralt eksamenstema | +9 per gang det er brukt i en tidligere eksamensoppgave (+6 hvis bare én) |
| Svak quizscore (< 70 %) | opptil +30 |
| Kapittel 13–19 | +6 — «Oppgave 3, historisk svakest» |

Prioritet: **høy** ≥ 55, **middels** ≥ 28, ellers lav. Hvert poeng kommer med en
begrunnelse som vises i grensesnittet — motoren forklarer alltid seg selv.

> Kapittel 13–19-regelen er SAM3-spesifikk og ligger i motoren. Se [[Fallgruver]].

### Fremdriftsmålet (`S.metrics.readiness`)
Vektet **dekning**, ikke treffprosent:

- 45 % kapitler lest
- 25 % dager fullført
- 18 % andel mestrede flashcards
- 12 % quizdekning (*riktige svar / totalt antall spørsmål* — ikke treffprosent)

Dette var en bevisst fiks: se [[Beslutningslogg]]. `streak()` teller
sammenhengende dager bakover der enten en dag ble fullført eller et kapittel sett.

### Søkeindeksen (`S.search`)
Bygges én gang og cachet. Indekserer kapitler (vekt 3), formler (2,2), begreper
(2), økonomer (2), variabler (1,8), seksjoner (1,5) og figurtekster (1,4).
Poeng gis for eksakt titteltreff, prefiks, delstreng og treff i brødteksten;
maks 40 treff.

## Lynlæring

`bundle-lyn.js`. 13 spill, hvert med en `ready()`-test mot fagets data — spill
uten nok innhold vises ikke i det hele tatt:

Lynquiz · Sant eller usant · Formel-lyn · Par-sprint · Skift eller glid? ·
Kjede · Hoderegning · Opp eller ned? · Forklar! · En skiller seg ut · Memory ·
Hvem er økonomen? · Dagens bit

Dagens økt er 3 spill (~4 min) og gir **+25 bonus-XP**. Nivåene:
Fersking (0) → Student (120) → Gruppelærer (320) → Seminarleder (650) →
Foreleser (1100) → Sensor (1700) → Nobelkandidat (2600).

## Kapittelhenvisninger merkes ved visning

Pensummanualen skriver kryssreferanser som bare **`k17`**. Det er kompakt for
forfatteren og ubrukelig for leseren: koden sier ingenting om hva kapitlet
inneholder, og verre — den ser ut som noe han burde kjenne igjen. FIE402 har 126
framoverreferanser, og 122 av dem ga ingen antydning om at stoffet kommer senere.

`merkKapittelhenvisninger()` i `js/bundle-views.js` løser det ved visning i stedet
for i teksten, så alle 335 referansene er dekket av én endring:

- **Bakover eller allerede lest** → en stille lenke, bare koden. Du vet hva det er.
- **Framover** → koden, kapitlets tittel, og merket «senere». På skjermer under
  560 px skjules tittelen, så chipen ikke flyter ut av linja.

Hva som regnes som lest er den samme leseposisjonen som lynøkta bruker: alt i
modulene til og med den du står i, pluss alt du har huket av. Merker du et kapittel
som lest, blir referansene til det stille umiddelbart.

Bare tekstnoder røres, og aldri inne i SVG, `<code>`, `<pre>` eller en eksisterende
lenke — ellers ville mønsteret kunne treffe inne i en formel eller et attributt.
Manualfila selv er urørt; dette er ren visning.

[[SAM3 Makroøkonomi]] bruker ikke konvensjonen og får null treff.

## Lynlæringens fremdriftsport

Uten port henter minispillene fra hele pensum fra dag én, så du kan få M&A-spørsmål
i modul 3. Fag som setter **`lynFollowsProgress: true`** i manifestet får i stedet
bare kapitler de har nådd:

> alt i modulene til og med den du står i, **pluss** alt du selv har huket av som lest

Alle pooler går gjennom den samme porten: sant/usant, skift, kjeder, opp/ned,
hoderegning, lynquiz, «Forklar!», «Dagens bit», og ordlisten (symboler og økonomer
filtreres på `chapters`-feltet sitt). Elementer uten kapittelmerking slipper gjennom.

**Formeltabellene er et unntak som måtte løses særskilt.** De bærer ingen
kapittelmerking i seg selv, så manifestet oppgir den med
`formulaTableChapters` — én liste per tabell, i samme rekkefølge som de står i
manualen. Uten kartet slipper alle formler gjennom, som før. Merk at rekkefølgen
allerede er bundet av at flashcard-id-ene er posisjonsbaserte: endres den ene, må
den andre følge med. Se [[Fallgruver]].

Et spill som ikke har nok åpnet innhold faller ut av rutenettet med teksten
«Åpnes når du har lest mer», og en boks over rutenettet sier hvor mange kapitler
som er låst opp og hvor mange spill som gjenstår. Det skiller «faget mangler dette
innholdet» fra «du har ikke kommet dit ennå».

For [[FIE402 Corporate Finance]] betyr det 3 spill i modul 1 og alle 13 fra modul 6.
[[SAM3 Makroøkonomi]] har ikke flagget og er uendret.

## Dybdetrening

`bundle-dybde.js`. Tre banker, filtrerbare på nivå og tema, med
«kunne / må øve»-vurdering som lagres per bank og mater «må øve»-merket i
navigasjonen. Se [[SAM3 Makroøkonomi]] for bankene som finnes.
