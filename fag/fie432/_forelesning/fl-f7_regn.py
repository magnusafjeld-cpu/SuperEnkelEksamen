"""Regneskript for settet fl-f7: F7 Skatt og emigrasjon, rettferdig skattesystem, flat skatt og borgerlønn."""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from datetime import date
from felles import *

S = Sett("fl-f7")

# =====================================================================
# Oppgave 1: Ingrid flytter til Spania (bosted, utflytting)
# =====================================================================
flytteaar = 2026
utflyttet = flytteaar + 4          # tre hele inntektsår etter utflyttingsåret
under10 = flytteaar + 1            # botid under ti år, over 61 dager i utflyttingsåret
feil_teller_flytteaar = flytteaar + 3
feil_fire_aar = flytteaar + 5
assert (utflyttet, under10, feil_teller_flytteaar, feil_fire_aar) == (2030, 2027, 2029, 2031)

o1a = S.ledd("a", "<p>Fra hvilket inntektsår kan Ingrid tidligst anses som skattemessig utflyttet?</p>",
    riktig=f"Fra inntektsåret {utflyttet}",
    gale=[f"Fra inntektsåret {under10}", f"Fra inntektsåret {feil_teller_flytteaar}", f"Fra inntektsåret {feil_fire_aar}"],
    solution=sol(
        "Med minst ti års botid opphører bostedet først etter utløpet av det tredje inntektsåret etter utflyttingsåret. Alle tre vilkårene må være oppfylt i hvert av disse årene.",
        steg=[f"Utflyttingsåret er {flytteaar}. Det teller ikke.",
              f"De tre hele inntektsårene etter er {flytteaar + 1}, {flytteaar + 2} og {flytteaar + 3}.",
              f"Ingrid er utflyttet fra inntektsåret <b>{utflyttet}</b>."],
        gale=[(f"{under10}", "regelen for botid under ti år: bostedet opphører da 1. januar året etter når hun har vært over 61 dager i Norge i utflyttingsåret. Ingrid har bodd her hele livet."),
              (f"{feil_teller_flytteaar}", "teller utflyttingsåret som ett av de tre årene."),
              (f"{feil_fire_aar}", "teller fire hele år etter utflyttingsåret i stedet for tre.")],
        kontroll="Lysbildet: flytter du i 2026 med minst ti års botid, er du tidligst emigrert fra 1. januar 2030.",
        kilde="F7 lb 4 og lb 6"),
    dekker=["f7-bosted-05", "f7-bosted-07"])

o1b = S.ledd("b", "<p>Ingrids bror Erlend flytter til Portugal samme år. Han tar fast opphold der og er i Norge under 61 dager hvert år. Han eier en leilighet i Bergen som han kjøpte for tolv år siden. Den har vært leid ut til andre de siste sju årene. Hvilket utsagn er riktig?</p>",
    riktig="Leiligheten hindrer ikke utflytting, fordi den ble kjøpt over fem år før og ingen i familien har bodd der på fem år",
    gale=["Erlend er skattemessig utflyttet fra dagen Skatteetaten mottar flyttemeldingen, som må sendes senest 14 dager før avreise",
          "Hadde Erlend flyttet til Sverige i stedet, måtte han ha meldt flyttingen både til Skatteetaten og til svenske myndigheter",
          "Det er nok at to av de tre vilkårene for utflytting er oppfylt hvert år, så leiligheten spiller uansett ingen rolle"],
    solution=begrep(
        "Utflytting krever at alle tre vilkårene er oppfylt samtidig: fast opphold ute, høyst 61 dager i Norge og ingen bolig som du eller nærstående disponerer. Unntak: en bolig anskaffet minst fem år før utflyttingen, som verken du eller nærstående har brukt som bolig de siste fem årene, regnes ikke som disponert.",
        "Leiligheten hindrer ikke utflytting.",
        [("Fra flyttemeldingen", "flyttemeldingen er nødvendig, men ikke nok. Du er først emigrert når Skatteetaten godkjenner det gjennom skattemeldingen. Du må levere skattemelding hvert år fram til vedtaket."),
         ("Sverige", "ved flytting til et annet nordisk land meldes flyttingen bare i landet du flytter til."),
         ("To av tre", "alle tre vilkårene må være oppfylt på én gang.")],
        kilde="F7 lb 4, lb 5, lb 7 og lb 9"),
    dekker=["f7-bosted-04", "f7-bosted-08", "f7-bosted-09", "f7-bosted-12"])

o1c = S.ledd("c", "<p>I årene 2027 til 2029 er Ingrid bosatt i Norge etter norsk intern rett og i Spania etter spansk rett. Hun har fast bolig bare i Spania. Hun eier aksjer i et norsk aksjeselskap og et næringsbygg i Oslo som hun leier ut. Hvilket utsagn er riktig?</p>",
    riktig="Avtalen gjør henne bosatt i Spania. Norge kan da bare skattlegge kildeinntekter, som utbytte og leie herfra",
    gale=["Norsk intern rett går foran skatteavtalen, så Norge kan skattlegge all inntekten hennes fra hele verden til og med 2029",
          "Hun er bosatt i Norge etter skatteavtalen, fordi norsk statsborgerskap går foran fast bolig i rekkefølgen",
          "Norge mister all rett til å skattlegge inntekten, men formuen skattlegges forholdsmessig for dagene hun er her"],
    solution=begrep(
        "Er du bosatt i to land etter intern rett, peker skatteavtalen ut ett bostedsland i fast rekkefølge: fast bolig, sentrum for livsinteresser, vanlig opphold, statsborgerskap og til slutt gjensidig avtale. Fast bolig bare i Spania avgjør. Norge blir kildestat og har begrenset skatteplikt: eiendom i Norge, utbytte fra norske selskaper, lønn opptjent her og norske pensjoner.",
        "Norge kan bare skattlegge kildeinntektene.",
        [("Intern rett går foran", "i overgangsperioden avgjør skatteavtalen hvor du anses bosatt og hva Norge kan skattlegge."),
         ("Statsborgerskap", "statsborgerskap er først det fjerde kriteriet. Fast bolig kommer før."),
         ("All rett mistet", "Norge beholder retten til kildeinntektene. Formuesskatten regnes heller aldri forholdsmessig etter dager. Den avgjøres av om du er bosatt ved årsskiftet.")],
        kilde="F7 lb 8 og AJB s. 60–64"),
    dekker=["f7-bosted-06", "f7-bosted-11", "f7-skatteplikt-02", "f7-skatteplikt-03"])

