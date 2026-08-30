---
tittel: Kanon for konsulent-caseintervju
laget: 2026-08-30
status: research-underlag for kursbygging
---

# Kanon: pensum for management consulting case interviews

## 0. Kildehygiene — les dette først

Feltet har tre svært ulike kildeklasser. Kurset må ikke blande dem.

| Merke | Betydning |
|---|---|
| **[FIRMA]** | Publisert av McKinsey/BCG/Bain selv. Autoritativt om hva de sier de vurderer. |
| **[UNI]** | Studentdrevet consulting-club-casebook (Wharton o.l.). Nær praksis, men skrevet av kandidater, ikke av firmaene. |
| **[PREP]** | Prep-industriens folklore: CaseCoach, Victor Cheng, Case in Point, Management Consulted, RocketBlocks, HackingTheCaseInterview, roadtooffer m.fl. Ofte nyttig, men **ikke verifiserbart** — spesielt frekvenstall og «scoring-rubrikker». |
| **[DATA]** | Ekstern faktakilde (Damodaran/NYU, IATA, EBA, FMI). Etterprøvbare tall. |

### Hva jeg faktisk fikk hentet, og hva jeg ikke fikk

**Hentet og lest i sin helhet:**
- BCG: `https://careers.bcg.com/global/en/case-interview-preparation` [FIRMA]
- Bain: `https://www.bain.com/careers/hiring-process/case-interview/` [FIRMA]
- Bain FashionCo: `https://www.bain.com/careers/hiring-process/interviewing/fashion-case-study/` [FIRMA]
- Bain Coffee Shop Co: `https://www.bain.com/careers/interview-prep/case-library/coffee-case-study/` [FIRMA]
- Wharton Consulting Club Casebook 2024–2025, 280 sider PDF: `https://website-cdn.casebasix.com/Wharton%20Casebook%202024-2025.pdf` [UNI]
- Victor Cheng, «Case Interview Core Frameworks v1.0» PDF: `https://caseinterview.com/case_interview_frameworks.pdf` [PREP]
- Crafting Cases, «The 5 ways to be MECE»: `https://www.craftingcases.com/the-5-ways-to-be-mece-part-2/` [PREP]
- Marc Cosentino (Case in Point-forfatteren), egen side: `https://casequestions.com/case-preparation/case-preparation-frameworks/` [PREP]
- StrategyCase, feedback-sheet: `https://strategycase.com/case-interview-feedback-sheet/` [PREP]
- RocketBlocks, case-oversikt: `https://www.rocketblocks.me/blog/what-is-a-case-interview.php` [PREP]
- PrepLounge, case interview basics: `https://www.preplounge.com/en/case-interview-basics` [PREP]
- Damodaran margindata, jan. 2026: `https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/margin.html` [DATA]

**IKKE hentet — viktig hull:**
- **mckinsey.com svarte ikke** (timeout på alle forsøk, både `/careers/interviewing` og de åtte øvingscasene). Alt om McKinsey nedenfor er **andrehånds** og merket deretter. Dette må verifiseres direkte mot McKinseys egne sider før det brukes i kurset som «slik sier McKinsey det».
- casecoach.com, managementconsulted.com, hackingthecaseinterview.com, igotanoffer.com ga alle **HTTP 403**. Det jeg har derfra er søkeutdrag, ikke lest sidetekst. Merket [PREP, kun søkeutdrag].
- Jeg fant ingen offentlig, etterprøvbar statistikk på **casetype-frekvens** fra noe firma. Alle prosenttall i seksjon 1 er prep-industriens egne påstander.

---

## 1. Casetypene

### 1.0 Advarsel om frekvenstall

Tall som «profitabilitet er 30–40 % av alle caser» sirkulerer overalt i prep-industrien
([PREP, kun søkeutdrag] — hackingthecaseinterview, roadtooffer, preplounge). **Ingen av dem
oppgir metode eller datagrunnlag.** Ingen av MBB publiserer slik statistikk. Bruk dem som
grov prioriteringshint til kurset, aldri som fakta i undervisningsteksten.

Det som *er* dokumentert: Wharton-casebooken [UNI, s. 9] lister casetypene uten frekvens, i
fire familier:
- **Profitabilitet**: inntektsvekst, fallende profitt, kostnadsoptimalisering
- **Markedsstudie**: markedsinngang, produktlansering, vekststrategi
- **PE / M&A**: verdsettelse, avkastning på investering, synergianalyse
- **Ukonvensjonelt**: pro/con-analyse, ikke-forretningscaser, estimeringscaser

Og bransjene [UNI, s. 10]: forbruker/retail, industri, energi, finans, telekom/IT,
media/underholdning, helse/life sciences, transport, ideell sektor.

### 1.1 Lønnsomhet (profitability)

**Logikk.** Profitt = Inntekt − Kostnad. Alt annet er nedbrytning. Den avgjørende ferdigheten
er ikke treet, men *isolering*: å finne hvilken gren som matematisk bærer problemet, og så
grave i den til man treffer en driver man kan handle på.

Victor Chengs formulering er fortsatt den skarpeste operative oppskriften [PREP, verifisert PDF]:
> 1) SEGMENTÉR tallet, bryt det i komponenter, sammenlign mot historikk for å finne hvor
> skiftet kommer fra. 2) ISOLÉR hoveddriveren. 3) UTFORSK mulige løsninger.

Segmenteringsakser: produkt/produktlinje, distribusjonskanal, region, kundetype (ny/gammel,
stor/liten), bransjevertikal. Kostnadssiden segmenteres etter verdikjede
(råvare → fabrikk → distribusjon → kunde) og etter fast/variabel.

**Drivere som må med:** pris per enhet, volum (antall kunder × kjøpsfrekvens × mengde per
kjøp), produktmiks (høy- vs. lavmargin), faste kostnader, variable kostnader per enhet.
Wharton [UNI, s. 13] legger i tillegg alltid inn et **marked/konkurranse-lag** foran
profittligningen — for å kunne avgjøre om problemet er selskapsspesifikt eller bransjebredt.

**Klassiske fallgruver:**
- Regne på totaler og gjennomsnitt uten å segmentere. Cheng: totalsalg kan være flatt mens
  segment A (20 %) vokser 100 % og segment B (80 %) faller 25 % — segmenterer du ikke,
  mister du hele poenget. [PREP, verifisert PDF]
