# Super Enkel Eksamen

## Les hjernen først

Prosjekthukommelsen ligger i Obsidian-hvelvet `SuperEnkelEksamenHjerne/`.
Start med disse tre før du foreslår eller endrer noe:

- `SuperEnkelEksamenHjerne/00 Prosjekt/Prosjektoversikt.md`
- `SuperEnkelEksamenHjerne/10 Arkitektur/Arkitektur.md`
- `SuperEnkelEksamenHjerne/30 Drift/Fallgruver.md`

`SuperEnkelEksamenHjerne/Hjernen.md` er kartet over resten.
Skal du foreslå arbeid, sjekk først
`SuperEnkelEksamenHjerne/00 Prosjekt/Åpne spørsmål og neste steg.md`.

## Jobber du med FIE402?

Les `docs/fie402-forfatterspek.md` (format, notasjon, stil, og lærdommene fra
kontrollen) og `docs/fie402-kursplan.md` (kapittelkart og eksamens-DNA) før du
skriver fagstoff. Statusen står i
`SuperEnkelEksamenHjerne/20 Fag/FIE402 Corporate Finance.md`.

## Ufravikelige regler

1. **Ingen bygging, ingen avhengigheter.** Vanilla JS. Ikke foreslå npm,
   bundler, TypeScript eller rammeverk.
2. **`js/` er motor, `fag/` er innhold.** Ingen fagstoff i motoren, ingen
   apparatur i fagdataene.
3. **Bump byggnummeret** i `index.html` etter enhver endring i `js/` eller
   `fag/`: `sed -i '' 's/?v=[0-9]*/?v=N/g' index.html`. Uten dette kjører
   telefonen gammel kode i ti minutter.
4. **Motoren må aldri snapshotte `EDU_DATA`** — fagdata lastes etter motoren.
   Bruk `S.data`-gettere.
5. **Norsk** i kommentarer, UI-tekst og commit-meldinger.

## Oppdater hjernen

Endrer du noe hjernen beskriver, oppdater notatet i samme økt og sett
`oppdatert:` i frontmatter. Reglene står i
`SuperEnkelEksamenHjerne/40 Arbeidsmåte/Slik oppdaterer du hjernen.md`.
