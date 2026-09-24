---
tags: [fag, fie432, innhold]
oppdatert: 2026-09-24
---

# FIE432 Personlig økonomi

Fag nummer fire. Id `fie432`, aksentfarge `#a8521c` (brent oransje), logo «PØ».
Alt innhold på norsk — kurset undervises på norsk og eksamen besvares på norsk.

## Kursfakta

NHH, 7,5 studiepoeng, høsten 2026. Kursansvarlig **Guttorm Schjelderup**;
gjesteforelesere Ole-Andreas Næss (finansdelen) og Hallgeir Kvadsheim.
Forelesninger 19. august – 16. oktober. Kursgodkjenning er en flervalgstest på
Canvas: 17 av 20 rett, tre forsøk, samarbeid tillatt men individuell levering,
og **fristen er den samme som oppmeldingsfristen**.

**Eksamen: fire timers digital flervalgseksamen i Wiseflow.** Kalkulator og én
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

Alle ni sett med fasit (2016–2025) er registrert spørsmål for spørsmål i
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

Vektene vises som prikker i pensum, på kapittelsidene, i studieplanen og i
kapitteloppgavene, og repetisjonsmotoren bruker dem. Se [[Moduler og visninger]].

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

Tre flervalgssett ligger i `fag/fie432/sett.js` og rettes automatisk:

| Sett | Oppgaver | Ledd | Poeng | Merknad |
|---|---|---|---|---|
| Høsten 2025 | 17 | 29 | 29 | Skoleeksamen. Ligner mest på 2026 |
| Høsten 2024 | 14 | 38 | 48 | Størst. Oppgave 10 er ti delspørsmål om internasjonal skatt |
| Høsten 2022 | 7 | 31 | 35 | **Hjemmeeksamen** — tyngre oppgaver enn skoleeksamen |

Ingen av dem hadde minuspoeng, men eksamensmodus lar deg slå det på, og
resultatkortet viser hva settet ville gitt under den andre regelen. Løsningene
er skrevet fra bunnen og forklarer **hvilken feil hvert galt alternativ svarer
til** — det er den ferdigheten minuspoengene krever.

> [!warning] H2022-fila har både bokmål og nynorsk, og nynorsken har feil
> Nynorskversjonen oppgir 46,8 % i oppgave 1.5 der riktig er 46,5 %, og regner
> oppgave 2 på et annet utbytte enn nynorskoppgaven selv oppgir. Settet i appen
> bygger på bokmålsversjonen.

De seks eldre settene (2016–2021) er kartlagt, men ikke lagt inn: fire av dem er
åpne regneoppgaver fra før flervalgsformatet, og 32 fasitsvar i de to andre er
bilder uten tekstlag. Rekonstruerte svar står i `01-eksamens-dna.md` § 7.4.

## Kildene

`FIE432 Personlig Økonomi 31. aug/` — forelesningslysbilder, ni eksamenssett med
fasit, oppgaver og regneark. Mappen er gitignorert, som FIE402s kildemappe.
Tekstuttrekket ligger i `_tekst/` under samme mappe.

> [!warning] Word-ligningene forsvinner med `textutil`
> Første uttrekk brukte `textutil`, som kaster OMML-matematikk uten spor.
> Insidensderivasjonen i H2024 oppgave 8 og hele oppgave 9 ble da uleselige.
> Uttrekket går nå gjennom `document.xml` og lineariserer hver `m:oMath` selv.

**Forelesning 6, 7 og 8 har ingen lysbilder i materialet** — det er nettopp de
tre som dekker nøytralitet, flat skatt og formuesskatt. Kapittel 7–10 skrives
derfor fra pensumartiklene og eksamensoppgavene.

## Arbeidsdokumentene

- `docs/fie432-forfatterspek.md` — HTML-formatet parseren krever, notasjonen,
  kursets konvensjoner, og hvordan et flervalgsspørsmål skal undervises
- `docs/fie432-kursplan.md` — kapittelkartet k0–k20 med hva hvert kapittel skal
  dekke, pluss hele eksamens-DNA-en
- `docs/fie432-research/` — kartleggingen, 84 000 ord over seks dokumenter

