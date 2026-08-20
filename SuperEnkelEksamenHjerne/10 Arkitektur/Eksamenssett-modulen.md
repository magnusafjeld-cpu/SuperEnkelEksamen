---
tags: [arkitektur, moduler, eksamen]
oppdatert: 2026-08-19
---

# Eksamenssett-modulen

`js/bundle-sett.js`, rute `/sett`. Kjører hele tidligere eksamenssett på to måter.
Laget for [[FIE402 Corporate Finance]] i august 2026, men fagnøytral: enhver fag
som fyller ut `EDU_DATA.sets` får den. Fag uten sett får den **skjult automatisk**
— `has("/sett")` i `js/boot.js` sjekker at det finnes data, så
[[SAM3 Makroøkonomi]] er upåvirket.

## De to modusene, og hvorfor de er forskjellige

**Øvingsmodus.** Én oppgave om gangen. Fasiten er låst bak knappen «Jeg har
skrevet svaret — vis løsningen». Låsen er hele poenget: å lese en løsning man
ikke har forsøkt på gir gjenkjennelse, ikke kunnskap. Teksten over knappen minner
om at eksamen er penn og papir, så forsøket skal gjøres på papir.

**Eksamensmodus.** Hele settet vises samtidig med nedtelling fra settets egen
tid. **Ingen fasit er nåbar noe sted** før «Lever besvarelsen». Etterpå åpnes alle
løsningene samtidig, og man poengsetter seg selv oppgave for oppgave mot
kriterielisten. Dette speiler det som faktisk feller folk: 100 poeng på 180
minutter er 1,8 minutter per poeng, og delsvarene bygger på hverandre.

Bytter du fra øving til eksamen etter å ha åpnet fasit på en oppgave, spør
modulen om du er sikker — settet gir da ikke lenger et ekte bilde.

## Datamodellen

```js
EDU_DATA.sets = [{
  id: "h2025",              // stabil — lagringsnøkkel, endres aldri
  label: "Autumn 2025", date: "2025-12-08",
  minutes: 180, points: 100,
  format: "6 exercises · no multiple choice",
  note: "…kontekst som vises på settkortet…",
  exercises: [{
    n: 1, title: "Options", points: 12, topic: "Options",
    chapters: [21, 23],     // kapitler oppgaven bygger på
    body: "<p>…oppgaveteksten som HTML…</p>",
    parts: [{ label: "a", points: 4, body: "<p>…</p>",
              solution: "<p>…</p>", criteria: ["…", "…"] }],
    solution: "…",          // brukes når oppgaven ikke har deloppgaver
    criteria: ["…"],
  }],
}];
```

`body`, `solution` og `parts[].body` rendres som **rå HTML** i en `.prose`-blokk —
det er derfor matematikken kan settes ordentlig med `<sub>`, `<sup>` og
`<table class="data">`. `criteria` er en liste over hva som må være med for full
uttelling; den vises som punktliste under løsningen.

## Lagring

| Nøkkel | Innhold |
|---|---|
| `state.exams["<settId>-run"]` | `{ mode, startedAt, submittedAt }` — selve økta |
| `state.exams["<settId>-e<n>"]` | `{ revealed, score, scoredAt }` per oppgave |

Alt går gjennom `S.store.setExam()`, så det synkes som all annen fremdrift.
**Nedtellingen regnes ut fra `startedAt`, ikke fra en teller i minnet** — derfor
overlever en påbegynt eksamen at fanen lukkes eller lastes på nytt.

Se [[Datamodell og lagring]] for resten av lagringsmodellen.

## Ting å vite hvis du endrer den

- Nedtellingen er et `setInterval` som oppdaterer **kun tekstnoden**, ikke hele
  visningen. `render()` rydder alltid opp i et gammelt intervall først, og
  intervallet stopper seg selv når noden forsvinner ut av DOM-en.
- Selvvurderingen mater `state.exams`, som repetisjonsmotoren allerede leser via
  `exams.tasks[].chapters`. Koblingen fra et dårlig eksamensresultat til
  repetisjonskøen går gjennom `chapters`-feltet på oppgaven.
- Tiden får gå på overtid i stedet for å stoppe. Klokka blir rød og teller
  oppover — det er ærligere enn å låse skjermen, og du ser hvor mye du gikk over.
