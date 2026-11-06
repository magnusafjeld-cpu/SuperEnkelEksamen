"""Regneskript for settet fl-f10: F10 Skatt, aksjer og risikotaking (forelesning 10, 2026)."""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f10")


def o(tekst, *tall):
    return (tekst, list(tall))


# ================= Oppgave 1: tapsfradrag =================
inn, gA, gB, tapB, p, t1 = 200_000, 24_000, 180_000, 120_000, 0.5, 0.30
EB0 = p * gB - (1 - p) * tapB                       # 30 000
A_t = (1 - t1) * gA                                 # 16 800
EB_uten = p * (1 - t1) * gB - (1 - p) * tapB        # 3 000
EB_full = p * (1 - t1) * gB - (1 - p) * (1 - t1) * tapB   # 21 000
assert lik(EB_full, (1 - t1) * EB0) and lik(EB_full / A_t, EB0 / gA)
EB_gl_tap0 = p * gB                                 # 90 000 glemt tapsutfallet
EB_gl_tap1 = p * (1 - t1) * gB                      # 63 000
EB_hel0 = p * gB - (1 - p) * inn                    # −10 000 tapet lest som hele innsatsen
EB_hel1 = p * (1 - t1) * gB - (1 - p) * inn         # −37 000
tap_halv = tapB - t1 * 0.5 * tapB                   # 102 000
EB_halv = p * (1 - t1) * gB - (1 - p) * tap_halv    # 12 000
EB_halv_feil = p * (1 - t1) * gB - (1 - p) * 0.5 * tapB   # 33 000 halve tapet dekket fullt
assert EB0 > gA and EB_uten < A_t and EB_full > A_t and EB_halv < A_t < EB_halv_feil

body1 = (f"<p>Ingrid investerer kr {kr(inn)} i ett av to prosjekter. Prosjekt A gir en sikker gevinst på kr {kr(gA)}. "
         f"Prosjekt B gir med {pst(p, 0)} sannsynlighet en gevinst på kr {kr(gB)} og ellers et tap på kr {kr(tapB)}. "
         f"Ingrid er risikonøytral. Gevinster skattlegges med {pst(t1, 0)}.</p>")

a1 = S.ledd("a", "<p>Det gis ikke fradrag for tap. Hva er forventet gevinst på B før og etter skatt? Hvilket prosjekt velger hun med skatt?</p>",
    riktig=o(f"Kr {kr(EB0)} før og kr {kr(EB_uten)} etter skatt. Hun velger A", kr(EB0), kr(EB_uten)),
    gale=[o(f"Kr {kr(EB_gl_tap0)} før og kr {kr(EB_gl_tap1)} etter skatt. Hun velger B", kr(EB_gl_tap0), kr(EB_gl_tap1)),
          o(f"Kr {kr(EB0)} før og kr {kr(EB_full)} etter skatt. Hun velger B", kr(EB0), kr(EB_full)),
          o(f"Kr {kr(EB_hel0)} før og kr {kr(EB_hel1)} etter skatt. Hun velger A", kr(EB_hel0), kr(EB_hel1))],
    solution=sol(
        "Uten tapsfradrag tar staten en andel av gevinsten, men tapet står urørt. Oppsiden krymper og nedsiden er den samme.",
        [f"Uten skatt: E[B] = 0,5 × {kr(gB)} − 0,5 × {kr(tapB)} = <b>{kr(EB0)}</b> &gt; {kr(gA)}, så B velges.",
         f"Med skatt: A = 0,7 × {kr(gA)} = {kr(A_t)}.",
         f"E[B] = 0,5 × 0,7 × {kr(gB)} − 0,5 × {kr(tapB)} = <b>{kr(EB_uten)}</b> &lt; {kr(A_t)}, så hun velger <b>A</b>."],
        [(f"{kr(EB_gl_tap0)} og {kr(EB_gl_tap1)}", "glemt tapsutfallet. Bare gevinstgrenen er tatt med."),
         (f"{kr(EB_full)}", "tapet er også ganget med 0,7. Det er tilfellet med fullt tapsfradrag."),
         (f"{kr(EB_hel0)}", "leser tapet som hele innsatsen på kr 200 000. Teksten sier at hun taper kr 120 000.")],
        kontroll="Skatten flytter valget fra B til A. Det er vridningen mot det sikre prosjektet som forelesningen viser.",
        kilde="F10 lb 2"),
    dekker=["f10-tapsfradrag-01", "f10-tapsfradrag-02"])

b1 = S.ledd("b", f"<p>Anta i stedet at Ingrid får fullt fradrag for tap med {pst(t1, 0)}. Hvilken påstand er riktig?</p>",
    riktig=o(f"B gir kr {kr(EB_full)} mot kr {kr(A_t)} for A. Staten deler gevinst og tap, så rangeringen er som uten skatt",
             kr(EB_full), kr(A_t)),
    gale=[o(f"A gir kr {kr(A_t)} mot kr {kr(EB_uten)} for B. Skatt på avkastning gjør alltid det risikable prosjektet mindre attraktivt",
            kr(A_t), kr(EB_uten)),
          o(f"B gir kr {kr(EB_full)} mot kr {kr(gA)} for A. A velges, siden den sikre gevinsten ikke berøres av fradragsreglene",
            kr(EB_full), kr(gA)),
          o(f"B gir kr {kr(EB_full)} mot kr {kr(A_t)} for A. Tapsfradraget gjør B relativt mer attraktivt enn uten skatt",
            kr(EB_full), kr(A_t))],
    solution=sol(
        "Med fullt tapsfradrag er staten en «silent partner» som tar 30 % av både gevinst og tap. Alle utfall skaleres med (1 − t), så rangeringen endres ikke.",
        [f"A = 0,7 × {kr(gA)} = {kr(A_t)}.",
         f"E[B] = 0,5 × 0,7 × {kr(gB)} − 0,5 × 0,7 × {kr(tapB)} = <b>{kr(EB_full)}</b>.",
         f"B velges. Forholdet {kr(EB_full)}/{kr(A_t)} = {kr(EB_full / A_t, 2)} er det samme som {kr(EB0)}/{kr(gA)}."],
        [("Alltid mindre attraktivt", "det konvensjonelle synet. Det holder bare uten tapsfradrag. Tallet kr 3 000 er tilfellet uten fradrag."),
         (f"Kr {kr(gA)} for A", "glemt at gevinsten på A også skattlegges med 30 %."),
         ("Relativt mer attraktivt", "feil. Forholdet mellom B og A er 1,25 både med og uten skatt.")],
        kontroll=f"{kr(EB_full)} = 0,7 × {kr(EB0)}.",
        kilde="F10 lb 3–5"),
    dekker=["f10-tapsfradrag-03", "f10-tapsfradrag-04", "f10-portefolje-07"])

