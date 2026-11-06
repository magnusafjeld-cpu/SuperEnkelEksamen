"""Eksamenssett per forelesning: F2 Avkastning over tid på ulike aktiva (fl-f2)."""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f2")

# =====================================================================
# Oppgave 1: Formuen i Norge (lb 4–8)
# =====================================================================
a1 = S.ledd("", "<p>Hvilken påstand om formuesfordelingen i Norge er i tråd med forelesning 2?</p>",
    riktig="Folk flest har formuen i bolig, mens topp 1 % eier mest aksjer og to tredeler av dem er unoterte".replace(", og", " og"),
    gale=[
        "Unoterte aksjer er tryggere enn børsnoterte for småsparere, fordi kursen ikke svinger fra dag til dag",
        "Unoterte aksjer får ingen aksjerabatt, så formuesgrunnlaget er lik formuesverdien etter bokført verdi",
        "Om lag halvparten av husholdningene er i formuesskatteposisjon, fordi bolig er den største posten",
    ],
    solution=begrep(
        "Folk flest eier i hovedsak bolig. Topp 1 % eier mest aksjer, to tredeler unoterte og relativt lite eiendom. Hardere beskatning av eiendom vil derfor øke ulikheten.".replace(", og", " og"),
        "Bolig for folk flest, unoterte aksjer på toppen.",
        [("Unoterte er tryggere", "motsatt. Unoterte aksjer er mindre likvide, har mindre krav til rapportering, større informasjonsasymmetri og ofte en dominerende eier med innsideinformasjon. De er mer risikable."),
         ("Ingen aksjerabatt", "unoterte aksjer får også 20 % rabatt. Med formuesverdi på 40–50 % av markedsverdien blir grunnlaget 32–40 % (lysbildets tall)."),
         ("Halvparten i formuesskatteposisjon", "forelesningen sier at de 10 % rikeste i snitt er i formuesskatteposisjon. Bunnfradrag og lav verdsetting av primærbolig holder folk flest utenfor.")],
        kilde="F2 lb 4, lb 5, lb 6 og lb 7"),
    dekker=["f2-formuesfordeling-01", "f2-formuesfordeling-02", "f2-formuesfordeling-03", "f2-formuesfordeling-05"])
S.oppgave("Hvem eier hva", "Formuesskatt", [3], "", [a1])

# =====================================================================
# Oppgave 2: Jordà mfl. (2019) (lb 9–17, lb 22–24, lb 29–31)
# =====================================================================
a2 = S.ledd("a", "<p>Hvilken påstand om datagrunnlaget og funnet om r og g er riktig?</p>",
    riktig="Avkastningen på formue har vært høyere enn veksten i økonomien i nesten alle land og perioder utenom krig",
    gale=[
        "Statsobligasjoner og statssertifikater regnes som risikable aktiva på linje med aksjer og bolig",
        "Jordà mfl. avviser Pikettys påstand om at avkastningen på kapital er høyere enn vekstraten",
        "Dagens lave sikre realrenter er historisk unike: aldri før har sikre renter vært så lave i fredstid i noen land",
    ],
    solution=begrep(
        "Jordà mfl. bruker årlige data for 16 land 1870–2015 og fire aktivaklasser: aksjer og bolig (risikable), statsobligasjoner og statssertifikater (sikre). De finner r > g i alle land og perioder utenom i og rundt krig. Ifølge Piketty blir kapitaleiere da relativt rikere.",
        "r > g.",
        [("Statspapirer risikable", "i artikkelen er statsobligasjoner og statssertifikater de sikre aktivaene. Høyrenteobligasjoner er risikable, men ikke med."),
         ("Avviser Piketty", "motsatt. De bekrefter r > g og forelesningen bruker det til å forklare økt ulikhet."),
         ("Lave renter er unike", "sikre realrenter har vært lave (1–3 % i fredstid) og volatile. Gåten er heller hvorfor de var så høye midt på 1980-tallet.")],
        kilde="F2 lb 10, lb 11 og lb 14, J s. 1229–1230"),
    dekker=["f2-jorda-06", "f2-jorda-01", "f2-jorda-11"])

