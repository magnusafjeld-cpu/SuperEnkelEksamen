---
tags: [arkitektur, moduler, pedagogikk]
oppdatert: 2026-10-29
---

# Moduler og visninger

15 moduler + Konto. Faget kan slå av hvilke som helst via `modules` i
[[Fagregisteret]]; Dashboard er alltid med.

| Modul | Rute | Hva den gjør |
|---|---|---|
| Dashboard | `/` | Dagens økt, kjernepensum, eksamenstrening, repetisjon i dag, neste milepæl, kommende temaer. Ingen samlet fremdrift |
| Studieplan | `/plan`, `/day/:n` | Dagene bygget pedagogisk: rammeverk → måling → vekst → kort sikt → repetisjon. «X av N fullført» øverst |
| Pensum | `/curriculum`, `/chapter/:num` | Kapitlene som rene artikler; marker *lest* / *forstått* / *usikker* |
| Kjernepensum | `/kjerne`, `/kjerne/:num`, `/kjerne/husk` | Det viktigste i faget på én kveld, i deler bygd rundt eksamensblokkene, med sjekker og en minicase etter hver del |
| Lynlæring | `/lyn` | 13 minispill for mobil, 2–5 min |
| Quiz | `/quiz` | Trekker fra hele pensum, blander gammelt og nytt. Flervalg, kortsvar og sant/usant (et flervalg med nøyaktig alternativene «True» og «False», som i FIE459) |
| Flashcards | `/flashcards` | Spaced repetition |
| Dybdetrening | `/dybde` | Selvrettede spørsmålsbanker |
| Oppgavebank | `/oppgaver` | Alle oppgaver med fasit, søk- og filtrerbare |
| Eksamenstrening | `/exam` | Tidligere eksamensoppgaver koblet til temaer og repetisjon |
| Eksamenssett | `/sett` | Hele sett, i øvingsmodus eller på tid — se [[Eksamenssett-modulen]] |
| Repetisjon | `/review` | Hva du bør repetere nå |
| Søk | `/search` | På tvers av begreper, formler, figurer, økonomer, variabler |
| Kapitteloppgaver | `/kapitteloppgaver`, `/kapitteloppgaver/:num`, `/kapitteloppgaver/:num/:oppg` | Oppgaver i fagets eksamensformat per kapittel: flervalg med fasit med en gang (FIE432) eller åpne oppgaver med løsning og sensorkriterier (FIE402) |
| Sjangertrening | `/sjangre`, `/sjangre/:id`, `/sjangre/:id/:n` | Én stige per oppgavesjanger, fra null til eksamensnivå: teori, eksempel og én flervalgsoppgave per steg. Bare FIE402 foreløpig |
| Problem sets | `/problemsett`, `/problemsett/:id`, `/problemsett/:id/:nr` | Øvingssettene fra kurset, med fire hint per delspørsmål og fasit bak en knapp. Bare FIE402 foreløpig |
| Eksamenstrening | `/trening` | Stor flervalgsbank i eksamensformat. Velg temaer og antall, få kort fasit med en gang og full gjennomgang på knapp |
| NotebookLM | `/notebooklm` | Pensum som ren tekst, ett kapittel per kilde, med kopiknapp — se under |
| Konto | `/konto` | Innlogging, synkstatus, «Nullstill fremdrift» og «Last innhold på nytt» |

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

**Én oppgave om gangen.** `/kapitteloppgaver/:num` er en velger: hver oppgave
med tema, poeng og status (ikke startet, løsning åpnet, vurdert, eller riktig og
galt for flervalg). Selve oppgaven løses på `/kapitteloppgaver/:num/:oppg`
(1-basert), med forrige og neste og «oppgave 2 av 4» øverst. Før lå alle
oppgavene under hverandre, og da var det vanskelig å se hvilken man var på.
Resultatkortet ligger på velgeren når settet er ferdig.

Settet vises tre steder: i menyen under Øving, som liste over alle kapitler, og
som **et kort nederst på selve kapittelsiden** — oppgavene skal tas rett etter
lesingen, og da må de ligge der kapitlet slutter, ikke bare i en meny brukeren
må huske å oppsøke.

### Eksamensvekt i hele appen

Fag med `examWeights` i manifestet får fem prikker ved hvert kapittel i pensum,
i studieplanens kapittelrader, i kapitteloppgavene, i kjernepensum (tyngste
kapittel per del) og i NotebookLM, der de sier hvilke kapitler som er verdt å
legge inn som kilde først (lagt til 28. september 2026). På kapittelsiden står
vekten og begrunnelsen som tekst, fordi mobil ikke har hover. `examWeightsNote`
i manifestet er forklaringen som vises over prikkene. Den er fagspesifikk, fordi
FIE402 vekter mot sensor og FIE432 mot flervalgsæraen. Hjelperen er
`S.u.vektmerke(num)`.

**Repetisjonsmotoren bruker vekten** når den finnes: vekt 5 gir +32, 4 gir +22,
3 gir +12 og 2 gir +4, og vekt 4–5 gir grunnen «Tungt på eksamen». Fag uten
vekter bruker fortsatt frekvensen fra koblede eksamensoppgaver (fallgruve 7u).

### Åpen oppgavetype

FIE402 eksamineres som åpne oppgaver, så en oppgave med `open: true` har ingen
`options`, `answer` eller `traps`. Den har i stedet `solution` og minst to
`criteria` i ren tekst. Du skriver svaret, åpner løsningen og gir deg selv poeng
i fire trinn av maks. Svaret lagres som `{ svar, score }` under oppgavens id, der
`score` er `null` til du har vurdert deg selv. Er *alle* settene i faget åpne,
bytter listevisningen introtekst, fordi én felles tekst ville vært feil for det
ene faget.

