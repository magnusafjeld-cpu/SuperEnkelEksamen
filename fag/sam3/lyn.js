/* ===================== SAM3 · LYNLÆRING-INNHOLD =====================
   Sant/usant, skift-eller-glid, mekanisme-kjeder og opp/ned, forfattet fra
   eksamensmanualen. Rene data — spillmotoren ligger i js/bundle-lyn.js. */
window.EDU_DATA = window.EDU_DATA || {};

/* Innhold forfattet fra manualen (sant/usant, skift/glid, kjeder). */
window.EDU_DATA.lyn = {
  tf: [{"s":"BNP kan beregnes fra produksjonssiden, inntektssiden og utgiftssiden, og alle tre gir samme verdi.","answer":true,"why":"Produksjon = Inntekt = Utgifter er nasjonalregnskapets fundamentale identitet: hver krone produsert er en krone tjent og en krone brukt.","ch":2},{"s":"I Solow-modellen gir en varig høyere sparerate varig høyere vekstrate i BNP per innbygger.","answer":false,"why":"Nei: s̄ opp gir en NIVÅeffekt (høyere k* og y*) med rask vekst kun i overgangen. I steady state er veksten null; Solow gir ingen langsiktig vekst.","ch":8},{"s":"Realrenten finner vi ved å legge inflasjonen til den nominelle renten: R = i + π.","answer":false,"why":"Fortegnsfeil: Fisher-ligningen er R = i − π. Inflasjonen spiser av den nominelle avkastningen, den legges ikke til.","ch":12},{"s":"Etter Okuns lov gir et produksjonsgap på −4 % en ledighet omtrent 2 prosentpoeng over naturlig nivå.","answer":true,"why":"u − ū = −0,5·Ỹ = −0,5·(−4 %) = +2 prosentpoeng. Negativt gap betyr ledighet over det naturlige nivået ū.","ch":13},{"s":"Når valutakursen εₜ (kroner per euro) stiger, betyr det at kronen styrker seg.","answer":false,"why":"Motsatt: εₜ↑ betyr flere kroner per euro, altså SVAKERE krone (depresiering). εₜ↓ = sterkere krone (appresiering).","ch":19},{"s":"Med Cobb-Douglas og perfekt konkurranse går andelen 1−α av inntekten til arbeid, uansett hvor mye kapital og arbeid som finnes.","answer":true,"why":"w*L̄/Y* = 1−α og r*K̄/Y* = α. Derfor er lønnsandelen stabil rundt 2/3, og vi setter kapitalandelen α = 1/3.","ch":7},{"s":"BNP fra produksjonssiden finner vi ved å summere all omsetning (salg) i alle bedrifter.","answer":false,"why":"Det ville telt mellomprodukter flere ganger. Riktig mål er verdiskaping: salg minus innkjøp av mellomprodukter, summert over bedriftene.","ch":2},{"s":"I Romer-modellen senker fallende befolkningsvekst den langsiktige vekstraten i BNP per innbygger.","answer":true,"why":"Hovedresultatet er g*_y = γ·n̄: lavere n̄ gir entydig lavere langsiktig vekst. Dette er en vekstrateeffekt, ikke en nivåeffekt.","ch":9},{"s":"En renteheving fra sentralbanken skifter IS-kurven innover mot venstre.","answer":false,"why":"Renten står på aksen: endringer i Rₜ er bevegelser LANGS IS. Kurven skifter bare ved etterspørselssjokk (ā) eller endring i r̄.","ch":14},{"s":"Når en arbeidsledig gir opp jobbsøkingen og begynner å studere, faller ledighetsraten uten at noen har fått jobb.","answer":true,"why":"Personen går fra U til utenfor arbeidsstyrken (O), så U/L faller («discouraged worker»). Sysselsettingsraten E/N er uendret.","ch":11},{"s":"BNI finner vi ved å trekke netto inntektsstrømmer fra utlandet fra BNP.","answer":false,"why":"Feil retning: BNI = BNP + F, der F er netto inntekt og overføringer FRA utlandet. BNI er det landet har til disposisjon.","ch":3},{"s":"Et positivt prissjokk (ō > 0) gir stagflasjon: høyere inflasjon og lavere produksjon samtidig.","answer":true,"why":"AS skifter opp; sentralbanken svarer med høyere realrente, og økonomien beveger seg langs AD til et punkt med π opp og Ỹ ned.","ch":17},{"s":"I Romer-modellen gir en varig økning i forskerandelen ℓ̄ varig høyere vekstrate i BNP per innbygger.","answer":false,"why":"ℓ̄ gir en NIVÅeffekt: BGP-banen løftes parallelt, men langsiktig vekstrate er fortsatt g*_y = γn̄. Kun n̄ og γ endrer vekstraten.","ch":9},{"s":"En økonomi som vokser med 2 % i året, bruker omtrent 35 år på å doble BNP per innbygger.","answer":true,"why":"Regelen om 70: doblingstid ≈ 70/g = 70/2 = 35 år. Doblingstiden avhenger kun av vekstraten, ikke av startnivået.","ch":6},{"s":"Arbeidsledighetsraten beregnes som antall ledige delt på befolkningen i arbeidsfør alder.","answer":false,"why":"Feil nevner: u = U/L, ledige delt på ARBEIDSSTYRKEN (E + U). Sysselsettingsrate og yrkesdeltakelse måles mot befolkningen N.","ch":11},{"s":"Ifølge kvantitetsteorien slår høyere pengevekst på lang sikt én-til-én ut i inflasjonen: π* = g_M − g_Y.","answer":true,"why":"Med konstant omløpshastighet (gV = 0) og Y bestemt av reelle faktorer gir M·V = P·Y at inflasjonen følger pengeveksten.","ch":12},{"s":"Et jordskjelv som ødelegger kapital, skifter kurvene i Solow-diagrammet ned mot en ny og lavere steady state.","answer":false,"why":"Ingen kurver flytter seg: økonomien hopper til et punkt under k* på samme kurver og vokser tilbake til SAMME steady state. Kurveskift krever f.eks. et TFP-fall.","ch":8},{"s":"Setter Norges Bank renten høyere enn utlandet, strømmer kapital inn og kronen styrker seg (εₜ faller).","answer":true,"why":"UIP: renteforskjellen gir kapitalinngang og appresiering. Forventet fremtidig depresiering (εₜ₊₁↑) utligner avkastningen.","ch":19},{"s":"Et oljeprissjokk gir en bevegelse langs Phillips-kurven.","answer":false,"why":"Nei: et prissjokk (ō > 0) SKIFTER hele Phillips-kurven opp. Bevegelse langs kurven skjer bare når produksjonsgapet Ỹ endres.","ch":16},{"s":"Et land som sparer mer enn det investerer hjemme, har driftsbalanseoverskudd og bygger opp fordringer på utlandet.","answer":true,"why":"S = I + CA: sparing som ikke investeres hjemme, lånes ut til utlandet. Norges situasjon: oljeinntektene spares i Oljefondet.","ch":3},{"s":"Pengenøytralitet betyr at endringer i pengemengden ikke har reelle effekter, verken på kort eller lang sikt.","answer":false,"why":"Nøytralitet gjelder KUN lang sikt. På kort sikt er prisene trege, så penger har reelle effekter. Det er hele grunnlaget for kortsiktsmodellen.","ch":12},{"s":"Jo lenger under sin steady state en økonomi befinner seg, desto raskere vokser den.","answer":true,"why":"Prinsippet om overgangsdynamikk: langt under k* er investeringen s̄y mye større enn avskrivningen d̄k. Veksten avtar mot k*.","ch":8},{"s":"Et positivt etterspørselssjokk (ā > 0) skifter både AD-kurven og AS-kurven i sjokkperioden.","answer":false,"why":"ā↑ skifter kun AD; økonomien beveger seg LANGS AS. AS skifter bare ved prissjokk ō eller når πₜ₋₁ oppdateres mellom perioder.","ch":17},{"s":"Et forbud mot oppsigelser har tvetydig effekt på naturlig ledighet, fordi både separasjonsraten s og jobbfinnerraten f faller.","answer":true,"why":"Lavere s trekker u* = s/(f+s) ned, men bedrifter blir mer forsiktige med å ansette, så f faller også. Nettoeffekten kan bli høyere ledighet.","ch":11},{"s":"Hvis et jordskjelv ødelegger halve kapitalbeholdningen, faller både realrenten r og lønnen w.","answer":false,"why":"Feil: kapital blir knapp, så MPK og dermed r STIGER. Hver arbeider har mindre kapital å jobbe med, så MPL og w faller.","ch":7},{"s":"Taylor-prinsippet krever m̄ > 0: realrenten må heves når inflasjonen stiger, ellers blir inflasjonen ustabil.","answer":true,"why":"Med m̄ ≤ 0 gir høyere inflasjon lavere realrente, mer etterspørsel og enda høyere inflasjon: en selvforsterkende spiral.","ch":15},{"s":"Arbeidsledighetstrygd inngår i offentlig konsum G og teller dermed med i BNP.","answer":false,"why":"Overføringer skaper ingen verdi, de omfordeler bare penger, og er derfor ikke med i BNP. Offentlig konsum G (skoler, forsvar) er derimot med.","ch":2},{"s":"Ideer er ikke-rivaliserende: samme oppskrift kan brukes i mange fabrikker samtidig uten å brukes opp.","answer":true,"why":"Kjernen i Romer. Ikke-rivalisering gir økende skalautbytte fordi utviklingskostnaden fordeles på stadig flere enheter.","ch":9},{"s":"Badekarmodellen gir naturlig ledighetsrate u* = f/(f + s), der f er jobbfinnerate og s er separasjonsrate.","answer":false,"why":"Snudd: u* = s/(f + s). Med s = 1 % og f = 20 % gir riktig formel u* ≈ 4,8 %, mens f/(f+s) ville gitt ca. 95 %.","ch":11},{"s":"Nominelt BNP kan øke selv om det ikke produseres mer, fordi det blander pris og kvantum.","answer":true,"why":"Nominelt BNP bruker løpende priser og stiger ved ren prisstigning. Reelt BNP bruker faste priser og fanger bare kvantumsendringer.","ch":4},{"s":"Volcker-disinflasjonen viste at inflasjon kan senkes uten realøkonomiske kostnader, bare pengeveksten reduseres.","answer":false,"why":"Dikotomien holder ikke på kort sikt: innstrammingen ga høy realrente, stort negativt produksjonsgap og dyp resesjon før inflasjonen falt.","ch":16},{"s":"I Solow-modellen med befolkningsvekst gir høyere befolkningsvekst lavere BNP per innbygger i steady state.","answer":true,"why":"n̄ virker som ekstra avskrivning: investering må utstyre nye arbeidere med kapital («capital widening»), så k* og y* faller.","ch":8},{"s":"Renteøkninger virker svakere nedkjølende i en liten åpen økonomi enn i en lukket økonomi.","answer":false,"why":"Sterkere: i tillegg til IS-kanalen (investering) styrker renten kronen, så nettoeksporten faller. Valutakanalen er en ekstra dempende kanal.","ch":19},{"s":"Under adaptive forventninger gir et vedvarende positivt produksjonsgap stadig stigende inflasjon, ikke bare et høyt nivå.","answer":true,"why":"Δπₜ = v̄·Ỹₜ + ō: gapet driver ENDRINGEN i inflasjonen, fordi forventningene bygger på fjorårets inflasjon (πₑ = πₜ₋₁).","ch":16},{"s":"Inntektsforskjellene mellom rike og fattige land skyldes først og fremst forskjeller i kapital per innbygger.","answer":false,"why":"TFP-forskjeller er viktigst og forklarer 2/3 til 3/4 av forskjellene. I Solow blir TFP enda viktigere (eksponent 3/2, dobbel effekt).","ch":7},{"s":"Trilemmaet: et land kan ikke samtidig ha selvstendig pengepolitikk, fri kapitalflyt og fast valutakurs.","answer":true,"why":"Høyst to av tre er mulig. Norge velger egen pengepolitikk og fri kapitalflyt, og lar derfor kronen flyte.","ch":19},{"s":"Tilbakevendingen til likevekt etter et sjokk tar flere perioder fordi sentralbanken justerer renten gradvis.","answer":false,"why":"Driveren er ADAPTIVE forventninger (πₑ = πₜ₋₁): AS henger igjen og skifter bare gradvis ned. Med troverdige rasjonelle forventninger ville tilpasningen vært momentan.","ch":17},{"s":"Seignorage er en inflasjonsskatt som i praksis betales av dem som holder kontanter.","answer":true,"why":"Når staten finansierer utgifter ved å trykke penger, stiger prisnivået, og pengeholdernes beholdning taper realverdi.","ch":12},{"s":"En økning i den nominelle renten endrer ikke realrenten, fordi inflasjonen justerer seg umiddelbart.","answer":false,"why":"Inflasjonen er treg («sticky») på kort sikt, så R = iₜ − πₜ stiger når i settes opp. Nettopp derfor virker pengepolitikken.","ch":15},{"s":"I den kombinerte Solow-Romer-modellen vokser alle land med samme rate på lang sikt, men kan vokse ulikt på mellomlang sikt.","answer":true,"why":"Romer gir den felles BGP-veksten (γn̄); Solow-overgangsdynamikk forklarer ulike vekstrater underveis, som Sør-Korea langt under sin steady state.","ch":10},{"s":"Ved deflasjon er realrenten lavere enn den nominelle renten.","answer":false,"why":"R = i − π: negativ π LØFTER realrenten over den nominelle. Realgjelden vokser, og ved nullgrensen (ZLB) kan ikke sentralbanken kutte mer.","ch":18},{"s":"Med rasjonelle forventninger og en troverdig sentralbank kan inflasjonsmålet senkes uten nedgangskonjunktur.","answer":true,"why":"Aktørene setter forventet inflasjon lik det nye målet direkte: Δπ = Δπ̄ med ΔỸ = 0. Under adaptive forventninger (Volcker) kreves resesjon.","ch":18},{"s":"Under perfekt konkurranse med pris lik grensekostnad lønner det seg fortsatt å utvikle nye ideer.","answer":false,"why":"Nei: P = MC dekker aldri den faste utviklingskostnaden, så ingen ville forsket. Derfor trengs patenter, premier eller statlig finansiering.","ch":9},{"s":"BNP utelater husholdsproduksjon og fritid, men korrelerer likevel sterkt med levealder, HDI og livstilfredshet.","answer":true,"why":"BNP måler bare markedsaktivitet, men er en rimelig og internasjonalt sammenlignbar tilnærming til velferd.","ch":5},{"s":"En renteøkning i utlandet skifter norsk AD innover fordi kapital forlater Norge.","answer":false,"why":"Kapitalutgangen svekker kronen (εₜ↑), norsk eksport blir mer konkurransedyktig, nettoeksporten stiger og AD skifter UT (positivt sjokk).","ch":19},{"s":"Økt toll mot norske handelspartnere kan virke som et negativt AD-sjokk og et negativt AS-sjokk samtidig.","answer":true,"why":"Dual effekt: svakere eksportetterspørsel (ā↓, AD inn) og dyrere importerte innsatsvarer (ō↑, AS opp). Effekten på inflasjonen er uklar, produksjonen faller.","ch":19}],
  shift: [{"q":"Norges Bank hever realrenten Rₜ. Hva skjer i IS-diagrammet?","options":["IS skifter inn","IS skifter ut","Bevegelse langs IS","IS blir brattere"],"answer":2,"why":"Rₜ står på aksen i IS-diagrammet, så renteendring gir bevegelse langs kurven. Høyere Rₜ gjør lån dyrere, investeringene faller og Ỹ synker.","ch":14},{"q":"Regjeringen øker offentlige innkjøp (ā↑). Hva skjer med IS-kurven?","options":["Bevegelse langs IS","IS skifter ut","IS skifter inn","MP skifter opp"],"answer":1,"why":"ā står ikke på noen akse, så skift. Positivt etterspørselssjokk gir høyere Ỹ for enhver rente: IS skifter ut/høyre.","ch":14},{"q":"Boligkrakk og kredittskvis demper konsum og investering (ā↓). IS-kurven?","options":["IS skifter ut","Bevegelse langs IS","AS skifter opp","IS skifter inn"],"answer":3,"why":"ā er ikke på aksen: negativt etterspørselssjokk gir lavere Ỹ ved uendret rente, så hele IS skifter inn/venstre.","ch":14},{"q":"Eksportmarkedene styrker seg (āex↑). Hva skjer i IS-diagrammet?","options":["IS skifter inn","Bevegelse langs IS","IS skifter ut","MP skifter ned"],"answer":2,"why":"āex inngår i ā, som ikke står på aksen. Sterkere eksportetterspørsel er et positivt ā-sjokk: IS skifter ut.","ch":14},{"q":"Norges Bank hever styringsrenten iₜ mens inflasjonen er treg. IS-MP-diagrammet?","options":["MP skifter opp","MP skifter ned","Bevegelse langs MP","IS skifter inn"],"answer":0,"why":"Treg π gjør at Rₜ = iₜ − πₜ stiger. Sentralbanken velger nytt R-nivå: MP-linjen skifter opp, og vi får bevegelse langs IS til negativt gap.","ch":15},{"q":"Inflasjonen πₜ stiger og sentralbanken svarer via Taylor-regelen. Hva skjer i AD-diagrammet?","options":["AD skifter inn","AD skifter ut","Bevegelse langs AD","AS skifter ned"],"answer":2,"why":"πₜ står på aksen i AS-AD. Renteresponsen er bygget inn i AD-helningen: høyere π gir høyere R og lavere Ỹ, en bevegelse langs AD.","ch":17},{"q":"Sentralbanken senker inflasjonsmålet π̄ (som Norge i 2017). Hva skjer med AD?","options":["AD skifter ned/inn","AD skifter ut","Bevegelse langs AD","AS skifter opp"],"answer":0,"why":"π̄ inngår i AD-ligningen og står ikke på aksen. Lavere mål krever høyere rente ved gitt inflasjon, så AD skifter ned/inn.","ch":17},{"q":"Importprisene hopper (ō↑). Hva skjer med Phillips/AS-kurven?","options":["Bevegelse langs AS","AS skifter ned","AS skifter opp","AD skifter inn"],"answer":2,"why":"ō står ikke på aksen: kostnadssjokket løfter hele AS. Sentralbankens respons gir så bevegelse langs AD til stagflasjon (π↑, Ỹ↓).","ch":16},{"q":"Høykonjunktur presser produksjonsgapet opp (Ỹₜ > 0). Phillips-kurven?","options":["PC skifter opp","Bevegelse langs PC","PC skifter ned","PC blir brattere"],"answer":1,"why":"Ỹₜ står på aksen, så etterspørselsdrevet endring er bevegelse langs kurven. Kapasitetspress gir høyere inflasjon via leddet v̄·Ỹₜ.","ch":16},{"q":"Ny periode starter etter høy inflasjon i fjor (πₜ₋₁ høy, adaptive forventninger). AS-kurven?","options":["AS skifter opp","Bevegelse langs AS","AS skifter ned","AD skifter ut"],"answer":0,"why":"πₜ₋₁ inngår i AS-ligningen, ikke på aksen. Høyere forventet inflasjon bakes inn i prissettingen og løfter AS mellom periodene.","ch":16},{"q":"Etter prissjokket faller inflasjonen og forventningene πₜ₋₁ justeres ned periode for periode. Hva skjer med AS?","options":["Bevegelse langs AS","AS skifter gradvis ned","AD skifter ut","AS skifter opp"],"answer":1,"why":"πₜ₋₁ er skiftvariabel i AS. Adaptive forventninger oppdateres bakover, så AS skifter gradvis ned og økonomien går langs AD tilbake mot likevekt.","ch":17},{"q":"Risikopåslaget f̄ stiger under finansuro. Hva skjer i AS-AD-diagrammet?","options":["AD skifter inn","AD skifter ut","Bevegelse langs AD","AS skifter opp"],"answer":0,"why":"f̄ gir leddet −b̄f̄ i AD og står ikke på aksen. Lånerenten stiger selv med uendret styringsrente, som et negativt etterspørselssjokk: AD inn.","ch":18},{"q":"Oljeprisen faller kraftig og bedriftenes kostnader synker (ō < 0). AS-kurven?","options":["AS skifter opp","Bevegelse langs AS","AD skifter inn","AS skifter ned"],"answer":3,"why":"Negativt prissjokk: ō er skiftvariabel, ikke på aksen. AS skifter ned, og vi får lavere inflasjon og høyere produksjon langs AD.","ch":16},{"q":"Finanspolitisk ekspansjon i nedgangstid (ā↑). Hva skjer i AS-AD-diagrammet?","options":["AS skifter opp","Bevegelse langs AS","AD skifter ut","AD skifter inn"],"answer":2,"why":"ā inngår i AD, ikke på aksen: AD skifter ut. Deretter bevegelse langs AS til høyere Ỹ og π, siden AS bare skifter ved ō eller πₜ₋₁.","ch":17},{"q":"Positivt etterspørselssjokk (ā↑): hva skjer med AS-kurven i selve sjokkperioden?","options":["AS skifter opp","AS skifter ned","Ingen skift: bevegelse langs AS","AS blir flatere"],"answer":2,"why":"AS skifter bare ved ō eller πₜ₋₁, og begge er uendret i sjokkperioden. Ỹₜ står på aksen, så AD-skiftet gir bevegelse langs AS.","ch":17},{"q":"Utenlandsk realrente R^W stiger og kronen svekkes (εₜ↑). Norsk AD-kurve?","options":["AD skifter inn","Bevegelse langs AD","AS skifter opp","AD skifter ut"],"answer":3,"why":"Kapital trekkes ut, real depresiering gjør eksporten mer konkurransedyktig og NX stiger. Virker som positivt ā-sjokk: AD skifter ut.","ch":19},{"q":"Svakere vekst hos handelspartnerne reduserer eksportetterspørselen (ā_nx↓). Hva skjer med AD?","options":["Bevegelse langs AD","AD skifter ut","AS skifter ned","AD skifter inn"],"answer":3,"why":"ā_nx inngår i ā, som er skiftvariabel i AD. Lavere eksportetterspørsel er et negativt etterspørselssjokk: AD skifter inn.","ch":19},{"q":"Toll på importerte innsatsvarer øker bedriftenes kostnader. Hva skjer med AS?","options":["AD skifter inn","AS skifter opp","Bevegelse langs AS","AS skifter ned"],"answer":1,"why":"Kostnadssjokket er ō↑, en skiftvariabel: AS skifter opp. Tollens etterspørselsside (ā_nx↓) skifter i tillegg AD inn (dual effekt).","ch":19},{"q":"Sentralbanken blir mer aggressiv mot inflasjonsavvik (m̄↑). Hva skjer med AD?","options":["AD skifter ut","AD blir flatere (helningen endres)","Bevegelse langs AD","AS skifter opp"],"answer":1,"why":"m̄ inngår i helningen b̄m̄, ikke i konstantleddet. Sterkere renterespons gir større utslag i Ỹ per enhet inflasjonsavvik: flatere AD.","ch":17},{"q":"Langsiktig realrente r̄ (= MPK) faller. Hva skjer i IS-diagrammet?","options":["IS skifter inn","IS skifter ut","Bevegelse langs IS","IS blir flatere"],"answer":0,"why":"r̄ står ikke på aksen og er skiftvariabel. Lavere avkastning gjør færre prosjekter lønnsomme ved gitt Rₜ: Ỹ = ā − b̄(Rₜ − r̄) faller, IS inn.","ch":14},{"q":"Spareraten s̄ øker fra 15 til 40 % (Sør-Korea). Hva skjer i Solow-diagrammet?","options":["Bevegelse langs s̄y-kurven","s̄y-kurven roterer opp","d̄k-linjen blir brattere","y-kurven skifter ned"],"answer":1,"why":"s̄ er kurveparameter, ikke på aksen (k). Investeringskurven s̄y roterer opp og skjærer d̄k lenger ute: nytt høyere k* og y*, rask overgangsvekst.","ch":8},{"q":"Et jordskjelv ødelegger halve kapitalbeholdningen. Hva skjer i Solow-diagrammet?","options":["s̄y-kurven skifter ned","y-kurven skifter ned","Ingen kurver flytter: nytt punkt til venstre for k*","d̄k-linjen roterer ned"],"answer":2,"why":"k står på aksen og ingen parametre (s̄, A, d̄) endres: ingen skift. Økonomien havner under k* og vokser langs kurvene tilbake til samme steady state.","ch":8},{"q":"TFP faller (A↓) etter svekkede institusjoner. Hva skjer i Solow-diagrammet?","options":["Bevegelse langs kurvene","Bare s̄y-kurven skifter ned","Både y- og s̄y-kurven skifter ned","d̄k-linjen blir slakere"],"answer":2,"why":"A inngår i både y = Ak^α og s̄y, så begge kurver skifter ned: nytt lavere k* og y*. I motsetning til jordskjelv, som er bevegelse langs.","ch":8},{"q":"Befolkningsveksten n̄ øker. Hva skjer i Solow-diagrammet med befolkningsvekst?","options":["s̄y-kurven skifter opp","Bevegelse langs (n̄+d̄)k-linjen","y-kurven blir brattere","(n̄+d̄)k-linjen blir brattere"],"answer":3,"why":"n̄ virker som ekstra avskrivning: mer av investeringen går til å utstyre nye innbyggere med kapital. Brattere (n̄+d̄)k gir lavere k* og y*.","ch":8},{"q":"Negativt etterspørselssjokk har rammet, og sentralbanken kutter renten. IS-MP-diagrammet?","options":["MP skifter opp","Bevegelse langs MP","IS skifter ut","MP skifter ned"],"answer":3,"why":"Sentralbankens rentevalg flytter MP-linjen: kutt gir MP ned og bevegelse langs den innskiftede IS-kurven, som demper det negative gapet.","ch":15},{"q":"Et prissjokk (ō↑) treffer. Hva skjer med AD-kurven i samme periode?","options":["AD skifter inn","Ingen skift: bevegelse langs AD","AD skifter ut","AD blir brattere"],"answer":1,"why":"ō inngår ikke i AD. Sjokket skifter AS opp; når πₜ (på aksen) stiger, hever sentralbanken renten, en bevegelse langs AD til stagflasjonspunktet B.","ch":17}],
  chains: [{"title":"Rentekanalen i åpen økonomi","steps":["Norges Bank setter styringsrenten i høyere enn hos handelspartnerne","Kapital strømmer inn til Norge for å høste renteforskjellen","Kronen styrker seg: εₜ↓ (færre kroner per euro)","Trege priser gjør at også realvalutakursen appresierer","Norsk eksport blir dyrere ute og import billigere: NX faller","Valutakanalen demper etterspørselen i tillegg til IS-kanalen"],"why":"Viser at renteøkning i åpen økonomi virker via to kanaler: IS og valutakursen. UIP-mekanismen rente til krone til NX var eksplisitt tema i V25 3b.","ch":19},{"title":"Fra inflasjon over mål til lukket gap (MP og IS)","steps":["Inflasjonen ligger over målet: πₜ > π̄","Taylor-regelen Rₜ = m̄(πₜ − π̄) + r̄ tilsier realrente over r̄","Sentralbanken hever nominell rente i; treg inflasjon gir R↑","Bevegelse langs IS: dyrere å låne, investering og konsum faller","Produksjonsgapet blir negativt: Ỹ < 0","Via Phillips-kurven avtar prispresset og π faller mot målet"],"why":"Selve transmisjonsmekanismen bak renteanbefalingen i Oppgave 3: fra inflasjonsavvik via Taylor-regelen og IS til gap og disinflasjon.","ch":15},{"title":"Kostnadssjokk i AS-AD over flere perioder","steps":["Positivt prissjokk treffer: ō > 0 (f.eks. oljepris opp)","AS-kurven skifter opp med hele sjokket","Sentralbanken reagerer på høyere π: bevegelse langs AD til B","Stagflasjon i B: høyere inflasjon og lavere produksjon","Neste periode er ō = 0, men πₜ₋₁ er forhøyet og holder AS oppe","AS skifter gradvis ned når forventningene faller: tilbake til A"],"why":"Standardscenariet i Oppgave 3. Sensor krever stagflasjonspunktet B og at adaptive forventninger (πₜ₋₁) gjør tilbakevendingen gradvis over flere perioder.","ch":17},{"title":"Solow: konvergens mot steady state","steps":["Økonomien starter under steady state: k < k*","Investeringen overstiger avskrivningen: s̄y > d̄k","Nettoinvesteringen er positiv, så k vokser","Avtakende MPK gjør at investeringstilveksten flater ut","Avskrivningen d̄k vokser lineært og tar igjen investeringen","I k* er s̄y = d̄k: nettoinvestering null og veksten stopper"],"why":"Konvergensmekanismen er Solow-modellens kjerne og ble testet direkte V25. Formel uten mekanisme gir bare delvis uttelling.","ch":8},{"title":"Hvorfor høyere sparerate bare gir nivåeffekt","steps":["Spareraten øker: s̄y-kurven roterer opp i Solow-diagrammet","Ved gamle k* er nå s̄y > d̄k: nettoinvesteringen blir positiv","Kapitalen per innbygger vokser mot et nytt, høyere k*","Avtakende MPK: avskrivningen innhenter investeringen på nytt","I nytt steady state er y* høyere, men veksten er igjen null","Kun nivåeffekt: rask vekst i overgangen, ingen varig vekst"],"why":"Solows sentrale lærdom: kapitalakkumulasjon gir nivå, ikke varig vekst. Skillet mellom nivå og vekstrate er en klassisk felle i Oppgave 2.","ch":8},{"title":"Romer: fra ikke-rivalisering til vedvarende vekst","steps":["Ideer er ikke-rivaliserende: samme oppskrift kan brukes av alle","Utviklingskostnaden fordeles på stadig flere enheter","Å doble all innsats mer enn dobler produksjonen: økende skalautbytte","Kunnskapslageret er endogent og vokser: ΔAₜ₊₁ = z̄Lₐₜ","Forskerne vokser med befolkningen: Lₐₜ = ℓ̄Nₜ gir g*A = n̄","Vedvarende vekst per innbygger på BGP: g*y = γn̄"],"why":"Forklarer det Solow ikke kan: varig vekst. Kjeden fra ikke-rivalisering til g*y = γn̄ er det høyest belønnede enkelttemaet i Oppgave 2.","ch":9},{"title":"Badekarmodellen: utledningen av u*","steps":["Ledigheten endres med innstrøm minus utstrøm: ΔUₜ₊₁ = s·Eₜ − f·Uₜ","Steady state krever konstant vannstand: sett ΔUₜ₊₁ = 0","Da er innstrøm lik utstrøm: s·Eₜ = f·Uₜ","Sett inn Eₜ = L − Uₜ og løs: sL = (f + s)·U*","Del på L: u* = s/(f + s), uavhengig av arbeidsstyrken"],"why":"Utledningen av den naturlige ledighetsraten kan kreves vist (H25). Kjeden viser hvorfor bare s og f, ikke L, bestemmer u*.","ch":11},{"title":"Seignorage og hyperinflasjon (Sargent)","steps":["Store underskudd: ingen vil låne staten penger, skatteøkninger politisk umulige","Siste utvei i G = T + ΔB + ΔM er å trykke penger: ΔM↑","Kvantitetsteorien: π* = gM − gY, pengevekst blir inflasjon","Inflasjonsskatten uthuler realverdien for dem som holder kontanter","Samme realinntekt krever stadig mer trykking: inflasjonen akselererer","Hyperinflasjon har dermed finanspolitisk rot (Sargent)"],"why":"Kobler statens budsjettbetingelse til kvantitetsteorien og forklarer Sargents sitat: vedvarende høy inflasjon har finanspolitisk rot, motstykket til Friedman.","ch":12},{"title":"Finansiell friksjon, AD inn og nullgrensen (ZLB)","steps":["Finansuro: investorer krever risikopremie, f̄ stiger","Lånerenten R = R_ff + f̄ stiger selv om styringsrenten er uendret","Dyrere lån demper investering og konsum: AD skifter inn","Dyp nedgang med π < π̄: sentralbanken kutter renten mot null","Nullgrensen (ZLB): nominell rente kan ikke kuttes videre","Deflasjon løfter realrenten R = i − π og forsterker nedgangen"],"why":"Forklarer hvorfor lånerenten kan stige selv når styringsrenten kuttes, og hvorfor ZLB og deflasjon forsterker kriser. Kjernen i finanskrise-oppgaver.","ch":18},{"title":"Toll: dual effekt på AD og AS","steps":["Toll innføres mot norsk handel (f.eks. USA)","Svakere handelspartnere og verdikjeder: eksportetterspørselen faller","ā_nx faller: AD skifter inn","I tillegg: toll på innsatsvarer øker kostnadene, ō↑","AS skifter opp: kostnadsdrevet prispress","Produksjonen faller entydig, inflasjonseffekten er uklar"],"why":"V25 3c testet nettopp dette: ett sjokk treffer begge kurver. Vanligste feil er å behandle toll som enten AD eller AS, ikke begge.","ch":19},{"title":"Tidskonsistens og uavhengig sentralbank","steps":["Priser og lønninger for neste periode er allerede fastsatt","Sentralbanken fristes til ekspansiv politikk for å presse Ỹ opp","Aktørene forutser dette og bygger høyere inflasjon inn i kontrakter","Inflation bias: høyere inflasjon uten høyere produksjon","Binding til en pengepolitisk regel fjerner fristelsen","Uavhengig sentralbank med lovfestet mål gir troverdighet"],"why":"Kydland-Prescott begrunner hvorfor regler slår diskresjon og hvorfor sentralbanken er uavhengig. Testet i V24 3.3 om tillit og forventningsdannelse.","ch":18},{"title":"Okuns lov: fra produksjonsgap til ledighet","steps":["Et negativt sjokk gir faktisk BNP under potensielt: Ỹ < 0","Bedriftene produserer mindre og trenger færre ansatte","Ledigheten stiger over naturlig nivå: u − ū = −0,5·Ỹ > 0","Eksempel: Ỹ = −4 % gir syklisk ledighet på +2 prosentpoeng","Ledigheten normaliseres først når produksjonsgapet lukkes"],"why":"Okuns lov er broen fra produksjonsgapet til det vi bryr oss om: ledighet. Testet H25 2a; pass på fortegnet i koeffisienten −0,5.","ch":13}]
};
/* Opp eller ned (komparativ statikk), forfattet fra manualen. */
window.EDU_DATA.lyn.updown = [{"q":"Kostnadssjokk ō > 0 treffer økonomien. Hva skjer med produksjonsgapet Ỹ på kort sikt?","dir":"ned","why":"AS skifter opp; sentralbanken møter høyere inflasjon med høyere realrente (MP), og bevegelsen langs AD gir Ỹ < 0. Stagflasjon: π opp og produksjon ned.","ch":17},{"q":"Spareraten s̄ øker varig. Hva skjer med steady state-nivået y* i Solow-modellen?","dir":"opp","why":"s̄y-kurven roterer opp: investering overstiger avskrivning ved gammelt k*, kapitalen vokser til nytt høyere k*, og y* = A(k*)^α stiger.","ch":8},{"q":"Norges Bank hever renten over utlandets. Hva skjer med kronekursen εₜ (NOK per euro)?","dir":"ned","why":"UIP: høyere norsk rente trekker kapital inn og kronen styrkes. Da trengs færre kroner per euro, så εₜ faller (εₜ↓ = sterkere krone).","ch":19},{"q":"Separasjonsraten s øker, flere mister jobben per periode. Hva skjer med den naturlige ledigheten u*?","dir":"opp","why":"Badekaret: u* = s/(f+s). Større innstrøm til ledighet hever vannstanden, så den naturlige ledighetsraten stiger.","ch":11},{"q":"Et jordskjelv ødelegger halve kapitalbeholdningen K̄. Hva skjer med lønnen w* i produksjonsmodellen?","dir":"ned","why":"Hver arbeider har mindre kapital å jobbe med: MPL = (1−α)A(K/L)^α faller når K faller, og i likevekt er w = MPL.","ch":7},{"q":"Sentralbanken øker pengeveksten gM varig, mens gY er uendret. Hva skjer med langsiktig inflasjon π*?","dir":"opp","why":"Kvantitetsteorien: π* = gM − gY. På lang sikt slår høyere pengevekst én-til-én ut i inflasjonen (Friedman).","ch":12},{"q":"Fruktbarheten faller så befolkningsveksten n̄ synker varig. Hva skjer med vekstraten g*y i Romer-modellen?","dir":"ned","why":"g*y = γn̄: færre nye forskere over tid gir lavere kunnskapsvekst. Dette er en vekstrateeffekt, ikke en nivåeffekt.","ch":9},{"q":"Produksjonsgapet blir negativt, Ỹ = −4 %. Hva skjer med arbeidsledigheten u ifølge Okuns lov?","dir":"opp","why":"Okun: u − ū = −0,5·Ỹ. Med Ỹ = −4 % blir syklisk ledighet +2 prosentpoeng, så u stiger over sitt naturlige nivå ū.","ch":13},{"q":"Sentralbanken senker inflasjonsmålet π̄ under adaptive forventninger. Hva skjer med Ỹ på kort sikt?","dir":"ned","why":"AD skifter ned: lavere mål krever høyere realrente ved gitt inflasjon. Forventningene (πₜ₋₁) henger igjen, så gapet blir midlertidig negativt.","ch":17},{"q":"Et jordskjelv ødelegger halve kapitalbeholdningen K̄. Hva skjer med realrenten r* i produksjonsmodellen?","dir":"opp","why":"Kapital blir knapp: MPK = αA(L/K)^(1−α) stiger når K faller, og i likevekt er r = MPK.","ch":7},{"q":"Avskrivningsraten d̄ øker varig. Hva skjer med steady state-kapitalen k* i Solow?","dir":"ned","why":"d̄k-linjen blir brattere og krysser s̄y ved lavere kapital: k* = (s̄A/d̄)^(1/(1−α)) faller.","ch":8},{"q":"Oljeprisen hopper opp, et prissjokk ō > 0. Hva skjer med inflasjonen π i sjokkperioden?","dir":"opp","why":"Phillips: πₜ = πₜ₋₁ + v̄Ỹₜ + ō. Kostnadssjokket løfter AS direkte, så inflasjonen stiger selv om produksjonen faller.","ch":16},{"q":"Norges Bank hever styringsrenten. Hva skjer med nettoeksporten NX?","dir":"ned","why":"Høyere rente styrker kronen (real appresiering): norsk eksport blir dyrere ute og import billigere, så NX faller. Valutakanalen.","ch":19},{"q":"Krig ødelegger kapital slik at k faller under k*. Hva skjer med k i periodene etterpå?","dir":"opp","why":"Ingen kurver skifter: under k* er s̄y > d̄k, nettoinvesteringen er positiv, og kapitalen vokser tilbake mot samme k*.","ch":8},{"q":"Inflasjonen π stiger mens nominell rente i holdes uendret. Hva skjer med realrenten R?","dir":"ned","why":"Fisher: R = i − π. Høyere inflasjon spiser av den nominelle avkastningen, så kjøpekraftsavkastningen faller.","ch":12},{"q":"Myndighetene subsidierer forskning så forskerandelen ℓ̄ øker moderat. Hva skjer med BGP-nivået y*?","dir":"opp","why":"y* = C·(z̄ℓ̄Nₜ)^γ: flere forskere gir mer kunnskap og en høyere bane. Nivåeffekt; vekstraten er fortsatt γn̄.","ch":9},{"q":"Et boligkrakk gir negativt etterspørselssjokk, ā < 0. Hva skjer med produksjonsgapet Ỹ ved uendret rente?","dir":"ned","why":"IS skifter innover: lavere konsum- og investeringsetterspørsel gir Ỹ = ā − b̄(R − r̄) < 0 når renten holdes uendret.","ch":14},{"q":"Sentralbanken hever nominell rente i mens inflasjonen er treg. Hva skjer med realrenten R?","dir":"opp","why":"R = i − π: fordi π er treg på kort sikt, følger realrenten den nominelle opp. Derfor kan sentralbanken styre R på kort sikt.","ch":15},{"q":"Bedre matching i arbeidsmarkedet øker jobbfinneraten f. Hva skjer med den naturlige ledigheten u*?","dir":"ned","why":"u* = s/(f+s): raskere utstrøm fra ledighet tømmer badekaret fortere, så steady state-ledigheten faller.","ch":11},{"q":"Produktiviteten A øker i produksjonsmodellen. Hva skjer med lønnen w*?","dir":"opp","why":"Høyere A løfter marginalproduktet av arbeid: w* = (1−α)A(K̄/L̄)^α stiger, og i likevekt er w = MPL.","ch":7},{"q":"Finansuro øker risikopremien f̄. Hva skjer med produksjonsgapet Ỹ?","dir":"ned","why":"Lånerenten R = R_ff + f̄ stiger selv med uendret styringsrente: AD skifter innover (leddet −b̄f̄), som et negativt etterspørselssjokk.","ch":17},{"q":"Utenlandsk realrente R^W øker mens norsk rente er uendret. Hva skjer med norsk produksjonsgap Ỹ?","dir":"opp","why":"Kronen depresierer (εₜ↑), norsk eksport blir mer konkurransedyktig, NX øker og AD skifter ut: positivt etterspørselssjokk.","ch":19},{"q":"Befolkningsveksten n̄ øker varig i Solow-modellen. Hva skjer med y* per innbygger?","dir":"ned","why":"Mer investering går med til å utstyre nye arbeidere (capital widening): k* = (s̄A/(n̄+d̄))^(1/(1−α)) faller, og y* faller.","ch":8},{"q":"Finanspolitisk ekspansjon gir positivt etterspørselssjokk ā > 0. Hva skjer med inflasjonen π?","dir":"opp","why":"AD skifter ut og økonomien beveger seg langs AS: kapasitetspresset øker, så både Ỹ og π stiger (v̄Ỹ-leddet).","ch":17},{"q":"Høykonjunktur gir positivt produksjonsgap, Ỹ > 0. Hva skjer med arbeidsledigheten u?","dir":"ned","why":"Okuns lov: u − ū = −0,5·Ỹ. Positivt gap gir negativ syklisk ledighet, så u faller under den naturlige raten ū.","ch":13},{"q":"Arbeidsstyrken L̄ øker varig (innvandring). Hva skjer med realrenten r* i produksjonsmodellen?","dir":"opp","why":"Flere arbeidere per kapitalenhet hever kapitalens marginalprodukt: r = αA(L/K)^(1−α) stiger når L øker.","ch":7},{"q":"Forskerproduktiviteten z̄ faller varig. Hva skjer med BGP-nivået y* i Romer-modellen?","dir":"ned","why":"z̄ inngår i nivået y* = C·(z̄ℓ̄Nₜ)^γ, så banen forskyves ned. Vekstraten γn̄ er uendret: en ren nivåeffekt.","ch":9},{"q":"Utenlandske sentralbanker hever renten mens norsk rente er uendret. Hva skjer med kronekursen εₜ?","dir":"opp","why":"Kapital strømmer ut mot høyere avkastning ute, kronen svekkes, og εₜ stiger (flere kroner per euro). εₜ↑ = svakere krone.","ch":19},{"q":"Inflasjonen er over målet, og sentralbanken øker reaksjonsparameteren m̄. Hva skjer med Ỹ?","dir":"ned","why":"MP: R = m̄(π − π̄) + r̄. Med π > π̄ gir større m̄ høyere realrente; via IS faller investering og konsum, og gapet trekkes ned.","ch":15},{"q":"TFP-nivået A øker varig. Hva skjer med steady state-konsumet c* i Solow?","dir":"opp","why":"A virker dobbelt: direkte på y og indirekte via høyere k*. y* stiger, og med uendret s̄ stiger c* = (1−s̄)y*.","ch":8}];