Kapitlene skrives som frittstående `<section id="kN">`-fragmenter i
`fag/fie432/_fragmenter/` og settes sammen med `tools/fie432-bygg-manual.py`.
Kontrolleres med `tools/sjekk-manual.py`.

## Status

| | |
|---|---|
| Kartlegging | **ferdig** — 84 000 ord, 227 eksamensspørsmål registrert, 109 fasiter kontrollregnet |
| Manual | **21 av 21 kapitler · 81 500 ord** — strukturelt feilfri |
| Studieplan | **21 moduler · 57 timer**, estimatene regnet av faktisk innhold |
| Eksamenssett | **3 sett · 98 flervalgsledd**, rettet automatisk |
| Flashcards | **100** auto-genererte formelkort fra k20 |
| Quiz | **164 spørsmål** · 133 flervalg / 31 kortsvar · alle 20 kapitler dekket |
| Dybdetrening | **299 spørsmål** i fire banker: 72 · 77 · 72 · 78 |
| Kapitteloppgaver | **229 oppgaver** i eksamensformat over alle 19 kapitler · 687 poeng · antallet følger eksamensvekten |
| Lynlæring | ikke skrevet — modulen er avslått til den har data |

**Aritmetikken er kontrollert maskinelt.** `tools/sjekk-aritmetikk.py` fant 841
regnekjeder i manualen og fem utslag, alle notasjon verktøyet ikke leser
(absoluttverditegn, «60/40» som forholdstall, «1,1 % *av* (…)», algebra som
«3 − 2Q»). Hver enkelt er kontrollert for hånd.

Verktøyet fant ingen regnefeil gjennom fire bølger og nitten agentskrevne
kapitler. **Én slapp likevel gjennom**, og den sier noe om hva verktøyet ikke
kan se: 16.5 skrev `12 × 16 104,65 − 150 000 = 43 256` som avdraget første år
på et annuitetslån. Regnestykket er riktig regnet — derfor gikk det fri — men
150 000 er 5 % av *hele* lånet, og saldoen faller for hver termin. Rentene er
148 995 og avdraget 44 261. Kapitlet motsa seg selv: 16.1 advarer eksplisitt
mot at 150 000 «bare er renten på et evig lån».

> [!tip] Aritmetikkontrollen ser bare om et regnestykke er riktig regnet
> Den kan ikke se om det er *riktig oppstilt*. En feil premisse som regnes
> feilfritt, passerer. Det er derfor et kapittel som motsier et annet er en
> egen sjekk — og den må gjøres av noen som leser.

> [!warning] Kapitlene ble lengre enn spesifikasjonen ba om
> Målet var 1 200–2 200 ord; snittet ble 3 900, og lengdeføringen ble strammet
> for hver bølge uten at det bet. Årsaken er at spesifikasjonen selv sier at
> **dekning er den bindende betingelsen** og at et kapittel som er kort fordi
> det utelot stoff, er mislykket — samme mekanisme som tok FIE402 fra 35 000 til
> 109 000 ord. Manualen er lesbar og kontrollert, men 57 timer er mye for et
> fag på 7,5 studiepoeng. Skal noe trimmes, er det prosaen rundt de
> gjennomregnede eksemplene, ikke eksemplene.

## Kapitteloppgaver

Hvert kapittel har sitt eget sett flervalgsoppgaver i eksamensformat, å ta rett
etter lesingen. **229 oppgaver over 19 kapitler, 687 poeng.** Se
[[Moduler og visninger]] for datamodellen.

**Antallet følger eksamensvekten**, via `kapoppgPerVekt` i manifestet:

| Vekt | Oppgaver per kapittel | Kapitler |
|---|---|---|
| 5 | 20 | k5, k11, k14 |
| 4 | 15 | k1, k7, k8, k15, k17 |
| 3 | 10 | k9, k13, k16, k19 |
| 2 | 8 | k2, k4, k6, k10, k12, k18 |
| 1 | 6 | k3 |

