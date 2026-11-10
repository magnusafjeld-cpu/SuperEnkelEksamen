import json, re, sys
B = "<br>"
def back(rule, steps, felle=None, kilde=""):
    s = "<b>" + rule + "</b>"
    for x in steps:
        s += B + x
    if felle:
        s += B + "Felle: " + felle
    s += B + "(" + kilde + ")"
    return s

C = []  # (code, deck, ch, front, back)
def add(code, ch, front, rule, steps, felle, kilde):
    C.append((code, ch, front, back(rule, steps, felle, kilde)))

D = {"skj":"skjerming og gevinst","eff":"effektiv skatt","for":"formuesskatt","ins":"skatteinsidens",
     "bed":"bedriften","teo":"skatteteori","int":"internasjonal skatt"}

# ---------------- SKJERMING OG GEVINST ----------------
add("skj",5,"Skjermingsfradraget i år 1: hva er det? (Aksjen kjøpt for kr 10 000, skjermingsrente 2 %)",
 "Fradrag = kostpris × skjermingsrente = 200",
 ["1. Grunnlaget i år 1 er kostprisen. Ingenting er framført ennå.","2. 10 000 × 2 % = 200."],
 "100 (halv rente) og 300 (skattepliktig utbytte, svaret på neste ledd). Markedsverdi brukes aldri.","H2024 1a, manual 5.3")
add("skj",5,"Skattepliktig utbytte når utbyttet er større enn skjermingen. (Kostpris 10 000, rente 2 %, utbytte 500)",
 "Skattepliktig = utbytte − skjerming = 300",
 ["1. Skjerming 10 000 × 2 % = 200.","2. 500 − 200 = 300. Ingenting framføres.","3. Spør de om skatten: 300 × 37,84 % = 113,52."],
 "200 (fradraget) og 400. Sjekk om spørsmålet gjelder grunnlaget eller skatten.","H2024 1b, manual 5.3")
add("skj",5,"Utbyttet er lavere enn skjermingen. Hva er skattepliktig utbytte og hva skjer med resten? (Skjerming 200, utbytte 100)",
 "Skattepliktig = 0. Ubenyttet 100 framføres",
 ["1. 100 − 200 = −100, men skattepliktig utbytte blir aldri negativt.","2. Resten framføres som ubenyttet skjerming på samme aksje."],
 "100 eller −100. Ubrukt skjerming gir aldri tap eller fradrag i annen inntekt.","H2024 1c, manual 5.3")
add("skj",5,"Skattepliktig utbytte i år 3 med ubenyttet skjerming fra år 2. (Kostpris 10 000, rente 2 %, framført 100, utbytte 400)",
 "Skattepliktig = 98",
 ["1. Grunnlag: 10 000 + 100 = 10 100.","2. Årets fradrag: 10 100 × 2 % = 202.","3. Samlet: 202 + 100 = 302. 400 − 302 = 98."],
 "198 (framført bare lagt til grunnlaget), 200 (framføring glemt). 202, 302 og 100 er mellomtall.","H2024 1d, manual 5.3")
add("skj",5,"Ingen utbytte i år 1, utbytte i år 2 med ny rente. Skattepliktig utbytte i år 2? (Kostpris 100, rente 3,5 % og 4 %, utbytte 20)",
 "Skattepliktig = 12,36",
 ["1. År 1: 100 × 3,5 % = 3,50 framføres.","2. År 2: grunnlag 103,50 × 4 % = 4,14.","3. 20 − 3,50 − 4,14 = 12,36.","Kontroll: 100 × 1,035 × 1,04 − 100 = 7,64."],
 "12,50 (årets fradrag regnet av kostprisen), 16,50 og 15,86 (bare ett av fradragene).","H2025 4, manual 5.3")
add("skj",5,"Utbyttet i år 1 er nøyaktig lik skjermingen. Skattepliktig utbytte i år 2? (Kostpris 100, rente 4 % og 2 %, utbytte 4 begge år, kurs 120)",
 "Skattepliktig = 2",
 ["1. År 1: skjerming 4, utbytte 4. Skattepliktig 0 og ingenting framføres.","2. År 2: 100 × 2 % = 2. 4 − 2 = 2."],
 "Kursen 120 er støy (grunnlaget er kostpris). 0 krever framført skjerming som ikke finnes. 4 glemmer årets skjerming.","Kursgodkjenning 2026 1, manual 5.3")
add("skj",5,"Akkumulert ubenyttet skjerming etter tre år. (Kostpris 2 000; rente 3 %, 4 %, 5 %; utbytte 100, 40, 50)",
 "Ubenyttet etter år 3 = 92",
 ["1. År 1: skjerming 60, utbytte 100. Skattepliktig 40, ingenting framført.","2. År 2: skjerming 80 mot utbytte 40. Framført 40.","3. År 3: (2 000 + 40) × 5 % = 102, pluss 40 = 142. Utbytte 50. Framført 92."],
 "52 (bare årets rest, de framførte 40 glemt), 93 og 40.","H2023 1b, manual 5.3")
add("skj",5,"Gevinst ved salg med ubenyttet skjerming og oppjustering. (Kjøpt 100, solgt 160, ubenyttet skjerming 10, sats 22 %, faktor 1,72)",
 "Skatt = (160 − 100 − 10) × 1,72 × 22 % = 18,92",
 ["1. Gevinst: 160 − 100 − 10 = 50.","2. 50 × 1,72 × 22 % = 18,92 (= 50 × 37,84 %)."],
 "11 (oppjustering glemt, alltid 58 % av riktig svar), 22,70 (skjermingen glemt), 17,60 (gammel faktor 1,6).","H2025 10, manual 5.4")
add("skj",5,"Liten gevinst der ubenyttet skjerming halverer grunnlaget. (Kjøpt 50, solgt 60, ubenyttet 5, 22 % og faktor 1,72)",
 "Skatt = 5 × 37,84 % = 1,89",
 ["1. Gevinst: 60 − 50 − 5 = 5.","2. 5 × 1,72 × 22 % = 1,89."],
 "3,78 (skjermingen glemt, gevinst 10). 3,89 ligger rett ved og svarer ikke til noen ren regnevei. 0 hvis du tror skjermingen dekker alt.","H2024 2, manual 5.4")
add("skj",5,"Aksjen selges i år 3 før årsskiftet. Gis det skjerming for salgsåret? (Kostpris 500 000, framført 50 000, solgt for 550 000)",
 "Nei. Bare framført skjerming brukes: skatt = 0",
 ["1. Skjermingen går til den som eier aksjen 31.12. Selges den før, faller årets fradrag bort.","2. Gevinst: 550 000 − 500 000 − 50 000 = 0."],
 "Å trekke fra et skjermingsfradrag for salgsåret også. Det gir et negativt tall.","H2022 1f, manual 5.4")
add("skj",5,"Salg med tap når aksjen har ubenyttet skjerming. Hvor mye lavere blir skatten? (Kjøpt 900, solgt 790, ubenyttet 50, 22 % og faktor 1,72)",
 "Skatten faller med 110 × 37,84 % = 41,62",
 ["1. Tap: 790 − 900 = −110.","2. Skjermingen kan ikke skape eller øke et tap. Den går tapt.","3. 110 × 1,72 × 22 % = 41,62."],
 "60,54 (skjermingen lagt til tapet), 24,20 (oppjustering glemt).","Prøveeksamen 16 2, manual 5.3")
add("skj",5,"Delsalg: skatt når bare en del av aksjeposten selges. (200 aksjer, kostpris 150, skjerming 6 per aksje, 120 aksjer selges til 210)",
 "Skatt = 120 × (210 − 150 − 6) × 37,84 % = 2 452,03",
 ["1. Skjermingen følger hver aksje. Bare de solgte aksjenes skjerming brukes.","2. Gevinst per aksje 54, totalt 6 480.","3. 6 480 × 1,72 × 22 % = 2 452,03."],
 "4 086,72 (alle 200 regnet som solgt), 2 724,48 (skjermingen glemt), 1 425,60 (oppjustering glemt).","Prøveeksamen 17 2, manual 5.3")
add("skj",5,"Skjerming på to aksjer, den ene utenlandsk. Samlet eierskatt? (Kostpris 100 og 200, rente 3 %, utbytte 5 og 10, eierskatt 40 %)",
 "Eierskatt = (2 + 4) × 40 % = 2,4",
 ["1. Skjermingen regnes per aksje. Den gjelder også utenlandske aksjer en personlig aksjonær i Norge eier.","2. Norsk: 5 − 3 = 2. Utenlandsk: 10 − 6 = 4.","3. 6 × 40 % = 2,4."],
 "4,80 (skjerming bare på den norske aksjen) og 0,8. Skjerming kan ikke flyttes mellom aksjer.","H2023 5, manual 5.3")
add("skj",5,"Hvem får skjermingsfradraget?",
 "Personlig aksjonær som eier aksjen 31.12 i inntektsåret",
 ["1. Skjermingen tilordnes eieren ved årsskiftet. Utbytte tilordnes den som eier aksjen når utbyttet vedtas.","2. Selskapsaksjonærer har fritaksmetoden, ikke skjerming."],
 "«Alle som eier aksjer», «selskapsaksjonærer», «utenlandske investorer».","Kursgodkjenning 2026 10, manual 5.4")
add("skj",5,"Aksjen kjøpes 28. desember og eies ved årsskiftet. Hvor stor skjerming får eieren for året? (Kostpris 100 000, rente 3,6 %)",
 "Hele årets skjerming: 3 600",
 ["1. Eieren 31.12 får fradraget for hele året.","2. 100 000 × 3,6 % = 3 600. Det fordeles ikke etter eiertid."],
 "«Ingen, eid i fire dager», «om lag 39 kr», «ingen fordi det ikke kom utbytte» (ubenyttet skjerming framføres).","Prøveeksamen 4 8b, skatteloven § 10-12")
add("skj",5,"Hvor mye utbytte kan eieren ta ut uten å betale eierskatt? (Kostpris 500 000, skjermingsrente 5 %)",
 "Utbytte opp til skjermingen: 25 000",
 ["1. 500 000 × 5 % = 25 000.","2. Utbytte innenfor skjermingen er skattefritt. Grunnlaget er kostprisen, ikke overskuddet."],
 "20 000 eller 30 000 (feil rente eller feil grunnlag) og 7 500.","H2022 1b, manual 5.2")
add("skj",5,"Hvordan fastsettes skjermingsrenten?",
 "rs = (3-mnd statskasseveksel + 0,5 pp) × (1 − 22 %)",
 ["1. Skattedirektoratet fastsetter den i januar året etter inntektsåret.","2. Den er en rente etter skatt. 2023: 3,2 %, 2024: 3,9 %, 2025: 3,6 %.","3. Formål: normalavkastningen skal være skattefri, så eierskatten treffer bare meravkastningen."],
 "Å bruke en rente fra hukommelsen. Bruk oppgavens rente for hvert år.","Manual 5.2, k20")
add("skj",5,"Skatt på utbytte: oppjustere grunnlaget eller satsen? (Skattepliktig grunnlag 300, sats 22 %, faktor 1,72)",
 "Skatt = grunnlag × 1,72 × 22 % = grunnlag × 37,84 %",
 ["1. 300 × 1,72 × 22 % = 113,52.","2. Samme tall: 300 × 37,84 % = 113,52. Regn begge veier som kontroll."],
 "Å oppjustere to ganger eller ikke i det hele tatt. Glemt oppjustering gir alltid 58 % av riktig svar (22/37,84).","Manual 5.1, k20")
