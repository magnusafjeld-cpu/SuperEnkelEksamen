# FIE402: «Må kunne» i Eksamenstrening (26. november 2026)

Magnus vil ha en egen del i Eksamenstrening med **oppgavetypene han må ha full kontroll på før
eksamen 7. desember**, sortert i tre tiers. Tier 1 er det som må kunnes perfekt. Hver
oppgavetype får **tre helt nye, hele eksamensoppgaver** han kan jobbe seg gjennom. Listen under
bygger på en ny gjennomlesing av alle 17 Panopto-opptakene (26. november 2026), Kurbatovs to
eksamener (H2024, H2025) og `docs/fie402-prediksjon.md`.

Appen viser typene i fanen «Må kunne» (`js/bundle-trening.js`). Hver oppgave er et eget sett
med `kind: "must"` og åpnes i Eksamenssett-motoren med retting, fasit og eksamensmodus på tid.

## Les før du skriver

1. **`docs/fie402-deleksamen-spek.md`, hele.** Dataformat, svar-data, regler og kontroll gjelder
   her, med unntakene under. Den viser videre til `docs/fie402-proveeksamen-spek.md` (særlig
   «Lessons from the blind review» og «Signals from all lecture recordings»),
   `docs/fie402-forfatterspek.md`, `docs/fie402-svar-spek.md` og `docs/fie402-ov-spek.md` § 6b.
   Les dem.
2. **Forelesningsstedet for typene dine** (tidsstemplene i tabellen). Tekstingen ligger i
   `../7. Semester/FIE402 Corporate Finance/Forelesninger/Teksting fra Panopto/`, én fil per
   opptak (`FIE402 NN …txt`). Les fra noen minutter før tidsstempelet til eksemplet er ferdig.
   Tekstingen er maskinlaget: «VAC» er WACC, «raw» er ρ, «minus one» er Mannesmann. Regn
   eksemplet selv.
3. **Kurbatovs eksamensoppgave i samme form**, der den finnes: `h2024`, `h2025` (og `v2024`) i
   `fag/fie402/sett.js`, og nøklene `FIE402_Corp_course_files/2024 - S.pdf` og `2025 - S.pdf`
   (les med PyMuPDF). Nøklene viser hvor kort et fullt svar kan være.
4. Formelarket: `FIE402_Corp_course_files/Formula sheet.docx`. Bare de formlene, pluss τD,
   annuitet og voksende evigrente.

## Hva en oppgave er

- **Hel eksamensoppgave.** Regneoppgaver er **20 poeng** med 4–7 deloppgaver. Teorioppgaver er
  **10 poeng**. Kurbatov sa i wrap-up at teorispørsmålene er rundt 10 poeng hver, at regning er
  rundt 80 % og at hver regneoppgave har «three or five points for the intuition at the end»
  (opptak 18, 1:16:47 og 1:26:03).
- **Del a er lett** («you can collect those three points in every exercise pretty much part a
  would be very easy», opptak 18, 1:27:26). **Siste del er en verbal hale** på 3–5 poeng.
- **Formen er Kurbatovs, tallene og historien dine.** Ingen ny mekanisme. Magnus har sagt at han
  ennå ikke kan nok til oppgaver med vri, så alle tre skal være på eksamensnivå i forventet form.
- **De tre oppgavene i en type er ulike.** Bytt bransje, valuta, størrelser, hva som oppgis og hva
  som er konstruksjonsleddet, og hvilken sjekk eller hale som kommer til slutt. Rettesnor:
  - Oppgave 1 ligger nærmest forelesningseksemplet (samme rekkefølge på leddene).
  - Oppgave 2 ligger nærmest Kurbatovs eksamensoppgave i formen, der en finnes. Ellers
    forelesningsformen med et annet konstruksjonsledd.
  - Oppgave 3 tar med det tillegget Kurbatov har varslet for typen (står i tabellen), for
    eksempel rente for brøkdel av år, «what if the deal is delayed by one year?» eller retningen
    for en amerikansk opsjon. Fortsatt ingen ny mekanisme.
- Lengde som Kurbatov: rundt 11 ord oppgavetekst per poeng. Tid: 1,8 min per poeng (regnes av
  verktøyet).

## Data

Skribenten `<W>` (`w1` … `w5`) eier bare `fag/fie402/_mk/<W>_regn.py`, `<W>.json` og
`<W>_svar.json`.

- `<W>_regn.py` regner alle tall og skriver de to filene. Kjør med `python3 -I`, med `assert` på
  alle sjekker.
