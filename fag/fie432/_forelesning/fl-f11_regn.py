"""Regneskript for settet fl-f11: F11 Skatteparadiser (forelesning 11, 2026, med GS1 og SS)."""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f11")


def o(tekst, *tall):
    return (tekst, list(tall))


# ================= Oppgave 1: hva et skatteparadis er =================
a1 = S.ledd("a", "<p>Hvilken påstand er riktig?</p>",
    riktig="Et holdingselskap som lovlig utsetter skatt i hjemlandet er tax avoidance, mens en skjult bankkonto er tax evasion",
    gale=["Tax avoidance er ulovlig skatteunndragelse, mens tax evasion er lovlig skatteplanlegging innenfor reglene",
          "OECD fører en offisiell liste over skatteparadiser som avgjør om et land eller en delstat regnes som paradis",
          "Hemmelighold finnes bare i små øystater, ikke i delstater som Delaware og Nevada eller i Storbritannia"],
    solution=begrep(
        "Tax avoidance er skatteplanlegging innenfor loven, tax evasion er unndragelse og ulovlig. Paradisene brukes til begge deler.",
        "Holdingselskapet er avoidance og den skjulte kontoen evasion.",
        [("Avoidance er ulovlig", "begrepene er byttet om. Unndragelse er «evasion»."),
         ("Offisiell OECD-liste", "det finnes ingen offisiell definisjon. IMF og OECD gikk bort fra listene av politiske grunner. Frivillige organisasjoner lager egne."),
         ("Bare øystater", "et paradis kan være en delstat som Delaware eller Nevada. GS1 viser at det er lettere å få anonyme selskaper i USA og Storbritannia enn i mange øystater.")],
        kilde="F11 lb 2–3, GS1 s. 168–170 og 176"),
    dekker=["f11-definisjon-01", "f11-definisjon-05", "f11-definisjon-17"])

b1 = S.ledd("b", "<p>Hvilken kombinasjon skiller ifølge Schjelderup (GS1) et skatteparadis fra et vanlig land med lave skatter?</p>",
    riktig="Inngjerdede regler, et særregime som sikrer hjemsted for skattefrie selskaper og hemmelighold uten effektivt tilsyn",
    gale=["En lav skattesats på all inntekt, både for selskapene som er registrert der og for innbyggerne som bor der",
          "Liten befolkning, beliggenhet på en øy og engelsk rett med sterk investorbeskyttelse og engelsk som forretningsspråk",
          "At landet står på OECDs svarteliste og ikke deltar i den automatiske utvekslingen av kontoopplysninger"],
    solution=begrep(
        "Mange land har lav skatt på enkelte aktiviteter uten å være paradis. Det er kombinasjonen av inngjerding, et særregime for skattemessig hjemsted og privat informasjon som gjør paradiset attraktivt og skaper skade i andre land.",
        "De tre kjennetegnene i GS1.",
        [("Lav sats for alle", "lav skatt alene definerer ikke et paradis. Innbyggerne betaler vanlig skatt."),
         ("Liten øy med engelsk rett", "trekk Hines (2010) finner hos mange paradiser. De er beskrivende, ikke det som skiller dem ut."),
         ("Svarteliste og CRS", "nesten alle paradisene deltar i Global Forum og CRS. Deltakelse sier lite om hva som er et paradis.")],
        kilde="GS1 s. 171, F11 lb 6"),
    dekker=["f11-definisjon-02"])

c1 = S.ledd("c", "<p>Et land lar utenlandskeide holdingselskaper uten aktivitet i landet betale 0 % skatt, mens selskaper som driver lokalt betaler vanlig skatt. Hva følger av dette ifølge forelesningen?</p>",
    riktig="Landet viser selv at regimet er skadelig: var det vekstfremmende, ville lokale bedrifter også fått bruke det",
    gale=["Regimet fremmer vekst i landet, siden kapitalen holdingselskapene henter inn blir investert i lokal virksomhet",
          "Landets egne innbyggere slipper skatt, siden skattesystemet er inngjerdet mot resten av verden",
          "Skattesvik er straffbart for de utenlandske investorene i landet, men ikke for innbyggerne som bor der"],
    solution=begrep(
        "Inngjerding betyr to sett regler: gunstige for utlendinger uten aktivitet og vanlige for dem som bor og driver der. Selskapene må investere andre steder. Revealed preference: at paradiset ikke lar reglene gjelde lokalt, avslører at det selv ser dem som skadelige.",
        "Regimet er inngjerdet og avslørt skadelig.",
        [("Fremmer vekst", "selskapene får ikke drive lokalt. Kapitalen investeres i andre land. Skaden oppstår der."),
         ("Innbyggerne slipper skatt", "snudd. Innbyggerne betaler vanlig skatt, det gunstige regimet er for utlendinger."),
         ("Straffbart for utlendinger", "snudd. Skattesvik er straffbart for innbyggerne, mens utenlandske investorer ikke betaler skatt der.")],
        kilde="F11 lb 6, GS1 s. 171–172 og 179"),
    dekker=["f11-definisjon-03", "f11-definisjon-04"])