- Ikke sammenligne med konkurrenter → man diagnostiserer et bransjeproblem som et
  selskapsproblem, og anbefaler helt feil medisin.
- Hoppe rett til kostnadskutt fordi det er lettest å strukturere.
- Miksekffekt oversett: pris og volum uendret per produkt, men salget har flyttet seg mot
  lavmarginprodukter.

### 1.2 Markedsinngang

**Logikk.** Fire spørsmål i rekkefølge: Er markedet attraktivt? Kan vi vinne der? Lønner det
seg finansielt? Hvordan går vi inn?

Wharton-strukturen [UNI, s. 15]: (1) Marked — størrelse, vekst, kundetyper, regulering,
markedsandeler, konkurrentrespons, inngangsbarrierer. (2) Finansielt — potensiell profitt
(markedsstørrelse × andel × margin), ROI/breakeven, alternativkostnad, kapitalbehov.
(3) Kapabiliteter — forretningsmessig og teknisk kompetanse, skalering. (4) Inngangsstrategi
— egen etablering, oppkjøp eller joint venture; timing og pilotering.

**Fallgruver:** glemme «hvorfor oss» (kapabiliteter) og bare regne på markedet; glemme
konkurrentens respons; anta markedsandel uten begrunnelse; ikke definere hva «suksess»
betyr for klienten (andel? profitt? strategisk fotfeste?).

Bains egen Coffee Shop Co-case er nettopp denne typen, i minimal form [FIRMA]: marked →
oppstartskostnad → go-to-market, med breakeven som avgjørende regnestykke.

### 1.3 M&A / due diligence

**Logikk.** Tre lag: (a) er målselskapet verdt noe alene, (b) er A+B verdt mer enn A og B
hver for seg (synergi), (c) klarer vi å realisere det (integrasjon/risiko).

Wharton [UNI, s. 16]: marked → standalone-verdi (målets finanser, kompetanse, deal-ROI) →
synergier (kostnads-, inntekts-, teknologidrevne; rekalkuler ROI) → risiko (kjøpers
oppkjøpserfaring, finansiering, kulturell fit, PMI, kunderespons).

Cheng skiller nyttig mellom to helt forskjellige spørsmål [PREP, verifisert PDF]:
- **«Fit»-rammeverket** brukes når A og B er *ulike*, og svarer på *om akkurat dette målet*
  passer. Det forutsetter at man allerede vet at oppkjøp er riktig grep.
- **Kapasitetsendrings-rammeverket** brukes når A og B er *like* (kjøp av direkte
  konkurrent), fordi spørsmålet da egentlig er hva som skjer med markedsklarerende pris når
  kapasitet konsolideres.

Dette skillet er en av de klareste «A-svar vs. C-svar»-markørene i M&A-caser.

**Fallgruver:** telle synergier uten kostnad ved å realisere dem; ignorere at kjøper betaler
en premie (synergier tilfaller selger hvis prisen er for høy); ikke spørre om finansiering;
behandle kulturell/PMI-risiko som en pliktbullet til slutt.

### 1.4 Vekst / økt inntekt

**Logikk.** Ansoff-aktig todeling som Wharton bruker [UNI, s. 14]: samme marked vs. nytt
marked × samme produkt vs. nytt produkt, med et kapabilitets- og risikolag under.
- Samme marked/samme produkt: flere kunder, høyere penetrasjon, høyere lojalitet, høyere pris
- Samme marked/nytt produkt: kryssalg, synergier, kannibalisering
- Nytt marked/samme produkt: ny geografi, nytt kundesegment, ny kanal (CAGE-forskjeller:
  kulturell, administrativ, geografisk, økonomisk)
- Nytt marked/nytt produkt: høyest risiko

**Fallgruver:** liste vekstideer uten å prioritere etter størrelse × gjennomførbarhet; glemme
kannibalisering; ignorere at vekst koster kapital og folk.

### 1.5 Prising

**Logikk.** Tre metoder som til sammen definerer et intervall [PREP, kun søkeutdrag —
preplounge, roadtooffer, myconsultingoffer]:
- **Kostnadsbasert** = gulv (variabel kostnad + påslag)
- **Verdibasert** = tak (kundens betalingsvillighet / verdien alternativet ikke gir)
- **Konkurrentbasert** = posisjonering et sted imellom

Stort gap mellom gulv og tak = prisingsmakt. Verdibasert prising gjøres konkret ved å
kvantifisere kundens neste-beste alternativ og legge til den differensierte verdien.

**Fallgruver:** hoppe til et tall; bare bruke én av de tre metodene; ikke avklare *målet*
(pris for margin vs. pris for markedsandel gir motsatt svar); glemme elastisitet og
konkurrentrespons (prisdumping utløser priskrig).

### 1.6 Kostnadskutt

**Logikk.** Segmentér kostnadene (fast/variabel, og langs verdikjeden), finn hvor pengene
faktisk ligger, sammenlign mot benchmark, og vurder *hvilke* kutt som er strukturelle vs.
kosmetiske.

**Fallgruver** [PREP, kun søkeutdrag — roadtooffer, myconsultingoffer]: kutte
inntektsgenererende kostnader (salg, kundeoppfølging) er den vanligste fellen; se bare på
direkte kostnader og glemme indirekte; behandle lønn som «fast» når den er variabel over tid;
ikke nevne gjennomførbarhet, tidshorisont og menneskelige konsekvenser.

### 1.7 Ny produktlansering

**Logikk.** Go/no-go: markedsbehov → produkt-markedspassform → økonomi (pris × volum − kostnad,
breakeven, tilbakebetalingstid) → kapabilitet → risiko (kannibalisering, konkurrentrespons).

**Fallgruver:** glemme kannibalisering av eksisterende portefølje (og motsatt: avvise
lansering *bare* fordi den kannibaliserer, når nettobidraget er positivt); anta full
distribusjon fra dag én; ignorere opptaksfart (adopsjonskurve) og bruke steady-state-volum i
år 1.

Merk: McKinseys «Electro-Light» skal være nettopp en produktlanseringscase med
diagramtolkning [PREP, kun søkeutdrag — ikke verifisert hos McKinsey].

### 1.8 Kapasitet / operations

