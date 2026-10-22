/* sjanger 9 · internasjonal · Internasjonal skatt og exit-skatt */
window.EDU_DATA.sjangre.push({
  id: "internasjonal",
  num: 9,
  title: "Internasjonal skatt og exit-skatt",
  summary: "Fra dagersreglene og unntak mot kredit til exit-skatt og H2024 oppgave 10 med nye tall",
  chapters: [13, 6],
  exam: "4 av 9 sett · H2022 oppgave 4, H2024 oppgave 10, H2020 oppgave 2, H2021 oppgave 4",
  intro: `<p>Internasjonal skatt har kommet i fire av ni sett og exit-skatt i to. Kommer temaet, kommer det tungt: 17 % av poengene i H2022 og 19 % i H2024, men ingenting i H2025. Kursplanen regner det som usikkert i 2026. Regnestoffet er lite: hvem som er bosatt, unntak mot kredit med kredittaket og hva som skjer uten avtale. Resten er fakta om utflytting og exit-skatt, der de gale alternativene er laget av de samme feilene hver gang. Etter siste steg regner du H2024 oppgave 10 med nye tall og kjenner igjen hvert galt alternativ.</p>`,
  steps: [
    {
      id: "internasjonal-1",
      title: "Bosted: dagersreglene i skatteloven § 2-1",
      theory: `<p>Norge skattlegger etter bosted. Er du bosatt her, skal du skatte til Norge av all inntekt, uansett hvor i verden den er tjent. Bosted følger av hvor lenge du oppholder deg i landet, ikke av pass, fødested eller adresse. Etter skatteloven § 2-1 annet ledd er du bosatt når du er i Norge mer enn 183 dager i løpet av en tolvmånedersperiode, eller mer enn 270 dager i løpet av en trettiseksmånedersperiode. Periodene er glidende: enhver tolv- og trettiseksmånedersperiode teller, ikke bare kalenderåret. Bostedet begynner i det inntektsåret der en av grensene passeres.</p>
<div class="formula"><div class="eq">Bosatt når dager i Norge &gt; 183 i en tolvmånedersperiode</div><div class="eq">eller når dager i Norge &gt; 270 i en trettiseksmånedersperiode</div><div class="where">«Mer enn» betyr at dag 184 og dag 271 er de første som gir bosted. Reglene er [dagens regel]. Tre kalenderår på rad er nøyaktig én trettiseksmånedersperiode.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Jonas har aldri vært i Norge før 2025. Han er her 130 dager i 2025 og 120 dager i 2026. Ingen tolvmånedersperiode har mer enn 183 dager.</p><p>Over trettiseks måneder: 130 + 120 = 250, under 270. Jonas er ikke bosatt. Er han i Norge 25 dager til i 2027, blir summen for 2025–2027 130 + 120 + 25 = 275 &gt; 270. Da er han <b>bosatt fra og med 2027</b>.</p></div>`,
      q: `<p>Ana er portugisisk statsborger og har ingen bolig i Norge. Hun har aldri vært i Norge før 2024. Hun jobber i perioder for en norsk kunde og er i Norge 110 dager i 2024, 85 dager i 2025 og 90 dager i 2026. Ingen tolvmånedersperiode har mer enn 183 dager med opphold i Norge. Fra og med hvilket inntektsår er Ana bosatt i Norge etter skatteloven § 2-1?</p>`,
      options: ["2024", "2025", "2026", "Aldri"],
      answer: 2,
      solution: `<p>Tolvmånedersregelen slår aldri inn: oppgaven sier at ingen tolvmånedersperiode har mer enn 183 dager.</p><p>Trettiseksmånedersregelen: 2024–2026 er tre kalenderår, altså én trettiseksmånedersperiode. Før 2026 har hun 110 + 85 = 195 dager, under 270. Med 2026 blir det 195 + 90 = 285 &gt; 270.</p><p>Grensen passeres i 2026, så Ana er bosatt fra og med <b>2026</b>.</p>`,
      check: `<p>Regn baklengs: hun trenger 271 − 195 = 76 dager i 2026 for å komme over 270. Hun har 90, så grensen passeres i løpet av 2026 og ikke før. Med 75 dager i 2026 ville hun hatt 195 + 75 = 270 dager, som ikke er mer enn 270.</p>`,
      traps: [
        "Trodde bostedet gjelder fra første år i perioden. Det begynner først i inntektsåret der grensen passeres.",
        "Brukte 183-regelen på to kalenderår: 110 + 85 = 195 &gt; 183. Men de dagene er spredt over 24 måneder, ikke tolv.",
        null,
        "Sjekket bare 183-regelen. Trettiseksmånedersregelen gir 110 + 85 + 90 = 285 &gt; 270.",
      ],
    },
    {
      id: "internasjonal-2",
      title: "Globalskatteplikt og begrenset skatteplikt: derfor oppstår dobbeltbeskatning",
      theory: `<p>To prinsipper gjelder samtidig. Etter <b>bostedsprinsippet</b> skattlegger Norge den som er bosatt her, for hele inntekten, også det som er tjent i utlandet: det er globalskatteplikt. Etter <b>kildeprinsippet</b> skattlegger et land også inntekt som er tjent der av folk som bor andre steder, men bare den inntekten: det er begrenset skatteplikt. For lønn er kilden landet der arbeidet utføres. Jobber du en periode i utlandet, krever derfor både Norge og arbeidslandet skatt av samme lønn. Lemper ingen av dem, legges satsene sammen på den utenlandske inntekten.</p>
<div class="formula"><div class="eq">Skatt til Norge = t<sub>hjem</sub> × (Y<sub>Norge</sub> + Y<sub>ute</sub>)</div><div class="eq">Skatt til kildelandet = t<sub>kilde</sub> × Y<sub>ute</sub></div><div class="where">t<sub>hjem</sub> er satsen i bostedslandet (hjemstaten), t<sub>kilde</sub> satsen i kildelandet og Y<sub>ute</sub> inntekten som er tjent der. Uten lempning bærer Y<sub>ute</sub> satsen t<sub>hjem</sub> + t<sub>kilde</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kari er bosatt i Norge og tjener kr 200 000 i Norge og kr 100 000 for arbeid i Land B. Norsk sats er 30 % og Land Bs sats 20 % [eksempeltall]. Ingen av landene lemper.</p><p>Norge: 300 000 × 30 % = 90 000. Land B: 100 000 × 20 % = 20 000. Samlet <b>kr 110 000</b>. De 100 000 fra Land B bærer 30 % + 20 % = 50 %.</p></div>`,
      q: `<p>Erik er bosatt i Norge. I fire måneder jobber han i Land A for en arbeidsgiver der og tjener kr 400 000. Resten av året jobber han i Norge og tjener kr 400 000. Land A skattlegger ham bare for lønnen for arbeid utført i Land A, med 20 % [eksempeltall]. Bruk en flat norsk sats på 35 % [eksempeltall]. Se bort fra skatteavtaler og alle regler som lemper dobbeltbeskatning. Hvor mye skatt betaler Erik i alt, i begge land?</p>`,
      options: ["kr 300 000", "kr 360 000", "kr 220 000", "kr 280 000"],
      answer: 1,
      solution: `<p>Norge, globalskatteplikt: hele inntekten, 400 000 + 400 000 = 800 000. Skatt: 800 000 × 35 % = 280 000.</p><p>Land A, begrenset skatteplikt: bare lønnen for arbeid der, 400 000 × 20 % = 80 000.</p><p>Samlet: 280 000 + 80 000 = <b>kr 360 000</b>.</p>`,
      check: `<p>Regn per krone. Den norske lønnen skattlegges bare i Norge: 400 000 × 35 % = 140 000. Lønnen fra Land A skattlegges i begge land: 400 000 × (35 % + 20 %) = 220 000. 140 000 + 220 000 = 360 000.</p>`,
      traps: [
        "Byttet om prinsippene: Norge bare på den norske lønnen (400 000 × 35 % = 140 000) og Land A på alt (800 000 × 20 % = 160 000). Sum 300 000.",
        null,
        "Lot Norge bare skattlegge det som er tjent i Norge: 400 000 × 35 % + 400 000 × 20 % = 140 000 + 80 000 = 220 000. Den som er bosatt i Norge, har globalskatteplikt.",
        "Regnet bare skatten til Norge: 800 000 × 35 % = 280 000. De 80 000 Land A tar av lønnen for arbeid der, er glemt.",
      ],
    },
    {
      id: "internasjonal-3",
      title: "Unntaksmetoden: bare kildestaten skattlegger",
      theory: `<p>En skatteavtale mellom to land fordeler retten til å skattlegge. Kildestaten får skattlegge et selskaps næringsinntekt bare når den er tjent gjennom et <b>fast driftssted</b> der, som et salgskontor med egne lokaler og ansatte (et rent lager er ikke nok); eksamen oppgir om det foreligger. Under <b>unntaksmetoden</b> med fullstendig unntak gir hjemstaten helt avkall på inntekten fra kildestaten, som skattlegger den med sin egen sats, enten den er høyere eller lavere enn den norske. Metoden fjerner dobbeltbeskatningen, men utjevner ikke satsene. Skattlegger ikke kildestaten inntekten, blir den ikke skattlagt noe sted: det kalles dobbelt-ikke-beskatning.</p>
<div class="formula"><div class="eq">Unntak: samlet skatt = t<sub>kilde</sub> × Y &nbsp;·&nbsp; skatt til Norge = 0</div><div class="where">Y er inntekten fra kildestaten. Unntaket er ubetinget: Norge spør ikke om kildestaten faktisk skattlegger, eller med hvilken sats.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et norsk aksjeselskap tjener kr 1 000 000 gjennom en avdeling i Land A som er fast driftssted. Land A skattlegger inntekten med 18 % [eksempeltall]. Avtalen bygger på fullstendig unntak.</p><p>Land A: 1 000 000 × 18 % = 180 000. Norge: 0. Samlet <b>kr 180 000</b>, altså 18 %, under den norske satsen på 22 %. Hadde Land A hatt 0 %, ville samlet skatt vært 0: dobbelt-ikke-beskatning.</p></div>`,
      q: `<p>Et norsk aksjeselskap tjener kr 3 500 000 gjennom en avdeling i Land M, som skattlegger avdelingen med 26 % [eksempeltall]. Avdelingen er et fast driftssted. Norsk selskapsskatt er 22 % [dagens regel]. Skatteavtalen mellom Norge og Land M bygger på unntaksmetoden med fullstendig unntak. Hvor mye skatt betaler selskapet i alt, i begge land, på denne inntekten?</p>`,
      options: ["kr 910 000", "kr 1 680 000", "kr 0", "kr 770 000"],
      answer: 0,
      solution: `<p>Land M skattlegger etter sin egen sats: 3 500 000 × 26 % = 910 000.</p><p>Norge unntar inntekten helt: 0.</p><p>Samlet: <b>kr 910 000</b>. Selskapet betaler mer enn det ville gjort hjemme. Unntaket kompenserer ikke for det.</p>`,
      check: `<p>Under fullstendig unntak skal samlet sats alltid være kildestatens: 910 000/3 500 000 = 26 %. Norsk skatt på samme inntekt ville vært 3 500 000 × 22 % = 770 000, så selskapet betaler 910 000 − 770 000 = 140 000 mer enn hjemme.</p>`,
      traps: [
        null,
        "Ingen lempning, satsene lagt sammen: 910 000 + 3 500 000 × 22 % = 910 000 + 770 000 = 1 680 000. Avtalen fjerner den norske skatten.",
        "Trodde unntaksmetoden betyr at ingen av landene skattlegger. Det er Norge som unntar; Land M skattlegger fullt ut.",
        "Byttet om rollene: lot Norge skattlegge og kildestaten unnta, 3 500 000 × 22 % = 770 000.",
      ],
    },
    {
      id: "internasjonal-4",
      title: "Kreditmetoden og kredittaket",
      theory: `<p>Under <b>kreditmetoden</b> skattlegger begge land. Norge regner sin egen skatt på inntekten og trekker fra skatten som er betalt i kildestaten. Fradraget, kreditfradraget, er begrenset til den norske skatten på nettopp den inntekten. Restskatten til Norge kan derfor aldri bli negativ: Norge betaler ikke tilbake skatt du har betalt til et annet land. Er kildesatsen lavere enn den norske, ender du på norsk nivå; er den høyere, ender du på kildestatens nivå. Det overskytende blir da stående uten kredit, slik at kredit og unntak gir samme samlede skatt; metodene skiller seg bare når kildesatsen er lavere enn den norske.</p>
<div class="formula"><div class="eq">Kreditfradrag = min(t<sub>kilde</sub> × Y ; t<sub>hjem</sub> × Y)</div><div class="eq">Skatt til Norge = t<sub>hjem</sub> × Y − kreditfradrag</div><div class="eq">Samlet skatt = maks(t<sub>hjem</sub> ; t<sub>kilde</sub>) × Y</div><div class="where">Dette er vanlig (ordinær) kredit. Kreditten er aldri større enn den norske skatten på inntekten.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Inntekt kr 1 000 000 i kildestaten, norsk sats 22 % [dagens regel].</p><p>Kildesats 15 % [eksempeltall]: kildeskatt 150 000, norsk skatt 220 000, kreditfradrag min(150 000 ; 220 000) = 150 000, til Norge 220 000 − 150 000 = 70 000. Samlet <b>kr 220 000</b>.</p><p>Kildesats 30 % [eksempeltall]: kildeskatt 300 000, kreditfradrag min(300 000 ; 220 000) = 220 000, til Norge 0. Samlet <b>kr 300 000</b>. Av kildeskatten får 300 000 − 220 000 = 80 000 ingen kredit.</p></div>`,
      q: `<p>Et norsk aksjeselskap tjener kr 2 500 000 gjennom en avdeling i Land R, som skattlegger avdelingen med 31 % [eksempeltall]. Avdelingen er et fast driftssted. Norsk selskapsskatt er 22 % [dagens regel]. Skatteavtalen mellom Norge og Land R bygger på vanlig kreditmetode. Hvor mye skatt betaler selskapet i alt, i begge land, på denne inntekten?</p>`,
      options: ["kr 550 000", "kr 1 325 000", "kr 1 000 000", "kr 775 000"],
      answer: 3,
      solution: `<p>Land R: 2 500 000 × 31 % = 775 000.</p><p>Norsk skatt på samme inntekt: 2 500 000 × 22 % = 550 000. Kreditfradrag: min(775 000 ; 550 000) = 550 000. Skatt til Norge: 550 000 − 550 000 = 0.</p><p>Samlet: 775 000 + 0 = <b>kr 775 000</b>.</p>`,
      check: `<p>Samlet sats skal være den høyeste av de to: maks(22 % ; 31 %) = 31 %. 2 500 000 × 31 % = 775 000. Av kildeskatten står 775 000 − 550 000 = 225 000 uten kredit. Det er dobbeltbeskatningen som er igjen når kildesatsen er høyest. Under fullstendig unntak ville samlet skatt også vært 2 500 000 × 31 % = 775 000: når kildesatsen er høyest, gir de to metodene samme svar.</p>`,
      traps: [
        "Kreditten større enn norsk skatt: hele kildeskatten trukket fra, 550 000 − 775 000 = −225 000 til Norge, samlet 550 000. Norge betaler aldri ut penger for skatt betalt i et annet land.",
        "Ingen kredit, satsene lagt sammen: 775 000 + 550 000 = 1 325 000.",
        "Snudde fortegnet på restskatten: regnet 775 000 − 550 000 = 225 000 som skatt til Norge, samlet 775 000 + 225 000 = 1 000 000. Restskatten er 0 når kildeskatten er størst.",
        null,
      ],
    },
    {
      id: "internasjonal-5",
      title: "Ingen skatteavtale: Norge gir likevel kredit (skatteloven § 16-20)",
      theory: `<p>Uten skatteavtale er det ingenting som fordeler retten mellom landene, så begge skattlegger etter sin interne rett. Det blir likevel ikke automatisk dobbeltbeskatning. Skatteloven § 16-20 gir den som er bosatt eller hjemmehørende i Norge, fradrag i norsk skatt for skatt betalt i landet der inntekten har kilde, også uten avtale. Fradraget er begrenset til den norske skatten på utenlandsinntekten (§ 16-21), så norsk rett virker som en vanlig kreditmetode. Eksamenssettene har likevel regnet som om Norge ikke lemper uten avtale: H2020 og H2021 sa det i oppgaveteksten, mens H2024 forutsatte det. Står den forutsetningen i oppgaven, legger du satsene sammen; står den ikke der, gjelder § 16-20.</p>
<div class="formula"><div class="eq">Uten avtale, norsk rett: kreditfradrag = min(t<sub>kilde</sub> × Y ; t<sub>hjem</sub> × Y)</div><div class="eq">Samlet skatt = maks(t<sub>hjem</sub> ; t<sub>kilde</sub>) × Y</div><div class="where">Bare når oppgaven sier at Norge ikke gir lempning: samlet skatt = (t<sub>hjem</sub> + t<sub>kilde</sub>) × Y.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et norsk aksjeselskap tjener kr 500 000 i et land uten skatteavtale med Norge. Landet skattlegger inntekten med 15 % [eksempeltall].</p><p>Kildeskatt 500 000 × 15 % = 75 000. Norsk skatt 500 000 × 22 % = 110 000. Kreditfradrag etter § 16-20: min(75 000 ; 110 000) = 75 000. Til Norge 110 000 − 75 000 = 35 000. Samlet <b>kr 110 000</b>, altså 22 %.</p><p>Sier oppgaven at Norge ikke lemper, blir det 75 000 + 110 000 = 185 000.</p></div>`,
      q: `<p>Et norsk aksjeselskap tjener kr 1 600 000 gjennom en avdeling i Land V. Norge har ingen skatteavtale med Land V, som skattlegger avdelingen med 16 % [eksempeltall]. Norsk selskapsskatt er 22 % [dagens regel]. Regn etter skatteloven §§ 16-20 og 16-21 slik de lyder. Hvor mye skatt betaler selskapet i alt, i begge land, på denne inntekten?</p>`,
      options: ["kr 352 000", "kr 256 000", "kr 96 000", "kr 608 000"],
      answer: 0,
      solution: `<p>Land V: 1 600 000 × 16 % = 256 000.</p><p>Norsk skatt på inntekten: 1 600 000 × 22 % = 352 000. Kreditfradrag etter § 16-20, med taket i § 16-21: min(256 000 ; 352 000) = 256 000. Til Norge: 352 000 − 256 000 = 96 000.</p><p>Samlet: 256 000 + 96 000 = <b>kr 352 000</b>.</p>`,
      check: `<p>Samlet sats skal være maks(22 % ; 16 %) = 22 %. 1 600 000 × 22 % = 352 000. Med eksamensforutsetningen ville samlet skatt vært (22 % + 16 %) × 1 600 000 = 608 000. Forskjellen, 608 000 − 352 000 = 256 000, er nøyaktig kreditfradraget § 16-20 gir.</p>`,
      traps: [
        null,
        "Trodde at bare kildestaten skattlegger når det ikke finnes avtale: 256 000. Uten avtale er det ingenting som stenger Norges rett.",
        "Svarte med skatten til Norge alene: 352 000 − 256 000 = 96 000. De 256 000 til Land V er glemt.",
        "Antok dobbeltbeskatning fordi det ikke finnes avtale: 256 000 + 352 000 = 608 000. Det er svaret bare når oppgaven sier at Norge ikke lemper.",
      ],
    },
    {
      id: "internasjonal-6",
      title: "Skatteparadiser: mekanismene og motmidlene",
      theory: `<p>Schjelderup kaller skatteparadisene <i>secrecy jurisdictions</i>: produktet er hemmelighold like mye som lav skatt. Fire mekanismer går igjen. <b>Internprising</b>: konsernselskaper handler med hverandre til priser konsernet selv setter, slik at overskuddet havner der skatten er lav; motmiddelet er armlengdeprinsippet, som er svakt for varemerker og andre immaterielle verdier uten markedspris. <b>Tynn kapitalisering</b>: datterselskapet i høyskattelandet finansieres med lån fra et konsernselskap i lavskattelandet, så rentene trekkes fra der skatten er høy; motmiddelet er rentebegrensningsregler, som kutter fradraget for konserninterne renter ut over en andel av resultatet. <b>Skallselskaper</b> og <b>stråmenn</b> skjuler hvem som eier; motmiddelet er automatisk informasjonsutveksling mellom skattemyndighetene (CRS), som USA ikke deltar i. OECDs BEPS-arbeid og den globale minimumsskatten på 15 % angriper overskuddsflyttingen, men ingen av dem rører hemmeligholdet.</p>
<div class="formula"><div class="eq">Flyttet overskudd = avviket fra armlengdeprisen × volum</div><div class="eq">Skattebesparelse = flyttet overskudd × (t<sub>høy</sub> − t<sub>lav</sub>)</div><div class="where">Gevinsten følger satsforskjellen. Minimumsskatten løfter t<sub>lav</sub> til 15 % for store konsern og krymper den.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et norsk produksjonsselskap selger 100 000 enheter i året til et konsernselskap i Land L med 0 % skatt. Armlengdeprisen er kr 500, men konsernet setter internprisen til kr 420 [eksempeltall].</p><p>Flyttet overskudd: (500 − 420) × 100 000 = 8 000 000. Skattebesparelse: 8 000 000 × (22 % − 0 %) = <b>kr 1 760 000</b> i året. Med minimumsskatt på 15 %: 8 000 000 × (22 % − 15 %) = 560 000.</p></div>`,
      q: `<p>Konsernet Nordlys har et norsk driftsselskap og et selskap i Land L med 0 % selskapsskatt. Selskapet i Land L eier konsernets varemerke og har to ansatte. Hvert år betaler det norske selskapet 12 % av omsetningen i royalty til selskapet i Land L for å bruke varemerket. Royaltyen trekkes fra i Norge. Konsernet har selv satt satsen. Hvilket utsagn beskriver mekanismen og motmiddelet mot den?</p>`,
      options: [
        "Tynn kapitalisering. Motmiddelet er rentebegrensningsregler, men de kutter bare fradraget for konserninterne renter ut over en andel av resultatet",
        "Dobbelt-ikke-beskatning under unntaksmetoden. Motmiddelet er å bygge skatteavtalen på kreditmetoden",
        "Hemmelighold. Motmiddelet er automatisk utveksling av kontoopplysninger mellom skattemyndighetene (CRS), men den virker dårlig fordi USA ikke deltar",
        "Internprising. Motmiddelet er armlengdeprinsippet, men det virker dårlig fordi et varemerke sjelden har noen markedspris",
      ],
      answer: 3,
      solution: `<p>Royaltyen er en pris konsernet setter mellom sine egne selskaper, for en immateriell verdi. Er satsen høyere enn det uavhengige parter ville avtalt, flyttes overskudd fra Norge, med 22 %, til Land L, med 0 %. Det er <b>internprising</b>.</p><p>Motmiddelet er armlengdeprinsippet: royaltyen skal være det uavhengige parter ville betalt. For et varemerke finnes det sjelden noen slik pris å sammenligne med. Derfor virker regelen dårlig nettopp her.</p>`,
      check: `<p>Sjekk mot de andre mekanismene. Det er ingen lån og ingen renter, så det er ikke tynn kapitalisering. Eieren er kjent, så hemmelighold er ikke kjernen. Det er to ulike selskaper, ikke ett selskap med inntekt i to land, så ingen skatteavtale med unntak eller kredit er i spill. Hver krone royalty sparer konsernet 22 % − 0 % = 22 øre i skatt.</p>`,
      traps: [
        "Tynn kapitalisering flytter overskudd med renter på konserninterne lån. Her er det ingen lån; betalingen er en pris for å bruke varemerket.",
        "Unntak og kredit gjelder ett selskaps inntekt i to land. Royaltyen går mellom to selskaper i samme konsern. Ingen skatteavtale hindrer flyttingen.",
        "Hemmelighold handler om å skjule hvem som eier. Her er eieren kjent; mekanismen er prisen konsernet setter.",
        null,
      ],
    },
    {
      id: "internasjonal-7",
      title: "Utflytting: når slutter du å være bosatt?",
      theory: `<p>Det er lettere å bli bosatt enn å slutte å være det. Etter skatteloven § 2-1 tredje ledd opphører bostedet først for et inntektsår der du ikke har vært i Norge mer enn 61 dager og verken du eller dine nærstående (ektefelle, samboer, mindreårige barn) har disponert bolig her. Har du vært bosatt i Norge i minst ti år før utflyttingsåret, må dette gjelde for hvert av de tre inntektsårene etter utflyttingsåret. Bostedet opphører først etter det tredje. Flyttemelding til Skatteetaten endrer ingenting. Så lenge du er bosatt, har du globalskatteplikt.</p>
<div class="formula"><div class="eq">Bosatt minst ti år: første år som utflyttet = utflyttingsåret + 4</div><div class="eq">Bosatt under ti år: første inntektsår med høyst 61 dager i Norge og ingen bolig her</div><div class="where">Utflyttingsåret teller ikke som ett av de tre årene. Vilkårene om 61 dager og bolig må være oppfylt i hvert av dem [dagens regel].</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Lena har bodd i Norge i 30 år og flytter til Land F i 2025. Hun oppfyller vilkårene om dager og bolig fra 2026.</p><p>Utflyttingsåret 2025 teller ikke. De tre årene etter er 2026, 2027 og 2028. Hun er bosatt til og med 2028. Første år som utflyttet er <b>2029</b> = 2025 + 4.</p></div>`,
      q: `<p>Silje har bodd i Norge hele livet. I august 2027 flytter hun, mannen og barna til Land E. Familien selger boligen i Norge. Silje melder flytting til Skatteetaten. Fra 2028 er hun i Norge høyst 20 dager i året. Ingen i familien disponerer bolig her. Fra og med hvilket inntektsår er Silje ikke lenger bosatt i Norge etter norsk intern rett?</p>`,
      options: ["2031", "2028", "2030", "2027"],
      answer: 0,
      solution: `<p>Silje har vært bosatt i langt mer enn ti år, så tiårsregelen gjelder. Utflyttingsåret er 2027. Det teller ikke.</p><p>De tre inntektsårene etter er 2028, 2029 og 2030. Vilkårene er oppfylt i alle tre, så hun er bosatt til og med 2030.</p><p>Første år som utflyttet: <b>2031</b>.</p>`,
      check: `<p>Formelen: 2027 + 4 = 2031. Globalskatteplikten varer like lenge: lønn Silje tjener i Land E i 2028, 2029 og 2030, er etter norsk intern rett skattepliktig til Norge.</p>`,
      traps: [
        null,
        "Brukte regelen for dem som har bodd i Norge under ti år: ute fra første år med høyst 61 dager og ingen bolig, 2028.",
        "Talte utflyttingsåret som ett av de tre årene: 2027, 2028 og 2029, ute fra 2030. Tellingen starter året etter utflyttingen.",
        "Trodde flyttemeldingen avgjør. Bostedet følger loven, ikke meldingen.",
      ],
    },
    {
      id: "internasjonal-8",
      title: "Exit-skatt: skatt på latent gevinst ved utflytting",
      theory: `<p>Flytter du ut, mister Norge retten til å skattlegge gevinsten på aksjene dine når du selger. Derfor skattlegges den latente gevinsten som om aksjene var solgt dagen før utflyttingen, mens du ennå bare er norsk skattyter, så en skatteavtale med det nye landet beskytter ikke (skatteloven § 10-70). Grunnlaget er gevinsten, markedsverdi minus inngangsverdi, opptjent mens du var bosatt i Norge, aldri hele verdien. Gevinst opp til et bunnfradrag på kr 3 000 000 er fritatt; resten skattlegges med eierskatten på aksjegevinst. Skatten fastsettes endelig: faller aksjene senere, settes den ikke ned.</p>
<div class="formula"><div class="eq">Exit-skatt = (markedsverdi − inngangsverdi − 3 000 000) × t<sub>e</sub></div><div class="eq">t<sub>e</sub> = 1,72 × 22 % = 37,84 %</div><div class="where">Bunnfradraget og satsene er [dagens regel] for utflyttinger fra 20. mars 2024. Oppjusteringen med 1,72 gjøres én gang: på grunnlaget eller på satsen, ikke begge.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Aksjene er verdt kr 10 000 000 dagen før utflytting. Inngangsverdien er kr 2 000 000.</p><p>Latent gevinst: 10 000 000 − 2 000 000 = 8 000 000. Etter bunnfradraget: 8 000 000 − 3 000 000 = 5 000 000. Exit-skatt: 5 000 000 × 37,84 % = <b>kr 1 892 000</b>.</p></div>`,
      q: `<p>Mats flytter fra Norge til Land B i 2026. Dagen før utflyttingen er aksjene hans verdt kr 15 500 000. Inngangsverdien er kr 3 700 000. All verdistigning skjedde mens han bodde i Norge. Bunnfradraget er kr 3 000 000, oppjusteringsfaktoren 1,72 og skatten på alminnelig inntekt 22 % [dagens regel]. Hvor stor blir exit-skatten?</p>`,
      options: ["kr 4 730 000", "kr 3 329 920", "kr 5 727 462", "kr 4 465 120"],
      answer: 1,
      solution: `<p>Latent gevinst: 15 500 000 − 3 700 000 = 11 800 000.</p><p>Etter bunnfradraget: 11 800 000 − 3 000 000 = 8 800 000.</p><p>Exit-skatt: 8 800 000 × 37,84 % = <b>kr 3 329 920</b>.</p>`,
      check: `<p>Oppjuster grunnlaget i stedet for satsen: 8 800 000 × 1,72 = 15 136 000; 15 136 000 × 22 % = 3 329 920. Baklengs: 3 329 920/37,84 % = 8 800 000. Legg til bunnfradraget og inngangsverdien: 8 800 000 + 3 000 000 + 3 700 000 = 15 500 000, som er markedsverdien.</p>`,
      traps: [
        "Skatt på hele verdien i stedet for gevinsten: (15 500 000 − 3 000 000) × 37,84 % = 12 500 000 × 37,84 % = 4 730 000. Inngangsverdien skal trekkes fra.",
        null,
        "Oppjustert to ganger: 8 800 000 × 1,72 × 37,84 % = 5 727 462,40.",
        "Glemte bunnfradraget: 11 800 000 × 37,84 % = 4 465 120.",
      ],
    },
    {
      id: "internasjonal-9",
      title: "Exit-skatt ved gave til noen i utlandet",
      theory: `<p>Exit-skatten kan ikke omgås ved å gi bort aksjene i stedet for å flytte selv. Gir du aksjer til noen i Norge, overtar mottakeren inngangsverdien din, så skatten kommer når han selger. Bor mottakeren i utlandet, typisk et barn, kan Norge ikke skattlegge det salget; derfor skattlegges den latente gevinsten hos deg som om du hadde solgt (skatteloven § 10-70). Grensen er en terskel på kr 100 000 i netto gevinst i året, ikke et fradrag: går gevinsten over, skattlegges hele. Bunnfradraget på kr 3 000 000 gjelder bare når du selv flytter; en skatteavtale med mottakerens land hjelper heller ikke. Den gamle femårsregelen, der skatten falt bort om aksjene ikke ble solgt innen fem år, ble opphevet i 2022.</p>
<div class="formula"><div class="eq">Gave til person i utlandet: skatt = latent gevinst × t<sub>e</sub> når netto gevinst i året &gt; 100 000</div><div class="eq">Netto gevinst i året høyst 100 000: ingen exit-skatt</div><div class="where">t<sub>e</sub> = 37,84 % [dagens regel]. Når du selv flytter, kan skatten betales straks, i tolv rentefrie årlige rater eller samlet etter tolv år med renter. Flytter du tilbake innen tolv år med aksjene i behold, faller den bort.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Ola gir datteren i Land S aksjer verdt kr 700 000 med inngangsverdi kr 300 000 [eksempeltall].</p><p>Gevinst: 700 000 − 300 000 = 400 000, over terskelen på 100 000. Hele gevinsten skattlegges, uten bunnfradrag: 400 000 × 37,84 % = <b>kr 151 360</b>. Hadde gevinsten vært kr 80 000, ville gaven ikke utløst exit-skatt.</p></div>`,
      q: `<p>Per er bosatt i Norge og blir boende her. I 2026 gir han aksjer verdt kr 1 400 000 til sønnen, som bor i Land C. Pers inngangsverdi er kr 500 000. Han gir ikke bort andre aksjer det året. Norge har skatteavtale med Land C. Eierskatten er 37,84 % [dagens regel]. Hvilket utsagn er riktig etter reglene som gjelder i 2026?</p>`,
      options: [
        "Ingen skatt nå. Sønnen overtar Pers inngangsverdi og betaler skatt på gevinsten først når han selger aksjene",
        "Exit-skatt nå på hele gevinsten, uten bunnfradrag: 900 000 × 37,84 % = kr 340 560",
        "Exit-skatt på 900 000 × 37,84 % = kr 340 560 beregnes, men den faller bort om sønnen ikke selger aksjene innen fem år",
        "Ingen skatt, fordi skatteavtalen med Land C gir sønnens bostedsland retten til å skattlegge gevinsten",
      ],
      answer: 1,
      solution: `<p>Gaven sender aksjene ut av norsk beskatningsområde: sønnen bor i utlandet, så Norge kan ikke skattlegge ham når han selger. Derfor utløser gaven exit-skatt hos Per.</p><p>Latent gevinst: 1 400 000 − 500 000 = 900 000, over terskelen på 100 000. Hele gevinsten skattlegges, uten bunnfradrag: 900 000 × 37,84 % = <b>kr 340 560</b>.</p>`,
      check: `<p>Terskelen er ikke et fradrag: (900 000 − 100 000) × 37,84 % = 302 720 ville vært feil. Kontroll av satsen: 900 000 × 1,72 = 1 548 000; 1 548 000 × 22 % = 340 560.</p>`,
      traps: [
        "Kontinuitet gjelder når mottakeren bor i Norge. Bor han i utlandet, kan Norge ikke skattlegge salget hans. Det er nettopp derfor gaven utløser exit-skatt.",
        null,
        "Femårsregelen ble opphevet i 2022. Etter dagens regler faller exit-skatten ikke bort ved å vente.",
        "Skatten utløses ved gaven, mens Per er norsk skattyter. Skatteavtalen fordeler retten til framtidige gevinster, men stopper ikke exit-skatten.",
      ],
    },
    {
      id: "internasjonal-10",
      title: "Selskapet flytter ut: stiftelse og § 10-71",
      theory: `<p>Et aksjeselskap stiftet etter norsk selskapsrett er hjemmehørende i Norge, også når styret og ledelsen flytter ut (skatteloven § 2-2). Det slutter bare å være hjemmehørende her om en skatteavtale gjør det hjemmehørende i en annen stat. Uten avtale kan et norskstiftet selskap altså ikke flytte ut skattemessig. Gjør en avtale det hjemmehørende i en stat utenfor EØS, skattlegges selskapet som om eiendelene var solgt dagen før (skatteloven § 10-71). Kursets fasiter i H2022 og H2024 sier at oppgjøret skjer på begge nivåer, som ved likvidasjon, mens lovteksten bare nevner selskapets eiendeler.</p>
<div class="formula"><div class="eq">Skatt ved utflytting = (markedsverdi − skattemessig verdi av eiendelene) × τ<sub>c</sub></div><div class="where">τ<sub>c</sub> er selskapsskatten, 22 % [dagens regel]. Etter loven gjelder regelen ved flytting ut av EØS, eller til et lavskatteland i EØS der selskapet ikke er reelt etablert. Svar med kursets fasit når eksamen spør etter den, men vit at loven er smalere.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Berg AS er stiftet i Norge og flytter ledelsen til et land utenfor EØS. Eiendelene har skattemessig verdi kr 10 000 000 og markedsverdi kr 25 000 000.</p><p>Uten skatteavtale: selskapet er fortsatt hjemmehørende i Norge, så ingenting utløses. Gjør en avtale det hjemmehørende i det andre landet: gevinst 25 000 000 − 10 000 000 = 15 000 000, skatt 15 000 000 × 22 % = <b>kr 3 300 000</b> på selskapets hånd.</p></div>`,
      q: `<p>Polar Data AS er stiftet i Norge. I 2026 flytter styret og hele ledelsen til Land U, som ligger utenfor EØS. Norge har skatteavtale med Land U. Etter avtalen er selskapet nå hjemmehørende i Land U. Eiendelene har en skattemessig verdi på kr 40 000 000 og en markedsverdi på kr 100 000 000. Selskapsskatten er 22 % [dagens regel]. Hvilket utsagn er riktig?</p>`,
      options: [
        "Selskapet skattlegges som om eiendelene var solgt dagen før utflyttingen: 60 000 000 × 22 % = kr 13 200 000",
        "Ingen norsk skatt utløses, fordi utflyttingsskatt bare gjelder personer som flytter",
        "Ingen norsk skatt utløses, fordi selskapet er stiftet i Norge og derfor fortsatt er hjemmehørende her",
        "Bare aksjonærene skattlegges, som om de hadde solgt aksjene sine dagen før utflyttingen",
      ],
      answer: 0,
      solution: `<p>Stiftelse i Norge holder selskapet hjemmehørende her bare så lenge ingen skatteavtale sier noe annet. Her gjør avtalen det hjemmehørende i Land U, utenfor EØS. Da utløser § 10-71 skatt som om eiendelene var solgt dagen før.</p><p>Gevinst: 100 000 000 − 40 000 000 = 60 000 000. Skatt: 60 000 000 × 22 % = <b>kr 13 200 000</b> på selskapets hånd.</p><p>Kursets fasiter legger til skatt på aksjonærnivå, som ved likvidasjon. Lovteksten nevner bare selskapet. Utsagnet er riktig under begge lesingene.</p>`,
      check: `<p>Sjekk stiftelsesregelen motsatt vei: uten skatteavtale med Land U ville Polar Data vært hjemmehørende i Norge fordi det er stiftet her. Da ville ingen skatt blitt utløst. Det var svaret i H2022 oppgave 4, spørsmål 7. Avtalen åpner døren ut, mens § 10-71 tar oppgjøret på vei ut.</p>`,
      traps: [
        null,
        "§ 10-71 gjelder nettopp selskaper. Exit-skatten for personer står i § 10-70.",
        "Stiftelsen holder selskapet i Norge bare når ingen avtale sier noe annet. Her gjør avtalen det hjemmehørende i Land U.",
        "Feil under begge lesingene. Lovteksten skattlegger selskapet for eiendelene. Kursets fasit skattlegger begge nivåer, ikke bare aksjonærene.",
      ],
    },
    {
      id: "internasjonal-11",
      title: "Eksamensnivå: bosatt i to land, avtalens bostedsregel (H2022 oppgave 4)",
      theory: `<p>Hvert land bruker sine egne bostedsregler, så du kan være bosatt i flere land samtidig. Da krever hvert av dem skatt av hele inntekten. Uten avtale og uten lempning legges alle satsene sammen: bosatt i tre land gir trippelbeskatning (H2022 oppgave 4, spørsmål 5 og 6). En skatteavtale etter OECDs mønsteravtale artikkel 4 peker ut ett bostedsland. Kriteriene prøves i fast rekkefølge, der du bare går videre når det forrige ikke peker ut ett land: fast bolig, sentrum for livsinteressene (familie, hjem, arbeid, økonomi), vanlig opphold og statsborgerskap. Bosted etter intern rett og flyttemelding avgjør ikke.</p>
<div class="formula"><div class="eq">Uten avtale, bosatt i n land: samlet skatt = (t<sub>1</sub> + t<sub>2</sub> + … + t<sub>n</sub>) × Y</div><div class="eq">Avtalens bostedsregel: fast bolig → sentrum for livsinteressene → vanlig opphold → statsborgerskap</div><div class="where">Har du fast bolig i begge land, avgjør som regel sentrum for livsinteressene. Dagtelling kommer først på tredje trinn.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Tor tjener kr 1 000 000 og er bosatt i Norge, Land K og Land D etter hvert lands interne rett. Satsene er 40 %, 20 % og 10 % [eksempeltall]. Ingen avtale gjelder. Ingen av landene lemper.</p><p>400 000 + 200 000 + 100 000 = <b>kr 700 000</b>, altså 70 % av inntekten. Med en avtale mellom Norge og Land K ville artikkel 4 peke ut ett av de to som bostedsland.</p></div>`,
      q: `<p>Henrik har bodd i Norge hele livet. Sommeren 2026 flytter han, kona og barna til Land K, der han har fått fast jobb og familien kjøper hus. Barna begynner på skole der. Leiligheten i Oslo beholder han ubebodd og bruker den når han er på besøk, til sammen 70 dager i året. Etter norsk intern rett er han fortsatt bosatt i Norge. Etter Land Ks interne rett er han bosatt i Land K. Skatteavtalen mellom Norge og Land K har en bostedsregel som OECDs mønsteravtale artikkel 4. Hvilket utsagn er riktig, både konklusjonen og begrunnelsen?</p>`,
      options: [
        "Norge, fordi han fortsatt disponerer leiligheten i Oslo og derfor er bosatt her etter norsk intern rett",
        "Norge, fordi han er norsk statsborger. Statsborgerskapet avgjør når han er bosatt i begge land",
        "Land K, fordi han oppholder seg langt flere dager i Land K enn i Norge i løpet av året",
        "Land K, fordi han har fast bolig i begge land og sentrum for livsinteressene i Land K",
      ],
      answer: 3,
      solution: `<p>Trinn 1, fast bolig: han har hus i Land K og en leilighet han disponerer i Oslo. Fast bolig i begge land, så trinnet avgjør ikke.</p><p>Trinn 2, sentrum for livsinteressene: kona, barna, skolen, jobben og huset er i Land K. Det avgjør. Etter avtalen er Henrik <b>bosatt i Land K</b>.</p><p>At han er bosatt i Norge etter intern rett, er nettopp konflikten artikkel 4 løser. Vanlig opphold og statsborgerskap brukes bare når de første trinnene ikke avgjør.</p>`,
      check: `<p>Gå trinnene i rekkefølge og stopp der ett land peker seg ut. Hopper du rett til trinn 3 (dager), får du riktig land med feil begrunnelse. Det er fellen H2022 oppgave 4 satte. Konsekvensen: som bosatt i Land K etter avtalen kan Henrik ikke skattlegges i Norge for lønnen han tjener for arbeid i Land K.</p>`,
      traps: [
        "Bosted etter intern rett er utgangspunktet for konflikten, ikke løsningen. Artikkel 4 avgjør mellom de to landene.",
        "Statsborgerskap er fjerde trinn og brukes bare når de tre første ikke avgjør.",
        "Riktig land, feil begrunnelse. Vanlig opphold er tredje trinn; her avgjør sentrum for livsinteressene allerede på andre trinn.",
        null,
      ],
    },
    {
      id: "internasjonal-12",
      title: "Eksamensnivå: fire markeder, tre regimer (H2024 oppgave 10)",
      theory: `<p>H2024 oppgave 10 ga ni delspørsmål om ett selskap med salg i fire land; H2021 oppgave 4 spurte etter skatten som skal betales til Norge. Tegn kartet først: ett land per rad, med metode, skatt lokalt og skatt til Norge. Norge har globalskatteplikt, så hver krone starter med 22 %. Unntak gir 0 til Norge og kredit gir norsk skatt minus kreditfradraget. Uten avtale tar Norge full skatt når oppgaven sier at Norge ikke lemper. Summer kolonnene og kontroller mot ren norsk skatt.</p>
<div class="formula"><div class="eq">Unntak: til Norge = 0</div><div class="eq">Kredit: til Norge = 22 % × Y<sub>i</sub> − min(t<sub>i</sub> × Y<sub>i</sub> ; 22 % × Y<sub>i</sub>)</div><div class="eq">Ingen avtale, Norge lemper ikke: til Norge = 22 % × Y<sub>i</sub></div><div class="where">Y<sub>i</sub> er inntekten fra land i og t<sub>i</sub> satsen der. Inntekt fra Norge gir 22 % × Y<sub>Norge</sub>. Sier ikke oppgaven at Norge lar være å lempe, gjelder § 16-20, som virker som kredit.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et norsk aksjeselskap tjener kr 10 000 000 i hvert av fire markeder: Norge, Land A (fullstendig unntak), Land B (vanlig kredit) og Land C (ingen avtale, Norge lemper ikke). Alle tre utenlandske land har 15 % [eksempeltall].</p><p>Til Norge: 2 200 000 + 0 + (2 200 000 − 1 500 000) + 2 200 000 = <b>kr 5 100 000</b>. Lokalt: 3 × 1 500 000 = 4 500 000. Samlet 9 600 000, altså 24 %. Samme sats ute gir tre ulike resultater: 15 % under unntak, 22 % under kredit og 37 % uten avtale.</p></div>`,
      q: `<p>Nordkapp Analytics AS er hjemmehørende i Norge og har i 2026 et overskudd på kr 60 000 000 uten kostnader: kr 15 000 000 fra Norge, kr 20 000 000 fra Land A, kr 10 000 000 fra Land B og kr 15 000 000 fra Land C. Avdelingene i alle tre land er faste driftssteder. Avtalen med Land A bygger på fullstendig unntak og avtalen med Land B på vanlig kredit. Med Land C har Norge ingen avtale. Selskapsskatten er 22 % i Norge [dagens regel], 12 % i Land A, 30 % i Land B og 10 % i Land C [eksempeltall]. Anta, slik eksamensoppgaven gjorde, at Norge ikke gir fradrag for skatt betalt i Land C (se bort fra skatteloven § 16-20). Hvor mye skatt skal selskapet betale til Norge for 2026?</p>`,
      options: ["kr 5 800 000", "kr 8 600 000", "kr 6 600 000", "kr 3 300 000"],
      answer: 2,
      solution: `<table class="data"><tr><th>Marked</th><th>Inntekt</th><th>Metode</th><th>Skatt lokalt</th><th>Skatt til Norge</th></tr>
<tr><td>Norge</td><td class="n">15 000 000</td><td>intern rett</td><td class="n">0</td><td class="n">3 300 000</td></tr>
<tr><td>Land A</td><td class="n">20 000 000</td><td>fullstendig unntak</td><td class="n">2 400 000</td><td class="n">0</td></tr>
<tr><td>Land B</td><td class="n">10 000 000</td><td>vanlig kredit</td><td class="n">3 000 000</td><td class="n">0</td></tr>
<tr><td>Land C</td><td class="n">15 000 000</td><td>ingen avtale</td><td class="n">1 500 000</td><td class="n">3 300 000</td></tr>
<tr><td>Sum</td><td class="n">60 000 000</td><td></td><td class="n">6 900 000</td><td class="n">6 600 000</td></tr></table>
<p>Land B: norsk skatt 10 000 000 × 22 % = 2 200 000, kreditfradrag min(3 000 000 ; 2 200 000) = 2 200 000, til Norge 0. Land C: Norge tar full skatt, 15 000 000 × 22 % = 3 300 000.</p><p>Til Norge: 3 300 000 + 0 + 0 + 3 300 000 = <b>kr 6 600 000</b>.</p>`,
      check: `<p>Kontroller mot ren norsk skatt: 60 000 000 × 22 % = 13 200 000. Samlet skatt i alle land er 6 900 000 + 6 600 000 = 13 500 000, altså 300 000 mer. Avviket skal kunne spores land for land: Land A ligger 10 prosentpoeng under norsk nivå (−2 000 000), Land B 8 over (+800 000) og Land C 10 over (+1 500 000). −2 000 000 + 800 000 + 1 500 000 = 300 000.</p>`,
      traps: [
        "Kreditten større enn norsk skatt i Land B: 2 200 000 − 3 000 000 = −800 000, så Norge får 3 300 000 − 800 000 + 3 300 000 = 5 800 000. Restskatten kan ikke bli negativ.",
        "Byttet om unntak og kredit: kredit i Land A gir (22 % − 12 %) × 20 000 000 = 2 000 000 til Norge, unntak i Land B gir 0. Sum 3 300 000 + 2 000 000 + 0 + 3 300 000 = 8 600 000.",
        null,
        "Trodde at bare Land C skattlegger når det ikke finnes avtale, så Norge får bare skatten på den norske inntekten: 15 000 000 × 22 % = 3 300 000.",
      ],
    },
  ],
});