**Løsningen åpnes én deloppgave om gangen.** Etter «Vis løsningen» ser du bare
(a), og «Vis (b)» åpner neste, så du kan rette hver del før du ser den neste.
Kriteriene og poenggivingen kommer først når alt er vist; «Vis hele løsningen»
hopper dit. «Angre (b)» skjuler bare den siste delen som ble vist, også etter
«Vis hele», så lenge du ikke har gitt deg poeng. «Nullstill oppgaven» fjerner
svar, løsning og poeng. Motoren deler løsnings-HTML-en ved avsnitt som *begynner* med fet
«(a)», «(b)» … **i rekkefølge**. «(a)(ii)» er fortsatt (a), og et romertall som
«(i)» inne i (c) starter ingen ny del. Tekst før (a) følger (a). Derfor må hver
deloppgave i en løsning åpne med `<p><b>(x) …` — ellers slås den sammen med
forrige. Hvor langt du har klikket, huskes bare i minnet; en oppgave du har gitt
deg poeng på, vises hel.

To ting motoren gjør som innholdet ikke skal tenke på:

- **Tabeller pakkes i en rullboks** ved visning, med `S.u.rullTabeller()`, samme
  hjelper som kapittelvisningen bruker. Uten den kunne en løsningstabell med
  sju kolonner dra hele siden sidelengs på telefon (fallgruve 7i).
- **«Besvart» teller bare oppgaver som finnes nå.** Fjernes en oppgave eller får
  den ny id, blir det gamle svaret liggende i lagringen. Da sto kapitlet som
  påbegynt uten at noen av dagens oppgaver var besvart (fallgruve 7s). En
  oppgave som skrives om, får derfor ny id i stedet for å arve den gamle.

Kapitlene skrives hver for seg i `fag/<id>/_kapoppg/kN.js` og settes sammen med
`python3 tools/bygg-kapoppgaver.py <fag>`. Kontrolleres med
`node tools/sjekk-kapitteloppgaver.js <fag>`.

**Hvor mange oppgaver et kapittel skal ha, følger eksamensvekten.** Kontrollen
advarer når et kapittel har færre enn målet for vekten sin. Standardmålet er
5/3/3/2/1 for vekt 5 til 1, laget for lange åpne oppgaver som i FIE402, og et
kapittel kan også innfri det med poeng. Et fag med korte flervalgsoppgaver setter
`kapoppgPerVekt` i manifestet. FIE432 har `{ 5: 20, 4: 15, 3: 10, 2: 8, 1: 6 }`,
og der teller bare antallet, siden alle oppgavene er på 3 poeng.

**En oppgave kan ikke vise til en annen.** Kontrollen avviser «som over»,
«forrige oppgave», «samme marked som», «as above» og lignende, fordi oppgavene
vises én om gangen (fallgruve 7v). Hver oppgave gjentar tallene den trenger.

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

## Sjangertrening: én oppgavetype fra null til eksamen

Magnus ba om den 22. oktober 2026, etter et opplegg han likte i FIE432: dele
eksamensoppgavene i sjangre og lage et fullt opplegg per sjanger som starter som om
han ikke kan noe og ender der han kan svare på nesten alle oppgaver i sjangeren.

**Hvert steg har samme form:** kort teori om ett nytt begrep, et lite talleksempel med
pene tall og én flervalgsoppgave med fire alternativer. Etter svaret: riktig eller
galt, utregningen steg for steg, en kontroll og hvilken typisk feil hvert galt
alternativ er laget av. Stigen er 10–14 steg; de siste er bygd som de virkelige
eksamensoppgavene i sjangeren, med nye tall.

**Ingen minuspoeng og ingen «stå over».** Et galt svar kan prøves på nytt, men det
første svaret huskes (`forste`), så stigen skiller «riktig» fra «riktig etter nytt
forsøk». Lagring per steg: `exams["sg:<steg-id>"] = { v, forste, t }`.

**Tre sider:** sjangrene etter eksamensvekt, stigen i én sjanger med status per steg og
«Fortsett med steg n», og ett steg per side med prikker for hele stigen øverst.
Tastatur: A–D eller 1–4 svarer, N/→ og P/← blar.

Motoren er `js/bundle-sjangre.js`, dataene `EDU_DATA.sjangre`, bygget fra
`fag/<fag>/_sjangre/NN-<id>.js` med `python3 tools/bygg-sjangre.py <fag>` og kontrollert med
`node tools/sjekk-sjangre.js <fag>`. Fasitposisjonene er trukket på forhånd
(`_sjangre/fasitplan.json`). Spesifikasjonen er `docs/fie402-sjanger-spek.md`.

**FIE432 fikk samme modul samme dag**, på norsk (`docs/fie432-sjanger-spek.md`). Kontrollen
sjekker komma foran både «and» og «og».

**Publiserte stiger kortes ned uten å miste svar.** Da FIE402 ble kortet ned fra 14 til
9–11 steg (96 i alt), beholdt hvert uendret steg id-en sin, og kuttede steg forsvant. Et
steg som slås sammen eller skrives om slik at oppgaven eller fasiten endres, får neste
ledige nummer. Id-ene står derfor ikke i rekkefølge i stigen, og fasitplanen er nummerert
etter id-nummeret, ikke plassen. Kontrollen godtar det. I praksis ble det bare kutt og
flytting av teori; ingen steg trengte ny id.

**Antall steg følger sjangeren, ikke et fast tall.** Magnus ba om det etter at alle
FIE402-stigene fikk 14 steg (briefen sa 10–14). Retningen er færre: typisk 8–12, større
hopp der begrepet er lett. Kontrollen varsler bare over 16.

**Lengdesjekken gjelder bare utsagnsalternativer.** Første versjon telte også
tallalternativer, og telte uavgjort som «fasiten er lengst». En agent holdt derfor
riktige prosenter ensifret, og «det tosifrede er aldri riktig» ble en ny avsløring.
Nå teller bare et utsagnsalternativ som er strengt lengst.

