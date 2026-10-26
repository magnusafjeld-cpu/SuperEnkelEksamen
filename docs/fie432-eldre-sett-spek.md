# FIE432: de seks eldre eksamenssettene (H2016–H2021)

Appen har H2022, H2024 og H2025 i `fag/fie432/sett.js`. De seks eldre settene skal inn
som egne sett, slik at alle ni eksamenene med fasit kan øves på. Dette er spesifikasjonen
for agentene som skriver dem.

## Hva du leverer

Ett JSON-objekt per sett i `fag/fie432/_sett/<id>.json` (id: `h2016` … `h2021`).
Rør ikke `sett.js`, `index.html` eller andre filer. Hovedtråden fletter inn.

## Kildene

Skrapemappen `$S` = `/private/tmp/claude-501/-Users-magnusfjeld-Documents-Magnus-Fjeld-NHH/d8fcb6a6-9b2c-4346-b9e5-66d957577c1e/scratchpad/eldre/<id>/`:

- `tekst.txt`: dokumentet som tekst, med `[BILDE: sti]` der bildene står (ikke H2016).
- `imageN.png`: bildene. Les dem med Read. Fasitsvarene i H2018 5–7, H2019 9, H2020 4–6
  og H2021 5–7 er bilder.
- `original.pdf` (H2016, H2019, H2020, H2021): hele dokumentet som PDF, med EMF-bildene
  gjengitt. Les sider med Read og `pages`.
- Originalene: `FIE432 Personlig Økonomi 31. aug/Eksamensoppgaver/` og tekstuttrekket i
  `FIE432 Personlig Økonomi 31. aug/_tekst/Eksamensoppgaver_*.txt`.
- `docs/fie432-research/01-eksamens-dna.md`: § 1 har settet registrert spørsmål for
  spørsmål, § 7.2 avvikene i fasitene og § 7.4 rekonstruerte svar. Bruk dem, men regn
  selv.

## Formatet

Se på `h2022` i `fag/fie432/sett.js` (flervalg) og `h2025` i `fag/fie402/sett.js`
(åpne oppgaver med `criteria`). Felter:

```
{ "id": "h2021", "label": "Høsten 2021", "date": "2021-11-26", "minutes": 240,
  "points": 100, "format": "7 oppgaver · åpne svar · hjemmeeksamen",
  "note": "<HTML: hva slags eksamen, hva som skiller den fra 2026, gamle satser>",
  "facts": ["…", "…"], "practiceNote": "…",
  "exercises": [ { "n": 1, "title": "<beskrivende norsk tittel>", "points": 15,
    "topic": "Aksjonærmodellen", "chapters": [5],
    "body": "<p>ordrett oppgavetekst</p>",
    "parts": [ { "label": "a", "points": 5, "body": "<p>…</p>",
                 "solution": "<p>…</p>", "criteria": ["…", "…"] } ] } ] }
```

- **Åpne ledd** har `solution` og `criteria` (3–5 punkter: hva sensor gir poeng for, den
  typiske feilen, og «Vis utregningen» der det er regning). Ingen `options`.
- **Flervalgsledd** (H2019 oppgave 1–8, og H2020 oppgave 2 om alternativene står i
  teksten) har `options` og `answer` (indeks fra 0) og ingen `criteria`. Settet får da
  `"mc": { "wrongFactor": 0 }`. Løsningen sier hvilken feil hvert galt alternativ er
  laget av, som i `h2022`.
- **Poeng.** Står poeng eller vekter i oppgaven, bruk dem. Ellers fordel 100 poeng etter
  vekt (H2016: 1/6, 1/6, 1/3, 1/3), «anbefalt tid» (H2020, H2021) eller likt. Delene
  summerer til oppgavens poeng, og oppgavene til settets. Hele tall.
- **Kapitler** er manualens: 1 skattesystemet · 2 avkastning før og etter skatt ·
  3 aktiva · 4 investeringscaser · 5 aksjonærmodellen · 6 fritaksmetoden og exit ·
  7 formuesskatten · 8 formuesskatt som avkastningsskatt · 9 nøytralitet og bedriftens
  tilpasning · 10 progressivitet · 11 insidens · 12 risiko og implisitt skatt ·
  13 internasjonal skatt · 14 sparing og portefølje · 15 pensjon · 16 lån ·
  17 forsikring · 18 finansiell psykologi.

## Oppgaveteksten

Ordrett, også feil i den. Tabeller blir `<table class="data">` med `<td class="n">` for
tall. Et bilde i selve oppgaven (en tabell, en figur) gjenskapes som HTML-tabell eller
beskrives kort. Bilder legges ikke inn. Sensorveiledningens svar skal ikke lekke inn i
`body`.

## Løsningene

Skriv dem selv, på norsk, i stilen fra `h2022`: `<b>Regelen.</b>`, nummererte regnesteg,
svaret i `<b>`, `<b>Kontroll.</b>`. Regn hvert tall på nytt med Python
(`python3 -I -c …`) fra oppgavens egne tall. Der fasiten avviker (trykkfeil, avrunding,
annen G-sats), følg det riktige og si kort hva fasiten skrev. Der fasiten runder på en
bestemt måte og oppgaven ber om det, følg oppgaven.

**Gamle regler.** Settene bruker satsene som gjaldt da, og teksten oppgir dem. Regn med
dem. Der regelen er endret siden (oppjusteringsfaktoren kom i 2016 og har økt, aksjerabatt
og verdsettingsrabatter, skattesats, delingstall, pensjonsreformen), legg til én setning
`<b>I 2026.</b>` med hva som gjelder nå. Er et tema ute av pensum i 2026, si det i `note`.

## Skriveregler

- Ingen tankestrek (—). Bruk kolon, punktum eller «·». Ingen komma foran «og».
- Tall: mellomrom som tusenskille (`kr 33 000`), desimalkomma (`22 %`, `0,85 %`).
- HTML: `p`, `b`, `i`, `br`, `sub`, `sup`, `ul`/`ol`/`li`, `table class="data"`.
- Kort og direkte.

## Kontroll før du leverer

```
node -e 'const s=require("fs").readFileSync(process.argv[1],"utf8");require("fs").writeFileSync(process.argv[2],"window.EDU_DATA={};window.EDU_DATA.sets=["+s+"];")' fag/fie432/_sett/<id>.json $S/../sjekk-<id>.js
```

Kjør så `node tools/sjekk-sett.js $S/../sjekk-<id>.js`.
Ingen feil, og ingen advarsler du ikke kan forklare. Sjekk også at fila er gyldig JSON og
at `—` ikke forekommer.

I sluttrapporten: antall oppgaver, ledd og poeng, avvik du fant i fasiten, og alt du var
usikker på.