d1 = S.ledd("d", "<p>Hvilken påstand om hvordan skatteparadisene tjener penger og holder på hemmeligholdet er riktig?</p>",
    riktig="De lever av gebyrer for registrering, konto og lokale styremedlemmer og trenger ikke tilsyn med selskaper som verken driver eller skatter der",
    gale=["De lever av selskapsskatten fra de utenlandske selskapene og konkurrerer med hverandre om de samme kundene uten å spesialisere seg",
          "Sekretessen gjelder bare banksekretesse, mens eierstrukturer som truster, stiftelser og stråmenn står i offentlige registre over reelle eiere",
          "Registrering i paradiset er nok til å gi selskapet skattemessig hjemsted der, så lokale styremedlemmer og stråmenn er overflødige"],
    solution=begrep(
        "Forretningsmodellen er gebyrer i bytte mot sekretesse og nullskattevilkår, med spesialisering (Cayman fond, BVI skallselskaper). Fordi selskapene ikke driver lokalt eller betaler skatt, har paradiset ingen grunn til tilsyn.",
        "Gebyrer og fravær av tilsyn følger av modellen.",
        [("Lever av selskapsskatt", "selskapene betaler ikke skatt der. Paradisene skjermer seg mot konkurranse ved å spesialisere seg."),
         ("Bare banksekretesse", "sekretessen har tre deler: banksekretesse, skjulte eierstrukturer uten register over reelle eiere og ingen informasjonsutveksling."),
         ("Registrering er nok", "hjemstedet følger av hvor «central management and control» utøves. Derfor brukes lokale styremedlemmer, ofte som stråmenn.")],
        kilde="F11 lb 5 og 8–9, GS1 s. 174–176"),
    dekker=["f11-definisjon-06", "f11-definisjon-07", "f11-definisjon-09", "f11-definisjon-12"])
S.oppgave("Hva er et skatteparadis?", "Skatteparadis", [13], "<p>Oppgaven bygger på forelesningen og Schjelderup (2016), «Secrecy Jurisdictions» (GS1).</p>", [a1, b1, c1, d1])

# ================= Oppgave 2: lekkasjene og UBS =================
bot, navn, belonning, kieber = 780, 4450, 104, 4500
a2 = S.ledd("", "<p>Hvilken påstand om lekkasjene fra sveitsiske og liechtensteinske banker er riktig?</p>",
    riktig=o(f"Etter Birkenfelds varsling betalte UBS {kr(bot)} mill. dollar til USA. Tilliten til bankene brast, og saken førte til FATCA og CRS"
             .replace(", og saken", ". Saken"), kr(bot)),
    gale=[o(f"UBS betalte {kr(belonning)} mill. dollar i bot til USA. Saken førte til TIEA-avtaler med automatisk utveksling av kontoopplysninger",
            kr(belonning)),
          o(f"Heinrich Kieber solgte data om {kr(kieber)} UBS-konti til USA. Saken førte til at Sveits innførte offentlige kontoregistre",
            kr(kieber)),
          "Falciani ble utlevert fra Spania til Sveits, fordi det er straffbart i de fleste land å avsløre kunders skatteunndragelse"],
    solution=begrep(
        f"Birkenfeld varslet i USA i 2007. UBS betalte {kr(bot)} mill. dollar og utleverte {kr(navn)} navn. Tilliten mellom sveitsiske banker og kundene brast, og saken førte til FATCA (2010) og CRS (vedtatt 2014, første utveksling 2017)."
        .replace(", og saken", ". Saken"),
        "UBS-saken ble vendepunktet mot automatisk utveksling.",
        [(f"{kr(belonning)} mill. dollar i bot", f"{kr(belonning)} mill. var Birkenfelds varslerbelønning. TIEA krever forespørsel om en bestemt skattyter og er ikke automatisk."),
         ("Kieber og UBS", "Kieber solgte data om ca. 4 500 konti i LGT (Liechtenstein) til tysk etterretning."),
         ("Falciani utlevert", "Spania avslo utlevering to ganger, fordi det ikke er straffbart i andre land å avsløre skatteunndragelse.")],
        kilde="F11 lb 10–13, GS1 s. 172 og 180–181"),
    dekker=["f11-informasjonsutveksling-02", "f11-informasjonsutveksling-08", "f11-informasjonsutveksling-03", "f11-skadevirkninger-09"])