add("skj",6,"Aksjonærmodellen og fritaksmetoden: hvem gjelder hva for?",
 "Personlig eier: aksjonærmodellen. Aksjeselskap som eier: fritaksmetoden",
 ["1. Aksjonærmodellen: utbytte og gevinst over skjermingen skattlegges med 37,84 %. Tap gir fradrag.","2. Fritaksmetoden: AS betaler i hovedsak ikke skatt på utbytte og gevinst fra aksjer i EØS. Tap gir ikke fradrag."],
 "«Personlig skattyter slipper gevinstskatt», «gevinst skattlegges bare på selskapets hånd». Fritaksmetoden er ikke en fordel i alle tilfeller (tapet).","Kursgodkjenning 2026 6, manual 6.1")
add("skj",6,"Hva er begrunnelsen for fritaksmetoden?",
 "Å hindre kjedebeskatning",
 ["1. Uten fritak skattlegges samme overskudd på nytt i hvert selskap i kjeden.","2. Med fritak: én gang i selskapssektoren (22 %) og én gang hos personen (37,84 %). Samlet 51,52 % uansett antall ledd."],
 "«Billigere å eie gjennom selskap» og «skjerme normalavkastningen» (det er skjermingen).","Prøveeksamen 4 8a, manual 6.1")
add("skj",6,"Treprosentregelen: hvor mye skatt betaler et holdingselskap på mottatt utbytte? (Eier under 90 %, utbytte 100)",
 "3 % × 22 % = 0,66 % av utbyttet: 0,66",
 ["1. 3 % av utbyttet inntektsføres: 3. Skatt 3 × 22 % = 0,66.","2. Gjelder bare utbytte, ikke gevinst.","3. Over 90 % eierskap og stemmer: helt skattefritt."],
 "3 % lest som skattesats, eller 0,66 % også på gevinst.","Manual 6.2")
add("skj",6,"Sparer et holdingselskap skatt for en eier som til slutt tar ut pengene? (Overskudd 1 000 000, selskapsskatt 22 %, eierskatt 37,84 %)",
 "Nei. Det utsetter skatten: samlet 51,52 % uansett",
 ["1. Selskapsskatt 220 000. Utbytte 780 000.","2. Eierskatt 780 000 × 37,84 % = 295 152. Samlet 51,52 %.","3. Under 90 % eierskap: treprosentregelen gir 51,84 %.","Fordelen er utsettelsen: et rentefritt lån fra staten (lock-in)."],
 "22 % («fritaket er endelig») og 62,18 % (holdingselskapet skattlagt ordinært).","Manual 6.3 og 6.4")
add("skj",6,"Du gir aksjer med stor latent gevinst til barna dine. Forsvinner gevinstskatten?",
 "Nei. Kontinuitet: mottakeren overtar giverens inngangsverdi",
 ["1. Arveavgiften er borte (2014), men skatten kommer når mottakeren selger.","2. Unntak: bolig giveren kunne solgt skattefritt får ny inngangsverdi.","3. Bor mottakeren i utlandet, utløses exit-skatt."],
 "«Gave fjerner skatten».","Manual 6.6, skatteloven § 9-7")

# ---------------- EFFEKTIV SKATT ----------------
add("eff",1,"Effektiv skattesats for et selskap med avskrivning. (Driftsinntekt 100 000, avskrivning 25 000, sats 22 %)",
 "Effektiv sats = betalt skatt / brutto inntekt = 16,5 %",
 ["1. Grunnlag 100 000 − 25 000 = 75 000. Skatt 16 500.","2. 16 500/100 000 = 16,5 %.","Kontroll: 22 % × (1 − 0,25) = 16,5 %."],
 "22 % (delt på skattepliktig overskudd) og 11 % (hele maskinen trukket fra i år 1).","H2025 5, manual 1.5")
add("eff",1,"AERT: hvorfor ligger effektiv skattesats under 22 %? (Inntekt 300 000, printer 100 000 utgiftsført straks eller saldo 30 %)",
 "Fradrag som ikke er utbetalinger senker satsen",
 ["1. Straks: skatt 44 000. AERT 44 000/300 000 = 14,67 % (lysbildet avkorter til 14,6 %; begge er riktige).","2. Saldo 30 %: fradrag 30 000, skatt 59 400. AERT 19,8 %.","3. AERT = betalt skatt / brutto inntekt. Nominell sats er den vedtatte 22 %."],
 "Å dele på skattepliktig overskudd gir alltid 22 %.","F5 lb 17, manual 1.5")
add("eff",1,"Samlet skatt på et selskapsoverskudd som deles ut, uten skjerming. (Overskudd 1 000 000, selskapsskatt 22 %, eierskatt 37,84 %)",
 "22 % + 78 % × 37,84 % = 51,52 %",
 ["1. Selskapsskatt 220 000. Utbytte 780 000.","2. Eierskatt 780 000 × 37,84 % = 295 152.","3. 515 152/1 000 000 = 51,52 %. Lønn: 47,4 %."],
 "59,84 % (satsene lagt sammen), 37,84 % (eierskatten alene), 29,52 % (selskapsskatten utelatt).","Manual 1.5, k20")
add("eff",5,"Eierskatt når alt overskudd etter selskapsskatt tas ut som utbytte. (Overskudd 100 000, sats 23 %, faktor 1,33, nominell eierskatt 20 %)",
 "Eierskatt = 77 000 × 1,33 × 20 % = 20 482",
 ["1. Selskapsskatt 23 000. Utbytte 77 000.","2. 77 000 × 1,33 × 20 % = 20 482."],
 "Å oppjustere hele overskuddet uten å trekke fra selskapsskatten (26 600), eller glemme oppjusteringen (15 400).","Kursgodkjenning 2026 3, manual 5.1")
add("eff",5,"Eierskatt og effektiv skatt på utbyttet med skjerming. (Overskudd 150 000, 22 %, kostpris 500 000, skjerming 5 %, eierskatt 25 %, faktor 1,6)",
 "Eierskatt 36 800. Effektiv skatt på utbyttet 31,5 %",
 ["1. Selskapsskatt 33 000. Utbytte 117 000.","2. Grunnlag 117 000 − 25 000 = 92 000.","3. 92 000 × 1,6 × 25 % = 36 800.","4. 36 800/117 000 = 31,5 %."],
 "23 000 (oppjustering glemt). Nevneren er utbyttet i dette spørsmålet, ikke overskuddet.","H2022 1c og 1d, manual 5.6")
add("eff",5,"Samlet effektiv skattesats for selskap og eier. (Selskapsskatt 33 000, eierskatt 36 800, overskudd før skatt 150 000)",
 "(33 000 + 36 800)/150 000 = 46,5 %",
 ["1. Begge skattene i telleren.","2. Bruttooverskuddet i nevneren.","Skjermingen trekker satsen under 51,52 %."],
 "31,5 % er svaret på nabospørsmålet (eierskatt delt på utbytte). De står som alternativ i hverandres spørsmål.","H2022 1e, manual 5.6")
add("eff",9,"Samlet effektiv sats når skjermingen tar en del av utbyttet. (Kostpris 1 000 000, rente 3,6 %, overskudd 100 000, 22 % og 37,84 %)",
 "22 % + (utbytte − skjerming)/overskudd × 37,84 % = 37,89 %",
 ["1. Selskapsskatt 22 000. Utbytte 78 000.","2. Skjerming 36 000. Grunnlag 42 000.","3. Eierskatt 15 892,80. Samlet 37 892,80/100 000.","Systemet ligger mellom 22 % (alt skjermet) og 51,52 % (ingen skjerming)."],
 "51,52 % (skjermingen glemt).","Manual 9.3")
add("eff",5,"Inntektsskiftingslikningen: finn oppjusteringsfaktoren. (Toppskatt lønn 47,4 %, arbeidsgiveravgift 12,4 %, selskapsskatt 22 %, sats 22 %)",
 "tw + a = tA + y·t gir y = 1,72",
 ["1. 47,4 + 12,4 = 59,8.","2. 59,8 = 22 + 22y, altså y = 37,8/22 = 1,72.","3. Eierskatt 1,72 × 22 % = 37,84 %.","Nominelle satser lagt sammen. Forutsetter at arbeidstakeren bærer hele avgiften."],
 "Den eldre formen t + (1 − t)·t·y (H2020) gir et annet tall.","F5, manual 5.1")
add("eff",5,"Ny selskapsskatt: hva blir oppjusteringsfaktoren og eierskatten? (Lønn 47 %, avgift 13 %, selskapsskatt 20 %, eierskatt 20 %)",
 "y = 2. Effektiv nominell eierskatt 40 %",
 ["1. 47 + 13 = 60.","2. 60 = 20 + 20y, altså y = 2.","3. 2 × 20 % = 40 %."],
 "1,6 og 32 % (den eldre effektive formen), 2,1 og 1,8.","Kursgodkjenning 2026 2, manual 5.1")
add("eff",5,"Hvem bærer arbeidsgiveravgiften? Hva gjør det med oppjusteringsfaktoren? (Lønn 47,4 %, avgift 12,4 %, selskapsskatt 22 %)",
 "Mindre overvelting på arbeidstakeren gir lavere faktor",
 ["1. Arbeidstakeren alt: 47,4 + 12,4 = 22 + 22y gir 1,72.","2. Delt 50/50: 47,4 + 6,2 = 22 + 6,2 + 22y gir 1,15.","3. Bedriften alt: 47,4 = 22 + 12,4 + 22y gir 0,59.","Bedriftens del legges til selskapsskatten. Empirien: 15 til 30 % veltes over."],
 "Å la hele avgiften stå på lønnssiden uansett.","F5, manual 5.1")
add("eff",5,"Faktoren som gir en bestemt effektiv eierskatt. Hva blir samlet sats? (Selskapsskatt og nominell eierskatt 20 %, ønsket effektiv eierskatt 30 %, overskudd 200 000)",
 "y = 1,5. Samlet sats 44 %",
 ["1. 20 % × y = 30 %, altså y = 1,5.","2. Utbytte 160 000. Oppjustert grunnlag 240 000.","3. Samlet: 20 % + 80 % × 30 % = 44 %."],
 "50 % (satsene lagt sammen) og 51,5 % (dagens tall fra hukommelsen).","H2023 2, manual 5.1")
add("eff",5,"Hvor stort overskudd før skatt trengs for at eieren skal sitte igjen med et bestemt beløp? (Ønsker 300 000, selskapsskatt 20 %, eierskatt 40 %)",
 "Overskudd = beløp / [(1 − tA)(1 − te)] = 625 000",
 ["1. Av én krone overskudd blir 0,80 × 0,60 = 0,48 igjen.","2. 300 000/0,48 = 625 000."],
 "500 000 (bare eierskatten), 750 000 (satsene lagt sammen til 60 %), 480 000 (skattene lagt oppå).","Prøveeksamen 17 3, manual 5.1")
add("eff",5,"Hvorfor finnes oppjusteringsfaktoren? Hva ville samlet skatt på utdelt overskudd vært uten den?",
 "For å hindre inntektsskifting fra lønn til utbytte",
 ["1. Uten faktor: 22 % + 78 % × 22 % = 39,16 %, mot 47,4 % på lønn.","2. Eiere som jobber i eget selskap ville tatt lønnen som utbytte.","3. Med faktor: 51,52 % effektivt, 4,12 pp over lønn."],
 "Å tro at faktoren gir lik effektiv skatt. Kurset legger nominelle satser sammen (59,8 = 59,8).","Manual 5.1, F5")