c1 = S.ledd("c", f"<p>Anta at Ingrid bare får fradrag med {pst(t1, 0)} for halvparten av tapet, slik det ofte er for en nystartet bedrift uten annen inntekt. Hvilken påstand er riktig?</p>",
    riktig=o(f"B gir kr {kr(EB_halv)} mot kr {kr(A_t)} for A, så hun velger A og tar mindre risiko", kr(EB_halv), kr(A_t)),
    gale=[o(f"B gir kr {kr(EB_halv_feil)} mot kr {kr(A_t)} for A, så hun velger B og tar like mye risiko", kr(EB_halv_feil), kr(A_t)),
          "Valget endres ikke, fordi en risikonøytral investor bare ser på forventet gevinst",
          "En nystartet bedrift står bedre enn et etablert selskap, fordi den kan fremføre tapet"],
    solution=sol(
        "Delvis tapsfradrag gjør skatten asymmetrisk. Forventet gevinst etter skatt faller mest for det risikable prosjektet.",
        [f"Tap etter skatt: {kr(tapB)} − 0,3 × 0,5 × {kr(tapB)} = {kr(tap_halv)}.",
         f"E[B] = 0,5 × 0,7 × {kr(gB)} − 0,5 × {kr(tap_halv)} = <b>{kr(EB_halv)}</b> &lt; {kr(A_t)}, så hun velger <b>A</b>."],
        [(f"Kr {kr(EB_halv_feil)}", "behandler halve tapet som om staten dekker det fullt ut. Fradraget er bare verdt 30 % av halve tapet."),
         ("Valget endres ikke", "det er nettopp forventet gevinst etter skatt som faller. Det er den en risikonøytral investor ser på."),
         ("Nystartet står bedre", "snudd. Et etablert selskap kan føre tapet mot overskudd fra andre prosjekter med en gang. En nystartet bedrift må fremføre mot usikker framtidig inntekt.")],
        kilde="F10 lb 2–4"),
    dekker=["f10-tapsfradrag-05", "f10-tapsfradrag-06"])
S.oppgave("Ingrid og to prosjekter", "Skatt og risiko", [12], body1, [a1, b1, c1])

# ================= Oppgave 2: Domar-Musgrave =================
A0, a1_0, ta, tb = 600_000, 150_000, 0.20, 0.40
eksp = a1_0 * (1 - ta)                    # 120 000 risiko etter skatt
a1_ny = eksp / (1 - tb)                   # 200 000
a1_ned = a1_0 * (1 - tb) / (1 - ta)       # 112 500
a1_feil = a1_0 / (1 - tb)                 # 250 000
assert lik(a1_ny * (1 - tb), a1_0 * (1 - ta))
body2 = (f"<p>Henrik har kr {kr(A0)} fordelt på en bankkonto med null avkastning og et aksjefond. Avkastningen på aksjefondet "
         f"skattlegges med {pst(ta, 0)} og tap gir fullt fradrag. Henrik er risikoavers og har tilpasset seg optimalt med kr {kr(a1_0)} i aksjefondet.</p>")

a2 = S.ledd("a", f"<p>Skatten på avkastningen økes til {pst(tb, 0)}. Hva gjør Henrik ifølge porteføljemodellen?</p>",
    riktig=o(f"Øker til kr {kr(a1_ny)} og forventet nytte er uendret", kr(a1_ny)),
    gale=[o(f"Reduserer til kr {kr(a1_ned)} og forventet nytte faller", kr(a1_ned)),
          o(f"Øker til kr {kr(a1_feil)} og forventet nytte er uendret", kr(a1_feil)),
          o(f"Øker til kr {kr(a1_ny)}, men forventet nytte faller", kr(a1_ny))],
    solution=sol(
        "Med null sikker avkastning og fullt tapsfradrag holder investoren a<sub>1</sub>(1 − t) konstant: ∂a<sub>1</sub>/∂t = a<sub>1</sub>/(1 − t). Fordelingen av sluttformuen blir som før, så forventet nytte er uendret.",
        [f"Risiko etter skatt: {kr(a1_0)} × 0,8 = {kr(eksp)}.",
         f"Ny a<sub>1</sub> = {kr(eksp)}/0,6 = <b>{kr(a1_ny)}</b>."],
        [(f"Kr {kr(a1_ned)}", "det konvensjonelle synet: selger seg ned i samme forhold som etter-skatt-faktoren faller."),
         (f"Kr {kr(a1_feil)}", "deler startbeløpet på 0,6 og glemmer at det allerede var skattlagt med 20 %."),
         ("Nytten faller", "riktig beløp, men fordelingen av Y er den samme, så forventet nytte er uendret (Sandmo).")],
        kontroll=f"{kr(a1_ny)} × 0,6 = {kr(a1_ny * (1 - tb))} = {kr(a1_0)} × 0,8.",
        kilde="F10 lb 10–12, AS2 s. 56–57"),
    dekker=["f10-portefolje-03", "f10-sandmo-as2-05"])

b2 = S.ledd("b", "<p>A er startformuen, a<sub>1</sub> beløpet i aksjefondet og x<sub>1</sub> avkastningen på det. Hvilket par av sluttformue Y og førsteordensbetingelse er riktig?</p>",
    riktig="Y = A + a<sub>1</sub>x<sub>1</sub>(1 − t) og E[U′(Y)x<sub>1</sub>] = 0",
    gale=["Y = (A + a<sub>1</sub>x<sub>1</sub>)(1 − t) og E[U′(Y)x<sub>1</sub>] = 0",
          "Y = A + a<sub>1</sub>x<sub>1</sub>(1 − t) og E[U′(Y)]·x<sub>1</sub>(1 − t) = 0",
          "Y = A + a<sub>1</sub>x<sub>1</sub> − t·a<sub>1</sub>·max(x<sub>1</sub>; 0) og E[U′(Y)x<sub>1</sub>] = 0"],
    solution=begrep(
        "Med x<sub>0</sub> = 0 er Y = a<sub>0</sub> + a<sub>1</sub>[1 + x<sub>1</sub>(1 − t)] = A + a<sub>1</sub>x<sub>1</sub>(1 − t). Derivert med hensyn på a<sub>1</sub> gir E[U′(Y)x<sub>1</sub>(1 − t)] = 0. Bare (1 − t) er ikke stokastisk og kan deles bort.",
        "Y = A + a<sub>1</sub>x<sub>1</sub>(1 − t) og E[U′(Y)x<sub>1</sub>] = 0.",
        [("(A + a<sub>1</sub>x<sub>1</sub>)(1 − t)", "skattlegger hovedstolen. Skatten treffer bare avkastningen."),
         ("E[U′(Y)]·x<sub>1</sub>", "setter den stokastiske x<sub>1</sub> utenfor forventningen. Bare det som ikke er stokastisk kan flyttes ut."),
         ("max(x<sub>1</sub>; 0)", "skatt uten tapsfradrag. Modellen har fullt fradrag, så (1 − t) står også foran negative utfall.")],
        kilde="F10 lb 6–8"),
    dekker=["f10-portefolje-01", "f10-portefolje-02"])

