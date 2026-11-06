"""Regneskript for settet fl-laan: Næss: lån, risikostyring og forsikring (2026).

Kilde: «ForelesningLån2026 (1).pdf.txt» (Næss, 23. september 2026), sidene merket «Side N»
og sitert som «Lån lb N». Lånelysbildene 2026 har ingen formler for annuitetslån og ingen
forsikringsdel. Regneleddene om annuitet, effektiv rente, lånegrenser og forsikring bygger
derfor på manualen (kap. 16 og 17) og eksamenene som sjekklisten viser til. Utlånsforskriften
2026 (stresstest +3 pp og minst 7 %, egenkapital 10 %, gjeld høyst 5 × inntekt) står i
oppgaveteksten, ikke de gamle eksamensreglene (+5 pp og 15 %).
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from math import sqrt, log, exp
from felles import *

S = Sett("fl-laan")


def o(tekst, *tall):
    return (tekst, list(tall))


def ann(L, r, n):
    """Terminbeløp i et annuitetslån: L·r/(1 − (1 + r)^−n)."""
    return L * r / (1 - (1 + r) ** -n)


def af(r, n):
    """Annuitetsfaktor (1 − (1 + r)^−n)/r."""
    return (1 - (1 + r) ** -n) / r


# ================= Oppgave 1: rente, risiko og sikkerhet =================
a1 = S.ledd("", "<p>Hvilken påstand om lånerenter er i tråd med forelesningen?</p>",
    riktig="Boliglån har lav rente fordi banken har pant i boligen. Forbrukslån mangler sikkerhet og får derfor høy rente",
    gale=["Lånetypene har omtrent lik risiko for långiver. Rentene skiller seg mest fordi gebyrene og løpetidene er ulike",
          "Lån til flere hundre prosent årlig rente er irrasjonelt, også for den som trenger penger nå og mangler alternativer",
          "Det har kommet mange nye forbruksbanker fordi rentetak i Norge gjør forbrukslån til en trygg bransje med lav margin"],
    solution=begrep(
        "Jo høyere sannsynlighet for at lånet ikke betales tilbake, jo høyere rente krever långiveren. Lånetypene har ulik risiko og derfor ulik pris. Med pant i boligen tar banken huset om du ikke betaler.",
        "Pant gir lav rente, usikret forbrukslån gir høy rente.",
        [("Lik risiko", "snudd. Forelesningen sier at lånene er svært forskjellige for långiveren nettopp fordi risikoen er ulik (lb 4)."),
         ("Alltid irrasjonelt", "payday-lån (260 til 1 000 % i året) kan være rasjonelt for den som trenger penger før lønning og ikke har andre muligheter. I Norge finnes det som regel billigere alternativer (lb 10)."),
         ("Rentetak og lav margin", "snudd. I Norge er det meste lov på rentesiden (lb 25). Forbruksbankene har høy nettorente. God fortjeneste trekker nye aktører inn (H2016 o3i).")],
        kilde="Lån lb 4–8, 10 og 25"),
    dekker=["laan-rente-02", "laan-rente-07", "laan-rente-04", "laan-rente-08"])
S.oppgave("Rente, risiko og sikkerhet", "Lån", [16], "", [a1])

# ================= Oppgave 2: hvilket lån skal betales ned først =================
ekstra = 60_000
laan2 = [("billån", 45_000, 0.075), ("forbrukslån", 90_000, 0.14), ("studielån", 250_000, 0.04), ("boliglån", 2_000_000, 0.05)]
D = {n: (b, r) for n, b, r in laan2}
spar_hoy = ekstra * D["forbrukslån"][1]                                    # 8 400
spar_sno = D["billån"][0] * D["billån"][1] + (ekstra - D["billån"][0]) * D["forbrukslån"][1]   # 5 475
tot = sum(b for _, b, _ in laan2)
spar_lik = ekstra / tot * sum(b * r for _, b, r in laan2)                  # lik andel av hvert lån
spar_hele = D["forbrukslån"][0] * D["forbrukslån"][1]                      # 12 600: renten på hele lånet
assert spar_hoy > max(spar_sno, spar_lik) and spar_hele > spar_hoy and lik(spar_hoy, 8400) and lik(spar_sno, 5475)
assert ekstra > D["billån"][0]
tab2 = ("<table class=\"data\"><tr><th>Lån</th><th>Gjeld</th><th>Rente</th></tr>"
        + "".join(f"<tr><td>{n.capitalize()}</td><td class=\"n\">kr {kr(b)}</td><td class=\"n\">{pst(r, 1)}</td></tr>" for n, b, r in laan2)
        + "</table>")
a2 = S.ledd("", f"<p>Ida har fått kr {kr(ekstra)} i arv og vil bruke alt på å betale ned gjeld. Hun har disse lånene:</p>{tab2}"
            "<p>Hvor mye lavere blir rentekostnaden det neste året om hun følger regelen fra forelesningen? Se bort fra skatt og anta at nedbetalingen skjer i dag.</p>",
    riktig=o(f"Kr {kr(spar_hoy)}", kr(spar_hoy)),
    gale=[o(f"Kr {kr(spar_sno)}", kr(spar_sno)),
          o(f"Kr {kr(spar_lik)}", kr(spar_lik)),
          o(f"Kr {kr(spar_hele)}", kr(spar_hele))],
    solution=sol(
        "Lån er å flytte penger over tid. Det vil man gjøre billigst mulig. Betal ned lånet med høyest rente først (unntaket er ulike konsekvenser ved mislighold). Studielånet kommer sist fordi det slettes ved dødsfall og gir rentefritak ved sykdom.",
        [f"Høyest rente er forbrukslånet med 14 %. Hele arven går dit. Gjelden der er større enn arven.",
         f"Spart rente: {kr(ekstra)} × 0,14 = <b>{kr(spar_hoy)}</b>."],
        [(f"Kr {kr(spar_sno)}", f"snøballmetoden (Ramsey): minste gjeld først. Billånet ({kr(45_000)} × 7,5 %) og så {kr(ekstra - 45_000)} på forbrukslånet. Gir motivasjon, men er dyrere."),
         (f"Kr {kr(spar_lik)}", f"betaler ned samme andel ({kr(ekstra)}/{kr(tot)}) av hvert lån. Det er regelen Gathergood m.fl. (2017) finner at mange følger."),
         (f"Kr {kr(spar_hele)}", f"renten på hele forbrukslånet ({kr(90_000)} × 14 %). Hun betaler bare ned {kr(ekstra)}, så resten av lånet koster fortsatt renter.")],
        kontroll="Hver krone gir avkastning lik renten på lånet den betaler ned. Høyeste rente gir høyest sikker avkastning.",
        kilde="Lån lb 13–16 og 23"),
    dekker=["laan-rente-01", "laan-rente-03", "laan-atferd-05"])
S.oppgave("Ida betaler ned gjeld", "Lån", [16], "", [a2])

# ================= Oppgave 3: gjeldsgåten og eksponentiell vekst =================
k0, rk, T3, spar3, rs = 24_000, 0.20, 3, 70_000, 0.02
k1 = k0 * (1 + rk) ** T3                                  # 41 472
r_geo = (k1 / k0) ** (1 / T3) - 1                         # 20 %
r_lin = (k1 / k0 - 1) / T3                                # 24,27 %
assert lik(k1, 41_472) and lik(r_geo, rk)
a3 = S.ledd("", f"<p>Jonas har kr {kr(spar3)} på en sparekonto til {pst(rs, 0)} rente. Han har også kredittkortgjeld som han ikke har betalt på. "
                f"Gjelden har vokst fra kr {kr(k0)} til kr {kr(k1)} på {T3} år med rentes rente. Hva er den årlige renten på kortgjelden og hva kan forklare at Jonas har både sparing og gjeld?</p>",
    riktig=o(f"{pst(r_geo)}. Mentalt regnskap: sparekontoen er øremerket og føles urørlig, mens kortet er fritt", pst(r_geo)),
    gale=[o(f"{pst(r_lin)}. Mentalt regnskap: sparekontoen er øremerket og føles urørlig, mens kortet er fritt", pst(r_lin)),
          o(f"{pst(r_geo)}. Det er rasjonelt, fordi sparepengene hindrer ham i å ta opp nye og enda dyrere lån", pst(r_geo)),
          o(f"{pst(r_geo)}. Tapsaversjon: å bruke sparepengene oppleves som å realisere et tap på kontoen", pst(r_geo))],
    solution=sol(
        "Årlig vekst = (sluttverdi/startverdi)<sup>1/T</sup> − 1. Å ha dyr kortgjeld og lavt forrentet sparing samtidig kalles gjeldsgåten (the debt puzzle). Thaler og Shefrin forklarer den med mentalt regnskap.",
        [f"{kr(k1)}/{kr(k0)} = {kr(k1 / k0, 3)}.",
         f"{kr(k1 / k0, 3)}<sup>1/3</sup> − 1 = <b>{pst(r_geo)}</b>.",
         f"Gjeldsgåten koster ham om lag {kr(k1)} × (0,20 − 0,02) = {kr(k1 * (rk - rs))} kr i året så lenge han beholder begge."],
        [(pst(r_lin), "deler samlet vekst på antall år. Det er den lineære tenkningen som eksponentiell vekst-bias (Stango og Zinman) handler om. Den overvurderer renten."),
         ("Rasjonelt", "selvhjelpsbøkenes argument. Bufferen koster renteforskjellen hvert år. Standard teori sier at penger er ombyttbare."),
         ("Tapsaversjon", "feil skjevhet. Det er inndelingen i kontoer, ikke et tap mot et referansepunkt, som forklarer gjeldsgåten i forelesningen.")],
        kilde="Lån lb 17–23"),
    dekker=["laan-atferd-01", "laan-atferd-02", "laan-atferd-04", "laan-beregning-07"])
S.oppgave("Jonas: sparekonto og kortgjeld", "Lån", [16, 18], "", [a3])

# ================= Oppgave 4: regulering =================
a4 = S.ledd("", "<p>Et parti foreslår rentetak på forbrukslån og forbud mot pågående kredittreklame. Hvilket argument er i tråd med forelesningen?</p>",
    riktig="Regulering kan forsvares hvis låntakerne ikke forstår produktet, eller har nåtidsskjevhet og låner på impuls",
    gale=["Standard teori tilsier rentetak også i handler mellom rasjonelle og fullt informerte parter uten eksternaliteter",
          "Rentetaket bør også gjelde lån til svært risikable prosjekter, fordi kapitalen da blir fordelt bedre",
          "Kredittkort bør forbys, fordi den høye renten løper selv om hele saldoen blir betalt hver måned"],
    solution=begrep(
        "Standard teori sier at renten ikke skal reguleres mellom rasjonelle, fullt informerte parter uten eksternaliteter. Regulering kan forsvares når høy rente skyldes desperasjon uten alternativer eller at låntakerne ikke forstår hva de gjør. Nåtidsskjevhet gjør at folk låner for mye. Impulsive System 1-valg er argumentet for betenkningstid og reklameforbud.",
        "Regulering kan forsvares ved manglende forståelse eller nåtidsskjevhet.",
        [("Rentetak også mellom rasjonelle parter", "snudd. Det er nettopp dette standard teori sier at man ikke skal regulere (lb 25)."),
         ("Rentetak for risikable prosjekter", "snudd. Kunstig lav rente til svært risikable prosjekter gir feilallokering av kapital. Det er riktig at de betaler høy rente (lb 27)."),
         ("Forby kredittkort", "renten slår ikke inn så lenge hele beløpet betales hver måned. Kortet har også fordeler som forsikringer og rabatter. Det dyre er å glemme å betale (lb 12).")],
        kilde="Lån lb 12, 20 og 24–28. System 1 og 2: H2016 o3j"),
    dekker=["laan-rente-06", "laan-atferd-03", "laan-atferd-06", "laan-rente-05"])
S.oppgave("Bør høye renter reguleres?", "Lån", [16, 18], "", [a4])

# ================= Oppgave 5: Thea, rammelån eller forbrukslån =================
L5, rr, rf, aar5 = 300_000, 0.054, 0.132, 5
N5 = 12 * aar5
Ar = ann(L5, rr / 12, N5)
Af = ann(L5, rf / 12, N5)
renter_r = N5 * Ar - L5
renter_f = N5 * Af - L5
spart = renter_f - renter_r
naiv5 = (rf - rr) * L5 * aar5                              # r × L × n, overser at gjelden faller
serie5 = (rf - rr) / 12 * L5 * (N5 + 1) / 2                # serielån med samme terminer
aarlig5 = aar5 * (ann(L5, rf, aar5) - ann(L5, rr, aar5))   # årlige terminer
assert lik(serie5, 59_475) and lik(naiv5, 117_000)
body5 = (f"<p>Thea trenger kr {kr(L5)} til å pusse opp. Hun kan øke rammelånet med pant i boligen til {pst(rr, 1)} nominell rente "
         f"eller ta et forbrukslån til {pst(rf, 1)}. Begge er annuitetslån over {aar5} år med månedlige terminer. Månedsrenten er den nominelle renten delt på 12. "
         f"Terminbeløpet er A = L × m/(1 − (1 + m)<sup>−N</sup>), der m er månedsrenten og N antall terminer.</p>")
a5 = S.ledd("a", "<p>Hvor mye sparer Thea i samlede renter ved å velge rammelånet? Se bort fra gebyrer og skatt.</p>",
    riktig=o(f"Kr {kr(spart)}", kr(spart)),
    gale=[o(f"Kr {kr(naiv5)}", kr(naiv5)),
          o(f"Kr {kr(serie5)}", kr(serie5)),
          o(f"Kr {kr(aarlig5)}", kr(aarlig5))],
    solution=sol(
        "Samlede renter i et annuitetslån = N × A − L, fordi avdragene til sammen er lik lånebeløpet. Boligsikret rammelån er langt billigere enn usikret forbrukslån.",
        [f"Rammelån: m = 0,054/12 = 0,0045. A = {kr(Ar, 2)}. Renter = 60 × {kr(Ar, 2)} − {kr(L5)} = {kr(renter_r)}.",
         f"Forbrukslån: m = 0,132/12 = 0,011. A = {kr(Af, 2)}. Renter = 60 × {kr(Af, 2)} − {kr(L5)} = {kr(renter_f)}.",
         f"Spart: {kr(renter_f)} − {kr(renter_r)} = <b>{kr(spart)}</b>."],
        [(f"Kr {kr(naiv5)}", "rente × lån × år. Overser at restgjelden faller."),
         (f"Kr {kr(serie5)}", "renteforskjellen i et serielån, der avdraget er likt (L/N) og rentene faller raskere. Her er lånet et annuitetslån med likt terminbeløp."),
         (f"Kr {kr(aarlig5)}", "regner med fem årlige terminer i stedet for 60 månedlige.")],
        kontroll=f"Terminforskjellen er {kr(Af - Ar, 2)} i måneden. Ganger med 60 gir det samme svar.",
        kilde="Lån lb 6 (pant gir lav rente). Formelen: manual kap. 16, H2016 o3b–f"),
    dekker=["laan-beregning-01", "laan-beregning-02", "laan-beregning-05", "laan-beregning-06"])

g0, tg = 1_900, 45
y5 = [L5 - g0] + [-(Af + tg)] * N5


def npv(i, cf):
    return sum(c / (1 + i) ** k for k, c in enumerate(cf))


lo, hi = 1e-6, 0.05
for _ in range(200):
    mid = (lo + hi) / 2
    if npv(mid, y5) > 0:
        hi = mid          # nåverdien av terminene er for lav: renten må ned
    else:
        lo = mid
im = (lo + hi) / 2
assert abs(npv(im, y5)) < 1e-4
eff = (1 + im) ** 12 - 1
eff_nom = 12 * im
eff_ugeb = (1 + rf / 12) ** 12 - 1
kk = N5 * (Af + tg) + g0 - L5
kk_renter = renter_f
kk_brutto = kk + L5
assert eff > eff_ugeb > rf and eff > eff_nom
a5b = S.ledd("b", f"<p>Forbrukslånet har i tillegg et etableringsgebyr på kr {kr(g0)} som trekkes fra utbetalingen og et termingebyr på kr {kr(tg)} per måned. "
                  "Hva er den effektive årsrenten og kredittkostnaden? Den månedlige internrenten er den renten som gjør nåverdien av kontantstrømmen lik null.</p>",
    riktig=o(f"Effektiv rente {pst(eff)}, kredittkostnad kr {kr(kk)}", pst(eff), kr(kk)),
    gale=[o(f"Effektiv rente {pst(eff_ugeb)}, kredittkostnad kr {kr(kk_renter)}", pst(eff_ugeb), kr(kk_renter)),
          o(f"Effektiv rente {pst(eff_nom)}, kredittkostnad kr {kr(kk)}", pst(eff_nom), kr(kk)),
          o(f"Effektiv rente {pst(eff)}, kredittkostnad kr {kr(kk_brutto)}", pst(eff), kr(kk_brutto))],
    solution=sol(
        "Effektiv rente er internrenten i kontantstrømmen etter alle gebyrer, regnet om til årsrente med rentes rente: (1 + i<sub>m</sub>)<sup>12</sup> − 1. Kredittkostnaden er summen av alt du betaler utover lånet, uten tidsverdi.",
        [f"I dag: {kr(L5)} − {kr(g0)} = {kr(L5 - g0)}. Hver måned: {kr(Af, 2)} + {kr(tg)} = {kr(Af + tg, 2)} i 60 måneder.",
         f"Internrenten er i<sub>m</sub> = {pst(im, 4)} per måned. Effektiv rente = (1 + i<sub>m</sub>)<sup>12</sup> − 1 = <b>{pst(eff)}</b>.",
         f"Kredittkostnad = 60 × {kr(Af + tg, 2)} + {kr(g0)} − {kr(L5)} = <b>{kr(kk)}</b>."],
        [(pst(eff_ugeb), f"(1 + 0,132/12)<sup>12</sup> − 1 uten gebyrene. Kredittkostnaden er bare rentene ({kr(kk_renter)})."),
         (pst(eff_nom), "ganger månedsrenten med 12. Det er en nominell rente. Den effektive må ta med rentes rente gjennom året."),
         (f"Kr {kr(kk_brutto)}", "har ikke trukket fra lånebeløpet. Kredittkostnaden er det du betaler for kreditten, ikke tilbakebetalingen av lånet.")],
        kontroll=f"Gebyrene utgjør {kr(N5 * tg + g0)} kr: {kr(kk_renter)} + {kr(N5 * tg + g0)} = {kr(kk)}. Effektiv rente med gebyrer er høyere enn {pst(eff_ugeb)} uten.",
        strategi="Effektiv rente med gebyrer må være over den effektive renten uten gebyrer. Sjekk et alternativ ved å regne nåverdien med den oppgitte renten.",
        kilde="Manual kap. 16, H2022 o6(2)–(3)"),
    dekker=["laan-beregning-03", "laan-beregning-04", "laan-beregning-08"])
S.oppgave("Thea: rammelån eller forbrukslån", "Lån", [16], body5, [a5, a5b])

# ================= Oppgave 6: Emil og utlånsforskriften =================
inn6, stud6, ek6, betj6, r6, n6 = 750_000, 320_000, 450_000, 240_000, 0.048, 30
rs6 = max(r6 + 0.03, 0.07)
L_stress = betj6 * af(rs6, n6)
L_gjeld = 5 * inn6 - stud6
L_ek = ek6 / 0.10 - ek6                                   # lån ≤ 90 % av prisen
L_maks = min(L_stress, L_gjeld, L_ek)
assert L_maks == L_stress
pris = L_maks + ek6
pris_uten = min(betj6 * af(r6, n6), L_gjeld, L_ek) + ek6           # glemt stresstesten: 5 × inntekt binder
pris_gml = min(betj6 * af(r6 + 0.05, n6), L_gjeld, ek6 / 0.15 - ek6) + ek6   # gamle regler: +5 pp og 15 %
pris_ek = ek6 / 0.10                                       # bare egenkapitalkravet
assert lik(pris_uten, L_gjeld + ek6) and pris_gml < pris < pris_uten < pris_ek
a6 = S.ledd("", f"<p>Emil tjener kr {kr(inn6)} brutto og har et studielån på kr {kr(stud6)}. Han har kr {kr(ek6)} i egenkapital. "
                f"Etter skatt, levekostnader og studielånet har han kr {kr(betj6)} i året til renter og avdrag på et boliglån. Dagens rente er {pst(r6, 1)}. "
                f"Utlånsforskriften i 2026: samlet gjeld høyst 5 × brutto inntekt, lånet høyst 90 % av boligprisen (10 % egenkapital). Han må tåle renten pluss 3 prosentpoeng, minst 7 %. "
                f"Banken regner betjeningsevnen som et annuitetslån over {n6} år med årlige terminer. Hva er den dyreste boligen Emil kan kjøpe? Rund av til nærmeste krone.</p>",
    riktig=o(f"Kr {kr(pris)}", kr(pris)),
    gale=[o(f"Kr {kr(pris_uten)}", kr(pris_uten)),
          o(f"Kr {kr(pris_gml)}", kr(pris_gml)),
          o(f"Kr {kr(pris_ek)}", kr(pris_ek))],
    solution=sol(
        "Alle kravene må holde, så det strengeste binder. Boligprisen er maks lån pluss egenkapital.",
        [f"Stresstest: 4,8 % + 3 pp = 7,8 %. Lån = {kr(betj6)} × (1 − 1,078<sup>−30</sup>)/0,078 = {kr(L_stress)}.",
         f"Gjeldsgrad: 5 × {kr(inn6)} − {kr(stud6)} = {kr(L_gjeld)}. Egenkapital: {kr(ek6)}/0,10 = {kr(pris_ek)} i pris, altså lån inntil {kr(L_ek)}.",
         f"Stresstesten binder. Pris = {kr(L_stress)} + {kr(ek6)} = <b>{kr(pris)}</b>."],
        [(f"Kr {kr(pris_uten)}", "glemt stresstesten. Med dagens rente gir betjeningsevnen over 3,7 millioner. Da binder gjeldsgraden."),
         (f"Kr {kr(pris_gml)}", "gamle eksamensregler: +5 pp (9,8 %) og 15 % egenkapital. I 2026 er det +3 pp og 10 %."),
         (f"Kr {kr(pris_ek)}", "bare egenkapitalkravet. Det er det slappeste av de tre kravene her.")],
        kontroll=f"Belåningsgrad: {kr(L_maks)}/{kr(pris)} = {pst(L_maks / pris, 1)}, under 90 %.",
        kilde="Manual kap. 16.5 (utlånsforskriften fra 2025), H2020 o4 og H2021 o5. Systemrisiko som begrunnelse: Lån lb 27"),
    dekker=["laan-bolig-02", "laan-bolig-03", "laan-bolig-05", "laan-beregning-06"])
S.oppgave("Emil og lånegrensene", "Lån", [16], "", [a6])

# ================= Oppgave 7: Marte og serielånet =================
L7, r7, n7, inn7, sk7, fr7 = 2_400_000, 0.05, 20, 720_000, 0.25, 0.22
avdrag7 = L7 / n7
rente7 = r7 * L7
termin7 = avdrag7 + rente7
netto7 = inn7 * (1 - sk7)
gb = L7 / (netto7 - rente7)
gb_brutto = L7 / inn7
gb_avdr = L7 / (netto7 - rente7 - avdrag7)
t_fr = termin7 - fr7 * rente7
t_hel = termin7 * (1 - fr7)
assert lik(avdrag7, 120_000) and lik(gb, L7 / 420_000)
a7 = S.ledd("", f"<p>Marte tar opp et serielån på kr {kr(L7)} til {pst(r7, 0)} rente over {n7} år med én termin i slutten av hvert år. "
                f"Hun tjener kr {kr(inn7)} brutto og betaler {pst(sk7, 0)} av det i skatt. Banken måler gjeldsbelastningen som gjeld delt på inntekt etter skatt minus rentene første år. "
                f"Renter gir fradrag i alminnelig inntekt med {pst(fr7, 0)}. Hva er gjeldsbelastningen og hva koster første termin etter rentefradraget?</p>",
    riktig=o(f"{kr(gb, 2)} og kr {kr(t_fr)}", kr(gb, 2), kr(t_fr)),
    gale=[o(f"{kr(gb_brutto, 2)} og kr {kr(t_fr)}", kr(gb_brutto, 2), kr(t_fr)),
          o(f"{kr(gb_avdr, 2)} og kr {kr(t_fr)}", kr(gb_avdr, 2), kr(t_fr)),
          o(f"{kr(gb, 2)} og kr {kr(t_hel)}", kr(gb, 2), kr(t_hel))],
    solution=sol(
        "Serielån: likt avdrag L/n og rente av restgjelden, så første termin er størst. Rentefradraget gjelder bare rentedelen, ikke avdraget.",
        [f"Avdrag = {kr(L7)}/20 = {kr(avdrag7)}. Rente år 1 = 0,05 × {kr(L7)} = {kr(rente7)}. Termin = {kr(termin7)}.",
         f"Gjeldsbelastning = {kr(L7)}/({kr(inn7)} × 0,75 − {kr(rente7)}) = {kr(L7)}/{kr(netto7 - rente7)} = <b>{kr(gb, 2)}</b>.",
         f"Etter fradrag: {kr(termin7)} − 0,22 × {kr(rente7)} = <b>{kr(t_fr)}</b>."],
        [(kr(gb_brutto, 2), "gjeld delt på brutto inntekt. Det er målet i femgangerregelen, ikke definisjonen i oppgaven."),
         (kr(gb_avdr, 2), "trekker også fra avdraget. Definisjonen trekker bare fra rentene."),
         (f"Kr {kr(t_hel)}", "gir fradrag for hele terminen. Avdraget er ingen kostnad og gir ikke fradrag.")],
        kontroll=f"Netto rentekostnad er {kr(rente7)} × 0,78 = {kr(rente7 * (1 - fr7))}. Pluss avdraget {kr(avdrag7)} gir {kr(t_fr)}.",
        kilde="Manual kap. 16, H2019 o8a. Rentefradraget: H2020 o6"),
    dekker=["laan-bolig-06", "laan-bolig-07", "laan-beregning-05"])
S.oppgave("Marte og serielånet", "Lån", [16], "", [a7])

# ================= Oppgave 8: avdragsfrihet, fast rente og leie til eie =================
a8 = S.ledd("", "<p>Hvilket par av påstander om boliglån er riktig?</p>",
    riktig="Avdragsfrihet kan hjelpe ved midlertidig svak likviditet, men rentene løper som før. Fast rente er en forsikring mot renteøkning",
    gale=["Avdragsfrihet kan hjelpe ved midlertidig svak likviditet, men rentene løper som før. Fast rente lønner seg når ekspertene venter renteøkning",
          "Avdragsfrihet er gunstig fordi banken ikke krever renter mens lånet er avdragsfritt. Fast rente er en forsikring mot renteøkning",
          "Avdragsfrihet kan hjelpe ved midlertidig svak likviditet, men rentene løper som før. Leie til eie gir samme kronebeløp som å kjøpe alt nå"],
    solution=begrep(
        "Avdragsfrihet utsetter bare nedbetalingen. Gjelden er høyere lenger, så du betaler mer renter totalt, men får bedre likviditet nå. Fast rente lønner seg ikke systematisk. Den er en forsikring for den som er sårbar for renteøkning.",
        "Likviditet og fast rente som forsikring.",
        [("Ekspertene venter renteøkning", "forventet renteøkning er allerede priset inn i fastrenten. Å binde etter ekspertråd er ikke en regel som systematisk lønner seg (H2019 o8b)."),
         ("Ingen renter", "avdragsfrihet er ikke et rentefritt lån. Staten betaler heller ikke avdragene (H2024 o14)."),
         ("Leie til eie", "når andelene kjøpes senere til en pris som følger boligprisene, blir de senere andelene dyrere. Du betaler flere kroner totalt (H2020 o6g).")],
        kilde="Manual kap. 16. H2024 o14, H2019 o8b og H2020 o6g. Choi s. 22–23 om fast og flytende"),
    dekker=["laan-bolig-01", "laan-bolig-04", "laan-bolig-08"])
S.oppgave("Avdragsfrihet og fast rente", "Lån", [16], "", [a8])

# ================= Oppgave 9: Live og huset (√W) =================
W9, H9, p9 = 6_250_000, 4_000_000, 0.02
EU0 = (1 - p9) * sqrt(W9) + p9 * sqrt(W9 - H9)            # 2 480
akt9 = p9 * H9                                             # 80 000
assert lik(EU0, 2480)
body9 = (f"<p>Live har en samlet formue på kr {kr(W9)}. Av dette er kr {kr(H9)} et hus. Huset brenner med sannsynlighet {pst(p9, 0)} i løpet av året og er da tapt. "
         f"Live har nyttefunksjonen U(W) = √W, der W er formuen.</p>")
a9 = S.ledd("a", f"<p>Et selskap lar Live dekke en valgfri andel av husets verdi. Premien er 2 øre per krone dekning, altså aktuarisk. Hvor stor andel bør hun dekke?</p>",
    riktig="100 %. Forventet formue er lik for alle andeler, men full dekning fjerner all risiko",
    gale=["0 %. Forventet formue er lik for alle andeler, så forsikringen gir henne ingen gevinst",
          "Under 100 %. Med √W er hun mindre risikoavers enn med ln W og beholder litt risiko",
          "Det kan ikke avgjøres uten å vite hvor stor premien blir i kroner for full dekning"],
    solution=begrep(
        "Til aktuarisk pris koster hver krone dekning nøyaktig sin forventede utbetaling. Forventet formue er den samme, men med full dekning er den sikker. En konkav U gir U(E[W]) &gt; E[U(W)], så en risikoavers vil fjerne all risiko, for billige og dyre eiendeler og med både √W og ln W.",
        f"100 % (premie kr {kr(akt9)}).",
        [("0 %", "risikonøytral tenkning. Lik forventet formue betyr ikke lik forventet nytte når U er konkav."),
         ("Under 100 %", "√W er også strengt konkav. Delvis dekning kan bare være optimalt når premien er høyere enn aktuarisk."),
         ("Kan ikke avgjøres", f"premien er gitt: 2 % av {kr(H9)} = {kr(akt9)}. Svaret er 100 % uansett verdi (H2024 o11b).")],
        kilde="Manual kap. 17. H2024 o11a–b"),
    dekker=["laan-forsikring-01", "laan-forsikring-02"])

P9b = 96_000
p_krit = (sqrt(W9) - sqrt(W9 - P9b)) / (sqrt(W9) - sqrt(W9 - H9))
p_total = 1 - sqrt(W9 - P9b) / sqrt(W9)                   # formelen når hele formuen går tapt
p_noyt = P9b / H9                                          # risikonøytral
assert p_krit < p9 < p_noyt
a9b = S.ledd("b", f"<p>Selskapet tilbyr nå bare full dekning, for kr {kr(P9b)}. Hva er den laveste brannsannsynligheten som gjør at Live vil kjøpe forsikringen?</p>",
    riktig=o(f"Ca. {pst(p_krit)}", pst(p_krit)),
    gale=[o(f"Ca. {pst(p_noyt)}", pst(p_noyt)),
          o(f"Ca. {pst(p_total)}", pst(p_total)),
          o(f"Ca. {pst(1 - sqrt(H9 - P9b) / sqrt(H9))}", pst(1 - sqrt(H9 - P9b) / sqrt(H9)))],
    solution=sol(
        "Sett forventet nytte uten forsikring lik nytten med full forsikring: (1 − p)√W + p√(W − L) = √(W − P). Løs for p.",
        [f"√{kr(W9)} = 2 500, √{kr(W9 - H9)} = 1 500, √{kr(W9 - P9b)} = {kr(sqrt(W9 - P9b), 2)}.",
         f"2 500 − 1 000p = {kr(sqrt(W9 - P9b), 2)}, så p = {kr(2500 - sqrt(W9 - P9b), 2)}/1 000 = <b>{pst(p_krit)}</b>.",
         "Ved høyere sannsynlighet kjøper hun. Med 2 % kjøper hun altså."],
        [(pst(p_noyt), "premien delt på tapet. Det er der en risikonøytral person er indifferent. En risikoavers betaler mer, så grensen er lavere."),
         (pst(p_total), "formelen 1 − √(W − P)/√W fra H2025. Den gjelder bare når hele formuen går tapt. Her har Live igjen kr 2 250 000."),
         (pst(1 - sqrt(H9 - P9b) / sqrt(H9)), "bruker bare husets verdi som formue og glemmer resten av formuen.")],
        kontroll=f"Med p = 2 % er E[U] = 2 480 &lt; {kr(sqrt(W9 - P9b), 2)}, så hun kjøper. Det stemmer med at 2 % er over grensen.",
        kilde="Manual kap. 17. H2025 o13(2)"),
    dekker=["laan-forsikring-05"])

P9c, dek = 56_500, 0.5
EU_del = (1 - p9) * sqrt(W9 - P9c) + p9 * sqrt(W9 - H9 + dek * H9 - P9c)
EU_glemt = (1 - p9) * sqrt(W9 - P9c) + p9 * sqrt(W9 - H9 + dek * H9)
assert EU_del < EU0 < EU_glemt
a9c = S.ledd("c", f"<p>Selskapet tilbyr i stedet {pst(dek, 0)} dekning (kr {kr(dek * H9)}) for kr {kr(P9c)}. Brannsannsynligheten er {pst(p9, 0)}. Bør Live kjøpe denne forsikringen?</p>",
    riktig=o(f"Nei. Forventet nytte blir {kr(EU_del, 2)} mot {kr(EU0, 2)} uten", kr(EU_del, 2), kr(EU0, 2)),
    gale=[o(f"Ja. Forventet nytte blir {kr(EU_glemt, 2)} mot {kr(EU0, 2)} uten", kr(EU_glemt, 2), kr(EU0, 2)),
          o(f"Ja. En risikoavers foretrekker alltid noe dekning framfor ingen", ),
          "Hun er likegyldig. Forventet formue er like stor med og uten denne forsikringen"],
    solution=sol(
        "E[U] med delvis dekning = (1 − p)√(W − P) + p√(W − L + αL − P). Premien betales i begge tilstandene.",
        [f"Ingen brann: √({kr(W9)} − {kr(P9c)}) = {kr(sqrt(W9 - P9c), 2)}.",
         f"Brann: √({kr(W9 - H9)} + {kr(dek * H9)} − {kr(P9c)}) = {kr(sqrt(W9 - H9 + dek * H9 - P9c), 2)}.",
         f"E[U] = 0,98 × {kr(sqrt(W9 - P9c), 2)} + 0,02 × {kr(sqrt(W9 - H9 + dek * H9 - P9c), 2)} = <b>{kr(EU_del, 2)}</b> &lt; {kr(EU0, 2)}. Nei."],
        [(kr(EU_glemt, 2), "glemt å trekke premien fra i brannscenarioet."),
         ("Alltid noe dekning", "gjelder bare til aktuarisk pris. Her koster dekningen 1,41 ganger forventet erstatning."),
         ("Likegyldig", f"forventet formue er ikke lik: premien er {kr(P9c)}, mens forventet erstatning er {kr(p9 * dek * H9)}. En risikoavers sammenligner dessuten forventet nytte, ikke forventet formue.")],
        kilde="Manual kap. 17. H2025 o13(3)"),
    dekker=["laan-forsikring-06"])
S.oppgave("Live og huset", "Forsikring og forventet nytte", [17], body9, [a9, a9b, a9c])

# ================= Oppgave 10: Olav og båten (ln W) =================
W10, B10, p10, P10 = 2_000_000, 1_200_000, 0.03, 50_000
EU10 = (1 - p10) * log(W10) + p10 * log(W10 - B10)
CE10 = exp(EU10)
maks10 = W10 - CE10
akt10 = p10 * B10
rp10 = maks10 - akt10
assert akt10 < P10 < maks10 and lik(akt10, 36_000)
a10 = S.ledd("", f"<p>Olav har en formue på kr {kr(W10)}. Av den er kr {kr(B10)} en båt. Båten blir stjålet med sannsynlighet {pst(p10, 0)} og er da tapt. "
                 f"Olav har nyttefunksjonen U(W) = ln W. Hva er den høyeste premien Olav vil betale for full dekning og kjøper han forsikringen til kr {kr(P10)}? Rund av til nærmeste krone.</p>",
    riktig=o(f"Kr {kr(maks10)}. Han kjøper", kr(maks10)),
    gale=[o(f"Kr {kr(akt10)}. Han kjøper ikke", kr(akt10)),
          o(f"Kr {kr(rp10)}. Han kjøper ikke", kr(rp10)),
          o(f"Kr {kr(maks10)}. Han kjøper ikke", kr(maks10))],
    solution=sol(
        "Maks premie løser U(W − P) = E[U uten forsikring]. Sikkerhetsekvivalenten er CE = e<sup>E[ln W]</sup>. Maks premie = W − CE = aktuarisk premie + risikopremie.",
        [f"E[U] = 0,97 × ln {kr(W10)} + 0,03 × ln {kr(W10 - B10)} = {kr(EU10, 4)}.",
         f"CE = e<sup>{kr(EU10, 4)}</sup> = {kr(CE10)}. Maks premie = {kr(W10)} − {kr(CE10)} = <b>{kr(maks10)}</b>.",
         f"{kr(P10)} &lt; {kr(maks10)}, så han kjøper."],
        [(f"Kr {kr(akt10)}", "aktuarisk premie (0,03 × 1 200 000). Det er det en risikonøytral høyst betaler."),
         (f"Kr {kr(rp10)}", f"risikopremien alene, E[W] − CE = {kr(W10 - akt10)} − {kr(CE10)}. Maks premie er aktuarisk premie pluss risikopremien."),
         ("Han kjøper ikke", "riktig maksimum, men gal konklusjon. Premien er over forventet erstatning, men under det han høyst vil betale.")],
        kontroll=f"{kr(akt10)} + {kr(rp10)} = {kr(maks10)}.",
        kilde="Manual kap. 17. H2019 o7a (ln W) og H2024 o11c–d"),
    dekker=["laan-forsikring-03", "laan-forsikring-04", "laan-forsikring-12"])
S.oppgave("Olav og båten", "Forsikring og forventet nytte", [17], "", [a10])

# ================= Oppgave 11: hva kan forsikres =================
a11 = S.ledd("", "<p>Et forsikringsselskap vurderer å selge forsikring mot arbeidsledighet til nyutdannede petroleumsingeniører. Hvilken grunn gjør produktet vanskelig å tilby til en lav premie?</p>",
    riktig="Alle de tre andre alternativene",
    gale=["Et fall i oljeprisen gjør mange av kundene ledige på en gang, så selskapet kan ikke spre risikoen",
          "Kandidatene som selv venter størst risiko for ledighet, er de som helst kjøper forsikringen",
          "De forsikrede får svakere insentiv til å søke etter jobb og til å beholde den de har"],
    solution=begrep(
        "Forsikring blir billig når selskapet kan diversifisere, slik som for husbranner som er nesten uavhengige. Her er risikoen felles for alle kundene. I tillegg kjenner kundene sin egen risiko bedre enn selskapet (ugunstig utvalg). Forsikringen svekker også innsatsen (moralsk hasard). Ugunstig utvalg er grunnen til at forsikring mot for eksempel lang levetid fungerer best når den er obligatorisk, som i folketrygden.",
        "Alle tre grunnene gjelder.",
        [("Oljeprisfall", "riktig, men ikke alene. Manglende risikospredning er bare én av grunnene."),
         ("Størst risiko kjøper", "riktig, men ikke alene. Dette er ugunstig utvalg."),
         ("Svakere insentiv", "riktig, men ikke alene. Dette er moralsk hasard.")],
        kilde="Manual kap. 17. H2018 o6, H2019 o7c og H2023 o12. Pensjon s. 22 om folketrygden"),
    dekker=["laan-forsikring-07", "laan-forsikring-09"])
S.oppgave("Forsikring mot ledighet", "Forsikring og forventet nytte", [17], "", [a11])

# ================= Oppgave 12: Siri og egenandelen =================
a12 = S.ledd("", "<p>Siri kjører svært forsiktig og har aldri meldt en skade. Hvilken påstand er riktig?</p>",
    riktig="Selskaper bruker egenandel fordi den demper moralsk hasard og fordi forsiktige kunder som Siri foretrekker den",
    gale=["Premien settes ut fra snittkunden, så en forsiktig person som Siri bør ikke forsikre noe hun eier",
          "Siri kan droppe all bilforsikring, siden ingen forsikringer for privatpersoner er lovpålagt i Norge",
          "Husholdninger bør forsikre de små tapene de lett tåler og la store tap som uførhet stå uforsikret"],
    solution=begrep(
        "Egenandel reduserer moralsk hasard, gir et gunstigere utvalg fordi de forsiktige velger den. Den gir også lavere kostnader fordi færre små krav må behandles.",
        "Moralsk hasard og gunstig utvalg.",
        [("Ikke forsikre noe", "Siri betaler trolig mer enn hun forventer å få tilbake, men som risikoavers kan det likevel lønne seg å forsikre de dyre tingene (H2023 o11)."),
         ("Ingen lovpålagt", "ansvarsforsikring på bil er lovpålagt, fordi den dekker skade på andre (H2025 o12)."),
         ("Små tap", "snudd. Forsikr store tap du ikke tåler (bolig, uførhet) og bær små tap selv.")],
        kilde="Manual kap. 17. mc2026 o15, H2023 o11, H2025 o12"),
    dekker=["laan-forsikring-08", "laan-forsikring-10", "laan-forsikring-11", "laan-forsikring-13"])
S.oppgave("Siri og egenandelen", "Forsikring og forventet nytte", [17], "", [a12])

S.skriv(
    label="Næss: lån, risikostyring og forsikring",
    note="Rente og risiko, rekkefølgen for nedbetaling, lånepsykologi og regulering fra lånelysbildene, pluss annuitetslån, effektiv rente, utlånsforskriften og forsikring med forventet nytte.",
    facts=[f"{S.n} flervalg med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Forsikring: sett alltid opp forventet nytte i begge tilstander og trekk premien fra i begge. Lån: utlånsforskriften i 2026 er +3 pp (minst 7 %) og 10 % egenkapital, ikke +5 pp og 15 % som i gamle eksamener.")