add("eff",2,"Ta hele fradraget nå eller fordele det over ti år? (Fradrag 100 000, sats 22 %, rente 10 %)",
 "Ta alt nå: 22 000 mot 13 518",
 ["1. Nå: 100 000 × 22 % = 22 000.","2. Fordelt: 2 200 × annuitetsfaktor 6,1446 = 13 518.","3. Udiskontert er begge 22 000. Bare tidsverdien skiller.","Forbehold: du må ha inntekt å føre fradraget mot."],
 "«Det spiller ingen rolle» (riktig bare ved rente 0). Faktoren 1,72 i teksten er støy.","H2024 3, H2020 1a, manual 2.4")
add("eff",2,"Realavkastning etter skatt på en aksje. (Kjøpt 100, solgt 110, utbytte 5, eierskatt 37,84 %, inflasjon 3 %)",
 "Nominelt, så etter skatt, så realt: 6,14 %",
 ["1. Nominell: 15/100 = 15 %.","2. Etter skatt: 15 % × 0,6216 = 9,324 %.","3. Realt: 1,09324/1,03 − 1 = 6,14 %."],
 "7,24 % (skatt lagt på realavkastningen), 13,64 % (delt på salgskursen), approksimasjonen når desimaler kreves.","F2, manual 2.1 og 2.2")
add("eff",2,"Effektiv skatt på realavkastningen. (Nominell rente 4 %, inflasjon 3 %, skatt 22 %)",
 "treal = t × i/(i − π) = 88 %",
 ["1. 22 % × 4/(4 − 3) = 88 %.","2. Skatten tas av nominell avkastning, også av inflasjonskompensasjonen.","Inflasjon øker den reelle skatten uten at satsen endres."],
 "Å svare 22 %.","Manual 2.2, k20")
add("eff",2,"Nominell og realavkastning på en utleieeiendom. (Kjøpt 5 mill., netto leie etter skatt 150 000, dokumentavgift 125 000, solgt 6 mill., inflasjon 10 %, forenklet formel)",
 "Nominell 20,5 %. Real ≈ 10,5 %",
 ["1. (6 000 000 − 5 000 000 + 150 000 − 125 000)/5 000 000 = 20,5 %.","2. Forenklet: 20,5 − 10 = 10,5 %."],
 "Leien eller dokumentavgiften glemt, eller delt på salgsprisen. Nevneren er alltid inngangsverdien.","H2023 6, manual 2.1")
add("eff",4,"Renteinntekt mot aksjegevinst: hvor stor aksjegevinst gir samme beløp etter skatt som 100 000 i renter? (22 % og 37,84 %)",
 "100 000 × 0,78/0,6216 = 125 483",
 ["1. Renter: igjen 78 000.","2. Aksjegevinst må gi 78 000/0,6216.","3. Forholdet 1,2548: aksjer må gi 25,5 % mer før skatt."],
 "Å sammenligne avkastningene før skatt.","F1, manual 4.5")

# ---------------- FORMUESSKATT ----------------
add("for",7,"Formuesskatt for en enslig med høy nettoformue. (Nettoformue 30 mill., bunnfradrag 1,9 mill., 1,0 % opp til 21,5 mill., 1,1 % over)",
 "1 % × (21,5 − 1,9) mill. + 1,1 % × (30 − 21,5) mill. = 289 500",
 ["1. Trinn 1: 196 000.","2. Trinn 2: 93 500.","Kontroll: 1 % × 28,1 mill. + 0,1 % × 8,5 mill. = 289 500."],
 "1,1 % på alt eller bunnfradraget glemt. Grunnlaget er formuesverdi, aldri markedsverdi.","Manual 7.1, k20")
add("for",7,"Formuesskatt for et ektepar med samlet nettoformue 30 mill. (Bunnfradrag 3,8 mill., innslagspunkt 43 mill.)",
 "1 % × (30 − 3,8) mill. = 262 000",
 ["1. Begge grensene dobles for ektefeller.","2. 30 mill. er under 43 mill., så bare 1 %."],
 "270 500 (doblet bunnfradrag, men innslagspunktet ikke doblet).","Manual 7.1")
add("for",7,"Verdsettingsrabattene: hva teller hvert aktivum med i formuesskatten (2026)?",
 "Aksjer og aksjefond 80 %. Primærbolig 25 % opp til 14 mill., 70 % over. Sekundærbolig og bank 100 %",
 ["1. Unoterte aksjer: 80 % av selskapets skattemessige verdi (bokført).","2. Næringseiendom 80 %. Fritidsbolig maks 30 %.","3. Primærboligterskelen var 10 mill. i H2024 og H2025."],
 "Å bruke dagens rabatt der oppgaven oppgir en annen (aksjer 45 % rabatt i 2021).","Manual 7.2, k20")
add("for",7,"Formuesverdi av en dyr primærbolig. (Markedsverdi 18 mill., 25 % opp til terskelen 14 mill., 70 % over)",
 "0,25 × 14 mill. + 0,70 × 4 mill. = 6 300 000",
 ["1. Del boligen i to sjikt.","2. 3 500 000 + 2 800 000.","3. Med terskel 10 mill. (H2024 og H2025): 8 100 000."],
 "4 500 000 (25 % på alt) og 12 600 000 (70 % på alt).","Manual 7.3")
add("for",7,"Formuesverdi av et kombinasjonsfond. (Andelsverdi 1 000 000, 70 % aksjer)",
 "700 000 × 80 % + 300 000 × 100 % = 860 000 (86 %)",
 ["1. Bare aksjedelen får rabatt.","2. Bare aksjedelens rabatt (140 000) teller i gjeldsreduksjonen."],
 "800 000 (80 % på hele fondet).","Manual 7.2")
add("for",7,"Formuesskatt på en unotert aksjepost. (45 % av et selskap priset til 100 mill. i emisjon, bokførte eiendeler 10 mill., ingen gjeld, bunnfradrag 1,9 mill., 1 %)",
 "(45 % × 10 mill. × 0,8 − 1,9 mill.) × 1 % = 17 000",
 ["1. Unotert: bokført egenkapital, ikke markedsverdi: 4,5 mill.","2. Aksjerabatt: 3,6 mill.","3. Over bunnfradraget: 1,7 mill. × 1 %."],
 "495 000 (45 mill. × 1,1 %), 26 000 (rabatten glemt), 36 000 (bunnfradraget glemt).","F1, manual 7.5")
add("for",7,"Hvor mye reduseres gjelden? (Gjeld 1,8 mill.; primærbolig 4,8 mill. med 75 % rabatt, aksjer 1 mill. med 20 %, bank 0,2 mill.)",
 "Reduksjon = 60 000",
 ["1. Fordel gjelden etter bruttoverdi: 80 %, 16⅔ % og 3⅓ %.","2. Gjeld på aksjene: 300 000.","3. Bare den avkortes: 300 000 × 20 % = 60 000. Boliggjelden avkortes ikke."],
 "145 000, 150 000 og 165 000 ligger over taket 20 % × 300 000.","H2024 6a, manual 7.4")
add("for",7,"Skattepliktig nettoformue med gjeldsfordeling. (Gjeld 1,8 mill.; primærbolig 4,8 mill. med 75 %, aksjer 1 mill. med 20 %, bank 0,2 mill.)",
 "Nettoformue = 2 200 000 − 1 740 000 = 460 000",
 ["1. Formuesverdier: 1 200 000 + 800 000 + 200 000.","2. Fradragsberettiget gjeld: 1 440 000 + 240 000 + 60 000.","Kontroll: 1,8 mill. × (1 − 200 000/6 000 000) = 1 740 000."],
 "600 000 (rabatt og avkorting glemt), 400 000 (avkorting glemt), 1 540 000 (boliggjelden avkortet).","H2024 6b, manual 7.4")
add("for",7,"Nettoformue når oppgaven ikke sier om gjelden skal avkortes. (Gjeld 5 mill.; primærbolig 5 mill. med 75 % rabatt, aksjefond 5 mill. med 20 %)",
 "750 000 etter loven (250 000 ble også godtatt)",
 ["1. Gjelden fordeles 50/50: 2,5 mill. hver.","2. Formuesverdier 1 250 000 + 4 000 000.","3. Fondsgjelden avkortes til 2 000 000. Netto 5 250 000 − 4 500 000.","Uten avkorting: 250 000."],
 "−250 000 og −750 000 (fortegnet snudd). Velg lovens svar med avkorting.","H2025 2, manual 7.4")
add("for",7,"Formuesskatt når gjelden er like stor som bruttoformuen. (Aksjefond 10 mill. med 20 %, primærbolig 10 mill. med 75 %, gjeld 10 mill., bunnfradrag 1,5 mill., 1 %)",
 "Skatt = 0",
 ["1. Formuesverdi: 8 + 2,5 = 10,5 mill.","2. Gjeld 5 + 5. Fondsgjelden avkortes til 4. Fradrag 9 mill.","3. Netto 1,5 mill. minus bunnfradrag 1,5 mill. = 0."],
 "15 000 (bunnfradraget glemt) eller boliggjelden avkortet.","H2023 3, manual 7.4")
add("for",7,"Primærboligkolonnen gir negativ netto i formuesskatten. Skal den settes til null?",
 "Nei. Negative kolonner motregnes mot positive",
 ["1. Bolig: 25 % formuesverdi, men full gjeld. Negativt bidrag er tilsiktet.","2. Skatten regnes av summen over alle aktiva.","Eksempel H2024 6: −240 000 + 560 000 + 140 000 = 460 000."],
 "Å «rette» kolonnen til null gir 700 000.","Manual 7.4")
add("for",7,"Hvilke aktiva utløser forholdsmessig gjeldsreduksjon i formuesskatten?",
 "Rabatterte aktiva unntatt bolig: aksjer, aksjefond, næringseiendom, driftsmidler, varelager",
 ["1. Primærbolig og fritidsbolig: gjelden avkortes ikke (§ 4-19).","2. Sekundærbolig og bank: ingen rabatt, ingen reduksjon.","3. Gjelden fordeles etter bruttoverdi, ikke formuesverdi. Unntak: fritidsbolig går inn i fordelingsnøkkelen med formuesverdien."],
 "Å avkorte boliggjelden er den dyreste enkeltfeilen.","Manual 7.4, k20")
add("for",8,"Formuesskatt som avkastningsskatt: hvilken gevinstskatt gir samme proveny? (W = 100, r = 5 %, formuesskatt 1 % på formuen ved periodens begynnelse)",
 "WT = W·r·t gir t = T/r = 20 %",
 ["1. Formuesskatt: 100 × 1 % = 1.","2. Avkastning 5. 5t = 1, altså t = 20 %."],
 "21 % (skatten lagt på formuen ved periodens slutt: 1,05/5) og 22 % (satsen på alminnelig inntekt).","H2025 9, manual 8.1")
add("for",8,"Formuesskatten faller på formuen ved periodens slutt. Hvilken formuesskattesats tilsvarer en avkastningsskatt? (t = 22 %, r = 3 %)",
 "τ = t·r/(1 + r) = 0,64 %",
 ["1. τ·W(1 + r) = t·r·W.","2. 0,22 × 0,03/1,03 = 0,64 %.","Ved begynnelsen: τ = r·t = 0,66 %."],
 "Å bytte tidspunkt. Les setningen om når skatten faller.","H2021 3, manual 8.1")
