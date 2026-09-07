# FIE432 Personlig økonomi — kartlegging av finansdelen (forelesning 12–16)


Kilde: forelesningsfoilene til Ole-Andreas Næss (OA) høsten 2026, regnearket «Effektive porteføljer med to risikable aksjer», forelesningsplanen H2026 og sensorveiledningene fra H2024 og H2025. Pensum for delen er Døskeland, *Personlig finans* (2014): kap 1–5 (forelesning 12), kap 1–5 og 11 (forelesning 13), kap 8 og 10 (forelesning 15), kap 6 og 12 (forelesning 16). Forelesning 14 (Hallgeir Kvadsheim, 09.10) står i planen som «Tema kommer senere» — det finnes ingen foiler, ingen pensumhenvisning og ingen eksamensoppgaver knyttet til den, så den er ikke kartlagt her.

## Disposisjon

0. Kildeversjoner — hvilken versjon av hver forelesning som er lagt til grunn
1. Aksjesparing og porteføljevalg (forelesning 12 + deler av 13)
2. Pensjon (forelesning 13)
3. Lån og risikostyring (forelesning 15)
4. Forsikring og forventet nytte (forelesning 15 + eksamen)
5. Finansiell psykologi (forelesning 16)
6. Regnerutiner som går igjen
7. Kontrollregning — hva som gikk opp og hva som ikke gjorde det

Hver temaseksjon har underdelene: Begreper · Formler · Regneeksempler · Argumenter · Empiri og regler · Hva eksamen har spurt om.

---

## 0. Kildeversjoner

Alle foilsettene finnes i flere nedlastinger. Jeg har lest alle, sammenlignet dem linje for linje (uten sidetall) og valgt nyeste som grunnlag. Det som er kastet ut i nyeste versjon, er notert der det fortsatt kan dukke opp på eksamen.

| Forelesning | Filer | Dato i foilene | Lagt til grunn | Hva som skiller versjonene |
|---|---|---|---|---|
| 12 Aksjesparing | `ForelesningAksjesparing.txt`, `_(1)`, `_(3)` | base og (1): 09.10.2024; (3): 26.09.2025 | **(3)** | (1) er base + pedagogikk-foil og pandemi/Økokrim-eksempelet, minus et oljeselskap-eksempel (100 → 110). (3) åpner med livssyklusmodellen, definerer sparing vs investering, stryker avsnittet om Samuelson/Merton og tidshorisont, stryker den (feilaktige) påstanden om at null-varians-porteføljen ved ρ = −1 er 50/50, bytter «statsansatt professor» med «byråkrat», stryker Lendo/Schibsted-kritikken, legger til Menti-spørsmål om lånerente, en disclaimer om at foreleserens far forvalter aktive fond, og en ny oppsummeringsfoil «Praktiske råd». |
| 13 Pensjon | `ForelesningPensjon.txt` (= `_(1)`, identiske), `_(4)`, `_(5)` | kort: «16.10.204» (2024); (4) og (5): 08.10.2025 | **(5)**, supplert med én detalj fra (4) | Den korte fila er 2024-utgaven av samme forelesning (23 foiler): 7,1 G oppgitt som 840 000, ingen foil om regulering eller jobbytte, og en feil («mer risiko for arbeidsgiver») som er rettet til arbeidstaker i 2025. (4) og (5) er samme dag; (5) setter «betalte inn» i anførselstegn, sier «opptjent pensjonsbeholdning», fjerner detaljen om at pensjon under utbetaling reguleres med lønnsvekst minus 0,75 prosentpoeng, og retter en avkuttet linje («norskpensjon.no gir e»). Jeg regner (5) som siste redigering, men tar med 0,75-regelen fra (4). |
| 15 Lån | `ForelesningLån.txt`, `_(2)` | 16.10.2024; 09.10.2025 | **(2)** | 2025 legger til «Rente og risiko» (pant gir lav rente, pantelån er dyrt i Norge, lån med sikkerhet i aksjer), en nedbetalingsrekkefølge (kreditt/forbruk → bil/båt → bolig → studielån) og et Dave Ramsey-sitat. Den stryker formelen for hyperbolsk diskontering, referansene Ausubel (1999) og Gathergood (2017), argumentet om at rasjonelle forbrukslån skal være motsykliske, og bytter «10 × verdens BNP» med «740 000 kr til alle i verden». |
| 16 Finansiell psykologi | `Finansiell_psykologi.txt`, `_(1)`, `_(2)` | 23.10.2024; 05.11.2024; 13.10.2025 | **(2)** | (1) = base + praktiske spørsmål (bl.a. «samme γ som i aksjesparing» og «kan gjerne være matte og formler på eksamen»). (2) er omskrevet: ny plan, bias vs støy (Kahneman, Meehl), overkonfidens-tall, Norwegian-caset, fondseksperimentet og home-bias-eksperimentet. Strøket fra 2024: positiv/normativ forskningsrolle, liste over fem typiske feil, USA-deltakelse 20 %, Anagol (India-IPO), endowment-effekt/inaction, Døskeland & Hvide (32 % i egen bransje, −3 pp), Duflo & Saez, Bailey, Guin, Haliassos, Lusardi & Mitchell (80 %/18 %), forskningsseminar. |
| 14 Kvadsheim | — | — | — | Ingen foiler, intet pensum, ingen eksamensoppgaver. Ikke kartlagt. |

Regnearket `Effektive_porteføljer_med_to_risikable_aksjer.txt` er formlene bak foil 34–40 i aksjesparing. Merk en merkelapp-feil: kolonnen heter «AndelAksje2», men ganges med forventning og standardavvik for *aksje 1* — kolonnen er altså i praksis andelen i aksje 1. Standardverdiene er μ₁ = 1, σ₁ = 2, μ₂ = 2, σ₂ = 1, ρ = −0,5 (merk: motsatt nummerering av foilene, der aksje 1 er den gode).

---

## 1. Aksjesparing og porteføljevalg (forelesning 12, deler av 13)

Pensum: Døskeland kap 1–5. Grunnlag: `ForelesningAksjesparing_(3).txt` (26.09.2025), 142 foiler.

### 1.1 Begreper

| Begrep | Slik forelesningen bruker det |
|---|---|
| Livssyklusmodellen | Finansmarkedene lar deg flytte ressurser fra i dag til senere i livet: spare mens du jobber, bruke som pensjonist. Rammen for hele finansdelen. |
| Sparing vs investering | Sparing = sette penger trygt på bankkonto. Investering = plassere i aksjer eller andre risikable produkter med høyere forventet avkastning. Forelesningen ser bort fra alle andre aktiva enn «aksjer» og «bank». |
| Meravkastning / risikopremie | E(r) − r_f: forventet avkastning på aksjemarkedet utover risikofri rente. Historisk 5–8 prosentpoeng over sikre bankinnskudd, «mer enn modellene våre predikerer». |
| Risikoaversjon γ | Parameter for hvor mye man misliker risiko. Høyere γ → mindre i aksjer. Samme γ brukes i nyttefunksjonene i forsikringsdelen. |
| Formue | Ikke bare skattemeldingens tall. Inkluderer humankapitalen. |
| Humankapital | Nåverdien av all fremtidig arbeidsinntekt. Den viktigste eiendelen for en ung, produktiv arbeidstaker; liten for en som snart pensjoneres. Kan være sikker (statsansatt) eller samvariere med aksjemarkedet (β = 1). |
| Tommelfingerregel «100 − alder» | Andel av *finansiell* formue i aksjer. Forelesningen aksepterer regelen, men med humankapital-begrunnelsen, ikke selvhjelpsbøkenes «aksjer blir tryggere på lang sikt». |
| Risiko | Standardavviket (σ) til porteføljen. Varians σ² brukes i Merton-formelen. |
| Diversifisering | «The only free lunch in finance» (Markowitz). Å spre investeringen slik at standardavviket faller uten at forventningen faller like mye. |
| Korrelasjon ρ | Samvariasjon mellom to aksjers avkastning. Diversifisering hjelper for all ρ < 1; ρ = −1 gir mulighet for null risiko. |
| Minimum-varians-portefølje | Punktet A på hyperbelen: kombinasjonen med lavest standardavvik. Den maksimalt risikoaverse velger dette punktet (når bank ikke finnes). |
| Effisiente porteføljer | Den stigende delen av hyperbelen fra A og oppover. Ingen bør ligge under A: der får man både lavere forventning og høyere risiko. |
| Shorting | Negativ investering. Antas mulig i modellen. |
| Kapitalmarkedslinjen (CML) | Linjen fra r_f som tangerer de effisiente porteføljene. Gir høyest forventet avkastning for ethvert nivå av σ. |
| Tangentporteføljen M / markedsporteføljen | Tangeringspunktet. I praksis: et globalt aksjeindeksfond. |
| Sharpe-ratio | Stigningstallet på CML: (E(r_m) − r_f)/σ_m. Meravkastning per enhet risiko. |
| Separasjonsteoremet | Alle bør holde en kombinasjon av bank (eller lån) og markedsporteføljen — ingenting annet. Risikopreferansen avgjør bare *blandingsforholdet*, ikke *hvilke* aksjer. |
| Giring / lånefinansiert aksjekjøp | Å låne for å kjøpe mer av markedsporteføljen. Slik får man mer risiko enn M — ikke ved å kjøpe mer risikable enkeltaksjer. |
| Systematisk vs usystematisk risiko | Risiko man ikke kan diversifisere bort (samvarierer med markedet) vs risiko man kan. Markedet betaler bare for den første. |
| β (beta) | Hvor mye en aksje samvarierer med markedet. Bestemmer risikotillegget i CAPM. |
| CAPM | Avkastningskrav = r_f + β(r_m − r_f). |
| Indeksfond | Eier alle aksjene i en indeks proporsjonalt med markedsverdi; gir indeksens avkastning minus gebyr. Første: John Bogle, 1974 (Vanguard). |
| Aktivt fond | En forvalter velger aksjene. Gebyr typisk 1–2 %. |
| Hedgefond | Aktivt fond med friere mandat; ofte 2 % gebyr + 20 % av avkastningen. |
| Survivorship bias | Dårlige fond legges ned og forsvinner fra statistikken, så historisk snitt for «overlevende» fond overdriver hvor bra aktive fond gjør det. |
| Effisient marked | Prisene reflekterer all informasjon; prisen er «riktig». Tre grader: **svak** (all markedsdata, teknisk analyse verdiløs), **semi-sterk** (all offentlig informasjon, fundamental analyse verdiløs), **sterk** (også innsideinformasjon). |
| Timing | Å prøve å kjøpe/selge på «gode» tidspunkt. Verdiløst i et effisient marked. |
| Event-studie | Test av semi-sterk effisiens: kursen skal reagere umiddelbart på nyheter. Stemmer bra empirisk (MacKinlay 1997). |
| Verdiaksjer | Lav P/E eller høy book-to-market. Har historisk gitt høyere avkastning (Graham, 1930-tallet; Fama-French 1992). |
| SMB, HML | «Small Minus Big» og «High book-to-market Minus Low»: de to ekstra faktorene i Fama-French. |
| α (alfa) | Restleddet i faktormodellen: avkastning som ikke forklares av faktorene. |
| Momentum, «betting against beta» | Andre faktorer med dokumentert meravkastning (BAB: Frazzini & Pedersen). |
| Shillers volatilitetskritikk | Aksjeprisene svinger mer enn endringer i forventede dividender kan forklare (Shiller 1981) — enten er markedet ineffisient eller dividendemodellen feil. |
| Bobler | Black Monday okt. 1987 (−23 % på én dag i USA, sterk oppgang to dager etter) og dotcom-boblen 1999–2000 (P/E eksploderte, så stup). |

