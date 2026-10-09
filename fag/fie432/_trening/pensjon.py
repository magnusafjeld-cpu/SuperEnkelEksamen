# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «pensjon»: folketrygdens beholdning og delingstall,
   tjenestepensjon (innskudd mot ytelse, OTP) og IPS og BSU. Manualkapittel 15,
   kjernepensum kj9. Regnerutinen er R19 i eksamens-DNA-en.
"""
from trening_lib import *  # noqa: F401,F403

# Hjelpen bak «Hjelp»-knappen: fremgangsmåten uten tallene i spørsmålet og uten svaret.
HJELP = {
    "pen-beh1-slutt":
        "<p><b>Steg 1: reguler først.</b> Gang beholdningen ved inngangen til året med (1 + lønnsveksten).</p>"
        "<p><b>Steg 2: årets opptjening.</b> Regn 7,1 G med årets G. Opptjeningen er 18,1 % av den laveste av "
        "inntekten og 7,1 G.</p>"
        "<p><b>Steg 3: legg sammen.</b> Regulert beholdning pluss opptjeningen.</p>"
        "<p><b>Pass på:</b> rekkefølgen. Årets opptjening skal ikke reguleres. Sjekk også om lønnen er over eller "
        "under taket før du ganger.</p>",
    "pen-beh1-okning":
        "<p><b>Steg 1: reguleringen.</b> Beholdningen ved inngangen til året ganget med lønnsveksten. Det er den ene "
        "delen av økningen.</p>"
        "<p><b>Steg 2: årets opptjening.</b> Regn 7,1 G med årets G. Opptjeningen er 18,1 % av den laveste av "
        "inntekten og 7,1 G.</p>"
        "<p><b>Steg 3: økningen.</b> Reguleringen pluss opptjeningen.</p>"
        "<p><b>Pass på:</b> økningen er ikke bare opptjeningen. Reguleringen treffer det som lå der fra før, men ikke "
        "årets opptjening.</p>",
    "pen-beh2":
        "<p><b>Ett år om gangen.</b> Gjenta to steg for hvert år.</p>"
        "<p><b>Steg 1: reguler.</b> Gang beholdningen fra året før med (1 + årets lønnsvekst).</p>"
        "<p><b>Steg 2: legg til opptjeningen.</b> 18,1 % av den laveste av årets inntekt og 7,1 G, regnet med årets "
        "G. Taket er nytt hvert år.</p>"
        "<p><b>Steg 3: andre år.</b> Bruk beholdningen fra første år, også det som ble tjent opp. Gjenta stegene.</p>"
        "<p><b>Pass på:</b> reguler aldri årets egen opptjening. Sjekk taket hvert år for seg, fordi inntekten kan "
        "være under taket det ene året og over det andre.</p>",
    "pen-uts1":
        "<p><b>Steg 1: regelen.</b> Årlig pensjon = beholdning / delingstall. Med fast beholdning følger årsbeløpet "
        "1/delingstall.</p>"
        "<p><b>Steg 2: endringen.</b> Del delingstallet ved den planlagte alderen på delingstallet ved den nye "
        "alderen og trekk fra én. Beholdningen faller ut.</p>"
        "<p><b>Steg 3: retningen.</b> Senere uttak gir lavere delingstall og høyere årsbeløp. Tidligere uttak gir det "
        "motsatte.</p>"
        "<p><b>Pass på:</b> delingstallet er en nevner, ikke en faktor. Nøytraliteten gjelder samlet utbetaling over "
        "livet, ikke årsbeløpet.</p>",
    "pen-bre1":
        "<p><b>Steg 1: årsbeløpene.</b> Beholdningen delt på hvert av de to delingstallene.</p>"
        "<p><b>Steg 2: forspranget.</b> Den tidlige får pensjon i årene før den andre starter: antall år mellom "
        "uttaksaldrene ganget med det lave årsbeløpet.</p>"
        "<p><b>Steg 3: innhentingen.</b> Del forspranget på differansen mellom de to årsbeløpene. Det gir antall år "
        "etter den sene uttaksalderen.</p>"
        "<p><b>Steg 4: alderen.</b> Legg årene til den sene uttaksalderen.</p>"
        "<p><b>Pass på:</b> forspranget tas igjen med differansen, ikke med hele årsbeløpet. Årene legges til den sene "
        "alderen, ikke den tidlige.</p>",
    "pen-kmp1":
        "<p><b>Steg 1: hvem er over taket?</b> Sammenlign lønnen i G med 7,1 G.</p>"
        "<p><b>Steg 2: snarveien under taket.</b> Kompensasjonsgrad = 18,1 % × antall år / delingstall. Lønnen faller "
        "ut av brøken.</p>"
        "<p><b>Steg 3: over taket.</b> Gang snarveien med 7,1 / lønnen i G, fordi bare 7,1 G gir opptjening.</p>"
        "<p><b>Steg 4: delingstallet.</b> Bruk delingstallet for den alderen personene faktisk tar ut pensjonen.</p>"
        "<p><b>Pass på:</b> får du samme prosent for to ulike lønninger, har du glemt taket. Takbrøken gjelder bare "
        "den som er over taket.</p>",
    "pen-otp1-min":
        "<p><b>Steg 1: grensen.</b> Regn 12 G med oppgitt G.</p>"
        "<p><b>Steg 2: grunnlaget.</b> Den laveste av lønnen og 12 G. Kravet gjelder fra første krone.</p>"
        "<p><b>Steg 3: minimumet.</b> 2 % av grunnlaget.</p>"
        "<p><b>Pass på:</b> regelen før 2022 gjaldt bare lønn over 1 G. Den gjelder ikke lenger. Taket for OTP er "
        "12 G, ikke folketrygdens 7,1 G. Og 7 % er maksimum, ikke minimum.</p>",
    "pen-otp1-maks":
        "<p><b>Steg 1: grensene.</b> Regn 7,1 G og 12 G med oppgitt G. Bruk den laveste av lønnen og 12 G.</p>"
        "<p><b>Steg 2: grunnsatsen.</b> 7 % av hele lønnen opp til 12 G, fra første krone.</p>"
        "<p><b>Steg 3: tillegget.</b> 18,1 % av den delen av lønnen som ligger mellom 7,1 G og 12 G.</p>"
        "<p><b>Steg 4: summen.</b> Grunnsatsen pluss tillegget.</p>"
        "<p><b>Pass på:</b> tillegget gjelder bare lønnen over 7,1 G. Grunnsatsen gjelder all lønn opp til 12 G, "
        "ikke bare opp til 7,1 G.</p>",
    "pen-skf1-ips":
        "<p><b>Steg 1: taket.</b> Finn taket for IPS i det aktuelle året. Bare innskudd opp til taket gir fradrag.</p>"
        "<p><b>Steg 2: fradraget.</b> Den laveste av innskuddet og taket trekkes fra i alminnelig inntekt.</p>"
        "<p><b>Steg 3: skatteverdien.</b> Gang fradraget med 22 %.</p>"
        "<p><b>Pass på:</b> marginalskatten på lønn er uten betydning. Trygdeavgift og trinnskatt påvirkes ikke av "
        "fradrag i alminnelig inntekt. Bland ikke inn BSU-regelen med fradrag rett i skatten.</p>",
    "pen-skf1-bsu":
        "<p><b>Steg 1: vilkårene.</b> Sjekk alderen (til og med året du fyller 33) og om personen eier bolig. Er et "
        "vilkår brutt, er fradraget null.</p>"
        "<p><b>Steg 2: grunnlaget.</b> Den laveste av årets sparing og taket per år.</p>"
        "<p><b>Steg 3: fradraget.</b> 10 % av grunnlaget, trukket rett fra skatten.</p>"
        "<p><b>Pass på:</b> BSU gir fradrag i skatten, ikke i inntekten, så 22 % og marginalskatten brukes ikke. "
        "Maksimalt fradrag gjelder bare når sparingen når taket.</p>",
    "pen-ips2-netto":
        "<p><b>Steg 1: kontoverdien.</b> Hele innskuddet vokser uten skatt underveis: innskudd × vekstfaktoren.</p>"
        "<p><b>Steg 2: skatten ved uttak.</b> Avgjør hva slags inntekt IPS-uttak er. Bruk den satsen på hele "
        "uttaket.</p>"
        "<p><b>Steg 3: netto.</b> Kontoverdien minus skatten.</p>"
        "<p><b>Kontroll:</b> flytt (1 − 22 %) til starten. Ditt eget utlegg etter fradraget ganger vekstfaktoren skal "
        "gi samme netto.</p>"
        "<p><b>Pass på:</b> IPS-uttak er alminnelig inntekt, ikke aksjegevinst og ikke pensjonsinntekt. Hele uttaket "
        "skattlegges, ikke bare avkastningen.</p>",
    "pen-ips2-skatt":
        "<p><b>Steg 1: kontoverdien.</b> Innskuddet ganget med vekstfaktoren. Ingen skatt underveis.</p>"
        "<p><b>Steg 2: hva slags inntekt?</b> IPS-uttak skattlegges som alminnelig inntekt med 22 %. Det er verken "
        "aksjegevinst eller pensjonsinntekt.</p>"
        "<p><b>Steg 3: skatten.</b> 22 % av hele kontoverdien.</p>"
        "<p><b>Kontroll:</b> statens 22 % av innskuddet har vokst med samme faktor. Det skal gi samme skatt.</p>"
        "<p><b>Pass på:</b> innskuddet ga fradrag, så hele uttaket er skattepliktig, ikke bare avkastningen. "
        "Trygdeavgift kommer ikke i tillegg.</p>",

    "pen-s01":
        "<p><b>Regelen.</b> Årlig pensjon = beholdning / delingstall. Delingstallet er tilnærmet forventet "
        "gjenstående leveår ved uttaksalderen.</p>"
        "<p><b>Resonnementet.</b> Har en eldre person flere eller færre forventede leveår igjen enn en yngre? Hva skjer "
        "da med nevneren? Hva skjer med brøken når telleren står fast?</p>"
        "<p><b>Stryk de gale.</b> Med fast teller kan ikke nevneren og brøken bevege seg i samme retning. Det stryker "
        "to alternativer med en gang.</p>"
        "<p><b>Pass på:</b> ikke bland inn levealdersjusteringen, som gjelder sammenligning mellom kull.</p>",
    "pen-s02":
        "<p><b>Hva justeringen gjør.</b> Delingstallet settes ut fra forventet levealder i hvert kull. Spør: lever "
        "yngre kull lenger eller kortere enn eldre?</p>"
        "<p><b>Steg 1: delingstallet.</b> Flere forventede leveår ved uttak betyr et høyere eller lavere "
        "delingstall?</p>"
        "<p><b>Steg 2: pensjonen.</b> Årlig pensjon = beholdning / delingstall. Hva gjør en endret nevner med "
        "brøken?</p>"
        "<p><b>Stryk de gale.</b> Alternativer der delingstallet og pensjonen går i samme retning, er umulige. "
        "Delingstallet avhenger av levealderen i kullet, ikke av innbetalte år.</p>",
    "pen-s03":
        "<p><b>Vurder påstandene hver for seg.</b></p>"
        "<p><b>Påstand I:</b> når fastsettes delingstallet for et kull endelig? Husk alderen kullet har det året.</p>"
        "<p><b>Påstand II:</b> bruker folketrygden ulike delingstall for kvinner og menn, eller ett felles? Tenk på at "
        "ordningen deler levealdersrisikoen mellom alle i kullet.</p>"
        "<p><b>Sett sammen.</b> Velg alternativet som passer med hvilke påstander som holder.</p>",
    "pen-s04":
        '<p>Navnet på ordningen sier hva som er lovet på forhånd.</p><p><b>Steg 1:</b> i en innskuddsordning, hva vet du sikkert når du begynner? I en ytelsesordning?</p><p><b>Steg 2:</b> hvem bærer da avkastningsrisikoen i hver av dem?</p><p><b>Steg 3:</b> sjekk hvert alternativ. Stemmer påstandene om lovplikt og sektor med det du vet om OTP? Er ordningene beskrevet riktig vei?</p>',
    "pen-s05":
        '<p>I innskuddspensjon er innskuddet lovet. Den ansatte bærer avkastningsrisikoen.</p><p><b>Steg 1:</b> hvis du bærer risikoen, er det rimelig at du får påvirke den?</p><p><b>Steg 2:</b> spør for hvert alternativ om det beskriver innskudd eller ytelse.</p><p><b>Steg 3:</b> når kan midler i tjenestepensjon tas ut?</p>',
    "pen-s06":
        '<p>I ytelsespensjon er utbetalingen avtalt. I innskuddspensjon er innskuddet avtalt.</p><p><b>Steg 1:</b> hvilken form har personen? Hva er da fast?</p><p><b>Steg 2:</b> når avkastningen svikter, må noe justeres for at regnestykket skal gå opp. Hvem har gitt et løfte? Hvem har mottatt det?</p><p><b>Steg 3:</b> avhenger folketrygdens beregning av tjenestepensjonen?</p>',
    "pen-s07":
        '<p>To spørsmål: jobbytte og død.</p><p><b>Steg 1:</b> ved jobbytte får du et dokument som viser opptjent pensjon. Innskudd og ytelse gir hvert sitt dokument. Hvilket hører til personens ordning?</p><p><b>Steg 2:</b> er pensjonen en konto med en beholdning i ditt navn, eller et løfte om utbetaling så lenge du lever? Hvilken form kan arves?</p><p><b>Steg 3:</b> hvem eier opptjent tjenestepensjon?</p>',
    "pen-s08":
        '<p>Beskriv IPS med fire spørsmål. Hvordan behandles innskuddet i skatten? Skattlegges avkastningen underveis? Hvordan behandles kontoen i formuesskatten? Når og hvordan skattlegges uttaket?</p><p><b>Steg 2:</b> med samme sats inn og ut, hva er da fordelen?</p><p><b>Steg 3:</b> sjekk hvert alternativ. Gjelder fritaket bare kontoen? Kan pengene tas ut tidlig? Er ordningen blandet med en annen?</p>',
    "pen-s09":
        '<p><b>Steg 1:</b> finn inntektskategorien. Innskuddet ga fradrag i en bestemt inntektsart. Uttaket skattlegges i den samme. Er det personinntekt, alminnelig inntekt eller aksjeinntekt?</p><p><b>Steg 2:</b> hvilke skatter treffer den kategorien? Kommer trygdeavgift med?</p><p><b>Steg 3:</b> gang uttaket med satsen. Kontroll: kan skatten ha vært betalt ved innskuddet når innskuddet ga fradrag?</p>',
    "pen-s10":
        '<p>Sammenlign skatteverdien inn og ut.</p><p><b>Steg 1:</b> hvilken sats er fradraget for innskuddet verdt?</p><p><b>Steg 2:</b> hvilken sats skattlegges uttaket med? Er uttaket pensjonsinntekt med trygdeavgift?</p><p><b>Steg 3:</b> hvis satsene er like, finnes det ingen satsforskjell å tjene på. Hva er da fordelen? Tenk på tidspunktet for skatten og på hvordan kontoen behandles i formuesskatten.</p>',
    "pen-s11":
        '<p>IPS har regler både for når uttaket starter og for hvor lenge det varer.</p><p><b>Steg 1:</b> hvilken alder er tidligste start knyttet til i pensjonssystemet?</p><p><b>Steg 2:</b> hvor lenge må utbetalingen minst vare? Loven setter både et minste antall år og en alder utbetalingen må vare til.</p><p><b>Steg 3:</b> finnes det tidlig uttak mot ekstra skatt? Kan kontoen tømmes på én gang? Sjekk hvert alternativ på alle punktene.</p>',
    "pen-s12":
        '<p>Sjekk fire ting i hvert alternativ: satsen, taket per år, aldersgrensen og boligvilkåret. Satsen: gir BSU fradrag i inntekten eller direkte i skatten? Med hvilken prosent? Taket: skill BSU-taket fra IPS-taket. Alder: til og med hvilket år? Bolig: kan du få fradrag etter dagens regel når du alt eier bolig? Ett feil punkt gjør alternativet galt.</p>',
    "pen-s13":
        '<p>Spør to ting om hver ordning. Gir den fradrag i inntekten, verdt inntektsskattesatsen, eller fradrag direkte i skatten med en egen prosent? Skattlegges pengene når de tas ut?</p><p><b>Steg 2:</b> tenk på hva pengene skal brukes til i hver ordning. Hva skjer med skatten ved uttak?</p><p><b>Steg 3:</b> sjekk at kanalene ikke er byttet om i alternativet du velger.</p>',
    "pen-s14":
        "<p><b>Tre ting å sjekke.</b> Satsen, hvilken del av lønnen den gjelder og hvem kravet gjelder for.</p>"
        "<p><b>Satsen og grunnlaget.</b> OTP-minimum er 2 % opp til 12 G. Spør om det gjelder fra første krone eller "
        "over 1 G. Husk endringen i 2022.</p>"
        "<p><b>Hvem.</b> Gjelder plikten bare én av formene innskudd og ytelse?</p>"
        "<p><b>Stryk de gale.</b> 7 % er maksimal grunnsats i innskuddspensjon, ikke minimum.</p>",
    "pen-s15":
        '<p>Se etter tilleggssatsen og grensen andre steder i pensjonssystemet.</p><p><b>Steg 1:</b> hvilken opptjeningssats og hvilket tak har folketrygdens alleårsregel?</p><p><b>Steg 2:</b> hva får en person fra folketrygden for lønn over taket?</p><p><b>Steg 3:</b> hva kan da et tillegg i tjenestepensjonen være ment å gjøre? Sjekk også om satsene i alternativene stemmer med skattesystemet.</p>',
    "pen-s16":
        "<p><b>To finansieringsformer.</b> Fondert: penger settes av og investeres. Pay-as-you-go: dagens "
        "yrkesaktive betaler for dagens pensjonister.</p>"
        "<p><b>Steg 1.</b> Er pensjonsbeholdningen i folketrygden penger som er investert, eller et regnskap over en "
        "rettighet?</p>"
        "<p><b>Steg 2.</b> Setter arbeidsgiveren av penger som avkaster i tjenestepensjonen?</p>"
        "<p><b>Kontroll.</b> Hva skjer med hver ordning om børsen faller? Påvirkes den ene direkte og den andre ikke?</p>",
    "pen-s17":
        '<p>Sammenlign den gamle regelen med alleårsregelen.</p><p><b>Steg 1:</b> under regelen med beste år, teller et år med lav inntekt hvis du har nok gode år?</p><p><b>Steg 2:</b> under alleårsregelen bygges en beholdning opp hvert år. Hva skjer med beholdningen i et år med deltid?</p><p><b>Steg 3:</b> hvem tjente på den gamle regelen? Test hvert alternativ: beskriver det den nye eller den gamle regelen?</p>',
    "pen-s18":
        '<p>Ordningen er en forsikring mot å leve lenge.</p><p><b>Steg 1:</b> tenk deg at den var frivillig. Hvem har mest å tjene på å bli med? Hvem har minst?</p><p><b>Steg 2:</b> hva skjer med regnestykket for ordningen om bare én av gruppene blir med? Hva heter dette problemet i forsikringsteorien?</p><p><b>Steg 3:</b> sjekk om de andre forklaringene stemmer med fakta om folketrygden.</p>',
    "pen-s19":
        '<p>Nøytral betyr at forventet samlet utbetaling er omtrent lik for gjennomsnittspersonen i kullet, uansett uttaksalder.</p><p><b>Steg 1:</b> betyr det at valget er likegyldig for alle?</p><p><b>Steg 2:</b> hva kan skille én person fra gjennomsnittet? Hvilke personlige forhold kan gjøre tidlig eller sent uttak bedre for akkurat ham?</p><p><b>Steg 3:</b> vær skeptisk til råd som skal gjelde alle uansett situasjon.</p>',
    "pen-s20":
        '<p>Skill to faser: beholdningen før uttak og den løpende pensjonen etter.</p><p><b>Steg 1:</b> beholdningen er en rettighet, ikke penger i et fond. Hvilken vekstrate holder den i takt med de yrkesaktive?</p><p><b>Steg 2:</b> reguleres løpende pensjon på samme måte som beholdningen? Hva bestemte pensjonsreformen om dette?</p><p><b>Steg 3:</b> sjekk at fasene ikke er byttet om.</p>',
    "pen-s21":
        "<p><b>Hva formelen må gjøre.</b> To ting hvert år: regulere den gamle beholdningen og legge til årets "
        "opptjening med tak.</p>"
        "<p><b>Sjekk hvert uttrykk.</b> Er det bare den gamle beholdningen som ganges med (1 + g)? Er opptjeningen "
        "begrenset av 7,1 G med min()?</p>"
        "<p><b>Stryk de gale.</b> Et uttrykk der årets opptjening også reguleres, gir rekkefølgen feil. Et uttrykk "
        "uten min() mangler taket.</p>",
    "pen-s22":
        "<p><b>Bygg uttrykket selv.</b> Hvert år gir 18,1 % av lønnen. Fordi beholdningen reguleres med samme vekst "
        "som lønnen, er beholdningen etter n år 18,1 % × n sluttlønner.</p>"
        "<p><b>Neste steg.</b> Årlig pensjon er beholdningen delt på delingstallet D. Kompensasjonsgraden er pensjonen "
        "delt på sluttlønnen.</p>"
        "<p><b>Sjekk retningen.</b> Flere år i arbeid skal gi høyere andel. Høyere delingstall skal gi lavere andel. "
        "Stryk uttrykk der en av dem går feil vei.</p>",
}

NAVN = ["Mira", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias", "Sigrid", "Henrik",
        "Maja", "Ola", "Hanne", "Petter", "Lise", "Kristian", "Turid", "Even", "Synne", "Marius"]

# Grunnbeløpet per 1. mai og veksten i G det året (lønnsveksten beholdningen reguleres med).
G_AAR = {2024: 124_028, 2025: 130_160, 2026: 136_549}
G_VEKST = {2024: 4.56, 2025: 4.94, 2026: 4.91}


def to_navn(r):
    a = r.choice(NAVN)
    b = r.choice([n for n in NAVN if n != a])
    return a, b


def gt(x):
    """G-multiplum som tekst: 5 → «5», 7.1 → «7,1», 8.5 → «8,5»."""
    if abs(x - round(x)) < 1e-9:
        return tall(x)
    return tall(x, 1) if abs(x * 10 - round(x * 10)) < 1e-9 else tall(x, 2)


def endring(x):
    """Relativ endring som tekst: 0.2383 → «23,83 % høyere», −0.19 → «19,00 % lavere»."""
    return f"{pst(abs(x), 2)} {'høyere' if x > 0 else 'lavere'}"


# ---------------------------------------------------------------------------
# pen-beh1 · Beholdningen etter ett år: reguler først, legg til opptjeningen etterpå
# ---------------------------------------------------------------------------
@familie("pen-beh1", tema="pensjon", antall=6, tittel="Pensjonsbeholdningen etter ett år")
def _(r):
    navn = r.choice(NAVN)
    aar = r.choice([2024, 2025, 2026])
    G = G_AAR[aar]
    tak = rund(7.1 * G)
    fodt = r.randrange(1966, 1999)
    B0 = r.randrange(600_000, 3_600_001, 50_000)
    g = r.choice([3.2, 3.5, 3.8, 4.0, 4.2, 4.5, 4.8])
    over = r.random() < 0.7
    if over:
        lonn = r.randrange(int(tak // 50_000) * 50_000 + 100_000, 1_600_001, 25_000)
    else:
        lonn = r.randrange(450_000, int(tak // 50_000) * 50_000 - 49_999, 25_000)
    spor = r.choice(["slutt", "slutt", "okning"])

    grunnlag = min(lonn, tak)
    opp = rund(0.181 * grunnlag)
    regulert = B0 * (1 + g / 100)
    reg = regulert - B0
    B1 = regulert + opp
    f_reg = B0 + opp                                    # reguleringen glemt
    f_rekke = (B0 + opp) * (1 + g / 100)                # opptjeningen regulert med
    if over:
        f_tak = regulert + 0.181 * lonn                 # taket glemt
        tak_tekst = (f"Taket glemt: 18,1 % av hele lønnen, {tall(lonn)} × 18,1 % = {talla(0.181 * lonn)}. "
                     f"Inntekt over 7,1 G = {tall(tak)} gir ingen opptjening.")
    else:
        f_tak = regulert + rund(0.181 * tak)            # taket brukt som om alle fikk maksimal opptjening
        tak_tekst = (f"Maksimal opptjening, 18,1 % × 7,1 G = {tall(rund(0.181 * tak))}, brukt selv om lønnen "
                     f"{tall(lonn)} ligger under taket. Da teller hele lønnen, ikke taket.")

    if spor == "slutt":
        riktig, a, b, c = B1, f_reg, f_rekke, f_tak
        sporsmal_tekst = f"Hvor stor er pensjonsbeholdningen ved utgangen av {aar}?"
    else:
        riktig, a, b, c = B1 - B0, f_reg - B0, f_rekke - B0, f_tak - B0
        sporsmal_tekst = f"Hvor mye øker pensjonsbeholdningen i løpet av {aar}?"
    ulike(riktig, a, b, c, rel=0.001)

    q = (f"<p>{navn} er født i {fodt} og tjener opp alderspensjon i folketrygden etter alleårsregelen. Ved inngangen "
         f"til {aar} er pensjonsbeholdningen {kr(B0)}. I {aar} har {navn} en pensjonsgivende inntekt på {kr(lonn)}. "
         f"Grunnbeløpet er G = {kr(G)}. Hvert år legges 18,1 % av pensjonsgivende inntekt opp til 7,1 G til "
         f"beholdningen. Beholdningen reguleres med lønnsveksten. Anta at lønnsveksten er {prosent_tekst(g)} i {aar}.</p>"
         f"<p>{sporsmal_tekst}</p>")

    if spor == "slutt":
        t_reg = (f"Reguleringen glemt: {tall(B0)} + {tall(opp)}. Beholdningen skal først vokse med lønnsveksten, "
                 f"{tall(B0)} × {prosent_tekst(g)} = {talla(reg)}.")
        t_rekke = (f"Rekkefølgen snudd: ({tall(B0)} + {tall(opp)}) × {tall(1 + g / 100, 3)}. Da reguleres årets "
                   f"opptjening med et helt års lønnsvekst den ikke har hatt.")
    else:
        t_reg = (f"Bare opptjeningen, {tall(opp)}. Reguleringen av det som lå der fra før, {tall(B0)} × "
                 f"{prosent_tekst(g)} = {talla(reg)}, er også en del av økningen.")
        t_rekke = (f"Rekkefølgen snudd: ({tall(B0)} + {tall(opp)}) × {tall(1 + g / 100, 3)} − {tall(B0)}. Da "
                   f"reguleres årets opptjening med et helt års lønnsvekst den ikke har hatt.")
    alternativer = [
        R(kr(riktig), riktig),
        F(kr(a), t_reg, a),
        F(kr(b), t_rekke, b),
        F(kr(c), tak_tekst, c),
    ]

    if over:
        steg2 = (f"<p><b>Steg 2: årets opptjening, med taket.</b> 7,1 G = 7,1 × {tall(G)} = {tall(tak)}. Lønnen er "
                 f"høyere, så bare {tall(tak)} teller: 18,1 % × {tall(tak)} = <b>{tall(opp)}</b>. De "
                 f"{tall(lonn - tak)} kronene over taket gir ingenting.</p>")
        kontroll = (f"<p><b>Kontroll:</b> ingen kan tjene opp mer enn 18,1 % × 7,1 G på ett år. Her er det "
                    f"nøyaktig det: 0,181 × 7,1 × {tall(G)} = {tall(opp)}. Får du et høyere tall, har du glemt taket.</p>")
    else:
        steg2 = (f"<p><b>Steg 2: årets opptjening.</b> 7,1 G = 7,1 × {tall(G)} = {tall(tak)}. Lønnen ligger under "
                 f"taket, så hele lønnen teller: 18,1 % × {tall(lonn)} = <b>{tall(opp)}</b>.</p>")
        kontroll = (f"<p><b>Kontroll:</b> opptjeningen må ligge under maksimumet 18,1 % × {tall(tak)} = "
                    f"{tall(rund(0.181 * tak))}, siden lønnen er under taket. {tall(opp)} gjør det.</p>")

    if spor == "slutt":
        kort = (f"<p><b>{kr(riktig)}.</b> Reguler først: {tall(B0)} × {tall(1 + g / 100, 3)} = {talla(regulert)}. "
                f"Legg så til 18,1 % × {tall(grunnlag)} = {tall(opp)}.</p>")
        steg3 = (f"<p><b>Steg 3: legg sammen.</b> {talla(regulert)} + {tall(opp)} = <b>{kr(riktig)}</b>.</p>")
    else:
        kort = (f"<p><b>{kr(riktig)}.</b> Reguleringen gir {tall(B0)} × {prosent_tekst(g)} = {talla(reg)}. "
                f"Opptjeningen er 18,1 % × {tall(grunnlag)} = {tall(opp)}. Sum {kr(riktig)}.</p>")
        steg3 = (f"<p><b>Steg 3: økningen.</b> Økningen er reguleringen pluss opptjeningen: {talla(reg)} + {tall(opp)} = "
                 f"<b>{kr(riktig)}</b>. Beholdningen ved utgangen av året er {kr(B1)}.</p>")

    full = (
        f"<p><b>Hva beholdningen er.</b> For alle født fra 1963 er alderspensjonen fra folketrygden en "
        f"pensjonsbeholdning som bygges opp år for år. Hvert år legges 18,1 % av pensjonsgivende inntekt til, men "
        f"bare inntekt opp til 7,1 G teller. Det som allerede ligger i beholdningen, reguleres med lønnsveksten, så "
        f"den holder verdien målt mot lønningene. Formelen er B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + "
        f"opptjening<sub>t</sub>.</p>"
        f"<p><b>Steg 1: reguler først.</b> {tall(B0)} × {tall(1 + g / 100, 3)} = {talla(regulert)}. Reguleringen "
        f"treffer bare det som lå der ved inngangen til året.</p>"
        + steg2 + steg3 + kontroll +
        f"<p><b>Husk:</b> reguler den gamle beholdningen først, legg til 18,1 % av min(inntekt; 7,1 G) etterpå.</p>"
    )
    return sporsmal(q, alternativer, kort, full, hjelp={"slutt": HJELP["pen-beh1-slutt"], "okning": HJELP["pen-beh1-okning"]}[spor])


# ---------------------------------------------------------------------------
# pen-beh2 · Beholdningen over to år
# ---------------------------------------------------------------------------
@familie("pen-beh2", tema="pensjon", antall=5, tittel="Pensjonsbeholdningen over to år",
         hjelp=HJELP["pen-beh2"])
def _(r):
    navn = r.choice(NAVN)
    a1 = r.choice([2024, 2025])
    a2 = a1 + 1
    G1, G2 = G_AAR[a1], G_AAR[a2]
    g1, g2 = G_VEKST[a1], G_VEKST[a2]
    tak1, tak2 = rund(7.1 * G1), rund(7.1 * G2)
    B0 = r.randrange(500_000, 3_000_001, 50_000)
    profil = r.choice(["under-over", "over-over", "under-over"])
    if profil == "under-over":
        L1 = r.randrange(600_000, int(tak1 // 25_000) * 25_000 - 24_999, 25_000)
        L2 = r.randrange(int(tak2 // 25_000) * 25_000 + 50_000, 1_400_001, 25_000)
    else:
        L1 = r.randrange(int(tak1 // 25_000) * 25_000 + 50_000, 1_300_001, 25_000)
        L2 = r.randrange(max(L1, int(tak2 // 25_000) * 25_000 + 50_000), 1_500_001, 25_000)

    o1, o2 = rund(0.181 * min(L1, tak1)), rund(0.181 * min(L2, tak2))
    B1 = B0 * (1 + g1 / 100) + o1
    B2 = B1 * (1 + g2 / 100) + o2
    f_reg = B0 + o1 + o2
    f_tak = (B0 * (1 + g1 / 100) + 0.181 * L1) * (1 + g2 / 100) + 0.181 * L2
    f_rekke = ((B0 + o1) * (1 + g1 / 100) + o2) * (1 + g2 / 100)
    ulike(B2, f_reg, f_tak, f_rekke, rel=0.002)

    q = (f"<p>{navn} har en pensjonsbeholdning i folketrygden på {kr(B0)} ved inngangen til {a1}. Den "
         f"pensjonsgivende inntekten er {kr(L1)} i {a1} og {kr(L2)} i {a2}. Grunnbeløpet er {kr(G1)} i {a1} og "
         f"{kr(G2)} i {a2}. Hvert år legges 18,1 % av inntekten opp til 7,1 G til beholdningen. Beholdningen "
         f"reguleres hvert år med lønnsveksten før årets opptjening legges til. Lønnsveksten er "
         f"{prosent_tekst(g1, 2)} i {a1} og {prosent_tekst(g2, 2)} i {a2}.</p>"
         f"<p>Hvor stor er pensjonsbeholdningen ved utgangen av {a2}?</p>")

    if L1 > tak1:
        tak_tekst = (f"Taket glemt begge år: 18,1 % av hele inntekten. Inntekt over 7,1 G gir ingen opptjening. "
                     f"Taket er {tall(tak1)} i {a1} og {tall(tak2)} i {a2}.")
    else:
        tak_tekst = (f"Taket glemt i {a2}: 18,1 % × {tall(L2)} = {talla(0.181 * L2)}. Inntekt over 7,1 G = "
                     f"{tall(tak2)} gir ingen opptjening.")
    alternativer = [
        R(kr(B2), B2),
        F(kr(f_reg), f"Reguleringen glemt begge år: {tall(B0)} + {tall(o1)} + {tall(o2)}.", f_reg),
        F(kr(f_tak), tak_tekst, f_tak),
        F(kr(f_rekke), "Rekkefølgen snudd: årets opptjening lagt til før reguleringen, så den reguleres med et års "
                       "lønnsvekst den ikke har hatt.", f_rekke),
    ]

    def opp_tekst(L, tak, o, aar):
        if L > tak:
            return (f"I {aar} er taket 7,1 G = {tall(tak)}. Inntekten {tall(L)} er høyere, så bare taket teller: "
                    f"18,1 % × {tall(tak)} = {tall(o)}.")
        return (f"I {aar} er taket 7,1 G = {tall(tak)}. Inntekten {tall(L)} ligger under, så hele inntekten teller: "
                f"18,1 % × {tall(L)} = {tall(o)}.")

    kort = (f"<p><b>{kr(B2)}.</b> {a1}: {tall(B0)} × {tall(1 + g1 / 100, 4)} + {tall(o1)} = {talla(rund(B1, 2))}. "
            f"{a2}: {talla(rund(B1, 2))} × {tall(1 + g2 / 100, 4)} + {tall(o2)} = {kr(B2)}.</p>")
    full = (
        f"<p><b>Hva som skjer hvert år.</b> Pensjonsbeholdningen i folketrygden vokser på to måter. Det som ligger der, "
        f"reguleres med lønnsveksten. Deretter legges årets opptjening til: 18,1 % av inntekten, men bare opp til "
        f"7,1 G. Taket følger G, så det er et nytt tak hvert år. Over flere år gjentar du de to stegene, ett år om "
        f"gangen.</p>"
        f"<p><b>Steg 1: opptjeningen i {a1}.</b> {opp_tekst(L1, tak1, o1, a1)}</p>"
        f"<p><b>Steg 2: beholdningen ved utgangen av {a1}.</b> {tall(B0)} × {tall(1 + g1 / 100, 4)} + {tall(o1)} = "
        f"<b>{talla(rund(B1, 2))}</b>.</p>"
        f"<p><b>Steg 3: opptjeningen i {a2}.</b> {opp_tekst(L2, tak2, o2, a2)}</p>"
        f"<p><b>Steg 4: beholdningen ved utgangen av {a2}.</b> Reguler hele beholdningen fra steg 2, også det som ble "
        f"tjent opp i {a1}: {talla(rund(B1, 2))} × {tall(1 + g2 / 100, 4)} + {tall(o2)} = <b>{kr(B2)}</b>.</p>"
        f"<p><b>Kontroll:</b> trekk fra det som er tjent opp: {tall(B2)} − {tall(B0)} − {tall(o1)} − {tall(o2)} = "
        f"{tall(B2 - f_reg)}. Det skal være de to reguleringene, {tall(B0)} × {prosent_tekst(g1, 2)} = "
        f"{talla(rund(B0 * g1 / 100, 2))} og {talla(rund(B1, 2))} × {prosent_tekst(g2, 2)} = "
        f"{talla(rund(B1 * g2 / 100, 2))}, til sammen {tall(B0 * g1 / 100 + B1 * g2 / 100)}. Det stemmer.</p>"
        f"<p><b>Husk:</b> ett år om gangen. Reguler først, legg til 18,1 % av min(inntekt; 7,1 G) med årets G etterpå.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# pen-uts1 · Utsatt (eller tidligere) uttak: hva skjer med årlig pensjon
# ---------------------------------------------------------------------------
@familie("pen-uts1", tema="pensjon", antall=5, tittel="Utsatt uttak og delingstallet",
         hjelp=HJELP["pen-uts1"])
def _(r):
    navn = r.choice(NAVN)
    fra, til = r.choice([(62, 67), (62, 70), (63, 67), (64, 68), (65, 70), (67, 70), (67, 62), (70, 65), (68, 64)])
    # Nedre uttaksalder stiger fra 1964-kullet (63 år for 1973-kullet), så fødselsåret må passe til den laveste alderen.
    lavest = min(fra, til)
    if lavest == 62:
        fodt = 1963
    elif lavest == 63:
        fodt = r.randrange(1965, 1974)
    elif lavest == 64:
        fodt = r.randrange(1965, 1981)
    else:
        fodt = r.randrange(1965, 1991)
    # yngre kull får høyere delingstall (levealdersjusteringen)
    d62 = round(20.30 + 0.045 * (fodt - 1963) + r.choice([-0.10, -0.05, 0, 0.05, 0.10]), 2)
    helling = r.choice([0.78, 0.80, 0.82, 0.84])

    def D(x):
        return round(d62 - helling * (x - 62), 2)

    B = r.randrange(3_000_000, 7_000_001, 100_000)
    Df, Dt = D(fra), D(til)
    riktig = Df / Dt - 1                 # årlig pensjon ∝ 1/delingstall
    f_mult = Dt / Df - 1                 # delingstallet brukt som multiplikator
    f_snudd = -riktig                    # riktig størrelse, gal retning
    if abs(abs(riktig) - abs(f_mult)) < 0.01:
        raise Avvis("for like prosenter")
    lav, hoy = sorted([fra, til])

    q = (f"<p>{navn} er født i {fodt} og har en pensjonsbeholdning i folketrygden på {kr(B)}. Delingstallet for "
         f"kullet er {tall(D(lav), 2)} ved uttak som {lav}-åring og {tall(D(hoy), 2)} ved uttak som {hoy}-åring. "
         f"{navn} har planlagt å ta ut pensjonen som {fra}-åring, men vurderer å ta den ut som {til}-åring i stedet. "
         f"Hold beholdningen fast, altså se bort fra at den vokser i mellomtiden.</p>"
         f"<p>Hva skjer med den årlige alderspensjonen?</p>")

    alternativer = [
        R(f"Den blir {endring(riktig)}", riktig),
        F(f"Den blir {endring(f_mult)}", f"Delingstallet brukt som multiplikator: {tall(Dt, 2)}/{tall(Df, 2)} − 1. "
                                          f"Beholdningen deles på delingstallet, så retningen snur.", f_mult),
        F(f"Den blir {endring(f_snudd)}", f"Riktig brøk, men retningen snudd. Lavere delingstall gir høyere pensjon. "
                                           f"Her {'synker' if til > fra else 'stiger'} delingstallet.", f_snudd),
        F("Den er uendret, fordi ordningen er nøytralt utformet",
          "Nøytraliteten gjelder samlet forventet utbetaling over livet, ikke årsbeløpet. Med fast beholdning og "
          "et annet delingstall må årsbeløpet endres."),
    ]

    retning = "synker" if til > fra else "stiger"
    kort = (f"<p><b>Den blir {endring(riktig)}.</b> Årlig pensjon er beholdning/delingstall, så endringen er "
            f"{tall(Df, 2)}/{tall(Dt, 2)} − 1 = {pst(riktig, 2)}. Beholdningen faller ut.</p>")
    full = (
        f"<p><b>Hva delingstallet er.</b> Ved uttak deles pensjonsbeholdningen på et delingstall. Resultatet er den "
        f"livsvarige årlige pensjonen. Delingstallet er tilnærmet forventet gjenstående leveår ved uttaksalderen. "
        f"Tar du ut senere, er det færre år igjen å fordele beholdningen på. Delingstallet synker og årsbeløpet "
        f"stiger. Tar du ut tidligere, skjer det motsatte.</p>"
        f"<p><b>Steg 1: årlig pensjon ved {fra} år.</b> {tall(B)} / {tall(Df, 2)} = {kr(B / Df)}.</p>"
        f"<p><b>Steg 2: årlig pensjon ved {til} år.</b> {tall(B)} / {tall(Dt, 2)} = {kr(B / Dt)}. Delingstallet "
        f"{retning} fra {tall(Df, 2)} til {tall(Dt, 2)}.</p>"
        f"<p><b>Steg 3: endringen.</b> {tall(B / Dt)} / {tall(B / Df)} − 1 = <b>{pst(riktig, 2)}</b>. Beholdningen "
        f"faller ut av brøken, så det samme tallet kommer rett ut av delingstallene: {tall(Df, 2)}/{tall(Dt, 2)} − 1.</p>"
        f"<p><b>Kontroll av retningen:</b> uttak som {til}-åring er {'senere' if til > fra else 'tidligere'} enn som "
        f"{fra}-åring. Da må delingstallet {'synke' if til > fra else 'stige'} og årsbeløpet "
        f"{'stige' if til > fra else 'synke'}. Her {retning} delingstallet fra {tall(Df, 2)} til {tall(Dt, 2)}. "
        f"Årsbeløpet går fra {tall(B / Df)} til {tall(B / Dt)} ✓. Et alternativ med motsatt retning er galt uansett "
        f"hvilket tall det har.</p>"
        f"<p><b>Husk:</b> årlig pensjon = beholdning/delingstall. Delingstallet synker med uttaksalderen innenfor ett "
        f"kull, så årsbeløpet stiger når du venter.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# pen-bre1 · Når tar den som venter, igjen den som starter tidlig?
# ---------------------------------------------------------------------------
@familie("pen-bre1", tema="pensjon", antall=5, tittel="Når lønner det seg å vente med uttaket",
         hjelp=HJELP["pen-bre1"])
def _(r):
    navn = r.choice(NAVN)
    d62 = r.randrange(2040, 2161, 5) / 100
    helling = r.choice([0.78, 0.80, 0.82, 0.84, 0.86])
    a, b = r.choice([(62, 67), (63, 67), (62, 70), (64, 67), (65, 70), (62, 66), (63, 68)])
    Da, Db = round(d62 - helling * (a - 62), 2), round(d62 - helling * (b - 62), 2)
    B = r.randrange(3_000_000, 7_000_001, 100_000)
    Pa, Pb = B / Da, B / Db
    forsprang = (b - a) * Pa
    T = forsprang / (Pb - Pa)
    riktig = b + T
    f_fra_a = a + T                      # årene lagt til den tidlige uttaksalderen
    f_hele = b + forsprang / Pb          # forspranget delt på hele årsbeløpet
    f_levealder = b + Db                 # forventet levealder ved den sene uttaksalderen
    f_hoyt = b + (b - a) * Pb / (Pb - Pa)  # forspranget regnet med det høye årsbeløpet

    q = (f"<p>{navn} har en pensjonsbeholdning i folketrygden på {kr(B)} og vurderer å ta ut alderspensjonen som "
         f"{a}-åring eller som {b}-åring. Delingstallet for kullet er {tall(Da, 2)} ved uttak som {a}-åring og "
         f"{tall(Db, 2)} ved uttak som {b}-åring. Hold beholdningen fast uansett uttaksalder. Se bort fra regulering, "
         f"skatt og diskontering.</p>"
         f"<p>Ved hvilken alder har den samlede utbetalingen ved uttak som {b}-åring tatt igjen den samlede "
         f"utbetalingen ved uttak som {a}-åring? Svarene er avrundet til én desimal.</p>")

    def aar(x):
        return f"{tall(x, 1)} år"

    kandidater = [
        F(aar(f_fra_a), f"Riktig antall år, {tall(T, 2)}, men lagt til {a} i stedet for {b}. Innhentingen starter "
                        f"først når den som venter, begynner å få pensjon.", f_fra_a),
        F(aar(f_hele), f"Forspranget delt på hele årsbeløpet ved {b}, {tall(forsprang)}/{tall(Pb)}. Det spises opp "
                       f"bare med differansen {tall(Pb - Pa)} i året.", f_hele),
        F(aar(f_levealder), f"Forventet levealder ved {b} år, {b} + {tall(Db, 2)}. Der har den som venter, fått "
                            f"beholdningen tilbake. Den som tok ut tidlig, har fått mer, så kurvene har ikke krysset "
                            f"ennå.", f_levealder),
        F(aar(f_hoyt), f"Forspranget regnet med det høye årsbeløpet: {b - a} × {tall(Pb)}. I de {b - a} årene får "
                       f"den tidlige det lave beløpet, {tall(Pa)}.", f_hoyt),
    ]
    feil = r.sample(kandidater, 3)
    ulike(riktig, *[x.verdi for x in feil], rel=0.006)
    alternativer = [R(aar(riktig), riktig)] + feil

    kort = (f"<p><b>{aar(riktig)}.</b> Forspranget er {b - a} × {tall(Pa)} = {tall(forsprang)}. Det tas igjen med "
            f"{tall(Pb)} − {tall(Pa)} = {tall(Pb - Pa)} i året: {tall(T, 2)} år etter fylte {b}.</p>")
    full = (
        f"<p><b>Hva som sammenlignes.</b> Den som tar ut tidlig, får et lavere årsbeløp i flere år. Den som venter, får "
        f"et høyere årsbeløp, men starter senere. Samlet utbetalt er en rett linje for hver av dem. Den tidlige har et "
        f"forsprang. Den sene tar det igjen med differansen i årsbeløp.</p>"
        f"<p><b>Steg 1: årsbeløpene.</b> Ved {a}: {tall(B)} / {tall(Da, 2)} = {tall(Pa)}. Ved {b}: "
        f"{tall(B)} / {tall(Db, 2)} = {tall(Pb)}.</p>"
        f"<p><b>Steg 2: forspranget.</b> Den tidlige får pensjon i {b - a} år før den andre starter: "
        f"{b - a} × {tall(Pa)} = {tall(forsprang)}.</p>"
        f"<p><b>Steg 3: hvor fort det tas igjen.</b> Etter fylte {b} får den sene {tall(Pb - Pa)} mer i året. "
        f"{tall(forsprang)} / {tall(Pb - Pa)} = {tall(T, 2)} år.</p>"
        f"<p><b>Steg 4: alderen.</b> {b} + {tall(T, 2)} = <b>{aar(riktig)}</b>. Lever {navn} lenger enn det, lønte det "
        f"seg å vente.</p>"
        f"<p><b>Kontroll:</b> ved {tall(riktig, 2)} år har den tidlige fått {tall(riktig - a, 2)} × {tall(Pa)} = "
        f"{tall((riktig - a) * Pa)} og den sene {tall(riktig - b, 2)} × {tall(Pb)} = {tall((riktig - b) * Pb)}. "
        f"Like store, opp til avrunding. Beholdningen faller faktisk ut: svaret er {b} + {b - a} × "
        f"{tall(Db, 2)}/({tall(Da, 2)} − {tall(Db, 2)}).</p>"
        f"<p><b>Husk:</b> forsprang = år tidligere × det lave årsbeløpet. Del det på differansen i årsbeløp og legg til "
        f"den sene uttaksalderen.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# pen-kmp1 · Kompensasjonsgrad under og over taket
# ---------------------------------------------------------------------------
@familie("pen-kmp1", tema="pensjon", antall=5, tittel="Kompensasjonsgrad under og over taket",
         hjelp=HJELP["pen-kmp1"])
def _(r):
    lav_navn, hoy_navn = to_navn(r)
    x_lav = r.choice([3.5, 4, 4.5, 5, 5.5, 6, 6.5])
    x_hoy = r.choice([8, 8.5, 9, 9.5, 10, 11])
    n = r.choice([36, 38, 40, 42, 44])
    d62 = r.randrange(2040, 2161, 5) / 100
    helling = r.choice([0.78, 0.80, 0.82, 0.84])
    d67 = round(d62 - 5 * helling, 2)
    uttak = r.choice([67, 67, 62])
    D, D_feil = (d67, d62) if uttak == 67 else (d62, d67)
    spor_hoy = r.random() < 0.6
    navn = hoy_navn if spor_hoy else lav_navn

    k_lav = 0.181 * n / D
    k_hoy = 0.181 * 7.1 * n / (D * x_hoy)
    tak_brok = 7.1 / x_hoy
    if spor_hoy:
        riktig = k_hoy
        f1 = k_lav                                   # taket glemt
        f2 = 0.181 * 7.1 * n / (D_feil * x_hoy)      # feil delingstall
        f3 = 0.181 * n / D_feil                      # begge feil
        t1 = (f"Taket glemt: 18,1 % × {n} / {tall(D, 2)}. Uten taket faller lønnen ut av brøken. Da får {hoy_navn} "
              f"samme prosent som {lav_navn}. Bare 7,1 av {gt(x_hoy)} G gir opptjening.")
        t2 = f"Delingstallet for uttak som {62 if uttak == 67 else 67}-åring brukt. Begge tar ut som {uttak}-åringer."
        t3 = "To feil på én gang: taket glemt og feil delingstall."
    else:
        riktig = k_lav
        f1 = k_hoy                                   # takbrøken brukt for den som er under taket
        f2 = 0.181 * n / D_feil
        f3 = 0.181 * 7.1 * n / (D_feil * x_hoy)
        t1 = (f"{gen(hoy_navn)} takbrøk 7,1/{gt(x_hoy)} brukt. {lav_navn} tjener {gt(x_lav)} G og når aldri taket, så "
              f"hele lønnen gir opptjening.")
        t2 = f"Delingstallet for uttak som {62 if uttak == 67 else 67}-åring brukt. Begge tar ut som {uttak}-åringer."
        t3 = "To feil på én gang: takbrøken brukt og feil delingstall."
    ulike(riktig, f1, f2, f3, rel=0.01)

    q = (f"<p>{lav_navn} og {hoy_navn} er født samme år og har begge {n} år med pensjonsgivende inntekt. {lav_navn} har "
         f"tjent {gt(x_lav)} G hvert år, {hoy_navn} {gt(x_hoy)} G. Lønningene har fulgt lønnsveksten hele tiden. "
         f"Opptjeningen i folketrygden er 18,1 % av inntekt opp til 7,1 G. Delingstallet for kullet er "
         f"{tall(d62, 2)} ved uttak som 62-åring og {tall(d67, 2)} ved uttak som 67-åring. Begge tar ut alderspensjonen "
         f"som {uttak}-åringer.</p>"
         f"<p>Hva er kompensasjonsgraden til {navn}, altså årlig alderspensjon fra folketrygden delt på sluttlønnen?</p>")

    alternativer = [
        R(pst(riktig, 2), riktig),
        F(pst(f1, 2), t1, f1),
        F(pst(f2, 2), t2, f2),
        F(pst(f3, 2), t3, f3),
    ]

    if spor_hoy:
        kort = (f"<p><b>{pst(riktig, 2)}.</b> Bare 7,1 av {gt(x_hoy)} G teller: 18,1 % × 7,1 × {n} / "
                f"({tall(D, 2)} × {gt(x_hoy)}) = {pst(riktig, 2)}.</p>")
        steg = (f"<p><b>Steg 1: opptjening per år.</b> {hoy_navn} tjener {gt(x_hoy)} G, over taket. Opptjeningen stopper "
                f"på 18,1 % × 7,1 = 1,2851 G per år, altså 1,2851 × {n} = {tall(1.2851 * n, 3)} G etter {n} år.</p>"
                f"<p><b>Steg 2: årlig pensjon.</b> {tall(1.2851 * n, 3)} / {tall(D, 2)} = {tall(1.2851 * n / D, 4)} G.</p>"
                f"<p><b>Steg 3: kompensasjonsgraden.</b> Delt på sluttlønnen {gt(x_hoy)} G: "
                f"{tall(1.2851 * n / D, 4)} / {gt(x_hoy)} = <b>{pst(riktig, 2)}</b>.</p>"
                f"<p><b>Kontroll:</b> {lav_navn}, under taket, får 18,1 % × {n} / {tall(D, 2)} = {pst(k_lav, 2)}. "
                f"{hoy_navn} må få mindre, nøyaktig 7,1/{gt(x_hoy)} = {tall(tak_brok, 4)} av det: "
                f"{pst(k_lav, 2)} × {tall(tak_brok, 4)} = {pst(riktig, 2)}. Ser du samme prosent for begge, mangler taket.</p>")
    else:
        kort = (f"<p><b>{pst(riktig, 2)}.</b> {lav_navn} er under taket, så snarveien gjelder: 18,1 % × {n} / "
                f"{tall(D, 2)} = {pst(riktig, 2)}.</p>")
        steg = (f"<p><b>Steg 1: opptjening per år.</b> {lav_navn} tjener {gt(x_lav)} G, under taket. Hele lønnen teller: "
                f"18,1 % × {gt(x_lav)} = {tall(0.181 * x_lav, 4)} G per år, altså {tall(0.181 * x_lav * n, 3)} G etter {n} år.</p>"
                f"<p><b>Steg 2: årlig pensjon.</b> {tall(0.181 * x_lav * n, 3)} / {tall(D, 2)} = "
                f"{tall(0.181 * x_lav * n / D, 4)} G.</p>"
                f"<p><b>Steg 3: kompensasjonsgraden.</b> Delt på sluttlønnen {gt(x_lav)} G: <b>{pst(riktig, 2)}</b>. "
                f"Lønnen faller ut, så snarveien 18,1 % × {n} / {tall(D, 2)} gir det samme.</p>"
                f"<p><b>Kontroll:</b> {hoy_navn} ligger over taket og må få en lavere andel: {pst(riktig, 2)} × 7,1/{gt(x_hoy)} "
                f"= {pst(k_hoy, 2)}. Den takbrøken gjelder ikke for {lav_navn}.</p>")
    full = (
        f"<p><b>Hva kompensasjonsgraden er.</b> Kompensasjonsgraden er årlig pensjon delt på sluttlønnen: hvor stor del "
        f"av lønnen folketrygden erstatter. Når lønnen har fulgt G, er det enklest å regne i G, så faller kronebeløpene "
        f"ut. Under taket gir hver lønnskrone 18,1 øre hvert år. Snarveien er da 18,1 % × antall år / delingstall. Over "
        f"taket teller bare 7,1 G, så andelen faller med lønnen.</p>"
        + steg +
        f"<p><b>Husk:</b> kompensasjonsgrad = 18,1 % × år / delingstall under taket. Over taket ganges det med "
        f"7,1 / lønnen i G.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# pen-otp1 · OTP-minimum og maksimalt innskudd
# ---------------------------------------------------------------------------
@familie("pen-otp1", tema="pensjon", antall=5, tittel="OTP-minimum og maksimalt innskudd")
def _(r):
    navn = r.choice(NAVN)
    aar = r.choice([2024, 2025, 2026, 2026])
    G = G_AAR[aar]
    tak = rund(7.1 * G)
    tolv = 12 * G
    if r.random() < 0.7:
        lonn = r.randrange(int(tak // 25_000) * 25_000 + 50_000, int(tolv // 25_000) * 25_000 + 1, 25_000)
    else:
        lonn = r.randrange(int(tolv // 50_000) * 50_000 + 100_000, 2_200_001, 50_000)
    if abs(lonn - tolv) < 60_000 or abs(lonn - tak) < 40_000:
        raise Avvis("lønnen for nær en grense")
    spor = r.choice(["min", "maks", "maks", "maks"])
    if spor == "maks" and aar == 2026 and lonn == 1_050_000:
        raise Avvis("samme tall som gjennomregningen i kjernepensum")
    grl = min(lonn, tolv)

    if spor == "min":
        riktig = 0.02 * grl
        f1 = 0.02 * (grl - G)
        t1 = f"Den gamle regelen før 2022, 2 % bare av lønn over 1 G: 2 % × ({tall(grl)} − {tall(G)}). Nå gjelder den fra første krone."
        f2 = 0.07 * grl
        t2 = f"Maksimal grunnsats, 7 % × {tall(grl)}. Spørsmålet gjelder hva loven krever, altså minimum."
        if lonn > tolv:
            f3 = 0.02 * lonn
            t3 = f"12 G-taket glemt: 2 % × {tall(lonn)}. Lønn over 12 G = {tall(tolv)} teller ikke."
        else:
            f3 = 0.02 * tak
            t3 = f"Folketrygdens tak 7,1 G = {tall(tak)} brukt. OTP-taket er 12 G."
        sp = f"Hvor mye må arbeidsgiveren minst sette inn i tjenestepensjon for {navn} i året etter OTP-loven?"
        regel = "OTP-loven krever at arbeidsgiveren sparer minst 2 % av lønn opp til 12 G, fra første krone."
        kort = f"<p><b>{kr(riktig)}.</b> 2 % fra første krone opp til 12 G = {tall(tolv)}: 2 % × {tall(grl)} = {tall(riktig)}.</p>"
        steg = (f"<p><b>Steg 1: grunnlaget.</b> 12 G = 12 × {tall(G)} = {tall(tolv)}. "
                + (f"Lønnen {tall(lonn)} er høyere, så grunnlaget er {tall(tolv)}.</p>" if lonn > tolv
                   else f"Lønnen {tall(lonn)} er lavere, så hele lønnen teller.</p>")
                + f"<p><b>Steg 2: minimumet.</b> 2 % × {tall(grl)} = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll:</b> lønn over 12 G gir ikke mer. 2 % × {tall(tolv)} = "
                f"{tall(0.02 * tolv)} er derfor øvre grense for minimumet.</p>")
    else:
        tillegg = max(0, grl - tak)
        riktig = 0.07 * grl + 0.181 * tillegg
        f1 = 0.07 * grl
        t1 = f"Bare grunnsatsen, 7 % × {tall(grl)}. Tillegget på 18,1 % for lønn mellom 7,1 G og 12 G mangler."
        f2 = 0.07 * grl + 0.181 * grl
        t2 = f"Tillegget regnet av hele lønnen: 18,1 % × {tall(grl)}. Det gjelder bare lønnen over 7,1 G = {tall(tak)}."
        if lonn > tolv:
            f3 = 0.07 * lonn + 0.181 * (lonn - tak)
            t3 = f"12 G-taket glemt: hele lønnen {tall(lonn)} brukt. Begge satsene gjelder bare lønn opp til 12 G = {tall(tolv)}."
        else:
            f3 = 0.07 * tak + 0.181 * tillegg
            t3 = f"Grunnsatsen regnet bare opp til 7,1 G: 7 % × {tall(tak)}. De 7 % gjelder all lønn opp til 12 G."
        sp = f"Hvor mye kan arbeidsgiveren maksimalt sette inn i innskuddspensjonen til {navn} i året?"
        regel = ("Maksimalt innskudd i innskuddspensjon er 7 % av lønn opp til 12 G, pluss 18,1 % av lønnen mellom "
                 "7,1 G og 12 G.")
        kort = (f"<p><b>{kr(riktig)}.</b> 7 % × {tall(grl)} = {talla(0.07 * grl)}, pluss 18,1 % × "
                f"({tall(grl)} − {tall(tak)}) = {talla(0.181 * tillegg)}.</p>")
        steg = (f"<p><b>Steg 1: grensene.</b> 7,1 G = {tall(tak)} og 12 G = {tall(tolv)}. "
                + (f"Lønnen er over 12 G, så bare {tall(tolv)} teller.</p>" if lonn > tolv
                   else "Lønnen ligger mellom de to, så hele lønnen teller.</p>")
                + f"<p><b>Steg 2: grunnsatsen.</b> 7 % × {tall(grl)} = {talla(0.07 * grl)}.</p>"
                f"<p><b>Steg 3: tillegget over folketrygdtaket.</b> {tall(grl)} − {tall(tak)} = {tall(tillegg)}. "
                f"18,1 % × {tall(tillegg)} = {talla(0.181 * tillegg)}.</p>"
                f"<p><b>Steg 4: sum.</b> <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll:</b> del lønnen i to. De første {tall(tak)} får 7 %: {talla(0.07 * tak)}. Resten, "
                f"{tall(tillegg)}, får 7 % + 18,1 % = 25,1 %: {talla(0.251 * tillegg)}. Sum {kr(0.07 * tak + 0.251 * tillegg)}.</p>")

    ulike(riktig, f1, f2, f3, rel=0.01)
    q = (f"<p>{navn} tjener {kr(lonn)} i året i {aar}. Grunnbeløpet er G = {kr(G)}. {regel}</p><p>{sp}</p>")
    alternativer = [R(kr(riktig), riktig), F(kr(f1), t1, f1), F(kr(f2), t2, f2), F(kr(f3), t3, f3)]
    full = (
        f"<p><b>Hva reglene er.</b> Alle arbeidsgivere må ha tjenestepensjon for de ansatte (obligatorisk "
        f"tjenestepensjon, OTP). Loven krever minst 2 % av lønnen fra første krone opp til 12 G. I en innskuddsordning "
        f"kan arbeidsgiveren gå opp til 7 % av lønn opp til 12 G. I tillegg kan den spare 18,1 % av lønnen mellom 7,1 G "
        f"og 12 G. Tillegget er nøyaktig folketrygdens opptjeningssats. Det finnes fordi folketrygden ikke gir "
        f"opptjening over 7,1 G.</p>"
        + steg +
        f"<p><b>Husk:</b> minimum 2 % fra første krone opp til 12 G. Maksimum 7 % opp til 12 G pluss 18,1 % mellom "
        f"7,1 G og 12 G.</p>"
    )
    return sporsmal(q, alternativer, kort, full, hjelp={"min": HJELP["pen-otp1-min"], "maks": HJELP["pen-otp1-maks"]}[spor])


# ---------------------------------------------------------------------------
# pen-skf1 · Skattefordelen ved IPS og BSU i år
# ---------------------------------------------------------------------------
@familie("pen-skf1", tema="pensjon", antall=5, tittel="Skattefordelen ved IPS og BSU")
def _(r):
    navn = r.choice(NAVN)
    marg = r.choice([33.6, 43.3, 46.4, 47.4])
    spor = r.choice(["ips", "ips", "ips", "bsu", "bsu", "bsu_nei"])
    if spor == "ips":
        aar = r.choice([2025, 2026, 2026])
        tak = 15_000 if aar == 2025 else 25_000
        annet_tak = 25_000 if aar == 2025 else 15_000
        if aar == 2025:
            X = r.choice([18_000, 20_000, 25_000, 30_000])
        else:
            X = r.choice([16_000, 18_000, 20_000, 22_000, 24_000, 25_000, 28_000, 30_000, 35_000, 40_000])
        grl = min(X, tak)
        riktig = 0.22 * grl
        f1 = marg / 100 * grl
        t1 = (f"Marginalskatten på lønn, {prosent_tekst(marg)}, brukt. IPS gir fradrag i alminnelig inntekt. Den "
              f"skattlegges med 22 % uansett hvor høy lønnen er.")
        if X > tak:
            f2 = 0.22 * X
            t2 = f"Taket glemt: 22 % × {tall(X)}. Bare {kr(tak)} gir fradrag i {aar}."
        else:
            f2 = 0.10 * X
            t2 = "BSU-regelen, 10 % av innskuddet. IPS gir fradrag i inntekten, ikke i skatten."
        f3 = 0.22 * min(X, annet_tak)
        t3 = (f"Taket for feil år brukt: {kr(annet_tak)}. Taket var kr 15 000 til og med 2025 og er kr 25 000 fra 2026. "
              f"I {aar} er det {kr(tak)}.")
        q = (f"<p>{navn} setter inn {kr(X)} på en IPS-konto i {aar}. Innskudd på IPS gir fradrag i alminnelig inntekt "
             f"for inntil kr 15 000 i året til og med 2025 og kr 25 000 i året fra 2026. Alminnelig inntekt skattlegges "
             f"med 22 %. Marginalskatten til {navn} på lønn er {prosent_tekst(marg)}.</p>"
             f"<p>Hvor mye lavere blir skatten til {navn} for {aar} på grunn av innskuddet?</p>")
        kort = (f"<p><b>{kr(riktig)}.</b> Fradraget er {tall(grl)} i alminnelig inntekt (taket i {aar} er "
                f"{tall(tak)}), verdt 22 %: {tall(riktig)}.</p>")
        full = (
            f"<p><b>Hva IPS gir.</b> Individuell pensjonssparing (IPS) gir et fradrag i alminnelig inntekt for "
            f"innskuddet. Taket ble hevet fra kr 15 000 til kr 25 000 i året fra 2026. Alminnelig inntekt skattlegges "
            f"med 22 %, så hver fradragskrone er verdt 22 øre. Trygdeavgift og trinnskatt regnes av personinntekten. "
            f"Den blir ikke lavere. Derfor er marginalskatten på lønn uten betydning her.</p>"
            f"<p><b>Steg 1: fradraget.</b> " + (f"Taket i {aar} er {tall(tak)}. Innskuddet {tall(X)} er over taket, så "
                                                  f"fradraget er {kr(tak)}." if X > tak else
                                                  f"Taket i {aar} er {tall(tak)}. Innskuddet {tall(X)} er innenfor, så "
                                                  f"hele beløpet gir fradrag.") +
            f"</p><p><b>Steg 2: skatteverdien.</b> 22 % × {tall(grl)} = <b>{kr(riktig)}</b>.</p>"
            f"<p><b>Kontroll:</b> maksimal skattefordel i {aar} er 22 % × {tall(tak)} = {tall(0.22 * tak)}. Svaret kan "
            f"ikke være høyere.</p>"
            f"<p><b>Merk:</b> skatten er utsatt, ikke borte. Uttaket skattlegges senere som alminnelig inntekt med 22 %.</p>"
            f"<p><b>Husk:</b> IPS gir fradrag i inntekten (22 %), maks kr 25 000 fra 2026. BSU gir fradrag i skatten (10 %).</p>"
        )
    else:
        Y = r.choice([10_000, 15_000, 20_000, 25_000, 30_000, 35_000])
        grl = min(Y, 27_500)
        alder = r.randrange(21, 33)
        hindring = r.choice(["alder", "bolig"]) if spor == "bsu_nei" else None
        if hindring == "alder":
            alder = 34
        info = (f"{navn} fyller {alder} år i 2026 og eier ikke bolig." if hindring != "bolig"
                else f"{navn} fyller {alder} år i 2026 og kjøpte sin første leilighet i fjor.")
        q = (f"<p>{info} I 2026 setter {navn} inn {kr(Y)} på BSU. Reglene: skattefradraget er 10 % av årets sparing, "
             f"med maks kr 27 500 i sparing per år. Fradraget gis til og med det året du fyller 33 år. Det gis bare "
             f"til den som ikke eier bolig. Alminnelig inntekt skattlegges med 22 %. Marginalskatten til {navn} på "
             f"lønn er {prosent_tekst(marg)}.</p><p>Hvor mye lavere blir skatten til {navn} for 2026 på grunn av "
             f"BSU-sparingen?</p>")
        if hindring is None:
            riktig = 0.10 * grl
            f1 = 0.22 * grl
            t1 = "IPS-logikken brukt: 22 % av innskuddet. BSU gir 10 % fradrag direkte i skatten."
            f2 = 0.022 * grl
            t2 = "Tolket som 10 % fradrag i inntekten, verdt 22 %: 22 % × 10 % × innskuddet. Fradraget går rett i skatten."
            if Y > 27_500:
                f3 = 0.10 * Y
                t3 = f"Taket glemt: 10 % × {tall(Y)}. Bare kr 27 500 i året gir fradrag."
            else:
                f3 = 2_750
                t3 = (f"Maksimalt fradrag, 10 % × 27 500 = 2 750, brukt uansett innskudd. Fradraget er 10 % av det "
                      f"{navn} faktisk sparer, {tall(Y)}.")
            kort = f"<p><b>{kr(riktig)}.</b> BSU gir 10 % av årets sparing (inntil kr 27 500) rett i skatten: 10 % × {tall(grl)}.</p>"
            vilkar = (f"{navn} fyller {alder} år i 2026, altså 33 eller yngre. {navn} eier ikke bolig. Begge vilkårene er "
                      f"oppfylt.")
            steg2 = (f"<p><b>Steg 2: fradraget.</b> " + (f"Sparingen {tall(Y)} er over taket, så grunnlaget er 27 500. "
                                                          if Y > 27_500 else "") +
                     f"10 % × {tall(grl)} = <b>{kr(riktig)}</b>.</p>"
                     f"<p><b>Kontroll:</b> maksimalt BSU-fradrag er 10 % × 27 500 = 2 750. Svaret kan ikke være høyere.</p>")
        else:
            riktig = 0
            f1 = 0.10 * grl
            t1 = ("Vilkåret glemt. " + ("Fradraget gis bare til og med året du fyller 33." if hindring == "alder"
                                         else "Fradraget gis bare til den som ikke eier bolig."))
            f2 = 0.22 * grl
            t2 = "Vilkåret glemt og IPS-logikken brukt: 22 % av innskuddet."
            f3 = 0.022 * grl
            t3 = "Vilkåret glemt og fradraget tolket som 10 % i inntekten, verdt 22 %."
            kort = ("<p><b>kr 0.</b> " + ("Fradraget gis bare til og med året du fyller 33. " + navn +
                                           " fyller 34." if hindring == "alder"
                                           else navn + " eier bolig. Da gis ikke BSU-fradrag.") + "</p>")
            vilkar = (f"{navn} fyller 34 i 2026. Fradraget gis bare til og med det året du fyller 33."
                      if hindring == "alder" else
                      f"{navn} eier bolig. Siden 2021 gis BSU-fradraget bare til den som ikke eier bolig.")
            steg2 = (f"<p><b>Steg 2: fradraget.</b> Vilkåret er ikke oppfylt, så fradraget er <b>kr 0</b>. Ellers ville "
                     f"det vært 10 % × {tall(grl)} = {tall(0.10 * grl)}.</p>"
                     f"<p><b>Kontroll:</b> les vilkårene før du regner. Et regnestykke som ser riktig ut, hjelper ikke "
                     f"når personen ikke har rett til fradraget.</p>")
        full = (
            f"<p><b>Hva BSU gir.</b> Boligsparing for ungdom (BSU) gir et fradrag direkte i skatten: 10 % av årets "
            f"sparing, med maks kr 27 500 i sparing per år og kr 300 000 i alt. Det er ikke et fradrag i inntekten som "
            f"IPS, så 22 % og marginalskatten er uten betydning. Fradraget gis til og med året du fyller 33. Det gis bare "
            f"til den som ikke eier bolig.</p>"
            f"<p><b>Steg 1: vilkårene.</b> {vilkar}</p>"
            + steg2 +
            f"<p><b>Husk:</b> BSU = 10 % av sparingen (maks 27 500) rett i skatten. IPS = fradrag i inntekten, verdt 22 %.</p>"
        )
    ulike(riktig, f1, f2, f3, rel=0.01)
    alternativer = [R(kr(riktig), riktig), F(kr(f1), t1, f1), F(kr(f2), t2, f2), F(kr(f3), t3, f3)]
    return sporsmal(q, alternativer, kort, full, hjelp={"ips": HJELP["pen-skf1-ips"], "bsu": HJELP["pen-skf1-bsu"], "bsu_nei": HJELP["pen-skf1-bsu"]}[spor])


# ---------------------------------------------------------------------------
# pen-ips2 · IPS: hva du sitter igjen med og hva staten tar ved uttak
# ---------------------------------------------------------------------------
@familie("pen-ips2", tema="pensjon", antall=5, tittel="IPS etter skatt ved uttak")
def _(r):
    navn = r.choice(NAVN)
    X = r.choice([10_000, 12_000, 15_000, 18_000, 20_000, 25_000])
    n = r.choice([12, 15, 18, 20, 25, 30, 35])
    rp = r.choice([3, 3.5, 4, 4.5, 5, 6, 7])
    f = round((1 + rp / 100) ** n, 6)
    verdi = X * f
    spor = r.choice(["netto", "netto", "skatt"])
    if spor == "netto":
        riktig = verdi * 0.78
        kandidater = [
            (verdi * (1 - 0.3784), f"Eierskatten 37,84 % brukt på uttaket: {talla(rund(verdi, 2))} × 62,16 %. IPS-uttak er alminnelig inntekt med 22 %."),
            (verdi, "Uttaksskatten glemt. Fradraget på 22 % var en utsettelse. Staten tar de samme 22 % ved uttak."),
            (verdi * 0.78 * 0.78, "Skatten tatt to ganger: innskuddet behandlet som om det var etter skatt, men uttaket likevel skattlagt."),
            (verdi - 0.22 * (verdi - X), "Bare avkastningen skattlagt, som om innskuddet kom skattefritt ut. Hele uttaket er alminnelig inntekt."),
        ]
        sp = f"Hvor mye sitter {navn} igjen med etter skatt når hele kontoen er tatt ut?"
        kort = (f"<p><b>{kr(riktig)}.</b> Kontoen blir {tall(X)} × {tall(f, 6)} = {talla(rund(verdi, 2))}. Uttaket "
                f"skattlegges med 22 %, så netto er 78 %: {kr(riktig)}.</p>")
    else:
        riktig = verdi * 0.22
        kandidater = [
            (verdi * 0.3784, "Eierskatten 37,84 % brukt. IPS-uttak er alminnelig inntekt og skattlegges med 22 %."),
            (0.22 * (verdi - X), "Bare avkastningen skattlagt. Innskuddet ga fradrag, så hele uttaket er skattepliktig."),
            (0.22 * X, "Bare fradraget fra innskuddsåret betalt tilbake. Statens 22 % har vokst med avkastningen som dine."),
            (verdi * (0.22 + 0.051), "Trygdeavgiften på 5,1 % lagt på, som om uttaket var pensjonsinntekt. IPS-uttak er alminnelig inntekt, uten trygdeavgift."),
        ]
        sp = "Hvor mye betales i skatt av uttakene til sammen?"
        kort = (f"<p><b>{kr(riktig)}.</b> Hele uttaket er alminnelig inntekt: 22 % × {talla(rund(verdi, 2))} = "
                f"{kr(riktig)}.</p>")
    r.shuffle(kandidater)
    feil = kandidater[:3]
    ulike(riktig, *[v for v, _ in feil], rel=0.01)

    q = (f"<p>{navn} setter inn {kr(X)} på IPS og lar pengene stå i {n} år til {prosent_tekst(rp, 0 if rp == int(rp) else 1)} "
         f"årlig avkastning. Vekstfaktoren er {tall(1 + rp / 100, 2 if rp == int(rp) else 3)}<sup>{n}</sup> = "
         f"{tall(f, 6)}. Innskuddet ga fradrag i alminnelig inntekt. Satsene er 22 % skatt på alminnelig inntekt, "
         f"37,84 % effektiv eierskatt på aksjegevinst og 5,1 % trygdeavgift på pensjonsinntekt. Se bort fra "
         f"avkastning i utbetalingsperioden.</p><p>{sp}</p>")

    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), t, v) for v, t in feil]
    full = (
        f"<p><b>Hvordan IPS skattlegges.</b> Innskuddet gir fradrag i alminnelig inntekt, så 22 % kommer tilbake med "
        f"en gang. Inne på kontoen skattlegges ikke avkastningen. Kontoen er også fritatt for formuesskatt. Ved uttak "
        f"skattlegges hele beløpet som alminnelig inntekt med 22 %. Det er ikke pensjonsinntekt: ingen trygdeavgift "
        f"og ingen trinnskatt.</p>"
        f"<p><b>Steg 1: kontoverdien.</b> Hele innskuddet vokser uten løpende skatt: {tall(X)} × {tall(f, 6)} = "
        f"{talla(rund(verdi, 2))}.</p>"
        f"<p><b>Steg 2: skatten ved uttak.</b> 22 % × {talla(rund(verdi, 2))} = {talla(rund(verdi * 0.22, 2))}.</p>"
        f"<p><b>Steg 3: netto.</b> {talla(rund(verdi, 2))} − {talla(rund(verdi * 0.22, 2))} = "
        f"{talla(rund(verdi * 0.78, 2))}.</p>"
        f"<p><b>Kontroll:</b> flytt (1 − 22 %) til starten. Ditt eget utlegg etter fradraget er {tall(0.78 * X)}. "
        f"{tall(0.78 * X)} × {tall(f, 6)} = {talla(rund(0.78 * X * f, 2))}, samme netto. Statens 22 %, "
        f"{tall(0.22 * X)}, har vokst til {tall(0.22 * X)} × {tall(f, 6)} = {talla(rund(0.22 * X * f, 2))}, "
        f"nøyaktig skatten. Staten er en passiv medeier. Din egen andel avkaster skattefritt.</p>"
        f"<p><b>Husk:</b> IPS: 22 % inn, ingen skatt underveis, 22 % ut som alminnelig inntekt. Fordelen er utsatt "
        f"skatt og formuesskattefritaket, ikke en lavere sats.</p>"
    )
    return sporsmal(q, alternativer, kort, full, hjelp={"netto": HJELP["pen-ips2-netto"], "skatt": HJELP["pen-ips2-skatt"]}[spor])


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================

statisk(
    "pen-s01", hjelp=HJELP["pen-s01"], tema="pensjon", type="begrep",
    q="<p>Kari er født i 1981 og har bygd opp en pensjonsbeholdning i folketrygden. Hun vurderer å utsette uttaket "
      "av alderspensjonen fra 64 til 68 år. Hold beholdningen fast. Hva skjer med delingstallet og med den årlige "
      "pensjonen?</p>",
    alternativer=[
        R("Delingstallet synker og den årlige pensjonen øker"),
        F("Delingstallet øker og den årlige pensjonen øker",
          "Delingstallet er tilnærmet forventet gjenstående leveår ved uttak. Ved 68 er det færre år igjen enn ved 64, "
          "så det synker. Et delingstall som stiger, hører til levealdersjusteringen fra kull til kull."),
        F("Delingstallet øker og den årlige pensjonen synker",
          "Begge retningene er snudd. Med færre forventede leveår igjen synker delingstallet. En lavere nevner gir "
          "høyere årlig pensjon."),
        F("Delingstallet synker og den årlige pensjonen synker",
          "Ren brøkregning stryker denne: årlig pensjon = beholdning/delingstall. Med fast teller og lavere nevner kan "
          "ikke brøken bli mindre."),
    ],
    kort="<p><b>Delingstallet synker og den årlige pensjonen øker.</b> Delingstallet er tilnærmet forventet gjenstående "
         "leveår, som er færre ved 68 enn ved 64. Årlig pensjon = beholdning/delingstall stiger.</p>",
    full="<p><b>Hva delingstallet er.</b> Når du tar ut alderspensjon fra folketrygden, deles pensjonsbeholdningen på "
         "et delingstall. Resultatet er den årlige pensjonen, som du får livet ut. Delingstallet er omtrent det antallet "
         "år en person i kullet ventes å leve etter uttaksalderen. Det fastsettes endelig det året kullet fyller 61.</p>"
         "<p><b>Steg 1: hva skjer med delingstallet?</b> En 68-åring har færre forventede leveår igjen enn en 64-åring. "
         "Delingstallet ved 68 er derfor lavere enn ved 64. Det synker med uttaksalderen.</p>"
         "<p><b>Steg 2: hva skjer med pensjonen?</b> Årlig pensjon = beholdning/delingstall. Beholdningen holdes fast, "
         "nevneren blir mindre. Da blir brøken større. Den årlige pensjonen øker.</p>"
         "<p><b>Kontroll med to strykninger:</b> «synker og synker» er umulig med fast teller, fordi lavere nevner gir "
         "høyere brøk. «Øker og øker» er like umulig av samme grunn. Da står bare to igjen. De skiller seg bare på "
         "retningen til delingstallet.</p>"
         "<p><b>Den andre retningen:</b> delingstallet stiger fra kull til kull når levealderen øker. Det er "
         "levealdersjusteringen. Den gjelder sammenligninger mellom kull, ikke valget av uttaksalder for én person.</p>"
         "<p><b>Husk:</b> senere uttak gir lavere delingstall og høyere årlig pensjon. Yngre kull får høyere delingstall.</p>",
)

statisk(
    "pen-s02", hjelp=HJELP["pen-s02"], tema="pensjon", type="begrep",
    q="<p>Pensjonsreformen fra 2011 innførte levealdersjustering av alderspensjonen i folketrygden. Hva betyr den for "
      "en person født i 1995 sammenlignet med en person født i 1965, når begge tar ut pensjon ved 67 år med like stor "
      "beholdning målt i G? Anta at forventet levealder fortsetter å øke.</p>",
    alternativer=[
        R("Den yngste får et høyere delingstall og dermed lavere årlig pensjon"),
        F("Den yngste får et lavere delingstall, fordi hun har betalt inn i flere år",
          "Delingstallet avhenger av forventet levealder i kullet, ikke av antall år med innbetaling. Lengre levetid "
          "gir høyere delingstall."),
        F("Begge får samme delingstall, fordi det bare avhenger av uttaksalderen",
          "Delingstallet fastsettes per kull. Lever yngre kull lenger, blir delingstallet deres høyere."),
        F("Den yngste får et høyere delingstall og dermed høyere årlig pensjon",
          "Riktig om delingstallet, gal om pensjonen. Beholdningen deles på delingstallet, så et høyere delingstall "
          "gir lavere årlig pensjon."),
    ],
    kort="<p><b>Høyere delingstall og lavere årlig pensjon for den yngste.</b> Lengre forventet levetid fordeler samme "
         "beholdning på flere år.</p>",
    full="<p><b>Hva levealdersjusteringen er.</b> Folketrygden betaler pensjon så lenge du lever. Når hvert kull lever "
         "lenger enn det forrige, må den samme beholdningen fordeles på flere år. Levealdersjusteringen gjør dette "
         "automatisk: delingstallet settes ut fra forventet levealder i ditt eget kull.</p>"
         "<p><b>Steg 1: delingstallet.</b> Personen født i 1995 ventes å leve lenger enn personen født i 1965. Ved 67 "
         "har hun derfor flere forventede leveår igjen. Delingstallet blir høyere.</p>"
         "<p><b>Steg 2: pensjonen.</b> Årlig pensjon = beholdning/delingstall. Samme beholdning delt på et høyere tall "
         "gir lavere årlig pensjon.</p>"
         "<p><b>Steg 3: konsekvensen.</b> Vil den yngste ha like høy årlig pensjon, må hun jobbe lenger eller ta ut "
         "senere. Det er hele hensikten med reformen: å holde utgiftene i takt med levealderen.</p>"
         "<p><b>Kontroll:</b> samme beholdning og høyere delingstall må gi lavere årlig pensjon. Et alternativ som "
         "kombinerer høyere delingstall med høyere pensjon, er derfor umulig uansett tall.</p>"
         "<p><b>Husk:</b> delingstallet synker med uttaksalderen innenfor et kull, men stiger fra kull til kull når "
         "levealderen øker.</p>",
)

statisk(
    "pen-s03", hjelp=HJELP["pen-s03"], tema="pensjon", type="paastand", rekkefolge="fast",
    q="<p>Vurder to påstander om delingstallet i folketrygdens alderspensjon.</p>"
      "<p>I. Delingstallet fastsettes endelig det året årskullet fyller 61 år.</p>"
      "<p>II. Kvinner har høyere delingstall enn menn i samme kull, fordi de i snitt lever lenger.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "Påstand I er riktig. Påstand II er gal: delingstallet er felles for kvinner og menn."),
        F("Både I og II", "Påstand II er gal. Delingstallet er det samme for kvinner og menn i ett kull."),
        F("Ingen av dem", "Påstand I er riktig: delingstallet fastsettes endelig når kullet fyller 61."),
    ],
    kort="<p><b>Bare I.</b> Delingstallet fastsettes når kullet fyller 61 år og er felles for kvinner og menn.</p>",
    full="<p><b>Hva delingstallet er.</b> Delingstallet er tilnærmet forventet antall gjenstående leveår ved "
         "uttaksalderen. Pensjonsbeholdningen deles på det. Resultatet er den årlige pensjonen.</p>"
         "<p><b>Påstand I.</b> Delingstallet for et kull fastsettes endelig det året kullet fyller 61. Før det vet du "
         "bare et prognosetall. Påstanden er riktig.</p>"
         "<p><b>Påstand II.</b> Kvinner lever i snitt lenger enn menn. Folketrygden bruker likevel ett felles "
         "delingstall for begge kjønn i samme kull. Det betyr at kvinner i snitt får utbetalt mer over livet enn menn "
         "med samme beholdning. Påstanden er gal.</p>"
         "<p><b>Kontroll:</b> ville separate delingstall vært forenlig med en obligatorisk folketrygd? Ordningen deler "
         "levealdersrisikoen mellom alle i kullet. De som lever lenge, får mer enn beholdningen, betalt av dem som dør "
         "tidlig. Kjønn er bare én av mange kilder til ulik levealder. Ingen av dem brukes.</p>"
         "<p><b>Husk:</b> delingstallet fastsettes ved 61, er felles for kvinner og menn og synker med uttaksalderen.</p>",
)

statisk(
    "pen-s04", hjelp=HJELP["pen-s04"], tema="pensjon", type="begrep",
    q="<p>Hva er hovedforskjellen mellom innskuddspensjon og ytelsespensjon i en tjenestepensjonsordning?</p>",
    alternativer=[
        R("Ved innskuddspensjon er innskuddet avtalt. Ved ytelsespensjon er utbetalingen avtalt."),
        F("Ved innskuddspensjon er utbetalingen avtalt. Ved ytelsespensjon er innskuddet avtalt.",
          "Ordningene er byttet om. Navnet sier hva som er avtalt: innskuddet i innskuddspensjon, ytelsen i "
          "ytelsespensjon."),
        F("Innskuddspensjon er frivillig for arbeidsgiveren. Ytelsespensjon er lovpålagt.",
          "OTP er obligatorisk uansett form. Arbeidsgiveren velger formen, men må ha en ordning."),
        F("Innskuddspensjon finnes i privat sektor. Ytelsespensjon finnes bare i offentlig.",
          "Begge formene finnes i begge sektorer. Innskudd er vanligst i privat sektor, men det er ikke en regel."),
    ],
    kort="<p><b>Hva som er avtalt.</b> Innskuddspensjon lover innskuddet, ytelsespensjon lover utbetalingen. Den som "
         "ikke har fått noe avtalt, bærer risikoen.</p>",
    full="<p><b>Hva tjenestepensjon er.</b> Tjenestepensjon er pensjonen arbeidsgiveren sparer til deg i tillegg til "
         "folketrygden. Alle arbeidsgivere må ha en ordning (obligatorisk tjenestepensjon, OTP), men de kan velge "
         "mellom to hovedformer.</p>"
         "<p><b>Innskuddspensjon.</b> Arbeidsgiveren lover å sette inn et bestemt beløp hvert år, for eksempel 5 % av "
         "lønnen. Hvor stor pensjonen blir, avhenger av avkastningen. Du bærer risikoen og velger selv risikoprofil.</p>"
         "<p><b>Ytelsespensjon.</b> Arbeidsgiveren lover en bestemt utbetaling, for eksempel 66 % av sluttlønnen "
         "inkludert folketrygden. Gir midlene for lav avkastning, må arbeidsgiveren skyte inn mer. Arbeidsgiveren bærer "
         "risikoen.</p>"
         "<p><b>Regelen som løser alle slike spørsmål:</b> den som ikke har fått noe lovet, bærer risikoen. Beskriver "
         "et alternativ den ene ordningen med den andres egenskaper, er det galt.</p>"
         "<p><b>Kontroll mot de to andre feilene:</b> OTP er lovpålagt uansett form, så «frivillig mot lovpålagt» "
         "faller. Begge formene finnes i begge sektorer, så «privat mot offentlig» faller også.</p>"
         "<p><b>Husk:</b> innskudd = innskuddet avtalt, du bærer risikoen. Ytelse = utbetalingen avtalt, arbeidsgiveren "
         "bærer risikoen.</p>",
)

statisk(
    "pen-s05", hjelp=HJELP["pen-s05"], tema="pensjon", type="paastand",
    q="<p>Hvilken påstand om innskuddspensjon er riktig?</p>",
    alternativer=[
        R("Du kan normalt velge og endre risikoprofilen for pengene på pensjonskontoen"),
        F("Arbeidsgiveren garanterer en fast andel av sluttlønnen, uavhengig av avkastningen",
          "Det beskriver ytelsespensjon. I innskuddspensjon er bare innskuddet lovet."),
        F("Du kan ta ut pengene før pensjonsalder hvis du får et likviditetsbehov",
          "Pensjonsmidlene er bundet til pensjonsalder. Bindingen er en del av poenget med ordningen."),
        F("Pengene forvaltes kollektivt av leverandøren, uten individuelle valg for deg",
          "Det beskriver ytelsespensjon. I innskuddspensjon har du din egen konto og velger profil."),
    ],
    kort="<p><b>Du kan velge og endre risikoprofil.</b> I innskuddspensjon har du en egen konto og bærer risikoen, "
         "så du får også bestemme hvordan pengene plasseres.</p>",
    full="<p><b>Hva innskuddspensjon er.</b> Arbeidsgiveren setter inn en avtalt andel av lønnen på en pensjonskonto i "
         "ditt navn. Pensjonen blir det kontoen er verdt når du går av. Det er derfor du som bærer avkastningsrisikoen.</p>"
         "<p><b>Steg 1: hvem bærer risikoen?</b> Du. Da er det naturlig at du også får velge risikoprofilen, for "
         "eksempel hvor stor aksjeandel kontoen skal ha. Det er den riktige påstanden.</p>"
         "<p><b>Steg 2: sjekk de andre mot ordningene.</b> En garantert andel av sluttlønnen er ytelsespensjon. "
         "Kollektiv forvaltning uten individuelle valg er også ytelsespensjon. Uttak ved likviditetsbehov finnes ikke i "
         "noen av dem, fordi pensjonsmidler er bundet til pensjonsalder.</p>"
         "<p><b>Hvorfor valget betyr noe.</b> Standardprofilen ligger ofte rundt 50 % aksjer uansett alder. For en ung "
         "arbeidstaker med lang tid til uttak og en sikker lønn kan det være for forsiktig. Lønnen virker som et "
         "implisitt bankinnskudd, så den finansielle formuen tåler mer aksjer.</p>"
         "<p><b>Kontroll:</b> spør hvem som bærer risikoen i ordningen alternativet beskriver. Passer beskrivelsen på "
         "ytelsespensjon, stryk den.</p>"
         "<p><b>Husk:</b> innskuddspensjon = egen konto, egen risiko, egen risikoprofil, bundet til pensjonsalder.</p>",
)

statisk(
    "pen-s06", hjelp=HJELP["pen-s06"], tema="pensjon", type="begrep",
    q="<p>Ingrid har ytelsespensjon og er lovet 66 % av sluttlønnen inkludert folketrygden. Avkastningen på "
      "pensjonsmidlene blir mye lavere enn ordningen regnet med i flere år på rad. Hva er den viktigste konsekvensen?</p>",
    alternativer=[
        R("Arbeidsgiveren må skyte inn mer, så Ingrid får pensjonen som avtalt"),
        F("Ingrid får lavere pensjon, fordi pensjonen følger avkastningen på midlene",
          "Det gjelder innskuddspensjon. I ytelsespensjon er utbetalingen lovet. Arbeidsgiveren dekker det som mangler."),
        F("Ingrid må selv skyte inn penger for at ordningen skal gå opp",
          "Den ansatte har ikke noe tilskuddsansvar i en ytelsesordning. Risikoen ligger hos arbeidsgiveren."),
        F("Folketrygden øker sin del av pensjonen, slik at summen blir 66 %",
          "Folketrygden er beregnet etter egne regler og påvirkes ikke av tjenestepensjonsordningen."),
    ],
    kort="<p><b>Arbeidsgiveren betaler mer.</b> I ytelsespensjon er utbetalingen lovet, så det er arbeidsgiveren som "
         "bærer avkastningsrisikoen.</p>",
    full="<p><b>Hva ytelsespensjon er.</b> I en ytelsesordning lover arbeidsgiveren en bestemt pensjon, ofte en andel av "
         "sluttlønnen. Midlene settes av i en felles pott. Arbeidsgiveren betaler inn det som trengs for at potten "
         "skal holde til løftet.</p>"
         "<p><b>Steg 1: hva er avtalt?</b> Ingrids utbetaling: 66 % av sluttlønnen, inkludert folketrygden.</p>"
         "<p><b>Steg 2: hvem bærer risikoen?</b> Den som ikke har fått noe lovet. Ingrid har fått utbetalingen lovet. "
         "Arbeidsgiveren har ikke fått noe lovet. Når avkastningen svikter, må arbeidsgiveren skyte inn mer.</p>"
         "<p><b>Steg 3: konsekvensen.</b> Ingrids pensjon blir som avtalt. Kostnaden for arbeidsgiveren stiger. Det er "
         "en viktig grunn til at ni av ti i privat sektor nå har innskuddspensjon.</p>"
         "<p><b>Kontroll:</b> bytt ordning i tankene. Hadde Ingrid hatt innskuddspensjon, ville pensjonen hennes falt. "
         "Får du samme svar for begge ordningene, har du ikke brukt hva som er avtalt.</p>"
         "<p><b>Husk:</b> ytelsespensjon = utbetalingen lovet, arbeidsgiveren bærer risikoen. Innskuddspensjon = "
         "innskuddet lovet, du bærer risikoen.</p>",
)

statisk(
    "pen-s07", hjelp=HJELP["pen-s07"], tema="pensjon", type="fakta",
    q="<p>Henrik har hatt innskuddspensjon i ti år og bytter jobb. Hva skjer med pensjonen han har opparbeidet? Hva "
      "skjer med den hvis han dør før han går av?</p>",
    alternativer=[
        R("Han får et pensjonskapitalbevis. Det kan arves av etterlatte."),
        F("Han får en fripolise. Den opptjente ytelsen faller bort hvis han dør.",
          "Fripolise og ingen arv hører til ytelsespensjon. Innskuddspensjon gir pensjonskapitalbevis. Beholdningen arves."),
        F("Pengene betales ut kontant. De skattlegges som lønn.",
          "Opptjent tjenestepensjon er bundet til pensjonsalder. Den følger med deg som et bevis, ikke som kontanter."),
        F("Pengene blir hos den gamle arbeidsgiveren. De tilfaller den ved død.",
          "Midlene er dine. De forvaltes på en egen konto i ditt navn og kan flyttes fritt."),
    ],
    kort="<p><b>Pensjonskapitalbevis og arv.</b> Innskuddspensjon er en konto i ditt navn. Den følger "
         "deg ved jobbytte og går til etterlatte ved død.</p>",
    full="<p><b>Hva som skjer med opptjent pensjon.</b> Når du slutter, kan du ikke lenger få innskudd fra den gamle "
         "arbeidsgiveren. Det du har opparbeidet, er likevel ditt. Formen avhenger av hvilken ordning du hadde.</p>"
         "<p><b>Steg 1: jobbytte.</b> Innskuddspensjon gir et pensjonskapitalbevis: en egen pensjonskonto med det som "
         "står der. Den vokser videre med avkastningen og kan flyttes, men du kan ikke fylle på den selv. Ytelsespensjon "
         "gir i stedet en fripolise, et papir på den delen av den lovede ytelsen du har tjent opp.</p>"
         "<p><b>Steg 2: dødsfall.</b> En innskuddskonto er en beholdning i ditt navn. Den arves av etterlatte. En "
         "ytelse er et løfte om utbetaling så lenge du lever, så den arves ikke.</p>"
         "<p><b>Kontroll:</b> sammenlign med folketrygden. Den arves heller ikke, fordi beholdningen er en forsikring "
         "mot å leve lenge: de som dør tidlig, finansierer de som lever lenge. Innskuddspensjon er ikke en slik "
         "forsikring. Nettopp derfor kan den arves.</p>"
         "<p><b>Husk:</b> innskudd = pensjonskapitalbevis og arv. Ytelse = fripolise og ingen arv.</p>",
)

statisk(
    "pen-s08", hjelp=HJELP["pen-s08"], tema="pensjon", type="paastand",
    q="<p>Hvilken påstand om individuell pensjonssparing (IPS) er riktig?</p>",
    alternativer=[
        R("IPS gir utsatt skatt (et rentefritt lån fra staten) og fritak for formuesskatt"),
        F("IPS fungerer som BSU, men gir i tillegg fritak for formuesskatt på kontoen",
          "BSU gir 10 % fradrag direkte i skatten. IPS gir fradrag i alminnelig inntekt og skattlegges ved uttak. "
          "Kanalene er helt ulike."),
        F("IPS gir fritak for formuesskatt, men pengene kan tas ut ved 35 år for å kjøpe bolig",
          "IPS er bundet til tidligst 62 år. Boligsparing med skattefradrag er BSU."),
        F("Med IPS slipper du formuesskatt på hele formuen din, ikke bare på kontoen",
          "Fritaket gjelder bare beløpet på IPS-kontoen. Resten av formuen skattlegges som før."),
    ],
    kort="<p><b>Utsatt skatt og formuesskattefritak.</b> Fradraget inn og skatten ut er begge 22 %, så fordelen er "
         "utsettelsen og at kontoen er fritatt for formuesskatt.</p>",
    full="<p><b>Hva IPS er.</b> Individuell pensjonssparing er en konto der innskuddet (inntil kr 25 000 i året fra "
         "2026) gir fradrag i alminnelig inntekt. Avkastningen skattlegges ikke underveis. Kontoen er fritatt for "
         "formuesskatt. Ved uttak, tidligst fra 62 år, skattlegges hele beløpet som alminnelig inntekt med 22 %.</p>"
         "<p><b>Steg 1: hvorfor «rentefritt lån»?</b> Fradraget gir deg 22 % av innskuddet tilbake nå. Staten tar "
         "22 % igjen ved uttak. I mellomtiden står statens andel på kontoen og vokser sammen med din. Det virker som om "
         "staten låner deg skatten uten rente. Resultatet er at avkastningen på din egen andel går fri for skatt.</p>"
         "<p><b>Steg 2: formuesskatten.</b> Beløpet på IPS-kontoen holdes utenfor formuesskatten. Det gjelder bare "
         "kontoen, ikke resten av formuen.</p>"
         "<p><b>Steg 3: stryk de andre.</b> BSU er en annen ordning med fradrag i skatten. Uttak ved 35 til bolig er "
         "umulig, fordi IPS er bundet til 62. Fritak for hele formuen finnes ikke.</p>"
         "<p><b>Kontroll:</b> er det noen satsrabatt? Nei: 22 % inn og 22 % ut. Hele fordelen er tidsverdien og "
         "formuesskattefritaket.</p>"
         "<p><b>Husk:</b> IPS = utsatt skatt (rentefritt lån fra staten) + formuesskattefritak på kontoen, bundet til 62.</p>",
)

statisk(
    "pen-s09", hjelp=HJELP["pen-s09"], tema="pensjon", type="fakta",
    q="<p>Rolf er 70 år og tar ut kr 50 000 fra IPS-kontoen sin i år. Han har alderspensjon som mer enn dekker "
      "personfradraget. Skatten på alminnelig inntekt er 22 %, trygdeavgiften på pensjonsinntekt 5,1 % og den effektive "
      "eierskatten 37,84 %. Hvordan skattlegges uttaket?</p>",
    alternativer=[
        R("Som alminnelig inntekt med 22 %, altså kr 11 000"),
        F("Som pensjonsinntekt med 22 % og trygdeavgift, altså minst kr 13 550",
          "IPS-uttak er ikke pensjonsinntekt. Det inngår ikke i personinntekten, så trygdeavgift og trinnskatt kommer "
          "ikke i tillegg."),
        F("Som gevinst på sparing med eierskatten, altså kr 18 920",
          "Eierskatten gjelder aksjegevinst og utbytte. IPS-uttak er alminnelig inntekt."),
        F("Ikke i det hele tatt, fordi skatten ble betalt ved innskuddet",
          "Innskuddet ga fradrag, så skatten var ikke betalt. Den tas nettopp ved uttak."),
    ],
    kort="<p><b>Alminnelig inntekt med 22 %: kr 11 000.</b> 22 % × 50 000. Uttaket er ikke pensjonsinntekt, så det "
         "kommer ingen trygdeavgift eller trinnskatt i tillegg.</p>",
    full="<p><b>Hvorfor uttaket skattlegges.</b> Da Rolf satte pengene inn på IPS, fikk han fradrag i alminnelig "
         "inntekt. Pengene på kontoen er derfor aldri skattet. Skatten tas når de kommer ut.</p>"
         "<p><b>Steg 1: hva slags inntekt?</b> IPS-uttak er alminnelig inntekt. Det er ikke pensjonsinntekt, selv om "
         "navnet kan friste til å tro det. Trygdeavgift og trinnskatt regnes av personinntekt. Der hører ikke "
         "IPS-uttaket hjemme.</p>"
         "<p><b>Steg 2: skatten.</b> 22 % × 50 000 = <b>kr 11 000</b>.</p>"
         "<p><b>Kontroll:</b> samme sats inn og ut. Innskuddet ga 22 % fradrag, uttaket gir 22 % skatt. Er satsen ut "
         "noe annet enn satsen inn, har du blandet inn en regel som ikke gjelder IPS. Den feilen er grunnen til at "
         "«lavere skatt som pensjonist» ikke er et argument for IPS.</p>"
         "<p><b>Hvorfor de andre fristene.</b> 37,84 % er satsen du møter på aksjegevinst og aksjesparekonto. "
         "Trygdeavgiften på 5,1 % gjelder vanlig alderspensjon. Ingen av dem gjelder IPS.</p>"
         "<p><b>Husk:</b> IPS-uttak = alminnelig inntekt, 22 %. Ingen trygdeavgift, ingen trinnskatt, ingen eierskatt.</p>",
)

statisk(
    "pen-s10", hjelp=HJELP["pen-s10"], tema="pensjon", type="begrep",
    q="<p>En rådgiver sier: «IPS lønner seg fordi du skatter lavere som pensjonist enn mens du jobber.» Hva er galt med "
      "begrunnelsen?</p>",
    alternativer=[
        R("Satsen er 22 % både inn og ut, så fordelen er utsatt skatt og formuesskattefritak"),
        F("Ingenting: marginalskatten på pensjon er lavere enn på lønn. IPS utnytter det.",
          "IPS-uttak er ikke pensjonsinntekt. Det skattlegges som alminnelig inntekt med 22 %, samme sats som fradraget."),
        F("IPS lønner seg ikke i det hele tatt, fordi staten tar igjen hele fradraget",
          "Staten tar igjen 22 %, men avkastningen på din egen andel går fri for skatt. Det er en reell fordel."),
        F("IPS-uttak skattlegges med eierskatten 37,84 %, så det blir dyrere enn å ta pengene som lønn",
          "IPS-uttak skattlegges med 22 % som alminnelig inntekt, ikke med eierskatten."),
    ],
    kort="<p><b>Det er ingen satsforskjell.</b> Fradraget og uttaksskatten er begge 22 % alminnelig inntekt. Fordelen er "
         "utsatt skatt og at kontoen er fritatt for formuesskatt.</p>",
    full="<p><b>Hva rådgiveren tror.</b> Argumentet bygger på at du får fradrag til en høy marginalskatt mens du jobber "
         "og betaler en lav skatt når du er pensjonist. Det ville vært en satsarbitrasje.</p>"
         "<p><b>Steg 1: satsen inn.</b> IPS-innskudd gir fradrag i alminnelig inntekt. Det er verdt 22 %, uansett hvor "
         "høy marginalskatten på lønn er, fordi trygdeavgift og trinnskatt ikke påvirkes.</p>"
         "<p><b>Steg 2: satsen ut.</b> Uttaket skattlegges som alminnelig inntekt med 22 %. Det er ikke pensjonsinntekt, "
         "så det får verken trygdeavgift eller trinnskatt.</p>"
         "<p><b>Steg 3: hva fordelen faktisk er.</b> Mellom inn og ut står statens 22 % på kontoen og vokser sammen med "
         "dine penger. Resultatet er det samme som å skatte lønnen først og la resten vokse helt skattefritt. I tillegg "
         "er kontoen fritatt for formuesskatt. Prisen er at pengene er bundet til 62 år.</p>"
         "<p><b>Kontroll:</b> regn 25 000 inn, vekst 2,0 og 22 % ut: 25 000 × 2,0 × 0,78 = 39 000. Skatt lønnen først: "
         "19 500 × 2,0 = 39 000. Samme tall, så det er ingen rabatt i satsen.</p>"
         "<p><b>Husk:</b> IPS = 22 % inn, 22 % ut. Fordelen er tidsverdien og formuesskattefritaket.</p>",
)

statisk(
    "pen-s11", hjelp=HJELP["pen-s11"], tema="pensjon", type="fakta",
    q="<p>Tone er 45 år og har kr 300 000 på IPS-kontoen. Hvilken regel gjelder for når og hvordan hun kan ta ut "
      "pengene?</p>",
    alternativer=[
        R("Tidligst fra 62 år, fordelt over minst ti år og minst til hun fyller 80"),
        F("Når som helst, men med et tillegg i skatt hvis hun tar ut før 62",
          "IPS-midlene er bundet. Det finnes ingen ordning for tidlig uttak mot straffeskatt."),
        F("Tidligst fra 67 år, som ett engangsbeløp eller fordelt over så mange år hun vil",
          "Nedre grense er 62 år. Utbetalingen må gå over minst ti år og til minst 80."),
        F("Tidligst fra 62 år, med hele kontoen tatt ut på én gang hvis hun vil",
          "Utbetalingen må fordeles over minst ti år og minst til fylte 80. Engangsuttak er ikke lov."),
    ],
    kort="<p><b>Fra 62 år, over minst ti år og minst til 80.</b> Bindingen er prisen for skattefordelen.</p>",
    full="<p><b>Hvorfor IPS er bundet.</b> Staten gir skattefordelen fordi pengene skal brukes som pensjon. Derfor er "
         "de låst til pensjonsalder. Utbetalingen må spres over flere år.</p>"
         "<p><b>Steg 1: når?</b> Tidligst fra 62 år. Det finnes ingen ordning for tidlig uttak, heller ikke mot ekstra "
         "skatt.</p>"
         "<p><b>Steg 2: hvordan?</b> Utbetalingen skal gå over minst ti år og minst til fylte 80 år. Begynner Tone "
         "ved 62, må hun altså fordele pengene over 18 år. Begynner hun ved 75, gjelder tiårsgrensen. Da varer "
         "utbetalingen til hun er 85.</p>"
         "<p><b>Kontroll:</b> hvilken av de to grensene binder? Den som gir lengst periode. Ved 62 gir «til 80» 18 år, "
         "mer enn ti. Ved 72 gir «minst ti år» utbetaling til 82, lenger enn til 80.</p>"
         "<p><b>Hvorfor det betyr noe.</b> Bindingen er også grunnen til at IPS virker mot svak selvkontroll. Penger du "
         "ikke får tak i, kan du ikke bruke opp.</p>"
         "<p><b>Husk:</b> IPS: tidligst 62, minst ti år, minst til 80.</p>",
)

statisk(
    "pen-s12", hjelp=HJELP["pen-s12"], tema="pensjon", type="fakta",
    q="<p>Hvilken kombinasjon av vilkår gjelder for skattefradraget for BSU (boligsparing for ungdom) i 2026?</p>",
    alternativer=[
        R("10 % av inntil kr 27 500 i året, til og med året du fyller 33, bare uten egen bolig"),
        F("22 % av inntil kr 27 500 i året, til og med året du fyller 33, også med egen bolig",
          "BSU gir 10 % direkte i skatten. Siden 2021 gis fradraget bare til den som ikke eier bolig."),
        F("10 % av inntil kr 25 000 i året, til og med året du fyller 35, bare uten egen bolig",
          "Taket på kr 25 000 er IPS. BSU-taket er kr 27 500. Aldersgrensen er året du fyller 33."),
        F("10 % av inntil kr 27 500 i året, uten aldersgrense, men bare til førstegangskjøp",
          "Fradraget gis til og med året du fyller 33. Etter det kan kontoen stå, men uten fradrag."),
    ],
    kort="<p><b>10 % av inntil kr 27 500, til og med 33 år, uten egen bolig.</b> Maks fradrag er 2 750 kroner i året "
         "og samlet sparing kr 300 000.</p>",
    full="<p><b>Hva BSU er.</b> Boligsparing for ungdom er en sparekonto for unge som skal kjøpe bolig. Staten gir et "
         "fradrag for det du sparer, så lenge du oppfyller vilkårene.</p>"
         "<p><b>Steg 1: satsen.</b> Fradraget er 10 % av årets sparing, trukket rett fra skatten. Det er et "
         "skattefradrag, ikke et fradrag i inntekten.</p>"
         "<p><b>Steg 2: taket.</b> Inntil kr 27 500 i året gir fradrag. Samlet sparing kan være kr 300 000. Maks "
         "fradrag er dermed 10 % × 27 500 = 2 750 kroner i året.</p>"
         "<p><b>Steg 3: vilkårene.</b> Fradraget gis til og med året du fyller 33. Siden 2021 gis det bare til den som "
         "ikke eier bolig. Brukes pengene til noe annet enn bolig, betaler du tilbake tidligere fradrag.</p>"
         "<p><b>Kontroll mot IPS:</b> IPS har kr 25 000 som tak fra 2026 og gir fradrag i alminnelig inntekt, verdt 22 %. "
         "Ser du 25 000 eller 22 % i et BSU-alternativ, er tallene hentet fra feil ordning.</p>"
         "<p><b>Husk:</b> BSU = 10 % av inntil 27 500 rett i skatten, til og med 33 år, uten egen bolig.</p>",
)

statisk(
    "pen-s13", hjelp=HJELP["pen-s13"], tema="pensjon", type="begrep",
    q="<p>Både IPS og BSU gir en skattefordel når du setter inn penger. Hva er den viktigste forskjellen i hvordan "
      "fordelen virker?</p>",
    alternativer=[
        R("BSU gir fradrag i skatten. IPS gir fradrag i inntekten, men uttaket skattlegges."),
        F("BSU gir fradrag i inntekten. IPS gir fradrag direkte i skatten med 22 % av innskuddet.",
          "Kanalene er byttet om. BSU gir 10 % rett i skatten, IPS gir fradrag i alminnelig inntekt."),
        F("Begge gir fradrag i inntekten, men IPS har høyere tak enn BSU",
          "BSU gir fradrag i skatten, ikke i inntekten. Taket er dessuten høyere for BSU: 27 500 mot 25 000."),
        F("Begge skattlegges ved uttak, men BSU har lavere skattesats ved uttak",
          "BSU-midler brukt til bolig skattlegges ikke ved uttak. Det er IPS som skattlegges ved uttak."),
    ],
    kort="<p><b>Fradrag i skatten mot fradrag i inntekten.</b> BSU gir 10 % rett i skatten. IPS gir fradrag i "
         "alminnelig inntekt (22 %), men uttaket skattlegges.</p>",
    full="<p><b>To ordninger, to kanaler.</b> Begge gir en skattefordel når du sparer, men de virker helt ulikt. Et "
         "alternativ som sier at den ene «fungerer som» den andre, er galt.</p>"
         "<p><b>BSU.</b> Du får 10 % av årets sparing trukket fra skatten. Sparer du 27 500, betaler du 2 750 mindre i "
         "skatt. Fordelen er en engangsrabatt. Avkastningen på kontoen skattlegges som vanlige renter. Pengene "
         "skattlegges ikke på nytt når de brukes til bolig.</p>"
         "<p><b>IPS.</b> Innskuddet trekkes fra i alminnelig inntekt. Det er verdt 22 %, altså 5 500 på 25 000. Til "
         "gjengjeld skattlegges hele uttaket med 22 %. Fordelen er at skatten er utsatt og at kontoen er fritatt for "
         "formuesskatt.</p>"
         "<p><b>Kontroll med tall:</b> 25 000 på BSU gir 2 500 i skattefradrag. Det beholder du. 25 000 på IPS gir "
         "5 500 tilbake nå, men staten tar 22 % av alt som kommer ut senere. Fradraget nå sier ikke alene hvor stor "
         "fordelen er: BSU-rabatten er endelig, IPS-fradraget kommer tilbake som skatt ved uttak.</p>"
         "<p><b>Husk:</b> BSU = rabatt i skatten. IPS = utsettelse av skatten.</p>",
)

statisk(
    "pen-s14", hjelp=HJELP["pen-s14"], tema="pensjon", type="fakta",
    q="<p>Hvilken påstand om obligatorisk tjenestepensjon (OTP) er riktig etter dagens regler?</p>",
    alternativer=[
        R("Arbeidsgiveren må spare minst 2 % av lønnen fra første krone opp til 12 G"),
        F("Arbeidsgiveren må spare minst 2 % av lønnen mellom 1 G og 12 G",
          "Det var regelen før 2022. Nå gjelder minstesatsen fra første krone."),
        F("Arbeidsgiveren må spare minst 7 % av lønnen fra første krone opp til 12 G",
          "7 % er maksimal grunnsats i innskuddspensjon. Minstekravet er 2 %."),
        F("OTP gjelder bare arbeidsgivere med innskuddspensjon, ikke ytelsespensjon",
          "OTP-kravet gjelder alle arbeidsgivere uansett form. Ordningen må minst gi det samme som 2 % innskudd."),
    ],
    kort="<p><b>2 % fra første krone opp til 12 G.</b> Kravet ble utvidet fra lønn over 1 G til første krone i 2022.</p>",
    full="<p><b>Hva OTP er.</b> Obligatorisk tjenestepensjon er kravet om at alle arbeidsgivere skal spare til pensjon "
         "for de ansatte, i tillegg til folketrygden. Loven setter et minimum. Arbeidsgiveren kan gi mer.</p>"
         "<p><b>Steg 1: minimumet.</b> Minst 2 % av lønnen, regnet fra første krone. Lønn over 12 G teller ikke med.</p>"
         "<p><b>Steg 2: endringen i 2022.</b> Før 2022 gjaldt kravet bare lønn over 1 G. En lønn på 500 000 med G = "
         "136 549 ga da 2 % × 363 451 = 7 269. Nå gir den 2 % × 500 000 = 10 000.</p>"
         "<p><b>Steg 3: maksimumet.</b> I innskuddspensjon kan arbeidsgiveren gå opp til 7 % av lønn opp til 12 G, "
         "pluss 18,1 % av lønnen mellom 7,1 G og 12 G.</p>"
         "<p><b>Kontroll:</b> OTP er obligatorisk uansett om ordningen er innskudd eller ytelse. Et alternativ som "
         "knytter plikten til én av formene, er galt.</p>"
         "<p><b>Husk:</b> OTP-minimum = 2 % av lønn fra første krone opp til 12 G. Maks innskudd = 7 % + 18,1 % "
         "mellom 7,1 G og 12 G.</p>",
)

statisk(
    "pen-s15", hjelp=HJELP["pen-s15"], tema="pensjon", type="begrep",
    q="<p>I innskuddspensjon kan arbeidsgiveren spare 7 % av lønn opp til 12 G, pluss 18,1 % av lønnen mellom 7,1 G og "
      "12 G. Hvorfor er tilleggssatsen nøyaktig 18,1 % og grensen nøyaktig 7,1 G?</p>",
    alternativer=[
        R("Den skal erstatte opptjeningen folketrygden ikke gir for lønn over 7,1 G"),
        F("18,1 % er trygdeavgiften pluss trinnskatt på lønn mellom 7,1 G og 12 G",
          "Trygdeavgiften er 7,6 % og trinnskatten varierer. 18,1 % er folketrygdens opptjeningssats."),
        F("Den skal sikre at høytlønte betaler mer inn til folketrygden enn lavtlønte",
          "Tillegget går til den ansattes egen tjenestepensjon, ikke til folketrygden."),
        F("7,1 G er grensen der skatten på alminnelig inntekt øker fra 22 %",
          "Skatten på alminnelig inntekt er 22 % uansett inntekt. 7,1 G er taket for opptjening i folketrygden."),
    ],
    kort="<p><b>Den erstatter manglende folketrygdopptjening.</b> Folketrygden gir 18,1 % opptjening bare opp til "
         "7,1 G. Tillegget gir de samme 18,1 % på lønnen over taket.</p>",
    full="<p><b>Hva taket i folketrygden gjør.</b> Hvert år legges 18,1 % av inntekten til pensjonsbeholdningen i "
         "folketrygden, men bare inntekt opp til 7,1 G. Over det gir lønnen ingen opptjening. Derfor faller "
         "kompensasjonsgraden for dem som tjener mye.</p>"
         "<p><b>Steg 1: hvem taper på taket?</b> En som tjener 10 G, får opptjening bare av 7,1 G. De 2,9 G over gir "
         "ingenting i folketrygden.</p>"
         "<p><b>Steg 2: hva tillegget gjør.</b> Arbeidsgiveren kan spare 18,1 % av lønnen mellom 7,1 G og 12 G i "
         "innskuddspensjonen. Det er nøyaktig satsen folketrygden ville gitt om taket ikke fantes. Tillegget fyller "
         "hullet i tjenestepensjonen i stedet for i folketrygden.</p>"
         "<p><b>Kontroll med tall:</b> lønn 1 200 000 og G = 136 549 gir tak 969 498. Over taket ligger 230 502. "
         "Folketrygden gir null av det. Tillegget gir 18,1 % × 230 502 = 41 721, det samme folketrygden ville gitt.</p>"
         "<p><b>Husk:</b> 18,1 % mellom 7,1 G og 12 G = folketrygdens sats på lønnen folketrygden ikke dekker.</p>",
)

statisk(
    "pen-s16", hjelp=HJELP["pen-s16"], tema="pensjon", type="begrep",
    q="<p>Hva skiller finansieringen av alderspensjonen i folketrygden fra finansieringen av tjenestepensjonen?</p>",
    alternativer=[
        R("Folketrygden betales av dagens yrkesaktive, mens tjenestepensjonen er fondert"),
        F("Folketrygden er fondert i Statens pensjonsfond, mens tjenestepensjonen betales løpende",
          "Pensjonsbeholdningen i folketrygden er en regnskapsstørrelse. Pengene bak den er ikke satt av i et fond."),
        F("Begge er fondert: pengene du betaler inn, settes av på en konto i ditt navn",
          "Folketrygden er pay-as-you-go. Bare innskuddspensjon har en konto i ditt navn med ekte penger."),
        F("Begge betales av dagens yrkesaktive, men tjenestepensjonen via arbeidsgiveren",
          "Tjenestepensjonen er fondert: arbeidsgiveren setter av penger som plasseres og avkaster."),
    ],
    kort="<p><b>Folketrygden er pay-as-you-go, tjenestepensjonen fondert.</b> Beholdningen i folketrygden er en "
         "rettighet, ikke penger satt til side.</p>",
    full="<p><b>Tre lag.</b> Pensjonssystemet har folketrygden fra staten, tjenestepensjon fra arbeidsgiveren og egen "
         "sparing. Lagene finansieres ulikt.</p>"
         "<p><b>Steg 1: folketrygden.</b> Folketrygden er pay-as-you-go. Dagens yrkesaktive betaler trygdeavgift og "
         "skatt. Det finansierer dagens pensjoner. Pensjonsbeholdningen din er et regnskap over hva du har rett på, "
         "ikke et fond med dine penger. Den reguleres med lønnsveksten, ikke med avkastning.</p>"
         "<p><b>Steg 2: tjenestepensjonen.</b> Arbeidsgiveren setter av penger som plasseres i markedet og avkaster. "
         "I innskuddspensjon ligger de på en konto i ditt navn. Det er fondering.</p>"
         "<p><b>Kontroll:</b> hva skjer med folketrygden om børsen faller? Ingenting direkte, fordi beholdningen ikke er "
         "investert. Med innskuddspensjon faller kontoen. Det er forskjellen på en rettighet og en fondert konto.</p>"
         "<p><b>Hvorfor Statens pensjonsfond ikke endrer dette.</b> Navnet til tross er ikke fondet øremerket "
         "folketrygdens pensjoner. Pensjonene betales over statsbudsjettet.</p>"
         "<p><b>Husk:</b> folketrygd = pay-as-you-go. Tjenestepensjon = fondert.</p>",
)

statisk(
    "pen-s17", hjelp=HJELP["pen-s17"], tema="pensjon", type="begrep",
    q="<p>Folketrygden gikk fra å regne pensjonen ut fra de 20 beste inntektsårene til alleårsregelen, der hvert år med "
      "inntekt gir 18,1 % opptjening opp til 7,1 G. Hvilken konsekvens har alleårsregelen?</p>",
    alternativer=[
        R("Hvert år i arbeid øker pensjonen, så deltid tidlig i karrieren koster noe"),
        F("Bare de 20 beste årene teller fortsatt, men nå med 18,1 % i stedet for poeng",
          "Det er den gamle ordningen. Alleårsregelen lar alle år med inntekt telle."),
        F("Den med bratt karrierestigning får en pensjon som om hele livet var på sluttlønnen",
          "Det var skjevheten i den gamle ordningen, som alleårsregelen fjerner."),
        F("Pensjonen avhenger bare av sluttlønnen, ikke av hvor mange år du har jobbet",
          "Med alleårsregelen avhenger pensjonen av hvert år. Sluttlønnen alene sier ingenting om beholdningen."),
    ],
    kort="<p><b>Hvert år teller.</b> Hver lønnskrone opp til 7,1 G gir 18,1 øre til beholdningen, så ett år ekstra i "
         "jobb øker alltid pensjonen.</p>",
    full="<p><b>Den gamle ordningen.</b> Pensjonen ble regnet ut fra de 20 beste inntektsårene. Det krevdes 40 år for "
         "full opptjening. Det ga to skjevheter.</p>"
         "<p><b>Skjevhet 1.</b> Den som hadde bratt karrierestigning, fikk pensjon som om hele yrkeslivet lå på et høyt "
         "nivå. De dårlige årene tidlig i karrieren telte ikke.</p>"
         "<p><b>Skjevhet 2.</b> Den som jobbet jevnt i 45 år, fikk ingenting igjen for de 25 årene som ikke var blant "
         "de 20 beste.</p>"
         "<p><b>Alleårsregelen.</b> For alle født fra 1963 bygges en beholdning opp av hvert år: 18,1 % av inntekten "
         "opp til 7,1 G. Begge skjevhetene forsvinner, fordi hver krone teller like mye uansett når den er tjent.</p>"
         "<p><b>Kontroll med et eksempel:</b> to personer har samme sluttlønn. Den ene har jobbet deltid i ti år. Etter "
         "den gamle ordningen kunne de fått lik pensjon. Etter alleårsregelen får den som jobbet deltid, lavere "
         "beholdning og lavere pensjon.</p>"
         "<p><b>Husk:</b> alleårsregelen: alle år teller, 18,1 % opp til 7,1 G. Ett år ekstra i jobb gir alltid mer.</p>",
)

statisk(
    "pen-s18", hjelp=HJELP["pen-s18"], tema="pensjon", type="begrep",
    q="<p>Folketrygdens alderspensjon utbetales så lenge du lever, også om du lever mye lenger enn delingstallet "
      "tilsier. Hvorfor må en slik ordning være obligatorisk?</p>",
    alternativer=[
        R("Ellers ville bare de som venter å leve lenge, meldt seg inn"),
        F("Fordi beholdningen ellers ville vært utsatt for avkastningsrisiko i aksjemarkedet",
          "Beholdningen er ikke investert. Begrunnelsen for tvang er ugunstig utvalg, ikke avkastningsrisiko."),
        F("Fordi frivillige ordninger ikke kan få skattefradrag for innskuddene",
          "IPS er frivillig og gir fradrag. Skattereglene er ikke grunnen til tvangen."),
        F("Fordi delingstallet ellers måtte vært ulikt for kvinner og menn",
          "Kjønn er ikke poenget. Enhver frivillig livsvarig ordning trekker til seg dem som venter å leve lenge."),
    ],
    kort="<p><b>Ugunstig utvalg.</b> En frivillig livsvarig pensjon tiltrekker seg dem som venter å leve lenge. Tvang "
         "holder både lang- og kortlevde i ordningen.</p>",
    full="<p><b>Forsikringen i folketrygden.</b> Beholdningen deles på forventet gjenstående levetid, men utbetalingen "
         "varer til du dør. De som lever lenge, får mer enn beholdningen sin. De som dør tidlig, får mindre. Det er en "
         "forsikring mot å leve lenger enn pengene varer.</p>"
         "<p><b>Steg 1: hva skjer hvis ordningen er frivillig?</b> Folk vet en del om sin egen helse. De som venter å "
         "leve lenge, tjener på å melde seg inn. De som venter å dø tidlig, holder seg unna.</p>"
         "<p><b>Steg 2: konsekvensen.</b> Gjennomsnittlig levetid blant medlemmene blir høyere enn delingstallet "
         "forutsetter. Ordningen må betale mer enn den har. Prisen må opp. Da faller enda flere fra. Det kalles "
         "ugunstig utvalg.</p>"
         "<p><b>Steg 3: løsningen.</b> Tvang. Når alle er med, stemmer gjennomsnittet med delingstallet.</p>"
         "<p><b>Kontroll:</b> innskuddspensjon arves av etterlatte og er ikke en slik forsikring. Der finnes ikke samme "
         "problem. Samme mekanisme forklarer hvorfor tvang demper ugunstig utvalg i forsikring generelt.</p>"
         "<p><b>Husk:</b> livsvarig utbetaling = forsikring mot lang levetid. Tvang hindrer ugunstig utvalg.</p>",
)

statisk(
    "pen-s19", hjelp=HJELP["pen-s19"], tema="pensjon", type="tolkning",
    q="<p>Folketrygdens uttak er nøytralt utformet: forventet samlet utbetaling er omtrent den samme uansett når du "
      "starter uttaket. Hva bør da avgjøre når Petter tar ut alderspensjonen?</p>",
    alternativer=[
        R("Egen helse og forventet levealder, behovet for pengene nå og om han fortsatt jobber"),
        F("Ingenting: siden samlet utbetaling er den samme, er alle uttaksaldre like gode for alle",
          "Nøytraliteten gjelder i forventning for kullet. For den enkelte avgjør egen levealder og likviditet."),
        F("Han bør alltid vente lengst mulig, fordi den årlige pensjonen da blir høyest",
          "Høyere årsbeløp betyr færre år. Lever han kort, tapte han på å vente."),
        F("Han bør alltid ta ut tidligst mulig, fordi penger nå er verdt mer enn penger senere",
          "Tidsverdien trekker mot tidlig uttak, men lang forventet levealder trekker motsatt vei."),
    ],
    kort="<p><b>Egen levealder, likviditet og arbeid.</b> Nøytraliteten gjelder i snitt. Petter må vurdere sin egen "
         "situasjon.</p>",
    full="<p><b>Hva nøytral betyr.</b> Årlig pensjon er beholdning/delingstall. Delingstallet er forventet "
         "gjenstående levetid. Tar du ut senere, får du mer i året, men i færre år. I forventning for kullet blir "
         "summen omtrent den samme.</p>"
         "<p><b>Steg 1: for hvem gjelder nøytraliteten?</b> For en gjennomsnittsperson. Petter er ikke gjennomsnittet. "
         "Har han dårlig helse, venter han å leve kortere. Da gir tidlig uttak mest. Har han god helse og lang "
         "levealder i familien, gir sent uttak mest.</p>"
         "<p><b>Steg 2: likviditet.</b> Trenger han pengene nå, for eksempel fordi han har sluttet å jobbe, er tidlig "
         "uttak verdifullt i seg selv.</p>"
         "<p><b>Steg 3: arbeid.</b> Jobber han videre, trenger han kanskje ikke pengene. Han tjener også opp mer i "
         "beholdningen.</p>"
         "<p><b>Kontroll med tall:</b> med delingstall 21,15 ved 62 og 17,08 ved 67 tar den sene igjen den tidlige rundt "
         "88 år, udiskontert. Lever Petter lenger enn det, lønte det seg å vente. Lever han kortere, lønte det seg å ta "
         "ut tidlig.</p>"
         "<p><b>Husk:</b> nøytral i snitt, ikke for deg. Helse, likviditet og arbeid avgjør.</p>",
)

statisk(
    "pen-s20", hjelp=HJELP["pen-s20"], tema="pensjon", type="fakta",
    q="<p>Hvordan reguleres pensjonsbeholdningen før uttak og alderspensjonen etter uttak i folketrygden?</p>",
    alternativer=[
        R("Beholdningen med lønnsvekst, pensjonen med snittet av lønns- og prisvekst"),
        F("Både beholdningen og løpende pensjon reguleres med lønnsveksten",
          "Løpende pensjon reguleres med gjennomsnittet av lønns- og prisveksten. Den henger derfor litt etter lønningene."),
        F("Beholdningen med prisveksten, løpende pensjon med lønnsveksten",
          "Rekkefølgen er snudd. Beholdningen følger lønnsveksten, slik at den holder tritt med lønningene."),
        F("Beholdningen med avkastningen i Statens pensjonsfond, pensjonen med prisveksten",
          "Beholdningen er ikke investert. Den reguleres med lønnsveksten, målt ved veksten i G."),
    ],
    kort="<p><b>Lønnsvekst før uttak, snittet av lønns- og prisvekst etter.</b> For 2026 steg G med 4,91 % og "
         "alderspensjonen med 4,69 %.</p>",
    full="<p><b>To faser.</b> Før uttak har du en pensjonsbeholdning. Etter uttak har du en løpende pensjon. De "
         "reguleres ulikt.</p>"
         "<p><b>Steg 1: før uttak.</b> Beholdningen reguleres hvert år med lønnsveksten, målt ved veksten i "
         "grunnbeløpet G. Det sørger for at det du tjente opp for 20 år siden, holder verdien målt mot dagens lønninger.</p>"
         "<p><b>Steg 2: etter uttak.</b> Løpende pensjon reguleres med gjennomsnittet av lønnsveksten og prisveksten. "
         "Når lønningene stiger mer enn prisene, får pensjonistene en reell økning, men mindre enn de yrkesaktive.</p>"
         "<p><b>Kontroll med tall:</b> i 2026 steg G med 4,91 %. Alderspensjonen ble hevet med 4,69 %. Pensjonen "
         "steg mindre enn G, slik regelen sier.</p>"
         "<p><b>En gammel formulering.</b> Fra 2011 til 2021 ble løpende pensjon regulert med lønnsveksten minus "
         "0,75 prosentpoeng. Forelesningen bruker den formuleringen, men regelen nå er gjennomsnittet.</p>"
         "<p><b>Husk:</b> beholdning: lønnsvekst. Løpende pensjon: snittet av lønns- og prisvekst.</p>",
)

statisk(
    "pen-s21", hjelp=HJELP["pen-s21"], tema="pensjon", type="formel",
    q="<p>B<sub>t</sub> er pensjonsbeholdningen i folketrygden ved utgangen av år t, g lønnsveksten i år t, "
      "L<sub>t</sub> pensjonsgivende inntekt og G<sub>t</sub> grunnbeløpet. Hvilket uttrykk gir beholdningen?</p>",
    alternativer=[
        R("B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + 0,181 × min(L<sub>t</sub>; 7,1 G<sub>t</sub>)"),
        F("B<sub>t</sub> = [B<sub>t−1</sub> + 0,181 × min(L<sub>t</sub>; 7,1 G<sub>t</sub>)] × (1 + g)",
          "Rekkefølgen er snudd. Da reguleres årets opptjening med et helt års lønnsvekst den ikke har hatt."),
        F("B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + 0,181 × L<sub>t</sub>",
          "Taket mangler. Inntekt over 7,1 G gir ingen opptjening."),
        F("B<sub>t</sub> = B<sub>t−1</sub> + 0,181 × min(L<sub>t</sub>; 7,1 G<sub>t</sub>) × (1 + g)",
          "Reguleringen er flyttet fra den gamle beholdningen til årets opptjening. Det er den gamle beholdningen som "
          "skal reguleres."),
    ],
    kort="<p><b>Reguler den gamle beholdningen, legg til årets opptjening med taket.</b> "
         "B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + 0,181 × min(L<sub>t</sub>; 7,1 G<sub>t</sub>).</p>",
    full="<p><b>Hva formelen sier.</b> Pensjonsbeholdningen vokser på to måter hvert år. Det som lå der fra før, "
         "reguleres med lønnsveksten. Deretter legges årets opptjening til: 18,1 % av inntekten, men bare opp til "
         "7,1 G.</p>"
         "<p><b>Steg 1: reguleringen.</b> B<sub>t−1</sub> × (1 + g). Bare den gamle beholdningen skal reguleres, fordi "
         "den har ligget der hele året.</p>"
         "<p><b>Steg 2: opptjeningen.</b> 0,181 × min(L<sub>t</sub>; 7,1 G<sub>t</sub>). min() er taket: tjener du mer "
         "enn 7,1 G, teller bare 7,1 G.</p>"
         "<p><b>Steg 3: stryk de gale.</b> Klammen rundt begge leddene regulerer også årets opptjening. Uttrykket uten "
         "min() mangler taket. Det siste regulerer opptjeningen og ikke beholdningen.</p>"
         "<p><b>Kontroll med tall:</b> B<sub>t−1</sub> = 1 200 000, g = 3 %, L = 840 000 og G = 100 000. Riktig formel gir "
         "1 236 000 + 0,181 × 710 000 = 1 364 510. Uten tak blir det 1 388 040. Med klammen blir det 1 368 365.</p>"
         "<p><b>Husk:</b> reguler først, legg til 18,1 % av min(inntekt; 7,1 G) etterpå.</p>",
)

statisk(
    "pen-s22", hjelp=HJELP["pen-s22"], tema="pensjon", type="formel",
    q="<p>En person har hatt pensjonsgivende inntekt under 7,1 G i n år. Lønnen har fulgt lønnsveksten. D er "
      "delingstallet ved uttak. Hvilket uttrykk gir kompensasjonsgraden fra folketrygden, altså årlig pensjon delt på "
      "sluttlønnen?</p>",
    alternativer=[
        R("0,181 × n / D"),
        F("0,181 × D / n", "Telleren og nevneren er byttet. Flere år gir høyere pensjon. Høyere delingstall gir lavere."),
        F("0,181 × n × D", "Delingstallet er brukt som multiplikator. Beholdningen deles på delingstallet."),
        F("0,181 / (n × D)", "Antall år står i nevneren. Flere år i arbeid gir høyere beholdning, ikke lavere."),
    ],
    kort="<p><b>0,181 × n / D.</b> Beholdningen er 0,181 × n sluttlønner. Årlig pensjon er beholdningen delt på D.</p>",
    full="<p><b>Hva kompensasjonsgraden er.</b> Kompensasjonsgraden er årlig pensjon delt på sluttlønnen. Når lønnen "
         "har fulgt lønnsveksten og ligger under taket, finnes en snarvei.</p>"
         "<p><b>Steg 1: beholdningen.</b> Hvert år gir 18,1 % av lønnen. Fordi beholdningen reguleres med samme "
         "lønnsvekst som lønnen, er hvert års opptjening verdt 0,181 sluttlønner ved uttak. Etter n år er beholdningen "
         "0,181 × n sluttlønner.</p>"
         "<p><b>Steg 2: årlig pensjon.</b> Beholdning/delingstall = 0,181 × n / D sluttlønner.</p>"
         "<p><b>Steg 3: kompensasjonsgraden.</b> Delt på sluttlønnen gir det 0,181 × n / D.</p>"
         "<p><b>Kontroll med tall:</b> n = 40 og D = 17,08 gir 0,181 × 40 / 17,08 = 42,39 %. Det er tallet for Marit i "
         "manualen, som har tjent 5 G i 40 år. Sjekk retningen: flere år øker andelen, høyere delingstall senker den.</p>"
         "<p><b>Over taket:</b> da teller bare 7,1 G. Uttrykket ganges med 7,1 / lønnen i G.</p>"
         "<p><b>Husk:</b> kompensasjonsgrad under taket = 18,1 % × antall år / delingstall.</p>",
)