add("for",8,"Avkastning før og etter formuesskatt. (Kjøpt for 200 mill., kontantstrøm 10 mill., solgt for 200 mill., formuesskatt 1 %)",
 "5 % før, 4 % etter",
 ["1. Uten skatt: 10/200 = 5 %.","2. Formuesskatt 2 mill.: (10 − 2)/200 = 4 %.","3. Generelt: r − τw."],
 "4 % i spørsmålet uten skatt (nabosvaret), 6 % (skatten lagt til), 3 % (trukket fra to ganger).","H2025 3a og 3b, manual 8.2")
add("for",8,"Verdien av en evig kontantstrøm med formuesskatt når alternativet også rammes. (CF 5 mill., r = 5 %, formuesskatt 1 % av markedsverdien)",
 "V = 100 mill. Verdien er uendret",
 ["1. Uten formuesskatt: 5/0,05 = 100.","2. Med: (5 − 0,01V)/V = 4 % gir V = 100.","3. Skatten senker kontantstrømmen og avkastningskravet like mye."],
 "80 mill. (halv justering: (5 − 1)/0,05), 95 mill. («litt lavere»), 50 mill.","H2025 3c og 3d, BS4, manual 8.3")
add("for",8,"Børsnotert mot unotert aksje for en norsk investor med formuesskatt. (Begge gir 3 mill. evig, markedsavkastning 6 %, formuesskatt 1 %, unotert verdsatt til 50 %)",
 "Børsnotert 50 mill. Unotert 55 mill.",
 ["1. Alternativet (børs) gir 6 % − 1 % = 5 %.","2. Børs: (3 − 0,5)/0,05 = 50.","3. Unotert: (3 − 0,25)/0,05 = 55.","Lav verdsetting gjør unotert mer verdt for nordmannen."],
 "50 og 50 (verdsettingsforskjellen glemt).","Prøveeksamen 18 6, manual 8.3")
add("for",8,"Hvor mye trekker formuesskatten fra avkastningen på børsaksjer? (Aksjerabatt 20 %, sats 1 %, avkastning 5 %)",
 "τ × (1 − ρ) = 0,8 prosentpoeng, altså 16 % av avkastningen",
 ["1. Formuesverdi 80 %: 0,8 × 1 %.","2. 0,8/5 = 16 %. Uten rabatt: 20 %."],
 "Å trekke fra hele prosentpoenget på aksjer.","Manual 8.2")
add("for",8,"Formuesskatt i prosent av avkastningen. (Børsaksjer 20 mill. til 80 %, bunnfradrag 1,9 mill., 1 %, avkastning 5 % av markedsverdien)",
 "141 000 / 1 000 000 = 14,10 %",
 ["1. (16 000 000 − 1 900 000) × 1 % = 141 000.","2. Avkastning: 20 mill. × 5 % = 1 mill."],
 "16 % (bunnfradraget glemt) og 20 % (rabatt og bunnfradrag glemt).","Prøveeksamen 14 4c, manual 8.2")
add("for",8,"Hvor stort utbytte trengs for å betale formuesskatten? (Formuesverdi 100 000, formuesskatt 1 %, eierskatt 50 %)",
 "D = F/(1 − te) = 1 000/0,5 = 2 000",
 ["1. Formuesskatt 1 000.","2. D × (1 − 0,5) = 1 000.","Kontroll: 2 000 − 1 000 i eierskatt = 1 000."],
 "1 500 (skatten lagt oppå), 1 600 (dagens 37,84 % i stedet for oppgavens 50 %), 2 500.","H2025 6, manual 8.4")
add("for",8,"Utbytte til formuesskatt med eierskatt under 50 %. (Formuesverdi 100, formuesskatt 1 %, eierskatt 37,8 %, én desimal)",
 "D = 1/0,622 = 1,6",
 ["1. Formuesskatt 1.","2. 1/(1 − 0,378) = 1,6077.","Snarvei: med sats under 50 % kan D aldri bli dobbelt så stort som F. Stryk 2 og 2,1."],
 "1,2 (gir bare 0,75 etter skatt).","H2024 7, manual 8.4")
add("for",8,"Utbytte til formuesskatt når aksjene har skjerming. (Formuesverdi 3 750 000 til 80 %, 1 %, eierskatt 40 %, kostpris 500 000, skjerming 3 %)",
 "D = (F − S × te)/(1 − te) = 40 000",
 ["1. F = 3 750 000 × 0,8 × 1 % = 30 000.","2. Skjerming 15 000 sparer 6 000 i skatt.","3. (30 000 − 6 000)/0,6 = 40 000.","Kontroll: (40 000 − 15 000) × 40 % = 10 000. Igjen 30 000."],
 "50 000 (skjermingen glemt), 52 500 (rabatten glemt), 42 000 (lagt oppå).","Prøveeksamen 6 6, manual 8.4")
add("for",8,"Formuesskatt fra et AS, utbyttet som dekker den og selskapsskatten som kunne erstattet den. (Formuesverdi 300 000 til 80 %, 1 %, eierskatt 20 % × faktor 2, overskudd 10 000, 22 %)",
 "Formuesskatt 2 400. Utbytte 4 000. Ny selskapsskatt 46 %",
 ["1. 300 000 × 0,8 × 1 % = 2 400.","2. te = 40 %: 2 400/0,6 = 4 000.","3. (2 200 + 2 400)/10 000 = 46 %."],
 "3 000 (rabatten glemt), 5 000 (feil formuesskatt dratt videre), 45 %.","H2023 4, manual 8.4")
add("for",5,"Utbytte, skjerming og formuesskatt over to år: hva sitter eieren igjen med? (Kostpris 10 mill., utbytte 500 000 og 600 000, skjerming 2 % og 4 %, eierskatt 40 %, formuesskatt 1 %, rabatt 20 %)",
 "Igjen 740 000",
 ["1. Eierskatt: 300 000 × 40 % + 200 000 × 40 % = 200 000.","2. Formuesskatt: 8 mill. × 1 % = 80 000 per år, 160 000.","3. 1 100 000 − 200 000 − 160 000."],
 "580 000 (skjerming bare i år 1). To skatter med hvert sitt grunnlag.","H2025 1, manual 5.5")
add("for",8,"Hvorfor rammer formuesskatten hardest når avkastningen er lav? (Formuesskatt 1 %, avkastning 2 %)",
 "Ekvivalent avkastningsskatt τ/r = 50 %",
 ["1. Ved 10 %: 10 %. Ved 5 %: 20 %. Ved 2 %: 50 %. Ved 0: uendelig.","2. Den er et fast kronebeløp uansett avkastning.","Adam og Miller: den treffer normalavkastningen hardt og meravkastningen ikke."],
 "«Formuesskatten tilsvarer en avkastningsskatt med fast sats».","Manual 8.1 og 8.5")
add("for",8,"Effektiv skatt (AERT) for de rikeste: børsnotert mot unotert eier. (Selskap verdt 100/0,1222 = 818, formuesskatt 1,1 %, faktisk selskapsskatt 13,1 %)",
 "Børsnotert 24,7 %. Unotert 18,1 %. Topp 1 % vektet 20,3 %",
 ["1. Børs: 818 × 0,8 × 1,1 % = 7,20. Utbytteskatt 4,38. Sum med 13,10: 24,7.","2. Unotert (35 % av markedsverdien): 3,10 + 1,90 + 13,10 = 18,1.","3. Topp 1 %: 24,7 × ⅓ + 18,1 × ⅔ = 20,3 %, mot Aaberge 22 %. Topp 0,1 %: 9 til 17 %."],
 "«Hovedforklaringen er omgåelse av utbytteskatt». Det er verdsettingen. Lysbildet runder til 18,1 (eksakt 18,2).","F5 lb 37 til 42, manual 8.6")

# ---------------- SKATTEINSIDENS ----------------
add("ins",11,"Stykkskatt: hvilket uttrykk viser effekten på produsentprisen, ∂p/∂t?",
 "∂p/∂t = D′/(S′ − D′)",
 ["1. Likevekt D(p + t) = S(p). Deriver: D′(∂p/∂t + 1) = S′·∂p/∂t.","2. Løs: ∂p/∂t = D′/(S′ − D′), mellom −1 og 0."],
 "(D′ − S′)/(S′ − D′) = −1 (konstant), D′/S′ (nevner mangler), S′/(S′ − D′) (det er ∂P/∂t).","H2024 8a, manual 11.2")
add("ins",11,"Stykkskatt: hvilket uttrykk viser endringen i konsumentprisen, ∂P/∂t?",
 "∂P/∂t = S′/(S′ − D′)",
 ["1. P = p + t gir ∂P/∂t = ∂p/∂t + 1.","2. D′/(S′ − D′) + 1 = S′/(S′ − D′), mellom 0 og 1."],
 "(S′ − D′)/S′ (over 1), D′/(S′ − D′) (det er ∂p/∂t), nevneren snudd til D′ − S′.","H2024 8b, H2023 7a, manual 11.2")
add("ins",11,"Kontrollen som stryker gale insidensformler: hva må alltid gjelde?",
 "∂P/∂t − ∂p/∂t = 1. ∂p/∂t negativ, ∂P/∂t positiv",
 ["1. D′ &lt; 0 og S′ &gt; 0, så nevneren S′ − D′ er alltid positiv.","2. ∂p/∂t ligger mellom −1 og 0, ∂P/∂t mellom 0 og 1.","3. Et uttrykk som er en konstant, kan ikke være det generelle svaret."],
 "Positivt uttrykk for ∂p/∂t, eller over 1 for ∂P/∂t.","Manual 11.3")
add("ins",11,"Hvem bærer hvor mye av stykkskatten? (D′ = −2, S′ = 3)",
 "Konsumenten 60 %, produsenten 40 %",
 ["1. Nevner: 3 − (−2) = 5.","2. ∂P/∂t = 3/5 = 0,60. ∂p/∂t = −2/5 = −0,40.","3. Kontroll: 0,60 − (−0,40) = 1.","Den siden som reagerer minst på prisen, bærer mest."],
 "Fortegnsfeil i nevneren (3 − 2 = 1).","Manual 11.3")
add("ins",11,"Hvem bærer stykkskatten når etterspørselen er perfekt uelastisk? (Likevektspris 1,50, skatt 0,50 på tilbyderne)",
 "Konsumenten alt: P = 2,00, p = 1,50",
 ["1. D′ = 0 gir ∂P/∂t = 1 og ∂p/∂t = 0.","2. P = 1,50 + 0,50."],
 "2,50 (skatten lagt på to ganger), 3,00 (prisen doblet). P kan aldri stige mer enn t.","H2025 8a, manual 11.4")
add("ins",11,"Perfekt elastisk etterspørsel: hva blir konsumentprisen og produsentprisen? (Likevektspris 1,50, skatt 0,50)",
 "P = 1,50 uendret. p = 1,00",
 ["1. D′ → −∞ gir ∂P/∂t = 0 og ∂p/∂t = −1.","2. Produsenten bærer alt: p = P − t."],
 "1,50 og 1,00 står i hverandres spørsmål. 2,00 er svaret fra forrige ledd. Skriv ned om spørsmålet gjelder P eller p.","H2025 8b og 8c, manual 11.4")