### 1.2 Formler

**F1 — Mertons formel for optimal aksjeandel**

    w* = (E(r) − r_f) / (γ · σ_m²)

w* = andel av (total) formue i aksjer; E(r) − r_f = markedets meravkastning; σ_m² = markedets *varians* (ikke standardavvik — vanlig feil); γ = risikoaversjon. Tre drivere: høyere premie → mer, høyere varians → mindre, høyere γ → mindre.

**F2 — Humankapital-justering (forelesningens logikk, ikke skrevet som formel på foilene)**

Total formue = finansformue F + humankapital H. Merton gir ønsket aksjebeløp w*·(F + H).

- H sikker: alt aksjebeløp må tas i F, så andel av finansformuen = w*·(F + H)/F (kan overstige 100 % → lånefinansiering).
- H med β = 1: H teller allerede som «aksjer», så aksjebeløp i F = w*·(F + H) − H (gulv på 0).

**F3 — Forventning og varians for to aktiva**

    E(r_p) = s·μ₁ + (1 − s)·μ₂
    σ_p²   = s²σ₁² + (1 − s)²σ₂² + 2·s·(1 − s)·ρ·σ₁·σ₂

s = andel i aktivum 1. Dette er nøyaktig regnearkets formel (celle D9: `SQRT(A9^2*σ₁² + (1−A9)^2*σ₂² + 2*A9*(1−A9)*ρ*σ₁*σ₂)`).

**F4 — Minimum-varians-andel** (foilene viser tallet 0,8, formelen finnes bare «i en video»)

    s* = (σ₂² − ρσ₁σ₂) / (σ₁² + σ₂² − 2ρσ₁σ₂)

Spesialtilfeller som testes: ρ = 1 → ingen diversifiseringsgevinst, s* = 100 % i aksjen med lavest σ (eksamen H2024). ρ = −1 → s* = σ₂/(σ₁ + σ₂) og σ_p = 0.

**F5 — Kapitalmarkedslinjen**

    E(r_p) = r_f + [(E(r_m) − r_f) / σ_m] · σ_p

Stigningstallet er Sharpe-ratioen. Alle punkter på linjen er kombinasjoner av bank og M; σ_p > σ_m krever lån.

**F6 — CAPM**

    r_i = r_f + β_i · (r_m − r_f)

**F7 — Fama-French trefaktormodell**

    r = r_f + β(r_m − r_f) + b_s·SMB + b_v·HML + α

**F8 — Tallgrunnlag for CML som forelesningen bruker**: r_f = 3 %, premie 5 %, σ_m = 15 % → E(r_p) = 0,03 + 0,333·σ_p.

### 1.3 Regneeksempler (alle kontrollregnet i Python)

| # | Oppgave | Fasit på foilene | Kontroll |
|---|---|---|---|
| E1 | Merton med premie 0,04, σ = 0,2, γ = 3 | w = 0,33 | 0,04/(3·0,04) = 0,3333 ✓ |
| E2 | Formue 2 mill, ingen humankapital, w = 1/3 | 666 000 i aksjer, resten i bank | ✓ |
| E3 | Samme, pluss sikker humankapital 3 mill | Egentlig formue 5 mill → 1,66 mill i aksjer (= 83 % av finansformuen) | 5 000 000/3 = 1 666 667 ✓ |
| E4 | Samme, men humankapitalen har β = 1 | Du «eier allerede» 3 mill aksjer > 1,66 mill → hele finansformuen risikofritt | ✓ (gulv 0) |
| E5 | Aksje 1: μ = 2, σ = 1; aksje 2: μ = 1, σ = 2; ρ = 0. Halvparten i hver | E = 1,5; σ = 1,12 | σ = √(0,25·1 + 0,25·4) = 1,118 ✓ |
| E6 | Samme, s = 0,95 i aksje 1 | E = 1,95; σ = 0,96 | σ = 0,955 ✓ — lavere enn 1,0 med alt i aksje 1: diversifiseringsmagien |
| E7 | Samme, s = 0,8 (minimum varians) | E = 1,8; σ = 0,89 | σ = 0,894 ✓; F4 gir s* = 4/5 eksakt ✓. Alle s ∈ [0,8; 1] kan være optimale; s < 0,8 aldri |
| E8 | Samme, men ρ = −1: finnes en portefølje med σ = 0? | Ja. 2025-foilene sier bare «alle andeler mellom 0,5 og 1 kan være optimale» | **Går ikke opp.** Null-varians ved ρ = −1 krever s* = σ₂/(σ₁+σ₂) = 2/3 (E = 1,667), ikke 0,5. 2024-versjonen sa eksplisitt w₁ = w₂ = 0,5 med E = 1,5 — det er feil for disse tallene (gjelder bare σ₁ = σ₂). 2025-versjonen strøk påstanden, men «mellom 0,5 og 1» burde vært «mellom 2/3 og 1». |
| E9 | Regnearkets standardtall: μ₁ = 1, σ₁ = 2; μ₂ = 2, σ₂ = 1; ρ = −0,5 | (ingen fasit; interaktivt) | Min-varians ved 28,6 % i det risikable aktivumet, σ_p = 0,655, E = 1,71 |
| E10 | CML med r_f = 3 %, premie 5 %, σ_m = 15 % | E(r_p) = 0,03 + (0,05/0,15)·σ_p | Sharpe = 0,333. σ_p = 15 % → 8 %; σ_p = 30 % (gire 2×) → 13 % ✓ |
| E11 | Buffetts veddemål 2008–2017 | Indeks +85 %, hedgefond +22 % | Faktatall, ikke regnet |
| E12 | Eksamen H2025 opg 11(1): premie 0,05, varians 0,10, w* = 0,5 → γ? | γ = 1 | 0,05/(1·0,10) = 0,5 ✓ |
| E13 | Eksamen H2025 opg 11(2): F = 1 mill, sikker H = 1 mill, w* = 0,5 | 100 % av finansformuen i aksjer | 0,5·2 mill = 1 mill = hele F ✓ |
| E14 | Eksamen H2025 opg 11(3): H har β = 1 | 0 % | 0,5·2 − 1 = 0 ✓ |
| E15 | Eksamen H2024 opg 12d: σ_A = 20 %, σ_B = 30 %, ρ = 1, minimer σ | 100 % i A | σ_p ved 100/99/69/51 % i A = 0,200/0,201/0,231/0,249 ✓ |

### 1.4 Argumenter

**A1 Aksjer bør inngå.** Påstand: aksjer har gitt høyere avkastning over tid, i alle land. Mekanisme: risikopremie på 5–8 pp over bankinnskudd, faktisk *høyere* enn modellene tilsier. Konklusjon: spørsmålet er ikke *om*, men *hvor mye* og *hvilke*.

**A2 Hvor mye: Merton.** Påstand: andelen bestemmes av tre ting. Mekanisme: premien trekker opp, variansen og risikoaversjonen trekker ned; Merton formaliserer det som F1. Konklusjon: med typiske tall (4 %, 20 %, γ = 3) ca. en tredjedel av formuen.

**A3 Humankapitalen styrer aksjeandelen.** Påstand: «formue» er mer enn skattemeldingen. Mekanisme: nåverdien av fremtidig lønn er en eiendel; er den sikker, er den en stor «bankinnskudd»-post som gjør at en høyere andel av den *finansielle* formuen kan stå i aksjer (E3). Samvarierer den med markedet (β = 1), er den allerede «aksjer», og finansformuen bør være tryggere (E4). Konklusjon: unge med trygg jobb → høy aksjeandel; eldre eller de med markedsavhengig jobb → lavere. Dette er *økonomenes* begrunnelse for «100 − alder».

**A4 Økonomer vs selvhjelpsbøker om tidshorisont.** Påstand: selvhjelpsbøkene sier aksjer blir mindre risikable på lang sikt. Mekanisme: økonomene er uenige — risikoen forsvinner ikke med tiden (2024-foilene: Samuelson og Merton viser at optimal andel ikke skal avhenge av horisont). Konklusjon: samme råd (eldre bør ha mindre), men av grunnen i A3, ikke tidsdiversifisering. (Eksamen H2025 opg 11(4) tester akkurat dette skillet.)

**A5 Diversifisering er gratis lunsj.** Påstand: selv en aksje som er dårligere på *både* forventning og risiko kan forbedre porteføljen. Mekanisme: med ρ < 1 faller variansen når man flytter en liten andel over (E6), fordi krysleddet 2s(1−s)ρσ₁σ₂ er mindre enn det man gir opp i s²σ₁². Konklusjon: aldri sett alt i én aksje; optimalt ligger på den effisiente delen av hyperbelen.

**A6 Bank + shorting gir kapitalmarkedslinjen.** Påstand: med et risikofritt aktivum dominerer én rett linje hele hyperbelen. Mekanisme: linjen fra r_f som tangerer i M ligger over de effisiente porteføljene for *ethvert* σ. Konklusjon: alle investorer, uansett γ, tilpasser seg på linjen.

**A7 Separasjonsteoremet.** Påstand: risikovillighet skal ikke påvirke hvilke aksjer du eier. Mekanisme: alle holder M; preferansene bestemmer bare andelen bank vs M. Konklusjon: den som vil ha mer risiko enn M skal *låne og kjøpe mer M* — ikke kjøpe volatile enkeltaksjer (eksamen H2025 opg 15).

