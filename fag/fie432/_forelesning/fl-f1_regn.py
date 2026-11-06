"""Eksamenssett per forelesning: F1 Innledning: skattesystemet og ulikhet (fl-f1)."""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f1")

# =====================================================================
# Oppgave 1: Eksamensformatet (lb 7–8)
# =====================================================================
R = 3
F = -R / 3
# a) påstander om eksamensformatet
R6 = 6
F6 = -R6 / 3
assert lik(0.25 * R6 + 0.75 * F6, 0)
blind = 0.25 * R + 0.75 * F
assert lik(blind, 0)
a1 = S.ledd("a", "<p>Hvilken påstand om eksamen og kursgodkjenningen i FIE432 i 2026 er riktig?</p>",
    riktig="Gir et spørsmål 6 poeng for rett, må feil svar gi −2 poeng for at blind gjetting skal ha forventning null",
    gale=[
        "Med 3 poeng for rett og −1 for feil taper du poeng i forventning på å gjette blindt, så blankt er alltid best",
        "Som på H2024 og H2025 gir feil svar ikke minuspoeng, så det lønner seg å svare på alle spørsmålene",
        "Kursgodkjenningen krever 17 av 20 rett, men den som glemmer testen, får et nytt forsøk etter fristen",
    ],
    solution=begrep(
        "Minuspoenget er valgt slik at blind gjetting har forventning null: ¼R + ¾F = 0 gir F = −R/3. Med R = 6 blir F = −2.",
        "Med 6 poeng for rett må feil gi −2.",
        [("Taper i forventning", "galt. Med 3 og −1 er forventningen ¼ · 3 + ¾ · (−1) = 0. Blind gjetting gir null i snitt, men større spredning."),
         ("Ingen minuspoeng", "gammel regel. H2024 og H2025 hadde ikke minuspoeng. I 2026 gir feil svar −1 (eller −2 ved 6 poeng)."),
         ("Nytt forsøk etter fristen", "galt. Siste frist for testen er fristen for oppmelding til eksamen. Den som glemmer testen, får ikke nytt forsøk.")],
        strategi="Påstandene om blankt og om minuspoeng kan strykes med regnestykket ¼ · 3 − ¾ · 1 = 0.",
        kilde="F1 lb 7 og lb 8"),
    dekker=["f1-eksamensformat-01", "f1-eksamensformat-03", "f1-eksamensformat-04", "f1-eksamensformat-05"])

# b) ett alternativ utelukket
p = 1 / 3
E = p * R + (1 - p) * F
E_uten_minus = p * R
E_feil_p = p * R + p * F
assert lik(E, 1 / 3)
b1 = S.ledd("b", "<p>Ola har ett spørsmål igjen. Han kan utelukke ett av de fire alternativene med sikkerhet. De tre andre virker like sannsynlige. Rett svar gir 3 poeng, feil −1 og blankt 0. Hva bør Ola gjøre og hva er forventet poeng av å svare? Svar med to desimaler.</p>",
    riktig=(f"Svare: forventet +{kr(E, 2)} poeng", [kr(E, 2)]),
    gale=[
        ("Stå over: forventet poeng av å svare er 0", ["0"]),
        (f"Svare: forventet +{kr(E_uten_minus, 2)} poeng", [kr(E_uten_minus, 2)]),
        (f"Svare: forventet +{kr(E_feil_p, 2)} poeng", [kr(E_feil_p, 2)]),
    ],
    solution=sol(
        "Med sannsynlighet p for rett svar er forventningen E = 3p − 1 · (1 − p) = 4p − 1. Det lønner seg å svare når p er over ¼.",
        [f"Tre alternativer igjen: p = 1/3.",
         f"E = 3 · 1/3 − 1 · 2/3 = 1 − 0,67 = <b>+{kr(E, 2)}</b>. Ola bør svare."],
        [("Stå over", "regelen for blind gjetting (p = ¼). Med ett alternativ utelukket er p = 1/3 og forventningen positiv."),
         (f"+{kr(E_uten_minus, 2)}", "minuspoenget glemt: bare 3 · 1/3."),
         (f"+{kr(E_feil_p, 2)}", "feil sannsynlighet for feil svar: 1/3 i stedet for 2/3.")],
        kontroll="Med to alternativer utelukket blir E = 4 · ½ − 1 = +1. Forventningen øker med hvert alternativ du kan stryke.",
        kilde="F1 lb 8"),
    dekker=["f1-eksamensformat-02", "f1-eksamensformat-01"])
S.oppgave("Minuspoeng og gjetting", "Eksamensstrategi", [1],
    "<p>Eksamen i FIE432 er flervalg med fire alternativer der nøyaktig ett er riktig.</p>", [a1, b1])

# =====================================================================
# Oppgave 2: Skattesystemet (lb 5; F3, F4 og F7 som støtte)
# =====================================================================
alm, trinn5, trinn4, tr_lonn, tr_naer, aga_full = 0.22, 0.178, 0.168, 0.076, 0.108, 0.141
kari = alm + trinn5 + tr_lonn
per = alm + trinn5 + tr_naer
ola = alm
assert lik(kari, 0.474) and lik(per, 0.506)
kari_aga = kari + aga_full
per_som_lonn = kari
ola_naer = per


def tre(a, b, c):
    t = [pst(a, 1), pst(b, 1), pst(c, 1)]
    return (f"{t[0]}, {t[1]} og {t[2]}", t)


a2 = S.ledd("a", "<p>Hva er marginalskatten på henholdsvis Karis lønn, Pers næringsinntekt og Olas leieinntekt?</p>",
    riktig=tre(kari, per, ola),
    gale=[tre(kari_aga, per, ola), tre(kari, per_som_lonn, ola), tre(kari, per, ola_naer)],
    solution=sol(
        "Alminnelig inntekt (lønn, næringsinntekt, renter, netto leie) skattlegges med 22 %. Personinntekt (lønn og næringsinntekt) får i tillegg trinnskatt og trygdeavgift. Utleie av én sekundærbolig er kapitalinntekt og får bare 22 %.",
        [f"Kari: 1 600 000 er over 1 467 200, så trinn 5 gjelder. 22 % + 17,8 % + 7,6 % = <b>{pst(kari, 1)}</b>.",
         f"Per: næringsinntekt over trinn 5: 22 % + 17,8 % + 10,8 % = <b>{pst(per, 1)}</b>.",
         f"Ola: leien er kapitalinntekt: <b>{pst(ola, 1)}</b>."],
        [(tre(kari_aga, per, ola)[0], "arbeidsgiveravgiften på 14,1 % lagt til Karis sats. Den betales av arbeidsgiveren og er ikke en del av lønnstakerens marginalskatt."),
         (tre(kari, per_som_lonn, ola)[0], "trygdeavgiften for lønn (7,6 %) brukt på næringsinntekt. Næring har 10,8 %."),
         (tre(kari, per, ola_naer)[0], "Olas utleie behandlet som næring. Én sekundærbolig er under grensen på fire boenheter, så leien er kapitalinntekt uten trinnskatt og trygdeavgift.")],
        kontroll="Forskjellen mellom Per og Kari er bare trygdeavgiften: 10,8 − 7,6 = 3,2 prosentpoeng.",
        kilde="F1 lb 5, F3 lb 16 og F4 lb 49"),
    dekker=["f1-skattesystem-03", "f1-skattesystem-06", "f1-skattesystem-01", "f1-skattesystem-02"])

# b) gjennomsnittsskatt i trinnsystem (egne trinn)
inntekt, fradrag = 650_000, 100_000
grunnlag = inntekt - fradrag
trinn = [(0, 200_000, 0.10), (200_000, 500_000, 0.20), (500_000, None, 0.35)]