d31, d32, d33, mellom = 90, 90, 100, 14
sum3 = d31 + d32 + d33
uten = sum3 - mellom
assert sum3 > 270 and uten <= 270
o1d = S.ledd("d", f"<p>Ingrid er nå skattemessig utflyttet. I 2031 og 2032 er hun i Norge {d31} dager hvert år. I 2033 er hun her {d33} dager. {mellom} av dagene i 2033 er mellomlandinger på Gardermoen uten overnatting. Dagene er spredt jevnt over hvert år. Hvilket utsagn er riktig?</p>",
    riktig="Hun blir skattemessig bosatt i Norge igjen fra 1. januar 2033",
    gale=["Hun blir ikke bosatt igjen, fordi hun aldri er i Norge over 183 dager i en tolvmånedersperiode",
          f"Hun blir ikke bosatt igjen, fordi mellomlandinger ikke teller og hun da bare har {uten} dager",
          "Hun blir bosatt fra 1. januar 2033, men formuesskatten for 2033 regnes bare for dagene hun er her"],
    solution=sol(
        "Mer enn 270 dager i Norge i løpet av en 36-månedersperiode gir bosted fra 1. januar i året terskelen passeres. Alle hele eller delvise døgn teller, også en mellomlanding.",
        steg=[f"{d31} + {d32} + {d33} = {sum3} dager i 2031 til 2033.",
              f"{sum3} &gt; 270. Terskelen passeres i 2033.",
              "Ingrid er bosatt <b>fra 1. januar 2033</b>."],
        gale=[("183 dager", "183-dagersregelen er ikke den eneste. 270-dagersregelen fanger opp nettopp dem som er her mye over tid."),
              (f"{uten} dager", "en mellomlanding på norsk flyplass teller som ett døgn. Reglene er absolutte."),
              ("Formuesskatt for dagene", "den som er bosatt ved utgangen av året, er formuesskattepliktig for hele formuen. Formuesskatten fordeles ikke etter dager.")],
        kontroll="270/3 = 90 dager i snitt per år. Ingrid ligger over snittet i 2033.",
        kilde="F7 lb 10 og AJB s. 60–62"),
    dekker=["f7-bosted-03", "f7-bosted-10", "f7-bosted-13"])

S.oppgave("Ingrid flytter til Spania", "Internasjonal skatt", [13],
    "<p>Ingrid har bodd i Norge hele livet. 1. juli 2026 flytter hun til Spania og tar fast opphold der. Hun er i Norge mer enn 61 dager i 2026, men færre enn 61 dager hvert år fra og med 2027. Leiligheten i Oslo selger hun før hun reiser. Ingen nærstående disponerer bolig i Norge.</p>",
    [o1a, o1b, o1c, o1d])

# =====================================================================
# Oppgave 2: Marco kommer til Bergen (183-dagersregelen)
# =====================================================================
start, slutt = date(2026, 10, 1), date(2027, 4, 30)
dager = (slutt - start).days + 1
dager26 = (date(2026, 12, 31) - start).days + 1
dager27 = dager - dager26
assert (dager, dager26, dager27) == (212, 92, 120)
o2 = S.ledd("", "",
    riktig="Fra 1. januar 2027, fordi oppholdet er over 183 dager og fordeler seg på to inntektsår",
    gale=["Fra 1. oktober 2026, fordi han er i Norge over 183 dager i løpet av en tolvmånedersperiode",
          "Han blir ikke bosatt, fordi han er italiensk statsborger med italiensk pass og bostedsadresse",
          "Han blir ikke bosatt, fordi han ikke er i Norge over 183 dager i noe enkelt kalenderår"],
    solution=sol(
        "Mer enn 183 dager i Norge i løpet av en tolvmånedersperiode gir skattemessig bosted. Fordeler dagene seg over to inntektsår, gjelder bostedet fra 1. januar det andre året. Bare oppholdet teller, ikke statsborgerskap, pass eller adresse.",
        steg=[f"1. oktober 2026 til og med 30. april 2027 er {dager} dager, mer enn 183.",
              f"Dagene fordeler seg med {dager26} i 2026 og {dager27} i 2027.",
              "Marco er bosatt <b>fra 1. januar 2027</b>. I 2026 er han begrenset skattepliktig."],
        gale=[("1. oktober 2026", "bosted fra første dag gjelder når de over 183 dagene faller i samme inntektsår."),
              ("Italiensk statsborger", "statsborgerskap, pass og adresse avgjør ikke. Kriteriet er lengden av oppholdet."),
              ("Kalenderår", "perioden er tolv måneder regnet fra dato til dato, ikke kalenderåret.")],
        kilde="F7 lb 10 og AJB s. 61–62"),
    dekker=["f7-bosted-01", "f7-bosted-02"])
S.oppgave("Marco kommer til Bergen", "Internasjonal skatt", [13],
    "<p>Marco er italiensk statsborger og har italiensk pass. Han kommer til Bergen 1. oktober 2026 for et prosjekt og blir til og med 30. april 2027. Han har ikke vært i Norge før. Fra når er Marco skattemessig bosatt i Norge?</p>",
    [o2])

# =====================================================================
# Oppgave 3: Fjordtek AS (globalprinsippet)
# =====================================================================
norge, tyskland, japan = 30, 20, 10
glob = norge + tyskland + japan
kilde_ = norge
uten_ty = norge + japan
o3 = S.ledd("", "",
    riktig=(f"Kr {glob} mill.", [str(glob)]),
    gale=[(f"Kr {kilde_} mill.", [str(kilde_)]), (f"Kr {uten_ty} mill.", [str(uten_ty)]), ("Kr 0", ["0"])],
    solution=sol(
        "Et selskap som er hjemmehørende i Norge, har full skatteplikt hit for all inntekt, også fra utlandet (globalprinsippet). Avgjørende er hvor den reelle ledelsen er, ikke registreringslandet. Skatteavtalene og kreditfradraget kommer først etterpå.",
        steg=["Styret møtes og tar beslutningene i Stavanger. Selskapet er hjemmehørende i Norge.",
              f"Norsk intern rett: {norge} + {tyskland} + {japan} = <b>kr {glob} mill.</b>"],
        gale=[(f"Kr {kilde_} mill.", "kildeprinsippet. Det gjelder bare den som har begrenset skatteplikt."),
              (f"Kr {uten_ty} mill.", "trekker ut det faste driftsstedet i Tyskland. Det er skatteavtalens regel (art. 7), ikke intern rett."),
              ("Kr 0", "tror registreringslandet avgjør. Det er stedet for den reelle ledelsen som teller.")],
        kilde="AJB s. 59–60 og s. 66–70"),
    dekker=["f7-skatteplikt-01", "f7-skatteplikt-07", "f7-skatteplikt-05"])
S.oppgave("Fjordtek AS og skatteplikten", "Internasjonal skatt", [13],
    f"<p>Fjordtek AS er registrert i Luxembourg, men styret møtes og tar alle beslutninger i Stavanger. I 2026 har selskapet et overskudd på kr {norge} mill. fra Norge, kr {tyskland} mill. fra en avdeling (fast driftssted) i Tyskland og kr {japan} mill. fra salg til kunder i Japan uten fast driftssted der. Hvor mye av overskuddet er skattepliktig til Norge etter norsk intern rett, før skatteavtalene er brukt?</p>",
    [o3])