**A8 Lånefinansiering kan være rasjonelt.** Påstand: advarslene mot å låne til aksjer gjelder ikke alle. Mekanisme: en ung statsansatt med stor, sikker humankapital og liten finansformue tar lite total risiko ved å lånefinansiere litt fondssparing; Nordnet tilbyr giret indeksfond (fra 03.10.2023). Krav: lånerenten må være klart under forventet aksjeavkastning — markedet har gitt 3–7 pp over en risikofri rente på 3–4 %, så «ingen grunn til å tro på 15 %». Konklusjon: bare med lav rente (boliglån/verdipapirlån); aldri forbrukslån til 12 %.

**A9 Hvorfor ikke én start-up?** Påstand: å ta ekstrem risiko i én aksje gir ikke ekstra betaling. Mekanisme: 100 uavhengige start-ups i ulike land fjerner nesten all risiko; siden alle kan gjøre det, priser markedet ikke inn selskapsspesifikk risiko. Bare samvariasjon med markedet (β) belønnes — det er CAPM. Konklusjon: usystematisk risiko er som lotto — stor risiko, null betaling. Tesla-digresjonen: investoren gjorde to feil — konsentrert Tesla-risiko og forbrukslån — ikke lånefinansiering i seg selv.

**A10 Indeksfond slår aktive fond etter kostnader.** Påstand: kjøp globalt indeksfond, ikke aktive fond. Mekanismer: (i) maksimal diversifisering; (ii) gebyr 1–2 % årlig (hedgefond 2 + 20) spiser meravkastningen; (iii) aritmetikk — markedet *er* snittet, så alle kan ikke slå det; (iv) empiri: Jensen (1969) og Malkiel (1995, med survivorship bias) finner at aktive forvaltere i snitt slås av markedet på grunn av gebyrer; de 20 beste på 70-tallet gjorde det dobbelt så bra som indeks, men ble slått på 80-tallet; de beste på 80-tallet var under middels på 90-tallet; SPIVA 2020: flertallet av aktive fond taper mot S&P 500; Berk & DeMarzo: aktive fond slår indeks *før* gebyrer, kundene taper *etter*; flinke forvaltere som forfremmes leverer dårligere etterpå; (v) Buffetts veddemål; (vi) Forbrukerrådets norske tall. Konklusjon: indeks gir snittet, og du er neppe bedre enn snittet. (Foreleserens far forvalter aktive fond i Nordea; anbefalingen er likevel «NEI».)

**A11 Effisiente markeder — ikke prøv å time.** Påstand: prisen reflekterer all informasjon. Mekanisme: var prisen for lav, ville flere kjøpt til den steg til riktig nivå; markedet er fremoverskuende, så en ventet krise prises inn *før* den kommer. Pandemien: Oslo Børs falt ~30 % på noen uker fra slutten av februar 2020 og steg igjen fra midten av mars; Hegnars «Cash is king» 10. mars var allerede i prisene. Konklusjon: det finnes ikke gode og dårlige kjøpstidspunkt. (Økokrim/Finnes-eksempelet brukes bare for å vise Økokrims *manglende* forståelse av dette.)

**A12 Enkeltaksjer: du er ikke smartere, og andre har innsideinfo.** Påstand: «jeg har tro på produktet» holder ikke. Mekanisme: en hær av profesjonelle har allerede analysert selskapet og priset det; hvis du likevel har rett, er det fordi du har innsideinformasjon (ulovlig). Norge er lite, mange investorer er politikere eller gift med dem. Konklusjon: med indeksfond får du gjennomsnittet uansett hvem som vet hva (eksamen H2024 opg 12a).

**A13 Men er prisene alltid riktige?** Påstand: nei, ikke åpenbart. Mekanisme: 1987, dotcom, Shillers overskuddsvolatilitet. Mot dette: event-studier støtter semi-sterk effisiens, og selv de beste profesjonelle klarer ikke å slå markedet — en indirekte test som tyder på at feilprisinger er få. Konklusjon: markedet er «i hvert fall ganske» effisient.

**A14 Faktorer og «aksjetips».** Påstand: noen aksjetyper (verdi, små, momentum, lav beta) har gitt høyere avkastning. Mekanisme: to tolkninger — (1) de er bedre investeringer, (2) de bærer risiko CAPM ikke fanger (Asness & Liew: «crappy companies»). Daniel & Hirshleifer (USA 1963–2014) finner at faktorporteføljer gir høyere Sharpe. Konklusjon: kjøp bare hvis du tror på tolkning 1; er det skjult risiko, øker ikke risikojustert avkastning. Ingen selvhjelpsbøker nevner kovarians — og det er kovariansen som prises.

**A15 Valutasikring av globalt fond** (eksamen H2024 opg 12c; begrunnelsen står i 2024-utgaven av psykologiforelesningen). Påstand: en risikoavers nordmann bør *ikke* valutasikre. Mekanisme: svak krone → lavere reallønn/humankapital, men høyere kroneverdi på utenlandske aksjer; usikret fond betaler altså mest når arbeidsinntekten er lavest — negativ samvariasjon jevner ut total inntekt. Sikring fjerner denne naturlige hedgen. Konklusjon: la valutaeksponeringen stå.

### 1.5 Empiri og regler

- Risikopremie: «typisk 5–8 prosentpoeng» over bankinnskudd; senere «rundt 5 %»; «3–7 prosentpoeng over risikofri rente på 3–4 %».
- Årlig standardavvik på global aksjeindeks: ca. 15 %. Risikofri rente brukt i eksempler: 3 %.
- Aktive fond: gebyr ofte 1–2 %. Hedgefond: 2 % + 20 % av avkastningen.
- Buffett-veddemålet (2008, ti år): indeks +85 %, hedgefond +22 %.
- SPIVA 2020: mer enn halvparten av aktive amerikanske fond taper mot S&P 500.
- **Forbrukerrådet**, norske aktive fond mot indeks, 20 år til 2018, årlig differanseavkastning i prosentpoeng: globale −0,89 · europeiske −1,08 · nordiske −3,48 · **norske +0,86**. Aktive fond taper på alt unntatt norske aksjer (eksamen H2025 opg 16).
- Globalt indeksfond: ca. 70 % USA, lite eller ingen eksponering mot Kina (eksamen H2024 opg 12b). Tallet står ikke i tekst i foilene — foil 81 «Den globale aksjeindeks» er et bilde — så dette må legges inn som fakta i læringsprogrammet.
- Norge utgjør 0,2 % av verdens aksjemarked (psykologiforelesningen).
- Oslo Børs 2020: −30 % på noen uker fra slutten av februar; oppgang fra midten av mars.
- Black Monday, oktober 1987: −23 % på én dag i USA.
- Første indeksfond: Bogle 1974 (Vanguard). Nordnet gearet indeksfond: 03.10.2023.
- Fama-French (1992): verdi og størrelse. Daniel & Hirshleifer: USA 1963–2014.

### 1.6 Hva eksamen har spurt om

- **H2025 opg 11 (4 p):** Merton baklengs (finn γ), humankapital sikker → 100 %, humankapital β = 1 → 0 %, eldre → lavere andel *fordi humankapitalen er mindre verdt* (ikke fordi risiko forsvinner over tid; sensor godtar også «lik andel» hvis man leser «andel av totalformuen»).
- **H2025 opg 15 (1 p):** vil du ha mer risiko enn M → lån og gir M (CML/separasjon), ikke enkeltaksjer eller én start-up.
- **H2025 opg 16 (1 p):** Forbrukerrådets funn: aktive taper på globale, europeiske, nordiske; vinner på norske.
- **H2024 opg 12 (4 p):** (a) feil påstand om indeksfond = «gir høyere avkastning enn vektet snitt av enkeltaksjene» (indeks *er* det vektede snittet); (b) 70 % USA, lite Kina; (c) ikke valutasikre når lønnen er høy ved sterk krone; (d) ρ = 1 → 100 % i aksjen med lavest σ.
- Formelspørsmål varsles eksplisitt («kan gjerne være matte og formler på eksamen»; «samme γ» i alle nyttefunksjoner).

---

## 2. Pensjon (forelesning 13)

Pensum: Døskeland kap 1–5 og 11. Grunnlag: `ForelesningPensjon_(5).txt` (08.10.2025), 48 foiler, hvorav de ti første handler om minuspoeng på flervalgstesten.

### 2.1 Begreper