**Logikk.** Flaskehalsen bestemmer gjennomstrømningen for hele systemet. Finn den ved å
sammenligne hvert trinns kapasitet mot etterspørselen inn i trinnet. Utnyttelse = faktisk
output / maksimal output.

Cheng skiller mellom konseptuell og numerisk kapasitetscase [PREP, verifisert PDF]: i den
numeriske skal du faktisk tegne tilbuds- og etterspørselskurver og finne markedsklarerende
pris. I den konseptuelle bruker du etterspørsel / tilbud / ekspansjonskostnad, med
alternativer (outsource, lease, underleverandør).

Kjernebegreper: throughput, syklustid, ledetid, flaskehals, utnyttelse, kapasitet.

**Fallgruver:** optimalisere et trinn som ikke er flaskehalsen; blande kapasitet (per tid) med
volum (absolutt); glemme at 100 % utnyttelse er urealistisk (nedetid, vedlikehold, varians).

### 1.9 Markedsstørrelse / estimering / «hvor mange …»

**Logikk.** To retninger:
- **Top-down**: start med en stor kjent størrelse (befolkning) og filtrer ned.
- **Bottom-up**: start med én enhet (én butikk, én kunde) og multipliser opp.

Bottom-up er sterkest for B2B, infrastruktur og kapasitetsbegrensede markeder; top-down for
brede konsumentmarkeder [PREP, kun søkeutdrag].

Bains Coffee Shop Co viser mønsteret helt konkret [FIRMA]: 100 000 innbyggere × 1 kopp per
person per dag ≈ 7 mill. kopper i året (deres tall — merk at 100k × 365 = 36,5 mill., så
Bains eksempel har åpenbart flere filtre/forutsetninger i seg enn referatet gjengir; dette
bør sjekkes mot originalen før det brukes som fasit i kurset).

**Fallgruver:** starte å regne før man har definert hva som telles (enheter? kroner? per år?);
0 %- eller 100 %-antakelser; for finmasket modell (feilen ligger i forutsetningene, ikke i
desimalene); ikke sanity-sjekke svaret mot noe kjent; runde inkonsistent.

### 1.10 Turnaround

**Logikk.** Kombinasjon: (1) stopp blødningen — likviditet og kontantstrøm på kort sikt,
(2) diagnostiser om problemet er strukturelt (marked/forretningsmodell) eller operasjonelt,
(3) profitabilitetstre for det operasjonelle, (4) strategisk reposisjonering for det
strukturelle. Cheng plasserer turnaround under «business situation»-rammeverket
(kunde/selskap/produkt/konkurranse) [PREP, verifisert PDF].

**Fallgruve:** behandle turnaround som en ren kostnadscase og glemme tidsdimensjonen —
hva må gjøres innen 90 dager vs. 3 år.

### 1.11 Private equity-vurdering

**Logikk.** Commercial due diligence stiller fire spørsmål i rekkefølge [PREP, kun søkeutdrag
— mbbprep, roadtooffer]: vokser markedet? kan målet fortsette å vinne? holder
enhetsøkonomien? hva kan velte dealen?

Legg til PE-spesifikke lag: verdiskapingsplan (vekst, marginforbedring, multiplekspansjon,
gjeldsnedbetaling), holdingperiode, exit-rute, og «hva er maks pris vi kan betale og fortsatt
klare hurdle rate».

**Fallgruver:** glemme kundekonsentrasjon og kontraktsfornyelse; ignorere at PE-eier har en
tidshorisont (3–5 år) som endrer hvilke tiltak som teller; blande verdsettelse med
attraktivitet.

### 1.12 Offentlig sektor / NGO

**Logikk.** Målfunksjonen er ikke profitt. Strukturen må derfor eksplisitt definere *hva som
maksimeres* og *under hvilken budsjettbeskrankning*. Typisk: effekt/impact per krone,
rekkevidde, kvalitet, bærekraft, gjennomførbarhet/interessenter.

Wharton har en ren offentlig-sektor-strukturøvelse («Avalons utdanningspolitikk») der målene
er eksplisitt gitt som **tilgang, kvalitet, ansvarlighet**, med tallfestede mål og 10 års
horisont [UNI, s. 42–43]. Det er et godt mønster: i offentlig sektor er målhierarkiet ofte
oppgitt, og jobben er å bryte det ned i tiltak.

**Fallgruver:** importere profittreet ukritisk; glemme interessenter og politisk
gjennomførbarhet; ikke skille kortsiktige og langsiktige tiltak.

---

## 2. Strukturering — den viktigste ferdigheten

### 2.1 Hva firmaene selv sier

BCG [FIRMA, verbatim fra deres side]:
> «work through the problem step-by-step: structure your approach, ask thoughtful questions,
> analyze data, perform quick calculations, and identify the most important factors»

og

> «there isn't always a single 'right' answer — what matters most is how you approach the
> problem and the quality of your reasoning»

Bain [FIRMA, verbatim]:
> «We're not looking for a single right answer; we're looking for how you think, structure
> problems, and build on ideas as the conversation evolves.»

Merk hva ingen av dem sier: de nevner **ikke ett eneste navngitt rammeverk**. Ingen 3C, ingen
4P, ingen Porter. Det er i seg selv det sterkeste argumentet mot rammeverksmemorering.

### 2.2 Hvorfor bransjen har gått bort fra ferdigmaler

Argumentet, slik prep-industriens mest seriøse aktør formulerer det [PREP, Crafting Cases,
verifisert]: bøkene «viser deg mange rammeverk å pugge, men lærer deg aldri å bygge en
skreddersydd struktur for hver case, slik ekte konsulenter gjør». Og: «Å memorere rammeverk
kan ha hjulpet deg … det vil ikke skaffe deg et tilbud.»

Årsakene, slik de faktisk henger sammen:
1. **Kandidatpopulasjonen er blitt uniform.** Når alle kan Case in Point, skiller ikke
   Case in Point noen.
2. **Malen produserer irrelevante grener.** «Regulering» og «inngangsbarrierer» på en case om
   en kaffebar er støy, ikke struktur.
3. **Malen skjuler drivere som *ikke* står i malen.** En strømmetjeneste og et stålverk deler
   ikke kundeopplevelse — og skal ikke dele tre.
4. **Jobben er å strukturere ukjente problemer.** Et pugget tre beviser ikke den ferdigheten.

