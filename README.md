# Super Enkel Eksamen

En personlig læringsplattform som tar deg gjennom et helt pensum, dag for dag,
fram til skoleeksamen — som studieplan, quiz, flashcards med spaced repetition,
dybdetrening, lynlæring, oppgavebank, eksamenstrening, søk og fremdriftssporing.

Motoren er **fagnøytral**. Du velger fag ved oppstart, og hvert fag har sin egen
plan, sine egne oppgaver og sin egen fremdrift. Første fag ut er
**SAM3 Makroøkonomi**, som henter alt fagstoff fra `SAM3_Eksamensmanual.html`
(den eneste sannhetskilden) og bygger resten på toppen av det.

Med [Supabase koblet på](docs/supabase-oppsett.md) kan du logge inn og ta med
fremdriften mellom telefon og PC. Uten er alt lokalt i nettleseren, som før.

---

## Kom i gang

### Anbefalt: kjør den lille serveren (laster pensum automatisk)

```bash
python3 tools/serve.py
```

Åpne deretter **http://127.0.0.1:4178/** i nettleseren. Ferdig.

Serveren henter pensumfilen automatisk, så du slipper å gjøre noe mer.
(Trenger bare Python 3 — som følger med macOS. Ingen npm, ingen bygging.)

### På nett (GitHub Pages)

Publisert versjon: **https://magnusafjeld-cpu.github.io/SAM3/**. Første gang
velger du pensumfilen (eller drar den inn); den lagres lokalt etterpå.

### Alternativ: åpne `index.html` direkte

Du kan også dobbeltklikke `index.html`. Første gang blir du bedt om å velge
pensumfilen. Den parses og lagres lokalt, så du slipper å velge igjen.

> Uten innlogging lagres fremdriften i nettleseren (localStorage) — bruk samme
> nettleser hver gang. Med innlogging følger den deg mellom enheter.

Hopp rett til et fag med `?fag=<id>`, f.eks.
`http://127.0.0.1:4178/?fag=sam3`. Tilbake til fag-velgeren kommer du alltid via
**Alle fag** nederst i sidepanelet, eller fra Konto-siden på mobil.

Selve plattformnavnet, logoen og undertittelen settes ett sted: `EDU_PLATFORM`
øverst i `js/subjects.js`.

---

## Hva plattformen inneholder

| Modul | Hva den gjør |
|---|---|
| **Dashboard** | Dagens oppgaver og mål, prosent fullført, fremdriftslinjer, neste milepæl, estimert studietid, dagens viktigste konsepter og kommende temaer. |
| **Studieplan** | Dagene bygget pedagogisk: rammeverk → måling → vekst → kort sikt → repetisjon. Stigende vanskelighetsgrad, innebygd repetisjon, de siste dagene = tidligere eksamener + integrering. |
| **Pensum** | Hele pensum. Marker hvert kapittel som *lest*, *forstått* eller *usikker*. |
| **Temaartikler** | Hvert kapittel som en ren artikkel med forklaringer, modeller, grafer, formler, eksempler, eksamenstips og vanlige feil — rett fra manualen, men pent restylet. |
| **Aktiv læring** | Etter hvert tema: kontrollspørsmål, refleksjon, flervalg, regneoppgaver og «forklar med egne ord». |
| **Lynlæring** | Korte minispill (2–5 min) for mobil: lynquiz, sant/usant, formel-lyn, par-sprint, skift eller glid, mekanisme-kjeder. Med XP, nivåer og streak. |
| **Quiz** | Trekker fra hele pensum, blander gamle og nye temaer, viser poeng, riktige svar og forklaringer. Egen modus for svake temaer. |
| **Flashcards** | Definisjoner, formler, begreper og intuisjon — med **spaced repetition** (vanskelige kort kommer oftere). |
| **Dybdetrening** | Selvrettede spørsmålsbanker med stigende nivå, filtrerbare på tema. «Kunne / må øve» mater repetisjonsmotoren. |
| **Repetisjonsmotor** | Bestemmer automatisk hva du bør repetere: usikre temaer, temaer du ikke har sett på lenge, sentrale eksamenstemaer og svak quizscore. |
| **Eksamenstrening** | Foreslår tidligere eksamensoppgaver for dagen, viser hvilke temaer de tester, kobler til modellsvar og foreslår repetisjon hvis du sliter. |
| **Oppgavebank** | Alle oppgaver med fasit, søkbare og filtrerbare. |
| **Søk** | Søk på begreper, modeller, formler, økonomer, variabler og figurer på tvers av hele pensum. |
| **Fremdrift** | Dager fullført, kapitler lest, quizscore, flashcard-status, svakeste temaer og hva som gjenstår. |
| **Konto** | Valgfri innlogging (e-post + passord) med synk av fremdrift mellom enheter. |

