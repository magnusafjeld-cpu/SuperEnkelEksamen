---
tags: [drift, fallgruver, viktig]
oppdatert: 2026-09-09
---

# Fallgruver

Ting som har bitt før, eller som garantert vil bite. **Les denne før du endrer
noe.**

## 1. Byggnummeret

Endrer du `js/` eller `fag/` uten å bumpe `?v=N` i `index.html`, kjører telefonen
gammel kode i opptil ti minutter. Se [[Publisering og cache]].

## 2. Motoren må aldri snapshotte `EDU_DATA`

Fagets datafiler lastes **etter** motoren. `const plan = EDU_DATA.plan` på
toppnivå i en motorfil gir `undefined`. Bruk `S.data`-gettere. Feilen viser seg
først når faget velges, ikke ved lasting. Se [[Arkitektur]].

## 3. SAM3-lekkasjer i motoren — seks lukket, ni igjen

Kartleggingen 19. august 2026 fant **15** steder der motoren visste noe den ikke
burde. De seks som blokkerte et nytt fag er flyttet ut i fagmanifestet, med SAM3s
verdi som default — se [[Fagregisteret]]:

| Lukket | Var |
|---|---|
| `parts` | delinndelingen hardkodet i parseren |
| `coreChapters` / `reviewChapters` | kapittelspennene 1–23 og 1–22, som dessuten var innbyrdes inkonsistente |
| `dybdeBanks` | bankene `kort`/`lang`/`eksamen` med SAM3-beskrivelser |
| `manual.refSections` | `#k21`/`#k22`/`#k23` slått opp direkte |
| `problems.topicRules` / `.typeRules` | norske makro-regexer i oppgaveparseren |
| `EDU_DATA.lyn.hode` | ~230 linjer generert makroøkonomi inne i lynmotoren, alltid påslått |

`srs.deck()` sin `oppgLabel`-liste ble bare slettet — tabelltittelen fra manualen
var allerede riktig oppførsel.

**De ni som sto igjen** var kosmetiske, men synlige for et annet fag. Fem er nå
lukket — fire i gjennomgangen 31. august (se 7l) og tre til 3. september 2026,
da et fjerde fag skulle inn:

| Lukket 3. sept. | Var |
|---|---|
| `copy.searchTerms` | søkeforslagene var SAM3s makrobegreper for alle fag. **Caseintervju tilbød «Solow, steady state, MPK» til en som trener til konsulentintervju.** Manifestet kan nå sette en kuratert liste; uten den utledes forslagene av fagets ordliste (etternavn og symboler vekselvis), og ellers av de korteste kapitteltitlene. Søkefeltets plassholder bruker de fire første |
| `exams.format.aids` | «Ingen kalkulator»-chippen sto hardkodet i eksamensvisningen. SAM3 setter den nå selv; et fag der kalkulator er tillatt, slipper å få beskjed om det motsatte |
| `deckLabel()` | ukjente kortstokker fikk etiketten «Kort». Nå brukes dekkets eget navn med stor forbokstav, slik kortstokkvelgeren allerede gjorde |

**Igjen står** «Oppgave 1/2/3» som fast akse i eksamensvisningen og de faste
SAM3-setningene i oppgavebankens sidetopp. Begge unngås ved å slå av `/oppgaver`
og `/exam`, som FIE402, Caseintervju og FIE432 gjør.

## 4. `id` i fagregisteret er en lagringsnøkkel

Endres `id` etter at faget er tatt i bruk, peker `edu.<id>.progress.v1` plutselig
et annet sted og all fremdrift ser ut som borte. (Den ligger fortsatt der, under
den gamle nøkkelen.)

## 5. Arvede localStorage-nøkler

`sam3.progress.v1`, `sam3.manual.v1` og `sam3.problems.v1` er fra tiden før
fag-velgeren. De leses én gang og kopieres til `edu.sam3.*`. Fjerner du
migreringskoden, mister eksisterende installasjoner historikken sin.

## 6. Endret pensum vises ikke

Parset pensum ligger i `localStorage`. Endrer du manual-HTML-en, må
**«Last innhold på nytt»** nederst på Fremdrift-siden trykkes.

## 7. Studieplanen kan gå ut på dato

`activeDayIndex()` klamper til `totalDays`. Er planen ferdig, står dashbordet
permanent på siste dag uten å si fra. Gjelder SAM3 nå.