def skatt_trinn(g, tr):
    s = 0
    for lo, hi, sats in tr:
        if g > lo:
            s += (min(g, hi) - lo if hi else g - lo) * sats
    return s


T = skatt_trinn(grunnlag, trinn)
assert lik(T, 97_500)
aert = T / inntekt
feil_nevner = T / grunnlag
feil_marg = 0.35
feil_topp_glemt = skatt_trinn(grunnlag, [(0, 200_000, 0.10), (200_000, None, 0.20)]) / inntekt
b2 = S.ledd("b", """<p>I et land er satsene på skattegrunnlaget 10 % opp til kr 200 000, 20 % fra kr 200 000 til kr 500 000 og 35 % over kr 500 000. Siri har kr 650 000 i bruttoinntekt og kr 100 000 i fradrag. Hva er Siris gjennomsnittsskatt (effektiv skattesats)? Svar med to desimaler.</p>""",
    riktig=(pst(aert), [pst(aert)]),
    gale=[(pst(feil_nevner), [pst(feil_nevner)]), (pst(feil_marg), [pst(feil_marg)]), (pst(feil_topp_glemt), [pst(feil_topp_glemt)])],
    solution=sol(
        "Gjennomsnittsskatt t = T/Y: betalt skatt delt på bruttoinntekt før fradrag. Skatten regnes trinn for trinn på grunnlaget etter fradrag.",
        [f"Grunnlag: 650 000 − 100 000 = {kr(grunnlag)}.",
         f"Skatt: 10 % · 200 000 + 20 % · 300 000 + 35 % · 50 000 = 20 000 + 60 000 + 17 500 = {kr(T)}.",
         f"t = {kr(T)}/650 000 = <b>{pst(aert)}</b>."],
        [(pst(feil_nevner), f"delt på skattegrunnlaget {kr(grunnlag)} i stedet for bruttoinntekten."),
         (pst(feil_marg), "marginalskatten, skatten på neste krone, brukt som gjennomsnitt."),
         (pst(feil_topp_glemt), "trinnet over 500 000 glemt: 20 % også på de siste 50 000.")],
        kontroll="Gjennomsnittsskatten (15 %) ligger under marginalskatten (35 %), slik den skal i et trinnsystem. Lær metoden: eksamen bruker egne trinn og satser.",
        kilde="F7 lb 21, F1 lb 20 og F3 lb 16"),
    dekker=["f1-skattesystem-04", "f1-skattesystem-05", "f1-skattesystem-09"])

# c) trinnskatten endres: oppjusteringsfaktoren
aga = 0.124
y0 = (alm + trinn5 + tr_lonn + aga - alm) / alm
assert abs(y0 - 1.72) < 0.005
trinn5_ny = 0.193
marg_ny = alm + trinn5_ny + tr_lonn
y_ny = (marg_ny + aga - alm) / alm
y_uten_aga = (marg_ny - alm) / alm
y_ikke_trukket = (marg_ny + aga) / alm
c2 = S.ledd("c", f"""<p>Stortinget hever satsen i trinn 5 fra 17,8 % til {pst(trinn5_ny, 1)}. Alle andre satser er uendret: 22 % på alminnelig inntekt og selskapsoverskudd, 7,6 % trygdeavgift på lønn. Arbeidsgiveravgiften som forelesningen bruker når oppjusteringsfaktoren begrunnes, er 12,4 %. I dag er faktoren 1,72. Hva blir den nye oppjusteringsfaktoren for utbytte og aksjegevinst etter forelesningens logikk? Svar med to desimaler.</p>""",
    riktig=(kr(y_ny, 2), [kr(y_ny, 2)]),
    gale=[("1,72", ["1,72"]), (kr(y_uten_aga, 2), [kr(y_uten_aga, 2)]), (kr(y_ikke_trukket, 2), [kr(y_ikke_trukket, 2)])],
    solution=sol(
        "Oppjusteringen skal hindre inntektsskifting: selskapsskatt + eierskatt skal tilsvare høyeste marginalskatt på lønn pluss arbeidsgiveravgift. Marginalskatt lønn + aga = t<sub>A</sub> + t<sub>A</sub> · y.",
        [f"Ny marginalskatt på lønn: 22 % + {pst(trinn5_ny, 1)} + 7,6 % = {pst(marg_ny, 1)}.",
         f"Med aga: {pst(marg_ny, 1)} + 12,4 % = {pst(marg_ny + aga, 1)} = 22 % + 22 % · y.",
         f"y = ({pst(marg_ny + aga, 1)} − 22 %)/22 % = <b>{kr(y_ny, 2)}</b>. Effektiv eierskatt blir om lag {pst(alm * y_ny, 1)} mot 37,84 % i dag."],
        [("1,72", "«utbytte har ingen trinnskatt, så trinnskatten påvirker ikke utbytte». Den virker indirekte gjennom y."),
         (kr(y_uten_aga, 2), "arbeidsgiveravgiften glemt i venstresiden."),
         (kr(y_ikke_trukket, 2), "selskapsskatten på 22 % ikke trukket fra før det deles på 22 %.")],
        kontroll=f"Dagens satser gir (47,4 % + 12,4 % − 22 %)/22 % = {kr(y0, 2)}. Hver ekstra prosentpoeng i trinn 5 løfter eierskatten med om lag ett prosentpoeng.",
        kilde="F1 lb 5, F4 lb 49 og F4 lb 50"),
    dekker=["f1-skattesystem-07", "f1-etter-skatt-04"])
S.oppgave("Kari, Per og Ola og trinnskatten", "Progressivitet", [1, 10],
    """<p>Bruk disse satsene for 2026: 22 % på alminnelig inntekt. Trinnskatt trinn 4 er 16,8 % fra kr 980 100 og trinn 5 er 17,8 % fra kr 1 467 200. Trygdeavgift 7,6 % på lønn og 10,8 % på næringsinntekt. Utleie av mer enn fire boenheter er næring.</p>
<p>Kari har kr 1 600 000 i lønn. Per driver utleie av tolv leiligheter og har kr 2 000 000 i næringsinntekt. Ola har kr 500 000 i lønn og leier i tillegg ut én sekundærbolig.</p>""",
    [a2, b2, c2])

# =====================================================================
# Oppgave 3: Anine-eksempelet (lb 14–17)
# =====================================================================
innskudd = 12_000_000
inv_andel = 0.15
verdsettelse = innskudd / inv_andel
assert lik(verdsettelse, 80_000_000)
m_andel = 0.60 * (1 - inv_andel)
assert lik(m_andel, 0.51)
bunn, rabatt, s1, s2, grense = 1_700_000, 0.20, 0.01, 0.011, 20_000_000


def fskatt(formue):
    g = max(formue - bunn, 0)
    lav = min(formue, grense) - bunn
    hoy = max(formue - grense, 0)
    return max(lav, 0) * s1 + hoy * s2 if formue > bunn else 0


