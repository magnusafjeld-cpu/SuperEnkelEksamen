---
tags: [fag, fie432, innhold]
oppdatert: 2026-11-10
---

# FIE432 Personlig økonomi

Fag nummer fire. Id `fie432`, aksentfarge `#2f6bff`, samme blå som SAM3 (brent oransje `#a8521c` til 9. oktober 2026, så kort McKinsey-blå), logo «PØ».
Alt innhold på norsk — kurset undervises på norsk og eksamen besvares på norsk.

## Kursfakta

NHH, 7,5 studiepoeng, høsten 2026. Kursansvarlig **Guttorm Schjelderup**;
gjesteforelesere Ole-Andreas Næss (finansdelen) og Hallgeir Kvadsheim.
Forelesninger 19. august – 16. oktober. Kursgodkjenning er en flervalgstest på
Canvas: 17 av 20 rett, tre forsøk, samarbeid tillatt men individuell levering,
og **fristen er den samme som oppmeldingsfristen**.

**Eksamen 12. november 2026: fire timers digital flervalgseksamen i Wiseflow.** Kalkulator og én
tospråklig ordbok tillatt. Karakter A–F.

## Det som styrer alt: minuspoengene

> [!warning] Formatet endres i 2026, og det står bare på ett lysbilde
> H2024 og H2025 sa uttrykkelig at «ubesvarte spørsmål eller feil svar gir ikke
> minuspoeng». **Fra 2026 gjør de det**: fire alternativer, 3 poeng for rett og
> −1 for feil (eller 6 og −2), null for blankt. Kilden er lysbilde 8 i årets
> første forelesning, ikke emnebeskrivelsen.

Det snur strategien. Forventet verdi av å gjette blindt blant fire er null
(¼ × 3 − ¾ × 1). Har du utelukket ett alternativ er den +⅓, to utelukket +1.
Regelen blir: **svar når du kan utelukke minst ett alternativ, la stå blankt
ellers.** Under den gamle regelen var det gratis å svare på alt, og det var
riktig å gjøre det — den vanen koster nå.

Konsekvensen for kurset: å regne fram riktig svar er halve ferdigheten.
Den andre halvparten er å se hvilken feil hvert galt alternativ er laget av.
Derfor sier hvert gjennomregnede eksempel i manualen hvilke *gale* tall de
vanligste feilene gir.

## Hva som faktisk kommer

Alle ni sett med fasit (2016–2025 uten 2023) er registrert spørsmål for spørsmål i
`docs/fie432-research/01-eksamens-dna.md`: **227 spørsmål**, poengvektet per sett.

**Mest testet:** stykkskatt-incidens (8 av 9 sett, 11,6 % av poengene) ·
oppjustering og eierskatt (7/9) · formuesskattens gjeldsfordeling (7/9) ·
effektiv skattesats (7/9) · folketrygdpensjon (6/9).

**Tre ting som styrer prioriteringen:**

1. **Insidens er kursets mest testede enkelttema.** Både som formelgjenkjenning
   (H2024 oppgave 8 spør hvilket uttrykk som er ∂p/∂t) og som talleksempel.
   Kapitlet må *utlede* formelen, ikke bare oppgi den.
2. **Formuesskatt som avkastningsskatt er nytt og tungt.** Fraværende før 2021,
   17 % av poengene i H2025, og pensum for forelesning 8 i årets plan.
3. **Internasjonal skatt er den store usikkerheten.** 17–19 % av poengene i
   H2022 og H2024, helt fraværende i H2025 — og årets plan navngir **ingen
   gjesteforeleser i skatterett**. Dekkes, men prioriteres under de andre.

### Eksamensvekt per kapittel

`examWeights` i manifestet gir hvert kapittel 1–5 med begrunnelse, utledet av
tabellene over, men **vektet mot flervalgssettene** H2022, H2024 og H2025. Årets
eksamen er også flervalg, og et tema som var stort i de åpne settene og siden
har forsvunnet, sier lite om 2026.

