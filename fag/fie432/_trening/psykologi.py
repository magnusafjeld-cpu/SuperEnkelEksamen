# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «psykologi»: finansiell psykologi. Manualkapittel 18,
   kjernepensum kj11 (psykologidelen). Sparevalget med ln-nytte, subjektive
   sannsynligheter og tapsvekt i 18.2 (R15) er ikke med her; det ligger hos
   porteføljetemaet. Temaet er stort sett begreper. De to regnefamiliene er
   skattekostnaden ved disposisjonseffekten (18.3) og eksponentiell vekst (18.4).
"""
from trening_lib import *  # noqa: F401,F403

# Hjelpen bak «Hjelp»-knappen: fremgangsmåten uten tallene i spørsmålet og uten svaret.
HJELP = {
    "psy-dsp1-forskjell":
        "<p><b>Steg 1: de to resultatene.</b> Salgsverdi minus kjøpspris for hver post. Den ene gir gevinst, den andre "
        "tap.</p>"
        "<p><b>Steg 2: selg vinneren.</b> Gevinsten skattlegges med 37,84 % (1,72 × 22 %).</p>"
        "<p><b>Steg 3: selg taperen.</b> Tapet gir fradrag med samme sats, altså lavere skatt.</p>"
        "<p><b>Steg 4: forskjellen.</b> Skatten du slipper pluss fradraget du får: (gevinst + tap) × 37,84 %.</p>"
        "<p><b>Pass på:</b> tapet oppjusteres akkurat som en gevinst. 37,84 % har oppjusteringen i seg, så gang ikke "
        "med 1,72 én gang til.</p>",
    "psy-dsp1-vinner":
        "<p><b>Steg 1: gevinsten.</b> Salgsverdi minus kjøpspris for posten som har steget.</p>"
        "<p><b>Steg 2: skatten.</b> Gevinsten × 37,84 % (1,72 × 22 %).</p>"
        "<p><b>Steg 3: igjen etter skatt.</b> Salgsverdien minus skatten.</p>"
        "<p><b>Pass på:</b> bare gevinsten skattlegges, ikke hele salgssummen. Glem ikke oppjusteringen.</p>",
    "psy-dsp1-taper":
        "<p><b>Steg 1: tapet.</b> Kjøpspris minus salgsverdi for posten som har falt.</p>"
        "<p><b>Steg 2: fradraget.</b> Tapet × 37,84 % (1,72 × 22 %) i lavere skatt, så lenge det finnes annen inntekt "
        "å trekke det fra.</p>"
        "<p><b>Steg 3: igjen etter skatt.</b> Salgsverdien pluss skattebesparelsen.</p>"
        "<p><b>Pass på:</b> et tap gir lavere skatt, ikke høyere. Tap på aksjer oppjusteres med 1,72, akkurat som "
        "gevinster.</p>",
    "psy-eks1-gjeld":
        "<p><b>Steg 1: vekstfaktoren.</b> (1 + r) opphøyd i antall år.</p>"
        "<p><b>Steg 2: gjelden.</b> Startgjelden × vekstfaktoren.</p>"
        "<p><b>Kontroll med doblinger:</b> finn hvor mange år det tar å doble gjelden ved renten. Antall doblinger i "
        "perioden gir omtrent samme faktor.</p>"
        "<p><b>Pass på:</b> enkel rente, der du legger til samme rentebeløp hvert år, gir for lite. Å gange rentefaktoren "
        "med antall år i stedet for å opphøye er en annen vanlig feil. Spørsmålet gjelder hele gjelden, ikke bare "
        "rentene.</p>",
    "psy-eks1-sparing":
        "<p><b>Steg 1: vekstfaktoren.</b> (1 + r) opphøyd i antall år.</p>"
        "<p><b>Steg 2: sluttverdifaktoren.</b> (vekstfaktoren − 1)/r.</p>"
        "<p><b>Steg 3: sluttverdien.</b> Det årlige innskuddet × sluttverdifaktoren.</p>"
        "<p><b>Kontroll:</b> nåverdien av innskuddene ganget med vekstfaktoren skal gi det samme.</p>"
        "<p><b>Pass på:</b> innskuddene settes inn ved utgangen av hvert år, så det siste får ingen avkastning. Å "
        "forrente alt som om det ble satt inn på dag én gir for mye.</p>",

    "psy-s01":
        '<p>Kjenn igjen de fire avvikene: overkonfidens, flokkatferd, forankring og tapsaversjon.</p><p><b>Steg 1:</b> skriv én setning om hva som driver hvert av dem: egen vurdering, andres handlinger, et tall eller frykt for tap.</p><p><b>Steg 2:</b> plasser hvert alternativ på ett av avvikene.</p><p><b>Steg 3:</b> se på hvilket alternativ som hører til overkonfidens og hva avviket fører til.</p>',
    "psy-s02":
        '<p>Markedsavkastningen er snittet av alle investorer før kostnader.</p><p><b>Steg 1:</b> hvis personen velger aksjer like godt som snittet, hva får han før kostnader?</p><p><b>Steg 2:</b> hva koster det å handle ofte?</p><p><b>Steg 3:</b> test hver forklaring. Stemmer den med de norske skattereglene, med sammenhengen mellom risiko og avkastning og med det oppgaven sier om ferdighetene hans?</p>',
    "psy-s03":
        '<p>Tenk på hele formuen. Humankapitalen er ofte den største posten for en arbeidstaker.</p><p><b>Steg 1:</b> hvilke risikoer påvirker lønnen og jobben hans?</p><p><b>Steg 2:</b> hvilke risikoer påvirker aksjene han eier?</p><p><b>Steg 3:</b> trekker de i samme eller motsatt retning når bransjen får problemer? Sjekk til slutt om hvert alternativ er en riktig påstand om kostnader, avkastning og preferanser.</p>',
    "psy-s04":
        "<p><b>Steg 1: avviket.</b> Merkes pengene etter formål i stedet for å telles som én formue? Det har et eget "
        "navn.</p>"
        "<p><b>Steg 2: kostnaden.</b> Renteinntekt etter skatt er rente × (1 − 22 %). Renteutgift etter fradrag er "
        "rente × (1 − 22 %). Forskjellen ganger beløpet er det hun taper i året.</p>"
        "<p><b>Pass på:</b> skatten treffer begge rentene. Tapsaversjon er noe annet: tap som veier tyngre enn "
        "gevinster.</p>",
    "psy-s05":
        "<p><b>Skill tre ting.</b> Risikoaversjon kommer av en konkav nytte av hele formuen. Tapsaversjon måles fra et "
        "referansepunkt. Disposisjonseffekten er en atferd som bygger på tapsaversjon.</p>"
        "<p><b>Steg 1.</b> Spør for hvert alternativ: er det en definisjon eller en følge?</p>"
        "<p><b>Steg 2.</b> Spør om valget ville endret seg hvis referansepunktet flyttet seg. Det skiller tapsaversjon "
        "fra vanlig risikoaversjon.</p>",
    "psy-s06":
        '<p>Skill feilslutninger fra preferanser. En feilslutning kan i prinsippet rettes med informasjon. En preferanse er det du faktisk liker. Den kan ikke være feil, bare dyr.</p><p><b>Steg 1:</b> hvis informasjon ikke endrer atferden, hvilke verktøy har du da?</p><p><b>Steg 2:</b> hvilke av forelesningens praktiske regler virker uten at du må endre hva du liker?</p><p><b>Steg 3:</b> kan en preferanse koste penger?</p>',
    "psy-s07":
        '<p>Intuisjon er god når den er trent.</p><p><b>Steg 1:</b> hva krever slik trening? Tenk på antall like situasjoner og hvor raskt du får vite om du tok feil.</p><p><b>Steg 2:</b> spør for hvert alternativ om situasjonen gir slik trening. Er utfallet forutsigbart ut fra det personen ser?</p><p><b>Steg 3:</b> vær skeptisk til påstander om at intuisjon alltid eller aldri virker.</p>',
    "psy-s08":
        '<p>Koble hver regel til valget den fjerner.</p><p><b>Steg 1:</b> når slår forankring og flokkatferd til? Tenk på hva som styrer når du kjøper og selger.</p><p><b>Steg 2:</b> for hver regel i alternativene, spør hvilket valg den tar fra deg.</p><p><b>Steg 3:</b> sjekk at regelen faktisk er en av forelesningens regler. Velg regelen som fjerner akkurat det valget avvikene virker gjennom.</p>',
    "psy-s09":
        '<p>Finn ut hva som styrer budet.</p><p><b>Steg 1:</b> hvilket tall så han først? Ligger budene nær det eller nær taksten?</p><p><b>Steg 2:</b> spør hva hvert avvik krever. Følger han andre? Stoler han på egen analyse? Frykter han et tap? Trekkes vurderingen mot et oppgitt tall?</p><p><b>Steg 3:</b> velg avviket som passer med det oppgaven beskriver.</p>',
    "psy-s10":
        '<p>Spør hva som bør avgjøre om du beholder en aksje.</p><p><b>Steg 1:</b> tankeforsøk. To personer eier samme aksje til samme kurs i dag. Den ene kjøpte billig, den andre dyrt. Har de grunn til å velge ulikt?</p><p><b>Steg 2:</b> hva betyr det for kjøpskursens rolle?</p><p><b>Steg 3:</b> test hvert alternativ mot skattereglene for tap og mot det teorien sier om kursutvikling.</p>',
    "psy-s11":
        "<p><b>Forelesningens fire regler.</b> Globalt indeksfond, automatisk månedlig sparing, innlåsing i IPS og "
        "tjenestepensjon og en skriftlig plan.</p>"
        "<p><b>Steg 1.</b> For hver regel: hvilket valg fjerner den? Aksjevalget, tidspunktet, muligheten til å bruke "
        "pengene eller fristelsen til å improvisere?</p>"
        "<p><b>Steg 2.</b> Hvilke avvik virker gjennom akkurat det valget?</p>"
        "<p><b>Pass på:</b> finansundervisning er ikke en av reglene.</p>",
    "psy-s12":
        '<p>Teorien sier at aksjer har en positiv risikopremie.</p><p><b>Steg 1:</b> hvordan ser en jevn nyttefunksjon ut over et svært lite intervall?</p><p><b>Steg 2:</b> hvor mye betyr risikoaversjon da for en liten aksjepost? Hva burde personen gjøre?</p><p><b>Steg 3:</b> sammenlign med at mange eier null aksjer. Sjekk også hvert alternativ mot fakta om avkastning og skatt.</p>',
    "psy-s13":
        '<p>Tenk på mange vurderinger av samme sak.</p><p><b>Steg 1:</b> bommer de samme vei, eller spriker de?</p><p><b>Steg 2:</b> hva skjer med gjennomsnittet av vurderingene i hvert tilfelle? Jevner feilen seg ut?</p><p><b>Steg 3:</b> hvilken feiltype kalles avvik og hvilken kalles støy? Sjekk at alternativet bruker begrepene riktig vei og ikke blander inn preferanser eller markedet.</p>',
    "psy-s14":
        "<p><b>Verdifunksjonens tre egenskaper.</b> Et referansepunkt, en knekk i referansepunktet og avtakende "
        "følsomhet.</p>"
        "<p><b>Påstand I:</b> måles nytten fra et referansepunkt eller fra formuens nivå?</p>"
        "<p><b>Påstand II:</b> er kurven brattere for tap eller for gevinster rett ved referansepunktet?</p>"
        "<p><b>Sett sammen.</b> Velg alternativet som passer med hvilke påstander som holder.</p>",
    "psy-s15":
        '<p>Les forsøket nøye.</p><p><b>Steg 1:</b> hva ble målt, kundenes valg eller fondenes avkastning?</p><p><b>Steg 2:</b> endret valgene seg? Hvor mye, relativt og i prosentpoeng?</p><p><b>Steg 3:</b> var informasjonen konkret eller generell?</p><p><b>Steg 4:</b> hva kan forsøket si noe om? Hva ble ikke testet?</p>',
    "psy-s16":
        '<p>Spør hvordan intuisjonen framskriver vekst.</p><p><b>Steg 1:</b> legger den til samme beløp hvert år, eller lar den veksten tilta?</p><p><b>Steg 2:</b> med renters rente vokser beløp raskere enn lineært. Hvilken vei bommer da intuisjonen?</p><p><b>Steg 3:</b> gjelder dette bare sparing, bare gjeld eller begge? Tenk på et lån som får stå urørt.</p>',
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
          "Det er flokkatferd. Overkonfidens er at du stoler for mye på din egen vurdering."),
        F("Du lar kjøpskursen styre hva du mener aksjen egentlig er verdt i dag",
          "Det er forankring. Det første tallet du så, styrer vurderingen."),
        F("Du lar et tap veie tyngre enn en gevinst av samme størrelse",
          "Det er tapsaversjon, en preferanse. Overkonfidens er en feilslutning om hva du vet."),
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
          "Risiko gir høyere forventet avkastning, ikke lavere. Problemet er kostnadene ved å handle."),
        F("Den som handler ofte, kjøper alltid på topp og selger alltid på bunn",
          "Det er en påstand om flokkatferd. Her velger Jonas like godt som snittet, men betaler mer for å velge."),
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
          "Argumentet handler ikke om at norske selskaper er dårlige. Det handler om samvariasjon med lønnen hans."),
        F("Hjemmebias er en preferanse, så den er alltid feil og må fjernes",
          "En preferanse kan ikke være feil, bare dyr. Poenget er hva den koster i risiko."),
        F("Norske aksjer er dyrere å handle, så kurtasjen spiser avkastningen",
          "Kostnadene er ikke hovedargumentet. Det er at porteføljen og jobben faller samtidig."),
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
          "Riktig avvik, men skatten er glemt. Etter skatt er renteforskjellen 11 % × 0,78 = 8,58 %."),
        F("Tapsaversjon, som koster kr 8 580 i året",
          "Riktig kostnad, feil avvik. Tapsaversjon er at tap veier tyngre enn gevinster. Her merkes penger etter formål."),
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
          "Det er vanlig risikoaversjon, en konkav nyttefunksjon av formuen. Tapsaversjon måles fra et referansepunkt."),
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
          "Informasjon kan rette en feilslutning. En preferanse er ikke en tankefeil, så informasjon biter ikke."),
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
          "Det er forelesningens eksempel på det motsatte. Dagens kurs er ingen valid ledetråd om framtidig kurs."),
        F("Når valget er stort og sjeldent, som kjøp av bolig eller valg av pensjon",
          "Store, sjeldne valg gir lite erfaring å bygge magefølelsen på. Der trengs system 2."),
        F("Aldri, fordi system 1 per definisjon tar irrasjonelle beslutninger",
          "Magefølelsen er ofte god. Den feiler der ledetrådene ikke er valide."),
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
          "Det står ingenting om hva de andre gjør. Det er prisantydningen som styrer ham."),
        F("Overkonfidens: han tror han vet mer enn takstmannen gjør",
          "Han tror ikke på egen analyse. Han lener seg på et tall han har fått oppgitt."),
        F("Tapsaversjon: han frykter å tape budrunden mer enn han ønsker å vinne",
          "Tapsaversjon måles fra et referansepunkt i formuen. Her er det et tall som styrer verdsettingen."),
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
          "Begrepene er byttet om. Bias er systematisk, støy er tilfeldig."),
        F("Et avvik gjelder enkeltpersoner. Støy gjelder bare hele markedet.",
          "Begge gjelder enkeltpersoners vurderinger. Forskjellen er om feilen har en retning."),
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
        F("Bare I", "Påstand I er gal: verdifunksjonen måler fra et referansepunkt. Påstand II er riktig."),
        R("Bare II"),
        F("Både I og II", "Påstand I er gal. Det som skiller verdifunksjonen fra vanlig nytte, er nettopp referansepunktet."),
        F("Ingen av dem", "Påstand II er riktig: knekken i referansepunktet er tapsaversjonen."),
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
          "Indeksandelen økte med drøyt en tredjedel relativt. Effekten varte. Informasjon virket."),
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
          "Retningen er snudd. Intuisjonen legger til et fast beløp per år og undervurderer veksten."),
        F("Du tror at høy avkastning i fjor betyr høy avkastning også i år",
          "Det er å lese fortiden som signal om framtiden, ikke en feil i hvordan vekst framskrives."),
        F("Du vurderer gjeld riktig, men undervurderer hvor mye sparing vokser",
          "Feilen gjelder begge veier. Gjeld som får stå, vokser like eksponentielt som sparing."),
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
