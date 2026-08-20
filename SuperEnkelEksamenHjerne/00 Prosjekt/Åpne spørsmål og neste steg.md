---
tags: [prosjekt, oppgaver]
oppdatert: 2026-08-19
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

## FIE402 — under bygging

Faget er lagt inn og kjører. Se [[FIE402 Corporate Finance]] for kursfakta og
[[Eksamenssett-modulen]] for eksamensdelen. Bygges i bølger:

- [x] Bølge 1 — motorrydding, eksamensmodul, 24-modulsplan, kapittel k0–k5 og
      formelsamlingen k29, eksamenssettene H2024 og H2025
- [ ] Bølge 2 — kapitalstruktur, k6–k11
- [ ] Bølge 3 — informasjon, emisjon og payout, k12–k16
- [ ] Bølge 4 — verdsetting med gjeld, k17–k20
- [ ] Bølge 5 — opsjoner k21–k25, deretter M&A, eierstyring og eksamensteknikk k26–k28
- [ ] Bølge 6 — de ni øvrige eksamenssettene, med egne løsninger der fasit
      mangler eller bare finnes som skanning

**Åpent spørsmål om lengde.** Kapitlene i bølge 1 ble 1 800–2 800 ord hver, mot
et mål på 1 000–1 400. Hele SAM3-manualen er 22 700 ord; FIE402 ligger allerede
på 18 700 etter sju seksjoner. Fortsetter det slik, blir manualen rundt 70 000
ord. Det kan være riktig, siden den skal erstatte læreboka — men det er en
beslutning som bør tas bevisst før bølge 2.

## Åpne spørsmål

- Hvilket fag blir nummer to? Det avgjør hvor hardt fagnøytraliteten må ryddes.
- Skal flere personer bruke plattformen? Alt er per i dag bygget for én bruker;
  RLS-en tåler flere, men innholdet og tonen er personlig.
- Er GitHub Pages fortsatt riktig vert når `?v=N`-dansen begynner å irritere?
  Se [[Publisering og cache]].