| Vekt | Kapitler |
|---|---|
| 5 | k5 aksjonærmodellen · k11 stykkskatt-incidens · k14 sparing og portefølje |
| 4 | k1 effektiv skatt · k7 formuesskatt · k8 formuesskatt som avkastningsskatt · k15 pensjon · k17 forventet nytte |
| 3 | k9 bedriftens tilpasning · k13 internasjonal skatt · k16 lån · k19 minuspoeng |
| 1–2 | resten |

Tre av vektene er skjønn og bør revurderes etter årets forelesninger. **k8** har
vekt 4 på ett eneste sett (17 % av H2025) pluss 2026-planen. **k13** har vekt 3
fordi den var 17–19 % av to sett, men forsvant i H2025 og mangler gjesteforeleser
i 2026. **k17** har vekt 4 fordi andelen stiger (8 % og så 14 %).

Vektene vises som prikker i pensum, på kapittelsidene, i studieplanen, i
kapitteloppgavene, i kjernepensum og i NotebookLM, og repetisjonsmotoren bruker dem. Se [[Moduler og visninger]].

## Fasitene har feil, og de er kartlagt

109 kontrollerbare fasitsvar er regnet om: **96 stemmer eksakt, 6 avviker bare
på avrunding, og 6 er feil i selve sensorveiledningen.** I fem av de seks er
*svaralternativet* likevel riktig — det er mellomregningen som er skrevet feil.

De to viktigste: **H2024 oppgave 5** skriver 17,1 % for individ X i teksten mens
alternativet sier 17,2 %, og 65 400/380 000 = 17,2105 %. **H2025 oppgave 1**
skriver «200 000 og 120 000» i én setning mens tabellen og sluttsvaret bruker
160 000 og 740 000, som er riktig.

Manualen lærer derfor leseren å stole på sitt eget kontrollerte regnestykke og
velge nærmeste alternativ.

> [!info] Avrundingen er noen ganger nødvendig
> H2019 oppgave 2c gir nøyaktig null bare hvis ligningsverdiene rundes til én
> desimal først. Eksakt regning gir −47 489 og treffer ingen av alternativene.

## Satsene er årsspesifikke

Eldre sett bruker eldre satser, og oppgaveteksten oppgir dem alltid.
Aksjerabatten var **45 % i 2021** og er 20 % nå; oppjusteringsfaktoren var
**1,6 i 2020** og er 1,72. `docs/fie432-research/05-satser-2026.md` har alle
parametrene for 2024, 2025 og 2026 med primærkilde, og lister hva som har endret
seg. Den største endringen i 2026: **primærboligens terskel for 70 %-sjiktet
gikk fra 10 til 14 millioner**, vedtatt i revidert nasjonalbudsjett med virkning
for hele inntektsåret.

> [!warning] Inntektsskiftingslikningen har byttet form
> H2017 og H2020 løste faktoren med effektive satser, t_w = t_A + (1 − t_A)·t_e·y.
> Kurset i 2026 (forelesning 5) legger nominelle satser sammen og tar med
> arbeidsgiveravgiften: 47,4 % + 12,4 % = 22 % + 22 %·y, altså y ≈ 1,72 ved full
> overvelting (50/50 gir 1,15, bedriften alt 0,59). Appen lærte bort den eldre
> formen (1,48, 2,20, «a ≈ 4,1 pp») til den ble rettet 15. oktober 2026 i
> treningen, manualen (k5, k9, k1), kj2, quizen, dybdebanken og k5-6.

Skjermingsrenten for inntektsåret 2026 fastsettes først i januar 2027 og finnes
altså ikke. Oppgaver må oppgi den selv, slik eksamen gjør.

## Struktur

**Manualen `FIE432_Manual.html`: 21 seksjoner (k0–k20).**

| Del | Kapitler |
|---|---|
| Del 0 · Grunnlaget | k0–k2 |
| Del I · Aktiva og avkastning | k3–k4 |
| Del II · Aksjonær- og formuesbeskatning | k5–k8 |
| Del III · Skatteteori | k9–k13 |
| Del IV · Personlig finans | k14–k18 |
| Del V · Eksamenshåndverk | k19 |
| Referanse | k20 — satser og formler |

**k20 er referansekapitlet**, så manifestet setter
`manual.refSections = { formulas: "k20" }`. Radene der blir automatisk til
flashcards — **rekkefølgen er permanent**, se [[Fallgruver]].

