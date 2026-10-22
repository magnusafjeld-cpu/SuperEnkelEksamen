---
tags: [prosjekt, oppgaver]
oppdatert: 2026-10-22
---

# Åpne spørsmål og neste steg

Levende liste. Kryss av eller stryk når noe er gjort, og noter datoen.

## Må gjøres (kjent brudd)

- [ ] **Supabase URL-konfigurasjon peker på gammel adresse.** Site URL og
      Redirect URLs i Supabase står fortsatt til `.../SAM3/` etter navnebyttet
      19. august 2026. Glemt-passord-lenker og e-postbekreftelse går derfor til
      en død adresse. Fikses i Supabase → Authentication → URL Configuration.
      Se [[Supabase]].
- [ ] **Tre steder i Caseintervju bruker fortsatt 1,4 millioner småhus.** SSB
      oppgir 1,88 millioner småhus og 1,31 millioner eneboliger for 2026.
      Varmepumpecasen og tallarket i k15 ble rettet 30. september 2026. Tre
      steder har fortsatt det gamle tallet:
      `estimering-kjokken` (1,4 millioner småhus + 1,25 millioner leiligheter =
      2,65 millioner, mot SSBs 1,88 + 0,88 = 2,76 millioner),
      `estimering-bredband` («husholdninger i småhus» 1,4 millioner) og spørsmål
      27 i `fag/case/dybde-tall.js` (varmepumper til enebolig). Alle tre må
      regnes om fra grunnen av. Det er ikke nok å bytte ut tallet. Se [[Caseintervju]].
- [x] ~~`.claude/launch.json` er utdatert.~~ Rettet 19. august 2026 — peker nå på
      `tools/serve.py`, og `serve.py` godtar `PORT` fra miljøet.

## Bør vurderes

- [ ] **Etter PwC-intervjuet 6. oktober 2026:** noter hvordan casen faktisk var
      (lesetid, skriftlig materiale, hvem som styrte, casetype, hva de spurte om)
      i `docs/case-research/10-pwc-consulting.md`, og juster PwC-casene hvis formatet
      var et annet enn det PwCs egne sider beskriver. Se [[Caseintervju]].

- [ ] **Studieplanen for SAM3 er utløpt.** Planen går 29. juni – 19. juli 2026,
      altså en måned bak i tid. `activeDayIndex()` klamper til siste dag, så
      dashbordet står permanent på dag 21. Enten settes `startDate` fram mot en
      ny eksamen, eller så bør appen ha en «planen er ferdig»-tilstand.
      Se [[SAM3 Makroøkonomi]].
- [ ] **Fagnøytraliteten er ikke helt ren.** Motoren har fortsatt SAM3-spesifikke
      biter (dele-inndelingen i parseren, kapittel 13–19-bonusen i
      repetisjonsmotoren, kapittelspennet 1–23 i metrics). Må ryddes før fag nr.
      2 legges inn. Full liste i [[Fallgruver]].
- [ ] **Skal hjernen inn i git?** Hvelvet ligger i repomappa, men er usporet.
      Committes det, følger prosjekthukommelsen med repoet; da bør
      `SuperEnkelEksamenHjerne/.obsidian/workspace.json` ignoreres, siden den
      endrer seg hver gang et vindu flyttes.
- [ ] **`SAM3_oppgavebank_2.html` er frittstående.** Laget 31. juli 2026, men
      ikke koblet til appen. Enten kobles den inn som `problems`-kandidat i
      `js/subjects.js`, eller så bør det stå tydelig at den er en egen side.
- [ ] **Tom mappe `SAM3 Oppgavebank MC/`.** Ingen filer, ingen referanser. Trolig
      en rest — kan sannsynligvis slettes.

## FIE402 — ferdig

Faget er komplett og publisert. Se [[FIE402 Corporate Finance]] for tallene og
[[Eksamenssett-modulen]] for eksamensdelen. Bygget 19.–20. august 2026 i seks bølger.

Det som gjenstår er ikke innhold, men bruk:

- [ ] **Les Foundations og si fra om nivået treffer.** Kapitlene ble skrevet før du
      hadde lest noe av faget; tonen er kalibrert mot en leser uten lærebok, men det
      er en antakelse til den er prøvd.
- [ ] **Kjør H2025 i eksamensmodus på tid.** Det er den beste enkeltmålingen av hvor
      du står, og den eneste som avslører om tidsbudsjettet i k28 holder.
- [ ] Vurder om lynlæringen bør begrenses til kapitler du har lest. Den dekker hele
      pensum fra dag én, så den kan servere M&A-spørsmål i modul 3.

## Kjernepensum — neste fag

Lagt inn for FIE402 28. september 2026. Magnus ba om det for «fagene jeg har
dette året», FIE402 først. Se [[Moduler og visninger]].