S.oppgave("Varslerne i bankene", "Skatteparadis", [13], "<p>Fra 2006 til 2008 lekket ansatte i tre banker data om kunder som skjulte formue for skattemyndighetene i hjemlandet.</p>", [a2])

# ================= Oppgave 3: etterlevelse av egne regler =================
a3 = S.ledd("", "<p>Hvilken påstand om hvordan skatteparadisene etterlever egne regler er riktig?</p>",
    riktig="Kypros' selskapsregister var ti år på etterskudd i 2012. DN måtte få rettsordre for innsyn, selv om landet er med i EU",
    gale=["Trustregistrene i paradisene gir andre lands skattemyndigheter innsyn i hvem som står bak en trust",
          "Financial Secrecy Index og Corporate Tax Haven Index er to navn på den samme rangeringen av land etter lave skattesatser",
          "På Jersey gir registeret over reelle eiere reelt innsyn, siden nominee-aksjonærer ikke er tillatt der"],
    solution=begrep(
        "Paradisene har lite tilsyn med egne registre. Kypros er EU-medlem, men registeret var ti år på etterskudd, dokumenter ble ikke sjekket og regelbrudd ga ingen straff.",
        "Kypros-eksemplet.",
        [("Trustregistre", "registrene er frivillige, gjelder bare lokale eller er lukket. En trust er en privat avtale som myndighetene ikke kjenner til."),
         ("FSI og CTHI", "to ulike indekser. FSI måler hemmelighold vektet med finanseksport, CTHI måler selskapers skatteunngåelse."),
         ("Jersey og nominees", "en tidligere sjeføkonom på Jersey skrev at nominee-aksjonærer var utbredt og signerte udaterte salgsskjema. Opplysningsplikten er lite mer enn «window-dressing».")],
        kilde="F11 lb 14–18, GS1 s. 176–178, SS s. 243–245"),
    dekker=["f11-definisjon-14", "f11-definisjon-15", "f11-definisjon-16", "f11-norge-07"])
S.oppgave("Registrene i paradisene", "Skatteparadis", [13], "", [a3])

# ================= Oppgave 4: BVI, Mauritius og Jersey =================
innb, selsk, avg, bnp = 31_000, 900_000, 30_000, 48_200
per_innb = selsk / innb
andel = avg / bnp
body4 = (f"<p>De britiske jomfruøyene (BVI) hadde i 2021 om lag {kr(innb)} innbyggere og {kr(selsk)} offshoreselskaper. "
         f"Avgiftene fra selskapene ga rundt {kr(avg)} dollar per innbygger i 2023, mens BNP per innbygger var {kr(bnp)} dollar.</p>")
a4 = S.ledd("", "<p>Hvilken påstand er riktig?</p>",
    riktig=o(f"BVI har om lag {kr(per_innb)} selskaper per innbygger. Avgiftene tilsvarer {kr(100 * andel)} % av BNP per innbygger",
             kr(per_innb), kr(100 * andel)),
    gale=["Et GBC1-selskap på Mauritius betaler full sats, siden kreditten bare gis for skatt som faktisk er betalt i utlandet",
          "Jersey avskaffet inngjerdingen i 2008, siden alle selskaper fikk samme sats uansett hvem som eier dem",
          "DN fant regnskapene til Juris Ltd på Jersey, men ikke hvem som satt i styret eller eide Formel 1-aksjene"],
    solution=sol(
        "Paradisene lever av gebyrer. I små land som BVI utgjør avgiftene en stor del av BNP.",
        [f"Selskaper per innbygger: {kr(selsk)}/{kr(innb)} = <b>{kr(per_innb, 1)}</b>.",
         f"Andel av BNP: {kr(avg)}/{kr(bnp)} = <b>{pst(andel, 1)}</b>."],
        [("GBC1 full sats", "Mauritius gir en automatisk kreditt på 80 % uansett om skatt er betalt ute. 15 % × 0,2 = 3 %."),
         ("Jersey avskaffet inngjerdingen", "0/10/20-systemet fra 2008 gir 0 % til mobile grunnlag og skatt på lokal forsyning og eiendom. Inngjerdingen er bare utformet annerledes."),
         ("Regnskapene til Juris Ltd", "det fantes ingen regnskaper, ingen kontaktperson og ingen bekreftelse på styre.")],
        kontroll="830 000 selskaper er GS1-tallet for 2012. Lysbildet bruker 900 000 for 2021.",
        kilde="F11 lb 5 og 19–22, GS1 s. 172–175"),
    dekker=["f11-definisjon-08", "f11-definisjon-10", "f11-definisjon-11", "f11-definisjon-13"])