**Studieplanen: 21 moduler, `plan.mode = "modules"`.** Modul 1–18 er læring,
19–21 er hele eksamenssett, det siste som generalprøve på tid med minuspoeng
slått på. Samlet estimat 46 timer. Kjør `tools/rekalibrer-plan.py fie432` når
manualen er ferdig.

**Fire dybdetreningsbanker:** `grunnlag` · `aksjonar` · `skatteteori` · `finans`.

## Eksamenssettene

Ti eksamenssett ligger i `fag/fie432/sett.js`, alle med fasit. De fire flervalgssettene rettes automatisk:

| Sett | Oppgaver | Ledd | Poeng | Merknad |
|---|---|---|---|---|
| Høsten 2025 | 17 | 29 | 29 | Skoleeksamen. Ligner mest på 2026 |
| Høsten 2024 | 14 | 38 | 48 | Størst. Oppgave 10 er ti delspørsmål om internasjonal skatt |
| Høsten 2023 | 14 | 23 | 30 | Skoleeksamen. Lagt inn 29. oktober 2026, da sensorveiledningen kom. 73 % skatt. Første sett med realavkastning som eget spørsmål |
| Høsten 2022 | 7 | 31 | 35 | **Hjemmeeksamen** — tyngre oppgaver enn skoleeksamen |

Ingen av dem hadde minuspoeng, men eksamensmodus lar deg slå det på, og
resultatkortet viser hva settet ville gitt under den andre regelen. Løsningene
er skrevet fra bunnen og forklarer **hvilken feil hvert galt alternativ svarer
til** — det er den ferdigheten minuspoengene krever.

> [!warning] H2022-fila har både bokmål og nynorsk, og nynorsken har feil
> Nynorskversjonen oppgir 46,8 % i oppgave 1.5 der riktig er 46,5 %, og regner
> oppgave 2 på et annet utbytte enn nynorskoppgaven selv oppgir. Settet i appen
> bygger på bokmålsversjonen.

De seks eldre settene (H2016–H2021) ble lagt inn 26. oktober 2026, etter
`docs/fie432-eldre-sett-spek.md`. De er åpne oppgaver med selvvurdering og
`criteria`, 100 poeng hver, fordelt etter vektene eller «anbefalt tid» i originalen
(poengene per ledd er skjønn). H2019 oppgave 1–8 og H2020 oppgave 2 er flervalg og
rettes automatisk. H2017 er bare GS-delen, fordi fila er en fasit uten oppgavehefte.
Fasitene som var bilder (H2018 5–7, H2019 9, H2020 4–6, H2021 5–7) er lest fra
bildene; EMF-bildene ble gjengitt ved å la Word lagre docx som PDF. Hver løsning
regner med satsene fra det året og sier i én setning «I 2026» hva som gjelder nå.
Oppgaver med siffer fra kandidatnummeret har tabeller for alle siffer 0–9.
H2019 oppgave 4 godtar (c) og (e), fordi begge holder i likevekt; fasiten godtar
bare (c).

### Prøveeksamenene

Atten prøveeksamener (`prove1`–`prove18`, `kind: "mock"`) ligger sist i `sett.js` og
vises under «Prøveeksamener» i Eksamenssett. Formatet er 2026-formatet: 30 flervalg,
fire alternativer, 3 poeng for rett og −1 for feil, 4 timer, 90 poeng.
Spesifikasjonen er `docs/fie432-proveeksamen-spek.md`.

