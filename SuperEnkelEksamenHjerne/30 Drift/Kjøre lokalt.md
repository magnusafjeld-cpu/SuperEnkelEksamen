---
tags: [drift, oppsett]
oppdatert: 2026-11-24
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

> [!bug] Forhåndsvisningen i Claude-appen får ikke lese Dokumenter-mappen
> `.claude/launch.json` peker riktig på `tools/serve.py` på port 4178, men fra
> desktop-appen stopper `preview_start` med «Operation not permitted» (macOS gir ikke
> prosessen tilgang til Dokumenter, 24. november 2026). Det som virket: kopier appen
> uten kursmappene til scratchpad med `rsync`, start `python3 tools/serve.py <port>`
> derfra i bakgrunnen og åpne adressen med `preview_start { url }`. Endringer må
> synkes til kopien før du laster på nytt.

## Etter endringer

- Endret du `js/` eller `fag/`: **bump byggnummeret** før du pusher. Se
  [[Publisering og cache]].
- Endret du pensum-HTML-en: trykk **«Last innhold på nytt»** på Konto-siden
  (person-ikonet øverst), ellers viser appen den bufrede versjonen.