Fag som ikke skal være datostyrt setter `plan.mode = "modules"` i stedet. Da er
«i dag» første ufullførte modul, og dato og ukedag droppes overalt. Se
[[Datamodell og lagring]].

## 7b. Formelkortenes id-er er posisjonsbaserte

Kortene som genereres fra formeltabellene får id `fmla-<tabellindeks>-<radindeks>`.
**Omorganiserer du tabellene eller setter inn en rad midt i, forskyves hele
spaced repetition-historikken** — kort du har mestret dukker opp som nye, og
vurderingene havner på feil formel. Legg tabellene i endelig rekkefølge fra start,
og legg nye rader nederst i sin seksjon.

## 7c. Quiz: riktig svar samler seg på alternativ B

Da drillen ble skrevet av parallelle agenter, endte **161 av 246 riktige svar på
indeks 1**. Leseren lærer da posisjonen, ikke faget.

Fellen ligger i den åpenbare fiksen. Å stokke om alternativene brekker
forklaringene, fordi de refererer til dem ved bokstav — og en automatisk
bokstav-remapping er direkte farlig, siden enkeltbokstaver også er fagsymboler:
i M&A er **A** kjøperen og **T** målet, i opsjonskapitlene er **S** aksjekursen og
**K** innløsningskursen, og **D** er markedsverdien av gjeld overalt.

Løsningen som ble brukt: skriv forklaringene om så de refererer til **innholdet** i
alternativet («the answer that multiplies tau_c by D»), og stokk først deretter.
Fordelingen er nå 25/25/25/25 med null bokstavreferanser igjen. Skriver du ny drill,
kontroller fordelingen før du legger den inn:

```bash
node -e 'global.window={};eval(require("fs").readFileSync("fag/fie402/data.js","utf8"));
const m=window.EDU_DATA.quizzes.filter(q=>q.type==="mcq");const t=[0,0,0,0];
m.forEach(q=>t[q.answer]++);console.log(t,"av",m.length)'
```

> [!warning] SAM3 hadde samme skjevhet, og ble ikke oppdaget før september 2026
> Fellen ble funnet i FIE402 og rettet der, men **SAM3 ble aldri kontrollert**:
> 35 av 44 riktige svar sto på alternativ B, altså 80 prosent. En quiz du kan
> gjette deg gjennom ved å trykke B.
>
> Rettingen var enkel her, fordi ingen av SAM3s forklaringer refererer til en
> bokstav eller en posisjon — det ble kontrollert først. Alternativene ble
> stokket deterministisk til 11/11/11/11, og resultatet verifisert mot en
> sikkerhetskopi: samme alternativsett og samme riktige svar i alle 44, bare ny
> rekkefølge.
>
> Lærdommen er ikke om quizen, men om kontrollen: en feil som rettes i ett fag
> må sjekkes i alle. `tools/sjekk-drill.js` gjør det nå automatisk.

## 7d. Eksamenssettenes oppgavenummer er ikke papirets

De fire eldre settene har en flervalgsdel som ligger som **oppgave 1** i appen.
Papirets «Problem 1» havner dermed på plass 2, og hele nummereringen er forskjøvet
med én. Manualen siterer papirets nummerering («V2024 Problem 3»), så uten et
mottiltak ville leseren landet på feil oppgave.

Løsningen er at titlene bærer papirets egen merkelapp: oppgave 3 heter
«Problem 2 — Valuation with leverage». Da er koblingen synlig uansett hvilken
posisjon den har.

**Kurbatov-settene (H2024, H2025) har ingen flervalgsdel**, så der er oppgave N
lik Exercise N. Ikke «rett» dem — formatstrengen deres sier «no multiple choice»,
og et regex-søk etter «multiple choice» treffer den. Avgjør på om settet faktisk
*har* en flervalgsblokk som oppgave 1, ikke på formatteksten.

## 7e. Pensumbufferen vokser med manualen

`localStorage` ligger nå på **2,3 MB** med tre fag installert: FIE402 1 513 KB,
SAM3 566 KB pluss 202 KB oppgavebank, Caseintervju 14 KB. Grensen i de fleste
nettlesere er 5 MB.

