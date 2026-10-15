# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «psykologi»: finansiell psykologi. Manualkapittel 18,
   kjernepensum kj11 (psykologidelen). Sparevalget med ln-nytte, subjektive
   sannsynligheter og tapsvekt i 18.2 (R15) er ikke med her; det ligger hos
   porteføljetemaet. Temaet er stort sett begreper. De to regnefamiliene er
   skattekostnaden ved disposisjonseffekten (18.3) og eksponentiell vekst (18.4).
   psy-s17 til psy-s22 dekker heuristikkene fra forelesning 16 (menyeffekt, 1/N
   og preferanse for det kjente), som kursgodkjenningstesten 2026 spurte om.
"""
from trening_lib import *  # noqa: F401,F403

# Hjelpen bak «Hjelp»-knappen i tre trinn (spesifikasjonen § 2c): tema, regel og oppsett.
# Ingen tall fra spørsmålet og ikke svaret.
HJELP = {
    "psy-dsp1-forskjell": hjelp3(
        "Dette er skattekostnaden ved disposisjonseffekten: du skal finne hvor mye mer du sitter igjen med ved å "
        "selge taperen i stedet for vinneren.",
        "Gevinst G = salgsverdi − kjøpspris. Tap T = kjøpspris − salgsverdi. Salg av vinneren koster G × 1,72 × 22 % "
        "i skatt. Salg av taperen gir T × 1,72 × 22 % i fradrag. Forskjell = (G + T) × 37,84 %.",
        "<p><b>Steg 1: de to resultatene.</b> Salgsverdi minus kjøpspris for hver post. Den ene gir gevinst, den andre "
        "tap.</p>"
        "<p><b>Steg 2: selg vinneren.</b> Gevinsten skattlegges med 37,84 % (1,72 × 22 %).</p>"
        "<p><b>Steg 3: selg taperen.</b> Tapet gir fradrag med samme sats, altså lavere skatt.</p>"
        "<p><b>Steg 4: forskjellen.</b> Skatten du slipper pluss fradraget du får: (gevinst + tap) × 37,84 %.</p>"
        "<p><b>Pass på:</b> tapet oppjusteres akkurat som en gevinst. 37,84 % har oppjusteringen i seg, så gang ikke "
        "med 1,72 én gang til.</p>"),
    "psy-dsp1-vinner": hjelp3(
        "Dette er skatten ved å realisere en gevinst: du skal finne hva som er igjen etter skatt når aksjeposten som "
        "har steget, selges.",
        "Gevinst G = salgsverdi − kjøpspris. Skatt = G × 1,72 × 22 % = G × 37,84 %. Igjen etter skatt = salgsverdi − "
        "skatt.",
        "<p><b>Steg 1: gevinsten.</b> Salgsverdi minus kjøpspris for posten som har steget.</p>"
        "<p><b>Steg 2: skatten.</b> Gevinsten × 37,84 % (1,72 × 22 %).</p>"
        "<p><b>Steg 3: igjen etter skatt.</b> Salgsverdien minus skatten.</p>"
        "<p><b>Pass på:</b> bare gevinsten skattlegges, ikke hele salgssummen. Glem ikke oppjusteringen.</p>"),
    "psy-dsp1-taper": hjelp3(
        "Dette er fradraget ved å realisere et tap: du skal finne hva som er igjen etter skatt når aksjeposten som har "
        "falt, selges.",
        "Tap T = kjøpspris − salgsverdi. Skattebesparelse = T × 1,72 × 22 % = T × 37,84 %. Igjen etter skatt = "
        "salgsverdi + skattebesparelse.",
        "<p><b>Steg 1: tapet.</b> Kjøpspris minus salgsverdi for posten som har falt.</p>"
        "<p><b>Steg 2: fradraget.</b> Tapet × 37,84 % (1,72 × 22 %) i lavere skatt, så lenge det finnes annen inntekt "
        "å trekke det fra.</p>"
        "<p><b>Steg 3: igjen etter skatt.</b> Salgsverdien pluss skattebesparelsen.</p>"
        "<p><b>Pass på:</b> et tap gir lavere skatt, ikke høyere. Tap på aksjer oppjusteres med 1,72, akkurat som "
        "gevinster.</p>"),
    "psy-eks1-gjeld": hjelp3(
        "Dette er eksponentiell vekst i gjeld: du skal finne hele gjelden etter en periode der rentene legges til "
        "gjelden hvert år.",
        "Gjeld etter T år = L × (1 + r)<sup>T</sup>, der L er startgjelden og r renten per år. Doblingstiden er "
        "ln 2/ln(1 + r).",
        "<p><b>Steg 1: vekstfaktoren.</b> (1 + r) opphøyd i antall år.</p>"
        "<p><b>Steg 2: gjelden.</b> Startgjelden × vekstfaktoren.</p>"
        "<p><b>Kontroll med doblinger:</b> finn hvor mange år det tar å doble gjelden ved renten. Antall doblinger i "
        "perioden gir omtrent samme faktor.</p>"
        "<p><b>Pass på:</b> enkel rente, der du legger til samme rentebeløp hvert år, gir for lite. Å gange rentefaktoren "
        "med antall år i stedet for å opphøye er en annen vanlig feil. Spørsmålet gjelder hele gjelden, ikke bare "
        "rentene.</p>"),
    "psy-eks1-sparing": hjelp3(
        "Dette er eksponentiell vekst i sparing: du skal finne sluttverdien av like store innskudd satt inn ved "
        "utgangen av hvert år.",
        "Sluttverdi = S × [(1 + r)<sup>T</sup> − 1]/r, der S er det årlige innskuddet, r avkastningen og T antall år. "
        "Det siste innskuddet får ingen avkastning.",
        "<p><b>Steg 1: vekstfaktoren.</b> (1 + r) opphøyd i antall år.</p>"
        "<p><b>Steg 2: sluttverdifaktoren.</b> (vekstfaktoren − 1)/r.</p>"
        "<p><b>Steg 3: sluttverdien.</b> Det årlige innskuddet × sluttverdifaktoren.</p>"
        "<p><b>Kontroll:</b> nåverdien av innskuddene ganget med vekstfaktoren skal gi det samme.</p>"
        "<p><b>Pass på:</b> innskuddene settes inn ved utgangen av hvert år, så det siste får ingen avkastning. Å "
        "forrente alt som om det ble satt inn på dag én gir for mye.</p>"),

    "psy-s01": hjelp3(
        "Dette er definisjonen av overkonfidens: du skal finne beskrivelsen som passer dette avviket og ikke et av de "
        "tre andre.",
        "Hvert avvik har sin drivkraft. Overkonfidens er en feilslutning om egen kunnskap. Flokkatferd drives av andres "
        "handlinger. Forankring drives av et tall du har sett. Tapsaversjon er en preferanse: tap veier tyngre enn "
        "gevinster.",
        '<p>Kjenn igjen de fire avvikene: overkonfidens, flokkatferd, forankring og tapsaversjon.</p><p><b>Steg 1:</b> skriv én setning om hva som driver hvert av dem: egen vurdering, andres handlinger, et tall eller frykt for tap.</p><p><b>Steg 2:</b> plasser hvert alternativ på ett av avvikene.</p><p><b>Steg 3:</b> se på hvilket alternativ som hører til overkonfidens og hva avviket fører til.</p>'),
    "psy-s02": hjelp3(
        "Dette handler om hvorfor aktiv handel er et nullspill: du skal finne grunnen til at en gjennomsnittlig "
        "aksjevelger som handler mye, havner under markedet.",
        "Markedsavkastningen = snittet av alle investorers avkastning før kostnader. Din avkastning = avkastning før "
        "kostnader − kurtasje og spread. Høyere risiko gir høyere forventet avkastning, ikke lavere.",
        '<p>Markedsavkastningen er snittet av alle investorer før kostnader.</p><p><b>Steg 1:</b> hvis personen velger aksjer like godt som snittet, hva får han før kostnader?</p><p><b>Steg 2:</b> hva koster det å handle ofte?</p><p><b>Steg 3:</b> test hver forklaring. Stemmer den med de norske skattereglene, med sammenhengen mellom risiko og avkastning og med det oppgaven sier om ferdighetene hans?</p>'),
    "psy-s03": hjelp3(
        "Dette er hjemmebias sett fra hele formuen: du skal finne hovedargumentet mot en portefølje som er samlet i "
        "eget land og egen bransje.",
        "Totalformuen = finansformuen F + humankapitalen H. Risikoen i totalformuen avhenger av hvor sterkt postene "
        "samvarierer. Porteføljeteorien: velg aksjer som samvarierer lite med resten av formuen.",
        '<p>Tenk på hele formuen. Humankapitalen er ofte den største posten for en arbeidstaker.</p><p><b>Steg 1:</b> hvilke risikoer påvirker lønnen og jobben hans?</p><p><b>Steg 2:</b> hvilke risikoer påvirker aksjene han eier?</p><p><b>Steg 3:</b> trekker de i samme eller motsatt retning når bransjen får problemer? Sjekk til slutt om hvert alternativ er en riktig påstand om kostnader, avkastning og preferanser.</p>'),
    "psy-s04": hjelp3(
        "Dette er et avvik i hvordan penger merkes og hva det koster: du skal navngi avviket og regne kostnaden i "
        "året etter skatt.",
        "Renteinntekt skattlegges med 22 %. Renteutgift gir fradrag med 22 %. Kostnad per år = beløp × (lånerente − "
        "innskuddsrente) × (1 − 22 %).",
        "<p><b>Steg 1: avviket.</b> Merkes pengene etter formål i stedet for å telles som én formue? Det har et eget "
        "navn.</p>"
        "<p><b>Steg 2: kostnaden.</b> Renteinntekt etter skatt er rente × (1 − 22 %). Renteutgift etter fradrag er "
        "rente × (1 − 22 %). Forskjellen ganger beløpet er det hun taper i året.</p>"
        "<p><b>Pass på:</b> skatten treffer begge rentene. Tapsaversjon er noe annet: tap som veier tyngre enn "
        "gevinster.</p>"),
    "psy-s05": hjelp3(
        "Dette er definisjonen av tapsaversjon: du skal skille den fra vanlig risikoaversjon og fra atferden den fører "
        "til.",
        "Risikoaversjon: en konkav nyttefunksjon u(W) av hele formuen W. Prospektteorien: verdien v(x) av en gevinst "
        "eller et tap x, målt fra et referansepunkt, med en knekk i referansepunktet.",
        "<p><b>Skill tre ting.</b> Risikoaversjon kommer av en konkav nytte av hele formuen. Tapsaversjon måles fra et "
        "referansepunkt. Disposisjonseffekten er en atferd som bygger på tapsaversjon.</p>"
        "<p><b>Steg 1.</b> Spør for hvert alternativ: er det en definisjon eller en følge?</p>"
        "<p><b>Steg 2.</b> Spør om valget ville endret seg hvis referansepunktet flyttet seg. Det skiller tapsaversjon "
        "fra vanlig risikoaversjon.</p>"),
    "psy-s06": hjelp3(
        "Dette er skillet mellom feilslutninger og preferanser: du skal finne hva det betyr for motgiften at "
        "tapsaversjon regnes som en preferanse.",
        "Feilslutning: en tankefeil som informasjon i prinsippet kan rette. Preferanse: det du faktisk liker. Den kan "
        "ikke være feil, men den kan koste penger.",
        '<p>Skill feilslutninger fra preferanser. En feilslutning kan i prinsippet rettes med informasjon. En preferanse er det du faktisk liker. Den kan ikke være feil, bare dyr.</p><p><b>Steg 1:</b> hvis informasjon ikke endrer atferden, hvilke verktøy har du da?</p><p><b>Steg 2:</b> hvilke av forelesningens praktiske regler virker uten at du må endre hva du liker?</p><p><b>Steg 3:</b> kan en preferanse koste penger?</p>'),
    "psy-s07": hjelp3(
        "Dette er Kahnemans system 1 og system 2: du skal finne når den raske magefølelsen gir gode valg.",
        "Intuisjon er trent mønstergjenkjenning. Den trenger mange like situasjoner og rask, ærlig tilbakemelding om "
        "du tok feil. Uten slik trening er system 2 tryggere.",
        '<p>Intuisjon er god når den er trent.</p><p><b>Steg 1:</b> hva krever slik trening? Tenk på antall like situasjoner og hvor raskt du får vite om du tok feil.</p><p><b>Steg 2:</b> spør for hvert alternativ om situasjonen gir slik trening. Er utfallet forutsigbart ut fra det personen ser?</p><p><b>Steg 3:</b> vær skeptisk til påstander om at intuisjon alltid eller aldri virker.</p>'),
    "psy-s08": hjelp3(
        "Dette er forelesningens praktiske regler: du skal finne regelen som er rettet mot forankring og flokkatferd.",
        "Forankring: et tall du har sett, styrer vurderingen. Flokkatferd: du følger mengden i stedet for egen analyse. "
        "En regel virker mot et avvik når den fjerner valget avviket virker gjennom.",
        '<p>Koble hver regel til valget den fjerner.</p><p><b>Steg 1:</b> når slår forankring og flokkatferd til? Tenk på hva som styrer når du kjøper og selger.</p><p><b>Steg 2:</b> for hver regel i alternativene, spør hvilket valg den tar fra deg.</p><p><b>Steg 3:</b> sjekk at regelen faktisk er en av forelesningens regler. Velg regelen som fjerner akkurat det valget avvikene virker gjennom.</p>'),
    "psy-s09": hjelp3(
        "Dette er et avvik i en budrunde: du skal finne hvilket avvik som forklarer hvor budene havner.",
        "Forankring: et tall du har sett, trekker vurderingen mot seg. Flokkatferd: du følger andre. Overkonfidens: du "
        "stoler for mye på egen analyse. Tapsaversjon: tap veier tyngre enn gevinster fra et referansepunkt.",
        '<p>Finn ut hva som styrer budet.</p><p><b>Steg 1:</b> hvilket tall så han først? Ligger budene nær det eller nær taksten?</p><p><b>Steg 2:</b> spør hva hvert avvik krever. Følger han andre? Stoler han på egen analyse? Frykter han et tap? Trekkes vurderingen mot et oppgitt tall?</p><p><b>Steg 3:</b> velg avviket som passer med det oppgaven beskriver.</p>'),
    "psy-s10": hjelp3(
        "Dette er disposisjonseffekten: du skal finne hvorfor det er irrasjonelt å vente på at en aksje kommer tilbake "
        "til kjøpskursen.",
        "Et rasjonelt valg avhenger bare av forventet avkastning fra i dag. Tap på aksjer oppjusteres med 1,72 og gir "
        "fradrag med 22 %. Kursfall gir ingen forventning om videre fall.",
        '<p>Spør hva som bør avgjøre om du beholder en aksje.</p><p><b>Steg 1:</b> tankeforsøk. To personer eier samme aksje til samme kurs i dag. Den ene kjøpte billig, den andre dyrt. Har de grunn til å velge ulikt?</p><p><b>Steg 2:</b> hva betyr det for kjøpskursens rolle?</p><p><b>Steg 3:</b> test hvert alternativ mot skattereglene for tap og mot det teorien sier om kursutvikling.</p>'),
    "psy-s11": hjelp3(
        "Dette er forelesningens fire praktiske regler: du skal finne den riktige koblingen mellom en regel og avvikene "
        "den er rettet mot.",
        "Hver regel fjerner ett valg: aksjevalget, tidspunktet for kjøp, muligheten til å bruke pengene eller "
        "fristelsen til å improvisere. Regelen virker mot avvikene som virker gjennom akkurat det valget.",
        "<p><b>Forelesningens fire regler.</b> Globalt indeksfond, automatisk månedlig sparing, innlåsing i IPS og "
        "tjenestepensjon og en skriftlig plan.</p>"
        "<p><b>Steg 1.</b> For hver regel: hvilket valg fjerner den? Aksjevalget, tidspunktet, muligheten til å bruke "
        "pengene eller fristelsen til å improvisere?</p>"
        "<p><b>Steg 2.</b> Hvilke avvik virker gjennom akkurat det valget?</p>"
        "<p><b>Pass på:</b> finansundervisning er ikke en av reglene.</p>"),
    "psy-s12": hjelp3(
        "Dette er gåten om lav aksjedeltakelse: du skal finne hvorfor risikoaversjon alene ikke forklarer at så mange "
        "eier null aksjer.",
        "Merton: aksjeandel w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>). Med positiv risikopremie μ − r<sub>f</sub> er "
        "w* positiv for enhver endelig risikoaversjon γ.",
        '<p>Teorien sier at aksjer har en positiv risikopremie.</p><p><b>Steg 1:</b> hvordan ser en jevn nyttefunksjon ut over et svært lite intervall?</p><p><b>Steg 2:</b> hvor mye betyr risikoaversjon da for en liten aksjepost? Hva burde personen gjøre?</p><p><b>Steg 3:</b> sammenlign med at mange eier null aksjer. Sjekk også hvert alternativ mot fakta om avkastning og skatt.</p>'),
    "psy-s13": hjelp3(
        "Dette er to slags feil i vurderinger: du skal skille et avvik (bias) fra støy.",
        "Feil = systematisk del + tilfeldig del. Den systematiske delen forsvinner ikke når du tar gjennomsnittet av "
        "mange vurderinger. Den tilfeldige delen jevner seg ut.",
        '<p>Tenk på mange vurderinger av samme sak.</p><p><b>Steg 1:</b> bommer de samme vei, eller spriker de?</p><p><b>Steg 2:</b> hva skjer med gjennomsnittet av vurderingene i hvert tilfelle? Jevner feilen seg ut?</p><p><b>Steg 3:</b> hvilken feiltype kalles avvik og hvilken kalles støy? Sjekk at alternativet bruker begrepene riktig vei og ikke blander inn preferanser eller markedet.</p>'),
    "psy-s14": hjelp3(
        "Dette er prospektteoriens verdifunksjon: du skal avgjøre om hver av de to påstandene stemmer.",
        "Verdifunksjonen v(x) har tre egenskaper: x er gevinst eller tap målt fra et referansepunkt, kurven har en "
        "knekk i referansepunktet (tapsaversjon) og følsomheten avtar med avstanden fra det.",
        "<p><b>Verdifunksjonens tre egenskaper.</b> Et referansepunkt, en knekk i referansepunktet og avtakende "
        "følsomhet.</p>"
        "<p><b>Påstand I:</b> måles nytten fra et referansepunkt eller fra formuens nivå?</p>"
        "<p><b>Påstand II:</b> er kurven brattere for tap eller for gevinster rett ved referansepunktet?</p>"
        "<p><b>Sett sammen.</b> Velg alternativet som passer med hvilke påstander som holder.</p>"),
    "psy-s15": hjelp3(
        "Dette er et informasjonsforsøk med fondskunder: du skal tolke hva resultatet sier om informasjon som motgift "
        "mot et avvik.",
        "Endring i prosentpoeng = ny andel − gammel andel. Relativ endring = (ny andel − gammel andel)/gammel andel. "
        "Et forsøk sier bare noe om det det måler: her kundenes valg, ikke fondenes avkastning.",
        '<p>Les forsøket nøye.</p><p><b>Steg 1:</b> hva ble målt, kundenes valg eller fondenes avkastning?</p><p><b>Steg 2:</b> endret valgene seg? Hvor mye, relativt og i prosentpoeng?</p><p><b>Steg 3:</b> var informasjonen konkret eller generell?</p><p><b>Steg 4:</b> hva kan forsøket si noe om? Hva ble ikke testet?</p>'),
    "psy-s16": hjelp3(
        "Dette er eksponentiell vekst-bias: du skal finne hvordan intuisjonen bommer når den framskriver vekst med "
        "renters rente.",
        "Lineær framskriving: B × (1 + rT). Renters rente: B × (1 + r)<sup>T</sup>. For r > 0 og mer enn ett år er "
        "den andre alltid størst.",
        '<p>Spør hvordan intuisjonen framskriver vekst.</p><p><b>Steg 1:</b> legger den til samme beløp hvert år, eller lar den veksten tilta?</p><p><b>Steg 2:</b> med renters rente vokser beløp raskere enn lineært. Hvilken vei bommer da intuisjonen?</p><p><b>Steg 3:</b> gjelder dette bare sparing, bare gjeld eller begge? Tenk på et lån som får stå urørt.</p>'),
}

NAVN = ["Mira", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias", "Sigrid", "Henrik",
        "Maja", "Ola", "Hanne", "Petter", "Kari", "Kristian", "Emil", "Ida", "Sofie", "Marius"]
SELSKAP = [("Fjordlaks ASA", "Nordlys Energi ASA"), ("Havbris ASA", "Polarbuss ASA"),
           ("Tindefjell ASA", "Kystkraft ASA"), ("Breeze Shipping ASA", "Vardø Fisk ASA"),
           ("Solvind ASA", "Bergtatt Mineral ASA")]


# ---------------------------------------------------------------------------
# psy-dsp1 · Hva disposisjonseffekten koster i skatt
# ---------------------------------------------------------------------------
@familie("psy-dsp1", tema="psykologi", antall=5, tittel="Disposisjonseffekten i kroner")
def _(r):
    navn = r.choice(NAVN)
    vinner, taper = r.choice(SELSKAP)
    if r.random() < 0.5:
        vinner, taper = taper, vinner
    K = r.randrange(120_000, 400_001, 10_000)
    G = r.randrange(20_000, min(150_000, K - 40_000) + 1, 5_000)
    T = r.randrange(20_000, 150_001, 5_000)
    if G == T:
        raise Avvis("like store poster")
    s = 0.3784
    spor = r.choice(["forskjell", "forskjell", "vinner", "taper"])

    q0 = (f"<p>{navn} trenger {kr(K)} i kontanter og skal selge én av to aksjeposter, begge verdt {kr(K)} i dag. "
          f"Aksjene i {vinner} ble kjøpt for {kr(K - G)}. Aksjene i {taper} ble kjøpt for {kr(K + T)}. Begge har delt "
          f"ut utbytte som hvert år har vært større enn skjermingsfradraget, så ingen av dem har ubenyttet skjerming. "
          f"Gevinst og tap oppjusteres med 1,72 og skattlegges med 22 %, altså 37,84 % samlet. {navn} har nok annen "
          f"alminnelig inntekt til å utnytte et fradrag fullt ut i år.</p>")
    if spor == "forskjell":
        riktig = (G + T) * s
        kand = [
            ((G + T) * 0.22, f"Oppjusteringen glemt: ({tall(G)} + {tall(T)}) × 22 %. Gevinst og tap på aksjer har "
                             f"effektiv sats 37,84 %."),
            (G * s, f"Bare skatten på gevinsten, {tall(G)} × 37,84 %. Tapet gir også fradrag med 37,84 %, så taperen "
                    f"gir en skattebesparelse i tillegg."),
            (T * s, f"Bare fradraget for tapet, {tall(T)} × 37,84 %. Å selge vinneren koster i tillegg skatt på "
                    f"gevinsten."),
            ((G + T) * 1.72 * s, f"Oppjustert to ganger: ({tall(G)} + {tall(T)}) × 1,72 × 37,84 %. 37,84 % har alt "
                                 f"oppjusteringen i seg."),
        ]
        sp = (f"Hvor mye mer sitter {navn} igjen med etter skatt i år hvis {navn} selger aksjene i {taper} i stedet for "
              f"aksjene i {vinner}?")
        kort = (f"<p><b>{kr(riktig)}.</b> Å selge vinneren koster {tall(G)} × 37,84 % i skatt. Å selge taperen gir "
                f"{tall(T)} × 37,84 % i fradrag. Forskjellen er ({tall(G)} + {tall(T)}) × 37,84 %.</p>")
    elif spor == "vinner":
        riktig = K - G * s
        kand = [
            (K - G * 0.22, f"Oppjusteringen glemt: {tall(K)} − {tall(G)} × 22 %. Gevinst på aksjer har effektiv sats 37,84 %."),
            (K, "Skatten glemt. Gevinsten på aksjene skattlegges når de selges."),
            (K - K * s, f"Skatt regnet av hele salgssummen, {tall(K)} × 37,84 %. Bare gevinsten, {tall(G)}, skattlegges."),
        ]
        sp = f"Hvor mye sitter {navn} igjen med etter skatt hvis {navn} selger aksjene i {vinner}, slik mange gjør?"
        kort = (f"<p><b>{kr(riktig)}.</b> Gevinsten {tall(G)} skattlegges med 37,84 %: {talla(G * s)}. "
                f"{tall(K)} − {talla(G * s)} = {talla(riktig)}.</p>")
    else:
        riktig = K + T * s
        kand = [
            (K, "Trodd at tap på aksjer ikke gir fradrag. Tapet oppjusteres og gir fradrag med 37,84 %."),
            (K + T * 0.22, f"Oppjusteringen glemt: {tall(T)} × 22 %. Tapet oppjusteres med 1,72, akkurat som en gevinst."),
            (K - T * s, f"Fortegnet snudd: tapet behandlet som en gevinst og skattlagt. Et tap gir lavere skatt."),
        ]
        sp = f"Hvor mye sitter {navn} igjen med etter skatt hvis {navn} selger aksjene i {taper}?"
        kort = (f"<p><b>{kr(riktig)}.</b> Tapet {tall(T)} gir fradrag med 37,84 %: {talla(T * s)} lavere skatt. "
                f"{tall(K)} + {talla(T * s)} = {talla(riktig)}.</p>")
    feil = r.sample(kand, 3)
    ulike(riktig, *[v for v, _ in feil], rel=0.01)
    q = q0 + f"<p>{sp}</p>"
    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), t, v) for v, t in feil]

    full = (
        f"<p><b>Hva disposisjonseffekten er.</b> Mange selger aksjene som har steget og beholder dem som har falt. "
        f"Kjøpskursen blir et referansepunkt. Det gjør vondt å realisere et tap. Teorien sier at kjøpskursen er "
        f"irrelevant: bare framtidig forventet avkastning skal avgjøre hva du eier. Med norsk skatt blir avviket i "
        f"tillegg dyrt, fordi skatten belønner det motsatte.</p>"
        f"<p><b>Steg 1: de to resultatene.</b> {vinner}: {tall(K)} − {tall(K - G)} = {tall(G)} i gevinst. {taper}: "
        f"{tall(K)} − {tall(K + T)} = −{tall(T)}, altså {tall(T)} i tap.</p>"
        f"<p><b>Steg 2: selg vinneren.</b> Skatt {tall(G)} × 1,72 × 22 % = {talla(G * s)}. Igjen: "
        f"{talla(K - G * s)}.</p>"
        f"<p><b>Steg 3: selg taperen.</b> Tapet gir fradrag med samme sats: {tall(T)} × 37,84 % = {talla(T * s)} lavere "
        f"skatt. Igjen: {talla(K + T * s)}.</p>"
        f"<p><b>Kontroll:</b> forskjellen mellom steg 3 og steg 2 er {talla(K + T * s)} − {talla(K - G * s)} = "
        f"{talla((G + T) * s)}. Regnet direkte: ({tall(G)} + {tall(T)}) × 37,84 % = {talla((G + T) * s)} ✓.</p>"
        f"<p><b>Husk:</b> å realisere en gevinst er å betale skatt tidlig. Å realisere et tap er å få fradraget "
        f"tidlig. Disposisjonseffekten gjør begge deler feil vei.</p>"
    )
    return sporsmal(q, alternativer, kort, full, hjelp={"forskjell": HJELP["psy-dsp1-forskjell"], "vinner": HJELP["psy-dsp1-vinner"], "taper": HJELP["psy-dsp1-taper"]}[spor])


# ---------------------------------------------------------------------------
# psy-eks1 · Eksponentiell vekst: gjeld og sparing over tid
# ---------------------------------------------------------------------------
@familie("psy-eks1", tema="psykologi", antall=5, tittel="Eksponentiell vekst i gjeld og sparing")
def _(r):
    navn = r.choice(NAVN)
    if r.random() < 0.5:
        nokkel = "gjeld"
        L = r.choice([20_000, 25_000, 30_000, 40_000, 50_000, 60_000])
        rp = r.choice([15, 18, 20, 22, 24, 25])
        T = r.choice([5, 6, 8, 10, 12])
        f = (1 + rp / 100) ** T
        riktig = L * f
        kand = [
            (L * (1 + rp / 100 * T), f"Enkel rente: {tall(L)} + {T} × {rtekst(rp)} × {tall(L)}. Rentene rentes også, "
                                     f"så gjelden vokser raskere enn lineært."),
            (L * (1 + rp / 100) * T, f"Rentefaktoren ganget med antall år: {tall(L)} × {tall(1 + rp / 100, 2)} × {T}. "
                                     f"Faktoren skal opphøyes i {T}."),
            (L * (f - 1), f"Bare de påløpte rentene, {tall(L)} × ({tall(1 + rp / 100, 2)}<sup>{T}</sup> − 1). "
                          f"Spørsmålet gjelder hele gjelden."),
        ]
        q = (f"<p>{navn} har {kr(L)} i kredittkortgjeld til {rtekst(rp)} effektiv rente i året. {navn} betaler "
             f"ingenting på gjelden i {T} år. Rentene legges til gjelden hvert år.</p>"
             f"<p>Hvor stor er gjelden etter {T} år?</p>")
        kort = (f"<p><b>{kr(riktig)}.</b> Rentes rente: {tall(L)} × {tall(1 + rp / 100, 2)}<sup>{T}</sup> = "
                f"{tall(L)} × {tall(f, 4)}.</p>")
        dobling = ln(2) / ln(1 + rp / 100)
        steg = (f"<p><b>Steg 1: vekstfaktoren.</b> {tall(1 + rp / 100, 2)}<sup>{T}</sup> = {tall(f, 4)}.</p>"
                f"<p><b>Steg 2: gjelden.</b> {tall(L)} × {tall(f, 4)} = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Steg 3: sammenlign med magefølelsen.</b> Den lineære gjetningen er {tall(L)} + {T} × "
                f"{tall(L * rp / 100)} = {tall(L * (1 + rp / 100 * T))}. Fasiten er {tall(riktig / (L * (1 + rp / 100 * T)), 2)} "
                f"ganger så stor.</p>"
                f"<p><b>Kontroll med doblinger:</b> til {rtekst(rp)} dobles gjelden på {tall(dobling, 2)} år. På {T} år "
                f"rekker den {tall(T / dobling, 2)} doblinger. 2<sup>{tall(T / dobling, 2)}</sup> ≈ "
                f"{tall(2 ** (T / dobling), 2)}. Samme faktor, uten å opphøye renten ✓.</p>")
    else:
        nokkel = "sparing"
        S = r.choice([12_000, 24_000, 30_000, 36_000, 48_000, 60_000])
        rp = r.choice([4, 5, 6, 7])
        T = r.choice([10, 15, 20, 25, 30])
        f = (1 + rp / 100) ** T
        riktig = S * (f - 1) / (rp / 100)
        kand = [
            (S * T, f"Bare innskuddene summert, {tall(S)} × {T}. Avkastningen mangler."),
            (S * T * f, f"Alt forrentet i {T} år, som om {tall(S * T)} ble satt inn på dag én. Det siste innskuddet "
                        f"forrentes ikke i det hele tatt."),
            (riktig * (1 + rp / 100), "Innskuddene satt inn ved starten av hvert år. De settes inn ved utgangen, så hvert "
                                      "innskudd får ett år mindre avkastning."),
        ]
        q = (f"<p>{navn} sparer {kr(S)} ved utgangen av hvert år i {T} år. Pengene gir {rtekst(rp)} avkastning i "
             f"året. Se bort fra skatt.</p>"
             f"<p>Hvor mye står på kontoen rett etter det siste innskuddet?</p>")
        kort = (f"<p><b>{kr(riktig)}.</b> Sluttverdien av en annuitet: {tall(S)} × ({tall(1 + rp / 100, 2)}<sup>{T}</sup> "
                f"− 1)/{tall(rp / 100, 2)} = {tall(S)} × {tall((f - 1) / (rp / 100), 4)}.</p>")
        nv = S * annuitetsfaktor(rp / 100, T)
        steg = (f"<p><b>Steg 1: vekstfaktoren.</b> {tall(1 + rp / 100, 2)}<sup>{T}</sup> = {tall(f, 4)}.</p>"
                f"<p><b>Steg 2: sluttverdifaktoren.</b> ({tall(f, 4)} − 1)/{tall(rp / 100, 2)} = "
                f"{tall((f - 1) / (rp / 100), 4)}.</p>"
                f"<p><b>Steg 3: sluttverdien.</b> {tall(S)} × {tall((f - 1) / (rp / 100), 4)} = <b>{kr(riktig)}</b>. "
                f"Innskuddene er {tall(S * T)}, så {tall(riktig - S * T)} er avkastning.</p>"
                f"<p><b>Kontroll den andre veien:</b> nåverdien av innskuddene er {tall(S)} × "
                f"{tall(annuitetsfaktor(rp / 100, T), 4)} = {tall(nv)}. Forrentet i {T} år: {tall(nv)} × {tall(f, 4)} = "
                f"{tall(nv * f)} ✓.</p>")
    feil = r.sample(kand, 3)
    ulike(riktig, *[v for v, _ in feil], rel=0.01)
    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), t, v) for v, t in feil]
    full = (
        f"<p><b>Hva eksponentiell vekst-bias er.</b> Intuisjonen framskriver lineært: den legger til det samme beløpet "
        f"hvert år. Men renter og avkastning beregnes også av tidligere renter og avkastning, så veksten tiltar over "
        f"tid. Resultatet er at folk undervurderer både hvor fort gjeld vokser og hvor mye sparing blir til. "
        f"Motgiften er å regne i stedet for å gjette.</p>"
        + steg +
        f"<p><b>Husk:</b> gjeld: L × (1 + r)<sup>T</sup>. Årlig sparing: S × [(1 + r)<sup>T</sup> − 1]/r.</p>"
    )
    return sporsmal(q, alternativer, kort, full, hjelp={"gjeld": HJELP["psy-eks1-gjeld"], "sparing": HJELP["psy-eks1-sparing"]}[nokkel])


def rtekst(rp):
    """Rente i prosent som tekst: 20 → «20 %», 4.5 → «4,5 %»."""
    return prosent_tekst(rp, 0 if abs(rp - round(rp)) < 1e-9 else 1)


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================

statisk(
    "psy-s01", hjelp=HJELP["psy-s01"], tema="psykologi", type="begrep",
    q="<p>Hva kjennetegner overkonfidens slik finansiell psykologi bruker begrepet?</p>",
    alternativer=[
        R("Du tror du vet mer om selskapene enn markedet og handler derfor ofte"),
        F("Du følger det andre investorer gjør i stedet for å gjøre din egen analyse",
          "Det er flokkatferd: andres handlinger styrer valget ditt. Overkonfidens handler ikke om å følge mengden."),
        F("Du lar kjøpskursen styre hva du mener aksjen egentlig er verdt i dag",
          "Det er forankring. Det første tallet du så, styrer vurderingen."),
        F("Du lar et tap veie tyngre enn en gevinst av samme størrelse",
          "Det er tapsaversjon, en preferanse for å unngå tap. Overkonfidens er en feilslutning, ikke en preferanse."),
    ],
    kort="<p><b>Du tror du vet mer enn markedet.</b> Overkonfidens er hovedforklaringen på hyppig handel. Den "
         "koster kurtasje oppå et nullspill.</p>",
    full="<p><b>Hva overkonfidens er.</b> Du overvurderer hva du vet og hvor godt du vurderer. Det er dokumentert i "
         "grunnformen: 93 % av amerikanske bilførere mener de kjører bedre enn snittet. Blant investorer viser det seg som "
         "en tro på at du kjenner selskapene bedre enn markedet gjør.</p>"
         "<p><b>Steg 1: hva den fører til.</b> Hyppig handel. Den som tror han vet mer, kjøper og selger oftere. Odean "
         "fant at de som handler oftest, sitter igjen med lavest avkastning. Barber og Odean fant at menn handler mer "
         "enn kvinner og taper mer på det.</p>"
         "<p><b>Steg 2: hva den koster.</b> Kurtasje og spread på hver handel. Forelesningens regnestykke: 3 600 handler "
         "à kr 79 er 284 400 kroner i ren kostnad.</p>"
         "<p><b>Steg 3: skill fra de andre.</b> Flokkatferd er å følge mengden. Forankring er at et tall styrer "
         "vurderingen. Tapsaversjon er en preferanse. Overkonfidens er en feilslutning om egen kunnskap.</p>"
         "<p><b>Kontroll:</b> spør om avviket handler om deg selv eller om andre. Overkonfidens handler om tillit til egen "
         "vurdering. Flokkatferd handler om tillit til andres.</p>"
         "<p><b>Husk:</b> overkonfidens = du tror du vet mer enn markedet. Motgift: globalt indeksfond, handle sjelden.</p>",
)

statisk(
    "psy-s02", hjelp=HJELP["psy-s02"], tema="psykologi", type="begrep",
    q="<p>Jonas velger aksjer like godt som gjennomsnittsinvestoren, men handler mye oftere. Hvorfor ventes han likevel "
      "å få lavere avkastning enn markedet?</p>",
    alternativer=[
        R("Markedet er snittet før kostnader, så kurtasjen kommer i tillegg"),
        F("Hyppig handel gir høyere risiko i porteføljen, noe som gir lavere avkastning",
          "Høyere risiko gir høyere forventet avkastning, ikke lavere. Mer risiko kan ikke forklare at han venter å få mindre."),
        F("Den som handler ofte, kjøper alltid på topp og selger alltid på bunn",
          "Det er en påstand om dårlig timing. Spørsmålet sier at Jonas velger like godt som snittet, så valgene hans er ikke problemet."),
        F("Kortsiktige gevinster skattlegges med en høyere sats enn langsiktige",
          "I Norge skattlegges aksjegevinst med 37,84 % uansett hvor lenge du har eid aksjen."),
    ],
    kort="<p><b>Kurtasje oppå et nullspill.</b> Markedet er gjennomsnittet av alle investorer før kostnader. Velger du "
         "like godt som snittet, får du snittet minus det du betaler for å handle.</p>",
    full="<p><b>Hvorfor aktiv handel er et nullspill.</b> Markedsavkastningen er det alle investorer til sammen får før "
         "kostnader. For hver investor som slår markedet, må en annen gjøre det dårligere. I snitt får de aktive "
         "markedsavkastningen før kostnader.</p>"
         "<p><b>Steg 1: hva Jonas får før kostnader.</b> Han velger like godt som snittet, så han får omtrent "
         "markedsavkastningen.</p>"
         "<p><b>Steg 2: hva han betaler.</b> Kurtasje og spread på hver handel. Kostnaden er proporsjonal med hvor ofte "
         "han handler. Den forutsetter ikke at han er uheldig med valgene.</p>"
         "<p><b>Steg 3: resultatet.</b> Markedsavkastningen minus handelskostnadene. Jo oftere han handler, desto lenger "
         "under markedet havner han.</p>"
         "<p><b>Kontroll med tall:</b> 300 handler i året à kr 79 er 23 700 kroner i kurtasje. På en portefølje på "
         "800 000 er det 23 700/800 000 = 2,96 prosentpoeng i året, før spread. Et globalt indeksfond koster en brøkdel "
         "av det.</p>"
         "<p><b>Husk:</b> handle sjelden, eie indeks. Kostnadene er sikre, gevinsten av å velge er det ikke.</p>",
)

statisk(
    "psy-s03", hjelp=HJELP["psy-s03"], tema="psykologi", type="begrep",
    q="<p>Petter jobber i oljeservice i Stavanger. Nesten hele aksjeporteføljen hans er norske selskaper, mange i hans "
      "egen bransje. Hva er hovedargumentet mot porteføljen?</p>",
    alternativer=[
        R("Aksjene gir dobbel eksponering mot den samme risikoen som jobben"),
        F("Norske aksjer har lavere forventet avkastning enn utenlandske aksjer har",
          "Teorien gir ingen grunn til å vente lavere avkastning av norske aksjer. Argumentet mot porteføljen handler ikke om at norske selskaper er dårlige."),
        F("Hjemmebias er en preferanse, så den er alltid feil og må fjernes",
          "En preferanse kan ikke være feil, bare dyr. «Alltid feil» er derfor for sterkt."),
        F("Norske aksjer er dyrere å handle, så kurtasjen spiser avkastningen",
          "Kurtasjen avhenger ikke av om aksjene er norske. Handelskostnader er ikke hovedargumentet mot denne porteføljen."),
    ],
    kort="<p><b>Dobbel eksponering.</b> Går det dårlig i oljebransjen, kan Petter miste jobben samtidig som aksjene "
         "faller. Humankapitalen er allerede en stor norsk posisjon.</p>",
    full="<p><b>Hva hjemmebias er.</b> Mange eier nesten bare aksjer fra eget land, selv om Norge er rundt 0,2 % av "
         "verdens aksjemarked. Døskeland og Hvide finner at nordmenn i snitt har rundt 32 % av porteføljen i egen bransje "
         "og får omtrent 3 prosentpoeng lavere avkastning der.</p>"
         "<p><b>Steg 1: hva Petter allerede eier.</b> Lønnen hans, humankapitalen, er en stor og udiversifisert posisjon "
         "i norsk oljeservice. Den er verdt mye mer enn aksjeporteføljen.</p>"
         "<p><b>Steg 2: hva aksjene legger til.</b> Mer av den samme risikoen. Faller oljeprisen, faller både jobben og "
         "porteføljen.</p>"
         "<p><b>Steg 3: alternativet.</b> Et globalt indeksfond gjør det nesten like bra i gode norske år og mye bedre i "
         "dårlige. Det samvarierer mindre med lønnen.</p>"
         "<p><b>Kontroll:</b> argumentet gjelder uansett om hjemmebias er en feilslutning eller en preferanse. I begge "
         "tilfeller øker den samvariasjonen med resten av formuen. Det er det porteføljeteorien sier du skal unngå.</p>"
         "<p><b>Husk:</b> hjemmebias er et diversifiseringsproblem. Jobben din er allerede en norsk aksje.</p>",
)

statisk(
    "psy-s04", hjelp=HJELP["psy-s04"], tema="psykologi", type="tolkning",
    q="<p>Mari har kr 100 000 på en sparekonto til 3 % rente og kr 100 000 i forbrukslån til 14 % rente. Hun kaller "
      "sparekontoen «bufferen» og rører den ikke. Renteinntekter skattlegges med 22 %. Renteutgifter gir fradrag med "
      "22 %. Hvilket avvik viser hun? Hva koster det i året?</p>",
    alternativer=[
        R("Mental regnskapsføring, som koster kr 8 580 i året"),
        F("Mental regnskapsføring, som koster kr 11 000 i året",
          "Skatten er glemt. Renteinntekten skattlegges og renteutgiften gir fradrag, så renteforskjellen skal ganges med (1 − 22 %)."),
        F("Tapsaversjon, som koster kr 8 580 i året",
          "Tapsaversjon er at tap veier tyngre enn like store gevinster. Ingenting i oppgaven handler om et tap Mari vil unngå."),
        F("Ingen feil, for bufferen er en forsikring som ikke koster noe",
          "Bufferen kunne betalt ned lånet. Å betale 14 % hele tiden for å ha en buffer er dyrt, ikke gratis."),
    ],
    kort="<p><b>Mental regnskapsføring, kr 8 580 i året.</b> Hun tjener 3 % × 0,78 og betaler 14 % × 0,78. "
         "Forskjellen er 8,58 % av 100 000.</p>",
    full="<p><b>Hva mental regnskapsføring er.</b> Penger merkes etter kilde og formål i stedet for å telles som én "
         "formue. «Bufferen» og «lånet» føles som to ulike kontoer. For formuen din er de bare ett tall: 100 000 minus "
         "100 000.</p>"
         "<p><b>Steg 1: hva sparekontoen gir.</b> 3 % × 100 000 = 3 000, minus 22 % skatt: 2 340.</p>"
         "<p><b>Steg 2: hva lånet koster.</b> 14 % × 100 000 = 14 000, minus 22 % fradrag: 10 920.</p>"
         "<p><b>Steg 3: hva hun taper.</b> 10 920 − 2 340 = <b>8 580</b> i året. Betaler hun ned lånet med "
         "sparepengene, forsvinner begge postene. Formuen blir 8 580 kroner høyere etter ett år.</p>"
         "<p><b>Kontroll:</b> renteforskjellen er 11 prosentpoeng. Etter skatt er den 11 % × 0,78 = 8,58 %. Av 100 000 er "
         "det 8 580 ✓.</p>"
         "<p><b>Er bufferen verdt noe?</b> Litt, hvis hun ellers ikke får kreditt i en krise. Men 8 580 i året er en dyr "
         "forsikring for 100 000 som kunne vært brukt til å betale ned lånet.</p>"
         "<p><b>Husk:</b> mental regnskapsføring = penger merket etter formål. Typisk pris: dyr gjeld og sparepenger "
         "samtidig.</p>",
)

statisk(
    "psy-s05", hjelp=HJELP["psy-s05"], tema="psykologi", type="begrep",
    q="<p>Hva betyr tapsaversjon?</p>",
    alternativer=[
        R("Et tap veier tyngre enn en like stor gevinst, målt fra et referansepunkt"),
        F("Du foretrekker et sikkert beløp framfor et lotteri med samme forventning",
          "Det er vanlig risikoaversjon, en konkav nyttefunksjon av hele formuen. Den gjelder også når alle utfallene er gevinster."),
        F("Du selger aksjer som har steget og beholder dem som har falt",
          "Det er disposisjonseffekten. Den bygger på tapsaversjon, men er ikke det samme."),
        F("Du undervurderer hvor raskt et tap vokser når det får stå urørt over lang tid",
          "Det blander inn eksponentiell vekst-bias. Tapsaversjon handler om hvordan tap og gevinster føles."),
    ],
    kort="<p><b>Tap veier tyngre enn like store gevinster.</b> Nytten måles fra et referansepunkt, ofte det du startet "
         "med. Kurven er brattere for tap.</p>",
    full="<p><b>Hva tapsaversjon er.</b> Å tape 10 000 kroner gjør mer vondt enn å vinne 10 000 kroner gjør godt. "
         "Gevinst og tap måles fra et referansepunkt, for eksempel kjøpskursen eller det du satte inn. I prospektteoriens "
         "verdifunksjon gir det en knekk i referansepunktet: kurven er brattere for tap enn for gevinster.</p>"
         "<p><b>Steg 1: skill fra risikoaversjon.</b> Risikoaversjon kommer av en konkav nyttefunksjon av hele formuen. "
         "Den gjelder også når alle utfall er gevinster. Tapsaversjon gjelder bare utfall under referansepunktet.</p>"
         "<p><b>Steg 2: hva den fører til.</b> For lav aksjeandel og forsikring av småtap. Den er også mekanismen bak "
         "disposisjonseffekten: å realisere et tap gjør det endelig.</p>"
         "<p><b>Steg 3: preferanse eller feil?</b> Forelesningen regner tapsaversjon som en preferanse. Den kan ikke være "
         "feil, bare dyr. Den må omgås med en regel, for eksempel en skriftlig investeringsplan.</p>"
         "<p><b>Kontroll:</b> spør om valget ville endret seg hvis referansepunktet flyttet seg. Gjør det det, er det "
         "tapsaversjon og ikke bare risikoaversjon.</p>"
         "<p><b>Husk:</b> tapsaversjon = tap veier tyngre enn like store gevinster, fra et referansepunkt.</p>",
)

statisk(
    "psy-s06", hjelp=HJELP["psy-s06"], tema="psykologi", type="begrep",
    q="<p>Forelesningen skiller mellom avvik som er feilslutninger og avvik som er preferanser. Hva følger av at "
      "tapsaversjon regnes som en preferanse?</p>",
    alternativer=[
        R("Den må omgås med en regel, som en skriftlig plan, fordi informasjon ikke biter"),
        F("Den kan rettes med informasjon, som Forbrukerrådets tall for aktive fond mot indeks",
          "Informasjon retter en feilslutning, altså en tankefeil. Tapsaversjon regnes ikke som en tankefeil."),
        F("Den er irrasjonell og bør fjernes med mer generell finansundervisning",
          "En preferanse kan ikke være feil. Generell finansundervisning forklarer dessuten bare rundt 0,1 % av atferden."),
        F("Den er ufarlig, fordi en preferanse aldri koster noe i kroner",
          "En preferanse kan være dyr, for eksempel gjennom for lav aksjeandel."),
    ],
    kort="<p><b>Den må omgås med en regel.</b> En preferanse kan ikke være feil, bare dyr. Informasjon hjelper ikke, men "
         "en plan laget på forhånd binder valget.</p>",
    full="<p><b>To slags avvik.</b> En feilslutning er en tankefeil: du tror noe som ikke stemmer. Informasjon kan i "
         "prinsippet rette den. En preferanse er hva du faktisk liker. Den kan ikke være feil, bare dyr.</p>"
         "<p><b>Steg 1: hvor tapsaversjon hører hjemme.</b> Forelesningen regner tapsaversjon som en preferanse. "
         "Overkonfidens, forankring og flokkatferd er feilslutninger. Hjemmebias kan leses begge veier.</p>"
         "<p><b>Steg 2: hva det betyr for motgiften.</b> Du kan ikke informere bort en preferanse. Du kan derimot "
         "binde deg på forhånd: skriv ned en investeringsplan når du er rolig. Følg den når markedet faller. Det er "
         "samme mekanisme som Ulysses ved masten.</p>"
         "<p><b>Steg 3: hva forsøkene viser.</b> Forbrukerrådets tall flyttet indeksandelen fra 11 % til 15 %. Det er "
         "informasjon som retter en feilslutning. Generell finansundervisning forklarer bare rundt 0,1 % av variasjonen i "
         "atferd.</p>"
         "<p><b>Kontroll:</b> spør om personen ville endret valget hvis hun fikk vite mer. Ja: feilslutning. Nei, hun "
         "liker det bare slik: preferanse.</p>"
         "<p><b>Husk:</b> feilslutning → informasjon. Preferanse → regel (plan, binding).</p>",
)

statisk(
    "psy-s07", hjelp=HJELP["psy-s07"], tema="psykologi", type="begrep",
    q="<p>Kahneman skiller mellom to måter å tenke på. System 1 er den raske magefølelsen. System 2 er den langsomme "
      "overveielsen. Når gir magefølelsen gode valg?</p>",
    alternativer=[
        R("Når ledetrådene er valide, som i en erfaren leges eller brannmanns blikk"),
        F("Når du leser dagens aksjekurs som et signal om hva kursen blir framover",
          "Dagens kurs sier lite om framtidig kurs. Det er forelesningens eksempel på at magefølelsen svikter."),
        F("Når valget er stort og sjeldent, som kjøp av bolig eller valg av pensjon",
          "Store, sjeldne valg gir lite erfaring å bygge magefølelsen på. Der trengs system 2."),
        F("Aldri, fordi system 1 per definisjon tar irrasjonelle beslutninger",
          "Magefølelsen er ofte god. System 1 er ikke irrasjonelt per definisjon, så «aldri» er for sterkt."),
    ],
    kort="<p><b>Når ledetrådene er valide.</b> Ekspertvurderinger bygget på mye erfaring er gode. Magefølelsen om "
         "aksjekurser er det ikke.</p>",
    full="<p><b>De to systemene.</b> System 1 tenker raskt, intuitivt og i stor grad ubevisst, styrt av følelser og "
         "erfaring. System 2 tenker sakte, reflekterende og analyserende. Økonomisk teori forutsetter system 2.</p>"
         "<p><b>Steg 1: når system 1 er godt.</b> Når du har mye erfaring med situasjoner der ledetrådene faktisk sier "
         "noe om utfallet. En erfaren brannmann eller lege kan kjenne igjen fare før hun kan forklare hvorfor.</p>"
         "<p><b>Steg 2: når det svikter.</b> Når ledetrådene ikke er valide. Dagens aksjekurs sier lite om morgendagens, "
         "men magefølelsen leser den likevel som et signal.</p>"
         "<p><b>Steg 3: hva det betyr for reguleringer.</b> Betenkningstid før forbrukslån flytter valget fra impulsen i "
         "system 1 til overveielsen i system 2. Det var fasitens svar i H2016 oppgave 3j.</p>"
         "<p><b>Kontroll:</b> spør om personen har fått rask og ærlig tilbakemelding på mange like valg før. Ja: "
         "magefølelsen kan stoles på. Nei: bruk system 2.</p>"
         "<p><b>Husk:</b> system 1 er godt der ledetrådene er valide, dårlig der de ikke er det.</p>",
)

statisk(
    "psy-s08", hjelp=HJELP["psy-s08"], tema="psykologi", type="begrep",
    q="<p>Hvilken av forelesningens regler er særlig rettet mot forankring og flokkatferd?</p>",
    alternativer=[
        R("Automatisk månedlig sparing, så du ikke velger tidspunkt"),
        F("Et globalt indeksfond, så du slipper å plukke enkeltaksjer selv",
          "Indeksfondet er regelen mot overkonfidens og hjemmebias."),
        F("IPS og tjenestepensjon, så pengene er låst inne til du blir gammel",
          "Innlåsingen er regelen mot svak selvkontroll."),
        F("Mer generell finansundervisning, så du forstår markedet bedre",
          "Generell undervisning har vist seg å forklare svært lite av atferden. Den er ikke en av reglene."),
    ],
    kort="<p><b>Automatisk sparing.</b> Beslutningen tas én gang, i ro. Dagens pris blir aldri et anker eller en "
         "anledning til å følge stemningen.</p>",
    full="<p><b>Hva avvikene er.</b> Forankring er at det første tallet du så, styrer vurderingen. Flokkatferd er å følge "
         "mengden i stedet for egen analyse. Begge slår til når du velger tidspunkt: du kjøper når alle kjøper, eller "
         "venter på at kursen skal tilbake til et tall du har i hodet.</p>"
         "<p><b>Steg 1: regelen.</b> Automatisk månedlig sparing. Du bestemmer beløpet én gang. Pengene investeres "
         "hver måned uansett kurs.</p>"
         "<p><b>Steg 2: hvorfor den virker.</b> Du tar aldri et kjøpsvalg på en bestemt dag. Da finnes det ikke noe "
         "anker å vurdere mot og ingen stemning å følge. Du slutter også å time markedet.</p>"
         "<p><b>Steg 3: de andre reglene.</b> Globalt indeksfond mot overkonfidens og hjemmebias. IPS og "
         "tjenestepensjon mot svak selvkontroll. Skriftlig plan der avviket er en preferanse.</p>"
         "<p><b>Kontroll:</b> spør hvilket valg regelen fjerner. Automatisk sparing fjerner valget av tidspunkt. Det er "
         "nettopp der forankring og flokkatferd virker.</p>"
         "<p><b>Husk:</b> automatisk sparing mot forankring og flokk. Indeks mot overkonfidens og hjemmebias.</p>",
)

statisk(
    "psy-s09", hjelp=HJELP["psy-s09"], tema="psykologi", type="begrep",
    q="<p>Ola skal by på en leilighet. Han så prisantydningen, kr 4 200 000, før han leste taksten. Takstmannen mener leiligheten er verdt "
      "kr 3 800 000, men alle budene Ola vurderer, ligger like rundt prisantydningen. Hvilket avvik viser han?</p>",
    alternativer=[
        R("Forankring: det første tallet han så, styrer vurderingen"),
        F("Flokkatferd: han gjør det samme som de andre budgiverne",
          "Det står ingenting om hva de andre budgiverne gjør. Flokkatferd krever at han følger dem."),
        F("Overkonfidens: han tror han vet mer enn takstmannen gjør",
          "Oppgaven sier ingenting om en egen analyse han stoler mer på enn taksten. Overkonfidens krever det."),
        F("Tapsaversjon: han frykter å tape budrunden mer enn han ønsker å vinne",
          "Tapsaversjon gjelder gevinst og tap målt fra et referansepunkt i formuen. Oppgaven sier ingenting om at han frykter et tap."),
    ],
    kort="<p><b>Forankring.</b> Prisantydningen er det første tallet han så. Den trekker vurderingen mot seg, selv om "
         "taksten sier noe annet.</p>",
    full="<p><b>Hva forankring er.</b> Det første tallet du ser, blir et anker. Senere vurderinger justeres bort fra "
         "ankeret, men for lite. Det gjelder også når ankeret er tilfeldig eller satt av en part med egeninteresse.</p>"
         "<p><b>Steg 1: hva ankeret er.</b> Prisantydningen på 4 200 000, satt av megleren.</p>"
         "<p><b>Steg 2: hva informasjonen sier.</b> Takstmannen mener verdien er 3 800 000. Likevel ligger budene rundt "
         "4 200 000. Ankeret styrer mer enn informasjonen.</p>"
         "<p><b>Steg 3: skill fra de andre.</b> Flokkatferd krever at han følger andre. Overkonfidens krever at han "
         "stoler på egen vurdering. Ingen av delene står i oppgaven.</p>"
         "<p><b>Samme avvik i aksjer.</b> Kjøpskursen blir et anker for hva aksjen «egentlig» er verdt. Det forsterker "
         "disposisjonseffekten.</p>"
         "<p><b>Kontroll:</b> hvis budet hadde vært det samme med en prisantydning på 3 500 000, var det ikke forankring. "
         "Flytter budet seg med prisantydningen, er det det.</p>"
         "<p><b>Husk:</b> forankring = det første tallet styrer vurderingen.</p>",
)

statisk(
    "psy-s10", hjelp=HJELP["psy-s10"], tema="psykologi", type="begrep",
    q="<p>Kari beholder en aksje som har falt 40 %. Hun vil vente «til den kommer tilbake til kjøpskursen». Hvorfor er "
      "resonnementet irrasjonelt?</p>",
    alternativer=[
        R("Kjøpskursen er historie og sier ingenting om hva aksjen vil gi framover"),
        F("Aksjer som har falt, fortsetter normalt å falle, så hun burde solgt straks",
          "Det er en påstand om kursutviklingen, ikke om resonnementet. Teorien sier ikke at fall fortsetter."),
        F("Det er rasjonelt, fordi tapet ikke er et tap før det er realisert",
          "Det er nettopp feilslutningen. Formuen er redusert uansett om tapet realiseres."),
        F("Hun burde beholdt aksjen uansett, fordi tap på aksjer ikke gir fradrag",
          "Tap på aksjer gir fradrag med 37,84 %. Å realisere tapet gir fradraget tidligere."),
    ],
    kort="<p><b>Kjøpskursen er irrelevant.</b> To personer som eier samme aksje i dag, bør ta samme valg, uansett hva de "
         "betalte.</p>",
    full="<p><b>Hva disposisjonseffekten er.</b> Folk selger aksjer som har steget og beholder dem som har falt. "
         "Kjøpskursen blir et referansepunkt. Å realisere et tap gjør det endelig. Det gjør vondt. Mekanismen er "
         "tapsaversjon.</p>"
         "<p><b>Steg 1: hva kjøpskursen er.</b> En historisk opplysning om hva du betalte. Den sier ingenting om hva "
         "aksjen er verdt nå eller vil bli verdt. Den er en sunk cost.</p>"
         "<p><b>Steg 2: hva som bør avgjøre.</b> Forventet avkastning framover. Ville du kjøpt aksjen i dag til dagens "
         "kurs? Hvis nei, bør du heller ikke eie den.</p>"
         "<p><b>Steg 3: skatten forsterker feilen.</b> Tapet gir fradrag med 37,84 %. Selger hun taperen, får hun "
         "fradraget nå. Selger hun vinnere i stedet, betaler hun skatt nå. Disposisjonseffekten gjør begge deler feil vei.</p>"
         "<p><b>Kontroll:</b> tenk deg at to personer eier samme aksje til samme kurs i dag. Den ene kjøpte for 100, den "
         "andre for 60. Skal de ta ulike valg? Nei. Da kan ikke kjøpskursen avgjøre.</p>"
         "<p><b>Husk:</b> kjøpskursen er en sunk cost. Spør bare: ville jeg kjøpt den i dag?</p>",
)

statisk(
    "psy-s11", hjelp=HJELP["psy-s11"], tema="psykologi", type="paastand",
    q="<p>Forelesningen knytter hver av sine praktiske regler til bestemte avvik. Hvilken kobling er riktig?</p>",
    alternativer=[
        R("Globalt indeksfond mot overkonfidens og hjemmebias"),
        F("Automatisk sparing mot hjemmebias og tapsaversjon",
          "Automatisk sparing er rettet mot forankring og flokkatferd."),
        F("IPS og tjenestepensjon mot overkonfidens og flokkatferd",
          "Innlåsingen i IPS og tjenestepensjon er rettet mot svak selvkontroll."),
        F("Finansundervisning mot tapsaversjon og mental regnskapsføring",
          "Generell finansundervisning er ikke en av reglene. Tapsaversjon er en preferanse og krever en plan."),
    ],
    kort="<p><b>Globalt indeksfond mot overkonfidens og hjemmebias.</b> Fondet fjerner både aksjeplukkingen og "
         "Norge-konsentrasjonen.</p>",
    full="<p><b>Fire regler, fire mål.</b> Forelesningen gir fire praktiske regler, hver knyttet til bestemte avvik.</p>"
         "<p><b>Globalt indeksfond</b> mot overkonfidens og hjemmebias. Du kan ikke være overkonfident på vegne av et fond "
         "som per konstruksjon gir gjennomsnittet. Et globalt fond fjerner også Norge-konsentrasjonen.</p>"
         "<p><b>Automatisk månedlig sparing</b> mot forankring og flokkatferd. Beslutningen tas én gang, så dagens kurs "
         "blir aldri et anker eller en grunn til å følge mengden.</p>"
         "<p><b>IPS og tjenestepensjon</b> mot svak selvkontroll. Pengene er låst inne. Skattefordelen i IPS er en bonus, "
         "ikke begrunnelsen.</p>"
         "<p><b>Skriftlig investeringsplan</b> mot resten, særlig der avviket er en preferanse som tapsaversjon. "
         "Planen gjør avvik synlige.</p>"
         "<p><b>Kontroll:</b> spør hva regelen fjerner. Indeksfondet fjerner aksjevalget. Automatisk sparing fjerner "
         "valget av tidspunkt. Innlåsing fjerner muligheten til å bruke pengene. Planen fjerner fristelsen til å "
         "improvisere.</p>"
         "<p><b>Husk:</b> indeks → overkonfidens og hjemmebias. Automatikk → forankring og flokk. Innlåsing → "
         "selvkontroll. Plan → preferanser.</p>",
)

statisk(
    "psy-s12", hjelp=HJELP["psy-s12"], tema="psykologi", type="begrep",
    q="<p>I nesten alle land eier under halvparten av husholdningene aksjer. Hvorfor kan ikke risikoaversjon alene "
      "forklare det?</p>",
    alternativer=[
        R("For små beløp er nytten nesten lineær, så alle burde eie litt aksjer"),
        F("Risikoaverse personer eier aldri aksjer, så risikoaversjon forklarer alt",
          "Risikoaverse personer eier gjerne aksjer, bare mindre. Med positiv risikopremie kjøper de noe."),
        F("Aksjer har lavere forventet avkastning enn bankinnskudd over tid",
          "Aksjer har høyere forventet avkastning. Det er risikopremien."),
        F("Skatten på aksjegevinster gjør aksjer ulønnsomme for vanlige husholdninger",
          "Skjermingsfradraget gjør den risikofrie delen skattefri. Skatten forklarer ikke at så mange står helt utenfor."),
    ],
    kort="<p><b>Nytten er nesten lineær for små beløp.</b> Den første tusenlappen i aksjer er nesten gratis risiko med "
         "positiv forventet premie. Terskelen er hindringen, ikke smaken.</p>",
    full="<p><b>Hva teorien sier.</b> En risikoavers person krever en premie for å ta risiko. Aksjer har en positiv "
         "risikopremie. For små beløp er enhver jevn nyttefunksjon nesten lineær, altså nesten risikonøytral. En liten "
         "aksjepost gir derfor nesten bare premien. Alle burde eie litt.</p>"
         "<p><b>Steg 1: hva vi ser.</b> Under halvparten eier aksjer i det hele tatt. Det er ikke at de eier litt. De eier "
         "ingenting.</p>"
         "<p><b>Steg 2: hva som da må forklare det.</b> Faste kostnader ved å komme i gang, manglende kunnskap og "
         "treghet. Det er terskler, ikke preferanser.</p>"
         "<p><b>Steg 3: hva som virker.</b> Standardvalg. Automatisk pensjonssparing øker sannsynligheten for at folk "
         "sparer med rundt 50 %. Når terskelen fjernes, sparer folk.</p>"
         "<p><b>Kontroll:</b> hadde risikoaversjon vært forklaringen, ville vi sett mange med små aksjeandeler, ikke "
         "mange med null. At nullen er så vanlig, peker på en fast kostnad ved å starte.</p>"
         "<p><b>Husk:</b> lav aksjedeltakelse = terskler og treghet. Motgift: standardvalg.</p>",
)

statisk(
    "psy-s13", hjelp=HJELP["psy-s13"], tema="psykologi", type="begrep",
    q="<p>Hva er forskjellen på et avvik (bias) og støy i vurderinger?</p>",
    alternativer=[
        R("Et avvik har en fast retning. Støy er spredning uten retning."),
        F("Et avvik er tilfeldig spredning. Støy bommer i samme retning hver gang.",
          "Begrepene er byttet om. Bias betyr skjevhet. En skjevhet kan ikke være tilfeldig spredning."),
        F("Et avvik gjelder enkeltpersoner. Støy gjelder bare hele markedet.",
          "Begge gjelder enkeltpersoners vurderinger. Kahnemans forsøk målte støy mellom saksbehandlere i ett selskap, ikke i markedet."),
        F("Et avvik kan rettes med informasjon. Støy er en preferanse.",
          "Støy er ingen preferanse. Den dempes ved å bruke samme framgangsmåte hver gang."),
    ],
    kort="<p><b>Retning mot spredning.</b> Bias er systematisk feil i én retning. Støy er ustabile vurderinger. De har "
         "hver sin motgift.</p>",
    full="<p><b>To slags feil.</b> Et avvik (bias) er en systematisk skjevhet: du bommer i samme retning gang på gang. "
         "Støy er feil uten retning: vurderingene spriker, men ikke systematisk den ene veien.</p>"
         "<p><b>Steg 1: motgiften mot bias.</b> En regel som peker motsatt vei. Er du overkonfident, kjøper du "
         "indeksfond i stedet for å plukke aksjer.</p>"
         "<p><b>Steg 2: motgiften mot støy.</b> Samme framgangsmåte hver gang: faste skjemaer og enkle modeller.</p>"
         "<p><b>Steg 3: hvor stor støyen er.</b> Kahneman lot saksbehandlere i et forsikringsselskap sette premie på de "
         "samme sakene. Ledelsen ventet rundt 10 % uenighet. Funnet var nærmere 50 %. På én sak sa den ene 700, den "
         "andre 1 250.</p>"
         "<p><b>Kontroll:</b> spør om gjennomsnittet av mange vurderinger ville truffet. Ja: det er støy, som jevnes ut. "
         "Nei, alle bommer samme vei: det er bias, som ikke jevnes ut.</p>"
         "<p><b>Husk:</b> bias = systematisk, rettes med en motsatt regel. Støy = spredning, dempes med fast "
         "framgangsmåte.</p>",
)

statisk(
    "psy-s14", hjelp=HJELP["psy-s14"], tema="psykologi", type="paastand", rekkefolge="fast",
    q="<p>Vurder to påstander om prospektteoriens verdifunksjon.</p>"
      "<p>I. Nytten måles ut fra formuens absolutte nivå, som i vanlig forventet nytte.</p>"
      "<p>II. Kurven er brattere for tap enn for gevinster rett ved referansepunktet.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        F("Bare I", "Påstand I er gal: verdifunksjonen måler gevinst og tap fra et referansepunkt, ikke fra formuens nivå."),
        R("Bare II"),
        F("Både I og II", "Påstand I er gal. Det som skiller verdifunksjonen fra vanlig nytte, er nettopp referansepunktet."),
        F("Ingen av dem", "Knekken i referansepunktet er tapsaversjonen. Sjekk påstand II mot den før du forkaster begge."),
    ],
    kort="<p><b>Bare II.</b> Verdifunksjonen måler gevinst og tap fra et referansepunkt. Den er brattere for tap: det er "
         "tapsaversjonen.</p>",
    full="<p><b>Hva verdifunksjonen er.</b> Prospektteorien beskriver hvordan folk faktisk vurderer risikable valg. Den "
         "har tre egenskaper som skiller den fra en vanlig konkav nyttefunksjon av formuen.</p>"
         "<p><b>Egenskap 1: referansepunktet.</b> Nytten måles fra der du startet, ikke fra formuens nivå. Det gjør "
         "påstand I gal.</p>"
         "<p><b>Egenskap 2: knekken.</b> Kurven er brattere for tap enn for gevinster rett ved referansepunktet. Det er "
         "tapsaversjonen. Påstand II er riktig.</p>"
         "<p><b>Egenskap 3: avtakende følsomhet.</b> Begge grenene flater ut. Den tiende tusenlappen i tap merkes mindre "
         "enn den første. Tapsgrenen er derfor konveks. Det føles billigere å risikere et større tap enn å "
         "realisere det du har. Det forklarer disposisjonseffekten.</p>"
         "<p><b>Kontroll:</b> sjekk at du kan navngi alle tre egenskapene. H2019 oppgave 9h ba om nettopp dem.</p>"
         "<p><b>Husk:</b> referansepunkt, knekk (tapsaversjon) og avtakende følsomhet.</p>",
)

statisk(
    "psy-s15", hjelp=HJELP["psy-s15"], tema="psykologi", type="tolkning",
    q="<p>I et forsøk fikk halvparten av rundt 590 norske fondskunder Forbrukerrådets tall for aktive fond mot "
      "indeksfond. Indeksandelen i den gruppen steg fra 11 % til 15 %. Effekten varte i to år. Hva viser forsøket?</p>",
    alternativer=[
        R("Konkret informasjon kan rette en feilslutning, men effekten er moderat"),
        F("Informasjon virker ikke, så bare innlåsing av pengene kan endre atferd",
          "Indeksandelen økte med drøyt en tredjedel relativt. Effekten varte i to år. Det motsier at informasjon ikke virker."),
        F("Generell finansundervisning er det mest effektive tiltaket mot alle avvik",
          "Forsøket ga konkret, lett etterprøvbar informasjon. Generell undervisning forklarer svært lite av atferden."),
        F("Aktive fond gjør det bedre enn indeksfond når kundene er godt informert",
          "Forsøket måler kundenes valg, ikke fondenes avkastning. Kundene flyttet mot indeks."),
    ],
    kort="<p><b>Informasjon kan rette en feilslutning.</b> Indeksandelen steg 4 prosentpoeng, drøyt en tredjedel "
         "relativt. Effekten varte i to år.</p>",
    full="<p><b>Hva forsøket testet.</b> Mange tror at aktive fond slår indeksfond. Det er en feilslutning. Forsøket "
         "testet om konkret informasjon kunne rette den.</p>"
         "<p><b>Steg 1: resultatet.</b> Indeksandelen steg fra 11 % til 15 %. Det er 4 prosentpoeng, eller 4/11 = 36 % "
         "relativt. Andelen som trodde de kunne slå markedet, falt med 12 %. Effekten varte i to år.</p>"
         "<p><b>Steg 2: hva det betyr.</b> Rådet var konkret og enkelt å følge. Da kan informasjon rette en "
         "feilslutning. Effekten er reell, men moderat.</p>"
         "<p><b>Steg 3: sammenlign.</b> I hjemmebias-forsøket forsto deltakerne argumentet, men endret ingenting. "
         "Generell finansundervisning forklarer bare rundt 0,1 % av variasjonen i atferd. Standardvalg virker sterkere.</p>"
         "<p><b>Kontroll:</b> spør hva som skilte forsøkene. Indeksforsøket ga ett konkret tall å handle på. Der virket "
         "informasjonen. Der den ikke virket, må avviket omgås med en regel.</p>"
         "<p><b>Husk:</b> konkret informasjon kan rette en feilslutning. Det som ikke rettes, må omgås med en regel.</p>",
)

statisk(
    "psy-s16", hjelp=HJELP["psy-s16"], tema="psykologi", type="begrep",
    q="<p>Hva er eksponentiell vekst-bias?</p>",
    alternativer=[
        R("Lineær framskriving, så både gjeld og sparing blir undervurdert"),
        F("Intuisjonen framskriver eksponentielt, så den overvurderer avkastningen",
          "Retningen er snudd. Intuisjonen bommer motsatt vei av det dette alternativet sier."),
        F("Du tror at høy avkastning i fjor betyr høy avkastning også i år",
          "Det er å lese fortiden som signal om framtiden, ikke en feil i hvordan vekst framskrives."),
        F("Du vurderer gjeld riktig, men undervurderer hvor mye sparing vokser",
          "Gjeld som får stå urørt, vokser med renters rente akkurat som sparing. Avviket kan ikke skille dem."),
    ],
    kort="<p><b>Lineær framskriving.</b> Intuisjonen legger til det samme beløpet hvert år. Renters rente gjør at både "
         "gjeld og sparing vokser raskere.</p>",
    full="<p><b>Hva avviket er.</b> Rentes rente gir vekst som tiltar over tid. Intuisjonen ser bare det første årets "
         "rente og ganger med antall år. Resultatet blir for lavt. Avstanden øker med tiden.</p>"
         "<p><b>Steg 1: gjeld.</b> 50 000 i kredittkortgjeld til 20 % i ti år. Lineær gjetning: 50 000 + 10 × 10 000 = "
         "150 000. Riktig: 50 000 × 1,20<sup>10</sup> = 309 587, over dobbelt så mye.</p>"
         "<p><b>Steg 2: sparing.</b> 36 000 i året i 20 år til 5,25 %. Innskuddene er 720 000. Sluttverdien er "
         "1 222 316. Over 40 % av sluttverdien er avkastning du aldri sparte.</p>"
         "<p><b>Steg 3: konsekvensen.</b> Folk tar opp for mye dyr gjeld og sparer for lite, fordi begge effektene "
         "virker mindre enn de er.</p>"
         "<p><b>Kontroll med doblinger:</b> til 20 % dobles gjelden på 3,8 år. På ti år blir det 2,63 doblinger. "
         "2<sup>2,63</sup> ≈ 6,2. Samme faktor som 1,20<sup>10</sup> = 6,19.</p>"
         "<p><b>Husk:</b> gjett først, regn etterpå. Vekst med renters rente er alltid mer enn du tror.</p>",
)

# ---------------------------------------------------------------------------
# Heuristikkene (forelesning 16): menyeffekt, 1/N-regelen og preferanse for det
# kjente. Kursgodkjenningstesten 2026 spurte om dette.
# ---------------------------------------------------------------------------

statisk(
    "psy-s17", tema="psykologi", type="begrep",
    hjelp=hjelp3(
        "Dette er begrepet heuristikk fra forelesningen om finansiell psykologi: du skal finne hva ordet betyr.",
        "Teorien: en rasjonell investor løser et optimeringsproblem, for eksempel Mertons w* = (μ − r<sub>f</sub>)/"
        "(γσ<sup>2</sup>). Et avvik (bias) er en systematisk feil i resultatet. En preferanse er det du liker.",
        "<p><b>Steg 1: hva er motstykket?</b> Tenk på hvordan teorien sier at porteføljen skal velges.</p>"
        "<p><b>Steg 2: hva gjør folk i stedet?</b> Forelesningens eksempler er menyeffekten og 1/N-regelen. Hva har de "
        "felles?</p>"
        "<p><b>Steg 3: stryk de gale.</b> Er alternativet en måte å ta valget på, en feil i resultatet, en smak eller "
        "selve den optimale løsningen?</p>"),
    q="<p>Forelesningen bruker ordet «heuristikk» om hvordan folk tar porteføljevalg. Hva er en heuristikk?</p>",
    alternativer=[
        R("En tommelfingerregel som forenkler et komplisert porteføljevalg"),
        F("En systematisk feil i hvordan folk vurderer sannsynligheter og risiko",
          "Det beskriver et avvik (bias), altså en feil i resultatet. En heuristikk er måten valget tas på. Den kan "
          "føre til et slikt avvik."),
        F("En preferanse for å eie aksjer i selskaper du kjenner fra før",
          "Det er preferanse for det kjente, en mulig forklaring på hjemmebias. Det er en smak, ikke en måte å ta "
          "valget på."),
        F("En matematisk regel som gir den optimale aksjeandelen for hver investor",
          "Det er Mertons regel, som løser optimeringsproblemet. Heuristikker brukes av folk som ikke løser det."),
    ],
    kort="<p><b>En tommelfingerregel som forenkler valget.</b> I stedet for å løse et vanskelig optimeringsproblem "
         "bruker folk enkle regler. Menyeffekten og 1/N-regelen er kursets eksempler.</p>",
    full="<p><b>Hva en heuristikk er.</b> Et porteføljevalg er vanskelig. Teorien sier at du skal veie risikopremie, "
         "risiko og din egen risikoaversjon og spre pengene optimalt. De fleste gjør ikke det. De bruker en enkel "
         "tommelfingerregel i stedet. Forelesningen kaller slike forenklinger heuristikker.</p>"
         "<p><b>Steg 1: kursets to eksempler.</b> Menyeffekten: fond eller aksjer som står øverst på listen, altså er "
         "mest synlige, velges oftere, uavhengig av kvalitet. 1/N-regelen: folk fordeler pengene jevnt på "
         "alternativene som tilbys, selv når det ikke er optimalt.</p>"
         "<p><b>Steg 2: heuristikk mot avvik.</b> En heuristikk er en måte å ta valget på. Den kan gi et avvik (bias), "
         "for eksempel en aksjeandel som styres av menyen i stedet for av risikopremien. Avviket er resultatet. "
         "Heuristikken er metoden.</p>"
         "<p><b>Steg 3: heuristikk mot preferanse.</b> Preferanse for det kjente er en smak: du vil eie det du kjenner. "
         "Den er en mulig forklaring på hjemmebias, men ingen regel for å forenkle valget.</p>"
         "<p><b>Kontroll:</b> spør om personen kunne tatt et bedre valg med mer tid og regnekraft. Ja: da er regelen en "
         "forenkling, altså en heuristikk. Mertons formel er det motsatte. Den er selve løsningen.</p>"
         "<p><b>Husk:</b> heuristikk = tommelfingerregel i stedet for optimering. Eksempler: menyeffekt og 1/N.</p>",
)

statisk(
    "psy-s18", tema="psykologi", type="begrep",
    hjelp=hjelp3(
        "Dette er heuristikker og avvik i fondsvalg: du skal finne hvilken av dem som passer med det som endret seg og "
        "det kundene gjorde.",
        "Menyeffekt: det som står øverst og er mest synlig, velges oftere. 1/N-regelen: folk fordeler jevnt på alle "
        "alternativene. Preferanse for det kjente: du vil eie det du kjenner. Forankring: et tall du har sett, styrer "
        "vurderingen.",
        "<p><b>Steg 1: hva endret seg?</b> Skriv ned hva som er likt før og etter. Hva er ulikt?</p>"
        "<p><b>Steg 2: hva gjorde kundene?</b> Spredte de pengene jevnt, eller samlet de seg om ett fond?</p>"
        "<p><b>Steg 3: test hvert alternativ.</b> Spør hva hvert av dem krever: et antall alternativer, noe kjent, et "
        "tall eller en plassering. Velg det som passer med begge svarene.</p>"),
    q="<p>En pensjonsleverandør endrer rekkefølgen fondene vises i på nettsiden. Fondene, kostnadene og antallet er de "
      "samme som før. Etter endringen velger langt flere kunder fondet som nå står øverst. Hvilken heuristikk eller "
      "hvilket avvik viser kundene?</p>",
    alternativer=[
        R("Menyeffekt"),
        F("1/N-regelen",
          "1/N-regelen er at folk fordeler jevnt på alle alternativene. Her samler kundene seg om ett fond i stedet for "
          "å spre jevnt."),
        F("Preferanse for det kjente",
          "Fondene er de samme som før, så ingen av dem er blitt mer kjent for kundene. Preferanse for det kjente er en "
          "forklaring på hjemmebias."),
        F("Forankring",
          "Forankring er at et tall du har sett, styrer vurderingen av en verdi. Ingen tall i oppgaven styrer hvilket "
          "fond kundene velger."),
    ],
    kort="<p><b>Menyeffekt.</b> Bare plasseringen på listen endret seg. Det som står øverst og er mest synlig, velges "
         "oftere, uavhengig av kvalitet.</p>",
    full="<p><b>Hva menyeffekten er.</b> Forelesningen beskriver menyeffekten som en heuristikk: aksjer eller fond som "
         "står øverst på listen, altså er mest synlige, velges oftere, uavhengig av kvalitet. Folk orker ikke å "
         "vurdere alle alternativene og tar det første som ser greit ut.</p>"
         "<p><b>Steg 1: hva som endret seg.</b> Bare rekkefølgen. Fondene, kostnadene og antallet er de samme.</p>"
         "<p><b>Steg 2: hva som skjedde.</b> Flere velger fondet som nå står øverst. Valget følger plasseringen, ikke "
         "egenskapene til fondet.</p>"
         "<p><b>Steg 3: skill fra de andre.</b> 1/N-regelen gir jevn fordeling på alle fondene. Den avhenger av hvor "
         "mange fond som tilbys, ikke av rekkefølgen. Preferanse for det kjente krever at noe er kjent. Forankring "
         "krever et tall som styrer en vurdering.</p>"
         "<p><b>Kontroll:</b> tenk deg at leverandøren flytter et annet fond til toppen. Flytter kundene seg etter, er "
         "det menyeffekt. En rasjonell investor ville valgt det samme fondet uansett plassering.</p>"
         "<p><b>Hvorfor det betyr noe.</b> Den som setter opp menyen, påvirker valgene. Derfor betyr det mye hvilket "
         "fond som står først eller er standardvalget i en pensjonsordning.</p>"
         "<p><b>Husk:</b> menyeffekt = plasseringen på listen styrer valget.</p>",
)

statisk(
    "psy-s19", tema="psykologi", type="begrep",
    hjelp=hjelp3(
        "Dette er 1/N-regelen: du skal finne hvor stor aksjeandelen blir når sparingen fordeles likt på fondene som "
        "tilbys.",
        "Med N fond i menyen får hvert fond 1/N av sparingen. Aksjeandelen ≈ antall aksjefond/N. Renteandelen ≈ "
        "antall rentefond/N.",
        "<p><b>Steg 1: tell fondene.</b> Hvor mange aksjefond og hvor mange rentefond står i menyen? Summen er N.</p>"
        "<p><b>Steg 2: andelen per fond.</b> 1/N.</p>"
        "<p><b>Steg 3: aksjeandelen.</b> Antall aksjefond ganger 1/N.</p>"
        "<p><b>Pass på:</b> fordelingen er på hvert fond, ikke på hver fondstype. Sjekk at du har regnet aksjeandelen "
        "og ikke renteandelen.</p>"),
    q="<p>En arbeidsgiver tilbyr fem aksjefond og ett rentefond i den innskuddsbaserte pensjonsordningen. De ansatte "
      "velger selv og fordeler sparingen likt på alle fondene i menyen. Hvor stor andel av pensjonssparingen havner "
      "omtrent i aksjer?</p>",
    alternativer=[
        R("Om lag 83 %"),
        F("Om lag 50 %",
          "Det er jevn fordeling på de to fondstypene, aksjer og renter. De ansatte fordeler på hvert fond, ikke på "
          "hver type."),
        F("Om lag 17 %",
          "Det er andelen som havner i rentefondet, ikke i aksjefondene."),
        F("Det kan ikke sies uten å kjenne de ansattes risikoaversjon",
          "Det ville gjeldt for en rasjonell investor som løser Mertons problem. Oppgaven sier at de ansatte fordeler "
          "likt på fondene, så menyen avgjør andelen."),
    ],
    kort="<p><b>Om lag 83 %.</b> Med 1/N-regelen får hvert av de seks fondene en sjettedel. Fem av dem er aksjefond: "
         "5/6 ≈ 83 %.</p>",
    full="<p><b>Hva 1/N-regelen er.</b> En heuristikk der folk fordeler pengene jevnt på alternativene som tilbys, selv "
         "når det ikke er optimalt. Det er en enkel måte å slippe et vanskelig porteføljevalg på. Følgen er at "
         "aksjeandelen bestemmes av hvordan menyen er satt sammen.</p>"
         "<p><b>Steg 1: antall fond.</b> Fem aksjefond og ett rentefond, seks i alt.</p>"
         "<p><b>Steg 2: hvert fond.</b> Jevn fordeling gir 1/6 i hvert fond.</p>"
         "<p><b>Steg 3: aksjeandelen.</b> Fem fond à 1/6: 5/6 = 0,833, altså <b>om lag 83 %</b> i aksjer.</p>"
         "<p><b>Kontroll:</b> aksjeandelen og renteandelen skal summere til 100 %. Rentefondet får 1/6 ≈ 17 %. "
         "83 % + 17 % = 100 % ✓.</p>"
         "<p><b>Forsøket fra forelesningen.</b> Én gruppe fikk velge mellom fem aksjefond og ett rentefond, en annen "
         "mellom fire rentefond og ett aksjefond. Med 1/N gir den andre menyen bare 1/5 = 20 % i aksjer. Samme slags "
         "mennesker, svært ulik aksjeandel.</p>"
         "<p><b>Hvorfor det er et avvik.</b> For en rasjonell investor avhenger aksjeandelen bare av risikopremie, "
         "risiko og risikoaversjon. Antall fond i menyen står ikke i Mertons formel.</p>"
         "<p><b>Husk:</b> med 1/N blir aksjeandelen omtrent andelen aksjefond i menyen.</p>",
)

statisk(
    "psy-s20", tema="psykologi", type="begrep",
    hjelp=hjelp3(
        "Dette er heuristikkene i fondsvalg: du skal finne mekanismen som best forklarer at to ulike menyer gir svært "
        "ulik aksjeandel.",
        "Menyeffekt: plasseringen på listen styrer valget. 1/N-regelen: hvert av de N fondene får 1/N, så "
        "aksjeandelen ≈ antall aksjefond/N. Rasjonell aksjeandel: w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>).",
        "<p><b>Steg 1: hva skiller menyene?</b> Er det rekkefølgen eller antallet fond av hver type?</p>"
        "<p><b>Steg 2: regn ut</b> hva jevn fordeling ville gitt i aksjer med hver meny. Passer det med resultatet?</p>"
        "<p><b>Steg 3: stryk de andre.</b> Hvilken mekanisme krever at plasseringen endres? Hvilken ville trukket "
        "aksjeandelen samme vei i begge gruppene? Står antall fond i formelen for den rasjonelle aksjeandelen?</p>"),
    q="<p>I et forsøk fikk én gruppe velge pensjonsfond fra en meny med fem aksjefond og ett rentefond. En annen gruppe "
      "fikk en meny med fire rentefond og ett aksjefond. Den første gruppen endte med en mye høyere aksjeandel. Hvilken "
      "mekanisme forklarer forskjellen mest presist med kursets definisjoner?</p>",
    alternativer=[
        R("1/N-regelen: de fordeler sparingen jevnt på fondene"),
        F("Menyeffekten: fondet som står øverst, velges oftere",
          "Menyeffekten handler om plasseringen på listen. Forsøket endret hvor mange fond av hver type som ble "
          "tilbudt, ikke hvilket som sto øverst."),
        F("Tapsaversjon: tap veier tyngre enn like store gevinster",
          "Tapsaversjon ville trukket aksjeandelen ned i begge gruppene. Den sier ingenting om hvordan menyen er satt "
          "sammen."),
        F("Rasjonell tilpasning: flere aksjefond gir bedre spredning",
          "Ett bredt aksjefond gir alt god spredning. For en rasjonell investor avhenger aksjeandelen av risikopremie, "
          "risiko og risikoaversjon, ikke av antall fond."),
    ],
    kort="<p><b>1/N-regelen.</b> Jevn fordeling gir om lag 5/6 i aksjer med den første menyen og 1/5 med den andre. "
         "Aksjeandelen følger sammensetningen av menyen.</p>",
    full="<p><b>To heuristikker.</b> Forelesningen nevner to forenklinger i porteføljevalg. Menyeffekten: det som står "
         "øverst på listen, altså er mest synlig, velges oftere, uavhengig av kvalitet. 1/N-regelen: folk fordeler "
         "jevnt på alternativene som tilbys, selv når det ikke er optimalt.</p>"
         "<p><b>Steg 1: hva forsøket endret.</b> Antallet fond av hver type, ikke rekkefølgen.</p>"
         "<p><b>Steg 2: regn med 1/N.</b> Første meny: fem av seks fond er aksjefond, så om lag 5/6 ≈ 83 % i aksjer. "
         "Andre meny: ett av fem, altså 1/5 = 20 %. Det passer med en mye høyere aksjeandel i den første gruppen.</p>"
         "<p><b>Steg 3: hvorfor det ikke er rasjonelt.</b> Mertons aksjeandel w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>) "
         "avhenger av risikopremie, risiko og risikoaversjon. Antall fond står ikke i formelen.</p>"
         "<p><b>En nyanse.</b> Kursgodkjenningstesten i 2026 brukte et lignende eksempel og kalte fenomenet menyeffekt, "
         "uten 1/N som alternativ. I vid forstand er det en effekt av menyen. Med kursets egen definisjon handler "
         "menyeffekten om plasseringen. Forelesningen fra 2024 viser forsøket under 1/N. Står 1/N blant "
         "alternativene, er det det presise svaret. Gjør det ikke det, er menyeffekt det beste av dem som står.</p>"
         "<p><b>Kontroll:</b> snu rekkefølgen i menyen uten å endre antallet. Etter 1/N endres ikke aksjeandelen. "
         "Etter menyeffekten skulle den endret seg.</p>"
         "<p><b>Husk:</b> menyeffekt = plasseringen styrer. 1/N = antallet av hver type styrer.</p>",
)

statisk(
    "psy-s21", tema="psykologi", type="begrep",
    hjelp=hjelp3(
        "Dette er hjemmebias: du skal finne forklaringen som passer når folk forstår risikoen, men likevel ikke endrer "
        "porteføljen.",
        "Forelesningen: hjemmebias er enten et avvik (50-50-heuristikk, tilgjengelighet) eller en preferanse "
        "(tilhørighet). Et avvik er en tankefeil som informasjon kan rette. En preferanse er det du liker. Den kan "
        "ikke være feil, bare dyr.",
        "<p><b>Steg 1: hva fikk investorene?</b> Informasjon. Forsto de den?</p>"
        "<p><b>Steg 2: hva skjedde med porteføljen?</b> Hva sier det om forklaringen er en tankefeil eller noe de "
        "faktisk liker?</p>"
        "<p><b>Steg 3: stryk de andre.</b> Handler alternativet om land i det hele tatt? Ville det gitt mye eller lite "
        "utenlandsk? Senker norske aksjer risikoen for en som har lønnen sin i Norge?</p>"),
    q="<p>Norske investorer får vite at en Norge-tung aksjeportefølje gir høyere risiko og dårligere spredning enn en "
      "global. De forstår budskapet, men nesten ingen endrer porteføljen. Hvilken forklaring på hjemmebias passer best "
      "med dette?</p>",
    alternativer=[
        R("Preferanse for det kjente: de vil eie det de kjenner"),
        F("Tapsaversjon: tap veier tyngre enn like store gevinster",
          "Tapsaversjon gjelder gevinst og tap målt fra et referansepunkt. Den sier ingenting om hvilket land aksjene "
          "kommer fra."),
        F("1/N-regelen: de fordeler jevnt på aksjer fra alle land",
          "Jevn fordeling på land eller fond ville gitt mest utenlandske aksjer. En Norge-tung portefølje er det "
          "motsatte av jevn fordeling."),
        F("Rasjonell spredning: norske aksjer gir lavest risiko for nordmenn",
          "Lønnen til en nordmann samvarierer alt med norsk økonomi. Norske aksjer legger mer av den samme risikoen "
          "oppå, så de øker risikoen i formuen."),
    ],
    kort="<p><b>Preferanse for det kjente.</b> Informasjonen ble forstått, men endret ikke valget. Det peker mot en "
         "preferanse, ikke en tankefeil som informasjon kan rette.</p>",
    full="<p><b>Hva hjemmebias er.</b> Mange eier nesten bare aksjer fra eget land. Norge er bare om lag 0,2 % av "
         "verdens aksjemarked, så en Norge-tung portefølje er svært lite spredt. Lønnen din henger dessuten alt "
         "sammen med norsk økonomi.</p>"
         "<p><b>Steg 1: to mulige forklaringer.</b> Forelesningen sier at hjemmebias kan være et avvik (bias), for "
         "eksempel en 50-50-heuristikk eller at norske selskaper er lettere tilgjengelige i hodet. Den kan også være "
         "en preferanse: tilhørighet, hjemmekjærlighet, «jeg vil eie det jeg kjenner».</p>"
         "<p><b>Steg 2: hva forsøket viser.</b> Investorene forsto at en Norge-tung portefølje er mer risikabel. "
         "Likevel endret de ikke porteføljen.</p>"
         "<p><b>Steg 3: hva det betyr.</b> En tankefeil kan i prinsippet rettes med informasjon. Når informasjonen er "
         "forstått og atferden står fast, peker det mot en preferanse. Den kan ikke være feil, bare dyr.</p>"
         "<p><b>Steg 4: de andre.</b> Tapsaversjon handler om tap fra et referansepunkt, ikke om land. 1/N ville gitt "
         "mye utenlandsk. Norske aksjer øker risikoen for en nordmann, fordi de samvarierer med lønnen.</p>"
         "<p><b>Kontroll:</b> spør om personen ville endret valget med mer kunnskap. Her fikk de kunnskapen og endret "
         "ingenting. Da er en preferanse den beste forklaringen.</p>"
         "<p><b>Husk:</b> hjemmebias = bias eller preferanse for det kjente. Står den fast etter informasjon, er det en "
         "preferanse. Motgift: et globalt indeksfond som fast regel.</p>",
)

statisk(
    "psy-s22", tema="psykologi", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "Dette er den rasjonelle aksjeandelen: du skal avgjøre om hver av de to påstandene stemmer for en rasjonell "
        "investor.",
        "Merton: w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>), der μ − r<sub>f</sub> er risikopremien, σ<sup>2</sup> "
        "variansen i aksjemarkedet og γ risikoaversjonen.",
        "<p><b>Steg 1: les formelen.</b> Hvilke størrelser står i den?</p>"
        "<p><b>Steg 2: påstand I.</b> Sammenlign størrelsene i påstanden med dem i formelen.</p>"
        "<p><b>Steg 3: påstand II.</b> Endrer flere fond i menyen noen av størrelsene i formelen? Skill mellom hva en "
        "rasjonell investor gjør og hva folk faktisk gjør.</p>"
        "<p><b>Sett sammen.</b> Velg alternativet som passer med hvilke påstander som holder.</p>"),
    q="<p>Vurder to påstander om en rasjonell investor som sparer i en pensjonsordning der hun velger fondene selv.</p>"
      "<p>I. Aksjeandelen bestemmes av risikopremien, risikoen i aksjemarkedet og hennes risikoaversjon.</p>"
      "<p>II. Aksjeandelen øker når pensjonsordningen tilbyr flere aksjefond å velge mellom.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II",
          "Påstand II beskriver 1/N-regelen, en heuristikk. For en rasjonell investor endrer ikke antall fond i menyen "
          "noen av størrelsene som bestemmer aksjeandelen."),
        F("Både I og II",
          "Påstand II holder ikke for en rasjonell investor. Antall fond i menyen står ikke i Mertons formel for "
          "aksjeandelen."),
        F("Ingen av dem",
          "Mertons modell gir en aksjeandel som avhenger av bestemte størrelser. Sjekk påstand I mot formelen før du "
          "forkaster begge."),
    ],
    kort="<p><b>Bare I.</b> Mertons aksjeandel w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>) avhenger av risikopremien, "
         "variansen og risikoaversjonen. Antall fond i menyen står ikke der.</p>",
    full="<p><b>Hva teorien sier.</b> En rasjonell investor velger aksjeandelen ut fra hva hun får betalt for risikoen, "
         "hvor stor risikoen er og hvor mye hun misliker risiko. Mertons regel samler det i én formel: "
         "w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>). Her er μ − r<sub>f</sub> risikopremien, σ<sup>2</sup> variansen i "
         "aksjemarkedet og γ risikoaversjonen.</p>"
         "<p><b>Påstand I.</b> Stemmer. De tre størrelsene er nettopp det som står i formelen.</p>"
         "<p><b>Påstand II.</b> Stemmer ikke for en rasjonell investor. Flere aksjefond i menyen endrer verken "
         "risikopremien, risikoen eller risikoaversjonen. Hun kan få akkurat den aksjeandelen hun vil ha med ett "
         "aksjefond og ett rentefond.</p>"
         "<p><b>Hva folk faktisk gjør.</b> I virkeligheten stiger aksjeandelen ofte med antall aksjefond. Det skyldes "
         "heuristikker: med 1/N-regelen fordeler folk jevnt på fondene, så aksjeandelen blir omtrent andelen "
         "aksjefond i menyen. Påstand II beskriver altså atferd, ikke rasjonalitet.</p>"
         "<p><b>Kontroll:</b> regn med eksempeltall. Risikopremie 0,05, varians 0,04 og γ = 2 gir "
         "w* = 0,05/(2 × 0,04) = 62,5 %. Formelen har ingen plass for antall fond, så svaret er det samme med to fond "
         "som med tjue.</p>"
         "<p><b>Husk:</b> rasjonell aksjeandel = risikopremie, risiko og risikoaversjon. Styrer menyen andelen, er det "
         "en heuristikk.</p>",
)
