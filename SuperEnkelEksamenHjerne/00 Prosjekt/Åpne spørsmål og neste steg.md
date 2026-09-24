---
tags: [prosjekt, oppgaver]
oppdatert: 2026-09-24
---

# Åpne spørsmål og neste steg

Levende liste. Kryss av eller stryk når noe er gjort, og noter datoen.

## Må gjøres (kjent brudd)

- [ ] **Supabase URL-konfigurasjon peker på gammel adresse.** Site URL og
      Redirect URLs i Supabase står fortsatt til `.../SAM3/` etter navnebyttet
      19. august 2026. Glemt-passord-lenker og e-postbekreftelse går derfor til
      en død adresse. Fikses i Supabase → Authentication → URL Configuration.
      Se [[Supabase]].
- [x] ~~`.claude/launch.json` er utdatert.~~ Rettet 19. august 2026 — peker nå på
      `tools/serve.py`, og `serve.py` godtar `PORT` fra miljøet.

## Bør vurderes

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

## Åpne spørsmål

- Hvilket fag blir nummer to? Det avgjør hvor hardt fagnøytraliteten må ryddes.
- Skal flere personer bruke plattformen? Alt er per i dag bygget for én bruker;
  RLS-en tåler flere, men innholdet og tonen er personlig.
- Er GitHub Pages fortsatt riktig vert når `?v=N`-dansen begynner å irritere?
  Se [[Publisering og cache]].