fv = m_andel * innskudd * (1 - rabatt)
riktig_fs = fskatt(fv)
assert lik(riktig_fs, 31_960)
uten_rabatt = fskatt(m_andel * innskudd)
egen = m_andel * verdsettelse * s2
a3 = S.ledd("a", "<p>Hva blir Mathildes formuesskatt for aksjene, når det forutsettes at innskuddet står urørt hele året? Mathilde har ingen annen formue eller gjeld.</p>",
    riktig=(f"Kr {kr(riktig_fs)}", [kr(riktig_fs)]),
    gale=[("Kr 0", ["0"]), (f"Kr {kr(uten_rabatt)}", [kr(uten_rabatt)]), (f"Kr {kr(egen)}", [kr(egen)])],
    solution=sol(
        "Unoterte aksjer verdsettes til bokført verdi (eiendeler minus gjeld), ikke til prisen investorene betalte. Deretter 20 % aksjerabatt, så bunnfradrag og sats.",
        [f"Bokført verdi: 12 000 000 i innskudd − 0 i gjeld = 12 000 000.",
         f"Mathildes andel: 60 % av de 85 % som ikke er solgt = {pst(m_andel, 0)}. {pst(m_andel, 0)} · 12 000 000 = {kr(m_andel * innskudd)}.",
         f"Etter rabatt: {kr(m_andel * innskudd)} · 0,8 = {kr(fv)}.",
         f"Skatt: ({kr(fv)} − 1 700 000) · 1 % = <b>kr {kr(riktig_fs)}</b>."],
        [("Kr 0", "innskuddet regnet som investorenes eiendel. Pengene tilhører selskapet og øker den bokførte verdien."),
         (f"Kr {kr(uten_rabatt)}", "aksjerabatten på 20 % glemt."),
         (f"Kr {kr(egen)}", f"Mathildes eget regnestykke: {pst(m_andel, 0)} av emisjonsverdien 80 mill. ganget med 1,1 %. Hun bruker markedsverdien, glemmer rabatt og bunnfradrag og bruker 1,1 % på hele formuen.")],
        kontroll="Anine-eksempelet på lysbildet går fra 495 000 til 19 000 kr med samme fire feil.",
        kilde="F1 lb 14, lb 15 og lb 16"),
    dekker=["f1-anine-01", "f1-anine-02"])

b3 = S.ledd("b", "<p>Hvilken påstand om Mathilde-eksempelet er riktig?</p>",
    riktig="Innskuddet brukes i praksis til lønn og utvikling i løpet av året, så formuesverdien blir lavere",
    gale=[
        "Børsnotering ville senket formuesskatten hennes, siden bokført verdi ofte ligger over børsverdien",
        "Hadde selskapet vært børsnotert, ville formuesverdien vært bokført verdi uten aksjerabatt",
        "Forelesningen bruker oppslaget som eksempel på at pressen gjengir skattereglene presist",
    ],
    solution=begrep(
        "Eksempelet forutsetter at innskuddet står på konto hele året. I en oppstartsbedrift brukes pengene til lønn, drift og utvikling, så eiendelene ved årsslutt blir lavere enn 12 mill.",
        "Formuesverdien blir i praksis enda lavere.",
        [("Børsnotering senker skatten", "motsatt. Bokført verdi ligger typisk langt under markedsverdien. Derfor tar smarte investorer selskaper av børs for å spare formuesskatt."),
         ("Børsnotert til bokført verdi", "galt. Børsnoterte aksjer verdsettes til kursen per 1. januar i skattefastsettingsåret. Begge typer får 20 % rabatt."),
         ("Pressen gjengir reglene presist", "motsatt. Forelesningen bruker Anine-oppslaget som eksempel på at meninger om skatt ofte er farget av politikk. Oppslaget ble brukt i valgkampen og regnestykket var feil.")],
        kilde="F1 lb 11, lb 12, lb 16 og lb 17"),
    dekker=["f1-anine-03", "f1-anine-04", "f1-anine-02", "f1-anine-05"])
S.oppgave("Mathilde og formuesskatten på oppstartsselskapet", "Formuesskatt", [7],
    """<p>Mathilde eier et unotert oppstartsselskap uten gjeld. Investorer betaler kr 12 000 000 for 15 % av aksjene, en «verdsettelse på 80 mill.». Mathilde eier 60 % av de øvrige aksjene. Hun skriver i en avis at hun må betale nesten en halv million i formuesskatt, regnet som 1,1 % av sin andel av 80 mill.</p>
<p>Formuesskatt: 1 % av formuen mellom bunnfradraget på kr 1 700 000 og kr 20 000 000, 1,1 % over kr 20 000 000. Aksjerabatt 20 %.</p>""",
    [a3, b3])

# =====================================================================
# Oppgave 4: Progressivitet (lb 19)
# =====================================================================
eva, jon, sats = 400_000, 1_000_000, 0.30
def snitt(y, bf):
    return sats * max(y - bf, 0) / y
evaB, jonB = snitt(eva, 150_000), snitt(jon, 150_000)
evaC, jonC = snitt(eva, 250_000), snitt(jon, 250_000)
assert lik(evaB, 0.1875) and lik(jonB, 0.255)
gapB, gapC = jonB - evaB, jonC - evaC
assert gapC > gapB
kroner_ratio = jon / eva
a4 = S.ledd("", "<p>Hvilken påstand er riktig?</p>",
    riktig=(f"Under B betaler Eva {pst(evaB)} og Jon {pst(jonB)} av inntekten, så B er progressivt", [pst(evaB), pst(jonB)]),
    gale=[
        (f"A er progressivt fordi Jon betaler {kr(kroner_ratio, 1)} ganger så mange kroner i skatt som Eva", [kr(kroner_ratio, 1)]),
        ("A, B og C gir lik gjennomsnittsskatt for Eva og Jon, fordi marginalskatten er 30 % for begge", ["30"]),
        ("B og C er like progressive, fordi bunnfradraget sparer Eva og Jon for like mange kroner", []),
    ],
    solution=sol(
        "Et skattesystem er progressivt når andelen av inntekten man betaler i skatt, øker med inntekten. Flat sats uten bunnfradrag er proporsjonal. Bunnfradrag gjør en flat sats progressiv og et større bunnfradrag gjør den sterkere progressiv.",
        [f"B: Eva 30 % · 250 000/400 000 = {pst(evaB)}. Jon 30 % · 850 000/1 000 000 = {pst(jonB)}. Snittet øker med inntekten.",
         f"C: Eva {pst(evaC)}, Jon {pst(jonC)}. Avstanden øker fra {kr(100 * gapB, 2)} til {kr(100 * gapC, 2)} prosentpoeng."],
        [("A er progressivt", "kronebeløp avgjør ikke. Under A betaler begge 30 % av inntekten, som Pia og Nico på lysbildet. A er proporsjonalt."),
         ("Lik gjennomsnittsskatt", "bare A gir lik gjennomsnittsskatt. Flat marginalsats med bunnfradrag gir lavere snitt for den som tjener minst."),
         ("Like progressive", "kronene er like, men de utgjør en større andel av Evas inntekt. Større bunnfradrag gir sterkere progressivitet.")],
        kilde="F1 lb 19 og F7 lb 25"),
    dekker=["f1-progressivitet-01", "f1-progressivitet-02", "f1-progressivitet-03"])
S.oppgave("Eva, Jon og tre flate skatter", "Progressivitet", [10],
    "<p>Eva tjener kr 400 000 og Jon kr 1 000 000. Tre forslag har alle en flat sats på 30 %. A har ikke bunnfradrag. B har et bunnfradrag på kr 150 000. C har et bunnfradrag på kr 250 000.</p>",
    [a4])

