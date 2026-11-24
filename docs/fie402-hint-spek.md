# FIE402: «Hintet i forelesning» (24. november 2026)

Magnus ba om en egen del i Eksamenssett med **bare oppgaver Kurbatov pekte ut i forelesning
som mulige eksamensoppgaver**. Kildene er Panopto-tekstingen av de 17 opptakene høsten 2026.
Kurbatov bygger hver eksamensoppgave på et eget forelesningseksempel eller en problem
set-oppgave med nye tall og én vri (`docs/fie402-prediksjon.md`). Disse oppgavene gjør det
samme: de tar eksemplet han pekte på, gir det ny historie og nye tall og stiller det i
eksamensform.

Settene er `kind: "del"` med `art: "hint"`, bygges med samme løype som deleksamenene og vises
i en egen fane «Hintet i forelesning». Hodene står i `fag/fie402/_del/sett.json` (ikke endre).

## Les før du skriver

1. **`docs/fie402-deleksamen-spek.md`, hele.** Alt der gjelder: dataformat, `merke`,
   svar-data, regler, kontroll før levering. Unntak: «Mest forventet» og formen fra H2024 og
   H2025 gjelder ikke her. Formen kommer fra forelesningseksemplet.
2. Det den viser videre til: `docs/fie402-proveeksamen-spek.md` (særlig «Lessons from the blind
   review» og «Signals from all lecture recordings»), `docs/fie402-forfatterspek.md`,
   `docs/fie402-svar-spek.md` og `docs/fie402-ov-spek.md` § 6b.
3. **Forelesningsstedet for hver av oppgavene dine.** Tekstingen ligger i
   `../7. Semester/FIE402 Corporate Finance/Forelesninger/Teksting fra Panopto/`, én fil per
   opptak (`FIE402 NN …txt`). Les fra noen minutter før tidsstempelet til eksemplet er ferdig.
   Tekstingen er maskinlaget: tall kan være feilhørt, så regn eksemplet selv. Bekreft at sitatet
   i merket står der (ordrett nok til at Magnus kjenner det igjen).
4. Formelarket: `FIE402_Corp_course_files/Formula sheet.docx` (det som står i appen). Bare de
   formlene og det som står under «Ikke på arket, må kunnes» i hjernenotatet om FIE402.

## Ikke gjenbruk

Ingen scenario, firmanavn eller tall fra forelesningseksemplet selv, H2024, H2025, V2024,
eldre eksamener, prove1–prove12, Home Assignment 1–2, Problem Set 1–4, «Øv uten stopp»
(`fag/fie402/_ov/*.py`) eller deleksamenene (`fag/fie402/_del/s1`–`s4`). Søk etter firmanavnet
og hovedtallene dine i de filene før du leverer. Formen skal være forelesningens, tallene dine.

## Settene

Poeng: teorioppgaver 10, regneoppgaver 20 (Kurbatovs 2026-format: to teorioppgaver på rundt 10
poeng, regneoppgaver på rundt 20). Teorioppgavene står først i hvert sett. Tid 1,8 min per poeng.