add("ins",11,"∂p/∂t når etterspørselen er perfekt uelastisk (som formel)?",
 "∂p/∂t = 0",
 ["1. D′ = 0 i telleren: 0/(S′ − 0) = 0.","2. Produsentprisen endres ikke. Konsumenten bærer alt (∂P/∂t = 1)."],
 "−1 (tilfellet med uelastisk tilbud), 1/2, det generelle uttrykket.","H2024 8c, H2023 7b, manual 11.4")
add("ins",11,"Grensetilfellene på tilbudssiden: hvem bærer skatten ved perfekt uelastisk og ved perfekt elastisk tilbud?",
 "S′ = 0: produsenten alt. S′ → ∞: konsumenten alt",
 ["1. S′ = 0 gir ∂p/∂t = −1 (fast tomtegrunn).","2. Vannrett tilbud gir ∂P/∂t = 1 (gitt verdensmarkedspris).","Regel: den minst elastiske siden bærer skatten."],
 "Å bytte om tilbuds- og etterspørselstilfellene.","Manual 11.4")
add("ins",11,"Strømstøtten fjernes. Etterspørselen er helt uelastisk og grensekostnaden konstant. Hva skjer med pris og kvantum?",
 "Kvantum uendret. Konsumentprisen stiger med hele støttebeløpet",
 ["1. Fjernet støtte virker som en stykkskatt.","2. Loddrett etterspørsel: kvantum står fast.","3. Vannrett tilbud: produsentprisen står fast, så husholdningene tar hele endringen."],
 "«Kvantum faller» og «de deler kostnaden».","H2022 3, manual 11.4")
add("ins",11,"Stykkskatt med lineære kurver: konsumentpris, produsentpris og kvantum. (x = 1 200 − 40P, x = −300 + 60p, t = 5, før skatt P = 15)",
 "p = 13, P = 18, x = 480",
 ["1. Sett inn P = p + 5: 1 200 − 40(p + 5) = −300 + 60p.","2. 1 300 = 100p, altså p = 13.","3. P = 18. x = 1 200 − 720 = 480."],
 "13 er produsentprisen. 20 er hele skatten veltet over.","Prøveeksamen 1 7a, manual 11.2")
add("ins",11,"Andeler fra helningene: hvem bærer mest av skatten? (|D′| = 40, S′ = 60)",
 "Konsumentene 60 %, produsentene 40 %",
 ["1. Konsument: S′/(S′ − D′) = 60/100.","2. Produsent: |D′|/(S′ − D′) = 40/100.","3. I elastisiteter: εS/(εS + |εD|).","Etterspørselen reagerer minst og bærer mest."],
 "«Produsentene bærer alt fordi de betaler inn skatten».","Prøveeksamen 1 7b, manual 11.4")
add("ins",11,"Vannrett tilbud ved p = 15 og etterspørsel x = 1 200 − 40P. Stykkskatt 5. Konsumentpris og kvantum?",
 "P = 20, x = 400",
 ["1. S′ → ∞: produsentprisen står fast på 15.","2. P = 15 + 5 = 20.","3. Kvantum fra etterspørselen: 1 200 − 800 = 400."],
 "P = 15 og x = 600 (tilfellene byttet), P = 20 og x = 600 (kvantumet ikke justert).","Prøveeksamen 1 7c, manual 11.4")
add("ins",11,"Spiller det noen rolle om stykkskatten kreves inn fra kjøperne eller selgerne?",
 "Nei. Formell insidens avgjør ikke reell insidens",
 ["1. I begge tilfeller er P = p + t og D(p + t) = S(p).","2. Bare helningene avgjør fordelingen.","Eksempel: den amerikanske arbeidsgiveravgiften deles formelt likt, men standardsynet er at arbeidstakeren bærer den."],
 "«Den som betaler inn skatten, bærer den».","Manual 11.1")
add("ins",11,"Proveny og dødvektstap av en stykkskatt. (Før: P = 5, x = 100. Skatt 1. Etter: P = 5,60, p = 4,60, x = 90)",
 "Proveny 90. Dødvektstap 5",
 ["1. Proveny = t × nytt kvantum = 1 × 90.","2. Dødvektstap = ½ × t × (x0 − xt) = ½ × 1 × 10.","3. Konsumentene taper 57, produsentene 38. 95 − 90 = 5."],
 "100 (gammelt kvantum), 10 (glemt ½), produsentens byrde 1,00 (kilen forvekslet med byrden).","F9, manual 11.5")
add("ins",11,"Når er dødvektstapet null? Hvordan vokser det med skattesatsen?",
 "Null når én side er perfekt uelastisk. Vokser med t²",
 ["1. Tapet er en pris på tilpasning. Faller ikke kvantum, finnes ingen trekant.","2. ½ × t² × |S′D′|/(S′ − D′): dobbel sats gir fire ganger tapet.","Ramsey: høyest sats der elastisiteten er lavest. Effektivitet og fordeling trekker hver sin vei."],
 "«Tapet er proporsjonalt med satsen».","Manual 11.5, k20")
add("ins",11,"Monopolist med lineær etterspørsel får en stykkskatt. Ny pris? (P = 3 − Q, grensekostnad 1, t = 1)",
 "Prisen går fra 2,00 til 2,50: halve skatten veltes over",
 ["1. Uten skatt: MR = 3 − 2Q = 1 gir Q = 1 og P = 2.","2. Med skatt: 3 − 2Q = 2 gir Q = 0,5 og P = 2,50.","3. Lineær etterspørsel: ∂P/∂t = ½."],
 "3,00 («markedsmakt gir full overvelting»).","H2021 2, manual 11.6")
add("ins",11,"Hvem bærer selskapsskatten?",
 "Ikke nødvendigvis selskapene. Et empirisk spørsmål om elastisiteter",
 ["1. Harberger: kapitalen bærer det meste. Det gjelder all kapital fordi den er mobil.","2. Over tid kan arbeidskraften bære mye gjennom lavere lønn.","3. CBO legger til grunn at 50 % veltes over på lønn og priser."],
 "«Selskapsskatten betales av selskapene» (formell insidens).","F9, manual 11.6")

# ---------------- BEDRIFTEN ----------------
add("bed",9,"Bedriften kan trekke fra andelen A (mellom 0 og 1) av rentene. Hvordan tilpasses kapitalen K?",
 "F′(K) = r(1 − At)/(1 − t)",
 ["1. V = F(K) − rK − t[F(K) − ArK].","2. F′(1 − t) = r − trA.","Grensetest: A = 1 skal gi r. A = 0 gir r/(1 − t)."],
 "rA/(1 − t) (gir r/(1 − t) ved A = 1), r/[(1 − t)A], r.","H2025 7a, F6, manual 9.4")
add("bed",9,"Avgrenset rentefradrag med tall. (r = 6 %, t = 22 %, A = 0,5)",
 "F′(K) = 6 % × 0,89/0,78 = 6,85 %",
 ["1. Ligger mellom r = 6,00 % og r/(1 − t) = 7,69 %.","2. Uttrykket er lineært i A: midt mellom.","3. Høyere krav gir mindre kapital (F″ &lt; 0)."],
 "3,85 % (rA/(1 − t)) og 15,38 % (delt på A).","Manual 9.4")
add("bed",9,"Overskuddsskatt med fullt rentefradrag: påvirker den investeringen?",
 "Nei. F′(K) = r: overskuddsskatten er nøytral",
 ["1. V = (1 − t)[F(K) − rK].","2. Å maksimere andelen (1 − t) av overskuddet er det samme som å maksimere overskuddet.","3. Gjelder for enhver sats, også 50 %. Nøytral betyr ikke lav."],
 "«Høyere sats gir alltid mindre investering».","H2020 3a, manual 9.4")
add("bed",9,"Gjeld mot egenkapital: hvilke førsteordensbetingelser gjelder når bare gjeldsrentene gir fradrag?",
 "F′G = r og F′E = r/(1 − t). Dermed E* &lt; G*",
 ["1. Gjeld: inntekten beskattes og renten gir fradrag. t-ene stryker hverandre.","2. Egenkapital: alternativkostnaden gir ikke fradrag."],
 "F′G = r(1 − t) (et etter-skatt-tall), kravene byttet om, (1/2)E* &gt; G* (modellen gir bare en ulikhet).","H2025 7b og 7c, manual 9.5")
add("bed",9,"Krav til egenkapitalfinansiert kapital. (r = 6 %, t = 25 %)",
 "F′E = r/(1 − t) = 8,00 %",
 ["1. F′E(1 − t) = r.","2. 6 %/0,75 = 8 %."],
 "6,00 % (gjeldskravet), 4,50 % (r(1 − t)), 7,50 % (r(1 + t)).","Prøveeksamen 6 7a, manual 9.5")
add("bed",9,"Et prosjekt gir 7 % før skatt. Lønnsomt med gjeld? Med egenkapital? (1 000 000, r = 6 %, t = 22 %)",
 "Gjeld: +7 800. Egenkapital: −5 400",
 ["1. Gjeld: 70 000 − 60 000 − 2 200 = 7 800.","2. Egenkapital: 70 000 × 0,78 − 60 000 = −5 400.","3. Nullpunkt for egenkapital: 60 000/0,78 = 76 923, altså 7,69 %."],
 "Å sammenligne 7 % med 6 % uten å skille på finansieringen.","Manual 9.5")
add("bed",9,"Rentebegrensning: bare andelen A av gjeldsrentene kan trekkes fra. Hva skjer med F′G og F′E?",
 "F′G = r(1 − At)/(1 − t). F′E = r/(1 − t) uendret",
 ["1. Bare gjeldsleddet endres.","2. Gjeld blir dyrere, men fortsatt billigere enn egenkapital.","Med r = 6 %, t = 25 %, A = 0,5: F′G = 7,00 % og F′E = 8,00 %."],
 "«Kravet til gjeld blir likt» eller «høyere enn kravet til egenkapital».","Prøveeksamen 6 7b og 18 8a, manual 9.5")
add("bed",9,"Bedriften får fradrag for en beregnet avkastning på egenkapitalen i tillegg til gjeldsrentene. Førsteordensbetingelser?",
 "F′G = F′E = r. Nøytral for finansiering og investering",
 ["1. V = (1 − t)[F(G + E) − r(G + E)].","2. Alle kapitalkostnader gir fradrag.","Skjermingsfradraget gjør noe beslektet på eierens hånd."],
 "F′E = r/(1 − t) (gjelder uten fradraget).","Prøveeksamen 1 8b, manual 9.6")
add("bed",9,"Kontantstrømskatt: investeringen utgiftsføres straks, renter holdes utenfor. Hvordan tilpasses K? (Kapitalslit δ)",
 "F′(K) = r + δ. Skatten er nøytral",
 ["1. V = (1 − t)[−K + (F(K) + (1 − δ)K)/(1 + r)].","2. (1 − t) forkortes bort.","3. Staten dekker t av investeringen og tar t av inntektene. Kan skattlegge grunnrente."],
 "(r + δ)/(1 − t) og «kontantstrømskatten gir rentefradrag».","Prøveeksamen 18 8b, F6 lb 40, manual 9.6")