S.oppgave("Jomfruøyene, Mauritius og Jersey", "Skatteparadis", [13], body4, [a4])

# ================= Oppgave 5: skadevirkninger =================
a5 = S.ledd("a", "<p>Hvilken påstand om hvordan skatteparadisene skader andre land er riktig?</p>",
    riktig="Hemmeligholdet gir asymmetrisk informasjon, som skaper moralsk hasard og transaksjonskostnader for tredjeparter",
    gale=["Skadene gjelder bare tapte skatteinntekter i andre land, ikke ulykker, terrorfinansiering eller ulovlig fiske",
          "Skadene rammer bare fattige land, siden rike land har kapasitet til å skattlegge kapital effektivt",
          "Akerlof, Spence og Stiglitz viste at privat informasjon gjør markedene mer effektive"],
    solution=begrep(
        "Akerlof, Spence og Stiglitz (Nobelprisen 2001) viste at informasjonsasymmetri gir moralsk hasard og transaksjonskostnader. Paradisenes lovgivning skaper slik asymmetri og senker kostnaden ved lovbrudd.",
        "Asymmetrisk informasjon.",
        [("Bare skatt", "eksempler er Scandinavian Star, der eieren var skjult i Bahamas, finansiering av 9/11 og fiskebåten Elektron."),
         ("Bare fattige land", "både rike og fattige land skades, men fattige mest fordi de er avhengige av kapitalinntekt."),
         ("Mer effektive markeder", "snudd. Asymmetrien hemmer markedene.")],
        kilde="F11 lb 24–26, GS1 s. 169 og 181"),
    dekker=["f11-skadevirkninger-01", "f11-skadevirkninger-04", "f11-skadevirkninger-05"])

b5 = S.ledd("b", "<p>Hvilken påstand er <b>ikke</b> blant de sju skadevirkningene i NOU-rapporten «Skatteparadiser og utvikling» (2009)?</p>",
    riktig="Paradisene får rike land til å sette høyere skattesatser på kapital enn innbyggerne ønsker",
    gale=["Paradisene griper inn i andre lands suverenitet ved at de stjeler skatteproveny fra dem",
          "Paradisene øker kostnadene ved beskatning gjennom asymmetrisk informasjon og internprising",
          "Paradisene gjør det mer lønnsomt å drive økonomisk kriminalitet, fordi utbyttet kan skjules"],
    solution=begrep(
        "De sju: (1) suverenitet, (2) finansmarkedene, (3) kostnadene ved beskatning, (4) vekst i fattige land, (5) kriminalitet, (6) privat inntekt og (7) institusjonell kvalitet. Slemrod og Wilson viser det motsatte av påstanden: land setter <i>lavere</i> skatt enn innbyggerne ønsker.",
        "Høyere skattesatser står ikke på listen.",
        [("Suverenitet", "punkt 1. Paradisene lar andre lands skattytere unngå skatt ved kilden."),
         ("Kostnadene ved beskatning", "punkt 3."),
         ("Kriminalitet", "punkt 5.")],
        kilde="F11 lb 25, F11 REV lb 28, SS s. 251"),
    dekker=["f11-skadevirkninger-02", "f11-skadevirkninger-03"])
S.oppgave("Skadevirkningene", "Skatteparadis", [13], "<p>Forelesningen bygger på NOU-rapporten «Skatteparadiser og utvikling», som Schjelderup ledet. Den bygger også på GS1.</p>", [a5, b5])

# ================= Oppgave 6: internprising =================
eksp, imp = 20, 85
gebyr = {"Bermuda (distribusjon)": 26, "Luxembourg (finans)": 13, "Cayman (innkjøp)": 12, "Jersey (ledelse)": 9, "Irland (merkevare)": 5}
assert sum(gebyr.values()) == imp - eksp
liste = ", ".join(f"{k} kr {v}" for k, v in gebyr.items())
body6 = (f"<p>Et konsern produserer kaffe i Etiopia og selger den i Norge. Eksportprisen er kr {eksp} per kilo og importprisen i Norge kr {imp}. "
         f"Mellom disse ligger interne betalinger til datterselskaper: {liste}. Skattbart overskudd er kr 1 per kilo i både Etiopia og Norge.</p>")