b2 = S.ledd("b", "<p>Hvilken påstand om real totalavkastning og risiko 1870–2015 (uvektet landsnitt) er riktig?</p>",
    riktig=("Bolig har gitt om lag 7,3 % og aksjer 6,7 % per år, mens aksjer har nesten dobbelt så høyt standardavvik", ["7,3", "6,7"]),
    gale=[
        ("Aksjer har gitt om lag 7,3 % og bolig 6,7 % per år, mens aksjer har nesten dobbelt så høyt standardavvik", ["7,3", "6,7"]),
        ("Bolig har gitt om lag 7,3 % og aksjer 6,7 % per år, mens bolig har nesten dobbelt så høyt standardavvik", ["7,3", "6,7"]),
        ("Aksjer har gitt om lag 7,3 % og bolig 6,7 % per år, mens standardavviket er omtrent det samme", ["7,3", "6,7"]),
    ],
    solution=begrep(
        "Lysbildet: totalavkastning på eiendom 7,3 % og aksjer 6,7 % per år. Standardavviket er om lag 10 for bolig og 24 for aksjer. Omtrent lik avkastning med under halve risikoen er en gåte.",
        "Bolig 7,3 %, aksjer 6,7 %, aksjer mest risikable.",
        [("Aksjer 7,3 %", "tallene byttet om."),
         ("Bolig mest risikabelt", "risikoen snudd. Aksjer har om lag 24 i standardavvik mot 10 for bolig."),
         ("Lik risiko", "både avkastning og risiko feil.")],
        kilde="F2 lb 16, lb 24 og lb 33, J tabell II"),
    dekker=["f2-jorda-02", "f2-jorda-04"])

c2 = S.ledd("c", "<p>Hvilken påstand om hvor avkastningen kommer fra og hvordan den har endret seg over tid, er riktig?</p>",
    riktig=("Real boligprisvekst har vært om lag 1 % per år, mens aksjer har slått bolig etter andre verdenskrig", ["1"]),
    gale=[
        ("Real boligprisvekst har vært om lag 5 % per år, mens aksjer har slått bolig etter andre verdenskrig", ["5"]),
        ("Real boligprisvekst har vært om lag 1 % per år, mens bolig har slått aksjer etter andre verdenskrig", ["1"]),
        ("Real boligprisvekst har vært om lag 5 % per år, mens bolig har slått aksjer etter andre verdenskrig", ["5"]),
    ],
    solution=begrep(
        "Den langsiktige realprisøkningen på bolig er om lag 1 % per år. Det er leien, høy og stabil, som bærer boligavkastningen. Aksjer har større kursgevinst og lavere, mer ustabilt utbytte. Bolig ga best avkastning før andre verdenskrig (mye eiendom ble ødelagt), aksjer etter.",
        "1 % prisvekst, aksjer best etter krigen.",
        [("5 % prisvekst, aksjer etter krigen", "«bolig har gitt høy avkastning fordi prisene har steget mye». Det er leien som bærer avkastningen."),
         ("1 %, bolig etter krigen", "periodene byttet om. Bolig var best før andre verdenskrig."),
         ("5 %, bolig etter krigen", "begge deler feil.")],
        kilde="F2 lb 15, lb 16 og lb 24, J s. 1228–1229"),
    dekker=["f2-jorda-05", "f2-jorda-03"])

d2 = S.ledd("d", "<p>Hvilken påstand om risikable og sikre aktiva er riktig?</p>",
    riktig="Risikable aktiva har gitt om lag 7,4 % mot 1,9 % for sikre og ved høy inflasjon beskytter aksjer og eiendom best",
    gale=[
        "Statsobligasjoner er risikofrie også reelt, så de er det tryggeste valget når inflasjonen stiger kraftig og varig",
        "Risikopremien og den risikable avkastningen er to navn på det samme tallet, begge om lag 6–8 % i snitt",
        "Sikre aktiva ga sin høyeste realavkastning i 1950–1980, fordi den høye inflasjonen løftet rentene",
    ],
    solution=begrep(
        "Risikabel avkastning (vektet snitt av aksjer og bolig) var om lag 7,4 % mot 1,9 % for sikre over hele perioden: man får betalt for å ta risiko. Renten på rentepapirer justeres ikke etter inflasjonen, mens bedrifter og husleiekontrakter kan justere priser og leie.",
        "7,4 mot 1,9 % og aksjer og eiendom ved inflasjon.",
        [("Statsobligasjoner risikofrie reelt", "inflasjon gjør dem risikable i realverdi. I 1950–1980 ga de negativ realavkastning."),
         ("Premie = risikabel avkastning", "lysbildet sier at risikopremien i snitt er 6–8 %. Artikkelen skiller: 6–8 % er risikabel avkastning, premien (risikabel minus sikker) er om lag 4–5 % i fredstid."),
         ("Høyest i 1950–1980", "motsatt. Høy inflasjon ga negativ sikker realavkastning i den perioden.")],
        kilde="F2 lb 15, lb 29, lb 30 og lb 31, J tabell XI"),
    dekker=["f2-jorda-07", "f2-risiko-03", "f2-jorda-08"])