| Eksamen | Ligner | Ord per ledd | Tallsvar |
|---|---|---|---|
| Prøveeksamen 1 | H2025 | 45 | 57 % |
| Prøveeksamen 2 | H2024, med en skatterett-blokk på seks ledd | 46 | 47 % |
| Prøveeksamen 3 | Temaer fra H2022 og de åpne settene, i skoleeksamensformat | 42 | 50 % |
| Prøveeksamen 4 | H2023 og kursgodkjenningen 2026 | 47 | 53 % |
| Prøveeksamen 5 | H2024 og kursgodkjenningen 2026 | 45 | 50 % |
| Prøveeksamen 6 | H2025 og kursgodkjenningen 2026 | 46 | 50 % |
| Prøveeksamen 7 | H2025 og årets forelesning 1–5 | 40 | 53 % |
| Prøveeksamen 8 | H2024 og skatteteorien i forelesning 6–11 | 37 | 53 % |
| Prøveeksamen 9 | H2023 og kursgodkjenningen, med vekt på finansforelesningene | 43 | 53 % |
| Prøveeksamen 10 | Tvillingen til H2025: samme rutiner i samme rekkefølge | 48 | 63 % |
| Prøveeksamen 11 | H2024 og kursgodkjenningen 2026 | 39 | 63 % |
| Prøveeksamen 12 | Kursgodkjenningen og 2026-forelesningene | 49 | 57 % |
| Prøveeksamen 13 | Prediksjonen: det mest sannsynlige settet | 46 | 60 % |
| Prøveeksamen 14 | Prediksjonen: rotasjonen (GS sin H2024-blokk, Næss sin porteføljeblokk) | 43 | 60 % |
| Prøveeksamen 15 | Prediksjonen: 2026-forelesningene | 48 | 63 % |
| Prøveeksamen 16 | Ny trekning: H2025-formen | 48 | 63 % |
| Prøveeksamen 17 | Ny trekning: kursgodkjenningen og 2026-forelesningene | 49 | 63 % |
| Prøveeksamen 18 | Ny trekning: H2024-formen med nye vrier | 48 | 63 % |

**Kalibrert mot skoleeksamen.** Eksamen 2026 er en skoleeksamen. H2022 var en
hjemmeeksamen med lengre og tyngre oppgaver (68 ord per ledd). Den første versjonen
av prøveeksamen 3 ble for lik den (61 ord, 80 % tallsvar). Magnus påpekte det 29. oktober
2026. Nå gjelder: 35–48 ord per ledd og 35–55 % tallsvar, som skoleeksamenene H2023–H2025
(44 ord, 51 %); høyst tre regnetrinn, ingen iterasjon; og omtrent halvparten begrepsledd
i stilen fra kursgodkjenningen 2026, som er laget av årets forelesere (34 ord, 20 %).
`node tools/sjekk-prove.js fie432` måler dette sammen med lekkasjen.

**Slik ble de laget.** Fasitposisjonene trukket på forhånd med fast seed
(`fag/fie432/_prove/fasitplan.json`). Én agent skrev hver eksamen med alle tall regnet i
`_prove/proveN_regn.py`, som også bygger JSON-en. En annen agent løste den **blindt** fra
en versjon uten fasit: alle 180 svar stemte. Kontrollene fant likevel ledd med to
forsvarlige svar og mange ledd der svaret kunne gjettes av mønsteret (konvergens:
riktig alternativ deler et element med alle de andre; «58 %-par» der riktig er det
høyeste av et par med og uten oppjustering; to alternativer som skiller seg med nøyaktig
én oppgitt størrelse). Alt er rettet. Endringer gjøres i skriptet, så flettes inn med
`tools/flett-prove.py`; skriptene bygger nøyaktig det som ligger i `sett.js`.

**Prøveeksamen 7–9 (4. november 2026) dekker det 1–6 ikke testet.** De er merket «Vanskeligere» (feltet `badge`, en rød brikke ved navnet), og notatet deres begynner med det. Alle 106 ledd i 1–6 ble
kartlagt mot manualens underkapitler og årets lysbilder. Rundt 40 temaer var aldri testet,
blant dem unoterte aksjer i formuesskatten, AERT for de rikeste, Jordà, giring, folkefinansiering,
aksjesparekonto, dødvektstap, eiendomsskatt, nøytralitet med β, Mirrlees, fast driftssted,
internpriser, markedseffisiens, Fama–French, CAPM, BSU, serielån, fast mot flytende rente,
bias mot støy og Norwegian-saken. Hver eksamen har kjernetemaene med en ny vri og rundt 12 ledd
på slike temaer. Magnus' svakheter fra 1–4 testes på nytt med nye tall. Etter **Magnus' krav**
gir tekstene minst mulig hjelp, som eksamen på sitt verste: ingen formel, regel eller
framgangsmåte. I omtrent halvparten av regneleddene står bare «Bruk skattereglene for 2026». Titlene
er nøytrale. Noen ledd har en opplysning som er støy. Reglene står under «Minimalt stillas» i
spesifikasjonen. Blindløsningen traff alle 90 svar, men fant 15 ting som er rettet: fem ledd med to
forsvarlige svar, fem ledd der et annet ledd eller stammen røpet svaret, tre uklare formuleringer,
ordet pensjonskapitalbevis (egen pensjonskonto fra 2021) og Merton med skatt der risikofri rente
bryter Domar–Musgrave.

