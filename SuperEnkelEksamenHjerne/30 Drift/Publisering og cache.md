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

## Byggnummeret buster JS — ikke pensum

Dette er den viktigste enkeltfellen i hele oppsettet, og den kostet en dag.

`?v=N` på script-taggene gjør at nettleseren henter ny **kode**. Den parsede
manualen ligger et helt annet sted: i `localStorage`, under en nøkkel som
tidligere het `edu.<id>.manual.v1` — **uten versjon**.

Konsekvensen: en telefon som åpnet appen mens pensum var halvferdig, lagret den
halvferdige versjonen og hentet **aldri** en ny. Byggnummeret ble bumpet tjue
ganger uten at pensum ble oppdatert på den enheten. Symptomet var at «Pensum ser
fortsatt nesten tom ut» lenge etter at manualen var ferdig — og ingenting i
utviklerens egen nettleser avslørte det, fordi den hadde fått tømt bufferen
underveis.

**Rettet 31. august 2026:** nøkkelen er nå `edu.<id>.manual.b<byggnummer>`, lest
fra script-taggene ved oppstart. Et bygg-bump ugyldiggjør dermed pensum
automatisk. `ryddGamleBuffere()` sletter buffere fra tidligere bygg, ellers ville
localStorage vokst med én kopi av hvert pensum per bygg mot et tak på ~5 MB.

De gamle `sam3.*`-nøklene fra før fag-velgeren migreres nå **én gang og slettes**.
Uten slettingen ville de servert utdatert pensum ved hver senere endring.

> [!warning] Når du endrer en manual
> Bump byggnummeret. Det er nå nok — men bare fordi nøkkelen inneholder det.
> Legger noen tilbake en uversjonert bufferkonstant, er fella tilbake.
