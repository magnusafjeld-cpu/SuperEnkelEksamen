# FIE402: ni nye deleksamener «Mest forventet» (23. november 2026)

Magnus har funnet ut at han ennå ikke kan nok til oppgavene «Med vri» i fanen «Per del»
under Eksamenssett. Han ba om tre nye sett «Mest forventet» i hver del, alle på
eksamensnivå. De 25 deleksamenene som finnes, låner fra de 72 prøveoppgavene, og alle er
brukt. De ni nye får derfor **egne oppgaver** (`kind: "del"` uten `lån`).

«Mest forventet» betyr: **samme form som en oppgave Kurbatov ga i H2024 eller H2025**, med
nye tall, nytt firma og ny historie, men uten ny mekanisme. Studenten som har gjort den ekte
oppgaven, skal kjenne igjen formen og likevel måtte regne alt. Unntaket er CDS: Kurbatov sa
om eksemplet i forelesningen at «a very similar example could be in the exam», og V2024 P3
er laget på det. Det regnes som forventet.

## Settene

| Sett | Oppgave | Poeng | Form (ekte oppgave) | Skribent |
|---|---|---|---|---|
| del1-f3, f4, f5 | 1 | 18 | H2025 E4: WACC og APV over to år, 9 × 2 p, gjeldsjustering i år 1 | S1 |
| | 2 | 20 | H2024 E5: tvilling → r_U, β_E/r_E, WACC, V^L, APV, verbal hale | S1 |
| del2-f3, f4, f5 | 1 | 18 | MM-rekapitalisering uten skatt. f3 og f5: H2025 E3-formen (evigrente, utbytte, rekap til en D/V, tre aksjonærer sammenlignet). f4: H2024 E3-formen (ny gjeld innfrir gammel, resten som utbytte; risikabel gjeld; tilbakekjøp som alternativ) | S2 |
| | 2 | 18 | H2024 E4: risikoskifting med prosjekter i tilstander, gjeldsnivået som gir likegyldighet, sikring som overfører verdi til kreditorene | S2 |
| del3-f4 | 1 | 12 | H2025 E1: opsjonsintuisjon, verbalt (ingen BS-regning) | S4 |
| | 2 | 12 | H2024 E2: to måter å overvåke ledelsen, hvem og med hvilke verktøy | S4 |
| | 3 | 20 | H2024 E6: investere nå eller vente, ρ fra et omsatt verdipapir | S3 |
| | 4 | 20 | CDS som V2024 P3 og L10 s9–10, ρ som misligholdssannsynlighet | S3 |
| del3-f5 | 1 | 12 | H2024 E1: M&A-motiver (ikke synergier), positive og negative for kjøper og mål | S4 |
| | 2 | 12 | H2025 E2: tiltak for en eier med 5–10 % | S4 |
| | 3 | 20 | H2025 E5: studie nå eller om ett år, exit, likegyldig verdi | S3 |
| | 4 | 20 | H2025 E6: dealsannsynlighet (Mannesmann), motiv, avstemning, aksjebytte | S3 |
| del3-f6 | 1 | 12 | H2025 E1-formen igjen, ny vinkel på intuisjonen (σ, tid, implisitt mot egen vol) | S4 |
| | 2 | 12 | Governance i samme form, ny vinkel (for eksempel lønn og KPI eller styret) | S4 |
| | 3 | 20 | H2024 E6-formen igjen, annen kontantstrøm og annet verdipapir enn f4 | S3 |
| | 4 | 20 | H2025 E6-formen igjen: dealsannsynlighet med T = 0,25 eller 0,5 (brøkdel av år) | S3 |

De tre settene i en del skal ikke være samme oppgave med nye tall. Bytt bransje, størrelser,
hvilket ledd som er konstruksjonsledd og hvilken sjekk sensor forventer, men hold formen.
Poengene per deloppgave skal ligne den ekte oppgaven (H2025 E4 hadde 9 × 2 p).

## Kilder: les før du skriver

1. `docs/fie402-proveeksamen-spek.md`, **hele**: format, dataformat, skriveregler, kontroller,
   «Lessons from the blind review» og «Signals from all lecture recordings». Alt gjelder her,
   unntatt poengfordelingen 12/12/18/18/20/20 for hele sett.
2. Den ekte oppgaven formen kommer fra: `h2024` og `h2025` (og `v2024` for CDS) i
   `fag/fie402/sett.js`, og Kurbatovs nøkler `FIE402_Corp_course_files/2024 - S.pdf`,
   `2025 - S.pdf` og `2024V - S.pdf` (les med PyMuPDF). Nøklene viser minste godtatte svar.
3. `docs/fie402-prediksjon.md` § 3 (rotasjonen: hvor hver ekte oppgave kom fra) og § 4
   (vanskelighetsgrad, trekk, hva som godtas, A-svar).