/* ---------- hoderegning: eksamensmatte uten kalkulator ----------
   Flyttet hit fra motoren 2026-08-19. Motoren blander alternativene ved kjøring,
   så rekkefølgen under er uten betydning. */
window.EDU_DATA.lyn.hode = [
  {
    "q": "Økonomien vokser 1 % i året. Omtrent hvor lang er doblingstiden?",
    "correct": "70 år",
    "distractors": [
      "35 år",
      "85 år",
      "105 år"
    ],
    "why": "Regelen om 70: 70/1 = 70 år."
  },
  {
    "q": "Økonomien vokser 2 % i året. Omtrent hvor lang er doblingstiden?",
    "correct": "35 år",
    "distractors": [
      "140 år",
      "18 år",
      "50 år"
    ],
    "why": "Regelen om 70: 70/2 = 35 år."
  },
  {
    "q": "Økonomien vokser 5 % i året. Omtrent hvor lang er doblingstiden?",
    "correct": "14 år",
    "distractors": [
      "350 år",
      "7 år",
      "29 år"
    ],
    "why": "Regelen om 70: 70/5 = 14 år."
  },
  {
    "q": "Økonomien vokser 7 % i året. Omtrent hvor lang er doblingstiden?",
    "correct": "10 år",
    "distractors": [
      "490 år",
      "5 år",
      "25 år"
    ],
    "why": "Regelen om 70: 70/7 = 10 år."
  },
  {
    "q": "Produksjonsgapet er +4 %. Hva sier Okuns lov (koeff. 0,5) om ledigheten?",
    "correct": "2 pp under ū",
    "distractors": [
      "2 pp over ū",
      "4 pp under ū",
      "Uendret ledighet"
    ],
    "why": "u − ū = −0,5·(4) = -2 prosentpoeng."
  },
  {
    "q": "Produksjonsgapet er -4 %. Hva sier Okuns lov (koeff. 0,5) om ledigheten?",
    "correct": "2 pp over ū",
    "distractors": [
      "2 pp under ū",
      "4 pp over ū",
      "Uendret ledighet"
    ],
    "why": "u − ū = −0,5·(-4) = +2 prosentpoeng."
  },
  {
    "q": "Produksjonsgapet er +6 %. Hva sier Okuns lov (koeff. 0,5) om ledigheten?",
    "correct": "3 pp under ū",
    "distractors": [
      "3 pp over ū",
      "6 pp under ū",
      "Uendret ledighet"
    ],
    "why": "u − ū = −0,5·(6) = -3 prosentpoeng."
  },
  {
    "q": "Produksjonsgapet er -2 %. Hva sier Okuns lov (koeff. 0,5) om ledigheten?",
    "correct": "1 pp over ū",
    "distractors": [
      "1 pp under ū",
      "2 pp over ū",
      "Uendret ledighet"
    ],
    "why": "u − ū = −0,5·(-2) = +1 prosentpoeng."
  },
  {
    "q": "Badekarmodellen: s = 2 %, f = 18 %. Hva er naturlig ledighet u*?",
    "correct": "10 %",
    "distractors": [
      "90 %",
      "2 %",
      "20 %"
    ],
    "why": "u* = s/(f+s) = 2/20 = 10 %."
  },
  {
    "q": "Badekarmodellen: s = 1 %, f = 19 %. Hva er naturlig ledighet u*?",
    "correct": "5 %",
    "distractors": [
      "95 %",
      "1 %",
      "10 %"
    ],
    "why": "u* = s/(f+s) = 1/20 = 5 %."
  },
  {
    "q": "Badekarmodellen: s = 2 %, f = 8 %. Hva er naturlig ledighet u*?",
    "correct": "20 %",
    "distractors": [
      "80 %",
      "2 %",
      "40 %"
    ],
    "why": "u* = s/(f+s) = 2/10 = 20 %."
  },
  {
    "q": "Badekarmodellen: s = 3 %, f = 17 %. Hva er naturlig ledighet u*?",
    "correct": "15 %",
    "distractors": [
      "85 %",
      "3 %",
      "30 %"
    ],
    "why": "u* = s/(f+s) = 3/20 = 15 %."
  },
  {
    "q": "Pengeveksten er 7 %, produksjonsveksten 2 %. Hva blir langsiktig inflasjon π*?",
    "correct": "5 %",
    "distractors": [
      "9 %",
      "-5 %",
      "7 %"
    ],
    "why": "π* = g_M − g_Y = 7 − 2 = 5 %."
  },
  {
    "q": "Pengeveksten er 9 %, produksjonsveksten 3 %. Hva blir langsiktig inflasjon π*?",
    "correct": "6 %",
    "distractors": [
      "12 %",
      "-6 %",
      "9 %"
    ],
    "why": "π* = g_M − g_Y = 9 − 3 = 6 %."
  },
  {
    "q": "Pengeveksten er 5 %, produksjonsveksten 2 %. Hva blir langsiktig inflasjon π*?",
    "correct": "3 %",
    "distractors": [
      "7 %",
      "-3 %",
      "5 %"
    ],
    "why": "π* = g_M − g_Y = 5 − 2 = 3 %."
  },
  {
    "q": "Pengeveksten er 10 %, produksjonsveksten 3 %. Hva blir langsiktig inflasjon π*?",
    "correct": "7 %",
    "distractors": [
      "13 %",
      "-7 %",
      "10 %"
    ],
    "why": "π* = g_M − g_Y = 10 − 3 = 7 %."
  },
  {
    "q": "Nominell rente i = 5 %, inflasjon π = 2 %. Hva er realrenten R?",
    "correct": "3 %",
    "distractors": [
      "7 %",
      "-3 %",
      "5 %"
    ],
    "why": "Fisher: R = i − π = 5 − 2 = 3 %."
  },
  {
    "q": "Nominell rente i = 4 %, inflasjon π = 3 %. Hva er realrenten R?",
    "correct": "1 %",
    "distractors": [
      "7 %",
      "-1 %",
      "4 %"
    ],
    "why": "Fisher: R = i − π = 4 − 3 = 1 %."
  },
  {
    "q": "Nominell rente i = 6 %, inflasjon π = 2 %. Hva er realrenten R?",
    "correct": "4 %",
    "distractors": [
      "8 %",
      "-4 %",
      "6 %"
    ],
    "why": "Fisher: R = i − π = 6 − 2 = 4 %."
  },
  {
    "q": "Nominell rente i = 3 %, inflasjon π = 4 %. Hva er realrenten R?",
    "correct": "-1 %",
    "distractors": [
      "7 %",
      "1 %",
      "3 %"
    ],
    "why": "Fisher: R = i − π = 3 − 4 = -1 %."
  },
  {
    "q": "Nominelt BNP = 1200, reelt BNP = 1000. Hva er BNP-deflatoren?",
    "correct": "120",
    "distractors": [
      "100",
      "130",
      "110"
    ],
    "why": "Deflator = (nominelt/reelt)·100 = 1200/1000·100 = 120."
  },
  {
    "q": "Nominelt BNP = 660, reelt BNP = 600. Hva er BNP-deflatoren?",
    "correct": "110",
    "distractors": [
      "100",
      "120",
      "165"
    ],
    "why": "Deflator = (nominelt/reelt)·100 = 660/600·100 = 110."
  },
  {
    "q": "Nominelt BNP = 520, reelt BNP = 400. Hva er BNP-deflatoren?",
    "correct": "130",
    "distractors": [
      "100",
      "140",
      "120"
    ],
    "why": "Deflator = (nominelt/reelt)·100 = 520/400·100 = 130."
  },
  {
    "q": "g_Y = 4 %, g_K = 3 %, g_L = 0 %, α = 1/3. Hva er TFP-veksten g_A?",
    "correct": "3 %",
    "distractors": [
      "1 %",
      "4 %",
      "5 %"
    ],
    "why": "g_A = 4 − (1/3)·3 − (2/3)·0 = 3 % (Solow-residualen)."
  },
  {
    "q": "g_Y = 5 %, g_K = 3 %, g_L = 3 %, α = 1/3. Hva er TFP-veksten g_A?",
    "correct": "2 %",
    "distractors": [
      "5 %",
      "3 %",
      "1 %"
    ],
    "why": "g_A = 5 − (1/3)·3 − (2/3)·3 = 2 % (Solow-residualen)."
  },
  {
    "q": "g_Y = 6 %, g_K = 6 %, g_L = 3 %, α = 1/3. Hva er TFP-veksten g_A?",
    "correct": "2 %",
    "distractors": [
      "0 %",
      "3 %",
      "6 %"
    ],
    "why": "g_A = 6 − (1/3)·6 − (2/3)·3 = 2 % (Solow-residualen)."
  },
  {
    "q": "g_Y = 3 %, g_K = 3 %, g_L = 3 %, α = 1/3. Hva er TFP-veksten g_A?",
    "correct": "0 %",
    "distractors": [
      "3 %",
      "1 %",
      "-1 %"
    ],
    "why": "g_A = 3 − (1/3)·3 − (2/3)·3 = 0 % (Solow-residualen)."
  },
  {
    "q": "C=600, I=200, G=150, eksport=120, import=90. Hva er BNP fra utgiftssiden?",
    "correct": "980",
    "distractors": [
      "1070",
      "950",
      "890"
    ],
    "why": "Y = C+I+G+(X−M) = 600+200+150+(120−90) = 980."
  },
  {
    "q": "C=500, I=250, G=100, eksport=80, import=60. Hva er BNP fra utgiftssiden?",
    "correct": "870",
    "distractors": [
      "930",
      "850",
      "810"
    ],
    "why": "Y = C+I+G+(X−M) = 500+250+100+(80−60) = 870."
  },
  {
    "q": "C=700, I=150, G=200, eksport=90, import=70. Hva er BNP fra utgiftssiden?",
    "correct": "1070",
    "distractors": [
      "1140",
      "1050",
      "1000"
    ],
    "why": "Y = C+I+G+(X−M) = 700+150+200+(90−70) = 1070."
  }
];