c2 = S.ledd("c", "<p>Hvilken påstand om resultatet i modellen er riktig?</p>",
    riktig="Han gjenskaper fordelingen av sluttformuen fra før. Det krever null sikker avkastning og fullt tapsfradrag",
    gale=["Han kjøper mer for å ta igjen avkastningen staten tar. Det krever at han er risikonøytral",
          "Han øker aksjefondet like mye om banken gir en positiv rente som skattlegges med samme sats",
          "Skattlegges bare avkastning over en positiv bankrente, blir virkningen på aksjefondet ubestemt"],
    solution=begrep(
        "Økt skatt gjør at Henrik øker a<sub>1</sub> til a<sub>1</sub>(1 − t) er som før. Da er sannsynlighetsfordelingen for Y gjenskapt. Med x<sub>0</sub> = 0 faller nytteleddene bort, så resultatet gjelder for enhver risikoavers investor. Fullt tapsfradrag trengs for at staten deler nedsiden.",
        "Han gjenskaper fordelingen og forutsetningene er x<sub>0</sub> = 0 og fullt tapsfradrag.",
        [("Ta igjen avkastningen", "feil intuisjon. Staten tar like stor andel av risikoen som av avkastningen. Resultatet krever ikke risikonøytralitet."),
         ("Positiv rente som skattlegges", "med x<sub>0</sub> &gt; 0 kommer en inntektseffekt som avhenger av U″. Fortegnet blir ubestemt (lb 13)."),
         ("Bare meravkastningen", "blander tilfellene. Skattlegges bare x<sub>1</sub> − x<sub>0</sub>, holder ∂a<sub>1</sub>/∂t = a<sub>1</sub>/(1 − t) (Sandmo).")],
        kilde="F10 lb 7, 12–13, AS2 s. 57"),
    dekker=["f10-portefolje-04", "f10-portefolje-05", "f10-portefolje-06", "f10-sandmo-as2-04"])
S.oppgave("Henrik og aksjefondet", "Skatt og risiko", [12], body2, [a2, b2, c2])

# ================= Oppgave 3: Sandmo med mange aktiva =================
rf, ak, s0, s1 = 100_000, 300_000, 0.25, 0.40
fak = (1 - s0) / (1 - s1)                 # 1,25
rf_ny, ak_ny = rf * fak, ak * fak
ned = (1 - s1) / (1 - s0)                 # 0,8
alt_ak = ak + (rf_ny + ak_ny - rf - ak)   # hele økningen i aksjefondet
assert lik(fak, 1.25) and lik(ned, 0.8)
body3 = (f"<p>Kari har kr {kr(rf)} i et rentefond med lav risiko og kr {kr(ak)} i et aksjefond. Resten står i banken til en sikker rente. "
         f"Avkastningen utover den sikre renten skattlegges med {pst(s0, 0)} i begge fondene og tap gir fullt fradrag. "
         f"Satsen økes til {pst(s1, 0)}. Hvilken påstand er i tråd med Sandmo (AS2)?</p>")
a3 = S.ledd("", "",
    riktig=o(f"Begge fondene øker med {kr(100 * (fak - 1))} %, til kr {kr(rf_ny)} og kr {kr(ak_ny)}. Det nesten sikre fondet oppmuntres like mye",
             kr(100 * (fak - 1)), kr(rf_ny), kr(ak_ny)),
    gale=[o(f"Bare aksjefondet øker, til kr {kr(alt_ak)}. Staten som partner vrir porteføljen mot det mest risikable fondet", kr(alt_ak)),
          o(f"Begge fondene faller med {kr(100 * (1 - ned))} %, til kr {kr(rf * ned)} og kr {kr(ak * ned)}. Sandmo viser at skatten demper risikotakingen",
            kr(100 * (1 - ned)), kr(rf * ned), kr(ak * ned)),
          "Resultatet krever at banken gir en helt sikker avkastning. Uten den har skatteøkningen ingen virkning på fondene"],
    solution=sol(
        "Med skatt på meravkastningen gir økt t at alle risikable beholdninger øker i samme prosent: ∂a<sub>j</sub>/∂t = a<sub>j</sub>/(1 − t). Sammensetningen av den risikable porteføljen er uendret. Det svekker tolkningen om at staten som partner oppmuntrer til de mest risikable prosjektene.",
        [f"Faktor (1 − 0,25)/(1 − 0,40) = {kr(fak, 2)}.",
         f"Rentefond {kr(rf)} × 1,25 = <b>{kr(rf_ny)}</b>, aksjefond {kr(ak)} × 1,25 = <b>{kr(ak_ny)}</b>."],
        [(f"Bare aksjefondet, kr {kr(alt_ak)}", "risikodelingstolkningen som Sandmo viser ikke holder. Alle fond øker proporsjonalt."),
         ("Faller med 20 %", "det konvensjonelle synet. Sandmo konkluderer ikke slik. Han forkaster ikke standardresultatet, men ber om forsiktig tolkning."),
         ("Krever helt sikker avkastning", "snudd. Resultatet holder uten et sikkert aktivum når skatten treffer avkastningen relativt til referanseavkastningen.")],
        kilde="AS2 s. 57–59"),
    dekker=["f10-sandmo-as2-01", "f10-sandmo-as2-02", "f10-sandmo-as2-03", "f10-sandmo-as2-06"])
S.oppgave("Kari og to fond", "Skatt og risiko", [12], body3, [a3])

# ================= Oppgave 4: implisitt skatt =================
R, r, tlov = 0.05, 0.036, 0.22
tstar = (R - r) / R                       # 28 %
feil_nevner = (R - r) / r                 # 38,89 %
diff = R - r                              # 1,4 pp
R_lov = R * (1 - tlov)                    # 3,90 %
assert lik(R * (1 - tstar), r)
body4 = (f"<p>En skattepliktig statsobligasjon gir {pst(R, 1)} før skatt. En like risikabel grønn obligasjon er skattefri og gir {pst(r, 1)}. "
         f"Renteinntekter skattlegges med {pst(tlov, 0)} for personer. Markedet er velfungerende.</p>")