4. `docs/fie402-forfatterspek.md` (notasjon og stil) og `docs/fie402-forelesninger-2026.md`.
5. Signalfilen `../7. Semester/FIE402 Corporate Finance/NotebookLM-kilder/FIE402 NotebookLM
   source exam signals from all lecture recordings.md`. Den går foran de eldre kildene.
   Panopto-tekstingen ligger i `../7. Semester/FIE402 Corporate Finance/Forelesninger/Teksting
   fra Panopto/`. **NotebookLM-kildene kan regne ut tall Kurbatov aldri sa** (fallgruve 17 i
   hjernen): sjekk påstander om hva han sa mot tekstingen.
6. `docs/fie402-svar-spek.md`: svar-dataene for rettingen.
7. `docs/fie402-ov-spek.md` § 6b: lærdommer fra kontrollen av «Øv uten stopp».

## Ikke gjenbruk

Ingen scenario, firmanavn eller tall fra H2024, H2025, V2024, prove1–prove12 (i `sett.js` og
`fag/fie402/_prove/`), Home Assignment 1–2, Problem Set 1–4 eller oppgavene i «Øv uten
stopp» (`fag/fie402/_ov/*.py`). Søk i de filene etter firmanavnet og hovedtallene dine før du
leverer.

## Data

Hver skribent eier bare disse filene (`<S>` er `s1`, `s2`, `s3` eller `s4`):

- `fag/fie402/_del/<S>_regn.py` regner alle tall og skriver de to filene under.
  Kjør med `python3 -I`.
- `fag/fie402/_del/<S>.json`: `{ "del1-f3": [oppgave, …], … }`. En oppgave er som i
  prøveeksamenene (`n`, `title`, `points`, `topic`, `chapters`, `body`, `parts` med `label`,
  `points`, `body`, `solution`, `criteria`; verbale oppgaver uten `parts` har `solution` og
  `criteria` på oppgaven), **pluss `merke`**: en kort norsk tekst som vises ved oppgaven og sier
  hvilken ekte oppgave den ligner, for eksempel «Som H2025 E4: WACC og APV over to år».
  Merket navngir aldri mekanismen oppgaven spør etter. `n` er nummeret i settet fra tabellen.
- `fag/fie402/_del/<S>_svar.json`: svar-data etter `docs/fie402-svar-spek.md`, med nøkler
  `"<settId>:<n>:<etikett>"` (verbal oppgave uten deler: `"del3-f4:1:"`).

Ikke rør `sett.js`, `svar.js`, `_svar/` eller andre skribenters filer. Hodene til settene står i
`fag/fie402/_del/sett.json` (ikke endre).

## Regler i korte trekk

- Engelsk, ingen tankestrek (—), ikke komma før «and», minus «−». Ingen kjønnede pronomen om
  Kurbatov.
- Bare formelarkets formler. WACC-oppgaver antar konstant D/E eller D/V. Ingen justert WACC
  for permanent gjeld. Ingen Black-Scholes-regning. Bare europeiske opsjoner regnes.
- Del a er lett. Hver regneoppgave har minst én sjekk sensor forventer og slutter med en verbal
  hale. «Use 4 decimal places» der det betyr noe. Oppgi alle tall studenten trenger.
- Et senere ledd røper ikke svaret på et tidligere («Are they better or worse off?», ikke
  «Show that they are no worse off»). Oppgis et tall fra et tidligere ledd, bruk en annen
  hypotetisk verdi.
- Lengde som Kurbatov: rundt 11 ord oppgavetekst per poeng.
- Exit- og nedleggingsopsjoner sammenlignes med 0, aldri med den negative NPV-en. Vente-
  opsjonens tvilling må prise den samme kontantstrømmen. Diskret diskontering, også for
  brøkdeler av år. Dealsannsynlighet med (1 + r_f)^T.
- Kriteriene bruker Kurbatovs nøkkelord der de passer («wealth transfer», «the firm forgoes
  positive-NPV projects»), og krever aldri en sjekk spørsmålet ikke ba om.
- Governance i en generell (amerikansk) ramme. Styrestørrelse 7–11. Proxy access via
  vedtektene, ikke SEC-regelen.

## Kontroll før levering

1. `python3 -I fag/fie402/_del/<S>_regn.py` uten feil, med `assert` på alle sjekkene.
2. `python3 tools/flett-del.py fie402` viser ingen `FEIL` for dine sett. (Feil om at andre
   skribenters oppgaver mangler, kan du se bort fra.)
3. Hvert tall i svar-dataene står i løsningsteksten (innenfor toleransen), eller er merket
   `regnet: true` med `merknad`.

## Kontroll etterpå

Hver skribents sett løses blindt av en uavhengig kontrollør fra en versjon uten løsning og
kriterier (`tools/flett-del.py fie402 --blind <mappe>`). Kontrolløren regner alt på nytt,
sammenligner, og vurderer om hvert ledd har ett forsvarlig svar og om oppgaven ligner Kurbatov.
Funnene rettes før settene flettes inn med `--skriv`.