Merk at tallet **563 → 296 KB** som sto her tidligere, gjaldt FIE402 før manualen
vokste til 109 000 ord. Trimmingen virker fortsatt; det er innholdet som er
større. Blir det trangt, er det FIE402 som må trimmes videre, ikke motoren.

## 7f. Deltitler leses fra manifestet, ikke fra manualen

`<h2 class="part">` i manualen brukes **ikke** til å bestemme hvilken del et
kapittel hører til. Parseren fjerner dem, og `partFor()` slår opp i
`manifest.parts` — med SAM3s makrotabell som stille fallback.

Caseintervju manglet en slik tabell og arvet derfor SAM3s deler: k2 sto som
«Oppgave 1: Nasjonalregnskap og måling». Det så riktig ut helt til det tredje
kapitlet kom, fordi k0 og k1 tilfeldigvis traff SAM3s Del 0.

**Legger du til et fag med flere enn to kapitler, må `parts` settes.**

## 7g. I dybdebankene er `n` nivået, ikke et løpenummer

Feltnavnene i `EDU_DATA.dybde` er ikke selvforklarende, og jeg leste dem feil:

| Felt | Hva det faktisk er |
|---|---|
| `n` | **nivået**, 1–4 — må finnes som nøkkel i bankens `lvl` |
| `id` | unik nøkkel innenfor banken, og **lagringsnøkkel** for vurderingene |
| `k` | kategori, må finnes i bankens `cats` |

`visible()` filtrerer på `fLevels.has(q.n)`. Bruker du `n` som løpenummer og
`lvl` som nivå, forsvinner alt med `n` over 4 — og banken viser «Ingen spørsmål
matcher filteret» selv om tellingen på knappen er riktig, siden den teller
`items.length` direkte.

Det ble ikke oppdaget med én gang, fordi den første banken hadde nøyaktig tre
spørsmål nummerert 1–3, som alle tilfeldigvis er gyldige nivåer.

**Sjekk mot `fag/fie402/dybde.js` når du lager en ny bank.** Den er riktig.

## 7h. `dybdeBanks` må settes, ellers arves SAM3s tre banker

Samme mønster som deltabellen i 7f: `js/bundle-dybde.js` faller tilbake på
SAM3s hardkodede «Kort sikt / Lang sikt / Eksamensoppgaver» hvis manifestet
mangler `dybdeBanks`. Faget viser da tre knapper som ikke har data.

## 7i. Tre mobilfeil som lå i motoren, ikke i innholdet

Funnet ved å måle `scrollWidth − clientWidth` på hver rute i 375 px bredde.
Alle tre rammet også [[FIE402 Corporate Finance]] og [[SAM3 Makroøkonomi]].

**Brede tabeller strakk hele kapitlet.** Et grid-barn har `min-width:auto` som
standard og kan derfor ikke krympe under innholdets bredde — så den bredeste
tabellen bestemte bredden på all brødteksten. Rettet med `minmax(0,1fr)` og
`min-width:0`, pluss at `rullTabeller()` i `bundle-views.js` nå pakker hver
`table.data` i en `.tabell-scroll` ved visning. Gjøres ved visning og ikke i
manualen, så det virker for alle tre fagene uten å røre innholdet.

**Pensumlisten klemte tittelen til 56 px.** `.chap-row` er et grid med fire
kolonner der to er `auto`. På mobil vant «Forstått / Usikker»-knappene med sine
182 px, og kapitteltittelen fikk resten. Under 560 px flyttes de ned på egen
linje.

**Sidetoppen dyttet knappene ut av skjermen.** Tittel og knapper ligger i samme
flexrad uten `flex-wrap`. Lange kapitteltitler skjøv «Usikker» utenfor kanten.

I tillegg var chips som fungerer som knapper 24 px høye. `button.chip` får nå
mer luft under 560 px — etikett-chips er `div` og treffes ikke av regelen.

## 7j. `el()` svelget tall som eneste barn

`el(spec, attrs, ...children)` avgjør om andre argument er et barn eller et
attributt-objekt slik:

```js
if (attrs && (attrs.nodeType || Array.isArray(attrs) || typeof attrs === "string"))
```

Et **tall** passerer ingen av testene og ble derfor behandlet som attributter.
`for (const k in 3)` itererer ingenting, så tallet forsvant uten feilmelding.

