# FIE402: prediksjon av eksamen 7. desember 2026

Skrevet 14.11.2026 som grunnlag for prøveeksamenene prove4–prove12 i appen. Eksamen lages av Andrey Kurbatov. Prosentene er skjønn, men hvert tall har en begrunnelse som kan sjekkes mot kildene.

**Oppdatert 22.11.2026** med eksamenssignalene fra alle 17 opptak (signalfilen, se kildene). Endrede tall og nye punkter er merket (22.11.2026). Der signalfilen og oppsummeringen fra 14.11. er uenige, gjelder signalfilen.

## 0. Kilder, metode og hovedfunn

**Kilder.** Forkortelsene i parentes brukes i resten av dokumentet.
- Kurbatovs eksamener med nøkler: `FIE402_Corp_course_files/2024.pdf`, `2024 - S.pdf`, `2025.pdf`, `2025 - S.pdf` (H2024 E3 = oppgave 3). `2022.pdf` (han kalte 2022 «nær»).
- Oppsummeringen fra opptaket: `7. Semester/FIE402 Corporate Finance/FIE402 Claude/Filer FIE402 Claude/Lecture 14 wrap-up eksamenssignaler fra opptaket.md` (tidsstempel i parentes, f.eks. (47:12)).
- (22.11.2026) Signalfilen: `7. Semester/FIE402 Corporate Finance/NotebookLM-kilder/FIE402 NotebookLM source exam signals from all lecture recordings.md`, kontrollert mot Panopto-tekstingen i `Forelesninger/Teksting fra Panopto/`. Henvises som (opptak 13, 17:42). Tidsstempler uten opptaksnummer er fra oppsummeringen (opptak 18).
- (22.11.2026) Våreksamenen 2024 (forrige foreleser, samme foiler): `FIE402 Claude/Gammel FIE402_Corp_course_files-kopi/2024 - S.pdf` (V2024). Ikke Kurbatovs H2024.
- Lysbildene for 2026 i samme mappe: `lecture_1.pdf`–`lecture_14.pdf` (L11 s16 = forelesning 11, lysbilde 16).
- `Problem Set 1–3` med løsninger (PS1 E3 = PS1 oppgave 3; stjerner: * tutorial, ** forelesning). PS4 er eksemplene i L12 (i appen `ps4`: Mannesmann, kontanter eller aksjer, budkamp og coinsurance).
- Arbeidskravene for 2026: `course_files_export-2/FIE402_Home_Assignment_1.docx` og `_2.docx` med `_Solutions.docx` (HA1, HA2).
- `docs/fie402-kursplan.md` (frekvens over 11 sett), `docs/fie402-forelesninger-2026.md`, `docs/fie402-proveeksamen-spek.md` og prove1–prove3 i `fag/fie402/sett.js`.

**Metode.** Utgangspunktet er Kurbatovs to sett (x/2). Det justeres for fire ting:
1. signalene i opptaket
2. hvor mye temaet er øvd i PS og HA
3. regelen om minst én oppgave per blokk
4. at 2026 ikke skal være identisk med 2025

De eldre settene (y/11 fra kursplanen) får lav vekt. De er ikke hans og M&A og governance er heller ikke representative der (1:19:49).

**Kalibrering.** Med kodingen i del 2 har H2024 12 temaer og H2025 13 (med D11 fra 22.11.2026). Summen av sannsynlighetene i del 2 er 14,30 (22.11.2026, var 13,45). Den ligger over fordi han varslet flere korte intuisjonshaler på 3–5 poeng og de trekker inn ekstra temaer (1:25:40). Han navnga dessuten i opptakene flere eksempler som mulige eksamensoppgaver enn det er plass til (signalfilen, funn 4), så summen er en øvre grense, ikke et anslag på antall temaer.

**Hovedfunn: hver regneoppgave er et forelesningseksempel eller en PS-oppgave med nye tall og én vri.** (22.11.2026) Mønsteret er bekreftet fra to kanter. V2024 gjenbrukte tre forelesningseksempler: flervalg 1 til 6 brukte Security issues-oppgaven «with the same numbers», Problem 3 var CDS-eksempelet og Problem 4 coinsurance-eksempelet «just with different numbers». Kurbatov kalte selv H2025 E6 «almost a direct copy» av Mannesmann (opptak 16, 1:26). Alle 12 oppgavene i H2024 og H2025 kan spores til et bestemt lysbilde eller en bestemt oppgave i materialet for 2026 (tabell i del 3). Teorioppgavene er lysbildelister. Forbehold: sporingen forutsetter at forelesningene var omtrent like i 2024 og 2025. HA2 E3b kan være laget etter H2025 E1. Det beste grunnlaget for 2026 er eksemplene han ennå ikke har brukt.

## 1. Formatet

| Element | Prediksjon | Sannsynlighet | Grunnlag |
|---|---|---|---|
| Tid og hjelpemidler | 3 timer, penn og papir, kalkulator og én tospråklig ordbok, formelarket som siste side | 95 % | NHH-infosiden: «3 hour closed book school exam»; begge sett 09:00–12:00; (45:09) «three or four hours»; (1:43). (22.11.2026) Kurbatov nevnte bare penn og kalkulator, mens gamle forsider tillater én tospråklig ordbok: sjekk med eksamenskontoret. Ingen normalfordelingstabell og ingen egen prøveeksamen, «Mock exam is a past exam» (opptak 18, 1:15:33) |
| Oppgaver | 6 oppgaver, 100 poeng, ingen flervalg | 95 % | (1:15:42) «exactly the same … two theoretical questions, four problems» |
| Poeng | 10/10/20/20/20/20 | 45 % (22.11.2026, var 25 %) | Teori «about 10 points each» sagt to ganger og regning «like 80 %» (opptak 18, 1:16:47, 1:25:40, 1:26:03). 10/10 og fire like regneoppgaver er den enkleste fordelingen som gir 80 % |
| | 12/12/18/18/20/20 | 30 % (var 65 %) | Begge Kurbatov-settene. Han sa også at strukturen blir «exactly the same» (opptak 18, 1:16:05), så den faller ikke helt bort |
| | annet med 10/10 og 80 % regning (f.eks. 10/10/15/20/25/20) | 25 % (var 10 %) | Han lovet store, strukturerte oppgaver framfor «18 different calculation exercises» (opptak 18, 1:24:45), men ikke like poeng |
| Rekkefølge | E1 og E2 teori | 80 % | Begge sett. Teori først er formen han kaller lik |
| | E3 til E6 i kursrekkefølge: kapitalstruktur, verdsetting, opsjoner, M&A | 45 % (22.11.2026, var 80 % samlet) | «The topics might shift across the questions» (opptak 18, 1:16:05). Ikke regn med rekkefølgen fra H2024 og H2025 |
| Blokkregel | Hver av de fire blokkene får minst én oppgave eller deloppgave | 90 % | (5:01) |
| Presisjon | «Recommended precision is 4 decimal places» i minst én oppgave | 70 % | H2025 E4; (1:23:48) |
| Hint i teksten | «(Hint: …)» i en stor deloppgave | 50 % | H2025 E6a |
| Flere perioder | Minst to oppgaver med annuitet eller voksende evigrente | 75 % (22.11.2026) | «most likely in the exam at least a couple exercises would have something involving multiple periods» (opptak 10, 29:06). Annuitetsformelen står ikke på formelarket (opptak 03, 36:24) |
| Tre stjerner | Minst én regneoppgave bygd på en ***-oppgave fra et problem set | 30 % (22.11.2026) | «Three stars is not difficult … So yes, you can [expect them]» (opptak 18, 1:21:32). Ingen av de tolv oppgavene i H2024 og H2025 var bygd på en ***-oppgave, så skjønnet er lavt |

**Hva de to teorioppgavene handler om** (22.11.2026: temaene kan bytte plass, så tabellen gjelder de to teorioppgavene samlet, ikke E1 og E2 hver for seg)

| Oppgave | Innhold | Sannsynlighet | Grunnlag |
|---|---|---|---|
| Den ene | Governance | 90 % (var 85 %) | «pretty much always» en av de to teorioppgavene (opptak 17, 2:08) |
| | M&A verbalt i stedet | 7 % | H2024 E1 var M&A; governance kan i så fall komme som hale |
| | Annet | 3 % | |
| Den andre | Kapitalstruktur verbalt: MM mot virkeligheten, ulemper ved gjeld, nødkostnader, hakkeorden (A6, A10) | 25 % (ny rad) | Han ga ferdige formater i timen (opptak 03, 11:45; opptak 04, 4:56, 10:54, 26:24, 1:31:05) |
| | Emisjon: SEO-kursfall, offentlig mot privat, IPO (A10, A11) | 20 % (var 30 %) | (47:12); opptak 07, 38:40. Ned fordi kapitalstruktur fikk egne formater |
| | Utbetaling: bruk av kontanter, prosedyren, «sugar high» (A12) | 20 % (var 25 %) | Opptak 05, 12:17, 10:06, 1:31:59 |
| | M&A-motiver (D5) | 15 % | Opptak 16, 11:39; «value creation» alene godtas ikke |
| | Opsjons- eller realopsjonsintuisjon, eksempler på realopsjoner (C3, C4) | 10 % (var 15 %) | Opptak 14, 9:19 og 50:53. Ned fordi H2025 E1 var opsjoner |
| | Annet (CAPM-bransjer, kilder til positiv NPV) | 10 % | Opptak 01, 1:03:52; opptak 08, 7:53 |