# =====================================================================
# Oppgave 5: Effektiv skattesats for eiere (lb 20–22)
# =====================================================================
a5 = S.ledd("a", "<p>Mia har kr 30 000 000 i banken og får kr 1 200 000 i renter. Hun betaler 22 % skatt. Noah eier alene et aksjeselskap som tjener kr 1 200 000 før skatt og betaler 22 % selskapsskatt. Noah tar ikke ut utbytte og har ingen annen inntekt. Hvilken påstand er riktig?</p>",
    riktig="Begge har reelt samme inntekt og skatt, men offisiell statistikk registrerer Noah uten inntekt",
    gale=[
        "Noah betaler mindre skatt enn Mia, fordi han verken betaler skatt på renter eller skatt på utbytte",
        "Noahs effektive skattesats er 0 %, fordi overskuddet ikke tilhører ham før det betales ut som utbytte",
        "Tilbakeholdt overskudd i børsnoterte selskaper gir ikke aksjonærene verdi før det blir delt ut",
    ],
    solution=begrep(
        "Mia betaler 264 000 og Noahs selskap 264 000, begge 22 % av 1 200 000. Mias renter registreres på henne fordi hun eier kontoen. Noahs inntekt registreres bare når han tar utbytte som personlig aksjonær. Det er målingen som skiller dem, ikke skatten.",
        "Samme inntekt og skatt, ulik registrering.",
        [("Noah betaler mindre", "selskapet har betalt 22 %, det samme som Mia."),
         ("Effektiv sats 0 %", "påstanden om at aksjonærer ikke eier overskuddet før utbytte. Noah er eneeier og bestemmer selv når utbytte tas."),
         ("Ingen verdi før utdeling", "i en markedsøkonomi gjenspeiles tilbakeholdt overskudd i aksjekursen og kan realiseres ved å selge aksjer.")],
        kilde="F1 lb 20, lb 21 og lb 22"),
    dekker=["f1-progressivitet-06", "f1-progressivitet-07"])

alfa, overskudd, t_s, utdelt, eier = 0.40, 5_000_000, 0.22, 1_000_000, 0.22 * 1.72
sel_skatt = alfa * overskudd * t_s
utb = alfa * utdelt
utb_skatt = utb * eier
assert lik(utb_skatt, 151_360)
aert6 = (sel_skatt + utb_skatt) / (alfa * overskudd)
f_utbytte = utb_skatt / utb
f_uten_sel = utb_skatt / (alfa * overskudd)
f_nevner_etter = (sel_skatt + utb_skatt) / (alfa * overskudd * (1 - t_s))
b5 = S.ledd("b", "<p>Ida eier 40 % av et unotert selskap som tjener kr 5 000 000 før skatt og betaler 22 % selskapsskatt. Selskapet deler ut kr 1 000 000 i utbytte. Ida har ingen annen inntekt. Utbytte skattlegges med 22 % · 1,72 = 37,84 %. Se bort fra skjerming. Hva er Idas samlede effektive skattesats, målt slik forelesningen sier den må måles for en aksjonær? Svar med to desimaler.</p>",
    riktig=(pst(aert6), [pst(aert6)]),
    gale=[(pst(f_utbytte), [pst(f_utbytte)]), (pst(f_uten_sel), [pst(f_uten_sel)]), (pst(f_nevner_etter), [pst(f_nevner_etter)])],
    solution=sol(
        "Effektiv skattesats er betalt skatt delt på bruttoinntekt. For en aksjonær skal andelen av selskapets bruttoinntekt i nevneren og andelen av selskapsskatten i telleren: (personskatt + α · selskapsskatt)/(personinntekt + α · selskapsinntekt).",
        [f"Andel selskapsskatt: 40 % · 5 000 000 · 22 % = {kr(sel_skatt)}.",
         f"Utbytte til Ida: 40 % · 1 000 000 = {kr(utb)}. Skatt: {kr(utb)} · 37,84 % = {kr(utb_skatt)}.",
         f"Sats: ({kr(sel_skatt)} + {kr(utb_skatt)})/{kr(alfa * overskudd)} = <b>{pst(aert6)}</b>."],
        [(pst(f_utbytte), "eierskatten delt på utbyttet. Det er satsen på utbyttet, ikke Idas samlede sats."),
         (pst(f_uten_sel), "selskapsskatten glemt i telleren, slik offisiell statistikk gjør."),
         (pst(f_nevner_etter), "delt på andelen av overskuddet etter selskapsskatt. Nevneren skal være inntekt før skatt.")],
        kontroll="Satsen ligger mellom 22 % (bare selskapsskatt) og 37,84 % (satsen på utbyttet), fordi bare en del av Idas andel er delt ut.",
        kilde="F1 lb 20 og lb 21, F5 lb 22–23"),
    dekker=["f1-progressivitet-04", "f1-progressivitet-05"])
S.oppgave("Mia, Noah og Ida: hvem eier overskuddet?", "Effektiv skattesats", [1],
    "<p>Forelesningen spør om aksjonærer eier overskuddet før det er betalt ut som utbytte.</p>", [a5, b5])

# =====================================================================
# Oppgave 6: Hva skal med i fordelingsanalyser (lb 23–25)
# =====================================================================
a6 = S.ledd("", "<p>Hvilken påstand er i tråd med forelesningen om hva som skal med i inntekt og formue i fordelingsanalyser?</p>",
    riktig="Pensjon regnes som formue bare når den finnes som en andel arvingene kan overta, som i noen private ordninger",
    gale=[
        "Moum støttet Juel (Civita) i at formuesfordelingen ikke er skjev når rettighetene i folketrygden tas med",
        "Stortinget har vedtatt et bindende prinsipp om progressiv skatt og ikke bare sluttet seg til skatteevneprinsippet",
        "Når kommunale tjenester tas med som inntekt, forsvinner økningen i ulikhet som SSB2 finner etter 2001",
    ],
    solution=begrep(
        "Økonomer mener eierinntekt og skatt betalt gjennom selskaper skal med. Pensjon er formue bare hvis den eksisterer som en andel arvingene kan overta. Offentlig ansatte har ingen slik formue: pensjon er som lønn, en løpende utbetaling.",
        "Pensjon er formue bare når den kan arves.",
        [("Moum støttet Juel", "motsatt. Moum kritiserte Juels «pensjonsundring»: utbetalingene finansieres av den samme befolkningen, så rettighetene gir ikke et dekkende bilde av krav og forpliktelser."),
         ("Bindende progressivitet", "Stortinget har bare sluttet seg til skatteevneprinsippet. Det er ikke vedtatt noe bindende prinsipp om progressiv skatt."),
         ("Ulikheten forsvinner", "SSB2 finner at kommunale tjenester reduserer ulikheten, men ikke nok til å motvirke selskapsinntekt, kapitalgevinster og boligtjenester.")],
        kilde="F1 lb 23, lb 24 og lb 25, F7 lb 26, SSB2 s. 8"),
    dekker=["f1-progressivitet-08", "f1-progressivitet-09", "f1-progressivitet-10", "f1-ssb2-12"])
S.oppgave("Pensjon som formue", "Progressivitet", [10], "", [a6])

# =====================================================================
# Oppgave 7: Norge mot USA 2001–2018 (lb 27–29, SSB2)
# =====================================================================
a7 = S.ledd("a", "<p>Hvilken påstand om inntektsveksten 2001–2018 er riktig?</p>",
    riktig="Snittet vokste om lag dobbelt så mye i Norge som i USA og topp 1 % vokste også langt mer i Norge",
    gale=[
        "Både snittet og de nederste 20 % hadde høyere inntektsvekst i Norge enn i USA i denne perioden",
        "Forelesningens 187 % for topp 1 % motsier SSB2s 171 %, så ett av de to tallene må være feil",
        "Moene (2015) viser at USA har flere rike per innbygger enn Norge, så drømmen er lettere å nå der",
    ],
    solution=begrep(
        "Snittinntekten vokste 50 % i Norge mot 25 % i USA. Middelklassen (38 mot 20 %), øvre middelklasse (47 mot 32 %) og topp 1 % (187 mot 45 %) vokste også mer i Norge. Men de nederste 20 % vokste mer i USA (35 %) enn i Norge (21 %).",
        "Snittet og toppen vokste mer i Norge.",
        [("Nederste 20 % mer i Norge", "det speilvendte alternativet på lysbildet. De nederste 20 % vokste 35 % i USA og 21 % i Norge."),
         ("187 og 171 motsier hverandre", "tallene bygger på ulike inntektsmål. 171 % (SSB2 kap. 2) har med boligtjenester og kapitalgevinster. 187 % (Norge–USA-kapitlet) er justert for å kunne sammenlignes med USA."),
         ("Flere rike i USA", "motsatt. Moene fant fire ganger så mange rike og dobbelt så mange superrike i Norge, blant annet fordi velferdsstaten gir alle sjansen til utdanning.")],
        kilde="F1 lb 27, lb 28 og lb 29, SSB2 s. 81, eldre F1 lb 46"),
    dekker=["f1-ulikhet-tall-01", "f1-ulikhet-tall-02", "f1-ssb2-07", "f1-ulikhet-tall-09"])

