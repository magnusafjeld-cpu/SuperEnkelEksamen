/* ===================== FIE432 · SJEKKLISTE =====================
   Alt som kan komme på eksamen, punkt for punkt, sortert etter forelesning og
   eksamensvekt. Vises i /sjekkliste (js/bundle-sjekkliste.js) og lastes først
   når modulen åpnes (manifest.lazy). Kursgodkjenningen ligger i den private
   utvidelsen privat-sjekkliste, fordi kurset ikke deler ut fasiten.
   Bygget av fag/privat-sjekkliste/_kilde/bygg.py. Ikke rediger for hånd. */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.sjekklisteInfo = {"eksamen": "2026-11-12", "intro": "Alt som kan komme på eksamen, fra forelesning 1–11, Kvadsheim og Næss. Hvert punkt er en ferdighet med et kort svar, og «Mer» gir forklaring, talleksempel, felle og kilde. Merk ✓ når du kan forklare punktet uten å se på svaret og ? når du er usikker. Innenfor hver forelesning kommer temaene med høyest eksamensvekt først."};
window.EDU_DATA.sjekkliste = [
{
"id": "f1-progressivitet",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Progressivitet, effektiv skattesats og hvem som eier overskuddet",
"eksamensvekt": 4,
"viktigst": [
"Progressivt = gjennomsnittsskatten øker med inntekten, ikke at de rike betaler flest kroner",
"Flat sats uten bunnfradrag er proporsjonal; med bunnfradrag progressiv; større bunnfradrag gir sterkere progressivitet",
"Effektiv skattesats = betalt skatt / bruttoinntekt før skatt",
"For eiere skal andelen av selskapets bruttoinntekt og selskapsskatt med i brøken",
"Tilbakeholdt overskudd eies reelt av aksjonærene fordi det kapitaliseres i aksjekursen"
],
"punkter": [
{
"id": "f1-progressivitet-01",
"nivaa": "kjerne",
"kan": "Avgjøre om et skattesystem er progressivt",
"kort": "Progressivt hvis gjennomsnittsskatten T/Y øker med inntekten. At de rike betaler flere kroner er ikke nok: Pia (1 000) og Nico (5 000) med 25 % hver gir ikke et progressivt system.",
"mer": "<p>Nico betaler fem ganger så mye i kroner, men samme andel av inntekten, så systemet er proporsjonalt. Regressivt betyr at gjennomsnittsskatten faller med inntekten. Torsvik og Mogstad (DN 2021) kritiserte Astrup for å kalle systemet progressivt fordi de rike betaler mer av den totale skatteinntekten. Det stemmer ikke.<\/p><p><b>Felle:<\/b> alternativet som definerer progressivitet ved kronebeløp eller ved andel av samlet skatteinngang.<\/p>",
"kilder": [
"F1 lb 18",
"F1 lb 19",
"F7 lb 22",
"eldre F1 lb 14"
],
"eksamen": [
"H2018 o1c",
"H2024 o4a"
]
},
{
"id": "f1-progressivitet-02",
"nivaa": "kjerne",
"kan": "Avgjøre progressivitet med flat sats og bunnfradrag",
"kort": "Flat sats uten bunnfradrag er proporsjonal (verken progressiv eller regressiv). Med bunnfradrag blir den progressiv; større bunnfradrag gir sterkere progressivitet.",
"mer": "<p><b>H2024 o4:<\/b> 28 % flat. Uten fradrag: begge 28 %. Bunnfradrag 50: Kari (500) 25,2 %, Per (1 000) 26,6 %. Bunnfradrag 200: Kari 16,8 %, Per 22,4 %, større avstand.<\/p><p><b>F7-eksempel:<\/b> 27 % med bunnfradrag 40 000 gir 23,4 % og 24,8 % (300 000 og 500 000); med 80 000 gir det 19,8 % og 22,7 %.<\/p><p><b>Felle:<\/b> «bunnfradrag gjør systemet regressivt» eller «like progressivt».<\/p>",
"kilder": [
"F7 lb 25"
],
"eksamen": [
"H2024 o4a",
"H2024 o4b",
"H2024 o4c"
]
},
{
"id": "f1-progressivitet-03",
"nivaa": "kjerne",
"kan": "Velge skattesystemet der gjennomsnittsskatten er lik for alle",
"kort": "Bare flat sats uten bunnfradrag (og uten andre faste fradrag eller overføringer) gir lik gjennomsnittsskatt for alle inntekter.",
"mer": "<p><b>Felle:<\/b> å tro at «flat skatt» alltid gir lik gjennomsnittsskatt. Flat marginalsats med bunnfradrag er progressiv.<\/p>",
"kilder": [
"F1 lb 19",
"F7 lb 25"
],
"eksamen": [
"H2024 o4a"
]
},
{
"id": "f1-progressivitet-04",
"nivaa": "kjerne",
"kan": "Regne ut effektiv skattesats",
"kort": "Effektiv skattesats = betalt skatt / brutto inntekt før skatt. Pia: 220 000/1 000 000 = 22 %.",
"mer": "<p>Nevneren er brutto inntekt, ikke skattepliktig overskudd. <b>H2025 o5:<\/b> inntekt 100 000, avskrivning 25 000, skatt 22 % av 75 000 = 16 500; effektiv sats 16 500/100 000 = 16,5 %, ikke 22 %.<\/p><p><b>H2020 o1d:<\/b> selskapet betaler 44 000 og eieren 16 000 av 100 000 i inntekt før skatt: (44 000 + 16 000)/100 000 = 60 %.<\/p><p><b>Felle:<\/b> å dele på skattepliktig inntekt eller på utbyttet etter selskapsskatt.<\/p>",
"kilder": [
"F1 lb 20",
"F1 lb 21"
],
"eksamen": [
"H2025 o5",
"H2020 o1d"
]
},
{
"id": "f1-progressivitet-05",
"nivaa": "kjerne",
"kan": "Forklare hvordan effektiv skattesats skal måles for en aksjonær",
"kort": "Aksjonærens andel av selskapets brutto inntekt skal i nevneren og andelen av selskapsskatten i telleren. Ellers blir eiere uten utbytte målt som om de ikke har inntekt.",
"mer": "<p>Argumentet «de med null inntekt er ikke nullskatteytere fordi de betaler skatt gjennom selskapene» krever logisk at også selskapsinntekten henføres til eieren. F5 skriver AERT for eier = (personskatt + α · selskapsskatt)/(personinntekt + α · selskapsinntekt), der α er eierandelen.<\/p><p><b>H2022 o1 spm 5:<\/b> (33 000 + 36 800)/150 000 = 46,5 %.<\/p><p><b>Felle:<\/b> å regne eierskatten delt på utbyttet (31,5 % i H2022 o1 spm 4) når spørsmålet gjelder samlet sats.<\/p>",
"kilder": [
"F1 lb 20",
"F5 lb 22",
"F5 lb 23"
],
"eksamen": [
"H2022 o1 spm 5",
"H2019 o3c",
"H2018 o2c"
]
},
{
"id": "f1-progressivitet-06",
"nivaa": "kjerne",
"kan": "Forklare Pia og Nico-eksempelet om effektiv skatt og tilbakeholdt overskudd",
"kort": "Pia får 1 mill. i renter, betaler 220 000 og har effektiv sats 22 %. Nico eier et selskap med 1 mill. i overskudd og 220 000 i selskapsskatt, tar ikke utbytte og registreres uten inntekt i SSB-statistikken.",
"mer": "<p>Begge har reelt samme inntekt og samme skatt. Pias renter registreres på henne fordi hun eier kontoen. Nicos inntekt registreres bare når han tar utbytte som personlig aksjonær. Godtar vi at han ikke eier overskuddet, er hans effektive skattesats «ikke-eksisterende» og han ser fattig ut i statistikken.<\/p><p><b>Felle:<\/b> å tro at Nico har lavere skatt enn Pia. Skatten er lik; det er målingen som skiller dem.<\/p>",
"kilder": [
"F1 lb 21",
"eldre F1 lb 18"
],
"eksamen": []
},
{
"id": "f1-progressivitet-07",
"nivaa": "viktig",
"kan": "Ta stilling til påstanden om at aksjonærer ikke eier overskuddet før det er utbetalt",
"kort": "Påstanden holder ikke i en markedsøkonomi: tilbakeholdt overskudd i børsnoterte selskaper øker aksjekursen og kan realiseres ved salg og i unoterte selskaper bestemmer majoritetseieren selv når utbytte tas.",
"mer": "<p>En mulig tolkning er at aksjonærene mangler råderett over utbyttetidspunktet. Men godtar vi påstanden, tror vi ikke på markedsmekanismen eller på at dominerende eier kontrollerer selskapet og da blir spørsmålet hvem som eier selskapet. Påstanden påvirker hvordan vi måler ulikhet og effektiv skatt (SSB1, SSB2).<\/p><p><b>Felle:<\/b> «overskuddet er eierløst til utbytte deles ut».<\/p>",
"kilder": [
"F1 lb 20",
"F1 lb 22",
"eldre F1 lb 15"
],
"eksamen": []
},
{
"id": "f1-progressivitet-08",
"nivaa": "viktig",
"kan": "Vite hva økonomer mener skal med i inntekt og formue i fordelingsanalyser",
"kort": "Ta med eierinntekter opparbeidet i selskaper og skatt betalt gjennom selskaper. Pensjon regnes som formue bare hvis den eksisterer som en andel arvingene kan overta.",
"mer": "<p>Offentlig ansatte har ingen pensjonsformue som kan arves. Privat ansatte med en eid andel i et pensjonsfond som arvingene overtar, har reell formue. Pensjon er som lønn, en løpende utbetaling: er pensjon formue, er vel lønn også formue? (Hva er formuen til en ufør 25-åring?) Eldre versjon: nåverdien av fremtidig lønn eller pensjon kan ikke legges til fordi horisonten ikke kan tallfestes og utbetalingene er usikre.<\/p><p><b>Felle:<\/b> å regne opptjente folketrygdrettigheter som privat formue.<\/p>",
"kilder": [
"F1 lb 25",
"eldre F1 lb 19"
],
"eksamen": []
},
{
"id": "f1-progressivitet-09",
"nivaa": "viktig",
"kan": "Forklare kritikken av å regne folketrygdrettigheter som individuell formue",
"kort": "Utbetalingene finansieres av den samme befolkningen, så rettighetene gir ikke et dekkende bilde av samlede krav og forpliktelser. Juel (Civita) brukte pensjon til å hevde at formuesfordelingen ikke er skjev; Moum kalte det «pensjonsundring».",
"mer": "<p>Steinar Juel (Civita) skrev «Formuesfordelingen i Norge er ikke skjev» og viste til at offentlige pensjonsordninger ikke er med i formuesberegningene. Knut Moum (tidligere ekspedisjonssjef i Finansdepartementet) svarte at å inkludere folketrygdrettigheter uten å ta hensyn til hvem som finansierer dem, gir et misvisende bilde av fordelingen.<\/p><p><b>Felle:<\/b> å tro at rettigheter i folketrygden kan arves eller selges som annen formue.<\/p>",
"kilder": [
"F1 lb 23",
"F1 lb 24"
],
"eksamen": []
},
{
"id": "f1-progressivitet-10",
"nivaa": "detalj",
"kan": "Vite hva Stortinget har vedtatt om progressivitet",
"kort": "Stortinget har ikke vedtatt noe bindende prinsipp om progressivitet, men har sluttet seg til skatteevneprinsippet: de med størst økonomisk evne skal betale mest skatt.",
"mer": "<p>Skatteevne betyr ikke nødvendigvis høyere effektiv skattesats (jf. Pia og Nico). Hvor mye ulikhet vi aksepterer er et politisk spørsmål, men man kan ikke ha egne fakta om statistikk og definisjoner (eldre F1). Et progressivt skattesystem omfordeler ikke nødvendigvis fra rik til fattig; det avhenger også av overføringene (F7).<\/p><p><b>Felle:<\/b> «Grunnloven eller Stortinget krever progressiv skatt».<\/p>",
"kilder": [
"F7 lb 26",
"F7 lb 27",
"eldre F1 lb 16"
],
"eksamen": []
}
]
},
{
"id": "f1-etter-skatt",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Etter-skatt-tenkning: aksjegevinst eller renteinntekt",
"eksamensvekt": 3,
"viktigst": [
"Vi investerer der avkastningen etter skatt er høyest, ikke der den er høyest før skatt",
"Renter: 22 %. Aksjegevinst og utbytte: 22 % × 1,72 = 37,84 %",
"100 000 i renter og 125 482 i aksjegevinst gir begge 78 000 etter skatt",
"Oppjusteringen skal hindre inntektsskifting fra lønn til utbytte"
],
"punkter": [
{
"id": "f1-etter-skatt-01",
"nivaa": "kjerne",
"kan": "Forklare lærepunktet om avkastning før og etter skatt",
"kort": "Investorer velger høyest avkastning etter skatt. Samfunnet tjener mest på investeringer med høyest avkastning før skatt, så skattefavoriserte investeringer kan ha lav samfunnsøkonomisk avkastning.",
"mer": "<p>En investering med høy avkastning etter skatt kan ha lav avkastning før skatt hvis den er skattefavorisert, f.eks. skattefri utleie av del av egen bolig, primærbolig med lav formuesverdi eller unoterte aksjer med lav formuesverdi. Kapitalen går da dit skattefordelen er størst, ikke dit den skaper mest verdi. «Vi investerer for vårt eget beste!»<\/p><p><b>Felle:<\/b> alternativet «investorer maksimerer avkastning før skatt» eller «skatt påvirker ikke valg av investering».<\/p>",
"kilder": [
"F1 lb 6",
"eldre F1 lb 10"
],
"eksamen": []
},
{
"id": "f1-etter-skatt-02",
"nivaa": "kjerne",
"kan": "Vite skattesatsen på renteinntekt og på aksjegevinst og utbytte for personlig aksjonær i 2026",
"kort": "Renteinntekt: 22 % (alminnelig inntekt). Aksjegevinst og utbytte utover skjerming: 22 % × 1,72 = 37,84 %.",
"mer": "<p>Gevinst og utbytte utover skjermingsfradraget oppjusteres med 1,72 og skattlegges så som alminnelig inntekt med 22 %. Effektiv nominell eierskatt blir 0,22 · 1,72 = 37,84 %.<\/p><p><b>Eksempel (H2025 o10):<\/b> gevinst 50 gir skatt 50 · 1,72 · 0,22 = 18,92, det samme som 50 · 37,84 %.<\/p><p><b>Felle:<\/b> å bruke 22 % på aksjegevinst, eller å oppjustere renteinntekter. Renter oppjusteres ikke.<\/p>",
"kilder": [
"F1 lb 41",
"F4 lb 20"
],
"eksamen": [
"H2025 o10",
"H2024 o2"
]
},
{
"id": "f1-etter-skatt-03",
"nivaa": "kjerne",
"kan": "Regne ut hvilken aksjegevinst som gir samme etter-skatt-beløp som en gitt renteinntekt",
"kort": "Renter × (1 − 0,22) = gevinst × (1 − 0,3784). 100 000 i renter og 125 482 i gevinst gir begge 78 000 etter skatt, så investoren er indifferent.",
"mer": "<p>100 000 · 0,78 = 78 000. Gevinsten som gir det samme: 78 000/0,6216 = 125 483 (lysbildet skriver 125 482). Generelt er G = R · 0,78/0,6216 ≈ 1,255 · R. Forelesningen ser bort fra at aksjekurser kan gå opp eller ned.<\/p><p><b>Felle:<\/b> å dele på 0,3784 i stedet for 0,6216, eller å velge 125 482 fordi beløpet er størst.<\/p>",
"kilder": [
"F1 lb 40",
"F1 lb 41"
],
"eksamen": []
},
{
"id": "f1-etter-skatt-04",
"nivaa": "viktig",
"kan": "Forklare hvorfor renteinntekt og aksjegevinst har ulik skattesats",
"kort": "Overskuddet er allerede skattlagt med 22 % i selskapet og oppjusteringen gjør at selskap og eier til sammen skattlegges omtrent som høyeste marginalskatt på lønn. Det hindrer inntektsskifting fra lønn til utbytte.",
"mer": "<p>F1 stiller spørsmålet, F4 svarer: oppjusteringsfaktoren skal gjøre det like lønnsomt på marginen å tjene penger i bedriften som å være lønnsmottaker. Renter er ikke skattlagt i et selskap først, så de får bare 22 %.<\/p><p><b>Felle:<\/b> «aksjer er mer risikable, derfor høyere skatt». Satsforskjellen handler om inntektsskifting og at selskapsskatten allerede er betalt, ikke om risiko.<\/p>",
"kilder": [
"F1 lb 41",
"F4 lb 20",
"F4 lb 49"
],
"eksamen": []
},
{
"id": "f1-etter-skatt-05",
"nivaa": "detalj",
"kan": "Kjenne forutsetningene bak indifferensregnestykket",
"kort": "Det ser bort fra skjermingsfradraget, fra forventet realavkastning på aksjer mot bankinnskudd og fra risikoen for tap eller gevinst på aksjer.",
"mer": "<p>Den eldre versjonen lister forbeholdene på et eget lysbilde. Med skjerming blir skatten lavere enn 37,84 % av hele gevinsten og aksjer er risikable mens renter er sikre. 2026-versjonen sier bare at vi ser bort fra at kursene kan gå opp eller ned.<\/p><p><b>Felle:<\/b> å konkludere at aksjer og bank er likeverdige investeringer generelt. Indifferensen gjelder bare de to sikre beløpene i eksempelet.<\/p>",
"kilder": [
"F1 lb 40",
"eldre F1 lb 40"
],
"eksamen": []
}
]
},
{
"id": "f1-skattesystem",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Skattesystemet: alminnelig inntekt, personinntekt og satser 2026",
"eksamensvekt": 3,
"viktigst": [
"Alminnelig inntekt (lønn, renter, selskapsoverskudd, leie): 22 %",
"Personinntekt: i tillegg trinnskatt (5 trinn) og trygdeavgift",
"Høyeste marginalskatt på lønn 2026: 22 + 17,8 + 7,6 = 47,4 %",
"Gjennomsnittsskatt t = T/Y; marginalskatt = skatt på neste krone",
"Trinnskatt regnes intervall for intervall"
],
"punkter": [
{
"id": "f1-skattesystem-01",
"nivaa": "kjerne",
"kan": "Vite hva som skattlegges som alminnelig inntekt og med hvilken sats",
"kort": "Alminnelig inntekt (lønn, renteinntekt, selskapsoverskudd, netto leieinntekt) skattlegges med 22 % i 2026. Fradrag som minstefradrag og gjeldsrenter går mot alminnelig inntekt.",
"mer": "<p>22 % er både personskatt på alminnelig inntekt og selskapsskatt. Derfor er rentefradraget verdt 22 % av renten og en endring i satsen virker både på lønn og på fradrag (F3 lb 6). Utbytte og aksjegevinst er også alminnelig inntekt, men oppjusteres med 1,72 først.<\/p><p><b>Felle:<\/b> å tro at trinnskatt og trygdeavgift gjelder renteinntekt eller utbytte. De gjelder bare personinntekt.<\/p>",
"kilder": [
"F4 lb 20",
"F3 lb 6",
"F3 lb 16"
],
"eksamen": []
},
{
"id": "f1-skattesystem-02",
"nivaa": "kjerne",
"kan": "Forklare forskjellen på alminnelig inntekt og personinntekt",
"kort": "Personinntekt (lønn, næringsinntekt) ilegges trinnskatt og trygdeavgift i tillegg til 22 %. Kapitalinntekt ilegges bare 22 % (utbytte og gevinst med oppjustering).",
"mer": "<p>Trinnskatten har 5 trinn og gir progressivitet i beskatningen av arbeidsinntekt. Kapitalbeskatningen har ingen trinnskatt og er dermed ikke progressiv (F7). De aller rikeste har nesten ikke personinntekt (Ring mfl. 2026), så trinnskatten treffer dem lite.<\/p><p><b>Felle:<\/b> «Norge har progressiv skatt på all inntekt». Progressiviteten gjelder arbeidsinntekt.<\/p>",
"kilder": [
"F4 lb 20",
"F7 lb 26",
"F1 lb 32"
],
"eksamen": []
},
{
"id": "f1-skattesystem-03",
"nivaa": "kjerne",
"kan": "Regne ut høyeste marginalskatt på lønn i 2026",
"kort": "22 % + 17,8 % (trinn 5) + 7,6 % (trygdeavgift) = 47,4 %, uten arbeidsgiveravgift.",
"mer": "<p>Trinn 5 gjelder inntekt over 1 467 200 kr (2026). I inntektsskiftningsligningen legges 12,4 % arbeidsgiveravgift til: 47,4 % + 12,4 % = 59,8 % = 22 % + 22 % · y gir y ≈ 1,72.<\/p><p><b>Avvik:<\/b> F4 lb 51 skriver 22 + 7,8 + 17,6 = 47,5 % (eldre satser). Bruk 47,4 % for 2026.<\/p><p><b>Felle:<\/b> å legge til hele arbeidsgiveravgiften på 14,1 % eller å glemme trygdeavgiften.<\/p>",
"kilder": [
"F4 lb 49",
"F4 lb 51",
"F3 lb 16"
],
"eksamen": []
},
{
"id": "f1-skattesystem-04",
"nivaa": "kjerne",
"kan": "Definere marginalskatt og gjennomsnittsskatt",
"kort": "Marginalskatt: skatten på den neste kronen du tjener. Gjennomsnittsskatt (effektiv gjennomsnittsskatt, AERT): t = T/Y, betalt skatt delt på bruttoinntekt før fradrag.",
"mer": "<p>I et progressivt trinnsystem er gjennomsnittsskatten lavere enn marginalskatten. Nevneren er bruttoinntekt, ikke skattepliktig inntekt etter fradrag.<\/p><p><b>H2018 o1c-fasit:<\/b> definer t = T/Y, der T er betalt skatt og Y bruttoinntekt; systemet er progressivt hvis t øker når Y øker.<\/p><p><b>Felle:<\/b> å dele skatten på skattepliktig inntekt (gir for høy sats) eller å bruke marginalsatsen som gjennomsnitt.<\/p>",
"kilder": [
"F7 lb 21",
"F1 lb 20"
],
"eksamen": [
"H2018 o1c"
]
},
{
"id": "f1-skattesystem-05",
"nivaa": "kjerne",
"kan": "Regne ut gjennomsnittsskatt i et trinnsystem",
"kort": "Skatten beregnes intervall for intervall. H2024 o5: 12 000 + 45 000 + 28 000 = 85 000 på 450 000 gir 18,9 %; 380 000 gir 65 400 og 17,2 %.",
"mer": "<p>Satsene: 12 % til 100 000, 18 % fra 100 000 til 350 000, 28 % over 350 000. Begge betaler 12 000 på første trinn og 45 000 på andre. A: 28 % av 100 000 = 28 000. X: 28 % av 30 000 = 8 400.<\/p><p>Sensorveiledningen skriver 17,1 % i teksten, men 65 400/380 000 = 17,21 % og svaralternativet er 17,2 %.<\/p><p><b>Felle:<\/b> å bruke 28 % på hele inntekten.<\/p>",
"kilder": [
"F7 lb 21"
],
"eksamen": [
"H2024 o5"
]
},
{
"id": "f1-skattesystem-06",
"nivaa": "viktig",
"kan": "Vite trygdeavgift og marginalskatt på næringsinntekt fra utleie i 2026",
"kort": "Trygdeavgift: 7,6 % på lønn og 10,8 % på næringsinntekt. Utleie av mer enn fire boenheter er næring: 22 + 10,8 + 17,8 = 50,6 % marginalt.",
"mer": "<p>Med fire eller færre boenheter skattlegges netto leie som kapitalinntekt med 22 %, uten trygdeavgift og trinnskatt. Forelesningen forutsetter i caset at investoren ikke driver næring.<\/p><p><b>Felle:<\/b> å bruke 47,4 % (lønn) på næringsinntekt, eller å bruke 50,6 % på vanlig utleie av én sekundærbolig.<\/p>",
"kilder": [
"F3 lb 16",
"F4 lb 49"
],
"eksamen": []
},
{
"id": "f1-skattesystem-07",
"nivaa": "viktig",
"kan": "Forklare hva som skjer med skatten på utbytte når trinnskatten endres",
"kort": "Oppjusteringsfaktoren settes slik at selskapsskatt pluss eierskatt matcher høyeste marginalskatt på lønn. Høyere trinnskatt gir høyere marginalskatt, høyere oppjusteringsfaktor og høyere effektiv utbytteskatt.",
"mer": "<p>Inntektsskiftningsligningen: marginalskatt lønn + arbeidsgiveravgift = t<sub>A<\/sub> + t<sub>A<\/sub> · y. Med 47,4 % + 12,4 % = 22 % + 22 % · y blir y = 37,8/22 ≈ 1,72. Øker trinn 5 med ett prosentpoeng, blir y = 38,8/22 ≈ 1,76 og eierskatten 38,8 %.<\/p><p><b>Felle:<\/b> «utbytte har ikke trinnskatt, så trinnskatten påvirker ikke utbytte». Den virker indirekte via y.<\/p>",
"kilder": [
"F1 lb 5",
"F4 lb 49",
"F4 lb 50"
],
"eksamen": [
"H2020 o1e"
]
},
{
"id": "f1-skattesystem-08",
"nivaa": "detalj",
"kan": "Kjenne nivået på effektiv personskatt for vanlige lønninger",
"kort": "Uten gjeld og andre fradrag: ca. 19,3 % (400 000), 22,1 % (500 000), 24,0 % (600 000) og 25,4 % (700 000). Medianlønn 660 000 gir ca. 24,9 % (2026).",
"mer": "<p>Tallene brukes til sammenligning med investorer som tar utbytte: 600 000 i utbytte på 10 mill. investert gir effektiv skattesats 25,5 % (F4), på linje med en lønnstaker på 700 000. Poenget er at de rikeste kan betale mindre enn vanlige lønnsmottakere.<\/p><p><b>Felle:<\/b> å tro at lønnstakere med middels inntekt betaler rundt 47 % i snitt. Det er marginalskatten på toppen, ikke gjennomsnittet.<\/p>",
"kilder": [
"F4 lb 39",
"F5 lb 44"
],
"eksamen": []
},
{
"id": "f1-skattesystem-09",
"nivaa": "detalj",
"kan": "Vite hvilke trinnskattesatser forelesningene oppgir",
"kort": "Forelesningene oppgir bare trinn 5: 17,8 % over 1 467 200 kr (2026). Trinn 1–4 står ikke på lysbildene, så eksamen må oppgi dem.",
"mer": "<p>Til orientering (Skatteetaten 2026, ikke på lysbildene): trinn 1 1,7 % fra 226 100, trinn 2 4,0 % fra 318 300, trinn 3 13,7 % fra 725 050, trinn 4 16,8 % fra 980 100. Eksamen har brukt egne trinn og satser (H2024 o5), så lær metoden, ikke tabellen.<\/p><p><b>Felle:<\/b> å blande 2025-satser (trinn 5 17,7 %, trygdeavgift 7,7 %) med 2026-satser.<\/p>",
"kilder": [
"F3 lb 16",
"Satser 2026 (Skatteetaten)"
],
"eksamen": [
"H2024 o5"
]
}
]
},
{
"id": "f1-skattefradrag",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Verdien av skattefradrag og tidsverdi",
"eksamensvekt": 2,
"viktigst": [
"Et fradrag er verdt fradrag × marginalskatt",
"Ta fradrag og avskrivninger så tidlig som mulig når inntekten dekker dem",
"Pia: 94 353 fordelt mot 98 077 alt i år 1, ca. 3 700 bedre",
"«Spiller ingen rolle» er bare riktig hvis renten er 0"
],
"punkter": [
{
"id": "f1-skattefradrag-01",
"nivaa": "kjerne",
"kan": "Regne ut skattebesparelsen av et fradrag",
"kort": "Skattebesparelse = fradrag × marginalskattesats. 100 000 i minstefradrag med 34 % skatt sparer 34 000.",
"mer": "<p>Fradraget reduserer skattegrunnlaget, ikke skatten direkte. Verdien avhenger derfor av satsen fradraget går mot. Samme logikk gir rentefradraget: renter × 22 % (F3: 12 500 i renter koster 9 750 etter skatt). 34 % og 4 % i Pia-eksempelet er eksempeltall.<\/p><p><b>Felle:<\/b> å trekke hele fradraget fra skatten (100 000 spart) eller å bruke gjennomsnittsskatten i stedet for marginalskatten.<\/p>",
"kilder": [
"F1 lb 42",
"F1 lb 43",
"F3 lb 6"
],
"eksamen": []
},
{
"id": "f1-skattefradrag-02",
"nivaa": "kjerne",
"kan": "Regne nåverdien av fradrag fordelt over tid mot alt med en gang",
"kort": "Fordelt: 34 000/1,04 + 34 000/1,04² + 34 000/1,04³ ≈ 94 353. Alt i år 1: 102 000/1,04 ≈ 98 077. Ta alt med en gang; gevinsten er ca. 3 700.",
"mer": "<p>Pia tjener 600 000 i hvert av tre år og har 100 000 i minstefradrag per år. Listhaug tilbyr å trekke fra alle 300 000 i år 1. Skattebesparelsen i kroner er den samme (102 000), men kommer tidligere. Forelesningen diskonterer også år 1. Uten diskontering av år 1 blir differansen 102 000 − 98 127 = 3 873.<\/p><p><b>Felle:<\/b> «likegyldig fordi summen av fradragene er lik».<\/p>",
"kilder": [
"F1 lb 42",
"F1 lb 43",
"F1 lb 44"
],
"eksamen": []
},
{
"id": "f1-skattefradrag-03",
"nivaa": "kjerne",
"kan": "Velge avskrivningsprofil når inntekten er større enn avskrivningen",
"kort": "Avskriv alt med en gang. Nåverdien av skattebesparelsen er høyest når fradraget kommer tidligst.",
"mer": "<p><b>H2024 o3:<\/b> leie 100 000 i ti år, avskrivning 100 000 nå eller 10 000 per år, sats 22 %, rente 10 %. Nå: 22 000. Fordelt: 2 200 · 6,1446 = 13 518. Svar: alt med en gang.<\/p><p><b>H2020 o1a:<\/b> overskudd 500 000 og maskin til 100 000. Avskriv hele beløpet i år 1 fordi inntekten overstiger investeringen.<\/p><p><b>Felle:<\/b> «det spiller ingen rolle». Det stemmer bare med null rente.<\/p>",
"kilder": [
"F1 lb 44"
],
"eksamen": [
"H2024 o3",
"H2020 o1a"
]
},
{
"id": "f1-skattefradrag-04",
"nivaa": "viktig",
"kan": "Kjenne unntakene der det ikke lønner seg å ta fradraget med en gang",
"kort": "Hvis marginalskatten er lavere i år 1 enn senere, eller hvis fradraget i år 1 overstiger inntekten og ikke kan fremføres.",
"mer": "<p>Regelen på lysbildet er at det alltid er bedre å ta fradraget med en gang hvis du har inntekt som overstiger fradragets verdi. Den eldre versjonen har to forhold som kan snu konklusjonen:<\/p><ul><li>lavere marginalskatt i år 1 (lav inntekt): fradraget går mot en lavere sats<\/li><li>fradrag større enn skattepliktig inntekt uten fremføring: overskytende fradrag blir verdiløst<\/li><\/ul><p><b>Felle:<\/b> å glemme vilkåret «så lenge man har inntekt å skrive av mot» (fasiten til H2024 o3).<\/p>",
"kilder": [
"F1 lb 44",
"eldre F1 lb 44"
],
"eksamen": [
"H2024 o3"
]
},
{
"id": "f1-skattefradrag-05",
"nivaa": "detalj",
"kan": "Forklare hvorfor utsatt skatt er verdifullt",
"kort": "Utsatt skatt virker som et rentefritt lån fra staten. Prinsippet: ta fradrag tidligst mulig og utsett skattepliktig inntekt lengst mulig.",
"mer": "<p>Samme tidsverdilogikk som fradragseksempelet. ASK gir skattekreditt fordi gevinsten først skattlegges ved uttak (F3). H2024 o13b (Næss-delen) bruker samme begrunnelse for IPS: utsatt skatt kan ses som et rentefritt lån fra staten.<\/p><p><b>Felle:<\/b> å tro at en skattekreditt bare er en likviditetsfordel uten verdi. Med positiv rente har utsettelsen nåverdi.<\/p>",
"kilder": [
"F1 lb 44",
"F3 lb 58"
],
"eksamen": [
"H2024 o13b"
]
}
]
},
{
"id": "f1-anine",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Formuesskatt i mediedebatten: Anine-eksempelet",
"eksamensvekt": 2,
"viktigst": [
"Unoterte aksjer verdsettes til bokført verdi (eiendeler − gjeld), ikke markedsverdi",
"Aksjerabatt 20 %, bunnfradrag 1,7 mill. (2025), sats 1,0 % og 1,1 % over 20 mill.",
"Anines 495 000 kr i formuesskatt ble i virkeligheten 19 000 kr",
"Smarte investorer tar selskapet av børs for å senke formuesverdien"
],
"punkter": [
{
"id": "f1-anine-01",
"nivaa": "kjerne",
"kan": "Regne ut formuesskatten i Anine-eksempelet riktig",
"kort": "Formuesverdi = 45 % av bokført verdi 10 mill. = 4,5 mill. Skatt = (4,5 mill. × 0,8 − 1,7 mill.) × 1 % = 19 000 kr.",
"mer": "<p>Anine Stang (VG): investorer betaler 10 mill. for 10 % («verdsettelse 100 mill.») og hun eier 50 % av resten, dvs. 45 %. Hennes regnestykke: 45 mill. × 1,1 % = 495 000. Feilene:<\/p><ul><li>unotert selskap verdsettes til bokført verdi: 10 mill. innskudd − 0 gjeld<\/li><li>20 % aksjerabatt er ikke trukket fra<\/li><li>bunnfradraget på 1,7 mill. er ikke trukket fra<\/li><li>1,1 % gjelder bare formue over 20 mill.<\/li><\/ul><p><b>Felle:<\/b> å bruke emisjonsverdien for et unotert selskap.<\/p>",
"kilder": [
"F1 lb 14",
"F1 lb 15",
"F1 lb 16"
],
"eksamen": [
"H2023 o4a"
]
},
{
"id": "f1-anine-02",
"nivaa": "kjerne",
"kan": "Vite hvordan børsnoterte og unoterte aksjer verdsettes i formuesskatten",
"kort": "Børsnoterte: kurs per 1. januar i skattefastsettingsåret (året etter inntektsåret); unoterte: bokført verdi (i praksis nedskrevne eiendeler minus gjeld). Begge får 20 % rabatt.",
"mer": "<p>Hadde Anines selskap vært børsnotert og verdsatt til 100 mill., ville regnestykket hennes vært riktig (bortsett fra rabatt og bunnfradrag). Bokført verdi fanger i liten grad opp forventet inntjening, immaterielle verdier og risiko (eldre F2).<\/p><p><b>Felle:<\/b> «formuesverdien er siste emisjonskurs» eller «unoterte aksjer får ikke aksjerabatt».<\/p>",
"kilder": [
"F1 lb 15",
"F1 lb 17",
"F2 lb 6",
"F2 lb 7"
],
"eksamen": [
"H2023 o4a"
]
},
{
"id": "f1-anine-03",
"nivaa": "viktig",
"kan": "Forklare hvorfor formuesverdien i Anines selskap i praksis blir enda lavere",
"kort": "Investorpengene brukes til lønn, drift og utvikling i løpet av året, så bokført verdi ved årets slutt blir lavere enn 10 mill.",
"mer": "<p>Eksempelet forutsetter at innskuddet står urørt på konto hele året. I en oppstartsbedrift brukes kapitalen og eiendelene som står igjen er ofte lave. Formuesskatten for gründere blir derfor lav selv når emisjonsverdien er høy.<\/p><p><b>Felle:<\/b> «formuesskatten tvinger gründere til å betale skatt av verdien investorene betaler». For unoterte selskaper skattlegges bokført verdi.<\/p>",
"kilder": [
"F1 lb 17",
"eldre F1 lb 36"
],
"eksamen": []
},
{
"id": "f1-anine-04",
"nivaa": "viktig",
"kan": "Forklare hvorfor investorer kan ta selskaper av børs",
"kort": "Unoterte aksjer får formuesverdi lik bokført verdi, som typisk er langt lavere enn markedsverdien. Avnotering senker formuesskattegrunnlaget.",
"mer": "<p>Smarte investorer tar selskapene av børs for å spare formuesskatt. Det er samme mekanisme som gjør at de rikeste eier mest unoterte aksjer (F2): formuesgrunnlaget for aksjer hos de aller rikeste kan være ned mot 10 % av markedsverdien (Ring mfl. 2026).<\/p><p><b>Felle:<\/b> å tro at børsnoterte og unoterte aksjer med samme markedsverdi gir samme formuesskatt.<\/p>",
"kilder": [
"F1 lb 17",
"F1 lb 32",
"F2 lb 7"
],
"eksamen": []
},
{
"id": "f1-anine-05",
"nivaa": "detalj",
"kan": "Forklare forelesningens kritikk av medier og lobby i skattedebatten",
"kort": "Meninger om skatt er ofte farget av politikk snarere enn fag. Næringslivspressen driver kampanjejournalistikk og Anine-oppslaget ble brukt i valgkampen selv om regnestykket var feil.",
"mer": "<p>«Det kan være sant selv om det står i avisen.» DN-oppslaget om bedrifter som styres fra Sveits forteller ikke at ca. halvparten av alle selskap i Norge er eid av utlendinger (særlig svensker og dansker, men også amerikanere). En gründer avslørte Anine-feilen i VG og Stang «la seg flat». Eldre versjon: media mangler ofte kompetanse og blir mikrofonstativ for lobbygrupper.<\/p><p><b>Felle:<\/b> å bruke et medieoppslag som kilde til hvordan skattereglene virker.<\/p>",
"kilder": [
"F1 lb 11",
"F1 lb 12",
"F1 lb 16",
"eldre F1 lb 31"
],
"eksamen": []
}
]
},
{
"id": "f1-eksamensformat",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Eksamensformat, minuspoeng og gjettestrategi",
"eksamensvekt": 1,
"viktigst": [
"3 poeng for rett, −1 for feil og 0 for blankt (eller 6 og −2)",
"Blind gjetting blant fire alternativer har forventning 0",
"Kan du utelukke ett alternativ, lønner det seg å svare (+1/3 poeng i snitt)",
"H2024 og H2025 hadde ikke minuspoeng; 2026 har det"
],
"punkter": [
{
"id": "f1-eksamensformat-01",
"nivaa": "kjerne",
"kan": "Regne ut forventet poeng ved å gjette blindt på et spørsmål med fire alternativer",
"kort": "E = ¼ · 3 + ¾ · (−1) = 0. Minuspoenget er valgt slik at blind gjetting har forventning null.",
"mer": "<p>Lysbildet setter E[gjette] = ¼R + ¾F = 0 og løser for F = −R/3. Med R = 3 blir F = −1, med R = 6 blir F = −2.<\/p><p><b>Felle:<\/b> å tro at blind gjetting taper poeng i forventning. Det gjør den ikke, men den øker spredningen (standardavvik ca. 1,7 poeng per spørsmål). Står du nær en karaktergrense og er risikoavers, kan et helt ukjent spørsmål stå blankt.<\/p>",
"kilder": [
"F1 lb 8"
],
"eksamen": []
},
{
"id": "f1-eksamensformat-02",
"nivaa": "kjerne",
"kan": "Avgjøre når det lønner seg å svare selv om du er usikker",
"kort": "Svar når sannsynligheten for rett svar er over 25 %. Med ett alternativ utelukket er forventningen +1/3 poeng, med to utelukket +1 poeng.",
"mer": "<p>Med sannsynlighet p for rett svar: E = 3p − (1 − p) = 4p − 1. Nullpunktet er p = 1/4.<\/p><ul><li>4 igjen: p = 1/4, E = 0<\/li><li>3 igjen: p = 1/3, E = +0,33<\/li><li>2 igjen: p = 1/2, E = +1<\/li><\/ul><p><b>Felle:<\/b> å hoppe over spørsmål der du kan eliminere ett alternativ. Gale alternativer bygger ofte på glemt skatt, brutto i stedet for netto eller feil nevner, så eliminering er ofte mulig.<\/p>",
"kilder": [
"F1 lb 8"
],
"eksamen": []
},
{
"id": "f1-eksamensformat-03",
"nivaa": "viktig",
"kan": "Utlede minuspoenget for en vilkårlig poengskala",
"kort": "Med fire alternativer er F = −R/3: 3 poeng for rett gir −1, 6 gir −2.",
"mer": "<p>Generelt med n alternativer: E = (1/n)R + ((n − 1)/n)F = 0 gir F = −R/(n − 1). Med fire alternativer er n − 1 = 3.<\/p><p><b>Felle:<\/b> å tro at minuspoenget er −R/4 (−0,75 ved 3 poeng). Da får gjetting positiv forventning, noe ordningen nettopp skal hindre.<\/p>",
"kilder": [
"F1 lb 8"
],
"eksamen": []
},
{
"id": "f1-eksamensformat-04",
"nivaa": "detalj",
"kan": "Vite rammene for eksamen og kursgodkjenning i 2026",
"kort": "Skoleeksamen 4 timer, flervalg i Wiseflow i klasserom, karakter A–F. Kursgodkjenning: 17 av 20 rett, tre forsøk, samarbeid tillatt men individuell levering.",
"mer": "<p>Fristen for kursgodkjenningstesten er den samme som fristen for oppmelding til eksamen og den som glemmer testen får ikke nytt forsøk. Testen tas over 2–3 uker (eldre versjon: 3–4 uker). Forelesningene filmes ikke.<\/p>",
"kilder": [
"F1 lb 3",
"F1 lb 7",
"eldre F1 lb 6"
],
"eksamen": []
},
{
"id": "f1-eksamensformat-05",
"nivaa": "detalj",
"kan": "Vite at minuspoeng er nytt i 2026",
"kort": "H2024 og H2025 ga ikke minuspoeng for feil eller ubesvarte svar. Vanen «svar på alt» fra gamle sett gjelder ikke lenger.",
"mer": "<p>Forsiden på H2024: «Ubesvarte spørsmål eller feil svar gir ikke minuspoeng». I 2026 gjelder 3 og −1 (eller 6 og −2) og 0 for blankt. Gamle sett er fortsatt gode øvingsoppgaver, men poengstrategien må justeres.<\/p><p><b>Felle:<\/b> å krysse av på alt også når du ikke kan eliminere noe alternativ. Det gir ingen forventet gevinst, bare mer spredning.<\/p>",
"kilder": [
"F1 lb 8",
"H2024 forside"
],
"eksamen": []
}
]
},
{
"id": "f1-ulikhet-tall",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Ulikhet i Norge: tallene i forelesning 1",
"eksamensvekt": 1,
"viktigst": [
"2001–2018: snittvekst i inntekt Norge 50 %, USA 25 %",
"Nederste 20 %: USA 35 %, Norge 21 %",
"Topp 1 %: Norge 187 %, USA 45 %",
"Regressivt på toppen: ca. 22 % for topp 1 % og 14 % for topp 0,1 % (2004)",
"Formuen til de rikeste vokser mye raskere enn registrert inntekt etter 2006"
],
"punkter": [
{
"id": "f1-ulikhet-tall-01",
"nivaa": "kjerne",
"kan": "Vite inntektsveksten i Norge og USA 2001–2018 for gjennomsnittet og de nederste 20 %",
"kort": "Gjennomsnitt: Norge 50 %, USA 25 %. Nederste 20 %: USA 35 %, Norge 21 %.",
"mer": "<p>Forelesningen stiller påstandene som par der den ene er speilvendt. Riktig: norske hushold vokste dobbelt så mye i snitt, men de nederste 20 % vokste raskere i USA. Kilden er SSB2 kap. 7 (inntekt etter skatt, CBO-data for USA).<\/p><p><b>Felle:<\/b> det speilvendte alternativet («Norge 25 %, USA 50 %» eller «Norge 35 %, USA 21 %»).<\/p>",
"kilder": [
"F1 lb 27",
"F1 lb 28",
"SSB2 s. 81"
],
"eksamen": []
},
{
"id": "f1-ulikhet-tall-02",
"nivaa": "kjerne",
"kan": "Vite inntektsveksten 2001–2018 for middelklassen og toppen i Norge og USA",
"kort": "Midterste 60 %: Norge 38 %, USA 20 %; 80.–99. prosentil: Norge 47 %, USA 32 %. Topp 1 %: Norge 187 %, USA 45 %.",
"mer": "<p>Påstand 1 på lysbildet er riktig. Det falske alternativet sier at topp 1 % vokste 52 % i Norge mot 69 % i USA. Den store veksten for topp 1 % i Norge kommer av at selskapsinntekt er med; måles inntekt som i offisiell statistikk, blir veksten på toppen mye mindre (SSB2).<\/p><p><b>Felle:<\/b> å tro at USA har hatt sterkest inntektsvekst på toppen.<\/p>",
"kilder": [
"F1 lb 29",
"SSB2 s. 81",
"SSB2 s. 82"
],
"eksamen": []
},
{
"id": "f1-ulikhet-tall-03",
"nivaa": "kjerne",
"kan": "Forklare hvorfor det norske skattesystemet er regressivt på toppen",
"kort": "Effektiv gjennomsnittsskatt øker opp til ca. 99. prosentil (37 %), men faller til ca. 22 % for topp 1 % og 14 % for topp 0,1 % (3 700 personer) i 2004. De rikeste har mest eierinntekt som holdes tilbake i selskapene.",
"mer": "<p>Tallene er fra Aaberge mfl. (2020) = SSB1. Topp 1 % hadde i snitt 6 035 000 kr i bruttoinntekt. Skatt etter evne ville krevd minst 38 % for topp 1 %, dvs. 16 pp mer og ca. 30 mrd. kr mer i skatt i 2004. Tilbakeholdt overskudd regnes som inntekt, men utløser ikke personskatt.<\/p><p><b>Felle:<\/b> «Norge har progressiv skatt hele veien opp». Det gjelder bare til ca. 99. prosentil.<\/p>",
"kilder": [
"F1 lb 31",
"SSB1 s. 20"
],
"eksamen": []
},
{
"id": "f1-ulikhet-tall-04",
"nivaa": "viktig",
"kan": "Kjenne forelesningens påstand om topp 1 % sin andel av markedsinntekten",
"kort": "Forelesningen: topp 1 % økte sin andel av markedsinntekten fra 11 % til 30 % (2004–2018) til tross for formuesskatten og mellom 25 og 30 % av markedsinntekten tilfaller 1 % av befolkningen.",
"mer": "<p>Påstanden «formuesskatten har ført til at de rikeste har fått en mindre andel» er feil ifølge forelesningen.<\/p><p><b>Avvik:<\/b> SSB1 oppgir at topp 1 % (justert mål) fikk 22 % i 2006 og 2007 og 11–17 % i offisiell statistikk 2002–2005. SSB2 gir 7 → 15 % av inntekt etter skatt. Til eksamen: bruk forelesningens tall når spørsmålet gjengir lysbildet, artikkeltallene når det spør om artikkelen.<\/p><p><b>Felle:<\/b> å blande markedsinntekt, bruttoinntekt og inntekt etter skatt.<\/p>",
"kilder": [
"F1 lb 30",
"F1 lb 34",
"SSB1 s. 11",
"SSB1 s. 13",
"SSB2 s. 22"
],
"eksamen": []
},
{
"id": "f1-ulikhet-tall-05",
"nivaa": "viktig",
"kan": "Kjenne fakta om formue og kapitalskatt i forelesning 1",
"kort": "Topp 1 % sin andel av formuen økte fra 14,8 % til 21 % (1995–2016) fordi aksjer ble mer konsentrert på toppen. Selskapsskatten har falt fra 50,8 % til 22 % siden midten av 80-tallet.",
"mer": "<ul><li>Formuesgrunnlaget for aksjer er bare ca. 10 % av markedsverdien hos de aller rikeste og de har nesten ikke personinntekt (Ring mfl. 2026).<\/li><li>Topp 0,01 % (ca. 300 hushold i 2010) skjuler i snitt ca. 20 % av formuen i skatteparadis (Alstadsæter, Johannesen og Zucman 2019).<\/li><\/ul><p><b>Felle:<\/b> å bytte om tallene, f.eks. 21 % skjult i skatteparadis eller 20 % formuesgrunnlag.<\/p>",
"kilder": [
"F1 lb 31",
"F1 lb 32"
],
"eksamen": []
},
{
"id": "f1-ulikhet-tall-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor formuen til de rikeste har vokst mye raskere enn inntekten",
"kort": "Etter skattereformen i 2006 ble det mindre lønnsomt å ta utbytte. Overskudd ble holdt tilbake i selskapene, aksjeverdiene (formuen) steg mye og registrert inntekt steg svakt.",
"mer": "<p>Figuren for de 400 rikeste viser formue, inntekt og skatt 2014–2024: formuen stiger kraftig, inntekt og skatt svakt. Samlet formue blant de 400 rikeste økte fra 1 884 til 2 390 mrd. kr på tre år, +27 %.<\/p><p><b>Felle:<\/b> «formuen har steget fordi de rike har tatt ut store utbytter». Det er motsatt: de tar ut lite utbytte.<\/p>",
"kilder": [
"F1 lb 33"
],
"eksamen": []
},
{
"id": "f1-ulikhet-tall-07",
"nivaa": "viktig",
"kan": "Kjenne størrelsen på toppgruppene",
"kort": "Topp 1 % er ca. 40 000 personer. Topp 0,01 % (de superrike) er ca. 300–400 personer. Topp 0,1 % var ca. 3 700 personer i 2004.",
"mer": "<p>Forelesningen bruker tallene til å vise hvor få som får 25–30 % av markedsinntekten. Eldre versjon: økte forskjeller gir disse personene mye makt og posisjoner arves skattefritt fordi Norge ikke har arveavgift.<\/p><p><b>Felle:<\/b> å blande topp 0,1 % (ca. 3 700) og topp 0,01 % (ca. 300–400).<\/p>",
"kilder": [
"F1 lb 31",
"F1 lb 34",
"eldre F1 lb 22"
],
"eksamen": []
},
{
"id": "f1-ulikhet-tall-08",
"nivaa": "detalj",
"kan": "Lese figuren over formuesfordelingen i Norge",
"kort": "50 % av befolkningen har ingen formue. 80 % av befolkningen eier til sammen 9,1 % av formuen og mesteparten er hos de 5 % rikeste.",
"mer": "<p>Figuren (Skatteetaten) er en kumulativ fordeling som er flat til rundt 55. persentil og stiger bratt på toppen. Eldre versjon: formuesulikheten falt merkbart bare i perioden 1950–1970 og har økt hvert år siden.<\/p><p><b>Felle:<\/b> å tolke 9,1 % som andelen de rikeste eier.<\/p>",
"kilder": [
"F1 lb 34",
"eldre F1 lb 20"
],
"eksamen": []
},
{
"id": "f1-ulikhet-tall-09",
"nivaa": "detalj",
"kan": "Kjenne argumentene i den eldre versjonen om Norge mot USA",
"kort": "Moene (2015): fire ganger så mange rike (inntekt 30–100 mill. USD) og dobbelt så mange superrike (over 100 mill. USD) i Norge. Norge lykkes bedre enn USA blant annet fordi velferdsstaten gir alle sjansen til utdanning.",
"mer": "<p>Bare i eldre versjon av F1. Andre forklaringer på lysbildet:<\/p><ul><li>kvinners yrkesdeltakelse er 4–5 pp høyere enn i USA<\/li><li>internasjonal ustabilitet har tjent Norge bedre enn USA<\/li><li>velferdsstaten gjør det mer attraktivt å være entreprenør fordi fallet er mindre om man mislykkes (NAV)<\/li><\/ul><p><b>Felle:<\/b> «den amerikanske drømmen er lettere å nå i USA» uten forbehold.<\/p>",
"kilder": [
"eldre F1 lb 46",
"eldre F1 lb 51"
],
"eksamen": []
}
]
},
{
"id": "f1-pengemakt",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Pengemakt og politisk makt",
"eksamensvekt": 1,
"viktigst": [
"Rokkan: «Stemmer teller, men ressurser avgjør»",
"Kanaler: finansiering av politikk, medieeierskap, tenketanker, tilgang og nettverk",
"Økt ulikhet bekymrer fordi den forskyver politisk makt"
],
"punkter": [
{
"id": "f1-pengemakt-01",
"nivaa": "viktig",
"kan": "Forklare Rokkans «Stemmer teller, men ressurser avgjør»",
"kort": "Velgerne bestemmer sammensetningen av Stortinget, men de viktigste beslutningene avgjøres i praksis gjennom maktkamp mellom mektige interesseorganisasjoner (arbeidsliv og næringsliv).",
"mer": "<p>Stein Rokkan var norsk statsviter. Poenget er at store interessegrupper ofte har mer innflytelse bak kulissene enn det velgerne uttrykker i stemmeseddelen. Forelesningen bruker dette til å begrunne hvorfor økt ulikhet er bekymringsfullt: ressurser gir makt.<\/p><p><b>Felle:<\/b> å tolke sitatet som at velgerne ikke har innflytelse i det hele tatt.<\/p>",
"kilder": [
"F1 lb 36"
],
"eksamen": []
},
{
"id": "f1-pengemakt-02",
"nivaa": "viktig",
"kan": "Nevne kanalene der pengemakt blir politisk makt",
"kort": "Finansiering av politikk (valgkampbidrag, lobbying, tenketanker), eierskap i medier, personlig tilgang til beslutningstakere, profesjonelle nettverk (NHO, FinansNorge, LO) og overrepresentasjon i partienes toppledelse.",
"mer": "<ul><li>Valgkampbidrag: rike ga store summer til borgerlig side i 2025, LO til venstresiden<\/li><li>Lobbying: f.eks. First House<\/li><li>Tenketanker: Agenda, Civita og Minerva skriver kronikker og former debatten<\/li><li>Medier: kontroll over aviser, TV og sosiale medier styrer hvilke saker som får oppmerksomhet (eldre versjon: Murdoch, Bezos, Musk)<\/li><\/ul><p><b>Felle:<\/b> å tro at forelesningen bare peker på én politisk side. LO nevnes også.<\/p>",
"kilder": [
"F1 lb 37",
"F1 lb 38",
"eldre F1 lb 28"
],
"eksamen": []
},
{
"id": "f1-pengemakt-03",
"nivaa": "detalj",
"kan": "Kjenne Gilens og Page-studien og de norske eksemplene i eldre versjon",
"kort": "Gilens og Page (Testing Theories of American Politics) fant at politiske beslutninger i USA oftere gjenspeiler interessene til økonomiske eliter og interessegrupper enn til gjennomsnittsborgeren.",
"mer": "<p>Bare i eldre F1 (lysbildet oppgir 2009). Eldre versjon har også strukturell makt (trussel om å flytte kapital eller virksomhet), ideologisk innflytelse (rike inviteres som «nøytrale» kommentatorer) og norske eksempler: formuesskatten i valget 2025, olje- og havbrukslobbyen, oljepakken, grunnrenteskatten på havbruk som ga lite inntekt og at Prisrådet for havbruksnæringen legges ned.<\/p><p><b>Felle:<\/b> å tro at studien gjelder Norge.<\/p>",
"kilder": [
"eldre F1 lb 25",
"eldre F1 lb 29",
"eldre F1 lb 30"
],
"eksamen": []
}
]
},
{
"id": "f1-ssb1",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "SSB1: Ulikheten er betydelig større enn statistikken viser (Aaberge, Modalsli og Vestad 2020)",
"eksamensvekt": 1,
"viktigst": [
"Offisiell statistikk bygger på skattemeldingen og fanger bare utbetalt utbytte og realisert gevinst",
"Etter utbytteskatten i 2006 holdes overskuddet tilbake i selskapene",
"Justert Gini 0,26 → 0,35 (+35 %) mot offisiell 0,23 → 0,25 (+9 %), 2001–2018",
"Topp 1 % betaler mindre skatt per tjent krone enn folk flest"
],
"punkter": [
{
"id": "f1-ssb1-01",
"nivaa": "kjerne",
"kan": "Forklare hvorfor offisiell inntektsstatistikk undervurderer ulikheten",
"kort": "Statistikken bygger på skattemeldingen og tar bare med selskapsinntekt som tas ut som utbytte eller realisert gevinst. Etter at utbytteskatten kom i 2006, har eierne holdt overskuddet tilbake i selskapene.",
"mer": "<p>Kapitalinntekt er den viktigste inntekten på toppen av fordelingen, så ufullstendig måling slår hardest ut der. Statistikken følger FNs standarder, som er tilpasset land med svakere data enn Norge. Etter tusenårsskiftet har statistikken gitt bedre informasjon om skattemotiverte tilpasninger enn om fordelingen av inntektene folk rår over.<\/p><p><b>Felle:<\/b> «ulikheten falt i 2006». Det var utbetalt utbytte som falt, ikke den reelle ulikheten.<\/p>",
"kilder": [
"SSB1 s. 1",
"SSB1 s. 2",
"SSB1 s. 3",
"SSB1 s. 7"
],
"eksamen": []
},
{
"id": "f1-ssb1-02",
"nivaa": "kjerne",
"kan": "Beskrive hvordan SSB1 måler eierinntekt",
"kort": "Mottatt utbytte og skattepliktig realisert gevinst erstattes med eierandel × årsresultat (overskudd etter selskapsskatt) for alle direkte og indirekte eide selskaper.",
"mer": "<p>For å unngå dobbelttelling trekkes indirekte eierandel × avsatt utbytte fra forrige regnskapsår fra. Data: aksjonærregisteret og regnskapsregisteret. Målet påvirkes ikke av om utbytte beskattes, så årene før og etter reformene kan sammenlignes.<\/p><p><b>Felle:<\/b> å tro at SSB1 bruker endringer i aksjekursene. Kapitalgevinster er ikke med.<\/p>",
"kilder": [
"SSB1 s. 5",
"SSB1 s. 6"
],
"eksamen": []
},
{
"id": "f1-ssb1-03",
"nivaa": "kjerne",
"kan": "Forklare effekten av skattereformen i 2006 på utbytte og målt ulikhet",
"kort": "Den varslede utbytteskatten (Skaugeutvalget, februar 2003) ga store utbytter 2002–2005 og kraftig fall i 2006. Offisiell ulikhet steg til 2005 og falt tilbake til 2001-nivå i 2006, men det var skattetilpasning, ikke reell endring.",
"mer": "<p>Personlige eiere tok ut mye utbytte mens det var skattefritt og lite etterpå. Tilsvarende svingninger kom rundt endringen i 2016. Figur 2 viser at mesteparten av utbyttet til personlige aksjonærer går til topp 1 %.<\/p><p><b>Felle:<\/b> «Gini falt i 2006 fordi skattereformen omfordelte inntekt».<\/p>",
"kilder": [
"SSB1 s. 3",
"SSB1 s. 4",
"SSB1 s. 11"
],
"eksamen": []
},
{
"id": "f1-ssb1-04",
"nivaa": "kjerne",
"kan": "Kjenne Gini-tallene i SSB1",
"kort": "Offisiell: 0,23 (2001) → 0,25 (2018), +9 %; justert for tilbakeholdt overskudd: 0,26 → 0,35, +35 %. I 2002–2007 steg justert Gini fra 0,26 til 0,39, +50 % på fem år.",
"mer": "<p>I 2006–2018 lå justert Gini mellom 0,30 og 0,39, dvs. 26–65 % høyere enn offisiell. Forskjellen var størst i 2006 (utbytteskatten innført) og minst i 2008 (finanskrisen). En tilsvarende økning som 2002–2007 finner man bare ved å gå tilbake til tiden før første verdenskrig.<\/p><p><b>Felle:<\/b> å blande med SSB2 (0,27 → 0,35 og 36 % høyere enn offisiell i 2018).<\/p>",
"kilder": [
"SSB1 s. 3",
"SSB1 s. 17",
"SSB1 s. 18"
],
"eksamen": []
},
{
"id": "f1-ssb1-05",
"nivaa": "kjerne",
"kan": "Kjenne skatteprosentene langs fordelingen i 2004 (SSB1)",
"kort": "Gjennomsnittsskatt 7 % (10. prosentil), 20 % (40.), 25 % (70.) og 37 % (99. prosentil, 1 351 000 kr), deretter fall til 22 % for topp 1 % og 14 % for topp 0,1 %.",
"mer": "<p>Selskaps- og formuesskatt er med. Skatt etter evne ville krevd minst 38 % for topp 1 %; 16 pp mer ville gitt ca. 30 mrd. kr mer i skatt i 2004. Den regressive strukturen på toppen har vart etter 2004. Nederste 10 % er utelatt fordi gruppen har svært ulike skatteprosenter (negative eierinntekter).<\/p><p><b>Felle:<\/b> å tro at topp 1 % betaler 37 %. Det er 99. prosentil.<\/p>",
"kilder": [
"SSB1 s. 20"
],
"eksamen": []
},
{
"id": "f1-ssb1-06",
"nivaa": "viktig",
"kan": "Forklare hva Gini-koeffisienten måler",
"kort": "G = 0 når alle har lik inntekt og G = 1 når én person har alt. G = gjennomsnittlig forskjell i inntekt delt på 2 × gjennomsnittsinntekten.",
"mer": "<p>Eksempel: er både gjennomsnittsinntekten og gjennomsnittsforskjellen 500 000, blir G = 500 000/(2 · 500 000) = 0,5. Gini er mest følsom for endringer i midten av fordelingen. Den beregnes på ekvivalentinntekt: husholdets inntekt etter skatt delt på forbruksvekter (EU-skala: første voksne 1, andre voksne 0,5, barn under 17 år 0,3; to voksne og to barn trenger 2,1 ganger inntekten til en enslig).<\/p><p><b>Felle:<\/b> «høyere Gini betyr mer likhet».<\/p>",
"kilder": [
"SSB1 s. 15",
"SSB1 s. 16",
"SSB2 s. 16"
],
"eksamen": []
},
{
"id": "f1-ssb1-07",
"nivaa": "viktig",
"kan": "Tolke en økning i Gini-koeffisienten på 50 %",
"kort": "Det tilsvarer en reform der alle betaler 50 % av gjennomsnittsinntekten som fast kronebeløp i skatt og får tilbake 50 % av sin egen inntekt som overføring.",
"mer": "<p>Med snitt 400 000 betaler alle 200 000. Den som tjener 300 000 får tilbake 150 000 og sitter igjen med 250 000. Den som tjener 1 000 000 får 500 000 tilbake og sitter igjen med 1 300 000. SSB2 bruker samme illustrasjon for sin økning på 29 %.<\/p><p><b>Felle:<\/b> å tolke +50 % som 50 prosentpoeng økning i Gini.<\/p>",
"kilder": [
"SSB1 s. 18",
"SSB2 s. 19"
],
"eksamen": []
},
{
"id": "f1-ssb1-08",
"nivaa": "viktig",
"kan": "Kjenne topp 1 % sin andel og forskjellen mot offisiell statistikk",
"kort": "Justert andel av markedsinntekten for topp 1 % steg til 22 % i 2006 og 2007. Forskjellen mot offisiell var størst i 2006: 14 pp, dvs. 176 % høyere; senere 71–154 %.",
"mer": "<p>Offisiell statistikk: topp 1 % fikk 11–17 % av markedsinntekten i 2002–2005, på nivå med mellomkrigstiden. Andelen falt fra 1870-årene til slutten av 1980-tallet og steg i 1990-årene. Finanskrisen 2008 ga store fall i toppandelene i det justerte målet, men nesten ingen endring i det offisielle.<\/p><p><b>Felle:<\/b> «finanskrisen hadde ingen fordelingseffekt». Den var bare usynlig i offisiell statistikk.<\/p>",
"kilder": [
"SSB1 s. 3",
"SSB1 s. 4",
"SSB1 s. 11",
"SSB1 s. 13"
],
"eksamen": []
},
{
"id": "f1-ssb1-09",
"nivaa": "viktig",
"kan": "Forklare hvorfor topp 1 % har lav gjennomsnittsskatt i det justerte målet",
"kort": "Det justerte målet tar med eierinntekt som ikke utbetales: den øker bruttoinntekten, men utløser ikke utbytteskatt. Uten selskapsskatt var skatteprosenten for topp 1 % lavere enn for de tre midterste kvintilene i 16 av 18 år (2001–2018).",
"mer": "<p>Offisielt svinger topp 1 % sin gjennomsnittsskatt fra 17 % (2005) til 38 % (2012): lav når utbytte var skattefritt og høy når det ble skattlagt, fordi nevneren mangler tilbakeholdt overskudd. Selskapsskatten betyr lite for 90.–99. prosentil, men mye for topp 1 %.<\/p><p><b>Felle:<\/b> å bruke offisielle skatteprosenter for topp 1 % som bevis på at systemet er progressivt.<\/p>",
"kilder": [
"SSB1 s. 25"
],
"eksamen": []
},
{
"id": "f1-ssb1-10",
"nivaa": "detalj",
"kan": "Kjenne arbeids- og kapitalinntektens andel på toppen (SSB1 figur 1)",
"kort": "Arbeidsinntekt utgjør 95–97 % av markedsinntekten for 90.–95. prosentil, men faller fra 90 % ved 98. prosentil til 32 % helt på toppen, der eierinntekt dominerer.",
"mer": "<p>Kapitalinntekt er derfor den viktigste inntektskilden på toppen og endringer i utbytteskatten slår sterkest ut i målt ulikhet for de rikeste. For de resterende 99 % gir korreksjonen for tilbakeholdt overskudd bare små utslag.<\/p><p><b>Felle:<\/b> å tro at topp 1 % i hovedsak har lønnsinntekt.<\/p>",
"kilder": [
"SSB1 s. 3",
"SSB1 s. 8"
],
"eksamen": []
},
{
"id": "f1-ssb1-11",
"nivaa": "detalj",
"kan": "Vite hva SSB1 ikke tar med og hvilke antakelser den gjør",
"kort": "Kapitalgevinster og verdien av å bo i egen bolig er ikke med; de ville gitt enda høyere ulikhet. Selskapsskatten antas båret av eierne.",
"mer": "<p>Forfatterne påpeker at en betydelig del av selskapsskatten kan bæres av lønnstakere (Gruber 2010; Fuest mfl. 2018). Offentlige tjenester er ikke med og ville redusert ulikheten, men neppe nok til å nulle ut kapitalgevinster og boligtjenester. Populasjon: personer 25 år og eldre utenom studenthushold (3 668 035 i 2018). Hypotetisk full utbytteskatt på all eierinntekt gir lavere Gini, men fortsatt klart over offisiell etter 2005.<\/p><p><b>Felle:<\/b> å tro at SSB1 inkluderer boligtjenester. Det gjør SSB2.<\/p>",
"kilder": [
"SSB1 s. 7",
"SSB1 s. 19",
"SSB1 s. 28"
],
"eksamen": []
}
],
"kildenotat": "F1 Innledning (pensum SSB1)"
},
{
"id": "f1-ssb2",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "SSB2: Økonomisk ulikhet i Norge i det 21. århundre (Aaberge, Mogstad, Vestad og Vestre 2021)",
"eksamensvekt": 1,
"viktigst": [
"Tre tillegg: tilbakeholdt overskudd, boligtjenester og kapitalgevinster (unntatt aksjer)",
"Gini etter skatt 0,27 → 0,35; 36 % høyere enn offisiell i 2018",
"Progressivt til 99. prosentil, sterkt regressivt på toppen (8 % for topp 0,01 %)",
"USA er progressivt på toppen, Norge regressivt",
"Lønnsmottakere beskattes høyere enn kapitaleiere med samme inntekt"
],
"punkter": [
{
"id": "f1-ssb2-01",
"nivaa": "kjerne",
"kan": "Nevne de tre inntektskomponentene SSB2 legger til offisiell statistikk",
"kort": "(i) Personlige eieres andel av tilbakeholdt overskudd i private selskaper, (ii) verdien av boligtjenester for boligeiere (leieverdi minus renteutgifter), (iii) kapitalgevinster på bolig, annen fast eiendom og verdipapirer (unntatt aksjer).",
"mer": "<p>Boligformue måles med faktiske markedsverdier fra transaksjonsdata i stedet for skatteverdier. Komponent (i) er den samme som i SSB1. Kapitalgevinster på unoterte aksjer er ikke med, så selskapsinntekten er et nedre anslag. 75 % av selskapsskatten henføres til eierne og 25 % til lønnstakerne (CBO-antakelse).<\/p><p><b>Felle:<\/b> «SSB2 inkluderer kursgevinster på aksjer».<\/p>",
"kilder": [
"SSB2 s. 4",
"SSB2 s. 13",
"SSB2 s. 14",
"SSB2 s. 89"
],
"eksamen": []
},
{
"id": "f1-ssb2-02",
"nivaa": "kjerne",
"kan": "Kjenne Gini-tallene i SSB2",
"kort": "Gini for inntekt etter skatt økte fra 0,27 (2001) til 0,35 (2018). Offisiell: 0,23 til 0,26. I 2018 er det fullstendige målet 36 % høyere enn offisiell statistikk.",
"mer": "<p>Økningen er 8 pp, dvs. 29 %. Ulikheten var høyest i 2006 og 2016 (44 og 46 % over 2001-nivå), falt rundt finanskrisen og var i 2018 tilbake på omtrent 2005-nivå. Fallet i 2017 skyldes lavere boligprisvekst.<\/p><p><b>Felle:<\/b> å blande med SSB1 (0,26 → 0,35, +35 %).<\/p>",
"kilder": [
"SSB2 s. 19",
"SSB2 s. 89"
],
"eksamen": []
},
{
"id": "f1-ssb2-03",
"nivaa": "kjerne",
"kan": "Beskrive skatteprofilen langs inntektsfordelingen i SSB2 (2018)",
"kort": "Skatte- og avgiftsprosenten stiger fra 41 % for nederste halvdel til 53 % for 95.–99. prosentil og faller deretter til 8 % for topp 0,01 %.",
"mer": "<p>Mva, arbeidsgiveravgift, selskapsskatt og eiendomsskatt er med. For topp 1 % falt skatteprosenten fra 53 % i 2001 til 29 % i 2018, mest fordi bidraget fra selskapsskatt falt. Med hypotetisk full utbytteskatt ville den vært 55 % for 95.–99,9. prosentil og 43 % for 99,9.–99,99.<\/p><p><b>Felle:<\/b> «skattesystemet er progressivt over hele fordelingen».<\/p>",
"kilder": [
"SSB2 s. 63",
"SSB2 s. 89"
],
"eksamen": []
},
{
"id": "f1-ssb2-04",
"nivaa": "kjerne",
"kan": "Sammenligne skatteprogressiviteten i Norge og USA",
"kort": "Norge: 50 % (95.–99.), 40 % (99.–99,9.), 17 % (99,9.–99,99.) og 8 % (topp 0,01 %); USA: ca. 30 % flatt innen topp 1 %. USA er progressivt på toppen, Norge regressivt.",
"mer": "<p>Midterste femtedel betaler 44 % i Norge (30 % uten mva) mot 13 % i USA. Topp 1 % mottar 13 % av inntekten og betaler 8 % av skattene i Norge, mot 17 % og 26 % i USA. Nederste 20 % i USA betaler ikke skatt (jobbskattefradraget EITC). Konklusjonen holder også når kommunale tjenester tas med.<\/p><p><b>Felle:<\/b> «Norge har mer progressiv skatt enn USA også på toppen».<\/p>",
"kilder": [
"SSB2 s. 82",
"SSB2 s. 83",
"SSB2 s. 90"
],
"eksamen": []
},
{
"id": "f1-ssb2-05",
"nivaa": "viktig",
"kan": "Forklare forskjellen mellom arbeidere og kapitaleiere i skattebyrden",
"kort": "Innenfor samme inntektsgruppe beskattes lønnsmottakere høyere enn kapitaleiere. Skatteprosenten øker med inntekten for arbeidere, men faller med inntekten for kapitaleiere.",
"mer": "<p>«Arbeidere» har mer enn halvparten av bruttoinntekten fra yrkesinntekt og overføringer, «kapitaleiere» mer enn halvparten fra eierinntekter. Kapitaleiere sparer i selskapene og utsetter eller unngår personskatt.<\/p><p><b>Felle:<\/b> å tro at kapitalinntekt i praksis beskattes hardere enn lønn fordi eierskatten er 37,84 %.<\/p>",
"kilder": [
"SSB2 s. 8",
"SSB2 s. 64"
],
"eksamen": []
},
{
"id": "f1-ssb2-06",
"nivaa": "viktig",
"kan": "Kjenne fordelingen av inntekt og skatt mellom grupper i 2018",
"kort": "Andel av inntekten og av skattene: nederste 50 % 22 og 21 %; 50.–90. prosentil 43 og 46 %; topp 10 % 35 og 33 %; topp 1 % 15 og 10 %.",
"mer": "<p>De rikeste mottar en betydelig større andel av inntekten enn den andelen de betaler av skatter og avgifter. Uansett er progressivitet et spørsmål om andel av egen inntekt, ikke andel av skatteinngangen (F1 lb 19).<\/p><p><b>Felle:<\/b> å bytte om inntekts- og skatteandelen for topp 1 %.<\/p>",
"kilder": [
"SSB2 s. 64"
],
"eksamen": []
},
{
"id": "f1-ssb2-07",
"nivaa": "viktig",
"kan": "Kjenne inntektsveksten etter skatt 2001–2018 i SSB2",
"kort": "Inntektsvekst: alle hushold +34 %, nederste 99 % 15–35 % og topp 1 % +171 %. Topp 1 % sin andel av inntekt etter skatt økte fra 7 % til 15 %.",
"mer": "<p>Andelene for de nederste 90 % gikk ned, mens 90.–99. prosentil var omtrent uendret. Ulikheten er drevet av inntekten til de rikeste, ikke av lønnsfordelingen. 187 % (F1 lb 29) er fra Norge–USA-kapitlet, der boligtjenester og kapitalgevinster er tatt ut for å kunne sammenligne med USA.<\/p><p><b>Felle:<\/b> å tro at 171 % og 187 % motsier hverandre. De bygger på ulike inntektsmål.<\/p>",
"kilder": [
"SSB2 s. 7",
"SSB2 s. 22",
"SSB2 s. 81"
],
"eksamen": []
},
{
"id": "f1-ssb2-08",
"nivaa": "viktig",
"kan": "Kjenne sparingen langs fordelingen i SSB2",
"kort": "De fleste hushold sparer lite eller negativt. Topp 0,1 % sparer over 70 % av bruttoinntekten og topp 0,01 % nær 90 %, mest som tilbakeholdt overskudd i selskaper.",
"mer": "<p>Sparing i selskaper er den delen av selskapsinntekten som ikke realiseres som utbytte eller aksjesalg i året. Høy sparing på toppen henger sammen med at eierinntekt overtar for yrkesinntekt som største inntektskomponent for de rikeste.<\/p><p><b>Felle:<\/b> å tolke lavt utbytte som lav inntekt.<\/p>",
"kilder": [
"SSB2 s. 8",
"SSB2 s. 64",
"SSB2 s. 65"
],
"eksamen": []
},
{
"id": "f1-ssb2-09",
"nivaa": "viktig",
"kan": "Kjenne utviklingen i formuesulikhet i SSB2",
"kort": "Gini for nettoformue: 0,65 (2001) → 0,69 (2018), mest etter 2012. Topp 1 % eier 20 → 22 % av nettoformuen; nederste halvdel 7 → 5 %.",
"mer": "<p>Formuesvekst 2001–2018: alle 97 %, nederste 50 % 20 %, 50.–90. 85 %, 90.–99. 106 % og topp 1 % 117 % (dobling fra 60 til 120 % vekst siden 2014). Unoterte aksjer er satt til bokført verdi, som kan ligge langt under markedsverdi; alternative anslag gir betydelig større ulikhet. Nederste halvdel har gjeldsgrad over 90 %.<\/p><p><b>Felle:<\/b> å tro at formuesveksten var størst i nederste halvdel.<\/p>",
"kilder": [
"SSB2 s. 8",
"SSB2 s. 39",
"SSB2 s. 40",
"SSB2 s. 89"
],
"eksamen": []
},
{
"id": "f1-ssb2-10",
"nivaa": "detalj",
"kan": "Forklare Haig–Simons-inntekt",
"kort": "Inntekt er det en person kan konsumere uten å tære på formuen, dvs. konsum + skatt + endring i nettoformue.",
"mer": "<p>Haig (1921) og Simons (1938). Et slikt mål må ta med realiserte og urealiserte gevinster og avkastningen på alle formueskomponenter. Inntekt som bare måles når den realiseres på personlig hånd, påvirkes av fordelingen mellom sparing og konsum og egner seg ikke til å måle reell progressivitet.<\/p><p><b>Felle:<\/b> å tro at offisiell statistikk bruker Haig–Simons-inntekt.<\/p>",
"kilder": [
"SSB2 s. 10",
"SSB2 s. 14"
],
"eksamen": []
},
{
"id": "f1-ssb2-11",
"nivaa": "detalj",
"kan": "Kjenne SSB2-resultatet om kontrafaktisk flat skatt",
"kort": "En provenynøytral proporsjonal skatt ville krevd 24 % (2006) til 42 % (2008). Ulikheten ville blitt høyere, men aldri mer enn 3 pp over faktisk Gini (2006–2018), fordi systemet allerede er regressivt på toppen.",
"mer": "<p>Atferdsendringer er ikke tatt med. Poenget er at dagens system omfordeler lite mer enn en flat skatt ville gjort, fordi de rikeste allerede har lav gjennomsnittsskatt. En eldre studie (Aaberge mfl. 2000) fant at ulikheten ble mindre enn under det faktiske systemet når endringer i arbeidstilbudet ble tatt med.<\/p><p><b>Felle:<\/b> «flat skatt ville gitt dramatisk høyere ulikhet».<\/p>",
"kilder": [
"SSB2 s. 22"
],
"eksamen": []
},
{
"id": "f1-ssb2-12",
"nivaa": "detalj",
"kan": "Kjenne SSB2-funnene om kommunale tjenester og om by og land",
"kort": "Kommunale tjenester reduserer ulikheten, men ikke nok til å motvirke effekten av selskapsinntekt, kapitalgevinster og boligtjenester. Inntektsforskjellene mellom by og land har ikke økt vesentlig, men formuesforskjellene har økt noe.",
"mer": "<p>Data for kommunale tjenester finnes bare til 2013. For topp 1 % er forskjellen i skatteprosent med og uten kommunale tjenester ubetydelig. Offentlige tjenester er mer omfattende i Norge enn i USA, men USA er likevel mer progressivt på toppen.<\/p><p><b>Felle:<\/b> «når offentlige tjenester tas med, forsvinner den økte ulikheten».<\/p>",
"kilder": [
"SSB2 s. 8",
"SSB2 s. 83",
"SSB2 s. 90"
],
"eksamen": []
}
],
"kildenotat": "F1 Innledning (pensum SSB2)"
},
{
"id": "f1-utbytteteorier",
"forelesning": "F1 Innledning: skattesystemet og ulikhet",
"tittel": "Utbytteskatt: old view, new view, new new view og lock-in",
"eksamensvekt": 1,
"viktigst": [
"Står bare i eldre versjon av F1, ikke i 2026-lysbildene",
"Old view: utbytteskatt øker kapitalkostnaden og skader aksjonæren",
"New view: utbytteskatten kapitaliseres i aksjekursen ved intern finansiering",
"New new view: prinsipal–agent; Chetty og Saez (2005)"
],
"punkter": [
{
"id": "f1-utbytteteorier-01",
"nivaa": "detalj",
"kan": "Forklare old view om utbytteskatt",
"kort": "Selskapsinntekt beskattes både i selskapet og som utbytte. Dobbeltskatten øker kostnaden ved ny egenkapital, gir lavere utbytte og lavere investeringer og utbytteskatt skader aksjonæren (Harberger 1962, Poterba og Summers 1985).",
"mer": "<p>Etter old view er det bedre å finansiere investeringer med tilbakeholdt overskudd enn med emisjon. Utbytteskatten straffer egenkapitalfinansiering. Bolken er fjernet fra 2026-versjonen, men temaet berører BS1 om utbyttebeslutningen. Spørsmålet i eldre F1 var om det er best for aksjonæren at selskapet holder tilbake overskuddet eller deler det ut.<\/p><p><b>Felle:<\/b> å blande old view og new view.<\/p>",
"kilder": [
"eldre F1 lb 52",
"eldre F1 lb 53"
],
"eksamen": []
},
{
"id": "f1-utbytteteorier-02",
"nivaa": "detalj",
"kan": "Forklare new view om utbytteskatt",
"kort": "Når investeringer finansieres med tilbakeholdt overskudd, kapitaliseres utbytteskatten i aksjeverdien. For aksjonæren spiller det ingen rolle om hun får utbytte, fordi hun kan selge aksjer (King 1977, Auerbach 1979, Bradford 1981).",
"mer": "<p>Kapitalmarkedet øker aksjeprisen tilsvarende det tilbakeholdte overskuddet. Det er samme logikk som F1 lb 22 bruker mot påstanden om at aksjonærer ikke eier overskuddet før det er utbetalt. Under new view er det altså likegyldig for aksjonæren om selskapet deler ut eller holder tilbake.<\/p><p><b>Felle:<\/b> «new view sier at utbytteskatt reduserer investeringene».<\/p>",
"kilder": [
"eldre F1 lb 54"
],
"eksamen": []
},
{
"id": "f1-utbytteteorier-03",
"nivaa": "detalj",
"kan": "Forklare new new view og Chetty og Saez (2005)",
"kort": "Utbytteskattekuttet i USA (38,6 % → 15 %) ga store, umiddelbare økninger i utbytte, drevet av selskaper der toppledere eller styremedlemmer eide mye. Teorien bygger på et prinsipal–agent-perspektiv.",
"mer": "<p>Ledere foretrekker å holde overskudd i selskapet (kontroll, frynsegoder, «empire building»), mens aksjonærene vil ha det utbetalt. Høy utbytteskatt gjør det lettere for ledelsen å rasjonalisere å holde tilbake kapital; lav utbytteskatt presser mot utdeling.<\/p><p><b>Felle:<\/b> å huske kuttet som 28 % → 15 % eller å knytte det til Norge.<\/p>",
"kilder": [
"eldre F1 lb 55"
],
"eksamen": []
},
{
"id": "f1-utbytteteorier-04",
"nivaa": "detalj",
"kan": "Forklare lock-in-synet på utbytteskatt",
"kort": "Tilbakeholdelse utsetter utbytteskatten (skattekreditt), så bedrifter kan foretrekke intern finansiering fremfor å betale ut og hente inn ny egenkapital.",
"mer": "<p>Hva det betyr for aksjonæren, avhenger av om aksjekursen øker tilsvarende det tilbakeholdte overskuddet, eller mer fordi markedet tror selskapet blir enda mer lønnsomt. Knyttes til SSB1 og SSB2: etter 2006 holdes overskuddet tilbake i selskapene.<\/p><p><b>Felle:<\/b> å tro at lock-in betyr at aksjonæren ikke kan selge aksjene.<\/p>",
"kilder": [
"eldre F1 lb 56"
],
"eksamen": []
}
],
"kildenotat": "F1 Innledning (bare eldre versjon)"
},
{
"id": "f2-avkastningsmaal",
"forelesning": "F2 Avkastning over tid på ulike aktiva",
"tittel": "Avkastning: nominell, real, etter skatt og superprofitt",
"eksamensvekt": 3,
"viktigst": [
"R = (P₁ − P₀)/P₀ + Y₁/P₀: kapitalgevinst + direkteavkastning",
"Real: r = (1 + R)/(1 + π) − 1 ≈ R − π",
"Skatt trekkes av nominell avkastning: r ≈ R(1 − t) − π",
"Superprofitt = realavkastning − risikofri rente (3 mnd statskasseveksel)"
],
"punkter": [
{
"id": "f2-avkastningsmaal-01",
"nivaa": "kjerne",
"kan": "Regne ut nominell totalavkastning på en investering",
"kort": "R = (P₁ − P₀ + Y₁)/P₀ = kapitalgevinst + direkteavkastning. Kjøpt for 100, solgt for 105, utbytte 10: R = 15 %.",
"mer": "<p>Y er kontantstrømmen i perioden: utbytte (aksje), kupongrente (obligasjon) eller husleie minus vedlikehold og utgifter (eiendom). Begge ledd måles mot inngangsverdien P<sub>0<\/sub>.<\/p><p><b>H2023 o6:<\/b> eiendom kjøpt for 5 mill., solgt for 6 mill., netto leie etter skatt 150 000, dokumentavgift 125 000: (6 − 5)/5 + (150 000 − 125 000)/5 000 000 = 20 % + 0,5 % = 20,5 %.<\/p><p><b>Felle:<\/b> å dele på salgsprisen eller å glemme kostnader som dokumentavgift.<\/p>",
"kilder": [
"F2 lb 12",
"F2 lb 13",
"F2 lb 40"
],
"eksamen": [
"H2023 o6"
]
},
{
"id": "f2-avkastningsmaal-02",
"nivaa": "kjerne",
"kan": "Regne ut realavkastning eksakt og tilnærmet",
"kort": "r = (1 + R)/(1 + π) − 1 ≈ R − π. Tilnærmingen er god så lenge inflasjonen ikke er veldig høy.",
"mer": "<p><b>Lysbildet:<\/b> kjøpt for 100, solgt for 98, utbytte 5, π = 3 %: R = 3 % og r ≈ 0.<\/p><p><b>H2023 o6:<\/b> R = 20,5 %, π = 10 %, forenklet r = 10,5 % (eksakt 1,205/1,10 − 1 = 9,5 %). Står det «bruk forenklet formel», bruk R − π.<\/p><p><b>Felle:<\/b> alternativene kan ligge både på eksakt og tilnærmet verdi; les hva oppgaven ber om.<\/p>",
"kilder": [
"F2 lb 41",
"F2 lb 42"
],
"eksamen": [
"H2023 o6"
]
},
{
"id": "f2-avkastningsmaal-03",
"nivaa": "kjerne",
"kan": "Regne ut realavkastning etter skatt",
"kort": "Skatten trekkes av den nominelle avkastningen, deretter inflasjonen: r ≈ R(1 − t) − π. Lysbildet: (98 − 100 + 5)(1 − 30 %)/100 = 2,1 % og 2,1 % − 3 % = −0,9 %.",
"mer": "<p>Skatt på nominell avkastning gir negativ realavkastning selv om realavkastningen før skatt er null. Avkastning har fire komponenter: (+) yield, (±) kapitalgevinst, (−) skatt og (−) inflasjon. 30 % er et eksempeltall; med 22 % blir nominell etter skatt 2,34 % og real ca. −0,66 %.<\/p><p><b>Felle:<\/b> å trekke skatt av realavkastningen i stedet for den nominelle, eller å glemme inflasjonen.<\/p>",
"kilder": [
"F2 lb 39",
"F2 lb 43"
],
"eksamen": []
},
{
"id": "f2-avkastningsmaal-04",
"nivaa": "kjerne",
"kan": "Regne ut superprofitt (meravkastning)",
"kort": "Superprofitt = realavkastningen på aktivumet − risikofri rente, som vanligvis er renten på 3 måneders statskasseveksler. Den kalles ofte risikopremien.",
"mer": "<p><b>Norske Furutrær:<\/b> kjøpt for 100, solgt for 110, utbytte 5, π = 9 %, statskasseveksel 2 %. Nominell 15 %, real ≈ 6 % (eksakt 5,5 %), superprofitt 6 % − 2 % = 4 %.<\/p><p>Lysbildet merker r<sub>aktivum<\/sub> som realavkastning og r<sub>f<\/sub> som «sikker avkastning (nominell!)». Fasiten trekker en nominell rente fra en realavkastning; følg fasiten.<\/p><p><b>Felle:<\/b> å trekke 2 % fra nominell 15 % (gir 13 %).<\/p>",
"kilder": [
"F2 lb 44",
"Oppgaver F2 lb 2",
"Oppgaver F2 lb 6"
],
"eksamen": []
},
{
"id": "f2-avkastningsmaal-05",
"nivaa": "viktig",
"kan": "Regne nominell avkastning og realavkastning på en utleiebolig (Milla)",
"kort": "Kjøpt for 4 mill., solgt for 3,9 mill., leie etter skatt 200 000, π = 6 %: R = (3,9 − 4 + 0,2)/4 = 2,5 % og r ≈ 2,5 % − 6 % = −3,5 %.",
"mer": "<p>Eksakt realavkastning: 1,025/1,06 − 1 = −3,3 %. Fasiten bruker tilnærmingen −3,5 %. Kapitaltapet (−2,5 %) spiser halvparten av leieavkastningen (5 %).<\/p><p><b>Felle:<\/b> å glemme kapitaltapet og bare bruke leien (5 %), eller å trekke skatt av leien en gang til; den er allerede etter skatt.<\/p>",
"kilder": [
"Oppgaver F2 lb 4",
"Oppgaver F2 lb 7"
],
"eksamen": []
}
]
},
{
"id": "f2-evig-kontantstrom",
"forelesning": "F2 Avkastning over tid på ulike aktiva",
"tittel": "Verdsetting av evig kontantstrøm: ekspropriasjon og Anita-oppgaven",
"eksamensvekt": 3,
"viktigst": [
"V = CF/r for en evig kontantstrøm",
"Ekspropriasjon: realrente på minst 4 % (Høyesterett): 1 mill./0,04 = 25 mill.",
"Nominell kontantstrøm skal diskonteres med nominell rente, real med realrente",
"Skattlegges strøm og avkastningskrav med samme sats, faller skatten ut"
],
"punkter": [
{
"id": "f2-evig-kontantstrom-01",
"nivaa": "kjerne",
"kan": "Verdsette en evig kontantstrøm",
"kort": "V = CF/r: 1 mill. i årlig leie gir 25 mill. med 4 % og 14,3 mill. med 7 %. Lavere rente gir høyere verdi.",
"mer": "<p>Brukes når eiendommen bare har en inngangsverdi og ingen utgangsverdi, f.eks. ved ekspropriasjon. I norsk rett betraktes en husleie på 1 mill. i året som evigvarende, selv om leietakere kan forsvinne.<\/p><p><b>H2025 o3c:<\/b> evig kontantstrøm 5 mill. med 5 % avkastningskrav gir 5/0,05 = 100 mill.<\/p><p><b>Felle:<\/b> å trekke fra formuesskatt når oppgaven sier uten formuesskatt (gir 80 mill. i H2025 o3c).<\/p>",
"kilder": [
"F2 lb 45",
"F2 lb 46",
"F2 lb 47"
],
"eksamen": [
"H2025 o3c"
]
},
{
"id": "f2-evig-kontantstrom-02",
"nivaa": "kjerne",
"kan": "Forklare problemet med Høyesteretts kapitaliseringsrente",
"kort": "Høyesterett krever en realrente (ikke lavere enn 4 %), mens leieinntekten er nominell. Konsistent: nominelle strømmer diskonteres med nominell rente, reelle med realrente.",
"mer": "<p>Erstatningen skal sette den eksproprierte i stand til å gjenskape den tapte kontantstrømmen (Grunnloven og Høyesterett). Kan hun oppnå 4 % realrente? Oljefondet har bare oppnådd i underkant av 4 % reelt, så hun må «minst slå oljefondet». Ofte settes renten godt over 4 %, f.eks. 7 %, som gir enda lavere erstatning. «Juristene kan ikke økonomi og kan ikke regne.» Eldre versjon: renten «skal være 4 %».<\/p><p><b>Felle:<\/b> «høyere kapitaliseringsrente gir høyere erstatning».<\/p>",
"kilder": [
"F2 lb 45",
"F2 lb 46",
"F2 lb 47",
"F2 lb 48",
"eldre F2"
],
"eksamen": []
},
{
"id": "f2-evig-kontantstrom-03",
"nivaa": "kjerne",
"kan": "Verdsette en evig leieinntekt etter skatt (Anita-oppgaven)",
"kort": "Juster både kontantstrøm og avkastningskrav for skatt: V = 240 000 × 0,78/(0,08 × 0,78) = 240 000/0,08 = 3 000 000. Skatten faller ut når begge skattlegges med samme sats.",
"mer": "<p><b>Avvik i fasiten:<\/b> fasiten skriver 187 200/6,4 % = 2 925 000, men 8 % × 0,78 = 6,24 %, som gir 3 000 000. Konklusjonen er den samme: Anita betalte 5 mill. for noe som er verdt ca. 3 mill. Spørsmål 3: krav 4 % før skatt gir 3,12 % etter skatt og V = 187 200/0,0312 = 6 000 000, et godt kjøp. Kriteriet er nåverdi mot pris.<\/p><p><b>Felle:<\/b> å justere bare telleren (187 200/0,08 = 2 340 000) eller bare nevneren.<\/p>",
"kilder": [
"Oppgaver F3 lb 2",
"Oppgaver F3 lb 3"
],
"eksamen": []
},
{
"id": "f2-evig-kontantstrom-04",
"nivaa": "viktig",
"kan": "Kjenne skattereglene ved ekspropriasjon",
"kort": "Primærbolig: erstatningen er skattefri hvis en gevinst ved salg ville vært skattefri (eid mer enn ett år, brukt som egen bolig minst ett av de to siste årene). Næringseiendom: skattepliktig, men skatten kan utsettes (ikke fritas) ved reinvestering innen tre år.",
"mer": "<p>Vilkårene ligner kravene til skattefritt salg av egen bolig i F3 (eiertid og botid). For næringseiendom gir reinvestering bare utsatt skatt, altså en skattekreditt. Eksempel: en primærbolig eid i to år og brukt som egen bolig det siste året gir skattefri erstatning.<\/p><p><b>Felle:<\/b> «erstatning ved ekspropriasjon er alltid skattefri».<\/p>",
"kilder": [
"F2 lb 49",
"F3 lb 19"
],
"eksamen": []
},
{
"id": "f2-evig-kontantstrom-05",
"nivaa": "viktig",
"kan": "Kjenne Oljefondets avkastning i 2024",
"kort": "13,1 % i fondets valutakurv før kostnader: aksjer 18,2 %, renter 1,3 %, unotert eiendom −0,6 % og unotert fornybar infrastruktur −9,8 %. Realavkastningen har årlig ligget rett under 4 %.",
"mer": "<p>Aksjer utgjorde 72,1 % og rentepapirer 25,8 % av porteføljen. Løpende inntekter (utbytte og renter, uten kursgevinster) har de siste årene vært lavere enn bruken av oljepenger. Forelesningen bruker realavkastningen til å vurdere om 4 % realrente er et rimelig krav ved ekspropriasjon.<\/p><p><b>Felle:<\/b> å bruke 13,1 % som langsiktig realavkastning.<\/p>",
"kilder": [
"F2 lb 28",
"F2 lb 48"
],
"eksamen": []
}
]
},
{
"id": "f2-formuesfordeling",
"forelesning": "F2 Avkastning over tid på ulike aktiva",
"tittel": "Formuesfordeling og unoterte aksjer",
"eksamensvekt": 1,
"viktigst": [
"Folk flest har formuen i bolig; de rikeste i aksjer, 2/3 unoterte",
"De 10 % rikeste er i snitt i formuesskatteposisjon",
"Hardere eiendomsskatt øker ulikheten fordi de rikeste eier relativt lite eiendom",
"Unoterte aksjer: mindre likvide, mer informasjonsasymmetri, lavt formuesgrunnlag"
],
"punkter": [
{
"id": "f2-formuesfordeling-01",
"nivaa": "viktig",
"kan": "Beskrive formuessammensetningen langs formuesfordelingen",
"kort": "Folk flest eier i hovedsak bolig (egen bolig er den største investeringen). Topp 1 % eier mest aksjer, hvorav 2/3 er unoterte og relativt lite eiendom.",
"mer": "<p>SSB2-figuren over sammensetningen av nettoformuen (2018): for de nederste 50 % er gjelden ca. 90 % av bruttoformuen og bolig nesten alt; for topp 0,01 % er finansformue ca. 85 %. Konsekvens: hardere beskatning av eiendom øker ulikheten, fordi de rikeste eier relativt lite eiendom.<\/p><p><b>Felle:<\/b> «skatt på bolig er først og fremst en skatt på de rikeste».<\/p>",
"kilder": [
"F2 lb 4",
"F2 lb 5",
"SSB2 s. 39"
],
"eksamen": []
},
{
"id": "f2-formuesfordeling-02",
"nivaa": "viktig",
"kan": "Sammenligne børsnoterte og unoterte aksjer",
"kort": "Unoterte aksjer er mindre likvide, har mindre krav til rapportering og større informasjonsasymmetri, har ofte en dominerende eier med innsideinformasjon og formuesgrunnlaget er bokført verdi (lavt).",
"mer": "<p>Konklusjonen på lysbildet: unoterte aksjer er mer risikable og mindre likvide, men har betydelig lavere formuesgrunnlag enn børsnoterte. Skal vi kopiere de rikeste? Ja, hvis vi vil spare formuesskatt, men for småsparere er unoterte aksjer vanskelige.<\/p><p><b>Felle:<\/b> «unoterte aksjer er tryggere fordi kursen ikke svinger».<\/p>",
"kilder": [
"F2 lb 5",
"F2 lb 6"
],
"eksamen": []
},
{
"id": "f2-formuesfordeling-03",
"nivaa": "viktig",
"kan": "Kjenne formuesgrunnlaget for unoterte aksjer som andel av markedsverdien",
"kort": "SSB-studier av NOTC-aksjer: formuesverdien ligger ca. 40–50 % under markedsverdien; med 20 % aksjerabatt blir grunnlaget 32–40 % av markedsverdien. Hos de aller rikeste kan det være ned mot 10 % (Ring mfl. 2026).",
"mer": "<p><b>Avvik i lysbildet:<\/b> 32–40 % får man hvis formuesverdien er 40–50 % <i>av<\/i> markedsverdien (0,4 · 0,8 = 32 %, 0,5 · 0,8 = 40 %). Er den 40–50 % <i>lavere<\/i>, blir grunnlaget 40–48 %. Eldre versjon: ca. 50 % lavere. Husk 32–40 % og 10 % som forelesningens tall. Børsnoterte aksjer verdsettes til kursen 1. januar i skattefastsettingsåret.<\/p><p><b>Felle:<\/b> å glemme aksjerabatten.<\/p>",
"kilder": [
"F2 lb 7",
"eldre F2"
],
"eksamen": []
},
{
"id": "f2-formuesfordeling-04",
"nivaa": "viktig",
"kan": "Kjenne SSBs tall for husholdningenes bruttoformue 2025",
"kort": "Primærbolig 52 %, sekundærbolig og annen eiendom 14 %, bankinnskudd 13 %, aksjer og verdipapirer 11 %, annen finanskapital 5 % og næringseiendeler 5 %.",
"mer": "<p>Bolig utgjør til sammen ca. 2/3 av bruttoformuen. Tallene gjelder gjennomsnittlig bruttoformue, altså før gjeld er trukket fra. Eldre versjon brukte 2024-tall. Forelesningen bruker formuesfordelingen til å si at flertallet av norske husholdninger er låntakere (makrodelen).<\/p><p><b>Felle:<\/b> å bytte om aksjer (11 %) og bankinnskudd (13 %).<\/p>",
"kilder": [
"F2 lb 8",
"F2 lb 56"
],
"eksamen": []
},
{
"id": "f2-formuesfordeling-05",
"nivaa": "detalj",
"kan": "Vite hvem som er i formuesskatteposisjon",
"kort": "Ifølge 2026-versjonen er de 10 % rikeste i snitt i formuesskatteposisjon (eldre versjon: de 5 % rikeste).",
"mer": "<p>Bunnfradraget (1,7 mill. i 2025) og 75 % rabatt på primærbolig under 10 mill. gjør at vanlige boligeiere sjelden betaler formuesskatt. Skatten treffer derfor i hovedsak de rikeste, som har mye av formuen i aksjer med lavt formuesgrunnlag.<\/p><p><b>Avvik:<\/b> 10 % (2026) mot 5 % (eldre). Bruk 10 %.<\/p><p><b>Felle:<\/b> «halvparten av befolkningen betaler formuesskatt».<\/p>",
"kilder": [
"F2 lb 5",
"eldre F2",
"F1 lb 14",
"F3 lb 18"
],
"eksamen": []
},
{
"id": "f2-formuesfordeling-06",
"nivaa": "detalj",
"kan": "Vite hva Oljefondets eiendomsinvesteringer har gitt",
"kort": "Oljefondets noterte og unoterte eiendomsinvesteringer har trukket meravkastningen ned med ca. 120 mrd. kr (2017–2024). Fra 2021 har fondet hatt mye mer eiendomsaksjer enn referanseindeksen.",
"mer": "<p>Kritikere kaller det «et spekulativt veddemål som har gått fryktelig galt». Figuren viser relativ avkastning (utover referanseindeksen) for aksjer, obligasjoner, eiendom og totalt. Figurtittelen sier «120 millioner», men undertittelen «120 milliarder».<\/p><p><b>Felle:<\/b> å tolke tallet som et absolutt tap; det er tapt <i>meravkastning<\/i> mot indeksen.<\/p>",
"kilder": [
"F2 lb 25",
"F2 lb 26",
"F2 lb 27"
],
"eksamen": []
}
]
},
{
"id": "f2-jorda",
"forelesning": "F2 Avkastning over tid på ulike aktiva",
"tittel": "Jordà mfl. (2019): The rate of return on everything",
"eksamensvekt": 1,
"viktigst": [
"16 land, 1870–2015; aksjer og bolig er risikable, statsobligasjoner og statssertifikater sikre",
"Real totalavkastning: bolig 7,3 % og aksjer 6,7 % per år (lysbildet)",
"Bolig best før andre verdenskrig, aksjer etter; aksjer har ca. dobbelt så høyt standardavvik",
"r > g i alle land og perioder utenom krig",
"Sikre aktiva gir lav og volatil realavkastning; man får betalt for å ta risiko"
],
"punkter": [
{
"id": "f2-jorda-01",
"nivaa": "kjerne",
"kan": "Kjenne datasettet og aktivaklassene i Jordà-artikkelen",
"kort": "16 industriland, årlige data 1870–2015, fire aktivaklasser: aksjer og bolig (risikable), statsobligasjoner og statssertifikater (sikre). Det nye er totalavkastning på bolig (prisstigning + leie).",
"mer": "<p>Avkastningen er markedsbasert (faktiske priser), ikke utledet fra nasjonalregnskap som hos Piketty. Bolig er ca. halvparten av nasjonalformuen. Avkastningene er før skatt; artikkelen tar ikke hensyn til skatt. Høyrenteobligasjoner er risikable og knyttet til enkeltbedrifter og er ikke med. Lysbildet skriver «1850–2015»; artikkelen dekker 1870–2015.<\/p><p><b>Felle:<\/b> å regne statsobligasjoner som risikable i Jordàs inndeling.<\/p>",
"kilder": [
"F2 lb 9",
"F2 lb 14",
"J s. 1225–1226",
"J s. 1266"
],
"eksamen": []
},
{
"id": "f2-jorda-02",
"nivaa": "kjerne",
"kan": "Kjenne hovedtallene for bolig og aksjer 1870–2015",
"kort": "Real totalavkastning: bolig 7,3 % og aksjer 6,7 % per år (uvektet landsnitt, lysbildet). Begge ligger rundt 7 %.",
"mer": "<p>Lysbildetabellen: aksjer 6,67 og bolig 7,26 (uvektet); vektet 7,12 og 6,72. Artikkelens globale tabell II gir bolig 7,06 og aksjer 6,88. Norge: aksjer 5,67 og bolig 8,03. Eldre versjon: «ca. 7 % per år». Til eksamen: 7,3 % og 6,7 %.<\/p><p><b>Felle:<\/b> å bytte om tallene (aksjer 7,3 %).<\/p>",
"kilder": [
"F2 lb 16",
"F2 lb 17",
"J tabell II"
],
"eksamen": []
},
{
"id": "f2-jorda-03",
"nivaa": "kjerne",
"kan": "Forklare hvordan avkastningen på bolig og aksjer har utviklet seg over tid",
"kort": "Bolig ga bedre avkastning enn aksjer før andre verdenskrig (mye eiendom ble ødelagt i krigen). Etter krigen har aksjer gitt høyere avkastning, men med mye høyere volatilitet.",
"mer": "<p>Etter 1950: aksjer 8,30 og bolig 7,47 (uvektet). Etter 1980: aksjer 10,78 og bolig 6,43. Forelesningen spør om dette er en gjenoppbygningseffekt. Over hele perioden er forskjellene små og avkastningen på risikable investeringer ser ut til å utjevnes over tid (tilbud og etterspørsel?). Tidsseriene er svært lange og gir robuste trender.<\/p><p><b>Felle:<\/b> «aksjer har slått bolig over hele perioden».<\/p>",
"kilder": [
"F2 lb 16",
"F2 lb 17",
"F2 lb 24",
"J s. 1228"
],
"eksamen": []
},
{
"id": "f2-jorda-04",
"nivaa": "kjerne",
"kan": "Sammenligne risikoen på bolig og aksjer",
"kort": "Aksjer har nesten dobbelt så høyt standardavvik som bolig: ca. 24 mot ca. 10 (lysbildet). Lik avkastning med halv risiko er en gåte.",
"mer": "<p>Tabell VIII: hele perioden aksjer 21,89 og bolig 10,40; etter 1950 aksjer 24,24 og bolig 8,95. Bolig har høyere avkastning per risikoenhet (Sharpe-brøk) i alle 16 land, i snitt mer enn dobbelt så høy. Betyr det at eiendom åpenbart er best? Nei: tallene gjelder en eiendomsportefølje, ikke ett hus.<\/p><p><b>Felle:<\/b> å konkludere at en privatperson med ett hus har like lav risiko.<\/p>",
"kilder": [
"F2 lb 23",
"F2 lb 24",
"F2 lb 32",
"F2 lb 33",
"J s. 1274–1275"
],
"eksamen": []
},
{
"id": "f2-jorda-05",
"nivaa": "kjerne",
"kan": "Forklare komponentene i avkastningen på bolig og aksjer",
"kort": "Real prisstigning på bolig er bare rundt 1 % per år, mens leien er høy og stabil. Aksjer har høyere kapitalgevinst, men lavere og mer ustabil direkteavkastning (utbytte), så kursgevinsten er viktig for aksjer.",
"mer": "<p>Tabell VIII (hele perioden): aksjer real kapitalgevinst 2,78 + utbytte 4,17 = 6,82; bolig real kapitalgevinst 1,61 + leie 5,50 = 6,92. Etter 1950 utgjør kapitalgevinsten mesteparten av aksjeavkastningen og ca. 1/3 for bolig.<\/p><p><b>Felle:<\/b> «bolig har gitt høy avkastning fordi prisene har steget mye». Det er leien som bærer avkastningen.<\/p>",
"kilder": [
"F2 lb 15",
"F2 lb 22",
"F2 lb 23",
"J s. 1228–1229",
"J s. 1275"
],
"eksamen": []
},
{
"id": "f2-jorda-06",
"nivaa": "kjerne",
"kan": "Forklare r > g og betydningen for ulikhet",
"kort": "Avkastningen på formue (r) har vært høyere enn BNP-veksten (g) i alle land og perioder, unntatt i og rundt krig. Ifølge Piketty blir kapitaleiere da relativt rikere og ulikheten øker.",
"mer": "<p>Gapet var i snitt ca. 5 pp før andre verdenskrig, krympet til ca. 2 pp på 1970-tallet og er i dag ca. 3–4 pp. Norge hele perioden: r = 6,86 % og g = 3,06 %. En gåte: r − g varierer ikke systematisk med vekstraten. Forelesningen: dette kan forklare den økte ulikheten i mange land.<\/p><p><b>Felle:<\/b> «Jordà avviser Pikettys r > g». De bekrefter den for flere land og år.<\/p>",
"kilder": [
"F2 lb 10",
"F2 lb 11",
"J s. 1230",
"J tabell XII"
],
"eksamen": []
},
{
"id": "f2-jorda-07",
"nivaa": "kjerne",
"kan": "Sammenligne avkastningen på risikable og sikre aktiva",
"kort": "Risikabel avkastning (vektet snitt av aksjer og bolig) ca. 7,4 % mot sikker (obligasjoner og sertifikater) ca. 1,9 % over hele perioden. Man får betalt for å ta risiko.",
"mer": "<p>Tabell XI (uvektet): hele perioden 7,44 mot 1,88; 1950–1980 8,48 mot −0,81 (høy inflasjon ga negativ sikker realavkastning); etter 1980 7,65 mot 3,89. Norge 1950–1980: sikker −2,34. Sikker realavkastning er svært volatil, ofte mer enn den risikable, med bunner i verdenskrigene og 1970-tallets stagflasjon.<\/p><p><b>Felle:<\/b> «statsobligasjoner er risikofrie også reelt». Inflasjon gjør dem risikable i realverdi.<\/p>",
"kilder": [
"F2 lb 29",
"F2 lb 30",
"J s. 1229",
"J tabell XI"
],
"eksamen": []
},
{
"id": "f2-jorda-08",
"nivaa": "viktig",
"kan": "Kjenne risikopremien i Jordà mfl. og avviket mot lysbildet",
"kort": "Lysbildet: risikopremien ligger i snitt mellom 6 og 8 % og er høyere i krig enn i fred. Artikkelen: 6–8 % er den risikable avkastningen, mens risikopremien (risikabel minus sikker) er ca. 4–5 % i de fleste fredsperioder.",
"mer": "<p>Premien var uvanlig høy fra 1950- til 1970-tallet. Hoppene i premien i krig og mellomkrigstid skyldes mest kollaps i den sikre renten. Eldre versjon: «4–5 % i fredstid, høyere i krig, i snitt 6–8 %». Til eksamen: spør oppgaven etter forelesningens tall, svar 6–8 %; skilles risikabel avkastning og premie, er 4–5 % riktig for premien.<\/p><p><b>Felle:<\/b> å blande risikabel avkastning og risikopremie.<\/p>",
"kilder": [
"F2 lb 15",
"eldre F2",
"J s. 1229–1230"
],
"eksamen": []
},
{
"id": "f2-jorda-09",
"nivaa": "viktig",
"kan": "Forklare diversifiseringsgevinsten mellom bolig og aksjer",
"kort": "Kovariansen mellom aksje- og boligavkastning er lav, så det gir diversifiseringsgevinster å holde begge aktivaklassene (jf. Oljefondet, som har både aksjer og eiendom).",
"mer": "<p>Før andre verdenskrig fulgte bolig, aksjer og sikre aktiva like baner. Etter krigen fikk aksjer hyppigere og mer samvarierende oppturer og krakk på tvers av land.<\/p><p><b>Felle:<\/b> «bolig og aksjer svinger i takt, så det er ingen gevinst av å holde begge».<\/p>",
"kilder": [
"F2 lb 16",
"F2 lb 24",
"J s. 1229"
],
"eksamen": []
},
{
"id": "f2-jorda-10",
"nivaa": "viktig",
"kan": "Vite hva Jordà-tallene sier om nordiske aksjer etter 1980",
"kort": "1980–2015 hadde svenske (15,87 %), finske (16,32 %) og danske (13,30 %) aksjer høyere realavkastning enn norske (12,22 %).",
"mer": "<p>Norge etter 1980: aksjer 12,22 % og bolig 9,82 %. Forelesningen spør om vi da burde kjøpe svenske, danske og finske indeksfond, eller om vi ikke lærer noe av historiske tall. Ferske tall (2026) viser at norske indeksfond har slått nordiske de siste årene.<\/p><p><b>Felle:<\/b> å tro at Norge hadde høyest aksjeavkastning i Norden 1980–2015.<\/p>",
"kilder": [
"F2 lb 17",
"F2 lb 18"
],
"eksamen": []
},
{
"id": "f2-jorda-11",
"nivaa": "detalj",
"kan": "Kjenne Jordàs funn om sikre renter",
"kort": "Sikre realrenter har vært lave (1–3 % i fredstid i de fleste land) og volatile. Dagens lave nivå er ikke uvanlig historisk; gåten er heller hvorfor renten var så høy midt på 1980-tallet.",
"mer": "<p>Toppene var i starten av perioden, i mellomkrigstiden og under inflasjonsbekjempelsen midt på 1980-tallet. Lave sikre renter har lettet statens gjeldsbetjening, f.eks. rask nedbygging av gjeld etter andre verdenskrig. Kombinasjonen av lav avkastning og høy volatilitet har gitt investorer i sikre aktiva en dårlig avveining mellom risiko og avkastning.<\/p><p><b>Felle:<\/b> «dagens lave renter er historisk unike».<\/p>",
"kilder": [
"J s. 1229"
],
"eksamen": []
}
],
"kildenotat": "F2 Avkastning over tid på ulike aktiva (pensum J)"
},
{
"id": "f2-risiko",
"forelesning": "F2 Avkastning over tid på ulike aktiva",
"tittel": "Risiko, inflasjon og bruk av historiske tall",
"eksamensvekt": 1,
"viktigst": [
"Jordàs eiendomstall gjelder en portefølje; ett hus har idiosynkratisk risiko",
"Fond diversifiserer bort idiosynkratisk risiko",
"Høy inflasjon: unngå bank og obligasjoner; aksjer og eiendom kan justere priser og leie",
"Historiske tall brukes til kalibrering og forståelse av risiko, ikke som garanti"
],
"punkter": [
{
"id": "f2-risiko-01",
"nivaa": "kjerne",
"kan": "Forklare hvorfor ett hus er mer risikabelt enn Jordàs eiendomstall",
"kort": "Tallene gjengir et snitt for en eiendomsportefølje. Ett hus bærer idiosynkratisk risiko knyttet til prisutviklingen og beliggenheten og den kan ikke diversifiseres bort.",
"mer": "<p>Eksempler: jordskredet i Gjerdrum, regionale forskjeller og at eiendom innen samme region kan utvikle seg svært ulikt (2020 ga god snittavkastning, men stor spredning). Artikkelen: standardavviket på postnummernivå er ca. 1/3 høyere enn nasjonalt, men fortsatt godt under aksjer.<\/p><p><b>Felle:<\/b> «eiendom er alltid tryggere enn aksjer».<\/p>",
"kilder": [
"F2 lb 34",
"F2 lb 35",
"F2 lb 36",
"J s. 1260"
],
"eksamen": []
},
{
"id": "f2-risiko-02",
"nivaa": "kjerne",
"kan": "Forklare hvordan fond fjerner idiosynkratisk risiko",
"kort": "Enkeltaksjer og enkelthus har idiosynkratisk risiko. Aksjefond og eiendomsfond eliminerer den; må vi eie ett hus, er risikoen større enn i et eiendomsindeksfond.",
"mer": "<p>Diversifisering fjerner risikoen knyttet til ett objekt, men ikke markedsrisikoen. Samme poeng kommer i F3: småinvestorer diversifiserer for lite (French og Poterba 1991) og indeksfond er standardrådet. Jordàs lave boligrisiko gjelder derfor en investor som holder en bred portefølje, for eksempel gjennom et eiendomsfond.<\/p><p><b>Felle:<\/b> «et fond med mange eiendommer har samme risiko som ett hus».<\/p>",
"kilder": [
"F2 lb 37",
"F3 lb 55"
],
"eksamen": []
},
{
"id": "f2-risiko-03",
"nivaa": "kjerne",
"kan": "Forklare hva du bør eie i perioder med høy inflasjon",
"kort": "Ikke bank eller obligasjoner, fordi renten på rentepapirer ikke justeres etter inflasjonen. Bedrifter og husleiekontrakter kan justere priser og leie, så aksjer og eiendom beskytter bedre.",
"mer": "<p>I krig og usikre tider øker inflasjonen. I Jordà-dataene ga den høye inflasjonen 1950–1980 negativ sikker realavkastning. De historiske dataene taler derfor for aksjer og eiendom i slike perioder.<\/p><p><b>Felle:<\/b> «obligasjoner er best når inflasjonen øker fordi de er sikre».<\/p>",
"kilder": [
"F2 lb 30",
"F2 lb 31"
],
"eksamen": []
},
{
"id": "f2-risiko-04",
"nivaa": "viktig",
"kan": "Forklare hva historiske avkastningstall kan brukes til",
"kort": "Historisk avkastning gir ingen garanti, men brukes til å kalibrere realistiske langsiktige forventninger, forstå risiko (volatilitet, drawdowns) og forstå hvordan aktivaklasser oppfører seg i kriser.",
"mer": "<p>Studier finner tegn til at markedene beveger seg mot langsiktige gjennomsnitt («mean reversion»). Sammenhengen varierer med tidshorisont, type investering og metode. Forelesningen bruker dette når den spør om vi bør kjøpe svenske, danske og finske indeksfond fordi de gjorde det best 1980–2015.<\/p><p><b>Felle:<\/b> «aktivaklassen med høyest historisk avkastning vil gi høyest avkastning fremover».<\/p>",
"kilder": [
"F2 lb 38"
],
"eksamen": []
},
{
"id": "f2-risiko-05",
"nivaa": "viktig",
"kan": "Vurdere om man bør velge land ut fra historisk aksjeavkastning",
"kort": "Nei: Norden slo Norge 1980–2015, men de siste årene har norske indeksfond slått nordiske (KLP AksjeNorge Indeks 18,8 % mot AksjeNorden Indeks 8,9 %, 3 år annualisert, aug. 2026).",
"mer": "<p>Norge er spesielt etter 2015: oljeinntektene slår inn for fullt, landet takler kriser bedre og uro og krig driver opp olje- og gassprisene. Andre tall: DNB Norge Indeks 12,7 % (5 år), Avanza Zero (Sverige) 9,6 %, dansk C25 0,2 %. Et nordisk fond gir valutarisiko (SEK, DKK, EUR) men bredere spredning. Begge KLP-fondene koster 0,10 % per år.<\/p><p><b>Felle:<\/b> å bruke 1980–2015-tallene som fasit for fremtiden.<\/p>",
"kilder": [
"F2 lb 18",
"F2 lb 19",
"F2 lb 20",
"F2 lb 21"
],
"eksamen": []
}
]
},
{
"id": "f2-makro",
"forelesning": "F2 Avkastning over tid på ulike aktiva",
"tittel": "Skatt, rente og konsum: to-periodemodellen",
"eksamensvekt": 1,
"viktigst": [
"Budsjett: C₂ = Y₂ + (Y₁ − C₁)(1 + r(1 − t))",
"Høyere rente eller lavere skatt gjør budsjettlinjen brattere og sparing mer lønnsomt",
"Låntaker: substitusjons- og inntektseffekten trekker begge C₁ ned",
"Långiver: inntektseffekten har motsatt fortegn, så totaleffekten er usikker"
],
"punkter": [
{
"id": "f2-makro-01",
"nivaa": "kjerne",
"kan": "Sette opp budsjettbetingelsene i to-periodemodellen med skatt",
"kort": "C₁ = Y₁ − S og C₂ = Y₂ + S(1 + r(1 − t)). Slått sammen: C₂ = Y₂ + (Y₁ − C₁)(1 + r(1 − t)).",
"mer": "<p>Individet maksimerer U(C<sub>1<\/sub>, C<sub>2<\/sub>) og Y er eksogen inntekt (lønn, NAV osv.). Budsjettlinjen har stigningstall −(1 + r(1 − t)). Hvorfor spare hvis Y<sub>1<\/sub> = Y<sub>2<\/sub>? På grunn av tidspreferanseraten og avkastningen på sparing.<\/p><p><b>Felle:<\/b> å bruke r i stedet for r(1 − t). Renteinntekt skattlegges.<\/p>",
"kilder": [
"F2 lb 52",
"F2 lb 53"
],
"eksamen": []
},
{
"id": "f2-makro-02",
"nivaa": "kjerne",
"kan": "Forklare at høyere rente og lavere skatt virker i samme retning",
"kort": "Avkastningen etter skatt er r(1 − t). Både r↑ og t↓ øker r(1 − t), gjør budsjettlinjen brattere og gjør det mer lønnsomt å spare og dyrere å låne.",
"mer": "<p>Når renten stiger, får vi mer betalt for å utsette konsum. Når skatten går ned, får vi mer avkastning på sparingen. For en låntaker betyr lavere skatt at rentefradraget blir mindre verdt, så lånekostnaden etter skatt stiger. Eldre versjon: t↑ virker for låntakeren som r↓, fordi en større del av gjeldsrentene trekkes fra.<\/p><p><b>Felle:<\/b> «lavere skatt gjør det billigere å låne».<\/p>",
"kilder": [
"F2 lb 50",
"F2 lb 53",
"eldre F2"
],
"eksamen": []
},
{
"id": "f2-makro-03",
"nivaa": "kjerne",
"kan": "Forklare virkningen av renteøkning for en låntaker",
"kort": "Låntaker (Y₁ < C₁): substitusjonseffekten (A → B) og inntektseffekten (B → C) senker begge C₁. Låntakeren blir fattigere og reduserer konsumet i dag.",
"mer": "<p>Slutsky: ∂C<sub>1<\/sub>/∂r = inntektseffekt med fortegn fra (Y<sub>1<\/sub> − C<sub>1<\/sub>) + substitusjonseffekt (∂C<sub>1<\/sub>/∂r)<sub>dU=0<\/sub> &lt; 0. Med Y<sub>1<\/sub> − C<sub>1<\/sub> &lt; 0 er begge negative. Figuren er tegnet slik at C<sub>2<\/sub> er uendret, men økt rente kan også redusere C<sub>2<\/sub>. Nytten faller: U<sup>A<\/sup> &gt; U<sup>C<\/sup>.<\/p><p><b>Felle:<\/b> å tro at substitusjons- og inntektseffekten trekker hver sin vei for en låntaker.<\/p>",
"kilder": [
"F2 lb 54",
"F2 lb 55"
],
"eksamen": []
},
{
"id": "f2-makro-04",
"nivaa": "kjerne",
"kan": "Forklare virkningen av renteøkning for en långiver",
"kort": "Långiver (Y₁ > C₁): substitusjonseffekten senker C₁, men inntektseffekten øker C₁ fordi långiveren blir rikere. Totaleffekten er usikker.",
"mer": "<p>For en sparer har inntektseffekten motsatt fortegn av substitusjonseffekten, så konsumet i dag kan både øke og falle. Bare for låntakere er retningen entydig. Det samme gjelder lavere skatt på renteinntekter, som også øker r(1 − t) for en sparer.<\/p><p><b>Felle:<\/b> «høyere rente reduserer alltid konsumet i dag».<\/p>",
"kilder": [
"F2 lb 55"
],
"eksamen": []
},
{
"id": "f2-makro-05",
"nivaa": "viktig",
"kan": "Forklare hvorfor fordelingen mellom låntakere og långivere betyr noe for økonomien",
"kort": "Flertallet av norske husholdninger er låntakere. Da gir høyere rente (eller lavere skatt) entydig lavere konsum, som demper farten i økonomien og i boligmarkedet.",
"mer": "<p>Skatt er også makroøkonomi: skattlegging påvirker konsumet, som påvirker prisene. Eldre versjon: konsum er den sterkeste driveren for vekst og prisvekst og sentralbanken prøver å dempe konsum og prisstigning med høyere styringsrente.<\/p><p><b>Felle:<\/b> å anta at norske husholdninger i hovedsak er nettosparere.<\/p>",
"kilder": [
"F2 lb 4",
"F2 lb 50",
"F2 lb 56",
"eldre F2"
],
"eksamen": []
}
]
},
{
"id": "f3-utleie",
"forelesning": "F3 Investeringscaser",
"tittel": "Skatt ved utleie og salg av bolig",
"eksamensvekt": 3,
"viktigst": [
"Skattefri utleie når du selv bruker minst halvparten målt etter utleieverdi (ikke areal)",
"Skattefri leie: ingen rapportering og ingen fradrag",
"Sekundærbolig: 22 % på netto leie og på gevinst, fradrag for kostnader og tap",
"Skattefritt salg: eid ≥ 1 år og bodd ≥ 12 av de siste 24 månedene",
"Leie inntil 20 000 kr per år er skattefri; korttidsutleie: 10 000 fritt og 85 % av resten skattepliktig"
],
"punkter": [
{
"id": "f3-utleie-01",
"nivaa": "kjerne",
"kan": "Avgjøre om utleie av del av egen bolig er skattefri",
"kort": "Leieinntekten er skattefri hvis du selv bruker minst halvparten av boligen, målt etter utleieverdi (ikke areal). Da er leien skattefri uansett beløp.",
"mer": "<p><b>Felle:<\/b> alternativene «etter størrelse eller areal», «utleieenheten har ikke egen inngang» eller «eid mer enn ett år».<\/p>",
"kilder": [
"F3 lb 15",
"Notat utleie"
],
"eksamen": [
"H2018 o1a",
"H2021 o1d"
]
},
{
"id": "f3-utleie-02",
"nivaa": "kjerne",
"kan": "Anvende utleieverdiregelen på en bolig med to like store etasjer",
"kort": "H2021 o1d: Tiril leier ut 1. etasje for 14 000 i måneden og bor selv i 2. etasje (utleieverdi 15 000). Utleid del har lavere utleieverdi enn egen del, så skatten er 0 kr.",
"mer": "<p>Etasjene er like store, så arealet avgjør ikke; utleieverdien gjør (14 000 &lt; 15 000). Fasiten nevner også at leieforholdet varer mer enn 30 dager, så det er ikke korttidsutleie. Året hun var i utlandet og leide ut hele boligen, er ikke det spørsmålet gjelder.<\/p><p><b>Felle:<\/b> å regne 22 % av 14 000 = 3 080 i måneden.<\/p>",
"kilder": [
"F3 lb 15",
"Notat utleie"
],
"eksamen": [
"H2021 o1d"
]
},
{
"id": "f3-utleie-03",
"nivaa": "kjerne",
"kan": "Vite hva skattefri utleie betyr for rapportering og fradrag",
"kort": "Skattefri leieinntekt trenger ikke rapporteres til Skatteetaten, men du får heller ikke fradrag for kostnader knyttet til utleien eller leiligheten.",
"mer": "<p>Med svært høye kostnader kan skattepliktig utleie i prinsippet gi lavere skatt, men i caset er skattefri utleie av ett rom klart best. Rentene på boliglånet gir uansett fradrag i alminnelig inntekt; de er ikke en utleiekostnad.<\/p><p><b>Felle:<\/b> å tro at du både kan ha skattefri leie og trekke fra vedlikehold og felleskostnader.<\/p>",
"kilder": [
"F3 lb 15",
"Notat utleie"
],
"eksamen": []
},
{
"id": "f3-utleie-04",
"nivaa": "kjerne",
"kan": "Regne ut skatten ved utleie av sekundærbolig",
"kort": "Skatt = 22 % av (leie − fradragsberettigede kostnader). Caset: 174 000 − 64 192 = 109 808 i netto leie og 85 650 etter skatt.",
"mer": "<p>Kostnadene i caset: kommunale avgifter 12 940, bredbånd 7 188 (599 × 12), fellesutgifter 29 364, eiendomsskatt 10 500 og forsikring 4 200, til sammen 64 192. 109 808 × 0,78 = 85 650. Leietaker betaler strøm selv.<\/p><p><b>Felle:<\/b> å skattlegge brutto leie, eller å bruke 50,6 % (gjelder bare næring, mer enn fire boenheter).<\/p>",
"kilder": [
"F3 lb 8",
"F3 lb 16",
"F3 lb 21"
],
"eksamen": []
},
{
"id": "f3-utleie-05",
"nivaa": "kjerne",
"kan": "Kjenne kostnadene som gir fradrag ved skattepliktig utleie",
"kort": "Kommunale avgifter og eiendomsskatt, forsikring, vedlikehold (ikke standardheving), felleskostnader (ikke avdrag eller renter på fellesgjeld), strøm og renhold hvis det er med i leien, annonsering og visning, festeavgift, reiser knyttet til utleien, depositumsgebyr og slitasje på møbler.",
"mer": "<p>Vedlikehold bringer boligen tilbake til opprinnelig stand (maling, rør, råttent panel). Påkostning (oppgradering, ombygging) gir ikke fradrag ved utleien, men ved salg. Møblert utleie: standardfradrag 15 % av brutto leie for leieforhold inntil tre år; ellers fradrag direkte for innbo under 15 000 og 20 % årlig avskrivning av restverdien ellers. Avdrag og renter på boliglånet er ikke utleiekostnader.<\/p><p><b>Felle:<\/b> å trekke fra påkostninger eller avdrag.<\/p>",
"kilder": [
"F3 lb 17",
"Notat utleie"
],
"eksamen": []
},
{
"id": "f3-utleie-06",
"nivaa": "kjerne",
"kan": "Kjenne vilkårene for skattefritt salg av egen bolig",
"kort": "Eiertid: du må ha eid boligen i minst ett år før du aksepterer budet. Botid: du må ha bodd der minst 12 av de siste 24 månedene før salget (kan være usammenhengende).",
"mer": "<p>Brukshindring: må du flytte på grunn av arbeid, utdanning eller sykdom som du ikke kjente til ved kjøpet, kan du fortsatt opptjene botid selv om du leier ut. Bor du i ett rom og leier ut det andre i tre år, er salget skattefritt. Sekundærbolig: gevinsten skattlegges med 22 % og tap gir fradrag.<\/p><p><b>Felle:<\/b> å tro at botiden må være sammenhengende, eller at eiertiden regnes til kjøperen overtar.<\/p>",
"kilder": [
"F3 lb 18",
"F3 lb 19"
],
"eksamen": []
},
{
"id": "f3-utleie-07",
"nivaa": "kjerne",
"kan": "Sammenligne skattereglene for «leie ut hele» og «bo selv og leie ut ett rom»",
"kort": "Hele (sekundærbolig): 22 % på netto leie og på gevinst, fradrag for kostnader og tap, ingen formuesrabatt. Ett rom (primærbolig): skattefri leie, skattefri gevinst og 75 % rabatt på formuesverdien under 10 mill.",
"mer": "<p>Resultatet i caset (EK-finansiert): ett rom gir ca. 12 % EK-rentabilitet mot 8,3 % for hele leiligheten, selv om leien halveres (87 000 mot 174 000). Det er skattereglene, ikke leienivået, som avgjør hvilken strategi som lønner seg.<\/p><p><b>Felle:<\/b> «høyest leie gir høyest avkastning».<\/p>",
"kilder": [
"F3 lb 18",
"F3 lb 26"
],
"eksamen": []
},
{
"id": "f3-utleie-08",
"nivaa": "viktig",
"kan": "Kjenne 20 000-kronersregelen for utleie",
"kort": "Brutto leieinntekt på inntil 20 000 kr per år er skattefri, også når du ikke bruker halvparten selv eller leier ut mens du er bortreist. Overstiger leien 20 000, blir hele leien skattepliktig.",
"mer": "<p>Overstiger du 20 000 i perioder der du bruker mindre enn halvparten selv (eller ikke bor der), blir all leieinntekt skattepliktig, også fra perioder der du brukte minst halvparten selv. Regelen er særlig aktuell ved korttidsutleie.<\/p><p><b>Felle:<\/b> å tro at bare beløpet over 20 000 skattlegges. Det er hele beløpet.<\/p>",
"kilder": [
"Notat utleie"
],
"eksamen": []
},
{
"id": "f3-utleie-09",
"nivaa": "viktig",
"kan": "Regne ut skattepliktig inntekt ved korttidsutleie av egen bolig",
"kort": "Korttidsutleie (leieforhold under 30 dager) er skattepliktig, men de første 10 000 kr er skattefrie og 85 % av resten er skattepliktig. 20 000 i leie gir 8 500 i skattepliktig inntekt.",
"mer": "<p>(20 000 − 10 000) × 0,85 = 8 500 og skatten blir 8 500 × 22 % = 1 870. De 15 % fungerer som et standardfradrag, så faktiske kostnader kan ikke trekkes fra i tillegg. Regelen gjelder bare bolig du vanligvis bor i selv; korttidsutleie av sekundærbolig skattlegges vanlig (overskudd × 22 %).<\/p><p><b>Felle:<\/b> å bruke 85 % på hele beløpet (17 000) eller å glemme de skattefrie 10 000.<\/p>",
"kilder": [
"Notat utleie"
],
"eksamen": []
},
{
"id": "f3-utleie-10",
"nivaa": "viktig",
"kan": "Vite når utleie alltid er skattepliktig (flermannsbolig)",
"kort": "Leieinntekt fra flermannsbolig er alltid skattepliktig, selv om du bruker halvparten selv eller leien er under 20 000. Flermannsbolig: tre eller flere familieleiligheter, eller to familieleiligheter og en selvstendig hybel.",
"mer": "<p>Familieleilighet: eget soverom, kjøkken, bad og stue, som regel over 40 m². Selvstendig hybel: egen inngang med låsbar dør og eget toalett. Mer enn fire boenheter regnes som næring (F3 lb 16). Et hus med egen bolig og én utleieleilighet har to familieleiligheter og er ikke en flermannsbolig, så halvpartsregelen gjelder der.<\/p><p><b>Felle:<\/b> å bruke halvpartsregelen på en flermannsbolig.<\/p>",
"kilder": [
"Notat utleie",
"F3 lb 16"
],
"eksamen": []
},
{
"id": "f3-utleie-11",
"nivaa": "viktig",
"kan": "Kjenne kostnadene ved bolighandel som caset holder utenfor",
"kort": "Dokumentavgift (2,5 % av kjøpesummen, 152 500 på 6,1 mill.) og formuesskatt på sekundærbolig (6,1 mill. × 1 % = 61 000 per år) gir ikke fradrag. Meglerutgifter (150 000–170 000) gir fradrag mot salgsgevinsten.",
"mer": "<p>Forelesningen lar dokumentavgift og meglerutgifter utligne hverandre. Sekundærbolig får ingen formuesrabatt i forelesningens forenkling. I H2023 o6 ble dokumentavgiften trukket fra i avkastningen. Formuesskatten på 61 000 i året ville senket avkastningen i case 1 ytterligere, mens primærboligen i case 2 får 75 % rabatt.<\/p><p><b>Felle:<\/b> å trekke dokumentavgiften fra skattepliktig gevinst.<\/p>",
"kilder": [
"F3 lb 23"
],
"eksamen": [
"H2023 o6"
]
}
]
},
{
"id": "f3-laan-gearing",
"forelesning": "F3 Investeringscaser",
"tittel": "Lån, utlånsforskriften og gearing",
"eksamensvekt": 2,
"viktigst": [
"Gjeld ≤ 5 × brutto årsinntekt; belåningsgrad ≤ 90 %; tåle +3 pp rente; avdrag over 60 % belåning",
"Renter etter skatt = renter × (1 − 0,22)",
"RE = RA + (RA − RG) × G/E",
"Gearing forsterker både gevinst og tap"
],
"punkter": [
{
"id": "f3-laan-gearing-01",
"nivaa": "kjerne",
"kan": "Kjenne hovedkravene i utlånsforskriften (2026)",
"kort": "Gjeld ≤ 5 × brutto årsinntekt, belåningsgrad ≤ 90 %, låntaker må tåle en renteøkning på 3 pp og avdrag kreves når belåningsgraden er over 60 %. Bankene kan fravike reglene for inntil 10 % av lånene (8 % i Oslo).",
"mer": "<p>600 000 i årsinntekt gir maks 3 mill. i samlet gjeld.<\/p><p><b>Avvik:<\/b> H2020 og H2021 (Næss-delen) brukte stresstest med +5 pp og 30 års annuitet. F3 2026 sier +3 pp. Bruk 3 pp for 2026, men følg oppgaveteksten hvis den oppgir noe annet.<\/p><p><b>Felle:<\/b> å glemme at 5 × inntekt gjelder samlet gjeld, så eksisterende gjeld (f.eks. studielån) må trekkes fra.<\/p>",
"kilder": [
"F3 lb 5",
"F3 lb 6"
],
"eksamen": [
"H2020 o4b",
"H2020 o4c",
"H2021 o5b",
"H2021 o5c"
]
},
{
"id": "f3-laan-gearing-02",
"nivaa": "kjerne",
"kan": "Regne ut rentekostnad etter skatt",
"kort": "Renter etter skatt = renter × (1 − 0,22). 12 500 i renter i måneden (3 mill. × 5 %/12) koster 9 750 etter skatt; i stresstesten med 8 % blir det 20 000 og 15 600.",
"mer": "<p>3 mill. som annuitetslån over 20 år med 5 % gir et terminbeløp på 19 799 kr i måneden. Rentene gir fradrag i alminnelig inntekt med 22 %. I eiendomscaset: 5 mill. × 3,5 % × 0,78 = 136 500 per år; med 6 % blir det 234 000.<\/p><p><b>Felle:<\/b> å bruke marginalskatten på lønn (47,4 %) på rentefradraget. Fradraget er verdt 22 %.<\/p>",
"kilder": [
"F3 lb 6",
"F3 lb 27",
"F3 lb 29"
],
"eksamen": []
},
{
"id": "f3-laan-gearing-03",
"nivaa": "kjerne",
"kan": "Bruke brekkstangformelen (gearingeffekten)",
"kort": "RE = RA + (RA − RG) × G/E. Er avkastningen på investeringen høyere enn lånerenten, øker gjeld avkastningen på egenkapitalen og omvendt.",
"mer": "<p>R<sub>A<\/sub> er avkastningen på totale eiendeler, R<sub>G<\/sub> rentekostnaden på gjelden og G/E gjeldsgraden.<\/p><p><b>Eget talleksempel:<\/b> R<sub>A<\/sub> = 10 %, R<sub>G<\/sub> = 5 %, G/E = 4 gir R<sub>E<\/sub> = 10 + 5 · 4 = 30 %. Faller R<sub>A<\/sub> til 2 %, blir R<sub>E<\/sub> = 2 − 3 · 4 = −10 %.<\/p><p><b>Felle:<\/b> «gearing øker alltid avkastningen». Den forsterker begge veier; går det dårlig, taper egenkapitalen mer.<\/p>",
"kilder": [
"F3 lb 7",
"F3 lb 9"
],
"eksamen": [
"H2020 o6f"
]
},
{
"id": "f3-laan-gearing-04",
"nivaa": "viktig",
"kan": "Forklare hvorfor gearing ga mye høyere EK-avkastning i eiendomscaset",
"kort": "Avkastningen på leiligheten (18 % prisstigning over tre år og skattefri leie) var langt høyere enn lånekostnaden etter skatt (3,5 % × 0,78 = 2,73 %). Gearing ga ca. 70 % mot 12 % uten lån og selv 6 % rente ga 45 %.",
"mer": "<p>EK 1,1 mill. og lån 5 mill. av 6,1 mill. gir ca. 18 % egenkapital og gjeldsgrad G/E ≈ 4,5. Lånet er avdragsfritt og innfris ved salg etter tre år. En belåningsgrad på 82 % utløser egentlig avdragskrav etter forskriften; caset ser bort fra det.<\/p><p><b>Felle:<\/b> å tro at gearing lønner seg uansett prisutvikling (se sensitivitetsanalysen).<\/p>",
"kilder": [
"F3 lb 27",
"F3 lb 31"
],
"eksamen": []
},
{
"id": "f3-laan-gearing-05",
"nivaa": "viktig",
"kan": "Forklare at gearing forsterker tap",
"kort": "Selges leiligheten for kjøpesummen, gir gearing −21,2 % på egenkapitalen mot −4,5 % med full egenkapital. «Når det går dårlig, går det mindre dårlig med EK-finansiering.»",
"mer": "<p>Gearet (3,5 %): NV = −1 100 000 − 140 016 + 5 582 364 − 4 575 708 = −233 360, dvs. −21,2 % av 1,1 mill. EK, ett rom: NV = −6 100 000 + 246 089 + 5 582 364 = −271 547, dvs. −4,5 % av 6,1 mill. Kronetapet er størst med EK, men målt mot egenkapitalen er det motsatt.<\/p><p><b>Felle:<\/b> å sammenligne kronebeløpene i stedet for avkastningen på egenkapitalen.<\/p>",
"kilder": [
"F3 lb 32",
"F3 lb 33"
],
"eksamen": []
},
{
"id": "f3-laan-gearing-06",
"nivaa": "viktig",
"kan": "Forklare hva lavere alminnelig skattesats betyr for en låntaker",
"kort": "Faller satsen fra 22 % til f.eks. 20 %, blir rentefradraget mindre verdt, men skatten på lønn faller også. Hvilken effekt som dominerer, avhenger av gjeldens størrelse og lånerenten.",
"mer": "<p><b>Eget talleksempel:<\/b> renter 150 000 og lønn 600 000. Fradraget taper 2 % · 150 000 = 3 000, mens skatten på lønnen faller med 2 % · 600 000 = 12 000, så låntakeren tjener 9 000 netto. Med svært stor gjeld eller høy rente kan tapet av fradragsverdi dominere.<\/p><p><b>Felle:<\/b> «lavere skattesats er alltid dårlig for låntakere».<\/p>",
"kilder": [
"F3 lb 6"
],
"eksamen": []
}
]
},
{
"id": "f3-eiendomscase",
"forelesning": "F3 Investeringscaser",
"tittel": "Eiendomscaset: nåverdi, EK-rentabilitet og sensitivitet",
"eksamensvekt": 2,
"viktigst": [
"NV = −EK + Σ kontantstrøm/1,03ⁱ + (salg − skatt − lån)/1,03³; EK-rentabilitet = NV/EK",
"Hele, EK: 8,3 %. Ett rom, EK: 12 %. Ett rom gearet: 70 % (3,5 %) og 45 % (6 %)",
"Uten prisstigning: −21,2 % gearet og −4,5 % med EK; break-even krever +4,2 %",
"Skattefrie strømmer skal diskonteres med rente før skatt (4,4 %): 7,6 %"
],
"punkter": [
{
"id": "f3-eiendomscase-01",
"nivaa": "kjerne",
"kan": "Kjenne forutsetningene i eiendomscaset",
"kort": "Leilighet i Sandviken: 6 100 000 inkl. omkostninger, leie 174 000 per år (2 soverom, 14 500 i måneden), salg etter tre år med 18 % prisstigning (7 198 000) og diskonteringsrente 3 % etter skatt.",
"mer": "<p>Diskonteringsrenten: uvektet avkastning i eiendomsfond siste 10 år 4,35 %, etter skatt 4,35 % × 0,78 ≈ 3 % (eksakt 3,39 %; forelesningen runder ned). Prisstigning: Bergen 18–20 % på tre år og forelesningen bruker konservativt 18 %. Lysbildet stiller to spørsmål: hvilken diskonteringsrente og hvilken verdistigning skal vi bruke?<\/p><p><b>Felle:<\/b> å bruke 20 % eller å glemme at omkostningene er med i kjøpesummen.<\/p>",
"kilder": [
"F3 lb 8",
"F3 lb 10",
"F3 lb 12",
"F3 lb 14"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-02",
"nivaa": "kjerne",
"kan": "Regne NV og EK-rentabilitet for «leie ut hele, EK-finansiert»",
"kort": "NV = −6 100 000 + Σ 85 650/1,03ⁱ − 241 560/1,03³ + 7 198 000/1,03³ ≈ 508 400. EK-rentabilitet = 508 400/6 100 000 = 8,3 %.",
"mer": "<p>Gevinst 7 198 000 − 6 100 000 = 1 098 000, skatt 22 % = 241 560. Annuitetsfaktor 3 % i tre år: 2,8286; 1,03<sup>3<\/sup> = 1,092727. Lysbildet bruker 241 000 i formelen og får 508 911; prosenten blir 8,3 % uansett.<\/p><p><b>Felle:<\/b> å glemme gevinstskatten. Da blir NV ca. 729 500 og 12,0 %, som ligner tallet for ett rom.<\/p>",
"kilder": [
"F3 lb 20",
"F3 lb 21",
"F3 lb 22"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-03",
"nivaa": "kjerne",
"kan": "Regne NV og EK-rentabilitet for «bo selv og leie ut ett rom, EK-finansiert»",
"kort": "Leien halveres til 87 000 og er skattefri og salget er skattefritt. NV = −6 100 000 + Σ 87 000/1,03ⁱ + 7 198 000/1,03³ ≈ 733 300, dvs. ca. 12 %.",
"mer": "<p>87 000 · 2,8286 = 246 089 og 7 198 000/1,092727 = 6 587 190. Lysbildet oppgir 734 969 (et lite avrundingsavvik) og 12 %. Ett rom gir høyere avkastning enn hele fordi skatten på leie og gevinst faller bort.<\/p><p><b>Felle:<\/b> å trekke 22 % skatt av leien for ett rom.<\/p>",
"kilder": [
"F3 lb 24",
"F3 lb 25",
"F3 lb 26"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-04",
"nivaa": "kjerne",
"kan": "Regne NV for gearing med ett rom utleid",
"kort": "EK 1,1 mill. og lån 5 mill. avdragsfritt til 3,5 % (136 500 i renter etter skatt) gir årlig strøm 87 000 − 136 500 = −49 500 og NV ≈ 771 500, ca. 70 % av EK. Med 6 % rente blir strømmen −147 000, NV 495 675 og avkastningen 45 %.",
"mer": "<p>NV = −1 100 000 − Σ 49 500/1,03<sup>i<\/sup> + 7 198 000/1,03<sup>3<\/sup> − 5 000 000/1,03<sup>3<\/sup>. Lysbildet oppgir 780 751 for 3,5 %, men utregnet blir det 771 465 (70,1 %). Tallet for 6 % (495 675) stemmer eksakt. Diskonteringsrenten er fortsatt 3 %.<\/p><p><b>Felle:<\/b> å glemme å trekke fra tilbakebetalingen av lånet i år 3.<\/p>",
"kilder": [
"F3 lb 27",
"F3 lb 28",
"F3 lb 29",
"F3 lb 30"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-05",
"nivaa": "kjerne",
"kan": "Regne break-even salgspris med gearing",
"kort": "0 = −1,1 mill. − Σ 49 500/1,03ⁱ + S/1,03³ − 5 mill./1,03³ gir S ≈ 6 355 000. Prisen må stige ca. 4,2 % på tre år (3,5 % rente).",
"mer": "<p>S = 5 000 000 + 1,092727 · (1 100 000 + 140 016) = 6 354 999. Salgsprisen er den mest kritiske faktoren. Med 6 % rente må prisen stige mye mer: S = 5 000 000 + 1,092727 · (1 100 000 + 415 806) ≈ 6 656 000, ca. 9,1 % (eget regnestykke).<\/p><p><b>Felle:<\/b> å glemme lånet i ligningen eller å diskontere med lånerenten i stedet for 3 %.<\/p>",
"kilder": [
"F3 lb 34",
"F3 lb 35"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-06",
"nivaa": "kjerne",
"kan": "Forklare hvorfor skattefrie kontantstrømmer skal diskonteres med rente før skatt",
"kort": "Er kontantstrømmen skattefri, skal den diskonteres med rente før skatt (4,35 % ≈ 4,4 %), ikke etter skatt (3 %). Ett rom, EK, gir da NV 465 337 og ca. 7,6 %.",
"mer": "<p>Appendikset retter forelesningens egen feil: investeringsbeløp og inntekter var uten skatt, men ble diskontert med en etter-skatt-rente. Riktig rente senker avkastningen. Lysbildene sier 7,5 % (lb 64) og 7,6 % (lb 66); eksakt 7,63 %. Lb 64 sammenligner med 8,3 %, men samme case med 3 % ga 12 %.<\/p><p><b>Felle:<\/b> å diskontere skattefrie strømmer med etter-skatt-rente, som overvurderer nåverdien.<\/p>",
"kilder": [
"F3 lb 61",
"F3 lb 62",
"F3 lb 63",
"F3 lb 64"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-07",
"nivaa": "viktig",
"kan": "Ta hensyn til alternativkostnaden ved å leie ut hele leiligheten",
"kort": "Leier du ut hele, må du bo et annet sted. Settes kostnaden lik leien for ett rom (87 000), blir årlig strøm 85 650 − 87 000 = −1 350 og EK-rentabiliteten ca. 4,3 %.",
"mer": "<p>NV ≈ 262 300 (lysbildet: 262 862). Det er enda mindre attraktivt enn å leie ut ett rom, som ga ca. 7,6 % med riktig diskonteringsrente. Sammenligningen må ha samme boutgift i begge alternativer: den som leier ut ett rom, bor gratis i resten av leiligheten.<\/p><p><b>Felle:<\/b> å sammenligne strategiene uten å ta med boutgiften i den ene.<\/p>",
"kilder": [
"F3 lb 65",
"F3 lb 66"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-08",
"nivaa": "viktig",
"kan": "Regne gearing med utleie av hele leiligheten (regnearket)",
"kort": "Regnearket «Investeringscase gjeld»: EK 1,1 mill., lån 5 mill. til 3,5 %, leie etter skatt 85 650. Årlig strøm 85 650 − 136 500 = −50 850, gevinstskatt 241 560. NV ≈ 546 600, ca. 50 % av EK.",
"mer": "<p>NV = 6 587 190 − 4 575 708 − 221 062 (diskontert gevinstskatt) − 143 823 (strømmene) − 1 100 000 = 546 597. Regnearket skriver tredje års strøm som 46 523; riktig er 50 850/1,092727 = 46 535 (12 kr avvik). Hele leiligheten gearet (ca. 50 %) er dårligere enn ett rom gearet (ca. 70 %).<\/p><p><b>Felle:<\/b> å bruke 87 000 (skattefri leie) når hele leiligheten leies ut.<\/p>",
"kilder": [
"Regneark Investeringscase gjeld"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-09",
"nivaa": "detalj",
"kan": "Kjenne avkastningen i eiendomsfond (2026-tall)",
"kort": "Siste 3 år per år: ODIN Eiendom +4,1 % og FIRST Nordic Real Estate +8,1 % (noterte), Storebrand Eiendomsfond Norge KS +3,5 % (unotert). Noterte fond falt ca. 16–17 % siste år.",
"mer": "<p>Noterte fond: 1 år −16,7 % (ODIN) og −16,4 % (FIRST), 5 år −11,5 % og −7,2 % per år. Unoterte: Storebrand og DNB Eiendomsfond Core Plus +9,8 % siste år. Unoterte fond verdsettes kvartalsvis. Historisk avkastning er ingen garanti.<\/p><p><b>Felle:<\/b> å bruke disse fondstallene som diskonteringsrente; caset bruker 4,35 % uvektet over 10 år.<\/p>",
"kilder": [
"F3 lb 11",
"F3 lb 12"
],
"eksamen": []
},
{
"id": "f3-eiendomscase-10",
"nivaa": "detalj",
"kan": "Vite hva forelesningen sier om rente og boligpriser",
"kort": "Figuren med boligpriser mot 3 mnd NIBOR («Ukorrelert») antyder at renteøkninger betyr lite for boligprisene, men forelesningen spør «Tror vi på det?».",
"mer": "<p>Konklusjonen i caset: tallene viser hvorfor boligmarkedet er dempet. Det er nedside i boligprisene i Oslo og kanskje på sikt i andre byer og renten har større sjanse for å gå opp enn ned; dagens lånerente er rundt 5 %. Bergenhus: 80 816 kr/m² (2. kv. 2026) og +10,7 % i 2024.<\/p><p><b>Felle:<\/b> å lese figuren som bevis på at renten ikke påvirker boligprisene.<\/p>",
"kilder": [
"F3 lb 13",
"F3 lb 14",
"F3 lb 35"
],
"eksamen": []
}
]
},
{
"id": "f3-aksjer-obl",
"forelesning": "F3 Investeringscaser",
"tittel": "Aksjer, ASK og høyrenteobligasjoner",
"eksamensvekt": 2,
"viktigst": [
"Standardteori: invester passivt i markedsporteføljen (indeksfond)",
"Forbrukerrådet: aktive globale fond −1,1 pp per år mot indeks; aktive norske fond +0,86 % per år",
"ASK: kjøp og salg innenfor kontoen er skattefritt, skatt først ved uttak av gevinst",
"High yield: 10–20 % rente, men 0,51 % annualisert avkastning 2005–2011"
],
"punkter": [
{
"id": "f3-aksjer-obl-01",
"nivaa": "kjerne",
"kan": "Forklare anbefalingen om passiv indeksinvestering",
"kort": "Standard finansteori (Merton 1969, Tobin 1958) sier at vi bør investere passivt i markedsporteføljen (indeksfond). De fleste nordmenn investerer i enkeltaksjer eller aktive fond og småinvestorer diversifiserer for lite (French og Poterba 1991).",
"mer": "<p>Forvaltere av aktive fond fremhever at enkeltaksjer (f.eks. NVIDIA) utgjør en stor del av indeksen, slik at indeksfond blir risikable. De unnlater å si at aktive fond har enda større risiko (færre aksjer) og høyere forvaltningshonorar.<\/p>",
"kilder": [
"F3 lb 55"
],
"eksamen": []
},
{
"id": "f3-aksjer-obl-02",
"nivaa": "kjerne",
"kan": "Kjenne Forbrukerrådets funn om aktiv og passiv forvaltning",
"kort": "Over 20 år ga aktive globale fond i snitt ca. 1,1 pp lavere årlig avkastning enn indeksfond. Aktive norske fond slo referanseindeksen med 0,86 % per år over 20 år (0,81 % over 15 år, 1,13 % over 25 år).",
"mer": "<p>Forelesningen spør om norske forvaltere kjenner enkeltaksjene bedre enn indeksen; rapporten tyder på det. <b>H2025 o16:<\/b> riktig er at aktive fond gjør det svakere på globale, nordiske og europeiske aksjer, men bedre på norske (1998–2018).<\/p><p><b>Felle:<\/b> «aktive fond presterer dårligere i alle kategorier» eller det speilvendte alternativet.<\/p>",
"kilder": [
"F3 lb 56"
],
"eksamen": [
"H2025 o16"
]
},
{
"id": "f3-aksjer-obl-03",
"nivaa": "kjerne",
"kan": "Forklare fordelene med aksjesparekonto (ASK)",
"kort": "Kjøp og salg av aksjer og aksjefond innenfor ASK er skattefritt; skatten betales først når gevinsten tas ut (skattekreditt). Innskutt beløp kan tas ut skattefritt.",
"mer": "<p>Ubenyttet skjerming forsvinner ikke, men akkumuleres og fremføres på kontonivå, ikke per aksje. Kjøp og salg inne i kontoen endrer ikke skjermingsgrunnlaget. ASK gir en gratis opsjon: skattesatsene kan endres og du velger selv tidspunktet for realisasjon. Rådet: er du privatperson og skal investere i aksjer, bruk ASK.<\/p><p><b>Felle:<\/b> «uttak av innskutt beløp utløser skatt» eller «skjerming beregnes per aksje i ASK».<\/p>",
"kilder": [
"F3 lb 58"
],
"eksamen": []
},
{
"id": "f3-aksjer-obl-04",
"nivaa": "viktig",
"kan": "Nevne grunner til at vi investerer feil",
"kort": "Overdreven tiltro til egne evner, manglende forståelse av diversifisering, negativ påvirkning fra sosiale nettverk (influensere), pågående meglere og preferanser for gambling.",
"mer": "<p>Listen kobler til finansiell psykologi i Næss-delen. Konsekvensen er for lite diversifiserte porteføljer og for høye kostnader. Forelesningen bruker listen til å forklare hvorfor nordmenn holder enkeltaksjer og aktive fond selv om teorien anbefaler indeksfond.<\/p><p><b>Felle:<\/b> å tro at listen på lysbildet nevner tapsaversjon; den gjør ikke det.<\/p>",
"kilder": [
"F3 lb 57"
],
"eksamen": []
},
{
"id": "f3-aksjer-obl-05",
"nivaa": "viktig",
"kan": "Forklare hva det koster å være ute av markedet de beste dagene",
"kort": "Oslo Børs hovedindeks fra 2010: årlig gjennomsnittsavkastning 9,6 %, men bare 3,8 % hvis man var ute av markedet de 20 beste dagene.",
"mer": "<p>Flere av de beste dagene kom i mars 2020, midt i koronakrakket (f.eks. 24. mars 2020 med 5,6 %). Det er derfor vanskelig å tjene på å gå inn og ut av markedet. Tallene støtter passiv og langsiktig investering.<\/p><p><b>Felle:<\/b> å tro at man kan unngå de dårlige dagene uten å miste de gode.<\/p>",
"kilder": [
"F3 lb 54"
],
"eksamen": []
},
{
"id": "f3-aksjer-obl-06",
"nivaa": "viktig",
"kan": "Kjenne kjennetegnene ved high yield-obligasjoner",
"kort": "Obligasjoner utstedt av bedrifter med høy risiko, derfor høy rente (10–20 %). Renten skattlegges med 22 %. En NHH-masteroppgave fant bare 0,51 % annualisert avkastning 2005–2011.",
"mer": "<p>Avkastningen varierer mellom bransjer. Når det går dårlig, konverteres obligasjonene noen ganger til aksjer. High yield-obligasjoner er risikable og knyttet til enkeltbedrifter, i motsetning til statsobligasjonene Jordà regner som sikre. Lysbildet presenterer high yield som et alternativ til aksjer og aksjefond.<\/p><p><b>Felle:<\/b> å bruke kupongrenten (10–20 %) som forventet avkastning.<\/p>",
"kilder": [
"F3 lb 59",
"F2 lb 14"
],
"eksamen": []
},
{
"id": "f3-aksjer-obl-07",
"nivaa": "viktig",
"kan": "Forklare hva konvertering av obligasjoner til aksjer betyr for obligasjonseieren",
"kort": "Når selskapet ikke kan betjene gjelden, konverteres obligasjonene til aksjer som del av en restrukturering. Obligasjonseierne mister hovedstol og renteinntekter, men kan håpe på kursstigning og senere utbytte (DOF Subsea).",
"mer": "<p>Obligasjonseieren går fra å være kreditor med prioritet foran aksjonærene til å bli aksjonær selv, med full eksponering mot selskapets risiko. I DOF Subsea måtte obligasjonseierne konvertere som del av restruktureringen av selskapets gjeld.<\/p><p><b>Felle:<\/b> å tro at obligasjonseieren beholder kravet på hovedstolen etter konverteringen.<\/p>",
"kilder": [
"F3 lb 60"
],
"eksamen": []
}
]
},
{
"id": "f3-crowd-graa",
"forelesning": "F3 Investeringscaser",
"tittel": "Folkefinansiering, gråmarkedslån og verdien av tapsfradrag",
"eksamensvekt": 1,
"viktigst": [
"Crowdlending: renter skattlegges (tredjepartsrapportert), tap gir fradrag",
"Belønningsbasert crowdfunding og gråmarkedslån: tap gir ikke fradrag",
"Med fradrag: E(r) = (pR(1 − t) − (1 − p)K(1 − t))/K; uten fradrag mister tapsleddet (1 − t)",
"Eksempel: 6,2 % med fradrag mot 4 % uten; break-even-rente ca. 32 % ved 80 % suksess"
],
"punkter": [
{
"id": "f3-crowd-graa-01",
"nivaa": "kjerne",
"kan": "Kjenne skattereglene for crowdlending (lånebasert folkefinansiering)",
"kort": "Långiveren skattlegges for mottatt renteinntekt (22 %) og plattformene tredjepartsrapporterer til Skatteetaten. Taper du pengene, får du fradrag for tapet.",
"mer": "<p>Crowdlending: personer, organisasjoner eller selskap henter kapital fra mange långivere via en digital plattform (Kameo, Oblinor, Monio, Kredd). Kameo reklamerer med forventet årlig avkastning 8–15 %. Aksjer kjøpt via plattform: utbytte, gevinst og formuesverdi skal i skattemeldingen.<\/p><p><b>Felle:<\/b> å blande med gråmarkedslån, der tap ikke gir fradrag.<\/p>",
"kilder": [
"F3 lb 37",
"F3 lb 38",
"F3 lb 43"
],
"eksamen": []
},
{
"id": "f3-crowd-graa-02",
"nivaa": "kjerne",
"kan": "Forklare risikoen og insentivproblemet i crowdlending",
"kort": "Plattformen tar betalt gjennom gebyrer, men bærer ikke tapet av hovedstolen. Den har derfor svake insentiver til riktig risikovurdering og du kjenner ikke låntakernes kreditthistorikk.",
"mer": "<p>Du må stole på plattformens vurdering. Forelesningen viser oppslag om økende mislighold og at over 16 % av pengene Monio hadde lånt ut gikk til selskaper kontrollert av én mann (160 mill. kr til én utviklers prosjekter).<\/p><p><b>Felle:<\/b> «plattformen har sterke insentiver fordi den taper når lånene misligholdes».<\/p>",
"kilder": [
"F3 lb 39",
"F3 lb 40",
"F3 lb 41"
],
"eksamen": []
},
{
"id": "f3-crowd-graa-03",
"nivaa": "kjerne",
"kan": "Kjenne skattereglene og risikoen for gråmarkedslån",
"kort": "Lån direkte mellom låntaker og långiver (eller via mellommann), der renteinntekten skattlegges med 22 % og må selvrapporteres. Tap på private lån kan ikke trekkes fra i alminnelig inntekt, mens gevinst skattlegges.",
"mer": "<p>Lånene har typisk 2. eller 3. prioritet og det kan være mange med 2. prioritet uten at du vet det. Asymmetrisk informasjon og manglende tapsfradrag forklarer de høye rentene. Eksempel: Berent Friele lånte 6,5 mill. i gråmarkedet til 46 % årlig rente og boligen ble tvangssolgt.<\/p><p><b>Felle:<\/b> å tro at de høye rentene bare er grådighet; de kompenserer for risiko og skatteasymmetri.<\/p>",
"kilder": [
"F3 lb 45",
"F3 lb 46",
"F3 lb 47"
],
"eksamen": []
},
{
"id": "f3-crowd-graa-04",
"nivaa": "kjerne",
"kan": "Regne forventet avkastning med fullt tapsfradrag",
"kort": "E(r) = (pR(1 − t) − (1 − p)K(1 − t))/K. K = 1 mill., R = 200 000 (20 %), p = 90 %, t = 22 %: (140 400 − 78 000)/1 000 000 = 6,24 % ≈ 6,2 %.",
"mer": "<p>Investoren er risikonøytral. p er sannsynligheten for suksess (renten mottas og hovedstolen kommer tilbake), 1 − p sannsynligheten for å tape hele K. Med fradrag blir tapet etter skatt K(1 − t), fordi staten bærer 22 % av tapet.<\/p><p><b>Felle:<\/b> å glemme skatten på renten, eller å svare 20 % (renten før risiko og skatt).<\/p>",
"kilder": [
"F3 lb 49",
"F3 lb 50"
],
"eksamen": []
},
{
"id": "f3-crowd-graa-05",
"nivaa": "kjerne",
"kan": "Regne forventet avkastning uten tapsfradrag",
"kort": "E(r) = (pR(1 − t) − (1 − p)K)/K = (140 400 − 100 000)/1 000 000 = 4,04 % ≈ 4 %. Tapsfradrag gir ca. 55 % høyere avkastning (4 % × 1,55 ≈ 6,2 %).",
"mer": "<p>Uten fradrag bærer långiveren hele tapet, mens gevinsten fortsatt skattlegges. Forskjellen ser liten ut i forventning, men forelesningen poengterer at det er risikoen som avgjør.<\/p><p><b>Felle:<\/b> å trekke skatt av tapet også når det ikke er fradragsrett (gir 6,24 %).<\/p>",
"kilder": [
"F3 lb 51"
],
"eksamen": []
},
{
"id": "f3-crowd-graa-06",
"nivaa": "kjerne",
"kan": "Regne break-even-renten uten tapsfradrag",
"kort": "Null forventet avkastning: pR(1 − t) = (1 − p)K, dvs. R = (1 − p)K/(p(1 − t)). Med p = 80 %: R = 200 000/0,624 ≈ 320 500, ca. 32 %.",
"mer": "<p>Med 80 % suksess og 20 % rente: (0,8 · 200 000 · 0,78 − 0,2 · 1 000 000)/1 000 000 = −7,5 %. Med 40 % rente: (0,8 · 400 000 · 0,78 − 200 000)/1 000 000 = 4,96 % ≈ 5 %, halvparten av det man kunne fått i et indeksfond. «Dette er renten Hanevik lånte ut penger til Friele!»<\/p><p><b>Felle:<\/b> å glemme skatten i nevneren (gir 25 %).<\/p>",
"kilder": [
"F3 lb 52"
],
"eksamen": []
},
{
"id": "f3-crowd-graa-07",
"nivaa": "viktig",
"kan": "Kjenne skattereglene for belønningsbasert crowdfunding",
"kort": "Du donerer et beløp mot en gjenytelse (f.eks. rabatt). Går prosjektet dårlig, har du ikke krav på fradrag for tapet, så det blir svært dyrt å investere (krever høy avkastning).",
"mer": "<p>Gjenytelsen avhenger ofte av hvor mye du donerer. Eksempler: Spleis, Bidra, Kickstarter og IndieGoGo. Manglende tapsfradrag gir samme asymmetri som i gråmarkedet. Regnestykket uten tapsfradrag viser hvor høy avkastningen må være før en slik investering lønner seg.<\/p><p><b>Felle:<\/b> å tro at belønningsbasert crowdfunding gir tapsfradrag som crowdlending.<\/p>",
"kilder": [
"F3 lb 42"
],
"eksamen": []
},
{
"id": "f3-crowd-graa-08",
"nivaa": "detalj",
"kan": "Kjenne Friele og Hanevik-saken",
"kort": "Kaffearvingen Berent Friele tok opp gråmarkedslån på flere titall millioner, blant annet 6,5 mill. til 46 % rente. Långiveren Bjørn Hanevik saksøkte advokatfirmaet sitt for dårlige råd og fikk tilbake 7,4 mill.; politiet henla bedragerisaken.",
"mer": "<p>Eksempelet viser gråmarkedets risiko: mange kreditorer med lav prioritet, ukjent kredittverdighet og ingen fradrag for tap. Boligen i Bergen ble tvangssolgt og en bankforbindelse sendte et krav på 16 mill. til inkasso.<\/p><p><b>Felle:<\/b> å tro at en høy avtalt rente betyr høy forventet avkastning; med høy tapssannsynlighet og uten fradrag kan den være lav.<\/p>",
"kilder": [
"F3 lb 47",
"F3 lb 48"
],
"eksamen": []
}
]
},
{
"id": "f4-aksjonaermodellen",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "Aksjonærmodellen, oppjusteringsfaktor og eierskatt",
"eksamensvekt": 5,
"viktigst": [
"Personlig aksjonær: utbytte og gevinst ut over skjerming skattlegges, tap gir fradrag",
"Skattepliktig beløp × 1,72 × 22 % = skattepliktig beløp × 37,84 %",
"Trekk fra skjerming først, oppjuster deretter",
"Bruk alltid faktoren og satsen som står i oppgaven"
],
"punkter": [
{
"id": "f4-aksjonaermodellen-01",
"nivaa": "kjerne",
"kan": "Vite hva aksjonærmodellen innebærer",
"kort": "Gjelder personlige aksjonærer: utbytte og aksjegevinst ut over skjermingsfradraget er skattepliktig (oppjustert alminnelig inntekt), mens tap er fradragsberettiget. Utbytte til person kalles eierinntekt.",
"mer": "<p><b>H2019 o1b:<\/b> riktig er (a) «utbytte og gevinster etter fratrekk for et skjermingsfradrag er skattepliktig som alminnelig inntekt». Gale: «utbytte skattes i sin helhet ved eierskatten» (glemmer skjerming), «kun norske aksjonærer skal betale eierskatt», «utbytte ikke er skattepliktig etter fratrekk fra skjermingsgrunnlaget». Alternativet «utbytte skal oppjusteres og skattlegges ved eierskatten» ble ikke regnet som riktig, fordi det mangler skjermingen.<\/p><p><b>Felle:<\/b> å tro at aksjonærmodellen gjelder selskaper. Selskaper går under fritaksmetoden.<\/p>",
"kilder": [
"F4 lb 29",
"F4 lb 30",
"BS3 s. 43"
],
"eksamen": [
"H2019 o1b"
]
},
{
"id": "f4-aksjonaermodellen-02",
"nivaa": "kjerne",
"kan": "Regne effektiv eierskattesats med oppjusteringsfaktoren",
"kort": "Eierskatt = 22 % × 1,72 = 37,84 %. Skattepliktig utbytte eller gevinst ganges med 1,72 og så med 22 %, eller direkte med 37,84 %.",
"mer": "<p><b>Eksempel:<\/b> skattepliktig utbytte 100: 100 × 1,72 = 172; 172 × 22 % = 37,84 kr.<\/p><p>Eksamenssettene har brukt andre tall: 1,44 og 22 % (H2018, H2019: 31,68 %), 1,4 og 22 % (H2020), 1,6 og 25 % (H2022: 40 %), 1,3 og 23 % (H2017), 1,33 og 20 %, 2 og 20 % (H2023 o4: 40 %). Bruk alltid tallene i oppgaven.<\/p><p><b>Felle:<\/b> å bruke bare 22 % (H2025 o10 hadde 11 kr = 50 × 22 % som alternativ) eller å gange 37,84 % med 1,72 en gang til.<\/p>",
"kilder": [
"F4 lb 20",
"F4 lb 30",
"F4 lb 35"
],
"eksamen": [
"H2025 o10",
"H2024 o2",
"H2023 o1d",
"H2019 o3b",
"H2018 o2b"
]
},
{
"id": "f4-aksjonaermodellen-03",
"nivaa": "kjerne",
"kan": "Vite rekkefølgen: skjerming trekkes fra før oppjustering",
"kort": "Skatt = (utbytte − skjerming) × oppjusteringsfaktor × nominell eierskatt. H2022: (117 000 − 25 000) × 1,6 = 147 200; 147 200 × 25 % = 36 800.",
"mer": "<p>Skjermingsfradraget trekkes fra det utbetalte utbyttet. Først deretter oppjusteres det skattepliktige beløpet.<\/p><p><b>Felle:<\/b> å oppjustere hele utbyttet og så trekke fra skjermingen: (117 000 × 1,6 − 25 000) × 25 % = 40 550. Eller å gange skjermingen med 1,6 og trekke den fra etterpå.<\/p><p>Samme oppgave står i Oppgaver F5 o1 med fasit.<\/p>",
"kilder": [
"F4 lb 31",
"Oppgaver F5 o1"
],
"eksamen": [
"H2022 o1.3"
]
},
{
"id": "f4-aksjonaermodellen-04",
"nivaa": "kjerne",
"kan": "Regne eierskatten når hele overskuddet etter selskapsskatt deles ut",
"kort": "Utbytte = overskudd × (1 − selskapsskatt) og eierskatt = (utbytte − skjerming) × y × t<sub>e<\/sub>.",
"mer": "<p><b>H2020 o1c:<\/b> 100 000 × 0,78 = 78 000; oppjustert skattepliktig utbytte 78 000 × 1,4 = 109 200 (fasiten skriver «100 000*0,22», en skrivefeil for 0,78).<\/p><p><b>H2018 o2:<\/b> (100 − 50) × 0,78 = 39 mill. kan deles ut; etter eierskatt 39 − 39 × 1,44 × 22 % = 26,64 mill. <b>H2017 o2b:<\/b> (10 000 − 2 400) × 1,3 = 9 880; 9 880 × 23 % = 2 272.<\/p><p><b>Felle:<\/b> 17 710 = 77 000 × 23 % (feil sats, ingen oppjustering). Les nøye om det spørres om skattepliktig utbytte, oppjustert grunnlag, skatt eller beløp etter skatt.<\/p>",
"kilder": [
"F4 lb 64",
"Oppgaver F5 o1"
],
"eksamen": [
"H2020 o1c",
"H2018 o2a",
"H2018 o2b",
"H2022 o1.3",
"H2017 o2b"
]
},
{
"id": "f4-aksjonaermodellen-05",
"nivaa": "kjerne",
"kan": "Forklare hvorfor vi har en oppjusteringsfaktor",
"kort": "Den skal gjøre det like lønnsomt på marginen å tjene penger i bedriften som å være lønnsmottaker, så det ikke lønner seg å omdanne høyt beskattet lønn til utbytte (inntektsskifting). Faktoren bestemmes av inntektsskiftningsligningen.",
"mer": "<p>Uten oppjustering ville utbytte bare møtt 22 % + 22 % = 44 % i nominelle satser, mot 47,4 % + 12,4 % = 59,8 % på lønn med arbeidsgiveravgift. Da ville eiere tatt utbytte i stedet for lønn, slik de gjorde under delingsmodellen.<\/p><p>Med y = 1,72 blir begge sider 59,8 % (se F5).<\/p><p><b>Felle:<\/b> å tro at faktoren skal kompensere for inflasjon eller for skjermingen.<\/p>",
"kilder": [
"F4 lb 20",
"F4 lb 49",
"F5 lb 3"
],
"eksamen": [
"H2017 o2a",
"H2020 o1e",
"H2023 o2a"
]
},
{
"id": "f4-aksjonaermodellen-06",
"nivaa": "viktig",
"kan": "Vite at utbytte, gevinst og tap har samme sats",
"kort": "Utbytte og gevinst ut over skjerming skattlegges med 37,84 % og tap gir fradrag med samme sats. Likevel behandles tap og gevinst ulikt, fordi ubenyttet skjerming går tapt ved realisasjon.",
"mer": "<p>BS3 s. 44: gevinst over kostpris pluss akkumulert skjerming skattlegges med sats a; tap i forhold til inngangsverdien kan trekkes fra med samme sats; ubenyttet skjerming ved realisasjon går tapt. Denne asymmetrien gjør aksjonærmodellen ikke-nøytral.<\/p><p>Gammel lb 41: aksjonærmodellen skal i teorien gjøre staten til en passiv medinvestor som bærer sin del av risikoen, men tapsfradrag framføres i stedet for å refunderes med en gang.<\/p><p><b>Felle:<\/b> å tro at gevinst har lavere sats enn utbytte. Begge er 37,84 %.<\/p>",
"kilder": [
"F4 lb 30",
"F4 lb 35",
"F4 gammel lb 41",
"BS3 s. 44"
],
"eksamen": []
},
{
"id": "f4-aksjonaermodellen-07",
"nivaa": "viktig",
"kan": "Vite hvordan aksjonærlån skattlegges",
"kort": "Siden endringen i aksjeloven i 2015 skattlegges alle lån fra AS til personlige aksjonærer som utbytte. Unntak: lån under 100 000 kr som betales tilbake innen 60 dager (for eksempel reiseutgifter).",
"mer": "<p>Motivet for aksjonærlån var å unngå eierskatten på 37,84 %: et lån til lav rente gir renteinntekter i selskapet som bare skattlegges med 22 %. Etter 2015 lønner det seg ikke med aksjonærlån.<\/p><p><b>Felle:<\/b> å tro at lånet bare skattlegges som renteinntekt (22 %), eller at unntaket gjelder alle lån under 100 000 kr uansett nedbetalingstid.<\/p>",
"kilder": [
"F4 lb 57",
"F5 lb 13"
],
"eksamen": []
}
]
},
{
"id": "f4-skjerming",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "Skjerming per aksjepost",
"eksamensvekt": 5,
"viktigst": [
"Skjermingsfradrag = skjermingsgrunnlag × skjermingsrente, regnet for hver aksje for seg",
"Grunnlag = kostpris + akkumulert ubenyttet skjerming, aldri markedsverdi",
"Ubenyttet skjerming brukes to ganger: den øker grunnlaget og trekkes fra i tillegg",
"Skattepliktig utbytte er aldri negativt; det som ikke brukes, framføres",
"Eier per 31.12 får hele årets skjerming; selges aksjen før 31.12, ingen skjerming det året"
],
"punkter": [
{
"id": "f4-skjerming-01",
"nivaa": "kjerne",
"kan": "Regne skjermingsfradraget for en aksjepost",
"kort": "Skjermingsfradrag = skjermingsgrunnlag × skjermingsrente, der grunnlaget første år er kostprisen. Kostpris 10 000 og rente 2 % gir 200.",
"mer": "<p>F4 lb 31: «Skattbar eierinntekt = utbetalt utbytte − skjermingsfradrag» og «Skjermingsgrunnlaget er aksjens kostpris (det du kjøpte aksjen for)». Lb 32: en aksje kjøpt for 100 med skjermingsrente 3,6 % kan motta 3,60 kr skattefritt.<\/p><p><b>H2022 o1.2:<\/b> 500 000 × 5 % = 25 000 kan tas ut uten eierskatt. <b>H2023 o1a:<\/b> 2 000 × 3 % = 60.<\/p><p><b>Felle:<\/b> å bruke utbyttet, aksjekursen eller salgsprisen som grunnlag. H2024 o1a hadde 100, 300 og 50 som gale alternativer.<\/p>",
"kilder": [
"F4 lb 31",
"F4 lb 32",
"BS3 s. 45"
],
"eksamen": [
"H2024 o1a",
"H2022 o1.2",
"H2023 o1a"
]
},
{
"id": "f4-skjerming-02",
"nivaa": "kjerne",
"kan": "Regne skattepliktig utbytte når utbyttet er større enn skjermingen",
"kort": "Skattepliktig utbytte = utbytte − årets skjermingsfradrag − framført ubenyttet skjerming. Utbytte 500, skjerming 200: 300.",
"mer": "<p><b>H2023 o1a:<\/b> 100 − 60 = 40 (gale: 41, 60, 100). <b>H2021 o1a<\/b> år 1: 50 − 20 = 30. <b>Sindre/Martine<\/b> 2018: 3 − 2 = 1; 2019: 5 − 3 = 2.<\/p><p>Skatten blir så skattepliktig beløp × 37,84 %, for eksempel 300 × 37,84 % = 113,52.<\/p><p><b>Felle:<\/b> spørsmålene skifter mellom skjermingsfradrag, skattepliktig utbytte, oppjustert grunnlag og skatt. Les hva som spørres om. H2024 o1b hadde 200 (skjermingen) og 400 som gale alternativer.<\/p>",
"kilder": [
"F4 lb 31",
"F4 lb 76",
"Oppgaver F5 o2"
],
"eksamen": [
"H2024 o1b",
"H2023 o1a",
"H2021 o1a"
]
},
{
"id": "f4-skjerming-03",
"nivaa": "kjerne",
"kan": "Behandle et år der utbyttet er mindre enn skjermingen",
"kort": "Skattepliktig utbytte blir 0, aldri negativt; differansen er ubenyttet skjerming som framføres. Utbytte 100 og skjerming 200 gir 0 skattepliktig og 100 ubenyttet.",
"mer": "<p>Ubenyttet skjerming kan ikke trekkes fra annen inntekt. Den framføres og slås sammen med neste års skjerming på samme aksje.<\/p><p>Et år helt uten utbytte gir at hele årets skjerming blir ubenyttet: H2025 o4 (100 × 3,5 % = 3,50), H2022 o1.6 (500 000 × 10 % = 50 000).<\/p><p><b>H2024 o1c:<\/b> riktig 0; gale alternativer 100, 200 og 300.<\/p><p><b>Felle:<\/b> å svare −100 (negativt skattepliktig utbytte) eller 100 (den ubenyttede skjermingen).<\/p>",
"kilder": [
"F4 lb 33",
"F4 lb 76"
],
"eksamen": [
"H2024 o1c",
"H2021 o1a",
"H2025 o4"
]
},
{
"id": "f4-skjerming-04",
"nivaa": "kjerne",
"kan": "Regne skjermingen året etter et år med ubenyttet skjerming",
"kort": "Nytt grunnlag = kostpris + ubenyttet skjerming; samlet fradrag = nytt grunnlag × årets rente + ubenyttet skjerming. H2024: (10 000 + 100) × 2 % = 202; 202 + 100 = 302; 400 − 302 = 98.",
"mer": "<p>Ubenyttet skjerming brukes <b>to ganger<\/b>: den løfter grunnlaget og trekkes i tillegg fra utbyttet.<\/p><p><b>H2021 o1b:<\/b> 1 010 × 2 % = 20,2; + 10 = 30,2; 40 − 30,2 = 9,8. <b>H2025 o4:<\/b> 103,50 × 4 % = 4,14; 20 − 3,50 − 4,14 = 12,36.<\/p><p><b>Feller:<\/b> (1) ikke legge den ubenyttede til grunnlaget: 400 − 200 − 100 = 100. (2) legge den til grunnlaget, men ikke trekke den fra: 400 − 202 = 198. (3) krysse av for et mellomtall: H2024 o1d hadde 202, 100 og 302 som gale alternativer.<\/p>",
"kilder": [
"F4 lb 33",
"F4 lb 76",
"Oppgaver F5 o2"
],
"eksamen": [
"H2024 o1d",
"H2021 o1b",
"H2025 o4",
"H2022 o2"
]
},
{
"id": "f4-skjerming-05",
"nivaa": "kjerne",
"kan": "Akkumulere ubenyttet skjerming over flere år",
"kort": "Ny saldo = gammel saldo + årets fradrag − utbytte (hvis positiv, ellers 0); saldoen legges til kostprisen i neste års grunnlag. Sindre/Martine 2021: 104 × 1 % = 1,04; 3 − 1,04 − 4 &lt; 0 gir 0 skattepliktig og ny saldo 4 + 1,04 − 3 = 2,04.",
"mer": "<p><b>Sindre/Martine<\/b> (kostpris 100): 2018 skattepliktig 1; 2019 2; 2020 0 og saldo 4 (5 − 1); 2021 grunnlag 104, skattepliktig 0, saldo 2,04.<\/p><p><b>H2023 o1b:<\/b> 2015 saldo 40 (80 − 40); 2016 grunnlag 2 040 × 5 % = 102; utbytte 50, saldo 40 + 102 − 50 = 92 (gale: 93, 52, 40).<\/p><p><b>Felle:<\/b> å ta med bare årets ubenyttede (52) eller bare fjorårets (40). Nynorskfasiten i H2022 o2 brukte utbytte 6 og fikk 0,96, selv om oppgaveteksten sa 3; bokmålsfasiten (0 og 2,04) er riktig.<\/p>",
"kilder": [
"F4 lb 33",
"F4 lb 75",
"F4 lb 76",
"Oppgaver F5 o2"
],
"eksamen": [
"H2023 o1b",
"H2022 o2"
]
},
{
"id": "f4-skjerming-06",
"nivaa": "kjerne",
"kan": "Vite at grunnlaget faller tilbake til kostpris når ubenyttet skjerming er brukt opp",
"kort": "Når utbyttet har brukt opp all ubenyttet skjerming, er neste års grunnlag igjen kostprisen. Olsen brukte opp 40,6 i 2017, så grunnlaget i 2018 er 1 000.",
"mer": "<p>Lb 33: når ubenyttet skjermingsfradrag er brukt opp, kommer aksjens skjermingsgrunnlag tilbake til prisen vi kjøpte aksjen for.<\/p><p><b>H2023 o1c:<\/b> 2017: 200 − 20,92 − 92 = 87,08 skattepliktig, saldo 0. 2018: 2 000 × 3 % = 60 = utbyttet, så 0 (gale: 20,9, 60, 30).<\/p><p><b>Felle:<\/b> å fortsette med 2 092 som grunnlag: 2 092 × 3 % = 62,76 gir en falsk saldo på 2,76 som senere trekkes fra gevinsten. I Olsen-eksempelet ville grunnlag 1 040,6 i 2018 gitt 31,22 og gevinst 68,78 i stedet for 70.<\/p>",
"kilder": [
"F4 lb 33",
"F4 lb 34"
],
"eksamen": [
"H2023 o1c"
]
},
{
"id": "f4-skjerming-07",
"nivaa": "kjerne",
"kan": "Vite at skjermingsgrunnlaget er kostpris og ikke markedsverdi",
"kort": "Grunnlaget er anskaffelsesverdien (det aksjonæren betalte) pluss aksjens ubenyttede skjerming fra tidligere år. Aksjekurs, salgspris og selskapets egenkapital er uten betydning.",
"mer": "<p><b>H2019 o1c:<\/b> riktig er (e). Gale: aksjekursen 31.12, aksjekursen 1.1, salgspris minus skjermingsfradrag, justert verdi av egenkapitalen.<\/p><p><b>Felle:<\/b> å bruke dagens kurs fordi den er oppgitt.<\/p>",
"kilder": [
"F4 lb 31",
"F4 lb 33"
],
"eksamen": [
"H2019 o1c"
]
},
{
"id": "f4-skjerming-08",
"nivaa": "kjerne",
"kan": "Regne skjerming per aksjepost når man eier flere aksjer",
"kort": "Skjerming, ubenyttet skjerming og skattepliktig utbytte regnes for hver aksje for seg, med aksjens egen kostpris. Ubenyttet skjerming hører til aksjen og kan ikke brukes mot utbytte fra en annen aksje.",
"mer": "<p><b>H2023 o5:<\/b> NEL kostet 100, utbytte 5, skjerming 3: skattepliktig 2. X kostet 200, utbytte 10, skjerming 6: skattepliktig 4. Eierskatt (2 + 4) × 40 % = 2,4 (gale: 4,80, 2,60, 0,8). Utenlandske AS gir også skjerming. Veiledningen skriver «2*0,8», riktig er 2 × 0,4 = 0,8.<\/p><p><b>Felle (eget tall):<\/b> A kost 100, utbytte 1; B kost 200, utbytte 10; rente 3 %. Per post: A gir 0 og 2 i ubenyttet på A; B gir 10 − 6 = 4. Slår man postene sammen, får man 11 − 9 = 2, som er feil. To aksjer i samme selskap kjøpt til ulik pris har også hver sin kostpris og sitt grunnlag.<\/p>",
"kilder": [
"F4 lb 32",
"F4 lb 33"
],
"eksamen": [
"H2023 o5"
]
},
{
"id": "f4-skjerming-09",
"nivaa": "kjerne",
"kan": "Vite hvem som får skjermingen når aksjen kjøpes i løpet av året",
"kort": "Skjermingsfradraget tilfaller personlig aksjonær som eier aksjen 31.12 i inntektsåret, med hele årets skjermingsrente selv om aksjen er kjøpt i løpet av året.",
"mer": "<p><b>H2025 o4:<\/b> kjøpt 1. februar 2023, full skjerming 100 × 3,5 % = 3,50 for 2023. F4 lb 75: «Siden han satt med aksjen over årsskiftet 2018/2019, har han rett på utbytte i 2018 samt skjerming.»<\/p><p>Oppgaver uten oppgitt skjermingsrente for kjøpsåret ser bort fra skjerming det året.<\/p><p><b>Felle:<\/b> å tidsvekte skjermingen (for eksempel 11/12 × 3,5 %) eller å gi skjerming til selskaper.<\/p>",
"kilder": [
"F4 lb 75",
"Oppgaver F5 o2"
],
"eksamen": [
"H2025 o4",
"H2022 o2"
]
},
{
"id": "f4-skjerming-10",
"nivaa": "kjerne",
"kan": "Behandle skjermingen i salgsåret",
"kort": "Selges aksjen før 31.12, får selgeren ingen skjerming for salgsåret. Bare ubenyttet skjerming fra årene før trekkes fra gevinsten.",
"mer": "<p>F4 lb 34: Olsen selger i 2019 før utbytte og går glipp av både utbytte og skjerming i 2019.<\/p><p><b>H2022 o1.6:<\/b> solgt sommeren 2023 for 550 000; ingen skjerming i 2023; ubenyttet fra 2022 er 500 000 × 10 % = 50 000; gevinst 550 000 − 500 000 − 50 000 = 0, skatt 0 (gale: 50 000, 100 000, 22 000, 25 000).<\/p><p><b>Felle:<\/b> å trekke fra salgsårets skjerming i tillegg (25 000 = 5 % av 500 000), eller å glemme den framførte skjermingen fra året før.<\/p>",
"kilder": [
"F4 lb 34",
"F4 lb 35",
"Oppgaver F5 o1"
],
"eksamen": [
"H2022 o1.6",
"H2023 o1d"
]
},
{
"id": "f4-skjerming-11",
"nivaa": "kjerne",
"kan": "Regne hele Olsen-tabellen (F4 lb 34)",
"kort": "Kostpris 1 000: skattepliktig utbytte 5 (2014), 0 (2015), 0 (2016), 7,8 (2017) og 0 (2018); saldo 31.12 er 0, 30, 40,6, 0 og 30. Gevinst ved salg i 2019 for 1 100: 1 100 − 1 000 − 30 = 70.",
"mer": "<table><tr><th>År<\/th><th>Rente<\/th><th>Utbytte<\/th><th>Grunnlag<\/th><th>Fradrag<\/th><th>Skattepl.<\/th><th>Saldo 31.12<\/th><\/tr><tr><td>2014<\/td><td>2 %<\/td><td>25<\/td><td>1 000<\/td><td>20<\/td><td>5<\/td><td>0<\/td><\/tr><tr><td>2015<\/td><td>3 %<\/td><td>0<\/td><td>1 000<\/td><td>30<\/td><td>0<\/td><td>30<\/td><\/tr><tr><td>2016<\/td><td>2 %<\/td><td>10<\/td><td>1 030<\/td><td>20,6<\/td><td>0<\/td><td>40,6<\/td><\/tr><tr><td>2017<\/td><td>4 %<\/td><td>90<\/td><td>1 040,6<\/td><td>41,6<\/td><td>7,8<\/td><td>0<\/td><\/tr><tr><td>2018<\/td><td>3 %<\/td><td>0<\/td><td>1 000<\/td><td>30<\/td><td>0<\/td><td>30<\/td><\/tr><\/table><p>Solgt i 2019 før utbytte for 1 100: gevinst 1 100 − 1 000 − 30 = 70.<\/p><p><b>Felle:<\/b> 2016-saldoen er 30 + 20,6 − 10, ikke 20,6 − 10.<\/p>",
"kilder": [
"F4 lb 34",
"F4 lb 35"
],
"eksamen": [
"H2023 o1b",
"H2023 o1c"
]
},
{
"id": "f4-skjerming-12",
"nivaa": "kjerne",
"kan": "Regne skjermingsrenten",
"kort": "Skjermingsrente = (3-måneders statskasseveksel + 0,5 prosentpoeng) × (1 − 22 %). For 2025: (4,1 % + 0,5 %) × 0,78 ≈ 3,6 %.",
"mer": "<p>Renten er en risikofri rente <b>etter skatt<\/b>, i = r<sub>f<\/sub>(1 − t), fordi skjermingen skal speile risikofri avkastning etter skatt (BS3 s. 44). Grunnlaget er det aritmetiske snittet av statskassevekselrenten; tillegget på 0,5 prosentpoeng er et risikotillegg; resultatet avrundes til nærmeste tidel. BS3 s. 44 for 2020: (0,29 % + 0,5 %) × 0,78 ≈ 0,6 %.<\/p><p>Gammel lb 41: statskassevekselrenten er svært lav, derfor tillegget. «Er justeringen god nok?»<\/p><p><b>Felle:<\/b> å glemme (1 − 22 %) og svare 4,6 %, eller å trekke fra 22 prosentpoeng.<\/p>",
"kilder": [
"F4 lb 31",
"F4 lb 32",
"BS3 s. 44",
"BS1 s. 30"
],
"eksamen": []
},
{
"id": "f4-skjerming-13",
"nivaa": "viktig",
"kan": "Forklare hvorfor vi har skjermingsfradrag",
"kort": "Eierskatten skal bare treffe den risikable delen av avkastningen. Egenkapital har en risikofri alternativkostnad som ikke kan trekkes fra slik gjeldsrenter kan; skjermingen retter opp denne skjevheten.",
"mer": "<p>Uten skjerming ville egenkapitalinvesteringer blitt beskattet hardere enn en risikofri plassering. BS3 s. 44: Sørensen (2003, 2005) mente skjermingen hindrer at selskapsskatt og utbytteskatt driver avkastningskravet i selskapssektoren over kravet utenfor. Lindhe og Södersten (2012): det holder bare i en lukket økonomi der skjermingen kapitaliseres i aksjeprisene; i en liten åpen økonomi kan skjermingen påvirke porteføljevalg og organisasjonsform.<\/p><p>NOU 2003:9 s. 190 (BS2 s. 55–56): utbytteskatt uten skjerming favoriserer lån og tilbakeholdt overskudd framfor ny aksjekapital.<\/p><p><b>Felle:<\/b> å tro at skjermingen skal fjerne all skatt på utbytte.<\/p>",
"kilder": [
"F4 lb 40",
"F4 gammel lb 41",
"BS3 s. 44",
"BS2 s. 55",
"BS2 s. 56"
],
"eksamen": []
},
{
"id": "f4-skjerming-14",
"nivaa": "detalj",
"kan": "Forstå skjerming på aksjesparekonto",
"kort": "På ASK legges årets skjerming til grunnlaget når den ikke brukes og nye innskudd øker grunnlaget. Innskudd 3 × 10 000 (2009, 2013, 2015) gir grunnlag 31 160 i 2016, så 1 160 kr er skjermet og kan tas ut skattefritt.",
"mer": "<table><tr><th>År<\/th><th>Rente<\/th><th>Grunnlag<\/th><th>Fradrag<\/th><\/tr><tr><td>2009<\/td><td>1,30 %<\/td><td>10 000<\/td><td>130<\/td><\/tr><tr><td>2010<\/td><td>1,60 %<\/td><td>10 130<\/td><td>162<\/td><\/tr><tr><td>2011<\/td><td>1,50 %<\/td><td>10 292<\/td><td>154<\/td><\/tr><tr><td>2012<\/td><td>1,10 %<\/td><td>10 446<\/td><td>115<\/td><\/tr><tr><td>2013<\/td><td>1,10 %<\/td><td>20 561<\/td><td>226<\/td><\/tr><tr><td>2014<\/td><td>0,90 %<\/td><td>20 787<\/td><td>187<\/td><\/tr><tr><td>2015<\/td><td>0,60 %<\/td><td>30 974<\/td><td>186<\/td><\/tr><tr><td>2016<\/td><td>0,40 %<\/td><td>31 160<\/td><td>125<\/td><\/tr><\/table><p>Grunnlaget er inngangsverdien når gevinstskatt skal beregnes. Lysbildets 1 160 kr tar ikke med 2016-fradraget på 125 kr.<\/p><p>F4 lb 44: ASK er nest beste alternativ etter sparing i selskap.<\/p>",
"kilder": [
"F4 lb 36",
"F4 lb 44"
],
"eksamen": []
}
]
},
{
"id": "f4-gevinst",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "Aksjegevinst, tap og salg",
"eksamensvekt": 5,
"viktigst": [
"Gevinst = salgspris − kostpris − ubenyttet skjerming fra årene før",
"Skatt = gevinst × 1,72 × 22 % = gevinst × 37,84 %",
"Ingen skjerming i salgsåret",
"Ubenyttet skjerming kan bare redusere en gevinst til null; resten går tapt",
"Tap = kostpris − salgspris, fradrag med 37,84 %"
],
"punkter": [
{
"id": "f4-gevinst-01",
"nivaa": "kjerne",
"kan": "Regne skattemessig gevinst ved salg",
"kort": "Gevinst = salgspris − kostpris − akkumulert ubenyttet skjerming. Olsen: 1 100 − 1 000 − 30 = 70.",
"mer": "<p><b>H2025 o10:<\/b> 160 − 100 − 10 = 50. <b>H2024 o2:<\/b> 60 − 50 − 5 = 5. <b>H2023 o1d:<\/b> ingen ubenyttet skjerming fra 2018, så gevinst 2 200 − 2 000 = 200.<\/p><p>Den ubenyttede skjermingen fra året før salget virker som et tillegg til inngangsverdien.<\/p><p><b>Felle:<\/b> å glemme den ubenyttede skjermingen. I H2024 o2 er 3,89 et galt alternativ nær gevinsten uten skjerming (10 × 37,84 % = 3,78).<\/p>",
"kilder": [
"F4 lb 35"
],
"eksamen": [
"H2025 o10",
"H2024 o2",
"H2023 o1d",
"H2022 o1.6"
]
},
{
"id": "f4-gevinst-02",
"nivaa": "kjerne",
"kan": "Regne skatten på aksjegevinsten",
"kort": "Skatt = gevinst × 1,72 × 22 % = gevinst × 37,84 %. Olsen: 70 × 1,72 = 120,4; 120,4 × 22 % = 26,49; gevinst etter skatt 70 − 26,49 = 43,51.",
"mer": "<p><b>H2025 o10:<\/b> 50 × 1,72 × 22 % = 18,92 (gale: 3,89, 11, 18,2). Fasiten nevner begge veier: 50 × 37,84 % gir det samme. <b>H2024 o2:<\/b> 5 × 1,72 × 22 % = 1,89 (gale: 3,89, 0, 3,1). <b>H2023 o1d:<\/b> 200 × 1,72 × 22 % = 75,68 (gale: 30,55, 69,89, 74,12).<\/p><p><b>Felle:<\/b> 11 = 50 × 22 % (glemt oppjustering). Les om det spørres om skatt (26,49), oppjustert gevinst (120,4) eller gevinst etter skatt (43,51).<\/p>",
"kilder": [
"F4 lb 35"
],
"eksamen": [
"H2025 o10",
"H2024 o2",
"H2023 o1d"
]
},
{
"id": "f4-gevinst-03",
"nivaa": "kjerne",
"kan": "Regne gevinsten når ubenyttet skjerming fra året før er stor",
"kort": "H2022 o1.6: ingen utbytte i 2022 gir ubenyttet 500 000 × 10 % = 50 000; salg sommeren 2023 for 550 000 gir gevinst 550 000 − 500 000 − 50 000 = 0 og skatt 0.",
"mer": "<p>Saldoen fra 2021 er 0 fordi utbyttet i 2021 oversteg skjermingen. Grunnlaget i 2022 er derfor 500 000. Selges aksjen før 31.12.2023, gis ingen skjerming for 2023.<\/p><p>Gale alternativer: 50 000 (gevinsten uten skjerming), 25 000 (salgsårets skjerming 5 % × 500 000), 22 000 og 100 000.<\/p><p><b>Felle:<\/b> å regne skatt av 50 000: 50 000 × 1,6 × 25 % = 20 000.<\/p>",
"kilder": [
"Oppgaver F5 o1"
],
"eksamen": [
"H2022 o1.6"
]
},
{
"id": "f4-gevinst-04",
"nivaa": "viktig",
"kan": "Vite at ubenyttet skjerming ikke kan skape eller øke et tap",
"kort": "Ubenyttet skjerming kan bare redusere en gevinst ned til null. Gevinst 20 og ubenyttet skjerming 50: skattepliktig gevinst 0 og 30 går tapt.",
"mer": "<p>Gammel F4 lb 41 (tatt ut av 2026-versjonen, men innholdet står i BS3 og BS1): investoren slipper gevinstbeskatning, men den ubenyttede delen på 30 kr går tapt.<\/p><p>BS3 s. 44: gevinst over kostpris pluss akkumulert skjerming skattlegges; tap i forhold til inngangsverdien gir fradrag; ubenyttet skjerming ved realisasjon går tapt. Det er dette som gjør eierskatten <b>asymmetrisk<\/b>.<\/p><p><b>Felle:<\/b> å regne et fradragsberettiget tap på 30 (30 × 37,84 % = 11,35).<\/p>",
"kilder": [
"F4 gammel lb 41",
"BS3 s. 44",
"BS3 s. 46",
"BS1 s. 27"
],
"eksamen": []
},
{
"id": "f4-gevinst-05",
"nivaa": "viktig",
"kan": "Regne skatteverdien av et tap på aksjer",
"kort": "Tap = kostpris − salgspris (målt mot inngangsverdien) og trekkes fra med eierskattesatsen 37,84 %. Ubenyttet skjerming legges ikke til tapet.",
"mer": "<p><b>Eksempel (eget tall):<\/b> kjøpt 100, solgt 80, ubenyttet skjerming 5. Tap 20, skatteverdi 20 × 37,84 % = 7,57. De 5 i skjerming går tapt.<\/p><p>BS3 s. 46: tap relativt til inngangsverdien kan føres til fradrag i alminnelig inntekt med sats a. Gammel lb 41: tapsfradrag framføres i stedet for å refunderes umiddelbart; investoren kan dessuten gå konkurs før fradraget er brukt.<\/p><p><b>Felle:<\/b> å tro at tap mellom selskaper gir fradrag. Under fritaksmetoden gjør det ikke det.<\/p>",
"kilder": [
"F4 lb 30",
"BS3 s. 46",
"F4 gammel lb 41"
],
"eksamen": []
}
]
},
{
"id": "f4-samlet-skatt",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "Samlet skatt på selskap og eier",
"eksamensvekt": 4,
"viktigst": [
"Alt utdelt: 22 % + (1 − 0,22) × 37,84 % = 51,5 %",
"Effektiv sats = betalt skatt / brutto overskudd før skatt",
"Effektiv skatt på utbyttet alene = eierskatt / utbytte",
"Med faktisk selskapsskatt 14 %: 46,5 %",
"51,5 % er en øvre grense"
],
"punkter": [
{
"id": "f4-samlet-skatt-01",
"nivaa": "kjerne",
"kan": "Regne marginalskatten på eier når hele overskuddet deles ut",
"kort": "1 kr × 22 % + (1 − 0,22) × 37,84 % = 51,5 %. Av én krone går 22 øre til selskapsskatt, 29,5 øre til utbytteskatt og 48,5 øre er igjen.",
"mer": "<p>Dette er tallet offisiell statistikk oppgir (nominelle satser, alt utdelt). Generelt: t = t<sub>A<\/sub> + (1 − t<sub>A<\/sub>) × y × t<sub>e<\/sub>.<\/p><p>Med eksamenssatsene: <b>H2018 o2c<\/b> og <b>H2019 o3c<\/b>: 0,22 + 0,78 × 0,22 × 1,44 = 46,7 %. <b>H2023 o2c:<\/b> 20 % + 80 % × 30 % = 44 %.<\/p><p><b>Felle:<\/b> 22 % + 37,84 % = 59,84 %. Eierskatten treffer bare det som er igjen etter selskapsskatten. Ikke bland med 59,8 % i inntektsskiftningsligningen, som er nominelle satser lagt sammen.<\/p>",
"kilder": [
"F4 lb 64",
"F5 lb 27"
],
"eksamen": [
"H2018 o2c",
"H2019 o3c",
"H2017 o2c",
"H2023 o2c"
]
},
{
"id": "f4-samlet-skatt-02",
"nivaa": "kjerne",
"kan": "Skille effektiv skatt på utbyttet fra samlet effektiv skatt",
"kort": "Effektiv skatt på utbyttet = eierskatt / utbytte; samlet = (selskapsskatt + eierskatt) / overskudd før skatt. H2022: 36 800/117 000 = 31,5 % og (33 000 + 36 800)/150 000 = 46,5 %.",
"mer": "<p>Selskapsskatten er 150 000 × 22 % = 33 000 (H2022 o1.1), så utbyttet blir 117 000.<\/p><p>Skjermingen gjør at skatten på utbyttet (31,5 %) blir lavere enn den nominelle eierskatten 1,6 × 25 % = 40 %.<\/p><p>Gale alternativer i H2022 o1.4: 35,2 %, 35 %, 25 %, 47,6 %. I o1.5: 47,5 %, 50 %, 47 %, 42 %. Nynorskfasiten skrev 46,8 % i o1.5, men 46,5 % er riktig.<\/p><p><b>Felle:<\/b> å bytte nevnerne, slik at begge tallene står som alternativ i hvert sitt delspørsmål.<\/p>",
"kilder": [
"Oppgaver F5 o1"
],
"eksamen": [
"H2022 o1.4",
"H2022 o1.5",
"H2022 o1.1"
]
},
{
"id": "f4-samlet-skatt-03",
"nivaa": "kjerne",
"kan": "Finne overskudd før skatt når overskudd etter skatt er gitt",
"kort": "Overskudd før skatt = overskudd etter skatt / (1 − 22 %). H2019 o3c: 4 mill./0,78 = 5 128 205; selskapsskatt 1 128 205; eierskatt 4 mill. × 31,68 % = 1 267 200; samlet 2 395 405/5 128 205 = 46,7 %.",
"mer": "<p>Nevneren skal være <b>brutto<\/b> overskudd i bedriften.<\/p><p>Gale alternativer i H2019 o3c: 33,7 %, 33 %, 45,6 %, 47,7 %.<\/p><p><b>Feller:<\/b> å dele på 4 mill. (gir 59,9 %), eller å regne selskapsskatten som 22 % av 4 mill. (880 000 og 44 %).<\/p>",
"kilder": [
"F4 lb 64"
],
"eksamen": [
"H2019 o3c",
"H2019 o3b"
]
},
{
"id": "f4-samlet-skatt-04",
"nivaa": "viktig",
"kan": "Regne marginal eierskatt med faktisk betalt selskapsskatt",
"kort": "Studier viser at bedriftene betaler 13–15 % effektivt. Med 14 %: 14 % + (1 − 0,14) × 37,84 % = 46,5 %.",
"mer": "<p>Offisiell statistikk bruker den nominelle satsen (51,5 %) fordi man vil ha et sammenligningsgrunnlag med andre land som bruker nominelle satser. Schjelderup: statistikken er likevel «feil» fordi den effektive selskapsskatten ikke er 22 %.<\/p><p>Med HBS-snittet 13,1 % blir det om lag 46 %.<\/p><p><b>Felle:<\/b> å trekke 14 % fra 51,5 %, eller å bruke 22 % i parentesen.<\/p>",
"kilder": [
"F4 lb 65"
],
"eksamen": []
},
{
"id": "f4-samlet-skatt-05",
"nivaa": "viktig",
"kan": "Forklare hvorfor 51,5 % er en øvre grense",
"kort": "Tre forutsetninger trekker tallet opp: alt overskudd deles ut med én gang, skjermingen er sett bort fra og satsene er nominelle. En typisk eier betaler mindre.",
"mer": "<p>Utsatt utbytte utsetter utbytteskatten og senker byrden. Med skjerming treffer 51,5 % bare meravkastningen. Talernotatet: «Alle tre forutsetningene trekker i samme retning: de gjør tallet for høyt.»<\/p><p>F5 lb 29: Bjerksund, Hopland og Schjelderup (2024) finner 14–21 % for de rikeste i snitt 2004–2018 (lysbildet sier topp 1 %, artikkelen handler om topp 0,1 %). Aaberge mfl. (2024): den rikeste prosenten betaler om lag 19 % av bruttoinntekten mot 36 % ved 99. persentil. Disse er gjennomsnittssatser på et bredere inntektsbegrep, ikke samme størrelse som marginalsatsen.<\/p>",
"kilder": [
"F5 lb 28",
"F5 lb 29"
],
"eksamen": []
}
]
},
{
"id": "f4-utbytte-formuesskatt",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "Utbytte for å betale formuesskatt",
"eksamensvekt": 4,
"viktigst": [
"Utbytte D = formuesskatt F / (1 − effektiv eierskatt)",
"Kontroll: D − D × eierskatt = F",
"Ikke legg skatten oppå: F + F × eierskatt er feil",
"10 mill. i aksjer: effektiv skatt om lag 25,6 %, som lønn på 700 000"
],
"punkter": [
{
"id": "f4-utbytte-formuesskatt-01",
"nivaa": "kjerne",
"kan": "Regne utbyttet som dekker både formuesskatt og utbytteskatt",
"kort": "D = F/(1 − t<sub>e<\/sub>), der t<sub>e<\/sub> er effektiv eierskatt. Leah: formuesskatt 1, eierskatt 37,8 %: D = 1/(1 − 0,378) ≈ 1,6; utbytteskatt 0,6.",
"mer": "<p><b>H2024 o7:<\/b> 1,6 (gale: 2, 2,1, 1,2). <b>H2025 o6:<\/b> 1 000/(1 − 0,5) = 2 000 (gale: 2 500, 1 500, 1 600). <b>H2023 o4b:<\/b> eierskatt 2 × 20 % = 40 %; 2 400/0,6 = 4 000. <b>H2019 o3a:<\/b> 850 000/(1 − 0,3168) = 1 244 145.<\/p><p><b>Feller:<\/b> (1) å legge skatten oppå: 1 000 + 50 % × 1 000 = 1 500. (2) å bruke nominell sats uten oppjustering: 850 000/0,78 = 1 089 744. (3) å runde av 31,68 % underveis; 1 247 100 og 1 267 355 lå nær.<\/p><p>Lysbildet skriver «Sindre betaler», det skal være Leah.<\/p>",
"kilder": [
"F4 lb 77",
"F5 lb 50",
"HBS s. 12"
],
"eksamen": [
"H2024 o7",
"H2025 o6",
"H2023 o4b",
"H2019 o3a"
]
},
{
"id": "f4-utbytte-formuesskatt-02",
"nivaa": "kjerne",
"kan": "Regne 10 mill.-eksempelet med formuesskatt og utbytte (F4 lb 38)",
"kort": "Utbytte 6 % = 600 000; formuesskatt (10 mill. × 0,8 − 1,7 mill.) × 1 % = 63 000; skjerming 10 mill. × 3,6 % = 360 000; utbytteskatt 240 000 × 37,84 % = 90 816. Igjen 446 184; effektiv sats (63 000 + 90 816)/600 000 ≈ 25,6 %.",
"mer": "<p>De ti største selskapene på Oslo Børs betalte om lag 6 % i utbytte. Lysbildet skriver 25,5 % fordi det har byttet om sifrene (90 186 i stedet for 90 816).<\/p><p>Lb 39: effektiv skatt på lønn uten gjeld og fradrag er ca. 19,3 % (400 000), 22,1 % (500 000), 24,0 % (600 000) og 25,4 % (700 000). Investoren er på linje med en lønnstaker på 700 000. «Hva vi mener om det er politikk og ikke fag.»<\/p><p><b>Felle:<\/b> å glemme skjermingen (600 000 × 37,84 % = 227 040). Den gamle versjonen av lysbildet regnet feil og fikk 24,8 %.<\/p>",
"kilder": [
"F4 lb 37",
"F4 lb 38",
"F4 lb 39"
],
"eksamen": []
},
{
"id": "f4-utbytte-formuesskatt-03",
"nivaa": "kjerne",
"kan": "Regne nettoutbytte etter eierskatt og formuesskatt over flere år",
"kort": "H2025 o1: skjerming 10 mill. × 2 % = 200 000 og 10 mill. × 4 % = 400 000; eierskatt (300 000 + 200 000) × 40 % = 200 000; formuesskatt 10 mill. × 0,8 × 1 % × 2 = 160 000; igjen 1 100 000 − 200 000 − 160 000 = 740 000.",
"mer": "<p>Skjermingen regnes av kostprisen hvert år og formuesskatten av børsverdien etter 20 % aksjerabatt. Bunnfradrag er det sett bort fra.<\/p><p>Fasiten skriver «120 000» for formuesskatten ett sted, men 160 000 og sluttsvaret 740 000 stemmer.<\/p><p><b>Felle:<\/b> å bruke formuesskatt for bare ett år, å glemme aksjerabatten eller å skattlegge hele utbyttet uten skjerming.<\/p>",
"kilder": [
"F4 lb 38"
],
"eksamen": [
"H2025 o1"
]
},
{
"id": "f4-utbytte-formuesskatt-04",
"nivaa": "viktig",
"kan": "Regne formuesskatt og utbytte under ulike regelsett (Oppgaver F4)",
"kort": "Børsnotert selskap 1 250. 2023-regler: 1 250 × 0,8 × 1,1 % = 11; utbytte 11/(1 − 0,3784) = 17,70; utbytteskatt 6,70. Skatteutvalget: 1 250 × 0,85 % = 10,63; utbytte 10,63/(1 − 0,34) = 16,11; utbytteskatt 5,48.",
"mer": "<p>Skatteutvalget (0 % rabatt, 0,85 %, eierskatt 34 %) mot 2023 (20 % rabatt, 1,1 %, 37,84 %).<\/p><p><b>Avvik i fasiten:<\/b> den skriver utbytteskatt 2023 = «6,19 × 37,84 % = 2,34». Det er tall fra den gamle versjonen av oppgaven (unotert, 35 % av markedsverdi: formuesskatt 3,85 og utbytte 6,19). Med de nye tallene blir summen formuesskatt + utbytteskatt 17,70 (2023) mot 16,11 (Skatteutvalget), så konklusjonen «betydelig skatteskjerpelse» holder bare med de gamle tallene.<\/p><p>Til eksamen: utbytteskatt = utbytte × eierskatt = utbytte − formuesskatt.<\/p>",
"kilder": [
"Oppgaver F4 spm 1",
"Oppgaver F4 spm 2",
"Oppgaver F4 spm 3",
"Oppgaver F4 spm 4"
],
"eksamen": []
},
{
"id": "f4-utbytte-formuesskatt-05",
"nivaa": "viktig",
"kan": "Forklare påstanden om at formuesskatten tvinger fram utbytte",
"kort": "Påstanden: man må ta utbytte for å betale formuesskatten. Regnestykket viser at skattebelastningen likevel er moderat (25,6 % i 10 mill.-eksempelet) og BS1 viser at det med realistisk lånerente fortsatt lønner seg å spare i selskapet.",
"mer": "<p>I det offentlige ordskiftet hevdes det at man ikke har råd til å eie norske aksjer, eller at man må bruke lønn eller sparemidler til formuesskatten (lb 37).<\/p><p>BS1 s. 28: om kritikerne har rett, svekker formuesskatten fordelen ved å spare i selskapet. Men med lånerente over plasseringsrenten er det fortsatt lønnsomt å holde kapitalen i selskapet (BS1 s. 32). HBS: den rike investoren kan betale formuesskatten med skattefritt utbytte innenfor skjerming eller nedskrevet EK.<\/p><p><b>Felle:<\/b> å tro at formuesskatten er hovedgrunnen til lav skatt for de rikeste. Det er den lave verdsettelsen.<\/p>",
"kilder": [
"F4 lb 37",
"BS1 s. 28",
"BS1 s. 32",
"HBS s. 11"
],
"eksamen": []
}
]
},
{
"id": "f4-fritaksmetoden",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "Fritaksmetoden og holdingselskap",
"eksamensvekt": 3,
"viktigst": [
"Selskap som aksjonær: utbytte og aksjegevinst i hovedsak skattefritt, tap ikke fradragsberettiget",
"Formål: hindre kjedebeskatning",
"Eierandel under 90 %: 3 % av utbyttet skattlegges med 22 %, altså 0,66 %",
"Holdingselskapet er en skattefri sparebøsse; eierskatt først når pengene går til person"
],
"punkter": [
{
"id": "f4-fritaksmetoden-01",
"nivaa": "kjerne",
"kan": "Vite hva fritaksmetoden innebærer",
"kort": "Aksjeselskaper (selskapsaksjonærer) er i hovedsak fritatt for skatt på mottatt aksjeutbytte og aksjegevinst. Tap på aksjer er som utgangspunkt ikke fradragsberettiget.",
"mer": "<p>Fritaksmetoden gjelder når <b>mottakeren er et selskap<\/b>. Personlige aksjonærer skattlegges etter aksjonærmodellen.<\/p><p><b>H2019 o1a:<\/b> riktig er (e) «Norske aksjeselskaper er i hovedsak fritatt for skatt på aksjeutbytte og for gevinst ... Tap ... ikke fradragsberettiget». Gale alternativer tok med personer eller enkeltpersonforetak.<\/p><p><b>Felle:<\/b> å glemme at tap heller ikke gir fradrag.<\/p>",
"kilder": [
"F4 lb 22",
"F4 lb 23",
"BS3 s. 43",
"HBS s. 6"
],
"eksamen": [
"H2019 o1a"
]
},
{
"id": "f4-fritaksmetoden-02",
"nivaa": "kjerne",
"kan": "Forklare hvorfor vi har fritaksmetoden",
"kort": "For å unngå kjedebeskatning: samme overskudd skal ikke skattlegges på nytt hver gang det går fra selskap til selskap i en eierkjede.",
"mer": "<p>Uten fritaksmetoden blir utbytte skattlagt i utdelende selskap og igjen hos mottakende selskap (kjedebeskatning) og så hos personlig aksjonær (trippelbeskatning, gammel lb 28). Utbytte fra datter til mor er skattefritt; utbytte (eierinntekt) til personlig aksjonær skattlegges etter aksjonærmodellen.<\/p><p>BS2 s. 56: fritaksmetoden er den vanligste metoden internasjonalt mot kjedebeskatning. NOU 2014:13 vurderte en kreditmetode for utenlandske aksjeinntekter, men avviste den (administrativt krevende, svakere vern mot kjedebeskatning).<\/p><p><b>Felle:<\/b> å svare at formålet er å stimulere sparing eller å skjerme normalavkastningen. Det siste er skjermingsfradraget.<\/p>",
"kilder": [
"F4 lb 22",
"F4 lb 23",
"F4 gammel lb 28",
"BS2 s. 56"
],
"eksamen": []
},
{
"id": "f4-fritaksmetoden-03",
"nivaa": "kjerne",
"kan": "Regne skatt etter 3 %-regelen",
"kort": "Eier selskapet under 90 % av datterselskapet, skattlegges 3 % av mottatt utbytte med 22 %: 0,66 % av utbyttet. Eier det 90 % eller mer, er utbyttet helt skattefritt.",
"mer": "<p><b>Eksempel:<\/b> utbytte 100 kr, eierandel under 90 %: 3 kr × 22 % = 0,66 kr (66 øre). Lysbildet skriver «0,66 øre», men det er 66 øre, altså 0,66 % av utbyttet. «I praksis kan vi glemme 3 %-regelen.»<\/p><p>HBS s. 6: 97 % av utbyttet er fritatt; innen et skattekonsern (over 90 % eierskap) er utbyttet fullt fritatt. Regelen gjelder utbytte, ikke gevinst.<\/p><p><b>Felle:<\/b> å svare 3 kr (glemmer 22 %) eller 22 kr (bruker 22 % på hele utbyttet).<\/p>",
"kilder": [
"F4 lb 25",
"HBS s. 6"
],
"eksamen": []
},
{
"id": "f4-fritaksmetoden-04",
"nivaa": "kjerne",
"kan": "Forklare hvordan et holdingselskap utnytter fritaksmetoden",
"kort": "Holdingselskapet eier aksjer i andre selskaper, mottar utbytte og gevinster skattefritt og kan reinvestere dem uten skatt. Eierskatt kommer først når pengene deles ut til personlig aksjonær.",
"mer": "<p>Holdingselskapet kan selge aksjene i et datterselskap uten gevinstskatt. Overskuddet beskattes først når det tas ut som utbytte til person. Har man stor nok formue, trenger man lite privat. Derfor kan de rikeste «kanskje utsette skatten i all evighet», noe Skauge-utvalget advarte mot.<\/p><p>HBS s. 8: de rikeste organiserer seg typisk med et holdingselskap som eier datterselskaper.<\/p><p><b>Felle:<\/b> å tro at holdingselskapet betaler 22 % på utbyttet fra datter. Det betaler 0 (eller 0,66 % under 90 %).<\/p>",
"kilder": [
"F4 lb 23",
"F4 lb 24",
"F4 lb 26",
"HBS s. 8"
],
"eksamen": []
},
{
"id": "f4-fritaksmetoden-05",
"nivaa": "viktig",
"kan": "Kjenne tallene om holdingselskapene og Mohn-saken",
"kort": "DN 2019: de rikeste har rundt 80 mrd. kr i året i skattefrie utbytter og gevinster i holdingselskapene; selskapene til de 650 rikeste har over 400 mrd. kr i opptjent overskudd (ca. 125 mrd. kr i skatt om det ble tatt ut). Mohn fikk 13 mrd. kr i skattefri gevinst i Wimoh ved salget av Framo.",
"mer": "<p>Mohns holdingselskap Wimoh eide Framo, som ble solgt til Alfa Laval. Gevinsten var skattefri i Wimoh; før 2006 ville en slik overføring utløst skatt.<\/p><p>Gini-indeksen for formue har økt fra rundt 60 til 72; en forklaring er overskuddene som hoper seg opp i holdingselskapene (lb 26). DN 13.12.2019: «Milliardærenes skattefrie pengebinger».<\/p><p><b>Felle:<\/b> å blande 80 mrd. (per år) og 400 mrd. (akkumulert).<\/p>",
"kilder": [
"F4 lb 26",
"F4 lb 27",
"F4 lb 28"
],
"eksamen": []
},
{
"id": "f4-fritaksmetoden-06",
"nivaa": "detalj",
"kan": "Vite hva fritaksmetoden ellers omfatter",
"kort": "Fritaket gjelder også derivater med kvalifiserende aksjer som underliggende. Driftskostnader knyttet til de skattefrie aksjeinntektene er likevel fullt fradragsberettiget.",
"mer": "<p>HBS s. 6 beskriver reglene: selskapsaksjonærer er fritatt for skatt på mottatt utbytte, gevinst på kvalifiserende aksjer og derivater på slike aksjer; tilsvarende tap er ikke fradragsberettiget; kostnader som forvaltning kan trekkes fra.<\/p><p>BS2 s. 53: fritaksmetoden gjelder i hovedsak aksjeinntekter fra EØS-området.<\/p><p><b>Felle:<\/b> å tro at fritaket bare gjelder norske datterselskaper.<\/p>",
"kilder": [
"HBS s. 6",
"BS2 s. 53"
],
"eksamen": []
}
]
},
{
"id": "f4-tilbakeholdt",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "Tilbakeholdt overskudd, BS-modellen og utflytting",
"eksamensvekt": 2,
"viktigst": [
"Latent eierinntekt = overskudd som blir stående i selskapene",
"BS-modellen: utbytte nå lønner seg bare hvis skjermingsrenten er lik lånerenten",
"Lånerente over skjermingsrente: spar i selskapet og ta utbytte senere",
"Finansdepartementet: systemet påvirker ikke utbyttetidspunktet; BS: feil",
"5-årsregelen opphørte 29.11.2022; exit-skatt 37,84 % over 12 år"
],
"punkter": [
{
"id": "f4-tilbakeholdt-01",
"nivaa": "kjerne",
"kan": "Forklare BS-modellen for utbytte nå eller senere",
"kort": "Ta 1 kr utbytte nå, skyt den inn som ny EK og lån 0,378 til eierskatten; ved t = 1 er skattebesparelsen S = 0,378 × (1 + r(1 − t)) og lånekostnaden L = 0,378 × (1 + R(1 − t)). S = L krever r = R; med R &gt; r lønner det seg å vente.",
"mer": "<p>r er skjermingsrenten, R lånerenten og t satsen på alminnelig inntekt. Egenkapitalen må være lik i begge strategier for at risikoen skal være lik. Investoren må låne til skatten, ellers hadde han ikke trengt utbyttet. Den nye EK-en øker inngangsverdien til 1 × (1 + r(1 − t)); skattebesparelsen er eierskatten ganget med dette, 0,378 × (1 + r(1 − t)).<\/p><p><b>Eget tall:<\/b> R = 5 %, r = 3,6 %, t = 22 %: L = 0,3927 &gt; S = 0,3886, så vent.<\/p><p>«Skjermingsrenten i Norge er betydelig lavere enn lånerenten.»<\/p><p><b>Felle:<\/b> å svare at utbytte nå lønner seg når lånerenten er høyere.<\/p>",
"kilder": [
"F4 lb 78",
"F4 lb 79",
"F4 lb 80",
"F5 lb 51",
"F5 lb 52",
"F5 lb 53",
"BS3 s. 50"
],
"eksamen": []
},
{
"id": "f4-tilbakeholdt-02",
"nivaa": "viktig",
"kan": "Vite hva latent eierinntekt er",
"kort": "Overskudd i selskapene som ikke betales ut som utbytte. Latent eierinntekt utgjorde 40 % av verdien av Oljefondet i 2016. Etter 2006 tas det mindre utbytte.",
"mer": "<p>DN (lb 41): opptjent EK var ganske stabil fram til 2006 og steg så til om lag 2 200 mrd. kr. BS3 s. 43: tilbakeholdt overskudd i norske AS var ca. 760 mrd. kr i 2000–2004 og ble tredoblet til ca. 2 486 mrd. kr i 2016. BS2 s. 56: flatt før reformen fikk virkning i 2004, så økning hvert år unntatt finanskrisen 2008. Gammel lb 43: opphopingen er så stor at SSB kaller det latente eierinntekter.<\/p><p><b>Felle:<\/b> å tro at fritaksmetoden fikk virkning fra 2006. Den fikk virkning fra 2004 (BS3 s. 43); utbytteskatten kom i 2006.<\/p>",
"kilder": [
"F4 lb 41",
"F4 lb 44",
"F4 gammel lb 43",
"BS3 s. 43",
"BS2 s. 56"
],
"eksamen": []
},
{
"id": "f4-tilbakeholdt-03",
"nivaa": "viktig",
"kan": "Kjenne Finansdepartementets syn og BS' svar",
"kort": "Finansdepartementet: skattesystemet påvirker ikke når det lønner seg å ta utbytte (periodiseringsnøytralitet). Bjerksund og Schjelderup (2021, 2022): det lønner seg å spare i selskaper snarere enn privat; nest best er ASK.",
"mer": "<p>NOU 2003:9 boks 9.1 (gjengitt i BS2 s. 63): utbytteskatten påvirker ikke valget mellom å holde tilbake og å dele ut, så lenge satsen er lik i begge perioder. BS2 s. 55: eksemplet gjaldt en renteinvestering som skattlegges løpende i selskapet og forutsatte dermed bort problemet fritaksmetoden skaper.<\/p><p>Gammel lb 43: «Altså: Det er tilfeldig at selskapene holder tilbake overskudd» (ironisk).<\/p><p><b>Felle:<\/b> å tro at BS er enige med departementet under symmetri. Selv med symmetri lønner det seg å vente når lånerenten er høyere enn skjermingsrenten.<\/p>",
"kilder": [
"F4 lb 44",
"F4 gammel lb 41",
"BS2 s. 55",
"BS2 s. 63"
],
"eksamen": []
},
{
"id": "f4-tilbakeholdt-04",
"nivaa": "viktig",
"kan": "Kunne BS' fire grunner til at aksjonærbeskatningen ikke er nøytral",
"kort": "Fire grunner: (1) tap og gevinst behandles ulikt (tapsfradrag framføres, konkurs før fradraget brukes, ubenyttet skjerming tapes ved salg), (2) riktig skjermingsrente er aksjonærens lånerente, (3) tapsaversjon gjør at investor ikke vil ta «tapet» ved å betale eierskatt og (4) å ta utbytte er å utøve en gratis opsjon.",
"mer": "<p>Ingen privat aktør kan låne til den rene statskassevekselrenten. Risikotillegget på 0,5 prosentpoeng utligner ikke lånerenten, som dessuten varierer mellom investorer.<\/p><p>Opsjonen: eierskatten kan gå opp eller ned i framtiden, så det kan være verdt å vente. En gratis opsjon har alltid verdi. BS1 s. 33: opsjonsverdien (velge tidspunkt for utbytte eller flytte ut og realisere under et gunstigere regime) kan i seg selv gjøre nøytralitet vanskelig.<\/p><p>Lysbildene med de fire grunnene er tatt ut av 2026-versjonen, men innholdet er pensum gjennom BS1 og BS3.<\/p>",
"kilder": [
"F4 gammel lb 46",
"F4 gammel lb 47",
"BS1 s. 33",
"BS3 s. 44"
],
"eksamen": []
},
{
"id": "f4-tilbakeholdt-05",
"nivaa": "viktig",
"kan": "Forklare 5-årsregelen og hvorfor den ga insentiv til å flytte",
"kort": "Nordmenn som hadde bodd i utlandet i mer enn 5 år, kunne realisere latente gevinster uten norsk skatt. Regelen opphørte fra og med 29. november 2022.",
"mer": "<p>Den latente eierinntekten i selskapene gjorde det attraktivt for svært rike å flytte, for eksempel til Sveits. Verdien av å selge aksjer og ta utbytte nær skattefritt i et lavskatteland var større enn verdien av å spare formuesskatt.<\/p><p>BS2 s. 62 foreslo å kreve 10 års utenlandsopphold i stedet for 5.<\/p><p><b>Felle:<\/b> å tro at formuesskatten var hovedgrunnen til utflyttingen.<\/p>",
"kilder": [
"F4 lb 41",
"F4 lb 42",
"BS2 s. 62"
],
"eksamen": []
},
{
"id": "f4-tilbakeholdt-06",
"nivaa": "viktig",
"kan": "Vite hvordan exit-skatten fungerer",
"kort": "Ved utflytting fastsettes exit-skatt på latent gevinst (tilbakeholdt overskudd i aksjene) med sats lik effektiv utbytteskatt, 37,84 %. Den betales ved utflytting, i rentefrie avdrag over 12 år eller i sin helhet etter 12 år.",
"mer": "<p>Exit-skatten må sees i sammenheng med oppbyggingen av latente eierinntekter: den skal hindre at gevinster som er bygget opp i Norge, realiseres skattefritt etter utflytting.<\/p><p><b>Felle:<\/b> å tro at satsen er 22 % (alminnelig inntekt) eller at den bare gjelder realiserte gevinster.<\/p>",
"kilder": [
"F4 lb 43"
],
"eksamen": []
}
]
},
{
"id": "f4-bs3",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "BS3: Er den norske aksjonærbeskatningen nøytral?",
"eksamensvekt": 2,
"viktigst": [
"Symmetrisk eierskatt: likegyldig mellom direkte og selskap, også for porteføljer",
"Asymmetrisk (Norge): blandet portefølje gjennom selskap er ulønnsomt",
"Utbyttebeslutning under symmetri: X − Z = (r<sub>1<\/sub> − i) × a × (r<sub>f<\/sub>(1 − t) − i)",
"Under asymmetri lønner det seg alltid å utsette utbytte"
],
"punkter": [
{
"id": "f4-bs3-01",
"nivaa": "viktig",
"kan": "Skille symmetrisk og asymmetrisk eierskatt",
"kort": "Symmetrisk: full skatterefusjon ved mindreavkastning når tilsvarende meravkastning ville vært skattepliktig. Asymmetrisk (Norge): gevinst over kostpris + akkumulert skjerming skattlegges, tap mot inngangsverdien gir fradrag og ubenyttet skjerming går tapt.",
"mer": "<p>Under asymmetri gir en avkastning mellom 0 og skjermingsrenten (0 &lt; r &lt; i) verken skatt eller fradrag; den ubenyttede skjermingen tapes (BS3 s. 46, ligning 8). Mindreavkastning framføres mot eventuell framtidig meravkastning.<\/p><p>Notasjon: r<sub>f<\/sub> risikofri rente, r aksjeavkastning, t selskapsskatt og sats på alminnelig inntekt, a eierskattesats, i = r<sub>f<\/sub>(1 − t) skjermingsrente.<\/p><p><b>Felle:<\/b> å tro at asymmetrien skyldes ulik sats på tap og gevinst. Satsen er den samme; det er skjermingen som tapes.<\/p>",
"kilder": [
"BS3 s. 44",
"BS3 s. 46"
],
"eksamen": []
},
{
"id": "f4-bs3-02",
"nivaa": "viktig",
"kan": "Kjenne resultatet om å investere direkte eller gjennom selskap",
"kort": "Symmetrisk eierskatt: investor er likegyldig, både for rene plasseringer og for porteføljer av aksjer og risikofritt. Asymmetrisk: fortsatt likegyldig for rene plasseringer, men en blandet portefølje gjennom selskapet er ulønnsom.",
"mer": "<p>Grunnen: investerer man direkte, får man fradrag for tap på aksjene fra første krone. Gjennom selskapet får man bare fradrag for den delen av tapet som overstiger renteinntekten i selskapet. Differansen (ligning 14) er en «bull spread» i salgsopsjoner som alltid er null eller negativ.<\/p><p>I selskapet skattlegges risikofri avkastning med t, mens aksjeavkastningen er fritatt (fritaksmetoden). Resultatet forutsetter at investoren ikke låner, eller låner til skjermingsrenten.<\/p><p><b>Felle:<\/b> å tro at asymmetrien gjør det lønnsomt å investere porteføljen gjennom selskap. Den gjør det motsatte.<\/p>",
"kilder": [
"BS3 s. 45",
"BS3 s. 46",
"BS3 s. 47"
],
"eksamen": []
},
{
"id": "f4-bs3-03",
"nivaa": "viktig",
"kan": "Kjenne resultatet for utbyttebeslutningen under symmetrisk eierskatt",
"kort": "Strategi X (vent) mot Z (ta utbytte, betal eierskatt, lånefinansier privat aksjekjøp med samme risiko): X − Z = (r<sub>1<\/sub> − i) × a × (r<sub>f<\/sub>(1 − t) − i). Null bare når a = 0 eller i = r<sub>f<\/sub>(1 − t) og investor kan låne til den renten.",
"mer": "<p>(r<sub>1<\/sub> − i) × a er eierskattekreditten fra første periode. Låner investoren dyrere enn skjermingsrenten, blir X &gt; Z: det lønner seg å holde kapitalen i selskapet, selv med symmetri og skjermingsrente lik risikofri rente etter skatt.<\/p><p>Strategi Y (ta utbytte og invester alt i aksjer privat): X = Y + (r<sub>1<\/sub> − i) × a × (r<sub>2<\/sub> − i) × (1 − a), der siste ledd er verdien av eierskattekreditten. Men Y har lavere risiko, derfor sammenligner BS med Z.<\/p><p><b>Felle:<\/b> å tro at nøytralitet bare krever riktig skjermingsrente. Den krever også at investor kan låne til skjermingsrenten.<\/p>",
"kilder": [
"BS3 s. 48",
"BS3 s. 49",
"BS3 s. 50"
],
"eksamen": []
},
{
"id": "f4-bs3-04",
"nivaa": "viktig",
"kan": "Kjenne resultatet for utbyttebeslutningen under asymmetrisk eierskatt",
"kort": "Med asymmetri lønner det seg alltid å utsette utbytte og bygge opp eierskattekreditt, også når skjermingsrenten er lik risikofri rente etter skatt. Differansen er en «butterfly spread» av fire salgsopsjoner på selskapsverdien, alltid null eller positiv.",
"mer": "<p>Er selskapsverdien lav, gir posisjonen (r<sub>1<\/sub> − i) × i &gt; 0 (BS3 s. 51). Et triks i modellen: ta skattefritt utbytte innenfor skjermingen ved t = 1 og skyt det inn igjen, så inngangsverdien for tapsberegning øker fra 1 til (1 + i).<\/p><p>Konklusjon (s. 52): aksjonærmodellen er ikke nøytral for utbyttebeslutningen, verken under asymmetri eller under symmetri når lånerenten er over skjermingsrenten. Det kan forklare oppsamlingen av kapital i selskapene.<\/p><p><b>Felle:<\/b> å blande «bull spread» (portefølje, alltid ≤ 0) og «butterfly spread» (utbytte, alltid ≥ 0).<\/p>",
"kilder": [
"BS3 s. 50",
"BS3 s. 51",
"BS3 s. 52"
],
"eksamen": []
}
]
},
{
"id": "f4-bs2",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "BS2: Aksjonærmodellen og fritaksmetoden, et to-hodet troll?",
"eksamensvekt": 2,
"viktigst": [
"Fritaksmetoden og aksjonærmodellen sammen gir en skattekreditt ved sparing i selskap",
"Kreditten er størst i etablerte selskaper med lavt skjermingsgrunnlag, altså hos de rikeste",
"Bryter både effektivitetsprinsippet og evneprinsippet",
"Formuesskatten er det eneste instrumentet for evneprinsippet overfor de aller rikeste"
],
"punkter": [
{
"id": "f4-bs2-01",
"nivaa": "viktig",
"kan": "Kunne effektivitetsprinsippet og evneprinsippet",
"kort": "Effektivitetsprinsippet: skattereglene skal i minst mulig grad påvirke hvilke investeringer som gjøres og hvordan virksomhet organiseres. Evneprinsippet: de med høyest skatteevne skal betale en høyere andel av bruttoinntekten i skatt.",
"mer": "<p>Effektivitetsprinsippet skal sikre at det investeres der avkastningen før skatt er høyest, fordi det fremmer vekst. Evneprinsippet skal redusere inntektsforskjellene etter skatt.<\/p><p>BS2 s. 60: et system der eierskattekreditten er større for etablerte enn for nystartede selskaper, er et «åpenbart brudd på effektivitetsprinsippet». At de rikeste betaler lavere gjennomsnittsskatt, bryter evneprinsippet (s. 54–55).<\/p><p><b>Felle:<\/b> å bytte om definisjonene.<\/p>",
"kilder": [
"BS2 s. 53",
"BS2 s. 54",
"BS2 s. 55",
"BS2 s. 60"
],
"eksamen": []
},
{
"id": "f4-bs2-02",
"nivaa": "viktig",
"kan": "Regne forventet eierskattekreditt for nystartet og etablert selskap",
"kort": "Kreditt = a × ((1 + r)<sup>T<\/sup> − γ(1 + i)<sup>T<\/sup>). Med r = 6 %, T = 15, i = 1,56 %, a = 31,68 %: nystartet (γ = 1) (2,40 − 1,26) × 0,3168 ≈ 0,36 kr; etablert (γ = 0,4) (2,40 − 0,50) × 0,3168 ≈ 0,60 kr.",
"mer": "<p>Skjermingsrenten er 2 % × (1 − 0,22) = 1,56 %. γ er skjermingsgrunnlaget i år 0 (kostpris pluss tidligere ubenyttet skjerming). I det etablerte selskapet er kreditten allerede (1 − 0,4) × 0,3168 = 0,19 kr i år 0; den tredobles til 0,60 kr på 15 år.<\/p><p>Kreditten er «nesten dobbelt så stor» i det etablerte selskapet (0,60 mot 0,36). Opsjonsmodellen gir 0,60 mot 0,38, «ca. 58 prosent større». Teksten skriver (2,40 − 0,40), men regner med 0,50.<\/p><p><b>Felle:<\/b> å bruke risikofri rente 2 % som skjermingsrente.<\/p>",
"kilder": [
"BS2 s. 58",
"BS2 s. 60"
],
"eksamen": []
},
{
"id": "f4-bs2-03",
"nivaa": "viktig",
"kan": "Kjenne tallene om ulikhet og regressivitet i BS2",
"kort": "Aaberge mfl. (2020): topp 1 % betalte i snitt 22 % i skatt, 90.–99. persentil 33 % og topp 0,1 % 9–17 %; selskapsinntekt er over 90 % av bruttoinntekten til topp 0,1 % og 63–80 % for topp 1 %. Gini for inntekt økte fra 0,26 (2001) til 0,35 (2018), det vil si 35 %.",
"mer": "<p>Formuesandel for topp 1 %: Norge 31 %, Storbritannia 24 %, USA ca. 38 % (Davies mfl. 2017); Aaberge og Stubhaug: 25 % i 2015. Små land kutter kapitalskattene mest (Bucovetsky 1991, Wilson 1991; Haufler mfl. 2008). Selskapsskatt i OECD 49 % (1985) til 22 % (2020); Norge 50,8 % til 28 % (1992) og 22 % (2019); arveavgiften avviklet. Moene (2015): Norge skaper flere rike og superrike.<\/p><p>BS2 s. 54 oppgir perioden for skattesatsene som 2004–2008; HBS og F5 sier 2004–2018.<\/p><p><b>Felle:<\/b> å tro at Storbritannia har skjevere formuesfordeling på toppen enn Norge.<\/p>",
"kilder": [
"BS2 s. 53",
"BS2 s. 54",
"BS2 s. 55"
],
"eksamen": []
},
{
"id": "f4-bs2-04",
"nivaa": "viktig",
"kan": "Kjenne BS' drøfting av veien videre",
"kort": "Fjernes fritaksmetoden, flytter investorene holdingselskapet til EU og gjeninnfører den i praksis; mest konsistent er et fullt imputasjonssystem (for radikalt). Pragmatisk: strengere kontroll av driftskostnader og 10 års utenlandsopphold i stedet for 5.",
"mer": "<p>Holdingselskaper i utlandet åpner for skjult privat konsum (bolig, bil, båt) som NOKUS-reglene neppe rammer. Utbytteskatt mellom selskaper krever et system som holder rede på hva som er beskattet (som RISK før 2006). I et imputasjonssystem fordeles overskuddet løpende til aksjonærene og selskapsskatten blir en forskuddsskatt.<\/p><p>Avrunding (s. 62): skattefordelen gir dynastieffekter, kan realiseres ved utflytting og gir insentiv til skjult privat konsum. Formuesskatten er «det eneste instrumentet» for evneprinsippet overfor de aller rikeste.<\/p>",
"kilder": [
"BS2 s. 60",
"BS2 s. 61",
"BS2 s. 62"
],
"eksamen": []
},
{
"id": "f4-bs2-05",
"nivaa": "detalj",
"kan": "Kjenne usikkerhetsviften og opsjonsmodellen i BS2",
"kort": "E(K) = 1,06<sup>15<\/sup> ≈ 2,40 kr per krone; median 1,98; 90 % sannsynlighet mellom 0,71 og 5,48. Nystartet selskap: kreditt 0,36 i forventning, median 0,23, 90 % mellom −0,17 og 1,34.",
"mer": "<p>Verdien er lognormalfordelt: K = (1 + r)<sup>T<\/sup> × e<sup>σ√T z − σ²T/2<\/sup> med volatilitet 16 %. Intervaller for selskapsverdien: 70 % mellom 1,04 og 3,76, 50 % mellom 1,30 og 3,00 (som usikkerhetsviften for Oljefondet).<\/p><p>Opsjonsmodellen fanger asymmetrien: forventet gevinstskatt c = 0,39 (nystartet) og 0,60 (etablert), forventet refusjon p = 0,01 og 0,00, netto 0,38 og 0,60. Den enkle formelen treffer godt fordi investoren nesten sikkert er i skatteposisjon ved horisonten.<\/p>",
"kilder": [
"BS2 s. 57",
"BS2 s. 58",
"BS2 s. 59",
"BS2 s. 60"
],
"eksamen": []
},
{
"id": "f4-bs2-06",
"nivaa": "detalj",
"kan": "Kjenne hva tidligere skatteutvalg sa om fritaksmetoden",
"kort": "NOU 2003:9 (Skaugeutvalget) boks 9.1: utbytteskatt påvirker ikke valget mellom å holde tilbake og dele ut, men eksemplet var en renteinvestering. NOU 2014:13 vurderte kreditmetode i stedet for fritaksmetoden for utenlandske aksjeinntekter, men avviste den.",
"mer": "<p>NOU 2003:9 s. 190: en utbytteskatt uten skjerming gjør det mer lønnsomt å finansiere med lån eller tilbakeholdt overskudd enn med ny aksjekapital.<\/p><p>NOU 2014:13: løpende beskatning etter bostedsprinsippet var urealistisk; en kreditmetode ville være administrativt krevende, vanskelig innenfor EØS og gi svakere vern mot kjedebeskatning.<\/p><p><b>Felle:<\/b> å tro at Skaugeutvalget tok hensyn til fritaksmetoden i eksemplet sitt.<\/p>",
"kilder": [
"BS2 s. 55",
"BS2 s. 56",
"BS2 s. 63"
],
"eksamen": []
}
]
},
{
"id": "f4-bs1",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "BS1: Investors utbyttebeslutning og formuesskatt",
"eksamensvekt": 2,
"viktigst": [
"Med formuesskatt og lån til risikofri rente: nøytral skjermingsrente i = r<sub>f<\/sub>(1 − t) − τ<sub>f<\/sub>",
"Dagens skjermingsrente er da for høy og det lønner seg å ta utbytte",
"Med realistisk lånerente lønner det seg likevel å holde kapitalen i selskapet",
"Fire modeller; BS anbefaler en særskatt på eierskattekreditten"
],
"punkter": [
{
"id": "f4-bs1-01",
"nivaa": "viktig",
"kan": "Kjenne hovedresultatet i BS1",
"kort": "X − Z = (1 − γ) × a × ((r<sub>f<\/sub>(1 − t) − τ<sub>f<\/sub>) − i), så nøytralitet krever i = r<sub>f<\/sub>(1 − t) − τ<sub>f<\/sub>: skjermingsrenten må ned med formuesskattesatsen på rentepapirer. Med dagens i = r<sub>f<\/sub>(1 − t) blir X − Z &lt; 0 og det lønner seg å ta utbytte.",
"mer": "<p>Oppsett: symmetrisk eierskatt, holdingselskap verdt 1 kr som bare eier aksjer, inngangsverdi lik skjermingsgrunnlag γ &lt; 1 (etablert selskap), formuesskatt τ<sub>f<\/sub> på rentepapirer og τ<sub>a<\/sub> på aksjer.<\/p><p>(1 − γ) × a er eierskattekreditten, r<sub>f<\/sub>(1 − t) − τ<sub>f<\/sub> er spart lånekostnad og i er skjermingen investoren gir avkall på.<\/p><p>Vedlegget: å ta utbytte, skyte det inn igjen og lånefinansiere skatten (strategi Y) gir samme resultat, så resultatet forutsetter ikke at selskapet tømmes.<\/p><p><b>Felle:<\/b> resultatet gjelder bare hvis investor kan låne til risikofri rente.<\/p>",
"kilder": [
"BS1 s. 29",
"BS1 s. 30",
"BS1 s. 34"
],
"eksamen": []
},
{
"id": "f4-bs1-02",
"nivaa": "viktig",
"kan": "Forklare hvorfor BS mener dagens skjermingsrente er for lav",
"kort": "Lånerenten r<sub>L<\/sub> er høyere enn plasseringsrenten r<sub>f<\/sub>. Da blir X − Z = (1 − γ) × a × ((r<sub>L<\/sub>(1 − t) − τ<sub>f<\/sub>) − i) &gt; 0 med dagens skjermingsrente: det lønner seg å holde kapitalen i selskapet, også med symmetrisk eierskatt og formuesskatt.",
"mer": "<p>Det forklarer den store oppbyggingen av eierskattekreditt hos investorene de siste 15 årene (BS1 s. 28).<\/p><p>Svaret på «formuesskatten tvinger fram utbytte» er derfor nei: med realistisk lånerente er det fortsatt mest lønnsomt å spare i selskapet.<\/p><p><b>Felle:<\/b> å konkludere at skjermingsrenten skal ned. Det gjelder bare hvis investor kan låne risikofritt, en forutsetning BS mener er urealistisk.<\/p>",
"kilder": [
"BS1 s. 28",
"BS1 s. 32"
],
"eksamen": []
},
{
"id": "f4-bs1-03",
"nivaa": "viktig",
"kan": "Kunne de fire modellene for nøytralitet i BS1",
"kort": "Modeller: (i) skjermingsrente r<sub>f<\/sub>(1 − t) − τ<sub>f<\/sub>; (ii) dagens skjermingsrente og eierskattekreditten som gjeld i formuesskatten; (iii) skjermingsrente r<sub>L<\/sub>(1 − t) − τ<sub>f<\/sub>; (iv) dagens skjermingsrente og særskatt θ = (r<sub>L<\/sub> − r<sub>f<\/sub>)(1 − t) − τ<sub>f<\/sub> på eierskattekreditten. BS anbefaler (iv).",
"mer": "<p>(i) passer dårlig for skattytere som ikke betaler formuesskatt. (ii) reduserer formuesskatten mest for dem med størst kreditt, de rikeste. (iii) gir trolig lavere skatteinntekter og kan øke ulikheten; dessuten har investorer ulik lånerente, så en sjablong er vanskelig. (iv) rammer dem som har tjent mest på fritaksmetoden fra 2006 og øker trolig skatteinntektene.<\/p><p>Verst er å heve skjermingsrenten og samtidig innføre kredittskatt.<\/p><p><b>Felle:<\/b> å tro at BS anbefaler høyere skjermingsrente.<\/p>",
"kilder": [
"BS1 s. 31",
"BS1 s. 32",
"BS1 s. 33"
],
"eksamen": []
},
{
"id": "f4-bs1-04",
"nivaa": "detalj",
"kan": "Kjenne tallene om formuesskatt i BS1",
"kort": "SSB 2020: 596 616 personer betalte i snitt 28 900 kr i formuesskatt, i underkant av 500 000 av dem blant de 10 % rikeste. Selskapsskatten er 4–7 % og formuesskatten 1–2 % av bruttoinntekten til de 5 % rikeste.",
"mer": "<p>Nesten alle sparebeslutninger i Norge tas av de 10 % rikeste; det er hovedsakelig de rikeste som kan velge å spare gjennom et etablert selskap (BS1 s. 33).<\/p><p>Paradokset: de som har tjent på skjevhetene, vil også tjene på at de rettes opp med en høyere skjermingsrente.<\/p><p>Tallene om selskaps- og formuesskatt for de 5 % rikeste står også på F5 lb 46 (Aaberge mfl. 2020).<\/p>",
"kilder": [
"BS1 s. 33",
"F5 lb 46"
],
"eksamen": []
}
]
},
{
"id": "f4-historikk",
"forelesning": "F4 Aksjonærmodellen og fritaksmetoden",
"tittel": "Skattereformene 1992 og 2006, delingsmodellen og oligark-øyeblikket",
"eksamensvekt": 1,
"viktigst": [
"1992: alminnelig sats 28 % på all inntekt, ingen skatt på utbytte, trinnskatt på lønn",
"Delingsmodellen: aktive eiere (minst 2/3 av aksjene) fikk tilordnet lønn, så eierne solgte seg ned",
"2006: aksjonærmodellen og fritaksmetoden, utbytteskatten varslet i 2004",
"Oligark-øyeblikket: skattefrie utbytter 2004–2005 skutt inn som EK og senere nedskrevet skattefritt"
],
"punkter": [
{
"id": "f4-historikk-01",
"nivaa": "viktig",
"kan": "Vite skattesatsene før og etter skattereformen i 1992",
"kort": "Før 1992: høyeste marginalskatt på lønn 70 %, selskapsskatt 50,8 %, høyeste utbyttesats 19,5 %. Fra 1992: alminnelig sats 28 % på lønn og kapitalinntekt, ingen skatt på utbytte og trinnskatt på toppen for lønn.",
"mer": "<p>1992-reformen innførte <b>alminnelig inntekt<\/b> med én flat sats på lønn, renter, selskapsoverskudd og aksjegevinst. Progressiviteten kom gjennom trinnskatt på personinntekt, så fordelingspolitikken ble rettet mot lønnsmottakere. I 2026 er den alminnelige satsen 22 %.<\/p><p>Utbytte var i praksis skattefritt hos personlig aksjonær fordi godtgjørelsesmetoden (utbytte) og RISK-metoden (gevinst) hindret dobbeltbeskatning (HBS s. 4).<\/p><p><b>Felle:<\/b> å tro at utbytte ble skattlagt med 28 % hos personen etter 1992. 28 % var skatten på overskuddet i selskapet.<\/p>",
"kilder": [
"F4 lb 4",
"F4 lb 5",
"HBS s. 4"
],
"eksamen": []
},
{
"id": "f4-historikk-02",
"nivaa": "viktig",
"kan": "Forklare delingsmodellen og regne tilordnet lønn",
"kort": "Aktive eiere (jobbet i bedriften og eide minst 2/3 av aksjene) fikk tilordnet lønn = overskudd − sjablongavkastning på investert kapital. Overskudd 100, kapital 1 000, sjablong 6 %: lønn 100 − 60 = 40.",
"mer": "<p>Problemet delingsmodellen skulle løse: en eier som jobbet i egen bedrift kunne ta utbytte (overskuddet var skattlagt med 28 % i selskapet) i stedet for lønn med marginalskatt over 50 %.<\/p><p>Grensen på 2/3 (66,67 %) kom fra selskapsretten: kvalifisert flertall trengs for de mest inngripende beslutningene. Schjelderup: «Juristene vant over fornuften.»<\/p><p>Bedriften betalte 28 % skatt av hele overskuddet (100). Residualen etter kapitalavkastningen var lønn.<\/p><p><b>Felle:<\/b> å svare 60. Det er kapitalavkastningen, ikke lønnen.<\/p>",
"kilder": [
"F4 lb 6",
"F4 lb 7",
"BS2 s. 60",
"HBS s. 4"
],
"eksamen": []
},
{
"id": "f4-historikk-03",
"nivaa": "viktig",
"kan": "Forklare Norgesparadokset og hvordan eierne tilpasset seg delingsmodellen",
"kort": "Eierne solgte seg ned under 2/3 (for eksempel til 67 %), beholdt kontrollen og slapp lønnsbeskatning. I 2006 var det nesten ingen aktive eiere igjen.",
"mer": "<p>Norgesparadokset: stor forskjell i skattesats mellom lønn og kapital gjorde det svært lønnsomt å omdanne arbeidsinntekt til kapitalinntekt (inntektsskifting). BS2 s. 60: inntektsskiftingen ble «meget omfattende» og førte til at man innførte fritaksmetoden og aksjonærmodellen.<\/p><p>Lysbilde 9 skriver «under grensen på 67,67 %»; grensen er 66,67 %.<\/p><p><b>Felle:<\/b> å tro at delingsmodellen traff passive eiere eller alle eiere. Den traff bare aktive eiere over 2/3.<\/p>",
"kilder": [
"F4 lb 8",
"F4 lb 9",
"F4 lb 10",
"BS2 s. 60"
],
"eksamen": []
},
{
"id": "f4-historikk-04",
"nivaa": "viktig",
"kan": "Forklare oligark-øyeblikket",
"kort": "Bondevik II varslet i 2004 utbytteskatt fra 2006. Eierne tok store skattefrie utbytter i 2004–2005, skjøt dem inn igjen som egenkapital (eller lånte dem tilbake) og kunne senere nedskrive EK og ta pengene ut skattefritt.",
"mer": "<p>Reformen ga en skattefordel til dem med «gamle penger». Schjelderup (DN): skillet mellom gamle og nye penger; entreprenører som startet etter 2006 betaler skatt alle veier. Eksempler: Rasmussen-familien tok ut nesten 1,7 mrd. kr i 2004–2005; Røkke har tatt ut over 5 mrd. kr uten utbytteskatt.<\/p><p>HBS s. 5: varselet kom våren 2004, utbyttene toppet seg i 2005 og falt fra 2005 til 2006. Før 2006 gikk nesten alle utbytter til topp 1 %; etter 2006 tar de heller ut innskutt EK.<\/p><p><b>Felle:<\/b> å tro at pengene ble investert privat. Det var den «dumme» strategien; de fleste skjøt utbyttet inn igjen som EK.<\/p>",
"kilder": [
"F4 lb 11",
"F4 lb 12",
"F4 lb 14",
"F4 lb 16",
"F4 lb 17",
"F4 lb 18",
"HBS s. 5"
],
"eksamen": []
},
{
"id": "f4-historikk-05",
"nivaa": "detalj",
"kan": "Vite skattevirkningene av innskudd og nedskrivning av egenkapital",
"kort": "Innskutt EK øker skjermingsgrunnlaget. Nedskrivning kan betales ut skattefritt, men senker skjermingsgrunnlaget (mer utbytteskatt senere) og inngangsverdien (mer gevinstskatt ved salg); netto er utsettelsen en lønnsom skattekreditt.",
"mer": "<p>Nedskrivning utsetter eierskatten: aksjonæren velger selv når skatten utløses. En utsatt skatt virker som et rentefritt lån fra staten.<\/p><p><b>Eksempel (HBS s. 5, fotnote 12):<\/b> et selskap med EK 930 000 kr kan skrive ned til lovens minimum 30 000 kr og betale ut 900 000 kr skattefritt til aksjonærene.<\/p><p><b>Felle:<\/b> å tro at nedskrivningen er skattepliktig som utbytte. Tilbakebetaling av innskutt kapital utløser ikke eierskatt (BS3 s. 50).<\/p>",
"kilder": [
"F4 lb 14",
"F4 lb 15",
"HBS s. 5",
"BS3 s. 50"
],
"eksamen": []
},
{
"id": "f4-historikk-06",
"nivaa": "detalj",
"kan": "Kjenne First Securities' advarsel mot 2006-reformen",
"kort": "First Securities vurderte reformen for Finansdepartementet (rapport 5. september 2003) og advarte: skattyter bestemmer selv når skatten utløses, noe som gir en skattekreditt.",
"mer": "<p>I det gamle systemet ble utbytte mellom selskaper skattlagt og personlig aksjonær fikk fradrag for skatt betalt av selskapet. Utbytte ble dermed i større grad skattlagt når det var opptjent.<\/p><p>DN (lb 46): «Investeringsselskaper som sparekasser». BS1 s. 33: reformen burde vært diskutert bredere og forelagt flere enn First Securities, som advarte mot den. Arven er at overskuddene i «sparebøsseselskaper» vil øke over tid.<\/p><p><b>Felle:<\/b> å tro at First Securities anbefalte reformen.<\/p>",
"kilder": [
"F4 lb 46",
"F4 lb 47",
"BS1 s. 33"
],
"eksamen": []
}
]
},
{
"id": "f5-inntektsskifting",
"forelesning": "F5 Inntektsskiftningsligningen og de rikeste",
"tittel": "Inntektsskiftningsligningen",
"eksamensvekt": 4,
"viktigst": [
"Høyeste marginalskatt på lønn + AGA = selskapsskatt + y × eierskatt (nominelle satser)",
"47,4 % + 12,4 % = 22 % + 22 % × y gir y ≈ 1,72 og eierskatt 37,84 %",
"47,4 % = 22 % + 17,8 % (trinn 5) + 7,6 % (trygdeavgift)",
"Bruk 12,4 % (andel av lønnskostnaden), ikke 14,1 %",
"Eldre eksamener brukte effektiv form: t<sub>w<\/sub> = t<sub>A<\/sub> + (1 − t<sub>A<\/sub>) × y × t<sub>e<\/sub>"
],
"punkter": [
{
"id": "f5-inntektsskifting-01",
"nivaa": "kjerne",
"kan": "Skrive opp inntektsskiftningsligningen",
"kort": "Høyeste marginalskatt på lønn + arbeidsgiveravgift = nominell selskapsskatt + nominell eierskatt × y. For 2026: 47,4 % + 12,4 % = 22 % + 22 % × y.",
"mer": "<p>På marginen skal de nominelle satsene på lønnsinntekt og kapitalinntekt være like, slik at 1 kr i lønn og 1 kr i utbytte er like lønnsomt. Da lønner det seg ikke å omdanne lønn til kapitalinntekt, for eksempel ved å ta ut bare utbytte som eier. «Alle skattene forholder seg til hverandre.»<\/p><p>F4 lb 74 og F5 lb 47: «Dere må kunne inntektsskiftningsligningen.»<\/p><p><b>Felle:<\/b> å sette selskapsskatten på lønnssiden eller å glemme den på kapitalsiden.<\/p>",
"kilder": [
"F5 lb 2",
"F5 lb 3",
"F5 lb 4",
"F4 lb 49",
"F4 lb 50",
"F5 lb 47"
],
"eksamen": []
},
{
"id": "f5-inntektsskifting-02",
"nivaa": "kjerne",
"kan": "Løse ligningen for oppjusteringsfaktoren y",
"kort": "y = (47,4 + 12,4 − 22)/22 = 37,8/22 ≈ 1,72 og eierskatt 22 % × 1,72 = 37,84 %. Kontroll: 22 + 22 × 1,72 = 59,8 = 47,4 + 12,4. Generelt y = (t<sub>w<\/sub> + a<sub>L<\/sub> − t<sub>A<\/sub> − a<sub>F<\/sub>)/t<sub>e<\/sub>.",
"mer": "<p>a<sub>L<\/sub> er delen av arbeidsgiveravgiften arbeidstakeren bærer og a<sub>F<\/sub> delen bedriften bærer (se seksjonen om arbeidsgiveravgift). Med full overvelting er a<sub>L<\/sub> = 12,4 og a<sub>F<\/sub> = 0.<\/p><p><b>H2023 o2a:<\/b> er effektiv eierskatt oppgitt, er y = effektiv / nominell eierskatt: 30 %/20 % = 1,5.<\/p><p><b>Felle:<\/b> å glemme arbeidsgiveravgiften: (47,4 − 22)/22 ≈ 1,15. Det er også svaret ved 50/50-deling, fordi 6,2 da står på begge sider.<\/p>",
"kilder": [
"F5 lb 4",
"F5 lb 5",
"F4 lb 50",
"F4 lb 51"
],
"eksamen": [
"H2023 o2a"
]
},
{
"id": "f5-inntektsskifting-03",
"nivaa": "kjerne",
"kan": "Vite hva høyeste marginalskatt på lønn består av i 2026",
"kort": "47,4 % = 22 % alminnelig inntektsskatt + 17,8 % trinnskatt (trinn 5) + 7,6 % trygdeavgift. Arbeidsgiveravgiften kommer i tillegg.",
"mer": "<p>F5 lb 3 og F4 lb 49 bruker 2026-satsene. F4 lb 51 bruker eldre satser: 22 + 7,8 + 17,6 = 47,5 %. F5 lb 5–7 skriver 17,6 i summene, men regner med 47,4 (som krever 17,8).<\/p><p>Til eksamen: 47,4 % med 22 + 17,8 + 7,6.<\/p><p><b>Felle:<\/b> å ta med arbeidsgiveravgiften i 47,4 %, eller å bruke trygdeavgiften for næringsinntekt.<\/p>",
"kilder": [
"F5 lb 3",
"F4 lb 49",
"F4 lb 51"
],
"eksamen": []
},
{
"id": "f5-inntektsskifting-04",
"nivaa": "kjerne",
"kan": "Forklare hvorfor ligningen bruker 12,4 % og ikke 14,1 %",
"kort": "Arbeidsgiveravgiften er 14,1 % av utbetalt lønn, men 12,4 % av bedriftens samlede lønnskostnad: 100 kr = 87,6 kr lønn + 12,4 kr avgift; 12,4/87,6 = 14,1 %. Ligningen bruker 12,4 %.",
"mer": "<p>Bedriften setter av 100 kr til lønn og avgift. Det er denne kronen som skal sammenlignes med en krone overskudd, derfor brukes avgiften som andel av den totale kostnaden.<\/p><p><b>Felle:<\/b> 47,4 + 14,1 = 22 + 22y gir y ≈ 1,80 og eierskatt ≈ 39,5 %. F5 lb 3 skriver «14,1 %» i anførselstegn og «mer om dette senere».<\/p>",
"kilder": [
"F5 lb 3",
"F5 lb 9",
"F4 lb 52"
],
"eksamen": []
},
{
"id": "f5-inntektsskifting-05",
"nivaa": "kjerne",
"kan": "Vite at summen 59,8 % er nominell og ikke en effektiv skatt",
"kort": "59,8 % = 59,8 % er nominelle satser lagt sammen, ikke den effektive skatten på høy lønn eller for eiere. Effektiv samlet sats på utdelt overskudd er 22 % + 78 % × 37,84 % = 51,5 %.",
"mer": "<p>F5 lb 5: «Dette er nominelle satser lagt sammen, det betyr ikke at dette er den effektive skatten på høy lønn og eiere av bedriften.»<\/p><p>Den nominelle formen legger 22 % og 37,84 % rett sammen, mens den effektive formen lar eierskatten treffe bare de 78 % som er igjen etter selskapsskatt.<\/p><p><b>Felle:<\/b> å svare at en eier betaler 59,8 % i skatt.<\/p>",
"kilder": [
"F5 lb 5",
"F5 lb 27"
],
"eksamen": []
},
{
"id": "f5-inntektsskifting-06",
"nivaa": "kjerne",
"kan": "Kjenne igjen den effektive formen fra eldre eksamener",
"kort": "H2017 og H2020 brukte t<sub>w<\/sub> = t<sub>A<\/sub> + (1 − t<sub>A<\/sub>) × t<sub>e<\/sub> × y. H2020 o1e: 0,47 = 0,22 + y × 0,78 × 0,2 gir y ≈ 1,6 og eierskatt 32 %; H2017 o2a: y = (0,467 − 0,24)/(0,76 × 0,23) ≈ 1,3 og 29,9 %.",
"mer": "<p>Bruk den effektive formen når oppgaven sier at marginalskatten på arbeid skal være lik <b>effektiv skatt på bedrift og eier<\/b> og at hele overskuddet tas ut. Bruk den nominelle formen når den sier at marginalskatten på lønn inkludert arbeidsgiveravgift skal være lik skatten på selskapet pluss eierskatten (F5).<\/p><p><b>Felle:<\/b> å blande formene. Med den nominelle formen ville H2020 gitt (47 − 22)/20 = 1,25, som er feil der.<\/p>",
"kilder": [
"F5 lb 4",
"F5 lb 5"
],
"eksamen": [
"H2020 o1e",
"H2017 o2a"
]
},
{
"id": "f5-inntektsskifting-07",
"nivaa": "kjerne",
"kan": "Regne hele kjeden når y er gitt av effektiv og nominell eierskatt",
"kort": "H2023 o2: effektiv eierskatt 30 %, nominell 20 %: y = 1,5. Overskudd 200 000, selskapsskatt 20 %: utbytte 160 000; oppjustert 160 000 × 1,5 = 240 000; eierskatt 48 000; samlet (40 000 + 48 000)/200 000 = 44 %.",
"mer": "<p>Skjermingsfradraget var fjernet i oppgaven, så hele utbyttet skattlegges.<\/p><p>Gale alternativer: o2a 1,6, 2 og 1,4; o2b 160 000, 250 000 og 170 000; o2c 45 %, 51,5 % og 47,5 %.<\/p><p><b>Felle:<\/b> å svare 160 000 (utbyttet før oppjustering) i o2b, eller 51,5 % (2026-tallet) i o2c.<\/p>",
"kilder": [
"F4 lb 64"
],
"eksamen": [
"H2023 o2a",
"H2023 o2b",
"H2023 o2c"
]
},
{
"id": "f5-inntektsskifting-08",
"nivaa": "viktig",
"kan": "Forklare valget mellom utbytte og lønn for en eier",
"kort": "Med y = 1,72 er det på marginen like lønnsomt å ta ut 1 kr som lønn og som utbytte (59,8 % på begge sider). Er eierskatten lavere enn ligningen tilsier, lønner det seg å ta utbytte i stedet for lønn.",
"mer": "<p><b>Eget tall:<\/b> uten oppjustering (y = 1) ville kapitalsiden vært 22 % + 22 % = 44 % mot 59,8 % på lønn, så eiere ville tatt utbytte.<\/p><p>Det var akkurat det som skjedde fra 1992 til 2006: lønn hadde marginalskatt over 50 %, utbytte var skattefritt hos personen og eierne solgte seg ned under 2/3 for å slippe delingsmodellen.<\/p><p><b>Felle:<\/b> å tro at ligningen skal gjøre lønn og utbytte like i gjennomsnittsskatt. Den gjelder marginen og høyeste sats.<\/p>",
"kilder": [
"F4 lb 20",
"F4 lb 49",
"F4 lb 10"
],
"eksamen": []
}
]
},
{
"id": "f5-aga",
"forelesning": "F5 Inntektsskiftningsligningen og de rikeste",
"tittel": "Hvem bærer arbeidsgiveravgiften",
"eksamensvekt": 4,
"viktigst": [
"Ligningen forutsetter at arbeidstaker bærer hele AGA (full overvelting)",
"Arbeidstakers del på lønnssiden, bedriftens del på utbyttesiden sammen med selskapsskatten (F5 lb 10)",
"Full: y ≈ 1,72 (37,84 %). 50/50: y ≈ 1,15 (25,3 %). Bedriften alt: y ≈ 0,6 (13,2 %)",
"Hvert prosentpoeng bedriften bærer, senker y med 2/22 ≈ 0,09",
"Empiri: Norge 15–30 % overvelting; Gavrilova: full via bonus og overtid"
],
"punkter": [
{
"id": "f5-aga-01",
"nivaa": "kjerne",
"kan": "Forklare forutsetningen om full overvelting",
"kort": "Ligningen forutsetter at arbeidsgiveravgiften er en skatt på lønn som bæres i sin helhet av lønnsmottakeren: bedriften betaler den inn, men lønnen presses ned med hele avgiften.",
"mer": "<p>Skill mellom hvem som <b>betaler inn<\/b> avgiften (bedriften, formelt) og hvem som <b>bærer<\/b> den (arbeidstakeren hvis lønnen presses ned). Presses lønnen ned med hele avgiften, er den en del av skatten på lønn og står på lønnssiden.<\/p><p>Presses lønnen ikke ned, bærer bedriften avgiften selv. Da er den en ekstra skatt på bedriften og hører hjemme på kapitalsiden.<\/p><p><b>Felle:<\/b> å tro at den som betaler inn avgiften, også bærer den.<\/p>",
"kilder": [
"F5 lb 9",
"F4 lb 52"
],
"eksamen": []
},
{
"id": "f5-aga-02",
"nivaa": "kjerne",
"kan": "Bruke konvensjonen for delt arbeidsgiveravgift (F5 lb 10)",
"kort": "Delen arbeidstaker bærer (a<sub>L<\/sub>) føres på lønnssiden, delen bedriften bærer (a<sub>F<\/sub>) på utbyttesiden sammen med selskapsskatten: 47,4 % + a<sub>L<\/sub> = 22 % + a<sub>F<\/sub> + 22 % × y, med a<sub>L<\/sub> + a<sub>F<\/sub> = 12,4 %.",
"mer": "<p>Løst: y = (47,4 + a<sub>L<\/sub> − 22 − a<sub>F<\/sub>)/22. Hvert prosentpoeng som flyttes fra arbeidstaker til bedrift, forsvinner fra venstre side og dukker opp på høyre side, så y faller med 2/22 ≈ 0,09.<\/p><p><b>Feller:<\/b> (1) å droppe bedriftens del: 47,4 + 6,2 = 22 + 22y gir y ≈ 1,44 (31,6 %). (2) å sette bedriftens del på lønnssiden: 47,4 + 12,4 gir 1,72 igjen. (3) å bruke 14,1 % i stedet for 12,4 %.<\/p>",
"kilder": [
"F5 lb 10"
],
"eksamen": []
},
{
"id": "f5-aga-03",
"nivaa": "kjerne",
"kan": "Regne y og eierskatt ved full overvelting",
"kort": "47,4 + 12,4 = 22 + 22y gir y = 37,8/22 ≈ 1,72 og eierskatt 37,84 %. Dette er dagens regel.",
"mer": "<p>Arbeidstakeren bærer hele avgiften (a<sub>L<\/sub> = 12,4, a<sub>F<\/sub> = 0). Kontroll: 59,8 = 59,8.<\/p><p>Det er denne forutsetningen Schjelderup mener empirien ikke støtter, slik at eierskatten kan være satt for høyt.<\/p><p><b>Felle:<\/b> å svare 1,8 (bruker 14,1 %) eller 1,15 (glemmer avgiften).<\/p>",
"kilder": [
"F5 lb 10",
"F4 lb 53"
],
"eksamen": []
},
{
"id": "f5-aga-04",
"nivaa": "kjerne",
"kan": "Regne y og eierskatt når arbeidsgiveravgiften deles 50/50",
"kort": "47,4 + 6,2 = 22 + 6,2 + 22y gir y = 25,4/22 ≈ 1,15 og eierskatt 22 % × 1,15 ≈ 25,3 % (uavrundet 25,4 %).",
"mer": "<p>6,2 står på begge sider og faller bort, så y = (47,4 − 22)/22.<\/p><p><b>Avvik:<\/b> F4 lb 53 i 2026-settet skriver samme ligning, men oppgir y ≈ 0,8 og 17,6 %. Det er en regnefeil. F5 lb 10 (1,15 og 25,3 %) gjelder.<\/p><p><b>Feller:<\/b> 0,8 og 17,6 % (fra F4 lb 53); 1,44 og 31,6 % (bedriftens 6,2 er droppet); 1,72 (full overvelting).<\/p>",
"kilder": [
"F5 lb 10",
"F4 lb 53"
],
"eksamen": []
},
{
"id": "f5-aga-05",
"nivaa": "kjerne",
"kan": "Regne y og eierskatt når bedriften bærer hele arbeidsgiveravgiften",
"kort": "47,4 = 22 + 12,4 + 22y gir y = 13,0/22 ≈ 0,59 (lysbildet 0,6) og eierskatt ≈ 13 % (lysbildet 22 % × 0,6 = 13,2 %).",
"mer": "<p>Ingen avgift på lønnssiden, hele 12,4 på kapitalsiden. Da blir oppjusteringsfaktoren under 1, altså lavere eierskatt enn 22 %.<\/p><p>Lysbildet runder y til 0,6 før det ganger med 22 %, derfor 13,2 % og ikke 13,0 %. Begge kan stå som alternativ; velg det nærmeste.<\/p><p><b>Felle:<\/b> å føre avgiften på begge sider (47,4 + 12,4 = 22 + 12,4 + 22y), som gir 1,15, eller å svare 1,72 fordi avgiften «står i ligningen» uansett.<\/p>",
"kilder": [
"F5 lb 10",
"F4 lb 53"
],
"eksamen": []
},
{
"id": "f5-aga-06",
"nivaa": "viktig",
"kan": "Regne y for en vilkårlig deling av arbeidsgiveravgiften",
"kort": "Generelt y = (47,4 + a<sub>L<\/sub> − 22 − a<sub>F<\/sub>)/22. Bærer arbeidstakeren 30 % (3,72): y ≈ 0,93 og eierskatt ≈ 20,4 %. Bærer arbeidstakeren 70 % (8,68): y ≈ 1,38 og eierskatt ≈ 30,4 %.",
"mer": "<p><b>Eget talleksempel<\/b> etter konvensjonen på F5 lb 10. Lysbildet regner ikke 30/70, men sier at 50/50 eller 30/70 gir en betydelig lettelse av eierbeskatningen (F5 lb 12).<\/p><p>Empiriens 15–30 % overvelting på arbeidstaker gir y mellom ca. 0,76 og 0,93, altså eierskatt rundt 17–20 %.<\/p><p><b>Felle:<\/b> å blande hvem som bærer 30 % og hvem som bærer 70 %. Les hvilken andel som veltes over på arbeidstakeren.<\/p>",
"kilder": [
"F5 lb 10",
"F5 lb 11",
"F5 lb 12"
],
"eksamen": []
},
{
"id": "f5-aga-07",
"nivaa": "viktig",
"kan": "Kjenne empirien om overvelting av arbeidsgiveravgiften",
"kort": "Norge: Dale-Olsen (2018), Ku mfl. (2020) og Stokke (2021) finner 15–30 % overvelting på arbeidstakerne; Sverige (Bennmarker mfl. 2009) ≈ 25 %; Finland ≈ 50 % (Korkeamäki og Uusitalo 2009) eller ingen (Benzarti og Harju 2021).",
"mer": "<p>Gavrilova mfl. (2023): kontraktslønn 20–50 % (upresist), full lønn ≈ full overvelting.<\/p><p>Kilde for sammenligningen er Gavrilova, Langørgen og Zoutman (2023) s. 27. Stolpelengdene på lysbildet er indikative, ikke en felles skala. «Hva sier empirien; det er den som burde avgjøre.»<\/p><p><b>Felle:<\/b> å tro at empirien støtter full overvelting generelt. Bare Gavrilova på full lønn gjør det.<\/p>",
"kilder": [
"F5 lb 10",
"F5 lb 11",
"F4 lb 54"
],
"eksamen": []
},
{
"id": "f5-aga-08",
"nivaa": "viktig",
"kan": "Kjenne Gavrilova, Langørgen og Zoutman (2023)",
"kort": "Naturlig eksperiment: sone 1a fikk arbeidsgiveravgiften hevet fra 10,6 % til 14,1 % i 2004. Kontraktslønn: 20–50 % overvelting, upresist. Full lønn (bonus, overtid, tillegg): nær full overvelting.",
"mer": "<p>Metode: event-study/DiD og en ny «dynamic causal forest»-metode på lønnsregisterdata 2002–2008.<\/p><p>Konklusjon: avgiften veltes over gjennom «incidental payments», ikke gjennom grunnlønnen. Effekten er konsentrert i store bedrifter: bedrifter som betaler bonus, viser full overvelting, mens bedrifter uten bonus viser nær null. Konfidensintervallene for kontraktslønn kan ikke utelukke null.<\/p><p>Står bare i F4 (lb 55), ikke i F5.<\/p>",
"kilder": [
"F4 lb 55"
],
"eksamen": []
},
{
"id": "f5-aga-09",
"nivaa": "viktig",
"kan": "Forklare politikkimplikasjonen av delt arbeidsgiveravgift",
"kort": "Deles avgiften 50/50 eller 30/70, er eierskatten satt for høyt, noe som tilsier en betydelig lettelse av eierbeskatningen. «Skattekommisjonen burde sett på dette!»",
"mer": "<p>Lavere eierskatt kan redusere opphopningen av latente eierskatter i selskapene (F4 lb 56). Arbeidsgiveravgiften kan også delvis veltes over på prisene bedriften tar (F5 lb 12).<\/p><p><b>Felle:<\/b> å tro at delt avgift tilsier høyere eierskatt. Jo mer bedriften bærer, desto lavere eierskatt krever ligningen.<\/p>",
"kilder": [
"F5 lb 12",
"F4 lb 56"
],
"eksamen": []
}
]
},
{
"id": "f5-satsendringer",
"forelesning": "F5 Inntektsskiftningsligningen og de rikeste",
"tittel": "Når en sats i ligningen endres",
"eksamensvekt": 3,
"viktigst": [
"Høyere skatt på lønnssiden gir høyere y og eierskatt",
"Høyere selskapsskatt gir lavere y og eierskatt",
"Lik endring i alminnelig sats på begge sider gir uendret y",
"Varslet høyere eierskatt: ta utbytte nå"
],
"punkter": [
{
"id": "f5-satsendringer-01",
"nivaa": "kjerne",
"kan": "Regne ny y når trygdeavgiften øker til 10 %",
"kort": "22 + 10 + 17,8 + 12,4 = 22 + 22y gir y ≈ 1,83 og eierskatt 1,83 × 22 % = 40,26 % (uavrundet 40,2 %). «Vi tar mer utbytte nå i stedet for neste år!»",
"mer": "<p>Eksempelet er en økning på grunn av eldrebølgen. Høyere skatt på lønn krever høyere eierskatt for å hindre inntektsskifting.<\/p><p>Insentivet: ventes eierskatten å stige, lønner det seg å fremskynde utbyttet. HBS s. 5: utbyttene økte i 2005 (før utbytteskatten i 2006) og i 2014–2015 (før økningen fra 27 % til 31,7 %).<\/p><p>Lysbildet skriver 17,6 i summen, men regner med 49,8 % (krever 17,8).<\/p><p><b>Felle:<\/b> å tro at høyere lønnsskatt senker eierskatten.<\/p>",
"kilder": [
"F5 lb 6",
"HBS s. 5"
],
"eksamen": []
},
{
"id": "f5-satsendringer-02",
"nivaa": "kjerne",
"kan": "Regne ny y når selskapsskatten senkes til 20 % og lønnsskatten beholdes",
"kort": "47,4 + 12,4 = 20 + 22y gir y ≈ 1,81 (lysbildet 1,8) og eierskatt ≈ 39,8 % (lysbildet 1,8 × 22 % = 39,6 %).",
"mer": "<p>Lysbildet runder y til 1,8 før det ganger med 22 %, derfor 39,6 % og ikke 39,8 %.<\/p><p><b>Felle:<\/b> å endre satsen på lønnssiden også. Her beholdes 22 % på lønn.<\/p>",
"kilder": [
"F5 lb 7"
],
"eksamen": []
},
{
"id": "f5-satsendringer-03",
"nivaa": "kjerne",
"kan": "Regne y når den alminnelige satsen senkes til 20 % for både lønn og selskap",
"kort": "20 + 7,6 + 17,8 + 12,4 = 20 + 22y gir y ≈ 1,72, uendret, fordi endringen står på begge sider.",
"mer": "<p>Lysbildet beholder 22 % som nominell eierskatt i y-leddet («y = 1,72 (uforandret)»). Poenget: senkes skatten på alminnelig inntekt like mye for lønn og selskap, påvirker det ikke balansen mellom lønn og utbytte.<\/p><p><b>Felle:<\/b> bruker en oppgave 20 % også som nominell eierskattesats, blir y = 37,8/20 = 1,89. Den effektive eierskatten blir likevel 37,8 %. Følg tallene i oppgaven.<\/p>",
"kilder": [
"F5 lb 7"
],
"eksamen": []
},
{
"id": "f5-satsendringer-04",
"nivaa": "kjerne",
"kan": "Regne ny y når selskapsskatten heves til 24 %",
"kort": "47,4 + 12,4 = 24 + 22y gir y ≈ 1,63 (lysbildet 1,62) og eierskatt ≈ 35,8 % (lysbildet 35,64 %). «Går skatten på bedriften opp, går eierskatten ned for å kompensere.»",
"mer": "<p>Et mindretall i skatteutvalget i 2022 ville heve selskapsskatten til 24 %; skattekommisjonen ville ikke det.<\/p><p>Norge kan «slakke» på ligningen ved å tolerere noen få prosentpoeng forskjell mellom skatt på lønn og kapital. Det gir større frihet uten at det blir inntektsskifting.<\/p><p><b>Felle:<\/b> å tro at høyere selskapsskatt gir høyere eierskatt.<\/p>",
"kilder": [
"F5 lb 8"
],
"eksamen": []
},
{
"id": "f5-satsendringer-06",
"nivaa": "viktig",
"kan": "Forutsi retningen på y når en sats endres",
"kort": "y = (lønnssiden − t<sub>A<\/sub> − a<sub>F<\/sub>)/t<sub>e<\/sub>: høyere trinnskatt, trygdeavgift eller avgift båret av arbeidstaker øker y, mens høyere selskapsskatt eller større avgiftsandel på bedriften senker y. Endres t<sub>e<\/sub>, endres y slik at y × t<sub>e<\/sub> blir det samme.",
"mer": "<p>Det er produktet y × t<sub>e<\/sub> (effektiv nominell eierskatt) som må gå opp eller ned for å balansere ligningen.<\/p><p><b>Eksempel:<\/b> 59,8 − 22 = 37,8. Med t<sub>e<\/sub> = 22 % er y = 1,72; med t<sub>e<\/sub> = 20 % er y = 1,89. Begge gir eierskatt 37,8 %.<\/p><p><b>Felle:<\/b> å tro at en lavere nominell eierskatt gir lavere skatt på utbytte. Den motvirkes av høyere y.<\/p>",
"kilder": [
"F5 lb 4",
"F5 lb 6",
"F5 lb 7",
"F5 lb 8"
],
"eksamen": []
}
]
},
{
"id": "f5-aert",
"forelesning": "F5 Inntektsskiftningsligningen og de rikeste",
"tittel": "Nominelle, effektive og marginale skattesatser og nøytralitet",
"eksamensvekt": 3,
"viktigst": [
"Nominell sats = lovvedtatt (22 %); AERT = betalt skatt / brutto inntekt før skatt",
"AERT er vanligvis under 22 % (avskrivninger, framførbart underskudd)",
"Eier: AERT = (personskatt + α × selskapsskatt)/(personinntekt + α × selskapsinntekt)",
"Nøytralitet krever β = 1: alt utgiftsføres straks"
],
"punkter": [
{
"id": "f5-aert-01",
"nivaa": "kjerne",
"kan": "Skille nominell, effektiv og marginal skattesats",
"kort": "Nominell sats er den lovvedtatte (22 %); AERT er faktisk betalt skatt i prosent av brutto inntekt før skatt, målt bakover i tid. Marginal eierskatt er skatten på én ekstra krone inntekt når både selskapsskatt og utbytteskatt tas med.",
"mer": "<p>Det er forskjell på effektiv skatt og marginal skatt: AERT er en gjennomsnittssats, mens den marginale eierskatten er 51,5 % (nominelt, alt utdelt).<\/p><p><b>Felle:<\/b> å tro at AERT og marginalskatt er det samme, eller at AERT er en framtidig sats.<\/p>",
"kilder": [
"F5 lb 15",
"F4 lb 59"
],
"eksamen": []
},
{
"id": "f5-aert-02",
"nivaa": "kjerne",
"kan": "Regne AERT for en bedrift",
"kort": "AERT = betalt skatt / brutto inntekt (årsresultat før skatt), uten skattefordringer som ikke er betalt. Den er vanligvis lavere enn 22 % fordi skattemessige og virkelige kostnader avviker og fordi framførbare underskudd påvirker skatten.",
"mer": "<p>AERT er selskapsspesifikk: selskaper har ulike eiendeler med ulike avskrivningssatser og gode og dårlige år, så den varierer fra år til år.<\/p><p><b>H2025 o5:<\/b> inntekt 100 000, avskrivning 25 000: skatt 75 000 × 22 % = 16 500; AERT 16 500/100 000 = 16,5 % (gale: 22 %, 20,5 %, 18,4 %).<\/p><p>HBS s. 7: AETR = betalt selskapsskatt/(årsresultat + betalt selskapsskatt); snitt 13,1 % for 2004–2018.<\/p><p><b>Felle:<\/b> å dele på skattepliktig overskudd. Da får man alltid 22 %.<\/p>",
"kilder": [
"F5 lb 16",
"F4 lb 60",
"HBS s. 7"
],
"eksamen": [
"H2025 o5"
]
},
{
"id": "f5-aert-03",
"nivaa": "kjerne",
"kan": "Regne printer-eksempelet (AERT mot nominell sats)",
"kort": "Inntekt 300 000 og printer 100 000: full avskrivning gir skatt 44 000 og AERT ≈ 14,7 %; saldoavskrivning 30 % gir fradrag 30 000, skatt 59 400 og AERT 19,8 %. Begge er under 22 %.",
"mer": "<p>Lysbildene skriver 14,6 % (og F4 lb 61 sier 15,4 % i merknaden), men 44 000/300 000 = 14,67 %.<\/p><p>Avviker virkelig kapitalslit fra avskrivningssatsen, får vi en skattekile som påvirker atferd og effektiv gjennomsnittsskatt (F4 lb 61).<\/p><p><b>Felle:<\/b> å tro at full avskrivning gir høyere AERT. Den gir lavest skatt i år 1.<\/p>",
"kilder": [
"F5 lb 17",
"F4 lb 61"
],
"eksamen": [
"H2025 o5"
]
},
{
"id": "f5-aert-04",
"nivaa": "kjerne",
"kan": "Utlede når selskapsskatten er nøytral (β-kilen)",
"kort": "Skattepliktig overskudd π<sub>t<\/sub> = px − βc(x), virkelig π<sub>v<\/sub> = px − c(x); maksimering av π<sub>v<\/sub> − tπ<sub>t<\/sub> gir p(1 − t) = c′(x)(1 − tβ), altså p = c′(x) × (1 − tβ)/(1 − t). Skatten er nøytral bare når β = 1.",
"mer": "<p>β er andelen av kostnaden som kommer til fradrag målt i <b>nåverdi<\/b> (0 ≤ β ≤ 1), ikke en avskrivningssats (talernotatet). β = 1: kilen er 1 og p = c′(x), skatten treffer bare ren profitt. β &lt; 1: kilen er over 1, p &gt; c′(x) og bedriften produserer og investerer for lite. β &gt; 1 (fradrag for mer enn virkelig kostnad) senker marginalkostnaden.<\/p><p>Samme struktur som H2025 o7a: F′(K) = r(1 − At)/(1 − t) når bare andelen A av rentene kan trekkes fra.<\/p><p><b>Felle:<\/b> å tro at en lavere sats t alene gjør skatten nøytral.<\/p>",
"kilder": [
"F5 lb 18",
"F5 lb 19",
"F5 lb 20",
"F4 lb 62"
],
"eksamen": [
"H2025 o7a"
]
},
{
"id": "f5-aert-05",
"nivaa": "kjerne",
"kan": "Regne AERT for en eier med selskapsinntekt (Anne og Bjørn)",
"kort": "Eier: AERT = (personskatt + α × selskapsskatt)/(personinntekt + α × selskapsinntekt); Bjørn: (60 000 + 1 100 000)/(300 000 + 5 000 000) ≈ 21,9 % mot 20 % på personnivå. Anne (lønnstaker): 320 000/1 000 000 = 32 %.",
"mer": "<p>α er eierandelen (her 1). Bjørn har 5 mill. i skattepliktig selskapsinntekt og betaler 1,1 mill. i selskapsskatt (22 %). På personnivå ser han ut til å betale 20 %.<\/p><p><b>H2020 o1d:<\/b> Anette eier hele bedriften: (44 000 + 16 000)/100 000 = 60 %.<\/p><p><b>Felle:<\/b> 1 160 000/5 000 000 = 23,2 % (personinntekten glemt i nevneren), eller å stoppe på 20 %.<\/p>",
"kilder": [
"F5 lb 23",
"F5 lb 24",
"F5 lb 25",
"F4 lb 63"
],
"eksamen": [
"H2020 o1d"
]
},
{
"id": "f5-aert-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor personskatten alene måler eierens skatt feil",
"kort": "For en lønnstaker skattlegges all inntekt på personnivå, men for en eier ligger mye av inntekten som tilbakeholdt overskudd i selskapet, der bare selskapsskatt er betalt. Måler man bare personnivået, måler man skatten på en brøkdel av inntekten.",
"mer": "<p>AERT for eier løser dette ved å legge eierens andel av selskapets skatt og inntekt i både teller og nevner (samme metode som Aaberge mfl. 2020, BS2 s. 54).<\/p><p>Husk at aksjonæren eier bedriftens overskudd.<\/p><p><b>Felle:<\/b> å tro at en eier med lav lønn betaler lite skatt bare fordi personskatten er lav.<\/p>",
"kilder": [
"F5 lb 22",
"F5 lb 23",
"BS2 s. 54"
],
"eksamen": []
},
{
"id": "f5-aert-07",
"nivaa": "viktig",
"kan": "Kunne de tre forbeholdene ved AERT-målet for eiere",
"kort": "(1) Latent utbytteskatt på tilbakeholdt overskudd er ikke med, fordi AERT måler betalt skatt; (2) formuesskatten er holdt utenfor; (3) eierandelen α må kunne fastsettes, noe som er vanskelig ved indirekte eierskap gjennom holdingselskaper.",
"mer": "<p>Målet er likevel den beste sammenligningen vi har mellom lønnstakere og eiere.<\/p><p>HBS s. 14 drøfter det samme: kritikere vil trekke en «potensiell utbytteskatt» fra tilbakeholdt overskudd, men ingen vet om eller hvordan den kommer, så Aaberge mfl. trekker den ikke fra.<\/p>",
"kilder": [
"F5 lb 26",
"HBS s. 14"
],
"eksamen": []
},
{
"id": "f5-aert-08",
"nivaa": "viktig",
"kan": "Kunne lærdommene om avskrivning og nøytralitet",
"kort": "Satsen alene sier lite, fordi kombinasjonen av t og β avgjør vridningen: avskrivningsregler er investeringspolitikk. Avskrivninger lavere enn kapitalslitet er en skatt på bedriften, så politikerne kan øke skatten via grunnlaget uten å endre 22 %.",
"mer": "<p>Nøytralitet er referansepunktet: skattene bør ikke påvirke salg og investeringer.<\/p><p><b>H2024 o3:<\/b> avskriv alt med en gang: 100 000 × 22 % = 22 000 nå er mer verdt enn nåverdien av 10 × 2 200 ved 10 % (ca. 13 518). <b>H2020 o1a:<\/b> samme svar, særlig når inntekten overstiger investeringen.<\/p><p><b>Felle:<\/b> å svare at det ikke spiller noen rolle fordi summen av fradragene er den samme.<\/p>",
"kilder": [
"F5 lb 21",
"F4 lb 61"
],
"eksamen": [
"H2024 o3",
"H2020 o1a"
]
}
]
},
{
"id": "f5-rikeste",
"forelesning": "F5 Inntektsskiftningsligningen og de rikeste",
"tittel": "De rikeste og AERT-modellen",
"eksamensvekt": 2,
"viktigst": [
"Topp 1 %: lite lønn, lite eiendom, mye aksjer, 2/3 av formuen i unoterte aksjer",
"V = 100/0,1222 ≈ 818; unotert formuesverdi 35 % ≈ 286",
"AERT: børsnotert 24,7 %, unotert 18,1 %, portefølje 20,3 %",
"Aaberge: topp 1 % 22 %, topp 0,1 % 9–17 %",
"Verdsettelsen av unoterte aksjer er mekanismen"
],
"punkter": [
{
"id": "f5-rikeste-01",
"nivaa": "kjerne",
"kan": "Regne selskapsverdien som brukes i modellen",
"kort": "V = X/r = 100/0,1222 ≈ 818 kr. 12,22 % er realavkastningen på norske aksjer etter 1980 (Jordà mfl., QJE 2019). Med vekst g blir V = X/(r − g).",
"mer": "<p>Formelen forutsetter konstant realinntekt uten vekst; realrente og realinntekt må følges ad.<\/p><table><tr><th>r<\/th><th>Markedsverdi<\/th><th>Formuesverdi 35 %<\/th><\/tr><tr><td>6 %<\/td><td>1 667<\/td><td>583<\/td><\/tr><tr><td>8 %<\/td><td>1 250<\/td><td>438<\/td><\/tr><tr><td>10 %<\/td><td>1 000<\/td><td>350<\/td><\/tr><tr><td>12,22 %<\/td><td>818<\/td><td>286<\/td><\/tr><\/table><p>Faller r fra 12,22 % til 6 %, dobles formuesverdien. Høyt avkastningskrav gir lav formuesverdi, lav formuesskatt og lavere AERT.<\/p><p><b>Felle:<\/b> å bruke nominell rente eller å legge til vekst.<\/p>",
"kilder": [
"F5 lb 36",
"F5 lb 37",
"F4 lb 70",
"HBS s. 9"
],
"eksamen": []
},
{
"id": "f5-rikeste-02",
"nivaa": "kjerne",
"kan": "Regne AERT for eier av et børsnotert selskap",
"kort": "Formuesverdi 818 × 0,8 ≈ 654; formuesskatt 654 × 1,1 % ≈ 7,2; utbytte 7,2/(1 − 0,3784) ≈ 11,6; utbytteskatt ≈ 4,4; faktisk selskapsskatt 13,1. AERT = (13,1 + 7,2 + 4,4)/100 = 24,7 %. Med formell sats 22 %: 33,6 %.",
"mer": "<p>Forutsetninger: investoren eier et selskap som tjener 100 i året, har ingen gjeld, tar bare utbytte for å betale formuesskatten og betaler formuesskatt, utbytteskatt og selskapsskatt. Skjermingen er sett bort fra.<\/p><p>13,1 % er AERT for norske selskaper (Hopland mfl. 2024).<\/p><p><b>Felle:<\/b> å bruke 22 % selskapsskatt (gir 33,6 %), eller å dele formuesskatten på 0,78 i stedet for 0,6216.<\/p>",
"kilder": [
"F5 lb 35",
"F5 lb 38",
"F4 lb 69",
"F4 lb 71"
],
"eksamen": []
},
{
"id": "f5-rikeste-03",
"nivaa": "kjerne",
"kan": "Regne AERT for eier av et unotert selskap",
"kort": "Formuesverdi 818 × 35 % ≈ 286,3; formuesskatt 286,3 × 1,1 % ≈ 3,1; utbytte 3,1/(1 − 0,3784) ≈ 5; utbytteskatt ≈ 1,9. AERT = (13,1 + 3,1 + 1,9)/100 = 18,1 %. Med formell sats 22 %: 27 %.",
"mer": "<p>To SSB-rapporter (2022/31 og 2025/21) anslår formuesverdien for unoterte aksjer til 35–40 % av markedsverdien etter aksjerabatt; modellen bruker 35 %.<\/p><p>Lysbildet skriver «41,9» i summen, det skal være 1,9.<\/p><p><b>Felle:<\/b> å gange med 0,8 i tillegg til 35 %. De 35 % inkluderer aksjerabatten.<\/p>",
"kilder": [
"F5 lb 39",
"F4 lb 70",
"F4 lb 72"
],
"eksamen": []
},
{
"id": "f5-rikeste-04",
"nivaa": "kjerne",
"kan": "Regne AERT for porteføljen til topp 1 %",
"kort": "1/3 børsnotert og 2/3 unotert: 24,7 % × 1/3 + 18,1 % × 2/3 ≈ 20,3 %. Med formell selskapsskatt 22 %: 29,2 %.",
"mer": "<p>Sammenligning (F5 lb 41): formell marginalskatt 51,5 %; modellen 20,3 %; Aaberge mfl. (2020) topp 1 % 22 %; topp 0,1 % 9–17 % (2001–2018).<\/p><p>Modellen er bygget fra parametere og ikke tilpasset dataene, men lander innenfor om lag ett prosentpoeng av Aaberges anslag.<\/p><p><b>Felle:<\/b> å vekte 50/50 (21,4 %) eller å bytte vektene (22,5 %).<\/p>",
"kilder": [
"F5 lb 40",
"F5 lb 41",
"F4 lb 73"
],
"eksamen": []
},
{
"id": "f5-rikeste-05",
"nivaa": "viktig",
"kan": "Kjenne kjennetegnene ved den rikeste prosenten",
"kort": "Om lag 40 000–50 000 personer med lite lønnsinntekt, relativt lite bolig og eiendom, en stor del av aksjene i Norge og to tredeler av formuen i unoterte aksjer, som verdsettes lavest.",
"mer": "<p>Formuesfordelingen etter persentil (Aaberge mfl. 2021): bolig og eiendom dominerer i midten av fordelingen; finansformue dominerer for topp 1 %; gjeldsgraden faller mot toppen, så de rikeste er ikke lånefinansiert.<\/p><p>F4 lb 67 sier ca. 50 000 personer og «nesten ikke lønnsinntekt».<\/p><p><b>Felle:<\/b> å tro at de rikeste har mest formue i bolig.<\/p>",
"kilder": [
"F5 lb 32",
"F5 lb 33",
"F4 lb 67"
],
"eksamen": []
},
{
"id": "f5-rikeste-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor statistikken undervurderer inntekten til topp 1 %",
"kort": "Overskudd som blir stående i selskapet, teller ikke som inntekt i offisiell statistikk: gruppen ser fattigere ut og skatten ser høyere ut. Formuen verdsettes for lavt og selskapene betaler ikke 22 % effektivt.",
"mer": "<p>Skar mfl. (2025): median formuesverdi på unoterte aksjer ligger om lag 40 % under observert salgspris; to SSB-studier finner helt ned mot 35 % av markedsverdi. Topp 1 % eier 2/3 unoterte aksjer.<\/p><p>For å finne virkelig selskapsskatt må vi bruke statistikk over betalt skatt i forhold til brutto årsresultat.<\/p>",
"kilder": [
"F5 lb 34"
],
"eksamen": []
},
{
"id": "f5-rikeste-07",
"nivaa": "viktig",
"kan": "Kunne konklusjonene fra sammenligningen",
"kort": "Modellen er validert (20,3 % mot Aaberges 22 %); toppen av toppen betaler mindre (9–17 % for topp 0,1 %) fordi andelen unoterte aksjer øker. Forskjellen mellom 24,7 % og 18,1 % skyldes verdsettelsen, ikke satser eller inntjening.",
"mer": "<p>Derfor er verdsettelsen av unoterte aksjer kjernespørsmålet i formuesskatten.<\/p><p>HBS s. 15 sier det samme: unoterte aksjer kutter formuesskatten med 78,8 % og den lave verdsettelsen gjør formuesskatten til et lite effektivt omfordelingsverktøy.<\/p><p><b>Felle:<\/b> å tro at forskjellen skyldes ulik selskapsskatt for børsnoterte og unoterte selskaper. Begge bruker 13,1 %.<\/p>",
"kilder": [
"F5 lb 42",
"HBS s. 15"
],
"eksamen": []
},
{
"id": "f5-rikeste-08",
"nivaa": "viktig",
"kan": "Vite hvordan forutsetningene påvirker AERT i modellen",
"kort": "Null gjeld gjør AERT høyere enn i virkeligheten; mer utbytte enn formuesskatten krever øker AERT, mindre utbytte senker den. Holder utbytte innenfor skjerming til formuesskatten, blir AERT lavere.",
"mer": "<p>F5 lb 43 sier også at det å se bort fra skjermingen gjør AERT «lavere enn i virkeligheten». Det stemmer ikke med siste punkt på samme lysbilde: med skjerming blir utbytteskatten mindre, så modellens AERT er heller for høy. Velg det svaret som følger av mekanismen: skjerming senker AERT.<\/p><p>At topp 1 % bare tar utbytte for å dekke formuesskatten, kaller lysbildet «urealistisk?».<\/p>",
"kilder": [
"F5 lb 43"
],
"eksamen": []
},
{
"id": "f5-rikeste-09",
"nivaa": "viktig",
"kan": "Sammenligne de rikeste med vanlige lønnstakere",
"kort": "Lønn 660 000 i 2026 (median 2025) gir gjennomsnittlig effektiv personskatt ca. 24,9 % med bare minstefradrag og personfradrag. Topp 1 % i formuesfordelingen betaler trolig mindre enn vanlige lønnstakere, til tross for formuesskatten.",
"mer": "<p>Inntekter mellom 600 000 og 700 000 er vanlige lønninger (lærere, sykepleiere). Gjennomsnittslønnen var 744 840.<\/p><p>F4 lb 39: effektiv skatt på lønn 700 000 er ca. 25,4 %.<\/p><p>F5 lb 46 (SSB): de rikeste betaler ikke en større andel av bruttoinntekten i skatt enn store lønnstakergrupper som lærere og sykepleiere, selv når selskapsskatt og formuesskatt tas med.<\/p>",
"kilder": [
"F5 lb 44",
"F5 lb 46",
"F4 lb 39"
],
"eksamen": []
},
{
"id": "f5-rikeste-10",
"nivaa": "viktig",
"kan": "Kunne tallene fra Aaberge mfl. (2020) om de rikeste",
"kort": "2004–2018: topp 1 % betalte ca. 220 kr per 1 000 kr inntekt (22 %), 90.–99. persentil ca. 330 kr (33 %), topp 0,1 % (ca. 3 700 personer) 90–170 kr (9–17 %). Selskapsinntekt er over 90 % av bruttoinntekten til topp 0,1 %.",
"mer": "<p>Selskapsskatten utgjør 4–7 % og formuesskatten 1–2 % av bruttoinntekten til de 5 % rikeste.<\/p><p>F5 lb 45: SSB-figur over gjennomsnittlig skatteprosent etter plassering i inntektsfordelingen (2016), med offisielt mål og mål med og uten selskaps- og formuesskatt.<\/p><p>F5 lb 29: Aaberge mfl. (2024): den rikeste prosenten betaler om lag 19 % mot 36 % ved 99. persentil.<\/p><p><b>Felle:<\/b> topp 1 % = 22 %, topp 0,1 % = 9–17 %. Ikke bytt dem.<\/p>",
"kilder": [
"F5 lb 46",
"F5 lb 45",
"F5 lb 29",
"F4 lb 73",
"HBS s. 2"
],
"eksamen": []
}
]
},
{
"id": "f5-hbs",
"forelesning": "F5 Inntektsskiftningsligningen og de rikeste",
"tittel": "HBS: Skattleggingen av de 0,1 prosent rikeste i Norge",
"eksamensvekt": 2,
"viktigst": [
"Effektiv skatt for en rik investor 2004–2018: 14–21 % (uten gjeld 16–23 %)",
"Hovedscenario (unotert, ingen utbytte): 13,1 + 1,33 = 14,4 %",
"Sekundærscenario (notert, utbytte til formuesskatt): 21,4 %",
"Hovedårsak: lav formuesverdi på unoterte aksjer og lav AETR (13,1 %)"
],
"punkter": [
{
"id": "f5-hbs-01",
"nivaa": "viktig",
"kan": "Kjenne formålet og hovedfunnet i HBS",
"kort": "Artikkelen forsoner Aaberge mfl. (2020), som viser at skattesystemet er regressivt på toppen, med et eksempel: en investor som bare har kapitalinntekt gjennom et holdingselskap. Effektiv skatt 2004–2018 er 14–21 % avhengig av hvor mye han tilpasser seg.",
"mer": "<p>Investoren eier et holdingselskap som eier et datterselskap med skattbart overskudd på 100 kr i året. Nøkkelfaktorer: formuesskatt, utbytteskatt, gjennomsnittlig effektiv selskapsskatt og om aksjene er noterte eller unoterte.<\/p><p>Innlåsningseffekten (BS3): verdien av å utsette utbytteskatten er større enn verdien av utbytte etter skatt.<\/p><p><b>Felle:<\/b> å tro at artikkelen viser at skattesystemet er progressivt på toppen.<\/p>",
"kilder": [
"HBS s. 1",
"HBS s. 2",
"HBS s. 4"
],
"eksamen": []
},
{
"id": "f5-hbs-02",
"nivaa": "viktig",
"kan": "Kunne tallene som går inn i HBS-eksempelet",
"kort": "Verdi 100/0,1222 ≈ 818; unoterte aksjer har formuesverdi 35 % av markedsverdi (rabatt 65 %) ≈ 286, etter snittlig aksjerabatt 6,7 % ≈ 267. Formuesskatt 1 %, gjeld 134, AETR 13,1 % og snittlig marginal utbytteskatt 24,5 %.",
"mer": "<p>Rabatten på 65 % er fra Andresen og Bø (2022); Myklebust og Øverland (2022) fant 68 %. Gjelden er anslått til 134 % av bruttoinntekten (microdata.no). Selskapsskatten var i snitt om lag 27 % (nominell), formuesskatten falt fra 1,1 % til 0,85 % og aksjerabatten varierte fra 35 % til 0 %.<\/p><p>AETR varierte fra 16,6 % (2004) til 10,5 % (2018). Jordàs snitt for 16 land etter 1980: 10,78 % (uvektet), 9,08 % (vektet); valget betyr lite.<\/p>",
"kilder": [
"HBS s. 6",
"HBS s. 8",
"HBS s. 9",
"HBS s. 10"
],
"eksamen": []
},
{
"id": "f5-hbs-03",
"nivaa": "viktig",
"kan": "Regne formuesskatten for unoterte og noterte aksjer i HBS",
"kort": "Unotert: (818 × 35 % × 93,3 % − 134) × 1 % ≈ 1,33. Notert: (818 × 93,3 % − 134) × 1 % ≈ 6,3. Å eie unoterte aksjer kutter formuesskatten med 78,8 %.",
"mer": "<p>Formuesskatt i prosent av bruttoinntekt 100 er 1,33 %; Aaberge mfl. fant 1–2 % for de 5 % rikeste.<\/p><p>Uten gjeld øker formuesskatten med 1,34 i begge scenarioer.<\/p><p>HBS s. 15 omtaler formuesskatten (6,3 og 1,3) som millioner, men eksempelet er i kroner.<\/p><p><b>Felle:<\/b> å glemme gjeldsfradraget eller aksjerabatten på 6,7 %.<\/p>",
"kilder": [
"HBS s. 10",
"HBS s. 15"
],
"eksamen": []
},
{
"id": "f5-hbs-04",
"nivaa": "viktig",
"kan": "Regne hovedscenarioet i HBS",
"kort": "Unoterte aksjer og ingen skattepliktig utbytte: skatt = selskapsskatt 13,1 + formuesskatt 1,33 ≈ 14,4 % av 100. Må han ta utbytte for formuesskatten: 1,33/(1 − 0,245) ≈ 1,76 i utbytte og 0,43 i skatt, 14,9 %. Uten gjeld: 15,8 %.",
"mer": "<p>Investoren tok store skattefrie utbytter før 2006, skjøt dem inn som EK og tar etter 2006 ut nedskrevet EK i stedet for utbytte. Datterselskapet betaler 13,1 og sender 86,9 til holdingselskapet, som betaler 0 i skatt (fritaksmetoden) og holder alt tilbake.<\/p><p>14,4 % passer nesten perfekt med Aaberges 9–17 % for topp 0,1 %. Teksten på s. 12 oppgir selskapsskatten som 19,6 kr, men regner med 13,1.<\/p><p><b>Felle:<\/b> å tro at unngåelsen av utbytteskatt er viktig for resultatet. 14,4 mot 14,9 % viser at den betyr lite.<\/p>",
"kilder": [
"HBS s. 10",
"HBS s. 11",
"HBS s. 12",
"HBS s. 13"
],
"eksamen": []
},
{
"id": "f5-hbs-05",
"nivaa": "viktig",
"kan": "Regne sekundærscenarioet i HBS",
"kort": "Passiv investor med noterte aksjer som tar utbytte for å betale formuesskatten: 6,3/(1 − 0,245) ≈ 8,3 i utbytte og 2,0 i utbytteskatt, så skatten blir 13,1 + 6,3 + 2,0 ≈ 21,4 %. Uten gjeld: utbytte 10,1, skatt 2,5, i alt 23,2 %.",
"mer": "<p>Uten gjeld ligger den effektive skatten mellom 16 og 23 %. Med gjeld er intervallet 14–21 %.<\/p><p>Sammenligning: en gjennomsnittlig enslig lønnstaker hadde netto gjennomsnittsskatt 27,3 % i 2022 (OECD-snitt 24,6 %). 21,4 % er nesten på nivå med det Aaberge fant for topp 1 % (22 %).<\/p><p><b>Felle:<\/b> å bruke 37,84 % i stedet for snittsatsen 24,5 % i HBS-tallene.<\/p>",
"kilder": [
"HBS s. 12",
"HBS s. 13",
"HBS s. 14"
],
"eksamen": []
},
{
"id": "f5-hbs-06",
"nivaa": "viktig",
"kan": "Kunne hovedårsaken til den lave skatten og konklusjonen i HBS",
"kort": "Hovedårsakene er den lave formuesverdien på unoterte aksjer og den lave effektive selskapsskatten (AETR), ikke unngåelse av utbytteskatt. Skattesystemet er regressivt på toppen og har i hovedsak gagnet de rikeste.",
"mer": "<p>De rikeste tjener nesten ingen lønn; inntekten kommer fra kapital. Den lave verdsettelsen gjør formuesskatten til et lite effektivt omfordelingsverktøy.<\/p><p>Yagan (2023): de 400 rikeste amerikanske husholdningene betaler 9,6 % effektiv inntektsskatt; Frankrike og Nederland viser samme mønster.<\/p><p><b>Felle:<\/b> å svare at formuesskatten er hovedgrunnen til at de rikeste betaler lite.<\/p>",
"kilder": [
"HBS s. 3",
"HBS s. 14",
"HBS s. 15"
],
"eksamen": []
},
{
"id": "f5-hbs-07",
"nivaa": "detalj",
"kan": "Kjenne innvendingene som HBS drøfter",
"kort": "Fire innvendinger: ingen lønnsinntekt (undervurderer skatten litt), gjeldsantakelsen, om tilbakeholdt overskudd er inntekt (ja: inntekt kan konsumeres eller spares; en hypotetisk framtidig utbytteskatt trekkes ikke fra) og at småaksjonærer ikke styrer utbyttet (men de store overskuddene ligger i unoterte holdingselskaper der eieren bestemmer).",
"mer": "<p>Selskapsinntekt er over 90 % av bruttoinntekten til topp 0,1 %, så lønnen betyr lite for intervallet. Uten gjeld stiger formuesskatten med 1,34 kr i begge scenarioer.<\/p><p>Tilbakeholdt overskudd i børsnoterte selskaper slår ut i markedsverdien, som eieren kan realisere ved å selge. Det er derfor rimelig å regne det med i inntekten.<\/p>",
"kilder": [
"HBS s. 13",
"HBS s. 14"
],
"eksamen": []
},
{
"id": "f5-hbs-08",
"nivaa": "detalj",
"kan": "Kjenne skattehistorikken og AETR-tallene i HBS",
"kort": "1992–2006: kapitalinntekt 28 % og ingen utbytteskatt (godtgjørelsesmetoden, RISK); utbytteskatt fra 0 til 28 % ble varslet våren 2004; økningen fra 27 % til 31,7 % kom over fire år (28,75 % i 2016). AETR var 38 % i 1982 (nominelt 50,8 %) og 24 % i 2005 (nominelt 28 %); OECD anslår AETR 21 % og EMTR 14 % for Norge i 2021.",
"mer": "<p>RISK-metoden justerte inngangsverdien på aksjen 1. januar hvert år med selskapets tilbakeholdte, beskattede kapital, for å unngå dobbeltbeskatning av gevinst.<\/p><p>Før 2006 gikk nesten alle utbytter til topp 1 %. Etter 2006 tok de i stedet ut innskutt EK skattefritt (ned til minstekapitalen 30 000 kr).<\/p><p>Eksempel på AETR: virkelig overskudd 100, skattbart 80, sats 27 %: skatt 21,6, AETR 21,6 %.<\/p>",
"kilder": [
"HBS s. 4",
"HBS s. 5",
"HBS s. 6",
"HBS s. 7"
],
"eksamen": []
}
]
},
{
"id": "f6-dobbeltbeskatning",
"forelesning": "F6 Effektivitet, skattearbitrasje og demokrati",
"tittel": "Dobbeltbeskatning: kreditmetoden og unntaksmetoden",
"eksamensvekt": 4,
"viktigst": [
"Kreditmetoden: fradrag i norsk skatt for skatt betalt ute, begrenset til norsk skatt på samme inntekt",
"Utenlandsk sats lavere: betal mellomlegget til Norge, total skatt R · t. Høyere: ingen norsk skatt, total R · T",
"Unntaksmetoden: bare kildestaten skattlegger; skattlegger den ikke, blir det dobbelt ikke-beskatning",
"Ingen skatteavtale (og ingen lempning): alle land skattlegger fullt"
],
"punkter": [
{
"id": "f6-dobbeltbeskatning-01",
"nivaa": "kjerne",
"kan": "Regne ut norsk skatt med kreditmetoden når utenlandsk skattesats er lavere enn norsk",
"kort": "Norsk skatt = R · t − R · T. Per Ås: R = 100 000 i land A (20 %), Norge 22 %: 22 000 − 20 000 = 2 000 kr til Norge. Samlet skatt blir R · t = 22 000.",
"mer": "<p>Kreditmetoden gir fradrag (kredit) i norsk skatt for skatt betalt i utlandet. Når utenlandsk sats er lavest, får du fullt fradrag (full kreditering) og ender på norsk skattenivå.<\/p><p>H2021: Irland 35 % mot norsk 46,4 % på 200 000. Irsk skatt 70 000 krediteres fullt.<\/p><p>H2024 o10c: med vanlig kreditmetode får Norge beskatte inntekten fra Japan (15 %), men må gi kredit for japansk skatt.<\/p><p><b>Felle:<\/b> å svare at Japan får eksklusiv beskatningsrett, eller at Japan må gi kredit. Det er hjemstaten (Norge) som gir kredit.<\/p>",
"kilder": [
"F6 lb 32–34"
],
"eksamen": [
"H2021 o4",
"H2024 o10c"
]
},
{
"id": "f6-dobbeltbeskatning-02",
"nivaa": "kjerne",
"kan": "Regne ut skatten når utenlandsk skattesats er høyere enn norsk (begrenset kreditering)",
"kort": "Kreditten begrenses til norsk skatt på samme inntekt. Norsk skatt blir 0 og du betaler bare utenlandsk skatt: inntekt etter skatt B = R(1 − T). Det overskytende er dobbeltbeskatning.",
"mer": "<p><b>H2020 o2b:<\/b> overskudd 75 i land 2 med 30 %. Norsk skatt 75 · 22 % = 16,5, kredit oppad begrenset til 16,5. Norge: 0. Total: 75 · 30 % = 22,5.<\/p><p><b>H2021 USA:<\/b> 200 000 · 55 % = 110 000. Kredit maks 200 000 · 46,4 % = 92 800. De 17 200 i differanse krediteres ikke.<\/p><p>H2024 o10g: hjemstaten gir kredit opp til det beløpet som ville blitt betalt om inntekten bare var skattepliktig i hjemstaten.<\/p><p><b>Felle:<\/b> å tro at Norge refunderer differansen (her 17 200) eller at kildestaten må senke satsen.<\/p>",
"kilder": [
"F6 lb 32",
"F6 lb 35"
],
"eksamen": [
"H2020 o2b",
"H2021 o4",
"H2024 o10g"
]
},
{
"id": "f6-dobbeltbeskatning-03",
"nivaa": "kjerne",
"kan": "Bruke unntaksmetoden",
"kort": "Hjemstaten (Norge) holder inntekten utenfor sitt skattegrunnlag; bare kildestaten skattlegger. H2020 o2a: 50 · 15 % = 7,5. Skattlegger ikke kildestaten, blir det dobbelt ikke-beskatning.",
"mer": "<p>Unntaksmetoden står ikke på F6-lysbildene, men er testet i alle oppgavene om internasjonal skatt (gjesteforeleser i skatterett 2020 til 2024).<\/p><p><b>H2024 o10b:<\/b> avtale med USA med fullstendig unntak: hele omsetningen på 20 mill. fordeles til USA.<\/p><p><b>H2024 o10f:<\/b> kildestaten beskatter ikke: inntekten skattlegges verken i hjemstaten eller kildestaten.<\/p><p><b>Felle:<\/b> å svare at hjemstaten får beskatningsretten tilbake eller må gi kredit når kildestaten ikke skattlegger. Unntaket gjelder uansett.<\/p>",
"kilder": [
"H2020 o2 (fasit)",
"H2024 o10 (fasit)"
],
"eksamen": [
"H2020 o2a",
"H2024 o10b",
"H2024 o10f"
]
},
{
"id": "f6-dobbeltbeskatning-04",
"nivaa": "kjerne",
"kan": "Vite hva som skjer når det ikke finnes skatteavtale",
"kort": "Hvert land skattlegger etter sin interne rett uten begrensninger. Gir heller ikke intern rett lempning, blir det full dobbeltbeskatning (eller trippelbeskatning med tre land). H2020 o2c: 100 · 22 % · 2 = 44.",
"mer": "<p>Dobbeltbeskatning: inntekt eller formue i to land kan bli skattlagt i begge. Eksamensoppgavene forutsetter at Norge bare gir lettelse når det er forpliktet etter skatteavtale.<\/p><p><b>H2022 o4 spm. 6:<\/b> lønn 2 500 000, bosatt i tre land etter intern rett: Norge 45 % = 1 125 000, Kypros 25 % = 625 000, Dubai 15 % = 375 000, totalt 2 125 000.<\/p><p><b>H2024 o10d og o10e:<\/b> uten avtale med British Virgin Islands har begge land beskatningsrett og selskapet dobbeltbeskattes der.<\/p><p><b>Felle:<\/b> å tro at landet der du oppholder deg mest eller har meldt flytting til, får eksklusiv rett.<\/p>",
"kilder": [
"F6 lb 31",
"H2022 o4 (fasit)"
],
"eksamen": [
"H2020 o2c",
"H2022 o4.5",
"H2022 o4.6",
"H2024 o10d",
"H2024 o10e"
]
},
{
"id": "f6-dobbeltbeskatning-05",
"nivaa": "viktig",
"kan": "Vise at full kreditering gir samme skatt hjemme og ute",
"kort": "Med t > T: B = R − RT − R(t − T) = R(1 − t). Investor betaler norsk sats uansett hvor inntekten er opptjent og investerer derfor der avkastningen før skatt er høyest.",
"mer": "<p>R = inntekt opptjent ute, t = norsk sats, T = utenlandsk sats. Investor betaler RT ute og R(t − T) i Norge, til sammen Rt.<\/p><p>Lysbildet: «Full kreditering har den fordel at investor investerer der hvor avkastningen før skatt er høyest fordi skatten er den samme på investering hjemme og ute.»<\/p><p>Med t &lt; T gjelder begrenset kreditering med B = R(1 − T).<\/p><p><b>Felle:<\/b> å tro at full kreditering betyr at all utenlandsk skatt refunderes. Fradraget er aldri større enn den norske skatten på inntekten.<\/p>",
"kilder": [
"F6 lb 33",
"F6 lb 35"
],
"eksamen": []
},
{
"id": "f6-dobbeltbeskatning-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor Norge begrenser kreditten til den norske skatten",
"kort": "Norge vil ikke betale ut penger til skattyter (det åpner for svindel). Dessuten ville andre land få insentiver til å overvelte skattebyrde på Norge hvis Norge refunderte all skatt betalt ute.",
"mer": "<p>Ved full refusjon kunne et kildeland sette svært høy sats på norske investorer, vel vitende om at norsk skattekasse betaler regningen. Begrensningen hindrer dette.<\/p><p>Overstiger utenlandsk skatt den norske skatten på inntekten, fritas du for norsk skatt og betaler bare ute.<\/p><p><b>Felle:<\/b> å tro at begrensningen skyldes skatteavtalen. Lysbildet begrunner den med svindelrisiko og overvelting.<\/p>",
"kilder": [
"F6 lb 35"
],
"eksamen": []
},
{
"id": "f6-dobbeltbeskatning-07",
"nivaa": "viktig",
"kan": "Regne ut betalbar norsk skatt når inntekten er opptjent i flere land",
"kort": "Beregn norsk skatt på global inntekt og trekk fra kredit land for land. H2021: 1 600 000 · 46,4 % = 742 400 − 70 000 (Irland) − 92 800 (USA) − 0 (skatteparadis uten avtale) = 579 600.",
"mer": "<p>Fremgangsmåte: (1) Er personen bosatt i Norge? Ved dobbelt bosted avgjør avtalen (art. 4). (2) All inntekt er skattepliktig hit (globalprinsippet). (3) For hvert land: kredit = min(utenlandsk skatt, norsk skatt på samme inntekt) og null uten avtale.<\/p><p>Irland: 70 000 (lavere enn 92 800, full kredit). USA: 110 000, kredit 92 800. Skatteparadis: 30 000 betalt, kredit 0.<\/p><p><b>Felle:<\/b> å gi kredit for skatteparadiset eller for hele den amerikanske skatten.<\/p>",
"kilder": [
"H2021 o4 (fasit)",
"F6 lb 32–35"
],
"eksamen": [
"H2021 o4"
]
},
{
"id": "f6-dobbeltbeskatning-08",
"nivaa": "detalj",
"kan": "Vite hva som kreves for å få kreditfradrag",
"kort": "Skattyter må dokumentere betalt utenlandsk skatt og sende dokumentasjonen inn sammen med selvangivelsen (skattemeldingen).",
"mer": "<p>Lysbildet knytter kravet til Per Ås-eksempelet: han får fradrag i norsk skatt tilsvarende skatten betalt i land A, men bare mot dokumentasjon.<\/p><p>Ved utflytting gjelder det samme i motsatt retning: er inntekt eller formue skattepliktig både i Norge og i tilflyttingslandet, kan du normalt kreve kreditfradrag i bostedslandet for skatt betalt i Norge (F7 lb 9).<\/p><p><b>Felle:<\/b> å tro at kreditten gis automatisk.<\/p>",
"kilder": [
"F6 lb 34",
"F7 lb 9"
],
"eksamen": []
}
]
},
{
"id": "f6-kapitalkostnad",
"forelesning": "F6 Effektivitet, skattearbitrasje og demokrati",
"tittel": "Nøytral beskatning og kapitalkostnaden (person og bedrift samlet)",
"eksamensvekt": 3,
"viktigst": [
"Overskuddsskatt er nøytral når skattemessig overskudd = virkelig overskudd: F′(K) = r (+ δ) uansett sats",
"Bare en andel A av rentene fradragsberettiget: F′(K) = r(1 − At)/(1 − t) > r, mindre kapital",
"Samlet modell: F′(K) = r[1 + t<sub>k<\/sub>(1 − α)/(1 − t<sub>k<\/sub>) − t<sub>a<\/sub>/(1 − t<sub>k<\/sub>)] + δ",
"Nøytralitet (skattekile null) når t<sub>k<\/sub>(1 − α) = t<sub>a<\/sub>; EK (α = 0) nøytral når t<sub>k<\/sub> = t<sub>a<\/sub> = 22 %",
"Gjeld (α = 1) er nøytral bare hvis t<sub>a<\/sub> = 0; ellers subsidieres kapital"
],
"punkter": [
{
"id": "f6-kapitalkostnad-01",
"nivaa": "kjerne",
"kan": "Forklare når en overskuddsskatt er nøytral for investeringsbeslutningen",
"kort": "Når skattemessig overskudd er lik virkelig overskudd, dvs. alle reelle kostnader (også kapitalkostnaden) er fradragsberettiget. Maks (1 − t)[F(K) − rK] gir F′(K) = r, samme som uten skatt.",
"mer": "<p>Å maksimere (1 − t) ganger overskuddet gir samme tilpasning som å maksimere hele overskuddet, uansett hvor høy t er. Sandmo (AS1): grunnlaget F(K) − (r + δ)K gir F′(K) = r + δ, det samme som uten skatt.<\/p><p>H2020-fasiten krever at du sier at <b>skattemessig overskudd samsvarer med virkelig overskudd<\/b> og at det er grunnen til at skatten ikke påvirker tilpasningen.<\/p><p><b>Felle:<\/b> å svare at høyere skattesats gir mindre investering. Satsen påvirker bare nivået på overskuddet etter skatt, ikke hvor optimum ligger, så lenge grunnlaget er riktig.<\/p>",
"kilder": [
"F6 lb 21",
"AS1 s. 330–331"
],
"eksamen": [
"H2020 o3a"
]
},
{
"id": "f6-kapitalkostnad-02",
"nivaa": "kjerne",
"kan": "Utlede førsteordensbetingelsen når bare en andel A av rentene kan trekkes fra",
"kort": "Maks F(K) − rK − t[F(K) − ArK] gir F′(K)(1 − t) = r(1 − At), altså F′(K) = r(1 − At)/(1 − t). A = 1 gir F′(K) = r (nøytralt); A &lt; 1 gir F′(K) > r og mindre kapital.",
"mer": "<p>Når bare en andel av rentene er fradragsberettiget, er skattemessig overskudd større enn virkelig overskudd. Kravet til grenseproduktivitet stiger og bedriften bruker mindre kapital.<\/p><p><b>Eksempel:<\/b> r = 5 %, t = 22 %, A = 0,5: F′(K) = 0,05 · 0,89/0,78 = 5,71 % mot 5 % med fullt fradrag.<\/p><p><b>Felle:<\/b> H2025-alternativene var r, rA/(1 − t), r(1 − At)/(1 − t) og r/(1 − t)A. Riktig er r(1 − At)/(1 − t). Sett A = 1 og A = 0 som kontroll: du skal få r og r/(1 − t).<\/p>",
"kilder": [
"F6 lb 17–18",
"F6 lb 21"
],
"eksamen": [
"H2020 o3b",
"H2025 o7a"
]
},
{
"id": "f6-kapitalkostnad-03",
"nivaa": "kjerne",
"kan": "Kjenne igjen førsteordensbetingelsen i modellen med både bedrifts- og personskatt",
"kort": "F′(K) = r[1 + t<sub>k<\/sub>(1 − α)/(1 − t<sub>k<\/sub>) − t<sub>a<\/sub>/(1 − t<sub>k<\/sub>)] + δ. t<sub>k<\/sub> = skatt på bedriftens skattemessige overskudd, t<sub>a<\/sub> = skatt på eierens renteinntekt, α = fradragsberettiget andel av rentene, δ = kapitalslit.",
"mer": "<p>Eieren investerer K i bedriften eller sparer S i finansmarkedet til r(1 − t<sub>a<\/sub>). Bedriftens verdi diskonteres med 1 + r(1 − t<sub>a<\/sub>):<\/p><p>V = −K + [F(K) + (1 − δ)K − t<sub>k<\/sub>(F(K) − (αr + δ)K)]/[1 + r(1 − t<sub>a<\/sub>)].<\/p><p>∂V/∂K = 0 og omforming (appendiks lb 53–55) gir formelen. Uten skatt (t<sub>k<\/sub> = t<sub>a<\/sub> = 0) får vi F′(K) = r + δ: grenseproduktiviteten skal dekke rentetapet r og kapitalslitet δ.<\/p><p>Sandmo (AS1) bruker t<sub>o<\/sub> for t<sub>k<\/sub>, t<sub>r<\/sub> for t<sub>a<\/sub> og θ for α.<\/p><p><b>Felle:<\/b> å bytte om t<sub>k<\/sub> og t<sub>a<\/sub>.<\/p>",
"kilder": [
"F6 lb 11–13",
"F6 lb 53–55",
"AS1 s. 332–333"
],
"eksamen": []
},
{
"id": "f6-kapitalkostnad-04",
"nivaa": "kjerne",
"kan": "Vite betingelsen for nøytralitet (skattekilen lik null)",
"kort": "Skattekilen er null når t<sub>k<\/sub>(1 − α) = t<sub>a<\/sub>. Da blir F′(K) = r + δ. Lysbildet: «Vanskelig å få til!»",
"mer": "<p>Setter du t<sub>k<\/sub>(1 − α) = t<sub>a<\/sub> inn i formelen, kansellerer de to leddene i hakeparentesen og kapitalkostnaden blir den samme som uten skatt.<\/p><p>Sandmo (AS1): nøytralitet krever at <b>den effektive marginalbeskatningen av renter er den samme på bedriftens og eierens hånd<\/b>.<\/p><p>To spesialtilfeller: t<sub>k<\/sub> = t<sub>a<\/sub> = 0 (ingen skatt) og α = 0 med t<sub>k<\/sub> = t<sub>a<\/sub>.<\/p><p><b>Felle:<\/b> å tro at nøytralitet krever null skatt. Det holder at satsene er tilpasset hverandre.<\/p>",
"kilder": [
"F6 lb 15",
"AS1 s. 333"
],
"eksamen": []
},
{
"id": "f6-kapitalkostnad-05",
"nivaa": "viktig",
"kan": "Forklare resultatet for egenkapitalfinansiering (α = 0) og hvorfor Norge er nøytralt her",
"kort": "α = 0 gir F′(K) = r[1 + (t<sub>k<\/sub> − t<sub>a<\/sub>)/(1 − t<sub>k<\/sub>)] + δ, som er r + δ når t<sub>k<\/sub> = t<sub>a<\/sub>. Norge: t<sub>k<\/sub> = t<sub>a<\/sub> = 22 %.",
"mer": "<p>Med EK er ingen renter fradragsberettiget i bedriften. Er overskuddsskatten lik skatten på eierens alternative renteinntekt, rammes realinvesteringen og finansalternativet likt.<\/p><p><b>Eksempel:<\/b> r = 5 %, δ = 10 %. Med t<sub>k<\/sub> = t<sub>a<\/sub> = 22 % blir F′(K) = 15 % (nøytralt). Med t<sub>k<\/sub> = 22 % og t<sub>a<\/sub> = 0 blir F′(K) = 0,05 · (1 + 0,22/0,78) + 0,10 = 16,41 %: realinvesteringen straffes.<\/p><p>Sandmo (AS1, θ = 0): nøytralitet når marginalskatten på renteinntekter er lik overskuddsskattesatsen.<\/p><p><b>Felle:<\/b> å tro at EK alltid diskrimineres. I den samlede modellen er EK nøytral når t<sub>k<\/sub> = t<sub>a<\/sub>; diskrimineringen gjelder bedriften sett isolert (F′<sub>E<\/sub> = r/(1 − t)).<\/p>",
"kilder": [
"F6 lb 14",
"AS1 s. 333"
],
"eksamen": []
},
{
"id": "f6-kapitalkostnad-06",
"nivaa": "viktig",
"kan": "Forklare resultatet for gjeldsfinansiering (α = 1)",
"kort": "α = 1 gir F′(K) = r[1 − t<sub>a<\/sub>/(1 − t<sub>k<\/sub>)] + δ, som er r + δ bare hvis t<sub>a<\/sub> = 0. Med t<sub>a<\/sub> > 0 er kapitalkostnaden lavere enn r + δ (kapital subsidieres).",
"mer": "<p>Med fullt rentefradrag i bedriften er bedriften isolert sett nøytral. Men eierens alternativ, renteinntekt, er skattlagt med t<sub>a<\/sub>, så alternativavkastningen r(1 − t<sub>a<\/sub>) ligger under bruttorenten. Da lønner det seg å investere mer enn uten skatt.<\/p><p><b>Eksempel:<\/b> r = 5 %, δ = 10 %, t<sub>k<\/sub> = t<sub>a<\/sub> = 22 %: F′(K) = 0,05 · (1 − 0,22/0,78) + 0,10 = 13,59 % mot 15 % uten skatt.<\/p><p>Sandmo (AS1, θ = 1): «Så lenge det er en positiv beskatning av renteinntekter, vil dette presse eierens alternative avkastning ned under bruttorenten.»<\/p><p><b>Felle:<\/b> å svare at gjeld alltid gir nøytralitet. Det gjelder bare når personskatten på renter er null.<\/p>",
"kilder": [
"F6 lb 14",
"F6 lb 18",
"AS1 s. 333"
],
"eksamen": []
},
{
"id": "f6-kapitalkostnad-07",
"nivaa": "viktig",
"kan": "Tolke de to skatteleddene i førsteordensbetingelsen",
"kort": "t<sub>k<\/sub>(1 − α)/(1 − t<sub>k<\/sub>) er kostnaden ved ufullstendig rentefradrag (øker kapitalkostnaden). −t<sub>a<\/sub>/(1 − t<sub>k<\/sub>) er alternativkostnaden når finansplasseringen er skattlagt (senker kapitalkostnaden).",
"mer": "<p>Lysbildet: «Jo høyere t<sub>a<\/sub>, dess mindre attraktivt er det finansielle alternativet relativt til realinvesteringen. Det reduserer den relative kapitalkostnaden for bedriften på marginen.»<\/p><p>Det første leddet er null når α = 1 (fullt fradrag). Det andre er null når t<sub>a<\/sub> = 0. Nøytralitet krever at leddene er like store.<\/p><p><b>Felle:<\/b> å tro at høyere personskatt på renter gjør realinvestering dyrere. Den gjør alternativet dårligere og investeringen relativt billigere.<\/p>",
"kilder": [
"F6 lb 13"
],
"eksamen": []
},
{
"id": "f6-kapitalkostnad-08",
"nivaa": "viktig",
"kan": "Sette opp budsjettbetingelsene i tooperiodemodellen for eier og bedrift",
"kort": "C<sub>1<\/sub> = Y<sub>1<\/sub> − S − K. C<sub>2<\/sub> = S[1 + r(1 − t<sub>a<\/sub>)] + π − t<sub>k<\/sub>π<sub>t<\/sub>, der π = F(K) + (1 − δ)K er virkelig overskudd og π<sub>t<\/sub> = F(K) − (αr + δ)K er skattemessig overskudd.",
"mer": "<p>Eieren har nytte U(C<sub>1<\/sub>, C<sub>2<\/sub>) og fordeler eksogen inntekt Y<sub>1<\/sub> mellom konsum, finansiell sparing S og realinvestering K i bedriften.<\/p><p>En andel δ av kapitalen går opp i kapitalslit fra periode 1 til 2 og restverdien (1 − δ)K selges. I skattemessig overskudd trekkes kapitalslit δK og andelen α av rentekostnaden rK fra.<\/p><p>α = 0: ingen renter fradragsberettiget (EK). α = 1: alle renter fradragsberettiget (gjeld). 0 ≤ α ≤ 1.<\/p><p><b>Felle:<\/b> å trekke fra hele rK i skattemessig overskudd også når α &lt; 1.<\/p>",
"kilder": [
"F6 lb 7–9",
"AS1 s. 332"
],
"eksamen": []
},
{
"id": "f6-kapitalkostnad-09",
"nivaa": "detalj",
"kan": "Forklare Fishers separasjonsteorem slik det brukes i modellen",
"kort": "Investeringsbeslutningen kan skilles fra konsumbeslutningen: eieren bestemmer først hva og hvor mye som skal investeres (maksimerer nåverdien) og fordeler deretter konsumet over periodene.",
"mer": "<p>Avkastningen på S i finansmarkedet er alternativavkastningen for kapital i bedriften. Derfor diskonteres bedriftens kontantstrøm med <b>etter-skatt-renten<\/b> r(1 − t<sub>a<\/sub>), ikke bruttorenten.<\/p><p>Sandmo (AS1) viser at nåverdien av konsumet må være lik inntekten i periode 1 pluss nåverdien av investeringsprosjektet og at marginal substitusjonsrate er 1 + r(1 − t<sub>a<\/sub>).<\/p><p><b>Felle:<\/b> å diskontere med r når eieren selv betaler skatt på renteinntekter.<\/p>",
"kilder": [
"F6 lb 10–11",
"F6 lb 53",
"AS1 s. 332–333"
],
"eksamen": []
},
{
"id": "f6-kapitalkostnad-10",
"nivaa": "detalj",
"kan": "Vite hvordan Sandmo (AS1) mener særbehandling av næringer bør skje",
"kort": "Gjennom særskatt eller subsidie på den aktiviteten som gir avvik mellom samfunns- og bedriftsøkonomisk lønnsomhet, ikke gjennom variasjon i skattesatsen eller gunstige avskrivningsregler.",
"mer": "<p>Avvik fra nøytralitetsnormen har ofte vært begrunnet med ugunstige ytre forhold eller positive samfunnsvirkninger for en næring. Sandmo: en konsekvent nøytral skatt på nåverdi eller overskudd tar ikke hensyn til slikt.<\/p><p>Markedssvikt og eksterne virkninger kan begrunne særskatter eller subsidier, men de bør treffe selve aktiviteten. Da får aktørene bedre insentiver og intensjonene blir klarere for politikere, administrasjon og allmennheten.<\/p><p><b>Felle:<\/b> å tro at nøytralitet forbyr all særbehandling. Den forbyr særbehandling via satser og avskrivninger.<\/p>",
"kilder": [
"AS1 s. 330"
],
"eksamen": []
}
]
},
{
"id": "f6-gjeld-ek",
"forelesning": "F6 Effektivitet, skattearbitrasje og demokrati",
"tittel": "Skatt og optimal finansiell struktur: gjeld eller egenkapital",
"eksamensvekt": 3,
"viktigst": [
"Gjeldsrenter er fradragsberettiget; alternativkostnaden ved EK (r) er ikke det",
"Gjeld: π = π<sub>t<\/sub> gir F′<sub>G<\/sub> = r (nøytralt); EK: π<sub>t<\/sub> = F(E) gir F′<sub>E<\/sub> = r/(1 − t) > r",
"Avtakende grenseproduktivitet gir E* &lt; G*: skattesystemet diskriminerer mot EK",
"I α-modellen er gjeld billigst så lenge t<sub>k<\/sub> > 0"
],
"punkter": [
{
"id": "f6-gjeld-ek-01",
"nivaa": "kjerne",
"kan": "Forklare hvorfor skattesystemet favoriserer gjeld framfor egenkapital",
"kort": "Gjeldsrenter kan trekkes fra som kostnad, men alternativkostnaden ved å bruke egenkapital (renten r) kan ikke det. EK blir dyrere og skattesystemet diskriminerer mot EK.",
"mer": "<p>H2020-fasiten: «Gode besvarelser skal kun ha ett poeng», nemlig at alternativkostnaden ved EK ikke kan trekkes fra i bedriftens regnskap.<\/p><p>Med EK er skattemessig overskudd større enn virkelig overskudd, så bedriften betaler skatt av normalavkastningen på EK. Med gjeld faller de sammen.<\/p><p>Skjermingsfradraget (F4) er ment å rette opp en tilsvarende skjevhet på eierens hånd.<\/p><p><b>Felle:<\/b> å begrunne med at gjeld er billigere fordi långivere krever lavere avkastning. Spørsmålet gjelder skatt og svaret er fradragsretten.<\/p>",
"kilder": [
"F6 lb 17",
"F6 lb 19",
"F4 lb 40",
"F7 lb 46"
],
"eksamen": [
"H2020 o3c",
"H2025 o7c"
]
},
{
"id": "f6-gjeld-ek-02",
"nivaa": "kjerne",
"kan": "Utlede førsteordensbetingelsene for gjeld og egenkapital når K = G + E",
"kort": "Gjeld: π = π<sub>t<\/sub> = F(G) − rG; maks (1 − t)π gir F′<sub>G<\/sub> = r. EK: π = F(E) − rE, π<sub>t<\/sub> = F(E); maks π − tπ<sub>t<\/sub> gir F′<sub>E<\/sub>(1 − t) = r, altså F′<sub>E<\/sub> = r/(1 − t).",
"mer": "<p>H2025-fasiten skriver det samlet: V = F(E + G) − r(G + E) − t[F(E + G) − rG], som gir F′<sub>G<\/sub> = r og F′<sub>E<\/sub> = r/(1 − t).<\/p><p><b>Eksempel:<\/b> r = 5 %, t = 22 %: F′<sub>G<\/sub> = 5 %, F′<sub>E<\/sub> = 0,05/0,78 = 6,41 %. Et EK-finansiert prosjekt må kaste av seg 6,41 % før skatt for å være like godt som et gjeldsfinansiert på 5 %.<\/p><p><b>Felle:<\/b> tekstuttrekket av lysbildet viser «r(1 − t)», men formelen er r/(1 − t) > r. H2025-alternativene inneholdt både r(1 − t) og r/(1 − t).<\/p>",
"kilder": [
"F6 lb 20–21"
],
"eksamen": [
"H2025 o7b"
]
},
{
"id": "f6-gjeld-ek-03",
"nivaa": "kjerne",
"kan": "Avgjøre om bedriften bruker mest gjeld eller egenkapital",
"kort": "Med avtakende grenseproduktivitet (F′ > 0, F″ &lt; 0) betyr høyere krav F′<sub>E<\/sub> = r/(1 − t) enn F′<sub>G<\/sub> = r at E* &lt; G*.",
"mer": "<p>Figuren på lysbildet viser produksjonsfunksjonen F(K) med K = G + E. Grensekostnadslinjene (rød for EK, blå for gjeld) skjærer den fallende grenseproduktiviteten ved ulike nivåer. Høyest grensekostnad gir lavest bruk.<\/p><p>Skatten reduserer altså EK-finansiert investering, mens gjeldsfinansiert investering ikke påvirkes.<\/p><p><b>Felle:<\/b> H2025 o7c hadde alternativene E* > G*, E* = G*, E* &lt; G* og (1/2)E* > G*. Svaret er E* &lt; G*. Ikke la deg lure av at r/(1 − t) er et «større tall» for EK: større krav gir mindre mengde.<\/p>",
"kilder": [
"F6 lb 22"
],
"eksamen": [
"H2025 o7c"
]
},
{
"id": "f6-gjeld-ek-04",
"nivaa": "viktig",
"kan": "Vise med α-modellen at gjeldsfinansiering gir lavest kapitalkostnad",
"kort": "r[1 − t<sub>a<\/sub>/(1 − t<sub>k<\/sub>)] &lt; r[1 + (t<sub>k<\/sub> − t<sub>a<\/sub>)/(1 − t<sub>k<\/sub>)] ⟺ 0 &lt; t<sub>k<\/sub>. Venstre side er gjeld (α = 1), høyre side EK (α = 0).",
"mer": "<p>Trekk r fra begge sider og gang med (1 − t<sub>k<\/sub>): −t<sub>a<\/sub> &lt; t<sub>k<\/sub> − t<sub>a<\/sub>, som holder når t<sub>k<\/sub> > 0.<\/p><p>Lysbildets konklusjon: «Det er mer lønnsomt med gjeldsfinansiering fordi egenkapitalens alternativavkastning r ikke kan trekkes fra mot inntektene.»<\/p><p><b>Eksempel:<\/b> r = 5 %, δ = 10 %, t<sub>k<\/sub> = t<sub>a<\/sub> = 22 %: gjeld 13,59 %, EK 15 %.<\/p><p><b>Felle:<\/b> å tro at resultatet avhenger av t<sub>a<\/sub>. Forskjellen mellom leddene er bare t<sub>k<\/sub>/(1 − t<sub>k<\/sub>).<\/p>",
"kilder": [
"F6 lb 19"
],
"eksamen": []
}
]
},
{
"id": "f6-effektivitet",
"forelesning": "F6 Effektivitet, skattearbitrasje og demokrati",
"tittel": "Skatt og økonomisk effektivitet: dødvektstap og Laffer-kurven",
"eksamensvekt": 2,
"viktigst": [
"Effektivitetstap av stykkskatt = tapt konsument- og produsentoverskudd (trekanten ABC)",
"Dobling av skatten gir mer enn dobling av effektivitetstapet: lave satser på brede grunnlag",
"Høyest sats der tilbud og etterspørsel er uelastisk (lite kvantumsutslag)",
"Pigou-skatter fremmer effektivitet; vridende skatter hemmer; nøytrale skatter endrer ikke atferd",
"Laffer: samme proveny ved t<sub>L<\/sub> og t<sub>H<\/sub>; satser over t* gir unødig stort tap"
],
"punkter": [
{
"id": "f6-effektivitet-01",
"nivaa": "kjerne",
"kan": "Vise effektivitetstapet (dødvektstapet) av en stykkskatt i en tilbuds- og etterspørselsfigur",
"kort": "Stykkskatten T skifter tilbudskurven opp med T. Ny likevekt P<sub>2<\/sub>, Q<sub>2<\/sub>; produsenten får p<sub>2<\/sub> = P<sub>2<\/sub> − T. Tapet er tapt konsument- og produsentoverskudd som ikke blir skatteinntekt: trekanten ABC.",
"mer": "<p>Uten skatt produseres Q<sub>1<\/sub> til P<sub>1<\/sub> = p<sub>1<\/sub>. Skatten virker som økt grensekostnad. Konsumentprisen stiger til P<sub>2<\/sub>, produsentprisen faller til p<sub>2<\/sub> og kvantum faller til Q<sub>2<\/sub>.<\/p><p>Rektangelet T · Q<sub>2<\/sub> er skatteinntekt (en overføring, ikke et tap). Trekanten mellom Q<sub>2<\/sub> og Q<sub>1<\/sub> er enheter som ville gitt gevinst, men ikke lenger omsettes.<\/p><p><b>Eksempel:<\/b> T = 1 kr og kvantum faller fra 100 til 90: tap = ½ · 1 · 10 = 5 kr.<\/p><p><b>Felle:<\/b> å regne hele nedgangen i konsumentoverskudd som tap. Delen som går til staten er ikke dødvektstap.<\/p>",
"kilder": [
"F6 lb 26",
"F6 lb 28",
"F7 lb 46"
],
"eksamen": [
"H2018 o3a",
"H2018 o3b"
]
},
{
"id": "f6-effektivitet-02",
"nivaa": "kjerne",
"kan": "Forklare hvorfor en dobling av skattesatsen mer enn dobler effektivitetstapet",
"kort": "Tapet er en trekant som vokser både med skattekilen og med kvantumsreduksjonen. Med lineære kurver vokser tapet med kvadratet av satsen: dobbel skatt gir fire ganger tapet. Lave skatter på brede grunnlag er god skattepolitikk.",
"mer": "<p>Lysbildet viser tilbudskurvene T<sub>1<\/sub>, T<sub>2<\/sub> og T<sub>3<\/sub>: ved dobling fra t<sub>1<\/sub> til t<sub>2<\/sub> kommer et nytt felt (endringen i effektivitetstapet) i tillegg til det gamle.<\/p><p><b>Eksempel (lineære kurver):<\/b> T = 1 gir ΔQ = 10 og tap ½ · 1 · 10 = 5. T = 2 gir ΔQ = 20 og tap ½ · 2 · 20 = 20.<\/p><p>Konklusjon: det er bedre med lave skatter på brede grunnlag enn høye satser på få og smale grunnlag. Samme poeng i AS3 og hos Adam og Miller (F8).<\/p><p><b>Felle:<\/b> å svare «dobles». Forelesningen sier eksplisitt «mer enn dobles».<\/p>",
"kilder": [
"F6 lb 27–28",
"F6 lb 30",
"AS3 s. 291",
"F7 lb 46"
],
"eksamen": []
},
{
"id": "f6-effektivitet-03",
"nivaa": "kjerne",
"kan": "Forklare hvorfor skattesatsene bør være høyest der tilbud eller etterspørsel er uelastisk",
"kort": "Uelastisk tilbud eller etterspørsel gir lite kvantumsutslag og dermed lite effektivitetstap; skatten slår ut i pris, ikke i mengde. Elastiske markeder gir store tap.",
"mer": "<p>Faktaboksen på lb 29: relativt uelastiske goder er ikke-mobile skattegrunnlag som eiendom og bolig, nødvendighetsgoder som mat og strøm og goder folk er avhengige av, som tobakk og medisiner. Bratt etterspørselskurve gir lite tap; flat kurve gir stort tap.<\/p><p>Little (1951, i AS4): «de beste skattene er de som legges på goder hvor etterspørselen er minst elastisk».<\/p><p><b>Felle:<\/b> å blande effektivitet og fordeling. Uelastiske nødvendighetsgoder gir lite effektivitetstap, men skatten bæres av konsumentene (jf. insulin i F9).<\/p>",
"kilder": [
"F6 lb 29–30",
"AS4 s. 56–57"
],
"eksamen": []
},
{
"id": "f6-effektivitet-04",
"nivaa": "viktig",
"kan": "Skille mellom effektivitetsfremmende, effektivitetshemmende og nøytrale skatter",
"kort": "Effektivitetsfremmende (Pigou-) skatter retter opp markedssvikt (f.eks. forurensning) og kan gjøre alle bedre stilt. Effektivitetshemmende skatter vrir atferd og reduserer verdiskapingen. Nøytrale skatter endrer ikke atferd.",
"mer": "<p>Pigou-skatter er ment å påvirke atferden i en bestemt retning og kan være Pareto-forbedrende.<\/p><p>Lysbildet har tittelen «Tre typer skatter», men lister bare de to første. Den tredje typen er de nøytrale skattene forelesningen omtaler senere: kontantstrømsskatt og grunnrenteskatt (lb 40) og rundsumskatt (AS3).<\/p><p><b>Felle:<\/b> å kalle alle skatter vridende. Pigou-skatter forbedrer effektiviteten og nøytrale skatter vrir ikke.<\/p>",
"kilder": [
"F6 lb 24",
"F6 lb 40",
"AS3 s. 281–282"
],
"eksamen": []
},
{
"id": "f6-effektivitet-05",
"nivaa": "viktig",
"kan": "Forklare Laffer-kurven",
"kort": "Skatteinntekten R stiger først med satsen, når maksimum R* ved t* og faller deretter. Samme inntekt R<sub>LH<\/sub> kan nås med lav sats t<sub>L<\/sub> og høy sats t<sub>H<\/sub>. Satser til høyre for t* gir større effektivitetstap enn nødvendig.",
"mer": "<p>Oppkalt etter Arthur Laffer, som angivelig tegnet kurven på en serviett. Om et marked faktisk er på høyre side av t*, er et empirisk spørsmål. I så fall kan lavere skatter gi både mer inntekt og større vekstevne.<\/p><p>Pigou (AS4) så det samme: er ønsket inntekt lavere enn maksimum, gir to satser samme inntekt og staten bør velge den laveste.<\/p><p><b>Felle:<\/b> å tro at Laffer-kurven sier at skattekutt alltid øker skatteinntektene. Det gjelder bare til høyre for t*.<\/p>",
"kilder": [
"F6 lb 25",
"AS4 s. 54",
"F7 lb 46"
],
"eksamen": []
},
{
"id": "f6-effektivitet-06",
"nivaa": "viktig",
"kan": "Forklare hva en skattekile er",
"kort": "Skatten driver en kile mellom konsument- og produsentpris, mellom lønn betalt av bedriften og lønn mottatt av arbeidstakeren og mellom kapitalavkastningen og sparerens belønning. Kilen gir substitusjonsvirkninger og effektivitetstap.",
"mer": "<p>En markedsøkonomi er mest effektiv når alle står overfor samme priser. Skattekiler gjør at aktørene tilpasser seg ulike priser (AS3).<\/p><p>I kapitalkostnadsmodellen (F6 lb 15) er skattekilen forskjellen mellom F′(K) og r + δ; nøytralitet betyr at kilen er null.<\/p><p>En kapitalinntektsskatt er en kile som gjør framtidig konsum dyrere; formuesskatten øker den (AS3).<\/p><p><b>Felle:<\/b> å tro at bare indirekte skatter gir kiler. Inntektsskatt på arbeid og kapital gir det samme.<\/p>",
"kilder": [
"AS3 s. 281–282",
"F6 lb 15"
],
"eksamen": []
},
{
"id": "f6-effektivitet-07",
"nivaa": "viktig",
"kan": "Forklare hvorfor det er substitusjonsvirkningen som gir effektivitetstapet",
"kort": "Rundsumskatt og inntektsskatt har samme inntektsvirkning (du blir fattigere og jobber mer). Bare inntektsskatten har en substitusjonsvirkning: marginalskatten gjør arbeid mindre lønnsomt. Det er den som gir effektivitetstapet.",
"mer": "<p>Sandmo (AS3): en arbeidstaker som får en rundsumskatt på 100 000 kr vil trolig jobbe mer. En proporsjonal inntektsskatt gir samme inntektsvirkning, men i tillegg tar marginalskatten en del av belønningen for siste time.<\/p><p>Pigou kalte dette «distributional and announcement effects», dvs. inntekts- og substitusjonsvirkninger (AS4).<\/p><p><b>Felle:<\/b> å tro at effektivitetstapet måles ved hvor mye arbeidstilbudet faller totalt. Totalvirkningen kan være null selv om substitusjonsvirkningen og dermed tapet er stort.<\/p>",
"kilder": [
"AS3 s. 282",
"AS4 s. 54"
],
"eksamen": []
},
{
"id": "f6-effektivitet-08",
"nivaa": "detalj",
"kan": "Vite hva tilbuds- og etterspørselskurvene i effektivitetsfiguren representerer",
"kort": "Tilbudskurven (T) er summen av bedriftenes grensekostnadskurver. Etterspørselskurven (E) er summen av marginale betalingsviljer. Uten skatt er konsumentpris P<sub>1<\/sub> lik produsentpris p<sub>1<\/sub>.",
"mer": "<p>Derfor måler arealet mellom kurvene samfunnets gevinst av omsetningen: betalingsvilje minus grensekostnad for hver enhet.<\/p><p>Med skatt skiller prisene lag: konsumenten betaler P<sub>2<\/sub>, produsenten får p<sub>2<\/sub> = P<sub>2<\/sub> − T<sub>1<\/sub>. Enhetene mellom Q<sub>2<\/sub> og Q<sub>1<\/sub> har betalingsvilje over grensekostnad, men omsettes ikke.<\/p><p><b>Felle:<\/b> å lese av produsentprisen på etterspørselskurven. Etter skatt finner du p<sub>2<\/sub> på den opprinnelige tilbudskurven ved Q<sub>2<\/sub>.<\/p>",
"kilder": [
"F6 lb 26"
],
"eksamen": []
},
{
"id": "f6-effektivitet-09",
"nivaa": "detalj",
"kan": "Forklare hvorfor ingen skatt er både helt effektiv og rettferdig",
"kort": "En koppskatt (lik rundsum for alle) gir ingen skattekiler, men oppleves som svært urettferdig. Knyttes rundsummen til skatteevne (inntekt, forbruk eller formue), blir den en vridende skatt igjen.",
"mer": "<p>Sandmo (AS3): skattesystemet uten kiler «finnes, men bare i økonomiske lærebøker». Folk mener man bør betale mer jo høyere skatteevne man har, men skatteevne må observeres gjennom noe folk kan påvirke og da oppstår kilene.<\/p><p>Konklusjon: «det finnes ikke noe skattesystem som både er helt ut effektivt og samtidig rettferdig».<\/p><p><b>Felle:<\/b> å tro at en flat inntektsskatt er en rundsumskatt. Den har positiv marginalskatt og dermed substitusjonsvirkning.<\/p>",
"kilder": [
"AS3 s. 281–282"
],
"eksamen": []
}
]
},
{
"id": "f6-progressiv-sandmo",
"forelesning": "F6 Effektivitet, skattearbitrasje og demokrati",
"tittel": "Argumenter for progressiv beskatning (Sandmo, AS4)",
"eksamensvekt": 2,
"viktigst": [
"To definisjoner: stigende gjennomsnittsskatt (vanligst) eller stigende marginalskatt; flat skatt over bunnfradrag er progressiv bare etter den første",
"Evneprinsippet (skatt etter betalingsevne) mot nytteprinsippet (skatt etter nytte av offentlige tjenester)",
"Edgeworth: lik grensenytte og gitt totalinntekt gir full utjevning; Pigou: avveining mot effektivitet",
"Lik absolutt eller relativ byrde gir marginalskatt mellom 0 og 1, men ikke nødvendigvis progresjon",
"Mirrlees (1971): optimal skatt ligner lineær skatt med konstant marginalskatt og rundsumoverføring"
],
"punkter": [
{
"id": "f6-progressiv-sandmo-01",
"nivaa": "kjerne",
"kan": "Skille mellom de to definisjonene av progressiv skatt",
"kort": "Vanligst: progressiv når gjennomsnittsskatten stiger med inntekten. Konkurrerende definisjon: progressiv når marginalskatten stiger. En flat sats over et bunnfradrag er progressiv etter den første, men ikke etter den andre.",
"mer": "<p>Regressiv skatt: gjennomsnittsskatten faller med inntekten. Skillet går ved ren proporsjonal skatt.<\/p><p>Med flat skatt over et bunnfradrag har alle over fradraget samme marginalskatt, men gjennomsnittsskatten stiger. Sandmo: det er viktig å være klar over distinksjonen, fordi litteraturen ofte ikke sier hvilken som brukes. Pigou brukte marginalskatt-definisjonen.<\/p><p>Eksamen bruker gjennomsnittsskatten (t = T/Y, ∂t/∂Y > 0).<\/p><p><b>Felle:<\/b> å svare at et system med én sats og bunnfradrag er proporsjonalt fordi marginalskatten er konstant.<\/p>",
"kilder": [
"AS4 s. 51",
"F7 lb 22"
],
"eksamen": [
"H2024 o4b"
]
},
{
"id": "f6-progressiv-sandmo-02",
"nivaa": "viktig",
"kan": "Forklare evneprinsippet og hvorfor det alene ikke gir progresjon",
"kort": "Evneprinsippet: den som har høy inntekt og betalingsevne skal betale mer. Det er forenlig både med regressiv og progressiv skatt og gir derfor liten veiledning om formen på inntektsskatten.",
"mer": "<p>For å konkretisere prinsippet hentet økonomene inn utilitaristisk filosofi (Bentham, Mill): skattebyrden ble målt i nytte, ikke i kroner.<\/p><p>Stortinget har sluttet seg til skatteevneprinsippet, men det betyr ikke nødvendigvis høyere effektiv skattesats for de rikeste (F7 lb 26).<\/p><p><b>Felle:<\/b> å likestille «betale mer» med progressiv skatt. En proporsjonal skatt gir også at de rike betaler flere kroner.<\/p>",
"kilder": [
"AS4 s. 51",
"F7 lb 26"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-03",
"nivaa": "viktig",
"kan": "Forklare nytteprinsippet og svakhetene ved det",
"kort": "Skatten bør reflektere nytten den enkelte har av offentlig virksomhet, som en betaling for tjenester. Wicksell: rettferdig hvis ingen betaler mer enn nytten de får, gitt en rettferdig fordeling. Lindahl: forhandlinger. Svakhet: gratispassasjerproblemet.",
"mer": "<p>Wicksell (1896): et prosjekt bør gjennomføres bare hvis samlet betalingsvilje overstiger kostnadene og kostnaden fordeles slik at alle får del i nettogevinsten (nær beslektet med Pareto-forbedring). Men «rettferdighet i beskatningen forutsetter rettferdighet i den eksisterende fordeling».<\/p><p>Lindahl (1919, 1928): skatteyterne forhandler om både utgiftsnivå og skattefordeling. Svakhet: folk har insentiv til å oppgi lavere betalingsvilje (Samuelson 1954).<\/p><p>Moderne normativ skatteteori bygger nesten bare på evneprinsippet.<\/p><p><b>Felle:<\/b> å tro at Wicksell var konservativ. Han var radikal, men mente fordelingen måtte rettes før nytteprinsippet gjelder.<\/p>",
"kilder": [
"AS4 s. 54–56"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-04",
"nivaa": "viktig",
"kan": "Kjenne Adam Smiths maksimer for god beskatning",
"kort": "Første maksime: borgerne bør bidra i forhold til sine evner, dvs. i forhold til inntekten de nyter godt av under statens beskyttelse. Inntekt er både et mål på betalingsevne og på nytte av staten. Fjerde maksime: skatten bør ta så lite som mulig ut over det den gir staten.",
"mer": "<p>Smith (Wealth of Nations, 1776) hadde fire maksimer. Andre og tredje gjelder administrative kostnader (bl.a. skatteunndragelse), fjerde gjelder effektivitetstap.<\/p><p>Det er uklart om første maksime betyr proporsjonal eller progressiv skatt. J.B. Say tolket den progressivt: «beskatningen kan ikke være rettferdig hvis den ikke er progressiv».<\/p><p>Ricardo: alle skatter svekker vekstevnen, så valget av skattesystem er «a choice of evils».<\/p><p><b>Felle:<\/b> å tro at Smith skilte evne- og nytteprinsippet. Hos ham pekte begge mot inntekt.<\/p>",
"kilder": [
"AS4 s. 50",
"AS4 s. 53",
"F7 lb 49"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-05",
"nivaa": "viktig",
"kan": "Forklare Mills prinsipp om likt offer (equal sacrifice)",
"kort": "Mill tolket likt offer som proporsjonal skatt, men ville frita en minsteinntekt som sikrer en grunnleggende levestandard. Systemet blir dermed progressivt over minstenivået, men Mill avviste videre progresjon.",
"mer": "<p>Mill fant hypotesen om at en tiendedel tatt fra en lav inntekt er tyngre enn fra en høy, for usikker til å begrunne progressiv skatt. Sandmo påpeker at det nettopp er denne hypotesen som begrunner den skattefrie minsteinntekten.<\/p><p>F7 lb 48: Mill motsatte seg progressiv skatt på arbeidsinntekt (en straff på flid og sparsommelighet), men forsvarte sterk progressiv beskatning av arv og urealiserte kapitalgevinster.<\/p><p>McCulloch fryktet at avvik fra proporsjonalitet ville gjøre politikerne «til havs uten ror eller kompass».<\/p><p><b>Felle:<\/b> å tro at utilitaristen Mill sto for sterk progresjon i inntektsskatten.<\/p>",
"kilder": [
"AS4 s. 51–52",
"F7 lb 48"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-06",
"nivaa": "viktig",
"kan": "Forklare Edgeworths utilitaristiske resultat om full inntektsutjevning",
"kort": "Med lik nyttefunksjon for alle, avtakende grensenytte og gitt totalinntekt maksimeres summen av nytte ved full utjevning. Det innebærer 100 % marginalskatt på inntekt over gjennomsnittet og overføringer til dem under («equal marginal sacrifice»).",
"mer": "<p>Bevis: en overføring fra rik til fattig gir et mindre nyttetap for den rike enn nyttegevinsten for den fattige, helt til inntektene er like.<\/p><p>Edgeworth (1897) så selv «sosialismens høydepunkt» og tok straks forbehold: et slikt system ødelegger insentivene til arbeid, sparing og investering. Han klarte ikke å formalisere avveiningen.<\/p><p><b>Felle:<\/b> å tro at utilitarismen gir ubegrenset progresjon i praksis. Resultatet forutsetter at inntekten før skatt er gitt (ingen insentivvirkninger). F7 lb 48: argumentet er betinget.<\/p>",
"kilder": [
"AS4 s. 52",
"F7 lb 48"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-07",
"nivaa": "viktig",
"kan": "Forklare Pigous bidrag om fordeling og effektivitet",
"kort": "Overføring fra rik til fattig øker velferden forutsatt at nasjonalproduktet ikke faller. Med identiske individer og variabelt arbeid bør marginalskatten være så lav som mulig: rent effektivitetsmessig er regressiv skatt bedre enn proporsjonal, som er bedre enn progressiv.",
"mer": "<p>Pigou (1920) formulerte utilitarismen forsiktigere enn Edgeworth: omfordeling mot mer likhet (ikke full utjevning) og med et forbehold om produksjonen. Fordeling og effektivitet trekker i hver sin retning.<\/p><p>Pigou (1928): alle skatter har «distributional and announcement effects» (inntekts- og substitusjonsvirkninger). Av to satser som gir samme inntekt, velg den laveste (Laffer-kurven).<\/p><p>Han utledet også den inverse elastisitetsregelen for indirekte skatter og inspirerte Ramsey (1927).<\/p><p><b>Felle:<\/b> å tro at Pigou løste avveiningen. Det gjorde først Mirrlees.<\/p>",
"kilder": [
"AS4 s. 53–54"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-08",
"nivaa": "viktig",
"kan": "Kjenne Mirrlees' resultat om optimal inntektsskatt",
"kort": "Teorien gir marginalskatt mellom 0 og 1. Simuleringene: gjennomsnittsskatten er negativ for de laveste inntektene og stigende; marginalskatten er svakt stigende for lave inntekter, så fallende og lavest for de høyeste. Optimum ligner en lineær skatt med rundsumoverføring.",
"mer": "<p>Mirrlees (1971) bygger på Edgeworth: velferd = summen av nytte, lik konkav nyttefunksjon over konsum og arbeidstid, ulik produktivitet («skills»). Myndighetene observerer bare inntekten, ikke lønn og innsats.<\/p><p>Skatten er altså progressiv etter gjennomsnittsdefinisjonen, men ikke etter marginaldefinisjonen. Mirrlees ble selv overrasket over at utgangspunktet ikke ga sterkere støtte til progresjon. Nobelpris 1996 sammen med Vickrey.<\/p><p>Den lineære skatten med overføring er det samme som negativ inntektsskatt/borgerlønn (F7).<\/p><p><b>Felle:<\/b> å tro at optimal marginalskatt stiger med inntekten.<\/p>",
"kilder": [
"AS4 s. 57",
"AS3 s. 295"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-09",
"nivaa": "detalj",
"kan": "Vite hva lik absolutt og lik relativ skattebyrde innebærer",
"kort": "Lik absolutt byrde: U(Y) − U(Y − T) = k. Lik relativ byrde: [U(Y) − U(Y − T)]/U(Y) = k. Begge gir marginalskatt mellom 0 og 1, men ikke nødvendigvis progressiv skatt. Med U = ln Y gir lik absolutt byrde proporsjonal skatt.",
"mer": "<p>Formulert av Cohen-Stuart (1889). Derivasjon av lik absolutt byrde gir dT/dY = [U′(Y − T) − U′(Y)]/U′(Y − T), som er positiv og under 1 ved avtakende grensenytte.<\/p><p>Med U(Y) = ln Y er U′ = 1/Y og uttrykket blir dT/dY = T/Y: marginalskatt = gjennomsnittsskatt, altså proporsjonal skatt.<\/p><p>Edgeworths «equal marginal sacrifice» kan utledes fra maksimering av summen av nytte; de to andre variantene har ikke et slikt fundament.<\/p><p><b>Felle:<\/b> å tro at avtakende grensenytte alene beviser at skatten må være progressiv.<\/p>",
"kilder": [
"AS4 s. 52–53"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-10",
"nivaa": "detalj",
"kan": "Forklare argumentet om direkte mot indirekte skatt",
"kort": "En indirekte skatt med lik sats på alle varer er ekvivalent med en inntektsskatt. Høyere skatt på luksus enn på nødvendighetsgoder er derfor et mindre effektivt omfordelingsvirkemiddel enn progressiv inntektsskatt. Little (1951): med variabelt arbeid subsidierer inntektsskatten fritid.",
"mer": "<p>Det klassiske argumentet: et gitt skattebeløp er bedre for skattyter som en direkte inntektsreduksjon enn som vridning av relative priser. Men det forutsetter gitt inntekt (gitt arbeidstilbud). Da er både inntektsskatt og uniforme indirekte skatter rundsumskatter.<\/p><p>Little: med variabelt arbeidstilbud er inntektsskatten ikke overlegen; de beste skattene er på goder med minst elastisk etterspørsel. Det gir støtte til en balanse: progressiv inntektsskatt og indirekte skatter med uniform sats.<\/p><p><b>Felle:<\/b> å tro at differensierte merverdiavgifter er et godt fordelingsvirkemiddel.<\/p>",
"kilder": [
"AS4 s. 56–57"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-11",
"nivaa": "detalj",
"kan": "Kjenne Pikettys og Atkinsons forslag om skjerpet progresjon",
"kort": "Piketty: marginalskatt på ca. 80 % på arbeidsinntekt for den øverste 1 eller 0,5 % (USA). Atkinson: 25 % i nederste trinn over den skattefrie minsteinntekten, stigende til 65 % på inntekter over £200 000.",
"mer": "<p>Begge anbefaler skjerpet progresjon for å motvirke økende ulikhet. Atkinsons forslag forutsetter et bredt grunnlag («comprehensive tax base») med all inntekt fra arbeid og kapital.<\/p><p>Sandmos artikkel bruker dette som innledning til en idéhistorisk gjennomgang fra Adam Smith til Mirrlees.<\/p><p><b>Felle:<\/b> å bytte om tallene: 80 % er Piketty, 65 % er Atkinson.<\/p>",
"kilder": [
"AS4 s. 49"
],
"eksamen": []
},
{
"id": "f6-progressiv-sandmo-12",
"nivaa": "detalj",
"kan": "Forklare Sandmos konklusjon om ulikhetens årsaker og legitimitet",
"kort": "Teoriene overser hvorfor folk har høy inntekt. Høy inntekt fra hardt arbeid og talent har større sosial legitimitet enn inntekt fra sosiale privilegier, monopolmakt eller skatteunndragelse og -omgåelse.",
"mer": "<p>Eldre teorier har bare inntekt i nyttefunksjonen. Mirrlees forutsetter at all ulikhet kommer fra ulik produktivitet. Begge ser bort fra holdninger til arbeid, kapitalinntekt og arv og fra markeder som ikke er fullkomne.<\/p><p>Progressiv beskatning må bygge på både antakelser om atferd (som empiri kan avgjøre) og etiske verdinormer (som empiri ikke kan avgjøre). Libertarianere vil i tillegg spørre om omfordeling er legitim i det hele tatt.<\/p><p><b>Felle:<\/b> å tro at Sandmo avviser formelle modeller. Han mener de er nyttige, men at råd til politikere krever et bredere perspektiv.<\/p>",
"kilder": [
"AS4 s. 58"
],
"eksamen": []
}
]
},
{
"id": "f6-skattearbitrasje",
"forelesning": "F6 Effektivitet, skattearbitrasje og demokrati",
"tittel": "Skattearbitrasje mellom person- og bedriftsbeskatningen",
"eksamensvekt": 1,
"viktigst": [
"Skattearbitrasje (inntektsskifting): gjør høyt beskattet inntekt om til lavt beskattet inntekt ved å utnytte satsforskjeller",
"Lån K privat og skyt det inn som EK: gevinst rK(t<sub>p<\/sub> − t<sub>k<\/sub>) > 0 hvis t<sub>p<\/sub> > t<sub>k<\/sub>, uten risiko",
"Norge: renter skattlegges med 22 % på både person- og bedriftsnivå, så t<sub>p<\/sub> − t<sub>k<\/sub> = 0"
],
"punkter": [
{
"id": "f6-skattearbitrasje-01",
"nivaa": "viktig",
"kan": "Forklare hva skattearbitrasje mellom person- og bedriftsbeskatningen er",
"kort": "Å omdanne høyt beskattet inntekt til lavt beskattet inntekt ved å utnytte satsforskjeller mellom person- og bedriftsbeskatningen. Gevinsten oppnås uten å ta risiko.",
"mer": "<p>Forelesningen kaller dette også <b>inntektsskifting<\/b>. Spørsmålet er om vi kan «tjene penger gratis» når skattesatsene i systemet ikke er integrert med hverandre.<\/p><p>Arbitrasjen forutsetter at samme krone (her renter) behandles ulikt på personens og bedriftens hånd. Er satsene like, forsvinner muligheten.<\/p><p><b>Felle:<\/b> å blande dette med vanlig skatteplanlegging som innebærer risiko. Poenget er at gevinsten er risikofri fordi lånet og plasseringen har samme rente r.<\/p>",
"kilder": [
"F6 lb 4",
"F6 lb 5"
],
"eksamen": []
},
{
"id": "f6-skattearbitrasje-02",
"nivaa": "viktig",
"kan": "Regne ut arbitrasjegevinsten når du låner privat og skyter lånet inn som egenkapital",
"kort": "Renter etter skatt på lånet: r(1 − t<sub>p<\/sub>)K. Avkastning etter skatt i bedriften: r(1 − t<sub>k<\/sub>)K. Netto gevinst = rK(t<sub>p<\/sub> − t<sub>k<\/sub>), positiv hvis t<sub>p<\/sub> > t<sub>k<\/sub>.",
"mer": "<p>t<sub>p<\/sub> er personskatten på renter (verdien av rentefradraget), t<sub>k<\/sub> er skatten på inntekt i bedriften. Bedriften plasserer pengene til samme rente r.<\/p><p><b>Eksempel:<\/b> K = 1 000 000, r = 5 %, t<sub>p<\/sub> = 22 %, t<sub>k<\/sub> = 15 %. Rentekostnad etter skatt 39 000, avkastning etter skatt 42 500, gevinst 0,05 · 1 000 000 · 0,07 = 3 500 kr per år.<\/p><p>Gevinsten begrenses bare av hvor mye man kan låne og trekke fra på personnivå.<\/p><p><b>Felle:<\/b> lysbildet skriver L = −r(1 − t<sub>p<\/sub>)K og «Y − L». Regn med beløpene: avkastning minus rentekostnad.<\/p>",
"kilder": [
"F6 lb 6"
],
"eksamen": []
},
{
"id": "f6-skattearbitrasje-03",
"nivaa": "viktig",
"kan": "Forklare hvorfor denne arbitrasjen ikke virker i det norske skattesystemet",
"kort": "Renteinntekter og rentefradrag inngår i alminnelig inntekt med 22 % både for personer og selskaper, så t<sub>p<\/sub> = t<sub>k<\/sub> og gevinsten blir null.",
"mer": "<p>Lik sats på alminnelig inntekt for personer og selskapsskatt er nettopp det som integrerer person- og bedriftsbeskatningen. Når t<sub>p<\/sub> − t<sub>k<\/sub> = 0, gir lånet og plasseringen samme etter-skatt-rente.<\/p><p>Samme logikk ligger bak nøytralitetsbetingelsen t<sub>k<\/sub>(1 − α) = t<sub>a<\/sub> i kapitalkostnadsmodellen: like satser på bedriftens og eierens hånd fjerner skattekilen.<\/p><p><b>Felle:<\/b> å tro at muligheten finnes fordi utbytte har høyere eierskatt (37,84 %). Her er det renter som flyttes og de har samme sats på begge nivåer.<\/p>",
"kilder": [
"F6 lb 6",
"AS1 s. 333"
],
"eksamen": []
}
]
},
{
"id": "f6-grunnrente",
"forelesning": "F6 Effektivitet, skattearbitrasje og demokrati",
"tittel": "Grunnrente og kontantstrømsskatt",
"eksamensvekt": 1,
"viktigst": [
"Grunnrente (renprofitt) = avkastning utover investors alternativavkastning",
"Totalavkastning = risikofri rente + risikopremie (= alternativavkastning) + renprofitt",
"Kontantstrømsskatt: ingen renter i grunnlaget og investeringer utgiftsføres straks; nåverdi etter skatt = (1 − t) · nåverdi før skatt",
"Kontantstrømsskatt er nøytral og kan skattlegge grunnrente: F′(K) = r + δ"
],
"punkter": [
{
"id": "f6-grunnrente-01",
"nivaa": "viktig",
"kan": "Definere grunnrente (renprofitt)",
"kort": "Overskuddet en bedrift sitter igjen med etter at alle innsatsfaktorer, også kapital og arbeidskraft, har fått markedsmessig avlønning. Alternativt: avkastning utover investors alternativavkastning.",
"mer": "<p>Også kalt renprofitt, meravkastning eller ekstraordinær avkastning.<\/p><p>Fordi grunnrenten er det som er igjen etter at all kapital har fått sin alternativavkastning, kan den skattlegges uten å endre hvilke investeringer som er lønnsomme. Det er derfor grunnrenteskatt omtales som nøytral.<\/p><p><b>Felle:<\/b> å kalle all avkastning utover risikofri rente for grunnrente. Risikopremien er en del av alternativavkastningen, ikke grunnrente.<\/p>",
"kilder": [
"F6 lb 38–39"
],
"eksamen": []
},
{
"id": "f6-grunnrente-02",
"nivaa": "viktig",
"kan": "Dekomponere totalavkastningen på en investering",
"kort": "Totalavkastning = risikofri rente + risikopremie + renprofitt (grunnrente). Risikofri rente + risikopremie = investors alternativavkastning.",
"mer": "<p>Risikofri rente: det investor får ved en risikofri plassering. Risikopremie: kompensasjon for å bære risiko som ikke kan diversifiseres bort. Alternativavkastning: det investor kunne fått på en investering med tilsvarende risiko.<\/p><p>Renprofitten er det som ligger over alternativavkastningen.<\/p><p><b>Felle:<\/b> å tro at risikopremien for diversifiserbar risiko er en del av alternativavkastningen. Bare ikke-diversifiserbar risiko kompenseres.<\/p>",
"kilder": [
"F6 lb 39"
],
"eksamen": []
},
{
"id": "f6-grunnrente-03",
"nivaa": "viktig",
"kan": "Kjenne kildene til grunnrente",
"kort": "Stedbundne naturressurser, myndighetsbestemte reguleringer (f.eks. konsesjoner i havbruk) og markedsmakt eller foretaksspesifikk kunnskap og teknologi.",
"mer": "<p>Felles for kildene er at noe begrenser konkurransen, slik at avkastningen ikke presses ned til alternativavkastningen. I havbruk er det konsesjonene som skaper knappheten.<\/p><p>Forelesningen viser en avistegning om grunnrenteskatt på laksenæringen, som er det aktuelle norske eksempelet på konsesjonsbasert grunnrente.<\/p><p><b>Felle:<\/b> å tro at grunnrente bare finnes i olje og vannkraft. Konsesjoner, markedsmakt og teknologi gir også grunnrente.<\/p>",
"kilder": [
"F6 lb 37–38"
],
"eksamen": []
},
{
"id": "f6-grunnrente-04",
"nivaa": "viktig",
"kan": "Forklare hvorfor kontantstrømsskatt er nøytral",
"kort": "V = (1 − t)[−K + (F(K) + (1 − δ)K)/(1 + r)]. Nåverdien etter skatt er proporsjonal med nåverdien før skatt, så t forkortes bort i førsteordensbetingelsen: F′(K) = r + δ.",
"mer": "<p>To-periodemodell: investér K i periode 1, salg X = F(K) og restverdi (1 − δ)K i periode 2. Staten tar andelen t av både utlegget og inntektene.<\/p><p>Bedriften investerer til grenseproduktiviteten dekker kapitalkostnaden r + δ, alternativkostnaden ved å sitte med kapitalen én periode.<\/p><p>Sandmo (AS1) kaller dette R-skatten og viser samme resultat. Fullt fradrag frister ikke til ulønnsomme investeringer så lenge t &lt; 100 %.<\/p><p><b>Felle:<\/b> å tro at umiddelbar utgiftsføring gir overinvestering. Staten tar like stor andel av gevinst og kostnad.<\/p>",
"kilder": [
"F6 lb 41",
"AS1 s. 331"
],
"eksamen": []
},
{
"id": "f6-grunnrente-05",
"nivaa": "viktig",
"kan": "Vite hvordan kontantstrømsskatt skiller seg fra vanlig bedriftsbeskatning",
"kort": "Renteutgifter og renteinntekter holdes utenfor grunnlaget (ingen favorisering av gjeld) og investeringer utgiftsføres i sin helhet når de påløper i stedet for gjennom avskrivninger.",
"mer": "<p>Kontantstrøm = salgsinntekter − driftskostnader − investeringer + inntekter ved salg av realkapital.<\/p><p>Fordi renter ikke inngår, forsvinner skjevheten mellom gjeld og EK. Fordi investeringen trekkes fra straks, forsvinner problemet med at skattemessige avskrivninger ikke er lik virkelig kapitalslit.<\/p><p><b>Felle:<\/b> å tro at kontantstrømsskatt gir rentefradrag. Det er nettopp rentene som holdes utenfor (R-skatten).<\/p>",
"kilder": [
"F6 lb 40"
],
"eksamen": []
},
{
"id": "f6-grunnrente-06",
"nivaa": "detalj",
"kan": "Skille R-skatt og S-skatt (Meade-komiteen)",
"kort": "R-skatt: grunnlag = reale inn- minus utbetalinger. S-skatt: tar også med lån (låneopptak inngår positivt, renter og avdrag negativt). Lånebeløpene summerer seg til null i nåverdi, så S-skatten er nøytral for både reale og finansielle beslutninger.",
"mer": "<p>Med lån D: V = (1 − t<sub>S<\/sub>)(D − K) + (1 − t<sub>S<\/sub>)[F(K) + (1 − δ)K − (1 + r)D]/(1 + r). Leddene med D faller bort, så V blir som under R-skatten.<\/p><p>Stiger lånerenten med lånets størrelse, i = c(D), er optimalt lån gitt ved at marginal lånerente er lik diskonteringsrenten, uavhengig av skattesatsen.<\/p><p><b>Felle:<\/b> å tro at S-skatten favoriserer lån fordi lånet regnes som inntekt. Avdrag og renter trekkes fra senere, så nåverdien er null.<\/p>",
"kilder": [
"AS1 s. 331–332"
],
"eksamen": []
},
{
"id": "f6-grunnrente-07",
"nivaa": "detalj",
"kan": "Sammenligne tidsprofilen for overskuddsskatt og kontantstrømsskatt",
"kort": "Overskuddsskatten legger all skatt i inntjeningsperioden (periode 2). R- og S-skatt gir negativ skatt (utbetaling) i investeringsperioden og høyere skatt senere. Med lik sats er nåverdien av skattebetalingene den samme.",
"mer": "<p>Tabell 1 i AS1: periode 1: overskuddsskatt 0, R-skatt −t<sub>R<\/sub>K, S-skatt −t<sub>S<\/sub>(K − D). Periode 2: t<sub>o<\/sub>[F(K) − (r + δ)K], t<sub>R<\/sub>[F(K) + (1 − δ)K] og t<sub>S<\/sub>[F(K) + (1 − δ)K − (1 + r)D].<\/p><p>Sandmo: forskjellen «ligger ikke i den totale belastning, men i måten skattebelastningen fra et gitt investeringsprosjekt fordeles over tid».<\/p><p><b>Felle:<\/b> å tro at kontantstrømsskatt gir lavere samlet skatt. Bare tidsprofilen er ulik.<\/p>",
"kilder": [
"AS1 s. 332"
],
"eksamen": []
}
]
},
{
"id": "f6-politikk",
"forelesning": "F6 Effektivitet, skattearbitrasje og demokrati",
"tittel": "Politiske systemer og skatt",
"eksamensvekt": 1,
"viktigst": [
"EU: offentlige utgifter 47,5 % av BNP mot 31,3 % i USA; overføringer 27 % mot 10,8 % (nær 2,5 ganger)",
"Persson, Roland og Tabellini (54 demokratier): parlamentarisme 37 % mot president/kongress 19,8 % av BNP",
"USA: toleddet budsjettprosess med maktseparasjon gir lave skatter; parlamentarisme: én votering",
"Mindretallsregjeringer og koalisjoner gir hestehandel og større utgiftsvekst"
],
"punkter": [
{
"id": "f6-politikk-01",
"nivaa": "viktig",
"kan": "Vite nøkkeltallene for offentlig sektor i EU og USA",
"kort": "Offentlige utgifter: EU 47,5 % av BNP, USA 31,3 %. Overføringer: EU 27 % av BNP, USA 10,8 %. Europeerne omfordeler nesten 2,5 ganger så mye som amerikanerne.",
"mer": "<p>27/10,8 = 2,5. Offentlig sektor er altså mye større i EU-landene enn i USA.<\/p><p>Forelesningen spør om amerikanerne virkelig betaler mindre skatt fordi de er mer opptatt av at alle skal være «sin egen lykkes smed», eller om forklaringen ligger i det politiske systemet. Svaret som gis, er styresettet.<\/p><p><b>Felle:<\/b> å bytte om utgifts- og overføringstallene, eller å svare at forskjellen er dobbel for utgiftene. Det er overføringene som er 2,5 ganger.<\/p>",
"kilder": [
"F6 lb 43",
"F6 lb 46"
],
"eksamen": []
},
{
"id": "f6-politikk-02",
"nivaa": "viktig",
"kan": "Vite hva Persson, Roland og Tabellini fant om styresett og offentlig sektor",
"kort": "I 54 demokratier var offentlige utgifter i snitt 37 % av BNP med parlamentarisme mot 19,8 % med president/kongress-styre (uveid gjennomsnitt).",
"mer": "<p>Feilmarginen er 2,19 % for parlamentarisme og −2,74 % for president/kongress. Lysbildet: dersom andre forhold enn styresett forklarte forskjellene, tyder feilmarginen på <b>enda større<\/b> forskjeller mellom land med parlamentarisme og president/kongress-styre.<\/p><p>Det viktige skillet mellom EU og USA er altså det politiske systemet: president/kongress i USA, parlamentarisme i Europa.<\/p><p><b>Felle:<\/b> å tro at studien gjelder bare EU og USA. Den omfatter 54 demokratier.<\/p>",
"kilder": [
"F6 lb 47–48"
],
"eksamen": []
},
{
"id": "f6-politikk-03",
"nivaa": "viktig",
"kan": "Forklare hvorfor et president/kongress-system gir lavere skatter",
"kort": "Budsjettet vedtas i to trinn: en inntektskomité setter skattesatsene først, en utgiftskomité fordeler pengene etterpå. Medlemmer av inntektskomiteen frykter at utgiftskomiteen forfordeler andre regioner og holder derfor skattene lave.",
"mer": "<p>Komiteene består av senatorer fra ulike delstater, så budsjettprosessen har maktseparasjon. I Norge vedtar et samlet Storting inntekts- og utgiftssiden i én votering med samme flertall.<\/p><p><b>Tankeeksperiment:<\/b> Trøndelag, Vestlandet og Nord-Norge har flertall i inntektskomiteen, Sør-Norge i utgiftskomiteen. For å bli gjenvalgt må inntektskomiteen holde satsene lave, slik at det er lite penger til veier og sykehus på Østlandet.<\/p><p><b>Felle:<\/b> å forklare lave amerikanske skatter med kultur alene. Forelesningen vektlegger budsjettprosessen.<\/p>",
"kilder": [
"F6 lb 49–51"
],
"eksamen": []
},
{
"id": "f6-politikk-04",
"nivaa": "viktig",
"kan": "Forklare lærdommene om parlamentarisme, mindretallsregjeringer og koalisjoner",
"kort": "Parlamentarisme gir større utgiftsside og mer omfordeling fordi det må hestehandles med partier. Mindretallsregjeringer gir konsesjoner til støttepartier og større utgiftsvekst. Koalisjoner med mange partier hestehandler internt med samme effekt.",
"mer": "<p>At utgiftsveksten er større i perioder med mindretallsregjeringer, bekreftes av empiriske studier ifølge forelesningen.<\/p><p>Logikken: når samme flertall bestemmer både skatter og utgifter og flertallet må kjøpes med budsjettinnrømmelser til flere partier, vokser budsjettet.<\/p><p><b>Felle:<\/b> å tro at flertallsregjeringer gir mest utgiftsvekst. Det er mindretallsregjeringer og brede koalisjoner.<\/p>",
"kilder": [
"F6 lb 52"
],
"eksamen": []
},
{
"id": "f6-politikk-05",
"nivaa": "detalj",
"kan": "Kjenne stereotypiene om amerikanere og kontinentaleuropeere",
"kort": "Amerikanere: det økonomiske systemet er rettferdig, rikdom er belønning for evner og hardt arbeid, fattigdom skyldes mangel på initiativ. Europeere: systemet er urettferdig, rikdom henger sammen med familie, forbindelser og klasse, fattigdom skyldes sosial tilhørighet.",
"mer": "<p>Stereotypiene er dokumentert i forskning. Europeerne mener likevel også at hardt arbeid kan lønne seg.<\/p><p>Synet på hvorfor folk er rike eller fattige påvirker oppslutningen om omfordeling. Sandmo (AS4) gjør et liknende poeng: inntekt fra hardt arbeid og talent har større legitimitet enn inntekt fra privilegier.<\/p><p><b>Felle:<\/b> å tro at forelesningen konkluderer med at kultur forklarer forskjellen i offentlig sektor. Hovedforklaringen er det politiske systemet.<\/p>",
"kilder": [
"F6 lb 44",
"AS4 s. 58"
],
"eksamen": []
},
{
"id": "f6-politikk-06",
"nivaa": "detalj",
"kan": "Kjenne forskningsfunnene om aksept for omfordeling",
"kort": "Overføringer godtas lettere i homogene samfunn. Lobbykampanjer (vanligere i USA) har stor påvirkningskraft. Fattige fra en diskriminert gruppe vil skille seg fra gruppen: vellykkede afroamerikanere er mindre opptatt av omfordeling enn hvite.",
"mer": "<p>Lobbypoenget knyttes til Norge: «Drømmen om rikdom og hardt arbeid er salgbar», jf. formuesskattedebatten.<\/p><p>Moene (M) bruker et beslektet argument: mange rike gir politisk innflytelse og de rike har i praksis vetorett (Gilens og Page).<\/p><p><b>Felle:<\/b> å snu homogenitetsfunnet. Det er i homogene, ikke heterogene, samfunn at omfordeling godtas lettest.<\/p>",
"kilder": [
"F6 lb 45"
],
"eksamen": []
}
]
},
{
"id": "f7-bosted",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Skattemessig bosted: innflytting og utflytting",
"eksamensvekt": 4,
"viktigst": [
"Bosatt (norsk skattyter) ved mer enn 183 dager i Norge i en 12-månedersperiode eller mer enn 270 dager i en 36-månedersperiode, uansett statsborgerskap",
"Utflytting krever tre vilkår samtidig: fast opphold ute, maks 61 dager i Norge per år, ingen disponibel bolig (selv eller nærstående)",
"Botid minst 10 år: bostedet opphører først når vilkårene er oppfylt i tre hele inntektsår etter utflyttingsåret (flytter 2022: utflyttet fra 2026)",
"Dobbelt bosted avgjøres av skatteavtalen (OECD art. 4): fast bolig, sentrum for livsinteresser osv."
],
"punkter": [
{
"id": "f7-bosted-01",
"nivaa": "kjerne",
"kan": "Vite hva som gjør deg til norsk skattyter (skattemessig bosatt i Norge)",
"kort": "Opphold i Norge over et visst antall dager: mer enn 183 dager i en tolvmånedersperiode eller mer enn 270 dager i en 36-månedersperiode. Statsborgerskap, fødested, pass, bostedsadresse eller ektefelle avgjør ikke.",
"mer": "<p>Brudvik (AJB): kriteriet for bosettelse ved innflytting «bygger utelukkende på lengden av opphold i Norge» (sktl. § 2-1 annet ledd). Innlending og utlending er definert ved bosted, ikke statsborgerskap.<\/p><p><b>Felle:<\/b> pass, fødested og adresse høres riktige ut, men er ikke kriteriet.<\/p>",
"kilder": [
"AJB s. 61–62",
"AJB s. 68",
"F7 lb 10"
],
"eksamen": []
},
{
"id": "f7-bosted-02",
"nivaa": "kjerne",
"kan": "Bruke 183-dagersregelen og vite fra når bostedet gjelder",
"kort": "Mer enn 183 dager i Norge i løpet av en tolvmånedersperiode gir skattemessig bosted fra første oppholdsdag. Fordeler dagene seg over to inntektsår, gjelder bostedet fra 1. januar det andre året.",
"mer": "<p>Det første året er personen da begrenset skattepliktig til Norge (AJB). Tolvmånedersperioden regnes fra dato til dato.<\/p><p><b>Eksempel:<\/b> kommer du 1. september og blir i 200 dager, er du ikke bosatt det første året (bare 122 dager), men bosatt fra 1. januar året etter. Er du her over 183 dager samme kalenderår, er du bosatt fra første dag.<\/p><p>Lysbildet skriver «183 dager», mens loven og Brudvik sier «mer enn 183 dager».<\/p><p><b>Felle:<\/b> å tro at du blir bosatt fra 1. januar det første året.<\/p>",
"kilder": [
"F7 lb 10",
"AJB s. 61"
],
"eksamen": []
},
{
"id": "f7-bosted-03",
"nivaa": "kjerne",
"kan": "Bruke 270-dagersregelen",
"kort": "Mer enn 270 dager i Norge i løpet av en 36-månedersperiode gir skattemessig bosted fra 1. januar i det året terskelen passeres. Det tilsvarer i snitt 90 dager per år.",
"mer": "<p>Regelen fanger opp dem som holder seg under 183 dager hvert år, men er mye i Norge over tid. 270/3 = 90 dager i snitt per år: du kan i gjennomsnitt oppholde deg 90 dager årlig uten å risikere ny bostedsstatus.<\/p><p>Regelen er særlig viktig etter utflytting: for mye opphold i Norge kan gjøre deg skattemessig bosatt igjen.<\/p><p><b>Felle:<\/b> å tro at 61-dagersgrensen gjelder for innflytting. 61 dager er utflyttingsvilkåret; 183 og 270 dager avgjør om du blir bosatt.<\/p>",
"kilder": [
"F7 lb 10",
"AJB s. 62"
],
"eksamen": []
},
{
"id": "f7-bosted-04",
"nivaa": "kjerne",
"kan": "Vite de tre vilkårene for å være skattemessig utflyttet",
"kort": "Alle tre samtidig: (1) fast opphold i et annet land, (2) ikke mer enn 61 dager i Norge i inntektsåret, (3) verken du eller nærstående disponerer bolig i Norge.",
"mer": "<p>Vilkårene står i sktl. § 2-1 tredje ledd. Hva «fast opphold» betyr, er noe usikkert, men du kan ikke oppholde deg i Norge utover kortvarige ferieopphold og liknende (AJB).<\/p><p>Lysbildet: «61 dager per år i tre år for å oppnå emigrasjon» (gjelder ved botid på minst 10 år).<\/p><p>Nærstående, å disponere bolig og bolig er definert i loven. En leid bolig som fremleies regnes som disponert. Tidligere ektefelle eller samboer er ikke nærstående etter samlivsbrudd.<\/p><p><b>Felle:<\/b> å tro at flyttemelding til Folkeregisteret eller Skatteetaten er nok.<\/p>",
"kilder": [
"F7 lb 4",
"AJB s. 63"
],
"eksamen": []
},
{
"id": "f7-bosted-05",
"nivaa": "kjerne",
"kan": "Regne ut fra hvilket år en person med minst 10 års botid er skattemessig utflyttet",
"kort": "Vilkårene må være oppfylt i tre hele inntektsår etter utflyttingsåret. Flytter i år 1: bosatt år 2, 3 og 4, utflyttet fra år 5. Flytter 2022: utflyttet fra 2026. Flytter 2026: tidligst fra 1. januar 2030.",
"mer": "<p>AJB: skattyteren er skattepliktig til Norge i utreiseåret og de tre påfølgende årene og har plikt til å levere selvangivelse som andre bosatte.<\/p><p><b>Felle:<\/b> å telle utflyttingsåret som ett av de tre årene (svaret 2025) eller å regne tre år fram fra utflyttingen (2024 eller 2025). Det er tre mellomliggende inntektsår.<\/p>",
"kilder": [
"F7 lb 6",
"AJB s. 64"
],
"eksamen": [
"H2022 o4.1"
]
},
{
"id": "f7-bosted-06",
"nivaa": "kjerne",
"kan": "Løse dobbelt bosted med skatteavtalen (OECDs mønsteravtale art. 4)",
"kort": "Er du bosatt i to land etter landenes interne rett, peker skatteavtalen ut ett hjemland etter en fast rekkefølge: fast bolig, sentrum for livsinteresser, vanlig opphold, statsborgerskap og til slutt gjensidig avtale.",
"mer": "<p><b>H2022 o4 spm. 4:<\/b> Masse hadde leilighet på Kypros og meldte flytting dit, men bodde med kvinnen i Dubai. Han anses ikke bosatt på Kypros etter avtalen fordi sentrum for hans personlige og økonomiske livsinteresser ikke er der.<\/p><p><b>H2021 o4:<\/b> Kjell Inge er bosatt i både Norge og Irland etter intern rett. Med familie, kjæreste og leilighet i Bergen blir Norge hjemstat etter art. 4 nr. 2.<\/p><p>Brudvik: når skatteavtale gjelder, er avtalens bostedsbegrep avgjørende.<\/p><p><b>Felle:<\/b> å svare at boligen, flyttemeldingen eller antall dager i landet avgjør. Sentrum for livsinteresser var poenget.<\/p>",
"kilder": [
"F7 lb 8",
"AJB s. 60",
"AJB s. 64",
"H2022 o4 (fasit)"
],
"eksamen": [
"H2022 o4.4",
"H2021 o4"
]
},
{
"id": "f7-bosted-07",
"nivaa": "viktig",
"kan": "Vite regelen for opphør av bosted når botiden er under 10 år",
"kort": "Skatteplikten kan opphøre allerede i det første året alle tre vilkårene er oppfylt: fra det seneste av tidspunktet for fast opphold ute og tidspunktet for oppgivelse av bolig. Er du over 61 dager i Norge det året, opphører den først 1. januar året etter.",
"mer": "<p><b>Eksempel (AJB):<\/b> forlater Norge 1. februar, fast opphold ute fra 15. februar, selger boligen 1. april: skatteplikten opphører 1. april.<\/p><p>Har du solgt boligen i desember og tar fast opphold ute 15. februar, opphører den 15. februar, forutsatt at du ikke overskrider 61 dager senere samme år.<\/p><p><b>Felle:<\/b> å bruke treårsregelen på en som har bodd i Norge i for eksempel fem år.<\/p>",
"kilder": [
"F7 lb 6",
"AJB s. 63"
],
"eksamen": []
},
{
"id": "f7-bosted-08",
"nivaa": "viktig",
"kan": "Forklare boligregelen og unntaket for gamle boliger",
"kort": "Beholder du eller nærstående bolig i Norge, er du ikke skattemessig emigrert. Unntak: bolig anskaffet minst fem år før utflyttingen, som verken du eller nærstående har brukt som bolig de siste fem årene, regnes ikke som disponert.",
"mer": "<p>Lysbildet kaller boligregelen den kritiske regelen: mange som flytter beholder hus eller hytte uten å vite at det kan forlenge skatteplikten betydelig.<\/p><p>Brudvik: bostedet opphører uansett ikke før skattyter eller nærstående ikke lenger disponerer bolig. Mindreårige barn som etter samlivsbrudd bor med omsorgsperson i Norge, anses ikke å disponere bolig.<\/p><p><b>Felle:<\/b> å tro at utleie av boligen løser problemet. En bolig du leier og fremleier, regnes som disponert.<\/p>",
"kilder": [
"F7 lb 5",
"AJB s. 63"
],
"eksamen": []
},
{
"id": "f7-bosted-09",
"nivaa": "viktig",
"kan": "Vite at emigrasjon krever godkjenning og årlig skattemelding",
"kort": "Du er først skattemessig emigrert når Skatteetaten godkjenner det gjennom skattemeldingen. Du må levere skattemelding for det første året du krever emigrasjon og hvert år fram til utflyttingen er bekreftet med vedtak.",
"mer": "<p>Lysbildet: mange tror de er ferdige med norske skatteregler når de melder flytting. Det er de ikke.<\/p><p>Brudvik: den som flytter ut etter minst ti års botid, må ved selvangivelsen for år 2, 3 og 4 godtgjøre at vilkårene er oppfylt.<\/p><p><b>Felle:<\/b> å tro at flyttemeldingen avslutter skatteplikten.<\/p>",
"kilder": [
"F7 lb 7",
"AJB s. 64"
],
"eksamen": []
},
{
"id": "f7-bosted-10",
"nivaa": "viktig",
"kan": "Telle dager riktig etter bostedsreglene",
"kort": "Alle hele eller delvise kalenderdøgn med opphold i Norge teller. En mellomlanding på norsk flyplass teller som ett døgn. Reglene er absolutte.",
"mer": "<p>Både 61-dagersgrensen ved utflytting og 183- og 270-dagersreglene regnes slik (AJB).<\/p><p>Lysbildet: «Regelverket gir rom for å oppholde seg mye i Norge, men grensen på 183 dager i en tolvmånedersperiode er absolutt.»<\/p><p><b>Felle:<\/b> å bare telle overnattinger. En dagstur eller en mellomlanding teller også.<\/p>",
"kilder": [
"F7 lb 10",
"AJB s. 62–63"
],
"eksamen": []
},
{
"id": "f7-bosted-11",
"nivaa": "viktig",
"kan": "Vite hva Norge kan skattlegge i overgangsperioden etter utflytting",
"kort": "Du er fortsatt bosatt etter intern rett, men ofte også i tilflyttingslandet. Gjør avtalen deg bosatt der, kan Norge bare skattlegge kildeinntekter: eiendom i Norge, utbytte fra norske selskaper, lønn opptjent i Norge, norske pensjoner og uføreytelser og eventuelt formue.",
"mer": "<p>Norge blir da kildestat etter avtalen og det nye landet har ofte eksklusiv rett til resten. Hva Norge får skattlegge, avhenger av avtalen. Du kan ofte kreve kreditfradrag i det nye landet for skatt betalt i Norge.<\/p><p>Brudvik: skattyter har uansett selvangivelsesplikt i Norge i utflyttingsåret og de tre påfølgende årene ved minst ti års botid.<\/p><p><b>Felle:<\/b> å tro at Norge mister all beskatningsrett så snart avtalen gjør deg bosatt ute.<\/p>",
"kilder": [
"F7 lb 8",
"F7 lb 9",
"AJB s. 64"
],
"eksamen": []
},
{
"id": "f7-bosted-12",
"nivaa": "detalj",
"kan": "Vite de praktiske reglene for flyttemelding",
"kort": "Flyttemelding sendes Skatteetaten senest 14 dager før avreise. Flytter du til et annet nordisk land, meldes flyttingen bare i landet du flytter til.",
"mer": "<p>Lysbildet samler også kreditfradraget her: er inntekt eller formue skattepliktig i både Norge og tilflyttingslandet, kan du normalt kreve kreditfradrag for skatt betalt i Norge.<\/p><p>Flyttemeldingen er et nødvendig skritt, men ikke tilstrekkelig: den skattemessige statusen avgjøres av vilkårene og Skatteetatens vedtak.<\/p><p><b>Felle:<\/b> å melde flytting til Norge ved flytting til Sverige. I Norden meldes det bare i tilflyttingslandet.<\/p>",
"kilder": [
"F7 lb 9"
],
"eksamen": []
},
{
"id": "f7-bosted-13",
"nivaa": "detalj",
"kan": "Vite når du er formuesskattepliktig og hvilken inntekt som skattlegges ved bosted deler av året",
"kort": "Formuesskattepliktig til Norge etter globalprinsippet hvis du er bosatt her per 1. januar året etter inntektsåret (31. desember kl. 24). Inntekt skattlegges bare hvis den både er innvunnet og tidfestet mens du er norsk skattesubjekt.",
"mer": "<p>Er du ikke bosatt per 1. januar etter inntektsåret, er du ikke formuesskattepliktig for det året (unntatt for formue med kilde i Norge, som fast eiendom). Det skattefrie fradraget i formuen reduseres ikke for delvis botid.<\/p><p>For inntekt gis det forholdsmessige fradrag etter antall dager eller måneder i Norge, f.eks. personfradrag etter hele og påbegynte måneder.<\/p><p><b>Felle:<\/b> å tro at formuesskatten regnes forholdsmessig for delvis bosatte.<\/p>",
"kilder": [
"AJB s. 60–61",
"AJB s. 64"
],
"eksamen": []
}
]
},
{
"id": "f7-progressivitet",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Progressivt, proporsjonalt og regressivt skattesystem",
"eksamensvekt": 4,
"viktigst": [
"Gjennomsnittsskatt t = T/Y (betalt skatt delt på bruttoinntekt før fradrag); marginalskatt m = ΔT/ΔY",
"Progressivt: t stiger med Y (∂t/∂Y > 0); regressivt: t synker; proporsjonalt: t lik for alle",
"Flat sats uten bunnfradrag er proporsjonal; med bunnfradrag progressiv (sterkere jo større fradraget)",
"Progressiv skatt omfordeler ikke nødvendigvis: skatt og overføringer må ses samlet",
"Trinnskatt: hvert trinn skattlegges bare på inntekten i trinnet"
],
"punkter": [
{
"id": "f7-progressivitet-01",
"nivaa": "kjerne",
"kan": "Regne ut gjennomsnittsskatten",
"kort": "t = T/Y, der T er betalt skatt (sats · skattegrunnlag) og Y er bruttoinntekt før fradrag. Lysbildet: 150 000/550 000 = 27,3 % og 500 000/1 000 000 = 50 %.",
"mer": "<p>Kalles også effektiv gjennomsnittsskatt (AERT). Nevneren er alltid bruttoinntekten, ikke skattbar inntekt.<\/p><p><b>H2020 o1d:<\/b> bedrift med 100 000 før skatt, selskapsskatt 44 000 og eierskatt 16 000: (44 000 + 16 000)/100 000 = 60 %.<\/p><p><b>H2025 o5:<\/b> driftsinntekt 100 000, avskrivning 25 000, skatt 16 500: 16 500/100 000 = 16,5 %.<\/p><p><b>Felle:<\/b> å dele på skattbar inntekt (16 500/75 000 = 22 %). Det er bruttoinntekt som skal i nevneren.<\/p>",
"kilder": [
"F7 lb 21",
"F7 lb 24"
],
"eksamen": [
"H2020 o1d",
"H2025 o5"
]
},
{
"id": "f7-progressivitet-02",
"nivaa": "kjerne",
"kan": "Avgjøre om et skattesystem er progressivt, proporsjonalt eller regressivt",
"kort": "Progressivt: betalt skatt øker mer enn proporsjonalt med inntekten, dvs. ∂t/∂Y = ∂(T/Y)/∂Y > 0. Regressivt: ∂t/∂Y &lt; 0. Proporsjonalt: t er den samme for alle.",
"mer": "<p>Høyinntektspersoner betaler en større andel av inntekten i skatt under et progressivt system og en mindre andel under et regressivt.<\/p><p>H2018-fasiten: gode svar definerer først t = T/Y og viser så formelen ∂t/∂Y > 0. Samme fasit står i oppgavesettet til F7 (o1a).<\/p><p>Lysbildet (lb 20): som økonomer har vi ikke verktøy til å si hva som er rettferdig fordeling, men vi kan karakterisere egenskapene ved systemet.<\/p><p><b>Felle:<\/b> å bruke «betaler flere kroner» som kriterium. Også et proporsjonalt system gir at rike betaler flere kroner.<\/p>",
"kilder": [
"F7 lb 20–23",
"Oppg. F7 o1a",
"F7 lb 46"
],
"eksamen": [
"H2018 o1c",
"H2024 o4a"
]
},
{
"id": "f7-progressivitet-03",
"nivaa": "kjerne",
"kan": "Vite at flat sats uten bunnfradrag gir et proporsjonalt system",
"kort": "Uten bunnfradrag er gjennomsnittsskatten lik satsen for alle: systemet er verken progressivt eller regressivt. H2024: 28 % for både Kari (500) og Per (1 000).",
"mer": "<p>Med skatt fra første krone er marginal- og gjennomsnittsskatten identiske.<\/p><p><b>Felle:<\/b> barnefradraget (alternativ d) høres flatt ut, men gir ulik gjennomsnittsskatt for folk med og uten barn.<\/p>",
"kilder": [
"F7 lb 25",
"F7 lb 38"
],
"eksamen": [
"H2024 o4a"
]
},
{
"id": "f7-progressivitet-04",
"nivaa": "kjerne",
"kan": "Regne ut hvordan bunnfradraget påvirker progressiviteten",
"kort": "Med bunnfradrag B og sats s: t = s(Y − B)/Y, som stiger med Y. Større B gir sterkere progresjon. H2024 (28 %): B = 50 gir 25,2 % og 26,6 %; B = 200 gir 16,8 % og 22,4 %.",
"mer": "<p>Et system med bunnfradrag er alltid progressivt, fordi fradraget betyr mindre jo høyere inntekten er.<\/p><p><b>Lysbildet (27 %):<\/b> B = 40 000 gir 23,4 % ved 300 000 og 24,8 % ved 500 000. B = 80 000 gir 19,8 % og 22,7 %. Forskjellen øker fra 1,4 til 2,9 prosentpoeng.<\/p><p>H2024 o4c: forskjellen øker fra 1,4 til 5,6 prosentpoeng når B går fra 50 til 200 (fasiten skriver 22,42 %, men tallet er 22,4 %).<\/p><p><b>Felle:<\/b> å tro at høyere bunnfradrag gir svakere progresjon fordi alle får lavere skatt.<\/p>",
"kilder": [
"F7 lb 25",
"F7 lb 46"
],
"eksamen": [
"H2024 o4b",
"H2024 o4c"
]
},
{
"id": "f7-progressivitet-05",
"nivaa": "kjerne",
"kan": "Regne gjennomsnittsskatten i et trinnskattsystem",
"kort": "Hvert trinn skattlegges med sin sats bare på inntekten i trinnet. H2024 o5 (12 % opp til 100 000, 18 % til 350 000, 28 % over): A med 450 000 betaler 12 000 + 45 000 + 28 000 = 85 000 (18,9 %); X med 380 000 betaler 65 400 (17,2 %).",
"mer": "<p>Begge betaler 12 000 på første trinn og 18 % av 250 000 = 45 000 på andre. Over 350 000: A 28 % av 100 000 = 28 000, X 28 % av 30 000 = 8 400.<\/p><p>65 400/380 000 = 17,21 %. Fasitteksten skriver 17,1 % til slutt, men riktig alternativ var 18,9 % og 17,2 %.<\/p><p><b>Felle:<\/b> å bruke toppsatsen på hele inntekten, eller å regne marginalskatten (28 % for begge) i stedet for gjennomsnittsskatten.<\/p>",
"kilder": [
"H2024 o5 (fasit)",
"F7 lb 21"
],
"eksamen": [
"H2024 o5"
]
},
{
"id": "f7-progressivitet-06",
"nivaa": "kjerne",
"kan": "Definere marginalskatt",
"kort": "m = ΔT/ΔY: prosenten du må betale i skatt av den neste kronen du tjener.",
"mer": "<p>Marginalskatten styrer insentivene (substitusjonsvirkningen), mens gjennomsnittsskatten viser byrden.<\/p><p>Med proporsjonal skatt er m = t. Med bunnfradrag er m = 0 under fradraget og lik satsen over. Med borgerlønn (negativ inntektsskatt) er m konstant, mens t kan være negativ.<\/p><p>Lysbildet definerer også progresjon via marginalskatten: stigende m (∂m/∂Y > 0) er progressivt, fallende regressivt. Sandmo (AS4) påpeker at de to definisjonene kan gi ulike svar.<\/p><p><b>Felle:<\/b> å svare at et system med konstant marginalskatt og bunnfradrag er proporsjonalt.<\/p>",
"kilder": [
"F7 lb 21–23",
"AS4 s. 51"
],
"eksamen": []
},
{
"id": "f7-progressivitet-07",
"nivaa": "viktig",
"kan": "Forklare om et progressivt skattesystem omfordeler fra rik til fattig",
"kort": "Ikke nødvendigvis. Det avgjøres av hvordan systemet er utformet og av overføringer mellom grupper. Det som teller, er den samlede fordelingsvirkningen av skatt og overføringer, ikke om marginalsatsen stiger.",
"mer": "<p>En person med høy gjennomsnittsskatt kan motta så store overføringer at systemet ikke omfordeler. I Norge er det store omfordelinger utenom satsene: barnehagesubsidier, foreldrefradrag, pendlerfradrag og tildeling av konsesjoner.<\/p><p>Murphy og Nagel (lb 53) har samme poeng: det er hele det finanspolitiske systemets fordelingsvirkning som teller.<\/p><p><b>Avvik:<\/b> H2018-fasiten sier at de beste svarene sier at et progressivt system omfordeler fra rike til fattige. 2026-lysbildet nyanserer dette. Svar i tråd med lysbildet, men nevn at progresjon i seg selv trekker i retning av omfordeling.<\/p>",
"kilder": [
"F7 lb 27",
"Oppg. F7 o1b"
],
"eksamen": [
"H2018 o1c"
]
},
{
"id": "f7-progressivitet-08",
"nivaa": "viktig",
"kan": "Vite hva Stortinget har sagt om progressivitet",
"kort": "Stortinget har ikke vedtatt noe rettslig bindende prinsipp om progressivitet, men har sluttet seg til skatteevneprinsippet. Norge har progresjon i beskatningen av arbeidsinntekt (trinnskatt), men ikke i kapitalbeskatningen.",
"mer": "<p>Skatteevneprinsippet: de med høyest inntekt skal betale mer skatt. Det betyr ikke nødvendigvis høyere effektiv skattesats. Lysbildet viser til F1: Nico tjener fem ganger så mye som Pia og betaler fem ganger så mye skatt, men begge betaler 25 % av inntekten, så systemet er ikke progressivt. F1 viser også at effektiv gjennomsnittsskatt faller på toppen (ca. 22 % for topp 1 % og 14 % for topp 0,1 % i 2004).<\/p><p>Kapitalinntekt skattlegges med flat sats (22 % på alminnelig inntekt, 37,84 % på utbytte og gevinst), så Norge har et dualt system: progressivt på arbeid, flatt på kapital.<\/p><p><b>Felle:<\/b> å tro at Grunnloven eller skatteloven krever progressiv skatt.<\/p>",
"kilder": [
"F7 lb 26",
"F1 lb 19",
"F1 lb 31"
],
"eksamen": []
}
]
},
{
"id": "f7-skatteplikt",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Global og begrenset skatteplikt (Brudvik)",
"eksamensvekt": 3,
"viktigst": [
"Globalprinsippet: bosatte (innlendinger) og hjemmehørende selskaper skatter av all inntekt og formue, uansett hvor den er opptjent (sktl. § 2-1 og § 2-2)",
"Begrenset skatteplikt: ikke-bosatte skatter bare av inntekt og formue med kilde i Norge (kildeprinsippet, sktl. § 2-3)",
"Utbytte fra norske selskaper til utlendinger ilegges kildeskatt (15 % til avtaleland i F7-eksempelet)",
"Selskaper: hjemmehørende der den reelle ledelsen er; stiftet i Norge og ingen avtale gir fortsatt norsk"
],
"punkter": [
{
"id": "f7-skatteplikt-01",
"nivaa": "kjerne",
"kan": "Forklare globalprinsippet (full skatteplikt)",
"kort": "Den som er bosatt i Norge (innlending) og selskaper som er hjemmehørende her, har full skatteplikt av all inntekt og formue, også inntekt fra og formue i utlandet (sktl. § 2-1 og § 2-2). Prinsippet modifiseres av skatteavtaler.",
"mer": "<p><b>H2024 o10a:<\/b> «Super-Radar-Vision AS» hadde 100 mill. i omsetning, hvorav 70 mill. fra USA, BVI og Japan. Etter norsk intern rett isolert sett er hele 100 mill. skattepliktig til Norge.<\/p><p><b>H2021 o4:<\/b> all lønn på 1 600 000, også fra Irland, USA og skatteparadiset, er skattepliktig til Norge. Kreditfradrag hindrer så dobbeltbeskatning.<\/p><p><b>Felle:<\/b> å svare 30 mill. (bare norsk omsetning) eller 90 mill. Spørsmålet gjelder intern rett før skatteavtalene.<\/p>",
"kilder": [
"AJB s. 59–60",
"AJB s. 66"
],
"eksamen": [
"H2024 o10a",
"H2021 o4"
]
},
{
"id": "f7-skatteplikt-02",
"nivaa": "kjerne",
"kan": "Forklare begrenset skatteplikt (kildeprinsippet)",
"kort": "Personer og selskaper som ikke er bosatt eller hjemmehørende i Norge, er bare skattepliktige for inntekt og formue som har kilde i eller annen tilknytning til Norge (sktl. § 2-3).",
"mer": "<p>«Utlending» betyr i skatteretten en person som er fast bosatt i utlandet, uansett statsborgerskap.<\/p><p><b>H2021 o4:<\/b> USA og skatteparadiset anser Kjell Inge bare som begrenset skattepliktig for lønnen opptjent der (200 000 i hvert land).<\/p><p>Når en skatteavtale gjelder, kan Norge ha frasagt seg deler av denne retten, f.eks. ved krav om fast driftssted for næringsinntekt.<\/p><p><b>Felle:<\/b> å tro at en nordmann bosatt ute alltid er globalt skattepliktig fordi han er norsk statsborger.<\/p>",
"kilder": [
"AJB s. 59",
"AJB s. 68"
],
"eksamen": [
"H2021 o4"
]
},
{
"id": "f7-skatteplikt-03",
"nivaa": "viktig",
"kan": "Kjenne hovedtilfellene av begrenset skatteplikt til Norge",
"kort": "Formue i og inntekt av fast eiendom og løsøre i Norge, næringsvirksomhet drevet eller bestyrt herfra, lønn for arbeid utført i Norge ved midlertidig opphold, styrehonorar fra norske selskaper, lønn fra den norske stat, utbytte fra norske selskaper (kildeskatt), petroleumsvirksomhet på sokkelen og sjøfolk på norske skip.",
"mer": "<p>Dette er underpunktene i Brudviks avsnitt om begrenset skatteplikt for utlendinger. Også gevinst ved salg av fast eiendom i Norge er skattepliktig hit.<\/p><p>Personer med midlertidig opphold betaler ikke formuesskatt til Norge, unntatt for fast eiendom og løsøre her. Ambassadepersonell med lønn fra staten skatter til Norge selv om de bor og arbeider ute.<\/p><p>F7 lb 8 gir en tilsvarende liste for utflyttede: eiendom, utbytte, lønn opptjent i Norge, norske pensjoner og formue.<\/p><p><b>Felle:<\/b> å tro at begrenset skatteplikt bare gjelder lønn.<\/p>",
"kilder": [
"AJB s. 68–73",
"F7 lb 8"
],
"eksamen": []
},
{
"id": "f7-skatteplikt-04",
"nivaa": "viktig",
"kan": "Vite at utlendingers gevinst på aksjer i norske selskaper i utgangspunktet ikke er skattepliktig i Norge",
"kort": "Gevinsten er i utgangspunktet ikke skattepliktig i Norge. Unntak: aksjer som eies i næring som drives i eller fra Norge.",
"mer": "<p>Nettopp derfor trengs exit-skatten: uten den kunne en nordmann flytte ut og selge aksjer med stor latent gevinst uten norsk skatt. Tidligere fanget femårsregelen (sktl. § 2-3 nr. 3) opp gevinster realisert innen fem år etter utflyttingen.<\/p><p>Brudvik: formålet var å beskatte verdistigning fra tiden i Norge.<\/p><p><b>Felle:<\/b> å blande gevinst og utbytte. Utbytte fra norske selskaper til utlendinger ilegges kildeskatt; gevinsten er i utgangspunktet fri.<\/p>",
"kilder": [
"AJB s. 65",
"AJB s. 72"
],
"eksamen": []
},
{
"id": "f7-skatteplikt-05",
"nivaa": "viktig",
"kan": "Vite når et selskap har full skatteplikt til Norge, også etter at ledelsen flytter",
"kort": "Selskaper hjemmehørende i Norge har full skatteplikt; avgjørende er hvor den reelle ledelsen (styret) er. Etter H2022-fasiten forblir et selskap stiftet i Norge hjemmehørende her når ledelsen flytter til et land Norge ikke har skatteavtale med.",
"mer": "<p>Brudvik (2007): et selskap er hjemmehørende der setet og ledelsen er; registreringsland er ikke avgjørende. OECD art. 4: sete for den virkelige ledelsen.<\/p><p><b>H2022 o4 spm. 7:<\/b> Max Cash Box AS ble ledet fra Dubai, men var stiftet i Norge og det var ingen avtale med Dubai. Statusen som hjemmehørende i Norge opphørte ikke. Exit-skatt for selskapet ble derfor ikke utløst.<\/p><p><b>Avvik:<\/b> Brudvik (2007) sier at registrerings- og stiftelsessted ikke er avgjørende, mens fasiten legger til grunn at et selskap stiftet i Norge er hjemmehørende her. Til eksamen: følg fasiten.<\/p><p><b>Felle:<\/b> «ja, fordi reell ledelse skjer i Dubai».<\/p>",
"kilder": [
"AJB s. 66–67",
"H2022 o4 (fasit)"
],
"eksamen": [
"H2022 o4.7"
]
},
{
"id": "f7-skatteplikt-06",
"nivaa": "viktig",
"kan": "Forklare kildeskatt på utbytte til utenlandske aksjonærer",
"kort": "Utbytte fra norske aksjeselskaper til utenlandske aksjonærer ilegges kildeskatt. Til land Norge har skatteavtale med er satsen 15 % i F7-eksempelet. Kildeskatten kan normalt krediteres i bostedslandet.",
"mer": "<p>Brudvik: kildeskatt er utgangspunktet. Utenlandske selskapsaksjonærer i EØS kan omfattes av fritaksmetoden og personlige aksjonærer i EØS kan få refusjon for skjerming.<\/p><p><b>Kari-eksempelet:<\/b> utbytte 1 000 000 gir 150 000 i kildeskatt. Får hun kredit i bostedslandet, er kildeskatten i praksis ingen ekstra kostnad.<\/p><p><b>Felle:<\/b> å tro at kildeskatten er det samme som exit-skatten. Begge kan trekkes fra samme utbytte (til sammen 850 000 av 1 mill. i dag).<\/p>",
"kilder": [
"F7 lb 12–13",
"AJB s. 72"
],
"eksamen": []
},
{
"id": "f7-skatteplikt-07",
"nivaa": "detalj",
"kan": "Vite at skatteplikt for utenlandsk næringsvirksomhet etter skatteavtale avhenger av fast driftssted",
"kort": "Uten avtale er utlendinger skattepliktige for virksomhet drevet eller bestyrt i Norge. Med skatteavtale skattlegges virksomheten normalt bare hvis den har fast driftssted i Norge (art. 7).",
"mer": "<p>Det samme gjelder speilvendt: når norske selskaper etablerer avdelinger ute, er det de faste driftsstedene kildestaten skattlegger (H2020 o2 og H2024 o10).<\/p><p>Brudvik nevner leasing: Norge har ofte frasagt seg beskatningsrett fordi det utenlandske leasingselskapet mangler fast driftssted her.<\/p><p><b>Felle:<\/b> å tro at enhver omsetning i et land gir skatteplikt der. Med avtale kreves fast driftssted.<\/p>",
"kilder": [
"AJB s. 68–70",
"H2024 o10 (oppgavetekst)"
],
"eksamen": []
}
]
},
{
"id": "f7-exit-skatt",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Exit-skatt (utflyttingsskatt) og skatteavtalen med Sveits",
"eksamensvekt": 3,
"viktigst": [
"Latent aksjegevinst over 3 mill. kr skattlegges ved utflytting med 37,84 %, selv om aksjene ikke selges",
"Betaling: straks, rentefritt over 12 år eller etter 12 år med renter; maks 12 år (femårsregelen opphørte 29. november 2022)",
"Utløses dagen før utflytting, så skatteavtalen beskytter ikke",
"Gave til nærstående i utlandet og utflytting av selskapet utløser også skatt (selskap: begge nivåer)",
"Dagens avdrag: 70 % av utbytte; Skattekommisjonen foreslår 37,84 %"
],
"punkter": [
{
"id": "f7-exit-skatt-01",
"nivaa": "kjerne",
"kan": "Regne ut exit-skatten på en latent aksjegevinst",
"kort": "Exit-skatt = latent gevinst · 37,84 % (22 % · 1,72). Kari: 10 000 000 · 37,84 % = 3 784 000 kr. Skatten utløses når den potensielle gevinsten er over 3 mill. kr (eksempelet ser bort fra bunnfradraget).",
"mer": "<p>Satsen er lik den effektive skattesatsen på utbytte og gevinst (F4): oppjusteringsfaktor 1,72 ganger 22 %.<\/p><p>Exit-skatten fastsettes selv om du ikke anses skattemessig emigrert, så lenge du er bosatt i et annet land etter skatteavtale. Mange vet ikke at skatten kan forfalle helt eller delvis selv om du ikke selger aksjene.<\/p><p><b>Felle:<\/b> å bruke 22 % (alminnelig inntekt) eller 47,4 % (lønn). Satsen er 37,84 %.<\/p>",
"kilder": [
"F7 lb 11–12",
"F4 lb 43"
],
"eksamen": []
},
{
"id": "f7-exit-skatt-02",
"nivaa": "kjerne",
"kan": "Kjenne betalingsalternativene for exit-skatten og at femårsregelen er borte",
"kort": "(1) Umiddelbar betaling, (2) rentefrie rater over 12 år, (3) betaling etter 12 år med renter. Betalingen kan utsettes i inntil 12 år, ikke lenger. Femårsregelen (skatten bortfalt uten salg innen fem år) opphørte fra og med 29. november 2022.",
"mer": "<p>Før 2022 kunne nordmenn som bodde ute i mer enn fem år selge aksjer med latente gevinster uten norsk skatt. Det ga sterke insentiver til å flytte (særlig til Sveits) og var viktigere enn å spare formuesskatt (F4 lb 41–42).<\/p><p><b>Avvik:<\/b> Fasiten til H2022 o4 spm. 2 sier «ja, men skatten bortfaller dersom han ikke selger innen fem år». Det var riktig i 2022, men gjelder ikke i dag. Til eksamen 2026 gjelder tolvårsordningen.<\/p><p><b>Felle:<\/b> å velge femårsalternativet fordi det sto som fasit i en gammel eksamen.<\/p>",
"kilder": [
"F7 lb 11",
"F4 lb 42–43"
],
"eksamen": [
"H2022 o4.2"
]
},
{
"id": "f7-exit-skatt-03",
"nivaa": "kjerne",
"kan": "Forklare hvorfor skatteavtalen ikke beskytter mot exit-skatten",
"kort": "Utflyttingsskatten anses inntrådt dagen før utflyttingstidspunktet, altså før skatteavtalen får virkning.",
"mer": "<p><b>H2022 o4 spm. 3:<\/b> Masse flyttet til Kypros, som har avtale med Norge. Selv om avtalen er anvendelig, beskytter den ikke mot norsk utflyttingsskatt på den urealiserte gevinsten (500 mill.).<\/p><p>Gale alternativer var at hjemstaten etter OECDs mønsteravtale har eksklusiv rett til aksjegevinster, eller at beskyttelsen gjelder over 10 eller 50 mill.<\/p><p><b>Felle:<\/b> å tro at aksjegevinster alltid skattlegges i bostedslandet etter avtalen og at exit-skatten derfor faller bort.<\/p>",
"kilder": [
"H2022 o4 (fasit)",
"F7 lb 11"
],
"eksamen": [
"H2022 o4.3"
]
},
{
"id": "f7-exit-skatt-04",
"nivaa": "kjerne",
"kan": "Vite at gave av aksjer til nærstående i utlandet utløser exit-skatt",
"kort": "Exit-skatten omfatter også gaver av aksjer til nærstående som bor i utlandet, selv om giveren selv blir boende i Norge.",
"mer": "<p><b>H2024 o10h:<\/b> Manni ville gi aksjene (verdi ca. 4 mrd.) til datteren i Sveits, slik at hun senere kunne selge skattefritt etter sveitsisk rett. Regelen omfatter gaver til nærstående i utlandet, så exit-skatten utløses.<\/p><p>Gale alternativer: regelen gjelder bare når Manni selv flytter; skatt oppstår først når datteren selger; regelen gjelder ikke når mottakeren bor i et avtaleland.<\/p><p><b>Felle:<\/b> å tro at exit-skatt bare handler om at aksjonæren selv flytter.<\/p>",
"kilder": [
"H2024 o10 (fasit)"
],
"eksamen": [
"H2024 o10h"
]
},
{
"id": "f7-exit-skatt-05",
"nivaa": "kjerne",
"kan": "Vite hva som skjer skattemessig når et selskap flytter ut av Norge",
"kort": "Selskapet beskattes som om det ble likvidert: realisasjonsbeskatning på selskapsnivå (urealiserte merverdier på eiendelene) og på aksjonærnivå (latent aksjegevinst). Aksjonæren får ingen utsettelsesregel i dette tilfellet.",
"mer": "<p><b>H2022 o4 spm. 8:<\/b> skatt på både 1 000 mill. (selskapets merverdier) og 500 mill. (aksjonærens gevinst). <b>H2024 o10i:<\/b> Manni unngår personlig exit-skatt ved å flytte selskapet til Sveits, men utløser likvidasjonsbeskatning på begge nivåer.<\/p><p>Skatteloven § 10-71 krever at alle skatteposisjoner gjøres opp når selskapet ikke lenger er hjemmehørende i Norge. Brudvik: flyttes ledelsen ut, må selskapet oppløses med likvidasjonsbeskatning.<\/p><p><b>Felle:<\/b> å svare at exit-skatt bare gjelder fysiske personer, eller at bare ett nivå beskattes.<\/p>",
"kilder": [
"H2022 o4 (fasit)",
"H2024 o10 (fasit)",
"AJB s. 67"
],
"eksamen": [
"H2022 o4.8",
"H2024 o10i"
]
},
{
"id": "f7-exit-skatt-06",
"nivaa": "viktig",
"kan": "Regne ut hva Kari sitter igjen med av et utbytte etter kildeskatt og exit-avdrag (dagens regel)",
"kort": "Utbytte 1 000 000: kildeskatt 15 % = 150 000, avdrag på exit-kravet 70 % = 700 000, til sammen 850 000. Kravet faller fra 3 784 000 til 3 084 000. Kari sitter igjen med 150 000, eller i praksis 300 000 hvis kildeskatten krediteres i bostedslandet.",
"mer": "<p>Når et utflyttet selskap deler ut utbytte, skal 70 % av utdelingen gå til nedbetaling av exit-kravet, selv om Kari har valgt rentefri nedbetaling over 12 år.<\/p><p>Avdraget på 700 000 er nedbetaling av et skattekrav, ikke renter eller skatt på utbyttet. Det er derfor neppe krediterbart i bostedslandet.<\/p><p><b>Felle:<\/b> å tro at Kari bare betaler kildeskatt (sitter igjen med 850 000), eller å glemme at kravet reduseres med avdraget.<\/p>",
"kilder": [
"F7 lb 12–13"
],
"eksamen": []
},
{
"id": "f7-exit-skatt-07",
"nivaa": "viktig",
"kan": "Regne ut virkningen av Skattekommisjonens forslag om lavere avdragssats",
"kort": "Avdraget senkes fra 70 % til 37,84 % av utbyttet: 378 400 per million. Kari sitter da igjen med 1 000 000 − 150 000 − 378 400 = 471 600, mot 150 000 i dag.",
"mer": "<p>Motivasjonen er at Kari skal ha mer igjen av utbyttet etter exit-avdraget. Kommisjonen foreslår i tillegg fradrag for kildeskatt betalt til Norge, uten å spesifisere mekanismen; kildeskatten kan inngå i fradraget hvis utlandet ikke gir kredit.<\/p><p>Lysbildet viser regnestykket som «1’’ − 150’ − 700’» ved forslaget, men tallet 471 600 er 1 000 000 − 150 000 − 378 400.<\/p><p><b>Felle:<\/b> å trekke fra 700 000 også i forslaget, eller å tro at satsen på selve exit-skatten endres. Det er avdragssatsen som endres.<\/p>",
"kilder": [
"F7 lb 14–15"
],
"eksamen": []
},
{
"id": "f7-exit-skatt-08",
"nivaa": "viktig",
"kan": "Forklare hvordan lavere avdragssats påvirker nedbetalingstiden",
"kort": "Utbytte 1 mill. annethvert år (år 2 til 12). Dagens 70 %: fem utdelinger dekker 3 500 000, resten 284 000 forfaller år 12. Forslaget 37,84 %: seks utdelinger dekker 2 270 400; 1 513 600 forfaller år 12. Full nedbetaling via utbytte tar ti utdelinger, om lag 20 år.",
"mer": "<p>3 784 000/378 400 = 10 utdelinger og med utbytte annethvert år tar det om lag 20 år. Kravet kan likevel ikke utsettes utover 12 år, så restbeløpet forfaller da.<\/p><p>Konklusjon på lysbildet: lavere avdragssats gir Kari mer i hånd per utdeling, men strekker nedbetalingen vesentlig, fra 12 til om lag 20 år. Krediteres kildeskatten mot kravet, blir tiden noe kortere, men fortsatt klart lengre enn i dag.<\/p><p><b>Felle:<\/b> å tro at forslaget gjør at hele kravet betales innen 12 år via utbytte.<\/p>",
"kilder": [
"F7 lb 16"
],
"eksamen": []
},
{
"id": "f7-exit-skatt-09",
"nivaa": "viktig",
"kan": "Forklare modellen der utflyttere påberoper seg bosted i Sveits etter skatteavtalen",
"kort": "Sveits får beskatningsretten til formue fra du blir eksklusivt bosatt i Sveits etter avtalens art. 4, uavhengig av den norske treårsregelen. Vanlig modell: påberope seg avtalebosted i Sveits i treårsperioden for å få lavere skatt (særlig formuesskatt) med en gang, mens man venter ut internrettens emigrasjonsfrist.",
"mer": "<p>Etter norsk intern rett er du fortsatt bosatt i Norge i tre år etter utflyttingsåret, men skatteavtalen avgjør hvem som får beskatte formuen. Er du bosatt i Sveits etter avtalen, mister Norge retten til formuesskatt med en gang.<\/p><p>Samtidig venter man på muligheten til å realisere kapitalgevinster.<\/p><p><b>Felle:<\/b> å tro at formuesskatten til Norge løper i hele treårsperioden. Avtalebosted i Sveits flytter formuesbeskatningen dit med en gang.<\/p>",
"kilder": [
"F7 lb 17"
],
"eksamen": []
},
{
"id": "f7-exit-skatt-10",
"nivaa": "detalj",
"kan": "Kjenne den sveitsiske forbruksbaserte beskatningen (lump-sum)",
"kort": "Skattegrunnlaget er personens årlige levekostnader, ikke faktisk inntekt og formue. For å beholde avtalebeskyttelsen mot norsk skatt må norske kildeinntekter, som utbytte, i praksis ilegges alminnelig sveitsisk inntektsskatt.",
"mer": "<p>Skattyter kan avtale eller velge forbruksbasert beskatning med sveitsiske myndigheter. Forbeholdet om norske kildeinntekter hindrer at utbytte fra Norge slipper skatt i begge land.<\/p><p>Sandbu-kronikken (supplerende) bruker Sveits som argument i formuesskattdebatten.<\/p><p><b>Felle:<\/b> å tro at lump-sum-ordningen fritar norske utbytter for skatt.<\/p>",
"kilder": [
"F7 lb 18"
],
"eksamen": []
}
]
},
{
"id": "f7-flat-skatt",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Flat skatt: tre systemer og regneeksemplene",
"eksamensvekt": 3,
"viktigst": [
"Proporsjonal skatt: T = sY, m = t for alle",
"Hall og Rabushka (postkortskatt): T = s(Y − B), progressiv via bunnfradraget",
"Negativ inntektsskatt/borgerlønn (Friedman): T = sY − B, negativ skatt for lave inntekter, mest progressiv",
"Samme proveny krever høyere sats jo mer som gis bort: 20 % → 30 % → 40 % i forelesningens eksempel",
"Flatskatt-utvalget (NOU 1999:7): flatere skatt gir klar lettelse for de høyeste arbeidsinntektene"
],
"punkter": [
{
"id": "f7-flat-skatt-01",
"nivaa": "kjerne",
"kan": "Kjenne de tre systemene for flat skatt",
"kort": "(1) Proporsjonal skatt: samme sats på all inntekt, ingen fradrag eller overføringer. (2) Postkortskatt (Hall og Rabushka): flat sats på inntekt over et bunnfradrag, T = s(Y − B). (3) Negativ inntektsskatt (Milton Friedman): flat sats på all inntekt og en fast borgerlønn til alle, T = sY − B.",
"mer": "<p>Spørsmålene som definerer flat skatt (lb 29): skal alle betale samme sats, skal det være bunnfradrag og bør alle sikres en minimumsinntekt?<\/p><p>Proporsjonal skatt er «den flateste av de flate». Ved negativ inntektsskatt fungerer borgerlønnen som et bunnfradrag for den som betaler skatt og blir en utbetaling for den med lav inntekt.<\/p><p><b>Felle:<\/b> å kalle Hall og Rabushkas system proporsjonalt. Det har to marginalskatter (0 og s) og er progressivt.<\/p>",
"kilder": [
"F7 lb 29",
"F7 lb 36",
"AS3 s. 279–280",
"F7 lb 46"
],
"eksamen": []
},
{
"id": "f7-flat-skatt-02",
"nivaa": "kjerne",
"kan": "Regne ut skatt og gjennomsnittsskatt med borgerlønn (negativ inntektsskatt)",
"kort": "T = s · Y − B. Oppgave F7: s = 30 %, B = 120 000. Per (420 000): 126 000 − 120 000 = 6 000, t = 1,4 %. Nina (720 000): 216 000 − 120 000 = 96 000, t = 13,3 %. Systemet er progressivt.",
"mer": "<p>Lysbildets eksempel: s = 40 %, B = 60 000. A (100 000): 40 000 − 60 000 = −20 000 (t = −20 %). B (200 000): 20 000 (10 %). C (600 000): 180 000 (30 %).<\/p><p>Inntekt under B/s gir negativ skatt: med 30 % og 120 000 er grensen 400 000 kr.<\/p><p><b>Felle:<\/b> å trekke borgerlønnen fra inntekten før skatt (det er bunnfradrag). Borgerlønnen trekkes fra skattebeløpet.<\/p>",
"kilder": [
"Oppg. F7 o2",
"F7 lb 40"
],
"eksamen": []
},
{
"id": "f7-flat-skatt-03",
"nivaa": "kjerne",
"kan": "Regne ut skatt og gjennomsnittsskatt med bunnfradrag (Hall og Rabushka)",
"kort": "T = s(Y − B). Oppgave F7: s = 30 %, B = 120 000. Per: 30 % · 300 000 = 90 000, t = 21,4 %. Nina: 30 % · 600 000 = 180 000, t = 25 %. Progressivt.",
"mer": "<p>Lysbildets eksempel: B = 100 000 og 30 %. A (100 000): 0 (0 %). B (200 000): 30 000 (15 %). C (600 000): 150 000 (25 %). Sandmo (AS3): ved 3 000 000 blir t = 29 % og t nærmer seg 30 % for svært høye inntekter.<\/p><p>Alle med inntekt under bunnfradraget betaler ikke skatt og gjennomsnittsskatten stiger fordi fradraget betyr mindre jo høyere inntekten er.<\/p><p><b>Felle:<\/b> å gange satsen med hele inntekten og så trekke fra B (det er borgerlønnssystemet).<\/p>",
"kilder": [
"Oppg. F7 o2",
"F7 lb 39",
"AS3 s. 279"
],
"eksamen": []
},
{
"id": "f7-flat-skatt-04",
"nivaa": "kjerne",
"kan": "Avgjøre hvilket flatskattsystem som er mest progressivt",
"kort": "Borgerlønn (negativ inntektsskatt) gir mest progresjon, deretter flat skatt med bunnfradrag. Proporsjonal skatt er ikke progressiv.",
"mer": "<p>Oppgave F7 o2: med borgerlønn stiger t fra 1,4 % til 13,3 % (Per til Nina); med bunnfradrag fra 21,4 % til 25 %. Fasit: systemet med bunnfradrag er mindre progressivt.<\/p><p>Lysbildet: A, B og C har t = 20/20/20 % (proporsjonal), 0/15/25 % (bunnfradrag) og −20/10/30 % (borgerlønn).<\/p><p>Sandmo (AS3): den negative inntektsskatten er den eneste varianten som står for en reell omfordeling til de virkelige lavinntektsgruppene.<\/p><p><b>Felle:<\/b> å tro at bunnfradrag er mest progressivt fordi de laveste betaler null. Med borgerlønn får de penger.<\/p>",
"kilder": [
"F7 lb 41",
"Oppg. F7 o2",
"AS3 s. 280"
],
"eksamen": []
},
{
"id": "f7-flat-skatt-05",
"nivaa": "viktig",
"kan": "Gjengi tabelleksempelet der alle tre systemene gir proveny 180 000",
"kort": "A 100 000, B 200 000, C 600 000. Proporsjonal 20 %: 20 000, 40 000, 120 000. Bunnfradrag 100 000 og 30 %: 0, 30 000, 150 000. Borgerlønn 60 000 og 40 %: −20 000, 20 000, 180 000. Alle summerer til 180 000.",
"mer": "<p>Satsen må stige fra 20 til 30 til 40 % for å gi samme proveny. Med bunnfradrag blir grunnlaget mindre. Med borgerlønn må skatteinngangen også finansiere overføringen (AS3).<\/p><p>Lysbildet (lb 41) skriver «t = 300 %» for C under borgerlønn; riktig er 30 % (180 000/600 000).<\/p><p><b>Felle:<\/b> å tro at flat skatt betyr lav sats. Jo mer som gis bort i fradrag eller overføring, jo høyere må den flate satsen være.<\/p>",
"kilder": [
"F7 lb 37–41",
"AS3 s. 279–280"
],
"eksamen": []
},
{
"id": "f7-flat-skatt-06",
"nivaa": "viktig",
"kan": "Forklare marginal- og gjennomsnittsskatt i de tre systemene",
"kort": "Proporsjonal: m = t = s fra første krone. Bunnfradrag: to marginalsatser (0 under B, s over), t stiger fra 0 mot s. Borgerlønn: samme m = s for alle, t stiger fra negativ mot s.",
"mer": "<p>Lysbildet om proporsjonal skatt: skattyter betaler fra første krone, marginal- og gjennomsnittsskatt er identiske og gjennomsnittsskatten påvirkes ikke av inntektsendringer.<\/p><p>Sandmo (AS3): under negativ inntektsskatt har vi et progressivt system «denne gang med samme marginalskattesats for alle inntektstakere».<\/p><p>Dette er grunnen til at definisjonen av progresjon betyr noe (AS4): med marginaldefinisjonen er borgerlønnssystemet ikke progressivt.<\/p><p><b>Felle:<\/b> å tro at negativ inntektsskatt har negativ marginalskatt. Marginalskatten er positiv; det er skattebeløpet som kan bli negativt.<\/p>",
"kilder": [
"F7 lb 38–40",
"AS3 s. 279–280"
],
"eksamen": []
},
{
"id": "f7-flat-skatt-07",
"nivaa": "viktig",
"kan": "Kjenne Flatskatt-utvalgets konklusjon (NOU 1999:7)",
"kort": "Flatere skatt = mindre forskjell mellom høyeste marginalskatt på arbeidsinntekt (personinntekt) og satsen på alminnelig inntekt. Det gir klar skattelette for de høyeste arbeidsinntektene. Under uendret proveny var det vanskelig å tilrå en omfattende flatskattreform.",
"mer": "<p>Utvalget fant det mest nærliggende å øke skatten på alminnelig inntekt, eventuelt kombinert med høyere bunnfradrag for å skjerme de laveste inntektene.<\/p><p>Men høyere sats på alminnelig inntekt øker også bedriftsbeskatningen og de negative virkningene av det gjorde at utvalget ikke kunne anbefale en omfattende reform. Sandmos «Flatere skatter?» (AS3) er vedlegg 1 i denne NOU-en.<\/p><p><b>Felle:<\/b> å tro at utvalget anbefalte flat skatt.<\/p>",
"kilder": [
"F7 lb 32–33"
],
"eksamen": []
},
{
"id": "f7-flat-skatt-08",
"nivaa": "viktig",
"kan": "Kjenne Hall og Rabushkas postkortskatt",
"kort": "19 % flat skatt over et bunnfradrag og uten andre personfradrag, så enkel at selvangivelsen får plass på et postkort. Eksempel: 50 000 − 10 000 (minstefradrag) − 8 000 (forsørgerfradrag, to barn) = 32 000 · 19 % = 6 080 dollar.",
"mer": "<p>Flatskattdebatten startet i USA da Hall og Rabushka skrev «The attractions of a flat-rated tax system» i Wall Street Journal i 1995 (forslaget ble først lansert tidlig på 1980-tallet, bok 1985 og 1995). Kapitalinntekt skulle skattlegges på bedriftens hånd med samme sats.<\/p><p>Gjennomsnittsskatten i eksempelet er 6 080/50 000 = 12,2 %. De anslo at forenklingen ville spare om lag 10 % av all personlig inntektsskatt i USA (1 til 2 % av BNP).<\/p><p>Paradoks: den norske skattemeldingen kommer ferdig utfylt, mens den amerikanske er svært komplisert.<\/p><p><b>Felle:<\/b> å tro at postkortskatten er proporsjonal.<\/p>",
"kilder": [
"F7 lb 34–35",
"AS3 s. 292"
],
"eksamen": []
},
{
"id": "f7-flat-skatt-09",
"nivaa": "detalj",
"kan": "Kjenne argumentene i flatskattdebatten (Rabushka mot Murphy)",
"kort": "Rabushka: flat skatt bedrer insentivene til å arbeide, spare og investere og fremmer vekst; motstanden i Europa skyldes tro på «the social market». Murphy: det er en myte at de rike knapt tjener på flat skatt; flat skatt er en mekanisme som øker formuesforskjellene.",
"mer": "<p>Begge sitatene er fra EBF-debatten (2006). Alvin Rabushka er fra Hoover Institution, Stanford; Richard Murphy er direktør i Tax Research LLP.<\/p><p>Sandmo (AS3) viser at begge sider har noe for seg: teorien gir ingen klar effektivitetsgevinst, men empirien tyder på en viss gevinst og flat skatt kan gi mindre omfordeling.<\/p><p><b>Felle:<\/b> å tro at «flertallet av forskere er enige» er Sandmos konklusjon. Det er Rabushkas påstand.<\/p>",
"kilder": [
"F7 lb 30–31"
],
"eksamen": []
}
]
},
{
"id": "f7-flatere-sandmo",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Flatere skatter? (Sandmo, AS3)",
"eksamensvekt": 1,
"viktigst": [
"Tre krav til et godt skattesystem: effektivitet, rettferdighet og enkelhet",
"Overgang til proporsjonal skatt: total virkning på arbeidstilbudet ubestemt for lave og høye inntekter, positiv for midlere",
"Hausman: effektivitetstap 22,5 % av provenyet, 7,1 % med proporsjonal skatt, 14,5 % med flat skatt og bunnfradrag",
"Flat skatt stimulerer ikke sparing, men gir mer ensartet beskatning av spareformer",
"Reell progresjon er ofte mindre enn formell; horisontal mot vertikal rettferdighet"
],
"punkter": [
{
"id": "f7-flatere-sandmo-01",
"nivaa": "viktig",
"kan": "Vite de tre kravene til et godt skattesystem",
"kort": "Effektivitet (minst mulig vridning), rettferdighet (rimelig fordeling av skattebyrden) og enkelhet (lave administrasjonskostnader, også skattyternes egne kostnader). Kravene er ofte i konflikt.",
"mer": "<p>Reformer motivert av rettferdighet kan gi både større effektivitetstap og et mer komplisert system. Hall og Rabushka mener flat skatt scorer høyt på alle tre og Sandmo undersøker om det stemmer.<\/p><p>Et komplisert system favoriserer de ressurssterke, så forenkling har også et fordelingsaspekt.<\/p><p><b>Felle:<\/b> å glemme skattyternes egne kostnader, f.eks. tid til å fylle ut selvangivelsen, under enkelhet.<\/p>",
"kilder": [
"AS3 s. 281",
"AS3 s. 297"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-02",
"nivaa": "viktig",
"kan": "Forklare virkningene på arbeidstilbudet av overgang fra progressiv til proporsjonal skatt (Sandmos tabell)",
"kort": "Lave inntekter: substitusjonsvirkning negativ, inntektsvirkning positiv, total ubestemt. Midlere: begge positive, total positiv. Høye: substitusjonsvirkning positiv, inntektsvirkning negativ, total ubestemt.",
"mer": "<p>Ved samme proveny får lave inntekter høyere marginal- og gjennomsnittsskatt, midlere inntekter lavere marginal-, men høyere gjennomsnittsskatt. Høye inntekter får lavere av begge.<\/p><p>Teorien gir derfor ingen klar hypotese; det blir et empirisk spørsmål. Det samme gjelder for flat skatt med bunnfradrag og for negativ inntektsskatt.<\/p><p><b>Felle:<\/b> å tro at flat skatt entydig øker arbeidstilbudet. Bare midlere inntekter har en entydig positiv virkning.<\/p>",
"kilder": [
"AS3 s. 286"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-03",
"nivaa": "viktig",
"kan": "Forklare hvorfor flat skatt ikke gir en klar effektivitetsgevinst i teorien",
"kort": "Lavinntektsgruppene får høyere marginalskatt og større skattekiler, mens midlere og høye inntekter får mindre. Substitusjonsvirkningene går i motsatt retning for ulike grupper, så nettovirkningen på effektiviteten er ubestemt.",
"mer": "<p>Overgangen fjerner ikke skattekilene, den flytter dem. Med bunnfradrag får en del av lavinntektsgruppen lavere marginalskatt (null), men totalvirkningen er fortsatt ubestemt.<\/p><p>Med negativ inntektsskatt trekker både inntekts- og substitusjonsvirkningen i retning av lavere arbeidstilbud for lavinntektsgruppene.<\/p><p><b>Felle:<\/b> å tro at lavere toppskatt alene avgjør effektiviteten. Høyere marginalskatt i bunnen trekker motsatt vei.<\/p>",
"kilder": [
"AS3 s. 286–287"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-04",
"nivaa": "viktig",
"kan": "Kjenne empirien om flat skatt og arbeidstilbud",
"kort": "USA 1986: menns arbeidstilbud tilnærmet uelastisk, kvinners mer elastisk; endringene skjer via yrkesfrekvens. Sverige 1991: økt arbeidstilbud. New Jersey-eksperimentet med negativ inntektsskatt: klar negativ virkning for lavinntektsgrupper.",
"mer": "<p>Høyinntektskvinner økte arbeidstilbudet mest etter 1986 (Eissa 1995). Konklusjonen: flatere skatter får flere kvinner i arbeid, mens menn endrer seg lite.<\/p><p>New Jersey-resultatet svekkes av Hawthorne-effekten (deltakelse i eksperimentet endrer atferd) og av at eksperimentet var kortvarig.<\/p><p>Feldstein: studiene fanger ikke opp intensitet, yrkesvalg og humankapital. Lindbeck: negativ inntektsskatt kan endre normer.<\/p><p><b>Felle:<\/b> å tro at virkningen i hovedsak går via antall timer for dem som jobber.<\/p>",
"kilder": [
"AS3 s. 288–290"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-05",
"nivaa": "viktig",
"kan": "Kjenne Hausmans tall for effektivitetstapet",
"kort": "Amerikansk inntektsskatt midt på 1970-tallet: tap på 22,5 % av skatteinntekten. Proporsjonal skatt på 14,6 %: tapet faller til 7,1 %. Flat skatt på 20,7 % med bunnfradrag på 4 000 dollar: 14,5 %.",
"mer": "<p>Tapet er beregnet via kompensert variasjon: rundsumbeløpet skattyterne må få for å være like godt stilt som før skatt. Det er større enn skatteinntekten på grunn av vridningene.<\/p><p>Tapet stiger med lønnsnivået. Rangeringen (proporsjonal lavest, så bunnfradrag, så progressiv) stemmer med teorien om at tapet vokser med marginalskatten.<\/p><p>Aaberge, Colombino og Strøm finner det samme mønsteret i Italia.<\/p><p><b>Felle:<\/b> å bytte om 7,1 % og 14,5 %. Proporsjonal skatt har lavest tap.<\/p>",
"kilder": [
"AS3 s. 290–291"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-06",
"nivaa": "viktig",
"kan": "Forklare hva flat skatt betyr for sparing og kapitalinntekt",
"kort": "Kapitalinntektsskatt er en skattekile som gjør framtidig konsum dyrere. Formuesskatten (progressiv) øker kilen. Det er ingen grunn til å vente at flat skatt øker sparingen, men en mer ensartet beskatning av ulike spareformer gir effektivitetsgevinster.",
"mer": "<p>Selv med den nordiske duale skatten er kapitalbeskatningen ikke flat: effektive satser varierer sterkt mellom aktiva og med formuesskatten.<\/p><p><b>Sverige (Agell, Englund og Södersten):<\/b> ved 5 % inflasjon og nominell sats 30 % var effektiv sats 60 % på bankinnskudd, 41 % på egen bolig og 0 % på varige forbruksgoder. Ved 0 % inflasjon ca. 30 %, 30 % og 0 %.<\/p><p><b>Felle:<\/b> å tro at Norge har helt flat skatt på kapital fordi satsen på alminnelig inntekt er lik for alle.<\/p>",
"kilder": [
"AS3 s. 287–288",
"AS3 s. 296"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-07",
"nivaa": "viktig",
"kan": "Skille horisontal og vertikal rettferdighet",
"kort": "Vertikal rettferdighet: omfordeling mellom inntektsgrupper. Horisontal rettferdighet: likebehandling av personer med samme betalingsevne. Den amerikanske reformen i 1986 skulle ikke endre den vertikale fordelingen, men øke den horisontale likheten.",
"mer": "<p>Sandmo påpeker at horisontal likhet er et komplisert begrep som ikke er lett å gi konkret innhold.<\/p><p>Eksempel på horisontal ulikhet: to personer med samme bruttoinntekt betaler ulik skatt fordi den ene har inntekten i en skattefavorisert form (f.eks. bolig). Flat skatt med bredt grunnlag skal redusere slike forskjeller.<\/p><p><b>Felle:<\/b> å bytte om begrepene. Vertikal = mellom rike og fattige, horisontal = mellom like.<\/p>",
"kilder": [
"AS3 s. 293"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-08",
"nivaa": "viktig",
"kan": "Forklare hvorfor reell progresjon ofte er mindre enn formell",
"kort": "Høye inntekter kan unngå de høye satsene gjennom fradrag, smalt grunnlag og unndragelse. USA 1986: lavere formell progresjon ga ingen klar omfordelingseffekt fordi grunnlaget ble bredere og unndragelsen i toppen falt.",
"mer": "<p>Gravelle (1992) og Auerbach og Slemrod (1997) finner ingen klar omfordelingseffekt av reformen. Høyinntektsgruppene måtte skatte av en høyere skattemessig inntekt og lavere marginalskatter reduserte omgåelse (Slemrod 1998).<\/p><p>Konklusjonen i AS3: flat skatt kan gi mindre omfordeling, men den reelle progresjonen er ofte betydelig mindre enn den formelle.<\/p><p><b>Felle:<\/b> å tro at lavere toppsatser automatisk gir mer ulikhet etter skatt.<\/p>",
"kilder": [
"AS3 s. 293",
"AS3 s. 297"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-09",
"nivaa": "viktig",
"kan": "Forklare hva optimal skatteteori sier om flat skatt",
"kort": "Mirrlees' simuleringer ga en tilnærmet lineær optimal skatt (≈ negativ inntektsskatt). Optimal marginalskatt er høyere jo lavere den kompenserte arbeidstilbudselastisiteten er, jo større spredningen i produktivitet er og jo sterkere ulikhetsaversjonen er.",
"mer": "<p>Mirrlees: identiske preferanser, ulik produktivitet, myndigheter med ulikhetsaversjon. Gjennomsnittsskatten steg med inntekten, mens marginalskatten var tilnærmet konstant eller svakt fallende.<\/p><p>Høyere marginalskatt gir større overføring og mer progresjon (Dixit og Sandmo 1977). Arbeids- og kapitalinntekt bør generelt ha ulike satser (Atkinson og Sandmo 1980), empirisk lavere på kapital. Nielsen og Sørensen (1997) begrunner den nordiske duale skatten slik, men skattearbitrasje mellom arbeid og kapital undergraver den (Agell og Persson 1997).<\/p><p><b>Felle:<\/b> å tro at optimal skatteteori anbefaler sterkt stigende marginalskatter.<\/p>",
"kilder": [
"AS3 s. 294–295"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-10",
"nivaa": "detalj",
"kan": "Kjenne fordelingsfunnene fra Sverige og Italia",
"kort": "Sverige 1991: reformen ga isolert vesentlig mindre utjevning, men økt barnetrygd og bostøtte kompenserte. Italia (simulert flat skatt): over 80 % tapere i de to laveste desilene, vinnere i flertall i de to øverste, 51,8 % vinnere totalt.",
"mer": "<p>Sverige-funnet viser at fordelingsvirkningen avhenger av hva reformen kombineres med. Inntektsavhengig bostøtte ga høye effektive marginalskatter på lave inntekter, en «fattigdomsfelle».<\/p><p>Italia-studien (Aaberge, Colombino og Strøm) forutsatte samme inntektsbegrep, altså ingen utvidelse av grunnlaget.<\/p><p><b>Felle:<\/b> å tro at flertallet tapte i Italia. Et svakt flertall (51,8 %) vant.<\/p>",
"kilder": [
"AS3 s. 294"
],
"eksamen": []
},
{
"id": "f7-flatere-sandmo-11",
"nivaa": "detalj",
"kan": "Kjenne Sandmos hovedkonklusjoner om flatere skatt",
"kort": "Teorien gir ingen klare hypoteser. Empirien heller mot en beskjeden positiv virkning på arbeidstilbudet og en klar effektivitetsgevinst. Flat skatt stimulerer ikke sparing og kan gi mindre omfordeling. Den er forenlig med et rasjonelt kompromiss mellom effektivitet og fordeling.",
"mer": "<p>Forenklingsgevinsten avhenger av hvilke andre reformer som gjennomføres. Uniforme satser og bredere grunnlag er vel så viktig for effektiviteten som forenklet skattestruktur.<\/p><p>Røed (1998): progresjon kan gi lavere likevektsledighet via lavere lønnskrav. Atkinsons «regnbuekoalisjon»: venstresiden liker bunnfradraget, høyresiden de lave toppsatsene.<\/p><p><b>Felle:<\/b> å tro at Sandmo enten anbefaler eller avviser flat skatt. Han konkluderer med at teorien ikke gir sterke anbefalinger.<\/p>",
"kilder": [
"AS3 s. 296–297"
],
"eksamen": []
}
]
},
{
"id": "f7-borgerlonn",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Borgerlønn: argumenter, Moenes forslag og Kvaløy-kronikken",
"eksamensvekt": 1,
"viktigst": [
"For: mindre fattigdom, frihet og entreprenørskap, enklere velferdssystem, sikring mot teknologisk ledighet, økt kjøpekraft",
"Mot: dyrt (høyere skatter), uklart om NAV-behovet faller, svekket arbeidsetikk, kan trekke flyktninger, administrativt komplisert",
"Moene: 80 000 kr til alle over 18 år med stemmerett ved kommunevalg",
"Kvaløy: vi har ikke råd til borgerlønn i dag, men kan snart ikke ha råd til å la være"
],
"punkter": [
{
"id": "f7-borgerlonn-01",
"nivaa": "viktig",
"kan": "Gjengi argumentene for borgerlønn",
"kort": "Reduserer fattigdom (minimumsinntekt til mat, bolig og helse), gir frihet og selvbestemmelse (utdanning, kreativt arbeid, entreprenørskap), forenkler velferdssystemet (mindre byråkrati), sikrer inntekt for dem som mister jobben ved teknologisk endring og øker kjøpekraften og etterspørselen.",
"mer": "<p>Lysbildet lister fem argumenter. Forenklingsargumentet bygger på at en universell betaling kan erstatte kompliserte, behovsprøvde ordninger.<\/p><p>Sandmo (AS3): negativ inntektsskatt er den eneste flatskattvarianten som gir reell omfordeling til de laveste inntektene og Atkinson kobler proporsjonal skatt med «basic income».<\/p><p><b>Felle:<\/b> å tro at borgerlønn er behovsprøvd. Den er universell.<\/p>",
"kilder": [
"F7 lb 44",
"AS3 s. 280"
],
"eksamen": []
},
{
"id": "f7-borgerlonn-02",
"nivaa": "viktig",
"kan": "Gjengi argumentene mot borgerlønn",
"kort": "Koster mye, så skattene må økes. Ikke sikkert at den reduserer behovet for NAV-tjenester. Kan svekke arbeidsetikken (sykefravær, ledighet). Kan trekke til seg flyktninger og svekke integreringen. Administrativt komplisert å innføre, håndheve og avgrense mot NAV.",
"mer": "<p>New Jersey-eksperimentet med negativ inntektsskatt (AS3) viste en klar negativ virkning på arbeidstilbudet for lavinntektsgrupper, som støtter arbeidsetikkargumentet.<\/p><p>Flyktningargumentet er bakgrunnen for at Moene vil avgrense borgerlønnen til dem som har stemmerett ved kommunevalg.<\/p><p><b>Felle:<\/b> å tro at administrativ enkelhet bare er et argument for. Lysbildet bruker også administrasjon og avgrensning som argument mot.<\/p>",
"kilder": [
"F7 lb 45",
"AS3 s. 288"
],
"eksamen": []
},
{
"id": "f7-borgerlonn-03",
"nivaa": "viktig",
"kan": "Kjenne Kalle Moenes borgerlønnsforslag",
"kort": "80 000 kr i borgerlønn til alle over 18 år som har stemmerett ved kommunevalg, mens velferdsordninger som gratis helsehjelp, sosialstøtte og utdanning beholdes. Avgrensningen skal hindre en strøm av «borgerlønnsjegere».",
"mer": "<p>Lysbildet: «Moene er litt på linje med Friedman», jf. tabellen der borgerlønn (negativ inntektsskatt) gir mest progresjon.<\/p><p>Moene nevner også alternativet å avgrense til dem som betaler skatt.<\/p><p><b>Felle:<\/b> å tro at Moene vil erstatte hele velferdsstaten med borgerlønn. Han vil beholde mange av ordningene.<\/p>",
"kilder": [
"F7 lb 42–43"
],
"eksamen": []
},
{
"id": "f7-borgerlonn-04",
"nivaa": "viktig",
"kan": "Kjenne Kvaløys argument for å ta borgerlønn på alvor",
"kort": "Borgerlønn er universell: ingen behovsprøving, aktivitetsplikt eller forventning om arbeid, i motsetning til arbeidslinjen. To trender utfordrer arbeidslinjen: (1) et plattformarbeidsliv med mer usikkerhet, midlertidighet og større lønnsforskjeller og (2) økt overvåking og kontroll som stigmatiserer mottakere.",
"mer": "<p>Kvaløy tror ikke robotene tar over arbeidet, men at arbeidsoppgaver i større grad kjøpes på et spotmarked. Da blir det dyrt for staten å administrere arbeidslinjen og krevende for folk å pendle mellom ytelser og lønn.<\/p><p>Velferdsstaten er et fellesgodespill: folk bidrar når nok andre gjør det. Et system som synliggjør nettomottakere, kan undergrave oppslutningen.<\/p><p>Konklusjon: «Foreløpig har vi ikke råd til universell borgerlønn», men utviklingen kan gjøre at vi «snart ikke har råd til å la være».<\/p><p><b>Felle:<\/b> å tro at Kvaløy går inn for borgerlønn nå.<\/p>",
"kilder": [
"Borgerlønn (Kvaløy, DN 5.10.2018)"
],
"eksamen": []
},
{
"id": "f7-borgerlonn-05",
"nivaa": "detalj",
"kan": "Vite hvem som har stemmerett ved kommunevalg",
"kort": "Norske og nordiske statsborgere samt andre som har vært bosatt i Norge sammenhengende i minst tre år før valgdagen og oppfyller kravene til alder og registrering. Ved stortingsvalg kreves norsk statsborgerskap.",
"mer": "<p>Reglene gjelder bare lokalvalg (kommune- og fylkestingsvalg). Moenes avgrensning betyr altså at innvandrere må ha bodd her i tre år før de får borgerlønn.<\/p><p>Sammenlign med skattereglene: der avgjør antall dager i Norge (183 og 270), ikke statsborgerskap.<\/p><p><b>Felle:<\/b> å tro at stemmerett ved kommunevalg krever statsborgerskap.<\/p>",
"kilder": [
"F7 lb 43"
],
"eksamen": []
},
{
"id": "f7-borgerlonn-06",
"nivaa": "detalj",
"kan": "Forklare Kvaløys «umulighetsteorem» for borgerlønn i Norge",
"kort": "Med vårt finmaskede sikkerhetsnett går regnestykket ikke opp: ytelsen blir enten for lav til å være sosialt akseptabel eller for høy til å være gjennomførbar, med mindre skattene økes markert.",
"mer": "<p>Ingen er mer skeptiske til borgerlønn enn nordmenn, blant annet på grunn av den protestantiske arbeidsetikken og et allerede godt sikkerhetsnett.<\/p><p>Kronikken viser til FNs generalsekretær Guterres (som tok opp «Universal Basic Income») og til boka «Borgerlønn. Ideen som endrer spillet» av Eliassen og Omdal.<\/p><p><b>Felle:<\/b> å tro at umulighetsteoremet er et formelt teorem. Det er Kvaløys betegnelse på en ligning som ikke går opp.<\/p>",
"kilder": [
"Borgerlønn (Kvaløy, DN 5.10.2018)"
],
"eksamen": []
}
]
},
{
"id": "f7-rettferdighet",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Hva økonomer og filosofer mener er et rettferdig skattesystem",
"eksamensvekt": 1,
"viktigst": [
"Utilitaristene (Bentham, Mill, Edgeworth, Pigou): avtakende grensenytte gir et betinget argument for omfordeling, ikke ubegrenset progresjon",
"Nozick: skatt er tvangsarbeid, minimal stat, mot progressiv skatt",
"Rawls: slør av uvitenhet og differensprinsippet, for progressiv skatt",
"Pettit (ikke-dominans), Murphy og Nagel (helheten teller), luck egalitarians (brute luck mot option luck)"
],
"punkter": [
{
"id": "f7-rettferdighet-01",
"nivaa": "viktig",
"kan": "Forklare det utilitaristiske argumentet for progressivitet",
"kort": "Bentham, Mill, Edgeworth og Pigou bygger på avtakende grensenytte: en krone betyr mindre for den rike, så samlet velferd maksimeres ved omfordeling. Argumentet er betinget og gir ikke ubegrenset progresjon.",
"mer": "<p>Uten insentivvirkninger fører argumentet til full utjevning (Edgeworth). Når arbeidsinnsatsen reagerer på skatten, må omfordelingen veies mot effektivitetstapet (Pigou, Mirrlees).<\/p><p>Mill motsatte seg progressiv skatt på arbeidsinntekt, som han kalte en straff på flid og sparsommelighet, men forsvarte sterk progressiv beskatning av arv og urealiserte kapitalgevinster.<\/p><p><b>Felle:<\/b> å tro at alle utilitarister gikk inn for sterk progresjon. Mill gjorde det ikke for arbeidsinntekt.<\/p>",
"kilder": [
"F7 lb 48",
"AS4 s. 51–54"
],
"eksamen": []
},
{
"id": "f7-rettferdighet-02",
"nivaa": "viktig",
"kan": "Kjenne Adam Smiths syn på skatt",
"kort": "Klassisk liberalisme: frihet, markeder og egeninteresse gir best samfunnsutvikling. Skatt bør betales etter evne. Staten har nødvendige oppgaver (forsvar, rettsvesen, infrastruktur). Smith åpnet for at de rike kunne betale mer, men var forsiktig med omfordeling som svekker insentiver.",
"mer": "<p>Mest kjente verk: Wealth of Nations (1776).<\/p><p>Sandmo (AS4): første maksime sier at borgerne bør bidra i forhold til sine evner, dvs. inntekten de nyter under statens beskyttelse. Fjerde maksime handler om at skatten skal koste minst mulig utover det den innbringer.<\/p><p><b>Felle:<\/b> å plassere Smith hos libertarianerne. Han aksepterte skatt etter evne og nødvendige statsoppgaver.<\/p>",
"kilder": [
"F7 lb 49",
"AS4 s. 50"
],
"eksamen": []
},
{
"id": "f7-rettferdighet-03",
"nivaa": "viktig",
"kan": "Kjenne Nozicks libertarianske syn på skatt",
"kort": "Individets rett til liv, frihet og eiendom er ukrenkelig. Staten skal være minimal (vaktmesterstat). Skatt er tvangsarbeid og brudd på eiendomsretten; rettmessig ervervet eiendom kan ikke omfordeles uten samtykke (entitlement-teorien). Mot progressiv skatt.",
"mer": "<p>Progressivitet er ekstra forkastelig fordi den tar en større andel fra dem som produserer mest. Libertarianerne avviser langt på vei redistributiv beskatning overhodet.<\/p><p>Staten skal bare beskytte mot vold, tyveri og kontraktsbrudd. Mest kjente verk: Anarchy, State and Utopia (1974).<\/p><p><b>Felle:<\/b> å bytte om Nozick og Rawls. Nozick er mot omfordeling; Rawls er for.<\/p>",
"kilder": [
"F7 lb 50–51"
],
"eksamen": []
},
{
"id": "f7-rettferdighet-04",
"nivaa": "viktig",
"kan": "Kjenne Rawls' syn på skatt",
"kort": "Liberal egalitarisme: ulikhet kan bare aksepteres hvis den gagner de dårligst stilte (differensprinsippet). Bak et «slør av uvitenhet» ville vi valgt et system med sikkerhetsnett og omfordeling. Positiv til progressiv skatt.",
"mer": "<p>Progressiv skatt er et verktøy for å utjevne forskjeller og sikre like muligheter. Samfunnets grunnleggende strukturer skal være rettferdige for alle, spesielt de svakeste.<\/p><p>Mest kjente verk: A Theory of Justice.<\/p><p><b>Felle:<\/b> å tro at Rawls krever full likhet. Ulikhet er akseptabel når den gagner de dårligst stilte.<\/p>",
"kilder": [
"F7 lb 52"
],
"eksamen": []
},
{
"id": "f7-rettferdighet-05",
"nivaa": "viktig",
"kan": "Kjenne republikanernes og Murphy og Nagels syn",
"kort": "Republikanere (Pettit): progresjon begrunnes med ikke-dominans, fordi store formueskonsentrasjoner gir makt til å dominere andre. Murphy og Nagel (The Myth of Ownership): det er fordelingen etter skatt av hele det finanspolitiske systemet som teller, ikke satsskalaen isolert.",
"mer": "<p>Murphy og Nagel mener det er meningsløst å vurdere progressiviteten i satsskalaen alene. Samme poeng som lb 27: et progressivt system omfordeler ikke nødvendigvis; det er samlet virkning av skatt og overføringer som avgjør.<\/p><p>Pettits maktargument minner om Moene (M): mange og rike gir politisk innflytelse.<\/p><p><b>Felle:<\/b> å tro at Murphy og Nagel argumenterer for en bestemt satsskala. De flytter fokus til fordelingen etter skatt.<\/p>",
"kilder": [
"F7 lb 53",
"F7 lb 27"
],
"eksamen": []
},
{
"id": "f7-rettferdighet-06",
"nivaa": "viktig",
"kan": "Kjenne luck egalitarians' syn på skatt",
"kort": "Dworkin, Cohen og Arneson skiller mellom «brute luck» og «option luck». Ulikhet som skyldes uvalgte omstendigheter (talent, arv, familiebakgrunn) bør nøytraliseres; ulikhet fra egne valg kan tillates. Det tilsier hard skatt på avkastning av talent og arv.",
"mer": "<p>Argumentet gir progresjon i den grad høye inntekter reflekterer flaks snarere enn innsats.<\/p><p>Sandmo (AS4) gjør et liknende poeng: inntekt fra hardt arbeid og talent har større legitimitet enn inntekt fra privilegier. Merk at luck egalitarians regner talent som flaks.<\/p><p><b>Felle:<\/b> å bytte om begrepene. Option luck er utfall av egne valg (f.eks. et veddemål), brute luck er det du ikke har valgt.<\/p>",
"kilder": [
"F7 lb 53"
],
"eksamen": []
},
{
"id": "f7-rettferdighet-07",
"nivaa": "detalj",
"kan": "Vite hva økonomer kan og ikke kan si om rettferdig skatt",
"kort": "Som økonomer har vi ikke verktøy til å si hva som er rettferdig fordeling. Vi kan karakterisere egenskapene ved skattesystemet: proporsjonalt, progressivt eller regressivt.",
"mer": "<p>Sandmo (AS4): utformingen av progressiv beskatning må bygge både på antakelser om økonomisk atferd (som empirisk forskning kan belyse) og på etiske verdinormer (som empiri ikke kan avgjøre).<\/p><p>Derfor presenterer forelesningen filosofenes syn i et appendiks i stedet for å konkludere.<\/p><p><b>Felle:<\/b> å tro at progressiv skatt er «det økonomisk riktige». Det er et verdispørsmål.<\/p>",
"kilder": [
"F7 lb 20",
"AS4 s. 58"
],
"eksamen": []
}
]
},
{
"id": "f7-moene",
"forelesning": "F7 Rettferdig skattesystem, flat skatt og borgerlønn",
"tittel": "Den sosiale overklassen under sosialdemokratiet (Moene, M)",
"eksamensvekt": 1,
"viktigst": [
"Mål rikdom ved antall rike over en «richness line» (head count), ikke bare inntektsandeler",
"Rikeste 0,1 % får 11 % av inntekten i USA mot 2,5 % i Norge, men Norge har nesten 4 ganger så mange rike og nesten 2 ganger så mange superrike per innbygger",
"Sosialdemokratiet skaper mange rike: lønnssammenpressing, kreativ destruksjon og sosial mobilitet",
"Mange rike gir politisk makt (Gilens og Page); fagbevegelsen er motvekt"
],
"punkter": [
{
"id": "f7-moene-01",
"nivaa": "viktig",
"kan": "Forklare Moenes head count-mål på rikdom",
"kort": "Rikdom bør måles som andelen av befolkningen over en «richness line», på samme måte som fattigdom måles som andelen under en fattigdomsgrense. Det er antallet rike, ikke bare hvor rike de er, som gir politisk makt.",
"mer": "<p>Moene er enig med Piketty i at de rike er de politisk mektige, men mener inntektsandelen til de rikeste x prosent er et dårlig mål på overklassens makt. «En person som eier alt, har mindre makt enn en gruppe som eier alt.»<\/p><p>Grensen er like vanskelig å sette som fattigdomsgrensen, «kanskje det høyeste nivået som tåles i offentligheten uten skam».<\/p><p><b>Felle:<\/b> å tro at Moene mener sosialdemokratiet har avskaffet overklassen. Målt i antall har det skapt en stor overklasse.<\/p>",
"kilder": [
"M s. 245–248"
],
"eksamen": []
},
{
"id": "f7-moene-02",
"nivaa": "viktig",
"kan": "Vite inntektsandelene til de rikeste i USA og Norge",
"kort": "Rikeste 0,1 % får 11 % av nasjonalinntekten i USA mot 2,5 % i Norge. Rikeste 1 % får nesten 25 % i USA mot under 8 % i Norge.",
"mer": "<p>Målt slik fremstår sosialdemokratiet som effektivt mot ekstrem rikdom. Det er dette bildet Moene snur ved å telle antall rike i stedet.<\/p><p>Forklaringen er at USA har større formuesulikhet blant de rike: noen få eier svært mye.<\/p><p><b>Felle:<\/b> å blande 0,1 %- og 1 %-tallene.<\/p>",
"kilder": [
"M s. 248",
"M s. 256"
],
"eksamen": []
},
{
"id": "f7-moene-03",
"nivaa": "viktig",
"kan": "Kjenne tallene for rike og superrike i Norge og USA",
"kort": "Per million innbyggere i 2013: USA 124,6 rike (formue over 30 mill. USD) og 36,5 superrike (over 100 mill. USD); Norge 472,8 og 63,6. Norge har nesten fire ganger så mange rike og nesten dobbelt så mange superrike.",
"mer": "<p>Kilde: Knight Franks Wealth Report 2014, uten kjøpekraftjustering.<\/p><p>Forbes (milliardærer per million innbyggere): Norge 2,0, Sverige 2,4 og Island 3,1, mot USA 1,7 og 0,4 til 1,3 i resten av Europa (Spania 0,4, Italia 0,6, Frankrike 0,7, Storbritannia 0,8, Tyskland 1,2). Bare skatteparadiser og land som vil bli det har flere enn Norge og Sverige. (Tallene for Norge og USA står på en side som mangler i Canvas-skannen.)<\/p><p><b>Felle:<\/b> å svare at USA har flest rike per innbygger fordi de rikeste er rikest der.<\/p>",
"kilder": [
"M s. 248–250"
],
"eksamen": []
},
{
"id": "f7-moene-04",
"nivaa": "viktig",
"kan": "Forklare hvorfor Norges høyere inntekt ikke forklarer forskjellen",
"kort": "Norge er 23,5 % rikere per innbygger enn USA. Selv om formuen til de rike i USA vokste tre ganger så raskt som nasjonalinntekten, ville USA bare fått 215,3 rike og 63,1 superrike per million, fortsatt under Norge.",
"mer": "<p>Moene kalibrerer en Pareto-fordeling. Med vekst lik, dobbelt og tredobbelt nasjonalinntektsveksten får USA 154,5/45,2, 184,5/54 og 215,3/63,1.<\/p><p>Grunnen er at USA har høyere formuesulikhet blant de rike (Gini over 0,8 mot ca. 0,6 i Norge). Da løftes få over grensen når inntektene vokser. USA har færre superrike, men de eier en større andel av formuen.<\/p><p><b>Felle:<\/b> å tro at høyere Gini gir flere rike. Høy konsentrasjon gir færre personer over grensen.<\/p>",
"kilder": [
"M s. 251–253"
],
"eksamen": []
},
{
"id": "f7-moene-05",
"nivaa": "viktig",
"kan": "Forklare hvorfor sosialdemokratiet skaper mange rike",
"kort": "Sosial trygghet og kapitalistisk dynamikk er komplementære, ikke et kompromiss. Solidarisk lønnspolitikk holder de høyeste lønningene nede, øker lønnsomheten av investeringer og fremskynder kreativ destruksjon. Gratis utdanning og sosial mobilitet øker antallet kapitaleiere.",
"mer": "<p>Gjennomgangen med Dagens Næringsliv av de rikeste i Norge viste at overklassen i stor grad har bygget formuen selv under sosialdemokratiet, ikke arvet den.<\/p><p>Mobilitet: sannsynligheten for at en sønn av en far i nederste femtedel havner i øverste femtedel er 8 % i USA og over 12 % i Norge.<\/p><p>Overklassen er størst der forskjellene blant arbeidstakerne er minst. Mange av de rike er likevel kritiske til velferdsstaten som la grunnlaget for rikdommen.<\/p><p><b>Felle:<\/b> å tro at de norske rike i hovedsak har arvet formuen.<\/p>",
"kilder": [
"M s. 246",
"M s. 253–255"
],
"eksamen": []
},
{
"id": "f7-moene-06",
"nivaa": "viktig",
"kan": "Forklare koblingen mellom antall rike og politisk makt",
"kort": "Gilens og Page: et forslag støttet av én av fem rike har 18 % sjanse for å bli vedtatt, ett støttet av fire av fem har 45 %; de rike har i praksis vetorett. Tatt bokstavelig har de rike i Norge 2,4 ganger så stor potensiell innflytelse som i USA.",
"mer": "<p>Studien gjelder politiske saker i USA 1981 til 2002. Stein Rokkan: «votes count, but resources decide».<\/p><p>Motvekten er fagbevegelsen: organiserte arbeidstakere begrenser de rikes makt. Wallenberg-familien i Sverige ble sett på som fagbevegelsens «sparemaskin», Rockefeller i USA som en trussel mot demokratiet.<\/p><p>Moene: sosialdemokratiet i Norge og Sverige kan bli «et offer for egen suksess» når mange blir rike og fagbevegelsen svekkes.<\/p><p><b>Felle:<\/b> å tro at Moene anbefaler høyere formuesskatt. Hans klareste politiske råd er et velorganisert arbeidsliv.<\/p>",
"kilder": [
"M s. 247",
"M s. 256–258"
],
"eksamen": []
}
]
},
{
"id": "f8-gjeld",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Gjeldsreduksjon og forholdsmessig gjeldsfordeling",
"eksamensvekt": 5,
"viktigst": [
"Gjelden fordeles forholdsmessig etter eiendelenes markedsverdi (verdien før rabatt)",
"Gjeld tilordnet en eiendel med rabatt reduseres med samme rabatt: aksjegjeld × 0,8",
"Gjeld tilordnet primærbolig reduseres ikke, så primærboligrabatten kommer fullt til gode",
"Nettoformue = sum av (formuesverdi − fradragsberettiget gjeld); negative poster motregnes",
"Testet i 7 av 9 sett: H2024 o6 (60 000 og 460 000) og H2025 o2 (750 000) er malene"
],
"punkter": [
{
"id": "f8-gjeld-01",
"nivaa": "kjerne",
"kan": "Forklare regelen om forholdsmessig gjeldsreduksjon",
"kort": "Gjelden fordeles forholdsvis på formuesgjenstandene. Gjeld knyttet til eiendeler med verdsettelsesrabatt reduseres med den samme rabatten, unntatt gjeld knyttet til primærbolig.",
"mer": "<p>Uten regelen kunne man fått fullt gjeldsfradrag for gjeld som finansierer eiendeler som bare telles med en del av verdien. For primærbolig lar regelen hele rabatten komme boligeieren til gode.<\/p><p><b>Felle (H2025 o2):<\/b> når oppgaven ikke sier at gjelden skal reduseres, godtok sensor både svaret med reduksjon (750 000) og uten (250 000). Står regelen i oppgaveteksten, skal den brukes.<\/p>",
"kilder": [
"F8 lb 55",
"BS5 s. 85",
"Oppg. F8 o3"
],
"eksamen": [
"H2016 o2a",
"H2019 o2c",
"H2021 o1c",
"H2023 o3",
"H2024 o6a",
"H2025 o2"
]
},
{
"id": "f8-gjeld-02",
"nivaa": "kjerne",
"kan": "Fordele gjelden etter markedsverdiandeler",
"kort": "Gjeld til eiendel i = gjeld × markedsverdi<sub>i<\/sub> / sum markedsverdier. Bruk verdien før rabatt, ikke formuesverdien.",
"mer": "<p><b>Eksempel (H2024 o6, F8 lb 88):<\/b> primærbolig 4,8, aksjer 1,0 og bank 0,2 mill. (sum 6). Andelene er 80 %, 16,67 % og 3,33 %, så gjelden på 1,8 mill. fordeles med 1 440 000, 300 000 og 60 000.<\/p><p><b>Felle:<\/b> å fordele etter formuesverdiene (1,2 / 0,8 / 0,2). Da får primærboligen bare 55 % av gjelden og svaret blir feil. H2019 o2c fordeler etter Skatteetatens markedsverdi (16/22,3 og 6,3/22,3), ikke etter kjøpesummen.<\/p>",
"kilder": [
"F8 lb 55",
"F8 lb 88"
],
"eksamen": [
"H2016 o2a",
"H2017 o1c",
"H2019 o2c",
"H2021 o1c",
"H2024 o6a",
"H2025 o2"
]
},
{
"id": "f8-gjeld-03",
"nivaa": "kjerne",
"kan": "Regne hvor mye gjelden reduseres",
"kort": "Reduksjon = gjeld tilordnet den rabatterte eiendelen × rabatten. H2024 o6a: 1,8 mill. × 16,67 % = 300 000 og 300 000 × 20 % = 60 000.",
"mer": "<p>Fradragsberettiget gjeld blir 1 440 000 + 240 000 + 60 000 = 1 740 000, altså 60 000 lavere enn 1,8 mill.<\/p><p>Reduksjonen gjelder bare aksjedelen: bankinnskudd har 0 % rabatt og primærboliggjelden er unntatt.<\/p><p><b>Felle:<\/b> feilalternativene bygger blant annet på gamle rabatter (300 000 × 55 % = 165 000 er fradragsberettiget aksjegjeld med 2021-regelen i H2021) eller på å redusere også primærboliggjelden.<\/p>",
"kilder": [
"F8 lb 88"
],
"eksamen": [
"H2024 o6a"
]
},
{
"id": "f8-gjeld-04",
"nivaa": "kjerne",
"kan": "Vite at gjeld på primærbolig ikke reduseres",
"kort": "Gjelden som henføres til primærboligen teller fullt ut, selv om boligen bare teller 25 %. Derfor gir primærboligen ofte en negativ netto post.",
"mer": "<p><b>Eksempel Gina (F8 lb 56):<\/b> aksjer 10 mill. og primærbolig 10 mill., gjeld 20 mill. fordelt 50/50. Brutto formue 10 × 0,8 + 10 × 0,25 = 10,5 mill. Gjeld 10 × 0,8 + 10 = 18 mill. Nettoformue 10,5 − 18 = −7,5 mill.<\/p><p><b>Felle:<\/b> å redusere primærboliggjelden med 75 % (2,5 i stedet for 10). Lb 88 understreker at primærboligen ikke får gjeldsreduksjon tilsvarende rabatten.<\/p>",
"kilder": [
"F8 lb 56",
"F8 lb 88",
"BS5 s. 85"
],
"eksamen": [
"H2018 o1b",
"H2021 o1c",
"H2023 o3",
"H2024 o6b",
"H2025 o2"
]
},
{
"id": "f8-gjeld-05",
"nivaa": "kjerne",
"kan": "Regne skattepliktig nettoformue med kolonnemetoden",
"kort": "Sett opp én kolonne per eiendel med formuesverdi minus fradragsberettiget gjeld og summer. H2024 o6b: 2 200 000 − 1 740 000 = 460 000.",
"mer": "<table><tr><th><\/th><th>Primærbolig<\/th><th>Aksjer<\/th><th>Bank<\/th><\/tr><tr><td>Markedsverdi<\/td><td>4 800 000<\/td><td>1 000 000<\/td><td>200 000<\/td><\/tr><tr><td>Formuesverdi<\/td><td>1 200 000<\/td><td>800 000<\/td><td>200 000<\/td><\/tr><tr><td>Tilordnet gjeld<\/td><td>1 440 000<\/td><td>300 000<\/td><td>60 000<\/td><\/tr><tr><td>Fradragsberettiget<\/td><td>1 440 000<\/td><td>240 000<\/td><td>60 000<\/td><\/tr><tr><td>Netto<\/td><td>−240 000<\/td><td>560 000<\/td><td>140 000<\/td><\/tr><\/table><p>Sum 460 000. <b>Avvik:<\/b> teksten på F8 lb 88 (Mia) sier aksjefond 1,8 mill., men tabellen og summen bruker 1 mill.; 1 mill. er riktig.<\/p>",
"kilder": [
"F8 lb 88"
],
"eksamen": [
"H2024 o6b"
]
},
{
"id": "f8-gjeld-06",
"nivaa": "kjerne",
"kan": "Regne nettoformue når gjelden deles 50/50",
"kort": "H2025 o2: primærbolig og aksjefond på 5 mill. hver og gjeld 5 mill. gir (1,25 − 2,5) + (4 − 2) = 750 000. Uten gjeldsreduksjon blir det 250 000; begge svarene ble godtatt.",
"mer": "<p>Kolonne for kolonne: primærbolig 1 250 000 − 2 500 000 = −1 250 000; aksjefond 4 000 000 − 2 000 000 = 2 000 000.<\/p><p><b>H2023 o3 (Pernille):<\/b> aksjefond 10 mill., primærbolig 10 mill., gjeld 10 mill. og bunnfradrag 1,5 mill.: 8 + 2,5 − (4 + 5) − 1,5 = 0 i formuesskatt.<\/p><p><b>Felle:<\/b> de negative alternativene i H2025 (−250 000 og −750 000) er fortegnsspeilinger. Formuesverdien (5,25 mill.) er større enn fradragsberettiget gjeld (4,5 mill.), så svaret må være positivt.<\/p>",
"kilder": [
"F8 lb 55",
"F8 lb 56"
],
"eksamen": [
"H2023 o3",
"H2025 o2"
]
},
{
"id": "f8-gjeld-07",
"nivaa": "kjerne",
"kan": "Regne Sondre-oppgaven med bunnfradrag",
"kort": "Aksjer 20 mill., primærbolig 5 mill., gjeld 10 mill. og bunnfradrag 1,7 mill.: 16 + 1,25 − 6,4 − 2 − 1,7 = 7,15 mill. Formuesskatten på 1 % blir 71 500 kr.",
"mer": "<p>Andeler: aksjer 80 % (20/25) og bolig 20 %. Aksjegjelden 8 mill. × 0,8 = 6,4 mill.; boliggjelden 2 mill. uten reduksjon.<\/p><p><b>Avvik i fasiten:<\/b> teksten skriver primærboligens formuesverdi som 1,2 mill. ett sted og nettoformuen som «7,1 mill.», men tabellen bruker 1,25 mill. og skatten 71 500 kr. Riktig er 7,15 mill. og 71 500 kr.<\/p><p><b>Felle:<\/b> å glemme bunnfradraget (88 500 kr) eller å redusere boliggjelden med 75 % (86 500 kr).<\/p>",
"kilder": [
"Oppg. F8 o3"
],
"eksamen": []
},
{
"id": "f8-gjeld-08",
"nivaa": "viktig",
"kan": "Motregne negative og positive netto poster",
"kort": "Negativ netto på én eiendel (typisk primærboligen) trekkes fra positive poster på andre eiendeler. Blir summen negativ, er det ingen formuesskatt.",
"mer": "<p>I H2024 o6b er primærboligens netto −240 000, som motregnes mot 560 000 og 140 000. Gina (F8 lb 56) ender på −7,5 mill. og betaler ingen formuesskatt.<\/p><p>H2016 o2a: sensorveiledningen sa at kandidater som mente at negativ verdi på primærboligen ikke kunne motregnes mot sekundærboligen, ikke skulle trekkes. Regelen i forelesningene er likevel at alt motregnes.<\/p>",
"kilder": [
"F8 lb 56",
"F8 lb 88"
],
"eksamen": [
"H2016 o2a",
"H2024 o6b"
]
},
{
"id": "f8-gjeld-09",
"nivaa": "viktig",
"kan": "Forklare hvem som rammes av gjeldsreduksjonsregelen",
"kort": "Den som bare har primærbolig (og bankinnskudd) får ingen økning fordi primærboliggjeld ikke avkortes. Den som har gjeld og rabatterte eiendeler som aksjer, eller tidligere sekundærbolig, får høyere formuesskatt.",
"mer": "<p><b>H2016 o2:<\/b> primærbolig 20 mill., sekundærbolig 10 mill. (80 %), gjeld 10 mill. og sats 0,85 %. Før: 5 + 8 − 10 = 3 mill. gir 25 500 kr. Etter fordeling 2/3 og 1/3 og 20 % avkorting av sekundærgjelden: (5 − 6,67) + (10 − 3,33) × 0,8 = 3,67 mill. gir 31 196 kr, en økning på 5 695 kr.<\/p><p>Statssekretæren hadde rett i at vanlige boligeiere med bare primærbolig ikke får økt skatt (o2b).<\/p>",
"kilder": [
"F8 lb 55"
],
"eksamen": [
"H2016 o2a",
"H2016 o2b"
]
},
{
"id": "f8-gjeld-10",
"nivaa": "viktig",
"kan": "Vurdere om det lønner seg å bruke bankinnskudd i stedet for lån",
"kort": "Ja, når gjelden avkortes. Bankinnskudd har ingen rabatt, mens gjeld knyttet til rabatterte eiendeler bare gir delvis fradrag, så å bruke innskuddet reduserer formuesskatten.",
"mer": "<p><b>H2017 o1 (2017-regler, sats 0,85 %):<\/b> Peder har sekundærbolig 4 mill. (90 %), bank 2 mill. og gjeld 4 mill. Med lån: 2 + 3,6 − 2,4 − 1,33 = 1,87 ≈ 1,9 mill., som gir 16 150 kr. Bruker han innskuddet og låner bare 2 mill.: 3,6 − 2 × 0,9 = 1,8 mill., som gir 15 300 kr.<\/p><p>Logikken: 1 krone i banken teller 1 krone, mens 1 krone gjeld på sekundærboligen bare ga 0,9 kroner fradrag. Med dagens regler gjelder det samme for gjeld knyttet til aksjer (0,8 kroner).<\/p>",
"kilder": [
"F8 lb 55"
],
"eksamen": [
"H2017 o1c",
"H2017 o1d",
"H2017 o1e"
]
},
{
"id": "f8-gjeld-11",
"nivaa": "detalj",
"kan": "Følge oppgavens avrundingsinstruks og eldre satser",
"kort": "Gamle sett bruker eldre regler (sats 0,85 %, sekundærbolig 80 % eller 90 %, aksjefond 55 %) og krever ofte avrunding underveis. Svaret treffer bare alternativet hvis du følger instruksen.",
"mer": "<p><b>H2019 o2c:<\/b> med avrunding til én desimal blir nettoformuen 4 + 5,7 − 7,2 − 2,5 = 0, som er riktig alternativ. Eksakt regning gir om lag −47 000 og treffer ingen alternativer.<\/p><p><b>H2017 o1d:<\/b> 1,8667 mill. rundes til 1,9 mill. og gir 16 150 kr (eksakt 15 867 kr).<\/p><p><b>H2021 o1c:<\/b> fasiten 285 027 bruker avrundede andeler (0,1667 og 0,033); eksakt blir det 285 000.<\/p>",
"kilder": [
"F8 lb 88"
],
"eksamen": [
"H2017 o1d",
"H2019 o2c",
"H2021 o1c"
]
}
]
},
{
"id": "f8-verdsettelse",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Verdsettelsesrabatter og formuesverdier",
"eksamensvekt": 4,
"viktigst": [
"Aksjer og aksjefond (børsnoterte og unoterte): 20 % rabatt, formuesverdi = 80 % av markedsverdi",
"Primærbolig: 25 % av markedsverdien opp til 10 mill. kr og 70 % av det som overstiger",
"Sekundærbolig 100 % (ingen rabatt); fritidsbolig maks 30 %; næringseiendom: × 0,9 × 0,8",
"Børsnoterte aksjer: kurs 1. januar i skattefastsettingsåret; unoterte: bokført verdi, i snitt ca. halvparten av markedsverdien før rabatten"
],
"punkter": [
{
"id": "f8-verd-01",
"nivaa": "kjerne",
"kan": "Regne formuesverdien av aksjer og aksjefond",
"kort": "Formuesverdi = markedsverdi × 80 % (aksjerabatt 20 %). Rabatten gjelder både børsnoterte og unoterte aksjer og aksjefond.",
"mer": "<p><b>H2023 o4a:<\/b> formuesverdi 300 000 × 0,8 × 1 % = 2 400 kr i formuesskatt. <b>H2025 o1:<\/b> 10 mill. × 0,8 × 1 % = 80 000 kr per år, 160 000 kr for to år.<\/p><p><b>Felle:<\/b> å glemme rabatten: 300 000 × 1 % = 3 000 står som alternativ i H2023 o4a. Gamle oppgaver bruker andre rabatter, for eksempel 45 % på aksjefond i H2021 o1c (formuesverdi 55 %). Bruk rabatten som står i oppgaven.<\/p>",
"kilder": [
"F8 lb 7",
"F8 lb 71",
"BS5 s. 85"
],
"eksamen": [
"H2021 o1c",
"H2023 o4a",
"H2024 o6b",
"H2025 o1",
"H2025 o2"
]
},
{
"id": "f8-verd-02",
"nivaa": "kjerne",
"kan": "Regne formuesverdien av en primærbolig",
"kort": "25 % av markedsverdien opp til 10 mill. kr pluss 70 % av det som overstiger 10 mill. kr (rabatt 75 % og 30 %).",
"mer": "<p><b>Eksempel (F8 lb 70):<\/b> markedsverdi 20 mill. gir 10 × 25 % + 10 × 70 % = 2,5 + 7 = 9,5 mill. kr.<\/p><p><b>Felle:<\/b> å bruke 25 % på hele verdien (5 mill.) eller 30 % i stedet for 70 % på delen over terskelen. Primærbolig er boligen du er folkeregistrert på.<\/p><p><b>Merk:<\/b> hjelpekilden 05-satser-2026 oppgir at terskelen ble hevet til 14 mill. kr fra inntektsåret 2026 (lov juni 2026). Det står ikke i forelesningen. Følg oppgaveteksten, ellers forelesningens 10 mill.<\/p>",
"kilder": [
"F8 lb 7",
"F8 lb 44",
"F8 lb 70",
"BS5 s. 85"
],
"eksamen": [
"H2016 o2a",
"H2018 o1b",
"H2019 o2b",
"H2023 o3",
"H2024 o6b",
"H2025 o2"
]
},
{
"id": "f8-verd-03",
"nivaa": "kjerne",
"kan": "Vite at sekundærbolig ikke får rabatt",
"kort": "Sekundærbolig verdsettes til 100 % av markedsverdien (basert på SSBs prisstatistikk), så gjelden knyttet til den reduseres heller ikke.",
"mer": "<p>Sekundærbolig er en bolig du eier, men ikke er folkeregistrert på. Formuesskatt og kommunal eiendomsskatt gjør det dyrere å investere i bolig for utleie (F8 lb 45, F3).<\/p><p><b>Felle:<\/b> eldre eksamener bruker gamle regler: 80 % i H2016 og H2017 (2016-regler), 90 % i H2017 (2017-regler), H2018 og H2019. Da ble gjelden på sekundærboligen avkortet med 20 % eller 10 %. Med dagens 100 % er det ingen avkorting.<\/p>",
"kilder": [
"F8 lb 45",
"F8 lb 71",
"BS5 s. 85"
],
"eksamen": [
"H2016 o2a",
"H2017 o1a",
"H2018 o1b",
"H2019 o2b"
]
},
{
"id": "f8-verd-04",
"nivaa": "kjerne",
"kan": "Forklare hvordan børsnoterte og unoterte aksjer verdsettes",
"kort": "Børsnoterte aksjer verdsettes til børskursen 1. januar i skattefastsettingsåret (året etter inntektsåret), unoterte til bokført verdi (eiendeler minus gjeld). Begge får deretter 20 % rabatt.",
"mer": "<p>Bokført egenkapital fanger i liten grad opp forventet inntjening, immaterielle verdier og risiko.<\/p><p><b>Eksempel (F1 lb 14–16):<\/b> gründeren Anine regnet formuesskatt av en verdsettelse på 100 mill. Selskapet var unotert med 10 mill. i bankinnskudd, så hennes 45 % ga 4,5 mill. i bokført verdi: (4,5 × 0,8 − 1,7) × 1 % = 19 000 kr, ikke 495 000.<\/p><p><b>Felle:<\/b> å bruke prisen i en emisjon eller et oppkjøp som formuesverdi for en unotert aksje.<\/p>",
"kilder": [
"F8 lb 7",
"BS5 s. 85",
"F1 lb 14–16"
],
"eksamen": []
},
{
"id": "f8-verd-05",
"nivaa": "viktig",
"kan": "Forklare hvorfor unoterte aksjer får en ekstra skjult rabatt og hva det fører til",
"kort": "Formuesverdien av unoterte aksjer er i snitt bare om lag halvparten av markedsverdien før aksjerabatten på 20 %. Derfor har de rikeste mye av formuen i unoterte aksjer.",
"mer": "<p>Andresen og Bø (2022) og Grindaker og Vestad (2025) anslår om lag 50 % (BS5). F8 lb 7: unoterte aksjer på OTC-listen har formuesverdi 50–65 % under reell markedsverdi før rabatten (SSB). F4 lb 70: formuesverdien inkludert aksjerabatt er 35–40 % av markedsverdien.<\/p><p>Konsekvenser: lavere proveny, påvirkning på børsens virkemåte og kapitalallokeringen og smarte investorer kan ta selskaper av børs for å spare formuesskatt (F1 lb 17). BS5 mener dette er formuesskattens egentlige problem.<\/p>",
"kilder": [
"F8 lb 7",
"F8 lb 24",
"BS5 s. 85",
"F4 lb 70",
"F1 lb 17"
],
"eksamen": []
},
{
"id": "f8-verd-06",
"nivaa": "viktig",
"kan": "Regne formuesverdien av næringseiendom",
"kort": "Formuesverdi = nåverdi av utleieverdien × (100 % − 10 %) × 80 %: markedsverdien justeres ned 10 % for eierkostnader og får deretter 20 % rabatt.",
"mer": "<p>Nåverdien er leieinntekten delt på kalkulasjonsfaktoren (evig kontantstrøm).<\/p><p><b>Eksempel (F8 lb 51):<\/b> leie 85 714 kr og kalkulasjonsfaktor 8,5 %: 85 714 × 0,9 × 0,8 / 0,085 = 726 048 kr.<\/p><p><b>Avvik:<\/b> lysbildet oppgir 806 720 kr. Det tallet er 85 714 × 0,8 / 0,085, altså uten fratrekket på 10 % for eierkostnader. Formelen på lb 49 og 51 er riktig; regn med den.<\/p><p><b>Felle:<\/b> å glemme ett av de to fratrekkene eller gange med kalkulasjonsfaktoren i stedet for å dele.<\/p>",
"kilder": [
"F8 lb 47",
"F8 lb 49",
"F8 lb 51"
],
"eksamen": []
},
{
"id": "f8-verd-07",
"nivaa": "viktig",
"kan": "Forklare hvordan kalkulasjonsfaktoren for næringseiendom settes og virker",
"kort": "Årsgjennomsnittet av renten på 10-årige statsobligasjoner pluss 5 prosentpoeng (8,5 % i 2024), med 1 prosentpoeng tillegg utenfor Oslo, Bergen, Trondheim og Stavanger. Høyere faktor gir lavere formuesverdi.",
"mer": "<p>Faktoren er diskonteringsrenten i en evig kontantstrøm, så formuesverdien er omvendt proporsjonal med den.<\/p><p>Faktoren skal speile realavkastningen på næringseiendom. Til sammenligning (J): realavkastningen på eiendom i Norge etter 1980 var 9,82 %, på aksjer 12,2 %. Oljefondet har hatt realavkastning under 4 % siden 1998 og stort sett under 10 % på eiendom.<\/p><p><b>Felle:<\/b> å tro at høyere faktor gir høyere formuesverdi.<\/p>",
"kilder": [
"F8 lb 50",
"F8 lb 52",
"F8 lb 53"
],
"eksamen": []
},
{
"id": "f8-verd-08",
"nivaa": "viktig",
"kan": "Forklare hvordan markedsverdien av utleid og ikke utleid næringseiendom fastsettes",
"kort": "Utleid: snittet av de tre siste års leieinntekter diskontert som en evig strøm. Ikke utleid (eieren bruker den selv): kvadratmeterprisen for tilsvarende utleide lokaler i samme område.",
"mer": "<p>Problemene forelesningen peker på:<\/p><ul><li>En eiendom varer ikke evig, men verdsettes som en evig kontantstrøm.<\/li><li>For ikke utleid eiendom finnes det ikke alltid en «tvillingeiendom» i et «tvillingområde».<\/li><li>Får en industribedrift på Voss kvadratmeterprisen fra Bergen fordi det mangler sammenlignbare eiendommer, blir formuesgrunnlaget trolig for høyt.<\/li><\/ul>",
"kilder": [
"F8 lb 47",
"F8 lb 48",
"F8 lb 54"
],
"eksamen": []
},
{
"id": "f8-verd-09",
"nivaa": "viktig",
"kan": "Forklare hvordan Skatteetaten beregner markedsverdien av en bolig",
"kort": "Skatteetaten bruker SSBs modell med beliggenhet, alder, areal (P-rom/BOA) og boligtype. I oppgavene blir det kvadratmetersats × areal.",
"mer": "<p><b>H2019 o2a:<\/b> villa 200 kvm × 80 000 = 16 mill. og leilighet 70 kvm × 90 000 = 6,3 mill. Formuesverdier i o2b (2019-regler): 16 × 25 % = 4 mill. og 6,3 × 90 % = 5,7 mill.<\/p><p>Arealfaktoren er bygd slik at den første kvadratmeteren er mer verdt enn den neste. Modellen tar ikke hensyn til basseng, tennisbane, strandlinje og lignende. Oslo og Bergen bruker samme beregning for eiendomsskatten.<\/p><p><b>Felle:<\/b> kjøpesummen er ikke Skatteetatens markedsverdi.<\/p>",
"kilder": [
"F8 lb 44",
"F8 lb 66"
],
"eksamen": [
"H2019 o2a",
"H2019 o2b"
]
},
{
"id": "f8-verd-10",
"nivaa": "viktig",
"kan": "Vite hvordan fritidsbolig verdsettes",
"kort": "Formuesverdien av fritidsbolig skal maksimalt være 30 % av markedsverdien (rabatt 70 %). Skattyter kan klage hvis den overstiger 30 % av dokumentert markedsverdi.",
"mer": "<p>Lb 7 formulerer det som 30 % av kostpris eller 30 % av markedsverdien, inkludert tomt. Oversiktstabellen (lb 71) oppgir rabatten til 70 %.<\/p><p>Fritidsbolig skiller seg dermed sterkt fra sekundærbolig (0 % rabatt). I kommuner med eiendomsskatt kommer eiendomsskatten i tillegg og den kan være fristende å legge høyt på hytter fordi hytteeierne ikke stemmer i kommunen.<\/p>",
"kilder": [
"F8 lb 7",
"F8 lb 46",
"F8 lb 71"
],
"eksamen": []
},
{
"id": "f8-verd-11",
"nivaa": "detalj",
"kan": "Gjengi rabattabellen for formuesskatten",
"kort": "Primærbolig 75 % (30 % over 10 mill.), sekundærbolig 0 %, næringseiendom 20 %, aksjer og aksjefond 20 %, jord- og skogbrukseiendom 30 % og fritidseiendom 70 %.",
"mer": "<table><tr><th>Eiendel<\/th><th>Rabatt<\/th><th>Formuesverdi<\/th><\/tr><tr><td>Primærbolig<\/td><td>75 % (30 % over 10 mill.)<\/td><td>25 % (70 %)<\/td><\/tr><tr><td>Sekundærbolig<\/td><td>0 %<\/td><td>100 %<\/td><\/tr><tr><td>Næringseiendom<\/td><td>20 %<\/td><td>80 % (etter 10 % eierkostnader)<\/td><\/tr><tr><td>Aksjer, aksjefond<\/td><td>20 %<\/td><td>80 %<\/td><\/tr><tr><td>Jord- og skogbruk<\/td><td>30 %<\/td><td>70 %<\/td><\/tr><tr><td>Fritidseiendom<\/td><td>70 %<\/td><td>maks 30 %<\/td><\/tr><\/table><p>Tabellen på lb 71 har overskriften «Rabatt 2024». Bankinnskudd står ikke i tabellen, men har ingen rabatt (H2024 o6).<\/p>",
"kilder": [
"F8 lb 71"
],
"eksamen": []
},
{
"id": "f8-verd-12",
"nivaa": "detalj",
"kan": "Vurdere hvor treffsikker boligverdsettelsen er",
"kort": "Om lag 75 % av SSB-modellens verdier ligger innenfor ±20 % av observerte priser. Modellen treffer dårligere for dyre boliger.",
"mer": "<p>Kilde: Medby og Takle, SSB notat 2023/18. Resultatet tilsier at det i noen tilfeller kan være grunn til å klage.<\/p><p>NHH-masteroppgave om 58 dyre boliger i Oslo og Bergen: modellen bygger på omsetninger på Finn.no og fanger ikke opp det lukkede markedet der mange av de dyreste boligene selges og den bruker få kjennetegn ved boligen.<\/p><p>Eksempel: Kygos villa kjøpt for 41 mill. i 2018 hadde samme grunnlag for eiendomsskatt som boliger omsatt for 6–7 mill. i Bergen. Begge skatter gir de dyreste eiendommene betydelig rabatt.<\/p>",
"kilder": [
"F8 lb 66",
"F8 lb 67",
"F8 lb 68",
"F8 lb 86",
"F8 lb 87"
],
"eksamen": []
},
{
"id": "f8-verd-13",
"nivaa": "detalj",
"kan": "Vite hvordan man klager på for høy formuesverdi",
"kort": "Man må dokumentere markedsverdien med takst fra takstmann, verdivurdering fra eiendomsmegler eller salgsverdi for omtrent lik bolig i området. Dokumentasjonen må være fra tiden etter 1. juli i inntektsåret.",
"mer": "<p>Kravet om at dokumentasjonen er fra andre halvår skyldes at den skal gjelde formuen ved årets utgang.<\/p><p>For fritidsbolig kan man klage hvis formuesverdien overstiger 30 % av dokumentert markedsverdi. Med SSB-modellens treffsikkerhet (75 % innenfor ±20 %) kan det for enkelte boliger lønne seg å klage, særlig for dyre boliger der modellen treffer dårligst.<\/p>",
"kilder": [
"F8 lb 85",
"F8 lb 46",
"F8 lb 68"
],
"eksamen": []
}
]
},
{
"id": "f8-avkastning",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Formuesskatt som avkastningsskatt og verdsetting av aksjer (BS4)",
"eksamensvekt": 4,
"viktigst": [
"Skatt på startformuen: τW = trW, altså τ = rt og t = τ/r (1 % og r = 5 % gir 20 %)",
"Skatt på sluttformuen: W(1 + r)τ = Wrt, altså τ = tr/(1 + r) (H2021: 0,64 %) og t = 21 % ved τ = 1 %",
"Formuesskatt senker alternativavkastningen: 10/200 = 5 % blir (10 − 2)/200 = 4 %",
"V = (C − τV)/(r − τ) = C/r: norsk og skattefri investor verdsetter likt (5 mill. gir 100 mill.)",
"En eier som hever avkastningskravet på grunn av formuesskatten, skader sin egen formue"
],
"punkter": [
{
"id": "f8-avk-01",
"nivaa": "kjerne",
"kan": "Utlede ekvivalensen mellom formuesskatt og skatt på kapitalgevinst",
"kort": "W<sup>t<\/sup> = (1 + r)W − trW og W<sup>τ<\/sup> = (1 + r)W − τW er like når τ = rt, altså t = τ/r. Med τ = 1 % og r = 5 % er t = 20 %.",
"mer": "<p>Forutsetninger: formuesskatten legges på startformuen og alle har samme avkastning r. Provenyet er trW for gevinstskatten og τW for formuesskatten.<\/p><p><b>H2025 o9:<\/b> W = 100, r = 5 % og T = 1 % på inngående formue: 100 × 1 % = 100 × 5 % × t gir t = 20 %.<\/p><p><b>Felle:<\/b> alternativene var 20, 21, 22 og 23 %. 21 % er svaret når formuesskatten legges på formuen ved periodens slutt. t = τ × r (0,05 %) er også feil.<\/p>",
"kilder": [
"F8 lb 27",
"F8 lb 28",
"BS5 s. 88–89"
],
"eksamen": [
"H2025 o9"
]
},
{
"id": "f8-avk-02",
"nivaa": "kjerne",
"kan": "Regne ekvivalent sats når formuesskatten legges på formuen ved årets slutt",
"kort": "W(1 + r)τ = Wrt gir τ = tr/(1 + r) og t = (1 + r)τ/r. H2021 o3: t = 22 % og r = 3 % gir τ = 0,22 × 0,03 / 1,03 = 0,64 %.",
"mer": "<p>Formue investert ved årets start har vokst til W(1 + r) ved slutten, så grunnlaget er større og satsen lavere.<\/p><p><b>F8 lb 29:<\/b> τ = 1 % og r = 5 % gir t = 1,05 × 1 % / 5 % = 21 %. En formuesskatt på sluttformuen tilsvarer altså en høyere gevinstskatt (21 % mot 20 %).<\/p><p><b>Felle:<\/b> å bruke τ = rt også her (0,66 % i H2021). Les nøye om formuesskatten faller på start- eller sluttformuen.<\/p>",
"kilder": [
"F8 lb 29",
"Oppg. F8 o1"
],
"eksamen": [
"H2021 o3a",
"H2021 o3b"
]
},
{
"id": "f8-avk-03",
"nivaa": "kjerne",
"kan": "Regne avkastningen med og uten formuesskatt",
"kort": "Uten skatt: 10/200 = 5 %. Med 1 % formuesskatt på 200 mill. (2 mill.): (10 − 2)/200 = 4 %, så alternativavkastningen for en norsk investor er r − τ.",
"mer": "<p>Eksempel 1 (F8 lb 13–15): aksjeposten kjøpes for 200 mill., gir 10 mill. og selges for 200 mill. Uten kursgevinst er avkastningen kontantstrømmen delt på investeringen.<\/p><p>I et effisient marked gir alle aksjer i samme risikoklasse 5 %, så nordmannens alternativ i denne risikoklassen er 4 %, ikke 5 %.<\/p><p><b>Felle:<\/b> å tro at nordmannen kan kreve 5 % etter skatt. Markedet kompenserer ikke for formuesskatten (lærdom 1).<\/p>",
"kilder": [
"F8 lb 13",
"F8 lb 14",
"F8 lb 15",
"BS4 s. 876"
],
"eksamen": [
"H2025 o3a",
"H2025 o3b"
]
},
{
"id": "f8-avk-04",
"nivaa": "kjerne",
"kan": "Verdsette en evig kontantstrøm med og uten formuesskatt",
"kort": "Uten formuesskatt: V = C/r = 5/5 % = 100 mill. Med formuesskatt: V = (C − τV)/(r − τ) = (5 − 1)/4 % = 100 mill., altså samme verdi.",
"mer": "<p>Generelt: (10 − (10/r)τ)/(r − τ) = (10/r)(r − τ)/(r − τ) = 10/r. Formuesskatten beregnes av markedsverdien (100 mill.), altså 1 mill. per år.<\/p><p><b>Felle (H2025 o3c og o3d):<\/b> 80 mill. = (5 − 1)/5 % står som alternativ i o3c og kommer av å trekke fra skatten, men diskontere med markedets 5 %. Å bruke 4 % uten å trekke fra skatten gir 125 mill. Riktig er å gjøre begge deler.<\/p>",
"kilder": [
"F8 lb 17",
"F8 lb 18",
"F8 lb 19",
"F8 lb 20",
"BS4 s. 877",
"BS5 s. 87"
],
"eksamen": [
"H2025 o3c",
"H2025 o3d"
]
},
{
"id": "f8-avk-05",
"nivaa": "kjerne",
"kan": "Forklare lærdom 1: markedet kompenserer ikke skattlagte investorer",
"kort": "I et effisient marked er alternativavkastningen for skattlagte investorer lavere enn for skattefrie. Ingen selger billig til nordmenn for at de skal få 5 % etter formuesskatt.",
"mer": "<p>For at nordmannen skal få 5 % må utlendingen selge for x: (10 − 1 % × x)/x = 5 % gir x = 166,67 mill., under markedsprisen på 200 mill. Det skjer ikke i et effisient marked.<\/p><p>Analogien er frikonkurranse: en bedrift som prøver å selge over markedspris, selger ingenting. Konkurransen om prosjekter avgjøres av hvem som har størst disponibel inntekt etter skatt.<\/p>",
"kilder": [
"F8 lb 15",
"F8 lb 16",
"F8 lb 22",
"F8 lb 23"
],
"eksamen": [
"H2025 o3b"
]
},
{
"id": "f8-avk-06",
"nivaa": "kjerne",
"kan": "Forklare lærdom 2: teller og nevner utligner hverandre",
"kort": "Formuesskatten reduserer kontantstrømmen (telleren) og alternativavkastningen (nevneren) like mye, så skattlagte og skattefrie investorer verdsetter børsnoterte aksjer likt. Formuesskatten gir ikke ulik betalingsvilje.",
"mer": "<p>BS4 viser dette i en en-periodemodell, med uendelig horisont og martingale kontantstrømmer og med endelig horisont uten martingale-antakelsen. Resultatet holder også med kapitalinntektsskatt, når skatten legges på sluttformuen eller på realiserte gevinster og med ulike satser.<\/p><p>Konsekvens: påstanden om at formuesskatten er en «særskatt» som gjør at utlendinger byr mer for norske aksjer, holder ikke i et effisient kapitalmarked (loven om én pris).<\/p>",
"kilder": [
"F8 lb 21",
"BS4 s. 873–875",
"BS4 s. 882",
"BS5 s. 87"
],
"eksamen": [
"H2025 o3d"
]
},
{
"id": "f8-avk-07",
"nivaa": "kjerne",
"kan": "Regne effektiv avkastningsskatt av en formuesskatt",
"kort": "Effektiv skatt på avkastningen = τ/r. 1 % formuesskatt tilsvarer 20 % ved r = 5 %, 33 % ved r = 3 % og 50 % ved r = 2 %.",
"mer": "<p>Tallene for 3 % og 2 % er egen utregning med formelen fra lb 28. Jo lavere avkastning, jo høyere effektiv skatt, så formuesskatten tynger mest når avkastningen er lav.<\/p><p>Med null avkastning må skatten betales av formuen selv. FT: en eiendel med null realavkastning halveres etter 34 år med 2 % årlig formuesskatt (0,98<sup>34<\/sup> = 0,50).<\/p><p><b>Felle:<\/b> å blande t = τ/r (effektiv sats) med τ = t × r.<\/p>",
"kilder": [
"F8 lb 28",
"AM s. 4–5",
"FT s. 3"
],
"eksamen": [
"H2025 o9"
]
},
{
"id": "f8-avk-08",
"nivaa": "viktig",
"kan": "Forklare hvorfor en eier som hever avkastningskravet skader seg selv",
"kort": "Krever eieren R = (r + τ<sub>w<\/sub>)/(1 − τ<sub>r<\/sub>) > r for å få markedsavkastning etter skatt, avviser selskapet lønnsomme prosjekter og markedsverdien faller. Hun reduserer da sin egen formue.",
"mer": "<p>BS4 seksjon 6: selskapets alternativkostnad er fortsatt markedsavkastningen r. Har selskapet allerede veltet så mye som mulig av skatten over på produktmarkedet, er det ingenting mer å hente.<\/p><p><b>Eksempel (egen utregning):<\/b> r = 5 %, τ<sub>w<\/sub> = 1 % og τ<sub>r<\/sub> = 0 gir R = 6 %; med τ<sub>r<\/sub> = 22 % blir R = 7,7 %. Prosjekter med avkastning mellom 5 % og R blir feilaktig avvist.<\/p><p>F8 lb 22: norske investorer som hever kravet, finner ingen som vil kompensere dem.<\/p>",
"kilder": [
"BS4 s. 881",
"F8 lb 22"
],
"eksamen": []
},
{
"id": "f8-avk-09",
"nivaa": "viktig",
"kan": "Forklare hvorfor skatter likevel betyr noe for investorer",
"kort": "Skattene endrer ikke verdsettelsen, men de reduserer disponibel inntekt. Skattefrie eller lavt skattlagte investorer kan derfor eie flere aksjer og formuen deres kan vokse raskere.",
"mer": "<p>BS4 og BS5: det er den samlede skattebyrden på selskap og eier som teller, ikke om ett enkelt skatteslag finnes i utlandet. Sverige har 20,6 % selskapsskatt mot Norges 22 % og man kunne like gjerne kalt differansen på 1,4 prosentpoeng en norsk særskatt.<\/p><p>F8 lb 23: hvem skal vi sammenligne oss med og skal velferdsstatens tjenester inngå? Den som vil unngå skatten helt, må bruke skatteparadis (ulovlig) eller flytte (BS4).<\/p>",
"kilder": [
"BS4 s. 875",
"BS4 s. 880",
"BS5 s. 84",
"F8 lb 23"
],
"eksamen": []
},
{
"id": "f8-avk-10",
"nivaa": "viktig",
"kan": "Verdsette en unotert aksje med lavere formuesgrunnlag",
"kort": "Med en ekstra rabatt α på formuesgrunnlaget er NV = (10 − pτ(1 − α))/(r − τ) = 10/r + (10/r)ατ/(r − τ) > 10/r. Norsk investor verdsetter den unoterte aksjen høyere enn markedet.",
"mer": "<p>Forutsetning: alternativet er en børsnotert aksje uten ekstra rabatt, så alternativavkastningen er fortsatt r − τ.<\/p><p><b>Eksempel (egen utregning):<\/b> r = 5 %, τ = 1 % og α = 50 % (SSB-studienes anslag): (10 − 200 × 1 % × 0,5)/4 % = 9/0,04 = 225 mot markedets 200.<\/p><p>Merverdien skyldes den skjulte rabatten og forklarer hvorfor norske formuesskattytere har høyere betalingsvilje for unoterte aksjer enn utlendinger (BS5).<\/p>",
"kilder": [
"F8 lb 24",
"BS5 s. 87"
],
"eksamen": []
},
{
"id": "f8-avk-11",
"nivaa": "viktig",
"kan": "Gjengi AM-eksempelet om normal- og meravkastning",
"kort": "En eiendel på 100 £ med normalavkastning 5 £: 20 % kapitalinntektsskatt og 1 % formuesskatt gir begge 1 £. Gir eiendelen 20 £, tar formuesskatten fortsatt 1 £ (5 % av avkastningen), mens inntektsskatten tar 4 £.",
"mer": "<p>Poenget: formuesskatten beskatter normalavkastningen og ikke meravkastningen. AM mener det er motsatt av det teorien anbefaler, fordi meravkastning (renprofitt, risikopremie, forkledd arbeidsinntekt) er den beste begrunnelsen for kapitalinntektsskatt.<\/p><p>Guvenen m.fl. og Sandbu snur det samme poenget til et argument for formuesskatt: de som får høy avkastning, beholder mer.<\/p><p><b>Felle:<\/b> å tro at ekvivalensen 1 % = 20 % gjelder for alle investorer uansett avkastning.<\/p>",
"kilder": [
"AM s. 4–5",
"AM s. 14–15"
],
"eksamen": []
},
{
"id": "f8-avk-12",
"nivaa": "viktig",
"kan": "Regne den kumulative virkningen av en årlig formuesskatt",
"kort": "Ved 40 års sparing med 5 % avkastning reduserer 1 % årlig formuesskatt sluttverdien med om lag en tredjedel (0,99<sup>40<\/sup> = 0,67) og 2 % reduserer den med mer enn halvparten (0,98<sup>40<\/sup> = 0,45).",
"mer": "<p>Årsaken er at samme formue beskattes år etter år, så den effektive skatten på utsatt forbruk blir svært høy jo lenger forbruket utsettes. Dette kommer i tillegg til skatt på avkastningen.<\/p><p>AM bruker dette som hovedargument mot å beskatte normalavkastningen: den som sparer lenge, for eksempel til pensjon, straffes mest.<\/p>",
"kilder": [
"AM s. 12–13"
],
"eksamen": []
},
{
"id": "f8-avk-13",
"nivaa": "detalj",
"kan": "Kjenne den generelle alternativavkastningen og forutsetningene i BS4",
"kort": "k = r − τ<sub>r<\/sub>r − τ<sub>w<\/sub>, der τ<sub>r<\/sub> er kapitalinntektsskatt og τ<sub>w<\/sub> formuesskatt på startverdien. Kapitalmarkedet antas effisient, transparent og likvid og alle investorer er pristakere.",
"mer": "<p><b>Eksempel (egen utregning):<\/b> r = 5 %, τ<sub>r<\/sub> = 22 % og τ<sub>w<\/sub> = 1 % gir k = 5 − 1,1 − 1 = 2,9 %.<\/p><p>Fisher-separasjon: investeringsbeslutningen skilles fra risikovalget, så risikopreferansene er irrelevante for verdsettelsen. Antakelsen om et effisient og integrert marked hentes fra NOU 2014:13, NOU 2018:5 og NOU 2022:20 (BS5) og alle skatteutvalg siden 1992 har lagt til grunn at Norge er en liten åpen økonomi (F8 lb 12).<\/p>",
"kilder": [
"BS4 s. 874",
"BS4 s. 876",
"F8 lb 12",
"BS5 s. 87"
],
"eksamen": []
}
]
},
{
"id": "f8-satser",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Satser, bunnfradrag og hvem som betaler",
"eksamensvekt": 3,
"viktigst": [
"1,0 % av nettoformuen opp til 21,5 mill. kr og 1,1 % av det som overstiger 21,5 mill. kr (2026)",
"Bunnfradrag 1,9 mill. kr per skattyter trekkes fra før satsen brukes",
"Formuesskatten er en personskatt på nettoformue (eiendeler minus gjeld): selskaper betaler ikke",
"Topp 1 % betaler 2/3 av formuesskatten; Norge har ikke hatt arveavgift siden 2014",
"Eksamen oppgir alltid satsen: bruk den i oppgaven (0,85 % i eldre sett, 1 % i H2023 til H2025)"
],
"punkter": [
{
"id": "f8-satser-01",
"nivaa": "kjerne",
"kan": "Vite formuesskattesatsene for 2026 og bruke dem trinnvis",
"kort": "1,0 % av nettoformuen opp til 21,5 mill. kr og 1,1 % av den delen som overstiger 21,5 mill. kr. Bunnfradraget på 1,9 mill. kr trekkes fra først.",
"mer": "<p>Satsen er trinnvis: bare delen over 21,5 mill. kr får 1,1 %.<\/p><p><b>Eksempel (egen utregning):<\/b> nettoformue 30 mill. kr gir (21,5 − 1,9) × 1 % + (30 − 21,5) × 1,1 % = 196 000 + 93 500 = 289 500 kr.<\/p><p><b>Felle:<\/b> å bruke 1,1 % på hele formuen. Det var feilen i VG-oppslaget om gründeren Anine (45 mill. × 1,1 % = 495 000 kr, F1 lb 14). Lysbildene i F1 og F4 bruker 2024-tallene 20 mill. og 1,7 mill. Eksamensoppgavene oppgir satsen selv: 0,85 % i H2016, H2017 og H2019, 1 % i H2023 til H2025.<\/p>",
"kilder": [
"F8 lb 5",
"BS5 s. 85",
"F1 lb 14"
],
"eksamen": [
"H2016 o2a",
"H2017 o1b",
"H2023 o3",
"H2023 o4a",
"H2025 o1"
]
},
{
"id": "f8-satser-02",
"nivaa": "kjerne",
"kan": "Trekke fra bunnfradraget riktig",
"kort": "Bunnfradraget er 1,9 mill. kr per skattyter i 2026 og trekkes fra nettoformuen (etter rabatter og gjeld) før satsen brukes.",
"mer": "<p>Rekkefølgen er: formuesverdier etter rabatt − fradragsberettiget gjeld − bunnfradrag = skattegrunnlag. Er grunnlaget negativt, blir skatten 0.<\/p><p><b>Eksempel (H2023 o3):<\/b> 8 + 2,5 − 9 − 1,5 = 0, altså ingen formuesskatt.<\/p><p><b>Felle:<\/b> oppgavene bruker ulike bunnfradrag (1,5 mill. i H2023, 1,7 mill. i F8-oppgave 3, F1 og F4). Bruk alltid tallet i oppgaven og legg merke til når den sier «se bort fra bunnfradrag» (H2018, H2019, H2025).<\/p>",
"kilder": [
"F8 lb 5",
"BS5 s. 85",
"Oppg. F8 o3"
],
"eksamen": [
"H2023 o3"
]
},
{
"id": "f8-satser-03",
"nivaa": "kjerne",
"kan": "Forklare hva formuesskatten er en skatt på",
"kort": "En skatt på personers nettoformue: formuesverdien av eiendelene minus gjeld. Den er en personskatt, så selskaper betaler ikke formuesskatt; eieren betaler av aksjenes formuesverdi.",
"mer": "<p>Grunnlaget er formuesverdien, ikke markedsverdien: de fleste eiendeler får en verdsettelsesrabatt. Staten ilegger formuesskatt på eiendom bare hvis skattyter er i netto formuesposisjon, i motsetning til den kommunale eiendomsskatten.<\/p><p><b>Felle:<\/b> å tro at aksjeselskapet betaler formuesskatt. Det er den personlige eieren som betaler av verdien av aksjene. Derfor oppstår spørsmålet om utbytte for å betale formuesskatten (H2023 o4, H2024 o7, H2025 o6).<\/p>",
"kilder": [
"F8 lb 3",
"F8 lb 5",
"F8 lb 6",
"F8 lb 43"
],
"eksamen": [
"H2025 o6"
]
},
{
"id": "f8-satser-04",
"nivaa": "viktig",
"kan": "Vite hvordan formuesskatten deles mellom stat og kommune",
"kort": "Av 1,0 % går 0,35 prosentpoeng til kommunen og 0,65 til staten. Over 21,5 mill. kr er satsen 1,1 %, der 0,75 prosentpoeng går til staten.",
"mer": "<p>Fordelingen endrer ingen skatteregning, bare hvem som får provenyet. Den kommunale andelen er en del av samlet sats og må ikke forveksles med den kommunale eiendomsskatten, som er en egen skatt med eget grunnlag.<\/p><p><b>Felle:<\/b> å legge 0,35 % kommuneskatt oppå 1 % og få 1,35 %. Samlet sats er 1,0 % eller 1,1 %.<\/p>",
"kilder": [
"F8 lb 5",
"BS5 s. 85"
],
"eksamen": []
},
{
"id": "f8-satser-05",
"nivaa": "viktig",
"kan": "Vite at Norge ikke har arveavgift",
"kort": "Arveavgiften ble avskaffet i 2014. Fraværet av arveavgift er en av grunnene til at formuesbeskatningen i Norge er lav sammenlignet med OECD.",
"mer": "<p>De fleste OECD-land har arveavgift. OECD (2018) mener formuesskatt er særlig relevant i land med lav skatt på normal kapitalavkastning, uten arveskatt eller med høy formuesulikhet og BS5 mener det passer Norge.<\/p><p>Adam og Miller mener en reformert arveavgift er bedre enn en årlig formuesskatt hvis målet er å beskatte arv, fordi formuesskatten også rammer formue spart av lønn.<\/p>",
"kilder": [
"F8 lb 5",
"F8 lb 8",
"BS5 s. 84",
"BS5 s. 89",
"AM s. 16"
],
"eksamen": []
},
{
"id": "f8-satser-06",
"nivaa": "viktig",
"kan": "Vite hvor stor del av formuesskatten topp 1 % betaler og hvordan formuen deres er plassert",
"kort": "Topp 1 % betaler 2/3 av provenyet (ca. 23,3 av ca. 35 mrd. kr i 2025). De har 2/3 av formuen i aksjer og 2/3 i unoterte selskaper.",
"mer": "<p>BS5 (tall for 2022): topp 1 % i formuesfordelingen hadde skattepliktig nettoformue over 12,4 mill. kr og betalte i snitt 390 000 kr. De 1 % rikeste eier mesteparten av aksjene i Norge og 2/3 av formuen deres er i unoterte aksjer med svært lav formuesverdi.<\/p><p>Poenget: verdsettelsen av unoterte aksjer avgjør i stor grad hvor mye de rikeste betaler.<\/p>",
"kilder": [
"F8 lb 6",
"BS5 s. 84–85"
],
"eksamen": []
},
{
"id": "f8-satser-07",
"nivaa": "detalj",
"kan": "Kjenne tallene for hvor mange som betaler formuesskatt",
"kort": "2024: 719 007 personer, 24,9 % av de sysselsatte og 12,9 % av hele befolkningen, i snitt 44 200 kr. Andelen har steget fra 22,7 % (2022) og 23,4 % (2023).",
"mer": "<table><tr><th>År<\/th><th>Personer<\/th><th>Andel sysselsatte (befolkning)<\/th><th>Snitt<\/th><\/tr><tr><td>2022<\/td><td>647 591<\/td><td>22,7 % (11,8 %)<\/td><td>40 600 kr<\/td><\/tr><tr><td>2023<\/td><td>671 646<\/td><td>23,4 % (12,1 %)<\/td><td>43 800 kr<\/td><\/tr><tr><td>2024<\/td><td>719 007<\/td><td>24,9 % (12,9 %)<\/td><td>44 200 kr<\/td><\/tr><\/table><p>BS5: i 2022 betalte 11 % av befolkningen og halvparten av dem betalte under 14 000 kr. BS1: 596 616 personer betalte i snitt 28 900 kr i 2020, i underkant av 500 000 av dem blant de 10 % rikeste.<\/p>",
"kilder": [
"F8 lb 4",
"BS5 s. 84",
"BS1 s. 33"
],
"eksamen": []
},
{
"id": "f8-satser-08",
"nivaa": "detalj",
"kan": "Plassere Norges formuesbeskatning i OECD-sammenheng",
"kort": "Skatter på formue var 2,8 % av skatteinntektene i Norge (2023) mot 5,3 % i OECD, selv om samlet skattetrykk er høyere (40,2 % mot 34,1 % av BNP i 2024).",
"mer": "<p>Årsaker (F8 lb 8): store rabatter på unoterte aksjer og primærbolig, ingen arveavgift og høyere eiendomsskatt i andre OECD-land. BS5: 2,2 % i 2022 og nr. 26 av 38 OECD-land. Figuren på lb 9 (2020) viser at Norge har en relativt stor formuesskatt, men svært lav eiendomsskatt.<\/p><p><b>Avvik:<\/b> forelesningen stiller 2,8 % (2023) mot OECD-snittet 5,3 %, mens BS5 oppgir OECD-snittet til 5,3 % for 2022 og 5,1 % for 2023. Til eksamen holder det å vite at Norge ligger på omtrent halvparten av OECD-snittet.<\/p>",
"kilder": [
"F8 lb 8",
"F8 lb 9",
"BS5 s. 84"
],
"eksamen": []
},
{
"id": "f8-satser-09",
"nivaa": "detalj",
"kan": "Vite hvilke land som har formuesskatt på nettoformue",
"kort": "I 2026 bare Norge, Spania og Sveits (BS5). Frankrike, Italia, Belgia og Nederland beskatter enkelte formuesobjekter i stedet.",
"mer": "<p>FT (2019): i 1990 hadde et dusin europeiske land nettoformuesskatt. Sverige hadde toppsats 4 % i 1984 og avskaffet skatten i 2007; Frankrike avskaffet sin i 2017. I 2019 var det fire land igjen: Norge, Spania, Sveits og Belgia (begrenset, på verdipapirer). Spania gjeninnførte skatten etter finanskrisen. Danmark diskuterer gjeninnføring (BS5).<\/p><p><b>Felle:<\/b> «Norge er det eneste landet med formuesskatt». Sveits har formuesskatt, arveavgift i flere kantoner og høyere eiendomsbeskatning enn Norge.<\/p>",
"kilder": [
"BS5 s. 84",
"FT s. 1–2"
],
"eksamen": []
}
]
},
{
"id": "f8-utbytte",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Utbytte for å betale formuesskatt, likviditet og BS1",
"eksamensvekt": 3,
"viktigst": [
"Utbytte som dekker både formuesskatten F og eierskatten: D = F / (1 − effektiv eierskatt)",
"Effektiv eierskatt = nominell sats × oppjusteringsfaktor (22 % × 1,72 = 37,84 % i 2026)",
"Studiene (Sakkestad og Skarsgaard, Finnevolden og Gulbrandsen) finner at formuesskatten sjelden tvinger fram utbytte",
"BS1: formuesskatten gjør dagens skjermingsrente for høy hvis investor kan låne risikofritt, men med realistisk lånerente er den for lav"
],
"punkter": [
{
"id": "f8-utb-01",
"nivaa": "kjerne",
"kan": "Regne hvor stort utbytte som må tas for å betale formuesskatten",
"kort": "D(1 − t<sub>e<\/sub>) = F, altså D = F / (1 − t<sub>e<\/sub>), der F er formuesskatten og t<sub>e<\/sub> den effektive eierskatten. Med F = 1 000 og t<sub>e<\/sub> = 50 % blir D = 2 000.",
"mer": "<p>Kontroll: av 2 000 går 1 000 i eierskatt og 1 000 til formuesskatten (H2025 o6).<\/p><ul><li>H2024 o7: 1 / (1 − 0,378) = 1,6<\/li><li>H2023 o4b: 2 400 / (1 − 0,4) = 4 000<\/li><li>H2019 o3a: 0,85 % × 100 mill. / (1 − 0,3168) = 1 244 145<\/li><\/ul><p><b>Felle:<\/b> å legge skatten oppå i stedet for å brutto-regne: 1 000 + 500 = 1 500 står som alternativ i H2025 o6.<\/p>",
"kilder": [
"F4 lb 77",
"F8 lb 80",
"Oppg. F8 o2"
],
"eksamen": [
"H2019 o3a",
"H2023 o4b",
"H2024 o7",
"H2025 o6"
]
},
{
"id": "f8-utb-02",
"nivaa": "kjerne",
"kan": "Bruke effektiv eierskatt i brutto-regningen",
"kort": "Effektiv eierskatt = nominell sats × oppjusteringsfaktor: 22 % × 1,72 = 37,84 % i 2026. I eksamenssettene: 22 % × 1,44 = 31,68 % (H2019) og 20 % × 2 = 40 % (H2023).",
"mer": "<p><b>Felle (H2019 o3a):<\/b> å bruke nominell sats uten oppjustering gir 850 000 / 0,78 = 1 089 744 i stedet for 1 244 145. Alternativene lå tett (1 244 145, 1 247 100 og 1 267 355), så ikke rund av underveis.<\/p><p>H2024 o7 oppgir den effektive satsen direkte (37,8 %). Oppgavene om utbytte for formuesskatt sier som regel at du skal se bort fra skjerming, aksjerabatt og bunnfradrag.<\/p>",
"kilder": [
"F4 lb 77",
"Oppg. F8 o2"
],
"eksamen": [
"H2019 o3a",
"H2023 o4b",
"H2024 o7"
]
},
{
"id": "f8-utb-03",
"nivaa": "kjerne",
"kan": "Regne hva eieren sitter igjen med etter eierskatt og formuesskatt",
"kort": "Trekk fra eierskatten på utbyttet utover skjerming og formuesskatten (formuesverdi × 0,8 × sats for hvert år). H2025 o1: 1 100 000 − 200 000 − 160 000 = 740 000.",
"mer": "<p><b>H2025 o1:<\/b> kostpris 10 mill., utbytte 500 000 (skjerming 2 %) og 600 000 (4 %), eierskatt 40 %. Eierskatt (500 000 − 200 000) × 40 % + (600 000 − 400 000) × 40 % = 200 000. Formuesskatt 10 mill. × 0,8 × 1 % = 80 000 per år, 160 000 for to år.<\/p><p><b>Avvik:<\/b> én setning i fasiten skriver formuesskatten som 120 000; tabellen og sluttsvaret 740 000 bruker riktig 160 000.<\/p><p>F4 lb 38: 6 % utbytte på 10 mill. gir etter formuesskatt (63 000) og utbytteskatt (90 816) en effektiv skatt på ca. 25,6 % (lysbildet skriver 25,5 %).<\/p>",
"kilder": [
"F4 lb 38"
],
"eksamen": [
"H2025 o1"
]
},
{
"id": "f8-utb-04",
"nivaa": "viktig",
"kan": "Regne utbetalt utbytte etter skjerming og oppjustert eierskatt (F8-oppgave 2)",
"kort": "Bob-Kåre: kostpris 500 mill., skjerming 5 % = 25 mill. og utbytte 100 mill. Eierskatt (100 − 25) × 1,44 × 22 % = 23,76 mill., så han får utbetalt 76,24 mill.",
"mer": "<p>Alternativ regning: effektiv sats 22 % × 1,44 = 31,68 % ganget med 75 mill. gir også 23,76 mill.<\/p><p>Fasiten til oppgaven inneholder i tillegg H2019 o3a: utbyttet D som dekker 0,85 % formuesskatt på 100 mill., løses fra D(1 − 0,3168) = 850 000, altså D = 1 244 145.<\/p><p><b>Felle:<\/b> å trekke fra skjermingen etter oppjusteringen: (144 − 25) × 22 % = 26,18 mill. er feil.<\/p>",
"kilder": [
"Oppg. F8 o2"
],
"eksamen": []
},
{
"id": "f8-utb-05",
"nivaa": "viktig",
"kan": "Forklare likviditetsargumentet mot formuesskatten",
"kort": "Formuesskatten må betales uavhengig av realisert inntekt, så eiere av små, nært eide selskaper kan måtte ta utbytte i år med underskudd. Norske studier finner at slike likviditetsskranker er lite utbredt (Røed mfl. 2020; Thoresen mfl. 2021).",
"mer": "<p>BS5: det finnes en ordning med utsatt betaling mot rente, men den er lite brukt, noe som tyder på at problemet er sjeldent. Internasjonalt (Loutzenhiser og Mann 2021; Advani mfl. 2021) er det svært få med slike problemer for eiendomsskatt.<\/p><p>Løsningsforslag i pensum: Sandbu vil la skattyter utsette kontantbetalingen eller gi staten en ideell eierandel; Warren-forslaget (FT) lar eiere av unoterte selskaper betale i naturalia (2 % av aksjene). FT: i Norge er likviditet hovedargumentet for å avskaffe skatten.<\/p>",
"kilder": [
"F8 lb 78",
"BS5 s. 86",
"Sveits-kronikken s. 2–3",
"FT s. 4"
],
"eksamen": []
},
{
"id": "f8-utb-06",
"nivaa": "viktig",
"kan": "Gjengi Menon-saken og Sakkestad og Skarsgaard (2013)",
"kort": "Menon (2013, for Rederiforbundet og NHO) fant at mange små og mellomstore bedrifter måtte ta utbytte for å betale formuesskatt, men forutsatte at alle aksjeeiere var i formuesskatteposisjon. Masteroppgaven til Sakkestad og Skarsgaard viste med riktige data at konklusjonen var feil.",
"mer": "<p>Data: over 70 000 små og mellomstore unoterte bedrifter (under 200 ansatte) med personlig hovedeier med minst 50 %. Formuesskatten skapte ikke problemer i form av tvungent utbytte. Av 26 200 bedrifter som var fem år eller yngre i 2011, hadde bare 270 formuesskatt og utbytte høyere enn årsresultatet. Disse var svært solide.<\/p><p>Menon medga feilen. Erna Solberg hadde hyllet rapporten og avfeide oppgaven som «bare en masteroppgave». BS5 oppgir datasettet til 70 700 selskaper.<\/p>",
"kilder": [
"F8 lb 80",
"F8 lb 81",
"F8 lb 82",
"BS5 s. 86"
],
"eksamen": []
},
{
"id": "f8-utb-07",
"nivaa": "viktig",
"kan": "Gjengi funnene i Finnevolden og Gulbrandsen (2015)",
"kort": "Av 1 835 gasellebedrifter (DN, 3 714 eiere) utløste bare 15 % formuesskatt hos eierne. Mesteparten av formuesskatten kom fra andre formuesobjekter enn aksjene og formuesskatten var under 2 % av utbyttet.",
"mer": "<p>Konklusjonen i forelesningen og BS5: formuesskatten er i liten grad en hemsko, særlig ikke for oppstartsbedrifter og gründere.<\/p><p><b>Felle:<\/b> et alternativ som sier at de fleste gasellebedrifter må ta utbytte for å betale eiernes formuesskatt. BS5 staver navnet «Guldbrandsen» og oppgir at gasellene er fra DNs kåring i 2012.<\/p>",
"kilder": [
"F8 lb 84",
"BS5 s. 86"
],
"eksamen": []
},
{
"id": "f8-utb-08",
"nivaa": "viktig",
"kan": "Forklare BS1-resultatet om formuesskatt og nøytral skjermingsrente",
"kort": "Med symmetrisk eierskatt og risikofri lånerente er verdien av å holde kapitalen i selskapet X − Z = (1 − γ)a[(r<sub>f<\/sub>(1 − t) − τ<sub>f<\/sub>) − i]. Nøytralitet krever i = r<sub>f<\/sub>(1 − t) − τ<sub>f<\/sub>, så dagens skjermingsrente er for høy og det lønner seg å ta utbytte.",
"mer": "<p>a er eierskatten, γ inngangsverdien (lik skjermingsgrunnlaget), r<sub>f<\/sub> risikofri rente, t alminnelig sats og τ<sub>f<\/sub> formuesskattesatsen på rentepapirer. Dagens skjermingsrente er i = r<sub>f<\/sub>(1 − t).<\/p><p>To modeller gir nøytralitet: (i) senk skjermingsrenten med τ<sub>f<\/sub>, eller (ii) behold den og behandle eierskattekreditten a(1 − γ) som gjeld i formuesskatten. Modell (ii) senker formuesskatten mest for de rikeste, som har de største kredittene; modell (i) passer dårlig for dem som ikke er i formuesposisjon.<\/p>",
"kilder": [
"BS1 s. 30–31"
],
"eksamen": []
},
{
"id": "f8-utb-09",
"nivaa": "viktig",
"kan": "Forklare hvorfor BS1 likevel anbefaler en særskatt på eierskattekreditten",
"kort": "Investorer låner til høyere rente enn den risikofrie (r<sub>L<\/sub> > r<sub>f<\/sub>), så X − Z > 0 og det lønner seg å beholde kapitalen i selskapet. BS1 anbefaler å beholde dagens skjermingsrente og skattlegge eierskattekreditten med θ = (r<sub>L<\/sub> − r<sub>f<\/sub>)(1 − t) − τ<sub>f<\/sub>.",
"mer": "<p>Alternativet, modell (iii), er å sette skjermingsrenten lik lånerenten etter skatt, i = r<sub>L<\/sub>(1 − t) − τ<sub>f<\/sub>. Det gir trolig lavere skatteinntekter og mer ulikhet og en sjablong for lånerenten er vanskelig å finne.<\/p><p>Særskatten (modell iv) rammer dem som har tjent mest på fritaksmetoden fra 2006. Dårligst er å heve skjermingsrenten og samtidig innføre kredittskatt. Lånerenten over plasseringsrenten forklarer den store oppbyggingen av eierskattekreditt de siste 15 årene.<\/p>",
"kilder": [
"BS1 s. 32–33"
],
"eksamen": []
},
{
"id": "f8-utb-10",
"nivaa": "detalj",
"kan": "Kjenne forutsetningene i BS1-modellen",
"kort": "Symmetrisk eierskatt (full skatterefusjon ved tap), én periode og et holdingselskap verdt 1 krone som bare eier aksjer og er egenkapitalfinansiert, der inngangsverdien γ er lavere enn selskapsverdien. Formuesskatten beregnes av markedsverdien ved periodestart og betales ved periodeslutt, med ulik sats for rentepapirer (τ<sub>f<\/sub>) og aksjer (τ<sub>a<\/sub>) på grunn av aksjerabatten.",
"mer": "<p>Strategi X: vent med utbytte. Strategi Z: ta utbytte (1 − γ), betal eierskatt og lånefinansier en privat aksjeinvestering med samme risiko. Vedlegget viser at resultatet ikke krever at selskapet «tømmes for kapital» (strategi Y gir samme differanse).<\/p><p>Også i BS1: opsjonsverdien av å holde kapital i selskapet (velge tidspunkt, flytte ut og realisere under et gunstigere regime) kan gjøre full nøytralitet uoppnåelig. Reformen i 2006 ble bare forelagt First Securities (2003), som advarte mot den.<\/p>",
"kilder": [
"BS1 s. 29",
"BS1 s. 33–34"
],
"eksamen": []
}
]
},
{
"id": "f8-proveny",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Hvis formuesskatten fjernes: proveny og alternativer",
"eksamensvekt": 2,
"viktigst": [
"H2023 o4c: selskapsskatt som dekker både selskapsskatt og formuesskatt: (2 200 + 2 400)/10 000 = 46 %",
"BS5: provenytap ca. 30 mrd. kr; selskapsskatten må fra 22 % til ca. 28 %",
"Skal samlet skatt på selskap og utbytte holdes på 51,5 %, må utbytteskatten ned til ca. 32 %",
"Økt eiendomsskatt som erstatning øker ulikheten uten store bunnfradrag"
],
"punkter": [
{
"id": "f8-prov-01",
"nivaa": "kjerne",
"kan": "Regne hvilken selskapsskatt som erstatter formuesskatten",
"kort": "Sett ny sats slik at selskapsskatten dekker både dagens selskapsskatt og formuesskatten. H2023 o4c: overskudd 10 000, selskapsskatt 2 200 og formuesskatt 2 400 gir t = 4 600/10 000 = 46 %.",
"mer": "<p>Formuesskatten var 300 000 × 0,8 × 1 % = 2 400 (o4a). Ny sats løses fra 10 000 × t = 2 200 + 2 400.<\/p><p>Tallet viser hvor tung formuesskatten kan være målt mot et lite overskudd: den tilsvarer her 24 prosentpoeng selskapsskatt.<\/p><p><b>Felle:<\/b> å bruke utbyttet (4 000) i stedet for formuesskatten, eller å glemme den opprinnelige selskapsskatten (gir 24 %).<\/p>",
"kilder": [
"F8 lb 77",
"BS5 s. 88"
],
"eksamen": [
"H2023 o4c"
]
},
{
"id": "f8-prov-02",
"nivaa": "viktig",
"kan": "Gjengi BS5-regnestykket for å erstatte formuesskatten med selskapsskatt",
"kort": "Provenytapet anslås konservativt til ca. 30 mrd. kr. Fastlandsprovenyet fra selskapsskatten må da fra om lag 106 til 136 mrd., som med uendret atferd krever en sats på rundt 28 % i stedet for 22 %.",
"mer": "<p>Kontroll (egen utregning): 22 % × 136/106 = 28,2 %.<\/p><p>Forutsetningen om uendret atferd hos bedrifter og eiere er sterk. Høyere selskapsskatt kan gi lavere investeringer og mer tilpasning, så provenyet kan bli lavere enn beregnet. NOU 2014:13 mente motsatt vei, lavere selskapsskatt, var det mest effektive virkemiddelet for investeringer.<\/p>",
"kilder": [
"F8 lb 77",
"BS5 s. 88"
],
"eksamen": []
},
{
"id": "f8-prov-03",
"nivaa": "viktig",
"kan": "Regne hvilken utbytteskatt som holder samlet skatt på 51,5 %",
"kort": "Med selskapsskatt 28 % må utbytteskatten ned til om lag 32 %: (0,515 − 0,28)/(1 − 0,28) = 32,6 %. Kuttet spiser opp en del av provenygevinsten, så den totale provenyvirkningen er uklar.",
"mer": "<p>Dagens samlede sats: 22 % + 78 % × 37,84 % = 51,5 %. Utbytteskatten som bevarer samlet sats s, er t<sub>u<\/sub> = (s − t)/(1 − t), der t er selskapsskatten (egen omforming av BS5-regnestykket).<\/p><p>Hvordan det faktisk går, avhenger av hvordan aktørene i økonomien tilpasser seg de nye satsene (F8 lb 77).<\/p>",
"kilder": [
"F8 lb 77",
"BS5 s. 88"
],
"eksamen": []
},
{
"id": "f8-prov-04",
"nivaa": "viktig",
"kan": "Forklare hvorfor økt eiendomsskatt som erstatning gir mer ulikhet",
"kort": "De rikeste eier mesteparten av finansformuen, mens bolig og eiendom er en fallende andel av formuen jo rikere man er. Eiendomsskatt treffer derfor middelklassen relativt mer og er regressiv uten store bunnfradrag.",
"mer": "<p>Figuren (Aaberge m.fl., 2018-data): de 50 % fattigste har negativ nettoformue, topp 1 % eier mesteparten av aksjene og eiendom utgjør en relativt liten andel av formuen til topp 1 %. Lavinntektsgrupper bruker en større andel av inntekten på bolig.<\/p><p>Oslo kommune har et bunnfradrag på ca. 5 mill. kr (F8 lb 75). BS5: fjerner man formuesskatten (helt eller bare på aksjer) og finansierer det med eiendomsskatt, øker ulikheten.<\/p>",
"kilder": [
"F8 lb 74",
"F8 lb 75",
"BS5 s. 88–89"
],
"eksamen": []
},
{
"id": "f8-prov-05",
"nivaa": "viktig",
"kan": "Gjengi BS5-konklusjonen om hva formuesskattedebatten egentlig handler om",
"kort": "Formuesskattens reelle problem er verdsettelsesreglene, særlig for unoterte aksjer, ikke at den skader investeringene. Vil man øke velstanden for folk flest, er direkte virkemidler som lavere skatt på personinntekt mer effektive, så debatten er mer en fordelingskonflikt enn en effektivitetsdiskusjon.",
"mer": "<p>OECD (2018): formuesskatt er særlig relevant i land med lav beskatning av normal kapitalavkastning, uten arveskatt eller med høy formuesulikhet. BS5 mener det passer Norge, som har totrinns formuesskatt, relativt lavt bunnfradrag og ingen arveskatt.<\/p><p>Påstanden om at det er til beste for samfunnet å la de rikeste beholde mer for å investere, tilsvarer å subsidiere dem som allerede har mest.<\/p>",
"kilder": [
"BS5 s. 89"
],
"eksamen": []
}
]
},
{
"id": "f8-effektivitet",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Effektivitet: ulik avkastning, innlåsning og atferd",
"eksamensvekt": 1,
"viktigst": [
"Ekvivalensen brytes når avkastningen varierer mellom investorer (Fagereng m.fl. 2020 på norske data)",
"Formuesskatt flytter kapital fra lavavkastende til høyavkastende investorer raskere (Guvenen m.fl. 2023), men øker ulikheten",
"Realisasjonsbeskatning gir innlåsning; riktig satt formuesskatt kan fjerne den (Ocampo, Schjelderup og Zoutman)",
"Empirien finner små effekter på sparing og ingen negativ effekt på sysselsetting"
],
"punkter": [
{
"id": "f8-eff-01",
"nivaa": "viktig",
"kan": "Forklare hvorfor ekvivalensen mellom formuesskatt og gevinstskatt bryter sammen",
"kort": "Ekvivalensen krever at alle har samme avkastning r, men empiriske studier viser store og vedvarende forskjeller, også etter risikojustering. Da får valget mellom skattene effektivitetskonsekvenser.",
"mer": "<p>Studier: Bach m.fl. (2020), Fagereng m.fl. (2020, norske data) og Smith m.fl. (2023).<\/p><p>Med ulik r betaler en investor med høy avkastning relativt lite formuesskatt sammenlignet med gevinstskatt, mens en med lav avkastning betaler relativt mye. Det er utgangspunktet for eksempelet med Fredo og Mike og for Guvenen m.fl.<\/p>",
"kilder": [
"F8 lb 27",
"F8 lb 30",
"BS5 s. 88"
],
"eksamen": []
},
{
"id": "f8-eff-02",
"nivaa": "viktig",
"kan": "Regne eksempelet med Fredo og Mike",
"kort": "Begge arver 1 000; Mike får 20 % og Fredo 0 %. 25 % gevinstskatt og 2,27 % formuesskatt på sluttformuen gir begge 50 i proveny, men relativ formue blir 1,15 med gevinstskatt og 1,20 med formuesskatt.",
"mer": "<p>Gevinstskatt: Mike 1 000 + 200 − 50 = 1 150 og Fredo 1 000, så 1 150/1 000 = 1,15.<\/p><p>Formuesskatt: Mike 1 200 × 2,27 % = 27,3 og Fredo 1 000 × 2,27 % = 22,7, så (1 200 − 27,3)/(1 000 − 22,7) = 1 173/977 = 1,20.<\/p><p>Lærdom: Fredo, en markedsimperfeksjon som bremser veksten, mister formuen raskere med formuesskatt. Formuesskatten sikrer i større grad at de beste investorene overlever (effektivitetsargument).<\/p>",
"kilder": [
"F8 lb 32",
"F8 lb 33",
"F8 lb 34",
"F8 lb 35",
"F8 lb 36"
],
"eksamen": []
},
{
"id": "f8-eff-03",
"nivaa": "viktig",
"kan": "Gjengi resultatene i Guvenen m.fl. (2023), «Use it or lose it»",
"kort": "Når avkastningen varierer mellom investorer, reallokerer formuesskatten kapital fra uproduktive til produktive investorer raskere enn en gevinstskatt. Å erstatte kapitalgevinstskatt med formuesskatt gir en betydelig velferdsgevinst i USA, men øker paradoksalt nok ulikheten.",
"mer": "<p>Publisert i QJE 2023. BS5: optimal formuesskatt er positiv, mens optimal skatt på kapitalinntekt kan være negativ (en subsidie). FT og Sandbu bruker samme logikk: formuesskatten belønner dem som bruker formuen mest produktivt.<\/p><p><b>Uenighet i pensum:<\/b> AM avviser resultatet (2019-versjonen): modellen forutsetter at all meravkastning skapes av produktive entreprenører og at kredittmarkedet er ufullkomment. Til eksamen: forelesningen presenterer Guvenen som et effektivitetsargument for formuesskatt.<\/p>",
"kilder": [
"F8 lb 31",
"F8 lb 37",
"BS5 s. 88",
"AM s. 18–20",
"FT s. 4–5"
],
"eksamen": []
},
{
"id": "f8-eff-04",
"nivaa": "viktig",
"kan": "Forklare innlåsingseffekten ved realisasjonsbeskatning",
"kort": "Det lønner seg å utsette skatt fordi nåverdien av skatt i morgen er lavere. Når investoren velger når gevinsten realiseres, kan det lønne seg å sitte på en investering med lavere avkastning enn markedet og det gir et effektivitetstap.",
"mer": "<p>Å betale skatt nå er dyrere enn å oppnå høyere avkastning: realisasjon gir et lavere beløp etter skatt å reinvestere.<\/p><p>Ocampo, Schjelderup og Zoutman: realisasjonsbeskatning gjør at investorer ikke investerer der avkastningen er høyest. En riktig satt formuesskatt kan fjerne verdien av å ikke realisere og bidra til økt vekst, uavhengig av synet på ulikhet. Formuesskatt og gevinstskatt er komplementære (BS5).<\/p>",
"kilder": [
"F8 lb 38",
"F8 lb 39",
"F8 lb 41",
"BS5 s. 88"
],
"eksamen": []
},
{
"id": "f8-eff-05",
"nivaa": "viktig",
"kan": "Regne obligasjonseksempelet med innlåsning",
"kort": "Gevinstskatt 35 %, markedsavkastning 2,5 % og obligasjonen gir 2 %. A (kjøpt for 100, verdt 100) selger fordi 2,5 % er over 2 %, mens B (kjøpt for 100, verdt 1 000) har reservasjonsavkastning 2,5 % × (1 − 0,35 × 0,9) = 1,7 % og beholder fordi det er under 2 %.",
"mer": "<p>0,9 er gevinstandelen av verdien (900/1 000), så τ × 0,9 er skattekostnaden ved å realisere. B betaler 315 i skatt og kan reinvestere 685: 685 × 2,5 % = 17,1 mot 1 000 × 2 % = 20 ved å beholde.<\/p><p>B gir slipp på 50 basispunkter (2,5 % − 2 %) og samfunnet får et effektivitetstap fordi kapitalen ikke flyttes dit avkastningen er høyest.<\/p>",
"kilder": [
"F8 lb 40"
],
"eksamen": []
},
{
"id": "f8-eff-06",
"nivaa": "viktig",
"kan": "Kjenne empirien om formuesskatt og sparing",
"kort": "Studier av Norden finner svært beskjedne effekter på sparingen (Seim; Jakobsen m.fl. 2020) og norske data tyder på at formuesskatten øker spareraten (Ring).",
"mer": "<p>Bjørneby m.fl. (2022, Economica): høyere formuesskatt gir litt større satsing på unoterte aksjer fordi det sparer formuesskatt. Alstadsæter m.fl. (2022): tilpasningen skjer gjennom porteføljevalg og verdsettelse, ikke gjennom hvor mye man sparer. Thoresen m.fl. (2022): moderate realøkonomiske virkninger.<\/p><p><b>Avvik i årstall:<\/b> lb 26 skriver Seim (2015) og Ring (2024), BS5 skriver Seim (2017) og Ring (2025). Innholdet er det samme.<\/p>",
"kilder": [
"F8 lb 26",
"BS5 s. 87"
],
"eksamen": []
},
{
"id": "f8-eff-07",
"nivaa": "viktig",
"kan": "Kjenne empirien om formuesskatt, sysselsetting og investering",
"kort": "Bjørneby, Markussen og Røed (2023) finner ingen støtte for at formuesskatten reduserer sysselsettingen i små og mellomstore, tett eide selskaper, snarere en positiv sammenheng. NOU 2014:13 konkluderte med at lavere selskapsskatt er et mer effektivt virkemiddel for investeringer enn lavere formuesskatt.",
"mer": "<p>Forklaringen på den positive sammenhengen: immateriell kapital og investeringer inngår ikke fullt i formuesgrunnlaget, så eiere kan redusere formuesskatten ved å investere mer i egen bedrift.<\/p><p>NOU 2014:13 mente konklusjonen også gjaldt selskaper med dårligere tilgang til kreditt. Skatteutvalget i 2022 ville beholde formuesskatten.<\/p><p><b>Avvik:<\/b> lb 76 kaller 2022-utvalget NOU 2022:9, mens BS5 skriver NOU 2022:20. NOU 2022:20 er riktig referanse.<\/p>",
"kilder": [
"F8 lb 76",
"BS5 s. 86"
],
"eksamen": []
}
]
},
{
"id": "f8-fordeling",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Fordeling og ulikhet",
"eksamensvekt": 1,
"viktigst": [
"Nettoformue er langt mer ujevnt fordelt enn inntekt, så omfordeling via formue treffer bedre",
"Offisiell statistikk utelater tilbakeholdte overskudd i selskaper og undervurderer ulikheten",
"Med tilbakeholdt overskudd mer enn dobles topp 1 %-andelen (8–9 % til over 20 % i enkelte år 2006–2018)",
"Topp 1 % betaler en lavere andel i skatt enn vanlige lønnstakere"
],
"punkter": [
{
"id": "f8-ford-01",
"nivaa": "viktig",
"kan": "Forklare hvorfor formuesskatt er et treffsikkert fordelingsvirkemiddel",
"kort": "Nettoformue er langt mer ujevnt fordelt enn inntekt etter skatt (SSB 2023). Er fordeling viktig, fungerer politikken best med skatt på formue.",
"mer": "<p>Lb 10 viser desilfordelt inntekt etter skatt og nettoformue for 2023: inntekten stiger jevnt over desilene, mens formuen er negativ i desil 1 og svært høy i desil 10.<\/p><p>BS5: fordi formue er mer konsentrert enn inntekt, er fordelingspolitikk mer effektiv når den knyttes til formue. Sandbu: den private formuesfordelingen i Norge er vel så skjev som i Storbritannia og Frankrike: de 10 % mest formuende familiene eier mer enn halvparten av den private kapitalen.<\/p>",
"kilder": [
"F8 lb 10",
"BS5 s. 83",
"Sveits-kronikken s. 1"
],
"eksamen": []
},
{
"id": "f8-ford-02",
"nivaa": "viktig",
"kan": "Forklare hvorfor offisiell statistikk undervurderer ulikheten",
"kort": "SSB tar ikke med inntekt som holdes tilbake i selskaper, selv om den reelt er eiernes inntekt og formue. Aksjonærmodellen fra 2006 ga sterke insentiver til å holde tilbake overskudd og ulikheten falt i den offisielle statistikken.",
"mer": "<p>Mange velstående organiserer eierskapet gjennom holdingselskaper, så eierinntekt som ikke tas ut som utbytte eller realiseres, synes ikke i personlige skattemeldinger (BS5).<\/p><p>Lb 72 peker også på en motsatt skjevhet: en lønnsmottaker med aksjesparekonto får avkastningen registrert som inntekt selv om den ikke er skattepliktig før uttak.<\/p><p>Piketty m.fl. (2018): 73 % av økningen i inntektsandelen til topp 1 % i USA kan forklares med tilbakeholdt overskudd.<\/p>",
"kilder": [
"F8 lb 72",
"BS5 s. 84–85"
],
"eksamen": []
},
{
"id": "f8-ford-03",
"nivaa": "viktig",
"kan": "Kjenne tallene for toppens inntektsandel og effektive skatt",
"kort": "Med tilbakeholdt overskudd mer enn dobles topp 1 %-andelen av markedsinntekten, fra om lag 8–9 % til over 20 % i enkelte år 2006–2018. Selv når skatt betalt i selskapene medregnes, er den effektive skatten for topp 1 % lavere enn for vanlige lønnsmottakere.",
"mer": "<p>Aaberge m.fl. (2020) i BS5: topp 1 % betalte ca. 22 % av bruttoinntekten i skatt 2004–2018 mot 33 % for gruppen mellom 90. og 99. prosentil og topp 0,1 % betalte 9–17 %. Systemet er regressivt i toppen. Selskapsskatten utgjør 4–7 % og formuesskatten 1–2 % av bruttoinntekten til de 5 % rikeste.<\/p><p>Alstadsæter m.fl. (2025): etter reformen i 2005 mer enn doblet inntektsandelen til topp 0,1 % seg i enkelte år.<\/p>",
"kilder": [
"F8 lb 73",
"BS5 s. 85",
"BS1 s. 33"
],
"eksamen": []
},
{
"id": "f8-ford-04",
"nivaa": "detalj",
"kan": "Kjenne forskningen om ulikhet og politisk makt",
"kort": "Mathisen (2024): den effektive skatten på topp 1 % er 23 prosentpoeng lavere enn befolkningen mener er rettferdig. Gilens og Page (2014): økonomiske eliter dominerer politikken i USA, med «klare trekk av et oligarki».",
"mer": "<p>BS5 viser til Gilens og Page sin analyse av nær 2 000 politiske forslag over 20 år. Moene bruker samme studie (1 779 saker 1981–2002): et forslag som støttes av én av fem rike, har 18 % sjanse for å bli vedtatt, mens sjansen er 45 % hvis fire av fem støtter det. De rike har i praksis vetorett.<\/p><p>Stein Rokkan (1966): «votes count, but resources decide».<\/p>",
"kilder": [
"BS5 s. 90–91",
"M s. 247",
"M s. 256"
],
"eksamen": []
},
{
"id": "f8-ford-05",
"nivaa": "detalj",
"kan": "Vurdere påstanden om at formuesskatten driver de rike ut av landet",
"kort": "48 personer flyttet ut i 2022 og 41 i 2023. Femårsregelen (skattefritt utbytte og gevinst etter fem år i utlandet, opphevet i 2022) var trolig vel så viktig som formuesskatten.",
"mer": "<p>Mange som flyttet, hadde store tilbakeholdte overskudd og lave inngangsverdier og kunne realisere dem med lav eller ingen norsk skatt etter fem år (BS5, F4 lb 41–42).<\/p><p>Sveits, dit mange flyttet, har både formuesskatt, arveavgift i flere kantoner og relativt høy eiendomsbeskatning. F4: verdien av å kunne realisere tilnærmet skattefritt var større enn å spare formuesskatt.<\/p>",
"kilder": [
"BS5 s. 84",
"F4 lb 41–42"
],
"eksamen": []
}
]
},
{
"id": "f8-eiendomsskatt",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Eiendomsskatt",
"eksamensvekt": 1,
"viktigst": [
"Kommunal, frivillig objektskatt som betales uansett gjeld og nettoformue",
"Første år maks 1 promille, deretter maks 4 promille (0,4 %)",
"Eiendom skattlegges dobbelt i kommuner med eiendomsskatt",
"Velgerkontroll (flertallet i NOU 1996:20) mot obligatorisk statlig skatt (mindretallet); velgerkontrollen svikter for hytteeiere"
],
"punkter": [
{
"id": "f8-eiend-01",
"nivaa": "viktig",
"kan": "Skille mellom formuesskatt på eiendom og eiendomsskatt",
"kort": "Formuesskatt på eiendom ilegges bare hvis skattyter er i netto formuesposisjon. Eiendomsskatten er en kommunal objektskatt som må betales uansett nettoformue og gjeld.",
"mer": "<p>I kommuner med eiendomsskatt skattlegges eiendom dobbelt, både med formuesskatt og eiendomsskatt. Det gir fare for at skattetrykket på eiendom blir høyere enn på andre formuesgjenstander og derfor har Stortinget satt et tak.<\/p><p>BS5 peker på denne dobbeltbeskatningen som et mulig problem for personlige skattytere som ikke er belyst i forskningen.<\/p><p><b>Felle:<\/b> «eiendomsskatt betales bare av dem som har positiv nettoformue».<\/p>",
"kilder": [
"F8 lb 43",
"F8 lb 58",
"F8 lb 60",
"BS5 s. 86"
],
"eksamen": []
},
{
"id": "f8-eiend-02",
"nivaa": "viktig",
"kan": "Vite reglene for eiendomsskattens sats og grunnlag",
"kort": "Kommunen velger om den vil ha eiendomsskatt og om den skal gjelde næringseiendom, boliger og fritidseiendommer eller all eiendom. Første år er satsen maks 1 promille og maksimal sats er 4 promille.",
"mer": "<p>4 promille er 0,4 %. Lysbildet skriver «4 promille (0,004 %)», som er feil: 0,004 % er 0,04 promille. Til eksamen: 4 promille.<\/p><p>Kommunen kan bruke formuesskattens verdsettelse (Skatteetatens boligverdikalkulator, som Oslo og Bergen gjør) eller egne takseringsregler. Oslo har bunnfradrag på ca. 5 mill. (lb 75).<\/p><p>Hjelpekilden 05-satser-2026 oppgir 4 promille som tak for bolig og fritidsbolig og 7 promille ellers; det står ikke i forelesningen.<\/p>",
"kilder": [
"F8 lb 59",
"F8 lb 60",
"F8 lb 66",
"F8 lb 75"
],
"eksamen": []
},
{
"id": "f8-eiend-03",
"nivaa": "viktig",
"kan": "Forklare velgerkontrollargumentet for kommunal frivillig eiendomsskatt",
"kort": "Flertallet i utvalget (NOU 1996:20) mente det er en tett kobling mellom kommunal eiendomsskatt og hva pengene brukes til: politikere som ikke bruker pengene slik innbyggerne vil, blir ikke gjenvalgt.",
"mer": "<p>Eksempel: ser velgerne i Bergen at alt er bedre i Os kommune, kaster de byrådet.<\/p><p>Mindretallet ville ha obligatorisk statlig eiendomsskatt. Noen kommuner er rike på naturressurser (fossefall og kraftverk), noe som gir urettferdighet. I tillegg svekker inntektsoverføringssystemet, som utjevner inntekt mellom kommuner, velgerkontrollen.<\/p>",
"kilder": [
"F8 lb 61",
"F8 lb 62",
"F8 lb 63"
],
"eksamen": []
},
{
"id": "f8-eiend-04",
"nivaa": "viktig",
"kan": "Forklare hvorfor velgerkontrollen svikter for fritidsboliger",
"kort": "Hytteeiere bor ikke i kommunen og kan ikke stemme ved lokalvalg. Politikerne kan derfor fristes til å skattlegge fritidsboliger høyt for å finansiere tjenester til fastboende.",
"mer": "<p>Dette er grunnlaget for hytteeksempelet i F9 om tidsinkonsistens og kapitalisering: i kommuner med mange utenbys hytteeiere er sjansen stor for at eiendomsskatt innføres og da faller hytteprisene.<\/p><p>Bykle (870 innbyggere, 4 % av norsk vannkraft) illustrerer mindretallets poeng om rike kraftkommuner: alle får barnehage- og sykehjemsplass og nyinnflyttede fikk 400 000–600 000 kr i støtte til å bygge hus i 2024.<\/p>",
"kilder": [
"F8 lb 64",
"F8 lb 65",
"F9 lb 26"
],
"eksamen": []
},
{
"id": "f8-eiend-05",
"nivaa": "detalj",
"kan": "Vite hvor utbredt eiendomsskatten er",
"kort": "323 av 357 kommuner hadde eiendomsskatt i 2024.",
"mer": "<p>Selv om skatten er frivillig, har altså om lag ni av ti kommuner den. Andre OECD-land har likevel betydelig høyere eiendomsskatt enn Norge og det er en av grunnene til at Norges samlede formuesbeskatning er lav (F8 lb 8 og 9).<\/p><p>I investeringscasene i F3 inngår eiendomsskatt som en løpende kostnad ved utleiebolig (for eksempel 10 500 kr per år).<\/p>",
"kilder": [
"F8 lb 58",
"F8 lb 8",
"F3 lb 8"
],
"eksamen": []
},
{
"id": "f8-eiend-06",
"nivaa": "detalj",
"kan": "Forklare hvorfor eiendomsinvestorer har ett aksjeselskap per bygg",
"kort": "Selges eiendommen direkte, skattlegges gevinsten i selskapet og det påløper dokumentavgift på 2,5 %. Selges i stedet aksjene i et eiendoms-AS, er gevinsten skattefri for holdingselskapet etter fritaksmetoden og dokumentavgiften slipper man.",
"mer": "<p>Typisk struktur: Holding AS eier Eiendom AS, som har ett datterselskap per bygg (Storgata 1 AS, Storgata 2 AS). Holdingselskapet kan reinvestere de ubeskattede midlene.<\/p><p><b>Merk:<\/b> lysbildet oppgir gevinstskatten i selskapet til 27 %, som er en tidligere selskapsskattesats. I dag er satsen 22 %.<\/p>",
"kilder": [
"F8 lb 89",
"F8 lb 90"
],
"eksamen": []
}
]
},
{
"id": "f8-argumenter",
"forelesning": "F8 Formues- og eiendomsskatt",
"tittel": "Argumenter for og mot formuesskatt (AM, Sandbu, FT, Moene)",
"eksamensvekt": 1,
"viktigst": [
"AM: en uventet og troverdig engangsskatt er effektiv; en årlig formuesskatt straffer sparing og treffer ikke meravkastning",
"AM-argumenter for årlig skatt: sparing avslører skatteevne, formue gir nytte, eksternaliteter, to ufullkomne skatter kan slå én",
"Sandbu og FT: Sveits viser at formuesskatt fungerer og den belønner de mest produktive",
"Moene: Norge har nesten fire ganger så mange rike per innbygger som USA"
],
"punkter": [
{
"id": "f8-arg-01",
"nivaa": "viktig",
"kan": "Forklare hvorfor en engangs formuesskatt kan være effektiv (AM)",
"kort": "Er skatten uventet og troverdig engangs, kan ingen tilpasse seg, så den vrir ikke atferd. Verdsettelsesdatoen må ikke være senere enn kunngjøringen.",
"mer": "<p>Troverdighet er hovedproblemet: et parlament kan ikke binde sine etterfølgere. Hjelpemidler er en tydelig lovnad og en unik begrunnelse, for eksempel koronaregningen.<\/p><p>Verst tenkelig: at folk tror formuen kan bli skattlagt senere uten at skatten innføres. Da får man all vridningen og ingen av inntektene.<\/p><p>Om en engangsskatt er ønskelig, avhenger av hva man mener er rettferdig og der vil fornuftige folk være uenige.<\/p>",
"kilder": [
"AM s. 3",
"AM s. 22–23"
],
"eksamen": []
},
{
"id": "f8-arg-02",
"nivaa": "viktig",
"kan": "Forklare AMs hovedinnvending mot en årlig formuesskatt",
"kort": "En årlig formuesskatt beskatter samme formue hvert år, straffer dem som sparer og treffer normalavkastningen, ikke meravkastningen. AM mener den er en dårlig erstatning for å reformere kapitalinntektsskatten og arveavgiften.",
"mer": "<p>Referansetilfellet: med lik startformue, ingen arv og lik avkastning skyldes formuesforskjeller bare når folk tjener og bruker penger. Da er skatt på sparing både urettferdig og ineffektiv (Atkinson og Stiglitz 1976; Chamley; Judd).<\/p><p>AMs eget syn: best å ikke beskatte normalavkastningen, men skattlegge lønn, meravkastning, kanskje arv og eventuelt eksisterende formue. Å beskatte millionærer, milliardærer og vanlige folks boliger og pensjoner er tre helt ulike ting.<\/p>",
"kilder": [
"AM s. 3",
"AM s. 12–13",
"AM s. 29–30"
],
"eksamen": []
},
{
"id": "f8-arg-03",
"nivaa": "viktig",
"kan": "Gjengi AMs argumenter for en årlig formuesskatt",
"kort": "Sparing kan avsløre skatteevne utover lønn, formue gir nytte utover forbruket (trygghet, makt), formue kan gi negative eksternaliteter (status, politisk innflytelse) og to ufullkomne skatter kan være bedre enn én stor.",
"mer": "<p>Det siste er et andrebest-argument: effektivitetstapet øker mer enn proporsjonalt med satsen, så det kan lønne seg å spre provenyet på flere skatter hvis tilpasningen til formuesskatten ikke spiser av de andre skattegrunnlagene. Det må veies mot ekstra administrasjonskostnader.<\/p><p>Mot eksternalitetsargumentet: klassikerne (Veblen, Hirsch) knytter status til forbruk, ikke til å sitte på formuen. AM mener argumentene trolig rettferdiggjør noe skatt på formue i prinsippet, men at gevinsten i praksis neppe veier opp for kostnadene.<\/p>",
"kilder": [
"AM s. 3",
"AM s. 17",
"AM s. 18–20"
],
"eksamen": []
},
{
"id": "f8-arg-04",
"nivaa": "viktig",
"kan": "Gjengi Sandbus argumenter i Sveits-kronikken",
"kort": "Formuesskatt utgjør bare 1,4 % av skatteinntektene i Norge mot tre ganger så mye i Sveits. Sandbu vil ha en høyere, bedre utformet skatt på all nettoformue, også eiendom, mot lavere skatt på arbeid.",
"mer": "<ul><li>Kapitalen har økt fra 2–3 til 5–6 ganger nasjonalinntekten siden 1970-tallet; all skatt på kapitalbeholdninger og kapitaltransaksjoner er bare 3,3 % av skatteinntektene (3 % i 1965).<\/li><li>Eiendom skal skattlegges som formue uten særbehandling, men med gjeldsfradrag, i stedet for en egen eiendomsskatt.<\/li><li>Skatten bør kunne utsettes til eiendelen selges, eller betales med en eierandel (naturalia).<\/li><li>Skatteevne henger like mye sammen med formue som med inntekt.<\/li><li>Formuesskatten belønner de beste bedriftseierne fordi den er lik uansett avkastning.<\/li><\/ul>",
"kilder": [
"Sveits-kronikken s. 1–3"
],
"eksamen": []
},
{
"id": "f8-arg-05",
"nivaa": "detalj",
"kan": "Kjenne IGM-undersøkelsen og de amerikanske forslagene",
"kort": "IGM 2019: 73 % mente Warrens skatt ville redusere topp 0,1 %-andelen vesentlig, 82 % mente den ville bli vanskeligere å håndheve og 60 % (mot 27 %) mente målet kunne nås ved å endre eksisterende skatter.",
"mer": "<p>Warren (FT): 2 % årlig på formue over 50 mill. dollar og 1 % ekstra over 1 mrd. Forslaget ble støttet av 61 % av velgerne (50 % av republikanerne), mens 20 % var mot. Bare ca. 75 000 familier (under 0,1 %) var over terskelen og 900 over milliardærgrensen og forslaget hadde 40 % engangsskatt ved å gi opp statsborgerskapet.<\/p><p>AM: Warren og Sanders foreslo toppsatser på 6 % og 8 % over 1 og 10 mrd. dollar, langt over noe man har sett i Europa.<\/p>",
"kilder": [
"AM s. 4–5",
"AM s. 29–30",
"FT s. 2–4"
],
"eksamen": []
},
{
"id": "f8-arg-06",
"nivaa": "detalj",
"kan": "Kjenne poengene i FT-artikkelen om de superrike",
"kort": "Sveits viser at de superrike kan leve med formuesskatt: satsen er 0,3–1 % avhengig av kanton, tersklene er lave og Zug tiltrekker seg fortsatt rike. Det sterkeste motargumentet er at eiere må sulte bedriften for å betale skatten.",
"mer": "<p>Historikk fra Sverige: Astrid Lindgren protesterte mot en marginalskatt på 102 % (Pomperipossa), mens Kamprad og Rausing flyttet ut, blant annet på grunn av formuesskatten. Sveits reduserer ofte formuesskatten for oppstartsselskaper til de selges eller børsnoteres. Norge og Spania gir rabatt på primærbolig.<\/p><p>Skatteplanlegging: strukturer som gir verdsettelsesrabatt (verdi 60 i stedet for 100 cent per dollar). Guvenen: «use it or lose it», formuesskatten omfordeler fra dem som investerer dårlig til dem som finner gode anvendelser.<\/p>",
"kilder": [
"FT s. 1–5"
],
"eksamen": []
},
{
"id": "f8-arg-07",
"nivaa": "detalj",
"kan": "Gjengi Moenes tall om overklassen i sosialdemokratiet",
"kort": "Målt som antall rike per innbygger har Norge flere rike enn USA: 472,8 rike (over 30 mill. dollar) og 63,6 superrike (over 100 mill.) per million innbyggere mot 124,6 og 36,5 i USA.",
"mer": "<p>Det er nesten fire ganger så mange rike og nesten dobbelt så mange superrike. Milliardærer per million innbyggere: USA 1,7, Norge 2,0, Sverige 2,4, Island 3,1, Danmark og Finland 0,9. Samtidig får topp 0,1 % 11 % av inntekten i USA mot 2,5 % i Norge, så USA har færre, men rikere rike.<\/p><p>Selv om USA var 23,5 % rikere og de rikes inntekt vokste tre ganger så raskt, ville USA bare få 215,3 rike og 63,1 superrike per million. Moene måler rikdom med antall (head count), slik man måler fattigdom.<\/p>",
"kilder": [
"M s. 248–252"
],
"eksamen": []
},
{
"id": "f8-arg-08",
"nivaa": "detalj",
"kan": "Forklare Moenes forklaring på den store overklassen og hva den betyr for politikken",
"kort": "Sosialdemokratiet kombinerer sosial trygghet med kapitalistisk dynamikk: lønnsmoderasjon og sammenpresset lønnsstruktur øker profitt og formuesverdier, mens gratis utdanning gir sosial mobilitet. Færre enn en tredjedel av de 100 rikeste i Norge (2014) hadde arvet formuen.",
"mer": "<p>Mobilitet: sjansen for at en sønn av en far i nederste femdel havner i øverste femdel, er 8 % i USA og over 12 % i Norge.<\/p><p>Politisk: «votes count, but resources decide». Moene anslår at de rike i Norge potensielt har 2,4 ganger så stor innflytelse som i USA, men sterke fagforeninger og arbeidsgiverorganisasjoner er en motmakt. Sosialdemokratiet kan bli et offer for sin egen suksess når mange blir rike og fagforeningene svekkes.<\/p>",
"kilder": [
"M s. 253–257"
],
"eksamen": []
}
]
},
{
"id": "f9-utledning",
"forelesning": "F9 Hvem betaler egentlig skatten",
"tittel": "Stykkskatt under frikonkurranse: likevekt og utledning",
"eksamensvekt": 5,
"viktigst": [
"P = p + t (konsumentpris = produsentpris + stykkskatt); likevekt S(p) = D(p + t)",
"∂p/∂t = D′/(S′ − D′) ≤ 0: produsentprisen faller",
"∂P/∂t = S′/(S′ − D′) ≥ 0: konsumentprisen stiger",
"∂P/∂t − ∂p/∂t = 1 og (∂P/∂t)/(∂p/∂t) = S′/D′",
"Hvem som krever inn skatten, betyr ingenting; den minst prisfølsomme parten bærer mest"
],
"punkter": [
{
"id": "f9-utl-01",
"nivaa": "kjerne",
"kan": "Sette opp likevekten med stykkskatt",
"kort": "Konsumentpris P = p + t, der p er produsentprisen og t stykkskatten. Likevekt: S(p) = D(p + t) eller S(P − t) = D(P), med D′ ≤ 0 og S′ ≥ 0.",
"mer": "<p>Velg formen som gir prisen du skal finne: skal du finne endringen i p, skriv alt som funksjon av p (S(p) = D(p + t)); skal du finne endringen i P, skriv S(P − t) = D(P).<\/p><p><b>Felle:<\/b> oppgaveteksten i H2024 o8 skriver likevekten som D[P] = S[p + t], som er feil (skatten skal ligge i etterspørselsleddet når alt uttrykkes i p). Fasiten bruker riktig D(p + t) = S(p). Ikke la deg forvirre av skrivefeil i teksten.<\/p>",
"kilder": [
"F9 lb 8",
"F9 lb 9",
"Oppg. F9 o3"
],
"eksamen": [
"H2016 o1a",
"H2018 o4a",
"H2019 o5",
"H2023 o7a",
"H2024 o8a"
]
},
{
"id": "f9-utl-02",
"nivaa": "kjerne",
"kan": "Utlede hvordan produsentprisen endres (∂p/∂t)",
"kort": "Deriver S(p) = D(p + t) med hensyn på t: S′ · ∂p/∂t = D′ · (∂p/∂t + 1), som gir ∂p/∂t = D′/(S′ − D′) ≤ 0.",
"mer": "<p>Steg: (1) skriv likevekten som funksjon av p og t; (2) totalderiver med hensyn på t og husk kjerneregelen for D(p + t); (3) samle leddene: ∂p/∂t · (S′ − D′) = D′.<\/p><p>Fortegn: telleren D′ er negativ og nevneren S′ − D′ positiv, så produsentprisen faller eller er uendret når skatten øker. Verdien ligger mellom −1 og 0.<\/p>",
"kilder": [
"F9 lb 9",
"F9 lb 12"
],
"eksamen": [
"H2016 o1a",
"H2018 o4a",
"H2024 o8a"
]
},
{
"id": "f9-utl-03",
"nivaa": "kjerne",
"kan": "Utlede hvordan konsumentprisen endres (∂P/∂t)",
"kort": "∂P/∂t = ∂p/∂t + 1 = D′/(S′ − D′) + (S′ − D′)/(S′ − D′) = S′/(S′ − D′) ≥ 0.",
"mer": "<p>Direkte vei (F9-oppgave 3, H2019 o5): deriver D(P) = S(P − t): D′ · P′(t) = S′ · (P′(t) − 1), som gir P′(t) = S′/(S′ − D′).<\/p><p>Fortegn: S′ ≥ 0 i telleren og S′ − D′ > 0 i nevneren, så konsumentprisen stiger med mellom 0 og 1 krone per krone skatt.<\/p><p><b>Felle:<\/b> D′ i telleren (det er ∂p/∂t) eller D′ − S′ i nevneren (gir feil fortegn).<\/p>",
"kilder": [
"F9 lb 10",
"F9 lb 12",
"Oppg. F9 o3"
],
"eksamen": [
"H2016 o1a",
"H2019 o5",
"H2020 o1b",
"H2023 o7a",
"H2024 o8b"
]
},
{
"id": "f9-utl-04",
"nivaa": "kjerne",
"kan": "Kjenne igjen de gale formelalternativene",
"kort": "Riktig er ∂p/∂t = D′/(S′ − D′) og ∂P/∂t = S′/(S′ − D′). Feilalternativene bytter teller, snur nevneren eller sløyfer den.",
"mer": "<p>H2024 o8a hadde (D′ − S′)/(S′ − D′), D′/(S′ − D′), D′/S′ og S′/(S′ − D′). o8b hadde S′/(S′ − D′), D′/(S′ − D′), (S′ − D′)/S′ og S′/(D − S′).<\/p><p>Huskeregel som stryker halvparten på sekunder: ∂p/∂t ligger i [−1, 0], ∂P/∂t i [0, 1] og ∂P/∂t − ∂p/∂t = 1. (D′ − S′)/(S′ − D′) er alltid −1 og D′/S′ kan bli mindre enn −1.<\/p>",
"kilder": [
"F9 lb 9",
"F9 lb 10",
"F9 lb 12"
],
"eksamen": [
"H2019 o5",
"H2023 o7a",
"H2024 o8a",
"H2024 o8b"
]
},
{
"id": "f9-utl-05",
"nivaa": "kjerne",
"kan": "Forklare at forholdet mellom prisendringene er S′/D′",
"kort": "(∂P/∂t)/(∂p/∂t) = S′/D′. Hvor mye konsument- og produsentprisen endres relativt til hverandre, avgjøres av forholdet mellom helningene på tilbuds- og etterspørselskurven.",
"mer": "<p>H2016 o1b spurte hva løsningene sier om hvem som reelt betaler skatten selgeren krever inn. Gode besvarelser satte opp forholdet og konkluderte med at helningene avgjør fordelingen.<\/p><p><b>Eksempel (egen utregning):<\/b> er S′ dobbelt så stor som |D′|, stiger konsumentprisen med 2/3 av skatten og produsentprisen faller med 1/3.<\/p>",
"kilder": [
"F9 lb 9",
"F9 lb 10"
],
"eksamen": [
"H2016 o1b"
]
},
{
"id": "f9-utl-06",
"nivaa": "kjerne",
"kan": "Vite at andelene til konsument og produsent summerer til én",
"kort": "∂P/∂t − ∂p/∂t = 1. Konsumentens andel er S′/(S′ − D′) og produsentens andel −D′/(S′ − D′).",
"mer": "<p>Hele skatten bæres alltid av noen: øker t med 1 krone, øker avstanden mellom P og p med 1 krone. I lysbildeeksempelet stiger P med 0,60 og p faller med 0,40.<\/p><p><b>Felle:<\/b> det er andelene (0,6 og 0,4) som summerer til 1, ikke de deriverte (0,6 + (−0,4) = 0,2).<\/p>",
"kilder": [
"F9 lb 7",
"F9 lb 12"
],
"eksamen": [
"H2024 o8b"
]
},
{
"id": "f9-utl-07",
"nivaa": "kjerne",
"kan": "Forklare at det ikke spiller noen rolle hvem som krever inn skatten",
"kort": "Hvem som krever inn skatten på vegne av staten, betyr ingenting for hvem som reelt betaler den. Likevekten er den samme om tilbudskurven skifter opp med t eller etterspørselskurven ned med t.",
"mer": "<p>Stiglitz: med 10 cent skatt på øl betaler konsumentene 1,05 dollar og produsentene får 0,95, enten produsentene eller konsumentene sender sjekken til staten. Det samme gjelder lønnsskatt: om trygdeavgiften betales halvt av arbeidsgiver og halvt av arbeidstaker eller helt av én av dem, gir samme virkning.<\/p><p>Skill mellom formell insidens (hvem loven pålegger skatten) og reell insidens (hvem som får lavere realinntekt).<\/p>",
"kilder": [
"F9 lb 14",
"S s. 482–483",
"S s. 487–488",
"S s. 490"
],
"eksamen": [
"H2016 o1b"
]
},
{
"id": "f9-utl-08",
"nivaa": "kjerne",
"kan": "Forklare at den minst prisfølsomme parten bærer mest",
"kort": "Under frikonkurranse bærer den part som er minst prisfølsom, mesteparten av skatten. Jo mindre elastisk etterspørsel og jo mer elastisk tilbud, jo mer bærer konsumentene.",
"mer": "<p>Stiglitz: jo mer elastisk etterspørsel og jo mindre elastisk tilbud, jo mer bæres av produsentene og omvendt.<\/p><p>Lb 17: en skatt på stålprodusenter med uelastisk tilbud bæres mest av produsentene, en skatt på gateselgere med elastisk tilbud bæres mest av konsumentene.<\/p><p>Personlig økonomi-poenget (lb 5): unngå å bli låst i et marked eller en investering der en ny skatt havner på deg.<\/p>",
"kilder": [
"F9 lb 6",
"F9 lb 14",
"F9 lb 17",
"S s. 491–493"
],
"eksamen": [
"H2016 o1b"
]
},
{
"id": "f9-utl-09",
"nivaa": "viktig",
"kan": "Forklare at moms (verdiskatt) og stykkskatt virker likt under frikonkurranse",
"kort": "Under frikonkurranse har en verdiskatt og en stykkskatt med samme proveny nøyaktig samme virkning på kvantum og priser. Bare kilen mellom konsument- og produsentprisen betyr noe.",
"mer": "<p>I praksis er skattene ulike: en stykkskatt er like høy uansett kvalitet og diskriminerer derfor mot billige varer (for eksempel sigaretter). Det er ofte lettere å kontrollere mengde enn pris og ulike verdiskattesatser gir insentiv til å underfakturere varen med høyest sats.<\/p><p>Under monopol virker skattene ulikt: for gitt proveny blir kvantum høyere med verdiskatt enn med stykkskatt (Stiglitz).<\/p>",
"kilder": [
"S s. 488–490",
"S s. 501"
],
"eksamen": []
},
{
"id": "f9-utl-10",
"nivaa": "detalj",
"kan": "Uttrykke fordelingen med elastisiteter",
"kort": "Konsumentens andel = ε<sub>S<\/sub>/(ε<sub>S<\/sub> + |ε<sub>D<\/sub>|) og produsentens andel = |ε<sub>D<\/sub>|/(ε<sub>S<\/sub> + |ε<sub>D<\/sub>|), målt i utgangslikevekten.",
"mer": "<p>Dette er helningsformelen omregnet med p/x i teller og nevner, ikke en egen formel på lysbildene. Stiglitz forklarer det samme verbalt med elastisiteter.<\/p><p><b>Eksempel (egen utregning fra lb 7):<\/b> ε<sub>D<\/sub> = −16,7 × 5/100 = −0,83 og ε<sub>S<\/sub> = 25 × 5/100 = 1,25 gir konsumentandel 1,25/2,08 = 0,60, som stemmer med 60 øre.<\/p><p>Elastisitet er prosentvis endring i kvantum ved én prosent prisendring. En vertikal kurve har elastisitet 0, en horisontal uendelig.<\/p>",
"kilder": [
"F9 lb 7",
"S s. 493"
],
"eksamen": []
}
]
},
{
"id": "f9-grensetilfeller",
"forelesning": "F9 Hvem betaler egentlig skatten",
"tittel": "Grensetilfeller og elastisiteter",
"eksamensvekt": 5,
"viktigst": [
"Perfekt uelastisk etterspørsel (D′ = 0, insulin): ∂P/∂t = 1 og ∂p/∂t = 0, konsumenten bærer alt",
"Perfekt elastisk tilbud (S′ → ∞): ∂P/∂t → 1, konsumenten bærer alt",
"Perfekt uelastisk tilbud (S′ = 0): ∂P/∂t = 0 og ∂p/∂t = −1, produsenten bærer alt",
"Perfekt elastisk etterspørsel (D′ → −∞): ∂p/∂t → −1, produsenten bærer alt",
"Subsidier analyseres som negative skatter (strømstøtte H2022 o3)"
],
"punkter": [
{
"id": "f9-gr-01",
"nivaa": "kjerne",
"kan": "Vite hva som skjer ved perfekt uelastisk etterspørsel",
"kort": "D′ = 0 gir ∂p/∂t = 0 og ∂P/∂t = 1. Konsumenten bærer hele skatten og kvantum er uendret (eksempel: insulin).",
"mer": "<p>Sett D′ = 0 i formlene: ∂p/∂t = 0/S′ = 0 og ∂P/∂t = S′/S′ = 1.<\/p><p><b>H2020 o1b og F9-oppgave 2:<\/b> en omsetningsskatt på insulin øker prisen Cecilie betaler med hele skatten. <b>H2023 o7b og H2024 o8c:<\/b> riktig svar er ∂p/∂t = 0.<\/p><p><b>Felle:<\/b> å svare ∂p/∂t = −1, som er tilfellet med uelastisk tilbud. H2023 o7b sier bare «uelastisk», men må leses som perfekt uelastisk etterspørsel.<\/p>",
"kilder": [
"F9 lb 11",
"F9 lb 12",
"F9 lb 15",
"S s. 491",
"Oppg. F9 o2"
],
"eksamen": [
"H2020 o1b",
"H2023 o7b",
"H2024 o8c",
"H2025 o8a"
]
},
{
"id": "f9-gr-02",
"nivaa": "kjerne",
"kan": "Vite hva som skjer ved perfekt elastisk tilbud",
"kort": "S′ → ∞ gir ∂P/∂t → 1 og ∂p/∂t → 0. Produsentprisen er fast og hele skatten veltes over på konsumentene.",
"mer": "<p>Utledning (lb 13): del teller og nevner på S′, så ∂P/∂t = 1/(1 − D′/S′). Når S′ → ∞ går D′/S′ → 0 fordi D′ er endelig, så ∂P/∂t → 1.<\/p><p>Tolkning: horisontal tilbudskurve, for eksempel konstant og lik grensekostnad for alle (strøm i H2022 o3) eller lang sikt der nye produsenter kommer inn (Stiglitz' storfekjøtt). Kvantum faller hvis etterspørselen er fallende.<\/p>",
"kilder": [
"F9 lb 11",
"F9 lb 13",
"S s. 491"
],
"eksamen": [
"H2022 o3"
]
},
{
"id": "f9-gr-03",
"nivaa": "kjerne",
"kan": "Vite hva som skjer ved perfekt uelastisk tilbud",
"kort": "S′ = 0 gir ∂P/∂t = 0 og ∂p/∂t = −1. Konsumentprisen endres ikke og produsenten bærer hele skatten fordi tilbudet er fast uansett pris.",
"mer": "<p>Sett S′ = 0: ∂p/∂t = D′/(−D′) = −1 og ∂P/∂t = 0.<\/p><p>Eksempler fra Stiglitz: ubebygd tomt (fast tilbud, eieren bærer skatten) og råolje på lang sikt (eierne av forekomstene bærer skatten). H2016 o1c: «tilbudet kan ikke varieres» betyr at selgeren betaler hele skatteøkningen.<\/p><p><b>Felle:<\/b> å tro at det trengs monopolmakt for at produsenten skal bære skatten.<\/p>",
"kilder": [
"F9 lb 11",
"S s. 492",
"S s. 495"
],
"eksamen": [
"H2016 o1c",
"H2018 o4b"
]
},
{
"id": "f9-gr-04",
"nivaa": "kjerne",
"kan": "Vite hva som skjer ved perfekt elastisk etterspørsel",
"kort": "D′ → −∞ gir ∂p/∂t → −1 og ∂P/∂t → 0. Konsumentprisen er uendret og produsentene bærer hele skatten.",
"mer": "<p>Horisontal etterspørselskurve: konsumentene kjøper ingenting hvis prisen stiger, for eksempel fordi de har perfekte alternativer. Produsentprisen faller med hele skatten og kvantum faller. Det er speilbildet av insulintilfellet.<\/p><p><b>H2025 o8b og o8c:<\/b> likevektspris 1,50 og skatt 0,50: konsumentprisen forblir 1,50 og produsentene får 1,00.<\/p>",
"kilder": [
"F9 lb 11",
"F9 lb 16",
"S s. 492"
],
"eksamen": [
"H2025 o8b",
"H2025 o8c"
]
},
{
"id": "f9-gr-05",
"nivaa": "kjerne",
"kan": "Regne nye priser i grensetilfellene med tall",
"kort": "Likevektspris 1,50 og stykkskatt 0,50 på tilbyderne: perfekt uelastisk etterspørsel gir konsumentpris 2,00, mens perfekt elastisk etterspørsel gir konsumentpris 1,50 og produsentpris 1,00.",
"mer": "<p>Fremgangsmåte: avgjør hvem som bærer alt (se de fire grensetilfellene), flytt den prisen med hele t og la den andre prisen stå stille.<\/p><p><b>Felle (H2025 o8):<\/b> 1,50 og 1,00 står som alternativer i hverandres spørsmål. I o8a var 2,50, 3 og 3,50 rene feilalternativer; bare 1,50 + 0,50 = 2,00 er riktig. Les nøye om spørsmålet gjelder konsument- eller produsentprisen.<\/p>",
"kilder": [
"F9 lb 11",
"F9 lb 15",
"F9 lb 16"
],
"eksamen": [
"H2025 o8a",
"H2025 o8b",
"H2025 o8c"
]
},
{
"id": "f9-gr-06",
"nivaa": "kjerne",
"kan": "Analysere en subsidie eller at en støtte fjernes",
"kort": "En subsidie er en negativ stykkskatt; å fjerne en støtte virker som en ny skatt. Med vertikal etterspørsel og horisontalt tilbud (strøm, H2022 o3) stiger konsumentprisen med hele støtten og kvantum er uendret.",
"mer": "<p>H2022 o3 (bokmål): husholdningene kan ikke variere strømbruken (D′ = 0) og alle har samme konstante grensekostnad (S′ = ∞). Riktig svar: kvantum uendret og prisen stiger med hele støttebeløpet. Nynorskversjonen spurte om redusert avgift: prisen faller med hele lettelsen.<\/p><p>Stiglitz: samme analyse for subsidier. Kortsiktig uelastisk tilbud av storfekjøtt gir bøndene gevinsten, mens hele subsidien går til konsumentene på lang sikt med horisontalt tilbud.<\/p>",
"kilder": [
"F9 lb 11",
"S s. 483",
"S s. 488–489"
],
"eksamen": [
"H2022 o3"
]
},
{
"id": "f9-gr-07",
"nivaa": "kjerne",
"kan": "Avgjøre hvem som bærer mest når kurvene ikke er ekstreme",
"kort": "Lite elastisk tilbud: tilbyderne bærer mesteparten; elastisk tilbud: konsumentene bærer mesteparten. Lite prisfølsom etterspørsel: konsumentene bærer mye; prisfølsom etterspørsel: tilbyderne bærer mye.",
"mer": "<p>Lb 17 (figurer): en skatt på stålprodusenter (bratt tilbud) gir liten prisøkning, mens en skatt på gateselgere (flatt tilbud) gir stor prisøkning.<\/p><p>Lb 18: bratt etterspørsel gir stor prisøkning og lite fall i kvantum; flat etterspørsel gir liten prisøkning og stort fall i kvantum.<\/p><p><b>Felle:<\/b> å blande «elastisk» og «bratt». En bratt kurve er lite elastisk.<\/p>",
"kilder": [
"F9 lb 17",
"F9 lb 18",
"S s. 492–493"
],
"eksamen": [
"H2016 o1b"
]
},
{
"id": "f9-gr-08",
"nivaa": "viktig",
"kan": "Koble elastisitet til velferdstapet",
"kort": "Lite prisfølsom etterspørsel gir lite velferdstap fordi kvantum faller lite. Prisfølsom etterspørsel gir stort velferdstap og tilbyder bærer da store deler av skatten.",
"mer": "<p>Velferdstapet (dødvektstapet) er tapt konsument- og produsentoverskudd som ikke blir til skatteinntekt og det øker med fallet i kvantum.<\/p><p>Med perfekt uelastisk etterspørsel endres ikke kvantum, så velferdstapet er null, men konsumenten bærer hele skatten. Med perfekt elastisk etterspørsel bærer produsenten alt og kvantum faller mest.<\/p>",
"kilder": [
"F9 lb 18",
"F9 lb 15"
],
"eksamen": [
"H2018 o3b"
]
},
{
"id": "f9-gr-09",
"nivaa": "viktig",
"kan": "Forklare forskjellen mellom kort og lang sikt i insidens",
"kort": "Tilbudet er ofte mindre elastisk på kort sikt enn på lang sikt. Derfor kan produsentene bære mye av en skatt (eller få mye av en subsidie) på kort sikt, mens konsumentene bærer eller får mer på lang sikt.",
"mer": "<p>Stiglitz: en subsidie på storfekjøtt går på kort sikt i stor grad til bøndene fordi tilbudet er bratt. På lang sikt kommer nye produsenter inn, tilbudskurven blir flat og hele subsidien går til konsumentene.<\/p><p>Lønnsskatt: på kort sikt faller ikke lønnen med en gang, så bedriftene bærer en stor del, mens arbeidstakerne bærer mesteparten på lang sikt.<\/p>",
"kilder": [
"S s. 488–489",
"S s. 495"
],
"eksamen": []
}
]
},
{
"id": "f9-talleksempel",
"forelesning": "F9 Hvem betaler egentlig skatten",
"tittel": "Talleksempel, figur og velferdstap",
"eksamensvekt": 3,
"viktigst": [
"Lysbildeeksempelet: P fra 5 til 5,60 og kvantum fra 100 til 90; konsument 0,60, produsent 0,40, proveny 90",
"Figuren: tilbudskurven skifter opp med t; ny likevekt med høyere P og lavere kvantum",
"Effektivitetstapet er trekanten av tapt konsument- og produsentoverskudd, ½ × t × fall i kvantum",
"Moms på melk: butikken hever ikke prisen med hele momsen"
],
"punkter": [
{
"id": "f9-tall-01",
"nivaa": "kjerne",
"kan": "Regne fordelingen av skatten i lysbildeeksempelet",
"kort": "Pris 5, kvantum 100 og skatt 1 kr på produsenten gir ny konsumentpris 5,60 og kvantum 90. Konsumenten bærer 0,60 og produsenten 0,40 (sitter igjen med 4,60); provenyet er 90 kr.",
"mer": "<p>Produsenten vil ha 6 kr for 100 enheter, men kjøperne vil ikke kjøpe 100 til den prisen. Høyere pris gir lavere etterspørsel og ny likevekt blir 5,60.<\/p><p>Fordelingen 60/40 betyr at begge taper: produsentene selger mindre til lavere nettopris og konsumentene kjøper færre enheter til høyere pris.<\/p><p>Under frikonkurranse er tilbudskurven summen av produsentenes grensekostnader og etterspørselen summen av konsumentenes grensenytte.<\/p>",
"kilder": [
"F9 lb 7"
],
"eksamen": []
},
{
"id": "f9-tall-02",
"nivaa": "kjerne",
"kan": "Vise stykkskatten i en figur",
"kort": "Tilbudskurven skifter opp med t fordi produsentens kostnad øker. Den nye likevekten gir høyere konsumentpris og lavere kvantum; ved nytt kvantum er avstanden mellom konsumentprisen og produsentprisen lik t.",
"mer": "<p>Alternativt kan etterspørselskurven tegnes forskjøvet ned med t (Stiglitz viser begge måtene å tegne det på); likevekten blir den samme.<\/p><p>H2018 o3a: ny likevekt P<sub>2<\/sub>, Q<sub>2<\/sub> fordi bedriftene ser på skatten som en kostnad, slik at tilbudskurven skifter.<\/p><p><b>Felle:<\/b> å flytte tilbudskurven ned eller til høyre. Det er virkningen av en subsidie.<\/p>",
"kilder": [
"F9 lb 7",
"S s. 485–487"
],
"eksamen": [
"H2018 o3a"
]
},
{
"id": "f9-tall-03",
"nivaa": "kjerne",
"kan": "Vise og regne effektivitetstapet av en stykkskatt",
"kort": "Effektivitetstapet er tapt konsument- og produsentoverskudd som ikke blir til skatteinntekt: trekanten mellom tilbud og etterspørsel fra nytt til gammelt kvantum. Med rette kurver er det ½ × t × fall i kvantum.",
"mer": "<p>H2018 o3b: effektivitetstapet er de skraverte arealene med tapt konsument- og produsentoverskudd.<\/p><p><b>Eksempel (egen utregning fra lb 7):<\/b> ½ × 1 × (100 − 90) = 5 kr. Provenyet (90 kr) er en overføring til staten, ikke et tap.<\/p><p><b>Felle:<\/b> å regne hele tapet i konsument- og produsentoverskudd (90 + 5 = 95 kr) som effektivitetstap.<\/p>",
"kilder": [
"F9 lb 7",
"F9 lb 18"
],
"eksamen": [
"H2018 o3b"
]
},
{
"id": "f9-tall-04",
"nivaa": "viktig",
"kan": "Finne helningene som ligger bak et talleksempel",
"kort": "Lysbildeeksempelet tilsvarer D′ = −10/0,6 = −16,7 og S′ = 10/0,4 = 25. Da er ∂p/∂t = −16,7/41,7 = −0,40 og ∂P/∂t = 25/41,7 = 0,60.",
"mer": "<p>Kvantum faller med 10 når konsumentprisen stiger med 0,60 (etterspørselen) og når produsentprisen faller med 0,40 (tilbudet). Innsatt i formlene stemmer det med 60/40-fordelingen.<\/p><p>Dette er en egen kontrollregning, ikke på lysbildet, men den viser at talleksempelet og formlene henger sammen.<\/p>",
"kilder": [
"F9 lb 7",
"F9 lb 12"
],
"eksamen": []
},
{
"id": "f9-tall-05",
"nivaa": "viktig",
"kan": "Regne Stiglitz' eksempel med ølskatt",
"kort": "10 cent skatt per flaske: prisen konsumentene betaler, stiger fra 1,00 til 1,05 dollar og produsentene får 0,95. Skatten deles her likt og prisen stiger mindre enn skatten fordi etterspørselen faller når prisen øker.",
"mer": "<p>Produsentene kan ikke velte hele skatten over fordi etterspørselen faller når prisen stiger. Om konsumentene i stedet betaler inn skatten, kjøper de fra produsentene til 0,95 og betaler 0,10 til staten, totalt 1,05. Resultatet er identisk og kvantum er det samme.<\/p>",
"kilder": [
"S s. 486–487"
],
"eksamen": []
},
{
"id": "f9-tall-06",
"nivaa": "viktig",
"kan": "Svare på om butikken hever melkeprisen med hele momsen",
"kort": "Nei. 25 % moms gir normalt ikke 25 % høyere pris (fra 20 til 25 kr) fordi det ikke er profittmaksimerende; momsen deles mellom kunde og butikk etter prisfølsomheten.",
"mer": "<p>Lb 3: etter matmomskuttet senket kjedene etter hvert prisene, men økte dem igjen; Rimi og Kiwi skrudde i det skjulte prisene opp nesten 10 %. Også en skattelette deles: forbrukerne fikk ikke hele kuttet.<\/p><p>Lb 4: tilsvarende spørsmål for selskapsskatt: hva skjer med lønninger og priser? Svaret avgjøres av økonomien, ikke av hvem loven pålegger skatten.<\/p>",
"kilder": [
"F9 lb 2",
"F9 lb 3",
"F9 lb 4"
],
"eksamen": []
}
]
},
{
"id": "f9-markedsform",
"forelesning": "F9 Hvem betaler egentlig skatten",
"tittel": "Monopol, oligopol og plattformer",
"eksamensvekt": 3,
"viktigst": [
"Monopolisten tilpasser seg MR = MC; en stykkskatt øker MC og senker kvantum",
"Lineær etterspørsel og konstant MC: prisen stiger med halve skatten (∂p/∂t = ½)",
"H2021 o2: P = 3 − Q og C = Q gir P = 2; med t = 1 blir P = 2,5, ikke 3",
"Oligopol: ingen entydig regel; plattformer: en skattlagt vare kan falle i pris"
],
"punkter": [
{
"id": "f9-mon-01",
"nivaa": "kjerne",
"kan": "Regne monopolprisen før og etter en stykkskatt",
"kort": "P = 3 − Q og C = Q: MR = 3 − 2Q = MC = 1 gir Q = 1 og P = 2. Med t = 1 blir MC = 2, Q = ½ og P = 2,5, så skatten deles likt.",
"mer": "<p>Inntekt R = (3 − Q)Q, så MR = 3 − 2Q. Kostnaden med skatt er C = Q(1 + t).<\/p><p><b>Felle:<\/b> direktøren som ville heve prisen til 3 (full overvelting). Det lønner seg ikke fordi monopolisten da mister alle kundene: ved P = 3 er Q = 0 og profitten 0, mot (2,5 − 2) × 0,5 = 0,25 ved P = 2,5.<\/p>",
"kilder": [
"Oppg. F9 o1",
"F9 lb 20"
],
"eksamen": [
"H2021 o2a",
"H2021 o2b"
]
},
{
"id": "f9-mon-02",
"nivaa": "kjerne",
"kan": "Utlede at monopolprisen stiger med halve skatten ved lineære funksjoner",
"kort": "π = (1 − p)(p − c − t) gir ∂π/∂p = 1 − 2p + c + t = 0, altså p = (1 + c)/2 + t/2 og ∂p/∂t = ½.",
"mer": "<p>Lb 20: etterspørsel x = 1 − p, konstant enhetskostnad c og stykkskatt t, med profitt π = px − cx − tx.<\/p><p>Stiglitz har samme resultat med p = a − bQ: MR = a − 2bQ = MC + t gir p = (a + MC + t)/2, så øker t med 2 dollar, øker p med 1.<\/p><p>Resultatet gjelder lineær etterspørsel og konstant grensekostnad.<\/p>",
"kilder": [
"F9 lb 20",
"S s. 499–500"
],
"eksamen": [
"H2021 o2b"
]
},
{
"id": "f9-mon-03",
"nivaa": "kjerne",
"kan": "Forklare hvorfor monopolisten ikke velter over hele skatten",
"kort": "Med tilpasningen MR = MC løfter en stykkskatt MC, så kvantum går ned fordi MR-kurven er fallende. Velter monopolisten hele skatten over, faller for mange kunder fra, så det lønner seg å øke prisen med mindre enn skatten.",
"mer": "<p>Lb 19 til 21 viser det i figur: MC skifter opp med Δt, nytt skjæringspunkt med MR gir lavere x<sub>t<\/sub> og prisen leses av etterspørselskurven.<\/p><p>Lb 6: monopolisten vil aldri overvelte hele skatten fordi det ikke er lønnsomt. Se likevel Stiglitz-forbeholdet om konstant elastisitet i neste punkt.<\/p>",
"kilder": [
"F9 lb 6",
"F9 lb 19",
"F9 lb 21"
],
"eksamen": [
"H2021 o2b"
]
},
{
"id": "f9-mon-04",
"nivaa": "viktig",
"kan": "Vite at monopolprisen kan stige mer enn skatten ved konstant elastisitet",
"kort": "Med konstant etterspørselselastisitet η er MR = p(1 − 1/η), så p = (MC + t)/(1 − 1/η). Prisen stiger med 1/(1 − 1/η) ganger skatten, altså det dobbelte når η = 2.",
"mer": "<p>Dette står i Stiglitz (figuren om monopol med konstant elastisitet) og strider mot forelesningens generelle påstand om at monopolisten aldri overvelter hele skatten. Forelesningen bygger på lineære funksjoner.<\/p><p><b>Til eksamen:<\/b> regn med forelesningens lineære modell (halve skatten, H2021 o2). Får du et påstandsspørsmål om monopol generelt, vit at resultatet avhenger av etterspørselskurvens form.<\/p>",
"kilder": [
"S s. 499–501",
"F9 lb 6"
],
"eksamen": []
},
{
"id": "f9-mon-05",
"nivaa": "viktig",
"kan": "Forklare hvordan grensekostnadskurven påvirker monopolinsidensen",
"kort": "Jo brattere MC-kurve, jo mindre endres kvantum og pris. Med vertikal MC endres verken kvantum eller pris og produsenten bærer hele skatten, som under frikonkurranse.",
"mer": "<p>Med horisontal MC avhenger fordelingen av etterspørselskurvens form: halve skatten ved lineær etterspørsel og mer enn hele ved konstant elastisitet. Under frikonkurranse ville en horisontal tilbudskurve gitt full overvelting til konsumentene, så her skiller monopol og frikonkurranse seg tydelig (Stiglitz).<\/p>",
"kilder": [
"S s. 498"
],
"eksamen": []
},
{
"id": "f9-mon-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor det ikke finnes en entydig regel for oligopol",
"kort": "Under oligopol avhenger insidensen av om det er pris- eller kvantumskonkurranse, hvor mange bedrifter som konkurrerer, formen på tilbuds- og etterspørselsfunksjonene og hvor nære substitutter produktene er.",
"mer": "<p>Lb 22 stiller opp «frikonkurranse &lt; oligopol &lt; monopol»: oligopol ligger mellom ytterpunktene, men alt avhenger av forutsetningene.<\/p><p>Stiglitz: det finnes ingen allment akseptert teori. Tror hver bedrift at konkurrentene stjeler markedsandeler hvis den hever prisen, holdes prisene nede; venter alle at konkurrentene følger etter, hever alle prisen og skatten veltes over på konsumentene. Eksempler: fly- og leiebilmarkedet.<\/p>",
"kilder": [
"F9 lb 6",
"F9 lb 22",
"S s. 501"
],
"eksamen": []
},
{
"id": "f9-mon-07",
"nivaa": "viktig",
"kan": "Forklare skatteinsidens i plattformmarkeder",
"kort": "Plattformer betjener to gjensidig avhengige kundegrupper og pris lik grensekostnad gjelder ikke. En skatt på den ene gruppen kan gi lavere pris for den: moms på aviser kan få avisen til å senke prisen for å øke annonseinntektene.",
"mer": "<p>Eksempler: aviser (flere lesere øker annonsørenes betalingsvilje), sosiale medier (flere brukere gir mer data og mer attraktiv annonseplass) og Playstation, som selges under grensekostnad for å øke inntektene fra spill.<\/p><p>En skatt på datainnsamling hos Facebook kan føre til månedsavgift for brukerne. Virkningen avhenger av om begge kundegruppene skattlegges og hvilke eksternaliteter som finnes. Kortversjon: en vare som skattlegges, kan falle i pris.<\/p>",
"kilder": [
"F9 lb 6",
"F9 lb 23",
"F9 lb 24"
],
"eksamen": []
},
{
"id": "f9-mon-08",
"nivaa": "detalj",
"kan": "Vite at verdiskatt og stykkskatt virker ulikt under monopol",
"kort": "Under monopol gir en verdiskatt høyere kvantum enn en stykkskatt som gir samme proveny. Under frikonkurranse er de to skattene likeverdige.",
"mer": "<p>Stiglitz viser i et vedlegg at for gitt proveny er monopolistens kvantum høyere med verdiskatt enn med stykkskatt.<\/p><p>Under frikonkurranse avgjøres alt av kilen mellom prisen konsumenten betaler og prisen produsenten får, så formen på skatten spiller ingen rolle der. Forskjellen er derfor et typisk påstandsspørsmål om markedsform.<\/p>",
"kilder": [
"S s. 501"
],
"eksamen": []
}
]
},
{
"id": "f9-faktorskatt",
"forelesning": "F9 Hvem betaler egentlig skatten",
"tittel": "Skatt på arbeid, kapital og selskap",
"eksamensvekt": 1,
"viktigst": [
"Lønnsskatt: det er uten betydning om arbeidsgiver eller arbeidstaker betaler inn; med uelastisk arbeidstilbud bærer arbeidstakerne mesteparten",
"Perfekt elastisk faktor (kapital i en liten åpen økonomi) slipper skatten; uelastisk faktor (tomt) bærer den selv",
"Selskapsskatt kan veltes over på konsumenter, arbeidere og all kapital; CBO antar 50 % på lønn og priser",
"Alle skatteutvalg siden 1992: Norge er en liten åpen økonomi der kapitalprisen bestemmes i utlandet"
],
"punkter": [
{
"id": "f9-fak-01",
"nivaa": "viktig",
"kan": "Forklare hvem som bærer arbeidsgiveravgift og lønnsskatt",
"kort": "Om lønnsskatten betales av arbeidsgiver, arbeidstaker eller deles, er uten betydning for virkningen. Er arbeidstilbudet relativt uelastisk, bærer arbeidstakerne mesteparten gjennom lavere lønn.",
"mer": "<p>Stiglitz: de fleste økonomer mener arbeidsgiverdelen av trygdeavgiften veltes bakover på lønnen. Å legge halve skatten på arbeidsgiver gir dårlig gjennomsiktighet fordi arbeidstakerne tror arbeidsgiver bærer halvparten. På kort sikt kan bedriftene bære mye fordi lønnen ikke faller med en gang.<\/p><p>Kobling til F5 lb 9–12: inntektsskiftingsligningen forutsetter at arbeidsgiveravgiften bæres fullt av lønnstaker, mens nordiske studier finner 15–30 % overvelting i Norge, ca. 25 % i Sverige og fra ingen til ca. 50 % i Finland, nær full for bonus og overtid.<\/p>",
"kilder": [
"S s. 483–484",
"S s. 493–495",
"F5 lb 9–12"
],
"eksamen": []
},
{
"id": "f9-fak-02",
"nivaa": "viktig",
"kan": "Forklare at en skatt på en perfekt elastisk faktor veltes helt over",
"kort": "En liten åpen økonomi må ta verdensrenten som gitt, så kapital tilbys perfekt elastisk. En skatt på renter veltes da helt over på kapitalbrukerne (de betaler i + t) og kapitaleierne får uendret avkastning.",
"mer": "<p>Landet kan ikke tiltrekke kapital hvis det betaler mindre enn markedsrenten, men får all kapital det vil ha til markedsrenten (Stiglitz viser det med en horisontal tilbudskurve for kapital).<\/p><p>F8 lb 12: alle skatteutvalg siden 1992 har lagt til grunn at Norge er en liten åpen økonomi der prisen på kapital bestemmes i utlandet og at norske investorer er pristakere. Det er utgangspunktet for BS4.<\/p><p>Skatter på mobile faktorer bæres derfor av de immobile faktorene, som tomt.<\/p>",
"kilder": [
"S s. 496–497",
"F8 lb 12"
],
"eksamen": []
},
{
"id": "f9-fak-03",
"nivaa": "viktig",
"kan": "Forklare hvem som bærer selskapsskatten",
"kort": "Hever bedriftene prisene, bærer konsumentene skatten; faller etterspørselen etter arbeid og lønnen, bærer arbeiderne den; flytter kapital ut av selskapssektoren, faller avkastningen på all kapital. Congressional Budget Office antar at 50 % veltes over på lønninger og produktpriser.",
"mer": "<p>Stiglitz: insidensen av selskapsskatten er omstridt, men de fleste økonomer mener en betydelig del veltes over. Skatten er populær nettopp fordi den tilsynelatende betales av selskapene og aksjonærene.<\/p><p>Lb 4 spør om økt selskapsskatt gir høyere priser og lavere lønninger. BS4 (fotnote 10): jo mer elastisk etterspørselen etter produktet er, jo mindre veltes over på kjøperne og under rimelige forutsetninger blir skatten ikke fullt overveltet.<\/p>",
"kilder": [
"F9 lb 4",
"S s. 483",
"BS4 s. 881"
],
"eksamen": []
},
{
"id": "f9-fak-04",
"nivaa": "viktig",
"kan": "Forklare at en skatt på en uelastisk faktor bæres av eieren",
"kort": "Er tilbudet av en faktor helt uelastisk, bæres skatten fullt av faktoren. Klassisk eksempel: ubebygd tomt, der hele skatten faller på grunneieren.",
"mer": "<p>Problemet er å skille tomteverdien fra verdien av forbedringer som vei, vann og bygninger. Tilbudet av forbedringer er elastisk, så en skatt på eiendom kan langt på vei veltes over.<\/p><p>Råolje er tilnærmet uelastisk på lang sikt, så en oljeskatt bæres i hovedsak av eierne av forekomstene. Siden mye av oljen eies utenfor de store forbrukslandene, har disse landene insentiv til å skattlegge olje (Stiglitz).<\/p>",
"kilder": [
"S s. 495"
],
"eksamen": []
},
{
"id": "f9-fak-05",
"nivaa": "detalj",
"kan": "Gjengi eksemplene med Philadelphias lønnsskatt og Pittsburghs tomteskatt",
"kort": "Philadelphias lønnsskatt bæres i stor grad av grunneierne fordi arbeidskraft og kapital kan flytte, så lønn og avkastning etter skatt må holdes uendret. Pittsburgh skattlegger tomt over fem ganger så høyt som bygninger.",
"mer": "<p>Arbeidere kan jobbe andre steder, så lønnen må på lang sikt stige for å oppveie skatten og kapitaleiere investerer bare hvis avkastningen er like god som andre steder. Bare tomten er immobil og har uelastisk tilbud, så den bærer skatten.<\/p><p>Pittsburgh endret i 1979 og 1980 eiendomsskatten til en «graded property tax» med ulik sats for tomt og bygninger.<\/p>",
"kilder": [
"S s. 496–497"
],
"eksamen": []
},
{
"id": "f9-fak-06",
"nivaa": "detalj",
"kan": "Forklare hvorfor en lønnsskatt kan senke lønnen med mer enn skatten",
"kort": "Er arbeidstilbudet bakoverbøyd (høyere lønn gir mindre arbeid), øker arbeidstilbudet når lønnen faller. Det presser lønnen videre ned, så lønnen kan falle med mer enn skatten.",
"mer": "<p>Bakgrunn: ved høy lønn velger noen å jobbe mindre fordi de har råd til høyere levestandard med færre timer. Stiglitz viser det med en bakoverbøyd tilbudskurve for arbeid.<\/p><p>Med et vanlig stigende arbeidstilbud faller lønnen med mindre enn skatten og med helt uelastisk arbeidstilbud bærer arbeidstakerne hele skatten.<\/p>",
"kilder": [
"S s. 494–495"
],
"eksamen": []
}
]
},
{
"id": "f9-dynamisk",
"forelesning": "F9 Hvem betaler egentlig skatten",
"tittel": "Dynamisk insidens: tidsinkonsistens og kapitalisering",
"eksamensvekt": 1,
"viktigst": [
"To typer insidens: den direkte effekten og den dynamiske effekten (tidsinkonsistens)",
"Myndighetene fristes til å endre politikken når folk har tilpasset seg (elbilfritak); løsningen er troverdig binding",
"En ventet skatt kapitaliseres i prisen: hytteprisene faller når eiendomsskatten kommer"
],
"punkter": [
{
"id": "f9-dyn-01",
"nivaa": "viktig",
"kan": "Skille mellom direkte og dynamisk insidens",
"kort": "Direkte insidens er hvordan prisene endres når skatten innføres. Dynamisk insidens kommer av tidsinkonsistens: myndighetene kan endre politikken etter at folk har tilpasset seg.",
"mer": "<p>Personlig økonomi-poenget (lb 5): vi ønsker ikke å være låst fast i et marked eller en investeringsposisjon der en ny skatt gjør at det er vi som betaler mesteparten.<\/p><p>Den som allerede har bundet seg, for eksempel ved å kjøpe hytte eller elbil, kan ikke tilpasse seg og er dermed lite prisfølsom. Etter hovedregelen fra frikonkurranse bærer den minst prisfølsomme parten mest av en ny skatt.<\/p>",
"kilder": [
"F9 lb 5",
"F9 lb 14"
],
"eksamen": []
},
{
"id": "f9-dyn-02",
"nivaa": "viktig",
"kan": "Forklare tidsinkonsistensproblemet og løsningen",
"kort": "Myndighetene fristes til å endre politikken over tid: fritaket for bompenger for elbiler reverseres når mange nok kjører elbil. Det gir et hold-up-problem (folk vil ikke kjøpe fordi lettelsene er midlertidige) og løsningen er troverdig binding.",
"mer": "<p>Troverdig binding: som Odyssevs (Ulysses) som lot seg binde til masten for å motstå sirenene. Norges Bank har fått en uavhengig rolle slik at rentesettingen er troverdig og ikke styres av politikere som vil vinne valg.<\/p><p>Samme logikk i AM: en engangs formuesskatt er bare effektiv hvis den er troverdig engangs.<\/p>",
"kilder": [
"F9 lb 25",
"AM s. 22–23"
],
"eksamen": []
},
{
"id": "f9-dyn-03",
"nivaa": "viktig",
"kan": "Forklare hvordan en ventet skatt kapitaliseres i prisen",
"kort": "Et aktivum blir mindre verdt når en ny skatt gjør det dyrere å eie det. Hytteprisene vil falle når eiendomsskatt innføres, særlig i kommuner med mange utenbys hytteeiere der sjansen er stor for at skatten kommer.",
"mer": "<p>Lb 26: bør man vente med å kjøpe hytte til skatten innføres (lavere pris), eller kjøpe i en kommune med få fritidsboliger? De som kjøpte elbil tidlig, tjente på fordelene. På samme måte kan det være lurt å kjøpe hytte nå hvis det tar lang tid før eiendomsskatten kommer.<\/p><p>Bakgrunn: hytteeiere stemmer ikke ved lokalvalg (F8 lb 64). Samme mekanisme med motsatt fortegn: skattefritak kapitaliseres i høyere priser (F10 lb 18 og 20).<\/p>",
"kilder": [
"F9 lb 26",
"F8 lb 64",
"F10 lb 18",
"F10 lb 20"
],
"eksamen": []
}
]
},
{
"id": "f10-implisitt-skatt",
"forelesning": "F10 Skatt, aksjer og risikotaking",
"tittel": "Implisitt skatt: t*, skattefri mot skattepliktig og hvem som tjener",
"eksamensvekt": 3,
"viktigst": [
"Likevekt mellom like risikable aktiva: r<sub>fri<\/sub> = R(1 − t<sub>m<\/sub>), derfor r<sub>fri<\/sub> &lt; R",
"t* = (R − r<sub>fri<\/sub>)/R = 1 − r<sub>fri<\/sub>/R. Den skattepliktige avkastningen R står i nevneren",
"Egen sats over t*: velg skattefri. Under t*: velg skattepliktig. Lik t*: likegyldig",
"t* settes av marginalinvestoren gjennom markedsprisene, ikke av din egen sats eller lovens sats",
"Den implisitte skatten går til utstederen (lavere rente), ikke til staten"
],
"punkter": [
{
"id": "f10-implisitt-skatt-01",
"nivaa": "kjerne",
"kan": "Forklare forskjellen på eksplisitt og implisitt skatt",
"kort": "Eksplisitt skatt betales som skatt på avkastningen og går til staten. Implisitt skatt betales som lavere avkastning før skatt (høyere pris) på et skattefavorisert aktivum og går til utstederen eller selgeren.",
"mer": "<p>Skattlagte aktiva bærer eksplisitt skatt, skattefavoriserte aktiva bærer implisitt skatt. Mekanismen: skattefordelen øker etterspørselen, prisen bys opp og avkastningen (kupong/kurs, utbytte/kostpris) faller. Fallet i avkastning før skatt er den implisitte skatten. Ingen betaler den inn til staten.<\/p><p><b>Felle:<\/b> å tro at et skattefritt aktivum har «null skatt». Den samlede skatten er eksplisitt pluss implisitt og den implisitte kan være stor.<\/p>",
"kilder": [
"F10 lb 14",
"Gml. F9 lb 21–22",
"SW s. 119–120"
],
"eksamen": [
"H2024 o9a"
]
},
{
"id": "f10-implisitt-skatt-02",
"nivaa": "kjerne",
"kan": "Sette opp likevektsbetingelsen mellom et skattefritt og et skattlagt aktivum med lik risiko",
"kort": "R(1 − t<sub>m<\/sub>) = r, der R er før-skatt-avkastningen på det skattlagte, r på det skattefrie og t<sub>m<\/sub> marginalinvestorens sats. Derfor er r &lt; R.",
"mer": "<p>To like risikable aktiva må gi samme avkastning etter skatt for marginalinvestoren, ellers ville alle flytte til det beste. At det skattefrie aktivumet har lavere nominell avkastning er altså likevekt, ikke en anomali.<\/p><p><b>Felle 1:<\/b> H2019 o4 kalte det skattefrie prosjektet R<sub>1<\/sub> og det skattlagte R<sub>2<\/sub>. Da er likevekten R<sub>1<\/sub> = R<sub>2<\/sub>(1 − t) og riktig svar var «R<sub>1<\/sub> &lt; R<sub>2<\/sub>». Les hvilken bokstav som er skattefri.<\/p><p><b>Felle 2:<\/b> å skrive r(1 − t) = R. Skattefaktoren hører til det skattlagte aktivumet.<\/p>",
"kilder": [
"F10 lb 14–15",
"SW s. 125"
],
"eksamen": [
"H2019 o4",
"H2024 o9a"
]
},
{
"id": "f10-implisitt-skatt-03",
"nivaa": "kjerne",
"kan": "Regne den implisitte skattesatsen t*",
"kort": "t* = (R − r)/R = 1 − r/R. Med R = 8 % (skattlagt) og r = 6 % (skattefri) blir t* = 2/8 = 25 %.",
"mer": "<p>Forelesningen kaller satsen T: R(1 − t<sub>m<\/sub>) = r ⇔ T ≡ (R − r)/R = t<sub>m<\/sub>. Sjekk: 8 % × (1 − 0,25) = 6 %. Obligasjonene prises som om marginalinvestoren har 25 % skatt.<\/p><p><b>Feller fra H2024 o9b:<\/b> (R − r)/r = 2/6 = 33,3 % (feil nevner), R − r = 2 prosentpoeng (en differanse, ikke en sats) og (R − r·22 %)/R (blander inn lovens sats). Riktig: (R − r)/R.<\/p><p><b>Huskeregel:<\/b> «hvor mye av den skattlagte avkastningen forsvinner»: andelen av R.<\/p>",
"kilder": [
"F10 lb 15–16",
"Gml. F9 lb 24–25"
],
"eksamen": [
"H2024 o9b"
]
},
{
"id": "f10-implisitt-skatt-04",
"nivaa": "kjerne",
"kan": "Velge mellom skattefri og skattepliktig obligasjon ut fra egen marginalskatt",
"kort": "Sammenlign egen sats t med t*: t > t* gir skattefri, t &lt; t* gir skattepliktig, t = t* gir likegyldighet. Kontroll: R(1 − t) mot r.",
"mer": "<p><b>Eksempel (R = 8 %, r = 6 %, t* = 25 %):<\/b> med 30 % skatt gir A 8 % × 0,70 = 5,6 % &lt; 6 %: velg skattefri. Med 20 % gir A 6,4 % &gt; 6 %: velg skattepliktig. Med 25 % gir begge 6 %.<\/p><p><b>Felle 1:<\/b> å tro at skattefri alltid er best for den som betaler skatt. En norsk privatperson med 22 % taper på skattefri her (6,24 % &gt; 6 %).<\/p><p><b>Felle 2:<\/b> å snu ulikheten. Høy egen sats gjør fritaket mer verdt, så høy sats går til skattefri.<\/p>",
"kilder": [
"F10 lb 17",
"Gml. F9 lb 26",
"SW s. 130"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-05",
"nivaa": "kjerne",
"kan": "Regne etter-skatt-tabellen for fire investortyper",
"kort": "R = 8 %, r = 6 %: pensjonsfond (0 %) får 8 % og privatperson (22 %) 6,24 % på A, så begge velger A. Marginalinvestoren (25 %) får 6 % og er likegyldig, mens høyskatteinvestoren (40 %) får 4,8 % og velger B.",
"mer": "<p>Tabellen viser skatteklientell-effekten: den skattefrie obligasjonen havner hos investorer med sats over 25 %, den skattlagte hos dem med lav sats eller skattefritak (pensjonsfond). Bare kolonnen «A etter skatt» endrer seg med investoren: R(1 − t). Den skattefrie gir 6 % til alle.<\/p><p><b>Felle:<\/b> å regne 6 % × (1 − t) for den skattefrie. Den skattefrie skattlegges ikke, uansett hvem som eier den.<\/p>",
"kilder": [
"F10 lb 17"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-06",
"nivaa": "kjerne",
"kan": "Løse oppgaven med skattefritak for shippingaksjer",
"kort": "Ny nominell avkastning blir 10 % × (1 − 0,22) = 7,8 % og implisitt skatt (10 − 7,8)/10 = 22 %. Med 45 % marginalskatt gir flyfrakt 10 % × 0,55 = 5,5 % &lt; 7,8 %, så hun velger shipping.",
"mer": "<p>Shipping og flyfrakt er like risikable og ga 10 % skattlagt med 22 %. Når shipping blir skattefri, øker etterspørselen til avkastningen faller til X = 10 % × 0,78 = 7,8 %. Investorens sats 45 % &gt; t* = 22 %, så det skattefrie aktivumet vinner.<\/p><p><b>Kildefeil:<\/b> fasiten skriver 10 % × (100 % − 45 %) = 6,5 %. Riktig er 5,5 %, men konklusjonen er den samme. Fasiten bytter også navn fra Benedicte til Pernille.<\/p><p><b>Felle:<\/b> å svare at shippingavkastningen forblir 10 %. Fritaket kapitaliseres i prisen.<\/p>",
"kilder": [
"Oppgaver F10 o1 (filen heter «forelesning 9»)"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-07",
"nivaa": "kjerne",
"kan": "Vite at t* bestemmes av markedsprisene og marginalinvestoren, ikke av egen sats",
"kort": "t* regnes bare fra R og r, uten å kjenne skattesatsen på det skattlagte aktivumet. I likevekt er t* lik marginalinvestorens sats.",
"mer": "<p>Lysbildet sier eksplisitt at vi ikke trenger å vite skatten på det skattlagte aktivumet for å finne den implisitte skatten. Er R = 8 % og r = 6 %, er t* = 25 % selv om lovens sats er 22 %. Din egen sats bruker du bare i <i>valget<\/i> etterpå.<\/p><p><b>Felle 1:<\/b> å sette t* lik lovens 22 % fordi oppgaven nevner 22 %. Regn alltid t* fra avkastningene når de er oppgitt.<\/p><p><b>Felle 2:<\/b> å bruke egen sats i formelen for t*.<\/p>",
"kilder": [
"F10 lb 15",
"SW s. 130"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-08",
"nivaa": "kjerne",
"kan": "Forklare hvem som tjener på skattefavoriseringen",
"kort": "Utstederen betaler lavere rente, investoren tjener bare hvis egen sats er over t* og staten taper hele den eksplisitte skatten. Ved 40 % sats per 100 kr: staten taper 3,20, utstederen sparer 2,00 og investoren tjener 1,20.",
"mer": "<p>Investoren velger B (skattefri, 6 %) i stedet for A (skattlagt, 8 %). Utsteder: betaler 6 i stedet for 8, sparer 2,00. Staten: mister 40 % × 8 = 3,20. Investoren: får 6,00 i stedet for 4,80, tjener 1,20. Sjekk: 3,20 = 2,00 + 1,20. Investorens gevinst = (t − t*)·R = (0,40 − 0,25) × 8 = 1,20. For marginalinvestoren (25 %) er gevinsten 0: staten taper 2 og utstederen sparer 2.<\/p><p><b>Felle:<\/b> «den som kjøper skattefrie obligasjoner får hele skattefordelen». Det meste tilfaller utstederen.<\/p>",
"kilder": [
"F10 lb 19",
"Gml. F9 lb 23",
"SW s. 126"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-09",
"nivaa": "kjerne",
"kan": "Unngå de vanligste feilene i oppgaver om implisitt skatt",
"kort": "Nevneren er R (den skattlagte) og t* er en sats, ikke en differanse i prosentpoeng. Sammenlign egen sats med t* (ikke med lovens sats) og husk at det skattefrie aktivumet har lavest nominell avkastning.",
"mer": "<p>Sjekkliste før du krysser av:<\/p><ul><li>Hvilket aktivum er skattefritt? Det har lavest avkastning før skatt.<\/li><li>t* = 1 − r<sub>fri<\/sub>/R<sub>skattepliktig<\/sub>, aldri delt på r<sub>fri<\/sub>.<\/li><li>Valg: egen sats &gt; t* ⇒ skattefri. Kontrollregn R(1 − t) mot r<sub>fri<\/sub>.<\/li><li>Skattefri avkastning skal aldri ganges med (1 − t).<\/li><li>Krever lik risiko. Er risikoen ulik, må avkastningene risikojusteres først.<\/li><\/ul><p><b>Felle:<\/b> å svare «likegyldig» fordi begge «gir 6 %». Det gjelder bare investoren med sats lik t*.<\/p>",
"kilder": [
"F10 lb 15–17",
"H2024 o9",
"H2019 o4"
],
"eksamen": [
"H2019 o4",
"H2024 o9a",
"H2024 o9b"
]
},
{
"id": "f10-implisitt-skatt-10",
"nivaa": "kjerne",
"kan": "Forklare hvorfor den skattefrie obligasjonen har lavere nominell avkastning",
"kort": "Skattefritaket øker etterspørselen, prisen stiger og avkastningen før skatt faller til etter-skatt-avkastningen på det like risikable skattlagte alternativet.",
"mer": "<p>H2024 o9a: obligasjon A er fritatt for skatt, B skattlegges med 22 %, markedet er velfungerende. Riktig påstand: A har lavere nominell avkastning enn B, r &lt; R, fordi r = (1 − t)R i likevekt. Gal påstand: at de har samme nominelle avkastning, eller at de ikke kan sammenlignes.<\/p><p><b>Felle:<\/b> å tro at staten «gir» den skattefrie obligasjonen høyere rente. Det er markedsprisen som justeres.<\/p>",
"kilder": [
"F10 lb 14",
"Gml. F9 lb 21–22"
],
"eksamen": [
"H2024 o9a",
"H2019 o4"
]
},
{
"id": "f10-implisitt-skatt-11",
"nivaa": "viktig",
"kan": "Regne prisen på en obligasjon som blir skattefri (kapitalisering)",
"kort": "Kupong 8 kr, skattlagt med 25 %, gir 6 % etter skatt til kurs 100. Blir den skattefri, stiger prisen til 8/0,06 = 133,33 kr og avkastningen før skatt faller til 6 %. Eieren da fritaket blir kjent tjener 33,33 kr.",
"mer": "<p>Tabellen på lysbildet: skattlagt (pris 100, kupong 8, skatt 2, netto 6, 8 % før og 6 % etter skatt) mot skattefri (pris 133,33, kupong 8, skatt 0, netto 8, 6 % før og etter skatt). Implisitt skatt (8 − 6)/8 = 25 %. Nye kjøpere får bare markedsavkastningen 6 % etter skatt: ingen «free lunch».<\/p><p><b>Felle:<\/b> at nye kjøpere tjener på fritaket. Gevinsten tilfaller den som eier når fritaket blir kjent.<\/p>",
"kilder": [
"F10 lb 18"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-12",
"nivaa": "viktig",
"kan": "Forklare skatteklientell-effekten",
"kort": "Skattefavoriserte aktiva havner hos investorer med sats over t*, fullt skattlagte hos investorer med lav sats eller skattefrie institusjoner. Den marginale investoren er likegyldig.",
"mer": "<p>SW: investorer i samme skatteklasse trekkes mot aktiva som skattlegges likt. De som har en annen sats enn marginalinvestoren, de inframarginale, har en klar preferanse (sin «tax clientele»). Bare marginalinvestorene mangler «merkelojalitet» og hopper mellom aktivaene når relative priser endres. Klienteller gjelder også selskaper: et selskap med lavere sats enn den implisitte bør holde skattlagte obligasjoner.<\/p><p><b>Felle:<\/b> å plassere pensjonsfond (0 %) i den skattefrie obligasjonen.<\/p>",
"kilder": [
"F10 lb 17",
"SW s. 130"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-13",
"nivaa": "viktig",
"kan": "Bruke t*-regelen på nye historier, f.eks. en skattefri «grønn» obligasjon",
"kort": "Samme regel gjelder alle par av like risikable aktiva der ett er skattefavorisert: t* = 1 − r<sub>fri<\/sub>/R og egen sats sammenlignes med t*.",
"mer": "<p><b>Tenkt eksempel (ikke fra lysbildene):<\/b> en skattefri grønn obligasjon gir 3,9 %, en like risikabel skattepliktig gir 5 %. t* = 1 − 3,9/5 = 22 %. Investor med 30 %: 5 % × 0,70 = 3,5 % &lt; 3,9 %, velg grønn. Pensjonsfond med 0 %: 5 % &gt; 3,9 %, velg skattepliktig. Investor med 22 %: likegyldig.<\/p><p>Eksamen har brukt historiene «prosjekt med satsingsområde» (H2019), «statsobligasjon» (H2024) og «shippingaksjer» (oppgavesettet). Kjenn igjen strukturen uansett innpakning.<\/p><p><b>Felle:<\/b> å tro at «grønn» eller «satsingsområde» endrer formelen.<\/p>",
"kilder": [
"F10 lb 15–17",
"H2019 o4",
"H2024 o9"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-14",
"nivaa": "viktig",
"kan": "Forklare implisitt skatt i boligmarkedet",
"kort": "Primærboligen er skattefavorisert (lav formuesverdi, ingen skatt på bofordelen, skattefri gevinst når botidskravet er oppfylt). Med lite elastisk tilbud kapitaliseres fordelene i høyere priser: nye kjøpere betaler for dem.",
"mer": "<p>Samme logikk som for obligasjonen: skattefordelen tilfaller den som eier når den innføres. Nye skattefordeler i boligbeskatningen gir gevinst til de som allerede er i markedet, mens kjøperne taper fordi prisene stiger. Reverseres fordelene, faller prisene: de som er «inne» taper og kjøperne tjener.<\/p><p><b>Felle:<\/b> å tro at førstegangskjøpere tjener på nye skattefordeler for bolig. De betaler dem gjennom prisen.<\/p>",
"kilder": [
"F10 lb 20"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-15",
"nivaa": "viktig",
"kan": "Skille mellom implisitt skatt i prosentpoeng og implisitt skattesats",
"kort": "SW: implisitt skatt = R<sub>b<\/sub> − R<sub>a<\/sub> (f.eks. 10 % − 7 % = 3 prosentpoeng), implisitt skattesats = (R<sub>b<\/sub> − R<sub>a<\/sub>)/R<sub>b<\/sub> = 30 %.",
"mer": "<p>R<sub>b<\/sub> er referanseaktivumet (benchmark): en fullt skattlagt, misligholdsfri obligasjon. R<sub>a<\/sub> er den risikojusterte før-skatt-avkastningen på alternativet. Den implisitte skattesatsen er den satsen som, brukt eksplisitt på den skattlagte obligasjonen, ville gitt R<sub>a<\/sub>: R<sub>b<\/sub>(1 − t<sub>Ia<\/sub>) = R<sub>a<\/sub>. Den skattlagte obligasjonen har null implisitt skatt.<\/p><p><b>Felle:<\/b> et svaralternativ som oppgir 3 % som implisitt skattesats. 3 % er beløpet, 30 % er satsen.<\/p>",
"kilder": [
"SW s. 125"
],
"eksamen": []
},
{
"id": "f10-implisitt-skatt-16",
"nivaa": "detalj",
"kan": "Vite at implisitt skatt kan være negativ og kjenne skattediskriminerte aktiva",
"kort": "Aktiva som skattlegges hardere enn referanseobligasjonen må gi en før-skatt-premie og har negativ implisitt skatt.",
"mer": "<p>SW nevner som skattediskriminering: særskatter (f.eks. windfall-skatt på olje, importtoll, avgifter), inntektsføring før inntekten er opptjent (f.eks. risikable obligasjoner der hele kupongen skattlegges selv om den inneholder en misligholdspremie) og fradrag senere enn verdifallet (f.eks. varemerker som ikke kan avskrives). Disse prises til en høyere før-skatt-avkastning enn referanseaktivumet.<\/p><p><b>Felle:<\/b> å tro at implisitt skatt alltid er positiv.<\/p>",
"kilder": [
"SW s. 121",
"SW s. 125 fotnote 4"
],
"eksamen": []
}
]
},
{
"id": "f10-tapsfradrag",
"forelesning": "F10 Skatt, aksjer og risikotaking",
"tittel": "Skatt, tapsfradrag og prosjektvalg",
"eksamensvekt": 2,
"viktigst": [
"Uten tapsfradrag deler staten bare oppsiden: skatten vrir valget mot det sikre prosjektet",
"Med fullt tapsfradrag er staten «silent partner» i både opp- og nedside: valget blir som uten skatt",
"Tallene med t = 40 %: A = 12 000, B = −5 000 uten fradrag, B = 15 000 med fullt fradrag",
"Delvis eller manglende tapsfradrag gir mindre risikotaking, også for en risikonøytral investor"
],
"punkter": [
{
"id": "f10-tapsfradrag-01",
"nivaa": "kjerne",
"kan": "Regne forventet gevinst av prosjekt A og B uten skatt",
"kort": "A = 20 000 kr. E[B] = 0,5 × 150 000 − 0,5 × 100 000 = 25 000 kr, så en risikonøytral investor velger B.",
"mer": "<p>Utgangspunktet i forelesningens eksempel. Tallene 150 000 og 100 000 er netto gevinst og netto tap, ikke utbetaling inklusive innsats. Forventningsverdien er det som styrer valget for en risikonøytral investor.<\/p><p><b>Felle:<\/b> å regne E[B] = 0,5 × 150 000 = 75 000 og glemme tapsutfallet, eller å trekke innsatsen på 100 000 fra en gang til.<\/p>",
"kilder": [
"F10 lb 2",
"Gml. F9 lb 3"
],
"eksamen": []
},
{
"id": "f10-tapsfradrag-02",
"nivaa": "kjerne",
"kan": "Regne prosjektvalget med 40 % skatt uten tapsfradrag",
"kort": "A = 0,6 × 20 000 = 12 000 kr. E[B] = 0,5 × 0,6 × 150 000 − 0,5 × 100 000 = −5 000 kr, så investoren velger A.",
"mer": "<p>Investoren setter inn 100 000 kr. A gir 20 000 kr sikkert. B gir 150 000 kr i gevinst med 50 % sannsynlighet og tap av hele innsatsen (100 000 kr) med 50 %. Staten tar 40 % av gevinsten, men gir ikke fradrag når det går galt. Nedsiden står derfor urørt mens oppsiden krymper.<\/p><p><b>Felle:<\/b> å gange tapet med 0,6 også. Da får du 15 000 kr, som er tilfellet <i>med<\/i> fullt tapsfradrag. Les alltid om staten deler nedsiden.<\/p>",
"kilder": [
"F10 lb 2",
"Gml. F9 lb 4"
],
"eksamen": []
},
{
"id": "f10-tapsfradrag-03",
"nivaa": "kjerne",
"kan": "Regne prosjektvalget med 40 % skatt og fullt tapsfradrag",
"kort": "E[B] = 0,5 × 0,6 × 150 000 − 0,5 × 0,6 × 100 000 = 15 000 kr > A = 12 000 kr, så B velges, akkurat som uten skatt.",
"mer": "<p>Med fullt tapsfradrag bærer staten 40 % av tapet, så investoren sitter igjen med 60 % av både gevinst og tap. Alle utfall skaleres med (1 − t): uten skatt er tallene 25 000 og 20 000, med skatt 15 000 og 12 000. Forholdet 25/20 = 15/12 er uendret og rangeringen likeså.<\/p><p><b>Felle:<\/b> å tro at skatten «straffer» det risikable prosjektet mest. Det gjelder bare når tapsfradraget mangler.<\/p>",
"kilder": [
"F10 lb 3",
"Gml. F9 lb 5"
],
"eksamen": []
},
{
"id": "f10-tapsfradrag-04",
"nivaa": "kjerne",
"kan": "Forklare hvorfor fullt tapsfradrag gjør skatten nøytral for risikotaking",
"kort": "Staten blir en «silent partner» som tar andelen t av både gevinst og tap. Alle utfall skaleres med (1 − t), så rangeringen av prosjekter endres ikke.",
"mer": "<p>Lysbildet sier det rett ut: skatt påvirker ikke investeringsvalg når staten er med på både opp- og nedsiden. Uten tapsfradrag er skatten asymmetrisk: staten deler gevinsten, men ikke tapet. Da faller forventet avkastning etter skatt mest for prosjektene med stor nedside og risikotaking straffes.<\/p><p><b>Felle:<\/b> et alternativ som sier at skatt alltid reduserer risikotaking. Det holder bare uten (fullt) tapsfradrag.<\/p>",
"kilder": [
"F10 lb 3",
"F10 lb 4"
],
"eksamen": []
},
{
"id": "f10-tapsfradrag-05",
"nivaa": "kjerne",
"kan": "Avgjøre virkningen av delvis tapsfradrag for en risikonøytral investor",
"kort": "Bare delvis fremføring av tap gjør skatten asymmetrisk. Forventet gevinst etter skatt faller mest for det risikable prosjektet, så investoren tar mindre risiko.",
"mer": "<p><b>Eksempel:<\/b> bare halvparten av tapet gir fradrag. Da blir tapet etter skatt 100 000 − 0,4 × 0,5 × 100 000 = 80 000 og E[B] = 0,5 × 90 000 − 0,5 × 80 000 = 5 000 kr. Det er lavere enn A = 12 000 kr, så investoren velger det sikre prosjektet.<\/p><p><b>Felle:<\/b> alternativet «vi påvirkes ikke fordi vi er opptatt av forventet gevinst». Det er nettopp forventet gevinst etter skatt som faller. Forelesningens eksempel er regnet med forventningsverdier, altså for en risikonøytral investor.<\/p>",
"kilder": [
"F10 lb 2–3"
],
"eksamen": []
},
{
"id": "f10-tapsfradrag-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor oppstartsbedrifter taper på manglende tapsfradrag",
"kort": "En start-up har ofte ingen annen inntekt å føre tapet mot og framtidig inntekt er usikker. Etablerte selskaper kan føre tap på ett prosjekt mot gevinst på andre og har dermed en skattefordel.",
"mer": "<p>I praksis møter oppstartsbedriften en asymmetrisk skatt: staten deler gevinsten, men tapet kan bare fremføres mot usikker framtidig inntekt. Bedriften må ofte hente inn ny kapital. Et etablert selskap med løpende overskudd får fradraget med en gang og staten blir reelt medinvestor også på nedsiden.<\/p><p><b>Felle:<\/b> å tro at skattesystemet favoriserer nye, risikable bedrifter. Det er de etablerte som har fordelen.<\/p>",
"kilder": [
"F10 lb 4",
"Gml. F9 lb 6"
],
"eksamen": []
}
]
},
{
"id": "f10-portefolje",
"forelesning": "F10 Skatt, aksjer og risikotaking",
"tittel": "Porteføljevalg med skatt (Domar-Musgrave, Mossin og Stiglitz)",
"eksamensvekt": 2,
"viktigst": [
"Sluttformue Y = A + a<sub>1<\/sub>x<sub>1<\/sub>(1 − t). Førsteordensbetingelse E[U′(Y)x<sub>1<\/sub>] = 0",
"∂a<sub>1<\/sub>/∂t = a<sub>1<\/sub>/(1 − t) > 0: høyere skatt gir mer i det risikable aktivumet",
"Intuisjon: investoren holder a<sub>1<\/sub>(1 − t) konstant og replikerer fordelingen av sluttformuen",
"Forutsetninger: null avkastning på det sikre aktivumet og fullt tapsfradrag",
"Med positiv risikofri avkastning kommer en inntektseffekt til og fortegnet blir ubestemt"
],
"punkter": [
{
"id": "f10-portefolje-01",
"nivaa": "kjerne",
"kan": "Sette opp sluttformuen i porteføljemodellen med skatt",
"kort": "Y = a<sub>0<\/sub> + a<sub>1<\/sub>[1 + x<sub>1<\/sub>(1 − t)] = A + a<sub>1<\/sub>x<sub>1<\/sub>(1 − t), der A = a<sub>0<\/sub> + a<sub>1<\/sub> og den sikre avkastningen x<sub>0<\/sub> = 0.",
"mer": "<p>Startformuen A fordeles på a<sub>0<\/sub> (sikker, avkastning x<sub>0<\/sub> = 0) og a<sub>1<\/sub> (usikker avkastning x<sub>1<\/sub>, som kan være negativ). Skatten t treffer bare den risikable avkastningen. Tap er fullt fradragsberettiget: er x<sub>1<\/sub> &lt; 0, mottar investoren fradraget t·x<sub>1<\/sub>, derfor står (1 − t) også foran negative utfall.<\/p><p><b>Felle:<\/b> å skrive Y = A(1 − t) + … Skatten treffer bare avkastningen, ikke hovedstolen.<\/p>",
"kilder": [
"F10 lb 6–7",
"AS2 s. 56"
],
"eksamen": []
},
{
"id": "f10-portefolje-02",
"nivaa": "kjerne",
"kan": "Utlede førsteordensbetingelsen for optimal a<sub>1<\/sub>",
"kort": "max E[U(Y)] med hensyn på a<sub>1<\/sub> gir E[U′(Y)x<sub>1<\/sub>(1 − t)] = 0. Siden (1 − t) ikke er stokastisk, kan den deles bort: E[U′(Y)x<sub>1<\/sub>] = 0.",
"mer": "<p>∂Y/∂a<sub>1<\/sub> = x<sub>1<\/sub>(1 − t). Det som ikke er stokastisk, kan settes utenfor forventningsoperatoren. Finner vi optimal a<sub>1<\/sub>, følger a<sub>0<\/sub> = A − a<sub>1<\/sub>. Fordi U er konkav, er betingelsen også tilstrekkelig for maksimum. Optimal a<sub>1<\/sub> &gt; 0 når E[x<sub>1<\/sub>] &gt; 0.<\/p><p><b>Felle:<\/b> å tro at betingelsen avhenger av t. Etter at (1 − t) er delt bort, bestemmer den produktet a<sub>1<\/sub>(1 − t), ikke a<sub>1<\/sub> alene.<\/p>",
"kilder": [
"F10 lb 8–9",
"AS2 s. 56"
],
"eksamen": []
},
{
"id": "f10-portefolje-03",
"nivaa": "kjerne",
"kan": "Vite resultatet ∂a<sub>1<\/sub>/∂t = a<sub>1<\/sub>/(1 − t) > 0 og bruke det i tall",
"kort": "Økt skatt på avkastningen gir økt investering i det risikable aktivumet. a<sub>1<\/sub>(1 − t) holdes konstant.",
"mer": "<p>Deriverer vi E[U′(Y)x<sub>1<\/sub>] = 0 med hensyn på t, faller de ikke-stokastiske leddene bort og vi står igjen med ∂a<sub>1<\/sub>/∂t·(1 − t) = a<sub>1<\/sub>. På elastisitetsform: (∂a<sub>1<\/sub>/∂t)(t/a<sub>1<\/sub>) = t/(1 − t).<\/p><p><b>Eksempel:<\/b> risikoeksponeringen etter skatt er 60 000 kr. Da er a<sub>1<\/sub> = 60 000/(1 − t): 60 000 ved t = 0, 75 000 ved 20 %, 100 000 ved 40 % og 120 000 ved 50 %.<\/p><p><b>Felle:<\/b> «høyere kapitalskatt får investor til å selge seg ned i aksjer». Det er det konvensjonelle synet som modellen tilbakeviser.<\/p>",
"kilder": [
"F10 lb 10–12",
"AS2 s. 56"
],
"eksamen": []
},
{
"id": "f10-portefolje-04",
"nivaa": "kjerne",
"kan": "Forklare intuisjonen bak resultatet: replikering av fordelingen",
"kort": "Investoren øker a<sub>1<\/sub> slik at a<sub>1<\/sub>(1 − t) er uendret. Da gjenopprettes den optimale sannsynlighetsfordelingen for sluttformuen fra før skatteøkningen.",
"mer": "<p>Fordi den sikre plasseringen gir null avkastning, er den eneste måten å gjenopprette fordelingen på å kjøpe mer av det risikable aktivumet. Forventet nytte er uendret, så responsen er en ren substitusjonseffekt. I middelverdi-standardavvik-språk: E = A + a<sub>1<\/sub>μ<sub>1<\/sub>(1 − t) og S = a<sub>1<\/sub>σ<sub>1<\/sub>(1 − t) er begge uavhengige av t.<\/p><p><b>Felle:<\/b> å forklare resultatet med at investoren «vil ha tilbake tapt avkastning». Det handler om at staten tar like stor andel av risikoen som av avkastningen.<\/p>",
"kilder": [
"F10 lb 12",
"AS2 s. 57 og fotnote 2"
],
"eksamen": []
},
{
"id": "f10-portefolje-05",
"nivaa": "kjerne",
"kan": "Nevne de to sentrale forutsetningene for resultatet",
"kort": "(1) Null avkastning på det sikre aktivumet (x<sub>0<\/sub> = 0) og (2) fullt tapsfradrag. Med x<sub>0<\/sub> = 0 trenger vi ikke vite noe om nyttefunksjonens form.",
"mer": "<p>Fordi x<sub>0<\/sub> = 0, forsvinner leddene med forventet nytte og resultatet gjelder for enhver risikoavers investor uansett risikoaversjon. Fullt tapsfradrag sikrer at staten deler nedsiden. I tillegg ligger det implisitt at skatten er proporsjonal, at formuen (sparingen) er gitt og i grunnmodellen at det finnes ett risikabelt aktivum (AS2 utvider til mange).<\/p><p><b>Felle:<\/b> at resultatet krever risikonøytralitet eller en bestemt nyttefunksjon. Det krever bare konkav U og forutsetningene over.<\/p>",
"kilder": [
"F10 lb 7",
"F10 lb 12"
],
"eksamen": []
},
{
"id": "f10-portefolje-06",
"nivaa": "viktig",
"kan": "Forklare hva som skjer når den sikre avkastningen er positiv (x<sub>0<\/sub> > 0)",
"kort": "Da får ∂a<sub>1<\/sub>/∂t et ekstra ledd, en slags inntektseffekt, som avhenger av A·x<sub>0<\/sub> og risikoholdningen U″. Fortegnet blir ubestemt: vi kan ikke si om investoren kjøper mer eller mindre aksjer.",
"mer": "<p>Lysbildets formel: ∂a<sub>1<\/sub>/∂t = a<sub>1<\/sub>/(1 − t) − [A·x<sub>0<\/sub>/(1 − t)] · E[U″(Y)(x<sub>1<\/sub> − 1)] / E[U″(Y)(x<sub>1<\/sub> − x<sub>0<\/sub>)<sup>2<\/sup>]. Første ledd er repliseringseffekten, andre ledd inntektseffekten. Når skatten også treffer den sikre avkastningen, blir investoren fattigere og hvordan det slår ut avhenger av risikoaversjonen.<\/p><p>Sandmo (AS2): beskattes bare meravkastningen x<sub>1<\/sub> − x<sub>0<\/sub>, holder grunnresultatet likevel.<\/p><p><b>Felle:<\/b> å svare at investoren «alltid» øker aksjeandelen når skatten øker.<\/p>",
"kilder": [
"F10 lb 13",
"AS2 s. 57"
],
"eksamen": []
},
{
"id": "f10-portefolje-07",
"nivaa": "viktig",
"kan": "Kjenne igjen det konvensjonelle synet mot Domar-Musgrave-synet",
"kort": "Det gamle synet var at skatt på risikabel avkastning reduserer risikotaking. Domar og Musgrave (1944) viste at staten også tar en andel av risikoen, slik at skatt kan gi mer risikotaking.",
"mer": "<p>Mossin (1968) og Stiglitz (1969) formaliserte resultatet i modellen med ett sikkert og ett risikabelt aktivum. Tobin (1958) ga en geometrisk analyse i middelverdi-standardavvik. Sandmo påpeker at det finnes lite empiri som støtter noen av synene (Feldstein 1976), så økonomisk intuisjon basert på teori blir avgjørende. Forelesningen stiller spørsmålet: vil investor selge seg ned i aksjer når skatten på kapitalgevinster øker?<\/p><p><b>Felle:<\/b> å tilskrive det «nye» synet Sandmo. Han nyanserer det.<\/p>",
"kilder": [
"F10 lb 5",
"AS2 s. 55–56"
],
"eksamen": []
}
]
},
{
"id": "f10-sw-implicit-taxes",
"forelesning": "F10 Skatt, aksjer og risikotaking",
"tittel": "SW Implicit taxes: total skattesats, risikojustering, klienteller og empiri",
"eksamensvekt": 2,
"viktigst": [
"Total skattesats = implisitt + eksplisitt = (R<sub>b<\/sub> − r*)/R<sub>b<\/sub>, lik for alle aktiva i konkurranselikevekt",
"Eksplisitt skattesats måles mot referanseaktivumets R<sub>b<\/sub>, ikke aktivumets egen avkastning",
"Risikojuster før du regner implisitt skatt: risikopremier kan skjule skatteforskjeller",
"Marginale investorer er likegyldige, inframarginale har en skatteklientell",
"Raske avskrivninger og skattekreditter er skattefavorisering og gir implisitt skatt"
],
"punkter": [
{
"id": "f10-sw-implicit-taxes-01",
"nivaa": "viktig",
"kan": "Regne total skattesats som summen av implisitt og eksplisitt skatt",
"kort": "Total skattesats = (R<sub>b<\/sub> − R<sub>a<\/sub>)/R<sub>b<\/sub> + (R<sub>a<\/sub> − r*)/R<sub>b<\/sub> = (R<sub>b<\/sub> − r*)/R<sub>b<\/sub>. I konkurranselikevekt er den lik for alle aktiva.",
"mer": "<p><b>SWs tabell for ulikt skattlagte aktiva (r* = 7 %):<\/b> fullt skattlagt 10 %: implisitt 0 %, eksplisitt 30 %. Delvis skattlagt 8 %: implisitt 20 %, eksplisitt 10 %. Skattefri 7 %: implisitt 30 %, eksplisitt 0 %. Total skattesats 30 % for alle tre, som da også er lovens sats på ordinær inntekt.<\/p><p><b>Felle 1:<\/b> å måle den eksplisitte satsen på den delvis skattlagte mot dens egen avkastning: 1 %/8 % = 12,5 %. SW bruker R<sub>b<\/sub>: 1 %/10 % = 10 %.<\/p><p><b>Felle 2:<\/b> i SW betyr r* den felles avkastningen etter skatt, ikke en skattesats.<\/p>",
"kilder": [
"SW s. 126–127"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-02",
"nivaa": "viktig",
"kan": "Regne andelen g av avkastningen som er skattepliktig for et delvis skattlagt aktivum",
"kort": "R<sub>p<\/sub>(1 − g·t) = r*. Med R<sub>p<\/sub> = 8 %, t = 30 % og r* = 7 %: 0,08(1 − 0,30g) = 0,07 gir g = 41,67 %.",
"mer": "<p>g = 1 er fullt skattlagt, g = 0 er skattefritt, 0 &lt; g &lt; 1 delvis skattlagt. Løs for g: g = (1 − r*/R<sub>p<\/sub>)/t = (1 − 0,875)/0,30 = 0,4167. Samme ligning brukes i SWs tabell med risikojusterte tall: 0,10(1 − 0,40g) = 0,09 gir g = 25 %.<\/p><p><b>Felle:<\/b> å bruke den implisitte satsen (20 %) som g. g er andelen av avkastningen som skattlegges til full sats.<\/p>",
"kilder": [
"SW s. 126 fotnote 5",
"SW s. 128"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-03",
"nivaa": "viktig",
"kan": "Forklare hvorfor man må risikojustere før man regner implisitt skatt",
"kort": "Risikopremier ligger i før-skatt-avkastningen. Uten justering blir implisitte og eksplisitte satser feil og kan skjule skatteforskjeller.",
"mer": "<p><b>SWs tabell med ulik risiko:<\/b> påkrevd avkastning 20 % (skattlagt), 12 % (delvis), 12 % (skattefri), t = 40 %. Ujustert ser delvis og skattefri like ut: begge 40 % implisitt. Trekk fra risikopremiene 5 %, 2 % og 3 %: R<sup>ra<\/sup> = 15 %, 10 % og 9 % = r*. Da blir implisitt sats 0 %, 33,3 % og 40 % og eksplisitt 40 %, 6,7 % og 0 %. Total 40 % for alle.<\/p><p>Etter-skatt-risikopremien R<sup>rp<\/sup>(1 − gt) er 3 %, 1,8 % og 3 %: det delvis skattlagte aktivumet er minst risikabelt.<\/p><p><b>Felle:<\/b> å sammenligne før-skatt-avkastninger på aktiva med ulik risiko.<\/p>",
"kilder": [
"SW s. 127–130",
"F10 lb 14 («to like risikable aktiva»)"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-04",
"nivaa": "viktig",
"kan": "Definere marginale og inframarginale investorer",
"kort": "Marginale investorer er likegyldige mellom ulikt skattlagte, like risikable aktiva fordi deres eksplisitte sats er lik den implisitte. Inframarginale investorer har en annen sats og foretrekker ett av aktivaene.",
"mer": "<p>SW: med 30 % implisitt sats på kommuneobligasjoner (7 %) og 10 % før-skatt-avkastning på skattlagte obligasjoner er en investor med 30 % sats likegyldig. En investor med 20 % sats får 8 % etter skatt i skattlagte, 1 prosentpoeng mer enn i kommuneobligasjoner. En investor med 40 % er bedre stilt i kommuneobligasjoner: 30 % implisitt er billigere enn 40 % eksplisitt.<\/p><p><b>Felle:<\/b> å tro at alle investorer er likegyldige i likevekt. Bare marginalinvestorene er det.<\/p>",
"kilder": [
"SW s. 130"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-05",
"nivaa": "viktig",
"kan": "Forklare hvordan raske avskrivninger og skattekreditter gir implisitt skatt",
"kort": "Jo raskere fradrag, desto mer skattefavorisert investering, lavere påkrevd før-skatt-avkastning og høyere implisitt skatt. En skattekreditt reduserer skatten krone for krone og er mer verdt enn et fradrag.",
"mer": "<p><b>Eksempel:<\/b> investering 100 000 dollar, sats 40 %. Umiddelbart fradrag sparer 40 000. Lineær avskrivning over to år med 9 % diskonteringsrente: 20 000 + 20 000/1,09 = 38 349, altså 1 651 mindre. En skattekreditt på 10 % av 20 000 = 2 000 reduserer skatten fra 15 000 til 13 000. Et fradrag reduserer skatten bare med satsen ganger fradraget.<\/p><p><b>Felle:<\/b> å tro at avskrivningstakten ikke påvirker verdien fordi summen av fradrag er lik. Nåverdien er det som teller (jf. H2020 o1a om å avskrive raskest mulig).<\/p>",
"kilder": [
"SW s. 122"
],
"eksamen": [
"H2020 o1a"
]
},
{
"id": "f10-sw-implicit-taxes-06",
"nivaa": "viktig",
"kan": "Regne avkastningen på en investering med fradrag ved innskudd og full skatt ved utbetaling",
"kort": "Avkastning per krone etter skatt = (1 + R)<sup>n<\/sup>(1 − t<sub>pn<\/sub>)/(1 − t<sub>p0<\/sub>). Med konstant sats blir den (1 + R)<sup>n<\/sup>: avkastningen er reelt skattefri.",
"mer": "<p><b>Eksempel:<\/b> t = 40 %, R = 8 %, n = 5. En krone koster 0,60 etter fradrag og gir 1,08<sup>5<\/sup> × 0,60 = 0,882 etter skatt. 0,882/0,60 = 1,469, altså 8 % per år, lik før-skatt-avkastningen. SW påpeker at dette er samme algebra som pensjonssparing. Investorer byr derfor opp slike investeringer til R faller til etter-skatt-renten på obligasjoner: forskjellen er implisitt skatt betalt til kunder (lavere priser) eller leverandører (høyere innsatspriser).<\/p><p><b>Felle:<\/b> å tro at fradraget gir en avkastning over R. Med konstant sats gir det nøyaktig R.<\/p>",
"kilder": [
"SW s. 122–123",
"F10 lb 25"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-07",
"nivaa": "detalj",
"kan": "Regne påkrevd før-skatt-avkastning når skattesatsen faller over tid",
"kort": "R = [(1 + r<sub>b<\/sub>)<sup>n<\/sup>(1 − t<sub>p0<\/sub>)/(1 − t<sub>pn<\/sub>)]<sup>1/n<\/sup> − 1. Med t<sub>p0<\/sub> = 40 %, t<sub>pn<\/sub> = 30 %, n = 5 og r<sub>b<\/sub> = 7 % blir R = 3,75 %.",
"mer": "<p>Staten dekker 40 % av hver investert krone, men krever bare 30 % av avkastningen. Da byr investorene opp prisen til før-skatt-avkastningen er langt under etter-skatt-renten på obligasjoner (7 %). Forventes satsen å <i>stige<\/i>, blir påkrevd R høyere enn obligasjonsrenten og prosjektet bærer eksplisitt skatt. Det samme skjer med konstant sats når fradragene er mindre gunstige enn umiddelbar utgiftsføring.<\/p><p><b>Felle:<\/b> å bytte om t<sub>p0<\/sub> og t<sub>pn<\/sub>. Sats ved innskudd står i telleren under rottegnet.<\/p>",
"kilder": [
"SW s. 123–124"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-08",
"nivaa": "detalj",
"kan": "Kjenne SWs liste over skattefavoriserte aktiva og kommuneobligasjonene",
"kort": "Favorisert: fullt fritak (kommuneobligasjoner i USA), delvis fritak eller lavere sats (kapitalgevinster), skattekreditter, fradrag raskere enn verdifallet og inntektsføring senere enn verdiøkningen.",
"mer": "<p>Kommuneobligasjoner er det tydeligste eksemplet på implisitt skatt: renten er fritatt for føderal skatt, så prisen bys opp og før-skatt-renten er lavere enn på like risikable skattlagte obligasjoner. SW: utsteder får en implisitt subsidie i form av lavere kapitalkostnad, som tilsvarer at alle obligasjoner var skattlagt og staten sendte skatten videre til kommunene. Delstater med høy sats (California, New York) kan utstede til lavere rente enn delstater uten inntektsskatt (Texas).<\/p><p><b>Felle:<\/b> å tro at implisitt skatt bare gjelder obligasjoner. Den gjelder alle skattefavoriserte aktiva.<\/p>",
"kilder": [
"SW s. 120–121",
"SW s. 126"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-09",
"nivaa": "detalj",
"kan": "Regne California-eksemplet med delstatsskatt",
"kort": "10 % delstatsskatt er fradragsberettiget føderalt og blir effektivt 7 %, totalt 37 %. Treasury (fritatt for delstatsskatt) 9 % × 0,70 = 6,3 % og ikke-Treasury 10 % × 0,63 = 6,3 %: investoren er likegyldig.",
"mer": "<p>Treasury-papirer er skattlagt føderalt, men fritatt for delstatsskatt. For en California-beboer med 30 % føderal og 10 % delstatssats er effektiv delstatssats 10 % × (1 − 0,30) = 7 %. Total sats på ikke-Treasury: 30 % + 7 % = 37 %. Begge gir 6,3 % etter skatt, så før-skatt-renten på Treasury kan være 1 prosentpoeng lavere.<\/p><p><b>Felle:<\/b> å legge sammen 30 % + 10 % = 40 % og glemme fradraget for delstatsskatten.<\/p>",
"kilder": [
"SW s. 121 fotnote 2"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-10",
"nivaa": "detalj",
"kan": "Kjenne empirien om implisitt skatt og klienteller",
"kort": "Evidensen for aksjer er uklar fordi risikoforskjeller er vanskelige å kontrollere for. Prisreaksjoner på skatteendringer gir bedre støtte: Erickson og Maydew (1998) og Guenther (1994).",
"mer": "<ul><li>Erickson og Maydew (1998): forslag i 1995 om å kutte selskapers utbyttefradrag (DRD) fra 70 % til 50 % senket prisen på preferanseaksjer, men ikke på vanlige aksjer med høyt utbytte.<\/li><li>Guenther (1994): renten på statskasseveksler endret seg rundt skattekuttene i 1981 og 1986 som modellen forutsier.<\/li><li>Wilkie (1992): negativ sammenheng mellom skattesubsidier og før-skatt-avkastning, men svakere enn i en friksjonsfri økonomi.<\/li><li>Dhaliwal, Erickson og Trezevant (1999): når selskaper begynner å betale utbytte, flytter eierskapet fra privatpersoner til institusjoner (utbytteklienteller).<\/li><\/ul><p><b>Felle:<\/b> å påstå at implisitt skatt på aksjer er godt dokumentert.<\/p>",
"kilder": [
"SW s. 131–132"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-11",
"nivaa": "detalj",
"kan": "Forklare hvorfor uventede endringer i skattefordeler gir kapitalgevinster og tap",
"kort": "Med tilpasningskostnader i kapitalbeholdningen kapitaliseres en uventet liberalisering i prisen på eksisterende kapital (gevinst for eierne). Bortfall av et skatteskjold gir tap.",
"mer": "<p>Kunne kapitalen flyttes umiddelbart, ville priser på varer og tjenester justere seg og prisene på eksisterende kapital ville ikke endres. Gunstigere avskrivninger på utleiebygg øker tilbudet av utleieboliger, presser leieprisene ned og gjør at bruktprisene ikke stiger med hele nåverdien av skattebesparelsen. Samme logikk som obligasjonen i F10 lb 18 og boligen i F10 lb 20.<\/p><p><b>Felle:<\/b> å tro at hele skattefordelen alltid ender hos eieren. Noe går til kunder og leverandører.<\/p>",
"kilder": [
"SW s. 124–125",
"F10 lb 18",
"F10 lb 20"
],
"eksamen": []
},
{
"id": "f10-sw-implicit-taxes-12",
"nivaa": "detalj",
"kan": "Forklare skattearbitrasje og hvorfor den begrenses",
"kort": "Uten friksjoner og skatteregelrestriksjoner kunne man låne via det dårlig skattlagte og plassere i det gunstig skattlagte alternativet og fjerne all skatt. Restriksjoner og friksjoner hindrer dette.",
"mer": "<p>SW forutsetter perfekte markeder i første del av kapitlet: ingen transaksjonskostnader, lik informasjon og pristakere. Da er utjevning av risikojusterte etter-skatt-avkastninger en nødvendig likevektsbetingelse, ellers finnes arbitrasje. I praksis begrenses arbitrasjen av skatteregler (f.eks. begrensninger i rentefradrag og tapsfradrag) og friksjoner (meglerhonorar, informasjonskostnader). De to er delvis substitutter: jo dyrere det er å gjennomføre en strategi, desto færre regler trengs.<\/p><p><b>Felle:<\/b> å tro at likevekten krever at alle investorer har samme sats.<\/p>",
"kilder": [
"SW s. 119–120",
"SW s. 123"
],
"eksamen": []
}
]
},
{
"id": "f10-spareprodukter",
"forelesning": "F10 Skatt, aksjer og risikotaking",
"tittel": "Skatt og spareformer: banksparing, skattekreditt og pensjonssparing",
"eksamensvekt": 2,
"viktigst": [
"Banksparing: V<sub>1<\/sub> = Y[1 + r(1 − t)]<sup>n<\/sup>",
"Skattekreditt (ASK): V<sub>2<\/sub> = Y[(1 + r)<sup>n<\/sup>(1 − t) + t]",
"Pensjonssparing: V<sub>3<\/sub> = [Y/(1 − t)](1 + r)<sup>n<\/sup>(1 − t) = Y(1 + r)<sup>n<\/sup>",
"V<sub>1<\/sub> ≤ V<sub>2<\/sub> ≤ V<sub>3<\/sub> så lenge t er konstant",
"Talleksempel Y = 100, r = 8 %, t = 25 %, n = 5: 133,82, 135,20 og 146,93"
],
"punkter": [
{
"id": "f10-spareprodukter-01",
"nivaa": "kjerne",
"kan": "Regne verdien av banksparing med løpende skatt (V<sub>1<\/sub>)",
"kort": "V<sub>1<\/sub> = Y[1 + r(1 − t)]<sup>n<\/sup>. Med Y = 100, r = 8 %, t = 25 % og n = 5: 100 × 1,06<sup>5<\/sup> = 133,82.",
"mer": "<p>Renteinntekten skattlegges hvert år, så det er etter-skatt-renten r(1 − t) som renteres. Typisk for banksparing og obligasjoner med løpende rente og skattlegging. Effektiv årlig avkastning etter skatt er 6 %.<\/p><p><b>Felle:<\/b> å skrive Y(1 + r)<sup>n<\/sup>(1 − t). Det er formelen for en ordning der hele beløpet, også innskuddet, skattlegges ved slutten.<\/p>",
"kilder": [
"F10 lb 22–23",
"F10 lb 27"
],
"eksamen": []
},
{
"id": "f10-spareprodukter-02",
"nivaa": "kjerne",
"kan": "Regne verdien av sparing med skattekreditt (V<sub>2<\/sub>)",
"kort": "V<sub>2<\/sub> = Y(1 + r)<sup>n<\/sup> − t[Y(1 + r)<sup>n<\/sup> − Y] = Y[(1 + r)<sup>n<\/sup>(1 − t) + t]. Talleksempelet gir 100 × 1,08<sup>5<\/sup> × 0,75 + 25 = 135,20.",
"mer": "<p>Skatten på akkumulert avkastning betales først når kontrakten avsluttes (ASK-konto i forelesningen). Investoren får en skattekreditt, et rentefritt lån fra staten, inntil sparingen avsluttes. Innskuddet Y skattlegges ikke.<\/p><p><b>Kildefeil:<\/b> lysbildene 24 og 26 skriver «(1 − t) − t». Riktig er «+ t», som talleksempelet på lb 27 bruker (+ 25). Med «− t» blir svaret 85,20.<\/p><p><b>Felle:<\/b> å glemme å legge til t·Y.<\/p>",
"kilder": [
"F10 lb 24",
"F10 lb 26–27"
],
"eksamen": []
},
{
"id": "f10-spareprodukter-03",
"nivaa": "kjerne",
"kan": "Regne verdien av pensjonssparing med fradrag og skatt ved uttak (V<sub>3<\/sub>)",
"kort": "Fradraget gjør at man kan investere Y/(1 − t) for samme netto kostnad Y. V<sub>3<\/sub> = [Y/(1 − t)](1 + r)<sup>n<\/sup>(1 − t) = Y(1 + r)<sup>n<\/sup> = 146,93 i talleksempelet.",
"mer": "<p>Staten dekker en andel av innskuddet gjennom fradraget. Ved uttak skattlegges hele beløpet: innskuddet (som ga fradrag) pluss avkastningen. Med lik sats ved innskudd og uttak kansellerer (1 − t) og investoren får før-skatt-avkastningen: ordningen er fullt skattenøytral. Effektiv årlig avkastning 8 %.<\/p><p><b>Felle:<\/b> å regne Y(1 + r)<sup>n<\/sup>(1 − t) = 110,20. Da har du glemt at fradraget lar deg investere 133,33, ikke 100.<\/p>",
"kilder": [
"F10 lb 25",
"F10 lb 27"
],
"eksamen": []
},
{
"id": "f10-spareprodukter-04",
"nivaa": "kjerne",
"kan": "Rangere de tre spareformene og vite forutsetningen",
"kort": "V<sub>1<\/sub> ≤ V<sub>2<\/sub> ≤ V<sub>3<\/sub>: skattekreditt slår løpende skatt og fradrag pluss kreditt slår bare kreditt, så lenge t er konstant over tid.",
"mer": "<p>V<sub>2<\/sub> &gt; V<sub>1<\/sub> fordi utsatt skatt er et rentefritt lån fra staten. V<sub>3<\/sub> &gt; V<sub>2<\/sub> fordi også innskuddet gir fradrag, slik at hele avkastningen blir skattefri. Samme logikk lå bak H2024 o13b: IPS gir mulighet til å utsette skatt og kan ses som et rentefritt lån fra staten, i tillegg til fritak for formuesskatt. H2018 o7c: fordelen ved IPS er utsatt skatt (fradrag ved innskudd, skatt ved uttak) og ingen formuesskatt.<\/p><p><b>Felle:<\/b> å glemme forbeholdet «så lenge t er konstant».<\/p>",
"kilder": [
"F10 lb 26–27"
],
"eksamen": [
"H2024 o13b",
"H2018 o7c"
]
},
{
"id": "f10-spareprodukter-05",
"nivaa": "viktig",
"kan": "Regne effektiv årlig avkastning for de tre spareformene",
"kort": "Med r = 8 % og t = 25 %: banksparing 6,00 %, skattekreditt 6,22 % og pensjonssparing 8,00 % per år etter skatt (n = 5).",
"mer": "<p>Regn (V/Y)<sup>1/n<\/sup> − 1: 1,3382<sup>1/5<\/sup> − 1 = 6,00 %, 1,3520<sup>1/5<\/sup> − 1 = 6,22 % og 1,4693<sup>1/5<\/sup> − 1 = 8,00 %. Fordelen ved skattekreditt øker med tidshorisonten fordi den utsatte skatten renteres lenger. Pensjonsløsningen gir før-skatt-avkastningen uansett horisont når satsen er konstant.<\/p><p><b>Felle:<\/b> å tro at skattekreditt gir samme gevinst som fradrag. Kreditten utsetter bare skatten, fradraget fjerner den reelt.<\/p>",
"kilder": [
"F10 lb 27"
],
"eksamen": []
},
{
"id": "f10-spareprodukter-06",
"nivaa": "viktig",
"kan": "Regne pensjonssparing når skattesatsen endres over tid",
"kort": "V<sub>3<\/sub> = [Y/(1 − t<sub>1<\/sub>)](1 + r)<sup>n<\/sup>(1 − t<sub>n<\/sub>). Lavere sats ved uttak enn ved innskudd øker verdien, høyere sats senker den og rangeringen blir uklar.",
"mer": "<p><b>Eksempel:<\/b> Y = 100, r = 8 %, n = 5, fradrag til t<sub>1<\/sub> = 40 %. Uttak med t<sub>n<\/sub> = 30 %: 100/0,6 × 1,4693 × 0,7 = 171,42. Uttak med t<sub>n<\/sub> = 50 %: 122,44, lavere enn banksparing med 40 % løpende skatt (100 × 1,048<sup>5<\/sup> = 126,42).<\/p><p>Lysbildet ligger bare i den eldre versjonen av forelesningen, men følger direkte av V<sub>3<\/sub>-formelen og av SWs ligning for investering med fradrag.<\/p><p><b>Felle:<\/b> å anta at pensjonssparing alltid er best.<\/p>",
"kilder": [
"Gml. F9 lb 20",
"SW s. 123"
],
"eksamen": []
},
{
"id": "f10-spareprodukter-07",
"nivaa": "detalj",
"kan": "Koble de tre formlene til norske spareprodukter",
"kort": "V<sub>1<\/sub> er banksparing og obligasjoner med løpende skatt, V<sub>2<\/sub> er sparing med skatteutsettelse (ASK) og V<sub>3<\/sub> er pensjonssparing med fradrag (IPS).",
"mer": "<p>Forelesningen bruker ASK-konto som eksempel på investering 2 og pensjonssparing på investering 3. I Kvadsheims gjennomgang gir IPS fradrag i alminnelig inntekt og beskatning til 22 % ved uttak (skattesymmetri), uten formuesskatt underveis. Merk at ASK i praksis har skjermingsfradrag og oppjustering ved uttak, noe den enkle V<sub>2<\/sub>-formelen ikke fanger opp.<\/p><p><b>Felle:<\/b> å plassere ASK under V<sub>3<\/sub>. ASK gir ikke fradrag for innskuddet.<\/p>",
"kilder": [
"F10 lb 22",
"Kvadsheim lb 36",
"Kvadsheim lb 51"
],
"eksamen": []
}
],
"kildenotat": "F10 Skatt, aksjer og risikotaking (appendiks)"
},
{
"id": "f10-sandmo-as2",
"forelesning": "F10 Skatt, aksjer og risikotaking",
"tittel": "AS2 Sandmo: Differential taxation and the encouragement of risk-taking",
"eksamensvekt": 1,
"viktigst": [
"Med mange risikable aktiva: ∂a<sub>j<\/sub>/∂t = a<sub>j<\/sub>/(1 − t) for alle j, alle beholdninger øker i samme prosent",
"Ingen substitusjon fra mindre til mer risikable aktiva: sammensetningen av den risikable porteføljen er uendret",
"Det svekker tolkningen av staten som «sleeping partner» som oppmuntrer til risiko",
"Resultatet holder også uten et sikkert aktivum: det handler om differensiert beskatning mot en referanseavkastning"
],
"punkter": [
{
"id": "f10-sandmo-as2-01",
"nivaa": "kjerne",
"kan": "Gjengi Sandmos hovedresultat med mange risikable aktiva",
"kort": "Når meravkastningen x<sub>j<\/sub> − x<sub>0<\/sub> skattlegges med t, gir økt t at alle risikable beholdninger øker i samme prosent: ∂a<sub>j<\/sub>/∂t = a<sub>j<\/sub>/(1 − t).",
"mer": "<p>Modellen: Y = A(1 + x<sub>0<\/sub>) + Σ a<sub>j<\/sub>(x<sub>j<\/sub> − x<sub>0<\/sub>)(1 − t), førsteordensbetingelser E[U′(Y)(x<sub>i<\/sub> − x<sub>0<\/sub>)] = 0 for alle i. Løsningen er at skatteelastisiteten t/(1 − t) er lik for alle aktiva og bare avhenger av skattesatsen. Resultatet krever ingen antakelse om nyttefunksjonens form eller om den simultane fordelingen av avkastningene.<\/p><p><b>Felle:<\/b> å tro at de mest risikable aktivaene øker mest. Alle øker proporsjonalt.<\/p>",
"kilder": [
"AS2 s. 57–58"
],
"eksamen": []
},
{
"id": "f10-sandmo-as2-02",
"nivaa": "kjerne",
"kan": "Forklare hvorfor resultatet svekker risikodelingstolkningen",
"kort": "Hvis staten som «sleeping partner» oppmuntret til risiko, skulle økt skatt flytte porteføljen fra lavrisiko til høyrisiko. Men sammensetningen er uendret og et nesten risikofritt aktivum oppmuntres like mye som et svært risikabelt.",
"mer": "<p>Substitusjonen skjer bort fra det sikre aktivumet, ikke innad i den risikable porteføljen. Sandmo konkluderer med at tolkningsbyrden hviler tungt på antakelsen om at det finnes et helt sikkert aktivum. Den vanlige konklusjonen om at kapitalbeskatning oppmuntrer til risikotaking må derfor tolkes med forsiktighet.<\/p><p><b>Felle:<\/b> «skatt med tapsfradrag gir en generell vridning mot de mest risikable prosjektene». Det er nettopp det Sandmo viser at ikke skjer.<\/p>",
"kilder": [
"AS2 s. 58",
"AS2 s. 59 (konklusjon)"
],
"eksamen": []
},
{
"id": "f10-sandmo-as2-03",
"nivaa": "viktig",
"kan": "Forklare hva som skjer når det ikke finnes et sikkert aktivum",
"kort": "Resultatet i ligning (8) holder fortsatt. Skatten oppmuntrer investering i de aktivaene hvis avkastning relativt til referanseavkastningen x<sub>0<\/sub> beskattes, også om det skattlagte aktivumet er det minst risikable.",
"mer": "<p>Sandmos eksempel: et relativt sikkert og et relativt risikabelt aktivum, skatt på differansen. Er det a<sub>0<\/sub> som svinger mest, blir investoren skattlagt i det «dårlige» utfallet og subsidiert i det «gode». Skatten øker først porteføljens risiko og investoren svarer med å øke det relativt sikre aktivumet. Mønsteret er det samme som i grunnmodellen. Resultatet handler altså om <i>differensiert<\/i> beskatning: investoren replikerer fordelingen ved å øke aktivaene som skatten treffer.<\/p><p><b>Felle:<\/b> å lese AS2 som at skatt alltid gir mer risiko.<\/p>",
"kilder": [
"AS2 s. 58–59"
],
"eksamen": []
},
{
"id": "f10-sandmo-as2-04",
"nivaa": "viktig",
"kan": "Forklare tilfellet der bare avkastning over den sikre renten beskattes",
"kort": "Med skattegrunnlag a<sub>1<\/sub>(x<sub>1<\/sub> − x<sub>0<\/sub>) blir Y = A(1 + x<sub>0<\/sub>) + a<sub>1<\/sub>(x<sub>1<\/sub> − x<sub>0<\/sub>)(1 − t) og ∂a<sub>1<\/sub>/∂t = a<sub>1<\/sub>/(1 − t) holder. Tolkning: kapitalinntektsskatt med rentefradrag.",
"mer": "<p>Beskattes sikker og risikabel avkastning med samme sats og x<sub>0<\/sub> &gt; 0, kommer en formueseffekt i tillegg og totaleffekten blir tvetydig (Sandmo 1977, 1985). Formueseffekten virker som en rundsumskatt og er allokeringsmessig nøytral. For politikkvurdering er det substitusjonseffekten som er interessant og den er den samme som i grunnmodellen.<\/p><p><b>Felle:<\/b> å blande dette tilfellet med F10 lb 13, der hele avkastningen beskattes og fortegnet er ubestemt.<\/p>",
"kilder": [
"AS2 s. 57",
"F10 lb 13"
],
"eksamen": []
},
{
"id": "f10-sandmo-as2-05",
"nivaa": "viktig",
"kan": "Vite at responsen er en ren substitusjonseffekt med uendret forventet nytte",
"kort": "∂E[U]/∂t = E[U′(Y)x<sub>1<\/sub>]·(∂a<sub>1<\/sub>/∂t)(1 − t) − E[U′(Y)x<sub>1<\/sub>]·a<sub>1<\/sub> = 0 i optimum. Forventet nytte er uavhengig av skattesatsen.",
"mer": "<p>Sandmo viser i tillegg at selv om investoren ikke er i optimum, holder responsen i ligning (4) forventet nytte konstant. Grunnen er at hele sannsynlighetsfordelingen for sluttformuen er uendret. Siden forventet nytte bare er én måte å rangere fordelinger på, er resultatet naturlig: samme fordeling gir samme nytte.<\/p><p><b>Felle:<\/b> å tro at skatteøkningen gjør investoren dårligere stilt i modellen. Med x<sub>0<\/sub> = 0 og fullt tapsfradrag gjør den ikke det.<\/p>",
"kilder": [
"AS2 s. 56–57"
],
"eksamen": []
},
{
"id": "f10-sandmo-as2-06",
"nivaa": "detalj",
"kan": "Kjenne Sandmos konklusjon og eksemplet med oljeselskapene",
"kort": "Sandmo forkaster ikke standardresultatet, men sier at påstanden om at kapitalbeskatning oppmuntrer til risikotaking må tolkes med forsiktighet, f.eks. argumentet om at høy marginalskatt får oljeselskaper til å velge mer risikable prosjekter.",
"mer": "<p>I innledningen nevner Sandmo at det i Norge har vært vanlig å hevde at høy marginalskatt på oljeselskapenes overskudd oppmuntrer til mer risikable prosjekter. Konklusjonen: resultatet generaliserer til mange risikable aktiva, men fordi alle risikable beholdninger øker likt og fordi resultatet ikke avhenger av at det finnes et sikkert aktivum, bør vi være klar over begrensningene. Alle resultatene forutsetter fullt tapsfradrag (fotnote 6).<\/p><p><b>Felle:<\/b> å svare at Sandmo mener skatt reduserer risikotaking.<\/p>",
"kilder": [
"AS2 s. 55",
"AS2 s. 59"
],
"eksamen": []
}
]
},
{
"id": "f10-risikojustering",
"forelesning": "F10 Skatt, aksjer og risikotaking",
"tittel": "Risikojustering: aksje mot statsobligasjon, Sharpe, CE og CAPM",
"eksamensvekt": 1,
"viktigst": [
"Eksempelet: r<sub>f<\/sub> = 4 %, E[r] = 10 %, σ = 20 %",
"Sharpe = (E[r] − r<sub>f<\/sub>)/σ = 0,3",
"CE = E[r] − ½Aσ<sup>2<\/sup>: 4 % med A = 3 og 8 % med A = 1",
"CAPM: E[r] = r<sub>f<\/sub> + β(r<sub>m<\/sub> − r<sub>f<\/sub>) = 11,2 % med β = 1,2",
"Etter skatt: obligasjon 3,12 %, aksjegevinst 6,2 %"
],
"punkter": [
{
"id": "f10-risikojustering-01",
"nivaa": "viktig",
"kan": "Regne risikopremien og valget til en risikonøytral investor",
"kort": "Risikopremie = E[r] − r<sub>f<\/sub> = 10 % − 4 % = 6 %. En risikonøytral investor velger aksjen fordi E[r] > r<sub>f<\/sub>.",
"mer": "<p>Investoren vurderer en statsobligasjon med fast r<sub>f<\/sub> = 4 % og en aksje med forventet avkastning 10 % (kursstigning eller utbytte) og standardavvik 20 %. Forelesningen nevner fire måter å risikojustere på: forventet avkastning og risikopremie, sikkerhetsekvivalent (CE), Sharpe-ratio og CAPM.<\/p><p><b>Felle:<\/b> å bruke risikopremien til å avgjøre valget for en risikoavers investor. Den ser bort fra risikoen.<\/p>",
"kilder": [
"F10 lb 29–31"
],
"eksamen": []
},
{
"id": "f10-risikojustering-02",
"nivaa": "viktig",
"kan": "Regne og tolke Sharpe-ratioen",
"kort": "Sharpe = (E[r] − r<sub>f<\/sub>)/σ = (10 % − 4 %)/20 % = 0,3. 0–1 moderat, 1–2 god og over 2 svært god risikojustert avkastning.",
"mer": "<p>Sharpe måler meravkastning over risikofri rente per enhet risiko (standardavvik). En Sharpe på 0,3 er bare litt over risikofri avkastning: en investor som er villig til å ta noe risiko vil kanskje velge aksjen, men en moderat risikoavers investor vil foretrekke obligasjonen.<\/p><p><b>Felle:<\/b> å dele på variansen (0,04) i stedet for standardavviket (0,20). Da får du 1,5.<\/p>",
"kilder": [
"F10 lb 32",
"F10 lb 36"
],
"eksamen": []
},
{
"id": "f10-risikojustering-03",
"nivaa": "viktig",
"kan": "Regne sikkerhetsekvivalenten CE",
"kort": "CE = E[r] − ½Aσ<sup>2<\/sup>. Med A = 3 blir CE = 0,10 − ½ × 3 × 0,04 = 4 %, med A = 1 blir den 8 %.",
"mer": "<p>CE er den sikre avkastningen investoren ville akseptere i stedet for den usikre. A er en subjektiv risikoaversjonskoeffisient. Metoden passer for risikoaverse investorer der varians er et godt risikomål. Med A = 3 er CE lik r<sub>f<\/sub> = 4 % og lysbildet konkluderer at investoren foretrekker den garanterte avkastningen. Strengt tatt er hun da likegyldig. Med A = 1 er CE = 8 % &gt; 4 % og hun velger aksjen.<\/p><p><b>Felle:<\/b> å bruke σ = 0,2 i stedet for σ<sup>2<\/sup> = 0,04.<\/p>",
"kilder": [
"F10 lb 33–34"
],
"eksamen": []
},
{
"id": "f10-risikojustering-04",
"nivaa": "viktig",
"kan": "Regne forventet avkastning med CAPM",
"kort": "E[r] = r<sub>f<\/sub> + β(r<sub>m<\/sub> − r<sub>f<\/sub>) = 0,04 + 1,2 × (0,10 − 0,04) = 11,2 %. β = 1,2 betyr at aksjen svinger 20 % mer enn markedet.",
"mer": "<p>CAPM gir påkrevd avkastning ut fra systematisk risiko. Påkrevd 11,2 % er høyere enn aksjens forventede 10 %, så aksjen er trolig overvurdert (lysbildets formulering er tung, men poenget er dette). Oppsummering på lb 36: CAPM er en objektiv, markedsbasert vurdering, CE er subjektiv for en bestemt investor. Lysbildet sammenligner CE (4 %) med CAPM (11,2 %) og konkluderer at investoren velger obligasjonen.<\/p><p><b>Felle:<\/b> å gange β med r<sub>m<\/sub> i stedet for med risikopremien.<\/p>",
"kilder": [
"F10 lb 35–36"
],
"eksamen": []
},
{
"id": "f10-risikojustering-05",
"nivaa": "viktig",
"kan": "Regne avkastning etter skatt for obligasjon og aksjegevinst",
"kort": "Obligasjon: 4 % × (1 − 0,22) = 3,12 %, aksjegevinst: 10 % × (1 − 0,3784) = 6,2 %. Skattesystemet favoriserer renteinntekt relativt sett.",
"mer": "<p>Renter skattlegges med 22 %, aksjegevinster effektivt med 37,84 % (22 % × 1,72) når man ser bort fra skjerming. Avkastningen på obligasjonen reduseres derfor relativt mindre enn på aksjen og det forsterker valget av obligasjonen når investeringene risikojusteres. Poenget på lysbildet: vi burde ha brukt størrelser etter skatt når vi risikojusterte.<\/p><p><b>Felle:<\/b> å bruke 22 % på aksjegevinsten for personlige investorer.<\/p>",
"kilder": [
"F10 lb 37"
],
"eksamen": []
}
],
"kildenotat": "F10 Skatt, aksjer og risikotaking (appendiks)"
},
{
"id": "f11-definisjon",
"forelesning": "F11 Skatteparadiser",
"tittel": "Hva et skatteparadis er og hvordan forretningsmodellen virker",
"eksamensvekt": 1,
"viktigst": [
"Tax avoidance = lovlig skatteplanlegging. Tax evasion = ulovlig skatteunndragelse",
"Ingen offisiell definisjon. GS1: tre kjennetegn er inngjerdet lov- og skattesystem, regler som sikrer skattemessig hjemsted og hemmelighold med svakt tilsyn",
"Kjernen i lovgivningen er å skape privat informasjon (hemmelighold) for brukerne",
"Forretningsmodell: gebyrer i stedet for skatt og spesialisering (Cayman fond, BVI skallselskaper, Nederland og Irland gjennomstrømning)",
"Revealed preference: var lovgivningen vekstfremmende, ville paradiset brukt den på lokal virksomhet"
],
"punkter": [
{
"id": "f11-definisjon-01",
"nivaa": "kjerne",
"kan": "Skille mellom tax avoidance og tax evasion",
"kort": "Tax avoidance er skatteplanlegging innenfor loven. Tax evasion er skatteunndragelse og ulovlig.",
"mer": "<p>Skatteparadis brukes til begge deler. Skjulte bankkonti er unndragelse (ulovlig). Holdingselskaper som utsetter skatt i hjemlandet, gir skattefrie gevinster og styrer finansiering, er planlegging (lovlig). GS1 påpeker at aggressiv planlegging kan krysse grensen til unndragelse og at grensen blir enda tynnere når informasjon kan skjules i paradiset.<\/p><p><b>Felle:<\/b> å oversette «avoidance» med unndragelse. Unndragelse er «evasion».<\/p>",
"kilder": [
"F11 lb 2",
"GS1 s. 169–170"
],
"eksamen": []
},
{
"id": "f11-definisjon-02",
"nivaa": "kjerne",
"kan": "Gjengi GS1s tre kjennetegn som skiller skatteparadis fra lavskatteland",
"kort": "(1) Et inngjerdet (ring-fenced) lov- og skattesystem, (2) et særskilt regime som sikrer skattemessig hjemsted for skattefrie selskaper og (3) privat informasjon (hemmelighold) og mangel på effektivt tilsyn.",
"mer": "<p>Mange land har lave skatter på enkelte aktiviteter, men det gjør dem ikke til skatteparadis. Det er kombinasjonen av de tre trekkene som gjør paradisene attraktive. Hovedpoenget i GS1: kjernen i lovgivningen er å skape privat informasjon for brukerne. Det gir moralsk hasard og transaksjonskostnader i andre land.<\/p><p><b>Felle:<\/b> å definere skatteparadis bare som «land med lav skatt». SS nevner i tillegg tre elementer fra litteraturen: lave skatter, finansielt hemmelighold og lave selskapsreguleringer, pluss inngjerding.<\/p>",
"kilder": [
"GS1 s. 171",
"SS s. 243"
],
"eksamen": []
},
{
"id": "f11-definisjon-03",
"nivaa": "kjerne",
"kan": "Forklare inngjerding (ring-fencing)",
"kort": "Paradiset har to sett regler: svært gunstige regler for utenlandske investorer uten aktivitet der og vanlige regler og skatt for dem som bor og driver der. Det gunstige regimet krever ofte at man ikke bor der, ikke driver virksomhet der og ikke bruker lokal valuta.",
"mer": "<p>Selskapene i det gunstige regimet kalles ofte «exempted companies» eller «international business companies». De må investere i andre land, derav begrepene skallselskap og postkasseselskap. Også vanlige stater kan ha inngjerdede ordninger, men de skal trekke investeringer <i>til<\/i> landet. I paradiset er reglene laget for holdingselskaper som investerer <i>andre steder<\/i>. Skattesvik er straffbart for innbyggerne, men ikke for utenlandske investorer som ikke betaler skatt der.<\/p><p><b>Felle:<\/b> å tro at paradisets egne innbyggere slipper skatt.<\/p>",
"kilder": [
"F11 lb 6",
"F11 REV lb 8",
"GS1 s. 171–172"
],
"eksamen": []
},
{
"id": "f11-definisjon-04",
"nivaa": "kjerne",
"kan": "Forklare revealed preference-argumentet",
"kort": "Hvis den inngjerdede lovgivningen var vekstfremmende, ville paradiset latt den gjelde for all virksomhet, også lokal. At det ikke skjer, avslører at paradiset selv ser lovgivningen som skadelig.",
"mer": "<p>Lovgivningen er rettet mot personer bosatt i andre land og skal skape inntekter til paradiset på bekostning av andre land. Fordi selskapene ikke får operere lokalt, oppstår skadevirkningene i andre stater, mens paradiset beholder gebyrinntektene. SS bruker samme argument mot påstanden om at paradisene tilbyr et «godt juridisk rammeverk»: hvorfor får ikke de lokale bruke det?<\/p><p><b>Felle:<\/b> å bruke argumentet til å si at paradisene er gode for vekst.<\/p>",
"kilder": [
"F11 REV lb 8",
"Gml. F10 Skatteparadis lb 8",
"GS1 s. 179",
"SS s. 253"
],
"eksamen": []
},
{
"id": "f11-definisjon-05",
"nivaa": "viktig",
"kan": "Vite at det ikke finnes en offisiell definisjon og hvorfor",
"kort": "IMF og OECD hadde tidligere lister, men gikk bort fra dem av politiske grunner fordi medlemslandene har vetorett. Frivillige organisasjoner (Oxfam, Tax Justice Network) lager egne lister.",
"mer": "<p>Synonymer: «secrecy jurisdiction» og «Offshore Financial Centre» (OFC). Et skatteparadis kan være et land eller et område med selvråderett i skattespørsmål: Jersey, Guernsey og amerikanske delstater som Delaware og Nevada. Selvstendige stater som forbindes med betegnelsen: Mauritius, Sveits, Luxembourg, Monaco, Liechtenstein, Panama, Caymanøyene, Jomfruøyene, Dubai. GS1: Tax Justice Network har pekt på Storbritannia som den viktigste aktøren via sitt nettverk av paradiser og Delaware toppet en liste over hemmelighetsfulle paradiser i 2012.<\/p><p><b>Felle:<\/b> at OECD har en offisiell liste som avgjør spørsmålet.<\/p>",
"kilder": [
"F11 lb 2–3",
"F11 REV lb 4–5",
"GS1 s. 168–169"
],
"eksamen": []
},
{
"id": "f11-definisjon-06",
"nivaa": "viktig",
"kan": "Gjengi de tre komponentene i sekretesselovgivningen",
"kort": "(1) Rettsregler: banksekretesse med straffansvar for ansatte som røper kundeforhold, (2) skjulte eierstrukturer: stråmenn, truster og stiftelser uten register over reelle eiere og (3) ingen informasjonsutveksling.",
"mer": "<p>Sekretesse er rettslige, institusjonelle og administrative ordninger som gjør at opplysninger om eierskap, kontroll, formue og inntekt ikke er tilgjengelige for andre lands skattemyndigheter. Paradisene tillater bruk av andre lands selskapssuffikser (ANS, GmbH, Ltd) for å skjule tilhørighet. Sekretessen senker oppdagelsesrisikoen og paradisene tjener penger på gebyrer i bytte mot nullskattevilkår. Taushetsplikten skjermer mot offentligheten og sekretessen skjermer også mot myndighetene i paradiset selv.<\/p><p><b>Felle:<\/b> å tro at sekretessen bare gjelder banker.<\/p>",
"kilder": [
"F11 lb 8–9"
],
"eksamen": []
},
{
"id": "f11-definisjon-07",
"nivaa": "viktig",
"kan": "Forklare forretningsmodellen: gebyrer i stedet for skatt og spesialisering",
"kort": "Paradisene tjener på registreringsavgifter, årlige avgifter, avgifter for bankkonto og for lokale styremedlemmer. De skjermer seg mot konkurranse ved å spesialisere seg: Cayman på fond, BVI på skallselskaper og Nederland og Irland som gjennomstrømningsland.",
"mer": "<p>Ilegger paradiset skatt, kan utenlandske investorer ofte søke om fritak og søknadene innvilges i de fleste tilfeller. Små land som De britiske jomfruøyene og Caymanøyene har så liten befolkning at gebyrene utgjør en stor del av BNP. GS1: i Jersey kommer om lag 50 % av BNP fra finanssektoren og tjenester til utenlandske investorer. Hines (2010): paradisene er små, de fleste er øyer, nesten alle har under 1 million innbyggere og over gjennomsnittlig inntekt. De har anglosaksisk rett med sterk investorbeskyttelse og engelsk som forretningsspråk.<\/p><p><b>Felle:<\/b> at paradisene lever av skatteinntekter fra selskapene.<\/p>",
"kilder": [
"F11 lb 5",
"F11 REV lb 6",
"F11 REV lb 11",
"GS1 s. 178"
],
"eksamen": []
},
{
"id": "f11-definisjon-08",
"nivaa": "viktig",
"kan": "Regne med tallene for De britiske jomfruøyene (BVI)",
"kort": "2021: 31 000 innbyggere og 900 000 offshoreselskaper (Norge under 250 000). Avgiftene ga rundt 30 000 dollar per innbygger i 2023, om lag 62 % av BNP per innbygger på 48 200 dollar.",
"mer": "<p>Avgifter 2023: 550 dollar for selskaper med under 50 000 aksjer, 1 350 dollar over 50 000 aksjer, 50 dollar per styremedlem og 350 dollar for «good standing certificate», som trengs for å åpne bankkonto. GS1 (2012): 830 000 selskaper og om lag 31 000 innbyggere, i snitt 27 styreverv per innbygger. Norge hadde om lag 270 000 aksjeselskaper og 0,05 styreverv per innbygger, så en BVI-borger hadde 540 ganger så mange styreverv som en nordmann.<\/p><p><b>Felle:<\/b> å blande årstallene: 830 000 er 2012 (GS1), 900 000 er 2021 (lysbildet).<\/p>",
"kilder": [
"F11 REV lb 12",
"GS1 s. 175"
],
"eksamen": []
},
{
"id": "f11-definisjon-09",
"nivaa": "viktig",
"kan": "Forklare skattemessig hjemsted og bruken av stråmenn",
"kort": "Selskaper er normalt skattemessig hjemmehørende der «central management and control» utøves. Siden lokal virksomhet er forbudt, sikres hjemstedet ved at lokale innbyggere sitter i styret, ofte som stråmenn instruert fra andre land.",
"mer": "<ul><li>«Sark Lark»: Phil Crowshaw på Sark leide ut navnet sitt til 3 378 selskaper for 50–400 pund hver.<\/li><li>Panama Papers (2016): Carmen Wong, George Allen og Jaqueline Alexander var styremedlemmer i 4 000 selskaper som DNB hadde satt opp på Seychellene, tilsvarende 11 styremøter hver dag.<\/li><li>Udaterte oppsigelsesbrev og generalfullmakter og aksjeselskaper eller truster som styremedlemmer.<\/li><\/ul><p>Hvor beslutningene egentlig tas, er privat informasjon. Andre land må bruke ressurser på å avdekke det (intern rett eller CFC-regler).<\/p><p><b>Felle:<\/b> at registrering alene gir skattemessig hjemsted. GS1: «Incorporation only does not guarantee tax domicile».<\/p>",
"kilder": [
"F11 REV lb 13",
"F11 REV lb 16",
"F11 REV lb 22",
"GS1 s. 174–175"
],
"eksamen": []
},
{
"id": "f11-definisjon-10",
"nivaa": "viktig",
"kan": "Beskrive Mauritius' GBC1- og GBC2-selskaper",
"kort": "GBC1: selskapsskatt 15 %, men automatisk utenlandsk skattekreditt på 80 % uansett om skatt er betalt ute, så nominell sats blir 3 % (i praksis ingen skatt). GBC2: 0 % skatt, ingen revisjon og regnskapene er ikke offentlige.",
"mer": "<p>Selskapene er bare tilgjengelige for ikke-bosatte, kan ikke bruke lokal valuta og må drive virksomheten et annet sted. GBC1 må ha lokale styremedlemmer for å bli skattemessig hjemmehørende. Reelle eiere oppgis ikke og aksjer kan holdes av nominees. Mauritius tillater også «protected cell companies» som deler eiendeler i celler og beskytter dem mot innsyn og beslag. Verken innbyggere eller ikke-bosatte betaler kapitalgevinstskatt, arveskatt eller formuesskatt.<\/p><p><b>Felle:<\/b> at kreditten forutsetter betalt skatt i utlandet. I vanlige land gjør den det, på Mauritius ikke.<\/p>",
"kilder": [
"GS1 s. 172–173"
],
"eksamen": []
},
{
"id": "f11-definisjon-11",
"nivaa": "viktig",
"kan": "Beskrive Jerseys skattesystem før og etter 2008 og 0/10/20-systemet",
"kort": "Før 2008 var selskapsskatten 20 %, men utenlandskeide selskaper uten aktivitet kunne betale 200–600 pund og bli skattefrie. Etter reformen 3. juni 2008: 0 % som standard, 10 % for finansielle tjenester og 20 % for forsyningsselskaper og inntekt fra eiendom på Jersey.",
"mer": "<p>Den generelle 0 %-satsen skulle hindre diskriminering mellom innenlandsk og utenlandsk eide selskaper, slik at Jersey ikke ble rammet av EUs Code of Conduct on Business Taxation. Forelesningen kaller det «activity-based differentiation» snarere enn klassisk inngjerding: de mobile skattegrunnlagene har 0 %, mens viktige lokale virksomheter betaler skatt. Aksjonærer bosatt på Jersey skattlegges med 20 %, så de er mindre ønsket. Unoterte selskaper med 0 % trenger verken regnskap eller revisjon.<\/p><p><b>Felle:<\/b> å tro at reformen avskaffet inngjerdingen. Den ble bare utformet annerledes.<\/p>",
"kilder": [
"F11 lb 19",
"GS1 s. 173"
],
"eksamen": []
},
{
"id": "f11-definisjon-12",
"nivaa": "viktig",
"kan": "Sammenligne skatteparadis med vanlige stater",
"kort": "Skatteparadis: inngjerdet lovgivning, selskapsregistre uten regnskap, ingen revisjon og svak kontroll av regeletterlevelse. Vanlige stater: like regler for alle, offentlige registre med regnskap, regnskapsplikt og revisjon og straff for regelbrudd.",
"mer": "<p>Paradisene trenger ikke tilsyn med selskapene til utenlandske investorer, fordi selskapene ikke driver lokalt og ikke betaler skatt. Derfor er aksjonærlister ofte ikke ajourført, innleverte opplysninger sjekkes i liten grad og det kan være påbud om revisjon uten kontroll av at den er gjennomført. Aksjeselskaper kan være styremedlemmer i andre aksjeselskaper og truster kan eie selskaper og sitte i styrer. GS1: i vanlige stater overvåkes favoriserte næringer for at privilegiene ikke skal smitte over. I paradisene er det motsatt.<\/p><p><b>Felle:<\/b> å tro at mangelen på tilsyn skyldes dårlig administrasjon. Den følger av forretningsmodellen.<\/p>",
"kilder": [
"F11 REV lb 7",
"F11 REV lb 9",
"GS1 s. 176"
],
"eksamen": []
},
{
"id": "f11-definisjon-13",
"nivaa": "detalj",
"kan": "Kjenne eksemplet med Juris Ltd og Oljefondet",
"kort": "I 2012 kjøpte Oljefondet aksjer for 1,8 mrd. kr i Delta Topco Ltd, som eier Formel 1. Aksjene ble «held in trust» av Juris Ltd på Jersey, et selskap amerikanske granskere knyttet til Enron-skandalen.",
"mer": "<p>Delta Topco var unotert, så kjøpet brøt fondets regler. DNs journalister reiste til Jersey og fant at det ikke var mulig å fastslå om Juris Ltd hadde styre, at det ikke fantes regnskaper eller kontaktperson, at et tilretteleggerselskap (State Street Services Jersey Ltd) sto som eier og at det var uklart om Juris Ltd faktisk holdt aksjene for Oljefondet. Selskapsregisteret viste bare aksjekapital og antall aksjer.<\/p><p><b>Avvik:<\/b> GS1 skriver 2013 og «Jura Ltd». Forelesningen skriver 2012 og Juris Ltd. Bruk forelesningen.<\/p>",
"kilder": [
"F11 lb 20–22",
"GS1 s. 180"
],
"eksamen": []
},
{
"id": "f11-definisjon-14",
"nivaa": "detalj",
"kan": "Kjenne eksemplene Ugland House, Delaware, Kypros og Scheherazade",
"kort": "Ugland House på Cayman huset 12 748 selskaper (Obama, 2008), Delaware-LLC-er betaler 100 dollar i året uten register over reelle eiere og Kypros' register var 10 år på etterskudd (DN 2012). Superyachten Scheherazade var registrert på Cayman og eid via et selskap på Marshalløyene.",
"mer": "<ul><li>Obama: «Either this is the largest building in the world or the largest tax scam». Blant selskapene var Coca Cola og Intel, uten aktivitet på Cayman.<\/li><li>Delaware: kontor, sekretær og ett styremedlem (kan være et selskap), møter hvor som helst, minimalt offentlig register.<\/li><li>Kypros (EU-medlem): DN måtte få rettsordre for innsyn i et register som skal være åpent, innleverte dokumenter ble ikke kontrollert og regelbrudd ga ingen straff.<\/li><li>Scheherazade (2022): eid av Bielor Asset Limited på Marshalløyene. Den formelle eieren Eduard Khudainatov antas å være stråmann for Putin.<\/li><\/ul><p><b>Felle:<\/b> å tro at EU-medlemskap sikrer etterlevelse.<\/p>",
"kilder": [
"F11 lb 7",
"F11 lb 16",
"F11 lb 18",
"GS1 s. 174",
"GS1 s. 176"
],
"eksamen": []
},
{
"id": "f11-definisjon-15",
"nivaa": "detalj",
"kan": "Forklare hvordan truster brukes til å skjule eierskap",
"kort": "En trust er en samling eiendeler som stifteren (settlor) gir fra seg til fordel for andre (beneficiaries), forvaltet av trustees. I paradisene kan stifteren late som eiendelene er gitt bort og likevel kontrollere dem.",
"mer": "<p>I paradisene og mange land med engelsk rett er en trust en privat avtale som verken offentligheten eller skattemyndighetene kjenner til. Regler mot misbruk håndheves ikke fordi brukerne ikke bor eller skatter der. Liechtenstein har et offentlig register, men man kan unngå registrering ved å deponere trustdokumentet. Truster kan eie selskaper og sitte i styrer og selskapet opptrer da reelt eierløst. SS: Norge tillater ikke truster.<\/p><p><b>Felle:<\/b> at trustregistre i paradisene gir innsyn. De er frivillige, gjelder bare lokale eller er lukket.<\/p>",
"kilder": [
"GS1 s. 177–178",
"F11 REV lb 9",
"SS s. 245",
"SS s. 248"
],
"eksamen": []
},
{
"id": "f11-definisjon-16",
"nivaa": "detalj",
"kan": "Kjenne vitnesbyrdene fra Jersey om nominees og innsyn",
"kort": "En tidligere sjeføkonom for Jersey skrev til Schjelderup at nominee-aksjonærer var utbredt for å skjule reelle eiere, at de signerte udaterte salgsskjema for aksjene og at dette fortsatt var vanlig i 2014.",
"mer": "<p>Et annet brev: kravet om minste antall aksjonærer omgås med to nominees, opplysningsplikten om reelle eiere er lite mer enn «window-dressing», myndighetene godtar en offshore trust som reell eier, årsoppgavene gir lite utover aksjonærer som alle kan være nominees og selskaper uten virksomhet på Jersey må ikke levere regnskap. FT-journalisten Stothard («My brief career as a tax pirate», 2016) fikk høre at nominees eier selskapet på papiret, men signerer bort all beslutningsmakt.<\/p><p><b>Felle:<\/b> å tro at registrering av reelle eiere gir reelt innsyn.<\/p>",
"kilder": [
"F11 lb 14–15",
"F11 REV lb 22"
],
"eksamen": []
},
{
"id": "f11-definisjon-17",
"nivaa": "detalj",
"kan": "Kjenne definisjonene av hemmelighold som GS1 viser til",
"kort": "Hines og Rice (1994): lovgivning som støtter bank- og forretningshemmelighold; GAO (2008): mangel på effektiv utveksling av skatteinformasjon og på åpenhet; OECD (1998): lover eller praksis som hindrer effektiv informasjonsdeling med andre stater.",
"mer": "<p>Den vanligste formen er at paradiset ikke etterkommer informasjonsforespørsler fra tredjeparter. Firmaene leverer ofte bare navn på aksjonærer, antall aksjer og innskutt kapital, mens reelle eiere ikke oppgis. GS1 påpeker også at anonyme skallselskaper kan opprettes uten identitetsbevis, selv om FATF krever informasjon om reelle eiere og at tjenesteytere også i Storbritannia og USA bryter reglene.<\/p><p><b>Felle:<\/b> å tro at hemmelighold bare finnes i små øystater.<\/p>",
"kilder": [
"GS1 s. 170",
"GS1 s. 176"
],
"eksamen": []
}
]
},
{
"id": "f11-skadevirkninger",
"forelesning": "F11 Skatteparadiser",
"tittel": "Skadevirkninger: asymmetrisk informasjon, NOU 2009:19 og institusjoner",
"eksamensvekt": 1,
"viktigst": [
"Akerlof, Spence og Stiglitz (Nobelprisen 2001): skjult informasjon gir moralsk hasard og transaksjonskostnader",
"NOU 2009:19 lister sju måter skatteparadiser skader økonomisk utvikling på",
"Skadene oppstår i andre land, gebyrinntektene i paradiset",
"Paradisene gjør kriminalitet mer lønnsomt og gir eliten i fattige land insentiv til å svekke institusjoner",
"Rikdommens paradoks rammer land med svake institusjoner og presidentstyre (Andersen og Aslaksen 2008)"
],
"punkter": [
{
"id": "f11-skadevirkninger-01",
"nivaa": "kjerne",
"kan": "Koble skatteparadisene til teorien om asymmetrisk informasjon",
"kort": "Akerlof, Spence og Stiglitz fikk Nobelprisen i 2001 for å vise at informasjonsasymmetri gir moralsk hasard og transaksjonskostnader som hemmer markeder. Paradisenes hemmelighold skaper slik asymmetri.",
"mer": "<p>GS1: det er uklart hvem som eier eiendeler, hvem som reelt sitter i styret og hvem som er ansvarlig. Tredjeparter må bruke mer ressurser på å skaffe informasjon og må investere i sikringer mot moralsk hasard. Hemmeligholdet senker kostnaden ved lovbrudd fordi oppdagelsesrisikoen faller. Edwards-rapporten (2009) om Jersey: setter politikken personvern over åpenhet, blir kriminelle de største vinnerne.<\/p><p><b>Felle:<\/b> SS skriver Nobelprisen 2011. Riktig er 2001, slik forelesningen og GS1 skriver.<\/p>",
"kilder": [
"F11 lb 24",
"GS1 s. 169",
"GS1 s. 179–180",
"SS s. 250"
],
"eksamen": []
},
{
"id": "f11-skadevirkninger-02",
"nivaa": "kjerne",
"kan": "Liste de sju skadevirkningene fra NOU 2009:19",
"kort": "(1) Griper inn i andre lands suverenitet, (2) skader finansmarkedene, (3) øker kostnadene ved beskatning, (4) skader vekst i fattige land, (5) gjør kriminalitet mer lønnsom, (6) skader privat inntekt og (7) svekker institusjonell kvalitet.",
"mer": "<p>Forelesningens ordlyd: (1) stjeler skatteproveny, (2) asymmetrisk informasjon i finansmarkedene, (3) asymmetrisk informasjon og internprising gjør beskatning dyrere, (4) fattige land er avhengige av kapitalinntekt, (5) økonomisk kriminalitet, (6) flere banditter og færre entreprenører, (7) institusjonell kvalitet og dermed vekst. Utvalget ble ledet av Schjelderup og rapporten startet debatten og fikk EU til å endre politikk.<\/p><p><b>Avvik:<\/b> F11 lb 3 skriver «NOU 2009:13». Rapporten er NOU 2009:19 «Skatteparadiser og utvikling» (forsiden på lb 4, GS1 fotnote 6).<\/p>",
"kilder": [
"F11 lb 3–4",
"F11 lb 25",
"GS1 s. 171"
],
"eksamen": []
},
{
"id": "f11-skadevirkninger-03",
"nivaa": "viktig",
"kan": "Forklare hvordan paradisene griper inn i andre lands suverenitet",
"kort": "Prinsippet i internasjonal skatterett er at inntekt skattlegges ved kilden og at personer skattlegges der de bor. Paradisene lager lovgivning som lar andre lands skattytere unngå skatt ved kilden og stjeler dermed andre lands skatteinntekter.",
"mer": "<p>Forelesningen kaller paradisene «parasitter på andre lands suverenitet». Lovgivningen er rettet mot utlendinger, ikke mot egne innbyggere. Inntektene paradiset får (gebyrer) er små sammenlignet med skatteinntektene andre land taper.<\/p><p><b>Felle:<\/b> å svare at paradisene bare konkurrerer om kapital med lave satser. Poenget er at de undergraver andre lands mulighet til å skattlegge.<\/p>",
"kilder": [
"F11 REV lb 28"
],
"eksamen": []
},
{
"id": "f11-skadevirkninger-04",
"nivaa": "viktig",
"kan": "Forklare hvordan paradisene skader finansmarkedene og skattesystemene",
"kort": "Finanskrisen i 2008 viste at institusjoner skjulte gjeld og eiendeler i paradis (jf. Enron). Hemmeligholdet skjuler innsidehandel, øker risikopremien og gjør beskatning av kapital vanskeligere og dyrere.",
"mer": "<p>Skjulte bankkonti gjør skattegrunnlaget mer skattefølsomt og smalere og da øker effektivitetstapet ved beskatning. Det gir også administrative kostnader: Skatteetaten etterforsket Anders Jahres skjulte formue på Cayman i 35 år for 63 millioner euro. Fattige land forsøker å kompensere med høyere kapitalskatter, som får flernasjonale selskaper til å flytte mer overskudd ut. Paradisene får investeringer til å gå dit avkastningen etter skatt er høyest, ikke dit den er høyest og binder ressurser i advokater og revisorer.<\/p><p><b>Felle:<\/b> å tro at skadene bare rammer fattige land. GS1: både rike og fattige land skades, men fattige mest.<\/p>",
"kilder": [
"F11 REV lb 29–30",
"F11 REV lb 33",
"GS1 s. 181"
],
"eksamen": []
},
{
"id": "f11-skadevirkninger-05",
"nivaa": "viktig",
"kan": "Gi eksempler på at hemmelighold gjør lovbrudd billigere",
"kort": "Scandinavian Star (1990, 160 døde): eieren kunne ikke holdes ansvarlig fordi eierskapet var skjult i Bahamas. Andre eksempler: finansiering av 9/11 og ISIS, Breiviks konto på Antigua, Washington-snikskytteren med pass kjøpt i et paradis og fiskebåten Elektron (2005).",
"mer": "<p>Poenget: kan du skjule deg, koster det mindre å bryte regler. Ulovlig, urapportert og uregulert fiske (IUU) utgjør 13–31 % av globale fangster (FAO 2010) og registrering under bekvemmelighetsflagg er sentralt i problemet (OECD 2004). Mannskap utsettes for overgrep (59 % av intervjuede kambodsjanske fiskere hadde sett kapteinen drepe et besetningsmedlem). GS1: SAS leide fly fra anonyme selskaper på Cayman og 274 av 383 hendelser var ikke etterforsket.<\/p><p><b>Felle:<\/b> å tro at skadene bare gjelder skatt.<\/p>",
"kilder": [
"F11 lb 26",
"F11 REV lb 35–37",
"GS1 s. 182–183"
],
"eksamen": []
},
{
"id": "f11-skadevirkninger-06",
"nivaa": "viktig",
"kan": "Forklare bandittmodellen (bøttediagrammet) for privat inntekt",
"kort": "Jo flere i produktiv virksomhet, desto høyere inntekt; jo flere banditter (uproduktiv virksomhet), desto lavere verdiskaping. Paradisene øker avkastningen av banditt-virksomhet fordi utbyttet kan skjules, så flere blir banditter og alle taper.",
"mer": "<p>Bøttediagrammet setter de to kurvene sammen: andelen i produktiv virksomhet på én akse, andelen i uproduktiv på den andre. Paradisene skifter kurven for uproduktiv virksomhet opp, likevekten flytter seg mot flere banditter og privat inntekt faller. Det er et slags fangens dilemma: det som virker individuelt attraktivt gir lavere inntekt for alle. Gjelder særlig land med mye bandittvirksomhet (Nigeria, Colombia). Bygger på Torvik (2002, 2009).<\/p><p><b>Felle:<\/b> å tro at paradisene øker privat inntekt fordi de gir nye inntektsmuligheter.<\/p>",
"kilder": [
"F11 lb 33–37",
"F11 REV lb 38–42",
"GS1 s. 186"
],
"eksamen": []
},
{
"id": "f11-skadevirkninger-07",
"nivaa": "viktig",
"kan": "Forklare hvordan paradisene svekker institusjoner i fattige land",
"kort": "Paradisene lar eliten skjule stjålne midler, så det lønner seg å bygge ned institusjoner som skal hindre tyveri og svekke demokratisk kontroll. Av 27 land sør for Sahara hadde 5 presidentstyre ved uavhengighet, i 2009 hadde 24 det.",
"mer": "<p>Bare Mauritius, Sør-Afrika og Botswana hadde parlamentarisme i 2009. Eksempler: Mobutu (Kongo 1965–1997) stjal 15–20 % av statsbudsjettet årlig på 1970-tallet og inntekten per innbygger i 1992 var halvparten av nivået i 1960. Abacha (Nigeria): 3–5 mrd. dollar stjålet, nær 3 mrd. hentet tilbake. Suharto-familien 15–35 mrd. dollar, Zardari minst 500 mill. dollar. GS1 (Acemoglu mfl. 2001): et land i 25-persentilen for institusjonell kvalitet kan øke nasjonalinntekten sjudobbelt ved å nå 75-persentilen.<\/p><p><b>Felle:<\/b> at valg av styreform bare skyldes historie. Robinson og Torvik (2008) viser at det ikke holder.<\/p>",
"kilder": [
"F11 lb 29",
"F11 REV lb 43–46",
"GS1 s. 184–186"
],
"eksamen": []
},
{
"id": "f11-skadevirkninger-08",
"nivaa": "viktig",
"kan": "Forklare rikdommens paradoks og hvordan paradisene inngår i forklaringen",
"kort": "I snitt gir naturressursrikdom lavere vekst (negativ helning på regresjonslinjen). Mehlum mfl. (2006) og Boschini mfl. (2007): om et ressursrikt land vinner eller taper avhenger av kvaliteten på institusjonene.",
"mer": "<p>Paradisene gir insentiver til å svekke institusjonene og er derfor en del av forklaringen. Boschini mfl.: avgjørende er kombinasjonen av institusjoner og hvor lett ressursen kan tilranes, så diamanter er verre enn olje. Andersen og Aslaksen (2008): paradokset rammer presidentstyrte land, ikke parlamentariske (blå linje flat, rød linje fallende). GS1: effekten av ressurser undervurderer trolig skaden fra paradiser, fordi ressurser også gir verdiskapende aktivitet.<\/p><p><b>Felle:<\/b> å forklare paradokset med «hollandsk syke». GS1 påpeker at den ikke forklarer hvorfor institusjonene svekkes.<\/p>",
"kilder": [
"F11 lb 30–32",
"F11 REV lb 47–49",
"GS1 s. 186–187"
],
"eksamen": []
},
{
"id": "f11-skadevirkninger-09",
"nivaa": "detalj",
"kan": "Kjenne bankskandalene i GS1 og omfanget av skjult formue",
"kort": "Bøter: UBS 780 mill. dollar (2009), Wegelin 74 mill. dollar og nedleggelse (2013) og Credit Suisse rundt 2,6 mrd. dollar (2014). USA taper over 100 mrd. dollar i året og nordmenn har over 35 mrd. dollar i uoppgitte innskudd i paradiser.",
"mer": "<p>Wegelin, Sveits' eldste bank, hentet UBS' avgående kunder og skjulte over 1,2 mrd. dollar for amerikanere. Credit Suisse hadde over 22 000 amerikanske kunder med 10–12 mrd. dollar. LGT-skandalen i Liechtenstein gjaldt i hovedsak europeiske skattytere. Poenget i GS1: muligheten til å gjøre bankinnskudd til privat informasjon senker kostnaden ved unndragelse og gir moralsk hasard hos bankene.<\/p><p><b>Felle:<\/b> å blande UBS-boten (780 mill.) med varslerbelønningen (104 mill.).<\/p>",
"kilder": [
"GS1 s. 180–181"
],
"eksamen": []
}
]
},
{
"id": "f11-profittflytting",
"forelesning": "F11 Skatteparadiser",
"tittel": "Profittflytting, internprising, CFC-regler og skattekonkurranse",
"eksamensvekt": 1,
"viktigst": [
"Bananeksemplet: internprising flytter overskuddet til paradisene, bare 1 penny skattbart overskudd i hver ende",
"Tynn kapitalisering og internprising er kanalene for overskuddsflytting (Gresik mfl. 2020)",
"CFC-regler skattlegger kontrollerende eiere for inntekt i lavskatteselskaper, men krever ærlig egenrapportering",
"Slemrod og Wilson (2009): paradiser presser skattesatsene ned og senker velferden i alle land",
"BEPS: OECDs arbeid mot kunstig flytting av overskudd til land med lite økonomisk aktivitet"
],
"punkter": [
{
"id": "f11-profittflytting-01",
"nivaa": "viktig",
"kan": "Forklare internprising med bananeksemplet",
"kort": "Bananer eksporteres fra Latin-Amerika for 13 pence og importeres til Storbritannia for 60 pence. Mellom ligger 47 pence i interne betalinger til datterselskaper i paradiser og bare 1 penny skattbart overskudd i hver ende.",
"mer": "<p>Interne gebyrer: Bermuda 17p (distribusjonsnettverk), Luxembourg 8p (finansielle tjenester), Cayman 8p (innkjøpsnettverk), Jersey 6p (ledelse), Isle of Man 4p (forsikring) og Irland 4p (merkevare). Sum 47p, som forklarer gapet 60 − 13. I produksjonslandet: 1,5p lønn, 10,5p produksjonskostnad og 1p overskudd. I Storbritannia: 47p utsalgspåslag og 1p overskudd. Guardian (6. november 2007): 1,4 mrd. dollar i overskudd, 0,2 mrd. i skatt. Myndighetene i både produksjons- og konsumlandet mister skattegrunnlag.<\/p><p><b>Felle:<\/b> å tro at prisene mellom datterselskaper settes i et marked. Det er nettopp fordi de settes internt at overskuddet kan flyttes.<\/p>",
"kilder": [
"F11 lb 27–28",
"F11 REV lb 31–32"
],
"eksamen": []
},
{
"id": "f11-profittflytting-02",
"nivaa": "viktig",
"kan": "Forklare hvordan tynn kapitalisering og internprising flytter overskudd",
"kort": "Gresik mfl. (2020): flernasjonale selskaper flytter overskudd til paradiser med tynn kapitalisering (rentebærende gjeld til et finansieringsselskap i paradiset) og internprising. Land med svake institusjoner som er avhengige av selskapsskatt kan tape på å tiltrekke seg slik kapital.",
"mer": "<p>For disse landene er gevinsten i form av høyere lønn og produksjon lavere enn tapet av skatteinntekter fra overskuddsflytting. Selskapsskatt utgjør i snitt 18,6 % av skatteinntektene i Afrika, 15,5 % i Latin-Amerika og bare 9,3 % i OECD. Digitale selskaper lisensierer teknologi til datterselskaper i markedsland, som betaler royalty til morselskapet i paradiset. Verdien av et patent er vanskelig å anslå, så selskapene har stor frihet: utviklingskostnadene trekkes fra i høyskatteland, inntektene havner i paradiset.<\/p><p><b>Felle:<\/b> å tro at alle land tjener på å tiltrekke seg flernasjonale selskaper.<\/p>",
"kilder": [
"SS s. 251–252",
"F11 lb 25 (punkt 3)"
],
"eksamen": []
},
{
"id": "f11-profittflytting-03",
"nivaa": "viktig",
"kan": "Forklare hvordan CFC-regler virker og hvorfor de kan omgås",
"kort": "CFC-regler skattlegger skattytere i et vanlig land som har kontrollerende eierandel i selskaper i lavskatteland for sin andel av selskapets inntekt. Reglene krever at skattyterne selv opplyser om eierandelen.",
"mer": "<p>GS1: den som vil unngå skatt kan la være å rapportere eller bruke nominees slik at det ser ut som om man ikke lenger har kontroll. Ressurser brukes da på å skjule realitetene. Forskning (Kleven mfl. 2011) viser at feilrapportering er mye vanligere når skattyterne rapporterer selv. Det alternative virkemiddelet er intern rett, der skattemyndighetene må bevise at styrefunksjonene utøves et annet sted, med betydelige etterforskningskostnader. Den norske varianten av CFC-regler kalles NOKUS, men navnet står ikke i kildene.<\/p><p><b>Felle:<\/b> å tro at CFC-regler fungerer automatisk.<\/p>",
"kilder": [
"GS1 s. 175–176",
"SS s. 245–246"
],
"eksamen": []
},
{
"id": "f11-profittflytting-04",
"nivaa": "viktig",
"kan": "Forklare hvordan paradisene påvirker skattekonkurranse og velferd",
"kort": "Slemrod og Wilson (2009): paradiser som selger «skjuletjenester» øker samfunnskostnaden ved kapitalbeskatning, landene setter lavere skatter enn innbyggerne ønsker og velferden faller. Å fjerne paradisene øker skatter, fellesgoder og velferd i alle land.",
"mer": "<p>SS bruker dette på Norge: Skatteutvalget (NOU 2014:13) begrunnet forslaget om å senke kapitalskatten fra 28 til 20 % med å tiltrekke kapital og hindre overskuddsflytting. Clausing mfl. (2021): gjennomsnittlig global selskapsskatt falt fra 49 % til 23 % fra 1985 til 2019, i hovedsak på grunn av skattekonkurranse. SS (2021) nevner at industristatene forhandler om skatteharmonisering og globale skatter.<\/p><p><b>Felle:<\/b> å tro at lavere norsk selskapsskatt bare handler om nasjonale hensyn.<\/p>",
"kilder": [
"SS s. 242",
"SS s. 251",
"GS1 s. 179"
],
"eksamen": []
},
{
"id": "f11-profittflytting-05",
"nivaa": "detalj",
"kan": "Kjenne argumentene for at paradiser kan ha gunstige virkninger og motargumentene",
"kort": "Desai mfl. (2006) og Hong og Smart (2010): paradiser kan la mobil kapital unngå en ineffektiv skatt og gjeldsflytting til et finansieringsselskap i paradiset kan øke velferden i vertslandet. Gresik mfl. (2015): legger man til overskuddsflytting, kan aggressiv internprising senke velferden.",
"mer": "<p>Gresik mfl. viser også at velferdsoptimum i Hong og Smart-modellen er 100 % skatt og 100 % gjeldsfinansiering av datterselskapet. Wilson (2014) konkluderer med at litteraturen gir motstridende svar på om paradisene øker eller reduserer ineffektiviteten ved skattekonkurranse. GS1 legger vekt på at kostnadene ved hemmelighold kommer i tillegg.<\/p><p><b>Felle:<\/b> å påstå at all forskning finner at paradisene bare er skadelige for skattegrunnlaget.<\/p>",
"kilder": [
"GS1 s. 179"
],
"eksamen": []
},
{
"id": "f11-profittflytting-06",
"nivaa": "detalj",
"kan": "Definere BEPS og aggressiv skatteplanlegging",
"kort": "BEPS (Base Erosion and Profit Shifting) er strategier som utnytter hull og mismatch i skattereglene for å flytte overskudd til land med lav eller ingen skatt og lite økonomisk aktivitet, eller for å uthule skattegrunnlaget med fradragsberettigede betalinger som renter og royalty. Det meste er lovlig.",
"mer": "<p>Aggressiv skatteplanlegging: kunstige etableringer eller transaksjoner uten økonomisk substans der hensikten er å slippe skatt. OECD har anslått det årlige inntektstapet til 100–240 mrd. dollar. Over 135 land sluttet opp om Inclusive Framework (april 2021) og arbeidet har femten tiltaksområder. Hemmelige avtaler mellom stater og selskaper (Apple og Irland, LuxLeaks) er også en form for inngjerding. EU-kommisjonens vedtak mot Apple ble senere annullert.<\/p><p><b>Felle:<\/b> å likestille BEPS med ulovlig unndragelse.<\/p>",
"kilder": [
"SS s. 241",
"SS s. 247",
"SS s. 249",
"GS1 s. 171"
],
"eksamen": []
}
]
},
{
"id": "f11-informasjonsutveksling",
"forelesning": "F11 Skatteparadiser",
"tittel": "Lekkasjer og informasjonsutveksling: TIEA, FATCA og CRS",
"eksamensvekt": 1,
"viktigst": [
"UBS-saken (Birkenfeld 2007) ble vendepunktet: FATCA (USA 2010) og CRS (OECD 2014, første utveksling 2017)",
"CRS er automatisk utveksling mellom skattemyndigheter, ingen innsyn for tredjepart og USA deltar ikke",
"TIEA krever at man allerede kan knytte en skattyter til et bestemt paradis, ingen «fishing expeditions»",
"Effekter: tilpasning snarere enn eliminering, pengene flyttet bl.a. til USA (Casi, Spengel og Stage 2020)"
],
"punkter": [
{
"id": "f11-informasjonsutveksling-01",
"nivaa": "kjerne",
"kan": "Forklare hva CRS er og hvilke begrensninger avtalene har",
"kort": "Common Reporting Standard er OECDs standard for automatisk utveksling av finansielle kontoopplysninger, vedtatt i 2014 med første utveksling i 2017. Bare skattemyndighetene får opplysningene og USA deltar ikke.",
"mer": "<p>CRS er initiert av OECDs Global Forum on Transparency and Exchange of Information for Tax Purposes. Over 170 land og jurisdiksjoner deltar (2026-lysbildet). Opplysningene brukes til skattekontroll, ikke til offentlig innsyn i hvem som eier hva. Nesten alle tidligere omtalte paradiser deltar i forumet, men USA og flere store land deltar ikke i CRS.<\/p><p><b>Avvik i antall:<\/b> 2026-lysbildet sier over 170, REV-versjonen ca. 160 og SS (2021) over 100. Bruk 2026-tallet.<\/p><p><b>Felle:<\/b> at CRS gir allmennheten tilgang til eierinformasjon.<\/p>",
"kilder": [
"F11 lb 13",
"F11 lb 39–40",
"F11 REV lb 51",
"SS s. 243–244"
],
"eksamen": []
},
{
"id": "f11-informasjonsutveksling-02",
"nivaa": "kjerne",
"kan": "Forklare hvorfor UBS-saken ble et vendepunkt",
"kort": "Etter at Bradley Birkenfeld varslet i USA i 2007, betalte UBS 780 mill. dollar og utleverte 4 450 navn. Tilliten mellom sveitsiske banker og kundene brast og saken førte til FATCA (2010) og CRS.",
"mer": "<p>USA innførte rett til varslerbelønning i 2006. Birkenfeld fikk 40 måneders fengsel for å ha hjulpet en kunde å skjule 200 mill. dollar, men 104 mill. dollar i belønning. Metodene: verving på kunstmesser og regattaer, krypterte PC-er, kontanter i bankbokser, uttak fremstilt som lån og diamanter i tannkremtuber. Etterpå kjøpte 80 sveitsiske banker seg fri fra amerikanske anklager med bøter.<\/p><p><b>Felle:<\/b> å blande boten (780 mill.), antall navn (4 450) og belønningen (104 mill.).<\/p>",
"kilder": [
"F11 lb 10",
"F11 lb 12–13"
],
"eksamen": []
},
{
"id": "f11-informasjonsutveksling-03",
"nivaa": "viktig",
"kan": "Forklare hvordan TIEA-avtaler virker og hvorfor de kan gi mindre åpenhet",
"kort": "Under en TIEA må landet som ber om informasjon identifisere en bestemt person, transaksjon, konto, trust eller selskap og vise hvorfor paradiset har opplysningene. Generelle forespørsler («fishing expeditions») avvises.",
"mer": "<p>Altså kan man bare bruke avtalen når noen allerede har lekket bevis som knytter skattyteren til paradiset. Paradoksalt gir det paradisene insentiv til å vokte hemmeligholdet enda bedre. På den annen side kan avtalene øke opplevd oppdagelsesrisiko. Paradisene ble tvunget til å signere for å unngå OECDs svarteliste. Før avtalene utvekslet de bare informasjon når handlingen var straffbar i begge land og skattesvik var ikke straffbart for utlendinger i paradiset. GS1: avtalene endrer ikke forretningsmodellen.<\/p><p><b>Felle:<\/b> å tro at TIEA er automatisk utveksling. Det er CRS.<\/p>",
"kilder": [
"GS1 s. 170",
"GS1 s. 172",
"GS1 s. 177",
"GS1 s. 187"
],
"eksamen": []
},
{
"id": "f11-informasjonsutveksling-04",
"nivaa": "viktig",
"kan": "Kjenne OECDs vurdering av etterlevelse og Norges Banks argument",
"kort": "OECD vurderer etterlevelse etter fire kriterier; bøter er sjeldne og lave. Ved evalueringen i desember 2020 var bare Dominica, Niue, Saint Martin og Trinidad og Tobago «non-compliant».",
"mer": "<p>Norges Banks hovedstyre skrev 29. april 2020 at Jersey og Caymanøyene er medlemmer av OECDs Global Forum. SS: legges medlemskap til grunn som kriterium, er nesten ingen paradiser igjen og definisjonen blir svært smal. I 2020 rangerte Global Forum Jersey på samme nivå som Norge og Cayman på samme nivå som Danmark, selv om ingen av dem har offentlige aksjonærregistre og begge tillater stråmenn og truster.<\/p><p><b>Felle:<\/b> at deltakelse i CRS betyr at et land ikke er et skatteparadis.<\/p>",
"kilder": [
"F11 lb 38–39",
"SS s. 243–245"
],
"eksamen": []
},
{
"id": "f11-informasjonsutveksling-05",
"nivaa": "viktig",
"kan": "Kjenne omfanget av CRS-utvekslingen",
"kort": "Over 100 land utveksler informasjon, 47 mill. kontoer er utvekslet siden 2018, med 4,9 billioner euro i formue. Ekstra skatt, renter og bøter: 95 mrd. euro (2009–2019).",
"mer": "<p>Pengestrømmene til klassiske skatteparadis falt med om lag en tredjedel over ti år og automatisk informasjonsutveksling anslås å stå for rundt to tredjedeler av nedgangen. Norsk erfaring: første utveksling (2017/2018) ga opplysninger om ca. 115 000 kontoer tilhørende norske skattytere med samlet saldo over 150 mrd. kr. Skattedirektør Hans Christian Holte: opplysningene var av god kvalitet. Etter at CRS-opplysningene er mottatt, blir det vanskeligere å få innvilget frivillig retting.<\/p><p><b>Felle:<\/b> å blande 115 000 norske kontoer med 47 mill. kontoer globalt.<\/p>",
"kilder": [
"F11 lb 41",
"F11 lb 44"
],
"eksamen": []
},
{
"id": "f11-informasjonsutveksling-06",
"nivaa": "viktig",
"kan": "Gjengi funnene fra Danmark og fra Casi, Spengel og Stage",
"kort": "Boas mfl. (2024): størst effekt var at formue ble flyttet hjem. Casi, Spengel og Stage (2020): CRS reduserte innskudd i klassiske paradiser med 11,5–32,3 % utenom EU, mens innskudd i USA økte med om lag 55 mrd. dollar.",
"mer": "<p>Danmark: selvrapporteringen ble tredoblet, men mest blant dem med lave utenlandsinntekter, så inntektseffekten var begrenset. Kontrollene ga en mindre, men reell tilleggseffekt. Funnene generaliserer ikke nødvendigvis til land med svakere kapasitet. Casi mfl.: mye av nedgangen skyldes trolig at pengene ble flyttet, blant annet til USA, ikke at de ble skattlagt. Tidligere bilaterale avtaler hadde en umiddelbar effekt som falmet og det er ingen klar evidens for at pengene ble lovlig skattlagt et annet sted.<\/p><p><b>Felle:<\/b> å konkludere med at CRS har eliminert skatteparadisene: «tilpasning snarere enn eliminering».<\/p>",
"kilder": [
"F11 lb 42–43"
],
"eksamen": []
},
{
"id": "f11-informasjonsutveksling-07",
"nivaa": "viktig",
"kan": "Liste de praktiske svakhetene ved informasjonsutvekslingen",
"kort": "Datakvaliteten varierer, skatteår og standarder er ulike, de fattigste landene mangler teknologi og kapasitet, USA deltar ikke og det finnes mange kjente metoder for å omgå rapporteringen.",
"mer": "<p>Data fra noen land er ubrukelige, kommer for sent eller krever kostbar bearbeiding. En rådgivningsindustri har vokst fram rundt omgåelse. REV-lysbildet sier over 100 kjente metoder, SS sier over 400 måter å unngå CRS-rapportering på og OECD startet i 2017 et arbeid rettet mot rådgivere som lager slike opplegg. CRS dekker i liten grad truster og stråmenn. Flere land mangler kapasitet eller vilje til å bruke opplysningene.<\/p><p><b>Felle:<\/b> å tro at alle land bruker CRS-dataene fullt ut.<\/p>",
"kilder": [
"F11 lb 46",
"F11 REV lb 52",
"SS s. 245–246"
],
"eksamen": []
},
{
"id": "f11-informasjonsutveksling-08",
"nivaa": "detalj",
"kan": "Kjenne de tre lekkasjene 2006–2008 og Falciani-saken",
"kort": "2006 LGT (Liechtenstein): Heinrich Kieber solgte data om ca. 4 500 konti til tysk etterretning for 4,2 mill. euro. 2007 UBS: Birkenfeld. 2008 HSBC (Sveits): Hervé Falciani kopierte data om over 100 000 kunder, publisert som SwissLeaks i 2015.",
"mer": "<p>LGT-lekkasjen fikk sjefen i Deutsche Post til å gå av. Falciani ble dømt in absentia til fem års fengsel i Sveits (november 2015). Han ble pågrepet i Barcelona (juli 2012) og Madrid (april 2018) på sveitsiske begjæringer, men Spania avslo utlevering begge ganger (mai 2013 og september 2018) fordi det ikke er straffbart i andre land å avsløre skatteunndragelse. Sveits ville skremme potensielle varslere. REV-versjonen lister sju lekkasjer: UBS/LGT, HSBC Suisse, Julius Baer, British Haven Leaks, LuxLeaks, Panama Papers og Bahamas Leak.<\/p><p><b>Felle:<\/b> å bytte om bankene og varslerne.<\/p>",
"kilder": [
"F11 lb 10–11",
"F11 REV lb 23–24"
],
"eksamen": []
},
{
"id": "f11-informasjonsutveksling-09",
"nivaa": "detalj",
"kan": "Vite hva lekkasjene har lært oss om bruken av skatteparadis",
"kort": "Paradisene brukes både til unndragelse og planlegging, stiftelser skjuler hvem som reelt disponerer selskaper og midler, noen land har hemmelige skatteavtaler med selskaper (f.eks. Irland) og brukerne er den politiske og økonomiske eliten pluss kriminelle.",
"mer": "<p>Eksempler på navn i lekkasjene ifølge lysbildet: dronning Elizabeth, Bono, Messi, Putin og kretsen rundt Trump. SS: lekkasjene, særlig Panama Papers (2016), viser at medlemmer av en økonomisk elite er de største brukerne. Lekkasjene har også økt OECDs forståelse for hvor vanlig det er at selskaper bruker smutthull for å organisere seg ut av skatteplikt.<\/p><p><b>Felle:<\/b> å tro at paradisene først og fremst brukes av kriminelle.<\/p>",
"kilder": [
"F11 REV lb 24",
"SS s. 241",
"SS s. 252"
],
"eksamen": []
}
]
},
{
"id": "f11-norge",
"forelesning": "F11 Skatteparadiser",
"tittel": "Norge: de rikeste, frivillig retting og hvorfor paradisene består",
"eksamensvekt": 1,
"viktigst": [
"Alstadsæter, Johannesen og Zucman (2019): de 0,01 % rikeste unndrar 25–30 % av skatten, snittet er 3 %",
"50 % av formuen i skatteparadis eies av de 0,01 % rikeste og deres formuesandel øker med om lag 25 % når skjult formue tas med",
"Frivillig retting: slipper tilleggsskatt og straff, men betaler ordinær skatt og renter, normalt opptil ti år tilbake",
"Paradisene består fordi de store landene og makteliten selv bruker dem"
],
"punkter": [
{
"id": "f11-norge-01",
"nivaa": "kjerne",
"kan": "Gjengi funnene om skatteunndragelse blant de rikeste",
"kort": "Alstadsæter, Johannesen og Zucman (2019, AER): 25–30 % av skatten unndras av de 0,01 % rikeste mot 3 % i snitt for hele befolkningen. 50 % av formuen i skatteparadis eies av de 0,01 % rikeste.",
"mer": "<p>Data fra Norge, Sverige og Danmark. Ulikheten er større enn statistikken viser: i Norge øker formuesandelen til de 0,01 % rikeste med om lag 25 % når skjult formue tas med.<\/p><p><b>Avvik mellom kildene:<\/b> REV-versjonen (AJZ 2017) sier at de 0,01 % unndrar 25 % og at halvparten av skjult formue tilhører den rikeste 1 %. SS sier at de 0,1 % rikeste unndrar omkring en tredjedel. Bruk 2026-lysbildet: 0,01 %, 25–30 % og 50 %.<\/p><p><b>Felle:<\/b> å blande persentilene 0,01 %, 0,1 % og 1 %.<\/p>",
"kilder": [
"F11 lb 49",
"F11 REV lb 25",
"SS s. 252–253"
],
"eksamen": []
},
{
"id": "f11-norge-02",
"nivaa": "viktig",
"kan": "Forklare den norske ordningen med frivillig retting (skatteamnesti)",
"kort": "Den som selv melder fra om skjult formue eller inntekt før skattemyndighetene oppdager det, slipper tilleggsskatt og straffeforfølgning, men betaler ordinær skatt og renter, normalt opptil ti år tilbake.",
"mer": "<p>Lysbildet viser til skatteloven § 10-3 nr. 2 c og sier at ordningen har eksistert siden 1950. Bruken økte kraftig fra 2007 på grunn av internasjonalt opplysningssamarbeid: over 2 300 søknader 2007–2016, 970 personer fikk amnesti 2007–2014 og oppga 39 mrd. kr i formue. Sveits og Luxembourg var de vanligste opprinnelseslandene. Skatteetaten oppfordrer bevisst til retting før kontrollsakene starter, fordi det blir vanskeligere etter at CRS-opplysningene er mottatt.<\/p><p><b>Felle:<\/b> at amnesti betyr at man slipper skatten.<\/p>",
"kilder": [
"F11 lb 44",
"F11 lb 47"
],
"eksamen": []
},
{
"id": "f11-norge-03",
"nivaa": "viktig",
"kan": "Kjenne Wilhelmsen-saken og kritikken av frivillig retting",
"kort": "DN (2021) avdekket at rederifamilien Wilhelmsen hadde skjult en milliardformue i blant annet Panama og Liechtenstein og brakte hjem om lag 1 mrd. kr gjennom frivillig retting det siste tiåret.",
"mer": "<p>Arvingen Ragnhild Astrup Tschudi trakk seg fra styret i tankesmien Civita etter avsløringen. Saken illustrerer kritikken: det er ingen offentlighet om hvem som retter opp og ingen kostnad utover skatt og renter. Kritikerne mener «frivillig retting» er et mildt navn på bevisst skatteunndragelse.<\/p><p><b>Felle:<\/b> å tro at de som retter opp blir offentlig kjent.<\/p>",
"kilder": [
"F11 lb 48"
],
"eksamen": []
},
{
"id": "f11-norge-04",
"nivaa": "viktig",
"kan": "Kjenne Ditlev-Simonsen-saken («tantene i Sveits»)",
"kort": "Oslo-ordfører Ditlev-Simonsen hadde arv etter kona på ca. 3 mill. kr i Credit Suisse fra 1990, aldri oppgitt til skatt. Saken ble avslørt via en skilsmissesak i august 2007, han gikk av, men skattekravet var foreldet etter tiårsfristen.",
"mer": "<p>Tidlig på 1990-tallet: hytta på Gålå, «takk til tantene i Sveits». Kontoen ble avviklet i 1994/95. Han gikk av 22. august 2007. Utfallet i september 2007: endringsfristen på ti år var løpt ut, så familien slapp å betale. I dag ville kontoen blitt synlig gjennom automatisk utveksling (CRS) fra 2017/18.<\/p><p><b>Felle:<\/b> å tro at han måtte betale skatt og renter. Kravet var foreldet.<\/p>",
"kilder": [
"F11 lb 45"
],
"eksamen": []
},
{
"id": "f11-norge-05",
"nivaa": "viktig",
"kan": "Forklare hvorfor det er vanskelig å stenge ned skatteparadisene",
"kort": "De rikeste bruker dem til å skjule inntekt og formue, korrupte land bruker dem til hvitvasking, internasjonale investorer foretrekker dem fordi reglene er enkle å etterleve og de store landene vil ikke fordi makteliten selv bruker dem.",
"mer": "<p>Tax Justice Networks Financial Secrecy Index (2025) rangerer USA som verdens mest hemmelighetsfulle finanssenter, foran Sveits, Singapore og Hong Kong. GS1: felteksperimenter (Sharman 2010, Sharman mfl. 2015) viser at det er lettere å få anonyme selskaper i USA og Storbritannia enn i mange tradisjonelle paradiser. Det internasjonale samfunnet har ikke angrepet selve forretningsmodellen.<\/p><p><b>Avvik:<\/b> SS (FSI 2020/2021) har Caymanøyene øverst foran USA og Sveits. Forelesningen bruker FSI 2025 med USA øverst.<\/p>",
"kilder": [
"F11 lb 50",
"F11 REV lb 53",
"GS1 s. 170",
"GS1 s. 187–188",
"SS s. 244"
],
"eksamen": []
},
{
"id": "f11-norge-06",
"nivaa": "viktig",
"kan": "Vite hva som skjer med inntekt fra et skatteparadis uten skatteavtale",
"kort": "Uten skatteavtale har både Norge og paradiset beskatningsrett etter egen intern rett. Eksamensfasitene legger til grunn at Norge da ikke gir kredit, så inntekten blir dobbeltbeskattet.",
"mer": "<p>H2021 o4: lønn på 200 000 kr opptjent i et skatteparadis (15 %) skattlegges fullt i Norge (46,4 %: 92 800 kr) og i paradiset (30 000 kr), med kredit 0. H2024 o10d–e: omsetning gjennom et fast driftssted på De britiske jomfruøyene (7,5 %) kan beskattes av både Norge og BVI etter intern rett og selskapet blir utsatt for dobbeltbeskatning. Til sammenligning gir avtale med kreditmetode kredit begrenset til norsk skatt og unntaksmetoden gir kildestaten retten alene.<\/p><p><b>Felle:<\/b> at paradiset alene får beskatte fordi det er kildestat, eller at Norge alene får beskatte på grunn av globalskatteplikten.<\/p>",
"kilder": [
"H2021 o4",
"H2024 o10"
],
"eksamen": [
"H2021 o4",
"H2024 o10d",
"H2024 o10e"
]
},
{
"id": "f11-norge-07",
"nivaa": "detalj",
"kan": "Kjenne Tax Justice Networks indekser slik SS gjengir dem",
"kort": "Financial Secrecy Index måler 133 land på 20 indikatorer vektet med andel av eksporten av finanstjenester. Corporate Tax Haven Index (2021) måler 70 land: BVI først, Cayman nummer 2 og Jersey nummer 8.",
"mer": "<p>FSI 2020/2021 i SS: Caymanøyene øverst, deretter USA og Sveits. Jersey 16. plass, Norge 71. og Danmark 97. CTHI retter seg mot postkasseselskaper, stråmenn og mekanismer som skjuler reelle rådighetshavere. Danmark er nummer 34, Norge er ikke vurdert. Indeksene er en motreaksjon på at Irland, Nederland, Sveits, USA og Storbritannia har unngått OECDs svartelister. Palan mfl. (2010): Jersey og Cayman er blant de ti som oftest har stått på elleve sentrale lister fra 1977 til 2008.<\/p><p><b>Felle:<\/b> å blande FSI og CTHI.<\/p>",
"kilder": [
"SS s. 243–245"
],
"eksamen": []
}
]
},
{
"id": "f11-ss-sentralbanken",
"forelesning": "F11 Skatteparadiser",
"tittel": "SS: I sentralbankens blindsoner (Tangen-saken)",
"eksamensvekt": 1,
"viktigst": [
"Fire aspekter ved Norges Banks tilnærming: snevrest mulig definisjon, uklar holdning til aggressiv skatteplanlegging, nedtoning av skadevirkninger og snever tolkning av eget ansvar",
"NBIMs forventningsdokument (2017): skatt betales der verdiene skapes, skatt er styrets ansvar, offentlig land-for-land-rapportering",
"OECDs to spor: Global Forum med CRS og BEPS mot aggressiv skatteplanlegging",
"«Bransjestandard»-argumentet sammenlignes med barnearbeid for 20–30 år siden"
],
"punkter": [
{
"id": "f11-ss-sentralbanken-01",
"nivaa": "kjerne",
"kan": "Gjengi de fire aspektene ved Norges Banks tilnærming til skatteparadiser",
"kort": "(1) En snevrest mulig definisjon av skatteparadiser, (2) en uklar holdning til aggressiv skatteplanlegging, (3) en nedtoning av paradisenes negative konsekvenser og (4) en snever tolkning av eget ansvar.",
"mer": "<p>Forfatterne argumenterer for at sentralbanken la seg på en forsvarslinje som utfordrer Stortingets anmodning om å innlemme selskapers skatteposisjon i de etiske retningslinjene. Bakgrunnen var ansettelsen av Nicolai Tangen som sjef for NBIM i 2020. Konklusjonen: Norges Bank har en «blindsone» mot intensjonene i forventningsdokumentet og Stortinget må klargjøre fortolkningsrammene for «skatteparadis», «transparens» og «substansiell økonomisk aktivitet».<\/p><p><b>Felle:<\/b> å tro at artikkelen påstår at Tangen brøt norsk lov. Den kritiserer Norges Banks tolkning.<\/p>",
"kilder": [
"SS s. 240",
"SS s. 242",
"SS s. 252–254"
],
"eksamen": []
},
{
"id": "f11-ss-sentralbanken-02",
"nivaa": "viktig",
"kan": "Gjengi bakgrunnen for Tangen-saken",
"kort": "Tangens hedgefond AKO Capital var registrert på Cayman (2005) og han hadde truster, en stiftelse og selskaper i Cayman, BVI, Jersey, Guernsey, Isle of Man og Irland. En seilbåt ble driftet fra Isle of Man med mannskap registrert på BVI via Mossack Fonseca.",
"mer": "<p>Representantskapet ved Julie Brodtkorp (H) spurte i brev om ansettelsen var forenlig med Norges politikk på skatt og åpenhet. Det ledet til en stortingshøring i august 2020 og Meld. St. 24 (2020–2021). Styret krevde at Tangen skulle være skattemessig bosatt i Norge og avvikle en trust på Jersey. Tangen hadde også en skattetvist i Storbritannia (ca. 300 mill. kr) om bonusutbetalinger gjennom selskapet KAO, kontrollert fra Jersey og eid av AKO Business Purpose Trust på Guernsey.<\/p><p><b>Felle:<\/b> å tro at Norges Bank stilte ingen krav.<\/p>",
"kilder": [
"SS s. 242",
"SS s. 247–249"
],
"eksamen": []
},
{
"id": "f11-ss-sentralbanken-03",
"nivaa": "viktig",
"kan": "Kjenne NBIMs forventningsdokument om skatt og åpenhet",
"kort": "Etter at Stortinget i 2016 ba NBIM om å innlemme skatt i etikkarbeidet, kom dokumentet i april 2017. Tre prinsipper: skatt skal betales der verdiene skapes, selskapenes skatteopplegg er styrets ansvar og offentlig land-for-land-rapportering er kjernen i åpen skatterapportering.",
"mer": "<p>Dokumentet unngår ordet skatteparadis og bruker «closed jurisdictions» og «significantly low-tax environments» uten substansiell begrunnelse for tilstedeværelse. Det understreker at komplekse eierstrukturer hindrer åpenhet og investorers analyse og at aggressiv skatteatferd gir omdømme- og finansiell risiko. Skatt og åpenhet ble dermed en del av de etiske retningslinjene på linje med menneskerettigheter, barnearbeid, klima og korrupsjon. Per 2021 hadde fondet trukket seg ut av sju selskaper på grunn av skatteposisjon.<\/p><p><b>Felle:<\/b> at dokumentet bare viser til CRS-medlemskap.<\/p>",
"kilder": [
"SS s. 241",
"SS s. 246",
"SS s. 248–249"
],
"eksamen": []
},
{
"id": "f11-ss-sentralbanken-04",
"nivaa": "viktig",
"kan": "Forklare OECDs to spor i arbeidet mot skatteparadiser",
"kort": "Spor 1: Global Forum og CRS-avtalene om informasjonsutveksling. Spor 2: BEPS (Inclusive Framework) mot selskapers kreative tilpasninger og aggressiv skatteplanlegging, med krav om økonomisk substans.",
"mer": "<p>OECD startet arbeidet mot paradiser i 1996, presset økte etter 9/11 (terrorfinansiering) og igjen etter finanskrisen i 2008. Anslagene på skjult formue varierer fra 8 billioner dollar (Zucman 2015) til 32 billioner (Henry 2012). Fordi OECD er konsensusbasert med vetorett, har landene bare klart å enes om informasjonsutveksling. SS: Norges Bank har i praksis bare forholdt seg til spor 1 og brukt CRS som «utkvitteringsmekanisme».<\/p><p><b>Felle:<\/b> å tro at CRS-deltakelse sier noe om aggressiv skatteplanlegging.<\/p>",
"kilder": [
"SS s. 241",
"SS s. 244",
"SS s. 247",
"SS s. 253"
],
"eksamen": []
},
{
"id": "f11-ss-sentralbanken-05",
"nivaa": "viktig",
"kan": "Forklare kritikken av «bransjestandard»-argumentet",
"kort": "Sentralbanksjef Øystein Olsen kalte bruk av skatteparadiser en bransjestandard. SS sammenligner med barnearbeid, som for 20–30 år siden også ble forsvart som bransjestandard.",
"mer": "<p>Tangen sa at det har skjedd uheldige ting i skatteparadis, men at ikke alt som skjer der er problematisk. Olsen: «Det er myndighetene som må løse problemene knyttet til skatteparadiser.» SS: dette er en snever forståelse av årsak og virkning, fordi problemet er lovgivningen selv, ikke bare enkelte brukere. Når Norges Bank normaliserer bruken, signaliserer den at paradisene ikke påfører andre land skade.<\/p><p><b>Felle:<\/b> å tro at SS kritiserer Tangen personlig for lovbrudd.<\/p>",
"kilder": [
"SS s. 250",
"SS s. 253"
],
"eksamen": []
}
]
},
{
"id": "aksje-merton",
"forelesning": "Næss: aksjesparing, kan du slå markedet?",
"tittel": "Hvor mye i aksjer: Merton-andelen og risikoaversjon",
"eksamensvekt": 5,
"viktigst": [
"w* = (E(r) − rf)/(γσ²): σ² er variansen, ikke standardavviket",
"Høyere premie gir mer i aksjer; høyere varians eller risikoaversjon gir mindre",
"Lysbildet: 0,04/(3 × 0,2²) = 0,33",
"Regn baklengs: finn γ, premie eller σ når andelen er gitt",
"w er andel av totalformuen, ikke bare finansformuen"
],
"punkter": [
{
"id": "aksje-merton-01",
"nivaa": "kjerne",
"kan": "Skrive opp Mertons formel og forklare de tre driverne",
"kort": "w* = (E(r) − rf)/(γσm²). Mer i aksjer jo høyere meravkastning, mindre jo høyere varians og jo høyere risikoaversjon γ.",
"mer": "<p>Logikken (s. 12): jo høyere E(r) − r<sub>f<\/sub>, jo mer i aksjer; jo høyere σ<sub>m<\/sub><sup>2<\/sup>, jo mindre; jo høyere γ, jo mindre. Merton formaliserer dette.<\/p><p>γ er parameteren i CRRA-nyttefunksjonen U = c<sup>1−γ<\/sup>/(1 − γ) (H2018 o5b).<\/p><p><b>Feller:<\/b><\/p><ul><li>bruke σ i stedet for σ<sup>2<\/sup><\/li><li>bruke total forventet avkastning i stedet for premien<\/li><li>tro at w er andel av finansformuen når humankapital finnes<\/li><\/ul>",
"kilder": [
"Aksjesparing s. 12–13"
],
"eksamen": [
"H2025 o11(1)",
"H2022 o7(1)",
"H2021 o6a",
"H2018 o5e"
]
},
{
"id": "aksje-merton-02",
"nivaa": "kjerne",
"kan": "Regne ut Merton-andelen når standardavviket er oppgitt",
"kort": "Kvadrer σ først: premie 4 %, σ = 20 %, γ = 3 gir w = 0,04/(3 × 0,04) = 0,33.",
"mer": "<p><b>Flere eksempler:<\/b><\/p><ul><li>H2022: 4 %, γ = 2, σ = 20 %: 0,04/(2 × 0,04) = 50 %<\/li><li>H2021: 5 %, σ = 14 %: γ = 3 gir 85,0 %, γ = 4 gir 63,8 %, γ = 5 gir 51,0 %, γ = 6 gir 42,5 %<\/li><li>H2018: (6 % − 2 %)/(3 × 0,15<sup>2<\/sup>) = 59,3 %<\/li><\/ul>",
"kilder": [
"Aksjesparing s. 13"
],
"eksamen": [
"H2022 o7(1)",
"H2021 o6a",
"H2018 o5e"
]
},
{
"id": "aksje-merton-03",
"nivaa": "kjerne",
"kan": "Regne Merton-formelen baklengs for å finne γ, premie eller risiko",
"kort": "Løs w = premie/(γσ²) for den ukjente. Premie 0,05, varians 0,10 og w = 0,5 gir γ = 0,05/(0,5 × 0,10) = 1.",
"mer": "<p>H2025 o11(1) oppgir <b>variansen<\/b> (0,10) direkte. Da skal den ikke kvadreres.<\/p><p><b>Felle:<\/b> kvadrerer du 0,10 til 0,01, får du γ = 0,05/(0,5 × 0,01) = 10, som er alternativ (C). Riktig er (A) γ = 1.<\/p><p>Sjekk alltid ordet i oppgaven: «standardavvik» (kvadrer) eller «varians» (bruk direkte).<\/p>",
"kilder": [
"Aksjesparing s. 12",
"H2025 sensorveiledning"
],
"eksamen": [
"H2025 o11(1)"
]
},
{
"id": "aksje-merton-04",
"nivaa": "viktig",
"kan": "Regne beløp i aksjer og forventet porteføljeavkastning fra Merton-andelen",
"kort": "Beløp i aksjer = w × formue. Forventet porteføljeavkastning = rf + w × premie.",
"mer": "<p><b>H2022 o7(2):<\/b> w = 50 %, formue 2 000′: 1 000′ i aksjer og 1 000′ i bank.<\/p><p><b>H2021 o6e:<\/b> bank 1 %, premie 5 %, w = 85,03 %: 1 % + 0,8503 × 5 % = 5,25 %.<\/p><p><b>H2021 o6f:<\/b> 36 000 kr spart hvert år i 20 år til 5,2517 %: 36 000 × ((1 + r)<sup>20<\/sup> − 1)/r = 1 222 537 kr. Med avrundet 5,25 % blir det 1 222 316, så regn uten å runde av.<\/p>",
"kilder": [
"H2022 sensorveiledning",
"H2021 sensorveiledning"
],
"eksamen": [
"H2022 o7(2)",
"H2021 o6e",
"H2021 o6f"
]
},
{
"id": "aksje-merton-05",
"nivaa": "viktig",
"kan": "Forklare hvordan en høyere forventet premie endrer andelen og hvorfor et aktivt fonds løfte er lite troverdig",
"kort": "w er proporsjonal med premien: 5,5 % i stedet for 5 % gir 10 % høyere andel (γ = 3, σ = 14 %: fra 85,0 % til 93,5 %). Et påstått tillegg fra aktivt fond etter kostnader er lite troverdig.",
"mer": "<p>H2021 o6b: Elling tror et aktivt fond gir 0,5 prosentpoeng ekstra etter kostnader, med samme σ. Da øker w med faktoren 5,5/5 = 1,1.<\/p><p>H2021 o6c (fasit): skal fondet slå indeks med 0,5 etter kostnader, må meravkastningen <i>før<\/i> kostnader være en god del større. Empirien (Jensen, Malkiel, SPIVA, negativ alfa) gjør dette lite troverdig.<\/p><p><b>Felle:<\/b> å tro at høyere andel er et argument for aktive fond. Andelen øker bare fordi antakelsen er optimistisk.<\/p>",
"kilder": [
"H2021 sensorveiledning",
"Aksjesparing s. 79–82"
],
"eksamen": [
"H2021 o6b",
"H2021 o6c"
]
},
{
"id": "aksje-merton-06",
"nivaa": "viktig",
"kan": "Forklare at en risikoavers velger det sikre alternativet når forventningen er lik",
"kort": "Med konkav nyttefunksjon (risikoaversjon over null) gir et sikkert beløp høyere forventet nytte enn et lotteri med samme forventning.",
"mer": "<p><b>Felle:<\/b> «alle er like gode» gjelder bare en risikonøytral person.<\/p><p>Samme prinsipp ligger bak forsikring: en risikoavers betaler for å fjerne risiko.<\/p>",
"kilder": [
"Aksjesparing s. 12"
],
"eksamen": []
},
{
"id": "aksje-merton-07",
"nivaa": "detalj",
"kan": "Kjenne igjen nyttefunksjonene som brukes i oppgavene og hva de betyr for risikoaversjon",
"kort": "CRRA: U = c^(1−γ)/(1−γ). ln(W) tilsvarer γ = 1 og √W tilsvarer γ = 0,5. Alle er konkave, altså risikoaverse.",
"mer": "<p>Oppgavene bruker ulike former:<\/p><ul><li>ln(W): H2019 o7a og o9, H2022 o5<\/li><li>√W: H2024 o11, H2025 o13<\/li><\/ul><p>Høyere γ betyr at grensenytten faller raskere, altså mer risikoavers. Med CRRA påvirker en proporsjonal (lineær) skatt ikke valget mellom risikable alternativer (H2018 o5c).<\/p><p><b>Felle:<\/b> å tro at ln-nytte gir et annet svar enn √W på om man skal forsikre til aktuarisk pris (H2024 o11a, alternativ 2). Begge er risikoaverse.<\/p>",
"kilder": [
"H2018 fasit",
"H2024 sensorveiledning"
],
"eksamen": [
"H2018 o5b",
"H2024 o11a"
]
}
],
"kildenotat": "Aksjesparing: kan du slå markedet? (OA, forelesning 12; s. = PDF-side i ForelesningAksjesparing2026 (3))"
},
{
"id": "aksje-humankapital",
"forelesning": "Næss: aksjesparing, kan du slå markedet?",
"tittel": "Humankapital, alder og aksjeandel",
"eksamensvekt": 5,
"viktigst": [
"Formuen din = finansformue + humankapital (nåverdien av fremtidig arbeidsinntekt)",
"Sikker humankapital er et implisitt bankinnskudd: mer aksjer i finansformuen",
"Aksjelik humankapital (β = 1) er allerede aksjer: lite eller ingen aksjer i finansformuen",
"Eldre har mindre humankapital og bør ha lavere aksjeandel av finansformuen, ikke fordi risikoen forsvinner over tid",
"Statsansatt: kjøp aksjer. Aksjemegler: kjøp risikofritt"
],
"punkter": [
{
"id": "aksje-humankapital-01",
"nivaa": "kjerne",
"kan": "Regne aksjebeløp og aksjeandel når humankapitalen er risikofri",
"kort": "Aksjebeløp = w × (F + H) og sikker H teller som bank. 2 mill finans + 3 mill sikker humankapital med w = 1/3 gir 1,67 mill i aksjer, altså 83 % av finansformuen.",
"mer": "<p><b>Steg:<\/b> (1) totalformue = F + H. (2) Ønsket aksjebeløp = w(F + H). (3) Alt aksjebeløpet må ligge i F, siden H er «bank». (4) Andel av F = w(F + H)/F.<\/p><p><b>H2025 o11(2):<\/b> F = H = 1 mill, w = 0,5: 1 mill i aksjer = 100 % av F.<\/p><p><b>H2022 o7(3) og (4):<\/b> F = H = 2 000′, w = 50 %: 2 000′ i aksjer, andel av F = 100 %.<\/p><p><b>Felle:<\/b> å bruke w direkte på F (gir 50 % eller 666 667 kr). Andelen kan bli over 100 %, som betyr lånefinansiering.<\/p>",
"kilder": [
"Aksjesparing s. 14–15",
"H2022 sensorveiledning"
],
"eksamen": [
"H2025 o11(2)",
"H2022 o7(3)",
"H2022 o7(4)"
]
},
{
"id": "aksje-humankapital-02",
"nivaa": "kjerne",
"kan": "Regne aksjeandelen når humankapitalen varierer med aksjemarkedet (β = 1)",
"kort": "Aksjelik humankapital er allerede «aksjer»: aksjebeløp i F = w(F + H) − H, men ikke under 0. F = H = 1 mill og w = 0,5 gir 0 % aksjer i finansformuen.",
"mer": "<p>Lysbildet (s. 16): har du humankapital verdt 3 mill med β = 1, eier du allerede 3 mill i «aksjer». Det er mer enn ønsket aksjebeløp (1,67 mill), så resten bør være risikofritt.<\/p><p><b>H2025 o11(3):<\/b> 0,5 × 2 mill − 1 mill = 0. Riktig svar (A) 0 %.<\/p><p><b>Felle:<\/b> 50 % (bruker w på F) eller 100 % (behandler H som sikker).<\/p>",
"kilder": [
"Aksjesparing s. 16"
],
"eksamen": [
"H2025 o11(3)"
]
},
{
"id": "aksje-humankapital-03",
"nivaa": "kjerne",
"kan": "Avgjøre hvem som bør ha høyest aksjeandel ut fra hvor risikabel jobben er",
"kort": "Risikofri arbeidsinntekt (fast ansatt i staten) gir kjøp aksjer. Aksjelik arbeidsinntekt (aksjemegler) gir kjøp risikofritt.",
"mer": "<p>Tabellen «Er vi en aksje eller en obligasjon?» (s. 17): risikofri arbeidsinntekt gir «kjøp aksjer» (Cocco, Gomes og Maenhout 2005), aksjelik arbeidsinntekt gir «kjøp risikofritt» (Benzoni m.fl. 2007).<\/p><p><b>H2023 o9:<\/b> Nina (fast stilling i det offentlige) bør investere mer i aksjer enn Kari (aksjemegler), selv om alt annet er likt.<\/p><p><b>Feller:<\/b> «Kari bør ha mer fordi hun har en risikabel jobb», eller «like mye fordi de har samme risikopreferanser eller formue».<\/p>",
"kilder": [
"Aksjesparing s. 16–17",
"H2023 sensorveiledning"
],
"eksamen": [
"H2023 o9"
]
},
{
"id": "aksje-humankapital-04",
"nivaa": "kjerne",
"kan": "Forklare hvorfor eldre bør ha lavere aksjeandel i finansformuen",
"kort": "Humankapitalen (det implisitte bankinnskuddet) krymper når pensjonen nærmer seg, så aksjeandelen av finansformuen bør falle. Begrunnelsen er ikke at aksjerisiko forsvinner over tid.",
"mer": "<p><b>H2025 o11(4):<\/b> riktig (B) «lavere, fordi humankapitalen er mindre verdifull». (C) «lik andel» ble også godtatt, hvis andel leses som andel av totalformuen.<\/p><p><b>H2022 o7(5) og (6):<\/b> etter 10 år er H = 1 000′ og F = 3 000′. Aksjer = 50 % × 4 000′ = 2 000′, andel av F = 66,7 % (ned fra 100 %).<\/p><p><b>H2019 o6d:<\/b> eldre har høyere pensjonsformue i innskuddsordningen og lavere humankapital.<\/p><p><b>Feller:<\/b> tidsdiversifisering (H2025 alt A), «eldre er mer risikoaverse eller tapsaverse» (H2019 alt 1).<\/p>",
"kilder": [
"Aksjesparing s. 18",
"Aksjesparing s. 98"
],
"eksamen": [
"H2025 o11(4)",
"H2022 o7(5)",
"H2022 o7(6)",
"H2019 o6d"
]
},
{
"id": "aksje-humankapital-05",
"nivaa": "kjerne",
"kan": "Vite hva humankapital er og hvorfor den hører med i formuen",
"kort": "Humankapital = nåverdien av fremtidig arbeidsinntekt. Den er den viktigste eiendelen for en ung, produktiv arbeidstaker og liten nær pensjonsalder.",
"mer": "<p>Formuen på skattemeldingen er ikke hele formuen («njaa», s. 14). Humankapitalen gir inntekt mange år fremover for unge, men bare få år for den som snart går av (s. 18).<\/p><p><b>Felle:<\/b> «begge ca. 50 %» eller «ingen bør ha aksjer».<\/p>",
"kilder": [
"Aksjesparing s. 14",
"Aksjesparing s. 18"
],
"eksamen": [
"H2025 o11(2)"
]
},
{
"id": "aksje-humankapital-06",
"nivaa": "viktig",
"kan": "Kjenne tommelfingerregelen 100 minus alder og de to ulike begrunnelsene for den",
"kort": "Andel av finansformuen i aksjer ≈ 100 − alder. Økonomer begrunner det med humankapital; selvhjelpsbøker med at aksjer blir mindre risikable på lang sikt, noe økonomer ikke er enige i.",
"mer": "<p>Forelesningen (s. 18 og 20): samme råd, men av ulik grunn.<\/p><p><b>Choi:<\/b> 31 av 45 bøker sier aksjer blir mindre risikable med lengre horisont; 9 nevner «100 minus alder». Samuelson og Merton (1969) viser at med CRRA-nytte, uavhengige avkastninger og ingen arbeidsinntekt er optimal andel uavhengig av horisonten. Økonomenes begrunnelse for fallende andel er humankapitalen (Bodie, Merton og Samuelson 1992).<\/p><p><b>Felle:<\/b> å velge «fordi risikoen forsvinner over tid» som begrunnelse (H2025 o11(4) alt A).<\/p>",
"kilder": [
"Aksjesparing s. 18",
"Aksjesparing s. 20",
"Choi s. 10–14"
],
"eksamen": [
"H2025 o11(4)"
]
},
{
"id": "aksje-humankapital-07",
"nivaa": "viktig",
"kan": "Vite hvordan risikoandelen faktisk utvikler seg med alder i Norge",
"kort": "Fagereng, Gottlieb og Guiso (2017): andelen i risikable aktiva faller med alderen, fra rundt 35 til 40 % for de yngste til rundt 15 til 20 % for de eldste.",
"mer": "<p>Figuren «Hva gjør vi i praksis?» (s. 19) viser risikabel andel etter alder for ulike fødselskull. Mønsteret er fallende med alder, i tråd med humankapitalargumentet.<\/p><p>Deltakelsen i aksjer og fond stiger med formuen (Psykologi s. 20): nesten alle har bankinnskudd, mens andelen med aksjer eller aksjefond stiger med formuen, fra nesten ingen i bunnen til rundt 70 % helt øverst.<\/p><p>Tallene er lest av figurer og bare omtrentlige.<\/p>",
"kilder": [
"Aksjesparing s. 19",
"Psykologi s. 20"
],
"eksamen": []
},
{
"id": "aksje-humankapital-08",
"nivaa": "detalj",
"kan": "Regne Merton-andelen i finansformuen når humankapitalen er risikabel og korrelert med markedet",
"kort": "αF = w × (F + H)/F − (H/F) × (σH × ρ/σ). Med ρ = 1 og høy humankapital blir andelen i finansformuen mye lavere (H2018: ca. 16 %).",
"mer": "<p>H2018 o5f (eldre foreleser, formel fra forelesningsnotatene): w = 0,04/(3 × 0,15<sup>2<\/sup>) = 59,3 %, F = 2 mill (arv), H ≈ 11,75 mill, σ<sub>H<\/sub> = 10 %, σ = 15 %, ρ = 1.<\/p><p>α<sub>F<\/sub> = 0,593 × 13,75/2 − (11,75/2) × (0,10/0,15) ≈ 4,07 − 3,92 ≈ 0,157.<\/p><p>Spesialtilfeller: σ<sub>H<\/sub> = 0 gir sikker humankapital (pkt. 01); σ<sub>H<\/sub> = σ og ρ = 1 gir β = 1 (pkt. 02).<\/p><p>Fasiten er et bilde; tallet er rekonstruert i eksamens-DNA.<\/p>",
"kilder": [
"H2018 fasit",
"01-eksamens-dna"
],
"eksamen": [
"H2018 o5f"
]
},
{
"id": "aksje-humankapital-09",
"nivaa": "detalj",
"kan": "Regne humankapital som nåverdien av en voksende lønn og bruke den i et karrierevalg",
"kort": "Humankapital = Σ lønn × (1 + g)^t/(1 + r)^t over arbeidsårene. Med CRRA velges karrieren med høyest forventet nytte; lineær skatt endrer ikke valget, progressiv skatt favoriserer den sikre karrieren.",
"mer": "<p><b>H2018 o5a:<\/b> sykepleier 450 000, vekst 4 %, diskontering 7 %, 40 år: ca. 10,9 mill (første lønn i dag, rekonstruert; fasit er et bilde).<\/p><p><b>o5b:<\/b> eiendomsmegler har usikker lønn (60 % for 575 000, ellers 350 000). Med γ = 3 gir sykepleier høyest forventet nytte.<\/p><p><b>o5c:<\/b> lineær skatt skalerer alle utfall likt og påvirker ikke CRRA-valget; progressiv skatt kutter oppsiden og favoriserer sykepleier.<\/p><p><b>o5d:<\/b> en arv øker totalformuen, så karriererisikoen blir relativt mindre.<\/p>",
"kilder": [
"H2018 fasit",
"01-eksamens-dna"
],
"eksamen": [
"H2018 o5a",
"H2018 o5b",
"H2018 o5c",
"H2018 o5d"
]
}
],
"kildenotat": "Aksjesparing: kan du slå markedet? (OA, forelesning 12; s. = PDF-side i ForelesningAksjesparing2026 (3))"
},
{
"id": "aksje-diversifisering",
"forelesning": "Næss: aksjesparing, kan du slå markedet?",
"tittel": "Diversifisering og porteføljer med to aksjer",
"eksamensvekt": 4,
"viktigst": [
"E(rp) = w1μ1 + (1 − w1)μ2 og σp² = w1²σ1² + (1 − w1)²σ2² + 2w1(1 − w1)ρσ1σ2",
"Minimum varians: w1* = (σ2² − ρσ1σ2)/(σ1² + σ2² − 2ρσ1σ2); ved ρ = 0 blir det σ2²/(σ1² + σ2²)",
"ρ = 1: ingen gevinst, 100 % i lavest σ (uten shortsalg). ρ = −1: σp = 0 ved w1 = σ2/(σ1 + σ2), i eksempelet 2/3",
"Effisiente porteføljer = stigende del av hyperbelen fra A; risikonøytral tar 100 % i høyest forventning",
"Diversifisering er «the only free lunch in finance» (Markowitz)"
],
"punkter": [
{
"id": "aksje-diversifisering-01",
"nivaa": "kjerne",
"kan": "Regne forventning og standardavvik for en portefølje av to aksjer",
"kort": "E(rp) = w1μ1 + (1 − w1)μ2. σp² = w1²σ1² + (1 − w1)²σ2² + 2w1(1 − w1)ρσ1σ2. Ta kvadratroten for σp.",
"mer": "<p>Dette er formelen i regnearket (kolonne D og E).<\/p><p><b>Lysbildeeksempelet<\/b> (s. 25): μ<sub>1<\/sub> = 2, σ<sub>1<\/sub> = 1, μ<sub>2<\/sub> = 1, σ<sub>2<\/sub> = 2, ρ = 0. Halvparten i hver: E = 1,5 og σ<sub>p<\/sub> = √(0,25 × 1 + 0,25 × 4) = 1,118.<\/p><p><b>Feller:<\/b><\/p><ul><li>glemme kvadratroten (svarer med variansen)<\/li><li>glemme kryssleddet, eller bruke ρ alene i stedet for ρσ<sub>1<\/sub>σ<sub>2<\/sub> (kovariansen)<\/li><li>tro at σ<sub>p<\/sub> er et vektet snitt av σ-ene (gjelder bare ved ρ = 1)<\/li><\/ul>",
"kilder": [
"Aksjesparing s. 25",
"Aksjesparing s. 30–32",
"Regneark Effektive porteføljer"
],
"eksamen": [
"H2023 o13a"
]
},
{
"id": "aksje-diversifisering-02",
"nivaa": "kjerne",
"kan": "Forklare hvorfor diversifisering lønner seg selv med en aksje som er dårligere på både forventning og risiko",
"kort": "Aksje 1 (μ = 2, σ = 1) dominerer aksje 2 (μ = 1, σ = 2), men med ρ = 0 gir 95 % i aksje 1 σp = 0,955, altså under 1. Litt av den «dårlige» aksjen senker risikoen.",
"mer": "<p>«Diversification is the only free lunch in finance» (Markowitz, s. 24). Risiko måles med standardavviket og folk liker ikke risiko.<\/p><p>Med w<sub>1<\/sub> = 0,95: E = 1,95 og σ = 0,955. Du gir opp litt forventning, men risikoen faller under risikoen til den beste aksjen alene. Å legge alt i aksje 1 er derfor ikke åpenbart optimalt.<\/p>",
"kilder": [
"Aksjesparing s. 24–29",
"Regneark Effektive porteføljer"
],
"eksamen": []
},
{
"id": "aksje-diversifisering-03",
"nivaa": "kjerne",
"kan": "Regne ut minimum varians-porteføljen med to aksjer",
"kort": "w1* = (σ2² − ρσ1σ2)/(σ1² + σ2² − 2ρσ1σ2). Uavhengige aksjer (ρ = 0): w1* = σ2²/(σ1² + σ2²).",
"mer": "<p><b>Lysbildeeksempelet<\/b> (ρ = 0, σ<sub>1<\/sub> = 1, σ<sub>2<\/sub> = 2): w<sub>1<\/sub>* = 4/5 = 0,8, E = 1,8, σ<sub>p<\/sub> = 0,894.<\/p><p><b>H2023 o13a:<\/b> σ<sub>A<\/sub> = 20 %, σ<sub>B<\/sub> = 30 %, uavhengige: 0,09/(0,04 + 0,09) = 69 % i A (σ<sub>p<\/sub> = 16,6 %).<\/p><p><b>Intuisjon fra fasiten:<\/b> 50 % er riktig ved like σ, så 51 % passer bare når σ-ene er nesten like; 99 % bare når B har mye høyere σ. Forventet avkastning spiller ingen rolle for minimum varians.<\/p><p><b>Felle:<\/b> å la forventet avkastning påvirke svaret.<\/p>",
"kilder": [
"Aksjesparing s. 25–35",
"H2023 sensorveiledning"
],
"eksamen": [
"H2023 o13a"
]
},
{
"id": "aksje-diversifisering-04",
"nivaa": "kjerne",
"kan": "Kjenne spesialtilfellet perfekt positiv korrelasjon (ρ = 1)",
"kort": "Ingen diversifiseringsgevinst: σp er et vektet snitt av σ-ene, så minst risiko får du med 100 % i aksjen med lavest σ når du bare kan investere positivt i de to.",
"mer": "<p><b>H2024 o12d:<\/b> σ<sub>A<\/sub> = 20 %, σ<sub>B<\/sub> = 30 %, ρ = 1. σ<sub>p<\/sub> ved 100/99/69/51 % i A: 0,200/0,201/0,231/0,249. Riktig: 100 % i A.<\/p><p><b>Felle med formelen:<\/b> w<sub>A<\/sub>* = (0,09 − 0,06)/(0,04 + 0,09 − 0,12) = 3, altså 300 % i A og −200 % i B. Det krever shortsalg (da blir σ<sub>p<\/sub> = 0). Når oppgaven sier «kun disse to aksjene», er svaret hjørneløsningen 100 % i A.<\/p><p><b>Felle:<\/b> 69 % er svaret for ρ = 0 (H2023), ikke for ρ = 1.<\/p>",
"kilder": [
"H2024 sensorveiledning",
"Aksjesparing s. 25–35"
],
"eksamen": [
"H2024 o12d"
]
},
{
"id": "aksje-diversifisering-05",
"nivaa": "kjerne",
"kan": "Kjenne spesialtilfellet perfekt negativ korrelasjon (ρ = −1) og den riktige vekten",
"kort": "Da er σp = |w1σ1 − (1 − w1)σ2|, som blir 0 ved w1 = σ2/(σ1 + σ2). Med σ1 = 1 og σ2 = 2 er det w1 = 2/3 (E = 1,67), ikke 0,5.",
"mer": "<p>2026-lysbildene (s. 32–34) viser regnearket med ρ = −1 og spør «hvor lavt kan vi få σ?» Svaret er 0. Er null-risiko-porteføljen optimal? Ikke nødvendigvis: mer i aksje 1 gir høyere forventning, så alle andeler mellom 2/3 og 1 kan være optimale.<\/p><p><b>Avvik mellom kilder:<\/b> 2024-versjonen av forelesningen sa w<sub>1<\/sub> = w<sub>2<\/sub> = 0,5 og E = 1,5 for disse tallene. Det er feil; 0,5 gjelder bare når σ<sub>1<\/sub> = σ<sub>2<\/sub>, slik som i regneark (2) (σ = 0,1 for begge). Formelen: (4 + 2)/(1 + 4 + 4) = 2/3.<\/p>",
"kilder": [
"Aksjesparing s. 32–34",
"Regneark Effektive porteføljer (2)",
"03-forelesninger-finans"
],
"eksamen": []
},
{
"id": "aksje-diversifisering-06",
"nivaa": "kjerne",
"kan": "Forklare effisiente porteføljer, punkt A og valget til en risikonøytral investor",
"kort": "Effisiente porteføljer er den stigende delen av hyperbelen fra minimum varians-punktet A. Maksimalt risikoaverse velger A; jo mindre risikoavers, jo nærmere 100 % i aksjen med høyest forventning.",
"mer": "<p>Porteføljer under A er aldri optimale: der får man både lavere forventning og høyere σ enn i et punkt rett over (s. 35).<\/p><p><b>H2023 o13b:<\/b> en venn som ikke bryr seg om risiko (risikonøytral) vil maksimere forventet avkastning og setter 100 % i A (10 % mot 2 %). Fasiten viser til lysbildet om at en som ikke er risikoavers velger 100 % i aksjen med høyest avkastning.<\/p><p><b>Felle:<\/b> å blande minimum varians (69 %) med maks forventning (100 %).<\/p>",
"kilder": [
"Aksjesparing s. 35",
"H2023 sensorveiledning"
],
"eksamen": [
"H2023 o13b"
]
},
{
"id": "aksje-diversifisering-07",
"nivaa": "viktig",
"kan": "Avgjøre når en positivt korrelert aksje likevel gir diversifiseringsgevinst",
"kort": "Minimum varians ligger strengt mellom aksjene når ρ er lavere enn σlav/σhøy. Med σ1 = 1 og σ2 = 2 gir ρ under 0,5 gevinst; ved ρ = 0,5 er minimum varians 100 % i aksje 1.",
"mer": "<p>Utledet fra formelen: w<sub>1<\/sub>* &lt; 1 når ρσ<sub>1<\/sub>σ<sub>2<\/sub> &lt; σ<sub>1<\/sub><sup>2<\/sup>, altså ρ &lt; σ<sub>1<\/sub>/σ<sub>2<\/sub> (σ<sub>1<\/sub> er den laveste).<\/p><p><b>Felle:<\/b> å tro at bare negativ korrelasjon gir gevinst. Kravet er ρ &lt; 1 (og ρ &lt; σ<sub>lav<\/sub>/σ<sub>høy<\/sub> for å slå den tryggeste aksjen).<\/p>",
"kilder": [
"Aksjesparing s. 25–35"
],
"eksamen": []
},
{
"id": "aksje-diversifisering-08",
"nivaa": "viktig",
"kan": "Bruke regnearket «Effektive porteføljer med to risikable aksjer»",
"kort": "Arket regner σp og E(rp) for andeler fra 0 til 1 i steg på 0,01. Standardtall: μ1 = 1, σ1 = 2, μ2 = 2, σ2 = 1, ρ = −0,5. Minimum varians ved ca. 29 % i aksje 1 (σp = 0,65, E = 1,71).",
"mer": "<p><b>Merk:<\/b> regnearket nummererer motsatt av lysbildene (her er aksje 2 den gode).<\/p><p><b>Merkelapp-feil:<\/b> kolonnen heter «AndelAksje2», men ganges med tallene for aksje 1. Den er altså andelen i aksje 1. Eksakt minimum: w<sub>1<\/sub> = (1 + 0,5 × 2)/(4 + 1 + 2) = 2/7 = 0,286.<\/p><p><b>Versjon (2):<\/b> μ = σ = 0,1 for begge, ρ = −1, kolonnen heter «AndelAksje1». Minimum σ<sub>p<\/sub> = 0 ved 50/50, fordi σ-ene er like.<\/p><p>Lest med Python (openpyxl).<\/p>",
"kilder": [
"Regneark Effektive porteføljer",
"Regneark Effektive porteføljer (2)",
"Aksjesparing s. 30"
],
"eksamen": []
}
],
"kildenotat": "Aksjesparing: kan du slå markedet? (OA, forelesning 12; s. = PDF-side i ForelesningAksjesparing2026 (3))"
},
{
"id": "aksje-cml",
"forelesning": "Næss: aksjesparing, kan du slå markedet?",
"tittel": "Risikofritt aktivum, kapitalmarkedslinjen og separasjon",
"eksamensvekt": 4,
"viktigst": [
"CML: E(rp) = rf + [(E(rm) − rf)/σm] × σp; stigningstallet er Sharpe-ratioen",
"Tangeringsporteføljen M = markedsporteføljen, i praksis et globalt indeksfond",
"Separasjonsteoremet: alle holder bank (eller lån) + M; risikovilje avgjør bare blandingen",
"Mer risiko enn M: lån og kjøp mer M, ikke risikable enkeltaksjer eller én start-up",
"Lånefinansiering kan være rasjonelt ved lav risikoaversjon og sikker humankapital, men bare til lav rente"
],
"punkter": [
{
"id": "aksje-cml-01",
"nivaa": "kjerne",
"kan": "Tegne kapitalmarkedslinjen og forklare hvorfor den dominerer de effisiente porteføljene",
"kort": "Trekk en linje fra rf (σ = 0) som tangerer de effisiente porteføljene i M. For ethvert σ ligger linjen over hyperbelen, så alle investorer tilpasser seg på den.",
"mer": "<p>Nytt i modellen (s. 36–37): et risikofritt aktivum (bank, σ = 0, avkastning r<sub>f<\/sub> på y-aksen) og mulighet for shortsalg (negativ investering). Den maksimalt risikoaverse setter kanskje alt i banken.<\/p><p>«Tegnetid» (s. 38–48): linjen fra r<sub>f<\/sub> til tangeringspunktet M gir høyere forventet avkastning enn noen effisient portefølje for samme risiko. Dette gjelder alle investorer.<\/p><p><b>Felle:<\/b> å tegne linjen til minimum varians-punktet A i stedet for tangeringspunktet M.<\/p>",
"kilder": [
"Aksjesparing s. 36–48",
"Aksjesparing s. 51"
],
"eksamen": [
"H2023 o14",
"H2025 o15"
]
},
{
"id": "aksje-cml-02",
"nivaa": "kjerne",
"kan": "Skrive formelen for kapitalmarkedslinjen og regne med den",
"kort": "E(rp) = rf + (E(rm) − rf)/σm × σp. Med rf = 3 %, premie 5 % og σm = 15 %: E(rp) = 0,03 + 0,333 × σp.",
"mer": "<p>Tall fra lysbildet (s. 50): premie ca. 5 %, global indeks σ ca. 15 %, r<sub>f<\/sub> = 3 %.<\/p><ul><li>σ<sub>p<\/sub> = 15 % (100 % i M): E = 8 %<\/li><li>σ<sub>p<\/sub> = 30 %: E = 13 %. Krever 200 % i M, altså lån av 100 % av egen formue<\/li><\/ul><p>Andel i M = σ<sub>p<\/sub>/σ<sub>m<\/sub>. Andel over 1 betyr lån.<\/p><p><b>Felle:<\/b> CML deler premien på σ<sub>m<\/sub>, mens Merton deler på γσ<sup>2<\/sup>. Ikke bland dem.<\/p>",
"kilder": [
"Aksjesparing s. 49–50"
],
"eksamen": []
},
{
"id": "aksje-cml-03",
"nivaa": "kjerne",
"kan": "Definere Sharpe-ratioen",
"kort": "Sharpe = (E(r) − rf)/σ: meravkastning over risikofri rente per enhet standardavvik. Det er stigningstallet på kapitalmarkedslinjen.",
"mer": "<p>Kapitalmarkedslinjen viser alle tilpasninger som gir mest mulig avkastning per risiko (s. 49). Markedsporteføljen har den høyeste Sharpe-ratioen av alle risikable porteføljer og alle punkter på linjen har samme Sharpe-ratio.<\/p><p>Med tallene fra lysbildet: 0,05/0,15 = 0,33.<\/p><p>Sharpe brukes også i praksis for å sammenligne fond (Kvadsheim lb 42).<\/p><p><b>Felle:<\/b> å dele på variansen, eller å bruke totalavkastning i telleren.<\/p>",
"kilder": [
"Aksjesparing s. 49–50",
"Kvadsheim lb 42"
],
"eksamen": []
},
{
"id": "aksje-cml-04",
"nivaa": "kjerne",
"kan": "Forklare separasjonsteoremet og hva det betyr for valg av aksjer",
"kort": "Alle bør holde en kombinasjon av penger i banken (eller lån) og markedsporteføljen og ingenting annet. Risikopreferansene avgjør bare hvor mye av hver.",
"mer": "<p>Lysbildet (s. 52): veldig risikoavers setter alt i banken; litt risikoavers kjøper litt markedsportefølje. De mer risikovillige skal ikke ha mer risikable aksjer, men mer av markedsporteføljen, eventuelt lånefinansiert.<\/p><p><b>H2023 o14<\/b> («mutual fund separation theorem»): den som er mindre risikoavers enn andre bør investere mer i indeksfond. Feil: mer i risikable enkeltaksjer, eller låne og sette pengene på høyrentekonto.<\/p>",
"kilder": [
"Aksjesparing s. 52",
"H2023 sensorveiledning"
],
"eksamen": [
"H2023 o14"
]
},
{
"id": "aksje-cml-05",
"nivaa": "kjerne",
"kan": "Vite hva man bør gjøre for å få høyere forventet avkastning enn markedsporteføljen",
"kort": "Lån penger og invester mer i markedsporteføljen (øk giringen). Ikke kjøp de mest risikable enkeltaksjene eller alt i én start-up.",
"mer": "<p><b>H2025 o15:<\/b> riktig (C). Feil: (A) mest risikable enkeltaksjer, (B) én volatil start-up, (D) unngå høyere risiko enn M.<\/p><p>Begrunnelse: punktene til høyre for M på kapitalmarkedslinjen gir mest forventet avkastning per risiko. Selskapsspesifikk risiko i enkeltaksjer kan diversifiseres bort og gir derfor ingen ekstra betaling (CAPM).<\/p><p>Lysbildet (s. 59–63): «Hvis du vil ha mer risiko enn markedsporteføljen, bør du altså lånefinansiere.»<\/p>",
"kilder": [
"Aksjesparing s. 59–63"
],
"eksamen": [
"H2025 o15",
"H2023 o14"
]
},
{
"id": "aksje-cml-06",
"nivaa": "kjerne",
"kan": "Vurdere når det kan være fornuftig å låne til aksjer",
"kort": "Fornuftig for den som er lite risikoavers og har risikofri humankapital. Gjelder fond, ikke enkeltaksjer. Renten trenger ikke være under risikofri rente, men lavere rente gjør strategien bedre.",
"mer": "<p><b>H2023 o8:<\/b> riktig (ii): ikke lån til enkeltaksjer, men lite risikoaverse med ikke-risikabel humankapital kan lånefinansiere aksjefond.<\/p><p><b>Felle (alt iv):<\/b> «bare hvis man låner billigere enn risikofri rente». Fasit: modellene antar lån til risikofri rente, så det er ikke et krav.<\/p><p>Lysbildet (s. 55): ung statsansatt byråkrat med stor, sikker humankapital og liten finansformue tar ikke så mye risiko ved å lånefinansiere litt fondssparing. Advarslene mot lån til aksjer (s. 54) gjelder ikke alle.<\/p>",
"kilder": [
"Aksjesparing s. 54–55",
"H2023 sensorveiledning"
],
"eksamen": [
"H2023 o8"
]
},
{
"id": "aksje-cml-07",
"nivaa": "viktig",
"kan": "Vite hvilket krav som må stilles til lånerenten ved lånefinansiert aksjekjøp",
"kort": "Lånerenten må være klart lavere enn forventet aksjeavkastning. Aksjer har gitt rundt 5 prosentpoeng over risikofri rente på 3 til 4 %, så forbrukslån til 12 % lønner seg ikke.",
"mer": "<p>Lysbildet (s. 58): «Det er åpenbart ikke smart å ta forbrukslån til 12 prosent rente for å investere i aksjer.» Skal du lånefinansiere, må det være lån med lav rente (boliglån, verdipapirkreditt).<\/p><p><b>Avvik mellom versjoner:<\/b> (3) fra 23. september sier «3 til 7 prosentpoeng høyere ... ingen grunn til å tro på 15 prosent avkastning». (4) og (6) sier «rundt 5 prosentpoeng ... ingen grunn til å tro at dette vil være lønnsomt». Budskapet er det samme.<\/p><p>Forventet aksjeavkastning ca. 3,5 % + 5 % ≈ 8 til 9 %, godt under 12 %.<\/p>",
"kilder": [
"Aksjesparing s. 57–58"
],
"eksamen": []
},
{
"id": "aksje-cml-08",
"nivaa": "viktig",
"kan": "Kjenne det girede indeksfondet Nordnet Global Indeks 125 og verdipapirkreditt",
"kort": "Nordnet (fra 3. oktober 2023): for 100 kr investert låner Nordnet deg 25 kr, så fondet gir ca. 1,25 × avkastningen til et globalt indeksfond, minus kostnader. Mer gevinst når markedet stiger, større tap når det faller.",
"mer": "<p>Dette er kapitalmarkedslinjen i praksis: giring av markedsporteføljen i stedet for mer risikable aksjer. Lysbildet spør om det er en god idé og svaret følger av separasjonsteoremet: ja for den som ønsker mer risiko enn M og får lånet billig.<\/p><p><b>Talleksempel:<\/b> markedet +10 % gir ca. +12,5 %; markedet −20 % gir ca. −25 % (før kostnader og lånerente).<\/p><p><b>Lån s. 9:<\/b> Sbanken verdipapirkreditt: lån inntil 85 % av verdien av aksjene.<\/p>",
"kilder": [
"Aksjesparing s. 53",
"Lån s. 9"
],
"eksamen": []
},
{
"id": "aksje-cml-09",
"nivaa": "viktig",
"kan": "Forklare hva som var galt i Tesla-historien",
"kort": "To feil: (1) han tok ekstrem selskapsspesifikk Tesla-risiko som markedet ikke betaler for og (2) han brukte forbrukslån. Lånefinansiering i seg selv kan være rasjonelt ved lav risikoaversjon.",
"mer": "<p>E24: «Eirik (24) har tjent 1,7 millioner kroner på Tesla-aksjer», delvis finansiert med forbrukslån (s. 66–68).<\/p><p>«Du kommer ingen steder uten risiko» stemmer, men ikke all risiko gir betaling. Lotto er enorm risiko uten betaling (s. 71). Tesla-spesifikk risiko (bilfeil, ny teknologi) kan diversifiseres bort.<\/p><p><b>Felle:<\/b> å si at problemet er nivået på risikoen fra lånefinansiering. Det er sammensetningen (én aksje) og prisen på lånet (forbrukslån).<\/p>",
"kilder": [
"Aksjesparing s. 66–72"
],
"eksamen": []
},
{
"id": "aksje-cml-10",
"nivaa": "detalj",
"kan": "Kjenne eksemplene om advarsler mot lån til aksjer og hvem som anbefaler det",
"kort": "DN (2006) advarer mot lånefinansiert fondssparing; Lendo, som formidler lån, skriver at det kan være lurt å låne til aksjer.",
"mer": "<p>Lysbildene «Ofte advares det mot å låne penger til å kjøpe aksjer» (s. 54) og «Gjett hvem som anbefaler denne strategien?» (s. 56) brukes til å vise at både advarselen og anbefalingen må vurderes ut fra teorien.<\/p><p>Poenget: rådet avhenger av risikoaversjon, humankapital og lånerente og avsenderens interesser (en låneformidler tjener på at du låner).<\/p>",
"kilder": [
"Aksjesparing s. 54",
"Aksjesparing s. 56"
],
"eksamen": []
}
],
"kildenotat": "Aksjesparing: kan du slå markedet? (OA, forelesning 12; s. = PDF-side i ForelesningAksjesparing2026 (3))"
},
{
"id": "aksje-fond",
"forelesning": "Næss: aksjesparing, kan du slå markedet?",
"tittel": "Indeksfond, aktive fond, kostnader og effisiente markeder",
"eksamensvekt": 4,
"viktigst": [
"Indeksfond eier alle aksjene vektet etter markedsverdi: gir det vektede snittet minus lave kostnader og maksimal diversifisering",
"Aktive fond koster ofte 1 til 2 % (ca. fem ganger indeks) og slår ikke markedet etter kostnader",
"Alle kan ikke slå markedet: markedet er summen av alle",
"Forbrukerrådet (20 år til 2018): aktive taper på globale, europeiske og nordiske fond, men vinner på norske (+0,86)",
"Globalt indeksfond: ca. 70 % USA, lite eller ingen Kina; ikke valutasikre når lønnen er høy ved sterk krone"
],
"punkter": [
{
"id": "aksje-fond-01",
"nivaa": "kjerne",
"kan": "Definere indeksfond og aktivt fond og vite hva et indeksfond gir",
"kort": "Indeksfond investerer i alle selskapene på børsen proporsjonalt med størrelsen og gir det markedsverdivektede snittet. Aktivt fond har en forvalter som velger ut aksjene.",
"mer": "<p><b>H2024 o12a<\/b> (finn den <i>feile<\/i> påstanden): «Indeksfond gir generelt høyere avkastning enn et vektet gjennomsnitt av enkeltaksjene» er feil. Indeksfondet <i>er<\/i> det vektede snittet.<\/p><p>Riktige påstander i samme oppgave: bedre diversifisering og lavere risiko enn enkeltaksjer, billigere enn aktive fond og sannsynligvis bedre enn enkeltaksjer når mange andre har innsideinformasjon.<\/p>",
"kilder": [
"Aksjesparing s. 76–78",
"H2024 sensorveiledning"
],
"eksamen": [
"H2024 o12a"
]
},
{
"id": "aksje-fond-02",
"nivaa": "kjerne",
"kan": "Gi grunnene til at et globalt indeksfond er den beste aksjeporteføljen",
"kort": "Maksimal diversifisering, du slipper risiko du ikke får betalt for, aktive fond er dyrere, det er vanskelig å slå markedet selv uten gebyrer og du trenger ikke time kjøp og salg.",
"mer": "<p>Oppsummeringen (s. 97): «Optimal aksjeportefølje er overraskende enkel: kjøp globalt indeksfond.» Indeksfond gir gjennomsnittet og du er neppe bedre enn gjennomsnittet.<\/p><p>Forbeholdet: noe empiri sier at visse aksjetyper gir bedre avkastning, men det kan være betaling for ukjent risiko.<\/p>",
"kilder": [
"Aksjesparing s. 76–78",
"Aksjesparing s. 97"
],
"eksamen": [
"H2024 o12a"
]
},
{
"id": "aksje-fond-03",
"nivaa": "kjerne",
"kan": "Forklare hvorfor ikke alle kan slå markedet",
"kort": "Markedet er summen av alle investorer, så før kostnader er gjennomsnittsinvestoren lik markedet. Etter gebyrer og kurtasje taper gjennomsnittet.",
"mer": "<p>Lysbildet (s. 78): «Rent logisk kan ikke alle slå markedet. Markedet er summen av alle og alle kan ikke slå gjennomsnittet.» Selv uten gebyrer er det derfor teoretisk vanskelig for alle aktive å slå markedet.<\/p><p>Psykologi (s. 21 til 22): både vanlige folk og proffer sliter med å slå markedet fordi gebyrene kommer i tillegg.<\/p><p><b>Felle:<\/b> «hvis profesjonelle er flinkere, slår aktive fond i snitt markedet». Proffene <i>er<\/i> en stor del av markedet.<\/p>",
"kilder": [
"Aksjesparing s. 78",
"Psykologi s. 21–22"
],
"eksamen": []
},
{
"id": "aksje-fond-04",
"nivaa": "kjerne",
"kan": "Kjenne Forbrukerrådets funn om norske aktive fond",
"kort": "Årlig differanseavkastning, aktive mot indeks, siste 20 år til 2018: globale −0,89, europeiske −1,08, nordiske −3,48 og norske +0,86 prosentpoeng.",
"mer": "<p>Norske forvaltere gjør det dårlig på internasjonale aksjer, men fond i norske aksjer har faktisk slått markedet (s. 86).<\/p><p><b>H2025 o16:<\/b> riktig (C) svakere på globale, nordiske og europeiske, bedre på norske. Feil: (A) aktive best, (B) dårligere i alle kategorier, (D) omvendt.<\/p><p>Funnet brukes også i fondseksperimentet (Psykologi s. 53).<\/p>",
"kilder": [
"Aksjesparing s. 85–86",
"Psykologi s. 53"
],
"eksamen": [
"H2025 o16"
]
},
{
"id": "aksje-fond-05",
"nivaa": "kjerne",
"kan": "Vite hvor mye dyrere aktive fond er",
"kort": "Aktive fond tar ofte 1 til 2 % i året, ca. fem ganger mer enn indeksfond. DN har beregnet at norske kunder har betalt 34 mrd kr for mye i gebyrer.",
"mer": "<p>Kilder: Aksjesparing s. 78 (1 til 2 %), Psykologi s. 52 (fem ganger, 34 mrd, over halvparten av vanlige folks fondspenger står i aktive fond).<\/p><p>Choi: aktive amerikanske aksjefond gjør det i snitt 0,67 % dårligere i året enn passive (French 2008), men 60 % av fondsmidlene stod i aktive fond i 2020.<\/p><p><b>Felle:<\/b> å tro at høyere gebyr kjøper høyere avkastning.<\/p>",
"kilder": [
"Aksjesparing s. 78",
"Psykologi s. 52",
"Choi s. 19"
],
"eksamen": []
},
{
"id": "aksje-fond-06",
"nivaa": "viktig",
"kan": "Kjenne eksponeringen i et globalt indeksfond",
"kort": "Ca. 70 % USA (69,67 %), eurosonen 8,7 %, Japan 6,6 %, Europa utenom euro 4,7 % og Storbritannia 4,0 %. Lite eller ingen Kina.",
"mer": "<p>Tallene er fra et skjermbilde av et globalt indeksfond oppdatert 31. juli 2023 (s. 75).<\/p><p><b>H2024 o12b:<\/b> riktig (4) ca. 70 % USA, lite eller ingen Kina. Feil: 20 % eller 30 % i Kina, eller bare 40 % i USA.<\/p><p>Lysbildet spør også om andre aktiva enn børsnoterte aksjer bør inngå og hva med land uten skikkelige børser.<\/p>",
"kilder": [
"Aksjesparing s. 73–75"
],
"eksamen": [
"H2024 o12b"
]
},
{
"id": "aksje-fond-07",
"nivaa": "viktig",
"kan": "Avgjøre om man bør valutasikre et globalt indeksfond",
"kort": "Ikke valutasikre når arbeidsinntekten er høy når kronen er sterk: et usikret utenlandsk fond er verdt mest i kroner når kronen er svak og lønnen lav, så det jevner ut totalinntekten.",
"mer": "<p><b>H2024 o12c:<\/b> riktig (2) du bør ikke valutasikre. En risikoavers vil at fondet skal ha relativt stor verdi når arbeidsinntekten er lav. Feil: (1) sikre, (3) bare hvis svært risikoavers, (4) indifferent.<\/p><p>Begrunnelsen kommer fra home bias-resonnementet: svak krone gir lavere humankapital, men høyere kroneverdi på utenlandske aksjer (naturlig sikring). Kvadsheim lb 49: «Valutasikring øker risikoen!»<\/p><p><b>Felle:<\/b> å tro at sikring alltid reduserer risiko. Den reduserer fondets svingninger, men øker svingningene i totalinntekten.<\/p>",
"kilder": [
"H2024 sensorveiledning",
"03-forelesninger-finans",
"Kvadsheim lb 48–49"
],
"eksamen": [
"H2024 o12c"
]
},
{
"id": "aksje-fond-08",
"nivaa": "viktig",
"kan": "Forklare hvordan kostnader virker over tid",
"kort": "Kostnader trekkes hvert år og får rentes rente-effekt. 1,5 prosentpoeng høyere årlig kostnad over 30 år gir rundt en tredjedel lavere sluttverdi.",
"mer": "<p><b>Illustrasjon (egen utregning):<\/b> 100 000 kr i 30 år.<\/p><ul><li>7 % i året: 761 226 kr<\/li><li>5,5 % (1,5 pp i gebyr): 498 395 kr, altså 35 % mindre<\/li><\/ul><p><b>Kurtasje<\/b> (Psykologi s. 22): 79 kr per handel er lite, men 3 600 handler gir 284 400 kr (lysbildet: 284 000).<\/p><p><b>Felle:<\/b> å tro at 1 % i året bare koster 1 % av sluttverdien. Over 30 år koster 1 pp ca. 25 %.<\/p>",
"kilder": [
"Aksjesparing s. 78",
"Psykologi s. 22",
"Psykologi s. 52"
],
"eksamen": []
},
{
"id": "aksje-fond-09",
"nivaa": "viktig",
"kan": "Kjenne de klassiske studiene av aktive forvaltere",
"kort": "Jensen (1969): aktive fondsforvaltere slår ikke markedet og taper i snitt på grunn av høye gebyrer. Malkiel (1995): samme funn og survivorship bias gjør det enda verre.",
"mer": "<p><b>Survivorship bias:<\/b> dårlige fond legges ned og forsvinner fra statistikken, så snittet for fondene som overlever overdriver hvor godt aktive fond gjør det (s. 79).<\/p><p>Malkiel: de 20 beste investorene på 70-tallet gjorde det dobbelt så bra som indeks, men ble slått av markedet på 80-tallet.<\/p><p><b>Felle:<\/b> å tro at survivorship bias får aktive fond til å se dårligere ut. Den får dem til å se <i>bedre<\/i> ut.<\/p>",
"kilder": [
"Aksjesparing s. 79"
],
"eksamen": []
},
{
"id": "aksje-fond-10",
"nivaa": "viktig",
"kan": "Vite at gode resultater hos forvaltere ikke varer",
"kort": "De beste fondene på 80-tallet (17,89 % mot S&P 500 14,14 %) var under indeks på 90-tallet (13,68 % mot 14,91 %). Forvaltere med ca. 3,5 % meravkastning før ansettelse leverer ca. 0,4 til 0,7 % etterpå.",
"mer": "<p><b>s. 80:<\/b> tabell over de beste fondene 1980 til 1990 og hvordan de gjorde det 1990 til 2000.<\/p><p><b>s. 83 til 84<\/b> (Goyal og Wahal 2008, 3 400 pensjonsplaner): forvaltere som ansettes har slått sin referanseindeks med ca. 3,3 til 3,6 % i året de tre årene før, men etterpå ligner de gjennomsnittsfondet (0,64 %). Flinke forvaltere får forfremmelse, men holder ikke nivået.<\/p><p>Choi: penger jager historisk avkastning, men det er svake bevis for at resultater vedvarer (Carhart 1997).<\/p>",
"kilder": [
"Aksjesparing s. 79–80",
"Aksjesparing s. 83–84",
"Choi s. 19"
],
"eksamen": []
},
{
"id": "aksje-fond-11",
"nivaa": "viktig",
"kan": "Kjenne nyere tall: SPIVA og Berk og DeMarzo",
"kort": "SPIVA 2020: over halvparten av aktive fond taper mot S&P 500. Berk og DeMarzo: aktive fond slår indeks før gebyrer, men kundene taper etter gebyrer; alle fondstyper har negativ alfa 1975 til 2002 (snitt ca. −0,5 % i året).",
"mer": "<p>Figuren (s. 82) viser estimert årlig alfa for amerikanske aksjefond etter type: alle negative, fra ca. −0,4 % til ca. −1,1 %, samlet ca. −0,5 %.<\/p><p><b>Felle:<\/b> «aktive fond har lavere avkastning før kostnader». Berk og DeMarzo sier det motsatte: før gebyrer slår de indeks.<\/p>",
"kilder": [
"Aksjesparing s. 81–82"
],
"eksamen": []
},
{
"id": "aksje-fond-12",
"nivaa": "viktig",
"kan": "Forklare hvorfor man ikke bør prøve å time markedet",
"kort": "Prisene reflekterer allerede all kjent informasjon, så det finnes ingen systematisk gode eller dårlige kjøpstidspunkt.",
"mer": "<p>Praktiske råd (s. 98): «Ikke prøv å time markedet.» Oppsummering (s. 97): du klarer uansett ikke time markedet.<\/p><p>Bakgrunnen er hypotesen om effektive markeder, som Psykologi s. 14 bruker som en av benchmarkene for å definere bias.<\/p><p>Kvadsheim (lb 34): norsk fondsindeks ga 8,93 % i året 1994 til 2018, mens fondssparerne fikk 6,6 % fordi de kjøpte høyt og solgte lavt.<\/p>",
"kilder": [
"Aksjesparing s. 97–98",
"Psykologi s. 14",
"Kvadsheim lb 34"
],
"eksamen": []
},
{
"id": "aksje-fond-13",
"nivaa": "viktig",
"kan": "Huske de praktiske rådene fra aksjesparingsforelesningen",
"kort": "Kjøp globalt indeksfond og ikke prøv å time markedet. Ung med trygg jobb og høy humankapital kan ha høy aksjeandel; eldre, eller den som har jobb som korrelerer med markedet, bør ha lavere.",
"mer": "<p>Siste lysbilde (s. 98) samler hele forelesningen:<\/p><ul><li><b>Hvilke aksjer:<\/b> globalt indeksfond (separasjon, diversifisering, kostnader)<\/li><li><b>Hvor mye:<\/b> avhenger av deg (Merton med humankapital)<\/li><li><b>Når:<\/b> ikke time (effektive markeder)<\/li><\/ul><p>Typisk eksamensformulering: velg påstanden som kombinerer indeksfond med en aksjeandel tilpasset humankapitalen.<\/p><p><b>Felle:<\/b> alternativer som kobler høy risikovilje med «mer risikable aksjer», eller som anbefaler å kjøpe etter at markedet har falt.<\/p>",
"kilder": [
"Aksjesparing s. 97–98"
],
"eksamen": []
},
{
"id": "aksje-fond-14",
"nivaa": "detalj",
"kan": "Kjenne de tre formene for markedseffisiens",
"kort": "Svak form: prisene reflekterer historiske kurser (teknisk analyse nytteløs). Semi-sterk: all offentlig informasjon (fundamental analyse nytteløs). Sterk: også innsideinformasjon.",
"mer": "<p>Står i OA-forelesningen fra 2025 (hjelpekilden), ikke i 2026-lysbildene. 2026 nøyer seg med at prisene reflekterer all kjent informasjon.<\/p><p>Koblingen til eksamen: H2024 o12a sier at indeksfond sannsynligvis gir bedre avkastning enn enkeltaksjer «når mange andre har innsideinformasjon som du ikke har». Med indeksfond får du snittet uansett hvem som vet hva.<\/p><p>Event-studier (kursen reagerer straks på nyheter) støtter semi-sterk effisiens.<\/p>",
"kilder": [
"03-forelesninger-finans",
"Psykologi s. 14"
],
"eksamen": [
"H2024 o12a"
]
},
{
"id": "aksje-fond-15",
"nivaa": "detalj",
"kan": "Beskrive de to hovedstrategiene for ansvarlig investering",
"kort": "Ekskludering («stikk»: selg deg ut og håp at andre gjør det samme) eller aktivt eierskap («bli og fiks»: bruk eierrollen til å påvirke).",
"mer": "<p>H2021 o6d (eldre foreleser) ba om fordeler og ulemper ved de to. Fasit: «Enten bli og fikse eller stikk og håp at alle andre også selger seg ut.»<\/p><p>Ekskludering virker bare på prisen hvis mange gjør det; aktivt eierskap krever at du eier for å påvirke.<\/p>",
"kilder": [
"H2021 sensorveiledning"
],
"eksamen": [
"H2021 o6d"
]
},
{
"id": "aksje-fond-16",
"nivaa": "detalj",
"kan": "Vite hva en aksjesparekonto er",
"kort": "Aksjesparekonto (ASK): børsnoterte aksjer og aksjefond (over 80 % aksjer) kan kjøpes og selges uten løpende gevinstskatt. Skatt (med skjerming, 22 % × 1,72 = 37,84 %) kommer først når du tar ut mer enn du har satt inn.",
"mer": "<p>Ikke i OA-lysbildene. Skattemekanikken hører til skatteforelesningen (F4 lb 36) og omtales av Kvadsheim (lb 32 og 36: ASK, IPS eller investeringskonto).<\/p><p>Uttak regnes først som tilbakebetaling av innskudd (skattefritt). Formuesverdi: aksjene verdsettes til 80 %.<\/p><p>Poenget for sparing: ASK gjør det billigere å bytte fond, men endrer ikke rådet om å velge globale indeksfond.<\/p>",
"kilder": [
"F4 lb 36",
"Kvadsheim lb 32",
"05-satser-2026"
],
"eksamen": []
}
],
"kildenotat": "Aksjesparing: kan du slå markedet? (OA, forelesning 12; s. = PDF-side i ForelesningAksjesparing2026 (3))"
},
{
"id": "aksje-capm",
"forelesning": "Næss: aksjesparing, kan du slå markedet?",
"tittel": "CAPM, systematisk risiko og faktorer",
"eksamensvekt": 2,
"viktigst": [
"Risiko deles i diversifiserbar (usystematisk) og ikke-diversifiserbar (systematisk)",
"Markedet betaler bare for systematisk risiko: r = rf + β(rm − rf)",
"Mange uavhengige start-ups fjerner nesten all risiko, så én start-up gir ingen risikopremie",
"Fama-French: små selskaper og verdiaksjer (høy B/M) har gitt høyere avkastning; betaling for risiko eller bedre aksjer?"
],
"punkter": [
{
"id": "aksje-capm-01",
"nivaa": "kjerne",
"kan": "Forklare hvorfor markedet ikke betaler for risiko som kan diversifiseres bort",
"kort": "Risiko du kan diversifisere bort, vil ingen betale deg for. Én aksje eller én start-up gir derfor ekstra risiko uten ekstra forventet avkastning.",
"mer": "<p><b>Start-up-eksempelet<\/b> (s. 64): en start-up er verdt 1 mrd hvis gründeren er et geni, ellers ingenting. Deler du investeringen på 100 start-ups i ulike land og sjansene er uavhengige, forsvinner nesten all risiko. Siden alle kan gjøre det, er det ingen som betaler for risikoen i én start-up.<\/p><p>Samme logikk gir billig brannforsikring (uavhengige branner) og dyr pandemiforsikring (systematisk).<\/p><p><b>Felle:<\/b> «høy risiko gir høy forventet avkastning» gjelder bare systematisk risiko.<\/p>",
"kilder": [
"Aksjesparing s. 59–64"
],
"eksamen": [
"H2025 o15"
]
},
{
"id": "aksje-capm-02",
"nivaa": "kjerne",
"kan": "Skrive CAPM og forklare β",
"kort": "r = rf + β(rm − rf). β måler hvor mye aksjen samvarierer med markedet; bare denne delen av risikoen gir risikotillegg.",
"mer": "<p>Avkastningen (s. 65) består av to ledd: den risikofrie renten og et risikotillegg for risikoen som ikke kan diversifiseres bort.<\/p><p><b>Eksempel:<\/b> r<sub>f<\/sub> = 3 %, premie 5 %, β = 1,2: 3 % + 1,2 × 5 % = 9 %.<\/p><p><b>Felle:<\/b> å bruke standardavviket som risikomål i CAPM. En aksje med høy σ men lav β har lavt avkastningskrav.<\/p>",
"kilder": [
"Aksjesparing s. 64–65"
],
"eksamen": []
},
{
"id": "aksje-capm-03",
"nivaa": "viktig",
"kan": "Kjenne Fama-French trefaktormodellen",
"kort": "r = rf + β(rm − rf) + bs × SMB + bv × HML + α. SMB = Small Minus Big, HML = High Minus Low book-to-market.",
"mer": "<p>Fama og French (1992) finner at verdiaksjer (høy bokført verdi i forhold til pris) og små selskaper gir høyere avkastning. De utvider CAPM med disse to faktorene. α er avkastning som ikke forklares av faktorene.<\/p><p><b>Avvik:<\/b> formelsiden er med i versjon (3) og (4), men strøket i (6) fra 30. september 2026. Teksten om Fama og French står fortsatt.<\/p>",
"kilder": [
"Aksjesparing s. 90–91"
],
"eksamen": []
},
{
"id": "aksje-capm-04",
"nivaa": "viktig",
"kan": "Definere verdiaksjer og kjenne historien bak verdipremien",
"kort": "Verdiaksjer er lavt priset i forhold til inntjening (lav P/E) eller bokført verdi (høy book-to-market). Graham (1930-tallet) og Fama og French (1992) fant at de har gitt høyere avkastning.",
"mer": "<p>Benjamin Graham oppdaget dette allerede på 1930-tallet og funnene ble forsterket utover 1980-tallet (s. 89). Fama og French (1992) fant også en premie for små selskaper.<\/p><p>Choi: 8 av bøkene anbefaler å vekte mot verdiaksjer og 14 mot små selskaper, men bare 3 nevner at verdiaksjer kan være mer risikable.<\/p>",
"kilder": [
"Aksjesparing s. 89–90",
"Choi s. 17"
],
"eksamen": []
},
{
"id": "aksje-capm-05",
"nivaa": "viktig",
"kan": "Forklare de to tolkningene av at visse aksjer har gitt høyere avkastning",
"kort": "(1) Aksjene er bedre investeringer. (2) De er mer risikable på en måte CAPM ikke fanger. Da er premien betaling for den risikoen. Under (2) gir de ikke bedre risikojustert avkastning.",
"mer": "<p>Med tolkning 1 er funnene aksjetips; med tolkning 2 viser de bare hvor dårlig CAPM fungerer (s. 88).<\/p><p>Asness og Liew: billige aksjer er ofte «crappy companies», så det er plausibelt at de er mer risikable (s. 94).<\/p><p>Konklusjon (s. 95): om du bør kjøpe verdi- og momentumaksjer avhenger av grunnen. Fanger de bare opp risiko som β ikke fanger, bør du ikke nødvendigvis kjøpe dem.<\/p><p>Choi: økonomer sier at verdi og små selskaper «kan eller kan ikke» være attraktive.<\/p>",
"kilder": [
"Aksjesparing s. 88–95",
"Choi s. 17"
],
"eksamen": []
},
{
"id": "aksje-capm-06",
"nivaa": "viktig",
"kan": "Vite at det er kovariansen med markedet som prises og at selvhjelpsbøkene ikke nevner den",
"kort": "CAPM-logikken: ekstra avkastning bare for risiko som ikke kan diversifiseres bort, altså kovariansen mellom aksjen og markedet. Ingen selvhjelpsbøker nevner kovarians.",
"mer": "<p>Lysbildet «Økonomer vs selvhjelpsbøker» (s. 96).<\/p><p>Choi: to grunnbegreper i porteføljeteori nevnes nesten aldri i bøkene: avtakende grensenytte (bare 5 bøker) og kovarians mellom avkastning og grensenytte (ingen). Bøkene tenker risiko som sannsynligheten for å tape, ikke som varians eller kovarians.<\/p>",
"kilder": [
"Aksjesparing s. 96",
"Choi s. 14–15"
],
"eksamen": []
}
],
"kildenotat": "Aksjesparing: kan du slå markedet? (OA, forelesning 12; s. = PDF-side i ForelesningAksjesparing2026 (3))"
},
{
"id": "aksje-premie",
"forelesning": "Næss: aksjesparing, kan du slå markedet?",
"tittel": "Livssyklusmodellen og hvorfor aksjer",
"eksamensvekt": 1,
"viktigst": [
"Finansmarkedene flytter ressurser over tid: spar når du jobber, bruk som pensjonist, lån som ung",
"Aksjer har slått bankinnskudd over tid og i alle land, med rundt 5 prosentpoeng i året",
"Premien er større enn modellene predikerer (aksjepremiegåten)",
"To spørsmål styrer resten: hvor mye i aksjer (Merton) og hvilke aksjer (markedsporteføljen)"
],
"punkter": [
{
"id": "aksje-premie-01",
"nivaa": "viktig",
"kan": "Forklare livssyklusmodellen som rammen for sparing, pensjon og lån",
"kort": "Finansmarkedene lar deg flytte penger over tid: spare når inntekten er høy og bruke senere (pensjon), eller låne som ung mot høyere inntekt senere.",
"mer": "<p>Alle tre OA-forelesningene starter her. Aksjesparing: flytte ressurser fra i dag til fremtiden. Pensjon: spare mens man arbeider. Lån: flytte penger fra fremtiden til i dag.<\/p><p><b>Lån s. 3 (SSB 2018):<\/b> gjelden er størst for unge husholdninger, nettoformuen topper rundt 60 til 70 år.<\/p><p><b>Choi:<\/b> økonomer vil glatte <i>forbruket<\/i>: lav eller negativ sparing som ung, høy midt i livet og negativ som pensjonist.<\/p><p><b>Felle:<\/b> «spar 10 til 15 % hele livet» er selvhjelpsbøkenes regel, ikke livssyklusmodellens.<\/p>",
"kilder": [
"Aksjesparing s. 3–5",
"Pensjon s. 3",
"Lån s. 2–3",
"Choi s. 4"
],
"eksamen": []
},
{
"id": "aksje-premie-02",
"nivaa": "viktig",
"kan": "Vite hvor stor aksjepremien har vært historisk",
"kort": "Aksjer har gitt typisk rundt 5 prosentpoeng mer enn sikre bankinnskudd i året og premien er positiv i alle land. Det er mer enn modellene predikerer.",
"mer": "<p><b>USA 1900 til 2019 (s. 7):<\/b> nominelt aksjer 9,6 %, obligasjoner 4,9 %, veksler 3,7 %, inflasjon 2,9 % i året. Reelt: aksjer 6,5 %, obligasjoner 2,0 %, veksler 0,8 %.<\/p><p><b>Alle land (s. 8):<\/b> premien mot veksler ligger rundt 3 til 6 %, verden ca. 4,3 %.<\/p><p>Årlig standardavvik på global aksjeindeks: ca. 15 % (s. 50).<\/p><p>«Mer enn modellene predikerer» er aksjepremiegåten (Mehra og Prescott, omtalt i Choi).<\/p><p><b>Felle:<\/b> premien er avkastning <i>utover<\/i> risikofri rente, ikke totalavkastningen.<\/p>",
"kilder": [
"Aksjesparing s. 7–9",
"Aksjesparing s. 50",
"Choi s. 15"
],
"eksamen": []
},
{
"id": "aksje-premie-03",
"nivaa": "viktig",
"kan": "Kjenne de to hovedspørsmålene i aksjesparing og svarene på dem",
"kort": "Hvor mye i aksjer: Merton-andelen, justert for humankapital. Hvilke aksjer: alle bør eie markedsporteføljen (globalt indeksfond), uansett risikovilje.",
"mer": "<p>Forelesningen bygger alt på to spørsmål (s. 9):<\/p><ol><li><b>Hvor mye<\/b> bør jeg investere i aksjer? Svar: w* = (E(r) − r<sub>f<\/sub>)/(γσ<sup>2<\/sup>) og humankapitalen må telles med i formuen.<\/li><li><b>Hvilke<\/b> aksjer? Svar: markedsporteføljen. Mer risikotolerante skal <i>ikke<\/i> kjøpe mer risikable aksjer (s. 22–23), men mer av markedsporteføljen.<\/li><\/ol><p><b>Felle:<\/b> å svare at risikovillige bør velge volatile enkeltaksjer. Det er nettopp det separasjonsteoremet avviser.<\/p>",
"kilder": [
"Aksjesparing s. 9",
"Aksjesparing s. 22–23",
"Aksjesparing s. 52"
],
"eksamen": []
},
{
"id": "aksje-premie-04",
"nivaa": "detalj",
"kan": "Skille sparing fra investering slik forelesningen gjør",
"kort": "Sparing = sette penger trygt på bankkonto. Investering = plassere penger i aksjer eller andre risikable produkter med høyere forventet avkastning.",
"mer": "<p>Står bare i versjon (3) av 2026-forelesningen (s. 11) og er strøket i (4) og (6). Modellen ser bort fra alle andre investeringsmuligheter: valget er bare mellom risikofritt (bank) og aksjer.<\/p><p>Det samme oppsettet brukes i eksamensoppgavene om sparing (H2019 o9, H2022 o5): bankinnskudd mot aksjer med to scenarioer.<\/p>",
"kilder": [
"Aksjesparing s. 11"
],
"eksamen": []
}
],
"kildenotat": "Aksjesparing: kan du slå markedet? (OA, forelesning 12; s. = PDF-side i ForelesningAksjesparing2026 (3))"
},
{
"id": "pensjon-folketrygd",
"forelesning": "Næss: sparing og pensjon",
"tittel": "Folketrygden: opptjening, delingstall og levealdersjustering",
"eksamensvekt": 5,
"viktigst": [
"18,1 % av pensjonsgivende inntekt opp til 7,1 G legges til beholdningen hvert år (født 1963 eller senere)",
"Beholdningen reguleres med lønnsveksten; løpende pensjon med snittet av lønns- og prisvekst",
"Årlig pensjon = beholdning/delingstall; senere uttak gir lavere delingstall og høyere årlig pensjon",
"Levealdersjustering (2011): høyere levealder gir høyere delingstall og lavere pensjon",
"Folketrygden er forsikring mot å leve lenge: utbetales så lenge du lever"
],
"punkter": [
{
"id": "pensjon-folketrygd-01",
"nivaa": "kjerne",
"kan": "Regne årlig opptjening i folketrygden",
"kort": "Opptjening = 18,1 % × min(inntekt, 7,1 G). Lysbildet: 7,1 G ≈ 920 000 kr (2025). Med G = 136 549 kr (2026) er 7,1 G ≈ 969 500 kr og maks opptjening 175 479 kr.",
"mer": "<p>Gjelder ny opptjening for dem som er født i 1963 eller senere. <b>Avvik:<\/b> versjon (3) og (4) skriver «født etter 1963», (5) og (7) «født i eller etter 1963», som er riktig.<\/p><p>Inntekt over 7,1 G gir ingen ekstra opptjening.<\/p><p><b>H2016 o4c<\/b> (2016-tall): 7,1 × 91 740 = 651 354 per år i 30 år og 500 000 i 10 år: 3 536 852 + 905 000 = 4 441 852.<\/p><p><b>Felle:<\/b> å bruke 18,1 % av hele lønnen når den er over taket.<\/p>",
"kilder": [
"Pensjon s. 10",
"05-satser-2026",
"H2016 fasit"
],
"eksamen": [
"H2016 o4c",
"H2019 o6c"
]
},
{
"id": "pensjon-folketrygd-02",
"nivaa": "kjerne",
"kan": "Regne pensjonsbeholdningen fra ett år til det neste",
"kort": "Ny beholdning = gammel beholdning × (1 + lønnsvekst i samfunnet) + 18,1 % × min(inntekt, 7,1 G). H2019: 1 200 000 × 1,03 + 0,181 × 710 000 = 1 364 510.",
"mer": "<p>H2019 o6c: G = 100 000, så 7,1 G = 710 000. Inntekten 840 000 er over taket. Samfunnets lønnsvekst 3 %.<\/p><p><b>Feller (alternativene):<\/b><\/p><ul><li>1 236 000: bare reguleringen<\/li><li>1 260 000: regulerer med egen lønnsvekst (5 %)<\/li><li>1 328 510: opptjening uten regulering av beholdningen<\/li><\/ul><p>Beholdningen reguleres med <i>samfunnets<\/i> lønnsvekst, ikke din egen.<\/p>",
"kilder": [
"Pensjon s. 18",
"H2019 fasit"
],
"eksamen": [
"H2019 o6c"
]
},
{
"id": "pensjon-folketrygd-03",
"nivaa": "kjerne",
"kan": "Regne årlig alderspensjon med delingstall",
"kort": "Årlig pensjon = beholdning/delingstall. Født 1970 med 4 670 000 kr: uttak ved 62 (delingstall 21,15) gir ca. 221 000 kr, ved 67 (17,08) ca. 273 000 kr.",
"mer": "<p>Lysbildets eksempel (s. 19): 4 670 000/21,15 = 220 804 og 4 670 000/17,08 = 273 419, altså 24 % høyere årlig pensjon ved å vente fra 62 til 67.<\/p><p>Delingstallet uttrykker omtrent forventet antall år med pensjon. H2016: 1974-kullet 21,37 ved 62 og 17,32 ved 67; 1982-kullet 22,22 og 18,17. H2016 o4c: 4 441 852/21,37 = 207 855.<\/p><p><b>Felle:<\/b> å gange med delingstallet i stedet for å dele.<\/p>",
"kilder": [
"Pensjon s. 14",
"Pensjon s. 19",
"H2016 fasit"
],
"eksamen": [
"H2016 o4c",
"H2018 o7a"
]
},
{
"id": "pensjon-folketrygd-04",
"nivaa": "kjerne",
"kan": "Vite hva som skjer med delingstall og pensjon når man utsetter uttaket",
"kort": "Delingstallet synker og årlig utbetaling øker, fordi beholdningen fordeles på færre forventede leveår.",
"mer": "<p><b>H2025 o14:<\/b> riktig (C). Feil: (A) delingstallet øker og utbetalingen øker, (B) delingstallet øker og utbetalingen synker, (D) uendret.<\/p><p>Lysbildet (s. 14): «Man får mer hvis man velger å gå senere av med pensjon.» Prognosene (s. 16) viser at delingstallet faller med uttaksalder for hvert kull, f.eks. 1990-kullet: 23,77 ved 62, 19,71 ved 67, 17,25 ved 70 og 13,17 ved 75.<\/p><p><b>Felle:<\/b> å blande dette med levealdersjustering, der delingstallet <i>øker<\/i> for yngre kull.<\/p>",
"kilder": [
"Pensjon s. 14",
"Pensjon s. 16"
],
"eksamen": [
"H2025 o14"
]
},
{
"id": "pensjon-folketrygd-05",
"nivaa": "kjerne",
"kan": "Regne kompensasjonsgraden fra folketrygden",
"kort": "Når lønnen følger samfunnets lønnsvekst og er under 7,1 G: kompensasjonsgrad = 0,181 × antall år/delingstall. 44 år og delingstall 22 gir 36,2 %; 40 år og 18,02 gir 40,2 %.",
"mer": "<p>Fordi både beholdning og lønn vokser med samme lønnsvekst, blir beholdningen 0,181 × år × sluttlønn.<\/p><ul><li><b>H2021 o7a:<\/b> 0,181 × 40/18,02 = 40,2 %.<\/li><li><b>H2020 o5a:<\/b> 43 år: 43,2 %.<\/li><li><b>H2019 o6a:<\/b> 50 år, delingstall fra NAV-tabell: ca. 59 %.<\/li><\/ul>",
"kilder": [
"Pensjon s. 10–19"
],
"eksamen": [
"H2021 o7a",
"H2020 o5a",
"H2019 o6a"
]
},
{
"id": "pensjon-folketrygd-06",
"nivaa": "kjerne",
"kan": "Forklare levealdersjustering av delingstallet",
"kort": "Innført i pensjonsreformen 2011 (Stoltenberg-regjeringen): jo høyere forventet levealder, jo høyere delingstall og jo lavere årlig pensjon for en gitt uttaksalder.",
"mer": "<p>Begrunnelse (s. 15): pensjonssystemet koster mye, særlig når levealderen øker. Forventet gjenstående levealder ved 62 har steget kraftig siden 1900 og er høyere for kvinner (s. 17).<\/p><p>Prognoser (s. 16): delingstall ved 62 er 22,51 for 1980-kullet og 24,91 for 2000-kullet.<\/p><p><b>H2023 o10, feil alt (ii):<\/b> «høyere levealder gir høyere delingstall og <i>mer<\/i> pensjon». Høyere delingstall gir <i>mindre<\/i>.<\/p><p><b>H2016 o4g:<\/b> felles delingstall for kvinner og menn; levealdersjusteringen vises som endring fra kull til kull.<\/p>",
"kilder": [
"Pensjon s. 15–17",
"H2016 fasit"
],
"eksamen": [
"H2023 o10",
"H2016 o4g"
]
},
{
"id": "pensjon-folketrygd-07",
"nivaa": "kjerne",
"kan": "Forklare at folketrygden er en forsikring mot å leve lenge",
"kort": "To påstander kan ikke begge være sanne: «du får tilbake det du betalte inn» og «du får pensjon så lenge du lever». Folketrygden gir det siste, så den forsikrer mot levetidsrisiko.",
"mer": "<p>De som lever lenge får mer utbetalt, de andre mindre (s. 20). Den favoriserer altså grupper som lever lenge.<\/p><p><b>H2023 o10:<\/b> riktig (i) beskytter mot risikoen ved å leve lenge. Feil: (iii) grupper som lever kortere får mer, (iv) frivillig og derfor uten skjevt utvalg (folketrygden er ikke frivillig).<\/p><p>Ville forsikringsargumentet virket frivillig? Nei (s. 22): da ville bare de som venter å leve lenge bli med (ugunstig utvalg).<\/p>",
"kilder": [
"Pensjon s. 11–13",
"Pensjon s. 20–22"
],
"eksamen": [
"H2023 o10"
]
},
{
"id": "pensjon-folketrygd-08",
"nivaa": "viktig",
"kan": "Forklare hvordan pensjonen reguleres før og etter uttak",
"kort": "Før uttak reguleres beholdningen med gjennomsnittlig lønnsvekst. Under utbetaling reguleres pensjonen med gjennomsnittet av lønns- og prisveksten, som normalt gir lavere vekst enn lønningene når reallønnen øker.",
"mer": "<p>Lysbildet (s. 18). I 2026 økte G med 4,91 % og løpende alderspensjon med 4,69 % (05-satser).<\/p><p><b>Avvik:<\/b> en 2025-versjon av forelesningen nevnte «lønnsvekst minus 0,75 prosentpoeng», som var regelen 2011 til 2021. 2026-lysbildene bruker snittet av lønns- og prisvekst, som er gjeldende regel.<\/p><p>H2016 o4g kaller dette underregulering.<\/p>",
"kilder": [
"Pensjon s. 18",
"05-satser-2026",
"03-forelesninger-finans"
],
"eksamen": []
},
{
"id": "pensjon-folketrygd-09",
"nivaa": "viktig",
"kan": "Forklare hvorfor høyere egen lønnsvekst gir lavere kompensasjonsgrad",
"kort": "Vokser egen lønn raskere enn samfunnets, er de tidlige årene lave i forhold til sluttlønnen, så beholdningen blir mindre i forhold til sluttlønn: kompensasjonsgraden blir alltid lavere.",
"mer": "<p>H2019 o6b: riktig (2) alltid lavere. Beholdningen reguleres bare med samfunnets lønnsvekst, mens sluttlønnen har vokst raskere.<\/p><p><b>Feller:<\/b> «høyere», «likt», eller at det bare gjelder under eller over 7,1 G.<\/p><p><b>Eksempel:<\/b> to personer med samme sluttlønn. Den som startet lavt og hadde rask lønnsvekst, har mindre beholdning enn den som har fulgt den generelle lønnsveksten hele veien.<\/p>",
"kilder": [
"Pensjon s. 18",
"H2019 fasit"
],
"eksamen": [
"H2019 o6b"
]
},
{
"id": "pensjon-folketrygd-10",
"nivaa": "viktig",
"kan": "Forklare fleksibelt og nøytralt uttak",
"kort": "Alderspensjon kan tas ut fra 62 år og jo senere uttak, jo høyere årlig pensjon. Nøytralt uttak: forventet nåverdi av samlede utbetalinger skal være uavhengig av uttaksalder.",
"mer": "<p>Delingstallstabellen (s. 16) går fra 62 til 75 år. AFP kan også tas ut fra 62 (s. 32).<\/p><p>H2016 o4g: nøytralt uttak vises i forskjellene i delingstall mellom uttaksaldre innen samme kull; levealdersjusteringen i forskjellene mellom kull.<\/p><p>Fra 1964-kullet heves nedre aldersgrense med ca. én måned per kull (pensjonsforliket 2024, 05-satser). Ikke i lysbildene.<\/p><p><b>Felle:<\/b> å tro at tidlig uttak gir mer totalt. I forventning er det omtrent likt.<\/p>",
"kilder": [
"Pensjon s. 14",
"Pensjon s. 16",
"H2016 fasit",
"05-satser-2026"
],
"eksamen": [
"H2016 o4g",
"H2025 o14"
]
},
{
"id": "pensjon-folketrygd-11",
"nivaa": "detalj",
"kan": "Vite hvordan omsorgsopptjening fungerer",
"kort": "Den som mottar barnetrygd for et barn under skolealder får opptjening som om inntekten var 4,5 G, men ikke i tillegg for egen inntekt under 4,5 G.",
"mer": "<p>H2016 o4f (gjesteforeleser i trygderett): Ina får 4,5 G × 18,1 % = 412 830 × 0,181 = 74 722 kr per år i pensjonsbeholdningen (2016-G). Gjelder til og med året barnet fyller 5 år.<\/p><p>Ikke i 2026-lysbildene. Poenget er at folketrygden også gir opptjening for ulønnet omsorgsarbeid.<\/p>",
"kilder": [
"H2016 fasit"
],
"eksamen": [
"H2016 o4f"
]
},
{
"id": "pensjon-folketrygd-12",
"nivaa": "detalj",
"kan": "Vite at folketrygden har et minstenivå for dem med lav opptjening",
"kort": "Folketrygden har også en garantipensjon (minstenivå) for dem med lav eller ingen opptjening. Den er ikke omtalt i 2026-lysbildene eller i eksamenene.",
"mer": "<p>Står ikke i kildene. Tatt med bare fordi den hører til folketrygden. Er det et spørsmål om den, holder det å vite at alderspensjonen består av inntektspensjon (beholdning/delingstall) og at de med lite opptjening får et minstenivå.<\/p><p>Prioriter opptjening, delingstall og levealdersjustering, som er testet mange ganger.<\/p>",
"kilder": [
"Ikke i kildene"
],
"eksamen": []
}
],
"kildenotat": "Pensjonssparing (OA, forelesning 13; s. = PDF-side i ForelesningPensjon (5), 24. september 2026)"
},
{
"id": "pensjon-tjeneste",
"forelesning": "Næss: sparing og pensjon",
"tittel": "Tjenestepensjon: OTP, innskudd og ytelse, jobbytte og AFP",
"eksamensvekt": 4,
"viktigst": [
"Alle bedrifter må ha tjenestepensjon: minst 2 % av lønn opp til 12 G (OTP); noen gir 7 %",
"Innskudd: arbeidsgiver sparer en fast andel, du velger risikoprofil og bærer risikoen; arves ved død",
"Ytelse: avtalt andel av lønnen i pensjon, arbeidsgiver bærer risikoen; fripolise ved jobbytte",
"Privat: 9 av 10 har innskudd, utbetaling minst 10 år; offentlig: kombinert ordning, livsvarig",
"Innskuddspensjon er den delen av pensjonsformuen som er mest utsatt for aksjemarkedet"
],
"punkter": [
{
"id": "pensjon-tjeneste-01",
"nivaa": "kjerne",
"kan": "Vite minstekravet til obligatorisk tjenestepensjon",
"kort": "Alle bedrifter er pålagt en pensjonsordning for de ansatte på minimum 2 % av lønn opp til 12 G. Noen bedrifter setter av 7 %.",
"mer": "<p>Lysbildet (s. 24 til 25). 12 G i 2026 = 12 × 136 549 = 1 638 588 kr, så minsteinnskuddet er maks ca. 32 800 kr per år.<\/p><p>Fra 05-satser (ikke i lysbildene): kravet gjelder fra første krone siden 2022. Maks innskudd er 7 % av lønn opp til 12 G pluss 18,1 % av lønn mellom 7,1 og 12 G (H2018 brukte eldre regler: 7 % og 25 %).<\/p><p>TV2-saken (s. 25): unge tenker lite på forskjellen mellom 2 % og 7 %, men den kan utgjøre millioner.<\/p>",
"kilder": [
"Pensjon s. 24–25",
"05-satser-2026"
],
"eksamen": []
},
{
"id": "pensjon-tjeneste-02",
"nivaa": "kjerne",
"kan": "Skille innskuddspensjon fra ytelsespensjon",
"kort": "Innskudd: arbeidsgiver sparer en viss andel av lønnen (et fast beløp) for deg og du bestemmer investeringene. Ytelse: du får avtale om en viss andel av lønnen i pensjon og arbeidsgiver må sørge for det.",
"mer": "<p><b>H2024 o13a:<\/b> riktig (2) innskudd = arbeidsgiver sparer et fast beløp, ytelse = garantert utbetaling. Feil: (1) omvendt, (3) ytelse obligatorisk, (4) privat mot offentlig.<\/p><p><b>H2018 o7b<\/b> (tabell fra forelesning): ytelse er garantert, har dødelighetsarv, gir fripolise og livsvarig utbetaling; innskudd er ikke garantert, har investeringsvalg, gir pensjonskapitalbevis og avkastning lik finansavkastningen.<\/p>",
"kilder": [
"Pensjon s. 24",
"H2018 fasit"
],
"eksamen": [
"H2024 o13a",
"H2025 o17",
"H2018 o7b"
]
},
{
"id": "pensjon-tjeneste-03",
"nivaa": "kjerne",
"kan": "Vite hvem som bærer risikoen i innskudds- og ytelsespensjon",
"kort": "Innskuddspensjon gir mer risiko for arbeidstaker, fordi pensjonen avhenger av hvordan investeringene utvikler seg. I ytelsespensjon bærer arbeidsgiver risikoen.",
"mer": "<p><b>H2019 o6e, feil alt (4):<\/b> «innskuddspensjon gir mer risiko for arbeidsgiver».<\/p><p><b>Avvik:<\/b> 2024-versjonen av forelesningen sa feilaktig «mer risiko for arbeidsgiver»; rettet til arbeidstaker fra 2025.<\/p>",
"kilder": [
"Pensjon s. 24",
"03-forelesninger-finans"
],
"eksamen": [
"H2019 o6e"
]
},
{
"id": "pensjon-tjeneste-04",
"nivaa": "viktig",
"kan": "Vite hva man kan velge selv i en innskuddspensjon",
"kort": "Du kan normalt velge og endre risikoprofil og forvaltning. Pengene kan ikke tas ut før pensjonsalder og arbeidsgiver garanterer ikke en andel av sluttlønnen.",
"mer": "<p><b>H2025 o17:<\/b> riktig (B). Feil: (A) garantert andel av sluttlønn (det er ytelse), (C) uttak når som helst ved behov for likviditet, (D) kollektiv forvaltning uten individuelle valg.<\/p><p>Standardprofil er ofte 50 % aksjer og 50 % renter, men unge bør gjerne ha høyere aksjeandel (s. 26, NRK: endrer du risikoen kan du sikre deg mer pensjon uten å spare mer).<\/p>",
"kilder": [
"Pensjon s. 24",
"Pensjon s. 26"
],
"eksamen": [
"H2025 o17"
]
},
{
"id": "pensjon-tjeneste-05",
"nivaa": "viktig",
"kan": "Vite at innskuddspensjon arves og hvor lenge tjenestepensjon utbetales",
"kort": "Innskuddspensjon arves av etterlatte ved dødsfall. Privat tjenestepensjon betales ut i minst 10 år, offentlig tjenestepensjon resten av livet.",
"mer": "<p>Lysbildene (s. 24 og 27).<\/p><p><b>H2019 o6e:<\/b> riktig (1): utbetalingen fra innskuddspensjon opphører 10 til 15 år etter pensjonsalder og gir derfor dårligere dekning enn ytelsespensjon mot «risikoen» for å leve lenge. Feil: ytelse gir høyere forventet avkastning; forsikringsselskapet velger investeringene i innskudd.<\/p><p>Arv og ingen dødelighetsarv henger sammen: i ytelsespensjon finansierer de som dør tidlig pensjonen til dem som lever lenge.<\/p>",
"kilder": [
"Pensjon s. 24",
"Pensjon s. 27",
"H2019 fasit"
],
"eksamen": [
"H2019 o6e"
]
},
{
"id": "pensjon-tjeneste-06",
"nivaa": "viktig",
"kan": "Sammenligne offentlig og privat tjenestepensjon",
"kort": "Privat sektor: 9 av 10 har innskuddspensjon og ordningen varierer mellom bedrifter. Offentlig sektor: kombinert løsning (elementer av ytelse og innskudd), en ferdig pakke som betales livet ut.",
"mer": "<p>Lysbildet (s. 27).<\/p><p><b>Felle:<\/b> «ytelsespensjon er bare for private og innskudd for offentlige» (H2024 o13a alt 4). Det er omtrent motsatt: innskudd dominerer i privat sektor.<\/p><p>H2018 o7: sykepleier (offentlig) får trolig ytelsespensjon, eiendomsmegler (privat) innskuddspensjon.<\/p><p>Offentlig tjenestepensjon er altså tryggere og mer forutsigbar for den ansatte.<\/p>",
"kilder": [
"Pensjon s. 27",
"H2018 fasit"
],
"eksamen": [
"H2018 o7b"
]
},
{
"id": "pensjon-tjeneste-07",
"nivaa": "viktig",
"kan": "Vite hva som skjer med tjenestepensjonen når man bytter jobb",
"kort": "Innskudd: du får et pensjonskapitalbevis, som normalt samles på egen pensjonskonto. Privat ytelse: fripolise (krever minst 12 måneders medlemskap). Offentlig: du beholder rettighetene og jobbskifte innen offentlig sektor ses i sammenheng.",
"mer": "<p>Lysbildet (s. 28 til 30): den gamle arbeidsgiverens innbetalinger stopper.<\/p><ul><li>Du kan velge leverandør for egen pensjonskonto, men fripoliser og offentlig tjenestepensjon inngår ikke på den kontoen<\/li><li>Du kan reservere deg mot sammenslåing<\/li><li>norskpensjon.no gir oversikt over alle pensjonsavtaler<\/li><\/ul><p><b>Felle:<\/b> å tro at opptjent pensjon forsvinner ved jobbytte. Den beholdes, men innbetalingene stopper.<\/p>",
"kilder": [
"Pensjon s. 28–30"
],
"eksamen": []
},
{
"id": "pensjon-tjeneste-08",
"nivaa": "viktig",
"kan": "Regne sluttverdi og kompensasjonsgrad for en innskuddspensjon",
"kort": "Sluttverdi = saldo × (1 + r)^T + årlig innskudd × ((1 + r)^T − 1)/r. Årlig utbetaling = sluttverdi fordelt som annuitet over 10 år. Kompensasjonsgrad = utbetaling/sluttlønn.",
"mer": "<p>H2020 o5 og H2021 o7 (tall avhenger av kandidatnummer). Eksempel med r = 3 %: saldo 100 000, innskudd 2 % av 500 000 = 10 000 i 22 år.<\/p><ul><li>Sluttverdi: 100 000 × 1,03<sup>22<\/sup> + 10 000 × (1,03<sup>22<\/sup> − 1)/0,03 ≈ 496 978<\/li><li>Utbetaling over 10 år: 496 978 × 0,03/(1 − 1,03<sup>−10<\/sup>) ≈ 58 261<\/li><li>Kompensasjonsgrad: 58 261/500 000 ≈ 11,7 %<\/li><\/ul><p>Total pensjon = folketrygd (ca. 40 %) + tjenestepensjon.<\/p><p><b>Felle:<\/b> å dele sluttverdien på 10 uten å ta med avkastning i utbetalingsperioden.<\/p>",
"kilder": [
"H2020 sensorveiledning",
"H2021 sensorveiledning"
],
"eksamen": [
"H2021 o7b",
"H2021 o7c",
"H2021 o7d",
"H2020 o5b",
"H2020 o5c",
"H2020 o5d"
]
},
{
"id": "pensjon-tjeneste-09",
"nivaa": "detalj",
"kan": "Kjenne avtalefestet pensjon (AFP)",
"kort": "AFP er knyttet til arbeidsforhold og tariffavtaler. For dem født 1963 eller senere gir den et livsvarig tillegg, kan tas ut fra 62 år og kombineres med arbeid uten avkorting. Bytter du til en arbeidsgiver uten AFP før uttak, kan du miste retten.",
"mer": "<p>Lysbildene (s. 31 til 35). Ikke alle private arbeidsgivere har AFP. Noen vilkår gjelder ved 62 år, andre når uttaket starter. For dem født 1962 eller tidligere er offentlig AFP en tidligpensjon fra 62 til 67 år med avkorting mot arbeidsinntekt.<\/p><p><b>Avvik:<\/b> AFP-lysbildene står i versjon (3), (4) og (5), men er fjernet i (7) fra 30. september 2026. Derfor lav prioritet.<\/p><p>H2016 o4e: skatt på AFP med høy lønn ga 59 % marginalskatt (2016-satser).<\/p>",
"kilder": [
"Pensjon s. 31–35",
"H2016 fasit"
],
"eksamen": [
"H2016 o4e"
]
}
],
"kildenotat": "Pensjonssparing (OA, forelesning 13; s. = PDF-side i ForelesningPensjon (5), 24. september 2026)"
},
{
"id": "pensjon-ips",
"forelesning": "Næss: sparing og pensjon",
"tittel": "Individuell sparing: IPS, BSU, bolig og skatt på pensjon",
"eksamensvekt": 3,
"viktigst": [
"Individuell pensjonssparing er stort sett som annen sparing: alt flytter penger til fremtiden",
"IPS: fradrag nå og skatt ved uttak (rentefritt lån fra staten) + fritak for formuesskatt; maks 25 000 kr (2026); bundet til pensjonsalder",
"BSU: under 34 år og ikke boligeier, 10 % fradrag (27 500 kr gir 2 750 kr)",
"Bolig er pensjonssparing: skattefordeler og avdragskrav; mye av sparingen skjer som avdrag"
],
"punkter": [
{
"id": "pensjon-ips-01",
"nivaa": "kjerne",
"kan": "Forklare skattefordelene ved IPS",
"kort": "IPS gir utsatt skatt (fradrag ved innskudd, skatt ved uttak), som virker som et rentefritt lån fra staten. I tillegg slipper du formuesskatt på det investerte beløpet. Maks 25 000 kr per år i 2026.",
"mer": "<p><b>H2024 o13b:<\/b> riktig (2). Feil: (1) som BSU pluss formuesskattefritak, (3) uttak ved 35 år til bolig, (4) fritak for formuesskatt på hele formuen.<\/p><p><b>Avvik:<\/b> versjon (3) og (4) av lysbildet sier maks 15 000 kr (regelen til og med 2025); (5) og (7) sier 25 000 kr, som gjelder fra 2026 (også Kvadsheim lb 51). Skattefordel ved fullt innskudd: 25 000 × 22 % = 5 500 kr.<\/p><p><b>Felle:<\/b> fordelen er ikke en lavere skattesats, men utsettelsen og formuesskattefritaket.<\/p>",
"kilder": [
"Pensjon s. 38",
"Kvadsheim lb 51",
"05-satser-2026"
],
"eksamen": [
"H2024 o13b",
"H2018 o7c"
]
},
{
"id": "pensjon-ips-02",
"nivaa": "viktig",
"kan": "Kjenne ulempene ved IPS",
"kort": "Pengene er bundet til pensjonsalder og produktene har ofte høyere gebyrer. Bindingen kan likevel være en fordel for den som ellers sparer for lite.",
"mer": "<p>Lysbildet (s. 38): «Men samtidig binder du pengene til pensjonsalder.»<\/p><p>H2018 o7c (fasit): fordeler er utsatt skatt og ingen formuesskatt; ulemper er binding og høyere gebyrer eller lavere avkastning. Bindingen kan være en fordel ved irrasjonell atferd (nåtidsskjevhet).<\/p><p>Kvadsheim (lb 52) nevner også kostnader, lav avkastning i utbetalingsperioden og politisk usikkerhet.<\/p>",
"kilder": [
"Pensjon s. 38",
"H2018 fasit",
"Kvadsheim lb 52"
],
"eksamen": [
"H2018 o7c"
]
},
{
"id": "pensjon-ips-03",
"nivaa": "viktig",
"kan": "Forklare at individuell pensjonssparing stort sett er som annen sparing",
"kort": "Det er små forskjeller: å kjøpe aksjer, sette penger i banken eller betale ned lån er alle måter å flytte penger til fremtiden. Unntaket er ordninger med skattefordeler som IPS.",
"mer": "<p>Lysbildet (s. 37 til 38). Generelt er investeringer med skattefordeler ofte de mest lønnsomme (s. 42).<\/p><p><b>Avvik:<\/b> versjon (3) og (4) sier «de mest lønnsomme», (5) og (7) «ofte de mest lønnsomme».<\/p><p>Konsekvens: spør ikke «pensjonssparing eller ikke?», men «hvor gir sparingen best avkastning etter skatt?»<\/p>",
"kilder": [
"Pensjon s. 37–38",
"Pensjon s. 42"
],
"eksamen": []
},
{
"id": "pensjon-ips-04",
"nivaa": "viktig",
"kan": "Kjenne reglene for BSU",
"kort": "For deg under 34 år som ikke eier bolig: 10 % skattefradrag, så 27 500 kr i innskudd gir 2 750 kr i fradrag. Ordningen er gjort mindre lønnsom.",
"mer": "<p>Lysbildet (s. 42). Fra 05-satser: maks 27 500 per år og 300 000 samlet, til og med året du fyller 33. Midlene må brukes til bolig.<\/p><p><b>Felle (H2024 o13b alt 1):<\/b> «IPS fungerer som BSU». BSU gir fradrag i skatt (10 % av innskuddet), mens IPS gir fradrag i alminnelig inntekt med skatt ved uttak.<\/p>",
"kilder": [
"Pensjon s. 42",
"05-satser-2026"
],
"eksamen": [
"H2024 o13b"
]
},
{
"id": "pensjon-ips-05",
"nivaa": "viktig",
"kan": "Forklare at boligkjøp er pensjonssparing og at mye sparing skjer som avdrag",
"kort": "Bolig har mange skattefordeler og strenge avdragskrav tvinger fram sparing. Husholdningene sparer mer gjennom avdrag på lån enn i bank, fond og aksjer.",
"mer": "<p>Lysbildet (s. 42): kjøp av bolig er også pensjonssparing, spesielt fordi det er strenge krav om avdrag.<\/p><p><b>SSB-tabell (s. 41), snitt per år:<\/b> samlet sparing 40 000 kr, hvorav 14 000 som avdrag og bare 2 000 i bank, fond og aksjer. For 30 til 59 år: 48 000, hvorav 26 000 avdrag. Sparing utgjør ca. 9,4 % av inntekt etter skatt.<\/p><p>Mange blir pensjonister uten privat pensjonssparing, men har spart gjennom boligen.<\/p>",
"kilder": [
"Pensjon s. 40–42"
],
"eksamen": []
},
{
"id": "pensjon-ips-06",
"nivaa": "detalj",
"kan": "Vite hvordan pensjon skattlegges",
"kort": "Pensjon er personinntekt med lavere trygdeavgift (5,1 %) enn lønn (7,6 % i 2026) og et eget skattefradrag for pensjonsinntekt (maks 37 100 kr i 2026). IPS-uttak skattlegges som alminnelig inntekt (22 %).",
"mer": "<p>Ikke i OA-lysbildene. <b>H2016 o4d<\/b> (2016-satser): pensjon 207 855 kr gir trygdeavgift 5,1 %, trinnskatt 10,7 %, 25 % på alminnelig inntekt minus skattefradrag: 58 452 kr (28,1 %).<\/p><p><b>H2016 o4e:<\/b> AFP oppå høy lønn og full alderspensjon gir marginalskatt ca. 59 %, fordi skattefradraget for pensjon trappes ned.<\/p><p>2026-satsene er fra 05-satser, ikke fra forelesningene.<\/p>",
"kilder": [
"H2016 fasit",
"05-satser-2026"
],
"eksamen": [
"H2016 o4d",
"H2016 o4e"
]
}
],
"kildenotat": "Pensjonssparing (OA, forelesning 13; s. = PDF-side i ForelesningPensjon (5), 24. september 2026)"
},
{
"id": "pensjon-system",
"forelesning": "Næss: sparing og pensjon",
"tittel": "Pensjonssystemet: tre pilarer og hvorfor staten hjelper til",
"eksamensvekt": 2,
"viktigst": [
"Tre pilarer: folketrygden (I), arbeidsgiverfinansiert tjenestepensjon (II), individuell sparing (III)",
"Folketrygden er pay-as-you-go og innskuddsbasert; tjenestepensjon mest fondert; egen sparing fondert",
"Stat og arbeidsgiver hjelper til fordi folk kanskje ikke er langsiktige nok og fordi pensjon også er forsikring",
"Folketrygden er den klart største delen av pensjonsformuen"
],
"punkter": [
{
"id": "pensjon-system-01",
"nivaa": "viktig",
"kan": "Kjenne de tre pilarene i pensjonssystemet",
"kort": "Pilar I folketrygden, pilar II arbeidsgiverfinansierte ordninger (tjenestepensjon) og pilar III individuelle ordninger (egen sparing). De kalles ofte tre «bøtter» man putter penger i.",
"mer": "<p>Oversikt over tre pilarer (Døskeland kap 11, gjengitt på s. 7):<\/p><table><tr><th>Pilar<\/th><th>Aktører<\/th><th>Fondert?<\/th><th>Ytelse eller innskudd?<\/th><\/tr><tr><td>Folketrygden<\/td><td>Staten og individ<\/td><td>Pay-as-you-go<\/td><td>Innskuddsbasert<\/td><\/tr><tr><td>Tjenestepensjon<\/td><td>Arbeidsgiver, arbeider og forvalter<\/td><td>Mest fondert<\/td><td>Begge, snart mest innskudd<\/td><\/tr><tr><td>Egen sparing<\/td><td>Individ og forvalter<\/td><td>Fondert<\/td><td>Innskuddsbasert<\/td><\/tr><\/table><p>Alderspensjon er sparing og noe forsikring; myndighetene gir skattemotiverte insentiver (s. 6).<\/p>",
"kilder": [
"Pensjon s. 6–8"
],
"eksamen": []
},
{
"id": "pensjon-system-02",
"nivaa": "viktig",
"kan": "Definere fondert, pay-as-you-go og innskuddsbasert",
"kort": "Fondert: penger settes til side for å møte fremtidige forpliktelser. Pay-as-you-go: myndighetene betaler dagens pensjonister med bidrag fra dagens arbeidstakere. Innskuddsbasert: det du får tilbake avhenger av det du setter inn.",
"mer": "<p>Folketrygden er altså innskuddsbasert (opptjeningen bygger en beholdning) uten å være fondert (pengene betales ut til dagens pensjonister).<\/p><p><b>Felle:<\/b> å tro at «innskuddsbasert» betyr «fondert». Folketrygden er det første, men ikke det andre.<\/p><p>Merk at innskuddsbasert her ikke betyr at du får tilbake akkurat det du betalte inn: folketrygden utbetales så lenge du lever (forsikring).<\/p>",
"kilder": [
"Pensjon s. 7"
],
"eksamen": []
},
{
"id": "pensjon-system-03",
"nivaa": "viktig",
"kan": "Forklare hvorfor stat og arbeidsgiver blander seg i pensjonssparingen",
"kort": "Kanskje fordi man ikke stoler på at folk er rasjonelle og langsiktige og fordi pensjon er en kombinasjon av sparing og forsikring (mot å leve lenge).",
"mer": "<p>Lysbildet (s. 3 til 5): ifølge livssyklusmodellen skal man spare når man arbeider. Men for pensjon hjelper stat og arbeidsgiver, mens folk ellers må ta ansvar for egne finansielle valg.<\/p><p>Forsikringsdelen fungerer dårlig frivillig (ugunstig utvalg), se folketrygden som forsikring.<\/p><p>Nåtidsskjevhet (Lån og Psykologi) er den atferdsøkonomiske grunnen til å tvinge fram sparing; nudging med standardvalg er en mildere variant.<\/p>",
"kilder": [
"Pensjon s. 3–5",
"Pensjon s. 20–22"
],
"eksamen": [
"H2023 o10"
]
},
{
"id": "pensjon-system-04",
"nivaa": "detalj",
"kan": "Kjenne størrelsen på pilarene",
"kort": "SSB 2017, snitt per person: pensjonsformue 2 888 000 kr, hvorav folketrygd 2 367 000, offentlig tjenestepensjon 329 000, privat tjenestepensjon 183 000 og individuell sparing 9 000.",
"mer": "<p>Folketrygden utgjør over 80 % av pensjonsformuen (s. 8). Kvinner har mer offentlig tjenestepensjon (396 000 mot 262 000 for menn), menn mer privat (251 000 mot 115 000). Pensjonsformuen er størst for 62 til 71 år (5 245 000).<\/p>",
"kilder": [
"Pensjon s. 8"
],
"eksamen": []
},
{
"id": "pensjon-system-05",
"nivaa": "detalj",
"kan": "Vite at nordmenn kan lite om pensjon",
"kort": "Nettavisen: tre av fire vet ikke hva de får i pensjon, én av fire sparer til pensjon og én av fem tror det blir en økonomisk utfordring å leve til 100 år.",
"mer": "<p>Lysbildet (s. 39) brukes til å underbygge at pensjon er komplisert og at folk sjelden tar aktive valg. Det henger sammen med argumentene for obligatoriske ordninger, standardvalg og nudging (Psykologi s. 49).<\/p><p>Det passer også med funnene om svak finansiell kunnskap (Big 3) i psykologiforelesningen.<\/p>",
"kilder": [
"Pensjon s. 39",
"Psykologi s. 49"
],
"eksamen": []
}
],
"kildenotat": "Pensjonssparing (OA, forelesning 13; s. = PDF-side i ForelesningPensjon (5), 24. september 2026)"
},
{
"id": "kvadsheim-gjeld",
"forelesning": "Kvadsheim: hvordan bør vi spare og låne?",
"tittel": "Gjeld, regulering og inkasso",
"eksamensvekt": 1,
"viktigst": [
"Norske husholdninger skylder ca. 4 758 mrd. kr, av det 4 000 mrd. i boliggjeld",
"Norge har høy gjeld i forhold til inntekt og mye flytende rente: lånekundene «lever farlig»",
"2019: forbrukslånsforskriften (maks 5 × inntekt, stresstest, maks 5 års løpetid) og Gjeldsregisteret",
"Bankene sjekker sikkerhet (10 % egenkapital), betalingsevne (maks 5 × inntekt) og betalingsvilje"
],
"punkter": [
{
"id": "kvadsheim-gjeld-01",
"nivaa": "viktig",
"kan": "Kjenne størrelsen på og sammensetningen av husholdningenes gjeld",
"kort": "Ca. 4 758 mrd. kr: 4 000 mrd. boliggjeld, 300 mrd. studiegjeld, 200 mrd. billån, 176 mrd. forbruksgjeld og 133 mrd. i inkasso. Gjeldsgraden er svært høy, men fallende.",
"mer": "<p>Boliggjelden dominerer. Merk at postene summerer seg til 4 809 mrd., litt over totalen på lysbildet, trolig fordi kategoriene overlapper (inkasso kan gjelde lån i de andre postene). Bruk totalen 4 758 mrd. hvis det spørres om samlet gjeld.<\/p><p><b>Felle:<\/b> å tro at forbruksgjeld er den største posten. Den er liten i kroner, men dyr i rente.<\/p>",
"kilder": [
"Kvadsheim lb 5"
],
"eksamen": []
},
{
"id": "kvadsheim-gjeld-02",
"nivaa": "viktig",
"kan": "Forklare hvorfor norske lånekunder er særlig sårbare",
"kort": "Norge har både svært høy husholdningsgjeld i forhold til disponibel inntekt (rundt 240 %, avlest fra figuren) og en svært høy andel boliglån med flytende rente. Kombinasjonen gjør husholdningene sårbare for renteøkninger.",
"mer": "<p>OECD-figuren (BCA Research 2023) plasserer Norge i hjørnet «more vulnerable» sammen med Australia, Sverige og Finland. Land som USA, Tyskland og Frankrike har lavere gjeld og mest fastrente. Lysbildets budskap: «I Norge lever lånekundene farlig.»<\/p><p><b>Felle:<\/b> å tro at høy gjeld alene avgjør sårbarheten. Andelen flytende rente er den andre aksen.<\/p>",
"kilder": [
"Kvadsheim lb 6"
],
"eksamen": []
},
{
"id": "kvadsheim-gjeld-03",
"nivaa": "viktig",
"kan": "Kjenne reguleringen av forbrukslån",
"kort": "2007–2017 var «vill vest», i 2017 kom strengere retningslinjer, markedsføringsregler og krav til kredittkortfakturering. I 2019 kom forbrukslånsforskriften (maks 5 × inntekt, stresstest og maks 5 års løpetid) og Gjeldsregisteret.",
"mer": "<p>Gjeldsregisteret gir bankene oversikt over usikret gjeld (forbrukslån og kredittkort), slik at de kan vurdere samlet gjeld før nye lån. Kvadsheim kaller det «ti år med ingenting, to år med tiltak».<\/p><p><b>Felle:<\/b> å blande forbrukslånsforskriften med boliglånsforskriften. Løpetidskravet på 5 år gjelder forbrukslån.<\/p>",
"kilder": [
"Kvadsheim lb 7"
],
"eksamen": []
},
{
"id": "kvadsheim-gjeld-04",
"nivaa": "viktig",
"kan": "Vite hva bankene sjekker ved lånesøknad",
"kort": "(1) Sikkerhet: 10 % egenkapital, (2) betalingsevne: maks 5 ganger inntekten og (3) betalingsvilje: ingen betalingsanmerkninger.",
"mer": "<p>Betalingsanmerkninger og inkassosaker stenger i praksis for nye lån. Derfor er rådet å få oversikt tidlig og aldri misligholde boliglånet. Kravet til 10 % egenkapital tilsvarer en belåningsgrad på maks 90 %.<\/p><p><b>Felle:<\/b> å svare at bankene bare ser på inntekt.<\/p>",
"kilder": [
"Kvadsheim lb 13"
],
"eksamen": []
},
{
"id": "kvadsheim-gjeld-05",
"nivaa": "detalj",
"kan": "Kjenne inkassocaset og rådene for å løse gjeldsproblemer",
"kort": "Per (39) tjener 760 000 kr, leier for 9 000 kr og har 170 000 kr i studielån, men 1 446 321 kr i inkasso (2025) fra kredittkort, handlekonto, billån og forbrukslån 2018–2022. Råd: skaff oversikt, snakk med banken, ikke mislighold boliglånet, selg noe eller lag nedbetalingsplan, forenkle kontostrukturen og vurder frivillig kredittsperre.",
"mer": "<p>Oversikt finnes på Inkassoregisteret.no og Gjeldsregisteret.no. Inkassokravene har renter fra 12,25 % til 24 % og renter og omkostninger utgjør en stor del av saldoen. Et eksempelbudsjett for én voksen mann (30–50 år) i Oslo i 2026 gir et samlet månedlig forbruk på 12 909 kr. Poenget: høy inntekt beskytter ikke mot gjeldsproblemer.<\/p><p><b>Felle:<\/b> å tro at inkasso først og fremst rammer lavinntektsgrupper.<\/p>",
"kilder": [
"Kvadsheim lb 8–12"
],
"eksamen": []
}
]
},
{
"id": "kvadsheim-sparing",
"forelesning": "Kvadsheim: hvordan bør vi spare og låne?",
"tittel": "Hvordan spare: buffer, dyr gjeld, risiko og tålmodighet",
"eksamensvekt": 1,
"viktigst": [
"Først bufferkonto (1–2 månedslønner), så nedbetale dyr gjeld (billån, forbrukslån, kredittkort), studielån sist",
"Realrente etter skatt på sparekonto: 3,50 % − 0,77 % − 3,00 % = −0,27 %",
"Sparemål gir tidshorisont og horisont pluss risikovilje gir «riktig» fond",
"Tålmodighet: globale aksjer har aldri gitt negativ årlig snittavkastning over 15 eller 20 år (1970–2022)",
"Vanlige nordmenn har allerede mye «sikkert» (bolig og folketrygd) og kan ta høyere risiko i fri sparing"
],
"punkter": [
{
"id": "kvadsheim-sparing-01",
"nivaa": "viktig",
"kan": "Regne realrenten etter skatt på en sparekonto",
"kort": "3,50 % rente − 0,77 % skatt (22 % av 3,50) − 3,00 % inflasjon = −0,27 % realrente etter skatt.",
"mer": "<p>Poenget: med inflasjon på nivå med renten taper man kjøpekraft på sparekonto etter skatt. Til sammenligning gir null risiko: bankinnskudd med garanti inntil 2 mill. kr, flytende rente 3–5 %, fastrenteinnskudd 4–5 % og BSU 6–7 %.<\/p><p><b>Felle:<\/b> å trekke 22 % fra hele renten som prosentpoeng (3,50 − 22). Skatten er 22 % av renten: 0,77 prosentpoeng.<\/p>",
"kilder": [
"Kvadsheim lb 25–26"
],
"eksamen": []
},
{
"id": "kvadsheim-sparing-02",
"nivaa": "viktig",
"kan": "Kjenne rekkefølgen: buffer, dyr gjeld og så fondssparing",
"kort": "Fyll opp en bufferkonto for uforutsette utgifter (1–2 månedslønner på separat konto uten kort). Kvitt deg med billån, forbrukslån og kredittkort først, spar studielånet til slutt.",
"mer": "<p>Bufferen skal dekke vannlekkasje, bilberging og tannlege. Rådet om å skjule kontoen er «lur deg selv». Lysbildet om dyre lån viser også «boliglån: 60–75 %», plassert mellom dyr gjeld og studielån i prioriteringen. Studielån har lav rente og gunstige vilkår, derfor sist.<\/p><p><b>Felle:<\/b> å betale ned studielån før kredittkortgjeld.<\/p>",
"kilder": [
"Kvadsheim lb 23–24"
],
"eksamen": []
},
{
"id": "kvadsheim-sparing-03",
"nivaa": "viktig",
"kan": "Gjengi de fire rådene for å lykkes med sparing og koble horisont til fondstype",
"kort": "(1) Finn sparemålet (det gir motivasjon og tidshorisont), (2) finn risikoviljen, (3) lur deg selv og (4) «time in the market beats timing the market». Kort horisont eller lav risikovilje gir rentefond, lang horisont med middels eller høy risikovilje gir aksjefond.",
"mer": "<p>Eksempler på horisont: bil og bryllup 1–2 år, oppussing 0–2 år, hytte 2–5 år, bolig 3–5 år, barn 15–20 år og pensjon 10–35 år. Kort horisont med høy risikovilje: kombinasjonsfond eller obligasjonsfond. Fondstypene er pengemarkedsfond, obligasjonsfond, kombinasjonsfond og aksjefond.<\/p><p><b>Felle:<\/b> å anbefale aksjefond til et sparemål om ett år fordi forventet avkastning er høyest.<\/p>",
"kilder": [
"Kvadsheim lb 21",
"Kvadsheim lb 27–30"
],
"eksamen": []
},
{
"id": "kvadsheim-sparing-04",
"nivaa": "viktig",
"kan": "Forklare hvorfor tålmodighet lønner seg i aksjemarkedet",
"kort": "Globale aksjer (MSCI World i kroner, 1970–2022): beste og dårligste årlige snittavkastning er +74 %/−39 % over 1 år, +39 %/−22 % over 3 år, +36 %/−9 % over 5 år, +24 %/−4 % over 10 år, +21 %/+2 % over 15 år og +19 %/+4 % over 20 år.",
"mer": "<p>Spredningen krymper med tidshorisonten og fra 15 år og oppover har ingen periode gitt negativ snittavkastning. Det er grunnen til at sparehorisonten bestemmer fondsvalget.<\/p><p><b>Felle:<\/b> å tro at risikoen forsvinner helt. Selv over 10 år har dårligste periode gitt −4 % i året.<\/p>",
"kilder": [
"Kvadsheim lb 33"
],
"eksamen": []
},
{
"id": "kvadsheim-sparing-05",
"nivaa": "viktig",
"kan": "Forklare gapet mellom fondsavkastning og investoravkastning",
"kort": "Norske aksjefond ga 8,93 % i året fra 1994 til 2018, men sparerne oppnådde bare 6,6 %: 100 kr ville blitt 780 kr med fondsavkastningen, men under 470 kr for snittspareren.",
"mer": "<p>Sparerne kjøper etter oppgang og selger etter fall («selg lavt, kjøp høyt»). Kontroll: 1,0893<sup>24<\/sup> = 7,79 og 1,066<sup>24<\/sup> = 4,64. Morningstars «Mind the Gap» (ti år til 2024): investorenes avkastning ligger rundt 1,2 prosentpoeng (avlest fra figuren) under fondenes totalavkastning og jo mer investorene handlet, desto mindre tjente de. Kilde for norske tall: Pareto Asset Management (Finn Øystein Bergh).<\/p><p><b>Felle:<\/b> å tro at aktiv handel forbedrer avkastningen.<\/p>",
"kilder": [
"Kvadsheim lb 34–35"
],
"eksamen": []
},
{
"id": "kvadsheim-sparing-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor en vanlig nordmann bør ta høyere risiko i fri sparing",
"kort": "Med bolig 4 mill. (2 mill. belånt), folketrygd 1,5 mill., OTP 500 000 (60/40 aksjer/renter) og fondssparing 250 000 er fordelingen 47 % eiendom, 40 % rentepapirer og bare 13 % aksjer.",
"mer": "<p>Regnestykket: netto bolig 2 mill. Rentelikt: folketrygd 1,5 mill. + 40 % av OTP = 1,7 mill. Aksjer: 60 % av OTP + fond = 0,55 mill. Totalt 4,25 mill.: 2/4,25 = 47 %, 1,7/4,25 = 40 % og 0,55/4,25 = 13 %. Folketrygden fungerer som en stor sikker plassering. Kontrast: Pål Ringholms «drømmeportefølje» med 50 % renter, 30 % aksjer, 10 % eiendom og 10 % alternative investeringer. SSB (31. desember 2020): husholdningenes formue på 11 800 mrd. kr er 68 % bolig og hytter, 20 % aksjer og verdipapirfond og 12 % bankinnskudd: «vi er fortsatt en nasjon av boligsparere».<\/p><p><b>Felle:<\/b> å glemme folketrygden som en del av porteføljen.<\/p>",
"kilder": [
"Kvadsheim lb 18–20"
],
"eksamen": []
},
{
"id": "kvadsheim-sparing-07",
"nivaa": "detalj",
"kan": "Kjenne kostnadene ved fondssparing",
"kort": "Det er gratis å komme i gang og å kjøpe og selge fond. Man betaler for driften: forvaltningshonorar 0,15–2 % og plattformavgift 0,1–0,6 % i året.",
"mer": "<p>Kostnadene trekkes hvert år uansett avkastning, så forskjellen mellom et billig indeksfond og et dyrt aktivt fond akkumuleres over lang horisont. Kostnader er en av de fem vurderingene Kvadsheim anbefaler ved fondsvalg.<\/p><p><b>Felle:<\/b> å tro at kjøp og salg er den viktigste kostnaden.<\/p>",
"kilder": [
"Kvadsheim lb 31",
"Kvadsheim lb 40"
],
"eksamen": []
},
{
"id": "kvadsheim-sparing-08",
"nivaa": "detalj",
"kan": "Kjenne casen med familien Hansen",
"kort": "Thomas (37) og Maria (35) har to barn, netto månedsinntekt 88 000 kr, bolig verdt 7,5 mill. med 3,5 mill. i lån, 250 000 kr i bank og 350 000 kr i globalt indeksfond. De sparer 5 000 kr i fond og 5 000 kr i bank hver måned og har rundt 15 000 kr til overs.",
"mer": "<p>De ønsker større bolig om fem år, langsiktig formue til pensjon og ingen «unødvendig høy risiko». Spørsmålet med høyere rente er om de bør nedbetale gjeld eller spare mer i fond. Casen knytter sammen sparemål, horisont, buffer og risikovilje. Boligen ble kjøpt for 6,0 mill. for fem år siden og lånet er redusert fra 4,8 til 3,5 mill.<\/p><p><b>Felle:<\/b> å bruke samme fond for boligmålet (5 år) og pensjonsmålet (lang horisont).<\/p>",
"kilder": [
"Kvadsheim lb 22"
],
"eksamen": []
},
{
"id": "kvadsheim-sparing-09",
"nivaa": "detalj",
"kan": "Kjenne sakene om dyre garanterte spareprodukter",
"kort": "Røeggen-saken gjaldt garanterte spareprodukter fra DNB som kunder tapte penger på. DNB tapte senere i Høyesterett og måtte betale 350 mill. kr til fondskunder.",
"mer": "<p>Kvadsheims poeng («En dyr garanti»): kunder betaler mye for en kapitalgaranti som er verdt mindre enn prisen. Overskriftene «meningsløst høyt» og «uanstendig grådig» handler om kostnader i bankenes spareprodukter. Lysbildene er bilder av avisoppslag og har få detaljer utover dette.<\/p><p><b>Felle:<\/b> å tro at garanti alltid er verdt prisen for en langsiktig sparer.<\/p>",
"kilder": [
"Kvadsheim lb 15–17"
],
"eksamen": []
}
]
},
{
"id": "kvadsheim-fond",
"forelesning": "Kvadsheim: hvordan bør vi spare og låne?",
"tittel": "Fondsvalg: ASK, IPS, måling av fond, valutasikring og rebalansering",
"eksamensvekt": 1,
"viktigst": [
"ASK: utsatt skatt og skjerming, men bare aksjer og aksjefond i EØS og tapsfradrag krever at kontoen avsluttes",
"IPS: fradrag og 22 % skatt ved uttak, ingen formuesskatt, bundet til 62 år. Maks innskudd 25 000 kr fra 2026",
"DP-indeksen regner bare avkastning under risikofri rente som risiko. Sharpe straffer alle svingninger",
"Valutasikring øker risikoen for en norsk investor i globale aksjer"
],
"punkter": [
{
"id": "kvadsheim-fond-01",
"nivaa": "viktig",
"kan": "Sammenligne IPS, ASK og investeringskonto",
"kort": "Formuesskatt og skjerming: bare ASK og investeringskonto, ikke IPS. Gevinstskatt: IPS 22 %, ASK 37,84 % og investeringskonto 37,84 % på aksjer og 22 % på renter og bare IPS har bindingstid (til 62 år).",
"mer": "<p>Gevinst- og utbytteskatt er utsatt i alle tre. Skattefritt uttak av innskudd: bare ASK. Investeringsunivers: IPS og investeringskonto tillater aksjer og fond i og utenfor EØS, kombinasjonsfond, rentefond, ETF og bankinnskudd. ASK tillater bare aksjer og aksjefond i EU/EØS og ETF-er, ikke rentefond, kombinasjonsfond, bankinnskudd eller aksjer utenfor EØS. Tabellen er merket «Gevinstbeskatning (2018)», men satsene er de som gjelder nå (37,84 % = 22 % × 1,72).<\/p><p><b>Felle:<\/b> å tro at ASK gir fritak for formuesskatt. Det gjør bare IPS.<\/p>",
"kilder": [
"Kvadsheim lb 36"
],
"eksamen": []
},
{
"id": "kvadsheim-fond-02",
"nivaa": "viktig",
"kan": "Gjengi fordeler og ulemper ved aksjesparekonto (ASK)",
"kort": "Fordeler: utsetter skatten, stort utvalg og god oversikt. Ulemper: kan ikke spare i rente- eller obligasjonsfond, ingen aksjer utenfor EØS og man må avslutte kontoen for å få tapsfradrag.",
"mer": "<p>ASK tilsvarer «sparing med skattekreditt» (V<sub>2<\/sub>) i F10: skatten på gevinst betales først når pengene tas ut av kontoen og uttak regnes først som tilbakebetaling av innskudd. Kvadsheim anbefaler å «skaffe seg en aksjesparekonto» for aksjefondssparing.<\/p><p><b>Felle:<\/b> å tro at tap på enkeltfond inne på ASK gir fradrag løpende.<\/p>",
"kilder": [
"Kvadsheim lb 32",
"F10 lb 22"
],
"eksamen": []
},
{
"id": "kvadsheim-fond-03",
"nivaa": "viktig",
"kan": "Gjengi fordeler og ulemper ved IPS",
"kort": "Fordeler: skattesymmetri (fradrag og skatt ved uttak), lavere gevinstskatt (22 %), bedre utvalg, null formuesskatt og maks innskudd 25 000 kr fra 2026. Ulemper: bindingstid, sykehjem, tapt skjermingsfradrag, kostnader, lav avkastning i utbetalingsperioden, lang nedtrapping og usikkerhet ved samlivsbrudd, uførhet, død og politiske endringer.",
"mer": "<p>Kvadsheims dom: «attraktiv ordning, men lavt innskudd» og fordelene er viktigere enn ulempene. Han påpeker at «pensjon koster» (lysbildet nevner «7/9 profiler») og at nedtrappingen av aksjeandelen kan starte allerede fra 40 år. IPS tilsvarer pensjonssparing (V<sub>3<\/sub>) i F10. H2024 o13b: IPS gir utsatt skatt, et rentefritt lån fra staten og fritak for formuesskatt.<\/p><p><b>Felle:<\/b> at IPS kan tas ut før pensjonsalder, f.eks. til bolig.<\/p>",
"kilder": [
"Kvadsheim lb 51–52",
"F10 lb 25"
],
"eksamen": [
"H2024 o13b"
]
},
{
"id": "kvadsheim-fond-04",
"nivaa": "viktig",
"kan": "Forklare forskjellen på DP-indeksen og Sharpe-ratioen",
"kort": "Begge måler risikojustert fondsavkastning. Sharpe bruker standardavvik og regner alle svingninger som risiko. DP-indeksen er asymmetrisk: bare avkastning lavere enn risikofri rente inngår i risikomålet.",
"mer": "<p>DP-indeksen (Dine Penger) belønner høy avkastning, særlig i oppgang. Oppgangssvingninger er positive og kan være tegn på dyktighet, mens Sharpe regner dem som risiko. En DP-indeks over 1 betyr at fondet har fått bedre betalt for risikoen enn markedet det investerer i. Eksempler (5 år): SpareBank 1 Norge Verdi C 1,38 (16,67 % i året), Nordea Norge Verdi A 1,36, Holberg Norge A 1,20 og DNB SMB A 1,14.<\/p><p><b>Felle:<\/b> å tro at DP-indeksen straffer oppgang.<\/p>",
"kilder": [
"Kvadsheim lb 43–47"
],
"eksamen": []
},
{
"id": "kvadsheim-fond-05",
"nivaa": "viktig",
"kan": "Vite hvilke vurderinger og målemetoder Kvadsheim anbefaler ved fondsvalg",
"kort": "Fem vurderinger: avkastning mot risiko (12 mnd., 3, 5 og 10 år, standardavvik, Sharpe, DP-indeks), størrelse, forvalterens erfaring og kostnader. Morningstar gir 1–5 stjerner basert på 3 års historikk: 10 % får 5 stjerner og 22,5 % får 4.",
"mer": "<p>Ren avkastning måles mot fondets egen referanseindeks. Sharpe er det vanligste risikomålet, Morningstar har fått mest gjennomslag. Kvadsheims egne favoritter (100 % aksjer): 65 % DNB Global Indeks, 15 % KLP Aksje Fremvoksende Markeder Flerfaktor, 10 % Holberg Norge og 10 % KLP AksjeGlobal SC Flerfaktor.<\/p><p>H2025 o16 (Forbrukerrådet, 20 år til 2018): aktive fond gjorde det svakere enn indeksfond på globale, nordiske og europeiske aksjer, men bedre på norske aksjer.<\/p><p><b>Felle:<\/b> å velge fond bare på ett års avkastning.<\/p>",
"kilder": [
"Kvadsheim lb 39–42"
],
"eksamen": []
},
{
"id": "kvadsheim-fond-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor valutasikring øker risikoen for en norsk investor",
"kort": "For en norsk investor er svingningene høyere med valutasikring: S&amp;P 500 ca. 14,2 % sikret mot 12,5 % usikret, MSCI verdensindeks ca. 14,9 % sikret mot 11,7 % usikret (DN 2022, FactSet og Pareto).",
"mer": "<p>Forklaringen som vanligvis gis (står ikke på lysbildet): kronen svekkes ofte når aksjemarkedene faller, så valutaeksponeringen demper fallet målt i kroner. Fjernes valutaeksponeringen, forsvinner denne dempingen. Lysbildet sammenligner også KLP AksjeGlobal Indeks med og uten valutasikring. H2024 o12c: er arbeidsinntekten høyere når kronen er sterk, bør en risikoavers investor ikke valutasikre, fordi fondet da er mest verdt i kroner når arbeidsinntekten er lav.<\/p><p><b>Felle:<\/b> å anta at valutasikring alltid reduserer risiko fordi den fjerner én risikokilde.<\/p>",
"kilder": [
"Kvadsheim lb 48–49"
],
"eksamen": [
"H2024 o12c"
]
},
{
"id": "kvadsheim-fond-07",
"nivaa": "viktig",
"kan": "Regne en rebalansering av porteføljen",
"kort": "Med 80 000 kr i aksjefond og 20 000 kr i rentefond gir et børsfall på 10 % fordelingen 72 000/20 000, altså 78/22. For å komme tilbake til 80/20 av 92 000 må man flytte 1 600 kr fra rentefond til aksjefond.",
"mer": "<p>Mål: 0,80 × 92 000 = 73 600 i aksjer, så kjøp 1 600 og selg 1 600 i rentefond. <b>Avvik:<\/b> lysbildet sier 2 000 kr, men 1 600 er det eksakte tallet. Ulempe: krever tett oppfølging og Kvadsheim spør om man bør bytte indeksfond med ETF-er. Rebalansering betyr å kjøpe det som har falt og selge det som har steget.<\/p><p><b>Felle:<\/b> å bruke 80 % av den opprinnelige formuen (80 000) som mål.<\/p>",
"kilder": [
"Kvadsheim lb 50"
],
"eksamen": []
},
{
"id": "kvadsheim-fond-08",
"nivaa": "detalj",
"kan": "Kjenne sammensetningen av et globalt indeksfond",
"kort": "Om lag 72,5 % USA, 8,1 % eurosonen og 5,8 % Japan, med teknologi som største bransje (27–31 %). De største selskapene er NVIDIA (5,52 %), Apple (5,12 %) og Microsoft (3,89 %).",
"mer": "<p>Poenget med «ikke legg alle eggene i samme kurv» er diversifisering, men globale fond er allerede godt diversifisert, så man trenger ikke mange fond. Samtidig viser dissekeringen en betydelig konsentrasjon i USA og i noen få store teknologiselskaper. Andre bransjer: finans (ca. 16–17 %) og industri (ca. 11 %).<\/p><p><b>Felle:<\/b> å tro at et globalt fond er likt fordelt mellom regioner.<\/p>",
"kilder": [
"Kvadsheim lb 37–38"
],
"eksamen": [
"H2024 o12b"
]
}
]
},
{
"id": "kvadsheim-skatt",
"forelesning": "Kvadsheim: hvordan bør vi spare og låne?",
"tittel": "Skatt på sparing i praksis",
"eksamensvekt": 1,
"viktigst": [
"Aksjer og aksjefond: 37,84 % effektiv skatt på gevinst. Renter og rentefond: 22 %",
"Forskjellen har økt fra 28 % for begge før 2013 til 37,84 % mot 22 % i 2023",
"I år med lav inntekt kan man realisere gevinster skattefritt innenfor personfradraget",
"På ASK regnes uttak først som innskudd, så for å realisere gevinst må man ta ut mer enn innskuddet"
],
"punkter": [
{
"id": "kvadsheim-skatt-01",
"nivaa": "viktig",
"kan": "Vite skattesatsen på ulike typer sparing («Gjett skatten»)",
"kort": "Aksjer og aksjefond 37,84 %, bitcoin 22 %, bygård 22 %, hytte 0 % og kunst (Munch-maleri) 0 %.",
"mer": "<p>Lysbildet gir bare satsene, ikke vilkårene. Hytta er skattefri når vilkårene for skattefri gevinst er oppfylt. Satsen 0 % for kunst er slik lysbildet viser den. Aksjeinntekt skattlegges med 22 % × 1,72 = 37,84 % etter skjerming. Renteinntekter og annen kapitalinntekt skattlegges med 22 %.<\/p><p><b>Felle:<\/b> å bruke 22 % på aksjefond fordi «kapitalinntekt er 22 %». Aksjefond oppjusteres.<\/p>",
"kilder": [
"Kvadsheim lb 58"
],
"eksamen": []
},
{
"id": "kvadsheim-skatt-02",
"nivaa": "viktig",
"kan": "Forklare hvordan forskjellen mellom aksjefond og rentefond har utviklet seg",
"kort": "Før 2013 var satsen 28 % for begge. Kapitalinntekt er senket til 22 % (fra 2019), mens effektiv sats på aksjefond har økt til 37,84 % (2023) fordi oppjusteringsfaktoren er hevet.",
"mer": "<p>Figuren «Forskjellene øker»: kapitalinntekt 28 % før 2013, 27 % i 2014–2015, deretter gradvis ned til 22 % fra 2019. Aksjefond fulgte 28 % og 27 % til 2015, lå deretter rundt 29–30 % i 2016–2020, steg til om lag 31,7 % i 2021, 35,2 % i 2022 og 37,84 % i 2023. Kvadsheim spør «hvordan ble det så skjevt?».<\/p><p><b>Felle:<\/b> å tro at aksjefond og rentefond alltid har hatt ulik sats.<\/p>",
"kilder": [
"Kvadsheim lb 59–60"
],
"eksamen": []
},
{
"id": "kvadsheim-skatt-03",
"nivaa": "viktig",
"kan": "Vite hvordan formuesskatt og gevinstskatt slår ut for bank mot aksjefond",
"kort": "Ved formuesskatt verdsettes bankinnskudd til 100 % og aksjefond til 80 %. Gevinster skattlegges hardere på aksjefond: 37,84 % mot 22 % på renteinntekter.",
"mer": "<p>Lysbildet «Hvordan blir skatten i 2027?» oppsummerer at man får lavere skatterabatt på formuen i bank (ingen) enn i aksjefond (20 %), men at gevinstene på aksjefond skattlegges hardere.<\/p><p><b>Felle:<\/b> å tro at aksjefond både har lavest formuesskatt og lavest gevinstskatt.<\/p>",
"kilder": [
"Kvadsheim lb 56–57"
],
"eksamen": []
},
{
"id": "kvadsheim-skatt-04",
"nivaa": "viktig",
"kan": "Regne hvor stor gevinst man kan realisere skattefritt i et lavinntektsår",
"kort": "2026: uten annen inntekt kan man realisere ca. 66 600 kr i aksjegevinst skattefritt. Med 100 000 kr i lønn ca. 35 200 kr. Med 210 000 kr i lønn er det ikke noe rom igjen og gevinsten skattlegges med 37,84 %.",
"mer": "<p>Logikken: oppjustert gevinst (× 1,72) skattlegges som alminnelig inntekt. Personfradraget (114 540 kr i 2026, hentet fra satsene, ikke fra lysbildet) gir et skattefritt rom. 114 540/1,72 = 66 593. Med lønn 100 000: minstefradrag 46 % = 46 000, alminnelig inntekt 54 000, rom 60 540, gevinst 60 540/1,72 = 35 198. Med lønn 210 000: minstefradrag maks 95 700, inntekt 114 300, nesten ikke noe rom. Skattekalkulatoren: lønn 60 000 og gevinst 30 000 gir 0 kr i skatt.<\/p><p><b>Felle:<\/b> å glemme å oppjustere gevinsten med 1,72.<\/p>",
"kilder": [
"Kvadsheim lb 53",
"Kvadsheim lb 55"
],
"eksamen": []
},
{
"id": "kvadsheim-skatt-05",
"nivaa": "viktig",
"kan": "Forklare hvordan man realiserer gevinst på fondskonto og på ASK",
"kort": "Aksjefond for 300 000 kr med 80 000 kr gevinst: på fondskonto realiserer et salg for 150 000 forholdsmessig 40 000 kr gevinst. På ASK regnes uttak først som innskudd (220 000), så man må ta ut 260 000 for å realisere 40 000 og kan sette pengene inn på en ny ASK.",
"mer": "<p>Strategien i casen: et år med lav lønn (50 000 kr i 2026) brukes til å realisere 40 000 kr gevinst og neste år (60 000 kr i 2027) realiseres de resterende 40 000. På fondskonto selger man halvparten og reinvesterer. På ASK 1 tas innskudd pluss 40 000 ut og settes inn på ASK 2. Året etter tas de siste 40 000 ut fra ASK 1. Dermed «nullstilles» gevinsten skattefritt innenfor personfradraget.<\/p><p><b>Felle:<\/b> å tro at uttak fra ASK fordeles forholdsmessig mellom innskudd og gevinst.<\/p>",
"kilder": [
"Kvadsheim lb 54"
],
"eksamen": []
}
]
},
{
"id": "laan-forsikring",
"forelesning": "Næss: lån, risikostyring og forsikring",
"tittel": "Forsikring, forventet nytte og risikostyring",
"eksamensvekt": 5,
"viktigst": [
"Risikoavers (konkav U) kjøper alltid full forsikring til aktuarisk («riktig») pris",
"E[U uten] = (1 − p)U(W) + pU(W − L); med full forsikring U(W − premie); sammenlign",
"Maks premie: U(W − P) = E[U uten]; med √W blir P = W − (E[√W])²",
"Forsikring er billig når risikoen kan diversifiseres (husbrann) og dyr ved systematisk risiko (pandemi, arbeidsledighet)",
"Egenandel motvirker moralsk hasard; frivillighet gir ugunstig utvalg; bare ansvarsforsikring på bil er lovpålagt"
],
"punkter": [
{
"id": "laan-forsikring-01",
"nivaa": "kjerne",
"kan": "Vite at en risikoavers alltid bør forsikre til aktuarisk pris",
"kort": "Når premien er lik forventet utbetaling, bør en risikoavers alltid kjøpe forsikring, både for billige og dyre eiendeler og både med √W og ln W.",
"mer": "<p><b>H2024 o11a:<\/b> riktig (1) «ja, fordi en risikoavers alltid bør takke ja til forsikring til riktig pris».<\/p><p>Mekanisme: til aktuarisk pris er forventet formue lik med og uten forsikring, men med forsikring er den sikker. Konkav U gir U(E[W]) &gt; E[U(W)].<\/p><p><b>Feller:<\/b> (2) «men ikke med logaritmisk nytte» (ln er også konkav), (3) «aldri forsikre billige ting», (4) bare hvis prisen er under forventet utbetaling.<\/p>",
"kilder": [
"H2024 sensorveiledning"
],
"eksamen": [
"H2024 o11a"
]
},
{
"id": "laan-forsikring-02",
"nivaa": "kjerne",
"kan": "Vite hvor stor andel som bør forsikres til aktuarisk pris",
"kort": "100 % av verdien. Delvis dekning etterlater risiko uten noen gevinst i forventning.",
"mer": "<p><b>H2024 o11b:<\/b> riktig (3) 100 %. Feil: under 50 %, 50 til 99 %, umulig å si uten verdien.<\/p><p>Til aktuarisk pris koster hver krone dekning nøyaktig sin forventede utbetaling, så en risikoavers vil fjerne all risiko. Er premien høyere enn aktuarisk, kan delvis dekning være optimalt (Mossins resultat, Døskeland kap 10, ikke i kildene).<\/p>",
"kilder": [
"H2024 sensorveiledning",
"03-forelesninger-finans"
],
"eksamen": [
"H2024 o11b"
]
},
{
"id": "laan-forsikring-03",
"nivaa": "kjerne",
"kan": "Regne om en forsikring med påslag lønner seg ved å sammenligne forventet nytte",
"kort": "Uten forsikring: (1 − p)√W. Med full forsikring: √(W − premie). H2024: √975 000 = 987,4 er lavere enn 0,99 × 1 000 = 990, så nei. H2025: √8 840 000 = 2 973,2 er høyere enn 0,99 × 3 000 = 2 970, så ja.",
"mer": "<p><b>H2024 o11c:<\/b> hus 1 mill, p = 1 %, premie 25 000 (aktuarisk 10 000): nei (3).<\/p><p><b>H2025 o13(1):<\/b> hus 9 mill, p = 1 %, premie 160 000 (aktuarisk 90 000): ja (A).<\/p><p><b>Feller:<\/b><\/p><ul><li>«aldri kjøpe hvis premien er høyere enn forventet skade» (H2024 alt 4): en risikoavers betaler gjerne mer<\/li><li>«risikoavers forsikrer alltid dyreste eiendel» (alt 2)<\/li><li>sammenligne forventet <i>formue<\/i> i stedet for forventet <i>nytte<\/i><\/li><\/ul>",
"kilder": [
"H2024 sensorveiledning",
"H2025 sensorveiledning"
],
"eksamen": [
"H2024 o11c",
"H2025 o13(1)"
]
},
{
"id": "laan-forsikring-04",
"nivaa": "kjerne",
"kan": "Regne maksimal betalingsvillighet for en forsikring",
"kort": "Løs U(W − P) = E[U uten]. H2024: √(1 000 000 − P) = 990, så P = 1 000 000 − 980 100 = 19 900. H2025: P = 9 000 000 − 2 970² = 179 100.",
"mer": "<p><b>H2024 o11d:<\/b> riktig 19 900 (alt 1). Feil: 23 100, 27 100, 29 900.<\/p><p><b>H2019 o7a<\/b> (ln-nytte, formue 6 mill, hus 3 mill, p = 1,1 %): ln(6 − π) = 0,989 ln 6 + 0,011 ln 3 gir π ≈ 45 600, altså «mellom 40 000 og 50 000». Aktuarisk premie er 33 000.<\/p><p>Maks premie = aktuarisk premie + risikopremie. H2025: 90 000 + 89 100 = 179 100.<\/p>",
"kilder": [
"H2024 sensorveiledning",
"H2019 fasit"
],
"eksamen": [
"H2024 o11d",
"H2019 o7a"
]
},
{
"id": "laan-forsikring-05",
"nivaa": "kjerne",
"kan": "Regne den laveste sannsynligheten som gjør en forsikring verdt prisen",
"kort": "Sett nytten lik: (1 − p)√W = √(W − premie), så p* = 1 − √(W − premie)/√W. H2025: 1 − 2 973,2/3 000 = 0,89 %.",
"mer": "<p><b>H2025 o13(2):<\/b> riktig (B) ca. 0,89 %. Ved høyere p lønner forsikringen seg, ved lavere ikke.<\/p><p><b>Snarvei fra fasiten:<\/b> siden p = 1 % allerede gir kjøp, kan 1,52 % og 2,01 % utelukkes. Sett så inn 0,89 % og 0,52 % og se hvilken som gir likhet.<\/p><p><b>Felle:<\/b> å velge en høyere sannsynlighet enn den som allerede gir kjøp.<\/p>",
"kilder": [
"H2025 sensorveiledning"
],
"eksamen": [
"H2025 o13(2)"
]
},
{
"id": "laan-forsikring-06",
"nivaa": "kjerne",
"kan": "Regne om delvis dekning til samme premie lønner seg",
"kort": "50 % dekning (4,5 mill) for 160 000: 0,99 × √8 840 000 + 0,01 × √4 340 000 = 2 964,3, lavere enn 2 970, så nei.",
"mer": "<p><b>H2025 o13(3):<\/b> riktig (B).<\/p><p>Oppsett: E[U delvis] = (1 − p)U(W − P) + pU(W − L + αL − P). Premien betales i begge tilstander.<\/p><p>Intuisjon: du betaler 160 000 for en forventet utbetaling på 45 000 (3,6 ganger aktuarisk) og sitter fortsatt igjen med et stort tap ved brann.<\/p><p><b>Felle:<\/b> å glemme å trekke premien fra i brannscenarioet (4 500 000 i stedet for 4 340 000).<\/p>",
"kilder": [
"H2025 sensorveiledning"
],
"eksamen": [
"H2025 o13(3)"
]
},
{
"id": "laan-forsikring-07",
"nivaa": "kjerne",
"kan": "Forklare hvorfor noen risikoer er lette og andre vanskelige å forsikre",
"kort": "Forsikring blir billig når selskapet kan diversifisere: husbranner er nesten uavhengige av hverandre. Pandemier og arbeidsledighet rammer mange samtidig og er vanskelige å forsikre.",
"mer": "<p><b>H2023 o12:<\/b> riktig (iii): lettere å diversifisere husbrann enn pandemi, så husforsikring blir billigere. De tre andre alternativene snur enten diversifiseringen eller prisen.<\/p><p><b>H2019 o7c:<\/b> arbeidsledighet er vanskelig å forsikre pga. manglende risikospredning.<\/p><p><b>H2018 o6:<\/b> forsikring for meglerstudenter: et boligkrakk rammer alle kundene samtidig.<\/p><p>Samme logikk som CAPM: bare systematisk risiko er dyr.<\/p>",
"kilder": [
"H2023 sensorveiledning",
"H2019 fasit",
"H2018 fasit"
],
"eksamen": [
"H2023 o12",
"H2019 o7c",
"H2018 o6"
]
},
{
"id": "laan-forsikring-08",
"nivaa": "kjerne",
"kan": "Forklare hvorfor forsikringsselskaper bruker egenandel",
"kort": "Egenandel reduserer moralsk hasard (uforsiktig atferd når man er forsikret), gir gunstigere utvalg (forsiktige foretrekker egenandel) og lavere kostnader fordi færre små krav må behandles.",
"mer": "<p><b>H2019 o7b:<\/b> egenandel er gunstig når det er stor risiko for at uforsiktig atferd påvirker sannsynligheten for skade (moralsk hasard).<\/p><p><b>H2023 o11 (iv) feil:<\/b> «velg lav egenandel fordi det gir større utbetaling»: lav egenandel er ikke en ensidig fordel, for premien blir høyere.<\/p>",
"kilder": [
"H2019 fasit",
"H2023 sensorveiledning"
],
"eksamen": [
"H2019 o7b",
"H2023 o11"
]
},
{
"id": "laan-forsikring-09",
"nivaa": "kjerne",
"kan": "Forklare ugunstig utvalg og hvorfor noen forsikringer bør være obligatoriske",
"kort": "Frivillig forsikring tiltrekker dem med høyest risiko, fordi de kjenner sin egen risiko bedre enn selskapet. Forsikring mot å leve lenge fungerer derfor best når den er obligatorisk, som folketrygden.",
"mer": "<p><b>H2018 o6:<\/b> bare studenter med dårlige jobbutsikter ville kjøpt forsikringen (adverse selection), i tillegg til moralsk hasard og manglende diversifisering.<\/p><p><b>Pensjon s. 22:<\/b> forsikringsargumentet for folketrygden ville ikke fungert like bra frivillig.<\/p><p><b>H2023 o10 (iv) feil:<\/b> «folketrygden er frivillig og slipper derfor skjevt utvalg».<\/p>",
"kilder": [
"H2018 fasit",
"Pensjon s. 20–22",
"H2023 sensorveiledning"
],
"eksamen": [
"H2018 o6",
"H2023 o10"
]
},
{
"id": "laan-forsikring-10",
"nivaa": "viktig",
"kan": "Vurdere om en forsiktig person bør forsikre seg",
"kort": "Du må trolig betale mer enn du forventer å få tilbake (premien er satt for snittkunden), men som risikoavers kan det likevel lønne seg å forsikre de dyre tingene dine.",
"mer": "<p><b>H2023 o11:<\/b> riktig (ii). Feil: (i) aldri lurt å forsikre noe, (iii) egenandel holder de uforsiktige ute, (iv) velg lav egenandel.<\/p><p>Tankegangen: forsikr store tap du ikke tåler, ikke små tap du lett kan bære selv.<\/p><p>Mekanisme: premien settes ut fra snittrisikoen i porteføljen, så den forsiktige subsidierer de uforsiktige.<\/p>",
"kilder": [
"H2023 sensorveiledning"
],
"eksamen": [
"H2023 o11"
]
},
{
"id": "laan-forsikring-11",
"nivaa": "viktig",
"kan": "Vite hvilken forsikring som er lovpålagt i Norge",
"kort": "Ansvarsforsikring på bil er lovpålagt. Bolig- og uføreforsikring er frivillige, men ofte anbefalt.",
"mer": "<p><b>H2025 o12:<\/b> riktig (C). Feil: (A) boligforsikring, (B) uføreforsikring, (D) ingen.<\/p><p>Begrunnelse: ansvarsforsikring dekker skade på andre (tredjepart), altså en eksternalitet. Folketrygden er også obligatorisk, men er en trygdeordning og ikke en forsikring du kjøper.<\/p><p><b>Felle:<\/b> å velge «ingen av dem» fordi man tror at alle forsikringer for privatpersoner er frivillige.<\/p>",
"kilder": [
"H2025 sensorveiledning"
],
"eksamen": [
"H2025 o12"
]
},
{
"id": "laan-forsikring-12",
"nivaa": "viktig",
"kan": "Definere sikkerhetsekvivalent og risikopremie og bruke dem på forsikring",
"kort": "Sikkerhetsekvivalenten CE er det sikre beløpet som gir samme nytte: U(CE) = E[U]. Risikopremie = E[W] − CE. Maks forsikringspremie = aktuarisk premie + risikopremie.",
"mer": "<p><b>H2025-tallene:<\/b> E[W] uten forsikring = 0,99 × 9 000 000 = 8 910 000. E[√W] = 2 970, så CE = 2 970<sup>2<\/sup> = 8 820 900. Risikopremie = 89 100. Maks premie = 9 000 000 − 8 820 900 = 179 100 = 90 000 + 89 100.<\/p><p><b>H2024-tallene:<\/b> CE = 980 100, E[W] = 990 000, risikopremie 9 900, maks premie 19 900.<\/p><p>Jo mer konkav U og jo større tapet er i forhold til formuen, jo høyere risikopremie.<\/p>",
"kilder": [
"H2024 sensorveiledning",
"H2025 sensorveiledning",
"03-forelesninger-finans"
],
"eksamen": [
"H2024 o11d",
"H2025 o13(2)"
]
},
{
"id": "laan-forsikring-13",
"nivaa": "viktig",
"kan": "Gi en oversikt over husholdningens risikostyring",
"kort": "Forsikr store tap du ikke tåler (bolig, uførhet), folketrygden forsikrer mot lang levetid, fast rente forsikrer mot renteøkning og jobbrisiko styres gjennom aksjeandel, home bias og valutasikring.",
"mer": "<p>Forelesningen heter «Lån og risikostyring» (pensum Døskeland kap 8 og 10), men 2026-lysbildene har ingen egen forsikringsdel. Pensjon s. 22 viser til «forelesning om forsikring». Eksamensoppgavene (H2018 til H2025) dekker temaet.<\/p><p>Fellesnevneren: en risikoavers betaler for å fjerne risiko som ikke kan diversifiseres bort og bør unngå å samle risiko (jobb og portefølje i samme marked).<\/p>",
"kilder": [
"Pensjon s. 22",
"Aksjesparing s. 16–17",
"H2024 sensorveiledning"
],
"eksamen": [
"H2023 o10",
"H2019 o8b",
"H2024 o12c"
]
}
],
"kildenotat": "Lån og risikostyring: forsikring (OA, forelesning 15, Døskeland kap 10; ingen egne lysbilder i 2026, bygget på eksamensfasitene)"
},
{
"id": "laan-beregning",
"forelesning": "Næss: lån, risikostyring og forsikring",
"tittel": "Annuitetslån, serielån, effektiv rente og kredittkostnad",
"eksamensvekt": 3,
"viktigst": [
"Annuitet: A = L × r/(1 − (1 + r)^(−n)); sum renter = n × A − L",
"Serielån: likt avdrag L/n og rente av restgjelden, så terminbeløpet faller",
"Effektiv rente = internrenten når gebyrer tas med; den er høyere enn den nominelle",
"Kredittkostnad = sum av alle betalinger minus lånebeløpet, uten diskontering",
"Årlig vekst = (slutt/start)^(1/T) − 1"
],
"punkter": [
{
"id": "laan-beregning-01",
"nivaa": "kjerne",
"kan": "Regne ut terminbeløpet på et annuitetslån",
"kort": "A = L × r/(1 − (1 + r)^(−n)). 500 000 til 12 % over 10 år gir 88 492 per år; til 3 % gir 58 615.",
"mer": "<p>Formelen oppgis i oppgaveteksten, men du må bruke den riktig.<\/p><ul><li><b>H2016 o3b og o3d:<\/b> 88 492 og 58 615<\/li><li><b>H2022 o6(1):<\/b> 400 000, 4,99 %, 5 år: 92 364 (d)<\/li><li><b>H2020 o6a:<\/b> 2 125 000, 3 %, 25 år: 122 034<\/li><\/ul><p><b>Feller:<\/b> 80 000 = 400 000/5 (bare avdrag); 101 815 og 94 322 er andre feilregninger. Ved månedlige terminer må r deles på 12 og n ganges med 12.<\/p>",
"kilder": [
"H2016 fasit",
"H2022 sensorveiledning",
"03-forelesninger-finans"
],
"eksamen": [
"H2016 o3b",
"H2016 o3d",
"H2022 o6(1)",
"H2020 o6a"
]
},
{
"id": "laan-beregning-02",
"nivaa": "kjerne",
"kan": "Regne summen av renter på et annuitetslån",
"kort": "Sum renter = n × A − L. 10 × 88 492 − 500 000 = 384 921 kr ved 12 %; 10 × 58 615 − 500 000 = 86 153 kr ved 3 %.",
"mer": "<p>H2016 o3c og o3e. Alle avdragene summerer seg til lånebeløpet, så resten av betalingene er renter.<\/p><p>Forskjellen på ca. 300 000 kr i renter viser hvor mye rentenivået betyr og hvorfor dyre lån bør betales ned først.<\/p><p><b>Felle:<\/b> å regne renter som r × L × n (60 000 × 10 = 600 000), som overser at restgjelden faller.<\/p>",
"kilder": [
"H2016 fasit"
],
"eksamen": [
"H2016 o3c",
"H2016 o3e"
]
},
{
"id": "laan-beregning-03",
"nivaa": "kjerne",
"kan": "Regne effektiv rente når lånet har gebyrer",
"kort": "Sett opp kontantstrømmen (utbetalt lån minus etableringsgebyr i dag; terminbeløp pluss termingebyr hver termin) og finn internrenten. Billånet: 4,99 % nominelt blir 5,94 % effektivt.",
"mer": "<p><b>H2022 o6(2):<\/b> lån 400 000, etableringsgebyr 5 990, termingebyr 1 020 per år, 5 år.<\/p><ul><li>I dag: +400 000 − 5 990 = 394 010<\/li><li>År 1 til 5: −(92 364 + 1 020) = −93 384<\/li><li>Internrente: 5,94 % (c)<\/li><\/ul><p><b>Felle:<\/b> å svare 4,99 % (nominell) eller å legge gebyrene til renten som prosent. Effektiv rente er alltid høyere enn nominell når det finnes gebyrer.<\/p>",
"kilder": [
"H2022 sensorveiledning"
],
"eksamen": [
"H2022 o6(2)"
]
},
{
"id": "laan-beregning-04",
"nivaa": "viktig",
"kan": "Regne kredittkostnaden for et lån",
"kort": "Kredittkostnad = alle kostnader (renter, gebyrer, provisjoner) du betaler for kreditten, summert uten tidsverdi. Billånet: 5 × 93 384 + 5 990 − 400 000 = 72 912 kr.",
"mer": "<p>H2022 o6(3). Fasiten: det er ikke vanlig å ta hensyn til tidsverdien av penger; man summerer bare beløpene.<\/p><p><b>Feller:<\/b> 472 912 (glemmer å trekke fra lånet), 61 822 (bare rentene uten gebyrer), 5 100 (bare termingebyrene).<\/p><p>Kontroll: 61 822 renter + 5 × 1 020 + 5 990 = 72 912.<\/p>",
"kilder": [
"H2022 sensorveiledning"
],
"eksamen": [
"H2022 o6(3)"
]
},
{
"id": "laan-beregning-05",
"nivaa": "viktig",
"kan": "Skille annuitetslån fra serielån",
"kort": "Annuitet: likt terminbeløp; rentedelen faller og avdragsdelen øker over tid. Serielån: likt avdrag (L/n) og rente av restgjelden, så terminbeløpet er høyest i starten og faller; samlet rente blir lavere.",
"mer": "<p><b>Annuitet, splitt per år:<\/b> rente = r × restgjeld, avdrag = A − rente. H2020 o6a: 2 125 000 til 3 %: år 1 rente 63 750 og avdrag 58 284; over fem år renter 300 732 og avdrag 309 439.<\/p><p><b>Serielån, H2019 o8a:<\/b> 3 mill over 20 år til 4 %: avdrag 150 000 per år, rente år 1 120 000, terminbeløp år 1 270 000.<\/p><p><b>Felle:<\/b> å tro at annuitetslån har likt avdrag.<\/p>",
"kilder": [
"H2020 sensorveiledning",
"H2019 fasit",
"03-forelesninger-finans"
],
"eksamen": [
"H2020 o6a",
"H2019 o8a"
]
},
{
"id": "laan-beregning-06",
"nivaa": "viktig",
"kan": "Sammenligne rammelån og forbrukslån og regne belåningsgrad",
"kort": "Boligsikret rammelån til 3 % er langt billigere enn forbrukslån til 12 % (58 615 mot 88 492 per år på 500 000 over 10 år). Belåningsgrad = lån/boligverdi: 2 500/6 000 = 41,7 %.",
"mer": "<p><b>H2016 o3f:<\/b> anbefal rammelån; siden det alltid ligger under forbrukslånet, trengs ingen nåverdiberegning.<\/p><p><b>o3g:<\/b> belåningsgrad 41,7 % er trygt under kravene i boliglånsforskriften.<\/p><p><b>o3h:<\/b> hvis det gamle lånet på 2 mill hadde 2 % og nå får 3 %, koster det 20 000 mer i året: 78 615, fortsatt lavere enn forbrukslånet.<\/p>",
"kilder": [
"H2016 fasit"
],
"eksamen": [
"H2016 o3f",
"H2016 o3g",
"H2016 o3h"
]
},
{
"id": "laan-beregning-07",
"nivaa": "viktig",
"kan": "Regne årlig vekstrate fra start- og sluttverdi",
"kort": "Årlig vekst = (sluttverdi/startverdi)^(1/T) − 1. Boligindeks 100 til 273,1 over 13,67 år gir 7,63 % i året; huset kjøpt for 2 197′ er verdt ca. 6 000′.",
"mer": "<p>H2016 o3a. Samme regel brukes i spareoppgavene: (903 056/500 000)<sup>1/20<\/sup> − 1 = 3,0 % (H2022 o5(1)) og (1 218 994/1 000 000)<sup>1/10<\/sup> − 1 = 2,0 % (H2019 o9a).<\/p><p><b>Felle:<\/b> å dele total vekst på antall år (173,1 %/13,67 = 12,7 %), som overvurderer vekstraten.<\/p>",
"kilder": [
"H2016 fasit",
"H2022 sensorveiledning"
],
"eksamen": [
"H2016 o3a",
"H2022 o5(1)",
"H2019 o9a"
]
},
{
"id": "laan-beregning-08",
"nivaa": "detalj",
"kan": "Regne om fra nominell til effektiv rente ved flere terminer i året",
"kort": "reff = (1 + rnom/m)^m − 1. 5 % nominelt med månedlige terminer gir 5,12 % effektivt.",
"mer": "<p>Standardformel fra Døskeland kap 8 (hjelpekilden), ikke i 2026-lysbildene og ikke testet direkte. Effektiv rente øker både med antall terminer og med gebyrer.<\/p><p>Kontroll: (1 + 0,05/12)<sup>12<\/sup> − 1 = 0,0512.<\/p><p>Husk at r og n må ha samme enhet: månedlig rente r/12 og antall måneder 12n.<\/p>",
"kilder": [
"03-forelesninger-finans"
],
"eksamen": []
}
],
"kildenotat": "Lån og risikostyring (OA, forelesning 15; s. = PDF-side i ForelesningLån2026 (1), 23. september 2026); formlene er fra Døskeland kap 8 og eksamensfasitene"
},
{
"id": "laan-bolig",
"forelesning": "Næss: lån, risikostyring og forsikring",
"tittel": "Boliglån: utlånsforskriften, avdragsfrihet og rentevalg",
"eksamensvekt": 3,
"viktigst": [
"Utlånsforskriften 2026: samlet gjeld maks 5 × brutto inntekt, maks 90 % belåningsgrad, tåle 3 pp renteøkning (minst 7 %)",
"Eldre eksamener: stresstest +5 pp og 30 års annuitet; maks lån = betjeningsevne/annuitetsfaktor",
"Avdragsfrihet er fornuftig ved midlertidige likviditetsproblemer, men er ikke rentefritt",
"Fast rente er forsikring mot renteøkning; flytende ser ut til å gi høyest forventet nytte",
"Rentefradrag 22 %: renter etter skatt = rente × 0,78"
],
"punkter": [
{
"id": "laan-bolig-01",
"nivaa": "kjerne",
"kan": "Vurdere når avdragsfrihet er fornuftig",
"kort": "Avdragsfrihet kan være lurt ved midlertidige problemer med likviditeten. Det er ikke et rentefritt lån, staten betaler ikke avdragene og rentene løper som før.",
"mer": "<p><b>H2024 o14:<\/b> riktig (1). Feil: (2) rentefritt lån fra banken, (3) staten betaler avdragene, (4) kostnaden er lik uansett, så bare irrasjonelle ber om avdragsfrihet.<\/p><p>Avdragsfrihet utsetter bare nedbetalingen av hovedstolen. Du betaler mer renter totalt fordi gjelden er høyere lenger, men får bedre likviditet nå.<\/p><p>H2020 o6e og f: avdragsfrihet gir høyere belåning og derfor høyere avkastning på egenkapitalen når boligprisveksten er høyere enn lånerenten.<\/p>",
"kilder": [
"H2024 sensorveiledning",
"H2020 sensorveiledning"
],
"eksamen": [
"H2024 o14",
"H2020 o6e",
"H2020 o6f"
]
},
{
"id": "laan-bolig-02",
"nivaa": "kjerne",
"kan": "Bruke gjeldsgradkravet om maks fem ganger inntekten",
"kort": "Samlet gjeld, inkludert studielån, kan ikke overstige 5 × brutto årsinntekt. Med 560 000 i lønn: maks 2,8 mill minus studielånet.",
"mer": "<p><b>H2020 o4b:<\/b> 5 × 560 000 = 2 800 000 − studielån. <b>H2021 o5b:<\/b> 5 × 650 000 = 3 250 000 − studielån.<\/p><p>Kravet gjelder fortsatt i 2026 (05-satser, Kvadsheim lb 13).<\/p><p><b>Felle:<\/b> å glemme at eksisterende gjeld (studielån) trekkes fra.<\/p>",
"kilder": [
"H2020 sensorveiledning",
"H2021 sensorveiledning",
"05-satser-2026",
"Kvadsheim lb 13"
],
"eksamen": [
"H2020 o4b",
"H2021 o5b"
]
},
{
"id": "laan-bolig-03",
"nivaa": "kjerne",
"kan": "Regne maksimalt lån ut fra betjeningsevne og stresstest",
"kort": "Betjeningsevne = brutto lønn minus skatt, konsum og andre lån. Maks lån = betjeningsevne/annuitetsfaktor ved stresset rente. H2020: 224 000 per år ved 3 % + 5 pp = 8 % over 30 år gir 2 521 743 kr.",
"mer": "<p><b>H2020 o4:<\/b> 560 000 × (1 − 0,6) = 224 000. Maks lån = 224 000 × (1 − 1,08<sup>−30<\/sup>)/0,08 = 2 521 743. Sammenlign med 5 × inntekt (2,8 mill minus studielån): det laveste binder (o4d).<\/p><p><b>H2021 o5:<\/b> 650 000 × 0,4 = 260 000, maks lån 2 927 024.<\/p><p><b>Merk:<\/b> eksamenene brukte datidens regel (+5 pp og 30 års annuitet). I 2026 er stresstesten +3 pp, minst 7 %.<\/p><p><b>Felle:<\/b> å bruke dagens rente (3 %) i annuitetsfaktoren.<\/p>",
"kilder": [
"H2020 sensorveiledning",
"H2021 sensorveiledning",
"01-eksamens-dna"
],
"eksamen": [
"H2020 o4a",
"H2020 o4c",
"H2020 o4d",
"H2021 o5a",
"H2021 o5c",
"H2021 o5d"
]
},
{
"id": "laan-bolig-04",
"nivaa": "kjerne",
"kan": "Forklare valget mellom fast og flytende rente",
"kort": "Fast rente er en forsikring mot renteøkning, ikke noe som systematisk lønner seg. Flytende rente ser ut til å gi høyest forventet nytte, men dette kan variere fra person til person.",
"mer": "<p><b>H2019 o8b:<\/b> riktig (5). Feil: flytende alltid billigst, fast alltid billigst, binde når eksperter sier det er gunstig, flytende er sikrere med trygg jobb.<\/p><p>Choi: bøkene anbefaler fast rente (oppfattes som tryggere, pengeillusjon). Økonomer (Campbell og Cocco) anbefaler flytende med mindre rentene er lave, fordi fastrentelån har inflasjonsrisiko og en premie for refinansieringsopsjonen.<\/p><p>Velg fast hvis du er sårbar for renteøkning, samme logikk som forsikring.<\/p>",
"kilder": [
"H2019 fasit",
"Choi s. 22–23"
],
"eksamen": [
"H2019 o8b"
]
},
{
"id": "laan-bolig-05",
"nivaa": "viktig",
"kan": "Kjenne kravene i dagens utlånsforskrift",
"kort": "2026: maks belåningsgrad 90 % (10 % egenkapital), rammelån maks 60 %, samlet gjeld maks 5 × brutto inntekt, tåle 3 pp renteøkning (minst 7 %), avdrag minst 2,5 % i året ved belåningsgrad over 60 %, fleksibilitetskvote 10 % (8 % i Oslo).",
"mer": "<p>Ikke i OA-lysbildene. Tallene er fra 05-satser (utlånsforskriften, endret fra 1. januar 2025). Kvadsheim (lb 13): bankene sjekker sikkerhet (10 % egenkapital), betalingsevne (maks 5 ganger inntekt) og betalingsvilje.<\/p><p>Lånelysbildet (s. 27): strenge boliglånsregler begrunnes trolig med systemrisiko.<\/p><p><b>Felle:<\/b> eldre eksamener (2016 til 2021) brukte eldre regler: 15 % egenkapital og +5 pp stresstest.<\/p>",
"kilder": [
"05-satser-2026",
"Kvadsheim lb 13",
"Lån s. 27"
],
"eksamen": []
},
{
"id": "laan-bolig-06",
"nivaa": "viktig",
"kan": "Bruke rentefradraget og forklare giringseffekten på egenkapitalen",
"kort": "Renter er fradragsberettiget i alminnelig inntekt med 22 %, så renter etter skatt = rente × 0,78. Høyere belåning øker avkastningen på egenkapitalen når boligprisveksten er høyere enn lånerenten etter skatt.",
"mer": "<p>H2020 o6: bolig 2,5 mill, 15 % egenkapital, 3 % rente, 25 års annuitet, rentefradrag 22 %, boligprisvekst 4 % i året. Verdi etter 5 år: 2,5 × 1,04<sup>5<\/sup> = 3 041 632 (gevinst 541 632).<\/p><p>Avkastning på egenkapitalen blir høyere etter skatt enn før (lavere netto rentekostnad) og enda høyere med avdragsfrihet (mer giring). Fasiten er et bilde; eksamens-DNA rekonstruerer ca. 7,0 % før og 9,0 % etter skatt.<\/p><p><b>Felle:<\/b> giring virker begge veier ved prisfall.<\/p>",
"kilder": [
"H2020 sensorveiledning",
"01-eksamens-dna"
],
"eksamen": [
"H2020 o6b",
"H2020 o6c",
"H2020 o6d",
"H2020 o6e",
"H2020 o6f"
]
},
{
"id": "laan-bolig-07",
"nivaa": "viktig",
"kan": "Regne gjeldsbelastning slik H2019-fasiten gjør",
"kort": "H2019: gjeld/(inntekt etter skatt − renter år 1) = 3 000 000/(650 000 × 0,8 − 120 000) = 7,5.",
"mer": "<p>H2019 o8a: serielån 3 mill, 4 %, 20 år, bruttoinntekt 650 000, 20 % skatt. Riktig: ca. 7,5.<\/p><p><b>Feller i alternativene:<\/b> 5,77 = gjeld/inntekt etter skatt; 4,6 = gjeld/brutto inntekt; 12,0 = gjeld/(netto − renter − avdrag).<\/p><p>Definisjonen står verken i oppgaven, fasiten eller 2026-forelesningene, så dette er lite sannsynlig på eksamen.<\/p>",
"kilder": [
"H2019 fasit",
"01-eksamens-dna"
],
"eksamen": [
"H2019 o8a"
]
},
{
"id": "laan-bolig-08",
"nivaa": "detalj",
"kan": "Forklare hvorfor leie til eie kan koste mer enn å kjøpe hele boligen med en gang",
"kort": "Kjøper du andelene gradvis til en avtalt pris som vokser med boligprisene (4 %), betaler du mer totalt (2 658 244 mot 2 500 000) fordi de senere andelene er dyrere.",
"mer": "<p>H2020 o6g: OBOS Deleie, 50 % ved kjøp og 10 % ved slutten av hvert av de neste fem årene: 1 250 000 + 250 000 × (1,04 + 1,04<sup>2<\/sup> + ... + 1,04<sup>5<\/sup>) = 2 658 244.<\/p><p>o6h: med løpende priser og fall i år 1 blir resultatet annerledes; o6i: drøft modellen med balansestyring (mindre giring, mindre eksponering mot boligprisene).<\/p>",
"kilder": [
"H2020 sensorveiledning"
],
"eksamen": [
"H2020 o6g",
"H2020 o6h",
"H2020 o6i"
]
}
],
"kildenotat": "Lån og risikostyring (OA, forelesning 15; s. = PDF-side i ForelesningLån2026 (1), 23. september 2026); utlånsreglene er fra eksamensoppgavene og 05-satser-2026"
},
{
"id": "laan-rente",
"forelesning": "Næss: lån, risikostyring og forsikring",
"tittel": "Lån, rente og risiko",
"eksamensvekt": 2,
"viktigst": [
"Lån flytter penger fra fremtiden til i dag (livssyklus) og er verken godt eller dårlig i seg selv",
"Rente er prisen på risiko: pant (bolig) gir lav rente, forbrukslån uten sikkerhet høy rente",
"Regel: lån billigst mulig og betal ned lånet med høyest rente først",
"Rekkefølge: kreditt og forbruk, så bil og båt, så bolig, så studielån",
"Snøballmetoden (minste gjeld først) er et atferdsargument, ikke det billigste"
],
"punkter": [
{
"id": "laan-rente-01",
"nivaa": "kjerne",
"kan": "Bruke regelen om å betale ned lånet med høyest rente først",
"kort": "Lån er flytting av penger over tid og det vil man gjøre billigst mulig: betal ned lånet med høyest rente først. Eneste unntak: ulike konsekvenser hvis man ikke betaler de ulike lånene.",
"mer": "<p><b>Rekkefølge<\/b> (s. 14): 1) kreditt- og forbrukslån, 2) bil- og båtlån, 3) boliglån, 4) studielån. Studielån sist fordi det har fordeler: slettes ved dødsfall og rentefritak ved sykdom.<\/p><p>Choi (fotnote): unntak kan være når et lån med lav rente har pant som kan tas ved mislighold, eller når høyrentegjeld lettere slettes i konkurs.<\/p><p><b>Felle:<\/b> å betale ned studielånet først fordi det er «gjeld til staten», eller boliglånet fordi det er størst.<\/p>",
"kilder": [
"Lån s. 13–14",
"Choi s. 20"
],
"eksamen": []
},
{
"id": "laan-rente-02",
"nivaa": "kjerne",
"kan": "Forklare sammenhengen mellom rente, risiko og sikkerhet",
"kort": "Jo høyere sannsynlighet for at du ikke betaler tilbake, jo høyere rente krever långiver. Boliglån er billig fordi banken har pant i boligen; forbrukslån har ingen sikkerhet og er mye dyrere.",
"mer": "<p>Lysbildene (s. 5 til 8). Bottom line: få banken til å oppfatte risikoen ved lånet ditt som lav.<\/p><p>Dette gir en uheldig dynamikk for fattige: uten tillit får man ikke billig lån, må ta dyrt forbrukslån og får enda mer gjeld.<\/p><p>Pantelån mot f.eks. smykker burde vært billig, men er dyrt i Norge. Aksjeeiere kan derimot låne med sikkerhet i aksjene (Sbanken verdipapirkreditt, inntil 85 %).<\/p><p>H2016 o3f: boligsikret rammelån til 3 % er langt billigere enn forbrukslån til 12 %.<\/p>",
"kilder": [
"Lån s. 4–9"
],
"eksamen": [
"H2016 o3f"
]
},
{
"id": "laan-rente-03",
"nivaa": "viktig",
"kan": "Forklare snøballmetoden og hvorfor økonomer avviser den",
"kort": "Dave Ramsey: betal ned den minste gjelden først for raske seire og motivasjon. Økonomer: betal høyest rente først, fordi det er billigst.",
"mer": "<p>Ramsey (s. 16): «Maybe. But if you were doing math, you wouldn't have credit card debt». Argumentet er atferdsendring, ikke matematikk.<\/p><p>Choi: 10 bøker anbefaler ikke å prioritere høyest rente, 10 gjør det og 9 anbefaler en variant av snøballen.<\/p><p><b>Felle:<\/b> å tro at snøballmetoden er billigst. Den kan bare forsvares med begrenset viljestyrke.<\/p>",
"kilder": [
"Lån s. 15–16",
"Choi s. 20"
],
"eksamen": []
},
{
"id": "laan-rente-04",
"nivaa": "viktig",
"kan": "Vurdere om lån med ekstremt høy rente kan være rasjonelt",
"kort": "Payday loans har typisk 260 til 1 000 % årlig rente. Det kan være rasjonelt for den som trenger penger nå og ikke har andre alternativer; i Norge finnes andre muligheter.",
"mer": "<p>Lysbildet (s. 10): mange som tar payday loans har ikke billige alternativer. Det subtile poenget er at det kan være rasjonelt å låne til ekstremt høy rente så lenge det ikke finnes andre alternativer.<\/p><p>I land med velutviklede finansmarkeder, som Norge, finnes det billigere muligheter.<\/p><p><b>Felle:<\/b> «høy rente er alltid irrasjonelt».<\/p>",
"kilder": [
"Lån s. 10"
],
"eksamen": []
},
{
"id": "laan-rente-05",
"nivaa": "viktig",
"kan": "Vurdere fordeler og ulemper ved kredittkort",
"kort": "Fordeler: forsikringer, større sikkerhet, rabatter og ingen rente så lenge hele beløpet betales hver måned. Ulempen: svært dyrt hvis man glemmer å betale.",
"mer": "<p>Lysbildet (s. 11 til 12). Kredittkort er altså greit for den som alltid betaler fakturaen.<\/p><p>Sammenheng med psykologi: nåtidsskjevhet gjør at noen bruker kortet til å låne og eksponentiell vekst-bias gjør at de undervurderer kostnaden.<\/p><p><b>Felle:<\/b> «kredittkort er alltid dårlig». Det er renten ved ubetalt saldo som er dyr, ikke kortet.<\/p>",
"kilder": [
"Lån s. 11–12"
],
"eksamen": []
},
{
"id": "laan-rente-06",
"nivaa": "viktig",
"kan": "Drøfte om høye renter bør reguleres",
"kort": "Standard teori: nei, ikke mellom rasjonelle, fullt informerte parter uten eksternaliteter. Regulering kan forsvares hvis høy rente skyldes desperasjon uten alternativer eller at låntakerne ikke forstår produktet. Risikable prosjekter skal betale høy rente.",
"mer": "<p>Lysbildene (s. 24 til 27). I Norge er «det meste lov» (Nettavisen: «Tilbyr lån til 115 prosent rente»).<\/p><p>Kunstig lav rente til svært risikable prosjekter gir feilallokering av kapital.<\/p><p>Strenge reguleringer av boliglån skyldes trolig mer bekymring for systemrisiko enn for enkeltindivider, siden høye forbrukslånsrenter er tillatt.<\/p>",
"kilder": [
"Lån s. 24–27"
],
"eksamen": []
},
{
"id": "laan-rente-07",
"nivaa": "detalj",
"kan": "Kjenne de ulike lånetypene og hvordan gjelden fordeler seg over livet",
"kort": "Studielån, boliglån, billån, forbrukslån, kredittkortgjeld, uformelle lån og obligasjoner. De har ulik risiko for långiver og derfor ulik rente.",
"mer": "<p>Lysbildet (s. 4). Pengene kan brukes til forbruk i dag eller til investeringer.<\/p><p>Figuren «Livssyklusmodellen i praksis» (s. 3, SSB 2018): gjelden er størst for husholdninger rundt 30 til 45 år og faller deretter, mens nettoformuen topper seg rundt 60 til 70 år.<\/p><p>Oppsummering (s. 28): lån er en måte å flytte ressurser fra fremtiden til i dag og det kan være både fornuftig og ufornuftig.<\/p>",
"kilder": [
"Lån s. 2–4",
"Lån s. 28"
],
"eksamen": []
},
{
"id": "laan-rente-08",
"nivaa": "detalj",
"kan": "Forklare hvorfor det har kommet mange nye forbruksbanker",
"kort": "Forbruksbanker har høy nettorente og små tap, altså stor fortjeneste. De har også billig finansiering fra innskudd. Høy fortjeneste trekker nye aktører inn i bransjen.",
"mer": "<p>H2016 o3i (eldre foreleser). Fasiten bruker bankens forretningsmodell: inn med penger, lån dem ut dyrere. Er det god fortjeneste i en bransje, kommer det nye aktører som vil ta del i superprofitten.<\/p><p>Koblingen til 2026-forelesningen: forbrukslån har ingen sikkerhet og derfor høy rente. I Norge er det meste lov på rentesiden (Lån s. 25).<\/p>",
"kilder": [
"H2016 fasit"
],
"eksamen": [
"H2016 o3i"
]
}
],
"kildenotat": "Lån og risikostyring (OA, forelesning 15; s. = PDF-side i ForelesningLån2026 (1), 23. september 2026)"
},
{
"id": "laan-atferd",
"forelesning": "Næss: lån, risikostyring og forsikring",
"tittel": "Låneatferd: gjeldsgåten og skjevheter",
"eksamensvekt": 1,
"viktigst": [
"Debt puzzle: 30 % i USA har kredittkortgjeld samtidig som de har andre midler",
"Forklaringer: mentalt regnskap (Thaler og Shefrin) og nåtidsskjevhet (present bias)",
"Eksponentiell vekst-bias: 1 kr til 1 % daglig rente i 10 år blir ca. 6 millioner milliarder",
"Folk velger ikke lavest rente (Ausubel) og betaler ikke høyest rente først (Gathergood)"
],
"punkter": [
{
"id": "laan-atferd-01",
"nivaa": "viktig",
"kan": "Forklare gjeldsgåten (the debt puzzle)",
"kort": "Mange har kredittkortgjeld samtidig som de har andre midler tilgjengelig; 30 % i USA. Det er vanskelig å forsvare rasjonelt. Selvhjelpsbøker hevder at penger på konto hindrer nye lån.",
"mer": "<p>Lysbildet (s. 18). Fordi optimal låneatferd er enkel (lån billigst, betal høyest rente først), blir avvik lette å se (s. 17).<\/p><p>Choi: 33 % av husholdninger med dyr kredittkortgjeld har samtidig minst en månedsinntekt i likvide midler (16,65 % mot 0,06 % rente i 2022). 14 bøker anbefaler å ha begge; den vanligste begrunnelsen er at bufferen hindrer ny gjeld.<\/p><p><b>Felle:<\/b> å kalle co-holding rasjonelt fordi man «har en buffer». Bufferen koster renteforskjellen.<\/p>",
"kilder": [
"Lån s. 17–18",
"Choi s. 20–21"
],
"eksamen": []
},
{
"id": "laan-atferd-02",
"nivaa": "viktig",
"kan": "Bruke mentalt regnskap til å forklare gjeld og sparing samtidig",
"kort": "Thaler og Shefrin: husholdninger bruker mentale kontoer, der pensjonssparing er urørlig og lønnskontoen fri. Det kan forklare at folk har dyr forbruksgjeld mens de sparer til pensjon.",
"mer": "<p>Lysbildet (s. 19). Standard teori sier at penger er ombyttbare: en krone er en krone uansett hvilken konto den står på.<\/p><p>Choi: 17 bøker anbefaler mentale kontoer (buffer, pensjon, bolig, utdanning). Det kan øke motivasjonen til å spare, men gir kjente feilvalg.<\/p>",
"kilder": [
"Lån s. 19",
"Psykologi s. 16",
"Choi s. 7"
],
"eksamen": []
},
{
"id": "laan-atferd-03",
"nivaa": "viktig",
"kan": "Forklare nåtidsskjevhet (present bias) og hvordan den påvirker låneatferd",
"kort": "Folk med nåtidsskjevhet bryr seg for mye om nåtiden i forhold til senere. De har større sannsynlighet for kredittgjeld og låner for mye.",
"mer": "<p>Lysbildene (s. 20 og 28). Spørsmålet på lysbildet: utnytter kredittkortselskapene dette?<\/p><p>Samme skjevhet er et argument for tvungen pensjonssparing og standardvalg (nudging): folk som ikke er langsiktige nok sparer for lite.<\/p><p><b>Felle:<\/b> å blande nåtidsskjevhet med lav tålmodighet i en vanlig, tidskonsistent modell. Skjevheten er at nåtiden får ekstra vekt.<\/p>",
"kilder": [
"Lån s. 20",
"Lån s. 28",
"Pensjon s. 5"
],
"eksamen": []
},
{
"id": "laan-atferd-04",
"nivaa": "viktig",
"kan": "Forklare eksponentiell vekst-bias med eksempelet fra forelesningen",
"kort": "Stango og Zinman (2009): folk forstår ikke hvor dyrt høy rente blir over tid. 1 kr til 1 % daglig rente i 10 år blir 1,01^3650 ≈ 5,9 × 10^15 kr, «6 millioner milliarder», ca. 740 000 kr til hver person i verden.",
"mer": "<p>Lysbildet (s. 21 til 23). Kontroll: 1,01<sup>3650<\/sup> = 5,93 × 10<sup>15<\/sup>; delt på ca. 8 mrd mennesker gir ca. 730 000 kr.<\/p><p>Samme mekanisme forklarer kostnadene ved fondsgebyrer over tid og verdien av å spare tidlig.<\/p><p><b>Felle:<\/b> å regne lineært (1 % × 3 650 dager = 36,5 ganger).<\/p>",
"kilder": [
"Lån s. 21–23"
],
"eksamen": []
},
{
"id": "laan-atferd-05",
"nivaa": "viktig",
"kan": "Kjenne funnene til Ausubel og Gathergood om kredittkortvalg",
"kort": "Ausubel (1999): folk foretrekker kort med lav startrente og høy rente senere, selv om totalkostnaden er høy. Gathergood m.fl. (2017): mange betaler ned en lik andel av hvert lån i stedet for høyest rente først.",
"mer": "<p>Lysbildet (s. 23). Begge bryter regelen om å låne billigst og betale ned dyrest først.<\/p><p><b>Avvik:<\/b> referansene var strøket i 2025-versjonen (ifølge hjelpekilden), men er med i 2026.<\/p><p>Teaser-renter utnytter nåtidsskjevhet: den lave startrenten føles viktig, den høye senere renten føles fjern. Choi viser at selvhjelpsbøkene også ofte anbefaler andre regler enn høyest rente først.<\/p>",
"kilder": [
"Lån s. 23",
"03-forelesninger-finans"
],
"eksamen": []
},
{
"id": "laan-atferd-06",
"nivaa": "detalj",
"kan": "Bruke System 1 og System 2 til å begrunne regulering av kredittreklame",
"kort": "Kahneman: raske, impulsive beslutninger (System 1) mot langsom refleksjon (System 2). Betenkningstid og forbud mot pågående kredittreklame kan være i kundens interesse på sikt.",
"mer": "<p>H2016 o3j (eldre foreleser): forslag om forbud mot visse former for kredittreklame for å dempe veksten i forbrukslån. Fasit: gode økonomiske valg krever at man tenker seg om og unngår impulshandel.<\/p><p>Kvadsheim nevner at forbrukslånsforskriften (2019) og gjeldsregisteret kom etter ti år med «vill vest» i forbrukslån.<\/p>",
"kilder": [
"H2016 fasit",
"Kvadsheim lb 7"
],
"eksamen": [
"H2016 o3j"
]
}
],
"kildenotat": "Lån og risikostyring (OA, forelesning 15; s. = PDF-side i ForelesningLån2026 (1), 23. september 2026)"
},
{
"id": "psyk-skjevheter",
"forelesning": "Næss: finansiell psykologi",
"tittel": "Bias, støy og atferdsskjevheter",
"eksamensvekt": 3,
"viktigst": [
"Bias = systematisk skjevhet i én retning mot en benchmark (finansteori); støy = feil uten retning",
"Overkonfidens forklarer hyppig handel (93 % tror de kjører bedre enn snittet)",
"Disposisjonseffekten: selger vinnere for tidlig og beholder tapere for lenge; forklares med tapsaversjon",
"Prospektteori: verdi av gevinst og tap mot et referansepunkt; konkav for gevinster, konveks for tap, brattere for tap",
"Heuristikker: menyeffekt og 1/N; i tillegg flokkatferd, ankring, bekreftelse, tilgjengelighet og mentalt regnskap"
],
"punkter": [
{
"id": "psyk-skjevheter-01",
"nivaa": "kjerne",
"kan": "Beskrive overkonfidens og hvordan den påvirker investering",
"kort": "Investorer overvurderer egne evner og evnen til å forutsi markedet (better-than-average). Det er en viktig forklaring på at folk handler aksjer for ofte og gjør det dårlig.",
"mer": "<p>Tall (s. 23 til 26): 93 % av amerikanere tror de kjører bedre enn gjennomsnittet; 94 % av professorer tror de foreleser bedre enn gjennomsnittet.<\/p><p>H2019 o9f ba om en kort beskrivelse (maks 250 ord): overvurdering av egen kunnskap og presisjon, hyppig handel, høyere kostnader og lavere avkastning.<\/p><p>Fondseksperimentet viste at informasjon om at proffene ikke slår markedet reduserte andelen som tror de selv kan slå markedet med 12 %.<\/p>",
"kilder": [
"Psykologi s. 16",
"Psykologi s. 23–26",
"Psykologi s. 56"
],
"eksamen": [
"H2019 o9f"
]
},
{
"id": "psyk-skjevheter-02",
"nivaa": "kjerne",
"kan": "Forklare tapsaversjon",
"kort": "Folk føler tap sterkere enn de gleder seg over like store gevinster. Tversky og Kahneman: nytten vurderes som gevinst eller tap i forhold til formuen ved start, mens standard teori bare bryr seg om formuesnivået.",
"mer": "<p>Lysbildene (s. 16 og 30). I regneoppgavene (H2019 o9g, H2022 o5(6)) modelleres tapsaversjon ved å gange nytten i scenarioer under referansepunktet med en faktor under 1 (1/1,03).<\/p><p>Tapsaversjon kan få en investor til å velge bank framfor aksjer, selv med samme objektive sannsynligheter.<\/p><p><b>Felle:<\/b> å blande tapsaversjon (asymmetri rundt et referansepunkt) med risikoaversjon (konkav nytte av formuesnivå).<\/p>",
"kilder": [
"Psykologi s. 16",
"Psykologi s. 30"
],
"eksamen": [
"H2022 o5(6)",
"H2019 o9g"
]
},
{
"id": "psyk-skjevheter-03",
"nivaa": "kjerne",
"kan": "Tegne og forklare verdifunksjonen i prospektteori",
"kort": "Verdien måles i gevinster og tap rundt et referansepunkt. Funksjonen er konkav for gevinster, konveks for tap og brattere for tap (tapsaversjon). I tillegg legger folk stor vekt på hendelser med lav sannsynlighet.",
"mer": "<p>Lysbildene (s. 30 til 31). Figuren: en gevinst på $0,05 gir ca. +10 i verdi, et tap på $0,05 gir ca. −40.<\/p><p><b>H2019 o9h<\/b> (forklar tre avvik fra standard nyttefunksjon):<\/p><ol><li>referansepunkt: verdi av endringer, ikke nivå<\/li><li>tapsaversjon: knekk i referansepunktet, brattere for tap<\/li><li>avtakende følsomhet: konkav for gevinst, konveks for tap (risikosøkende i tap)<\/li><\/ol><p><b>Felle:<\/b> å tegne konkav kurve også for tap.<\/p>",
"kilder": [
"Psykologi s. 30–31"
],
"eksamen": [
"H2019 o9h"
]
},
{
"id": "psyk-skjevheter-04",
"nivaa": "kjerne",
"kan": "Kjenne igjen heuristikkene menyeffekt og 1/N",
"kort": "Menyeffekt: aksjer eller fond som står øverst på listen velges oftere, uavhengig av kvalitet. 1/N-regelen: folk fordeler jevnt på tilgjengelige alternativer, selv når det ikke er optimalt.",
"mer": "<p>Lysbildet (s. 32): investorer forenkler komplekse valg gjennom heuristikker.<\/p>",
"kilder": [
"Psykologi s. 32"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-05",
"nivaa": "viktig",
"kan": "Definere bias og skille det fra støy",
"kort": "Bias = systematisk skjevhet: man bommer på et mål i én bestemt retning, målt mot en benchmark. Støy (noise) = feil uten noen spesiell retning.",
"mer": "<p>For å kalle noe en bias må vi ha et mål å sammenligne med (s. 8). Forelesningen bruker finansteori og empiri som benchmark: indeksfond, diversifisering, unngå høy lånerente, hypotesen om effektive markeder og CAPM (s. 14).<\/p><p>Forelesningen fokuserer på bias, altså avvik fra det man bør gjøre.<\/p><p><b>Felle:<\/b> å kalle tilfeldig uenighet mellom vurderinger for bias. Det er støy.<\/p>",
"kilder": [
"Psykologi s. 2–9",
"Psykologi s. 14"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-06",
"nivaa": "viktig",
"kan": "Forklare hvorfor både amatører og proffer taper mot markedet",
"kort": "Markedet er gjennomsnittet, men gebyrene og kurtasjen kommer i tillegg. Individer handler for ofte: 79 kr per handel er lite, men 3 600 handler koster 284 400 kr.",
"mer": "<p>Lysbildene (s. 21 til 22): en lang rekke artikler viser at individer i snitt handler for ofte og gjør det dårlig. Nordnet-prislisten brukes som eksempel (andre aktører er ganske like).<\/p><p>Lysbildet sier 284 000 kr; eksakt er 79 × 3 600 = 284 400 kr. (Hjelpekilden oppga 288 000 fra 2025-versjonen.)<\/p><p>Kobling: overkonfidens driver handelen og kostnadene trekker avkastningen under markedet.<\/p>",
"kilder": [
"Psykologi s. 21–22"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-07",
"nivaa": "viktig",
"kan": "Definere disposisjonseffekten og forklare hvorfor den er en feil",
"kort": "Tendensen til å selge aksjer med gevinst for tidlig og beholde tapende aksjer for lenge. Det strider mot teorien: salget bør bare avhenge av fremtidig forventet avkastning, ikke av kjøpsprisen.",
"mer": "<p>Lysbildet (s. 28). Kjøpsprisen er historie (sunk cost) og påvirker ikke fremtidig avkastning.<\/p><p>Hvorfor vil folk ikke selge tapere? Tapsaversjon og prospektteori (s. 29 til 30): å realisere et tap gjør vondt i forhold til referansepunktet (kjøpsprisen).<\/p><p><b>Felle:<\/b> å forklare den med risikoaversjon. Forklaringen er tapsaversjon rundt et referansepunkt.<\/p>",
"kilder": [
"Psykologi s. 27–30"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-08",
"nivaa": "viktig",
"kan": "Forklare flokkatferd og hva den kan føre til",
"kort": "Investorer har en tendens til å følge flokken, ofte uten egen informasjon eller analyse. Det kan bidra til bobler og krakk: dotcom-boblen på slutten av 1990-tallet, kryptorushet og Norwegian-aksjen i 2021.",
"mer": "<p>Lysbildene (s. 16 og 38).<\/p><p><b>Felle:<\/b> å blande flokkatferd (følge andre) med tilgjengelighetsbias (overvurdere det du nylig har sett) eller bekreftelsesbias (søke informasjon som støtter deg).<\/p><p>Norwegian-aksjen i 2021 er forelesningens norske eksempel: mange småsparere kjøpte fordi andre gjorde det, før aksjen stupte. Flokkatferd kan få priser til å avvike lenge fra fundamentale verdier.<\/p>",
"kilder": [
"Psykologi s. 16",
"Psykologi s. 38"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-09",
"nivaa": "viktig",
"kan": "Definere bekreftelsesbias",
"kort": "Tendensen til å søke informasjon som bekrefter egne antakelser.",
"mer": "<p>Lysbildet (s. 16). Henger sammen med overkonfidens: den som tror på en aksje, leser analyser som støtter kjøpet og overser resten.<\/p><p>Typisk flervalgsfelle: et alternativ som beskriver «følger mengden» (flokk) eller «første tall man ser» (ankring) under navnet bekreftelsesbias.<\/p><p>Mottiltak: oppsøk argumenter mot egen investering.<\/p>",
"kilder": [
"Psykologi s. 16"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-10",
"nivaa": "viktig",
"kan": "Definere ankereffekten",
"kort": "Å legge for stor vekt på den første informasjonen (ankeret) man får når man tar en beslutning.",
"mer": "<p>Lysbildet (s. 16). Eksempel i investering: å bruke kjøpskursen eller en tidligere toppkurs som ankerpunkt for hva aksjen «egentlig» er verdt. Det henger sammen med disposisjonseffekten, der kjøpsprisen er referansepunktet.<\/p><p><b>Felle:<\/b> å blande ankring (første informasjon veier for tungt) med tilgjengelighet (levende eksempler veier for tungt).<\/p>",
"kilder": [
"Psykologi s. 16"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-11",
"nivaa": "viktig",
"kan": "Definere mentalt regnskap",
"kort": "Å behandle penger forskjellig avhengig av hvor de kommer fra eller hva de skal brukes til, i stedet for å se pengene som en helhet.",
"mer": "<p>Lysbildet (s. 16). Lån s. 19 (Thaler og Shefrin): pensjonssparing som urørlig og lønnskonto som fri kan forklare at folk har dyr forbruksgjeld mens de sparer.<\/p><p>Choi: 17 selvhjelpsbøker anbefaler mentale kontoer for ulike mål; økonomer sier at penger er ombyttbare.<\/p>",
"kilder": [
"Psykologi s. 16",
"Lån s. 19",
"Choi s. 7"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-12",
"nivaa": "viktig",
"kan": "Definere tilgjengelighetsbias",
"kort": "Å overvurdere sannsynligheten for hendelser basert på nylige, levende eller lett tilgjengelige eksempler.",
"mer": "<p>Lysbildet (s. 16). Nevnes også som mulig forklaring på home bias (s. 61): det norske markedet er mest tilgjengelig i hukommelsen.<\/p><p>Eksempel: å tro at et krakk er mer sannsynlig rett etter mye omtale av et krakk.<\/p><p>Mottiltak: bruk historiske data og basisrater.<\/p>",
"kilder": [
"Psykologi s. 16",
"Psykologi s. 61"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-13",
"nivaa": "viktig",
"kan": "Forklare hvorfor manglende deltakelse i aksjemarkedet ikke skyldes risikoaversjon",
"kort": "Under 50 % eier aksjer i nesten alle land. Risikoaversjon forklarer det ikke: de fleste nyttefunksjoner er tilnærmet risikonøytrale for svært små beløp, så den første aksjen gir lite risiko.",
"mer": "<p>Lysbildet (s. 18 til 19 i versjon (2)). <b>Avvik:<\/b> versjon (4) fra 16. oktober beholder spørsmålet, men har fjernet svaret om risikoaversjon.<\/p><p>Om man trenger sparing avhenger av hvor man er i livssyklusen.<\/p><p><b>Norge<\/b> (s. 20): nesten alle har bankinnskudd; boligeie stiger raskt fra 30. til 40. persentil; aksjer eller aksjefond stiger med formuen, fra nesten ingen i bunnen til ca. 70 % helt øverst; direkte aksjer er sjeldne unntatt helt øverst.<\/p><p>Choi: alternativ forklaring er at folk mener penger som kan trengs snart ikke skal stå i aksjer.<\/p>",
"kilder": [
"Psykologi s. 18–20",
"Choi s. 12"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-14",
"nivaa": "viktig",
"kan": "Kjenne funnene om følelser og aksjeavkastning",
"kort": "Dårlig vær henger sammen med lavere avkastning i aksjemarkedet (Hirshleifer og Shumway 2003). Tap i en viktig fotballkamp reduserer avkastningen med 0,2 % (Edmans m.fl. 2007).",
"mer": "<p>Lysbildet (s. 39). Poenget er at stemning, ikke ny informasjon, kan flytte prisene. Det er et argument mot at markedet alltid er fullt rasjonelt, men det gir ingen enkel handelsstrategi for småsparere.<\/p><p>Effektene er små i forhold til gebyrene en aktiv strategi ville gitt.<\/p>",
"kilder": [
"Psykologi s. 39"
],
"eksamen": []
},
{
"id": "psyk-skjevheter-15",
"nivaa": "detalj",
"kan": "Forklare Kahnemans studie av støy og hvordan støy reduseres",
"kort": "Ansatte i et forsikringsselskap satte premie på seks realistiske saker. Ledelsen ventet ca. 10 % uenighet, men forskjellen mellom to personer var i snitt ca. 50 % (f.eks. 700 mot 1 250). Bruk algoritmer og enkle modeller i stedet for magefølelse.",
"mer": "<p>Lysbildene (s. 9 til 13, boken «Noise»). Vurderinger påvirkes ikke bare av bias, men også av tilfeldige forskjeller.<\/p><p>Enkle modeller gir mer stabile vurderinger enn mennesker. Koblingen til investering: faste regler (indeksfond, fast spareplan) reduserer både bias og støy.<\/p><p>Forelesningen fokuserer likevel på bias.<\/p>",
"kilder": [
"Psykologi s. 9–13"
],
"eksamen": []
}
],
"kildenotat": "Finansiell psykologi (OA, forelesning 16; s. = PDF-side i Finansiell_psykologi2026 (2), 23. september 2026; (4) er datert 16. oktober 2026)"
},
{
"id": "psyk-nytte",
"forelesning": "Næss: finansiell psykologi",
"tittel": "Sparevalg med ln-nytte: subjektive sannsynligheter og tapsaversjon",
"eksamensvekt": 3,
"viktigst": [
"Velg alternativet med høyest forventet nytte, ikke høyest forventet sluttverdi",
"E[ln W] = Σ p × ln(W); bank gir ln av det sikre beløpet",
"Subjektive sannsynligheter er en bias: sluttverdiene er de samme, bare vektene endres",
"Tapsaversjon: gang nytten i scenarioer under referansepunktet med en faktor under 1 (1/1,03 = 0,9709)"
],
"punkter": [
{
"id": "psyk-nytte-01",
"nivaa": "kjerne",
"kan": "Regne forventet sluttverdi og forventet nytte for bank og aksjer",
"kort": "Forventet sluttverdi = Σ p × W. Forventet nytte = Σ p × ln(W). H2022: aksjer har forventet sluttverdi 1 132 474 (over banken 903 056), men nytten 13,496 er lavere enn bankens 13,714, så banken velges.",
"mer": "<p><b>H2022 o5 (Martin, 500 000 i 20 år):<\/b><\/p><ul><li>(1) bank: (903 056/500 000)<sup>1/20<\/sup> − 1 = 3,0 %<\/li><li>(2) aksjer: 0,4 × 2 330 479 + 0,6 × 333 804 = 1 132 474<\/li><li>(3) ln(903 056) = 13,714 mot 0,4 ln(2 330 479) + 0,6 ln(333 804) = 13,496: bank<\/li><\/ul><p><b>H2019 o9<\/b> (Ole Gunnar, 1 mill i 10 år): 2,0 %; forventet 1 353 814; ln-nytte bank 14,014 mot aksjer 14,002: bank.<\/p><p><b>Felle:<\/b> å velge aksjer fordi forventet sluttverdi er høyest.<\/p>",
"kilder": [
"H2022 sensorveiledning",
"H2019 fasit"
],
"eksamen": [
"H2022 o5(1)",
"H2022 o5(2)",
"H2022 o5(3)",
"H2019 o9a",
"H2019 o9b",
"H2019 o9c"
]
},
{
"id": "psyk-nytte-02",
"nivaa": "kjerne",
"kan": "Forklare og regne effekten av subjektive sannsynligheter",
"kort": "Å bruke subjektive i stedet for objektive sannsynligheter er en bias. Sluttverdiene endres ikke, bare vektene. H2022 med 50/50: nytten av aksjer blir 13,690, fortsatt under bankens 13,714.",
"mer": "<p><b>H2022 o5(4):<\/b> sluttverdiene er de samme (2 330 479, 333 804 og 903 056), alternativ (d). De andre alternativene endrer beløpene.<\/p><p><b>H2022 o5(5):<\/b> 0,5 ln(2 330 479) + 0,5 ln(333 804) = 13,690 &lt; 13,714: fortsatt bank (d).<\/p><p><b>H2019 o9d og o9e:<\/b> med disse tallene snur valget: 0,5 ln(2 158 925) + 0,5 ln(817 073) = 14,099 &gt; 14,014, så aksjer. Overoptimisme kan altså endre valget.<\/p>",
"kilder": [
"H2022 sensorveiledning",
"H2019 fasit"
],
"eksamen": [
"H2022 o5(4)",
"H2022 o5(5)",
"H2019 o9d",
"H2019 o9e"
]
},
{
"id": "psyk-nytte-03",
"nivaa": "kjerne",
"kan": "Regne effekten av tapsaversjon på valget mellom bank og aksjer",
"kort": "Gang nytten i scenarioet under referansepunktet (startbeløpet) med 1/1,03 = 0,9709. H2022: 0,4 ln(2 330 479) + 0,6 × 0,9709 × ln(333 804) = 13,273, lavere enn 13,714, så bank.",
"mer": "<p><b>H2022 o5(6):<\/b> riktig (b) 13,273. Referansepunktet er initial investering (500 000); bare det dårlige scenarioet (333 804) er et tap.<\/p><p><b>H2019 o9g:<\/b> 0,4 ln(2 158 925) + 0,6 × 0,9709 × ln(817 073) = 13,764 &lt; 14,014: bank. Tapsaversjon forsterker bankvalget.<\/p><p><b>Felle:<\/b> å gange begge scenarioene med faktoren, eller å bruke subjektive sannsynligheter når oppgaven sier objektive. Fordi ln(W) &gt; 0, gjør en faktor under 1 tapsutfallet «verre».<\/p>",
"kilder": [
"H2022 sensorveiledning",
"H2019 fasit",
"Psykologi s. 30"
],
"eksamen": [
"H2022 o5(6)",
"H2019 o9g"
]
}
],
"kildenotat": "Sparing med forventet nytte og bias (eldre OA-oppgaver H2019 o9 og H2022 o5; Psykologi s. 16 og 30)"
},
{
"id": "psyk-homebias",
"forelesning": "Næss: finansiell psykologi",
"tittel": "Home bias og norske investorer",
"eksamensvekt": 3,
"viktigst": [
"Norge er 0,2 % av verdens aksjemarked, men mange nordmenn eier bare eller hovedsakelig norske aksjer",
"Feil fordi arbeidsinntekten allerede er knyttet til AS Norge: jobb og portefølje svikter samtidig",
"Norge har høyest standardavvik av markedene (ca. 25 % mot ca. 14 til 15 % for globalt marked, 1970 til 2020)",
"Informasjon fikk folk til å forstå risikoen, men ikke til å endre porteføljen: bias eller preferanse"
],
"punkter": [
{
"id": "psyk-homebias-01",
"nivaa": "kjerne",
"kan": "Forklare hvorfor nordmenn ikke bør investere mest i norske aksjer",
"kort": "Spre investeringene for å redusere risiko: kjøp fond i stedet for enkeltaksjer og ikke for mye Norge. Går AS Norge dårlig, rammes både jobben og porteføljen.",
"mer": "<p>Lysbildet (s. 36): går det bra med AS Norge, har du det godt i arbeidsmarkedet; går det dårlig, har du det mindre godt. Norske aksjer dobler eksponeringen.<\/p><p>Samme logikk som aksjelik humankapital og valutasikring (H2024 o12c).<\/p>",
"kilder": [
"Psykologi s. 33–36",
"Aksjesparing s. 16–17"
],
"eksamen": [
"H2024 o12c"
]
},
{
"id": "psyk-homebias-02",
"nivaa": "viktig",
"kan": "Vite hvor stor del av verdens aksjemarked Norge utgjør",
"kort": "Det norske aksjemarkedet er 0,2 % av verdens aksjemarked.",
"mer": "<p>Lysbildene (s. 33 og 59). Versjon (4) presiserer at mange nordmenn investerer «bare eller hovedsakelig» i norske aksjer (versjon (2): «bare akkurat her»).<\/p><p>Til sammenligning har et globalt indeksfond ca. 70 % i USA (Aksjesparing s. 75).<\/p><p><b>Felle:<\/b> å forveksle 0,2 % med Norges andel av verdens BNP eller med oljefondets eierandel.<\/p>",
"kilder": [
"Psykologi s. 33",
"Psykologi s. 59",
"Aksjesparing s. 75"
],
"eksamen": []
},
{
"id": "psyk-homebias-03",
"nivaa": "viktig",
"kan": "Vite at det norske aksjemarkedet har vært blant de mest volatile",
"kort": "Vanguard-data 1970 til 2020: Norge har høyest årlig standardavvik av markedene i figuren (ca. 25 %), mens det globale markedet har lavest (ca. 14 til 15 %).",
"mer": "<p>Figuren «Home bias» (s. 37). USA, Sveits og eurosonen ligger lavt; Norge, Italia og Østerrike høyt.<\/p><p>Poenget: et lite, sektorkonsentrert marked (olje, finans) er mindre diversifisert. Det globale markedet er en diversifisert portefølje av alle.<\/p><p><b>Felle:<\/b> «norske aksjer har lavere standardavvik enn utenlandske».<\/p><p>Tallene er lest av en figur.<\/p>",
"kilder": [
"Psykologi s. 37"
],
"eksamen": []
},
{
"id": "psyk-homebias-04",
"nivaa": "viktig",
"kan": "Beskrive home bias-eksperimentet og resultatet",
"kort": "Investorer ble fortalt at en Norge-tung portefølje gir høyere risiko og lavere diversifisering. De forsto budskapet (rapporterte at Norge er mer risikabelt), men endret ikke porteføljene.",
"mer": "<p>Lysbildene (s. 57 til 60): kan folk diversifisere mer gjennom enkel informasjon? Kort svar: ofte nei. Informasjon alene endrer sjelden porteføljer.<\/p><p>Kontrast til fondseksperimentet: å bytte til billige fond er lett å forstå og gjennomføre og der virket informasjonen.<\/p><p>Tolkning: preferanser kan forklare home bias.<\/p>",
"kilder": [
"Psykologi s. 57–60"
],
"eksamen": []
},
{
"id": "psyk-homebias-05",
"nivaa": "viktig",
"kan": "Drøfte om home bias er en bias eller en preferanse",
"kort": "Det kan være bias (50/50-heuristikk, tilgjengelighet) eller preferanser (tilhørighet, hjemmekjærlighet, «jeg vil eie det jeg kjenner»).",
"mer": "<p>Lysbildet (s. 61): folk lærer at global spredning er klokt, men velger likevel å bli i Norge.<\/p><p>Skillet er viktig fordi en bias kan rettes med informasjon eller nudging, mens en preferanse er legitim.<\/p><p>Choi: i teorien rasjonaliseres home bias ofte ved at hjemlige aksjer sikrer mot lønnsrisiko, men for Norge peker humankapitalargumentet motsatt vei (aksjene samvarierer med lønnen).<\/p>",
"kilder": [
"Psykologi s. 61",
"Choi s. 18"
],
"eksamen": []
}
],
"kildenotat": "Finansiell psykologi (OA, forelesning 16; s. = PDF-side i Finansiell_psykologi2026 (2), 23. september 2026; (4) er datert 16. oktober 2026)"
},
{
"id": "psyk-choi",
"forelesning": "Næss: finansiell psykologi",
"tittel": "Choi: økonomer mot selvhjelpsbøker",
"eksamensvekt": 2,
"viktigst": [
"Choi sammenligner rådene i de 50 mest populære bøkene om personlig økonomi (47 med relevante råd) med normative økonomiske modeller",
"Eneste klare enighet: invester bare i passive indeksfond",
"Uenige om sparerate, tidshorisont, utbytte, faktorer, internasjonal andel, gjeld og fast eller flytende rente",
"Bøkenes styrke: enkle regler og at de tar hensyn til begrenset viljestyrke og følelser"
],
"punkter": [
{
"id": "psyk-choi-01",
"nivaa": "kjerne",
"kan": "Kontrastere synet på aksjeandel og tidshorisont",
"kort": "Bøkene: aksjer blir mindre risikable med lang horisont, så penger som trengs snart skal stå i kontanter. Økonomer: risiko er varians; med CRRA og uavhengige avkastninger er horisonten uten betydning (Samuelson og Merton 1969). Begge gir pukkelformet aksjeandel over livet, men økonomene begrunner det med humankapital.",
"mer": "<p>Aksjesparing s. 20: «Økonomer er egentlig ikke enige i at risikoen blir mindre ved lang tidshorisont.» Samme råd (eldre mindre aksjer), ulik grunn.<\/p><p>Choi: bare 8 bøker nevner humankapital. Hvis avkastningen er gjennomsnittsreverterende, kan lang horisont rettferdiggjøre mer aksjer (Barberis 2000), men det er omstridt.<\/p><p><b>H2025 o11(4) alt A<\/b> er selvhjelpsbøkenes argument og er feil svar.<\/p>",
"kilder": [
"Choi s. 10–14",
"Aksjesparing s. 20"
],
"eksamen": [
"H2025 o11(4)"
]
},
{
"id": "psyk-choi-02",
"nivaa": "viktig",
"kan": "Gjengi hva Choi undersøker og hans konklusjon",
"kort": "Choi sammenligner rådene i de 50 mest populære bøkene om personlig økonomi (Goodreads 2019, 47 med relevante råd) med normative økonomiske modeller. Populære råd avviker ofte, noen ganger på grunn av feilslutninger, men er lette å bruke og tar hensyn til begrenset viljestyrke.",
"mer": "<p>Konklusjonen (s. 24): populære råd har to styrker: (1) rådet kan regnes ut av vanlige folk uten å løse et dynamisk optimeringsproblem og (2) det tar hensyn til vansker med å gjennomføre en plan (motivasjon, følelser). Økonomer bør utvikle normative modeller med disse egenskapene.<\/p><p>Forelesningen bruker Choi i tre lysbilder: tidshorisont (Aksjesparing s. 20), kovarians (s. 96) og snøballmetoden (Lån s. 15), pluss oppsummeringstabellen (Psykologi s. 40).<\/p>",
"kilder": [
"Choi s. 2–3",
"Choi s. 24",
"Psykologi s. 40"
],
"eksamen": []
},
{
"id": "psyk-choi-03",
"nivaa": "viktig",
"kan": "Kontrastere rådene om sparing hos bøker og økonomer",
"kort": "Bøkene: spar 10 til 15 % av inntekten uansett alder, ikke kjøp livrente og del sparingen i mentale kontoer. Økonomer: glatt forbruket (lav eller negativ sparing som ung, høy midt i livet), kjøp livrente med hele formuen som pensjonist og penger er ombyttbare.",
"mer": "<p>Tabell 1 (s. 29). Flere bøker: 32 av 45 sier start å spare nå, 31 fremhever rentes rente, 28 anbefaler en bufferkonto, 16 sier «pay yourself first».<\/p><p>Pensjonist: bøkene anbefaler å bruke 3 til 8 % av formuen i året og bevare realverdien; livssyklusmodellen sier at formuen skal brukes opp og Yaari (1965) anbefaler full livrente mot levetidsrisiko.<\/p><p><b>Felle:<\/b> å tro at fast sparerate er økonomenes råd.<\/p>",
"kilder": [
"Choi s. 4–9",
"Choi s. 29"
],
"eksamen": []
},
{
"id": "psyk-choi-04",
"nivaa": "viktig",
"kan": "Vite hvor bøker og økonomer er enige",
"kort": "Om aktiv mot passiv forvaltning: invester bare i passive indeksfond. 24 bøker anbefaler indeksfond, bare 7 aktiv forvaltning.",
"mer": "<p>Choi (s. 19): gjennomsnittlig aktivt amerikansk aksjefond gjør det 0,67 % dårligere i året enn passive (French 2008), likevel stod 60 % av fondsmidlene i aktive fond i 2020.<\/p><p>Choi mener enigheten kan skyldes at statistikken om gjennomsnittlig resultat og manglende varighet er enkel å regne, forstå og formidle. Peter Lynch, en av de få som anbefaler aktiv forvaltning, tjente selv formuen som aktiv forvalter.<\/p>",
"kilder": [
"Choi s. 19",
"Choi s. 29"
],
"eksamen": []
},
{
"id": "psyk-choi-05",
"nivaa": "viktig",
"kan": "Kontrastere rådene om gjeld",
"kort": "Bøkene: betal ned høyest rente eller minste saldo først (snøball) og det kan være lurt å ha lavrentesparing og høyrentegjeld samtidig. Økonomer: betal høyest rente først og ikke hold begge samtidig.",
"mer": "<p>Choi (s. 20 til 21): 9 bøker anbefaler snøballmetoden (Ramsey). 14 bøker støtter å ha begge samtidig, oftest fordi bufferen hindrer ny gjeld. 33 % av husholdninger med dyr kredittkortgjeld har samtidig minst en månedsinntekt i likvide midler.<\/p><p>Lån s. 15 til 16 bruker Ramsey-sitatet om «quick wins».<\/p>",
"kilder": [
"Choi s. 20–21",
"Choi s. 29",
"Lån s. 15–16"
],
"eksamen": []
},
{
"id": "psyk-choi-06",
"nivaa": "viktig",
"kan": "Kontrastere rådene om fast eller flytende boliglånsrente",
"kort": "Bøkene: velg fast rente. Økonomer: velg flytende rente med mindre rentene er lave (Campbell og Cocco).",
"mer": "<p>Choi (s. 22 til 23): fastrentelån er utsatt for inflasjonsrisiko og har en premie for refinansieringsopsjonen; flytende lån følger korte renter og er ofte billigere. 11 bøker sier flytende er mer risikabelt fordi terminbeløpet svinger og bare 2 nevner inflasjonsrisikoen (pengeillusjon).<\/p><p>Sammenlign H2019 o8b: flytende ser ut til å gi høyest forventet nytte, men det varierer fra person til person.<\/p>",
"kilder": [
"Choi s. 22–23",
"Choi s. 29"
],
"eksamen": [
"H2019 o8b"
]
},
{
"id": "psyk-choi-07",
"nivaa": "viktig",
"kan": "Kontrastere synet på internasjonal diversifisering",
"kort": "Teorien: hold hvert lands aksjer i forhold til markedsverdien. Bøkene: hold utenlandske aksjer, men langt under markedsvekten (snitt 27 % mot 59 % ikke-amerikansk andel av verdensmarkedet i 2021).",
"mer": "<p>Choi (s. 18): bøkenes begrunnelser (mer risiko, valutarisiko, dårligere informasjon, USA vokser mest) avvises stort sett av økonomer. Valutarisiko kan sikres billig og høy forventet vekst er allerede priset inn.<\/p><p>Modeller som rasjonaliserer home bias bruker hjemlige aksjer som sikring mot lønnsrisiko, et motiv ingen bok nevner. For Norge trekker forelesningen motsatt vei (Psykologi s. 36).<\/p>",
"kilder": [
"Choi s. 18",
"Choi s. 29",
"Psykologi s. 36"
],
"eksamen": []
},
{
"id": "psyk-choi-08",
"nivaa": "viktig",
"kan": "Kontrastere synet på utbytte og faktorer",
"kort": "Bøkene: både høyt utbytte og verdi- og småselskapsaksjer er attraktive. Økonomer: høyt utbytte er uattraktivt, mens verdi og små selskaper kan eller kan ikke være attraktive.",
"mer": "<p><b>Utbytte<\/b> (s. 16): Modigliani og Miller (1961): utbyttepolitikk er irrelevant uten skatt og friksjoner, fordi investoren kan selge aksjer for å få kontanter. I USA er utbytte skattemessig ugunstig. Feilslutningen er at utbytte kommer «i tillegg» til kursgevinst.<\/p><p><b>Faktorer<\/b> (s. 17): 8 bøker anbefaler verdi, 14 små selskaper, bare 3 nevner at verdiaksjer kan være mer risikable. Debatten er feilprising mot risikokompensasjon (Aksjesparing s. 88 til 95).<\/p>",
"kilder": [
"Choi s. 16–17",
"Choi s. 29",
"Aksjesparing s. 88–95"
],
"eksamen": []
},
{
"id": "psyk-choi-09",
"nivaa": "viktig",
"kan": "Vite hvilke grunnbegreper i porteføljeteorien bøkene mangler",
"kort": "Avtakende grensenytte (bare 5 bøker) og kovarians mellom avkastning og grensenytte (ingen bøker), selv om dette er kjernen i økonomenes porteføljeteori.",
"mer": "<p>Choi (s. 14 til 15). Bøkene tenker risiko som sannsynligheten for å tape eller å måtte selge med tap. Økonomer tenker varians og kovarians.<\/p><p>Aksjesparing s. 96: CAPM-logikken er at man bare får betalt for risiko som ikke kan diversifiseres bort, altså kovariansen med markedet og «ingen selvhjelpsbøker nevner kovarians».<\/p>",
"kilder": [
"Choi s. 14–15",
"Aksjesparing s. 96"
],
"eksamen": []
},
{
"id": "psyk-choi-10",
"nivaa": "detalj",
"kan": "Kjenne Chois alternative forklaring på manglende deltakelse i aksjemarkedet",
"kort": "Mener folk at penger som kan trengs snart ikke skal stå i aksjer, blir lav deltakelse som stiger med formuen et naturlig resultat, også uten faste deltakelseskostnader.",
"mer": "<p>Choi (s. 12): bare halvparten av amerikanske husholdninger eier aksjer, direkte eller indirekte. Det er en gåte for teorien, fordi alle bør eie litt aksjer når nyttefunksjonen er tilnærmet lineær for små beløp (Rabin 2000).<\/p><p>Vanlig akademisk forklaring er faste kostnader ved å delta; Chois forklaring kommer fra bøkenes «bøtte»-tenkning.<\/p>",
"kilder": [
"Choi s. 12",
"Psykologi s. 18–19"
],
"eksamen": []
},
{
"id": "psyk-choi-11",
"nivaa": "detalj",
"kan": "Kjenne bøkenes råd om egenkapital, løpetid og ekstra nedbetaling av boliglån",
"kort": "Fem bøker anbefaler minst 20 % egenkapital; seks anbefaler 30 års lån, mens Ramsey anbefaler 15 år. Elleve bøker anbefaler å betale ned boliglånet raskere enn avtalt (fire av dem av emosjonelle grunner); litteraturen gir lite veiledning.",
"mer": "<p>Choi (s. 23 til 24). Ingen bøker foreslår lavere egenkapital for å begrense eksponeringen mot boligprisene når man er pessimistisk (Bailey m.fl. 2019).<\/p><p>Refinansiering: bøkene bruker tommelfingerregler (rentefall på minst 1 prosentpoeng), mens den optimale regelen (Agarwal, Driscoll og Laibson 2013) er langt mer kompleks.<\/p>",
"kilder": [
"Choi s. 23–24"
],
"eksamen": []
}
],
"kildenotat": "Choi (2022): Popular Personal Financial Advice versus the Professors (s. = PDF-side), brukt i Psykologi s. 40 (lysbildet er fjernet i versjon (4) fra 16. oktober), Aksjesparing s. 20 og 96 og Lån s. 15"
},
{
"id": "psyk-laering",
"forelesning": "Næss: finansiell psykologi",
"tittel": "Finansiell kunnskap, bankråd, nudging og fondseksperimentet",
"eksamensvekt": 1,
"viktigst": [
"Folk kan lite om finans (Big 3: rente, inflasjon, diversifisering)",
"Banken har interessekonflikt: nedbetaling av lån gir den 0 produkter, aktivt fond 2",
"Nudging med standardvalg: automatisk pensjonssparing gir 50 % større sjanse for å spare",
"Fondseksperimentet: informasjon om Forbrukerrådets funn økte indeksandelen fra 11 til 15 % (ca. 30 %), varig i 2 år",
"Lære folk finans: blandede resultater; konkrete råd virker bedre enn generell opplæring"
],
"punkter": [
{
"id": "psyk-laering-01",
"nivaa": "viktig",
"kan": "Forklare hvorfor banken ikke er en nøytral rådgiver",
"kort": "Spør du banken om 100 000 kr bør gå til nedbetaling av boliglån eller et aktivt fond: nedbetaling gir banken 0 produkter å tjene på, fondet gir 2. Det kan forklare at bankene snakker lite om nedbetaling som god sparing.",
"mer": "<p>Lysbildet (s. 47). Versjon (2) legger til at bankansatte ofte brukes som økonomieksperter i media og fremstår som uavhengige, mens de representerer arbeidsgiveren sin. Den setningen er fjernet i (4).<\/p><p>Kobling: nedbetaling av dyr gjeld gir sikker avkastning lik renten etter skatt.<\/p>",
"kilder": [
"Psykologi s. 47"
],
"eksamen": []
},
{
"id": "psyk-laering-02",
"nivaa": "viktig",
"kan": "Forklare nudging og effekten av standardvalg",
"kort": "Nudging (dulting) gjør det lettere å ta gode valg uten drastiske endringer i insentivene. Standardvalg er viktig for pensjonssparing (Thaler og Sunstein): de som får pensjonssparing automatisk har 50 % større sjanse for å spare, selv om de lett kan la være.",
"mer": "<p>Lysbildet (s. 49).<\/p><p>Kobling til pensjon: obligatorisk tjenestepensjon og standard risikoprofil (50/50) er en form for standardvalg. Kobling til lån: nåtidsskjevhet gjør at folk sparer for lite uten dulting.<\/p><p><b>Felle:<\/b> nudging er ikke tvang og ikke økonomiske insentiver som skattefradrag.<\/p>",
"kilder": [
"Psykologi s. 48–49"
],
"eksamen": []
},
{
"id": "psyk-laering-03",
"nivaa": "viktig",
"kan": "Beskrive fondseksperimentet og resultatene",
"kort": "Ca. 590 norske fondskunder; en tilfeldig halvpart fikk Forbrukerrådets funn (indeksfond har slått aktive fond på globale aksjer). Indeksandelen økte ca. 4 pp, fra 11 til 15 % («ca. 30 %») og effekten var like stor to år senere.",
"mer": "<p>Lysbildene (s. 53 til 56). Randomisert: forskjellen mellom gruppene er effekten av informasjonen.<\/p><p>Informasjonen endret også troen på egne ferdigheter: andelen som tror de selv kan slå markedet falt med 12 % og andelen som tror de kan finne de beste aktive fondene falt også.<\/p><p>Regnekontroll: 4/11 = 36 %, så «ca. 30 %» er en grov avrunding.<\/p>",
"kilder": [
"Psykologi s. 53–56"
],
"eksamen": []
},
{
"id": "psyk-laering-04",
"nivaa": "viktig",
"kan": "Kjenne tallene om nordmenns fondssparing",
"kort": "Halvparten av nordmenn har aksjefond. Over halvparten av vanlige folks fondspenger står i aktive fond, som koster ca. fem ganger mer enn indeksfond. DN: norske kunder har betalt 34 mrd kr for mye i gebyrer.",
"mer": "<p>Lysbildet (s. 52), innledningen til caset «aktive fond mot indeksfond». Planen for forelesningen (s. 5) nevner to norske case: for mye i Norge og for lite globalt og dyre aktive fond i stedet for billige indeksfond.<\/p><p>Kobling: aktive fond koster 1 til 2 % i året (Aksjesparing s. 78) og taper mot indeks etter kostnader.<\/p>",
"kilder": [
"Psykologi s. 5",
"Psykologi s. 51–52"
],
"eksamen": []
},
{
"id": "psyk-laering-05",
"nivaa": "viktig",
"kan": "Kjenne de tre «Big 3»-spørsmålene om finansiell kunnskap",
"kort": "1) 100 dollar til 2 % rente i 5 år: mer enn 102. 2) Rente 1 % og inflasjon 2 %: du kan kjøpe mindre enn i dag. 3) «Én aksje gir sikrere avkastning enn et aksjefond»: usant.",
"mer": "<p>Lysbildene (s. 42 til 45). Andel som svarer riktig på alle tre: Tyskland 53 %, Sveits 50 %, USA 30 % (Lusardi og Mitchell 2011), Sverige 21 %, Russland og Romania under 4 %.<\/p><p>Poenget: finansmodellene antar full informasjon, men i praksis kan mange veldig lite.<\/p>",
"kilder": [
"Psykologi s. 42–46"
],
"eksamen": []
},
{
"id": "psyk-laering-06",
"nivaa": "viktig",
"kan": "Forklare når informasjon endrer atferd og når den ikke gjør det",
"kort": "Informasjon virker når rådet er enkelt å forstå og gjennomføre (bytte til billige fond). Informasjon alene endrer sjelden mer krevende valg som diversifisering (home bias).",
"mer": "<p>Lysbildene (s. 57 til 58): «Kan vi også få folk til å diversifisere mer gjennom enkel informasjon? Kort svar: Ofte nei.»<\/p><p>Sammenlign fondseksperimentet (virket, varig) med home bias-eksperimentet (forsto, men handlet ikke).<\/p><p>Konsekvens: velg tiltak etter hvor vanskelig endringen er. Enkle bytter kan løses med informasjon, mens tyngre valg trenger standardvalg eller nudging.<\/p>",
"kilder": [
"Psykologi s. 57–61"
],
"eksamen": []
},
{
"id": "psyk-laering-07",
"nivaa": "viktig",
"kan": "Konkludere om man kan lære folk finans",
"kort": "Litteraturen er blandet: det er vanskelig å gjøre folk generelt dyktige, men enklere å gi konkrete råd i konkrete situasjoner.",
"mer": "<p>Lysbildene (s. 50 og 62). Folk som kan mye om finans tar bedre finansielle valg, men det betyr ikke at kurs alltid virker.<\/p><p>Konsekvens for politikk: standardvalg og konkrete, handlingsnære råd virker bedre enn generell opplæring.<\/p><p>Eksempel på et konkret råd som virket: informasjonen om at indeksfond har slått aktive fond (fondseksperimentet).<\/p>",
"kilder": [
"Psykologi s. 50",
"Psykologi s. 62"
],
"eksamen": []
},
{
"id": "psyk-laering-08",
"nivaa": "detalj",
"kan": "Kjenne studiene om finansopplæring",
"kort": "Alan og Ertac (2018): undervisning i tålmodighet ga mer utsatt forbruk. Bover m.fl. (2018): 10-timers kurs ga mer kunnskap i hypotetiske settinger. Fernandes m.fl. (2014): programmer forklarer bare 0,1 % av variasjonen i atferd. Haliassos m.fl. (2020): en økonom som nabo øker sjansen for aksjesparing.",
"mer": "<p><b>Naturlige eksperimenter<\/b> (s. 65):<\/p><ul><li>Skimmyhorn (2016): obligatorisk finanskurs i det amerikanske militæret ga mer pensjonssparing<\/li><li>Cole m.fl. (2016): endringer i pensum ga ingen effekt på senere valg<\/li><li>Bruhn m.fl. (2013, Brasil): elevene lærte mer, men lånte mer og ble dårligere til å betale tilbake (kanskje konsumutjevning)<\/li><\/ul><p>Samlet: effekten er blandet. Lysbildene ligger bakerst som tilleggsmateriale.<\/p>",
"kilder": [
"Psykologi s. 64–65"
],
"eksamen": []
}
],
"kildenotat": "Finansiell psykologi (OA, forelesning 16; s. = PDF-side i Finansiell_psykologi2026 (2), 23. september 2026; (4) er datert 16. oktober 2026)"
}
];