a4 = S.ledd("a", "<p>Hva er den implisitte skattesatsen på den grønne obligasjonen?</p>",
    riktig=o(pst(tstar), pst(tstar)),
    gale=[o(pst(feil_nevner), pst(feil_nevner)), o(pst(diff), pst(diff)), o(pst(tlov), pst(tlov))],
    solution=sol(
        "t* = (R − r)/R, der R er avkastningen på det skattlagte aktivumet. t* regnes fra markedsprisene og trenger ikke lovens sats.",
        [f"t* = ({kr(100 * R, 1)} − {kr(100 * r, 1)})/{kr(100 * R, 1)} = <b>{pst(tstar)}</b>."],
        [(pst(feil_nevner), "deler på den skattefrie avkastningen r i stedet for R."),
         (pst(diff), "differansen i prosentpoeng. Det er den implisitte skatten som beløp, ikke som sats."),
         (pst(tlov), "lovens sats. Marginalinvestoren som priser obligasjonene har 28 %, ikke 22 %.")],
        kontroll=f"{kr(100 * R, 1)} % × (1 − 0,28) = {kr(100 * R * (1 - tstar), 2)} %.",
        kilde="F10 lb 15–16, SW s. 125"),
    dekker=["f10-implisitt-skatt-03", "f10-implisitt-skatt-07", "f10-implisitt-skatt-13", "f10-implisitt-skatt-15"])

b4 = S.ledd("b", "<p>Hvilken påstand om prisingen av de to obligasjonene er riktig?</p>",
    riktig="Etterspørselen byr opp prisen på den grønne til R(1 − t<sub>m</sub>) = r. Fallet i avkastning er en skatt til utstederen",
    gale=["Den grønne har null skatt, så den lave avkastningen er en anomali som alle investorer kan utnytte",
          "Likevekten er R(1 − t<sub>m</sub>) = r. Den implisitte skatten kommer inn til staten gjennom lavere kupong",
          o(f"Den grønne er feilpriset: med lovens {pst(tlov, 0)} skulle den gitt {pst(R_lov)}, så kjøp den før prisen faller",
            kr(100 * tlov), kr(100 * R_lov, 2))],
    solution=begrep(
        "To like risikable aktiva må gi samme avkastning etter skatt for marginalinvestoren: R(1 − t<sub>m</sub>) = r. Fritaket øker etterspørselen, prisen stiger og avkastningen før skatt faller. Fallet er en implisitt skatt som tilfaller utstederen, ikke staten.",
        "Prisen bys opp til likevekten og den implisitte skatten går til utstederen.",
        [("Null skatt og anomali", "lavere nominell avkastning er likevekt, ikke en anomali. Samlet skatt er eksplisitt pluss implisitt."),
         ("Inn til staten", "den implisitte skatten betales som høyere pris og går til utstederen."),
         ("Feilpriset med 22 %", "prisen bestemmes av marginalinvestoren, her med 28 %. Lovens sats avgjør ikke t*.")],
        kilde="F10 lb 14–15"),
    dekker=["f10-implisitt-skatt-01", "f10-implisitt-skatt-02", "f10-implisitt-skatt-10"])

inv = [0.0, 0.22, 0.28, 0.45]
c4 = S.ledd("c", f"<p>Fire investorer har marginalskatt {pst(inv[0], 0)} (pensjonsfond), {pst(inv[1], 0)}, {pst(inv[2], 0)} og {pst(inv[3], 0)}. Hvilken påstand er riktig?</p>",
    riktig=o(f"Investoren med {pst(inv[1], 0)} får {pst(R * (1 - inv[1]))} i statsobligasjonen og bør velge den",
             kr(100 * inv[1]), kr(100 * R * (1 - inv[1]), 2)),
    gale=[o(f"Investoren med {pst(inv[3], 0)} får {pst(r * (1 - inv[3]))} i den grønne og bør velge statsobligasjonen",
            kr(100 * inv[3]), kr(100 * r * (1 - inv[3]), 2)),
          o(f"Pensjonsfondet bør velge den grønne, siden {pst(r)} er skattefritt uansett hvem som eier den", kr(100 * r, 2)),
          o(f"Alle fire er likegyldige, siden begge obligasjonene gir {pst(r)} etter skatt i likevekt", kr(100 * r, 2))],
    solution=sol(
        "Sammenlign egen sats med t* = 28 %. Høyere sats gir skattefri, lavere gir skattepliktig. Den skattefrie gir 3,6 % til alle og skal aldri ganges med (1 − t).",
        [f"0 %: {pst(R)} mot {pst(r)}, velger stat. 22 %: <b>{pst(R * 0.78)}</b> mot {pst(r)}, velger stat.",
         f"28 %: {pst(R * 0.72)} mot {pst(r)}, likegyldig. 45 %: {pst(R * 0.55)} mot {pst(r)}, velger grønn."],
        [(pst(r * 0.55), "ganger den skattefrie avkastningen med (1 − t). Investoren med 45 % bør velge den grønne."),
         ("Pensjonsfondet", "fondet betaler ingen skatt og får 5 % i statsobligasjonen. Skattefrie aktiva havner hos dem med sats over t* (klientelleffekten)."),
         ("Alle likegyldige", "bare marginalinvestoren med 28 % er likegyldig. De andre er inframarginale og har en klar preferanse.")],
        kilde="F10 lb 17, SW s. 130"),
    dekker=["f10-implisitt-skatt-04", "f10-implisitt-skatt-05", "f10-implisitt-skatt-12", "f10-sw-implicit-taxes-04"])