**Nyanse verdt å ta med i kurset:** Cosentino, som selv skrev «Case in Point», beskriver på
sin egen side systemet som *fem åpningssteg pluss fire vanlige scenarier* — ikke som tolv
ferdige rammeverk [PREP, casequestions.com, verifisert]. Påstanden om «12 rammeverk MBB er
trent til å straffe» er prep-industriens karikatur av boka, ikke bokas egen selvbeskrivelse.
Vær redelig om dette i kurset.

### 2.3 Hva som forventes i stedet

Tre operative tester som er verdt å lære bort:

**(a) MECE.** Mutually exclusive, collectively exhaustive. Ingen overlapp, ingen hull.
Wharton krever det eksplisitt både i strukturering og i brainstorming [UNI, s. 11].

**(b) CaseCoachs AIM-test** [PREP, kun søkeutdrag — ikke lest fra kilden]:
- **A**nswer-focused: strukturen er rettet mot *riktig* spørsmål og gir en vei til svar
- **I**nsightful: tilpasset akkurat denne situasjonen, ikke generisk
- **M**ECE: uttømmende sett av uavhengige drivere

**(c) Crafting Cases' «fem måter å være MECE på»** [PREP, verifisert]. Dette er den mest
lærbare metoden jeg fant, fordi den gir *verktøy* i stedet for maler:
1. **Algebraiske strukturer** — ligninger. Profitt = Inntekt − Kostnad. Markedsandel =
   vår omsetning / totalmarked. Bygg din egen ligning for akkurat dette problemet.
2. **Prosesstrukturer** — problemet som en sekvens med start, midt og slutt (kundereisen:
   oppmerksomhet → vurdering → kjøp → gjenkjøp; eller verdikjeden).
3. **Konseptuelle rammeverk** — idékategorier (3C, 4P). «Klart det vanskeligste å mestre,
   men mest allsidige verktøyet.»
4. **Segmentering** — dele i skiver for å finne mønstre og miks-effekter.
5. **Motsatte ord** — internt vs. eksternt. Rask, men imponerer sjelden alene.

Kombinasjonen 1 + 2 + 4 er i praksis det som produserer «driverbaserte» trær.

### 2.4 A-strukturering vs. C-strukturering på samme prompt

Bruk Wharton-prompten «Knight Perfumes, et herreparfymemerke, har hatt fallende lønnsomhet
det siste året. Hjelp dem forstå hvorfor, og foreslå hvordan de kan komme tilbake» [UNI, s. 36].
Avklaringene gir: tre produkttyper (deo body spray, mild parfyme, sterk parfyme), **alle tre
har fallende volum**, USA, solgt via e-handel og quick commerce [UNI, s. 37].

**C-strukturering (rammeverksdumping):**
> «Jeg vil se på fire ting: Marked — markedsstørrelse, vekst, regulering. Konkurranse —
> markedsandeler, inngangsbarrierer. Inntekt — pris og volum. Kostnad — faste og variable.
> Så gir jeg en anbefaling.»

Hva som er galt: identisk med treet for et stålverk. Bruker ikke ett eneste faktum fra
avklaringene. «Regulering» og «inngangsbarrierer» er irrelevant for et etablert merke med et
ettårig fall. Ingen hypotese. Ingen prioritering. Ingen kanaldimensjon — enda kandidaten *nettopp*
fikk vite at salget går gjennom e-handel og quick commerce.

**A-strukturering (skreddersydd, hypotesedrevet, driverbasert):**
> «Profitt = inntekt − kostnad, og siden volumet faller på alle tre produktene, starter jeg
> på inntektssiden.
>
> **Inntekt** bryter jeg ned per kanal, fordi Knight selger gjennom to svært ulike kanaler:
> e-handel og quick commerce. For hver kanal: trafikk × konverteringsrate × ordrestørrelse ×
> gjenkjøpsfrekvens, og realisert pris etter rabatt/kampanje. Volumfallet er enten
> *færre besøkende* (mistet synlighet, dyrere annonsering, ny konkurranse), *dårligere
> konvertering* (pris, anmeldelser, plassering i søk), eller *lavere gjenkjøp* (kundelojalitet,
> substitutter). Jeg vil også dele på ny vs. tilbakevendende kunde.
>
> **Miks** som egen gren: parfyme og deo har trolig ulik margin. Selv med likt totalvolum kan
> forskyvning mot deo forklare marginfallet.
>
> **Kostnad** deler jeg i kostnad per solgte enhet (råvare, flaske, frakt, plattformavgift,
> returer) og faste kostnader (markedsføring, merkevarebygging). Netto kundeanskaffelseskostnad
> på quick commerce er en mistenkt, siden marginen der ofte spises av plattformavgift.
>
> **Hypotesen min** er at fallet er drevet av kanalen, ikke av produktet: at
> anskaffelseskostnaden per kunde har steget i e-handel samtidig som quick commerce tar en
> større andel med lavere netto-realisert pris. Jeg vil begynne med å se volum og
> netto-realisert pris fordelt på kanal de siste to årene, sammenlignet med kategorien totalt —
> for å avgjøre om dette er Knight-spesifikt eller kategoribredt.»

Forskjellen i ett punkt: A-svaret er en *nedbrytning av akkurat dette selskapets
inntektsmekanikk*, med en fallbar hypotese og en konkret dataforespørsel. C-svaret er en
innholdsfortegnelse.

### 2.5 Praktiske kvalitetskrav

- 3–4 hovedgrener. Fem eller flere signaliserer manglende prioritering [PREP].
- Under 2 minutter å presentere [UNI, s. 11].
- Presenter **top-down**: overskrift på hver gren først, så dybden.
- Si hva du *ikke* skal se på, og hvorfor.
- Avslutt med hypotese + hvilken gren du starter i + hvilke data du vil ha.
- Tegn treet, men *snakk* det — en struktur som bare finnes på blokka teller ikke.

---

## 3. Casens faser, med tidsbudsjett

Wharton oppgir denne fordelingen for en case på ~20–25 minutter [UNI, s. 11]:

| Fase | Tid | Hva som vurderes |
|---|---|---|
| Bakgrunn, oppsett, gjentakelse | 2–3 min | Aktiv lytting, notatteknikk, oppsummere problemet, avklare mål, stille avklarende spørsmål, forutse struktur |
| Rammeverk + forklaring | 4–5 min | Organisert på under 2 min; høynivå-oversikt over grenene; bore ned i hver; **oppgi hypotese og prioritér gren** |
| Løsningsbygging | 8–10 min | Grave etter informasjon, identifisere og prioritere problemet, organisere brainstorming i grupper, være MECE |
| Matte, eksponater, analyse | 3–5 min | Eksponat: gi oversikt, så nivå-2-innsikter, prioriter dem, bruk tallene, trekk konklusjon. Matte: **gå gjennom fremgangsmåten før du regner** |
| Syntese + anbefaling | 2–3 min | Svar først, så støttefakta fra casen; ta et tydelig standpunkt; bruk harde tall; adressér risiko og neste steg |

RocketBlocks oppgir en grovere tredeling for lengre caser [PREP, verifisert]: ~5 min intro og
strukturering, ~20 min analyse, ~5 min konklusjon. En vanlig tommelfingerregel er at **60–70 %
av tiden går til analyse** [PREP, kun søkeutdrag].

### 3.1 Prompt og avklarende spørsmål

Wharton kategoriserer avklaringene sine eksplisitt, og det er en god undervisningsmodell
[UNI, s. 37, 40, 43, 46]: **(BUSINESS)** hva selger de egentlig / hvordan tjener de penger,
**(OBJECTIVE)** hva er målet, og er det tallfestet, **(GEOGRAPHY)** hvor,
**(SCOPE)** hva er utenfor, **(TIMELINE)** hvilken horisont, **(ALTERNATIVES)** finnes det
andre valg.

To til tre spørsmål er nok. Kvalitetsmarkør: spørsmålet skal **endre strukturen din**. Et
spørsmål hvis svar ikke påvirker treet, er bortkastet tid.

### 3.2 Kvantitativ analyse

Rekkefølge som vurderes: (1) sett opp regnestykket og **si det høyt før du regner**,
(2) be om tallene du trenger, (3) regn, kommentér underveis, (4) **sanity-sjekk**,
(5) si «so what» — hva betyr tallet for saken.

Wharton er eksplisitt på at det å ikke sanity-sjekke er «en veldig enkel måte å få
intervjueren til å miste tilliten til deg» [UNI, s. 24]. De sier også: feil er greit —
erkjenn, korriger, ikke gjenta. Og: kvalitet foran fart.

### 3.3 Eksponattolkning

Wharton [UNI, s. 63] — tre steg, alle verbalisert:
1. **Orientér deg**: forstå aksene, og bekreft ved å si høyt hva ett enkelt datapunkt betyr.
2. **Identifisér trender**: hvor er det bevegelse — og hvor er det *ikke* bevegelse.
3. **Koble prikkene**: svar på «so what» — hvordan endrer dette retningen i casen.

Formuleringsmalen **What → How → So What** brukes bredt i prep-industrien [PREP, kun
søkeutdrag]. Poenget er å lede med implikasjonen, ikke med regnestykket.

### 3.4 Brainstorming / kreativitet

Vurderes som *strukturert* kreativitet. Wharton: «organisér brainstormingen i flere grupper»
og «vær MECE med ideene dine» [UNI, s. 11]. Praksis: bruk 20–30 sekunder på å lage 2–3 grupper
*først*, si gruppene, fyll så på med konkrete ideer under hver, og avslutt med hvilken idé du
ville prioritert og hvorfor.

Påstanden om at «8–12 strukturerte ideer plasserer deg i topp 20 %» er ren prep-folklore
[PREP, kun søkeutdrag] — ikke bruk tallet som fasit.

### 3.5 Syntese og anbefaling

Wharton kaller den **RRRN**: Recommendation, Reasoning, Risks, Next steps [UNI, s. 11].
Svaret først, deretter 2–3 grunner med harde tall fra casen, så risiko, så neste steg.
Dette er Minto-pyramiden anvendt. Prep-industrien anslår 60–90 sekunder [PREP, kun søkeutdrag].

Vanligste feil: å oppsummere hva man gjorde i stedet for å svare på spørsmålet; å ikke ta
standpunkt; å ikke bruke tallene man nettopp regnet ut.

---

## 4. Formler og tommelfingerregler som må sitte

Alt under er hentet fra Wharton-casebookens «27 Case Interview Formulas» [UNI, s. 25–33] med
mindre annet står. Dette er den mest kompakte, etterprøvbare listen jeg fant.

### 4.1 Profitt
```
Inntekt            = Antall × Pris
Totale var. kostn. = Antall × Variabel kostnad per enhet
Kostnad            = Totale variable kostnader + Faste kostnader
Profitt            = Inntekt − Kostnad
Profitt            = (Pris − Variabel kostnad) × Antall − Faste kostnader
Dekningsbidrag     = Pris − Variabel kostnad          (per enhet)
Profittmargin      = Profitt / Inntekt
Bruttofortjeneste  = Salg − Varekostnad (COGS)
Bruttomargin       = Bruttofortjeneste / Inntekt
Driftsresultat     = Bruttofortjeneste − Driftskostnader − Avskrivning − Amortisering
Driftsmargin       = Driftsresultat / Inntekt
EBITDA             = Driftsresultat + Avskrivning + Amortisering
```

### 4.2 Investering og breakeven
```
ROI              = Profitt / Investeringskostnad
Tilbakebetalingstid = Investeringskostnad / Årlig profitt
Breakeven-volum  = Investering / (Pris per enhet − Variabel kostnad per enhet)
```
Bain-eksempel [FIRMA]: (3 × Q) − (163 740 + 245 610 + 1 × Q) = 0 → Q = 204 675 kopper,
tilsvarende ~3 % markedsandel. Merk hvordan de **oversetter breakeven-volumet til
markedsandel** — det er det som gjør tallet vurderbart. Lær bort det grepet.

### 4.3 Marked
```
Markedsandel          = Vår omsetning i markedet / Totalt marked
Relativ markedsandel  = Vår andel / Største konkurrents andel
```