| Begrep | Slik forelesningen bruker det |
|---|---|
| Pensjonssparing | Livssyklusmodellens sparing i yrkesaktiv alder for bruk i pensjonstiden. Særtrekk: stat og arbeidsgiver hjelper til — enten fordi folk ikke antas å være langsiktige nok, eller fordi pensjon er sparing *og* forsikring. |
| Fondert | Penger settes faktisk til side for å møte fremtidige forpliktelser (tjenestepensjon). |
| Pay-as-you-go | Dagens yrkesaktive betaler for dagens pensjonister (folketrygden). |
| Innskuddsbasert | Det du får tilbake avhenger av det som er satt inn. Folketrygden er innskuddsbasert i denne forstand (opptjening bygger en beholdning), men ikke fondert. |
| Opptjeningssats 18,1 % | Hvert år legges 18,1 % av pensjonsgivende inntekt opp til 7,1 G (ca. 920 000 kr i 2025) til pensjonsbeholdningen. Gjelder de som er «født etter 1963» (foilens ordlyd; alleårsregelen gjelder fullt ut fra 1963-kullet). |
| Pensjonsbeholdning | Summen av årlig opptjening, regulert hvert år med gjennomsnittlig lønnsvekst fram til uttak. |
| Delingstall | Tallet beholdningen deles på for å få årlig pensjon. Avspeiler forventet antall år som pensjonist. Senere uttak → lavere delingstall → høyere årlig beløp. |
| Levealdersjustering | Innført i pensjonsreformen 2011 (Stoltenberg): delingstallet øker for yngre kull etter hvert som forventet levealder øker, så pensjonen for gitt uttaksalder faller. |
| Regulering under utbetaling | Pensjonen vokser litt saktere enn lønnsnivået til de yrkesaktive. Versjon (4): reguleres med lønnsvekst, deretter fratrekk 0,75 prosentpoeng, «holder omtrent tritt med prisveksten». (Merk: 0,75-regelen var regimet 2011–2021; fra 2022 er regelen gjennomsnitt av lønns- og prisvekst. Foilene sier ikke dette.) |
| Pensjon som forsikring | To påstander kan ikke begge være sanne: «du får tilbake det du betalte inn» og «du får pensjon så lenge du lever». Folketrygden er den siste — den forsikrer mot å leve lenge. De som lever lenge får mer, de andre mindre. |
| Tjenestepensjon | Lovpålagt for alle bedrifter: minimum 2 % av lønn opp til 12 G (OTP). Noen setter av 7 %. |
| Innskuddspensjon | Arbeidsgiver sparer en fast andel av lønnen; du velger investeringene og bærer risikoen. Arves av etterlatte ved dødsfall. Ved jobbytte → pensjonskapitalbevis / egen pensjonskonto. |
| Ytelsespensjon | Avtale om en viss andel av lønnen i pensjon; arbeidsgiver bærer risikoen. Ved jobbytte → fripolise. |
| Hybridpensjon | Kombinerer elementer fra begge; vanligst i offentlig sektor. |
| Offentlig vs privat tjenestepensjon | Privat: 9 av 10 har innskudd; ulik fra bedrift til bedrift; utbetales som regel bare i 10 år. Offentlig: ferdig pakke; utbetales livet ut. |
| Egen pensjonskonto / pensjonskapitalbevis | Oppspart innskuddspensjon fra tidligere arbeidsgivere. Kan ikke fylles på selv, men vokser med avkastning; kan flyttes fritt. Oversikt: norskpensjon.no. |
| Standard risikoprofil | Ofte 50 % aksjer / 50 % renter — «selv om unge gjerne bør ha høyere andel». |
| IPS | Individuell pensjonssparing: utsatt skatt og fritak for formuesskatt på investert beløp, maks 15 000 kr/år; bundet til pensjonsalder. Eksamen H2024: «kan ses som et rentefritt lån fra staten». |
| BSU | For deg under 34 som ikke eier bolig. Skattefradrag 10 % av innskudd: 27 500 → 2 750 kr (ordningen «gjort mindre lønnsom»; tidligere 20 %). |
| Bolig som pensjonssparing | Mange skattefordeler, og strenge avdragskrav gjør at boligkjøp tvinger fram sparing. |
| Minuspoeng på flervalg | Riktig +3, feil −1: E = 3p − (1 − p) = 4p − 1. Ren gjetting (p = 0,25) gir 0; eliminert to alternativer (p = 0,5) gir 1; sikker gir 3. Poenget: nøytralisere flaks, skille «vet», «gjetter» og «vet at de ikke vet». |

Ikke dekket i OA-foilene, men nevnt i oppgavelisten: AFP, aksjesparekonto, «OTP fra første krone» (2022), maks 7 % + 18,1 % tillegg for 7,1–12 G. Disse må hentes fra Døskeland kap 11 eller Schjelderups skatteforelesninger.

### 2.2 Formler

**F9 — Årlig opptjening i folketrygden**

    opptjening_t = 0,181 · min(inntekt_t, 7,1 G)

**F10 — Pensjonsbeholdning ved uttak**

    B = Σ_t opptjening_t · (lønnsindeks ved uttak / lønnsindeks år t)

(dvs. hvert års opptjening reguleres med lønnsvekst fram til uttak).

**F11 — Årlig alderspensjon**

    årlig pensjon = B / delingstall(kull, uttaksalder)

Delingstallet faller med uttaksalder og stiger med fødselsår (levealdersjustering).

**F12 — Forventet poeng ved minuspoeng**

    E = 3p − (1 − p) = 4p − 1

### 2.3 Regneeksempler

| # | Oppgave | Fasit på foilene | Kontroll |
|---|---|---|---|
| E16 | Født 1970, beholdning 4 670 000. Uttak ved 62: delingstall 21,15 | 221 000 kr/år | 4 670 000/21,15 = 220 804 ✓ |
| E17 | Samme, uttak ved 67: delingstall 17,08 | 273 000 kr/år | 4 670 000/17,08 = 273 419 ✓ (24 % høyere enn ved 62) |
| E18 | 7,1 G i 2025 | «cirka 920 000» | G = 130 160 (1.5.2025) → 924 136 ✓. 12 G = 1 561 920 |
| E19 | BSU: 27 500 inn | 2 750 i fradrag | 10 % ✓ |
| E20 | Minuspoeng: p = 0,25 / 0,5 / 1 | E = 0 / 1 / 3 | ✓ |
| E21 | Eksamen H2025 opg 14: Knut (født etter 1962) utsetter uttak | Delingstallet *synker*, årlig utbetaling *øker* | Beholdningen fordeles på færre forventede år ✓ |

### 2.4 Argumenter

**A16 Hvorfor staten blander seg i pensjonssparing.** Påstand: pensjon behandles annerledes enn annen sparing. Mekanisme: (i) folk er kanskje ikke rasjonelle/langsiktige nok (present bias, se psykologi), (ii) pensjon er også forsikring, og forsikring mot lang levetid fungerer ikke frivillig. Konklusjon: stat (folketrygd) og arbeidsgiver (OTP) tvinger fram sparingen.

**A17 Folketrygden er forsikring, ikke sparekonto.** Påstand: du får ikke «tilbake det du betalte inn». Mekanisme: beholdningen deles på et delingstall som er forventet gjenstående leveår; de som lever lenger enn forventet får mer enn beholdningen, de som dør tidlig får mindre. Konklusjon: livsvarig utbetaling er bare mulig fordi kort- og langlevende deler risiko. Frivillig ville bare de som venter å leve lenge bli med (ugunstig utvalg) — «det kommer vi tilbake til i forelesning om forsikring».

**A18 Levealdersjustering.** Påstand: pensjonen for et gitt uttakstidspunkt faller for yngre kull. Mekanisme: økt levealder gjør systemet dyrere; 2011-reformen lot delingstallet stige med forventet levealder. Konklusjon: yngre må jobbe lenger for samme årlige pensjon.

**A19 Utsatt uttak lønner seg per år.** Påstand: å vente fra 62 til 67 gir 24 % høyere årlig pensjon (E16–E17). Mekanisme: samme beholdning, lavere delingstall. Konklusjon: valget er nøytralt i forventning (livsvarig sum omtrent lik), så det handler om helse, likviditet og risikopreferanse.

**A20 Innskudd vs ytelse — hvem bærer risikoen.** Påstand: innskuddspensjon er mer risikabel *for arbeidstaker*. Mekanisme: arbeidsgivers forpliktelse stopper ved innskuddet; avkastningen avgjør pensjonen. Ytelse gir garantert andel av lønn; risikoen ligger hos arbeidsgiver. Konklusjon: med innskudd bør du selv velge risikoprofil (eksamen H2025 opg 17), og unge bør ligge over standard 50/50. (2024-foilene sa feilaktig «mer risiko for arbeidsgiver»; rettet i 2025.)

**A21 Individuell pensjonssparing er nesten som annen sparing.** Påstand: det er små forskjeller på å spare i IPS, fond, bank eller nedbetaling av lån. Mekanisme: alt er flytting av penger til fremtiden. Unntak: IPS gir utsatt skatt og formuesskattefritak (skatteverdien er reell), men binder pengene. Konklusjon: skattefavoriserte former (BSU, bolig, IPS) er de mest lønnsomme — og boligkjøp med avdragskrav er i praksis tvungen pensjonssparing.

### 2.5 Empiri og regler

- Folketrygden: 18,1 % opptjening av inntekt opp til 7,1 G; G ≈ 130 000 (2025) → tak ca. 920 000. Beholdning reguleres med lønnsvekst. Uttak fleksibelt fra 62 (foilene bruker 62 og 67 som eksempler).
- Delingstall 1970-kullet: 21,15 ved 62, 17,08 ved 67.
- Pensjonsreform 2011 (Stoltenberg): levealdersjustering. Forventet levealder øker (foil med graf).
- OTP-minimum: 2 % av lønn opp til 12 G. Noen bedrifter 7 % (TV2-sak).
- Privat sektor: 9 av 10 har innskuddspensjon. Privat utbetaling typisk 10 år; offentlig livsvarig.
- Innskuddspensjon arves; standard profil 50/50.
- IPS: maks 15 000 kr/år, utsatt skatt, formuesskattefritak, bundet.
- BSU: under 34 år, ikke boligeier, fradrag 10 % (27 500 → 2 750).
- «Nordmenn kan ikke så mye om pensjon» (Nettavisen-foil, bilde).
- norskpensjon.no gir oversikt over alle avtaler.

### 2.6 Hva eksamen har spurt om

- **H2025 opg 14 (1 p):** utsatt uttak → delingstall synker, årlig utbetaling øker.
- **H2025 opg 17 (1 p):** innskuddspensjon: du kan velge og endre risikoprofil; arbeidsgiver garanterer ikke sluttlønnsandel; kan ikke tas ut før pensjonsalder; forvaltes ikke kollektivt uten valg.
- **H2024 opg 13 (2 p):** (a) innskudd = arbeidsgiver sparer fast beløp, ytelse = garantert utbetaling; (b) IPS = utsatt skatt («rentefritt lån fra staten») + formuesskattefritak — ikke BSU-lignende, ikke uttak ved 35, ikke fritak for hele formuen.

---

## 3. Lån og risikostyring (forelesning 15)

Pensum: Døskeland kap 8 og 10. Grunnlag: `ForelesningLån_(2).txt` (09.10.2025), 38 foiler. Foilene inneholder **ingen formler** — annuitet og effektiv rente står i Døskeland kap 8 og er lagt inn under 3.2 som standardformler, merket som supplement.

### 3.1 Begreper

