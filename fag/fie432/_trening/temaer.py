# -*- coding: utf-8 -*-
"""Temaene i eksamenstreningen for FIE432.

   Temaene følger kjernepensumdelene, som igjen følger eksamensblokkene, med
   finansiell psykologi skilt ut fra forsikringen. `vekt` er eksamensvekten 1–5
   (samme kilde som examWeights i manifestet) og styrer hvor mange spørsmål et
   tema får når du trekker fra flere temaer samtidig. `mal` er hvor mange
   spørsmål temaet skal ha i banken; tools/sjekk-trening.js melder avvik.
   `kap` er manualkapitlene og `kjerne` kjernepensumdelen, som gjennomgangen
   lenker til.

   id-ene er lagringsnøkler for valgene dine. De må aldri endres.
"""
TEMAER = [
    dict(id="skattesystem", navn="Skattesystemet og effektiv skatt", kort="Effektiv skatt", vekt=4, kap=[1, 2], kjerne="kj1", mal=60,
         beskrivelse="Trinnskatt, gjennomsnitts- og marginalskatt, progressivitet, effektiv skattesats og tidsverdien av et fradrag."),
    dict(id="aksjonar", navn="Aksjonærmodellen: skjerming, utbytte og gevinst", kort="Aksjonærmodellen", vekt=5, kap=[5, 6], kjerne="kj2", mal=80,
         beskrivelse="Oppjustering og eierskatt, skjerming år for år, gevinst ved salg, samlet skatt på utdelt overskudd og fritaksmetoden."),
    dict(id="formue", navn="Formuesskatt: verdsetting og gjeldsfordeling", kort="Formuesskatt", vekt=4, kap=[7], kjerne="kj3", mal=60,
         beskrivelse="Satser og bunnfradrag, verdsettingsrabattene og den forholdsmessige gjeldsfordelingen."),
    dict(id="avkastningsskatt", navn="Formuesskatt som avkastningsskatt", kort="Avkastningsskatt", vekt=4, kap=[8], kjerne="kj4", mal=50,
         beskrivelse="Ekvivalensen t = τ/r, avkastning og verdi under formuesskatt, og utbyttet som skal betale skatten."),
    dict(id="insidens", navn="Hvem betaler skatten: insidens", kort="Insidens", vekt=5, kap=[11], kjerne="kj5", mal=80,
         beskrivelse="Stykkskatt, ∂p/∂t og ∂P/∂t, elastisitetsregelen, grensetilfellene, proveny og dødvektstap."),
    dict(id="noytralitet", navn="Nøytralitet, bedriftens tilpasning og implisitt skatt", kort="Nøytralitet", vekt=3, kap=[9, 10, 12], kjerne="kj6", mal=45,
         beskrivelse="Kapitalkostnaden F′(K), gjeld mot egenkapital, implisitt skatt og skatt og risiko."),
    dict(id="internasjonal", navn="Internasjonal skatt og exit-skatt", kort="Internasjonal skatt", vekt=3, kap=[13, 6], kjerne="kj7", mal=45,
         beskrivelse="Globalskatteplikt, unntak og kredit, ingen skatteavtale, bosted og exit-skatt."),
    dict(id="portefolje", navn="Sparing og porteføljevalg", kort="Portefølje", vekt=5, kap=[14], kjerne="kj8", mal=80,
         beskrivelse="To aktiva og kapitalmarkedslinjen, Merton med humankapital, sparevalg med ln-nytte og tidsverdi."),
    dict(id="pensjon", navn="Pensjon", kort="Pensjon", vekt=4, kap=[15], kjerne="kj9", mal=55,
         beskrivelse="Folketrygdens beholdning og delingstall, innskudd mot ytelse, OTP, IPS og BSU."),
    dict(id="laan", navn="Lån", kort="Lån", vekt=3, kap=[16], kjerne="kj10", mal=45,
         beskrivelse="Annuitet og serielån, renter og rentefradrag, effektiv rente, kredittkostnad og utlånsforskriften."),
    dict(id="forsikring", navn="Forsikring og forventet nytte", kort="Forsikring", vekt=4, kap=[17], kjerne="kj11", mal=60,
         beskrivelse="Forventet nytte, sikkerhetsekvivalent, maksimal premie, kritisk sannsynlighet og delvis dekning."),
    dict(id="psykologi", navn="Finansiell psykologi", kort="Psykologi", vekt=2, kap=[18], kjerne="kj11", mal=25,
         beskrivelse="Tapsaversjon, overkonfidens, hjemmebias, system 1 og 2, og hvordan man omgår dem."),
]


