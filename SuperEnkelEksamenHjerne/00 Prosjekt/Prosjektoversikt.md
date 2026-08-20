---
tags: [prosjekt, oversikt]
oppdatert: 2026-08-19
---

# Prosjektoversikt

**Super Enkel Eksamen** er en personlig læringsplattform som tar deg gjennom et
helt pensum, dag for dag, fram til skoleeksamen. Den er bygget for én bruker
(Magnus) og hans egen eksamenstrening, ikke som et produkt for andre.

## Kjerneidé

Ett HTML-dokument med pensum er **eneste sannhetskilde** for fagstoffet. Appen
parser den filen i nettleseren og bygger studieplan, quiz, flashcards,
dybdetrening, minispill, søk og fremdriftssporing oppå. Ingen fagtekst skrives
inn i appen manuelt — den *omstruktureres* fra manualen.

## Det arkitektoniske hovedskillet

> **`js/` er motor. `fag/` er innhold.**
> Ingenting i `js/` skal vite noe om makroøkonomi, og ingenting i `fag/` skal
> vite noe om hvordan appen er bygget.

Dette er den viktigste regelen i prosjektet. Se [[Arkitektur]] for hvordan den
er realisert, og [[Fallgruver]] for stedene der den er brutt.

## Teknologi

- **Vanilla JavaScript.** Ingen npm, ingen bygging, ingen rammeverk, ingen
  transpilering. Filene som ligger i repoet er filene som kjører.
- Eneste eksterne avhengighet er Supabase-klienten, som lastes fra jsDelivr
  **først når** en konto faktisk brukes.
- ~3 900 linjer JS totalt, pluss ~400 KB fagdata for SAM3.
- Rendering skjer med en liten `el()`-hjelper (ingen virtuell DOM), ruting med
  en egen ~20-linjers hash-ruter.

## Hvor det bor

| Hva | Hvor |
|---|---|
| Kode | `~/Desktop/Diverse Vibe Code/SuperEnkelEksamen` |
| GitHub | https://github.com/magnusafjeld-cpu/SuperEnkelEksamen |
| Publisert app | https://magnusafjeld-cpu.github.io/SuperEnkelEksamen/ |
| Supabase-prosjekt | `xjmjoolrbgfqrcovznru` — se [[Supabase]] |
| Denne hjernen | `SuperEnkelEksamenHjerne/` i samme mappe |

Repoet het **SAM3** fram til 19. august 2026 og ble da døpt om. Den gamle
Pages-adressen (`.../SAM3/`) er død — GitHub videresender ikke.

## Status

Plattformen er ferdig og i bruk. SAM3 Makroøkonomi er eneste registrerte fag;
motoren ble gjort fagnøytral i august 2026 nettopp for å kunne ta flere.
Se [[Åpne spørsmål og neste steg]].