body6 = body6.replace(", Irland", " og Irland")
a6 = S.ledd("", "<p>Hvilken påstand er riktig?</p>",
    riktig="Prisene mellom datterselskapene settes internt, så både Etiopia og Norge mister skattegrunnlag",
    gale=["Prisene mellom datterselskapene settes i et marked, så betalingene til paradisene er reelle tjenester",
          "Etiopia tjener uansett på konsernet, fordi økt lønn og produksjon veier opp for tapt selskapsskatt",
          "Norske CFC-regler stopper dette automatisk, uten at eierne selv må opplyse om selskapene"],
    solution=begrep(
        f"Gapet {imp} − {eksp} = {imp - eksp} kr forsvinner i interne betalinger til paradisene. Fordi prisene settes internt, kan overskuddet flyttes og myndighetene i både produksjons- og forbrukslandet mister skattegrunnlag.",
        "Internprising flytter overskuddet ut av begge land.",
        [("Settes i et marked", "det er nettopp fordi prisene settes internt at overskuddet kan flyttes."),
         ("Etiopia tjener uansett", "Gresik mfl. (2020): land med svake institusjoner som er avhengige av selskapsskatt, kan tape på slike selskaper."),
         ("CFC-regler virker automatisk", "reglene krever at skattyterne selv opplyser om eierandelen. Nominees og manglende rapportering omgår dem.")],
        kilde="F11 lb 27–28, SS s. 245–246 og 251–252, GS1 s. 175–176"),
    dekker=["f11-profittflytting-01", "f11-profittflytting-02", "f11-profittflytting-03"])
S.oppgave("Kaffen fra Etiopia", "Skatteparadis", [13], body6, [a6])

# ================= Oppgave 7: institusjoner og privat inntekt =================
a7 = S.ledd("", "<p>Hvilken påstand om skatteparadiser og økonomisk utvikling er i tråd med forelesningen?</p>",
    riktig="Om et ressursrikt land vinner eller taper avhenger av institusjonene. Paradisene gir eliten grunn til å svekke dem",
    gale=["Rikdommens paradoks forklares av hollandsk syke, helt uavhengig av kvaliteten på de offentlige institusjonene i landet",
          "Paradisene øker privat inntekt, fordi de gir mange nye inntektsmuligheter i uproduktiv virksomhet",
          "At de fleste landene sør for Sahara fikk presidentstyre, skyldes bare kolonihistorien deres"],
    solution=begrep(
        "Mehlum mfl. og Boschini mfl.: ressursrike land blir vinnere eller tapere avhengig av institusjonene. Paradisene gjør det lettere å skjule stjålne midler og gir eliten insentiv til å svekke institusjonene.",
        "Institusjonene avgjør og paradisene svekker dem.",
        [("Hollandsk syke", "forklarer ikke hvorfor institusjonene svekkes. Andersen og Aslaksen: paradokset rammer land med dårlige institusjoner."),
         ("Øker privat inntekt", "bandittmodellen: flere går til uproduktiv virksomhet og inntekten faller for alle, et slags fangens dilemma."),
         ("Bare historie", "5 av 27 land hadde presidentstyre ved uavhengighet, 24 av 27 i 2009. Robinson og Torvik viser at historie ikke forklarer skiftet.")],
        kilde="F11 lb 29–37, GS1 s. 184–187"),
    dekker=["f11-skadevirkninger-06", "f11-skadevirkninger-07", "f11-skadevirkninger-08"])
S.oppgave("Ressursrike land og paradisene", "Skatteparadis", [13], "<p>Land med mye naturressurser har i snitt hatt lavere vekst enn andre land.</p>", [a7])