### 4.4 Vekst og nåverdi
```
CAGR   = (Sluttverdi / Startverdi)^(1/antall år) − 1
72-regelen: doblingstid ≈ 72 / vekstrate i prosent   (9 % → 8 år)
NPV    = Kontantstrøm / (1 + diskonteringsrente)^år
Evigvarende annuitet: Nåverdi = Årlig kontantstrøm / Diskonteringsrente
```
Forenklingene som faktisk brukes i caser: for **små** rater kan man tilnærme sammensatt vekst
lineært (5 % i 3 år ≈ 15 %, eksakt 15,76 %) [PREP, kun søkeutdrag]. For evigvarende
kontantstrømmer er `CF / r` den eneste NPV-formelen de fleste caser trenger.

### 4.5 Operasjoner
```
Output      = Rate × Tid
Utnyttelse  = Output / Maksimal output
```

### 4.6 Elastisitet
```
Prisensitivitet = %-endring i volum / %-endring i pris
Krysselastisitet = %-endring i volum for vare 1 / %-endring i pris for vare 2
```

### 4.7 Kundelivstidsverdi

**Merk: CLV/LTV står IKKE i Wharton-casebookens formelliste.** Den er likevel forventet i
abonnements-, SaaS- og telekomcaser. Vanlig form [PREP / alminnelig forretningspraksis]:
```
CLV ≈ (Gjennomsnittlig inntekt per periode × Bruttomargin) / Churn-rate
LTV/CAC ≥ 3 regnes som sunt; CAC-payback måles i måneder
```
Ikke presentér dette som «case-kanon» — presentér det som bransjeverktøy for
abonnementsforretninger.

### 4.8 Pris- vs. volumleddet

Dette er det viktigste analytiske grepet i profitabilitetscaser, og fortjener egen drilling:

Gitt Inntekt = P × Q, kan en endring dekomponeres:
```
ΔInntekt ≈ (ΔP × Q_gammel) + (P_gammel × ΔQ) + (ΔP × ΔQ)
             prisleddet        volumleddet      krysseleddet (lite)
```
Praktisk drill: «Inntekten falt 8 %. Pris falt 3 %, volum falt 5 %.» → prisleddet forklarer
ca. 3/8 av fallet, volumleddet ca. 5/8. Deretter: er prisfallet listepris eller rabatt/miks?
Er volumfallet færre kunder eller færre kjøp per kunde?

Dette dekomponerings-grepet er nøyaktig det Cheng kaller «isolering», og det er også svaret på
hvorfor miks-effekten er farlig: pris og volum kan være uendret *per produkt* mens totalen
faller fordi vekten flyttes.

### 4.9 Faste vs. variable kostnader

- **Fast** = uavhengig av volum på kort sikt (husleie, utstyrsleie, sentral administrasjon).
  Høy fastkostnadsandel = høy operasjonell giring = profitten svinger kraftig med volum, og
  utgjør en inngangsbarriere [PREP, Cheng, verifisert].
- **Variabel** = per enhet (råvarer, distribusjon, provisjon, transaksjonsgebyr).
- Grenseland: lønn er fast på kort sikt, variabel over tid gjennom naturlig avgang.
- Konsekvens for anbefalinger: i høyfastkostnadsbransjer er *volum og utnyttelse* løftestangen;
  i høyvariabelkostnadsbransjer er *enhetskostnad og pris* løftestangen.

### 4.10 Mattehygiene

- Skriv med tusenskille eller vitenskapelig notasjon. Nullfeil er den vanligste tabben.
- Rund maks ~10 %, og rund vekselvis opp og ned så feilene kanselleres [PREP].
- Kunn brøkene: 1/8 = 12,5 %, 1/6 ≈ 16,7 %, 1/3 ≈ 33,3 %, 1/7 ≈ 14,3 %.
- Finn 10 %, 5 % og 1 % og kombinér.
- Referansetall verdt å ha: USA ~340 mill. innbyggere, ~130 mill. husholdninger,
  ~2,5 personer per husholdning, BNP ~27 bill. USD [PREP, kun søkeutdrag — verifisér mot
  Census/BEA før bruk]. **For et norsk kurs bør dette erstattes med norske/europeiske tall.**

---

## 5. Vurderingskriteriene

### 5.1 Slik firmaene selv beskriver dem

**BCG** [FIRMA, deres egen liste]: klar kommunikasjon og logisk tenkning; forretningsintuisjon
og kreativitet; strukturert problemløsning; dataanalyse og kvantitative ferdigheter.

BCGs seks «gjør» [FIRMA]: lytt aktivt, vær deg selv, tenk strukturelt, kommunisér klart,
avklar forutsetninger, vis tenkningen din.
BCGs seks «ikke gjør» [FIRMA]: få panikk, forhaste svaret, overkompliser løsninger,
ignorér tilbakemelding, bli taus, avbryt.

«Ikke bli taus» og «ikke ignorér tilbakemelding» er de to mest undervurderte. Det andre
punktet er i praksis et krav om å *snu* når intervjueren dytter.

**Bain** [FIRMA, deres egen liste]: forstå spørsmålet før du starter, still avklarende
spørsmål; bruk et klart rammeverk og ta intervjueren gjennom tilnærmingen; del resonnement og
utregninger *selv når du er usikker*; tenk høyt; les intervjuerens signaler og juster.

**McKinsey**: **ikke verifisert** — mckinsey.com var utilgjengelig for meg. Andrehåndskilder
er samstemte om at McKinsey vurderer på fire dimensjoner: problemløsning, personal impact,
entrepreneurial drive og inclusive leadership, der PEI-delen dekker de tre siste
[PREP, kun søkeutdrag]. **Verifisér dette mot McKinseys egne sider før det brukes.**

### 5.2 Prep-industriens rubrikker — bruk med forbehold

StrategyCase (drevet av tidligere McKinsey-intervjuer) oppgir syv dimensjoner og en
femtrinnsskala [PREP, verifisert side, men firmaenes faktiske skjemaer er ikke offentlige]:

Dimensjoner: problemløsning · analyse · kvantitativ resonnering · kreativitet · kommunikasjon ·
modenhet og fremtoning · forretningsteft.

Skala: 1 Insufficient → 2 Adequate → 3 Good → 4 Very good → 5 Distinctive.

Deres poeng — og det er pedagogisk verdifullt uansett kildekvalitet — er at firmaene belønner
**spisser**, ikke jevn kompetanse: en kandidat som er distinctive på to dimensjoner slår en som
er «good» på alle syv.

Andre prep-kilder oppgir en firetrinnsskala over fem dimensjoner [PREP, kun søkeutdrag].
Uenigheten mellom kildene er i seg selv beviset på at ingen av dem har sett det ekte skjemaet.