| Begrep | Slik forelesningen bruker det |
|---|---|
| Lån i livssyklusmodellen | Flytting av penger fra fremtiden (der du venter å ha mye) til i dag. Derfor tas lån hovedsakelig i ung alder og betales gradvis ned. Ikke noe negativt i seg selv. |
| Lånetyper | Studielån, boliglån, billån, forbrukslån, kredittkortgjeld, uformelle lån, («obligasjoner?»). Forskjellen for långiver er risiko → ulik rente. |
| Rente og risiko | Jo høyere sannsynlighet for at du ikke betaler tilbake, jo høyere rente kreves. |
| Pant / sikkerhet | Boliglånsrenten er lav fordi banken kan ta huset. Forbrukslån har ingen sikkerhet → mye høyere rente. «Bottom line: få banken til å oppfatte risikoen som lav.» |
| Fattigdomsfelle | Den som ikke får billig lån må ta dyrt lån, får større gjeld, blir enda mindre kredittverdig. |
| Pantelån | Lån mot smykker o.l. Burde vært billig (sikkerhet), men er dyrt i Norge. |
| Lån med sikkerhet i aksjer | Aksjeeiere kan låne mot porteføljen til lav rente (foil med skjermbilde). |
| Payday loan | Lån til neste lønning, 260–1 000 % årlig rente. Kan være rasjonelt uten alternativer; i Norge finnes alternativer. |
| Kredittkort | Fordeler: forsikringer, sikkerhet, rabatter, rentefritt om fakturaen betales. Kostnad: høy rente om du glemmer. |
| Regelen | Lån billigst mulig; betal ned lånet med høyest rente først. Eneste unntak: ulike konsekvenser ved mislighold. |
| Nedbetalingsrekkefølge | 1. Kreditt-/forbrukslån. 2. Bil-/båtlån. 3. Boliglån. 4. Studielån (slettes ved død, rentefritak ved sykdom). |
| Snøballmetoden | Dave Ramsey: betal minste gjeld først for «quick wins». Atferdsargument, ikke matematisk. |
| The debt puzzle | 30 % i USA har kredittkortgjeld samtidig som de har andre midler. Vanskelig å forsvare rasjonelt. |
| Mental accounting | Thaler & Shefrin: folk ser pensjonssparing som urørlig og lønnskontoen som fri; forklarer gjeld + sparing samtidig. |
| Present bias / hyperbolsk diskontering | Overvekt på nåtid → større sannsynlighet for kredittgjeld. Kredittkortselskapene utnytter det. (2024-formel: se F15.) |
| Eksponentiell vekst-bias | Stango & Zinman (2009): folk undervurderer rentes rente. |
| Teaser-renter | Ausubel (1999): folk velger kort med lav startrente og høy rente senere selv om totalen er dyrere. |
| Lik-andel-regelen | Gathergood et al (2017): folk betaler lik andel på hvert lån i stedet for høyest rente først. |
| Renteregulering | Standardteori: ingen regulering mellom rasjonelle, fullt informerte parter uten eksternaliteter. Historisk: rentetak siden Det gamle testamentet; USAs militære; noen delstater. Morgan et al (2012): forbud → enda dyrere kilder. |
| Tre tilfeller | Reguler hvis (1) høy rente skyldes desperasjon uten alternativer, (2) låntaker ikke forstår; men (3) risikable prosjekter *skal* betale høy rente — kunstig lav rente feilallokerer kapital. |
| Lån mellom land | Kriseland må betale høyere rente (misligholdsfrykt). «Rettferdig?» |
| Utlånsregulering | Du kan ikke låne så mye du vil: banken vil kanskje ikke, og staten tillater kanskje ikke. Begrunnelse: systemrisiko, ikke enkeltindivider (høye forbrukslånsrenter er jo tillatt). Frislipp har gitt finanskriser. |
| Fast vs flytende rente | Fast rente «lønner seg» ikke eller «lønner seg ikke» — det er en *forsikring* mot høyere rente. |
| Avdragsfrihet | Hjelper likviditeten i dag; ingen rentefordel eller -kostnad på lang sikt. (Eksamen H2024 opg 14: fornuftig ved midlertidige likviditetsproblemer.) |

### 3.2 Formler

Ingen i foilene. Standardformlene fra Døskeland kap 8 som et læringsprogram må ha:

**F13 — Annuitetslån (fast terminbeløp)**

    A = L · r / (1 − (1 + r)^(−n))

L = lånebeløp, r = rente per termin, n = antall terminer. Rentedel synker og avdragsdel stiger over tid. Serielån: avdrag = L/n hvert år, rente på restgjeld.

**F14 — Effektiv rente**

    r_eff = (1 + r_nom/m)^m − 1

m = antall kapitaliseringer per år. Gebyrer legges inn ved å løse for den renten som gjør nåverdien av alle betalinger lik utbetalt beløp.

**F15 — Hyperbolsk diskontering (2024-foilene, strøket i 2025)**

    U = x₀ + β·[δx₁ + δ²x₂ + … + δⁿxₙ],   β < 1

Standard eksponentiell diskontering har β = 1. β < 1 gir ekstra vekt på i dag → kan gjøre forbrukslån «optimalt» — men det er *ikke* rasjonelle preferanser (Laibson).

**F16 — Rentes rente**

    gjeld_T = L · (1 + r)^T

### 3.3 Regneeksempler

| # | Oppgave | Fasit på foilene | Kontroll |
|---|---|---|---|
| E22 | 1 krone til 1 % daglig rente i 10 år | «6 millioner milliarder», nok til 740 000 kr til alle i verden | 1,01^3650 = 5,93·10¹⁵ ✓; /8,1 mrd = 732 000 ✓ (2024: «nesten 10 × verdens BNP» — ca. 6 ×, upresist men i riktig størrelsesorden) |
| E23 | Nordnet 79 kr per handel × 3 600 handler (psykologiforelesningen) | 288 000 kr | **Går ikke opp:** 79 × 3 600 = 284 400. 288 000 tilsvarer 80 kr. Ubetydelig, men verdt å rette. |
| E24 | (Eget, F13) Annuitetslån 3 mill, 5 % nominell, 25 år, månedlig | — | Se seksjon 7 |

### 3.4 Argumenter

**A22 Rente er prisen på risiko.** Påstand: ulike lån har ulik rente. Mekanisme: långiver frykter mislighold; sikkerhet (pant) senker frykten. Konklusjon: sørg for at banken ser deg som lav risiko; forbrukslån er dyrt fordi det ikke har pant.

**A23 Høy rente kan være rasjonelt — for låntaker.** Påstand: payday loans til 260–1 000 % er ikke nødvendigvis irrasjonelle. Mekanisme: hvis du trenger penger nå og ikke har alternativer, er lån til enhver rente bedre enn ingen lån. Konklusjon: i Norge finnes alternativer, så argumentet holder sjelden her.

**A24 Betal høyest rente først.** Påstand: rekkefølgen er objektiv. Mekanisme: lån er flytting av penger over tid, og man vil gjøre det billigst mulig. Konklusjon: kreditt/forbruk → bil → bolig → studielån. Selvhjelpsbøkenes snøballmetode er et *atferds*-argument («quick wins»), ikke et økonomisk.

**A25 The debt puzzle og atferdsforklaringer.** Påstand: mye låneatferd er vanskelig å forsvare rasjonelt. Mekanismer: mental accounting (pensjon urørlig, lønnskonto fri), present bias (nåtid overvektes), eksponentiell vekst-bias (undervurderer rentes rente, E22), teaser-renter, lik-andel-regelen. Konklusjon: tålmodigheten som gjør pensjonssparing rasjonell er uforenlig med utålmodigheten som gjør kredittkortgjeld rasjonell (2024-formulering).

**A26 Skal renter reguleres?** Påstand: standardteori sier nei. Mekanisme: frivillig handel mellom informerte parter. Men: fattige uten alternativer og folk som ikke forstår produktet er argumenter *for*; risikable prosjekter *må* betale høy rente, ellers feilallokeres kapital. Empiri: rentetak flytter folk til enda dyrere kilder (Morgan et al 2012). Konklusjon: regler bør avhenge av lånetype.

**A27 Hvorfor staten begrenser boliglån.** Påstand: du kan ikke låne så mye du vil. Mekanisme: bankregulering er motivert av systemrisiko (frislipp → finanskriser), ikke av omsorg for den enkelte — ellers ville forbrukslånsrenter vært regulert. Konklusjon: utlånsregulering er makro-, ikke forbrukerbeskyttelse.

**A28 Fast rente er forsikring.** Påstand: «lønner det seg med fast rente?» er feil spørsmål. Mekanisme: fast rente fjerner renterisiko mot en premie (forventet høyere rente). Konklusjon: velg fast hvis du er sårbar for renteøkning — samme logikk som forsikring (seksjon 4).

**A29 Avdragsfrihet er likviditet, ikke gratis penger.** Påstand: avdragsfrihet endrer ikke lånets kostnad. Mekanisme: rentene løper uansett; du betaler bare hovedstolen senere. Konklusjon: fornuftig ved midlertidige likviditetsproblemer, ikke som «rentefritt lån» (eksamen H2024 opg 14). Forbrukslån har derimot *reelle* rentekostnader.

### 3.5 Empiri og regler

- Payday loans: 260–1 000 % årlig rente (utlandet).
- 30 % av amerikanere har kredittkortgjeld samtidig som de har andre midler. 2024-foilene: 17 % kredittkortrente mot 0 % innskuddsrente i USA 2022.
- Nordnet: 79 kr per handel.
- Studielån: slettes ved dødsfall, rentefritak ved sykdom.
- Renteregulering: USAs militære forbyr svært høy rente for ansatte; noen delstater forbyr kortsiktige høyrentelån; Morgan et al (2012) → substitusjon.
- Lån mellom land: kriseland får høyere rente (foil med graf).
- Norge: «det meste er lov» på rentesiden (Danske Bank-reklame i gjeldsartikkel brukt som illustrasjon).
- VG 02.10.2023-oppslag om avdragsfrihet vs forbrukslån.
- **Ikke i foilene, men i oppgavelisten:** boliglånsforskriften/utlånsforskriften. Gjeldende (fra 1.1.2025): maks 90 % belåningsgrad (opp fra 85 %), gjeld maks 5 × brutto årsinntekt, må tåle 3 prosentpoeng renteøkning (minst 7 %), avdrag minst 2,5 % per år ved belåningsgrad over 60 %, fleksibilitetskvote 10 % (8 % i Oslo). **Må verifiseres mot Finansdepartementet før bruk** — tallene er fra min egen kunnskap, ikke fra kildene.

### 3.6 Hva eksamen har spurt om

- **H2024 opg 14 (1 p):** avdragsfrihet er lurt ved midlertidige likviditetsproblemer; det er *ikke* et rentefritt lån, staten betaler ikke avdrag, og kostnaden er ikke uavhengig av valget (i praksis samme rentekostnad, men likviditetsverdi).
- Fast vs flytende rente og «betal høyest rente først» er naturlige flervalgsspørsmål som ennå ikke er brukt i H2024/H2025.

---

## 4. Forsikring og forventet nytte