# ================= Oppgave 8: skattekonkurranse og BEPS =================
a8 = S.ledd("", "<p>Hvilken påstand om skattekonkurranse og overskuddsflytting er riktig?</p>",
    riktig="Slemrod og Wilson viser at paradisene får land til å sette lavere kapitalskatt enn innbyggerne ønsker, så velferden faller",
    gale=["All forskning finner at paradisene bare skader, også modellene der mobil kapital slipper unna en ineffektiv skatt i vertslandet",
          "BEPS er ulovlig skatteunndragelse, siden overskuddet flyttes til land med lite økonomisk aktivitet",
          "Forslaget om å senke norsk kapitalskatt fra 28 til 20 % ble bare begrunnet med nasjonale hensyn"],
    solution=begrep(
        "Paradiser som selger «skjuletjenester» øker samfunnskostnaden ved kapitalbeskatning. Landene setter lavere skatter enn innbyggerne ønsker. Velferden faller.",
        "Slemrod og Wilson (2009).",
        [("All forskning", "Desai mfl. og Hong og Smart finner at paradiser kan øke velferden. Gresik mfl. viser at overskuddsflytting kan snu dette. Litteraturen gir motstridende svar."),
         ("BEPS er ulovlig", "BEPS utnytter hull og mismatch i reglene. Det meste er lovlig."),
         ("Bare nasjonale hensyn", "Skatteutvalget (NOU 2014:13) begrunnet kuttet med å tiltrekke kapital og hindre overskuddsflytting.")],
        kilde="SS s. 241–242 og 251, GS1 s. 179"),
    dekker=["f11-profittflytting-04", "f11-profittflytting-05", "f11-profittflytting-06"])
S.oppgave("Skattekonkurranse", "Skatteparadis", [13], "<p>Flernasjonale selskaper kan flytte overskudd til paradiser gjennom internpriser, royalty og rentebærende gjeld til finansieringsselskaper.</p>", [a8])

# ================= Oppgave 9: CRS =================
body9 = "<p>Norges Banks hovedstyre skrev i april 2020 at både Jersey og Caymanøyene er medlemmer av OECDs Global Forum.</p>"
a9 = S.ledd("a", "<p>Hvilken påstand om Global Forum og CRS er riktig?</p>",
    riktig="Bare skattemyndighetene mottar CRS-opplysningene, og USA deltar ikke i utvekslingen".replace(", og USA", ". USA"),
    gale=["CRS gir allmennheten innsyn i hvem som eier selskaper og kontoer i paradisene",
          "At et land deltar i Global Forum og CRS viser at det heller ikke åpner for aggressiv skatteplanlegging",
          "Under CRS må et land navngi en bestemt skattyter før paradiset utleverer opplysninger"],
    solution=begrep(
        "CRS er OECDs standard for automatisk utveksling av kontoopplysninger mellom skattemyndigheter. Opplysningene brukes til skattekontroll, ikke til offentlig innsyn.",
        "Bare skattemyndighetene mottar dem og USA er ikke med.",
        [("Allmennheten", "avtalene gir ikke innsyn for tredjepart."),
         ("Ikke aggressiv planlegging", "CRS er OECDs spor 1 om informasjonsutveksling. Aggressiv planlegging er spor 2 (BEPS). Brukes medlemskap som kriterium, er nesten ingen paradiser igjen."),
         ("Navngi en skattyter", "det er TIEA, der «fishing expeditions» avvises. CRS er automatisk.")],
        kilde="F11 lb 38–40, SS s. 243–245 og 253, GS1 s. 170"),
    dekker=["f11-informasjonsutveksling-01", "f11-informasjonsutveksling-03", "f11-informasjonsutveksling-04", "f11-ss-sentralbanken-04"])

b9 = S.ledd("b", "<p>Hvilken påstand om virkningene av CRS er riktig?</p>",
    riktig="Innskudd i klassiske paradiser falt, men mye ble trolig flyttet til USA i stedet for å bli skattlagt",
    gale=["I Danmark ga økt selvrapportering den største inntektseffekten, særlig blant dem med høye utenlandsinntekter",
          "Automatisk utveksling forklarer hele nedgangen i pengestrømmene til klassiske skatteparadis",
          "Alle land bruker dataene fullt ut, siden standarden gir lik datakvalitet og samme skatteår"],
    solution=begrep(
        "Casi, Spengel og Stage (2020): CRS reduserte innskudd i klassiske paradiser med 11,5–32,3 %, mens innskudd i USA økte med om lag 55 mrd. dollar. Tilpasning snarere enn eliminering.",
        "Pengene ble flyttet, ikke nødvendigvis skattlagt.",
        [("Selvrapportering i Danmark", "repatriering ga størst effekt. Selvrapporteringen ble tredoblet, men mest blant dem med lave utenlandsinntekter."),
         ("Hele nedgangen", "strømmene falt med om lag en tredjedel. Automatisk utveksling anslås å stå for rundt to tredjedeler av nedgangen."),
         ("Alle bruker dataene", "datakvaliteten varierer, skatteår er ulike og fattige land mangler kapasitet.")],
        kilde="F11 lb 41–43 og 46"),
    dekker=["f11-informasjonsutveksling-05", "f11-informasjonsutveksling-06", "f11-informasjonsutveksling-07"])