### 5.3 Hva som i praksis skiller «pass» fra «distinctive»

Syntetisert fra det som *er* dokumentert (BCG og Bains egne lister + Wharton-fasene):

| Dimensjon | Pass | Distinctive |
|---|---|---|
| Struktur | MECE, dekkende, gjenkjennelig | Skreddersydd til akkurat denne bedriften; navngir de faktiske driverne; hypotese + prioritering |
| Avklaringer | Stiller noen fornuftige spørsmål | Stiller få spørsmål som *endrer* strukturen |
| Matte | Riktig svar | Riktig oppsett sagt høyt først, sanity-sjekk, og «so what» umiddelbart etter |
| Eksponat | Leser grafen riktig | Går rett til implikasjonen, og sier hva den betyr for retningen i casen |
| Brainstorm | Mange ideer | Gruppert, ikke-åpenbare, og prioritert |
| Syntese | Oppsummerer funn | Svarer på spørsmålet i første setning, med tall, standpunkt, risiko og neste steg |
| Fremtoning | Rolig | Driver samtalen; korrigerer seg selv uten å miste rytmen; tåler press |

Bains ene setning er den mest brukbare enkeltmarkøren i hele materialet [FIRMA]:
«del resonnementet og utregningene dine, *selv om du er usikker*». Kandidater som blir tause
når de er usikre, scorer aldri distinctive — det finnes ingenting å vurdere.

---

## 6. Bransjekunnskap: tall det er verdt å kunne

Alle tall under er **[DATA]** med kilde. Marginer varierer voldsomt mellom selskaper og år —
bruk dem som *størrelsesorden og sanity-sjekk*, aldri som fasit i en case.

### 6.1 Marginbenchmark på tvers (Damodaran, NYU Stern, januar 2026, 5 994 selskaper)

Kilde: `https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/margin.html`

| Bransje | Brutto | EBITDA | Drift | Netto | Ant. |
|---|---|---|---|---|---|
| Flyselskap | 24,8 % | 10,3 % | 5,7 % | 2,5 % | 23 |
| Retail (generell) | 33,2 % | 10,1 % | 8,2 % | 5,6 % | 23 |
| Retail (dagligvare) | 26,3 % | 5,4 % | 2,6 % | 1,3 % | 15 |
| Farmasi | 71,7 % | 33,6 % | 31,2 % | 18,5 % | 228 |
| Bank (money center) | 100 % | – | 2,3 % | 28,9 % | 15 |
| Bank (regional) | 99,6 % | – | 1,6 % | 27,5 % | 568 |
| Telekom (mobil) | 63,0 % | 34,6 % | 22,0 % | 12,2 % | 12 |
| Telekomtjenester | 58,8 % | 34,7 % | 21,1 % | 14,2 % | 39 |
| Software (system/app) | 71,7 % | 35,9 % | 40,8 % | 25,5 % | 309 |
| Software (internett) | 62,6 % | 9,5 % | 18,6 % | −0,9 % | 29 |
| Bil og lastebil | 10,4 % | 7,5 % | 3,2 % | 1,3 % | 33 |
| Stål | 12,3 % | 10,6 % | 4,5 % | 1,9 % | 19 |
| Halvledere | 59,0 % | 36,8 % | 40,4 % | 30,5 % | 66 |
| Hotell/gaming | 60,9 % | 24,5 % | 21,6 % | 10,4 % | 63 |
| Restaurant | 32,2 % | 19,5 % | 17,2 % | 9,4 % | 64 |
| Transport (lastebil) | 21,2 % | 15,6 % | 7,3 % | 3,8 % | 26 |
| Olje/gass (integrert) | 36,1 % | 21,7 % | 11,6 % | 8,3 % | 4 |

Merk banklinjene: «bruttomargin 100 %» er en artefakt av at banker ikke har COGS. Bruk
kostnad/inntekt-forholdet i stedet (se 6.5).

### 6.2 Flyselskap

- Netto margin ~3,9 % forventet i 2026, uendret fra 2025. Nettoresultat ~41 mrd. USD på
  ~1 053 mrd. USD i omsetning. Netto profitt per passasjer ~7,90 USD. Kabinfaktor ~83,8 %.
  Kilde: IATA, pressemelding 9. des. 2025 —
  `https://www.iata.org/en/pressroom/2025-releases/2025-12-09-01/`
- **Viktig oppdatering:** IATA halverte anslaget i juni 2026 til ~23 mrd. USD og ~2,0 %
  netto margin, pga. drivstoffpriser og forstyrrelser i Midtøsten —
  `https://www.iata.org/en/pressroom/2026-releases/06-07-middle-east-disruptions-high-fuel-prices-halve-airline-industry-profitability/`
- Kostnadsstruktur: drivstoff ~29–31 % av driftskostnadene (største enkeltpost), lønn nest
  størst. Regional spredning er stor (Latin-Amerika ~36 %, Nord-Amerika ~26 %). [IATA]
- **Casementalitet:** høy fastkostnadsandel, marginal passasjer nesten ren fortjeneste →
  yield management, kabinfaktor og rutelønnsomhet er de reelle driverne. Netto profitt per
  passasjer i størrelsesorden 8 USD er et fantastisk sanity-sjekk-tall.

### 6.3 Retail og dagligvare

- Dagligvare: netto margin **2,1 %** i 2025 (1,7 % i 2024). Snitt ukesalg per supermarked
  ~668 000 USD; snittbutikk ~42 300 kvadratfot. Kilde: FMI Food Industry Facts —
  `https://www.fmi.org/our-research/food-industry-facts`
- Generell retail: brutto ~33 %, netto ~5,6 % [Damodaran].
- KPI-er en kandidat bør kunne: salg per kvadratmeter, like-for-like / same-store sales,
  konverteringsrate (klesbutikk typisk 20–40 %), gjennomsnittlig kurvstørrelse (ATV),
  enheter per transaksjon (UPT), svinn, lønnskostnad i prosent av salg.
  [PREP/bransjekilder, kun søkeutdrag]
- **Casementalitet:** trafikk × konvertering × kurvstørrelse × frekvens. Skiller man ikke
  disse, kan man ikke si om det er et trafikkproblem, et konverteringsproblem eller et
  sortimentsproblem.

