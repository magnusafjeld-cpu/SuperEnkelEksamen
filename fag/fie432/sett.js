/* ===================== FIE432 · TIDLIGERE EKSAMENSSETT =====================
   Ordrett gjengitt oppgavetekst med egne, fullstendige løsninger. Kjøres av
   modulen /sett (js/bundle-sett.js) i øvingsmodus eller på tid.

   Det første settet er flervalgstesten til kursgodkjenning 2026, de andre er
   eksamener. H2022–H2025 er rene flervalg. H2016–H2021 er fra før
   flervalgsformatet: åpne oppgaver med selvvurdering, og H2019 og H2020 har
   noen flervalgsledd i tillegg. Ingen av settene hadde minuspoeng, men eksamen
   høsten 2026 har det. Slå det på i eksamensmodus for å trene riktige forhold.

   id-ene er lagringsnøkler for svar og selvvurdering. De må aldri endres.
   ========================================================================= */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.sets = [
/* Flervalgstesten til kursgodkjenning 2026. Løsningene er skrevet ut fra
   referansesvaret i emnemappen (FIE432 Referansesvar MC-test kursgodkjenning 2026.pdf). */
{
    "id": "mc2026",
    "label": "Flervalgstesten 2026 (kursgodkjenning)",
    "date": "2026-10-01",
    "minutes": 60,
    "points": 20,
    "format": "20 flervalg · fire eller fem alternativer · 17 av 20 riktige for godkjenning",
    "note": "Flervalgstesten til kursgodkjenning høsten 2026: 20 spørsmål à ett poeng. 17 riktige kreves. Tre av spørsmålene er nesten ordrett hentet fra eksamen (spørsmål 6 fra H2019, 9 fra H2022 og 17 fra H2019), så testen viser hva foreleserne gjenbruker. Spørsmål 2 bruker inntektsskiftingslikningen slik den undervises i 2026. Den eldre likningen fra H2020 gir et fellealternativ. Løsningene er skrevet ut fra kursmaterialet. Kurset deler ikke ut fasit.",
    "facts": [
      "Kursgodkjenning: 17 av 20 riktige, tre forsøk. Samarbeid er lov, men testen tas individuelt.",
      "Ingen minuspoeng. Spørsmålene har fire alternativer, unntatt spørsmål 2 med fem.",
      "Spørsmål 4 har et sjette, tomt alternativ i originalen. Det er tatt ut her.",
      "Løsningene er laget med KI ut fra forelesningene for 2026 og eksamensfasitene. Kurset har ikke kontrollert dem."
    ],
    "practiceNote": "Les ordene «kan», «alltid» og «alle tre» nøye. «Kan» krever ett tilfelle der påstanden holder, «alltid» faller på ett moteksempel. «Alle tre» er riktig bare når hver påstand holder for seg.",
    "mc": {
      "wrongFactor": 0
    },
    "exercises": [
      {
        "n": 1,
        "title": "Skjerming over to år",
        "points": 1,
        "topic": "Aksjonærmodellen",
        "chapters": [
          5
        ],
        "body": "<p>Anette eier en aksje i selskapet ABC som hun kjøpte for kr 100 i desember i år 0. Hun sitter med aksjen i 2 år og selger den før utbytte i år 3. I både år 1 og år 2 mottar hun utbytte fra selskapet på kr 4. Skjermingsrenten er 4 % i år 1 og 2 % i år 2. Hva er skattepliktig utbytte i år 2? I både år 1 og år 2 er aksjekursen kr 120.</p>",
        "options": [
          "Kr 4",
          "Kr 2",
          "Kr 0",
          "Kr 3"
        ],
        "answer": 1,
        "solution": "<p><b>Regelen.</b> Skattepliktig utbytte = utbytte − skjermingsfradrag. Fradraget er skjermingsgrunnlaget (kostpris pluss ubenyttet skjerming fra før) ganget med årets skjermingsrente. «Skattepliktig utbytte» er beløpet før oppjustering, slik kursets skjermingstabeller bruker ordet.</p><table class=\"data\"><tr><th>År</th><th>Utbytte</th><th>Grunnlag</th><th>Rente</th><th>Skjerming</th><th>Skattepliktig</th><th>Ubenyttet</th></tr><tr><td>1</td><td class=\"n\">4</td><td class=\"n\">100</td><td class=\"n\">4 %</td><td class=\"n\">4</td><td class=\"n\">0</td><td class=\"n\">0</td></tr><tr><td>2</td><td class=\"n\">4</td><td class=\"n\">100</td><td class=\"n\">2 %</td><td class=\"n\">2</td><td class=\"n\"><b>2</b></td><td class=\"n\">0</td></tr></table><p>I år 1 spiser skjermingen hele utbyttet, men det blir ingenting igjen å framføre. I år 2 er skjermingen 100 × 2 % = 2, så 4 − 2 = <b>2</b> er skattepliktig.</p><p><b>Kursen 120 er støy.</b> Grunnlaget er kostpris, ikke markedsverdi. «Aksjekursen 31.12» var et galt alternativ på eksamen H2019.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Kr 4: skjermingen i år 2 er glemt.</li><li>Kr 0: krever 4 i skjerming i år 2, for eksempel 4 % også i år 2 eller skjerming fra år 0.</li><li>Kr 3: trolig oppjusteringsfellen. 2 × 1,44 = 2,88 og 2 × 1,4 = 2,8 med eldre faktorer. Oppgaven oppgir ingen faktor.</li></ul><p><b>Forutsetning.</b> Kjøpet i desember gir formelt rett til skjerming også i år 0, men oppgaven gir rente bare for år 1 og 2. Kursets fasiter regner da fra år 1 (H2021 oppgave 1a og H2022 oppgave 1).</p>"
      },
      {
        "n": 2,
        "title": "Inntektsskiftingslikningen",
        "points": 1,
        "topic": "Aksjonærmodellen",
        "chapters": [
          5
        ],
        "body": "<p>Inntektsskiftingsligningen. Regjeringen vil at marginalskatten på lønn inkludert arbeidsgiveravgiften skal være lik skatt på selskapet pluss eierskatten. Anta at den marginale skattesatsen på arbeid er 47 %, arbeidsgiveravgiften, som betales av arbeidstaker, er 13 % og eierskatten er 20 %. Regjeringen har vedtatt å løsrive selskapsskatten fra den alminnelige skattesatsen og endre satsen bedriftene betaler fra 22 % til 20 %. Hva blir oppjusteringssatsen og hva blir effektiv nominell eierskatt med de nye reglene?</p>",
        "options": [
          "Oppjusteringssats = 2 og effektiv nominell eierskatt = 40 %",
          "Oppjusteringssats = 2,1 og effektiv nominell eierskatt = 42 %",
          "Oppjusteringssats = 1,6 og effektiv nominell eierskatt = 32 %",
          "Oppjusteringssats = 1,40 og effektiv nominell eierskatt = 28 %",
          "Oppjusteringssats = 1,8 og effektiv nominell eierskatt = 36 %"
        ],
        "answer": 0,
        "solution": "<p><b>Regelen (forelesning 5, 2026).</b> Kurset legger de nominelle satsene sammen: høyeste marginalskatt på lønn + arbeidsgiveravgiften arbeidstakeren bærer = nominell selskapsskatt + nominell eierskatt × y. Med dagens satser: 47,4 % + 12,4 % = 22 % + 22 % × y, som gir y ≈ 1,72.</p><p><b>Med oppgavens tall.</b> 47 % + 13 % = 20 % + 20 % × y, så y = (60 % − 20 %)/20 % = <b>2</b>. Effektiv nominell eierskatt er 20 % × 2 = <b>40 %</b>. Kontroll: 20 % + 40 % = 60 %. ✓</p><p>Bare a) gir 60 % på høyre side: b) gir 62 %, c) 52 %, d) 48 % og e) 56 %.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>2,1 og 42 %: nominell avgift på 14,1 % i stedet for 13 %, eller en effektiv regning som kurset ikke bruker.</li><li>1,6 og 32 %: fasiten fra eksamen H2020, som brukte den eldre likningen t<sub>w</sub> = t<sub>A</sub> + (1 − t<sub>A</sub>) × t<sub>e</sub> × y uten arbeidsgiveravgift. Det er fella.</li><li>1,4 og 28 %: arbeidsgiveravgiften glemt, 47 % = 20 % + 20 % × y.</li><li>1,8 og 36 %: y fra forelesningens eksempel der eierskatten er 22 %, ikke 20 %.</li></ul><p><b>Merk.</b> Summen av nominelle satser er ikke den effektive skatten. Det sier forelesningen selv. Oppgaven spør likevel etter nominell eierskatt og følger forelesningens likning.</p>"
      },
      {
        "n": 3,
        "title": "Eierskatt i Selfie AS",
        "points": 1,
        "topic": "Aksjonærmodellen",
        "chapters": [
          5
        ],
        "body": "<p>Du driver bedriften Selfie AS som har et skattbart overskudd på kr 100.000. Anta at den alminnelige skattesatsen er 23 %, oppjusteringsfaktoren 1,33 og den nominelle eierskatten er 20 %. Etter at bedriften har betalt bedriftsskatten tar du resten ut som utbytte. Hvor mange kroner utgjør eierskatten (får du desimaler i ditt svar kan du se bort fra dem).</p>",
        "options": [
          "Kr 17.710",
          "Kr 22.100",
          "Kr 20.482",
          "Kr 24.950"
        ],
        "answer": 2,
        "solution": "<p><b>Regelen.</b> Eierskatten regnes av utbyttet etter selskapsskatt, oppjustert med faktoren.</p><p>Selskapsskatt 100 000 × 23 % = 23 000. Utbytte 77 000. Oppjustert 77 000 × 1,33 = 102 410. Eierskatt 102 410 × 20 % = <b>20 482</b>.</p><p>Samlet skatt er 43 482, altså 43,5 % av overskuddet. Det er mindre enn satsene lagt sammen (23 % + 26,6 %), fordi eierskatten bare treffer de 77 000 som er igjen.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Kr 17 710: 77 000 × 23 %, selskapsskattesatsen brukt som eierskatt og uten oppjustering.</li><li>Kr 22 100: ingen kjent regnevei.</li><li>Kr 24 950: om lag 77 000 × 1,62 × 20 %, altså en annen faktor enn den oppgitte.</li></ul><p><b>Forutsetning.</b> Ingen skjerming, siden kostpris og skjermingsrente ikke er oppgitt.</p>"
      },
      {
        "n": 4,
        "title": "Hvem er norsk skattyter",
        "points": 1,
        "topic": "Internasjonal skatt",
        "chapters": [
          13
        ],
        "body": "<p>Er du norsk skattyter hvis:</p>",
        "options": [
          "Du har norsk pass",
          "Er født i Norge",
          "Har bodd mer enn et visst antall dager over ulike tidsperioder i Norge uansett statsborgerskap",
          "Har bostedsadresse i Norge",
          "Har ektefelle i Norge"
        ],
        "answer": 2,
        "solution": "<p><b>Regelen.</b> Global skatteplikt følger bosted. Bosted følger opphold: mer enn 183 dager i en tolvmånedersperiode eller mer enn 270 dager i en trettiseksmånedersperiode (skatteloven § 2-1). Statsborgerskap, fødested og adresse avgjør ikke.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Pass og fødested: inngår ikke i bostedsregelen.</li><li>Bostedsadresse: bosted følger oppholdsdager. I eksamen H2022 meldte Masse flytting, men var likevel bosatt etter intern rett.</li><li>Ektefelle i Norge: nærstående og bolig betyr noe for når bostedet opphører, ikke for om det oppstår.</li></ul><p><b>Merk.</b> Originalen har et sjette, tomt alternativ. Det er tatt ut her.</p>"
      },
      {
        "n": 5,
        "title": "Skattefri utleie av egen bolig",
        "points": 1,
        "topic": "Investeringscaser",
        "chapters": [
          4
        ],
        "body": "<p>Du har nettopp kjøpt en liten enebolig og ønsker å leie ut deler av eneboligen skattefritt. Leieinntekten er skattefri hvis:</p>",
        "options": [
          "Du leier ut halvparten eller mindre av boligen, beregnet etter størrelse",
          "Du leier ut mindre enn halvparten av boligen og utleieenheten ikke har egen inngang",
          "Du har eid boligen i mer enn ett år og da kan du leie ut skattefritt",
          "Du bruker minst halvparten av boligen du eier til eget bruk, beregnet etter utleieverdi."
        ],
        "answer": 3,
        "solution": "<p><b>Regelen.</b> Leien er skattefri når eieren selv bruker minst halvparten av boligen, målt etter utleieverdi og ikke areal (skatteloven § 7-2). Eksamen H2021 oppgave 1d: to like store etasjer, men den utleide var verdt 14 000 kroner i måneden mot 15 000 for eierens, så utleien var skattefri.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Etter størrelse: feil målestokk. Like store deler kan ha ulik utleieverdi.</li><li>Egen inngang: ikke et vilkår. Alternativet måler dessuten etter størrelse.</li><li>Eid i mer enn ett år: et vilkår for skattefri gevinst ved salg, ikke for utleie.</li></ul><p><b>Merk.</b> Gjelder langtidsutleie. Er leien skattefri, får du heller ikke fradrag for kostnader.</p>"
      },
      {
        "n": 6,
        "title": "Fritaksmetoden",
        "points": 1,
        "topic": "Fritaksmetoden",
        "chapters": [
          6
        ],
        "body": "<p>Fritaksmetoden innebærer at:</p>",
        "options": [
          "Personlig skattyter trenger ikke å skatte for aksjegevinster.",
          "Aksjegevinster skattlegges kun på selskapets hånd.",
          "Fritaksmetoden innebærer at aksjeselskaper i hovedsak ikke blir skattlagt for mottatt utbytte.",
          "Aksjeinntekter, aksjeutbytte og aksjegevinster som mottas fra datterselskaper skattlegges i holdingselskapet."
        ],
        "answer": 2,
        "solution": "<p><b>Regelen.</b> Fritaksmetoden gjelder selskapsaksjonærer: utbytte og gevinst er i hovedsak skattefrie for aksjeselskaper, for å unngå kjedebeskatning (skatteloven § 2-38). «I hovedsak» viser til 3 %-regelen: under 90 % eierskap skattlegges 3 % av utbyttet med 22 %, altså 0,66 %. Eksamen H2019 oppgave 1a hadde nesten samme spørsmål.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Personer slipper skatt på gevinst: personlige aksjonærer følger aksjonærmodellen.</li><li>Gevinst bare i selskapet: motsatt. Gevinsten er i hovedsak skattefri i selskapet.</li><li>Skattlegges i holdingselskapet: motsatt. Inntekter fra datterselskaper er i hovedsak skattefrie der.</li></ul>"
      },
      {
        "n": 7,
        "title": "Delvis tapsfradrag og risikotaking",
        "points": 1,
        "topic": "Skatt og risiko",
        "chapters": [
          12
        ],
        "body": "<p>Anta at skattesystemet er utformet slik at vi bare delvis kan fremføre mulige tap mot fremtidig inntekt. Hva betyr det for risikotakingen til et individ som er risikonøytral?</p>",
        "options": [
          "Vi påvirkes ikke av det fordi vi er opptatt av forventet gevinst",
          "Vi tar mere risiko",
          "Vi tar mindre risiko",
          "Vi dobler våre investeringer i risikable aktiva"
        ],
        "answer": 2,
        "solution": "<p><b>Regelen.</b> Skatten påvirker ikke investeringsvalget når staten er med på både opp- og nedsiden (forelesning 10). Med bare delvis tapsfradrag tar staten full andel av gevinsten, men bærer bare en del av tapet. Da faller forventet gevinst etter skatt mest for det risikable prosjektet.</p><p><b>Kursets eksempel.</b> 100 000 med 40 % skatt. A gir sikkert 20 000, altså 12 000 etter skatt. B gir +150 000 eller −100 000 med like stor sannsynlighet. Med fullt fradrag er E(B) etter skatt 15 000, så B velges. Med halvt fradrag blir det 45 000 − 40 000 = 5 000, så A velges. En risikonøytral investor tar altså mindre risiko.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Påvirkes ikke: blander risikonøytralitet med skattenøytralitet. Den risikonøytrale påvirkes nettopp gjennom forventet gevinst etter skatt.</li><li>Mer risiko: gjelder fullt tapsfradrag i porteføljemodellen (Domar–Musgrave), der staten deler risikoen.</li><li>Dobler investeringene: ingen støtte i kurset.</li></ul>"
      },
      {
        "n": 8,
        "title": "Lik gjennomsnittsskatt",
        "points": 1,
        "topic": "Progressivitet",
        "chapters": [
          10
        ],
        "body": "<p>Oluf ønsker seg et mer rettferdig skattesystem hvor alle behandles likt skattemessig slik at gjennomsnittskatten er den samme for alle uansett inntekt. Hvilke av alternativene under har den egenskapen Oluf er ute etter:</p>",
        "options": [
          "Et skattesystem med en flat skattesats for all inntekt uansett inntektens størrelse, men hvor det gis et bunnfradrag.",
          "Et skattesystem med en flat skattesats for all inntekt uten bunnfradrag.",
          "Et skattesystem hvor man har en flat skattesats som gjelder for alle inntektsnivåer, men hvor alle er garantert en minstelønn (borgerlønn).",
          "Et skattesystem hvor alle betaler samme skattesats uavhengig av inntektens størrelse, men hvor man får et fradrag for hvert barn man har."
        ],
        "answer": 1,
        "solution": "<p><b>Regelen.</b> Med T = tY er gjennomsnittsskatten T/Y = t for alle. Fasiten til eksamen H2024 oppgave 4a: uten bunnfradrag «betaler alle samme gjennomsnittsskatt og systemet er verken regressivt eller progressivt».</p><p>Alle fire har flat marginalskatt. Bare uten fradrag og overføringer blir også gjennomsnittsskatten flat.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Bunnfradrag B: T/Y = t(1 − B/Y) stiger med inntekten, så systemet er progressivt.</li><li>Borgerlønn G: virker som negativ skatt, T/Y = t − G/Y stiger også med inntekten.</li><li>Barnefradrag: gir ulik gjennomsnittsskatt ved samme inntekt.</li></ul>"
      },
      {
        "n": 9,
        "title": "Skattemessig utflytting",
        "points": 1,
        "topic": "Internasjonal skatt",
        "chapters": [
          13
        ],
        "body": "<p>Inge har bodd i Norge i over 20 år, men nå har han fått nok av regjeringen og flyttet i januar 2022 til Sveits. Fra og med hvilket år vil Inge anses som skattemessig utflyttet fra Norge etter norsk intern skatterett?</p>",
        "options": [
          "2022.",
          "2024.",
          "2025.",
          "2026."
        ],
        "answer": 3,
        "solution": "<p><b>Regelen.</b> Har du vært bosatt i Norge i mer enn ti år før utflyttingsåret, er du fortsatt bosatt til utløpet av det tredje inntektsåret etter utflyttingsåret (skatteloven § 2-1). Spørsmålet er nesten ordrett likt eksamen H2022 oppgave 4, med samme fasit.</p><table class=\"data\"><tr><th>År</th><th>Status</th></tr><tr><td>2022</td><td>Utflyttingsår, bosatt</td></tr><tr><td>2023, 2024, 2025</td><td>Tre inntektsår etter, bosatt</td></tr><tr><td>2026</td><td><b>Første år som utflyttet</b></td></tr></table><p><b>Hvorfor de andre er feil.</b></p><ul><li>2022: bare mulig med kortere botid enn ti år.</li><li>2024: teller bare ett mellomliggende år.</li><li>2025: fella. Teller utflyttingsåret som ett av de tre, eller oppgir siste år som bosatt.</li></ul><p><b>Forutsetning.</b> Inge har vært i Norge høyst 61 dager i hvert av årene 2023–2025. Verken han eller nærstående har disponert bolig her.</p>"
      },
      {
        "n": 10,
        "title": "Hvem får skjermingsfradraget",
        "points": 1,
        "topic": "Aksjonærmodellen",
        "chapters": [
          5
        ],
        "body": "<p>Hvilket utsagn er riktig:</p>",
        "options": [
          "Skjermingsfradraget går til alle som eier aksjer.",
          "Skjermingsfradraget går til selskapsaksjonærer.",
          "Skjermingsfradraget er noe som utenlandske investorer får for å fremme investeringer fra utlandet.",
          "Skjermingsfradraget tilfaller personlig aksjonær som eier aksjen pr. 31.12. i inntektsåret."
        ],
        "answer": 3,
        "solution": "<p><b>Regelen.</b> Skjermingen hører til aksjonærmodellen, som gjelder personlige aksjonærer. Den tilordnes den som eier aksjen 31. desember (skatteloven § 10-12). Selger du før årsskiftet, mister du årets skjerming. Formålet er at eierskatten bare skal treffe avkastning utover en risikofri normalavkastning.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Alle som eier aksjer: for vidt. Selskapsaksjonærer følger fritaksmetoden.</li><li>Selskapsaksjonærer: motsatt av regelen.</li><li>Utenlandske investorer: formålet er å skjerme normalavkastningen, ikke å tiltrekke kapital.</li></ul>"
      },
      {
        "n": 11,
        "title": "Valg mellom pensjonskontrakter",
        "points": 1,
        "topic": "Forventet nytte",
        "chapters": [
          17
        ],
        "body": "<p>Anta at Pernille Olsen har en risikoaversjon over null. Individet har valget mellom tre ulike pensjonskontrakter:</p><p>Alternativ A vil gi en utbetaling på 500.000 helt sikkert.<br>Alternativ B gir en utbetaling på 400.000 med 75 % sannsynlighet og 800.000 med 25 % sannsynlighet.<br>Alternativ C gir en utbetaling på 350.000 med 25 % sannsynlighet og 550.000 med 75 % sannsynlighet.</p><p>Hvilket alternativ vil hun velge?</p>",
        "options": [
          "Alternativ A",
          "Alternativ B",
          "Alternativ C",
          "Alle er like gode"
        ],
        "answer": 0,
        "solution": "<p><b>Regelen.</b> Alle tre har samme forventning: E(B) = 0,75 × 400 000 + 0,25 × 800 000 = 500 000 og E(C) = 0,25 × 350 000 + 0,75 × 550 000 = 500 000. En risikoavers har konkav nytte, så E[U(X)] &lt; U(E[X]). Det sikre beløpet A gir derfor høyest forventet nytte.</p><p>Sikkerhetsekvivalenten CE = E(r) − ½Aσ² (forelesning 10) sier det samme: risiko trekker CE ned for B og C, men ikke for A.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>B og C: samme forventning, men med risiko i tillegg.</li><li>Alle like gode: gjelder bare en risikonøytral person.</li></ul><p><b>Merk.</b> Rekkefølgen mellom B og C avhenger av nyttefunksjonen, men spørsmålet krever bare at A slår begge.</p>"
      },
      {
        "n": 12,
        "title": "Optimal aksjeandel (Merton)",
        "points": 1,
        "topic": "Sparing og portefølje",
        "chapters": [
          14
        ],
        "body": "<p>Anta at Per Olsens nyttefunksjon er U = c<sup>1−γ</sup>/(1 − γ), med γ = 4. Anta også at Per Olsen er pensjonist og bare har finansiell formue. Han ønsker å fordele formuen på et aksjefond med forventet avkastning på 6 % og et standardavvik på 20 % og en risikofri bankkonto med avkastning på 2 %. Hva er optimal andel investert i aksjefondet.</p>",
        "options": [
          "5 %",
          "25 %",
          "37,5 %",
          "100 %"
        ],
        "answer": 1,
        "solution": "<p><b>Regelen.</b> w* = (E(r) − r<sub>f</sub>)/(γσ²). Parameteren γ i nyttefunksjonen er den samme som i formelen.</p><p>w* = (0,06 − 0,02)/(4 × 0,20²) = 0,04/0,16 = <b>25 %</b>.</p><p>Pensjonisten har ingen humankapital, så andelen gjelder hele den finansielle formuen.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>5 %: σ i stedet for σ², 0,04/(4 × 0,20).</li><li>37,5 %: forventet avkastning i stedet for risikopremien, 0,06/0,16.</li><li>100 %: krever γ = 1.</li></ul>"
      },
      {
        "n": 13,
        "title": "Påstander om aksjeporteføljer",
        "points": 1,
        "topic": "Sparing og portefølje",
        "chapters": [
          14
        ],
        "body": "<p>Hvilken av påstandene om aksjeporteføljer kan være korrekt?</p>",
        "options": [
          "Det kan være fordeler ved å diversifisere aksjeporteføljen selv når de ulike aksjene er positivt korrelerte.",
          "De som misliker risiko mye og lite bør investere i den samme aksjeporteføljen, men jo mer man tåler risiko, jo større andel av formuen bør man investere i denne aksjeporteføljen.",
          "Anta at aksje A har lavere standardavvik enn aksje B. Likevel kan en portefølje der man investerer halvparten av formuen i aksje B og resten i aksje A ha lavere standardavvik enn dersom man kun investerer i aksje A.",
          "Alle de tre påstandene over kan være korrekte."
        ],
        "answer": 3,
        "solution": "<p><b>Ordet «kan» avgjør.</b> Ett tilfelle der påstanden holder, er nok.</p><ul><li><b>Første påstand holder:</b> så lenge ρ &lt; 1 er porteføljens standardavvik lavere enn det vektede snittet. Bare ved perfekt positiv korrelasjon er det ingen gevinst.</li><li><b>Andre holder:</b> separasjonsteoremet. Alle holder markedsporteføljen og bank. Den som tåler mer risiko, har mer av markedsporteføljen, ikke mer risikable aksjer.</li><li><b>Tredje kan holde:</b> med σ<sub>A</sub> = 0,20, σ<sub>B</sub> = 0,25 og ρ = 0,3 gir 50/50 σ<sub>p</sub> = 0,182 &lt; 0,20. Med disse tallene holder det når ρ &lt; 0,575.</li></ul><p>Alle tre kan holde, så svaret er «alle de tre».</p>"
      },
      {
        "n": 14,
        "title": "Aktive og passive aksjefond",
        "points": 1,
        "topic": "Sparing og portefølje",
        "chapters": [
          14
        ],
        "body": "<p>Hvilken påstand om aktive og passive aksjefond er riktig?</p>",
        "options": [
          "Det vil alltid lønne seg å investere i aktive aksjefond siden aktivitet lønner seg.",
          "Aktive aksjefond har som regel høyere forvaltningskostnader enn passive aksjefond.",
          "Passive aksjefond er mer risikable enn aktive, siden forvalterne har mindre kontakt med selskapene de investerer i.",
          "Aktive aksjefond har som regel lavere avkastning før kostnadene er trukket fra."
        ],
        "answer": 1,
        "solution": "<p><b>Regelen.</b> Aktive fond tar ofte 1–2 % i årlig gebyr, om lag fem ganger så mye som indeksfond. Eksamen H2024 oppgave 12: «Indeksfond er generelt billigere enn aktivt forvaltede fond».</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Alltid lønnsomt: «alltid» faller på ett moteksempel. Flertallet av aktive fond slår ikke indeks etter gebyrer.</li><li>Passive mer risikable: indeksfond gir maksimal spredning. Risiko måles med standardavvik.</li><li>Lavere avkastning før kostnader: kurset støtter ikke det. Før gebyrer gjør aktive fond det minst like bra. Gapet kommer etter kostnadene.</li></ul>"
      },
      {
        "n": 15,
        "title": "Egenandel i forsikring",
        "points": 1,
        "topic": "Forsikring",
        "chapters": [
          17
        ],
        "body": "<p>Hvorfor kan det være gunstig for et forsikringsselskap å selge forsikring med en egenandel, selv om premien blir lavere?</p>",
        "options": [
          "Egenandelen reduserer risikoen for moralsk hasard.",
          "Egenandelen gir et mer gunstig utvalg, siden forsikringstagere med forsiktig adferd vil foretrekke en egenandel.",
          "Egenandelen gir lavere kostnader fordi færre krav må håndteres.",
          "Alle de tre alternativene over vil være aktuelle."
        ],
        "answer": 3,
        "solution": "<ul><li><b>Moralsk hasard</b> (atferd etter avtalen): kunden bærer selv en del av skaden og har grunn til å være forsiktig. Riktig svar i eksamen H2019 oppgave 7b.</li><li><b>Seleksjon</b> (hvem som kjøper): forsiktige kunder velger egenandel mot lavere premie, mens kunder med høy risiko velger full dekning. Kundene sorterer seg selv. Selskapet får et gunstigere utvalg.</li><li><b>Færre krav:</b> små skader under egenandelen meldes ikke. For dem er behandlingskostnaden stor i forhold til utbetalingen.</li></ul><p>Alle tre mekanismene virker samtidig, så svaret er «alle de tre».</p><p><b>Merk.</b> Kursets lysbilder om forsikring ligger ikke i mappen. Svaret bygger på eksamensfasitene og standard teori.</p>"
      },
      {
        "n": 16,
        "title": "Flere aksjefond gir høyere aksjeandel",
        "points": 1,
        "topic": "Finansiell psykologi",
        "chapters": [
          18
        ],
        "body": "<p>I en pensjonsordning der individene kan velge selv hvor man investerer har det vist seg at aksjeandelen stiger jo flere forskjellige aksjefond som blir tilbudt. Hvilken type irrasjonell adferd er det mest sannsynlig at dette skyldes?</p>",
        "options": [
          "Tapsaversjon",
          "Menyeffekt",
          "Preferanse for det kjente",
          "Overvurdering av egne ferdigheter"
        ],
        "answer": 1,
        "solution": "<p><b>Regelen.</b> For en rasjonell investor avhenger aksjeandelen bare av risikopremie, risiko og risikoaversjon. Når den stiger med antall aksjefond, er det menyen som styrer valget. Forelesning 16 nevner menyeffekten og 1/N-regelen (folk fordeler jevnt på det som tilbys) under «Heuristikker». Med 1/N blir aksjeandelen omtrent lik andelen aksjefond i menyen.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Tapsaversjon: ville trukket aksjeandelen ned, uavhengig av antall fond.</li><li>Preferanse for det kjente: forklarer hjemmebias. Flere ukjente fond skulle ikke øke aksjeandelen.</li><li>Overvurdering av egne ferdigheter: forklarer overdreven handel.</li></ul><p><b>Merk.</b> Strengt tatt er mekanismen 1/N-regelen. Den er ikke et alternativ, så menyeffekt er det beste svaret.</p>"
      },
      {
        "n": 17,
        "title": "Aksjeandel, alder og humankapital",
        "points": 1,
        "topic": "Sparing og portefølje",
        "chapters": [
          14,
          15
        ],
        "body": "<p>Anta at både Pernille Olsen og Petra Olsen jobber som revisorer med samme lønn. Pernille er 30 år gammel, mens Petra er 60 år. Ingen av dem har nevneverdige finansielle aktiva, men begge har en innskuddspensjon. Hvem bør ha den høyeste aksjeandelen?</p>",
        "options": [
          "Pernille Olsen",
          "Petra Olsen",
          "De bør begge ha en aksjeandel på ca 50 %",
          "Ingen bør investere i aksjer"
        ],
        "answer": 0,
        "solution": "<p><b>Regelen.</b> Den unge revisoren har mest humankapital igjen. Den er sikker og virker som et bankinnskudd, så hun bør ha høyere aksjeandel i den finansielle formuen. Eksamen H2022 oppgave 7 viser det i tall: når humankapitalen faller fra 2 000′ til 1 000′ og finansformuen stiger fra 2 000′ til 3 000′, faller aksjeandelen av finansformuen fra 100 % til 66,7 %. Eksamen H2019 oppgave 6d var nesten samme spørsmål.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Petra: snur logikken.</li><li>Begge ca. 50 %: standardprofilen i mange ordninger, men unge bør ha høyere andel.</li><li>Ingen i aksjer: med positiv risikopremie gir Merton en andel over null.</li></ul><p><b>Forutsetning.</b> Revisorlønnen er tilnærmet risikofri. Svinger humankapitalen med aksjemarkedet (β = 1), snus rangeringen.</p><p><b>Merk.</b> Begrunnelsen er humankapital, ikke at aksjer blir tryggere over tid eller at eldre er mer risikoaverse.</p>"
      },
      {
        "n": 18,
        "title": "Home bias",
        "points": 1,
        "topic": "Finansiell psykologi",
        "chapters": [
          14,
          18
        ],
        "body": "<p>Hvilken av påstandene om «home bias» i aksjeinvesteringer kan være riktig?</p>",
        "options": [
          "En stor andel norske aksjer kan øke den samlede risikoen dersom også arbeidsinntekten er sterkt knyttet til norsk økonomi.",
          "Det er lurt å investere mest i norske aksjer siden det norske aksjemarkedet har lavere standardavvik enn utenlandske aksjer.",
          "Det er lurt å investere mest i norske aksjer fordi norske småsparere kjenner det norske aksjemarkedet bedre enn utlendinger, noe som gjør at vi får høyere avkastning i Norge.",
          "Alle tre påstandene er korrekte."
        ],
        "answer": 0,
        "solution": "<p><b>Regelen.</b> Lønnen er allerede eksponert mot norsk økonomi, så norske aksjer legger til mer av samme risiko: investeringene gjør det dårlig når du har mest behov for penger. Velg heller plasseringer som har høy verdi når arbeidsinntekten er lav.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Lavere standardavvik: det er porteføljens risiko som teller. Spredning mellom markeder gir lavere risiko. Norske aksjer er dessuten bare 0,2 % av verdens aksjemarked.</li><li>Bedre kunnskap: i et effektivt marked gir lokalkunnskap ikke systematisk meravkastning.</li><li>Alle tre: faller fordi to av påstandene er feil.</li></ul>"
      },
      {
        "n": 19,
        "title": "Alderspensjon fra folketrygden",
        "points": 1,
        "topic": "Pensjon",
        "chapters": [
          15
        ],
        "body": "<p>Pål Olsen er 22 år og nyutdannet. Han har en lønn på 400.000 og regner med at denne vil stige i takt med generell lønnsutvikling i samfunnet frem til pensjonsalder. Hva vil være hans forventede pensjon fra Folketrygden, målt i % av sluttlønn, dersom han jobber frem til han er 66 år gammel og delingstallet da blir 22?</p>",
        "options": [
          "18,1 %",
          "36,2 %",
          "44,0 %",
          "Det kommer an på avkastningen i aksjemarkedet"
        ],
        "answer": 1,
        "solution": "<p><b>Regelen.</b> Hvert år legges 18,1 % av inntekten opp til 7,1 G til beholdningen. Beholdningen reguleres med lønnsveksten. Når lønnen følger lønnsveksten, er hvert opptjeningsår verdt 18,1 % av sluttlønnen. Årlig pensjon = beholdning/delingstall.</p><p>Beholdning = 44 × 18,1 % × sluttlønn = 7,964 × sluttlønn. Pensjon = 7,964/22 = 0,362, altså <b>36,2 %</b> av sluttlønnen.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>18,1 %: ett års opptjening, eller beholdningen delt på antall år i stedet for delingstallet.</li><li>44 %: ingen regnevei. Tallet er antall opptjeningsår.</li><li>Avhenger av aksjemarkedet: beholdningen er en rettighet som reguleres med lønnsveksten, ikke et fond.</li></ul><p><b>Forutsetning.</b> Opptjening i alle 44 årene og lønn under 7,1 G hele tiden.</p>"
      },
      {
        "n": 20,
        "title": "Mest utsatt for svingninger i aksjemarkedet",
        "points": 1,
        "topic": "Pensjon",
        "chapters": [
          15
        ],
        "body": "<p>Hvilken del av pensjonsformuen til et individ er mest utsatt for svingninger i aksjemarkedet?</p>",
        "options": [
          "Folketrygden",
          "Ytelsespensjon",
          "En gjennomsnittlig innskuddspensjon",
          "Fripolise"
        ],
        "answer": 2,
        "solution": "<p><b>Regelen.</b> Spør hvem som bærer investeringsrisikoen. I innskuddspensjon er det arbeidstakeren. En vanlig profil har om lag 50 % aksjer. Eksamen H2025 oppgave 17: «den ansatte bærer investeringsrisikoen».</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>Folketrygden: reguleres med lønnsveksten.</li><li>Ytelsespensjon: garanterer en bestemt utbetaling. Arbeidsgiveren bærer risikoen.</li><li>Fripolise: et produkt med rentegaranti, der leverandøren bærer risikoen.</li></ul>"
      }
    ]
  },
{
  id: "h2025",
  label: "Høsten 2025",
  date: "2025-11-14",
  minutes: 240,
  points: 29,
  format: "17 oppgaver · 29 flervalg · fire alternativer · kalkulator tillatt",
  note: "Schjelderups siste sett før minuspoengene, og det settet som ligner mest på det du møter i 2026. Tjueni delspørsmål à ett poeng på fire timer: oppgave 1–10 er skattedelen hans (17 poeng), oppgave 11–17 er Næss' finansdel (12 poeng). Settet er tyngre på formuesskatt som avkastningsskatt enn noe tidligere sett — oppgave 3, 6 og 9 gir seks poeng på det temaet alene — og internasjonal skatt er helt fraværende. To oppgaver har mer enn ett godtatt svar, og oppgave 1 har en dokumentert trykkfeil i veiledningen.",
  facts: [
    "Skoleeksamen i Wiseflow 14. november 2025, 09:00–13:00, fire timer.",
    "17 oppgaver, 29 delspørsmål, ett poeng hvert. Fire alternativer overalt.",
    "Kalkulator og én tospråklig ordbok tillatt.",
    "«Ubesvarte spørsmål eller feil svar gir ikke minuspoeng.» Slå på minuspoeng for å trene 2026-forhold.",
    "Oppgave 1–10: Guttorm Schjelderup (skatt). Oppgave 11–17: Ole-Andreas Næss (finans).",
  ],
  practiceNote: "Regn ferdig før du ser på alternativene. Tre av fire er laget for å fange én bestemt feil, og i denne eksamenen er lokkealternativet ofte svaret på et annet delspørsmål i samme oppgave.",
  mc: { wrongFactor: 0 },
  exercises: [

    /* ---------------------------------------------------------------- 1 --- */
    {
      n: 1,
      title: "Utbytte, skjerming og formuesskatt over to år",
      points: 1,
      topic: "Aksjonærmodellen",
      chapters: [5, 7],
      body: "<p>Per har kjøpt børsnoterte aksjer i Norske Skog AS i 2023 for kr 10 000 000 som er aksjenes kostpris. Han har rett til utbytte i 2023 og 2024. I 2023 mottar Per utbytte på 500 000 og skjermingsrenten er 2 prosent. I 2024 mottar Per utbytte på kr 600 000 og skjermingsrenten er 4 prosent. Anta at eierskatten er 40 % og at formuesskatten er 1 %. Aksjer gis en rabatt på 20 % av formuesverdien. Aksjene til Per har samme børsverdi i 2024 som kostprisen i 2023. Du kan se bort fra bunnfradrag.</p><p>Hvor mye sitter Per igjen med av de utbetalte utbyttene etter at han har betalt eierskatt og formuesskatt?</p>",
      options: ["Kr 0", "Kr 630 000", "Kr 580 000", "Kr 740 000"],
      answer: 3,
      solution: "<p><b>Regnestykket.</b> To skatter treffer samme aksjepost, og de har hvert sitt grunnlag: eierskatten treffer utbyttet minus skjermingsfradraget, formuesskatten treffer aksjenes formuesverdi ved inngangen til hvert år.</p><p><b>Steg 1 — skjermingsgrunnlaget.</b> Kostprisen er kr 10 000 000. Utbyttet er begge år større enn skjermingsfradraget, så det oppstår <b>ingen</b> ubenyttet skjerming å framføre. Grunnlaget er derfor 10 000 000 i begge år.</p><p><b>Steg 2 — eierskatten i 2023.</b> Skjermingsfradrag = 10 000 000 × 2 % = <b>200 000</b>. Skattepliktig utbytte = 500 000 − 200 000 = 300 000. Eierskatt = 300 000 × 40 % = <b>120 000</b>.</p><p><b>Steg 3 — eierskatten i 2024.</b> Skjermingsfradrag = 10 000 000 × 4 % = <b>400 000</b>. Skattepliktig utbytte = 600 000 − 400 000 = 200 000. Eierskatt = 200 000 × 40 % = <b>80 000</b>. Samlet eierskatt over de to årene: 120 000 + 80 000 = <b>200 000</b>.</p><p><b>Steg 4 — formuesskatten.</b> Formuesverdien er børsverdien etter aksjerabatt: 10 000 000 × (100 % − 20 %) = 8 000 000. Formuesskatt per år = 8 000 000 × 1 % = <b>80 000</b>. Børsverdien er uendret, så begge år gir samme beløp: 2 × 80 000 = <b>160 000</b>.</p><p><b>Steg 5 — det Per sitter igjen med.</b> Mottatt utbytte 500 000 + 600 000 = 1 100 000.</p><table class=\"data\"><tr><th>Post</th><th>Beløp</th></tr><tr><td>Mottatt utbytte 2023 + 2024</td><td class=\"n\">1 100 000</td></tr><tr><td>− eierskatt</td><td class=\"n\">−200 000</td></tr><tr><td>− formuesskatt (2 år)</td><td class=\"n\">−160 000</td></tr><tr><td><b>Igjen</b></td><td class=\"n\"><b>740 000</b></td></tr></table><p><b>Kontroll.</b> Samlet skatt er 360 000 av 1 100 000, altså en effektiv skattesats på 32,73 % — lavere enn eierskatten på 40 %, fordi skjermingen tar 600 000 av utbyttet ut av grunnlaget, og høyere enn den ville vært uten formuesskatten. Regnet motsatt vei: 1 100 000 × (1 − 0,3273) = 740 000. ✓</p><p><b>Trykkfeil i sensorveiledningen.</b> Veiledningen skriver i én setning at «samlet utbytteskatt og formuesskatt for disse åren er henholdsvis kr 200 000 og kr 120 000». Tallet 120 000 er feil: avsnittet rett over regner selv 80 000 per år i to år, altså 160 000, og sluttsvaret 740 000 forutsetter 160 000. Beløpet 120 000 er eierskatten for 2023 som har sneket seg inn på feil linje. <b>Riktig alternativ, 740 000, er ikke berørt.</b> Merk at feilen ikke treffer noe alternativ heller: 1 100 000 − 200 000 − 120 000 = 780 000 finnes ikke i listen.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 580 000</b> — du har brukt skjermingsfradraget fra 2023 og glemt fradraget for 2024: 1 100 000 − 40 % × (1 100 000 − 200 000) − 160 000 = 1 100 000 − 360 000 − 160 000 = 580 000. Skjermingsfradraget beregnes <i>hvert år</i>, med årets skjermingsrente.</p><p><b>Kr 0</b> — «skatten spiser hele utbyttet». Den gjør ikke det: samlet skattetrykk er en tredel. Alternativet er der for den som ikke rekker å regne.</p><p><b>Kr 630 000</b> — svarer ikke til noen regnevei i det hele tatt. Det er et rent lokkealternativ, plassert mellom 580 000 og 740 000.</p><p><b>De vanlige feilene som <i>ikke</i> har noe alternativ.</b> Glemmer du formuesskatten helt, får du 900 000. Regner du formuesskatt av full børsverdi uten aksjerabatten, får du 700 000. Ingen av dem står i listen. Det er et signal du skal lære å bruke: <b>treffer tallet ditt ingen av alternativene, har du gjort en feil — gå tilbake, ikke gjett på nærmeste.</b></p><p><b>Regelen.</b> Utbytteskatt og formuesskatt regnes uavhengig, med hvert sitt grunnlag: eierskatten på (utbytte − skjermingsfradrag) og formuesskatten på (markedsverdi × (1 − rabatt)), én gang per år formuen eies.</p>",
    },

    /* ---------------------------------------------------------------- 2 --- */
    {
      n: 2,
      title: "Nettoformue med forholdsmessig gjeldsfordeling",
      points: 1,
      topic: "Formuesskatt",
      chapters: [7],
      body: "<p>Gunhild har 5 000 000 kroner i gjeld. Hun har en formue før verdsettingsrabatter på 10 000 000 kroner fordelt på en primærbolig med markedsverdi på 5 000 000 som har 75 prosent verdsettingsrabatt, og aksjefondsandeler med markedsverdi 5 000 000 som har 20 prosent verdsettingsrabatt.</p><p>Hva er Gunhilds skattepliktige nettoformue? Du kan se bort fra bunnfradrag.</p>",
      options: ["750 000", "250 000", "− 250 000", "− 750 000"],
      answer: [0, 1],
      solution: "<p><b>Fasiten godtar to svar: 750 000 og 250 000.</b> Sensorveiledningen sier det uttrykkelig, fordi oppgaven ikke spesifiserer om gjelden skal avkortes. Begge er markert riktige her. Regn likevel hovedveien først — 750 000 er den som følger loven.</p><p><b>Steg 1 — fordelingsnøkkelen er bruttoverdiene, før rabatt.</b> Primærbolig 5 000 000 og aksjefond 5 000 000 av til sammen 10 000 000, altså 50 % på hver. Det er her folk bommer: nøkkelen er <i>ikke</i> formuesverdiene etter rabatt.</p><p><b>Steg 2 — gjelden fordeles.</b> 5 000 000 × 50 % = 2 500 000 på hvert aktivum.</p><p><b>Steg 3 — formuesverdiene.</b> Primærbolig: 5 000 000 × (1 − 75 %) = 1 250 000. Aksjefond: 5 000 000 × (1 − 20 %) = 4 000 000. Sum formuesverdi 5 250 000.</p><p><b>Steg 4 — fradragsberettiget gjeld.</b> Gjelden som er henført til et aktivum med verdsettingsrabatt, avkortes med <i>samme</i> rabatt — men bare for aksjer og aksjefond, ikke for primærbolig. Bolig: 2 500 000 (uendret). Aksjefond: 2 500 000 × (1 − 20 %) = 2 000 000. Sum 4 500 000.</p><table class=\"data\"><tr><th>Post</th><th>Primærbolig</th><th>Aksjefond</th><th>Sum</th></tr><tr><td>Markedsverdi</td><td class=\"n\">5 000 000</td><td class=\"n\">5 000 000</td><td class=\"n\">10 000 000</td></tr><tr><td>Andel av bruttoformuen</td><td class=\"n\">50 %</td><td class=\"n\">50 %</td><td class=\"n\">100 %</td></tr><tr><td>Gjeld henført</td><td class=\"n\">2 500 000</td><td class=\"n\">2 500 000</td><td class=\"n\">5 000 000</td></tr><tr><td>Formuesverdi etter rabatt</td><td class=\"n\">1 250 000</td><td class=\"n\">4 000 000</td><td class=\"n\">5 250 000</td></tr><tr><td>Fradragsberettiget gjeld</td><td class=\"n\">2 500 000</td><td class=\"n\">2 000 000</td><td class=\"n\">4 500 000</td></tr><tr><td><b>Nettoformue</b></td><td class=\"n\">−1 250 000</td><td class=\"n\">2 000 000</td><td class=\"n\"><b>750 000</b></td></tr></table><p><b>Kontroll.</b> Regn samme tall som sum i stedet for per aktivum: 5 250 000 − 4 500 000 = 750 000. ✓ Og legg merke til at kolonnene summerer: −1 250 000 + 2 000 000 = 750 000. En negativ nettoformue på boligen er helt i orden; det er summen som skattlegges.</p><p><b>Den andre godtatte veien.</b> Uten gjeldsavkorting trekkes hele gjelden fra: 5 250 000 − 5 000 000 = <b>250 000</b>. Forskjellen på de to svarene er nøyaktig avkortingen, 2 500 000 × 20 % = 500 000. Sensor godtok dette fordi oppgaveteksten ikke sier at avkortingen skal brukes.</p><p><b>Hvorfor de gale alternativene er gale.</b> <b>− 250 000</b> og <b>− 750 000</b> er de to riktige tallene med snudd fortegn. De fanger den som regner <i>gjeld minus formue</i> i stedet for <i>formue minus gjeld</i>. Rekkefølgen er alltid formuesverdi først; nettoformue er det som er igjen når gjelden er trukket fra, ikke omvendt.</p><p><b>Regelen.</b> Gjeld fordeles forholdsmessig etter aktivaenes <i>bruttoverdi</i>. Gjeld henført til aktiva med verdsettingsrabatt avkortes med samme prosent — for aksjer, aksjefond og driftsmidler, men ikke for primærbolig. Et negativt bidrag fra ett aktivum motregnes mot de andre.</p><p><b>På eksamen med minuspoeng:</b> når to alternativer begge kan forsvares, velg det som følger regelen slik den er lært — her 750 000 — og gå videre. Fortegnsfellene under kan du utelukke på ett sekund, og det alene gjør det lønnsomt å svare.</p>",
    },
    /* ---------------------------------------------------------------- 3 --- */
    {
      n: 3,
      title: "Formuesskatt som avkastningsskatt, og verdsetting av en evig kontantstrøm",
      points: 4,
      topic: "Formuesskatt som avkastningsskatt",
      chapters: [2, 8],
      body: "<p>Anta at kapitalmarkedet er effisient slik at alle investeringer i samme risikoklasse oppnår den samme avkastningen. En investor foretar en aksjeinvestering ved periodens begynnelse på kr 200 millioner som gir en kontantstrøm på 10 millioner kroner ved periodens slutt. Ved periodens slutt selges investeringen for kr 200 millioner. Du kan se bort fra skatt på kapitalavkastning, aksjerabatten på formuesverdi av aksjene og bunnfradrag ved formuesskatten.</p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Hva er avkastningen på investeringen i perioden til en investor som ikke betaler skatt?</p>",
          options: ["4 %", "5 %", "6 %", "3 %"],
          answer: 1,
          solution: "<p><b>Steg 1 — de to avkastningskomponentene.</b> Totalavkastning = direkteavkastning + kapitalgevinst. Investeringen koster 200 ved periodens begynnelse og selges for 200 ved periodens slutt, så <b>kapitalgevinsten er null</b>. Hele avkastningen ligger i kontantstrømmen på 10.</p><p><b>Steg 2 — regn.</b> r = 10/200 = 0,05 = <b>5 %</b>.</p><p><b>Kontroll.</b> Sluttverdi for investoren er 200 + 10 = 210 på en innsats på 200: 210/200 − 1 = 5 %. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>4 %</b> — det er svaret på neste delspørsmål, altså avkastningen <i>etter</i> formuesskatt. Her står det uttrykkelig at investoren ikke betaler skatt. Dette er settets favorittfelle: lokkealternativet er nabospørsmålets fasit.</p><p><b>6 %</b> — (10 + 2)/200. Du har lagt formuesskatten på 2 millioner <i>til</i> kontantstrømmen i stedet for å trekke den fra (og skulle uansett ikke ha regnet den med her).</p><p><b>3 %</b> — (10 − 2 − 2)/200. Formuesskatten trukket fra to ganger.</p><p><b>Regelen.</b> Periodeavkastning = (kontantstrøm + verdiendring)/inngående kapital. Når salgsprisen er lik kjøpsprisen, er direkteavkastningen hele avkastningen.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>Anta at investoren må betale 1 % i formuesskatt av aksjeinvesteringen på 200 mill. Hva blir avkastningen på investeringen nå?</p>",
          options: ["3 %", "4 %", "5 %", "6 %"],
          answer: 1,
          solution: "<p><b>Steg 1 — hva formuesskatten faller på.</b> Formuesskatten treffer formuen ved <i>inngangen</i> til perioden, altså de 200 millionene som er investert. Skatten er 200 × 1 % = <b>2 millioner</b>.</p><p><b>Steg 2 — avkastningen etter formuesskatt.</b> r = (10 − 2)/200 = 0,04 = <b>4 %</b>.</p><p><b>Kontroll — det er dette som menes med at formuesskatten er en avkastningsskatt.</b> Skriv den om: (10 − 2)/200 = 10/200 − 2/200 = r − τ<sub>w</sub> = 5 % − 1 % = 4 %. En formuesskatt på τ<sub>w</sub> som faller på inngående formue, trekker nøyaktig τ<sub>w</sub> prosentpoeng fra avkastningen, uansett hvor høy avkastningen er. Regnet som en skatt på avkastningen tilsvarer det en sats på τ<sub>w</sub>/r = 1 %/5 % = 20 % (det er oppgave 9 i dette settet).</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>5 %</b> — avkastningen før formuesskatt. Du har glemt å trekke fra, eller lest forrige delspørsmål på nytt.</p><p><b>3 %</b> — 2 millioner trukket fra to ganger, eller formuesskatt regnet både av inngående og utgående formue.</p><p><b>6 %</b> — formuesskatten lagt til i stedet for trukket fra.</p><p><b>Regelen.</b> Avkastning etter formuesskatt = r − τ<sub>w</sub> når skatten faller på formuen ved inngangen til perioden. Dette er alternativkostnaden du skal bruke i alle senere delspørsmål der investoren betaler formuesskatt.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Anta nå at investoren har funnet en annen aksjeinvestering i samme risikoklasse som investeringen på kr 200 mill. Denne investeringen gir en årlig evigvarende kontantstrøm på kr 5 mill.</p><p>Hvordan verdsetter investoren denne aksjeinvesteringen dersom han ikke betaler formuesskatt?</p>",
          options: ["100 millioner", "200 millioner", "80 millioner", "150 millioner"],
          answer: 0,
          solution: "<p><b>Steg 1 — hvilken diskonteringsrente?</b> Markedet er effisient og investeringen er i <i>samme risikoklasse</i> som den første. Da må avkastningskravet være det samme: 5 % fra delspørsmål a. Denne setningen i oppgaveteksten er ikke pynt — den er selve nøkkelen som gir deg renten.</p><p><b>Steg 2 — nåverdien av en evig kontantstrøm.</b> V = CF/r = 5/0,05 = <b>100 millioner</b>.</p><p><b>Kontroll.</b> Snu regnestykket: en investering som koster 100 og gir 5 i året for alltid, har avkastning 5/100 = 5 %. Det er nøyaktig markedsavkastningen, altså riktig pris. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>200 millioner</b> — du har festet deg ved prisen på den <i>første</i> investeringen. Den er 200 fordi den gir 10 i året, ikke 5. Dobbel kontantstrøm, dobbel verdi.</p><p><b>80 millioner</b> — (5 − 1)/0,05. Du har trukket formuesskatten på 1 million fra kontantstrømmen, men brukt den <i>uskattede</i> renten på 5 % til å diskontere. Oppgaven sier dessuten uttrykkelig at han ikke betaler formuesskatt her. Denne halve justeringen er den vanligste feilen i hele temaet, og den kommer igjen i neste delspørsmål.</p><p><b>150 millioner</b> — svarer ikke til noen regnevei; det ligger midt mellom 100 og 200 for å friste den som ikke er sikker.</p><p><b>Regelen.</b> V = CF/r for en evig kontantstrøm. Renten hentes fra en investering i samme risikoklasse, og «samme risikoklasse» i oppgaveteksten betyr alltid «bruk renten du nettopp regnet ut».</p>",
        },
        {
          label: "d",
          points: 1,
          body: "<p>Anta nå at investoren må betale formuesskatt på 1 % av markedsverdien av aksjen som gir en evigvarende årlig inntekt på kr 5 mill. Anta at formuesverdien er bestemt av markedsverdien av kontantstrømmen. Hvordan verdsetter en investor som må betale formuesskatt på 1 % av markedsverdien denne investeringen?</p>",
          options: ["100 millioner", "200 millioner", "50 millioner", "95 millioner"],
          answer: 0,
          solution: "<p>Dette er settets fineste oppgave, og svaret overrasker: <b>formuesskatten endrer ikke verdien i det hele tatt.</b> V = <b>100 millioner</b>, akkurat som uten formuesskatt.</p><p><b>Steg 1 — alternativkostnaden er også etter formuesskatt.</b> Investoren betaler formuesskatt på alt han eier. Alternativet hans, investeringen på 200 millioner, gir derfor 4 % etter formuesskatt (delspørsmål b), ikke 5 %. Avkastningskravet er 4 %.</p><p><b>Steg 2 — kontantstrømmen er også etter formuesskatt.</b> Formuesverdien er markedsverdien V, så skatten er 0,01 × V. Netto kontantstrøm er 5 − 0,01V.</p><p><b>Steg 3 — sett opp likevektsbetingelsen og løs.</b> Investoren betaler den prisen som gjør at avkastningen etter formuesskatt akkurat er 4 %:</p><p>(5 − 0,01 × V)/V = 0,04<br>5/V − 0,01 = 0,04<br>5/V = 0,05<br>V = 5/0,05 = <b>100</b></p><p><b>Steg 4 — hvorfor det ble slik, generelt.</b> Skriv betingelsen med bokstaver, med τ<sub>w</sub> som formuesskattesats og r som avkastning før formuesskatt:</p><p>(CF − τ<sub>w</sub>V)/V = r − τ<sub>w</sub>  ⟺  CF/V − τ<sub>w</sub> = r − τ<sub>w</sub>  ⟺  <b>V = CF/r</b></p><p>Leddet τ<sub>w</sub> står på begge sider og stryker seg selv. Når formuesskatten treffer både investeringen og alternativet like hardt, og treffer begge på markedsverdien, er den <b>nøytral i verdsettingen</b>. Den senker investorens avkastning fra 5 % til 4 %, men ikke prisen han er villig til å betale.</p><p><b>Kontroll.</b> Sett V = 100 inn igjen: formuesskatt 1 million, netto kontantstrøm 5 − 1 = 4, avkastning 4/100 = 4 % — nøyaktig alternativkostnaden. Prisen er selvkonsistent. ✓</p><p><b>Når blir svaret et annet?</b> Bare hvis alternativet <i>ikke</i> rammes av samme formuesskatt. Da beholder du 5 % i nevneren og får (5 − 0,01V)/V = 0,05, altså V = CF/(r + τ<sub>w</sub>) = 5/0,06 = 83,3 millioner. Legg merke til at 83,3 <b>ikke er et alternativ</b> — nettopp fordi denne oppgaven har justert alternativkostnaden. Havner du på 83,3, har du glemt delspørsmål b.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>95 millioner</b> — «formuesskatten må jo ta litt av verdien», altså 100 − 5. Det er magefølelsen oppgaven er laget for å knuse: den tar av avkastningen, ikke av prisen.</p><p><b>50 millioner</b> — 5/0,10. Du har doblet avkastningskravet, eller trukket formuesskatten fra i telleren <i>og</i> lagt den til i nevneren. Dobbelttelling av samme skatt.</p><p><b>200 millioner</b> — igjen prisen på den første investeringen.</p><p><b>Regelen.</b> Verdsett alltid med en kontantstrøm og en diskonteringsrente som er på <i>samme</i> skattenivå. Er begge etter formuesskatt, forsvinner formuesskatten ut av prisen: V = CF/r. Er bare kontantstrømmen justert, får du V = CF/(r + τ<sub>w</sub>).</p>",
        },
      ],
    },
    /* ---------------------------------------------------------------- 4 --- */
    {
      n: 4,
      title: "Ubenyttet skjerming framført til året etter",
      points: 1,
      topic: "Skjerming",
      chapters: [5],
      body: "<p>Sindre eier en aksje i selskapet AS Gruve. Aksjen ble kjøpt 1. februar 2023 for kroner 100 og han hadde rett til utbytte i 2023 men selskapet betalte ikke utbytte dette året. Skjermingsrenten var 3,5 % i 2023. Sindre mottok utbytte i 2024 på kroner 20. Skjermingsrenten i 2024 var 4 %.</p><p>Hva er skattepliktig utbytte for Sindre i 2024? Benytt to desimaler i svaret.</p>",
      options: ["Kr 16,12", "Kr 13,64", "Kr 12,36", "Kr 11,50"],
      answer: 2,
      solution: "<p>Dette er kursets signaturoppgave, og hele poenget ligger i at ubenyttet skjerming gjør <b>to</b> ting samtidig: den framføres som eget fradrag, <i>og</i> den legges til skjermingsgrunnlaget slik at neste års fradrag blir større.</p><p><b>Steg 1 — skjermingsfradraget i 2023.</b> Skjermingsgrunnlaget er aksjens inngangsverdi, kr 100. Fradraget er 100 × 3,5 % = <b>3,50</b>. Selskapet betalte ikke utbytte, så hele beløpet står ubrukt og framføres.</p><p><b>Steg 2 — skjermingsgrunnlaget i 2024.</b> Ubenyttet skjerming legges til grunnlaget: 100 + 3,50 = <b>103,50</b>. Dette leddet er hele fellen.</p><p><b>Steg 3 — skjermingsfradraget i 2024.</b> 103,50 × 4 % = <b>4,14</b>.</p><p><b>Steg 4 — skattepliktig utbytte.</b> Utbyttet reduseres med både den framførte skjermingen og årets fradrag:</p><table class=\"data\"><tr><th>Post</th><th>Beløp</th></tr><tr><td>Utbytte 2024</td><td class=\"n\">20,00</td></tr><tr><td>− ubenyttet skjerming fra 2023</td><td class=\"n\">−3,50</td></tr><tr><td>− skjermingsfradrag 2024 (103,50 × 4 %)</td><td class=\"n\">−4,14</td></tr><tr><td><b>Skattepliktig utbytte</b></td><td class=\"n\"><b>12,36</b></td></tr></table><p><b>Kontroll 1 — la grunnlaget vokse.</b> Skjermingsgrunnlaget vokser med skjermingsrenten hvert år det ikke tas utbytte: 100 × 1,035 × 1,04 = 107,64. Samlet skjerming å bruke i 2024 er da 107,64 − 100 = <b>7,64</b>, som er nøyaktig 3,50 + 4,14. 20 − 7,64 = 12,36. ✓</p><p><b>Kontroll 2 — den framførte skjermingen forrenter seg.</b> 3,50 × 1,04 = 3,64, og grunnkostprisen gir 100 × 4 % = 4,00. Sammen 7,64. Samme svar, tredje vei. ✓ Det er dette som menes med at framført skjerming «forrentes»: den gir selv skjerming året etter.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 16,12</b> ligger i «du trakk bare fra ett av de to fradragene»-båndet. Trekker du bare fra den ubenyttede skjermingen får du 20 − 3,50 = 16,50; trekker du bare fra årets fradrag får du 20 − 4,00 = 16,00 eller 20 − 4,14 = 15,86. Alternativet er lagt midt i denne klyngen, slik at alle tre feilene lander på det.</p><p><b>Kr 13,64</b> og <b>Kr 11,50</b> svarer ikke til noen ren regnevei. De er nærmeste-nabo-lokkemidler på hver sin side av riktig svar, laget for å fange feiltasting og halvveis avrunding. Skriv derfor alltid ned mellomresultatene 3,50, 103,50 og 4,14 før du taster den siste subtraksjonen.</p><p><b>Feilen som ikke har noe alternativ.</b> Regner du årets skjerming på kostprisen i stedet for på det oppjusterte grunnlaget, får du 100 × 4 % = 4,00 og 20 − 3,50 − 4,00 = <b>12,50</b>. Det er den aller vanligste feilen i dette temaet, og den står ikke i listen. Får du 12,50, mangler du bare påslaget av den framførte skjermingen i grunnlaget — riktig svar er 12,36.</p><p><b>Regelen.</b> Ubenyttet skjerming framføres på den enkelte aksjen, legges til skjermingsgrunnlaget neste år, og trekkes fra utbyttet <i>i tillegg til</i> årets skjermingsfradrag. Skjermingsfradraget kan aldri gjøre skattepliktig utbytte negativt; overskytende framføres videre.</p>",
    },

    /* ---------------------------------------------------------------- 5 --- */
    {
      n: 5,
      title: "Effektiv skattesats når avskrivningen senker grunnlaget",
      points: 1,
      topic: "Effektiv skattesats",
      chapters: [1, 2],
      body: "<p>Et aksjeselskap har driftsinntekter i år 1 på kr 100 000 og har kjøpt en maskin til kr 50 000 som skal avskrives over 2 år med 25 000 i år 1 og 25 000 i år 2. Bedriftsskattesatsen er 22 %.</p><p>Hva er den effektive skattesatsen til bedriften i år 1?</p>",
      options: ["22 %", "20,5 %", "16,5 %", "18,4 %"],
      answer: 2,
      solution: "<p><b>Steg 1 — skattepliktig overskudd.</b> Driftsinntekt minus avskrivning: 100 000 − 25 000 = <b>75 000</b>.</p><p><b>Steg 2 — betalt skatt.</b> 75 000 × 22 % = <b>16 500</b>.</p><p><b>Steg 3 — effektiv skattesats.</b> Definisjonen er betalt skatt delt på <b>brutto inntekt</b>, ikke på skattepliktig inntekt:</p><p>16 500/100 000 = 0,165 = <b>16,5 %</b></p><p><b>Kontroll.</b> Regn det som en formel i stedet for i kroner: effektiv sats = t × (1 − avskrivning/bruttoinntekt) = 22 % × (1 − 25 000/100 000) = 22 % × 0,75 = 16,5 %. ✓ Avskrivningen tar en firedel av grunnlaget, og dermed en firedel av skattesatsen.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>22 %</b> — dette er selve feilen oppgaven tester. Deler du betalt skatt på <i>skattepliktig</i> inntekt, får du 16 500/75 000 = 22 %, altså den nominelle satsen igjen, og målet blir meningsløst: da vil den effektive satsen alltid være lik den nominelle. Nevneren må være brutto inntekt.</p><p><b>20,5 %</b> og <b>18,4 %</b> — svarer ikke til noen regnevei. De er plassert mellom 16,5 % og 22 % for å friste den som skjønner at svaret må ligge <i>under</i> 22 %, men ikke har regnet ferdig. Nettopp derfor er det viktig å fullføre regnestykket: å vite retningen er ikke nok når tre alternativer peker samme vei.</p><p><b>Feilen som ikke har noe alternativ.</b> Fører du hele maskinen på 50 000 til fradrag i år 1, får du (100 000 − 50 000) × 22 %/100 000 = 11 %. Det står ikke i listen. Oppgaven sier uttrykkelig at avskrivningen er 25 000 i hvert av de to årene.</p><p><b>Regelen.</b> Effektiv skattesats = betalt skatt / bruttoinntekt. Ethvert fradrag som ikke er en faktisk utbetaling i perioden — avskrivninger, framførte underskudd, skjerming — trekker den effektive satsen under den nominelle. For en eier tar du med både selskapsskatten og eierskatten i telleren og selskapets bruttooverskudd i nevneren.</p><p><b>Merk tidsprofilen.</b> I år 2 gjentar det samme seg hvis inntekten er den samme: 16,5 %. Over de to årene til sammen er skatten 33 000 av 200 000 i bruttoinntekt, altså også 16,5 %. Avskrivningen flytter ikke skatt mellom år her, den er jevnt fordelt; det er lineær avskrivning, ikke saldoavskrivning.</p>",
    },

    /* ---------------------------------------------------------------- 6 --- */
    {
      n: 6,
      title: "Utbyttet som må til for å betale formuesskatten",
      points: 1,
      topic: "Formuesskatt som avkastningsskatt",
      chapters: [8],
      body: "<p>Erna eier en bedrift som har formuesverdi på kr 100 000. Hun må betale 1 % i formuesskatt av formuesverdien. Hun har likviditetsutfordringer og må ta utbytte for å betale formuesskatten. Samtidig må hun sikre at utbyttet er stort nok til å betale eierskatten på 50 %.</p><p>Hvor stort utbytte må Erna ta for å dekke både formuesskatten og skatt på utbytte? Du kan se bort fra skjermingsfradrag, aksjerabatt på formuesverdi og bunnfradrag.</p>",
      options: ["Kr 2500", "Kr 2000", "Kr 1500", "Kr 1600"],
      answer: 1,
      solution: "<p><b>Steg 1 — hva regningen er.</b> Formuesskatt = 100 000 × 1 % = <b>kr 1 000</b>. Det er beløpet Erna må ha i hånden <i>etter</i> at utbyttet er beskattet.</p><p><b>Steg 2 — hva et utbytte gir henne netto.</b> Av et utbytte D betaler hun 50 % i eierskatt og beholder D × (1 − 50 %) = 0,5D.</p><p><b>Steg 3 — sett kravet og løs.</b></p><p>0,5 × D = 1 000  ⟹  D = 1 000/(1 − 0,50) = <b>kr 2 000</b></p><p><b>Kontroll.</b> Ta ut 2 000: eierskatt 2 000 × 50 % = 1 000, igjen 1 000, som er nøyaktig formuesskatten. ✓ Samlet skattebelastning på formuen er 2 000 av en formuesverdi på 100 000, altså <b>2 %</b> — dobbelt så mye som den nominelle formuesskattesatsen, fordi hver krone formuesskatt må hentes gjennom en utbyttebeskatning.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 1500</b> — du har lagt skatten <i>til</i> i stedet for å regne oppover: 1 000 × (1 + 50 %) = 1 500. Test det: et utbytte på 1 500 gir 750 etter eierskatt, og da mangler du 250 kroner på formuesskatten. Å gange opp med (1 + t) er ikke det samme som å dele på (1 − t), og forskjellen vokser fort med satsen.</p><p><b>Kr 2500</b> — 1 000/(1 − 0,60). Du har brukt 60 % i stedet for oppgavens 50 %.</p><p><b>Kr 1600</b> — 1 000/(1 − 0,3784) = 1 609, altså dagens eierskatt på 37,84 % (22 % × 1,72) i stedet for de 50 % oppgaven oppgir. Dette er den lærerike fellen i oppgaven: <b>bruk satsen som står i oppgaveteksten, ikke den du har pugget.</b> Med 2026-satsene ville svaret på nøyaktig samme spørsmål vært kr 1 609.</p><p><b>Regelen.</b> D = τ<sub>w</sub> × W/(1 − t<sub>e</sub>). Uttrykt som andel av formuen: den samlede belastningen blir τ<sub>w</sub>/(1 − t<sub>e</sub>), her 1 %/0,5 = 2 % av formuesverdien. Dette er forelesningens hovedargument mot formuesskatt for eiere uten likvide midler: skatten må finansieres med utbytte, og utbyttet beskattes igjen.</p>",
    },
    /* ---------------------------------------------------------------- 7 --- */
    {
      n: 7,
      title: "Bedriftens førsteordensbetingelse med delvis rentefradrag",
      points: 3,
      topic: "Bedriftens tilpasning",
      chapters: [9],
      body: "<p>En bedrift har profittfunksjonen P = F(K) − rK, hvor K er kapitalinnsatsen, F(K) er bedriftens inntekt gitt ved F(K) som har egenskapene F&prime;(K) &gt; 0 og F&Prime;(K) &lt; 0. Rentekostnaden for bruk av kapital er r. Skattefuten tillater bedriften å trekke fra en andel av rentene lik 0 &lt; A &lt; 1 fra inntekten F(K). La t være bedriftsskattesatsen.</p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Hvordan tilpasser bedriften optimal investering av kapital (K)?</p>",
          options: [
            "F&prime;(K) = r",
            "F&prime;(K) = <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">rA</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">1 &minus; t</span></span>",
            "F&prime;(K) = r · <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">1 &minus; At</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">1 &minus; t</span></span>",
            "F&prime;(K) = <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">r</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">(1 &minus; t)A</span></span>",
          ],
          answer: 2,
          solution: "<p><b>Steg 1 — sett opp verdien etter skatt.</b> Bedriften betaler hele rentekostnaden rK, men får bare trekke fra andelen A av den i skattegrunnlaget. Skattegrunnlaget er derfor F(K) − ArK, og verdien etter skatt er</p><p>V = F(K) − rK − t[F(K) − ArK]</p><p>Legg merke til at rK står to steder med to ulike roller: hele beløpet som faktisk kostnad, og bare andelen A som fradrag.</p><p><b>Steg 2 — deriver med hensyn på K og sett lik null.</b></p><p>dV/dK = F&prime;(K) − r − t[F&prime;(K) − rA] = 0</p><p><b>Steg 3 — samle leddene.</b></p><p>F&prime;(K)(1 − t) = r − trA = r(1 − At)<br>F&prime;(K) = r(1 − At)/(1 − t)</p><p><b>Kontroll med grensetilfellene — dette er også utelukkingsrutinen på eksamen.</b> Sett inn de to ytterpunktene for A og se hvilke alternativer som overlever:</p><table class=\"data\"><tr><th>Tilfelle</th><th>Riktig svar skal gi</th><th>r(1 − At)/(1 − t)</th></tr><tr><td>A = 1 (fullt rentefradrag)</td><td class=\"n\">r — skatten er nøytral</td><td class=\"n\">r(1 − t)/(1 − t) = r ✓</td></tr><tr><td>A = 0 (intet rentefradrag)</td><td class=\"n\">r/(1 − t) — høyere krav</td><td class=\"n\">r/(1 − t) ✓</td></tr></table><p>Med t = 22 % og A = 0,5 blir kravet r × (1 − 0,11)/0,78 = 1,141r, altså 14,1 % høyere marginalprodukt enn uten skatt. Uttrykket faller i A: jo mer av renten som er fradragsberettiget, jo lavere avkastningskrav og jo mer kapital brukes.</p><p><b>Hvorfor de gale alternativene er gale.</b> Grensetesten avslører alle tre:</p><p><b>F&prime;(K) = r</b> — dette er bare riktig i spesialtilfellet A = 1, altså full fradragsrett. Oppgaven sier uttrykkelig 0 &lt; A &lt; 1, så nøytralitet er utelukket.</p><p><b>F&prime;(K) = rA/(1 − t)</b> — sett A = 1 og du får r/(1 − t), altså svaret for <i>ingen</i> fradragsrett. Sett A = 0 og du får null: bedriften skulle investere til marginalproduktet er null når renten ikke kan trekkes fra. Begge grensene er snudd på hodet.</p><p><b>F&prime;(K) = r/[(1 − t)A]</b> — sett A = 1 og du får igjen r/(1 − t), som skulle vært r. Sett A → 0 og kravet går mot uendelig. Uttrykket vokser når fradragsretten bedres, som er feil vei.</p><p><b>Regelen.</b> Med skattesats t og fradragsandel A på rentene er kapitalkravet F&prime;(K) = r(1 − At)/(1 − t), som ligger mellom r (full fradragsrett, nøytralt) og r/(1 − t) (ingen fradragsrett, underinvestering). Nøytralitet krever at kapitalkostnaden er fradragsberettiget i samme grad som inntekten er skattepliktig.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>Anta at bedriften bruker både egenkapital (E) og gjeld (G) slik at K = E + G. Anta videre at gjeldskostnaden er r, og at bedriften ikke får trekke fra kostnadene knyttet til bruk av egenkapital. Hvordan tilpasser bedriften bruken av gjeld og egenkapital?</p>",
          options: [
            "F&prime;<sub>G</sub> = r og F&prime;<sub>E</sub> = r",
            "F&prime;<sub>G</sub> = r(1 &minus; t) og F&prime;<sub>E</sub> = r",
            "F&prime;<sub>G</sub> = <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">r</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">1 &minus; t</span></span> og F&prime;<sub>E</sub> = r(1 &minus; t)",
            "F&prime;<sub>G</sub> = r og F&prime;<sub>E</sub> = <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">r</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">1 &minus; t</span></span>",
          ],
          answer: 3,
          solution: "<p><b>Steg 1 — verdien etter skatt med to finansieringskilder.</b> Bare gjeldsrenten rG er fradragsberettiget; alternativkostnaden rE på egenkapitalen er en reell kostnad, men ingen skattemessig utgift:</p><p>V = F(E + G) − r(E + G) − t[F(E + G) − rG]</p><p><b>Steg 2 — førsteordensbetingelsen for gjeld.</b></p><p>∂V/∂G = F&prime;<sub>G</sub> − r − t(F&prime;<sub>G</sub> − r) = (1 − t)(F&prime;<sub>G</sub> − r) = 0  ⟹  <b>F&prime;<sub>G</sub> = r</b></p><p>De to t-ene stryker hverandre: inntekten fra den gjeldsfinansierte kronen beskattes med t, og renten på den samme kronen gir fradrag med t. Skatten er nøytral på margen for gjeld.</p><p><b>Steg 3 — førsteordensbetingelsen for egenkapital.</b></p><p>∂V/∂E = F&prime;<sub>E</sub> − r − tF&prime;<sub>E</sub> = 0  ⟹  F&prime;<sub>E</sub>(1 − t) = r  ⟹  <b>F&prime;<sub>E</sub> = r/(1 − t)</b></p><p>Her beskattes inntekten, men det er ingen fradrag som motvirker. Bedriften må tjene r/(1 − t) før skatt for å sitte igjen med r etter skatt. Med t = 22 % er kravet r/0,78 = 1,282r, altså 28,2 % høyere enn for en gjeldsfinansiert krone.</p><p><b>Kontroll mot delspørsmål a.</b> Les A i deloppgave a som gjeldsandelen G/K når gjeldsrenten er fullt fradragsberettiget. Da sier a at F&prime;(K) = r(1 − (G/K)t)/(1 − t). Sett G/K = 1 (bare gjeld): F&prime; = r ✓. Sett G/K = 0 (bare egenkapital): F&prime; = r/(1 − t) ✓. De to delspørsmålene er samme modell sett fra to kanter.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>F&prime;<sub>G</sub> = r og F&prime;<sub>E</sub> = r</b> — ingen skatteforskjell mellom finansieringsformene. Det ville krevd at også egenkapitalkostnaden var fradragsberettiget (en såkalt ACE-modell). Oppgaven sier det motsatte.</p><p><b>F&prime;<sub>G</sub> = r(1 − t) og F&prime;<sub>E</sub> = r</b> — den vanligste feilen, og verdt å forstå: r(1 − t) er gjeldens <i>kostnad etter skatt</i>, ikke det <i>krevde marginalproduktet før skatt</i>. Fordi inntekten også beskattes med t, må du sammenligne før-skatt med før-skatt. Da blir kravet r, ikke r(1 − t). Å blande et etter-skatt-tall med et før-skatt-tall er den ene feilen som gjentar seg i hele skattedelen av dette kurset.</p><p><b>F&prime;<sub>G</sub> = r/(1 − t) og F&prime;<sub>E</sub> = r(1 − t)</b> — de to snudd. Den sier at egenkapital er billigst, som er stikk i strid med at bare renter er fradragsberettiget.</p><p><b>Regelen.</b> Når bare gjeldsrenter er fradragsberettiget, er avkastningskravet før skatt r for gjeldsfinansiert kapital og r/(1 − t) for egenkapitalfinansiert kapital. Skattesystemet subsidierer gjeld på margen.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>La * angi profittmaksimerende mengde av gjeld (G*) og egenkapital (E*). Basert på dine svar på spørsmål 2 over, hvilke av alternativene under er riktig?</p>",
          options: ["E* &gt; G*", "E* = G*", "E* &lt; G*", "(1/2)E* &gt; G*"],
          answer: 2,
          solution: "<p><b>Steg 1 — bruk at F er konkav.</b> F&Prime;(K) &lt; 0 betyr at marginalproduktet <i>faller</i> når innsatsen øker. Snudd rundt: jo høyere marginalprodukt som kreves, jo mindre av innsatsfaktoren brukes.</p><p><b>Steg 2 — sammenlign de to kravene fra b.</b> Siden 0 &lt; t &lt; 1 er 1/(1 − t) &gt; 1, og dermed</p><p>F&prime;<sub>E</sub> = r/(1 − t) &gt; r = F&prime;<sub>G</sub></p><p><b>Steg 3 — les av mengdene.</b> Egenkapital møter det høyeste kravet, altså brukes det minst av: <b>E* &lt; G*</b>. Med t = 22 % må den siste egenkapitalkronen tjene 28,2 % mer enn den siste gjeldskronen for å være verdt å bruke.</p><p><b>Mekanismen i én setning.</b> Alternativkostnaden til egenkapitalen kan ikke trekkes fra i skattepliktig inntekt, mens gjeldsrenten kan det. Derfor er egenkapital dyrere, og bedriften velger gjeld på margen.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>E* &gt; G*</b> — motsatt konklusjon. Den følger av å tro at fradragsretten gjør egenkapital billigere, eller av å ha svart feil i b.</p><p><b>E* = G*</b> — krever at de to førsteordensbetingelsene er like, altså at t = 0. Med skatt er de aldri like.</p><p><b>(1/2)E* &gt; G*</b> — dette sier E* &gt; 2G*, altså en enda sterkere versjon av feil retning. Modellen gir dessuten ingen tallfestet faktor mellom E* og G*, bare en ulikhet. Et alternativ som påstår et bestemt forholdstall uten at noe i oppgaven fastsetter det, kan nesten alltid strykes med en gang.</p><p><b>Forbeholdet du bør kjenne.</b> Fordi F er en funksjon av K = E + G alene, er marginalproduktet i realiteten det samme uansett hvilken krone som finansierer det, og de to betingelsene kan ikke holde samtidig. Modellen peker derfor mot en hjørneløsning: mest mulig gjeld. Det som stopper hjørnet i virkeligheten er konkurskostnader, långivernes krav om egenkapital og rentebegrensningsregler. Eksamenssvaret er likevel den relative sammenligningen: egenkapital er dyrere, derfor brukes det mindre av den.</p>",
        },
      ],
    },

    /* ---------------------------------------------------------------- 8 --- */
    {
      n: 8,
      title: "Stykkskatt: hvem bærer skatten når elastisitetene er ekstreme",
      points: 3,
      topic: "Skatteincidens",
      chapters: [11],
      body: "<p>Anta et frikonkurransemarked hvor tilbud er lik etterspørsel og likevektsprisen er kr 1,50 og at myndighetene ilegger bedriftene (tilbyderne) en skatt pr enhet solgt på kr 0,5.</p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Anta at etterspørselen er perfekt uelastisk mens tilbudet er elastisk. Hva blir ny likevektspris for konsumentene?</p>",
          options: ["kr 3,50", "kr 2,50", "kr 2", "kr 3"],
          answer: 2,
          solution: "<p><b>Notasjonen først, den er halve oppgaven.</b> P er prisen konsumentene betaler, p er prisen produsentene sitter igjen med, og skatten kiler dem fra hverandre: <b>P = p + t</b> med t = kr 0,50. Likevekten er D(P) = S(P − t).</p><p><b>Steg 1 — deriver likevekten med hensyn på skatten.</b> D&prime;·dP = S&prime;·(dP − dt), som gir</p><p>dP/dt = S&prime;/(S&prime; − D&prime;)  og  dp/dt = D&prime;/(S&prime; − D&prime;)</p><p>De to summerer til 1: hele skatten fordeles mellom de to prisene.</p><p><b>Steg 2 — sett inn perfekt uelastisk etterspørsel.</b> Da er D&prime; = 0, og</p><p>dP/dt = S&prime;/(S&prime; − 0) = <b>1</b>,  dp/dt = 0/(S&prime; − 0) = <b>0</b></p><p><b>Steg 3 — les av tallene.</b> Konsumentprisen stiger med hele skatten: P = 1,50 + 0,50 = <b>kr 2,00</b>. Produsentprisen er uendret på kr 1,50. Produsentene tar imot 2,00 fra kunden, betaler 0,50 til staten og beholder 1,50, akkurat som før.</p><p><b>Mekanismen.</b> Perfekt uelastisk etterspørsel betyr at kvantumet ikke faller uansett pris. Da har produsentene ingenting å tape på å velte hele skatten over. <b>Den minst elastiske siden bærer skatten</b>, og her er den siden uendelig lite elastisk.</p><p><b>Kontroll — og den raskeste utelukkingen på hele eksamen.</b> Med stigende tilbudskurve kan konsumentprisen aldri stige med <i>mer</i> enn skatten. Øvre grense er 1,50 + 0,50 = 2,00. Alternativene <b>kr 2,50</b>, <b>kr 3</b> og <b>kr 3,50</b> ligger alle over denne grensen og er umulige uansett elastisiteter. Du kan altså krysse av riktig svar uten å regne, bare ved å kjenne grensen.</p><p><b>Hvorfor de gale alternativene er gale.</b> <b>kr 2,50</b> er skatten lagt på to ganger (1,50 + 0,50 + 0,50). <b>kr 3</b> er likevektsprisen doblet. <b>kr 3,50</b> er begge deler. Alle tre bygger på at en skatt på 0,50 kan løfte prisen med mer enn 0,50, som den ikke kan.</p><p><b>Regelen.</b> dP/dt = ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) i elastisitetsform. Er etterspørselen perfekt uelastisk (ε<sub>D</sub> = 0), bærer konsumentene alt; er tilbudet perfekt uelastisk, bærer produsentene alt.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>Anta nå at etterspørselen er perfekt elastisk mens tilbudet er elastisk. Hva blir likevektsprisen for konsumentene etter at skatten er innført?</p>",
          options: ["Kr 2", "Kr 1,50", "Kr 1", "Kr 2,50"],
          answer: 1,
          solution: "<p><b>Steg 1 — hva perfekt elastisk etterspørsel betyr.</b> Etterspørselskurven er en vannrett linje i kr 1,50: konsumentene kjøper alt som tilbys til denne prisen, og ingenting til en høyere. D&prime; → −∞.</p><p><b>Steg 2 — sett inn i formelen.</b></p><p>dP/dt = S&prime;/(S&prime; − D&prime;) → S&prime;/(S&prime; + ∞) = <b>0</b></p><p><b>Steg 3 — les av.</b> Konsumentprisen er <b>uendret på kr 1,50</b>. Hele skatten bæres av produsentene, som får 1,50 − 0,50 = 1,00 (det er neste delspørsmål).</p><p><b>Mekanismen.</b> Prisen kan ikke stige, for da forsvinner all etterspørsel. Det som skjer i stedet er at kvantumet faller: de minst effektive tilbyderne, som ikke tåler 1,00 netto, trekker seg ut. Merk at <b>skatten er lagt på tilbyderne i begge delspørsmålene</b>, men i a bærer konsumentene alt og her ingenting. Hvem som betaler inn skatten til staten sier ingenting om hvem som faktisk bærer den.</p><p><b>Kontroll.</b> dP/dt + |dp/dt| = 0 + 1 = 1. Hele skatten er fordelt, og den ligger i sin helhet hos produsentene. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 2</b> — svaret på forrige delspørsmål. Elastisitetene er byttet om mellom a og b, og hvis du ikke leser den ene setningen som skiller dem, tar du med deg 2,00 hit. Dette er den mest kostbare enkeltfeilen i settet.</p><p><b>Kr 1</b> — svaret på neste delspørsmål, altså <i>produsentprisen</i>. Spørsmålet gjelder prisen for konsumentene.</p><p><b>Kr 2,50</b> — over den øvre grensen 1,50 + 0,50 og dermed umulig.</p><p><b>Regelen.</b> Perfekt elastisk etterspørsel ⟹ konsumentprisen er upåvirket, produsentene bærer hele skatten. Dette er den lille åpne økonomien i skatteteorien: er kjøperne perfekt mobile, kan de ikke skattlegges.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Anta nå at etterspørselen er perfekt elastisk og mens tilbudet er elastisk. Hva blir prisen tilbyderne (produsentene) får etter innføringen av skatten?</p>",
          options: ["Kr 1,50", "Kr 1", "Kr 2", "Kr 2,50"],
          answer: 1,
          solution: "<p><b>Steg 1 — bruk kilen.</b> P = p + t, altså p = P − t. Fra forrige delspørsmål er P uendret på 1,50.</p><p><b>Steg 2 — regn.</b> p = 1,50 − 0,50 = <b>kr 1,00</b>.</p><p><b>Steg 3 — formelen sier det samme.</b> dp/dt = D&prime;/(S&prime; − D&prime;) → med D&prime; → −∞ blir brøken −∞/(+∞) = −1. Produsentprisen faller med hele skatten.</p><p><b>Kontroll.</b> Regnskapet skal gå opp: konsumenten betaler 1,50, staten får 0,50, produsenten beholder 1,00. 1,00 + 0,50 = 1,50 ✓. Og fordelingen summerer til én: konsumentene bærer 0, produsentene bærer 0,50, til sammen skatten.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 1,50</b> — konsumentprisen, altså svaret på delspørsmål b. Dette er settets tydeligste par av speilalternativer: b og c har hverandres fasit i alternativlisten. Skriv alltid ned <i>hvilken</i> pris spørsmålet ber om før du regner.</p><p><b>Kr 2</b> og <b>Kr 2,50</b> — begge er høyere enn prisen før skatt. En skatt på tilbyderne kan aldri løfte prisen tilbyderne <i>får</i>; den kan bare senke den. To alternativer strykes altså på fortegn alene, og med minuspoeng er det nok til at det lønner seg å svare selv om du er usikker mellom de to siste.</p><p><b>Regelen.</b> Skattekilen fordeles etter elastisiteter: den siden som er minst elastisk, bærer mest. Produsentprisen faller med t·|ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|), her hele skatten fordi etterspørselen er perfekt elastisk.</p>",
        },
      ],
    },
    /* ---------------------------------------------------------------- 9 --- */
    {
      n: 9,
      title: "Formuesskatt og gevinstskatt med samme proveny",
      points: 1,
      topic: "Formuesskatt som avkastningsskatt",
      chapters: [8],
      body: "<p>La W = 100 være initial formue ved periodens begynnelse og la r = 5 % være kapitalavkastningen som realiseres på slutten av perioden. Anta at formuesskatten er T = 1 % og at den faller på formue ved periodens begynnelse. Hvor høy må skatten på kapitalgevinst definert ved t være for at de to skattene skal gi samme proveny?</p>",
      options: ["22 %", "23 %", "20 %", "21 %"],
      answer: 2,
      solution: "<p><b>Steg 1 — skriv opp de to provenyene.</b> Formuesskatten treffer formuen ved <i>inngangen</i> til perioden, altså W = 100:</p><p>Formuesskatt: W × T = 100 × 1 % = <b>1</b></p><p>Gevinstskatten treffer avkastningen som realiseres i løpet av perioden, altså Wr = 100 × 5 % = 5:</p><p>Gevinstskatt: W × r × t = 5t</p><p><b>Steg 2 — sett dem like og løs.</b></p><p>W·T = W·r·t  ⟹  T = r·t  ⟹  <b>t = T/r = 1 %/5 % = 20 %</b></p><p>Legg merke til at W stryker seg selv. Ekvivalensen avhenger bare av forholdet mellom skattesatsen og avkastningen, ikke av hvor stor formuen er.</p><p><b>Kontroll.</b> Med t = 20 % blir gevinstskatten 100 × 0,05 × 0,20 = 1,00, nøyaktig lik formuesskatten på 1,00. ✓ Og kryss-sjekk mot oppgave 3 i samme sett: der falt avkastningen fra 5 % til 4 % da formuesskatten på 1 % kom til. Det er et kutt på 1 av 5, altså 20 % av avkastningen. Samme tall, samme mekanisme, to helt ulike innpakninger.</p><p><b>Hvorfor dette er kursets viktigste enkeltinnsikt.</b> En formuesskatt <i>er</i> en avkastningsskatt, med effektiv sats τ<sub>w</sub>/r. Fordi r står i nevneren, blir den effektive satsen høyere jo lavere avkastningen er:</p><table class=\"data\"><tr><th>Avkastning r</th><th>Ekvivalent gevinstskatt T/r</th></tr><tr><td>10 %</td><td class=\"n\">10 %</td></tr><tr><td>5 %</td><td class=\"n\">20 %</td></tr><tr><td>2 %</td><td class=\"n\">50 %</td></tr><tr><td>1 %</td><td class=\"n\">100 %</td></tr><tr><td>0 %</td><td class=\"n\">uendelig — skatten betales av selve formuen</td></tr></table><p>Det er dette forelesningen mener med at formuesskatten er en skatt som ikke tar hensyn til om det er noe å skatte av: en eier med lav eller negativ avkastning betaler like mye som en med høy.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>21 %</b> — den beste fellen i settet. Den framkommer hvis du lar formuesskatten falle på formuen ved <i>slutten</i> av perioden: 100 × 1,05 = 105, skatt 105 × 1 % = 1,05, og 1,05/5 = 21 %. Oppgaveteksten sier uttrykkelig «faller på formue ved periodens begynnelse». Én setning i oppgaven skiller 20 % fra 21 %.</p><p><b>22 %</b> — satsen på alminnelig inntekt. Den er der fordi tallet er kjent og fristende, ikke fordi den følger av noe her. Den ville krevd et formuesgrunnlag på 110.</p><p><b>23 %</b> — svarer ikke til noen regnevei; nærmeste-nabo-lokkemiddel over 22 %.</p><p><b>Regelen.</b> t = τ<sub>w</sub>/r er den gevinstskattesatsen som gir samme proveny som en formuesskatt på inngående formue. Snudd rundt: en avkastningsskatt t tilsvarer en formuesskatt på r·t.</p>",
    },

    /* --------------------------------------------------------------- 10 --- */
    {
      n: 10,
      title: "Gevinstbeskatning med ubenyttet skjerming og oppjustering",
      points: 1,
      topic: "Aksjonærmodellen",
      chapters: [5],
      body: "<p>Runar kjøpte en aksje for kr 100 i år 1 og selger den på slutten av år 2 for kr 160. Han har et ubenyttet skjermingsfradrag på kr 10 fra år 1. Hva betaler Runar i skatt på aksjegevinsten sin? Eierskatten er 22 % og oppjusteringsfaktoren 1,72.</p>",
      options: ["Kr 3,89", "Kr 11", "Kr 18,2", "Kr 18,92"],
      answer: 3,
      solution: "<p><b>Steg 1 — finn den skattepliktige gevinsten.</b> Salgspris minus kostpris minus framført ubenyttet skjerming:</p><table class=\"data\"><tr><th>Post</th><th>Beløp</th></tr><tr><td>Salgspris</td><td class=\"n\">160</td></tr><tr><td>− kostpris (inngangsverdi)</td><td class=\"n\">−100</td></tr><tr><td>− ubenyttet skjerming fra år 1</td><td class=\"n\">−10</td></tr><tr><td><b>Skattepliktig gevinst</b></td><td class=\"n\"><b>50</b></td></tr></table><p><b>Steg 2 — oppjuster og skattlegg. Regn begge veier, det er kontrollen.</b></p><p>Vei 1, oppjuster grunnlaget: 50 × 1,72 = 86, og 86 × 22 % = <b>18,92</b>.<br>Vei 2, oppjuster satsen: 1,72 × 22 % = 37,84 %, og 50 × 37,84 % = <b>18,92</b>. ✓</p><p>De to veiene skal alltid gi samme tall. Får de ikke det, har du oppjustert to ganger et sted.</p><p><b>To regler som ligger under.</b> For det første: <b>i salgsåret gis det ikke skjermingsfradrag</b> — skjerming tilordnes den som eier aksjen ved utgangen av året. Framført ubenyttet skjerming kan derimot trekkes fra gevinsten. For det andre: ubenyttet skjerming kan redusere en gevinst til null, men den kan ikke skape eller øke et tap.</p><p><b>Kontroll.</b> Runar sitter igjen med 50 − 18,92 = 31,08 av gevinsten, altså 62,16 %, som er (1 − 37,84 %). ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 11</b> — 50 × 22 %, altså oppjusteringen glemt. Dette er den ene feilen oppgaven er bygget rundt, og den er verdt å kjenne igjen på formen: svaret er nøyaktig 22/37,84 = 58 % av det riktige. Ser du et alternativ som er omtrent seks tideler av et annet, er det som regel oppjusteringsparet.</p><p><b>Kr 18,2</b> — ligger så tett på riktig svar at det fanger den som bruker en <i>gammel</i> oppjusteringsfaktor eller taster feil. Faktoren har vært 1,44, 1,6 og 1,66 i tidligere år; 1,6 gir 17,60 og 1,66 gir 18,26. Ingen av kursets regneveier gir nøyaktig 18,2. Bruk faktoren som står i oppgaveteksten.</p><p><b>Kr 3,89</b> — feil størrelsesorden. Den ligger nær 10 × 37,84 % = 3,78, altså skatt beregnet på den ubenyttede skjermingen i stedet for på gevinsten. Skjerming er et <i>fradrag</i>, ikke et skattegrunnlag.</p><p><b>Feilen som ikke har noe alternativ.</b> Glemmer du den ubenyttede skjermingen helt, blir gevinsten 60 og skatten 60 × 37,84 % = 22,70. Det tallet finnes ikke i listen, og det er ditt signal om å regne på nytt.</p><p><b>Regelen.</b> Skatt på aksjegevinst = (salgspris − inngangsverdi − framført ubenyttet skjerming) × f × t, med f = 1,72 og t = 22 % i 2026, altså 37,84 % samlet. Oppjuster én gang, enten på grunnlaget eller på satsen.</p>",
    },
    /* --------------------------------------------------------------- 11 --- */
    {
      n: 11,
      title: "Mertons aksjeandel og humankapitalen",
      points: 4,
      topic: "Porteføljevalg",
      chapters: [14],
      body: "<p>Oppgaven har fire delspørsmål som bygger på hverandre. Tallene fra det første delspørsmålet gjelder også i de neste.</p>",
      parts: [
        {
          label: "1",
          points: 1,
          body: "<p>Anta at aksjemarkedets meravkastning over risikofri rente er 0,05, og at markedets varians er 0,10. Ifølge Mertons formel for optimal aksjeandel bør Kari investere 50 prosent av formuen i aksjer. Hva er verdien på risikoaversjonsparameteren (γ) som følger av denne informasjonen?</p>",
          options: ["1", "2", "10", "Umulig å avgjøre"],
          answer: 0,
          solution: "<p><b>Steg 1 — skriv opp formelen.</b> Mertons optimale aksjeandel er</p><p>w* = (μ − r<sub>f</sub>)/(γσ²)</p><p>der μ − r<sub>f</sub> er meravkastningen over risikofri rente, σ² er variansen til aksjemarkedet og γ er risikoaversjonen.</p><p><b>Steg 2 — sett inn og løs for γ.</b> Oppgaven gir μ − r<sub>f</sub> = 0,05, σ² = 0,10 og w* = 0,50:</p><p>0,50 = 0,05/(γ × 0,10)<br>γ × 0,10 × 0,50 = 0,05<br>γ = 0,05/0,05 = <b>1</b></p><p><b>Kontroll.</b> Sett γ = 1 inn igjen: w* = 0,05/(1 × 0,10) = 0,50 = 50 %. ✓ Merk hvor lav risikoaversjonen er: γ = 1 svarer til logaritmisk nytte, og de fleste empiriske anslag ligger på 2–5. Det er selve grunnen til at 50 % aksjer er en <i>lav</i> andel i denne modellen når meravkastningen er 5 % og variansen 0,10.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>10</b> — du har lest 0,10 som <i>standardavviket</i> i stedet for variansen. Da blir σ² = 0,01 og γ = 0,05/(0,50 × 0,01) = 10. Oppgaven sier «markedets varians», og i Merton-formelen står varians, ikke standardavvik. Dette er den ene feilen som gir en faktor 10 i svaret.</p><p><b>2</b> — 0,10/0,05, altså brøken snudd og aksjeandelen glemt. Sjekk alltid ved å sette svaret tilbake i formelen: γ = 2 gir w* = 0,05/(2 × 0,10) = 25 %, ikke 50 %.</p><p><b>Umulig å avgjøre</b> — formelen har fire størrelser, tre er oppgitt, og den fjerde er entydig bestemt. «Umulig å avgjøre» er nesten alltid feil når spørsmålet oppgir akkurat nok tall.</p><p><b>Regelen.</b> w* = (μ − r<sub>f</sub>)/(γσ²). Andelen stiger med meravkastningen og faller med både risikoaversjonen og variansen. Legg merke til at det ikke står noe om tidshorisont i formelen; det blir viktig i fjerde delspørsmål.</p>",
        },
        {
          label: "2",
          points: 1,
          body: "<p>Anta videre at Kari har en finansiell formue på 1 million kroner, og i tillegg en humankapital (nåverdien av fremtidig arbeidsinntekt) verdt 1 million kroner. Fremtidig arbeidsinntekt er helt risikofri. Hvor stor andel av den finansielle formuen bør Kari investere i aksjer?</p>",
          options: ["0 %", "50 %", "75 %", "100 %"],
          answer: 3,
          solution: "<p><b>Steg 1 — hvilken formue gjelder de 50 prosentene?</b> Mertons w* er andelen av <b>totalformuen</b>, ikke av bankkontoen. Totalformuen er finansiell formue pluss humankapital: 1 mill + 1 mill = <b>2 mill</b>.</p><p><b>Steg 2 — hvor mye skal stå i aksjer?</b> 50 % av 2 mill = <b>1 mill</b>.</p><p><b>Steg 3 — hvor kan de plasseres?</b> Humankapitalen er risikofri og kan ikke omplasseres; den er i praksis en obligasjon på 1 mill som Kari allerede eier. Hele aksjeeksponeringen må derfor komme fra den finansielle formuen. 1 mill av 1 mill = <b>100 %</b>.</p><p><b>Formelen.</b> Med risikofri humankapital H og finansiell formue F:</p><p>α<sub>F</sub> = w* × (F + H)/F = 0,50 × 2/1 = 1,00 = <b>100 %</b></p><p><b>Kontroll.</b> Se på den samlede balansen etterpå: 1 mill i aksjer og 1 mill i risikofri humankapital. Det er nøyaktig 50/50 på totalformuen, som er det Merton krever. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>50 %</b> — du har brukt w* direkte på den finansielle formuen og oversett humankapitalen. Da ville Kari sittet med 0,5 mill aksjer av 2 mill totalformue, altså bare 25 % aksjer. Alt for defensivt.</p><p><b>0 %</b> — svaret på neste delspørsmål, der humankapitalen er risikabel. Her er den risikofri, og det snur konklusjonen.</p><p><b>75 %</b> — en mellomting uten grunnlag i modellen. Merton gir et entydig tall; den som «runder av mot midten» taper poeng.</p><p><b>Regelen.</b> Sikker humankapital virker som en obligasjonsbeholdning. Den øker den trygge delen av totalformuen og gjør at hele den finansielle formuen kan stå i aksjer — i prinsippet mer enn 100 %, altså med lån, hvis humankapitalen er stor nok. Det er hovedbegrunnelsen for at unge bør ha høy aksjeandel.</p>",
        },
        {
          label: "3",
          points: 1,
          body: "<p>Anta derimot (bare i denne deloppgaven) at Karis humankapital ikke er risikofri, men i stedet varierer i takt med aksjemarkedet (beta = 1). Hvor stor andel av den finansielle formuen bør Kari nå investere i aksjer?</p>",
          options: ["0 %", "50 %", "75 %", "100 %"],
          answer: 0,
          solution: "<p><b>Steg 1 — hva β = 1 betyr her.</b> Humankapitalen svinger én-til-én med aksjemarkedet. Økonomisk er den da <i>allerede</i> en aksjeplassering på 1 mill, bare at Kari ikke kan selge den.</p><p><b>Steg 2 — regn ut ønsket aksjeeksponering.</b> Totalformuen er fortsatt 2 mill, og målet er fortsatt 50 % = <b>1 mill i aksjer</b>.</p><p><b>Steg 3 — trekk fra det hun allerede har.</b> Humankapitalen leverer 1 mill aksjeeksponering. Da gjenstår 1 − 1 = <b>0</b> til den finansielle formuen: <b>0 %</b> i aksjer, altså alt i risikofrie plasseringer.</p><p><b>Formelen.</b> Med humankapital som har beta β:</p><p>α<sub>F</sub> = [w*(F + H) − β × H]/F = (0,50 × 2 − 1 × 1)/1 = <b>0</b></p><p>Sett β = 0 i samme uttrykk og du får svaret fra forrige delspørsmål, 100 %. Én formel dekker begge.</p><p><b>Kontroll.</b> Samlet eksponering blir 1 mill aksjelignende humankapital og 1 mill risikofri finansformue: 50/50 på totalformuen. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>100 %</b> — svaret fra forrige delspørsmål. Setningen «bare i denne deloppgaven» er der nettopp for å hindre at du drar det med deg.</p><p><b>50 %</b> — Merton anvendt på finansformuen alene, som er samme feil som i forrige delspørsmål, bare i motsatt retning: her ville det gitt 1,5 mill i aksjeeksponering av 2 mill, altså 75 %.</p><p><b>75 %</b> — igjen mellomtingen uten grunnlag.</p><p><b>Regelen.</b> Humankapitalen skal telle med i totalporteføljen med sin egen beta. Er den aksjelignende (gründer, meglerlønn, bonusavhengig jobb, aksjer i egen arbeidsgiver), skal den finansielle porteføljen være mer forsiktig. Det er også argumentet mot å eie aksjer i selskapet du arbeider i: da er både lønnen og sparepengene eksponert mot samme risiko.</p>",
        },
        {
          label: "4",
          points: 1,
          body: "<p>Anne er identisk med Kari på alle måter, bortsett fra at hun er eldre og straks skal gå av med pensjon. Hva er riktig om Annes optimale aksjeandel?</p>",
          options: [
            "Hun bør ha lavere aksjeandel, hovedsakelig fordi aksjemarkedets risiko forsvinner over lang nok tid, mens aksjer er risikable på kort sikt.",
            "Hun bør ha lavere aksjeandel, hovedsakelig fordi humankapitalen hennes er mindre verdifull.",
            "Hun bør ha lik aksjeandel.",
            "Hun bør ha høyere aksjeandel.",
          ],
          answer: [1, 2],
          solution: "<p><b>Fasiten godtar to svar.</b> Hovedsvaret er at hun bør ha lavere aksjeandel fordi humankapitalen er mindre verdifull. Sensorveiledningen godtar i tillegg «lik aksjeandel», fordi «aksjeandel» kan leses som andel av <i>totalformuen</i>, og den er uendret. Begge er markert riktige her.</p><p><b>Steg 1 — hva endrer seg når Anne nærmer seg pensjon?</b> Nåverdien av framtidig arbeidsinntekt, altså humankapitalen H, krymper mot null. Alt annet er likt.</p><p><b>Steg 2 — sett H = 0 i formelen fra delspørsmål 2.</b></p><p>α<sub>F</sub> = w* × (F + H)/F  →  med H = 0:  α<sub>F</sub> = w* = <b>50 %</b></p><p>Kari, med H = F, hadde 100 %. Anne, med H ≈ 0, skal ned mot 50 % av finansformuen i aksjer. <b>Lavere andel av den finansielle formuen — og grunnen er humankapitalen, ikke alderen i seg selv.</b></p><p><b>Steg 3 — den andre lesningen.</b> Andelen av <i>totalformuen</i> er 50 % for begge, siden w* ikke inneholder alder, horisont eller humankapital. Leser du spørsmålet slik, er svaret «lik aksjeandel». Det er derfor sensor godtar begge.</p><p><b>Hvorfor alternativ A er galt — og det er hele poenget med spørsmålet.</b> A har <i>riktig retning</i> men <i>galt argument</i>: «aksjemarkedets risiko forsvinner over lang nok tid». Det er tidsdiversifiseringsfeilslutningen, og kurset avviser den uttrykkelig. Standardavviket til den <i>årlige gjennomsnittsavkastningen</i> faller med horisonten, men standardavviket til <b>sluttformuen</b> vokser med kvadratroten av horisonten. Aksjer blir ikke trygge av å eies lenge. Legg dessuten merke til at Mertons formel ikke inneholder tid i det hele tatt: w* er den samme for ett år og for tretti. Grunnen til at unge skal ha mer i aksjer, er humankapitalen, ikke horisonten.</p><p><b>Hvorfor D er galt.</b> «Høyere aksjeandel» er feil retning: mindre sikker humankapital i ryggen betyr mindre, ikke mer, risiko i finansporteføljen.</p><p><b>Regelen.</b> Aksjeandelen faller over livsløpet fordi humankapitalen forbrukes, ikke fordi risikoen avtar med tiden. Når to alternativer har samme konklusjon, er det begrunnelsen som avgjør — les hele setningen, ikke bare det første ordet.</p>",
        },
      ],
    },

    /* --------------------------------------------------------------- 12 --- */
    {
      n: 12,
      title: "Hvilken forsikring er lovpålagt",
      points: 1,
      topic: "Forsikring",
      chapters: [17],
      body: "<p>Hvilke av følgende forsikringer er lovpålagt i Norge?</p>",
      options: ["Boligforsikring", "Uføreforsikring", "Ansvarsforsikring på bil", "Ingen av dem"],
      answer: 2,
      solution: "<p><b>Riktig svar: ansvarsforsikring på bil.</b> Bilansvarsloven krever at ethvert motorvogn som brukes på veien, er ansvarsforsikret. Forsikringen dekker skade kjøretøyet påfører andre — personer, biler, gjerder — og er obligatorisk fordi skaden rammer tredjepart, ikke bare eieren selv. Kjører du uforsikret, betaler Trafikkforsikringsforeningen den skadelidte og krever deg for beløpet, i tillegg til et daglig gebyr.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Boligforsikring</b> — ikke lovpålagt, men i praksis nesten alltid <i>avtalepålagt</i>: banken krever den som vilkår for boliglånet, siden boligen er pantet. Det er nettopp forskjellen alternativet tester. En kontraktsforpliktelse overfor banken er ikke det samme som en lovplikt.</p><p><b>Uføreforsikring</b> — frivillig. Grunndekningen ligger i folketrygdens uføretrygd, som alle er omfattet av gjennom medlemskapet, mens privat uføreforsikring kjøpes for å tette gapet mellom folketrygden og tidligere lønn. Forveksle ikke obligatorisk tjenestepensjon (OTP), som <i>er</i> lovpålagt for arbeidsgiveren, med uføreforsikring, som ikke er det.</p><p><b>Ingen av dem</b> — kan strykes så snart du husker at bilansvar er lovregulert.</p><p><b>Regelen.</b> Skillet går på hvem skaden rammer: forsikring mot skade du påfører <i>andre</i> er ofte lovpålagt (bilansvar, yrkesskade, ansvarsforsikring for enkelte yrker), mens forsikring mot skade på deg selv og dine egne ting er frivillig. Prinsippet i kurset er dessuten at du skal forsikre det du ikke kan bære selv: huset og ansvaret, ikke mobilen.</p>",
    },
    /* --------------------------------------------------------------- 13 --- */
    {
      n: 13,
      title: "Forventet nytte, full dekning og delvis dekning",
      points: 3,
      topic: "Forsikring og forventet nytte",
      chapters: [17],
      body: "<p>Du eier et hus verdt 9 millioner kroner, og har ingen annen formue. Huset vil brenne ned og miste hele sin verdi med sannsynlighet 1 %. Du har nyttefunksjonen U(W) = √W, der W er formuen din. Forsikringsselskapet tilbyr full dekning, det vil si at de utbetaler 9 millioner kroner dersom huset brenner, til en premie på 160 000 kroner.</p>",
      parts: [
        {
          label: "1",
          points: 1,
          body: "<p>Bør du kjøpe denne forsikringen?</p>",
          options: [
            "Ja, fordi forventet nytte blir høyere med forsikringen",
            "Nei, fordi forventet nytte blir lavere med forsikringen",
            "Du er indifferent, fordi forventet nytte er lik med og uten forsikring",
            "Umulig å avgjøre uten mer informasjon",
          ],
          answer: 0,
          solution: "<p><b>Steg 1 — forventet nytte med forsikring.</b> Full dekning fjerner all usikkerhet: brenner huset, får du 9 mill utbetalt, og uansett har du betalt 160 000. Formuen er 9 000 000 − 160 000 = 8 840 000 i <i>begge</i> tilstander.</p><p>E[U]<sub>forsikret</sub> = √8 840 000 = <b>2 973,21</b></p><p><b>Steg 2 — forventet nytte uten forsikring.</b> Med sannsynlighet 99 % står huset (9 mill), med 1 % er alt borte (0):</p><p>E[U]<sub>uforsikret</sub> = 0,99 × √9 000 000 + 0,01 × √0 = 0,99 × 3 000 + 0 = <b>2 970,00</b></p><p><b>Steg 3 — sammenlign.</b> 2 973,21 &gt; 2 970,00, altså <b>ja, kjøp forsikringen</b>.</p><p><b>Kontroll — regn i kroner i stedet for i nytteenheter.</b> Nyttetall er vanskelige å tolke; sikkerhetsekvivalenten er ikke det. Kvadrer den forventede nytten:</p><table class=\"data\"><tr><th>Situasjon</th><th>E[U]</th><th>Sikkerhetsekvivalent</th></tr><tr><td>Uforsikret</td><td class=\"n\">2 970,00</td><td class=\"n\">8 820 900</td></tr><tr><td>Forsikret</td><td class=\"n\">2 973,21</td><td class=\"n\">8 840 000</td></tr></table><p>Forsikringen er verdt 8 840 000 − 8 820 900 = <b>19 100 kroner</b> mer enn å stå uforsikret. Maksimalpremien du ville betalt er 9 000 000 − 8 820 900 = <b>179 100</b>, og premien på 160 000 ligger under. ✓ To uavhengige veier, samme konklusjon.</p><p><b>Hvorfor prisen ikke avgjør alene.</b> Aktuarisk riktig premie er 1 % × 9 mill = <b>90 000</b>. Selskapet tar 160 000, altså 70 000 i påslag. En risikonøytral person ville sagt nei. Du er risikoavers (√W er konkav), og betaler derfor gjerne over forventet tap — helt opp til 179 100.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Nei</b> — svaret du får hvis du sammenligner premien 160 000 med forventet tap 90 000 og stopper der. Det er den risikonøytrale sammenligningen, og den ignorerer hele poenget med en konkav nyttefunksjon.</p><p><b>Indifferent</b> — ville krevd at premien var nøyaktig 179 100.</p><p><b>Umulig å avgjøre</b> — alt som trengs står i oppgaven: formue, sannsynlighet, nyttefunksjon og premie. Med minuspoeng er dette alternativet nesten alltid en felle for den som gir opp for tidlig.</p><p><b>Regelen.</b> En risikoavers person kjøper alltid full dekning til aktuarisk riktig pris, og fortsatt ved et påslag opp til maksimalpremien W − sikkerhetsekvivalenten uten forsikring. Prøve-og-feile med tallene i nyttefunksjonen er en godkjent metode på denne eksamenen.</p>",
        },
        {
          label: "2",
          points: 1,
          body: "<p>Hva er den laveste sannsynligheten for brann som gjør at du vil kjøpe denne forsikringen til premie 160 000 kroner?</p>",
          options: ["ca. 0,52 %", "ca. 0,89 %", "ca. 1,52 %", "ca. 2,01 %"],
          answer: 1,
          solution: "<p><b>Steg 1 — sett opp indifferansen.</b> Terskelen er den sannsynligheten p som gjør forventet nytte lik med og uten forsikring. Forsikret er formuen 8 840 000 uansett, og den er uavhengig av p:</p><p>(1 − p) × √9 000 000 = √8 840 000</p><p><b>Steg 2 — løs for p.</b></p><p>(1 − p) × 3 000 = 2 973,2137<br>1 − p = 0,9910712<br>p = 0,0089288 = <b>0,8929 %</b></p><p>Nærmeste alternativ er <b>ca. 0,89 %</b>, og det er derfor alternativet er formulert med «ca.».</p><p><b>Steg 3 — kontroller retningen.</b> Forsikring lønner seg når brannrisikoen er <i>høy</i>. Ved p over terskelen er venstresiden mindre enn høyresiden, og forsikringen vinner; ved p under terskelen taper den.</p><p><b>Utelukkingsrutinen, som er raskere enn ligningen.</b> Fra forrige delspørsmål vet du at forsikringen lønner seg ved p = 1 %. Terskelen må derfor ligge <b>under</b> 1 %. Det stryker <b>ca. 1,52 %</b> og <b>ca. 2,01 %</b> umiddelbart. Igjen står 0,52 % og 0,89 %. Test den ene: ved p = 0,52 % er E[U] uten forsikring 0,9948 × 3 000 = 2 984,40, som er større enn 2 973,21 — altså ville du <i>ikke</i> kjøpt. Da er 0,52 % under terskelen, og svaret er 0,89 %. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b> <b>1,52 %</b> og <b>2,01 %</b> er logisk uforenlige med delspørsmål 1: hadde terskelen ligget der, ville du sagt nei ved 1 %. <b>0,52 %</b> ligger under terskelen; der er den forventede skaden for liten til å forsvare 160 000 i premie.</p><p><b>Kontroll i kroner.</b> Ved p = 0,8929 % er sikkerhetsekvivalenten uten forsikring (1 − p)² × 9 000 000 = 8 840 000, nøyaktig formuen med forsikring. ✓</p><p><b>Regelen.</b> Terskelsannsynligheten løses av at forventet nytte med og uten forsikring er lik. Sett alltid inn alternativene når ligningen er stygg: prøve-og-feile er eksplisitt godkjent, og med fire alternativer er to av dem som regel utelukket av et tidligere delspørsmål.</p>",
        },
        {
          label: "3",
          points: 1,
          body: "<p>Anta at selskapet ikke lenger tilbyr full dekning, men i stedet dekker 50 % av tapet (4,5 millioner kroner) til samme premie (160 000 kr). Bør du kjøpe denne forsikringen?</p>",
          options: [
            "Ja, fordi forventet nytte blir høyere med forsikringen",
            "Nei, fordi forventet nytte blir lavere med forsikringen",
            "Du er indifferent, fordi forventet nytte er lik med og uten forsikring",
            "Umulig å avgjøre uten mer informasjon",
          ],
          answer: 1,
          solution: "<p><b>Steg 1 — formuen i de to tilstandene nå.</b> Delvis dekning fjerner ikke usikkerheten, den demper den:</p><table class=\"data\"><tr><th>Tilstand</th><th>Sannsynlighet</th><th>Formue</th></tr><tr><td>Huset står</td><td class=\"n\">99 %</td><td class=\"n\">9 000 000 − 160 000 = 8 840 000</td></tr><tr><td>Huset brenner</td><td class=\"n\">1 %</td><td class=\"n\">0 + 4 500 000 − 160 000 = 4 340 000</td></tr></table><p><b>Steg 2 — forventet nytte med den delvise dekningen.</b></p><p>E[U] = 0,99 × √8 840 000 + 0,01 × √4 340 000<br>E[U] = 0,99 × 2 973,2137 + 0,01 × 2 083,2667<br>E[U] = 2 943,4816 + 20,8327 = <b>2 964,31</b></p><p><b>Steg 3 — sammenlign med å stå uforsikret.</b> 2 964,31 &lt; 2 970,00, altså <b>nei, ikke kjøp</b>.</p><p><b>Kontroll i kroner.</b> Sikkerhetsekvivalenten er 2 964,31² = <b>8 787 159</b>, mot 8 820 900 uten forsikring. Den halve dekningen gjør deg 33 741 kroner fattigere målt i sikre kroner. Regnet på maksimalpremie: for 50 % dekning ville du høyst betalt <b>126 302</b> kroner, og selskapet krever 160 000. ✓ Samme konklusjon, tredje vei.</p><p><b>Hvorfor svaret snur.</b> Premien er uendret, men det du får for den er halvert. Aktuarisk riktig pris for halv dekning er 1 % × 4,5 mill = 45 000; du betaler 160 000, altså <b>3,6 ganger</b> riktig pris. For full dekning var forholdet 160 000/90 000 = 1,8. Påslaget per krone dekning er doblet, og da er ikke risikoaversjonen din sterk nok lenger. Terskelsannsynligheten for at halv dekning skal lønne seg til denne premien er 1,27 %, og brannrisikoen er bare 1 %.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Ja</b> — konklusjonen fra delspørsmål 1 dratt videre uten å regne på nytt. Det er hele grunnen til at spørsmålet står her.</p><p><b>Indifferent</b> — ville krevd en premie på 126 302.</p><p><b>Umulig å avgjøre</b> — alle tall er oppgitt.</p><p><b>Regelen.</b> For en risikoavers person er full dekning til aktuarisk riktig pris alltid optimalt. Halveres dekningen uten at prisen faller, dobles påslaget per krone forsikring, og forsikringen kan gå fra lønnsom til ulønnsom. Egenandeler og delvis dekning må derfor alltid ledsages av lavere premie for å være verdt noe.</p>",
        },
      ],
    },

    /* --------------------------------------------------------------- 14 --- */
    {
      n: 14,
      title: "Utsatt uttak av alderspensjon",
      points: 1,
      topic: "Pensjon",
      chapters: [15],
      body: "<p>Anta at Knut er født etter 1962. Hva skjer når Knut utsetter uttak av alderspensjon i folketrygden?</p>",
      options: [
        "Delingstallet øker, og årlig utbetaling øker",
        "Delingstallet øker, og årlig utbetaling synker",
        "Delingstallet synker, og årlig utbetaling øker",
        "Delingstallet og årlig utbetaling forblir uendret",
      ],
      answer: 2,
      solution: "<p><b>Mekanikken.</b> For årskull født fra 1963 gjelder den nye alderspensjonen: du bygger opp en <b>pensjonsbeholdning</b> (18,1 % av inntekt opp til 7,1 G, alle år teller), og den årlige pensjonen er</p><p>Årlig pensjon = pensjonsbeholdning / delingstall</p><p><b>Hva delingstallet er.</b> Delingstallet er omtrent forventet antall gjenstående leveår ved uttakstidspunktet, justert for levealdersutviklingen. Jo eldre du er når du tar ut, jo færre år har du igjen, og jo <b>lavere</b> blir delingstallet.</p><p><b>Steg for steg for Knut.</b></p><p>1. Han utsetter uttaket.<br>2. Forventet gjenstående levetid ved uttak faller.<br>3. Delingstallet <b>synker</b>.<br>4. Samme beholdning delt på et mindre tall gir <b>høyere</b> årlig utbetaling.</p><p>I tillegg fortsetter beholdningen å vokse mens han venter, både med ny opptjening hvis han jobber og med årlig regulering. Begge effektene trekker samme vei.</p><p><b>Kontroll med tall.</b> En beholdning på 4 millioner delt på et delingstall på 20 gir 200 000 i året; delt på 17 gir 235 294. Merk samtidig at han får utbetaling i færre år — nøytraliteten i systemet er at <i>samlet</i> forventet utbetaling er omtrent den samme uansett når du starter. Det du kjøper ved å vente, er en høyere garantert årlig ytelse, ikke mer penger totalt.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Delingstallet øker, og årlig utbetaling øker</b> — selvmotsigende. Med en gitt beholdning kan ikke både nevneren og resultatet vokse.</p><p><b>Delingstallet øker, og årlig utbetaling synker</b> — konsistent brøkregning, men delingstallet beveger seg feil vei. Delingstallet stiger med forventet gjenstående levetid, ikke med alder.</p><p><b>Uendret</b> — hele poenget med fleksibelt uttak mellom 62 og 75 år er at tidspunktet endrer den årlige ytelsen.</p><p><b>Regelen.</b> Senere uttak ⟹ lavere delingstall ⟹ høyere årlig pensjon, men over færre år. Levealdersjusteringen virker på tvers av årskull: lever et kull lenger, får det høyere delingstall ved samme alder og må jobbe lenger for samme årlige pensjon.</p>",
    },

    /* --------------------------------------------------------------- 15 --- */
    {
      n: 15,
      title: "Høyere avkastning enn markedsporteføljen",
      points: 1,
      topic: "Porteføljevalg",
      chapters: [14],
      body: "<p>Du ønsker høyere forventet avkastning enn markedsporteføljen og er villig til å akseptere høyere risiko. Hva sier teorien om optimale porteføljer at du da bør gjøre?</p>",
      options: [
        "Investere i de mest risikable enkeltaksjene på børsen",
        "Investere alt i én svært volatil «start-up» for å øke forventet avkastning",
        "Låne penger for å investere mer i markedsporteføljen (øke giringen)",
        "Du bør unngå å ha høyere risiko enn markedsporteføljen",
      ],
      answer: 2,
      solution: "<p><b>Riktig svar: lån og gir markedsporteføljen.</b></p><p><b>Mekanismen — kapitalmarkedslinjen.</b> Med en risikofri rente og én effisient risikabel portefølje (markedsporteføljen M) er alle oppnåelige kombinasjoner av risiko og forventet avkastning en rett linje fra r<sub>f</sub> gjennom M:</p><p>E[r<sub>p</sub>] = r<sub>f</sub> + [(E[r<sub>M</sub>] − r<sub>f</sub>)/σ<sub>M</sub>] × σ<sub>p</sub></p><p>Stigningstallet er markedets Sharpe-forhold, og det er det <b>høyest oppnåelige</b>. Vil du ha mer forventet avkastning, flytter du deg oppover langs linjen ved å øke σ<sub>p</sub> — og den eneste måten å komme forbi M på, er å låne til r<sub>f</sub> og plassere mer enn 100 % av egenkapitalen i M.</p><p><b>Tobins separasjonsteorem.</b> Valget deles i to uavhengige beslutninger: <i>hvilken</i> risikabel portefølje (alltid M, lik for alle) og <i>hvor mye</i> risiko (mikset med det risikofrie aktivumet, individuelt). Risikoviljen din bestemmer bare det andre valget, aldri det første.</p><p><b>Regneeksempel.</b> Med r<sub>f</sub> = 3 %, E[r<sub>M</sub>] = 8 % og σ<sub>M</sub> = 15 %: låner du 50 % av egenkapitalen og investerer 1,5 × M, blir forventet avkastning 3 % + 1,5 × 5 % = 10,5 % og standardavviket 1,5 × 15 % = 22,5 %. Sharpe-forholdet er uendret 0,333 — du har kjøpt mer risiko til samme pris per enhet.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>De mest risikable enkeltaksjene</b> — du får mer <i>total</i> risiko, men mesteparten av den er usystematisk og prises ikke. Sharpe-forholdet faller, og du havner under kapitalmarkedslinjen. Høy risiko er ikke det samme som høy forventet avkastning; bare den systematiske delen betales for.</p><p><b>Alt i én volatil start-up</b> — samme feil, i sin ekstreme form. Fullstendig udiversifisert, og forventningsverdien til en enkelt oppstartsbedrift er dessuten typisk skjevfordelt: mediansvaret er tap.</p><p><b>Du bør unngå høyere risiko enn markedsporteføljen</b> — teorien forbyr ingenting. Den sier hvilke kombinasjoner som er effisiente, ikke hvilken du skal velge. Punktene til høyre for M på linjen er like effisiente som M selv.</p><p><b>Regelen.</b> Vil du ha mer avkastning: gir markedsporteføljen, ikke plukk aksjer. Vil du ha mindre: legg en del i det risikofrie aktivumet. Beveg deg langs kapitalmarkedslinjen, aldri av den.</p>",
    },

    /* --------------------------------------------------------------- 16 --- */
    {
      n: 16,
      title: "Forbrukerrådets sammenligning av indeksfond og aktive fond",
      points: 1,
      topic: "Indeksfond og aktiv forvaltning",
      chapters: [14],
      body: "<p>Forbrukerrådet har sammenlignet avkastningen mellom indeksfond og aktive fond tilbudt av norske forvaltere siste 20 år (frem til 2018). Hva konkluderte Forbrukerrådet med?</p>",
      options: [
        "Aktive fond gjør det generelt best",
        "Aktive fond presterer dårligere enn indeksfond i alle kategorier",
        "Aktive fond gjør det svakere enn indeksfond på globale, nordiske og europeiske aksjer, men bedre på norske aksjer",
        "Aktive fond gjør det bedre enn indeksfond på europeiske og globale aksjer, men dårligere på norske aksjer",
      ],
      answer: 2,
      solution: "<p><b>Riktig svar: svakere på globale, nordiske og europeiske aksjer, men bedre på norske.</b> Forbrukerrådets gjennomgang av perioden 1998–2018 fant at aktivt forvaltede fond fra norske forvaltere i snitt gjorde det dårligere enn indeksfond i de fleste markeder <i>etter kostnader</i>, med norske aksjer som unntaket.</p><p><b>Hvorfor mønsteret ser slik ut.</b> Hovedforklaringen i kurset er kostnader, ikke ferdigheter. Aktive fond tar typisk 1,2–2 % i årlig forvaltningshonorar mot 0,2–0,3 % for et indeksfond. Differansen på rundt ett prosentpoeng i året må tjenes inn igjen før kunden er i null, og over tjue år gir et prosentpoeng i året omtrent 17 % lavere sluttverdi: med 6 % mot 7 % i året er 1,06<sup>20</sup>/1,07<sup>20</sup> = 0,83. (Omvendt ender det billige fondet omtrent 20 % høyere, og det er nok den forvekslingen som ga «22 %».) Oslo Børs er et lite og relativt lite analysert marked der en norsk forvalter i det minste har en informasjonsfordel; i det globale markedet konkurrerer han mot alle.</p><p><b>Nyansen du bør ta med.</b> Selv der aktive fond gjorde det bedre, var forspranget lite og perioden én bestemt tjueårsperiode. Det som er stabilt over studier, er ikke hvilke forvaltere som slår markedet, men at <b>kostnadene er den mest pålitelige prediktoren for netto avkastning</b>. Et beslektet problem forelesningen tar opp er «skapindeksfond»: fond som tar aktivt honorar og likevel følger indeksen tett.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Aktive fond gjør det generelt best</b> — motsatt av funnet.</p><p><b>Dårligere i alle kategorier</b> — for absolutt. Alternativet er laget for den som husker hovedbudskapet, men ikke unntaket. Med minuspoeng er dette den farligste av de tre, fordi den ligger nærmest sannheten.</p><p><b>Bedre på europeiske og globale, dårligere på norske</b> — nøyaktig speilvendt. Sjekk retningen før du krysser av: hjemmemarkedet er der forvalteren har best forutsetninger.</p><p><b>Regelen.</b> Kostnadene er den ene faktoren du kan kontrollere på forhånd. Standardrådet i kurset er brede indeksfond med lavt honorar, med mulig unntak for markeder du har en reell informasjonsfordel i.</p>",
    },

    /* --------------------------------------------------------------- 17 --- */
    {
      n: 17,
      title: "Innskuddspensjon mot ytelsespensjon",
      points: 1,
      topic: "Pensjon",
      chapters: [15],
      body: "<p>Hvilken påstand om innskuddspensjon er riktig?</p>",
      options: [
        "Innskuddspensjon innebærer at arbeidsgiver garanterer en fast andel av sluttlønn utbetalt til pensjon, uavhengig av avkastning.",
        "Du kan normalt velge og endre risikoprofil og forvaltningsvalg på din innskuddspensjon.",
        "Du kan ta ut innskuddspensjonen når som helst før pensjonsalder dersom du trenger likviditet.",
        "Innskuddspensjon forvaltes kollektivt uten individuelle valg, og du kan ikke påvirke plasseringen.",
      ],
      answer: 1,
      solution: "<p><b>Riktig svar: du kan normalt velge og endre risikoprofil.</b> Ved innskuddspensjon setter arbeidsgiveren inn et bestemt beløp, typisk en prosentandel av lønnen (obligatorisk tjenestepensjon krever minst 2 % fra første krone). Pengene står på din egen pensjonskonto, og <b>du bærer investeringsrisikoen</b>. Fordi risikoen er din, er også plasseringsvalget ditt: leverandørene tilbyr profiler fra forsiktig til 100 % aksjer, og du kan bytte underveis.</p><p><b>Det bærende skillet i kapitlet.</b></p><table class=\"data\"><tr><th></th><th>Innskuddspensjon</th><th>Ytelsespensjon</th></tr><tr><td>Arbeidsgiver lover</td><td>et innskudd i dag</td><td>en ytelse ved pensjonering</td></tr><tr><td>Hvem bærer risikoen</td><td>den ansatte</td><td>arbeidsgiveren</td></tr><tr><td>Plasseringsvalg</td><td>den ansatte velger</td><td>ingen individuelle valg</td></tr><tr><td>Pensjonens størrelse</td><td>avhenger av avkastningen</td><td>fast andel av sluttlønn</td></tr></table><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Alternativ A</b> beskriver <i>ytelsespensjon</i>, ikke innskuddspensjon. En garantert andel av sluttlønn uavhengig av avkastning er nettopp det innskuddsordningen ikke gir. Dette er settets tydeligste definisjonsbytte.</p><p><b>Alternativ C</b> — pensjonskapitalen er bundet. Du kan ikke ta den ut for å dekke et likviditetsbehov; tidligste uttak er normalt 62 år, og utbetalingen skjer over et avtalt antall år. Bindingen er en del av prisen for skattefavoriseringen.</p><p><b>Alternativ D</b> beskriver det motsatte av innskuddspensjon, og passer nærmere en kollektiv ytelsesordning.</p><p><b>Regelen.</b> Følg risikoen: den som bærer investeringsrisikoen, er også den som får velge plasseringen. Praktisk konsekvens for en ung arbeidstaker er å sjekke at profilen faktisk har høy aksjeandel — standardvalget er ofte for forsiktig, og med tretti år til pensjon koster et forsiktig standardvalg mye.</p>",
    },
  ],
},
{
  id: "h2024",
  label: "Høsten 2024",
  date: "2024-12-09",
  minutes: 240,
  points: 48,
  format: "14 oppgaver · flervalg · kalkulator tillatt",
  note: "Det største settet i arkivet: 48 poeng fordelt på 14 oppgaver og 38 flervalgsledd. Schjelderup har oppgave 1–9 (28 poeng), en gjesteforeleser i internasjonal skatterett har oppgave 10 (9 poeng, én sammenhengende case), og Næss har finansdelen 11–14 (11 poeng). Tre ting gjør settet verdt å kjøre på tid: skjermingskjeden i oppgave 1 går over tre år med framført ubenyttet skjerming, oppgave 8 krever at du kjenner igjen insidensformelen blant fire nesten like uttrykk, og oppgave 10 er den eneste rene skatterettsblokken i hele materialet.",
  facts: [
    "Skoleeksamen i Wiseflow 9. desember 2024, 09:00–13:00.",
    "Rent flervalg med tre eller fire alternativer per ledd.",
    "«Ubesvarte spørsmål eller feil svar gir ikke minuspoeng.» Slå på minuspoeng for å trene 2026-forhold.",
    "Maksimal uttelling 48 poeng. Oppgave 8 alene er 9 poeng — tre ledd à 3.",
    "Kalkulator tillatt. Oppgave 5 og 7 ber uttrykkelig om avrunding til én desimal.",
  ],
  practiceNote: "Regn hvert ledd ferdig på papir før du åpner løsningen — særlig oppgave 1, der år 3 bygger på ubenyttet skjerming framført fra år 2.",
  mc: { wrongFactor: 0 },
  exercises: [

    /* ---------------------------------------------------------------- 1 */
    { n: 1, title: "Skjermingsfradrag over tre år", points: 4, topic: "Skjerming og utbytte",
      chapters: [5],
      body: "<p>Kaia eier en aksje som hun har betalt kr 10 000 for. Skjermingsrenten er 2 prosent i alle år.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hva er skjermingsfradraget i år 1</p>",
          options: ["Kr 100", "Kr 200", "Kr 300", "Kr 50"],
          answer: 1,
          solution: "<p><b>Steg 1 — skjermingsgrunnlaget.</b> I det første året er skjermingsgrunnlaget aksjens inngangsverdi, altså det Kaia betalte: kr 10 000. Ingenting er framført ennå.</p>"
            + "<p><b>Steg 2 — fradraget.</b> Skjermingsfradrag = skjermingsgrunnlag × skjermingsrente = 10 000 × 2 % = <b>kr 200</b>.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> Alle tre er samme regnestykke med feil rente: kr 100 er 1 %, kr 300 er 3 %, kr 50 er 0,5 %. Det finnes ingen annen tenkelig feil å gjøre her, og det er nettopp derfor leddet er gratis poeng — les renten i oppgaveteksten og gang.</p>"
            + "<p><b>Regelen:</b> skjermingsfradraget er skjermingsgrunnlaget ganget med årets skjermingsrente, og grunnlaget i første år er alltid kostprisen.</p>"
            + "<p><b>Kontroll:</b> 1 % av 10 000 er 100, så 2 % er 200. ✓</p>" },

        { label: "b", points: 1,
          body: "<p>Kaia mottar kr 500 i utbytte i år 1. Hva er skattepliktig utbytte i år 1?</p>",
          options: ["Kr 200", "Kr 300", "Kr 400", "Kr 100"],
          answer: 1,
          solution: "<p><b>Steg 1.</b> Skattepliktig utbytte = mottatt utbytte − skjermingsfradrag = 500 − 200 = <b>kr 300</b>.</p>"
            + "<p><b>Steg 2 — hva skjer med resten.</b> Utbyttet på 500 var større enn skjermingen på 200, så hele skjermingsfradraget er brukt opp. Det framføres <b>ingenting</b> til år 2. Dette er informasjonen du trenger i deloppgave c, og det er lett å tro det motsatte.</p>"
            + "<p><b>Merk hva spørsmålet spør om.</b> «Skattepliktig utbytte» er <i>grunnlaget</i>, ikke skatten. Skatten ville vært 300 × 1,72 × 22 % = kr 113,52. Ingen av alternativene er skattebeløp, så oppgaven ber om grunnlaget.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> Kr 200 er skjermingsfradraget selv — svaret på forrige spørsmål, ikke på dette. Kr 400 er 500 − 100, altså skjermingen regnet med 1 % rente. Kr 100 er 500 − 200 − 200, altså skjermingsfradraget trukket fra to ganger.</p>"
            + "<p><b>Regelen:</b> skjermingsfradraget trekkes fra utbyttet én gang, i det året det er beregnet.</p>" },

        { label: "c", points: 1,
          body: "<p>I år 2 mottar Kaia kr 100 i utbytte. Hva blir skattepliktig utbytte i år 2?</p>",
          options: ["Kr 100", "Kr 200", "Kr 0", "Kr 300"],
          answer: 2,
          solution: "<p><b>Steg 1 — grunnlaget i år 2.</b> Fra deloppgave b vet du at hele skjermingen ble brukt opp i år 1. Grunnlaget er derfor fortsatt kostprisen alene: kr 10 000.</p>"
            + "<p><b>Steg 2 — årets fradrag.</b> 10 000 × 2 % = kr 200.</p>"
            + "<p><b>Steg 3 — skattepliktig utbytte.</b> 100 − 200 = −100. Skjermingsfradraget kan ikke gjøre inntekten negativ, så skattepliktig utbytte settes til <b>kr 0</b>.</p>"
            + "<p><b>Steg 4 — det du må huske til neste deloppgave.</b> De kr 100 som ikke ble brukt, går ikke tapt. De framføres som <b>ubenyttet skjerming</b> på denne aksjen, og de skal både legges til skjermingsgrunnlaget i år 3 <i>og</i> komme til fradrag i år 3. Skriv tallet ned nå.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> Kr 100 er den ubenyttede skjermingen — riktig tall, feil spørsmål; det er også svaret du får hvis du snur fortegnet på −100. Kr 200 er skjermingsfradraget. Kr 300 er fjorårets svar, som ikke har noe her å gjøre.</p>"
            + "<p><b>Regelen:</b> skjerming som overstiger utbyttet gir aldri negativ skattepliktig inntekt og aldri et fradragsberettiget tap. Overskuddet framføres, aksje for aksje.</p>" },

        { label: "d", points: 1,
          body: "<p>I år 3 mottar Kaia kr 400 i utbytte. Hva blir skattepliktig utbytte i år 3?</p>",
          options: ["Kr 202", "Kr 100", "Kr 302", "Kr 98"],
          answer: 3,
          solution: "<p>Dette er leddet hele oppgaven er bygget mot. Den framførte skjermingen teller <b>to ganger</b>: den øker grunnlaget, og den kommer i tillegg til fradrag i seg selv. Alternativene er laget slik at hver av de tre delene av regnestykket har sitt eget gale svar.</p>"
            + "<table class=\"data\"><tr><th>År</th><th>Grunnlag</th><th>Årets fradrag</th><th>Framført inn</th><th>Samlet fradrag</th><th>Utbytte</th><th>Skattepliktig</th><th>Framført ut</th></tr>"
            + "<tr><td>1</td><td class=\"n\">10 000</td><td class=\"n\">200</td><td class=\"n\">0</td><td class=\"n\">200</td><td class=\"n\">500</td><td class=\"n\">300</td><td class=\"n\">0</td></tr>"
            + "<tr><td>2</td><td class=\"n\">10 000</td><td class=\"n\">200</td><td class=\"n\">0</td><td class=\"n\">200</td><td class=\"n\">100</td><td class=\"n\">0</td><td class=\"n\">100</td></tr>"
            + "<tr><td>3</td><td class=\"n\">10 100</td><td class=\"n\">202</td><td class=\"n\">100</td><td class=\"n\">302</td><td class=\"n\">400</td><td class=\"n\">98</td><td class=\"n\">0</td></tr></table>"
            + "<p><b>Steg 1 — grunnlaget i år 3.</b> Kostpris + framført ubenyttet skjerming = 10 000 + 100 = kr 10 100.</p>"
            + "<p><b>Steg 2 — årets fradrag.</b> 10 100 × 2 % = kr 202.</p>"
            + "<p><b>Steg 3 — samlet fradrag.</b> Årets fradrag pluss den framførte skjermingen: 202 + 100 = kr 302.</p>"
            + "<p><b>Steg 4 — skattepliktig utbytte.</b> 400 − 302 = <b>kr 98</b>.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> Kr 202 er årets fradrag alene — du glemte å legge til den framførte skjermingen i selve fradraget. Kr 302 er det samlede fradraget, altså riktig mellomresultat på feil linje. Kr 100 er den framførte skjermingen alene.</p>"
            + "<p><b>Kontroll — to blindveier som bekrefter at du gjorde det riktig.</b> Hadde du glemt framføringen helt, ville svaret blitt 400 − 200 = 200. Hadde du bare lagt den til grunnlaget uten å trekke den fra i tillegg, ville svaret blitt 400 − 202 = 198. Ingen av de to tallene er blant alternativene — oppgaven forutsetter altså begge virkningene av framføringen.</p>"
            + "<p><b>Regelen:</b> ubenyttet skjerming legges til skjermingsgrunnlaget <i>og</i> kommer til fradrag. Skjermingen er personlig og aksjevis, så den følger den enkelte aksjen.</p>" },
      ] },

    /* ---------------------------------------------------------------- 2 */
    { n: 2, title: "Skatt på aksjegevinst med ubenyttet skjerming", points: 1, topic: "Gevinst og oppjustering",
      chapters: [5],
      body: "<p>Runar kjøpte en aksje for kr 50 i år 1 og selger den på slutten av år 2 for kr 60. Han har et ubenyttet skjermingsfradrag på kr 5. Hva betaler Runar i skatt på aksjegevinsten sin? Eierskatten er 22% og oppjusteringsfaktoren 1,72.</p>",
      options: ["Kr 3,89", "Kr 0", "Kr 3,1", "Kr 1,89"],
      answer: 3,
      solution: "<p><b>Steg 1 — gevinsten.</b> Salgspris − kostpris − ubenyttet skjerming = 60 − 50 − 5 = <b>kr 5</b>.</p>"
        + "<p><b>Steg 2 — oppjusteringen.</b> Gevinsten oppjusteres med f = 1,72: 5 × 1,72 = 8,60.</p>"
        + "<p><b>Steg 3 — skatten.</b> 8,60 × 22 % = 1,892 → <b>kr 1,89</b>.</p>"
        + "<p><b>Kontroll — samme tall den andre veien.</b> Oppjusteringen kan gjøres på satsen i stedet for på grunnlaget: t<sub>e</sub> = 22 % × 1,72 = 37,84 %, og 5 × 37,84 % = 1,892. ✓ Begge veier er tillatt, og å regne begge er den billigste kontrollen som finnes i dette kurset.</p>"
        + "<p><b>Hvorfor de andre er gale.</b></p>"
        + "<p>· <b>Kr 3,89</b> ligger på det nivået du havner på hvis du glemmer den ubenyttede skjermingen og skatter av hele gevinsten på kr 10: 10 × 1,72 × 22 % = 3,78. Legg merke til at det er omtrent <i>det dobbelte</i> av riktig svar — dobbelt så mye er signaturen på et glemt skjermingsfradrag når skjermingen er halvparten av gevinsten.</p>"
        + "<p>· <b>Kr 3,1</b> er samme glemte skjerming kombinert med den gamle oppjusteringsfaktoren 1,4: 10 × 1,4 × 22 % = 3,08. Oppgaven oppgir 1,72 — bruk alltid satsen oppgaven gir, ikke den du husker fra et annet år.</p>"
        + "<p>· <b>Kr 0</b> forutsetter at skjermingen spiser hele gevinsten. Det ville krevd ubenyttet skjerming på kr 10, ikke kr 5.</p>"
        + "<p><b>Regelen:</b> ved salg trekkes både kostprisen og all framført ubenyttet skjerming fra salgssummen. Restgevinsten oppjusteres med f og skattlegges med 22 %. Ubenyttet skjerming kan redusere en gevinst til null, men kan aldri skape et fradragsberettiget tap.</p>" },

    /* ---------------------------------------------------------------- 3 */
    { n: 3, title: "Avskrivning nå eller over ti år", points: 2, topic: "Fradragets tidsverdi",
      chapters: [2],
      body: "<p>Turid eier et forretningsbygg. Hun har leid det ut slik at hun har en årlig leieinntekt de neste 10 årene på kr 100 000. Selskapsskatten er 22% og oppjusteringsfaktoren 1,72. Hun har ingen andre kostnader enn avskrivninger på forretningsbygget. Når Turid leverer sin skattemelding kan hun velge om hun hvert år de neste 10 årene kan føre bygningsavskrivninger på kr 10 000 mot årlig leieinntekt eller hun kan velge å utgiftsføre hele avskrivningen som utgjør kr 100 000 med en gang. Turid diskonterer inntektene sine med rente lik 10%. Hva bør Turid velge?</p>",
      options: ["Ta hele avskrivningen med en gang", "Ta avskrivningene årlig over 10 år", "Det spiller ingen rolle hva Turid gjør"],
      answer: 0,
      solution: "<p><b>Steg 1 — skattebesparelsen ved å vente.</b> Avskriver hun kr 10 000 i året, sparer hun 10 000 × 22 % = kr 2 200 i skatt hvert år i ti år.</p>"
        + "<p><b>Steg 2 — nåverdien av de ti beløpene.</b> Annuitetsfaktoren ved 10 % over 10 år er (1 − 1,10<sup>−10</sup>)/0,10 = 6,1446. Nåverdi = 2 200 × 6,1446 = <b>kr 13 518</b>.</p>"
        + "<p><b>Steg 3 — skattebesparelsen ved å ta alt nå.</b> 100 000 × 22 % = <b>kr 22 000</b>, mottatt i dag.</p>"
        + "<p><b>Steg 4 — sammenligningen.</b> 22 000 mot 13 518. Å ta hele avskrivningen med en gang er verdt <b>kr 8 482</b> mer i nåverdi. Riktig svar er det første alternativet.</p>"
        + "<p><b>Forutsetningen du må sjekke.</b> Fradraget er bare verdt noe hvis det finnes inntekt å føre det mot. Leieinntekten i år 1 er kr 100 000, som dekker hele avskrivningen på kr 100 000 nøyaktig. Hadde inntekten vært mindre, ville deler av fradraget måttet framføres, og regnestykket ville sett annerledes ut.</p>"
        + "<p><b>Hvorfor de andre er gale.</b></p>"
        + "<p>· <b>«Ta avskrivningene årlig over 10 år»</b> ville vært riktig bare hvis renten var null, eller hvis hun ikke hadde nok inntekt i år 1 til å bruke fradraget.</p>"
        + "<p>· <b>«Det spiller ingen rolle»</b> er svaret du får hvis du sammenligner udiskonterte kroner: 10 × 2 200 = 22 000 = 100 000 × 22 %. Nominelt er beløpene identiske. Det er hele fellen — det er <i>tidspunktet</i> som skiller dem, og renten på 10 % koster henne kr 8 482.</p>"
        + "<p><b>Distraktor i oppgaveteksten:</b> oppjusteringsfaktoren 1,72 har ingenting her å gjøre. Den gjelder utbytte og aksjegevinst hos en personlig aksjonær, ikke skatt på leieinntekt. Eksamen tar med satser du ikke skal bruke.</p>"
        + "<p><b>Regelen:</b> et fradrag er verdt mer jo tidligere det tas, fordi skattebesparelsen diskonteres. Ta fradraget så tidlig som inntekten tillater.</p>" },

    /* ---------------------------------------------------------------- 4 */
    { n: 4, title: "Bunnfradrag og progressivitet", points: 3, topic: "Progressivitet",
      chapters: [1, 10],
      body: "<p>Regjeringen har vedtatt at skattesatsen på all inntekt er 28%. Kari har 500 kr i inntekt mens Per har kr 1000 i inntekt. Regjeringen har avskaffet bunnfradraget.</p>"
        + "<p class=\"tiny\">Nøkkelen til alle tre delspørsmålene er én formel: med flat sats t og bunnfradrag B er gjennomsnittsskatten t(1 − B/Y). Den er konstant når B = 0 og stigende i Y for enhver B &gt; 0.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hvilke egenskaper har dette skattesystemet:</p>",
          options: ["Skattesystemet er regressivt", "Skattesystemet er progressivt", "Skattesystemet er verken progressivt eller regressivt"],
          answer: 2,
          solution: "<p><b>Steg 1 — regn gjennomsnittsskatten for begge.</b> Uten bunnfradrag betaler Kari 500 × 28 % = kr 140 og Per 1 000 × 28 % = kr 280. Gjennomsnittsskatten er 140/500 = <b>28 %</b> og 280/1 000 = <b>28 %</b>.</p>"
            + "<p><b>Steg 2 — definisjonene.</b> Et skattesystem er <b>progressivt</b> når gjennomsnittsskatten stiger med inntekten, <b>regressivt</b> når den faller, og <b>proporsjonalt</b> (verken–eller) når den er konstant. Her er den konstant. Riktig svar er det tredje alternativet.</p>"
            + "<p><b>Hvorfor de andre er gale — og hvorfor de likevel frister.</b> Per betaler dobbelt så mye <i>i kroner</i> som Kari (280 mot 140), og det er lett å kalle progressivt. Men progressivitet handler om <i>andelen</i>, ikke beløpet. En flat sats gir alltid et høyere beløp fra den som tjener mest, og det gjør den ikke progressiv. «Regressivt» ville krevd at Per betalte en lavere andel enn Kari.</p>"
            + "<p><b>Merk skillet marginal/gjennomsnitt.</b> Marginalskatten er 28 % overalt. Fordi det ikke finnes noe fradrag, er gjennomsnittsskatten lik marginalskatten for alle. Progressivitet oppstår nettopp der de to skiller lag.</p>"
            + "<p><b>Regelen:</b> progressivitet = stigende gjennomsnittsskatt. En flat sats uten fradrag er proporsjonal.</p>" },

        { label: "b", points: 1,
          body: "<p>Regjeringen innfører nå et bunnfradrag på kr 50. Hvilke egenskaper har dette skattesystemet</p>",
          options: ["Skattesystemet er regressivt", "Skattesystemet er progressivt", "Skattesystemet er verken progressivt eller regressivt"],
          answer: 1,
          solution: "<p><b>Steg 1 — Kari.</b> (500 − 50) × 28 % = 450 × 0,28 = kr 126. Gjennomsnittsskatt 126/500 = <b>25,2 %</b>.</p>"
            + "<p><b>Steg 2 — Per.</b> (1 000 − 50) × 28 % = 950 × 0,28 = kr 266. Gjennomsnittsskatt 266/1 000 = <b>26,6 %</b>.</p>"
            + "<p><b>Steg 3.</b> 26,6 % &gt; 25,2 %: gjennomsnittsskatten stiger med inntekten. Systemet er <b>progressivt</b>.</p>"
            + "<p><b>Hvorfor det virker slik.</b> Bunnfradraget er det samme kronebeløpet for begge, men det utgjør 10 % av Karis inntekt og bare 5 % av Pers. Den som tjener minst får skjermet den største <i>andelen</i> av inntekten sin, og betaler derfor en lavere andel i skatt. Det er hele mekanismen bak et progressivt skattesystem med flat sats.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> «Regressivt» krever fallende gjennomsnittsskatt; her stiger den. «Verken–eller» var svaret i deloppgave a, og det gjelder bare uten bunnfradrag.</p>"
            + "<p><b>Kontroll:</b> formelen t(1 − B/Y) gir 0,28 × (1 − 50/500) = 25,2 % og 0,28 × (1 − 50/1 000) = 26,6 %. ✓ Uttrykket stiger i Y for enhver positiv B.</p>"
            + "<p><b>Regelen:</b> et bunnfradrag gjør en flat sats progressiv. Du trenger ikke flere satser for å få progressivitet — ett fradrag holder.</p>" },

        { label: "c", points: 1,
          body: "<p>Regjeringen øker bunnfradraget til kr 200. Skattesatsen er som før 28% på inntekt. Hvilke egenskaper har dette skattesystemet sammenliknet med skattesystemet under spørsmål (b)?</p>",
          options: ["Skattesystemet er regressivt men mindre regressivt enn under spørsmål b.",
                    "Skattesystemet er like progressivt som under spørsmål b.",
                    "Skattesystemet er progressivt, og progressiviteten er sterkere enn under spørsmål (b).",
                    "Skattesystemet er progressivt. Progressiviteten er svakere enn under spørsmål (b)"],
          answer: 2,
          solution: "<p><b>Steg 1 — Kari.</b> (500 − 200) × 28 % = 300 × 0,28 = kr 84. Gjennomsnittsskatt 84/500 = <b>16,8 %</b>.</p>"
            + "<p><b>Steg 2 — Per.</b> (1 000 − 200) × 28 % = 800 × 0,28 = kr 224. Gjennomsnittsskatt 224/1 000 = <b>22,4 %</b>.</p>"
            + "<p><b>Steg 3 — sammenlign spredningen.</b></p>"
            + "<table class=\"data\"><tr><th>Bunnfradrag</th><th>Kari (500)</th><th>Per (1 000)</th><th>Forskjell</th></tr>"
            + "<tr><td>0</td><td class=\"n\">28,0 %</td><td class=\"n\">28,0 %</td><td class=\"n\">0,0 pp</td></tr>"
            + "<tr><td>50</td><td class=\"n\">25,2 %</td><td class=\"n\">26,6 %</td><td class=\"n\">1,4 pp</td></tr>"
            + "<tr><td>200</td><td class=\"n\">16,8 %</td><td class=\"n\">22,4 %</td><td class=\"n\">5,6 pp</td></tr></table>"
            + "<p>Avstanden i gjennomsnittsskatt vokser fra 1,4 til 5,6 prosentpoeng. Systemet er fortsatt progressivt, og <b>sterkere</b> progressivt enn under (b). Riktig svar er det tredje alternativet.</p>"
            + "<p><b>Trykkfeil i sensorveiledningen.</b> Veiledningen oppgir Pers gjennomsnittsskatt til «22,42 %». Regn selv: (1 000 − 200) × 28 %/1 000 = 224/1 000 = <b>22,40 %</b>. Trykkfeilen endrer ingenting — konklusjonen om sterkere progressivitet står. Du har ikke regnet feil om du fikk 22,4 %.</p>"
            + "<p><b>Kontroll — den generelle formen.</b> Forskjellen i gjennomsnittsskatt mellom to inntekter er t · B · (1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>). Den er <i>proporsjonal med B</i>. Bunnfradraget firedobles (50 → 200), og spredningen firedobles (1,4 → 5,6 pp). ✓ Det er den eneste kontrollen du trenger her.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> «Regressivt» krever fallende gjennomsnittsskatt — den stiger. «Like progressivt» ville krevd at spredningen var uendret, men den er firedoblet. «Svakere» har fortegnet motsatt: et større bunnfradrag skjermer en større andel av den lave inntekten, aldri en mindre.</p>"
            + "<p><b>Regelen:</b> med flat sats og bunnfradrag øker progressiviteten monotont med bunnfradraget. Vil du ha mer omfordeling uten å røre satsen, øk fradraget.</p>" },
      ] },

    /* ---------------------------------------------------------------- 5 */
    { n: 5, title: "Gjennomsnittsskatt i et trinnsystem", points: 2, topic: "Trinnskatt",
      chapters: [1],
      body: "<p>Individ A rapporterer en skattepliktig inntekt på kr 450,000, og individ X har en skattepliktig inntekt på kr 380,000. Individene bor i et land med et skattesystem der:</p>"
        + "<ul><li>Inntekt under kr 100 000 beskattes med 12%;</li>"
        + "<li>Inntekt mellom kr 100 000 og kr 350 000 beskattes med 18%; og</li>"
        + "<li>Inntekt over kr 350 000 beskattes med 28%.</li></ul>"
        + "<p>Hvilken gjennomsnittsskatt har individ A og X (rund av til en desimal etter svaret)</p>",
      options: ["Gjennomsnittsskatten til A er 16,9% og til X er den 15,9%",
                "Gjennomsnittsskatten til A er 14,1% og til X er den 11,3%",
                "Gjennomsnittsskatten til A er 18,9% og til X er den 17,2%",
                "Gjennomsnittsskatten til A er 17,5% og til X er den 15,0%"],
      answer: 2,
      solution: "<p><b>Steg 1 — de to nederste trinnene er like for begge.</b> Begge har inntekt over kr 350 000, så begge fyller de to nederste trinnene helt: 12 % × 100 000 = kr 12 000, og 18 % × 250 000 = kr 45 000. Til sammen <b>kr 57 000</b> for begge.</p>"
        + "<p><b>Steg 2 — toppsjiktet, som er det eneste som skiller dem.</b> A: 28 % × (450 000 − 350 000) = 28 % × 100 000 = kr 28 000. X: 28 % × (380 000 − 350 000) = 28 % × 30 000 = kr 8 400.</p>"
        + "<p><b>Steg 3 — samlet skatt.</b> A: 12 000 + 45 000 + 28 000 = <b>kr 85 000</b>. X: 12 000 + 45 000 + 8 400 = <b>kr 65 400</b>.</p>"
        + "<p><b>Steg 4 — gjennomsnittsskatten.</b> A: 85 000/450 000 = 18,889 % → <b>18,9 %</b>. X: 65 400/380 000 = 17,2105 % → <b>17,2 %</b>.</p>"
        + "<table class=\"data\"><tr><th>Trinn</th><th>Sats</th><th>Individ A (450 000)</th><th>Individ X (380 000)</th></tr>"
        + "<tr><td>0–100 000</td><td class=\"n\">12 %</td><td class=\"n\">12 000</td><td class=\"n\">12 000</td></tr>"
        + "<tr><td>100 000–350 000</td><td class=\"n\">18 %</td><td class=\"n\">45 000</td><td class=\"n\">45 000</td></tr>"
        + "<tr><td>over 350 000</td><td class=\"n\">28 %</td><td class=\"n\">28 000</td><td class=\"n\">8 400</td></tr>"
        + "<tr><td><b>Sum skatt</b></td><td class=\"n\"></td><td class=\"n\"><b>85 000</b></td><td class=\"n\"><b>65 400</b></td></tr>"
        + "<tr><td><b>Gjennomsnittsskatt</b></td><td class=\"n\"></td><td class=\"n\"><b>18,9 %</b></td><td class=\"n\"><b>17,2 %</b></td></tr></table>"
        + "<p><b>Trykkfeil i sensorveiledningen — les dette.</b> Veiledningens siste setning sier at «den effektive skattesatsen for Individ X vil være 17,1 %». Det er feil. 65 400/380 000 = 17,2105 %, som med oppgavens eget krav om én desimal blir <b>17,2 %</b>. Både skatten (65 400) og inntekten (380 000) er korrekt utledet i samme avsnitt; bare siste desimal er skrevet feil. <b>Svaralternativet er riktig.</b> Får du 17,2 %, har du regnet riktig — ikke la deg forvirre av veiledningsteksten.</p>"
        + "<p><b>Elimineringen — den er raskere enn regningen.</b> En person med nøyaktig kr 350 000 betaler kr 57 000, altså 57 000/350 000 = <b>16,29 %</b> i gjennomsnitt. Alt over 350 000 skattlegges med 28 %, som er høyere enn 16,29 %, så gjennomsnittsskatten må <i>stige</i> over 16,29 % for enhver inntekt over terskelen. Begge individene ligger over. Da faller:</p>"
        + "<p>· <b>(i) 16,9 % og 15,9 %</b> — X ligger under 16,29 %. Umulig.</p>"
        + "<p>· <b>(ii) 14,1 % og 11,3 %</b> — begge under 16,29 %. Umulig.</p>"
        + "<p>· <b>(iv) 17,5 % og 15,0 %</b> — X ligger under. Umulig. Og 15,0 % er dessuten nøyaktig 57 000/380 000, altså det du får hvis du glemmer det øverste trinnet helt.</p>"
        + "<p>Bare (iii) har begge tallene over 16,29 %. Med minuspoeng er dette den typen argument som gjør et gjett til et svar.</p>"
        + "<p><b>Kontroll:</b> A har kr 70 000 mer i inntekt enn X, og hele differansen ligger i 28 %-sjiktet. 28 % × 70 000 = 19 600, og 85 000 − 65 400 = 19 600. ✓</p>"
        + "<p><b>Regelen:</b> i et trinnsystem skattlegges hvert trinn for seg, aldri hele inntekten med toppsatsen. Gjennomsnittsskatten ligger alltid mellom laveste sats og marginalsatsen, og nærmer seg marginalsatsen jo mer av inntekten som ligger i toppen.</p>" },

    /* ---------------------------------------------------------------- 6 */
    { n: 6, title: "Formuesskatt: gjeldsfordeling og nettoformue", points: 4, topic: "Formuesskatt",
      chapters: [7],
      body: "<p>Bottolf har 1 800 000 kroner i gjeld per 1. januar 2023. Han har en formue før verdsettingsrabatter ved årsskiftet på 6 000 000 kroner. I formuen inngår en primærbolig med verdi 4,8 mill., aksjer med markedsverdi/formuesverdi kr 1 mill., samt et innskudd i bank på kr 200 000. Primærbolig og aksjer har verdsettingsrabatter på henholdsvis 75% og 20%. Gjeld som henføres til primærbolig skal ikke reduseres med verdsettingsrabatten.</p>",
      parts: [
        { label: "a", points: 2,
          body: "<p>Hvor mye skal gjelden på 1,8 mill. reduseres med siden gjelden skal fordeles forholdsmessige mellom aktiva og reduseres med verdsettingsrabattene.</p>",
          options: ["Kr 165 000", "Kr 150 000", "Kr 145 000", "Kr 60 000"],
          answer: 3,
          solution: "<p><b>Steg 1 — andelene av bruttoformuen.</b> Gjelden fordeles etter aktivaenes verdi <i>før</i> rabatt: primærbolig 4,8/6,0 = <b>80 %</b>, aksjer 1,0/6,0 = <b>16⅔ %</b>, bankinnskudd 0,2/6,0 = <b>3⅓ %</b>.</p>"
            + "<p><b>Steg 2 — gjelden fordeles.</b> 1 800 000 × 80 % = 1 440 000 på boligen, × 16⅔ % = 300 000 på aksjene, × 3⅓ % = 60 000 på banken.</p>"
            + "<p><b>Steg 3 — hvilken gjeld reduseres.</b> Gjeld henført til et rabattert aktivum reduseres med samme rabattsats. Men oppgaven sier uttrykkelig at <i>boliggjelden ikke skal reduseres</i>, og bankinnskudd har ingen rabatt. Bare aksjegjelden treffes: 300 000 × 20 % = <b>kr 60 000</b> i reduksjon, slik at 240 000 blir fradragsberettiget.</p>"
            + "<p><b>Steg 4 — fradragsberettiget gjeld.</b> 1 440 000 + 240 000 + 60 000 = kr 1 740 000. Reduksjonen er 1 800 000 − 1 740 000 = <b>kr 60 000</b>.</p>"
            + "<table class=\"data\"><tr><th></th><th>Primærbolig</th><th>Aksjer</th><th>Bank</th><th>Sum</th></tr>"
            + "<tr><td>Verdi før rabatt</td><td class=\"n\">4 800 000</td><td class=\"n\">1 000 000</td><td class=\"n\">200 000</td><td class=\"n\">6 000 000</td></tr>"
            + "<tr><td>Andel av bruttoformuen</td><td class=\"n\">80 %</td><td class=\"n\">16⅔ %</td><td class=\"n\">3⅓ %</td><td class=\"n\">100 %</td></tr>"
            + "<tr><td>Rabatt</td><td class=\"n\">75 %</td><td class=\"n\">20 %</td><td class=\"n\">0 %</td><td class=\"n\"></td></tr>"
            + "<tr><td>Gjeld fordelt</td><td class=\"n\">1 440 000</td><td class=\"n\">300 000</td><td class=\"n\">60 000</td><td class=\"n\">1 800 000</td></tr>"
            + "<tr><td>Fradragsberettiget gjeld</td><td class=\"n\">1 440 000</td><td class=\"n\">240 000</td><td class=\"n\">60 000</td><td class=\"n\">1 740 000</td></tr>"
            + "<tr><td><b>Reduksjon</b></td><td class=\"n\">0</td><td class=\"n\"><b>60 000</b></td><td class=\"n\">0</td><td class=\"n\"><b>60 000</b></td></tr></table>"
            + "<p><b>Elimineringen — den koster deg ti sekunder.</b> Bare ett aktivum har en rabatt som slår inn på gjelden, nemlig aksjene, og gjelden henført dit er kr 300 000. Reduksjonen kan derfor <i>aldri</i> overstige 20 % × 300 000 = kr 60 000. Alle de tre andre alternativene (145 000, 150 000, 165 000) ligger over dette taket og er umulige. De svarer til at du har redusert mer gjeld enn regelen tillater — typisk ved også å ta rabatt på boliggjelden, eller ved å fordele gjelden etter de rabatterte verdiene i stedet for bruttoverdiene.</p>"
            + "<p><b>Kontroll:</b> 1 740 000/1 800 000 = 96,67 %, altså er 3,33 % av gjelden strøket. Og 3,33 % er nøyaktig 20 % av de 16,67 % som ligger på aksjene. ✓</p>"
            + "<p><b>Regelen:</b> gjelden fordeles forholdsmessig etter aktivaenes <b>bruttoverdi før rabatt</b>; deretter reduseres den delen som er henført til et rabattert aktivum med samme rabattsats. Fordeler du etter de rabatterte verdiene, får du systematisk feil svar.</p>" },

        { label: "b", points: 2,
          body: "<p>Hva er Bottolfs skattepliktige nettoformue</p>",
          options: ["Kr 265 000", "Kr 600 000", "Kr 440 000", "Kr 460 000"],
          answer: 3,
          solution: "<p><b>Steg 1 — de skattemessige formuesverdiene.</b> Primærbolig 4 800 000 × 25 % = 1 200 000. Aksjer 1 000 000 × 80 % = 800 000. Bank 200 000 × 100 % = 200 000. Sum <b>kr 2 200 000</b>.</p>"
            + "<p><b>Steg 2 — fradragsberettiget gjeld</b>, fra deloppgave a: <b>kr 1 740 000</b>.</p>"
            + "<p><b>Steg 3 — nettoformuen.</b> 2 200 000 − 1 740 000 = <b>kr 460 000</b>.</p>"
            + "<p><b>Kontroll — aktivum for aktivum.</b> Boligen: 1 200 000 − 1 440 000 = −240 000. Aksjene: 800 000 − 240 000 = +560 000. Banken: 200 000 − 60 000 = +140 000. Sum: −240 000 + 560 000 + 140 000 = 460 000. ✓ Legg merke til at boligen alene gir negativ nettoformue — det er ikke en feil, det er hele grunnen til at primærboligen er så gunstig i formuesskatten.</p>"
            + "<p><b>Elimineringen.</b> Fradragsberettiget gjeld må ligge mellom 1 740 000 (full tillatt reduksjon) og 1 800 000 (ingen reduksjon i det hele tatt). Nettoformuen må derfor ligge mellom kr 400 000 og kr 460 000. Kr 600 000 og kr 265 000 faller utenfor og kan strykes uten regning.</p>"
            + "<p><b>Hvorfor de andre er gale.</b></p>"
            + "<p>· <b>Kr 600 000</b> er en gjenkjennelig dobbeltfeil: 4 800 000 × 25 % + 1 000 000 + 200 000 − 1 800 000 = 2 400 000 − 1 800 000. Du glemte aksjerabatten på aktivasiden <i>og</i> gjeldsreduksjonen. De to feilene henger sammen — glemmer du rabatten ett sted, glemmer du den gjerne begge steder.</p>"
            + "<p>· <b>Kr 440 000</b> forutsetter fradragsberettiget gjeld på 1 760 000, som ingen regel gir. Tallet ligger så nær riktig svar at det fanger regnefeil, ikke metodefeil.</p>"
            + "<p>· <b>Kr 265 000</b> ligger langt under gulvet på 400 000 og forutsetter at langt mer gjeld enn hele bruttogjelden kommer til fradrag.</p>"
            + "<p><b>Merk hva spørsmålet spør om.</b> Det spør om <i>nettoformuen</i>, ikke om formuesskatten. Bunnfradraget skal derfor ikke trekkes fra, og satsen på 1,0 % skal ikke brukes. Hadde det spurt om skatten, ville nettoformuen på 460 000 vært godt under bunnfradraget og skatten null.</p>"
            + "<p><b>Regelen:</b> nettoformue = sum rabatterte formuesverdier − fradragsberettiget gjeld. Rabatten skal alltid gjøres på begge sider av regnestykket.</p>" },
      ] },

    /* ---------------------------------------------------------------- 7 */
    { n: 7, title: "Utbyttet som skal dekke formuesskatten", points: 1, topic: "Formuesskatt og utbytte",
      chapters: [8],
      body: "<p>Leah Løs eier en bedrift som har formuesverdi på kr 100. Hun må betale 1% i formuesskatt av formuesverdien. Hun har likviditetsutfordringer og må ta utbytte for å betale formuesskatten. Samtidig må hun sikre at utbyttet er stort nok til å betale eierskatten på 37,8%. Hvor stort utbytte må Leah ta for å dekke både formuesskatten og skatt på utbytte (rund av til en desimal)?</p>",
      options: ["Kr 2", "Kr 2,1", "Kr 1,2", "Kr 1,6"],
      answer: 3,
      solution: "<p><b>Steg 1 — hva som må stå igjen.</b> Formuesskatten er 1 % × 100 = <b>kr 1</b>. Det er beløpet som må ligge i lommen hennes <i>etter</i> at eierskatten er betalt.</p>"
        + "<p><b>Steg 2 — sett opp bruttoregningen.</b> Tar hun ut et utbytte D, sitter hun igjen med D × (1 − 0,378) = 0,622D. Kravet er 0,622D = 1.</p>"
        + "<p><b>Steg 3 — løs.</b> D = 1/0,622 = 1,6077 → <b>kr 1,6</b> (oppgaven ber om én desimal).</p>"
        + "<p><b>Kontroll:</b> 1,6077 × 37,8 % = 0,6077 i utbytteskatt, og 1,6077 − 0,6077 = 1,0000, som går rett til formuesskatten. ✓ Med det avrundede tallet: 1,6 × 0,622 = 0,9952 ≈ 1.</p>"
        + "<p><b>Hvorfor de andre er gale — regn ut hvilken sats hvert alternativ forutsetter.</b> Løser du (D − 1)/D, får du den skattesatsen alternativet svarer til:</p>"
        + "<table class=\"data\"><tr><th>Alternativ</th><th>Implisitt skattesats (D − 1)/D</th><th>Hva feilen er</th></tr>"
        + "<tr><td class=\"n\">Kr 1,2</td><td class=\"n\">16,7 %</td><td>Skatten lagt på toppen i stedet for bruttoregnet, og med feil sats: 1 × 1,22 = 1,22. Du gangar, du skal dele.</td></tr>"
        + "<tr><td class=\"n\">Kr 1,6</td><td class=\"n\">37,5 %</td><td><b>Riktig</b> (37,5 % er avrundingsutslaget; eksakt 1,6077 gir 37,8 %).</td></tr>"
        + "<tr><td class=\"n\">Kr 2</td><td class=\"n\">50,0 %</td><td>Forutsetter en eierskatt på 50 %.</td></tr>"
        + "<tr><td class=\"n\">Kr 2,1</td><td class=\"n\">52,4 %</td><td>Forutsetter en eierskatt på 52,4 %.</td></tr></table>"
        + "<p><b>Elimineringen.</b> Eierskatten er 37,8 %, altså <i>under</i> 50 %. Bruttoregning med en sats under 50 % kan aldri mer enn doble beløpet, så D må være mindre enn kr 2. Både kr 2 og kr 2,1 kan strykes uten å regne. Da står du igjen med kr 1,2 og kr 1,6, og siden 1,2 × 0,622 = 0,746 ikke rekker til kr 1, er svaret gitt.</p>"
        + "<p><b>Regelen:</b> D = τ<sub>w</sub>·W/(1 − t<sub>e</sub>). Skal et beløp N være igjen etter en skatt t, må uttaket være N/(1 − t) — ikke N × (1 + t). Å legge skatten på toppen er den klassiske feilen, og den blir grovere jo høyere satsen er.</p>"
        + "<p><b>Poenget bak oppgaven:</b> formuesskatten på et unotert selskap må ofte betales med penger som selv beskattes på veien ut. Den effektive belastningen på eieren er derfor τ<sub>w</sub>/(1 − t<sub>e</sub>) = 1 %/0,622 = 1,61 % av formuesverdien, ikke 1 %. Det er hovedargumentet mot formuesskatten i forelesningene.</p>" },

    /* ---------------------------------------------------------------- 8 */
    { n: 8, title: "Insidens: hvem bærer stykkskatten", points: 9, topic: "Skatteinsidens",
      chapters: [11],
      body: "<p>I et frikonkurransemarked er etterspørselen (D) lik tilbudet (S) slik at likevekt gis ved ligningen</p>"
        + "<p style=\"text-align:center\">D(P) = S(P),</p>"
        + "<p>hvor P er prisen. Anta at myndigheten ilegger en skatt pr enhet solgt på t som skal kreves inn av produsentene slik at vi har sammenhengen P = p + t, hvor p er produsentprisen, P er konsumentprisen og t er stykkskatten. Likevekten blir da:</p>"
        + "<p style=\"text-align:center\">D(P) = S(p + t)</p>",
      solution: "<p>Dette er kursets mest testede enkelttema, og de tre delspørsmålene henger på én derivasjon. Lær den, så er alle ni poengene sikre.</p>"
        + "<p><b>Utledningen.</b> Skriv likevekten som en funksjon av produsentprisen alene. Siden P = p + t er</p>"
        + "<p style=\"text-align:center\">D(p + t) = S(p)</p>"
        + "<p>Deriver begge sider med hensyn på t. Venstresiden er en sammensatt funksjon: argumentet p + t endrer seg med ∂p/∂t + 1 når t øker med én enhet.</p>"
        + "<p style=\"text-align:center\">D′(P) · (∂p/∂t + 1) = S′(p) · ∂p/∂t</p>"
        + "<p style=\"text-align:center\">D′ · ∂p/∂t + D′ = S′ · ∂p/∂t</p>"
        + "<p style=\"text-align:center\">D′ = (S′ − D′) · ∂p/∂t</p>"
        + "<p style=\"text-align:center\"><b>∂p/∂t = D′(P) / (S′(p) − D′(P))</b></p>"
        + "<p>Konsumentprisen følger direkte av P = p + t:</p>"
        + "<p style=\"text-align:center\"><b>∂P/∂t = ∂p/∂t + 1 = D′/(S′ − D′) + (S′ − D′)/(S′ − D′) = S′(p) / (S′(p) − D′(P))</b></p>"
        + "<p><b>Fortegnene — dette er det du faktisk luker ut alternativer med.</b></p>"
        + "<p>· D′ &lt; 0: etterspurt mengde faller når prisen stiger.</p>"
        + "<p>· S′ &gt; 0: tilbudt mengde stiger når prisen stiger.</p>"
        + "<p>· Nevneren S′ − D′ = S′ + |D′| er derfor <b>alltid strengt positiv</b>. Den kan aldri bli null eller negativ, og du trenger aldri bekymre deg for fortegnsskifte i brøken.</p>"
        + "<p>Da følger tre ting du kan bruke som filter på ethvert alternativ:</p>"
        + "<p><b>1.</b> ∂p/∂t = D′/(S′ − D′) har negativ teller og positiv nevner, altså <b>negativ verdi mellom −1 og 0</b>. Produsentprisen faller, men aldri med mer enn hele skatten.</p>"
        + "<p><b>2.</b> ∂P/∂t = S′/(S′ − D′) har positiv teller og positiv nevner, og telleren er mindre enn nevneren, altså <b>positiv verdi mellom 0 og 1</b>. Konsumentprisen stiger, men aldri med mer enn skatten.</p>"
        + "<p><b>3.</b> De to summerer alltid til nøyaktig 1: ∂P/∂t − ∂p/∂t = (S′ − D′)/(S′ − D′) = 1. Skatten deles mellom de to sidene av markedet — aldri mer, aldri mindre.</p>"
        + "<p><b>Elastisitetsregelen bak algebraen.</b> Den siden av markedet som er <i>minst</i> elastisk bærer den største delen av skatten, fordi den har færrest alternativer. Perfekt uelastisk etterspørsel (insulin) → konsumentene bærer alt. Perfekt elastisk etterspørsel → produsentene bærer alt. Symmetrisk på tilbudssiden. Og legg merke til at ingenting i utledningen bruker <i>hvem som innkrever</i> skatten: den formelle og den reelle insidensen er to forskjellige ting.</p>",
      parts: [
        { label: "a", points: 3,
          body: "<p>Hvilket av uttrykkene under viser effekten på produsentprisen når skatten øker marginalt?</p>",
          options: ["∂p/∂t = (D′(P) − S′(p)) / (S′(p) − D′(P))",
                    "∂p/∂t = D′(P) / (S′(p) − D′(P))",
                    "∂p/∂t = D′(P) / S′(p)",
                    "∂p/∂t = S′(P) / (S′(p) − D′(P))"],
          answer: 1,
          solution: "<p>Riktig er <b>∂p/∂t = D′(P)/(S′(p) − D′(P))</b>. Utledningen står under «Samlet kommentar».</p>"
            + "<p><b>Slik luker du ut de tre andre uten å derivere:</b></p>"
            + "<p>· <b>(D′ − S′)/(S′ − D′)</b> har teller = −(nevner). Brøken er derfor <b>identisk lik −1</b>, uansett hvordan kurvene ser ut. Et generelt insidensuttrykk kan ikke være en konstant — da ville skattefordelingen vært den samme i alle markeder, og hele elastisitetsteorien var overflødig. (−1 er forøvrig riktig svar i grensetilfellet perfekt elastisk etterspørsel, der produsentene bærer alt. Alternativet er altså et riktig svar på et annet spørsmål.)</p>"
            + "<p>· <b>D′(P)/S′(p)</b> har riktig fortegn — negativt — men mangler tilbakekoblingen. Er etterspørselen bratt og tilbudet flatt, blir tallverdien større enn 1, og en produsentpris som faller med <i>mer</i> enn hele skatten er umulig. Dette er uttrykket du får hvis du deriverer bare den ene siden av likevekten og glemmer at p endrer seg på begge sider.</p>"
            + "<p>· <b>S′(P)/(S′(p) − D′(P))</b> har positiv teller og positiv nevner, altså positiv verdi. En stykkskatt på produsentene kan ikke løfte produsentprisen. Dette er svaret på deloppgave b — se etter om telleren er D′ eller S′, det er hele forskjellen mellom de to spørsmålene.</p>"
            + "<p><b>Regelen:</b> produsentprisen faller med en brøkdel av skatten, og brøkdelen er etterspørselens helning i forhold til summen av de to helningene.</p>" },

        { label: "b", points: 3,
          body: "<p>Hvilket av uttrykkene under karakteriserer endringen i konsumentprisen når stykkskatten øker marginalt?</p>",
          options: ["∂P/∂t = S′(p) / (S′(p) − D′(P))",
                    "∂P/∂t = D′(p) / (S′(p) − D′(P))",
                    "∂P/∂t = (S′(p) − D′(P)) / S′(p)",
                    "∂P/∂t = S′(p) / (D(p) − S′(P))"],
          answer: 0,
          solution: "<p>Riktig er <b>∂P/∂t = S′(p)/(S′(p) − D′(P))</b>. Den følger av P = p + t: ∂P/∂t = ∂p/∂t + 1, og du legger til 1 ved å skrive 1 som (S′ − D′)/(S′ − D′).</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>D′(p)/(S′(p) − D′(P))</b> er uttrykket fra deloppgave a, altså <i>produsentprisen</i>. Det er negativt, og konsumentprisen stiger når skatten øker. Fortegnet alene avslører alternativet.</p>"
            + "<p>· <b>(S′(p) − D′(P))/S′(p)</b> er den omvendte brøken. Skriv den ut: 1 − D′/S′. Siden D′ &lt; 0 er dette <b>alltid større enn 1</b>, altså en konsumentpris som stiger med mer enn skatten. Umulig i et frikonkurransemarked med stigende tilbudskurve.</p>"
            + "<p>· <b>S′(p)/(D(p) − S′(P))</b> har to feil på én linje: nevneren bruker <i>nivået</i> D(p) der den deriverte D′(P) skal stå, og leddene er byttet om slik at fortegnet snus. Se alltid etter apostrofen — det er den letteste feilen å oppdage under tidspress.</p>"
            + "<p><b>Kontroll:</b> legg sammen svarene fra a og b. S′/(S′ − D′) − D′/(S′ − D′) = (S′ − D′)/(S′ − D′) = 1. Konsumentprisøkningen minus produsentprisfallet er nøyaktig lik skatten. ✓ Denne kontrollen fungerer på ethvert par av alternativer, og bare det riktige paret består den.</p>"
            + "<p><b>Regelen:</b> ∂P/∂t ∈ (0, 1). Konsumentens andel av skatten er S′/(S′ − D′), produsentens er |D′|/(S′ − D′), og de summerer til 1.</p>" },

        { label: "c", points: 3,
          body: "<p>Hvilket av uttrykkene under viser effekten på produsentprisen når skatten øker marginalt hvis etterspørselskurven er perfekt uelastisk?</p>",
          options: ["∂p/∂t = 0",
                    "∂p/∂t = D′(P) / (S′(p) − D′(P))",
                    "∂p/∂t = −1",
                    "∂p/∂t = S′(P) / (S′(p) − D′(P))"],
          answer: 0,
          solution: "<p><b>Steg 1 — hva perfekt uelastisk etterspørsel betyr.</b> Etterspurt mengde reagerer ikke på prisen i det hele tatt: etterspørselskurven er loddrett, og <b>D′(P) = 0</b>. Insulin er standardeksempelet — pasienten kjøper samme mengde uansett hva den koster.</p>"
            + "<p><b>Steg 2 — sett D′ = 0 inn i uttrykket fra deloppgave a.</b> ∂p/∂t = 0/(S′ − 0) = <b>0</b>.</p>"
            + "<p><b>Steg 3 — tolkningen.</b> Produsentprisen rører seg ikke. Produsentene bærer ingenting av skatten; konsumentene bærer alt.</p>"
            + "<p><b>Kontroll med deloppgave b:</b> ∂P/∂t = S′/(S′ − 0) = 1. Konsumentprisen stiger krone for krone med skatten, og summen er fortsatt 1 − 0 = 1. ✓</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>D′/(S′ − D′)</b> er det generelle uttrykket. Det er riktig svar på deloppgave a, men spørsmålet her ber om grensetilfellet — og setter du D′ = 0 i det, får du nettopp 0. Alternativet er ikke <i>galt</i> som formel, men det svarer ikke på spørsmålet.</p>"
            + "<p>· <b>−1</b> er det <i>motsatte</i> grensetilfellet: perfekt <b>elastisk</b> etterspørsel (D′ → −∞), der konsumentene forsvinner ved den minste prisøkning og produsentene må svelge hele skatten. Å bytte om «uelastisk» og «elastisk» er den vanligste feilen på hele temaet. Huskeregel: <b>u</b>elastisk = <b>u</b>rørlig kvantum = den siden betaler.</p>"
            + "<p>· <b>S′(P)/(S′(p) − D′(P))</b> blir 1 når D′ = 0. Det er riktig tall for <i>konsumentprisen</i>, men spørsmålet gjelder produsentprisen. Riktig regning, feil pris.</p>"
            + "<p><b>Regelen:</b> den minst elastiske siden bærer skatten. Perfekt uelastisk etterspørsel → ∂p/∂t = 0 og ∂P/∂t = 1. Perfekt elastisk etterspørsel → ∂p/∂t = −1 og ∂P/∂t = 0. Merk også at et loddrett etterspørselsskjema gir <i>null</i> dødvektstap: omsatt mengde endrer seg ikke, så skatten er en ren overføring fra konsumentene til staten.</p>" },
      ] },

    /* ---------------------------------------------------------------- 9 */
    { n: 9, title: "Skattefri obligasjon og implisitt skatt", points: 2, topic: "Implisitt skatt",
      chapters: [12],
      body: "<p>Finansministeren har utstedt to statsobligasjoner; obligasjon A med rente r og obligasjon B med rente R. Begge obligasjoner har samme risiko. Obligasjon A er fritatt for skatt på rentene mens obligasjon B skattlegges med den alminnelige skattesatsen på 22%. Kapitalmarkedet er velfungerende og effektivt. Med nominell avkastning menes avkastning før skatt.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hva er riktig påstand under:</p>",
          options: ["Obligasjon A har høyere nominell avkastning enn obligasjon B dvs.: r &gt; R",
                    "Obligasjon A har lavere nominell avkastning enn obligasjon B dvs.: r &lt; R",
                    "Begge obligasjonene har samme nominelle (før skatt) avkastning: r = R",
                    "Obligasjonene er ikke sammenliknbare så man kan ikke si noe om nominell avkastning."],
          answer: 1,
          solution: "<p><b>Steg 1 — likevektsbetingelsen.</b> To papirer med <i>lik risiko</i> må i et velfungerende marked gi <i>lik avkastning etter skatt</i>. Gjorde de ikke det, ville alle selge det dårligste og kjøpe det beste til prisene hadde utlignet forskjellen.</p>"
            + "<p><b>Steg 2 — sett opp de to.</b> Obligasjon A er skattefri, så avkastningen etter skatt er r. Obligasjon B skattlegges med 22 %, så avkastningen etter skatt er R(1 − 0,22) = 0,78R.</p>"
            + "<p><b>Steg 3 — løs.</b> r = (1 − t)R = 0,78R. Siden 0,78 &lt; 1 følger <b>r &lt; R</b>.</p>"
            + "<p><b>Tallillustrasjon.</b> Er R = 10 %, må r = 7,8 %. Begge gir 7,8 % etter skatt. Kjøperen av A gir avkall på 2,2 prosentpoeng i nominell avkastning — det er prisen for skattefriheten, og nettopp det som kalles den <i>implisitte skatten</i>.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>r &gt; R</b> ville betydd at det skattefavoriserte papiret både ga mer før skatt <i>og</i> slapp skatt. Det er en pengemaskin: ingen ville eid B, og prisen på A ville steget til fordelen forsvant.</p>"
            + "<p>· <b>r = R</b> ville betydd at A ga strengt høyere avkastning etter skatt enn B ved samme risiko. Samme argument: alle kjøper A, prisen stiger, r faller til 0,78R.</p>"
            + "<p>· <b>«Ikke sammenliknbare»</b> er feil nettopp fordi oppgaven har fjernet den eneste tingen som kunne gjort dem usammenlignbare: risikoen er eksplisitt lik, og markedet er eksplisitt velfungerende. Alternativet fanger den som ikke tør å bruke likevektsargumentet.</p>"
            + "<p><b>Regelen:</b> skattefavorisering prises inn i avkastningen <i>før</i> skatt. Fordelen tilfaller ikke den som kjøper i dag, men den som utstedte eller allerede eide papiret da fordelen ble innført. Det gjelder like fullt for skattefrie obligasjoner, BSU, IPS og verdsettingsrabatter i formuesskatten.</p>" },

        { label: "b", points: 1,
          body: "<p>Hvilket av uttrykkene under angir formelen for den implisitte skatten (variabelen t under) på den skattefrie obligasjonen?</p>",
          options: ["t = (R − r)/R", "t = (R − r)/r", "t = R − r", "t = (R − r × 22%)/R"],
          answer: 0,
          solution: "<p><b>Steg 1 — utgangspunktet er likevekten fra deloppgave a:</b> r = R(1 − t).</p>"
            + "<p><b>Steg 2 — løs for t.</b> 1 − t = r/R, altså t = 1 − r/R = <b>(R − r)/R</b>.</p>"
            + "<p><b>Steg 3 — kontroll med tall.</b> R = 10 %, r = 7,8 % gir t = (10 − 7,8)/10 = <b>22 %</b> — nøyaktig den eksplisitte satsen som den skattlagte obligasjonen bærer. Det er hele poenget: når risikoen er lik, er den implisitte skatten på det skattefrie papiret like stor som den eksplisitte skatten på det skattlagte. Skattefriheten er en illusjon for den marginale kjøperen.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>(R − r)/r</b> har feil nevner. Med tallene over gir den 2,2/7,8 = 28,2 %. En skattesats måles alltid i forhold til grunnlaget <i>før</i> skatt, altså R. Dette er samme feil som å regne en rabatt i prosent av utsalgsprisen etter rabatt.</p>"
            + "<p>· <b>R − r</b> er en differanse i <i>prosentpoeng</i> (2,2 pp), ikke en sats. Prosentpoeng og prosent er ikke det samme, og en skattesats er alltid en andel.</p>"
            + "<p>· <b>(R − r × 22 %)/R</b> blander den eksplisitte satsen inn i formelen. Poenget med den implisitte skatten er at den kan måles helt uten å kjenne noen skattesats — du leser den ut av markedsprisene alene. Det er derfor begrepet er nyttig.</p>"
            + "<p><b>Regelen:</b> implisitt skatt t* = 1 − r<sub>skattefri</sub>/r<sub>skattlagt</sub> = (R − r)/R. Den som har <i>lavere</i> marginalskatt enn den implisitte skatten, bør eie det skattlagte papiret; den som har høyere, bør eie det skattefrie. Skattefavoriserte aktiva ender derfor systematisk hos investorer med høy marginalskatt.</p>" },
      ] },

    /* --------------------------------------------------------------- 10 */
    { n: 10, title: "Super-Radar-Vision AS: internasjonal skatt og exit", points: 9, topic: "Internasjonal skatt",
      chapters: [13, 6],
      body: "<p>Den IT-utdannede investoren Snåza Manni er født, oppvokst og bosatt i Ytre Sandviken i Bergen og har alltid vært interessert i fremtiden. For noen år siden stiftet Manni sitt eget heleide aksjeselskap «Super-Radar-Vision AS» og har gjennom selskapet bygget opp en virksomhet innenfor «Artificial Intelligence» software. Hovedproduktet er en software som med imponerende treffsikkerhet kan forutsi resultater fra fremtidige britiske fotballkamper på elitenivå. Etter omfattende nyhetsdekning i slutten av 2023 i NHH Bulletin, ble saken raskt snappet opp av Financial Times og BBC. Deretter eksploderte etterspørselen etter programvaren globalt.</p>"
        + "<p>Manni stiftet «Super-Radar-Vision AS» med en aksjekapital på NOK 50 000. En nylig verdsettelse indikerer at aksjene i selskapet nå er verdt rundt 4 milliarder. Manni har en datter som ble ferdig på NHH i sommer med spesialisering i skatt. Hun bosatte seg deretter i Sveits og har nå familie der. «Super-Radar-Vision AS» etablerte 1. januar 2024 salgsavdelinger med flotte lokaler og egne salgsteam i USA, British Virgin Islands og Japan, og fikk kjapt stor omsetning gjennom disse avdelingene.</p>"
        + "<p>I 2024 har selskapet hatt totalt kr 100 000 000 i omsetning, hvorav:</p>"
        + "<ul><li>30 000 000 stammer fra omsetning i Norge</li>"
        + "<li>20 000 000 stammer fra omsetning i USA</li>"
        + "<li>10 000 000 stammer fra omsetning British Virgin Islands</li>"
        + "<li>40 000 000 stammer fra omsetning i Japan</li></ul>"
        + "<p>Mandag formiddag dalte en rekke brev ned i postkassen til «Super-Radar-Vision AS» i Ytre Sandviken, deriblant brev fra skattemyndighetene i USA, British Virgin Islands og Japan med beskjed om at skattemyndighetene der mener at de lokale avdelingene til selskapet utgjør såkalte «faste driftssteder» og at den lokale omsetningen derfor vil bli fullt ut skattlagt i de respektive landene. I tillegg gjorde et brev fra Mannis revisor oppmerksom på at Manni måtte huske å oppdatere formuesverdien på sine aksjer til å samsvare med virkelig verdi iht. den siste verdsettelsen.</p>"
        + "<p>Du kan forutsette at:</p>"
        + "<ul><li>Det foreligger skatteavtale mellom Norge og USA og at den bygger på unntaksmetoden med fullstendig unntak.</li>"
        + "<li>Det ikke foreligger skatteavtale mellom Norge og British Virgin Islands.</li>"
        + "<li>Det foreligger skatteavtale mellom Norge og Japan og at den bygger på den vanlige kreditmetoden.</li>"
        + "<li>Norge har bedriftsskattesats på 22%.</li>"
        + "<li>USA har bedriftsskattesats på 35 %.</li>"
        + "<li>British Virgin Islands har bedriftsskattesats på 7,5 %.</li>"
        + "<li>Japan har bedriftsskattesats på 15 %.</li>"
        + "<li>Selskapet «Super-Radar-Vision AS» har ingen kostnader i 2024 knyttet til inntektene nevnt ovenfor.</li></ul>"
        + "<p>Manni har overhørt i køen på Rema ved NHH at du nylig har hatt forelesninger i internasjonal skatterett på masternivå. Han ringer derfor nå til deg og har følgende spørsmål:</p>",
      solution: "<p>Ni delspørsmål, ni poeng, og alle henger på tre regler og ett kart. Tegn kartet først, så svarer delspørsmålene seg selv.</p>"
        + "<table class=\"data\"><tr><th>Marked</th><th>Omsetning</th><th>Skatteavtale</th><th>Metode</th><th>Skatt lokalt</th><th>Skatt i Norge</th><th>Samlet</th></tr>"
        + "<tr><td>Norge</td><td class=\"n\">30 000 000</td><td>—</td><td>Intern rett</td><td class=\"n\">—</td><td class=\"n\">6 600 000</td><td class=\"n\">22,0 %</td></tr>"
        + "<tr><td>USA</td><td class=\"n\">20 000 000</td><td>Ja</td><td>Fullstendig unntak</td><td class=\"n\">7 000 000</td><td class=\"n\">0</td><td class=\"n\">35,0 %</td></tr>"
        + "<tr><td>Japan</td><td class=\"n\">40 000 000</td><td>Ja</td><td>Vanlig kredit</td><td class=\"n\">6 000 000</td><td class=\"n\">2 800 000</td><td class=\"n\">22,0 %</td></tr>"
        + "<tr><td>BVI</td><td class=\"n\">10 000 000</td><td>Nei</td><td>Ingen lettelse</td><td class=\"n\">750 000</td><td class=\"n\">2 200 000</td><td class=\"n\">29,5 %</td></tr>"
        + "<tr><td><b>Sum</b></td><td class=\"n\"><b>100 000 000</b></td><td></td><td></td><td class=\"n\"><b>13 750 000</b></td><td class=\"n\"><b>11 600 000</b></td><td class=\"n\"><b>25,35 %</b></td></tr></table>"
        + "<p><b>Regel 1 — globalskatteplikt.</b> Et selskap hjemmehørende i Norge er etter intern rett skattepliktig hit for hele sin verdensinntekt. Skatteavtaler <i>begrenser</i> denne retten; de utvider den aldri. Derfor er «etter norsk intern rett isolert sett» alltid hele beløpet.</p>"
        + "<p><b>Regel 2 — unntaksmetoden med fullstendig unntak.</b> Norge gir helt avkall på inntekten, uten å spørre om kildestaten faktisk skattlegger den. Er kildestatens sats høyere enn den norske, sitter selskapet igjen med den høyere satsen; er den lavere, med den lavere. Skattlegger kildestaten ikke i det hele tatt, oppstår <b>dobbelt-ikke-beskatning</b>.</p>"
        + "<p><b>Regel 3 — vanlig kreditmetode.</b> Norge skattlegger, men gir fradrag i norsk skatt for skatt betalt i kildestaten, <i>begrenset oppad</i> til den norske skatten på nettopp den inntekten (maksimalt kreditfradrag). Er kildesatsen lavere, betaler du differansen til Norge og ender på norsk nivå. Er den høyere, går det overskytende tapt og du ender på kildestatens nivå.</p>"
        + "<p><b>Og regelen uten regel:</b> uten skatteavtale gjelder ingen av delene. Begge stater skattlegger etter sin egen interne rett, og resultatet er dobbeltbeskatning.</p>"
        + "<p><b>Fast driftssted</b> er terskelen som gir kildestaten beskatningsrett i det hele tatt. «Flotte lokaler og egne salgsteam» er skoleeksempelet på et fast forretningssted som virksomheten drives gjennom. Oppgaven har allerede gitt deg konklusjonen i brevene, så du skal ikke drøfte terskelen — du skal bruke den.</p>"
        + "<p class=\"tiny\">Merknad utenfor pensum for dette settet: Norge har også <i>ensidige</i> kreditregler i skatteloven, som i praksis ville avhjulpet en del av BVI-situasjonen. Oppgaven ber deg holde deg til avtalesituasjonen, og fasiten gjør det samme.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hvor mye av den globale omsetningen til «Super-Radar-Vision AS» vil være skattepliktig til Norge etter norsk intern rett isolert sett?</p>",
          options: ["100 000 000", "90 000 000", "30 000 000", "10 000 000"],
          answer: 0,
          solution: "<p><b>Nøkkelordene er «etter norsk intern rett isolert sett».</b> Da ser du bort fra alle skatteavtaler og alle brev fra utenlandske myndigheter.</p>"
            + "<p>Selskapet er stiftet i Norge og hjemmehørende her. Et norsk selskap har <b>globalskatteplikt</b>: hele verdensinntekten er skattepliktig hit. Svaret er <b>kr 100 000 000</b>.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>30 000 000</b> er den norske omsetningen alene. Det er kildestatsprinsippet, ikke globalskatteplikten — og det er nettopp svaret spørsmålet ber deg <i>ikke</i> gi ved å si «isolert sett». Dette er alternativet som fanger flest.</p>"
            + "<p>· <b>90 000 000</b> tar bort BVI-omsetningen. Ingen regel gjør det; BVI er tvert imot det ene markedet der Norge beholder hele sin rett også etter at avtalene er hensyntatt.</p>"
            + "<p>· <b>10 000 000</b> er BVI alene.</p>"
            + "<p><b>Regelen:</b> bostedsstaten har globalskatteplikt etter intern rett. Fast driftssted i utlandet utvider <i>kildestatens</i> rett, men innskrenker ikke Norges interne rett. Det er skatteavtalen som gjør det — og den kommer inn i neste spørsmål.</p>" },

        { label: "b", points: 1,
          body: "<p>Hvordan fordeles beskatningsretten til omsetningen fra USA mellom Norge og USA, hensyntatt skatteavtalen?</p>",
          options: ["Hele de 20 000 000 fordeles til Norge fordi selskapet har globalskatteplikt til Norge",
                    "Hele de 20 000 000 fordeles til USA fordi fullstendig unntaksmetode gjelder etter skatteavtalen",
                    "De 20 000 000 fordeles 50/50 mellom Norge og USA for å unngå dobbeltbeskatning",
                    "Hverken Norge eller USA får beskatningsrett grunnet unntaksmetoden"],
          answer: 1,
          solution: "<p>Salgsavdelingen med egne lokaler og eget salgsteam utgjør et fast driftssted, så USA har kildestatsrett. Skatteavtalen bygger på <b>unntaksmetoden med fullstendig unntak</b>, og Norge unntar da inntekten helt. Hele kr 20 000 000 beskattes bare i USA: 20 000 000 × 35 % = <b>kr 7 000 000</b>, og null til Norge.</p>"
            + "<p>Legg merke til at selskapet her betaler <i>mer</i> skatt enn det ville gjort i Norge (35 % mot 22 %). Unntaksmetoden gir ingen kompensasjon for det. Metoden fjerner dobbeltbeskatning, den utjevner ikke satser.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Hele til Norge fordi globalskatteplikt»</b> stopper ved forrige spørsmål. Globalskatteplikten er utgangspunktet, ikke konklusjonen — skatteavtalen begrenser den, og her begrenser den den til null.</p>"
            + "<p>· <b>«50/50»</b> finnes ikke i noen skatteavtale. Beskatningsretten deles aldri prosentvis mellom stater; den fordeles ved <i>metode</i> (unntak eller kredit). Alternativet er skrevet for den som gjetter på noe som «høres rettferdig ut».</p>"
            + "<p>· <b>«Hverken Norge eller USA»</b> forveksler unntaksmetoden med dobbelt-ikke-beskatning. Unntaket gjelder Norge, ikke kildestaten. Dobbelt-ikke-beskatning oppstår bare hvis kildestaten <i>selv</i> velger å ikke skattlegge — som er nøyaktig det deloppgave f handler om.</p>"
            + "<p><b>Regelen:</b> fullstendig unntak = kildestaten alene, uansett hvilken sats den bruker.</p>" },

        { label: "c", points: 1,
          body: "<p>Hvordan fordeles beskatningsretten til omsetningen fra Japan mellom Norge og Japan, hensyntatt skatteavtalen?</p>",
          options: ["Japan får eksklusiv beskatningsrett til de 40 000 000",
                    "Norge får beskatte de 40 000 000, men må gi kredit for skatt betalt i Japan",
                    "Japan får beskatte de 40 000 000, men må kredit for skatt betalt i Norge",
                    "Norge får beskatte de 40 000 000, forutsatt at det ble utlignet skatt i Japan som kan gis kredit for i Norge"],
          answer: 1,
          solution: "<p><b>Kreditmetoden lar begge stater skattlegge</b>, men hjemstaten gir fradrag i sin egen skatt for skatten betalt i kildestaten.</p>"
            + "<p><b>Regnestykket:</b> Japan skattlegger 40 000 000 × 15 % = kr 6 000 000. Norge beregner sin skatt på samme inntekt: 40 000 000 × 22 % = kr 8 800 000, og gir kredit for de kr 6 000 000. Restskatt til Norge: <b>kr 2 800 000</b>.</p>"
            + "<p><b>Samlet belastning:</b> 6 000 000 + 2 800 000 = kr 8 800 000, altså 22 % — norsk nivå. Det er kreditmetodens signatur: en lavere kildeskattesats gir ingen varig fordel for selskapet, den flytter bare skattekroner fra den norske til den japanske statskassen.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Japan får eksklusiv beskatningsrett»</b> beskriver unntaksmetoden, ikke kreditmetoden. Alternativet er der for å teste om du kan holde de to metodene fra hverandre.</p>"
            + "<p>· <b>«Japan må gi kredit for skatt betalt i Norge»</b> snur rollene. Det er alltid <b>hjemstaten</b> som gir kreditten — kildestaten skattlegger ubetinget innenfor sin rett.</p>"
            + "<p>· <b>Alternativ (d)</b> er den farlige. Den ser nesten ut som (b), men gjør Norges beskatningsrett <i>betinget</i> av at Japan faktisk lignet skatt. Det er feil: Norges rett følger av globalskatteplikten og består uansett. Hadde Japan ikke skattlagt, ville Norge simpelthen skattlagt hele beløpet med 22 % og ikke hatt noe å kreditere. Les hele setningen i hvert alternativ, ikke bare de fem første ordene.</p>"
            + "<p><b>Regelen:</b> vanlig kredit = begge skattlegger, hjemstaten krediterer opp til sin egen skatt på inntekten.</p>" },

        { label: "d", points: 1,
          body: "<p>Hvordan fordeles beskatningsretten til omsetningen fra Britisk Virgin Island?</p>",
          options: ["Beskatningsretten til hele de 10 000 000 tilfaller British Virgin Islands alene siden det ikke foreligger skatteavtale",
                    "Både Norge og British Virgin Islands har beskatningsrett etter sin interne rett",
                    "Beskatningsretten til hele de 10 000 000 tilfaller Norge alene siden selskapet har globalskatteplikt hit",
                    "Ingen av landene har beskatningsrett til de 10 000 000"],
          answer: 1,
          solution: "<p><b>Uten skatteavtale finnes det ingen mekanisme som fordeler beskatningsretten.</b> Begge stater skattlegger etter sin egen interne rett, og ingen av dem er forpliktet til å vike.</p>"
            + "<p>BVI: fast driftssted der gir kildestatsrett → 10 000 000 × 7,5 % = kr 750 000.<br>"
            + "Norge: globalskatteplikt → 10 000 000 × 22 % = kr 2 200 000.<br>"
            + "Samlet: kr 2 950 000, altså <b>29,5 %</b> — mer enn både den norske og den lokale satsen hver for seg.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«BVI alene siden det ikke foreligger skatteavtale»</b> har det bakvendt. Det er nettopp en skatteavtale som <i>kunne</i> gitt BVI eneretten (unntaksmetoden). Uten avtale er det ingenting som stanser Norge. Alternativet er den vanligste feilen på spørsmålet, fordi «ingen avtale» intuitivt høres ut som «ingen norsk rett».</p>"
            + "<p>· <b>«Norge alene»</b> glemmer at BVI har kildestatsrett etter sin egen interne rett, og at norsk lov ikke binder BVI.</p>"
            + "<p>· <b>«Ingen av landene»</b> er meningsløst når begge har hjemmel i egen lov.</p>"
            + "<p><b>Regelen:</b> ingen skatteavtale = ingen lettelse = dobbeltbeskatning. Det er hele grunnen til at det finnes over 3 000 skatteavtaler i verden.</p>" },

        { label: "e", points: 1,
          body: "<p>Unngår «Super-Radar-Vision AS» fullt ut internasjonal dobbeltbeskatning?</p>",
          options: ["Ja, selskapet unngår dobbeltbeskatning",
                    "Nei, selskapet blir utsatt for dobbeltbeskatning i British Virgin Islands",
                    "Nei, selskapet blir utsatt for dobbeltbeskatning i British Virgin Islands og i Japan siden skattesatsen der er lavere enn i Norge",
                    "Nei, selskapet blir utsatt for dobbeltbeskatning i USA pga unntaksmetoden"],
          answer: 1,
          solution: "<p>Gå gjennom alle fire markedene — det tar tjue sekunder når kartet er tegnet.</p>"
            + "<p>· <b>Norge (30 mill):</b> bare norsk skatt. Ingen dobbeltbeskatning.</p>"
            + "<p>· <b>USA (20 mill):</b> unntaksmetoden fjerner den norske skatten helt. Ingen dobbeltbeskatning — selv om den amerikanske satsen på 35 % er høyere enn den norske.</p>"
            + "<p>· <b>Japan (40 mill):</b> kreditmetoden fjerner dobbeltbeskatningen <i>fullt ut</i>, fordi den japanske satsen (15 %) er lavere enn den norske (22 %). Kreditten på kr 6 000 000 får plass innenfor den norske skatten på kr 8 800 000. Samlet belastning 22 %, nøyaktig som om inntekten var opptjent i Norge.</p>"
            + "<p>· <b>BVI (10 mill):</b> ingen avtale, ingen kredit. 7,5 % + 22 % = 29,5 %. <b>Her, og bare her, er selskapet dobbeltbeskattet.</b></p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Ja, selskapet unngår dobbeltbeskatning»</b> overser BVI.</p>"
            + "<p>· <b>Alternativ (c)</b> tar med Japan «siden skattesatsen der er lavere enn i Norge». Det er en ren tankefeil, og den er verdt å skjønne: lav kildeskattesats er nettopp tilfellet der kreditmetoden virker <i>perfekt</i>. Dobbeltbeskatning under kreditmetoden oppstår først når kildestatens sats er <b>høyere</b> enn hjemstatens, slik at deler av kildeskatten ikke får plass innenfor maksimalt kreditfradrag. Alternativet har fortegnet snudd.</p>"
            + "<p>· <b>Alternativ (d)</b> peker på USA «pga unntaksmetoden». Unntaksmetoden er den metoden som mest fullstendig fjerner dobbeltbeskatning — den fjerner den ene skatten helt.</p>"
            + "<p><b>Regelen:</b> unntaksmetoden avhjelper dobbeltbeskatning alltid. Kreditmetoden avhjelper den fullt ut når kildesatsen ≤ hjemstatens sats, og delvis når den er høyere. Ingen avtale avhjelper ingenting.</p>" },

        { label: "f", points: 1,
          body: "<p>Generelt: Hva blir konsekvensen under unntaksmetoden (med fullstendig unntak) dersom kildestaten ikke beskatter inntekten?</p>",
          options: ["Dobbelt-ikke beskatning, dvs. at inntekten ikke skattlegges i hverken hjemstaten eller kildestaten.",
                    "Unntaksmetoden gjelder ikke dersom kildestaten ikke beskatter inntekten.",
                    "Hjemstaten må da gi kredit i betalbar skatt.",
                    "Hjemstaten får full beskatningsrett til inntekten om kildestaten velger å ikke skattlegge."],
          answer: 0,
          solution: "<p><b>Fullstendig unntak er ubetinget.</b> Hjemstaten gir avkall på beskatningsretten uten å spørre om kildestaten faktisk bruker sin. Skattlegger ikke kildestaten, blir inntekten ikke skattlagt noe sted: <b>dobbelt-ikke-beskatning</b>.</p>"
            + "<p>Dette er den strukturelle svakheten ved metoden, og selve grunnen til at internasjonal skatterett har beveget seg bort fra rene unntaksavtaler. Motmidlene du bør kunne nevne: <i>subject-to-tax</i>-klausuler (unntaket gjelder bare inntekt som faktisk er skattlagt), overgang til kreditmetode i nyere avtaler, OECDs BEPS-arbeid, og den globale minimumsskatten på 15 % (pilar 2).</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Unntaksmetoden gjelder ikke dersom kildestaten ikke beskatter»</b> beskriver et unntak <i>med</i> subject-to-tax-forbehold. Oppgaven sier uttrykkelig «fullstendig unntak», og da finnes ikke forbeholdet.</p>"
            + "<p>· <b>«Hjemstaten må da gi kredit»</b> blander metodene. Under unntak beregnes det ingen norsk skatt på inntekten, så det finnes ikke noe å kreditere mot.</p>"
            + "<p>· <b>«Hjemstaten får full beskatningsrett»</b> beskriver igjen et forbehold avtalen ikke har. Hadde det vært regelen, ville metoden i praksis vært en kreditmetode.</p>"
            + "<p><b>Regelen:</b> unntaket er ubetinget med mindre avtalen sier noe annet. Betingede varianter finnes, men da står betingelsen i teksten — og oppgaven forteller deg alltid hvilken variant som gjelder.</p>" },

        { label: "g", points: 1,
          body: "<p>Generelt: Hva blir konsekvensen under den vanlige kreditmetoden dersom kildestaten beskatter inntekten med høyere sats enn hjemstaten?</p>",
          options: ["Hjemstaten gir kredit for all skatt betalt i kildestaten.",
                    "Kildestaten gir kredit for all skatt betalt i hjemstaten.",
                    "Kildestaten må da sette ned skattesatsen på inntekten for å få kredit.",
                    "Hjemstaten gir kredit for skatt betalt i kildestaten opp til det beløp som ville blitt betalt på kildestatsinntekten om den hadde vært skattepliktig kun i hjemstaten."],
          answer: 3,
          solution: "<p><b>Vanlig kredit har et tak</b> — maksimalt kreditfradrag. Hjemstaten krediterer aldri mer enn den skatten den selv ville krevd på nettopp den inntekten. Blir kildestatens skatt større, går det overskytende tapt.</p>"
            + "<p><b>Regn på USA-tallene som om avtalen hadde bygget på kredit i stedet for unntak:</b> amerikansk skatt 20 000 000 × 35 % = kr 7 000 000. Norsk skatt på samme inntekt: 20 000 000 × 22 % = kr 4 400 000. Kreditten begrenses til kr 4 400 000, den norske skatten blir null, og <b>kr 2 600 000</b> av den amerikanske skatten får ingen kredit. Samlet belastning 35 % — kildestatens nivå.</p>"
            + "<p><b>Symmetrien er verdt å memorere:</b> under vanlig kredit ender du alltid på <i>den høyeste</i> av de to satsene. Er kildesatsen lav (Japan, 15 %), ender du på hjemstatens 22 %. Er den høy (USA, 35 %), ender du på 35 %.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Hjemstaten gir kredit for all skatt betalt i kildestaten»</b> beskriver <b>full kredit</b>, ikke vanlig kredit. Forskjellen mellom de to er nøyaktig taket, og det er den forskjellen spørsmålet tester. Full kredit ville betydd at Norge betalte ut penger for å subsidiere den amerikanske statskassen — ingen stat gjør det.</p>"
            + "<p>· <b>«Kildestaten gir kredit for skatt betalt i hjemstaten»</b> snur rollene, samme feil som i deloppgave c.</p>"
            + "<p>· <b>«Kildestaten må sette ned satsen for å få kredit»</b> finnes ikke. Kildestaten er ikke part i hjemstatens kreditberegning.</p>"
            + "<p><b>Regelen:</b> kredit = min(kildestatens skatt, hjemstatens skatt på samme inntekt).</p>" },

        { label: "h", points: 1,
          body: "<p>Kombinasjonen av høyt skattetrykk i Norge med mye regn og tåke i Ytre Sandviken gjør til at Manni begynner å lure på å «flytte ut», spesielt siden han kjenner litt på om han bare burde selge hele selskapet til en av de store softwaregigantene internasjonalt - noe han helst kunne tenkt seg å gjøre skattefritt. Samtidig har Manni nettopp truffet sin store kjærlighet og hun driver med eiendomsmegling spesifikt begrenset til området Øyjordsveien-Biskopshavn og finner det fullstendig uaktuelt å flytte fra Ytre Sandviken. Manni lurer på følgende:</p>"
            + "<p>Hva blir konsekvensen ift. «exit skatt» iht. norsk intern skatterett dersom Manni nå skulle gi alle sine aksjer i «Super-Radar-Vision AS» til sin datter som er bosatt i Sveits, slik at datteren da ev. senere kan selge aksjene skattefritt etter intern sveitsisk skatterett?</p>",
          options: ["Den norske \"exit tax\" regelen trigges kun dersom Manni selv flytter ut, siden det er han som er norsk skattesubjekt.",
                    "Det vil først oppstå skatt dersom aksjene selges av datteren.",
                    "Den norske \"exit tax\" regelen trigges også dersom Manni gir sine aksjer til datter bosatt i utlandet, fordi \"exit tax\" reglen omfatter gaver til nærstående som bor i utland.",
                    "Den norske \"exit tax\" regelen gjelder ikke når mottakeren av aksjene er bosatt i et land Norge har skatteavtale med."],
          answer: 2,
          solution: "<p><b>Exit-skatten treffer den latente gevinsten på aksjene når de forlater norsk beskatningsområde</b> — enten fordi eieren flytter ut, eller fordi aksjene overføres til en mottaker bosatt i utlandet. Gave til nærstående i utlandet er uttrykkelig omfattet. Uten den regelen ville exit-skatten vært triviell å omgå: du gir bort aksjene i stedet for å flytte selv.</p>"
            + "<p><b>Størrelsen, så du ser hva som står på spill.</b> Latent gevinst = 4 000 000 000 − 50 000 = kr 3 999 950 000. Med eierskatt 37,84 % er den latente skatten i størrelsesorden <b>1,5 milliarder kroner</b>. Betalingen kan fordeles over tolv år etter dagens regler, men den forsvinner ikke.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Trigges kun dersom Manni selv flytter ut»</b> er nøyaktig den omgåelsen regelen er skrevet for å stanse. Legg merke til at oppgaven har bygget hele saken rundt at Manni <i>ikke kan</i> flytte (kjæresten vil ikke) — det er et hint om at spørsmålet handler om aksjene, ikke om personen.</p>"
            + "<p>· <b>«Skatt oppstår først dersom aksjene selges av datteren»</b> ville gitt Norge ingen beskatningsrett i det hele tatt, siden datteren er bosatt i Sveits og selger etter sveitsisk intern rett — som oppgaven sier er skattefritt. Det er hele poenget med gaven, og hele poenget med exit-skatten.</p>"
            + "<p>· <b>«Gjelder ikke når mottakeren bor i et avtaleland»</b> finnes ikke. En skatteavtale fordeler beskatningsretten til en <i>framtidig</i> gevinst; den opphever ikke uttaket fra norsk beskatningsområde i dag.</p>"
            + "<p><b>Regelen:</b> exit-skatt utløses når aksjene forlater norsk beskatningsområde, uansett om det er personen eller aksjene som flytter.</p>" },

        { label: "i", points: 1,
          body: "<p>Kan norsk «exit tax» for Manni unngås dersom han i stedet «flytter ut» selve selskapet «Super-Radar-Vision AS» til Sveits? Dvs. om det ikke er Manni personlig, men selskapet «Super-Radar-Vision AS», som «flytter»?</p>",
          options: ["Ja, da unngår man skatt.",
                    "Nei, da blir det dobbeltbeskatning.",
                    "Manni personlig unngår \"exit tax\" ansvar, men utflytting av \"Super-Radar-Vision AS\" vil trigge beskatning av selskapet som om det hadde blitt likvidert, dvs. realisasjonsbeskatning på selskaps- og aksjonærnivå.",
                    "Dersom selskapet flyttes ut, vil aksjene også anses utflyttet, slik at man uansett trigger \"exit tax\" for Manni personlig."],
          answer: 2,
          solution: "<p>Flytter Manni <i>selskapet</i> i stedet for seg selv, treffes han ikke personlig av exit-skatten — han er fortsatt bosatt i Norge, og aksjene er fortsatt hans. Men selskapet treffes av <b>utflyttingsbeskatning</b>: det anses som om det er likvidert på utflyttingstidspunktet, med realisasjonsbeskatning <b>både på selskapsnivå og på aksjonærnivå</b>.</p>"
            + "<p>Regningen blir derfor ikke mindre — den flyttes bare til et annet ledd, og aksjonærleddet er den samme Manni. Riktig svar er det tredje alternativet.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Ja, da unngår man skatt»</b> er drømmen oppgaven tester. Skattelovgivningen har lukket akkurat denne døren, og det er den mest forutsigbare feilen å gjøre.</p>"
            + "<p>· <b>«Nei, da blir det dobbeltbeskatning»</b> er upresist, ikke helt usant. Beskatningen på selskaps- og aksjonærnivå er ikke <i>internasjonal</i> dobbeltbeskatning (to stater om samme inntekt), men den ordinære toleddede beskatningen av selskapsoverskudd, her utløst av en fingert likvidasjon. Spørsmålet gjelder mekanismen, og alternativ (c) beskriver den; (b) gjør ikke det.</p>"
            + "<p>· <b>Alternativ (d)</b> sier at aksjene «anses utflyttet» slik at Manni personlig får exit-skatt. Det er feil mekanisme: exit-skatten på aksjer forutsetter at <i>eieren</i> eller <i>aksjene</i> forlater norsk område, og her gjør ingen av delene det. Det er selskapets utflytting som utløser likvidasjonsbeskatningen.</p>"
            + "<p><b>Regelen:</b> verken personen eller selskapet slipper ut av norsk beskatningsområde uten et skatteoppgjør på den latente gevinsten. Regelsettene er ulike, resultatet er beslektet — og det er poenget med hele deloppgave h og i sett under ett.</p>"
            + "<p><b>Fasit og lovtekst spriker.</b> Svaret over er kursets fasit, og det er det som har gitt poeng. Lovteksten i skatteloven § 10-71 er i dag smalere: den skattlegger gevinst på <i>selskapets</i> eiendeler som om de var realisert, og bare når selskapet flytter ut av EØS, eller til et lavskatteland i EØS der det ikke er reelt etablert. Aksjonærene nevnes ikke. Se manualen 6.6.</p>" },
      ] },

    /* --------------------------------------------------------------- 11 */
    { n: 11, title: "Forventet nytte og forsikring", points: 4, topic: "Forventet nytte",
      chapters: [17],
      body: "<p>Anta i hele denne oppgaven at du har nyttefunksjon U(W)=√W der W er din totale formue.</p>"
        + "<p class=\"tiny\">√W er konkav, altså er du risikoavers. Hele oppgaven avgjøres av én regel: sammenlign U(sikker formue) med E[U(usikker formue)] — aldri kronene direkte.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Noen tilbyr deg en forsikring på mobiltelefonen din til riktig pris, altså at du må betale det samme i forsikringspremie som den forventede utbetalingen for forsikringsselskapet. Bør du takke ja til å kjøpe forsikringen?</p>",
          options: ["Ja, fordi en risikoavers person alltid bør takke ja til forsikring til riktig pris.",
                    "Ja, fordi du har nyttefunksjon √W men du burde ikke takket ja hvis du hadde hatt logaritmisk nyttefunksjon ln(W).",
                    "Nei, man bør aldri forsikre eiendeler som har lav verdi.",
                    "Nei, man bør kun forsikre eiendeler som har lav verdi hvis prisen på forsikring er mindre enn forventet utbetaling."],
          answer: 0,
          solution: "<p><b>«Riktig pris» betyr aktuarisk rettferdig premie:</b> premien er akkurat lik selskapets forventede utbetaling. Da er forventet formue den samme med og uten forsikring — men risikoen er borte med forsikring.</p>"
            + "<p><b>Steg 1.</b> √W er konkav (den annenderiverte er negativ), altså er du risikoavers.</p>"
            + "<p><b>Steg 2.</b> For en risikoavers person er en <i>sikker</i> formue alltid strengt bedre enn et usikkert utfall med <i>samme forventning</i>. Det er selve definisjonen på risikoaversjon (Jensens ulikhet: E[U(W)] &lt; U(E[W]) for konkav U).</p>"
            + "<p><b>Steg 3.</b> Full forsikring til rettferdig pris gir nøyaktig samme forventede formue, uten risikoen. Altså: <b>ja</b>.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>Alternativ 2</b> påstår at svaret hadde vært et annet med ln(W). Det er feil, og det er den viktigste distinksjonen i hele deloppgaven: <b>ln W er også konkav</b>, altså også risikoavers, og gir samme konklusjon. Det er nyttefunksjonens <i>form</i> som avgjør, ikke hvilken konkav funksjon det er. Graden av risikoaversjon bestemmer hvor mye <i>mer enn</i> rettferdig pris du er villig til å betale — ikke om du sier ja til rettferdig pris.</p>"
            + "<p>· <b>Alternativ 3 og 4</b> knytter svaret til gjenstandens verdi. Verdien er irrelevant for prinsippet. Det som betyr noe er om tapet er stort nok i forhold til formuen din til at krumningen i nyttefunksjonen merkes — og selv et lite tap gir en (liten) gevinst av forsikring til rettferdig pris.</p>"
            + "<p><b>Regelen:</b> til aktuarisk rettferdig pris kjøper enhver risikoavers person forsikring. Ligger premien <i>over</i> rettferdig pris, må du regne — se deloppgave c.</p>" },

        { label: "b", points: 1,
          body: "<p>Anta nå at du kan velge å forsikre deler av mobiltelefonen din til riktig pris. Hvor stor andel av verdien til mobiltelefonen bør du forsikre?</p>",
          options: ["Mindre enn 50% av verdien", "Mellom 50% og 99% av verdien", "100% av verdien", "Umulig å si uten å kjenne den eksakte verdien på telefonen"],
          answer: 2,
          solution: "<p><b>Full dekning er optimalt til aktuarisk rettferdig pris.</b> Dette er Mossins resultat, og det er standardspørsmålet på temaet.</p>"
            + "<p><b>Intuisjonen:</b> hver ekstra krone dekning koster deg nøyaktig det den forventes å gi tilbake, så forventet formue er upåvirket av dekningsgraden. Men risikoen faller monotont med dekningsgraden og blir <i>null</i> først ved 100 %. En risikoavers person tar all risikoreduksjon som er gratis — og her er den gratis.</p>"
            + "<p><b>Hvorfor de andre er gale — og hvorfor de likevel høres fornuftige ut:</b></p>"
            + "<p>· <b>«Mindre enn 50 %» og «mellom 50 og 99 %»</b> ville vært riktig hvis premien inneholdt et påslag (en <i>lasting</i>) over rettferdig pris. Da er den siste kronen dekning dyrere enn den er verdt, og det blir optimalt med en egenandel. Dette er den viktigste nyanseringen her, og den forklarer hvorfor virkelige forsikringer har egenandel: virkelige premier ligger alltid over rettferdig pris, fordi selskapet har kostnader og skal tjene penger.</p>"
            + "<p>· <b>«Umulig å si uten å kjenne verdien»</b> er feil: resultatet er uavhengig av beløpet, og gjelder for enhver konkav nyttefunksjon.</p>"
            + "<p><b>Regelen:</b> rettferdig pris → full dekning. Påslag → delvis dekning. Merk at H2025 oppgave 13 spør motsatt vei: der er premien over rettferdig pris, og halv dekning til samme premie er <i>dårligere</i> enn full dekning.</p>" },

        { label: "c", points: 1,
          body: "<p>Anta nå at du vurderer en forsikring for hele huset ditt, som er din eneste eiendel av større verdi. Huset har en totalverdi på 1 million kroner og har 1 % sannsynlighet for å brenne ned og mister da all sin verdi. Et forsikringsselskap tilbyr deg en forsikring for huset ditt, med en premie på 25 000 kroner. Bør du takke ja til denne forsikringen?</p>",
          options: ["Ja, fordi forventet nytte ved forsikring er høyere enn uten forsikring.",
                    "Ja, fordi en risikoavers person alltid vil forsikre sine dyreste eiendeler.",
                    "Nei, fordi forventet nytte ved forsikring er lavere enn uten forsikring.",
                    "Nei, fordi man aldri bør kjøpe forsikring hvis premien er høyere enn den forventede skaden."],
          answer: 2,
          solution: "<p><b>Steg 1 — med forsikring er formuen sikker.</b> 1 000 000 − 25 000 = 975 000. Nytte: √975 000 = <b>987,42</b>.</p>"
            + "<p><b>Steg 2 — uten forsikring.</b> Formuen er 0 med 1 % sannsynlighet og 1 000 000 med 99 %. Forventet nytte = 0,01 × √0 + 0,99 × √1 000 000 = 0,01 × 0 + 0,99 × 1 000 = <b>990,00</b>.</p>"
            + "<p><b>Steg 3 — sammenlign.</b> 987,42 &lt; 990,00. <b>Nei, du bør ikke kjøpe.</b></p>"
            + "<p><b>Hvorfor svaret snur fra deloppgave a.</b> Premien er ikke rettferdig. Forventet skade er 1 % × 1 000 000 = kr 10 000, mens premien er kr 25 000. Påslaget på kr 15 000 er større enn risikoaversjonen din er verdt (se deloppgave d: du er villig til å betale opptil kr 19 900).</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>Alternativ 1</b> har riktig <i>type</i> begrunnelse — sammenligning av forventet nytte — men snudd konklusjon. Regn ferdig før du velger.</p>"
            + "<p>· <b>Alternativ 2</b> («en risikoavers person vil alltid forsikre sine dyreste eiendeler») er den vanligste feilen på hele temaet. Risikoaversjon betyr at du er villig til å betale <i>noe</i> over forventet skade, ikke hva som helst.</p>"
            + "<p>· <b>Alternativ 4</b> er den lumske: den gir riktig konklusjon med feil regel. «Aldri kjøp hvis premien er høyere enn forventet skade» er direkte galt — en risikoavers person betaler gjerne mer enn forventet skade. Kontroll: ved en premie på kr 15 000 er √985 000 = 992,47 &gt; 990, altså <b>kjøp</b>, med premien fortsatt godt over forventet skade på kr 10 000. Alternativet er lagt inn nettopp for å fange den som sammenligner forventet <i>formue</i> i stedet for forventet <i>nytte</i>.</p>"
            + "<p><b>Regelen:</b> sammenlign U(sikker formue) med E[U(usikker formue)]. Kronene lyver alltid i denne retningen: forventet formue er lavere med forsikring så snart premien overstiger forventet skade, men nytten kan likevel være høyere.</p>" },

        { label: "d", points: 1,
          body: "<p>Hva er det maksimale beløpet du er villig til å betale for forsikringen?</p>",
          options: ["19 900 kroner", "23 100 kroner", "27 100 kroner", "29 900 kroner"],
          answer: 0,
          solution: "<p><b>Maksimal premie X er den som gjør deg akkurat indifferent:</b> nytten med forsikring skal være lik forventet nytte uten.</p>"
            + "<p><b>Steg 1 — sett opp ligningen.</b> √(1 000 000 − X) = 990, der 990 er forventet nytte uten forsikring fra deloppgave c.</p>"
            + "<p><b>Steg 2 — kvadrer begge sider.</b> 1 000 000 − X = 990² = 980 100.</p>"
            + "<p><b>Steg 3 — løs.</b> X = 1 000 000 − 980 100 = <b>kr 19 900</b>.</p>"
            + "<p><b>Hva tallet 980 100 er.</b> Det er <b>sikkerhetsekvivalenten</b> til gamblingen — den sikre formuen som er akkurat like god for deg som lotteriet. Forventet formue uten forsikring er 0,99 × 1 000 000 = 990 000, så <b>risikopremien</b> din er 990 000 − 980 100 = kr 9 900. Det er beløpet du er villig til å betale <i>utover</i> den rettferdige premien på kr 10 000 for å bli kvitt risikoen — og 10 000 + 9 900 = 19 900. ✓ Det er kontrollen.</p>"
            + "<p><b>Elimineringen — bruk deloppgave c.</b> Du avviste nettopp en premie på kr 25 000. Maksimalpremien må derfor være <i>mindre</i> enn 25 000, og både <b>kr 27 100</b> og <b>kr 29 900</b> kan strykes uten en eneste utregning. Motsatt vei: du er risikoavers, så maksimalpremien må være <i>større</i> enn den rettferdige premien på kr 10 000. Riktig svar ligger altså i intervallet 10 000–25 000, der bare 19 900 og 23 100 står igjen. Med minuspoeng er det forskjellen mellom et gjett med 25 % og et gjett med 50 % treffsjanse.</p>"
            + "<p><b>Hvorfor 23 100 er galt:</b> √(1 000 000 − 23 100) = √976 900 = 988,38, som fortsatt er lavere enn 990. Distraktorene er lagt symmetrisk rundt riktig svar (19 900 / 23 100 / 27 100 / 29 900), så det siste steget må du faktisk regne.</p>"
            + "<p><b>Regelen:</b> maksimal premie løses av U(W − X) = E[U uten forsikring]. Med U = √W blir X = W − (E[√W])². Samme ligning løst for p i stedet for X gir «laveste sannsynlighet som gjør forsikringen lønnsom», som er den andre varianten av dette spørsmålet.</p>" },
      ] },

    /* --------------------------------------------------------------- 12 */
    { n: 12, title: "Indeksfond, valutasikring og korrelasjon", points: 4, topic: "Porteføljevalg",
      chapters: [14],
      body: "<p>Oppgaven har fire uavhengige delspørsmål om fond, valuta og portefølje.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hvilken av følgende påstander om indeksfond er feil?</p>",
          options: ["Indeksfond gir generelt bedre diversifisering (lavere risiko) enn enkeltaksjer",
                    "Indeksfond gir generelt høyere avkastning enn et vektet gjennomsnitt av enkeltaksjene på børsen.",
                    "Indeksfond er generelt billigere enn aktivt forvaltede fond.",
                    "Indeksfond gir sannsynligvis bedre avkastning enn enkeltaksjer når mange andre har innsideinformasjon som du ikke har."],
          answer: 1,
          solution: "<p><b>Les spørsmålet to ganger:</b> det ber om påstanden som er <b>feil</b>. Negativt formulerte spørsmål er den billigste måten å kaste bort et poeng på.</p>"
            + "<p><b>Påstand 2 er feil.</b> Et indeksfond eier hele markedet i markedsverdivekter og gir derfor per definisjon nøyaktig avkastningen til det verdivektede gjennomsnittet av aksjene i indeksen — minus forvaltningshonoraret. Det kan ikke gi <i>mer</i>; over tid gir det litt mindre. Det er ren aritmetikk, ikke en empirisk påstand.</p>"
            + "<p><b>De tre andre er riktige:</b></p>"
            + "<p>· <b>1 — diversifisering.</b> Et indeksfond eier hundrevis av selskaper, så den selskapsspesifikke risikoen er nesten borte. Lavere standardavvik enn en enkeltaksje, med samme forventede markedsavkastning.</p>"
            + "<p>· <b>3 — kostnader.</b> Indeksfond koster typisk 0,1–0,3 % i året mot 1–2 % for aktivt forvaltede fond, fordi det ikke kreves analyse. Kostnadsforskjellen er den best dokumenterte grunnen til at indeksfond slår aktive fond over tid — og Forbrukerrådets gjennomganger av norske fond viser det samme.</p>"
            + "<p>· <b>4 — innsideinformasjon.</b> Handler du enkeltaksjer mot noen som vet mer enn deg, taper du systematisk. Kjøper du hele markedet, slipper du å velge, og du kan ikke plukkes ut. Dette er hovedargumentet for indeksfond i et marked som ikke er perfekt effektivt.</p>"
            + "<p><b>Regelen:</b> et indeksfond gir markedsavkastningen med markedsrisikoen, billig. Enhver påstand om at det gir <i>mer</i> enn markedet, er feil per konstruksjon.</p>" },

        { label: "b", points: 1,
          body: "<p>Anta at du vurderer å kjøpe et globalt indeksfond, for eksempel gjennom DNB eller Nordnet. Hvordan er typisk eksponeringen til disse globale indeksfondene på ulike regioner?</p>",
          options: ["Cirka 70 prosent i amerikanske aksjer, 20 prosent i Kina og resten i andre land",
                    "Cirka 40 prosent i amerikanske aksjer, 30 prosent i Kina og resten i andre land.",
                    "Cirka 40 prosent i amerikanske aksjer, lite eller ingen eksponering mot Kina, og resten i andre land.",
                    "Cirka 70 prosent i amerikanske aksjer, lite eller ingen eksponering mot Kina, og resten i andre land."],
          answer: 3,
          solution: "<p>Riktig er <b>cirka 70 prosent i amerikanske aksjer, lite eller ingen eksponering mot Kina</b>.</p>"
            + "<p><b>Hvorfor.</b> Et «globalt» indeksfond følger normalt en indeks over <i>utviklede</i> markeder — MSCI World, FTSE Developed eller tilsvarende — vektet etter markedsverdi. USA utgjør omtrent 70 % av børsverdien i utviklede markeder, og andelen har vokst gjennom hele 2010- og 2020-tallet. Kina er et <i>framvoksende</i> marked og inngår derfor ikke. Vil du ha Kina, må du kjøpe et fond som eksplisitt dekker emerging markets, eller en «all country»-indeks (MSCI ACWI) — der Kina uansett bare utgjør noen få prosent.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> De to alternativene med 20 % og 30 % i Kina overdriver Kina grovt; ingen bredt solgt norsk globalfond har den eksponeringen. De to med «cirka 40 prosent i amerikanske aksjer» undervurderer USA — 40 % var omtrent nivået for tjue år siden, og alternativet fanger den som husker et gammelt tall.</p>"
            + "<p><b>To ting å ta med videre.</b> For det første: et «globalt» indeksfond er i praksis en stor amerikansk posisjon, altså en konsentrasjonsrisiko de fleste ikke er klar over. For det andre: derfor er valutaeksponeringen i et slikt fond i hovedsak dollar — som er nettopp det deloppgave c handler om.</p>" },

        { label: "c", points: 1,
          body: "<p>Du vurderer å kjøpe et globalt indeksfond med valutasikring. Dette betyr at valutasvingningene til fondet fjernes, slik at du kun får avkastningen på aksjene. Anta at du er risikoavers og at arbeidsinntekten din er høyere når kronen er sterk. Din fremtidige inntekt er summen av arbeidsinntekt og inntekt fra dette fondet. Hvilken påstand er riktig?</p>",
          options: ["Du bør valutasikre fondet.",
                    "Du bør ikke valutasikre fondet.",
                    "Du bør vurdere valutasikring kun dersom du er svært risikoavers.",
                    "Siden valutasikring gjør at du får utbetalt samme beløp uansett, så vil du være indifferent til valutasikring."],
          answer: 1,
          solution: "<p>Poenget er <b>samvariasjonen</b> mellom fondet og arbeidsinntekten din, ikke fondets risiko isolert.</p>"
            + "<p><b>Steg 1.</b> Arbeidsinntekten din er <i>høy</i> når kronen er sterk, og lav når kronen er svak.</p>"
            + "<p><b>Steg 2.</b> Et globalt indeksfond er i utenlandsk valuta. Uten valutasikring er fondet verdt <i>mer i kroner</i> når kronen er svak, og mindre når kronen er sterk.</p>"
            + "<p><b>Steg 3.</b> Altså: det usikrede fondet gir deg mest nettopp når arbeidsinntekten er lavest. Det er en <b>naturlig sikring</b> av samlet inntekt, og den jevner ut totalen.</p>"
            + "<p><b>Steg 4.</b> Valutasikrer du, fjerner du denne motsyklikken. Da svinger bare arbeidsinntekten, og samlet inntekt blir <i>mer</i> usikker, ikke mindre. En risikoavers person vil ikke det. Konklusjon: <b>du bør ikke valutasikre</b>.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Du bør valutasikre»</b> ser på fondet isolert. Valutasikring senker fondets egen varians, men øker variansen til det du faktisk bryr deg om — summen av arbeidsinntekt og formuesinntekt.</p>"
            + "<p>· <b>«Kun dersom du er svært risikoavers»</b> har fortegnet feil: jo mer risikoavers du er, jo mer verdt er den naturlige sikringen, og jo <i>sterkere</i> er argumentet mot valutasikring.</p>"
            + "<p>· <b>«Indifferent siden valutasikring gir samme beløp uansett»</b> misforstår hva valutasikring er. Den fjerner valutasvingningen, ikke aksjeavkastningen. Utbetalingen er langt fra sikker.</p>"
            + "<p><b>Regelen:</b> vurder et aktivum ut fra hvordan det samvarierer med resten av formuen din — humankapitalen inkludert — ikke ut fra dets eget standardavvik. Det er samme prinsipp som ligger under Mertons formel og under rådet om ikke å eie aksjer i egen arbeidsgiver.</p>" },

        { label: "d", points: 1,
          body: "<p>Det finnes to aksjer A og B. Du kan kun investere i disse to aksjene. Aksje A har forventet avkastning på 10% og standardavvik på 20%, mens aksje B har forventet avkastning på 2% og standardavvik på 30%. Aksjene er positivt korrelerte med korrelasjonskoeffisient 1.</p>"
            + "<p>Hvor stor andel av pengene dine bør du investere i aksje A dersom det eneste du bryr deg om er å lage en portefølje av aksje A og B som har så lavt standardavvik som mulig?</p>",
          options: ["100%", "99%", "69%", "51%"],
          answer: 0,
          solution: "<p><b>Steg 1 — hva ρ = 1 gjør med variansformelen.</b> Generelt er σ<sub>p</sub>² = w²σ<sub>A</sub>² + (1 − w)²σ<sub>B</sub>² + 2w(1 − w)ρσ<sub>A</sub>σ<sub>B</sub>. Med ρ = 1 blir høyresiden et fullstendig kvadrat, og standardavviket blir <b>lineært</b>:</p>"
            + "<p style=\"text-align:center\">σ<sub>p</sub> = w·σ<sub>A</sub> + (1 − w)·σ<sub>B</sub></p>"
            + "<p><b>Steg 2 — et lineært uttrykk har ingen indre minimumsverdi.</b> Minimum ligger i et hjørne, og hjørnet med lavest σ er <b>100 % i aksje A</b> (20 % mot 30 %).</p>"
            + "<p><b>Kontroll — regn på alternativene:</b> w = 0,99 gir 0,99 × 20 % + 0,01 × 30 % = 20,1 %. w = 0,69 gir 23,1 %. w = 0,51 gir 24,9 %. Alle er høyere enn 20 %, som er hva w = 1 gir. ✓</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>69 %</b> er den klassiske fellen og verdt å kjenne igjen: det er minimum-varians-vekten dersom du setter ρ = 0, altså σ<sub>B</sub>²/(σ<sub>A</sub>² + σ<sub>B</sub>²) = 0,09/0,13 = 69,2 %. Alternativet er laget for den som bruker minimumsvariansformelen mekanisk uten å se hva ρ = 1 gjør med den.</p>"
            + "<p>· <b>99 % og 51 %</b> er indre løsninger uten noe grunnlag.</p>"
            + "<p><b>Elimineringsknepet:</b> ved ρ = 1 må svaret være et <b>hjørne</b> — 0 % eller 100 % — aldri en indre andel. Da står bare ett alternativ igjen, og du trenger ikke regne i det hele tatt.</p>"
            + "<p><b>To merknader.</b> (1) Hadde du fått lov til å shortselge, ville ρ = 1 gitt en <i>risikofri</i> portefølje ved w = σ<sub>B</sub>/(σ<sub>B</sub> − σ<sub>A</sub>) = 30/(30 − 20) = 300 % i A og −200 % i B. Alle alternativene ligger mellom 0 og 100 %, så oppgaven forutsetter at shorting ikke er mulig. (2) Her er A dessuten best på forventet avkastning (10 % mot 2 %), så konklusjonen er ekstra opplagt: B har lavere avkastning, høyere risiko og ingen diversifiseringsgevinst å tilby.</p>"
            + "<p><b>Regelen:</b> ved perfekt positiv korrelasjon finnes ingen diversifiseringsgevinst. Standardavviket er et veid gjennomsnitt, og du minimerer det ved å legge alt i aksjen med lavest standardavvik.</p>" },
      ] },

    /* --------------------------------------------------------------- 13 */
    { n: 13, title: "Pensjonsordninger og IPS", points: 2, topic: "Pensjon",
      chapters: [15],
      body: "<p>Oppgaven har to uavhengige delspørsmål om pensjonssparing.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hva er hovedforskjellen mellom en innskuddspensjonsordning og en ytelsespensjonsordning?</p>",
          options: ["Innskuddspensjon gir fast utbetaling i pensjonstiden, mens ytelsespensjon er avhengig av avkastning.",
                    "Innskuddspensjon betyr at arbeidsgiver sparer et fast beløp på dine vegne, mens ytelsespensjon garanterer en bestemt utbetaling i pensjonstiden.",
                    "Ytelsespensjon er obligatorisk, mens innskuddspensjon er frivillig for ansatte.",
                    "Ytelsespensjon er kun tilgjengelig for private ansatte, mens innskuddspensjon gjelder offentlig ansatte."],
          answer: 1,
          solution: "<p><b>Innskuddspensjon:</b> arbeidsgiver setter av en avtalt prosent av lønnen din hvert år (minimum 2 % av lønn opp til 12 G etter OTP-loven). Pengene investeres, og pensjonen din blir det beholdningen er verdt når du tar den ut. <b>Avkastnings- og levealdersrisikoen er din.</b></p>"
            + "<p><b>Ytelsespensjon:</b> arbeidsgiver garanterer en bestemt utbetaling, typisk en andel av sluttlønnen (for eksempel 66 % inkludert folketrygd). Arbeidsgiver må skyte inn det som trengs for å innfri løftet. <b>Avkastnings- og levealdersrisikoen er arbeidsgiverens.</b></p>"
            + "<p>Påstand 2 sier nøyaktig dette, og er riktig.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>Påstand 1</b> har byttet om de to. Det er ytelsespensjonen som gir fast utbetaling og innskuddspensjonen som avhenger av avkastningen. Dette er standarddistraktoren på temaet, og den er lett å velge om du leser fort.</p>"
            + "<p>· <b>Påstand 3</b> er feil: obligatorisk tjenestepensjon (OTP) er obligatorisk for arbeids<i>giver</i>, uansett om ordningen er innskudds- eller ytelsesbasert. Ingen av dem er frivillig for den ansatte.</p>"
            + "<p>· <b>Påstand 4</b> er feil: begge typer finnes i begge sektorer. Offentlig sektor hadde tradisjonelt ytelsespensjon, og privat sektor har gått nesten helt over til innskudd — men det er en historisk tendens, ikke en regel, og påstanden snur dessuten retningen.</p>"
            + "<p><b>Huskeregelen:</b> navnet forteller hva som er <i>avtalt</i>. Ved <b>innskudd</b> er innskuddet avtalt; ved <b>ytelse</b> er ytelsen avtalt. Den av partene som ikke har fått noe avtalt, bærer risikoen.</p>" },

        { label: "b", points: 1,
          body: "<p>Hvilken påstand om Individuell pensjonssparing (IPS) er riktig?</p>",
          options: ["IPS fungerer på samme måte som BSU, men gir i tillegg fritak for formuesskatt.",
                    "IPS gir mulighet til å utsette skatt, og kan dermed sees som et rentefritt lån fra staten. I tillegg gir IPS fritak for formuesskatt.",
                    "IPS gir fritak for formuesskatt, og du kan ta ut pengene når du er 35 år for å kjøpe bolig.",
                    "Du slipper formuesskatt på hele formuen din hvis du bruker IPS."],
          answer: 1,
          solution: "<p><b>IPS (individuell pensjonssparing) har tre egenskaper du må kunne:</b></p>"
            + "<p><b>1. Utsatt skatt.</b> Du får fradrag i alminnelig inntekt for innskuddet (22 % av beløpet, opp til et årlig maksbeløp), og betaler i stedet skatt på alminnelig inntekt når pengene tas ut. Dette er en <i>utsettelse</i>, ikke et fritak — men fordi du beholder skattekronene og lar dem avkaste i mellomtiden, virker det som et <b>rentefritt lån fra staten</b>. Verdien av ordningen er nettopp avkastningen på de utsatte skattekronene i bindingstiden.</p>"
            + "<p><b>2. Fritak for formuesskatt</b> på beløpet som står på IPS-kontoen.</p>"
            + "<p><b>3. Binding.</b> Pengene er låst til pensjonsalder (fra 62 år) og kan ikke brukes til noe annet.</p>"
            + "<p>Påstand 2 sier nøyaktig punkt 1 og 2, og er riktig.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>Påstand 1</b> sammenligner med BSU. BSU virker helt annerledes: der får du et fradrag <i>i skatten</i> (10 % av innskuddet), ikke i inntekten, og pengene er øremerket bolig. De to ordningene har ingen felles mekanikk.</p>"
            + "<p>· <b>Påstand 3</b> limer BSU-egenskapen på IPS: uttak som 35-åring for å kjøpe bolig. IPS er bundet til pensjonsalder.</p>"
            + "<p>· <b>Påstand 4</b> overdriver fritaket. Det gjelder bare IPS-kontoen, ikke hele formuen din. Alternativet fanger den som husker at «IPS har noe med formuesskatt å gjøre» uten å huske hva.</p>"
            + "<p><b>Regelen:</b> IPS = utsatt inntektsskatt + fritak for formuesskatt på selve kontoen + binding til pensjonsalder. Ordningen er mest verdt for den som har lang tid igjen til uttak og høy avkastning i mellomtiden.</p>" },
      ] },

    /* --------------------------------------------------------------- 14 */
    { n: 14, title: "Avdragsfrihet på lån", points: 1, topic: "Lån",
      chapters: [16],
      body: "<p>Hvilken påstand om avdragsfrihet på lån er riktig?</p>",
      options: ["Det kan være lurt å be om avdragsfrihet hvis du har midlertidige problemer med likviditeten.",
                "Det kan være lurt å be om avdragsfrihet fordi det fungerer som et rentefritt lån fra banken.",
                "Det kan være lurt å be om avdragsfrihet fordi dette gjør at staten betaler avdragene på lånet i en periode.",
                "Kostnaden ved lånet blir den samme uansett om man ber om avdragsfrihet eller ikke, så kun ikke-rasjonelle personer bør be om avdragsfrihet."],
      answer: 0,
      solution: "<p><b>Hva avdragsfrihet er.</b> I en periode betaler du bare renter, ikke avdrag. Lånet blir ikke mindre, men den månedlige utbetalingen faller.</p>"
        + "<p><b>Riktig er påstand 1:</b> avdragsfrihet er en likviditetsordning. Har du et <i>midlertidig</i> likviditetsproblem — permittering, sykdom, foreldrepermisjon, en uventet regning — er avdragsfrihet en billig måte å frigjøre kontantstrøm på, langt billigere enn forbrukslån eller kredittkort. Utlånsforskriften åpner for at banken kan innvilge det, men for lån over 60 % av boligverdien skal det normalt betales avdrag.</p>"
        + "<p><b>Regnestykket som viser hvor mye det frigjør.</b> Et annuitetslån på kr 3 000 000 til 5 % nominell rente over 25 år koster kr 17 538 i måneden. Av den første terminen er kr 12 500 renter og kr 5 038 avdrag. Avdragsfrihet frigjør altså om lag kr 5 000 i måneden — men hele beløpet er avdrag, altså <i>sparing</i>, ikke kostnad. Det du «sparer» er penger du senere må betale, med renter i mellomtiden.</p>"
        + "<p><b>Hvorfor de andre er gale:</b></p>"
        + "<p>· <b>Påstand 2 («rentefritt lån fra banken»)</b> er direkte feil. Du betaler renter hele veien, og du betaler renter på et <i>større</i> beløp i <i>lengre</i> tid. Samlet rentekostnad går opp, ikke ned. (Uttrykket «rentefritt lån fra staten» hører hjemme i deloppgave 13b om IPS, der skatten faktisk utsettes uten rente — pass på å ikke blande de to.)</p>"
        + "<p>· <b>Påstand 3 («staten betaler avdragene»)</b> er ren fantasi. Staten har ingen rolle; dette er en avtale mellom deg og banken. Sammenlign med rentefradraget, der staten faktisk dekker 22 % av rentekostnaden — men det gjelder uansett avdragsfrihet eller ikke.</p>"
        + "<p>· <b>Påstand 4</b> er feil på begge sine to punkter: kostnaden blir <i>høyere</i> (mer rente over lengre tid), og det er likevel ikke irrasjonelt å be om det, fordi verdien av likviditet nå kan overstige den ekstra rentekostnaden. Alternativet er skrevet for den som har lært at «avdrag er ikke en kostnad» og trekker konklusjonen én tanke for langt.</p>"
        + "<p><b>Regelen:</b> avdragsfrihet flytter kontantstrøm fra framtiden til nå og øker den samlede rentekostnaden. Den er riktig når likviditetsproblemet er midlertidig, og farlig når det ikke er det — da utsetter du bare et problem som vokser.</p>" },
  ],
},
{
  id: "h2022",
  label: "Høsten 2022",
  date: "2022-12-15",
  minutes: 240,
  points: 35,
  format: "7 oppgaver · 31 flervalgsledd · hjemmeeksamen · 35 poeng",
  note: "Dette var en <b>hjemmeeksamen</b> i Wiseflow, ikke en skoleeksamen: fire timer med alle hjelpemidler tilgjengelig. Det gjør oppgavene tyngre enn skoleeksamenene i 2024 og 2025 — flere regnesteg per spørsmål, lengre faktabeskrivelser og en internasjonal skatteoppgave på åtte delspørsmål. Settet er samtidig det <b>første rene flervalgssettet</b> i kurset, og temaprofilen er den samme som i 2026: skjerming og oppjustering utgjør omtrent en tredel av poengene. Merk at satsene er 2020–2022-satser: skjermingsrente 5 %, eierskatt 25 % og oppjusteringsfaktor 1,6, som gir en effektiv eierskatt på 40 % — ikke dagens 1,72 og 37,84 %. (Aksjerabatten i formuesskatten var 45 % i 2022, men formuesskatt er ikke prøvd i dette settet.) Kildefila har både en bokmåls- og en nynorskversjon; nynorskversjonen har to regnefeil, og bokmålsversjonen er brukt her.",
  facts: [
    "Hjemmeeksamen 15. desember 2022, 09:00–13:00, levert i Wiseflow.",
    "Alle hjelpemidler tillatt — det er en hjemmeeksamen, ikke en skoleeksamen.",
    "35 poeng fordelt på sju oppgaver: aksjonærmodellen 16 p, internasjonal skatt 6 p, personlig finans 13 p.",
    "Fire til sju svaralternativer per spørsmål — flere enn de fire du møter i 2026.",
    "Dette settet hadde ikke minuspoeng. Slå på minuspoeng for å trene 2026-forhold.",
    "Satsene er 2022-satser: skjermingsrente 5 %, eierskatt 25 %, oppjusteringsfaktor 1,6. I 2026 er faktoren 1,72 og eierskatten 37,84 %.",
  ],
  practiceNote: "Hjemmeeksamen med flere regnesteg per spørsmål enn skoleeksamenene. Regn ferdig før du ser på alternativene — halvparten av dem er konstruert for å treffe et mellomresultat.",
  mc: { wrongFactor: 0 },
  exercises: [
    {
      n: 1,
      title: "Kjell Inge og Lugano AS",
      points: 10,
      topic: "Aksjonærmodellen",
      chapters: [5, 1],
      body: "<p>Kjell Inge har kjøpt selskapet Lugano AS. Selskapets aksjekapital består av en aksje som Kjell Inge kjøpte for kr 500 000 i desember måned 2020. Lugano AS har et driftsresultat før skatt på kr 150 000 i 2020. Du kan legge til grunn at den alminnelige skattesatsen er 22%, at skjermingsrenten er 5%, at eierskatten er 25% og oppjusteringsfaktoren 1,6.</p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Spørsmål 1: Hvor mye betaler Lugano i selskapsskatt i 2020?</p>",
          options: ["Kr 33 000", "Kr 37 500", "Kr 30 000", "Kr 110 000", "Kr 47 500"],
          answer: 0,
          solution: "<p><b>Regnestykket.</b></p><p>1. Grunnlaget for selskapsskatten er selskapets <b>driftsresultat før skatt</b>, ikke aksjens kostpris og ikke det som eventuelt deles ut: 150 000.<br>2. Satsen er den alminnelige skattesatsen τ<sub>c</sub> = 22 %.<br>3. Selskapsskatt = 150 000 × 0,22 = <b>kr 33 000</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 37 500</b> = 150 000 × 25 %. Her er <i>eierskatten</i> brukt på selskapets overskudd. Eierskatten treffer aksjonæren når pengene tas ut, ikke selskapet når de tjenes. To satser, to skattesubjekter.<br><b>Kr 30 000</b> = 150 000 × 20 %. En avrundet «cirka 20 %» selskapsskatt. Satsen har vært 22 % siden 2019 og oppgaven oppgir den eksplisitt.<br><b>Kr 110 000</b> = 500 000 × 22 %. Riktig sats på feil grunnlag: aksjens kostpris i stedet for årets overskudd. Kostprisen er grunnlag for <i>skjermingen</i>, aldri for selskapsskatten.<br><b>Kr 47 500</b> lar seg ikke regne fram av oppgavens tall i noen konsistent rutine — et rent støyalternativ. Det er verdt å merke seg som teknikk: når ett alternativ ikke svarer til noen tenkelig feil, er det som regel fyll.</p><p><b>Regelen.</b> Selskapsskatt = alminnelig sats × selskapets skattepliktige overskudd, uavhengig av hva som deles ut og uavhengig av hva aksjen kostet.</p><p><b>Kontroll.</b> Overskudd etter skatt blir 150 000 × 0,78 = 117 000, og 150 000 &minus; 117 000 = 33 000. Samme tall den andre veien.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>Spørsmål 2. Kjell Inge er glad i å ta utbytte og ønsker å ta ut utbytte i 2021 av overskuddet i 2020, men han liker ikke å betale skatt. Han bestemmer seg derfor for å ta ut kun utbytte innenfor skjerming. Hvor mye kan han ta ut i utbytte uten å betale eierskatt?</p>",
          options: ["Kr 20 000", "Kr 25 000", "Kr 5 000", "Kr 30 000", "Kr 7 500"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b></p><p>1. Skjermingsgrunnlaget S er aksjens <b>kostpris</b> pluss eventuell framført ubenyttet skjerming. Aksjen ble kjøpt i desember 2020 for 500 000, og det er ingen framført skjerming ennå, så S = 500 000.<br>2. Skjermingsrenten er r<sub>s</sub> = 5 %.<br>3. Skjermingsfradrag = S × r<sub>s</sub> = 500 000 × 0,05 = <b>kr 25 000</b>.<br>4. Utbytte opp til skjermingsfradraget er skattefritt for eieren, så han kan ta ut kr 25 000 uten eierskatt.</p><p><b>Hvorfor de andre er gale.</b> Tre av dem er riktig grunnlag med feil rente, og én er riktig rente på feil grunnlag:</p><table class=\"data\"><tr><th>Alternativ</th><th>Regnestykket bak</th><th>Feilen</th></tr><tr><td class=\"n\">Kr 5 000</td><td class=\"n\">500 000 × 1 %</td><td>Feil skjermingsrente</td></tr><tr><td class=\"n\">Kr 20 000</td><td class=\"n\">500 000 × 4 %</td><td>Feil skjermingsrente</td></tr><tr><td class=\"n\">Kr 30 000</td><td class=\"n\">500 000 × 6 %</td><td>Feil skjermingsrente</td></tr><tr><td class=\"n\">Kr 7 500</td><td class=\"n\">150 000 × 5 %</td><td>Riktig rente, men på driftsresultatet i stedet for kostprisen</td></tr></table><p>Kr 7 500 er den farlige: den kommer av å blande sammen de to tallene som står i oppgaveteksten. Skjermingen har <b>ingenting</b> med årets overskudd å gjøre — den er en normalavkastning på det du har betalt for aksjen.</p><p><b>Regelen.</b> Skjermingsfradraget = skjermingsgrunnlaget (kostpris + framført ubenyttet skjerming) × skjermingsrenten, beregnet per aksje for den som eier aksjen ved <b>årsskiftet</b>.</p><p><b>Kontroll.</b> 25 000 er 5 % av 500 000 og 16,7 % av det utdelbare overskuddet på 117 000 — det siste tallet har ingen selvstendig betydning, men det viser at skjermingen er en beskjeden del av utbyttet her, som er hele poenget med spørsmål 3.</p>",
        },
        {
          label: "c",
          points: 2,
          body: "<p>Spørsmål 3. Kjell Inge har likevel kommet til at han i 2021 må ta ut mer utbytte enn han opprinnelig hadde tenkt seg da han skal kjøpe seg ny båt. Han bestemmer seg for å ta ut alt overskudd i selskapet som utbytte etter at selskapsskatten er betalt. Hvor mye betaler Kjell Inge i eierskatt?</p>",
          options: ["Kr 30 000", "Kr 23 000", "36 800", "23 200", "32 384"],
          answer: 2,
          solution: "<p><b>Regnestykket — fire steg, og hvert galt alternativ hopper over ett av dem.</b></p><p>1. <b>Utdelbart utbytte.</b> Selskapet har 150 000 før skatt og betaler 33 000 i selskapsskatt, så det som kan deles ut er 150 000 &minus; 33 000 = <b>117 000</b>.<br>2. <b>Trekk skjermingen.</b> Skattepliktig utbytte før oppjustering = 117 000 &minus; 25 000 = <b>92 000</b>.<br>3. <b>Oppjuster grunnlaget.</b> 92 000 × 1,6 = <b>147 200</b>.<br>4. <b>Eierskatt.</b> 147 200 × 0,25 = <b>kr 36 800</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 23 000</b> = 92 000 × 25 %. <b>Oppjusteringen er glemt.</b> Dette er den vanligste feilen på hele eksamen, og den ligger alltid i alternativlisten. Er du usikker, sjekk om ditt svar er nøyaktig 1,6 ganger et av de andre alternativene — da har du eller de hoppet over oppjusteringen.<br><b>32 384</b> = 147 200 × 22 % = 92 000 × 1,6 × 0,22. <b>Riktig grunnlag, feil sats:</b> den alminnelige satsen på 22 % er brukt der eierskatten på 25 % skal stå. Legg merke til at 0,22 × 1,6 = 35,2 %, som dukker opp igjen som feilalternativ i spørsmål 4 — de to feilene henger sammen.<br><b>Kr 30 000</b> = 150 000 × 20 %. Regnet på selskapets bruttooverskudd med en avrundet sats: både selskapsskatten, skjermingen og oppjusteringen er borte. Merk at dette tallet båret videre gir 42 % i spørsmål 5, som også er et alternativ der.<br><b>23 200</b> ligger 200 kroner fra 23 000 og svarer ikke til noen konsistent rutine. Den er der for å straffe den som leser fort og ser «23» først. To alternativer som skiller seg med under én prosent er alltid et signal om at du skal lese hele tallet.</p><p><b>Regelen.</b> Eierskatt på utbytte = (utbytte &minus; skjermingsfradrag) × oppjusteringsfaktor × eierskattesats. Skjermingen trekkes <b>før</b> oppjusteringen, aldri etter.</p><p><b>Kontroll — regn den andre veien.</b> Oppjusteringen kan legges på satsen i stedet for på grunnlaget: effektiv eierskattesats t<sub>e</sub> = 0,25 × 1,6 = 40 %, og 92 000 × 0,40 = 36 800. Samme tall. Denne dobbeltregningen tar ti sekunder og fanger nesten alle oppjusteringsfeil.</p><p><b>Merk satsene.</b> I 2022 var faktoren 1,6 og eierskatten 25 %, som gir t<sub>e</sub> = 40 %. I 2026 er faktoren <b>1,72</b> og den alminnelige satsen 22 %, som gir t<sub>e</sub> = 22 % × 1,72 = <b>37,84 %</b>. Rutinen er identisk, men tallene er ikke — bruk alltid satsene oppgaven selv oppgir.</p>",
        },
        {
          label: "d",
          points: 1,
          body: "<p>Spørsmål 4. Hva blir effektiv skatt på utbyttet når Kjell Inge bestemmer seg for å ta ut alt overskudd i selskapet som utbytte etter at selskapsskatten er betalt?</p>",
          options: ["35,2%", "35%", "25%", "31,5%", "47,6%"],
          answer: 3,
          solution: "<p><b>Regnestykket.</b> «Effektiv skatt på utbyttet» betyr betalt eierskatt delt på <b>hele utbyttet</b>, ikke på det skattepliktige grunnlaget:</p><p>36 800 / 117 000 = 0,31453 = <b>31,5 %</b> (avrundet til én desimal).</p><p>Satsen er lavere enn den nominelle eierskatten fordi de første 25 000 kronene av utbyttet er skjermet. Skjermingen er 25 000/117 000 = 21,4 % av utbyttet, og 40 % × (1 &minus; 0,214) = 31,45 % — det er nøyaktig hele forklaringen på hvorfor svaret ikke er 40 %.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>35,2 %</b> = 0,22 × 1,6. Den alminnelige satsen oppjustert i stedet for eierskatten, og dessuten regnet som en ren sats uten å ta hensyn til skjermingen. Dette er tvillingen til alternativ 32 384 i spørsmål 3.<br><b>35 %</b> er 35,2 % avrundet — et alternativ som bare finnes for å fange den som regnet 0,22 × 1,6 og deretter «ryddet» tallet.<br><b>25 %</b> er den nominelle eierskattesatsen, altså svaret til den som verken oppjusterer eller skjermer. Vær oppmerksom: 25 % er også eierskatten regnet mot det <i>skattepliktige</i> utbyttet hvis oppjusteringen glemmes (23 000/92 000). Begge veier er feil av samme grunn.<br><b>47,6 %</b> ligger i nærheten av den <i>samlede</i> effektive satsen for selskap og eier og er en felle for den som svarer på spørsmål 5 i stedet for spørsmål 4. Den samlede satsen er dessuten 46,5 %, ikke 47,6 %.</p><p><b>Regelen.</b> Effektiv skattesats = betalt skatt / det beløpet skatten måles mot. Les alltid hva nevneren skal være: <i>utbyttet</i> (117 000) i dette spørsmålet, <i>bruttoinntekten</i> (150 000) i det neste.</p><p><b>Kontroll.</b> Målt mot det skattepliktige grunnlaget er satsen 36 800/92 000 = 40 % = t<sub>e</sub>, akkurat som den skal være. Går du fra 40 % til 31,5 % ved å gange med 92 000/117 000 = 0,7863, har du regnet riktig begge veier.</p>",
        },
        {
          label: "e",
          points: 2,
          body: "<p>Spørsmål 5. Hva er effektiv skattesats samlet for eier og selskapet når Kjell Inge bestemmer seg for å ta ut alt overskudd i selskapet som utbytte etter at selskapsskatten er betalt?</p>",
          options: ["47,5%", "46,5%", "50%", "47%", "42%"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b></p><p>1. Samlet betalt skatt = selskapsskatt + eierskatt = 33 000 + 36 800 = <b>69 800</b>.<br>2. Bruttoinntekten er selskapets driftsresultat <b>før</b> all skatt: 150 000.<br>3. Effektiv samlet sats = 69 800 / 150 000 = 0,46533 = <b>46,5 %</b>.</p><p><b>Feil i kilden — les dette.</b> Nynorskversjonen av sensorveiledningen oppgir <b>46,8 %</b> her. Det er en regnefeil: 69 800/150 000 = 46,533 %, som avrundet er 46,5 %. Bokmålsversjonen har 46,5 % og er riktig. Har du regnet 46,5 % og sett 46,8 % et sted, er det veiledningen som tar feil, ikke du.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>47 %</b> = 22 % + 25 %, satsene lagt sammen. Skattesatser i kjede legges aldri sammen — den andre skatten treffer bare det som er igjen etter den første. Samme tall kommer også ut av (33 000 + 37 500)/150 000, altså eierskatt regnet direkte på bruttooverskuddet.<br><b>42 %</b> = (33 000 + 30 000)/150 000. Dette er hva du får hvis du drar det gale svaret 30 000 fra spørsmål 3 videre hit. Én feil forplanter seg gjennom fire delspørsmål — når du har regnet en delverdi, sjekk den før du bygger på den.<br><b>50 %</b> er et rundt tall uten regning bak.<br><b>47,5 %</b> ligger ett hakk over riktig svar og er tvillingen som fanger den som runder feil vei eller husker at «samlet skatt på utbytte er rundt 47–48 %». Det stemmer for en eier <i>uten</i> skjerming, ikke her.</p><p><b>Regelen.</b> Samlet effektiv sats på selskapsoverskudd som deles ut = 1 &minus; (1 &minus; τ<sub>c</sub>)(1 &minus; t<sub>e</sub>) når hele overskuddet deles ut og det ikke er skjerming. Skjermingen trekker satsen ned.</p><p><b>Kontroll — bygg satsen opp fra bunnen.</b> Uten skjerming: 1 &minus; 0,78 × 0,60 = <b>53,2 %</b>. Skjermingen gjør bare 92 000 av de 117 000 skattepliktige, altså 78,63 % av utbyttet:<br>0,22 + 0,78 × 0,7863 × 0,40 = 0,22 + 0,2453 = <b>46,53 %</b>. Samme tall som 69 800/150 000. &#10003;</p><p><b>Merk satsene.</b> Med 2026-satsene ville regnestykket uten skjerming gitt 1 &minus; 0,78 × (1 &minus; 0,3784) = 51,5 %, ikke 53,2 %.</p>",
        },
        {
          label: "f",
          points: 3,
          body: "<p>Spørsmål 6. Kjell sitter med aksjen både i 2021 og 2022, men sommeren 2023 selger han selskapet og aksjen for kr 550 000. Anta han tok ut utbytte i 2021 som oversteg skjermingen. Selskapet betalte ikke ut utbytte i 2022 og skjermingsrenten var 10% i 2022 og 5% i 2023. Hva betaler Kjell Inge i skatt på gevinsten av aksjesalget?</p>",
          options: ["Kr 50 000", "Kr 0", "Kr 100 000", "Kr 22 000", "Kr 25 000"],
          answer: 1,
          solution: "<p>Dette er settets tyngste enkeltspørsmål (3 poeng) og den klassiske skjermingsfellen: <b>ubenyttet skjerming framføres og reduserer gevinsten ved salg</b>.</p><p><b>Regnestykket, år for år.</b></p><table class=\"data\"><tr><th>År</th><th>Skjermings&shy;grunnlag</th><th>Skjermings&shy;rente</th><th>Skjerming</th><th>Utbytte</th><th>Ubenyttet, framført</th></tr><tr><td>2021</td><td class=\"n\">500 000</td><td class=\"n\">5 %</td><td class=\"n\">25 000</td><td>Over skjermingen</td><td class=\"n\">0</td></tr><tr><td>2022</td><td class=\"n\">500 000</td><td class=\"n\">10 %</td><td class=\"n\">50 000</td><td class=\"n\">0</td><td class=\"n\">50 000</td></tr><tr><td>2023</td><td colspan=\"4\">Aksjen selges om sommeren — han eier den ikke ved årsskiftet</td><td class=\"n\">&mdash;</td></tr></table><p>1. <b>2021:</b> utbyttet oversteg skjermingen, så hele årets skjerming på 25 000 ble brukt. Ingenting å framføre.<br>2. <b>2022:</b> ingen utbytte, og skjermingen er 500 000 × 10 % = 50 000. Hele beløpet blir <b>ubenyttet skjerming som framføres</b>.<br>3. <b>2023:</b> skjermingsfradrag tilkommer den som eier aksjen <b>ved utgangen av året</b>. Kjell Inge selger om sommeren og får derfor ingen skjerming for 2023, selv om renten er oppgitt til 5 %. Renten for 2023 er oppgitt nettopp for å friste deg til å bruke den.<br>4. <b>Gevinsten:</b> salgssum &minus; inngangsverdi &minus; ubenyttet skjerming = 550 000 &minus; 500 000 &minus; 50 000 = <b>0</b>.<br>5. Skattepliktig gevinst er null, så oppjustering og eierskatt gir <b>kr 0</b> i skatt.</p><p><b>Hvorfor de andre er gale.</b> Alle fire er tall som opptrer i utregningen, men ingen av dem er skatten:</p><p><b>Kr 50 000</b> = 550 000 &minus; 500 000. Den rå gevinsten <b>før</b> ubenyttet skjerming — den vanligste feilen. Den er dessuten ikke en skatt, men et gevinstbeløp: skatten av den ville vært 50 000 × 1,6 × 0,25 = 20 000.<br><b>Kr 25 000</b> er skjermingsfradraget for 2021 (500 000 × 5 %). Feil år og feil størrelse; det er 2022-skjermingen på 50 000 som er ubenyttet.<br><b>Kr 100 000</b> = 2 × 50 000, altså ubenyttet skjerming talt to ganger, eller skjerming også tilkjent for salgsåret. Merk at selv dette gir null skatt, siden gevinsten da blir negativ og skjermingen aldri kan skape et fradragsberettiget tap.<br><b>Kr 22 000</b> = 22 % av 100 000. Alminnelig sats på en gevinst som verken er riktig beregnet eller riktig oppjustert.</p><p><b>Regelen — tre punkter som må sitte.</b><br>(i) Skattepliktig gevinst = vederlag &minus; inngangsverdi &minus; framført ubenyttet skjerming, deretter oppjustert med f og skattlagt med eierskatten.<br>(ii) Ubenyttet skjerming kan redusere gevinsten <b>til null</b>, men aldri under: den skaper ikke tap.<br>(iii) Skjerming tilkommer bare den som eier aksjen ved <b>årsskiftet</b>. Selger du i løpet av året, får du ingen skjerming for salgsåret.</p><p><b>Kontroll.</b> Salgsvederlaget overstiger kostprisen med 50 000, og den framførte skjermingen er nøyaktig 50 000. De to nuller hverandre ut. Hadde han solgt for 600 000, ville gevinsten vært 600 000 &minus; 500 000 &minus; 50 000 = 50 000, og skatten 50 000 × 1,6 × 0,25 = 20 000.</p>",
        },
      ],
    },
    {
      n: 2,
      title: "Martine og lakseaksjen LAX",
      points: 3,
      topic: "Ubenyttet skjerming",
      chapters: [5],
      body: "<p>Martine har kjøpt en aksje i lakseselskapet LAX med kostpris kr 100 i 2018. Siden hun satt med aksjen over årsskiftet 2018/2019, har hun rett på utbytte i 2018 samt skjerming. Martine sitter på aksjen helt fram til i dag og har ingen planer om å selge aksjen. Anta følgende utbyttepolitikk og skjermingsrente i følgende år:</p><table class=\"data\"><tr><th>År</th><th>Utbytte</th><th>Skjermingsrente</th></tr><tr><td>2018</td><td class=\"n\">Kr 3</td><td class=\"n\">2 %</td></tr><tr><td>2019</td><td class=\"n\">Kr 5</td><td class=\"n\">3 %</td></tr><tr><td>2020</td><td class=\"n\">Kr 1</td><td class=\"n\">5 %</td></tr><tr><td>2021</td><td class=\"n\">Kr 3</td><td class=\"n\">1 %</td></tr></table><p>Hva er skattbart utbytte for Martine i 2021?</p>",
      options: ["0 kr", "1,04 kr", "1,02 kr", "1,1 kr", "4 kr", "3 kr"],
      answer: 0,
      solution: "<p>Dette er flerårsrutinen i ren form. Den må gjøres <b>år for år</b> i én tabell — hopper du rett til 2021, treffer du et av feilalternativene.</p><p><b>Rutinen, i fire kolonner.</b> For hvert år: (1) skjerming = grunnlag × rente; (2) tilgjengelig skjerming = årets skjerming + framført ubenyttet; (3) skattbart utbytte = maks(0, utbytte &minus; tilgjengelig skjerming); (4) ny ubenyttet skjerming = maks(0, tilgjengelig skjerming &minus; utbytte), som <b>legges til grunnlaget</b> neste år.</p><table class=\"data\"><tr><th>År</th><th>Grunnlag S</th><th>Rente</th><th>Årets skjerming</th><th>+ framført</th><th>Utbytte</th><th>Skattbart</th><th>Ny ubenyttet</th></tr><tr><td>2018</td><td class=\"n\">100</td><td class=\"n\">2 %</td><td class=\"n\">2,00</td><td class=\"n\">2,00</td><td class=\"n\">3</td><td class=\"n\">1,00</td><td class=\"n\">0</td></tr><tr><td>2019</td><td class=\"n\">100</td><td class=\"n\">3 %</td><td class=\"n\">3,00</td><td class=\"n\">3,00</td><td class=\"n\">5</td><td class=\"n\">2,00</td><td class=\"n\">0</td></tr><tr><td>2020</td><td class=\"n\">100</td><td class=\"n\">5 %</td><td class=\"n\">5,00</td><td class=\"n\">5,00</td><td class=\"n\">1</td><td class=\"n\">0</td><td class=\"n\">4,00</td></tr><tr><td>2021</td><td class=\"n\">104</td><td class=\"n\">1 %</td><td class=\"n\">1,04</td><td class=\"n\">5,04</td><td class=\"n\">3</td><td class=\"n\"><b>0</b></td><td class=\"n\">2,04</td></tr></table><p><b>Stegene i 2021 skrevet ut.</b></p><p>1. Grunnlaget er kostpris + framført ubenyttet skjerming = 100 + 4 = <b>104</b>. Dette er hele nøkkelen: den ubenyttede skjermingen <i>legges til grunnlaget</i>, den står ikke i en egen bøtte ved siden av.<br>2. Årets skjerming = 104 × 1 % = <b>1,04</b>.<br>3. Tilgjengelig skjerming = 4 (framført) + 1,04 (årets) = <b>5,04</b>.<br>4. Utbyttet er 3, som er mindre enn 5,04, så skattbart utbytte = <b>0 kr</b>.<br>5. Ny ubenyttet skjerming = 5,04 &minus; 3 = <b>2,04</b>, som gir grunnlag 102,04 i 2022.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>1,04 kr</b> er <i>årets skjermingsfradrag</i>, ikke det skattbare utbyttet. Alternativet fanger den som regner riktig og deretter svarer med mellomresultatet — den vanligste enkeltfeilen på et flervalgssett med tidspress.<br><b>1,02 kr</b> = 102 × 1 %. Grunnlaget er da 102 i stedet for 104, altså framført skjerming på 2 i stedet for 4. Det er 2019-tallet (skattbart utbytte 2) forvekslet med ubenyttet skjerming.<br><b>1,1 kr</b> = 110 × 1 %, eller 100 × 1,1 %. Feil grunnlag eller feil rente; et støyalternativ i samme størrelsesorden som de to over, plassert der for å gjøre øyemålet ubrukelig.<br><b>4 kr</b> er den framførte skjermingen fra 2020 alene — riktig mellomresultat, feil spørsmål, og dessuten uten årets 1,04.<br><b>3 kr</b> er utbyttet selv, altså svaret til den som ikke bruker skjerming i det hele tatt.</p><p><b>Merk at fire av seks alternativer er tall som faktisk opptrer i riktig utregning</b> (1,04, 1,02-nabo, 4 og 3). Det er slik disse spørsmålene bygges: distraktorene er <i>dine egne mellomresultater</i>. Skriv derfor alltid ned hva spørsmålet spør om før du leser alternativene.</p><p><b>Regelen.</b> Ubenyttet skjerming framføres på den enkelte aksjen, legges til skjermingsgrunnlaget året etter, og kan bare redusere skattbart utbytte til null — aldri under. Den følger aksjen og aksjonæren, ikke selskapet.</p><p><b>Kontroll.</b> Summen over alle fire år: samlet utbytte 3 + 5 + 1 + 3 = 12; samlet skjerming 2 + 3 + 5 + 1,04 = 11,04; samlet skattbart 1 + 2 + 0 + 0 = 3. Og 12 &minus; 11,04 = 0,96 &ne; 3, som viser at skjerming <b>ikke</b> kan summeres over år uten å ta hensyn til at den ikke kan skape fradrag i år med lite utbytte — 2,04 av skjermingen står fortsatt ubrukt. Regnestykket 12 &minus; 11,04 = 0,96 er nettopp det nynorskversjonen av veiledningen roter til (se under).</p><p><b>Feil i kilden.</b> Nynorskversjonen av dette spørsmålet oppgir <b>0,96 kr</b> som riktig svar og regner ut fra et utbytte på 6 i 2021 — men nynorskoppgavens egen tabell sier fortsatt 3. Fasiten regner altså på andre tall enn oppgaven oppgir. Bokmålsversjonen er konsistent: med utbytte 3 er svaret <b>0 kr</b>, og akkumulert ubenyttet skjerming blir 2,04.</p>",
    },
    {
      n: 3,
      title: "Strømstøtten som fjernes",
      points: 3,
      topic: "Skatteinsidens",
      chapters: [11],
      body: "<p>Det er mange strømleverandører i Norge og konkurransen i markedet blant tilbydere og etterspørrere av strøm kan representeres ved en frikonkurransesituasjon. Under frikonkurranse er tilbudet gitt av summen av grensekostnadene til bedriftene. I strømmarkedet er grensekostnaden konstant og lik for alle. I Norge er klimaet kaldt og husholdningene kan ikke variere strømbruken. Strømprisen har steget og regjeringen har gitt en subsidie pr solgt kwh til produsentene slik at de kan selge kraften billigere. I det siste har strømprisen falt mye fordi høsten har vært regnfull og regjeringen bestemmer seg for å fjerne hele støtten som gis til produsentene. Hva skjer med likevektspris til konsumentene og omsatt mengde kwh når strømstøtten til produsentene fjernes?</p>",
      options: [
        "Prisen husholdningene betaler endres ikke, men kvantum faller",
        "Prisen til husholdningen går opp og kvantum går ned",
        "Prisen husholdningen betaler synker tilsvarende støtten og kvantum øker.",
        "Kvantum kwh omsatt er uforandret, men prisen husholdningen betaler synker",
        "Kvantum kwh omsatt er uforandret, og prisen husholdningen betaler stiger tilsvarende støttebeløpet som fjernes.",
        "Når strømstøtten reduseres faller omsatt kvantum kwh og konsumentprisen går opp mens produsentprisen går ned",
        "Produsent-og konsumentpris endres like mye slik at når støtten fjernes deler de kostnaden mens omsatt kvantum kwh er uforandret.",
      ],
      answer: 4,
      solution: "<p><b>Les de to elastisitetsopplysningene ut av teksten først.</b> Hele oppgaven er å oversette to setninger til to kurver:</p><p>1. «<i>Husholdningene kan ikke variere strømbruken</i>» &rArr; etterspørselen er <b>perfekt uelastisk</b>: etterspørselskurven er loddrett, D&prime;(P) = 0.<br>2. «<i>Grensekostnaden er konstant og lik for alle</i>», og under frikonkurranse er tilbudet summen av grensekostnadene &rArr; tilbudet er <b>perfekt elastisk</b>: tilbudskurven er vannrett ved grensekostnaden, S&prime;(p) = &infin;.</p><p><b>Hva som skjer.</b> Å fjerne en subsidie per kwh til produsentene er det samme som å innføre en stykkskatt t. Den vannrette tilbudskurven flyttes opp med hele beløpet, mens den loddrette etterspørselskurven ikke flytter seg. Skjæringspunktet flytter seg rett opp: <b>kvantum er uendret</b>, og <b>konsumentprisen stiger med hele støttebeløpet</b>. Alternativ (e).</p><p><b>Utledningen, som forelesningen bruker.</b> La P være prisen husholdningene betaler og p prisen produsentene får, med P = p + t. I likevekt er D(P) = S(P &minus; t). Deriver med hensyn på t:</p><p>D&prime;(P)·P&prime;(t) = S&prime;(p)·(P&prime;(t) &minus; 1)&nbsp;&rArr;&nbsp;P&prime;(t) = S&prime;(p) / (S&prime;(p) &minus; D&prime;(P))</p><p>Med D&prime;(P) = 0 blir P&prime;(t) = S&prime;/S&prime; = <b>1</b>: konsumentprisen endres krone for krone med skatten. Tilsvarende er p&prime;(t) = D&prime;/(S&prime; &minus; D&prime;) = <b>0</b>: produsentprisen er uendret. Samme svar får du av det perfekt elastiske tilbudet alene, siden S&prime; &rarr; &infin; gir P&prime;(t) &rarr; 1.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a) Pris uendret, kvantum faller</b> — dette er speilbildet: det er svaret når etterspørselen er perfekt <i>elastisk</i> og tilbudet uelastisk, altså når produsentene bærer alt.<br><b>(b) Pris opp, kvantum ned</b> — riktig retning på prisen, men kvantum kan ikke falle når etterspørselen er loddrett. Dette er standardsvaret for et vanlig marked med begge kurver skrå, og den mest fristende fellen for den som svarer på autopilot.<br><b>(c) Pris synker, kvantum øker</b> — feil retning på begge. Å <i>fjerne</i> en støtte gjør strømmen dyrere, ikke billigere.<br><b>(d) Kvantum uendret, pris synker</b> — riktig om kvantum, feil fortegn på prisen. Dette er svaret på det motsatte spørsmålet (hva skjer når støtten <i>innføres</i>), og er faktisk det spørsmålet nynorskversjonen av settet stiller.<br><b>(f) Kvantum faller, konsumentpris opp og produsentpris ned</b> — beskriver deling av byrden i et marked med to skrå kurver. Med vannrett tilbud kan produsentprisen ikke endre seg: den er låst til grensekostnaden.<br><b>(g) Produsent og konsument deler likt, kvantum uendret</b> — lik deling krever like elastisiteter i tallverdi. Her er de så ulike som de kan bli (0 mot uendelig), så delingen er 100/0.</p><p><b>Regelen, i én setning.</b> <b>Den minst elastiske siden av markedet bærer skatten.</b> Er den ene siden perfekt uelastisk, bærer den alt, og kvantum endres ikke. Det gjelder likt for skatt og subsidie, og likt enten avgiften formelt legges på kjøper eller selger — den formelle skattyteren er irrelevant for hvem som faktisk betaler.</p><p><b>Kontroll.</b> Sett tall på det: grensekostnad 50 øre/kwh, støtte 30 øre, forbruk 20 000 kwh uansett pris. Med støtte betaler husholdningen 20 øre, uten støtte 50 øre — en økning på nøyaktig 30 øre, altså hele støtten. Forbruket er 20 000 kwh i begge tilfeller, og produsenten får 50 øre begge ganger.</p>",
    },
    {
      n: 4,
      title: "Masse Gryn flytter til Kypros og bor i Dubai",
      points: 6,
      topic: "Internasjonal skatt og exit-skatt",
      chapters: [13, 6],
      body: "<p>Investoren Masse Gryn er født, oppvokst og inntil nylig bosatt i Ytre Sandviken. Over flere tiår har han bygget opp et milliardkonsern her til lands. Han er selv daglig leder og styreleder i konsernets øverste holdingselskap, Max Cash Box AS. Masse har fulgt nøye med i Dagens Næringsliv og har der sett at en rekke norske investorer nå «flagger ut». Lut lei kombinasjonen av vedvarende lavtrykk i Ytre-Sandviken og økende skattetrykk i Norge, besluttet Masse å flytte til Kypros i januar 2022 og meldte fra om det til Skatteetaten. Han solgte sin bolig like ved NHH i Ytre-Sandviken og kjøpte seg leilighet på Kypros samme måned. På visningen i Kypros traff Masse uventet en Dubai-basert kvinne med sans for gründere fra Ytre-Sandviken. De to ble hodestups forelsket og det ryktes nå om barn på vei. Masse har bodd med kvinnen i Dubai siden februar 2022 og har flyttet alle sine midler til bank i Dubai. De to planlegger å kjøpe stor leilighet sammen i Dubai til jul. På Kypros har Masse ikke vært siden leilighetskjøpet i januar, da han tilbringer all sin tid i Dubai. Fra utflyttingstidspunktet januar 2022 har han utført sine oppgaver som daglig leder og styreleder i konsernets holdingsselskap via telefon og internett fra nye og flotte kontorlokaler selskapet nå disponerer i Dubai. Alle styremøter holdes fysisk på femstjerners restaurant i Dubai, da selskapet gladelig bekoster reise for resten av styret fra Ytre-Sandviken til Dubai for hvert styremøte.</p><p>Masse har nylig blitt oppringt av sin nevø, Lite Gryn, som tar master på NHH. Lite har nylig hatt forelesninger i det populære faget personlig økonomi og spør Masse om ikke denne flyttingen hans kan få skattemessige implikasjoner. I panikkangst ringer Masse nå til deg, som er hans skatterådgiver, og ber deg svare på spørsmålene nedenfor.</p><p>Legg til grunn følgende:</p><ul><li>Masse er å anse som skattemessig bosatt i Norge, Kypros og De forente arabiske emirater (Dubai) etter disse landenes respektive interne skatterett</li><li>Selskapet Max Cash Box AS er å anse som hjemmehørende i Norge og De forente arabiske emirater (Dubai) i 2022 etter disse landenes respektive interne skatterett</li><li>Selskapet Max Cash Box AS ble stiftet i Norge</li><li>Det foreligger skatteavtale mellom Norge og Kypros. Legg til grunn at avtalen anvender vanlig kreditmetode.</li><li>Det foreligger ikke skatteavtale mellom Norge og De forente arabiske emirater</li><li>Masse tjener kr 2 500 000 i lønn for 2022 for sin stilling som daglig leder i Max Cash Box AS. Forutsett at skattesats for lønnsinntekt i 2022 er 45% i Norge, 25% i Kypros og 15% i Dubai.</li><li>Beregnet urealisert gevinst på Masse sine aksjer i Max Cash Box AS var kr 500 mill på utflyttingstidspunktet og det ble stilt betryggende sikkerhet for skatteforpliktelsen</li><li>Total differanse mellom virkelig verdi på eiendelene til Max Cash Box AS og skattemessige verdier (dvs urealisert skattemessig gevinst på eiendelene) på utflyttingstidspunktet var på kr 1 000 mill</li></ul>",
      parts: [
        {
          label: "a",
          points: 0.5,
          body: "<p>Spørsmål 1: Fra og med hvilket år vil Masse anses som skattemessig utflyttet fra Norge etter norsk intern skatterett?</p>",
          options: ["2022.", "2024.", "2025.", "2026."],
          answer: 3,
          solution: "<p><b>Regelen.</b> Skatteloven skiller mellom to grupper. Har du vært skattemessig bosatt i Norge i <b>minst ti år</b> før utflyttingsåret, opphører bostedet først etter <b>tre hele mellomliggende inntektsår</b> der verken du oppholder deg i Norge mer enn 61 dager i året eller du eller dine nærstående disponerer bolig her (skatteloven § 2-1 tredje ledd). Har du vært bosatt i mindre enn ti år, opphører bostedet for det første inntektsåret der de samme vilkårene er oppfylt.</p><p><b>Tellingen.</b> Masse er «født, oppvokst og inntil nylig bosatt» i Norge — altså langt over ti år. Utflyttingsåret er 2022.</p><table class=\"data\"><tr><th>År</th><th>Rolle</th><th>Status</th></tr><tr><td>2022</td><td>Utflyttingsåret — telles ikke med</td><td>Bosatt</td></tr><tr><td>2023</td><td>Første mellomliggende år</td><td>Bosatt</td></tr><tr><td>2024</td><td>Andre mellomliggende år</td><td>Bosatt</td></tr><tr><td>2025</td><td>Tredje mellomliggende år</td><td>Bosatt</td></tr><tr><td><b>2026</b></td><td>Bostedet opphører</td><td><b>Utflyttet</b></td></tr></table><p>Svaret er <b>2026</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>2022</b> er svaret til den som tror at melding til Skatteetaten er nok. Å melde flytting er en opplysningsplikt, ikke en skattemessig handling — norsk bosted opphører etter loven, ikke etter meldingen.<br><b>2024</b> teller utflyttingsåret som ett av de tre mellomliggende årene. Utflyttingsåret teller ikke; tellingen starter året etter.<br><b>2025</b> teller bare to mellomliggende år, eller bruker regelen for dem som har vært bosatt i mindre enn ti år.</p><p><b>Poenget bak regelen.</b> Kravet gjør at man ikke kan «flytte ut» skattemessig ved et pennestrøk i desember. Det er også grunnen til at Masse i 2022 fortsatt er norsk skattyter med global skatteplikt — noe spørsmål 5 og 6 bygger videre på.</p>",
        },
        {
          label: "b",
          points: 0.5,
          body: "<p>Spørsmål 2: Medfører det at Masse personlig flytter ut av Norge i 2022 utflyttingsskatt på hans urealiserte aksjegevinst?</p>",
          options: [
            "Ja, men den beregnede skatten bortfaller dersom han ikke selger aksjene innen fem år etter utflytting.",
            "Ja, det blir betalbar skatt i 2022.",
            "Ja, men det blir ikke betalbar skatt før i 2026.",
            "Nei.",
          ],
          answer: 0,
          solution: "<p><b>Slik reglene var i 2022.</b> Utflyttingsskatten i skatteloven § 10-70 gjør utflyttingen til en <i>fiktiv realisasjon</i>: den urealiserte gevinsten på aksjene — her kr 500 mill — beregnes og skattlegges som om aksjene var solgt dagen før utflyttingen. Men skatten var ikke betalbar med det samme. Ved betryggende sikkerhet (som oppgaven forutsetter er stilt) fikk skattyteren <b>utsettelse</b>, og etter den daværende <b>femårsregelen</b> <b>bortfalt</b> hele den beregnede skatten dersom aksjene ikke ble realisert innen fem år etter utflyttingen. Riktig svar er derfor (a): ja, skatt beregnes, men den faller bort hvis han sitter stille i fem år.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>«Ja, det blir betalbar skatt i 2022»</b> — nei. Poenget med sikkerhetsstillelsen er nettopp at betalingen utsettes. Alternativet fanger den som tror at fiktiv realisasjon betyr fiktivt forfall.<br><b>«Ja, men ikke betalbar før i 2026»</b> — blander sammen tidsfristen i spørsmål 1 (når bostedet opphører) med femårsregelen. De to fristene er ulike regler med ulike formål og skal ikke smeltes sammen. 2026 er dessuten fire år etter utflyttingen, ikke fem.<br><b>«Nei»</b> — utflytting av en person med urealisert aksjegevinst utløser alltid beregning av utflyttingsskatt over terskelbeløpet. At skatten kan bortfalle senere, er ikke det samme som at den ikke utløses.</p><p><b>Regelen slik den var, i én setning.</b> Utflyttingsskatt beregnes på urealisert aksjegevinst dagen før utflytting; med sikkerhet utsettes betalingen, og etter fem år uten realisasjon bortfaller kravet.</p><p><b>Viktig: dette er ikke gjeldende rett i 2026.</b> Femårsregelen ble opphevet i 2024. Etter dagens regler faller den beregnede utflyttingsskatten <b>ikke</b> bort ved å vente; skattyteren velger mellom å betale straks, å betale i rater over tolv år, eller å betale ved faktisk realisasjon. Lær rutinen fra denne oppgaven, men ikke femårskonklusjonen — i et 2026-sett ville alternativ (a) vært det gale svaret.</p>",
        },
        {
          label: "c",
          points: 0.5,
          body: "<p>Spørsmål 3: Dersom man forutsetter at skatteavtalen med Kypros er anvendelig, vil den beskytte Masse mot at norske skattemyndigheter pålegger utflyttingsskatt på hans urealiserte aksjegevinst ved utflytting?</p>",
          options: [
            "Ja, fordi det er hjemstaten som etter OECDs mønsteravtale som har eksklusiv rett til å skattlegge aksjegevinster.",
            "Ja, men kun for aksjegevinster over kr 10 000 000.",
            "Ja, men kun for aksjegevinster over kr 50 000 000.",
            "Nei, skatteavtalen med Kypros er ikke relevant for den norske utflyttingsskatten, selv om skatteavtalen som sådan er anvendelig, fordi utflyttingsskatten etter norsk lov inntrer dagen før utflyttingstidspunktet (dvs før skatteavtalen får effekt).",
          ],
          answer: 3,
          solution: "<p><b>Kjernen: tidspunktet.</b> Utflyttingsskatten utløses <b>dagen før</b> utflyttingen. På det tidspunktet er Masse fortsatt utelukkende norsk skattyter, og skatteavtalen med Kypros gir ham ingen beskyttelse ennå — den får virkning fra det øyeblikket han er avtalemessig bosatt på Kypros. Skattekravet er altså allerede oppstått når avtalebeskyttelsen begynner. Riktig svar er (d).</p><p>Dette er konstruksjonens hele hensikt: den er utformet slik at avtalen ikke kan brukes til å gjøre den latente gevinsten skattefri. Uten dette grepet ville enhver aksjonær kunne flytte til et land uten gevinstbeskatning, selge dagen etter, og gevinsten som ble opparbeidet i Norge ville aldri bli beskattet noe sted.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a)</b> gjengir hovedregelen i OECDs mønsteravtale art. 13 (7) riktig — hjemstaten har som utgangspunkt eksklusiv beskatningsrett til aksjegevinster — men bruker den på feil tidspunkt. Regelen forutsetter at avtalen gjelder når gevinsten realiseres; her er skatten utløst før avtalen i det hele tatt trådte i kraft for Masse. Dette er det farligste alternativet, fordi premissen er korrekt.<br><b>(b) og (c)</b> oppfinner beløpsgrenser i skatteavtalen. Skatteavtaler fordeler beskatningsrett; de inneholder ikke terskelbeløp av denne typen. Norsk intern rett har riktignok en bagatellgrense for når utflyttingsskatt beregnes, men det er noe helt annet enn en avtalebestemmelse — og den er langt lavere enn 10 mill.</p><p><b>Regelen.</b> En skatteavtale kan bare begrense beskatningsrett den har fått virkning for. Utflyttingsskatt utløses dagen før utflytting, altså før avtalen får effekt, og avtalen beskytter derfor ikke mot den.</p>",
        },
        {
          label: "d",
          points: 0.5,
          body: "<p>Spørsmål 4: Bør Masse kunne anses bosatt på Kypros iht. skattavtalen mellom Norge-Kypros? Forutsett at bostedsklausulen i avtalen tilsvarer bostedsklausulen i OECD sin modellavtale.</p>",
          options: [
            "Ja, han disponerer jo bolig på Kypros.",
            "Ja, han har meldt flytting til Kypros til den norske Skatteetaten.",
            "Nei, han oppholder seg ikke tilstrekkelig mange dager på Kypros.",
            "Nei, sentrum for Masses personlige og økonomiske livsinteresser synes ikke å være lokalisert på Kypros.",
          ],
          answer: 3,
          solution: "<p><b>Problemet.</b> Masse er bosatt i Norge, på Kypros <i>og</i> i Dubai etter de tre landenes interne rett. Det er nettopp den situasjonen skatteavtalens bostedsklausul (OECD art. 4) skal løse: den peker ut <b>ett</b> hjemland ved hjelp av en rangordnet rekke kriterier — den såkalte tie-breaker-stigen.</p><p><b>Stigen, i rekkefølge.</b><br>1. <b>Fast bolig</b> — hvor har han fast bolig til disposisjon? Han har leilighet på Kypros og bor i Dubai; boligen i Norge er solgt. Kriteriet skiller ikke alene.<br>2. <b>Sentrum for livsinteresser</b> — hvor er hans personlige og økonomiske tilknytning sterkest?<br>3. Vanlig opphold.<br>4. Statsborgerskap.<br>5. Gjensidig avtale mellom statene.</p><p><b>Faktum.</b> Masse har ikke vært på Kypros siden januar. Han bor med samboeren i Dubai, venter barn der, har flyttet alle midler til bank i Dubai, arbeider fra kontorer i Dubai og planlegger felles bolig i Dubai. Både den personlige og den økonomiske tyngden peker på Dubai. <b>Sentrum for livsinteresser er ikke på Kypros</b>, og han bør derfor ikke anses bosatt der etter avtalen. Riktig svar er (d).</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a) «Han disponerer jo bolig på Kypros»</b> — bolig er første trinn på stigen, men det avgjør bare når det peker på ett land alene. Her disponerer han bolig i to land, så man går videre til trinn 2. Å stoppe på trinn 1 er den typiske feilen.<br><b>(b) «Han har meldt flytting»</b> — meldingen er ren opplysningsplikt overfor Skatteetaten og har ingen betydning for avtalens bostedskriterier. Norske myndigheter kan uansett ikke bestemme hvor Kypros anser ham bosatt.<br><b>(c) «Han oppholder seg ikke tilstrekkelig mange dager på Kypros»</b> — konklusjonen er riktig, men begrunnelsen er feil trinn på stigen. Dagtelling («vanlig opphold») kommer først på trinn 3, og bare hvis livsinteressekriteriet ikke lot seg avgjøre. Her <i>lot</i> det seg avgjøre. Eksamen belønner at du bruker riktig kriterium, ikke bare at du lander på riktig ja/nei. Dette er det alternativet flest velger feil.</p><p><b>Regelen.</b> Ved dobbelt bosted brukes OECD art. 4-stigen i rekkefølge: fast bolig &rarr; sentrum for livsinteresser &rarr; vanlig opphold &rarr; statsborgerskap &rarr; gjensidig avtale. Man går videre til neste trinn bare når det forrige ikke gir et entydig svar.</p>",
        },
        {
          label: "e",
          points: 1,
          body: "<p>Spørsmål 5: Dersom man legger til grunn at Kypros-avtalen ikke er anvendelig, hva blir da resultatet ift lønnsbeskatning av Masse for 2022?</p>",
          options: [
            "Kun Norge kan beskatte lønnsinntekten.",
            "Både Norge og Kypros kan skattlegge lønnsinntekten iht til sin interne skatterett, uten noen skatteavtalerettslige begrensninger.",
            "Både Norge, Kypros, og de Forente Arabiske Emirater kan skattlegge lønnsinntekten iht til sin interne skatterett, uten noen skatteavtalerettslige begrensninger.",
            "Ingen av landene kan beskatte lønnsinntekten.",
          ],
          answer: 2,
          solution: "<p><b>Resonnementet i tre ledd.</b></p><p>1. <b>Intern rett gir alle tre landene beskatningsrett.</b> Oppgaven forutsetter at Masse anses skattemessig bosatt i Norge, på Kypros og i De forente arabiske emirater etter hvert lands interne regler. Bosted etter intern rett gir globalskatteplikt — hvert av landene kan derfor skattlegge hele lønnen på kr 2,5 mill.<br>2. <b>Hva kan begrense dette?</b> Bare en skatteavtale. En skatteavtale er en folkerettslig begrensning i staters interne beskatningsrett; uten avtale finnes ingen slik begrensning.<br>3. <b>Her er det ingen avtale i spill.</b> Spørsmålet forutsetter at Kypros-avtalen ikke er anvendelig, og oppgaven opplyser at det ikke finnes skatteavtale mellom Norge og Emiratene. Resultatet er <b>trippelbeskatning</b> — alternativ (c).</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a) «Kun Norge»</b> — Norge kan skattlegge, men det er ikke noe som stenger de to andre. En stat kan ikke ensidig frata en annen stat dens interne beskatningsrett.<br><b>(b) «Norge og Kypros»</b> — glemmer Dubai, som oppgaven uttrykkelig sier anser ham bosatt. Alternativet fanger den som leser «ingen avtale med Emiratene» som «Emiratene skattlegger ikke». Det motsatte er tilfellet: <i>fravær</i> av avtale betyr at Emiratene står helt fritt.<br><b>(d) «Ingen av landene»</b> — dobbelt ikke-beskatning oppstår når en unntaksmetode i en avtale fritar inntekten i hjemstaten og kildestaten heller ikke skattlegger. Her er det ingen avtale i det hele tatt, altså ingen unntaksmetode.</p><p><b>Regelen, i én setning.</b> Intern rett skaper beskatningsrett; skatteavtaler begrenser den. Uten avtale er det ingenting som hindrer at samme inntekt skattlegges fullt ut i flere land samtidig.</p><p><b>Skill de tre metodene.</b> <b>Unntaksmetoden:</b> hjemstaten fritar inntekten (helt eller med progresjonsforbehold). <b>Kreditmetoden:</b> hjemstaten skattlegger, men gir fradrag for skatt betalt i kildestaten, begrenset oppad til hjemstatens egen skatt på inntekten. <b>Ingen avtale:</b> ingen lettelse — full dobbelt- eller trippelbeskatning. Kyprosavtalen bruker vanlig kreditmetode, men den er slått av i dette spørsmålet.</p>",
        },
        {
          label: "f",
          points: 1,
          body: "<p>Spørsmål 6: Dersom man legger til grunn at Kypros-avtalen ikke er anvendelig, hva må Masses totalt betale i lønnsskatt for 2022 til de involverte land?</p>",
          options: [
            "Han må betale kr 1 125 000 til Norge, kr 625 000 til Kypros og 375 000 til Emiratene og ingen av landene vil være forpliktet til å gi kredit eller unntak for å forhindre dobbeltbeskatning.",
            "Han betaler kun skatt til Norge inntil hans status som bosatt i Norge etter intern rett opphører, dvs kun kr 1 125 000 til Norge.",
            "Kun det landet der han har oppholdt seg mest i 2022 kan beskatte inntekten, dvs. kr 375 000 skal betales til Emiratene og ikke noe til de to andre landene.",
            "Han skal kun betale lønnsskatt til det landet han har meldt flytting til Skattetaten om, dvs. kr 625 000 til Kypros.",
          ],
          answer: 0,
          solution: "<p>Dette er tallpåhenget til spørsmål 5: konklusjonen er den samme, og her skal den bare regnes ut.</p><p><b>Regnestykket.</b> Lønnen er kr 2 500 000, og hvert land skattlegger hele beløpet etter sin egen sats:</p><table class=\"data\"><tr><th>Land</th><th>Sats</th><th>Skatt</th></tr><tr><td>Norge</td><td class=\"n\">45 %</td><td class=\"n\">1 125 000</td></tr><tr><td>Kypros</td><td class=\"n\">25 %</td><td class=\"n\">625 000</td></tr><tr><td>Emiratene</td><td class=\"n\">15 %</td><td class=\"n\">375 000</td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>85 %</b></td><td class=\"n\"><b>2 125 000</b></td></tr></table><p>Samlet skatt blir kr 2 125 000 av en lønn på kr 2 500 000 — en effektiv sats på <b>85 %</b>. Masse sitter igjen med kr 375 000. Riktig svar er (a).</p><p><b>Hvorfor de andre er gale.</b> Alle tre gale alternativene regner riktig på ett land og lar de to andre falle bort. Feilen ligger ikke i aritmetikken, men i premisset:</p><p><b>(b)</b> lar bare Norge skattlegge. Norsk bosted opphører først i 2026 (spørsmål 1), men det stopper ikke Kypros og Emiratene fra å skattlegge etter <i>sin</i> interne rett i 2022.<br><b>(c)</b> lar oppholdslengden avgjøre. «Der du har vært mest» er et kriterium som bare finnes i skatteavtalenes tie-breaker-stige — og det er nettopp forutsetningen i dette spørsmålet at ingen avtale gjelder.<br><b>(d)</b> lar flyttemeldingen avgjøre. Melding til Skatteetaten fordeler ikke beskatningsrett mellom stater.</p><p><b>Regelen.</b> Uten skatteavtale skattlegger hver bostedsstat hele den globale inntekten etter egen sats, og satsene summeres. Det er nettopp dette skatteavtalene finnes for å hindre.</p><p><b>Kontroll — hva avtalene ville gjort.</b> Med Kyprosavtalen anvendelig og Norge som hjemstat etter <b>kreditmetoden</b> ville Norge gitt fradrag for skatt betalt på Kypros, begrenset til norsk skatt på inntekten: 1 125 000 &minus; 625 000 = 500 000 til Norge, altså 1 125 000 samlet til de to landene i stedet for 1 750 000. Med <b>unntaksmetoden</b> ville Norge fritatt inntekten helt, og bare de 625 000 til Kypros stått igjen. Forskjellen mellom 2 125 000 og 1 125 000 er hele verdien av én skatteavtale.</p>",
        },
        {
          label: "g",
          points: 1,
          body: "<p>Spørsmål 7: Hvis Kyprosavtalen ikke er anvendelig vil Masses utflytting i 2022 trigge utflyttingsskatt for selskapet Max Cash Box AS?</p>",
          options: [
            "Ja, fordi reell ledelse av selskapet skjer i Dubai etter utflyttingstidspunktet.",
            "Ja, fordi daglig leder har meldt flytting til Skatteetaten.",
            "Nei, selv om reell ledelse av selskapet skjer utenfor Norge (i Dubai), vil selskapets status som hjemmehørende i Norge ikke opphøre fordi selskapet var stiftet her og det ikke foreligger skatteavtale mellom Norge og Dubai.",
            "Nei, utflyttingsskatt er kun aktuelt for fysiske personer.",
          ],
          answer: 2,
          solution: "<p>Settets vanskeligste faktaspørsmål. Sensorveiledningen sier selv at det «gir anledning for de beste til å utmerke seg».</p><p><b>Utflyttingsskatt for et selskap forutsetter at selskapet slutter å være hjemmehørende i Norge.</b> Spørsmålet er derfor ikke om ledelsen har flyttet, men om <i>skatteplikten til Norge opphører</i>.</p><p><b>Hjemmehørende-regelen har to alternative innganger:</b><br>1. Selskapet er <b>stiftet i Norge</b> etter norsk selskapsrett, eller<br>2. selskapet har <b>reell ledelse</b> i Norge.</p><p>Er ett av dem oppfylt, er selskapet hjemmehørende her. Max Cash Box AS er stiftet i Norge, og den betingelsen slutter aldri å være oppfylt uansett hvor styremøtene holdes.</p><p><b>Den ene veien ut</b> går gjennom en skatteavtale: et selskap som er stiftet i Norge, anses likevel ikke hjemmehørende her dersom det etter en <b>skatteavtale</b> er hjemmehørende i en annen stat. Her er det ingen skatteavtale mellom Norge og Emiratene. Døren er altså stengt, selskapet forblir hjemmehørende i Norge, og utflyttingsskatt utløses ikke. Riktig svar er (c).</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a) «Ja, fordi reell ledelse skjer i Dubai»</b> — det farligste alternativet, fordi premisset er riktig: styremøtene, kontorene og den daglige ledelsen er i Dubai, og selskapet er også hjemmehørende der etter emiratisk rett. Men reell ledelse i utlandet er ikke <i>nok</i> når selskapet er stiftet i Norge. Stiftelseskriteriet står alene.<br><b>(b) «Ja, fordi daglig leder har meldt flytting»</b> — en persons flyttemelding sier ingenting om selskapets skattemessige bosted. Selskapet og aksjonæren er to skattesubjekter.<br><b>(d) «Nei, utflyttingsskatt er kun for fysiske personer»</b> — riktig konklusjon, feil begrunnelse, og derfor galt. Skatteloven § 10-71 pålegger nettopp utflyttingsskatt for <i>selskaper</i>; det er hele poenget i spørsmål 8. Alternativet fanger den som gjetter «nei» og griper den første begrunnelsen som ser plausibel ut.</p><p><b>Regelen.</b> Et selskap stiftet i Norge er hjemmehørende her uansett hvor ledelsen sitter, med mindre en skatteavtale gjør det hjemmehørende i en annen stat. Uten avtale kan et norskstiftet selskap ikke «flytte ut» skattemessig.</p><p><b>Det paradoksale.</b> Fraværet av skatteavtale, som i spørsmål 5 og 6 var dyrt for Masse personlig (trippelbeskatning), <i>redder</i> selskapet fra en utflyttingsskatt på urealiserte merverdier på kr 1 000 mill. Ville det vært en avtale med Emiratene, kunne selskapet blitt avtalemessig hjemmehørende der, og hele § 10-71-oppgjøret i spørsmål 8 ville blitt utløst.</p>",
        },
        {
          label: "h",
          points: 1,
          body: "<p>Spørsmål 8: Dersom man forutsetter at det blir utflyttingsskatt for selskapet Max Cash Box AS, hva vil det medføre av skattekonsekvenser?</p>",
          options: [
            "Det betyr at selskapet må betale skatt på urealiserte skattemessige merverdier på sine eiendeler på utflyttingstidspunktet, dvs skatt på inntekt på 1 000 mill på selskapsnivå.",
            "Det betyr at aksjonær i selskapet må betale skatt på urealiserte aksjegevinster på utflyttingstidspunktet, dvs skatt på 500 mill på aksjonærnivå.",
            "Det betyr at skatt som beskrevet i både a) og b) inntrer, dvs skatt på både aksjonær- og selskapsnivå.",
            "At kreditmetoden må anvendes.",
          ],
          answer: 2,
          solution: "<p><b>Regelen.</b> Skatteloven § 10-71 behandler utflytting av et selskap som en <b>total realisasjon</b>. Når selskapet slutter å være hjemmehørende i Norge, mister Norge beskatningsretten til alt selskapet eier og til aksjene i det, og alle skatteposisjoner må derfor gjøres opp samtidig — på <b>begge nivåer</b>:</p><p>1. <b>Selskapsnivå:</b> selskapet skattlegges som om alle eiendeler var realisert til virkelig verdi. Her er differansen mellom virkelig verdi og skattemessige verdier oppgitt til <b>kr 1 000 mill</b>, som blir skattepliktig inntekt for selskapet.<br>2. <b>Aksjonærnivå:</b> aksjonærene skattlegges som om aksjene var realisert. Her er den urealiserte aksjegevinsten <b>kr 500 mill</b>.</p><p>Begge inntrer, altså alternativ <b>(c)</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a)</b> tar bare selskapsnivået og glemmer aksjonærene. <b>(b)</b> tar bare aksjonærnivået og glemmer selskapet. Begge er halve svar, og begge er formulert slik at de ser fullstendige ut fordi de siterer et tall fra oppgaven. Når to alternativer hver dekker halve regelen og et tredje sier «begge», er «begge» nesten alltid svaret — det er et gjenkjennelig mønster i dette faget.<br><b>(d) «Kreditmetoden»</b> hører hjemme i lønnsspørsmålene 5 og 6. Kreditmetoden er en teknikk for å lempe dobbeltbeskatning av inntekt beskattet i to land, ikke en konsekvens av utflytting.</p><p><b>Én viktig forskjell fra spørsmål 2.</b> Når <b>aksjonæren</b> flytter ut personlig, gjaldt i 2022 femårsregelen, slik at skatten kunne bortfalle. Når <b>selskapet</b> flytter ut, finnes ingen slik regel: oppgjøret er endelig. Det er en betydelig strengere behandling, og begrunnelsen er at Norge mister beskatningsretten til hele selskapets verdiskaping, ikke bare til én aksjonærs gevinst.</p><p><b>Kontroll på størrelsesordenen.</b> Med 22 % selskapsskatt ville selskapsnivået alene gitt 1 000 mill × 0,22 = <b>220 mill</b> i skatt, og aksjonærnivået med 2022-satsene 500 mill × 1,6 × 0,25 = <b>200 mill</b>. Til sammen rundt 420 mill — som forklarer hvorfor spørsmål 7 er verdt å svare riktig på.</p>"
            + "<p><b>Fasit og lovtekst spriker.</b> Svaret over er kursets fasit, og det er det som har gitt poeng. Lovteksten i skatteloven § 10-71 er i dag smalere: den skattlegger gevinst på <i>selskapets</i> eiendeler som om de var realisert, og bare når selskapet flytter ut av EØS, eller til et lavskatteland i EØS der det ikke er reelt etablert. Aksjonærene nevnes ikke. Se manualen 6.6.</p>",
        },
      ],
    },
    {
      n: 5,
      title: "Martin velger mellom bank og aksjer",
      points: 5,
      topic: "Forventet nytte og tapsaversjon",
      chapters: [17, 18],
      body: "<p>Martin sparer langsiktig. Han vil investere 500 000 og har en investeringshorisont på 20 år. Martin vurderer to alternativ; banksparing eller aksjer. Vi skal vurdere sparealternativene opp mot hverandre. Vi ser bort fra skatt i oppgaven.</p><p>Det første sparealternativet er bankinnskudd. Etter 20 år forventer Martin å sitte igjen med 903 056.</p>",
      parts: [
        {
          label: "a",
          points: 0.5,
          body: "<p>Spørsmål 1: Hvilken årlig avkastning får Martin på bankinnskuddet?</p>",
          options: ["1,0 %", "2,0 %", "3,0 %", "4,0 %"],
          answer: 2,
          solution: "<p><b>Regnestykket.</b> Dette er en ren CAGR: hvilken konstant årlig rente tar 500 000 til 903 056 på 20 år?</p><p>500 000 × (1 + r)<sup>20</sup> = 903 056&nbsp;&rArr;&nbsp;r = (903 056 / 500 000)<sup>1/20</sup> &minus; 1 = 1,806112<sup>0,05</sup> &minus; 1 = 0,03000 = <b>3,0 %</b></p><p><b>Uten kalkulator med potensfunksjon</b> kan du prøve deg fram på alternativene — det er ofte raskere enn å regne bakover, og det er metoden sensorveiledningene selv legger opp til:</p><table class=\"data\"><tr><th>Rente</th><th>500 000 × (1 + r)<sup>20</sup></th></tr><tr><td class=\"n\">1,0 %</td><td class=\"n\">610 095</td></tr><tr><td class=\"n\">2,0 %</td><td class=\"n\">742 974</td></tr><tr><td class=\"n\">3,0 %</td><td class=\"n\"><b>903 056</b></td></tr><tr><td class=\"n\">4,0 %</td><td class=\"n\">1 095 562</td></tr></table><p><b>Hvorfor de andre er gale.</b> Alle tre gir feil sluttverdi, og tabellen over viser med hvor mye. Den vanligste feilen på denne typen er å regne <i>enkel</i> rente i stedet for rentesrente: 403 056/500 000/20 år = 4,03 % per år, som peker mot 4,0 % — det gale alternativet ligger akkurat der. Rentesrenten gjør at den riktige satsen alltid er <b>lavere</b> enn den enkle årlige veksten.</p><p><b>Regelen.</b> CAGR = (sluttverdi / startverdi)<sup>1/T</sup> &minus; 1. Aldri (sluttverdi &minus; startverdi)/startverdi/T.</p><p><b>Kontroll.</b> Tommelfingerregelen med 72: ved 3 % dobler kapitalen seg på 72/3 = 24 år. Her går det 20 år og kapitalen blir 1,81 ganger — litt mindre enn en dobling. Konsistent.</p>",
        },
        {
          label: "b",
          points: 0.5,
          body: "<p>Det andre sparealternativet er aksjer. Dette er et usikkert alternativ, dvs. Martin vet ikke med sikkerhet hva han får igjen om 20 år. Vi beskriver usikkerheten med at to scenarioer kan inntreffe. Enten blir perioden preget av gode tider i økonomien, og det forventes høy avkastning på investeringene, eller så blir det dårlige tider, og det forventes lav avkastning. Hvis det blir gode tider, vil han få 2 330 479 om tjue år, mens ved dårlige tider, vil han få 333 804. Sannsynligheten for scenarioet med gode tider er 40 %, mens sannsynligheten for dårlige tider er 60 %.</p><p>Spørsmål 2: Hvis Martin velger alternativet med aksjer, hva er forventet sluttverdi på investeringen?</p>",
          options: ["1 032 474", "1 132 474", "1 232 474", "1 332 474"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b> Forventet sluttverdi er det sannsynlighetsveide gjennomsnittet av de to utfallene:</p><p>E[W] = 0,40 × 2 330 479 + 0,60 × 333 804 = 932 191,6 + 200 282,4 = <b>1 132 474</b></p><p><b>Hvorfor de andre er gale.</b> De fire alternativene ligger nøyaktig 100 000 fra hverandre, så det finnes ingen snarvei via øyemål — du må regne. To av dem er verdt å kjenne igjen:</p><p><b>1 332 474</b> ligger tett på 0,5 × 2 330 479 + 0,5 × 333 804 = 1 332 142, altså <b>vektene byttet til 50/50</b>. Det er nøyaktig den feilen spørsmål 4 handler om, plassert her som en felle to spørsmål på forskudd.<br><b>1 032 474</b> og <b>1 232 474</b> er ren avstand fra riktig svar; de tilsvarer vekter på omtrent 45/55 og 35/65.</p><p>Merk også at vektene byttet om helt (60 % gode tider) gir 1 531 809, som ikke er blant alternativene — bare den ene retningen av feilen er fanget opp.</p><p><b>Regelen.</b> Forventet verdi = &Sigma; p<sub>i</sub>W<sub>i</sub>. Sannsynlighetene må summere til 1, og du ganger med utfallet, ikke med avkastningen.</p><p><b>Kontroll — hva scenarioene betyr som årlig avkastning.</b> Regn de to utfallene om til CAGR over 20 år:</p><table class=\"data\"><tr><th>Scenario</th><th>Sluttverdi</th><th>Årlig avkastning</th><th>Sannsynlighet</th></tr><tr><td>Gode tider</td><td class=\"n\">2 330 479</td><td class=\"n\">+8,0 %</td><td class=\"n\">40 %</td></tr><tr><td>Dårlige tider</td><td class=\"n\">333 804</td><td class=\"n\">&minus;2,0 %</td><td class=\"n\">60 %</td></tr><tr><td>Bank</td><td class=\"n\">903 056</td><td class=\"n\">+3,0 %</td><td class=\"n\">sikkert</td></tr></table><p>Tallene i oppgaven er altså ikke tilfeldige: aksjer gir 8 % eller &minus;2 % mot bankens sikre 3 %. Forventet sluttverdi 1 132 474 svarer til 4,17 % årlig — en risikopremie på 1,17 prosentpoeng over banken. Det er denne premien resten av oppgaven spør om er stor nok.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Spørsmål 3: Som nevnt må Martin velge mellom å plassere alt i bankinnskudd eller alt i aksjer. Hvilket alternativ velger han? Vi antar at Martin har en nyttefunksjon lik: ln(W), hvor W er sluttverdi.</p>",
          options: [
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,496 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,496 &lt; nytte aksjer 13,714 =&gt; Velger aksjer",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,690 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,690 &lt; nytte aksjer 13,714 =&gt; Velger aksjer",
          ],
          answer: 0,
          solution: "<p><b>Regnestykket.</b> Bankinnskuddet er sikkert, så nytten er bare ln av sluttverdien. Aksjene er usikre, så nytten er <b>forventet nytte</b>: ln beregnes for hvert utfall <i>først</i>, og deretter veies de sammen.</p><p>1. <b>Bank:</b> U = ln(903 056) = <b>13,7135</b><br>2. <b>Aksjer:</b> ln(2 330 479) = 14,6616 og ln(333 804) = 12,7183<br>3. E[U] = 0,40 × 14,6616 + 0,60 × 12,7183 = 5,8646 + 7,6310 = <b>13,4956</b><br>4. 13,714 &gt; 13,496, altså <b>bankinnskudd</b>. Alternativ (a).</p><p><b>Den avgjørende rekkefølgen.</b> Du må ta ln <i>før</i> du tar forventningen, aldri motsatt. Tar du ln av forventet sluttverdi, får du ln(1 132 474) = 13,940, som ville pekt på aksjer. Forskjellen mellom 13,940 og 13,496 er nøyaktig risikoen — Jensens ulikhet i praksis: for en konkav nyttefunksjon er E[ln W] &lt; ln E[W].</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(b)</b> har de to riktige tallene, men byttet om: den påstår at bankens nytte er 13,496. Les hvilket tall som står ved hvilket alternativ før du krysser av — halvparten av de gale alternativene i denne oppgaven er riktige tall på feil plass.<br><b>(c)</b> bruker 13,690 for aksjer. Det er nytten med <b>50/50-sannsynligheter</b>, altså svaret på spørsmål 5, ikke på dette spørsmålet. Konklusjonen (bank) er riktig, men tallet hører til et annet spørsmål — og på et sett med minuspoeng koster det like mye som et helt galt svar.<br><b>(d)</b> kombinerer feil tall og feil konklusjon.</p><p><b>Regelen.</b> En risikoavers investor rangerer alternativer etter <b>forventet nytte</b> E[U(W)] = &Sigma; p<sub>i</sub>U(W<sub>i</sub>), ikke etter forventet formue. Med U = ln W er investoren risikoavers, og et sikkert alternativ kan slå et usikkert med høyere forventet verdi.</p><p><b>Kontroll — regn om til sikkerhetsekvivalent.</b> Det er langt lettere å tolke enn nyttetall. Sikkerhetsekvivalenten er e<sup>E[U]</sup>:</p><p>CE<sub>aksjer</sub> = e<sup>13,4956</sup> = <b>726 228</b> kroner</p><p>Martin er altså likegyldig mellom aksjeporteføljen og 726 228 kroner sikkert. Banken gir 903 056 sikkert, som er 176 828 kroner mer. Valget er ikke i nærheten av å være tett, selv om nyttetallene 13,714 og 13,496 ser like ut. Med log-nytte er sikkerhetsekvivalenten dessuten det <b>geometriske</b> gjennomsnittet: 2 330 479<sup>0,4</sup> × 333 804<sup>0,6</sup> = 726 228. &#10003;</p>",
        },
        {
          label: "d",
          points: 1,
          body: "<p>Et avvik eller en bias fra forventet nytte er at vi estimerer feile sannsynligheter for de ulike scenarioene. Vi sier at vi bruker subjektive istedenfor objektive sannsynligheter.</p><p>Spørsmål 4: La oss anta at Martin vurderer sannsynligheten for høy avkastning til å være 50 %, og sannsynligheten for lav avkastning til å være 50 %. Hva blir sluttverdi for de ulike alternativene?</p>",
          options: [
            "Sluttverdi for aksjer i gode tider er 2 030 479 og sluttverdi i dårlige tider 333 804. Sluttverdi bankinnskudd er 883 056.",
            "Sluttverdi for aksjer i gode tider er 2 330 479 og sluttverdi i dårlige tider 633 804. Sluttverdi bankinnskudd er 903 056.",
            "Sluttverdi for aksjer i gode tider er 2 030 479 og sluttverdi i dårlige tider 633 804. Sluttverdi bankinnskudd er 903 056.",
            "Sluttverdi for aksjer i gode tider er 2 330 479 og sluttverdi i dårlige tider 333 804. Sluttverdi bankinnskudd er 903 056.",
          ],
          answer: 3,
          solution: "<p><b>Poenget.</b> Spørsmålet ser ut som et regnespørsmål, men er et forståelsesspørsmål. <b>Sannsynligheter og utfall er to helt forskjellige ting.</b> Å endre troen på hvor sannsynlig et scenario er, endrer ikke hva verden gir deg <i>i</i> det scenariet. Sluttverdiene er derfor uendret:</p><table class=\"data\"><tr><th>Alternativ</th><th>Utfall</th><th>Sluttverdi</th><th>Ny sannsynlighet</th></tr><tr><td>Aksjer</td><td>Gode tider</td><td class=\"n\">2 330 479</td><td class=\"n\">50 %</td></tr><tr><td>Aksjer</td><td>Dårlige tider</td><td class=\"n\">333 804</td><td class=\"n\">50 %</td></tr><tr><td>Bank</td><td>Sikkert</td><td class=\"n\">903 056</td><td class=\"n\">100 %</td></tr></table><p>Riktig svar er (d) — de opprinnelige tallene, uendret.</p><p><b>Hvorfor de andre er gale.</b> Hvert galt alternativ endrer på ett eller flere av de tre tallene:</p><p><b>(a)</b> senker gode tider til 2 030 479 <i>og</i> banken til 883 056.<br><b>(b)</b> hever dårlige tider til 633 804.<br><b>(c)</b> endrer begge aksjeutfallene.</p><p>Ingen av endringene har noe grunnlag i oppgaveteksten. Bankinnskuddet er dessuten <b>sikkert</b> — det har ikke sannsynligheter i det hele tatt, og kan ikke endres av at Martin skifter mening om konjunkturene. Alternativ (a) endrer nettopp banktallet, og er derfor lettest å eliminere.</p><p><b>Regelen.</b> Subjektive sannsynligheter erstatter de objektive i <i>vektene</i> i forventningen, ikke i <i>utfallene</i>. E[U] = &Sigma; p<sub>i</sub><sup>subj</sup>U(W<sub>i</sub>) — bare p-ene endres.</p><p><b>Hvorfor spørsmålet er stilt.</b> Det rydder grunnen for spørsmål 5: siden utfallene er uendret, er det bare vektene som skifter, og da kan du gjenbruke ln-verdiene 14,6616 og 12,7183 rett fra spørsmål 3. Det sparer to logaritmer.</p>",
        },
        {
          label: "e",
          points: 1,
          body: "<p>Spørsmål 5: Påvirker endringene av sannsynligheter valget mellom bankinnskudd og aksjefond? Vurder nytte for ulike alternativ.</p>",
          options: [
            "Nytte bankinnskudd 13,496 &lt; nytte aksjer 13,690 =&gt; Velger aksjer",
            "Nytte bankinnskudd 13,690 &gt; nytte aksjer 13,496 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,496 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,690 =&gt; Velger bankinnskudd",
          ],
          answer: 3,
          solution: "<p><b>Regnestykket.</b> Bankens nytte er uendret, siden bankinnskuddet er sikkert:</p><p>1. <b>Bank:</b> U = ln(903 056) = <b>13,7135</b><br>2. <b>Aksjer med 50/50:</b> E[U] = 0,50 × 14,6616 + 0,50 × 12,7183 = 7,3308 + 6,3592 = <b>13,6899</b><br>3. 13,714 &gt; 13,690, altså fortsatt <b>bankinnskudd</b>. Alternativ (d).</p><p><b>Svaret på selve spørsmålet.</b> Nei — den optimistiske troen endrer <i>ikke</i> valget, men den er nær ved. Avstanden i nytte krympet fra 0,218 til 0,024, altså til omtrent en tiendedel. Martin trenger bare litt mer optimisme før aksjer vinner: bryteverdien er der 13,7135 = p × 14,6616 + (1 &minus; p) × 12,7183, som gir p = 51,2 %. Ett prosentpoeng til, og konklusjonen snur.</p><p><b>Hvorfor de andre er gale.</b> Alle fire alternativene er bygget av de samme tre tallene — 13,714, 13,690 og 13,496 — satt sammen på ulike måter. Her må du vite hvilket tall som hører til hva:</p><table class=\"data\"><tr><th>Tall</th><th>Hva det er</th></tr><tr><td class=\"n\">13,714</td><td>ln(903 056) — banken, uendret i hele oppgaven</td></tr><tr><td class=\"n\">13,690</td><td>Aksjer med 50/50-sannsynligheter — dette spørsmålet</td></tr><tr><td class=\"n\">13,496</td><td>Aksjer med 40/60-sannsynligheter — spørsmål 3</td></tr></table><p><b>(a)</b> gir banken 13,496 (aksjetallet fra spørsmål 3) og konkluderer med aksjer.<br><b>(b)</b> gir banken 13,690, altså aksjetallet fra dette spørsmålet.<br><b>(c)</b> har riktig banktall, men bruker 13,496 for aksjer — det er svaret på spørsmål 3, ikke på dette. Dette er det mest fristende gale alternativet, siden konklusjonen er riktig.</p><p><b>Regelen.</b> Endrede sannsynligheter flytter bare nytten til det <i>usikre</i> alternativet. Et sikkert alternativ har samme nytte uansett hva du tror om verden.</p><p><b>Kontroll.</b> Sikkerhetsekvivalenten for aksjer stiger fra 726 228 til e<sup>13,6899</sup> = <b>882 000</b>, fortsatt under bankens 903 056. Differansen er nå bare 21 000 kroner mot 177 000 før — samme historie som nyttetallene forteller, men i kroner.</p>",
        },
        {
          label: "f",
          points: 1,
          body: "<p>En investor med tapsaversjon (loss aversion), vil vektlegge tap mer enn gevinst. Med tapsaversjon misliker man scenarioer som gir lavere avkastning enn et referansepunkt. Måten vi her får frem at vi misliker tap på, er at vi multipliserer scenarioer med lavere avkastning enn referansepunktet med en faktor lavere enn 1. Dermed blir de dårlige utfallene enda dårligere og gir dermed lav nytteverdi.</p><p>Anta at Martin vektlegger nytten av tap med 1/1,03=0,970874 (og ikke som vanlig med 1). Vi bruker fremdeles nyttefunksjonen ln(W). Anta at Martin nå bruker de korrekte (objektive) sannsynlighetene. Referansepunktet er initial investering, altså 500 000.</p><p>Spørsmål 6: Hvordan påvirker Martin sin tapsaversjon valget mellom bankinnskudd og aksjefond?</p>",
          options: [
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,496 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,273 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,690 &gt; nytte aksjer 13,273 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,505 =&gt; Velger bankinnskudd",
          ],
          answer: 1,
          solution: "<p><b>Finn først hvilke utfall som er «tap».</b> Referansepunktet er den opprinnelige investeringen på 500 000. Gå gjennom de tre utfallene:</p><table class=\"data\"><tr><th>Utfall</th><th>Sluttverdi</th><th>Mot 500 000</th><th>Vekt på nytten</th></tr><tr><td>Aksjer, gode tider</td><td class=\"n\">2 330 479</td><td>Gevinst</td><td class=\"n\">1</td></tr><tr><td>Aksjer, dårlige tider</td><td class=\"n\">333 804</td><td><b>Tap</b></td><td class=\"n\">0,970874</td></tr><tr><td>Bank</td><td class=\"n\">903 056</td><td>Gevinst</td><td class=\"n\">1</td></tr></table><p>Bare ett utfall er et tap. Bankinnskuddet berøres derfor <b>ikke</b> av tapsaversjonen — dette er hele nøkkelen til spørsmålet.</p><p><b>Regnestykket.</b> Sannsynlighetene er tilbake til de objektive 40/60:</p><p>1. <b>Bank:</b> U = ln(903 056) = <b>13,7135</b> (uendret)<br>2. <b>Aksjer:</b> E[U] = 0,40 × ln(2 330 479) + 0,60 × 0,970874 × ln(333 804)<br>&nbsp;&nbsp;&nbsp;= 0,40 × 14,6616 + 0,60 × 0,970874 × 12,7183<br>&nbsp;&nbsp;&nbsp;= 5,8646 + 7,4087 = <b>13,2734</b><br>3. 13,714 &gt; 13,273, altså <b>bankinnskudd</b> — nå med god margin. Alternativ (b).</p><p>Merk hvordan straffen virker: det dårlige utfallets bidrag faller fra 7,6310 til 7,4087, altså med 0,2223. Det er nøyaktig differansen mellom aksjenyttene 13,496 og 13,273.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a)</b> bruker 13,496 for aksjer — nytten <i>uten</i> tapsaversjon, altså svaret på spørsmål 3. Tapsaversjonen er ikke anvendt i det hele tatt.<br><b>(c)</b> bruker 13,690 for banken. Det er aksjetallet fra spørsmål 5, og dessuten er banken uendret på 13,714 gjennom hele oppgaven. Alle fire alternativene sier «velger bankinnskudd», så konklusjonen kan ikke brukes til å skille — bare tallene kan.<br><b>(d)</b> bruker 13,505 for aksjer. Det er verken 13,496 eller 13,273, men ligger tett på det første. Slik ser det ut hvis du bare straffer en liten del av det dårlige utfallet, eller ganger med 0,970874 ett sted for lite.</p><p><b>Regelen.</b> Tapsaversjon vekter nytten av utfall <i>under referansepunktet</i> ekstra tungt. Utfall over referansepunktet — og alle sikre alternativer over det — er uberørt. Man må derfor alltid begynne med å avgjøre hvilke utfall som ligger under referansen.</p><p><b>Kontroll.</b> Sikkerhetsekvivalenten for aksjer faller til e<sup>13,2734</sup> = <b>581 495</b> kroner, mot 726 228 uten tapsaversjon. Martin krever altså 145 000 kroner mer for å bære det samme dårlige utfallet når han er tapsavers.</p><p><b>Historien gjennom oppgave 5.</b> Bank vinner i alle tre variantene, men med svært ulik margin:</p><table class=\"data\"><tr><th>Variant</th><th>Nytte bank</th><th>Nytte aksjer</th><th>Margin</th><th>CE aksjer</th></tr><tr><td>Objektive 40/60 (sp. 3)</td><td class=\"n\">13,714</td><td class=\"n\">13,496</td><td class=\"n\">0,218</td><td class=\"n\">726 228</td></tr><tr><td>Subjektive 50/50 (sp. 5)</td><td class=\"n\">13,714</td><td class=\"n\">13,690</td><td class=\"n\">0,024</td><td class=\"n\">882 000</td></tr><tr><td>Tapsaversjon (sp. 6)</td><td class=\"n\">13,714</td><td class=\"n\">13,273</td><td class=\"n\">0,441</td><td class=\"n\">581 495</td></tr></table><p>Optimisme nesten snur valget; tapsaversjon dobler avstanden i motsatt retning. Det er hele pensumpoenget: atferdsavvikene trekker i hver sin retning og kan begge forklare hvorfor folk holder for lite eller for mye aksjer.</p>",
        },
      ],
    },
    {
      n: 6,
      title: "Bilkjøp med annuitetslån",
      points: 3,
      topic: "Annuitetslån og effektiv rente",
      chapters: [16],
      body: "<p>Vi skal nå vurdere et bilkjøp. Bilen koster 500 000. Av bilselger blir du tilbudt et annuitetslån på 400 000. Nominell renten er 4,99 % og løpetid er 5 år. Vi ser bort fra skatt i oppgaven. Tilbakebetaling skjer etterskuddsvis en gang pr år. Annuiteten er gitt ved følgende formel A der r er nominell rente og T er antall år:</p><p style=\"text-align:center\">A = L · r / (1 &minus; (1 + r)<sup>&minus;T</sup>)</p><p><i>[Merknad: formelen er et bilde i kildefila. Uttrykket over er standard annuitetsformel og gir fasitens tall.]</i></p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Spørsmål 1: Hva er årlig tilbakebetaling?</p>",
          options: ["101 815", "94 322", "80 000", "92 364"],
          answer: 3,
          solution: "<p><b>Regnestykket.</b> L = 400 000, r = 4,99 %, T = 5:</p><p>1. (1 + r)<sup>&minus;T</sup> = 1,0499<sup>&minus;5</sup> = 0,784013<br>2. Nevneren: 1 &minus; 0,784013 = 0,215987<br>3. Telleren: 400 000 × 0,0499 = 19 960<br>4. A = 19 960 / 0,215987 = <b>92 364</b> kroner i året</p><p><b>Hvorfor de andre er gale.</b></p><p><b>80 000</b> = 400 000 / 5. Dette er avdragene alene — rentene er glemt helt. Alternativet er verdt å kjenne igjen som en <b>nedre grense</b>: en annuitet må alltid være større enn lånet delt på antall år, siden den også skal dekke renter. Alt under 80 000 kan strykes umiddelbart.<br><b>94 322</b> svarer til en annuitet på 400 000 over fem år med rente rundt <b>5,75 %</b>. Det er feilen å legge gebyrene inn i renten før man i det hele tatt er spurt om dem — gebyrene kommer først i spørsmål 2.<br><b>101 815</b> svarer til rente rundt <b>8,6 %</b> over samme lån og løpetid. Et for høyt tall som fanger den som ganger opp i stedet for å neddiskontere, eller som setter T feil.</p><p><b>Regelen.</b> A = L·r / (1 &minus; (1 + r)<sup>&minus;T</sup>). Annuiteten er lånet delt på annuitetsfaktoren, og annuitetsfaktoren her er 0,215987/0,0499 = 4,3284 — nåverdien av 1 krone i året i fem år ved 4,99 %.</p><p><b>Kontroll — sett opp nedbetalingsplanen.</b> Restgjelden skal treffe null nøyaktig i år 5:</p><table class=\"data\"><tr><th>År</th><th>Termin&shy;beløp</th><th>Renter</th><th>Avdrag</th><th>Restgjeld</th></tr><tr><td>0</td><td class=\"n\">&mdash;</td><td class=\"n\">&mdash;</td><td class=\"n\">&mdash;</td><td class=\"n\">400 000</td></tr><tr><td>1</td><td class=\"n\">92 364</td><td class=\"n\">19 960</td><td class=\"n\">72 404</td><td class=\"n\">327 596</td></tr><tr><td>2</td><td class=\"n\">92 364</td><td class=\"n\">16 347</td><td class=\"n\">76 017</td><td class=\"n\">251 578</td></tr><tr><td>3</td><td class=\"n\">92 364</td><td class=\"n\">12 554</td><td class=\"n\">79 811</td><td class=\"n\">171 768</td></tr><tr><td>4</td><td class=\"n\">92 364</td><td class=\"n\">8 571</td><td class=\"n\">83 793</td><td class=\"n\">87 974</td></tr><tr><td>5</td><td class=\"n\">92 364</td><td class=\"n\">4 390</td><td class=\"n\">87 974</td><td class=\"n\"><b>0</b></td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>461 822</b></td><td class=\"n\"><b>61 822</b></td><td class=\"n\"><b>400 000</b></td><td class=\"n\"></td></tr></table><p>Terminbeløpet er konstant, mens rentedelen faller og avdragsdelen stiger — det er selve definisjonen på et annuitetslån, og skillet mot et serielån, der avdraget er konstant og terminbeløpet faller. Legg merke til rentesummen 61 822: den kommer tilbake som feilalternativ i spørsmål 3.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>I spørsmål 1 er det ikke tatt hensyn til gebyrer. De vanligste gebyrer ved lån er etableringsgebyr og termingebyr. Etableringsgebyr betales samtidig med utbetaling av lån. I dette tilfellet er etableringsgebyret på 5 990. Termingebyr er et gebyr som betales ved hver tilbakebetaling. Det skjer etterskuddsvis en gang i året. Termingebyret er på 1 020.</p><p>Spørsmål 2: Hva er ny effektiv rente? Effektiv rente finner du ved å sette opp kontantstrømmen og regne internrente til kontantstrømmen til lånet.</p>",
          options: ["4,99%", "5,44%", "5,94%", "6,44%"],
          answer: 2,
          solution: "<p><b>Sett opp kontantstrømmen fra låntakerens side.</b> Det er to gebyrer, og de virker på hver sin måte:</p><p>1. <b>Etableringsgebyret</b> på 5 990 betales ved utbetaling, altså i år 0. Låntakeren får derfor bare <b>394 010</b> netto i hånden, ikke 400 000.<br>2. <b>Termingebyret</b> på 1 020 betales sammen med hver termin. Årlig utbetaling blir <b>92 364 + 1 020 = 93 384</b>.</p><table class=\"data\"><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><td>Kontantstrøm</td><td class=\"n\">+394 010</td><td class=\"n\">&minus;93 384</td><td class=\"n\">&minus;93 384</td><td class=\"n\">&minus;93 384</td><td class=\"n\">&minus;93 384</td><td class=\"n\">&minus;93 384</td></tr></table><p>3. <b>Effektiv rente er internrenten</b> til denne strømmen — den r som gjør nåverdien null:</p><p>394 010 = 93 384 × (1 &minus; (1 + r)<sup>&minus;5</sup>) / r&nbsp;&rArr;&nbsp;r = <b>5,94 %</b></p><p><b>Slik finner du den på eksamen.</b> Internrenten kan ikke løses eksplisitt, så prøv alternativene med annuitetsformelen baklengs. Ved 5,94 % er annuitetsfaktoren 4,2192, og 394 010/4,2192 = 93 384 &#10003;. Ved 4,99 % blir den 394 010/4,3284 = 91 030, som er for lite. Én prøve på hvert alternativ er raskere enn å iterere.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>4,99 %</b> er den nominelle renten — svaret til den som ikke gjør noe med gebyrene i det hele tatt. Effektiv rente er per definisjon høyere enn nominell rente når det finnes gebyrer.<br><b>5,44 %</b> er svaret til den som bare tar med <i>ett</i> av gebyrene. Regner du bare med termingebyret, får du 5,39 %; bare etableringsgebyret gir 5,54 %. Begge må med, og de gir 5,94 % til sammen.<br><b>6,44 %</b> er nøyaktig 5,94 % + 0,5 pp — et overskudd som fanger den som legger gebyrene på som en enkel prosentandel av lånet i stedet for å neddiskontere dem. Merk at de fire alternativene ligger med 0,45–0,5 pp mellomrom, så øyemål hjelper ikke.</p><p><b>Regelen.</b> Effektiv rente = internrenten til den faktiske kontantstrømmen. Etableringsgebyr trekkes fra beløpet du mottar i år 0; termingebyr legges til hver innbetaling. Alle gebyrer skal med — det er hele hensikten med begrepet.</p><p><b>Kontroll på størrelsesordenen.</b> Samlede gebyrer er 5 990 + 5 × 1 020 = 11 090 kroner over fem år, altså rundt 2 218 i året på en gjennomsnittlig restgjeld på cirka 230 000. Det er omtrent 0,96 prosentpoeng — og 4,99 % + 0,95 = 5,94 %. Overslaget treffer nøyaktig.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Kredittkostnader er alle kostnader, herunder stiftelseskostnader, renter, løpende provisjoner og alle andre kostnader, som forbrukeren skal betale for kreditten. Det er ikke vanlig å ta hensyn til tidsverdien av penger, dvs man bare summerer beløpene over tid.</p><p>Spørsmål 3: Hva er kredittkostnad for lånet?</p>",
          options: ["61 822", "472 912", "5 100", "72 912"],
          answer: 3,
          solution: "<p><b>Definisjonen først.</b> Kredittkostnaden er <b>alt du betaler minus det du fikk låne</b>, uten diskontering. Oppgaveteksten sier det eksplisitt: beløpene summeres bare over tid.</p><p><b>Regnestykket.</b></p><p>1. Sum terminbeløp: 5 × 92 364,38 = <b>461 822</b><br>2. Sum termingebyr: 5 × 1 020 = <b>5 100</b><br>3. Etableringsgebyr: <b>5 990</b><br>4. Sum betalt: 461 822 + 5 100 + 5 990 = <b>472 912</b><br>5. Kredittkostnad = 472 912 &minus; 400 000 = <b>72 912</b> kroner</p><p><b>Kontroll — regn den andre veien.</b> Kredittkostnaden er også renter pluss gebyrer, siden avdragene bare er tilbakebetaling av det du fikk:</p><p>61 822 (renter, fra nedbetalingsplanen i spørsmål 1) + 5 100 (termingebyr) + 5 990 (etableringsgebyr) = <b>72 912</b> &#10003;</p><p><b>Presisjonsmerknad.</b> Bruker du den avrundede annuiteten 92 364 i stedet for 92 364,38, blir summen 72 910. Fasitens 72 912 forutsetter uavrundet annuitet gjennom hele regnestykket. Regn med alle desimaler helt til slutt — det er samme fallgruve som i flere andre sett i dette kurset.</p><p><b>Hvorfor de andre er gale — og legg merke til at alle tre er ekte mellomresultater:</b></p><table class=\"data\"><tr><th>Alternativ</th><th>Hva det faktisk er</th><th>Hva som mangler</th></tr><tr><td class=\"n\">61 822</td><td>Rentene alene: 5 × 92 364,38 &minus; 400 000</td><td>Begge gebyrene, til sammen 11 090</td></tr><tr><td class=\"n\">5 100</td><td>Termingebyrene alene: 5 × 1 020</td><td>Renter og etableringsgebyr</td></tr><tr><td class=\"n\">472 912</td><td>Sum av alt som betales inn</td><td>De 400 000 du fikk låne er ikke trukket fra</td></tr></table><p><b>472 912</b> er den farligste: den er nøyaktig riktig sum, men glemmer det siste steget. <b>61 822</b> fanger den som setter likhetstegn mellom «kredittkostnad» og «renter» — og det er nettopp derfor definisjonen står i oppgaveteksten.</p><p><b>Regelen.</b> Kredittkostnad = sum av alle innbetalinger &minus; lånebeløpet, udiskontert. Effektiv rente svarer på det samme spørsmålet <i>med</i> tidsverdi; kredittkostnaden er kroneversjonen uten. De to tallene skal aldri blandes.</p><p><b>I kroner og øre.</b> Bilen koster 500 000. Med 100 000 i egenkapital og dette lånet betaler du 472 912 over fem år for de resterende 400 000 — 72 912 kroner, eller 18,2 % av lånebeløpet, i ren lånekostnad.</p>",
        },
      ],
    },
    {
      n: 7,
      title: "Jonas, Merton og humankapitalen",
      points: 5,
      topic: "Merton og humankapital",
      chapters: [14],
      body: "<p>Jonas kan velge mellom et globalt diversifisert aksjefond (heretter kalt aksjer) og bankinnskudd. Aksjer representerer risikabel investering, mens bankinnskudd representerer en risikofri investering. Gitt en del forutsetninger vil følgende formel angi optimal allokering mellom aksjer og bankinnskudd:</p><p style=\"text-align:center\">w = (E(R) &minus; R<sub>f</sub>) / (&gamma; · &sigma;<sup>2</sup>)</p><p>w er andel av totalformue i aksjer.</p><p>Vi antar at parameterne i formelen har følgende verdier:</p><table class=\"data\"><tr><th>Parameter</th><th>Verdi</th></tr><tr><td>Aksjepremie, E(R) &minus; R<sub>f</sub></td><td class=\"n\">4 %</td></tr><tr><td>Risikoaversjon, &gamma;</td><td class=\"n\">2</td></tr><tr><td>Volatilitet, &sigma;</td><td class=\"n\"></td></tr></table><p><i>[Merknad: cellen for volatilitet er tom i kildefila. Fasitens svar på spørsmål 1 forutsetter &sigma; = 20 %, siden 4 %/(2 × 20 %²) = 50 %. Oppgavens overskrift sier «maks 4 poeng», men delspørsmålene summerer til 5, og poengoversikten bakerst i sensorveiledningen sier 5 poeng. 5 er brukt her.]</i></p>",
      parts: [
        {
          label: "a",
          points: 0.5,
          body: "<p>Spørsmål 1: Regn ut optimal andel av totalformue investert i aksjer, dvs. finn w?</p>",
          options: ["33,3 %", "50 %", "66,7 %", "100 %"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b> Mertons formel med &sigma; = 20 %:</p><p>1. Nevneren: &gamma; · &sigma;² = 2 × (0,20)² = 2 × 0,04 = <b>0,08</b><br>2. w = 0,04 / 0,08 = <b>0,50 = 50 %</b></p><p><b>Fellen som ligger i nevneren.</b> Det er <b>variansen</b> &sigma;², ikke standardavviket &sigma;, som står i formelen. Bruker du 0,20 i stedet for 0,04, får du 0,04/(2 × 0,20) = 10 % — et helt annet svar. Kvadrer alltid volatiliteten før du deler.</p><p><b>Hvorfor de andre er gale.</b> Ingen av dem lar seg regne fram med de oppgitte parameterne. De er de fire faste svaralternativene som går igjen i hele oppgave 7 (33,3 %, 50 %, 66,7 %, 100 %) — det er samme liste i spørsmål 1, 4 og 6, slik at et riktig svar ett sted er et galt svar et annet. <b>66,7 %</b> og <b>100 %</b> er svarene på spørsmål 6 og 4; <b>33,3 %</b> er bankandelen i spørsmål 6.</p><p><b>Regelen.</b> w* = (&mu; &minus; r<sub>f</sub>) / (&gamma;&sigma;²): optimal aksjeandel av <b>totalformuen</b> stiger med risikopremien og faller med risikoaversjon og varians. Formelen sier ingenting om <i>hvor</i> formuen ligger — bare hvor stor andel av alt du eier som skal ha aksjerisiko. Det skillet er hele resten av oppgaven.</p><p><b>Kontroll.</b> Doble risikoaversjonen til &gamma; = 4, og andelen skal halveres: 0,04/(4 × 0,04) = 25 %. Doble volatiliteten til 40 %, og andelen skal falle til en fjerdedel: 0,04/(2 × 0,16) = 12,5 %. Begge stemmer med formelens struktur.</p>",
        },
        {
          label: "b",
          points: 0.5,
          body: "<p>Anta at Jonas har 2000' i finansiell formue. Finansiell formue er i dette eksemplet altså summen av aksjer og bankinnskudd. Det er hans eneste eiendeler. Han har ingen forpliktelser.</p><p>Spørsmål 2: Hvis han følger rådet fra formelen over, hvor stort beløp skal han investere i aksjer?</p>",
          options: ["500'", "1000'", "1500'", "2000'"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b> Her er finansiell formue Jonas' <i>eneste</i> eiendel, så totalformue = finansiell formue = 2 000′.</p><p>Aksjer = w × totalformue = 50 % × 2 000′ = <b>1 000′</b></p><p><b>Balansen.</b></p><table class=\"data\"><tr><th>Eiendeler</th><th>Beløp</th><th>Forpliktelser og egenkapital</th><th>Beløp</th></tr><tr><td>Aksjer</td><td class=\"n\">1 000′</td><td>Netto formue</td><td class=\"n\">2 000′</td></tr><tr><td>Bankinnskudd</td><td class=\"n\">1 000′</td><td></td><td class=\"n\"></td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>2 000′</b></td><td><b>Sum</b></td><td class=\"n\"><b>2 000′</b></td></tr></table><p><b>Hvorfor de andre er gale.</b> <b>500′</b> er 25 % av formuen, altså w halvert en gang for mye. <b>1 500′</b> er 75 %. <b>2 000′</b> er alt i aksjer, som ville krevd w = 100 % — det blir riktig svar i spørsmål 3, men bare fordi formuen der er dobbelt så stor.</p><p><b>Regelen.</b> Beløp i aksjer = w × totalformue. Så lenge det ikke finnes andre eiendeler, er finansiell formue og totalformue det samme, og &alpha; = w. Dette spørsmålet finnes for å etablere <i>utgangspunktet</i> — hele poenget kommer når humankapitalen tas inn i neste spørsmål.</p><p><b>Kontroll.</b> 1 000′ i aksjer og 1 000′ i bank gir en aksjeandel på 1 000/2 000 = 50 % = w. &#10003;</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Anta nå at vi i tillegg til finansielle eiendeler tar med Jonas sin humankapital. Den er per i dag på 2000'. Videre antar vi at den er risikofri. Det kan selvsagt diskuteres om dette er en rimelig antagelse, men vi lar den diskusjonen ligge for nå. Vi kan dermed se på humankapitalen til Jonas som et bankinnskudd. Vi antar fremdeles at Jonas har samme markedssyn, dvs. han vil beholde samme andel av totalformue i aksjer som tidligere funnet.</p><p>Spørsmål 3: Hvor mye skal han nå investere i aksjer?</p>",
          options: ["500'", "1000'", "1500'", "2000'"],
          answer: 3,
          solution: "<p>Dette er kjernen i hele oppgave 7, og et av kursets viktigste enkeltpoeng.</p><p><b>Regnestykket i tre steg.</b></p><p>1. <b>Utvid formuesbegrepet.</b> Totalformue = finansiell formue + humankapital = 2 000′ + 2 000′ = <b>4 000′</b>.<br>2. <b>Behold samme w.</b> Aksjer skal utgjøre 50 % av totalformuen: 0,50 × 4 000′ = <b>2 000′</b>.<br>3. <b>Sjekk om det er gjennomførbart.</b> Han har 2 000′ i finansiell formue, så 2 000′ i aksjer betyr at <i>hele</i> den finansielle formuen står i aksjer og bankinnskuddet er null. Det går akkurat opp — uten giring.</p><p><b>Balansen.</b></p><table class=\"data\"><tr><th>Eiendeler</th><th>Beløp</th><th>Forpliktelser og egenkapital</th><th>Beløp</th></tr><tr><td>Aksjer</td><td class=\"n\">2 000′</td><td>Netto formue</td><td class=\"n\">4 000′</td></tr><tr><td>Bankinnskudd</td><td class=\"n\">0</td><td></td><td class=\"n\"></td></tr><tr><td>Humankapital (implisitt bankinnskudd)</td><td class=\"n\">2 000′</td><td></td><td class=\"n\"></td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>4 000′</b></td><td><b>Sum</b></td><td class=\"n\"><b>4 000′</b></td></tr></table><p><b>Intuisjonen.</b> Humankapitalen er antatt risikofri og virker derfor som et stort bankinnskudd du ikke kan røre. Den risikofrie delen av formuen er allerede dekket av jobben. For å nå 50 % aksjerisiko på <i>hele</i> formuen må derfor hele den finansielle formuen inn i aksjer. Dette er hele begrunnelsen for at unge sparere bør ha høyere aksjeandel enn eldre: den risikofrie humankapitalen er størst når du er ung.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>1 000′</b> er svaret fra spørsmål 2 — altså å ignorere humankapitalen helt. Dette er den feilen spørsmålet er laget for å avdekke.<br><b>1 500′</b> = 50 % × 3 000′, altså å telle med bare halve humankapitalen. Noen kommer hit ved å blande sammen totalformue og finansiell formue underveis.<br><b>500′</b> er en fjerdedel av den finansielle formuen og har ingen tolkning her.</p><p><b>Regelen.</b> Mertons w gjelder <b>totalformuen</b>, humankapital inkludert. Er humankapitalen risikofri, teller den som bankinnskudd, og den finansielle porteføljen må vris mot aksjer for å kompensere: beløp i aksjer = w × (F + H), begrenset oppad av F med mindre du kan låne.</p><p><b>Kontroll — hvor grensen går.</b> Var humankapitalen 3 000′, ville formelen kreve 0,5 × 5 000′ = 2 500′ i aksjer, altså mer enn de 2 000′ han har. Da måtte han <b>låne</b> 500′ for å nå målet. Formelen sier hva som er optimalt, ikke hva som er mulig.</p>",
        },
        {
          label: "d",
          points: 1,
          body: "<p>Spørsmål 4: Vi definerer &alpha; som andel i aksjer av finansiell formue. Hva er &alpha; for alternativet i spørsmål 3?</p>",
          options: ["33,3 %", "50 %", "66,7 %", "100 %"],
          answer: 3,
          solution: "<p><b>Skill de to andelene.</b> Oppgaven innfører nå et andre begrep, og resten av oppgave 7 handler om forskjellen:</p><table class=\"data\"><tr><th>Symbol</th><th>Definisjon</th><th>Nevner</th></tr><tr><td>w</td><td>Andel av <b>totalformuen</b> i aksjer</td><td>Finansiell formue + humankapital</td></tr><tr><td>&alpha;</td><td>Andel av <b>finansiell formue</b> i aksjer</td><td>Bare finansiell formue</td></tr></table><p><b>Regnestykket.</b> Fra spørsmål 3: aksjer 2 000′, finansiell formue 2 000′.</p><p>&alpha; = 2 000′ / 2 000′ = <b>100 %</b></p><p>Hele den finansielle formuen står i aksjer, og bankinnskuddet er null: (1 &minus; &alpha;) = 0 %.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>50 %</b> er w, ikke &alpha;. Dette er det klart mest fristende gale alternativet: den som ikke har lest definisjonen nøye, svarer med tallet fra spørsmål 1. Det er nettopp forskjellen mellom w og &alpha; spørsmålet måler.<br><b>66,7 %</b> er &alpha; i spørsmål 6, altså riktig begrep men feil tidspunkt.<br><b>33,3 %</b> er bankandelen (1 &minus; &alpha;) i spørsmål 6.</p><p><b>Regelen — sammenhengen mellom de to.</b> Med risikofri humankapital H og finansiell formue F:</p><p>&alpha; = w × (F + H) / F = w × (1 + H/F)</p><p>Her: 0,50 × (1 + 2 000/2 000) = 0,50 × 2 = <b>100 %</b>. &#10003; &alpha; er alltid <b>større enn eller lik</b> w når humankapitalen er risikofri og positiv, og de er like bare når H = 0.</p><p><b>Kontroll.</b> I spørsmål 2, uten humankapital, var H/F = 0 og &alpha; = w × 1 = 50 %. Formelen gjengir begge situasjonene riktig.</p>",
        },
        {
          label: "e",
          points: 1,
          body: "<p>Anta nå at det går 10 år. Humankapitalen er redusert til 1000', mens finansielle eiendeler har økt til 3000'. Humankapitalen er fremdeles risikofri. Vi antar at Jonas har samme markedssyn, dvs. vil beholde samme andel av totalformue i aksjer som tidligere funnet.</p><p>Spørsmål 5: Hvor stort beløp skal han nå investere i aksjer?</p>",
          options: ["500'", "1000'", "1500'", "2000'"],
          answer: 3,
          solution: "<p><b>Regnestykket.</b></p><p>1. <b>Totalformue:</b> 3 000′ (finansiell) + 1 000′ (humankapital) = <b>4 000′</b>. Legg merke til at den er <i>uendret</i> fra spørsmål 3 — humankapitalen har blitt til finansiell formue etter hvert som han har jobbet og spart.<br>2. <b>Aksjer:</b> 0,50 × 4 000′ = <b>2 000′</b>. Også uendret.<br>3. <b>Bankinnskudd:</b> 3 000′ &minus; 2 000′ = 1 000′.</p><p><b>Balansen.</b></p><table class=\"data\"><tr><th>Eiendeler</th><th>Beløp</th><th>Forpliktelser og egenkapital</th><th>Beløp</th></tr><tr><td>Aksjer</td><td class=\"n\">2 000′</td><td>Netto formue</td><td class=\"n\">4 000′</td></tr><tr><td>Bankinnskudd</td><td class=\"n\">1 000′</td><td></td><td class=\"n\"></td></tr><tr><td>Humankapital (implisitt bankinnskudd)</td><td class=\"n\">1 000′</td><td></td><td class=\"n\"></td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>4 000′</b></td><td><b>Sum</b></td><td class=\"n\"><b>4 000′</b></td></tr></table><p><b>Hvorfor de andre er gale.</b></p><p><b>1 500′</b> = 50 % × 3 000′, altså w brukt på finansiell formue alene. Dette er den samme feilen som i spørsmål 3, bare med nye tall — og den er lettere å gjøre nå, fordi 3 000′ er et fristende «totalbeløp». Det er nettopp forskjellen mellom w og &alpha; oppgaven har brukt to spørsmål på å etablere.<br><b>1 000′</b> = 25 % av totalformuen, eller bankbeholdningen forvekslet med aksjebeholdningen.<br><b>500′</b> har ingen tolkning i denne balansen.</p><p><b>Regelen.</b> Kroneandelen i aksjer avhenger bare av <b>totalformuen</b> og w. Når humankapitalen omdannes til finansiell formue krone for krone, endres ikke aksjebeløpet i det hele tatt — bare hvordan resten er plassert.</p><p><b>Poenget for livsløpssparing.</b> Kroneandelen er stabil, men <i>andelen av porteføljen</i> faller: fra 100 % til 66,7 % (spørsmål 6). Det er den klassiske livssyklusanbefalingen — høy aksjeandel når du er ung og humankapitalen er stor, fallende med alderen — og her kommer den ut av Mertons formel uten noen tommelfingerregel om «110 minus alder».</p><p><b>Kontroll.</b> Den risikofrie delen av totalformuen er 1 000′ i bank + 1 000′ humankapital = 2 000′, altså 50 % av 4 000′. Aksjene er de andre 50 %. &#10003;</p>",
        },
        {
          label: "f",
          points: 1,
          body: "<p>Spørsmål 6: Hva er andel i aksjer av finansiell formue, dvs. &alpha;?</p>",
          options: ["33,3 %", "50 %", "66,7 %", "100 %"],
          answer: 2,
          solution: "<p><b>Regnestykket.</b> Fra spørsmål 5: aksjer 2 000′, finansiell formue 3 000′.</p><p>&alpha; = 2 000′ / 3 000′ = 0,6667 = <b>66,7 %</b>, og bankandelen (1 &minus; &alpha;) = 1 000′/3 000′ = <b>33,3 %</b>.</p><p><i>Merk at sensorveiledningen skriver «33,7 % i bankinnskot» her. Det er en skrivefeil: 100 % &minus; 66,7 % = 33,3 %. Riktig svaralternativ (66,7 %) er ikke berørt.</i></p><p><b>Kontroll med formelen.</b> &alpha; = w × (1 + H/F) = 0,50 × (1 + 1 000/3 000) = 0,50 × 1,3333 = <b>66,7 %</b>. &#10003;</p><p><b>Hvorfor de andre er gale.</b></p><p><b>100 %</b> er &alpha; fra spørsmål 4, altså ti år tidligere. Den som ikke oppdaterer H/F-forholdet, blir stående igjen der.<br><b>50 %</b> er w — andelen av totalformuen, ikke av den finansielle. Samme forveksling som i spørsmål 4.<br><b>33,3 %</b> er <b>bankandelen</b>, altså 1 &minus; &alpha;. Dette er den farligste: tallet er riktig regnet, men svarer på det motsatte spørsmålet. Les alltid om det spørres om aksjeandelen eller om resten.</p><p><b>Oppsummering av hele oppgave 7 i én tabell.</b></p><table class=\"data\"><tr><th>Situasjon</th><th>Finansiell F</th><th>Human H</th><th>Total</th><th>Aksjer</th><th>w</th><th>&alpha;</th></tr><tr><td>Sp. 2 — uten humankapital</td><td class=\"n\">2 000′</td><td class=\"n\">0</td><td class=\"n\">2 000′</td><td class=\"n\">1 000′</td><td class=\"n\">50 %</td><td class=\"n\">50 %</td></tr><tr><td>Sp. 3–4 — med humankapital</td><td class=\"n\">2 000′</td><td class=\"n\">2 000′</td><td class=\"n\">4 000′</td><td class=\"n\">2 000′</td><td class=\"n\">50 %</td><td class=\"n\">100 %</td></tr><tr><td>Sp. 5–6 — ti år senere</td><td class=\"n\">3 000′</td><td class=\"n\">1 000′</td><td class=\"n\">4 000′</td><td class=\"n\">2 000′</td><td class=\"n\">50 %</td><td class=\"n\">66,7 %</td></tr></table><p><b>Regelen, i én setning.</b> w er konstant fordi markedssynet og risikoaversjonen er konstante; &alpha; = w(1 + H/F) faller med alderen fordi humankapitalen forbrukes mens den finansielle formuen bygges opp.</p><p><b>Forbeholdet oppgaven selv nevner.</b> Alt dette hviler på at humankapitalen er <i>risikofri</i>. Er den risikabel — og særlig hvis den er positivt korrelert med aksjemarkedet, slik den er for en finansanalytiker eller en gründer — skal aksjeandelen ned, ikke opp. Da må formelen korrigeres med et ledd for korrelasjonen mellom humankapital og aksjer, og &alpha; kan bli lavere enn w.</p>",
        },
      ],
    },
  ],
},
/* Høsten 2021: åpne oppgaver fra før flervalgsformatet. Skrevet etter docs/fie432-eldre-sett-spek.md. */
{
  "id": "h2021",
  "label": "Høsten 2021",
  "date": "2021-11-26",
  "minutes": 240,
  "points": 100,
  "format": "7 oppgaver · åpne svar · hjemmeeksamen",
  "note": "Dette var en <b>hjemmeeksamen</b> i Wiseflow, fire timer med alle hjelpemidler. Alle svarene var <b>åpne</b>: du skrev utregning og drøfting selv. Oppgavene oppga ikke poeng, bare «anbefalt tid» (30, 30, 30, 30, 35, 50 og 35 minutter), så poengene her er fordelt etter tiden. Oppgave 5–7 hadde <b>personlige tall</b> fra kandidatnummeret: studielån, risikoaversjon og avkastning på tjenestepensjonen. Løsningene viser alle ti siffer i tabeller. Eksamen i 2026 er en skoleeksamen med flervalg og minuspoeng, men regnerutinene er de samme: skjermingskjeden, gjeldsfordeling i formuesskatten, monopol med stykkskatt, formuesskatt som avkastningsskatt, kreditmetoden, lånetakene, Merton-andelen og pensjon. Satsene er fra 2021: aksjerabatt 45 %, primærbolig til 25 % uten terskel og stresstest med 5 prosentpoeng påslag. I 2026 er aksjerabatten 20 %, terskelen for primærbolig kr 14 000 000 og stresstesten renten + 3 prosentpoeng (minst 7 %).",
  "facts": [
    "Hjemmeeksamen 26. november 2021, 09:00–13:00, levert i Wiseflow.",
    "Sju oppgaver med åpne svar. Poeng var ikke oppgitt; 100 poeng er fordelt etter anbefalt tid.",
    "Oppgave 1–3: skatt (90 min). Oppgave 4: internasjonal skatterett (30 min). Oppgave 5–7: personlig finans (120 min).",
    "Oppgave 5–7 bruker siffer fra kandidatnummeret. Velg dine egne; løsningene har tabell for 0–9.",
    "Satsene er fra 2021. Notatet over sier hva som gjelder i 2026."
  ],
  "practiceNote": "Åpen eksamen: skriv utregningen slik at sensor kan følge hvert steg. Velg sifrene til oppgave 5–7 før du starter (for eksempel de to siste i studentnummeret ditt) og skriv dem i svaret. Rett deg selv mot kriteriene.",
  "exercises": [
    {
      "n": 1,
      "title": "Tiril: skjerming over tre år, nettoformue og utleie av egen bolig",
      "points": 13,
      "topic": "Skjerming og formuesskatt",
      "chapters": [
        5,
        7,
        4
      ],
      "body": "<p>Tiril eier en aksje som hun har betalt kr 1000 for i år 0. Både i år 1 og i år 2 er skjermingsfradraget 2%. I år 1 mottar hun kr 50 i utbytte, mens hun i år 2 mottar kr 10 i utbytte.</p>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Hva er skattepliktig utbytte i år 1 og 2?</p>",
          "solution": "<p><b>Regelen.</b> Skjermingsfradraget er skjermingsgrunnlaget (kostpris pluss framført ubenyttet skjerming) ganger skjermingsrenten. Skattepliktig utbytte er utbytte minus skjerming, aldri under null. Skjerming som ikke blir brukt, framføres og legges til grunnlaget året etter.</p><p>1. Grunnlaget er kostprisen: 1 000. Oppgaven kaller renten «skjermingsfradraget 2%»; det er skjermingsrenten.<br>2. Årets skjerming = 1 000 × 2 % = <b>20</b> i år 1. Alt brukes i år 1, så grunnlaget er fortsatt 1 000 i år 2 og skjermingen er 20 igjen.<br>3. År 1: 50 − 20 = <b>kr 30</b>.<br>4. År 2: 10 − 20 = −10. Skjermingen kan ikke gi fradrag, så skattepliktig utbytte er <b>kr 0</b>. Ubenyttet skjerming <b>kr 10</b> framføres til år 3.</p><p><b>Kontroll.</b> Utbyttet over to år er 60. Skattepliktig 30 + brukt skjerming 20 + 10 = 60.</p><p><b>I 2026.</b> Rutinen er den samme. Skattepliktig utbytte oppjusteres så med 1,72 (1,44 i 2021) og skattlegges med 22 %.</p>",
          "criteria": [
            "År 1: skjerming 1 000 × 2 % = 20 og skattepliktig utbytte kr 30.",
            "År 2: skattepliktig utbytte kr 0, ikke −10. Skjermingen kan ikke skape fradrag.",
            "Sier at den ubenyttede skjermingen på kr 10 framføres til år 3.",
            "Typisk feil: å la skattepliktig utbytte bli negativt, eller å glemme framføringen.",
            "Vis utregningen."
          ]
        },
        {
          "label": "b",
          "points": 3,
          "body": "<p>I år 3 mottar Tiril kr 40 i utbytte. Hva blir skattepliktig utbytte i år 3?</p>",
          "solution": "<p><b>Regelen.</b> Ubenyttet skjerming brukes to steder året etter: den legges til grunnlaget og den kommer i tillegg til årets fradrag.</p><p>1. Grunnlag i år 3 = 1 000 + 10 = <b>1 010</b>.<br>2. Årets skjerming = 1 010 × 2 % = <b>20,2</b>.<br>3. Samlet fradrag = 20,2 + 10 (framført) = <b>30,2</b>.<br>4. Skattepliktig utbytte = 40 − 30,2 = <b>kr 9,8</b>. Alt er brukt, så ingenting framføres til år 4.</p><p><b>Kontroll.</b> Over tre år: utbytte 50 + 10 + 40 = 100. Skattepliktig 30 + 0 + 9,8 = 39,8. Brukt skjerming 20 + 10 + 30,2 = 60,2. Og 39,8 + 60,2 = 100.</p><p><b>Fasiten.</b> Sensorveiledningen gir 9,8 og kaller Tiril «Trine» i forklaringen. Tallene stemmer.</p>",
          "criteria": [
            "Legger ubenyttet skjerming til grunnlaget: 1 010 × 2 % = 20,2.",
            "Legger også de 10 til årets fradrag: samlet 30,2.",
            "Skattepliktig utbytte kr 9,8.",
            "Typisk feil: å bruke de 10 bare ett av stedene. Bare i fradraget gir 40 − 30 = 10, bare i grunnlaget gir 40 − 20,2 = 19,8.",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 5,
          "body": "<p>Tiril har 1 800 000 kroner i gjeld per 1.1.2021. Hun har en formue før verdsettingsrabatt på 6 000 000 kroner. Hun eier en primærbolig med markedsverdi kr 4 800 000 som har 75 prosent verdsettingsrabatt; Aksjefondsandeler med markedsverdi kr 1 000 000 med 45 prosent verdsettingsrabatt per 1.1.2021. I tillegg har hun et bankinnskudd på kr 200 000 som ikke gir rett til verdsettingsrabatt.</p><p>Hva er Tirils skattepliktige nettoformue?</p>",
          "solution": "<p><b>Regelen.</b> Gjelden fordeles på eiendelene etter verdi <i>før</i> rabatt. Gjeld som faller på aksjer og aksjefond, reduseres med samme rabatt som eiendelen. Gjeld som faller på primærboligen, reduseres ikke: boligens lave formuesverdi er en verdsettingsregel, ikke en rabatt som gir gjeldsreduksjon.</p><table class=\"data\"><tr><th></th><th>Primærbolig</th><th>Aksjefond</th><th>Bank</th><th>Sum</th></tr><tr><td>Verdi før rabatt</td><td class=\"n\">4 800 000</td><td class=\"n\">1 000 000</td><td class=\"n\">200 000</td><td class=\"n\">6 000 000</td></tr><tr><td>Formuesverdi</td><td class=\"n\">1 200 000</td><td class=\"n\">550 000</td><td class=\"n\">200 000</td><td class=\"n\">1 950 000</td></tr><tr><td>Andel av gjelden</td><td class=\"n\">80 %</td><td class=\"n\">1/6</td><td class=\"n\">1/30</td><td class=\"n\">100 %</td></tr><tr><td>Gjeld i kr</td><td class=\"n\">1 440 000</td><td class=\"n\">300 000</td><td class=\"n\">60 000</td><td class=\"n\">1 800 000</td></tr><tr><td>Fradragsberettiget gjeld</td><td class=\"n\">1 440 000</td><td class=\"n\">165 000</td><td class=\"n\">60 000</td><td class=\"n\">1 665 000</td></tr><tr><td>Nettoformue</td><td class=\"n\">-240 000</td><td class=\"n\">385 000</td><td class=\"n\">140 000</td><td class=\"n\"><b>285 000</b></td></tr></table><p>1. Formuesverdier: bolig 4 800 000 × 25 % = 1 200 000, fond 1 000 000 × 55 % = 550 000, bank 200 000. Sum 1 950 000.<br>2. Gjeldsandeler etter verdi før rabatt: 4,8/6 = 80 %, 1/6 og 0,2/6 = 1/30.<br>3. Gjelden på fondet, 300 000, reduseres med 45 %: 300 000 × 0,55 = 165 000.<br>4. Fradragsberettiget gjeld = 1 440 000 + 165 000 + 60 000 = 1 665 000.<br>5. Skattepliktig nettoformue = 1 950 000 − 1 665 000 = <b>kr 285 000</b>.</p><p><b>Kontroll.</b> Regn gjeldsreduksjonen direkte: 1 800 000 × 1/6 × 45 % = 135 000. Da er fradragsberettiget gjeld 1 800 000 − 135 000 = 1 665 000, samme tall.</p><p><b>Fasiten.</b> Sensorveiledningen får <b>285 027</b>. Den runder andelene til 0,1667 og 0,033 i stedet for 1/6 og 1/30. Metoden er den samme og 285 000 er det eksakte svaret.</p><p><b>I 2026.</b> Aksjerabatten er 20 %, så fondet føres til 80 % og gjelden på fondet reduseres med 20 %. Primærbolig føres til 25 % opp til kr 14 000 000 og 70 % over. Med 2026-reglene blir Tirils nettoformue 2 200 000 − 1 740 000 = kr 460 000.</p>",
          "criteria": [
            "Riktige formuesverdier: bolig 1 200 000, fond 550 000, bank 200 000, sum 1 950 000.",
            "Fordeler gjelden etter verdi før rabatt: 1 440 000, 300 000 og 60 000.",
            "Reduserer bare gjelden på fondet (× 0,55), ikke boliggjelden.",
            "Skattepliktig nettoformue kr 285 000. Fasitens 285 027 med avrundede andeler er like godt.",
            "Typisk feil: å trekke fra all gjeld uten reduksjon (gir 150 000), eller å redusere også boliggjelden med 75 % (gir 1 365 000)."
          ]
        },
        {
          "label": "d",
          "points": 2,
          "body": "<p>Tiril leier ut sin primærbolig og som består av to like store etasjer i et helt år siden hun skal studere ute. Første etasje leies ut for kr 14 000 i måneden og andre etasje for kr 15 000. Når hun kommer hjem fra studiene har hun brukt litt for mye penger og finner ut at hun skal fortsette å leie ut første etasje i enda ett år til samme pris som før.</p><p>Hvor mye skatt må Tiril betale hver måned for utleiedelen av sin primærbolig? Skattesatsen på alminnelig inntekt er 22%.</p>",
          "solution": "<p><b>Regelen.</b> Utleie av en del av egen bolig er skattefri når eieren selv bruker minst halvparten av boligen, målt etter <b>utleieverdi</b>, ikke areal. Leier hun ut hele boligen, er leien skattepliktig (bortsett fra et lite beløp ved korttidsutleie).</p><p>1. Etter hjemkomsten bor Tiril i andre etasje og leier ut første.<br>2. Utleieverdien av det hun bruker selv er 15 000 av 29 000 i måneden, altså 51,7 %. Det er minst halvparten.<br>3. Leien for første etasje er derfor skattefri: <b>kr 0 i måneden</b>.</p><p>Arealet er likt, så arealet avgjør ikke. Det er den høyere leien for andre etasje som gjør at hun bruker «mest».</p><p><b>Kontroll.</b> Året hun var ute, leide hun ut hele boligen i mer enn 30 dager. Da var hele leien skattepliktig: 29 000 × 12 = 348 000 og 22 % av det er 76 560, altså 6 380 i måneden før fradrag for kostnader. Det er ikke det spørsmålet gjelder.</p>",
          "criteria": [
            "Bruker regelen om at eieren må bruke minst halvparten målt etter utleieverdi.",
            "Ser at Tiril bruker andre etasje (15 000 av 29 000) og svarer kr 0 i måneden.",
            "Typisk feil: å regne 14 000 × 22 % = 3 080 i måneden, eller å vurdere halvparten etter areal.",
            "Godt svar: skiller året hun var ute (hele boligen utleid, leien skattepliktig) fra året etter."
          ]
        }
      ]
    },
    {
      "n": 2,
      "title": "Monopolist med stykkskatt: hvor mye veltes over?",
      "points": 12,
      "topic": "Skatteinsidens",
      "chapters": [
        11
      ],
      "body": "<p>En monopolist omsetter Q enheter av en vare. Kostnadsfunksjonen til bedriften er <i>C</i>(<i>Q</i>) = <i>Q</i> og etterspørselen gis ved <i>P</i> = 3 − <i>Q</i>.</p>",
      "parts": [
        {
          "label": "a",
          "points": 5,
          "body": "<p>Finn monopolprisen (<i>P</i>)</p>",
          "solution": "<p><b>Regelen.</b> Monopolisten velger kvantum der grenseinntekt er lik grensekostnad, MR = MC og leser prisen av etterspørselskurven.</p><p>1. Inntekt: R = P · Q = (3 − Q)Q = 3Q − Q².<br>2. Grenseinntekt: MR = 3 − 2Q. Grensekostnad: MC = 1.<br>3. MR = MC: 3 − 2Q = 1, så <b>Q = 1</b>.<br>4. Pris: P = 3 − 1 = <b>2</b>.</p><p><b>Kontroll.</b> Profitten er 2 · 1 − 1 = 1. Prøv Q = 0,9: P = 2,1 og profitt 2,1 · 0,9 − 0,9 = 0,99. Prøv Q = 1,1: P = 1,9 og profitt 0,99. Q = 1 er toppen.</p>",
          "criteria": [
            "Setter MR = MC med MR = 3 − 2Q og MC = 1.",
            "Q = 1 og P = 2.",
            "Typisk feil: P = MC = 1 (frikonkurranse) eller MR = 0 (Q = 1,5, maks inntekt i stedet for maks profitt).",
            "Vis utregningen."
          ]
        },
        {
          "label": "b",
          "points": 7,
          "body": "<p>Anta at regjeringen legger en skatt (<i>t</i>) på kr 1 per enhet som omsettes. Siden bedriften er monopolist mener adm.dir som har gått på NHH at prisen må økes fra <i>P</i>=2 til <i>P</i>=3 dvs. at hele skatten skal veltes over på kunden. Utled og forklar løsningen.</p>",
          "solution": "<p><b>Regelen.</b> En stykkskatt på selgeren legges til grensekostnaden: MR = MC + t.</p><p>1. Ny kostnad: C(Q) = Q + tQ = 2Q når t = 1, så MC = 2.<br>2. MR = MC: 3 − 2Q = 2, så <b>Q = ½</b>.<br>3. Pris: P = 3 − ½ = <b>2,5</b>.<br>4. Prisen stiger med 0,5, altså <b>halvparten</b> av skatten. Kundene betaler 0,5 mer per enhet og monopolisten sitter igjen med 2,5 − 1 = 1,5 per enhet etter skatt i stedet for 2. Skatten deles likt.</p><p><b>Hvorfor ikke P = 3?</b> Ved P = 3 er etterspørselen 3 − 3 = 0, så monopolisten selger ingenting og tjener 0. Ved P = 2,5 er profitten 2,5 · ½ − 2 · ½ = 0,25. Adm.dir. har glemt at kundene reagerer på prisen: monopolmakt betyr at du velger punktet på etterspørselskurven, ikke at du kan ta hvilken pris du vil uten å miste salg.</p><p>Generelt med lineær etterspørsel P = a − bQ og konstant grensekostnad c gir MR = MC at P = (a + c + t)/2. Prisen stiger med t/2 uansett tall.</p><p><b>Kontroll.</b> Profitten faller fra 1 til 0,25. Staten får t · Q = 1 · ½ = 0,5.</p>",
          "criteria": [
            "Legger skatten til grensekostnaden: MC = 1 + t = 2.",
            "Q = ½ og P = 2,5. Prisen øker med 0,5, halvparten av skatten.",
            "Forklarer hvorfor P = 3 er galt: da blir Q = 0 og profitten 0, mot 0,25 ved P = 2,5.",
            "Typisk feil: å godta adm.dir.s påstand fordi monopolisten «har markedsmakt».",
            "Vis utregningen."
          ]
        }
      ]
    },
    {
      "n": 3,
      "title": "Formuesskatt som gir samme proveny som kapitalskatt",
      "points": 12,
      "topic": "Formuesskatt som avkastningsskatt",
      "chapters": [
        8
      ],
      "body": "<p>Regjeringen har bestemt seg for å gå over fra å beskatte kapitalinntekt til å beskatte formue fordi ulikheten har steget. Men regjeringen ønsker å opprettholde provenyet fra kapitalbeskatningen. I det nåværende systemet skattlegger regjeringen avkastningen <i>r</i> med satsen <i>t</i> på investors investering W. Skatteinntektene <i>R</i> gis ved beløpet <i>R</i> = <i>Wtr</i>.</p><p>Regjeringen foreslår å legge en formuesskatt med sats <i>τ</i> på formue ved årets slutt. Formue som investeres i begynnelsen av året vil ved årets slutt ha vokst til <i>W</i>(1 + <i>r</i>). Omleggingen innebærer at skatteprovenyet skal være som før dvs. lik <i>R</i> = <i>Wtr</i>.</p>",
      "parts": [
        {
          "label": "a",
          "points": 6,
          "body": "<p>Finn et uttrykk for <i>τ</i> som gir samme skatteinntekt <i>R</i> som kapitalskatten</p>",
          "solution": "<p><b>Regelen.</b> Sett de to provenyene like. Formuesskatten treffer formuen ved årets <b>slutt</b> og den inneholder avkastningen.</p><p>1. Proveny fra formuesskatten: W(1 + r) · τ.<br>2. Proveny fra kapitalskatten: W · t · r.<br>3. Sett like: W(1 + r)τ = Wtr. W forkortes bort.<br>4. <b>τ = tr/(1 + r)</b>.</p><p>Satsen avhenger av r. En formuesskatt er en skatt på forventet avkastning: jo lavere avkastningen er, desto lavere må τ være for å gi samme proveny.</p><p><b>Kontroll.</b> Hadde formuesskatten truffet formuen ved årets <i>begynnelse</i>, ville likningen vært Wτ = Wtr og τ = tr. Nevneren 1 + r kommer bare av at grunnlaget har vokst.</p>",
          "criteria": [
            "Setter opp likheten W(1 + r)τ = Wtr.",
            "Løser for τ = tr/(1 + r) og viser at W faller bort.",
            "Forklarer at 1 + r kommer av at grunnlaget er formuen ved årets slutt.",
            "Typisk feil: τ = tr, som gjelder formue ved årets begynnelse."
          ]
        },
        {
          "label": "b",
          "points": 6,
          "body": "<p>Hvis skatten på kapitalinntekt er 22% og <i>r</i> er 3%, hva blir da formuesskattesatsen dersom man skal ha samme proveny som når man skattla kapitalgevinst?</p>",
          "solution": "<p><b>Regelen.</b> Sett tallene inn i τ = tr/(1 + r).</p><p>1. tr = 0,22 × 0,03 = 0,0066.<br>2. τ = 0,0066/1,03 = 0,006408.<br>3. <b>τ ≈ 0,64 %</b>.</p><p><b>Kontroll.</b> Med W = 100: kapitalskatten er 100 × 0,03 × 0,22 = 0,66. Formuesskatten er 103 × 0,006408 = 0,66. Likt.</p><p>Tolkning: en formuesskatt på 0,64 % tar like mye som 22 % skatt på en avkastning på 3 %. Som skatt på avkastningen er formuesskatten tung når avkastningen er lav.</p>",
          "criteria": [
            "Bruker τ = tr/(1 + r) med t = 0,22 og r = 0,03.",
            "τ ≈ 0,64 %.",
            "Typisk feil: 0,66 % (glemmer å dele på 1,03) eller 22 % × 3 % skrevet som 6,6 %.",
            "Vis utregningen."
          ]
        }
      ]
    },
    {
      "n": 4,
      "title": "Kjell Inge: lønn fra fire land og kreditmetoden",
      "points": 12,
      "topic": "Internasjonal skatt",
      "chapters": [
        13
      ],
      "body": "<p>Kjell Inge ble ferdig med sin master på NHH med spesialisering i skatt for noen år siden og er svært ettertraktet på arbeidsmarkedet internasjonalt. Han er født og oppvokst i Norge, har familie, kjæreste og egen leilighet i Bergen. I 2020 hadde han følgende arbeidsforhold.</p><ul><li>Stilling i det norske konsulentfirmaet A, hvor han arbeidet i Norge i 6 måneder og tjente kr. 1 000 000</li><li>Stilling i det irske konsulentfirmaet B, hvor han arbeidet i Irland i 2 måneder og tjente kr. 200 000</li><li>Stilling i det amerikanske konsulentfirmaet C, hvor han arbeidet i USA i 2 måneder og tjente kr. 200 000.</li><li>Stilling i konsulentfirmaet D, hvor han arbeidet i et skatteparadis i 2 måneder og tjente kr 200 000</li></ul><p>Legg til grunn følgende forutsetninger:</p><ul><li>Etter norsk intern skatterett er Kjell Inge å anse som skattemessig bosatt i Norge (globalskattepliktig). Irland anser Kjell Inge som bosatt der etter irsk intern skatterett. Men USA og skatteparadiset anser ham kun som begrenset skattepliktig for lønnsinntekten som der er opptjent.</li><li>Marginalskattesatsen for lønnsinntekt i Norge er 46,4 %. I Irland, USA og skatteparadiset er tilsvarende sats hhv. 35 %, 55 % og 15 %.</li><li>Norge gir kun lettelse for dobbeltbeskatning dersom det er forpliktet til det etter iht skatteavtale.</li><li>Norge har skatteavtale med Irland og USA, men ikke med skatteparadiset.</li><li>Skatteavtalene er basert på OECDs modellavtale og anvender vanlig kreditmetode.</li></ul><p>Kan du, basert på opplysningene ovenfor, beregne hvordan Kjell Inge vil bli beskattet i Norge for sin lønnsinntekt for 2020?</p>",
      "solution": "<p><b>Regelen.</b> Norge skattlegger bosatte for all inntekt (globalskatteplikt). Etter vanlig kreditmetode gir Norge fradrag for utenlandsk skatt, men aldri mer enn den norske skatten på samme inntekt: kredit = min(utenlandsk skatt; norsk sats × inntekten). Uten skatteavtale gir Norge her ingen kredit.</p><p>1. <b>Global norsk skatt.</b> Samlet lønn 1 000 000 + 3 × 200 000 = 1 600 000. Skatt 1 600 000 × 46,4 % = <b>742 400</b>.<br>2. <b>Irland: dobbelt bosted.</b> Både Norge og Irland anser ham som bosatt. Skatteavtalen (OECDs modellavtale art. 4 nr. 2) avgjør: fast bolig, familie og sentrum for livsinteressene peker på Norge. Han er bosatt i Norge etter avtalen og Irland kan bare skattlegge lønnen som er opptjent der. Irsk skatt 200 000 × 35 % = 70 000. Norsk skatt på samme inntekt er 92 800, så kreditten er hele <b>70 000</b>.<br>3. <b>USA.</b> Begrenset skatteplikt til USA for lønnen der. Amerikansk skatt 200 000 × 55 % = 110 000. Taket for kreditten er norsk skatt på inntekten: 200 000 × 46,4 % = <b>92 800</b>. De resterende 17 200 er dobbeltbeskatning.<br>4. <b>Skatteparadiset.</b> Ingen avtale og Norge gir etter forutsetningen ingen ensidig lettelse. Kredit <b>0</b>. Skatten der, 30 000, betales i tillegg.<br>5. <b>Betalbar skatt til Norge</b> = 742 400 − 70 000 − 92 800 = <b>kr 579 600</b>.</p><table class=\"data\"><tr><th>Land</th><th>Lønn</th><th>Utenlandsk skatt</th><th>Norsk skatt på inntekten</th><th>Kredit</th></tr><tr><td>Norge</td><td class=\"n\">1 000 000</td><td class=\"n\">0</td><td class=\"n\">464 000</td><td class=\"n\">0</td></tr><tr><td>Irland</td><td class=\"n\">200 000</td><td class=\"n\">70 000</td><td class=\"n\">92 800</td><td class=\"n\">70 000</td></tr><tr><td>USA</td><td class=\"n\">200 000</td><td class=\"n\">110 000</td><td class=\"n\">92 800</td><td class=\"n\">92 800</td></tr><tr><td>Skatteparadis</td><td class=\"n\">200 000</td><td class=\"n\">30 000</td><td class=\"n\">92 800</td><td class=\"n\">0</td></tr><tr><td>Sum</td><td class=\"n\">1 600 000</td><td class=\"n\">210 000</td><td class=\"n\">742 400</td><td class=\"n\">162 800</td></tr></table><p><b>Kontroll.</b> Samlet skatt i alle land er 579 600 + 210 000 = 789 600, som er 49,35 % av lønnen. Uten dobbeltbeskatning ville den vært 742 400. Differansen 47 200 er USA-overskuddet 17 200 pluss skatteparadis-skatten 30 000.</p><p><b>Merk.</b> Norsk intern rett gir i dag kreditfradrag også uten skatteavtale. Oppgaven ser bort fra det med forutsetningen om at Norge bare gir lettelse når det er forpliktet etter avtale. Følg oppgaven.</p>",
      "criteria": [
        "Global norsk skatt 1 600 000 × 46,4 % = 742 400.",
        "Ser problemet med dobbelt bosted for Irland og løser det med skatteavtalen (art. 4 nr. 2): bosatt i Norge.",
        "Bruker kredittaket: Irland 70 000 (full), USA 92 800 (ikke 110 000), skatteparadis 0.",
        "Betalbar skatt til Norge kr 579 600.",
        "Typisk feil: full kredit for den amerikanske skatten (gir 562 400), eller kredit for skatteparadiset (gir 549 600)."
      ]
    },
    {
      "n": 5,
      "title": "Ståle: betjeningsevne, femgangeren og stresstesten",
      "points": 15,
      "topic": "Lån",
      "chapters": [
        16
      ],
      "body": "<p>Læreren Ståle Regnbakken er singel og har en årlig bruttolønn på 650 000. Skatt, konsum og renter og avdrag til studielån utgjør 60 % av bruttolønn.</p>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Hvor mye av inntekten kan han maksimalt bruke på å betjene lånet?</p>",
          "solution": "<p><b>Regelen.</b> Det som er igjen av bruttolønnen etter skatt, konsum og eksisterende gjeld, er det han kan bruke på et nytt lån.</p><p>1. Skatt, konsum og studielån: 650 000 × 60 % = 390 000.<br>2. Igjen til nytt lån: 650 000 − 390 000 = <b>kr 260 000 i året</b>, altså 40 % av bruttolønnen.</p><p><b>Kontroll.</b> 260 000/12 = 21 667 i måneden.</p>",
          "criteria": [
            "650 000 × 40 % = 260 000 i året.",
            "Ser at studielånet allerede ligger i de 60 %.",
            "Typisk feil: å svare 390 000 (det som går med, ikke det som er igjen)."
          ]
        },
        {
          "label": "b",
          "points": 4,
          "body": "<p>Vi vil nå undersøke hvor mye Ståle kan låne utover det studielånet han allerede har. Størrelsen på studielånet er bestemt ut fra kandidatnummeret ditt på eksamen. Ståle sitt studielån er gitt ved følgende formel:</p><p><b>Studielån = Siste siffer på kandidatnr * 25 000</b></p><p>Siste siffer på kandidatnummeret kan være mellom 0-9. For eksempel slutter det på 5, så har han 125 000 i studielån, slutter det på 0, så har han ikke studielån.<br>Et av kravene i Boliglånsforskriften er at lån ikke skal innvilges hvis kundens samlede gjeld overstiger fem ganger årsinntekt.</p><p>Hvor mye mer enn studielånet kan Ståle maksimalt låne hvis man skal følge kravet om at kundens samlede gjeld ikke kan overstiger fem ganger årsinntekt?</p>",
          "solution": "<p><b>Regelen.</b> Samlet gjeld høyst 5 × brutto årsinntekt. Nytt lån = taket minus gjelden han har.</p><p>1. Tak for samlet gjeld: 5 × 650 000 = <b>3 250 000</b>.<br>2. Studielån: 25 000 × siste siffer.<br>3. Maks nytt lån = 3 250 000 − 25 000 × siste siffer.</p><table class=\"data\"><tr><th>Siste siffer</th><th>Studielån</th><th>Maks samlet gjeld</th><th>Maks nytt lån (b)</th></tr><tr><td class=\"n\">0</td><td class=\"n\">0</td><td class=\"n\">3 250 000</td><td class=\"n\">3 250 000</td></tr><tr><td class=\"n\">1</td><td class=\"n\">25 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 225 000</td></tr><tr><td class=\"n\">2</td><td class=\"n\">50 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 200 000</td></tr><tr><td class=\"n\">3</td><td class=\"n\">75 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 175 000</td></tr><tr><td class=\"n\">4</td><td class=\"n\">100 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 150 000</td></tr><tr><td class=\"n\">5</td><td class=\"n\">125 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 125 000</td></tr><tr><td class=\"n\">6</td><td class=\"n\">150 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 100 000</td></tr><tr><td class=\"n\">7</td><td class=\"n\">175 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 075 000</td></tr><tr><td class=\"n\">8</td><td class=\"n\">200 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 050 000</td></tr><tr><td class=\"n\">9</td><td class=\"n\">225 000</td><td class=\"n\">3 250 000</td><td class=\"n\">3 025 000</td></tr></table><p>Eksempel: siste siffer 5 gir studielån 125 000 og maks nytt lån <b>kr 3 125 000</b>.</p><p><b>Kontroll.</b> Nytt lån + studielån = 3 250 000 i hver rad.</p><p><b>I 2026.</b> Kravet om høyst fem ganger inntekten gjelder fortsatt (utlånsforskriften).</p>",
          "criteria": [
            "Tak 5 × 650 000 = 3 250 000.",
            "Trekker fra studielånet: 3 250 000 − 25 000 × siste siffer.",
            "Oppgir sifferet som er brukt.",
            "Typisk feil: å gange 5 med inntekten etter skatt, eller å glemme studielånet."
          ]
        },
        {
          "label": "c",
          "points": 5,
          "body": "<p>En annen paragraf i Boliglånforskriften sier at 1) banken skal legge inn en renteøkning på 5 prosentpoeng fra det aktuelle rentenivået og 2) avdragsbetalingen skal være lik et annuitetslån med 30 års nedbetalingstid.</p><p>Vis maksimalt lånebeløp på nytt lån hvis dagens rente er 3 %. Vi ser bort fra rentefradraget.</p>",
          "solution": "<p><b>Regelen.</b> Lånet må kunne betjenes som et annuitetslån over 30 år til renten + 5 prosentpoeng. Maks lån = det han kan betale per år × annuitetsfaktoren.</p><p>1. Stresset rente: 3 % + 5 pp = 8 %.<br>2. Annuitetsfaktor: A = [1 − 1,08<sup>−30</sup>]/0,08 = 11,2578.<br>3. Maks lån = 260 000 × 11,2578 = <b>kr 2 927 024</b>.</p><p>Svaret er det samme for alle kandidatnummer: studielånet ligger allerede i de 60 %, så de 260 000 er det samme for alle.</p><p><b>Kontroll.</b> Annuiteten på et lån på 2 927 024 til 8 % over 30 år er 2 927 024/11,2578 = 260 000.</p><p><b>Fasiten.</b> Regnearket skriver «260000*11.26», men tallet 2 927 024 er regnet med uavrundet faktor. Med 11,26 blir det 2 927 600. Fasiten nevner også at gode kandidater kan påpeke at studielånet egentlig også skulle stresstestes.</p><p><b>I 2026.</b> Stresstesten er renten + 3 prosentpoeng, minst 7 %. Med 3 % i dag gir det 7 %, faktor 12,4090 og maks lån 3 226 351.</p>",
          "criteria": [
            "Stresset rente 3 % + 5 pp = 8 %.",
            "Annuitetsfaktor over 30 år til 8 %: 11,2578.",
            "Maks lån 260 000 × 11,2578 ≈ kr 2 927 024.",
            "Typisk feil: å bruke 3 % uten påslag (gir 5 096 115) eller 25 år.",
            "Vis utregningen."
          ]
        },
        {
          "label": "d",
          "points": 3,
          "body": "<p>Hvilket av kriteriene, enten b) eller c), er det som gir lavest maksimalt lånebeløp?</p>",
          "solution": "<p><b>Regelen.</b> Det laveste taket binder.</p><p>1. Stresstesten (c) gir 2 927 024 for alle.<br>2. Femgangeren (b) gir mellom 3 250 000 (siffer 0) og 3 025 000 (siffer 9).<br>3. Selv det laveste b-taket, 3 025 000, er 97 976 over c-taket. <b>Stresstesten (c) gir lavest lånebeløp</b> for alle kandidatnummer.</p><p><b>Kontroll.</b> Studielånet måtte vært over 3 250 000 − 2 927 024 = 322 976 for at b skulle binde, altså mer enn 25 000 × 9.</p><p><b>I 2026.</b> Med stresstest til 7 % blir c-taket 3 226 351. Da binder c bare for siffer 0 (3 250 000), mens b binder for siffer 1–9.</p>",
          "criteria": [
            "Sammenligner sitt eget b-svar med 2 927 024.",
            "Konkluderer med at stresstesten (c) binder.",
            "Godt svar: viser at det gjelder for alle siffer 0–9."
          ]
        }
      ]
    },
    {
      "n": 6,
      "title": "Elling: aksjeandel, aktive fond, ansvarlig investering og sparing",
      "points": 21,
      "topic": "Sparing og portefølje",
      "chapters": [
        14
      ],
      "body": "<p>Elling Braut Haaland sparer langsiktig til pensjon. I en spareprosess inngår både investoregenskaper og markedssyn. Dette inngår i beslutningen om hvor mye som skal spares i risikable aktiva og hvor mye som skal i risikofrie aktiva. I denne oppgaven representeres risikable aktiva med globale indeksaksjefond og risikofrie aktiva med bankinnskudd. Fra boken og forelesning husker vi følgende formel for å bestemme andel av sparepengene i risikable aktive (<i>w</i><sub>T</sub>):</p><p><i>w</i><sub>T</sub> = (1/<i>γ</i>) · [E(<i>R</i><sub>T</sub>) − <i>R</i><sub>F</sub>] / <i>σ</i><sub>T</sub><sup>2</sup></p><p>Investoregenskaper er representert ved hjelp av risikoaversjonsparameteren <i>γ</i>, mens markedssynet er representert ved hjelp av aksjepremien E(<i>R</i><sub>T</sub>) − <i>R</i><sub>F</sub> og variansen til aksjefondet <i>σ</i><sub>T</sub><sup>2</sup>. I oppgaven tar vi ikke hensyn til ikke-finansielle aktiva.<br>La risikoaversjon være gitt av nest siste siffer på ditt kandidatnummer:</p><p><b>Risikoaversjon, γ = 3 + (Nest siste siffer kandidatnr / 3)</b></p><p>Nest siste siffer på kandidatnummeret kan være mellom 0-9. For eksempel er det 6, så har han en risikoaversjon på 5, er det 0, så har han en aversjon på 3.<br>Vi antar at aksjepremien er 5 % etter kostnader og standardavviket til aksjefondet er 14 %.</p>",
      "parts": [
        {
          "label": "a",
          "points": 4,
          "body": "<p>Hvor stor andel av sparebeløpet allokerer Elling til aksjefondet?</p>",
          "solution": "<p><b>Regelen.</b> Mertons andel: w = premie/(γσ²). Bruk variansen, ikke standardavviket.</p><p>1. σ² = 0,14² = 0,0196.<br>2. γ = 3 + siffer/3.<br>3. w = 0,05/(γ × 0,0196).</p><p>Eksempel: siffer 0 gir γ = 3 og w = 0,05/0,0588 = <b>85,03 %</b>. Siffer 6 gir γ = 5 og w = <b>51,02 %</b>.</p><table class=\"data\"><tr><th>Nest siste siffer</th><th>γ</th><th>w indeksfond (a)</th><th>w aktivt fond (b)</th><th>Økning</th></tr><tr><td class=\"n\">0</td><td class=\"n\">3,00</td><td class=\"n\">85,03 %</td><td class=\"n\">93,54 %</td><td class=\"n\">8,50 pp</td></tr><tr><td class=\"n\">1</td><td class=\"n\">3,33</td><td class=\"n\">76,53 %</td><td class=\"n\">84,18 %</td><td class=\"n\">7,65 pp</td></tr><tr><td class=\"n\">2</td><td class=\"n\">3,67</td><td class=\"n\">69,57 %</td><td class=\"n\">76,53 %</td><td class=\"n\">6,96 pp</td></tr><tr><td class=\"n\">3</td><td class=\"n\">4,00</td><td class=\"n\">63,78 %</td><td class=\"n\">70,15 %</td><td class=\"n\">6,38 pp</td></tr><tr><td class=\"n\">4</td><td class=\"n\">4,33</td><td class=\"n\">58,87 %</td><td class=\"n\">64,76 %</td><td class=\"n\">5,89 pp</td></tr><tr><td class=\"n\">5</td><td class=\"n\">4,67</td><td class=\"n\">54,66 %</td><td class=\"n\">60,13 %</td><td class=\"n\">5,47 pp</td></tr><tr><td class=\"n\">6</td><td class=\"n\">5,00</td><td class=\"n\">51,02 %</td><td class=\"n\">56,12 %</td><td class=\"n\">5,10 pp</td></tr><tr><td class=\"n\">7</td><td class=\"n\">5,33</td><td class=\"n\">47,83 %</td><td class=\"n\">52,61 %</td><td class=\"n\">4,78 pp</td></tr><tr><td class=\"n\">8</td><td class=\"n\">5,67</td><td class=\"n\">45,02 %</td><td class=\"n\">49,52 %</td><td class=\"n\">4,50 pp</td></tr><tr><td class=\"n\">9</td><td class=\"n\">6,00</td><td class=\"n\">42,52 %</td><td class=\"n\">46,77 %</td><td class=\"n\">4,25 pp</td></tr></table><p><b>Kontroll.</b> Dobbel γ gir halv andel: γ = 6 gir 42,52 %, halvparten av 85,03 %.</p>",
          "criteria": [
            "Bruker w = 0,05/(γ × 0,14²) med σ² = 0,0196.",
            "Riktig γ for sitt siffer og riktig w (γ = 3 gir 85,03 %).",
            "Typisk feil: å bruke σ = 0,14 i stedet for σ² = 0,0196 (gir 11,90 % for γ = 3).",
            "Vis utregningen og oppgi sifferet."
          ]
        },
        {
          "label": "b",
          "points": 4,
          "body": "<p>Elling vurderer å velge et aktivt aksjefond istedenfor indeksfondet beskrevet over. Han mener da at i tillegg til en aksjepremie på 5 %, kan man legge til 0,5 % avkastning (etter kostnader). Elling vurderer at fondet har samme standardavvik som indeksfondet, altså 14 %.</p><p>Hva blir den nye allokeringen der man blander et aktivt aksjefond med bankinnskudd? Forklar forskjellen fra spørsmål a)</p>",
          "solution": "<p><b>Regelen.</b> Samme formel med premie 5,5 %: w = 0,055/(γσ²).</p><p>1. γ = 3: w = 0,055/0,0588 = <b>93,54 %</b>, mot 85,03 % i a).<br>2. γ = 5: w = <b>56,12 %</b>, mot 51,02 %.<br>3. Se tabellen i a) for alle siffer.</p><p><b>Forskjellen.</b> Andelen er proporsjonal med premien. Premien øker med 10 % (5,5/5 = 1,1), så andelen øker med 10 % for alle γ. Med samme risiko og høyere forventet avkastning får Elling bedre betalt for hver enhet risiko og han tar derfor mer av den. Økningen i prosentpoeng er størst for den minst risikoaverse (8,50 pp for γ = 3, 4,25 pp for γ = 6).</p><p><b>Kontroll.</b> 93,54/85,03 = 1,10.</p>",
          "criteria": [
            "Bruker premie 5,5 % med samme σ: w = 0,055/(γ × 0,0196).",
            "Riktig tall for sitt siffer (γ = 3 gir 93,54 %).",
            "Forklarer at høyere premie med samme risiko gir høyere andel og at økningen er 10 % relativt.",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 3,
          "body": "<p>Det er ulike syn på om aktive fond gir en bedre avkastning og risikoprofil enn indeksalternativene.</p><p>Diskutere kort (maks 150 ord) forutsetningen om et tillegg til forventet avkastning på 0,5 % fra det aktivt forvaltede fondet i forhold til indeksfondet.</p>",
          "solution": "<p><b>Modellsvar (under 150 ord).</b></p><p>Forutsetningen er optimistisk. Tillegget er <i>etter</i> kostnader. Aktive fond koster gjerne ett prosentpoeng mer i året enn indeksfond, så forvalteren må slå markedet med rundt 1,5 prosentpoeng før kostnader.</p><p>Markedseffisienshypotesen sier at prisene reflekterer tilgjengelig informasjon. Gjennomsnittet kan ikke slå seg selv: før kostnader får aktive forvaltere samlet markedsavkastningen og etter kostnader taper de i snitt. Selv om markedet skulle være ineffisient, er det ikke sikkert at forvalteren fanger det og gir gevinsten videre til kunden.</p><p>Empirien er svak. Forbrukerrådets studie for 1998–2017 viser meravkastning etter kostnader for norske aksjefond (0,86 % i året), men mindreavkastning for globale fond (−0,89 %). Det er uklart om dette kunne vært forutsett, eller om det er tilfeldigheter.</p><p>Antakelsen om samme standardavvik er også tvilsom: aktive fond tar mer selskapsspesifikk risiko.</p>",
          "criteria": [
            "Påpeker at 0,5 % etter kostnader krever betydelig meravkastning før kostnader.",
            "Bruker markedseffisienshypotesen og at gjennomsnittsforvalteren ikke kan slå markedet etter kostnader.",
            "Viser til empiri: lite vedvarende meravkastning, vanskelig å velge vinnerne på forhånd.",
            "Godt svar: stiller også spørsmål ved at fondet skal ha samme risiko som indeksfondet. Holder seg under 150 ord."
          ]
        },
        {
          "label": "d",
          "points": 3,
          "body": "<p>Elling er opptatt av at sparepengene skal brukes på en måte som er i samsvar med bærekraftsmålene til FN.</p><p>Beskriv kort (maks 150 ord) de to hovedalternativene en investor kan bruke for å være en såkalt ansvarlig investor. Nevn fordeler og ulemper med de ulike alternativene.</p>",
          "solution": "<p><b>Modellsvar (under 150 ord).</b> En ansvarlig investor tar hensyn til miljø, samfunn og selskapsstyring (ESG). Hovedvalget er «stikk» eller «bli og fiks».</p><p><b>1. Utelukkelse (nedsalg).</b> Investoren selger seg ut av selskaper med uetisk eller forurensende virksomhet. <i>Fordeler:</i> enkelt, tydelig og gir ren samvittighet. <i>Ulemper:</i> dårligere diversifisering. Effekten på selskapet er liten med mindre de ansvarlige investorene er svært store, fordi andre investorer kjøper den billigere aksjen. Aksjene havner da hos eiere som bryr seg minst.</p><p><b>2. Aktivt eierskap.</b> Investoren beholder aksjene og påvirker selskapet: stemmer på generalforsamlingen, går i dialog, samarbeider med andre investorer og stiller krav. <i>Fordeler:</i> kan faktisk endre selskapet og porteføljen forblir diversifisert. <i>Ulemper:</i> krever størrelse, kompetanse og ressurser og en liten sparer har lite påvirkning alene. Han kan velge et fond som driver aktivt eierskap.</p>",
          "criteria": [
            "Navngir de to alternativene: utelukkelse (nedsalg, «stikk») og aktivt eierskap («bli og fiks»).",
            "Gir minst én fordel og én ulempe for hvert.",
            "Ser at nedsalg virker lite på prisene når andre investorer kjøper aksjene.",
            "Holder seg under 150 ord."
          ]
        },
        {
          "label": "e",
          "points": 3,
          "body": "<p>Vi antar at bankinnskudd gir en forventet avkastning på 1 %.</p><p>Hva er da forventet porteføljeavkastning med allokering funnet ut med å blande indeksfond og bankinnskudd i spørsmål a?</p>",
          "solution": "<p><b>Regelen.</b> E(R<sub>p</sub>) = w × E(R<sub>T</sub>) + (1 − w) × R<sub>F</sub> = R<sub>F</sub> + w × premie.</p><p>1. Aksjefondet ventes å gi 1 % + 5 % = 6 %.<br>2. γ = 3: E(R<sub>p</sub>) = 0,8503 × 6 % + 0,1497 × 1 % = 0,01 + 0,8503 × 0,05 = <b>5,2517 %</b>, avrundet 5,25 %.<br>3. γ = 5: 0,01 + 0,5102 × 0,05 = <b>3,5510 %</b>.</p><table class=\"data\"><tr><th>Nest siste siffer</th><th>γ</th><th>w</th><th>E(R<sub>p</sub>)</th></tr><tr><td class=\"n\">0</td><td class=\"n\">3,00</td><td class=\"n\">85,03 %</td><td class=\"n\">5,2517 %</td></tr><tr><td class=\"n\">1</td><td class=\"n\">3,33</td><td class=\"n\">76,53 %</td><td class=\"n\">4,8265 %</td></tr><tr><td class=\"n\">2</td><td class=\"n\">3,67</td><td class=\"n\">69,57 %</td><td class=\"n\">4,4787 %</td></tr><tr><td class=\"n\">3</td><td class=\"n\">4,00</td><td class=\"n\">63,78 %</td><td class=\"n\">4,1888 %</td></tr><tr><td class=\"n\">4</td><td class=\"n\">4,33</td><td class=\"n\">58,87 %</td><td class=\"n\">3,9435 %</td></tr><tr><td class=\"n\">5</td><td class=\"n\">4,67</td><td class=\"n\">54,66 %</td><td class=\"n\">3,7332 %</td></tr><tr><td class=\"n\">6</td><td class=\"n\">5,00</td><td class=\"n\">51,02 %</td><td class=\"n\">3,5510 %</td></tr><tr><td class=\"n\">7</td><td class=\"n\">5,33</td><td class=\"n\">47,83 %</td><td class=\"n\">3,3916 %</td></tr><tr><td class=\"n\">8</td><td class=\"n\">5,67</td><td class=\"n\">45,02 %</td><td class=\"n\">3,2509 %</td></tr><tr><td class=\"n\">9</td><td class=\"n\">6,00</td><td class=\"n\">42,52 %</td><td class=\"n\">3,1259 %</td></tr></table><p><b>Kontroll.</b> Avkastningen ligger mellom 1 % (bare bank) og 6 % (bare fond), nærmere 6 % jo større w.</p>",
          "criteria": [
            "Bruker E(R_p) = 1 % + w × 5 %, eller w × 6 % + (1 − w) × 1 %.",
            "Riktig tall for sitt siffer (γ = 3 gir 5,25 %).",
            "Typisk feil: å bruke 5 % som fondets totale avkastning i stedet for premien over banken.",
            "Vis utregningen."
          ]
        },
        {
          "label": "f",
          "points": 4,
          "body": "<p>Videre antar vi nå at den forventede avkastningen blir den realiserte.</p><p>Hva vil Elling totalt ha spart om 20 år hvis han årlig sparer 36 000? Hvis du ikke har kommet frem til en forventet avkastning under spørsmål e), så kan du bruke 10 % avkastning. Men merk at du da ikke får full uttelling på oppgaven selv med rett svar.</p><p>I spørsmålet over kan følgende annuitetsformel være nyttig: <i>A</i><sub>r%,T</sub> = [1 − 1/(1 + <i>r</i>)<sup>T</sup>]/<i>r</i> der r er avkastning og T er tidshorisont.</p>",
          "solution": "<p><b>Regelen.</b> Sluttverdien av et årlig beløp a i T år: S = a × [(1 + r)<sup>T</sup> − 1]/r. Med formelen i oppgaven: S = a × A<sub>r,T</sub> × (1 + r)<sup>T</sup>. Sparingen skjer ved slutten av hvert år.</p><p>1. γ = 3: r = 5,2517 %. Annuitetsfaktor A = 12,2005 og (1 + r)<sup>20</sup> = 2,7834.<br>2. Sluttverdifaktor = 12,2005 × 2,7834 = 33,9594.<br>3. S = 36 000 × 33,9594 = <b>kr 1 222 537</b>.</p><table class=\"data\"><tr><th>Nest siste siffer</th><th>r</th><th>Sluttverdifaktor</th><th>Sluttverdi</th></tr><tr><td class=\"n\">0</td><td class=\"n\">5,2517 %</td><td class=\"n\">33,9594</td><td class=\"n\">1 222 537</td></tr><tr><td class=\"n\">1</td><td class=\"n\">4,8265 %</td><td class=\"n\">32,4662</td><td class=\"n\">1 168 783</td></tr><tr><td class=\"n\">2</td><td class=\"n\">4,4787 %</td><td class=\"n\">31,3014</td><td class=\"n\">1 126 851</td></tr><tr><td class=\"n\">3</td><td class=\"n\">4,1888 %</td><td class=\"n\">30,3682</td><td class=\"n\">1 093 254</td></tr><tr><td class=\"n\">4</td><td class=\"n\">3,9435 %</td><td class=\"n\">29,6041</td><td class=\"n\">1 065 746</td></tr><tr><td class=\"n\">5</td><td class=\"n\">3,7332 %</td><td class=\"n\">28,9672</td><td class=\"n\">1 042 820</td></tr><tr><td class=\"n\">6</td><td class=\"n\">3,5510 %</td><td class=\"n\">28,4284</td><td class=\"n\">1 023 422</td></tr><tr><td class=\"n\">7</td><td class=\"n\">3,3916 %</td><td class=\"n\">27,9667</td><td class=\"n\">1 006 802</td></tr><tr><td class=\"n\">8</td><td class=\"n\">3,2509 %</td><td class=\"n\">27,5668</td><td class=\"n\">992 404</td></tr><tr><td class=\"n\">9</td><td class=\"n\">3,1259 %</td><td class=\"n\">27,2170</td><td class=\"n\">979 813</td></tr></table><p>Med reserveavkastningen 10 %: 36 000 × 57,2750 = 2 061 900. Det gir bare delvis uttelling.</p><p><b>Kontroll.</b> Innskuddene er 20 × 36 000 = 720 000. Resten, 502 537 for γ = 3, er avkastning.</p><p><b>Fasiten.</b> Fasiten regner med uavrundet rente og får 1 222 537. Med 5,25 % avrundet blir det 1 222 316, 221 kroner lavere. Begge viser riktig metode.</p>",
          "criteria": [
            "Bruker sluttverdien av en annuitet: 36 000 × [(1 + r)^20 − 1]/r, eller A × (1 + r)^20.",
            "Bruker avkastningen fra e) (γ = 3 gir kr 1 222 537).",
            "Typisk feil: å bruke annuitetsfaktoren (nåverdi) alene, som gir 36 000 × 12,2005 = 439 217.",
            "Å bruke 10 % gir 2 061 900 og bare delvis uttelling.",
            "Vis utregningen."
          ]
        }
      ]
    },
    {
      "n": 7,
      "title": "Martin: folketrygd og innskuddspensjon som andel av sluttlønn",
      "points": 15,
      "topic": "Pensjon",
      "chapters": [
        15
      ],
      "body": "<p>Hovedkildene for pensjon er Folketrygden og tjenestepensjon. Martin Ødefarm har vært i arbeid siden 2003. Han tenker å ta ut 100 % alderspensjon fra han er 67 år i 2043. Vi antar at lønnen er 500 000. Delingstallet for hans årskull ved uttaksalder 67 år er 18,02 (anslag fra 2021).</p>",
      "parts": [
        {
          "label": "a",
          "points": 4,
          "body": "<p>Hvor stor andel av sluttlønn vil komme fra pensjonen fra Folketrygden?</p>",
          "solution": "<p><b>Regelen.</b> Hvert år legges 18,1 % av inntekten opp til 7,1 G til pensjonsbeholdningen og beholdningen reguleres med lønnsveksten. Årlig pensjon = beholdning/delingstall. Når lønnen følger lønnsveksten, er kompensasjonsgraden 18,1 % × antall år/delingstall.</p><p>1. Opptjeningsår: 2043 − 2003 = 40.<br>2. Beholdning: 0,181 × 500 000 × 40 = 3 620 000.<br>3. Årlig pensjon: 3 620 000/18,02 = 200 888.<br>4. Andel av sluttlønn: 200 888/500 000 = <b>40,18 %</b>, altså om lag 40,2 %.</p><p>Forutsetninger: lønnen på 500 000 er under 7,1 G (7,1 × 106 399 = 755 433 i 2021) og følger lønnsveksten, slik at hvert år teller fullt.</p><p><b>Kontroll.</b> 0,181 × 40/18,02 = 0,4018. Teller du 41 år (2003 til og med 2043), får du 41,2 %. Fasiten bruker 40.</p>",
          "criteria": [
            "Opptjening 18,1 % av lønnen i 40 år: beholdning 3 620 000.",
            "Deler på delingstallet: 200 888 i året.",
            "Andel av sluttlønn 40,2 %.",
            "Typisk feil: å gange med delingstallet, eller å glemme å dele på det.",
            "Vis utregningen og skriv forutsetningen om lønn under 7,1 G."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>Gjennom arbeidsgiver har han avtale om innskuddspensjon. Den kontoen er på 100 000 ved slutten av 2021. Resten av arbeidstiden vil han få 2 % av lønn oppspart i pensjon. Tjenestepensjonen vil bli delt ut over 10 år.<br>Forventet avkastning er gitt ved følgende formel av ditt nest siste siffer av kandidatnummeret.</p><p><b>Årlig avkastning tjenestepensjon = (Nest siste siffer kandidatnr/100 + 1%)/2</b></p><p>Nest siste siffer på kandidatnummeret kan være mellom 0-9. Er det 5, så vil forventet avkastning være (5/100+1%)/2=3%, er det 0, så får man (0/100+1%)/2=0,5 % avkastning.</p><p>Hva er forventet sluttverdien ved utgangen av 2043 for pensjonen som kommer fra tjenestepensjonen?</p>",
          "solution": "<p><b>Regelen.</b> Sluttverdi = startbeløpet forrentet + sluttverdien av de årlige innskuddene: S = 100 000 × (1 + r)<sup>22</sup> + a × [(1 + r)<sup>22</sup> − 1]/r.</p><p>1. Antall år fra utgangen av 2021 til utgangen av 2043: 22.<br>2. Årlig innskudd: 2 % × 500 000 = 10 000, ved slutten av hvert år 2022–2043.<br>3. r = (siffer/100 + 1 %)/2.</p><p>Eksempel, siffer 5 (r = 3 %): 100 000 × 1,03<sup>22</sup> = 191 610 og 10 000 × (1,03<sup>22</sup> − 1)/0,03 = 305 368. Sum <b>kr 496 978</b>.</p><table class=\"data\"><tr><th>Nest siste siffer</th><th>r</th><th>100 000 · (1+r)<sup>22</sup></th><th>Innskudd med avkastning</th><th>Sluttverdi 2043</th></tr><tr><td class=\"n\">0</td><td class=\"n\">0,5 %</td><td class=\"n\">111 597</td><td class=\"n\">231 944</td><td class=\"n\">343 542</td></tr><tr><td class=\"n\">1</td><td class=\"n\">1,0 %</td><td class=\"n\">124 472</td><td class=\"n\">244 716</td><td class=\"n\">369 187</td></tr><tr><td class=\"n\">2</td><td class=\"n\">1,5 %</td><td class=\"n\">138 756</td><td class=\"n\">258 376</td><td class=\"n\">397 132</td></tr><tr><td class=\"n\">3</td><td class=\"n\">2,0 %</td><td class=\"n\">154 598</td><td class=\"n\">272 990</td><td class=\"n\">427 588</td></tr><tr><td class=\"n\">4</td><td class=\"n\">2,5 %</td><td class=\"n\">172 157</td><td class=\"n\">288 629</td><td class=\"n\">460 786</td></tr><tr><td class=\"n\">5</td><td class=\"n\">3,0 %</td><td class=\"n\">191 610</td><td class=\"n\">305 368</td><td class=\"n\">496 978</td></tr><tr><td class=\"n\">6</td><td class=\"n\">3,5 %</td><td class=\"n\">213 151</td><td class=\"n\">323 289</td><td class=\"n\">536 440</td></tr><tr><td class=\"n\">7</td><td class=\"n\">4,0 %</td><td class=\"n\">236 992</td><td class=\"n\">342 480</td><td class=\"n\">579 472</td></tr><tr><td class=\"n\">8</td><td class=\"n\">4,5 %</td><td class=\"n\">263 365</td><td class=\"n\">363 034</td><td class=\"n\">626 399</td></tr><tr><td class=\"n\">9</td><td class=\"n\">5,0 %</td><td class=\"n\">292 526</td><td class=\"n\">385 052</td><td class=\"n\">677 578</td></tr></table><p><b>Kontroll.</b> Fasiten regner nåverdien først og forrenter den: (100 000 + 10 000 × A<sub>3%,22</sub>) × 1,03<sup>22</sup> = (100 000 + 159 369) × 1,9161 = 496 978. Samme tall.</p>",
          "criteria": [
            "Riktig r for sitt siffer og 22 år (2022–2043).",
            "Årlig innskudd 2 % × 500 000 = 10 000.",
            "Forrenter både startbeløpet og innskuddene: 100 000 × (1 + r)^22 + 10 000 × [(1 + r)^22 − 1]/r.",
            "Typisk feil: å glemme startkontoen, eller å bruke 21 eller 23 år.",
            "Vis utregningen og oppgi sifferet."
          ]
        },
        {
          "label": "c",
          "points": 3,
          "body": "<p>Hvor stor andel av sluttlønn forventes å komme fra tjenestepensjonen?</p>",
          "solution": "<p><b>Regelen.</b> Årlig utbetaling = sluttverdien fordelt over 10 år. Andel = årlig utbetaling/sluttlønn.</p><p>Siffer 5: 496 978/10 = 49 698 i året og 49 698/500 000 = <b>9,94 %</b>. Siffer 0: 34 354 i året, <b>6,87 %</b>.</p><table class=\"data\"><tr><th>Nest siste siffer</th><th>Sluttverdi</th><th>Per år (÷ 10)</th><th>Andel av lønn</th><th>Med annuitet</th></tr><tr><td class=\"n\">0</td><td class=\"n\">343 542</td><td class=\"n\">34 354</td><td class=\"n\">6,87 %</td><td class=\"n\">7,06 %</td></tr><tr><td class=\"n\">1</td><td class=\"n\">369 187</td><td class=\"n\">36 919</td><td class=\"n\">7,38 %</td><td class=\"n\">7,80 %</td></tr><tr><td class=\"n\">2</td><td class=\"n\">397 132</td><td class=\"n\">39 713</td><td class=\"n\">7,94 %</td><td class=\"n\">8,61 %</td></tr><tr><td class=\"n\">3</td><td class=\"n\">427 588</td><td class=\"n\">42 759</td><td class=\"n\">8,55 %</td><td class=\"n\">9,52 %</td></tr><tr><td class=\"n\">4</td><td class=\"n\">460 786</td><td class=\"n\">46 079</td><td class=\"n\">9,22 %</td><td class=\"n\">10,53 %</td></tr><tr><td class=\"n\">5</td><td class=\"n\">496 978</td><td class=\"n\">49 698</td><td class=\"n\">9,94 %</td><td class=\"n\">11,65 %</td></tr><tr><td class=\"n\">6</td><td class=\"n\">536 440</td><td class=\"n\">53 644</td><td class=\"n\">10,73 %</td><td class=\"n\">12,90 %</td></tr><tr><td class=\"n\">7</td><td class=\"n\">579 472</td><td class=\"n\">57 947</td><td class=\"n\">11,59 %</td><td class=\"n\">14,29 %</td></tr><tr><td class=\"n\">8</td><td class=\"n\">626 399</td><td class=\"n\">62 640</td><td class=\"n\">12,53 %</td><td class=\"n\">15,83 %</td></tr><tr><td class=\"n\">9</td><td class=\"n\">677 578</td><td class=\"n\">67 758</td><td class=\"n\">13,55 %</td><td class=\"n\">17,55 %</td></tr></table><p>Fasiten deler sluttverdien likt på 10 år og ser bort fra avkastning under utbetalingen. Det er svaret sensor ventet. Siste kolonne viser hva du får om resten av kontoen forrenter seg videre og utbetalingen er en annuitet over 10 år: høyere, fordi pengene står lenger. Begge er forsvarlige når forutsetningen står.</p><p><b>Kontroll.</b> 10 × 49 698 = 496 978.</p>",
          "criteria": [
            "Deler sluttverdien fra b) på 10 år og på 500 000.",
            "Riktig tall for sitt siffer (siffer 5 gir 9,94 %).",
            "Skriver forutsetningen om utbetalingen (lik deling, eller annuitet med avkastning).",
            "Vis utregningen."
          ]
        },
        {
          "label": "d",
          "points": 3,
          "body": "<p>Hvor stor andel av sluttlønn vil han få dekket av pensjon både fra Folketrygden og tjenestepensjonen?</p>",
          "solution": "<p><b>Regelen.</b> Legg sammen andelene fra a) og c).</p><p>Siffer 5: 40,18 % + 9,94 % = <b>50,12 %</b>. Siffer 0: <b>47,05 %</b>.</p><table class=\"data\"><tr><th>Nest siste siffer</th><th>Folketrygd</th><th>Tjenestepensjon</th><th>Samlet</th></tr><tr><td class=\"n\">0</td><td class=\"n\">40,18 %</td><td class=\"n\">6,87 %</td><td class=\"n\">47,05 %</td></tr><tr><td class=\"n\">1</td><td class=\"n\">40,18 %</td><td class=\"n\">7,38 %</td><td class=\"n\">47,56 %</td></tr><tr><td class=\"n\">2</td><td class=\"n\">40,18 %</td><td class=\"n\">7,94 %</td><td class=\"n\">48,12 %</td></tr><tr><td class=\"n\">3</td><td class=\"n\">40,18 %</td><td class=\"n\">8,55 %</td><td class=\"n\">48,73 %</td></tr><tr><td class=\"n\">4</td><td class=\"n\">40,18 %</td><td class=\"n\">9,22 %</td><td class=\"n\">49,39 %</td></tr><tr><td class=\"n\">5</td><td class=\"n\">40,18 %</td><td class=\"n\">9,94 %</td><td class=\"n\">50,12 %</td></tr><tr><td class=\"n\">6</td><td class=\"n\">40,18 %</td><td class=\"n\">10,73 %</td><td class=\"n\">50,91 %</td></tr><tr><td class=\"n\">7</td><td class=\"n\">40,18 %</td><td class=\"n\">11,59 %</td><td class=\"n\">51,77 %</td></tr><tr><td class=\"n\">8</td><td class=\"n\">40,18 %</td><td class=\"n\">12,53 %</td><td class=\"n\">52,71 %</td></tr><tr><td class=\"n\">9</td><td class=\"n\">40,18 %</td><td class=\"n\">13,55 %</td><td class=\"n\">53,73 %</td></tr></table><p>Kommentar: selv med høyest avkastning dekker pensjonen litt over halvparten av lønnen i de ti første årene og etter ti år faller tjenestepensjonen bort. Minimumsinnskuddet på 2 % gir lite; mer egen sparing trengs om han vil holde forbruket oppe.</p><p><b>Kontroll.</b> Folketrygden er den samme for alle (40,18 %). Bare tjenestepensjonen varierer med sifferet.</p>",
          "criteria": [
            "Summerer a) og c): 40,18 % pluss tjenestepensjonsandelen.",
            "Riktig sum for sitt siffer (siffer 5 gir 50,1 %).",
            "Godt svar: kommenterer at tjenestepensjonen bare varer i ti år."
          ]
        }
      ]
    }
  ]
},
/* Høsten 2020: åpne oppgaver fra før flervalgsformatet. Skrevet etter docs/fie432-eldre-sett-spek.md. */
{
  "id": "h2020",
  "label": "Høsten 2020",
  "date": "2020-12-09",
  "minutes": 240,
  "points": 100,
  "format": "6 oppgaver · 28 ledd · åpne svar og tre flervalg · hjemmeeksamen",
  "note": "<p>Hjemmeeksamen i Wiseflow 9. desember 2020: fire timer med alle hjelpemidler. Svarene var åpne og skulle begrunnes. Originalen oppga ingen poeng. Oppgave 4–6 hadde anbefalt tid 35, 35 og 50 minutter og får her 15, 15 og 20 poeng. Oppgave 1–3 deler de andre 50 poengene etter omfang. Oppgave 2 hadde svaralternativer, men krevde utregning. Her er den lagt inn som flervalg.</p><p>Oppgave 4–6 bruker siffer fra kandidatnummeret, så fasiten er en metode og ikke ett tall. Løsningene viser alle siffer fra 0 til 9.</p><p><b>Gamle satser og regler.</b> Oppjusteringsfaktoren er 1,4 i oppgave 1c (oppgavens tall: den faktiske faktoren i 2020 var 1,44). Inntektsskiftingslikningen i 1e er den eldre formen uten arbeidsgiveravgift. Boliglånsforskriften hadde stresstest på 5 prosentpoeng og egenkapitalkrav på 15 %. I 2026 er faktoren 1,72, stresstesten 3 prosentpoeng med minst 7 % rente og egenkapitalkravet 10 %. Eksamen i 2026 er flervalg med minuspoeng, så bruk settet til å trene rutinene, ikke formatet.</p>",
  "facts": [
    "Hjemmeeksamen 9. desember 2020, 09:00–13:00, levert i Wiseflow.",
    "Seks oppgaver og 28 ledd. Poengene er fordelt etter anbefalt tid og omfang. Originalen oppga ingen poeng.",
    "Oppgave 2 er flervalg uten minuspoeng her, men originalen krevde at du viste utregningen.",
    "Oppgave 4, 5 og 6 bruker siste, nest siste og tredje siste siffer i kandidatnummeret.",
    "Fasiten for oppgave 4–6 er regneark. Alle tallene er regnet på nytt. To trykkfeil i fasitteksten (1c og 2) er rettet.",
    "Løsningene er laget med KI ut fra fasiten og kursmaterialet. Kurset har ikke kontrollert dem."
  ],
  "practiceNote": "Velg tre siffer før du starter, for eksempel 5, 5 og 5. Bruk dem gjennom oppgave 4–6. Skriv forutsetningene i svaret: hvilket siffer, hvilken rente og om kontoen på 100 000 er med. Det var det sensor lette etter.",
  "mc": {
    "wrongFactor": 0
  },
  "exercises": [
    {
      "n": 1,
      "title": "Avskrivning, insidens og utbytteskatt",
      "points": 20,
      "topic": "Skattebegreper og aksjonærmodellen",
      "chapters": [
        2,
        11,
        5,
        1
      ],
      "body": "<p>Oppgave 1 har fem frittstående spørsmål, a–e.</p>",
      "parts": [
        {
          "label": "a",
          "points": 4,
          "body": "<p>Du eier bedriften GrønnPol AS som har et overskudd inneværende år før avskrivninger og skatt på kr 500 000 i år. Du har kjøpt en maskin inneværende år til kr 100 000.  Skatteetaten gir deg følgende fire avskrivningsalternativer. Disse er:</p><p>a) Avskrive maskinen inneværende år med hele beløpet.<br>b) Avskrive maskinen over to år (inneværende og neste år).<br>c) Avskrive maskinen over tre år (inneværende og to neste år)<br>d) Avskrive maskinen over 10 år (inneværende og de ni neste år).</p><p>Hvilket alternativ velger du (begrunn svaret)?</p>",
          "solution": "<p><b>Regelen.</b> Summen av fradrag er den samme i alle fire alternativene: 100 000 kr i avskrivning gir 100 000 × 22 % = 22 000 kr lavere skatt. Det eneste som skiller dem, er <i>når</i> skattebesparelsen kommer. En krone spart i dag er verdt mer enn en krone spart om ti år, så det tidligste fradraget gir høyest nåverdi.</p><p><b>Regnestykket</b> (nåverdi av skattebesparelsen med lineær avskrivning og 5 % diskonteringsrente som eksempel, besparelsen regnet i fradragsåret):</p><table class=\"data\"><tr><th>Alternativ</th><th>Fradrag per år</th><th>Nåverdi av skattebesparelsen</th></tr><tr><td>a) 1 år</td><td class=\"n\">100 000</td><td class=\"n\">22 000</td></tr><tr><td>b) 2 år</td><td class=\"n\">50 000</td><td class=\"n\">21 476</td></tr><tr><td>c) 3 år</td><td class=\"n\">33 333</td><td class=\"n\">20 969</td></tr><tr><td>d) 10 år</td><td class=\"n\">10 000</td><td class=\"n\">17 837</td></tr></table><p>Svaret er <b>a) avskriv hele beløpet i år</b>.</p><p><b>Forutsetningen som må stå.</b> Fradraget må kunne utnyttes med en gang. Det kan det her: overskuddet før avskrivninger er 500 000, langt over 100 000, så hele fradraget går mot årets inntekt. Hadde bedriften gått med underskudd, ville fradraget blitt framført og fordelen ved a) mindre.</p><p><b>Kontroll.</b> Med 3 % rente blir rekkefølgen den samme: 22 000, 21 680, 21 365 og 19 329.</p>",
          "criteria": [
            "Velger a) og begrunner med nåverdi: samme nominelle skattebesparelse (22 000), men tidligst fradrag gir høyest nåverdi.",
            "Peker på at overskuddet (500 000) er større enn avskrivningen, slik at hele fradraget kan utnyttes i år.",
            "Typisk feil: å si at alternativene er like gode fordi summen av fradrag er den samme.",
            "Et regneeksempel med nåverdien av skattebesparelsen trekker opp, men er ikke et krav."
          ]
        },
        {
          "label": "b",
          "points": 4,
          "body": "<p>For å finansiere avviklingen av formuesskatten innfører regjeringen en omsetningsskatt på insulin. Cecilie er diabetiker og må ha insulin. Hun lurer på hvordan skatten vil slå ut på prisen hun betaler for insulin. Redegjør for hva som skjer med prisen Cecilie må betale som følge av skatteøkningen.</p>",
          "solution": "<p><b>Regelen.</b> La P være konsumentprisen og p produsentprisen. Med en skatt t per enhet er P = p + t. Likevekten er D(P) = S(P − t). Deriver med hensyn på t:</p><p>D′(P) · P′(t) = S′(p) · (P′(t) − 1), som gir <b>P′(t) = S′(p)/(S′(p) − D′(P))</b>.</p><p><b>Cecilie.</b> Hun må ha insulin uansett pris, så etterspørselen er fullstendig uelastisk: D′(P) = 0. Da blir P′(t) = S′/S′ = <b>1</b>. Prisen hun betaler stiger med <b>hele skatten</b> og produsentprisen er uendret.</p><p><b>Intuisjonen.</b> Den siden av markedet som har minst mulighet til å vri seg unna, bærer skatten. Når etterspørselen ikke reagerer på pris, kan selgerne velte alt over på kjøperne.</p><p><b>Kontroll.</b> Med fallende etterspørsel (D′ &lt; 0) og stigende tilbud (S′ &gt; 0) ligger P′(t) mellom 0 og 1. Grensetilfellet D′ = 0 gir nøyaktig 1.</p>",
          "criteria": [
            "Setter opp P = p + t og likevekten D(P) = S(P − t).",
            "Utleder P′(t) = S′/(S′ − D′) og viser at P′(t) = 1 når D′ = 0.",
            "Konkluderer med at uelastisk etterspørsel gjør at Cecilie betaler hele skatten.",
            "Typisk feil: å si at skatten deles mellom kjøper og selger uten å bruke at etterspørselen er uelastisk."
          ]
        },
        {
          "label": "c",
          "points": 4,
          "body": "<p>Bedriften GrønnPol har et skattbart overskudd på kr 100.000 og har vedtatt å dele ut hele overskuddet etter skatt som utbytte til sin eneste eier Kjell Grønn. Anta at den alminnelige skattesatsen er 22%, oppjusteringsfaktoren er 1,4 og eierskatten 22%. Hva blir Kjells skattepliktige utbytte?</p>",
          "solution": "<p><b>Regelen.</b> Utbyttet er overskuddet etter selskapsskatt. Skattepliktig utbytte er utbyttet ganget med oppjusteringsfaktoren. Skjerming er ikke oppgitt og settes til null.</p><p>1. Selskapsskatt: 100 000 × 22 % = 22 000.<br>2. Utbytte: 100 000 × (1 − 0,22) = 78 000.<br>3. Skattepliktig utbytte: 78 000 × 1,4 = <b>109 200</b>.</p><p><b>Kontroll.</b> Eierskatten blir 109 200 × 22 % = 24 024, altså 30,8 % av utbyttet (1,4 × 22 %).</p><p><b>Fasiten</b> skriver «78 000 (=100 000*0,22)». Det skal være 100 000 × 0,78. Tallene 78 000 og 109 200 er riktige.</p><p><b>I 2026.</b> Oppjusteringsfaktoren er 1,72 og eierskatten 22 %, så effektiv eierskatt på utbytte over skjerming er 37,84 %.</p>",
          "criteria": [
            "Trekker fra selskapsskatten først: utbytte 78 000.",
            "Oppjusterer utbyttet med 1,4: skattepliktig utbytte 109 200.",
            "Typisk feil: å oppjustere hele overskuddet (140 000) eller å svare med eierskatten (24 024) i stedet for grunnlaget.",
            "Vis utregningen."
          ]
        },
        {
          "label": "d",
          "points": 4,
          "body": "<p>Anette eier bedriften PlusTur som hadde en inntekt før skatt på kr 100 000. Anette har ingen annen inntekt enn den hun får fra å være eneeier av bedriften. Bedriften Plustur har betalt kr 44 000 i alminnelig inntektsskatt og Anette har betalt kr 16 000 i eierskatt. Hva er gjennomsnittsskatten til Anette?</p>",
          "solution": "<p><b>Regelen.</b> Gjennomsnittsskatt = samlet betalt skatt/bruttoinntekt. Anette eier bedriften alene, så både selskapsskatten og eierskatten er skatt på hennes inntekt.</p><p>(44 000 + 16 000)/100 000 = <b>60 %</b>.</p><p><b>Kontroll.</b> Hun sitter igjen med 100 000 − 60 000 = 40 000, altså 40 % av bruttoinntekten.</p><p><b>Merk.</b> Tallene er konstruert: 44 000 tilsvarer 44 % selskapsskatt, ikke 22 %. Oppgaven tester definisjonen. Regn med tallene som er gitt.</p>",
          "criteria": [
            "Tar med både selskapsskatten og eierskatten fordi hun er eneeier.",
            "Deler på bruttoinntekten 100 000: 60 %.",
            "Typisk feil: å bruke bare eierskatten (16 %) eller å dele eierskatten på inntekten etter selskapsskatt.",
            "Vis utregningen."
          ]
        },
        {
          "label": "e",
          "points": 4,
          "body": "<p>Den marginale skattesatsen på arbeid er 47%. Regjeringen har vedtatt å senke eierskatten til 20%, men beholde den alminnelige skattesatsen på 22%. Hva blir effektiv skatt på utbytte hvis regjerningen ønsker at den marginale skattesatsen på arbeid (47%) skal være lik effektiv skatt på bedrift og eier? Anta at hele overskuddet i bedriften etter skatt tas ut som utbytte. Rund av ditt svar slik at det ikke er desimaler i svaret (for eksempel blir 35,2% til 35% og 35,5% blir til 36%).</p>",
          "solution": "<p><b>Regelen (likningen kurset brukte i 2020).</b> Samlet skatt på bedrift og eier skal være lik marginalskatten på arbeid: t<sub>w</sub> = t<sub>A</sub> + (1 − t<sub>A</sub>) × y × t<sub>e</sub>. Her er y oppjusteringsfaktoren og y × t<sub>e</sub> den effektive skatten på utbytte.</p><p>1. 0,47 = 0,22 + 0,78 × y × 0,20.<br>2. y = (0,47 − 0,22)/(0,78 × 0,20) = 0,25/0,156 = 1,6026.<br>3. Effektiv skatt på utbytte: 1,6026 × 20 % = 32,05 % → <b>32 %</b>.</p><p><b>Kontroll.</b> 0,22 + 0,78 × 0,32 = 0,4696 ≈ 47 %. ✓</p><p>Fasiten runder y til 1,6 og får 1,6 × 0,2 = 32 %. Samme svar.</p><p><b>I 2026.</b> Forelesningen bruker nå den nominelle formen med arbeidsgiveravgift: 47,4 % + 12,4 % = 22 % + 22 % × y, som gir y ≈ 1,72. På flervalgstesten 2026 er 1,6 og 32 % fellealternativet.</p>",
          "criteria": [
            "Setter opp 0,47 = 0,22 + (1 − 0,22) × y × 0,20 og løser for y ≈ 1,6.",
            "Svarer med effektiv skatt på utbytte, y × 20 % = 32 %, avrundet til helt tall slik oppgaven ber om.",
            "Typisk feil: å glemme faktoren (1 − 0,22), som gir y = 1,25 og 25 %.",
            "Vis utregningen."
          ]
        }
      ]
    },
    {
      "n": 2,
      "title": "Regnheletiden AS: unntak, kredit og ingen avtale",
      "points": 12,
      "topic": "Internasjonal skatt",
      "chapters": [
        13
      ],
      "body": "<p>Det Ytre-Sandviken baserte aksjeselskapet Regnheletiden AS utviklet en høyteknologisk paraply som ble en braksuksess i det norske markedet. Selskapet økte satsingen i 2019 og opprettet derfor avdelinger (faste driftssteder) i land 1, land 2 og land 3 for lokal distribusjon og salg av paraplyen i egenregi. Legg til grunn følgende opplysninger for skatteåret 2019:</p><ul><li>Skattesatsen i Norge var 22 %.</li><li>Overskudd fra salg gjennom avdeling i land 1 var på 50. Skattesatsen i land 1 var 15 %. Forutsett at det foreligger skatteavtale mellom Norge og land 1 og at skatteavtalen gir anvisning på unntaksmetoden.</li><li>Overskudd fra salg gjennom avdeling i land 2 var på 75. Skattesatsen i land 2 var 30 %. Forutsett at det foreligger skatteavtale mellom Norge og land 2 og at skatteavtalen gir anvisning på den ordinære kreditmetoden.</li><li>Overskudd fra salg gjennom avdeling i land 3 var på 100. Skattesatsen i land 3 var 22 %. Forutsett at det ikke foreligger skatteavtale mellom Norge og land 3.</li><li>Forutsett at det ikke er adgang til å få lempet dobbeltbeskatning etter norsk intern skatterett i tilfeller hvor det ikke foreligger skatteavtale.</li></ul><p>Du får følgende spørsmål:</p>",
      "parts": [
        {
          "label": "a",
          "points": 4,
          "body": "<p>1) Hva ble den samlede totalbeskatning i Norge (hjemstat) og land 1 (kildestat) i 2019 av overskuddet opptjent i land 1? Hva er riktig svar av alternativene under? Vis hvordan du kommer frem til dette.</p>",
          "options": [
            "3,5",
            "7,5",
            "11",
            "18,5"
          ],
          "answer": 1,
          "solution": "<p><b>Regelen.</b> Unntaksmetoden: hjemstaten (Norge) holder inntekten fra det faste driftsstedet utenfor norsk skatt. Bare kildestaten skattlegger.</p><p>1. Skatt i land 1: 50 × 15 % = 7,5.<br>2. Skatt i Norge: 0.<br>3. Samlet: <b>7,5</b>.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>3,5 = 50 × (22 % − 15 %): den norske tilleggsskatten under kreditmetoden. Feil metode.</li><li>11 = 50 × 22 %: bare norsk skatt, som om Norge skattla inntekten og land 1 ikke.</li><li>18,5 = 7,5 + 11: full dobbeltbeskatning, som unntaksmetoden nettopp skal hindre.</li></ul><p><b>Kontroll.</b> Samlet sats 7,5/50 = 15 %, lik kildestatens sats.</p>"
        },
        {
          "label": "b",
          "points": 4,
          "body": "<p>2) Hva ble den samlede beskatning i Norge (hjemstat) og land 2 (kildestat) i 2019 av overskuddet opptjent i land 2? Hva er riktig svar av alternativene under? Vis hvordan du kommer frem til dette.</p>",
          "options": [
            "6",
            "16,5",
            "22,5",
            "39"
          ],
          "answer": 2,
          "solution": "<p><b>Regelen.</b> Ordinær kreditmetode: Norge skattlegger hele inntekten, men gir fradrag (kredit) for skatt betalt i kildestaten. Kreditten er begrenset oppad til den norske skatten på den samme inntekten.</p><p>1. Skatt i land 2: 75 × 30 % = 22,5.<br>2. Norsk skatt før kredit: 75 × 22 % = 16,5.<br>3. Kredit: den laveste av 22,5 og 16,5, altså 16,5. Norsk skatt etter kredit: 16,5 − 16,5 = 0.<br>4. Samlet: <b>22,5</b>.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>6 = 75 × (30 % − 22 %): det den utenlandske skatten overstiger den norske med. Norge betaler ikke tilbake det overskytende.</li><li>16,5 = 75 × 22 %: bare norsk skatt, som om kreditten fjernet skatten i land 2.</li><li>39 = 22,5 + 16,5: dobbeltbeskatning uten kredit.</li></ul><p><b>Kontroll.</b> Med kreditmetoden blir samlet sats den høyeste av de to satsene: 30 % og 75 × 30 % = 22,5.</p><p><b>Fasiten</b> skriver «Land 1; 75*0,3=22,5». Det skal stå land 2.</p>"
        },
        {
          "label": "c",
          "points": 4,
          "body": "<p>3) Hva ble den samlede beskatning i Norge (hjemstat) og land 3 (kildestat) i 2019 av overskuddet opptjent i land 3? Hva er riktig svar av alternativene under? Vis hvordan du kommer frem til dette.</p>",
          "options": [
            "0",
            "12",
            "22",
            "44"
          ],
          "answer": 3,
          "solution": "<p><b>Regelen.</b> Uten skatteavtale og uten lemping etter intern rett skattlegger begge statene hele inntekten.</p><p>1. Skatt i land 3: 100 × 22 % = 22.<br>2. Skatt i Norge: 100 × 22 % = 22.<br>3. Samlet: <b>44</b>.</p><p><b>Hvorfor de andre er feil.</b></p><ul><li>0: ingen skatt noe sted. Begge statene har både rett og grunnlag til å skattlegge.</li><li>12: svarer ikke til noen konsistent regel. Et fyllalternativ.</li><li>22: bare én stat skattlegger, som om det fantes avtale med kredit- eller unntaksmetode.</li></ul><p><b>Kontroll.</b> Samlet sats 44 %, det dobbelte av hver stats sats.</p><p><b>Merk.</b> I virkeligheten gir skatteloven § 16-20 kreditfradrag også uten skatteavtale. Oppgaven ser bort fra det med vilje.</p>"
        }
      ]
    },
    {
      "n": 3,
      "title": "Overskuddsskatt og begrenset rentefradrag",
      "points": 18,
      "topic": "Bedriftens tilpasning",
      "chapters": [
        9
      ],
      "body": "<p>En bedrift har et overskudd gitt ved π(k) = pf(k) − rk, hvor r er rentekostnaden, p er produktprisen og f(k) er produksjonsfunksjonen.  Myndighetene ilegger en skatt på t på bedriftens overskudd.</p>",
      "parts": [
        {
          "label": "a",
          "points": 6,
          "body": "<p>Hvordan påvirker skatten bedriftens bruk av kapital?</p>",
          "solution": "<p><b>Regelen.</b> En skatt på overskuddet er nøytral når skattegrunnlaget er det samme som det økonomiske overskuddet, altså når hele kapitalkostnaden rk kan trekkes fra.</p><p>1. Overskudd etter skatt: (1 − t)[pf(k) − rk].<br>2. Førsteordensbetingelse: (1 − t)[pf′(k) − r] = 0.<br>3. Siden 1 − t &gt; 0: <b>pf′(k) = r</b>.</p><p>t er borte fra betingelsen. Bedriften bruker like mye kapital med og uten skatt. Skatten tar en andel av overskuddet, men flytter ikke punktet der overskuddet er størst.</p><p><b>Kontroll.</b> Uten skatt gir maksimering av pf(k) − rk den samme betingelsen, pf′(k) = r.</p>",
          "criteria": [
            "Maksimerer overskuddet etter skatt, (1 − t)[pf(k) − rk], med hensyn på k.",
            "Viser at førsteordensbetingelsen blir pf′(k) = r, uten t.",
            "Forklarer hvorfor: skattemessig overskudd er lik det virkelige overskuddet fordi hele kapitalkostnaden kan trekkes fra.",
            "Typisk feil: å konkludere med at skatten reduserer investeringene fordi den reduserer overskuddet."
          ]
        },
        {
          "label": "b",
          "points": 8,
          "body": "<p>Skattemyndighetene bestemmer seg for at kun en andel av gjeldsrentene α, hvor 0 &lt; α &lt; 1 kan trekkes fra mot skattepliktig inntekt. Vis hvordan dette påvirker bedriftens investering.</p>",
          "solution": "<p><b>Regelen.</b> Nå er skattegrunnlaget pf(k) − αrk, som er større enn det virkelige overskuddet. Da er skatten ikke lenger nøytral.</p><p>1. Overskudd etter skatt: OV = pf(k) − rk − t[pf(k) − αrk].<br>2. Førsteordensbetingelse: [pf′(k) − r] − t[pf′(k) − αr] = 0.<br>3. Løs for pf′(k): (1 − t)pf′(k) = r(1 − αt), så <b>pf′(k) = r(1 − αt)/(1 − t)</b>.</p><p>Siden α &lt; 1 er 1 − αt &gt; 1 − t og brøken er større enn 1. Kapitalkostnaden bedriften må dekke, er høyere enn r. Med avtagende grenseprodukt (f″ &lt; 0) må pf′(k) opp og det skjer ved at k går <b>ned</b>. Bedriften investerer mindre enn når alle rentene kunne trekkes fra.</p><p><b>Tallillustrasjon.</b> t = 22 % og α = 0,5 gir (1 − 0,11)/0,78 = 1,141. Kapitalkostnaden er 14,1 % høyere enn r.</p><p><b>Kontroll.</b> α = 1 gir pf′(k) = r som i a). α = 0 gir r/(1 − t), den høyeste kapitalkostnaden.</p>",
          "criteria": [
            "Skriver overskuddet etter skatt som pf(k) − rk − t[pf(k) − αrk].",
            "Utleder pf′(k) = r(1 − αt)/(1 − t) og viser at brøken er større enn 1 når 0 < α < 1.",
            "Konkluderer med at kapitalkostnaden øker og at bedriften bruker mindre kapital (avtagende grenseprodukt).",
            "Typisk feil: å gange α med hele overskuddet i stedet for bare med rentefradraget."
          ]
        },
        {
          "label": "c",
          "points": 4,
          "body": "<p>Diskuter kort hvordan en avgrensning av muligheten til å trekke fra bedriftens fulle finansieringskostnader påvirker bruken av gjeld og egenkapital i bedriften.</p>",
          "solution": "<p><b>Hovedpoenget.</b> Alternativkostnaden for egenkapital kan ikke trekkes fra, mens gjeldsrenter kan. Skattesystemet diskriminerer derfor mot egenkapital og gjør gjeld billigere.</p><p><b>Effekten av avgrensningen.</b> Når bare en andel α av rentene kan trekkes fra, blir gjelden dyrere etter skatt. Skattefordelen ved gjeld krymper, så bedriften har mindre grunn til å velge gjeld framfor egenkapital. Så lenge α &gt; 0 er gjeld likevel billigere enn egenkapital.</p><p><b>Kontroll.</b> Kravet til grenseproduktet er r(1 − αt)/(1 − t) ved gjeld og r/(1 − t) ved egenkapital, som er tilfellet α = 0 i b). Forskjellen forsvinner når α går mot null.</p>",
          "criteria": [
            "Hovedpoenget fra fasiten: egenkapitalens alternativkostnad er ikke fradragsberettiget, så skattesystemet favoriserer gjeld.",
            "Ser at avgrensningen gjør gjeld dyrere etter skatt og reduserer skattefordelen ved gjeld.",
            "Sier at gjeld fortsatt er billigst så lenge en del av rentene kan trekkes fra.",
            "Typisk feil: å drøfte risiko og konkurskostnader i stedet for skattemessig behandling. Fasiten vil ha ett poeng."
          ]
        }
      ]
    },
    {
      "n": 4,
      "title": "Kåre: betjeningsevne, femgangeren og stresstesten",
      "points": 15,
      "topic": "Lån",
      "chapters": [
        16
      ],
      "body": "<p>Oppgave 4 (anbefalt tid 35 min)</p><p>Sykepleieren Kåre er singel og har en årlig bruttolønn på 560 000. Skatt, konsum og renter og avdrag til studielån utgjør 60 % av bruttolønn.</p>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Hvor mye av inntekten kan han maksimalt bruke på å betjene lånet?</p>",
          "solution": "<p><b>Regelen.</b> Betjeningsevnen er det som er igjen av bruttolønnen etter skatt, konsum og eksisterende gjeld.</p><p>560 000 × (1 − 0,60) = <b>224 000 kr i året</b>.</p><p>Studielånet er allerede betalt av de 60 %, så hele 224 000 er tilgjengelig for et nytt lån.</p><p><b>Kontroll.</b> 560 000 × 0,60 = 336 000 og 336 000 + 224 000 = 560 000.</p>",
          "criteria": [
            "Regner 40 % av bruttolønnen: 224 000.",
            "Ser at renter og avdrag på studielånet allerede ligger i de 60 %.",
            "Vis utregningen."
          ]
        },
        {
          "label": "b",
          "points": 3,
          "body": "<p>Vi vil nå undersøke hvor mye Kåre kan låne utover det studielånet han allerede har.</p><p>Størrelsen på studielånet er bestemt ut fra kandidatnummeret ditt på eksamen. Kåre sitt studielån er gitt ved følgende formel:</p><p>Studielån = Siste siffer på kandidatnr × 25 000</p><p>Siste siffer på kandidatnummeret kan være mellom 0-9. For eksempel slutter det på 5, så har han 125 000 i studielån, slutter det på 0, så har han ikke studielån.</p><p>Et av kravene i Boliglånsforskriften er at lån ikke skal innvilges hvis kundens samlede gjeld overstiger fem ganger årsinntekt.</p><p>Hvor mye mer enn studielånet kan Kåre maksimalt låne hvis man skal følge kravet om at kundens samlede gjeld ikke kan overstiger fem ganger årsinntekt?</p>",
          "solution": "<p><b>Regelen.</b> Samlet gjeld kan ikke overstige 5 × bruttoinntekt. Nytt lån = gjeldstaket − eksisterende gjeld.</p><p>1. Gjeldstak: 5 × 560 000 = 2 800 000.<br>2. Nytt lån: 2 800 000 − siffer × 25 000.</p><table class=\"data\"><tr><th>Siste siffer</th><th>Studielån</th><th>Gjeldstak</th><th>Nytt lån maks</th></tr><tr><td class=\"n\">0</td><td class=\"n\">0</td><td class=\"n\">2 800 000</td><td class=\"n\">2 800 000</td></tr><tr><td class=\"n\">1</td><td class=\"n\">25 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 775 000</td></tr><tr><td class=\"n\">2</td><td class=\"n\">50 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 750 000</td></tr><tr><td class=\"n\">3</td><td class=\"n\">75 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 725 000</td></tr><tr><td class=\"n\">4</td><td class=\"n\">100 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 700 000</td></tr><tr><td class=\"n\">5</td><td class=\"n\">125 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 675 000</td></tr><tr><td class=\"n\">6</td><td class=\"n\">150 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 650 000</td></tr><tr><td class=\"n\">7</td><td class=\"n\">175 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 625 000</td></tr><tr><td class=\"n\">8</td><td class=\"n\">200 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 600 000</td></tr><tr><td class=\"n\">9</td><td class=\"n\">225 000</td><td class=\"n\">2 800 000</td><td class=\"n\">2 575 000</td></tr></table><p>Med siffer 5: 2 800 000 − 125 000 = <b>2 675 000</b>.</p><p><b>Kontroll.</b> Nytt lån pluss studielån er 2 800 000 for alle siffer.</p>",
          "criteria": [
            "Regner gjeldstaket 5 × 560 000 = 2 800 000.",
            "Trekker fra studielånet: 2 800 000 − siffer × 25 000.",
            "Oppgir hvilket siffer og hvilket studielån som er brukt.",
            "Typisk feil: å bruke 224 000 eller inntekt etter skatt som grunnlag for femgangeren."
          ]
        },
        {
          "label": "c",
          "points": 6,
          "body": "<p>En annen paragraf i Boliglånforskriften sier at 1) banken skal legge inn en renteøkning på 5 prosentpoeng fra det aktuelle rentenivået og 2) avdragsbetalingen skal være lik et annuitetslån med 30 års nedbetalingstid.</p><p>Vis maksimalt lånebeløp på nytt lån hvis dagens rente er 3 %. Vi ser bort fra rentefradraget.</p>",
          "solution": "<p><b>Regelen.</b> Lånet kan ikke være større enn at betjeningsevnen dekker annuiteten ved stresset rente. Maks lån = betjeningsevne × annuitetsfaktor.</p><p>1. Stresset rente: 3 % + 5 prosentpoeng = 8 %.<br>2. Annuitetsfaktor over 30 år: (1 − 1,08<sup>−30</sup>)/0,08 = 11,2578.<br>3. Maks lån: 224 000 × 11,2578 = <b>2 521 743</b>.</p><p>Svaret er det samme for alle siffer, fordi studielånet allerede er betalt av de 60 %. Fasiten nevner at gode kandidater kan påpeke at også studielånet egentlig skulle vært stresstestet.</p><p><b>Kontroll.</b> Annuiteten på 2 521 743 ved 8 % over 30 år er 2 521 743/11,2578 = 224 000.</p><p><b>I 2026.</b> Utlånsforskriften krever nå en renteøkning på 3 prosentpoeng, men minst 7 %. Her gir det 7 %, faktor 12,4090 og maks lån 2 779 625.</p>",
          "criteria": [
            "Legger 5 prosentpoeng på renten: 8 %.",
            "Bruker annuitetsfaktoren over 30 år ved 8 % (11,2578) og ganger med 224 000: 2 521 743.",
            "Typisk feil: å regne med 3 % eller 25 år, eller å bruke bruttolønnen i stedet for betjeningsevnen.",
            "Gode svar nevner at også studielånet egentlig burde vært stresstestet.",
            "Vis utregningen."
          ]
        },
        {
          "label": "d",
          "points": 3,
          "body": "<p>Hvilket av kriteriene, enten b) eller c), er det som gir lavest maksimalt lånebeløp?</p>",
          "solution": "<p><b>Regelen.</b> Det bindende kravet er det som gir lavest lån.</p><table class=\"data\"><tr><th>Siste siffer</th><th>b) femgangeren</th><th>c) stresstesten</th><th>Lavest</th></tr><tr><td class=\"n\">0</td><td class=\"n\">2 800 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">1</td><td class=\"n\">2 775 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">2</td><td class=\"n\">2 750 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">3</td><td class=\"n\">2 725 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">4</td><td class=\"n\">2 700 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">5</td><td class=\"n\">2 675 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">6</td><td class=\"n\">2 650 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">7</td><td class=\"n\">2 625 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">8</td><td class=\"n\">2 600 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr><tr><td class=\"n\">9</td><td class=\"n\">2 575 000</td><td class=\"n\">2 521 743</td><td class=\"n\">c</td></tr></table><p><b>Stresstesten (c) binder for alle siffer.</b> Selv med siffer 9 gir femgangeren 2 575 000, som er 53 257 over stresstesten.</p><p><b>Kontroll.</b> Femgangeren ville bare bundet om studielånet var over 2 800 000 − 2 521 743 = 278 257, altså siffer over 11. Det finnes ikke.</p>",
          "criteria": [
            "Sammenligner tallet fra b) med 2 521 743 for sitt eget siffer.",
            "Konkluderer med at stresstesten (c) gir lavest lånebeløp for alle siffer fra 0 til 9.",
            "Typisk feil: å svare uten å sammenligne de to tallene."
          ]
        }
      ]
    },
    {
      "n": 5,
      "title": "Hilde: folketrygd og innskuddspensjon",
      "points": 15,
      "topic": "Pensjon",
      "chapters": [
        15
      ],
      "body": "<p>Oppgave 5 (anbefalt tid 35 min)</p><p>Hovedkildene for pensjon er Folketrygden og tjenestepensjon.</p><p>Hilde har vært i arbeid siden 2000. Hun tenker å ta ut 100 % alderspensjon fra hun er 67 år i 2043. Vi antar at hun har hatt 500 000 i lønn. Delingstallet for 1976-årskullet ved uttaksalder 67 år er 18,02 (anslag fra 2020).</p>",
      "parts": [
        {
          "label": "a",
          "points": 5,
          "body": "<p>Hvor stor andel av sluttlønn vil komme fra pensjonen fra Folketrygden?</p>",
          "solution": "<p><b>Regelen.</b> Hvert år legges 18,1 % av inntekten (opp til 7,1 G) inn i pensjonsbeholdningen. Ved uttak deles beholdningen på delingstallet. Når lønnen følger lønnsveksten og beholdningen reguleres med samme vekst, kan alt regnes i dagens kroner.</p><p>1. Opptjeningsår: 2043 − 2000 = 43.<br>2. Beholdning: 500 000 × 18,1 % × 43 = 3 891 500.<br>3. Årlig pensjon: 3 891 500/18,02 = 215 954.<br>4. Andel av sluttlønn: 215 954/500 000 = <b>43,2 %</b>.</p><p><b>Kontroll.</b> Snarveien 0,181 × 43/18,02 = 0,4319.</p><p><b>Forutsetninger.</b> 500 000 ligger under 7,1 G (7,1 × 101 351 = 719 592 med G fra mai 2020), så taket binder ikke. Fasiten teller 43 år, slik som her.</p>",
          "criteria": [
            "Regner beholdningen 0,181 × 500 000 × 43 = 3 891 500.",
            "Deler på delingstallet 18,02: 215 954 i året.",
            "Svarer med andel av sluttlønn: 43,2 %.",
            "Typisk feil: å gange med delingstallet i stedet for å dele."
          ]
        },
        {
          "label": "b",
          "points": 4,
          "body": "<p>Gjennom arbeidsgiver har hun avtale om innskuddspensjon. Den kontoen er på 100 000 ved slutten av 2020. Resten av arbeidstiden vil hun få 2 % av lønn oppspart i pensjon. Tjenestepensjonen vil bli delt ut over 10 år.</p><p>Forventet avkastning er gitt ved følgende formel av ditt nest siste siffer av kandidatnummeret.</p><p>Årlig avkastning tjenestepensjon = (Andre siste siffer på kandidatnr/100 + 1%)/2</p><p>Andre siste siffer på kandidatnummeret kan være mellom 0-9. Er sifferet 5, så vil forventet avkastning være (5/100+1)/2 %=3%, er det 0, så har man (0/100+1)/2%=0,5 % avkastning.</p><p>Hva er verdien ved utgangen av 2020 for pensjonen som vil komme fra tjenestepensjonen?</p>",
          "solution": "<p><b>Regelen.</b> Årlig innskudd er 2 % × 500 000 = 10 000 i 23 år (2021–2043). Verdien ved utgangen av 2020 er nåverdien av innskuddene pluss kontoen som allerede står der.</p><p>1. Annuitetsfaktor: (1 − (1 + r)<sup>−23</sup>)/r.<br>2. Nåverdi av innskuddene: 10 000 × faktoren.<br>3. Samlet verdi: 100 000 + nåverdien.</p><table class=\"data\"><tr><th>Siffer</th><th>r</th><th>Faktor 23 år</th><th>Nåverdi innskudd</th><th>Med konto 100 000</th></tr><tr><td class=\"n\">0</td><td class=\"n\">0,5 %</td><td class=\"n\">21,68</td><td class=\"n\">216 757</td><td class=\"n\">316 757</td></tr><tr><td class=\"n\">1</td><td class=\"n\">1,0 %</td><td class=\"n\">20,46</td><td class=\"n\">204 558</td><td class=\"n\">304 558</td></tr><tr><td class=\"n\">2</td><td class=\"n\">1,5 %</td><td class=\"n\">19,33</td><td class=\"n\">193 309</td><td class=\"n\">293 309</td></tr><tr><td class=\"n\">3</td><td class=\"n\">2,0 %</td><td class=\"n\">18,29</td><td class=\"n\">182 922</td><td class=\"n\">282 922</td></tr><tr><td class=\"n\">4</td><td class=\"n\">2,5 %</td><td class=\"n\">17,33</td><td class=\"n\">173 321</td><td class=\"n\">273 321</td></tr><tr><td class=\"n\">5</td><td class=\"n\">3,0 %</td><td class=\"n\">16,44</td><td class=\"n\">164 436</td><td class=\"n\">264 436</td></tr><tr><td class=\"n\">6</td><td class=\"n\">3,5 %</td><td class=\"n\">15,62</td><td class=\"n\">156 204</td><td class=\"n\">256 204</td></tr><tr><td class=\"n\">7</td><td class=\"n\">4,0 %</td><td class=\"n\">14,86</td><td class=\"n\">148 568</td><td class=\"n\">248 568</td></tr><tr><td class=\"n\">8</td><td class=\"n\">4,5 %</td><td class=\"n\">14,15</td><td class=\"n\">141 478</td><td class=\"n\">241 478</td></tr><tr><td class=\"n\">9</td><td class=\"n\">5,0 %</td><td class=\"n\">13,49</td><td class=\"n\">134 886</td><td class=\"n\">234 886</td></tr></table><p>Med siffer 5 (r = 3 %): 10 000 × 16,44 = 164 436. Med kontoen blir det <b>264 436</b>.</p><p><b>Fasiten</b> oppgir bare nåverdien av de nye innskuddene (216 757 for siffer 0 og 164 436 for siffer 5). Kontoen på 100 000 er også en del av pensjonen. Skriv hvilket tall du oppgir.</p><p><b>Kontroll.</b> Høyere avkastning gir lavere nåverdi av de samme innskuddene, fordi diskonteringen blir sterkere.</p>",
          "criteria": [
            "Finner r fra eget siffer og regner årlig innskudd 2 % × 500 000 = 10 000 i 23 år.",
            "Neddiskonterer innskuddene til utgangen av 2020 med annuitetsfaktoren.",
            "Sier tydelig om kontoen på 100 000 er med (fasiten oppgir bare nåverdien av innskuddene).",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 4,
          "body": "<p>Hvor stor andel av sluttlønn vil komme fra tjenestepensjonen? Hint: For å beregne denne sluttverdien kan man se i avsnitt 2.2.1. i Personlig finans boken.</p>",
          "solution": "<p><b>Regelen.</b> Sluttverdien i 2043 er kontoen forrentet i 23 år pluss sluttverdien av innskuddene. Den deles ut over 10 år.</p><p>1. Sluttverdi: 100 000 × (1 + r)<sup>23</sup> + 10 000 × ((1 + r)<sup>23</sup> − 1)/r.<br>2. Årlig utbetaling: sluttverdien/10.<br>3. Andel: utbetalingen/500 000.</p><table class=\"data\"><tr><th>Siffer</th><th>r</th><th>Sluttverdi 2043</th><th>Per år (÷ 10)</th><th>Andel av lønn</th><th>Andel som annuitet</th></tr><tr><td class=\"n\">0</td><td class=\"n\">0,5 %</td><td class=\"n\">355 259</td><td class=\"n\">35 526</td><td class=\"n\">7,1 %</td><td class=\"n\">7,3 %</td></tr><tr><td class=\"n\">1</td><td class=\"n\">1,0 %</td><td class=\"n\">382 879</td><td class=\"n\">38 288</td><td class=\"n\">7,7 %</td><td class=\"n\">8,1 %</td></tr><tr><td class=\"n\">2</td><td class=\"n\">1,5 %</td><td class=\"n\">413 089</td><td class=\"n\">41 309</td><td class=\"n\">8,3 %</td><td class=\"n\">9,0 %</td></tr><tr><td class=\"n\">3</td><td class=\"n\">2,0 %</td><td class=\"n\">446 140</td><td class=\"n\">44 614</td><td class=\"n\">8,9 %</td><td class=\"n\">9,9 %</td></tr><tr><td class=\"n\">4</td><td class=\"n\">2,5 %</td><td class=\"n\">482 305</td><td class=\"n\">48 231</td><td class=\"n\">9,6 %</td><td class=\"n\">11,0 %</td></tr><tr><td class=\"n\">5</td><td class=\"n\">3,0 %</td><td class=\"n\">521 887</td><td class=\"n\">52 189</td><td class=\"n\">10,4 %</td><td class=\"n\">12,2 %</td></tr><tr><td class=\"n\">6</td><td class=\"n\">3,5 %</td><td class=\"n\">565 216</td><td class=\"n\">56 522</td><td class=\"n\">11,3 %</td><td class=\"n\">13,6 %</td></tr><tr><td class=\"n\">7</td><td class=\"n\">4,0 %</td><td class=\"n\">612 650</td><td class=\"n\">61 265</td><td class=\"n\">12,3 %</td><td class=\"n\">15,1 %</td></tr><tr><td class=\"n\">8</td><td class=\"n\">4,5 %</td><td class=\"n\">664 587</td><td class=\"n\">66 459</td><td class=\"n\">13,3 %</td><td class=\"n\">16,8 %</td></tr><tr><td class=\"n\">9</td><td class=\"n\">5,0 %</td><td class=\"n\">721 457</td><td class=\"n\">72 146</td><td class=\"n\">14,4 %</td><td class=\"n\">18,7 %</td></tr></table><p>Med siffer 5: sluttverdi 521 887, 52 189 i året og <b>10,4 %</b> av sluttlønn.</p><p><b>Kontroll.</b> Sluttverdien er verdien fra b) med kontoen, forrentet i 23 år: 264 436 × 1,03<sup>23</sup> = 521 887.</p><p><b>Forutsetning.</b> Fasiten deler sluttverdien likt på 10 år, altså uten avkastning i utbetalingsperioden. Forrentes pengene mens de betales ut (annuitet med første utbetaling etter ett år), blir det 61 181 i året og 12,2 % ved siffer 5. Den siste kolonnen viser den varianten. Si hvilken du bruker.</p>",
          "criteria": [
            "Regner sluttverdien i 2043 med både kontoen på 100 000 og de 23 innskuddene.",
            "Fordeler sluttverdien over 10 år og deler på sluttlønnen 500 000.",
            "Oppgir siffer og forutsetning for utbetalingen (likt fordelt eller annuitet).",
            "Typisk feil: å glemme kontoen på 100 000 eller å fordele nåverdien fra b) i stedet for sluttverdien."
          ]
        },
        {
          "label": "d",
          "points": 2,
          "body": "<p>Hvor stor andel av sluttlønn vil hun få dekket av total pensjon?</p>",
          "solution": "<p><b>Regelen.</b> Total kompensasjonsgrad = andelen fra folketrygden (a) + andelen fra tjenestepensjonen (c).</p><table class=\"data\"><tr><th>Siffer</th><th>Folketrygd</th><th>Tjenestepensjon</th><th>Totalt</th></tr><tr><td class=\"n\">0</td><td class=\"n\">43,2 %</td><td class=\"n\">7,1 %</td><td class=\"n\">50,3 %</td></tr><tr><td class=\"n\">1</td><td class=\"n\">43,2 %</td><td class=\"n\">7,7 %</td><td class=\"n\">50,8 %</td></tr><tr><td class=\"n\">2</td><td class=\"n\">43,2 %</td><td class=\"n\">8,3 %</td><td class=\"n\">51,5 %</td></tr><tr><td class=\"n\">3</td><td class=\"n\">43,2 %</td><td class=\"n\">8,9 %</td><td class=\"n\">52,1 %</td></tr><tr><td class=\"n\">4</td><td class=\"n\">43,2 %</td><td class=\"n\">9,6 %</td><td class=\"n\">52,8 %</td></tr><tr><td class=\"n\">5</td><td class=\"n\">43,2 %</td><td class=\"n\">10,4 %</td><td class=\"n\">53,6 %</td></tr><tr><td class=\"n\">6</td><td class=\"n\">43,2 %</td><td class=\"n\">11,3 %</td><td class=\"n\">54,5 %</td></tr><tr><td class=\"n\">7</td><td class=\"n\">43,2 %</td><td class=\"n\">12,3 %</td><td class=\"n\">55,4 %</td></tr><tr><td class=\"n\">8</td><td class=\"n\">43,2 %</td><td class=\"n\">13,3 %</td><td class=\"n\">56,5 %</td></tr><tr><td class=\"n\">9</td><td class=\"n\">43,2 %</td><td class=\"n\">14,4 %</td><td class=\"n\">57,6 %</td></tr></table><p>Med siffer 5: 43,2 % + 10,4 % = <b>53,6 %</b>.</p><p><b>Kontroll.</b> Svaret ligger mellom 50,3 % (siffer 0) og 57,6 % (siffer 9), som i fasiten. Folketrygden står for over 80 % av pensjonen uansett siffer.</p>",
          "criteria": [
            "Legger sammen andelene fra a) og c).",
            "Oppgir siffer og svar: 53,6 % ved siffer 5, mellom 50,3 % og 57,6 % for de andre.",
            "Følger en eventuell feil fra a) eller c) videre konsistent."
          ]
        }
      ]
    },
    {
      "n": 6,
      "title": "Lise: boligkjøp, belåning og leie til eie",
      "points": 20,
      "topic": "Bolig og belåning",
      "chapters": [
        4,
        16
      ],
      "body": "<p>Oppgave 6 (anbefalt tid 50 min)</p><p>Lise kjøper en bolig til 2,5 mill ved slutt av år 0. Hun har egenkapital på 15 % av kjøpesum. Resten låner hun. Renten er 3 % før skatt. Hun velger et annuitetslån. Det betales ned over 25 år. Rentefradrag er på 22 %.</p>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Hvor mye renter og avdrag betaler hun de første 5 årene?</p>",
          "solution": "<p><b>Regelen.</b> Annuitet A = L × r/(1 − (1 + r)<sup>−n</sup>). Renten er restgjelden ganger 3 % og avdraget er resten av annuiteten.</p><p>1. Lån: 2 500 000 × 85 % = 2 125 000. Egenkapital 375 000.<br>2. Annuitet: 2 125 000 × 0,03/(1 − 1,03<sup>−25</sup>) = 122 034 i året.</p><table class=\"data\"><tr><th>År</th><th>Restgjeld start</th><th>Rente</th><th>Avdrag</th><th>Restgjeld slutt</th></tr><tr><td class=\"n\">1</td><td class=\"n\">2 125 000</td><td class=\"n\">63 750</td><td class=\"n\">58 284</td><td class=\"n\">2 066 716</td></tr><tr><td class=\"n\">2</td><td class=\"n\">2 066 716</td><td class=\"n\">62 001</td><td class=\"n\">60 033</td><td class=\"n\">2 006 683</td></tr><tr><td class=\"n\">3</td><td class=\"n\">2 006 683</td><td class=\"n\">60 200</td><td class=\"n\">61 834</td><td class=\"n\">1 944 849</td></tr><tr><td class=\"n\">4</td><td class=\"n\">1 944 849</td><td class=\"n\">58 345</td><td class=\"n\">63 689</td><td class=\"n\">1 881 161</td></tr><tr><td class=\"n\">5</td><td class=\"n\">1 881 161</td><td class=\"n\">56 435</td><td class=\"n\">65 599</td><td class=\"n\">1 815 561</td></tr><tr><td>Sum</td><td class=\"n\"></td><td class=\"n\">300 732</td><td class=\"n\">309 439</td><td class=\"n\"></td></tr></table><p>Totalt over fem år: <b>610 171</b>, fordelt på renter 300 732 og avdrag 309 439. Etter rentefradraget (22 % × 300 732 = 66 161) koster det 544 010.</p><p><b>Kontroll.</b> 2 125 000 − 309 439 = 1 815 561 i restgjeld, som i fasiten (1 815,6 tusen). Fasiten oppgir summen 610,2 tusen.</p><p><b>I 2026.</b> Egenkapitalkravet er 10 % fra 2025, ikke 15 %.</p>",
          "criteria": [
            "Regner lånet 2 125 000 og annuiteten 122 034.",
            "Fordeler på renter (300 732) og avdrag (309 439), til sammen 610 171.",
            "Typisk feil: å regne rente på hele lånet alle fem år, eller å bruke 2,5 mill som lån.",
            "Vis utregningen."
          ]
        },
        {
          "label": "b",
          "points": 2,
          "body": "<p>La oss si at etter 5 år har boligen steget med 4 prosent årlig.</p><p>Hva er markedsverdi og gevinst på bolig?</p>",
          "solution": "<p>1. Markedsverdi: 2 500 000 × 1,04<sup>5</sup> = <b>3 041 632</b>.<br>2. Gevinst: 3 041 632 − 2 500 000 = <b>541 632</b>.</p><p><b>Kontroll.</b> 1,04<sup>5</sup> = 1,2167, altså 21,7 % samlet stigning.</p><p>Gevinst ved salg av egen bolig er skattefri når botidskravet er oppfylt. Det brukes i d).</p>",
          "criteria": [
            "Markedsverdi 2 500 000 × 1,04^5 = 3 041 632.",
            "Gevinst 541 632.",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 3,
          "body": "<p>Hva er avkastning til egenkapitalen (EK) før skatt?</p>",
          "solution": "<p><b>Regelen.</b> Avkastningen til EK er internrenten på Lises egen kontantstrøm: egenkapitalen ut i år 0, annuitetene ut hvert år og salgsverdi minus restgjeld inn i år 5.</p><p>År 5: −122 034 + 3 041 632 − 1 815 561 = 1 104 037.</p><table class=\"data\"><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><td>Kontantstrøm EK</td><td class=\"n\">−375 000</td><td class=\"n\">−122 034</td><td class=\"n\">−122 034</td><td class=\"n\">−122 034</td><td class=\"n\">−122 034</td><td class=\"n\">1 104 037</td></tr></table><p>Internrenten: <b>6,96 %</b>.</p><p><b>Kontroll.</b> Boligen alene gir 4 % i året. Lånet koster 3 %, så belåningen løfter EK-avkastningen over 4 %.</p><p><b>Forutsetning.</b> Verdien av å bo i boligen (spart leie) er ikke tatt med, slik som i fasiten. Med den blir avkastningen mye høyere.</p>",
          "criteria": [
            "Setter opp kontantstrømmen til EK: −375 000, fem annuiteter og salgsverdi minus restgjeld i år 5.",
            "Finner internrenten 6,96 %.",
            "Typisk feil: å regne (3 041 632 − 1 815 561)/375 000 som om annuitetene ikke var betalt. Det gir 26,7 % i året.",
            "Vis utregningen."
          ]
        },
        {
          "label": "d",
          "points": 2,
          "body": "<p>Hva er avkastning til EK etter skatt?</p>",
          "solution": "<p><b>Regelen.</b> Rentene gir fradrag på 22 % og gevinsten på egen bolig er skattefri. Legg rentefradraget til kontantstrømmen hvert år.</p><table class=\"data\"><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><td>Rentefradrag</td><td class=\"n\"></td><td class=\"n\">14 025</td><td class=\"n\">13 640</td><td class=\"n\">13 244</td><td class=\"n\">12 836</td><td class=\"n\">12 416</td></tr><tr><td>Kontantstrøm EK</td><td class=\"n\">−375 000</td><td class=\"n\">−108 009</td><td class=\"n\">−108 394</td><td class=\"n\">−108 790</td><td class=\"n\">−109 198</td><td class=\"n\">1 116 453</td></tr></table><p>Internrenten: <b>8,96 %</b>.</p><p>Avkastningen etter skatt er høyere enn før skatt fordi rentene gir fradrag mens gevinsten ikke skattlegges.</p><p><b>Kontroll.</b> Rentefradraget over fem år er 66 161 = 22 % av rentesummen 300 732.</p>",
          "criteria": [
            "Legger rentefradraget (22 % av årets renter) til kontantstrømmen hvert år.",
            "Finner internrenten 8,96 %.",
            "Forklarer at avkastningen etter skatt er høyere fordi gevinsten på egen bolig er skattefri mens rentene gir fradrag."
          ]
        },
        {
          "label": "e",
          "points": 2,
          "body": "<p>La oss nå anta at man ikke velger et annuitetslån, men et lån med avdragsfrihet.</p><p>Hva er avkastning til EK etter skatt?</p>",
          "solution": "<p><b>Regelen.</b> Uten avdrag er renten 2 125 000 × 3 % = 63 750 hvert år, eller 63 750 × 0,78 = 49 725 etter fradrag. Hele lånet betales tilbake ved salg.</p><p>År 5 etter skatt: −49 725 + 3 041 632 − 2 125 000 = 866 907.</p><table class=\"data\"><tr><th>År</th><th>0</th><th>1–4</th><th>5</th></tr><tr><td>Før skatt</td><td class=\"n\">−375 000</td><td class=\"n\">−63 750</td><td class=\"n\">852 882</td></tr><tr><td>Etter skatt</td><td class=\"n\">−375 000</td><td class=\"n\">−49 725</td><td class=\"n\">866 907</td></tr></table><p>Internrenten etter skatt: <b>10,27 %</b> (før skatt 7,75 %).</p><p><b>Kontroll.</b> Begge tallene er høyere enn med annuitetslån (8,96 % og 6,96 %), slik f) forklarer.</p>",
          "criteria": [
            "Rente 63 750 per år, 49 725 etter fradrag og hele lånet 2 125 000 tilbakebetales ved salg.",
            "Finner internrenten 10,27 % (7,75 % før skatt).",
            "Vis utregningen."
          ]
        },
        {
          "label": "f",
          "points": 2,
          "body": "<p>Forklar hvorfor det er forskjell på svaret i d) og e).</p>",
          "solution": "<p><b>Belåningseffekten.</b> Boligen gir 4 % i året. Lånet koster 3 % × (1 − 0,22) = 2,34 % etter skatt. Hver krone som er lånt, gir derfor 4 − 2,34 = 1,66 prosentpoeng ekstra til egenkapitalen.</p><p>Med annuitetslån går avdragene til å betale ned gjeld. Hver krone i avdrag gir bare 2,34 % etter skatt (spart rente) og belåningen faller år for år. Med avdragsfrihet står gjelden på 2 125 000 hele tiden og gearingen holdes høy. Derfor blir avkastningen 10,27 % mot 8,96 %.</p><p><b>Baksiden.</b> Høyere gearing gir også høyere risiko. Faller boligprisene, taper egenkapitalen mer med avdragsfrihet.</p>",
          "criteria": [
            "Peker på høyere belåning med avdragsfrihet: gjelden holdes på 2 125 000.",
            "Avkastningen på boligen (4 %) er høyere enn lånerenten etter skatt (2,34 %), så mer gjeld løfter EK-avkastningen.",
            "Gode svar nevner at høyere gearing også gir høyere risiko."
          ]
        },
        {
          "label": "g",
          "points": 2,
          "body": "<p>Lise vurderte også en såkalt «leie til eie» modell for bolig. For eksempel så har Obos en slik modell: https://www.obos.no/privat/ny-bolig/deleie Kjøper du bolig med OBOS Deleie starter du med å eie minst halvparten av boligen selv. Du trenger ikke å øke eierandelen din, men du har mulighet til å gjøre dette én gang i året, inntil du eier hele boligen selv. Du inngår leieavtale med OBOS for den andelen av boligen som OBOS eier og betaler markedsleie for OBOS sin andel. Du disponerer til gjengjeld hele boligen selv.</p><p>La oss si at Lise istedenfor å kjøpe hele boligen, kjøper først 50 % av boligen ved slutten av år 0 og deretter 10 % av boligen ved slutten av hvert år. Hun vil dermed eie den alene etter 5 år. En viktig del av kontrakten er hva hun skal betale for de «nye» andelene av boligen som hun kjøper.</p><p>Vi skal først anta at hun på forhånd avtaler en pris for nye andeler. Vi lar den være lik den generelle boligprisveksten, dvs i dette tilfellet 4 % årlig vekst. Hvor mye må Lise ut med totalt for å eie hele boligen selv? Forklar hvorfor det er en forskjell mellom kjøpspris på 2,5 mill og denne summen.</p>",
          "solution": "<p><b>Regelen.</b> Hun betaler 50 % av 2,5 mill i år 0 og 10 % av boligverdien hvert av årene 1–5, der verdien vokser med 4 %.</p><table class=\"data\"><tr><th>År</th><th>Boligverdi</th><th>Andel</th><th>Betaling</th></tr><tr><td class=\"n\">0</td><td class=\"n\">2 500 000</td><td class=\"n\">50 %</td><td class=\"n\">1 250 000</td></tr><tr><td class=\"n\">1</td><td class=\"n\">2 600 000</td><td class=\"n\">10 %</td><td class=\"n\">260 000</td></tr><tr><td class=\"n\">2</td><td class=\"n\">2 704 000</td><td class=\"n\">10 %</td><td class=\"n\">270 400</td></tr><tr><td class=\"n\">3</td><td class=\"n\">2 812 160</td><td class=\"n\">10 %</td><td class=\"n\">281 216</td></tr><tr><td class=\"n\">4</td><td class=\"n\">2 924 646</td><td class=\"n\">10 %</td><td class=\"n\">292 465</td></tr><tr><td class=\"n\">5</td><td class=\"n\">3 041 632</td><td class=\"n\">10 %</td><td class=\"n\">304 163</td></tr><tr><td>Sum</td><td class=\"n\"></td><td class=\"n\">100 %</td><td class=\"n\">2 658 244</td></tr></table><p>Totalt: <b>2 658 244</b>, altså 158 244 mer enn 2,5 mill.</p><p><b>Hvorfor.</b> Hun kjøper halve boligen senere, til priser som har steget med 4 % i året. Verdistigningen på andelen OBOS eier, tilfaller OBOS. Ved direkte kjøp ville den tilfalt henne.</p><p><b>Kontroll.</b> Neddiskontert med 4 % er nåverdien av betalingene nøyaktig 2 500 000. Forskjellen er bare at pengene betales senere. Hun har til gjengjeld ikke hatt renter på lån for andelene hun ennå ikke har kjøpt, men har betalt markedsleie for dem.</p>",
          "criteria": [
            "Regner 1 250 000 i år 0 og 10 % av boligverdien i år 1–5 med 4 % vekst.",
            "Summerer til 2 658 244.",
            "Forklarer at forskjellen (158 244) er prisstigningen på andelene hun kjøper senere.",
            "Gode svar ser at nåverdien ved 4 % diskonteringsrente er nøyaktig 2 500 000."
          ]
        },
        {
          "label": "h",
          "points": 2,
          "body": "<p>Vi skal nå se på en situasjon hvor prisen på boligandelene følger løpende prisindekser. Vi vil anta at veksten er lik 4 % for alle år unntatt år 1. Formel for prisendring i år 1 er gitt ved</p><p>Prosentvis nedgang i boligpris år 1 = Tredje siste siffer på kandidatnr/100 × 4</p><p>Tredje siste siffer på kandidatnummeret kan være mellom 0-9. Hvis sifferet er 5, så vil boligpris gå ned med 5*4 er lik 20 %, er det 0, så har man verken nedgang eller oppgang.</p><p>Hvor mye må Lise ut med totalt for å eie hele leiligheten selv ved en slik «leie til eie» modell hvor hun betaler løpende priser? Forklare forskjellen mellom prisen i denne oppgaven og fra spørsmål g)</p>",
          "solution": "<p><b>Regelen.</b> Prisen i år 1 er 2 500 000 × (1 − 0,04 × siffer). Deretter vokser den med 4 % i året. Hun betaler 1 250 000 i år 0 og 10 % av løpende pris i år 1–5.</p><table class=\"data\"><tr><th>Tredje siste siffer</th><th>Fall år 1</th><th>Pris år 1</th><th>Pris år 5</th><th>Totalt betalt</th><th>Mot g)</th></tr><tr><td class=\"n\">0</td><td class=\"n\">0 %</td><td class=\"n\">2 500 000</td><td class=\"n\">2 924 646</td><td class=\"n\">2 604 081</td><td class=\"n\">−54 163</td></tr><tr><td class=\"n\">1</td><td class=\"n\">4 %</td><td class=\"n\">2 400 000</td><td class=\"n\">2 807 661</td><td class=\"n\">2 549 917</td><td class=\"n\">−108 326</td></tr><tr><td class=\"n\">2</td><td class=\"n\">8 %</td><td class=\"n\">2 300 000</td><td class=\"n\">2 690 675</td><td class=\"n\">2 495 754</td><td class=\"n\">−162 490</td></tr><tr><td class=\"n\">3</td><td class=\"n\">12 %</td><td class=\"n\">2 200 000</td><td class=\"n\">2 573 689</td><td class=\"n\">2 441 591</td><td class=\"n\">−216 653</td></tr><tr><td class=\"n\">4</td><td class=\"n\">16 %</td><td class=\"n\">2 100 000</td><td class=\"n\">2 456 703</td><td class=\"n\">2 387 428</td><td class=\"n\">−270 816</td></tr><tr><td class=\"n\">5</td><td class=\"n\">20 %</td><td class=\"n\">2 000 000</td><td class=\"n\">2 339 717</td><td class=\"n\">2 333 265</td><td class=\"n\">−324 979</td></tr><tr><td class=\"n\">6</td><td class=\"n\">24 %</td><td class=\"n\">1 900 000</td><td class=\"n\">2 222 731</td><td class=\"n\">2 279 101</td><td class=\"n\">−379 143</td></tr><tr><td class=\"n\">7</td><td class=\"n\">28 %</td><td class=\"n\">1 800 000</td><td class=\"n\">2 105 745</td><td class=\"n\">2 224 938</td><td class=\"n\">−433 306</td></tr><tr><td class=\"n\">8</td><td class=\"n\">32 %</td><td class=\"n\">1 700 000</td><td class=\"n\">1 988 760</td><td class=\"n\">2 170 775</td><td class=\"n\">−487 469</td></tr><tr><td class=\"n\">9</td><td class=\"n\">36 %</td><td class=\"n\">1 600 000</td><td class=\"n\">1 871 774</td><td class=\"n\">2 116 612</td><td class=\"n\">−541 632</td></tr></table><p>Med siffer 5: prisene er 2 000 000, 2 080 000, 2 163 200, 2 249 728 og 2 339 717. Totalt betaler hun <b>2 333 265</b>, 324 979 mindre enn i g).</p><p><b>Forskjellen fra g).</b> I g) er prisbanen låst til 4 % vekst uansett hva markedet gjør. Med løpende priser gjør et prisfall i år 1 at de resterende 50 % blir billigere. Hun bærer markedsrisikoen på andelene hun ennå ikke har kjøpt, men det slår begge veier. Selv med siffer 0 betaler hun mindre enn i g), fordi prisen da står stille i år 1 i stedet for å stige 4 %.</p><p><b>Kontroll.</b> Siffer 5: 1 250 000 + 0,1 × (2 000 000 + 2 080 000 + 2 163 200 + 2 249 728 + 2 339 717) = 2 333 265. Fasiten har 2 333,26 tusen.</p>",
          "criteria": [
            "Bruker eget siffer: prisfall på 4 × siffer prosent i år 1, deretter 4 % vekst.",
            "Summerer 1 250 000 og 10 % av løpende pris i år 1–5 (2 333 265 ved siffer 5).",
            "Forklarer at løpende priser gjør at et prisfall gir billigere andeler, mens avtalt pris i g) låser kjøpet uansett marked."
          ]
        },
        {
          "label": "i",
          "points": 2,
          "body": "<p>Drøft kort «leie til eie» modellen. Ta utgangspunkt i det vi har lært om balansestyring for eiendom.</p>",
          "solution": "<p><b>Balansetanken.</b> Et livslangt boligbehov er en forpliktelse: den som leier, er kort i bolig og taper når boligprisene og leiene stiger. Å eie boligen sikrer forpliktelsen.</p><p><b>Fordeler.</b></p><ul><li>Hun kommer i gang med å dekke forpliktelsen med halve egenkapitalbehovet. Er alternativet å ikke kjøpe i det hele tatt, er det en klar fordel.</li><li>Kjøpene spres over tid, så risikoen for å kjøpe alt på toppen blir mindre.</li></ul><p><b>Ulemper.</b></p><ul><li>I et stigende marked henger hun etter: verdistigningen på OBOS-andelen går til OBOS og hun betaler markedsleie for den.</li><li>Avtalen binder henne langt fram. Boligbehovet kan endre seg med sivilstand, familie og jobb, så fleksibiliteten i avtalen må sjekkes.</li><li>Prisvilkåret avgjør hvem som bærer risikoen: avtalt pris (g) eller løpende pris (h).</li></ul>",
          "criteria": [
            "Bruker balansetanken: boligbehovet er en forpliktelse (kort posisjon i bolig) og eierskap sikrer den.",
            "Fordel: kjøpene spres over tid, så risikoen for å kjøpe på toppen blir mindre og hun kommer i gang med mindre egenkapital.",
            "Ulempe: i et stigende marked henger man etter og avtalen binder en langt fram mens boligbehovet kan endre seg.",
            "Gode svar drøfter prisvilkåret (avtalt eller løpende pris) og hvem som bærer prisrisikoen."
          ]
        }
      ]
    }
  ]
},
/* Høsten 2019: åpne oppgaver fra før flervalgsformatet. Skrevet etter docs/fie432-eldre-sett-spek.md. */
{
  "id": "h2019",
  "label": "Høsten 2019",
  "date": "2019-12-02",
  "minutes": 240,
  "points": 100,
  "format": "9 oppgaver · 21 flervalgsledd og én åpen oppgave · skoleeksamen",
  "note": "Skoleeksamen med to deler: oppgave 1–8 er flervalg med fem alternativer, oppgave 9 er en åpen regne- og skriveoppgave. Schjelderup har oppgave 1–5 (50 %), Nordahl oppgave 6–8 (25 %) og Døskeland oppgave 9 (25 %). Settet oppga råpoeng (20 i skattedelen, 10 i finansdelen); her er de regnet om til 100 poeng og avrundet til hele tall. Satsene er 2019-satser: eierskatt 22 % med oppjusteringsfaktor 1,44 (31,68 %), formuesskatt 0,85 %, primærbolig 25 % og sekundærbolig 90 % av markedsverdien. I 2026 er faktoren 1,72 (37,84 %) og sekundærboligen 100 %. Oppgave 9 er nesten ordrett gjenbrukt som flervalg i H2022 oppgave 5. Flervalgstesten 2026 gjenbruker 1a og 6d. Pass på tre ting i fasiten: 2c gir null bare med avrundede tall, 4 har to sanne alternativer og 8a bruker en definisjon av gjeldsbelastning som ikke står i teksten.",
  "facts": [
    "Skoleeksamen 2. desember 2019, 09:00–13:00, fire timer.",
    "Alle kalkulatorer uten trådløs kommunikasjon og én tospråklig ordbok tillatt.",
    "Oppgave 1–8: flervalg med fem alternativer, riktig svar gir poeng. Settet nevner ikke minuspoeng. Oppgave 9: åpne svar.",
    "Vekter: oppgave 1–5 (Guttorm Schjelderup, skatt) 50 %, 6–8 (Helge A. Nordahl, finans) 25 %, 9 (Trond Døskeland, sparing og atferd) 25 %.",
    "Råpoengene (1 og 3 per spørsmål i skattedelen, 1 per spørsmål i finansdelen) er ganget med 2,5 og avrundet slik at summene stemmer.",
    "Grunnbeløpet G = 100 000 i oppgave 6 er et rundt tall. G var 99 858 fra 1. mai 2019.",
    "Forsiden oppga Mertons aksjeandel w = (1/γ)·(E(R) − R_F)/σ², R_TK·TK = R_D·D + R_EK·EK og nåverdien av en voksende annuitet. Ingen av oppgavene trenger dem. Delingstallene fra forsiden står i oppgave 6."
  ],
  "practiceNote": "Regn ferdig før du ser på alternativene. I 2c treffer du bare null hvis du runder til én desimal underveis, slik oppgaven sier. Oppgave 9 skriver du på papir med utregning før du åpner løsningen.",
  "mc": {
    "wrongFactor": 0
  },
  "exercises": [
    {
      "n": 1,
      "title": "Fritaksmetoden, aksjonærmodellen og skjermingsgrunnlaget",
      "points": 7,
      "topic": "Aksjonærmodellen og fritaksmetoden",
      "chapters": [
        6,
        5
      ],
      "body": "<p>Oppgave 1 (Riktig svar gir 1 poeng pr. spørsmål)</p>",
      "parts": [
        {
          "label": "a",
          "points": 2,
          "body": "<p>Fritaksmetoden innebærer at:</p>",
          "options": [
            "Personer og selskaper fritas for gevinst ved realisasjon av aksjer, andeler og finansielle instrumenter.",
            "Norske aksjeselskaper fritas for gevinst ved realisasjon av aksjer, andeler og finansielle instrumenter.",
            "Aksjeselskaper og enkeltpersonforetak fritas for gevinst ved realisasjon av aksjer, andeler og finansielle instrumenter.",
            "Norske aksjeselskaper og enkeltpersonforetak er fritatt for skatt på aksjeutbytte og for gevinst ved realisasjon av aksjer.",
            "Norske aksjeselskaper er i hovedsak fritatt for skatt på aksjeutbytte og for gevinst ved realisasjon av aksjer. Tap ved realisasjon av aksjer og andeler er på den annen side som utgangspunkt ikke fradragsberettiget."
          ],
          "answer": 4,
          "solution": "<p><b>Regelen.</b> Fritaksmetoden gjelder selskapsaksjonærer, i hovedsak aksjeselskaper. Mottatt utbytte og gevinst på aksjer er skattefritt for selskapet. Tap på aksjer gir tilsvarende ikke fradrag. Personlige aksjonærer skattlegges etter aksjonærmodellen.</p><p>Svaret er <b>(e)</b>: det eneste alternativet som har med utbytte, gevinst og tapsregelen og som begrenser fritaket til aksjeselskaper. «I hovedsak» dekker sjablongregelen: eier selskapet 90 % eller mindre, inntektsføres 3 % av utbyttet.</p><p><b>Hvorfor de andre er gale.</b><br>(a) tar med personer. En personlig aksjonær betaler eierskatt på gevinst over skjermingen.<br>(b) er nærmest, men nevner bare gevinst og verken utbytte eller tapsregelen. «Finansielle instrumenter» er dessuten for vidt: fritaket gjelder aksjer og instrumenter med aksjer som underliggende, ikke for eksempel obligasjoner.<br>(c) og (d) tar med enkeltpersonforetak. Et enkeltpersonforetak er ikke et eget skattesubjekt, så eieren skattlegges som person.</p><p><b>I 2026.</b> Uendret. Flervalgstesten til kursgodkjenning 2026 gjenbruker spørsmålet med nye alternativer.</p>"
        },
        {
          "label": "b",
          "points": 2,
          "body": "<p>Innebærer aksjonærmodellen at:</p>",
          "options": [
            "utbytte og gevinster etter fratrekk for et skjermingsfradrag er skattepliktig som alminnelig inntekt.",
            "utbytte ikke er skattepliktig etter fratrekk fra skjermingsgrunnlaget.",
            "utbytte skal oppjusteres og skattlegges ved eierskatten.",
            "utbytte skattes i sin helhet ved eierskatten.",
            "kun norske aksjonærer skal betale eierskatt."
          ],
          "answer": 0,
          "solution": "<p><b>Regelen.</b> Aksjonærmodellen (fra 2006) skattlegger personlige aksjonærer for utbytte og gevinst som overstiger et skjermingsfradrag. Fradraget er en risikofri normalavkastning på det aksjonæren har betalt for aksjen. Det som overstiger fradraget, er alminnelig inntekt.</p><p>Svaret er <b>(a)</b>. Fra 2016 oppjusteres beløpet over skjermingen før skatten beregnes (faktor 1,44 i 2019), så (a) er strengt tatt den opprinnelige formuleringen fra 2006. Den er likevel det eneste alternativet som har med skjermingen. Skjermingen er kjernen i modellen.</p><p><b>Hvorfor de andre er gale.</b><br>(b) blander skjermingsgrunnlaget med skjermingsfradraget og snur logikken: det er beløpet <i>over</i> fradraget som er skattepliktig.<br>(c) beskriver oppjusteringen, men glemmer skjermingen. Det er bare delen over skjermingsfradraget som oppjusteres.<br>(d) glemmer skjermingen helt.<br>(e) Skatteplikten følger bosted, ikke statsborgerskap. Utenlandske aksjonærer betaler kildeskatt på utbytte.</p><p><b>I 2026.</b> Oppjusteringsfaktoren er 1,72, så effektiv eierskatt er 22 % × 1,72 = 37,84 %.</p>"
        },
        {
          "label": "c",
          "points": 3,
          "body": "<p>Hva er skjermingsgrunnlaget?</p>",
          "options": [
            "Skjermingsgrunnlaget gis ved aksjekursen 31.12 og beregnes pr aksje tillagt aksjens ubenyttede skjermingsfradrag fra tidligere.",
            "Skjermingsgrunnlaget er aksjekursen 1.1 og beregnes pr aksje tillagt aksjens ubenyttede skjermingsfradrag fra tidligere.",
            "Skjermingsgrunnlaget er aksjens salgspris i skatteåret minus skjermingsfradrag.",
            "Skjermingsgrunnlaget er en justert verdi av bedriftens egenkapital.",
            "Skjermingsgrunnlaget er aksjens anskaffelsesverdi (det vederlag aksjonæren i sin tid har gitt for aksjen) tillagt aksjens ubenyttede skjermingsfradrag fra tidligere."
          ],
          "answer": 4,
          "solution": "<p><b>Regelen.</b> Skjermingsgrunnlaget = aksjens inngangsverdi (det du betalte) + ubenyttet skjerming fra tidligere år. Skjermingsfradraget = skjermingsgrunnlaget × skjermingsrenten.</p><p>Svaret er <b>(e)</b>.</p><p><b>Hvorfor de andre er gale.</b><br>(a) og (b) bruker aksjekursen. Kursen bestemmer formuesverdien, ikke skjermingen. Skjermingen er en normalavkastning på det du har betalt, uansett hva aksjen er verdt i dag.<br>(c) blander inn gevinstberegningen, som tar salgspris minus inngangsverdi.<br>(d) blander inn selskapets egenkapital, som er grunnlaget for formuesverdien av unoterte aksjer.</p><p><b>Merk.</b> Ubenyttet skjerming legges til grunnlaget og gir selv skjerming året etter. Derfor står «tillagt ubenyttet skjermingsfradrag» i både (a), (b) og (e). Det er første halvdel av setningen som skiller dem.</p>"
        }
      ]
    },
    {
      "n": 2,
      "title": "Hermines to boliger: formuesverdi og gjeldsfordeling",
      "points": 8,
      "topic": "Formuesskatten",
      "chapters": [
        7
      ],
      "body": "<p>Oppgave 2 (Riktig svar gir 1 poeng pr. spørsmål)</p><p>Hermine har kjøpt en villa til kr 20 mill. med et p-rom areal på 200 kvm som pimærbolig. Hun har også kjøpt en leilighet med p-rom areal på 70 kvm til kr 7 mill. som er hennes sekundærbolig. Begge eiendommene er på Hjellestad. Skatteetatens markedsverdikalkulator bruker en sats på kr 80.000 pr kvm p-rom for villaer på Hjellestad og en sats på kr 90 000 pr kvm p-rom. for leiligheter på Hjellestad.  I forbindelse med kjøpene måtte Hermine låne penger og hun har kr 10 mill. i gjeld. Hermine har ingen annen formue enn de to boligene. Du kan se bort fra bunnfradrag og du kan avrunde dine svar til en desimal. Riktig svar gir 1 poeng.</p>",
      "parts": [
        {
          "label": "a",
          "points": 2,
          "body": "<p>Hva er skatteetatens markedsverdi for primær og sekundærboligen?</p>",
          "options": [
            "Primærbolig kr 16 mill. og sekundærbolig kr 6,3 mill.",
            "Primærbolig kr 15 mill. og sekundærbolig kr 6,5 mill.",
            "Primærbolig kr 16,2 mill. og sekundærbolig kr 6,3 mill.",
            "Primærbolig kr 16 mill. og sekundærbolig kr 6 mill.",
            "Primærbolig kr 10 mill. og sekundærbolig kr 2 mill."
          ],
          "answer": 0,
          "solution": "<p><b>Regelen.</b> Formuesverdien av en bolig bygger på skatteetatens beregnede markedsverdi: kvadratmeterpris × P-rom. Kjøpesummen brukes ikke.</p><p>1. Primærbolig: 200 × 80 000 = <b>kr 16 000 000</b>.<br>2. Sekundærbolig: 70 × 90 000 = <b>kr 6 300 000</b>.</p><p>Svaret er <b>(a)</b>.</p><p><b>Hvorfor de andre er gale.</b> Ingen av (b) til (e) følger av en konsistent regel. (c) og (d) ligger tett på de riktige tallene og fanger den som slurver med ett av produktene. Fellen i teksten er kjøpesummene på 20 og 7 mill.: de er ikke tallene skatten bygger på.</p><p><b>Kontroll.</b> Kalkulatorverdien er 80 % av kjøpesummen for villaen (16/20) og 90 % for leiligheten (6,3/7). At den ligger under kjøpesummen, er vanlig og uten betydning her.</p>"
        },
        {
          "label": "b",
          "points": 3,
          "body": "<p>Hva er ligningsverdi ved formuesskatten for primær og sekundær boligen? Riktig svar gir 1 poeng.</p>",
          "options": [
            "Ligningsverdi på primærboligen kr 5 mill. og ligningsverdien på sekundærboligen kr 5 mill.",
            "Ligningsverdi på primærboligen kr 5 mill. og ligningsverdien på sekundærboligen kr 6 mill.",
            "Ligningsverdi på primærboligen kr 4 mill. og ligningsverdien på sekundærboligen kr 5,2 mill.",
            "Ligningsverdi på primærboligen kr 4,2 mill. og ligningsverdien på sekundærboligen kr 5,7 mill.",
            "Ligningsverdi på primærboligen kr 4 mill. og ligningsverdien på sekundærboligen kr 5,7 mill."
          ],
          "answer": 4,
          "solution": "<p><b>Regelen (2019).</b> Primærbolig verdsettes til 25 % av markedsverdien, sekundærbolig til 90 %.</p><p>1. Primærbolig: 16 000 000 × 0,25 = <b>kr 4 000 000</b>.<br>2. Sekundærbolig: 6 300 000 × 0,9 = 5 670 000 ≈ <b>kr 5,7 mill.</b> med én desimal, som oppgaven tillater.</p><p>Svaret er <b>(e)</b>. Fasiten skriver 5,7 mill.; eksakt er det 5,67 mill.</p><p><b>Hvorfor de andre er gale.</b><br>(a) og (b) har 5 mill. på primærboligen, som er 25 % av kjøpesummen på 20 mill. i stedet for av kalkulatorverdien.<br>(c) har riktig primærverdi, men feil sekundærverdi. 5,2 mill. kan komme av 80 % av 6,5 mill., altså feil markedsverdi og en eldre sats.<br>(d) har riktig sekundærverdi, men 4,2 mill. følger ikke av noen konsistent regel.</p><p><b>I 2026.</b> Sekundærbolig verdsettes til 100 % av markedsverdien. Primærbolig er 25 % opp til 14 mill. og 70 % av verdien over.</p>"
        },
        {
          "label": "c",
          "points": 3,
          "body": "<p>Hva er Hermine sin nettoformue (avrund dine svar til en desimal)? Riktig svar gir 1 poeng.</p>",
          "options": [
            "Hermines nettoformue er kr 1 mill.",
            "Hermines nettoformue er kr 500,000.",
            "Hermines nettoformue er kr 0",
            "Hermines nettoformue er kr 3 mill.",
            "Hermines nettoformue er kr 2 mill."
          ],
          "answer": 2,
          "solution": "<p><b>Regelen.</b> Gjelden fordeles på eiendelene etter andelen av markedsverdien. Gjeld som faller på en eiendel med rabatt, reduseres med samme rabatt. Primærboligen er unntatt: der reduseres ikke gjelden. Slik regner fasiten. Det er rutinen kurset bruker.</p><p>1. Samlet markedsverdi: 16 + 6,3 = 22,3 mill.<br>2. Andeler: 16/22,3 = 71,7 % og 6,3/22,3 = 28,3 %.<br>3. Gjeld på primærboligen: 10 mill. × 0,717 ≈ 7,2 mill. Resten, 2,8 mill., faller på sekundærboligen.<br>4. Sekundærboligen har 10 % rabatt, så gjelden der reduseres til 2,8 × 0,9 ≈ 2,5 mill.<br>5. Nettoformue = 4 + 5,7 − 7,2 − 2,5 = <b>kr 0</b>.</p><p>Svaret er <b>(c)</b>.</p><p><b>Avrundingen avgjør.</b> Nøyaktig null får du bare med tall avrundet til én desimal, slik oppgaven sier. Eksakt blir det 4 000 000 + 5 670 000 − 7 174 888 − 2 542 601 = <b>−47 489 kr</b>. Negativ nettoformue gir ingen formuesskatt. 0 er nærmeste alternativ uansett. Men den som regner eksakt og leter etter et negativt tall, finner det ikke.</p><p><b>Hvorfor de andre er gale.</b> De klassiske feilene gir tall som ligger nær noen av alternativene uten å treffe dem: å redusere all gjeld med 10 % gir 0,7 mill. (nærmest 1 mill.), å fordele gjelden etter ligningsverdi i stedet for markedsverdi gir ca. 0,3 mill. (nærmest 500 000). Å glemme gjeldsreduksjonen gir −0,3 mill. 2 og 3 mill. følger ikke av noen konsistent regel.</p><p><b>Kontroll.</b> 7 174 888 + 2 825 112 = 10 000 000. All gjeld er fordelt.</p><p><b>I 2026.</b> Sekundærboligen verdsettes til 100 % og har ingen rabatt, så gjelden på den trekkes fra fullt ut.</p>"
        }
      ]
    },
    {
      "n": 3,
      "title": "Bob-Kåre: utbytte til formuesskatt og samlet skatt",
      "points": 23,
      "topic": "Aksjonærmodellen og formuesskatten",
      "chapters": [
        8,
        5,
        1
      ],
      "body": "<p>Oppgave 3 (Riktig svar gir 3 poeng pr. spørsmål)</p><p>Bob-Kåre har all sin inntekt fra egen bedrift. Han har en netto formue på kr 100 millioner.  Formuesskatten er 0,85%, den alminnelige skattesatsen er 22%, eierskatten er 22%, og justeringsfaktoren er 1,44. Du kan se bort fra skjermingsgrunnlag. Riktig svar gir 3 poeng.</p>",
      "parts": [
        {
          "label": "a",
          "points": 8,
          "body": "<p>Hvor mye utbytte (D) må Bob-Kåre ta for å kunne betale formuesskatten? Riktig svar gir 3 poeng.</p>",
          "options": [
            "D = kr 1 200 000",
            "D = kr 1 247 100",
            "D = kr 1 244 145",
            "D = kr 1 267 355",
            "D = kr 1 620 100"
          ],
          "answer": 2,
          "solution": "<p><b>Regelen.</b> Utbyttet skattlegges med effektiv eierskatt 22 % × 1,44. Han må ta så mye utbytte at det som er igjen etter eierskatt, dekker formuesskatten: D(1 − t<sub>eff</sub>) = formuesskatt.</p><p>1. Formuesskatt: 100 000 000 × 0,85 % = 850 000.<br>2. Effektiv eierskatt: 0,22 × 1,44 = 0,3168.<br>3. D = 850 000/(1 − 0,3168) = 850 000/0,6832 = <b>kr 1 244 145</b>.</p><p>Svaret er <b>(c)</b>.</p><p><b>Hvorfor de andre er gale.</b> De to typiske feilene står ikke blant alternativene: glemt oppjustering gir 850 000/0,78 = 1 089 744. Å legge skatten oppå i stedet for å bruttoregne gir 850 000 × 1,3168 = 1 119 280. (a), (b), (d) og (e) følger ikke av noen konsistent regnevei. (b) og (d) ligger så nær at avrunding underveis kan føre deg feil, så regn med 0,3168 uavrundet.</p><p><b>Kontroll.</b> Eierskatt 1 244 145 × 0,3168 = 394 145. Igjen: 1 244 145 − 394 145 = 850 000.</p><p><b>I 2026.</b> Effektiv eierskatt er 37,84 % og formuesskattesatsen 1,0 % (1,1 % på formue over 20 mill.), så utbyttet som trengs, blir større.</p>"
        },
        {
          "label": "b",
          "points": 7,
          "body": "<p>Bedriften til Bob-Kåre har et overskudd etter at den alminnelige skattesatsen er betalt på kr 4 millioner og han ønsker å ta hele overskuddet etter skatt som utbytte. Hvor mye betaler han da i skatt på utdelt utbytte? Riktig svar gir 3 poeng.</p>",
          "options": [
            "Skatt på utbytte er kr 1 267 200",
            "Skatt på utbytte er kr 1 367 200",
            "Skatt på utbytte er kr 1 160 120",
            "Skatt på utbytte er kr 1 067 365",
            "Skatt på utbytte er kr 1 223 200"
          ],
          "answer": 0,
          "solution": "<p><b>Regelen.</b> Eierskatt = utbytte × oppjusteringsfaktor × 22 %. Skjermingen ser vi bort fra.</p><p>1. Utbytte: 4 000 000 (hele overskuddet etter selskapsskatt).<br>2. Oppjustert grunnlag: 4 000 000 × 1,44 = 5 760 000.<br>3. Eierskatt: 5 760 000 × 0,22 = <b>kr 1 267 200</b>.</p><p>Svaret er <b>(a)</b>.</p><p><b>Hvorfor de andre er gale.</b> 1 367 200 er riktig svar pluss 100 000, en ren sifferfelle. Glemt oppjustering gir 4 000 000 × 0,22 = 880 000, som ikke står. (c), (d) og (e) følger ikke av noen konsistent regnevei.</p><p><b>Kontroll.</b> Med effektiv sats direkte: 4 000 000 × 0,3168 = 1 267 200.</p><p><b>I 2026.</b> 4 000 000 × 37,84 % = 1 513 600.</p>"
        },
        {
          "label": "c",
          "points": 8,
          "body": "<p>Hvor mye betaler Bob-Kåre i skatt (utbytte og selskapsskatt) i prosent av brutto overskudd i bedriften? Rund av ditt svar til et desimal. Riktig svar gir 3 poeng.</p>",
          "options": [
            "33,7%",
            "33%",
            "45,6%",
            "46,7%",
            "47,7%"
          ],
          "answer": 3,
          "solution": "<p><b>Regelen.</b> Samlet effektiv sats = (selskapsskatt + eierskatt)/overskudd før skatt. Overskuddet på 4 mill. er <i>etter</i> selskapsskatt, så du må først finne overskuddet før skatt.</p><p>1. Overskudd før skatt x: x(1 − 0,22) = 4 000 000, så x = 5 128 205.<br>2. Selskapsskatt: 5 128 205 × 0,22 = 1 128 205.<br>3. Samlet skatt: 1 128 205 + 1 267 200 = 2 395 405.<br>4. Andel: 2 395 405/5 128 205 = 46,71 % ≈ <b>46,7 %</b>.</p><p>Svaret er <b>(d)</b>.</p><p><b>Hvorfor de andre er gale.</b><br>47,7 % = 0,22 + 0,78 × 0,33, altså samme regnestykke med eierskatt 33 % (22 % × 1,5) i stedet for 31,68 %.<br>33 % ligger nær eierskatten alene og glemmer selskapsskatten.<br>33,7 % og 45,6 % følger ikke av noen konsistent regnevei.<br>Å dele på 4 mill. i stedet for overskuddet før skatt gir 59,9 %, som ikke står.</p><p><b>Kontroll.</b> Med satser direkte: 0,22 + 0,78 × 0,3168 = 0,4671.</p><p><b>I 2026.</b> 0,22 + 0,78 × 0,3784 = 51,52 %.</p>"
        }
      ]
    },
    {
      "n": 4,
      "title": "Skattefritt prosjekt og implisitt skatt",
      "points": 2,
      "topic": "Implisitt skatt",
      "chapters": [
        12,
        9
      ],
      "body": "<p>Oppgave 4. (Riktig svar gir 1 poeng)</p><p>Du er investor og kan investere i to prosjekter med lik risiko. Begge prosjektene krever 1 krone i investering. Prosjekt 1 gir avkastning før skatt R<sup>1</sup> mens prosjekt 2 gir avkastning før skatt på R<sup>2</sup>. Regjeringen har bestemt at prosjekt 1 representerer et satsingsområde og at avkastningen derfor skal være skattefri. Prosjekt 2 skal betale t &gt; 0 i skatt på avkastningen og du skal anta at kapitalmarkedet er effisient. Riktig svar gir 1 poeng.</p><p>Hvilke av følgende utsagn er riktig:</p>",
      "options": [
        "R<sup>1</sup> &gt; R<sup>2</sup> (1- t) i likevekt",
        "R<sup>1</sup> = R<sup>2</sup> i likevekt",
        "R<sup>1</sup> &lt; R<sup>2</sup> i likevekt",
        "R<sup>1</sup> &lt; R<sup>2</sup> (1-t) i likevekt",
        "R<sup>1</sup> (1-t) &lt; R<sup>2</sup> i likevekt"
      ],
      "answer": [
        2,
        4
      ],
      "solution": "<p><b>Regelen.</b> Med lik risiko og et effisient kapitalmarked må avkastningen etter skatt bli lik: R<sup>1</sup> = R<sup>2</sup>(1 − t). Skattefritaket kapitaliseres i prisen på prosjekt 1, som derfor gir lavere avkastning før skatt. Forskjellen R<sup>2</sup> − R<sup>1</sup> = tR<sup>2</sup> er den implisitte skatten.</p><p>Med t &gt; 0 (og positiv avkastning) følger <b>R<sup>1</sup> &lt; R<sup>2</sup></b>, alternativ <b>(c)</b>.</p><p><b>Avvik fra fasiten.</b> Fasiten godtar bare (c). Men (e) er også sann i likevekt: R<sup>1</sup>(1 − t) = R<sup>2</sup>(1 − t)<sup>2</sup> &lt; R<sup>2</sup> når R<sup>2</sup> &gt; 0 og 0 &lt; t &lt; 1. Oppgaven spør «hvilke» utsagn som er riktige, så appen godtar begge. (e) er likevel laget som lokkealternativ: den legger skatt på prosjektet som er skattefritt. På eksamen er (c) det trygge svaret.</p><p><b>Hvorfor de andre er gale.</b><br>(a) og (d) er ulikheter som gir arbitrasje: med (a) ville alle investere i prosjekt 1, med (d) i prosjekt 2. Ingen av dem er likevekt.<br>(b) glemmer skatten. Er avkastningen før skatt lik, gir det skattefrie prosjektet mest etter skatt. Da er det heller ikke likevekt.</p><p><b>Kontroll.</b> Med R<sup>2</sup> = 10 % og t = 22 % blir R<sup>1</sup> = 7,8 %. Investoren får 7,8 % etter skatt i begge. Den implisitte skatten er 2,2 prosentpoeng.</p>"
    },
    {
      "n": 5,
      "title": "Stykkskatt: hvor mye stiger konsumentprisen?",
      "points": 10,
      "topic": "Skatteinsidens",
      "chapters": [
        11
      ],
      "body": "<p>Oppgave 5. (Riktig svar gir 4 poeng)</p><p>La etterspørselen (D) i ett markedet være gitt ved D(P), hvor P er konsumentprisen. Tilbudet er gitt ved S(p), hvor p er produsentprisen. Uten skatt er P = p og likevekten gis ved D(P) = S(p). Anta nå at myndighetene innfører en skatt pr enhet solgt og at produsenten skal betale skatten slik at P = p+t.  Hva skjer med konsumentprisen når skatten øker (Finn ∂P/∂t). Riktig svar gir 4 poeng. I svaralternativene under er følgende definisjoner brukt: S′ ≡ ∂S/∂p og D′ ≡ ∂D/∂P</p>",
      "options": [
        "∂P/∂t = −S′/(S′ − D′)",
        "∂P/∂t = S′/(S′ − D′)",
        "∂P/∂t = S′/(D′ + S′)",
        "∂P/∂t = −D′/(S′ − D′)",
        "∂P/∂t = −D′/(D′ − S′)"
      ],
      "answer": 1,
      "solution": "<p><b>Regelen.</b> Skatten driver en kile mellom prisene: p = P − t. Likevekten er derfor D(P) = S(P − t). Vi deriverer begge sider med hensyn på t.</p><p>1. D′ · ∂P/∂t = S′ · (∂P/∂t − 1).<br>2. Samle leddene: ∂P/∂t · (D′ − S′) = −S′.<br>3. <b>∂P/∂t = S′/(S′ − D′)</b>.</p><p>Svaret er <b>(b)</b>.</p><p><b>Tolkning.</b> S′ &gt; 0 og D′ &lt; 0, så 0 &lt; ∂P/∂t &lt; 1: konsumentprisen stiger, men med mindre enn skatten. Konsumentenes andel er større jo mer prisfølsomt tilbudet er og jo mindre prisfølsom etterspørselen er.</p><p><b>Hvorfor de andre er gale.</b><br>(a) har feil fortegn og gir fallende konsumentpris.<br>(c) har feil fortegn i nevneren. D′ + S′ kan bli null eller negativ.<br>(d) −D′/(S′ − D′) = 1 − ∂P/∂t er produsentenes andel av skatten, svaret på et annet spørsmål.<br>(e) −D′/(D′ − S′) = D′/(S′ − D′) = ∂p/∂t, altså endringen i produsentprisen, som er negativ.</p><p><b>Kontroll.</b> Andelene summerer til én: S′/(S′ − D′) + (−D′)/(S′ − D′) = 1. Ekstremtilfellet D′ = 0 (helt uelastisk etterspørsel) gir ∂P/∂t = 1: konsumentene bærer hele skatten.</p>"
    },
    {
      "n": 6,
      "title": "Folketrygd, livssyklus og tjenestepensjon",
      "points": 13,
      "topic": "Pensjon",
      "chapters": [
        15,
        14
      ],
      "body": "<p>Oppgave 6  (hvert riktig svar gir 1 poeng)</p><p>Delingstall fra Nav (oppgitt på forsiden av eksamenssettet): Prognoser for delingstall for årskullene 1958–2040. Utdrag, årskull 1995–2001:</p><table class=\"data\"><tr><th>Uttaksalder (år, mnd. 0)</th><th>1995</th><th>1996</th><th>1997</th><th>1998</th><th>1999</th><th>2000</th><th>2001</th></tr><tr><td class=\"n\">62</td><td class=\"n\">24,14</td><td class=\"n\">24,24</td><td class=\"n\">24,34</td><td class=\"n\">24,43</td><td class=\"n\">24,53</td><td class=\"n\">24,63</td><td class=\"n\">24,72</td></tr><tr><td class=\"n\">63</td><td class=\"n\">23,33</td><td class=\"n\">23,43</td><td class=\"n\">23,53</td><td class=\"n\">23,63</td><td class=\"n\">23,73</td><td class=\"n\">23,82</td><td class=\"n\">23,92</td></tr><tr><td class=\"n\">64</td><td class=\"n\">22,52</td><td class=\"n\">22,62</td><td class=\"n\">22,72</td><td class=\"n\">22,82</td><td class=\"n\">22,92</td><td class=\"n\">23,02</td><td class=\"n\">23,11</td></tr><tr><td class=\"n\">65</td><td class=\"n\">21,71</td><td class=\"n\">21,81</td><td class=\"n\">21,91</td><td class=\"n\">22,01</td><td class=\"n\">22,11</td><td class=\"n\">22,21</td><td class=\"n\">22,30</td></tr><tr><td class=\"n\">66</td><td class=\"n\">20,90</td><td class=\"n\">21,00</td><td class=\"n\">21,10</td><td class=\"n\">21,20</td><td class=\"n\">21,30</td><td class=\"n\">21,39</td><td class=\"n\">21,49</td></tr><tr><td class=\"n\">67</td><td class=\"n\">20,08</td><td class=\"n\">20,18</td><td class=\"n\">20,28</td><td class=\"n\">20,38</td><td class=\"n\">20,48</td><td class=\"n\">20,58</td><td class=\"n\">20,67</td></tr><tr><td class=\"n\">68</td><td class=\"n\">19,26</td><td class=\"n\">19,36</td><td class=\"n\">19,46</td><td class=\"n\">19,56</td><td class=\"n\">19,66</td><td class=\"n\">19,76</td><td class=\"n\">19,85</td></tr><tr><td class=\"n\">69</td><td class=\"n\">18,44</td><td class=\"n\">18,54</td><td class=\"n\">18,64</td><td class=\"n\">18,74</td><td class=\"n\">18,84</td><td class=\"n\">18,94</td><td class=\"n\">19,03</td></tr><tr><td class=\"n\">70</td><td class=\"n\">17,62</td><td class=\"n\">17,72</td><td class=\"n\">17,82</td><td class=\"n\">17,92</td><td class=\"n\">18,02</td><td class=\"n\">18,11</td><td class=\"n\">18,21</td></tr><tr><td class=\"n\">71</td><td class=\"n\">16,80</td><td class=\"n\">16,90</td><td class=\"n\">17,00</td><td class=\"n\">17,10</td><td class=\"n\">17,20</td><td class=\"n\">17,29</td><td class=\"n\">17,39</td></tr><tr><td class=\"n\">72</td><td class=\"n\">15,98</td><td class=\"n\">16,08</td><td class=\"n\">16,18</td><td class=\"n\">16,27</td><td class=\"n\">16,37</td><td class=\"n\">16,47</td><td class=\"n\">16,56</td></tr><tr><td class=\"n\">73</td><td class=\"n\">15,16</td><td class=\"n\">15,26</td><td class=\"n\">15,35</td><td class=\"n\">15,45</td><td class=\"n\">15,55</td><td class=\"n\">15,64</td><td class=\"n\">15,74</td></tr><tr><td class=\"n\">74</td><td class=\"n\">14,34</td><td class=\"n\">14,44</td><td class=\"n\">14,53</td><td class=\"n\">14,63</td><td class=\"n\">14,72</td><td class=\"n\">14,82</td><td class=\"n\">14,91</td></tr><tr><td class=\"n\">75</td><td class=\"n\">13,52</td><td class=\"n\">13,62</td><td class=\"n\">13,71</td><td class=\"n\">13,81</td><td class=\"n\">13,90</td><td class=\"n\">13,99</td><td class=\"n\">14,09</td></tr></table>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Anta at Beate Olsen har en inntekt på 450000 og forventer en lønnsvekst på 4% per år. Beate er 23 år gammel (født i 1996) og forventer å arbeide til hun er 73 år. Samfunnets lønnsvekst i samme periode antas også å være 4%. Hva blir Beate Olsens forventede pensjon fra Folketrygden i % av sluttlønn? Anta at Folketrygdens grunnbeløp er 100 000.</p>",
          "options": [
            "ca 25%",
            "ca 39%",
            "ca 46%",
            "ca 55%",
            "ca 59%"
          ],
          "answer": 4,
          "solution": "<p><b>Regelen.</b> Hvert år legges 18,1 % av inntekt opp til 7,1 G til pensjonsbeholdningen. Beholdningen reguleres med lønnsveksten. Ved uttak er årlig pensjon = beholdning/delingstall. Når lønnen ligger under taket og vokser som G, er kompensasjonsgraden 18,1 % × antall år/delingstall.</p><p>1. Lønnen er 450 000/100 000 = 4,5 G og vokser like raskt som G, så den holder seg under taket på 7,1 G hele yrkeslivet.<br>2. Fra 23 til 73 år er det 50 år med opptjening. Regulert fram til uttak er hvert års opptjening 18,1 % av sluttlønnen, så beholdningen blir 0,181 × 50 = 9,05 ganger sluttlønnen.<br>3. Delingstall for årskull 1996 ved 73 år: 15,26.<br>4. Kompensasjonsgrad = 9,05/15,26 = 59,3 % ≈ <b>ca 59 %</b>.</p><p>Svaret er <b>ca 59 %</b> (alternativ 5 i originalen).</p><p><b>Hvorfor de andre er gale.</b> De ligger nær kompensasjonsgraden med feil delingstall: uttak ved 63 år gir 9,05/23,43 = 38,6 % (ca 39 %), ved 68 år 46,7 % (ca 46 %) og ved 71 til 72 år 53,6 til 56,3 % (ca 55 %). Glemmer du å regulere beholdningen, blir den bare 4,04 ganger sluttlønnen. Da faller kompensasjonsgraden til 26,5 % (nærmest ca 25 %).</p><p><b>Kontroll.</b> Simulert år for år (B = B × 1,04 + 0,181 × lønn) blir beholdningen nøyaktig 9,05 ganger sluttlønnen. Teller du 51 opptjeningsår (både 23 og 73), får du 60,5 %, som fortsatt er nærmest 59 %.</p>"
        },
        {
          "label": "b",
          "points": 2,
          "body": "<p>Anta nå at Beate Olsens lønnsvekst blir høyere enn samfunnets lønnsvekst. Hvordan vil Beate Olsens forventede pensjon fra Folketrygden i % av sluttlønn bli, i forhold til ditt svar fra forrige delspørsmål?</p>",
          "options": [
            "Alltid høyere",
            "Alltid lavere",
            "Alltid likt",
            "Høyere, men bare hvis sluttlønnen ikke overstiger 7,1 ganger folketrygdens grunnbeløp",
            "Lavere hvis sluttlønnen ikke overstiger 7,1 ganger folketrygdens grunnbeløp, ellers likt."
          ],
          "answer": 1,
          "solution": "<p><b>Regelen.</b> Kompensasjonsgraden måler opptjeningen mot sluttlønnen. Vokser egen lønn raskere enn G, er lønnen i de tidlige årene, målt i G, lavere enn sluttlønnen. Hvert tidlig år gir da mindre enn 18,1 % av sluttlønnen. Kommer lønnen over 7,1 G, kutter taket i tillegg. Begge effektene trekker ned.</p><p>Svaret er <b>alltid lavere</b> (alternativ 2 i originalen).</p><p><b>Tallillustrasjon.</b> Med 4,5 % egen lønnsvekst og 4 % i samfunnet ender Beate på 5,7 G, under taket. Kompensasjonsgraden faller da fra 59,3 % til 52,9 %. Med 6 % egen vekst passerer hun taket. Da faller den til 33,2 %.</p><p><b>Hvorfor de andre er gale.</b> «Alltid høyere» og alternativ 4 har feil retning. «Alltid likt» gjelder bare når lønnen vokser som G. Alternativ 5 er halvveis riktig: lavere under taket, men over taket blir det enda lavere, ikke likt.</p>"
        },
        {
          "label": "c",
          "points": 3,
          "body": "<p>Birger Olsen har en pensjonsbeholdning i Folketrygden pr 1.1. på 1 200 000. I løpet av året har han en pensjonsgivende inntekt på 840 000, noe som er 5% mer enn året før. Anta at samfunnets lønnsvekst er 3% og Folketrygdens grunnbeløp er 100 000. Hva er Birger Olsens pensjonsbeholdning ved slutten av året?</p>",
          "options": [
            "1 236 000",
            "1 260 000",
            "1 328 510",
            "1 352 040",
            "1 364 510"
          ],
          "answer": 4,
          "solution": "<p><b>Regelen.</b> B<sub>t</sub> = B<sub>t−1</sub> × (1 + samfunnets lønnsvekst) + 18,1 % × min(inntekt; 7,1 G). Reguler først, legg til årets opptjening etterpå.</p><p>1. Regulering: 1 200 000 × 1,03 = 1 236 000.<br>2. Tak: 7,1 × 100 000 = 710 000 &lt; 840 000, så taket binder. Opptjening: 0,181 × 710 000 = 128 510.<br>3. Beholdning ved årsslutt: 1 236 000 + 128 510 = <b>1 364 510</b>.</p><p>Svaret er <b>1 364 510</b> (alternativ 5 i originalen). Birgers egen lønnsvekst på 5 % brukes ikke. Den er lagt inn for å friste deg til å regulere med feil sats.</p><p><b>Hvorfor de andre er gale.</b><br>1 236 000: bare regulering, glemt opptjening.<br>1 260 000 = 1 200 000 × 1,05: regulert med egen lønnsvekst og glemt opptjening.<br>1 328 510 = 1 200 000 + 128 510: glemt regulering.<br>1 352 040 = 1 200 000 + 0,181 × 840 000: glemt både regulering og tak. (Glemt bare taket gir 1 388 040, som ikke står.)</p><p><b>Kontroll.</b> 128 510/0,181 = 710 000 = 7,1 G.</p>"
        },
        {
          "label": "d",
          "points": 2,
          "body": "<p>Hva er det teoretisk holdbare argumentet for at det kan være gunstigere å ha lavere aksjeandel i en innskuddspensjonsordning jo eldre man blir?</p>",
          "options": [
            "Eldre mennesker er mer risikoaverse og har høyere tapsaversjon.",
            "Eldre mennesker har lavere forventet gjenværende levealder.",
            "Eldre mennesker har høyere pensjonsformue i innskuddsordningen og lavere humankapital.",
            "Eldre mennesker må betale høyere gebyrer i innskuddspensjonsordningen.",
            "Eldre mennesker tenker mer på å etterlate seg arv."
          ],
          "answer": 2,
          "solution": "<p><b>Regelen.</b> Humankapitalen, nåverdien av framtidig lønn, er for de fleste en sikker, obligasjonslignende eiendel. En ung person har stor humankapital og liten finansformue, så en høy aksjeandel i finansformuen gir likevel moderat risiko i den samlede formuen. Med alderen brukes humankapitalen opp og pensjonsformuen vokser. For å holde samme samlede risiko må aksjeandelen i finansformuen ned.</p><p>Svaret er <b>alternativ 3</b> i originalen.</p><p><b>Hvorfor de andre er gale.</b><br>1: Risikoaversjonen er en preferanse, ikke noe som følger av alderen. I Mertons modell er aksjeandelen uavhengig av alder gitt risikoaversjonen. Tapsaversjon er atferd, ikke et teoretisk argument for optimal andel.<br>2: Kortere horisont er ikke i seg selv et argument. Med uavhengige avkastninger gir lang horisont ingen «tidsdiversifisering».<br>4: Gebyrene har ingen alderssammenheng.<br>5: Arvemotiv forlenger heller horisonten og trekker ikke mot lavere aksjeandel.</p><p><b>I 2026.</b> Flervalgstesten til kursgodkjenning 2026 gjenbruker resonnementet (Pernille 30 år mot Petra 60 år).</p>"
        },
        {
          "label": "e",
          "points": 3,
          "body": "<p>Hvilket utsagn er riktig?</p>",
          "options": [
            "Utbetalingen fra innskuddspensjon opphører 10-15 år etter pensjonsalder og gir derfor en dårligere dekning enn ytelsespensjon mot «risikoen» for å leve lenge",
            "Ytelsespensjon vil normalt gi en høyere forventet avkastning enn innskuddspensjon siden forsikringsselskapene har bedre muligheter for å optimalisere investeringene",
            "Ved innskuddspensjon er det forsikringsselskapet som velger hvordan midlene investeres. De fleste forsikringsselskaper vil derfor at flest mulig kunder skal velge innskuddspensjon fremfor ytelsespensjon",
            "Innskuddspensjon gir mer risiko for arbeidsgiver siden arbeidstakere kan velge å investere en større andel av midlene i aksjer",
            "Alle alternativene  er riktige."
          ],
          "answer": 0,
          "solution": "<p><b>Regelen.</b> Ved innskuddspensjon er innskuddet avtalt. Den ansatte bærer avkastningsrisikoen. Beholdningen betales ut over en avtalt periode, i privat sektor som regel rundt ti år. Ytelsespensjon lover en livsvarig ytelse. Arbeidsgiveren bærer risikoen.</p><p>Svaret er <b>alternativ 1</b> i originalen: en tidsbegrenset utbetaling forsikrer ikke mot å leve lenge.</p><p><b>Hvorfor de andre er gale.</b><br>2: Det er ingen grunn til at ytelsesordninger gir høyere forventet avkastning. Leverandøren må garantere ytelsen og investerer heller forsiktigere.<br>3: Ved innskuddspensjon velger den ansatte risikoprofil. Det er hele poenget med ordningen.<br>4: Snur risikofordelingen. Innskuddspensjon flytter risikoen fra arbeidsgiver til arbeidstaker.<br>5: Faller så snart ett av de andre er galt.</p>"
        }
      ]
    },
    {
      "n": 7,
      "title": "Forsikring: betalingsvilje, egenandel og diversifisering",
      "points": 7,
      "topic": "Forsikring",
      "chapters": [
        17
      ],
      "body": "<p>Oppgave 7 (Riktig svar på hvert spørsmål gir 1 poeng)</p>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Anta at Bernhard Olsen har 2 eiendeler; en bankkonto og et hus for utleie. Begge eiendelene er verdt 3 millioner kroner og Bernhard Olsen har ingen humankapital eller andre eiendeler, slik at hans totale formue er 6 millioner kroner. Huset har en risiko for brann på 1,1% og vil i dette tilfelle ha null i  verdi. Bernhard Olsen kan tegne forsikring mot brannskade som utbetaler 3 millioner kroner i tilfelle brann. Hvor mye er han villig til å betale for denne forsikringen dersom nyttefunksjonen hans er U=ln(A), der A er verdien av eiendelene hans?</p>",
          "options": [
            "Mellom 0 og 10000 kroner",
            "Mellom 10000 og 20000 kroner",
            "Mellom 20000 og 30000 kroner",
            "Mellom 30000 og 40000 kroner",
            "Mellom 40000 og 50000 kroner"
          ],
          "answer": 4,
          "solution": "<p><b>Regelen.</b> Maksimal premie π gjør ham indifferent: med forsikring har han 6 mill. − π sikkert. ln(6 mill. − π) skal være lik forventet nytte uten forsikring.</p><p>1. Uten forsikring: E[U] = 0,989 × ln(6 000 000) + 0,011 × ln(3 000 000) = 0,989 × 15,6073 + 0,011 × 14,9141 = 15,59965.<br>2. Sikkerhetsekvivalent: e<sup>15,59965</sup> = 5 954 426.<br>3. π = 6 000 000 − 5 954 426 = <b>45 574 kr</b>.</p><p>Svaret er <b>mellom 40 000 og 50 000 kroner</b> (alternativ 5 i originalen).</p><p><b>Hvorfor de andre er gale.</b> 30 000 til 40 000 inneholder forventet tap, 0,011 × 3 000 000 = 33 000. Det er den aktuarisk rettferdige premien. Den glemmer at en risikoavers person betaler mer enn forventet tap. De tre laveste intervallene ligger under forventet tap. En risikoavers person betaler alltid mer enn det.</p><p><b>Kontroll.</b> Risikopremien er 45 574 − 33 000 = 12 574 &gt; 0, som den skal være med konkav nytte.</p>"
        },
        {
          "label": "b",
          "points": 2,
          "body": "<p>I hvilket av tilfellene under er det gunstig at en forsikringstaker har en egenandel for skader?</p>",
          "options": [
            "Det er bare minimale kostnader forbundet med administrativ behandling av skader (transaksjonskostnader).",
            "Det er stor sannsynlighet for skader (høy frekvens).",
            "Det er stor risiko for at uforsiktig adferd hos forsikringstaker påvirker sannsynligheten for skader (moral hazard).",
            "Forsikringen dekker bare skader med stort skadeomfang.",
            "Forsikringstaker har en solid økonomi, slik at hen har mulig til å betale egenandel."
          ],
          "answer": 2,
          "solution": "<p><b>Regelen.</b> En egenandel lar forsikringstakeren bære en del av skaden selv. Det gir grunn til å være forsiktig. Det er motgiften mot moral hazard. Den andre gode grunnen er høye behandlingskostnader for små skader.</p><p>Svaret er <b>moral hazard</b> (alternativ 3 i originalen).</p><p><b>Hvorfor de andre er gale.</b><br>1: Er transaksjonskostnadene små, faller den andre begrunnelsen for egenandel bort.<br>2: Høy skadefrekvens gir høyere premie, men ingen effektivitetsgevinst av egenandel i seg selv.<br>4: Egenandelen biter på små skader. Dekker forsikringen bare store skader, har den liten funksjon.<br>5: Evne til å betale egenandel er ikke en grunn til å ha den.</p>"
        },
        {
          "label": "c",
          "points": 2,
          "body": "<p>Hvilken av følgende risikoer kan være vanskelige å forsikre på grunn av manglende risikospredning (diversifisering)</p>",
          "options": [
            "Risiko for død som følge av ulykke.",
            "Risiko for brann pga lynnedslag.",
            "Risiko for bilulykke.",
            "Risiko for kreftsykdom.",
            "Risiko for arbeidsledighet."
          ],
          "answer": 4,
          "solution": "<p><b>Regelen.</b> Forsikring virker fordi mange uavhengige risikoer jevner seg ut i en stor portefølje. Er risikoene korrelerte, slår de til samtidig. Da kan selskapet ikke diversifisere dem bort.</p><p>Svaret er <b>arbeidsledighet</b> (alternativ 5 i originalen). Arbeidsledighet følger konjunkturene og rammer mange på én gang i en lavkonjunktur.</p><p><b>Hvorfor de andre er gale.</b> Ulykkesdød, lynnedslag, bilulykker og kreft er i hovedsak individuelle og nesten uavhengige hendelser. De lar seg spre i en stor portefølje. Derfor finnes det private forsikringer for dem.</p>"
        }
      ]
    },
    {
      "n": 8,
      "title": "Gjeldsbelastning og fast mot flytende rente",
      "points": 5,
      "topic": "Lån",
      "chapters": [
        16
      ],
      "body": "<p>Oppgave 8 (Riktig svar på hvert spørsmål gir 1 poeng)</p>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Anta at Petter Olsen har et lån på 3 millioner kroner med en rente på 4%. Lånet er et serielån som tilbakebetales over 20 år. Bruttoinntekten hans er 650000 og han betaler 20% i skatt. Hva blir gjeldsbelastningen?</p>",
          "options": [
            "Ca 12,0",
            "Ca 7,5",
            "Ca 6,2",
            "Ca 5,7",
            "Ca 4,6"
          ],
          "answer": 1,
          "solution": "<p><b>Definisjonen står ikke i oppgaven.</b> Fasiten svarer ca 7,5 og bruker gjeldsbelastning = gjeld/(inntekt etter skatt − renteutgifter). Denne definisjonen står verken i oppgaveteksten eller i fasiten. Alternativene inneholder flere andre rimelige brøker. Den svarer til gjeld delt på disponibel inntekt slik nasjonalregnskapet måler den, der renteutgiftene er trukket fra. Skatten på 20 % er lagt på bruttoinntekten uten hensyn til rentefradraget.</p><p>1. Renter første år: 3 000 000 × 4 % = 120 000. Avdrag: 3 000 000/20 = 150 000.<br>2. Inntekt etter skatt: 650 000 × 0,8 = 520 000.<br>3. Inntekt etter skatt og renter: 520 000 − 120 000 = 400 000.<br>4. Gjeldsbelastning: 3 000 000/400 000 = <b>7,5</b>.</p><p>Svaret er <b>ca 7,5</b> (alternativ 2 i originalen).</p><p><b>Hvorfor de andre er gale.</b> Hvert av dem er gjelden delt på en annen nevner:<br>12,0 = 3 000 000/(520 000 − 120 000 − 150 000): avdraget er også trukket fra.<br>5,7 = 3 000 000/520 000 = 5,77 (inntekt etter skatt) eller 3 000 000/530 000 = 5,66 (brutto minus renter).<br>4,6 = 3 000 000/650 000: gjeld delt på bruttoinntekt.<br>6,2 følger ikke av noen konsistent nevner.</p><p><b>I 2026.</b> Utlånsforskriftens gjeldsgrad er samlet gjeld/bruttoinntekt, høyst 5. Med den definisjonen er svaret 4,6. Får du et slikt spørsmål, les hvilken nevner oppgaven ber om.</p>"
        },
        {
          "label": "b",
          "points": 2,
          "body": "<p>Hvilket utsagn er riktig?</p>",
          "options": [
            "Flytende rente vil alltid være billigst over tid",
            "Fast rente vil alltid være billigst over tid.",
            "Det er gode muligheter til å spare penger hvis man binder renten på et tidspunkt der eksperter sier det er gunstig.",
            "Flytende rente er sikrere enn fast rente dersom man har en jobb som er lite konjunkturutsatt.",
            "Flytende rente ser ut til å gi høyest forventet nytte, men dette kan variere fra person til person."
          ],
          "answer": 4,
          "solution": "<p><b>Regelen.</b> Fast rente inneholder en forsikringspremie, så flytende rente har historisk vært billigst i gjennomsnitt. Valget avhenger likevel av hvor godt låntakeren tåler renteøkninger. Det varierer fra person til person.</p><p>Svaret er <b>alternativ 5</b> i originalen.</p><p><b>Hvorfor de andre er gale.</b><br>1 og 2: «Alltid» faller på ett moteksempel. Hvilken rente som blir billigst, avhenger av renteutviklingen etter at du har bundet.<br>3: Renten i markedet priser allerede inn det ekspertene vet. Det finnes ingen systematisk gevinst ved å time bindingen.<br>4: Snur poenget. Flytende rente virker som en sikring for den som har en <i>konjunkturutsatt</i> jobb, fordi renten gjerne faller når jobbrisikoen slår til. For den med trygg jobb er fast rente den sikre løsningen.</p>"
        }
      ]
    },
    {
      "n": 9,
      "title": "Ole Gunnar: bank eller aksjer med ln-nytte og atferdsavvik",
      "points": 25,
      "topic": "Sparing og finansiell psykologi",
      "chapters": [
        14,
        18
      ],
      "body": "<p>Oppgave 9</p><p>Ole Gunnar sparer langsiktig. Han har en investeringshorisont på 10 år og vil investere 1 000 000.  For å gjøre oppgaven enkelt, vurderer Ole Gunnar to alternativ; banksparing eller aksjer. Vi skal vurdere sparealternativene. Vi ser bort fra skatt i hele oppgaven.</p><p>Det første sparealternativet er bankinnskudd. Etter 10 år forventer Ole Gunnar å sitte igjen med 1 218 994.</p>",
      "parts": [
        {
          "label": "a",
          "points": 2,
          "body": "<p>Hvilken årlig avkastning får Ole Gunnar på innskuddet?</p>",
          "solution": "<p><b>Regelen.</b> Årlig avkastning: r = (W<sub>T</sub>/W<sub>0</sub>)<sup>1/T</sup> − 1.</p><p>1. W<sub>T</sub>/W<sub>0</sub> = 1 218 994/1 000 000 = 1,218994.<br>2. r = 1,218994<sup>1/10</sup> − 1 = 0,0200 = <b>2,0 %</b>.</p><p><b>Kontroll.</b> 1 000 000 × 1,02<sup>10</sup> = 1 218 994. Fasiten (et regneark) har det samme.</p><p>Til senere: aksjealternativet svarer til 8 % i året i gode tider (1,08<sup>10</sup> = 2,158925) og −2 % i dårlige (0,98<sup>10</sup> = 0,817073).</p>",
          "criteria": [
            "Bruker geometrisk snitt: (1 218 994/1 000 000)^(1/10) − 1, ikke 21,9 %/10.",
            "Svarer 2,0 % i året.",
            "Typisk feil: å dele samlet avkastning på antall år, som gir 2,19 %.",
            "Vis utregningen."
          ]
        },
        {
          "label": "b",
          "points": 2,
          "body": "<p>Det andre sparealternativet er aksjer. Dette er et usikkert alternativ, dvs. Ole Gunnar vet ikke med sikkerhet hva han får igjen om 10 år. Vi beskriver usikkerheten med at to scenarioer kan inntreffe. Enten blir perioden preget av gode tider i økonomien, og det forventes høy avkastning på investeringene, eller så blir det dårlige tider, og det forventes lav avkastning. Hvis det blir gode tider, vil han få 2 158 925 om ti år, mens ved dårlige tider, vil han få       817 073. Sannsynligheten for scenarioet med gode tider er 40 %, mens sannsynligheten for dårlige tider er 60 %.</p><p>Hvis Ole Gunnar velger alternativet med aksjer, hva er forventet sluttverdi på investeringen?</p>",
          "solution": "<p><b>Regelen.</b> Forventet sluttverdi = Σ p<sub>i</sub> × W<sub>i</sub>.</p><p>1. 0,4 × 2 158 925 = 863 570.<br>2. 0,6 × 817 073 = 490 244.<br>3. E[W] = 863 570 + 490 244 = <b>1 353 814</b>.</p><p><b>Kontroll.</b> Fasiten har 1 353 814. Forventet sluttverdi er høyere enn bankens 1 218 994, men det avgjør ikke valget når investoren er risikoavers. Det er poenget i c.</p>",
          "criteria": [
            "Vekter de to sluttverdiene med sannsynlighetene 40 % og 60 %.",
            "Svarer 1 353 814.",
            "Typisk feil: å ta et enkelt snitt (50/50), som gir 1 487 999. Det tallet hører til d.",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 4,
          "body": "<p>Som nevnt må Ole Gunnar velge mellom å plassere alt i bankinnskudd eller alt i aksjer. Hvilket alternativ velger han? Begrunn svaret med å vise forventet nytte for alternativene. Vi antar at Ole Gunnar har en nyttefunksjon lik: ln(W), hvor W er sluttverdi.</p>",
          "solution": "<p><b>Regelen.</b> Velg alternativet med høyest forventet nytte E[U] = Σ p<sub>i</sub> × ln(W<sub>i</sub>). Et sikkert alternativ gir ln(W) direkte.</p><p>1. Bank: ln(1 218 994) = <b>14,0135</b>.<br>2. Aksjer: 0,4 × ln(2 158 925) + 0,6 × ln(817 073) = 0,4 × 14,5851 + 0,6 × 13,6135 = 5,8340 + 8,1681 = <b>14,0021</b>.<br>3. 14,0135 &gt; 14,0021, så han velger <b>bankinnskudd</b>.</p><p><b>Tolkning.</b> Aksjene har høyere forventet sluttverdi (1 353 814), men ln-nytte er konkav. Tapet i dårlige tider veier tyngre enn gevinsten i gode. Sikkerhetsekvivalenten til aksjene er e<sup>14,0021</sup> = 1 205 179, under bankens 1 218 994.</p><p><b>Kontroll.</b> Aksjene og banken blir like gode ved p* = (14,0135 − 13,6135)/(14,5851 − 13,6135) = 41,2 % sannsynlighet for gode tider. Med 40 % ligger han like under grensen, så marginen er liten.</p>",
          "criteria": [
            "Regner forventet nytte for begge: bank 14,0135 og aksjer 14,0021.",
            "Konkluderer med bankinnskudd fordi forventet nytte er høyest der.",
            "Forklarer at høyere forventet sluttverdi ikke er nok når nyttefunksjonen er konkav (risikoaversjon).",
            "Typisk feil: å ta ln av forventet sluttverdi, ln(1 353 814) = 14,118, som peker mot aksjer.",
            "Vis utregningen."
          ]
        },
        {
          "label": "d",
          "points": 2,
          "body": "<p>Et avvik eller en bias fra forventet nytte er at vi estimerer feile sannsynligheter for de ulike scenarioene. Vi sier at vi bruker subjektive sannsynligheter istedenfor objektive sannsynligheter.</p><p>La oss anta at Ole Gunnar vurderer sannsynligheten for høy avkastning til å være 50 %, og sannsynligheten for lav avkastning til å være 50 %. Hva blir sluttverdi for de ulike alternativene?</p>",
          "solution": "<p><b>Regelen.</b> Sannsynlighetene endrer ikke utfallene, bare vektene på dem.</p><p><b>Sluttverdiene er de samme som før:</b> bank 1 218 994, aksjer 2 158 925 i gode tider og 817 073 i dårlige. Fasiten svarer at sluttverdien er uavhengig av sannsynlighetene og dermed lik som oppgitt.</p><p>Forventet sluttverdi for aksjene endres derimot: 0,5 × 2 158 925 + 0,5 × 817 073 = <b>1 487 999</b> (mot 1 353 814 med 40/60). Banken er sikker og står på 1 218 994.</p>",
          "criteria": [
            "Sier at sluttverdiene i hvert scenario ikke endres av sannsynlighetene.",
            "Oppgir forventet sluttverdi for aksjene med 50/50: 1 487 999. Banken er uendret på 1 218 994.",
            "Typisk feil: å regne om scenarioverdiene, som om sannsynlighetene påvirket avkastningen i hvert scenario."
          ]
        },
        {
          "label": "e",
          "points": 3,
          "body": "<p>Påvirker endringene av sannsynligheter valget mellom bankinnskudd og aksjefond? Begrunn svaret.</p>",
          "solution": "<p><b>Regelen.</b> Regn forventet nytte på nytt med de subjektive sannsynlighetene.</p><p>1. Aksjer: 0,5 × 14,5851 + 0,5 × 13,6135 = 7,2926 + 6,8067 = <b>14,0993</b>.<br>2. Bank: uendret <b>14,0135</b>.<br>3. 14,0993 &gt; 14,0135, så valget snur til <b>aksjer</b>.</p><p><b>Ja</b>, valget endres. Grensen går ved 41,2 % sannsynlighet for gode tider. Den som overvurderer sannsynligheten for gode tider fra 40 % til 50 %, havner på feil side av grensen og tar mer risiko enn de objektive sannsynlighetene tilsier.</p><p><b>Kontroll.</b> Fasiten har 14,014 og 14,099 og velger aksjer.</p>",
          "criteria": [
            "Regner forventet nytte for aksjer med 50/50: 14,0993.",
            "Sammenligner med bank 14,0135 og konkluderer at valget snur til aksjer.",
            "Knytter resultatet til biasen: feil (subjektive) sannsynligheter gir et annet valg enn de objektive.",
            "Vis utregningen."
          ]
        },
        {
          "label": "f",
          "points": 4,
          "body": "<p>Beskriv kort (max 250 ord) overdreven tro på oss selv (eller «overconfidence»).</p>",
          "solution": "<p><b>Kjernen.</b> Overconfidence betyr at vi overvurderer egen kompetanse i oppgaver som krever dyktighet. Den subjektive sannsynligheten for å lykkes er høyere enn den objektive.</p><p><b>To undergrupper.</b><br>1. <i>Overdreven optimisme</i> (bedre enn snittet): vi tror vi er bedre enn andre. Et kjent eksempel er at om lag 93 % i en undersøkelse mente egen kjøreferdighet var bedre enn medianen. Dette er den vanlige måten å tenke på overconfidence.<br>2. <i>Overpresisjon</i>: vi har for stor tro på egne estimater og setter for smale usikkerhetsintervaller.</p><p><b>Konsekvensen for investorer.</b> Overpresisjon får oss til å handle for mye. Mye handel gir høyere kostnader og lavere avkastning, så de mest overconfidente får lavest avkastning. Menn er i studiene mer overconfidente enn kvinner og får derfor også lavere avkastning.</p><p><b>Kobling til oppgaven.</b> Biasen i d og e er en form for overconfidence: Ole Gunnar setter sannsynligheten for gode tider for høyt og velger aksjer når de objektive sannsynlighetene tilsier bank.</p><p>Fasiten viser til s. 238–240 i læreboka Personlig finans (2014).</p>",
          "criteria": [
            "Definerer overconfidence som at vi overvurderer egen kompetanse eller treffsikkerhet, slik at subjektiv sannsynlighet for å lykkes er høyere enn objektiv.",
            "Skiller mellom overdreven optimisme (bedre enn snittet) og overpresisjon (for smale intervaller).",
            "Forklarer konsekvensen for investorer: for mye handel, høyere kostnader og lavere avkastning.",
            "Gir et eksempel, for eksempel kjøreferdighet eller at menn handler mer enn kvinner.",
            "Holder seg innenfor 250 ord."
          ]
        },
        {
          "label": "g",
          "points": 4,
          "body": "<p>En investor med tapsaversjon (loss aversion), vil vektlegge tap mer enn gevinst. Med tapsaversjon misliker man scenarioer som gir lavere avkastning enn et referansepunkt. Måten vi her får frem at vi misliker tap på, er at vi multipliserer scenarioer med lavere avkastning enn referansepunktet med en faktor lavere enn 1. Dermed blir de dårlige utfallene enda dårligere og gir dermed lav nytteverdi.</p><p>Anta at Ole Gunnar vektlegger nytten av tap med 1/1,03=0,970874 (og ikke som vanlig med 1). Anta fremdeles ln nytte. Anta at Ole Gunnar nå bruker de korrekte (objektive) sannsynlighetene. Vi lar referansepunktet være initial investering, altså 1 000 000.</p><p>Hvordan påvirker Ole Gunnar sin tapsaversjon valget mellom bankinnskudd og aksjefond?</p>",
          "solution": "<p><b>Regelen.</b> Bare utfall under referansepunktet på 1 000 000 får tapsvekten 0,970874. Det er dårlige tider for aksjene (817 073). Banken (1 218 994) og gode tider (2 158 925) ligger over og påvirkes ikke.</p><p>1. Nytte i dårlige tider med tapsvekt: 0,970874 × ln(817 073) = 0,970874 × 13,6135 = 13,2170.<br>2. Aksjer: 0,4 × 14,5851 + 0,6 × 13,2170 = 5,8340 + 7,9302 = <b>13,7642</b>.<br>3. Bank: uendret <b>14,0135</b>.<br>4. 14,0135 &gt; 13,7642, så han velger <b>bankinnskudd</b>.</p><p><b>Tolkning.</b> Med objektive sannsynligheter valgte han bank allerede i c. Tapsaversjonen forsterker valget: avstanden øker fra 0,011 til 0,249 i nytte. Grensen for å velge aksjer flytter seg fra 41,2 % til 58,2 % sannsynlighet for gode tider.</p><p><b>Merk.</b> Å gange ln(W) med en faktor under 1 trekker nytten ned bare fordi ln(W) er positiv her. Det er oppgavens forenkling, ikke en generell modell for tapsaversjon.</p><p><b>Kontroll.</b> Fasiten har 13,217, 13,764 og 14,014 og velger bank.</p>",
          "criteria": [
            "Bruker tapsvekten bare på utfallet under referansepunktet (817 073), ikke på banken eller gode tider.",
            "Regner forventet nytte for aksjer: 13,7642, mot bank 14,0135.",
            "Konkluderer med bankinnskudd og sier at tapsaversjonen forsterker valget fra c (det snur det ikke, for det var bank allerede).",
            "Typisk feil: å bruke 50/50 fra d og e i stedet for de objektive sannsynlighetene.",
            "Vis utregningen."
          ]
        },
        {
          "label": "h",
          "points": 4,
          "body": "<p>Nedenfor er vist en nyttefunksjon som avviker fra standard nyttefunksjon. Forklar de tre avvikene nyttefunksjonen vist nedenfor har i forhold til standard nyttefunksjon. (max 250 ord)</p><p>[Figur: Verdi på den loddrette aksen, Tap til venstre og Gevinst til høyre på den vannrette. Kurven går gjennom origo, er brattere på tapssiden enn på gevinstsiden og krummer motsatt vei på de to sidene.]</p>",
          "solution": "<p>Figuren er prospektteoriens verdifunksjon (Kahneman og Tversky). De tre avvikene fra en standard nyttefunksjon over formue:</p><p><b>1. Referansepunkt.</b> Nytten måles over gevinster og tap i forhold til et referansepunkt, ikke over formuesnivået. Den psykologiske intuisjonen er at det er endringer som betyr noe, ikke nivå: U(x, r) i stedet for U(W).</p><p><b>2. Tapsaversjon.</b> Vi er mer redde for å tape enn glade for å vinne. Kurven har en knekk i origo og er brattere for tap enn for gevinst. Et tap gjør vondt omtrent dobbelt så mye som en like stor gevinst gleder.</p><p><b>3. Avtagende følsomhet.</b> Kurven er konkav over gevinster og konveks over tap. Vi er risikoaverse når vi ligger på gevinstsiden og risikosøkende når vi ligger på tapssiden. Det forklarer disposisjonseffekten: vi selger vinnere for tidlig og holder på tapere i håp om å komme tilbake til null.</p><p>En standard nyttefunksjon som ln(W) har ingen referanse, ingen knekk og er konkav overalt.</p><p>Fasiten viser til s. 235 og utover i læreboka Personlig finans (2014).</p>",
          "criteria": [
            "Referansepunkt: nytten defineres over gevinst og tap i forhold til et referansepunkt, ikke over formuesnivå.",
            "Tapsaversjon: knekk i origo, kurven er brattere for tap enn for gevinst.",
            "Avtagende følsomhet: konkav over gevinster og konveks over tap, altså risikosøkende ved tap.",
            "Knytter minst ett avvik til investoratferd, for eksempel disposisjonseffekten.",
            "Holder seg innenfor 250 ord."
          ]
        }
      ]
    }
  ]
},
/* Høsten 2018: åpne oppgaver fra før flervalgsformatet. Skrevet etter docs/fie432-eldre-sett-spek.md. */
{
  "id": "h2018",
  "label": "Høsten 2018",
  "date": "2018-12-19",
  "minutes": 240,
  "points": 100,
  "format": "7 oppgaver · åpne svar · skoleeksamen",
  "note": "Skoleeksamen på fire timer med kalkulator og rentetabeller. Halvparten er skatt (Guttorm Schjelderup, oppgave 1–4) og halvparten personlig finans og pensjon (Nordahl, oppgave 5–7). Formatet er helt annerledes enn i 2026: åpne svar, en figur å tegne, en derivasjon å føre og en lang regneoppgave om humankapital og karrierevalg. Vektene i prosent er gjort om til 100 poeng; 12,5 % og 7,5 % er rundet til 13, 12 og 8 poeng slik at hver halvdel fortsatt gir 50. Satsene er fra 2018 og 2019: oppjusteringsfaktor 1,44 (1,72 i 2026), sekundærbolig 90 % med gjeldsreduksjon (100 % uten reduksjon i 2026) og IPS-tak kr 40 000 (kr 25 000 i 2026). Delingstallene er NAVs prognose fra 2018. Fasiten selv kaller oppgave 5f en nøtt som går litt utover pensum.",
  "facts": [
    "Skoleeksamen 19. desember 2018, kl. 09.00–13.00.",
    "Hjelpemidler: kalkulator og rentetabeller. Formler og NAVs delingstall lå ved oppgaven.",
    "Vekter: oppgave 1 og 2 12,5 % hver, 3 10 %, 4 15 %, 5 25 %, 6 7,5 % og 7 17,5 %. Her: 13, 12, 10, 15, 25, 8 og 17 poeng.",
    "Satser: alminnelig skatt og eierskatt 22 %, oppjusteringsfaktor 1,44. I 2026 er faktoren 1,72.",
    "Formuesskatt: primærbolig 25 %, sekundærbolig 90 % med 10 % reduksjon av gjelden som tilordnes den. I 2026 er sekundærbolig 100 % uten reduksjon."
  ],
  "practiceNote": "Åpne svar på papir. Regn oppgave 5 med humankapitalen, ikke med årslønnen, så du kan legge arven til i d. Tegn figuren i oppgave 3 selv før du leser løsningen.",
  "exercises": [
    {
      "n": 1,
      "title": "Utleie, Cecilies formue og progressivitet",
      "points": 13,
      "topic": "Bolig, formuesskatt og progressivitet",
      "chapters": [
        4,
        7,
        10
      ],
      "body": "<p><i>Oppgave 1 teller 12,5 % av eksamen. Tre korte spørsmål.</i></p>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Er utleie av deler av egen bolig skattefri? Svaret skal være kort.</p>",
          "solution": "<p><b>Regelen.</b> Ja, så lenge du selv bruker minst halvparten av boligen, målt etter utleieverdi. Da er leieinntekten skattefri. Leier du ut mer enn halvparten av utleieverdien, blir hele leieinntekten skattepliktig.</p><p>Fasiten: «Utleie av egen bolig er skattefritt så lenge man ikke leier ut mer enn 50% av utleieverdien.»</p><p><b>I 2026.</b> Halvparten-regelen gjelder fortsatt.</p>",
          "criteria": [
            "Svarer ja, skattefritt.",
            "Nevner vilkåret: du leier ikke ut mer enn halvparten, målt etter utleieverdi (ikke areal).",
            "Kort svar er nok; oppgaven ber om det."
          ]
        },
        {
          "label": "b",
          "points": 6,
          "body": "<p>Cecilie eier en primærbolig med markedsverdi på kr 10 mill. og en sekundærbolig med markedsverdi kr 10 mill., og hun har samtidig gjeld på kr 10 mill. Hva er hennes netto formue. Du kan se bort fra bunnfradraget.</p>",
          "solution": "<p><b>Regelen (2018).</b> Primærbolig verdsettes til 25 %, sekundærbolig til 90 %. Gjelden fordeles forholdsmessig etter markedsverdi. Gjelden som tilordnes sekundærboligen, reduseres med 10 %. Gjelden som tilordnes primærboligen, reduseres ikke.</p><p>1. Primærbolig: 10 × 0,25 = 2,5 mill.<br>2. Sekundærbolig: 10 × 0,9 = 9,0 mill.<br>3. Gjeldsfordeling: 10/20 = 50 % til hver, altså 5 mill. til hver bolig.<br>4. Fradragsberettiget gjeld: 5 (primær) + 5 × 0,9 = 4,5 (sekundær) = 9,5 mill.<br>5. Nettoformue = 2,5 + 9 − 5 − 4,5 = <b>kr 2,0 mill.</b></p><p><b>Fasiten</b> skriver «(sekundær: 1+*,9)». Det er en trykkfeil for 10 × 0,9; tallet 9 mill. er riktig.</p><p><b>Kontroll.</b> Uten gjeldsreduksjon blir det 2,5 + 9 − 10 = 1,5 mill. Reduksjonen på 0,5 mill. (10 % av 5 mill.) gir 2,0 mill.</p><p><b>I 2026.</b> Sekundærbolig verdsettes til 100 % og gjelden reduseres ikke: 2,5 + 10 − 10 = 2,5 mill. Primærbolig er fortsatt 25 % (under 14 mill.).</p>",
          "criteria": [
            "Riktige verdsettinger: primærbolig 25 % (2,5 mill.) og sekundærbolig 90 % (9 mill.).",
            "Fordeler gjelden 50/50 etter markedsverdi og reduserer bare sekundærboligens del med 10 %.",
            "Svar: 2,0 mill.",
            "Typisk feil: å redusere også gjelden til primærboligen, eller å trekke fra hele gjelden uten reduksjon (1,5 mill.).",
            "Vis utregningen post for post."
          ]
        },
        {
          "label": "c",
          "points": 4,
          "body": "<p>Hva menes med at skattesystemet er progressivt</p>",
          "solution": "<p><b>Regelen.</b> Definer gjennomsnittsskatten t = T/Y, der T er betalt skatt og Y er bruttoinntekt. Skattesystemet er progressivt hvis gjennomsnittsskatten stiger med inntekten:</p><p>∂t/∂Y = ∂(T/Y)/∂Y = (T′(Y) · Y − T)/Y<sup>2</sup> &gt; 0, som er det samme som T′(Y) &gt; T/Y.</p><p>Marginalskatten ligger altså over gjennomsnittsskatten. Det er andelen som avgjør, ikke kronebeløpet: en flat sats gir flere kroner fra den som tjener mest, men er ikke progressiv.</p><p><b>Eksempel.</b> Flat sats 25 % med bunnfradrag kr 100 000. Y = 200 000 gir T = 25 000 og t = 12,5 %. Y = 400 000 gir T = 75 000 og t = 18,75 %. Gjennomsnittsskatten stiger, så systemet er progressivt.</p><p>De beste besvarelsene viser formlene og sier at et progressivt system omfordeler inntekt fra rike til fattige.</p>",
          "criteria": [
            "Definerer gjennomsnittsskatten t = T/Y.",
            "Progressivt betyr at t stiger med Y: ∂(T/Y)/∂Y > 0, eller marginalskatt over gjennomsnittsskatt.",
            "Sier at systemet omfordeler fra høy til lav inntekt.",
            "Typisk feil: å si at de rike betaler flere kroner. Det gjør de også med flat skatt."
          ]
        }
      ]
    },
    {
      "n": 2,
      "title": "Peder Ås og K2H: utbytte og samlet skatt",
      "points": 12,
      "topic": "Aksjonærmodellen",
      "chapters": [
        5,
        1
      ],
      "body": "<p>Peder Ås driver bedriften K2H og har driftsinntekter på kr 100 mill. og kostnader på kr 50 mill. Den alminnelige skattesatsen er 22%, eierskatten er 22% og justeringsfaktoren ved beskatning av utbytte er 1,44. Det er ingen avskrivninger eller andre poster i regnskapet og overskuddet i selskapet deles ut i sin helhet til eierne som utbytte.</p>",
      "parts": [
        {
          "label": "a",
          "points": 3,
          "body": "<p>Hva kan deles ut til aksjonærene som utbytte?</p>",
          "solution": "<p><b>Regelen.</b> Utbytte kan bare deles ut av overskuddet etter selskapsskatt.</p><p>1. Overskudd før skatt: 100 − 50 = 50 mill.<br>2. Selskapsskatt: 50 × 22 % = 11 mill.<br>3. Utbytte: 50 × (1 − 0,22) = <b>39 mill.</b></p><p><b>Kontroll.</b> 39 + 11 = 50.</p>",
          "criteria": [
            "Trekker selskapsskatten fra overskuddet: (100 − 50) × 0,78.",
            "Svar: 39 mill.",
            "Typisk feil: å dele ut 50 mill. før skatt.",
            "Vis utregningen."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>Hva sitter aksjonærene igjen med etter at de har betalt eierskatt på utbyttet</p>",
          "solution": "<p><b>Regelen.</b> Utbyttet oppjusteres med faktoren før eierskatten beregnes. Det er ingen skjerming i oppgaven.</p><p>1. Skattepliktig utbytte: 39 × 1,44 = 56,16 mill.<br>2. Eierskatt: 56,16 × 22 % = 12,36 mill. (12 355 200).<br>3. Igjen: 39 − 12,36 = <b>26,64 mill.</b> (26 644 800).</p><p><b>Fasiten</b> skriver «kr 56,16» og «kr 26,64» uten «mill.». Det er millioner.</p><p><b>Kontroll.</b> Effektiv eierskatt 22 % × 1,44 = 31,68 % og 39 × (1 − 0,3168) = 26,64 mill.</p><p><b>I 2026.</b> Med faktoren 1,72 blir effektiv eierskatt 37,84 % og aksjonærene sitter igjen med 39 × 0,6216 = 24,24 mill.</p>",
          "criteria": [
            "Oppjusterer utbyttet: 39 × 1,44 = 56,16 mill.",
            "Eierskatt 22 % av det oppjusterte beløpet: 12,36 mill.",
            "Trekker eierskatten fra utbyttet på 39 mill. (ikke fra 56,16): igjen 26,64 mill.",
            "Typisk feil: å glemme oppjusteringen (igjen 30,42 mill.).",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 4,
          "body": "<p>Hva er samlet skattesats for aksjonær hensyn tatt til at både utbytte og selskap skattlegges med 22% og oppjusteringsfaktoren er 1,44.</p>",
          "solution": "<p><b>Regelen.</b> Samlet sats = selskapsskatt + (1 − selskapsskatt) × eierskatt × faktor.</p><p>1. 0,22 + (1 − 0,22) × 0,22 × 1,44<br>2. = 0,22 + 0,78 × 0,3168 = 0,22 + 0,2471<br>3. = <b>46,7 %</b> (0,4671).</p><p><b>Kontroll.</b> (11 + 12,36)/50 = 46,7 %.</p><p><b>I 2026.</b> 0,22 + 0,78 × 0,22 × 1,72 = 51,5 %.</p>",
          "criteria": [
            "Bruker formelen t = τ + (1 − τ) × t_e × faktor.",
            "Svar: 46,7 %.",
            "Typisk feil: å legge satsene sammen (44 %) eller å glemme (1 − 0,22).",
            "Vis utregningen og kontroller med kronetallene fra a og b."
          ]
        }
      ]
    },
    {
      "n": 3,
      "title": "Stykkskatt i figur",
      "points": 10,
      "topic": "Stykkskatt og effektivitetstap",
      "chapters": [
        11
      ],
      "body": "<p>Anta et frikonkurransemarked hvor tilbud er lik etterspørsel. Anta så at myndighetene innfører en stykkskatt.</p>",
      "parts": [
        {
          "label": "a",
          "points": 5,
          "body": "<p>Vis i figur hva den nye likevektsprisen og kvantum blir</p>",
          "solution": "<p><b>Figuren.</b> Pris på den loddrette aksen, kvantum på den vannrette. Fallende etterspørselskurve D og stigende tilbudskurve S. Opprinnelig likevekt i A: kvantum Q<sub>1</sub>, pris P<sub>1</sub>.</p><p>1. Bedriftene ser på stykkskatten t som en kostnad per enhet. Tilbudskurven forskyves derfor <b>loddrett opp med t</b> (stiplet kurve S + t).<br>2. Ny likevekt i B, der S + t skjærer D: konsumentprisen stiger til <b>P<sub>2</sub> &gt; P<sub>1</sub></b> og kvantum faller til <b>Q<sub>2</sub> &lt; Q<sub>1</sub></b>.<br>3. Produsentprisen er P<sub>2</sub> − t, i punkt C på den opprinnelige tilbudskurven rett under B. Den ligger under P<sub>1</sub>.</p><p><b>Fasiten</b> sier at tilbudskurven «skifter ut». I figuren ligger den nye kurven over og til venstre for den gamle: den skifter opp.</p><p><b>Kontroll.</b> Avstanden BC er nøyaktig t. Begge parter betaler en del: konsumentene P<sub>2</sub> − P<sub>1</sub>, produsentene P<sub>1</sub> − (P<sub>2</sub> − t).</p>",
          "criteria": [
            "Riktig figur med navngitte akser og kurver.",
            "Tilbudskurven forskyves opp med t, ny likevekt med høyere konsumentpris P2 og lavere kvantum Q2.",
            "Viser kilen t mellom konsumentpris og produsentpris ved Q2.",
            "Typisk feil: å forskyve etterspørselskurven, eller å la konsumentprisen stige med hele t."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>Vis i figuren hva som er effektivitetstapet som følge av skatten.</p>",
          "solution": "<p><b>Regelen.</b> Effektivitetstapet er det konsument- og produsentoverskuddet som forsvinner uten at staten får det som skatt.</p><p>1. Trekanten ABC mellom Q<sub>2</sub> og Q<sub>1</sub>, mellom etterspørselskurven og den opprinnelige tilbudskurven.<br>2. Delen over P<sub>1</sub> er tapt konsumentoverskudd. Delen under P<sub>1</sub> er tapt produsentoverskudd.<br>3. Arealet er omtrent ½ × t × (Q<sub>1</sub> − Q<sub>2</sub>).</p><p>Rektangelet t × Q<sub>2</sub> mellom P<sub>2</sub> og P<sub>2</sub> − t er skatteprovenyet. Det er en overføring til staten, ikke et tap.</p><p><b>Kontroll.</b> Tapet kommer av enhetene mellom Q<sub>2</sub> og Q<sub>1</sub> som ikke lenger omsettes, selv om betalingsviljen er høyere enn grensekostnaden. Dobles t, blir både høyden og bredden på trekanten omtrent dobbelt så store og tapet omtrent firedobles.</p>",
          "criteria": [
            "Skraverer trekanten mellom Q2 og Q1 og mellom D og den opprinnelige S.",
            "Deler den i tapt konsumentoverskudd (over P1) og tapt produsentoverskudd (under P1).",
            "Skiller tapet fra skatteprovenyet (rektangelet t × Q2), som ikke er et tap.",
            "Typisk feil: å kalle hele reduksjonen i konsumentoverskuddet for effektivitetstap."
          ]
        }
      ]
    },
    {
      "n": 4,
      "title": "Hvem bærer stykkskatten",
      "points": 15,
      "topic": "Skatteinsidens",
      "chapters": [
        11
      ],
      "body": "<p>I et frikonkurransemarked er P = konsumentprisen og p = produsentprisen. Likvekten i markedet er gitt ved tilbud lik etterspørsel dvs D(P) = S(p) slik at i likevekt er P = p+t. Myndigheten bestemmer seg for å legge en skatt på produsentens pris per enhet solgt slik at sammenhengen mellom de to prisene blir P = p + t.</p>",
      "parts": [
        {
          "label": "a",
          "points": 10,
          "body": "<p>Myndighetene øker nå t marginalt. Utled hvordan produsentprisen endres når skatten endres.</p>",
          "solution": "<p><b>Regelen.</b> Skriv likevekten i produsentprisen, siden det er endringen i p det spørres etter og deriver med hensyn på t.</p><p>1. Likevekt: D(p + t) = S(p).<br>2. Deriver begge sider med hensyn på t. Venstresiden er sammensatt og argumentet p + t endres med ∂p/∂t + 1:<br>D′(P) · (∂p/∂t + 1) = S′(p) · ∂p/∂t<br>3. Samle leddene med ∂p/∂t: D′(P) = [S′(p) − D′(P)] · ∂p/∂t<br>4. <b>∂p/∂t = D′(P) / [S′(p) − D′(P)] &lt; 0</b></p><p>Fortegnet: etterspørselen faller (D′ &lt; 0) og tilbudet stiger (S′ &gt; 0), så telleren er negativ og nevneren positiv. Produsentprisen faller når skatten øker, men med mindre enn skatten: −1 &lt; ∂p/∂t &lt; 0.</p><p><b>Kontroll.</b> Konsumentprisen: ∂P/∂t = ∂p/∂t + 1 = S′/(S′ − D′), som ligger mellom 0 og 1. De to virkningene summerer til 1: ∂P/∂t − ∂p/∂t = 1, slik at hele skatten er fordelt.</p>",
          "criteria": [
            "Skriver likevekten som D(p + t) = S(p) og deriverer med kjerneregelen.",
            "Kommer fram til ∂p/∂t = D′/(S′ − D′).",
            "Begrunner fortegnet: D′ < 0 og S′ > 0, så ∂p/∂t < 0 og større enn −1.",
            "Typisk feil: å glemme +1 i leddet (∂p/∂t + 1), som gir feil nevner.",
            "Vis hvert steg i derivasjonen."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>Når vil skatten fullt og helt bli overveltet på produsenten?</p>",
          "solution": "<p><b>Regelen.</b> Produsenten bærer hele skatten når ∂p/∂t = −1, altså når konsumentprisen ikke endres.</p><p>1. Sett S′(p) = 0 (fullstendig uelastisk tilbud, loddrett tilbudskurve).<br>2. Da blir ∂p/∂t = D′/(0 − D′) = <b>−1</b> og ∂P/∂t = 0.</p><p>Det samme skjer i grensen når etterspørselen er fullstendig elastisk (D′ → −∞, vannrett etterspørselskurve): da går D′/(S′ − D′) mot −1. Fasiten nevner bare det første tilfellet.</p><p><b>Kontroll.</b> Den siden av markedet som er minst elastisk, bærer mest av skatten. Med loddrett tilbud kan ikke kvantum endres, så prisen produsentene får må falle med hele t.</p>",
          "criteria": [
            "Svarer: når tilbudet er fullstendig uelastisk, S′ = 0.",
            "Viser at da blir ∂p/∂t = −1 og konsumentprisen uendret.",
            "Nevner gjerne også fullstendig elastisk etterspørsel som grensetilfelle.",
            "Typisk feil: å bytte om og si at uelastisk etterspørsel legger skatten på produsenten."
          ]
        }
      ]
    },
    {
      "n": 5,
      "title": "Petra Ås: sykepleier eller eiendomsmegler",
      "points": 25,
      "topic": "Humankapital og porteføljevalg",
      "chapters": [
        14,
        17
      ],
      "body": "<p>Petra Ås vurderer to mulige karriereveier: Sykepleier eller eiendomsmegler. Som sykepleier vil Petra tjene 450000 kr første år. Som eiendomsmegler er lønnen usikker. Pedra regner med at sannsynligheten er 60% for at hun får jobb som autorisert eiendomsmegler med en lønn på 575000 kr. Hvis ikke må hun ta jobb som meglerassistent og vil da tjene 350000 kr. Forutsett i alle tilfeller at lønnen vokser helt sikkert med 4% og at Petra regner med å jobbe i 40 år fra i dag.</p><p><i>Fra formelvedlegget til eksamen:</i></p><p>w<sub>T</sub> = (1/γ) · [E(R<sub>T</sub>) − R<sub>F</sub>] / σ<sub>T</sub><sup>2</sup></p><p>R<sub>TK</sub> · TK = R<sub>D</sub> · D + R<sub>EK</sub> · EK</p><p>Σ<sub>t=1</sub><sup>T</sup> I<sub>t</sub>/(1 + k)<sup>t</sup> = I<sub>1</sub> · [1 − ((1 + g)/(1 + k))<sup>T</sup>] / (k − g)</p>",
      "parts": [
        {
          "label": "a",
          "points": 5,
          "body": "<p>Beregn Petras humankapital før skatt for de to karriereveiene. Forutsett en diskonteringsrente på 7%.</p>",
          "solution": "<p><b>Regelen.</b> Humankapital er nåverdien av framtidig lønn. Lønnen vokser med g = 4 % i T = 40 år og diskonteres med k = 7 %. Bruk formelen for voksende annuitet i vedlegget, med første lønn ved slutten av år 1.</p><p>1. Annuitetsfaktor: [1 − (1,04/1,07)<sup>40</sup>] / (0,07 − 0,04) = 0,679386 / 0,03 = 22,6462.<br>2. Sykepleier: 450 000 × 22,6462 = <b>kr 10 190 790</b>.<br>3. Autorisert megler: 575 000 × 22,6462 = 13 021 565.<br>4. Meglerassistent: 350 000 × 22,6462 = 7 926 170.<br>5. Eiendomsmegler, forventet: 0,6 × 13 021 565 + 0,4 × 7 926 170 = <b>kr 10 983 407</b>.</p><table class=\"data\"><tr><th></th><th>Sykepleier</th><th>Autorisert megler</th><th>Meglerassistent</th></tr><tr><td>Lønn første år</td><td class=\"n\">450 000</td><td class=\"n\">575 000</td><td class=\"n\">350 000</td></tr><tr><td>Sannsynlighet</td><td class=\"n\">100 %</td><td class=\"n\">60 %</td><td class=\"n\">40 %</td></tr><tr><td>Humankapital</td><td class=\"n\">10 190 790</td><td class=\"n\">13 021 565</td><td class=\"n\">7 926 170</td></tr></table><p><b>Kontroll.</b> Forventet førsteårslønn som megler er 0,6 × 575 000 + 0,4 × 350 000 = 485 000 og 485 000 × 22,6462 = 10 983 407. Fasiten har de samme tallene.</p><p>Antar du at første lønn kommer i dag (forskuddsannuitet), ganges alt med 1,07: 10 904 146 og 11 752 246. Det godtas hvis forutsetningen står skrevet.</p>",
          "criteria": [
            "Bruker voksende annuitet: faktor [1 − (1,04/1,07)^40]/0,03 = 22,65.",
            "Sykepleier 10 190 790, eiendomsmegler forventet 10 983 407 (13 021 565 og 7 926 170 i de to utfallene).",
            "Typisk feil: å bruke vanlig annuitet uten vekst, eller å diskontere med 7 − 4 = 3 % som en evig rente.",
            "Vis utregningen og skriv når første lønn kommer."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>Petra har en nyttefunksjon som følger formen U = c<sup>1−γ</sup>/(1−γ). Forutsett at risikoaversjonsparameteret γ=3. Hva er Petras foretrukne karrierevei dersom vi forutsetter at hun ikke har noen annen formue enn humankapital?</p>",
          "solution": "<p><b>Regelen.</b> Med γ = 3 er U(c) = c<sup>−2</sup>/(−2) = −1/(2c<sup>2</sup>). Sammenlign nytten av sykepleier med forventet nytte som megler, med humankapitalen fra a som c.</p><p>1. Sykepleier: U(10 190 790) = −4,8145 × 10<sup>−15</sup>.<br>2. Autorisert megler: U(13 021 565) = −2,9488 × 10<sup>−15</sup>. Assistent: U(7 926 170) = −7,9588 × 10<sup>−15</sup>.<br>3. Megler, forventet: 0,6 × (−2,9488) + 0,4 × (−7,9588) = −4,9528 × 10<sup>−15</sup>.<br>4. −4,81 &gt; −4,95, så <b>sykepleier</b> gir høyest forventet nytte.</p><p><b>Kontroll.</b> Sikkerhetsekvivalenten for megler er (−2 × E[U])<sup>−1/2</sup> = 10 047 576, som er lavere enn sykepleierens sikre 10 190 790. Risikopremien er 10 983 407 − 10 047 576 = 935 831 kr, mer enn megleryrkets forventede merverdi på 792 617.</p><p><b>Fasiten</b> regner på førsteårslønnen i stedet for humankapitalen. Det gir samme rangering, fordi alle tallene ganges med samme faktor og CRRA-nytte da bare skaleres. Men fasitens regneark bruker 550 000 for autorisert megler i stedet for 575 000. Med riktig 575 000 blir forventet nytte for megler −2,540 × 10<sup>−12</sup> mot −2,469 × 10<sup>−12</sup> for sykepleier, så konklusjonen står.</p>",
          "criteria": [
            "Setter opp forventet nytte: 0,6 × U(høy) + 0,4 × U(lav) for megler mot U(sikker) for sykepleier.",
            "Bruker U(c) = c^(−2)/(−2) riktig: tallene er negative og den minst negative er best.",
            "Konklusjon: sykepleier. Gjerne med sikkerhetsekvivalent 10,05 mill. mot 10,19 mill.",
            "Typisk feil: å velge megler fordi forventet humankapital er høyest, eller å velge det tallet som er mest negativt.",
            "Vis utregningen; både humankapital og årslønn gir samme svar."
          ]
        },
        {
          "label": "c",
          "points": 4,
          "body": "<p>Hvordan vil skatt påvirke Petras valg dersom vi forutsetter</p><p>i) At skattesystemet er lineært?<br>ii) At skattesystemet er progressivt?</p>",
          "solution": "<p><b>i) Lineær skatt.</b> Med en flat sats t blir alle utfall ganget med (1 − t). For CRRA-nytte er U((1 − t)c) = (1 − t)<sup>1−γ</sup> · U(c). Alle nyttetallene ganges med samme positive faktor, så <b>rangeringen endres ikke</b>. Skatten påvirker ikke valget.</p><p><b>ii) Progressiv skatt.</b> Marginalskatten er høyere for høye inntekter. Oppsiden som autorisert megler beskattes hardere enn sykepleierlønnen og forventet skatt blir høyere for den usikre karrieren (skattefunksjonen er konveks). Det gjør normalt at <b>sykepleier kommer relativt bedre ut</b>. To forbehold: progressiv skatt demper også spredningen i utfallene, som trekker litt mot megler. Og ligger alle tre lønningene i samme trinn, er systemet flatt i det relevante intervallet og har ingen virkning.</p><p><b>Kontroll.</b> Fasiten sier det samme: ingen virkning ved lineær skatt (konstant relativ risikoaversjon), normalt fordel sykepleier ved progressiv skatt.</p>",
          "criteria": [
            "Lineær skatt: ingen virkning, fordi CRRA-nytte bare skaleres når alle utfall ganges med (1 − t).",
            "Progressiv skatt: oppsiden for megler reduseres mest, så sykepleier kommer normalt bedre ut.",
            "Nevner at virkningen kan bli null hvis alle lønningene ligger i samme skattetrinn.",
            "Typisk feil: å si at lineær skatt favoriserer den sikre karrieren."
          ]
        },
        {
          "label": "d",
          "points": 4,
          "body": "<p>Hvordan vil det påvirke Petras valg at hun mottar en uventet arv på 2000000 kr?</p>",
          "solution": "<p><b>Regelen.</b> Arven er en sikker formue som ligger i bunn under begge karriereveiene. Med konstant relativ risikoaversjon blir Petra mindre risikoavers målt i kroner når formuen øker. Det taler for eiendomsmegler.</p><p>1. Sykepleier: U(10 190 790 + 2 000 000) = U(12 190 790) = −3,3644 × 10<sup>−15</sup>.<br>2. Megler: 0,6 × U(15 021 565) + 0,4 × U(9 926 170) = 0,6 × (−2,2158) + 0,4 × (−5,0747) = −3,3594 × 10<sup>−15</sup>.<br>3. −3,3594 &gt; −3,3644, så nå er <b>eiendomsmegler</b> best, men nesten likt.</p><p><b>Kontroll.</b> Sikkerhetsekvivalenten for megler er 12 199 895 mot 12 190 790 for sykepleier, en forskjell på bare 9 105 kr. Fasiten har de samme nyttetallene. Arven må legges til humankapitalen; å legge 2 mill. til en årslønn blander en formue med en årlig inntekt.</p><p>Fasiten: et verbalt svar med dette resonnementet gir rundt 80 % uttelling. Fullt svar krever utregningen.</p>",
          "criteria": [
            "Resonnement: arven er sikker formue i bunn, Petra blir mindre risikoavers i kroner og det taler for megler.",
            "Regner forventet nytte med humankapital pluss 2 mill. i alle utfall.",
            "Konklusjon: megler, men nesten likt (sikkerhetsekvivalent 12,20 mill. mot 12,19 mill.).",
            "Typisk feil: å legge arven til førsteårslønnen.",
            "Et rent verbalt svar gir ca. 80 % etter fasiten."
          ]
        },
        {
          "label": "e",
          "points": 3,
          "body": "<p>Anta at Petra mottar en arv som nevnt i (d). Denne arven kan plasseres i bankinnskudd med en fast rente på 2% eller i aksjefond med en forventet avkastning på 6% og et standardavvik på 15%.</p><p>Hva blir Petras optimale andel investert i aksjefond dersom hun velger karriereveien sykepleier?</p>",
          "solution": "<p><b>Regelen.</b> Mertons formel gir optimal aksjeandel av <b>total</b> formue: w = (μ − r)/(γσ<sup>2</sup>). Humankapitalen som sykepleier er risikofri (lønnen vokser helt sikkert), så den virker som et bankinnskudd.</p><p>1. w = (0,06 − 0,02)/(3 × 0,15<sup>2</sup>) = 0,04/0,0675 = <b>59,26 %</b>.<br>2. Total formue: 2 000 000 + 10 190 790 = 12 190 790. Arven er bare 16,4 % av den.<br>3. Ønsket aksjebeløp: 0,5926 × 12 190 790 = 7 224 172.<br>4. Det er mer enn hele arven (361 % av den). Uten lån blir svaret <b>100 % av arven i aksjefond</b>.</p><p><b>Kontroll.</b> Fasiten sier det samme: siden det er optimalt å ha mer i aksjer enn arven og humankapitalen er risikofri, plasseres hele arven i aksjer. Kunne hun låne til 2 %, ville andelen vært 361 %.</p>",
          "criteria": [
            "Mertons formel med varians, ikke standardavvik: 0,04/(3 × 0,0225) = 59,3 %.",
            "Bruker andelen på total formue (arv pluss humankapital) og ser at risikofri humankapital virker som bank.",
            "Konklusjon: 100 % av arven i aksjefond (361 % hvis lån er mulig).",
            "Typisk feil: å svare 59 % av arven.",
            "Vis utregningen."
          ]
        },
        {
          "label": "f",
          "points": 4,
          "body": "<p><i>Arven og plasseringsvalget er som i e.</i></p><p>Anta at humankapitalen som eiendomsmegler har samme verdi som under a, men er normalfordelt med et standardavvik på 10%. Korrelasjonskoeffisienten med aksjemarkedet er 1. Hva blir Petras optimale andel investert i aksjefond dersom hun velger karriereveien eiendomsmegler?</p>",
          "solution": "<p><b>Regelen.</b> Humankapital med risiko kan ses som en blanding av aksjer og bank. Aksjeandelen i humankapitalen er betaverdien ρσ<sub>H</sub>/σ. Ønsket aksjebeløp i hele formuen er w × (F + H) og det humankapitalen allerede «er» av aksjer, trekkes fra.</p><p>1. Aksjeandel i humankapitalen: 1 × 0,10/0,15 = 66,7 %.<br>2. Ønsket aksjebeløp totalt: 0,5926 × (2 000 000 + 10 983 407) = 7 693 871.<br>3. Aksjer i humankapitalen: 0,667 × 10 983 407 = 7 322 271.<br>4. Aksjer fra arven: 7 693 871 − 7 322 271 = 371 599.<br>5. Andel av arven: 371 599 / 2 000 000 = <b>18,6 %</b>.</p><p><b>Kontroll.</b> Samlet aksjeandel blir (7 322 271 + 371 599)/12 983 407 = 59,26 %, som Merton krever. Fasiten runder til 19 %. Sammenlignet med e faller andelen fra 100 % til 18,6 %: en risikabel humankapital som følger aksjemarkedet, fortrenger aksjer i finansformuen.</p><p>Med humankapital fra forskuddsannuitet (11 752 246) blir svaret 15,7 %.</p>",
          "criteria": [
            "Ser humankapitalen som aksjer med vekt ρσH/σ = 2/3.",
            "Ønsket aksjebeløp w × (F + H) = 7,69 mill., minus 7,32 mill. i humankapitalen.",
            "Svar: 371 599 kr, altså 18,6 % av arven (fasiten: 19 %).",
            "Typisk feil: å trekke fra hele humankapitalen (som ved β = 1) og få null aksjer.",
            "Vis utregningen."
          ]
        }
      ]
    },
    {
      "n": 6,
      "title": "Forsikring mot å ikke få meglerjobb",
      "points": 8,
      "topic": "Forsikring og markedssvikt",
      "chapters": [
        17
      ],
      "body": "<p>Forsikringsselskapet SuperSmart Forsikring AS har hørt om Petra Ås’ utfordringer ved å velge karriere. De vurderer å tilby en forsikring for eiendomsmeglerstudenter der studentene forplikter seg til å betale inn penger dersom de får jobb som eiendomsmeglere, mens de får en utbetaling dersom de ikke får jobb. Dette skal redusere risikoen for Petra Ås og andre i samme situasjon. Hvilke utfordringer vil SuperSmart Forsikring støte på dersom de velger å tilby denne forsikringen? Skriv max 1 side.</p>",
      "solution": "<p><b>Regelen.</b> Forsikring virker når skadene er uavhengige av hverandre, når den forsikrede ikke kan påvirke skaden og når selskapet vet like mye om risikoen som kunden. Her svikter alle tre.</p><p><b>1. Manglende diversifisering.</b> Faller boligmarkedet, får få meglerstudenter jobb samtidig. Skadene er korrelerte, så store talls lov virker ikke. SuperSmart må betale ut til mange på en gang og må holde mye kapital.</p><p><b>2. Moralsk hasard.</b> Den som er forsikret, har mindre grunn til å søke hardt etter meglerjobb, særlig fordi han må betale inn hvis han får jobben. Selskapet kan ikke observere innsatsen. Mottiltak: delvis dekning (egenandel) og krav om dokumentert jobbsøking.</p><p><b>3. Ugunstig utvalg.</b> Studentene vet bedre enn SuperSmart hvor gode sjansene deres er. De sterke studentene vil ikke betale inn og takker nei. De svake tegner forsikringen. Premien må opp, flere gode faller fra og markedet kan bryte sammen. Mottiltak: prising etter karakterer eller en obligatorisk ordning for hele kullet.</p><p><b>4. Håndheving.</b> Kontrakten krever at de som lykkes, faktisk betaler inn i ettertid. Det er krevende å kontrollere hva som regnes som «jobb som eiendomsmegler» og å kreve inn fra noen som flytter eller bytter yrke.</p><p><b>Kontroll.</b> Fasiten nevner de tre første: manglende diversifisering, moral hazard og adverse selection.</p>",
      "criteria": [
        "Manglende diversifisering: jobbutsiktene er korrelert gjennom boligmarkedet, så skadene kommer samtidig.",
        "Moralsk hasard: den forsikrede søker mindre etter jobb og selskapet ser ikke innsatsen.",
        "Ugunstig utvalg: studentene kjenner sine egne sjanser best, så de svake tegner og de sterke lar være.",
        "Gjerne mottiltak (egenandel, prising etter karakterer, obligatorisk ordning) og problemet med å kreve inn fra dem som får jobb.",
        "Typisk feil: å bare liste begrepene uten å koble dem til akkurat denne forsikringen."
      ]
    },
    {
      "n": 7,
      "title": "Petras pensjon",
      "points": 17,
      "topic": "Pensjon",
      "chapters": [
        15
      ],
      "body": "<p>Petra Ås vurderer om den fremtidige pensjonen hennes vil påvirkes av karrierevalg. Hennes første utfordring er å forstå fremtidig pensjon fra Folketrygden. Petra er født i 1996 og regner med å starte i jobb når hun blir 25 år gammel.</p><p><i>Fra vedlegget til eksamen: prognoser for delingstall fra NAV for årskullene 1995–2001.</i></p><table class=\"data\"><tr><th>Uttaksalder</th><th>1995</th><th>1996</th><th>1997</th><th>1998</th><th>1999</th><th>2000</th><th>2001</th></tr><tr><td>62 år</td><td class=\"n\">24,14</td><td class=\"n\">24,24</td><td class=\"n\">24,34</td><td class=\"n\">24,43</td><td class=\"n\">24,53</td><td class=\"n\">24,63</td><td class=\"n\">24,72</td></tr><tr><td>63 år</td><td class=\"n\">23,33</td><td class=\"n\">23,43</td><td class=\"n\">23,53</td><td class=\"n\">23,63</td><td class=\"n\">23,73</td><td class=\"n\">23,82</td><td class=\"n\">23,92</td></tr><tr><td>64 år</td><td class=\"n\">22,52</td><td class=\"n\">22,62</td><td class=\"n\">22,72</td><td class=\"n\">22,82</td><td class=\"n\">22,92</td><td class=\"n\">23,02</td><td class=\"n\">23,11</td></tr><tr><td>65 år</td><td class=\"n\">21,71</td><td class=\"n\">21,81</td><td class=\"n\">21,91</td><td class=\"n\">22,01</td><td class=\"n\">22,11</td><td class=\"n\">22,21</td><td class=\"n\">22,30</td></tr><tr><td>66 år</td><td class=\"n\">20,90</td><td class=\"n\">21,00</td><td class=\"n\">21,10</td><td class=\"n\">21,20</td><td class=\"n\">21,30</td><td class=\"n\">21,39</td><td class=\"n\">21,49</td></tr><tr><td>67 år</td><td class=\"n\">20,08</td><td class=\"n\">20,18</td><td class=\"n\">20,28</td><td class=\"n\">20,38</td><td class=\"n\">20,48</td><td class=\"n\">20,58</td><td class=\"n\">20,67</td></tr><tr><td>68 år</td><td class=\"n\">19,26</td><td class=\"n\">19,36</td><td class=\"n\">19,46</td><td class=\"n\">19,56</td><td class=\"n\">19,66</td><td class=\"n\">19,76</td><td class=\"n\">19,85</td></tr><tr><td>69 år</td><td class=\"n\">18,44</td><td class=\"n\">18,54</td><td class=\"n\">18,64</td><td class=\"n\">18,74</td><td class=\"n\">18,84</td><td class=\"n\">18,94</td><td class=\"n\">19,03</td></tr><tr><td>70 år</td><td class=\"n\">17,62</td><td class=\"n\">17,72</td><td class=\"n\">17,82</td><td class=\"n\">17,92</td><td class=\"n\">18,02</td><td class=\"n\">18,11</td><td class=\"n\">18,21</td></tr><tr><td>71 år</td><td class=\"n\">16,80</td><td class=\"n\">16,90</td><td class=\"n\">17,00</td><td class=\"n\">17,10</td><td class=\"n\">17,20</td><td class=\"n\">17,29</td><td class=\"n\">17,39</td></tr><tr><td>72 år</td><td class=\"n\">15,98</td><td class=\"n\">16,08</td><td class=\"n\">16,18</td><td class=\"n\">16,27</td><td class=\"n\">16,37</td><td class=\"n\">16,47</td><td class=\"n\">16,56</td></tr><tr><td>73 år</td><td class=\"n\">15,16</td><td class=\"n\">15,26</td><td class=\"n\">15,35</td><td class=\"n\">15,45</td><td class=\"n\">15,55</td><td class=\"n\">15,64</td><td class=\"n\">15,74</td></tr><tr><td>74 år</td><td class=\"n\">14,34</td><td class=\"n\">14,44</td><td class=\"n\">14,53</td><td class=\"n\">14,63</td><td class=\"n\">14,72</td><td class=\"n\">14,82</td><td class=\"n\">14,91</td></tr><tr><td>75 år</td><td class=\"n\">13,52</td><td class=\"n\">13,62</td><td class=\"n\">13,71</td><td class=\"n\">13,81</td><td class=\"n\">13,90</td><td class=\"n\">13,99</td><td class=\"n\">14,09</td></tr></table>",
      "parts": [
        {
          "label": "a",
          "points": 7,
          "body": "<p>Hvilken pensjon kan Petra regne med fra Folketrygden dersom hun gjør karrierevalget sykepleier og får en startlønn på 450000? Anta at hennes lønnsvekst på 4% også gjelder som samfunnets fremtidige lønnsvekst. Petra er usikker på når hun vil gå av med pensjon, men ber om at du beregner pensjonen for uttak ved</p><p>i) 62 år<br>ii) 67 år<br>iii) 72 år</p>",
          "solution": "<p><b>Regelen.</b> Hvert år legges 18,1 % av lønnen (under 7,1 G) til pensjonsbeholdningen og beholdningen reguleres med lønnsveksten. Når Petras lønn vokser like raskt som G, blir beholdningen ved uttak 0,181 × N × sluttlønnen. Årlig pensjon = beholdning / delingstall.</p><p>1. År i arbeid fra 25 år: N = 37, 42 og 47.<br>2. Delingstall for 1996-kullet: 24,24 (62 år), 20,18 (67 år) og 16,08 (72 år).<br>3. Sluttlønn = 450 000 × 1,04<sup>N</sup>.<br>4. Pensjon = 0,181 × N × sluttlønn / delingstall.</p><table class=\"data\"><tr><th>Uttak</th><th>År i arbeid N</th><th>Delingstall</th><th>Sluttlønn</th><th>Beholdning</th><th>Pensjon per år</th><th>Kompensasjonsgrad</th></tr><tr><td>62 år</td><td class=\"n\">37</td><td class=\"n\">24,24</td><td class=\"n\">1 920 640</td><td class=\"n\">12 862 529</td><td class=\"n\">530 632</td><td class=\"n\">27,6 %</td></tr><tr><td>67 år</td><td class=\"n\">42</td><td class=\"n\">20,18</td><td class=\"n\">2 336 753</td><td class=\"n\">17 763 994</td><td class=\"n\">880 277</td><td class=\"n\">37,7 %</td></tr><tr><td>72 år</td><td class=\"n\">47</td><td class=\"n\">16,08</td><td class=\"n\">2 843 017</td><td class=\"n\">24 185 546</td><td class=\"n\">1 504 076</td><td class=\"n\">52,9 %</td></tr></table><p>Svar: <b>kr 530 632</b> ved 62 år, <b>kr 880 277</b> ved 67 år og <b>kr 1 504 076</b> ved 72 år, eller 28 %, 38 % og 53 % av sluttlønnen.</p><p><b>Kontroll.</b> Kompensasjonsgraden er 0,181 × N / delingstall: 0,181 × 37/24,24 = 27,6 %. Lønnen på 450 000 er 4,6 G (G = 96 883 i 2018) og vokser med G, så taket på 7,1 G biter aldri. Kronebeløpene er nominelle i uttaksåret. Bruker du lønnen året før uttak (1,04<sup>N−1</sup>), blir de 4 % lavere (510 223, 846 420 og 1 446 227), men kompensasjonsgraden er den samme. Fasiten har tallene i tabellen.</p><p><b>I 2026.</b> Pensjonsforliket hever nedre uttaksalder fra 1964-kullet (1973-kullet: 63 år), så for 1996-kullet er uttak ved 62 år trolig ikke mulig. Delingstallene er prognoser som fastsettes endelig når kullet fyller 61.</p>",
          "criteria": [
            "Opptjening 18,1 % per år og riktig antall år: 37, 42 og 47.",
            "Riktige delingstall for 1996-kullet: 24,24, 20,18 og 16,08.",
            "Pensjon 530 632, 880 277 og 1 504 076 kr, eller kompensasjonsgrad 27,6 %, 37,7 % og 52,9 %.",
            "Typisk feil: å bruke startlønnen i stedet for sluttlønnen, eller delingstall for feil årskull.",
            "Vis utregningen og kommenter at lønnen ligger under 7,1 G."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>I tillegg til pensjon fra Folketrygden vil Petra ha en pensjonsordning hos fremtidig arbeidsgiver. Som sykepleier vil Petra antagelig komme inn under en pensjonsordning med ytelsespensjon. Dersom hun velger karrieren som eiendomsmegler vil hun mest sannsynlig få en innskuddspensjonsordning. Gjør rede for forskjellene på de to ordningene.</p>",
          "solution": "<p><b>Regelen.</b> Det som er avtalt, avgjør resten: i ytelsespensjon er pensjonen avtalt, i innskuddspensjon er innskuddet avtalt. Den parten som ikke har fått noe avtalt, bærer risikoen.</p><table class=\"data\"><tr><th></th><th>Ytelsespensjon</th><th>Innskuddspensjon</th></tr><tr><td>Hva er avtalt</td><td>Pensjonen: en andel av sluttlønnen</td><td>Innskuddet: en prosent av lønnen hvert år</td></tr><tr><td>Hvem bærer avkastningsrisikoen</td><td>Arbeidsgiver (og selskapet)</td><td>Den ansatte</td></tr><tr><td>Investeringsvalg</td><td>Ingen individuelle valg</td><td>Den ansatte velger risikoprofil</td></tr><tr><td>Garanti</td><td>Garantert produkt, rentegaranti (2,5 % i fasiten)</td><td>Ingen garanti; pensjonen avhenger av avkastningen</td></tr><tr><td>Ved jobbytte</td><td>Fripolise</td><td>Pensjonskapitalbevis</td></tr><tr><td>Dødelighetsarv</td><td>Ja</td><td>Nei; beholdningen arves av etterlatte</td></tr><tr><td>Maks innskudd</td><td>Bestemt av pensjonen (i snitt tilsvarende 7 %/25 %)</td><td>7 % av lønn under 7,1 G og 25 % av lønn mellom 7,1 og 12 G</td></tr><tr><td>Utbetaling</td><td>Normalt livsvarig</td><td>Tidsbegrenset, i praksis 10–15 år</td></tr></table><p><b>For Petra.</b> Som sykepleier får hun en forutsigbar, livsvarig pensjon. Som megler bærer hun selv avkastningsrisikoen, men kan velge en høyere aksjeandel mens hun er ung. Det hun har spart, går til arvingene hvis hun dør tidlig.</p><p><b>Kontroll.</b> Fasiten viser tabellen fra forelesningen og nevner i tillegg at ytelsespensjon normalt er livsvarig, mens innskuddspensjon har en utbetalingsfase på 10–15 år.</p><p><b>I 2026.</b> Offentlig tjenestepensjon er for dem som er født i 1963 eller senere lagt om til en påslagsmodell fra 2020: en fast prosent av lønnen hvert år, utbetalt livsvarig. Den klassiske ytelsesordningen i offentlig sektor gjelder ikke for Petras kull.</p>",
          "criteria": [
            "Hovedforskjellen: ytelse avtaler pensjonen, innskudd avtaler innskuddet. Risikoen ligger hos den som ikke har fått noe avtalt.",
            "Fripolise mot pensjonskapitalbevis, garanti mot investeringsvalg, dødelighetsarv mot arv til etterlatte.",
            "Utbetaling: ytelse normalt livsvarig, innskudd i praksis 10–15 år.",
            "Typisk feil: å bytte om egenskapene til de to ordningene."
          ]
        },
        {
          "label": "c",
          "points": 5,
          "body": "<p>Petra vil også ha mulighet til å opprette en privat pensjonssparing (IPS). Gjør rede for fordeler og ulemper ved en slik ordning i forhold til å spare i fond (aksjefond, obligasjonsfond e.l.).</p>",
          "solution": "<p><b>Fordelene er skattemessige.</b></p><p>1. <b>Utsatt skatt.</b> Innskuddet gir fradrag i alminnelig inntekt og uttaket skattlegges som alminnelig inntekt. Med samme sats ved innskudd og uttak er fordelen at skatten betales senere: et rentefritt lån fra staten som også gir avkastning.<br>2. <b>Ingen løpende skatt</b> på avkastningen mens pengene står i ordningen.<br>3. <b>Ingen formuesskatt</b> på midlene.</p><p><b>Ulempene.</b></p><p>1. <b>Pengene er bundet</b> til pensjonsalder og utbetales over minst ti år. Det kan også være en fordel for den som ellers sparer for lite.<br>2. <b>Høyere gebyrer</b> og færre produkter enn vanlige fond, som gir lavere avkastning.<br>3. <b>Tak på innskuddet</b> (kr 40 000 i året i 2018) og risiko for at skattesatsen er høyere ved uttak.</p><p><b>Kontroll.</b> Vanlige fond, for eksempel på aksjesparekonto, gir full fleksibilitet, men skattlegges ved uttak med eierskatt og har formuesskatt. Fasiten nevner utsatt skatt og fritak for formuesskatt mot binding og gebyrer.</p><p><b>I 2026.</b> Taket er kr 25 000 i året og fradraget gir 22 % × 25 000 = kr 5 500 i utsatt skatt.</p>",
          "criteria": [
            "Fordel: utsatt skatt (fradrag ved innskudd, skatt ved uttak).",
            "Fordel: fritak for formuesskatt og ingen løpende skatt på avkastningen.",
            "Ulempe: bundet til pensjonsalder, høyere gebyrer og tak på innskuddet.",
            "Gjerne poenget om at binding kan hjelpe den som ellers sparer for lite.",
            "Typisk feil: å påstå at IPS gir lavere skattesats, ikke bare utsatt skatt."
          ]
        }
      ]
    }
  ]
},
/* Høsten 2017: åpne oppgaver fra før flervalgsformatet. Skrevet etter docs/fie432-eldre-sett-spek.md. */
{
  "id": "h2017",
  "label": "Høsten 2017",
  "minutes": 120,
  "points": 100,
  "format": "2 oppgaver · åpne svar · bare skattedelen",
  "note": "Av denne eksamenen finnes bare <b>fasiten for skattedelen</b> (Guttorm Schjelderup, to oppgaver). Oppgaveheftet, finansdelen, datoen og vektene mangler, så oppgaveteksten her er hentet ut av fasiten. Poengene er fordelt likt på de to oppgavene (50 hver) og etter omfang innenfor oppgavene. Tiden er satt til 120 minutter, halvparten av en firetimers eksamen. Satsene er fra 2016 og 2017: alminnelig skatt 24 %, formuesskatt 0,85 % uten bunnfradrag, sekundærbolig verdsatt til 80 % (2016) og 90 % (2017). I 2026 er satsen 1,0 % over et bunnfradrag på kr 1 900 000 og sekundærbolig verdsettes til 100 % uten gjeldsreduksjon. Oppgave 2 bruker en tenkt justeringsfaktor på 1,3; i 2026 er oppjusteringsfaktoren 1,72.",
  "facts": [
    "Bare fasiten for skattedelen finnes: to oppgaver, ingen dato og ingen vekter.",
    "Poengene er satt her: 50 per oppgave, fordelt etter omfang på leddene.",
    "Formuesskatt 0,85 % uten bunnfradrag. Sekundærbolig 80 % i 2016 og 90 % i 2017, med 10 % reduksjon av gjelden som tilordnes boligen fra 2017.",
    "Oppgave 1 sier at du kan runde av til én desimal. Fasiten gjør det og det endrer svaret i 1d med 283 kr.",
    "Alminnelig skatt 24 %, eierskatt 23 % og justeringsfaktor 1,3 i oppgave 2. I 2026: 22 %, 22 % og 1,72."
  ],
  "practiceNote": "Rene regneoppgaver. Sett opp formuen som en balanse med én linje per post og skriv verdsettingsprosenten ved hver linje før du regner.",
  "exercises": [
    {
      "n": 1,
      "title": "Peder Ås og sekundærboligen",
      "points": 50,
      "topic": "Formuesskatt og gjeldsfordeling",
      "chapters": [
        7
      ],
      "body": "<p>Peder Ås har en brutto formue på kr 6 mill. Bruttoformuen består av en sekundærbolig med markedsverdi (virkelig verdi) på 4 mill. kroner og et bankinnskudd på 2 mill. Peder Ås har gjeld på til sammen kr 4 mill.</p><p>Ligningsverdien på sekundæreiendom var 80% av virkelig verdi i 2016. Anta at formuesskatten er 0,85% og at bunnfradraget er null. I dine svar kan du runde av til en desimal.</p>",
      "parts": [
        {
          "label": "a",
          "points": 8,
          "body": "<p>Hva er nettoformuen til Peder Ås i 2016</p>",
          "solution": "<p><b>Regelen.</b> Nettoformue = ligningsverdien av eiendelene minus gjelden. Bankinnskudd teller 100 %, sekundærbolig 80 % i 2016. I 2016 var det ingen reduksjon av gjelden.</p><p>1. Bankinnskudd: 2,0 mill.<br>2. Sekundærbolig: 4 × 0,8 = 3,2 mill.<br>3. Gjeld: 4,0 mill.<br>4. Nettoformue = 2 + 3,2 − 4 = <b>1,2 mill.</b></p><p><b>Kontroll.</b> Etter markedsverdi er nettoformuen 6 − 4 = 2 mill. Forskjellen på 0,8 mill. er nøyaktig rabatten på boligen (20 % av 4 mill.).</p><p><b>I 2026.</b> Ordet er formuesverdi og sekundærbolig verdsettes til 100 %. Med samme tall blir nettoformuen 2 mill.</p>",
          "criteria": [
            "Sekundærboligen tas med til 80 % av markedsverdien (3,2 mill.), bankinnskuddet til 100 %.",
            "Hele gjelden på 4 mill. trekkes fra uten reduksjon (regelen om gjeldsreduksjon kom i 2017).",
            "Svar: 1,2 mill.",
            "Typisk feil: å bruke markedsverdien 4 mill. og få 2 mill.",
            "Vis utregningen som en balanse med én linje per post."
          ]
        },
        {
          "label": "b",
          "points": 6,
          "body": "<p>Hvor mye betaler Peder Ås i formuesskatt i 2016</p>",
          "solution": "<p><b>Regelen.</b> Formuesskatt = (nettoformue − bunnfradrag) × sats. Bunnfradraget er null her.</p><p>1. Grunnlag: 1 200 000.<br>2. Skatt = 1 200 000 × 0,85 % = <b>kr 10 200</b>.</p><p><b>Kontroll.</b> 0,85 % av 1 mill. er 8 500 og 0,85 % av 0,2 mill. er 1 700. Sum 10 200.</p><p><b>I 2026.</b> Satsen er 1,0 % over et bunnfradrag på kr 1 900 000. Med sekundærboligen til 100 % blir nettoformuen 2 mill. og skatten (2 000 000 − 1 900 000) × 1 % = kr 1 000.</p>",
          "criteria": [
            "Ganger nettoformuen fra a med 0,85 %.",
            "Svar: kr 10 200.",
            "Typisk feil: å regne skatt av bruttoformuen (6 mill. gir 51 000) eller av markedsverdien.",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 10,
          "body": "<p>Regjeringen Solberg økte i 2017 ligningsverdien på sekundæreiendom fra 80% til 90% av virkelig verdi og innførte også et sjablongmessig fradrag for gjeld når skattyter har sekundærbolig. Etter de nye reglene skal gjelden som kan tilordnes sekundærboligen bli satt til 90% av full verdi.</p><p>Hva blir fradragsberettiget gjeld som skal tilordnes sekundærboligen i 2017</p>",
          "solution": "<p><b>Regelen.</b> Gjelden fordeles forholdsmessig etter <b>markedsverdien</b> (virkelig verdi) av eiendelene. Den delen som faller på sekundærboligen, gir bare fradrag med 90 %, fordi boligen bare tas med til 90 %.</p><p>1. Sekundærboligens andel av bruttoformuen: 4/6 = 66,67 %.<br>2. Gjeld tilordnet sekundærboligen: 4 mill. × 4/6 = 2,667 mill.<br>3. Fradragsberettiget: 2,667 × 0,9 = <b>2,4 mill.</b></p><p>Fasiten runder 2,667 til 2,7 før den ganger med 0,9 og får 2,43, avrundet 2,4. Eksakt er 4 × 4/6 × 0,9 = 2,4 helt presist.</p><p><b>Kontroll.</b> Rabatten på boligen (10 %) og kuttet i gjelden (10 %) er like store. En fullt lånefinansiert sekundærbolig gir da nettoformue 0,9 × 4 − 0,9 × 4 = 0, så det gir ingen skattefordel å låne til den.</p>",
          "criteria": [
            "Fordeler gjelden etter markedsverdi: brøken er 4/6, ikke ligningsverdi 3,6/5,6.",
            "Tilordnet gjeld 2,67 mill. og 90 % av den: 2,4 mill.",
            "Typisk feil: å kutte hele gjelden med 10 % (3,6 mill.) eller å fordele etter ligningsverdi.",
            "Vis utregningen med brøken skrevet ut."
          ]
        },
        {
          "label": "d",
          "points": 12,
          "body": "<p>Hvor mye betaler Peder Ås i formuesskatt i 2017</p>",
          "solution": "<p><b>Regelen.</b> Sekundærboligen tas med til 90 %. Gjelden som er tilordnet boligen, gir fradrag med 90 %. Resten av gjelden gir fullt fradrag.</p><p>1. Bankinnskudd: 2,0 mill.<br>2. Sekundærbolig: 4 × 0,9 = 3,6 mill.<br>3. Gjeld tilordnet boligen, fradragsberettiget (fra c): −2,4 mill.<br>4. Øvrig gjeld: 4 − 2,667 = −1,333 mill.<br>5. Nettoformue = 2 + 3,6 − 2,4 − 1,333 = <b>1,867 mill.</b><br>6. Formuesskatt = 1 866 667 × 0,85 % = <b>kr 15 867</b>.</p><p><b>Fasiten</b> runder øvrig gjeld til 1,3 mill. og nettoformuen til 1,9 mill. og får <b>kr 16 150</b>. Oppgaven tillater én desimal, så begge svarene er godkjent. Det eksakte tallet er 15 867.</p><p><b>Kontroll.</b> Samlet fradragsberettiget gjeld er 4 − 0,1 × 2,667 = 3,733 mill. og 2 + 3,6 − 3,733 = 1,867. Skatten øker med 15 867 − 10 200 = 5 667 kr fra 2016, fordi boligverdien går opp med 0,4 mill. og gjeldsfradraget går ned med 0,267 mill. Nettoformuen øker med 0,667 mill. og 0,667 × 0,85 % = 5 667.</p><p><b>I 2026.</b> Sekundærbolig verdsettes til 100 % og gjelden kuttes ikke, så nettoformuen blir 2 mill.</p>",
          "criteria": [
            "Ligningsverdi av boligen 3,6 mill. og bankinnskuddet 2 mill. med fullt.",
            "Gjelden deles i to: 2,4 mill. (90 % av den tilordnede) og 1,33 mill. med fullt fradrag.",
            "Nettoformue 1,87 mill. og skatt kr 15 867. Fasitens 1,9 mill. og kr 16 150 godtas fordi oppgaven tillater én desimal.",
            "Typisk feil: å trekke fra bare de 2,4 mill. og glemme den øvrige gjelden.",
            "Vis utregningen som en balanse."
          ]
        },
        {
          "label": "e",
          "points": 14,
          "body": "<p>Anta nå at Peder i stedet for å ha 2 mill. i banken bestemmer seg for å bruke bankinnskuddet i forbindelse med kjøpet av sekundærboligen som koster 4 mill. For å finansiere kjøpet må han da låne kun 2 mill. Peder har etter kjøpet en brutto formue på 4 mill. og en gjeld på kun 2 mill. Hva blir formuesskatten nå i 2017 og lønner det seg å bruke opp bankinnskuddet hvis man ønsker å spare formuesskatt?</p>",
          "solution": "<p><b>Regelen.</b> Samme regler som i d. Nå er sekundærboligen eneste eiendel, så hele gjelden tilordnes den.</p><p>1. Sekundærbolig: 4 × 0,9 = 3,6 mill.<br>2. Andel av gjelden som tilordnes boligen: 4/4 = 100 %, altså 2 mill.<br>3. Fradragsberettiget gjeld: 2 × 0,9 = 1,8 mill.<br>4. Nettoformue = 3,6 − 1,8 = <b>1,8 mill.</b><br>5. Formuesskatt = 1 800 000 × 0,85 % = <b>kr 15 300</b>.</p><p><b>Ja, det lønner seg.</b> Skatten faller fra 15 867 til 15 300, altså med <b>567 kr</b> (850 kr med fasitens avrundede 16 150).</p><p><b>Hvorfor.</b> Det fradraget som går tapt, er 10 % av gjelden som tilordnes boligen. Med bankinnskuddet tilordnes 2,667 mill. og 0,267 mill. går tapt. Uten bankinnskuddet tilordnes bare 2 mill. og 0,2 mill. går tapt. Nettoformuen blir 0,067 mill. lavere og 0,067 × 0,85 % = 567 kr.</p><p><b>Kontroll.</b> Markedsverdien av nettoformuen er 2 mill. i begge tilfeller. Bare skattegrunnlaget endres.</p>",
          "criteria": [
            "Ny nettoformue 3,6 − 1,8 = 1,8 mill. og skatt kr 15 300.",
            "Sammenligner med d og konkluderer: ja, det lønner seg (sparer 567 kr, eller 850 kr med fasitens avrunding).",
            "Forklarer hvorfor: mindre gjeld blir tilordnet boligen, så mindre gjeldsfradrag går tapt.",
            "Typisk feil: å tro at det er likegyldig fordi markedsverdien av nettoformuen er den samme.",
            "Vis utregningen for begge tilfeller."
          ]
        }
      ]
    },
    {
      "n": 2,
      "title": "Justeringsfaktoren som hindrer inntektsskifting",
      "points": 50,
      "topic": "Justeringsfaktor og effektiv skatt",
      "chapters": [
        5,
        1
      ],
      "body": "<p>Et viktig prinsipp for regjeringen er at man skal unngå inntektsskifting dvs at det ikke skal lønne seg å konvertere arbeidsinntekt til kapitalinntekt . Regelen som skal hindre inntektsskifting gis ved å sette høyeste marginalskatt på lønn like effektiv skatt på bedrift og eier:</p><p>t<sup>w</sup> = t<sup>k</sup> = t<sup>A</sup> + (1 − t<sup>A</sup>) · t<sup>e</sup> · y,</p><p>hvor t<sup>w</sup> er høyeste marginalskatt på lønn, t<sup>A</sup> er den alminnelige skattesatsen, t<sup>e</sup> er nominell skatt på eierinntekter og y er en justeringsfaktor.</p>",
      "parts": [
        {
          "label": "a",
          "points": 20,
          "body": "<p>Anta at t<sup>w</sup>=46,7%; t<sup>a</sup>=24% og t<sup>e</sup>=23%. Hva er justeringsfaktoren og hva er den effektive nominelle skatten på personlig eier hvis bedriften deler ut alt etter skatt som utbytte.</p>",
          "solution": "<p><b>Regelen.</b> Løs likningen t<sup>w</sup> = t<sup>A</sup> + (1 − t<sup>A</sup>) · t<sup>e</sup> · y for y.</p><p>1. y = (t<sup>w</sup> − t<sup>A</sup>) / [(1 − t<sup>A</sup>) · t<sup>e</sup>]<br>2. y = (0,467 − 0,24) / (0,76 × 0,23) = 0,227 / 0,1748 = 1,2986 ≈ <b>1,3</b>.<br>3. Effektiv nominell eierskatt = t<sup>e</sup> · y = 0,23 × 1,3 = <b>29,9 %</b> (29,87 % med uavrundet y).</p><p><b>Kontroll.</b> 0,24 + 0,76 × 0,299 = 0,467. Selskapsskatt og eierskatt til sammen gir den høyeste marginalskatten på lønn, så det lønner seg ikke å ta ut lønn som utbytte.</p><p><b>I 2026.</b> t<sup>A</sup> = t<sup>e</sup> = 22 % og oppjusteringsfaktoren er 1,72. Effektiv eierskatt blir 37,84 % og samlet skatt 0,22 + 0,78 × 0,3784 = 51,5 %, mot 47,4 % høyeste marginalskatt på lønn.</p>",
          "criteria": [
            "Snur likningen og løser for y: (0,467 − 0,24)/(0,76 × 0,23).",
            "y = 1,3 og effektiv eierskatt 23 % × 1,3 = 29,9 %.",
            "Typisk feil: å glemme faktoren (1 − t^A) og få y = 0,227/0,23 = 0,99.",
            "Vis utregningen og kontroller at 0,24 + 0,76 × 0,299 gir 46,7 %."
          ]
        },
        {
          "label": "b",
          "points": 18,
          "body": "<p>Anta at aksjeselskapet ditt har kr 10 000 i overskudd før selskapsskatt og alt overskudd etter selskapsskatt deles ut til personlig aksjonær. Anta at t<sup>w</sup>=46,7%; t<sup>a</sup>=24% og t<sup>e</sup>=23%. Hva blir beløpet det skal betales eierskatt av og hva blir eierskatten?</p>",
          "solution": "<p><b>Regelen.</b> Utbyttet er overskuddet etter selskapsskatt. Det oppjusteres med y før eierskatten beregnes.</p><p>1. Selskapsskatt: 10 000 × 24 % = 2 400.<br>2. Utbytte: 10 000 − 2 400 = 7 600.<br>3. Oppjustert grunnlag: 7 600 × 1,3 = <b>kr 9 880</b>.<br>4. Eierskatt: 9 880 × 23 % = <b>kr 2 272</b> (2 272,40).</p><p>Med uavrundet y = 1,2986 blir grunnlaget 9 870 og skatten 2 270. Fasiten bruker y = 1,3.</p><p><b>Kontroll.</b> 7 600 × 29,9 % = 2 272, samme tall som i steg 4.</p>",
          "criteria": [
            "Utbyttet er 7 600, ikke 10 000.",
            "Grunnlaget for eierskatt er 7 600 × 1,3 = 9 880.",
            "Eierskatt 9 880 × 23 % = 2 272.",
            "Typisk feil: å glemme oppjusteringen og få 7 600 × 23 % = 1 748.",
            "Vis utregningen og hent y fra a eller regn den ut på nytt."
          ]
        },
        {
          "label": "c",
          "points": 12,
          "body": "<p>Hva er skattebelastningen på bedriftens overskudd før skatt hvis vi ser bedrifts- og eierbeskatningen under ett?</p>",
          "solution": "<p><b>Regelen.</b> Samlet skattebelastning = (selskapsskatt + eierskatt) / overskudd før skatt.</p><p>1. Samlet skatt: 2 400 + 2 272 = 4 672.<br>2. Andel: 4 672 / 10 000 = <b>46,7 %</b>.</p><p><b>Kontroll.</b> Svaret er t<sup>w</sup>, slik formelen er laget for: 0,24 + 0,76 × 0,299 = 0,467. Fasiten gir full uttelling også uten utregning til den som ser at summen må bli t<sup>w</sup>.</p><p><b>I 2026.</b> 0,22 + 0,78 × 0,22 × 1,72 = 51,5 %.</p>",
          "criteria": [
            "Legger sammen selskapsskatt og eierskatt: 4 672.",
            "Deler på overskuddet før skatt, 10 000: 46,7 %.",
            "Ser at svaret er lik t^w, som er hele poenget med regelen.",
            "Typisk feil: å legge sammen satsene 24 % + 23 % = 47 %, eller dele på utbyttet i stedet for overskuddet før skatt."
          ]
        }
      ]
    }
  ]
},
/* Høsten 2016: åpne oppgaver fra før flervalgsformatet. Skrevet etter docs/fie432-eldre-sett-spek.md. */
{
  "id": "h2016",
  "label": "Høsten 2016",
  "date": "2016-11-29",
  "minutes": 240,
  "points": 100,
  "format": "4 oppgaver · 22 ledd · åpne svar · skoleeksamen",
  "note": "Skoleeksamen på fire timer med kalkulator og rentetabeller. Den har <b>bare åpne svar</b>: 22 ledd som skal regnes, utledes eller drøftes, uten alternativer å velge mellom. Eksamen i 2026 er flervalg med minuspoeng, så bruk settet til å trene regnerutinene. Satsene er fra 2016: 25 % skatt på alminnelig inntekt, formuesskatt 0,85 % over et fribeløp på kr 1,4 mill., sekundærbolig verdsatt til 80 % og gjennomsnittlig G kr 91 740. Budsjettforslaget i oppgave 2 er konstruert for oppgaven. <b>Utenfor pensum i 2026:</b> familiejussen og arven i oppgave 4a–b og pensjonsskatten i 4d–e. De ble laget av en gjesteforeleser i jus og trygd som ikke har vært tilbake siden. Bankens forretningsmodell (3i) er ikke spurt om siden. Folketrygdens alderspensjon (4c, 4f og 4g) hører til kapittel 15.",
  "facts": [
    "Skoleeksamen 29. november 2016, kl. 09.00–13.00.",
    "Hjelpemidler: kalkulator og rentetabeller.",
    "Vekter 1/6, 1/6, 1/3 og 1/3, her 17, 17, 33 og 33 poeng. Originalen har ikke poeng per ledd, så fordelingen på leddene følger arbeidsmengden.",
    "Satsene er 2016-satser. Der regelen er endret, sier løsningen hva som gjelder i 2026.",
    "Løsningene er laget med KI ut fra sensorveiledningen og kontrollregnet. Kurset har ikke kontrollert dem."
  ],
  "practiceNote": "Skriv formelen, sett inn tallene og vis hvert mellomsteg. Oppgave 3b–3h bygger på hverandre, så en feil i annuiteten følger med hele veien. Oppgave 1 og 2 er de som ligner mest på 2026: insidens og forholdsmessig gjeldsfordeling er spurt om igjen som flervalg.",
  "exercises": [
    {
      "n": 1,
      "title": "Stykkskatt: hvem bærer skatten?",
      "points": 17,
      "topic": "Insidens",
      "chapters": [
        11
      ],
      "body": "<p>Regjeringen har bestemt seg for å redusere oljepengebruken og skal finansiere statlig virksomhet gjennom å øke skatten på varer som selges. La <i>t</i> være skatten som faller på hver enhet av en vare solgt. Selger av varen skal kreve inn skatten slik at <i>P = p + t</i>, hvor <i>p</i> er pris selger får og <i>P</i> er pris ut til kunde. Vi forutsetter at markedet er i likevekt slik at tilbud er lik etterspørsel dvs <i>S(p) = D(P) og at etterspørselskurven er fallende og tilbudskurven stigende</i></p>",
      "parts": [
        {
          "label": "a",
          "points": 7,
          "body": "<p>Finn et uttrykk for hva som skjer med pris til selger og til kjøper når skatten øker (finn ∂p/∂t og ∂P/∂t)</p>",
          "solution": "<p><b>Regelen.</b> Likevekten med skattekile er D(P) = S(p) med P = p + t. Deriver begge sider med hensyn på t og løs for ∂p/∂t. ∂P/∂t følger av P = p + t.</p><p>1. Sett inn P = p + t: D(p + t) = S(p).<br>2. Deriver implisitt: D′(P)·(∂p/∂t + 1) = S′(p)·∂p/∂t.<br>3. Samle leddene med ∂p/∂t: ∂p/∂t·(S′ − D′) = D′, så <b>∂p/∂t = D′/(S′ − D′) &lt; 0</b>. Nevneren er positiv fordi S′ &gt; 0 og D′ &lt; 0. Telleren er negativ.<br>4. Fra P = p + t: ∂P/∂t = ∂p/∂t + 1 = [D′ + (S′ − D′)]/(S′ − D′), så <b>∂P/∂t = S′/(S′ − D′) &gt; 0</b>.</p><p><b>Tolkning.</b> Når skatten øker, faller prisen selger sitter igjen med. Prisen kjøper betaler, stiger.</p><p><b>Kontroll.</b> ∂P/∂t − ∂p/∂t = (S′ − D′)/(S′ − D′) = 1: hele skatteøkningen fordeles på de to prisene. Med S′ = 1 og D′ = −1 faller p med 0,5 og P stiger med 0,5 per krone i skatt.</p>",
          "criteria": [
            "Setter opp likevekten D(p + t) = S(p) og deriverer implisitt med hensyn på t.",
            "Finner ∂p/∂t = D′/(S′ − D′) og ∂P/∂t = S′/(S′ − D′).",
            "Fortegn med begrunnelse: S′ > 0 og D′ < 0 gir ∂p/∂t < 0 (selgers pris faller) og ∂P/∂t > 0 (kjøpers pris stiger).",
            "Typisk feil: å glemme leddet + 1 som kommer fra P = p + t når D(P) deriveres.",
            "Vis utregningen: hvert derivasjonssteg skal stå."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>Hva sier løsningene du har funnet under a) om hvem som reelt sett betaler skatten som selger krever inn. Korte forklaringer premieres.</p>",
          "solution": "<p><b>Regelen.</b> Hvem som formelt krever inn skatten, avgjør ikke hvem som bærer den. Fordelingen bestemmes av helningene på tilbuds- og etterspørselskurven.</p><p>1. Kjøpers andel av skatten er ∂P/∂t = S′/(S′ − D′). Selgers andel er −∂p/∂t = −D′/(S′ − D′). Andelene summerer til 1.<br>2. Forholdet mellom prisendringene: (∂P/∂t)/(∂p/∂t) = [S′/(S′ − D′)]/[D′/(S′ − D′)] = <b>S′/D′</b>.<br>3. Jo mer prisfølsomt tilbudet er (stor S′) i forhold til etterspørselen (|D′|), jo mer av skatten bærer kjøperne. Jo mer prisfølsom etterspørselen er, jo mer bærer selgerne.</p><p><b>Svar.</b> <b>Selv om selger krever inn skatten, deles byrden etter de relative helningene S′ og D′. Den minst prisfølsomme siden av markedet bærer mest.</b></p><p><b>Kontroll.</b> Sensorveiledningen sier at gode besvarelser setter opp nettopp forholdet S′/D′ og konkluderer med det relative forholdet mellom helningene.</p>",
          "criteria": [
            "Setter opp forholdet (∂P/∂t)/(∂p/∂t) = S′/D′, eller andelene S′/(S′ − D′) og −D′/(S′ − D′).",
            "Konkluderer at fordelingen avgjøres av de relative helningene på tilbud og etterspørsel.",
            "Sier hvilken vei det går: den minst prisfølsomme siden bærer mest.",
            "Typisk feil: å svare at selger betaler skatten fordi det er selger som krever den inn."
          ]
        },
        {
          "label": "c",
          "points": 5,
          "body": "<p>Anta nå at tilbudet av varen som selges er gitt dvs at tilbudet ikke kan varieres. Hvordan påvirker dette hvem som betaler skatteøkningen?</p>",
          "solution": "<p><b>Regelen.</b> Gitt tilbud betyr helt uelastisk tilbud: S′ = 0. Sett det inn i uttrykkene fra a).</p><p>1. ∂P/∂t = S′/(S′ − D′) = 0/(0 − D′) = <b>0</b>: kjøpers pris endres ikke.<br>2. ∂p/∂t = D′/(0 − D′) = <b>−1</b>: selgers pris faller krone for krone med skatten.</p><p><b>Svar.</b> <b>Selger betaler hele skatteøkningen.</b> Kvantumet er låst, så prisen kjøperne er villige til å betale for denne mengden, endres ikke. Selger kan ikke svare med å tilby mindre og må ta hele skatten i form av lavere pris.</p><p><b>Kontroll.</b> ∂P/∂t − ∂p/∂t = 0 − (−1) = 1, som det skal.</p>",
          "criteria": [
            "Tolker «gitt tilbud» som S′ = 0 (helt uelastisk tilbud).",
            "Setter inn i a): ∂P/∂t = 0 og ∂p/∂t = −1.",
            "Konkluderer at selger bærer hele skatten og at kjøpers pris er uendret.",
            "Typisk feil: å svare at kjøperne bærer alt fordi tilbudet ikke kan tilpasse seg (det gjelder helt uelastisk etterspørsel, ikke tilbud)."
          ]
        }
      ]
    },
    {
      "n": 2,
      "title": "Formuesskatt med gjeld fordelt på sekundærbolig",
      "points": 17,
      "topic": "Formuesskatten",
      "chapters": [
        7
      ],
      "body": "<p>I statsbudsjettet for 2017 ønsker Solhaug-regjeringen at sekundærbolig beholder en verdsettelsesrabatt på 20 prosent av anslått markedsverdi. Regjeringen mener det er rimelig at en samtidig reduserer verdsettelsen av gjeld tilordnet sekundærbolig tilsvarende rabatten som sekundærboliger har i formuesverdien dvs at gjelden som er tilordnet sekundærboligen reduseres med 20 prosent ved ligningsfastsettelsen. Regjeringen ønsker imidlertid ikke å øke formuesskatten for vanlige boligeiere. Derfor skal all gjeld tilordnet primærboliger verdsettes fullt ut. Med regjeringens forslag fordeles all gjeld forholdsmessig mellom eiendelene skattyter har basert på markedsverdien.</p><p>Camilla Benedicte Shau Colliet har kun formue relatert til primærbolig på Nordstrand og en sekundærbolig på Monetbello. Primærboligen og sekundærboligen har markedsverdier på henholdsvis kr 20 mill. og kr 10 mill. Camilla har totalt kr 10 mill. i gjeld. Ligningsverdien på primærboligen er 25% av markedsverdi og ligningsverdien av sekundærboligen er 80% av markedsverdi.</p><p>Jørgen Nesje (frp) og statssekretær i finansdepartementet sier i et innlegg i DN 21.10 at: «Vanlige boligeiere som kun har primærbolig, og eventuelt noen kroner i banken, vil ikke få økt skatt med regjeringens forslag». I din besvarelse skal du bruke en formuesskattesats på 0.85%.</p>",
      "parts": [
        {
          "label": "a",
          "points": 12,
          "body": "<p>Hva er Camillas formuesskatt før statsbudsjettet blir iverksatt og hva blir hennes formuesskatt etter at statsbudsjettforslaget blir iverksatt? Får Camilla økt skatt?</p>",
          "solution": "<p><b>Regelen.</b> Nettoformue = ligningsverdiene − fradragsberettiget gjeld. Før forslaget trekkes all gjeld fra fullt. Etter forslaget fordeles gjelden etter markedsverdi. Gjelden som havner på sekundærboligen, reduseres med samme 20 % som boligen.</p><p><b>Før forslaget.</b><br>1. Ligningsverdier: 20 mill. × 25 % = 5 mill. og 10 mill. × 80 % = 8 mill.<br>2. Nettoformue: 5 + 8 − 10 = 3 mill.<br>3. Formuesskatt: 3 000 000 × 0,85 % = <b>kr 25 500</b>.</p><p><b>Etter forslaget.</b><br>4. Gjeldsandeler etter markedsverdi: primærbolig 20/30 = 2/3 og sekundærbolig 10/30 = 1/3. Gjelden blir 6 666 667 og 3 333 333.<br>5. Gjelden på sekundærboligen reduseres med 20 %: 3 333 333 × 0,8 = 2 666 667. Gjelden på primærboligen verdsettes fullt.<br>6. Nettoformue: 5 000 000 + 8 000 000 − 6 666 667 − 2 666 667 = 3 666 667.<br>7. Formuesskatt: 3 666 667 × 0,85 % = <b>kr 31 167</b>.</p><p><b>Svar.</b> Ja, Camilla får <b>kr 5 667</b> mer i formuesskatt. Det er 20 % av gjelden som tilordnes sekundærboligen (666 667 kroner) som ikke lenger gir fradrag: 666 667 × 0,85 % = 5 667.</p><p><b>Kontroll.</b> Fasiten skriver 31 196 og en økning på 5 695 fordi den runder nettoformuen til 3,67 mill. før den ganger med 0,85 %. Metoden er den samme. Fasiten ser også bort fra fribeløpet på kr 1,4 mill. i satsene bakerst i oppgavesettet. Tar du det med, blir skatten 13 600 før og 19 267 etter. Økningen er den samme: kr 5 667.</p><p><b>Alternativ som godtas.</b> Ifølge sensorveiledningen skal det ikke trekkes om du mener at den negative netto ligningsverdien på primærboligen (5 − 6,67 = −1,67 mill.) ikke kan motregnes mot sekundærboligen. Da blir nettoformuen 8 − 2,67 = 5,33 mill. og skatten etter forslaget kr 45 333.</p><p><b>I 2026.</b> Sekundærbolig verdsettes til 100 % av markedsverdi. Formuesskatten er 1,0 % over et bunnfradrag på kr 1 900 000. Gjeldsreduksjonen finnes, men gjelder rabatterte aktiva som aksjer og driftsmidler, ikke boliger.</p>",
          "criteria": [
            "Før: nettoformue 5 + 8 − 10 = 3 mill. og formuesskatt kr 25 500.",
            "Etter: gjelden fordeles 2/3 og 1/3 etter markedsverdi. Bare sekundærboligens gjeldsandel reduseres med 20 %.",
            "Nettoformue 3,67 mill., skatt kr 31 167 og økning kr 5 667. Fasitens 31 196 og 5 695 (avrundet mellomregning) er like gode.",
            "Typisk feil: å redusere hele gjelden med 20 %, eller å fordele gjelden etter ligningsverdi i stedet for markedsverdi.",
            "Vis utregningen: gjeldsfordelingen og begge nettoformuene skal stå."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>Har Nesje sine ord i behold. Begrunn svaret kort (max 2-3 setninger)</p>",
          "solution": "<p><b>Regelen.</b> Gjeldsreduksjonen treffer bare gjeld som fordeles på sekundærbolig. Gjeld fordelt på primærbolig og bankinnskudd trekkes fortsatt fra fullt.</p><p><b>Svar.</b> <b>Ja, Nesje har sine ord i behold.</b> Har du bare primærbolig og bankinnskudd, havner all gjeld på eiendeler der den verdsettes fullt, så fradraget og formuesskatten blir som før. Camilla får økt skatt bare fordi hun også eier en sekundærbolig.</p><p><b>Kontroll.</b> Fjern sekundærboligen fra Camillas tall: all gjeld går da til primærboligen. Nettoformuen er den samme før og etter forslaget.</p>",
          "criteria": [
            "Svarer ja: Nesje har sine ord i behold.",
            "Begrunner: med bare primærbolig og bank fordeles all gjeld på eiendeler der gjelden verdsettes fullt, så skatten er uendret.",
            "Skiller Camilla, som får økt skatt på grunn av sekundærboligen, fra de vanlige boligeierne Nesje snakker om.",
            "Holder seg innenfor 2–3 setninger, slik oppgaven ber om."
          ]
        }
      ]
    },
    {
      "n": 3,
      "title": "Boligpris, forbrukslån og rammelån",
      "points": 33,
      "topic": "Lån",
      "chapters": [
        16,
        3,
        18
      ],
      "body": "<p>Jenny Jensen eier et hus i Oslo. Det ble kjøpt 1. januar 2003 for 2197’. Boligindeksen for Oslo har steget fra 100 ved start av januar 2003 til 273,1 ved slutt av august 2016.</p>",
      "parts": [
        {
          "label": "a",
          "points": 4,
          "body": "<p>Anta at boligen til Jenny følger gjennomsnittlig vekst i boligpriser i Oslo. Hva er verdien ved utgangen av august 2016, og hva har årlig prisvekst vært?</p>",
          "solution": "<p><b>Regelen.</b> Verdien følger indeksen: ny verdi = kjøpesum × indeks slutt/indeks start. Årlig vekst er det geometriske snittet: (slutt/start)<sup>1/n</sup> − 1.</p><p>1. Tid: 1. januar 2003 til utgangen av august 2016 er 13 år og 8 måneder, n = 13,67 år.<br>2. Verdi: 2 197 × 273,1/100 = 2 197 × 2,731 = <b>6 000’</b>, altså om lag kr 6 mill.<br>3. Årlig vekst: 2,731<sup>1/13,67</sup> − 1 = <b>7,63 %</b>.</p><p><b>Kontroll.</b> 1,0763<sup>13,67</sup> = 2,73. Det aritmetiske snittet 173,1 %/13,67 = 12,7 % er for høyt fordi det ser bort fra renters rente. Fasiten har 6 000’ og 7,63 %.</p>",
          "criteria": [
            "Verdi 6 000’ (2 197 × 2,731).",
            "Riktig tidsrom: 13 år og 8 måneder, altså 13,67 år.",
            "Årlig vekst som geometrisk snitt: 7,63 %. Aritmetisk snitt (12,7 %) er feil.",
            "Vis utregningen."
          ]
        },
        {
          "label": "b",
          "points": 3,
          "body": "<p>Jenny ønsker nå å kjøpe seg en båt til 500’. Hun har ikke spart opp egenkapital, så hun må lånefinansiere båtkjøpet. Hun vurderer to alternativer: Enten søke om et rammelån eller finansiere båten med forbrukslån. Vi skal vurdere alternativene opp mot hverandre. Gjenværende gjeld på boligen ved slutten av august 2016 er 2000’. Vi ser bort fra skatt og etablerings- og termingebyr i denne oppgaven. Tilbakebetaling skjer etterskuddsvis en gang pr år (slutten av august). Annuiteten, <i>A</i>, er gitt ved følgende formel der <i>r</i> er nominell rente og <i>T</i> er antall år:</p><p>A<sub>r,T</sub> = r·(1+r)<sup>T</sup> / ((1+r)<sup>T</sup> − 1).</p><p>Jenny tar først kontakt med en forbruksbank. Etter kun kort tid får hun et tilbud. Hun får tilbud om et annuitetslån med årlig rente på 12 %. Nedbetalingstid er 10 år.</p><p>Hva er årlig annuitetsbetaling?</p>",
          "solution": "<p><b>Regelen.</b> Årlig betaling = lånebeløp × annuitetsfaktoren A<sub>r,T</sub>.</p><p>1. Faktor: 0,12 × 1,12<sup>10</sup>/(1,12<sup>10</sup> − 1) = 0,12 × 3,1058/2,1058 = 0,176984.<br>2. Betaling: 500 000 × 0,176984 = <b>kr 88 492</b> i året.</p><p><b>Kontroll.</b> År 1: renter 500 000 × 12 % = 60 000 og avdrag 88 492 − 60 000 = 28 492, så restgjelden blir 471 508. Det stemmer med nedbetalingsplanen i fasiten.</p>",
          "criteria": [
            "Bruker annuitetsformelen med r = 12 % og T = 10: faktor 0,176984.",
            "Årlig betaling kr 88 492.",
            "Typisk feil: å regne serielån (50 000 i avdrag pluss 60 000 i renter i år 1) eller å dele renten på 12 måneder.",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 3,
          "body": "<p>Hva er summen av renter betalt for alle 10 årene?</p>",
          "solution": "<p><b>Regelen.</b> Rentesum = samlede betalinger − lånebeløpet, fordi alt utover lånebeløpet er renter.</p><p>1. Samlet betalt: 10 × 88 492,08 = 884 921.<br>2. Rentesum: 884 921 − 500 000 = <b>kr 384 921</b>.</p><p><b>Kontroll.</b> Summen av rentekolonnen i en nedbetalingsplan (60 000 + 56 581 + … + 9 481) gir det samme. Fasiten har 384 921.</p>",
          "criteria": [
            "Rentesum = 10 × A − L.",
            "Svar kr 384 921 (eller summen av rentene år for år).",
            "Typisk feil: å ta 10 × 60 000 = 600 000, som ser bort fra at gjelden nedbetales.",
            "Vis utregningen."
          ]
        },
        {
          "label": "d",
          "points": 3,
          "body": "<p>Det andre alternativet er et rammelån. Man kan låne opp til en gitt ramme eller grense og selv bestemme om man vil øke eller redusere lånet innenfor rammen. For dette alternativet vil Jenny låne totalt 2500’, hvor 2000’ er gammel gjeld og 500’ er ny. Vi antar at hun beholder samme nedbetalingsprofil på gammel gjeld, mens hun betaler ned ny gjeld som et annuitetslån over 10 år. Renten på hele rammelånet er 3 %. Det er samme rente som hun har på boliglånet (før omgjøring til rammelån).</p><p>Hva er årlig betaling på rammelånet som skyldes ny gjeld?</p>",
          "solution": "<p><b>Regelen.</b> Samme annuitetsformel på den nye gjelden, nå med r = 3 %.</p><p>1. Faktor: 0,03 × 1,03<sup>10</sup>/(1,03<sup>10</sup> − 1) = 0,117231.<br>2. Betaling: 500 000 × 0,117231 = <b>kr 58 615</b> i året.</p><p><b>Kontroll.</b> År 1: renter 15 000 og avdrag 43 615, restgjeld 456 385. Fasiten har 58 615.</p>",
          "criteria": [
            "Bruker annuitetsformelen på 500’ med r = 3 % og T = 10: faktor 0,117231.",
            "Årlig betaling kr 58 615.",
            "Typisk feil: å regne annuitet på hele rammen på 2 500’; bare den nye gjelden skyldes båten.",
            "Vis utregningen."
          ]
        },
        {
          "label": "e",
          "points": 3,
          "body": "<p>Hva er summen av renter betalt for alle 10 årene på ny gjeld?</p>",
          "solution": "<p><b>Regelen.</b> Rentesum = 10 × A − L.</p><p>1. Samlet betalt: 10 × 58 615,25 = 586 153.<br>2. Rentesum: 586 153 − 500 000 = <b>kr 86 153</b>.</p><p><b>Kontroll.</b> Summen av rentene år for år (15 000 + 13 692 + … + 1 707) gir det samme. Fasiten har 86 153.</p>",
          "criteria": [
            "Rentesum = 10 × A − L.",
            "Svar kr 86 153.",
            "Vis utregningen."
          ]
        },
        {
          "label": "f",
          "points": 3,
          "body": "<p>Hva vil du anbefale Jenny å gjøre, ta ramme- eller forbrukslån for å finansiere båten? Begrunn kort svaret.</p>",
          "solution": "<p><b>Regelen.</b> Har to lån betalinger på de samme tidspunktene der det ene er lavere hvert eneste år, er det billigere uansett diskonteringsrente. Da trengs ingen nåverdiberegning.</p><p>1. Årlig betaling: 58 615 mot 88 492, altså 29 877 lavere hvert år i ti år.<br>2. Rentesum: 86 153 mot 384 921, altså 298 768 lavere.<br>3. Betalingene kommer på de samme datoene, så rammelånet dominerer.</p><p><b>Svar.</b> <b>Ta rammelånet.</b> Det er billigere hvert år fordi renten er 3 % mot 12 %.</p><p><b>Forbehold.</b> Konklusjonen forutsetter at den gamle gjelden ikke blir dyrere (se g og h). Rammelånet krever også disiplin: det kan stå uten avdrag. Båten er da finansiert med pant i boligen.</p>",
          "criteria": [
            "Anbefaler rammelån.",
            "Begrunner med at betalingen er lavere hvert år (58 615 mot 88 492), så rammelånet dominerer og nåverdi er unødvendig.",
            "Nevner forutsetningen om at gammel gjeld ikke påvirkes, eller risikoen ved at rammelånet ikke nedbetales.",
            "Typisk feil: å sammenligne bare rentesummene uten å kommentere at betalingene kommer på samme tidspunkter."
          ]
        },
        {
          "label": "g",
          "points": 3,
          "body": "<p>Så langt har vi antatt at «gamle-lånet» på 2000’ ikke er påvirket av det «nye lånet».</p><p>Er det grunn til å tro at denne antakelsen holder? Begrunn kort svaret.</p>",
          "solution": "<p><b>Regelen.</b> Banken priser et boliglån etter risikoen. Den viktigste målestokken er belåningsgraden: gjeld delt på boligens verdi.</p><p>1. Belåningsgrad etter båtlånet: 2 500’/6 000’ = <b>41,7 %</b>.<br>2. Det er godt under 85 %, som var grensen for belåningsgrad i boliglånsforskriften i 2016. Det er også under den strengere grensen som gjelder for rammekreditt.</p><p><b>Svar.</b> <b>Ja, antakelsen holder trolig.</b> Med 41,7 % belåning er lånet fortsatt lite risikabelt for banken, så den har ingen grunn til å sette opp renten på den gamle gjelden.</p><p><b>Kontroll.</b> Fasiten har 41,7 % og sier det er fint å vise til boliglånsforskriften.</p><p><b>I 2026.</b> Utlånsforskriften setter belåningsgraden til høyst 90 % og rammekreditt med pant i bolig til høyst 60 % av boligens verdi.</p>",
          "criteria": [
            "Regner belåningsgraden: 2 500’/6 000’ = 41,7 %.",
            "Konkluderer at lånet fortsatt er lite risikabelt, så renten på gammel gjeld bør ikke endres.",
            "Viser til boliglånsforskriften (sensorveiledningen kaller det fint).",
            "Typisk feil: å regne belåningsgraden mot kjøpsprisen 2 197’ i stedet for dagens verdi 6 000’."
          ]
        },
        {
          "label": "h",
          "points": 4,
          "body": "<p>Vi antar nå at «gamle-lånet» på 2000’ hadde rente på 2 % (og ikke som før antatt på 3 %). Rammelånet har som tidligere beskrevet rente på 3 %. Endrer denne antakelsen konklusjonen fra delspørsmål f)? For enkelhetsskyld antar vi at det ikke betales avdrag på delen fra «gamle-lånet» av rammelånet.</p>",
          "solution": "<p><b>Regelen.</b> Kostnaden ved rammelånet er nå både betalingen på den nye gjelden og renteøkningen på den gamle, fordi den gamle gjelden går fra 2 % til 3 % når den legges inn i rammen.</p><p>1. Ekstra rente på gammel gjeld: 2 000 000 × (3 % − 2 %) = 20 000 i året.<br>2. Årlig kostnad ved rammelånet som skyldes båten: 58 615 + 20 000 = <b>kr 78 615</b>.<br>3. Forbrukslånet koster 88 492 i året. Rammelånet er fortsatt 9 877 lavere hvert år.<br>4. Over ti år: renter 86 153 + 200 000 = 286 153 mot 384 921.</p><p><b>Svar.</b> <b>Nei, konklusjonen står seg: rammelånet er fortsatt billigst.</b></p><p><b>Kontroll.</b> Rammelånet taper først når renteøkningen på den gamle gjelden overstiger 29 877/2 000 000 = 1,49 prosentpoeng. Fasiten har 78 615.</p>",
          "criteria": [
            "Ser at renteøkningen på gammel gjeld (1 prosentpoeng på 2 000’ = 20 000 i året) må regnes som en kostnad ved rammelånet.",
            "Årlig kostnad 78 615 mot 88 492.",
            "Konkluderer at rammelånet fortsatt er best.",
            "Typisk feil: å sammenligne 58 615 med 88 492 som før og overse renteøkningen på den gamle gjelden.",
            "Vis utregningen."
          ]
        },
        {
          "label": "i",
          "points": 4,
          "body": "<p>Mer om forbrukslån.</p><p>I kurset har vi diskutert hvordan forretningsmodellen til en bank fungerer. Med utgangspunkt i den diskusjonen, hvorfor er det så mange nye forbruksbanker som er etablert i Norge de siste årene?</p>",
          "solution": "<p><b>Regelen.</b> En bank låner inn billig (innskudd og markedsfinansiering) og låner ut dyrere. Resultatet er netto renteinntekter minus tap og driftskostnader.</p><p>1. <b>Høy nettorente.</b> Forbrukslån har høy rente (12 % i oppgaven, ofte mer), mens innlånsrenten er lav.<br>2. <b>Billig finansiering.</b> Forbruksbankene finansierer seg mest med innskudd. Innskuddsgarantien (kr 2 mill. per kunde per bank i 2016) gjør at innskyterne ikke krever risikopremie, så selv en risikabel bank får billige penger. Markedsfinansiering ville vært dyrere.<br>3. <b>Små tap i forhold til marginen.</b> Tapene på usikrede lån er høyere enn på boliglån, men langt mindre enn rentemarginen.<br>4. <b>Lave etableringskostnader.</b> Digital distribusjon krever få filialer.</p><p><b>Svar.</b> <b>Høy margin, billig innskuddsfinansiering og små tap gir svært god lønnsomhet. Superprofitt trekker nye aktører inn i bransjen</b>, slik økonomisk teori sier, til konkurransen presser fortjenesten ned.</p><p><b>Kontroll.</b> Fasiten peker på høy nettorente, små tap og billig innskuddsfinansiering. Den sier også at god fortjeneste trekker nye aktører.</p>",
          "criteria": [
            "Beskriver bankens modell: låner inn billig og låner ut dyrere, resultat = netto renteinntekter − tap − kostnader.",
            "Peker på høy nettorente og små tap i forbrukslånsmarkedet.",
            "Forklarer at innskudd (med innskuddsgaranti) er billig finansiering, også for en risikabel bank.",
            "Konkluderer med at superprofitt trekker nye aktører inn i bransjen."
          ]
        },
        {
          "label": "j",
          "points": 3,
          "body": "<p>For å hindre finansiell ubalanse i norsk økonomi har regjering fått levert en rapport som skal se på tiltak for å redusere veksten i forbrukslån. Følgende forbud er blant annet foreslått:</p><p><ul><li>Eit forbod mot reklame som oppmodar til uansvarleg låneopptak ved å for eksempel fokusere på kor raskt ein kan få svar på kredittsøknaden eller kor lett tilgjengeleg pengane er.</li><li>Eit forbod mot å rette marknadsføring av kreditt direkte mot forbrukarane gjennom dørsal og standsal.</li></ul></p><p>Kilde: https://forbrukerombudet.no/tilrar-strengare-reglar-kredittreklame</p><p>Med utgangspunkt i finansiell psykologi (behavioral finance), hvordan passer forbudene inn?</p>",
          "solution": "<p><b>Regelen.</b> Kahnemans System 1 er raskt, automatisk og impulsivt. System 2 er langsomt og analytisk. Gode lånebeslutninger krever System 2.</p><p>1. <b>Reklame om fart og tilgjengelighet</b> appellerer til System 1 og til nåtidsskjevhet: båten kommer nå, kostnaden senere.<br>2. <b>Dørsalg og standsalg</b> legger press på beslutningen i øyeblikket og gir ingen tid til å sammenligne effektiv rente og totalkostnad.<br>3. Forbudene fjerner impulsutløserne og gir betenkningstid, slik at System 2 får sjansen.</p><p><b>Svar.</b> <b>Forbudene passer godt med finansiell psykologi: de beskytter forbrukeren mot impulsive lånebeslutninger og gir rom for å tenke seg om</b>, noe som er i kundens interesse på lang sikt.</p><p><b>Kontroll.</b> Fasiten viser til System 1 og System 2 og til at kunden bør få tid til å tenke seg om.</p>",
          "criteria": [
            "Bruker System 1 og System 2 (Kahneman), eller nåtidsskjevhet og impulsivitet.",
            "Kobler hvert forbud til mekanismen: fart og lett tilgang utløser impuls, dørsalg gir press uten betenkningstid.",
            "Konkluderer med at betenkningstid lar kunden ta et mer gjennomtenkt valg.",
            "Typisk feil: å svare bare med makroøkonomisk ubalanse uten å bruke finansiell psykologi."
          ]
        }
      ]
    },
    {
      "n": 4,
      "title": "Per og Ina: samliv, arv og folketrygd",
      "points": 33,
      "topic": "Pensjon",
      "chapters": [
        15
      ],
      "body": "<p>Per (f. 1974) og Ina (f. 1982) er samboere. De har ett barn sammen, Are (2). Ina flyttet inn i Pers leilighet for fire år siden. Leiligheten hadde da en verdi på kr 2 millioner og Pers boliggjeld var kr 1 million. Verdien er nå kr 2,5 millioner og gjelden kr 500.000. Prisstigningen skyldes kun markedssituasjonen og gjelden er stort sett nedbetalt av Per, som har en årslønn på kr 700.000. Ina har jobbet deltid i perioder og har nå en årsinntekt på kr 250.000. Hennes inntekter er brukt i husholdningen. Begge jobber i privat sektor. Per har en bil til en verdi av kr 300.000. For øvrig har de ingen formue av betydning.</p><p>NB: Aktuelle satser står til slutt i oppgaven.</p><p><b>SATSER MV.</b> (står til slutt i oppgaven)</p><p>Inntektene ses i forhold til gjennomsnittlig G (grunnbeløpet i folketrygden) for 2016.</p><p>Grunnbeløpet utgjør kr 90.068 fra 1. mai 2015 til 30. april 2016 og kr 92.576 fra 1. mai 2016. Gjennomsnittlig G for 2016 er kr 91.740.</p><p>Opptjeningsprosenten (folketrygd) er 18,1 opp til 7,1G.</p><p>Delingstallprognose for personer f. 1974 er 21,37 ved uttak fra 62 år og 17,32 ved uttak fra 67 år. For personer f. 1982 er tallene hhv. 22,22 og 18,17.</p><p>Trygdeavgift lav sats (pensjonsinntekt) er 5,1% og mellomsats (lønnsinntekt) 8,2%.</p><p>Trinnskatt 1: 0.44% (159.800 - 224.900), trinnskatt 2: 1,7% (224.900 - 565.400), trinnskatt 3: 10,7% (565.400 - 909.500) og trinnskatt 4: 13,7% (over 909.500).</p><p>Skatt på alminnelig inntekt er 25 %</p><p>Formuesskatt stat og kommune: Fribeløp kr 1,4 millioner. 0,85% av overskytende (0,15 % stat, 0,7 % til kommune).</p><p>Personfradrag: Kr 51.750 i klasse 1 og kr 76.250 i klasse 2.</p><p>Minstefradraget (i lønn): 43%, maksimalt kr 91.450 og minimum kr 31.800. Minstefradrag i pensjonsinntekt er 29%, maksimalt kr 73.600 og minimum kr 4.000.</p><p>Skattefradrag for pensjonsinntekt<br>Skattefradraget for alderspensjonsinntekt: Kr 29.880. Fradraget nedtrappes med 15,3% av pensjonsinntekt mellom kr 184.800 og kr 278.950 ved 100% uttak et helt år og med 6% av overskytende.</p>",
      "parts": [
        {
          "label": "a",
          "points": 6,
          "body": "<p>Hvordan blir det økonomiske oppgjøret hvis Per og Ina skulle flytte fra hverandre? De har ingen samboeravtale. Hva ville resultatet ha blitt hvis de hadde giftet seg for fire år siden (felleseie)?</p>",
          "solution": "<p><b>Regelen.</b> Samboere uten avtale: hver beholder sitt. Ektefeller med felleseie: nettoverdiene deles likt, men verdier som ble brakt inn i ekteskapet, kan skjevdeles. Markedsdrevet verdistigning følger skjevdelingsmidlene.</p><p><b>Samboere.</b><br>1. Per beholder leiligheten og bilen: 2 500 000 − 500 000 + 300 000 = <b>kr 2 300 000</b>. Ina beholder sitt, som er lite.<br>2. At Ina har bidratt litt til nedbetalingen og brukt inntekten sin i husholdningen, gir neppe sameie eller vederlagskrav. Det følger av Høyesterettsdommen fra 2011 som ble gjennomgått i kurset. Det støttes av at Per har hatt den klart høyeste inntekten.</p><p><b>Gift med felleseie.</b><br>3. Skjevdeling: Per hadde netto 2 mill. − 1 mill. = 1 mill. i leiligheten, altså halve verdien. Prisstigningen er rent markedsdrevet, så halvparten av dagens verdi kan skjevdeles: 0,5 × 2 500 000 = <b>kr 1 250 000</b>. Nedbetalingen etter giftemålet er gjort med inntekt i ekteskapet og er felleseie.<br>4. Til likedeling: 2 500 000 + 300 000 − 500 000 − 1 250 000 = 1 050 000, altså <b>kr 525 000 til hver</b>.<br>5. Per får 1 250 000 + 525 000 = 1 775 000. Ina får 525 000.</p><p><b>Alternativ som godtas.</b> Begrunner du at bilen også er skjevdelingsmidler (brakt inn i ekteskapet, arv eller gave fra andre enn ektefellen), blir likedelingen 750 000, altså 375 000 til hver. Utgangspunktet er likevel at felleseie likedeles.</p><p><b>Kontroll.</b> 1 775 000 + 525 000 = 2 300 000, som er hele nettoformuen.</p>",
          "criteria": [
            "Samboere: hver beholder sitt. Ina har neppe vederlagskrav for bidrag til nedbetaling eller bruk av inntekt i husholdningen.",
            "Gift: Per skjevdeler 1 250 000, fordi han brakte inn halve leiligheten og verdistigningen er markedsdrevet.",
            "Resten, 1 050 000, deles likt: 525 000 til hver. Per får 1 775 000 og Ina 525 000.",
            "Typisk feil: å skjevdele bilen uten begrunnelse, eller å skjevdele bare 1 000 000 og overse verdistigningen.",
            "Vis utregningen."
          ]
        },
        {
          "label": "b",
          "points": 5,
          "body": "<p>Hvordan blir arveoppgjøret dersom Per skulle falle fra (ved ugift samliv)? Per har ikke opprettet testament. Hva ville resultatet ha blitt hvis de hadde vært gift?</p>",
          "solution": "<p><b>Regelen.</b> En samboer med felles barn arver 4 G. En ektefelle arver 1/4 av boet når avdøde har barn, men minst 4 G. Barna arver resten.</p><p><b>Samboere.</b><br>1. Pers bo: 2 500 000 − 500 000 + 300 000 = 2 300 000.<br>2. Ina arver 4 G. Med G på dødstidspunktet (kr 92 576 fra 1. mai 2016): 4 × 92 576 = <b>kr 370 304</b>.<br>3. Are arver resten: 2 300 000 − 370 304 = <b>kr 1 929 696</b>.</p><p><b>Gift.</b><br>4. Først skiftes felleseiet som i a). Ina beholder sine 525 000. Pers bo er 1 250 000 + 525 000 = 1 775 000.<br>5. Ina arver 1/4: 1 775 000/4 = <b>kr 443 750</b>, som er over minstearven på 4 G (370 304).<br>6. Are arver 1 775 000 − 443 750 = <b>kr 1 331 250</b>.<br>7. Ina sitter da igjen med 525 000 + 443 750 = 968 750. Som ektefelle kan hun også velge å sitte i uskiftet bo.</p><p><b>Kontroll.</b> Fasiten skriver «ca. 370 000», som er 4 × 92 576. Med gjennomsnittlig G for 2016 (91 740), som oppgaven bruker i c), blir det 366 960. Begge må godtas.</p><p><b>I 2026.</b> Arveloven fra 2021 viderefører 4 G til samboer med felles barn. Ektefellen arver fortsatt 1/4, men minsteretten er hevet fra 4 G til 6 G.</p>",
          "criteria": [
            "Samboer: Ina arver 4 G (om lag kr 370 000), Are resten av boet på 2 300 000.",
            "Gift: felleseiet skiftes først, så Pers bo er 1 775 000.",
            "Ina arver 1/4 = 443 750, som er over minstearven på 4 G. Are arver 1 331 250.",
            "Typisk feil: å ta 1/4 av hele 2 300 000 uten å skifte felleseiet først.",
            "Vis utregningen."
          ]
        },
        {
          "label": "c",
          "points": 5,
          "body": "<p>Hvilken alderspensjon fra folketrygden (før skatt) kan Per påregne fra fylte 62 år, basert på inntektsnivået ovenfor over 30 år og på kr 500.000 over 10 år?</p>",
          "solution": "<p><b>Regelen.</b> Hvert år legges 18,1 % av inntekten opp til 7,1 G inn i pensjonsbeholdningen. Årlig pensjon = beholdning/delingstall.</p><p>1. Tak: 7,1 × 91 740 = 651 354. Lønnen på 700 000 er over taket.<br>2. 30 år ved taket: 651 354 × 18,1 % × 30 = 3 536 852.<br>3. 10 år på 500 000: 500 000 × 18,1 % × 10 = 905 000.<br>4. Beholdning: 3 536 852 + 905 000 = 4 441 852.<br>5. Pensjon fra 62 år med delingstall 21,37: 4 441 852/21,37 = <b>kr 207 855</b> i året.</p><p><b>Kontroll.</b> Fasiten skriver beholdningen som 4 441 842, en sifferfeil. Pensjonen 207 855 er den samme med begge tallene. Utregningen ser bort fra regulering av beholdningen, slik oppgaven legger opp til.</p><p><b>I 2026.</b> Opptjeningsmodellen er den samme, men pensjonsforliket fra 2024 hever aldersgrensene gradvis for yngre årskull, så tidligste uttak for Pers kull blir trolig senere enn 62 år.</p>",
          "criteria": [
            "Bruker taket 7,1 G = 651 354 for de 30 årene med lønn på 700 000.",
            "Beholdning 4 441 852 (18,1 % × 651 354 × 30 + 18,1 % × 500 000 × 10).",
            "Deler på delingstallet for kull 1974 ved 62 år, 21,37: pensjon kr 207 855.",
            "Typisk feil: å regne 18,1 % av hele lønnen på 700 000, eller å bruke delingstallet for uttak fra 67 år.",
            "Vis utregningen."
          ]
        },
        {
          "label": "d",
          "points": 5,
          "body": "<p>Hva blir ekstraskatten på alderspensjonen for Per, gitt uttak ved fylte 62 år og at han fortsetter i inntektsgivende arbeid med kr 700.000 i lønn.</p>",
          "solution": "<p><b>Regelen.</b> Pensjonen kommer på toppen av lønnen og skattlegges med marginalsatsene der. Minstefradraget er allerede fullt utnyttet av lønnen (43 % × 700 000 er over taket på 91 450 og samlet minstefradrag for lønn og pensjon kan ikke overstige det). Personfradraget er også brukt. Skattefradraget for pensjonsinntekt kommer til fratrekk.</p><p>1. Trygdeavgift, lav sats: 207 855 × 5,1 % = 10 601.<br>2. Trinnskatt: personinntekten blir 700 000 + 207 855 = 907 855, under 909 500, så hele pensjonen ligger i trinn 3: 207 855 × 10,7 % = 22 240.<br>3. Alminnelig inntekt: 207 855 × 25 % = 51 964.<br>4. Skattefradrag: 29 880 − 15,3 % × (207 855 − 184 800) = 29 880 − 3 527 = 26 353.<br>5. Ekstraskatt: 10 601 + 22 240 + 51 964 − 26 353 = <b>kr 58 452</b>, som er <b>28,1 %</b> av pensjonen.</p><p><b>Kontroll.</b> Fasiten har 58 452 og 28,1 %.</p><p><b>I 2026.</b> Skatten på alminnelig inntekt er 22 % og trinnskatten har fem trinn, så tallene blir andre, men regnemåten med marginalsatser på toppen av lønnen er den samme.</p>",
          "criteria": [
            "Trygdeavgift 5,1 % og trinnskatt 3 (10,7 %), fordi 907 855 ligger under grensen for trinn 4.",
            "Skatt på alminnelig inntekt 25 % av hele pensjonen, med begrunnelse for at minstefradrag og personfradrag allerede er brukt.",
            "Skattefradraget nedtrappet med 15,3 % av inntekten over 184 800: 26 353.",
            "Ekstraskatt kr 58 452, eller 28,1 %.",
            "Vis utregningen."
          ]
        },
        {
          "label": "e",
          "points": 5,
          "body": "<p>Gitt at Per har opparbeidet rett til AFP (privat sektor) med utbetaling på kr 55.000 fra fylte 62 år. Hva utgjør skatten på denne AFP-utbetalingen når han i tillegg har nevnte lønnsinntekt på kr 700.000 og 100% uttak av alderspensjon fra folketrygden?</p>",
          "solution": "<p><b>Regelen.</b> AFP er pensjonsinntekt. Den skattlegges med marginalsatsene på toppen av lønn og alderspensjon. Den trapper også ned skattefradraget for pensjonsinntekt.</p><p>1. Marginalsats i trinn 4: trygdeavgift 5,1 % + trinnskatt 13,7 % + alminnelig inntekt 25 % + nedtrapping av skattefradraget 15,3 % = 59,1 %. Pensjonsinntekten blir 207 855 + 55 000 = 262 855, under 278 950, så hele AFP-en trapper ned fradraget med 15,3 %.<br>2. Foreløpig: 55 000 × 59,1 % = 32 505.<br>3. Korreksjon: de første 909 500 − 907 855 = 1 645 kronene ligger i trinn 3, som er 3 prosentpoeng lavere: 1 645 × 3 % = 49.<br>4. Skatt på AFP: 32 505 − 49 = <b>kr 32 456</b>, som er <b>59,0 %</b> av AFP-beløpet.</p><p><b>Kontroll.</b> Fasiten har 32 456 og 59 %.</p>",
          "criteria": [
            "Ser at AFP-en havner i trinn 4 (bortsett fra de første 1 645 kronene).",
            "Tar med alle fire marginalsatsene: 5,1 % + 13,7 % + 25 % + 15,3 % nedtrapping = 59,1 %.",
            "Korrigerer for de 1 645 kronene i trinn 3: skatt kr 32 456 (59 %).",
            "Typisk feil: å glemme at AFP-en trapper ned skattefradraget for pensjonsinntekt.",
            "Vis utregningen."
          ]
        },
        {
          "label": "f",
          "points": 3,
          "body": "<p>Hvordan er Inas opptjeningsrettigheter i folketrygden ivaretatt?</p>",
          "solution": "<p><b>Regelen.</b> Den som mottar barnetrygden for et barn under seks år (til og med året barnet fyller 5), får omsorgsopptjening som om inntekten var 4,5 G. Får hun mer av egen inntekt, gjelder den. De to legges ikke sammen.</p><p>1. Omsorgsopptjening: 4,5 × 91 740 = 412 830 × 18,1 % = <b>kr 74 722</b> i året til pensjonsbeholdningen.<br>2. Egen inntekt gir bare 250 000 × 18,1 % = 45 250, så omsorgsopptjeningen gjelder.<br>3. Are er 2 år, så ordningen varer til og med året han fyller 5.</p><p><b>Kontroll.</b> Fasiten har 74 722 og sier at hun ikke får opptjening for egen inntekt i tillegg når den er under 4,5 G.</p>",
          "criteria": [
            "Omsorgsopptjening tilsvarende 4,5 G for den som mottar barnetrygden.",
            "Regner 412 830 × 18,1 % = 74 722 i året.",
            "Sier at den ikke kommer i tillegg til egen inntekt. Den varer til og med året barnet fyller 5.",
            "Vis utregningen."
          ]
        },
        {
          "label": "g",
          "points": 4,
          "body": "<p>Per og Ina har hørt om levealdersjustering, nøytralt uttak og underregulering av pensjoner og ber om en forklaring på hva dette innebærer. Kom herunder inn på om det er forskjell på levealdersjusteringen for kvinner og menn, og avhengig av de aktuelle personers alder.</p>",
          "solution": "<p><b>Levealdersjustering.</b> Pensjonen justeres ved uttak for endringer i befolkningens levealder. Det skjer gjennom delingstallet: lever et kull lenger, får det høyere delingstall og lavere årlig pensjon for samme beholdning. Ina (f. 1982) har delingstall 22,22 ved 62 år mot Pers 21,37, fordi 1982-kullet ventes å leve lenger. 1 mill. i beholdning gir Per 46 795 i året og Ina 45 005.</p><p><b>Nøytralt uttak.</b> Forventet nåverdi av alle utbetalingene skal være den samme uansett uttaksalder. Det kommer fram i forskjellen mellom delingstallene innen et kull: Per har 21,37 ved 62 år og 17,32 ved 67 år, så samme beholdning gir 21,37/17,32 = 1,23 ganger så høy årlig pensjon ved uttak fra 67.</p><p><b>Kjønn og alder.</b> Delingstallene er <b>felles for kvinner og menn</b>, selv om kvinner lever lenger. Forskjellen går på årskull og uttaksalder, ikke på kjønn. Delingstallet for alderen ved inngangen til uttaksmåneden brukes.</p><p><b>Underregulering.</b> Pensjon under utbetaling ble i 2016 regulert med lønnsveksten minus 0,75 prosentpoeng, altså svakere enn lønningene. Fasiten omtaler ikke dette punktet.</p><p><b>I 2026.</b> Siden 2022 reguleres pensjon under utbetaling med gjennomsnittet av lønnsveksten og prisveksten.</p>",
          "criteria": [
            "Levealdersjustering: delingstallet per årskull justerer pensjonen for økt levealder. Ina har høyere delingstall enn Per.",
            "Nøytralt uttak: forventet nåverdi uavhengig av uttaksalder, via ulike delingstall for ulike uttaksaldre.",
            "Felles delingstall for kvinner og menn: ingen kjønnsforskjell i levealdersjusteringen.",
            "Underregulering: pensjon under utbetaling reguleres svakere enn lønnsveksten (lønnsvekst minus 0,75 % i 2016)."
          ]
        }
      ]
    }
  ]
},
];