Første versjon hadde 6–7 per kapittel, 117 i alt. Det holder i FIE402, der én
oppgave er en halvtime med deloppgaver. Her er en oppgave 2–6 minutter, og da ga
de tyngste temaene knapt en halvtimes trening. De 112 nye ble skrevet mot hull:
først en kartlegging av hva de gamle dekket i hvert kapittel, så oppgaver på det
som manglet, som monopol og kapitalisering i k11, kapitalmarkedslinjen og
Sharpe-forholdet i k14, hele eierperioden i k5 og brutto opp med både
bunnfradrag og skjerming i k8.

**Fasiten kommer med en gang.** Velger du et alternativ, låses oppgaven og
fasiten åpner seg der og da, med utregningen og hvilken feil hvert gale
alternativ er laget av. Grunnen er at dette ikke er en eksamenssimulering — den
ligger i `/sett`, med nedtelling og fasit først ved levering. Her er poenget å
lære mens regnestykket ennå er i hodet.

Hver oppgave har også **«Angre svaret»**, som låser opp bare den ene oppgaven.
Den finnes for bomklikk, ikke for å prøve seg fram — har du sett fasiten, måler
et nytt forsøk ingenting — men et alternativ truffet ved et uhell skal ikke låse
oppgaven for godt.

Minuspoengene trenes likevel: hver oppgave har en **«Stå over»**-knapp som fører
den som ubesvart, 0 poeng i stedet for minus. Det er nettopp valget eksamen
krever når du ikke kan utelukke minst ett alternativ. Resultatkortet viser i
tillegg hva besvarelsen ville gitt under den gamle regelen uten minuspoeng.

Fasitfordelingen er **58/57/57/57**. Den er ikke stokket i etterkant: hver
forfatter fikk en pålagt liste over hvilket alternativ fasiten skulle ligge på i
hver oppgave, trukket fra en fast seed og regnet mot fordelingen som alt lå der.

### Blind gjennomgang av alle 229

Hver oppgave ble løst av en agent som bare så spørsmålet og alternativene, og
som skrev ned svaret sitt før den så fasiten. Så sjekket den hver distraktor og
hver påstand. **229 av 229 blinde valg stemte.** Likevel fant gjennomgangen feil i
mange av dem, fordi en riktig fasitbokstav ikke betyr at teksten rundt er riktig:

- **Én fasit var gal på tross av at den blinde løseren var enig.** k7-15 lot et
  par som giftet seg i fjor, bli skattlagt sammen for hele året. Etter sktl
  § 2-12 bokstav a skattlegges ektefeller hver for seg det året de gifter seg.
  Løseren regnet med samme premiss som forfatteren. Blind enighet beviser
  regningen, ikke regelen.
- **Tre regler var gale i manualen, og oppgavene arvet dem**: kreditfradrag uten
  skatteavtale (sktl § 16-20, k13-3/k13-4), utbyttets tilordning ved eierskifte
  (k5-5) og fritidsbolig i gjeldsfordelingen (§ 4-19, k7-9). Se fallgruve 7w.
- **Seks oppgaver viste til «oppgaven over»**, som ikke finnes når oppgavene
  vises én om gangen. Se fallgruve 7v.
- **Kontroller som ikke kan feile, men som ble solgt som uavhengige**, for
  eksempel at skattepliktig utbytte pluss brukt skjerming går opp i utbyttet. Det
  er definisjonen, ikke en sjekk. De er merket ærlig, og k5-2/k5-3 har fått en
  kontroll som kan feile.
- **Fire nye oppgaver var nesten kopier av andre** og fikk nye tall: k5-14
  (samme år og renter som k5-2), k14-7 (samme γ som k14-2), k13-7 (samme land og
  satser som k13-1/k13-2) og k18-8 (samme rutine som k14-12, der tapsvekten snur
  valget). Den siste viser nå det H2019 9g og H2022 5.6 faktisk testet, at vekten
  bare forsterker et bankvalg som alt er tatt. Omskrevne oppgaver fikk ny id
  (k5-21, k14-21, k13-11, k18-9, og k7-16 for k7-15), etter fallgruve 7s.
- **k13-9 forutsatte en regel manualen ikke lærte**, rekkefølgen i
  bostedsregelen i OECDs mønsteravtale artikkel 4. Regelen står nå både i
  oppgaveteksten og i manualen 13.4.