**Hvilken vinkel governance får** (22.11.2026). «So probably I will ask you something different» (opptak 17, 2:08): H2024 spurte om overvåking, H2025 om en blokkaksjonær.

| Vinkel | Sannsynlighet | Grunnlag |
|---|---|---|
| Eierens verktøykasse: tre tiltak (kontrakt, insentiver, styre) som får lederen til å handle for eierne «but not scare them too much» | 40 % | Malen han rettet live i timen (opptak 17, 1:18:44 til 1:22:27): uavhengig styre er «one of the first check marks», forbud mot A- og B-aksjer har to sider, «make shareholders vote» krever et hvordan |
| Lønn, KPI-er og kortsiktighet | 20 % | (1:11:48); ESG-lønn «much less abusable than EPS» (opptak 17, 38:23) |
| Styret: størrelse (7 til 11), uavhengighet, CEO som styreleder | 15 % | Opptak 17, 34:46 og 40:44. Brukt i H2024-nøkkelen |
| Forsvarstiltak og forskansning | 15 % | Giftpille i tall og Ford-eksempelet (opptak 17, 21:14, 1:11:16) |
| Aktivister og stemmegivning | 10 % | Brukt i H2025, derfor lavest |

**Mønsteret i E3–E6**

| Blokker i regneoppgavene (i en eller annen rekkefølge) | Sannsynlighet | Forbilde |
|---|---|---|
| Kapitalstruktur, verdsetting, realopsjon, M&A | 40 % (22.11.2026, var 45 %) | H2025 |
| Kapitalstruktur, kapitalstruktur (byråkostnader), verdsetting, realopsjon | 15 % (var 20 %) | H2024 |
| Kapitalstruktur, verdsetting, opsjoner eller kreditt, realopsjon | 20 % (var 15 %) | CDS og Google-oppgaven er varslet som regning (opptak 13, 17:42 og 1:16:02) |
| Kapitalstruktur, verdsetting, opsjoner eller kreditt, M&A | 15 % (var 10 %) | Som over; M&A med bank D eller coinsurance |
| Annet | 10 % | |

**Teorioppgavene.** De er ett avsnitt med eksplisitt setningsbudsjett og poeng per element:
- «Keep explanations short, 1-2 sentences per reason» (H2024 E1)
- «Limit your explanations to 3-4 sentences per method at most» (H2024 E2)
- «2-3 sentences per action, each action is worth 4 points» (H2025 E2)
- «4-6 sentences should typically be enough» (H2025 E1)

Forbud: «Reasons must be other than "synergies"» (H2024 E1, H2025 E6b). Oppbygging: 4 × 3, 3 × 4 eller 2 × 6 poeng. Sunn fornuft holder (1:15:42).

**Regneoppgavene.** De har 4–9 deloppgaver à 2–8 poeng (unntak: H2025 E6a på 12). Del a er lett (1:25:40). Scenarioet skiftes midt i oppgaven: «Instead of a dividend, the management is considering …» (H2024 E3) og «For the rest of the exercise, the study is not available.» (H2025 E5). Rytmer han har brukt:
- 2024: 3/3/6/3/3, 3/5/5/5, 6/3/3/2/6, 3/6/8/3
- 2025: 3/3/4/4/4, 9 × 2, 2/4/4/4/6, 12/4/4

**Verbale haler (3–5 poeng).** Typer han har brukt:
- «Are the shareholders better off or worse off?»
- «briefly explain what happens if debt increases beyond that value»
- «Will BTC management accept the project? Explain why or why not.»
- «What is your decision right now (Year 0): do you invest or wait? Briefly comment.»
- «Compare your result to the previous one and comment.»
- «Comment.» (MM)
- «how would you vote? How will the market react to the vote results?»

Nye typer han nevnte: «What if we can delay this M&A by one year?» (5:01) og «what if the option was American? Do you expect the price would go up or down?» (57:56).

**Kommer ikke:**
- Black-Scholes-regning (1:10, gjentatt 57:36, 1:18:09, 1:24:32)
- amerikanske opsjoner som regning: «Only European option will be» (opptak 18, 58:09). Bare retningen («up or down?») kan komme
- (22.11.2026) justert WACC som regning: r_U(1 − τD/V^L) ved permanent gjeld, WACC ved konstant rentedekning og D(1 − τ)-vektingen av r_U ved forhåndsbestemt gjeld. «In the exam, you will only use the formulas from the cheat sheet» og WACC-spørsmål forutsetter konstant D/E (opptak 10, 41:08 og 1:26:49); formlene er «not mandatory» (opptak 09, 1:17:06). τD og V^U(1 + τk) er tillatte snarveier i APV. De to spesialtilfellene kan komme som intuisjon (opptak 10, 1:27:46)
- (22.11.2026) skattemessige underskudd som M&A-motiv: «as soon as Ford gets transferred to Google, the losses get erased» (opptak 17, 1:14:01)
- store Excel-oppgaver (1:17:23)
- regning i governance (1:14:29)
- flervalg (45:09)

## 2. Sannsynlighet per tema

Sannsynlighet = minst én oppgave eller deloppgave om temaet.
- T = som teorioppgave eller verbal hale. R = som regning. T og R kan overlappe.
- K = treff i H2024/H2025.
- 11 = treff i 11 sett fra 2015 til H2025 (fra kursplanen, lav vekt).

### A. Kapitalstruktur, utbetaling og emisjon

| Kode | Tema | Totalt | T | R | K | 11 | Begrunnelse og kilde |
|---|---|---|---|---|---|---|---|
| A1 | Tvillingfirma, unlevering, CAPM, gjeldsbeta | 90 | · | 90 | 2/2 | 11/11 | H2024 E5a (tvilling), H2024 E3a, H2025 E4a–c (gjeldsbeta fra CAPM, r_U); L8 s12–15. Egen tvilling (annet firma): 55 %. (22.11.2026) To tvillinger som unlevers og snittes: 30 %, «Such an exercise could easily be in the exam» (opptak 09, 44:22); gjeldsbeta 0 kan bli gitt (opptak 09, 54:35) |
| A2 | MM uten skatt: rekapitalisering, kurs ved kunngjøring, antall aksjer, r_E | 70 | · | 70 | 2/2 | 11/11 | E3 i begge sett (18 p). Trekk for «not identical» (1:21:54). (20:55) «assume perfect capital markets» |
| A3 | Utbytte mot tilbakekjøp regnet under MM, utbytte finansiert med emisjon | 45 | 10 | 40 | 2/2 | 7/11 | H2024 E3c, e; H2025 E3b, d; L5 s9–13; PS1 E12–E13 |
| A4 | EPS-feilslutningen | 15 | 10 | 10 | 0/2 | · | L2 s24; PS1 E1 (*). Naturlig vri på rekap |
| A5 | Skatteskjold i kapitalstruktur: τD, kurshopp ved kunngjøring, hvem som får gevinsten | 40 | 5 | 40 | 0/2 | 3/11 | L3 s13, s16–18 (eget rekap-eksempel); PS1 E4 c–d (**); (32:11). Mest sannsynlige vri på E3 |
| A6 | Nødkostnader, brannsalg, trade-off | 40 | 25 | 20 | 0/2 | 3/11 | (27:51) «especially the fire sales should be something you focus on», med eget talleksempel; L4 s8–9; PS1 E5 (*) |
| A7 | Risikoskifting, «gambling for resurrection» | 35 | 10 | 30 | 1/2 | 5/11 | H2024 E4; PS1 E7 (*), E8 (**); HA1 E2b; (35:29). Gått i 2024. (22.11.2026, var 30) «a crucial example, probably one of the most important in this lecture» (opptak 04, 1:02:33); nøkkelordet er «wealth transfer» (opptak 06, 1:04:52) |
| A8 | Gjeldsoverheng og reforhandling | 40 | 15 | 30 | 0/2 | 5/11 | L4 s10–13; PS1 E6 (**); HA1 E2c–d; (29:19) «who wins and who loses». (22.11.2026, var 30) Navngitt kandidat; halve poengene er «the firm forgoes positive-NPV projects» (opptak 04, 44:31); «check whether the manager wants this project» (opptak 18, 29:40) |
| A9 | Myers-Majluf regnet: α, hvem utsteder, rasjonelle forventninger, sertifisering | 30 | · | 30 | 0/2 | 8/11 | Mest øvde tema uten eksamenstreff: PS1 E9, E10, E11 (**), PS2 E1 (**), HA1 E3, L6 s34–37. (22.11.2026, var 25) Signalisering er «a topic that I really like» (opptak 10, 3:07); likegyldighet i α (opptak 02, 1:25:02) |
| A10 | SEO-kursfall og hakkeorden, verbalt | 40 | 35 | 10 | 0/2 | 4/11 | (47:12) ga nesten ferdig tekst: kursfall 12 %, «potential reasons», rundt fem setninger, bedre alternativ. L6 s31–37, L4 s28, L14 s13, s15 |
| A11 | IPO: underprising, vinnerens forbannelse, kostnad for gamle eiere | 25 | 10 | 20 | 0/2 | 4/11 | L6 s17–30; PS2 E2 (*); (47:12). (22.11.2026, var 15) Vinnerens forbannelse: «this is what I will try to incorporate in the exam» (opptak 07, 1:16:51). V2024 flervalg 1 til 6 brukte forelesningens tall |
| A12 | Utbetalingspolitikk verbalt: fire måter å bruke FCF, klebrig utbytte, signal, skatt og klienteller | 35 | 35 | · | 0/2 | 7/11 | (39:07–47:02) nevnt som mulig teorioppgave; L14 s14; L5 s15–24 |

