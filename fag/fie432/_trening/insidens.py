# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «insidens»: hvem bærer en stykkskatt (k11), kjernepensum kj5.

   Kursets mest testede enkelttema (åtte av ni sett). To former dominerer:
   formelgjenkjenning (H2024 oppgave 8: ∂p/∂t og ∂P/∂t blant fire nesten like
   brøker) og grensetilfeller med tall (H2025 oppgave 8). Familiene under
   regner lineære markeder, elastisitetsregelen, grensetilfellene, monopol og
   kapitalisering. Formelfamilien ins-form1 varierer hva som spørres om.
"""
from trening_lib import *  # noqa: F401,F403

# Hjelpen bak «Hjelp»-knappen: fremgangsmåten uten spørsmålets tall og uten svaret.
HJELP = {
    'ins-lin1': (
        '<p><b>Steg 1: skriv kilen.</b> P = p + t, uansett hvem som betaler skatten inn.</p>'
        '<p><b>Steg 2: sett kilen inn i likevekten.</b> Erstatt P med p + t i etterspørselen og sett den lik tilbudet: D(p + t) = S(p). Løs for p.</p>'
        '<p><b>Steg 3: den andre prisen.</b> P = p + t.</p>'
        '<p><b>Kontroll:</b> kvantumet skal bli likt på begge kurvene. Kjøperens prisøkning pluss selgerens prisfall skal være t. Siden med minst helning i tallverdi bærer mest.</p>'
        '<p><b>Felle:</b> les om spørsmålet gjelder det kjøperen betaler i alt eller det selgeren sitter igjen med.</p>'
    ),
    'ins-lin2': (
        '<p><b>Steg 1: ny likevekt.</b> Sett P = p + t inn i likevekten D(p + t) = S(p) og løs for p. Da er P = p + t.</p>'
        '<p><b>Steg 2: nytt kvantum.</b> Sett P inn i etterspørselen eller p inn i tilbudet.</p>'
        '<p><b>Steg 3: provenyet.</b> Proveny = t × nytt kvantum.</p>'
        '<p><b>Felle:</b> det gamle kvantumet gir for høyt proveny. Staten får hele kilen t per enhet, ikke bare den delen kjøperne bærer.</p>'
    ),
    'ins-dvt1': (
        '<p><b>Steg 1: kvantumsfallet.</b> Finn kvantumet før og etter skatten. Er ny likevekt ikke oppgitt, sett P = p + t inn i likevekten D(p + t) = S(p) og løs.</p>'
        '<p><b>Steg 2: trekanten.</b> Dødvektstap = ½ × t × kvantumsfallet. Høyden er hele kilen t.</p>'
        '<p><b>Kontroll:</b> ½ × t² × |S′D′|/(S′ − D′) skal gi det samme.</p>'
        '<p><b>Felle:</b> uten ½ regner du et rektangel. Med bare én sides prisendring som høyde får du bare den sidens del av trekanten.</p>'
    ),
    'ins-cs1': (
        '<p><b>Steg 1: prisendringen for gruppen.</b> For kjøperne er det ny P minus gammel pris. For selgerne er det gammel pris minus ny p.</p>'
        '<p><b>Steg 2: rektangelet.</b> Prisendringen × nytt kvantum.</p>'
        '<p><b>Steg 3: trekanten.</b> ½ × prisendringen × kvantumsfallet. Legg sammen rektangel og trekant.</p>'
        '<p><b>Kontroll:</b> kjøpernes tap pluss selgernes tap minus provenyet skal bli dødvektstapet ½ × t × kvantumsfallet.</p>'
        '<p><b>Felle:</b> å glemme trekanten eller bruke den andre gruppens prisendring.</p>'
    ),
    'ins-eps1': (
        '<p><b>Steg 1: kjøperens andel.</b> ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Selgerens andel er resten, |ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|).</p>'
        '<p><b>Steg 2: kroner.</b> Gang andelen med skatten.</p>'
        '<p><b>Steg 3: prisen.</b> Kjøpernes pris er den gamle prisen pluss kjøpernes del. Selgernes pris er den gamle prisen minus selgernes del.</p>'
        '<p><b>Kontroll:</b> den minst elastiske siden skal bære mest.</p>'
        '<p><b>Felle:</b> tilbudselastisiteten står i telleren for kjøperens andel, ikke etterspørselselastisiteten.</p>'
    ),
    'ins-eps2': (
        '<p><b>Steg 1: andelen.</b> Kjøpernes andel er prisøkningen delt på skatten. Selgernes andel er resten.</p>'
        '<p><b>Steg 2: sett opp regelen.</b> Kjøpernes andel er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Selgernes andel er |ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|).</p>'
        '<p><b>Steg 3: løs for den ukjente.</b> Del den kjente elastisiteten på den andelen der den står i telleren. Det gir summen av elastisitetene. Trekk fra den kjente.</p>'
        '<p><b>Felle:</b> å stoppe ved summen eller bytte om andelene. Sett tallene inn igjen som kontroll.</p>'
    ),
    'ins-hel1': (
        '<p><b>Steg 1: nevneren.</b> S′ − D′. D′ er negativ, så nevneren blir S′ + |D′|.</p>'
        '<p><b>Steg 2: velg teller.</b> ∂p/∂t har D′ i telleren, ∂P/∂t har S′ i telleren.</p>'
        '<p><b>Steg 3: kroner.</b> Spør oppgaven etter kroner, gang brøken med skatten. Et prisfall oppgis som et positivt beløp.</p>'
        '<p><b>Kontroll:</b> ∂P/∂t − ∂p/∂t = 1. ∂p/∂t ligger mellom −1 og 0, ∂P/∂t mellom 0 og 1.</p>'
        '<p><b>Felle:</b> å bytte tellerne eller glemme D′ i nevneren.</p>'
    ),
    'ins-mono1': (
        '<p><b>Steg 1: grenseinntekten.</b> Med invers etterspørsel P = a − bx er MR = a − 2bx.</p>'
        '<p><b>Steg 2: skatten i grensekostnaden.</b> Sett MR = MC + t og løs for x.</p>'
        '<p><b>Steg 3: pris eller proveny.</b> Sett x inn i etterspørselen for å få prisen. Proveny er t × det nye kvantumet. Pass på enheten til x.</p>'
        '<p><b>Kontroll:</b> med lineær etterspørsel og konstant grensekostnad stiger prisen med halve skatten.</p>'
        '<p><b>Felle:</b> å sette prisen lik MC + t, som i frikonkurranse, eller legge hele skatten på prisen.</p>'
    ),
    'ins-kap1': (
        '<p><b>Steg 1: hvem bærer skatten?</b> Antallet er fast, så tilbudet er perfekt uelastisk. Eieren bærer hele skatten, uansett hvem som betaler den inn.</p>'
        '<p><b>Steg 2: ny netto inntekt.</b> Leien minus den årlige skatten.</p>'
        '<p><b>Steg 3: ny pris.</b> En evig årlig inntekt er verdt inntekten delt på avkastningskravet.</p>'
        '<p><b>Kontroll:</b> prisfallet er skatten delt på avkastningskravet, altså nåverdien av skatten for all framtid.</p>'
        '<p><b>Felle:</b> å trekke fra bare ett års skatt eller dele skatten med leietakerne.</p>'
    ),
    'ins-grense1-P': (
        '<p><b>Steg 1: les ordlyden.</b> Avgjør hvilken kurve som er loddrett eller vannrett. «Må ha uansett pris» og «fast antall» betyr helning null. En gitt pris betyr uendelig helning på den siden prisen er gitt for.</p>'
        '<p><b>Steg 2: hvem bærer?</b> D′ = 0 eller S′ → ∞ gir kjøperne hele skatten. S′ = 0 eller D′ → −∞ gir selgerne hele.</p>'
        '<p><b>Steg 3: prisene.</b> Bærer kjøperne alt, stiger det de betaler med t mens selgernes pris står stille. Bærer selgerne alt, står kjøpernes pris stille mens selgernes faller med t.</p>'
        '<p><b>Felle:</b> spørsmålet gjelder det kjøperne betaler i alt, ikke det selgerne sitter igjen med.</p>'
    ),
    'ins-grense1-p': (
        '<p><b>Steg 1: les ordlyden.</b> Avgjør hvilken kurve som er loddrett eller vannrett. «Må ha uansett pris» og «fast antall» betyr helning null. En gitt pris betyr uendelig helning på den siden prisen er gitt for.</p>'
        '<p><b>Steg 2: hvem bærer?</b> D′ = 0 eller S′ → ∞ gir kjøperne hele skatten. S′ = 0 eller D′ → −∞ gir selgerne hele.</p>'
        '<p><b>Steg 3: prisene.</b> Bærer kjøperne alt, stiger det de betaler med t mens selgernes pris står stille. Bærer selgerne alt, står kjøpernes pris stille mens selgernes faller med t.</p>'
        '<p><b>Felle:</b> spørsmålet gjelder det selgerne sitter igjen med etter skatt, ikke det kjøperne betaler.</p>'
    ),
    'ins-form1-dp': (
        '<p><b>Utled.</b> Deriver D(p + t) = S(p) med hensyn på t. Venstresiden gir D′ × (∂p/∂t + 1). Samle leddene med ∂p/∂t på én side og del.</p>'
        '<p><b>Test med tall.</b> Sett inn lovlige helninger, for eksempel D′ = −2 og S′ = 3, i hvert alternativ.</p>'
        '<p><b>Krav:</b> ∂p/∂t må være negativ og større enn −1. Nevneren må være positiv for alle lovlige helninger.</p>'
        '<p><b>Felle:</b> telleren byttet, fortegnet i nevneren snudd, nevneren forkortet og brøker som alltid er en konstant.</p>'
    ),
    'ins-form1-dP': (
        '<p><b>Utled.</b> Deriver D(p + t) = S(p) med hensyn på t. Venstresiden gir D′ × (∂p/∂t + 1). Samle leddene med ∂p/∂t på én side og del.</p>'
        '<p><b>Så konsumentprisen.</b> Kilen P = p + t gir ∂P/∂t = ∂p/∂t + 1. Skriv 1 med samme nevner og legg sammen.</p>'
        '<p><b>Test med tall.</b> Sett inn lovlige helninger, for eksempel D′ = −2 og S′ = 3, i hvert alternativ.</p>'
        '<p><b>Krav:</b> ∂P/∂t må ligge mellom 0 og 1. Differansen ∂P/∂t − ∂p/∂t skal bli nøyaktig 1.</p>'
    ),
    'ins-form1-forhold': (
        '<p><b>Utled.</b> Deriver D(p + t) = S(p) med hensyn på t. Venstresiden gir D′ × (∂p/∂t + 1). Samle leddene med ∂p/∂t på én side og del.</p>'
        '<p><b>Del brøkene.</b> Finn ∂P/∂t = ∂p/∂t + 1. Skriv begge med samme nevner og del den ene på den andre. Nevneren forkortes bort.</p>'
        '<p><b>Krav:</b> prisene beveger seg i hver sin retning, så forholdet må være negativt.</p>'
        '<p><b>Test med tall.</b> Sett inn lovlige helninger, for eksempel D′ = −2 og S′ = 3, i hvert alternativ.</p>'
    ),
    'ins-form1-diff': (
        '<p><b>Bruk kilen.</b> P − p er alltid lik skatten t. Spør hva den deriverte av differansen med hensyn på t da må være.</p>'
        '<p><b>Eller regn.</b> Trekk de to brøkene fra hverandre. De har samme nevner, så bare tellerne trekkes fra.</p>'
        '<p><b>Test med tall.</b> Sett inn lovlige helninger, for eksempel D′ = −2 og S′ = 3, i hvert alternativ.</p>'
        '<p><b>Felle:</b> summen av de to er ikke det samme som differansen.</p>'
    ),
    'ins-form1-selg': (
        '<p><b>Utled.</b> Deriver D(p + t) = S(p) med hensyn på t. Venstresiden gir D′ × (∂p/∂t + 1). Samle leddene med ∂p/∂t på én side og del.</p>'
        '<p><b>Fra endring til andel.</b> Produsentens andel er hvor mye p faller per krone skatt. Snu fortegnet på ∂p/∂t.</p>'
        '<p><b>Krav:</b> andelen er positiv og under 1. Den skal summere til 1 med konsumentens andel ∂P/∂t.</p>'
        '<p><b>Test med tall.</b> Sett inn lovlige helninger, for eksempel D′ = −2 og S′ = 3, i hvert alternativ.</p>'
    ),
    'ins-s01': (
        '<p><b>Steg 1: oversett ordlyden.</b> Fast antall betyr at tilbudskurven er loddrett. Helningen S′ er null.</p>'
        '<p><b>Steg 2: sett inn i formelen.</b> ∂P/∂t har S′ i telleren og S′ − D′ i nevneren. Sett inn S′ og regn.</p>'
        '<p><b>Kontroll:</b> ∂P/∂t − ∂p/∂t = 1. Finn ∂p/∂t på samme måte og sjekk.</p>'
        '<p><b>Felle:</b> å snu grensetilfellet. Spør deg hvem som ikke kan unngå skatten.</p>'
    ),
    'ins-s02': (
        '<p><b>Steg 1: oversett ordlyden.</b> Et perfekt substitutt til fast pris betyr vannrett etterspørsel. D′ går mot minus uendelig.</p>'
        '<p><b>Steg 2: ta grensen.</b> Del teller og nevner i ∂p/∂t = D′/(S′ − D′) på D′. Se hva S′/D′ går mot.</p>'
        '<p><b>Kontroll:</b> ∂P/∂t − ∂p/∂t = 1. Finn ∂P/∂t på samme måte og sjekk.</p>'
        '<p><b>Felle:</b> å snu grensetilfellet. Spør deg hvem som har et fullgodt alternativ.</p>'
    ),
    'ins-s03': (
        '<p><b>Steg 1: les tallene.</b> ∂P/∂t = 1 og ∂p/∂t = 0 betyr at kjøperen bærer hele skatten.</p>'
        '<p><b>Steg 2: når skjer det?</b> Når D′ = 0 eller S′ → ∞.</p>'
        '<p><b>Steg 3: oversett hvert tilfelle til en helning.</b> «Må ha uansett pris», «fast antall», «gitt pris på salgssiden» og «like elastisiteter» gir hver sin helning.</p>'
        '<p><b>Felle:</b> en gitt verdenspris for den som selger betyr perfekt elastisk etterspørsel for selgerne, ikke perfekt elastisk tilbud.</p>'
    ),
    'ins-s04': (
        '<p><b>Steg 1: følg tilbudskurven.</b> x = S(p), så kjerneregelen gir ∂x/∂t = S′ × ∂p/∂t.</p>'
        '<p><b>Steg 2: sett inn.</b> Bruk uttrykket for ∂p/∂t fra utledningen av likevekten.</p>'
        '<p><b>Kontroll:</b> følg etterspørselen i stedet. Med x = D(P) ganger du D′ med ∂P/∂t. Svaret skal bli det samme og være negativt.</p>'
        '<p><b>Felle:</b> et uttrykk for en prisendring er ikke en kvantumsendring.</p>'
    ),
    'ins-s05': (
        '<p><b>Steg 1: start med helningene.</b> Kjøperens andel er ∂P/∂t, med S′ i telleren og S′ − D′ i nevneren.</p>'
        '<p><b>Steg 2: gang med pris delt på kvantum.</b> Gang teller og nevner med P/x. Hver helning ganget med P/x er en elastisitet.</p>'
        '<p><b>Kontroll:</b> den minst elastiske siden skal bære mest. Andelene skal summere til 1.</p>'
        '<p><b>Felle:</b> hvilken elastisitet som står i telleren.</p>'
    ),
    'ins-s06': (
        '<p><b>Steg 1: kjenn igjen funksjonen.</b> D(p + t) er en sammensatt funksjon.</p>'
        '<p><b>Steg 2: kjerneregelen.</b> Ytre derivert ganger indre derivert. Den ytre er D′.</p>'
        '<p><b>Steg 3: den indre.</b> Spør hvor mye argumentet p + t endrer seg når t øker med én krone. Både p og t beveger seg.</p>'
        '<p><b>Felle:</b> å glemme at t selv står i argumentet.</p>'
    ),
    'ins-s07': (
        '<p><b>Steg 1: tilpasningen.</b> Monopolisten setter MR = MC. Skatten legges til grensekostnaden.</p>'
        '<p><b>Steg 2: regn generelt.</b> Med P = a − bx er MR = a − 2bx. Løs for x med og uten skatt og sett inn i etterspørselen.</p>'
        '<p><b>Steg 3: sammenlign.</b> Se hvor mye prisen endres per krone skatt.</p>'
        '<p><b>Felle:</b> å tro at markedsmakt gir full overvelting, eller bruke frikonkurranseformelen.</p>'
    ),
    'ins-s08': (
        '<p>Skill formell og reell insidens. Den som betaler inn til staten, er ikke nødvendigvis den som taper. Behandle arbeid som en vare: arbeidstakerne tilbyr, arbeidsgiverne etterspør og avgiften er en kile mellom dem. Spør: hva avgjør hvordan en stykkskatt fordeles i et vanlig marked? Gjelder det samme her? Test hvert alternativ mot svaret.</p>'
    ),
    'ins-s09': (
        '<p><b>Steg 1: skriv begge likevektene.</b> Én når selgerne betaler inn og én når kjøperne betaler inn. I begge er kilen P = p + t.</p>'
        '<p><b>Steg 2: sammenlign ligningene.</b> Er noe i tilbudet eller etterspørselen endret?</p>'
        '<p><b>Felle:</b> å blande prisen i hyllen med det kjøperne betaler i alt. Når innkrevingen flyttes, endres hva prisen i hyllen inneholder.</p>'
    ),
    'ins-s10': (
        '<p><b>Steg 1: hva elastisitet betyr.</b> Hvor lett en side kan endre kvantumet når prisen endres.</p>'
        '<p><b>Steg 2: tenk på velting.</b> Spør hvem som kan velte skatten over på den andre siden. Hva skjer med salget hvis den andre siden lett kan gå et annet sted?</p>'
        '<p><b>Felle:</b> alternativer om innbetaling eller markedsmakt. I frikonkurranse har ingen markedsmakt.</p>'
    ),
    'ins-s11': (
        '<p><b>Steg 1: formelen.</b> Dødvektstap = ½ × t × kvantumsfallet.</p>'
        '<p><b>Steg 2: test hvert alternativ.</b> Spør hva som skjer med kvantumsfallet. Faller ikke kvantumet, finnes ingen trekant.</p>'
        '<p><b>Steg 3: skatten dobles.</b> Både høyden og bredden i trekanten vokser med t.</p>'
        '<p><b>Felle:</b> å blande proveny eller byrde med tap.</p>'
    ),
    'ins-s12': (
        '<p><b>Steg 1: oversett ordlyden.</b> «Reiser like mye uansett pris» og «konstant og lik grensekostnad» gir hver sin helning.</p>'
        '<p><b>Steg 2: tilskudd er negativ skatt.</b> Å fjerne tilskuddet virker som å innføre en stykkskatt.</p>'
        '<p><b>Steg 3: bruk grensetilfellet.</b> Sett helningene inn i ∂P/∂t og i kvantumsendringen.</p>'
        '<p><b>Felle:</b> autopilotsvaret der pris opp alltid gir kvantum ned.</p>'
    ),
    'ins-s13': (
        '<p><b>Steg 1: skriv brøken.</b> ∂P/∂t er S′ delt på S′ + |D′|.</p>'
        '<p><b>Steg 2: fortegn og størrelse.</b> Er teller og nevner positive? Kan telleren bli større enn nevneren?</p>'
        '<p><b>Steg 3: intervallet.</b> Det gir grensene ∂P/∂t må ligge innenfor. Stryk alle verdier som ligger innenfor.</p>'
        '<p><b>Felle:</b> å lete etter den riktige verdien. Her spør oppgaven etter den umulige.</p>'
    ),
    'ins-s14': (
        '<p><b>Tre krav.</b> ∂P/∂t ligger mellom 0 og 1. ∂p/∂t ligger mellom −1 og 0. Differansen ∂P/∂t − ∂p/∂t er nøyaktig 1.</p>'
        '<p><b>Fremgangsmåte.</b> Sjekk hvert par mot alle tre kravene. Stryk et par så snart ett krav brytes.</p>'
        '<p><b>Felle:</b> et par kan oppfylle ett krav og bryte et annet. Differansen alene er ikke nok.</p>'
    ),
    'ins-s15': (
        '<p>Skill formell og reell insidens. Selskaper betaler inn, men bare mennesker kan bære en skatt: eiere, arbeidere eller kunder.</p><p><b>Steg 1:</b> hva gjør investorene når avkastningen etter skatt faller i selskapssektoren?</p><p><b>Steg 2:</b> hva skjer med avkastningen i sektorer uten selskapsskatt når kapitalen flytter dit?</p><p><b>Steg 3:</b> avgjør hvilken gruppe som til slutt får lavere avkastning. Er den gruppen større enn selskapssektoren?</p>'
    ),
    'ins-s16': (
        '<p><b>Steg 1: hva et tosidig marked er.</b> Avisen har to kundegrupper som trenger hverandre: lesere og annonsører.</p>'
        '<p><b>Steg 2: verdien av en leser.</b> Spør hva én leser til er verdt i annonsemarkedet. Kan det lønne seg å holde prisen lav for leserne selv om de skattlegges?</p>'
        '<p><b>Felle:</b> regler fra frikonkurranse eller monopol med én kundegruppe gjelder ikke her.</p>'
    ),
    'ins-s17': (
        '<p>Se på forløpet. Staten lover en fordel for å få folk til å investere. Når mange har investert og ikke kan angre, lønner det seg for staten å endre politikken.</p><p><b>Steg 1:</b> gi en kort definisjon av hvert av de fire begrepene.</p><p><b>Steg 2:</b> hvilket begrep handler om at det som er optimalt å love i dag, ikke er optimalt å holde senere?</p>'
    ),
    'ins-s18': (
        '<p><b>Steg 1: hvor tapet kommer fra.</b> Dødvektstapet kommer av at kvantumet faller.</p>'
        '<p><b>Steg 2: hvor er tapet minst?</b> Spør hvor kvantumet reagerer minst på en avgift. Der koster en krone i proveny minst i tap.</p>'
        '<p><b>Felle:</b> å blande effektivitet med hvem som bærer avgiften.</p>'
    ),
    'ins-s19': (
        '<p><b>Steg 1: sett inn D′ = 0.</b> Regn ∂P/∂t, ∂p/∂t og kvantumsendringen.</p>'
        '<p><b>Steg 2: les av.</b> Hvem bærer avgiften? Endres kvantumet?</p>'
        '<p><b>Steg 3: dødvektstapet.</b> ½ × t × kvantumsfallet.</p>'
        '<p><b>Felle:</b> å tro at den som ikke kan tilpasse seg, gir stort tap. Tapet er handler som forsvinner.</p>'
    ),
    'ins-s20': (
        '<p><b>Steg 1: hvem har lav årsinntekt?</b> Er de fattige over hele livet, eller er de i en bestemt livsfase?</p>'
        '<p><b>Steg 2: hva det gjør med målingen.</b> Tenk på forbruksskatter målt mot årsinntekt for dem som bruker av lån eller sparing.</p>'
        '<p><b>Felle:</b> alternativer med faktafeil om hvem som betaler hvilke skatter.</p>'
    ),
    'ins-s21': (
        '<p><b>Steg 1: skriv elastisitetene.</b> En elastisitet er helning ganget med pris delt på kvantum.</p>'
        '<p><b>Steg 2: sett inn.</b> Sett begge inn i andelen med elastisiteter. Se hvilke faktorer som er like i teller og nevner i startpunktet.</p>'
        '<p><b>Felle:</b> langs en rett linje er helningen konstant, men elastisiteten er det ikke.</p>'
    ),
    'ins-s22': (
        '<p><b>Vurder hver påstand for seg.</b> I: utled kjøperens andel fra ∂P/∂t ved å gange teller og nevner med pris delt på kvantum. II: avgjør helningene eller innbetalingen hvem som bærer?</p>'
        '<p><b>Test II.</b> Tenk på et grensetilfelle der selgerne betaler inn, men etterspørselen er perfekt uelastisk.</p>'
        '<p><b>Svar.</b> Velg ut fra hvor mange av påstandene som holder.</p>'
    ),
    'ins-s23': (
        '<p><b>Vurder hver påstand for seg.</b> I: skatten betales av enhetene som omsettes. Er det kvantumet før eller etter skatten?</p>'
        '<p><b>II:</b> sett S′ = 0 inn i kvantumsendringen og i dødvektstapet ½ × t × kvantumsfallet.</p>'
        '<p><b>Svar.</b> Velg ut fra hvor mange av påstandene som holder.</p>'
    ),
    'ins-s24': (
        '<p><b>Vurder hver påstand for seg.</b> I: del teller og nevner i ∂P/∂t på S′ og la S′ gå mot uendelig.</p>'
        '<p><b>II:</b> monopolisten setter MR = MC + t. Med P = a − bx er MR = a − 2bx. Løs for prisen og se hvor mye den stiger per krone skatt.</p>'
        '<p><b>Svar.</b> Velg ut fra hvor mange av påstandene som holder.</p>'
    ),
    'ins-s25': (
        '<p><b>Vurder hver påstand for seg.</b> I: har oligopol en fast regel for overveltingen, eller avhenger den av konkurranseformen?</p>'
        '<p><b>II:</b> tenk på en plattform med to kundegrupper, som en avis med lesere og annonsører.</p>'
        '<p><b>Svar.</b> Velg ut fra hvor mange av påstandene som holder. Påstander med «alltid» og «aldri» tåler sjelden et moteksempel.</p>'
    ),
    'ins-s26': (
        '<p><b>Steg 1: tilskudd er negativ skatt.</b> Samme fordelingsregel gjelder.</p>'
        '<p><b>Steg 2: regelen.</b> Kjøperens andel er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Spør hvilken side som er minst elastisk.</p>'
        '<p><b>Felle:</b> hvem tilskuddet utbetales til, avgjør ikke hvem som får fordelen.</p>'
    ),
    'ins-s27': (
        '<p><b>Steg 1: hva elastisk betyr.</b> Kvantumet reagerer sterkt på prisen. Perfekt elastisk tilbud er en vannrett tilbudskurve.</p>'
        '<p><b>Steg 2: test hvert alternativ.</b> Reagerer tilbudt mengde uendelig sterkt på prisen, eller ikke i det hele tatt?</p>'
        '<p><b>Felle:</b> beskrivelser av etterspørselen i stedet for tilbudet.</p>'
    ),
    'ins-s28': (
        '<p><b>Steg 1: formelen.</b> Dødvektstap = ½ × t² × |S′D′|/(S′ − D′). Med rette linjer er brøken konstant.</p>'
        '<p><b>Steg 2: forholdet.</b> Regn forholdet mellom ny og gammel skatt og opphøy det i andre.</p>'
        '<p><b>Steg 3: nytt tap.</b> Gang det gamle tapet med dette.</p>'
        '<p><b>Felle:</b> å svare med økningen i tapet i stedet for det nye tapet.</p>'
    ),
    'ins-s29': (
        '<p><b>Steg 1: hvem bærer skatten?</b> Antallet hytter er fast, så tilbudet er perfekt uelastisk.</p>'
        '<p><b>Steg 2: hva prisen er.</b> Prisen er nåverdien av framtidig netto inntekt. Spør når kjøperne begynner å regne med skatten.</p>'
        '<p><b>Felle:</b> å tro at det skjer når skatten innføres, eller at senere kjøpere taper.</p>'
    ),
    'ins-s30': (
        '<p><b>Steg 1: gevinsten av én handel.</b> Kjøperens betalingsvilje minus selgerens kostnad.</p>'
        '<p><b>Steg 2: de tapte handlene.</b> Hvor stor er gevinsten for den første handelen som forsvinner og for den siste? Hvordan endrer den seg mellom dem langs rette linjer?</p>'
        '<p><b>Felle:</b> et rektangel ville bety at alle tapte handler hadde like stor gevinst.</p>'
    ),
}


# ---------------------------------------------------------------------------
# Lokale hjelpere
# ---------------------------------------------------------------------------
def d2(x):
    """Tall med to desimaler: −0,40."""
    return tall(x, 2)


def ledd(x):
    """«+ 600» eller «− 600», til å skrive ut et ledd i en ligning."""
    return f"+ {tall(x)}" if x >= 0 else f"− {tall(-x)}"


def tilbud_hs(d, c):
    """Høyresiden i tilbudskurven x = dp − c."""
    if c > 0:
        return f"{tall(d)}p − {tall(c)}"
    return f"{tall(d)}p + {tall(-c)}"


_BRUKT = {}


def unik(fam, *nokkel):
    """Avvis en variant som har nøyaktig de samme tallene som en tidligere variant i familien."""
    sett = _BRUKT.setdefault(fam, set())
    if nokkel in sett:
        raise Avvis("samme tall som en tidligere variant")
    sett.add(nokkel)


VARER = [("en sportsdrikk", "flasker"), ("ved", "sekker"), ("kaffekapsler", "esker"),
         ("sykkelslanger", "stykk"), ("solkrem", "tuber"), ("hundefôr", "sekker"),
         ("vaskemiddel", "kanner"), ("strikkegarn", "nøster")]


def marked(r, halve=False):
    """Et lineært marked x = a − bP (etterspørsel) og x = dp − c (tilbud) med
       likevekt P = p = P0 og x = x0 uten skatt. Stykkskatten er t."""
    b = r.choice([10, 15, 20, 25, 30, 40, 50, 60])
    d = r.choice([10, 15, 20, 25, 30, 40, 45, 60, 75])
    if b == d:
        raise Avvis("like helninger gir deling på midten")
    P0 = r.randrange(20, 101, 5)
    x0 = r.randrange(1000, 4001, 100)
    t = r.choice([2, 3, 4, 5, 6, 8, 10, 12])
    N = b + d
    kjop = t * d / N                 # kjøperens prisøkning
    selg = t * b / N                 # selgerens prisfall
    if not heltall(kjop * (2 if halve else 4)):
        raise Avvis("ujevn deling av skatten")
    fall = b * kjop                  # kvantumsfallet
    if not heltall(fall):
        raise Avvis("kvantumsfallet er ikke helt")
    a = x0 + b * P0
    c = d * P0 - x0
    if c == 0:
        raise Avvis("tilbudskurven gjennom origo")
    return dict(b=b, d=d, P0=P0, x0=x0, t=t, N=N, kjop=kjop, selg=selg, fall=fall,
                xt=x0 - fall, a=a, c=c, P=P0 + kjop, p=P0 - selg)


def marked_tekst(m, vare, enh):
    return (f"<p>Etterspørselen etter {vare} er x = {tall(m['a'])} − {tall(m['b'])}P og tilbudet er "
            f"x = {tilbud_hs(m['d'], m['c'])}. Her er P det kjøperen betaler i alt per enhet, p det selgeren "
            f"sitter igjen med per enhet og x antall {enh} i uka. Uten skatt er P = p = {kr(m['P0'])} og "
            f"x = {tall(m['x0'])}.</p>")


def innkrevd_tekst(hvem, t):
    if hvem == "selger":
        return f"Staten innfører en stykkskatt på {kr(t)} per enhet, som selgerne betaler inn."
    return (f"Staten innfører en stykkskatt på {kr(t)} per enhet, som kjøperne betaler inn: de betaler selgeren "
            f"prisen p og i tillegg {kr(t)} direkte til staten.")


def likevekt_steg(m):
    """Steg 1 og 2 i en gjennomgang: sett kilen inn i likevekten og løs."""
    a, b, d, c, t, N = m["a"], m["b"], m["d"], m["c"], m["t"], m["N"]
    return (f"<p><b>Steg 1: sett kilen inn i likevekten.</b> Kjøperen møter P = p + {tall(t)}. Etterspurt mengde ved "
            f"den prisen skal være lik tilbudt mengde ved p: {tall(a)} − {tall(b)}(p + {tall(t)}) = "
            f"{tilbud_hs(d, c)}. Samle p-leddene på høyre side: {tall(a - b * t)} {ledd(c)} = {tall(N)}p, "
            f"altså p = {tall(a - b * t + c)}/{tall(N)} = {kra(m['p'])}.</p>"
            f"<p><b>Steg 2: prisen kjøperen betaler.</b> P = p + t = {talla(m['p'])} + {tall(t)} = {kra(m['P'])}. "
            f"Kvantumet blir {tall(a)} − {tall(b)} × {talla(m['P'])} = {tall(m['xt'])}.</p>")


def formel_steg(m):
    b, d, N = m["b"], m["d"], m["N"]
    return (f"<p><b>Samme svar med formlene.</b> D′ = −{tall(b)} og S′ = {tall(d)}, så nevneren er "
            f"S′ − D′ = {tall(d)} + {tall(b)} = {tall(N)}. ∂P/∂t = {tall(d)}/{tall(N)} = {d2(d / N)} og "
            f"∂p/∂t = −{tall(b)}/{tall(N)} = {d2(-b / N)}. Kjøperen bærer altså {tall(d)}/{tall(N)} × {tall(m['t'])} = "
            f"{kra(m['kjop'])} per enhet. Selgeren bærer {tall(b)}/{tall(N)} × {tall(m['t'])} = {kra(m['selg'])}.</p>")


# ---------------------------------------------------------------------------
# ins-lin1 · Ny konsument- eller produsentpris med lineære kurver
# ---------------------------------------------------------------------------
@familie("ins-lin1", tema="insidens", antall=6, tittel="Ny pris etter stykkskatt, lineære kurver", hjelp=HJELP["ins-lin1"])
def _(r):
    m = marked(r)
    vare, enh = r.choice(VARER)
    hvem = r.choice(["selger", "kjoper"])
    spor = r.choice(["P", "p"])
    P0, t, P, p = m["P0"], m["t"], m["P"], m["p"]
    b, d, N = m["b"], m["d"], m["N"]

    if spor == "P":
        riktig = P
        swap = P0 + m["selg"]
        full = P0 + t
        halv = P0 + t / 2
        annen = p
        spm = "Hva betaler kjøperen i alt per enhet i den nye likevekten?"
        f_swap = (f"Andelene byttet om: kjøperen er tildelt |D′|/(S′ − D′) = {tall(b)}/{tall(N)} av skatten, altså "
                  f"{tall(P0)} + {talla(m['selg'])}. Det er selgerens andel.")
        f_full = (f"Hele skatten lagt på kjøperen: {tall(P0)} + {tall(t)}. "
                  + ("At kjøperen betaler skatten inn, avgjør ikke hvem som bærer den." if hvem == "kjoper" else
                     "Det skjer bare når etterspørselen er perfekt uelastisk eller tilbudet perfekt elastisk."))
        f_halv = (f"Skatten delt på midten: {tall(P0)} + {tall(t)}/2. Lik deling krever like helninger, men her er "
                  f"|D′| = {tall(b)} og S′ = {tall(d)}.")
        f_annen = f"Dette er det selgeren sitter igjen med, p = {talla(P)} − {tall(t)}. Spørsmålet gjelder kjøperen."
    else:
        riktig = p
        swap = P0 - m["kjop"]
        full = P0 - t
        halv = P0 - t / 2
        annen = P
        spm = "Hva sitter selgeren igjen med per enhet i den nye likevekten?"
        f_swap = (f"Andelene byttet om: selgeren er tildelt S′/(S′ − D′) = {tall(d)}/{tall(N)} av skatten, altså "
                  f"{tall(P0)} − {talla(m['kjop'])}. Det er kjøperens andel.")
        f_full = (f"Hele skatten lagt på selgeren: {tall(P0)} − {tall(t)}. "
                  + ("At selgeren betaler skatten inn, avgjør ikke hvem som bærer den." if hvem == "selger" else
                     "Det skjer bare når tilbudet er perfekt uelastisk eller etterspørselen perfekt elastisk."))
        f_halv = (f"Skatten delt på midten: {tall(P0)} − {tall(t)}/2. Lik deling krever like helninger, men her er "
                  f"|D′| = {tall(b)} og S′ = {tall(d)}.")
        f_annen = f"Dette er det kjøperen betaler i alt, P = {talla(p)} + {tall(t)}. Spørsmålet gjelder selgeren."

    tredje = r.choice(["full", "halv"])
    f3 = F(kra(full), f_full, full) if tredje == "full" else F(kra(halv), f_halv, halv)
    ulike(riktig, swap, annen, f3.verdi, rel=0.004)

    q = (marked_tekst(m, vare, enh) + f"<p>{innkrevd_tekst(hvem, t)}</p><p>{spm}</p>")
    alternativer = [R(kra(riktig), riktig), F(kra(swap), f_swap, swap), F(kra(annen), f_annen, annen), f3]

    if spor == "P":
        kort = (f"<p><b>{kra(P)}.</b> Med P = p + {tall(t)} i likevekten blir p = {kra(p)} og P = {kra(P)}. "
                f"Kjøperen bærer S′/(S′ − D′) = {tall(d)}/{tall(N)} av skatten: {tall(P0)} + {talla(m['kjop'])}.</p>")
    else:
        kort = (f"<p><b>{kra(p)}.</b> Med P = p + {tall(t)} i likevekten blir p = {kra(p)}. Selgeren bærer "
                f"|D′|/(S′ − D′) = {tall(b)}/{tall(N)} av skatten: {tall(P0)} − {talla(m['selg'])}.</p>")

    full_txt = (
        f"<p><b>Hva en stykkskatt gjør.</b> En stykkskatt på {kr(t)} per enhet legger en kile mellom det kjøperen "
        f"betaler og det selgeren beholder: P = p + t. Det spiller ingen rolle hvem som betaler skatten inn, for "
        f"likevekten blir den samme ligningen. Helningene på de to kurvene avgjør hvor mye av kilen hver side tar.</p>"
        + likevekt_steg(m) + formel_steg(m)
        + f"<p><b>Kontroll.</b> Kvantumet skal gå opp på begge kurvene: {tall(m['a'])} − {tall(b)} × {talla(P)} = "
          f"{tall(m['xt'])} og {tall(d)} × {talla(p)} {ledd(-m['c'])} = {tall(m['xt'])} ✓. Og prisendringene "
          f"{talla(m['kjop'])} + {talla(m['selg'])} = {tall(t)} = t ✓.</p>"
          f"<p><b>Husk:</b> sett P = p + t inn i likevekten. Den siden som reagerer minst på prisen, bærer mest.</p>"
    )
    return sporsmal(q, alternativer, kort, full_txt)


# ---------------------------------------------------------------------------
# ins-lin2 · Proveny med lineære kurver
# ---------------------------------------------------------------------------
@familie("ins-lin2", tema="insidens", antall=5, tittel="Proveny av en stykkskatt", hjelp=HJELP["ins-lin2"])
def _(r):
    m = marked(r)
    vare, enh = r.choice(VARER)
    hvem = r.choice(["selger", "kjoper"])
    t, x0, xt, b = m["t"], m["x0"], m["xt"], m["b"]
    riktig = t * xt
    kand = [
        F(kra(t * x0), f"Gammelt kvantum brukt: {tall(t)} × {tall(x0)}. Skatten betales bare av enhetene som "
                       f"fortsatt omsettes, {tall(xt)}.", t * x0),
        F(kra(m["kjop"] * xt), f"Bare kjøpernes del: {talla(m['kjop'])} × {tall(xt)}. Staten får hele kilen på "
                               f"{tall(t)} per enhet, også delen selgerne bærer.", m["kjop"] * xt),
        F(kra(t * (x0 - b * t)), f"Kvantumet regnet som om kjøperen bar hele skatten: {tall(x0)} − {tall(b)} × "
                                 f"{tall(t)} = {tall(x0 - b * t)}, så {tall(t)} × {tall(x0 - b * t)}. Prisen kjøperen "
                                 f"betaler, stiger bare med {talla(m['kjop'])}.", t * (x0 - b * t)),
        F(kra(t * m["fall"] / 2), f"Dette er dødvektstapet, ½ × {tall(t)} × {tall(m['fall'])}, ikke provenyet.",
          t * m["fall"] / 2),
    ]
    r.shuffle(kand)
    valgt = kand[:3]
    ulike(riktig, *[a.verdi for a in valgt], rel=0.01)

    q = (marked_tekst(m, vare, enh) + f"<p>{innkrevd_tekst(hvem, t)}</p>"
         f"<p>Hvor stort blir statens proveny av skatten per uke?</p>")
    kort = (f"<p><b>{kra(riktig)}.</b> Ny likevekt gir P = {kra(m['P'])}, p = {kra(m['p'])} og x = {tall(xt)}. "
            f"Provenyet er skatten ganger det nye kvantumet: {tall(t)} × {tall(xt)}.</p>")
    full_txt = (
        f"<p><b>Hva proveny er.</b> Provenyet er det staten får inn: skatten per enhet ganger antall enheter som "
        f"faktisk omsettes etter at skatten er innført. Skatten gjør varen dyrere for kjøperen og mindre lønnsom "
        f"for selgeren. Derfor faller kvantumet. Det er det nye kvantumet som teller.</p>"
        + likevekt_steg(m)
        + f"<p><b>Steg 3: provenyet.</b> {tall(t)} × {tall(xt)} = <b>{kra(riktig)}</b>.</p>"
          f"<p><b>Kontroll.</b> Kvantumsfallet skal være S′ × selgerens prisfall og |D′| × kjøperens prisøkning: "
          f"{tall(m['d'])} × {talla(m['selg'])} = {tall(m['fall'])} og {tall(b)} × {talla(m['kjop'])} = "
          f"{tall(m['fall'])} ✓. Da er {tall(x0)} − {tall(m['fall'])} = {tall(xt)} riktig kvantum.</p>"
          f"<p><b>Husk:</b> proveny = t × nytt kvantum. Det gamle kvantumet overvurderer provenyet med t × "
          f"kvantumsfallet.</p>"
    )
    return sporsmal(q, [R(kra(riktig), riktig)] + valgt, kort, full_txt)


# ---------------------------------------------------------------------------
# ins-dvt1 · Dødvektstapet
# ---------------------------------------------------------------------------
@familie("ins-dvt1", tema="insidens", antall=5, tittel="Dødvektstapet av en stykkskatt", hjelp=HJELP["ins-dvt1"])
def _(r):
    m = marked(r, halve=True)
    vare, enh = r.choice(VARER)
    gitt = r.random() < 0.5
    t, fall, b = m["t"], m["fall"], m["b"]
    riktig = t * fall / 2
    rekt = t * fall
    kjtr = m["kjop"] * fall / 2
    setr = m["selg"] * fall / 2
    feil_b = t * (b * t) / 2
    kand = [
        F(kra(rekt), f"Halvparten glemt: {tall(t)} × {tall(fall)} er et rektangel. Dødvektstapet er trekanten.", rekt),
        F(kra(kjtr), f"Høyden satt til kjøperens prisøkning på {talla(m['kjop'])} i stedet for hele kilen på "
                     f"{tall(t)}: ½ × {talla(m['kjop'])} × {tall(fall)} er bare kjøpernes del av trekanten.", kjtr),
    ]
    if gitt:
        kand.append(F(kra(setr), f"Høyden satt til selgerens prisfall på {talla(m['selg'])}: ½ × {talla(m['selg'])} × "
                                 f"{tall(fall)} er bare selgernes del av trekanten.", setr))
    else:
        kand.append(F(kra(feil_b), f"Kvantumsfallet regnet som om kjøperen bar hele skatten: {tall(b)} × {tall(t)} = "
                                   f"{tall(b * t)}, så ½ × {tall(t)} × {tall(b * t)}.", feil_b))
    ulike(riktig, *[a.verdi for a in kand], rel=0.01)

    q = marked_tekst(m, vare, enh) + f"<p>{innkrevd_tekst('selger', t)}"
    if gitt:
        q += f" Ny likevekt blir P = {kra(m['P'])}, p = {kra(m['p'])} og x = {tall(m['xt'])}."
    q += "</p><p>Hvor stort blir dødvektstapet av skatten per uke?</p>"

    kort = (f"<p><b>{kra(riktig)}.</b> Kvantumet faller fra {tall(m['x0'])} til {tall(m['xt'])}, altså {tall(fall)}. "
            f"Dødvektstapet er trekanten ½ × {tall(t)} × {tall(fall)}.</p>")
    full_txt = (
        f"<p><b>Hva dødvektstapet er.</b> Skatten flytter penger fra kjøpere og selgere til staten, men den stopper "
        f"også handler som begge parter ville tjent på. Gevinsten fra de handlene får ingen. Det er dødvektstapet: "
        f"en trekant med hele kilen t som høyde og kvantumsfallet som bredde.</p>"
    )
    if not gitt:
        full_txt += likevekt_steg(m)
    else:
        full_txt += (f"<p><b>Steg 1: kvantumsfallet.</b> Kvantumet faller fra {tall(m['x0'])} til {tall(m['xt'])}, "
                     f"altså {tall(fall)} enheter.</p>")
    full_txt += (
        f"<p><b>Steg {3 if not gitt else 2}: trekanten.</b> Kvantumsfallet er {tall(m['x0'])} − {tall(m['xt'])} = "
        f"{tall(fall)}. Trekanten er ½ × {tall(t)} × {tall(fall)} = <b>{kra(riktig)}</b>. "
        f"Formelen gir det samme: ½ × t² × |S′D′|/(S′ − D′) = ½ × {tall(t * t)} × {tall(b * m['d'])}/{tall(m['N'])} "
        f"= {kra(riktig)}.</p>"
        f"<p><b>Kontroll: velferdsregnskapet.</b> Kjøperne taper {talla(m['kjop'])} × {tall(m['xt'])} + ½ × "
        f"{talla(m['kjop'])} × {tall(fall)} = {talla(m['kjop'] * m['xt'] + kjtr)}. Selgerne taper "
        f"{talla(m['selg'])} × {tall(m['xt'])} + ½ × {talla(m['selg'])} × {tall(fall)} = "
        f"{talla(m['selg'] * m['xt'] + setr)}. Til sammen {talla(t * m['xt'] + riktig)}, hvorav staten får "
        f"{tall(t)} × {tall(m['xt'])} = {talla(t * m['xt'])}. Resten, {talla(riktig)}, er dødvektstapet ✓.</p>"
        f"<p><b>Husk:</b> dødvektstap = ½ × t × kvantumsfallet. Det vokser med kvadratet av skatten.</p>"
    )
    return sporsmal(q, [R(kra(riktig), riktig)] + kand, kort, full_txt)


# ---------------------------------------------------------------------------
# ins-cs1 · Konsumentenes eller produsentenes tap
# ---------------------------------------------------------------------------
@familie("ins-cs1", tema="insidens", antall=5, tittel="Tap i konsument- eller produsentoverskudd", hjelp=HJELP["ins-cs1"])
def _(r):
    m = marked(r, halve=True)
    vare, enh = r.choice(VARER)
    hvem_spor = r.choice(["kjopere", "selgere"])
    t, fall, xt, x0 = m["t"], m["fall"], m["xt"], m["x0"]
    tap_k = m["kjop"] * xt + m["kjop"] * fall / 2
    tap_s = m["selg"] * xt + m["selg"] * fall / 2
    if hvem_spor == "kjopere":
        endr, riktig, annet = m["kjop"], tap_k, tap_s
        gruppe, motpart, ord_ = "kjøperne", "selgerne", "konsumentoverskudd"
        pris_tekst = f"Prisen kjøperne betaler, stiger med {talla(endr)} fra {tall(m['P0'])} til {talla(m['P'])}"
    else:
        endr, riktig, annet = m["selg"], tap_s, tap_k
        gruppe, motpart, ord_ = "selgerne", "kjøperne", "produsentoverskudd"
        pris_tekst = f"Prisen selgerne sitter igjen med, faller med {talla(endr)} fra {tall(m['P0'])} til {talla(m['p'])}"
    rekt = endr * xt
    rekt0 = endr * x0
    kand = [
        F(kra(rekt), f"Bare rektangelet: {talla(endr)} × {tall(xt)}. Trekanten på de {tall(fall)} enhetene som "
                     f"forsvant, ½ × {talla(endr)} × {tall(fall)}, er også et tap for {gruppe}.", rekt),
        F(kra(annet), f"Dette er tapet til {motpart}, regnet med deres prisendring.", annet),
        F(kra(rekt0), f"Hele prisendringen ganget med det gamle kvantumet: {talla(endr)} × {tall(x0)}. På enhetene "
                      f"som forsvant, er tapet bare en trekant, ikke et rektangel.", rekt0),
        F(kra(t * xt), f"Dette er statens proveny, {tall(t)} × {tall(xt)}, ikke tapet til én av sidene.", t * xt),
    ]
    r.shuffle(kand)
    valgt = kand[:3]
    ulike(riktig, *[a.verdi for a in valgt], rel=0.01)

    q = (marked_tekst(m, vare, enh) + f"<p>{innkrevd_tekst('selger', t)} Ny likevekt blir P = {kra(m['P'])}, "
         f"p = {kra(m['p'])} og x = {tall(xt)}. Kurvene er lineære, så endringene i overskudd kan regnes eksakt.</p>"
         f"<p>Hvor mye taper {gruppe} i {ord_} per uke?</p>")
    kort = (f"<p><b>{kra(riktig)}.</b> Rektangel pluss trekant: {talla(endr)} × {tall(xt)} + ½ × {talla(endr)} × "
            f"{tall(fall)} = {talla(rekt)} + {talla(endr * fall / 2)}.</p>")
    full_txt = (
        f"<p><b>Hva tapet består av.</b> {pris_tekst}. På de {tall(xt)} enhetene som fortsatt omsettes, taper "
        f"{gruppe} hele prisendringen: et rektangel. På de {tall(fall)} enhetene som ikke lenger omsettes, taper de "
        f"bare gevinsten de hadde hatt. Den krymper jevnt mot null, så tapet der er en trekant.</p>"
        f"<p><b>Steg 1: rektangelet.</b> {talla(endr)} × {tall(xt)} = {talla(rekt)}.</p>"
        f"<p><b>Steg 2: trekanten.</b> ½ × {talla(endr)} × {tall(fall)} = {talla(endr * fall / 2)}.</p>"
        f"<p><b>Steg 3: summen.</b> {talla(rekt)} + {talla(endr * fall / 2)} = <b>{kra(riktig)}</b>.</p>"
        f"<p><b>Kontroll: velferdsregnskapet.</b> {motpart.capitalize()} taper {talla(annet)}. Samlet tap er "
        f"{talla(tap_k)} + {talla(tap_s)} = {talla(tap_k + tap_s)}. Staten får {tall(t)} × {tall(xt)} = "
        f"{talla(t * xt)}. Differansen {talla(tap_k + tap_s - t * xt)} skal være dødvektstapet ½ × {tall(t)} × "
        f"{tall(fall)} = {talla(t * fall / 2)} ✓.</p>"
        f"<p><b>Hvorfor tapene er nyttige.</b> Tapene til kjøpere og selgere viser den reelle insidensen i kroner. Den siden som bærer mest av skatten, taper også mest overskudd.</p>"
        f"<p><b>Husk:</b> tapet til én side = prisendringen × nytt kvantum + ½ × prisendringen × kvantumsfallet.</p>"
    )
    return sporsmal(q, [R(kra(riktig), riktig)] + valgt, kort, full_txt)


# ---------------------------------------------------------------------------
# ins-eps1 · Elastisitetsregelen: kjøperens andel er εS/(εS + |εD|)
# ---------------------------------------------------------------------------
VARER_EPS = ["snus", "kinobilletter", "fersk laks", "frisørtimer", "brus", "sigaretter", "sykkelhjelmer",
             "iskrem", "blomster"]


@familie("ins-eps1", tema="insidens", antall=5, tittel="Fordelingen av skatten med elastisiteter", hjelp=HJELP["ins-eps1"])
def _(r):
    eS = r.choice([0.2, 0.4, 0.5, 0.6, 0.8, 1.0, 1.2, 1.5, 1.6, 2.0, 3.0])
    eD = r.choice([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0, 1.2, 1.5, 2.0, 2.4])
    if eS == eD:
        raise Avvis("like elastisiteter")
    t = r.choice([1, 2, 3, 4, 5, 6, 8, 10, 12, 15])
    P0 = r.choice([20, 25, 30, 40, 45, 50, 60, 80, 120, 150])
    if t > 0.25 * P0:
        raise Avvis("for stor skatt i forhold til prisen")
    sk = eS / (eS + eD)                     # kjøperens andel
    ss = eD / (eS + eD)                     # selgerens andel
    bk, bs = t * sk, t * ss
    if not heltall(bk * 100) or not heltall(sk * 100) or bk in (0, t):
        raise Avvis("ujevn byrde eller andel")
    vare = r.choice(VARER_EPS)
    spor = r.choice(["byrde", "P", "p"])
    efmt = lambda e: tall(e, 1) if heltall(e * 10) else tall(e, 2)  # noqa: E731
    q = (f"<p>{vare[0].upper() + vare[1:]} omsettes i frikonkurranse til {kr(P0)} per enhet. Rundt likevekten er "
         f"etterspørselselastisiteten ε<sub>D</sub> = −{efmt(eD)} og tilbudselastisiteten ε<sub>S</sub> = "
         f"{efmt(eS)}. Staten innfører en stykkskatt på {kr(t)} per enhet, innkrevd av selgerne. Bruk "
         f"elastisitetsregelen for hvordan en skatt fordeles mellom kjøpere og selgere.</p>")
    andel_txt = (f"ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) = {efmt(eS)}/({efmt(eS)} + {efmt(eD)}) = "
                 f"{efmt(eS)}/{efmt(eS + eD)}")
    if spor == "byrde":
        q += "<p>Hvor mange kroner per enhet av skatten bærer kjøperne?</p>"
        riktig = bk
        alt = [R(kra(bk), bk),
               F(kra(bs), f"Andelene byttet om: |ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|) × {tall(t)} = "
                          f"{talla(bs)} er selgernes del.", bs),
               F(kra(t), "Hele skatten lagt på kjøperne. Det skjer bare når etterspørselen er perfekt uelastisk "
                         "eller tilbudet perfekt elastisk.", t),
               F(kra(t / 2), f"Skatten delt på midten: {tall(t)}/2. Lik deling krever like elastisiteter.", t / 2)]
        kort = f"<p><b>{kra(bk)}.</b> Kjøperens andel er {andel_txt}. Ganget med skatten: {d2(sk)} × {tall(t)} = {talla(bk)}.</p>"
        sluttsteg = f"<p><b>Steg 2: kroner.</b> {d2(sk)} × {tall(t)} = <b>{kra(bk)}</b> per enhet.</p>"
    elif spor == "P":
        q += "<p>Hva blir prisen kjøperne betaler?</p>"
        riktig = P0 + bk
        alt = [R(kra(riktig), riktig),
               F(kra(P0 + bs), f"Andelene byttet om: kjøperne er tildelt selgernes del, {tall(P0)} + {talla(bs)}.",
                 P0 + bs),
               F(kra(P0 + t), f"Hele skatten veltet over på kjøperne: {tall(P0)} + {tall(t)}. Det krever perfekt "
                              f"uelastisk etterspørsel eller perfekt elastisk tilbud.", P0 + t),
               F(kra(P0 - bs), f"Dette er prisen selgerne sitter igjen med, {tall(P0)} − {talla(bs)}, ikke prisen "
                               f"kjøperne betaler.", P0 - bs)]
        kort = (f"<p><b>{kra(riktig)}.</b> Kjøperens andel er {andel_txt} = {d2(sk)}. Prisen stiger med "
                f"{d2(sk)} × {tall(t)} = {talla(bk)}.</p>")
        sluttsteg = (f"<p><b>Steg 2: kroner.</b> {d2(sk)} × {tall(t)} = {kra(bk)}. Kjøperne betaler "
                     f"{tall(P0)} + {talla(bk)} = <b>{kra(riktig)}</b>.</p>")
    else:
        q += "<p>Hva blir prisen selgerne sitter igjen med etter at skatten er betalt?</p>"
        riktig = P0 - bs
        alt = [R(kra(riktig), riktig),
               F(kra(P0 - bk), f"Andelene byttet om: selgerne er tildelt kjøpernes del, {tall(P0)} − {talla(bk)}.",
                 P0 - bk),
               F(kra(P0 - t), f"Hele skatten lagt på selgerne fordi de betaler den inn: {tall(P0)} − {tall(t)}. "
                              f"Hvem som betaler inn, avgjør ikke hvem som bærer skatten.", P0 - t),
               F(kra(P0 + bk), f"Dette er prisen kjøperne betaler, {tall(P0)} + {talla(bk)}, ikke det selgerne "
                               f"sitter igjen med.", P0 + bk)]
        kort = (f"<p><b>{kra(riktig)}.</b> Selgerens andel er |ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|) = "
                f"{efmt(eD)}/{efmt(eS + eD)} = {d2(ss)}. Prisen faller med {d2(ss)} × {tall(t)} = {talla(bs)}.</p>")
        sluttsteg = (f"<p><b>Steg 2: kroner.</b> Selgerens andel er 1 − {d2(sk)} = {d2(ss)}, altså {d2(ss)} × "
                     f"{tall(t)} = {kra(bs)}. Selgerne sitter igjen med {tall(P0)} − {talla(bs)} = "
                     f"<b>{kra(riktig)}</b>.</p>")
    ulike(*[a.verdi for a in alt], rel=0.004)
    unik("eps1", eS, eD)
    unik("eps1-vare", vare)

    minst = "etterspørselen" if eD < eS else "tilbudet"
    full_txt = (
        f"<p><b>Hva regelen sier.</b> En elastisitet måler hvor mye kvantumet reagerer når prisen endres. Den siden "
        f"som reagerer minst, har færrest alternativer å gå til. Den kan ikke unngå skatten og bærer derfor mest av "
        f"den. Kjøperens andel er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) og selgerens "
        f"|ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|). Hvem som betaler skatten inn, spiller ingen rolle.</p>"
        f"<p><b>Steg 1: kjøperens andel.</b> {andel_txt} = {d2(sk)}.</p>"
        + sluttsteg
        + f"<p><b>Kontroll.</b> Kjøpernes del delt på selgernes del skal være ε<sub>S</sub>/|ε<sub>D</sub>|: "
          f"{talla(bk)}/{talla(bs)} = {d2(bk / bs)} og {efmt(eS)}/{efmt(eD)} = {d2(eS / eD)} ✓. Med andelene byttet "
          f"ville forholdet blitt det omvendte. Det stemmer også med regelen: {minst} er minst elastisk "
          f"({efmt(min(eD, eS))} mot {efmt(max(eD, eS))}). Derfor bærer {'kjøperne' if eD < eS else 'selgerne'} "
          f"{talla(max(bk, bs))} av {tall(t)} kroner.</p>"
          f"<p><b>Husk:</b> kjøperen bærer ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Tilbudselastisiteten "
          f"står i telleren for kjøperens andel, ikke etterspørselselastisiteten.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# ins-grense1 · De fire grensetilfellene med tall (H2025 oppgave 8)
# ---------------------------------------------------------------------------
GRENSE = [
    # (kode, bærer, tekst, vare, enhet, priser, skatter, kjøperne, selgerne, prisord)
    ("D0", "kjoper", "Pasientene må ha legemiddelet uansett pris, så etterspørselen er perfekt uelastisk. "
                     "Tilbudskurven er stigende.",
     "et livsviktig legemiddel", "pakning", [120, 180, 240, 300, 450], [20, 30, 40, 60, 75],
     "kjøperne", "produsentene", "prisen"),
    ("D0", "kjoper", "Anta at etterspørselen er perfekt uelastisk, mens tilbudet er elastisk.",
     "en vare", "enhet", [1.5, 2.5, 3, 4, 6], [0.25, 0.5, 0.75, 1], "kjøperne", "selgerne", "prisen"),
    ("Sinf", "kjoper", "Varen importeres til en gitt verdenspris. Leverandørene selger så mye som helst til den "
                       "prisen og ingenting under, så tilbudet er perfekt elastisk. Etterspørselen er fallende.",
     "en importert vare", "enhet", [40, 60, 80, 120], [5, 8, 10, 12, 15], "kjøperne", "leverandørene", "prisen"),
    ("S0", "selger", "Antallet plasser er fast og kan ikke endres, så tilbudet er perfekt uelastisk. "
                     "Etterspørselen er fallende.",
     "båtplasser i en småbåthavn", "plass per sesong", [8000, 10000, 12000, 15000], [1000, 1500, 2000, 2500],
     "leietakerne", "havneeierne", "leien"),
    ("S0", "selger", "Antallet parkeringsplasser i sentrum er fast, så tilbudet er perfekt uelastisk. "
                     "Etterspørselen er fallende.",
     "parkeringsplasser i sentrum", "plass per måned", [1500, 2000, 2500, 3000], [200, 300, 400, 500],
     "leietakerne", "utleierne", "leien"),
    ("Dinf", "selger", "Produsentene selger på et verdensmarked der prisen er den samme uansett hvor mye de "
                       "selger, så etterspørselen de møter er perfekt elastisk. Tilbudet er stigende.",
     "en eksportvare", "enhet", [30, 45, 60, 90], [4, 5, 6, 8, 10], "kjøperne", "produsentene", "prisen"),
    ("Dinf", "selger", "Anta at etterspørselen er perfekt elastisk, mens tilbudet er elastisk.",
     "en vare", "enhet", [1.5, 2.5, 3, 4, 6], [0.25, 0.5, 0.75, 1], "kjøperne", "selgerne", "prisen"),
]
GRENSE_NAVN = {"D0": ("perfekt uelastisk etterspørsel", "D′ = 0"), "Sinf": ("perfekt elastisk tilbud", "S′ → ∞"),
               "S0": ("perfekt uelastisk tilbud", "S′ = 0"), "Dinf": ("perfekt elastisk etterspørsel", "D′ → −∞")}


@familie("ins-grense1", tema="insidens", antall=7, tittel="Grensetilfellene med tall")
def _(r):
    kode, baerer, tekst, vare, enh, prisliste, skattliste, K, S, prisord = r.choice(GRENSE)
    P0 = r.choice(prisliste)
    t = r.choice(skattliste)
    if t > P0 / 3:
        raise Avvis("for stor skatt")
    spor = r.choice(["P", "p"])
    kan_kjoper = kode == "S0" or vare == "en vare"
    innkrever = r.choice(["selger", "kjoper"]) if kan_kjoper else "selger"
    navn, helning = GRENSE_NAVN[kode]
    if baerer == "kjoper":
        P, p = P0 + t, P0
    else:
        P, p = P0, P0 - t
    kp = lambda x: kra(x) if P0 >= 10 else kr(x, 2)  # noqa: E731
    tl = lambda x: talla(x) if P0 >= 10 else tall(x, 2)  # noqa: E731

    if innkrever == "selger":
        inn_txt = f"Myndighetene innfører en stykkskatt på {kp(t)} per {enh}, som {S} betaler inn."
        spm_P = f"Hva betaler {K} per {enh} etter at skatten er innført?"
    else:
        inn_txt = (f"Myndighetene innfører en stykkskatt på {kp(t)} per {enh}, som {K} betaler inn direkte til "
                   f"staten i tillegg til {prisord} de betaler {S}.")
        spm_P = f"Hva betaler {K} i alt per {enh} etter at skatten er innført, skatten medregnet?"
    if spor == "P":
        riktig = P
        spm = spm_P
        if baerer == "kjoper":
            alt = [F(kp(P0), f"Grensetilfellet snudd: det {K} betaler, står stille når {S} bærer alt. Det skjer ved "
                             f"perfekt uelastisk tilbud eller perfekt elastisk etterspørsel.", P0),
                   F(kp(P0 + 2 * t), f"Skatten lagt på to ganger: {tl(P0)} + {tl(t)} + {tl(t)}. Det {K} betaler, kan "
                                     f"aldri stige med mer enn skatten.", P0 + 2 * t),
                   F(kp(P0 + t / 2), f"Skatten delt på midten: {tl(P0)} + {tl(t)}/2. Med {helning} er delingen "
                                     f"100/0, ikke 50/50.", P0 + t / 2)]
        else:
            alt = [F(kp(P0 + t), f"Grensetilfellet snudd: hele skatten veltet over på {K}, {tl(P0)} + {tl(t)}. Det "
                                 f"skjer ved perfekt uelastisk etterspørsel eller perfekt elastisk tilbud.", P0 + t),
                   F(kp(P0 - t), f"Dette er det {S} sitter igjen med, {tl(P0)} − {tl(t)}. Spørsmålet gjelder "
                                 f"{K}.", P0 - t),
                   F(kp(P0 + t / 2), f"Skatten delt på midten: {tl(P0)} + {tl(t)}/2. Med {helning} er delingen "
                                     f"0/100, ikke 50/50.", P0 + t / 2)]
    else:
        riktig = p
        spm = f"Hva sitter {S} igjen med per {enh} etter at skatten er betalt?"
        betaler = ("At de betaler skatten inn, avgjør ikke hvem som bærer den." if innkrever == "selger" else
                   "")
        if baerer == "kjoper":
            alt = [F(kp(P0 - t), f"Grensetilfellet snudd: {S} bærer hele skatten bare ved perfekt uelastisk tilbud "
                                 f"eller perfekt elastisk etterspørsel. {betaler}".strip(), P0 - t),
                   F(kp(P0 + t), f"Dette er det {K} betaler i alt, {tl(P0)} + {tl(t)}. Av det går {tl(t)} til "
                                 f"staten.", P0 + t),
                   F(kp(P0 - t / 2), f"Skatten delt på midten: {tl(P0)} − {tl(t)}/2. Med {helning} er delingen "
                                     f"100/0, ikke 50/50.", P0 - t / 2)]
        else:
            alt = [F(kp(P0), f"Dette er det {K} betaler i alt, som står stille på {tl(P0)}. Av det går {tl(t)} "
                             f"til staten.", P0),
                   F(kp(P0 + t), f"Grensetilfellet snudd og prisene byttet: {tl(P0)} + {tl(t)} er det {K} ville "
                                 f"betalt i alt hvis de bar hele skatten.", P0 + t),
                   F(kp(P0 - t / 2), f"Skatten delt på midten: {tl(P0)} − {tl(t)}/2. Med {helning} er delingen "
                                     f"0/100, ikke 50/50.", P0 - t / 2)]
    alt = [R(kp(riktig), riktig)] + alt
    ulike(*[a.verdi for a in alt], rel=0.004)
    unik("grense1", kode, vare, spor)

    q = (f"<p>Et frikonkurransemarked for {vare} er i likevekt med {prisord} {kp(P0)} per {enh}. {tekst} "
         f"{inn_txt}</p><p>{spm}</p>")
    if baerer == "kjoper":
        mekanisme = (f"Med {helning} blir ∂P/∂t = S′/(S′ − D′) = 1 og ∂p/∂t = D′/(S′ − D′) = 0. {K.capitalize()} "
                     f"bærer hele skatten.")
    else:
        mekanisme = (f"Med {helning} blir ∂P/∂t = S′/(S′ − D′) = 0 og ∂p/∂t = D′/(S′ − D′) = −1. {S.capitalize()} "
                     f"bærer hele skatten.")
    kort = f"<p><b>{kp(riktig)}.</b> {mekanisme} Da er P = {tl(P)} og p = P − t = {tl(p)}.</p>"
    hvorfor = {"D0": f"{K.capitalize()} kan ikke endre kvantumet og kan derfor ikke unngå skatten.",
               "S0": f"{S.capitalize()} kan ikke endre antallet og kan derfor ikke unngå skatten.",
               "Sinf": f"{S.capitalize()} kan selge til verdensprisen andre steder, så de tar ikke noe av skatten.",
               "Dinf": f"{K.capitalize()} kan kjøpe til den faste prisen andre steder, så de tar ikke noe av "
                       f"skatten."}[kode]
    full_txt = (
        f"<p><b>Hva et grensetilfelle er.</b> Hvor mye av skatten hver side bærer, avhenger av helningene. Er den "
        f"ene kurven loddrett (helning 0) eller vannrett (helning uendelig), kollapser formlene. Da bærer én side "
        f"alt. Her er det {navn}, {helning}. {hvorfor} Hvem som betaler skatten inn, spiller ingen rolle.</p>"
        f"<p><b>Steg 1: skriv ned kilen.</b> P = p + {tl(t)}, der P er det {K} betaler i alt og p det {S} sitter "
        f"igjen med. Det {K} betaler, minus det staten får, er det {S} beholder.</p>"
        f"<p><b>Steg 2: sett helningen inn i formlene.</b> {mekanisme}</p>"
        f"<p><b>Steg 3: prisene.</b> P = {kp(P)} og p = {tl(P)} − {tl(t)} = {kp(p)}. Spørsmålet gjelder "
        f"{K if spor == 'P' else S}, så svaret er <b>{kp(riktig)}</b>.</p>"
        f"<p><b>Kontroll.</b> ∂P/∂t − ∂p/∂t skal være 1: "
        + ("1 − 0 = 1 ✓." if baerer == "kjoper" else "0 − (−1) = 1 ✓.")
        + f" Kronene skal gå opp: {tl(P)} − {tl(t)} = {tl(p)} ✓.</p>"
        f"<p><b>Husk:</b> D′ = 0 eller S′ → ∞ gir kjøperen hele skatten. S′ = 0 eller D′ → −∞ gir selgeren hele.</p>"
    )
    return sporsmal(q, alt, kort, full_txt, hjelp=HJELP["ins-grense1-" + spor])


# ---------------------------------------------------------------------------
# ins-hel1 · Fra helningene til tall: formlene brukt på D′ og S′
# ---------------------------------------------------------------------------
@familie("ins-hel1", tema="insidens", antall=5, tittel="Prisendringer fra helningene D′ og S′", hjelp=HJELP["ins-hel1"])
def _(r):
    Dp = -r.choice([1, 2, 3, 4, 5, 6, 8, 9, 12, 15])
    Sp = r.choice([1, 2, 3, 4, 5, 6, 8, 10, 12, 15])
    if -Dp == Sp:
        raise Avvis("like helninger")
    N = Sp - Dp
    dP, dp = Sp / N, Dp / N
    if not (heltall(dP * 100)):
        raise Avvis("ujevn brøk")
    spor = r.choice(["dp", "dP", "kronerP", "kronerp", "kronerP", "kronerp"])
    T = r.choice([2, 4, 5, 10, 20])
    oppsett = (f"<p>I et frikonkurransemarked har etterspørselen helningen D′ = {tall(Dp)} og tilbudet helningen "
               f"S′ = {tall(Sp)} rundt likevekten, målt i enheter per krone. Staten legger en stykkskatt t per enhet "
               f"på selgerne. P er prisen kjøperen betaler og p prisen selgeren sitter igjen med, P = p + t.</p>")
    nevner = f"S′ − D′ = {tall(Sp)} − ({tall(Dp)}) = {tall(N)}"
    if spor == "dp":
        q = oppsett + "<p>Hva er ∂p/∂t?</p>"
        riktig = dp
        alt = [R(d2(dp), dp),
               F(d2(dP), f"Dette er ∂P/∂t = S′/(S′ − D′) = {tall(Sp)}/{tall(N)}. Det er positivt. En skatt på "
                         f"selgerne kan ikke løfte prisen de sitter igjen med.", dP),
               F(d2(Dp / Sp), f"Nevneren forkortet til S′: D′/S′ = {tall(Dp)}/{tall(Sp)}. Paret med S′/S′ = 1 gir "
                              f"en differanse forskjellig fra 1.", Dp / Sp),
               F(d2(-dp), f"Fortegnet i nevneren snudd: D′/(D′ − S′) = {tall(Dp)}/({tall(Dp)} − {tall(Sp)}) er "
                          f"positiv. Produsentprisen kan ikke stige.", -dp)]
        kort = f"<p><b>{d2(dp)}.</b> ∂p/∂t = D′/(S′ − D′) = {tall(Dp)}/{tall(N)}. Nevneren er {nevner}.</p>"
        steg = (f"<p><b>Steg 2: produsentprisen.</b> ∂p/∂t = D′/(S′ − D′) = {tall(Dp)}/{tall(N)} = <b>{d2(dp)}</b>. "
                f"Selgeren sitter igjen med {d2(-dp)} kroner mindre per krone skatt.</p>")
    elif spor == "dP":
        q = oppsett + "<p>Hva er ∂P/∂t?</p>"
        riktig = dP
        alt = [R(d2(dP), dP),
               F(d2(dp), f"Dette er ∂p/∂t = D′/(S′ − D′) = {tall(Dp)}/{tall(N)}, endringen i prisen selgeren "
                         f"sitter igjen med.", dp),
               F(d2(N / Sp), f"Brøken snudd: (S′ − D′)/S′ = {tall(N)}/{tall(Sp)} er over 1. Prisen kjøperen "
                             f"betaler, kan ikke stige med mer enn skatten.", N / Sp),
               F(d2(-dP), f"Fortegnet i nevneren snudd: S′/(D′ − S′) = {tall(Sp)}/({tall(Dp)} − {tall(Sp)}) er "
                          f"negativ. En skatt kan ikke senke prisen kjøperen betaler.", -dP)]
        kort = f"<p><b>{d2(dP)}.</b> ∂P/∂t = S′/(S′ − D′) = {tall(Sp)}/{tall(N)}. Nevneren er {nevner}.</p>"
        steg = (f"<p><b>Steg 2: konsumentprisen.</b> ∂P/∂t = S′/(S′ − D′) = {tall(Sp)}/{tall(N)} = <b>{d2(dP)}</b>. "
                f"Kjøperen betaler {d2(dP)} kroner mer per krone skatt.</p>")
    elif spor == "kronerP":
        q = oppsett + f"<p>Skatten innføres med t = {kr(T)}. Omtrent hvor mye stiger prisen kjøperen betaler?</p>"
        riktig = T * dP
        alt = [R(kra(riktig), riktig),
               F(kra(-T * dp), f"Andelene byttet om: |D′|/(S′ − D′) × {tall(T)} = {tall(-Dp)}/{tall(N)} × {tall(T)} "
                               f"er hvor mye selgerens pris faller.", -T * dp),
               F(kra(T), f"Hele skatten veltet over, som om nevneren var S′ alene: S′/S′ × {tall(T)}. Det krever "
                         f"perfekt uelastisk etterspørsel eller perfekt elastisk tilbud.", T),
               F(kra(T * N / Sp), f"Brøken snudd: (S′ − D′)/S′ × {tall(T)} = {tall(N)}/{tall(Sp)} × {tall(T)}. Prisen "
                                  f"kan ikke stige med mer enn skatten.", T * N / Sp)]
        kort = (f"<p><b>{kra(riktig)}.</b> ∂P/∂t = S′/(S′ − D′) = {tall(Sp)}/{tall(N)} = {d2(dP)}. Det gir "
                f"{d2(dP)} × {tall(T)} = {talla(riktig)}.</p>")
        steg = (f"<p><b>Steg 2: konsumentprisen.</b> ∂P/∂t = S′/(S′ − D′) = {tall(Sp)}/{tall(N)} = {d2(dP)}. "
                f"Med t = {tall(T)} stiger prisen kjøperen betaler med {d2(dP)} × {tall(T)} = <b>{kra(riktig)}</b>. "
                f"Formlene er eksakte for rette linjer.</p>")
    else:
        q = oppsett + f"<p>Skatten innføres med t = {kr(T)}. Omtrent hvor mye faller prisen selgeren sitter igjen med?</p>"
        riktig = -T * dp
        alt = [R(kra(riktig), riktig),
               F(kra(T * dP), f"Andelene byttet om: S′/(S′ − D′) × {tall(T)} = {tall(Sp)}/{tall(N)} × {tall(T)} er hvor "
                              f"mye prisen kjøperen betaler, stiger.", T * dP),
               F(kra(T), "Hele skatten lagt på selgeren fordi han betaler den inn. Det krever perfekt uelastisk "
                         "tilbud eller perfekt elastisk etterspørsel.", T),
               F(kra(T * (-Dp) / Sp), f"Nevneren forkortet til S′: |D′|/S′ × {tall(T)} = {tall(-Dp)}/{tall(Sp)} × "
                                      f"{tall(T)}.", T * (-Dp) / Sp)]
        kort = (f"<p><b>{kra(riktig)}.</b> ∂p/∂t = D′/(S′ − D′) = {tall(Dp)}/{tall(N)} = {d2(dp)}. Det gir et fall på "
                f"{d2(-dp)} × {tall(T)} = {talla(riktig)}.</p>")
        steg = (f"<p><b>Steg 2: produsentprisen.</b> ∂p/∂t = D′/(S′ − D′) = {tall(Dp)}/{tall(N)} = {d2(dp)}. Med "
                f"t = {tall(T)} faller prisen selgeren sitter igjen med, med {d2(-dp)} × {tall(T)} = "
                f"<b>{kra(riktig)}</b>. Formlene er eksakte for rette linjer.</p>")
    ulike(*[a.verdi for a in alt], rel=0.004)
    unik("hel1", Dp, Sp)

    full_txt = (
        f"<p><b>Hva formlene sier.</b> Deriverer du likevekten D(p + t) = S(p) med hensyn på t, får du "
        f"∂p/∂t = D′/(S′ − D′) og ∂P/∂t = S′/(S′ − D′). De to brøkene har samme nevner og skiller seg bare i "
        f"telleren: D′ gir prisen selgeren sitter igjen med, S′ prisen kjøperen betaler.</p>"
        f"<p><b>Steg 1: nevneren.</b> {nevner}. Minus foran et negativt tall blir pluss, så nevneren er alltid "
        f"positiv: S′ + |D′|.</p>"
        + steg
        + f"<p><b>Kontroll.</b> ∂P/∂t − ∂p/∂t = {d2(dP)} − ({d2(dp)}) = 1,00 ✓. Kilen P − p er alltid t, så "
          f"differansen må være nøyaktig 1. ∂p/∂t skal ligge mellom −1 og 0 og ∂P/∂t mellom 0 og 1. Her bærer "
          f"{'kjøperen' if dP > 0.5 else 'selgeren'} mest, fordi {'etterspørselen' if dP > 0.5 else 'tilbudet'} "
          f"er minst prisfølsom: {'|D′|' if dP > 0.5 else 'S′'} = {tall(min(-Dp, Sp))} mot "
          f"{tall(max(-Dp, Sp))}.</p>"
          f"<p><b>Husk:</b> samme nevner S′ − D′. Telleren D′ hører til p, telleren S′ til P.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# ins-form1 · Formelgjenkjenning: hva spørres det etter?
# ---------------------------------------------------------------------------
def _form_mal(dn, sn):
    """Uttrykkene skrevet med valgt notasjon. dn = «D′(P)» eller «D′», sn = «S′(p)» eller «S′»."""
    return {
        "dp": f"{dn}/({sn} − {dn})",
        "dP": f"{sn}/({sn} − {dn})",
        "dp_byt": f"{sn}/({sn} − {dn})",
        "dp_kort": f"{dn}/{sn}",
        "dp_konst": f"({dn} − {sn})/({sn} − {dn})",
        "dp_fort": f"{dn}/({dn} − {sn})",
        "dP_byt": f"{dn}/({sn} − {dn})",
        "dP_inv": f"({sn} − {dn})/{sn}",
        "dP_fort": f"{sn}/({dn} − {sn})",
        "selg": f"−{dn}/({sn} − {dn})",
        "forhold": f"{sn}/{dn}",
        "forhold_inv": f"{dn}/{sn}",
        "forhold_pos": f"−{sn}/{dn}",
        "sum": f"({sn} + {dn})/({sn} − {dn})",
        "sum_inv": f"({sn} − {dn})/({sn} + {dn})",
    }


@familie("ins-form1", tema="insidens", antall=7, tittel="Formelgjenkjenning: ∂p/∂t, ∂P/∂t og forholdet", type="formel")
def _(r):
    mal_ = r.choice(["kort", "lang"])
    dn, sn = ("D′", "S′") if mal_ == "kort" else ("D′(P)", "S′(p)")
    E = _form_mal(dn, sn)
    hvem = r.choice(["produsentene", "konsumentene"])
    mal = r.choice(["dp", "dP", "forhold", "diff", "selg"])
    # talleksempel til kontrollen i gjennomgangen
    Dv = -r.choice([2, 3, 4, 6, 8])
    Sv = r.choice([1, 2, 3, 5, 6, 12])
    if -Dv == Sv:
        raise Avvis("like helninger i eksempelet")
    Nv = Sv - Dv

    if hvem == "produsentene":
        likevekt = "D(p + t) = S(p)"
        oppsett = (f"<p>I et frikonkurransemarked legger myndighetene en stykkskatt t per enhet på produsentene. "
                   f"Konsumentprisen er P og produsentprisen p, med P = p + t. Likevekten er {likevekt}, der "
                   f"{dn} &lt; 0 og {sn} &gt; 0.</p>")
    else:
        likevekt = "D(P) = S(P − t)"
        oppsett = (f"<p>I et frikonkurransemarked legger myndighetene en stykkskatt t per enhet på konsumentene: de "
                   f"betaler produsentene prisen p og i tillegg t til staten, så P = p + t. Likevekten er "
                   f"{likevekt}, der {dn} &lt; 0 og {sn} &gt; 0.</p>")

    def verdi(uttr):
        return uttr.replace("D′(P)", "D′").replace("S′(p)", "S′")

    tv = lambda a, b: d2(a / b)  # noqa: E731
    if mal == "dp":
        spm = "Hvilket uttrykk viser hvordan produsentprisen p endres når skatten øker marginalt?"
        R_ = R(f"∂p/∂t = {E['dp']}")
        kand = [F(f"∂p/∂t = {E['dp_byt']}", f"Telleren byttet til {sn}: det er ∂P/∂t, som er positivt. En skatt "
                                             f"kan ikke løfte prisen produsenten sitter igjen med."),
                F(f"∂p/∂t = {E['dp_kort']}", f"Nevneren mangler {dn}. Med eksempeltallene blir paret {tv(Dv, Sv)} og "
                                              f"{sn}/{sn} = 1, med differanse forskjellig fra 1."),
                F(f"∂p/∂t = {E['dp_konst']}", "Telleren er minus nevneren, så brøken er −1 uansett kurver. Et generelt "
                                               "uttrykk kan ikke være en konstant."),
                F(f"∂p/∂t = {E['dp_fort']}", f"Fortegnet i nevneren snudd. {dn} − {sn} er negativ, så brøken blir "
                                              f"positiv. Produsentprisen kan ikke stige.")]
        tallsjekk = (f"Da er ∂p/∂t = {tall(Dv)}/{tall(Nv)} = {tv(Dv, Nv)}, mellom −1 og 0. ∂P/∂t = {tall(Sv)}/{tall(Nv)} = "
                     f"{tv(Sv, Nv)}. Differansen er {tv(Sv, Nv)} − ({tv(Dv, Nv)}) = 1,00 ✓")
        kjerne = "Telleren D′ gir produsentprisen. Telleren er negativ og nevneren positiv."
    elif mal == "dP":
        spm = "Hvilket uttrykk viser hvordan konsumentprisen P endres når skatten øker marginalt?"
        R_ = R(f"∂P/∂t = {E['dP']}")
        kand = [F(f"∂P/∂t = {E['dP_byt']}", f"Telleren byttet til {dn}: det er ∂p/∂t, som er negativt. Konsumentprisen "
                                             f"stiger når skatten øker."),
                F(f"∂P/∂t = {E['dP_inv']}", f"Teller og nevner byttet om. Brøken er over 1 (med eksempeltallene "
                                             f"{tv(Nv, Sv)}). Konsumentprisen kan ikke stige med mer enn skatten."),
                F(f"∂P/∂t = {E['dP_fort']}", f"Fortegnet i nevneren snudd. {dn} − {sn} er negativ, så brøken blir "
                                              f"negativ. Da ville konsumentprisen falt."),
                F(f"∂P/∂t = {E['selg']}", f"Telleren er −{dn}: det er produsentens andel, hvor mye p faller. "
                                           f"Kontrollen ∂P/∂t − ∂p/∂t = 1 feiler med den.")]
        tallsjekk = (f"Da er ∂P/∂t = {tall(Sv)}/{tall(Nv)} = {tv(Sv, Nv)}, mellom 0 og 1. ∂p/∂t = {tall(Dv)}/{tall(Nv)} = "
                     f"{tv(Dv, Nv)}. Differansen er {tv(Sv, Nv)} − ({tv(Dv, Nv)}) = 1,00 ✓")
        kjerne = "Telleren S′ gir konsumentprisen. Begge ledd er positive. Telleren er mindre enn nevneren."
    elif mal == "forhold":
        spm = "Hvilket uttrykk er forholdet (∂P/∂t)/(∂p/∂t) mellom endringen i konsumentprisen og endringen i produsentprisen?"
        R_ = R(f"(∂P/∂t)/(∂p/∂t) = {E['forhold']}")
        kand = [F(f"(∂P/∂t)/(∂p/∂t) = {E['forhold_inv']}", "Forholdet snudd: det er (∂p/∂t)/(∂P/∂t)."),
                F(f"(∂P/∂t)/(∂p/∂t) = {E['dP']}", "Dette er ∂P/∂t alene. Nevneren S′ − D′ forkortes bort når du "
                                                   "deler de to brøkene på hverandre."),
                F("(∂P/∂t)/(∂p/∂t) = −1", "Det gjelder bare når S′ = |D′|. Det er differansen ∂P/∂t − ∂p/∂t som "
                                          "alltid er en konstant. Den er 1."),
                F(f"(∂P/∂t)/(∂p/∂t) = {E['forhold_pos']}", "Fortegnet snudd. Prisene beveger seg i hver sin retning, "
                                                           "så forholdet må være negativt.")]
        tallsjekk = (f"{tv(Sv, Nv)}/({tv(Dv, Nv)}) = {tv(Sv, Dv)} og {tall(Sv)}/({tall(Dv)}) = {tv(Sv, Dv)} ✓")
        kjerne = "Brøkene har samme nevner, så den forkortes bort. Igjen står S′/D′. Forholdet er negativt."
    elif mal == "diff":
        spm = "Hva er ∂P/∂t − ∂p/∂t?"
        R_ = R("1")
        kand = [F(E["sum"], "Dette er summen ∂P/∂t + ∂p/∂t. Differansen gir S′ − D′ i telleren. Da blir brøken 1."),
                F("0", "Det ville bety at kilen mellom prisene ikke endres. Men P − p = t, så kilen øker krone for "
                       "krone med skatten."),
                F("−1", "Fortegnet snudd. Konsumentprisen stiger og produsentprisen faller, så P − p øker."),
                F(E["dp"], "Dette er ∂p/∂t alene, ikke differansen. Trekk den fra ∂P/∂t, så står 1 igjen.")]
        tallsjekk = f"{tv(Sv, Nv)} − ({tv(Dv, Nv)}) = 1,00 ✓"
        kjerne = "Kilen P − p er alltid t. Da må den deriverte av differansen med hensyn på t være 1."
    elif mal == "sum":
        spm = "Hva er summen ∂P/∂t + ∂p/∂t?"
        R_ = R(E["sum"])
        kand = [F("1", "Det er differansen ∂P/∂t − ∂p/∂t som alltid er 1. Summen avhenger av helningene."),
                F("0", "Summen er null bare når S′ = |D′|, slik at skatten deles på midten."),
                F(E["sum_inv"], "Teller og nevner byttet om. Summen har nevneren S′ − D′ fra de to brøkene."),
                F(E["forhold"], "Dette er forholdet (∂P/∂t)/(∂p/∂t), ikke summen.")]
        tallsjekk = (f"{tv(Sv, Nv)} + ({tv(Dv, Nv)}) = {tv(Sv + Dv, Nv)} og ({tall(Sv)} + ({tall(Dv)}))/{tall(Nv)} = "
                     f"{tv(Sv + Dv, Nv)} ✓")
        kjerne = "Begge brøkene har nevneren S′ − D′, så tellerne legges sammen: S′ + D′."
    else:
        spm = "Hvor stor andel av skatten bærer produsentene, målt som hvor mye produsentprisen faller per krone skatt?"
        R_ = R(E["selg"])
        kand = [F(E["dp"], "Dette er ∂p/∂t selv, som er negativt. En andel er positiv: fallet er −∂p/∂t."),
                F(E["dP"], "Dette er konsumentenes andel, ∂P/∂t."),
                F(f"−{dn}/{sn}", "Nevneren forkortet til S′. Andelene ville da ikke summere til 1."),
                F(E["sum"], "Dette er ∂P/∂t + ∂p/∂t, forskjellen mellom de to andelene.")]
        tallsjekk = (f"Produsentens andel {tall(-Dv)}/{tall(Nv)} = {tv(-Dv, Nv)} og konsumentens {tall(Sv)}/{tall(Nv)} = "
                     f"{tv(Sv, Nv)} summerer til 1,00 ✓")
        kjerne = "Produsentprisen faller med −∂p/∂t = −D′/(S′ − D′) = |D′|/(S′ − D′) per krone skatt."
    r.shuffle(kand)
    alternativer = [R_] + kand[:3]
    # Spre variantene over alle fem spørsmålstypene før noen gjentas.
    teller = _BRUKT.setdefault("form1", {})
    if teller.get(mal, 0) >= (1 if sum(teller.values()) < 5 else 2):
        raise Avvis("spørsmålstypen er brukt nok")
    teller[mal] = teller.get(mal, 0) + 1

    q = oppsett + f"<p>{spm}</p>"
    kort = (f"<p><b>{R_.tekst}.</b> {kjerne}</p>")
    full_txt = (
        f"<p><b>Utledningen.</b> En stykkskatt legger en kile mellom konsumentprisen P og produsentprisen p: "
        f"P = p + t. Deriver likevekten D(p + t) = S(p) med hensyn på t: D′ × (∂p/∂t + 1) = S′ × ∂p/∂t. Samle "
        f"leddene med ∂p/∂t: D′ = (S′ − D′) × ∂p/∂t, altså ∂p/∂t = D′/(S′ − D′). Så følger ∂P/∂t = ∂p/∂t + 1 = "
        f"S′/(S′ − D′). Hvem skatten legges på, spiller ingen rolle: D(p + t) = S(p) og D(P) = S(P − t) er samme "
        f"ligning.</p>"
        f"<p><b>Svaret.</b> {kjerne} Riktig uttrykk er <b>{R_.tekst}</b>.</p>"
        f"<p><b>Filteret.</b> D′ &lt; 0 og S′ &gt; 0 gir en nevner S′ − D′ = S′ + |D′| som alltid er positiv. Da "
        f"ligger ∂p/∂t mellom −1 og 0 og ∂P/∂t mellom 0 og 1. Differansen er nøyaktig 1. Et uttrykk som bryter "
        f"ett av disse, kan strykes uten videre regning.</p>"
        f"<p><b>Kontroll med tall.</b> Sett D′ = {tall(Dv)} og S′ = {tall(Sv)} [eksempeltall]. Nevneren er "
        f"{tall(Sv)} − ({tall(Dv)}) = {tall(Nv)}. {tallsjekk}.</p>"
        f"<p><b>Husk:</b> samme nevner S′ − D′. Telleren D′ gir p, telleren S′ gir P. Differansen ∂P/∂t − ∂p/∂t er alltid 1.</p>"
    )
    return sporsmal(q, alternativer, kort, full_txt, hjelp=HJELP["ins-form1-" + mal])


# ---------------------------------------------------------------------------
# ins-mono1 · Monopol: MR = MC + t
# ---------------------------------------------------------------------------
MONO = [("En produsent av et patentert legemiddel", "pakninger", "år", (200, 300), (300, 400, 500)),
        ("Et fergeselskap uten konkurrenter på strekningen", "billetter", "år", (100, 150), (200, 300, 400)),
        ("Et skianlegg uten konkurrenter i regionen", "dagskort", "sesong", (100, 150, 200), (300, 400, 500)),
        ("Den eneste arrangøren av en stor festival", "billetter", "år", (300, 400, 500), (600, 800, 1000)),
        ("Eneforhandleren av et verktøymerke", "verktøysett", "år", (500, 600, 800), (800, 1000, 1200))]


@familie("ins-mono1", tema="insidens", antall=5, tittel="Monopol og stykkskatt", hjelp=HJELP["ins-mono1"])
def _(r):
    navn, enh, per, cliste, gapliste = r.choice(MONO)
    c = r.choice(cliste)
    gap = r.choice(gapliste)
    a = c + gap
    b = r.choice([1, 2, 4, 5])
    t = r.choice([g for g in (20, 40, 50, 60, 80, 100, 120) if g < gap / 3])
    x0 = (a - c) / (2 * b)
    xt = (a - c - t) / (2 * b)
    P0 = (a + c) / 2
    Pt = (a + c + t) / 2
    xc = (a - c - t) / b                      # P = MC + t, frikonkurransesvaret
    if not (heltall(xt) and heltall(x0) and heltall(xc) and heltall(Pt)):
        raise Avvis("ujevne tall")
    bx = "x" if b == 1 else f"{tall(b)}x"
    spor = r.choice(["pris", "pris", "proveny"])
    q = (f"<p>{navn} er monopolist og møter den inverse etterspørselen P = {tall(a)} − {bx}, der P er prisen i "
         f"kroner og x antall solgte {enh} i tusen per {per}. Grensekostnaden er konstant lik {kr(c)} per enhet. "
         f"Staten innfører en stykkskatt på {kr(t)} per enhet, som monopolisten betaler inn.</p>")
    T = 1000                                  # x er i tusen
    if spor == "pris":
        q += "<p>Hva blir prisen kundene betaler etter at skatten er innført?</p>"
        alt = [R(kra(Pt), Pt),
               F(kra(P0 + t), f"Hele skatten veltet over: {talla(P0)} + {tall(t)}. Monopolisten bruker markedsmakten "
                              f"sin før skatten kommer. Med lineær etterspørsel og konstant grensekostnad tar han "
                              f"halve skatten selv.", P0 + t),
               F(kra(c + t), f"Pris satt lik grensekostnad pluss skatt, {tall(c)} + {tall(t)}. Det er "
                             f"frikonkurransesvaret. Monopolisten setter grenseinntekten, ikke prisen, lik "
                             f"grensekostnaden.", c + t),
               F(kra(P0), f"Prisen uten skatt. Skatten øker grensekostnaden. Da reduserer monopolisten "
                          f"kvantumet og øker prisen.", P0)]
        kort = (f"<p><b>{kra(Pt)}.</b> MR = MC + t: {tall(a)} − {tall(2 * b)}x = {tall(c + t)} gir x = {talla(xt)} "
                f"og P = {tall(a)} − {tall(b)} × {talla(xt)} = {talla(Pt)}. Prisen stiger med halve skatten.</p>"
                ).replace(" − 1 × ", " − ")
        sluttsteg = (f"<p><b>Steg 3: prisen.</b> P = {tall(a)} − {tall(b)} × {talla(xt)} = <b>{kra(Pt)}</b>. Uten "
                     f"skatt var x = {talla(x0)} og P = {talla(P0)}.</p>").replace(" − 1 × ", " − ")
    else:
        q += f"<p>Hvor stort blir statens proveny av skatten per {per}?</p>"
        riktig = t * xt * T
        alt = [R(kr(riktig), riktig),
               F(kr(t * x0 * T), f"Gammelt kvantum: {tall(t)} × {talla(x0)} 000. Monopolisten selger færre enheter "
                                 f"når skatten løfter grensekostnaden.", t * x0 * T),
               F(kr(t * xc * T), f"Kvantumet regnet med P = MC + t, som i frikonkurranse: x = {talla(xc)} tusen. "
                                 f"Monopolisten setter grenseinntekten lik MC + t.", t * xc * T),
               F(kr((Pt - P0) * xt * T), f"Bare kundenes del: ({talla(Pt)} − {talla(P0)}) × {talla(xt)} 000. Staten "
                                         f"får hele skatten på {tall(t)} per enhet.", (Pt - P0) * xt * T)]
        kort = (f"<p><b>{kr(riktig)}.</b> MR = MC + t: {tall(a)} − {tall(2 * b)}x = {tall(c + t)} gir "
                f"x = {talla(xt)} tusen. Provenyet er {tall(t)} × {tall(xt * T)}.</p>")
        sluttsteg = (f"<p><b>Steg 3: provenyet.</b> {tall(t)} × {tall(xt * T)} = <b>{kr(riktig)}</b>. Prisen blir "
                     f"{talla(Pt)}, opp {talla(Pt - P0)} fra {talla(P0)}.</p>")
    ulike(*[a_.verdi for a_ in alt], rel=0.004)
    unik("mono1", a, b, c, t)
    unik("mono1-navn", navn)

    full_txt = (
        f"<p><b>Hvordan monopolisten tilpasser seg.</b> Et monopol velger kvantumet der grenseinntekten er lik "
        f"grensekostnaden, MR = MC. En stykkskatt øker grensekostnaden med t, så betingelsen blir MR = MC + t. Med "
        f"lineær etterspørsel P = a − bx er grenseinntekten MR = a − 2bx: samme skjæring med prisaksen, dobbelt så "
        f"bratt.</p>"
        f"<p><b>Steg 1: grenseinntekten.</b> P = {tall(a)} − {bx} gir MR = {tall(a)} − {tall(2 * b)}x.</p>"
        f"<p><b>Steg 2: kvantumet med skatt.</b> {tall(a)} − {tall(2 * b)}x = {tall(c)} + {tall(t)} gir "
        f"x = ({tall(a)} − {tall(c + t)})/{tall(2 * b)} = {talla(xt)} tusen {enh}.</p>"
        + sluttsteg
        + f"<p><b>Kontroll.</b> Med lineær etterspørsel og konstant grensekostnad er P = (a + c + t)/2, så prisen "
          f"stiger med nøyaktig t/2 = {talla(t / 2)}: {talla(P0)} + {talla(t / 2)} = {talla(Pt)} ✓. Monopolisten "
          f"sitter igjen med {talla(Pt - t)} per enhet, {talla(t / 2)} mindre enn før.</p>"
          f"<p><b>Husk:</b> MR = MC + t. Med lineær etterspørsel og konstant grensekostnad bærer kundene og "
          f"monopolisten halvparten hver.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# ins-kap1 · Kapitalisering: en varig skatt på et fast aktivum slår inn i prisen
# ---------------------------------------------------------------------------
KAP = [("hytter i en fjellkommune", "hytte", "hytta", "Det kan ikke bygges flere hytter", "hytteeieren", "eiendomsskatt"),
       ("båtplasser i en småbåthavn", "båtplass", "båtplassen", "Havna kan ikke utvides", "eieren", "avgift"),
       ("festetomter ved et vann", "tomt", "tomta", "Det kan ikke skilles ut flere tomter", "grunneieren",
        "eiendomsskatt"),
       ("parkeringsplasser i et garasjeanlegg", "plass", "plassen", "Anlegget kan ikke bygges ut", "eieren",
        "avgift")]


@familie("ins-kap1", tema="insidens", antall=5, tittel="Kapitalisering av en varig skatt", hjelp=HJELP["ins-kap1"])
def _(r):
    navn, enh, enh_b, fast, eier, skattord = r.choice(KAP)
    k = r.choice([4, 5, 6, 8])
    L = r.choice([20_000, 24_000, 30_000, 36_000, 40_000, 48_000])
    T = r.choice([2_000, 3_000, 4_000, 6_000])
    if L % (k * 10) or T >= L / 3:
        raise Avvis("ujevne tall")
    V0 = L / (k / 100)
    fall = T / (k / 100)
    hvem = r.choice(["eier", "leietaker"])
    spor = r.choice(["pris", "fall"])
    inn = (f"Skatten betales inn av {eier}." if hvem == "eier" else
           "Skatten skal betales inn av leietakerne, i tillegg til leien.")
    q = (f"<p>Det finnes et fast antall {navn}. {fast}. En {enh} leies ut for {kr(L)} i året i all framtid. "
         f"Eieren har ingen kostnader. Kjøperne krever {prosent_tekst(k, 0)} avkastning, så en {enh} omsettes i "
         f"dag for {kr(V0)}. Leien bestemmes av etterspørselen.</p>"
         f"<p>Kommunen vedtar overraskende en {skattord} på {kr(T)} per {enh} per år, for all framtid. {inn} "
         f"Avkastningskravet er uendret.</p>")
    if spor == "pris":
        q += f"<p>Hva blir prisen på en {enh} rett etter vedtaket?</p>"
        riktig = V0 - fall
        alt = [R(kr(riktig), riktig),
               F(kr(V0 - T), f"Bare ett års skatt trukket fra: {tall(V0)} − {tall(T)}. Skatten betales hvert år for "
                             f"all framtid, så det er nåverdien {tall(T)}/{prosent_tekst(k, 0)} som trekkes fra.",
                 V0 - T),
               F(kr(V0 - fall / 2), f"Skatten delt likt med leietakerne. Tilbudet er perfekt uelastisk, så leien "
                                    f"leietakerne betaler i alt, kan ikke stige. Eieren bærer alt.", V0 - fall / 2),
               F(kr(V0), ("Prisen uendret fordi leietakerne betaler skatten inn. Det er formell insidens. Leien til "
                          "eieren faller med hele skatten, fordi tilbudet ikke kan tilpasse seg." if hvem == "leietaker"
                          else "Prisen uendret fordi eieren kan velte skatten over i leien. Det kan han ikke: "
                               "antallet er fast. Leien bestemmes av etterspørselen."), V0)]
        kort = (f"<p><b>{kr(riktig)}.</b> Eieren bærer hele skatten fordi tilbudet er fast. Netto leie faller til "
                f"{tall(L - T)}. Ny pris: {tall(L - T)}/{prosent_tekst(k, 0)} = {tall(riktig)}.</p>")
    else:
        q += f"<p>Hvor mye faller prisen på en {enh} når skatten vedtas?</p>"
        riktig = fall
        alt = [R(kr(fall), fall),
               F(kr(T), f"Bare ett års skatt. Skatten betales hvert år for all framtid, så prisfallet er nåverdien "
                        f"{tall(T)}/{prosent_tekst(k, 0)}.", T),
               F(kr(fall / 2), "Skatten delt likt med leietakerne. Tilbudet er perfekt uelastisk, så eieren bærer "
                               "alt.", fall / 2),
               F(kr(0), ("Ingenting fordi leietakerne betaler skatten inn. Det er formell insidens. Med fast tilbud "
                         "faller leien til eieren med hele skatten." if hvem == "leietaker" else
                         "Ingenting fordi eieren kan velte skatten over i leien. Med fast tilbud kan han ikke det."),
                 0)]
        kort = (f"<p><b>{kr(fall)}.</b> Eieren bærer hele skatten fordi tilbudet er fast. Prisfallet er nåverdien "
                f"av skatten: {tall(T)}/{prosent_tekst(k, 0)} = {tall(fall)}.</p>")
    ulike(*[a_.verdi for a_ in alt], rel=0.004)
    unik("kap1", L, k, T)
    unik("kap1-tekst", navn, spor)

    full_txt = (
        f"<p><b>Hva kapitalisering er.</b> En skatt som skal betales hvert år på et aktivum, slår inn i prisen på "
        f"aktivumet med en gang. Kjøperen betaler bare for inntekten hun faktisk får etter skatt. Den som eier "
        f"{enh_b} når skatten vedtas, tar derfor hele tapet, også for alle framtidige år. Senere kjøpere betaler "
        f"skatten hvert år, men har fått den trukket fra i kjøpesummen.</p>"
        f"<p><b>Steg 1: hvem bærer skatten?</b> Antallet er fast, så tilbudet er perfekt uelastisk (S′ = 0). Da er "
        f"∂P/∂t = 0: det leietakerne betaler i alt, står stille på {kr(L)} i året. Eieren sitter igjen med "
        f"{tall(L)} − {tall(T)} = {kr(L - T)}. "
        + ("At leietakerne betaler skatten inn, endrer ikke det: leien til eieren faller med hele skatten."
           if hvem == "leietaker" else "Eieren kan ikke heve leien, for da står plasser tomme.")
        + "</p>"
        f"<p><b>Steg 2: ny pris.</b> {tall(L - T)}/{prosent_tekst(k, 0)} = {kr(V0 - fall)}, mot {kr(V0)} før.</p>"
        f"<p><b>Steg 3: prisfallet.</b> {tall(V0)} − {tall(V0 - fall)} = {kr(fall)}. Spørsmålet ber om "
        f"{'prisen' if spor == 'pris' else 'prisfallet'}, så svaret er <b>{kr(riktig)}</b>.</p>"
        f"<p><b>Kontroll.</b> Prisfallet skal være nåverdien av skatten som evig rente: {tall(T)}/"
        f"{prosent_tekst(k, 0)} = {tall(fall)} ✓.</p>"
        f"<p><b>Husk:</b> en varig skatt på et fast aktivum bæres av den som eier det når skatten vedtas.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# ins-eps2 · Elastisiteten lest ut av overveltingen
# ---------------------------------------------------------------------------
@familie("ins-eps2", tema="insidens", antall=5, tittel="Elastisiteten lest ut av overveltingen", hjelp=HJELP["ins-eps2"])
def _(r):
    t = r.choice([2, 4, 5, 8, 10])
    andel = r.choice([0.2, 0.25, 0.4, 0.6, 0.75, 0.8])
    dP = t * andel
    if not heltall(dP * 100):
        raise Avvis("ujevn prisøkning")
    finn_D = r.random() < 0.6
    if finn_D:
        eS = r.choice([0.6, 0.8, 0.9, 1.2, 1.5, 2.0])
        riktig = eS * (1 - andel) / andel
        byttet = eS * andel / (1 - andel)
        glemt = eS / andel
        gange = eS * andel
        kjent = f"Tilbudselastisiteten er ε<sub>S</sub> = {tall(eS, 1)}."
        spm = "Hvor stor er etterspørselselastisiteten i absoluttverdi, |ε<sub>D</sub>|?"
        ligning = (f"{d2(andel)} = {tall(eS, 1)}/({tall(eS, 1)} + |ε<sub>D</sub>|) gir {tall(eS, 1)} + |ε<sub>D</sub>| = "
                   f"{tall(eS, 1)}/{d2(andel)} = {d2(eS / andel)}, altså |ε<sub>D</sub>| = {d2(eS / andel)} − "
                   f"{tall(eS, 1)} = {d2(riktig)}")
        f_glemt = (f"Glemt å trekke fra ε<sub>S</sub>: {tall(eS, 1)}/{d2(andel)} = {d2(glemt)} er summen "
                   f"ε<sub>S</sub> + |ε<sub>D</sub>|, ikke |ε<sub>D</sub>|.")
    else:
        eD = r.choice([0.3, 0.4, 0.6, 0.8, 1.2, 1.5])
        riktig = eD * andel / (1 - andel)
        byttet = eD * (1 - andel) / andel
        glemt = eD / (1 - andel)
        gange = eD * andel
        kjent = f"Etterspørselselastisiteten er ε<sub>D</sub> = −{tall(eD, 1)}."
        spm = "Hvor stor er tilbudselastisiteten ε<sub>S</sub>?"
        ligning = (f"Selgernes andel er 1 − {d2(andel)} = {d2(1 - andel)} = {tall(eD, 1)}/(ε<sub>S</sub> + "
                   f"{tall(eD, 1)}). Det gir ε<sub>S</sub> + {tall(eD, 1)} = {tall(eD, 1)}/{d2(1 - andel)} = "
                   f"{d2(glemt)}, altså ε<sub>S</sub> = {d2(glemt)} − {tall(eD, 1)} = {d2(riktig)}")
        f_glemt = (f"Glemt å trekke fra |ε<sub>D</sub>|: {tall(eD, 1)}/{d2(1 - andel)} = {d2(glemt)} er summen "
                   f"ε<sub>S</sub> + |ε<sub>D</sub>|.")
    alt = [R(d2(riktig), riktig),
           F(d2(byttet), "Andelene byttet om: kjøperens andel satt lik |ε<sub>D</sub>|/(ε<sub>S</sub> + "
                         "|ε<sub>D</sub>|). Den er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|).", byttet),
           F(d2(glemt), f_glemt, glemt),
           F(d2(gange), f"Den kjente elastisiteten ganget med kjøperens andel {d2(andel)}. Andelen er en brøk "
                        f"som må løses for den ukjente.", gange)]
    ulike(*[a.verdi for a in alt], rel=0.01)
    if not all(heltall(round(x * 100, 6)) for x in (riktig, byttet, glemt, gange)):
        raise Avvis("svaret eller en felle er ikke eksakt på to desimaler")
    unik("eps2", andel, finn_D)
    q = (f"<p>Staten øker avgiften på en vare med {kr(t)} per enhet. Varen omsettes i frikonkurranse. Prisen "
         f"kjøperne betaler, stiger med {kra(dP)} som følge av økningen. {kjent} Bruk elastisitetsregelen for "
         f"hvordan skatten fordeles.</p><p>{spm}</p>")
    kort = (f"<p><b>{d2(riktig)}.</b> Kjøperne bærer {talla(dP)}/{tall(t)} = {d2(andel)} av økningen. Den "
            f"andelen er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Løst for den ukjente gir det {d2(riktig)}.</p>")
    minst = "etterspørselen" if andel > 0.5 else "tilbudet"
    full_txt = (
        f"<p><b>Hva regelen sier.</b> Kjøperens andel av en stykkskatt er ε<sub>S</sub>/(ε<sub>S</sub> + "
        f"|ε<sub>D</sub>|), selgerens |ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|). Ser du hvor mye prisen "
        f"faktisk steg, kjenner du andelen. Da kan regelen snus og brukes til å finne en ukjent elastisitet.</p>"
        f"<p><b>Steg 1: andelen.</b> Prisen kjøperne betaler, steg med {talla(dP)} av {tall(t)} kroner. Kjøpernes "
        f"andel er {talla(dP)}/{tall(t)} = {d2(andel)}.</p>"
        f"<p><b>Steg 2: løs for den ukjente.</b> {ligning}.</p>"
        f"<p><b>Kontroll.</b> Sett tallene inn igjen: kjøperens andel blir "
        f"{d2((eS if finn_D else riktig))}/({d2((eS if finn_D else riktig))} + {d2((riktig if finn_D else eD))}) = "
        f"{d2(andel)} ✓. Kjøperne bærer {'mer' if andel > 0.5 else 'mindre'} enn halvparten, så {minst} må være "
        f"minst elastisk. Det stemmer med tallene ✓.</p>"
        f"<p><b>Hvorfor dette brukes.</b> Elastisiteter er vanskelige å måle direkte. Ser du hvor mye prisene endret seg etter en avgiftsøkning, kan du lese av hvor prisfølsomme kjøperne og selgerne er.</p>"
        f"<p><b>Husk:</b> andelen kjøperne bærer er prisøkningen delt på skatten. Den er "
        f"ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|).</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================
OPPSETT = ("<p>I et frikonkurransemarked legger myndighetene en stykkskatt t per enhet på produsentene. "
           "Konsumentprisen er P, produsentprisen p og P = p + t. Likevekten er D(p + t) = S(p), der D′ &lt; 0 "
           "og S′ ≥ 0.</p>")

UTLEDNING = ("<p><b>Formlene.</b> Deriverer du likevekten D(p + t) = S(p) med hensyn på t, får du "
             "∂p/∂t = D′/(S′ − D′) og ∂P/∂t = ∂p/∂t + 1 = S′/(S′ − D′). Nevneren er S′ + |D′|, alltid positiv.</p>")

# ---------------------------------------------------------------------------
statisk(
    "ins-s01", tema="insidens", type="formel", hjelp=HJELP["ins-s01"],
    q=OPPSETT + "<p>Antall enheter kan ikke endres, så tilbudet er perfekt uelastisk. Hvilket uttrykk viser "
                "hvordan konsumentprisen P endres når skatten øker marginalt?</p>",
    alternativer=[
        R("∂P/∂t = 0"),
        F("∂P/∂t = 1", "Grensetilfellet snudd. ∂P/∂t = 1 gjelder perfekt uelastisk etterspørsel eller perfekt "
                       "elastisk tilbud, der kjøperen bærer alt."),
        F("∂P/∂t = −1", "Fortegnet og prisen byttet: −1 er ∂p/∂t i dette tilfellet. Prisen selgeren sitter igjen "
                        "med, faller med hele skatten."),
        F("∂P/∂t = ½", "Skatten delt på midten. Det skjer bare når S′ = |D′|. Her er S′ = 0."),
    ],
    kort="<p><b>∂P/∂t = 0.</b> Med S′ = 0 blir ∂P/∂t = S′/(S′ − D′) = 0/(−D′) = 0. Konsumentprisen står "
         "stille. Produsentprisen faller med hele skatten.</p>",
    full="<p><b>Hva perfekt uelastisk tilbud betyr.</b> Kvantumet som tilbys, er det samme uansett pris: tomter, "
         "båtplasser eller et fast antall billetter. Tilbudskurven er loddrett. Helningen S′ er null. Selgeren "
         "har ingen annen bruk for varen og kan ikke trekke den tilbake fra markedet.</p>"
         + UTLEDNING +
         "<p><b>Steg 1: sett inn S′ = 0.</b> ∂P/∂t = 0/(0 − D′) = 0. Teller null, nevner positiv.</p>"
         "<p><b>Steg 2: produsentprisen.</b> ∂p/∂t = D′/(0 − D′) = −1. Selgeren tar hele skatten.</p>"
         "<p><b>Hvorfor.</b> Kvantumet er fast. Skal kjøperne kjøpe alle enhetene, må prisen de betaler være den "
         "samme som før. Skatten må derfor tas av det selgeren sitter igjen med.</p>"
         "<p><b>Kontroll.</b> ∂P/∂t − ∂p/∂t = 0 − (−1) = 1 ✓. Kilen P − p øker med hele skatten.</p>"
         "<p><b>Husk:</b> S′ = 0 eller D′ → −∞ gir ∂P/∂t = 0 og ∂p/∂t = −1: selgeren bærer alt.</p>",
)

statisk(
    "ins-s02", tema="insidens", type="formel", hjelp=HJELP["ins-s02"],
    q=OPPSETT + "<p>Kjøperne kan fritt kjøpe et perfekt substitutt til en fast pris, så etterspørselen produsentene "
                "møter, er perfekt elastisk (D′ → −∞). Tilbudet er stigende. Hvilket uttrykk viser hvordan "
                "produsentprisen p endres når skatten øker marginalt?</p>",
    alternativer=[
        R("∂p/∂t = −1"),
        F("∂p/∂t = 0", "Grensetilfellet snudd. ∂p/∂t = 0 gjelder perfekt uelastisk etterspørsel, der kjøperen bærer "
                       "alt."),
        F("∂p/∂t = 1", "Feil fortegn. En skatt på produsentene kan ikke øke prisen de sitter igjen med."),
        F("∂p/∂t = −½", "Skatten delt på midten. Med D′ → −∞ er delingen 0/100, ikke 50/50."),
    ],
    kort="<p><b>∂p/∂t = −1.</b> D′/(S′ − D′) går mot −1 når D′ → −∞, fordi S′ blir uten betydning i nevneren. "
         "Produsentprisen faller med hele skatten.</p>",
    full="<p><b>Hva perfekt elastisk etterspørsel betyr.</b> Kjøperne har et fullgodt alternativ til en fast pris. "
         "Øker prisen med én øre, kjøper de alt et annet sted. Etterspørselskurven er vannrett. Helningen D′ "
         "går mot minus uendelig.</p>"
         + UTLEDNING +
         "<p><b>Steg 1: del teller og nevner på D′.</b> ∂p/∂t = D′/(S′ − D′) = 1/(S′/D′ − 1). Når D′ → −∞, går "
         "S′/D′ mot 0. Da går brøken mot 1/(0 − 1) = −1.</p>"
         "<p><b>Steg 2: konsumentprisen.</b> ∂P/∂t = ∂p/∂t + 1 = 0. Kjøperne betaler det samme som før.</p>"
         "<p><b>Hvorfor.</b> Produsentene kan ikke velte noe over. Hever de prisen, mister de alle kundene. Hele "
         "skatten må tas av det de sitter igjen med. Det var fasiten i H2025 oppgave 8c.</p>"
         "<p><b>Kontroll.</b> ∂P/∂t − ∂p/∂t = 0 − (−1) = 1 ✓.</p>"
         "<p><b>Husk:</b> den siden som har et perfekt alternativ, bærer ingenting. Den andre bærer alt.</p>",
)

statisk(
    "ins-s03", tema="insidens", type="begrep", hjelp=HJELP["ins-s03"],
    q="<p>En stykkskatt legges på produsentene i et frikonkurransemarked. Etter skatten er ∂P/∂t = 1 og "
      "∂p/∂t = 0. Hvilket av tilfellene under kan gi dette resultatet?</p>",
    alternativer=[
        R("Varen er et legemiddel kundene må ha uansett pris"),
        F("Varen er tomter i et område der antallet ikke kan økes",
          "Fast antall betyr perfekt uelastisk tilbud. Da er ∂P/∂t = 0 og ∂p/∂t = −1: selgeren bærer alt."),
        F("Varen eksporteres til et verdensmarked med gitt pris",
          "En gitt pris på salgssiden er perfekt elastisk etterspørsel for produsentene. Da bærer de hele skatten."),
        F("Varen har like elastisk tilbud og etterspørsel",
          "Like elastisiteter gir ∂P/∂t = ½ og ∂p/∂t = −½. Skatten deles på midten."),
    ],
    kort="<p><b>Legemiddelet kundene må ha.</b> Perfekt uelastisk etterspørsel, D′ = 0, gir ∂P/∂t = S′/S′ = 1 "
         "og ∂p/∂t = 0. Kjøperen bærer hele skatten.</p>",
    full="<p><b>Hva tallene sier.</b> ∂P/∂t = 1 betyr at prisen kjøperen betaler, stiger krone for krone med "
         "skatten. ∂p/∂t = 0 betyr at selgeren sitter igjen med det samme som før. Kjøperen bærer altså hele "
         "skatten. Det skjer i to grensetilfeller: perfekt uelastisk etterspørsel (D′ = 0) eller perfekt elastisk "
         "tilbud (S′ → ∞).</p>"
         + UTLEDNING +
         "<p><b>Steg 1: sett inn D′ = 0.</b> ∂P/∂t = S′/(S′ − 0) = 1 og ∂p/∂t = 0/S′ = 0. Det er legemiddelet.</p>"
         "<p><b>Steg 2: sjekk de andre.</b> Fast antall tomter er S′ = 0, som gir ∂P/∂t = 0. Et verdensmarked med "
         "gitt salgspris er D′ → −∞, som også gir ∂P/∂t = 0. Like elastisiteter gir ½ til hver.</p>"
         "<p><b>Kontroll.</b> ∂P/∂t − ∂p/∂t = 1 − 0 = 1 ✓.</p>"
         "<p><b>Husk:</b> les ordlyden. «Må ha uansett pris» er D′ = 0. «Fast antall» er S′ = 0. «Gitt "
         "verdenspris» er en vannrett kurve på den siden prisen er gitt.</p>",
)

statisk(
    "ins-s04", tema="insidens", type="formel", hjelp=HJELP["ins-s04"],
    q=OPPSETT.replace("S′ ≥ 0", "S′ &gt; 0") + "<p>Kvantumet som omsettes, er x = S(p). Hvilket uttrykk viser hvordan "
                                              "kvantumet endres når skatten øker marginalt?</p>",
    alternativer=[
        R("∂x/∂t = S′D′/(S′ − D′)"),
        F("∂x/∂t = −S′D′/(S′ − D′)", "Fortegnet snudd. S′D′ er negativ og nevneren positiv, så det riktige "
                                     "uttrykket er negativt. Med minus foran ville en skatt øke kvantumet."),
        F("∂x/∂t = S′/(S′ − D′)", "Dette er ∂P/∂t. Det er en prisendring, ikke en kvantumsendring."),
        F("∂x/∂t = D′/(S′ − D′)", "Dette er ∂p/∂t. Det må ganges med S′ for å bli en kvantumsendring."),
    ],
    kort="<p><b>∂x/∂t = S′D′/(S′ − D′).</b> Kvantumet følger tilbudet: ∂x/∂t = S′ × ∂p/∂t = S′ × D′/(S′ − D′). "
         "Uttrykket er negativt.</p>",
    full="<p><b>Hva som skjer med kvantumet.</b> En skatt løfter prisen kjøperen betaler og senker prisen selgeren "
         "får. Begge sider vil da handle mindre. Kvantumsfallet er bredden i dødvektstrekanten.</p>"
         + UTLEDNING +
         "<p><b>Steg 1: følg tilbudskurven.</b> x = S(p), så ∂x/∂t = S′ × ∂p/∂t.</p>"
         "<p><b>Steg 2: sett inn.</b> ∂x/∂t = S′ × D′/(S′ − D′) = S′D′/(S′ − D′). Teller negativ, nevner "
         "positiv: kvantumet faller.</p>"
         "<p><b>Kontroll: følg etterspørselskurven i stedet.</b> x = D(P), så ∂x/∂t = D′ × ∂P/∂t = D′ × S′/(S′ − D′). "
         "Samme uttrykk ✓. Med D′ = −2 og S′ = 3 [eksempeltall] er ∂x/∂t = −6/5 = −1,2 enheter per krone skatt.</p>"
         "<p><b>Husk:</b> ∂x/∂t = S′D′/(S′ − D′) er null når én av helningene er null. Da er dødvektstapet også "
         "null.</p>",
)

statisk(
    "ins-s05", tema="insidens", type="formel", hjelp=HJELP["ins-s05"],
    q="<p>Etterspørselselastisiteten er ε<sub>D</sub> &lt; 0 og tilbudselastisiteten ε<sub>S</sub> &gt; 0 i "
      "utgangspunktet. En stykkskatt legges på selgerne. Hvilket uttrykk er den andelen av skatten kjøperne "
      "bærer?</p>",
    alternativer=[
        R("ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|)"),
        F("|ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|)", "Dette er selgernes andel. Tilbudselastisiteten "
                                                                "står i telleren for kjøperens andel."),
        F("ε<sub>S</sub>/|ε<sub>D</sub>|", "Dette er forholdet mellom andelene, ikke en andel. Det kan bli over 1."),
        F("ε<sub>S</sub>/(ε<sub>S</sub> − |ε<sub>D</sub>|)", "Fortegnet i nevneren snudd. Brøken kan da bli "
                                                              "negativ eller over 1."),
    ],
    kort="<p><b>ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|).</b> Det er S′/(S′ − D′) skrevet med "
         "elastisiteter. Kjøperen bærer mest når tilbudet er mest elastisk.</p>",
    full="<p><b>Hva en elastisitet er.</b> Elastisiteten er den prosentvise endringen i kvantum når prisen endres "
         "med én prosent: ε = helning × pris/kvantum. Den måler hvor lett en side kan trekke seg unna.</p>"
         "<p><b>Steg 1: start med helningene.</b> Kjøperens andel er ∂P/∂t = S′/(S′ − D′) = S′/(S′ + |D′|).</p>"
         "<p><b>Steg 2: gang teller og nevner med P/x.</b> I utgangspunktet er P = p, så P/x er den samme faktoren "
         "for begge kurvene. S′ × P/x = ε<sub>S</sub> og |D′| × P/x = |ε<sub>D</sub>|. Da blir andelen "
         "ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|).</p>"
         "<p><b>Kontroll med tall.</b> ε<sub>S</sub> = 1,2 og ε<sub>D</sub> = −0,4 [eksempeltall] gir kjøperen "
         "1,2/1,6 = 75 % og selgeren 0,4/1,6 = 25 %. Etterspørselen er minst elastisk og bærer mest ✓. Andelene "
         "summerer til 100 % ✓.</p>"
         "<p><b>Husk:</b> telleren i kjøperens andel er den andre sidens elastisitet. Jo lettere selgeren kan "
         "trekke seg unna, jo mer havner hos kjøperen.</p>",
)

statisk(
    "ins-s06", tema="insidens", type="formel", hjelp=HJELP["ins-s06"],
    q="<p>Du skal finne ∂p/∂t fra likevekten D(p + t) = S(p), der p er produsentprisen og t en stykkskatt. "
      "Begge sider deriveres med hensyn på t. Hva blir den deriverte av venstresiden, D(p + t)?</p>",
    alternativer=[
        R("D′ × (∂p/∂t + 1)"),
        F("D′ × ∂p/∂t", "Glemt at også t står i argumentet. Argumentet p + t endrer seg med ∂p/∂t + 1."),
        F("D′ + ∂p/∂t", "Kjerneregelen gir et produkt, ikke en sum: den ytre deriverte ganger den indre."),
        F("D′ × (∂p/∂t − 1)", "Fortegnet snudd. Argumentet er p + t, så den indre deriverte er ∂p/∂t + 1."),
    ],
    kort="<p><b>D′ × (∂p/∂t + 1).</b> Kjerneregelen: den ytre deriverte D′ ganger den indre deriverte av "
         "p + t, som er ∂p/∂t + 1.</p>",
    full="<p><b>Hvorfor dette steget avgjør alt.</b> Hele utledningen av insidensformlene står på denne linjen. "
         "Glemmer du +1, mister du skatten selv fra ligningen. Da finnes det ingen løsning.</p>"
         "<p><b>Steg 1: kjerneregelen.</b> D(p + t) er en sammensatt funksjon. Den ytre deriverte er D′. Den indre "
         "er hvor mye argumentet p + t endrer seg når t øker med én: ∂p/∂t fra produsentprisen og 1 fra t selv.</p>"
         "<p><b>Steg 2: resten av utledningen.</b> D′ × (∂p/∂t + 1) = S′ × ∂p/∂t. Gang ut: D′ × ∂p/∂t + D′ = "
         "S′ × ∂p/∂t. Samle leddene med ∂p/∂t: D′ = (S′ − D′) × ∂p/∂t. Del: ∂p/∂t = D′/(S′ − D′).</p>"
         "<p><b>Kontroll.</b> Med D′ = −2 og S′ = 3 [eksempeltall] gir det ∂p/∂t = −2/5 = −0,40, mellom −1 og 0 ✓. "
         "Uten +1 ville ligningen blitt D′ × ∂p/∂t = S′ × ∂p/∂t, som bare har løsningen ∂p/∂t = 0.</p>"
         "<p><b>Husk:</b> argumentet p + t gir indre derivert ∂p/∂t + 1.</p>",
)

statisk(
    "ins-s07", tema="insidens", type="begrep", hjelp=HJELP["ins-s07"],
    q="<p>En monopolist har konstant grensekostnad og møter en lineær etterspørselskurve. Staten innfører en "
      "stykkskatt t per enhet. Hvor mye stiger prisen kundene betaler?</p>",
    alternativer=[
        R("Med t/2"),
        F("Med hele t, fordi monopolisten har markedsmakt",
          "Markedsmakten er alt brukt før skatten kommer. Full overvelting ville koste for mange kunder."),
        F("Ingenting, fordi prisen alt er satt optimalt",
          "Skatten øker grensekostnaden. Da flytter det optimale punktet seg til et lavere kvantum og en høyere "
          "pris."),
        F("Med S′/(S′ − D′) × t, som i frikonkurranse",
          "Et monopol har ingen tilbudskurve. Formelen gjelder frikonkurranse."),
    ],
    kort="<p><b>Med t/2.</b> MR = MC + t gir P = (a + c + t)/2 når P = a − bx og grensekostnaden er c. Prisen "
         "stiger med halve skatten.</p>",
    full="<p><b>Hvordan monopolisten tilpasser seg.</b> Monopolisten velger kvantumet der grenseinntekten er lik "
         "grensekostnaden. En stykkskatt øker grensekostnaden med t, så betingelsen blir MR = MC + t.</p>"
         "<p><b>Steg 1: grenseinntekten.</b> Med P = a − bx er MR = a − 2bx: dobbelt så bratt som etterspørselen.</p>"
         "<p><b>Steg 2: kvantum og pris.</b> a − 2bx = c + t gir x = (a − c − t)/(2b). Da er P = a − bx = "
         "(a + c + t)/2. Prisen stiger med ½ for hver krone skatt.</p>"
         "<p><b>Kontroll med tall (H2021 oppgave 2).</b> P = 3 − Q og grensekostnad 1 gir P = 2 uten skatt. Med "
         "t = 1 blir P = (3 + 1 + 1)/2 = 2,50. Prisen steg 0,50, altså halve skatten ✓. Monopolisten sitter igjen "
         "med 2,50 − 1 = 1,50, også 0,50 mindre ✓.</p>"
         "<p><b>Husk:</b> lineær etterspørsel og konstant grensekostnad gir 50/50 under monopol, uansett "
         "elastisitet. Under oligopol finnes ingen slik regel.</p>",
)

statisk(
    "ins-s08", tema="insidens", type="begrep", hjelp=HJELP["ins-s08"],
    q="<p>Arbeidsgiveren betaler inn en avgift per arbeidstime til staten. Hva avgjør hvor mye av avgiften "
      "arbeidstakerne bærer gjennom lavere lønn?</p>",
    alternativer=[
        R("Elastisitetene til arbeidstilbudet og arbeidsetterspørselen"),
        F("At det er arbeidsgiveren som betaler avgiften inn til staten",
          "Det er formell insidens. Hvem som betaler inn, endrer ikke likevekten."),
        F("Hvor høy avgiften er i prosent av lønnen",
          "Nivået avgjør hvor stor byrden er, ikke hvordan den deles. Delingen følger elastisitetene."),
        F("Hva loven sier om hvem avgiften skal belastes",
          "Loven bestemmer den formelle insidensen. Den reelle bestemmes i markedet."),
    ],
    kort="<p><b>Elastisitetene i arbeidsmarkedet.</b> Arbeidstakerne bærer andelen |ε<sub>D</sub>|/(ε<sub>S</sub> "
         "+ |ε<sub>D</sub>|) av en avgift på arbeidsgiveren. Hvem som betaler inn, spiller ingen rolle.</p>",
    full="<p><b>Formell og reell insidens.</b> Formell insidens er hvem loven sier skal betale skatten inn. Reell "
         "insidens er hvem som får lavere velferd fordi skatten finnes. De trenger ikke være de samme.</p>"
         "<p><b>Steg 1: still opp markedet.</b> Arbeidsgiveren etterspør timer og betaler W i alt per time. "
         "Arbeidstakeren tilbyr timer og sitter igjen med w. Avgiften er kilen: W = w + t.</p>"
         "<p><b>Steg 2: delingen.</b> Arbeidsgiverens kostnad stiger med andelen ε<sub>S</sub>/(ε<sub>S</sub> + "
         "|ε<sub>D</sub>|) av avgiften. Lønnen arbeidstakeren får, faller med resten. Er arbeidstilbudet lite "
         "elastisk, faller lønnen med nesten hele avgiften.</p>"
         "<p><b>Steg 3: flytt avgiften.</b> La arbeidstakeren betale den inn i stedet. Da er det fortsatt W = w + t, "
         "så likevekten er den samme. Hvem som betaler inn, endrer altså ikke delingen.</p>"
         "<p><b>Steg 4: et eksempel fra faget.</b> Den amerikanske lønnsavgiften deles formelt likt mellom "
         "arbeidsgiver og arbeidstaker. Standardsynet er likevel at arbeidstakerne bærer (nesten) hele. Grunnen er "
         "at arbeidstilbudet er lite elastisk, ikke hvordan loven fordeler innbetalingen.</p>"
         "<p><b>Husk:</b> den minst elastiske siden bærer mest, uansett hvem loven peker på.</p>",
)

statisk(
    "ins-s09", tema="insidens", type="begrep", hjelp=HJELP["ins-s09"],
    q="<p>En avgift på kr 5 per enhet betales i dag inn av selgerne. Stortinget vedtar at kjøperne skal betale "
      "den inn direkte til staten i stedet. Tilbuds- og etterspørselskurvene er de samme. Hva skjer med det "
      "kjøperne betaler i alt per enhet, avgiften medregnet?</p>",
    alternativer=[
        R("Ingenting, det blir det samme som før"),
        F("Det stiger med kr 5, siden kjøperne nå betaler avgiften",
          "Prisen kjøperne betaler selgerne, faller like mye. Totalen er uendret."),
        F("Det stiger, men med mindre enn kr 5",
          "Det ville vært riktig om avgiften ble innført. Her flyttes den bare."),
        F("Det kommer an på elastisitetene",
          "Elastisitetene avgjør delingen av avgiften, men delingen er den samme før og etter flyttingen."),
    ],
    kort="<p><b>Ingenting.</b> I begge tilfeller er det kjøperne betaler i alt, P = p + 5. Likevekten er samme "
         "ligning, D(p + 5) = S(p). Prisen til selgerne faller med 5, men totalen er uendret.</p>",
    full="<p><b>Hvorfor innkrevingen ikke betyr noe.</b> En avgift legger en kile mellom det kjøperen betaler i "
         "alt (P) og det selgeren sitter igjen med (p). Kilen er den samme uansett hvem som overfører pengene "
         "til staten.</p>"
         "<p><b>Steg 1: selgerne betaler inn.</b> Kjøperen betaler P til selgeren. Selgeren sender 5 til staten "
         "og sitter igjen med p = P − 5. Likevekten er D(P) = S(P − 5).</p>"
         "<p><b>Steg 2: kjøperne betaler inn.</b> Kjøperen betaler p til selgeren og 5 til staten, i alt P = p + 5. "
         "Likevekten er D(p + 5) = S(p), den samme ligningen.</p>"
         "<p><b>Steg 3: hva som endres på papiret.</b> Prisen i butikkhyllen faller med 5, fordi den ikke lenger "
         "inneholder avgiften. Kjøperen legger på 5 selv. Totalen og det selgeren sitter igjen med er "
         "uendret.</p>"
         "<p><b>Kontroll.</b> Hadde totalen steget med 5, ville selgeren fått 5 mer uten at noe i markedet er "
         "endret. Da stiger tilbudt mengde mens etterspurt mengde faller. Det er ingen likevekt ✓.</p>"
         "<p><b>Husk:</b> formell insidens avgjør ikke reell insidens. Bare helningene gjør det.</p>",
)

statisk(
    "ins-s10", tema="insidens", type="begrep", hjelp=HJELP["ins-s10"],
    q="<p>Den siden av markedet som er minst elastisk, bærer mest av en stykkskatt. Hva er den økonomiske "
      "grunnen til det?</p>",
    alternativer=[
        R("Den har færrest alternativer å gå til når prisen endres"),
        F("Den betaler som regel skatten inn til staten", "Hvem som betaler inn, betyr ingenting for delingen."),
        F("Den har størst markedsmakt og tjener mest", "I frikonkurranse har ingen markedsmakt. Delingen kommer "
                                                       "av helningene."),
        F("Den har lavest kostnad ved å endre kvantumet", "Feil vei. Den som lett kan endre kvantumet, er den mest "
                                                          "elastiske. Den bærer minst."),
    ],
    kort="<p><b>Færrest alternativer.</b> Den som ikke kan trekke seg unna, må ta skatten. Den som lett kan "
         "kjøpe noe annet eller produsere noe annet, slipper.</p>",
    full="<p><b>Elastisitet er alternativer.</b> En elastisk etterspørsel betyr at kjøperne lett kan droppe varen "
         "eller kjøpe en erstatning. En elastisk tilbudskurve betyr at selgerne lett kan flytte kapitalen til "
         "noe annet.</p>"
         "<p><b>Steg 1: kjøperne har mange alternativer.</b> Prøver selgerne å velte skatten over i prisen, "
         "forsvinner kundene. Selgerne må ta det meste selv.</p>"
         "<p><b>Steg 2: kjøperne har ingen alternativer.</b> Må de ha varen, som insulin, kan selgerne velte hele "
         "skatten over uten å miste salg.</p>"
         "<p><b>Steg 3: samme logikk på tilbudssiden.</b> En tomt kan ikke flyttes. Eieren bærer skatten selv. "
         "Kan produsenten flytte kapitalen til en annen bransje, må kjøperen bære den.</p>"
         "<p><b>Kontroll med formelen.</b> Kjøperens andel er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). "
         "Er |ε<sub>D</sub>| liten, er andelen nær 1 ✓.</p>"
         "<p><b>Husk:</b> insidens handler om mobilitet, ikke om lovtekst.</p>",
)

statisk(
    "ins-s11", tema="insidens", type="paastand", hjelp=HJELP["ins-s11"],
    q="<p>Hvilken påstand om dødvektstapet av en stykkskatt i et frikonkurransemarked er riktig?</p>",
    alternativer=[
        R("Det er null når etterspørselen er perfekt uelastisk"),
        F("Det er størst når etterspørselen er perfekt uelastisk",
          "Feil vei. Med D′ = 0 faller ikke kvantumet. Ingen handler går tapt."),
        F("Det vokser i takt med skatten, så dobbel skatt gir dobbelt tap",
          "Tapet vokser med t². Både høyden og bredden i trekanten dobles."),
        F("Det er lik den delen av skatten kjøperne bærer",
          "Det kjøperne bærer, går til staten som proveny. Tapet er handlene som ikke blir gjort."),
    ],
    kort="<p><b>Null ved perfekt uelastisk etterspørsel.</b> Dødvektstapet er ½ × t × kvantumsfallet. Faller ikke "
         "kvantumet, er det ingen trekant.</p>",
    full="<p><b>Hva dødvektstapet er.</b> En skatt stopper noen handler som både kjøper og selger ville tjent på. "
         "Gevinsten fra de handlene forsvinner. Penger som går til staten, er ikke et tap for samfunnet. De bare "
         "flytter seg.</p>"
         "<p><b>Steg 1: formelen.</b> Dødvektstap ≈ ½ × t × (x<sub>0</sub> − x<sub>t</sub>) = ½ × t² × "
         "|S′D′|/(S′ − D′).</p>"
         "<p><b>Steg 2: sett inn D′ = 0.</b> Telleren |S′ × 0| = 0. Kvantumet faller ikke. Tapet er null. "
         "Kjøperne bærer hele skatten, men alt de betaler, havner hos staten.</p>"
         "<p><b>Steg 3: dobbel skatt.</b> t² gjør at tapet firedobles. Kilen er dobbelt så høy. Kvantumsfallet "
         "er dobbelt så stort.</p>"
         "<p><b>Kontroll med tall.</b> Med D′ = −20, S′ = 40 og t = 3 [eksempeltall] faller kvantumet med "
         "20 × 2 = 40. Tapet er ½ × 3 × 40 = 60. Med t = 6 faller det 80. Tapet er da ½ × 6 × 80 = 240 = 4 × 60 ✓.</p>"
         "<p><b>Husk:</b> dødvektstapet måler tilpasning, ikke betaling. Uten tilpasning er det null.</p>",
)

statisk(
    "ins-s12", tema="insidens", type="tolkning", hjelp=HJELP["ins-s12"],
    q="<p>Bussreisende i en by har ingen alternativer og reiser like mye uansett pris. Busselskapene er mange, "
      "har konstant og lik grensekostnad og konkurrerer fritt. Staten har gitt selskapene et tilskudd per solgte "
      "billett. Nå fjernes tilskuddet. Hva skjer med billettprisen og antall reiser?</p>",
    alternativer=[
        R("Prisen stiger med hele tilskuddet. Antall reiser er uendret"),
        F("Prisen stiger med hele tilskuddet. Antall reiser faller",
          "Prisen er riktig, men kvantumet kan ikke falle når etterspørselen er perfekt uelastisk."),
        F("Prisen stiger med halve tilskuddet. Antall reiser er uendret",
          "Halvparten er monopolregelen. Med vannrett tilbud og loddrett etterspørsel bærer kjøperne alt."),
        F("Prisen er uendret. Antall reiser faller",
          "Speilbildet. Det gjelder når etterspørselen er perfekt elastisk og tilbudet er stigende."),
    ],
    kort="<p><b>Prisen stiger med hele tilskuddet. Antall reiser er uendret.</b> Å fjerne et tilskudd virker som "
         "en ny stykkskatt. Med D′ = 0 og S′ → ∞ bærer kjøperne alt. Kvantumet står stille.</p>",
    full="<p><b>Les ordlyden.</b> «Reiser like mye uansett pris» betyr perfekt uelastisk etterspørsel, D′ = 0. "
         "«Konstant og lik grensekostnad» i frikonkurranse betyr at tilbudskurven er vannrett ved "
         "grensekostnaden, S′ → ∞. Begge trekker samme vei: kjøperne bærer alt.</p>"
         "<p><b>Steg 1: et tilskudd er en negativ skatt.</b> Å fjerne det er det samme som å innføre en stykkskatt "
         "på samme beløp. Den vannrette tilbudskurven flyttes opp med hele beløpet.</p>"
         "<p><b>Steg 2: prisen.</b> ∂P/∂t = S′/(S′ − D′) = 1 med D′ = 0. Billettprisen stiger med hele "
         "tilskuddet.</p>"
         "<p><b>Steg 3: kvantumet.</b> Etterspørselskurven er loddrett. Den nye likevekten ligger rett over den "
         "gamle, så antall reiser er det samme.</p>"
         "<p><b>Kontroll med tall.</b> Grensekostnad kr 40 og tilskudd kr 10 [eksempeltall] ga billettpris kr 30. "
         "Uten tilskudd koster billetten kr 40, en økning på hele 10. Antall reiser er det samme ✓.</p>"
         "<p><b>Husk:</b> dette er H2022 oppgave 3 i ny drakt. Loddrett etterspørsel gir uendret kvantum.</p>",
)

statisk(
    "ins-s13", tema="insidens", type="paastand", hjelp=HJELP["ins-s13"],
    q="<p>En stykkskatt på t kroner legges på produsentene i et frikonkurransemarked med fallende etterspørsel og "
      "stigende tilbud (D′ &lt; 0 og S′ &gt; 0). Hvilken verdi kan ∂P/∂t <i>ikke</i> ha?</p>",
    alternativer=[
        R("1,20"),
        F("0,25", "Lovlig: mellom 0 og 1. Kjøperen bærer en fjerdedel, så etterspørselen er mer elastisk enn tilbudet."),
        F("0,80", "Lovlig: mellom 0 og 1. Kjøperen bærer det meste, så etterspørselen er minst elastisk."),
        F("0,50", "Lovlig: skatten deles på midten når S′ = |D′|."),
    ],
    kort="<p><b>1,20.</b> ∂P/∂t = S′/(S′ − D′) har positiv teller som er mindre enn nevneren S′ + |D′|. Verdien "
         "ligger derfor strengt mellom 0 og 1.</p>",
    full="<p><b>Filteret som stryker alternativer uten regning.</b> Med D′ &lt; 0 og S′ &gt; 0 er fortegnene gitt av "
         "økonomien. Da er tre ting alltid sanne. De er hele filteret ditt.</p>"
         "<p><b>Steg 1: nevneren.</b> S′ − D′ = S′ + |D′| er positiv.</p>"
         "<p><b>Steg 2: konsumentprisen.</b> ∂P/∂t = S′/(S′ + |D′|). Telleren er positiv og mindre enn nevneren, "
         "så 0 &lt; ∂P/∂t &lt; 1. Prisen kjøperen betaler, kan aldri stige med mer enn skatten.</p>"
         "<p><b>Steg 3: produsentprisen.</b> ∂p/∂t = D′/(S′ + |D′|) ligger mellom −1 og 0.</p>"
         "<p><b>Kontroll.</b> En verdi på 1,20 ville gitt ∂p/∂t = 1,20 − 1 = 0,20. Da ville en skatt på produsentene "
         "løftet prisen de sitter igjen med. Det er umulig ✓.</p>"
         "<p><b>Husk:</b> ∂P/∂t ligger mellom 0 og 1, ∂p/∂t mellom −1 og 0. Differansen er alltid 1. Endepunktene "
         "0 og 1 nås bare i grensetilfellene.</p>",
)

statisk(
    "ins-s14", tema="insidens", type="tolkning", hjelp=HJELP["ins-s14"],
    q="<p>En student har regnet ut ∂P/∂t og ∂p/∂t for en stykkskatt på produsentene i fire ulike "
      "frikonkurransemarkeder med fallende etterspørsel og stigende tilbud. Hvilket par kan være riktig?</p>",
    alternativer=[
        R("∂P/∂t = 0,35 og ∂p/∂t = −0,65"),
        F("∂P/∂t = 0,35 og ∂p/∂t = 0,65", "Positiv ∂p/∂t er umulig: en skatt kan ikke løfte produsentprisen. "
                                          "Differansen er dessuten −0,30, ikke 1."),
        F("∂P/∂t = 0,65 og ∂p/∂t = −0,65", "Differansen er 1,30. Kilen P − p øker bare med t, så differansen må "
                                           "være nøyaktig 1."),
        F("∂P/∂t = 1,25 og ∂p/∂t = 0,25", "Differansen er 1, men ∂P/∂t over 1 og positiv ∂p/∂t er begge umulige."),
    ],
    kort="<p><b>0,35 og −0,65.</b> Fortegnene stemmer og begge ligger i lovlig område. Differansen er "
         "0,35 − (−0,65) = 1.</p>",
    full="<p><b>Hvorfor paret må passe sammen.</b> Skatten er kilen mellom konsumentprisen og produsentprisen: "
         "P − p = t. Øker t med én krone, må P − p øke med én krone. Det gir identiteten ∂P/∂t − ∂p/∂t = 1, som "
         "holder for alle kurver.</p>"
         "<p><b>Steg 1: fortegnene.</b> ∂P/∂t skal være positiv og under 1. ∂p/∂t skal være negativ og over −1. "
         "Det stryker paret med 0,65 og paret med 1,25.</p>"
         "<p><b>Steg 2: differansen.</b> 0,65 − (−0,65) = 1,30. Det stryker det paret.</p>"
         "<p><b>Steg 3: det som står igjen.</b> 0,35 − (−0,65) = 1,00 ✓. Kjøperen bærer 35 % og selgeren 65 %, så "
         "tilbudet er minst elastisk i dette markedet.</p>"
         "<p><b>Kontroll med formlene.</b> S′ = 7 og D′ = −13 [eksempeltall] gir nevneren 20, ∂P/∂t = 7/20 = 0,35 "
         "og ∂p/∂t = −13/20 = −0,65 ✓. Paret finnes altså.</p>"
         "<p><b>Husk:</b> tre krav på ti sekunder. ∂P/∂t i (0, 1), ∂p/∂t i (−1, 0) og differansen lik 1.</p>",
)

statisk(
    "ins-s15", tema="insidens", type="paastand", hjelp=HJELP["ins-s15"],
    q="<p>Selskapsskatten betales inn av selskapene. Hva er hovedkonklusjonen fra Harbergers analyse av hvem som "
      "faktisk bærer den?</p>",
    alternativer=[
        R("Kapitalen bærer det meste, også kapital utenfor selskapssektoren"),
        F("Selskapene som betaler den inn, bærer den fullt ut", "Formell insidens forkledd som reell. Hvem som "
                                                                "betaler inn, avgjør ikke hvem som bærer."),
        F("Kundene bærer den fullt ut gjennom høyere priser på varene", "Det krever at kapitalen kan flyttes uten kostnad og "
                                                              "at kundene ikke har alternativer. Det er ikke "
                                                              "Harbergers resultat."),
        F("Arbeidstakerne bærer den fullt ut gjennom lavere lønn", "Over tid kan lønningene presses ned hvis "
                                                                    "kapitalen krymper. Harbergers hovedresultat er "
                                                                    "likevel at kapitalen bærer det meste."),
    ],
    kort="<p><b>Kapitalen generelt.</b> Kapital flytter fra selskapssektoren til andre sektorer til avkastningen "
         "etter skatt er lik. Da faller avkastningen på all kapital, ikke bare på aksjene i selskapene.</p>",
    full="<p><b>Hvorfor «selskapene betaler» er feil spørsmål.</b> Et selskap er en juridisk enhet. Skatten må "
         "til slutt bæres av mennesker: eiere av kapital, arbeidstakere eller kunder. Hvem som bærer hvor mye, er "
         "et spørsmål om elastisiteter.</p>"
         "<p><b>Steg 1: skatten treffer kapitalen i én sektor.</b> Avkastningen etter skatt faller i "
         "selskapssektoren.</p>"
         "<p><b>Steg 2: kapitalen flytter.</b> Investorer flytter kapital til sektorer uten selskapsskatt. Mer "
         "kapital der presser avkastningen ned også der.</p>"
         "<p><b>Steg 3: ny likevekt.</b> Avkastningen etter skatt blir lik overalt, men lavere enn før. All kapital "
         "har båret en del av skatten.</p>"
         "<p><b>Over tid.</b> Faller sparingen og dermed kapitalbeholdningen, presses lønningene ned. Da bærer "
         "arbeidstakerne en del. Det amerikanske Congressional Budget Office legger til grunn at halvparten veltes "
         "over på lønninger og priser.</p>"
         "<p><b>Husk:</b> hvem som betaler, er et empirisk spørsmål om elastisiteter, ikke et juridisk spørsmål om "
         "hvem kravet rettes mot.</p>",
)

statisk(
    "ins-s16", tema="insidens", type="paastand", hjelp=HJELP["ins-s16"],
    q="<p>En avis selger både abonnementer til lesere og annonseplass til annonsører. Staten innfører "
      "merverdiavgift på abonnementene. Hvilken påstand er riktig etter forelesningens analyse av tosidige "
      "markeder?</p>",
    alternativer=[
        R("Abonnementsprisen kan falle"),
        F("Abonnementsprisen må stige med hele avgiften", "Det gjelder perfekt uelastisk etterspørsel i et vanlig "
                                                          "marked, ikke en plattform med to kundegrupper."),
        F("Abonnementsprisen må stige med halve avgiften", "Halvparten er monopolregelen med lineær etterspørsel og konstant grensekostnad. "
                                                           "Plattformer følger ikke den regelen."),
        F("Annonsørene bærer ingen del av avgiften", "Avisen kan nettopp la annonsemarkedet bære avgiften, fordi "
                                                     "flere lesere gjør annonseplassen mer verdt."),
    ],
    kort="<p><b>Prisen kan falle.</b> Hver ekstra leser gjør annonseplassen mer verdt. Avisen kan derfor tjene på "
         "å holde abonnementsprisen nede eller senke den. Tapet tas igjen i annonsemarkedet.</p>",
    full="<p><b>Hva et tosidig marked er.</b> En plattform betjener to grupper som er avhengige av hverandre. "
         "Avisen har lesere og annonsører. Et sosialt medium har brukere og annonsører. Regelen om pris lik "
         "grensekostnad gjelder ikke på hver side for seg.</p>"
         "<p><b>Steg 1: leserne er verdt mer enn abonnementet.</b> Hver leser gir avisen abonnementspris pluss "
         "høyere annonseinntekter. Avisen priser derfor abonnementet lavt.</p>"
         "<p><b>Steg 2: avgiften kommer.</b> Stiger abonnementsprisen, mister avisen lesere og dermed "
         "annonseinntekter. Det kan lønne seg å holde prisen nede eller senke den.</p>"
         "<p><b>Steg 3: konklusjonen.</b> En vare som skattlegges, kan falle i pris. Det motsatte kan også skje: "
         "en skatt på datainnsamling kan gi månedsavgift for brukere som før var gratis.</p>"
         "<p><b>Kontroll.</b> Påstander som «prisen må stige» bygger på modellen med én tilbudskurve og én "
         "etterspørselskurve. Den holder ikke her.</p>"
         "<p><b>Husk:</b> 0 &lt; ∂P/∂t &lt; 1 er et resultat fra frikonkurransemodellen, ikke en naturlov.</p>",
)

statisk(
    "ins-s17", tema="insidens", type="begrep", hjelp=HJELP["ins-s17"],
    q="<p>Elbiler var lenge fritatt for bompenger. Fritaket ble trappet ned da mange nok kjørte elbil. Hvilket "
      "begrep fra forelesningen om dynamisk insidens beskriver problemet dette skaper for den som vurderer å "
      "kjøpe elbil?</p>",
    alternativer=[
        R("Tidsinkonsistens"),
        F("Skattearbitrasje", "Arbitrasje er å utnytte at to sider av en transaksjon skattlegges ulikt. Her handler "
                              "det om et løfte som ikke holdes."),
        F("Dødvektstap", "Dødvektstap er handler som ikke blir gjort på grunn av en skattekile. Det er ikke "
                         "poenget her."),
        F("Formell insidens", "Formell insidens er hvem loven sier skal betale inn. Her handler det om at regelen "
                              "endres over tid."),
    ],
    kort="<p><b>Tidsinkonsistens.</b> En politikk som er optimal å love i dag, er ikke optimal å holde senere. "
         "Når folk vet det, lar de være å investere. Det er et hold-up-problem.</p>",
    full="<p><b>Hva tidsinkonsistens er.</b> Staten lover en skattefordel for å få folk til å investere. Når "
         "investeringen er gjort og ikke kan reverseres, har staten ikke lenger grunn til å holde løftet. Den kan "
         "skattlegge det som er bygget eller kjøpt, uten at noen kan flytte.</p>"
         "<p><b>Steg 1: løftet.</b> Fritak for bompenger gjorde elbil billigere å bruke. Mange kjøpte.</p>"
         "<p><b>Steg 2: fristelsen.</b> Da mange nok kjørte elbil, ble fritaket dyrt. Bilene var alt kjøpt, så "
         "staten kunne fjerne fordelen uten at kjøpene ble reversert.</p>"
         "<p><b>Steg 3: hold-up.</b> Den neste kjøperen forstår mønsteret og regner med at fordelen er midlertidig. "
         "Det svekker virkningen av alle slike løfter.</p>"
         "<p><b>Løsningen.</b> Troverdig binding, som Odyssevs bundet til masten eller Norges Banks uavhengige "
         "rentesetting.</p>"
         "<p><b>Personlig økonomi.</b> Unngå å bli låst fast i en posisjon der en ny skatt havner på deg. En "
         "hytteeier i en kommune uten eiendomsskatt bør regne med at skatten kan komme.</p>"
         "<p><b>Husk:</b> en skattefordel du ikke kan flytte fra, er en fordel staten kan ta tilbake.</p>",
)

statisk(
    "ins-s18", tema="insidens", type="paastand", hjelp=HJELP["ins-s18"],
    q="<p>Staten skal hente inn et gitt proveny med avgifter på flere varer og vil ha minst mulig "
      "effektivitetstap. Hva sier Ramsey-regelen?</p>",
    alternativer=[
        R("Satsen skal være høyest der tilbud eller etterspørsel er minst elastisk"),
        F("Satsen skal være høyest der tilbudet eller etterspørselen er mest elastisk",
          "Feil vei. Der kvantumet reagerer mest, gir en avgift størst dødvektstap."),
        F("Alle varer skal ha samme sats for å unngå vridning",
          "Like satser er Sandmos pragmatiske råd når elastisitetene er ukjente, ikke Ramsey-regelen."),
        F("Satsen skal være lavest på varer der kjøperne bærer avgiften",
          "Det er ofte motsatt. Kjøperne bærer mest der etterspørselen er uelastisk. Der gir avgiften minst tap."),
    ],
    kort="<p><b>Høyest sats der elastisiteten er lavest.</b> Dødvektstapet kommer av at kvantumet faller. Der "
         "kvantumet reagerer lite, koster en krone i proveny minst.</p>",
    full="<p><b>Hva regelen gjør.</b> Ramsey-regelen svarer på hvordan et gitt proveny skal hentes inn med minst "
         "mulig samlet effektivitetstap. Den bygger direkte på dødvektstapsformelen.</p>"
         "<p><b>Steg 1: hvor tapet kommer fra.</b> Dødvektstapet er ½ × t × kvantumsfallet. Kvantumsfallet er stort "
         "når tilbud eller etterspørsel er elastisk og lite når de er uelastiske.</p>"
         "<p><b>Steg 2: konklusjonen.</b> Legg mest av skatten der kvantumet reagerer minst. Da blir provenyet stort "
         "i forhold til tapet.</p>"
         "<p><b>Steg 3: konflikten med fordeling.</b> Der etterspørselen er minst elastisk, bærer kjøperne mest av "
         "skatten. Den skatten som gir minst dødvektstap, treffer altså kjøperne hardest. Insidens og effektivitet "
         "trekker i hver sin retning.</p>"
         "<p><b>Kontroll med grensetilfellet.</b> Med D′ = 0 er dødvektstapet null. Ramsey-regelen ville lagt mye "
         "skatt der, men kjøperne ville båret alt ✓.</p>"
         "<p><b>Husk:</b> lav elastisitet gir lavt tap og høy byrde på den uelastiske siden.</p>",
)

statisk(
    "ins-s19", tema="insidens", type="tolkning", hjelp=HJELP["ins-s19"],
    q="<p>Staten vurderer en avgift på et legemiddel som pasientene må ha uansett pris. Tilbudet er stigende. "
      "Hvilket utsagn beskriver virkningen riktig?</p>",
    alternativer=[
        R("Avgiften gir ikke dødvektstap, men pasientene bærer hele den"),
        F("Avgiften gir stort dødvektstap fordi pasientene ikke kan tilpasse seg",
          "Feil vei. Dødvektstapet er handler som ikke blir gjort. Her faller ikke kvantumet."),
        F("Produsentene bærer avgiften fordi de betaler den inn",
          "Formell insidens. Med D′ = 0 er ∂p/∂t = 0, så produsentene sitter igjen med det samme som før."),
        F("Avgiften deles mellom pasientene og produsentene",
          "Deling krever at begge kurvene har helning. Med D′ = 0 er ∂P/∂t = 1."),
    ],
    kort="<p><b>Ingen dødvektstap, pasientene bærer alt.</b> D′ = 0 gir ∂P/∂t = 1 og uendret kvantum. Alt "
         "pasientene betaler ekstra, går til staten.</p>",
    full="<p><b>Insidens og effektivitet er to spørsmål.</b> Insidens spør hvem som bærer skatten. Effektivitet "
         "spør hvor mye som går tapt underveis. Et uelastisk marked gir et klart svar på begge, men de trekker hver "
         "sin vei.</p>"
         "<p><b>Steg 1: insidensen.</b> ∂P/∂t = S′/(S′ − 0) = 1. Prisen pasientene betaler, stiger med hele "
         "avgiften. ∂p/∂t = 0, så produsentene merker ingenting.</p>"
         "<p><b>Steg 2: kvantumet.</b> ∂x/∂t = S′D′/(S′ − D′) = 0. Pasientene kjøper like mye som før.</p>"
         "<p><b>Steg 3: dødvektstapet.</b> ½ × t × 0 = 0. Ingen handler forsvinner. Avgiften er en ren overføring "
         "fra pasientene til staten.</p>"
         "<p><b>Kontroll med tall.</b> Pris kr 240, avgift kr 60 og 50 000 pakninger [eksempeltall]. Ny pris kr 300, "
         "proveny 60 × 50 000 = kr 3 000 000, som er nøyaktig det pasientene betaler ekstra ✓.</p>"
         "<p><b>Husk:</b> null dødvektstap betyr ikke at ingen taper. Det betyr at alt tapet havner hos staten.</p>",
)

statisk(
    "ins-s20", tema="insidens", type="begrep", hjelp=HJELP["ins-s20"],
    q="<p>Måler du skattebyrden mot inntekten husholdningen har i ett enkelt år, ser skattesystemet mer regressivt "
      "ut enn det er. Hva er grunnen?</p>",
    alternativer=[
        R("Lav årsinntekt skyldes ofte livsfasen, ikke fattigdom over livet"),
        F("Merverdiavgift betales bare av husholdninger med lav inntekt", "Merverdiavgift betales av alle som "
                                                                          "kjøper varer. Det er forbruket som teller."),
        F("Personer med høy inntekt betaler ikke skatt på kapitalinntekt", "Kapitalinntekt skattlegges også, så "
                                                                           "det forklarer ikke målefeilen."),
        F("Skattesystemet er regressivt, så målingen viser det riktige bildet", "Påstanden overser at årsinntekt er "
                                                                                 "et dårlig mål på hvem som er fattig."),
    ],
    kort="<p><b>Livsløpet.</b> Studenter og pensjonister har lav årsinntekt, men bruker av lån og sparing. "
         "Forbruksskatter blir da en stor andel av årsinntekten, uten at de er fattige over livet.</p>",
    full="<p><b>Hva livsløpsinsidens er.</b> Skattebyrden kan måles mot inntekten ett år eller mot inntekten over "
         "hele livet. Valget av nevner avgjør hvor progressivt systemet ser ut.</p>"
         "<p><b>Steg 1: hvem som har lav årsinntekt.</b> Mange med lav inntekt i ett år er studenter, unge i "
         "etablering eller pensjonister. De bruker mer enn de tjener, finansiert med lån eller sparing.</p>"
         "<p><b>Steg 2: hva det gjør med målingen.</b> Forbruksskatter som merverdiavgift blir da store i forhold "
         "til årsinntekten. Det ser ut som systemet treffer de fattige hardest.</p>"
         "<p><b>Steg 3: over livet.</b> Over hele livet jevnes forbruk og inntekt ut. Merverdiavgiften er da nær "
         "proporsjonal. Adam og Miller peker på at den kan være progressiv fordi den treffer eksisterende "
         "formue når den brukes.</p>"
         "<p><b>Kontroll.</b> Pechman og Okner fant at det amerikanske systemet er omtrent proporsjonalt over de "
         "midterste åtte desilene. Antakelsene om overvelting endret lite på det bildet.</p>"
         "<p><b>Husk:</b> nevneren du velger, avgjør hva du finner.</p>",
)

statisk(
    "ins-s21", tema="insidens", type="begrep", hjelp=HJELP["ins-s21"],
    q="<p>Kjøperens andel av en stykkskatt kan skrives både som S′/(S′ − D′) med helninger og som "
      "ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) med elastisiteter. Hvorfor gir de samme svar?</p>",
    alternativer=[
        R("Elastisitet er helning × P/x, der P/x er felles i startpunktet"),
        F("Elastisitet og helning er det samme tallet når kurvene er rette linjer",
          "Langs en rett linje er helningen konstant, men elastisiteten endrer seg med P/x."),
        F("Elastisitetene er konstante langs rette linjer, så de kan settes inn i stedet",
          "Feil: elastisiteten varierer langs en rett linje fordi P/x varierer."),
        F("Formlene gir bare samme svar når skatten deles på midten",
          "De gir alltid samme svar i startpunktet, fordi P/x forkortes bort."),
    ],
    kort="<p><b>P/x forkortes bort.</b> ε<sub>S</sub> = S′ × p/x og ε<sub>D</sub> = D′ × P/x. Før skatten er "
         "P = p, så faktoren er felles i teller og nevner.</p>",
    full="<p><b>Hva en elastisitet er.</b> En helning måler enheter per krone. En elastisitet måler prosent "
         "endring i kvantum per prosent endring i prisen: ε = helning × pris/kvantum. Elastisiteten er uten "
         "enhet.</p>"
         "<p><b>Steg 1: skriv elastisitetene.</b> ε<sub>S</sub> = S′ × p/x og |ε<sub>D</sub>| = |D′| × P/x.</p>"
         "<p><b>Steg 2: sett inn.</b> ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) = (S′ × P/x)/(S′ × P/x + "
         "|D′| × P/x). I startpunktet er P = p, så P/x står i alle ledd og forkortes bort. Igjen står "
         "S′/(S′ + |D′|) = S′/(S′ − D′).</p>"
         "<p><b>Kontroll med forelesningens tall.</b> P = 5, x = 100, D′ = −16,67 og S′ = 25 gir ε<sub>D</sub> = "
         "−0,83 og ε<sub>S</sub> = 1,25. Med helninger: 25/41,67 = 0,60. Med elastisiteter: 1,25/2,08 = 0,60 ✓.</p>"
         "<p><b>Hvorfor elastisiteter er nyttige.</b> Elastisiteter er uten enhet. Derfor kan de sammenlignes på tvers av varer og markeder, mens helninger avhenger av om kvantum måles i liter eller tonn.</p>"
         "<p><b>Husk:</b> regelen med elastisiteter er regelen med helninger, målt i prosent i stedet for i "
         "kroner og enheter.</p>",
)

# ---------------------------------------------------------------------------
# Påstandspar: Bare I, Bare II, Begge, Ingen (fast rekkefølge)
# ---------------------------------------------------------------------------
def _par_q(I, II):
    return (f"<p>Vurder de to påstandene om en stykkskatt.</p><p>I: {I}</p><p>II: {II}</p>"
            f"<p>Hvilke av påstandene er riktige?</p>")


statisk(
    "ins-s22", tema="insidens", type="paastand", rekkefolge="fast", hjelp=HJELP["ins-s22"],
    q=_par_q("Kjøpernes andel av skatten er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|), der ε<sub>S</sub> og "
             "ε<sub>D</sub> er tilbuds- og etterspørselselastisiteten.",
             "Den som betaler skatten inn til staten, bærer alltid minst halvparten av den."),
    alternativer=[
        R("Bare I"),
        F("Bare II", "II er gal: hvem som betaler inn, er formell insidens. I er riktig."),
        F("Begge", "II er gal. En selger som betaler inn, kan bære nesten ingenting når etterspørselen er uelastisk."),
        F("Ingen", "I er riktig: tilbudselastisiteten står i telleren for kjøpernes andel."),
    ],
    kort="<p><b>Bare I.</b> Kjøpernes andel er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Hvem som betaler "
         "inn, avgjør ikke hvem som bærer skatten.</p>",
    full="<p><b>Påstand I.</b> Elastisitetsregelen sier at den minst elastiske siden bærer mest. Kjøpernes andel "
         "er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Er tilbudet svært elastisk, er andelen nær 1. Riktig.</p>"
         "<p><b>Påstand II.</b> Likevekten D(p + t) = S(p) er den samme uansett hvem som betaler inn. Delingen "
         "avhenger bare av helningene. Med perfekt uelastisk etterspørsel bærer kjøperne alt, også når selgerne "
         "betaler inn. Gal.</p>"
         "<p><b>Kontroll med tall.</b> ε<sub>S</sub> = 1,6 og ε<sub>D</sub> = −0,4 [eksempeltall] gir kjøperne "
         "1,6/2,0 = 80 %. Selgerne, som betaler inn, bærer bare 20 % ✓. Det motbeviser II.</p>"
         "<p><b>Hvorfor II frister.</b> Det føles rimelig at den som skriver ut sjekken, taper mest. Men selgeren "
         "løfter prisen og henter pengene fra kjøperen. Hvor mye han får til, avhenger av hvor lett kjøperen kan "
         "gå et annet sted.</p>"
         "<p><b>Husk:</b> formell insidens (hvem loven peker på) og reell insidens (hvem som taper) er to ulike "
         "ting.</p>",
)

statisk(
    "ins-s23", tema="insidens", type="paastand", rekkefolge="fast", hjelp=HJELP["ins-s23"],
    q=_par_q("Statens proveny er skatten per enhet ganget med kvantumet som ble omsatt før skatten ble innført.",
             "Dødvektstapet er null når tilbudet er perfekt uelastisk."),
    alternativer=[
        F("Bare I", "I er gal: provenyet regnes av det nye kvantumet. II er riktig."),
        R("Bare II"),
        F("Begge", "I er gal. Det gamle kvantumet overvurderer provenyet med t × kvantumsfallet."),
        F("Ingen", "II er riktig: med S′ = 0 faller ikke kvantumet. Da finnes ingen trekant."),
    ],
    kort="<p><b>Bare II.</b> Provenyet er t × nytt kvantum. Med perfekt uelastisk tilbud faller ikke kvantumet. "
         "Da er dødvektstapet null.</p>",
    full="<p><b>Påstand I.</b> Skatten betales bare på enhetene som faktisk omsettes. Etter skatten er kvantumet "
         "lavere. Med forelesningens tall, t = 1, kvantum 100 før og 90 etter, er provenyet 1 × 90 = 90, ikke 100. "
         "Gal.</p>"
         "<p><b>Påstand II.</b> Dødvektstapet er ½ × t² × |S′D′|/(S′ − D′). Med S′ = 0 er telleren null. Kvantumet "
         "kan ikke endres, så ingen handler forsvinner. Selgerne bærer hele skatten, men det er en overføring til "
         "staten, ikke et tap for samfunnet. Riktig.</p>"
         "<p><b>Kontroll.</b> ∂x/∂t = S′D′/(S′ − D′) = 0 når S′ = 0 ✓. Uendret kvantum betyr null trekant. Det "
         "samme gjelder perfekt uelastisk etterspørsel, D′ = 0. Da er det kjøperne som bærer skatten, men tapet er "
         "fortsatt null.</p>"
         "<p><b>Husk:</b> proveny = t × nytt kvantum. Dødvektstapet er null når én av sidene er perfekt "
         "uelastisk.</p>",
)

statisk(
    "ins-s24", tema="insidens", type="paastand", rekkefolge="fast", hjelp=HJELP["ins-s24"],
    q=_par_q("Er tilbudet perfekt elastisk, stiger prisen kjøperen betaler med hele skatten.",
             "Under monopol med lineær etterspørsel og konstant grensekostnad stiger prisen med halve skatten."),
    alternativer=[
        F("Bare I", "II er også riktig: MR = MC + t gir P = (a + c + t)/2."),
        F("Bare II", "I er også riktig: S′ → ∞ gir ∂P/∂t = 1."),
        R("Begge"),
        F("Ingen", "Begge stemmer. I følger av ∂P/∂t = S′/(S′ − D′) → 1, II av MR = MC + t."),
    ],
    kort="<p><b>Begge.</b> S′ → ∞ gir ∂P/∂t = 1. Med P = a − bx og grensekostnad c gir MR = MC + t prisen "
         "(a + c + t)/2, altså en økning på t/2.</p>",
    full="<p><b>Påstand I.</b> Perfekt elastisk tilbud betyr at selgerne leverer så mye som helst til en fast pris, "
         "for eksempel en gitt verdenspris. Del teller og nevner i ∂P/∂t = S′/(S′ − D′) på S′: 1/(1 − D′/S′). Når "
         "S′ → ∞, går D′/S′ mot 0. Da går brøken mot 1. Kjøperen bærer alt. Riktig.</p>"
         "<p><b>Påstand II.</b> Monopolisten setter MR = MC + t. Med P = a − bx er MR = a − 2bx. Det gir "
         "x = (a − c − t)/(2b) og P = (a + c + t)/2. Prisen stiger med ½ per krone skatt. Riktig.</p>"
         "<p><b>Kontroll med tall.</b> H2021 oppgave 2: P = 3 − Q, grensekostnad 1 og t = 1 gir prisen 2,50 mot "
         "2,00 uten skatt ✓.</p>"
         "<p><b>Hvorfor monopolisten ikke velter over alt.</b> Han har alt satt prisen der profitten er størst. Hever han prisen med hele skatten, mister han for mange kunder. Derfor deler han skatten med kundene.</p>"
         "<p><b>Husk:</b> frikonkurranse fordeler etter helningene. Monopol med lineær etterspørsel og konstant "
         "grensekostnad fordeler alltid "
         "50/50.</p>",
)

statisk(
    "ins-s25", tema="insidens", type="paastand", rekkefolge="fast", hjelp=HJELP["ins-s25"],
    q=_par_q("Under oligopol veltes alltid halvparten av en stykkskatt over på kundene.",
             "En avgift på en vare kan aldri føre til at prisen kundene betaler for varen, faller."),
    alternativer=[
        F("Bare I", "I er gal: oligopol har ingen entydig regel. II er også gal."),
        F("Bare II", "II er gal: i tosidige markeder kan en avgift gi lavere pris. I er også gal."),
        F("Begge", "Ingen av dem stemmer. Halvparten gjelder monopol med lineær etterspørsel. Plattformer kan "
                   "senke prisen."),
        R("Ingen"),
    ],
    kort="<p><b>Ingen.</b> Under oligopol avhenger overveltingen av konkurranseformen og antall bedrifter. En "
         "plattform kan senke prisen på den siden som skattlegges.</p>",
    full="<p><b>Påstand I.</b> Monopol med lineær etterspørsel og konstant grensekostnad gir 50/50. Oligopol har "
         "ingen slik regel: svaret avhenger av om bedriftene konkurrerer i pris eller kvantum, av hvor mange de er "
         "og av funksjonsformene. Et alternativ som gir oligopol en fast andel, er galt av prinsipp. Gal.</p>"
         "<p><b>Påstand II.</b> I et tosidig marked, som en avis med lesere og annonsører, er hver leser verdt mer "
         "enn abonnementet fordi annonseplassen blir mer verdt. En merverdiavgift på abonnementet kan da få avisen "
         "til å senke abonnementsprisen. Gal.</p>"
         "<p><b>Kontroll.</b> Båndet 0 &lt; ∂P/∂t &lt; 1 er et resultat fra frikonkurransemodellen med stigende "
         "tilbudskurve. Utenfor den modellen kan både overvelting over 100 % og prisfall forekomme ✓.</p>"
         "<p><b>Husk:</b> regler om overvelting gjelder bare i modellen de er utledet i.</p>",
)

statisk(
    "ins-s26", tema="insidens", type="begrep", hjelp=HJELP["ins-s26"],
    q="<p>Staten gir produsentene et tilskudd på kr s per solgte enhet i et frikonkurransemarked. Etterspørselen "
      "er mindre elastisk enn tilbudet. Hvem får mest av fordelen?</p>",
    alternativer=[
        R("Kjøperne, gjennom lavere pris"),
        F("Produsentene, siden tilskuddet betales til dem", "Formell insidens. Et tilskudd er en negativ skatt og "
                                                            "fordeles etter de samme helningene."),
        F("Begge likt, siden tilskuddet deles på midten", "Lik deling krever like elastisiteter. Her er "
                                                          "etterspørselen minst elastisk."),
        F("Ingen, siden prisen ikke endres", "Prisen kjøperne betaler, faller. Uendret pris krever perfekt "
                                             "elastisk etterspørsel eller perfekt uelastisk tilbud."),
    ],
    kort="<p><b>Kjøperne.</b> Et tilskudd er en negativ stykkskatt. Den minst elastiske siden får mest av "
         "fordelen, akkurat som den bærer mest av en skatt.</p>",
    full="<p><b>Tilskudd er skatt med motsatt fortegn.</b> Et tilskudd s per enhet gjør at produsenten får "
         "p = P + s. Det er en stykkskatt på −s. Formlene gjelder uendret.</p>"
         "<p><b>Steg 1: fordelingen.</b> Prisen kjøperne betaler, endres med ∂P/∂t × (−s) = −S′/(S′ − D′) × s. "
         "Kjøpernes andel av fordelen er S′/(S′ − D′), eller ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|).</p>"
         "<p><b>Steg 2: les av.</b> Etterspørselen er minst elastisk, så |ε<sub>D</sub>| &lt; ε<sub>S</sub>. "
         "Kjøpernes andel er over halvparten.</p>"
         "<p><b>Kontroll med tall.</b> ε<sub>S</sub> = 1,5, ε<sub>D</sub> = −0,5 og s = 4 [eksempeltall] gir "
         "kjøperne 1,5/2,0 × 4 = 3 kroner lavere pris. Produsentene får 1 krone mer. Sum 4 = s ✓.</p>"
         "<p><b>Husk:</b> hvem tilskuddet utbetales til, avgjør ikke hvem som får fordelen. Det er det samme "
         "prinsippet som for skatter. H2022 oppgave 3 brukte det på strømstøtten.</p>",
)

statisk(
    "ins-s27", tema="insidens", type="begrep", hjelp=HJELP["ins-s27"],
    q="<p>Hvilken beskrivelse av et marked betyr at tilbudet er perfekt elastisk?</p>",
    alternativer=[
        R("Leverandørene selger alt som etterspørres til en gitt verdenspris"),
        F("Antallet enheter er fast og kan ikke økes", "Fast antall er perfekt uelastisk tilbud, S′ = 0."),
        F("Kundene kjøper like mye uansett hva varen koster", "Det er perfekt uelastisk etterspørsel, D′ = 0."),
        F("Produsentene produserer like mye uansett hvilken pris de får", "Det er perfekt uelastisk tilbud: kvantumet "
                                                                          "reagerer ikke på prisen."),
    ],
    kort="<p><b>Gitt verdenspris.</b> Tilbudskurven er vannrett ved den prisen: S′ → ∞. Kjøperne bærer da hele "
         "en stykkskatt.</p>",
    full="<p><b>Hva elastisk betyr.</b> Perfekt elastisk betyr at kvantumet reagerer uendelig sterkt på prisen. "
         "Selgerne leverer alt som etterspørres til én bestemt pris, men ingenting om prisen er lavere. Kurven "
         "er vannrett.</p>"
         "<p><b>Steg 1: kjenn igjen ordlyden.</b> «Gitt verdenspris», «konstant og lik grensekostnad i "
         "frikonkurranse» og «selger alt til en fast pris» betyr S′ → ∞.</p>"
         "<p><b>Steg 2: skill fra uelastisk.</b> «Fast antall», «kan ikke endres» og «produserer like mye uansett "
         "pris» betyr S′ = 0. «Må ha varen uansett pris» betyr D′ = 0.</p>"
         "<p><b>Steg 3: konsekvensen.</b> Med S′ → ∞ er ∂P/∂t = 1 og ∂p/∂t = 0. Selgerne får verdensprisen "
         "uansett. Kjøperne bærer hele skatten.</p>"
         "<p><b>Kontroll.</b> Med verdenspris kr 80 og skatt kr 12 [eksempeltall] betaler kjøperne kr 92. "
         "Leverandørene sitter igjen med kr 80 ✓.</p>"
         "<p><b>Husk:</b> elastisk er flat, uelastisk er loddrett. Den flate siden slipper skatten.</p>",
)

statisk(
    "ins-s28", tema="insidens", type="tolkning", hjelp=HJELP["ins-s28"],
    q="<p>Tilbud og etterspørsel er rette linjer. Med en stykkskatt på kr 3 per enhet er dødvektstapet kr 1 800. "
      "Staten vurderer å heve skatten til kr 6. Hva blir dødvektstapet med den nye skatten?</p>",
    alternativer=[
        R("Kr 7 200"),
        F("Kr 3 600", "Tapet doblet i takt med skatten. Både høyden og bredden i trekanten dobles, så tapet "
                      "firedobles."),
        F("Kr 1 800", "Uendret fordi elastisitetene er de samme. Elastisitetene avgjør delingen, men tapet vokser "
                      "med t²."),
        F("Kr 5 400", "Dette er økningen i dødvektstapet, 7 200 − 1 800. Spørsmålet ber om det nye tapet."),
    ],
    kort="<p><b>Kr 7 200.</b> Dødvektstapet er ½ × t² × |S′D′|/(S′ − D′). Dobbel skatt gir 2² = 4 ganger tapet: "
         "4 × 1 800 = 7 200.</p>",
    full="<p><b>Hvorfor tapet vokser med kvadratet.</b> Dødvektstapet er en trekant. Høyden er kilen t. Bredden "
         "er kvantumsfallet, som også er proporsjonalt med t når kurvene er rette linjer. Arealet blir "
         "proporsjonalt med t × t.</p>"
         "<p><b>Steg 1: forholdet mellom skattene.</b> 6/3 = 2.</p>"
         "<p><b>Steg 2: forholdet mellom tapene.</b> 2² = 4.</p>"
         "<p><b>Steg 3: nytt tap.</b> 4 × 1 800 = <b>kr 7 200</b>.</p>"
         "<p><b>Kontroll med formelen.</b> ½ × 3² × K = 1 800 gir K = |S′D′|/(S′ − D′) = 400. Da er ½ × 6² × 400 = "
         "7 200 ✓.</p>"
         "<p><b>Hva det betyr for politikken.</b> Mange små skatter på brede grunnlag gir mindre samlet tap enn én "
         "stor skatt på et smalt grunnlag. Provenyet vokser derimot mindre enn det dobbelte, fordi kvantumet "
         "faller.</p>"
         "<p><b>Hva t² betyr i praksis.</b> En skatt som er tre ganger så høy, gir ni ganger så stort dødvektstap. Derfor er høye satser på smale grunnlag dyre for samfunnet.</p>"
         "<p><b>Husk:</b> dobbel skatt, firedobbelt dødvektstap.</p>",
)

statisk(
    "ins-s29", tema="insidens", type="begrep", hjelp=HJELP["ins-s29"],
    q="<p>Det er bred enighet om at en hyttekommune vil innføre en varig eiendomsskatt om to år. Det kan ikke "
      "bygges flere hytter. Hvem bærer skatten?</p>",
    alternativer=[
        R("De som eier hyttene når skatten blir ventet"),
        F("De som eier hyttene når skatten innføres om to år", "Prisen faller når forventningen oppstår, ikke når "
                                                               "skatten innføres. Den som kjøper i mellomtiden, "
                                                               "betaler en lavere pris."),
        F("Leietakerne, fordi skatten veltes over i leien", "Med fast antall hytter er tilbudet perfekt uelastisk. "
                                                            "Eieren kan ikke velte skatten over."),
        F("De som kjøper hytte etter at skatten er innført", "De betaler skatten hvert år, men har fått den trukket "
                                                             "fra i kjøpesummen."),
    ],
    kort="<p><b>Eierne når forventningen oppstår.</b> En ventet varig skatt kapitaliseres i prisen med en gang. "
         "Senere kjøpere betaler skatten, men har fått rabatt på kjøpesummen.</p>",
    full="<p><b>Hva kapitalisering er.</b> Prisen på et aktivum er nåverdien av det eieren forventer å få i "
         "framtiden. Kommer det en ventet varig skatt, faller nåverdien med nåverdien av skatten. Det skjer i det "
         "øyeblikket markedet regner med skatten.</p>"
         "<p><b>Steg 1: hvem bærer skatten i hvert år?</b> Antallet hytter er fast, så tilbudet er perfekt "
         "uelastisk. Eieren bærer hele skatten.</p>"
         "<p><b>Steg 2: når slår det inn i prisen?</b> En kjøper i dag vet at hun skal betale skatten fra år to. "
         "Hun byr derfor mindre. Prisen faller med en gang.</p>"
         "<p><b>Steg 3: hvem taper?</b> Den som eier hytta når forventningen oppstår. Selger hun, får hun lavere "
         "pris. Beholder hun, får hun lavere netto inntekt.</p>"
         "<p><b>Kontroll med tall.</b> Skatt kr 4 000 i året for all framtid og avkastningskrav 5 % [eksempeltall] "
         "gir 4 000/5 % = kr 80 000 i nåverdi når skatten starter. Den starter om to år, så i dag er nåverdien "
         "80 000/1,05² ≈ kr 72 600. Det er prisfallet nå ✓.</p>"
         "<p><b>Husk:</b> en varig skatt på et fast aktivum bæres av den som eier det når skatten blir kjent.</p>",
)

statisk(
    "ins-s30", tema="insidens", type="begrep", hjelp=HJELP["ins-s30"],
    q="<p>Dødvektstapet av en stykkskatt tegnes som en trekant mellom gammelt og nytt kvantum, med kilen t som "
      "høyde. Hvorfor er det en trekant og ikke et rektangel?</p>",
    alternativer=[
        R("Gevinsten per tapt handel krymper mot null for den siste"),
        F("Staten får tilbake halvparten av tapet i form av proveny", "Provenyet er rektangelet t × nytt kvantum. Det er "
                                                                "en annen flate enn dødvektstapet."),
        F("Kjøperne og selgerne deler alltid tapet likt mellom seg", "Delingen følger elastisitetene. Det forklarer ikke "
                                                          "formen på flaten."),
        F("Bare halvparten av handlene som forsvinner, var lønnsomme for begge", "Alle handlene som forsvinner, var "
                                                                       "lønnsomme før skatten. Gevinsten per handel "
                                                                       "varierer."),
    ],
    kort="<p><b>Gevinsten per tapt handel krymper.</b> Den første handelen som forsvinner, hadde en gevinst på "
         "nesten t. Den siste hadde nesten null. Snittet er t/2.</p>",
    full="<p><b>Hva som går tapt.</b> En handel blir gjort når kjøperens betalingsvilje er større enn selgerens "
         "kostnad. Gevinsten er differansen. Skatten stopper alle handler der gevinsten er mindre enn t.</p>"
         "<p><b>Steg 1: den marginale handelen.</b> Handelen helt i kanten av det gamle kvantumet hadde en "
         "gevinst nær null. Den forsvinner, men tapet er lite.</p>"
         "<p><b>Steg 2: den siste handelen som overlever.</b> Ved det nye kvantumet er gevinsten nøyaktig t. "
         "Handlene like utenfor hadde gevinster litt under t.</p>"
         "<p><b>Steg 3: summen.</b> Gevinstene på de tapte handlene går jevnt fra t ned mot 0 når kurvene er rette "
         "linjer. Summen er ½ × t × kvantumsfallet.</p>"
         "<p><b>Kontroll med forelesningens tall.</b> t = 1 og kvantum fra 100 til 90 gir ½ × 1 × 10 = 5. "
         "Velferdsregnskapet sier det samme: kjøperne taper 57 og selgerne 38. Staten får 90. Differansen 95 − 90 = 5 er tapet ✓.</p>"
         "<p><b>Husk:</b> dødvektstap = ½ × t × kvantumsfallet. Uten ½ regner du et rektangel.</p>",
)