add("bed",9,"Hvilken omlegging gir nøytralitet både for gjeld mot egenkapital og for investeringsnivået?",
 "Kontantstrømskatt (eller fradrag for egenkapitalens kostnad)",
 ["1. Kontantstrømskatt: F′G = F′E = r.","2. Rentefradrag i tillegg til straks utgiftsføring: gjeld subsidiert, r(1 − 2t)/(1 − t) = 3,59 % ved r = 5 %.","3. Lavere sats: kilen blir mindre, men den er der."],
 "«Senk satsen» og «halvt fradrag for egenkapitalkostnaden».","Prøveeksamen 13 8b, F6")
add("bed",9,"Modellen med eierens renteskatt tᵃ, selskapsskatt tᵏ og rentefradragsandel α: når er skatten nøytral?",
 "F′(K) = r(1 − tᵃ − tᵏα)/(1 − tᵏ) + δ. Nøytral når tᵏ(1 − α) = tᵃ",
 ["1. Egenkapital (α = 0): r(1 − tᵃ)/(1 − tᵏ) + δ. Nøytral når tᵏ = tᵃ, som i Norge.","2. Gjeld (α = 1): r[1 − tᵃ/(1 − tᵏ)] + δ: subsidiert.","Eksempel r = 5 %, δ = 10 %, 22 %: egenkapital 15,00 %, gjeld 13,59 %."],
 "Å la tᵃ øke kravet, eller glemme tᵃ (16,41 %).","F6 lb 12 til 14, F6 2c")
add("bed",9,"Skattemessig avskrivning lavere enn kapitalslitet. Hva skjer med kravet? (r = 5 %, δ = 10 %, avskrivning 6 %, t = 22 %)",
 "F′(K) = r + δ + t(δ − δˢ)/(1 − t) = 16,13 %",
 ["1. Uten avvik: 15 %.","2. Kile: 0,22 × 0,04/0,78 = 1,13 pp.","For lav avskrivning er en skatt på investering. Raskere enn slitet er en subsidie."],
 "15 % («avskrivning påvirker bare timingen»).","F4 lb 61, F5 lb 21")
add("bed",9,"β-kilen: hvilken pris krever bedriften når bare andelen β av kostnaden kommer til fradrag i nåverdi? (t = 22 %, β = 0,75, c′ = 200)",
 "p = c′(1 − tβ)/(1 − t) = 214,10",
 ["1. Teller 1 − 0,165 = 0,835. Nevner 0,78.","2. 200 × 1,0705.","β = 1 (straks utgiftsføring) gir p = c′: nøytralt."],
 "186,83 (kilen snudd), 256,41 (β = 0), 200 (β = 1).","F5 lb 18 til 21")
add("bed",9,"Skattearbitrasje: eieren låner privat og skyter beløpet inn som egenkapital. Gevinst per år? (Lån 1,5 mill., r = 6 %, personskatt 22 %, bedriftsskatt 16 %)",
 "Gevinst = rK(tᵖ − tᵏ) = 5 400",
 ["1. Rente etter skatt: 90 000 × 0,78 = 70 200.","2. Avkastning i bedriften: 90 000 × 0,84 = 75 600.","Lik sats på begge nivåer gir 0, som i Norge."],
 "90 000 (rentene), −14 400 (rentefradraget glemt), «betaling for risiko».","F6 lb 4 til 6, manual 9.2")
add("bed",9,"Lån med rentefradrag og plasser i et skattefritt papir med samme rente. Hva tjener du? Hvorfor forsvinner gevinsten? (Lån 1 mill., 5 %, fradrag 22 %)",
 "11 000 i året. Stenges av symmetri eller av markedsprisen",
 ["1. Kostnad etter fradrag 39 000, avkastning 50 000.","2. Symmetri: skattlegges avkastningen med 22 %, blir gevinsten 0.","3. Markedet: papirets rente bys ned til 3,9 %. Fallet er en implisitt skatt på 22 %."],
 "23 700 (fradrag med 47,4 %). Rentefradraget er verdt 22 %.","Manual 9.2")
add("bed",9,"Hva betyr nøytralitet i skattesystemet (Sandmo)?",
 "Rangeringen av alternativer før skatt er lik rangeringen etter skatt",
 ["1. Krever like effektive satser på tvers av aktiva, finansieringsformer og organisasjonsformer.","2. Effektive satser, ikke nominelle.","3. Nøytral betyr verken lav eller rettferdig skatt."],
 "«Nøytral skatt har ingen kile» (også en nøytral kapitalinntektsskatt vrir sparingen).","Sandmo AS1, manual 9.1")

# ---------------- SKATTETEORI ----------------
add("teo",10,"Flat sats 28 % på all inntekt, uten bunnfradrag. Er systemet progressivt? (Kari 500, Per 1 000)",
 "Verken progressivt eller regressivt (proporsjonalt)",
 ["1. Kari: 140/500 = 28 %. Per: 280/1 000 = 28 %.","2. Progressivitet avgjøres av gjennomsnittsskatten, ikke av kronebeløpet."],
 "«Progressivt fordi Per betaler dobbelt så mye».","H2024 4a, manual 1.3")
add("teo",10,"Samme flate sats med bunnfradrag 50. Progressivt? (28 %, Kari 500, Per 1 000)",
 "Progressivt: 25,2 % mot 26,6 %",
 ["1. Kari: 450 × 28 % = 126, altså 25,2 %.","2. Per: 950 × 28 % = 266, altså 26,6 %.","3. t̄ = t(1 − B/Y) stiger med Y for alle B &gt; 0."],
 "«En flat skatt kan ikke være progressiv».","H2024 4b, manual 1.3")
add("teo",10,"Bunnfradraget økes fra 50 til 200. Sterkere eller svakere progressivitet? (28 %, inntekt 500 og 1 000)",
 "Sterkere: forskjellen går fra 1,4 til 5,6 pp",
 ["1. Kari 16,8 %, Per 22,4 %.","2. Snarvei: t × B × (1/Ylav − 1/Yhøy) er proporsjonal med B. Firedoblet B gir firedoblet spredning."],
 "«Like progressivt», «svakere», «regressivt».","H2024 4c, manual 1.3")
add("teo",1,"Gjennomsnittsskatt i et trinnsystem. (12 % under 100 000, 18 % til 350 000, 28 % over; inntekt 450 000 og 380 000)",
 "18,9 % og 17,2 %",
 ["1. Felles bunn: 12 000 + 45 000 = 57 000.","2. Topp: 28 000 og 8 400.","3. 85 000/450 000 og 65 400/380 000.","Snarvei: begge må ligge over 57 000/350 000 = 16,3 %."],
 "28 % på hele inntekten, 15,0 % (toppsjiktet glemt).","H2024 5, manual 1.4")
add("teo",1,"Marginalskatt mot gjennomsnittsskatt på en lønn. (700 000 i 2026: 22 %, trygdeavgift 7,6 %, inntekten ligger i trinn 2 på 4,0 %)",
 "Marginal 33,6 %. Gjennomsnitt 25,4 %",
 ["1. Marginal: 22 + 7,6 + 4,0 = 33,6 %.","2. Fradrag 210 240. Skatt 107 747,20 + 53 200 + 16 835,40 = 177 782,60.","3. 177 782,60/700 000 = 25,4 %."],
 "Marginalsatsen brukt på hele inntekten. Trinnsatsen gjelder bare inntekten inne i trinnet.","Manual 1.2")
add("teo",10,"Hvilket skattesystem gir samme gjennomsnittsskatt for alle uansett inntekt?",
 "Flat sats uten bunnfradrag",
 ["1. Proporsjonalt: t̄ = t for alle.","2. Bunnfradrag, borgerlønn eller barnefradrag gjør gjennomsnittsskatten ulik."],
 "«Flat sats med bunnfradrag» og «flat sats med borgerlønn» er flate, men ikke proporsjonale.","Kursgodkjenning 2026 8, manual 10.3")
add("teo",10,"Negativ inntektsskatt (borgerlønn): gjennomsnittsskatt? (40 % av all inntekt, overføring 60 000 til alle, inntekt 100 000 og 200 000)",
 "−20 % og 10 %",
 ["1. 40 000 − 60 000 = −20 000.","2. 80 000 − 60 000 = 20 000.","3. T = tY − G = t(Y − G/t): som et bunnfradrag på 150 000.","Gjennomsnittsskatten nærmer seg 40 % nedenfra."],
 "Overføringen trukket fra inntekten: 28 %.","Sandmo AS3, manual 10.3")
add("teo",10,"Er «flat skatt» og «proporsjonal skatt» det samme?",
 "Nei",
 ["1. Flat: én marginalsats.","2. Proporsjonal: konstant gjennomsnittsskatt.","3. Flat med bunnfradrag (Hall og Rabushka) og negativ inntektsskatt (Friedman) er flate og progressive.","Teorien gir ingen klar spådom om flat skatt og arbeidstilbudet."],
 "«Progressivt fordi det har flere trinn».","Manual 10.2 og 10.3")
add("teo",10,"Optimal marginalskatt (Mirrlees): når er den høyere?",
 "Lavere elastisitet, større spredning i produktivitet, sterkere ulikhetsaversjon",
 ["1. Simuleringene gir tilnærmet konstant marginalskatt. Omfordelingen kommer fra bunnfradraget.","2. Effektivitetstapet vokser med t²: dobbel sats gir fire ganger tapet."],
 "«Høyere jo mer elastisk arbeidstilbudet er» og «optimal skatt har stigende satser».","Sandmo AS4, manual 10.5")
add("teo",12,"Implisitt skatt: to obligasjoner med samme risiko. A er skattefri med rente r, B skattlegges med 22 % og har rente R. Hva er riktig?",
 "r &lt; R",
 ["1. Lik risiko krever lik avkastning etter skatt: r = R(1 − 0,22).","2. Skattefritaket er priset inn: lavere avkastning før skatt."],
 "r &gt; R («skattefritt må gi mer»), r = R, «ikke sammenlignbare».","H2024 9a, H2019 4, manual 12.4")
add("teo",12,"Formelen for den implisitte skatten på den skattefrie obligasjonen. (R = 10 %, r = 7,8 %)",
 "t = (R − r)/R = 22 %",
 ["1. Fra r = R(1 − t).","2. (10 − 7,8)/10 = 22 %."],
 "(R − r)/r = 28,2 %, R − r (ikke en sats), (R − r × 22 %)/R. Nevneren er avkastningen på det skattlagte papiret.","H2024 9b, manual 12.4")
add("teo",12,"Valgregelen ved implisitt skatt: skattlagt papir gir 8 %, skattefritt 6 %. Hva velger en investor med 30 % marginalskatt?",
 "Det skattefrie: t* = 25 % er lavere enn hans 30 %",
 ["1. t* = (8 − 6)/8 = 25 %.","2. Skattlagt etter 30 %: 5,6 % mot 6 %.","3. Under 25 %: velg det skattlagte. Lik t*: likegyldig.","Det er utstederen som tjener på fritaket."],
 "«Velg alltid det skattefrie» og 33,3 % (feil nevner).","F10, manual 12.5")
add("teo",12,"Domar og Musgrave: skatten på avkastning øker fra 0 til 40 % med fullt tapsfradrag. Hva skjer med beløpet i det risikable aktivumet? (600 000 før)",
 "Det øker til x/(1 − t) = 1 000 000",
 ["1. Med fullt tapsfradrag krymper hvert utfall med (1 − t).","2. Investoren gjenoppretter samme fordeling ved å skalere opp med 1/(1 − t).","Staten er stille partner. Gjelder uansett risikoholdning."],
 "600 000 uendret, 360 000 (ganget med 0,6), 840 000.","F10, Sandmo AS2, manual 12.2")