S.oppgave("The rate of return on everything", "Porteføljevalg", [3],
    "<p>Jordà mfl. (2019) studerer realavkastningen på aksjer, bolig og sikre aktiva over lang tid.</p>", [a2, b2, c2, d2])

# =====================================================================
# Oppgave 3: Ett hus eller et fond (lb 32–37)
# =====================================================================
a3 = S.ledd("", "<p>Kristin vil bruke alle sparepengene på én utleieleilighet. Hun viser til at Jordà mfl. finner om lag samme avkastning på bolig som på aksjer, men under halve standardavviket. Hvilken påstand er riktig?</p>",
    riktig="Tallene gjelder en eiendomsportefølje; ett hus har idiosynkratisk risiko, som et eiendomsfond kan fjerne",
    gale=[
        "Med samme avkastning og under halve risikoen er én leilighet åpenbart et bedre valg enn et aksjefond",
        "Bolig og aksjer svinger i takt, så Kristin får ingen gevinst av å holde begge aktivaklassene samtidig i porteføljen",
        "Et eiendomsfond har samme risiko som ett hus, fordi risikoen ved boligmarkedet ikke kan spres bort",
    ],
    solution=begrep(
        "Jordàs boligtall er et snitt for en portefølje, ikke avkastningen av å eie ett hus. Risikoen ved ett hus knytter seg til prisutviklingen og beliggenheten (Gjerdrum, regionale forskjeller). Den idiosynkratiske risikoen kan fjernes med fond, men ikke når man eier ett hus.",
        "Porteføljetall, ikke ett hus.",
        [("Åpenbart bedre", "forelesningen spør nettopp om lav risiko og høy avkastning betyr at eiendom er best og svarer nei: tallene gjelder en portefølje."),
         ("Svinger i takt", "kovariansen mellom aksje- og boligavkastning er lav. Det gir diversifiseringsgevinst å holde begge, slik Oljefondet gjør."),
         ("Fond har samme risiko", "fondet fjerner risikoen knyttet til ett objekt. Bare markedsrisikoen står igjen.")],
        kilde="F2 lb 16, lb 33, lb 34, lb 36 og lb 37"),
    dekker=["f2-risiko-01", "f2-risiko-02", "f2-jorda-04", "f2-jorda-09"])
S.oppgave("Kristin og utleieleiligheten", "Porteføljevalg", [3, 14], "", [a3])

# =====================================================================
# Oppgave 4: Historiske tall og valg av fond (lb 17–21, 25–28, 38)
# =====================================================================
a4 = S.ledd("", "<p>Hvilken påstand om hva vi kan lære av historiske avkastningstall, er riktig?</p>",
    riktig="De kalibrerer forventninger og viser risiko, men gir ingen garanti: norske indeksfond har slått nordiske nylig",
    gale=[
        "Norske aksjer hadde høyest realavkastning i Norden fra 1980 til 2015, så et norsk indeksfond er et trygt valg",
        "Aktivaklassen med høyest historisk avkastning vil også gi høyest avkastning framover, ifølge forelesningen",
        "Oljefondets eiendomsinvesteringer har gitt et absolutt tap på om lag 120 mrd. kr fra 2017 til 2024",
    ],
    solution=begrep(
        "Historiske priser gir ingen garanti. De brukes til å kalibrere realistiske langsiktige forventninger, forstå risiko og se hvordan aktivaklasser oppfører seg i kriser. Svenske, finske og danske aksjer slo norske 1980–2015, men de siste årene har norske indeksfond slått nordiske.",
        "Kalibrering, ikke garanti.",
        [("Norge høyest 1980–2015", "motsatt. Sverige, Finland og Danmark hadde høyere realavkastning enn Norge i den perioden."),
         ("Høyest før gir høyest etter", "nettopp feilen forelesningen advarer mot. Norden slo Norge før 2015, Norge har slått Norden etterpå."),
         ("Absolutt tap", "120 mrd. kr er tapt meravkastning mot referanseindeksen, ikke et absolutt tap.")],
        kilde="F2 lb 17–21, lb 25–27 og lb 38"),
    dekker=["f2-risiko-04", "f2-risiko-05", "f2-jorda-10", "f2-formuesfordeling-06"])
