/* ============== FIE432 · EKSAMENSSETTET HØSTEN 2024 ==============
   Oppgaveteksten er gjengitt ordrett fra sensorveiledningen. Løsningene er
   skrevet for dette programmet og er fyldigere enn veiledningen: hvert
   regnestykke står i steg, og hvert galt alternativ er sporet tilbake til den
   feilen det svarer til. Alle tall er kontrollregnet.

   To kjente trykkfeil i veiledningen er markert i løsningsteksten der de hører
   hjemme: oppgave 5 (17,1 % skal være 17,2 %) og oppgave 4c (22,42 % skal være
   22,40 %). Se docs/fie432-research/01-eksamens-dna.md § 7.

   id-en er lagringsnøkkel for selvvurdering og resultat — den må aldri endres.
   ================================================================= */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA._settH2024 = {
  id: "h2024",
  label: "Høsten 2024",
  date: "2024-12-09",
  minutes: 240,
  points: 48,
  format: "14 oppgaver · flervalg · kalkulator tillatt",
  note: "Det største settet i arkivet: 48 poeng fordelt på 14 oppgaver og 34 flervalgsledd. Schjelderup har oppgave 1–9 (28 poeng), en gjesteforeleser i internasjonal skatterett har oppgave 10 (9 poeng, én sammenhengende case), og Næss har finansdelen 11–14 (11 poeng). Tre ting gjør settet verdt å kjøre på tid: skjermingskjeden i oppgave 1 går over tre år med framført ubenyttet skjerming, oppgave 8 krever at du kjenner igjen insidensformelen blant fire nesten like uttrykk, og oppgave 10 er den eneste rene skatterettsblokken i hele materialet.",
  facts: [
    "Skoleeksamen i Wiseflow 9. desember 2024, 09:00–13:00.",
    "Rent flervalg med tre eller fire alternativer per ledd.",
    "«Ubesvarte spørsmål eller feil svar gir ikke minuspoeng.» Slå på minuspoeng for å trene 2026-forhold.",
    "Maksimal uttelling 48 poeng. Oppgave 8 alene er 9 poeng — tre ledd à 3.",
    "Kalkulator tillatt. Oppgave 5 og 7 ber uttrykkelig om avrunding til én desimal.",
  ],
  practiceNote: "Regn hvert ledd ferdig på papir før du åpner løsningen — særlig oppgave 1, der år 3 bygger på ubenyttet skjerming framført fra år 2.",
  mc: { wrongFactor: 0 },
  exercises: [

    /* ---------------------------------------------------------------- 1 */
    { n: 1, title: "Skjermingsfradrag over tre år", points: 4, topic: "Skjerming og utbytte",
      chapters: [5],
      body: "<p>Kaia eier en aksje som hun har betalt kr 10 000 for. Skjermingsrenten er 2 prosent i alle år.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hva er skjermingsfradraget i år 1</p>",
          options: ["Kr 100", "Kr 200", "Kr 300", "Kr 50"],
          answer: 1,
          solution: "<p><b>Steg 1 — skjermingsgrunnlaget.</b> I det første året er skjermingsgrunnlaget aksjens inngangsverdi, altså det Kaia betalte: kr 10 000. Ingenting er framført ennå.</p>"
            + "<p><b>Steg 2 — fradraget.</b> Skjermingsfradrag = skjermingsgrunnlag × skjermingsrente = 10 000 × 2 % = <b>kr 200</b>.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> Alle tre er samme regnestykke med feil rente: kr 100 er 1 %, kr 300 er 3 %, kr 50 er 0,5 %. Det finnes ingen annen tenkelig feil å gjøre her, og det er nettopp derfor leddet er gratis poeng — les renten i oppgaveteksten og gang.</p>"
            + "<p><b>Regelen:</b> skjermingsfradraget er skjermingsgrunnlaget ganget med årets skjermingsrente, og grunnlaget i første år er alltid kostprisen.</p>"
            + "<p><b>Kontroll:</b> 1 % av 10 000 er 100, så 2 % er 200. ✓</p>" },

        { label: "b", points: 1,
          body: "<p>Kaia mottar kr 500 i utbytte i år 1. Hva er skattepliktig utbytte i år 1?</p>",
          options: ["Kr 200", "Kr 300", "Kr 400", "Kr 100"],
          answer: 1,
          solution: "<p><b>Steg 1.</b> Skattepliktig utbytte = mottatt utbytte − skjermingsfradrag = 500 − 200 = <b>kr 300</b>.</p>"
            + "<p><b>Steg 2 — hva skjer med resten.</b> Utbyttet på 500 var større enn skjermingen på 200, så hele skjermingsfradraget er brukt opp. Det framføres <b>ingenting</b> til år 2. Dette er informasjonen du trenger i deloppgave c, og det er lett å tro det motsatte.</p>"
            + "<p><b>Merk hva spørsmålet spør om.</b> «Skattepliktig utbytte» er <i>grunnlaget</i>, ikke skatten. Skatten ville vært 300 × 1,72 × 22 % = kr 113,52. Ingen av alternativene er skattebeløp, så oppgaven ber om grunnlaget.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> Kr 200 er skjermingsfradraget selv — svaret på forrige spørsmål, ikke på dette. Kr 400 er 500 − 100, altså skjermingen regnet med 1 % rente. Kr 100 er 500 − 200 − 200, altså skjermingsfradraget trukket fra to ganger.</p>"
            + "<p><b>Regelen:</b> skjermingsfradraget trekkes fra utbyttet én gang, i det året det er beregnet.</p>" },

        { label: "c", points: 1,
          body: "<p>I år 2 mottar Kaia kr 100 i utbytte. Hva blir skattepliktig utbytte i år 2?</p>",
          options: ["Kr 100", "Kr 200", "Kr 0", "Kr 300"],
          answer: 2,
          solution: "<p><b>Steg 1 — grunnlaget i år 2.</b> Fra deloppgave b vet du at hele skjermingen ble brukt opp i år 1. Grunnlaget er derfor fortsatt kostprisen alene: kr 10 000.</p>"
            + "<p><b>Steg 2 — årets fradrag.</b> 10 000 × 2 % = kr 200.</p>"
            + "<p><b>Steg 3 — skattepliktig utbytte.</b> 100 − 200 = −100. Skjermingsfradraget kan ikke gjøre inntekten negativ, så skattepliktig utbytte settes til <b>kr 0</b>.</p>"
            + "<p><b>Steg 4 — det du må huske til neste deloppgave.</b> De kr 100 som ikke ble brukt, går ikke tapt. De framføres som <b>ubenyttet skjerming</b> på denne aksjen, og de skal både legges til skjermingsgrunnlaget i år 3 <i>og</i> komme til fradrag i år 3. Skriv tallet ned nå.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> Kr 100 er den ubenyttede skjermingen — riktig tall, feil spørsmål; det er også svaret du får hvis du snur fortegnet på −100. Kr 200 er skjermingsfradraget. Kr 300 er fjorårets svar, som ikke har noe her å gjøre.</p>"
            + "<p><b>Regelen:</b> skjerming som overstiger utbyttet gir aldri negativ skattepliktig inntekt og aldri et fradragsberettiget tap. Overskuddet framføres, aksje for aksje.</p>" },

        { label: "d", points: 1,
          body: "<p>I år 3 mottar Kaia kr 400 i utbytte. Hva blir skattepliktig utbytte i år 3?</p>",
          options: ["Kr 202", "Kr 100", "Kr 302", "Kr 98"],
          answer: 3,
          solution: "<p>Dette er leddet hele oppgaven er bygget mot. Den framførte skjermingen teller <b>to ganger</b>: den øker grunnlaget, og den kommer i tillegg til fradrag i seg selv. Alternativene er laget slik at hver av de tre delene av regnestykket har sitt eget gale svar.</p>"
            + "<table class=\"data\"><tr><th>År</th><th>Grunnlag</th><th>Årets fradrag</th><th>Framført inn</th><th>Samlet fradrag</th><th>Utbytte</th><th>Skattepliktig</th><th>Framført ut</th></tr>"
            + "<tr><td>1</td><td class=\"n\">10 000</td><td class=\"n\">200</td><td class=\"n\">0</td><td class=\"n\">200</td><td class=\"n\">500</td><td class=\"n\">300</td><td class=\"n\">0</td></tr>"
            + "<tr><td>2</td><td class=\"n\">10 000</td><td class=\"n\">200</td><td class=\"n\">0</td><td class=\"n\">200</td><td class=\"n\">100</td><td class=\"n\">0</td><td class=\"n\">100</td></tr>"
            + "<tr><td>3</td><td class=\"n\">10 100</td><td class=\"n\">202</td><td class=\"n\">100</td><td class=\"n\">302</td><td class=\"n\">400</td><td class=\"n\">98</td><td class=\"n\">0</td></tr></table>"
            + "<p><b>Steg 1 — grunnlaget i år 3.</b> Kostpris + framført ubenyttet skjerming = 10 000 + 100 = kr 10 100.</p>"
            + "<p><b>Steg 2 — årets fradrag.</b> 10 100 × 2 % = kr 202.</p>"
            + "<p><b>Steg 3 — samlet fradrag.</b> Årets fradrag pluss den framførte skjermingen: 202 + 100 = kr 302.</p>"
            + "<p><b>Steg 4 — skattepliktig utbytte.</b> 400 − 302 = <b>kr 98</b>.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> Kr 202 er årets fradrag alene — du glemte å legge til den framførte skjermingen i selve fradraget. Kr 302 er det samlede fradraget, altså riktig mellomresultat på feil linje. Kr 100 er den framførte skjermingen alene.</p>"
            + "<p><b>Kontroll — to blindveier som bekrefter at du gjorde det riktig.</b> Hadde du glemt framføringen helt, ville svaret blitt 400 − 200 = 200. Hadde du bare lagt den til grunnlaget uten å trekke den fra i tillegg, ville svaret blitt 400 − 202 = 198. Ingen av de to tallene er blant alternativene — oppgaven forutsetter altså begge virkningene av framføringen.</p>"
            + "<p><b>Regelen:</b> ubenyttet skjerming legges til skjermingsgrunnlaget <i>og</i> kommer til fradrag. Skjermingen er personlig og aksjevis, så den følger den enkelte aksjen.</p>" },
      ] },

    /* ---------------------------------------------------------------- 2 */
    { n: 2, title: "Skatt på aksjegevinst med ubenyttet skjerming", points: 1, topic: "Gevinst og oppjustering",
      chapters: [5],
      body: "<p>Runar kjøpte en aksje for kr 50 i år 1 og selger den på slutten av år 2 for kr 60. Han har et ubenyttet skjermingsfradrag på kr 5. Hva betaler Runar i skatt på aksjegevinsten sin? Eierskatten er 22% og oppjusteringsfaktoren 1,72.</p>",
      options: ["Kr 3,89", "Kr 0", "Kr 3,1", "Kr 1,89"],
      answer: 3,
      solution: "<p><b>Steg 1 — gevinsten.</b> Salgspris − kostpris − ubenyttet skjerming = 60 − 50 − 5 = <b>kr 5</b>.</p>"
        + "<p><b>Steg 2 — oppjusteringen.</b> Gevinsten oppjusteres med f = 1,72: 5 × 1,72 = 8,60.</p>"
        + "<p><b>Steg 3 — skatten.</b> 8,60 × 22 % = 1,892 → <b>kr 1,89</b>.</p>"
        + "<p><b>Kontroll — samme tall den andre veien.</b> Oppjusteringen kan gjøres på satsen i stedet for på grunnlaget: t<sub>e</sub> = 22 % × 1,72 = 37,84 %, og 5 × 37,84 % = 1,892. ✓ Begge veier er tillatt, og å regne begge er den billigste kontrollen som finnes i dette kurset.</p>"
        + "<p><b>Hvorfor de andre er gale.</b></p>"
        + "<p>· <b>Kr 3,89</b> ligger på det nivået du havner på hvis du glemmer den ubenyttede skjermingen og skatter av hele gevinsten på kr 10: 10 × 1,72 × 22 % = 3,78. Legg merke til at det er omtrent <i>det dobbelte</i> av riktig svar — dobbelt så mye er signaturen på et glemt skjermingsfradrag når skjermingen er halvparten av gevinsten.</p>"
        + "<p>· <b>Kr 3,1</b> er samme glemte skjerming kombinert med den gamle oppjusteringsfaktoren 1,4: 10 × 1,4 × 22 % = 3,08. Oppgaven oppgir 1,72 — bruk alltid satsen oppgaven gir, ikke den du husker fra et annet år.</p>"
        + "<p>· <b>Kr 0</b> forutsetter at skjermingen spiser hele gevinsten. Det ville krevd ubenyttet skjerming på kr 10, ikke kr 5.</p>"
        + "<p><b>Regelen:</b> ved salg trekkes både kostprisen og all framført ubenyttet skjerming fra salgssummen. Restgevinsten oppjusteres med f og skattlegges med 22 %. Ubenyttet skjerming kan redusere en gevinst til null, men kan aldri skape et fradragsberettiget tap.</p>" },

    /* ---------------------------------------------------------------- 3 */
    { n: 3, title: "Avskrivning nå eller over ti år", points: 2, topic: "Fradragets tidsverdi",
      chapters: [2],
      body: "<p>Turid eier et forretningsbygg. Hun har leid det ut slik at hun har en årlig leieinntekt de neste 10 årene på kr 100 000. Selskapsskatten er 22% og oppjusteringsfaktoren 1,72. Hun har ingen andre kostnader enn avskrivninger på forretningsbygget. Når Turid leverer sin skattemelding kan hun velge om hun hvert år de neste 10 årene kan føre bygningsavskrivninger på kr 10 000 mot årlig leieinntekt eller hun kan velge å utgiftsføre hele avskrivningen som utgjør kr 100 000 med en gang. Turid diskonterer inntektene sine med rente lik 10%. Hva bør Turid velge?</p>",
      options: ["Ta hele avskrivningen med en gang", "Ta avskrivningene årlig over 10 år", "Det spiller ingen rolle hva Turid gjør"],
      answer: 0,
      solution: "<p><b>Steg 1 — skattebesparelsen ved å vente.</b> Avskriver hun kr 10 000 i året, sparer hun 10 000 × 22 % = kr 2 200 i skatt hvert år i ti år.</p>"
        + "<p><b>Steg 2 — nåverdien av de ti beløpene.</b> Annuitetsfaktoren ved 10 % over 10 år er (1 − 1,10<sup>−10</sup>)/0,10 = 6,1446. Nåverdi = 2 200 × 6,1446 = <b>kr 13 518</b>.</p>"
        + "<p><b>Steg 3 — skattebesparelsen ved å ta alt nå.</b> 100 000 × 22 % = <b>kr 22 000</b>, mottatt i dag.</p>"
        + "<p><b>Steg 4 — sammenligningen.</b> 22 000 mot 13 518. Å ta hele avskrivningen med en gang er verdt <b>kr 8 482</b> mer i nåverdi. Riktig svar er det første alternativet.</p>"
        + "<p><b>Forutsetningen du må sjekke.</b> Fradraget er bare verdt noe hvis det finnes inntekt å føre det mot. Leieinntekten i år 1 er kr 100 000, som dekker hele avskrivningen på kr 100 000 nøyaktig. Hadde inntekten vært mindre, ville deler av fradraget måttet framføres, og regnestykket ville sett annerledes ut.</p>"
        + "<p><b>Hvorfor de andre er gale.</b></p>"
        + "<p>· <b>«Ta avskrivningene årlig over 10 år»</b> ville vært riktig bare hvis renten var null, eller hvis hun ikke hadde nok inntekt i år 1 til å bruke fradraget.</p>"
        + "<p>· <b>«Det spiller ingen rolle»</b> er svaret du får hvis du sammenligner udiskonterte kroner: 10 × 2 200 = 22 000 = 100 000 × 22 %. Nominelt er beløpene identiske. Det er hele fellen — det er <i>tidspunktet</i> som skiller dem, og renten på 10 % koster henne kr 8 482.</p>"
        + "<p><b>Distraktor i oppgaveteksten:</b> oppjusteringsfaktoren 1,72 har ingenting her å gjøre. Den gjelder utbytte og aksjegevinst hos en personlig aksjonær, ikke skatt på leieinntekt. Eksamen tar med satser du ikke skal bruke.</p>"
        + "<p><b>Regelen:</b> et fradrag er verdt mer jo tidligere det tas, fordi skattebesparelsen diskonteres. Ta fradraget så tidlig som inntekten tillater.</p>" },