# =====================================================================
# Oppgave 4: Henrik og exit-skatten
# =====================================================================
gevinst = 12_000_000
sats = 0.22 * 1.72
assert lik(sats, 0.3784)
krav = gevinst * sats
krav22 = gevinst * 0.22
krav_aar = krav / 12
krav_dobbel = krav * 1.72
assert lik(krav, 4_540_800)
o4a = S.ledd("a", "<p>Hvor stort blir utflyttingsskattekravet?</p>",
    riktig=(f"Kr {kr(krav)}", [kr(krav)]),
    gale=[(f"Kr {kr(krav22)}", [kr(krav22)]), (f"Kr {kr(krav_aar)}", [kr(krav_aar)]), (f"Kr {kr(krav_dobbel)}", [kr(krav_dobbel)])],
    solution=sol(
        "Exit-skatten er den latente gevinsten ganget med den effektive satsen på utbytte og gevinst: 22 % × 1,72 = 37,84 %.",
        steg=[f"Sats: 22 % × 1,72 = {pst(sats)}.",
              f"Krav: {kr(gevinst)} × {pst(sats)} = <b>kr {kr(krav)}</b>."],
        gale=[(f"Kr {kr(krav22)}", "bruker 22 % og glemmer oppjusteringen med 1,72."),
              (f"Kr {kr(krav_aar)}", "deler kravet på 12 år. Det er en årlig rate, ikke kravet."),
              (f"Kr {kr(krav_dobbel)}", "oppjusterer to ganger. 37,84 % inneholder allerede 1,72.")],
        kontroll="Lysbildet: 10 000 000 × 37,84 % = 3 784 000. Med 12 mill. blir kravet 1,2 ganger så stort.",
        kilde="F7 lb 11–12"),
    dekker=["f7-exit-skatt-01"])

utb = 1_500_000
kilde_sk = 0.15 * utb
avdrag = 0.70 * utb
igjen = utb - kilde_sk - avdrag
avdrag_f = sats * utb
igjen_f = utb - kilde_sk - avdrag_f
assert lik(igjen, 225_000) and lik(igjen_f, 707_400)
o4b = S.ledd("b", f"<p>To år etter utflyttingen deler Fjellkraft AS ut kr {kr(utb)} i utbytte. Henrik har valgt rentefri nedbetaling over 12 år. I dag skal 70 % av en utdeling gå til avdrag på kravet. Skattekommisjonen har foreslått å senke avdragssatsen til 37,84 %. Sveits gir ikke kreditfradrag for kildeskatten. Hvor mye sitter Henrik igjen med av utbyttet i dag og med forslaget?</p>",
    riktig=(f"Kr {kr(igjen)} i dag og kr {kr(igjen_f)} med forslaget", [kr(igjen), kr(igjen_f)]),
    gale=[(f"Kr {kr(utb - kilde_sk)} i dag og kr {kr(utb - kilde_sk)} med forslaget", [kr(utb - kilde_sk), kr(utb - kilde_sk)]),
          (f"Kr {kr(igjen + kilde_sk)} i dag og kr {kr(igjen_f + kilde_sk)} med forslaget", [kr(igjen + kilde_sk), kr(igjen_f + kilde_sk)]),
          (f"Kr {kr(igjen)} i dag og kr {kr(igjen)} med forslaget", [kr(igjen), kr(igjen)])],
    solution=sol(
        "Norge trekker 15 % kildeskatt av utbyttet. I tillegg skal en andel av utdelingen gå til avdrag på exit-kravet, selv om Henrik har valgt rentefri nedbetaling. Forslaget endrer avdragssatsen, ikke exit-skatten.",
        steg=[f"Kildeskatt: 15 % × {kr(utb)} = {kr(kilde_sk)}.",
              f"I dag: {kr(utb)} − {kr(kilde_sk)} − 70 % × {kr(utb)} ({kr(avdrag)}) = <b>{kr(igjen)}</b>.",
              f"Forslaget: {kr(utb)} − {kr(kilde_sk)} − 37,84 % × {kr(utb)} ({kr(avdrag_f)}) = <b>{kr(igjen_f)}</b>."],
        gale=[(f"{kr(utb - kilde_sk)}", "glemmer avdraget på exit-kravet."),
              (f"{kr(igjen + kilde_sk)}", "regner som om kildeskatten krediteres i Sveits. Oppgaven sier at den ikke gjør det."),
              (f"{kr(igjen)} med forslaget", "trekker fortsatt fra 70 %. Forslaget senker avdraget til 37,84 %.")],
        kontroll="Lysbildet med Kari: 150 000 i dag og 471 600 med forslaget.",
        kilde="F7 lb 12–15"),
    dekker=["f7-exit-skatt-06", "f7-exit-skatt-07", "f7-skatteplikt-06"])

o4c = S.ledd("c", "<p>Vurder påstandene:</p><p>I. Hadde Henrik blitt boende i Norge og gitt aksjene til datteren sin i Sveits, ville også det utløst exit-skatt.<br>II. Skatteavtalen med Sveits beskytter ikke mot exit-skatten, fordi skatten anses inntrådt dagen før utflyttingen.<br>III. Kravet faller bort hvis Henrik ikke selger aksjene innen fem år etter utflyttingen.</p><p>Hvilke påstander er riktige?</p>",
    riktig="I og II, men ikke III",
    gale=["Bare II, ikke I eller III", "Bare I, ikke II eller III", "Alle de tre påstandene"],
    solution=begrep(
        "Exit-skatten omfatter også gave av aksjer til nærstående i utlandet. Den anses inntrådt dagen før utflyttingen, altså før skatteavtalen får virkning. Femårsregelen opphørte 29. november 2022. Nå kan betalingen utsettes i inntil 12 år, men ikke lenger.",
        "I og II er riktige.",
        [("Bare II", "regelen gjelder ikke bare når aksjonæren selv flytter. Gave til nærstående i utlandet utløser også skatten."),
         ("Bare I", "tror aksjegevinsten skattlegges bare i bostedslandet etter avtalen. Skatten oppstår før avtalen virker."),
         ("Alle tre", "femårsregelen er borte. Det var fasit i H2022, men gjelder ikke i 2026.")],
        kilde="F7 lb 11, H2022 o4 og H2024 o10"),
    dekker=["f7-exit-skatt-02", "f7-exit-skatt-03", "f7-exit-skatt-04"])