## Problem sets: øvingssettene fra kurset, med hintstige

`/problemsett` viser settene kurset deler ut underveis (FIE402 Problem Set 1 er
det første). Motoren er `js/bundle-problemsett.js`, dataene
`EDU_DATA.problemsett` (for FIE402 i `fag/fie402/problemsett.js`).

**Hintstigen.** Hvert delspørsmål har fire hint som blir gradvis mer konkrete:
retning, verktøy, oppsett og til slutt oppskriften uten tall. Ett trykk viser
neste trinn, «Skjul hint» starter på nytt. Fasiten ligger i en egen
`<details>` under. Poenget er å komme seg videre i en oppgave du står fast i
uten å se fasiten for tidlig. Navnene på trinnene kan settes per sett
(`trinn`).

**Tre sider.** Oversikten over settene, ett sett med alle oppgavene (filter på
stjernene: tutorial, forelesning, egen trening) og én oppgave om gangen med
forrige og neste. Filteret gjelder også når du blar, så «neste» er neste
oppgave av samme slag.

**Lagring per oppgave:** `exams["ps:<settId>:<nr>"] = { ferdig, hint: { a: 2 },
fasit: { a: 1 }, t }`. Hintnivået og åpnet fasit huskes, og «Marker som
ferdig» gir framdriften. Én nøkkel per oppgave, så to enheter ikke overskriver
hverandres oppgaver i synken.

**Formelarket** er ikke en del av settet. FIE402 har allerede eksamensarket
bak knappen nederst til høyre på alle sider (se under).

**Nytt sett:** legg et objekt til i `EDU_DATA.problemsett` med ny `id` og
`nr`. Id-en og oppgavenes `nr` er lagringsnøkler og må aldri endres. Tekster
med HTML ligger som malstrenger; `.calc` er et utregningsfelt i fast bredde, og
`.f` en formel i teksten.

## Kjernepensum — det viktigste på én kveld

`/kjerne` er en kort lesevei ved siden av den fulle manualen. Magnus ba om den
28. september 2026: noe man kan lese på kort tid og da ha god forståelse av det
som kommer på eksamen, enten før man prøver seg på eksamensoppgaver selv, eller
når det er kort tid igjen. **Det er greit å ikke kunne hele pensum etterpå,
men ikke å mangle noe sentralt.** Den avveiningen er hele jobben.

**Delene følger eksamensblokkene, ikke kapitlene.** FIE402s del 4 (WACC, APV og
FTE) kondenserer k2 og k17–k20, fordi eksamen spør om dem som én oppgave. Hver
del viser til kapitlene den korter ned, som lenker øverst på siden.

**Teksten er en nedkorting av manualen, ikke nytt stoff** (se
[[Beslutningslogg]]). Eksemplene i teksten er ofte manualens egne, med de
kontrollerte tallene. Minicasene har nye tall, så de tester og ikke gjenkjenner.

**Hver del starter med «Kort fortalt»** («In short» i FIE402): en boks med
fire til sju enkle setninger om hva delen handler om, før `lead-in` med
eksamensstatistikken. Magnus ba om den 7. oktober 2026, for at man ikke skal starte
helt fra null på det man leser. Den er `<div class="callout kort">`, og
`tools/sjekk-kjerne.js` krever nøyaktig én, først i teksten (ikke i del 0, som selv er
oversikten).

Hver del har tre ting etter teksten:

| Del | Hva | Lagring |
|---|---|---|
| Sjekker | 2–4 flervalg med forklaring, fasit med en gang. Tester forståelse, ikke pugg: retning på en feil, hvilken rente, hva som skjer med kursen | `sjekk: { <id>: indeks }` |
| Minicase | En kort oppgave i **fagets eksamensform**, ~10 min. Åpen i FIE402: 2–3 deloppgaver, skriv svaret, åpne løsningen del for del, gi deg selv poeng. Flervalg i FIE432: felles oppgavetekst og tre ledd med fire alternativer, +3/−1/0, «stå over» og fellene | `valg: { <id>: { svar, score } }` eller `valg: { <ledd-id>: indeks \| −1 }` |
| «Must know»-boksen | Nøyaktig én `<div class="callout tip husk">` sist i teksten, 3–5 punkter. Del 0 har også én, med de fem sjekkene, så hovedpunktsiden definerer dem | — |

Alt ligger under `state.exams["kjerne-<del-id>"]`, sammen med `lest`. En del er
**ferdig** når den er markert lest, sjekkene er besvart og minicasen er vurdert.

**`/kjerne/husk` samler alle «Must know»-boksene** på én side, som et
timinutters ark til siste dag. Derfor må hvert punkt stå på egne ben.

**Tidsestimatet regnes, ikke skrives**: 110 ord i minuttet for teksten, ett
minutt per sjekk, og minicasens egne minutter. Samme tall står i motoren og i
kontrollen, så de sier det samme.

**Henvisninger:** «k17» i teksten blir en lenke til kapitlet og «kj4» en lenke
til delen, begge med tittelen synlig. Leseren av kjernepensum har ofte ikke
vært i manualen, så koden alene sier ingenting.

Mobilnavigasjonen har ikke plass, så **dashbordet har et eget kort** som peker
på neste del som ikke er ferdig.

**Minicasen følger eksamensformen, og motoren har begge.** `case` med
`open: true` er den åpne formen; `case` med `ledd: [...]` er flervalgsformen,
der hvert ledd har samme felt som en flervalgs-kapitteloppgave (`options`,
`answer`, `traps`, `solution`, `points`). Delens status regner minuspoengene
selv, så «minicase −1/9» er et mulig resultat, og «Ta minicasen på nytt» fjerner
bare leddene.