b7 = S.ledd("b", "<p>SSB2 sammenligner skatte- og avgiftsprosenten langs inntektsfordelingen i Norge og USA (2018). Hvilken påstand er riktig?</p>",
    riktig="Norge stiger opp til 95.–99. prosentil og faller så kraftig, mens USA ligger nær 30 % innen topp 1 %",
    gale=[
        "Norge er mer progressivt enn USA også innen topp 1 %, fordi prosenten stiger helt opp til topp 0,01 %",
        "Både Norge og USA er sterkt regressive innen topp 1 %, så toppen betaler lite i begge land",
        "En provenynøytral flat skatt ville gitt en Gini mer enn ti prosentpoeng over den faktiske i Norge",
    ],
    solution=begrep(
        "Skatte- og avgiftsprosenten (med mva, aga, selskapsskatt og eiendomsskatt) stiger fra 41 % for nederste halvdel til 53 % for 95.–99. prosentil og faller til 8 % for topp 0,01 %. Innen topp 1 % betaler amerikanerne om lag 30 % flatt. USA er progressivt på toppen, Norge regressivt.",
        "Norge stiger og faller, USA er om lag flatt på toppen.",
        [("Norge mer progressivt på toppen", "motsatt. Prosenten faller til 40, 17 og 8 % innen topp 1 %."),
         ("Begge regressive", "USA ligger om lag flatt rundt 30 % innen topp 1 %. Bare Norge er regressivt der."),
         ("Flat skatt mye verre", "SSB2 finner at en provenynøytral flat skatt aldri ville gitt mer enn 3 prosentpoeng høyere Gini, fordi systemet allerede er regressivt på toppen.")],
        kilde="SSB2 s. 22, s. 63, s. 82–83 og s. 90"),
    dekker=["f1-ssb2-03", "f1-ssb2-04", "f1-ssb2-11"])
S.oppgave("Norge mot USA", "Ulikhet", [3, 10],
    "<p>Forelesningen spør hva studentene vet om norsk økonomi sammenlignet med USA. Tallene kommer fra Aaberge mfl. (2021), SSB2.</p>", [a7, b7])

# =====================================================================
# Oppgave 8: Toppen av fordelingen (lb 30–34)
# =====================================================================
a8 = S.ledd("a", "<p>Aaberge mfl. (2020) regner gjennomsnittsskatt med selskaps- og formuesskatt langs fordelingen i 2004. Hvilken påstand er riktig?</p>",
    riktig="Skatten stiger til om lag 37 % ved 99. prosentil og faller til 22 % for topp 1 % og 14 % for topp 0,1 %",
    gale=[
        "Topp 1 % betaler om lag 37 %, mer enn alle andre grupper, fordi selskapsskatten deres er tatt med i målet",
        "Offisielle tall gir topp 1 % 38 % i 2012, så det justerte målet overdriver hvor lav skatten er på toppen",
        "Skatten faller på toppen fordi topp 1 % har mest lønnsinntekt og trinnskatten har en øvre grense",
    ],
    solution=begrep(
        "Gjennomsnittsskatten er 7 % ved 10. prosentil, 20 % ved 40., 25 % ved 70. og 37 % ved 99. prosentil. Deretter faller den til 22 % for topp 1 % og 14 % for topp 0,1 %. De rikeste har mest eierinntekt, som holdes tilbake i selskapene. Den regnes som inntekt, men utløser ikke personskatt.",
        "Progressivt til 99. prosentil, regressivt på toppen.",
        [("Topp 1 % betaler 37 %", "37 % gjelder 99. prosentil, ikke topp 1 %."),
         ("Offisielle 38 %", "offisielle tall mangler tilbakeholdt overskudd i nevneren. Satsen for topp 1 % svinger da fra 17 % (2005) til 38 % (2012) med utbyttetilpasningene."),
         ("Mest lønnsinntekt", "motsatt. Arbeidsinntekt faller fra 90 % av markedsinntekten ved 98. prosentil til 32 % helt på toppen. Eierinntekt dominerer.")],
        kilde="F1 lb 31, SSB1 s. 8, s. 20 og s. 25"),
    dekker=["f1-ulikhet-tall-03", "f1-ssb1-05", "f1-ssb1-09", "f1-ssb1-10"])

b8 = S.ledd("b", "<p>Hvilken påstand om formue og markedsinntekt fra forelesningen er riktig?</p>",
    riktig="Topp 1 % har økt sin andel av markedsinntekten fra 11 % til 30 % siden 2004, til tross for formuesskatten",
    gale=[
        "Topp 1 % sin andel av samlet formue falt fra 21 % til 14,8 % fra 1995 til 2016, fordi aksjer ble jevnere fordelt",
        "De 20 % rikeste eier til sammen 9,1 % av formuen, mens halvparten av befolkningen eier resten",
        "Formuesveksten fra 2001 til 2018 var størst for nederste halvdel, fordi de eier mest bolig",
    ],
    solution=begrep(
        "Lysbildet: påstanden om at formuesskatten har gitt de rikeste en mindre andel, er feil. Topp 1 % fikk fra 11 til 30 % av markedsinntekten og 25–30 % tilfaller i dag én prosent av befolkningen.",
        "Topp 1 % har økt andelen.",
        [("Formuesandelen falt", "motsatt. Topp 1 % økte fra 14,8 til 21 % fordi aksjer ble mer konsentrert på toppen."),
         ("De 20 % rikeste eier 9,1 %", "9,1 % er det 80 % av befolkningen eier til sammen. Halvparten har ingen formue."),
         ("Nederste halvdel størst vekst", "SSB2: nederste halvdel fikk 20 % formuesvekst, topp 1 % 117 %. Gini for nettoformue økte fra 0,65 til 0,69.")],
        kilde="F1 lb 30, lb 31 og lb 34, SSB2 s. 39–40"),
    dekker=["f1-ulikhet-tall-04", "f1-ulikhet-tall-05", "f1-ulikhet-tall-08", "f1-ssb2-09"])
S.oppgave("Toppen av inntekts- og formuesfordelingen", "Ulikhet", [3, 10],
    "<p>Forelesningen stiller flere påstander om inntekt, formue og skatt for de rikeste i Norge.</p>", [a8, b8])