avdrag_n = 6                       # utdelinger år 2, 4, 6, 8, 10 og 12
dekket_f = avdrag_n * avdrag_f
assert dekket_f < krav and avdrag_n * avdrag > krav
o4d = S.ledd("d", "<p>Hvilket utsagn er riktig?</p>",
    riktig="Hadde Henrik blitt boende og flyttet Fjellkraft AS til Sveits, ville både selskapets merverdier og aksjegevinsten hans blitt beskattet",
    gale=["Hadde Henrik blitt boende og flyttet Fjellkraft AS til Sveits, ville det ikke utløst skatt, fordi exit-skatt bare gjelder personer",
          "Hadde Henrik blitt boende og flyttet Fjellkraft AS til Sveits, ville bare aksjegevinsten hans blitt beskattet, med betaling over 12 år",
          (f"Med kommisjonens forslag vil et utbytte på kr {kr(utb)} annethvert år ha nedbetalt hele exit-kravet innen 12 år", [kr(utb), "12"])],
    solution=begrep(
        "Når et selskap flytter ut av Norge, beskattes det som om det ble likvidert: realisasjonsbeskatning av merverdiene på selskapsnivå og av den latente gevinsten på aksjonærnivå. Aksjonæren får ingen utsettelse i dette tilfellet.",
        "Begge nivåene beskattes.",
        [("Ingen skatt", "skatteloven krever at alle skatteposisjoner gjøres opp når selskapet ikke lenger er hjemmehørende i Norge."),
         ("Bare Henrik", "også selskapets merverdier beskattes. Utsettelsen gjelder heller ikke her."),
         ("Innen 12 år", f"med forslaget dekker seks utdelinger {kr(dekket_f)} av kravet på {kr(krav)}. Resten, {kr(krav - dekket_f)}, forfaller i år 12. Lavere avdragssats strekker nedbetalingen.")],
        kilde="F7 lb 16, H2022 o4 og H2024 o10"),
    dekker=["f7-exit-skatt-05", "f7-exit-skatt-08"])

o4e = S.ledd("e", "<p>Henrik påberoper seg bosted i Sveits etter skatteavtalen allerede fra 2026. Hvilket utsagn er riktig?</p>",
    riktig="Sveits får retten til å skattlegge formuen hans med en gang, selv om han etter intern rett er bosatt i Norge ut 2029",
    gale=["Velger han sveitsisk beskatning etter forbruk (lump-sum), slipper utbytte fra Fjellkraft AS skatt i begge landene",
          "Gevinst på aksjer i norske selskaper er alltid skattepliktig til Norge som kildestat, også for dem som bor i utlandet",
          "Utbytte fra Fjellkraft AS er fritt for norsk skatt, fordi Sveits får beskatningsretten etter avtalens artikkel 4"],
    solution=begrep(
        "Sveits får beskatningsretten til formue fra du blir eksklusivt bosatt der etter avtalens artikkel 4, uavhengig av den norske treårsregelen. Den vanlige modellen er å påberope seg avtalebosted i Sveits i treårsperioden for å få lavere formuesskatt med en gang.",
        "Sveits beskatter formuen med en gang.",
        [("Lump-sum", "for å beholde avtalebeskyttelsen må norske kildeinntekter som utbytte i praksis ilegges alminnelig sveitsisk inntektsskatt."),
         ("Gevinst alltid skattepliktig", "en utlending er i utgangspunktet ikke skattepliktig til Norge for gevinst på norske aksjer. Derfor trengs exit-skatten."),
         ("Utbytte fritt", "utbytte fra norske selskaper til utenlandske aksjonærer ilegges kildeskatt.")],
        kilde="F7 lb 12, lb 17–18 og AJB s. 65"),
    dekker=["f7-exit-skatt-09", "f7-exit-skatt-10", "f7-skatteplikt-04", "f7-skatteplikt-06"])

S.oppgave("Henrik og Fjellkraft AS", "Exit-skatt", [6, 13],
    f"<p>Henrik har bodd i Norge hele livet og eier 100 % av Fjellkraft AS. Den latente gevinsten på aksjene er kr {kr(gevinst)}. 1. mars 2026 flytter han til Sveits. Etter skatteavtalen er kildeskatten på utbytte fra Norge 15 %. Utbytte og gevinst skattlegges med 22 % × 1,72. Se bort fra bunnfradraget i exit-skatten.</p>",
    [o4a, o4b, o4c, o4d, o4e])

# =====================================================================
# Oppgave 5: Gjennomsnittsskatt, trinnskatt og bunnfradrag
# =====================================================================
def trinn(y):
    return 0.10 * min(y, 120_000) + 0.20 * max(0, min(y, 400_000) - 120_000) + 0.30 * max(0, y - 400_000)
yE = 600_000
TE = trinn(yE)
tE = TE / yE
assert lik(TE, 128_000)
o5a = S.ledd("a", f"<p>Et land har trinnskatt: 10 % av inntekten opp til kr 120 000, 20 % av inntekten mellom kr 120 000 og kr 400 000 og 30 % av inntekten over kr 400 000. Eva har en bruttoinntekt på kr {kr(yE)}. Hva er gjennomsnittsskatten og marginalskatten hennes? Avrund til to desimaler.</p>",
    riktig=(f"{pst(tE)} og {pst(0.30)}", [pst(tE), pst(0.30)]),
    gale=[(f"{pst(0.30)} og {pst(0.30)}", [pst(0.30), pst(0.30)]),
          (f"{pst(tE)} og {pst(tE)}", [pst(tE), pst(tE)]),
          (f"{pst(0.20)} og {pst(0.30)}", [pst(0.20), pst(0.30)])],
    solution=sol(
        "Gjennomsnittsskatten er t = T/Y med bruttoinntekten i nevneren. Hvert trinn skattlegges med sin sats bare på inntekten i trinnet. Marginalskatten er skatten på den neste kronen.",
        steg=[f"Trinn: 10 % × 120 000 + 20 % × 280 000 + 30 % × 200 000 = 12 000 + 56 000 + 60 000 = {kr(TE)}.",
              f"t = {kr(TE)}/{kr(yE)} = <b>{pst(tE)}</b>.",
              "Neste krone havner i øverste trinn: m = <b>30,00 %</b>."],
        gale=[("30 % og 30 %", "bruker toppsatsen på hele inntekten."),
              (f"{pst(tE)} og {pst(tE)}", "blander marginalskatt og gjennomsnittsskatt. De er like bare uten trinn og fradrag."),
              ("20 % og 30 %", "tar snittet av de tre satsene. Trinnene er ulikt store.")],
        kilde="F7 lb 21–22"),
    dekker=["f7-progressivitet-05", "f7-progressivitet-06", "f7-progressivitet-01"])