**Prøveeksamen 10–12 (8. november 2026) er laget for å ligne eksamen mest mulig.** Magnus bestilte tre eksamener med høyest sannsynlighet for å ligne den han får 12. november, på H2025-nivå. Grunnlaget var H2025 (siste skoleeksamen), kursgodkjenningen 2026 (årets forelesere, også Næss) og kunngjøringen 6. november (satser og regler oppgis). Alle satser står i teksten, gjerne forenklet som i H2025, og kalibreringen er 38–50 ord og 55–65 % tallsvar. 10 følger H2025 oppgave for oppgave, 11 bygger på H2024 og kursgodkjenningen, og 12 på kursgodkjenningen og temaene som er nye i 2026 (AERT, skatt og risiko, utflytting, skatteparadis, Næss og Kvadsheim). En uavhengig kontrollør regnet hvert ledd på nytt og fant fem feil: i prove10 en variant av bedriftens tilpasning med rentetak som ikke er undervist (byttet til andel A og skatt på eierens renteinntekt fra F6), en uklar formuesverdi i 3d og en nevner som avvek fra kursets regel, og i prove12 en sats som manglet i teksten. Alt er rettet. Oppskriften står sist i spesifikasjonen.

**Prøveeksamen 13–15 (9. november 2026) bygger på en prediksjon av eksamen.** Magnus ville ha en skikkelig prediksjon av både oppgavene og vanskelighetsgraden torsdag 12. november.
- **Grunnlaget.** Spesifikasjonen har en tabell med sannsynlighet og forventet antall ledd per tema. Den bygger på at de samme foreleserne lager eksamen: GS skattedelen og Næss finansdelen, Næss minst siden 2022 og ikke for første gang i 2026. Det som lenge ikke har vært gitt, er tatt med, for eksempel lån og finansiell psykologi. Det samme gjelder at det ikke er noen gjesteforeleser i skatterett i 2026. Kursgodkjenningen 2026 er også brukt.
- **Oppbyggingen.**
  - Temaer med sannsynlighet 75 % eller mer kommer i alle tre.
  - Temaer på 50 % eller mer kommer i to av dem. Resten kommer i én.
  - 13 er det mest sannsynlige settet. 14 er rotasjonen. 15 er det som er nytt i 2026.
- **Kontrollen.** En uavhengig kontrollør regnet hvert ledd på nytt og fant én feil: i prove13 8b kunne to svar forsvares etter F6 lb 14–15. Den fant også rundt tjue forbedringer som gjør settene mer like H2025. Eksempler er hint om fellen i teksten, svar som lekket mellom ledd, notasjonen A i stedet for g og et tvetydig scenario med utbytte og salg i samme år. Alt er rettet.
- **Lån.** 2026-lysbildene om lån har verken annuitet, effektiv rente eller avdragsfrihet. Lånespørsmålene bygger derfor på manualen og på eksponentiell vekst-bias.

**Prøveeksamen 16–18 (10. november 2026) er tre nye trekninger av samme prediksjon.** Kjernen (temaene på 75 % eller mer) er med i alle tre, med andre vrier enn i 10–15. De tar også temaene 13–15 ikke rakk: utleie av egen bolig, valutasikring og home bias, monopol og overveltning, kontantstrømskatt og Kvadsheim. Hver eksamen ble løst blindt av en uavhengig kontrollør, som fikk 30 av 30 lik fasiten på alle tre. Svakhetene som ble rettet, var lekkasje i alternativer og overlapp i tall mellom de tre settene. Planen står i `docs/fie432-proveeksamen-spek.md`.
