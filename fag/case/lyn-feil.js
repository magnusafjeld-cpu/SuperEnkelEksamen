/* ===================== CASETRENING · FINN FEILEN =====================
   En ferdig utregning vises linje for linje. Brukeren trykker på linjen der
   det går galt — eller melder fra om at utregningen er riktig.

   Feltene:
     oppg   — oppgaven med alle tallene som trengs
     linjer — 3–5 regnesteg i rekkefølge, skrevet som man sier dem høyt
     feil   — 0-basert indeks på linjen der det glipper, null hvis alt stemmer
     why    — hva som er galt og hva riktig svar er (ved null: hvilken felle
              man fristes til å tro er der)

   Feiltypene er hentet fra fallgruvelista i docs/case-research/04-matte.md:
   tierpotens-tap, prosent av feil grunnlag, prosentendringer addert i stedet
   for multiplisert, delt på pris i stedet for dekningsbidrag, feil ledd
   videreført, enhet blandet, og ren regnefeil. Sju av oppgavene er uten feil
   — uten dem lærer man bare å lete til man finner noe.

   Hver eneste utregning er verifisert numerisk. Rene data — visningen ligger
   i motoren.
   ==================================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.lyn = window.EDU_DATA.lyn || {};
window.EDU_DATA.lyn.feil = [

  { oppg: "En ny fabrikk gir 120 mill. kr i faste kostnader per år. Produktet selges for 250 kr per enhet, og variabel kostnad er 85 kr per enhet. Hvor mange enheter må selges for å gå i null?",
    linjer: [
      "Dekningsbidrag per enhet: 250 − 85 = 165 kr",
      "Breakeven: 120 mill. / 250 = 480 000 enheter",
      "Det gir en omsetning på 480 000 × 250 = 120 mill. kr, som akkurat dekker de faste kostnadene",
    ],
    feil: 1,
    why: "Breakeven er faste kostnader delt på dekningsbidraget, ikke på prisen. Riktig: 120 mill. / 165 = cirka 727 000 enheter. Dekningsbidraget på 165 kr ble regnet ut på linjen over og så aldri brukt — det er alltid et faresignal. Å dele på prisen later som om hele salgssummen er ren fortjeneste." },

  { oppg: "Dagligvaremarkedet er 230 mrd kr. Kjeden har 24 % markedsandel og en dekningsgrad på 4 %. De faste kostnadene er 1,5 mrd kr.",
    linjer: [
      "Omsetning: 230 mrd × 0,24 = 55,2 mrd kr",
      "Dekningsbidrag: 55,2 mrd × 0,04 = 22,1 mrd kr",
      "Driftsresultat: 22,1 − 1,5 = 20,6 mrd kr",
    ],
    feil: 1,
    why: "55,2 × 0,04 = 2,21, ikke 22,1 — en tierpotens er tapt. Å ta 4 % av noe kan aldri gi nesten halvparten tilbake. Riktig dekningsbidrag er 2,21 mrd kr, og driftsresultatet blir 2,21 − 1,5 = 0,71 mrd kr. Sjekk størrelsesordenen før du sjekker sifrene." },

  { oppg: "Omsetningen i år er 1 200 mill. kr, og det er 20 % lavere enn i fjor. Hva var omsetningen i fjor?",
    linjer: [
      "I fjor: 1 200 / 0,8 = 1 500 mill. kr",
      "Nedgangen i kroner: 1 500 − 1 200 = 300 mill. kr",
      "Kontroll: 300 / 1 500 = 20 %, som stemmer med oppgaven",
    ],
    feil: null,
    why: "Riktig hele veien. Fellen er å reversere prosentendringen som 1 200 × 1,2 = 1 440. Det er galt fordi de 20 prosentene ble regnet av fjorårets tall, ikke av årets — skal du tilbake, deler du på 0,8. Kontrollinjen avslører nettopp dette: 1 440 ville gitt 240 / 1 440 = 16,7 %, ikke 20 %." },

  { oppg: "Driftsmarginen gikk fra 8 % til 10 % på ett år. Omsetningen var 500 mill. kr begge år.",
    linjer: [
      "Driftsresultat i fjor: 500 × 0,08 = 40 mill. kr",
      "Driftsresultat i år: 500 × 0,10 = 50 mill. kr",
      "Marginen steg altså med 2 %",
      "Og i kroner steg resultatet fra 40 til 50, altså 25 %",
    ],
    feil: 2,
    why: "Marginen steg 2 prosentpoeng, ikke 2 prosent. Relativt er økningen 2 / 8 = 25 %. Siste linje sier det riktige tallet, og motsigelsen mellom «2 %» og «25 %» er selve varselet. Si alltid «prosentpoeng» høyt når du sammenligner to prosenttall." },

  { oppg: "Omsetning 850 mill. kr, varekostnad 510 mill. kr, faste kostnader 220 mill. kr.",
    linjer: [
      "Bruttofortjeneste: 850 − 510 = 340 mill. kr",
      "Bruttomargin: 340 / 850 = 40 %",
      "Driftsresultat: 340 − 220 = 120 mill. kr",
      "Driftsmargin: 120 / 340 = 35 %",
    ],
    feil: 3,
    why: "Divisjonen er riktig utført, men på feil tall. Driftsmargin er driftsresultat delt på omsetning: 120 / 850 = 14 %. Her er 340 fra forrige ledd videreført som nevner. Sanity-sjekken er gratis: driftsmarginen kan aldri overstige bruttomarginen, så 35 % mot 40 % skulle ha stoppet regningen." },

  { oppg: "Omsetningen var 500 mill. kr. Den vokser 30 % i år 1 og 30 % i år 2.",
    linjer: [
      "Etter år 1: 500 × 1,30 = 650 mill. kr",
      "Samlet vekst over to år: 30 % + 30 % = 60 %",
      "Etter år 2: 500 × 1,60 = 800 mill. kr",
    ],
    feil: 1,
    why: "Prosentvekst multipliseres, den adderes ikke: 1,30 × 1,30 = 1,69, altså 69 % samlet. Riktig svar er 500 × 1,69 = 845 mill. kr — eller like enkelt 650 × 1,30 = 845, ved å regne videre fra linjen over. Krysseffekten (0,30 × 0,30 = 9 prosentpoeng) forsvinner når du legger sammen." },

  { oppg: "Et abonnement koster 249 kr per måned. Selskapet har 40 000 abonnenter og 60 mill. kr i faste kostnader per år.",
    linjer: [
      "Årsinntekt: 40 000 abonnenter × 249 kr = 9,96 mill. kr",
      "Resultat: 9,96 mill. − 60 mill. = −50,0 mill. kr",
      "Kundemassen må altså opp 60 / 9,96 = 6,0 ganger for å gå i null",
    ],
    feil: 0,
    why: "De 9,96 mill. kronene er en månedsinntekt, ikke en årsinntekt — prisen på 249 kr er per måned. Årsinntekten er 40 000 × 249 × 12 = 119,5 mill. kr, og resultatet blir 119,5 − 60 = +59,5 mill. kr. Selskapet er altså godt lønnsomt, ikke konkurs. Skriv «per måned» eller «per år» på hver eneste linje." },

  { oppg: "Omsetningen er 1 250 mill. kr og kostnadene 940 mill. kr. Ledelsen vil øke resultatet med 50 % uten å røre omsetningen.",
    linjer: [
      "Resultat i dag: 1 250 − 940 = 310 mill. kr",
      "Målresultat: 310 × 1,5 = 455 mill. kr",
      "Kostnadene må da ned til 1 250 − 455 = 795 mill. kr",
    ],
    feil: 1,
    why: "Oppsettet er riktig, men 310 × 1,5 = 465, ikke 455. Halvparten av 310 er 155, og 310 + 155 = 465. Riktig kostnadstak blir 1 250 − 465 = 785 mill. kr, altså et kutt på 155 mill. kr — nøyaktig like stort som resultatøkningen, slik det må bli når omsetningen står stille." },

  { oppg: "Faste kostnader 18 mill. kr per år. Prisen er 1 500 kr per enhet og variabel kostnad 900 kr per enhet.",
    linjer: [
      "Dekningsbidrag per enhet: 1 500 − 900 = 600 kr",
      "Breakeven i enheter: 18 mill. / 600 = 30 000 enheter",
      "Breakeven i omsetning: 30 000 × 1 500 = 45 mill. kr",
      "Kontroll via dekningsgrad: 600 / 1 500 = 40 %, og 18 mill. / 0,40 = 45 mill. kr",
    ],
    feil: null,
    why: "Riktig hele veien. Fellen er å dele på prisen: 18 mill. / 1 500 = 12 000 enheter, altså under halvparten av det riktige. Kontrollen på siste linje er verdt å gjøre til vane — de to veiene til breakeven i omsetning skal alltid gi samme svar." },

  { oppg: "5,6 mill. nordmenn bruker i snitt 2 kr per dag på et produkt. Hvor stort er årsmarkedet?",
    linjer: [
      "Per dag i hele Norge: 5,6 mill. × 2 kr = 11,2 mill. kr",
      "Per år: 11,2 mill. × 365 = 4 088 mill. kr",
      "Altså cirka 41 mrd kr per år",
    ],
    feil: 2,
    why: "4 088 mill. kr er 4,1 mrd kr, ikke 41. Tierpotensen glapp i overgangen fra millioner til milliarder. Ankeret er verdt å pugge: én krone per nordmann per dag er cirka 2 mrd kr i året, så 2 kr må lande på cirka 4 mrd." },

  { oppg: "Markedet er 40 mrd kr. Premiumsegmentet utgjør 30 % av markedet, og vi har 20 % andel i det segmentet.",
    linjer: [
      "Premiumsegmentet: 40 mrd × 0,30 = 12 mrd kr",
      "Vår omsetning: 12 mrd × 0,20 = 2,4 mrd kr",
      "Vår markedsandel er altså 20 %",
    ],
    feil: 2,
    why: "De 20 prosentene er andel av segmentet, ikke av markedet. Andelen av totalmarkedet er 2,4 / 40 = 6 % — eller direkte 0,30 × 0,20 = 0,06. En prosent er verdiløs uten at du sier hva den er prosent av." },

  { oppg: "Butikken hadde 12 000 kunder i fjor og 13 800 i år. Snittkjøpet var 240 kr i fjor og 260 kr i år.",
    linjer: [
      "Omsetning i fjor: 12 000 × 240 = 2,88 mill. kr",
      "Omsetning i år: 13 800 × 260 = 3,588 mill. kr",
      "Kundevekst: 13 800 / 12 000 − 1 = 15 %",
      "Omsetningsvekst: 3,588 / 3,0 − 1 = 19,6 %",
    ],
    feil: 3,
    why: "Divisjonen er riktig utført, men nevneren er avrundet til 3,0 i stedet for fjorårets faktiske 2,88. Riktig: 3,588 / 2,88 − 1 = 24,6 %. Kontroll: 1,15 for volum × 1,083 for pris = 1,246. En avrunding på 4 % i nevneren ble til 5 prosentpoeng feil i svaret — rund av i mellomregninger, aldri i grunnlagstallene." },

  { oppg: "Faste kostnader er 4,5 mill. kr per år. Prisen er 600 kr per enhet og variabel kostnad 360 kr per enhet.",
    linjer: [
      "Breakeven i enheter: 4,5 mill. / 600 = 7 500 enheter",
      "Det gir en omsetning på 7 500 × 600 = 4,5 mill. kr",
      "Dekningsgrad til kontroll: (600 − 360) / 600 = 40 %",
    ],
    feil: 0,
    why: "Delt på prisen i stedet for på dekningsbidraget, som er 600 − 360 = 240 kr. Riktig: 4,5 mill. / 240 = 18 750 enheter, som gir 11,25 mill. kr i omsetning — det samme som 4,5 mill. / 0,40 med dekningsgraden fra siste linje. At breakeven-omsetningen ble nøyaktig lik de faste kostnadene er selve fingeravtrykket på at man har delt på prisen." },

  { oppg: "Bruttomarginen gikk fra 40 % til 44 %. Omsetningen er 750 mill. kr og uendret.",
    linjer: [
      "Bruttofortjeneste før: 750 × 0,40 = 300 mill. kr",
      "Bruttofortjeneste etter: 750 × 0,44 = 330 mill. kr",
      "Økningen er 4 prosentpoeng, som tilsvarer 4 / 40 = 10 % relativ vekst",
      "I kroner: 330 − 300 = 30 mill. kr, altså 30 / 300 = 10 %",
    ],
    feil: null,
    why: "Riktig, og prosentpoeng og prosent er holdt fra hverandre. Fellen er å si «marginen steg 4 %» — det ville betydd 40 × 1,04 = 41,6 %, som er noe helt annet. At kroneregningen lander på de samme 10 % er bekreftelsen på at det relative tallet stemmer." },

  { oppg: "Prisen steg 25 % i fjor og falt 20 % i år. Utgangsprisen var 400 kr.",
    linjer: [
      "Etter oppgangen: 400 × 1,25 = 500 kr",
      "Netto endring: +25 % − 20 % = +5 %",
      "Pris i dag: 400 × 1,05 = 420 kr",
    ],
    feil: 1,
    why: "Prosentendringer multipliseres: 1,25 × 0,80 = 1,00. Netto endring er null, og prisen er tilbake på 400 kr. Regn heller videre fra linjen over: 500 × 0,80 = 400. Et fall på 20 % opphever alltid en oppgang på 25 %, fordi 1 / 0,8 = 1,25." },

  { oppg: "En kommune har 600 000 elever og 20 000 klasserom. Maksgrensen er 25 elever per klasserom.",
    linjer: [
      "Forholdstall: 600 000 elever / 20 000 klasserom = 30",
      "Altså 30 klasserom per elev",
      "Behov ved maksgrensen: 600 000 / 25 = 24 000 klasserom, altså 4 000 flere enn i dag",
    ],
    feil: 1,
    why: "Tallet 30 er riktig, men enheten er snudd. Brøken er elever delt på klasserom, så svaret er 30 elever per klasserom. 30 klasserom per elev ville betydd 18 mill. klasserom i kommunen. Les brøken høyt med enhetene i den rekkefølgen de står, hver eneste gang." },

  { oppg: "Norge har 2,9 mill. sysselsatte med en gjennomsnittlig månedslønn på 62 000 kr. Fastlands-BNP er 4 400 mrd kr.",
    linjer: [
      "Månedlig lønnssum: 2,9 mill. × 62 000 kr = 179,8 mrd kr",
      "Årlig lønnssum: 179,8 mrd × 12 = 21 576 mrd kr",
      "Det er 21 576 / 4 400 = 4,9 ganger fastlands-BNP",
    ],
    feil: 1,
    why: "179,8 × 12 = 2 157,6, ikke 21 576 — en tierpotens for mye. Riktig lønnssum er cirka 2 160 mrd kr, som er omtrent halvparten av fastlands-BNP og et godt anker å kunne. Siste linje er sanity-sjekken som skulle stoppet regningen: lønn kan umulig være fem ganger verdiskapingen i landet." },

  { oppg: "Vi hadde 12 % markedsandel i fjor og 15 % i år. Markedet var 80 mrd kr begge år.",
    linjer: [
      "Markedsandelen vokste fra 12 % til 15 %, altså med 3 %",
      "Omsetning i fjor: 80 mrd × 0,12 = 9,6 mrd kr",
      "Omsetning i år: 80 mrd × 0,15 = 12 mrd kr",
      "Vekst i omsetning: 12 / 9,6 − 1 = 25 %",
    ],
    feil: 0,
    why: "Andelen vokste 3 prosentpoeng, ikke 3 prosent. Relativt er veksten 3 / 12 = 25 % — nøyaktig samme tall som omsetningsveksten på siste linje, siden markedet stod stille begge år. Når to linjer burde gitt samme prosent og ikke gjør det, har du funnet feilen." },

  { oppg: "En kjede har 24 butikker som hver omsetter for 125 mill. kr i året. Driftsmarginen er 6 %, og ledelsen vil doble den til 12 %.",
    linjer: [
      "Samlet omsetning: 24 × 125 mill. = 3 000 mill. kr, altså 3 mrd kr",
      "Driftsresultat i dag: 3 000 × 0,06 = 180 mill. kr",
      "Driftsresultat ved 12 % margin: 3 000 × 0,12 = 380 mill. kr",
    ],
    feil: 2,
    why: "3 000 × 0,12 = 360, ikke 380. Oppsettet er riktig og de to første linjene stemmer — dette er en ren regnefeil. Linjen over avslører den umiddelbart: dobbel margin på uendret omsetning gir nøyaktig dobbelt resultat, altså 2 × 180 = 360 mill. kr." },

  { oppg: "Et marked på 12 mrd kr vokser 10 % i året i tre år.",
    linjer: [
      "Vekstfaktor: 1,10 × 1,10 × 1,10 = 1,331",
      "Markedet om tre år: 12 mrd × 1,331 = 16,0 mrd kr",
      "Samlet vekst er 33,1 %, ikke 30 %",
      "Vekst i kroner: 16,0 − 12,0 = 4,0 mrd kr",
    ],
    feil: null,
    why: "Riktig — vekstratene er multiplisert, ikke addert. Fellen er 3 × 10 % = 30 %, som gir 15,6 mrd kr og bommer med 0,4 mrd. Verdt å ha som anker: 1,1 i annen er 1,21 og 1,1 i tredje er 1,331. Over kort horisont og lav rate kan du addere som grovanslag, men da sier du høyt «litt over, på grunn av renters rente»." },

  { oppg: "Markedet er 60 mrd kr i dag og vokser 5 % i året. Vi har 8 % andel i dag og venter 10 % om tre år.",
    linjer: [
      "Vår omsetning i dag: 60 mrd × 0,08 = 4,8 mrd kr",
      "Markedet om tre år: 60 × 1,05 × 1,05 × 1,05 = 60 × 1,158 = 69,5 mrd kr",
      "Vår omsetning om tre år: 60 mrd × 0,10 = 6,0 mrd kr",
      "Vekst: 6,0 / 4,8 − 1 = 25 %",
    ],
    feil: 2,
    why: "Markedet om tre år ble regnet ut til 69,5 mrd på linjen over, men denne linjen bruker dagens 60 mrd. Riktig: 69,5 × 0,10 = 6,95 mrd kr, og veksten blir 6,95 / 4,8 − 1 = 45 %, ikke 25 %. Når du har regnet ut et nytt tall, stryk det gamle på arket." },

  { oppg: "Et kraftverk leverer 1,4 mrd kWh i året. Kraften selges for 3,50 kr per kWh, og variabel kostnad er 2,80 kr per kWh.",
    linjer: [
      "Omsetning: 1,4 mrd × 3,50 = 4,9 mrd kr",
      "Dekningsbidrag per kWh: 3,50 − 2,80 = 0,70 kr",
      "Samlet dekningsbidrag: 1,4 mrd × 0,70 = 98 mill. kr",
    ],
    feil: 2,
    why: "1,4 × 0,7 = 0,98, og enheten er milliarder: 0,98 mrd kr, altså 980 mill. kr. Svaret er ti ganger for lite. Sjekk mot linjene over: dekningsbidraget er 0,70 av 3,50, altså 20 % av omsetningen, og 20 % av 4,9 mrd kan umulig være 98 mill." },

  { oppg: "Et verksted bruker 4 timer per bil til en timekostnad på 750 kr, og fakturerer 4 200 kr per bil. De behandler 1 800 biler i året, og de faste kostnadene er 1,5 mill. kr per år.",
    linjer: [
      "Variabel kostnad per bil: 4 × 750 = 3 000 kr",
      "Dekningsbidrag per bil: 4 200 − 3 000 = 1 200 kr",
      "Årlig dekningsbidrag: 1 800 × 1 200 = 2,16 mill. kr",
      "Resultat per bil: 2,16 mill. − 1,5 mill. = 660 000 kr",
    ],
    feil: 3,
    why: "660 000 kr er årsresultatet for hele verkstedet, ikke resultatet per bil. Per bil blir det 660 000 / 1 800 = cirka 367 kr. Et resultat på 660 000 kr på en jobb som faktureres 4 200 kr er absurd — de faste kostnadene er totale, så svaret blir også totalt." },

  { oppg: "En vare koster 500 kr eksklusive merverdiavgift. Mva-satsen er 25 %.",
    linjer: [
      "Merverdiavgift: 500 × 0,25 = 125 kr",
      "Pris inklusive mva: 500 + 125 = 625 kr",
      "Mva utgjør altså 25 % av det kunden betaler",
    ],
    feil: 2,
    why: "De 25 prosentene er regnet av prisen før avgift. Av kundens pris utgjør avgiften 125 / 625 = 20 %. Samme forhold andre veien: for å hente mva ut av en bruttopris ganger du med 0,20, ikke 0,25. Spør alltid: prosent av hvilket tall?" },

  { oppg: "Et marked på 20 mrd kr vokser 8 % i året i ti år.",
    linjer: [
      "Etter år 1: 20 × 1,08 = 21,6 mrd kr",
      "Etter år 2: 21,6 × 1,08 = 23,3 mrd kr",
      "Samlet over ti år: 10 × 8 % = 80 %, altså 20 × 1,80 = 36 mrd kr",
    ],
    feil: 2,
    why: "Vekstratene er addert i stedet for multiplisert. 1,08 opphøyd i ti er 2,16, så riktig svar er 20 × 2,16 = 43,2 mrd kr. 72-regelen avslører det på ett sekund: 72 / 8 = 9 år til dobling, så etter ti år må markedet være mer enn doblet — over 40 mrd, ikke 36. Jo lengre horisont, desto verre bommer addisjonen." },

  { oppg: "To segmenter: A omsetter for 300 mill. kr med 20 % driftsmargin, B omsetter for 700 mill. kr med 5 % driftsmargin.",
    linjer: [
      "Driftsresultat A: 300 × 0,20 = 60 mill. kr",
      "Driftsresultat B: 700 × 0,05 = 35 mill. kr",
      "Samlet: 95 mill. kr av 1 000 mill. kr i omsetning, altså 9,5 % margin",
      "Det er lavere enn det uvektede snittet på (20 + 5) / 2 = 12,5 %, fordi B veier tyngst",
    ],
    feil: null,
    why: "Riktig. Marginer må vektes med omsetningen, og fellen er nettopp det uvektede snittet på 12,5 % — som siste linje nevner for å forkaste det, ikke for å bruke det. Rask kontroll: den blandede marginen skal alltid ligge nærmest marginen til det største segmentet, her de 5 % som utgjør 70 % av omsetningen." },

  { oppg: "En abonnementsbedrift har 8 mill. kr i faste kostnader per år. Abonnementet koster 1 200 kr per år, og det koster 450 kr per år å betjene en kunde.",
    linjer: [
      "Dekningsbidrag per kunde: 1 200 − 450 = 750 kr",
      "Antall kunder for å dekke de faste kostnadene: 8 mill. / 1 200 = 6 667 kunder",
      "Med 6 667 kunder blir omsetningen 6 667 × 1 200 = 8,0 mill. kr",
    ],
    feil: 1,
    why: "Delt på prisen i stedet for på dekningsbidraget. Riktig: 8 mill. / 750 = cirka 10 667 kunder, altså 60 % flere enn linjen påstår. Å dele på 1 200 forutsetter at det er gratis å betjene kundene — men de 450 kronene står i oppgaven og ble til og med regnet inn på linjen over." },

  { oppg: "Norge har 2,9 mill. personbiler med en snittlevetid på 17 år. En ny bil koster i snitt 450 000 kr. Dagligvaremarkedet er til sammenligning 230 mrd kr.",
    linjer: [
      "Nye biler per år: 2,9 mill. / 17 = 171 000 biler",
      "Markedsverdi: 171 000 × 450 000 = 7,7 mrd kr",
      "Det tilsvarer 7,7 / 230 = 3,3 % av dagligvaremarkedet",
    ],
    feil: 1,
    why: "Sifrene stemmer, tierpotensen ikke: 1,71 × 4,5 = 7,7, men 10 opphøyd i fem ganger 10 opphøyd i fem er 10 opphøyd i ti. Riktig svar er 77 mrd kr, altså en tredel av dagligvaremarkedet. Regn sifrene og nullene som to atskilte regnestykker, og sett dem sammen først til slutt." },

  { oppg: "En fabrikk produserte 3 600 enheter per dag i fjor. I år er kapasiteten økt til 4 200 enheter per dag. Fabrikken kjører 250 dager i året, og prisen er 85 kr per enhet.",
    linjer: [
      "Årsvolum i fjor: 3 600 × 250 = 900 000 enheter",
      "Årsvolum i år: 4 200 × 250 = 1 050 000 enheter",
      "Volumvekst: 1 050 000 / 900 000 − 1 = 16,7 %",
      "Økt omsetning: 900 000 × 85 = 76,5 mill. kr",
    ],
    feil: 3,
    why: "Linjen ganger prisen med fjorårets volum i stedet for med økningen. Økningen er 1 050 000 − 900 000 = 150 000 enheter, som gir 150 000 × 85 = 12,75 mill. kr. Feilen gjør svaret seks ganger for stort. Spør deg alltid om tallet du ganger med er et nivå eller en endring." },

  { oppg: "Omsetningen er 200 mill. kr og kostnadene 180 mill. kr. Selskapet kutter kostnadene med 5 %.",
    linjer: [
      "Resultat i dag: 200 − 180 = 20 mill. kr",
      "Kostnadskutt: 180 × 0,05 = 9 mill. kr",
      "Nytt resultat: 20 + 9 = 29 mill. kr",
      "Resultatet steg altså med 5 %",
    ],
    feil: 3,
    why: "De 5 prosentene gjelder kostnadene, ikke resultatet. Resultatet steg 9 / 20 = 45 %. Dette er hele poenget med kostnadskutt i en virksomhet med tynn margin: kostnadsbasen er ni ganger så stor som resultatet, så et lite kutt slår voldsomt ut på bunnlinjen." },

  { oppg: "Et anlegg produserer 1,4 mrd kWh i året. Kraften selges for 0,85 kr per kWh, og driftskostnaden er 0,25 kr per kWh.",
    linjer: [
      "Omsetning: 1,4 mrd × 0,85 = 1,19 mrd kr",
      "Dekningsbidrag per kWh: 0,85 − 0,25 = 0,60 kr",
      "Samlet dekningsbidrag: 1,4 mrd × 0,60 = 0,84 mrd kr, altså 840 mill. kr",
      "Dekningsgrad: 0,84 / 1,19 = 71 %",
    ],
    feil: null,
    why: "Riktig, og tierpotensen er holdt hele veien. Fellen er å lese 1,4 × 0,6 = 0,84 som 84 mill. kr fordi sifrene ser små ut — men enheten på 1,4 er milliarder. Kontroll: dekningsgraden kan regnes direkte som 0,60 / 0,85 = 71 %, uten å gå veien om totalene." },

  { oppg: "En kunde betaler 800 kr per måned. Bruttomarginen er 70 %, 2 % av kundene slutter hver måned, og det koster 9 000 kr å skaffe en ny kunde.",
    linjer: [
      "Månedlig bidrag per kunde: 800 × 0,70 = 560 kr",
      "Forventet levetid: 1 / 0,02 = 50 måneder",
      "Kundeverdi: 560 × 50 = 28 000 kr",
      "Tilbakebetalingstid på anskaffelsen: 9 000 / 560 = 16 år",
    ],
    feil: 3,
    why: "Divisjonen er riktig, men ikke enheten. De 560 kronene er per måned, så svaret er cirka 16 måneder — drøyt ett år, ikke seksten. Med en kundeverdi på 28 000 kr mot 9 000 kr i anskaffelseskostnad er dette en god forretning, og en tilbakebetalingstid på 16 år ville sagt det stikk motsatte." },

  { oppg: "Et prosjekt koster 45 mill. kr og gir 8 mill. kr i årlig netto kontantstrøm i overskuelig framtid. Avkastningskravet er 10 %.",
    linjer: [
      "Tilbakebetalingstid: 45 / 8 = 5,6 år",
      "Nåverdi av evigvarende kontantstrøm: 8 / 0,10 = 80 mill. kr",
      "Netto nåverdi: 80 − 45 = 45 mill. kr",
    ],
    feil: 2,
    why: "80 − 45 = 35, ikke 45. Oppsettet og de to første linjene er riktige — dette er en ren regnefeil. Svaret 45 er dessuten mistenkelig fordi det er identisk med investeringen: når et mellomsvar plutselig er lik et av tallene i oppgaven, sjekk en gang til." },

  { oppg: "En kafé selger 220 kopper kaffe per dag til 45 kr per kopp. Varekostnaden er 9 kr per kopp, de faste kostnadene er 1,8 mill. kr per år, og kafeen har åpent 360 dager.",
    linjer: [
      "Dekningsbidrag per kopp: 45 − 9 = 36 kr",
      "Per dag: 220 × 36 = 7 920 kr",
      "Per år: 7 920 × 360 = 2,85 mill. kr",
      "Årsresultat: 2,85 mill. − 1,8 mill. = 1,05 mill. kr",
    ],
    feil: null,
    why: "Riktig. Dagstallet er skalert opp til år før de faste årskostnadene trekkes fra — fellen er å trekke 1,8 mill. fra 7 920 kr og konkludere med at kafeen blør. Legg merke til rekkefølgen, som er den samme i nesten alle lønnsomhetscaser: dekningsbidrag per enhet, så volum, så tidsperiode, og først til slutt de faste kostnadene." },

];
