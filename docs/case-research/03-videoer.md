# Videobank: mock case-intervjuer (management consulting)

Kilde til `03-videoer.json`. 70 videoer, alle verifiserte.

## Verifisering

Hver eneste ID er slått opp mot YouTubes oembed-endepunkt:

```
curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=ID&format=json"
```

- **164** distinkte kandidat-ID-er ble testet.
- **3 forkastet** fordi oembed ikke ga gyldig JSON (`myvgI5OfDO4`, `5eYwh5lxZmU`,
  `psuKyBsH1oo`). Alle tre kom fra søketreff som så plausible ut — de er nettopp
  den typen ID som ville blitt en død lenke i appen.
- **161 gyldige**, hvorav **70** er valgt ut til settet.
- Til slutt ble alle 70 kjørt gjennom oembed på nytt med streng sammenligning av
  `tittel` og `kanal` mot det filen påstår: **70/70 eksakt treff, 0 avvik.**
  Skriptet ligger i `final_check.py` og kan kjøres på nytt når som helst.

Ingen ID er skrevet av fra hukommelsen. `tittel` og `kanal` er ordrett det
oembed returnerte — flere steder avviker det fra søketreffets tittel (f.eks.
ble «This Brutal McKinsey Mock Interview Changed Everything» i realiteten
«From "Worst Case Interview Ever" to Bain's #1 Recruit»). Den videoen er ikke
med, nettopp fordi tittelavviket gjorde innholdet uklart.

## Sammensetning

| Felt | Fordeling |
|---|---|
| type | mock 51 · exhibit 4 · matte 4 · fit 4 · struktur 4 · teori 3 |
| firma | McKinsey 19 · BCG 15 · Bain 9 · generisk 26 · annet 1 (Deloitte) |
| stil | candidate-led 27 · interviewer-led 25 · n/a 18 |
| nivå | intro 14 · middels 48 · avansert 8 |
| casetype | lønnsomhet 10 · markedsinngang 7 · M&A 6 · vekst 4 · estimering 3 · prising 2 · ops 1 · annet 7 · null 30 |

17 ulike kanaler: Bain & Company (offisiell), IGotAnOffer, Management Consulted,
CaseCoach, CraftingCases, rocketblocks, Prepmatter, CaseBinge, Leland,
Hacking the Case Interview, MConsultingPrep, My Consulting Offer, PrepLounge,
firmsconsulting, Case Interview Hub, Yale SOM (Elaine Dang), IIM Lucknow.

Samlet spilletid: **33,6 timer**. `minutter` er hentet fra `lengthSeconds` på
videosiden for alle 70 — ingen er gjettet.

## Hvordan feltene er satt

- `tittel`, `kanal`, `minutter` — hentet, ikke vurdert.
- `casetype` — satt kun der tittel eller kapittelmarkører sier det eksplisitt.
  **30 står som `null`** fordi casen ikke er navngitt i metadataene. Det er
  bevisst; å gjette «lønnsomhet» på en umerket case ville vært verdiløst.
- `stil` — `interviewer-led` for McKinsey-caser, `candidate-led` for BCG/Bain,
  som er firmaenes kjente format. To videoer sier det selv i tittelen
  (`MRR4duTP2v8` «Interviewer-Led», `47BCwcHITJM` «Candidate-led»). Der firmaet
  ikke er oppgitt, er feltet satt ut fra kanalens beskrivelse eller `n/a` for
  teorivideoer. Dette er den ene plassen med et konvensjonsbasert valg framfor
  ren metadata — verdt å vite hvis appen skal filtrere hardt på det.
- `nivå` — `intro`/`avansert` der tittelen sier det («Beginner», «HARD»,
  «ADVANCED», «101», «in X minutes»). Fullengdes standardmocker er satt til
  `middels`. Dette er en kuratorvurdering, ikke hentet metadata.
- `harLøsning` — `true` for alle 70: hele settet er demonstrasjoner eller
  gjennomganger som ender i et svar. Ingen av dem er en ren oppgave uten fasit.

## Stopp-punkter

**34 videoer har `stopp`, med til sammen 103 punkter.** Alle tidsstempler er
regnet om fra kapittelmarkørene i videoens egen beskrivelse — ingen er anslått.
De 36 videoene uten kapittelmarkører har bevisst ingen `stopp`.

Mønsteret er å pause rett før hver fase kandidaten skal gjøre selv:

- før «Framework / Structure» → «Strukturer casen selv før du fortsetter»
- før «Math / Calculation» → «Regn ut selv før du ser fasiten»
- før «Chart / Exhibit / Data interpretation» → «Tolk grafen selv …»
- før «Brainstorming» → «List opp ideene dine selv først»
- før «Recommendation / Synthesis» → «Formuler anbefalingen selv»

Best egnet til pausetrening (kapittelstrukturen matcher fasene tettest):

1. `SyThS7iJyA4` — Prepmatter, McKinsey lønnsomhet. Feedback underveis på 6:12
   og 19:52, ikke bare til slutt. 5 stopp.
2. `MRR4duTP2v8` — Management Consulted, McKinsey i sanntid. To adskilte
   matteblokker (21:36 og 37:07). 4 stopp.
3. `m4-nYDCLeI0` — rocketblocks, prising + markedsinngang. Intervjuerfeedback
   etter *hvert* delsvar. 5 stopp.
4. `dYN3iBB5ACM` — IGotAnOffer, BCG. To mattespørsmål etter hverandre. 5 stopp.
5. `dlozAlvJTls` — CaseCoach, ekte McKinsey-intervjuer. Ekshibit + matte +
   kreativitet i samme case. 5 stopp.
6. `9sa3GpJUFIk` — MConsultingPrep, M&A, 1t20m. Seks navngitte feedback-bolker
   etter casen. 5 stopp.
7. `etrQE1CY2q0` — rocketblocks, markedsinngang. Mest trening per minutt: graf,
   brainstorm, kvant og syntese på 25 min. 5 stopp.
8. `orsNS3YG_KE` — CraftingCases. Spørsmål og svar ligger i *separate* kapitler,
   altså designet for å pause. 4 stopp.
9. `bJaBubQ6Zao` — IGotAnOffer, Bain vekst. Hele kjeden med coach-refleksjon.
10. `N5SLtfVoZAM` — CraftingCases, hard estimering + seks leksjoner. 5 stopp.

## Notater til den som bygger videre

- **`rocketblocks` del I/II/III** (`RKrLeGbckpM`, `8exEEeSvfQw`, `BokBw_HI8wE`)
  er én serie som viser samme spørsmål besvart svakt / greit / godt. De hører
  sammen og bør vises i rekkefølge — det er den raskeste måten å vise en bruker
  hva som faktisk skiller nivåene.
- **`ZqouKTczJSc` og `e6XlxFnNt6w`** er de eneste fra en offisiell firmakanal
  (Bain & Company). McKinsey og BCG publiserer ikke egne fullengdes mocker på
  YouTube — alt «McKinsey-stil» i settet er laget av tredjeparter.
- **Tynneste kategori er `ops`** — kun én ren kostnadskuttcase (`EM1_-giG-xs`).
  Verdt et målrettet søk hvis appen skal ha jevn dekning per casetype.
- Verifiseringsskriptene ligger igjen i samme mappe: `verify.sh` (oembed),
  `meta.py` (lengde + kapittelmarkører), `final_check.py` (streng kontroll av
  hele JSON-filen), `build.py` (genererer JSON-en).