| Sett | n | p | Skribent | Oppgave | Forelesning (tidsstempel) |
|---|---|---|---|---|---|
| hint1-1 | 1 | 10 | H1 | Beta: hva den måler, to bransjer med høy, to med lav og én nær 1, med begrunnelse | 01 Review (1:03:43) |
| | 2 | 10 | H1 | Hvor kommer positive NPV-prosjekter fra? Tre kilder, to setninger hver | 08 Valuation I (7:53 til 15:00) |
| | 3 | 20 | H1 | Prosjektverdsetting med fellene han advarte mot: firmatall er gitt, men prosjektet skal verdsettes; sunk cost; kannibalisering eller sidevirkning; alternativkostnad; ΔNWC med frigjøring; avskrivning lagt tilbake; en kontantstrøm som krever rente for brøkdel av år; NPV, ikke PV. Siste ledd: NPV mot IRR mot et mindre prosjekt der de er uenige. Forklar hvorfor | 18 Wrap-up (5:56 til 15:05, 52:08), 01 (12:24, 17:31, 44:08), 08 (4:03) |
| | 4 | 20 | H1 | WACC og APV på samme prosjekt: to sammenlignbare firmaer gir r<sub>U</sub> (snitt), D/V oppgis (må gjøres om til D/E), gjeldsbeta null, konstant D/V, gjeldskapasitet, PV(TS) med r<sub>U</sub>, vis at metodene gir samme svar, sammenlign r<sub>wacc</sub> med r<sub>U</sub> og tolk | 09 Valuation II (8:09, 44:22, 50:58, 54:51), 08 (1:19:40, 1:24:02) |
| hint2-1 | 1 | 10 | H2 | Hvordan skiller MM-verden seg fra virkeligheten? Minst tre eksempler, 1 til 2 setninger hver. «Usikkerhet» alene gir ikke poeng | 03 Capital Structure II (11:45) |
| | 2 | 10 | H2 | Et selskap kunngjør en SEO og kursen faller 12 %. Mulige grunner, signalet og et bedre alternativ | 18 Wrap-up (48:05) |
| | 3 | 20 | H2 | Winner's curse i IPO-er: uinformerte og informerte investorer, tildeling ved overtegning, uinformertes avkastning ved en gitt pris, break-even-prisen, intuisjonen bak underprisingen. Vri lov: sannsynligheter som ikke er 50/50 | 07 Security Issues (1:05:12 til 1:26:00) |
| | 4 | 20 | H2 | Gjeldsoverheng med tall: et prosjekt med positiv NPV finansiert med ny egenkapital; vil lederen (som eier egenkapitalen), aksjonærene og kreditorene ha det; formuesoverføring; reforhandling av pålydende som får alle med; nøkkelsetningen | 04 Capital Structure III (33:44 til 49:46, 44:13), 06 PS1 (55:52 til 1:15:48), 18 (29:07) |
| hint2-2 | 1 | 10 | H2 | Fire måter å bruke fri kontantstrøm på, rangert med begrunnelse. «Investere» gir poeng bare med forbeholdet om gode prosjekter (modent selskap mot vekstselskap) | 05 Payout (12:12), 18 (39:15) |
| | 2 | 10 | H2 | Kostnader ved financial distress: én direkte og én indirekte, 3 til 4 setninger hver. Forklar hvorfor de indirekte betyr mest. Eventuelt hva som kan skje når firmaet ikke betjener gjelden | 04 (4:56, 10:54, 26:24, 29:37) |
| | 3 | 20 | H2 | Del a: PV av rentenes skatteskjold på et lån med annuitet (bare renter, ikke avdraget). Deretter gjeldsfinansiert tilbakekjøp: ny kurs ved kunngjøring, antall aksjer kjøpt tilbake (to likninger), sammenlign de som selger med de som blir. Siste ledd: vis med tall at tilbakekjøp og utbytte gir aksjonærene det samme i MM uten skatt | 03 (32:56, 38:13, 1:00:49, 1:05:35), 05 (1:08:38, 1:14:10) |
| | 4 | 20 | H2 | Gambling for resurrection med konkurskostnad: firma med eiendeler i god og dårlig tilstand, gjeld, bare en andel av eiendelene gjenvinnes ved konkurs (brannsalg); D og E; en risikabel strategi med negativ NPV; vil lederen ta den; del verdiendringen i overføring og effektivitetstap; hvem bærer konkurskostnaden på forhånd; ett tiltak kreditorene kan bruke | 04 (51:56, 55:46 til 1:06:17, 1:12:21), 18 (28:00, 35:39) |
| hint2-3 | 1 | 10 | H1 | Én fordel og én kostnad ved å være børsnotert og ved å være privat, kort | 07 Security Issues (38:30) |
| | 2 | 20 | H1 | Signalisering og sertifisering: to typer markedet ikke kan skille, pooling-pris, emisjon for å finansiere en utgift, test av separerende likevekt (vil dårlig type avvike?) og hva en god type maksimalt vil betale for en sertifisering som avslører typen | 10 PS2 (2:56, 4:41 til 21:11) |
| | 3 | 20 | H1 | Replikering: gründerens prosjekt med utbetaling i to tilstander, markedsportefølje og risikofritt aktivum; verdien ved replikering; finansiering med gjeld mot egenkapital i perfekt marked; finn sannsynligheten α der gründeren er indifferent eller i break-even | 02 Capital Structure I (8:16, 33:54 til 38:09) |
| hint3-1 | 1 | 10 | H4 | Opsjonsintuisjon uten Black-Scholes-regning: hva skjer med call og put når volatiliteten øker og når løpetiden øker; hvorfor en amerikansk call er verdt minst like mye som en europeisk; hvorfor eiere av et belånt firma kan like mer risiko | 18 (1:20, 57:45, 58:05), 12 Options I (1:23:41), 13 (1:16:22) |
| | 2 | 10 | H4 | Governance: to typer overvåking av ledelsen, 2 til 3 setninger hver, i en ny vignett | 17 Governance (1:55 til 2:26, 26:30 til 29:13) |
| | 3 | 20 | H3 | Dealsannsynlighet ved aksjebytte: kurser før ryktene og nå, bytteforhold, r<sub>f</sub>, T som brøkdel av år; arbitrasjeposisjonen; verdiene ved suksess og fiasko; implisitt sannsynlighet med (1 + r<sub>f</sub>)<sup>T</sup>; antakelsen om at kursene går tilbake. Siste ledd (verbalt): hva om gjennomføringen utsettes ett år? | 16 M&A (1:26, 1:02:41 til 1:23:00), 18 (5:29, 1:11:04) |
| | 4 | 20 | H3 | CDS: risikabel obligasjon med pris, pålydende og gjenvinning, r<sub>f</sub>; risikonøytral misligholdssannsynlighet ρ; CDS-pris per 1 i pålydende; antall kontrakter som gjør obligasjonen risikofri; lovet mot forventet avkastning; hvorfor ρ er høyere enn den oppgitte reelle sannsynligheten | 13 Options II (17:42 til 40:06) |
| hint3-2 | 1 | 10 | H4 | Grunner til fusjoner uten å nevne synergier: tre grunner, minst én ineffektiv, forklar mekanismen («value creation» alene gir ikke poeng) | 16 M&A (7:04 til 15:21), 18 (1:10:05) |
| | 2 | 10 | H4 | Du er eier i et selskap: velg tre ting i kontrakt og overvåking av lederen og utdyp hver i rundt tre setninger, med ulempen ved hver | 17 Governance (1:18:44, 1:22:05) |
| | 3 | 20 | H4 | Vente eller investere: et prosjekt som produserer fra t = 0 (si det tydelig), prisen neste år opp eller ned med sannsynlighet X; NPV nå, NPV ved å vente (dårlig tilstand sammenlignes med 0), beslutning, X som gir indifferens (begge NPV-ene avhenger av X), intuisjon | 14 Options III (16:58 til 30:40) |
| | 4 | 20 | H4 | Senior og junior gjeld fra noterte calls: nullkupongobligasjoner, call-priser (bid og ask) ved to innløsningskurser per aksje, antall aksjer; verdien av senior, junior og egenkapital; yield på hver, annualisert riktig; siste ledd: hvorfor er gjeld det samme som risikofri gjeld minus en put? Hva skjer med junior og senior når volatiliteten øker | 13 Options II (48:57 til 1:16:02), 18 (1:04:27) |
| hint3-3 | 1 | 10 | H3 | Realopsjoner verbalt: tre eksempler på en opsjon til å vente fra ulike områder, hva det koster å vente og hvordan volatiliteten i sammenlignbare firmaer endrer valget mellom å investere nå og å vente | 14 Options III (8:49, 31:08, 40:42, 46:24) |
| | 2 | 20 | H3 | Opsjonen til å avvikle: et prosjekt med god tilstand for alltid og dårlig tilstand med negative kontantstrømmer; NPV uten exit; NPV med exit etter N perioder (sammenlign med 0); verdien av exit-opsjonen; månedsrente der kontantstrømmene er månedlige | 18 (1:06:01 til 1:09:30), 14 (1:18:28) |
| | 3 | 20 | H3 | Budkamp med alternativer: et mål med verdi og synergi, flere budgivere som taper ulikt mye hvis de ikke vinner; maksbud, hvem vinner, prisen. Deretter fusjon av to belånte firmaer uten synergi: D og E før og etter, formuesoverføringen og hvorfor aksjonærene kan være imot | 16 M&A (1:26:04 til 1:31:43) |