B = 200_000
stat = B * R * inv[3]; utst = B * (R - r); invg = B * (r - R * (1 - inv[3]))
assert lik(stat, utst + invg)
stat_lov = B * R * tlov
stat_marg = B * R * tstar
d4 = S.ledd("d", f"<p>Investoren med {pst(inv[3], 0)} sats flytter kr {kr(B)} fra statsobligasjonen til den grønne. Hvor mye taper staten, sparer utstederne og tjener investoren per år?</p>",
    riktig=o(f"Staten kr {kr(stat)}, utstederne kr {kr(utst)}, investoren kr {kr(invg)}", kr(stat), kr(utst), kr(invg)),
    gale=[o(f"Staten kr {kr(stat)}, utstederne kr 0, investoren kr {kr(stat)}", kr(stat), "0", kr(stat)),
          o(f"Staten kr {kr(stat_lov)}, utstederne kr {kr(utst)}, investoren kr {kr(invg)}", kr(stat_lov), kr(utst), kr(invg)),
          o(f"Staten kr {kr(stat_marg)}, utstederne kr {kr(utst)}, investoren kr 0", kr(stat_marg), kr(utst), "0")],
    solution=sol(
        "Staten taper hele den eksplisitte skatten. Utstederen sparer forskjellen i rente. Investoren tjener resten, (t − t*)·R per krone.",
        [f"Staten: {kr(B)} × 5 % × 45 % = <b>{kr(stat)}</b>.",
         f"Utstederne: {kr(B)} × (5 % − 3,6 %) = <b>{kr(utst)}</b>.",
         f"Investoren: {kr(B)} × (3,6 % − 2,75 %) = <b>{kr(invg)}</b>."],
        [("Investoren kr 4 500", "tror kjøperen får hele skattefordelen. Mesteparten går til utstederen."),
         (f"Staten kr {kr(stat_lov)}", "bruker lovens 22 % i stedet for investorens 45 %."),
         ("Investoren kr 0", "regner som om hun var marginalinvestor med 28 %. Bare da er gevinsten null.")],
        kontroll=f"{kr(utst)} + {kr(invg)} = {kr(stat)}. Investorens gevinst = (0,45 − 0,28) × 5 % × {kr(B)}.",
        kilde="F10 lb 19"),
    dekker=["f10-implisitt-skatt-08"])
S.oppgave("Statsobligasjon og grønn obligasjon", "Implisitt skatt", [12], body4, [a4, b4, c4, d4])

# ================= Oppgave 5: havbruk blir skattefritt =================
Rh, tl, ts = 0.09, 0.22, 0.40
x_ny = Rh * (1 - tl)                     # 7,02 %
skog_siri = Rh * (1 - ts)                # 5,40 %
feil_opp = Rh / (1 - tl)                 # 11,54 %
assert skog_siri < x_ny
body5 = (f"<p>Havbruksaksjer og skogaksjer er like risikable og har gitt {pst(Rh, 0)} avkastning før skatt, skattlagt med {pst(tl, 0)}. "
         f"Stortinget gjør avkastningen på havbruksaksjer skattefri, mens skogaksjer fortsatt skattlegges med {pst(tl, 0)}. Siri har {pst(ts, 0)} marginalskatt. "
         "Hva blir avkastningen før skatt på havbruksaksjer i den nye likevekten? Hva velger Siri?</p>")
a5 = S.ledd("", "",
    riktig=o(f"Avkastningen faller til {pst(x_ny)} og Siri velger havbruk", kr(100 * x_ny, 2)),
    gale=[o(f"Avkastningen blir {pst(Rh)} og Siri velger havbruk", kr(100 * Rh, 2)),
          o(f"Avkastningen faller til {pst(x_ny)} og Siri velger skog, som gir {pst(Rh)}", kr(100 * x_ny, 2), kr(100 * Rh, 2)),
          o(f"Avkastningen stiger til {pst(feil_opp)} og Siri velger havbruk", kr(100 * feil_opp, 2))],
    solution=sol(
        "Fritaket øker etterspørselen til havbruk gir det samme etter skatt som skog for marginalinvestoren: X = R(1 − t). Implisitt skatt blir 22 %. Siri sammenligner sin sats med t*.",
        [f"X = 9 % × 0,78 = <b>{pst(x_ny)}</b>.",
         f"Siri: skog gir 9 % × 0,60 = {pst(skog_siri)} &lt; {pst(x_ny)}, så hun velger <b>havbruk</b>."],
        [(pst(Rh), "fritaket kapitaliseres i prisen, så avkastningen før skatt faller."),
         ("Skog", "glemt Siris egen skatt. Skogaksjene gir 5,40 % etter skatt."),
         (pst(feil_opp), "deler på 0,78 i stedet for å gange. Skattefri avkastning blir lavere, ikke høyere.")],
        kontroll="Siris sats 40 % &gt; t* = 22 %, så det skattefrie aktivumet vinner.",
        kilde="F10 lb 14–17, Oppgaver F10 o1"),
    dekker=["f10-implisitt-skatt-06", "f10-implisitt-skatt-09"])
S.oppgave("Havbruk blir skattefritt", "Implisitt skatt", [12], body5, [a5])

# ================= Oppgave 6: kapitalisering =================
kup, kurs, tk = 6.0, 100.0, 0.30
mark = kup * (1 - tk) / kurs             # 4,2 %
pris = kup / mark                        # 142,86
assert lik(pris, kurs / (1 - tk))
body6 = (f"<p>En obligasjon har kupong kr {kr(kup)} og kurs kr {kr(kurs)}. Kupongen skattlegges med {pst(tk, 0)}. Markedsavkastningen etter skatt "
         f"for like risikable plasseringer er {pst(mark, 1)}. Uventet blir kupongen på denne obligasjonen skattefri. Hvilken påstand er riktig?</p>")
a6 = S.ledd("", "",
    riktig=o(f"Kursen stiger til kr {kr(pris, 2)} og den som eier obligasjonen når fritaket blir kjent tjener kr {kr(pris - kurs, 2)}",
             kr(pris, 2), kr(pris - kurs, 2)),
    gale=[o(f"Kursen blir stående på kr {kr(kurs)} og nye kjøpere får {pst(kup / kurs)} avkastning etter skatt i stedet for {pst(mark)}",
            kr(kurs), kr(100 * kup / kurs, 2), kr(100 * mark, 2)),
          "Tilsvarende nye skattefordeler for primærbolig tjener førstegangskjøpere, som får fordelene i hele eiertiden",
          "Skattefordeler kapitaliseres mest i boligprisene når tilbudet av boliger er svært elastisk"],
    solution=sol(
        "Et skattefritak kapitaliseres i prisen. Gevinsten tilfaller den som eier når fritaket blir kjent. Nye kjøpere får bare markedsavkastningen.",
        [f"Ny pris: {kr(kup)}/{kr(mark, 3)} = <b>{kr(pris, 2)}</b>.",
         f"Gevinst for eieren: {kr(pris, 2)} − {kr(kurs)} = <b>{kr(pris - kurs, 2)}</b>."],
        [("Kursen står på kr 100", "da ville nye kjøpere fått en «free lunch». Prisen bys opp til avkastningen er 4,2 %."),
         ("Førstegangskjøpere tjener", "snudd. De betaler skattefordelene gjennom høyere boligpris. Gevinsten går til dem som eier når fordelen innføres."),
         ("Svært elastisk tilbud", "snudd. Kapitaliseringen er størst når tilbudet er lite elastisk. Kan kapitalen tilpasses fritt, går fordelen til kundene gjennom lavere priser.")],
        kontroll=f"{kr(kup)}/{kr(pris, 2)} = {pst(kup / pris, 1)}.",
        kilde="F10 lb 18 og 20, SW s. 124–125"),
    dekker=["f10-implisitt-skatt-11", "f10-implisitt-skatt-14", "f10-sw-implicit-taxes-11"])
