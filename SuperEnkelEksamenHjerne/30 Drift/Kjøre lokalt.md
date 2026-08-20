---
tags: [drift, oppsett]
oppdatert: 2026-08-19
---

# Kjøre lokalt

## Anbefalt

```bash
python3 tools/serve.py
```

Åpne så **http://127.0.0.1:4178/**. Ferdig. Ingen npm, ingen bygging — bare
Python 3, som følger med macOS.

Serveren gjør to nyttige ting:

- **Serverer pensumfilen fra appens origin**, så `fetch()` finner den og du
  slipper filvelgeren. Ligger manualen i mappa over prosjektet, kopieres den inn
  automatisk første gang.
- **Slår av all bufring** (`Cache-Control: no-store`). Uten dette serverer
  nettleseren gjerne gamle `js/*.js` etter en endring, og du feilsøker en fil som
  ikke kjører.

Port kan overstyres: `python3 tools/serve.py 5000`.

## Alternativer

- **Åpne `index.html` direkte** fra Finder. Da må du velge pensumfilen første
  gang (eller dra den inn); den parses og lagres lokalt etterpå.
- **Hopp rett til et fag**: `http://127.0.0.1:4178/?fag=sam3`

> [!bug] `.claude/launch.json` er utdatert
> Den peker på `/tmp/sam3app/serve.py` på port **4182**. Den faktiske serveren er
> `tools/serve.py` på **4178**. Fiks den før du bruker forhåndsvisning i Claude
> Code. Se [[Åpne spørsmål og neste steg]].

## Etter endringer

- Endret du `js/` eller `fag/`: **bump byggnummeret** før du pusher. Se
  [[Publisering og cache]].
- Endret du pensum-HTML-en: trykk **«Last innhold på nytt»** nederst på
  Fremdrift-siden, ellers viser appen den bufrede versjonen.
