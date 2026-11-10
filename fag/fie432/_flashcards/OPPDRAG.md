# Oppdrag: flashcards med «oppgavetype → løsning» for FIE432

Magnus har eksamen i FIE432 Personlig økonomi (NHH) torsdag 12. november 2026: fire timers digital flervalg, 30 ledd, +3/−1/0, satser og regler oppgis i oppgaveteksten. Han vil ha et sett flashcards der **forsiden er en type oppgave han kan få** og **baksiden er riktig svar eller hvordan man løser den**. Settet skal dekke **alle oppgavetyper som kan komme**, slik at han raskt kan gå gjennom hele pensum. Kortene deles i kategorier (kortstokker).

Du skriver én halvdel. Halvdelen din står i oppdraget ditt.

Repoet: `/Users/magnusfjeld/Documents/Magnus Fjeld/NHH/SuperEnkelEksamen`.

## Kildene (les målrettet)

1. `docs/fie432-research/01-eksamens-dna.md`: § 1 (alle registrerte spørsmål), § 2 (frekvenstabellen) og § 4 (de 20 regnerutinene R1–R20 med fellene). Det er ryggraden: hver rutine og hver spørsmålstype som har vært gitt, skal ha minst ett kort.
2. `docs/fie432-proveeksamen-spek.md`, delen «Prøveeksamen 13, 14 og 15»: prediksjonstabellene med sannsynlighet per tema. Temaer med høy sannsynlighet skal ha flere kort (flere vrier).
3. Manualen: `fag/fie432/_fragmenter/kN.html` (k0–k20). Fasiten for regler, begreper og fakta. k20 har satser og formler. Les bare kapitlene som hører til halvdelen din.
4. De ekte flervalgssettene og prøveeksamenene i `fag/fie432/sett.js` (`h2025`, `h2024`, `h2022`, `mc2026`, `prove1`–`prove18`). Hent dem ut med node eller Python, ikke les hele fila. Bruk dem til å finne **alle vriene** som er spurt (annen ukjent, grensetilfeller, begrepsledd), og til å kontrollere at kortene stemmer med fasitene.
5. Lysbildene ved tvil: `/Users/magnusfjeld/Documents/Magnus Fjeld/NHH/7. Semester/FIE432 Persøk/_claude/tekst2/`. 2026-forelesningene gjelder.

Ta aldri et tall fra hukommelsen. Regn hvert eksempel i Python (`python3 -I`).

## Kortet

- **Forsiden** (`front`): ren tekst, **ingen HTML** (feltet escapes). Beskriv oppgavetypen slik den ser ut på eksamen, gjerne med et lite konkret tall-eksempel, for eksempel: «Utbytte år 2 når utbyttet i år 1 var lavere enn skjermingen: hva er skattepliktig? (Kostpris 100 000, rente 3 % og 4 %, utbytte 2 000 og 6 000)». Eller for begrepsledd: «Hvem bærer stykkskatten når tilbudet er perfekt elastisk?». Maks rundt 40 ord.
- **Baksiden** (`back`): HTML (`b`, `i`, `br`, `sub`, `sup`, `ul`/`li`). Bygd slik:
  - `<b>Svar/regel</b>` på én linje (formelen eller fasiten).
  - Framgangsmåten i 2–4 korte steg, med tallene fra forsiden regnet ut.
  - `Felle:` de vanlige gale svarene (som i alternativene), kort.
  - Kilde i parentes til slutt, for eksempel (F4 lb 33, H2025 4).
  - Maks rundt 90 ord. Skal leses på 15–20 sekunder.
- **Ett kort = én oppgavetype eller én vri.** Ikke slå sammen. Lag heller flere kort for viktige rutiner (for eksempel skjerming: år 1, framført ubenyttet, gevinst med ubenyttet skjerming, skjerming kan ikke øke tap, kjøp/salg i året, per aksje).
- **Begrepsledd** og faktaledd (fra lysbildene) skal også med, ikke bare regning.

## Format på leveransen

Skriv et JSON-array til fila oppdraget ditt oppgir. Hvert element:

```
{ "id": "fo-<kategori>-<nr>", "ch": <manualkapittel 0–20>, "deck": "<kategori>", "front": "...", "back": "..." }
```

`deck` er kategorinavnet slik det skal vises i appen (første bokstav gjøres stor automatisk). Bruk nøyaktig kategoriene fra oppdraget ditt. id-ene skal være stabile og unike, for eksempel `fo-skj-01`.

## Skriveregler (ufravikelige)

Bokmål. Ingen tankestrek («—» eller « – »). Aldri komma foran «og». Minustegn «−» i negative tall. Tall med mellomrom som tusenskille og desimalkomma. Kort og direkte.

## Kontroll før levering

- Gyldig JSON. Ingen `<` i `front`. `grep` etter «—», « – » og «, og» gir null treff.
- Hvert tall i eksemplene er regnet i Python.
- Gå gjennom § 4 R1–R20 (de som hører til halvdelen din) og frekvenstabellen og bekreft at hver rutine og hvert tema har kort.

## Rapport

Svar kort: antall kort per kategori, hvilke rutiner og temaer som er dekket, og ledd der du var i tvil om kilden. Ikke lim inn kortene.