S.oppgave("Global Forum og CRS", "Skatteparadis", [13], body9, [a9, b9])

# ================= Oppgave 10: frivillig retting =================
arv, aar0, aar1 = 2_000_000, 2012, 2026
body10 = (f"<p>Per arvet i {aar0} kr {kr(arv)} som står på en konto i Sveits og aldri er oppgitt til skatt. "
          f"I {aar1} melder han selv fra til Skatteetaten før etaten har oppdaget kontoen.</p>")
a10 = S.ledd("", "<p>Hvilken påstand er riktig?</p>",
    riktig="Han slipper tilleggsskatt og straffeforfølgning, men betaler ordinær skatt og renter, normalt opptil ti år tilbake",
    gale=["Han slipper all skatt på kontoen, slik familien Ditlev-Simonsen fikk etter at de selv meldte fra i 2007",
          "Navnet hans blir offentlig, så frivillig retting har en omdømmekostnad i tillegg til skatt og renter",
          "Det er like lett å få innvilget frivillig retting etter at Skatteetaten har mottatt CRS-opplysninger om kontoen hans"],
    solution=begrep(
        "Frivillig retting (skatteloven § 10-3 nr. 2 c): den som melder fra før oppdagelse slipper tilleggsskatt og straff, men betaler ordinær skatt og renter, normalt opptil ti år tilbake.",
        "Ingen tilleggsskatt, men skatt og renter.",
        [("Ditlev-Simonsen", "han meldte ikke fra selv. Kontoen ble avslørt via en skilsmissesak. Kravet var foreldet etter tiårsfristen."),
         ("Navnet blir offentlig", "det er ingen offentlighet om hvem som retter opp. Wilhelmsen-saken ble kjent gjennom DN, ikke gjennom ordningen."),
         ("Like lett etter CRS", "det blir vanskeligere etter at CRS-opplysningene er mottatt. Skatteetaten oppfordrer derfor til retting før kontrollen starter.")],
        kilde="F11 lb 44–48"),
    dekker=["f11-norge-02", "f11-norge-03", "f11-norge-04"])
S.oppgave("Per og kontoen i Sveits", "Skatteparadis", [13], body10, [a10])

# ================= Oppgave 11: de rikeste =================
body11 = "<p>Alstadsæter, Johannesen og Zucman (2019) koblet lekkede data fra skatteparadiser med skattedata fra Norge, Sverige og Danmark.</p>"
a11 = S.ledd("", "<p>Hvilken påstand er i tråd med forelesningen?</p>",
    riktig="Unndragelsen er konsentrert hos de aller rikeste, så formuesulikheten er større enn statistikken viser",
    gale=["Unndragelsen er omtrent like stor i alle formuesgrupper, så ulikheten i statistikken er riktig målt",
          "Lekkasjene viser at paradisene først og fremst brukes av kriminelle, ikke av den økonomiske eliten",
          "Paradisene er lette å stenge, siden de store landene ikke har egne interesser i å bevare dem"],
    solution=begrep(
        "De 0,01 % rikeste unndrar 25–30 % av skatten, mot 3 % i snitt. De eier 50 % av formuen i paradisene. Formuesandelen deres i Norge øker med om lag 25 % når skjult formue tas med.",
        "Ulikheten er undervurdert.",
        [("Like stor i alle grupper", "snittet er 3 %, mens de rikeste unndrar 25–30 %."),
         ("Først og fremst kriminelle", "lekkasjene viser at den politiske og økonomiske eliten er de største brukerne."),
         ("Lette å stenge", "makteliten i de store landene bruker dem selv. FSI 2025 rangerer USA som mest hemmelighetsfulle finanssenter.")],
        kilde="F11 lb 49–50, SS s. 252"),
    dekker=["f11-norge-01", "f11-informasjonsutveksling-09", "f11-norge-05"])
S.oppgave("Hvem bruker paradisene?", "Skatteparadis", [13], body11, [a11])

