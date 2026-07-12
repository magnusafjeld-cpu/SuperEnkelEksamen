/* ===================== LYNLÆRING — mobil-først minispill =====================
   Kort, variert eksamenstrening (2-5 min): lynquiz, sant/usant, formel-lyn,
   par-sprint, skift eller glid, mekanisme-kjeder og dagens bit. XP, nivåer og
   streak. Alt innhold kommer fra eksamensmanualen og oppgavepoolene. */
window.SAM3 = window.SAM3 || {};
window.SAM3_DATA = window.SAM3_DATA || {};

/* Innhold forfattet fra manualen (sant/usant, skift/glid, kjeder). */
window.SAM3_DATA.lyn = {
  tf: [{"s":"BNP kan beregnes fra produksjonssiden, inntektssiden og utgiftssiden, og alle tre gir samme verdi.","answer":true,"why":"Produksjon = Inntekt = Utgifter er nasjonalregnskapets fundamentale identitet: hver krone produsert er en krone tjent og en krone brukt.","ch":2},{"s":"I Solow-modellen gir en varig høyere sparerate varig høyere vekstrate i BNP per innbygger.","answer":false,"why":"Nei: s̄ opp gir en NIVÅeffekt (høyere k* og y*) med rask vekst kun i overgangen. I steady state er veksten null; Solow gir ingen langsiktig vekst.","ch":8},{"s":"Realrenten finner vi ved å legge inflasjonen til den nominelle renten: R = i + π.","answer":false,"why":"Fortegnsfeil: Fisher-ligningen er R = i − π. Inflasjonen spiser av den nominelle avkastningen, den legges ikke til.","ch":12},{"s":"Etter Okuns lov gir et produksjonsgap på −4 % en ledighet omtrent 2 prosentpoeng over naturlig nivå.","answer":true,"why":"u − ū = −0,5·Ỹ = −0,5·(−4 %) = +2 prosentpoeng. Negativt gap betyr ledighet over det naturlige nivået ū.","ch":13},{"s":"Når valutakursen εₜ (kroner per euro) stiger, betyr det at kronen styrker seg.","answer":false,"why":"Motsatt: εₜ↑ betyr flere kroner per euro, altså SVAKERE krone (depresiering). εₜ↓ = sterkere krone (appresiering).","ch":19},{"s":"Med Cobb-Douglas og perfekt konkurranse går andelen 1−α av inntekten til arbeid, uansett hvor mye kapital og arbeid som finnes.","answer":true,"why":"w*L̄/Y* = 1−α og r*K̄/Y* = α. Derfor er lønnsandelen stabil rundt 2/3, og vi setter kapitalandelen α = 1/3.","ch":7},{"s":"BNP fra produksjonssiden finner vi ved å summere all omsetning (salg) i alle bedrifter.","answer":false,"why":"Det ville telt mellomprodukter flere ganger. Riktig mål er verdiskaping: salg minus innkjøp av mellomprodukter, summert over bedriftene.","ch":2},{"s":"I Romer-modellen senker fallende befolkningsvekst den langsiktige vekstraten i BNP per innbygger.","answer":true,"why":"Hovedresultatet er g*_y = γ·n̄: lavere n̄ gir entydig lavere langsiktig vekst. Dette er en vekstrateeffekt, ikke en nivåeffekt.","ch":9},{"s":"En renteheving fra sentralbanken skifter IS-kurven innover mot venstre.","answer":false,"why":"Renten står på aksen: endringer i Rₜ er bevegelser LANGS IS. Kurven skifter bare ved etterspørselssjokk (ā) eller endring i r̄.","ch":14},{"s":"Når en arbeidsledig gir opp jobbsøkingen og begynner å studere, faller ledighetsraten uten at noen har fått jobb.","answer":true,"why":"Personen går fra U til utenfor arbeidsstyrken (O), så U/L faller («discouraged worker»). Sysselsettingsraten E/N er uendret.","ch":11},{"s":"BNI finner vi ved å trekke netto inntektsstrømmer fra utlandet fra BNP.","answer":false,"why":"Feil retning: BNI = BNP + F, der F er netto inntekt og overføringer FRA utlandet. BNI er det landet har til disposisjon.","ch":3},{"s":"Et positivt prissjokk (ō > 0) gir stagflasjon: høyere inflasjon og lavere produksjon samtidig.","answer":true,"why":"AS skifter opp; sentralbanken svarer med høyere realrente, og økonomien beveger seg langs AD til et punkt med π opp og Ỹ ned.","ch":17},{"s":"I Romer-modellen gir en varig økning i forskerandelen ℓ̄ varig høyere vekstrate i BNP per innbygger.","answer":false,"why":"ℓ̄ gir en NIVÅeffekt: BGP-banen løftes parallelt, men langsiktig vekstrate er fortsatt g*_y = γn̄. Kun n̄ og γ endrer vekstraten.","ch":9},{"s":"En økonomi som vokser med 2 % i året, bruker omtrent 35 år på å doble BNP per innbygger.","answer":true,"why":"Regelen om 70: doblingstid ≈ 70/g = 70/2 = 35 år. Doblingstiden avhenger kun av vekstraten, ikke av startnivået.","ch":6},{"s":"Arbeidsledighetsraten beregnes som antall ledige delt på befolkningen i arbeidsfør alder.","answer":false,"why":"Feil nevner: u = U/L, ledige delt på ARBEIDSSTYRKEN (E + U). Sysselsettingsrate og yrkesdeltakelse måles mot befolkningen N.","ch":11},{"s":"Ifølge kvantitetsteorien slår høyere pengevekst på lang sikt én-til-én ut i inflasjonen: π* = g_M − g_Y.","answer":true,"why":"Med konstant omløpshastighet (gV = 0) og Y bestemt av reelle faktorer gir M·V = P·Y at inflasjonen følger pengeveksten.","ch":12},{"s":"Et jordskjelv som ødelegger kapital, skifter kurvene i Solow-diagrammet ned mot en ny og lavere steady state.","answer":false,"why":"Ingen kurver flytter seg: økonomien hopper til et punkt under k* på samme kurver og vokser tilbake til SAMME steady state. Kurveskift krever f.eks. et TFP-fall.","ch":8},{"s":"Setter Norges Bank renten høyere enn utlandet, strømmer kapital inn og kronen styrker seg (εₜ faller).","answer":true,"why":"UIP: renteforskjellen gir kapitalinngang og appresiering. Forventet fremtidig depresiering (εₜ₊₁↑) utligner avkastningen.","ch":19},{"s":"Et oljeprissjokk gir en bevegelse langs Phillips-kurven.","answer":false,"why":"Nei: et prissjokk (ō > 0) SKIFTER hele Phillips-kurven opp. Bevegelse langs kurven skjer bare når produksjonsgapet Ỹ endres.","ch":16},{"s":"Et land som sparer mer enn det investerer hjemme, har driftsbalanseoverskudd og bygger opp fordringer på utlandet.","answer":true,"why":"S = I + CA: sparing som ikke investeres hjemme, lånes ut til utlandet. Norges situasjon: oljeinntektene spares i Oljefondet.","ch":3},{"s":"Pengenøytralitet betyr at endringer i pengemengden ikke har reelle effekter, verken på kort eller lang sikt.","answer":false,"why":"Nøytralitet gjelder KUN lang sikt. På kort sikt er prisene trege, så penger har reelle effekter. Det er hele grunnlaget for kortsiktsmodellen.","ch":12},{"s":"Jo lenger under sin steady state en økonomi befinner seg, desto raskere vokser den.","answer":true,"why":"Prinsippet om overgangsdynamikk: langt under k* er investeringen s̄y mye større enn avskrivningen d̄k. Veksten avtar mot k*.","ch":8},{"s":"Et positivt etterspørselssjokk (ā > 0) skifter både AD-kurven og AS-kurven i sjokkperioden.","answer":false,"why":"ā↑ skifter kun AD; økonomien beveger seg LANGS AS. AS skifter bare ved prissjokk ō eller når πₜ₋₁ oppdateres mellom perioder.","ch":17},{"s":"Et forbud mot oppsigelser har tvetydig effekt på naturlig ledighet, fordi både separasjonsraten s og jobbfinnerraten f faller.","answer":true,"why":"Lavere s trekker u* = s/(f+s) ned, men bedrifter blir mer forsiktige med å ansette, så f faller også. Nettoeffekten kan bli høyere ledighet.","ch":11},{"s":"Hvis et jordskjelv ødelegger halve kapitalbeholdningen, faller både realrenten r og lønnen w.","answer":false,"why":"Feil: kapital blir knapp, så MPK og dermed r STIGER. Hver arbeider har mindre kapital å jobbe med, så MPL og w faller.","ch":7},{"s":"Taylor-prinsippet krever m̄ > 0: realrenten må heves når inflasjonen stiger, ellers blir inflasjonen ustabil.","answer":true,"why":"Med m̄ ≤ 0 gir høyere inflasjon lavere realrente, mer etterspørsel og enda høyere inflasjon: en selvforsterkende spiral.","ch":15},{"s":"Arbeidsledighetstrygd inngår i offentlig konsum G og teller dermed med i BNP.","answer":false,"why":"Overføringer skaper ingen verdi, de omfordeler bare penger, og er derfor ikke med i BNP. Offentlig konsum G (skoler, forsvar) er derimot med.","ch":2},{"s":"Ideer er ikke-rivaliserende: samme oppskrift kan brukes i mange fabrikker samtidig uten å brukes opp.","answer":true,"why":"Kjernen i Romer. Ikke-rivalisering gir økende skalautbytte fordi utviklingskostnaden fordeles på stadig flere enheter.","ch":9},{"s":"Badekarmodellen gir naturlig ledighetsrate u* = f/(f + s), der f er jobbfinnerate og s er separasjonsrate.","answer":false,"why":"Snudd: u* = s/(f + s). Med s = 1 % og f = 20 % gir riktig formel u* ≈ 4,8 %, mens f/(f+s) ville gitt ca. 95 %.","ch":11},{"s":"Nominelt BNP kan øke selv om det ikke produseres mer, fordi det blander pris og kvantum.","answer":true,"why":"Nominelt BNP bruker løpende priser og stiger ved ren prisstigning. Reelt BNP bruker faste priser og fanger bare kvantumsendringer.","ch":4},{"s":"Volcker-disinflasjonen viste at inflasjon kan senkes uten realøkonomiske kostnader, bare pengeveksten reduseres.","answer":false,"why":"Dikotomien holder ikke på kort sikt: innstrammingen ga høy realrente, stort negativt produksjonsgap og dyp resesjon før inflasjonen falt.","ch":16},{"s":"I Solow-modellen med befolkningsvekst gir høyere befolkningsvekst lavere BNP per innbygger i steady state.","answer":true,"why":"n̄ virker som ekstra avskrivning: investering må utstyre nye arbeidere med kapital («capital widening»), så k* og y* faller.","ch":8},{"s":"Renteøkninger virker svakere nedkjølende i en liten åpen økonomi enn i en lukket økonomi.","answer":false,"why":"Sterkere: i tillegg til IS-kanalen (investering) styrker renten kronen, så nettoeksporten faller. Valutakanalen er en ekstra dempende kanal.","ch":19},{"s":"Under adaptive forventninger gir et vedvarende positivt produksjonsgap stadig stigende inflasjon, ikke bare et høyt nivå.","answer":true,"why":"Δπₜ = v̄·Ỹₜ + ō: gapet driver ENDRINGEN i inflasjonen, fordi forventningene bygger på fjorårets inflasjon (πₑ = πₜ₋₁).","ch":16},{"s":"Inntektsforskjellene mellom rike og fattige land skyldes først og fremst forskjeller i kapital per innbygger.","answer":false,"why":"TFP-forskjeller er viktigst og forklarer 2/3 til 3/4 av forskjellene. I Solow blir TFP enda viktigere (eksponent 3/2, dobbel effekt).","ch":7},{"s":"Trilemmaet: et land kan ikke samtidig ha selvstendig pengepolitikk, fri kapitalflyt og fast valutakurs.","answer":true,"why":"Høyst to av tre er mulig. Norge velger egen pengepolitikk og fri kapitalflyt, og lar derfor kronen flyte.","ch":19},{"s":"Tilbakevendingen til likevekt etter et sjokk tar flere perioder fordi sentralbanken justerer renten gradvis.","answer":false,"why":"Driveren er ADAPTIVE forventninger (πₑ = πₜ₋₁): AS henger igjen og skifter bare gradvis ned. Med troverdige rasjonelle forventninger ville tilpasningen vært momentan.","ch":17},{"s":"Seignorage er en inflasjonsskatt som i praksis betales av dem som holder kontanter.","answer":true,"why":"Når staten finansierer utgifter ved å trykke penger, stiger prisnivået, og pengeholdernes beholdning taper realverdi.","ch":12},{"s":"En økning i den nominelle renten endrer ikke realrenten, fordi inflasjonen justerer seg umiddelbart.","answer":false,"why":"Inflasjonen er treg («sticky») på kort sikt, så R = iₜ − πₜ stiger når i settes opp. Nettopp derfor virker pengepolitikken.","ch":15},{"s":"I den kombinerte Solow-Romer-modellen vokser alle land med samme rate på lang sikt, men kan vokse ulikt på mellomlang sikt.","answer":true,"why":"Romer gir den felles BGP-veksten (γn̄); Solow-overgangsdynamikk forklarer ulike vekstrater underveis, som Sør-Korea langt under sin steady state.","ch":10},{"s":"Ved deflasjon er realrenten lavere enn den nominelle renten.","answer":false,"why":"R = i − π: negativ π LØFTER realrenten over den nominelle. Realgjelden vokser, og ved nullgrensen (ZLB) kan ikke sentralbanken kutte mer.","ch":18},{"s":"Med rasjonelle forventninger og en troverdig sentralbank kan inflasjonsmålet senkes uten nedgangskonjunktur.","answer":true,"why":"Aktørene setter forventet inflasjon lik det nye målet direkte: Δπ = Δπ̄ med ΔỸ = 0. Under adaptive forventninger (Volcker) kreves resesjon.","ch":18},{"s":"Under perfekt konkurranse med pris lik grensekostnad lønner det seg fortsatt å utvikle nye ideer.","answer":false,"why":"Nei: P = MC dekker aldri den faste utviklingskostnaden, så ingen ville forsket. Derfor trengs patenter, premier eller statlig finansiering.","ch":9},{"s":"BNP utelater husholdsproduksjon og fritid, men korrelerer likevel sterkt med levealder, HDI og livstilfredshet.","answer":true,"why":"BNP måler bare markedsaktivitet, men er en rimelig og internasjonalt sammenlignbar tilnærming til velferd.","ch":5},{"s":"En renteøkning i utlandet skifter norsk AD innover fordi kapital forlater Norge.","answer":false,"why":"Kapitalutgangen svekker kronen (εₜ↑), norsk eksport blir mer konkurransedyktig, nettoeksporten stiger og AD skifter UT (positivt sjokk).","ch":19},{"s":"Økt toll mot norske handelspartnere kan virke som et negativt AD-sjokk og et negativt AS-sjokk samtidig.","answer":true,"why":"Dual effekt: svakere eksportetterspørsel (ā↓, AD inn) og dyrere importerte innsatsvarer (ō↑, AS opp). Effekten på inflasjonen er uklar, produksjonen faller.","ch":19}],
  shift: [{"q":"Norges Bank hever realrenten Rₜ. Hva skjer i IS-diagrammet?","options":["IS skifter inn","IS skifter ut","Bevegelse langs IS","IS blir brattere"],"answer":2,"why":"Rₜ står på aksen i IS-diagrammet, så renteendring gir bevegelse langs kurven. Høyere Rₜ gjør lån dyrere, investeringene faller og Ỹ synker.","ch":14},{"q":"Regjeringen øker offentlige innkjøp (ā↑). Hva skjer med IS-kurven?","options":["Bevegelse langs IS","IS skifter ut","IS skifter inn","MP skifter opp"],"answer":1,"why":"ā står ikke på noen akse, så skift. Positivt etterspørselssjokk gir høyere Ỹ for enhver rente: IS skifter ut/høyre.","ch":14},{"q":"Boligkrakk og kredittskvis demper konsum og investering (ā↓). IS-kurven?","options":["IS skifter ut","Bevegelse langs IS","AS skifter opp","IS skifter inn"],"answer":3,"why":"ā er ikke på aksen: negativt etterspørselssjokk gir lavere Ỹ ved uendret rente, så hele IS skifter inn/venstre.","ch":14},{"q":"Eksportmarkedene styrker seg (āex↑). Hva skjer i IS-diagrammet?","options":["IS skifter inn","Bevegelse langs IS","IS skifter ut","MP skifter ned"],"answer":2,"why":"āex inngår i ā, som ikke står på aksen. Sterkere eksportetterspørsel er et positivt ā-sjokk: IS skifter ut.","ch":14},{"q":"Norges Bank hever styringsrenten iₜ mens inflasjonen er treg. IS-MP-diagrammet?","options":["MP skifter opp","MP skifter ned","Bevegelse langs MP","IS skifter inn"],"answer":0,"why":"Treg π gjør at Rₜ = iₜ − πₜ stiger. Sentralbanken velger nytt R-nivå: MP-linjen skifter opp, og vi får bevegelse langs IS til negativt gap.","ch":15},{"q":"Inflasjonen πₜ stiger og sentralbanken svarer via Taylor-regelen. Hva skjer i AD-diagrammet?","options":["AD skifter inn","AD skifter ut","Bevegelse langs AD","AS skifter ned"],"answer":2,"why":"πₜ står på aksen i AS-AD. Renteresponsen er bygget inn i AD-helningen: høyere π gir høyere R og lavere Ỹ, en bevegelse langs AD.","ch":17},{"q":"Sentralbanken senker inflasjonsmålet π̄ (som Norge i 2017). Hva skjer med AD?","options":["AD skifter ned/inn","AD skifter ut","Bevegelse langs AD","AS skifter opp"],"answer":0,"why":"π̄ inngår i AD-ligningen og står ikke på aksen. Lavere mål krever høyere rente ved gitt inflasjon, så AD skifter ned/inn.","ch":17},{"q":"Importprisene hopper (ō↑). Hva skjer med Phillips/AS-kurven?","options":["Bevegelse langs AS","AS skifter ned","AS skifter opp","AD skifter inn"],"answer":2,"why":"ō står ikke på aksen: kostnadssjokket løfter hele AS. Sentralbankens respons gir så bevegelse langs AD til stagflasjon (π↑, Ỹ↓).","ch":16},{"q":"Høykonjunktur presser produksjonsgapet opp (Ỹₜ > 0). Phillips-kurven?","options":["PC skifter opp","Bevegelse langs PC","PC skifter ned","PC blir brattere"],"answer":1,"why":"Ỹₜ står på aksen, så etterspørselsdrevet endring er bevegelse langs kurven. Kapasitetspress gir høyere inflasjon via leddet v̄·Ỹₜ.","ch":16},{"q":"Ny periode starter etter høy inflasjon i fjor (πₜ₋₁ høy, adaptive forventninger). AS-kurven?","options":["AS skifter opp","Bevegelse langs AS","AS skifter ned","AD skifter ut"],"answer":0,"why":"πₜ₋₁ inngår i AS-ligningen, ikke på aksen. Høyere forventet inflasjon bakes inn i prissettingen og løfter AS mellom periodene.","ch":16},{"q":"Etter prissjokket faller inflasjonen og forventningene πₜ₋₁ justeres ned periode for periode. Hva skjer med AS?","options":["Bevegelse langs AS","AS skifter gradvis ned","AD skifter ut","AS skifter opp"],"answer":1,"why":"πₜ₋₁ er skiftvariabel i AS. Adaptive forventninger oppdateres bakover, så AS skifter gradvis ned og økonomien går langs AD tilbake mot likevekt.","ch":17},{"q":"Risikopåslaget f̄ stiger under finansuro. Hva skjer i AS-AD-diagrammet?","options":["AD skifter inn","AD skifter ut","Bevegelse langs AD","AS skifter opp"],"answer":0,"why":"f̄ gir leddet −b̄f̄ i AD og står ikke på aksen. Lånerenten stiger selv med uendret styringsrente, som et negativt etterspørselssjokk: AD inn.","ch":18},{"q":"Oljeprisen faller kraftig og bedriftenes kostnader synker (ō < 0). AS-kurven?","options":["AS skifter opp","Bevegelse langs AS","AD skifter inn","AS skifter ned"],"answer":3,"why":"Negativt prissjokk: ō er skiftvariabel, ikke på aksen. AS skifter ned, og vi får lavere inflasjon og høyere produksjon langs AD.","ch":16},{"q":"Finanspolitisk ekspansjon i nedgangstid (ā↑). Hva skjer i AS-AD-diagrammet?","options":["AS skifter opp","Bevegelse langs AS","AD skifter ut","AD skifter inn"],"answer":2,"why":"ā inngår i AD, ikke på aksen: AD skifter ut. Deretter bevegelse langs AS til høyere Ỹ og π, siden AS bare skifter ved ō eller πₜ₋₁.","ch":17},{"q":"Positivt etterspørselssjokk (ā↑): hva skjer med AS-kurven i selve sjokkperioden?","options":["AS skifter opp","AS skifter ned","Ingen skift: bevegelse langs AS","AS blir flatere"],"answer":2,"why":"AS skifter bare ved ō eller πₜ₋₁, og begge er uendret i sjokkperioden. Ỹₜ står på aksen, så AD-skiftet gir bevegelse langs AS.","ch":17},{"q":"Utenlandsk realrente R^W stiger og kronen svekkes (εₜ↑). Norsk AD-kurve?","options":["AD skifter inn","Bevegelse langs AD","AS skifter opp","AD skifter ut"],"answer":3,"why":"Kapital trekkes ut, real depresiering gjør eksporten mer konkurransedyktig og NX stiger. Virker som positivt ā-sjokk: AD skifter ut.","ch":19},{"q":"Svakere vekst hos handelspartnerne reduserer eksportetterspørselen (ā_nx↓). Hva skjer med AD?","options":["Bevegelse langs AD","AD skifter ut","AS skifter ned","AD skifter inn"],"answer":3,"why":"ā_nx inngår i ā, som er skiftvariabel i AD. Lavere eksportetterspørsel er et negativt etterspørselssjokk: AD skifter inn.","ch":19},{"q":"Toll på importerte innsatsvarer øker bedriftenes kostnader. Hva skjer med AS?","options":["AD skifter inn","AS skifter opp","Bevegelse langs AS","AS skifter ned"],"answer":1,"why":"Kostnadssjokket er ō↑, en skiftvariabel: AS skifter opp. Tollens etterspørselsside (ā_nx↓) skifter i tillegg AD inn (dual effekt).","ch":19},{"q":"Sentralbanken blir mer aggressiv mot inflasjonsavvik (m̄↑). Hva skjer med AD?","options":["AD skifter ut","AD blir flatere (helningen endres)","Bevegelse langs AD","AS skifter opp"],"answer":1,"why":"m̄ inngår i helningen b̄m̄, ikke i konstantleddet. Sterkere renterespons gir større utslag i Ỹ per enhet inflasjonsavvik: flatere AD.","ch":17},{"q":"Langsiktig realrente r̄ (= MPK) faller. Hva skjer i IS-diagrammet?","options":["IS skifter inn","IS skifter ut","Bevegelse langs IS","IS blir flatere"],"answer":0,"why":"r̄ står ikke på aksen og er skiftvariabel. Lavere avkastning gjør færre prosjekter lønnsomme ved gitt Rₜ: Ỹ = ā − b̄(Rₜ − r̄) faller, IS inn.","ch":14},{"q":"Spareraten s̄ øker fra 15 til 40 % (Sør-Korea). Hva skjer i Solow-diagrammet?","options":["Bevegelse langs s̄y-kurven","s̄y-kurven roterer opp","d̄k-linjen blir brattere","y-kurven skifter ned"],"answer":1,"why":"s̄ er kurveparameter, ikke på aksen (k). Investeringskurven s̄y roterer opp og skjærer d̄k lenger ute: nytt høyere k* og y*, rask overgangsvekst.","ch":8},{"q":"Et jordskjelv ødelegger halve kapitalbeholdningen. Hva skjer i Solow-diagrammet?","options":["s̄y-kurven skifter ned","y-kurven skifter ned","Ingen kurver flytter: nytt punkt til venstre for k*","d̄k-linjen roterer ned"],"answer":2,"why":"k står på aksen og ingen parametre (s̄, A, d̄) endres: ingen skift. Økonomien havner under k* og vokser langs kurvene tilbake til samme steady state.","ch":8},{"q":"TFP faller (A↓) etter svekkede institusjoner. Hva skjer i Solow-diagrammet?","options":["Bevegelse langs kurvene","Bare s̄y-kurven skifter ned","Både y- og s̄y-kurven skifter ned","d̄k-linjen blir slakere"],"answer":2,"why":"A inngår i både y = Ak^α og s̄y, så begge kurver skifter ned: nytt lavere k* og y*. I motsetning til jordskjelv, som er bevegelse langs.","ch":8},{"q":"Befolkningsveksten n̄ øker. Hva skjer i Solow-diagrammet med befolkningsvekst?","options":["s̄y-kurven skifter opp","Bevegelse langs (n̄+d̄)k-linjen","y-kurven blir brattere","(n̄+d̄)k-linjen blir brattere"],"answer":3,"why":"n̄ virker som ekstra avskrivning: mer av investeringen går til å utstyre nye innbyggere med kapital. Brattere (n̄+d̄)k gir lavere k* og y*.","ch":8},{"q":"Negativt etterspørselssjokk har rammet, og sentralbanken kutter renten. IS-MP-diagrammet?","options":["MP skifter opp","Bevegelse langs MP","IS skifter ut","MP skifter ned"],"answer":3,"why":"Sentralbankens rentevalg flytter MP-linjen: kutt gir MP ned og bevegelse langs den innskiftede IS-kurven, som demper det negative gapet.","ch":15},{"q":"Et prissjokk (ō↑) treffer. Hva skjer med AD-kurven i samme periode?","options":["AD skifter inn","Ingen skift: bevegelse langs AD","AD skifter ut","AD blir brattere"],"answer":1,"why":"ō inngår ikke i AD. Sjokket skifter AS opp; når πₜ (på aksen) stiger, hever sentralbanken renten, en bevegelse langs AD til stagflasjonspunktet B.","ch":17}],
  chains: [{"title":"Rentekanalen i åpen økonomi","steps":["Norges Bank setter styringsrenten i høyere enn hos handelspartnerne","Kapital strømmer inn til Norge for å høste renteforskjellen","Kronen styrker seg: εₜ↓ (færre kroner per euro)","Trege priser gjør at også realvalutakursen appresierer","Norsk eksport blir dyrere ute og import billigere: NX faller","Valutakanalen demper etterspørselen i tillegg til IS-kanalen"],"why":"Viser at renteøkning i åpen økonomi virker via to kanaler: IS og valutakursen. UIP-mekanismen rente til krone til NX var eksplisitt tema i V25 3b.","ch":19},{"title":"Fra inflasjon over mål til lukket gap (MP og IS)","steps":["Inflasjonen ligger over målet: πₜ > π̄","Taylor-regelen Rₜ = m̄(πₜ − π̄) + r̄ tilsier realrente over r̄","Sentralbanken hever nominell rente i; treg inflasjon gir R↑","Bevegelse langs IS: dyrere å låne, investering og konsum faller","Produksjonsgapet blir negativt: Ỹ < 0","Via Phillips-kurven avtar prispresset og π faller mot målet"],"why":"Selve transmisjonsmekanismen bak renteanbefalingen i Oppgave 3: fra inflasjonsavvik via Taylor-regelen og IS til gap og disinflasjon.","ch":15},{"title":"Kostnadssjokk i AS-AD over flere perioder","steps":["Positivt prissjokk treffer: ō > 0 (f.eks. oljepris opp)","AS-kurven skifter opp med hele sjokket","Sentralbanken reagerer på høyere π: bevegelse langs AD til B","Stagflasjon i B: høyere inflasjon og lavere produksjon","Neste periode er ō = 0, men πₜ₋₁ er forhøyet og holder AS oppe","AS skifter gradvis ned når forventningene faller: tilbake til A"],"why":"Standardscenariet i Oppgave 3. Sensor krever stagflasjonspunktet B og at adaptive forventninger (πₜ₋₁) gjør tilbakevendingen gradvis over flere perioder.","ch":17},{"title":"Solow: konvergens mot steady state","steps":["Økonomien starter under steady state: k < k*","Investeringen overstiger avskrivningen: s̄y > d̄k","Nettoinvesteringen er positiv, så k vokser","Avtakende MPK gjør at investeringstilveksten flater ut","Avskrivningen d̄k vokser lineært og tar igjen investeringen","I k* er s̄y = d̄k: nettoinvestering null og veksten stopper"],"why":"Konvergensmekanismen er Solow-modellens kjerne og ble testet direkte V25. Formel uten mekanisme gir bare delvis uttelling.","ch":8},{"title":"Hvorfor høyere sparerate bare gir nivåeffekt","steps":["Spareraten øker: s̄y-kurven roterer opp i Solow-diagrammet","Ved gamle k* er nå s̄y > d̄k: nettoinvesteringen blir positiv","Kapitalen per innbygger vokser mot et nytt, høyere k*","Avtakende MPK: avskrivningen innhenter investeringen på nytt","I nytt steady state er y* høyere, men veksten er igjen null","Kun nivåeffekt: rask vekst i overgangen, ingen varig vekst"],"why":"Solows sentrale lærdom: kapitalakkumulasjon gir nivå, ikke varig vekst. Skillet mellom nivå og vekstrate er en klassisk felle i Oppgave 2.","ch":8},{"title":"Romer: fra ikke-rivalisering til vedvarende vekst","steps":["Ideer er ikke-rivaliserende: samme oppskrift kan brukes av alle","Utviklingskostnaden fordeles på stadig flere enheter","Å doble all innsats mer enn dobler produksjonen: økende skalautbytte","Kunnskapslageret er endogent og vokser: ΔAₜ₊₁ = z̄Lₐₜ","Forskerne vokser med befolkningen: Lₐₜ = ℓ̄Nₜ gir g*A = n̄","Vedvarende vekst per innbygger på BGP: g*y = γn̄"],"why":"Forklarer det Solow ikke kan: varig vekst. Kjeden fra ikke-rivalisering til g*y = γn̄ er det høyest belønnede enkelttemaet i Oppgave 2.","ch":9},{"title":"Badekarmodellen: utledningen av u*","steps":["Ledigheten endres med innstrøm minus utstrøm: ΔUₜ₊₁ = s·Eₜ − f·Uₜ","Steady state krever konstant vannstand: sett ΔUₜ₊₁ = 0","Da er innstrøm lik utstrøm: s·Eₜ = f·Uₜ","Sett inn Eₜ = L − Uₜ og løs: sL = (f + s)·U*","Del på L: u* = s/(f + s), uavhengig av arbeidsstyrken"],"why":"Utledningen av den naturlige ledighetsraten kan kreves vist (H25). Kjeden viser hvorfor bare s og f, ikke L, bestemmer u*.","ch":11},{"title":"Seignorage og hyperinflasjon (Sargent)","steps":["Store underskudd: ingen vil låne staten penger, skatteøkninger politisk umulige","Siste utvei i G = T + ΔB + ΔM er å trykke penger: ΔM↑","Kvantitetsteorien: π* = gM − gY, pengevekst blir inflasjon","Inflasjonsskatten uthuler realverdien for dem som holder kontanter","Samme realinntekt krever stadig mer trykking: inflasjonen akselererer","Hyperinflasjon har dermed finanspolitisk rot (Sargent)"],"why":"Kobler statens budsjettbetingelse til kvantitetsteorien og forklarer Sargents sitat: vedvarende høy inflasjon har finanspolitisk rot, motstykket til Friedman.","ch":12},{"title":"Finansiell friksjon, AD inn og nullgrensen (ZLB)","steps":["Finansuro: investorer krever risikopremie, f̄ stiger","Lånerenten R = R_ff + f̄ stiger selv om styringsrenten er uendret","Dyrere lån demper investering og konsum: AD skifter inn","Dyp nedgang med π < π̄: sentralbanken kutter renten mot null","Nullgrensen (ZLB): nominell rente kan ikke kuttes videre","Deflasjon løfter realrenten R = i − π og forsterker nedgangen"],"why":"Forklarer hvorfor lånerenten kan stige selv når styringsrenten kuttes, og hvorfor ZLB og deflasjon forsterker kriser. Kjernen i finanskrise-oppgaver.","ch":18},{"title":"Toll: dual effekt på AD og AS","steps":["Toll innføres mot norsk handel (f.eks. USA)","Svakere handelspartnere og verdikjeder: eksportetterspørselen faller","ā_nx faller: AD skifter inn","I tillegg: toll på innsatsvarer øker kostnadene, ō↑","AS skifter opp: kostnadsdrevet prispress","Produksjonen faller entydig, inflasjonseffekten er uklar"],"why":"V25 3c testet nettopp dette: ett sjokk treffer begge kurver. Vanligste feil er å behandle toll som enten AD eller AS, ikke begge.","ch":19},{"title":"Tidskonsistens og uavhengig sentralbank","steps":["Priser og lønninger for neste periode er allerede fastsatt","Sentralbanken fristes til ekspansiv politikk for å presse Ỹ opp","Aktørene forutser dette og bygger høyere inflasjon inn i kontrakter","Inflation bias: høyere inflasjon uten høyere produksjon","Binding til en pengepolitisk regel fjerner fristelsen","Uavhengig sentralbank med lovfestet mål gir troverdighet"],"why":"Kydland-Prescott begrunner hvorfor regler slår diskresjon og hvorfor sentralbanken er uavhengig. Testet i V24 3.3 om tillit og forventningsdannelse.","ch":18},{"title":"Okuns lov: fra produksjonsgap til ledighet","steps":["Et negativt sjokk gir faktisk BNP under potensielt: Ỹ < 0","Bedriftene produserer mindre og trenger færre ansatte","Ledigheten stiger over naturlig nivå: u − ū = −0,5·Ỹ > 0","Eksempel: Ỹ = −4 % gir syklisk ledighet på +2 prosentpoeng","Ledigheten normaliseres først når produksjonsgapet lukkes"],"why":"Okuns lov er broen fra produksjonsgapet til det vi bryr oss om: ledighet. Testet H25 2a; pass på fortegnet i koeffisienten −0,5.","ch":13}]
};