s_ = 0.24
yS, yP = 400_000, 800_000
def tgj(y, B): return s_ * (y - B) / y
d60 = 100 * (tgj(yP, 60_000) - tgj(yS, 60_000))
d120 = 100 * (tgj(yP, 120_000) - tgj(yS, 120_000))
assert lik(d60, 1.8) and lik(d120, 3.6)
o5b = S.ledd("b", f"<p>Et annet land har én sats på 24 % på inntekt over et bunnfradrag. Sofie tjener kr {kr(yS)} og Petter kr {kr(yP)}. Bunnfradraget økes fra kr 60 000 til kr 120 000. Hva skjer med forskjellen i gjennomsnittsskatt mellom Petter og Sofie?</p>",
    riktig=(f"Den øker fra {kr(d60, 1)} til {kr(d120, 1)} prosentpoeng", [kr(d60, 1), kr(d120, 1)]),
    gale=[(f"Den faller fra {kr(d120, 1)} til {kr(d60, 1)} prosentpoeng", [kr(d120, 1), kr(d60, 1)]),
          ("Den er 0 før og etter, fordi satsen er flat", ["0"]),
          (f"Den er {kr(d60, 1)} prosentpoeng både før og etter", [kr(d60, 1)])],
    solution=sol(
        "Med bunnfradrag B og sats s er t = s(Y − B)/Y. Fradraget betyr mindre jo høyere inntekten er, så t stiger med Y. Systemet er progressivt. Større fradrag gir sterkere progresjon.",
        steg=[f"B = 60 000: Sofie {pst(tgj(yS, 60_000))}, Petter {pst(tgj(yP, 60_000))}. Forskjell {kr(d60, 1)} prosentpoeng.",
              f"B = 120 000: Sofie {pst(tgj(yS, 120_000))}, Petter {pst(tgj(yP, 120_000))}. Forskjell <b>{kr(d120, 1)} prosentpoeng</b>."],
        gale=[("Faller", "tror høyere fradrag gir svakere progresjon fordi alle betaler mindre. Det er motsatt."),
              ("0", "flat sats gir proporsjonal skatt bare uten bunnfradrag."),
              ("Uendret", "fradraget er likt i kroner, men utgjør en større andel av Sofies inntekt.")],
        kontroll="Lysbildet med 27 %: B = 40 000 gir 1,4 prosentpoeng, B = 80 000 gir 2,9.",
        kilde="F7 lb 22 og lb 25"),
    dekker=["f7-progressivitet-04", "f7-progressivitet-02", "f7-progressivitet-03"])

S.oppgave("Gjennomsnittsskatt og bunnfradrag", "Progressivitet", [1, 10],
    "<p>To spørsmål om gjennomsnittsskatt. Hvert spørsmål står for seg.</p>", [o5a, o5b])

# =====================================================================
# Oppgave 6: Progresjon og omfordeling
# =====================================================================
o6 = S.ledd("", "",
    riktig="Om systemet omfordeler, avgjøres av skatt og overføringer samlet, ikke av om marginalsatsen stiger",
    gale=["Stortinget har vedtatt et rettslig bindende prinsipp om at det norske skattesystemet skal være progressivt",
          "Økonomisk teori kan avgjøre hvilken grad av progresjon som gir den rettferdige fordelingen av skattebyrden",
          "Murphy og Nagel mener at en bestemt progressiv satsskala er rettferdig i seg selv, uavhengig av overføringene"],
    solution=begrep(
        "En person med høy gjennomsnittsskatt kan motta så store overføringer at systemet ikke omfordeler. Det som teller, er den samlede fordelingsvirkningen av skatt og overføringer. Murphy og Nagel sier det samme: det er meningsløst å vurdere satsskalaen isolert.",
        "Skatt og overføringer må ses samlet.",
        [("Stortinget", "Stortinget har ikke vedtatt noe bindende prinsipp om progresjon, bare sluttet seg til skatteevneprinsippet. Norge har progresjon på arbeidsinntekt, ikke på kapital."),
         ("Økonomisk teori", "som økonomer kan vi karakterisere systemet som progressivt eller regressivt, men ikke si hva som er rettferdig."),
         ("Murphy og Nagel", "de mener motsatt: fordelingen etter skatt av hele det finanspolitiske systemet teller.")],
        kilde="F7 lb 20, lb 26–27 og lb 53"),
    dekker=["f7-progressivitet-07", "f7-progressivitet-08", "f7-rettferdighet-05", "f7-rettferdighet-07"])
S.oppgave("Progresjon og omfordeling", "Progressivitet", [10],
    "<p>Hvilket utsagn er i tråd med forelesningen?</p>", [o6])

# =====================================================================
# Oppgave 7: Flatskattdebatten
# =====================================================================
o7 = S.ledd("", "",
    riktig="Postkortskatten har flat sats over et bunnfradrag, negativ inntektsskatt flat sats på all inntekt og en fast overføring",
    gale=["Hall og Rabushkas postkortskatt er proporsjonal, fordi alle skattytere betaler den samme satsen på 19 % av inntekten sin",
          "Flatskatt-utvalget (NOU 1999:7) anbefalte en omfattende flatskattreform med uendret proveny og lavere toppsats på arbeid",
          "Sandmo slutter seg til Rabushka og skriver at flertallet av forskerne er enige om at flat skatt bedrer insentivene"],
    solution=begrep(
        "Det finnes tre systemer for flat skatt: proporsjonal skatt (samme sats, ingen fradrag), postkortskatten til Hall og Rabushka (T = s(Y − B)) og negativ inntektsskatt etter Milton Friedman (T = sY − B, der B er borgerlønnen).",
        "Postkortskatten har bunnfradrag, negativ inntektsskatt har overføring.",
        [("Proporsjonal", "postkortskatten har to marginalsatser, 0 under fradraget og 19 % over. Den er progressiv."),
         ("Utvalget anbefalte", "utvalget fant det vanskelig å tilrå en omfattende reform, fordi høyere sats på alminnelig inntekt også øker bedriftsbeskatningen."),
         ("Sandmo og Rabushka", "påstanden om at flertallet er enige, er Rabushkas. Sandmo finner at teorien ikke gir klare svar.")],
        kilde="F7 lb 30–36"),
    dekker=["f7-flat-skatt-01", "f7-flat-skatt-07", "f7-flat-skatt-08", "f7-flat-skatt-09"])
S.oppgave("Flatskattdebatten", "Progressivitet", [10], "<p>Hvilket utsagn om flat skatt er riktig?</p>", [o7])