S.oppgave("Norske eller nordiske aksjer", "Indeksfond og aktiv forvaltning", [3, 14], "", [a4])

# =====================================================================
# Oppgave 5: Utleieleiligheten (lb 39–42)
# =====================================================================
P0, P1, Y, pi = 5_000_000, 4_850_000, 275_000, 0.05
R5 = (P1 - P0 + Y) / P0
r_tilnaer = R5 - pi
r_eksakt = (1 + R5) / (1 + pi) - 1
f_uten_tap = Y / P0 - pi
f_dobbel = (P1 - P0 + Y * 0.78) / P0 - pi
assert lik(R5, 0.025)
a5 = S.ledd("", f"""<p>Sander kjøpte en utleieleilighet for kr {kr(P0)} og solgte den ett år senere for kr {kr(P1)}. Leieinntekten etter kostnader og etter 22 % skatt var kr {kr(Y)}. Inflasjonen var 5 %. Se bort fra skatt på salget. Hva var realavkastningen med forenklet formel? Svar med to desimaler.</p>""",
    riktig=(pst(r_tilnaer), [pst(r_tilnaer)]),
    gale=[(pst(f_uten_tap), [pst(f_uten_tap)]), (pst(r_eksakt), [pst(r_eksakt)]), (pst(f_dobbel), [pst(f_dobbel)])],
    solution=sol(
        "Nominell totalavkastning R = (P<sub>1</sub> − P<sub>0</sub> + Y<sub>1</sub>)/P<sub>0</sub>: kapitalgevinst pluss direkteavkastning, begge målt mot kjøpsprisen. Forenklet realavkastning r ≈ R − π.",
        [f"Kapitaltap: ({kr(P1)} − {kr(P0)})/{kr(P0)} = {pst((P1 - P0) / P0)}.",
         f"Leie: {kr(Y)}/{kr(P0)} = {pst(Y / P0)}. R = {pst(R5)}.",
         f"r ≈ {pst(R5)} − 5 % = <b>{pst(r_tilnaer)}</b>."],
        [(pst(f_uten_tap), "kapitaltapet glemt: bare leien (5,5 %) minus inflasjonen."),
         (pst(r_eksakt), "eksakt formel (1,025/1,05 − 1). Oppgaven ber om forenklet formel."),
         (pst(f_dobbel), "leien skattlagt en gang til. Den er allerede etter skatt.")],
        kontroll="Kapitaltapet (−3 %) spiser over halvparten av leieavkastningen (5,5 %) og inflasjonen gjør resten negativt.",
        kilde="F2 lb 12, lb 39, lb 40 og lb 41"),
    dekker=["f2-avkastningsmaal-01", "f2-avkastningsmaal-02", "f2-avkastningsmaal-05"])
S.oppgave("Sander og utleieleiligheten", "Investeringscaser", [3], "", [a5])

# =====================================================================
# Oppgave 6: Aksje med skatt og superprofitt (lb 42–44)
# =====================================================================
p0, p1, d, t, pi6, rf = 200, 214, 6, 0.30, 0.04, 0.025
R6 = (p1 - p0 + d) / p0
etter = R6 * (1 - t)
real_etter = etter - pi6
real_for = R6 - pi6
superp = real_for - rf
f_skatt_av_real = (R6 - pi6) * (1 - t)
f_super_nom = R6 - rf
f_infl_glemt = etter
assert lik(R6, 0.10) and lik(real_etter, 0.03) and lik(superp, 0.035)


def to(a, b):
    return (f"{pst(a)} og {pst(b)}", [pst(a), pst(b)])


