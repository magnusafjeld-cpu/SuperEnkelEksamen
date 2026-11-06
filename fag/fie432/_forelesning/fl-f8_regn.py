"""Regneskript for settet fl-f8: F8 Formues- og eiendomsskatt (forelesning 8, 2026). Kjør fra prosjektroten:
python3 -I fag/fie432/_forelesning/fl-f8_regn.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f8")


def o(tekst, *tall):
    return (tekst, list(tall))


M = 1_000_000
SATS1, SATS2, TRINN, BUNN = 0.01, 0.011, 21.5 * M, 1.9 * M


def fskatt(nf, bunn=BUNN):
    """Trinnvis formuesskatt 2026: 1,0 % mellom bunnfradraget og 21,5 mill., 1,1 % over."""
    return max(0.0, min(nf, TRINN) - bunn) * SATS1 + max(0.0, nf - TRINN) * SATS2


def mill(x, d=2):
    return kr(x / M, d) + " mill."


SATSTEKST = ("Formuesskatten er 1,0 % av nettoformuen opp til kr 21 500 000 og 1,1 % av det som overstiger. "
             "Bunnfradraget er kr 1 900 000.")

# ================= Oppgave 1: Ola og aksjene =================
n_ak, k26, k27, ek, andel, emis, bank1 = 100_000, 180, 210, 15 * M, 0.40, 60 * M, 3 * M
rab = 0.20
fv1 = (1 - rab) * (n_ak * k27 + andel * ek) + bank1
s1 = fskatt(fv1)
fv1_26 = (1 - rab) * (n_ak * k26 + andel * ek) + bank1
s1_26 = fskatt(fv1_26)
fv1_em = (1 - rab) * (n_ak * k27 + andel * emis) + bank1
s1_em = fskatt(fv1_em)
s1_flat = (fv1 - BUNN) * SATS2
assert lik(fv1, 24.6 * M) and lik(s1, 230_100)
body1 = (f"<p>Ola eier ved utgangen av inntektsåret 2026:</p><ul>"
         f"<li>{kr(n_ak)} aksjer i et børsnotert selskap. Kursen var kr {k26} 1. januar 2026 og kr {k27} 1. januar 2027.</li>"
         f"<li>{pst(andel, 0)} av aksjene i et unotert AS. Selskapet har eiendeler minus gjeld på kr {kr(ek)}. "
         f"I en emisjon i høst ble hele selskapet priset til kr {kr(emis)}.</li>"
         f"<li>Bankinnskudd på kr {kr(bank1)}. Han har ingen gjeld.</li></ul>"
         f"<p>Aksjer har en verdsettelsesrabatt på 20 %. {SATSTEKST}</p>")
a1 = S.ledd("", "<p>Hva blir Olas formuesskatt for 2026?</p>",
    riktig=o(f"Kr {kr(s1)}", kr(s1)),
    gale=[o(f"Kr {kr(s1_26)}", kr(s1_26)),
          o(f"Kr {kr(s1_em)}", kr(s1_em)),
          o(f"Kr {kr(s1_flat)}", kr(s1_flat))],
    solution=sol(
        "Børsnoterte aksjer verdsettes til kursen 1. januar året etter inntektsåret, unoterte til eiendeler minus gjeld (bokført verdi). Begge får 20 % rabatt. Satsen er trinnvis: 1,1 % bare på delen over 21,5 mill.",
        [f"Formuesverdi: 0,8 × ({kr(n_ak * k27)} + 0,4 × {kr(ek)}) + {kr(bank1)} = {kr(fv1)}.",
         f"1,0 % × ({kr(TRINN)} − {kr(BUNN)}) = {kr((TRINN - BUNN) * SATS1)}.",
         f"1,1 % × ({kr(fv1)} − {kr(TRINN)}) = {kr((fv1 - TRINN) * SATS2)}. Sum <b>kr {kr(s1)}</b>."],
        [(f"Kr {kr(s1_26)}", "bruker kursen 1. januar 2026. Formuen for 2026 måles ved kursen 1. januar 2027."),
         (f"Kr {kr(s1_em)}", "bruker emisjonsprisen. Unoterte aksjer verdsettes til bokført verdi, ikke til prisen i en emisjon."),
         (f"Kr {kr(s1_flat)}", "bruker 1,1 % på hele grunnlaget over bunnfradraget. Toppsatsen gjelder bare delen over 21,5 mill.")],
        kilde="F8 lb 5, 7 og 12"),
    dekker=["f8-verd-01", "f8-verd-04", "f8-satser-01", "f8-satser-02"])
S.oppgave("Ola og aksjene", "Formuesskatt", [7], body1, [a1])

# ================= Oppgave 2: Formuesskatten i Norge =================
a2 = S.ledd("a", "<p>Hvilken påstand om formuesskatten i Norge er riktig?</p>",
    riktig="Den er en personskatt på nettoformue. Et aksjeselskap betaler den ikke, men eieren betaler av aksjenes formuesverdi",
    gale=["Den supplerer arveavgiften, som i dag betales av arv over et bunnfradrag og gir staten mer enn formuesskatten",
          "Den rikeste 1 % betaler om lag en tredjedel av provenyet, siden mesteparten av formuen deres er bolig og bankinnskudd",
          "Skatter på formue er en større andel av skatteinntektene i Norge enn i OECD-snittet, fordi rabattene er små"],
    solution=begrep(
        "Formuesskatten beregnes av personers nettoformue: formuesverdien av eiendelene minus gjeld. Bedrifter betaler ikke formuesskatt. Den personlige eieren betaler av formuesverdien av aksjene.",
        "Personskatt på nettoformue, betalt av eieren.",
        [("Arveavgiften", "Norge har ikke arveavgift. Den ble avskaffet i 2014 (lb 5)."),
         ("En tredjedel, bolig", "snudd. Topp 1 % betaler 2/3 av provenyet (ca. 23,3 av 35 mrd. kr i 2025). De har 2/3 av formuen i aksjer og 2/3 i unoterte selskaper (lb 6)."),
         ("Større andel enn OECD", "snudd. Skatter på formue var 2,8 % av skatteinntektene i Norge mot 5,3 % i OECD. Årsakene er store rabatter, ingen arveavgift og lav eiendomsskatt (lb 8).")],
        kilde="F8 lb 5, 6 og 8"),
    dekker=["f8-satser-03", "f8-satser-05", "f8-satser-06", "f8-satser-08"])

b2 = S.ledd("b", "<p>Hvilken påstand er riktig?</p>",
    riktig="Nettoformue er langt skjevere fordelt enn inntekt. Er fordeling målet, treffer en skatt på formue derfor best",
    gale=["Av satsen på 1,0 % går 0,65 prosentpoeng til kommunen og 0,35 til staten. Over 21,5 mill. får kommunen 0,75",
          "Andelen sysselsatte som betaler formuesskatt, falt fra 24,9 % i 2022 til 22,7 % i 2024, mens snittskatten steg",
          "Norge er i dag det eneste landet i Europa som fortsatt har en årlig skatt på nettoformue"],
    solution=begrep(
        "Lb 10 viser at nettoformuen er negativ i laveste desil og svært høy i øverste, mens inntekt etter skatt stiger jevnt. Er fordelingspolitikk viktig, fungerer den best med skatt på formue.",
        "Formue er skjevere fordelt enn inntekt.",
        [("0,65 til kommunen", "snudd. Staten får 0,65 og kommunen 0,35 prosentpoeng. Over 21,5 mill. går 0,75 prosentpoeng til staten. Samlet sats er fortsatt 1,0 % eller 1,1 %."),
         ("Falt fra 24,9 %", "snudd. Andelen steg fra 22,7 % (2022) til 24,9 % (2024), 719 007 personer med i snitt 44 200 kr."),
         ("Eneste landet", "Spania og Sveits har også skatt på nettoformue (BS5).")],
        kilde="F8 lb 4, 5 og 10, BS5 s. 84"),
    dekker=["f8-ford-01", "f8-satser-04", "f8-satser-07", "f8-satser-09"])
S.oppgave("Formuesskatten i Norge", "Formuesskatt", [7, 10], "<p>Spørsmålene gjelder formuesskatten slik forelesningen beskriver den for 2026.</p>", [a2, b2])

# ================= Oppgave 3: Kristin og aksjeposten =================
P3, C3, rm, tau = 300 * M, 18 * M, 0.06, 0.01
te = tau * (1 - rab)                          # effektiv formuesskatt på markedsverdien: 0,8 %
r_kr = (C3 - te * P3) / P3                    # 5,2 %
assert lik(rm, C3 / P3) and lik(r_kr, rm - te)
x_kr = C3 / (rm + te)                         # pris som gir 6 % etter formuesskatt
r_glemt = rm - tau                            # 5 % glemt aksjerabatten
x_glemt = C3 / (rm + tau)
x_feil = (C3 - te * P3) / rm                  # 260 skatt på 300, diskontert med 6 %
assert lik((C3 - te * x_kr) / x_kr, rm)
body3 = (f"<p>Kapitalmarkedet er effisient, så alle aksjer i samme risikoklasse gir samme avkastning. Kristin er norsk investor. "
         f"Hun kjøper en børsnotert aksjepost for kr {kr(P3 / M)} mill. ved periodens start. Posten gir {kr(C3 / M)} mill. kr ved periodens slutt og selges da for {kr(P3 / M)} mill. kr. "
         f"Kristin betaler 1 % formuesskatt av formuesverdien og aksjer har 20 % verdsettelsesrabatt. Se bort fra bunnfradrag og skatt på avkastning når ikke annet er sagt.</p>")

a3 = S.ledd("a", "<p>Hva er Kristins avkastning etter formuesskatt? Hvilken pris måtte en skattefri selger godta for at hun skulle få markedsavkastningen etter formuesskatt? Oppgi prosent med én desimal og prisen i mill. kr med to desimaler.</p>",
    riktig=o(f"{pst(r_kr, 1)} og {mill(x_kr)}", pst(r_kr, 1), kr(x_kr / M, 2)),
    gale=[o(f"{pst(r_glemt, 1)} og {mill(x_glemt)}", pst(r_glemt, 1), kr(x_glemt / M, 2)),
          o(f"{pst(rm, 1)} og {mill(P3)}", pst(rm, 1), kr(P3 / M, 2)),
          o(f"{pst(r_kr, 1)} og {mill(x_feil)}", pst(r_kr, 1), kr(x_feil / M, 2))],
    solution=sol(
        "Markedsavkastningen er 18/300 = 6 %. Formuesskatten trekkes fra kontantstrømmen, så nordmannens alternativavkastning blir r − τ, der τ her er 1 % × 0,8. Markedet kompenserer ikke skattlagte investorer (lærdom 1).",
        [f"Formuesskatt: 0,8 × 1 % × 300 = {kr(te * P3 / M, 1)} mill. Avkastning: (18 − 2,4)/300 = <b>{pst(r_kr, 1)}</b>.",
         f"Prisen x som gir 6 %: (18 − 0,008x)/x = 0,06, så x = 18/0,068 = <b>{mill(x_kr)}</b>.",
         "Ingen selger under markedsprisen på 300 mill. i et effisient marked, så hennes alternativavkastning er 5,2 %."],
        [(f"{pst(r_glemt, 1)}", "glemt aksjerabatten. Formuesskatten er 1 % av 80 % av verdien."),
         (f"{pst(rm, 1)}", "tror markedet priser aksjen slik at nordmannen får markedsavkastningen. Det er det motsatte av lærdom 1."),
         (f"{mill(x_feil)}", "regner skatten av 300 mill. og diskonterer med 6 %. Skatten avhenger av prisen x hun betaler.")],
        kontroll=f"(18 − 0,008 × {kr(x_kr / M, 2)})/{kr(x_kr / M, 2)} = {pst((C3 - te * x_kr) / x_kr, 2)}.",
        kilde="F8 lb 13–16"),
    dekker=["f8-avk-03", "f8-avk-05"])

C3b = 4.5 * M
alfa = 0.50
p_m = C3b / rm                                    # markedsverdi 75 mill.
V_not = (C3b - te * p_m) / (rm - te)              # 75
V_unot = (C3b - te * (1 - alfa) * p_m) / (rm - te)  # 80,77
assert lik(V_not, p_m)
assert lik(V_unot, p_m + p_m * alfa * te / (rm - te))
V_not6, V_unot6 = (C3b - te * p_m) / rm, (C3b - te * (1 - alfa) * p_m) / rm
V_uskatt = C3b / (rm - te)
b3 = S.ledd("b", f"<p>Kristin vurderer to andre aksjer i samme risikoklasse. Begge gir kr {kr(C3b / M, 1)} mill. per år til evig tid. Den ene er børsnotert. "
             f"Den andre er unotert. Formuesverdien før aksjerabatten er bare {pst(alfa, 0)} av markedsverdien. Kristins alternativ er børsnoterte aksjer. Hva er hver aksje verdt for henne?</p>",
    riktig=o(f"Børsnotert {mill(V_not)} og unotert {mill(V_unot)}", kr(V_not / M, 2), kr(V_unot / M, 2)),
    gale=[o(f"Børsnotert {mill(V_not6)} og unotert {mill(V_unot6)}", kr(V_not6 / M, 2), kr(V_unot6 / M, 2)),
          o(f"Børsnotert {mill(V_uskatt)} og unotert {mill(V_uskatt)}", kr(V_uskatt / M, 2)),
          o(f"Børsnotert {mill(V_not)} og unotert {mill(V_not)}", kr(V_not / M, 2))],
    solution=sol(
        "Formuesskatten senker både kontantstrømmen (telleren) og alternativavkastningen (nevneren). For en børsnotert aksje utligner de hverandre (lærdom 2). For den unoterte er skatten lavere, men nevneren er den samme, så hun verdsetter den høyere enn markedet.",
        [f"Markedsverdi: 4,5/0,06 = {mill(p_m)}. Børsnotert: (4,5 − 0,008 × 75)/0,052 = <b>{mill(V_not)}</b>.",
         f"Unotert: (4,5 − 0,008 × 0,5 × 75)/0,052 = {kr(C3b / M - te * (1 - alfa) * p_m / M, 1)}/0,052 = <b>{mill(V_unot)}</b>."],
        [(f"{mill(V_not6)}", "trekker fra skatten, men diskonterer med markedets 6 %. Nordmannens alternativ gir bare 5,2 %."),
         (f"{mill(V_uskatt)}", "bruker 5,2 % i nevneren, men glemmer skatten i telleren."),
         ("Begge 75,00 mill.", "lærdom 2 gjelder bare når formuesverdien følger markedsverdien. Den skjulte rabatten gir den unoterte aksjen en merverdi.")],
        kontroll=f"Merverdien er 75 × 0,5 × 0,008/0,052 = {kr(p_m * alfa * te / (rm - te) / M, 2)} mill. Den forklarer hvorfor de rikeste har mye av formuen i unoterte aksjer.",
        kilde="F8 lb 17–21 og 24"),
    dekker=["f8-avk-04", "f8-avk-06", "f8-avk-10", "f8-verd-05"])

tr = 0.22
k_bs4 = rm - tr * rm - tau
R_krav = (rm + tau) / (1 - tr)
k_ut = rm * (1 - tr)
R_feil = rm + tau
k_feil = (rm - tau) * (1 - tr)
c3 = S.ledd("c", f"<p>Anta nå at Kristin også betaler 22 % skatt på avkastningen og 1 % formuesskatt av startverdien (se bort fra aksjerabatten). Markedsavkastningen er 6 %. "
             "Hva er hennes alternativavkastning k etter begge skattene? Hva skjer hvis hun krever at selskapet hun eier, skal gi henne 6 % etter skatt?</p>",
    riktig=o(f"k = {pst(k_bs4)}. Hun må kreve {pst(R_krav)} før skatt, så selskapet avviser lønnsomme prosjekter og hun taper formue",
             pst(k_bs4), pst(R_krav)),
    gale=[o(f"k = {pst(k_ut)}. Hun må kreve {pst(R_krav)} før skatt, men selgerne kompenserer henne med lavere aksjekurser",
            pst(k_ut), pst(R_krav)),
          o(f"k = {pst(k_bs4)}. Hun må kreve {pst(R_feil)} før skatt, men det skader ikke, siden selskapet velter skatten over på kundene",
            pst(k_bs4), pst(R_feil)),
          o(f"k = {pst(k_feil)}. Skattene betyr da ingenting for henne, siden de ikke endrer markedets verdsettelse av aksjene",
            pst(k_feil))],
    solution=sol(
        "BS4: k = r − τ<sub>r</sub>r − τ<sub>w</sub>. Kravet som gir markedsavkastning etter skatt, er R = (r + τ<sub>w</sub>)/(1 − τ<sub>r</sub>). Selskapets alternativkostnad er fortsatt r, så et høyere krav avviser prosjekter med avkastning mellom r og R og senker markedsverdien.",
        [f"k = 6 % − 0,22 × 6 % − 1 % = <b>{pst(k_bs4)}</b>.",
         f"R = (6 % + 1 %)/0,78 = <b>{pst(R_krav)}</b>."],
        [(f"k = {pst(k_ut)}", "glemt formuesskatten. Og ingen selger billig til skattlagte investorer (lærdom 1)."),
         (f"{pst(R_feil)}", "glemt å dele på (1 − τ<sub>r</sub>). Har selskapet allerede veltet det det kan over på kundene, er det ingenting mer å hente."),
         (f"k = {pst(k_feil)}", "trekker formuesskatten fra før inntektsskatten. Skattene endrer ikke verdsettelsen, men de reduserer disponibel inntekt. Derfor betyr de noe.")],
        kilde="BS4 s. 874–881, F8 lb 12 og 22–23"),
    dekker=["f8-avk-13", "f8-avk-08", "f8-avk-09"])
S.oppgave("Kristin og aksjeposten", "Formuesskatt som avkastningsskatt", [8], body3, [a3, b3, c3])

# ================= Oppgave 4: Formuesskatt og gevinstskatt =================
W4, r4, tau4 = 1 * M, 0.04, 0.01
t_start = tau4 / r4
t_slutt = (1 + r4) * tau4 / r4
assert lik(W4 * r4 * t_start, tau4 * W4) and lik(W4 * r4 * t_slutt, tau4 * W4 * (1 + r4))
t_tr, t_tr2 = tau4 * r4, tau4 * r4 * (1 + r4)
t_deling = t_start / (1 + r4)
body4 = (f"<p>Mathias har kr {kr(W4)} i et fond som gir {pst(r4, 0)} avkastning per år. Alle investorer har samme avkastning. "
         f"Staten vurderer å erstatte en formuesskatt på {pst(tau4, 0)} med en skatt t på avkastningen som gir samme proveny.</p>")
a4 = S.ledd("a", "<p>Hvilken t gir samme proveny når formuesskatten legges på formuen ved årets start? Hvilken t gir det når den legges på formuen ved årets slutt? Oppgi svarene med to desimaler (tre for svar under 1 %).</p>",
    riktig=o(f"{pst(t_start)} og {pst(t_slutt)}", pst(t_start), pst(t_slutt)),
    gale=[o(f"{pst(t_slutt)} og {pst(t_start)}", pst(t_slutt), pst(t_start)),
          o(f"{pst(t_tr, 3)} og {pst(t_tr2, 3)}", pst(t_tr, 3), pst(t_tr2, 3)),
          o(f"{pst(t_start)} og {pst(t_deling)}", pst(t_start), pst(t_deling))],
    solution=sol(
        "Start: provenyet er τW mot trW, så t = τ/r. Slutt: formuen har vokst til W(1 + r), så τW(1 + r) = trW og t = (1 + r)τ/r. Den effektive skatten på avkastningen er τ/r.",
        [f"Start: t = 1 %/4 % = <b>{pst(t_start)}</b>.",
         f"Slutt: t = 1,04 × 1 %/4 % = <b>{pst(t_slutt)}</b>."],
        [(f"{pst(t_slutt)} og {pst(t_start)}", "byttet om. Grunnlaget er større ved årets slutt, så gevinstskatten må være høyere for å gi samme proveny."),
         (f"{pst(t_tr, 3)}", "ganger τ med r. Det gir skatten i kroner per krone formue, ikke satsen på avkastningen."),
         (f"{pst(t_deling)}", "deler på (1 + r) i stedet for å gange.")],
        kontroll=f"Start: 1 000 000 × 1 % = 10 000 = 40 000 × 25 %. Slutt: 1 040 000 × 1 % = 10 400 = 40 000 × 26 %.",
        kilde="F8 lb 27–29"),
    dekker=["f8-avk-01", "f8-avk-02", "f8-avk-07"])

r_hoy = 0.16
avk_hoy = W4 * r_hoy
fs_hoy = tau4 * W4
andel_hoy = fs_hoy / avk_hoy
gs_hoy = t_start * avk_hoy
assert lik(andel_hoy, 0.0625) and lik(gs_hoy, 40_000)
b4 = S.ledd("b", f"<p>Søsteren Ingrid har også kr {kr(W4)}, men i en bedrift som gir {pst(r_hoy, 0)} i året. Hun betaler enten {pst(tau4, 0)} formuesskatt av startformuen eller gevinstskatten med satsen fra a). Hvilken påstand er riktig?</p>",
    riktig=o(f"Formuesskatten tar {pst(andel_hoy)} av Ingrids avkastning mot {pst(t_start, 0)} med gevinstskatten. Den treffer normalavkastningen, ikke meravkastningen",
             pst(andel_hoy), pst(t_start, 0)),
    gale=[o(f"Formuesskatten tar {pst(t_start, 0)} av avkastningen for begge søsknene, siden de to skattene er ekvivalente for alle investorer",
            pst(t_start, 0)),
          o(f"Formuesskatten tar {pst(andel_hoy)} av Ingrids avkastning. AM mener den dermed treffer akkurat den avkastningen teorien vil beskatte",
            pst(andel_hoy)),
          o(f"Gevinstskatten tar kr {kr(fs_hoy)} fra hver av dem. Det er derfor gevinstskatten som treffer normalavkastningen og ikke meravkastningen",
            kr(fs_hoy))],
    solution=sol(
        "Ekvivalensen t = τ/r forutsetter at alle har samme r. Formuesskatten er den samme i kroner uansett avkastning. Den tar derfor en mindre andel jo høyere avkastningen er.",
        [f"Formuesskatt: 1 % × {kr(W4)} = {kr(fs_hoy)}. Det er {kr(fs_hoy)}/{kr(avk_hoy)} = <b>{pst(andel_hoy)}</b> av avkastningen.",
         f"Gevinstskatt: 25 % × {kr(avk_hoy)} = {kr(gs_hoy)}."],
        [("25 % for begge", "gjelder bare Mathias, som har r = 4 %. Med ulik avkastning bryter ekvivalensen sammen."),
         ("AM mener den treffer det teorien vil beskatte", "snudd. AM innvender at formuesskatten treffer normalavkastningen, mens meravkastning (renprofitt, risikopremie) er den beste begrunnelsen for kapitalskatt."),
         (f"Kr {kr(fs_hoy)} fra hver", f"det er formuesskatten som er lik i kroner. Gevinstskatten tar {kr(gs_hoy)} fra Ingrid og 10 000 fra Mathias.")],
        kilde="F8 lb 27–28 og 30, AM s. 4–5"),
    dekker=["f8-avk-11", "f8-arg-02", "f8-eff-01"])

n_aar, tau_c = 30, 0.015
red = 1 - (1 - tau_c) ** n_aar
red_sum = n_aar * tau_c
c4 = S.ledd("c", f"<p>Mathias sparer i {n_aar} år. Formuesskatten er {pst(tau_c, 1)} av formuen ved slutten av hvert år. Hvilken påstand er riktig?</p>",
    riktig=o(f"Sluttformuen blir {pst(red, 1)} lavere enn uten skatt. AM mener derfor at den som sparer lenge, straffes mest",
             pst(red, 1)),
    gale=[o(f"Sluttformuen blir {pst(red_sum, 1)} lavere enn uten skatt, siden skatten summeres til {n_aar} × {pst(tau_c, 1)}",
            pst(red_sum, 1), str(n_aar), pst(tau_c, 1)),
          "AM mener en engangs formuesskatt vrir like mye som en årlig, fordi folk tilpasser seg uansett hvordan den innføres",
          "AM avviser at formue kan gi trygghet og makt utover forbruket og ser ingen argumenter for en årlig formuesskatt"],
    solution=sol(
        "Den samme formuen skattlegges hvert år, så virkningen akkumuleres: sluttformuen ganges med (1 − τ)<sup>n</sup>. Avkastningen faller ut av forholdet fordi den er lik med og uten skatt.",
        [f"(1 − 0,015)<sup>30</sup> = {kr((1 - tau_c) ** n_aar, 4)}.",
         f"Reduksjon: 1 − {kr((1 - tau_c) ** n_aar, 4)} = <b>{pst(red, 1)}</b>."],
        [(f"{pst(red_sum, 1)}", "summerer satsene. Skatten tas av en formue som allerede er redusert, så virkningen er (1 − τ)<sup>n</sup>."),
         ("Engangsskatt vrir like mye", "snudd. En uventet og troverdig engangsskatt kan ingen tilpasse seg, så den vrir ikke. Problemet er troverdigheten."),
         ("Ingen argumenter for", "AM gjengir flere: sparing kan vise skatteevne, formue gir trygghet og makt, formue kan gi eksternaliteter og to ufullkomne skatter kan være bedre enn én.")],
        kilde="AM s. 3, 12–13 og 17–23"),
    dekker=["f8-avk-12", "f8-arg-01", "f8-arg-03"])
S.oppgave("Mathias, Ingrid og ekvivalensen", "Formuesskatt som avkastningsskatt", [8], body4, [a4, b4, c4])

# ================= Oppgave 5: Fredo og Mike =================
arv, rM, rF, tg = 2000, 0.15, 0.0, 0.30
proveny = tg * arv * rM
WM, WF = arv * (1 + rM), arv * (1 + rF)
tau5 = proveny / (WM + WF)
rel_g = (WM - proveny) / WF
rel_f = WM * (1 - tau5) / (WF * (1 - tau5))
assert lik(tau5 * (WM + WF), proveny)
tau5_s = proveny / (2 * arv)
rel_s = (WM - tau5_s * arv) / (WF - tau5_s * arv)
body5 = (f"<p>Brødrene Fredo og Mike arver kr {kr(arv)} hver. I løpet av året får Mike {pst(rM, 0)} avkastning og Fredo {pst(rF, 0)}. "
         f"Staten vil ha samme proveny med enten {pst(tg, 0)} skatt på avkastningen eller en formuesskatt τ på formuen ved slutten av året.</p>"
         "<p>Hvilken τ gir samme proveny? Hva blir Mikes formue delt på Fredos med hver skatt? Rund av τ til to desimaler og forholdstallene til tre.</p>")
a5 = S.ledd("",
    "",
    riktig=o(f"τ = {pst(tau5)}. Gevinstskatt gir {kr(rel_g, 3)} og formuesskatt {kr(rel_f, 3)}. Formuesskatten flytter formue raskere til Mike",
             pst(tau5), kr(rel_g, 3), kr(rel_f, 3)),
    gale=[o(f"τ = {pst(tau5_s)}. Gevinstskatt gir {kr(rel_g, 3)} og formuesskatt {kr(rel_s, 3)}. Formuesskatten flytter formue raskere til Mike",
            pst(tau5_s), kr(rel_g, 3), kr(rel_s, 3)),
          o(f"τ = {pst(tau5)}. Gevinstskatt gir {kr(rel_f, 3)} og formuesskatt {kr(rel_g, 3)}. Gevinstskatten flytter formue raskere til Mike",
            pst(tau5), kr(rel_f, 3), kr(rel_g, 3)),
          o(f"τ = {pst(tau5)}. Begge skattene gir {kr(rel_g, 3)}, fordi likt proveny gir lik fordeling av formuen",
            pst(tau5), kr(rel_g, 3))],
    solution=sol(
        "Med ulik avkastning er skattene ikke ekvivalente. Formuesskatten tar samme andel av begges formue, mens gevinstskatten bare treffer den som tjener. Den som ikke klarer å skape avkastning, mister formuen raskere med formuesskatt.",
        [f"Proveny: 30 % × {kr(arv * rM)} = {kr(proveny)}. τ = {kr(proveny)}/({kr(WM)} + {kr(WF)}) = <b>{pst(tau5)}</b>.",
         f"Gevinstskatt: ({kr(WM)} − {kr(proveny)})/{kr(WF)} = <b>{kr(rel_g, 3)}</b>.",
         f"Formuesskatt: begge ganges med (1 − τ), så forholdet er {kr(WM)}/{kr(WF)} = <b>{kr(rel_f, 3)}</b>."],
        [(f"τ = {pst(tau5_s)}", "legger skatten på formuen ved årets start. Oppgaven sier formuen ved årets slutt."),
         ("Byttet om", "gevinstskatten tar bare av Mikes avkastning, så den gir det laveste forholdstallet."),
         ("Begge gir samme", "likt proveny betyr ikke lik fordeling når avkastningen er ulik. Ekvivalensen krever samme r for alle.")],
        kontroll=f"Formuesskatt: Mike {kr(WM * tau5, 1)} og Fredo {kr(WF * tau5, 1)}, til sammen {kr(proveny)}.",
        kilde="F8 lb 32–36"),
    dekker=["f8-eff-02", "f8-eff-01"])
S.oppgave("Fredo og Mike", "Formuesskatt som avkastningsskatt", [8], body5, [a5])

# ================= Oppgave 6: Innlåsing =================
tg6, rm6, rb6, kost_B, verdi = 0.30, 0.03, 0.024, 160, 800
gevinstandel = (verdi - kost_B) / verdi
res_B = rm6 * (1 - tg6 * gevinstandel)
res_A = rm6
res_hel = rm6 * (1 - tg6)
assert res_B < rb6 < res_A and res_hel < rb6
reinv = verdi - tg6 * (verdi - kost_B)
body6 = (f"<p>Skatten på realiserte kapitalgevinster er {pst(tg6, 0)} og markedsavkastningen er {pst(rm6, 0)}. Investor A og B eier hver en obligasjon som vil gi {pst(rb6, 1)} neste periode. "
         f"A kjøpte sin for kr {verdi} og den er verdt kr {verdi} i dag. B kjøpte sin for kr {kost_B} og den er også verdt kr {verdi} i dag.</p>")
a6 = S.ledd("a", "<p>Hva er Bs skattejusterte reservasjonsavkastning? Hva gjør A og B?</p>",
    riktig=o(f"{pst(res_B)}. A selger og B beholder obligasjonen", pst(res_B)),
    gale=[o(f"{pst(res_hel)}. A selger og B beholder obligasjonen", pst(res_hel)),
          o(f"{pst(res_A)}. Begge selger, siden markedet gir mer enn {pst(rb6, 1)}", pst(res_A), pst(rb6, 1)),
          o(f"{pst(res_B)}. Begge beholder, siden {pst(res_B)} er under {pst(rb6, 1)}", pst(res_B), pst(rb6, 1))],
    solution=sol(
        "Realiserer B, betaler han skatt på gevinsten og kan bare reinvestere beløpet etter skatt. Reservasjonsavkastningen er r(1 − t × gevinstandel). A har ingen gevinst og sammenligner med markedet direkte.",
        [f"Gevinstandel: ({verdi} − {kost_B})/{verdi} = {kr(gevinstandel, 1)}.",
         f"B: 3 % × (1 − 0,3 × 0,8) = <b>{pst(res_B)}</b> &lt; 2,4 %, så B beholder.",
         "A: 3 % &gt; 2,4 %, så A selger og flytter pengene dit avkastningen er høyest."],
        [(f"{pst(res_hel)}", "behandler hele verdien som gevinst. Kostprisen på 160 er skattefri å ta ut."),
         ("Begge selger", "glemt skattekostnaden ved realisasjon. Den låser B inne."),
         ("Begge beholder", "A har ingen gevinst og ingen innlåsing. Hans reservasjonsavkastning er 3 %.")],
        kontroll=f"B reinvesterer {kr(reinv)} × 3 % = {kr(reinv * rm6, 2)} mot {verdi} × 2,4 % = {kr(verdi * rb6, 1)} ved å beholde. B gir slipp på 60 basispunkter og samfunnet taper fordi kapitalen ikke flyttes.",
        kilde="F8 lb 39–41"),
    dekker=["f8-eff-04", "f8-eff-05"])

b6 = S.ledd("b", "<p>Hvilken påstand om forskningen på formuesskatt er riktig?</p>",
    riktig="Guvenen m.fl. finner at formuesskatt flytter kapital raskere til produktive investorer. Det gir en velferdsgevinst, men øker ulikheten",
    gale=["Studier av de nordiske landene finner at formuesskatten reduserer sparingen kraftig. Norske data viser lavere sparerate",
          "Norske studier finner at formuesskatten reduserer sysselsettingen i små, tett eide selskaper. NOU 2014:13 ville derfor senke den",
          "BS5 mener formuesskattens egentlige problem er at den skader investeringene, ikke hvordan unoterte aksjer verdsettes"],
    solution=begrep(
        "Når avkastningen varierer mellom investorer, reallokerer formuesskatten kapital fra uproduktive til produktive investorer raskere enn en gevinstskatt (Guvenen m.fl. 2023). Å erstatte gevinstskatt med formuesskatt gir en betydelig velferdsgevinst i USA, men paradoksalt nok mer ulikhet.",
        "Guvenen m.fl.: raskere reallokering, velferdsgevinst og mer ulikhet.",
        [("Sparingen faller kraftig", "nordiske studier finner svært beskjedne effekter (Seim; Jakobsen m.fl.). Norske data tyder på at formuesskatten øker spareraten (Ring)."),
         ("Sysselsettingen faller", "Bjørneby, Markussen og Røed finner ingen slik effekt. NOU 2014:13 mente lavere selskapsskatt var et mer effektivt virkemiddel enn lavere formuesskatt."),
         ("Skader investeringene", "snudd. BS5 mener det reelle problemet er verdsettelsesreglene, særlig for unoterte aksjer. Debatten er mer en fordelingskonflikt.")],
        kilde="F8 lb 26, 37 og 76, BS5 s. 86–89"),
    dekker=["f8-eff-03", "f8-eff-06", "f8-eff-07", "f8-prov-05"])
S.oppgave("Obligasjonen som blir liggende", "Formuesskatt som avkastningsskatt", [8], body6, [a6, b6])

# ================= Oppgave 7: Siri og eiendelene =================
kvm, kvmpris, kjop = 130, 100_000, 9 * M
mv_prim = kvm * kvmpris
terskel = 10 * M


def prim(mv, lav=0.25, hoy=0.70):
    return min(mv, terskel) * lav + max(0, mv - terskel) * hoy


sek, hytte, fond = 4 * M, 3 * M, 2 * M
fv7 = prim(mv_prim) + sek + 0.30 * hytte + 0.8 * fond
fv7_kjop = prim(kjop) + sek + 0.30 * hytte + 0.8 * fond
fv7_30 = prim(mv_prim, hoy=0.30) + sek + 0.30 * hytte + 0.8 * fond
fv7_hytte = prim(mv_prim) + sek + 0.70 * hytte + 0.8 * fond
assert lik(prim(mv_prim), 4.6 * M) and lik(fv7, 11.1 * M)
body7 = (f"<p>Siri eier ved utgangen av 2026:</p><ul>"
         f"<li>Boligen hun er folkeregistrert på: {kvm} kvm. Skatteetatens kvadratmeterpris er kr {kr(kvmpris)}. Hun kjøpte den for kr {kr(kjop)} i 2015.</li>"
         f"<li>En leilighet hun leier ut. Skatteetatens markedsverdi er kr {kr(sek)}.</li>"
         f"<li>En hytte med markedsverdi kr {kr(hytte)}.</li>"
         f"<li>Aksjefond for kr {kr(fond)}.</li></ul>"
         "<p>Verdsettelsesrabatter: primærbolig 75 % av verdien opp til kr 10 000 000 og 30 % av det som overstiger, sekundærbolig 0 %, fritidseiendom 70 %, aksjer og aksjefond 20 %.</p>")
a7 = S.ledd("a", "<p>Hva er Siris samlede formuesverdi før gjeld?</p>",
    riktig=o(f"Kr {kr(fv7)}", kr(fv7)),
    gale=[o(f"Kr {kr(fv7_kjop)}", kr(fv7_kjop)),
          o(f"Kr {kr(fv7_30)}", kr(fv7_30)),
          o(f"Kr {kr(fv7_hytte)}", kr(fv7_hytte))],
    solution=sol(
        "Skatteetaten beregner markedsverdien av boligen med SSBs modell, i oppgaven kvadratmeterpris × areal. Kjøpesummen er uten betydning. Rabatten er det som trekkes fra, så formuesverdien er 25 % opp til terskelen og 70 % over.",
        [f"Primærbolig: {kvm} × {kr(kvmpris)} = {kr(mv_prim)}. 25 % × 10 mill. + 70 % × 3 mill. = {kr(prim(mv_prim))}.",
         f"Leilighet {kr(sek)} (0 % rabatt), hytte 30 % × {kr(hytte)} = {kr(0.3 * hytte)}, fond 80 % × {kr(fond)} = {kr(0.8 * fond)}.",
         f"Sum <b>kr {kr(fv7)}</b>."],
        [(f"Kr {kr(fv7_kjop)}", "bruker kjøpesummen. Formuesverdien bygger på Skatteetatens beregnede markedsverdi."),
         (f"Kr {kr(fv7_30)}", "bruker 30 % som formuesverdi over terskelen. 30 % er rabatten, så formuesverdien er 70 %."),
         (f"Kr {kr(fv7_hytte)}", "bruker 70 % som formuesverdi for hytta. 70 % er rabatten, så formuesverdien er høyst 30 %.")],
        kilde="F8 lb 7, 44–46, 66 og 70–71"),
    dekker=["f8-verd-02", "f8-verd-09", "f8-verd-10", "f8-verd-11"])

b7 = S.ledd("b", "<p>Siri mener Skatteetatens verdi på boligen hun bor i, er for høy. Hvilken påstand er riktig?</p>",
    riktig="Hun må dokumentere markedsverdien med takst, verdivurdering fra megler eller salg av lignende bolig fra etter 1. juli i inntektsåret",
    gale=["SSB-modellen treffer best for dyre boliger, så for en bolig til 13 mill. kr vil en klage nesten aldri føre fram hos Skatteetaten",
          "Hytta kan hun bare klage på hvis formuesverdien overstiger 70 % av en dokumentert markedsverdi",
          "Hun bør heller klage på leiligheten, siden en utleid sekundærbolig skal ha samme rabatt som primærboligen"],
    solution=begrep(
        "Klagen må bygge på dokumentert markedsverdi: takst fra takstmann, verdivurdering fra eiendomsmegler eller salgsverdi for en omtrent lik bolig i området. Dokumentasjonen må være fra tiden etter 1. juli i inntektsåret, fordi den skal gjelde formuen ved årets utgang.",
        "Dokumentasjon fra andre halvår.",
        [("Treffer best for dyre", "snudd. Om lag 75 % av verdiene ligger innenfor ±20 %, men modellen treffer dårligst for dyre boliger. Den bygger på Finn-salg og få kjennetegn."),
         ("70 % for hytta", "grensen er 30 %. Formuesverdien av fritidsbolig skal høyst være 30 % av markedsverdien."),
         ("Samme rabatt", "sekundærbolig verdsettes til 100 % av markedsverdien. Den får ingen rabatt.")],
        kilde="F8 lb 45–46, 68 og 85–87"),
    dekker=["f8-verd-13", "f8-verd-12", "f8-verd-10", "f8-verd-03"])
S.oppgave("Siri og fire eiendeler", "Formuesskatt", [7], body7, [a7, b7])

# ================= Oppgave 8: Næringseiendom på Voss =================
leie = [1.3 * M, 1.2 * M, 1.1 * M]   # for tre, to og ett år siden
snitt = sum(leie) / 3
stat10, paaslag, tillegg = 0.036, 0.05, 0.01
kf = stat10 + paaslag + tillegg
kf_by = stat10 + paaslag
eierk, rab_n = 0.10, 0.20
fv8 = snitt * (1 - eierk) / kf * (1 - rab_n)
fv8_by = snitt * (1 - eierk) / kf_by * (1 - rab_n)
fv8_siste = leie[-1] * (1 - eierk) / kf * (1 - rab_n)
fv8_eier = snitt / kf * (1 - rab_n)
assert lik(fv8, 9 * M)
body8 = (f"<p>Turid eier personlig et utleid lagerbygg på Voss. Leieinntektene var {kr(leie[0] / M, 1)} mill. kr for tre år siden, {kr(leie[1] / M, 1)} mill. kr for to år siden og {kr(leie[2] / M, 1)} mill. kr i fjor. "
         f"Kalkulasjonsfaktoren er årsgjennomsnittet av renten på tiårige statsobligasjoner pluss 5 prosentpoeng, med et tillegg på 1 prosentpoeng utenfor Oslo, Bergen, Trondheim og Stavanger. "
         f"Statsrenten var i snitt {pst(stat10, 1)}. Fratrekket for eierkostnader er 10 % og rabatten for næringseiendom 20 %.</p>")
a8 = S.ledd("", "<p>Hva er formuesverdien av lagerbygget? Oppgi svaret i mill. kr med to desimaler.</p>",
    riktig=o(mill(fv8), kr(fv8 / M, 2)),
    gale=[o(mill(fv8_by), kr(fv8_by / M, 2)),
          o(mill(fv8_siste), kr(fv8_siste / M, 2)),
          o(mill(fv8_eier), kr(fv8_eier / M, 2))],
    solution=sol(
        "Markedsverdien av utleid næringseiendom er snittet av de tre siste års leieinntekter, etter fratrekk for eierkostnader, diskontert som en evig strøm. Høyere kalkulasjonsfaktor gir lavere verdi. Deretter gis 20 % rabatt.",
        [f"Snitt leie: {kr(snitt / M, 1)} mill. Faktor: {pst(stat10, 1)} + 5 + 1 = {pst(kf, 1)} (Voss).",
         f"{kr(snitt / M, 1)} × 0,9/{kr(kf, 3)} = {mill(snitt * 0.9 / kf)}.",
         f"× 0,8 = <b>{mill(fv8)}</b>."],
        [(mill(fv8_by), "glemt tillegget på 1 prosentpoeng utenfor de fire største byene. Lavere faktor gir høyere verdi."),
         (mill(fv8_siste), "bruker bare fjorårets leie. Regelen er snittet av de tre siste årene."),
         (mill(fv8_eier), "glemt fratrekket på 10 % for eierkostnader. Det er samme feil som tallet på lb 51.")],
        kontroll="Bruker Turid lagerbygget selv, settes markedsverdien med kvadratmeterprisen for tilsvarende utleide lokaler i området. Mangler det sammenlignbare bygg på Voss og Bergen-prisen brukes, blir grunnlaget trolig for høyt.",
        kilde="F8 lb 47–51 og 54"),
    dekker=["f8-verd-06", "f8-verd-07", "f8-verd-08"])
S.oppgave("Turid og lagerbygget", "Formuesskatt", [7], body8, [a8])

# ================= Oppgave 9: Lars og gjelden =================
bolig9, fond9, bank9, gjeld9 = 8 * M, 12 * M, 2 * M, 6.6 * M
sum9 = bolig9 + fond9 + bank9
g_b, g_f, g_k = (gjeld9 * x / sum9 for x in (bolig9, fond9, bank9))
fvb, fvf, fvk = 0.25 * bolig9, 0.8 * fond9, bank9
red9 = g_f * 0.2
red9_fv = gjeld9 * fvf / (fvb + fvf + fvk) * 0.2
red9_bolig = red9 + g_b * 0.75
red9_likt = gjeld9 / 3 * 0.2
assert lik(red9, 720_000)
fradrag9 = g_b + g_f * 0.8 + g_k
nf9 = fvb + fvf + fvk - fradrag9
s9 = fskatt(nf9)
s9_uten = fskatt(fvb + fvf + fvk - gjeld9)
netto = [fvb - g_b, fvf - 0.8 * g_f, fvk - g_k]
assert netto[0] < 0
s9_null = fskatt(sum(max(0, x) for x in netto))
s9_bunn = fskatt(nf9, bunn=0)
body9 = (f"<p>Lars har en primærbolig med markedsverdi kr {kr(bolig9)}, aksjefond for kr {kr(fond9)}, bankinnskudd på kr {kr(bank9)} og gjeld på kr {kr(gjeld9)}. "
         f"Primærbolig har 75 % verdsettelsesrabatt og aksjefond 20 %. {SATSTEKST}</p>")
a9 = S.ledd("a", "<p>Hvor mye reduseres gjelden Lars kan trekke fra?</p>",
    riktig=o(f"Kr {kr(red9)}", kr(red9)),
    gale=[o(f"Kr {kr(red9_fv)}", kr(red9_fv)),
          o(f"Kr {kr(red9_bolig)}", kr(red9_bolig)),
          o(f"Kr {kr(red9_likt)}", kr(red9_likt))],
    solution=sol(
        "Gjelden fordeles forholdsvis etter markedsverdiene. Gjeld knyttet til eiendeler med rabatt reduseres med samme rabatt, unntatt gjeld knyttet til primærbolig.",
        [f"Andeler: {kr(bolig9 / M)}/{kr(sum9 / M)}, {kr(fond9 / M)}/{kr(sum9 / M)} og {kr(bank9 / M)}/{kr(sum9 / M)}. Gjeld: {kr(g_b)}, {kr(g_f)} og {kr(g_k)}.",
         f"Bare fondsgjelden reduseres: {kr(g_f)} × 20 % = <b>kr {kr(red9)}</b>."],
        [(f"Kr {kr(red9_fv)}", "fordeler gjelden etter formuesverdiene. Fordelingen bruker markedsverdiene."),
         (f"Kr {kr(red9_bolig)}", "reduserer også boliggjelden med 75 %. Gjeld på primærbolig reduseres ikke."),
         (f"Kr {kr(red9_likt)}", "deler gjelden likt på tre. Det stemmer bare når eiendelene er like mye verdt.")],
        kilde="F8 lb 55 og 88"),
    dekker=["f8-gjeld-01", "f8-gjeld-02", "f8-gjeld-03", "f8-gjeld-04"])

tab9 = ("<table class=\"data\"><tr><th></th><th>Bolig</th><th>Fond</th><th>Bank</th></tr>"
        f"<tr><td>Formuesverdi</td><td class=\"n\">{kr(fvb)}</td><td class=\"n\">{kr(fvf)}</td><td class=\"n\">{kr(fvk)}</td></tr>"
        f"<tr><td>Fradrag gjeld</td><td class=\"n\">{kr(g_b)}</td><td class=\"n\">{kr(0.8 * g_f)}</td><td class=\"n\">{kr(g_k)}</td></tr>"
        f"<tr><td>Netto</td><td class=\"n\">{kr(netto[0])}</td><td class=\"n\">{kr(netto[1])}</td><td class=\"n\">{kr(netto[2])}</td></tr></table>")
b9 = S.ledd("b", "<p>Hva blir formuesskatten til Lars?</p>",
    riktig=o(f"Kr {kr(s9)}", kr(s9)),
    gale=[o(f"Kr {kr(s9_uten)}", kr(s9_uten)),
          o(f"Kr {kr(s9_null)}", kr(s9_null)),
          o(f"Kr {kr(s9_bunn)}", kr(s9_bunn))],
    solution=sol(
        "Sett opp én kolonne per eiendel: formuesverdi minus fradragsberettiget gjeld. Den negative boligposten motregnes mot de andre. Bunnfradraget trekkes fra summen før satsen brukes.",
        [tab9,
         f"Nettoformue: {kr(netto[0])} + {kr(netto[1])} + {kr(netto[2])} = {kr(nf9)}.",
         f"1 % × ({kr(nf9)} − {kr(BUNN)}) = <b>kr {kr(s9)}</b>."],
        [(f"Kr {kr(s9_uten)}", "trekker fra hele gjelden uten reduksjon."),
         (f"Kr {kr(s9_null)}", f"setter den negative boligposten til null. Den skal motregnes, så {kr(-netto[0])} kommer til fradrag."),
         (f"Kr {kr(s9_bunn)}", "glemt bunnfradraget på 1,9 mill.")],
        kilde="F8 lb 5, 56 og 88"),
    dekker=["f8-gjeld-05", "f8-gjeld-07", "f8-gjeld-08", "f8-satser-02"])

gjeld9c = gjeld9 - bank9
sum9c = bolig9 + fond9
g_bc, g_fc = gjeld9c * bolig9 / sum9c, gjeld9c * fond9 / sum9c
nf9c = fvb + fvf - (g_bc + 0.8 * g_fc)
s9c = fskatt(nf9c)
endr = s9 - s9c
endr_feil = bank9 * 0.2 * SATS1
assert endr > 0 and lik(endr, 1680)
c9 = S.ledd("c", f"<p>Lars bruker hele bankinnskuddet til å betale ned gjeld. Hvordan endres formuesskatten?</p>",
    riktig=o(f"Den faller med kr {kr(endr)}, fordi gjeld knyttet til fondet bare gir 80 % fradrag mens innskuddet teller fullt",
             kr(endr), "80"),
    gale=[o(f"Den faller med kr {kr(endr_feil)}, fordi hele nedbetalingen kommer fra gjelden som er knyttet til fondet",
            kr(endr_feil)),
          "Den er uendret. Regelen øker bare skatten for den som har primærbolig og bankinnskudd. Innskudd og gjeld utligner hverandre",
          o(f"Den stiger med kr {kr(endr)}, fordi han mister et innskudd som ikke var rabattert", kr(endr))],
    solution=sol(
        "Én krone i banken teller fullt, mens gjeld knyttet til rabatterte eiendeler bare gir delvis fradrag. Å bruke innskuddet senker derfor formuesskatten. Den som bare har primærbolig og bank, rammes ikke av regelen fordi primærboliggjeld ikke reduseres.",
        [f"Ny gjeld {kr(gjeld9c)} fordeles 8/20 og 12/20: {kr(g_bc)} og {kr(g_fc)}.",
         f"Nettoformue: {kr(fvb)} + {kr(fvf)} − {kr(g_bc)} − 0,8 × {kr(g_fc)} = {kr(nf9c)}.",
         f"Skatt {kr(s9c)} mot {kr(s9)}: faller med <b>kr {kr(endr)}</b>."],
        [(f"Kr {kr(endr_feil)}", "gjelden fordeles på nytt etter markedsverdiene, så nedbetalingen fordeles på bolig og fond."),
         ("Uendret", "snudd. Den som bare har primærbolig og bank, rammes ikke. Innskudd og gjeld utligner ikke krone for krone når gjelden avkortes."),
         ("Stiger", "fortegnsfeil. Innskuddet hadde ingen rabatt, mens gjelden det erstatter delvis var avkortet.")],
        kilde="F8 lb 55, H2017 o1"),
    dekker=["f8-gjeld-10", "f8-gjeld-09"])
S.oppgave("Lars og gjelden", "Formuesskatt", [7], body9, [a9, b9, c9])

# ================= Oppgave 10: Eva =================
mv10, gjeld10, rab_f10, rab_b10 = 7 * M, 6 * M, 0.35, 0.75
fvb10, fvf10 = (1 - rab_b10) * mv10, (1 - rab_f10) * mv10
gb10 = gf10 = gjeld10 / 2
nf10 = fvb10 + fvf10 - gb10 - (1 - rab_f10) * gf10
nf10_uten = fvb10 + fvf10 - gjeld10
nf10_20 = fvb10 + 0.8 * mv10 - gb10 - 0.8 * gf10
nf10_bolig = fvb10 + fvf10 - (1 - rab_b10) * gb10 - (1 - rab_f10) * gf10
assert lik(nf10, 1.35 * M) and nf10 < BUNN
body10 = (f"<p>Eva har en primærbolig og aksjefond, begge med markedsverdi kr {kr(mv10)}. Gjelden er kr {kr(gjeld10)}. "
          f"Anta reglene fra en eldre eksamen: primærbolig har {pst(rab_b10, 0)} verdsettelsesrabatt og aksjefond {pst(rab_f10, 0)}. Bunnfradraget er kr 1 900 000.</p>")
a10 = S.ledd("a", "<p>Hva er Evas skattepliktige nettoformue før bunnfradrag?</p>",
    riktig=o(f"Kr {kr(nf10)}", kr(nf10)),
    gale=[o(f"Kr {kr(nf10_uten)}", kr(nf10_uten)),
          o(f"Kr {kr(nf10_20)}", kr(nf10_20)),
          o(f"Kr {kr(nf10_bolig)}", kr(nf10_bolig))],
    solution=sol(
        "Like markedsverdier gir 50/50-fordeling av gjelden. Fondsgjelden reduseres med fondets rabatt, boliggjelden ikke. Bruk rabattene oppgaven gir, ikke dagens.",
        [f"Formuesverdi: 25 % × {kr(mv10)} + 65 % × {kr(mv10)} = {kr(fvb10)} + {kr(fvf10)}.",
         f"Gjeld: {kr(gb10)} til bolig (ingen reduksjon) og 65 % × {kr(gf10)} = {kr(0.65 * gf10)} til fond.",
         f"({kr(fvb10)} − {kr(gb10)}) + ({kr(fvf10)} − {kr(0.65 * gf10)}) = <b>kr {kr(nf10)}</b>."],
        [(f"Kr {kr(nf10_uten)}", "trekker fra hele gjelden. Fondsgjelden skal reduseres med rabatten."),
         (f"Kr {kr(nf10_20)}", "bruker dagens aksjerabatt på 20 % i stedet for 35 % som oppgaven oppgir."),
         (f"Kr {kr(nf10_bolig)}", "reduserer også boliggjelden med 75 %.")],
        kontroll=f"Nettoformuen er under bunnfradraget, så Eva betaler ingen formuesskatt.",
        kilde="F8 lb 55–56, H2025 o2"),
    dekker=["f8-gjeld-06", "f8-gjeld-11", "f8-gjeld-04"])

bunn_k, promille1, promille_maks = 4 * M, 0.001, 0.004
es = (mv10 - bunn_k) * promille1
es_maks = (mv10 - bunn_k) * promille_maks
es_slide = (mv10 - bunn_k) * 0.00004
assert lik(es, 3000)
b10 = S.ledd("b", f"<p>Evas kommune innfører eiendomsskatt på boliger i 2026. Den bruker Skatteetatens markedsverdi, gir et bunnfradrag på kr {kr(bunn_k)} og vil ha høyest lovlige sats. "
              "Satsen kan være høyst 1 promille det første året og høyst 4 promille senere. Hvor mye eiendomsskatt betaler Eva i 2026?</p>",
    riktig=o(f"Kr {kr(es)}", kr(es)),
    gale=[o("Kr 0", "0"),
          o(f"Kr {kr(es_maks)}", kr(es_maks)),
          o(f"Kr {kr(es_slide)}", kr(es_slide))],
    solution=sol(
        "Eiendomsskatten er en kommunal objektskatt. Den betales uansett nettoformue og gjeld, i motsetning til formuesskatten.",
        [f"Grunnlag: {kr(mv10)} − {kr(bunn_k)} = {kr(mv10 - bunn_k)}.",
         f"Første år høyst 1 promille: {kr(mv10 - bunn_k)} × 0,001 = <b>kr {kr(es)}</b>."],
        [("Kr 0", "tror skatten faller bort fordi nettoformuen er under bunnfradraget. Det gjelder formuesskatten, ikke eiendomsskatten."),
         (f"Kr {kr(es_maks)}", "bruker 4 promille. Det første året er taket 1 promille."),
         (f"Kr {kr(es_slide)}", "leser 4 promille som 0,004 %, slik lysbildet skriver. 4 promille er 0,4 %.")],
        kilde="F8 lb 43 og 58–59"),
    dekker=["f8-eiend-01", "f8-eiend-02"])
S.oppgave("Eva: formue og eiendomsskatt", "Formuesskatt", [7], body10, [a10, b10])

# ================= Oppgave 11: Eiendomsskatten i kommunene =================
a11 = S.ledd("", "<p>Hvilken påstand om eiendomsskatt og eiendomsinvestorer er riktig?</p>",
    riktig="Velgerkontrollen kan svikte for fritidsboliger, fordi hytteeierne ikke kan stemme i kommunen der hytta ligger",
    gale=["Flertallet i utvalget ville ha en obligatorisk statlig eiendomsskatt, fordi kraftkommuner som Bykle er urettferdig rike",
          "Fordi skatten er frivillig, har bare om lag en tredjedel av kommunene innført eiendomsskatt",
          "Eiendomsinvestorer har ett AS per bygg, fordi selskapet da slipper formuesskatt på bygget"],
    solution=begrep(
        "Velgerkontrollen bygger på at politikere som bruker eiendomsskatten mot innbyggernes vilje, ikke blir gjenvalgt. Hytteeiere bor ikke i kommunen og kan ikke stemme. Politikerne kan derfor fristes til å skattlegge hytter høyt for å finansiere tjenester til fastboende.",
        "Velgerkontrollen svikter for hytteeiere.",
        [("Flertallet ville ha statlig skatt", "det var mindretallet. Flertallet trodde på velgerkontrollen. Mindretallet pekte på rike kraftkommuner og inntektsutjevningen."),
         ("En tredjedel", "323 av 357 kommuner hadde eiendomsskatt i 2024."),
         ("Slipper formuesskatt", "selskaper betaler ikke formuesskatt uansett. Grunnen er at salg av aksjene i bygg-AS-et er skattefritt etter fritaksmetoden og slipper dokumentavgiften på 2,5 %.")],
        kilde="F8 lb 58, 62–65 og 89–90"),
    dekker=["f8-eiend-04", "f8-eiend-03", "f8-eiend-05", "f8-eiend-06"])
S.oppgave("Eiendomsskatten i kommunene", "Eiendomsskatt", [7], "", [a11])

# ================= Oppgave 12: Ulikhet =================
a12 = S.ledd("", "<p>Hvilken påstand om formue, ulikhet og statistikk er riktig?</p>",
    riktig="SSB regner ikke med overskudd som holdes tilbake i selskaper. Aksjonærmodellen fra 2006 fikk derfor ulikheten til å falle på papiret",
    gale=["Når tilbakeholdt overskudd og selskapsskatt regnes med, betaler topp 1 % høyere effektiv skatt enn vanlige lønnsmottakere",
          "Med tilbakeholdt overskudd øker topp 1 %-andelen av markedsinntekten bare litt, fra om lag 8 % til 9 %",
          "Å erstatte formuesskatten med høyere eiendomsskatt reduserer ulikheten, siden eiendom er det meste av formuen til den rikeste 1 %"],
    solution=begrep(
        "Tilbakeholdt overskudd er reelt eiernes inntekt og formue, men kommer ikke med i SSBs statistikk. Aksjonærmodellen ga sterke insentiver til å holde overskudd tilbake i selskapene, så ulikheten falt på papiret.",
        "Statistikken undervurderer ulikheten.",
        [("Høyere effektiv skatt", "snudd. Selv med skatt betalt i selskapene er den effektive skatten for topp 1 % lavere enn for vanlige lønnsmottakere."),
         ("Bare litt", "andelen mer enn dobles, fra om lag 8–9 % til over 20 % i enkelte år 2006–2018."),
         ("Eiendomsskatt reduserer ulikheten", "snudd. Topp 1 % eier mesteparten av aksjene og eiendom er en relativt liten del av formuen deres. Eiendomsskatt er regressiv uten store bunnfradrag.")],
        kilde="F8 lb 72–75"),
    dekker=["f8-ford-02", "f8-ford-03", "f8-prov-04"])
S.oppgave("Hvem eier formuen", "Progressivitet", [7, 10], "", [a12])

# ================= Oppgave 13: Erstatte formuesskatten =================
tap, prov_ss, ts, samlet = 25, 110, 0.22, 0.515
t_ny = ts * (prov_ss + tap) / prov_ss
tu_ny = (samlet - t_ny) / (1 - t_ny)
tu_sub = samlet - t_ny
t_glemt = tap / prov_ss
tu_glemt = (samlet - t_glemt) / (1 - t_glemt)
tu_gammel = 0.22 * 1.72
assert lik(t_ny, 0.27) and lik(t_ny + (1 - t_ny) * tu_ny, samlet)
assert lik(0.22 + 0.78 * tu_gammel, 0.5152, 1e-4)
body13 = (f"<p>Formuesskatten fjernes. Provenytapet er {tap} mrd. kr. Selskapsskatten på 22 % gir i dag {prov_ss} mrd. kr fra fastlandet. Bedriftene endrer ikke atferd. "
          "Samlet skatt på utbytte (selskapsskatt pluss eierskatt) er i dag 51,5 % og eierskatten 37,84 %.</p>"
          "<p>Hvilken selskapsskatt dekker provenytapet? Hvilken eierskatt holder samlet skatt på 51,5 %? Rund av til én desimal.</p>")
a13 = S.ledd("", "",
    riktig=o(f"Selskapsskatt {pst(t_ny, 1)} og eierskatt {pst(tu_ny, 1)}", pst(t_ny, 1), pst(tu_ny, 1)),
    gale=[o(f"Selskapsskatt {pst(t_ny, 1)} og eierskatt {pst(tu_sub, 1)}", pst(t_ny, 1), pst(tu_sub, 1)),
          o(f"Selskapsskatt {pst(t_glemt, 1)} og eierskatt {pst(tu_glemt, 1)}", pst(t_glemt, 1), pst(tu_glemt, 1)),
          o(f"Selskapsskatt {pst(t_ny, 1)} og eierskatt {pst(tu_gammel, 1)}", pst(t_ny, 1), pst(tu_gammel, 1))],
    solution=sol(
        "Selskapsskatten må dekke både dagens proveny og formuesskatten. Samlet skatt er t + (1 − t)t<sub>u</sub>, så eierskatten som bevarer 51,5 % er t<sub>u</sub> = (0,515 − t)/(1 − t).",
        [f"t = 22 % × ({prov_ss} + {tap})/{prov_ss} = <b>{pst(t_ny, 1)}</b>.",
         f"t<sub>u</sub> = (0,515 − 0,27)/0,73 = <b>{pst(tu_ny, 1)}</b>."],
        [(f"{pst(tu_sub, 1)}", "trekker satsene fra hverandre. Eierskatten treffer bare det som er igjen etter selskapsskatten."),
         (f"{pst(t_glemt, 1)}", "glemt dagens selskapsskatt. Den nye satsen må dekke begge deler."),
         (f"{pst(tu_gammel, 1)}", f"beholder dagens eierskatt. Da blir samlet skatt {pst(t_ny + (1 - t_ny) * tu_gammel, 1)}.")],
        kontroll="Kuttet i eierskatten spiser av provenygevinsten, så den totale virkningen er uklar og avhenger av hvordan aktørene tilpasser seg (lb 77).",
        kilde="F8 lb 77, BS5 s. 88"),
    dekker=["f8-prov-01", "f8-prov-02", "f8-prov-03"])
S.oppgave("Selskapsskatt i stedet for formuesskatt", "Formuesskatt", [7, 5], body13, [a13])

# ================= Oppgave 14: Hanne og utbyttet =================
kost14, mv14, sats_a, opp = 8 * M, 12 * M, 0.22, 1.72
te14 = sats_a * opp
F14 = mv14 * 0.8 * SATS1
D14 = F14 / (1 - te14)
D14_nom = F14 / (1 - sats_a)
D14_oppaa = F14 * (1 + te14)
D14_rab = mv14 * SATS1 / (1 - te14)
assert lik(D14 * (1 - te14), F14)
body14 = (f"<p>Hanne eier børsnoterte aksjer med inngangsverdi kr {kr(kost14)}. Markedsverdien 1. januar 2027 er kr {kr(mv14)}. "
          "Formuesskatten er 1 % og aksjer har 20 % verdsettelsesrabatt. Hun bruker bunnfradraget på annen formue. "
          "Utbytte skattlegges med 22 % etter oppjustering med faktoren 1,72.</p>")
a14 = S.ledd("a", "<p>Hanne har ingen annen inntekt og må ta utbytte for å betale formuesskatten på aksjene. Hvor stort utbytte må hun ta? Se bort fra skjerming.</p>",
    riktig=o(f"Kr {kr(D14)}", kr(D14)),
    gale=[o(f"Kr {kr(D14_nom)}", kr(D14_nom)),
          o(f"Kr {kr(D14_oppaa)}", kr(D14_oppaa)),
          o(f"Kr {kr(D14_rab)}", kr(D14_rab))],
    solution=sol(
        "Utbyttet etter eierskatt skal dekke formuesskatten: D(1 − t<sub>e</sub>) = F. Den effektive eierskatten er 22 % × 1,72.",
        [f"F = {kr(mv14)} × 0,8 × 1 % = {kr(F14)}. t<sub>e</sub> = {pst(te14)}.",
         f"D = {kr(F14)}/(1 − 0,3784) = <b>kr {kr(D14)}</b>."],
        [(f"Kr {kr(D14_nom)}", "bruker 22 % uten oppjustering."),
         (f"Kr {kr(D14_oppaa)}", "legger skatten oppå formuesskatten. Da blir det for lite igjen, siden skatten også tas av tillegget."),
         (f"Kr {kr(D14_rab)}", "glemt aksjerabatten i formuesskatten.")],
        kontroll=f"{kr(D14)} × 0,3784 = {kr(D14 * te14)} i eierskatt. Resten, {kr(D14 - D14 * te14)}, betaler formuesskatten.",
        kilde="F8 lb 80, F4 lb 77, Oppg. F8 o2"),
    dekker=["f8-utb-01", "f8-utb-02"])

D14b, skj = 600_000, 0.03
sk = skj * kost14
es14 = (D14b - sk) * te14
igjen = D14b - es14 - F14
es14_mv = (D14b - skj * mv14) * te14
igjen_mv = D14b - es14_mv - F14
es14_etter = (D14b * opp - sk) * sats_a
igjen_etter = D14b - es14_etter - F14
es14_nom = (D14b - sk) * sats_a
igjen_nom = D14b - es14_nom - F14
assert lik(igjen, 367_776)
b14 = S.ledd("b", f"<p>Året etter mottar Hanne et utbytte på kr {kr(D14b)}. Skjermingsrenten er {pst(skj, 0)} og formuesskatten er som før. Hvor mye sitter hun igjen med etter eierskatt og formuesskatt?</p>",
    riktig=o(f"Kr {kr(igjen)}", kr(igjen)),
    gale=[o(f"Kr {kr(igjen_mv)}", kr(igjen_mv)),
          o(f"Kr {kr(igjen_etter)}", kr(igjen_etter)),
          o(f"Kr {kr(igjen_nom)}", kr(igjen_nom))],
    solution=sol(
        "Skjermingen er skjermingsrenten ganget med inngangsverdien. Utbytte over skjermingen oppjusteres med 1,72 og skattlegges med 22 %. Formuesskatten trekkes i tillegg.",
        [f"Skjerming: 3 % × {kr(kost14)} = {kr(sk)}.",
         f"Eierskatt: ({kr(D14b)} − {kr(sk)}) × 1,72 × 22 % = {kr(es14)}.",
         f"{kr(D14b)} − {kr(es14)} − {kr(F14)} = <b>kr {kr(igjen)}</b>."],
        [(f"Kr {kr(igjen_mv)}", "beregner skjermingen av markedsverdien. Grunnlaget er inngangsverdien."),
         (f"Kr {kr(igjen_etter)}", "trekker fra skjermingen etter oppjusteringen. Skjermingen trekkes fra først."),
         (f"Kr {kr(igjen_nom)}", "glemt oppjusteringsfaktoren.")],
        kilde="Oppg. F8 o2, H2025 o1"),
    dekker=["f8-utb-03", "f8-utb-04", "f8-utb-02"])

c14 = S.ledd("c", "<p>Hvilken påstand om formuesskatt, likviditet og utbytte er riktig?</p>",
    riktig="Menon antok at alle aksjeeiere var i formuesskatteposisjon. Med riktige data fant to NHH-studenter at skatten ikke tvang fram utbytte",
    gale=["Røed mfl. og Thoresen mfl. finner at likviditetsskranker er utbredt blant eiere av små, nært eide selskaper i år der selskapet går med underskudd",
          "Finnevolden og Gulbrandsen fant at de fleste gasellebedrifter utløste formuesskatt som i hovedsak kom fra aksjene",
          "BS1-modellen forutsetter asymmetrisk eierskatt uten refusjon ved tap og et holdingselskap som er lånefinansiert"],
    solution=begrep(
        "Menon (2013, for Rederiforbundet og NHO) fant at mange bedrifter måtte ta utbytte for å betale formuesskatt. Sakkestad og Skarsgaard viste i sin masteroppgave at Menon hadde forutsatt at alle aksjeeiere var i formuesskatteposisjon. Av 26 200 unge bedrifter hadde bare 270 formuesskatt og utbytte over årsresultatet.",
        "Menon-saken og masteroppgaven.",
        [("Utbredt", "snudd. Norske studier finner at slike likviditetsskranker er lite utbredt."),
         ("De fleste gaseller", "bare 15 % utløste formuesskatt, mest fra andre formuesobjekter enn aksjene. Skatten var under 2 % av utbyttet."),
         ("Asymmetrisk og lånefinansiert", "BS1 forutsetter symmetrisk eierskatt med full refusjon ved tap og et egenkapitalfinansiert holdingselskap.")],
        kilde="F8 lb 78–84, BS1 s. 29"),
    dekker=["f8-utb-06", "f8-utb-05", "f8-utb-07", "f8-utb-10"])
S.oppgave("Hanne og utbyttet", "Aksjonærmodellen", [5, 7], body14, [a14, b14, c14])

# ================= Oppgave 15: BS1 =================
rf, t15, tf, rL = 0.04, 0.22, 0.01, 0.06
i_dagens = rf * (1 - t15)
i_noyt = rf * (1 - t15) - tf
theta = (rL - rf) * (1 - t15) - tf
theta_glemt = (rL - rf) * (1 - t15)
i_pluss, theta_pluss = i_dagens + tf, theta_glemt + tf
assert lik(i_noyt, 0.0212) and lik(theta, 0.0056)
body15 = (f"<p>En person eier et holdingselskap. Risikofri rente er {pst(rf, 0)}, alminnelig skatt {pst(t15, 0)} og formuesskatten på rentepapirer {pst(tf, 0)}. "
          f"Dagens skjermingsrente er risikofri rente etter skatt. Personen kan låne til {pst(rL, 0)}.</p>"
          "<p>Ifølge BS1: Hvilken skjermingsrente gjør eieren likegyldig mellom å holde kapitalen i selskapet og å ta utbytte når han kan låne risikofritt? Hvor høy er særskatten θ på eierskattekreditten når han låner til 6 %?</p>")
a15 = S.ledd("", "",
    riktig=o(f"{pst(i_noyt)} og θ = {pst(theta)}", pst(i_noyt), pst(theta)),
    gale=[o(f"{pst(i_dagens)} og θ = {pst(theta)}", pst(i_dagens), pst(theta)),
          o(f"{pst(i_noyt)} og θ = {pst(theta_glemt)}", pst(i_noyt), pst(theta_glemt)),
          o(f"{pst(i_pluss)} og θ = {pst(theta_pluss)}", pst(i_pluss), pst(theta_pluss))],
    solution=sol(
        "BS1: X − Z = (1 − γ)a[(r<sub>f</sub>(1 − t) − τ<sub>f</sub>) − i]. Nøytralitet krever i = r<sub>f</sub>(1 − t) − τ<sub>f</sub>. Dagens rente er for høy, så det lønner seg å ta utbytte. Låner eieren dyrere enn risikofritt, lønner det seg å vente. BS1 anbefaler da særskatten θ = (r<sub>L</sub> − r<sub>f</sub>)(1 − t) − τ<sub>f</sub>.",
        [f"i = 4 % × 0,78 − 1 % = <b>{pst(i_noyt)}</b>.",
         f"θ = 2 % × 0,78 − 1 % = <b>{pst(theta)}</b>."],
        [(f"{pst(i_dagens)}", "dagens skjermingsrente. Den er for høy fordi formuesskatten på rentepapirer ikke er trukket fra."),
         (f"θ = {pst(theta_glemt)}", "glemt å trekke fra formuesskatten τ<sub>f</sub>."),
         (f"{pst(i_pluss)}", "legger til formuesskatten i stedet for å trekke den fra.")],
        kilde="BS1 s. 30–33"),
    dekker=["f8-utb-08", "f8-utb-09"])
S.oppgave("Holdingselskapet og skjermingsrenten", "Aksjonærmodellen", [5, 7], body15, [a15])

# ================= Oppgave 16: Argumentene =================
a16 = S.ledd("a", "<p>Hvilken påstand om debatten om formuesskatt er riktig?</p>",
    riktig="Sandbu vil ha en høyere og bedre utformet skatt på all nettoformue, også eiendom med gjeldsfradrag, mot lavere skatt på arbeid",
    gale=["I IGM-undersøkelsen mente et flertall av økonomene at Warrens formuesskatt ville bli enklere å håndheve enn dagens skatter",
          "FT-artikkelen viser at de superrike har forlatt Sveits, fordi formuesskatten der er høyere enn i Norge",
          "Utflyttingen av rike nordmenn i 2022 skyldtes formuesskatten, ikke femårsregelen for skattefritt utbytte og gevinst"],
    solution=begrep(
        "Sandbu vil skattlegge all nettoformue likt, eiendom inkludert og med gjeldsfradrag, i stedet for en egen eiendomsskatt. Provenyet skal brukes til lavere skatt på arbeid. Skatten bør kunne utsettes eller betales med en eierandel.",
        "Sandbus Sveits-kronikk.",
        [("Enklere å håndheve", "82 % mente den ville bli vanskeligere å håndheve. 73 % mente den ville redusere topp 0,1 %-andelen vesentlig."),
         ("Forlatt Sveits", "snudd. Sveits viser at de superrike kan leve med formuesskatt på 0,3–1 %. Zug tiltrekker seg fortsatt rike."),
         ("Skyldtes formuesskatten", "femårsregelen, opphevet i 2022, var trolig vel så viktig. Mange hadde store tilbakeholdte overskudd og lave inngangsverdier.")],
        kilde="Sveits-kronikken s. 1–3, FT s. 1–5, AM s. 4–5, BS5 s. 84"),
    dekker=["f8-arg-04", "f8-arg-05", "f8-arg-06", "f8-ford-05"])

b16 = S.ledd("b", "<p>Hvilken påstand om de rike og politikken er riktig?</p>",
    riktig="Moene viser at Norge har flere rike og superrike per innbygger enn USA, mens de rikeste i USA får en mye større inntektsandel",
    gale=["Moene forklarer den store overklassen med arv: de fleste av de 100 rikeste i Norge har arvet formuen sin",
          "Gilens og Page finner at forslag som de rike støtter, ikke har større sjanse for å bli vedtatt enn forslag som folk flest støtter",
          "Mathisen finner at folk flest mener topp 1 % betaler mer skatt enn det som er rettferdig"],
    solution=begrep(
        "Moene måler rikdom med antall: Norge har 472,8 rike og 63,6 superrike per million innbyggere mot 124,6 og 36,5 i USA. Topp 0,1 % får 11 % av inntekten i USA mot 2,5 % i Norge. USA har færre, men rikere rike.",
        "Flere rike per innbygger i Norge.",
        [("Arv", "færre enn en tredjedel av de 100 rikeste hadde arvet formuen (2014). Moene peker på lønnsmoderasjon, sammenpresset lønnsstruktur og gratis utdanning."),
         ("Ikke større sjanse", "snudd. Et forslag som fire av fem rike støtter, har 45 % sjanse mot 18 % når én av fem støtter det. De rike har i praksis vetorett."),
         ("Betaler mer enn rettferdig", "snudd. Den effektive skatten for topp 1 % er 23 prosentpoeng lavere enn folk mener er rettferdig.")],
        kilde="M s. 248–257, BS5 s. 90–91"),
    dekker=["f8-arg-07", "f8-arg-08", "f8-ford-04"])
S.oppgave("Argumentene for og mot", "Formuesskatt", [7, 10], "<p>Spørsmålene bygger på pensumartiklene om formuesskatt, ulikhet og de rike.</p>", [a16, b16])

S.skriv(
    label="F8 Formues- og eiendomsskatt",
    note="Satser, rabatter og gjeldsreduksjon i formuesskatten, formuesskatt som avkastningsskatt og mot gevinstskatt, utbytte for å betale skatten, eiendomsskatt og debatten om formuesskatt.",
    facts=[f"{S.n} flervalg med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Sett opp én kolonne per eiendel: fordel gjelden etter markedsverdi og reduser bare gjeld på rabatterte eiendeler som ikke er primærbolig. Motregn alt før bunnfradraget. I avkastningsoppgavene trekker formuesskatten fra både i telleren og i nevneren.")