Samlet: byråkostnader ved gjeld (A6, A7 eller A8) 65 % (22.11.2026, var 60 %: overheng og «gambling for resurrection» er begge navngitt). Asymmetrisk informasjon eller emisjon (A9, A10 eller A11) 60 % (var 55 %: vinnerens forbannelse og signalisering er varslet).

### B. Verdsetting med gjeld

| Kode | Tema | Totalt | T | R | K | 11 | Begrunnelse og kilde |
|---|---|---|---|---|---|---|---|
| B1 | WACC og APV med konstant D/V, debt capacity, gjeldsjustering | 80 | · | 80 | 2/2 | 11/11 | H2024 E5, H2025 E4; L7 s21–29; PS2 E3–E4 (*); HA2 E1. Verdsettingsoppgave i noen form: 90 %. (22.11.2026, var 75) «evaluate this firm using the WACC method, evaluate it using the APV method, make sure they match and interpret» (opptak 08, 1:19:30). WACC-spørsmål forutsetter konstant D/E (opptak 10, 41:08) |
| B2 | Permanent gjeld: PV(TS) = τD som snarvei i APV; r_wacc = r_U(1 − τD/V^L) bare som intuisjon | 20 | 15 | 10 | 0/2 | · | PS2 E9 (**); L3 s13; L14 s17; (32:11). (22.11.2026, var 30) WACC-formelen er hjemmeoppgavestoff (opptak 09, 1:17:06); «Permanent debt» betyr τD med en gang (opptak 03, 44:56) |
| B3 | Konstant rentedekning: V^L = (1 + τk)V^U | 15 | 5 | 10 | 0/2 | · | PS2 E5 (**); L8 s17; L14 s17; (53:30). (22.11.2026, var 25) Formelen kan brukes direkte (opptak 10, 31:57), men WACC ved rentedekning regnes ikke |
| B4 | FTE | 15 | · | 15 | 0/2 | 1–3/11 | L8 s3–10; L14 s18; PS2 E6h (**); (48:29) FCFE-formelen |
| B5 | FCF-bygging: ΔNWC, avskrivning, sunk cost, kannibalisering, prosjekt mot firma | 30 | 10 | 25 | 0/2 | 3/11 | (6:41–14:55) åtte minutter av oppsummeringen; begge sett ga FCF ferdig; 2022 P3 |
| B6 | Rente for brøkdel av år eller måned | 40 | · | 40 | 0/2 | · | (9:42) «I would not be surprised»; L11 s16 (måned), L10 s15 (18 mnd.), L12 s21 (0,25 år) |
| B7 | Forklar r_wacc mot r_U, eller hvilken rente som hører til hvilken metode | 35 | 35 | · | 0/2 | · | (48:29–55:37); H2025 E4c («the rU doesn't take taxes into account»). (22.11.2026, var 30) «the only difference between the two is 1 minus τ» (opptak 08, 1:24:02); WACC virker bare med konstant gjeldsgrad, «the biggest takeaway» (opptak 08, 55:08) |

Samlet: annen gjeldspolitikk enn konstant D/V (B2 eller B3) 30 % (22.11.2026, var 45 %). Da kommer det som snarvei i APV (τD eller (1 + τk)V^U) eller som intuisjon. Justert WACC som regning: under 5 %.

### C. Opsjoner og realopsjoner

| Kode | Tema | Totalt | T | R | K | 11 | Begrunnelse og kilde |
|---|---|---|---|---|---|---|---|
| C1 | Binomialmodell, replikasjon og ρ for finansiell opsjon | 35 | · | 35 | 0/2 | 7/11 | HA2 E2; PS3 E1 (**), E4; L9 s10–17; (56:38) egen øvelse «S0 100, opp 120, ned 60, finn ρ». ρ i noen form, også i realopsjon: 60 % |
| C2 | Put-call-paritet, arbitrasje | 30 | 5 | 30 | 0/2 | 4/11 | (56:38) «price first the call or the put, whichever is easier»; HA2 E2b; L9 s8–9 |
| C3 | BS-intuisjon (σ, T, r, utbytte), amerikansk mot europeisk | 30 | 30 | · | 1/2 | 2/11 | H2025 E1; (1:10) «Intuition can be there»; (57:56). Hel oppgave igjen: 10 % |
| C4 | Egenkapital som call, gjeld = risikofri gjeld minus en put (D = PV(F) − P, det vil si risikofri gjeld pluss en utstedt put) | 35 | 25 | 20 | 0/2 | 8/11 | (1:01:41) «Could be in the exam where I ask you to explain why»; L10 s3–7, s11; L14 s21. (22.11.2026) «Risk-free debt minus a written put» snur fortegnet (opptak 18, 1:03:55) |
| C5 | Senior og junior gjeld fra noterte calls (Google), CDS priset med ρ | 40 | · | 40 | 0/2 | (i C4) | PS3 E6, E7 (*); L10 s8–15; (1:01:31). (22.11.2026, var 20) CDS var V2024 P3 med forelesningens tall. «A very similar example could be in the exam» (opptak 13, 17:42); Google: «So this actually could be in the exam» (opptak 13, 1:16:02) |
| C6 | Realopsjon: vente | 50 | 5 | 45 | 2/2 | 8/11 | H2024 E6; H2025 E5c; L11 s3–9 |
| C7 | Realopsjon: nedlegge eller gå ut | 30 | 5 | 30 | 1/2 | · | H2025 E5d. (22.11.2026, var 45) Han har selv skrevet en eksamensoppgave på denne premissen og sjekket at ChatGPT sammenlignet med den negative verdien (opptak 18, 1:08:19). Den er altså brukt. En variant med et lite gebyr for å gå ut kan komme (opptak 18, 1:06:47) |
| C8 | Trinnvis finansiering, vekstopsjon | 20 | 5 | 20 | (1/2) | · | L11 s10–15. Vekstopsjonen (L11 s14) var H2024 E6; trinnvis er aldri brukt |
| C9 | Verdi av informasjon (studie nå mot om ett år) | 20 | · | 20 | 1/2 | · | H2025 E5b–c; PS3 E8. Gått |
| C10 | Realopsjon med risikonøytral sannsynlighet fra et omsatt verdipapir | 30 | · | 30 | 1/2 | · | H2024 E6c (8 p); L11 s15; PS3 E10 (*) |

Samlet: realopsjon i noen form 85 %. Opsjon på firmaet eller kreditt (C4 eller C5) 55 % (22.11.2026, var 45 %: CDS og Google er varslet).

### D. M&A og governance

| Kode | Tema | Totalt | T | R | K | 11 | Begrunnelse og kilde |
|---|---|---|---|---|---|---|---|
| D1 | Dealsannsynlighet, fusjonsarbitrasje (long-short) | 45 | 5 | 40 | 1/2 | · | H2025 E6 (20 p); (1:09:30) «one of the biggest exercises that you should focus on»; L12 s20–23. Ny form: T ≠ 1 år (L12 s21 bruker 0,25), kontantbud eller implisitte synergier |
| D2 | Aksjebytte: NPV for partene, maks bytteforhold, implisitte synergier | 30 | · | 30 | 0/2 | 8/11 | Formlene står på formelarket i begge sett uten å være brukt; L12 s16–18 |
| D3 | Kontanter mot aksjer, budgivning (bank D) | 35 | 10 | 30 | 0/2 | · | (1:09:30); L12 s15, s24–26; PS4 E2–E3. (22.11.2026, var 20) Budkampen om bank D: «it could be easily the exam question» (opptak 16, 1:26:04) |
| D4 | Coinsurance og risikoreduksjon | 35 | · | 35 | (1/2) | 1/11 | L12 s27–28; PS4 E4; H2024 E4d bruker samme logikk. (22.11.2026, var 10) «a crucial example with very simple numbers … It's like a hint from me» (opptak 16, 1:30:58 og 1:31:43). V2024 P4 var dette eksempelet med nye tall |
| D5 | M&A-motiver utenom synergier, fiendtlige oppkjøp, hvem som vinner | 55 | 55 | · | 2/2 | · | H2024 E1; H2025 E6b; (1:09:30) grunner utover synergier, kostnader som bedriftskultur |
| D6 | Governance: styret og overvåking | 35 | 35 | · | 2/2 | 5/11 | H2024 E2; H2025-nøkkelen («make the board more independent»); L13 s4–5; L14 s24. (22.11.2026, var 45) Ny vinkel ventes; styret kommer heller som ett av tiltakene i D11. Størrelse 7 til 11 (opptak 17, 34:46) |
| D7 | Aksjonærtiltak, aktivister, stemmegivning og stemmerådgivere | 25 | 25 | · | 2/2 | · | H2025 E2; L13 s8–9. (22.11.2026, var 40) Brukt i 2025. Han varslet en annen vinkel (opptak 17, 2:08) |
| D8 | Lønn, KPI-er og kortsiktighet | 40 | 40 | · | 0/2 | · | (1:11:48) KPI-er gjør lederen kortsiktig (tilbakekjøp for å nå EPS-mål); L13 s6–7. (22.11.2026, var 35) Kontrakt og insentiver er kjernen i eiermalen (opptak 17, 1:18:44); gullfallskjerm kan oppmuntre til risiko i FoU (opptak 17, 16:18) |
| D9 | Forsvarstiltak og forskansning | 20 | 20 | · | 0/2 | · | L12 s29; L13 s15 |
| D10 | Aksjonærer mot interessenter | 10 | 10 | · | 0/2 | · | L1 s31–32; L13 s2 |
| D11 | (22.11.2026) Eierens verktøykasse: velg tre tiltak som får lederen til å handle for eierne uten å skremme ham | 40 | 40 | · | (1/2) | · | Malen han rettet live (opptak 17, 1:18:44 til 1:22:27). H2025 E2 (blokkaksjonærens tiltak) er nærmeste forløper, men eiermalen er bredere: kontrakt, styre, åpenhet og stemmegivning |

Samlet: governance som teori 90 % (22.11.2026, var 85 %). M&A med regning 65 % (var 60 %: bank D og coinsurance er varslet). M&A i noen form 85 %.

**Under 5 %:** Black-Scholes-tall, amerikanske opsjoner regnet, justert WACC regnet (22.11.2026), konvertible lån regnet, leasing, durasjon, auksjoner, utbyttegrad og nederlandske auksjoner ved tilbakekjøp (opptak 05, 26:13 og 41:54).

## 3. Rotasjonsanalyse

### Hvor H2024 og H2025 kom fra

| Oppgave | Tema | Kilden han bygde på | Vri |
|---|---|---|---|
| H2024 E1 | M&A-motiver, ikke synergier | L12 s4, s11 | fire roller: positivt og negativt for kjøper og mål |
| H2024 E2 | To måter å overvåke CEO | L13 s4–5, s8 | hvem og hvilke verktøy |
| H2024 E3 | MM: ny gjeld innfrir gammel, resten som utbytte; risikabel gjeld; tilbakekjøp | PS1 E3 (Mercer, **) og L5 s13 (likningssystemet ved tilbakekjøp) | tilbakekjøp som alternativ |
| H2024 E4 | Risikoskifting med tre prosjekter, sikring med motsatte tilstander | PS1 E7 (Zymase, *) | gjeldsnivået som gir likegyldighet; sikring overfører verdi til kreditorene |
| H2024 E5 | Tvilling, r_U, r_E, WACC, V^L, APV | L8 s15 (β_E 1,5, τ 40 %) og L7 s23–29 | gjeld fra WACC brukt i APV |
| H2024 E6 | Vente, ρ fra en annuitet når renten endres | L11 s14–15 (patent, r_f 5 % eller 10 %) | ferje over 10 år |
| H2025 E1 | BS-intuisjon: implisitt mot sann volatilitet | PS3 E3; HA2 E3b | handlingsråd: selg opsjonen |
| H2025 E2 | Tre tiltak for en eier med 5–10 % | L13 s8; L1 s30 | «Bonus for creativity» |
| H2025 E3 | MM: evigrente, utbytte, rekap til D/V = 0,5, tre aksjonærer sammenlignet | L5 s9–13 og PS1 E4 (delen uten skatt) | solgt, beholdt og opprinnelig |
| H2025 E4 | WACC og APV over to år, 9 × 2 p | L7 s21–28; PS2 E3–E4 (*) | gjeldsjustering i år 1 |
| H2025 E5 | Butikk: studie nå og om ett år, exit etter 2 år, likegyldig X | L11 s16 (månedlig i forelesningen, årlig på eksamen) og PS3 E8 | X som spredning |
| H2025 E6 | Dealsannsynlighet, motiv, avstemning | L12 s20–21 (nøkkelen: «We will follow the Mannesmann example») | T = 1 år, 5 B-aksjer per A-aksje |

### Gått (kommer bare igjen i ny form)
- **MM uten skatt med utbytte** (2/2). Ny form: med skatt (L3 s16–18), EPS-feilslutning, utbytte finansiert med emisjon (PS1 E12), betaversjonen (HA1 E1) eller arbitrasjebeviset (PS1 E2).
- **WACC og APV med konstant D/V og gjeld fra WACC** (2/2). Ny form: de to andre gjeldspolitikkene i L14 s17, FCF-bygging eller finansieringen av debt capacity (L7 s22).
- **Realopsjon med renteannuitet og ρ** (L11 s14–15) og **butikk med exit** (L11 s16). Ny form: trinnvis finansiering (L11 s10–12), venteeksempel 1 (L11 s5), oljefeltet (PS3 E10) eller søksmålstreet (PS3 E9). (22.11.2026) Nedleggingen er bekreftet brukt: Kurbatov skrev H2025 E5(d) selv (opptak 18, 1:08:19). Exit med månedsrente eller et lite gebyr er fortsatt mulig, men ikke det mest sannsynlige.
- **Mannesmann med T = 1 og aksjebytte.** Ny form: T = 0,25 som i L12 s21, kontantbud, implisitte synergier eller utsettelse i ett år.
- **Risikoskifting med tre prosjekter** (PS1 E7). Ny form: gjeldsoverheng (PS1 E6, L4 s11), brannsalg (27:51) eller spin-off (PS1 E8).
- **BS-intuisjon som hel oppgave.** Ny form: hale om amerikansk opsjon (bare retningen), om gjeld som put eller «what if σ is very low?» etter en realopsjon (opptak 14, 46:24).
- **Governance:** overvåkingskanaler (2024) og blokkaksjonærens tiltak (2025). Ny form: lønn og KPI, styrets sammensetning, forskansning, stemmerådgivere eller interessenter.

### På tur (ubrukte kilder med sterkest signal)
Rangert på nytt 22.11.2026. Eksempler han selv har kalt mulige eksamensoppgaver, står først.
1. CDS med ρ som misligholdssannsynlighet (L10 s9 og s10): V2024 P3 og «a very similar example could be in the exam» (opptak 13, 17:42). Fellen: ρ og 1 − ρ forvekslet; mer enn halvparten tapte poeng (opptak 13, 27:31).
2. Coinsurance (L12 s27 og s28; PS4 E4): «a hint from me» og V2024 P4 med nye tall.
3. Budkampen om bank D (L12 s24 til s26; PS4 E3): «it could be easily the exam question».
4. Google senior og junior gjeld (PS3 E6): «could be in the exam».
5. Gjeldsoverheng finansiert med ny egenkapital (L4 s11 til s13; PS1 E6) og «gambling for resurrection» (L4), med nøkkelordene «the firm forgoes positive-NPV projects» og «wealth transfer».
6. Governance som eierens verktøykasse (opptak 17, 1:18:44).
7. Vinnerens forbannelse regnet (L6; opptak 07, 1:16:51) og signalisering eller sertifisering (PS2 E1).
8. WACC og APV med to tvillinger som snittes, med tolkning av hvorfor de stemmer (opptak 09, 44:22; opptak 08, 1:19:30).
9. SEO-kursfall på 12 % som teori (47:12) og fire måter å bruke kontanter (39:07).
10. Skatt i rekapitalisering med τD (L3 s16 til s18; PS1 E4 c og d) og brannsalg med hans eget tall (27:51).
11. Rente for brøkdel av år i realopsjon eller M&A (9:42) og Mannesmann-varianter, for eksempel selvfinansiert arbitrasje (opptak 16, 1:14:18) eller «delay by one year» (5:01).
12. Gjeld som risikofri gjeld minus en put, D = PV(F) − P (1:01:41).

Ikke på tur som regning: permanent gjeld (PS2 E9) og rentedekning (PS2 E5) med justert WACC. De er hjemmeoppgavestoff (opptak 09, 1:17:06). τD og (1 + τk)V^U kan brukes i APV.

**-oppgaver (gjennomgått i timen) som ikke er brukt: PS1 E4 (skattedelen), E6, E8, E11; PS2 E1, E5, E6, E9; PS3 E1. Brukt: PS1 E3 (H2024 E3). Stjernene sier ikke noe om vanskelighet (1:21:26). (22.11.2026) ***-oppgavene kan også komme: «Three stars is not difficult … So yes, you can [expect them]» (opptak 18, 1:21:32). PS2 E5(d) og E9 er likevel ikke eksamensstoff som WACC-regning.

## 4. Vanskelighetsgrad og fellemønstre

### Nivå og tid
- Han ønsker en eksamen som er «balanced and predictable» (1:22:46). Del a er lett (1:25:40). «Anything solvable in several lines» kan komme (1:17:23).
- A-grensen har ligget rundt 90–91 av 100 (1:20:31). Rundt ti poeng i trekk koster A. Én bom på en stor konstruksjonsdel er nok.
- Eksamen gir 1,8 minutter per poeng. Tidspresset ligger ikke i aritmetikken, men i delene der studenten må konstruere noe selv:

| Del | Poeng | Hva må konstrueres |
|---|---|---|
| H2025 E6a | 12 | long-short-strategien og sikkerhetsekvivalenten 100 × 1,03 |
| H2024 E6c | 8 | et omsatt verdipapir (11-års annuitet) for å finne ρ |
| H2024 E5a og e | 6 + 6 | unlevering av tvillingen; APV med gjeld fra WACC |
| H2025 E5e | 6 | likegyldighetslikningen i X |
| H2024 E3c | 6 | at utbyttet veier opp kursfallet |
| H2024 E4c | 5 | stykkevis sjekk av gjeldsområdet (D ≤ 16 gir D = 22,5 og forkastes) |

- Kjeder: H2025 E4 er ni ledd à 2 poeng der hvert ledd bygger på det forrige. Følgefeil gir full uttelling (1:15:23), men avrundingsdrift gir trekk.
- Teorioppgavene tar tid hvis studenten skriver for mye. Setningsbudsjettet er en øvre grense.

### Trekk (fra nøklene og opptaket)
1. **Sikkerhetsekvivalent:** «the certainty equivalent is 100*1.03 = 103» og «very important to not just plug 100» (H2025 E6a).
2. **Avrunding:** «A precision error of ~0.001 is reasonable, but ~0.05 would be too much» (H2025 E4). Bruk fire desimaler, men ikke cent når tallene er i milliarder (1:23:48).
3. **Prosjekt mot firma, PV mot NPV:** «if it says evaluate the project, I want the NPV of the project, not the firm» (6:41, 52:08).
4. **Glemt ΔNWC:** «one of the biggest fallacies would be forgetting the delta» (10:23).
5. **Renter trukket fra i FCF** (48:29).
6. **Exit sammenlignet med den negative verdien i stedet for 0:** «ChatGPT made this mistake» (1:04:32). H2025 E5d: «we don't want to get -10000 in perpetuity».
7. **MM-feil:** kursreaksjon ved kunngjøring uten skatt (H2024 E3b: «Since we live in an MM world, there is no immediate price reaction»), eller glemt at utbyttet veier opp kursfallet (H2024 E3c).
8. **Feil gjeldsområde i risikoskifting** (H2024 E4c).
9. **Feil rente:**
   - r_U med skatt (H2025 E4c)
   - PV(TS) ved konstant D/V diskontert med noe annet enn r_U (H2025 E4h)
   - reelle sannsynligheter med r_f når risikoen er priset (H2025 E5 og PS3 E8 sier eksplisitt at risikoen ikke er systematisk)
10. **Synergier som svar når de er forbudt** (H2024 E1, H2025 E6b).
11. (22.11.2026) **ρ og 1 − ρ forvekslet i CDS-prisen:** «They confused 1 − ρ and ρ» (opptak 13, 27:31).
12. (22.11.2026) **Tilbakekjøp delt på gammel kurs:** «the biggest mistake that people make» (opptak 05, 1:09:12; opptak 03, 1:00:59).
13. (22.11.2026) **D/E mot D/V og τ mot 1 − τ:** «one of the ways I managed to catch quite a number of people» (opptak 09, 51:10); «they mix τ and 1 − τ» (opptak 01, 24:21).
14. (22.11.2026) **Skattemessige underskudd som M&A-motiv** og «value creation» uten mekanisme (opptak 17, 1:14:01; opptak 16, 11:39).

### Godtas
- **Romslig vurdering av teorisvar:**
  - «any reasonable explanation is accepted» (H2024 E1)
  - «As long as there are at least two groups described in enough detail, full points should be awarded» (H2024 E2)
  - «(Bonus for creativity) Exit the firm by selling your shares» (H2025 E2)
- **Minimumssvar:**
  - «(This is the minimal accepted answer)» (H2025 E6c)
  - «just mentioning losing Year 1 CF is enough» (H2025 E5c)
  - «Comment: anything reasonable about MM» (H2025 E3e)
- **Figurer og trær er frivillige:** «the graph is not necessary to earn maximum points» (H2024 E4c). Trær gir ikke poeng i seg selv (1:25:07).
- **Flere veier er godkjent:**
  - «There are many possible ways to construct a long-short strategy» (H2025 E6a)
  - «This exercise can be solved in many ways» (H2024 E6c)
  - «Can solve directly or through betas» (H2025 E4c)
- **Nøklene har egne skrivefeil** (H2024 E6b: «NPV0 = 0.7953/1.05 = -1.3949» for 7 %-tilfellet). Sensor leser intensjonen.

### Slik ser et A-svar ut
- Én linje metode, formelen med tall, svaret med enhet og én setning tolkning. Nøklene skriver muntlig: «Let's compare NPVs», «Since we live in an MM world, after all».
- Navngi antakelsen og mekanismen: «MM world», «wealth transfer from shareholders to debtholders», «excessive risk-taking», «empire building». (22.11.2026) Sensorene ser etter nøkkelord: «wealth transfer» (opptak 06, 1:04:52), «the firm forgoes positive-NPV projects» (rundt halve poengene i overheng, opptak 04, 44:31), «invest the cash if there are good investment opportunities» (vilkåret gir eget poeng, opptak 05, 14:43). «Value creation» alene godtas ikke som M&A-motiv.
- Ta med en sjekk der det finnes en: WACC = APV (H2025 E4i), kursen uendret ved tilbakekjøp (H2024 E3e), summen av gevinstene = NPV.
- Teori: akkurat så mange punkter som spørres om, hvert med mekanisme og konsekvens, innenfor setningsbudsjettet.

**A mot B.** B-svaret regner riktig på de små leddene, men gjør minst én av disse feilene:
- mister en konstruksjonsdel (long-short, annuitet eller likegyldighetslikning)
- setter inn 100 i stedet for 103
- gir firmaets verdi når prosjektets NPV spørres om
- lister stikkord uten mekanisme i teorioppgaven

A-svaret har alle konstruksjonsdelene og holder fire desimaler gjennom kjeden.

## 5. Plan for prove4–prove12

**Felles for alle ni:**
- 180 minutter og poengfordeling 12/12/18/18/20/20. Appens kontroll forutsetter den og 10/10/20/20/20/20 trener det samme.
- E1 og E2 er teori med setningsbudsjett og poeng per punkt. E3–E6 er regning i kursrekkefølge.
- Del a er lett.
- Minst én konstruksjonsdel på 8–12 poeng per sett.
- Verbal hale (v) på 3–5 poeng i minst tre regneoppgaver.
- Fire desimaler og ingen BS-regning.
- Hver regneoppgave bygges på kilden som står oppgitt, med nye tall og den oppgitte vrien.
- Ingen scenarioer fra H2024, H2025, prove1–3 eller HA1–HA2.

Rytme = poeng per deloppgave.

**Rettet 22.11.2026 etter signalfilen.** Settene beholder 12/12/18/18/20/20 (de trener det samme som 10/10/20/20/20/20). Disse delene er byttet ut eller rettet:
- prove9 E4c og E4d: r_E og WACC med permanent gjeld og unlevering med D(1 − τ)-vekter er byttet med fondets NPV og hvem som får skatteskjoldet (c) og r_U fra to tvillinger med konstant D/E (d), samme poeng.
- prove10 E4e: WACC-metoden ved permanent gjeld er byttet med kursen ved kunngjøring og tilbakekjøpet (Kurbatovs største tilbakekjøpsfeil).
- prove3 E4d og prove4 E3d: r_E fra utbytte og kurs står, men MM II med (1 − τ) og r_U(1 − τD/V^L) er bare nevnt som hjemmeoppgavestoff.
- prove2 E1: skattemessige underskudd er byttet med svak ledelse (disiplinerende oppkjøp). prove5 E1: lik skattesats på utbytte og gevinst, fordelen ved tilbakekjøp er utsettelsen; styrestørrelse 7 til 11 i E2.
- Nøkkelordene «wealth transfer», «the firm forgoes positive-NPV projects», «invest if there are good investment opportunities» og at «value creation» alene ikke godtas, er lagt inn i kriteriene der de passer (prove2, prove5, prove6, prove7, prove9, H2024, H2025). CDS- og coinsurance-signalene står i V2024.

### Runde 1: hovedprediksjonen

**prove4: det mest sannsynlige settet** (emisjon, KPI, skatt, prosjektverdsetting, exit, Mannesmann)

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | Security issues: SEO-kursfall | 8 + 4 | Kunngjort SEO, kursen faller 12 %: mulige grunner (rundt fem setninger); deretter et bedre alternativ og hvorfor | (47:12) nesten ordrett; L6 s31–37; L4 s28 |
| E2 (12) | Governance: KPI og kortsiktighet | 4/4/4 | CEO-bonus mot EPS-mål, tilbakekjøp i fjerde kvartal og kutt i FoU: navngi problemet, to tiltak, én svakhet | (1:11:48); L13 s6–7, s17 |
| E3 (18) | Capital Structure med skatt | 3/3/4/4/4 | EK-finansiert firma med evig EBIT: V^U og kurs; permanent gjeld til tilbakekjøp: PV(TS) = τD og kurs ved kunngjøring; antall aksjer; r_E etter (MM II med skatt); (v) hvorfor ikke 100 % gjeld, med brannsalg | L3 s16–18; PS1 E4 c–d; (27:51). Vri mot prove3 E4: r_E med skatt og brannsalg i stedet for sannsynlighet × kostnad |
| E4 (18) | Valuation with leverage: prosjekt | 3/3/2/4/4/2 | FCF år 1–3 fra EBIT med ΔNWC og frigjøring til slutt; r_U fra tvilling med overskuddskasse (netto gjeld); r_E og WACC; prosjektets NPV, ikke firmaets; debt capacity og APV; (v) hvorfor r_wacc < r_U | L7 s17–29; PS2 E3–E4, E7; (6:41–14:55, 48:29) |
| E5 (20) | Real Options: exit med månedsrente | 2/4/4/4/6 | Butikk med månedlige strømmer: månedsrente og NPV uten exit; NPV med rett til å gå ut etter 24 måneder (sammenlign med 0); verdien av exit-retten; høyeste exit-gebyr du godtar; sannsynligheten for god tilstand som gir likegyldighet | L11 s16 (månedsversjonen); H2025 E5 (type); (1:04:32). Vri: måned, gebyr, likegyldig p |
| E6 (20) | M&A: dealsannsynlighet | 3/9/4/4 | Aksjebytte med utfall om 3 måneder: budverdi og spread; markedets p med (1 + r_f)^0,25 og long-short; synergiene markedet priser inn; (v) «What if the deal is delayed by one year?» | L12 s20–23; PS4 E1; (1:09:30, 5:01) |

**prove5: kjernen, trekning 2** (utbetaling, styret, EPS, rentedekning, vente, aksjebytte)

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | Payout policy: fire måter | 3/3/3/3 | Utbytte, tilbakekjøp, holde kontanter, reinvestere: én fordel og én risiko hver (klebrig utbytte, signal, imperiebygging) | (39:07–47:02); L14 s14; L5 s19–24 |
| E2 (12) | Governance: styret | 4/4/4 | Tre svakheter (innsidere og grå, CEO som styreleder, forskjøvet valg eller travle medlemmer): hvorfor de svekker overvåkingen og hva aksjonærene kan gjøre | L13 s5, s17; L14 s24 |
| E3 (18) | Capital Structure uten skatt | 3/3/4/4/4 | r_E, kurs, EPS og P/E; rekap med risikofri gjeld: β_E og r_E; EPS og P/E etter: skaper EPS-økningen verdi?; alternativt et ekstra utbytte finansiert med nye aksjer: antall aksjer og kurs; (v) vis at de opprinnelige eierne står likt | PS1 E1 (Yerba), PS1 E12 (Nilpoj); L2 s24; L5 s9–12 |
| E4 (18) | Valuation: konstant rentedekning | 3/3/3/3/3/3 | V^U som voksende evigrente; V^L = (1 + τk)V^U; gjelden fra rentene; D/V, r_wacc og V^L med WACC (sjekk); FCFE og E med FTE (sjekk E = V^L − D); (v) hvorfor r_wacc < r_U | PS2 E5 (Tybo, **); PS2 E6h; L8 s17; L14 s17–18 |
| E5 (20) | Real Options: vente og trinn | 3/8/4/5 | Produksjonsenhet med pris i dag og opp eller ned neste år, ikke-systematisk risiko: NPV nå; NPV ved å vente og verdien av ventingen; (v) større spredning med samme forventning; trinnvis finansiering mot alt på én gang | L11 s5, s10–12; PS3 E8c |
| E6 (20) | M&A: aksjebytte og betaling | 4/4/4/4/4 | NPV for A og B med formelarket; maks bytteforhold; kontantbud: NPV_A = S − (P − T) og hvem som bærer synergirisikoen; A tror egen aksje er overpriset: valg og hva markedet leser; (v) B har risikabel gjeld: hva skjer med Bs kreditorer | L12 s14–18, s24–25, s27; PS4 E2; formelarket |

**prove6: H2024-formen** (to kapitalstrukturoppgaver)

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | M&A: hvem vinner | 3/3/3/3 | To grunner til at kjøpere i snitt tjener rundt 1 % (overbetaling, imperiebygging, EPS-manipulasjon) og to grunner til at et fiendtlig oppkjøp kan øke verdien; ikke synergier | L12 s4, s11–12; L1 s29 |
| E2 (12) | Governance: stemmegivning | 6/6 | Institusjon med små poster i mange selskaper følger en stemmerådgiver: er det optimalt? Ett alternativt tiltak med mekanisme og svakhet | L13 s8–9; lesestoffet (Broadridge, Microsoft) |
| E3 (18) | Capital Structure: beta | 3/3/4/4/4 | Uten skatt, risikofri gjeld, nedgiring med emisjon: β_U og r_U; ny β_E; ny r_E; WACC før og etter; (v) kollegaens påstand «lavere r_E gir lavere verdi» | HA1 E1 (type); L2 s21–23 |
| E4 (18) | Debt and risk: brannsalg og risikoskifting | 3/4/4/4/3 | Hans struktur med nye tall (gjeld 30, eiendeler 80 eller 15): D og E uten nødkostnader; med brannsalg (konkurs gir halvparten): verdier og hvem som taper; trygt mot risikabelt prosjekt; byråkostnaden; (v) hvem betaler til slutt | (27:51–35:29); L4 s8–9, s15–20; PS1 E7; HA1 E2b |
| E5 (20) | Valuation: tvilling med vekst | 4/3/3/3/3/4 | Tvillingen gir r_U; r_E og WACC ved konstant D/E; V^L som voksende evigrente; gjeld og PV(TS) med r_U; APV = WACC; β-sjekk | PS2 E6 a–g; L8 s14–15; H2024 E5 (type). Vri: vekst og gjeldsbeta ≠ 0 |
| E6 (20) | Real Options: oljefelt | 2/3/4/8/3 | To utvinningsmetoder, pris opp eller ned 20 %: verdi i dag; tre og verdi per metode; beste metode per tilstand; nåverdi med ρ; (v) verdien av å vente og hvorfor reelle sannsynligheter ikke trengs | PS3 E10 (*) |

### Runde 2: rotasjonen

**prove7: firmaet som opsjon og informasjon**

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | Options: intuisjon | 4/4/4 | Amerikansk mot europeisk call og put; hvorfor risikabel gjeld er risikofri gjeld minus en put; hva skjer med E og D når eiendelenes volatilitet øker | (57:56, 1:01:41); L10 s4–7, s16 |
| E2 (12) | Governance: forskansning | 4/4/4 | Forskjøvet styrevalg, krav om kvalifisert flertall og avveiningen «for sterk overvåking gjør lederen passiv» | L13 s5, s15, s18; L12 s29 |
| E3 (18) | Security issues: Myers-Majluf ved SEO | 3/3/4/4/4 | To typer, prosjekt med sikker avkastning: α når investorene ikke skiller typene; utbetaling per type; likevekt og kursfall ved kunngjøring i prosent; sikker gjeld i stedet; (v) bedre alternativ | L6 s33–37; PS1 E11; HA1 E3. Vri: regn kursfallet |
| E4 (18) | Valuation: finansiering av debt capacity | 3/3/4/4/4 | Netto gjeld i vektene; WACC og prosjektverdi; debt capacity per år; finansiering med kasse og ny gjeld, overskuddet utbetalt, EK-gevinst = NPV; (v) APV og hvorfor den gir samme svar | L7 s17–22, s27–28; PS2 E3–E4 |
| E5 (20) | Options: senior og junior gjeld | 3/4/8/5 | EK = antall aksjer × midtkurs på call; D og rente over 18 måneder; senior og junior: verdier og renter; (v) junior som differansen mellom to calls og hva høyere volatilitet gjør | PS3 E6 (Google, *); L10 s12–15 |
| E6 (20) | M&A: kontanter, aksjer og budkamp | 4/4/4/4/4 | NPV ved kontantbud; NPV ved aksjebytte; valg når kjøperen tror aksjen er overpriset; reservasjonspris når en rival kan vinne; (v) hvorfor målselskapet tjener mest | PS4 E2–E3; L12 s15–18, s24–26 |

**prove8: kapitalbudsjett og konkurs**

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | Security issues: IPO | 4/4/4 | Vinnerens forbannelse forklart; to andre teorier for underprising; hvorfor svak avkastning på lang sikt | L6 s17–30 |
| E2 (12) | Governance: aksjonærer eller interessenter | 6/6 | Ett argument for hver side (Friedman, «too many missions») og hva valget betyr for hvordan styret vurderer CEO | L1 s31–32; L13 s2 |
| E3 (18) | Capital Structure: konkurskostnader | 3/3/4/4/4 | Fire like sannsynlige verdier, konkurskostnad i prosent: V^U; D med pålydende F; YTM mot forventet avkastning; E, V^L og kursfall ved rekap; (v) hvem bærer kostnaden og avveiningen mot skatteskjoldet | PS1 E5 (Gladstone, *); tutorial 1 s4–7; L4 s8, s15, s24 |
| E4 (18) | Valuation: kapitalbudsjett | 4/3/3/4/4 | Lager som brukes fra år 2 mot utleie nå, sunk cost, kannibalisering, ΔNWC med frigjøring: FCF; diskonteringsrente; NPV i år 0 med alternativkostnaden; diskontering over 1,5 år; (v) prosjekt mot firma | (6:41–14:55, 9:42); L14 s4; L7 s17–18 |
| E5 (20) | Real Options: trinnvis | 3/5/5/3/4 | Alt på én gang; to trinn; verdien av trinnene; mer informativt første trinn; (v) reversibel investering og timing | L11 s10–12; PS3 E9d |
| E6 (20) | M&A: coinsurance | 3/8/5/4 | A og B med gjeld, ingen synergier: frittstående D og E; sammenslått D og E; hvem vinner og taper og om diversifisering er et gyldig motiv; (v) EPS etter aksjebytte med ulik P/E: skaper det verdi? | L12 s4, s27–28; PS4 E4 |

**prove9: gjeldspolitikk og firmaet i et binomialtre**

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | Payout policy: kutt utbytte, kjøp tilbake | 4/4/4 | Under MM; signal (klebrig utbytte, GM, tilbakekjøp som tegn på undervurdering); skatt og klienteller | (39:07–47:02); L5 s15, s18, s22–24 |
| E2 (12) | Governance: aktivisme | 4/4/4 | Kampanje og proxy contest: stegene, kostnaden og gratispassasjerproblemet | L13 s8; L1 s30 |
| E3 (18) | Debt and risk: gjeldsoverheng | 2/4/4/4/4 | D og E i dag; prosjekt finansiert med ny EK (andel x): eierne avslår; hvem tjener; nytt pålydende så begge vinner og summen = NPV; (v) «gambling for resurrection» og hvem som betaler | L4 s10–13, s17; PS1 E6 (**); (29:19, 35:29) |
| E4 (18) | Valuation: permanent gjeld | 2/4/4/4/4 | V^U; APV med τD; (22.11.2026) fondets NPV og hvem som får skatteskjoldet; r_U fra to tvillinger med konstant D/E; (v) hvorfor PV(TS) er mindre verdt ved konstant D/V | PS2 E9 (**) som type uten WACC-formelen; L3 s13; opptak 09, 44:22 |
| E5 (20) | Options: eiendelene i et binomialtre | 3/8/5/4 | ρ; EK som call ved replikasjon, D = V − E og som risikofri gjeld minus put med paritet; kredittspread og risikonøytral misligholdssannsynlighet; (v) hvorfor eierne vil øke risikoen | 2022 P4; L9 s10–16; L10 s3–11; HA2 E2 |
| E6 (20) | Real Options: vente med konkurrent | 3/5/4/4/4 | NPV nå; NPV ved å vente; verdien av å vente; sannsynligheten for at en konkurrent kommer inn som gjør deg likegyldig; (v) hvis retten varte to år | L11 s3–5, s9; PS3 E9 b–c; (57:56) |

### Runde 3: bredden

**prove10**

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | M&A: kontanter eller aksjer | 3/3/3/3 | Fire hensyn: likviditet og gjeldskapasitet, informasjonsasymmetri, usikre synergier, selgers skatt og exit | L12 s24–25 |
| E2 (12) | Governance: interessentmål i lønn | 6/6 | Fordel og risiko ved ESG-mål i CEO-kontrakten | L1 s31; L13 s2, s6–7; (1:11:48) |
| E3 (18) | Security issues: IPO regnet | 3/3/4/4/4 | Proveny etter 5,3 % honorar og 1,7 % andre kostnader; markedsverdi etter første dag; rettferdig pris og kostnaden for gamle eiere; avkastning for uinformerte investorer; (v) prisen som gjør dem likegyldige | PS2 E2 (*); L6 s13, s24–27 |
| E4 (18) | Valuation: tre gjeldspolitikker | 2/3/3/3/4/3 | Samme firma: V^U; V^L med konstant D/V (WACC); med permanent gjeld (τD); med rentedekning ((1 + τk)V^U); (22.11.2026) kurs ved kunngjøring og tilbakekjøp for permanent gjeld; (v) hvilken gir høyest verdi og hvorfor | L14 s17; L8 s16 til s18; L3 s16 til s18 |
| E5 (20) | Options: obligasjoner og CDS | 3/4/4/5/4 | Pris på risikofri og risikabel obligasjon; forventet avkastning mot yield; risikonøytral misligholdssannsynlighet; CDS-pris og sjekk D + CDS = PV(K); (v) put-call-paritet som MM | L10 s8–11 |
| E6 (20) | M&A: kontantbud | 4/8/4/4 | NPV for partene; dealsannsynlighet over 6 måneder fra målets kurs; synergier fra kjøperens kursreaksjon; (v) utsettelse i ett år | L12 s15, s21–22; PS4 E1; (5:01) |

**prove11**

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | Capital structure: tre påstander | 4/4/4 | «Tilbakekjøp øker EPS og skaper verdi», «sikring øker verdien», «gjeld er billigere enn EK»: vurder under MM og si hvilken friksjon som kan gjøre påstanden sann | L2 s17–24; L14 s8; L3 s14–15 |
| E2 (12) | Governance: andre overvåkere | 4/4/4 | Långivere (covenants), ansatte og myndigheter (SOX), markedet for selskapskontroll | L13 s4, s17; L1 s30; L12 s11 |
| E3 (18) | Asymmetric information: tilbakekjøp | 3/3/4/4/4 | Kurs før; kurs etter tilbakekjøp ved god og dårlig nyhet; tilbakekjøp etter nyheten; hva ledelsen velger; (v) hva markedet leser og om forventningen er rasjonell | PS1 E10; PS2 E1; L5 s24 |
| E4 (18) | Valuation: full verdsetting | 9 × 2 | FCF tre år med lagerreduksjon; tvillingens β_U; WACC; V^L med terminalverdi; D_t og gjeldsjustering; V^U; PV(TS); APV | 2022 P3 (Shakespeare); L7 s17–29; H2025 E4 (rytme) |
| E5 (20) | Real Options: søksmålstreet | 3/5/5/4/3 | NPV nå; NPV ved å vente; p som gir likegyldighet; reversibel investering; (v) volatilitet og venting | PS3 E9 |
| E6 (20) | M&A: avstemning | 4/8/4/4 | Aksjebytte over 6 måneder: budverdi; markedets p; avstemning blant kjøperens eiere og kursreaksjonen; (v) hva kursene etter avstemningen sier om p | L12 s20–22; H2025 E6c (type) |

**prove12**

| Oppg. | Tema | Rytme | Innhold | Kilde og vri |
|---|---|---|---|---|
| E1 (12) | Options: BS-intuisjon | 3/3/3/3 | Call og put: høyere σ, lengre T, høyere r_f, varslet utbytte; ingen regning | L9 s19–22; PS3 E3; (1:10) |
| E2 (12) | Governance: fiendtlig bud | 4/4/4 | Giftpille, hvit ridder, greenmail: hvem tjener på hvert tiltak | L12 s11, s29; L13 s15 |
| E3 (18) | Capital Structure: arbitrasjebeviset | 3/3/4/4/4 | To like firmaer, ett med gjeld: kontantstrøm til eierne; D og E; investor som kjøper all EK i B mot A til gitte priser; arbitrasjestrategi (hjemmelaget gjeld); (v) teoremet og forutsetningene | PS1 E2; L2 s12–14 |
| E4 (18) | Debt and risk: spin-off | 3/4/4/4/3 | D og E i dag; hvilken del som får gjelden; D etter; eiernes netto gevinst mot tapte synergier; (v) covenants som «necessary evil» | PS1 E8 (Hillton, **); L4 s18, s20 |
| E5 (20) | Valuation: voksende gjeld og FTE | 3/3/3/3/2/2/4 | V^U; renter; PV(TS) med r_U; V^L og E; r_wacc baklengs; r_E og β-sjekk; FCFE og E med FTE | PS2 E6 (AMC, **) |
| E6 (20) | Real Options: utvidelsesopsjon | 3/6/8/3 | NPV av utvidelse nå; NPV per tilstand i år 1; ρ fra et omsatt verdipapir; (v) opsjonsverdi og beslutning | L11 s13–15; H2024 E6 (rytme). Vri: prisusikkerhet i stedet for renteusikkerhet |

### Blokkmønster i planen
- Kapitalstruktur, verdsetting, realopsjon, M&A: prove4, prove5, prove8 og prove11. Det er 4 av 9, mot 45 % i prediksjonen.
- To kapitalstrukturoppgaver, verdsetting, realopsjon: prove6 og prove12. Det er 2 av 9, mot 20 %.
- Opsjoner eller kreditt i stedet for realopsjon eller M&A: prove7, prove9 og prove10. Det er 3 av 9, mot 25 %.
- Realopsjon med regning er med i 7 av 9, M&A med regning i 6 av 9 og governance i alle ni.

## 6. Dekningsmatrise

- Kodene er fra del 2. P er sannsynligheten og x betyr at temaet har en oppgave eller deloppgave.
- prove1–3 og H2024/H2025 er kodet fra innholdet i `sett.js` og nøklene.
- Alle temaer har minst to treff.
- Korrelasjonen mellom P og antall treff i prove4–12 er 0,70 (22.11.2026, var 0,72). P er justert etter signalfilen, mens settene bare er rettet, ikke skrevet om. Svakest dekket målt mot P er C5 (CDS og Google, 40 %, 2 treff), A8 (overheng, 40 %, 2 treff) og D4 (coinsurance, 35 %, 3 treff).
- (22.11.2026) Nye treff etter rettingene: A5 i prove9 (hvem som får skatteskjoldet) og prove10 (kurs ved kunngjøring). D11 er kodet for H2025 E2, prove1 E2, prove4 E2 og prove5 E2.

| Kode | P % | H24 | H25 | p1 | p2 | p3 | p4 | p5 | p6 | p7 | p8 | p9 | p10 | p11 | p12 | Sum |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A1 | 90 | x | x | x | x | x | x |  | x |  |  | x |  | x | x | 10 |
| A2 | 70 | x | x | x | x |  | x | x | x |  |  |  |  | x | x | 9 |
| A3 | 45 | x | x | x | x |  |  | x |  |  |  | x |  | x |  | 7 |
| A4 | 15 |  |  |  |  |  |  | x |  |  | x |  |  | x |  | 3 |
| A5 | 40 |  |  |  |  | x | x |  |  |  | x | x | x |  |  | 5 |
| A6 | 40 |  |  |  |  | x | x |  | x |  | x |  |  |  |  | 4 |
| A7 | 35 | x |  |  | x |  |  |  | x |  |  | x |  |  | x | 5 |
| A8 | 40 |  |  |  | x |  |  |  |  |  |  | x |  |  |  | 2 |
| A9 | 30 |  |  |  |  | x |  |  |  | x |  |  |  | x |  | 3 |
| A10 | 40 |  |  |  |  | x | x |  |  | x |  |  |  |  |  | 3 |
| A11 | 25 |  |  |  |  |  |  |  |  |  | x |  | x |  |  | 2 |
| A12 | 35 |  |  |  |  | x |  | x |  |  |  | x |  |  |  | 3 |
| B1 | 80 | x | x | x | x | x | x |  | x | x |  |  | x | x | x | 11 |
| B2 | 20 |  |  |  |  | x |  |  |  |  |  | x | x |  |  | 3 |
| B3 | 15 |  |  |  |  |  |  | x |  |  |  |  | x |  |  | 2 |
| B4 | 15 |  |  |  |  |  |  | x |  |  |  |  |  |  | x | 2 |
| B5 | 30 |  |  |  |  |  | x |  |  |  | x |  |  | x |  | 3 |
| B6 | 40 |  |  |  |  |  | x |  |  | x | x |  | x |  |  | 4 |
| B7 | 35 |  |  |  |  |  | x | x |  |  |  | x |  |  |  | 3 |
| C1 | 35 | x |  |  |  | x |  |  | x |  |  | x |  |  |  | 4 |
| C2 | 30 |  |  |  |  | x |  |  |  |  |  | x | x |  |  | 3 |
| C3 | 30 |  | x | x |  |  |  |  |  | x |  | x |  |  | x | 5 |
| C4 | 35 |  |  |  |  | x |  |  |  | x |  | x | x |  |  | 4 |
| C5 | 40 |  |  |  |  |  |  |  |  | x |  |  | x |  |  | 2 |
| C6 | 50 | x | x |  | x |  |  | x | x |  |  | x |  | x |  | 7 |
| C7 | 30 |  | x | x |  |  | x |  |  |  | x |  |  | x |  | 5 |
| C8 | 20 |  |  |  |  |  |  | x |  |  | x |  |  |  | x | 3 |
| C9 | 20 |  | x | x |  |  |  |  |  |  |  |  |  |  |  | 2 |
| C10 | 30 | x |  |  | x |  |  |  | x |  |  |  |  |  | x | 4 |
| D1 | 45 |  | x |  |  |  | x |  |  |  |  |  | x | x |  | 4 |
| D2 | 30 |  |  | x |  |  | x | x |  |  | x |  | x |  |  | 5 |
| D3 | 35 |  |  |  |  |  |  | x |  | x |  |  | x |  |  | 3 |
| D4 | 35 | x |  |  |  |  |  | x |  |  | x |  |  |  |  | 3 |
| D5 | 55 | x | x | x | x |  |  |  | x | x | x |  |  | x | x | 9 |
| D6 | 35 | x | x | x |  |  |  | x |  |  |  |  |  | x |  | 5 |
| D7 | 25 | x | x | x |  | x |  |  | x |  |  | x |  | x |  | 7 |
| D8 | 40 |  |  |  | x |  | x |  |  |  |  |  | x |  |  | 3 |
| D9 | 20 |  |  |  |  | x |  |  |  | x |  |  |  |  | x | 3 |
| D10 | 10 |  |  |  |  |  |  |  |  |  | x |  | x |  |  | 2 |
| D11 | 40 |  | x | x |  |  | x | x |  |  |  |  |  |  |  | 4 |

Antall temaer per sett: H2024 12, H2025 13, prove1 12, prove2 10, prove3 13, prove4 14, prove5 14, prove6 10, prove7 10, prove8 12, prove9 14, prove10 14, prove11 13, prove12 10.
