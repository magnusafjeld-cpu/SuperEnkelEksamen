# SAM3 Makroøkonomi — Interaktiv eksamenstrening

En personlig læringsplattform som tar deg gjennom hele SAM3-pensum på **14 dager**,
dag for dag, fram til skoleeksamen. Alt fagstoff hentes direkte fra
`SAM3_Eksamensmanual.html` (den eneste sannhetskilden) og presenteres som en
interaktiv lærebok med plan, quiz, flashcards, repetisjonsmotor, eksamenstrening,
søk og full fremdriftssporing.

Studieplanen starter **mandag 29. juni 2026** og varer i 14 dager.

---

## Kom i gang

### Anbefalt: kjør den lille serveren (laster pensum automatisk)

```bash
cd "SAM3 Code"
python3 tools/serve.py
```

Åpne deretter **http://127.0.0.1:4178/** i nettleseren. Ferdig.

Serveren henter eksamensmanualen automatisk, så du slipper å gjøre noe mer.
(Trenger bare Python 3 — som følger med macOS. Ingen npm, ingen bygging.)

### Alternativ: åpne `app.html` direkte

Du kan også dobbeltklikke `app.html`. Første gang blir du bedt om å velge
`SAM3_Eksamensmanual.html` (eller dra den inn). Pensumet parses og lagres lokalt,
så du slipper å velge igjen.

> Fremdriften din lagres i nettleseren (localStorage). Bruk samme nettleser hver gang.

---

## Hva plattformen inneholder

| Modul | Hva den gjør |
|---|---|
| **Dashboard** | Dagens oppgaver og mål, prosent fullført, fremdriftslinjer, neste milepæl, estimert studietid, dagens viktigste konsepter og kommende temaer. |
| **Studieplan** | 14 dager bygget pedagogisk: rammeverk → måling → vekst → kort sikt → repetisjon. Stigende vanskelighetsgrad, innebygd repetisjon, de siste 3 dagene = tidligere eksamener + integrering. |
| **Pensum** | Hele pensum. Marker hvert kapittel som *lest*, *forstått* eller *usikker*. |
| **Temaartikler** | Hvert kapittel som en ren artikkel med forklaringer, modeller, grafer, formler, eksempler, eksamenstips og vanlige feil — rett fra manualen, men pent restylet. |
| **Aktiv læring** | Etter hvert tema: kontrollspørsmål, refleksjon, flervalg, regneoppgaver og «forklar med egne ord». |
| **Quiz** | Trekker fra hele pensum, blander gamle og nye temaer, viser poeng, riktige svar og forklaringer. Egen modus for svake temaer. |
| **Flashcards** | Definisjoner, formler, begreper og intuisjon — med **spaced repetition** (vanskelige kort kommer oftere). |
| **Repetisjonsmotor** | Bestemmer automatisk hva du bør repetere: usikre temaer, temaer du ikke har sett på lenge, sentrale eksamenstemaer og svak quizscore. |
| **Eksamenstrening** | Foreslår tidligere eksamensoppgaver (V25/H25/V24) for dagen, viser hvilke temaer de tester, kobler til modellsvar og foreslår repetisjon hvis du sliter. |
| **Søk** | Søk på begreper, modeller, formler, økonomer, variabler og figurer på tvers av hele pensum. |
| **Fremdrift** | Dager fullført, kapitler lest, quizscore, flashcard-status, svakeste temaer og hva som gjenstår. |

---

## Filstruktur

```
SAM3 Code/
├── app.html                 # Inngangspunkt (design/CSS inline)
├── js/
│   ├── bundle-data.js       # Studieplan, quiz, flashcards, aktiv læring, eksamener, ordliste
│   ├── bundle-core.js       # Manual-parser + utils, store, srs, søk, repetisjon, metrics, router
│   ├── bundle-views.js      # Alle visninger (dashboard, plan, pensum, kapittel, quiz, …)
│   └── boot.js              # App-skall, ruting og innlasting av manualen
├── tools/
│   └── serve.py             # Liten lokal server (henter manualen automatisk)
└── README.md
```

Hver «bundle» er internt organisert i små, selvstendige moduler (IIFE-komponenter),
slik at koden er ryddig og enkel å videreutvikle. Vil du dele opp igjen i én fil per
modul, er hver seksjon allerede tydelig avgrenset med kommentarer.

---

## Slik er innholdet laget

Plattformen **parser eksamensmanualen i nettleseren** ved oppstart (med DOMParser)
og bygger opp et strukturert pensum: kapitler, seksjoner, formler, figurer (inkl.
SVG-diagrammene), tabeller og de fire boks-typene (mekanisme, eksamenstips, vanlig
feil, sammenheng). Studieplanen, quizene, flashcardene og eksamenskoblingene er
forfattet på toppen av dette stoffet. Ingen tekst er funnet på utenfor manualen —
men den er omstrukturert for å gjøre den lettere å forstå, huske og anvende.

Endrer du manualen, trykk **«Last manual på nytt»** nederst på Fremdrift-siden for
å parse den på nytt.
