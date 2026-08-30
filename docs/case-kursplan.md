# Caseintervju — kursplan og kapittelkart

Kontrakten alt innhold skrives etter. Les den sammen med de fem kartleggingene i
`docs/case-research/`, som er kildemerket: hva firmaene selv sier, mot hva
prep-bransjen påstår.

## Det bærende prinsippet

**Kurset er trening, ikke lesestoff.** Et caseintervju måler utelukkende ting du
gjør: bryte ned et problem, regne høyt, lese en figur, lande en anbefaling. Ingen
av dem blir bedre av å leses om.

Konsekvensen for innholdet er hard, og den skal håndheves:

> Manualen er **referanse**, ikke pensum. Et kapittel som forklarer noe leseren
> kunne trent på i stedet, er et mislykket kapittel. Sikt på 900–1 400 ord.
> Alt som kan bli en drill, skal bli en drill.

Til sammenligning ble FIE402-manualen 109 000 ord, fordi den måtte lære et helt
fag uten lærebok. Denne skal være under 20 000, fordi arbeidet ligger et annet
sted.

## Fordelingen av arbeidstid

Målet er at lesing utgjør under en femdel av tiden i kurset.

| Aktivitet | Andel | Hvor |
|---|---|---|
| Struktureringsdrill | ~25 % | Lynlæring · Strukturer! |
| Hele caser | ~25 % | Casetrening |
| Hoderegning og estimering | ~20 % | Lynlæring · Hoderegning, Finn feilen, Bygg estimatet |
| Figurlesing | ~10 % | Lynlæring · Les grafen |
| Fit-historier | ~10 % | Historieporteføljen |
| Lesing | ~10 % | Pensum |

## Kapittelkartet

Seksten seksjoner, k0–k15. Hvert kapittel må kunne forsvare hvorfor stoffet ikke
heller er en øvelse.

| Del | Kap | Innhold |
|---|---|---|
| 0 · Grunnlaget | k0 | Slik bruker du kurset — **skrevet** |
| | k1 | Hva caseintervjuet faktisk måler — **skrevet** |
| | k2 | Husene og prosessene: hvem tester hva, og når fristene er |
| I · Struktur | k3 | Å bryte ned et problem: identiteter, verdikjeder, fem måter å være MECE |
| | k4 | Hypotesedrevet arbeid — og hva som skiller A fra C på samme prompt |
| | k5 | Casetypene og hva hver av dem egentlig spør om |
| II · Tall | k6 | Hoderegning: teknikkene, og hvordan tallet sies høyt |
| | k7 | Estimering og den norske tallbanken |
| | k8 | Figurlesing og de ni fellene |
| III · Framføring | k9 | Å snakke mens du tenker: notater, signposting, å bli motsagt |
| | k10 | Syntesen: anbefaling, grunner, risiko, neste steg |
| IV · Fit | k11 | Historiene: dimensjonene, og hva som gjør én sterk |
| | k12 | «Why consulting, why this firm» — og spørsmålene du selv stiller |
| V · Håndverk | k13 | De digitale testene: Solve, Casey, BCGs logikktest, numeriske tester |
| | k14 | Uka før, dagen før, i rommet |
| Referanse | k15 | Tallark: norske ankere, bransjemarginer, formlene |

## Studieplanen

**Modulbasert** (`plan.mode = "modules"`), fordi han jobber ujevnt fram mot
intervjuene. Hver modul er navngitt etter **det du gjør**, ikke etter kapitlet.

Rekkefølgen følger hva som faktisk feller folk, ikke fagets egen logikk:
strukturering og hoderegning først, teori underveis, fit før første frist.

| Modul | Gjør | Leser |
|---|---|---|
| 1 | Første hele case + 20 hoderegningskort | k0, k1 |
| 2 | 8 struktureringsprompter | k3 |
| 3 | 8 prompter til + Finn feilen | k4 |
| 4 | **Historieporteføljen: skriv fire historier** | k11 |
| 5 | Case 2 + Les grafen | k5, k8 |
| 6 | Bygg estimatet + norske ankere pugges | k7 |
| 7 | Historiene: skriv fire til, kjør sondetest | k12 |
| 8 | Case 3 på tid + syntesedrill | k10 |
| 9 | Mock-intervju med stopp-punkter + Finn feilen | k9 |
| 10 | Case 4 + husene og prosessene | k2 |
| 11 | De digitale testene | k13 |
| 12 | Case 5 og 6 back-to-back, på tid | — |
| 13 | Generalprøve: hel case + fit, uten pauser | k14 |

**Milepæler:** historieporteføljen ferdig etter modul 7, generalprøve etter 13.

## Skrivereglene for manualen

1. **Formatet parseren krever:** `<section id="kN">`, `<h2 class="chap">N · Tittel</h2>`,
   `h3` med `N.M `-prefiks som direkte barn. Deler markeres `<h2 class="part">`.
2. **Norsk**, men fagtermene på engelsk der de faktisk heter det: *issue tree*,
   *MECE*, *candidate-led*, *yield*. Han skal kunne si dem i rommet.
3. **Kildemerk påstander om hva firmaene gjør.** Skiller du ikke mellom
   dokumentert og rykte, arver kurset prep-bransjens svakhet. Bruk
   `<div class="callout">` når noe er ubekreftet.
4. **Ingen frekvensstatistikk som fakta.** «Lønnsomhet er 30–40 % av caser»
   er folklore uten metode. Si det, eller la det være.
5. **Hvert kapittel avsluttes med en peker til øvelsen** som trener stoffet.
   Et kapittel uten en slik peker har trolig ikke livets rett.