**1 870 regnekjeder kontrollert maskinelt, 44 utslag, alle notasjon** verktøyet
ikke leser: hakeparenteser, potenser, algebra med variabler og «3 prosentpoeng».
Hvert utslag er regnet om for hånd. Ett av dem avslørte et fortegn skrevet slurvete
(k18-2), som er rettet.

> [!warning] Kursfasiten og loven spriker om selskaper som flytter ut
> Sensorveiledningene til H2022 oppgave 4 og H2024 oppgave 10 sier at
> skatteloven § 10-71 gir oppgjør «på både aksjonær- og selskapsnivå». Lovteksten
> på Lovdata skattlegger bare gevinst på selskapets eiendeler, og bare ved
> flytting ut av EØS eller til et lavskatteland uten reell etablering. Samme
> mønster som femårsregelen: fasitsvaret står i eksamenssettet, fordi det er det
> som har gitt poeng, men manualen 6.6, k6-8 og forklaringene i settet sier nå
> hva loven sier. k6-8 er skrevet om slik at det gale alternativet er galt under
> begge lesingene.

### Manualen ble rettet av det samme arbeidet

Oppgaveforfatterne og de blinde løserne leste manualen tett, og fant 21 punkter,
pluss tre i den siste gjennomgangen. Hvert ble sjekket mot lov, forelesning eller
regning før det ble rettet. 21 er rettet helt, ett delvis og to ikke. Blant de
rettede:

- **13.1 og 13.3:** «uten avtale blir det dobbeltbeskatning» — sktl § 16-20 gir
  ensidig kreditfradrag.
- **11.6:** overveltingen var rangert etter markedsform. Forelesningen rangerer
  etter markedsmakt, og kapitlets egne resultater motsa rangeringen.
- **8.5:** kumulasjonen regnet formuesskatt på utgående formue. Kursets
  konvensjon er inngående, som gir (1,04/1,05)⁴⁰ = 0,682.
- **9.3:** en faktor som skulle «lukke gapet», gjorde det ikke.
- **16.6 og H2024-boksen:** avdragsfrihet koster flere kroner, men ikke mer i
  nåverdi. Forelesningen sier det siste.
- **5.4:** utbytte følger eieren ved vedtak, skjermingen eieren 31.12.
- **6.6:** § 10-71 som over, og at sikkerhet ved utsatt exit-skatt bare kreves
  ved reell risiko når man flytter innen EØS (§ 10-70 sjuende ledd).

**18.2 har fått et nytt gjennomregnet eksempel.** Sparerutinen fra H2019
oppgave 9 og H2022 oppgave 5 — ln-nytte, subjektive sannsynligheter og
tapsaversjon — ble ikke lært noe sted, og k18 viste til et avsnitt i k17 som ikke
fantes. To agenter fant hullet uavhengig av hverandre.

Det som står igjen, står i [[Åpne spørsmål og neste steg]].

> [!danger] Rett manualen i fragmentene, ikke i `FIE432_Manual.html`
> Alle manualrettingene over ble først gjort i den bygde fila, og ville forsvunnet
> ved neste kjøring av `tools/fie432-bygg-manual.py`. De er overført til
> `fag/fie432/_fragmenter/`, og en ny bygging gir nå en byte-lik manual. Se
> fallgruve 7x.

> [!tip] Feilen fra manualen ble til en distraktor
> Rentefeilen jeg fant i 16.5 samme dag — renten ganget med hele lånet i stedet
> for saldoen som faller — står nå som **alternativ** i k16-3, med 352 kroners
> avstand til riktig svar (24 992 mot 25 344). Det er den beste bruken av en
> rettet feil: den som gjør den, kjenner den igjen neste gang.

> [!info] En agent overprøvde briefen min, og hadde rett
> Jeg skrev i oppdraget at IPS-uttak skattlegges som pensjonsinntekt. Kapittel 15
> sier alminnelig inntekt med 22 %, uten trygdeavgift og trinnskatt, og har en
> egen boks om nettopp den forvekslingen. Agenten fulgte kilden framfor
> instruksen. Det er riktig prioritering, og verdt å be om eksplisitt.

Neste steg: lynlæring, som er den siste avslåtte modulen, og eventuelt
håndforfattede flashcards i tillegg til de auto-genererte formelkortene.