a6 = S.ledd("", f"""<p>Line kjøper en aksje for kr {p0} og selger den ett år senere for kr {p1}. Hun mottar kr {d} i utbytte. Bruk en skattesats på 30 % på hele den nominelle avkastningen (eksempelsatsen fra lysbildet). Inflasjonen er 4 % og renten på tremåneders statskasseveksler er 2,5 %. Bruk forenklede formler. Hva er Lines realavkastning etter skatt og superprofitten før skatt? Svar med to desimaler.</p>""",
    riktig=to(real_etter, superp),
    gale=[to(f_skatt_av_real, superp), to(real_etter, f_super_nom), to(f_infl_glemt, superp)],
    solution=sol(
        "Skatten trekkes av den nominelle avkastningen, deretter inflasjonen: r ≈ R(1 − t) − π. Superprofitt er realavkastningen minus risikofri rente, vanligvis tremåneders statskasseveksler. Den kalles ofte risikopremien.",
        [f"R = ({p1} − {p0} + {d})/{p0} = {pst(R6)}.",
         f"Etter skatt: {pst(R6)} · 0,7 = {pst(etter)}. Real: {pst(etter)} − 4 % = <b>{pst(real_etter)}</b>.",
         f"Real før skatt: {pst(R6)} − 4 % = {pst(real_for)}. Superprofitt: {pst(real_for)} − 2,5 % = <b>{pst(superp)}</b>."],
        [(to(f_skatt_av_real, superp)[0], "skatt trukket av realavkastningen: (10 % − 4 %) · 0,7. Skatten tas av den nominelle avkastningen."),
         (to(real_etter, f_super_nom)[0], "superprofitt regnet av nominell avkastning: 10 % − 2,5 %."),
         (to(f_infl_glemt, superp)[0], "inflasjonen glemt etter skatt.")],
        kontroll="Med 22 % skatt i stedet blir realavkastningen etter skatt 7,8 % − 4 % = 3,8 %. Skatt på nominell avkastning kan gi negativ realavkastning selv når den er positiv før skatt.",
        kilde="F2 lb 43 og lb 44"),
    dekker=["f2-avkastningsmaal-03", "f2-avkastningsmaal-04"])
S.oppgave("Line og superprofitten", "Investeringscaser", [3, 2], "", [a6])

# =====================================================================
# Oppgave 7: Evig kontantstrøm og ekspropriasjon (lb 45–49)
# =====================================================================
a7 = S.ledd("a", "<p>Hvilken påstand om ekspropriasjonserstatningen er riktig?</p>",
    riktig="Høyesterett bruker en realrente på en nominell leie og jo høyere kapitaliseringsrente, desto lavere erstatning",
    gale=[
        "En høyere kapitaliseringsrente gir høyere erstatning, fordi eieren da blir kompensert for at leietakere kan forsvinne",
        "Oljefondets avkastning på 13,1 % i 2024 viser at en realrente på 4 % er lett å oppnå over tid",
        "Erstatningen er alltid skattefri, også for næringseiendom der beløpet ikke reinvesteres",
    ],
    solution=begrep(
        "En evigvarende leie verdsettes som V = CF/r. Høyesterett krever en realrente på minst 4 %, men leien er nominell. Konsistent er nominell rente på nominell strøm og realrente på reell strøm.",
        "Inkonsistent rente og invers sammenheng.",
        [("Høyere rente, høyere erstatning", "motsatt. V = CF/r faller når r stiger. 1 mill. gir 25 mill. med 4 % og 14,3 mill. med 7 %."),
         ("13,1 % viser at 4 % er lett", "13,1 % er ett år og nominelt i valutakurven. Oljefondets realavkastning har ligget rett under 4 % per år, så den eksproprierte må slå Oljefondet."),
         ("Alltid skattefri", "bare primærbolig når salgsgevinsten ville vært skattefri. Næringseiendom er skattepliktig, men skatten kan utsettes ved reinvestering innen tre år.")],
        kilde="F2 lb 45–49"),
    dekker=["f2-evig-kontantstrom-02", "f2-evig-kontantstrom-01", "f2-evig-kontantstrom-05", "f2-evig-kontantstrom-04"])