# =====================================================================
# Oppgave 9: SSB1, offisiell statistikk mot justert mål
# =====================================================================
a9 = S.ledd("a", "<p>Offisiell statistikk viste at ulikheten steg fram til 2005 og falt tilbake til 2001-nivå i 2006. Hva er forklaringen ifølge SSB1?</p>",
    riktig="Utbytteskatten var varslet: eierne tok ut store utbytter før 2006 og holdt overskuddet tilbake etterpå",
    gale=[
        "Skattereformen i 2006 omfordelte inntekt fra de rikeste til resten, så den reelle ulikheten falt det året",
        "Formuen til de rikeste vokste svakere enn inntekten etter 2006, fordi utbytte ble mer lønnsomt",
        "Finanskrisen i 2008 ga store fall i toppandelene i både det offisielle og det justerte målet",
    ],
    solution=begrep(
        "Offisiell statistikk bygger på skattemeldingen og fanger bare selskapsinntekt som tas ut som utbytte eller realisert gevinst. Skaugeutvalget varslet utbytteskatt i 2003. Eierne tok ut mye mens utbytte var skattefritt og lite fra 2006. Det var skattetilpasning, ikke reell endring.",
        "Varslet utbytteskatt og tilbakeholdt overskudd.",
        [("Reformen omfordelte", "fallet i 2006 var utbetalt utbytte som falt. Den justerte toppandelen steg til 22 % i 2006 og 2007."),
         ("Formuen vokste svakere", "motsatt. Utbytte ble mindre lønnsomt, overskuddet ble i selskapene og aksjeverdiene (formuen) steg mye mer enn registrert inntekt."),
         ("Fall i begge mål", "finanskrisen ga store fall i det justerte målet, men nesten ingen endring i det offisielle.")],
        kilde="SSB1 s. 3, s. 4 og s. 11, F1 lb 33"),
    dekker=["f1-ssb1-01", "f1-ssb1-03", "f1-ssb1-08", "f1-ulikhet-tall-06"])

b9 = S.ledd("b", "<p>Hvilken beskrivelse av inntektsmålene i SSB1 og SSB2 er riktig?</p>",
    riktig="SSB2 legger til tilbakeholdt overskudd, boligtjenester og gevinster på bolig og verdipapirer unntatt aksjer",
    gale=[
        "SSB1 legger endringen i markedsverdien av eiernes aksjer til inntekten i stedet for utbetalt utbytte og gevinst",
        "SSB1 tar med verdien av å bo i egen bolig, men utelater tilbakeholdt overskudd i selskapene",
        "Offisiell statistikk bruker Haig–Simons-inntekt: konsum pluss skatt pluss endring i nettoformue",
    ],
    solution=begrep(
        "SSB1 erstatter mottatt utbytte og realisert gevinst med eierandel ganger årsresultat etter selskapsskatt i direkte og indirekte eide selskaper. SSB2 bruker samme komponent og legger til boligtjenester (leieverdi minus renter) og kapitalgevinster på bolig, annen fast eiendom og verdipapirer, men ikke aksjer.",
        "Tre tillegg i SSB2.",
        [("Endring i aksjeverdien", "SSB1 bruker årsresultatet, ikke kursendringer. Kapitalgevinster er ikke med i SSB1."),
         ("Boligtjenester i SSB1", "SSB1 utelater både kapitalgevinster og boligtjenester. Det gjør SSB2."),
         ("Offisiell = Haig–Simons", "offisiell statistikk måler inntekt når den realiseres på personlig hånd. Haig–Simons-inntekten SSB2 bygger på, tar med også urealiserte gevinster.")],
        kilde="SSB1 s. 5–7 og s. 19, SSB2 s. 4, s. 10 og s. 13–14"),
    dekker=["f1-ssb2-01", "f1-ssb1-02", "f1-ssb1-11", "f1-ssb2-10"])

c9 = S.ledd("c", "<p>Hvilken påstand om Gini-koeffisienten i SSB1 og SSB2 er riktig?</p>",
    riktig="I SSB1 økte justert Gini om lag 35 % fra 2001 til 2018 og i SSB2 lå hele målet 36 % over offisiell i 2018",
    gale=[
        "I SSB1 økte justert Gini om lag 9 % fra 2001 til 2018 og i SSB2 lå hele målet 36 % over offisiell i 2018",
        "I SSB1 økte justert Gini om lag 35 % fra 2001 til 2018 og i SSB2 lå hele målet 36 % under offisiell i 2018",
        "Justert Gini falt fra 0,35 til 0,26, som viser økt ulikhet fordi Gini er 1 når alle har lik inntekt",
    ],
    solution=begrep(
        "SSB1: offisiell Gini 0,23 → 0,25 (+9 %), justert 0,26 → 0,35 (+35 %). SSB2: Gini etter skatt 0,27 → 0,35 og i 2018 er det fullstendige målet 36 % høyere enn offisiell. Gini er 0 når alle har lik inntekt og 1 når én har alt.",
        "35 % i SSB1 og 36 % over offisiell i SSB2.",
        [("Justert +9 %", "9 % er økningen i den offisielle Gini-en. Den justerte økte om lag 35 %."),
         ("36 % under offisiell", "fortegnet snudd. Med tilbakeholdt overskudd, boligtjenester og kapitalgevinster blir målt ulikhet høyere."),
         ("Gini 1 ved likhet", "motsatt. G = 0 betyr full likhet og høyere Gini mer ulikhet. Gini steg fra 0,26 til 0,35.")],
        kilde="SSB1 s. 15–18, SSB2 s. 19 og s. 89"),
    dekker=["f1-ssb1-04", "f1-ssb2-02", "f1-ssb1-06"])

snitt_inntekt, lars = 500_000, 350_000
etter = lars - 0.5 * snitt_inntekt + 0.5 * lars
uten_skatt = lars + 0.5 * lars
uten_overf = lars - 0.5 * snitt_inntekt
snudd = lars - 0.5 * lars + 0.5 * snitt_inntekt
d9 = S.ledd("d", f"<p>SSB1 illustrerer hva en økning i Gini-koeffisienten på 50 % betyr, med en tenkt skatte- og overføringsreform. Anta at gjennomsnittsinntekten er kr {kr(snitt_inntekt)}. Lars tjener kr {kr(lars)}. Hva sitter Lars igjen med etter reformen i illustrasjonen?</p>",
    riktig=(f"Kr {kr(etter)}", [kr(etter)]),
    gale=[(f"Kr {kr(uten_skatt)}", [kr(uten_skatt)]), (f"Kr {kr(uten_overf)}", [kr(uten_overf)]), (f"Kr {kr(snudd)}", [kr(snudd)])],
    solution=sol(
        "En økning i Gini på 50 % tilsvarer en reform der alle betaler 50 % av gjennomsnittsinntekten som et fast kronebeløp i skatt og får tilbake 50 % av sin egen inntekt som overføring.",
        [f"Fast skatt: 50 % · {kr(snitt_inntekt)} = {kr(0.5 * snitt_inntekt)}.",
         f"Overføring: 50 % · {kr(lars)} = {kr(0.5 * lars)}.",
         f"Lars: {kr(lars)} − {kr(0.5 * snitt_inntekt)} + {kr(0.5 * lars)} = <b>kr {kr(etter)}</b>."],
        [(f"Kr {kr(uten_skatt)}", "den faste skatten glemt."),
         (f"Kr {kr(uten_overf)}", "overføringen glemt."),
         (f"Kr {kr(snudd)}", "reformen snudd: skatt som andel av egen inntekt og overføring som andel av snittet. Den ville redusert ulikheten.")],
        kontroll=f"En med 1 000 000 får 1 000 000 − 250 000 + 500 000 = 1 250 000. Avstanden til Lars øker. Merk: +50 % i Gini betyr ikke 50 prosentpoeng.",
        kilde="SSB1 s. 18, SSB2 s. 19"),
    dekker=["f1-ssb1-07"])
S.oppgave("Ulikheten er større enn statistikken viser", "Ulikhet", [3, 10],
    "<p>SSB1 er Aaberge, Modalsli og Vestad (2020). SSB2 er Aaberge, Mogstad, Vestad og Vestre (2021). Begge er pensum til forelesning 1.</p>",
    [a9, b9, c9, d9])