- `<W>.json`: `{ "mk-<typeId>-<nr>": oppgave, … }` med `nr` 1, 2, 3. Én oppgave per nøkkel, i
  samme form som i deleksamenene: `n` (alltid 1), `title`, `points`, `topic`, `chapters`,
  `body`, `parts` med `label`, `points`, `body`, `solution`, `criteria`. Teorioppgaver uten
  `parts` har `solution` og `criteria` på oppgaven. **Pluss `merke`**: en kort norsk tekst om
  hvilken form oppgaven har, for eksempel «Samme form som CDS-eksemplet i forelesning 13».
  Merket navngir aldri mekanismen oppgaven spør etter.
- `<W>_svar.json`: svar-data etter `docs/fie402-svar-spek.md`, med nøkler
  `"mk-<typeId>-<nr>:1:<etikett>"` (teorioppgave uten deler: `"mk-<typeId>-<nr>:1:"`).

Ikke rør `sett.js`, `svar.js`, `_svar/`, `typer.json` eller andre skribenters filer.

## Ikke gjenbruk

Ingen scenario, firmanavn eller hovedtall fra forelesningseksemplet selv, H2024, H2025, V2024,
eldre eksamener, prove1–prove12 og del-/hint-settene i `fag/fie402/sett.js`, `fag/fie402/_del/`
(s1–s4, h1–h4), Home Assignment 1–2, Problem Set 1–4, «Øv uten stopp» (`fag/fie402/_ov/*.py`)
eller de andre skribentenes `_mk`-filer. Søk etter firmanavnet og hovedtallene dine før du
leverer (`grep -rn`).

## Regler i korte trekk

- Engelsk, ingen tankestrek (—), ikke komma før «and», minus «−». Ingen kjønnede pronomen om
  Kurbatov (navn eller «the lecturer»).
- Bare formelarkets formler. WACC-oppgaver antar konstant D/E eller D/V. Ingen justert WACC for
  permanent gjeld eller rentedekning som regning. Ingen Black-Scholes-regning. Bare europeiske
  opsjoner regnes; en amerikansk opsjon bare som retning.
- Oppgi alle tall studenten trenger og hvilken konvensjon som gjelder der Kurbatov har sagt at
  det er tvetydig (for eksempel om kontantstrømmen starter nå). «Use 4 decimal places» der det
  betyr noe.
- Et senere ledd røper ikke svaret på et tidligere. Trenger et ledd et tall fra et tidligere,
  oppgi en hypotetisk verdi som ikke er svaret («If you could not solve (b), use 0.30»).
- Exit- og nedleggingsopsjoner sammenlignes med 0. Diskret diskontering, også for brøkdel av år.
- Kriteriene bruker Kurbatovs nøkkelord der de passer («wealth transfer», «the firm forgoes
  positive-NPV projects», «invest if there are good investment opportunities») og krever aldri
  en sjekk spørsmålet ikke ba om.
- Governance i en generell (amerikansk) ramme. Styrestørrelse 7–11. Proxy access via
  vedtektene. Ikke «a smaller board works better».

## Typene

Tier 1: må kunnes perfekt. Tier 2: viktig. Tier 3: bør kunnes. Kolonnen «Varslet tillegg» er
det oppgave 3 tar med.