# ---------------------------------------------------------------------------
# Hurtiginnføringen per tema: hva temaet tester, formlene du må kunne og de
# vanligste fellene. Vises bak knappen «Hurtiginnføring» på temakortet og fra
# temamerket underveis i en runde. Kortversjon av «Må kunne»-boksene i
# kjernepensum; formlene vises med symbolforklaring fra fag/fie432/symboler.js.
# Formel er (uttrykk, hva det betyr). HTML er lov; ingen tankestrek, ingen komma
# foran «og» (tools/sjekk-trening.js sjekker det).
# ---------------------------------------------------------------------------
INTRO = {
    "skattesystem": dict(
        tester=[
            "Gjennomsnittsskatt med trinnskatt og om et system er progressivt",
            "Effektiv skattesats, både for en lønnstaker og for en eier med selskap",
            "Verdien av et fradrag nå mot senere og rente mot aksjegevinst etter skatt",
        ],
        formler=[
            ("Effektiv skattesats = betalt skatt / brutto inntekt",
             "Brutto i nevneren, ikke skattepliktig inntekt."),
            ("Trinnskatt: hver sats gjelder bare inntekten inne i trinnet",
             "Marginalsatsen treffer bare den siste kronen."),
            ("t̄(Y) = t × (1 − B/Y)",
             "Gjennomsnittsskatt med flat sats t og bunnfradrag B. Stiger med Y, så systemet er progressivt."),
            ("t<sub>eff</sub> = (α × selskapets skatt + eierens skatt) / (α × selskapets bruttoinntekt + eierens andre inntekter)",
             "Eierens effektive sats med eierandel α."),
            ("r<sub>etter</sub> = r(1 − t) for renter · r(1 − t<sub>e</sub>) for aksjer",
             "Med t = 22 % og t<sub>e</sub> = 37,84 % må aksjen gi 1,2548 ganger renten for å gi like mye."),
            ("Realavkastning etter skatt = (1 + i(1 − t))/(1 + π) − 1",
             "Nominelt, så skatt, så realt."),
        ],
        feller=[
            "Marginalsatsen brukt på hele inntekten",
            "Skattepliktig inntekt i nevneren i stedet for brutto inntekt",
        ],
    ),
    "aksjonar": dict(
        tester=[
            "Skattepliktig utbytte med skjerming, også over flere år med framført skjerming",
            "Skatt på gevinst ved salg og eierskatten med oppjusteringen",
            "Samlet skatt på utdelt overskudd og fritaksmetoden for selskaper",
        ],
        formler=[
            ("t<sub>e</sub> = f × t = 1,72 × 22 % = 37,84 %",
             "Oppjuster grunnlaget eller satsen, aldri begge."),
            ("S<sub>t</sub> = kostpris + ubenyttet skjerming fra i fjor",
             "Skjermingsgrunnlaget."),
            ("Skjermingsfradrag = S<sub>t</sub> × r<sub>s</sub>",
             "Renten ganges med grunnlaget, aldri med utbyttet."),
            ("Skattepliktig utbytte = maks(0; utbytte − fradrag − ubenyttet fra i fjor)",
             "Ubenyttet skjerming brukes to ganger: i grunnlaget og som fradrag. Det som ikke brukes, framføres."),
            ("Skattepliktig gevinst = salgspris − kostpris − ubenyttet skjerming",
             "Selger du før årsskiftet, får du ikke årets skjerming."),
            ("Samlet skatt = 22 % + 78 % × 37,84 % = 51,52 %",
             "Selskapsskatt pluss eierskatt på det som deles ut."),
            ("Fritaksmetoden: 3 % × 22 % = 0,66 % på mottatt utbytte",
             "Gevinst er skattefri. Utbytte i konsern over 90 % gir null."),
        ],
        feller=[
            "Framført skjerming glemt, eller lagt til grunnlaget uten å trekkes fra",
            "Oppjusteringen glemt: grunnlaget ganget med 22 % alene",
            "Skatten oppgitt der spørsmålet ber om grunnlaget",
        ],
    ),
    "formue": dict(
        tester=[
            "Formuesskatten med bunnfradrag og to trinn, for enslige og ektefeller",
            "Formuesverdien av bolig, aksjer og bank",
            "Den forholdsmessige gjeldsfordelingen og nettoformuen",
        ],
        formler=[
            ("Formuesskatt = 1,0 % × maks(0, min(W, K) − B) + 1,1 % × maks(0, W − K)",
             "2026, enslig: B = kr 1 900 000 og K = kr 21 500 000. Ektefeller under ett: kr 3 800 000 og kr 43 000 000."),
            ("Aksjer, fond og næringseiendom 80 % · primærbolig 25 % opp til kr 14 000 000 og 70 % over · bank og sekundærbolig 100 %",
             "Formuesverdi i prosent av markedsverdi [dagens regel]."),
            ("Gjeld<sub>i</sub> = G × BV<sub>i</sub>/ΣBV",
             "Gjelden fordeles etter bruttoverdi, før rabatt."),
            ("Fradragsberettiget gjeld<sub>i</sub> = gjeld<sub>i</sub> × (1 − ρ<sub>i</sub>)",
             "Gjelden på rabatterte aktiva avkortes. Gjelden på primærboligen avkortes ikke."),
            ("Samlet fradrag = G × [1 − Σ(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV]",
             "Summen løper bare over aktiva med 20 % rabatt."),
        ],
        feller=[
            "Gjelden fordelt etter formuesverdi i stedet for bruttoverdi",
            "Gjelden på primærboligen avkortet med 75 %",
            "Markedsverdien brukt i stedet for formuesverdien",
        ],
    ),
    "avkastningsskatt": dict(
        tester=[
            "Hvilken avkastningsskatt formuesskatten tilsvarer",
            "Avkastning og verdi når formuesskatten trekkes fra",
            "Utbyttet en eier må ta ut for å betale formuesskatten",
        ],
        formler=[
            ("t = τ<sub>w</sub>/r",
             "Skatten faller på formuen ved inngangen til året, kursets konvensjon. Ved utgangen: τ<sub>w</sub> = t × r/(1 + r)."),
            ("r<sub>etter</sub> = r − τ<sub>w</sub>",
             "Med verdsettingsrabatt ρ: r − τ<sub>w</sub>(1 − ρ)."),
            ("Alternativet rammes likt: V = CF/r",
             "Verdien er uendret, fordi kravet faller like mye som strømmen."),
            ("Alternativet rammes ikke: V = CF/(r + τ<sub>w</sub>)",
             "Bare da faller verdien."),
            ("D = τ<sub>w</sub> × W/(1 − t<sub>e</sub>)",
             "Bruttoutbyttet som dekker skatten. Kontroll: D × (1 − t<sub>e</sub>) = τ<sub>w</sub> × W."),
        ],
        feller=[
            "Formuen ved utgangen av året brukt når oppgaven sier inngangen",
            "Skatten trukket fra strømmen, men kravet r beholdt",
            "Formuesskatten lagt oppå utbyttet i stedet for å brutto opp",
        ],
    ),
    "insidens": dict(
        tester=[
            "Hvem som bærer en stykkskatt, med formler og med tall",
            "Grensetilfellene når en side er perfekt elastisk eller uelastisk",
            "Proveny, dødvektstap og monopol",
        ],
        formler=[
            ("P = p + t",
             "Kjøperens pris er selgerens pris pluss skatten, uansett hvem som betaler den inn."),
            ("∂p/∂t = D′/(S′ − D′)",
             "Produsentprisen faller. Alltid negativ."),
            ("∂P/∂t = S′/(S′ − D′)",
             "Konsumentprisen stiger. Alltid positiv."),
            ("∂P/∂t − ∂p/∂t = 1",
             "Kontrollen som stryker halvparten av alternativene."),
            ("Kjøperens andel = ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|)",
             "Den minst elastiske siden bærer mest."),
            ("Proveny = t × x<sub>t</sub> · dødvektstap ≈ ½ × t × (x<sub>0</sub> − x<sub>t</sub>)",
             "Tapet er null når én side er perfekt uelastisk."),
        ],
        feller=[
            "S′ og D′ byttet i telleren",
            "Fortegnet snudd i nevneren (D′ − S′)",
            "Konsumentpris og produsentpris forvekslet i talleksemplene",
        ],
    ),
    "noytralitet": dict(
        tester=[
            "Avkastningskravet til bedriftens kapital under skatt",
            "Gjeld mot egenkapital når bare renter gir fradrag",
            "Implisitt skatt, skattearbitrasje og skatt og risiko",
        ],
        formler=[
            ("F′(K) = r(1 − At)/(1 − t)",
             "A er andelen av rentene som kan trekkes fra. Test alternativene med A = 1, som skal gi r."),
            ("F′<sub>G</sub> = r · F′<sub>E</sub> = r/(1 − t)",
             "Egenkapital er dyrere, så E* &lt; G*."),
            ("r = R(1 − t) · t* = (R − r)/R",
             "Implisitt skatt. Nevneren er R, avkastningen før skatt på det skattlagte."),
            ("Arbitrasjegevinst = r × L × (t<sub>fradrag</sub> − t<sub>avkastning</sub>)",
             "Lån med fradrag til høy sats, plasser til lavere sats."),
            ("Fullt tapsfradrag: skaler den risikable plasseringen opp med 1/(1 − t)",
             "Domar–Musgrave: staten er stille partner."),
        ],
        feller=[
            "Teller og nevner byttet i F′(K)",
            "Implisitt skatt delt på r i stedet for R",
        ],
    ),
    "internasjonal": dict(
        tester=[
            "Skatten under unntak, kredit og uten skatteavtale",
            "Globalskatteplikt og når du er bosatt i Norge",
            "Exit-skatt og gave til noen i utlandet",
        ],
        formler=[
            ("Unntak: T = t<sub>kilde</sub> × Y",
             "Hjemstaten gir helt avkall."),
            ("Kredit: T = maks(t<sub>hjem</sub>; t<sub>kilde</sub>) × Y",
             "Kreditten er begrenset til norsk skatt på inntekten."),
            ("Ingen avtale: T = (t<sub>hjem</sub> + t<sub>kilde</sub>) × Y",
             "Slik regner eksamen. Loven gir likevel ensidig kreditfradrag (sktl § 16-20)."),
            ("Exit-skatt = (markedsverdi − inngangsverdi − 3 000 000) × 37,84 %",
             "Dagen før utflytting. Kan betales i tolv rentefrie rater."),
            ("Bosatt: over 183 dager på 12 måneder eller 270 på 36",
             "Etter minst ti års bosted opphører bostedet først når vilkårene er oppfylt i tre hele inntektsår."),
        ],
        feller=[
            "Full kredit for all utenlandsk skatt, også over norsk sats",
            "«Uten avtale skattlegger bare kildestaten»: det er motsatt",
        ],
    ),
    "portefolje": dict(
        tester=[
            "Porteføljerisiko med to aktiva og kapitalmarkedslinjen",
            "Mertons aksjeandel, med og uten humankapital",
            "Sparevalg med ln-nytte og vekst over tid",
        ],
        formler=[
            ("σ<sub>p</sub><sup>2</sup> = s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>",
             "Ved ρ = 1 er det ingen diversifisering: alt i aktivumet med lavest σ."),
            ("E(r<sub>p</sub>) = r<sub>f</sub> + [(E(r<sub>M</sub>) − r<sub>f</sub>)/σ<sub>M</sub>] × σ<sub>p</sub>",
             "Mer risiko: lån og kjøp mer av markedsporteføljen."),
            ("w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>)",
             "Andelen av totalformuen F + H i aksjer. σ<sup>2</sup> er variansen."),
            ("Aksjer i F = w*(F + H) − β<sub>H</sub> × H",
             "β<sub>H</sub> = 0 for sikker jobb, 1 for lønn som følger markedet."),
            ("Velg høyest Σ p<sub>i</sub> × ln W<sub>i</sub>",
             "Sannsynlighetene endrer nytten, aldri sluttverdiene."),
            ("Sluttverdi av årlig sparing = a × [(1 + r)<sup>T</sup> − 1]/r",
             "CAGR = (W<sub>T</sub>/W<sub>0</sub>)<sup>1/T</sup> − 1."),
        ],
        feller=[
            "Standardavviket brukt der formelen krever variansen",
            "w* brukt på finansformuen alene",
        ],
    ),
    "pensjon": dict(
        tester=[
            "Folketrygdens opptjening, beholdning og årlige pensjon",
            "Delingstall, utsatt uttak og kompensasjonsgrad",
            "Innskudd mot ytelse, OTP, IPS og BSU",
        ],
        formler=[
            ("Opptjening = 18,1 % × min(inntekt; 7,1 G)",
             "Inntekt over 7,1 G gir ingen opptjening."),
            ("B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + opptjening",
             "Reguler først, legg til årets opptjening etterpå."),
            ("Årlig pensjon = beholdning/delingstall",
             "Utsatt uttak gir lavere delingstall og høyere årlig pensjon."),
            ("Kompensasjonsgrad ≈ 18,1 % × antall år/delingstall",
             "Under taket, når lønnen følger G."),
            ("OTP minst 2 % av lønn opp til 12 G",
             "Innskudd: du bærer risikoen. Ytelse: arbeidsgiveren gjør det."),
            ("IPS: 22 % fradrag inn, 22 % skatt ut, fritatt formuesskatt",
             "Maks kr 25 000 i 2026. Uttak er alminnelig inntekt, ikke pensjonsinntekt. BSU: 10 % av inntil kr 27 500."),
        ],
        feller=[
            "Beholdningen regulert etter at årets opptjening er lagt til",
            "Taket på 7,1 G glemt",
            "Antatt at delingstallet stiger ved utsatt uttak. Det synker",
        ],
    ),
    "laan": dict(
        tester=[
            "Terminbeløp, renter og avdrag på annuitets- og serielån",
            "Effektiv rente og kredittkostnad med gebyrer",
            "Hvor mye du kan låne etter utlånsforskriften",
        ],
        formler=[
            ("A = L × m/(1 − (1 + m)<sup>−n</sup>)",
             "Månedlig: m = årsrente/12 og n = år × 12."),
            ("Sum renter = n × A − L · serielån: m × L × (n + 1)/2",
             "Rentene et år er betalt beløp minus avdrag."),
            ("Rentefradrag = renter × 22 %",
             "Et fradrag i alminnelig inntekt."),
            ("L − etableringsgebyr = Σ (A + termingebyr)/(1 + r<sub>eff</sub>)<sup>t</sup>",
             "Effektiv rente er internrenten. Kredittkostnad er alt du betaler minus lånet, udiskontert."),
            ("Gjeld ≤ 5 × inntekt · lån ≤ 90 % av boligen · stresstest +3 prosentpoeng, minst 7 %, over 30 år",
             "Utlånsforskriften [dagens regel]. Den laveste skranken binder."),
        ],
        feller=[
            "Renten ganget med hele lånet som første års rente med månedlige terminer",
            "Det gamle påslaget på 5 prosentpoeng i stresstesten",
            "Lånet ikke trukket fra i kredittkostnaden",
        ],
    ),
    "forsikring": dict(
        tester=[
            "Om en risikoavers bør kjøpe forsikring til en gitt premie",
            "Høyeste premie og kritisk sannsynlighet",
            "Delvis dekning, sikkerhetsekvivalent og risikopremie",
        ],
        formler=[
            ("E[U uten] = (1 − p) × U(W) + p × U(W − L)",
             "Med full dekning er formuen W − P i begge tilstander: U(W − P)."),
            ("U(CE) = E[U]",
             "√W: CE = E[U]<sup>2</sup>. ln W: CE = e<sup>E[U]</sup>."),
            ("P<sub>maks</sub> = W − CE = p × L + risikopremie",
             "Den høyeste premien du godtar."),
            ("(1 − p*) × U(W) + p* × U(W − L) = U(W − P)",
             "Kritisk sannsynlighet: over p* lønner forsikringen seg."),
            ("Delvis dekning: (1 − p) × U(W − P) + p × U(W − L + αL − P)",
             "Premien trekkes fra i begge tilstander."),
        ],
        feller=[
            "Forventet formue sammenlignet i stedet for forventet nytte: gir alltid «ikke kjøp»",
            "Premien glemt i skadetilstanden ved delvis dekning",
        ],
    ),
    "psykologi": dict(
        formeltittel="Begrepene du må kunne",
        tester=[
            "De åtte avvikene: hva de er og hva de koster",
            "Forskjellen på en feilslutning og en preferanse. Hvordan hver av dem håndteres",
            "System 1 og 2",
        ],
        formler=[
            ("Overkonfidens, mental regnskapsføring, flokkatferd, forankring, eksponentiell vekst-bias",
             "Feilslutninger. Kan i prinsippet rettes med informasjon."),
            ("Tapsaversjon",
             "En preferanse. Et tap veier tyngre enn en like stor gevinst. Omgås med en regel, som en skriftlig plan."),
            ("Disposisjonseffekten og hjemmebias",
             "Grensetilfellene. Disposisjonseffekten er en feilslutning bygget på tapsaversjon. Hjemmebias endret seg ikke da folk fikk informasjon i forsøket, så den kan også leses som en preferanse."),
            ("Tapsvekt: nytten i utfall under referansepunktet ganges med 1/1,03",
             "Kursets regnevariant (H2022 oppgave 5.6). Forsterker valget av det trygge."),
            ("Betenkningstid flytter valget fra system 1 til system 2",
             "Fra magefølelsen til overveielsen."),
        ],
        feller=[
            "Tapsaversjon kalt en feilslutning som kan rettes med informasjon",
            "Kurtasje sett som uflaks: den kommer oppå et nullspill",
        ],
    ),
}
for _t in TEMAER:
    _t["intro"] = INTRO[_t["id"]]