Motoren lånte begge formene fra kapitteloppgavene i stedet for å skrive dem på
nytt: `S.views.kapitteloppgaver.åpenOppgave(nøkkel, oppgave)` og
`S.views.kapitteloppgaver.flervalg(nøkkel, oppgave)`. En nøkkel som begynner med
en bokstav («kjerne-kj3»), brukes som den er; et kapittelnummer blir
«kapoppg-N» som før. Minuspoengregelen er dermed den samme i begge moduler.

Data i `EDU_DATA.kjerne`, bygget fra `fag/<id>/_kjerne/kjN.js` med
`python3 tools/bygg-kjerne.py <fag>` og kontrollert med
`node tools/sjekk-kjerne.js <fag>`. Kontrollen tar også enkeltfragmenter, og
sjekker fasitposisjonene mot `_kjerne/fasitplan.json` (fallgruve 7c).
Forfatterspesifikasjonene er `docs/fie402-kjerne-spek.md` (åpen minicase, engelsk),
`docs/fie432-kjerne-spek.md` (flervalgsminicase, norsk) og
`docs/fie459-kjerne-spek.md` (flervalg og sant/usant, engelsk).

**FIE459 (21. oktober 2026)** har åtte deler og rundt 7 800 ord. Eksamen er flervalg
og sant/usant, så minicasen har to flervalgsledd og ett sant/usant-ledd
(`options: ["True", "False"]`). Kontrollen godtar sant/usant i sjekker og ledd og
måler balansen sanne/usanne for seg. Ingenting i kildene sier at eksamen gir
minuspoeng, så manifestet setter `wrongFactor: 0`: feil svar gir 0, «stå over»
skjules, og introen sier «svar på alt». Regelen bor i kapitteloppgavenes `fagWf()`,
som kjernepensum låner, så FIE432 er uendret.

### Symbolene i formlene

I kjernepensum har hvert symbol i formellinjene (`.formula .eq`) en svak prikket
understrek. Musepeker over viser hva det står for; på telefon gjør et trykk det
samme. Magnus ba om det 8. oktober 2026 for FIE402, og dagen etter for FIE432.

Motoren er `js/bundle-symboler.js`, og innholdet er `fag/<fag>/symboler.js`
(`EDU_DATA.symboler`). Teksten i delene er urørt: motoren finner symbolene når
delen tegnes. Et symbol er en bokstavgruppe med senket og hevet skrift rett
etter, som nøkkelen «r_U» eller «V^L_t». Oppslaget prøver full form, så uten
senket, så uten hevet, så grunnformen, så «FCF» dekker FCF_1 og FCF_t.