(function (S) {
  const { el, icon } = S.u;
  const sh = () => S.views.shared;
  const D = () => window.SAM3_DATA.lyn || { tf: [], shift: [], chains: [] };

  /* ---------- persistent lyn-state (xp, streak, spill) ---------- */
  function L() { const st = S.store.get(); if (!st.lyn) st.lyn = { xp: 0, days: {}, plays: 0, best: {} }; return st.lyn; }
  function save() { S.store.emit(); }
  function addXp(n) { L().xp += Math.round(n); save(); }
  function dailyDone() { return !!L().days[S.u.todayISO()]; }
  function markDaily() { L().days[S.u.todayISO()] = true; save(); }
  function streak() {
    const days = L().days; let n = 0;
    for (let i = 0; i < 400; i++) {
      const d = new Date(Date.now() - i * 86400000);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (days[iso]) n++; else if (i > 0) break;
    }
    return n;
  }
  const LEVELS = [[0, "Fersking"], [120, "Student"], [320, "Gruppelærer"], [650, "Seminarleder"], [1100, "Foreleser"], [1700, "Sensor"], [2600, "Nobelkandidat"]];
  function levelInfo() {
    const xp = L().xp; let i = 0;
    while (i < LEVELS.length - 1 && xp >= LEVELS[i + 1][0]) i++;
    return { idx: i, name: LEVELS[i][1], xp, prev: LEVELS[i][0], next: i < LEVELS.length - 1 ? LEVELS[i + 1][0] : null };
  }

  /* ---------- utils ---------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  let tick = null;
  function clearTick() { if (tick) { clearInterval(tick); tick = null; } }
  function progBar(total, at) { const p = el(".lyn-prog"); for (let j = 0; j < total; j++) p.appendChild(el("span" + (j < at ? ".done" : j === at ? ".cur" : ""))); return p; }

  /* ---------- spillregister ---------- */
  const GAMES = {
    blitz: { name: "Lynquiz", emoji: "⚡", desc: "8 spørsmål mot klokka", ready: () => S.data.raw.quizzes.filter((q) => q.type === "mcq").length >= 8, run: runBlitz },
    tf: { name: "Sant eller usant", emoji: "🎯", desc: "Avslør eksamensmytene", ready: () => D().tf.length >= 10, run: runTF },
    formel: { name: "Formel-lyn", emoji: "🧮", desc: "Finn riktig formel", ready: () => flatFormulas().length >= 12, run: runFormel },
    par: { name: "Par-sprint", emoji: "🃏", desc: "Match symboler og begreper", ready: () => (S.data.glossary.symbols || []).length >= 6, run: runPar },
    skift: { name: "Skift eller glid?", emoji: "📈", desc: "Kurveskift vs. bevegelse langs", ready: () => D().shift.length >= 10, run: runSkift },
    kjede: { name: "Kjede", emoji: "🔗", desc: "Bygg mekanismen steg for steg", ready: () => D().chains.length >= 3, run: runKjede },
    bit: { name: "Dagens bit", emoji: "☕", desc: "To innsikter og én sjekk", ready: () => S.data.chapters().length > 0, run: runBit },
  };
  function availableGames() { return Object.keys(GAMES).filter((k) => { try { return GAMES[k].ready(); } catch (e) { return false; } }); }

  /* ---------- økt-tilstand ---------- */
  let sess = null; // {plan:[keys], idx, daily, xp, summaries:[], stage}
  function startSession(plan, daily) { clearTick(); sess = { plan, idx: 0, daily, xp: 0, summaries: [], stage: "game" }; S.app.refresh(); window.scrollTo(0, 0); }
  function endSession() { clearTick(); sess = null; S.app.refresh(); }
  function gameDone(xp, summary) {
    sess.xp += xp; sess.summaries.push(summary); sess.idx++;
    if (sess.idx >= sess.plan.length) {
      sess.stage = "done"; addXp(sess.xp);
      if (sess.daily && !dailyDone()) { markDaily(); addXp(25); sess.bonus = 25; }
      L().plays = (L().plays || 0) + 1; save();
    }
    S.app.refresh(); window.scrollTo(0, 0);
  }
  function dailyPlan() {
    const avail = availableGames();
    const picks = shuffle(avail).slice(0, 3);
    return picks.length ? picks : ["blitz"];
  }

  /* ---------- felles MCQ-runner (lynquiz, skift, formel) ---------- */
  function mcqRunner(cfg, done) {
    const box = el(".lyn-game");
    let i = 0, correct = 0, combo = 0, xp = 0;
    function step() {
      clearTick(); S.u.clear(box);
      if (i >= cfg.rounds.length) { done(xp, `${cfg.title}: ${correct}/${cfg.rounds.length} riktige`); return; }
      const r = cfg.rounds[i];
      box.appendChild(progBar(cfg.rounds.length, i));
      let barSpan = null;
      if (cfg.secs) { const bar = el(".lyn-timer", el("span")); barSpan = bar.firstChild; box.appendChild(bar); }
      if (r.kicker) box.appendChild(el(".tiny.muted", { style: { marginBottom: "4px" } }, r.kicker));
      box.appendChild(el(".lyn-q", r.q));
      if (combo >= 2) box.appendChild(el(".lyn-combo", "🔥 " + combo + " på rad"));
      const opts = []; let answered = false;
      const explain = el(".explain", { style: { display: "none" } });
      function finish(pick) {
        if (answered) return; answered = true; clearTick();
        opts.forEach((b, j) => { if (j === r.answer) b.classList.add("correct"); else if (j === pick) b.classList.add("wrong"); else b.classList.add("dim"); b.disabled = true; });
        const ok = pick === r.answer;
        if (ok) { correct++; combo++; xp += cfg.xpPer + Math.min(combo - 1, 4) * 2; } else combo = 0;
        if (cfg.record && r.id) cfg.record(r.id, ok);
        explain.innerHTML = `<b>${ok ? "Riktig!" : (pick < 0 ? "Tiden ute. " : "Feil. ")}</b>${S.u.escapeHtml(r.why || "")}`;
        explain.style.display = "block";
        box.appendChild(el(".center", { style: { marginTop: "14px" } },
          el("button.btn.primary", { onclick: () => { i++; step(); } }, i + 1 >= cfg.rounds.length ? "Se resultat" : "Neste")));
      }
      r.options.forEach((o, j) => {
        const b = el("button.opt" + (cfg.mono ? ".mono" : ""), el(".key", String.fromCharCode(65 + j)), el("span", o));
        b.addEventListener("click", () => finish(j));
        opts.push(b); box.appendChild(b);
      });
      box.appendChild(explain);
      if (cfg.secs) {
        const t0 = Date.now();
        tick = setInterval(() => {
          if (!box.isConnected) { clearTick(); return; }
          const left = 1 - (Date.now() - t0) / (cfg.secs * 1000);
          if (left <= 0) finish(-1); else barSpan.style.width = (left * 100) + "%";
        }, 100);
      }
    }
    step(); return box;
  }

  function runBlitz(done) {
    const rounds = shuffle(S.data.raw.quizzes.filter((q) => q.type === "mcq")).slice(0, 8)
      .map((q) => ({ q: q.q, options: q.options, answer: q.answer, why: q.explanation, id: q.id, kicker: "K" + q.ch }));
    return mcqRunner({ rounds, secs: 18, xpPer: 10, title: "Lynquiz", record: (id, ok) => S.store.recordAnswer(id, ok) }, done);
  }
  function runSkift(done) {
    const rounds = shuffle(D().shift).slice(0, 10).map((it) => ({ q: it.q, options: it.options, answer: it.answer, why: it.why, kicker: "K" + it.ch }));
    return mcqRunner({ rounds, xpPer: 12, title: "Skift eller glid" }, done);
  }
  let _flat = null;
  function flatFormulas() {
    if (_flat) return _flat;
    _flat = [];
    (S.data.reference.formulaTables || []).forEach((t) => t.rows.forEach((r) => { if (r.formula && r.formula.length > 2) _flat.push(r); }));
    return _flat;
  }
  function runFormel(done) {
    const all = flatFormulas();
    const rounds = shuffle(all).slice(0, 8).map((row) => {
      const distract = shuffle(all.filter((x) => x.formula !== row.formula)).slice(0, 3).map((x) => x.formula);
      const options = shuffle([row.formula, ...distract]);
      return { q: "Hvilken formel hører til: " + row.term + "?", options, answer: options.indexOf(row.formula), why: row.point || "" };
    });
    return mcqRunner({ rounds, xpPer: 10, title: "Formel-lyn", mono: true }, done);
  }

  /* ---------- sant eller usant ---------- */
  function runTF(done) {
    const items = shuffle(D().tf).slice(0, 10);
    const box = el(".lyn-game");
    let i = 0, correct = 0, xp = 0;
    function step() {
      S.u.clear(box);
      if (i >= items.length) { done(xp, `Sant/usant: ${correct}/${items.length} riktige`); return; }
      const it = items[i];
      box.appendChild(progBar(items.length, i));
      box.appendChild(el(".tiny.muted", "K" + it.ch));
      box.appendChild(el(".lyn-statement", it.s));
      const fb = el("div");
      function answer(val) {
        const ok = val === it.answer;
        if (ok) { correct++; xp += 8; }
        S.u.clear(fb);
        fb.appendChild(el(".explain", { style: { borderColor: ok ? "var(--green)" : "var(--rose)" } },
          el("b", ok ? "Riktig! " : "Feil. "), `Påstanden er ${it.answer ? "SANN" : "USANN"}. ${it.why}`));
        fb.appendChild(el(".center", { style: { marginTop: "12px" } },
          el("button.btn.primary", { onclick: () => { i++; step(); } }, i + 1 >= items.length ? "Se resultat" : "Neste")));
        row.querySelectorAll("button").forEach((b) => (b.disabled = true));
      }
      const row = el(".lyn-big",
        el("button.lyn-sant", { onclick: () => answer(true) }, "SANT"),
        el("button.lyn-usant", { onclick: () => answer(false) }, "USANT"));
      box.appendChild(row);
      box.appendChild(fb);
    }
    step(); return box;
  }

  /* ---------- par-sprint (matching) ---------- */
  function runPar(done) {
    const useEco = Math.random() < 0.3 && (S.data.glossary.economists || []).length >= 6;
    const short = (s) => { const t = s.split(/[.;]/)[0]; return t.length > 58 ? t.slice(0, 55) + "…" : t; };
    const pairs = useEco
      ? shuffle(S.data.glossary.economists).slice(0, 6).map((e, ix) => ({ k: ix, a: e.name.split(" ").slice(-1)[0], b: short(e.note) }))
      : shuffle(S.data.glossary.symbols).slice(0, 6).map((e, ix) => ({ k: ix, a: e.sym, b: short(e.name) }));
    const tiles = shuffle(pairs.flatMap((p) => [{ k: p.k, t: p.a }, { k: p.k, t: p.b }]));
    const box = el(".lyn-game");
    box.appendChild(el(".lyn-q", useEco ? "Match økonom og bidrag" : "Match symbol og betydning"));
    const timeEl = el(".tiny.muted.center", "0 s");
    box.appendChild(timeEl);
    const grid = el(".par-grid");
    let sel = null, matched = 0, locked = false;
    const t0 = Date.now();
    tick = setInterval(() => { if (!box.isConnected) { clearTick(); return; } timeEl.textContent = Math.round((Date.now() - t0) / 1000) + " s"; }, 500);
    tiles.forEach((tile) => {
      const b = el("button.par-tile", tile.t);
      b.addEventListener("click", () => {
        if (locked || b.classList.contains("matched") || b === (sel && sel.btn)) return;
        if (!sel) { sel = { btn: b, k: tile.k }; b.classList.add("sel"); return; }
        if (sel.k === tile.k) {
          b.classList.add("matched"); sel.btn.classList.remove("sel"); sel.btn.classList.add("matched"); sel = null; matched++;
          if (matched === pairs.length) {
            clearTick();
            const secs = Math.round((Date.now() - t0) / 1000);
            const xp = secs <= 40 ? 60 : secs <= 75 ? 45 : 32;
            setTimeout(() => done(xp, `Par-sprint: 6/6 på ${secs} s`), 500);
          }
        } else {
          locked = true; b.classList.add("bad"); sel.btn.classList.add("bad");
          const prev = sel; sel = null;
          setTimeout(() => { b.classList.remove("bad"); prev.btn.classList.remove("bad", "sel"); locked = false; }, 480);
        }
      });
      grid.appendChild(b);
    });
    box.appendChild(grid);
    return box;
  }

  /* ---------- kjede (rekkefølge) ---------- */
  function runKjede(done) {
    const chains = shuffle(D().chains).slice(0, 2);
    const box = el(".lyn-game");
    let ci = 0, xp = 0;
    function step() {
      S.u.clear(box);
      if (ci >= chains.length) { done(xp, `Kjede: ${chains.length} mekanismer bygget`); return; }
      const ch = chains[ci];
      box.appendChild(progBar(chains.length, ci));
      box.appendChild(el(".lyn-q", ch.title));
      box.appendChild(el("p.tiny.muted", { style: { marginTop: "-6px" } }, "Trykk stegene i riktig rekkefølge:"));
      const built = el(".chain-built");
      box.appendChild(built);
      const pool = el(".chain-pool");
      let next = 0, mistakes = 0;
      shuffle(ch.steps.map((s, ix) => ({ s, ix }))).forEach((item) => {
        const b = el("button.chain-step", item.s);
        b.addEventListener("click", () => {
          if (item.ix === next) {
            next++;
            built.appendChild(el(".chain-done", el("span.cnum2", String(next)), el("span", item.s)));
            b.remove();
            if (next === ch.steps.length) {
              const gained = Math.max(10, 30 - 6 * mistakes); xp += gained;
              box.appendChild(el(".explain", { style: { marginTop: "12px" } }, el("b", "Kjede komplett! +" + gained + " XP. "), ch.why || ""));
              box.appendChild(el(".center", { style: { marginTop: "12px" } },
                el("button.btn.primary", { onclick: () => { ci++; step(); } }, ci + 1 >= chains.length ? "Se resultat" : "Neste kjede")));
            }
          } else {
            mistakes++;
            b.classList.add("shake");
            setTimeout(() => b.classList.remove("shake"), 350);
          }
        });
        pool.appendChild(b);
      });
      box.appendChild(pool);
    }
    step(); return box;
  }

  /* ---------- dagens bit (mikro-lesing + sjekk) ---------- */
  function runBit(done) {
    const mechs = [];
    S.data.chapters().forEach((c) => (c.mechanisms || []).forEach((m) => { if (m.heading) mechs.push({ ch: c.num, heading: m.heading, html: m.html }); }));
    const picks = shuffle(mechs).slice(0, 2);
    const check = D().tf.length ? shuffle(D().tf)[0] : null;
    const box = el(".lyn-game");
    let i = 0, xp = 15;
    function step() {
      S.u.clear(box);
      if (i < picks.length) {
        const m = picks[i];
        box.appendChild(progBar(picks.length + (check ? 1 : 0), i));
        box.appendChild(el(".chip.accent", { style: { marginBottom: "10px" } }, "⚙️ Mekanisme · K" + m.ch));
        box.appendChild(el("h3", { style: { fontSize: "18px", margin: "4px 0 10px" } }, m.heading));
        const body = el(".lyn-bit.prose"); body.innerHTML = m.html; box.appendChild(body);
        box.appendChild(el(".center", { style: { marginTop: "16px" } },
          el("button.btn.primary", { onclick: () => { i++; step(); } }, i + 1 < picks.length ? "Neste bit" : (check ? "Rask sjekk →" : "Ferdig"))));
      } else if (check && i === picks.length) {
        box.appendChild(progBar(picks.length + 1, i));
        box.appendChild(el(".tiny.muted", "Rask sjekk"));
        box.appendChild(el(".lyn-statement", check.s));
        const fb = el("div");
        const row = el(".lyn-big",
          el("button.lyn-sant", { onclick: () => ans(true) }, "SANT"),
          el("button.lyn-usant", { onclick: () => ans(false) }, "USANT"));
        function ans(v) {
          const ok = v === check.answer; if (ok) xp += 8;
          row.querySelectorAll("button").forEach((b) => (b.disabled = true));
          fb.appendChild(el(".explain", el("b", ok ? "Riktig! " : "Feil. "), check.why));
          fb.appendChild(el(".center", { style: { marginTop: "12px" } }, el("button.btn.primary", { onclick: () => done(xp, "Dagens bit: 2 innsikter lest") }, "Se resultat")));
        }
        box.appendChild(row); box.appendChild(fb);
      } else {
        done(xp, "Dagens bit: 2 innsikter lest");
      }
    }
    step(); return box;
  }

  /* ---------- visninger ---------- */
  function render() {
    if (sess) return sess.stage === "done" ? resultView() : gameView();
    return hub();
  }

  function hub() {
    clearTick();
    const wrap = el(".fade-in.lyn-wrap");
    const lv = levelInfo(); const st = streak(); const doneToday = dailyDone();

    // hero
    const hero = el(".lyn-hero");
    hero.appendChild(el(".row", { style: { position: "relative", zIndex: 1 } },
      el("div", { style: { flex: 1 } },
        el(".eyebrow", { style: { color: "rgba(255,255,255,.85)" } }, "LYNLÆRING"),
        el("h2", { style: { color: "#fff", fontSize: "24px", margin: "6px 0 2px" } }, "Eksamenstrening i lommeformat"),
        el("p", { style: { color: "rgba(255,255,255,.85)", margin: 0, fontSize: "14px" } }, "2-5 minutter. Perfekt på bussen.")),
      el(".lyn-streak", el(".fl", "🔥"), el(".n", String(st)), el(".l", "dager"))));
    wrap.appendChild(hero);

    // level card
    const lvCard = el(".card", { style: { marginTop: "14px" } });
    const span = lv.next ? lv.next - lv.prev : 1;
    const into = lv.next ? lv.xp - lv.prev : 1;
    lvCard.appendChild(el(".row",
      el("div", el(".tiny.muted", "Nivå " + (lv.idx + 1)), el("div", { style: { fontWeight: 700, fontSize: "17px" } }, lv.name)),
      el(".spacer"),
      el("div", { style: { textAlign: "right" } }, el(".tiny.muted", "XP"), el("div", { style: { fontWeight: 700, fontSize: "17px" } }, String(lv.xp)))));
    lvCard.appendChild(el("div", { style: { marginTop: "10px" } }, S.u.bar(lv.next ? Math.round((into / span) * 100) : 100, { thin: true })));
    if (lv.next) lvCard.appendChild(el(".tiny.muted", { style: { marginTop: "5px" } }, (lv.next - lv.xp) + " XP til " + LEVELS[lv.idx + 1][1]));
    wrap.appendChild(lvCard);

    // daily CTA
    const cta = el(".card.lyn-cta" + (doneToday ? ".done" : ""), { onclick: () => startSession(dailyPlan(), true) });
    cta.appendChild(el(".row",
      el(".lyn-cta-emoji", doneToday ? "✅" : "⚡"),
      el("div", { style: { flex: 1 } },
        el("div", { style: { fontWeight: 700, fontSize: "16.5px" } }, doneToday ? "Dagens økt fullført!" : "Dagens lynøkt"),
        el(".tiny", { style: { color: doneToday ? "var(--ink-3)" : "rgba(255,255,255,.85)" } }, doneToday ? "Ta en ekstra runde for mer XP" : "3 spill · ~4 min · +25 bonus-XP")),
      el("div", { style: { fontSize: "20px", opacity: .7 }, html: icon("arrow") })));
    wrap.appendChild(cta);

    // game tiles
    wrap.appendChild(el(".section-title", el("h3", "Velg spill")));
    const grid = el(".lyn-grid");
    Object.keys(GAMES).forEach((k) => {
      const g = GAMES[k]; const ok = g.ready();
      const tile = el("button.lyn-tile", { disabled: !ok, onclick: () => ok && startSession([k], false) },
        el(".em", g.emoji), el(".nm", g.name), el(".ds", ok ? g.desc : "Kommer snart"));
      grid.appendChild(tile);
    });
    wrap.appendChild(grid);

    wrap.appendChild(el("p.tiny.muted.center", { style: { marginTop: "18px", lineHeight: 1.5 } },
      "Alt innhold er hentet fra eksamensmanualen og oppgavebanken. Feil svar viser alltid forklaringen, det er der læringen skjer. Tips: legg siden til på Hjem-skjermen for app-følelse."));
    return wrap;
  }

  function gameView() {
    const wrap = el(".fade-in.lyn-wrap");
    const key = sess.plan[sess.idx]; const g = GAMES[key];
    wrap.appendChild(el(".row", { style: { marginBottom: "10px" } },
      el("button.iconbtn", { onclick: () => { if (confirm("Avslutte økten?")) endSession(); }, title: "Avslutt" }, "✕"),
      el("div", { style: { fontWeight: 700, fontSize: "16px" } }, g.emoji + " " + g.name),
      el(".spacer"),
      el(".chip.accent", sess.plan.length > 1 ? `Spill ${sess.idx + 1} av ${sess.plan.length}` : "+" + sess.xp + " XP")));
    const card = el(".card", { style: { padding: "20px 18px" } });
    card.appendChild(g.run(gameDone));
    wrap.appendChild(card);
    return wrap;
  }

  function resultView() {
    const wrap = el(".fade-in.lyn-wrap");
    const st = streak();
    const card = el(".card.pad-lg.center");
    card.appendChild(el("div", { style: { fontSize: "44px" } }, sess.daily ? "🏁" : "⚡"));
    card.appendChild(el(".lyn-xp-big", "+" + (sess.xp + (sess.bonus || 0)) + " XP"));
    if (sess.bonus) card.appendChild(el(".chip.green", { style: { margin: "6px 0" } }, "+" + sess.bonus + " bonus for dagens økt"));
    if (sess.daily) card.appendChild(el("div", { style: { margin: "10px 0", fontWeight: 620 } }, "🔥 Streak: " + st + " dag" + (st === 1 ? "" : "er")));
    const sum = el("div", { style: { margin: "16px 0", textAlign: "left" } });
    sess.summaries.forEach((s) => sum.appendChild(el(".task-row", el("div", "•"), el("div", el(".tt", s)))));
    card.appendChild(sum);
    const lv = levelInfo();
    card.appendChild(el(".tiny.muted", "Nivå: " + lv.name + " · " + lv.xp + " XP totalt"));
    card.appendChild(el(".row", { style: { justifyContent: "center", gap: "10px", marginTop: "18px", flexWrap: "wrap" } },
      el("button.btn.primary", { onclick: () => startSession(dailyPlan(), !dailyDone()) }, "Ny økt"),
      el("button.btn", { onclick: endSession }, "Til Lyn-hjem")));
    wrap.appendChild(card);
    return wrap;
  }

  S.views.lyn = { render, dailyDone, streak };
})(window.SAM3);