S.oppgave("Obligasjonen som blir skattefri", "Implisitt skatt", [12], body6, [a6])

# ================= Oppgave 7: Scholes og Wolfson =================
t7, Rb, rpb, Rp, rpp = 0.35, 0.14, 0.02, 0.13, 0.03
Rb_ra, Rp_ra = Rb - rpb, Rp - rpp        # 12 %, 10 %
rstar = Rb_ra * (1 - t7)                 # 7,8 %
impl = (Rb_ra - Rp_ra) / Rb_ra           # 16,67 %
ekspl = (Rp_ra - rstar) / Rb_ra          # 18,33 %
assert lik(impl + ekspl, t7)
g = (1 - rstar / Rp_ra) / t7             # 62,86 %
ekspl_egen = (Rp_ra - rstar) / Rp_ra     # 22,00 %
rstar_u = Rb * (1 - t7)
g_u = (1 - rstar_u / Rp) / t7            # 85,71 %
ekspl_u = (Rp - rstar_u) / Rb            # 27,86 %
body7 = (f"<p>Lovens sats på ordinær inntekt er {pst(t7, 0)}. En fullt skattlagt referanseobligasjon gir {pst(Rb, 0)} før skatt og har en risikopremie på {pst(rpb, 0)}. "
         f"Et delvis skattlagt aktivum gir {pst(Rp, 0)} før skatt og har en risikopremie på {pst(rpp, 0)}. Bruk definisjonene til Scholes og Wolfson.</p>")
a7 = S.ledd("a", "<p>Hva er den eksplisitte skattesatsen på det delvis skattlagte aktivumet? Hvor stor andel g av avkastningen skattlegges?</p>",
    riktig=o(f"Eksplisitt {pst(ekspl)} og g = {pst(g)}", pst(ekspl), pst(g)),
    gale=[o(f"Eksplisitt {pst(ekspl_egen)} og g = {pst(g)}", pst(ekspl_egen), pst(g)),
          o(f"Eksplisitt {pst(ekspl_u)} og g = {pst(g_u)}", pst(ekspl_u), pst(g_u)),
          o(f"Eksplisitt {pst(ekspl)} og g = {pst(impl)}", pst(ekspl), pst(impl))],
    solution=sol(
        "Trekk fra risikopremiene først. Implisitt sats = (R<sub>b</sub> − R<sub>a</sub>)/R<sub>b</sub>, eksplisitt = (R<sub>a</sub> − r*)/R<sub>b</sub>. g løser R<sub>a</sub>(1 − g·t) = r*.",
        [f"Risikojustert: R<sub>b</sub> = 12 %, R<sub>a</sub> = 10 %, r* = 12 % × 0,65 = {pst(rstar, 1)}.",
         f"Eksplisitt = (10 − 7,8)/12 = <b>{pst(ekspl)}</b>. Implisitt = 2/12 = {pst(impl)}.",
         f"g = (1 − 7,8/10)/0,35 = <b>{pst(g)}</b>."],
        [(pst(ekspl_egen), "måler den eksplisitte skatten mot aktivumets egen avkastning. SW bruker R<sub>b</sub>."),
         (f"{pst(ekspl_u)} og {pst(g_u)}", "glemt å trekke fra risikopremiene."),
         (f"g = {pst(impl)}", "bruker den implisitte satsen som g. g er andelen av avkastningen som skattlegges med full sats.")],
        kontroll=f"Total skattesats {pst(impl)} + {pst(ekspl)} = {pst(t7)}, lik for alle aktiva i likevekt.",
        kilde="SW s. 126–130"),
    dekker=["f10-sw-implicit-taxes-01", "f10-sw-implicit-taxes-02", "f10-sw-implicit-taxes-03"])

b7 = S.ledd("b", "<p>Hvilken påstand er i tråd med Scholes og Wolfson?</p>",
    riktig="Et aktivum som skattlegges hardere enn referanseobligasjonen må gi en premie før skatt og har negativ implisitt skatt",
    gale=["Implisitt skatt gjelder bare obligasjoner, ikke aktiva med raske avskrivninger eller lav skatt på gevinster",
          "Studier av aksjer gir klare bevis for implisitt skatt, siden risikoforskjeller mellom aksjer er lette å kontrollere for",
          "Uten friksjoner og skatteregler krever likevekten at alle investorer har samme marginalskatt"],
    solution=begrep(
        "Skattediskriminerte aktiva, for eksempel særskatter eller inntektsføring før inntekten er opptjent, prises til høyere avkastning før skatt enn referanseaktivumet. Implisitt skatt kan derfor være negativ.",
        "Hardere skatt gir negativ implisitt skatt.",
        [("Bare obligasjoner", "alle skattefavoriserte aktiva bærer implisitt skatt: kapitalgevinster, skattekreditter og raske avskrivninger."),
         ("Klare bevis for aksjer", "snudd. Evidensen for aksjer er uklar nettopp fordi risiko er vanskelig å kontrollere for. Prisreaksjoner på skatteendringer gir bedre støtte."),
         ("Samme marginalskatt", "uten friksjoner og regler ville skattearbitrasje fjerne all skatt. Det er restriksjonene som holder likevekten, ikke like satser.")],
        kilde="SW s. 119–132"),
    dekker=["f10-implisitt-skatt-16", "f10-sw-implicit-taxes-08", "f10-sw-implicit-taxes-10", "f10-sw-implicit-taxes-12"])
S.oppgave("Tre aktiva med ulik skatt", "Implisitt skatt", [12], body7, [a7, b7])

# ================= Oppgave 8: spareformer =================
Y, rr, ts8, n = 20_000, 0.06, 0.22, 10
f = (1 + rr) ** n
V1 = Y * (1 + rr * (1 - ts8)) ** n
V2 = Y * (f * (1 - ts8) + ts8)
V3 = Y * f
assert lik(V2, Y * f - ts8 * (Y * f - Y))
V2_minus = Y * (f * (1 - ts8) - ts8)
V2_glemt = Y * f * (1 - ts8)
V3_glemt_skatt = Y / (1 - ts8) * f
assert V1 < V2 < V3
eff1, eff2, eff3 = (V1 / Y) ** (1 / n) - 1, (V2 / Y) ** (1 / n) - 1, (V3 / Y) ** (1 / n) - 1
assert lik(eff1, rr * (1 - ts8)) and lik(eff3, rr)
body8 = (f"<p>Mona sparer kr {kr(Y)} i {n} år. Avkastningen er {pst(rr, 0)} per år og skattesatsen {pst(ts8, 0)} i hele perioden. "
         "Hun vurderer banksparing med skatt på renten hvert år, en ASK der skatten på avkastningen betales ved uttak "
         "og pensjonssparing der innskuddet gir fradrag og hele uttaket skattlegges. Netto kostnad er den samme i alle tre. Se bort fra skjerming.</p>")