`el(".cnum", 3)` ga altså en tom sirkel — og kapittelnumrene i pensumlisten har
vært blanke i **alle tre fagene** siden motoren ble skrevet. Ingen la merke til
det, fordi en tom grå sirkel ser ut som design.

`typeof attrs === "number"` er nå med i testen.

**Lærdom:** en `el()`-hjelper som stilltiende kaster bort argumenter, feiler
usynlig. Er du i tvil, send barn som eksplisitt tredje argument.

## 7k. Studieplanen må peke på arbeidet, ikke bare beskrive det

Dagvisningen kunne vise «Les og forstå» (fra `day.chapters`) og «Oppgaver i dag»
(fra `day.problems`, og bare for fag med oppgavebank). Et fag der arbeidet er å
kjøre en case eller en drill, hadde ingen måte å si det på — modulen viste mål og
begreper, og lot deg stå igjen uten en vei inn i noe.

`day.tasks` løser det: en liste med `{ t, sub, rute }` som rendres som «Gjør
dette», med avkryssing per linje og lenke rett inn i øvelsen. Avkryssingen ligger
i `state.active` under `dag-<n>-<i>`.

## 7l. Gjennomgangen som fant ni feller til

Etter at tre feil av samme slag dukket opp i det nye faget, ble hele motoren gått
gjennom systematisk. Ni til ble funnet, og alle er nå rettet.

**Aktive feil, i alvorlighetsrekkefølge:**

| Feil | Hva som skjedde |
|---|---|
| Quizmodus «Oppgave 2/3» | Hardkodet for alle fag. Caseintervju har alt på `oppg: 1`, så pool ble tom og `runScreen()` krasjet på `questions[0].ch`. To av fem moduser døde med «⚠️ Noe gikk galt» |
| `el()` og tallet 0 | Førstefiksen testet `attrs &&`, og 0 er falsy. `el(".cnum", 0)` ga fortsatt tom sirkel på kapittel 0 i alle tre fagene |
| Repetisjonsvekting 13–19 | `if (num >= 13 && num <= 19)` var **ubetinget** hardkodet, ikke en fallback. Alle fag fikk «Oppgave 3 — historisk svakest» |
| Død lenke til `/exam` | «Åpne eksamenstrening» rendret uten `hasModule`-vakt. FIE402 har `pastExam` på 23 av 25 moduler, men ikke ruten — klikket landet på dashbordet |
| Milepælkortet | Dagvisningens chip ble vaktet, dashbordkortet ikke. Caseintervju fikk en tom fet linje i 9 av 12 moduler |
| Synlig markup i escapede felt | 38 SAM3-dybdespørsmål, 28 FIE402-symboler, 8 flashcard-forsider, 17 kriterier |
| Dekkfilteret | «Mekanismer» og «Intuisjon» var hardkodet og ga tom kø i fag uten dem |
| XP-stigen | Endte på «Sensor» og «Nobelkandidat» også i et kurs om jobbintervjuer |
| «Dager fullført» | Sto slik også i fag som teller moduler |

**Latent, også rettet:** `daysPct()` delte på `plan.totalDays` uten vakt, og
`NaN` forplantet seg til beredskapsringen — «NaN % klar» på hver eneste side.

> [!warning] To lærdommer om kontrollen selv
> **Min egen verifisering var feil to ganger.** Regexen `<[a-z]` fanger ikke
> `</b>`, siden det kommer en skråstrek etter vinkelparentesen — så en opprydding
> som bare fjernet åpningstagger ble godkjent som fullført. Bruk
> `</?[a-zA-Z][^>]*>`.
>
> **`textContent` inkluderer skjulte elementer.** En sveip som leter etter
> lekkasjer i teksten vil se innhold bak `display:none` — quizens modellsvar så
> ut til å lekke før avsløring, men gjorde det ikke.

## 7m. Drillen var kalibrert hardere enn faget den trener til

Meldt fra bruk: hoderegningen føltes for vanskelig. Den var det, og
sammenligningen mot kursets eget materiale viste hvorfor.

| | Drillen før | Casene i samme kurs |
|---|---|---|
| Tid per regnestykke | 25 sekunder, fast | **90–120 sekunder** |
| Antall ledd | 1 til 3, uten skille | 2 til 4 |
| Krav til presisjon | eksakt | avrundet, med retning oppgitt |

