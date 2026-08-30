---
tags: [drift, fallgruver, viktig]
oppdatert: 2026-08-19
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

**De ni som står igjen** er kosmetiske, men synlige for et annet fag:
søkeforslagene («Solow, steady state, MPK …»), deck-etikettene i flashcards,
«Ingen kalkulator»-chippen som ignorerer `exams.format`, «Oppgave 1/2/3» som fast
akse i quizfiltre og eksamensvisning, og de faste SAM3-setningene i
oppgavebankens sidetopp. FIE402 unngår dem ved å slå av `/oppgaver` og `/exam`.

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