### 6.4 Farmasi

- Bruttomargin ~72 % (sektorsnitt), driftsmargin ~31 %, netto ~18,5 % [Damodaran].
  Store enkeltselskaper ligger på 77–83 % brutto.
- FoU som andel av omsetning: store originatorer typisk **15–25 %**; PhRMA-medlemmer ~21 % av
  global omsetning i 2024. Rene bioteknologiselskaper langt høyere (30–40 %+).
  [PREP/Statista/IntuitionLabs, kun søkeutdrag — verifisér mot PhRMA før bruk]
- SG&A: i størrelsesorden 15–22 % av omsetning.
- **Casementalitet:** patentklippe, pipeline-risiko, prisregulering, og at nesten hele
  kostnaden er *sunk* FoU — marginalkostnaden per pille er nær null. Det gjør prising til et
  verdibasert, ikke kostnadsbasert, spørsmål.

### 6.5 Bank

- EU/EØS: egenkapitalavkastning **10,5 %** (Q1 2025); netto rentemargin **~1,6 %**;
  kostnad/inntekt-forhold ~53–54 %. Kilde: EBA Risk Dashboard —
  `https://www.eba.europa.eu/publications-and-media/press-releases/first-quarter-2025-supervisory-data-shows-eueea-banking-sector-remains-robust-despite-increased-cost`
- USA: netto rentemargin ~3,0–3,4 % (2025) [Deloitte/bransjekilder, kun søkeutdrag].
- **Casementalitet:** inntekten er *rentenetto + gebyrer*, ikke «pris × volum». Driverne er
  utlånsvolum, rentemargin, tapsavsetninger (cost of risk) og kostnad/inntekt-forholdet.
  Wharton har en egen strukturøvelse på nettopp dette («Bank Co.»), der avklaringen etablerer
  at inntekten kommer fra kontogebyr, renter på lån og forsikringspremier [UNI, s. 39–40].

### 6.6 Telekom

- EBITDA-margin ~35 % globalt; capex-intensitet ~18 % av omsetning (17–20 % i 2026,
  fallende mot ~15 % i 2027); tjenesteomsetningsvekst 1,0–1,5 %.
  [Deloitte / S&P Global, kun søkeutdrag]
- ARPU stagnerer: ~1 % CAGR i høyinntektsmarkeder (fallende realt), ~3 % i lav-/mellominntekt.
  [GSMA via sekundærkilde, kun søkeutdrag]
- **Casementalitet:** høy fastkostnad + kontinuerlig capex → EBITDA ser flott ut, fritt
  kontantstrøm gjør det ikke. Driverne er abonnenter × ARPU × (1 − churn), og
  kundeanskaffelseskostnad mot livstidsverdi.

### 6.7 SaaS / software

- Børsnoterte: brutto ~72 %, driftsmargin ~41 %, netto ~25 % [Damodaran, «system & application»].
  Internett-software er derimot netto **negativ** (−0,9 %) — vekstfasen spiser marginen.
- Private benchmarks 2025 [PREP/bransjerapporter, kun søkeutdrag — High Alpha, Benchmarkit]:
  total bruttomargin 71–72 % (under 70 % = kostnadsstrukturproblem); median CAC-payback
  ~18 måneder (9 mnd. ved ACV under 5 000 USD, 24 mnd. ved ACV over 100 000 USD);
  NRR 100–110 % sunt, 120 %+ i toppsjiktet; Rule of 40 nås av bare 11–30 % av selskapene.
- **Casementalitet:** marginalkostnad nær null → alt handler om anskaffelse og retensjon.
  LTV/CAC, churn, NRR, payback. Ikke bruk profittreet direkte; bruk kohort-økonomi.

### 6.8 Industri / produksjon

- Bil og lastebil: brutto 10,4 %, netto 1,3 %. Stål: brutto 12,3 %, netto 1,9 %.
  Halvledere er unntaket: brutto 59 %, netto 30,5 % [Damodaran].
- **Casementalitet:** lave marginer betyr at små volum- og prisendringer velter resultatet;
  kapasitetsutnyttelse, syklisk etterspørsel og råvarepriser dominerer. Dette er
  hjemmebanen for kapasitets- og flaskehalsanalyse.

### 6.9 Én tommelfingerregel om marginer

Nettomarginen forteller deg *hvilken løftestang som virker*:
- Under ~3 % (dagligvare, fly, stål, bil): volum, utnyttelse og enhetskostnad. En prisøkning
  på 1 % kan doble resultatet — og et volumfall på 5 % kan utslette det.
- 10–20 % (retail, hotell, telekom): balansert; miks og kanal betyr mye.
- Over 25 % (farmasi, software, halvledere): pris og markedsandel; kostnadskutt er sjelden svaret.

---

## 7. Konsekvenser for kursbygging (kort)

1. **Struktureringsdrill må være ryggraden**, ikke rammeverksleksikonet. Wharton bruker åtte
   rene struktureringsdriller (prompt → avklaringer → egen struktur → fasitstruktur) *før*
   noen full case [UNI, s. 34–59]. Kopier det formatet.
2. **Skill drill fra case.** Wharton har separate seksjoner for matte, strukturering,
   eksponater og fulle caser. Det er riktig pedagogikk: delferdighetene må automatiseres
   isolert før de settes sammen.
3. **Casedagbok.** Wharton anbefaler logg hver 1.–2. case, med gjennomgang av tilbakemeldinger
   ukentlig, og at man forteller neste intervjuer hva man jobber med [UNI, s. 61]. Dette er
   billig å bygge inn i en app og har høy effekt.
4. **Skill firmaenes ord fra prep-industriens.** Kurset bør merke hver påstand slik dette
   dokumentet gjør. Det er også et konkurransefortrinn: ingen av prep-sidene gjør det.
5. **Åpne hull som må lukkes før produksjon:**
   - Verifisér McKinseys egne formuleringer og de åtte øvingscasene direkte fra mckinsey.com.
   - Verifisér Bains Coffee Shop-markedsberegning (100 000 × 1 kopp/dag → 7 mill./år
     henger ikke sammen aritmetisk i referatet jeg fikk).
   - Erstatt amerikanske referansetall (befolkning, husholdninger, BNP) med norske/europeiske.
   - Frekvenstallene per casetype bør enten dokumenteres eller fjernes fra kursteksten.
