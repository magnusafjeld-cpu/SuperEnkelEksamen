"""Regneskript for settet fl-psyk: Næss: finansiell psykologi (2026).

Kilde: «Finansiell_psykologi2026 (2).pdf.txt» (23. september 2026, 65 sider), den fyldigste
versjonen. «Psykologi lb N» viser til sidenummeret der. Versjon (4) fra 16. oktober 2026 har
62 sider: den mangler svaret på om risikoaversjon forklarer lav aksjedeltakelse (lb 19),
oppsummeringslysbildet om Choi (lb 40) og setningen om bankansatte i media (lb 47), og sier
«bare eller hovedsakelig» norske aksjer i stedet for «bare akkurat her» (lb 33–36).
Regneleddene om bank mot aksjer med ln-nytte bygger på H2022 o5 og H2019 o9.
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from math import log
from felles import *

S = Sett("fl-psyk")


def o(tekst, *tall):
    return (tekst, list(tall))


# ================= Oppgave 1: bias og støy =================
a1 = S.ledd("", "<p>Et forsikringsselskap lar tolv saksbehandlere sette premie på de samme seks sakene. Ledelsen venter om lag 10 % uenighet. "
                "I snitt skiller to saksbehandlere seg med om lag 50 %, men uten noe fast mønster i hvem som ligger høyt. Hvilket utsagn er riktig?</p>",
    riktig="Dette er støy. Den dempes best med algoritmer eller enkle modeller i stedet for magefølelse",
    gale=["Dette er bias, fordi hver saksbehandler bommer på den riktige premien i sin egen faste retning",
          "Dette er støy. Den dempes best ved å la hver saksbehandler stole mer på egen erfaring",
          "Det kan kalles bias uten noe mål å sammenligne med, så lenge vurderingene spriker mye"],
    solution=begrep(
        "Bias er systematisk skjevhet: man bommer i én bestemt retning, målt mot en benchmark. Støy er feil uten noen spesiell retning. Kahneman fant nettopp om lag 50 % forskjell der ledelsen ventet 10 %. Enkle modeller gir mer stabile vurderinger enn mennesker.",
        "Støy, som dempes med algoritmer.",
        [("Bias i egen retning", "spredning uten fast mønster er støy. Bias krever at feilen går i én retning."),
         ("Stole på erfaring", "snudd. Magefølelse er kilden til støyen. Kahneman anbefaler regler og modeller."),
         ("Bias uten mål", "for å kalle noe bias må vi ha en benchmark. Forelesningen bruker finansteori og empiri.")],
        kilde="Psykologi lb 8–14"),
    dekker=["psyk-skjevheter-05", "psyk-skjevheter-15"])
S.oppgave("Saksbehandlerne og premiene", "Finansiell psykologi", [18], "", [a1])

# ================= Oppgave 2: vanlige skjevheter =================
a2 = S.ledd("", "<p>Hvilken kobling mellom atferd og skjevhet er riktig?</p>",
    riktig="Per leser bare analysene som støtter aksjen han allerede eier. Det er bekreftelsesbias",
    gale=["Kari kjøper kryptovaluta fordi alle vennene hennes har gjort det. Det er tilgjengelighetsbias",
          "Ola mener aksjen er verdt det han betalte, selv om utsiktene er endret. Det er flokkatferd",
          "Lise tror et nytt krakk er svært sannsynlig etter mye omtale av et krakk. Det er ankereffekt"],
    solution=begrep(
        "Bekreftelsesbias er å søke informasjon som bekrefter egne antakelser. Flokkatferd er å følge mengden uten egen analyse og kan gi bobler og krakk (dotcom, krypto, Norwegian 2021). Ankereffekt er å legge for stor vekt på den første informasjonen. Tilgjengelighetsbias er å overvurdere sannsynligheten for det som er nylig, levende eller lett å huske.",
        "Per: bekreftelsesbias.",
        [("Kari", "å følge vennene er flokkatferd."),
         ("Ola", "kjøpsprisen er et anker. Det er ankereffekt."),
         ("Lise", "et levende, nylig eksempel som styrer sannsynligheten er tilgjengelighetsbias.")],
        kilde="Psykologi lb 16 og 38"),
    dekker=["psyk-skjevheter-09", "psyk-skjevheter-08", "psyk-skjevheter-10", "psyk-skjevheter-12"])
S.oppgave("Fire investorer", "Finansiell psykologi", [18], "", [a2])

# ================= Oppgave 3: manglende deltakelse =================
a3 = S.ledd("", "<p>I nesten alle land eier under halvparten av befolkningen aksjer, også blant dem som sparer. Hvilken påstand er i tråd med pensum?</p>",
    riktig="Risikoaversjon forklarer det dårlig, fordi nyttefunksjonene er tilnærmet risikonøytrale for svært små beløp",
    gale=["Choi forklarer det med at bøkene råder folk til å ha alle pengene i aksjer, også de pengene de trenger snart",
          "Haliassos m.fl. finner at det å bo ved siden av en økonom ikke påvirker sjansen for å spare i aksjer",
          "Hirshleifer og Shumway finner at dårlig vær gir høyere avkastning, siden pessimister selger for billig"],
    solution=begrep(
        "Den som ikke eier aksjer, tar lite risiko ved å kjøpe én aksje. De fleste måter å uttrykke risikoaversjon på gir tilnærmet risikonøytralitet for svært små beløp. Om man trenger sparing, avhenger av hvor man er i livssyklusen.",
        "Risikoaversjon forklarer det dårlig.",
        [("Choi", "snudd. Bøkene sier at penger som kan trengs snart ikke skal stå i aksjer. Da blir lav deltakelse som stiger med formuen et naturlig resultat (Choi s. 12)."),
         ("Haliassos", "snudd. Å bosette seg ved siden av en økonom øker sjansen for å spare i aksjer (lb 64)."),
         ("Dårlig vær", "snudd. Dårlig vær henger sammen med lavere avkastning. Tap i en viktig fotballkamp gir 0,2 % lavere avkastning (Edmans m.fl.) (lb 39).")],
        kilde="Psykologi lb 18–19, 39 og 64. Choi s. 12. Lb 19 finnes bare i versjon (2)"),
    dekker=["psyk-skjevheter-13", "psyk-choi-10", "psyk-laering-08", "psyk-skjevheter-14"])
S.oppgave("Hvorfor eier så få aksjer?", "Finansiell psykologi", [18], "", [a3])

# ================= Oppgave 4: handel og overkonfidens =================
kurt, per_mnd = 49, 150
aar_kost = kurt * per_mnd * 12           # 88 200
mnd_kost = kurt * per_mnd                # 7 350
assert aar_kost == 88_200
a4 = S.ledd("", f"<p>Sander handler aksjer på nett og betaler kr {kurt} i kurtasje per handel. Han gjør om lag {per_mnd} handler i måneden. "
                "Hva koster kurtasjen ham i året og hva er forelesningens forklaring på atferden og resultatet?</p>",
    riktig=o(f"Kr {kr(aar_kost)}. Overkonfidens driver handelen. Gebyrene trekker ham under markedet", kr(aar_kost)),
    gale=[o(f"Kr {kr(aar_kost)}. Overkonfidens driver handelen, men i snitt får han likevel markedets avkastning", kr(aar_kost)),
          o(f"Kr {kr(mnd_kost)}. Overkonfidens driver handelen. Gebyrene trekker ham under markedet", kr(mnd_kost)),
          o(f"Kr {kr(aar_kost)}. Risikoaversjon driver handelen, fordi han selger seg ut når kursene svinger", kr(aar_kost))],
    solution=sol(
        "Overkonfidens (better-than-average: 93 % av amerikanere tror de kjører bedre enn snittet) er en viktig forklaring på at folk handler for ofte. Markedet er snittet før kostnader. Gebyrene kommer i tillegg, så både amatører og proffer taper i snitt mot markedet.",
        [f"{kurt} × {per_mnd} = {kr(mnd_kost)} i måneden.",
         f"{kr(mnd_kost)} × 12 = <b>{kr(aar_kost)}</b> i året."],
        [("Markedets avkastning i snitt", "glemmer gebyrene. Snittet av alle investorer er markedet før kostnader, ikke etter."),
         (f"Kr {kr(mnd_kost)}", "kostnaden for én måned."),
         ("Risikoaversjon", "feil skjevhet. Hyppig handel forklares med overkonfidens.")],
        kontroll="Lysbildet: 79 kr × 3 600 handler gir om lag 284 000 kr.",
        kilde="Psykologi lb 21–26"),
    dekker=["psyk-skjevheter-01", "psyk-skjevheter-06"])
S.oppgave("Sander og kurtasjen", "Finansiell psykologi", [18], "", [a4])

# ================= Oppgave 5: disposisjonseffekten og prospektteori =================
a5 = S.ledd("", "<p>Hilde eier aksje A, som har steget 40 % siden hun kjøpte den. Aksje B har falt 30 %. Hun venter samme framtidige avkastning på begge. "
                "Hun trenger penger og selger A, fordi hun ikke vil ta tapet på B. Hvilket utsagn er riktig?</p>",
    riktig="Disposisjonseffekten. Verdifunksjonen er konveks og brattere for tap, så hun vil ikke realisere tapet på B",
    gale=["Disposisjonseffekten. Verdifunksjonen er konkav også for tap, så hun er like risikoavers i tap som i gevinst",
          "Et godt valg. Kjøpsprisen sier noe om framtidig avkastning, så aksjen som har falt bør hun beholde",
          "Disposisjonseffekten. Den skyldes risikoaversjon: konkav nytte av formuesnivået gjør at hun beholder B"],
    solution=begrep(
        "Disposisjonseffekten er tendensen til å selge vinnere for tidlig og beholde tapere for lenge. Salget burde bare avhenge av forventet framtidig avkastning. Tversky og Kahneman: folk måler gevinst og tap mot et referansepunkt (her kjøpsprisen). Tap svir mer enn like store gevinster gleder. Verdifunksjonen er konkav for gevinster, konveks for tap og brattere for tap.",
        "Disposisjonseffekten forklart med prospektteori.",
        [("Konkav også for tap", "feil form. Konveks for tap gjør folk risikosøkende i tap, så de holder på taperen."),
         ("Kjøpsprisen sier noe", "kjøpsprisen er historie og påvirker ikke framtidig avkastning."),
         ("Risikoaversjon", "blander tapsaversjon (asymmetri rundt et referansepunkt) med risikoaversjon (konkav nytte av formuesnivå). Standard teori bryr seg bare om nivået.")],
        kilde="Psykologi lb 27–31"),
    dekker=["psyk-skjevheter-07", "psyk-skjevheter-02", "psyk-skjevheter-03"])
S.oppgave("Hilde selger vinneren", "Finansiell psykologi", [18], "", [a5])

# ================= Oppgave 6: bank eller aksjer med ln-nytte =================
W0, T6, rb, rg, rd, pg, ps, ta = 800_000, 15, 0.035, 0.09, -0.02, 0.45, 0.60, 1.03
B = W0 * (1 + rb) ** T6
G = W0 * (1 + rg) ** T6
Dd = W0 * (1 + rd) ** T6
assert Dd < W0 < B < G
EW = pg * G + (1 - pg) * Dd
UB = log(B)
EU = pg * log(G) + (1 - pg) * log(Dd)
EU_lnEW = log(EW)
EU50 = 0.5 * log(G) + 0.5 * log(Dd)
EW50 = 0.5 * G + 0.5 * Dd
assert EW > B and EU < UB < EU_lnEW and EU < EU50 < UB
Bn, Gn, Dn = rund(B), rund(G), rund(Dd)
tab6 = ("<table class=\"data\"><tr><th>Valg</th><th>Utfall</th><th>Sannsynlighet</th><th>Sluttverdi</th></tr>"
        f"<tr><td>Bank, {pst(rb, 1)} i året</td><td>Sikkert</td><td class=\"n\">100 %</td><td class=\"n\">kr {kr(B)}</td></tr>"
        f"<tr><td>Aksjefond</td><td>Godt, {pst(rg, 0)} i året</td><td class=\"n\">{pst(pg, 0)}</td><td class=\"n\">kr {kr(G)}</td></tr>"
        f"<tr><td>Aksjefond</td><td>Dårlig, −2 % i året</td><td class=\"n\">{pst(1 - pg, 0)}</td><td class=\"n\">kr {kr(Dd)}</td></tr></table>")
body6 = (f"<p>Tor plasserer kr {kr(W0)} i {T6} år, enten i banken eller i et aksjefond. Tabellen viser sluttverdiene og de objektive sannsynlighetene. "
         f"Tor har nyttefunksjonen U(W) = ln W, der W er sluttverdien. Oppgi nytte med fire desimaler.</p>{tab6}")
a6 = S.ledd("a", "<p>Hva er forventet sluttverdi for aksjefondet og hva velger Tor?</p>",
    riktig=o(f"Kr {kr(EW)}. Banken: {kr(EU, 4)} mot {kr(UB, 4)}", kr(EW), kr(EU, 4), kr(UB, 4)),
    gale=[o(f"Kr {kr(EW)}. Aksjefondet: {kr(EU_lnEW, 4)} mot {kr(UB, 4)}", kr(EW), kr(EU_lnEW, 4), kr(UB, 4)),
          o(f"Kr {kr(EW50)}. Banken: {kr(EU50, 4)} mot {kr(UB, 4)}", kr(EW50), kr(EU50, 4), kr(UB, 4)),
          o(f"Kr {kr(EW)}. Aksjefondet, fordi forventet sluttverdi er over bankens", kr(EW))],
    solution=sol(
        "Forventet sluttverdi = Σ p × W. Valget avgjøres av forventet nytte Σ p × ln W, ikke av forventet sluttverdi.",
        [f"E[W] = 0,45 × {kr(G)} + 0,55 × {kr(Dd)} = <b>{kr(EW)}</b>.",
         f"E[ln W] = 0,45 × ln {kr(G)} + 0,55 × ln {kr(Dd)} = {kr(EU, 4)}.",
         f"Banken: ln {kr(B)} = {kr(UB, 4)} &gt; {kr(EU, 4)}. Tor velger <b>banken</b>."],
        [(kr(EU_lnEW, 4), "ln av forventet sluttverdi, ln E[W]. For en risikoavers er E[ln W] lavere enn ln E[W]."),
         (f"Kr {kr(EW50)}", "vekter utfallene likt (50/50) i stedet for 45/55. Valget blir det samme, men tallene er gale."),
         ("Forventet sluttverdi", "risikonøytral tenkning. Fondet har høyere forventet sluttverdi, men lavere forventet nytte.")],
        kilde="H2022 o5(2)–(3) og H2019 o9b–c. Manual kap. 18"),
    dekker=["psyk-nytte-01"])

EUs = ps * log(G) + (1 - ps) * log(Dd)
EUs_bytt = (1 - ps) * log(G) + ps * log(Dd)
assert EUs > UB > EUs_bytt
a6b = S.ledd("b", f"<p>Tor tror selv at sannsynligheten for det gode utfallet er {pst(ps, 0)}. Hvilken påstand er riktig?</p>",
    riktig=o(f"Sluttverdiene er de samme. Forventet nytte blir {kr(EUs, 4)}, så han velger fondet. Det er en bias", kr(EUs, 4)),
    gale=[o(f"Sluttverdiene er de samme. Forventet nytte blir {kr(EUs_bytt, 4)}, så han velger banken. Det er en bias", kr(EUs_bytt, 4)),
          "Sluttverdien i det gode utfallet blir høyere, fordi han venter mer. Han velger derfor fondet. Det er en bias",
          o(f"Sluttverdiene er de samme. Forventet nytte blir {kr(EUs, 4)}, så han velger fondet. Det er ingen bias", kr(EUs, 4))],
    solution=sol(
        "Subjektive sannsynligheter endrer bare vektene, ikke sluttverdiene. Å bruke subjektive i stedet for objektive sannsynligheter er en bias. Overoptimisme kan snu valget.",
        [f"E[ln W] = 0,6 × ln {kr(G)} + 0,4 × ln {kr(Dd)} = <b>{kr(EUs, 4)}</b>.",
         f"{kr(EUs, 4)} &gt; {kr(UB, 4)}, så han velger <b>fondet</b>. Med de objektive sannsynlighetene valgte han banken."],
        [(kr(EUs_bytt, 4), "har byttet vektene og gitt 60 % til det dårlige utfallet."),
         ("Høyere sluttverdi", "sluttverdiene i hvert utfall er bestemt av avkastningen og endres ikke av hva Tor tror."),
         ("Ingen bias", "det er nettopp avviket fra de objektive sannsynlighetene som er biasen.")],
        kilde="H2022 o5(4)–(5) og H2019 o9d–e"),
    dekker=["psyk-nytte-02"])

EUt = pg * log(G) + (1 - pg) * log(Dd) / ta
EUt_begge = EU / ta
EUt_god = pg * log(G) / ta + (1 - pg) * log(Dd)
EUt_subj = ps * log(G) + (1 - ps) * log(Dd) / ta
assert EUt < UB
a6c = S.ledd("c", f"<p>Tor bruker igjen de objektive sannsynlighetene, men er tapsaverse. Referansepunktet er beløpet han plasserer. "
                  f"Nytten i et utfall under referansepunktet ganges med 1/{kr(ta, 2)}. Hva blir forventet nytte av aksjefondet?</p>",
    riktig=o(f"{kr(EUt, 4)}", kr(EUt, 4)),
    gale=[o(f"{kr(EUt_begge, 4)}", kr(EUt_begge, 4)),
          o(f"{kr(EUt_god, 4)}", kr(EUt_god, 4)),
          o(f"{kr(EUt_subj, 4)}", kr(EUt_subj, 4))],
    solution=sol(
        "Tapsaversjon: utfall under referansepunktet (kr 800 000) vektes ned. Bare det dårlige utfallet er et tap.",
        [f"Det dårlige utfallet, {kr(Dd)}, er under {kr(W0)}. Det gode er over.",
         f"E = 0,45 × ln {kr(G)} + 0,55 × ln {kr(Dd)}/1,03 = <b>{kr(EUt, 4)}</b>.",
         f"{kr(EUt, 4)} &lt; {kr(UB, 4)}. Tapsaversjon forsterker bankvalget."],
        [(kr(EUt_begge, 4), "ganger begge utfallene med faktoren."),
         (kr(EUt_god, 4), "ganger gevinstutfallet i stedet for tapsutfallet."),
         (kr(EUt_subj, 4), "bruker de subjektive sannsynlighetene fra b. Oppgaven sier objektive.")],
        kontroll="Siden ln W &gt; 0, gjør en faktor under 1 tapsutfallet verre. Nytten faller fra a.",
        kilde="H2022 o5(6) og H2019 o9g. Tapsaversjon: Psykologi lb 30"),
    dekker=["psyk-nytte-03", "psyk-skjevheter-02"])
S.oppgave("Tor: bank eller aksjefond", "Finansiell psykologi", [14, 18], body6, [a6, a6b, a6c])

# ================= Oppgave 7: heuristikker, mentalt regnskap og dulting =================
a7 = S.ledd("", "<p>En arbeidsgiver tilbyr de ansatte en spareordning med fem fond. Hvilken påstand er riktig?</p>",
    riktig="Ane fordeler sparingen likt på de fem fondene hun får tilbud om. Det er 1/N-regelen",
    gale=["Bjørn velger fondet som står øverst på listen, uansett kvalitet. Det er 1/N-regelen",
          "Cecilie har dyr kortgjeld og en urørt feriekonto. Økonomer mener det er klokt, siden pengene er øremerket",
          "Alle meldes inn automatisk med rett til å melde seg ut når de vil. Det er tvang og ikke dulting"],
    solution=begrep(
        "1/N-regelen: folk fordeler jevnt på alternativene som tilbys, selv når det ikke er optimalt. Menyeffekten: det som står øverst velges oftere.",
        "Ane følger 1/N-regelen.",
        [("Bjørn", "å velge det øverste fondet er menyeffekten, ikke 1/N."),
         ("Cecilie", "mentalt regnskap. Økonomer sier at penger er ombyttbare og at dyr gjeld bør betales ned. Det er bøkene som støtter å ha begge."),
         ("Automatisk innmelding", "dulting gjør gode valg enklere uten å endre insentivene. Standardvalg gir 50 % større sjanse for pensjonssparing (Thaler og Sunstein).")],
        kilde="Psykologi lb 16, 32 og 49. Choi s. 20–21"),
    dekker=["psyk-skjevheter-04", "psyk-skjevheter-11", "psyk-choi-05", "psyk-laering-02"])
S.oppgave("Fem fond i spareordningen", "Finansiell psykologi", [18], "", [a7])

# ================= Oppgave 8: home bias =================
a8 = S.ledd("", "<p>Silje jobber i oljeservice i Stavanger og har 80 % av aksjesparingen i norske aksjer. Det norske aksjemarkedet er om lag 0,2 % av verdens aksjemarked. Hvilket utsagn er i tråd med forelesningen?</p>",
    riktig="Går det dårlig for AS Norge, rammes både jobben og porteføljen hennes. Hun bør spre mer globalt",
    gale=["Norske aksjer har historisk svingt mindre enn verdensmarkedet, så Norge-andelen demper risikoen",
          "Teorien sier at hun bør holde norske aksjer langt over markedsvekten, fordi hun kjenner dem best",
          "Siden Norge bare er 0,2 % av verden, betyr Norge-andelen lite for den samlede risikoen hennes"],
    solution=begrep(
        "Spre investeringene for å redusere risiko: fond framfor enkeltaksjer og ikke for mye Norge. Går det dårlig for AS Norge, går det også dårlig i arbeidsmarkedet, så norske aksjer dobler eksponeringen.",
        "Jobb og portefølje i samme marked.",
        [("Svingt mindre", "snudd. Norge har hatt det høyeste standardavviket i figuren (om lag 25 %). Verdensmarkedet har det laveste (lb 37)."),
         ("Over markedsvekten", "teorien sier at hvert land holdes etter markedsverdien. Bøkene og investorene ligger langt under markedsvekten for utlandet (Choi s. 18)."),
         ("Betyr lite", "det er hennes andel (80 %) som teller, ikke Norges andel av verden. Markedsvekt ville gitt 0,2 %.")],
        kilde="Psykologi lb 33–37. Choi s. 18"),
    dekker=["psyk-homebias-01", "psyk-homebias-02", "psyk-homebias-03", "psyk-choi-07"])
S.oppgave("Silje og norske aksjer", "Finansiell psykologi", [14, 18], "", [a8])

# ================= Oppgave 9: Choi, tidshorisont og grunnbegreper =================
a9 = S.ledd("a", "<p>Hvilken påstand er riktig?</p>",
    riktig="Bøkene sier at aksjer blir mindre risikable med lang horisont. I grunnmodellen betyr horisonten ingenting",
    gale=["Bøkene bygger risikorådene på kovariansen mellom avkastning og grensenytte, slik økonomene gjør",
          "Økonomene mener høyt utbytte er attraktivt, fordi utbyttet kommer i tillegg til kursgevinsten",
          "Choi konkluderer med at bøkenes råd er verdiløse, siden de er altfor vanskelige å regne ut for folk flest"],
    solution=begrep(
        "Bøkene: aksjer blir tryggere med lang horisont, så penger som trengs snart skal ikke stå i aksjer. Økonomene: med CRRA-nytte og uavhengige avkastninger er horisonten uten betydning (Samuelson og Merton 1969). Begge gir lavere aksjeandel med alder, men økonomene begrunner det med humankapital.",
        "Horisont: bøkene sier mindre risiko, grunnmodellen sier ingen betydning.",
        [("Kovarians", "snudd. Ingen bøker nevner kovarians mellom avkastning og grensenytte. Bare fem nevner avtakende grensenytte."),
         ("Høyt utbytte", "snudd. Det er bøkene som mener det. Etter Modigliani og Miller er utbytte irrelevant uten skatt. Investoren kan selge aksjer for å få kontanter."),
         ("Verdiløse råd", "Choi peker på to styrker: rådene kan regnes ut av vanlige folk og tar hensyn til begrenset viljestyrke.")],
        kilde="Choi s. 2–3, 10–17 og 24. Aksjesparing s. 20. Psykologi lb 40 (bare i versjon (2))"),
    dekker=["psyk-choi-01", "psyk-choi-09", "psyk-choi-08", "psyk-choi-02"])

a10 = S.ledd("b", "<p>Hvilken oppsummering av rådene hos bøkene og økonomene i Choi er riktig?</p>",
    riktig="Sparing. Bøkene: spar en fast andel hvert år. Økonomene: glatt forbruket, lite som ung og mye midt i livet",
    gale=["Fond. Bøkene: velg aktive fond som slår markedet. Økonomene: velg billige indeksfond. Her er de helt uenige",
          "Boliglån. Bøkene: velg flytende rente. Økonomene: velg fast rente, siden terminbeløpet da ligger fast",
          "Ekstra nedbetaling. Bøkene: aldri raskere enn avtalt. Økonomene: en enkel optimal regel finnes"],
    solution=begrep(
        "Bøkene råder til å spare 10 til 15 % av inntekten uansett alder. Økonomene sier at forbruket skal glattes over livet, så sparingen er lav eller negativ som ung og høy midt i livet.",
        "Sparing: fast andel mot forbruksglatting.",
        [("Fond", "her er de enige: 24 bøker anbefaler indeksfond og bare 7 aktiv forvaltning."),
         ("Boliglån", "snudd. Bøkene anbefaler fast rente. Økonomene (Campbell og Cocco) anbefaler flytende med mindre rentene er lave."),
         ("Ekstra nedbetaling", "elleve bøker anbefaler å betale ned raskere enn avtalt. Litteraturen gir lite veiledning.")],
        kilde="Choi s. 4–9, 19 og 22–24, tabell 1 s. 29"),
    dekker=["psyk-choi-03", "psyk-choi-04", "psyk-choi-06", "psyk-choi-11"])
S.oppgave("Choi: bøkene mot økonomene", "Finansiell psykologi", [14, 18], "<p>Choi sammenligner rådene i de mest populære bøkene om personlig økonomi med normative økonomiske modeller.</p>", [a9, a10])

# ================= Oppgave 10: kunnskap og rådgivning =================
a11 = S.ledd("", "<p>Hvilken påstand om finansiell kunnskap og rådgivning er i tråd med forelesningen?</p>",
    riktig="Spør du banken om sparepengene bør betale ned boliglånet eller gå til et aktivt fond, tjener banken bare på fondet",
    gale=["Aktive fond koster omtrent det samme som indeksfond, så valget mellom dem betyr svært lite for avkastningen over tid",
          "Én enkelt aksje gir som regel en sikrere avkastning enn et aksjefond som eier mange ulike aksjer på børsen",
          "Det er lettere å gjøre folk generelt dyktige i finans enn å gi dem konkrete råd i konkrete situasjoner"],
    solution=begrep(
        "Nedbetaling gir banken ingen produkter å tjene på, et aktivt fond gir den to. Det kan forklare at bankene snakker lite om nedbetaling som god sparing. Banken er ikke en nøytral rådgiver.",
        "Banken tjener bare på fondet.",
        [("Samme kostnad", "aktive fond koster om lag fem ganger så mye som indeksfond. DN anslår at norske kunder har betalt 34 milliarder kroner for mye."),
         ("Én aksje sikrere", "usant. Det er det tredje av Big 3-spørsmålene. Et fond sprer risikoen."),
         ("Generelt dyktige", "snudd. Litteraturen er blandet, men det er enklere å gi konkrete råd i konkrete situasjoner.")],
        kilde="Psykologi lb 42–47, 50 og 52"),
    dekker=["psyk-laering-01", "psyk-laering-04", "psyk-laering-05", "psyk-laering-07"])
S.oppgave("Banken som rådgiver", "Finansiell psykologi", [18], "", [a11])

# ================= Oppgave 11: to informasjonseksperimenter =================
a12 = S.ledd("", "<p>Forelesningen beskriver to eksperimenter. I det ene fikk en tilfeldig halvpart av om lag 590 norske fondskunder vite at indeksfond har gjort det bedre enn aktive fond. "
                 "I det andre fikk investorer vite at en Norge-tung portefølje gir høyere risiko og lavere diversifisering. Hvilket utsagn er riktig?</p>",
    riktig="Indeksandelen økte varig, mens home bias-gruppen forsto budskapet uten å endre porteføljen",
    gale=["Begge gruppene endret porteføljen, fordi informasjon virker like godt på enkle og krevende valg",
          "Indeksandelen økte bare en kort tid. Effekten var borte da porteføljene ble målt to år senere",
          "At investorene ble i Norge, viser at home bias er en ren bias som mer informasjon vil rette opp"],
    solution=begrep(
        "Fondskundene økte indeksandelen med om lag 4 prosentpoeng (fra 11 til 15 %). Effekten var like stor to år senere. Å bytte til billige fond er lett å forstå og gjennomføre. I home bias-eksperimentet forsto folk budskapet, men endret ikke porteføljene. Informasjon alene endrer sjelden krevende valg.",
        "Fondseksperimentet virket, home bias-eksperimentet ikke.",
        [("Begge endret", "snudd. Kort svar fra lb 58: ofte nei. Informasjon virker på enkle valg."),
         ("Kortvarig", "snudd. Effekten var om lag like stor to år senere. Andelen som tror de selv slår markedet falt også."),
         ("Ren bias", "home bias kan være bias (50/50-heuristikk, tilgjengelighet) eller preferanser (tilhørighet, «jeg vil eie det jeg kjenner»). At informasjon ikke virker, peker heller mot preferanser.")],
        kilde="Psykologi lb 53–61"),
    dekker=["psyk-homebias-04", "psyk-homebias-05", "psyk-laering-06", "psyk-laering-03"])
S.oppgave("To informasjonseksperimenter", "Finansiell psykologi", [18], "", [a12])

S.skriv(
    label="Næss: finansiell psykologi",
    note="Bias og støy, de vanlige skjevhetene, prospektteori, bank mot aksjer med ln-nytte, home bias, Choi om bøkene mot økonomene og om man kan lære folk finans.",
    facts=[f"{S.n} flervalg med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Lær navnene på skjevhetene som par: flokk mot tilgjengelighet, anker mot bekreftelse, menyeffekt mot 1/N, tapsaversjon mot risikoaversjon. I regneleddene: forventet nytte avgjør. Tapsfaktoren treffer bare utfallet under referansepunktet.")