| Tier | typeId | Type | p | Forelesning (tidsstempel) og form | Varslet tillegg (oppgave 3) | Skribent |
|---|---|---|---|---|---|---|
| 1 | `wacc-apv` | WACC og APV på samme prosjekt | 20 | 08 (1:08:58 FCF som del a, 1:19:30, 1:24:02), 09 (8:18, 44:22 to sammenlignbare, 54:35 β<sub>D</sub> = 0), 18 (6:41 prosjekt mot firma, 51:00, 51:59). Form: FCF for prosjektet, r<sub>U</sub> fra sammenlignbare, D/V ↔ D/E, r<sub>wacc</sub>, V<sup>L</sup>, gjeldskapasitet, PV(TS) med r<sub>U</sub>, samme svar, tolk r<sub>wacc</sub> mot r<sub>U</sub>. H2024 E5, H2025 E4 | Firmatall oppgitt, men prosjektet skal verdsettes; ΔNWC; NPV, ikke PV | W1 |
| 1 | `mm-rekap` | MM-rekapitalisering, utbytte og tilbakekjøp i perfekt marked | 20 | 03 (1:00:59 ny kurs), 05 (1:09:12 to likninger, 1:14:10 utbytte = tilbakekjøp), 06 (16:25 bedre eller verre stilt, 22:00 via r<sub>U</sub>), 18 (21:07). Form: kurs ved kunngjøring, gjeld til utbytte eller tilbakekjøp, antall aksjer til ny kurs, r<sub>E</sub> via r<sub>U</sub>, hvem som er bedre stilt. H2024 E3, H2025 E3 | Risikabel gammel gjeld som innfris (r<sub>D</sub> endres), eller utbytte finansiert med emisjon | W2 |
| 1 | `gjeldsoverheng` | Gjeldsoverheng: hvem vil ha prosjektet? | 20 | 03 (17:29 «very often asked on the exam»), 04 (33:41 til 49:46, 44:31 halve poengene), 06 (55:52 til 1:15:48, PS1 E6), 18 (29:31 «check whether the manager wants this project»). Form: firma med gjeld i to tilstander, prosjekt med positiv NPV finansiert med ny egenkapital, vil lederen (eier EK) det, formuesoverføring, reforhandling av pålydende som får alle med | Ny senior gjeld som løsning, eller sannsynligheter som ikke er 50/50 | W5 |
| 1 | `vente` | Realopsjon: investere nå eller vente | 20 | 14 (17:06 til 30:40: «starting now»-fella 19:57, indifferent X 29:57), 14 (1:05:41 til 1:16:09: ρ fra et omsatt verdipapir når sannsynlighetene mangler, 1:07:41). Form: NPV nå, NPV ved å vente (dårlig tilstand mot 0), beslutning, X som gir indifferens, intuisjon. Si tydelig om investering nå regnes med dagens pris for alltid eller forventet pris. H2024 E6, H2025 E5 | ρ fra omsatt verdipapir; hale «what if σ is very low?» (14, 46:34) | W3 |
| 1 | `deal` | Fusjonsarbitrasje og implisitt dealsannsynlighet | 20 | 16 (54:58 til 1:22:12 Mannesmann, 1:11:07, 1:22:12 «the most important task»), 18 (1:11:04). Form: kurser før ryktene og nå, bytteforhold, verdi av budet, long-short-posisjonen, verdier ved suksess og fiasko (kursene går tilbake), p fra (1 + r<sub>f</sub>)<sup>T</sup>, hvem som betaler for mye, motiv. H2025 E6 | T som brøkdel av år (tre måneder = 0,25); selvfinansiert posisjon (16, 1:14:18); hale «What if we can delay this M&A by one year?» (18, 5:29) | W4 |
| 1 | `cds` | Risikabel obligasjon og CDS | 20 | 13 (17:42 «a very similar example could be in the exam», 25:53, 27:31 ρ og 1 − ρ byttet, 32:24), 18 (1:00:51). Form: pris på risikofri og risikabel obligasjon, lovet mot forventet avkastning, ρ (risikonøytral misligholdssannsynlighet, definert som mislighold), CDS-pris per $1 = ρ/(1 + r<sub>f</sub>), antall kontrakter (pålydende × tap), hvorfor ρ er høyere enn den reelle. V2024 P3 | Obligasjon med løpetid 1,5 eller 2 år, eller verdien av en put på eiendelene | W5 |
| 1 | `governance` | Governance (teori, 10 p) | 10 | 17 (0:45, 2:08 «pretty much always», 24:08 overvåkingskanaler, 29:13 to typer overvåking, 35:23 CEO-kontrakt, 1:18:44 og 1:22:05 eierens verktøykasse). Tre ulike vinkler: (1) eier som velger tre tiltak i kontrakt og overvåking, (2) lønn, KPI-er og kortsiktighet, (3) styret eller forsvarstiltak. H2024 E2, H2025 E2 | Setningsbudsjett og poeng per element som Kurbatov | W4 |
| 2 | `skatt-rekap` | Rekapitalisering med skatt (τD) og skatteskjold | 20 | 03 (32:55 «Part A of your exam question»: PV av rentenes skatteskjold med annuitet, 44:56 τD, 55:28 rekap med kurshopp, 1:18:26 og 1:29:12 100 % gjeld), 06 (PS1 E4 c–d, 52:17), 18 (31:50, 32:14; V<sup>U</sup>(1 + τk) som snarvei). Form: V<sup>U</sup>, PV(TS), kurs ved kunngjøring, antall aksjer kjøpt tilbake, hvem får gevinsten | Konstant rentedekning V<sup>L</sup> = (1 + τk)V<sup>U</sup>, eller hale om hvorfor 100 % gjeld ikke er optimalt i virkeligheten | W2 |
| 2 | `binomisk` | Opsjonsprising: replikasjon, ρ og put-call-paritet | 20 | 12 (10:12 «Options will 100% be on the exam», 16:41, 44:32, 1:12:53), 18 (57:02 prise den letteste først, 58:18 amerikansk retning, 1:00:51 egen øvelse). Form: replikerende portefølje, ρ, call med ρ, put fra paritet, arbitrasje hvis en pris er feil | Seks måneder (√(1 + r<sub>f</sub>)) og hale «what if the option was American?» | W3 |
| 2 | `senior-junior` | Senior og junior gjeld som calls | 20 | 13 (9:44, 48:57 til 1:16:02 Google, «So this actually could be in the exam»), 18 (1:04:19). Form: nullkupongobligasjoner, call-priser (bid og ask) per aksje, antall aksjer, E, senior, junior, yield annualisert, sjekk at summen er V | Hale: gjeld som PV(F) − put, og hva høyere volatilitet gjør med senior og junior | W3 |
| 2 | `ipo` | Vinnerens forbannelse i IPO-er | 20 | 07 (0:56, 1:05:24 «maybe I will try to include something like that in the exam», 1:16:51 «this is what I will try to incorporate in the exam»). Form: like IPO-er, informerte byr bare på gode, tildeling ved overtegning, uinformertes avkastning ved en pris, break-even-pris, gjennomsnittlig førstedagsavkastning mot det uinformerte tjener, intuisjon | Sannsynligheter som ikke er 50/50 | W1 |
| 2 | `budkamp` | Budkamp og kontanter mot aksjer | 20 | 16 (1:25:55 til 1:27:45 bank D, «it could be easily the exam question»; 38:03 til 52:52 kontanter mot aksjer, 16:21 hvem vinner). Form: makspris per budgiver = gevinst + tap som unngås, hvem vinner og til hvilken pris, NPV for kjøper og mål ved kontanter og ved aksjer, maks bytteforhold, hvem bærer synergirisikoen | Synergien blir lavere enn ventet: hvem taper ved kontanter og ved aksjer | W4 |
| 2 | `coinsurance` | Fusjon av belånte firmaer (coinsurance) | 20 | 16 (1:27:49 til 1:31:43, «a crucial example with very simple numbers … It's like a hint from me»). V2024 P4. Form: to firmaer med gjeld i speilvendte tilstander, D og E per tilstand alene og fusjonert, verdier, formuesoverføring, hvorfor aksjonærene kan være imot | Fusjon med en liten synergi, eller med kostnader ved konkurs | W4 |
| 2 | `risikoskifting` | Risikoskifting og brannsalg | 20 | 04 (51:56, 55:46 til 1:06:17 «a crucial example, probably one of the most important in this lecture»), 06 (PS1 E8, 1:15:48, 1:28:24 covenants), 18 (28:00 brannsalg «we might see such an exercise»). Form: firma i nød, risikabel strategi med negativ NPV, vil lederen ta den, del endringen i overføring og tap, hvem bærer kostnaden på forhånd, covenants | Konkurs der bare en andel gjenvinnes (brannsalg) | W5 |
| 2 | `teori-kapital` | Teorispørsmål om kapitalstruktur, utbetaling og emisjon (10 p) | 10 | Tre ulike: (1) kostnader ved financial distress, én direkte og én indirekte (04, 26:24 og 29:37) eller ulemper ved gjeld (04, 4:56); (2) fire måter å bruke fri kontantstrøm, rangert (05, 12:17; 18, 39:15); (3) SEO kunngjøres og kursen faller 12 %: grunner og bedre alternativ (18, 48:05) eller MM mot virkeligheten (03, 11:33) | «Investere» gir bare poeng med forbeholdet om gode prosjekter (05, 14:43) | W2 |
| 3 | `avvikle` | Realopsjon: avvikle eller gå ut | 20 | 14 (1:16:17 til 1:23:53 butikk med månedlig exit, 56:52 til 1:04:09 trinnvis, 1:03:46 sunk cost), 18 (1:06:01, 1:08:33, 10:14 rentekonvertering). Form: NPV uten opsjon, med exit etter N perioder (sammenlign med 0), verdien av opsjonen, månedsrente | Et lite gebyr for å gå ut (18, 1:06:47) | W1 |
| 3 | `signal` | Asymmetrisk informasjon: emisjon, signal og sertifisering | 20 | 10 (3:07 «a topic that I really like», 4:41 til 21:11 PS2 E1), 07 (1:29:09 SEO-eksemplet), 04 (1:31:05 hakkeorden som del D eller E). Form: to typer, pooling-pris, emisjon for å finansiere et prosjekt, hvem som utsteder, kursreaksjon, verdien av en sertifisering | Hale om hakkeorden | W2 |
| 3 | `entreprenor` | Replikasjon: gjeld eller egenkapital i perfekt marked | 20 | 02 (8:16 «solve for alpha», 33:54 til 38:09, 34:47 «replication will be a very, very, very important topic», 1:25:02 indifferens), 18 (21:07). Form: gründerprosjekt i to tilstander, markedet og risikofritt aktivum, verdi ved replikasjon, finansiering med gjeld og med EK, α der gründeren er indifferent | Relevering av beta når gjeldsgraden endres (02, 1:18:48) | W5 |
| 3 | `opsjonsintuisjon` | Opsjoner og gjeld som opsjoner (teori, 10 p) | 10 | 12 (1:23:59), 18 (1:20, 57:45, 1:04:19 gjeld som risikofri gjeld og en put, 58:18), 14 (46:34), 13 (1:16:52 EK liker risiko). Tre ulike: volatilitet og løpetid; gjeld og EK som opsjoner og hvorfor eiere liker risiko; realopsjon og volatilitet | Gjeld er PV(F) − put, ikke «risk-free debt minus a written put» | W3 |
| 3 | `ma-motiver` | M&A-motiver og hvem som vinner (teori, 10 p) | 10 | 16 (7:04 til 15:21 motiver, 16:21, 37:51, 40:01 hvem får synergiene), 18 (1:10:05 «without mentioning the word synergies»). Tre ulike: motiver uten synergier (minst én ineffektiv); hvem vinner og hvorfor målet får mest; kontanter mot aksjer og synergirisiko. H2024 E1 | «Value creation» alene gir ikke poeng; skattemessige underskudd er ikke et motiv | W1 |

## Lærdommer fra den blinde kontrollen av tier 1

Ingen regnefeil i de 21 oppgavene. Det kontrollørene fant, går igjen:

- **Feltnavnene i svar-dataene vises før studenten svarer** (`js/bundle-sett.js`). `navn` skal
  være nøytralt og ikke røpe svaret eller retningen: «Change for the bank», ikke «Bank's gain»;
  «F (if it exists)», ikke «F at indifference».
- **`topic` vises som en brikke på oppgaven** før studenten svarer. Den skal navngi temaet,
  ikke svaret («Downsides of debt», ikke «Costs of financial distress and agency costs of
  debt»). Ord som «still» i et senere ledd («Would the manager still switch?») røper også et
  tidligere svar.
- **Reserveverdi der et senere ledd trenger et tidligere tall.** Rettingen av tall er automatisk
  uten følgefeil, så én feil tidlig gir null på resten. Kurbatov gir full uttelling for senere
  ledd selv om et tidligere tall er feil (opptak 18, 1:15:33). Oppgi en hypotetisk verdi som ikke
  er svaret, og legg svarene bygd på den som `alt`.
- **Kriteriene krever bare det spørsmålet ber om.** En sjekk, en begrunnelse eller et nøkkelord
  spørsmålet ikke ber om, blir bonus. Vil du ha en begrunnelse, skriv «Explain briefly».
- **Godta likeverdige veier**: to likninger eller direkte resonnement, forelesningens vei og
  nøkkelens vei.
- **Toleranse**: en student som runder mellomregninger til 4 desimaler (2 i valuta), skal
  bestå. Skill fellene med et annet felt (for eksempel PV(TS)) hvis toleransen ellers må under
  0,1 %.
- **Sannsynligheter** får `enhet: "%"` med verdien i prosent, så både 47,5 og 0,475 godtas.
- **Konvensjoner skrives ut**: hvem som eier egenkapitalen, at långiveren er konkurranseutsatt,
  om en sannsynlighet gjelder hele løpetiden, og hva «new debt» betyr (brutto eller netto).

## Rekkefølgen arbeidet gjøres i

Tier 1 skrives, kontrolleres blindt og flettes inn først, så Magnus kan begynne. Så tier 2 og
tier 3. Verktøyet tar bare med typer som har oppgaver.

## Kontroll før levering

1. `python3 -I fag/fie402/_mk/<W>_regn.py` uten feil.
2. `python3 tools/flett-mk.py fie402` viser ingen `FEIL` for dine oppgaver.
3. `node tools/sjekk-svar.js fie402` etter at verktøyet har skrevet (gjøres av hovedøkta).
4. Hvert tall i svar-dataene står i løsningsteksten, eller er merket `regnet: true` med
   `merknad`.

## Kontroll etterpå

Hver skribents oppgaver løses blindt av en uavhengig kontrollør fra en versjon uten løsning og
kriterier (`python3 tools/flett-mk.py fie402 --blind <mappe>`). Kontrolløren regner alt på nytt,
sammenligner, og vurderer om hvert ledd har ett forsvarlig svar, om de tre oppgavene i typen er
ulike nok og om formen ligner Kurbatov. Funnene rettes før oppgavene flettes inn.