Pensum: Døskeland kap 10 (forelesning 15). **Det finnes ingen egne foiler om forsikring i kildene** — pensjonsforelesningen viser til «forelesning om forsikring» for ugunstig utvalg, låneforelesningen definerer fast rente som forsikring, og resten må rekonstrueres fra eksamensoppgavene (H2024 opg 11, H2025 opg 12–13), som er svært detaljerte. Dette temaet er det mest underdokumenterte i kildene og bør bygges fra Døskeland kap 10 pluss sensorveiledningene.

### 4.1 Begreper

| Begrep | Definisjon slik eksamen/foilene bruker den |
|---|---|
| Nyttefunksjon U(W) | Nytte av formue. Eksamen bruker U(W) = √W; H2024-MC-testen brukte en annen (CRRA-type med c) — «samme γ som i aksjesparing». |
| Risikoaversjon | Konkav U: nytten av forventet formue er høyere enn forventet nytte av usikker formue. √W og ln W er risikoaverse. |
| Forventet nytte | E[U] = Σ pᵢ·U(Wᵢ). Beslutningsregel: velg alternativet med høyest E[U]. |
| Sikkerhetsekvivalent (CE) | Den sikre formuen som gir samme nytte som det usikre alternativet: U(CE) = E[U]. |
| Risikopremie | E[W] − CE: det en risikoavers er villig til å gi opp i forventning for å slippe risiko. |
| Aktuarisk («riktig») pris | Premie = forventet utbetaling = p · tap. Forsikringsselskapet går i null. |
| Full vs delvis dekning | Full: hele tapet erstattes. Delvis: en andel (eks. 50 %). |
| Maksimal betalingsvillighet | Premien P_max som gjør E[U] med forsikring lik E[U] uten: U(W − P_max) = E[U_uten]. |
| Lovpålagt forsikring | Ansvarsforsikring på bil er lovpålagt. Bolig- og uføreforsikring er frivillige (eksamen H2025 opg 12). |
| Pensjon som forsikring | Folketrygden forsikrer mot å leve lenge (seksjon 2). |
| Ugunstig utvalg | Frivillig livsvarig pensjon ville tiltrekke de som venter å leve lenge; tvang løser det. |
| Fast rente | Forsikring mot renteøkning (seksjon 3). |
| Valutasikring | Forsikring mot kronekurs — som man *ikke* bør kjøpe når lønnen samvarierer med kronen (A15). |

### 4.2 Formler

**F17 — Forventet nytte med og uten full forsikring**

    E[U_uten] = (1 − p)·U(W) + p·U(W − L)
    E[U_med]  = U(W − P)

W = formue, L = tap, p = sannsynlighet for tap, P = premie.

**F18 — Delvis dekning (andel α av tapet) til premie P**

    E[U_delvis] = (1 − p)·U(W − P) + p·U(W − L + αL − P)

**F19 — Aktuarisk premie**

    P_fair = p · L

**F20 — Sikkerhetsekvivalent og maks premie (full dekning)**

    CE = U⁻¹(E[U_uten]);   P_max = W − CE

Med U = √W: CE = (E[U_uten])².

**F21 — Kritisk sannsynlighet for gitt premie (full dekning, tap = hele W)**

    (1 − p*)·U(W) = U(W − P)  →  p* = 1 − U(W − P)/U(W)

**F22 — Mossins resultat (Døskeland kap 10, ikke i kildene):** til aktuarisk pris kjøper en risikoavers *full* dekning; er premien høyere enn aktuarisk, er *delvis* dekning optimalt.

### 4.3 Regneeksempler (alle kontrollregnet)

| # | Oppgave | Fasit (sensorveiledning) | Kontroll |
|---|---|---|---|
| E25 | H2025 opg 13(1): hus 9 mill, p = 1 %, U = √W, full dekning for 160 000 | Kjøp: E[U_med] = √8 840 000 > 0,99·√9 000 000 | 2 973,2 > 2 970,0 ✓ (premien er 1,78 × aktuarisk 90 000 — og likevel lønnsom) |
| E26 | H2025 opg 13(2): laveste p som gjør forsikringen verdt 160 000 | ca. 0,89 % | p* = 1 − 2 973,2/3 000 = 0,893 % ✓ |
| E27 | H2025 opg 13(3): 50 % dekning (4,5 mill) til samme premie | Nei | 0,99·√8 840 000 + 0,01·√4 340 000 = 2 964,3 < 2 970,0 ✓ |
| E28 | (Eget) H2025-tallene: CE og P_max ved full dekning | — | CE = 2 970² = 8 820 900; P_max = 179 100 (≈ 2 × aktuarisk) |
| E29 | H2024 opg 11a: mobilforsikring til aktuarisk pris | Ja, alltid for en risikoavers | Følger av konkav U (Jensen) |
| E30 | H2024 opg 11b: hvor stor andel forsikre til aktuarisk pris | 100 % | Mossin (F22) |
| E31 | H2024 opg 11c: hus 1 mill, p = 1 %, premie 25 000 | Nei: √975 000 = 987,4 < 0,99·√1 000 000 = 990 | ✓ (premien er 2,5 × aktuarisk 10 000) |
| E32 | H2024 opg 11d: maks premie | 19 900 | 990² = 980 100 → X = 19 900 ✓ (≈ 2 × aktuarisk) |

### 4.4 Argumenter

**A30 En risikoavers fullforsikrer til aktuarisk pris.** Påstand: til «riktig» pris skal alt forsikres. Mekanisme: med P = p·L er forventet formue lik med og uten forsikring; U konkav gir U(E[W]) > E[U(W)] (Jensens ulikhet), så den sikre formuen foretrekkes. Delvis dekning etterlater varians uten gevinst i forventning. Konklusjon: 100 % dekning, uavhengig av om eiendelen er liten (mobil) eller stor (hus) — og uavhengig av om U er √W eller ln W.

**A31 Med påslag i premien: regn.** Påstand: også en dyr forsikring kan lønne seg. Mekanisme: sammenlign E[U_med] og E[U_uten] direkte (E25, E31); jo mer konkav U og jo større tapet er relativt til formuen, jo mer tåler premien påslag. 160 000 for et 9-millioners hus (1,78 × aktuarisk) er verdt det; 25 000 for et 1-millions hus (2,5 ×) er det ikke. Konklusjon: maks premie ≈ 2 × aktuarisk i begge eksamenseksemplene med √W og 1 % sannsynlighet.

**A32 Halvert dekning til samme pris er dårlig.** Påstand: 50 % dekning for full premie avvises. Mekanisme: du betaler 160 000 for en forventet utbetaling på 45 000 (3,6 × aktuarisk) og sitter igjen med et 4,5-millioners tap i brannscenariet. Konklusjon: E[U] faller under «uten forsikring» (E27).

**A33 Kritisk sannsynlighet.** Påstand: for gitt premie finnes en p* der du er indifferent. Mekanisme: sett E[U_med] = E[U_uten] og løs for p (F21). Ved høyere p lønner forsikring seg. Konklusjon: p* = 0,89 % for H2025-tallene; alternativene 1,52 % og 2,01 % kan utelukkes fordi 1 % allerede gir kjøp.

**A34 Lovpålagt forsikring og systemet.** Påstand: bare ansvarsforsikring på bil er lovpålagt for privatpersoner. Mekanisme: eksternalitet — skaden rammer tredjepart. Bolig og uførhet rammer deg selv → frivillig (men anbefalt). Konklusjon: skille mellom obligatorisk (tredjepartsskade, folketrygd) og frivillig.

### 4.5 Empiri og regler

- Lovpålagt: ansvarsforsikring bil. Frivillig: bolig, uføre (H2025 opg 12).
- Folketrygden = obligatorisk livsvarig forsikring (seksjon 2).
- Fast rente = forsikring (seksjon 3).

### 4.6 Hva eksamen har spurt om

- **H2024 opg 11 (4 p):** aktuarisk pris → ja alltid; andel → 100 %; premie 25 000 på 1 mill/1 % → nei (987,4 < 990); maks premie → 19 900.
- **H2025 opg 12 (1 p):** lovpålagt = ansvarsforsikring bil.
- **H2025 opg 13 (3 p):** 160 000 på 9 mill/1 % → ja (2 973 > 2 970); kritisk p → 0,89 %; halv dekning samme pris → nei.
- Mønsteret: U = √W, p = 1 %, tap = hele formuen, premie ca. 2 × aktuarisk. Sensor godtar «prøv alternativene» som metode.

---

## 5. Finansiell psykologi (forelesning 16)

Pensum: Døskeland kap 6 og 12. Grunnlag: `Finansiell_psykologi_(2).txt` (13.10.2025), 87 foiler. Forelesningen er kvalitativ — ingen formler, ett regnestykke (Nordnet-gebyr) og mange empiriske tall.

### 5.1 Begreper