# =====================================================================
# Oppgave 10: SSB2 om arbeidere, kapitaleiere og sparing
# =====================================================================
a10 = S.ledd("", "<p>SSB2 deler husholdningene i «arbeidere» og «kapitaleiere» etter hva som er den største inntektskilden. Hvilken påstand er riktig?</p>",
    riktig="I samme inntektsgruppe betaler arbeidere en høyere andel i skatt enn kapitaleiere, som sparer i selskapene",
    gale=[
        "Topp 1 % mottar om lag 10 % av inntekten og betaler om lag 15 % av skattene og avgiftene i 2018",
        "En lønnstaker med kr 600 000 og uten fradrag betaler om lag 47 % av inntekten i skatt i 2026",
        "Topp 0,01 % sparer en liten del av inntekten, fordi de tar ut overskuddet som utbytte hvert år",
    ],
    solution=begrep(
        "Skatteprosenten øker med inntekten for arbeidere, men faller med inntekten for kapitaleiere. Kapitaleiere sparer i selskapene og utsetter eller unngår personskatt.",
        "Arbeidere betaler mer enn kapitaleiere med samme inntekt.",
        [("10 og 15 %", "tallene er byttet om. Topp 1 % mottar 15 % av inntekten og betaler 10 % av skattene."),
         ("47 % i snitt", "47,4 % er marginalskatten på toppen av lønnsskalaen. Gjennomsnittsskatten på 600 000 er om lag 24 %."),
         ("Sparer lite", "motsatt. Topp 0,01 % sparer nær 90 % av bruttoinntekten, mest som tilbakeholdt overskudd. Lavt utbytte er ikke lav inntekt.")],
        kilde="SSB2 s. 8 og s. 64–65, F4 lb 39"),
    dekker=["f1-ssb2-05", "f1-ssb2-06", "f1-ssb2-08", "f1-skattesystem-08"])
S.oppgave("Arbeidere og kapitaleiere", "Progressivitet", [10, 3], "", [a10])

# =====================================================================
# Oppgave 11: Pengemakt (lb 34–38)
# =====================================================================
a11 = S.ledd("", "<p>Forelesningen begrunner hvorfor økt ulikhet er bekymringsfullt. Hvilken påstand er riktig?</p>",
    riktig="Rokkan: velgerne bestemmer Stortinget, men viktige saker avgjøres i maktkamp mellom store interesseorganisasjoner",
    gale=[
        "Forelesningen peker bare på pengemakt på borgerlig side og fagbevegelsen nevnes ikke som maktfaktor",
        "Gilens og Page fant at norsk politikk oftere følger elitenes interesser enn gjennomsnittsborgerens",
        "Topp 1 % er om lag 3 700 personer og de superrike (topp 0,01 %) er om lag 40 000 personer",
    ],
    solution=begrep(
        "«Stemmer teller, men ressurser avgjør». Store interessegrupper i arbeidsliv og næringsliv har ofte mer innflytelse bak kulissene enn velgerne uttrykker. Kanalene er finansiering av politikk, medieeierskap, tenketanker, tilgang til beslutningstakere og nettverk som NHO, FinansNorge og LO.",
        "Rokkan-sitatet.",
        [("Bare borgerlig side", "lysbildet nevner både store gaver fra rike til borgerlig side i 2025 og LOs gaver til venstresiden."),
         ("Gilens og Page om Norge", "studien gjelder USA."),
         ("3 700 og 40 000", "tallene er byttet om. Topp 1 % er om lag 40 000 personer, topp 0,01 % om lag 300–400. 3 700 var topp 0,1 % i 2004.")],
        kilde="F1 lb 31, lb 34, lb 36–38, eldre F1 lb 25"),
    dekker=["f1-pengemakt-01", "f1-pengemakt-02", "f1-pengemakt-03", "f1-ulikhet-tall-07"])
S.oppgave("Stemmer teller, men ressurser avgjør", "Ulikhet", [10], "", [a11])

# =====================================================================
# Oppgave 12: Aksjegevinst eller renteinntekt (lb 39–41, lb 6)
# =====================================================================
renter = 80_000
netto = renter * (1 - alm)
eierskatt = alm * 1.72
assert lik(eierskatt, 0.3784)
G = netto / (1 - eierskatt)
f_delt_sats = netto / eierskatt
f_paalagt = netto * (1 + eierskatt)
a12 = S.ledd("a", f"<p>Hvor stor aksjegevinst gir det samme beløpet etter skatt som kr {kr(renter)} i renteinntekt? Avrund til hele kroner.</p>",
    riktig=(f"Kr {kr(G)}", [kr(G)]),
    gale=[(f"Kr {kr(f_delt_sats)}", [kr(f_delt_sats)]), (f"Kr {kr(f_paalagt)}", [kr(f_paalagt)]), (f"Kr {kr(renter)}", [kr(renter)])],
    solution=sol(
        "Renter skattlegges med 22 %. Aksjegevinst oppjusteres med 1,72 og skattlegges med 22 %, altså 37,84 %. Sett beløpene etter skatt lik hverandre.",
        [f"Renter etter skatt: {kr(renter)} · (1 − 0,22) = {kr(netto)}.",
         f"Gevinst: G · (1 − 0,3784) = {kr(netto)}, så G = {kr(netto)}/0,6216 = <b>kr {kr(G)}</b>."],
        [(f"Kr {kr(f_delt_sats)}", "delt på skattesatsen 0,3784 i stedet for 1 − 0,3784."),
         (f"Kr {kr(f_paalagt)}", "skatten lagt på nettobeløpet: 62 400 · 1,3784. Det gir for lite, fordi skatten regnes av bruttogevinsten."),
         (f"Kr {kr(renter)}", "samme sats brukt på begge. Gevinsten oppjusteres, så den må være større.")],
        kontroll=f"{kr(G)} · 37,84 % = {kr(G * eierskatt)} i skatt. {kr(G)} − {kr(G * eierskatt)} = {kr(G - G * eierskatt)}. ✓",
        kilde="F1 lb 40 og lb 41"),
    dekker=["f1-etter-skatt-03", "f1-etter-skatt-02"])

b12 = S.ledd("b", "<p>Hvilken påstand om dette valget er riktig?</p>",
    riktig="Investorer velger høyest avkastning etter skatt, også når en annen investering gir mer før skatt",
    gale=[
        "Indifferensen viser at aksjer og bankinnskudd er like gode investeringer, uansett kursrisiko",
        "Aksjegevinst har høyere sats fordi aksjer er mer risikable enn bankinnskudd og bør skattlegges mer",
        "Renteinntekter oppjusteres også med 1,72, men renter har ikke skjerming og gir derfor lik skatt",
    ],
    solution=begrep(
        "Lærepunktet i kurset: vi investerer der avkastningen etter skatt er høyest. Samfunnet tjener mest på investeringer med høyest avkastning før skatt, så skattefavoriserte investeringer kan få kapital selv om de skaper mindre verdi.",
        "Etter skatt styrer valget.",
        [("Like gode uansett risiko", "regnestykket ser bort fra at kursen kan gå opp eller ned, fra skjerming og fra ulik forventet avkastning. Indifferensen gjelder bare de to sikre beløpene."),
         ("Høyere sats på grunn av risiko", "overskuddet bak gevinsten er alt skattlagt med 22 % i selskapet. Oppjusteringen hindrer inntektsskifting fra lønn til utbytte. Den handler ikke om risiko."),
         ("Renter oppjusteres", "renter oppjusteres ikke. De skattlegges med 22 %.")],
        kilde="F1 lb 6, lb 40 og lb 41, eldre F1 lb 40, F4 lb 49"),
    dekker=["f1-etter-skatt-01", "f1-etter-skatt-05", "f1-etter-skatt-04", "f1-etter-skatt-02"])
S.oppgave("Renter eller aksjegevinst", "Effektiv skattesats", [2],
    "<p>Renteinntekt skattlegges med 22 %. Aksjegevinst oppjusteres med 1,72 og skattlegges så med 22 %. Se bort fra skjermingsfradrag og fra at aksjekursen kan endre seg.</p>",
    [a12, b12])

