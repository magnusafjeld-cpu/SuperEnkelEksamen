/* kj8 · Sparing og porteføljevalg */
window.EDU_DATA.kjerne.push({
  id: "kj8",
  num: 8,
  title: "Sparing og porteføljevalg",
  chapters: [14, 18],
  html: `
<p class="lead-in">Mertons aksjeandel med humankapital har vært med i fem av ni sett og tok 14 % av poengene i både H2022 og H2025. Porteføljestoffet tok 8 % i H2024 og 7 % i H2025, sparevalget med ln-nytte 14 % i H2022. To vaner avgjør mye: sjekk om tallet er varians eller standardavvik, og om «andel» betyr andel av finansformuen eller av totalformuen.</p>

<h3>To aktiva og kapitalmarkedslinjen</h3>
<p>Med andelen s i aktivum 1 og 1 − s i aktivum 2:</p>
<div class="formula"><div class="eq">E(r<sub>p</sub>) = sμ<sub>1</sub> + (1 − s)μ<sub>2</sub></div>
<div class="eq">σ<sub>p</sub><sup>2</sup> = s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub></div>
<div class="where">μ<sub>i</sub> er forventet avkastning, σ<sub>i</sub> standardavviket og ρ korrelasjonen. Forventningen er et vektet snitt, variansen er det ikke: så lenge ρ &lt; 1 er standardavviket lavere enn det vektede snittet av standardavvikene. Det er diversifiseringsgevinsten. Krysleddet inneholder kovariansen ρσ<sub>1</sub>σ<sub>2</sub>, ikke ρ alene.</div></div>
<p>To grensetilfeller må du kunne, og ρ = 1 er testet. Ved ρ = 1 blir σ<sub>p</sub> = sσ<sub>1</sub> + (1 − s)σ<sub>2</sub>, en rett linje uten gevinst, og uten shortsalg gir alt i aksjen med lavest σ lavest risiko (H2024 oppgave 12d: 100 % i A; distraktoren 69 % er minimum-varians-vekten σ<sub>B</sub><sup>2</sup>/(σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup>) med ρ satt til 0). Ved ρ = −1 kan risikoen fjernes helt med s* = σ<sub>2</sub>/(σ<sub>1</sub> + σ<sub>2</sub>), som bare er 50 % når standardavvikene er like.</p>
<p>Med bank og lån til risikofri rente r<sub>f</sub> ligger alle gode porteføljer på én linje gjennom markedsporteføljen M:</p>
<div class="formula"><div class="eq">E(r<sub>p</sub>) = r<sub>f</sub> + [(E(r<sub>M</sub>) − r<sub>f</sub>)/σ<sub>M</sub>] × σ<sub>p</sub></div>
<div class="where">Stigningstallet er Sharpe-forholdet, meravkastning per enhet risiko. Med r<sub>f</sub> = 3 %, premie 5 prosentpoeng og σ<sub>M</sub> = 15 % [eksempeltall] er det 0,333. Vil du ha σ<sub>p</sub> = 22,5 %, låner du 50 % av egenkapitalen og har 150 % i M: 3 % + 1,5 × 5 % = 10,5 %. Lånt andel = σ<sub>p</sub>/σ<sub>M</sub> − 1.</div></div>
<div class="callout mech"><span class="h">Hvorfor gir ikke volatile enkeltaksjer mer forventet avkastning?</span>Markedet betaler bare for risiko du ikke kan diversifisere bort. Selskapsspesifikk risiko forsvinner i en bred portefølje, så ingen får betalt for å bære den, og enkeltaksjen havner under linjen. Alle holder derfor samme risikable portefølje, i praksis et globalt indeksfond, og risikoviljen styrer bare blandingen med bank eller lån (separasjonsteoremet). Vil du ha mer risiko enn M, låner du og girer M (H2025 oppgave 15).</div>
<p>Et indeksfond gir per definisjon det verdivektede snittet av aksjene minus gebyret, så «indeksfondet slår et vektet snitt» er feil (H2024 oppgave 12a). Et globalt indeksfond er omtrent 70 % USA og har lite eller ingen Kina (H2024 oppgave 12b). Forbrukerrådet fant at aktive fond over tjue år fram til 2018 gjorde det svakere enn indeks for globale, europeiske og nordiske aksjer, men bedre for norske (H2025 oppgave 16). Gebyret forklarer mye: ett prosentpoeng i årlig gebyr gir 17,1 % lavere sluttverdi over 20 år (7 % mot 6 % [eksempeltall]). Er lønnen høy når kronen er sterk, skal du ikke valutasikre fondet: det er verdt mest i kroner når lønnen er lav (H2024 oppgave 12c).</p>

<h3>Merton med humankapital</h3>
<p>Kapitalmarkedslinjen sier hvilken risikabel portefølje; Merton sier hvor mye:</p>
<div class="formula"><div class="eq">w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>)</div>
<div class="where">w* er andelen av <b>totalformuen</b> i aksjer, μ − r<sub>f</sub> risikopremien, σ<sup>2</sup> markedets varians og γ risikoaversjonen. Tidshorisont står ikke i formelen, og tre gitte størrelser bestemmer den fjerde.</div></div>
<div class="formula"><div class="eq">Aksjer i finansformuen = w*(F + H) − β<sub>H</sub> × H · α<sub>F</sub> = [w*(F + H) − β<sub>H</sub> × H]/F</div>
<div class="where">F er finansformuen, H humankapitalen (nåverdien av framtidig arbeidsinntekt) og β<sub>H</sub> dens samvariasjon med aksjemarkedet. Sikker jobb: β<sub>H</sub> = 0, humankapitalen er et implisitt bankinnskudd, og all aksjeeksponering tas i F. Lønn som følger markedet én-til-én: β<sub>H</sub> = 1, og du eier allerede aksjer for H. α<sub>F</sub> kappes ved 0; over 100 % betyr lån.</div></div>
<div class="worked"><span class="wh">Gjennomregnet: H2025 oppgave 11</span>
<p>Risikopremien er 0,05 og markedets <b>varians</b> 0,10 [eksempeltall fra oppgaveteksten]. Kari skal ha 50 % av totalformuen i aksjer. F = kr 1 mill. og H = kr 1 mill.</p>
<p><b>Steg 1: γ.</b> 0,50 = 0,05/(γ × 0,10) gir γ = 1.</p>
<p><b>Steg 2: sikker humankapital, β<sub>H</sub> = 0.</b> Ønsket aksjebeløp 0,50 × 2 mill. = 1 mill., og alt må tas i F: <b>100 %</b> av finansformuen.</p>
<p><b>Steg 3: risikabel humankapital, β<sub>H</sub> = 1.</b> 1 mill. − 1 × 1 mill. = 0, altså <b>0 %</b>: hele F i bank.</p>
<p><b>Steg 4: nær pensjon, H ≈ 0.</b> α<sub>F</sub> = w* = 50 %, lavere enn i steg 2. Sensor godtok også «lik andel», fordi andelen av totalformuen er 50 % hele tiden: les nevneren.</p>
<p><b>Kontroll:</b> aksjeandelen av alt skal være w*: 1 mill. av 2 mill. i både steg 2 (aksjer) og steg 3 (aksjelignende humankapital). ✓</p>
<p><b>De gale tallene:</b> 0,10 lest som standardavvik og kvadrert gir γ = 10. w* rett på F gir 50 % i både steg 2 og 3. Svaret fra forrige steg dratt videre gir 100 % i steg 3.</p>
</div>

<h3>Sparevalget med ln-nytte</h3>
<p>H2019 oppgave 9 og H2022 oppgave 5: bank mot fond med to utfall og U(W) = ln W av sluttverdien W. Du velger høyest forventet nytte, p × ln W<sub>god</sub> + (1 − p) × ln W<sub>dårlig</sub> mot ln W<sub>bank</sub>. Ved tapsaversjon ganges nytten av utfall under referansepunktet med en tapsvekt under 1.</p>
<div class="worked"><span class="wh">Gjennomregnet: bank, subjektive sannsynligheter og tapsaversjon</span>
<p>Ella har kr 400 000 i 15 år. Banken gir 2,5 % sikkert; fondet gir kr 1 300 000 eller kr 280 000 med 50 % sannsynlighet hver [eksempeltall, uten skatt].</p>
<p><b>Steg 1: bank.</b> 400 000 × 1,025<sup>15</sup> = 579 319, og ln 579 319 = 13,2696.</p>
<p><b>Steg 2: fondet.</b> 0,5 × 14,0779 + 0,5 × 12,5425 = 13,3102 &gt; 13,2696: fondet.</p>
<p><b>Steg 3: subjektiv p = 40 %.</b> 0,4 × 14,0779 + 0,6 × 12,5425 = 13,1567 &lt; 13,2696: banken. Sluttverdiene er de samme; bare nytten endres. Grensen er p* = (13,2696 − 12,5425)/(14,0779 − 12,5425) = 47,36 %.</p>
<p><b>Steg 4: tapsaversjon.</b> Referansepunktet er innskuddet, så bare 280 000 er et tap: 0,970874 × 12,5425 = 12,1772 (tapsvekt 1/1,03). 0,5 × 14,0779 + 0,5 × 12,1772 = 13,1276 &lt; 13,2696: banken.</p>
<p><b>Kontroll:</b> tapsvekten trekker bare ned det dårlige utfallet, så den kan bare flytte valget mot banken. ✓</p>
<p><b>De gale tallene:</b> forventet sluttverdi (790 000 og 688 000 mot 579 319) velger fondet i alle tre tilfellene, som om Ella var risikonøytral. Nyttetallene ligger tett, så skriv ned hvilke to du sammenligner.</p>
</div>
<p>Aksjesparekonto [dagens regel]: gevinst og utbytte på kontoen skattlegges først ved uttak ut over innskuddet, med skjerming og 37,84 %, så hele bruttoavkastningen forrentes videre.</p>

<div class="callout warn"><span class="h">Feilene som koster poeng</span>Standardavvik brukt som varians: med premie 4 %, σ = 20 % og γ = 3 er w* = 0,04/(3 × 0,04) = 33,3 %, men 6,7 % om du glemmer å kvadrere. w* brukt direkte på finansformuen. Og «aksjer blir tryggere på lang sikt», som kurset avviser: sluttformuens standardavvik vokser med horisonten. Det gale alternativet har ofte riktig konklusjon med galt argument, så les hele setningen.</div>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Porteføljevarians σ<sub>p</sub><sup>2</sup> = s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>, der s er andelen i aktivum 1 og ρ korrelasjonen. Ved ρ = 1 og uten shortsalg: alt i aktivumet med lavest standardavvik.</li>
<li>Kapitalmarkedslinjen E(r<sub>p</sub>) = r<sub>f</sub> + [(E(r<sub>M</sub>) − r<sub>f</sub>)/σ<sub>M</sub>] × σ<sub>p</sub>: vil du ha mer risiko enn markedsporteføljen M, låner du til r<sub>f</sub> og kjøper mer M, ikke volatile enkeltaksjer.</li>
<li>Merton w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>) er aksjeandelen av totalformuen F + H (finansformue pluss humankapital), med σ<sup>2</sup> som varians. Aksjer i F = w*(F + H) − β<sub>H</sub> × H, der β<sub>H</sub> = 0 for sikker humankapital og 1 for lønn som følger markedet.</li>
<li>Med trygg jobb skal unge ha høyere aksjeandel av finansformuen enn eldre fordi humankapitalen er stor og obligasjonslignende, ikke fordi aksjer blir tryggere med tiden.</li>
<li>Indeksfond: gir det verdivektede snittet minus gebyret; et globalt fond er omtrent 70 % USA; Forbrukerrådet fant aktive fond svakere enn indeks globalt, i Europa og Norden, men bedre i Norge; ikke valutasikre når lønnen er høy når kronen er sterk.</li>
<li>Sparevalg med U(W) = ln W: sammenlign p × ln W<sub>god</sub> + (1 − p) × ln W<sub>dårlig</sub> med ln W<sub>bank</sub>. Nye sannsynligheter endrer nytten, aldri sluttverdiene; tapsvekten ganges bare på utfall under referansepunktet.</li></ul></div>
`,
  checks: [
    {
      id: "kj8-s1",
      q: "Aksje A har forventet avkastning 8 % og standardavvik 15 %, aksje B 5 % og 25 %. Korrelasjonen er 1, og du kan bare investere i disse to, uten shortsalg. Hvilken fordeling gir lavest standardavvik?",
      options: [
        "100 % i A, fordi risikoen er lineær i andelen",
        "50 % i hver, fordi spredning alltid senker risikoen",
        "62,5 % i A, fra σ<sub>B</sub>/(σ<sub>A</sub> + σ<sub>B</sub>)",
        "73,5 % i A, fra minimum-varians-andelen med ρ = 0",
      ],
      answer: 0,
      explanation: "Ved ρ = 1 er σ<sub>p</sub> = s × 15 % + (1 − s) × 25 %, som faller jo mer du har i A, så minimum ligger i hjørnet med alt i A. Minimum-varians-formelen med ρ satt til 0, 0,0625/(0,0225 + 0,0625) = 73,5 %, er den fristende feilen: den gjelder bare når aksjene er ukorrelerte. Andelen 62,5 % er løsningen for ρ = −1.",
    },
    {
      id: "kj8-s2",
      q: "Markedsporteføljen har forventet avkastning 7 % og standardavvik 16 %, og du kan låne og spare til r<sub>f</sub> = 3 %. Du vil ha standardavvik 24 %. Hvilken forventet avkastning gir kapitalmarkedslinjen?",
      options: [
        "10,5 %, altså 150 % av markedets 7 %",
        "6,0 %, altså 1,5 × premien på 4 prosentpoeng",
        "7,0 %, fordi mer risiko enn M ikke betales",
        "9,0 %, altså 3 % + 1,5 × 4 prosentpoeng",
      ],
      answer: 3,
      explanation: "Du låner 24/16 − 1 = 50 % av egenkapitalen og har 150 % i M: 1,5 × 7 % − 0,5 × 3 % = 9,0 %, det samme som 3 % + (4/16) × 24 %. Svaret 10,5 % glemmer at lånet koster r<sub>f</sub>. Mer risiko enn M betales langs linjen, så lenge du tar den ved å gire M.",
    },
    {
      id: "kj8-s3",
      q: "Ifølge kurset bør en 30-åring med trygg jobb ha høyere aksjeandel av finansformuen enn en 60-åring med samme risikoaversjon γ. Hvorfor?",
      options: [
        "Aksjer blir mindre risikable jo lengre tid du eier dem",
        "Humankapitalen er stor og virker som et sikkert bankinnskudd",
        "Mertons w* øker med lengden på tidshorisonten",
        "Unge tåler tap bedre og har derfor lavere γ",
      ],
      answer: 1,
      explanation: "Merton gjelder totalformuen F + H, og en trygg humankapital er en stor obligasjonslignende post, så aksjeeksponeringen må tas i den lille finansformuen. Påstanden om at aksjer blir tryggere med tiden er den fristende feilen: sluttformuens standardavvik vokser med horisonten, og formelen inneholder ingen tid. γ er oppgitt som lik.",
    },
    {
      id: "kj8-s4",
      q: "Ella velger mellom bank og et fond med to utfall, med ln-nytte. Hun blir mer pessimistisk: sannsynligheten for gode tider går ned fra 50 % til 40 %. Hva endres?",
      options: [
        "Fondets forventede nytte, men ikke sluttverdiene i utfallene",
        "Sluttverdiene i begge utfall, og dermed nytten",
        "Bankens nytte, fordi banken er referansepunktet",
        "Ingenting, fordi ln W bare avhenger av sluttverdien",
      ],
      answer: 0,
      explanation: "Sannsynlighetene er vektene i p × ln W<sub>god</sub> + (1 − p) × ln W<sub>dårlig</sub>; utfallene selv og bankens sikre ln W<sub>bank</sub> er uendret. Det er fellen i H2022 oppgave 5: å tro at sluttverdiene flytter seg. Hver ln W er uendret, men den veide summen er ikke det.",
    },
  ],
  case: {
    id: "kj8-m1",
    topic: "Merton med sikker og risikabel humankapital",
    minutes: 10,
    body: `<p>Et globalt indeksfond har forventet avkastning μ = 9 % og standardavvik σ = 25 %, og risikofri rente er r<sub>f</sub> = 3 % [eksempeltall]. Du kan låne og spare til r<sub>f</sub>, men ikke shorte aksjer. Aksjeandelene regnes etter Mertons formel, w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>), som andel av totalformuen F + H, der F er finansformuen og H humankapitalen.</p>
<p>Hedda er 30 år. Mertons formel gir henne w* = 32 % av totalformuen. Finansformuen er kr 1 600 000 og humankapitalen kr 2 400 000. Hun har en bonusdel i lønnen, så humankapitalen er delvis risikabel med beta mot aksjemarkedet β<sub>H</sub> = 0,25.</p>
<p>Faren Tor er 60 år og har samme risikoaversjon, så w* = 32 % gjelder også for ham. Han er aksjemegler, og lønnen følger markedet én-til-én: β<sub>H</sub> = 1. Finansformuen er kr 3 000 000 og humankapitalen kr 1 000 000.</p>`,
    ledd: [
      {
        id: "kj8-m1a",
        points: 3,
        q: `<p>Hvor høy er Heddas risikoaversjon γ?</p>`,
        options: ["4,50", "3,00", "0,75", "0,33"],
        answer: 1,
        solution: `<p><b>Steg 1 — premie og varians.</b> μ − r<sub>f</sub> = 9 % − 3 % = 0,06, og σ<sup>2</sup> = 0,25<sup>2</sup> = 0,0625.</p><p><b>Steg 2 — løs formelen baklengs.</b> 0,32 = 0,06/(γ × 0,0625), så γ = 0,06/(0,32 × 0,0625) = 0,06/0,02 = <b>3,00</b>.</p><p><b>Kontroll:</b> 0,06/(3 × 0,0625) = 0,06/0,1875 = 0,32. ✓</p>`,
        traps: [
          "Forventet avkastning i telleren i stedet for risikopremien: 0,09/(0,32 × 0,0625) = 4,50.",
          null,
          "Standardavviket brukt som varians: 0,06/(0,32 × 0,25) = 0,75.",
          "Brøken snudd: (0,32 × 0,0625)/0,06 = 0,33.",
        ],
      },
      {
        id: "kj8-m1b",
        points: 3,
        q: `<p>Hvor stor andel av <b>finansformuen</b> bør Hedda ha i aksjer?</p>`,
        options: ["17,0 %", "32,0 %", "42,5 %", "80,0 %"],
        answer: 2,
        solution: `<p><b>Steg 1 — ønsket aksjebeløp av totalformuen.</b> 0,32 × (1 600 000 + 2 400 000) = 0,32 × 4 000 000 = kr 1 280 000.</p><p><b>Steg 2 — det humankapitalen allerede leverer.</b> Den er delvis risikabel: β<sub>H</sub> × H = 0,25 × 2 400 000 = kr 600 000 i aksjeeksponering.</p><p><b>Steg 3 — resten tas i finansformuen.</b> 1 280 000 − 600 000 = kr 680 000, og 680 000/1 600 000 = <b>42,5 %</b> av finansformuen.</p><p><b>Kontroll:</b> samlet aksjeeksponering 680 000 + 600 000 = 1 280 000, som er 32 % av 4 000 000. ✓</p>`,
        traps: [
          "Aksjebeløpet delt på totalformuen i stedet for finansformuen: 680 000/4 000 000 = 17,0 %.",
          "w* brukt direkte på finansformuen: 32 %, altså kr 512 000. Da er humankapitalen ikke med.",
          null,
          "Humankapitalen behandlet som sikker (β<sub>H</sub> = 0): 1 280 000/1 600 000 = 80,0 %.",
        ],
      },
      {
        id: "kj8-m1c",
        points: 3,
        q: `<p>Hvor stor andel av <b>finansformuen</b> bør Tor ha i aksjer?</p>`,
        options: ["9,3 %", "32,0 %", "34,3 %", "42,7 %"],
        answer: 0,
        solution: `<p><b>Steg 1 — ønsket aksjebeløp av totalformuen.</b> 0,32 × (3 000 000 + 1 000 000) = kr 1 280 000.</p><p><b>Steg 2 — humankapitalen er risikabel.</b> Med β<sub>H</sub> = 1 er hele H aksjelignende: 1 × 1 000 000 = kr 1 000 000.</p><p><b>Steg 3 — resten i finansformuen.</b> 1 280 000 − 1 000 000 = kr 280 000, og 280 000/3 000 000 = <b>9,3 %</b>. Resten, kr 2 720 000, står risikofritt.</p><p><b>Kontroll:</b> 280 000 + 1 000 000 = 1 280 000, som er 32 % av 4 000 000. ✓</p>`,
        traps: [
          null,
          "w* brukt direkte på finansformuen: 32 %. Da er humankapitalen, som allerede er aksjer, ikke med.",
          "Heddas β<sub>H</sub> = 0,25 dratt videre: (1 280 000 − 250 000)/3 000 000 = 34,3 %.",
          "Humankapitalen behandlet som sikker (β<sub>H</sub> = 0): 1 280 000/3 000 000 = 42,7 %.",
        ],
      },
    ],
  },
});
