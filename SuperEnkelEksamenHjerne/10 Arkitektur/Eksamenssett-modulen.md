---
tags: [arkitektur, moduler, eksamen]
oppdatert: 2026-09-03
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

## Flervalg rettes automatisk

Lagt til 3. september 2026 for [[FIE432 Personlig økonomi]], der alle
eksamener siden 2020 er ren flervalg. En oppgave eller deloppgave med `options`
og `answer` tegnes med quizens alternativknapper og rettes ved avsløring
(øving) eller levering (eksamen):

```js
{ n: 1, title: "Skjerming", points: 1, body: "<p>…</p>",
  options: ["<p>100</p>", "200", "300"],   // rå HTML, som body
  answer: 1,                                // indeks — eller [0, 1] når fasiten godtar flere
  solution: "<p>…</p>" }
```

Poeng: riktig gir oppgavens poeng, galt gir poeng × `wrongFactor`, ubesvart 0.
Faktoren er 0 der feil svar ikke straffes, og −1/3 i formatet med minuspoeng
(3 for rett, −1 for feil, fire alternativer — forventet verdi av å gjette
blindt er null). Settet setter forvalget i `set.mc.wrongFactor`; i
eksamensmodus velges den per økt med en avkrysning på startkortet, så et eldre
sett uten straff kan kjøres slik eksamen faktisk blir. Valget lagres i
`<settId>-run.wrongFactor`.

Valgene lagres i `<settId>-e<n>.valg` som `{ "<deletikett>": indeks }` (nøkkel
`""` for en oppgave uten deler). Å klikke det valgte alternativet en gang til
fjerner svaret — med minuspoeng er «blankt» en ekte strategi. Den automatiske
poengsummen skrives inn som oppgavens `score`, så sum, ring og settkort
trenger ikke vite om flervalg. Åpne oppgaver i samme sett vurderes fortsatt selv.

Resultatkortet viser også hva settet ville gitt under den *andre* regelen —
så du ser hva gjettingen kostet eller ville kostet.

> [!warning] Eksamensstart nullstiller oppgavene
> `startRun()` sletter `valg`, `revealed` og `score` for hele settet. Før dette
> ble valg og poeng fra øvingsmodus med inn i eksamensresultatet, og et
> flervalg du alt hadde sett fasiten på, telte som riktig. Nullstill-knappen på
> settkortet vises nå også når settet bare er rørt i øvingsmodus.

> [!warning] Startkortets faktalinjer var FIE402s
> «Penn og papir», «formelarket utleveres» og «skriv på engelsk» sto hardkodet
> i motoren og ville blitt vist til et fag med digital flervalg på norsk.
> `set.facts` overstyrer listen; `set.practiceNote` overstyrer nøkkelsetningen
> i øvingsmodus. Uten feltene gjelder FIE402s tekst som før.

## Kontrollen

`tools/sjekk-sett.js` går gjennom `EDU_DATA.sets` og ser etter det modulen ellers
bare tegner feil:

```bash
node tools/sjekk-sett.js                    # alle fag/<id>/sett.js
node tools/sjekk-sett.js fag/fie432/sett.js
```

Den sjekker dupliserte sett-id-er og oppgavenumre (begge er lagringsnøkler),
at oppgavene summerer til settets `points` og deloppgavene til oppgavens,
at `answer` peker på et alternativ som finnes, at ikke alle alternativer er
markert riktige, at flervalg har `solution`, at selvvurderte oppgaver har det,
at `criteria` er ren tekst, at `mc.wrongFactor` ligger i [−1, 0], og at
`chapters` peker på kapitler manualen faktisk har. Testet mot et bevisst
ødelagt sett: fjorten feil, alle funnet.

## Lagring

| Nøkkel | Innhold |
|---|---|
| `state.exams["<settId>-run"]` | `{ mode, startedAt, submittedAt, wrongFactor }` — selve økta |
| `state.exams["<settId>-e<n>"]` | `{ revealed, score, scoredAt, valg }` per oppgave |

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