leie, ts, krav, infl = 300_000, 0.22, 0.10, 0.02
V = leie * (1 - ts) / (krav * (1 - ts))
assert lik(V, 3_000_000)
f_teller = leie * (1 - ts) / krav
f_nevner = leie / (krav * (1 - ts))
f_real = leie * (1 - ts) / (krav * (1 - ts) - infl)
b7 = S.ledd("b", f"""<p>Jonas vurderer en utleieeiendom. Leien er kr {kr(leie)} i året før skatt, til evig tid og uten vekst. Leien skattlegges med 22 %. Avkastningskravet før skatt er 10 % og den alternative plasseringen skattlegges også med 22 %. Inflasjonen er 2 %. Hva er eiendommen verdt for Jonas? Avrund til hele kroner.</p>""".replace(" og den", " og den"),
    riktig=(f"Kr {kr(V)}", [kr(V)]),
    gale=[(f"Kr {kr(f_teller)}", [kr(f_teller)]), (f"Kr {kr(f_nevner)}", [kr(f_nevner)]), (f"Kr {kr(f_real)}", [kr(f_real)])],
    solution=sol(
        "Verdien av en evig kontantstrøm er CF/r. Juster både kontantstrømmen og avkastningskravet for skatt. Skattlegges begge med samme sats, faller skatten ut.",
        [f"Leie etter skatt: {kr(leie)} · 0,78 = {kr(leie * 0.78)}.",
         f"Krav etter skatt: 10 % · 0,78 = {pst(krav * 0.78, 1)}.",
         f"V = {kr(leie * 0.78)}/0,078 = <b>kr {kr(V)}</b>, det samme som {kr(leie)}/0,10."],
        [(f"Kr {kr(f_teller)}", "bare telleren justert for skatt."),
         (f"Kr {kr(f_nevner)}", "bare nevneren justert for skatt."),
         (f"Kr {kr(f_real)}", "inflasjonen trukket fra kravet. Leien er nominell og vokser ikke, så den skal diskonteres med nominell rente.")],
        kontroll=f"Etter skatt gir {kr(V)} · 7,8 % = {kr(V * 0.078)}, som er leien etter skatt. ✓",
        kilde="F2 lb 46 og lb 47, Oppgaver F3 lb 2–3"),
    dekker=["f2-evig-kontantstrom-03", "f2-evig-kontantstrom-01", "f2-evig-kontantstrom-02"])
S.oppgave("Ekspropriasjon og evig leie", "Investeringscaser", [3, 2],
    "<p>Når en eiendom eksproprieres, betraktes en leieinntekt i norsk rett som en evigvarende kontantstrøm. Erstatningen skal sette eieren i stand til å gjenskape den tapte kontantstrømmen.</p>",
    [a7, b7])

# =====================================================================
# Oppgave 8: To-periodemodellen (lb 50–56)
# =====================================================================
r0, t0, t1 = 0.04, 0.22, 0.12
r_ny = r0 * (1 - t1) / (1 - t0)
f_etter = r0 * (1 - t1)
f_snudd = r0 * (1 - t0) / (1 - t1)
f_lin = r0 + (t0 - t1) * r0
Y1, Y2, C1 = 500_000, 300_000, 350_000
C2 = Y2 + (Y1 - C1) * (1 + r0 * (1 - t1))
assert lik(Y2 + (Y1 - C1) * (1 + r_ny * (1 - t0)), C2)
a8 = S.ledd("a", f"""<p>Ole har Y<sub>1</sub> = kr {kr(Y1)}, Y<sub>2</sub> = kr {kr(Y2)} og konsumerer C<sub>1</sub> = kr {kr(C1)}. Renten er 4 % og skatten på renteinntekt 22 %. Stortinget senker skatten på renteinntekt til 12 %. Hvilken rente ville med 22 % skatt gitt Ole samme budsjettlinje som skattekuttet? Svar med to desimaler.</p>""",
    riktig=(pst(r_ny), [pst(r_ny)]),
    gale=[(pst(f_etter), [pst(f_etter)]), (pst(f_snudd), [pst(f_snudd)]), (pst(f_lin), [pst(f_lin)])],
    solution=sol(
        "Budsjettet er C<sub>2</sub> = Y<sub>2</sub> + (Y<sub>1</sub> − C<sub>1</sub>)(1 + r(1 − t)). Stigningstallet avhenger bare av avkastningen etter skatt r(1 − t), så høyere rente og lavere skatt virker i samme retning.",
        [f"Etter skattekuttet: 4 % · (1 − 0,12) = {pst(f_etter)}.",
         f"Samme med 22 % skatt: r · 0,78 = {pst(f_etter)}, så r = {pst(f_etter)}/0,78 = <b>{pst(r_ny)}</b>.",
         f"C<sub>2</sub> blir i begge tilfeller {kr(Y2)} + {kr(Y1 - C1)} · {kr(1 + f_etter, 4)} = {kr(C2)}."],
        [(pst(f_etter), "avkastningen etter skatt, ikke renten før skatt som gir den."),
         (pst(f_snudd), "brøken snudd: 4 % · 0,78/0,88. Det gir lavere rente, som om skattekuttet gjorde sparing mindre lønnsomt."),
         (pst(f_lin), "skattekuttet ganget med renten lagt til renten (4 % + 10 % · 4 %). Glemt å dele på 1 − 0,22.")],
        kontroll=f"{pst(r_ny)} · 0,78 = {pst(r_ny * 0.78)} = 4 % · 0,88. ✓",
        kilde="F2 lb 50, lb 52 og lb 53"),
    dekker=["f2-makro-01", "f2-makro-02"])