add("teo",12,"Prosjektvalg med 40 % skatt, med og uten tapsfradrag. (A gir sikkert 20 000. B gir +100 000 eller −50 000 med like sannsynlighet)",
 "Uten tapsfradrag A (12 000 mot 5 000). Med tapsfradrag B (15 000 mot 12 000)",
 ["1. Uten: B = 0,5 × 60 000 − 0,5 × 50 000 = 5 000.","2. Med: B = 0,6 × 25 000 = 15 000.","Fullt tapsfradrag ganger alle prosjekter med (1 − t). Rangeringen står."],
 "Å sammenligne B etter skatt med A før skatt (20 000).","F10, manual 12.1")
add("teo",12,"Tap kan bare delvis trekkes fra. Hva skjer med risikotakingen til en risikonøytral investor?",
 "Han tar mindre risiko",
 ["1. Staten deler gevinsten fullt, men tapet bare delvis.","2. Uten tapsfradrag blir forventningen E − t × G: oppsiden straffes.","3. Oppstartsbedrifter uten annen inntekt rammes hardest."],
 "«Påvirkes ikke fordi han bare bryr seg om forventningen» og «tar mer risiko».","Kursgodkjenning 2026 7, manual 12.3")
add("teo",4,"Folkefinansiering: forventet avkastning med og uten tapsfradrag. (Lån 1 mill. til 20 %, 90 % sannsynlighet for full betaling, ellers alt tapt, 22 %)",
 "Før skatt 8,0 %. Med tapsfradrag 6,24 %. Uten 4,04 %",
 ["1. 0,9 × 200 000 − 0,1 × 1 mill. = 80 000.","2. Med fradrag: 80 000 × 0,78 = 62 400.","3. Uten: 140 400 − 100 000 = 40 400."],
 "20 % (den lovede renten) og 15,6 % (misligholdet glemt).","F3, manual 4.6")
add("teo",4,"Når er leieinntekt ved utleie av en del av egen bolig skattefri?",
 "Når du selv bruker minst halvparten, målt etter utleieverdi",
 ["1. Gjelder langtidsutleie (30 dager eller mer).","2. Leier du ut mer: skattefritt bare opp til 20 000 i året, ellers alt skattepliktig.","3. Skattefri utleie gir ingen fradrag for kostnader."],
 "«Målt etter areal», «uten egen inngang», «eid over ett år».","Kursgodkjenning 2026 5, H2021 1d, manual 4.4")
add("teo",4,"Korttidsutleie (under 30 dager) av egen bolig: hvordan skattlegges den?",
 "10 000 skattefritt. 85 % av resten skattlegges med 22 %",
 ["1. Effektiv sats over grensen: 85 % × 22 % = 18,7 %.","2. Gjelder uansett hvor mye av boligen du bruker selv."],
 "Å bruke halvparten-regelen for langtidsutleie.","Manual 4.4")
add("teo",4,"Aksjefond mot utleiebolig: hvem vinner før skatt, etter inntektsskatt og etter formuesskatt? (1 mill., fond 8 %, bolig 6,5 %, formuesskatt 1 %)",
 "Fondet, så boligen, så fondet igjen",
 ["1. Før skatt: 80 000 mot 65 000.","2. Etter: 49 728 (37,84 %) mot 50 700 (22 %).","3. Formuesskatt: fond 80 % (8 000), sekundærbolig 100 % (10 000). 41 728 mot 40 700."],
 "22 % på fondet, eller aksjerabatten glemt.","F3, manual 4.5")
add("teo",3,"Realavkastning per år 1870 til 2015 (Jordà m.fl.): rangeringen av de fire aktivaklassene?",
 "Bolig 7,3 % &gt; aksjer 6,7 % &gt; statsobligasjoner ca. 2,5 % &gt; sertifikater ca. 1,0 %",
 ["1. Standardavvik: bolig ca. 10, aksjer ca. 24.","2. Bare ca. 1 pp av boligavkastningen er prisstigning. Resten er leie.","3. r &gt; g: 6,28 % mot 2,87 %."],
 "«Bolig gir best risikojustert avkastning, så kjøp ett hus» (ett hus har idiosynkratisk risiko).","F2, manual 3.1")

# ---------------- INTERNASJONAL SKATT ----------------
add("int",13,"Når er du skattemessig bosatt i Norge?",
 "Opphold over 183 dager i en tolvmånedersperiode eller over 270 dager i en 36-månedersperiode",
 ["1. Periodene er glidende, ikke kalenderår.","2. Statsborgerskap, fødested og pass avgjør ikke."],
 "«Norsk pass», «født i Norge», «bostedsadresse», «ektefelle i Norge».","Kursgodkjenning 2026 4, skatteloven § 2-1")
add("int",13,"Bodd i Norge over ti år, flytter i januar 2022. Fra hvilket år er du skattemessig utflyttet?",
 "Fra og med 2026",
 ["1. Utflyttingsåret pluss tre hele år (2023, 2024, 2025) må godtgjøres.","2. Krav: maks 61 dager i Norge per år. Verken du eller nærstående kan disponere bolig her."],
 "2022, 2024 og 2025.","H2022 4a, kursgodkjenning 2026 9, manual 13.1")
add("int",13,"En som har emigrert, er i Norge 92 dager hver sommer fra 2026. Blir han skattemessig bosatt igjen? Fra når?",
 "Ja, fra 1. januar i det året han passerer 270 dager på 36 måneder: 1.1.2028",
 ["1. Han er aldri over 183 dager på tolv måneder.","2. 3 × 92 = 276: terskelen passeres sommeren 2028.","3. 270-regelen tillater i snitt bare 90 dager i året."],
 "«Fra dagen han passerer 270 dager» og «ikke bosatt, aldri 183 dager».","F7 lb 10, prøveeksamen 16 9")
add("int",6,"Exit-skatt ved utflytting. (Aksjer verdt 25 mill., inngangsverdi 5 mill., bunnfradrag 3 mill., eierskatt 37,84 %)",
 "(25 − 5 − 3) mill. × 37,84 % = 6 432 800",
 ["1. Latent gevinst 20 mill. Grunnlag 17 mill.","2. Gevinsten anses realisert dagen før utflytting og fastsettes endelig.","F7 lb 11 kaller 3 mill. en grense: exit-skatt utløses ved potensiell gevinst over 3 mill."],
 "7 568 000 (bunnfradrag glemt), 3 740 000 (22 %), 9 460 000 (av markedsverdien), 8 324 800 (bunnfradrag trukket fra markedsverdien).","Manual 6.6")
add("int",6,"Exit-skatt: hvordan kan den betales? Hva skjer ved utbytte etter utflytting?",
 "Tolv rentefrie årsrater, alt etter tolv år med renter, eller straks",
 ["1. Utbytte etter utflytting: utdelingen × 0,7 av den utsatte skatten forfaller.","2. Senere verdifall senker ikke skatten.","3. Flytter du tilbake innen tolv år med aksjene i behold, faller den bort."],
 "Å blande regimene. Utflytting før 29.11.2022 (som i H2022-saken): femårsregelen, skatten falt bort hvis aksjene ikke ble solgt innen fem år. Senere: ingen slik bortfall, tolvårsordningen gjelder.","Manual 6.6, F7 lb 11")
add("int",6,"Utløses exit-skatt om en eier gir aksjene til et barn bosatt i utlandet?",
 "Ja. Gave til en mottaker bosatt i utlandet utløser exit-skatt",
 ["1. Terskel: netto gevinst over 100 000 i året. Da skattlegges hele gevinsten.","2. Bunnfradraget på 3 mill. gjelder bare egen utflytting.","3. Giveren trenger ikke flytte selv."],
 "«Utløses bare når han selv flytter», «først når datteren selger», «ikke i skatteavtaleland».","H2024 10h, manual 6.6")
add("int",6,"Kan exit-skatt unngås ved å flytte selve aksjeselskapet ut av landet?",
 "Nei. Selskapet beskattes som om det var likvidert",
 ["1. Kursets fasit: realisasjonsbeskatning på både selskaps- og aksjonærnivå.","2. Eieren selv utløser ikke personlig exit-skatt ved dette."],
 "«Ja, da unngår man skatt» og «aksjene anses også utflyttet».","H2024 10i, H2022 4h, manual 6.6")
add("int",6,"Beskytter en skatteavtale mot norsk exit-skatt ved utflytting?",
 "Nei. Skatten inntrer dagen før utflytting",
 ["1. Da er du fortsatt bosatt i Norge. Avtalen har ikke fått virkning.","2. H2022 (utflytting januar 2022): fasit var femårsregelen, bortfall om aksjene ikke selges innen fem år. Den gjelder ikke for utflytting fra 29.11.2022."],
 "«Hjemstaten har eksklusiv rett til aksjegevinster etter OECDs mønsteravtale».","H2022 4b og 4c, manual 6.6")
add("int",13,"Etter norsk intern rett isolert sett: hvor mye av et norsk AS sin globale omsetning er skattepliktig hit? (100 mill. totalt, 30 mill. i Norge)",
 "Hele 100 mill. (globalskatteplikt)",
 ["1. Bosatt person eller hjemmehørende selskap: all inntekt uansett hvor den er tjent.","2. Skatteavtalene er ikke hensyntatt ennå."],
 "30 mill. (bare Norge, kildeprinsippet) og 90 mill.","H2024 10a, manual 13.1")
add("int",13,"Skatteavtale med fullstendig unntak: hvem beskatter inntekten fra kildestaten? (20 mill. fra USA, 35 %)",
 "Bare kildestaten: T = tkilde × Y = 7 mill.",
 ["1. Norge ser bort fra inntekten.","2. Samlet sats er kildestatens, også når den er høyere enn 22 %."],
 "«Fordeles 50/50», «Norge pga. globalskatteplikt», «ingen får beskatte».","H2024 10b, manual 13.3")
add("int",13,"Vanlig kreditmetode når kildesatsen er lavere: skatt til Norge? (40 mill. fra Japan, 15 %, Norge 22 %)",
 "Restskatt til Norge = 8,8 mill. − 6 mill. = 2,8 mill.",
 ["1. Japan: 6 mill.","2. Norge: 8,8 mill. minus kredit min(6; 8,8).","3. Samlet 22 %."],
 "«Japan krediterer norsk skatt» (kreditten gis av hjemstaten) og «bare om det ble utlignet skatt».","H2024 10c, manual 13.3")
add("int",13,"Vanlig kreditmetode når kildestaten har høyere sats enn hjemstaten. Hvor stor kredit?",
 "Kredit = min(tkilde; thjem) × Y. Det overskytende blir stående",
 ["1. Kredit opp til det hjemstaten selv ville krevd.","2. Samlet sats = maks(thjem; tkilde).","Eksempel: 1 mill., kilde 35 %, Norge 22 %: kredit 220 000, ukreditert 130 000."],
 "«Full kredit for all utenlandsk skatt» og «kildestaten må senke satsen».","H2024 10g, manual 13.3")