# ================= Oppgave 12: inntekt fra paradis uten skatteavtale =================
lonn, tpar, tno = 300_000, 0.10, 0.40
no_full, par = lonn * tno, lonn * tpar
no_kred = no_full - min(par, no_full)
body12 = (f"<p>Lise er bosatt i Norge og tjener kr {kr(lonn)} i lønn i et skatteparadis som skattlegger lønnen med {pst(tpar, 0)}. "
          f"Norge har ingen skatteavtale med landet. Anta at norsk skatt på lønnen er {pst(tno, 0)} og at Norge ikke gir ensidig kreditfradrag i denne oppgaven.</p>")
a12 = S.ledd("", "<p>Hvor mye skatt betaler Lise i hvert land?</p>",
    riktig=o(f"Norge kr {kr(no_full)} og paradiset kr {kr(par)}", kr(no_full), kr(par)),
    gale=[o(f"Norge kr {kr(no_kred)} og paradiset kr {kr(par)}", kr(no_kred), kr(par)),
          o(f"Norge kr 0 og paradiset kr {kr(par)}", "0", kr(par)),
          o(f"Norge kr {kr(no_full)} og paradiset kr 0", kr(no_full), "0")],
    solution=sol(
        "Uten skatteavtale har både bostedslandet og kildelandet beskatningsrett etter egen intern rett. Uten kredit blir inntekten dobbeltbeskattet.",
        [f"Norge (globalinntekt): {kr(lonn)} × 40 % = <b>{kr(no_full)}</b>.",
         f"Paradiset (kilde): {kr(lonn)} × 10 % = <b>{kr(par)}</b>."],
        [(f"Norge kr {kr(no_kred)}", "kreditmetoden, som en avtale ville gitt. Oppgaven sier at det ikke gis kredit."),
         ("Norge kr 0", "unntaksmetoden, der kildestaten skattlegger alene. Den krever en avtale."),
         ("Paradiset kr 0", "glemmer at kildelandet kan skattlegge etter sin interne rett.")],
        kontroll="Samme løsning som eksamensfasitene i H2021 o4 og H2024 o10.",
        kilde="H2021 o4, H2024 o10d–e"),
    dekker=["f11-norge-06"])
S.oppgave("Lise jobber i et skatteparadis", "Internasjonal skatt", [13], body12, [a12])

# ================= Oppgave 13: SS og Norges Bank =================
body13 = "<p>Schjelderup og Sævold (2021) analyserer hvordan Norges Bank håndterte skatteparadisene da Nicolai Tangen ble ansatt som sjef for NBIM.</p>"
a13 = S.ledd("", "<p>Hvilken påstand er i tråd med artikkelen?</p>",
    riktig="Norges Bank la til grunn en snevrest mulig definisjon av paradiser og en snever tolkning av eget ansvar",
    gale=["Norges Bank stilte ingen krav til Tangen, verken om skattemessig bosted i Norge eller om strukturene han eide i paradisene",
          "NBIMs forventninger om skatt og åpenhet viser bare til om et land deltar i CRS-samarbeidet",
          "Forfatterne hevder at Tangen brøt norsk lov og kaller bruken av paradiser en bransjestandard"],
    solution=begrep(
        "SS beskriver fire aspekter: snevrest mulig definisjon, uklar holdning til aggressiv skatteplanlegging, nedtoning av skadevirkningene og snever tolkning av eget ansvar.",
        "To av de fire aspektene.",
        [("Ingen krav", "styret krevde at Tangen skulle være skattemessig bosatt i Norge og avvikle en trust på Jersey."),
         ("Bare CRS", "forventningsdokumentet (2017): skatt der verdiene skapes, styrets ansvar og offentlig land-for-land-rapportering."),
         ("Tangen brøt loven", "artikkelen kritiserer Norges Banks tolkning, ikke lovbrudd. Det var sentralbanksjef Olsen som kalte bruken en bransjestandard. SS sammenligner med barnearbeid.")],
        kilde="SS s. 240–254"),
    dekker=["f11-ss-sentralbanken-01", "f11-ss-sentralbanken-02", "f11-ss-sentralbanken-03", "f11-ss-sentralbanken-05"])
S.oppgave("Norges Bank og Tangen-saken", "Skatteparadis", [13], body13, [a13])

S.skriv(
    label="F11 Skatteparadiser",
    note="Hva et skatteparadis er, forretningsmodellen og hemmeligholdet, lekkasjene og CRS, skadevirkningene og norske saker, med GS1 og Schjelderup og Sævold.",
    facts=[f"{S.n} flervalg med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Mest tekst: les hvert alternativ som en påstand og se etter ordet som snur den («bare», «alltid», «automatisk»). Hold bot, belønning og antall navn i UBS-saken fra hverandre. Skill TIEA fra CRS.")