b8 = S.ledd("b", "<p>Renten stiger. Siri er låntaker (Y<sub>1</sub> < C<sub>1</sub>) og Tor er långiver (Y<sub>1</sub> > C<sub>1</sub>). Hvilken påstand er riktig?</p>",
    riktig="Siri reduserer C<sub>1</sub> fordi begge effektene trekker ned, mens virkningen for Tor er usikker",
    gale=[
        "Både Siri og Tor reduserer C<sub>1</sub>, fordi substitusjonseffekten alltid dominerer inntektseffekten",
        "Siri kan øke C<sub>1</sub>, fordi inntektseffekten for en låntaker trekker motsatt vei av substitusjonseffekten",
        "Bankinnskudd er den største formuesposten, så de fleste husholdninger er långivere og samlet konsum stiger",
    ],
    solution=begrep(
        "Substitusjonseffekten senker C<sub>1</sub> for alle. For en låntaker er inntektseffekten også negativ (hun blir fattigere), så C<sub>1</sub> faller entydig. For en långiver er inntektseffekten positiv (han blir rikere), så totaleffekten er usikker. Det samme gjelder lavere skatt på renter.",
        "Entydig for Siri, usikkert for Tor.",
        [("Begge reduserer", "for Tor trekker inntektseffekten C<sub>1</sub> opp, så retningen er usikker."),
         ("Siri kan øke", "for en låntaker trekker begge effektene ned (Slutsky: Y<sub>1</sub> − C<sub>1</sub> < 0)."),
         ("De fleste er långivere", "primærbolig er 52 % av bruttoformuen og bankinnskudd 13 %. Flertallet av norske husholdninger er låntakere, så høyere rente demper konsumet og boligmarkedet.")],
        kilde="F2 lb 4, lb 8, lb 54, lb 55 og lb 56"),
    dekker=["f2-makro-03", "f2-makro-04", "f2-makro-05", "f2-formuesfordeling-04"])
S.oppgave("Rente, skatt og konsum i to perioder", "Sparing", [2, 14],
    "<p>En person maksimerer nytten av konsum over to perioder. Y er eksogen inntekt, C konsum, r renten og t skatten på renteinntekt.</p>",
    [a8, b8])

S.skriv(
    label="F2 Avkastning over tid på ulike aktiva",
    note="Formuesfordelingen og unoterte aksjer, Jordà mfl. om avkastning og risiko på bolig, aksjer og sikre aktiva, avkastningsmål med skatt og inflasjon, evig kontantstrøm ved ekspropriasjon og to-periodemodellen.",
    facts=[
        f"{S.n} flervalgsledd med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
        "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
        "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
        "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene.",
    ],
    practiceNote="Skriv R, skatt og inflasjon i rekkefølge før du ser på alternativene: skatt trekkes av nominell avkastning, inflasjonen etterpå. I Jordà-leddene skiller bare ett ord riktig fra galt, så les hvem som har høyest avkastning og hvem som har høyest risiko.",
)