a8 = S.ledd("a", "<p>Hva blir verdien etter skatt med ASK og med pensjonssparing? Avrund til hele kroner.</p>",
    riktig=o(f"ASK gir kr {kr(V2)} og pensjonssparing kr {kr(V3)}", kr(V2), kr(V3)),
    gale=[o(f"ASK gir kr {kr(V2_minus)} og pensjonssparing kr {kr(V3)}", kr(V2_minus), kr(V3)),
          o(f"ASK gir kr {kr(V2_glemt)} og pensjonssparing kr {kr(V3)}", kr(V2_glemt), kr(V3)),
          o(f"ASK gir kr {kr(V2)} og pensjonssparing kr {kr(V3_glemt_skatt)}", kr(V2), kr(V3_glemt_skatt))],
    solution=sol(
        "ASK: V<sub>2</sub> = Y[(1 + r)<sup>n</sup>(1 − t) + t], bare avkastningen skattlegges ved uttak. Pensjon: fradraget lar henne investere Y/(1 − t). Hele uttaket skattlegges, så V<sub>3</sub> = Y(1 + r)<sup>n</sup>.",
        [f"1,06<sup>10</sup> = {kr(f, 4)}.",
         f"V<sub>2</sub> = {kr(Y)} × ({kr(f, 4)} × 0,78 + 0,22) = <b>{kr(V2)}</b>.",
         f"V<sub>3</sub> = {kr(Y)} × {kr(f, 4)} = <b>{kr(V3)}</b>."],
        [(f"Kr {kr(V2_minus)}", "minus t i stedet for pluss t. Lysbilde 24 og 26 har denne fortegnsfeilen. Talleksempelet på lb 27 bruker + t."),
         (f"Kr {kr(V2_glemt)}", "skattlegger også innskuddet. Det er bare avkastningen som skattlegges i ASK."),
         (f"Kr {kr(V3_glemt_skatt)}", "glemt skatten ved uttak. Hele uttaket skattlegges fordi innskuddet ga fradrag.")],
        kontroll=f"V<sub>3</sub> = {kr(Y)}/0,78 × {kr(f, 4)} × 0,78. Fradrag og skatt kansellerer med lik sats.",
        kilde="F10 lb 24–27, SW s. 122–123"),
    dekker=["f10-spareprodukter-02", "f10-spareprodukter-03", "f10-sw-implicit-taxes-06"])

b8 = S.ledd("b", "<p>Hvilken påstand om banksparingen og de tre spareformene er riktig?</p>",
    riktig=o(f"Banksparing gir kr {kr(V1)}, eller {pst(eff1)} per år. Rangeringen forutsetter lik sats over tid",
             kr(V1), kr(100 * eff1, 2)),
    gale=[o(f"Banksparing gir kr {kr(V2_glemt)}, fordi både innskudd og renter skattlegges ved slutten", kr(V2_glemt)),
          o(f"ASK gir like høy årlig avkastning som pensjonssparing, {pst(eff3)}, siden skatten betales ved uttak", kr(100 * eff3, 2)),
          "Individuell pensjonssparing følger ASK-formelen, siden skatten i begge betales ved uttak"],
    solution=sol(
        "Banksparing: V<sub>1</sub> = Y[1 + r(1 − t)]<sup>n</sup>. V<sub>1</sub> ≤ V<sub>2</sub> ≤ V<sub>3</sub> så lenge t er konstant: utsatt skatt er et rentefritt lån og fradraget gjør avkastningen reelt skattefri.",
        [f"r(1 − t) = 6 % × 0,78 = {pst(eff1)}.",
         f"V<sub>1</sub> = {kr(Y)} × 1,0468<sup>10</sup> = <b>{kr(V1)}</b>.",
         f"Årlig: bank {pst(eff1)}, ASK {pst(eff2)}, pensjon {pst(eff3)}."],
        [(f"Kr {kr(V2_glemt)}", "formelen Y(1 + r)<sup>n</sup>(1 − t), der innskuddet også skattlegges. Banksparing skattlegger renten hvert år."),
         ("ASK som pensjon", f"skattekreditten utsetter bare skatten. ASK gir {pst(eff2)} per år."),
         ("IPS følger ASK", "IPS gir fradrag for innskuddet og er V<sub>3</sub>. ASK gir ikke fradrag og er V<sub>2</sub>.")],
        kilde="F10 lb 22–23 og 26–27"),
    dekker=["f10-spareprodukter-01", "f10-spareprodukter-04", "f10-spareprodukter-05", "f10-spareprodukter-07"])

inv8, tsk, dr = 200_000, 0.30, 0.08
straks = tsk * inv8
lin = tsk * inv8 / 2 + tsk * inv8 / 2 / (1 + dr)
tap_nv = straks - lin                     # 2 222
fed, dele = 0.30, 0.08
samlet_feil = fed + dele                  # 38 %
samlet = fed + dele * (1 - fed)           # 35,6 %
assert samlet < samlet_feil
c8 = S.ledd("c", f"<p>Skattesatsen er {pst(tsk, 0)} og diskonteringsrenten {pst(dr, 0)}. Hvilken påstand er i tråd med forelesningen og Scholes og Wolfson?</p>",
    riktig=o(f"Fradrag for kr {kr(inv8)} fordelt likt over to år er kr {kr(tap_nv)} mindre verdt enn fradrag med en gang",
             kr(inv8), kr(tap_nv)),
    gale=[o(f"En californier med {pst(fed, 0)} føderal skatt og {pst(dele, 0)} delstatsskatt som er fradragsberettiget føderalt, har samlet sats {pst(samlet_feil, 0)}",
            kr(100 * fed), kr(100 * dele), kr(100 * samlet_feil)),
          o(f"Faller satsen fra {pst(tsk, 0)} ved innskudd til 20 % ved uttak, må investeringen gi mer enn obligasjonsrenten før skatt",
            kr(100 * tsk), "20"),
          "Pensjonssparing med fradrag gir alltid høyest verdi, uansett hvordan satsen endres fra innskudd til uttak"],
    solution=sol(
        "Raskere fradrag har høyere nåverdi, selv om summen av fradrag er den samme.",
        [f"Med en gang: 30 % × {kr(inv8)} = {kr(straks)}.",
         f"Over to år: {kr(straks / 2)} + {kr(straks / 2)}/1,08 = {kr(lin)}.",
         f"Forskjell: <b>{kr(tap_nv)}</b>."],
        [("38 %", f"glemt at delstatsskatten er fradragsberettiget. Samlet sats er 30 % + 8 % × 0,7 = {pst(samlet, 1)}."),
         ("Mer enn obligasjonsrenten", "snudd. Dekker staten 30 % av innskuddet og tar bare 20 % av uttaket, byr investorene opp prisen til avkastningen før skatt er under obligasjonsrenten."),
         ("Alltid høyest", "rangeringen forutsetter konstant sats. Er satsen ved uttak høyere enn ved innskudd, kan pensjonssparing tape mot banksparing.")],
        kilde="SW s. 121–124, Gml. F9 lb 20"),
    dekker=["f10-sw-implicit-taxes-05", "f10-sw-implicit-taxes-09", "f10-sw-implicit-taxes-07", "f10-spareprodukter-06"])