# =====================================================================
# Oppgave 13: Verdien av skattefradrag (lb 42–44)
# =====================================================================
fr, marg, gj, rente, aar = 80_000, 0.30, 0.22, 0.05, 3
spart = fr * marg
pv_spredt = sum(spart / (1 + rente) ** k for k in range(1, aar + 1))
pv_alt = aar * spart / (1 + rente)
gevinst = pv_alt - pv_spredt
f_fradrag = (aar * fr / (1 + rente)) - sum(fr / (1 + rente) ** k for k in range(1, aar + 1))
f_gj = gevinst / marg * gj
assert abs(gevinst - 3213.48) < 0.1
a13 = S.ledd("a", "<p>Hvor mye mer er det verdt i nåverdi å ta alle fradragene i år 1? Diskonter alle beløp, også år 1, slik forelesningen gjør. Avrund til hele kroner.</p>",
    riktig=(f"Kr {kr(gevinst)}", [kr(gevinst)]),
    gale=[("Kr 0", ["0"]), (f"Kr {kr(f_fradrag)}", [kr(f_fradrag)]), (f"Kr {kr(f_gj)}", [kr(f_gj)])],
    solution=sol(
        "Et fradrag er verdt fradraget ganget med marginalskatten, fordi det senker grunnlaget for den siste kronen. Samme skattebesparelse i kroner er mer verdt jo tidligere den kommer.",
        [f"Spart per år: 80 000 · 30 % = {kr(spart)}.",
         f"Fordelt: {kr(spart)}/1,05 + {kr(spart)}/1,05² + {kr(spart)}/1,05³ = {kr(pv_spredt)}.",
         f"Alt i år 1: {kr(aar * spart)}/1,05 = {kr(pv_alt)}.",
         f"Gevinst: {kr(pv_alt)} − {kr(pv_spredt)} = <b>kr {kr(gevinst)}</b>."],
        [("Kr 0", "«summen av fradragene er lik». Tidsverdien gjør at tidlig fradrag er mer verdt når renten er positiv."),
         (f"Kr {kr(f_fradrag)}", "regnet på selve fradragene, ikke på skattebesparelsen. Glemt å gange med 30 %."),
         (f"Kr {kr(f_gj)}", "gjennomsnittsskatten 22 % brukt i stedet for marginalskatten 30 %.")],
        kontroll=f"Uten å diskontere år 1 blir gevinsten {kr(aar * spart - spart * (1 + 1 / 1.05 + 1 / 1.05 ** 2))}. Lysbildet med Pia diskonterer år 1 og differansen der er om lag 3 700.",
        kilde="F1 lb 42, lb 43 og lb 44"),
    dekker=["f1-skattefradrag-01", "f1-skattefradrag-02"])

b13 = S.ledd("b", "<p>Et selskap har kr 1 000 000 i overskudd hvert år og kjøper en maskin for kr 200 000. Det kan avskrive hele beløpet nå eller fordele det likt over fem år. Renten er positiv og skattesatsen den samme alle år. Hvilken påstand er riktig?</p>",
    riktig="Selskapet bør avskrive alt nå, fordi nåverdien av skattebesparelsen er størst når fradraget kommer tidligst",
    gale=[
        "Valget spiller ingen rolle, fordi summen av fradragene og skattebesparelsen i kroner er den samme",
        "Det lønner seg alltid å ta fradraget nå, også når det overstiger inntekten og ikke kan fremføres",
        "Å utsette skatt har ingen verdi, fordi skatten må betales til slutt uansett når den forfaller",
    ],
    solution=begrep(
        "Overskuddet dekker hele avskrivningen, så ingenting av fradraget går tapt. Med positiv rente er en krone spart i dag mer verdt enn en krone spart om fem år. Prinsippet er: ta fradrag tidligst mulig og utsett skattepliktig inntekt lengst mulig.",
        "Avskriv alt nå.",
        [("Spiller ingen rolle", "stemmer bare med null rente."),
         ("Alltid nå", "unntakene fra eldre F1: er fradraget større enn inntekten uten fremføring, blir det overskytende verdiløst. Er marginalskatten lavere i år 1, går fradraget mot en lavere sats."),
         ("Utsatt skatt uten verdi", "utsatt skatt virker som et rentefritt lån fra staten. Med positiv rente har utsettelsen nåverdi.")],
        kilde="F1 lb 44, eldre F1 lb 44, F3 lb 58"),
    dekker=["f1-skattefradrag-03", "f1-skattefradrag-04", "f1-skattefradrag-05"])
S.oppgave("Tor og minstefradraget", "Effektiv skattesats", [2],
    f"<p>Tor tjener kr 700 000 i hvert av tre år og har kr {kr(fr)} i fradrag hvert år. Marginalskatten hans er 30 % alle årene, gjennomsnittsskatten 22 %. Han kan trekke fra alle tre fradragene i år 1 i stedet for ett hvert år. Diskonteringsrenten er 5 %.</p>",
    [a13, b13])

# =====================================================================
# Oppgave 14: Teoriene om utbytteskatt (eldre F1 lb 52–56)
# =====================================================================
a14 = S.ledd("", "<p>Den eldre versjonen av forelesning 1 drøfter om det er best for aksjonæren at selskapet holder tilbake overskuddet eller deler det ut. Hvilken påstand er riktig?</p>",
    riktig="New view: ved intern finansiering kapitaliseres utbytteskatten i aksjekursen, så aksjonæren kan selge aksjer",
    gale=[
        "Old view: utbytteskatten senker kostnaden ved ny egenkapital, så emisjon er billigere enn å holde tilbake overskuddet",
        "New new view: Chetty og Saez fant at et kutt i norsk utbytteskatt fra 28 til 15 % ga lavere utbytte",
        "Lock-in-synet: aksjonæren kan ikke selge aksjene sine før selskapet har delt ut hele det tilbakeholdte overskuddet",
    ],
    solution=begrep(
        "New view (King, Auerbach, Bradford): når investeringer finansieres med tilbakeholdt overskudd, stiger aksjeverdien tilsvarende. For aksjonæren spiller det da ingen rolle om hun får utbytte.",
        "New view.",
        [("Old view", "snudd. Etter old view gir dobbeltbeskatningen høyere kostnad ved ny egenkapital, lavere utbytte og lavere investeringer."),
         ("Chetty og Saez", "kuttet var i USA, fra 38,6 til 15 % og ga store, umiddelbare økninger i utbytte, særlig der ledelsen eide mye."),
         ("Lock-in", "lock-in betyr at tilbakeholdelse utsetter utbytteskatten (skattekreditt), så selskapet foretrekker intern finansiering. Aksjonæren kan fortsatt selge.")],
        kilde="eldre F1 lb 52–56"),
    dekker=["f1-utbytteteorier-01", "f1-utbytteteorier-02", "f1-utbytteteorier-03", "f1-utbytteteorier-04"])
S.oppgave("Old view, new view og lock-in", "Aksjonærmodellen", [5], "", [a14])

S.skriv(
    label="F1 Innledning: skattesystemet og ulikhet",
    note="Eksamensformatet, skattesatser og trinnskatt, Anine-eksempelet, progressivitet og effektiv skattesats for eiere, ulikhetstallene i forelesningen og i SSB1 og SSB2, pengemakt, aksjegevinst mot renter og verdien av fradrag.",
    facts=[
        f"{S.n} flervalgsledd med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
        "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
        "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
        "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene.",
    ],
    practiceNote="Mange gale alternativer her er speilvendte påstander, slik lysbildene 27–30 stiller dem. Les hvem som vokste mest, hvilket mål som brukes (offisielt eller justert) og om det står prosent eller prosentpoeng.",
)