**Samme bokstav betyr ulike ting i ulike deler.** C er en kjøpsopsjon i kj7, en
kontantstrøm i kj9 og en kostnad i kj11; T er løpetid i kj7 og målselskapet i kj10.
Derfor har ordlisten `deler.<id>` som slås opp før `alle`. «E[» er E foran en
hakeparentes, altså forventningen og ikke egenkapitalen; «E(» og «U(» er det
samme med vanlig parentes, som FIE432 bruker (E(r<sub>p</sub>), U(W)).

**Norske formler har ord, og ordene har æ, ø og å.** Første versjon kjente bare
A–Z, så «lån» ble til «l» og «n», og «n» kunne fått forklaringen «antall
terminer». Bokstavklassen har nå æøå, og en kombinerende strek hører til
bokstaven (t̄ er ett symbol). FIE432s ordliste har derfor en lang `ikke`-liste med
ordene i formlene («bunnfradrag», «skattesats»), og egne betydninger per del der
bokstavene kolliderer: B er bunnfradraget i kj1 og kj3, men pensjonsbeholdningen
i kj9; L er et lån i kj6 og kj10 og et tap i kj11.

`node tools/sjekk-symboler.js <fag>` leser formlene likt med motoren og gir FEIL
for alt i en formel som verken er forklart eller står i `ikke` (vanlige ord som
«max» og «payoff»). `--liste` viser hva hvert symbol forklares med i hver del,
`--bare <del-id>` sjekker én del, og `--ekstra utkast.json` fletter inn et utkast
så flere kan skrive forklaringer parallelt. Endrer du en formel, kjør den.

**Sjangertreningen og formelarket (22. oktober 2026).** Magnus ba om å kunne holde
over tegn også der. I kjernepensum merkes fortsatt bare formellinjene. I
sjangertreningen merkes hele steget med `merk(rot, "sg-<sjanger>", { overalt: true })`:
alt i formellinjene, men i løpende tekst bare det som sikkert er et symbol (senket
eller hevet skrift, gresk bokstav, forkortelse med store bokstaver, E[, eller en
enkelt bokstav med et regnetegn rett ved siden av). Ellers ville «A firm» og «I» fått
forklaringer. «(d)» som deloppgave merkes ikke. Svaralternativene står i knapper og
merkes aldri, for et trykk på symbolet ville også valgt alternativet.

Hver sjanger har egne betydninger (`deler.sg-<id>`), fordi bokstavene skifter mening:
S er aksjekursen i opsjoner og synergiene i fusjoner, K innløsningskursen i opsjoner og
pålydende i agentproblemet. Formelarket har `deler.formelark` (formeldelen av hver rad,
uten navnet) og `deler.formelark-liste` (lista «Står ikke på arket», der C og P er
opsjoner). Nøkler med senket skrift skiller betydninger på samme ark: C alene er
kontantstrømmen, C_u opsjonsverdien i opptilstanden.

## Eksamenstrening — mange spørsmål, fasit med en gang

`/trening`, `js/bundle-trening.js`. Magnus ba om den 9. oktober 2026 for FIE432:
«en stor mengde med spørsmål i samme format og vanskelighet som de som kommer på
eksamen», med valg av antall og tema (ett, flere eller alle), en kort fasit med en
gang og en knapp for en grundig gjennomgang «slik at man kan virkelig forstå det om
man ikke kan det fra før». Like spørsmål med nye tall var eksplisitt greit.

**Hvorfor ikke kapitteloppgavene:** de er et lite, fast sett per kapittel, ment
rett etter lesingen. Her er banken stor (754 i FIE432), temaene kan blandes slik
eksamen gjør, og regnespørsmålene finnes i mange varianter.

**Flyten.** Oppsettet har temakort (eksamensvekt som prikker, hvor mange du har sett
og hvor mange du fikk riktig sist), antall 10/20/30/50 og tre utvalg: «Nye først»
(aldri sett, så bommet, så resten), «Bare de jeg bommet på» og «Helt tilfeldig».
Antallet fordeles på temaene etter eksamensvekten, minst ett per tema. En runde er
ett spørsmål om gangen med +3/−1/0, «Stå over» og «Angre svaret» for bomtrykk. Etter
svaret kommer den korte fasiten; «Vis full gjennomgang» åpner forklaringen, fellene
per galt alternativ og lenker til kjernepensumdelen og manualkapitlene. Tastatur:
A–D, S, F, Enter. Resultatet viser poeng med og uten minuspoeng, per tema, og en
gjennomgang du kan åpne spørsmål for spørsmål.

**Hurtiginnføring per tema.** Hvert temakort har en knapp som åpner et lite
vindu med hva temaet tester, formlene du må kunne og de typiske fellene, og en
knapp for å øve på bare det temaet. Underveis i en runde åpner temamerket og
«Les mer» i gjennomgangen det samme vinduet. Magnus ba om det 9. oktober 2026:
«veldig kort hva den tester og hva formlene man må huske er». Innholdet er
`intro` på hvert tema i `_trening/temaer.py`, en kortversjon av «Må kunne»-boksene
i kjernepensum. Formlene settes som `.formula .eq`, så symbolforklaringen virker
også der. Psykologi har begreper i stedet for formler (`formeltittel`).
Kontrollen sjekker språk og HTML i innføringene. Mens vinduet er åpent, svarer
ikke A–D på spørsmålet bak det.

**Hjelp før du svarer, i tre trinn.** Hvert spørsmål har en «Hjelp»-knapp (tasten H)
ved siden av «Stå over». Første trykk viser temaet (hvilket begrep spørsmålet handler
om), neste regelen eller formelen. Det tredje viser fremgangsmåten uten tallene, så du
regner selv. Trinnene du har åpnet, står resten av runden. Magnus ba først om én hjelp
som «i stor grad egentlig gir fasit, men ikke med tall» (9. oktober 2026). Trinnene
kom 15. oktober etter mønster fra øvingsguiden til MC-testen. Dataene er `hint: [tema,
regel]` og `hjelp` (fremgangsmåten), skrevet med `hjelp3(tema, regel, oppsett)` i
`_trening/`. Et svar lagres med `h` = antall trinn som var åpne. Et riktig svar med
hjelp regnes som ikke mestret: det kommer tilbake under «Nye først» og «Bare de jeg
bommet på». `sjekk-trening.js` stopper hint og hjelp som inneholder tall fra
alternativene, store tall eller desimaltall fra spørsmålet, eller teksten i det
riktige alternativet; kursets faste satser er unntatt. Spesifikasjonen er § 2b og
§ 2c i `docs/fie432-trening-spek.md`.

**«Prøv igjen først».** Et valg i oppsettet ved siden av utvalget. Svarer du feil,
vises bare fella for alternativet du valgte, uten fasiten. Så prøver du et annet.
«Vis fasiten» gir opp. Poengene og loggen teller første svar, så modusen endrer ikke
hva som regnes som mestret. Fasithodet sier «riktig på forsøk N». Resultatet
viser «riktig på første forsøk uten hjelp» og hvor mange du fikk på et senere
forsøk. Fordi fellene vises før fasiten, stopper kontrollen en felle som nevner
teksten i det riktige alternativet eller et tall som bare står der.

**«Ny variant».** Etter et svar på et regnespørsmål kan du ta en ny variant av samme
familie med en gang (tasten V). Den settes inn rett etter spørsmålet du står på, og
varianter du ikke har sett kommer først.

**«Øv mer på denne».** Magnus ba 16. oktober 2026 om å kunne merke et spørsmål
«som en oppgave man må øve mer på slik at man lett finner tilbake til den». Stjernen
«☆ Øv mer» står øverst på spørsmålskortet og i gjennomgangen etter runden (tasten M).
Merkede spørsmål finnes tre steder: utvalget «Bare merkede» i oppsettet, kortet «★
Merket for øving» under oppsettet (start alle, eller åpne og fjern dem ett og ett), og
knappen «Øv på de N du merket» i resultatet. Dashbordkortet teller dem. Markeringen
ligger i en egen nøkkel, `"trm:<id>" = { m, t }`, ikke i `"tr:<id>"`. Ellers ville et
merket spørsmål telt som sett. Da ville «Nye først» hoppet over det. Å fjerne merket
skriver `m: 0` i stedet for å slette nøkkelen, fordi synken slår sammen nøkler og
ville hentet tilbake en slettet markering fra den andre enheten.

**Familier.** Varianter av samme regnestykke har samme `fam`, og én runde tar bare
én fra hver familie så lenge utvalget rekker. Ellers ville fem like regnestykker på
rad sett ut som fem spørsmål.

**Lagring:** `state.exams["tr:<id>"] = { n, r, s, t, h }` per spørsmål, så sky-synken
slår sammen to enheter per spørsmål; `"trening:okt"` er runden (med `hjelp`,
`forsok`, `losst` og `gitt` per spørsmål) og `"trening:valg"` det du valgte sist,
også `feil: "fasit" | "igjen"`. Banken er 1,6 MB og lastes først når modulen åpnes
(manifest.lazy, se [[Arkitektur]]). Modulen har et kort på dashbordet og plass i
mobilmenyen, som nå kappes ved seks.

**Innholdet bygges, det skrives ikke for hånd i JS.** Spørsmålene skrives som
Python-moduler i `fag/<fag>/_trening/`, én per tema, og `tools/bygg-trening.py`
lager `fag/<fag>/trening.js`. Regnespørsmål er **familier**: små funksjoner som
trekker tall og regner svar, feller, kort fasit og gjennomgang av de samme
variablene, så aritmetikken er riktig per konstruksjon. Begrep, påstand, formel og
fakta er **statiske**. Byggeren stokker alternativene med jevn fasit på A–D, og
ingen tekst kan derfor si «alternativ B». Spesifikasjonen er
`docs/fie432-trening-spek.md`, hjelperne er `tools/trening_lib.py`.

| Verktøy | Hva det gjør |
|---|---|
| `python3 tools/bygg-trening.py <fag>` | bygger banken; `--bare <fil>` til et utkast, `--vis <familie>` skriver ut variantene |
| `node tools/sjekk-trening.js <fag>` | struktur, HTML, tankestrek, komma foran «og», bokstavhenvisninger, fasitposisjon, fasit lengst (7y), lengder |
| `python3 tools/trening-blind.py del/sammenlign` | blind kontroll: spørsmålene uten fasit ut, svarene inn, avvikene vist |

Se [[FIE432 Personlig økonomi]] for hvordan banken ble skrevet og kontrollert.

## Formelarket — alltid ett trykk unna

Fag som får utdelt et formelark på eksamen, har en rund knapp nederst til høyre
på alle sider, merket «ƒ Formelark». Den åpner et lite vindu med arket nøyaktig
slik det deles ut, og under det en kort liste over det som ikke står der og må
kunnes. Magnus ba om det for FIE402 28. september 2026: arket skal være like
tilgjengelig når du regner en kapitteloppgave eller et sett som på eksamen.

- **Data i faget, knapp i motoren.** `EDU_DATA.formelark = { tittel, kilde, html,
  ikkePaaArket }` ligger i `fag/<id>/formelark.js`; `js/bundle-formelark.js`
  monteres fra `buildShell()` i `boot.js`. Fag uten formelark får ingen knapp.
- **Knappen og vinduet henger på `<body>`**, utenfor `.content`, så de overlever
  at visningen tegnes på nytt.
- **Lukkes** med krysset, Esc, et nytt trykk på knappen eller klikk utenfor; et
  klikk inne i vinduet lukker ikke.
- **Mobil:** knappen er bare ikonet og ligger over mobilmenyen, vinduet fyller
  bredden, og etikettene («Pre-tax WACC:») står på egen linje. `body.har-formelark`
  gir innholdet 150 px luft nederst, ellers dekket knappen «Neste oppgave →».
- `.fa-vindu[hidden]` må settes eksplisitt til `display:none`, ellers vinner
  `display:flex` over `hidden`-attributtet.
- `.brok` er en stablet brøk (teller over nevner), laget for arket.
- **(i) på hver formel** (lagt til samme dag): en rund (i) helt til høyre på raden
  viser hva formelen er og, under «When to use», når den brukes. Teksten ligger i
  fagdataene som en skjult `.fa-info-tekst` inne i `.fa-rad`; motoren flytter den
  ut, pakker formelen i `.fa-formel` og legger til knappen. Ett felles tips-element
  (`.fa-tips`, `position:fixed`, inne i vinduet så klikk på det teller som «inne»)
  plasseres under (i)-en, eller over når det ikke er plass.
  - Hover og tastaturfokus viser, et trykk fester, et nytt trykk skjuler. Esc tar
    tipset før vinduet. Scroll i arket og endret vindusstørrelse skjuler tipset.
  - **Hover reagerer bare på mus** (`pointerType === "mouse"`). På iOS sluker en
    hover-effekt som endrer siden det første trykket, så (i)-en ville trengt tre
    trykk for å lukkes.
  - `.fa-formel` har `overflow-y:hidden` og 3 px luft: brøkene stikker en piksel
    utenfor linjen, og uten det tegnet nettleseren et loddrett rullefelt i raden.

FIE402-arket er hentet ordrett fra `Formula sheet.docx` med en egen OMML-leser,
fordi Word-ligningene forsvinner med vanlige verktøy (samme felle som i FIE432).

## Varianter: sjakkrepertoar på brettet

Lagt til 16. oktober 2026 for et privat sjakkfag (`/linjer`, `js/bundle-sjakk.js`,
reglene i `js/sjakk-kjerne.js`). Motoren er fagnøytral og har ikke noe repertoar
selv; innholdet ligger i faget som `EDU_DATA.repertoar = { grupper, linjer }`.

- **Reglene** (`window.SJAKK`): stilling, lovlige trekk, SAN begge veier, FEN og
  `spill(trekkrekke)`. Ren JS uten DOM, så `tools/sjekk-sjakk.js` bruker de samme
  reglene i node. Testet med perft fra fem standardstillinger (start, Kiwipete og
  tre til), som dekker rokade, en passant, forvandling og sjakk:
  `node tools/sjekk-sjakk.js --perft`.
- **Lær**: en ny linje trekk for trekk med kommentarene, så «Spill den selv».
- **Øv**: du spiller dine trekk ved å trykke brikke og felt. Motstanderens trekk
  spilles etter et halvt sekund. Feil trekk gir melding, andre bom et hint (brikken
  som skal flyttes) og tredje svaret. Linjen lagres i `state.exams["sj:<id>"] =
  { boks, neste, n, feil, t }` med Leitner-bokser: feilfri flytter ett steg ut
  (1, 3, 7, 16, 35 dager). Feil gir boks 1 og i morgen. Linjen kommer da én gang
  til på slutten av økten.
- **Flytte brikker**: dra brikken, eller trykk brikke og så felt. Draget bruker
  pekerhendelser, så mus og finger virker likt. Brettet fanger pekeren først når du
  faktisk har begynt å dra (6 px): fanges den ved trykket, går klikket til brettet i
  stedet for feltet. Da slutter trykk-trykk å virke. Markeringene under draget settes
  rett i DOM-en uten ny tegning. `touch-action:none` på brettet hindrer at siden
  ruller mens du drar på telefonen.
- **Utforsk**: alle linjene i en gruppe som et tre, med kommentarene.
- **Diagrammer i pensum**: `<div class="sjakk-diagram" data-trekk="1.d4 d5"
  data-tekst="…" data-farge="b">` tegnes som brett av trekkene, via en
  MutationObserver. Ingen skriver FEN for hånd.
- Brikkene er Unicode-tegn med `\uFE0E`, ellers tegner iOS bonden som emoji.
  Størrelsen er `10cqw` (10 % av brettets bredde). Rutenettet er
  `repeat(8, minmax(0, 1fr))` i begge retninger. Med fast skriftstørrelse presset
  brikkene feltene utover på mobil. Da forsvant den åttende raden og kolonnen.

`tools/sjekk-sjakk.js <fag>` spiller alle linjene og diagrammene. Den stopper ulovlige
trekk, kommentarer til trekk som ikke finnes og to linjer med samme farge som svarer
forskjellig i samme stilling (da kan treneren bare godta det ene svaret).
Repertoaret kan deles i flere filer (`repertoar-*.js`) som skrives samtidig.

## Planleggeren: dagens plan på tvers av fagene (privat)

Lagt til 29. oktober 2026 som privat utvidelse (`fag/privat-planlegger/planlegger.js`,
gitignorert, lastes fra bøtta, se [[Supabase]]). Rute `#/planlegger` i alle fag,
gruppe Studieløp. Velg fag, eksamensdatoer, pensumfaktor, timer på hverdager og i
helgen og opptatte dager.

- **Måling.** I faget du står i lages et øyeblikksbilde: mestring per kapittel som
  vektet snitt av svarene, halvert vekt per 28 dager. Tidligere eksamensoppgaver
  teller mest: sett 4, eksamenstrening og sjangertrening 2,5, kapitteloppgaver 2,
  minicasene i kjernepensum 1,5, sjekkene 1, quiz 0,75, flashcards 0,5. Det du har
  lest, gir bare en svak start (0,25, eller 0,4 med kjernepensum lest): kan du
  stoffet uten å ha lest, viser oppgavene det. Bildet lagres, så planleggeren ser alle fagene selv
  om bare ett er lastet. Et fag du ikke har åpnet, står som «Ikke målt».
- **Regnemodellen.** Gjenstår = arbeidsmengde × faktor × gap til 85 % × (0,4 + 0,2 ×
  eksamensvekt), summert over kapitlene. Arbeidsmengden er tiden kjernepensum,
  sjangertrening, kapitteloppgaver og quiz for kapitlet tar; manualens ordtall
  brukes bare for kapitler uten noe av dette. Pluss opptil fire hele sett. Tempo =
  gjenstår / dager igjen. Dagens tid fordeles etter tempo, i kvarter etter største
  rest, med minst 90 minutter de to siste dagene før en eksamen. En eksamensdag
  trekker seks timer fra kapasiteten; resten går til de andre fagene. Et fag du kan godt,
  får dermed lite selv om eksamen er nær.
- **Oppgavene.** Generalprøve (nyeste ekte sett) tre dager før, ellers neste sett når
  det er under fire uker igjen eller mestringen er over 50 %. Så de svakeste
  kapitlene etter eksamensvekt × gap: sjangertrening, eksamenstrening,
  kapitteloppgaver og quiz først. Kjernepensum bare når kapitlet står svakt og har
  lite å måle på, aldri over 70 %. Manuallesing bare når kapitlet ikke har annet. Dagens plan står fast
  gjennom dagen, med avkrysning.
- **Tid.** Kjernepensum regnes til 50 ord per minutt pluss 1,5 minutter per sjekk og
  3 per minicaseledd, sjangertrening til 3 minutter per steg. En tidsfaktor per fag
  ganger opp alt unntatt hele sett og flashcards; FIE402 starter på ×2 fordi
  Magnus brukte minst dobbelt så lang tid som anslått. Tid per sjangersteg måles
  fra svartidspunktene (median av avstander mellom 30 sekunder og 30 minutter) og
  brukes i stedet for anslaget når det finnes minst åtte målinger.
- **Morgenen kl. 06.** Plandagen skifter kl. 06. Første gang appen er åpen etter
  det (eller når den blir synlig igjen), hentes raden fra skyen, faget måles, og
  Claude lager ny ukeplan hvis det er slått på og nøkkel finnes. Én gang per morgen
  på tvers av enheter; en feil vises i kortet og regnemodellen brukes. Ingen server:
  er appen ikke åpnet, skjer det ikke.
- **Claude.** «Lag ukeplan med Claude» sender tallene, dagene og notatet og får JSON
  tilbake. Appen kaster tid etter eksamen, skalerer ned dager over kapasiteten og
  faller tilbake på regnemodellen for dager som mangler. Hvorfor hybrid:
  [[Beslutningslogg]].
- **Kjent svakhet.** Ordtellingen i manualen er målet på pensum. FIE459-manualen er
  23 000 ord mot 105 000 i FIE402, så FIE459 trenger høyere pensumfaktor.

## Spør Claude: chat og vurdering med egen API-nøkkel

Lagt til 12. oktober 2026 (`js/bundle-claude.js`). Hver bruker legger inn sin egen
Anthropic API-nøkkel på Konto-siden eller i panelet. Nettleseren kaller Messages
API direkte. Forbruket går på brukerens konto. Hvorfor: [[Beslutningslogg]].

- **Chatpanelet.** Knappen «Spør Claude» nederst til høyre i alle fag (formelarkets
  knapp flyttes opp over den med `body.har-claude`). Vindu på PC, hele skjermen på
  telefon. Hver melding får med teksten i `.content` som en `<side>`-blokk: det som
  synes, det du har skrevet i feltene og hvilket alternativ som er valgt, riktig
  eller feil (klassene `.opt.sel/.correct/.wrong` blir til tekst). Står du på samme
  side som sist, sendes bare `<side samme="ja"/>`.
- **Lukkes** med krysset, Esc eller et trykk utenfor vinduet. Det er stedet trykket
  starter (pointerdown) som teller, siden knappene i vinduet tegner det på nytt og
  målet for click da er borte. Det er click som lukker, så rulling på telefonen ikke
  gjør det. «Fortsett i chatten» åpner vinduet fra utsiden, og det trykket hoppes
  over (`åpnetNå`).
- **Samtalen huskes i fem minutter** etter siste forespørsel, også når du bytter
  side eller laster på nytt (`localStorage["edu.claude.samtale"]`). Fem minutter er
  levetiden til Claudes cache. Etter det måtte hele samtalen sendes på nytt til full
  pris, så den glemmes i stedet. Neste spørsmål starter en ny samtale med siden du
  står på. Panelet viser klokkeslettet den glemmes. Magnus ba om dette 12. oktober 2026.
- **Vurdering av svar.** `S.claude.vurdering({ id, prompt, knapp, forklaring,
  forklaringUten, effort })` gir en boks som strømmer vurderingen inn. Brukt i
  case-spilleren og i de åpne kapitteloppgavene (FIE402 og minicasene i
  kjernepensum), der Claude er sensor og foreslår poeng mot kriteriene. Tilstanden
  lagres per `id` i minnet, fordi visningen tegnes på nytt når du setter poeng.
  Uten nøkkel kopierer boksen meldingen i stedet.
- **API-et.** Sonnet 5.5 som standard (Opus 5.5 og Haiku 5.5 kan velges), strømming,
  adaptiv tenking, `effort` medium i chat og high i vurdering, automatisk caching
  (`cache_control` på toppnivå) og `fallbacks: "default"` når sikkerhetsfilteret
  avslår. Samtalen er bare-legg-til: systemprompten fryses ved første melding og
  svarets innholdsblokker (med tenkeblokkenes signatur) sendes tilbake uendret. Da
  treffer cachen og tenkeblokkene er gyldige. Avviser API-et en signatur, prøves
  det én gang til uten tenkeblokker.
- **Forbruk.** Panelet viser et anslag for samtalen og måneden, regnet fra `usage`
  og listeprisene. Kontoen i Console er fasiten.
- **Nøkkelen sjekkes gratis** med `GET /v1/models/<modell>`, som ikke koster tokens.
- Markdown fra Claude tegnes av en liten egen `md()` som escaper alt først.
- **Rulling.** Lista følger bunnen bare så lenge du er der (`følger`). Ruller du
  opp mens svaret strømmer, blir du stående, også når svaret er ferdig og panelet
  tegnes på nytt. Den følger igjen når du ruller helt ned, sender en melding eller
  åpner panelet. Før 27. oktober 2026 dro hver ny tekstbit deg ned igjen.

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

### Kjernepensum som kilde (29. september 2026)

Fag med `/kjerne` får et eget kort øverst på siden, før kapitlene: «Hele
kjernepensum» som én kilde (~27 000 ord i begge fag) og så én rad per del.
Kjernepensum er kilden du vil ha når tiden er kort, derfor står det først.

- **Sjekkene og minicasen er med, med fasit og løsning.** En kilde som skal svare
  på spørsmål, må kunne forklare hvorfor et alternativ er feil. Åpen minicase
  (FIE402) gir `LØSNING` og `SENSORKRITERIER`; flervalgsminicase (FIE432) gir
  alternativer, `FASIT`, løsning per ledd og «Slik er de gale alternativene laget».
- **«Må kunne»-boksen** er `.callout.tip.husk` og får etiketten `MÅ KUNNE`, ikke
  `TIPS`. Manualene bruker ikke `husk`, så kapitteleksporten er uendret og
  `tools/manual-til-kilde.py` gir fortsatt samme tekst.
- **`k17` og `kj4`** er lenker i appen. I teksten får de tittelen i parentes,
  «kj4 (kjernepensum del 4: …)», ellers peker de på noe leseren ikke kan slå opp.
- **Radene har eksamensvekt** fra det tyngste kapitlet delen dekker, som i
  kjernepensumlista. «Hele kjernepensum» har ingen.

**Tallformatet i leseveiledningen følger faget.** Den sa «komma som desimaltegn»
for alle fag, men FIE402 og FIE459 har punktum. De to fagene setter nå
`copy.notebooklmTall` i manifestet; de norske fagene bruker standardteksten.

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

### Fremdrift: i hver modul, ikke samlet
Det finnes ikke lenger et samlet fremdriftstall. `S.metrics.readiness`, ringen
«% klar» på dashbordet og i sidemenyen, og Fremdrift-siden ble fjernet
28. september 2026. Hver modul viser sin egen fremdrift; se [[Beslutningslogg]]
for hvor den står. Quiz-historikken står nederst på Quiz-startsiden.

`S.metrics` har fortsatt `readPct`, `daysPct`, `quizStats`, `understoodCount`,
`nextMilestone` og `streak`. `streak()` teller sammenhengende dager bakover der
enten en dag ble fullført eller et kapittel sett.

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