# =====================================================================
# Oppgave 8: Tre flatskattsystemer (regning)
# =====================================================================
Y = {"A": 150_000, "B": 250_000, "C": 500_000}
sumY = sum(Y.values())
prov = 225_000
Bf, sb = 100_000, 0.375
BL = 45_000
assert lik(0.25 * sumY, prov)
assert lik(sb * sum(max(0, y - Bf) for y in Y.values()), prov)
sbl = (prov + 3 * BL) / sumY
assert lik(sbl, 0.40)
feil_bf = prov / (sumY - 3 * BL)              # borgerlønn trukket fra inntekten
feil_grunnlag = (prov + 3 * BL) / sum(max(0, y - Bf) for y in Y.values())   # bunnfradragsgrunnlaget
o8a = S.ledd("a", "<p>Hvilken sats må staten bruke i systemet med borgerlønn? Avrund til to desimaler.</p>",
    riktig=(pst(sbl), [pst(sbl)]),
    gale=[(pst(0.25), [pst(0.25)]), (pst(feil_bf), [pst(feil_bf)]), (pst(feil_grunnlag), [pst(feil_grunnlag)])],
    solution=sol(
        "Med negativ inntektsskatt er T = sY − B for hver person. Skatten må både gi provenyet og finansiere borgerlønnen.",
        steg=[f"Sum: s × {kr(sumY)} − 3 × {kr(BL)} = {kr(prov)}.",
              f"s = ({kr(prov)} + {kr(3 * BL)})/{kr(sumY)} = <b>{pst(sbl)}</b>."],
        gale=[("25,00 %", "satsen for proporsjonal skatt. Den glemmer at skatten også må dekke borgerlønnen."),
              (pst(feil_bf), "trekker borgerlønnen fra inntekten som et bunnfradrag. Den trekkes fra skattebeløpet."),
              (pst(feil_grunnlag), "bruker grunnlaget fra bunnfradragssystemet. Med borgerlønn skattlegges all inntekt.")],
        kontroll="Lysbildet: jo mer som gis bort i fradrag eller overføring, jo høyere må den flate satsen være (20 %, 30 % og 40 % for samme proveny).",
        kilde="F7 lb 36–41"),
    dekker=["f7-flat-skatt-05", "f7-flat-skatt-02"])

TC_b = sb * (Y["C"] - Bf)
tC_b = TC_b / Y["C"]
feil_blf = (sb * Y["C"] - Bf) / Y["C"]
assert lik(tC_b, 0.30)
o8b = S.ledd("b", "<p>Hva blir gjennomsnittsskatten til C i systemet med bunnfradrag?</p>",
    riktig=(pst(tC_b), [pst(tC_b)]),
    gale=[(pst(sb), [pst(sb)]), (pst(feil_blf), [pst(feil_blf)]), (pst(0.25), [pst(0.25)])],
    solution=sol(
        "Med bunnfradrag er T = s(Y − B). Gjennomsnittsskatten er T delt på bruttoinntekten.",
        steg=[f"T = 37,5 % × ({kr(Y['C'])} − {kr(Bf)}) = {kr(TC_b)}.",
              f"t = {kr(TC_b)}/{kr(Y['C'])} = <b>{pst(tC_b)}</b>."],
        gale=[("37,50 %", "marginalskatten, eller skatten delt på skattbar inntekt. Nevneren skal være bruttoinntekten."),
              (pst(feil_blf), "trekker fradraget fra skattebeløpet, som i borgerlønnssystemet."),
              ("25,00 %", "satsen i det proporsjonale systemet.")],
        kilde="F7 lb 21 og lb 39"),
    dekker=["f7-flat-skatt-03", "f7-progressivitet-01"])

tA_bl = (sbl * Y["A"] - BL) / Y["A"]
tC_bl = (sbl * Y["C"] - BL) / Y["C"]
tA_b = sb * (Y["A"] - Bf) / Y["A"]
assert lik(tA_bl, 0.10) and lik(tC_bl, 0.31) and lik(tA_b, 0.125)
pA, pC = 100 * tA_bl, 100 * tC_bl
o8c = S.ledd("c", "<p>Hvilket utsagn om de tre systemene er riktig?</p>",
    riktig=(f"Med borgerlønn stiger gjennomsnittsskatten fra {kr(pA)} % for A til {kr(pC)} % for C, selv om marginalskatten er {kr(100 * sbl)} % for alle",
            [kr(pA), kr(pC), kr(100 * sbl)]),
    gale=["Systemet med bunnfradrag er det mest progressive av de tre, fordi det har to ulike marginalskatter for skattyterne",
          "Proporsjonal skatt er også progressiv, fordi C betaler flere kroner i skatt enn A og B til sammen",
          "Proporsjonal skatt krever den høyeste satsen av de tre, fordi ingen får verken fradrag eller overføring"],
    solution=sol(
        "Progresjon måles ved at gjennomsnittsskatten T/Y stiger med inntekten. Med borgerlønn er marginalskatten den samme for alle, men gjennomsnittsskatten stiger fra et lavt eller negativt nivå mot satsen.",
        steg=[f"Borgerlønn: A {pst(tA_bl, 1)}, C {pst(tC_bl, 1)}. Økning {kr(pC - pA)} prosentpoeng.",
              f"Bunnfradrag: A {pst(tA_b, 1)}, C {pst(tC_b, 1)}. Økning {kr(100 * (tC_b - tA_b), 1)} prosentpoeng.",
              "Proporsjonal: 25 % for alle. Borgerlønn gir <b>mest progresjon</b>."],
        gale=[("Bunnfradrag mest progressivt", f"gjennomsnittsskatten stiger mindre enn med borgerlønn ({kr(100 * (tC_b - tA_b), 1)} mot {kr(pC - pA)} prosentpoeng)."),
              ("Proporsjonal er progressiv", "flere kroner er ikke kriteriet. Andelen av inntekten er 25 % for alle."),
              ("Proporsjonal høyest sats", "motsatt. Proporsjonal skatt har lavest sats (25 %), fordi ingenting gis bort.")],
        kilde="F7 lb 38–41"),
    dekker=["f7-flat-skatt-04", "f7-flat-skatt-06", "f7-progressivitet-02", "f7-flat-skatt-05"])

S.oppgave("Tre flatskattsystemer", "Progressivitet", [10],
    f"<p>Tre personer har bruttoinntekt A: kr {kr(Y['A'])}, B: kr {kr(Y['B'])} og C: kr {kr(Y['C'])}. Staten trenger kr {kr(prov)} i proveny fra dem og vurderer tre systemer:</p><ul><li>Proporsjonal skatt på 25 %.</li><li>Flat skatt på 37,5 % av inntekten over et bunnfradrag på kr {kr(Bf)}.</li><li>Negativ inntektsskatt: én sats på all inntekt og en borgerlønn på kr {kr(BL)} til hver person.</li></ul>",
    [o8a, o8b, o8c])

# =====================================================================
# Oppgave 9: Sandmo om flatere skatter
# =====================================================================
o9a = S.ledd("a", "<p>Et land går fra progressiv skatt til proporsjonal skatt med samme proveny. Hvilken inntektsgruppe får ifølge Sandmo en entydig økning i arbeidstilbudet?</p>",
    riktig="Midlere inntekter, fordi både substitusjons- og inntektsvirkningen trekker mot mer arbeid",
    gale=["Høye inntekter, fordi både marginalskatten og gjennomsnittsskatten deres faller ved overgangen",
          "Lave inntekter, fordi høyere gjennomsnittsskatt tvinger dem til å jobbe mer for å holde inntekten",
          "Alle gruppene, fordi overgangen fjerner skattekilene og gir en klar gevinst i effektiviteten"],
    solution=begrep(
        "Ved samme proveny får lave inntekter høyere marginal- og gjennomsnittsskatt, midlere inntekter lavere marginalskatt men høyere gjennomsnittsskatt. Høye inntekter får lavere av begge. Marginalskatten styrer substitusjonsvirkningen, gjennomsnittsskatten inntektsvirkningen. Bare for midlere inntekter trekker begge mot mer arbeid.",
        "Midlere inntekter.",
        [("Høye inntekter", "lavere gjennomsnittsskatt gjør dem rikere. Inntektsvirkningen trekker mot mindre arbeid, så totalen er ubestemt."),
         ("Lave inntekter", "høyere marginalskatt trekker mot mindre arbeid. Totalen er ubestemt."),
         ("Alle gruppene", "overgangen flytter skattekilene, den fjerner dem ikke. Lavinntektsgruppene får større kiler.")],
        kilde="AS3 s. 286–287"),
    dekker=["f7-flatere-sandmo-02", "f7-flatere-sandmo-03"])