| Begrep | Slik forelesningen bruker det |
|---|---|
| Bias | Systematisk skjevhet: man bommer i én bestemt retning. Krever en benchmark — her finansteori og empiri (indeksfond, diversifisering, unngå høy lånerente, effisiente markeder, CAPM). |
| Støy (noise) | Feil uten retning. Kahneman: ansatte i et forsikringsselskap satte premie på seks saker; ledelsen ventet 10 % uenighet, funnet var ca. 50 % (én sa 700, en annen 1 250). |
| Algoritmer mot støy | Enkle modeller gir stabilere vurderinger enn magefølelse. Meehl (1950-tallet): enkle vektingsregler slår eksperter. Israelsk militær: strukturerte intervjuer slo fri samtale. Intuisjon *etter* strukturert vurdering. |
| Overkonfidens | Overvurderer egen evne til å forutsi markedet; better-than-average-effekt (93 % av amerikanere kjører bedre enn snittet; 94 % av professorer foreleser bedre enn snittet). Hovedforklaring på hyppig handel. |
| Tapsaversjon | Tap føles sterkere enn tilsvarende gevinst. Tversky & Kahneman: nytte vurderes relativt til et referansepunkt (startformue), ikke absolutt nivå. |
| Prospektteori | Verdifunksjon konkav for gevinster, konveks for tap, brattere for tap rundt referansepunktet; overvekting av lave sannsynligheter. |
| Bekreftelsesbias | Søker informasjon som bekrefter det man allerede tror. |
| Ankereffekt | Første informasjon (ankeret) veier for tungt. |
| Flokkmentalitet / herding | Følger mengden uten egen analyse; bidrar til bobler og krakk (dotcom, krypto, Norwegian 2021). |
| Mentalt regnskap | Behandler penger ulikt etter kilde/formål i stedet for som én helhet (jf. debt puzzle). |
| Tilgjengelighetsbias | Overvurderer sannsynligheten for nylige, levende eller lett tilgjengelige hendelser. |
| Manglende deltakelse | Under 50 % eier aksjer i nesten alle land. Ikke risikoaversjon: for små beløp er nesten alle nyttefunksjoner tilnærmet risikonøytrale, så den *første* aksjen er nesten gratis risiko. (Sparebehovet avhenger av hvor man er i livssyklusen.) |
| Overtrading | Odean (1999): hyppige endringer uten rasjonell grunn → lavere avkastning (gebyrer). Barber & Odean (2001): menn > kvinner. Grinblatt & Keloharju (2009, Finland): høy selvtillit → mest handel. |
| Gambling-motiv | Noen liker spenningen — motsatt av teoriens risikoaversjon; kanskje risikosøkende for små beløp, risikoavers for store. |
| Disposition effect | Selger vinnere for tidlig, beholder tapere for lenge. Strider mot teorien: bare *fremtidig* forventet avkastning skal telle, ikke kjøpskursen. Forklares med tapsaversjon (realisere tap gjør vondt). |
| Heuristikker | Menyeffekt (det øverst på listen velges); 1/N-regelen (fordeler likt på alternativene uansett hva de er). |
| Home bias | Norge er 0,2 % av verdens aksjemarked, men mange nordmenn eier bare norsk. Feil fordi humankapitalen allerede er eksponert mot AS Norge. |
| Følelser | Dårlig vær → lavere avkastning (Hirshleifer & Shumway 2003); tap i viktig fotballkamp → −0,2 % (Edmans et al 2007). |
| Økonomer vs selvhjelpsbøker (Choi) | Bøkene innser fordelen med internasjonal diversifisering, men anbefaler aldri så høy utenlandsandel som modellene; de er enige om indeksfond. |
| Financial literacy («Big 3») | Tre standardspørsmål (rente, inflasjon, diversifisering). Folk kan lite. |
| Banken som rådgiver | Interessekonflikt: nedbetaling av lån gir banken 0 produkter, aktivt fond gir 2. Bankansatte fremstår som uavhengige eksperter i media. |
| Nudging / dulting | Gjøre det lett å velge riktig uten å endre insentiver. Default-valg: automatisk pensjonssparing gir 50 % høyere sjanse for å spare (Thaler & Sunstein). |
| Kan man lære folk finans? | Blandet: vanskelig å gjøre folk generelt dyktige, lettere å gi konkrete råd i konkrete situasjoner. |

### 5.2 Formler

Ingen. (2024-utgaven av låneforelesningen hadde hyperbolsk diskontering, F15.)

### 5.3 Regneeksempler og empiriske «case»

| # | Innhold | Tall på foilene | Kontroll |
|---|---|---|---|
| E33 | Nordnet-kurtasje 79 kr × 3 600 handler | 288 000 kr | 284 400 (se E23) |
| E34 | Norwegian, januar 2021: kurs 60 kr; emisjon til 6–10 kr rundt mai 2021 | Rasjonelt: selg til 60, kjøp tilbake billig. Prisen falt ikke. Over halvparten av eierne ventet oppgang neste 12 mnd. 21 % solgte dagen etter ekspertvideo. Aksjen stupte til slutt. | Kvalitativt |
| E35 | Fondseksperiment (Haaland & Næss): ca. 590 fondskunder, halvparten fikk Forbrukerrådets funn | Indeksandel 11 % → 15 % (+4 pp, ≈ +30 %); effekten varte to år; andel som tror de kan slå markedet falt 12 % | 4/11 = 36 % — foilene sier «cirka 30 %», OK som avrunding (15/11 = 1,36) |
| E36 | Home-bias-eksperiment | Folk forsto at Norge-tung portefølje er mer risikabel, men endret ikke porteføljen | Kvalitativt |

### 5.4 Argumenter

**A35 Bias krever benchmark.** Påstand: «feil» gir bare mening mot et mål. Mekanisme: forelesningen bruker finansteori som benchmark; avvik med retning er bias, uten retning er støy. Konklusjon: fokus på bias, men støy er reelt og reduseres best med enkle regler/algoritmer.

**A36 Hvorfor både amatører og proffer taper for markedet.** Påstand: markedet er snittet, så hvordan kan «alle» tape? Mekanisme: gebyrer kommer på toppen av snittet; hyppig handel drevet av overkonfidens gjør gebyrene store (E33). Konklusjon: handle sjelden, eie indeks.

**A37 Disposition effect er irrasjonell.** Påstand: kjøpskursen er sunk cost. Mekanisme: tapsaversjon gjør det vondt å realisere tap, så folk holder tapere og selger vinnere. Konklusjon: bare fremtidig forventet avkastning skal avgjøre salg. (Merk: med norsk skatt er det faktisk skattemessig gunstig å realisere tap først — det nevnes ikke, men er en nyanse et læringsprogram bør ta med.)

**A38 Home bias dobler eksponeringen mot Norge.** Påstand: norske aksjer er feil valg for de fleste nordmenn. Mekanisme: går det bra med AS Norge, går det bra i arbeidsmarkedet ditt; går det dårlig, taper både jobb og portefølje. Globale aksjer gjør det nesten like bra uansett. (2024: svak krone → lavere humankapital, høyere kroneverdi på utenlandske aksjer — grunnlaget for A15.) Konklusjon: fond fremfor enkeltaksjer, globalt fremfor norsk. 2024-tall: nordmenn har i snitt 32 % i egen bransje og får 3 pp lavere avkastning der (Døskeland & Hvide).

**A39 Feilprising kan vare — Norwegian-caset.** Påstand: markedet skal være effisient selv om noen gjør feil. Mekanisme: rasjonelle investorer skal shorte; men tre meglerhus sa nei (én pga. volatilitet, to pga. spredt eierskap som gjorde aksjer vanskelige å låne). Feilprising kan vedvare lenge (GameStop). Konklusjon: folk gjør feil, og små aksjer kan være feilpriset lenge; store markeder er mer effisiente, «men ikke alltid».

**A40 Informasjon virker når rådet er enkelt.** Påstand: å fortelle folk at indeksfond slår aktive fond endrer atferd. Mekanisme: randomisert eksperiment (E35): +4 pp i indeks, varig i to år, og troen på egne evner faller. Bytte til billig fond er lett å forstå og gjøre. Konklusjon: konkrete, handlingsnære råd virker.

**A41 …men ikke når endringen er vanskelig eller preferansebasert.** Påstand: informasjon om diversifisering endrer sjelden porteføljer. Mekanisme: home-bias-eksperimentet — folk forsto, men handlet ikke. Tolkning: bias (50/50-heuristikk, tilgjengelighet) *eller* preferanser (tilhørighet, «eie det jeg kjenner»). Konklusjon: skille mellom bias og preferanse før man «retter» folk.

**A42 Kan man lære folk finans?** Påstand: blandet evidens. Mekanisme: Alan & Ertac (2018) — tålmodighetsundervisning ga utsatt forbruk; Bover et al (2018) — 10-timers kurs ga kunnskap i hypotetiske settinger; Fernandes et al (2014) — programmer forklarer 0,1 % av variasjonen; Haliassos et al (2020) — nabo-økonom øker aksjesparing; Skimmyhorn (2016) — obligatorisk militærkurs økte pensjonssparing; Cole et al (2016) — pensumendringer uten effekt; Bruhn et al (2013, Brasil) — mer kunnskap, men mer lån og dårligere tilbakebetaling. Konklusjon: generell finansutdanning gir lite; nudging (defaults) og konkrete råd gir mer.

**A43 Bankrådgivning er ikke uavhengig.** Påstand: spør du banken om nedbetaling vs fond, får du et skjevt svar. Mekanisme: banken tjener på produkter, ikke på at du blir gjeldfri. Konklusjon: nedbetaling av lån er undervurdert sparing i bankens råd og i media.

### 5.5 Empiri og regler

- Aksjeeierandel under 50 % i nesten alle land (2024: ca. 20 % i USA).
- Kahneman: 50 % støy vs ventet 10 %.
- 93 % / 94 % better-than-average.
- Norge = 0,2 % av verdens aksjemarked.
- Halvparten av nordmenn har aksjefond; 80 % av fondspengene i aktive fond; aktive koster ca. 5 × indeks; DN: 34 mrd kr for mye i gebyrer.
- Fondseksperiment: 590 kunder, 11 → 15 %, varig 2 år, −12 % tro på å slå markedet.
- Norwegian: 60 kr → emisjon 6–10 kr; 21 % solgte etter video.
- Default-effekt: +50 % sannsynlighet for pensjonssparing.
- Fotballtap: −0,2 %.
- 2024-kun: Lusardi & Mitchell (2007): 80 % vet hva prosent er, 18 % klarer renteregning; kvinner, eldre og minoriteter kan minst. Duflo & Saez (2002): kolleger som sparer → du sparer. Bailey et al (2018): Facebook-venner i områder med boligprisvekst → dyrere boligkjøp. Guin (2017): tysktalende Sveits sparer mer enn fransktalende. Haliassos et al (2017): innvandrere konvergerer mot vertslandets atferd. Anagol et al (2019): tilfeldig IPO-tildeling i India → mer handel og endowment-effekt.

### 5.6 Hva eksamen har spurt om

- **Ingen direkte psykologispørsmål i H2024 eller H2025** (finansdelen var Merton, forsikring, pensjon, indeksfond, lån).
- Eldre eksamener (H2019, H2021, under forrige foreleser): «beskriv overconfidence (maks 250 ord)», «hvordan påvirker tapsaversjon valget mellom bankinnskudd og aksjefond», «subjektive vs objektive sannsynligheter som bias fra forventet nytte». Med flervalgsformat er de naturlige kandidatene: definisjon av disposition effect, home bias-begrunnelsen (humankapital), hvorfor manglende deltakelse ikke skyldes risikoaversjon, nudging/defaults, og fondseksperimentets funn.
- Valutasikringsspørsmålet (H2024 opg 12c) bygger på home-bias-resonnementet (A15/A38).

---

## 6. Regnerutiner som går igjen

Dette er de regneoppsettene som er ryggraden i finansdelen. Hver rutine har et fast oppsett, en typisk felle, og de eksamensoppgavene den løser.