add("int",13,"Ingen skatteavtale: hvem beskatter inntekten? (10 mill. fra BVI, 7,5 %, Norge 22 %)",
 "Begge land etter intern rett: 29,5 %",
 ["1. BVI 750 000 + Norge 2 200 000 = 2 950 000.","2. Ingen avtale gir dobbeltbeskatning (slik eksamenssettene regner).","Med Japan på kredit og USA på unntak er BVI det eneste stedet med dobbeltbeskatning."],
 "«Bare kildestaten», «bare Norge», «ingen».","H2024 10d og 10e, manual 13.3")
add("int",13,"Unntaksmetoden når kildestaten ikke beskatter inntekten: hva blir resultatet?",
 "Dobbelt ikke-beskatning",
 ["1. Unntaket er ubetinget: Norge ser bort fra inntekten uansett.","2. Under kredit gir samme situasjon full norsk skatt."],
 "«Unntaksmetoden gjelder ikke da» og «hjemstaten får full rett».","H2024 10f, manual 13.3")
add("int",13,"Samme inntekt gjennom tre regimer: samlet sats? (Norge 22 %, kildestat 15 %)",
 "Ingen avtale 37 %. Unntak 15 %. Kredit 22 %",
 ["1. Ingen avtale: satsene legges sammen.","2. Unntak: kildestatens sats.","3. Kredit: den høyeste av de to.","Med kilde 35 %: 57 %, 35 % og 35 %."],
 "Full kredit (gir 22 % ved kilde 35 %).","Manual 13.3")
add("int",13,"Lønn fra flere land. Betalbar skatt til Norge? (1,6 mill., sats 46,4 %; Irland 200 000 til 35 %; USA 200 000 til 55 %; skatteparadis uten avtale)",
 "742 400 − 70 000 − 92 800 = 579 600",
 ["1. Global skatt: 1,6 mill. × 46,4 %.","2. Irland: full kredit 70 000.","3. USA: kredit begrenset til 200 000 × 46,4 % = 92 800.","4. Skatteparadis: ingen kredit."],
 "Full kredit for USA (110 000).","H2021 4, manual 13.4")
add("int",13,"Bosatt i tre land etter intern rett og ingen skatteavtaler. Hvem beskatter lønnen? Hva avgjør bosted etter en avtale?",
 "Alle tre: trippelbeskatning. Avtalen følger OECD art. 4",
 ["1. Uten avtale har ingen plikt til kredit eller unntak.","2. Avtalens rekkefølge: fast bolig, sentrum for livsinteressene, vanlig opphold, statsborgerskap.","3. Familie, hjem og arbeid avgjør sentrum for livsinteressene."],
 "«Der han har meldt flytting» og «der han har vært mest».","H2022 4d til 4f, manual 13.4")
add("int",13,"Hva kjennetegner et skatteparadis ifølge Schjelderup?",
 "Hemmelighold (secrecy jurisdiction), ikke bare lav sats",
 ["1. Inngjerdet regelverk for utlendinger.","2. Sikret skattemessig hjemsted.","3. Privat informasjon: ingen regnskaper, stråmenn, truster.","Avslørte preferanser: var reglene vekstfremmende, ville landet brukt dem selv."],
 "«Skatteparadis betyr null skatt».","GS1, F11, manual 13.5")
add("int",13,"Hvordan flyttes overskudd til lavskatteland? (Banan eksportert for 13 p, importert for 60 p, 1 p overskudd i hver ende)",
 "Internprising, tynn kapitalisering, skallselskap og stråmenn",
 ["1. Seks konserntjenester belastes 47 p i lavskattejurisdiksjoner.","2. Skattbart: 2/60 = 3,3 % av verdien.","3. Besparelse = flyttet overskudd × (thøy − tlav)."],
 "7,7 % (1/13, feil nevner). Mekanismene er ofte lovlige: avoidance, ikke evasion.","F11, manual 13.5")
add("int",13,"Hvem bruker skatteparadisene i Norge (Alstadsæter, Johannesen og Zucman)?",
 "De 0,01 % rikeste unndrar 25 til 30 % av skatten sin",
 ["1. Hele befolkningen unndrar i snitt 3 %.","2. 50 % av formuen i skatteparadis eies av de 0,01 % rikeste.","3. Formuesandelen til de 0,01 % rikeste øker med om lag 25 % når skjult formue tas med."],
 "Tallene byttet om, eller 3 % brukt om de rikeste. Global minimumsskatt (15 %) står i manualen 13.6, ikke på F11 2026.","F11 lb 49")


# ---- tillegg etter kontroll ----
add("int",6,"Et AS stiftet i Norge ledes nå fra et land uten skatteavtale med Norge. Er det fortsatt hjemmehørende her? Utløses exit-skatt for selskapet?",
 "Ja, fortsatt hjemmehørende. Ingen exit-skatt",
 ["1. Stiftet i Norge og ingen avtale som flytter bostedet: statusen opphører ikke.","2. Reell ledelse i utlandet endrer ikke det."],
 "«Utflyttet fordi ledelsen sitter i Dubai» og «exit-skatt gjelder bare personer».","H2022 4g, manual 6.6")
add("skj",6,"Aksjonærlån: en personlig aksjonær låner 500 000 av eget AS. Hvordan skattlegges lånet?",
 "Som utbytte: 500 000 × 37,84 % = 189 200",
 ["1. Fra 2015 skattlegges lån til personlig aksjonær som utbytte.","2. Unntak: lån under 100 000 som tilbakebetales innen 60 dager (for eksempel reiseutgifter).","3. Gjelden består, så aksjonærlån lønner seg ikke."],
 "«Lån er ikke inntekt» og «renten skattlegges bare med 22 %».","F4 lb 57, F5 lb 13, manual 6.5")
add("for",7,"Eiendomsskatt: hvem bestemmer den og hva er satsgrensene?",
 "Kommunal og frivillig objektskatt. Maks 4 promille, maks 1 promille første år",
 ["1. Betales uansett gjeld og nettoformue. 323 av 357 kommuner hadde den i 2024.","2. Kan gjelde næring, bolig og fritid eller all eiendom.","3. Manualen: grunnlag 0,7 × beregnet verdi, økning høyst 1 promille per år.","Eksempel: bolig 4 mill. × 0,7 × 3 promille = 8 400."],
 "Å bruke formuesskattens 25 % som grunnlag. 4 promille er 0,4 %.","F8 lb 58 og 59, manual 7.6")
add("int",13,"Hvilke vilkår må oppfylles samtidig for å bli skattemessig emigrert? Hva er boligunntaket?",
 "Fast opphold i utlandet, maks 61 dager i Norge per år, ingen bolig i Norge",
 ["1. Verken du eller nærstående kan disponere bolig her.","2. Unntak: bolig anskaffet minst fem år før utflytting og ikke brukt av deg eller nærstående de siste fem årene.","3. Du er ikke emigrert før Skatteetaten godkjenner det."],
 "«Det holder å melde flytting» og «hytta du beholder spiller ingen rolle».","F7 lb 4 til 7")
add("int",13,"Over 183 dager i en tolvmånedersperiode, men dagene fordeler seg over to inntektsår. Fra når er du bosatt?",
 "Fra 1. januar det andre året",
 ["1. 183 dager innenfor ett inntektsår: bosatt fra første dag.","2. Fordelt over to år: fra 1. januar det andre året.","3. 270 dager på 36 måneder: fra 1. januar i året terskelen passeres.","En mellomlanding på norsk flyplass teller ett døgn."],
 "Å telle kalenderår i stedet for en glidende tolvmånedersperiode.","F7 lb 10")
add("int",6,"Exit-skatt og utbytte etter utflytting: hva sitter eieren igjen med i dag? Hva med skattekommisjonens forslag? (Utbytte 1 mill., kildeskatt 15 %, avdrag 70 % mot forslag 37,84 %)",
 "I dag 150 000. Med forslaget 471 600",
 ["1. Kildeskatt 150 000.","2. I dag: avdrag 700 000. 1 000 000 − 150 000 − 700 000 = 150 000.","3. Forslaget: avdrag 378 400. Igjen 471 600.","Forslaget strekker nedbetalingen fra 12 til om lag 20 år."],
 "Å regne 70 % som en skattesats på utbyttet. Det er avdrag på det utsatte kravet.","F7 lb 12 til 16")
add("teo",10,"Hva sier filosofene om progressiv skatt: utilitarister, Smith, Nozick, Rawls og Pettit?",
 "Utilitaristene, Rawls og Pettit for. Nozick mot. Smith forsiktig",
 ["1. Utilitarister: avtakende grensenytte gir et betinget argument for omfordeling.","2. Smith: skatt etter evne, men varsom med omfordeling.","3. Nozick: skatt er tvangsarbeid, progressivitet særlig forkastelig.","4. Rawls: differanseprinsippet og sløret av uvitenhet. Pettit: hindre dominans fra store formuer."],
 "Å gi Nozick eller Smith et sterkt forsvar for progressivitet.","F7 lb 48 til 53")
add("teo",10,"Borgerlønn: argumenter for og mot? Hvem vil Moene gi den til?",
 "For: mindre fattigdom, frihet, enklere velferd. Mot: kostnad, arbeidsinsentiver, administrasjon",
 ["1. For: sikret minsteinntekt, entreprenørskap, erstatter byråkrati, inntekt ved teknologisk ledighet.","2. Mot: høyere skatter, behovet for NAV forsvinner ikke, svakere arbeidsetikk, kan trekke til seg flyktninger.","3. Moene: borgerlønn til dem som har stemmerett ved kommunevalg."],
 "Å tro at borgerlønn gjør systemet mindre progressivt. Negativ inntektsskatt er den mest progressive flate varianten.","F7 lb 42 til 45")
add("teo",9,"Politisk system og offentlig sektor: parlamentarisme mot president og kongress (Persson, Roland og Tabellini)?",
 "Parlamentarisme gir større offentlig sektor: 37 % mot 19,8 % av BNP",
 ["1. Parlamentarisme: én votering, samme flertall avgjør inntekter og utgifter.","2. President og kongress: skattekomité og utgiftskomité hver for seg. Inntektskomiteen holder skattene lave.","3. Mindretallsregjeringer og store koalisjoner gir mer utgiftsvekst (hestehandel)."],
 "Å snu retningen: USA-systemet gir minst offentlig sektor.","F6 lb 47 til 52")
add("for",8,"Guvenen m.fl. (2023): flytter formuesskatt eller gevinstskatt kapital raskest til de produktive? (To brødre arver 1 000. Mike får 20 %, Fredo 0 %. Gevinstskatt 25 % eller formuesskatt 2,27 %)",
 "Formuesskatten",
 ["1. Gevinstskatt: Mike 1 150, Fredo 1 000. Forhold 1,15.","2. Formuesskatt: Mike 1 200 − 27,24 = 1 172,76, Fredo 977,30. Forhold 1,20.","3. Begge gir om lag 50 i proveny. Formuesskatten straffer lav avkastning."],
 "«Formuesskatten reduserer ulikheten». Den gir effektivitetsgevinst, men øker ulikheten.","F8 lb 30 til 37, manual 8.5")

# ---- bygg ----
out=[]; cnt={}
for code,ch,front,bk in C:
    cnt[code]=cnt.get(code,0)+1
    out.append({"id":f"fo-{code}-{cnt[code]:02d}","ch":ch,"deck":D[code],"front":front,"back":bk})
order=list(D.keys())
out.sort(key=lambda x: order.index(x["id"].split("-")[1]))
json.dump(out, open(sys.argv[1],"w"), ensure_ascii=False, indent=1)
print(cnt, len(out))