S.oppgave("Mona og tre spareformer", "Sparing", [2, 15], body8, [a8, b8, c8])

# ================= Oppgave 9: risikojustering =================
rf9, Er, sd, beta, rm = 0.03, 0.09, 0.25, 1.3, 0.08
sharpe = (Er - rf9) / sd                 # 0,24
sharpe_var = (Er - rf9) / sd ** 2        # 0,96
ob_s, ak_s, ak_feil = rf9 * (1 - 0.22), Er * (1 - 0.3784), Er * (1 - 0.22)
body9 = (f"<p>Jonas vurderer en statsobligasjon med sikker avkastning {pst(rf9, 0)} og en aksje med forventet avkastning {pst(Er, 0)} "
         f"og standardavvik {pst(sd, 0)}. Aksjen har beta {kr(beta, 1)} og markedsavkastningen er forventet å bli {pst(rm, 0)}.</p>")
a9 = S.ledd("a", "<p>Renter skattlegges med 22 % og aksjegevinster effektivt med 37,84 %. Hvilken påstand er riktig?</p>",
    riktig=o(f"Sharpe-ratioen er {kr(sharpe, 2)}, som er en moderat risikojustert avkastning", kr(sharpe, 2)),
    gale=[o(f"Sharpe-ratioen er {kr(sharpe_var, 2)}, nær grensen for god risikojustert avkastning", kr(sharpe_var, 2)),
          o(f"Risikopremien på {pst(Er - rf9, 0)} viser at også en risikoavers Jonas bør velge aksjen", kr(100 * (Er - rf9))),
          o(f"Etter skatt gir aksjen {pst(ak_feil)} mot {pst(ob_s)} på obligasjonen", kr(100 * ak_feil, 2), kr(100 * ob_s, 2))],
    solution=sol(
        "Sharpe = (E[r] − r<sub>f</sub>)/σ. 0–1 er moderat, 1–2 god og over 2 svært god risikojustert avkastning.",
        [f"Sharpe = (9 % − 3 %)/25 % = <b>{kr(sharpe, 2)}</b>: moderat."],
        [(kr(sharpe_var, 2), "deler på variansen 0,0625 i stedet for standardavviket."),
         ("Risikopremien", "avgjør bare for en risikonøytral investor. Den ser bort fra risikoen."),
         (pst(ak_feil), f"bruker 22 % på aksjegevinsten. Med 37,84 % gir aksjen {pst(ak_s)}. Skattesystemet favoriserer renteinntekt relativt sett.")],
        kilde="F10 lb 31–32 og 37"),
    dekker=["f10-risikojustering-01", "f10-risikojustering-02", "f10-risikojustering-05"])

Aa = 2
CE = Er - 0.5 * Aa * sd ** 2
CE_sd = Er - 0.5 * Aa * sd
CE_utenA = Er - 0.5 * sd ** 2
capm = rf9 + beta * (rm - rf9)
capm_brm = beta * rm
capm_aksje = rf9 + beta * (Er - rf9)
b9 = S.ledd("b", f"<p>Jonas har risikoaversjon A = {Aa}. Hva er sikkerhetsekvivalenten for aksjen og den påkrevde avkastningen etter CAPM?</p>",
    riktig=o(f"CE {pst(CE)} og CAPM {pst(capm)}", pst(CE), pst(capm)),
    gale=[o(f"CE {pst(CE_sd)} og CAPM {pst(capm)}", pst(CE_sd), pst(capm)),
          o(f"CE {pst(CE)} og CAPM {pst(capm_brm)}", pst(CE), pst(capm_brm)),
          o(f"CE {pst(CE_utenA)} og CAPM {pst(capm_aksje)}", pst(CE_utenA), pst(capm_aksje))],
    solution=sol(
        "CE = E[r] − ½Aσ<sup>2</sup>. CAPM: E[r] = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>).",
        [f"CE = 0,09 − 0,5 × 2 × 0,0625 = <b>{pst(CE)}</b> &lt; 3 %: Jonas foretrekker obligasjonen.",
         f"CAPM = 3 % + 1,3 × 5 % = <b>{pst(capm)}</b> &gt; 9 %: aksjen er trolig overvurdert."],
        [(f"CE {pst(CE_sd)}", "bruker σ i stedet for σ<sup>2</sup>."),
         (f"CAPM {pst(capm_brm)}", "ganger β med r<sub>m</sub> i stedet for med risikopremien."),
         (f"CE {pst(CE_utenA)}", "glemt A. CAPM bruker aksjens forventede avkastning i stedet for markedets.")],
        kontroll="CE er subjektiv for Jonas, CAPM er en markedsbasert vurdering.",
        kilde="F10 lb 33–36"),
    dekker=["f10-risikojustering-03", "f10-risikojustering-04"])
S.oppgave("Jonas: aksje eller statsobligasjon", "Porteføljevalg", [12, 14], body9, [a9, b9])

S.skriv(
    label="F10 Skatt, aksjer og risikotaking",
    note="Tapsfradrag og risikovalg, porteføljemodellen med skatt (Domar-Musgrave og Sandmo), implisitt skatt med Scholes og Wolfson, de tre spareformene og risikojustering.",
    facts=[f"{S.n} flervalg med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Spør alltid hvem som bærer nedsiden og hvilket aktivum som er skattefritt. t* har den skattlagte avkastningen i nevneren. V<sub>2</sub> slutter med + t, ikke − t som på lysbilde 24 og 26.")