### R1 — Merton forlengs og baklengs
**Oppsett:** w* = (E(r) − r_f)/(γσ²). Tre av fire størrelser gitt, finn den fjerde.
**Felle:** σ² er *varians*. Får du standardavvik, kvadrer. Eksamen H2025 ga «varians 0,10» rett ut; foilene ga «standardavvik 0,2» → 0,04.
**Løser:** E1, E12; H2021 opg 6a (γ = 3, premie 5 %, σ = 14 % → w = 0,85).

### R2 — Humankapital-justering av aksjeandelen
**Oppsett:** (1) Total formue = F + H. (2) Ønsket aksjebeløp = w*·(F + H). (3) Trekk fra det H allerede «er»: 0 hvis H er sikker, H hvis β = 1. (4) Del på F for andel av finansformuen; kapp ved 0 og merk at > 100 % betyr lån.
**Felle:** Å bruke w* direkte på F. Og å glemme at «andel» kan bety andel av totalformue (sensor godtok begge lesninger i H2025 11(4)).
**Løser:** E2–E4, E13–E14; H2021/2022-oppgaven med «humankapital = implisitt bankinnskudd» i en balanse.

### R3 — To-aktiva-portefølje: forventning, standardavvik, minimum varians
**Oppsett:** E = sμ₁ + (1−s)μ₂; σ² = s²σ₁² + (1−s)²σ₂² + 2s(1−s)ρσ₁σ₂; s* = (σ₂² − ρσ₁σ₂)/(σ₁² + σ₂² − 2ρσ₁σ₂).
**Felle:** Krysleddet bruker ρσ₁σ₂ (kovarians), ikke ρ alene. Ved ρ = 1 er s* enten 0 eller 1 (velg lavest σ); ved ρ = −1 er s* = σ₂/(σ₁+σ₂), ikke 0,5.
**Løser:** E5–E9, E15.

### R4 — Kapitalmarkedslinjen og giring
**Oppsett:** Sharpe = (E(r_m) − r_f)/σ_m; E(r_p) = r_f + Sharpe·σ_p; ønsket σ_p > σ_m → lånefinansiert andel = σ_p/σ_m − 1.
**Felle:** Å tro at mer risiko = mer risikable *aksjer*. Svaret er alltid «mer av M».
**Løser:** E10; H2025 opg 15.

### R5 — Forventet nytte med og uten forsikring
**Oppsett:** (1) Skriv E[U_uten] = (1−p)U(W) + pU(W−L). (2) Skriv E[U_med] = U(W−P) (full) eller F18 (delvis). (3) Sammenlign. (4) Kritisk p: sett lik og løs. (5) Maks premie: P_max = W − (E[U_uten])² for √W.
**Felle:** Å sammenligne forventet *formue* i stedet for forventet *nytte*; å glemme at premien også betales i skadetilfellet ved delvis dekning.
**Løser:** E25–E32; H2024 opg 11, H2025 opg 13. Sensor godtar innsetting av alternativene.

### R6 — Folketrygdpensjon fra beholdning og delingstall
**Oppsett:** Beholdning = Σ 0,181·min(inntekt, 7,1 G), lønnsregulert; årlig pensjon = beholdning/delingstall. Kompensasjonsgrad = pensjon/sluttlønn.
**Felle:** Utsatt uttak → *lavere* delingstall → *høyere* årlig beløp (H2025 opg 14). Og 18,1 % gjelder bare opp til 7,1 G.
**Løser:** E16–E17, E21; H2020/H2021 opg om Hilde/Martin (500 000 i lønn i 40 år, delingstall 18,02 → 3 620 000/18,02 = 200 900 ≈ 40 % av sluttlønn).

### R7 — Annuitet, serielån, effektiv rente
**Oppsett:** A = L·r/(1 − (1+r)^(−n)); sum renter = n·A − L. Serielån: avdrag L/n + rente på restgjeld. Effektiv rente: internrenten i kontantstrømmen (utbetalt lån minus etableringsgebyr; terminbeløp pluss termingebyr). Kredittkostnad = sum av alle betalinger minus lån (uten diskontering).
**Felle:** Rente per termin må matche antall terminer (månedlig: r/12, n·12). Effektiv rente ≠ nominell + gebyrprosent.
**Løser:** E24; H2016 opg (500 000 til 12 %/3 % over 10 år → 88 492/58 615), bil-oppgaven (400 000, 4,99 %, 5 år → 92 364; med gebyr 5 990 + 1 020/år → 5,94 %). Ikke testet i H2024/H2025, men i pensum (Døskeland kap 8).

### R8 — Rentes rente og eksponentiell vekst
**Oppsett:** gjeld_T = L(1+r)^T; sparing med fast årlig innskudd S i T år: S·((1+r)^T − 1)/r.
**Felle:** Eksponentiell vekst-bias — intuisjonen undervurderer grovt (E22).
**Løser:** E22; H2021 opg 6f (36 000/år i 20 år).

---

## 7. Kontrollregning — hva som gikk opp og hva som ikke gjorde det

Alle tall er kontrollregnet i Python (se skriptene i økten). Avvik større enn avrunding er merket.

### Gikk opp (avrunding innenfor foilenes presisjon)

| Kilde | Påstand | Kontroll |
|---|---|---|
| Aksjesparing foil 13 | w = 0,04/(3·0,2²) = 0,33 | 0,3333 |
| Aksjesparing foil 15 | 2 mill → 666 000; 5 mill → 1,66 mill | 666 667; 1 666 667 |
| Aksjesparing foil 30 | 50/50: E = 1,5, σ = 1,12 | 1,118 |
| Aksjesparing foil 32 | s = 0,95: E = 1,95, σ = 0,96 | 0,955 |
| Aksjesparing foil 33 | s = 0,8: E = 1,8, σ = 0,89; minimum varians | 0,894; s* = 0,8 eksakt |
| Aksjesparing foil 56 | E(r_p) = 0,03 + (0,05/0,15)σ_p | Sharpe 0,333 |
| Pensjon foil 29 | 4 670 000/21,15 = 221 000; /17,08 = 273 000 | 220 804; 273 419 |
| Pensjon foil 20 | 7,1 G ≈ 920 000 (2025) | 924 136 med G = 130 160 |
| Pensjon foil 48 | BSU 27 500 → 2 750 | 10 % |
| Pensjon foil 7–10 | E = 3p − (1−p): 0 / 1 / 3 | ✓ |
| Lån foil 22 | 1 kr, 1 %/dag, 10 år ≈ 6 millioner milliarder ≈ 740 000 kr til alle | 5,93·10¹⁵; 732 000 per person |
| Psykologi foil 76 | 11 → 15 % «≈ 30 %» | 36 % (grov avrunding, men foilene sier «cirka») |
| Eksamen H2025 opg 11(1) | γ = 1 | ✓ |
| Eksamen H2025 opg 13 | 2 973 > 2 970; p* = 0,89 %; halv dekning 2 964 < 2 970 | ✓ alle tre |
| Eksamen H2024 opg 11 | 987,4 < 990; P_max = 19 900 | ✓ |
| Eksamen H2024 opg 12d | ρ = 1 → 100 % i A | σ = 0,200 < 0,201 < 0,231 < 0,249 |
| Eksamen H2016 | Annuitet 500 000: 12 %/10 år → 88 492 (renter 384 921); 3 %/10 år → 58 615 (renter 86 153) | ✓ eksakt |
| Eksamen (bil-oppgaven) | 400 000, 4,99 %, 5 år → 92 364; effektiv rente med gebyr → 5,94 % | ✓ eksakt; kredittkostnad 72 912 |
| Eksamen H2021 opg 6 | γ = 3, premie 5 %, σ = 14 % → w | 0,850; porteføljeavkastning 5,25 %; 36 000/år i 20 år → 1 222 537 |

### Gikk ikke opp

| Kilde | Påstand | Problem |
|---|---|---|
| Aksjesparing 2024-versjonen, foil om ρ = −1 | «Formelen … sier at denne porteføljen består av w₁ = w₂ = 0,5. Forventet avkastning 0,5·1 + 0,5·2 = 1,5» | Feil for σ₁ = 1, σ₂ = 2. Null-varians ved ρ = −1 krever w₁ = σ₂/(σ₁+σ₂) = 2/3, E = 1,67. Strøket i 2025, men 2025-foilen sier fortsatt «alle andeler mellom 0,5 og 1 kan være optimale» — burde vært 2/3 til 1. |
| Psykologi foil 23 | 79 kr × 3 600 = 288 000 | 284 400. Tilsvarer 80 kr. Ubetydelig. |
| Lån 2024-versjonen | «nesten 10 ganger så mye som hele verdens BNP» | Ca. 6 ×. Byttet ut i 2025. |
| Pensjon (4) | Regulering «lønnsvekst minus 0,75 pp» | Var regelen 2011–2021; fra 2022 gjennomsnitt av lønns- og prisvekst. Foilene sier ikke at regelen er endret. Fjernet i (5), muligens derfor. |
| Pensjon 2024-versjonen | «innskuddsbasert har mer risiko for arbeidsgiver» | Feil; rettet til arbeidstaker i 2025. |
| Pensjon, alle versjoner | «regler for de som er født etter 1963» | Alleårsregelen gjelder fullt ut for 1963-kullet *og senere* («fra og med 1963»). Eksamen H2025 skrev «født etter 1962», som er riktig. |

### Ting som mangler i kildene og må hentes utenfra

- Andel USA/Kina i globale indeksfond (bare bilde-foil; eksamen H2024 sier ~70 % USA, lite Kina).
- Annuitets- og effektiv-rente-formler (Døskeland kap 8; brukt i eksamener 2016–2022).
- Boliglåns-/utlånsforskriftens tall (i eksamener 2020–2021 med datidens regler: 5 × inntekt, +5 pp stresstest, 30-års annuitet; dagens regler er 3 pp/min 7 %, 90 % belåningsgrad, 2,5 % avdrag over 60 % — **verifiser**).
- AFP, aksjesparekonto, OTP «fra første krone».
- Forsikringsteori (Døskeland kap 10): Mossins teorem, egenandel, ugunstig utvalg, moralsk hasard.
- Forelesning 14 (Kvadsheim): ingenting.

## Opptelling

- Begreper: 1.1 (38) + 2.1 (24) + 3.1 (26) + 4.1 (13) + 5.1 (25) = **126**
- Formler: F1–F22 = **22** (hvorav 6 er supplement fra Døskeland/standardteori, merket)
- Regneeksempler: E1–E36 = **36** (28 fra foiler/eksamen H2024–H2025, 3 egne, 5 fra eldre eksamener i seksjon 7)
- Argumenter: A1–A43 = **43**