o9b = S.ledd("b", "<p>Hvilket funn gjengir Sandmo riktig?</p>",
    riktig="Hausman: proporsjonal skatt ville senket effektivitetstapet fra 22,5 % til 7,1 % av skatteinntekten",
    gale=["New Jersey-eksperimentet viste at negativ inntektsskatt økte arbeidstilbudet for lavinntektsgruppene",
          "I den simulerte flate skatten i Italia ville et klart flertall av skattyterne ha tapt på omleggingen",
          "Reformen i USA i 1986 skulle endre den vertikale fordelingen, men ikke likebehandlingen av like personer"],
    solution=begrep(
        "Hausman beregnet effektivitetstapet av amerikansk inntektsskatt midt på 1970-tallet til 22,5 % av skatteinntekten. Proporsjonal skatt på 14,6 % ga 7,1 %. Flat skatt på 20,7 % med bunnfradrag ga 14,5 %. Rangeringen følger marginalskatten.",
        "Hausman-tallene er riktige.",
        [("New Jersey", "eksperimentet viste en klar negativ virkning på arbeidstilbudet for lavinntektsgruppene."),
         ("Italia", "51,8 % ville vunnet, et svakt flertall. Over 80 % i de to laveste desilene tapte."),
         ("USA 1986", "omvendt. Reformen skulle ikke endre den vertikale fordelingen (mellom grupper), men øke den horisontale likheten (mellom like).")],
        kilde="AS3 s. 288–294"),
    dekker=["f7-flatere-sandmo-05", "f7-flatere-sandmo-04", "f7-flatere-sandmo-10", "f7-flatere-sandmo-07"])

o9c = S.ledd("c", "<p>Hvilket utsagn er i tråd med Sandmos konklusjoner?</p>",
    riktig="Optimal skatteteori gir en nesten lineær skatt, med høyere marginalskatt jo lavere arbeidstilbudselastisiteten er",
    gale=["Flat skatt vil øke sparingen, fordi alle typer kapitalinntekt i Norge da får den samme effektive satsen",
          "Lavere toppsatser gir alltid mer ulikhet etter skatt, fordi den formelle progresjonen i skatteskalaen faller",
          "Teorien viser entydig at flat skatt gir en effektivitetsgevinst. Derfor anbefaler Sandmo flat skatt"],
    solution=begrep(
        "Mirrlees' simuleringer ga en tilnærmet lineær optimal skatt med stigende gjennomsnittsskatt og nesten konstant marginalskatt. Optimal marginalskatt er høyere jo lavere den kompenserte elastisiteten er, jo større spredningen i produktivitet er og jo sterkere ulikhetsaversjonen er.",
        "Nesten lineær optimal skatt.",
        [("Sparing", "det er ingen grunn til å vente økt sparing. Effektive satser på kapital varierer mellom aktiva og med formuesskatten."),
         ("Alltid mer ulikhet", "reell progresjon er ofte mindre enn formell. I USA 1986 ga bredere grunnlag og mindre unndragelse ingen klar omfordelingseffekt."),
         ("Entydig gevinst", "teorien gir ingen klare hypoteser. Sandmo verken anbefaler eller avviser flat skatt.")],
        kilde="AS3 s. 287–297"),
    dekker=["f7-flatere-sandmo-09", "f7-flatere-sandmo-06", "f7-flatere-sandmo-08", "f7-flatere-sandmo-11"])

S.oppgave("Sandmo om flatere skatter", "Progressivitet", [10],
    "<p>Spørsmålene bygger på Sandmos «Flatere skatter?», vedlegg 1 til NOU 1999:7.</p>", [o9a, o9b, o9c])

# =====================================================================
# Oppgave 10: Borgerlønn
# =====================================================================
o10a = S.ledd("a", "<p>Kalle Moene har foreslått borgerlønn i Norge. Hvilket utsagn om forslaget og debatten er riktig?</p>",
    riktig="Moene vil gi borgerlønn til dem med stemmerett ved kommunevalg og beholde ordninger som gratis helsehjelp",
    gale=["Stemmerett ved kommunevalg krever norsk statsborgerskap, så bare nordmenn ville fått Moenes borgerlønn",
          "Borgerlønn er behovsprøvd, slik at bare de som står uten arbeid får utbetalingen fra staten hver eneste måned",
          "Kvaløy mener at Norge allerede i dag har råd til å innføre en universell borgerlønn til alle innbyggere"],
    solution=begrep(
        "Moene vil gi borgerlønn til dem som har stemmerett ved kommunevalg, mens velferdsordninger som gratis helsehjelp, sosialstøtte og utdanning beholdes. Avgrensningen skal hindre en strøm av «borgerlønnsjegere».",
        "Moene avgrenser til stemmeberettigede ved kommunevalg.",
        [("Statsborgerskap", "ved lokalvalg har også andre stemmerett etter tre års sammenhengende botid. Statsborgerskap kreves bare ved stortingsvalg."),
         ("Behovsprøvd", "borgerlønn er universell: et fast beløp til alle uten behovsprøving."),
         ("Kvaløy", "han skriver at vi foreløpig ikke har råd, men at vi snart kan komme til å ikke ha råd til å la være.")],
        kilde="F7 lb 42–44 og Kvaløy (DN 5.10.2018)"),
    dekker=["f7-borgerlonn-03", "f7-borgerlonn-05", "f7-borgerlonn-01", "f7-borgerlonn-04"])