---

## Filstruktur

```
SAM3 Code/
├── index.html                 # skall: design/CSS + laster motoren
├── js/
│   ├── subjects.js            # FAGREGISTERET — her legges nye fag inn
│   ├── config.js              # Supabase-nøkler (tom = kun lokal lagring)
│   ├── bundle-core.js         # pensumparser + utils, store, srs, søk, repetisjon, metrics, router
│   ├── bundle-views.js        # alle visninger (dashboard, plan, pensum, kapittel, quiz, …)
│   ├── bundle-lyn.js          # lynlæring: spillmotoren
│   ├── bundle-dybde.js        # dybdetrening: visningen
│   ├── account.js             # innlogging og synk mot Supabase
│   ├── picker.js              # fag-velger, tema og dynamisk lasting av fagdata
│   └── boot.js                # app-skall, ruting og innholdslasting
├── fag/
│   ├── sam3/                  # SAM3 Makroøkonomi
│   │   ├── data.js            #   plan, quiz, flashcards, aktiv læring, eksamener, ordliste
│   │   ├── lyn.js             #   lynlæringsinnhold
│   │   └── dybde.js           #   dybdetreningsbanker (222 spørsmål)
│   └── _mal/                  # mal for nye fag — kopier denne
├── SAM3_Eksamensmanual.html   # SAM3s pensumkilde
├── SAM3_Alle_oppgaver_med_fasit.html
├── docs/
│   ├── supabase.sql           # skjema + Row Level Security
│   └── supabase-oppsett.md    # oppskrift for kontoer og synk
├── tools/serve.py             # liten lokal server
└── README.md
```

Skillet er: **`js/` er motor, `fag/` er innhold.** Ingenting i `js/` vet noe om
makroøkonomi, og ingenting i `fag/` vet noe om hvordan appen er bygget.

---

## Legge til et nytt fag

1. **Kopier malen**: `cp -r fag/_mal fag/<ditt-fag>`
2. **Skriv pensumfilen.** Én HTML-fil med samme struktur som
   `SAM3_Eksamensmanual.html`: kapitler i `<div class="chap" id="k0">`, med
   `<h2>`-overskrifter og boksene *mekanisme*, *eksamenstips*, *vanlig feil* og
   *sammenheng*. Parseren i `bundle-core.js` bygger resten selv — kapitler,
   seksjoner, formler, figurer (inkl. SVG) og tabeller.
3. **Fyll `fag/<ditt-fag>/data.js`** med studieplan, quiz, flashcards og resten.
   Malen forklarer hvert felt. Alt bortsett fra planen er valgfritt.
4. **Registrer faget** i `js/subjects.js` — ett objekt med navn, farger, hvilke
   moduler faget skal ha, hvilke datafiler som skal lastes, og stien til
   pensumfilen.

Velgeren plukker det opp automatisk. Moduler du ikke fyller ut data for,
slår du av med `modules`-feltet, så forsvinner de fra menyen.

---

## Kontoer og synk

Se **[docs/supabase-oppsett.md](docs/supabase-oppsett.md)** for full oppskrift.
Kort fortalt: kjør `docs/supabase.sql` i Supabase, skru på e-post-innlogging, og
lim Project URL + anon-nøkkelen inn i `js/config.js`.

Fremdriften lagres lokalt først og speiles til skyen. Ved innlasting slås lokal
og fjern fremdrift **sammen** — den ene enheten overskriver ikke den andre.

---

## Slik er innholdet laget

Plattformen **parser pensumfilen i nettleseren** ved oppstart (med DOMParser) og
bygger opp et strukturert pensum: kapitler, seksjoner, formler, figurer (inkl.
SVG-diagrammene), tabeller og de fire boks-typene. Studieplanen, quizene,
flashcardene og eksamenskoblingene er forfattet på toppen av dette stoffet.
For SAM3 er ingen tekst funnet på utenfor manualen — men den er omstrukturert
for å gjøre den lettere å forstå, huske og anvende.

Endrer du pensumfilen, trykk **«Last innhold på nytt»** nederst på
Fremdrift-siden for å parse den på nytt.