- [x] ~~**FIE432 Personlig økonomi.**~~ Lagt inn 28. september 2026 med
      flervalgsminicaser, slik eksamen er. Se [[FIE432 Personlig økonomi]].
- [ ] **FIE432 k20 mangler formlene fra k8** (τ<sub>w</sub>/r, V = CF/r mot
      CF/(r + τ<sub>w</sub>), D = τ<sub>w</sub>W/(1 − t<sub>e</sub>)), selv om k8 var 17 % av H2025.
      Nye rader må legges nederst i 20.3 (fallgruve 7b).
- [x] ~~**FIE459 Sustainable Finance.**~~ Lagt inn 21. oktober 2026 med sju deler,
      flervalg og sant/usant uten minuspoeng. Del 6 er skrevet fra foilene til
      forelesning 10–12. Se [[FIE459 Sustainable Finance]].
- [ ] **Les FIE402-kjernepensum og si fra om nivået treffer.** Tidsestimatet er
      ~2 timer lesing og ~4 t 30 min med alle sjekker og minicaser, over de
      3 timene som var målet. Er det for mye, er minicasene det naturlige å
      korte.
- [ ] **H2024 E6(c) i FIE402-eksamenssettet:** løsningen gir ρ = 0,7197 fra to
      ulike kontantstrømmer; konsistente oppsett gir rundt 0,46. Undersøk mot
      2021 P4 og rett om det holder. Se [[FIE402 Corporate Finance]].
- [ ] **Quizene i SAM3, FIE402 og Caseintervju har fasiten som lengste
      alternativ** i 53–66 % av spørsmålene (fallgruve 7y). Egen oppgave.

## FIE432 — manualpunkter fra kapitteloppgavearbeidet

Funnet under kapitteloppgavearbeidet og rettet 24. september 2026, hvert punkt
kontrollert mot Lovdata, Skatteetaten eller kursets egne fasiter. Se
[[FIE432 Personlig økonomi]].

- [x] ~~**7.1** oppga ikke innslagspunktet for trinn 2 for ektefeller.~~ Begge
      innslagspunktene dobles for ektefeller som skattlegges under ett: 43 mill.
      i 2026 (40 og 41,4 mill. i 2024 og 2025). Står nå i formelboksen, tabellen
      og k20, med et regnet ektepar.
- [x] ~~**7.2** sa ikke at renteandelen i et fond verdsettes til 100 %.~~ Egen
      tabellrad og et regnet kombinasjonsfond (skatteloven § 4-12 sjette ledd).
- [x] ~~**6.6** var uklar om «× 0,7» og gavegrensen.~~ 0,7 × utbyttet er et
      skattebeløp som forfaller (§ 10-70 åttende ledd), og 100 000 er en terskel:
      over den skattlegges hele gevinsten, uten bunnfradraget (fjerde ledd).
- [x] ~~**k13** forklarte § 2-1 tynt, og **k18** forklarte ikke system 1 og 2.~~
      13.1 har nå 183/270-dagersreglene og utflyttingsreglene. 18.5 har
      Kahnemans to systemer slik kurset framstiller dem i H2016-fasiten.
- [ ] Studieplanen regner ikke med tiden til kapitteloppgavene, i FIE432 heller
      ikke i FIE402. Med 229 oppgaver à 2–6 minutter er det mange timer som ikke
      står i planen.

## FIE459 — det som gjenstår

Faget ble lagt inn 24. september 2026. Se [[FIE459 Sustainable Finance]].

- [x] ~~**Skriv om k10–k13 fra foilene.**~~ Gjort 21. oktober 2026, med ny quiz, nye
      kort og kj7 i kjernepensum. Se [[FIE459 Sustainable Finance]].
- [ ] **Eksempelspørsmålene** som deles ut på de to gjesteforelesningene etter
      forelesning 13: legg dem inn i quizen og kalibrer kjernepensumet mot dem.
- [ ] **Gjesteforelesningene.** DNB (13/10) er med i k11. Foilene fra
      Folketrygdfondet og Fondsfinans (Melanie Brooks) ligger i kildemappen, men er
      ikke med; de hører trolig til k8 og k9. Sustainability Hub og Heidelberg
      Materials har ikke publisert foiler.
- [ ] Vurder kapitteloppgaver i flervalgsformat, som i FIE432, hvis Magnus vil ha
      mer eksamenstrening enn quizen gir.

## FIE402 — funnet under sjangertreningen (22. oktober 2026)

Agentene som skrev stigene, leste manualen og eksamenssettene grundig. Rettet med en
gang: regnefeilen i illustrasjonen i k25, Worked example 4 (−30.7407 skulle vært
−21.4815), og setningen i k18 § 18.4 om at forskyvning av gjeldssaldoen «always
overstates the shield» (retningen avhenger av hvilken vei du forskyver). Ikke rettet:

- [ ] **k12 Worked example 3 har to likevekter.** Med NPV = 40 er også separering
      selvkonsistent (α = 0.30 gir den gode typen 245 &lt; 250). Figur 12.2 tegner pooling
      og separering som utelukkende områder. Si at begge kan holde.
- [ ] **k12 Worked example 2, steg 6** sier at eksamen spør etter terskelen q\* som egen
      deloppgave. Ingen av settene i `sett.js` gjør det.
- [ ] **H2024 E6-konvensjonen for det underliggende** (S<sub>u</sub> og S<sub>d</sub> som
      dato-1-verdier av en ny annuitet uten betaling på dato 1) kan gi ρ &gt; 1 med korte
      annuiteter. V2021 P4-nøkkelen tar med betalingen. k25 bør si at ρ må kontrolleres.
- [ ] **H2025 E1-nøkkelens 6.04** er kontinuerlig diskontert, mens manualen (k21–k23)
      diskonterer årlig. Ikke en feil, men verdt én setning i k23.
- [ ] **sett.js H2025 E4** oppgir PV(TS) = 0.7503 og justeringen 5.7531; med full
      presisjon 0.7504 og 5.7530. Innenfor nøkkelens toleranse.

## FIE432 — funnet under sjangertreningen (22. oktober 2026)

- [ ] **k15 (pensjon) motsier seg selv om H2019 oppgave 6c:** forklaringen under formelen
      og advarselsboksen nevner ulike gale alternativer (1 328 510 mot 1 352 040).
- [ ] **sett.js H2022 oppgave 6a:** mellomregningene er feil (1,0499⁻⁵ = 0,783899, ikke
      0,784013), men sluttsvarene stemmer. 6b bruker et annet overslag enn manualen.
- [ ] **sett.js H2024 oppgave 14:** løsningen sier at avdragsfrihet gir høyere kostnad;
      manualen (og stigen) sier at den er lik i nåverdi.
- [ ] **sett.js H2022 oppgave 4 spørsmål 4:** forklaringen om fast bolig holder neppe
      juridisk (Dubai er ikke part i avtalen).
- [ ] **Kreditten etter § 16-21 regnes per kategori, ikke per land**, mens manualen 13.3
      regner land for land.
- [x] ~~**FIE402-stigene har 14 steg hver.**~~ Kortet ned til 9–11 steg 22. oktober 2026, uten å miste lagrede svar.

## FIE432 — funnet under eksamenstreningen, ikke rettet

- [ ] **H2024 oppgave 8 i `fag/fie432/sett.js` har likevekten «D(P) = S(p + t)»**,
      som ikke stemmer med P = p + t. kj5 og k11 bruker D(p + t) = S(p). Trolig en
      trykkfeil i selve eksamensteksten; sjekk originalen og merk den i settet.
- [ ] **Tabellen i manualen 18.2 merker hjemmebias som «feilslutning»**, mens teksten
      og kj11 sier at den kan leses begge veier (forsøket endret ingenting).
- [ ] **Tankestrek i eldre innhold.** Magnus' skriveregel forbyr dem, men manualen
      (k6 32, k7 45, k8 40, k13 12 og flere), kj7 og kapitteloppgavene har mange,
      ofte som «Steg 1 — …». Eksamenstreningen har ingen. En egen opprydding.
- [ ] **Hjelperne `unik`, `syklus` og `velg_feller`** er definert lokalt i flere
      temafiler i `fag/fie432/_trening/`. Flytt dem til `tools/trening_lib.py` før
      neste fag får eksamenstrening.
- [ ] **int-s24 (Alstadsæter, Johannesen og Zucman):** forelesning 11 sier at de
      0,01 % rikeste unndrar 25 % av skatten. Tallet «om lag 20 % av formuen» i fasiten
      står ikke i lysbildene. Sjekk mot artikkelen.
- [ ] **Feller for «Ingen av dem» i påstandsspørsmål** må si at påstand I holder for å
      forklare feilen. Da snevrer den valget inn i «Prøv igjen». Akseptert foreløpig.
- [ ] **`aks-s16` beholdt id-en** selv om spørsmålet er et annet (spesifikasjonen § 5
      sier ny id). Gammel logg på id-en gjelder det gamle spørsmålet.
- [ ] **Eksamenstrening for andre fag.** Motoren er fagnøytral; FIE402 (åpen
      eksamen) passer dårlig, FIE459 (flervalg og sant/usant) godt.

## Åpne spørsmål

- Hvilket fag blir nummer to? Det avgjør hvor hardt fagnøytraliteten må ryddes.
- Skal flere personer bruke plattformen? Alt er per i dag bygget for én bruker;
  RLS-en tåler flere, men innholdet og tonen er personlig.
- Er GitHub Pages fortsatt riktig vert når `?v=N`-dansen begynner å irritere?
  Se [[Publisering og cache]].