o10b = S.ledd("b", "<p>Hvilket utsagn er riktig?</p>",
    riktig="Administrasjon brukes også mot borgerlønn: den er vanskelig å innføre og å avgrense mot ytelsene fra NAV",
    gale=["Sandmos krav om enkelhet gjelder bare myndighetenes kostnader, ikke tiden skattyterne selv bruker",
          "Kvaløys «umulighetsteorem» er et formelt matematisk bevis for at en borgerlønn alltid gir lavere sysselsetting",
          "Utilitaristene, også John Stuart Mill, gikk inn for sterk progressiv skatt på arbeidsinntekt"],
    solution=begrep(
        "Lysbildet om argumenter mot borgerlønn tar med at den er administrativt komplisert å innføre og håndheve. Det er også vanskelig å avgrense hvor mye den skal redusere utgiftene i NAV. Andre motargumenter: høy kostnad, svakere arbeidsetikk og at den kan trekke til seg flyktninger.",
        "Administrasjon er også et motargument.",
        [("Sandmos enkelhet", "enkelhet omfatter også skattyternes egne kostnader, som tiden det tar å fylle ut selvangivelsen."),
         ("Umulighetsteorem", "det er Kvaløys navn på en ligning som ikke går opp: ytelsen blir for lav til å være akseptabel eller for høy til å være gjennomførbar."),
         ("Mill", "Mill kalte progressiv skatt på arbeidsinntekt en straff på flid. Han forsvarte progresjon på arv og urealiserte gevinster.")],
        kilde="F7 lb 45, lb 48, AS3 s. 281 og Kvaløy (DN 5.10.2018)"),
    dekker=["f7-borgerlonn-02", "f7-flatere-sandmo-01", "f7-borgerlonn-06", "f7-rettferdighet-01"])

S.oppgave("Borgerlønn", "Borgerlønn", [10], "<p>To spørsmål om borgerlønn. Hvert spørsmål står for seg.</p>", [o10a, o10b])

# =====================================================================
# Oppgave 11: Filosofene og skatten
# =====================================================================
o11 = S.ledd("", "",
    riktig="Luck egalitarians: ulikhet fra talent og arv bør nøytraliseres, ulikhet fra egne valg kan tillates",
    gale=["Nozick: ulikhet kan bare aksepteres hvis den gagner de dårligst stilte, så han støtter progressiv skatt",
          "Rawls: skatt er å regne som tvangsarbeid og et brudd på eiendomsretten, så han avviser omfordeling",
          "Adam Smith: staten skal bare være vaktmester, så skatt etter evne er et brudd på den enkeltes frihet"],
    solution=begrep(
        "Luck egalitarians (Dworkin, Cohen, Arneson) skiller mellom «brute luck» og «option luck». Ulikhet fra uvalgte omstendigheter som talent, arv og familiebakgrunn bør nøytraliseres. Ulikhet fra egne valg kan tillates.",
        "Luck egalitarians er riktig koblet.",
        [("Nozick", "differensprinsippet er Rawls'. Nozick avviser progresjon og langt på vei all omfordeling."),
         ("Rawls", "tvangsarbeid og eiendomsrett er Nozicks syn. Rawls er positiv til progressiv skatt."),
         ("Adam Smith", "Smith mente skatt bør betales etter evne og at staten har nødvendige oppgaver som forsvar, rettsvesen og infrastruktur.")],
        kilde="F7 lb 49–53"),
    dekker=["f7-rettferdighet-06", "f7-rettferdighet-03", "f7-rettferdighet-04", "f7-rettferdighet-02"])
S.oppgave("Filosofene og skatten", "Progressivitet", [10],
    "<p>Hvilken kobling mellom tenker og syn på skatt er riktig?</p>", [o11])

# =====================================================================
# Oppgave 12: Moene om de rike
# =====================================================================
rike_no, rike_us = 472.8, 124.6
super_no, super_us = 63.6, 36.5
assert 3.5 < rike_no / rike_us < 4 and 1.5 < super_no / super_us < 2
o12a = S.ledd("a", "<p>Hvilket utsagn stemmer med tallene Moene viser for Norge og USA?</p>",
    riktig="Norge har nesten fire ganger så mange rike per innbygger, men de rikeste 1 % får en mindre inntektsandel",
    gale=["USA har flest rike per innbygger, fordi de rikeste 0,1 % der får hele 11 % av nasjonalinntekten i landet",
          "Norge har flere rike enn USA bare fordi Norge har høyere inntekt per innbygger enn USA",
          "USA har høyere formuesulikhet blant de rike. Det løfter flere personer over rikdomsgrensen"],
    solution=begrep(
        f"Per million innbyggere har Norge {kr(rike_no, 1)} rike og {kr(super_no, 1)} superrike, mot {kr(rike_us, 1)} og {kr(super_us, 1)} i USA. Målt i inntektsandel er bildet motsatt: de rikeste 1 % får nesten 25 % i USA og under 8 % i Norge.",
        "Norge har flest rike, USA størst toppandel.",
        [("USA flest rike", "høy toppandel betyr at få eier mye, ikke at mange er rike."),
         ("Høyere inntekt", "Norge er 23,5 % rikere per innbygger, men selv med tre ganger så rask formuesvekst ville USA fått færre rike enn Norge."),
         ("Formuesulikhet", "høy konsentrasjon blant de rike gir færre personer over grensen, ikke flere.")],
        kilde="M s. 248–253"),
    dekker=["f7-moene-02", "f7-moene-03", "f7-moene-04"])

o12b = S.ledd("b", "<p>Hva er Moenes hovedpoeng om overklassen under sosialdemokratiet?</p>",
    riktig="Antallet rike, ikke bare hvor rike de er, avgjør hvor mye politisk makt overklassen får",
    gale=["Sosialdemokratiet har i praksis avskaffet overklassen når den måles ved antallet rike",
          "De fleste rike i Norge har arvet formuen sin og har i liten grad bygget den opp på egen hånd",
          "Det viktigste virkemiddelet mot de rikes politiske makt er en høyere formuesskatt"],
    solution=begrep(
        "Moene måler rikdom som andelen av befolkningen over en «richness line», slik fattigdom måles under en grense. En person som eier alt, har mindre makt enn en gruppe som eier alt. Gilens og Page: de rike har i praksis vetorett i politikken.",
        "Antallet rike gir makt.",
        [("Avskaffet", "målt i antall har sosialdemokratiet skapt en stor overklasse."),
         ("Arvet", "gjennomgangen av de rikeste viste at de i stor grad har bygget formuen selv. Gratis utdanning og mobilitet øker antallet kapitaleiere."),
         ("Formuesskatt", "Moenes motvekt er et velorganisert arbeidsliv og fagbevegelsen.")],
        kilde="M s. 245–258"),
    dekker=["f7-moene-01", "f7-moene-06", "f7-moene-05"])

S.oppgave("Moene om de rike", "Fordeling", [10],
    "<p>Spørsmålene bygger på Moenes artikkel om den sosiale overklassen under sosialdemokratiet.</p>", [o12a, o12b])

S.skriv(
    label="F7 Rettferdig skattesystem, flat skatt og borgerlønn",
    note="Skattemessig bosted og utflytting, global og begrenset skatteplikt, exit-skatt, progressivitet og bunnfradrag, de tre flatskattsystemene, Sandmo om flatere skatter, borgerlønn, filosofenes syn og Moene om de rike.",
    facts=["26 ledd med fire alternativer: 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Tell år nøye ved utflytting: utflyttingsåret teller ikke. Du er tidligst ute i det fjerde året etter. Ved flat skatt: borgerlønn trekkes fra skattebeløpet, bunnfradrag fra inntekten.")
