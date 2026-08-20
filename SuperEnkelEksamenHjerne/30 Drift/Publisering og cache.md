---
tags: [drift, publisering, fallgruve]
oppdatert: 2026-08-19
---

# Publisering og cache

Appen ligger på **GitHub Pages**: https://magnusafjeld-cpu.github.io/SuperEnkelEksamen/
Push til `main` publiserer.

## Byggnummeret — den vanligste feilkilden

GitHub Pages setter `max-age=600` på filene. Uten cache-busting kjører telefoner
og nettlesere **gammel kode i opptil ti minutter** etter en push, og du feilsøker
noe som ikke er der.

Derfor har hver script-tagg i `index.html` en `?v=N`. Etter enhver endring i
`js/` eller `fag/`:

```bash
sed -i '' 's/?v=[0-9]*/?v=4/g' index.html
```

Ett tall, alle filene. **Dagens nummer: `v=3`.** Neste blir 4.

Fagdatafilene i `fag/` arver samme nummer automatisk: `js/picker.js` leser
byggnummeret ut av sin egen `<script src>` og henger det på hver fil den laster
dynamisk.

> [!tip] Sjekk at det virket
> Åpne siden med nettverksfanen og se at `bundle-core.js?v=<nytt tall>` faktisk
> hentes. Ser du det gamle tallet, ble ikke `index.html` oppdatert.

## Gjør du noe med adressen

Byttes repo-navnet, endres Pages-URL-en, og GitHub videresetter **ikke** den
gamle. Da må også dette oppdateres:

- `README.md`
- `docs/supabase-oppsett.md`
- Site URL og Redirect URLs i Supabase → se [[Supabase]]
- [[Prosjektoversikt]] i denne hjernen

Dette skjedde 19. august 2026 da repoet gikk fra `SAM3` til `SuperEnkelEksamen`.