Verst var `19 × 41`, som krevde nøyaktig 779. **Det motsier kapittel 6**, som
lærer bort kompenserende avrunding: rund én opp og én ned, 20 × 40 = 800, juster.
Drillen straffet altså teknikken kurset nettopp hadde undervist i.

**Rettet:** `mcqRunner` leser nå tid per runde (`r.sek`) og faller tilbake på
`cfg.secs`. Banken er kalibrert i tre nivåer — 15–20 s for ettrinns ankere,
25–30 s for to ledd, 40–45 s for flere — og utvidet fra 12 til 20 oppgaver så det
finnes en stigning. Ingen oppgave krever lenger et eksakt tall der en case ville
tålt avrunding.

> [!warning] Sjekk dette for hver drill
> Sammenlign drillens tidspress og presisjonskrav mot det materialet den trener
> til. En drill som er hardere enn virkeligheten på **en annen akse** enn den
> skal trene, lærer bort feil vane — her: å jage desimaler i stedet for å runde
> av og gå videre.

## 7n. Spillregisteret var felles for alle fag

De sytten minispillene i `js/bundle-lyn.js` ble vist til alle fag, uansett om
faget hadde data til dem. Konsekvensen gikk begge veier:

- **Caseintervju** fikk «Skift eller glid? — kurveskift vs. bevegelse langs», som
  er ren makroøkonomi, pluss fire fliser som aldri kunne åpne seg fordi faget
  verken har symbolliste, økonomer eller aktiv læring.
- **SAM3 og FIE402** fikk de fire casespesifikke spillene som «Kommer snart».
  FIE402 lovet «14 spill åpner seg etter hvert» — fire av dem fantes ikke.

`manifest.lynGames` er nå en hviteliste, og `manifest.lynLabels` kan overstyre
navn, emoji og undertekst per spill. Utelates feltene, gjelder alle spill som før.

Alle tre fagene har nå **13 fliser hver**, og ingen av dem er døde.

> [!info] Gjenbruk av en bank under et annet navn
> Caseintervjus `shift`-bank inneholder ekte casematte — volumeffekt, priskutt,
> 72-regelen, nullpunkt — så spillet er beholdt under merkelappen «Regn eller
> avgjør». Første forsøk het «Hva skjer med tallet?», men banken har også fire
> rene vurderingsspørsmål, så navnet dekket bare seks av ti.

## 7o. Ikke rediger en fil en agent fortsatt eier

Under utvidelsen av struktureringsbanken rettet jeg to for lange rotnoder i
`_str-a.js` mens agenten som skrev filen fortsatt jobbet. Den oppdaget
endringene som ekstern korrupsjon og **gjenopprettet originalene** — helt riktig
av den, men rettelsene var borte, og de lange nodene ble med inn i banken.

Fanget fordi validatoren ble kjørt på nytt etter sammenslåingen og flagget de
samme to igjen.

**Regelen:** rediger aldri en fil mens en agent skriver til den. Vent til
notifikasjonen, eller gjør rettelsen i målfilen etter sammenslåing. Det samme
gjelder delte mellomkataloger — en av agentene meldte at scratchpad-en ble
overskrevet av en søsteragent midtveis.

Se også 7p om samme mønster: k9 og k14 ble skrevet om fire minutter etter at
manualen var bygget.

## 7p. En eksplisitt `modules`-liste garanterte ikke at dataene fantes

`has()` i `js/boot.js` returnerte tidlig når faget listet modulene sine
eksplisitt, og hoppet dermed over datasjekken for `/sett`, `/caser`, `/mock` og
`/historier`. Et fag som **listet** en av dem uten å ha data, fikk en
menyoppføring som bare kunne vise «ingen sett ennå» — samme døde flis som
lynspillene hadde i 7n.

Oppdaget da FIE432 ble registrert med `/sett` i lista mens `sett.js` ennå var tom.
Datasjekken kjører nå **først**, uansett hva manifestet sier: en eksplisitt liste
er en ønskeliste, ikke en garanti. SAM3, FIE402 og Caseintervju er upåvirket —
alle har data for det de lister.

## 7q. En agent som melder en feil, kan ta feil selv

Agenten som skrev dybdebanken «finans» meldte to regnefeil i k16. **Den ene var
ekte, den andre var ikke det** — og forskjellen er verdt å kjenne igjen.