Kolonnen «Oppgave» sier hva eksemplet i forelesningen inneholdt. Du velger deloppgavene, men
hold deg til eksemplets mekanisme. Én vri er lov, ikke mer.

## Merket

`merke` er ren norsk tekst som sier hvor hintet kom, på formen

    Forelesning 16 (M&A), 1:26:04: «could be easily the exam question»

Bruk opptaksnummeret og tittelen fra filnavnet og et kort sitat fra tekstingen der han sier at
dette kan komme. Sitatet navngir ikke mekanismen oppgaven spør etter (skriv ikke «debt
overhang» i merket til gjeldsoverheng-oppgaven). Har han sagt det flere steder, velg det
sterkeste.

## Filer

Skribent `<S>` er `h1`, `h2`, `h3` eller `h4` og eier bare
`fag/fie402/_del/<S>_regn.py`, `<S>.json` og `<S>_svar.json`, i formatet fra
deleksamen-spesifikasjonen. Nøklene er `"<settId>:<n>:<etikett>"`. To skribenter deler hint3-1:
H4 skriver oppgave 1 og 2, H3 oppgave 3 og 4.

## Kontroll før levering

1. `python3 -I fag/fie402/_del/<S>_regn.py` uten feil, med `assert` på alle sjekkene.
2. `python3 tools/flett-del.py fie402` viser ingen `FEIL` for dine oppgaver. Feil om at andre
   skribenters oppgaver mangler, kan du se bort fra.
3. Hvert tall i svar-dataene står i løsningsteksten, eller er merket `regnet: true` med
   `merknad`.

Etterpå løses hvert sett blindt av en uavhengig kontrollør (`--blind`). Funnene rettes før
settene flettes inn.