*Den falske:* «Manualen skriver 280 000 × 11,2578 = 3 152 184, men eksakt
annuitetsfaktor gir 3 152 179.» Manualen oppgir selv faktoren avrundet til
11,2578, og 280 000 × 11,2578 **er** 3 152 184. Femkronersavviket er avrundingen
av den oppgitte faktoren, ikke en feil. Å «rette» summen til 3 152 179 ville
gjort det viste regnestykket galt for leseren som taster det inn.

*Den ekte:* `12 × 16 104,65 − 150 000 = 43 256` som avdrag første år. Riktig
regnet, men 150 000 er 5 % av hele lånet, og saldoen faller for hver termin.
Rentene er 148 995, avdraget 44 261.

Skillet: den falske klaget på **presisjon i et tall manualen selv har avrundet**,
den ekte på **en premiss som er feil**. Regn alltid om selv før du retter — og
regn om med manualens egne oppgitte mellomtall, ikke bare med full presisjon.

> [!tip] Den ekte feilen ble avslørt av at kapitlet motsa seg selv
> 16.1 advarer eksplisitt mot at 150 000 «bare er renten på et evig lån», mens
> 16.5 brukte akkurat det tallet som første års renter. Når to steder i samme
> kapittel er uenige, er minst ett av dem galt — og det er en sjekk ingen
> aritmetikkontroll kan gjøre, fordi begge regnestykkene er riktig regnet.

## 7r. `node --check` er en syntakssjekk, ikke en referansesjekk

Hver bundle er sin egen IIFE. En hjelper deklarert med `const` inni én av dem er
usynlig for de andre — men `node --check` sier ingenting, fordi filen er
syntaktisk feilfri. Feilen dukker først opp når linjen faktisk kjøres.

Slik skjedde det: `tellord()` ble skrevet i `bundle-notebooklm.js`, og en senere
retting av entallsformen i `bundle-kapitteloppgaver.js` kalte den derfra.
`node --check` var grønn på begge filene. Listevisningen krasjet med
«Can't find variable: tellord» så snart den ble åpnet.

Hjelperen bor nå i `S.u` i `bundle-core.js`, som er stedet for akkurat dette.

> [!warning] Testing av feil skjerm er ikke testing
> Jeg åpnet `/kapitteloppgaver/19` etter rettingen og så at den virket. Feilen lå
> i `/kapitteloppgaver`, listevisningen, som jeg ikke åpnet. En modul har ofte to
> visninger, og den ene kan være hel mens den andre er knust.

**Rutinen som fanger det:** gå gjennom hver rute etter en endring i `js/`, ikke
bare den du nettopp rørte. Det tar sekunder i konsollen:

```js
for (const r of [...new Set([...document.querySelectorAll('[data-match]')].map(n => n.dataset.match))]) {
  location.hash = '#' + r;
  await new Promise(x => setTimeout(x, 380));
  const t = (document.querySelector('.content').innerText || '').trim();
  if (t.includes('Noe gikk galt') || t.length < 40) console.warn('BREKKER:', r);
}
```

Kjør den for **alle fire fagene**. En endring i `bundle-core.js` treffer alle, og
fag-id-ene er `sam3`, `fie402`, `case` og `fie432` — merk at Caseintervju heter
`case`, ikke `caseintervju`.

## 8. Filer som ikke er koblet til noe

- `SAM3_oppgavebank_2.html` — frittstående side, ikke referert fra koden
- `SAM3 Oppgavebank MC/` — tom mappe, ingen referanser

(`.claude/launch.json` var også feil, men ble rettet 19. august 2026 og peker nå
på `tools/serve.py`. `serve.py` leser porten fra `PORT` når den ikke får et
argument, slik at forhåndsvisningen kan velge en ledig port når 4178 er opptatt.)

## 9. Supabase-adressene følger ikke med på navnebytte

Site URL og Redirect URLs må oppdateres manuelt i Supabase når Pages-adressen
endres, ellers går glemt-passord-lenker til en død adresse. Se [[Supabase]].

## 10. `.gitignore` ignorerer `.claude/`

Prosjektinnstillinger for Claude Code følger altså ikke med repoet. Bevisst nok,
men verdt å vite hvis noe «mangler» på en annen maskin.
