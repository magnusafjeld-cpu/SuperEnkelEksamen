/* ===================== FIE432 · TIDLIGERE EKSAMENSSETT =====================
   Ordrett gjengitt oppgavetekst med egne, fullstendige løsninger. Kjøres av
   modulen /sett (js/bundle-sett.js) i øvingsmodus eller på tid.

   Alle settene er flervalg. Ingen av dem hadde minuspoeng, men eksamen høsten
   2026 har det — slå det på i eksamensmodus for å trene riktige forhold.

   id-ene er lagringsnøkler for svar og selvvurdering. De må aldri endres.
   ========================================================================= */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.sets = [
{
  id: "h2025",
  label: "Høsten 2025",
  date: "2025-11-14",
  minutes: 240,
  points: 29,
  format: "17 oppgaver · 29 flervalg · fire alternativer · kalkulator tillatt",
  note: "Schjelderups siste sett før minuspoengene, og det settet som ligner mest på det du møter i 2026. Tjueni delspørsmål à ett poeng på fire timer: oppgave 1–10 er skattedelen hans (17 poeng), oppgave 11–17 er Næss' finansdel (12 poeng). Settet er tyngre på formuesskatt som avkastningsskatt enn noe tidligere sett — oppgave 3, 6 og 9 gir seks poeng på det temaet alene — og internasjonal skatt er helt fraværende. To oppgaver har mer enn ett godtatt svar, og oppgave 1 har en dokumentert trykkfeil i veiledningen.",
  facts: [
    "Skoleeksamen i Wiseflow 14. november 2025, 09:00–13:00, fire timer.",
    "17 oppgaver, 29 delspørsmål, ett poeng hvert. Fire alternativer overalt.",
    "Kalkulator og én tospråklig ordbok tillatt.",
    "«Ubesvarte spørsmål eller feil svar gir ikke minuspoeng.» Slå på minuspoeng for å trene 2026-forhold.",
    "Oppgave 1–10: Guttorm Schjelderup (skatt). Oppgave 11–17: Ole-Andreas Næss (finans).",
  ],
  practiceNote: "Regn ferdig før du ser på alternativene. Tre av fire er laget for å fange én bestemt feil, og i denne eksamenen er lokkealternativet ofte svaret på et annet delspørsmål i samme oppgave.",
  mc: { wrongFactor: 0 },
  exercises: [

    /* ---------------------------------------------------------------- 1 --- */
    {
      n: 1,
      title: "Utbytte, skjerming og formuesskatt over to år",
      points: 1,
      topic: "Aksjonærmodellen",
      chapters: [5, 7],
      body: "<p>Per har kjøpt børsnoterte aksjer i Norske Skog AS i 2023 for kr 10 000 000 som er aksjenes kostpris. Han har rett til utbytte i 2023 og 2024. I 2023 mottar Per utbytte på 500 000 og skjermingsrenten er 2 prosent. I 2024 mottar Per utbytte på kr 600 000 og skjermingsrenten er 4 prosent. Anta at eierskatten er 40 % og at formuesskatten er 1 %. Aksjer gis en rabatt på 20 % av formuesverdien. Aksjene til Per har samme børsverdi i 2024 som kostprisen i 2023. Du kan se bort fra bunnfradrag.</p><p>Hvor mye sitter Per igjen med av de utbetalte utbyttene etter at han har betalt eierskatt og formuesskatt?</p>",
      options: ["Kr 0", "Kr 630 000", "Kr 580 000", "Kr 740 000"],
      answer: 3,
      solution: "<p><b>Regnestykket.</b> To skatter treffer samme aksjepost, og de har hvert sitt grunnlag: eierskatten treffer utbyttet minus skjermingsfradraget, formuesskatten treffer aksjenes formuesverdi ved inngangen til hvert år.</p><p><b>Steg 1 — skjermingsgrunnlaget.</b> Kostprisen er kr 10 000 000. Utbyttet er begge år større enn skjermingsfradraget, så det oppstår <b>ingen</b> ubenyttet skjerming å framføre. Grunnlaget er derfor 10 000 000 i begge år.</p><p><b>Steg 2 — eierskatten i 2023.</b> Skjermingsfradrag = 10 000 000 × 2 % = <b>200 000</b>. Skattepliktig utbytte = 500 000 − 200 000 = 300 000. Eierskatt = 300 000 × 40 % = <b>120 000</b>.</p><p><b>Steg 3 — eierskatten i 2024.</b> Skjermingsfradrag = 10 000 000 × 4 % = <b>400 000</b>. Skattepliktig utbytte = 600 000 − 400 000 = 200 000. Eierskatt = 200 000 × 40 % = <b>80 000</b>. Samlet eierskatt over de to årene: 120 000 + 80 000 = <b>200 000</b>.</p><p><b>Steg 4 — formuesskatten.</b> Formuesverdien er børsverdien etter aksjerabatt: 10 000 000 × (100 % − 20 %) = 8 000 000. Formuesskatt per år = 8 000 000 × 1 % = <b>80 000</b>. Børsverdien er uendret, så begge år gir samme beløp: 2 × 80 000 = <b>160 000</b>.</p><p><b>Steg 5 — det Per sitter igjen med.</b> Mottatt utbytte 500 000 + 600 000 = 1 100 000.</p><table class=\"data\"><tr><th>Post</th><th>Beløp</th></tr><tr><td>Mottatt utbytte 2023 + 2024</td><td class=\"n\">1 100 000</td></tr><tr><td>− eierskatt</td><td class=\"n\">−200 000</td></tr><tr><td>− formuesskatt (2 år)</td><td class=\"n\">−160 000</td></tr><tr><td><b>Igjen</b></td><td class=\"n\"><b>740 000</b></td></tr></table><p><b>Kontroll.</b> Samlet skatt er 360 000 av 1 100 000, altså en effektiv skattesats på 32,73 % — lavere enn eierskatten på 40 %, fordi skjermingen tar 600 000 av utbyttet ut av grunnlaget, og høyere enn den ville vært uten formuesskatten. Regnet motsatt vei: 1 100 000 × (1 − 0,3273) = 740 000. ✓</p><p><b>Trykkfeil i sensorveiledningen.</b> Veiledningen skriver i én setning at «samlet utbytteskatt og formuesskatt for disse åren er henholdsvis kr 200 000 og kr 120 000». Tallet 120 000 er feil: avsnittet rett over regner selv 80 000 per år i to år, altså 160 000, og sluttsvaret 740 000 forutsetter 160 000. Beløpet 120 000 er eierskatten for 2023 som har sneket seg inn på feil linje. <b>Riktig alternativ, 740 000, er ikke berørt.</b> Merk at feilen ikke treffer noe alternativ heller: 1 100 000 − 200 000 − 120 000 = 780 000 finnes ikke i listen.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 580 000</b> — du har brukt skjermingsfradraget fra 2023 og glemt fradraget for 2024: 1 100 000 − 40 % × (1 100 000 − 200 000) − 160 000 = 1 100 000 − 360 000 − 160 000 = 580 000. Skjermingsfradraget beregnes <i>hvert år</i>, med årets skjermingsrente.</p><p><b>Kr 0</b> — «skatten spiser hele utbyttet». Den gjør ikke det: samlet skattetrykk er en tredel. Alternativet er der for den som ikke rekker å regne.</p><p><b>Kr 630 000</b> — svarer ikke til noen regnevei i det hele tatt. Det er et rent lokkealternativ, plassert mellom 580 000 og 740 000.</p><p><b>De vanlige feilene som <i>ikke</i> har noe alternativ.</b> Glemmer du formuesskatten helt, får du 900 000. Regner du formuesskatt av full børsverdi uten aksjerabatten, får du 700 000. Ingen av dem står i listen. Det er et signal du skal lære å bruke: <b>treffer tallet ditt ingen av alternativene, har du gjort en feil — gå tilbake, ikke gjett på nærmeste.</b></p><p><b>Regelen.</b> Utbytteskatt og formuesskatt regnes uavhengig, med hvert sitt grunnlag: eierskatten på (utbytte − skjermingsfradrag) og formuesskatten på (markedsverdi × (1 − rabatt)), én gang per år formuen eies.</p>",
    },

    /* ---------------------------------------------------------------- 2 --- */
    {
      n: 2,
      title: "Nettoformue med forholdsmessig gjeldsfordeling",
      points: 1,
      topic: "Formuesskatt",
      chapters: [7],
      body: "<p>Gunhild har 5 000 000 kroner i gjeld. Hun har en formue før verdsettingsrabatter på 10 000 000 kroner fordelt på en primærbolig med markedsverdi på 5 000 000 som har 75 prosent verdsettingsrabatt, og aksjefondsandeler med markedsverdi 5 000 000 som har 20 prosent verdsettingsrabatt.</p><p>Hva er Gunhilds skattepliktige nettoformue? Du kan se bort fra bunnfradrag.</p>",
      options: ["750 000", "250 000", "− 250 000", "− 750 000"],
      answer: [0, 1],
      solution: "<p><b>Fasiten godtar to svar: 750 000 og 250 000.</b> Sensorveiledningen sier det uttrykkelig, fordi oppgaven ikke spesifiserer om gjelden skal avkortes. Begge er markert riktige her. Regn likevel hovedveien først — 750 000 er den som følger loven.</p><p><b>Steg 1 — fordelingsnøkkelen er bruttoverdiene, før rabatt.</b> Primærbolig 5 000 000 og aksjefond 5 000 000 av til sammen 10 000 000, altså 50 % på hver. Det er her folk bommer: nøkkelen er <i>ikke</i> formuesverdiene etter rabatt.</p><p><b>Steg 2 — gjelden fordeles.</b> 5 000 000 × 50 % = 2 500 000 på hvert aktivum.</p><p><b>Steg 3 — formuesverdiene.</b> Primærbolig: 5 000 000 × (1 − 75 %) = 1 250 000. Aksjefond: 5 000 000 × (1 − 20 %) = 4 000 000. Sum formuesverdi 5 250 000.</p><p><b>Steg 4 — fradragsberettiget gjeld.</b> Gjelden som er henført til et aktivum med verdsettingsrabatt, avkortes med <i>samme</i> rabatt — men bare for aksjer og aksjefond, ikke for primærbolig. Bolig: 2 500 000 (uendret). Aksjefond: 2 500 000 × (1 − 20 %) = 2 000 000. Sum 4 500 000.</p><table class=\"data\"><tr><th>Post</th><th>Primærbolig</th><th>Aksjefond</th><th>Sum</th></tr><tr><td>Markedsverdi</td><td class=\"n\">5 000 000</td><td class=\"n\">5 000 000</td><td class=\"n\">10 000 000</td></tr><tr><td>Andel av bruttoformuen</td><td class=\"n\">50 %</td><td class=\"n\">50 %</td><td class=\"n\">100 %</td></tr><tr><td>Gjeld henført</td><td class=\"n\">2 500 000</td><td class=\"n\">2 500 000</td><td class=\"n\">5 000 000</td></tr><tr><td>Formuesverdi etter rabatt</td><td class=\"n\">1 250 000</td><td class=\"n\">4 000 000</td><td class=\"n\">5 250 000</td></tr><tr><td>Fradragsberettiget gjeld</td><td class=\"n\">2 500 000</td><td class=\"n\">2 000 000</td><td class=\"n\">4 500 000</td></tr><tr><td><b>Nettoformue</b></td><td class=\"n\">−1 250 000</td><td class=\"n\">2 000 000</td><td class=\"n\"><b>750 000</b></td></tr></table><p><b>Kontroll.</b> Regn samme tall som sum i stedet for per aktivum: 5 250 000 − 4 500 000 = 750 000. ✓ Og legg merke til at kolonnene summerer: −1 250 000 + 2 000 000 = 750 000. En negativ nettoformue på boligen er helt i orden; det er summen som skattlegges.</p><p><b>Den andre godtatte veien.</b> Uten gjeldsavkorting trekkes hele gjelden fra: 5 250 000 − 5 000 000 = <b>250 000</b>. Forskjellen på de to svarene er nøyaktig avkortingen, 2 500 000 × 20 % = 500 000. Sensor godtok dette fordi oppgaveteksten ikke sier at avkortingen skal brukes.</p><p><b>Hvorfor de gale alternativene er gale.</b> <b>− 250 000</b> og <b>− 750 000</b> er de to riktige tallene med snudd fortegn. De fanger den som regner <i>gjeld minus formue</i> i stedet for <i>formue minus gjeld</i>. Rekkefølgen er alltid formuesverdi først; nettoformue er det som er igjen når gjelden er trukket fra, ikke omvendt.</p><p><b>Regelen.</b> Gjeld fordeles forholdsmessig etter aktivaenes <i>bruttoverdi</i>. Gjeld henført til aktiva med verdsettingsrabatt avkortes med samme prosent — for aksjer, aksjefond og driftsmidler, men ikke for primærbolig. Et negativt bidrag fra ett aktivum motregnes mot de andre.</p><p><b>På eksamen med minuspoeng:</b> når to alternativer begge kan forsvares, velg det som følger regelen slik den er lært — her 750 000 — og gå videre. Fortegnsfellene under kan du utelukke på ett sekund, og det alene gjør det lønnsomt å svare.</p>",
    },
    /* ---------------------------------------------------------------- 3 --- */
    {
      n: 3,
      title: "Formuesskatt som avkastningsskatt, og verdsetting av en evig kontantstrøm",
      points: 4,
      topic: "Formuesskatt som avkastningsskatt",
      chapters: [2, 8],
      body: "<p>Anta at kapitalmarkedet er effisient slik at alle investeringer i samme risikoklasse oppnår den samme avkastningen. En investor foretar en aksjeinvestering ved periodens begynnelse på kr 200 millioner som gir en kontantstrøm på 10 millioner kroner ved periodens slutt. Ved periodens slutt selges investeringen for kr 200 millioner. Du kan se bort fra skatt på kapitalavkastning, aksjerabatten på formuesverdi av aksjene og bunnfradrag ved formuesskatten.</p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Hva er avkastningen på investeringen i perioden til en investor som ikke betaler skatt?</p>",
          options: ["4 %", "5 %", "6 %", "3 %"],
          answer: 1,
          solution: "<p><b>Steg 1 — de to avkastningskomponentene.</b> Totalavkastning = direkteavkastning + kapitalgevinst. Investeringen koster 200 ved periodens begynnelse og selges for 200 ved periodens slutt, så <b>kapitalgevinsten er null</b>. Hele avkastningen ligger i kontantstrømmen på 10.</p><p><b>Steg 2 — regn.</b> r = 10/200 = 0,05 = <b>5 %</b>.</p><p><b>Kontroll.</b> Sluttverdi for investoren er 200 + 10 = 210 på en innsats på 200: 210/200 − 1 = 5 %. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>4 %</b> — det er svaret på neste delspørsmål, altså avkastningen <i>etter</i> formuesskatt. Her står det uttrykkelig at investoren ikke betaler skatt. Dette er settets favorittfelle: lokkealternativet er nabospørsmålets fasit.</p><p><b>6 %</b> — (10 + 2)/200. Du har lagt formuesskatten på 2 millioner <i>til</i> kontantstrømmen i stedet for å trekke den fra (og skulle uansett ikke ha regnet den med her).</p><p><b>3 %</b> — (10 − 2 − 2)/200. Formuesskatten trukket fra to ganger.</p><p><b>Regelen.</b> Periodeavkastning = (kontantstrøm + verdiendring)/inngående kapital. Når salgsprisen er lik kjøpsprisen, er direkteavkastningen hele avkastningen.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>Anta at investoren må betale 1 % i formuesskatt av aksjeinvesteringen på 200 mill. Hva blir avkastningen på investeringen nå?</p>",
          options: ["3 %", "4 %", "5 %", "6 %"],
          answer: 1,
          solution: "<p><b>Steg 1 — hva formuesskatten faller på.</b> Formuesskatten treffer formuen ved <i>inngangen</i> til perioden, altså de 200 millionene som er investert. Skatten er 200 × 1 % = <b>2 millioner</b>.</p><p><b>Steg 2 — avkastningen etter formuesskatt.</b> r = (10 − 2)/200 = 0,04 = <b>4 %</b>.</p><p><b>Kontroll — det er dette som menes med at formuesskatten er en avkastningsskatt.</b> Skriv den om: (10 − 2)/200 = 10/200 − 2/200 = r − τ<sub>w</sub> = 5 % − 1 % = 4 %. En formuesskatt på τ<sub>w</sub> som faller på inngående formue, trekker nøyaktig τ<sub>w</sub> prosentpoeng fra avkastningen, uansett hvor høy avkastningen er. Regnet som en skatt på avkastningen tilsvarer det en sats på τ<sub>w</sub>/r = 1 %/5 % = 20 % (det er oppgave 9 i dette settet).</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>5 %</b> — avkastningen før formuesskatt. Du har glemt å trekke fra, eller lest forrige delspørsmål på nytt.</p><p><b>3 %</b> — 2 millioner trukket fra to ganger, eller formuesskatt regnet både av inngående og utgående formue.</p><p><b>6 %</b> — formuesskatten lagt til i stedet for trukket fra.</p><p><b>Regelen.</b> Avkastning etter formuesskatt = r − τ<sub>w</sub> når skatten faller på formuen ved inngangen til perioden. Dette er alternativkostnaden du skal bruke i alle senere delspørsmål der investoren betaler formuesskatt.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Anta nå at investoren har funnet en annen aksjeinvestering i samme risikoklasse som investeringen på kr 200 mill. Denne investeringen gir en årlig evigvarende kontantstrøm på kr 5 mill.</p><p>Hvordan verdsetter investoren denne aksjeinvesteringen dersom han ikke betaler formuesskatt?</p>",
          options: ["100 millioner", "200 millioner", "80 millioner", "150 millioner"],
          answer: 0,
          solution: "<p><b>Steg 1 — hvilken diskonteringsrente?</b> Markedet er effisient og investeringen er i <i>samme risikoklasse</i> som den første. Da må avkastningskravet være det samme: 5 % fra delspørsmål a. Denne setningen i oppgaveteksten er ikke pynt — den er selve nøkkelen som gir deg renten.</p><p><b>Steg 2 — nåverdien av en evig kontantstrøm.</b> V = CF/r = 5/0,05 = <b>100 millioner</b>.</p><p><b>Kontroll.</b> Snu regnestykket: en investering som koster 100 og gir 5 i året for alltid, har avkastning 5/100 = 5 %. Det er nøyaktig markedsavkastningen, altså riktig pris. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>200 millioner</b> — du har festet deg ved prisen på den <i>første</i> investeringen. Den er 200 fordi den gir 10 i året, ikke 5. Dobbel kontantstrøm, dobbel verdi.</p><p><b>80 millioner</b> — (5 − 1)/0,05. Du har trukket formuesskatten på 1 million fra kontantstrømmen, men brukt den <i>uskattede</i> renten på 5 % til å diskontere. Oppgaven sier dessuten uttrykkelig at han ikke betaler formuesskatt her. Denne halve justeringen er den vanligste feilen i hele temaet, og den kommer igjen i neste delspørsmål.</p><p><b>150 millioner</b> — svarer ikke til noen regnevei; det ligger midt mellom 100 og 200 for å friste den som ikke er sikker.</p><p><b>Regelen.</b> V = CF/r for en evig kontantstrøm. Renten hentes fra en investering i samme risikoklasse, og «samme risikoklasse» i oppgaveteksten betyr alltid «bruk renten du nettopp regnet ut».</p>",
        },
        {
          label: "d",
          points: 1,
          body: "<p>Anta nå at investoren må betale formuesskatt på 1 % av markedsverdien av aksjen som gir en evigvarende årlig inntekt på kr 5 mill. Anta at formuesverdien er bestemt av markedsverdien av kontantstrømmen. Hvordan verdsetter en investor som må betale formuesskatt på 1 % av markedsverdien denne investeringen?</p>",
          options: ["100 millioner", "200 millioner", "50 millioner", "95 millioner"],
          answer: 0,
          solution: "<p>Dette er settets fineste oppgave, og svaret overrasker: <b>formuesskatten endrer ikke verdien i det hele tatt.</b> V = <b>100 millioner</b>, akkurat som uten formuesskatt.</p><p><b>Steg 1 — alternativkostnaden er også etter formuesskatt.</b> Investoren betaler formuesskatt på alt han eier. Alternativet hans, investeringen på 200 millioner, gir derfor 4 % etter formuesskatt (delspørsmål b), ikke 5 %. Avkastningskravet er 4 %.</p><p><b>Steg 2 — kontantstrømmen er også etter formuesskatt.</b> Formuesverdien er markedsverdien V, så skatten er 0,01 × V. Netto kontantstrøm er 5 − 0,01V.</p><p><b>Steg 3 — sett opp likevektsbetingelsen og løs.</b> Investoren betaler den prisen som gjør at avkastningen etter formuesskatt akkurat er 4 %:</p><p>(5 − 0,01 × V)/V = 0,04<br>5/V − 0,01 = 0,04<br>5/V = 0,05<br>V = 5/0,05 = <b>100</b></p><p><b>Steg 4 — hvorfor det ble slik, generelt.</b> Skriv betingelsen med bokstaver, med τ<sub>w</sub> som formuesskattesats og r som avkastning før formuesskatt:</p><p>(CF − τ<sub>w</sub>V)/V = r − τ<sub>w</sub>  ⟺  CF/V − τ<sub>w</sub> = r − τ<sub>w</sub>  ⟺  <b>V = CF/r</b></p><p>Leddet τ<sub>w</sub> står på begge sider og stryker seg selv. Når formuesskatten treffer både investeringen og alternativet like hardt, og treffer begge på markedsverdien, er den <b>nøytral i verdsettingen</b>. Den senker investorens avkastning fra 5 % til 4 %, men ikke prisen han er villig til å betale.</p><p><b>Kontroll.</b> Sett V = 100 inn igjen: formuesskatt 1 million, netto kontantstrøm 5 − 1 = 4, avkastning 4/100 = 4 % — nøyaktig alternativkostnaden. Prisen er selvkonsistent. ✓</p><p><b>Når blir svaret et annet?</b> Bare hvis alternativet <i>ikke</i> rammes av samme formuesskatt. Da beholder du 5 % i nevneren og får (5 − 0,01V)/V = 0,05, altså V = CF/(r + τ<sub>w</sub>) = 5/0,06 = 83,3 millioner. Legg merke til at 83,3 <b>ikke er et alternativ</b> — nettopp fordi denne oppgaven har justert alternativkostnaden. Havner du på 83,3, har du glemt delspørsmål b.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>95 millioner</b> — «formuesskatten må jo ta litt av verdien», altså 100 − 5. Det er magefølelsen oppgaven er laget for å knuse: den tar av avkastningen, ikke av prisen.</p><p><b>50 millioner</b> — 5/0,10. Du har doblet avkastningskravet, eller trukket formuesskatten fra i telleren <i>og</i> lagt den til i nevneren. Dobbelttelling av samme skatt.</p><p><b>200 millioner</b> — igjen prisen på den første investeringen.</p><p><b>Regelen.</b> Verdsett alltid med en kontantstrøm og en diskonteringsrente som er på <i>samme</i> skattenivå. Er begge etter formuesskatt, forsvinner formuesskatten ut av prisen: V = CF/r. Er bare kontantstrømmen justert, får du V = CF/(r + τ<sub>w</sub>).</p>",
        },
      ],
    },
    /* ---------------------------------------------------------------- 4 --- */
    {
      n: 4,
      title: "Ubenyttet skjerming framført til året etter",
      points: 1,
      topic: "Skjerming",
      chapters: [5],
      body: "<p>Sindre eier en aksje i selskapet AS Gruve. Aksjen ble kjøpt 1. februar 2023 for kroner 100 og han hadde rett til utbytte i 2023 men selskapet betalte ikke utbytte dette året. Skjermingsrenten var 3,5 % i 2023. Sindre mottok utbytte i 2024 på kroner 20. Skjermingsrenten i 2024 var 4 %.</p><p>Hva er skattepliktig utbytte for Sindre i 2024? Benytt to desimaler i svaret.</p>",
      options: ["Kr 16,12", "Kr 13,64", "Kr 12,36", "Kr 11,50"],
      answer: 2,
      solution: "<p>Dette er kursets signaturoppgave, og hele poenget ligger i at ubenyttet skjerming gjør <b>to</b> ting samtidig: den framføres som eget fradrag, <i>og</i> den legges til skjermingsgrunnlaget slik at neste års fradrag blir større.</p><p><b>Steg 1 — skjermingsfradraget i 2023.</b> Skjermingsgrunnlaget er aksjens inngangsverdi, kr 100. Fradraget er 100 × 3,5 % = <b>3,50</b>. Selskapet betalte ikke utbytte, så hele beløpet står ubrukt og framføres.</p><p><b>Steg 2 — skjermingsgrunnlaget i 2024.</b> Ubenyttet skjerming legges til grunnlaget: 100 + 3,50 = <b>103,50</b>. Dette leddet er hele fellen.</p><p><b>Steg 3 — skjermingsfradraget i 2024.</b> 103,50 × 4 % = <b>4,14</b>.</p><p><b>Steg 4 — skattepliktig utbytte.</b> Utbyttet reduseres med både den framførte skjermingen og årets fradrag:</p><table class=\"data\"><tr><th>Post</th><th>Beløp</th></tr><tr><td>Utbytte 2024</td><td class=\"n\">20,00</td></tr><tr><td>− ubenyttet skjerming fra 2023</td><td class=\"n\">−3,50</td></tr><tr><td>− skjermingsfradrag 2024 (103,50 × 4 %)</td><td class=\"n\">−4,14</td></tr><tr><td><b>Skattepliktig utbytte</b></td><td class=\"n\"><b>12,36</b></td></tr></table><p><b>Kontroll 1 — la grunnlaget vokse.</b> Skjermingsgrunnlaget vokser med skjermingsrenten hvert år det ikke tas utbytte: 100 × 1,035 × 1,04 = 107,64. Samlet skjerming å bruke i 2024 er da 107,64 − 100 = <b>7,64</b>, som er nøyaktig 3,50 + 4,14. 20 − 7,64 = 12,36. ✓</p><p><b>Kontroll 2 — den framførte skjermingen forrenter seg.</b> 3,50 × 1,04 = 3,64, og grunnkostprisen gir 100 × 4 % = 4,00. Sammen 7,64. Samme svar, tredje vei. ✓ Det er dette som menes med at framført skjerming «forrentes»: den gir selv skjerming året etter.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 16,12</b> ligger i «du trakk bare fra ett av de to fradragene»-båndet. Trekker du bare fra den ubenyttede skjermingen får du 20 − 3,50 = 16,50; trekker du bare fra årets fradrag får du 20 − 4,00 = 16,00 eller 20 − 4,14 = 15,86. Alternativet er lagt midt i denne klyngen, slik at alle tre feilene lander på det.</p><p><b>Kr 13,64</b> og <b>Kr 11,50</b> svarer ikke til noen ren regnevei. De er nærmeste-nabo-lokkemidler på hver sin side av riktig svar, laget for å fange feiltasting og halvveis avrunding. Skriv derfor alltid ned mellomresultatene 3,50, 103,50 og 4,14 før du taster den siste subtraksjonen.</p><p><b>Feilen som ikke har noe alternativ.</b> Regner du årets skjerming på kostprisen i stedet for på det oppjusterte grunnlaget, får du 100 × 4 % = 4,00 og 20 − 3,50 − 4,00 = <b>12,50</b>. Det er den aller vanligste feilen i dette temaet, og den står ikke i listen. Får du 12,50, mangler du bare påslaget av den framførte skjermingen i grunnlaget — riktig svar er 12,36.</p><p><b>Regelen.</b> Ubenyttet skjerming framføres på den enkelte aksjen, legges til skjermingsgrunnlaget neste år, og trekkes fra utbyttet <i>i tillegg til</i> årets skjermingsfradrag. Skjermingsfradraget kan aldri gjøre skattepliktig utbytte negativt; overskytende framføres videre.</p>",
    },

    /* ---------------------------------------------------------------- 5 --- */
    {
      n: 5,
      title: "Effektiv skattesats når avskrivningen senker grunnlaget",
      points: 1,
      topic: "Effektiv skattesats",
      chapters: [1, 2],
      body: "<p>Et aksjeselskap har driftsinntekter i år 1 på kr 100 000 og har kjøpt en maskin til kr 50 000 som skal avskrives over 2 år med 25 000 i år 1 og 25 000 i år 2. Bedriftsskattesatsen er 22 %.</p><p>Hva er den effektive skattesatsen til bedriften i år 1?</p>",
      options: ["22 %", "20,5 %", "16,5 %", "18,4 %"],
      answer: 2,
      solution: "<p><b>Steg 1 — skattepliktig overskudd.</b> Driftsinntekt minus avskrivning: 100 000 − 25 000 = <b>75 000</b>.</p><p><b>Steg 2 — betalt skatt.</b> 75 000 × 22 % = <b>16 500</b>.</p><p><b>Steg 3 — effektiv skattesats.</b> Definisjonen er betalt skatt delt på <b>brutto inntekt</b>, ikke på skattepliktig inntekt:</p><p>16 500/100 000 = 0,165 = <b>16,5 %</b></p><p><b>Kontroll.</b> Regn det som en formel i stedet for i kroner: effektiv sats = t × (1 − avskrivning/bruttoinntekt) = 22 % × (1 − 25 000/100 000) = 22 % × 0,75 = 16,5 %. ✓ Avskrivningen tar en firedel av grunnlaget, og dermed en firedel av skattesatsen.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>22 %</b> — dette er selve feilen oppgaven tester. Deler du betalt skatt på <i>skattepliktig</i> inntekt, får du 16 500/75 000 = 22 %, altså den nominelle satsen igjen, og målet blir meningsløst: da vil den effektive satsen alltid være lik den nominelle. Nevneren må være brutto inntekt.</p><p><b>20,5 %</b> og <b>18,4 %</b> — svarer ikke til noen regnevei. De er plassert mellom 16,5 % og 22 % for å friste den som skjønner at svaret må ligge <i>under</i> 22 %, men ikke har regnet ferdig. Nettopp derfor er det viktig å fullføre regnestykket: å vite retningen er ikke nok når tre alternativer peker samme vei.</p><p><b>Feilen som ikke har noe alternativ.</b> Fører du hele maskinen på 50 000 til fradrag i år 1, får du (100 000 − 50 000) × 22 %/100 000 = 11 %. Det står ikke i listen. Oppgaven sier uttrykkelig at avskrivningen er 25 000 i hvert av de to årene.</p><p><b>Regelen.</b> Effektiv skattesats = betalt skatt / bruttoinntekt. Ethvert fradrag som ikke er en faktisk utbetaling i perioden — avskrivninger, framførte underskudd, skjerming — trekker den effektive satsen under den nominelle. For en eier tar du med både selskapsskatten og eierskatten i telleren og selskapets bruttooverskudd i nevneren.</p><p><b>Merk tidsprofilen.</b> I år 2 gjentar det samme seg hvis inntekten er den samme: 16,5 %. Over de to årene til sammen er skatten 33 000 av 200 000 i bruttoinntekt, altså også 16,5 %. Avskrivningen flytter ikke skatt mellom år her, den er jevnt fordelt; det er lineær avskrivning, ikke saldoavskrivning.</p>",
    },

    /* ---------------------------------------------------------------- 6 --- */
    {
      n: 6,
      title: "Utbyttet som må til for å betale formuesskatten",
      points: 1,
      topic: "Formuesskatt som avkastningsskatt",
      chapters: [8],
      body: "<p>Erna eier en bedrift som har formuesverdi på kr 100 000. Hun må betale 1 % i formuesskatt av formuesverdien. Hun har likviditetsutfordringer og må ta utbytte for å betale formuesskatten. Samtidig må hun sikre at utbyttet er stort nok til å betale eierskatten på 50 %.</p><p>Hvor stort utbytte må Erna ta for å dekke både formuesskatten og skatt på utbytte? Du kan se bort fra skjermingsfradrag, aksjerabatt på formuesverdi og bunnfradrag.</p>",
      options: ["Kr 2500", "Kr 2000", "Kr 1500", "Kr 1600"],
      answer: 1,
      solution: "<p><b>Steg 1 — hva regningen er.</b> Formuesskatt = 100 000 × 1 % = <b>kr 1 000</b>. Det er beløpet Erna må ha i hånden <i>etter</i> at utbyttet er beskattet.</p><p><b>Steg 2 — hva et utbytte gir henne netto.</b> Av et utbytte D betaler hun 50 % i eierskatt og beholder D × (1 − 50 %) = 0,5D.</p><p><b>Steg 3 — sett kravet og løs.</b></p><p>0,5 × D = 1 000  ⟹  D = 1 000/(1 − 0,50) = <b>kr 2 000</b></p><p><b>Kontroll.</b> Ta ut 2 000: eierskatt 2 000 × 50 % = 1 000, igjen 1 000, som er nøyaktig formuesskatten. ✓ Samlet skattebelastning på formuen er 2 000 av en formuesverdi på 100 000, altså <b>2 %</b> — dobbelt så mye som den nominelle formuesskattesatsen, fordi hver krone formuesskatt må hentes gjennom en utbyttebeskatning.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 1500</b> — du har lagt skatten <i>til</i> i stedet for å regne oppover: 1 000 × (1 + 50 %) = 1 500. Test det: et utbytte på 1 500 gir 750 etter eierskatt, og da mangler du 250 kroner på formuesskatten. Å gange opp med (1 + t) er ikke det samme som å dele på (1 − t), og forskjellen vokser fort med satsen.</p><p><b>Kr 2500</b> — 1 000/(1 − 0,60). Du har brukt 60 % i stedet for oppgavens 50 %.</p><p><b>Kr 1600</b> — 1 000/(1 − 0,3784) = 1 609, altså dagens eierskatt på 37,84 % (22 % × 1,72) i stedet for de 50 % oppgaven oppgir. Dette er den lærerike fellen i oppgaven: <b>bruk satsen som står i oppgaveteksten, ikke den du har pugget.</b> Med 2026-satsene ville svaret på nøyaktig samme spørsmål vært kr 1 609.</p><p><b>Regelen.</b> D = τ<sub>w</sub> × W/(1 − t<sub>e</sub>). Uttrykt som andel av formuen: den samlede belastningen blir τ<sub>w</sub>/(1 − t<sub>e</sub>), her 1 %/0,5 = 2 % av formuesverdien. Dette er forelesningens hovedargument mot formuesskatt for eiere uten likvide midler: skatten må finansieres med utbytte, og utbyttet beskattes igjen.</p>",
    },
    /* ---------------------------------------------------------------- 7 --- */
    {
      n: 7,
      title: "Bedriftens førsteordensbetingelse med delvis rentefradrag",
      points: 3,
      topic: "Bedriftens tilpasning",
      chapters: [9],
      body: "<p>En bedrift har profittfunksjonen P = F(K) − rK, hvor K er kapitalinnsatsen, F(K) er bedriftens inntekt gitt ved F(K) som har egenskapene F&prime;(K) &gt; 0 og F&Prime;(K) &lt; 0. Rentekostnaden for bruk av kapital er r. Skattefuten tillater bedriften å trekke fra en andel av rentene lik 0 &lt; A &lt; 1 fra inntekten F(K). La t være bedriftsskattesatsen.</p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Hvordan tilpasser bedriften optimal investering av kapital (K)?</p>",
          options: [
            "F&prime;(K) = r",
            "F&prime;(K) = <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">rA</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">1 &minus; t</span></span>",
            "F&prime;(K) = r · <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">1 &minus; At</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">1 &minus; t</span></span>",
            "F&prime;(K) = <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">r</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">(1 &minus; t)A</span></span>",
          ],
          answer: 2,
          solution: "<p><b>Steg 1 — sett opp verdien etter skatt.</b> Bedriften betaler hele rentekostnaden rK, men får bare trekke fra andelen A av den i skattegrunnlaget. Skattegrunnlaget er derfor F(K) − ArK, og verdien etter skatt er</p><p>V = F(K) − rK − t[F(K) − ArK]</p><p>Legg merke til at rK står to steder med to ulike roller: hele beløpet som faktisk kostnad, og bare andelen A som fradrag.</p><p><b>Steg 2 — deriver med hensyn på K og sett lik null.</b></p><p>dV/dK = F&prime;(K) − r − t[F&prime;(K) − rA] = 0</p><p><b>Steg 3 — samle leddene.</b></p><p>F&prime;(K)(1 − t) = r − trA = r(1 − At)<br>F&prime;(K) = r(1 − At)/(1 − t)</p><p><b>Kontroll med grensetilfellene — dette er også utelukkingsrutinen på eksamen.</b> Sett inn de to ytterpunktene for A og se hvilke alternativer som overlever:</p><table class=\"data\"><tr><th>Tilfelle</th><th>Riktig svar skal gi</th><th>r(1 − At)/(1 − t)</th></tr><tr><td>A = 1 (fullt rentefradrag)</td><td class=\"n\">r — skatten er nøytral</td><td class=\"n\">r(1 − t)/(1 − t) = r ✓</td></tr><tr><td>A = 0 (intet rentefradrag)</td><td class=\"n\">r/(1 − t) — høyere krav</td><td class=\"n\">r/(1 − t) ✓</td></tr></table><p>Med t = 22 % og A = 0,5 blir kravet r × (1 − 0,11)/0,78 = 1,141r, altså 14,1 % høyere marginalprodukt enn uten skatt. Uttrykket faller i A: jo mer av renten som er fradragsberettiget, jo lavere avkastningskrav og jo mer kapital brukes.</p><p><b>Hvorfor de gale alternativene er gale.</b> Grensetesten avslører alle tre:</p><p><b>F&prime;(K) = r</b> — dette er bare riktig i spesialtilfellet A = 1, altså full fradragsrett. Oppgaven sier uttrykkelig 0 &lt; A &lt; 1, så nøytralitet er utelukket.</p><p><b>F&prime;(K) = rA/(1 − t)</b> — sett A = 1 og du får r/(1 − t), altså svaret for <i>ingen</i> fradragsrett. Sett A = 0 og du får null: bedriften skulle investere til marginalproduktet er null når renten ikke kan trekkes fra. Begge grensene er snudd på hodet.</p><p><b>F&prime;(K) = r/[(1 − t)A]</b> — sett A = 1 og du får igjen r/(1 − t), som skulle vært r. Sett A → 0 og kravet går mot uendelig. Uttrykket vokser når fradragsretten bedres, som er feil vei.</p><p><b>Regelen.</b> Med skattesats t og fradragsandel A på rentene er kapitalkravet F&prime;(K) = r(1 − At)/(1 − t), som ligger mellom r (full fradragsrett, nøytralt) og r/(1 − t) (ingen fradragsrett, underinvestering). Nøytralitet krever at kapitalkostnaden er fradragsberettiget i samme grad som inntekten er skattepliktig.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>Anta at bedriften bruker både egenkapital (E) og gjeld (G) slik at K = E + G. Anta videre at gjeldskostnaden er r, og at bedriften ikke får trekke fra kostnadene knyttet til bruk av egenkapital. Hvordan tilpasser bedriften bruken av gjeld og egenkapital?</p>",
          options: [
            "F&prime;<sub>G</sub> = r og F&prime;<sub>E</sub> = r",
            "F&prime;<sub>G</sub> = r(1 &minus; t) og F&prime;<sub>E</sub> = r",
            "F&prime;<sub>G</sub> = <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">r</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">1 &minus; t</span></span> og F&prime;<sub>E</sub> = r(1 &minus; t)",
            "F&prime;<sub>G</sub> = r og F&prime;<sub>E</sub> = <span style=\"display:inline-block;vertical-align:middle;text-align:center;line-height:1.2\"><span style=\"display:block;padding:0 .35em\">r</span><span style=\"display:block;border-top:1px solid;padding:0 .35em\">1 &minus; t</span></span>",
          ],
          answer: 3,
          solution: "<p><b>Steg 1 — verdien etter skatt med to finansieringskilder.</b> Bare gjeldsrenten rG er fradragsberettiget; alternativkostnaden rE på egenkapitalen er en reell kostnad, men ingen skattemessig utgift:</p><p>V = F(E + G) − r(E + G) − t[F(E + G) − rG]</p><p><b>Steg 2 — førsteordensbetingelsen for gjeld.</b></p><p>∂V/∂G = F&prime;<sub>G</sub> − r − t(F&prime;<sub>G</sub> − r) = (1 − t)(F&prime;<sub>G</sub> − r) = 0  ⟹  <b>F&prime;<sub>G</sub> = r</b></p><p>De to t-ene stryker hverandre: inntekten fra den gjeldsfinansierte kronen beskattes med t, og renten på den samme kronen gir fradrag med t. Skatten er nøytral på margen for gjeld.</p><p><b>Steg 3 — førsteordensbetingelsen for egenkapital.</b></p><p>∂V/∂E = F&prime;<sub>E</sub> − r − tF&prime;<sub>E</sub> = 0  ⟹  F&prime;<sub>E</sub>(1 − t) = r  ⟹  <b>F&prime;<sub>E</sub> = r/(1 − t)</b></p><p>Her beskattes inntekten, men det er ingen fradrag som motvirker. Bedriften må tjene r/(1 − t) før skatt for å sitte igjen med r etter skatt. Med t = 22 % er kravet r/0,78 = 1,282r, altså 28,2 % høyere enn for en gjeldsfinansiert krone.</p><p><b>Kontroll mot delspørsmål a.</b> Les A i deloppgave a som gjeldsandelen G/K når gjeldsrenten er fullt fradragsberettiget. Da sier a at F&prime;(K) = r(1 − (G/K)t)/(1 − t). Sett G/K = 1 (bare gjeld): F&prime; = r ✓. Sett G/K = 0 (bare egenkapital): F&prime; = r/(1 − t) ✓. De to delspørsmålene er samme modell sett fra to kanter.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>F&prime;<sub>G</sub> = r og F&prime;<sub>E</sub> = r</b> — ingen skatteforskjell mellom finansieringsformene. Det ville krevd at også egenkapitalkostnaden var fradragsberettiget (en såkalt ACE-modell). Oppgaven sier det motsatte.</p><p><b>F&prime;<sub>G</sub> = r(1 − t) og F&prime;<sub>E</sub> = r</b> — den vanligste feilen, og verdt å forstå: r(1 − t) er gjeldens <i>kostnad etter skatt</i>, ikke det <i>krevde marginalproduktet før skatt</i>. Fordi inntekten også beskattes med t, må du sammenligne før-skatt med før-skatt. Da blir kravet r, ikke r(1 − t). Å blande et etter-skatt-tall med et før-skatt-tall er den ene feilen som gjentar seg i hele skattedelen av dette kurset.</p><p><b>F&prime;<sub>G</sub> = r/(1 − t) og F&prime;<sub>E</sub> = r(1 − t)</b> — de to snudd. Den sier at egenkapital er billigst, som er stikk i strid med at bare renter er fradragsberettiget.</p><p><b>Regelen.</b> Når bare gjeldsrenter er fradragsberettiget, er avkastningskravet før skatt r for gjeldsfinansiert kapital og r/(1 − t) for egenkapitalfinansiert kapital. Skattesystemet subsidierer gjeld på margen.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>La * angi profittmaksimerende mengde av gjeld (G*) og egenkapital (E*). Basert på dine svar på spørsmål 2 over, hvilke av alternativene under er riktig?</p>",
          options: ["E* &gt; G*", "E* = G*", "E* &lt; G*", "(1/2)E* &gt; G*"],
          answer: 2,
          solution: "<p><b>Steg 1 — bruk at F er konkav.</b> F&Prime;(K) &lt; 0 betyr at marginalproduktet <i>faller</i> når innsatsen øker. Snudd rundt: jo høyere marginalprodukt som kreves, jo mindre av innsatsfaktoren brukes.</p><p><b>Steg 2 — sammenlign de to kravene fra b.</b> Siden 0 &lt; t &lt; 1 er 1/(1 − t) &gt; 1, og dermed</p><p>F&prime;<sub>E</sub> = r/(1 − t) &gt; r = F&prime;<sub>G</sub></p><p><b>Steg 3 — les av mengdene.</b> Egenkapital møter det høyeste kravet, altså brukes det minst av: <b>E* &lt; G*</b>. Med t = 22 % må den siste egenkapitalkronen tjene 28,2 % mer enn den siste gjeldskronen for å være verdt å bruke.</p><p><b>Mekanismen i én setning.</b> Alternativkostnaden til egenkapitalen kan ikke trekkes fra i skattepliktig inntekt, mens gjeldsrenten kan det. Derfor er egenkapital dyrere, og bedriften velger gjeld på margen.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>E* &gt; G*</b> — motsatt konklusjon. Den følger av å tro at fradragsretten gjør egenkapital billigere, eller av å ha svart feil i b.</p><p><b>E* = G*</b> — krever at de to førsteordensbetingelsene er like, altså at t = 0. Med skatt er de aldri like.</p><p><b>(1/2)E* &gt; G*</b> — dette sier E* &gt; 2G*, altså en enda sterkere versjon av feil retning. Modellen gir dessuten ingen tallfestet faktor mellom E* og G*, bare en ulikhet. Et alternativ som påstår et bestemt forholdstall uten at noe i oppgaven fastsetter det, kan nesten alltid strykes med en gang.</p><p><b>Forbeholdet du bør kjenne.</b> Fordi F er en funksjon av K = E + G alene, er marginalproduktet i realiteten det samme uansett hvilken krone som finansierer det, og de to betingelsene kan ikke holde samtidig. Modellen peker derfor mot en hjørneløsning: mest mulig gjeld. Det som stopper hjørnet i virkeligheten er konkurskostnader, långivernes krav om egenkapital og rentebegrensningsregler. Eksamenssvaret er likevel den relative sammenligningen: egenkapital er dyrere, derfor brukes det mindre av den.</p>",
        },
      ],
    },

    /* ---------------------------------------------------------------- 8 --- */
    {
      n: 8,
      title: "Stykkskatt: hvem bærer skatten når elastisitetene er ekstreme",
      points: 3,
      topic: "Skatteincidens",
      chapters: [11],
      body: "<p>Anta et frikonkurransemarked hvor tilbud er lik etterspørsel og likevektsprisen er kr 1,50 og at myndighetene ilegger bedriftene (tilbyderne) en skatt pr enhet solgt på kr 0,5.</p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Anta at etterspørselen er perfekt uelastisk mens tilbudet er elastisk. Hva blir ny likevektspris for konsumentene?</p>",
          options: ["kr 3,50", "kr 2,50", "kr 2", "kr 3"],
          answer: 2,
          solution: "<p><b>Notasjonen først, den er halve oppgaven.</b> P er prisen konsumentene betaler, p er prisen produsentene sitter igjen med, og skatten kiler dem fra hverandre: <b>P = p + t</b> med t = kr 0,50. Likevekten er D(P) = S(P − t).</p><p><b>Steg 1 — deriver likevekten med hensyn på skatten.</b> D&prime;·dP = S&prime;·(dP − dt), som gir</p><p>dP/dt = S&prime;/(S&prime; − D&prime;)  og  dp/dt = D&prime;/(S&prime; − D&prime;)</p><p>De to summerer til 1: hele skatten fordeles mellom de to prisene.</p><p><b>Steg 2 — sett inn perfekt uelastisk etterspørsel.</b> Da er D&prime; = 0, og</p><p>dP/dt = S&prime;/(S&prime; − 0) = <b>1</b>,  dp/dt = 0/(S&prime; − 0) = <b>0</b></p><p><b>Steg 3 — les av tallene.</b> Konsumentprisen stiger med hele skatten: P = 1,50 + 0,50 = <b>kr 2,00</b>. Produsentprisen er uendret på kr 1,50. Produsentene tar imot 2,00 fra kunden, betaler 0,50 til staten og beholder 1,50, akkurat som før.</p><p><b>Mekanismen.</b> Perfekt uelastisk etterspørsel betyr at kvantumet ikke faller uansett pris. Da har produsentene ingenting å tape på å velte hele skatten over. <b>Den minst elastiske siden bærer skatten</b>, og her er den siden uendelig lite elastisk.</p><p><b>Kontroll — og den raskeste utelukkingen på hele eksamen.</b> Med stigende tilbudskurve kan konsumentprisen aldri stige med <i>mer</i> enn skatten. Øvre grense er 1,50 + 0,50 = 2,00. Alternativene <b>kr 2,50</b>, <b>kr 3</b> og <b>kr 3,50</b> ligger alle over denne grensen og er umulige uansett elastisiteter. Du kan altså krysse av riktig svar uten å regne, bare ved å kjenne grensen.</p><p><b>Hvorfor de gale alternativene er gale.</b> <b>kr 2,50</b> er skatten lagt på to ganger (1,50 + 0,50 + 0,50). <b>kr 3</b> er likevektsprisen doblet. <b>kr 3,50</b> er begge deler. Alle tre bygger på at en skatt på 0,50 kan løfte prisen med mer enn 0,50, som den ikke kan.</p><p><b>Regelen.</b> dP/dt = ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) i elastisitetsform. Er etterspørselen perfekt uelastisk (ε<sub>D</sub> = 0), bærer konsumentene alt; er tilbudet perfekt uelastisk, bærer produsentene alt.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>Anta nå at etterspørselen er perfekt elastisk mens tilbudet er elastisk. Hva blir likevektsprisen for konsumentene etter at skatten er innført?</p>",
          options: ["Kr 2", "Kr 1,50", "Kr 1", "Kr 2,50"],
          answer: 1,
          solution: "<p><b>Steg 1 — hva perfekt elastisk etterspørsel betyr.</b> Etterspørselskurven er en vannrett linje i kr 1,50: konsumentene kjøper alt som tilbys til denne prisen, og ingenting til en høyere. D&prime; → −∞.</p><p><b>Steg 2 — sett inn i formelen.</b></p><p>dP/dt = S&prime;/(S&prime; − D&prime;) → S&prime;/(S&prime; + ∞) = <b>0</b></p><p><b>Steg 3 — les av.</b> Konsumentprisen er <b>uendret på kr 1,50</b>. Hele skatten bæres av produsentene, som får 1,50 − 0,50 = 1,00 (det er neste delspørsmål).</p><p><b>Mekanismen.</b> Prisen kan ikke stige, for da forsvinner all etterspørsel. Det som skjer i stedet er at kvantumet faller: de minst effektive tilbyderne, som ikke tåler 1,00 netto, trekker seg ut. Merk at <b>skatten er lagt på tilbyderne i begge delspørsmålene</b>, men i a bærer konsumentene alt og her ingenting. Hvem som betaler inn skatten til staten sier ingenting om hvem som faktisk bærer den.</p><p><b>Kontroll.</b> dP/dt + |dp/dt| = 0 + 1 = 1. Hele skatten er fordelt, og den ligger i sin helhet hos produsentene. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 2</b> — svaret på forrige delspørsmål. Elastisitetene er byttet om mellom a og b, og hvis du ikke leser den ene setningen som skiller dem, tar du med deg 2,00 hit. Dette er den mest kostbare enkeltfeilen i settet.</p><p><b>Kr 1</b> — svaret på neste delspørsmål, altså <i>produsentprisen</i>. Spørsmålet gjelder prisen for konsumentene.</p><p><b>Kr 2,50</b> — over den øvre grensen 1,50 + 0,50 og dermed umulig.</p><p><b>Regelen.</b> Perfekt elastisk etterspørsel ⟹ konsumentprisen er upåvirket, produsentene bærer hele skatten. Dette er den lille åpne økonomien i skatteteorien: er kjøperne perfekt mobile, kan de ikke skattlegges.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Anta nå at etterspørselen er perfekt elastisk og mens tilbudet er elastisk. Hva blir prisen tilbyderne (produsentene) får etter innføringen av skatten?</p>",
          options: ["Kr 1,50", "Kr 1", "Kr 2", "Kr 2,50"],
          answer: 1,
          solution: "<p><b>Steg 1 — bruk kilen.</b> P = p + t, altså p = P − t. Fra forrige delspørsmål er P uendret på 1,50.</p><p><b>Steg 2 — regn.</b> p = 1,50 − 0,50 = <b>kr 1,00</b>.</p><p><b>Steg 3 — formelen sier det samme.</b> dp/dt = D&prime;/(S&prime; − D&prime;) → med D&prime; → −∞ blir brøken −∞/(+∞) = −1. Produsentprisen faller med hele skatten.</p><p><b>Kontroll.</b> Regnskapet skal gå opp: konsumenten betaler 1,50, staten får 0,50, produsenten beholder 1,00. 1,00 + 0,50 = 1,50 ✓. Og fordelingen summerer til én: konsumentene bærer 0, produsentene bærer 0,50, til sammen skatten.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 1,50</b> — konsumentprisen, altså svaret på delspørsmål b. Dette er settets tydeligste par av speilalternativer: b og c har hverandres fasit i alternativlisten. Skriv alltid ned <i>hvilken</i> pris spørsmålet ber om før du regner.</p><p><b>Kr 2</b> og <b>Kr 2,50</b> — begge er høyere enn prisen før skatt. En skatt på tilbyderne kan aldri løfte prisen tilbyderne <i>får</i>; den kan bare senke den. To alternativer strykes altså på fortegn alene, og med minuspoeng er det nok til at det lønner seg å svare selv om du er usikker mellom de to siste.</p><p><b>Regelen.</b> Skattekilen fordeles etter elastisiteter: den siden som er minst elastisk, bærer mest. Produsentprisen faller med t·|ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|), her hele skatten fordi etterspørselen er perfekt elastisk.</p>",
        },
      ],
    },
    /* ---------------------------------------------------------------- 9 --- */
    {
      n: 9,
      title: "Formuesskatt og gevinstskatt med samme proveny",
      points: 1,
      topic: "Formuesskatt som avkastningsskatt",
      chapters: [8],
      body: "<p>La W = 100 være initial formue ved periodens begynnelse og la r = 5 % være kapitalavkastningen som realiseres på slutten av perioden. Anta at formuesskatten er T = 1 % og at den faller på formue ved periodens begynnelse. Hvor høy må skatten på kapitalgevinst definert ved t være for at de to skattene skal gi samme proveny?</p>",
      options: ["22 %", "23 %", "20 %", "21 %"],
      answer: 2,
      solution: "<p><b>Steg 1 — skriv opp de to provenyene.</b> Formuesskatten treffer formuen ved <i>inngangen</i> til perioden, altså W = 100:</p><p>Formuesskatt: W × T = 100 × 1 % = <b>1</b></p><p>Gevinstskatten treffer avkastningen som realiseres i løpet av perioden, altså Wr = 100 × 5 % = 5:</p><p>Gevinstskatt: W × r × t = 5t</p><p><b>Steg 2 — sett dem like og løs.</b></p><p>W·T = W·r·t  ⟹  T = r·t  ⟹  <b>t = T/r = 1 %/5 % = 20 %</b></p><p>Legg merke til at W stryker seg selv. Ekvivalensen avhenger bare av forholdet mellom skattesatsen og avkastningen, ikke av hvor stor formuen er.</p><p><b>Kontroll.</b> Med t = 20 % blir gevinstskatten 100 × 0,05 × 0,20 = 1,00, nøyaktig lik formuesskatten på 1,00. ✓ Og kryss-sjekk mot oppgave 3 i samme sett: der falt avkastningen fra 5 % til 4 % da formuesskatten på 1 % kom til. Det er et kutt på 1 av 5, altså 20 % av avkastningen. Samme tall, samme mekanisme, to helt ulike innpakninger.</p><p><b>Hvorfor dette er kursets viktigste enkeltinnsikt.</b> En formuesskatt <i>er</i> en avkastningsskatt, med effektiv sats τ<sub>w</sub>/r. Fordi r står i nevneren, blir den effektive satsen høyere jo lavere avkastningen er:</p><table class=\"data\"><tr><th>Avkastning r</th><th>Ekvivalent gevinstskatt T/r</th></tr><tr><td>10 %</td><td class=\"n\">10 %</td></tr><tr><td>5 %</td><td class=\"n\">20 %</td></tr><tr><td>2 %</td><td class=\"n\">50 %</td></tr><tr><td>1 %</td><td class=\"n\">100 %</td></tr><tr><td>0 %</td><td class=\"n\">uendelig — skatten betales av selve formuen</td></tr></table><p>Det er dette forelesningen mener med at formuesskatten er en skatt som ikke tar hensyn til om det er noe å skatte av: en eier med lav eller negativ avkastning betaler like mye som en med høy.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>21 %</b> — den beste fellen i settet. Den framkommer hvis du lar formuesskatten falle på formuen ved <i>slutten</i> av perioden: 100 × 1,05 = 105, skatt 105 × 1 % = 1,05, og 1,05/5 = 21 %. Oppgaveteksten sier uttrykkelig «faller på formue ved periodens begynnelse». Én setning i oppgaven skiller 20 % fra 21 %.</p><p><b>22 %</b> — satsen på alminnelig inntekt. Den er der fordi tallet er kjent og fristende, ikke fordi den følger av noe her. Den ville krevd et formuesgrunnlag på 110.</p><p><b>23 %</b> — svarer ikke til noen regnevei; nærmeste-nabo-lokkemiddel over 22 %.</p><p><b>Regelen.</b> t = τ<sub>w</sub>/r er den gevinstskattesatsen som gir samme proveny som en formuesskatt på inngående formue. Snudd rundt: en avkastningsskatt t tilsvarer en formuesskatt på r·t.</p>",
    },

    /* --------------------------------------------------------------- 10 --- */
    {
      n: 10,
      title: "Gevinstbeskatning med ubenyttet skjerming og oppjustering",
      points: 1,
      topic: "Aksjonærmodellen",
      chapters: [5],
      body: "<p>Runar kjøpte en aksje for kr 100 i år 1 og selger den på slutten av år 2 for kr 160. Han har et ubenyttet skjermingsfradrag på kr 10 fra år 1. Hva betaler Runar i skatt på aksjegevinsten sin? Eierskatten er 22 % og oppjusteringsfaktoren 1,72.</p>",
      options: ["Kr 3,89", "Kr 11", "Kr 18,2", "Kr 18,92"],
      answer: 3,
      solution: "<p><b>Steg 1 — finn den skattepliktige gevinsten.</b> Salgspris minus kostpris minus framført ubenyttet skjerming:</p><table class=\"data\"><tr><th>Post</th><th>Beløp</th></tr><tr><td>Salgspris</td><td class=\"n\">160</td></tr><tr><td>− kostpris (inngangsverdi)</td><td class=\"n\">−100</td></tr><tr><td>− ubenyttet skjerming fra år 1</td><td class=\"n\">−10</td></tr><tr><td><b>Skattepliktig gevinst</b></td><td class=\"n\"><b>50</b></td></tr></table><p><b>Steg 2 — oppjuster og skattlegg. Regn begge veier, det er kontrollen.</b></p><p>Vei 1, oppjuster grunnlaget: 50 × 1,72 = 86, og 86 × 22 % = <b>18,92</b>.<br>Vei 2, oppjuster satsen: 1,72 × 22 % = 37,84 %, og 50 × 37,84 % = <b>18,92</b>. ✓</p><p>De to veiene skal alltid gi samme tall. Får de ikke det, har du oppjustert to ganger et sted.</p><p><b>To regler som ligger under.</b> For det første: <b>i salgsåret gis det ikke skjermingsfradrag</b> — skjerming tilordnes den som eier aksjen ved utgangen av året. Framført ubenyttet skjerming kan derimot trekkes fra gevinsten. For det andre: ubenyttet skjerming kan redusere en gevinst til null, men den kan ikke skape eller øke et tap.</p><p><b>Kontroll.</b> Runar sitter igjen med 50 − 18,92 = 31,08 av gevinsten, altså 62,16 %, som er (1 − 37,84 %). ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Kr 11</b> — 50 × 22 %, altså oppjusteringen glemt. Dette er den ene feilen oppgaven er bygget rundt, og den er verdt å kjenne igjen på formen: svaret er nøyaktig 22/37,84 = 58 % av det riktige. Ser du et alternativ som er omtrent seks tideler av et annet, er det som regel oppjusteringsparet.</p><p><b>Kr 18,2</b> — ligger så tett på riktig svar at det fanger den som bruker en <i>gammel</i> oppjusteringsfaktor eller taster feil. Faktoren har vært 1,44, 1,6 og 1,66 i tidligere år; 1,6 gir 17,60 og 1,66 gir 18,26. Ingen av kursets regneveier gir nøyaktig 18,2. Bruk faktoren som står i oppgaveteksten.</p><p><b>Kr 3,89</b> — feil størrelsesorden. Den ligger nær 10 × 37,84 % = 3,78, altså skatt beregnet på den ubenyttede skjermingen i stedet for på gevinsten. Skjerming er et <i>fradrag</i>, ikke et skattegrunnlag.</p><p><b>Feilen som ikke har noe alternativ.</b> Glemmer du den ubenyttede skjermingen helt, blir gevinsten 60 og skatten 60 × 37,84 % = 22,70. Det tallet finnes ikke i listen, og det er ditt signal om å regne på nytt.</p><p><b>Regelen.</b> Skatt på aksjegevinst = (salgspris − inngangsverdi − framført ubenyttet skjerming) × f × t, med f = 1,72 og t = 22 % i 2026, altså 37,84 % samlet. Oppjuster én gang, enten på grunnlaget eller på satsen.</p>",
    },
    /* --------------------------------------------------------------- 11 --- */
    {
      n: 11,
      title: "Mertons aksjeandel og humankapitalen",
      points: 4,
      topic: "Porteføljevalg",
      chapters: [14],
      body: "<p>Oppgaven har fire delspørsmål som bygger på hverandre. Tallene fra det første delspørsmålet gjelder også i de neste.</p>",
      parts: [
        {
          label: "1",
          points: 1,
          body: "<p>Anta at aksjemarkedets meravkastning over risikofri rente er 0,05, og at markedets varians er 0,10. Ifølge Mertons formel for optimal aksjeandel bør Kari investere 50 prosent av formuen i aksjer. Hva er verdien på risikoaversjonsparameteren (γ) som følger av denne informasjonen?</p>",
          options: ["1", "2", "10", "Umulig å avgjøre"],
          answer: 0,
          solution: "<p><b>Steg 1 — skriv opp formelen.</b> Mertons optimale aksjeandel er</p><p>w* = (μ − r<sub>f</sub>)/(γσ²)</p><p>der μ − r<sub>f</sub> er meravkastningen over risikofri rente, σ² er variansen til aksjemarkedet og γ er risikoaversjonen.</p><p><b>Steg 2 — sett inn og løs for γ.</b> Oppgaven gir μ − r<sub>f</sub> = 0,05, σ² = 0,10 og w* = 0,50:</p><p>0,50 = 0,05/(γ × 0,10)<br>γ × 0,10 × 0,50 = 0,05<br>γ = 0,05/0,05 = <b>1</b></p><p><b>Kontroll.</b> Sett γ = 1 inn igjen: w* = 0,05/(1 × 0,10) = 0,50 = 50 %. ✓ Merk hvor lav risikoaversjonen er: γ = 1 svarer til logaritmisk nytte, og de fleste empiriske anslag ligger på 2–5. Det er selve grunnen til at 50 % aksjer er en <i>lav</i> andel i denne modellen når meravkastningen er 5 % og variansen 0,10.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>10</b> — du har lest 0,10 som <i>standardavviket</i> i stedet for variansen. Da blir σ² = 0,01 og γ = 0,05/(0,50 × 0,01) = 10. Oppgaven sier «markedets varians», og i Merton-formelen står varians, ikke standardavvik. Dette er den ene feilen som gir en faktor 10 i svaret.</p><p><b>2</b> — 0,10/0,05, altså brøken snudd og aksjeandelen glemt. Sjekk alltid ved å sette svaret tilbake i formelen: γ = 2 gir w* = 0,05/(2 × 0,10) = 25 %, ikke 50 %.</p><p><b>Umulig å avgjøre</b> — formelen har fire størrelser, tre er oppgitt, og den fjerde er entydig bestemt. «Umulig å avgjøre» er nesten alltid feil når spørsmålet oppgir akkurat nok tall.</p><p><b>Regelen.</b> w* = (μ − r<sub>f</sub>)/(γσ²). Andelen stiger med meravkastningen og faller med både risikoaversjonen og variansen. Legg merke til at det ikke står noe om tidshorisont i formelen; det blir viktig i fjerde delspørsmål.</p>",
        },
        {
          label: "2",
          points: 1,
          body: "<p>Anta videre at Kari har en finansiell formue på 1 million kroner, og i tillegg en humankapital (nåverdien av fremtidig arbeidsinntekt) verdt 1 million kroner. Fremtidig arbeidsinntekt er helt risikofri. Hvor stor andel av den finansielle formuen bør Kari investere i aksjer?</p>",
          options: ["0 %", "50 %", "75 %", "100 %"],
          answer: 3,
          solution: "<p><b>Steg 1 — hvilken formue gjelder de 50 prosentene?</b> Mertons w* er andelen av <b>totalformuen</b>, ikke av bankkontoen. Totalformuen er finansiell formue pluss humankapital: 1 mill + 1 mill = <b>2 mill</b>.</p><p><b>Steg 2 — hvor mye skal stå i aksjer?</b> 50 % av 2 mill = <b>1 mill</b>.</p><p><b>Steg 3 — hvor kan de plasseres?</b> Humankapitalen er risikofri og kan ikke omplasseres; den er i praksis en obligasjon på 1 mill som Kari allerede eier. Hele aksjeeksponeringen må derfor komme fra den finansielle formuen. 1 mill av 1 mill = <b>100 %</b>.</p><p><b>Formelen.</b> Med risikofri humankapital H og finansiell formue F:</p><p>α<sub>F</sub> = w* × (F + H)/F = 0,50 × 2/1 = 1,00 = <b>100 %</b></p><p><b>Kontroll.</b> Se på den samlede balansen etterpå: 1 mill i aksjer og 1 mill i risikofri humankapital. Det er nøyaktig 50/50 på totalformuen, som er det Merton krever. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>50 %</b> — du har brukt w* direkte på den finansielle formuen og oversett humankapitalen. Da ville Kari sittet med 0,5 mill aksjer av 2 mill totalformue, altså bare 25 % aksjer. Alt for defensivt.</p><p><b>0 %</b> — svaret på neste delspørsmål, der humankapitalen er risikabel. Her er den risikofri, og det snur konklusjonen.</p><p><b>75 %</b> — en mellomting uten grunnlag i modellen. Merton gir et entydig tall; den som «runder av mot midten» taper poeng.</p><p><b>Regelen.</b> Sikker humankapital virker som en obligasjonsbeholdning. Den øker den trygge delen av totalformuen og gjør at hele den finansielle formuen kan stå i aksjer — i prinsippet mer enn 100 %, altså med lån, hvis humankapitalen er stor nok. Det er hovedbegrunnelsen for at unge bør ha høy aksjeandel.</p>",
        },
        {
          label: "3",
          points: 1,
          body: "<p>Anta derimot (bare i denne deloppgaven) at Karis humankapital ikke er risikofri, men i stedet varierer i takt med aksjemarkedet (beta = 1). Hvor stor andel av den finansielle formuen bør Kari nå investere i aksjer?</p>",
          options: ["0 %", "50 %", "75 %", "100 %"],
          answer: 0,
          solution: "<p><b>Steg 1 — hva β = 1 betyr her.</b> Humankapitalen svinger én-til-én med aksjemarkedet. Økonomisk er den da <i>allerede</i> en aksjeplassering på 1 mill, bare at Kari ikke kan selge den.</p><p><b>Steg 2 — regn ut ønsket aksjeeksponering.</b> Totalformuen er fortsatt 2 mill, og målet er fortsatt 50 % = <b>1 mill i aksjer</b>.</p><p><b>Steg 3 — trekk fra det hun allerede har.</b> Humankapitalen leverer 1 mill aksjeeksponering. Da gjenstår 1 − 1 = <b>0</b> til den finansielle formuen: <b>0 %</b> i aksjer, altså alt i risikofrie plasseringer.</p><p><b>Formelen.</b> Med humankapital som har beta β:</p><p>α<sub>F</sub> = [w*(F + H) − β × H]/F = (0,50 × 2 − 1 × 1)/1 = <b>0</b></p><p>Sett β = 0 i samme uttrykk og du får svaret fra forrige delspørsmål, 100 %. Én formel dekker begge.</p><p><b>Kontroll.</b> Samlet eksponering blir 1 mill aksjelignende humankapital og 1 mill risikofri finansformue: 50/50 på totalformuen. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>100 %</b> — svaret fra forrige delspørsmål. Setningen «bare i denne deloppgaven» er der nettopp for å hindre at du drar det med deg.</p><p><b>50 %</b> — Merton anvendt på finansformuen alene, som er samme feil som i forrige delspørsmål, bare i motsatt retning: her ville det gitt 1,5 mill i aksjeeksponering av 2 mill, altså 75 %.</p><p><b>75 %</b> — igjen mellomtingen uten grunnlag.</p><p><b>Regelen.</b> Humankapitalen skal telle med i totalporteføljen med sin egen beta. Er den aksjelignende (gründer, meglerlønn, bonusavhengig jobb, aksjer i egen arbeidsgiver), skal den finansielle porteføljen være mer forsiktig. Det er også argumentet mot å eie aksjer i selskapet du arbeider i: da er både lønnen og sparepengene eksponert mot samme risiko.</p>",
        },
        {
          label: "4",
          points: 1,
          body: "<p>Anne er identisk med Kari på alle måter, bortsett fra at hun er eldre og straks skal gå av med pensjon. Hva er riktig om Annes optimale aksjeandel?</p>",
          options: [
            "Hun bør ha lavere aksjeandel, hovedsakelig fordi aksjemarkedets risiko forsvinner over lang nok tid, mens aksjer er risikable på kort sikt.",
            "Hun bør ha lavere aksjeandel, hovedsakelig fordi humankapitalen hennes er mindre verdifull.",
            "Hun bør ha lik aksjeandel.",
            "Hun bør ha høyere aksjeandel.",
          ],
          answer: [1, 2],
          solution: "<p><b>Fasiten godtar to svar.</b> Hovedsvaret er at hun bør ha lavere aksjeandel fordi humankapitalen er mindre verdifull. Sensorveiledningen godtar i tillegg «lik aksjeandel», fordi «aksjeandel» kan leses som andel av <i>totalformuen</i>, og den er uendret. Begge er markert riktige her.</p><p><b>Steg 1 — hva endrer seg når Anne nærmer seg pensjon?</b> Nåverdien av framtidig arbeidsinntekt, altså humankapitalen H, krymper mot null. Alt annet er likt.</p><p><b>Steg 2 — sett H = 0 i formelen fra delspørsmål 2.</b></p><p>α<sub>F</sub> = w* × (F + H)/F  →  med H = 0:  α<sub>F</sub> = w* = <b>50 %</b></p><p>Kari, med H = F, hadde 100 %. Anne, med H ≈ 0, skal ned mot 50 % av finansformuen i aksjer. <b>Lavere andel av den finansielle formuen — og grunnen er humankapitalen, ikke alderen i seg selv.</b></p><p><b>Steg 3 — den andre lesningen.</b> Andelen av <i>totalformuen</i> er 50 % for begge, siden w* ikke inneholder alder, horisont eller humankapital. Leser du spørsmålet slik, er svaret «lik aksjeandel». Det er derfor sensor godtar begge.</p><p><b>Hvorfor alternativ A er galt — og det er hele poenget med spørsmålet.</b> A har <i>riktig retning</i> men <i>galt argument</i>: «aksjemarkedets risiko forsvinner over lang nok tid». Det er tidsdiversifiseringsfeilslutningen, og kurset avviser den uttrykkelig. Standardavviket til den <i>årlige gjennomsnittsavkastningen</i> faller med horisonten, men standardavviket til <b>sluttformuen</b> vokser med kvadratroten av horisonten. Aksjer blir ikke trygge av å eies lenge. Legg dessuten merke til at Mertons formel ikke inneholder tid i det hele tatt: w* er den samme for ett år og for tretti. Grunnen til at unge skal ha mer i aksjer, er humankapitalen, ikke horisonten.</p><p><b>Hvorfor D er galt.</b> «Høyere aksjeandel» er feil retning: mindre sikker humankapital i ryggen betyr mindre, ikke mer, risiko i finansporteføljen.</p><p><b>Regelen.</b> Aksjeandelen faller over livsløpet fordi humankapitalen forbrukes, ikke fordi risikoen avtar med tiden. Når to alternativer har samme konklusjon, er det begrunnelsen som avgjør — les hele setningen, ikke bare det første ordet.</p>",
        },
      ],
    },

    /* --------------------------------------------------------------- 12 --- */
    {
      n: 12,
      title: "Hvilken forsikring er lovpålagt",
      points: 1,
      topic: "Forsikring",
      chapters: [17],
      body: "<p>Hvilke av følgende forsikringer er lovpålagt i Norge?</p>",
      options: ["Boligforsikring", "Uføreforsikring", "Ansvarsforsikring på bil", "Ingen av dem"],
      answer: 2,
      solution: "<p><b>Riktig svar: ansvarsforsikring på bil.</b> Bilansvarsloven krever at ethvert motorvogn som brukes på veien, er ansvarsforsikret. Forsikringen dekker skade kjøretøyet påfører andre — personer, biler, gjerder — og er obligatorisk fordi skaden rammer tredjepart, ikke bare eieren selv. Kjører du uforsikret, betaler Trafikkforsikringsforeningen den skadelidte og krever deg for beløpet, i tillegg til et daglig gebyr.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Boligforsikring</b> — ikke lovpålagt, men i praksis nesten alltid <i>avtalepålagt</i>: banken krever den som vilkår for boliglånet, siden boligen er pantet. Det er nettopp forskjellen alternativet tester. En kontraktsforpliktelse overfor banken er ikke det samme som en lovplikt.</p><p><b>Uføreforsikring</b> — frivillig. Grunndekningen ligger i folketrygdens uføretrygd, som alle er omfattet av gjennom medlemskapet, mens privat uføreforsikring kjøpes for å tette gapet mellom folketrygden og tidligere lønn. Forveksle ikke obligatorisk tjenestepensjon (OTP), som <i>er</i> lovpålagt for arbeidsgiveren, med uføreforsikring, som ikke er det.</p><p><b>Ingen av dem</b> — kan strykes så snart du husker at bilansvar er lovregulert.</p><p><b>Regelen.</b> Skillet går på hvem skaden rammer: forsikring mot skade du påfører <i>andre</i> er ofte lovpålagt (bilansvar, yrkesskade, ansvarsforsikring for enkelte yrker), mens forsikring mot skade på deg selv og dine egne ting er frivillig. Prinsippet i kurset er dessuten at du skal forsikre det du ikke kan bære selv: huset og ansvaret, ikke mobilen.</p>",
    },
    /* --------------------------------------------------------------- 13 --- */
    {
      n: 13,
      title: "Forventet nytte, full dekning og delvis dekning",
      points: 3,
      topic: "Forsikring og forventet nytte",
      chapters: [17],
      body: "<p>Du eier et hus verdt 9 millioner kroner, og har ingen annen formue. Huset vil brenne ned og miste hele sin verdi med sannsynlighet 1 %. Du har nyttefunksjonen U(W) = √W, der W er formuen din. Forsikringsselskapet tilbyr full dekning, det vil si at de utbetaler 9 millioner kroner dersom huset brenner, til en premie på 160 000 kroner.</p>",
      parts: [
        {
          label: "1",
          points: 1,
          body: "<p>Bør du kjøpe denne forsikringen?</p>",
          options: [
            "Ja, fordi forventet nytte blir høyere med forsikringen",
            "Nei, fordi forventet nytte blir lavere med forsikringen",
            "Du er indifferent, fordi forventet nytte er lik med og uten forsikring",
            "Umulig å avgjøre uten mer informasjon",
          ],
          answer: 0,
          solution: "<p><b>Steg 1 — forventet nytte med forsikring.</b> Full dekning fjerner all usikkerhet: brenner huset, får du 9 mill utbetalt, og uansett har du betalt 160 000. Formuen er 9 000 000 − 160 000 = 8 840 000 i <i>begge</i> tilstander.</p><p>E[U]<sub>forsikret</sub> = √8 840 000 = <b>2 973,21</b></p><p><b>Steg 2 — forventet nytte uten forsikring.</b> Med sannsynlighet 99 % står huset (9 mill), med 1 % er alt borte (0):</p><p>E[U]<sub>uforsikret</sub> = 0,99 × √9 000 000 + 0,01 × √0 = 0,99 × 3 000 + 0 = <b>2 970,00</b></p><p><b>Steg 3 — sammenlign.</b> 2 973,21 &gt; 2 970,00, altså <b>ja, kjøp forsikringen</b>.</p><p><b>Kontroll — regn i kroner i stedet for i nytteenheter.</b> Nyttetall er vanskelige å tolke; sikkerhetsekvivalenten er ikke det. Kvadrer den forventede nytten:</p><table class=\"data\"><tr><th>Situasjon</th><th>E[U]</th><th>Sikkerhetsekvivalent</th></tr><tr><td>Uforsikret</td><td class=\"n\">2 970,00</td><td class=\"n\">8 820 900</td></tr><tr><td>Forsikret</td><td class=\"n\">2 973,21</td><td class=\"n\">8 840 000</td></tr></table><p>Forsikringen er verdt 8 840 000 − 8 820 900 = <b>19 100 kroner</b> mer enn å stå uforsikret. Maksimalpremien du ville betalt er 9 000 000 − 8 820 900 = <b>179 100</b>, og premien på 160 000 ligger under. ✓ To uavhengige veier, samme konklusjon.</p><p><b>Hvorfor prisen ikke avgjør alene.</b> Aktuarisk riktig premie er 1 % × 9 mill = <b>90 000</b>. Selskapet tar 160 000, altså 70 000 i påslag. En risikonøytral person ville sagt nei. Du er risikoavers (√W er konkav), og betaler derfor gjerne over forventet tap — helt opp til 179 100.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Nei</b> — svaret du får hvis du sammenligner premien 160 000 med forventet tap 90 000 og stopper der. Det er den risikonøytrale sammenligningen, og den ignorerer hele poenget med en konkav nyttefunksjon.</p><p><b>Indifferent</b> — ville krevd at premien var nøyaktig 179 100.</p><p><b>Umulig å avgjøre</b> — alt som trengs står i oppgaven: formue, sannsynlighet, nyttefunksjon og premie. Med minuspoeng er dette alternativet nesten alltid en felle for den som gir opp for tidlig.</p><p><b>Regelen.</b> En risikoavers person kjøper alltid full dekning til aktuarisk riktig pris, og fortsatt ved et påslag opp til maksimalpremien W − sikkerhetsekvivalenten uten forsikring. Prøve-og-feile med tallene i nyttefunksjonen er en godkjent metode på denne eksamenen.</p>",
        },
        {
          label: "2",
          points: 1,
          body: "<p>Hva er den laveste sannsynligheten for brann som gjør at du vil kjøpe denne forsikringen til premie 160 000 kroner?</p>",
          options: ["ca. 0,52 %", "ca. 0,89 %", "ca. 1,52 %", "ca. 2,01 %"],
          answer: 1,
          solution: "<p><b>Steg 1 — sett opp indifferansen.</b> Terskelen er den sannsynligheten p som gjør forventet nytte lik med og uten forsikring. Forsikret er formuen 8 840 000 uansett, og den er uavhengig av p:</p><p>(1 − p) × √9 000 000 = √8 840 000</p><p><b>Steg 2 — løs for p.</b></p><p>(1 − p) × 3 000 = 2 973,2137<br>1 − p = 0,9910712<br>p = 0,0089288 = <b>0,8929 %</b></p><p>Nærmeste alternativ er <b>ca. 0,89 %</b>, og det er derfor alternativet er formulert med «ca.».</p><p><b>Steg 3 — kontroller retningen.</b> Forsikring lønner seg når brannrisikoen er <i>høy</i>. Ved p over terskelen er venstresiden mindre enn høyresiden, og forsikringen vinner; ved p under terskelen taper den.</p><p><b>Utelukkingsrutinen, som er raskere enn ligningen.</b> Fra forrige delspørsmål vet du at forsikringen lønner seg ved p = 1 %. Terskelen må derfor ligge <b>under</b> 1 %. Det stryker <b>ca. 1,52 %</b> og <b>ca. 2,01 %</b> umiddelbart. Igjen står 0,52 % og 0,89 %. Test den ene: ved p = 0,52 % er E[U] uten forsikring 0,9948 × 3 000 = 2 984,40, som er større enn 2 973,21 — altså ville du <i>ikke</i> kjøpt. Da er 0,52 % under terskelen, og svaret er 0,89 %. ✓</p><p><b>Hvorfor de gale alternativene er gale.</b> <b>1,52 %</b> og <b>2,01 %</b> er logisk uforenlige med delspørsmål 1: hadde terskelen ligget der, ville du sagt nei ved 1 %. <b>0,52 %</b> ligger under terskelen; der er den forventede skaden for liten til å forsvare 160 000 i premie.</p><p><b>Kontroll i kroner.</b> Ved p = 0,8929 % er sikkerhetsekvivalenten uten forsikring (1 − p)² × 9 000 000 = 8 840 000, nøyaktig formuen med forsikring. ✓</p><p><b>Regelen.</b> Terskelsannsynligheten løses av at forventet nytte med og uten forsikring er lik. Sett alltid inn alternativene når ligningen er stygg: prøve-og-feile er eksplisitt godkjent, og med fire alternativer er to av dem som regel utelukket av et tidligere delspørsmål.</p>",
        },
        {
          label: "3",
          points: 1,
          body: "<p>Anta at selskapet ikke lenger tilbyr full dekning, men i stedet dekker 50 % av tapet (4,5 millioner kroner) til samme premie (160 000 kr). Bør du kjøpe denne forsikringen?</p>",
          options: [
            "Ja, fordi forventet nytte blir høyere med forsikringen",
            "Nei, fordi forventet nytte blir lavere med forsikringen",
            "Du er indifferent, fordi forventet nytte er lik med og uten forsikring",
            "Umulig å avgjøre uten mer informasjon",
          ],
          answer: 1,
          solution: "<p><b>Steg 1 — formuen i de to tilstandene nå.</b> Delvis dekning fjerner ikke usikkerheten, den demper den:</p><table class=\"data\"><tr><th>Tilstand</th><th>Sannsynlighet</th><th>Formue</th></tr><tr><td>Huset står</td><td class=\"n\">99 %</td><td class=\"n\">9 000 000 − 160 000 = 8 840 000</td></tr><tr><td>Huset brenner</td><td class=\"n\">1 %</td><td class=\"n\">0 + 4 500 000 − 160 000 = 4 340 000</td></tr></table><p><b>Steg 2 — forventet nytte med den delvise dekningen.</b></p><p>E[U] = 0,99 × √8 840 000 + 0,01 × √4 340 000<br>E[U] = 0,99 × 2 973,2137 + 0,01 × 2 083,2667<br>E[U] = 2 943,4816 + 20,8327 = <b>2 964,31</b></p><p><b>Steg 3 — sammenlign med å stå uforsikret.</b> 2 964,31 &lt; 2 970,00, altså <b>nei, ikke kjøp</b>.</p><p><b>Kontroll i kroner.</b> Sikkerhetsekvivalenten er 2 964,31² = <b>8 787 159</b>, mot 8 820 900 uten forsikring. Den halve dekningen gjør deg 33 741 kroner fattigere målt i sikre kroner. Regnet på maksimalpremie: for 50 % dekning ville du høyst betalt <b>126 302</b> kroner, og selskapet krever 160 000. ✓ Samme konklusjon, tredje vei.</p><p><b>Hvorfor svaret snur.</b> Premien er uendret, men det du får for den er halvert. Aktuarisk riktig pris for halv dekning er 1 % × 4,5 mill = 45 000; du betaler 160 000, altså <b>3,6 ganger</b> riktig pris. For full dekning var forholdet 160 000/90 000 = 1,8. Påslaget per krone dekning er doblet, og da er ikke risikoaversjonen din sterk nok lenger. Terskelsannsynligheten for at halv dekning skal lønne seg til denne premien er 1,27 %, og brannrisikoen er bare 1 %.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Ja</b> — konklusjonen fra delspørsmål 1 dratt videre uten å regne på nytt. Det er hele grunnen til at spørsmålet står her.</p><p><b>Indifferent</b> — ville krevd en premie på 126 302.</p><p><b>Umulig å avgjøre</b> — alle tall er oppgitt.</p><p><b>Regelen.</b> For en risikoavers person er full dekning til aktuarisk riktig pris alltid optimalt. Halveres dekningen uten at prisen faller, dobles påslaget per krone forsikring, og forsikringen kan gå fra lønnsom til ulønnsom. Egenandeler og delvis dekning må derfor alltid ledsages av lavere premie for å være verdt noe.</p>",
        },
      ],
    },

    /* --------------------------------------------------------------- 14 --- */
    {
      n: 14,
      title: "Utsatt uttak av alderspensjon",
      points: 1,
      topic: "Pensjon",
      chapters: [15],
      body: "<p>Anta at Knut er født etter 1962. Hva skjer når Knut utsetter uttak av alderspensjon i folketrygden?</p>",
      options: [
        "Delingstallet øker, og årlig utbetaling øker",
        "Delingstallet øker, og årlig utbetaling synker",
        "Delingstallet synker, og årlig utbetaling øker",
        "Delingstallet og årlig utbetaling forblir uendret",
      ],
      answer: 2,
      solution: "<p><b>Mekanikken.</b> For årskull født fra 1963 gjelder den nye alderspensjonen: du bygger opp en <b>pensjonsbeholdning</b> (18,1 % av inntekt opp til 7,1 G, alle år teller), og den årlige pensjonen er</p><p>Årlig pensjon = pensjonsbeholdning / delingstall</p><p><b>Hva delingstallet er.</b> Delingstallet er omtrent forventet antall gjenstående leveår ved uttakstidspunktet, justert for levealdersutviklingen. Jo eldre du er når du tar ut, jo færre år har du igjen, og jo <b>lavere</b> blir delingstallet.</p><p><b>Steg for steg for Knut.</b></p><p>1. Han utsetter uttaket.<br>2. Forventet gjenstående levetid ved uttak faller.<br>3. Delingstallet <b>synker</b>.<br>4. Samme beholdning delt på et mindre tall gir <b>høyere</b> årlig utbetaling.</p><p>I tillegg fortsetter beholdningen å vokse mens han venter, både med ny opptjening hvis han jobber og med årlig regulering. Begge effektene trekker samme vei.</p><p><b>Kontroll med tall.</b> En beholdning på 4 millioner delt på et delingstall på 20 gir 200 000 i året; delt på 17 gir 235 294. Merk samtidig at han får utbetaling i færre år — nøytraliteten i systemet er at <i>samlet</i> forventet utbetaling er omtrent den samme uansett når du starter. Det du kjøper ved å vente, er en høyere garantert årlig ytelse, ikke mer penger totalt.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Delingstallet øker, og årlig utbetaling øker</b> — selvmotsigende. Med en gitt beholdning kan ikke både nevneren og resultatet vokse.</p><p><b>Delingstallet øker, og årlig utbetaling synker</b> — konsistent brøkregning, men delingstallet beveger seg feil vei. Delingstallet stiger med forventet gjenstående levetid, ikke med alder.</p><p><b>Uendret</b> — hele poenget med fleksibelt uttak mellom 62 og 75 år er at tidspunktet endrer den årlige ytelsen.</p><p><b>Regelen.</b> Senere uttak ⟹ lavere delingstall ⟹ høyere årlig pensjon, men over færre år. Levealdersjusteringen virker på tvers av årskull: lever et kull lenger, får det høyere delingstall ved samme alder og må jobbe lenger for samme årlige pensjon.</p>",
    },

    /* --------------------------------------------------------------- 15 --- */
    {
      n: 15,
      title: "Høyere avkastning enn markedsporteføljen",
      points: 1,
      topic: "Porteføljevalg",
      chapters: [14],
      body: "<p>Du ønsker høyere forventet avkastning enn markedsporteføljen og er villig til å akseptere høyere risiko. Hva sier teorien om optimale porteføljer at du da bør gjøre?</p>",
      options: [
        "Investere i de mest risikable enkeltaksjene på børsen",
        "Investere alt i én svært volatil «start-up» for å øke forventet avkastning",
        "Låne penger for å investere mer i markedsporteføljen (øke giringen)",
        "Du bør unngå å ha høyere risiko enn markedsporteføljen",
      ],
      answer: 2,
      solution: "<p><b>Riktig svar: lån og gir markedsporteføljen.</b></p><p><b>Mekanismen — kapitalmarkedslinjen.</b> Med en risikofri rente og én effisient risikabel portefølje (markedsporteføljen M) er alle oppnåelige kombinasjoner av risiko og forventet avkastning en rett linje fra r<sub>f</sub> gjennom M:</p><p>E[r<sub>p</sub>] = r<sub>f</sub> + [(E[r<sub>M</sub>] − r<sub>f</sub>)/σ<sub>M</sub>] × σ<sub>p</sub></p><p>Stigningstallet er markedets Sharpe-forhold, og det er det <b>høyest oppnåelige</b>. Vil du ha mer forventet avkastning, flytter du deg oppover langs linjen ved å øke σ<sub>p</sub> — og den eneste måten å komme forbi M på, er å låne til r<sub>f</sub> og plassere mer enn 100 % av egenkapitalen i M.</p><p><b>Tobins separasjonsteorem.</b> Valget deles i to uavhengige beslutninger: <i>hvilken</i> risikabel portefølje (alltid M, lik for alle) og <i>hvor mye</i> risiko (mikset med det risikofrie aktivumet, individuelt). Risikoviljen din bestemmer bare det andre valget, aldri det første.</p><p><b>Regneeksempel.</b> Med r<sub>f</sub> = 3 %, E[r<sub>M</sub>] = 8 % og σ<sub>M</sub> = 15 %: låner du 50 % av egenkapitalen og investerer 1,5 × M, blir forventet avkastning 3 % + 1,5 × 5 % = 10,5 % og standardavviket 1,5 × 15 % = 22,5 %. Sharpe-forholdet er uendret 0,333 — du har kjøpt mer risiko til samme pris per enhet.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>De mest risikable enkeltaksjene</b> — du får mer <i>total</i> risiko, men mesteparten av den er usystematisk og prises ikke. Sharpe-forholdet faller, og du havner under kapitalmarkedslinjen. Høy risiko er ikke det samme som høy forventet avkastning; bare den systematiske delen betales for.</p><p><b>Alt i én volatil start-up</b> — samme feil, i sin ekstreme form. Fullstendig udiversifisert, og forventningsverdien til en enkelt oppstartsbedrift er dessuten typisk skjevfordelt: mediansvaret er tap.</p><p><b>Du bør unngå høyere risiko enn markedsporteføljen</b> — teorien forbyr ingenting. Den sier hvilke kombinasjoner som er effisiente, ikke hvilken du skal velge. Punktene til høyre for M på linjen er like effisiente som M selv.</p><p><b>Regelen.</b> Vil du ha mer avkastning: gir markedsporteføljen, ikke plukk aksjer. Vil du ha mindre: legg en del i det risikofrie aktivumet. Beveg deg langs kapitalmarkedslinjen, aldri av den.</p>",
    },

    /* --------------------------------------------------------------- 16 --- */
    {
      n: 16,
      title: "Forbrukerrådets sammenligning av indeksfond og aktive fond",
      points: 1,
      topic: "Indeksfond og aktiv forvaltning",
      chapters: [14],
      body: "<p>Forbrukerrådet har sammenlignet avkastningen mellom indeksfond og aktive fond tilbudt av norske forvaltere siste 20 år (frem til 2018). Hva konkluderte Forbrukerrådet med?</p>",
      options: [
        "Aktive fond gjør det generelt best",
        "Aktive fond presterer dårligere enn indeksfond i alle kategorier",
        "Aktive fond gjør det svakere enn indeksfond på globale, nordiske og europeiske aksjer, men bedre på norske aksjer",
        "Aktive fond gjør det bedre enn indeksfond på europeiske og globale aksjer, men dårligere på norske aksjer",
      ],
      answer: 2,
      solution: "<p><b>Riktig svar: svakere på globale, nordiske og europeiske aksjer, men bedre på norske.</b> Forbrukerrådets gjennomgang av perioden 1998–2018 fant at aktivt forvaltede fond fra norske forvaltere i snitt gjorde det dårligere enn indeksfond i de fleste markeder <i>etter kostnader</i>, med norske aksjer som unntaket.</p><p><b>Hvorfor mønsteret ser slik ut.</b> Hovedforklaringen i kurset er kostnader, ikke ferdigheter. Aktive fond tar typisk 1,2–2 % i årlig forvaltningshonorar mot 0,2–0,3 % for et indeksfond. Differansen på rundt ett prosentpoeng i året må tjenes inn igjen før kunden er i null, og over tjue år er et prosentpoeng i året omtrent 22 % lavere sluttverdi. Oslo Børs er et lite og relativt lite analysert marked der en norsk forvalter i det minste har en informasjonsfordel; i det globale markedet konkurrerer han mot alle.</p><p><b>Nyansen du bør ta med.</b> Selv der aktive fond gjorde det bedre, var forspranget lite og perioden én bestemt tjueårsperiode. Det som er stabilt over studier, er ikke hvilke forvaltere som slår markedet, men at <b>kostnadene er den mest pålitelige prediktoren for netto avkastning</b>. Et beslektet problem forelesningen tar opp er «skapindeksfond»: fond som tar aktivt honorar og likevel følger indeksen tett.</p><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Aktive fond gjør det generelt best</b> — motsatt av funnet.</p><p><b>Dårligere i alle kategorier</b> — for absolutt. Alternativet er laget for den som husker hovedbudskapet, men ikke unntaket. Med minuspoeng er dette den farligste av de tre, fordi den ligger nærmest sannheten.</p><p><b>Bedre på europeiske og globale, dårligere på norske</b> — nøyaktig speilvendt. Sjekk retningen før du krysser av: hjemmemarkedet er der forvalteren har best forutsetninger.</p><p><b>Regelen.</b> Kostnadene er den ene faktoren du kan kontrollere på forhånd. Standardrådet i kurset er brede indeksfond med lavt honorar, med mulig unntak for markeder du har en reell informasjonsfordel i.</p>",
    },

    /* --------------------------------------------------------------- 17 --- */
    {
      n: 17,
      title: "Innskuddspensjon mot ytelsespensjon",
      points: 1,
      topic: "Pensjon",
      chapters: [15],
      body: "<p>Hvilken påstand om innskuddspensjon er riktig?</p>",
      options: [
        "Innskuddspensjon innebærer at arbeidsgiver garanterer en fast andel av sluttlønn utbetalt til pensjon, uavhengig av avkastning.",
        "Du kan normalt velge og endre risikoprofil og forvaltningsvalg på din innskuddspensjon.",
        "Du kan ta ut innskuddspensjonen når som helst før pensjonsalder dersom du trenger likviditet.",
        "Innskuddspensjon forvaltes kollektivt uten individuelle valg, og du kan ikke påvirke plasseringen.",
      ],
      answer: 1,
      solution: "<p><b>Riktig svar: du kan normalt velge og endre risikoprofil.</b> Ved innskuddspensjon setter arbeidsgiveren inn et bestemt beløp, typisk en prosentandel av lønnen (obligatorisk tjenestepensjon krever minst 2 % fra første krone). Pengene står på din egen pensjonskonto, og <b>du bærer investeringsrisikoen</b>. Fordi risikoen er din, er også plasseringsvalget ditt: leverandørene tilbyr profiler fra forsiktig til 100 % aksjer, og du kan bytte underveis.</p><p><b>Det bærende skillet i kapitlet.</b></p><table class=\"data\"><tr><th></th><th>Innskuddspensjon</th><th>Ytelsespensjon</th></tr><tr><td>Arbeidsgiver lover</td><td>et innskudd i dag</td><td>en ytelse ved pensjonering</td></tr><tr><td>Hvem bærer risikoen</td><td>den ansatte</td><td>arbeidsgiveren</td></tr><tr><td>Plasseringsvalg</td><td>den ansatte velger</td><td>ingen individuelle valg</td></tr><tr><td>Pensjonens størrelse</td><td>avhenger av avkastningen</td><td>fast andel av sluttlønn</td></tr></table><p><b>Hvorfor de gale alternativene er gale.</b></p><p><b>Alternativ A</b> beskriver <i>ytelsespensjon</i>, ikke innskuddspensjon. En garantert andel av sluttlønn uavhengig av avkastning er nettopp det innskuddsordningen ikke gir. Dette er settets tydeligste definisjonsbytte.</p><p><b>Alternativ C</b> — pensjonskapitalen er bundet. Du kan ikke ta den ut for å dekke et likviditetsbehov; tidligste uttak er normalt 62 år, og utbetalingen skjer over et avtalt antall år. Bindingen er en del av prisen for skattefavoriseringen.</p><p><b>Alternativ D</b> beskriver det motsatte av innskuddspensjon, og passer nærmere en kollektiv ytelsesordning.</p><p><b>Regelen.</b> Følg risikoen: den som bærer investeringsrisikoen, er også den som får velge plasseringen. Praktisk konsekvens for en ung arbeidstaker er å sjekke at profilen faktisk har høy aksjeandel — standardvalget er ofte for forsiktig, og med tretti år til pensjon koster et forsiktig standardvalg mye.</p>",
    },
  ],
},
{
  id: "h2024",
  label: "Høsten 2024",
  date: "2024-12-09",
  minutes: 240,
  points: 48,
  format: "14 oppgaver · flervalg · kalkulator tillatt",
  note: "Det største settet i arkivet: 48 poeng fordelt på 14 oppgaver og 38 flervalgsledd. Schjelderup har oppgave 1–9 (28 poeng), en gjesteforeleser i internasjonal skatterett har oppgave 10 (9 poeng, én sammenhengende case), og Næss har finansdelen 11–14 (11 poeng). Tre ting gjør settet verdt å kjøre på tid: skjermingskjeden i oppgave 1 går over tre år med framført ubenyttet skjerming, oppgave 8 krever at du kjenner igjen insidensformelen blant fire nesten like uttrykk, og oppgave 10 er den eneste rene skatterettsblokken i hele materialet.",
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

    /* ---------------------------------------------------------------- 4 */
    { n: 4, title: "Bunnfradrag og progressivitet", points: 3, topic: "Progressivitet",
      chapters: [1, 10],
      body: "<p>Regjeringen har vedtatt at skattesatsen på all inntekt er 28%. Kari har 500 kr i inntekt mens Per har kr 1000 i inntekt. Regjeringen har avskaffet bunnfradraget.</p>"
        + "<p class=\"tiny\">Nøkkelen til alle tre delspørsmålene er én formel: med flat sats t og bunnfradrag B er gjennomsnittsskatten t(1 − B/Y). Den er konstant når B = 0 og stigende i Y for enhver B &gt; 0.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hvilke egenskaper har dette skattesystemet:</p>",
          options: ["Skattesystemet er regressivt", "Skattesystemet er progressivt", "Skattesystemet er verken progressivt eller regressivt"],
          answer: 2,
          solution: "<p><b>Steg 1 — regn gjennomsnittsskatten for begge.</b> Uten bunnfradrag betaler Kari 500 × 28 % = kr 140 og Per 1 000 × 28 % = kr 280. Gjennomsnittsskatten er 140/500 = <b>28 %</b> og 280/1 000 = <b>28 %</b>.</p>"
            + "<p><b>Steg 2 — definisjonene.</b> Et skattesystem er <b>progressivt</b> når gjennomsnittsskatten stiger med inntekten, <b>regressivt</b> når den faller, og <b>proporsjonalt</b> (verken–eller) når den er konstant. Her er den konstant. Riktig svar er det tredje alternativet.</p>"
            + "<p><b>Hvorfor de andre er gale — og hvorfor de likevel frister.</b> Per betaler dobbelt så mye <i>i kroner</i> som Kari (280 mot 140), og det er lett å kalle progressivt. Men progressivitet handler om <i>andelen</i>, ikke beløpet. En flat sats gir alltid et høyere beløp fra den som tjener mest, og det gjør den ikke progressiv. «Regressivt» ville krevd at Per betalte en lavere andel enn Kari.</p>"
            + "<p><b>Merk skillet marginal/gjennomsnitt.</b> Marginalskatten er 28 % overalt. Fordi det ikke finnes noe fradrag, er gjennomsnittsskatten lik marginalskatten for alle. Progressivitet oppstår nettopp der de to skiller lag.</p>"
            + "<p><b>Regelen:</b> progressivitet = stigende gjennomsnittsskatt. En flat sats uten fradrag er proporsjonal.</p>" },

        { label: "b", points: 1,
          body: "<p>Regjeringen innfører nå et bunnfradrag på kr 50. Hvilke egenskaper har dette skattesystemet</p>",
          options: ["Skattesystemet er regressivt", "Skattesystemet er progressivt", "Skattesystemet er verken progressivt eller regressivt"],
          answer: 1,
          solution: "<p><b>Steg 1 — Kari.</b> (500 − 50) × 28 % = 450 × 0,28 = kr 126. Gjennomsnittsskatt 126/500 = <b>25,2 %</b>.</p>"
            + "<p><b>Steg 2 — Per.</b> (1 000 − 50) × 28 % = 950 × 0,28 = kr 266. Gjennomsnittsskatt 266/1 000 = <b>26,6 %</b>.</p>"
            + "<p><b>Steg 3.</b> 26,6 % &gt; 25,2 %: gjennomsnittsskatten stiger med inntekten. Systemet er <b>progressivt</b>.</p>"
            + "<p><b>Hvorfor det virker slik.</b> Bunnfradraget er det samme kronebeløpet for begge, men det utgjør 10 % av Karis inntekt og bare 5 % av Pers. Den som tjener minst får skjermet den største <i>andelen</i> av inntekten sin, og betaler derfor en lavere andel i skatt. Det er hele mekanismen bak et progressivt skattesystem med flat sats.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> «Regressivt» krever fallende gjennomsnittsskatt; her stiger den. «Verken–eller» var svaret i deloppgave a, og det gjelder bare uten bunnfradrag.</p>"
            + "<p><b>Kontroll:</b> formelen t(1 − B/Y) gir 0,28 × (1 − 50/500) = 25,2 % og 0,28 × (1 − 50/1 000) = 26,6 %. ✓ Uttrykket stiger i Y for enhver positiv B.</p>"
            + "<p><b>Regelen:</b> et bunnfradrag gjør en flat sats progressiv. Du trenger ikke flere satser for å få progressivitet — ett fradrag holder.</p>" },

        { label: "c", points: 1,
          body: "<p>Regjeringen øker bunnfradraget til kr 200. Skattesatsen er som før 28% på inntekt. Hvilke egenskaper har dette skattesystemet sammenliknet med skattesystemet under spørsmål (b)?</p>",
          options: ["Skattesystemet er regressivt men mindre regressivt enn under spørsmål b.",
                    "Skattesystemet er like progressivt som under spørsmål b.",
                    "Skattesystemet er progressivt, og progressiviteten er sterkere enn under spørsmål (b).",
                    "Skattesystemet er progressivt. Progressiviteten er svakere enn under spørsmål (b)"],
          answer: 2,
          solution: "<p><b>Steg 1 — Kari.</b> (500 − 200) × 28 % = 300 × 0,28 = kr 84. Gjennomsnittsskatt 84/500 = <b>16,8 %</b>.</p>"
            + "<p><b>Steg 2 — Per.</b> (1 000 − 200) × 28 % = 800 × 0,28 = kr 224. Gjennomsnittsskatt 224/1 000 = <b>22,4 %</b>.</p>"
            + "<p><b>Steg 3 — sammenlign spredningen.</b></p>"
            + "<table class=\"data\"><tr><th>Bunnfradrag</th><th>Kari (500)</th><th>Per (1 000)</th><th>Forskjell</th></tr>"
            + "<tr><td>0</td><td class=\"n\">28,0 %</td><td class=\"n\">28,0 %</td><td class=\"n\">0,0 pp</td></tr>"
            + "<tr><td>50</td><td class=\"n\">25,2 %</td><td class=\"n\">26,6 %</td><td class=\"n\">1,4 pp</td></tr>"
            + "<tr><td>200</td><td class=\"n\">16,8 %</td><td class=\"n\">22,4 %</td><td class=\"n\">5,6 pp</td></tr></table>"
            + "<p>Avstanden i gjennomsnittsskatt vokser fra 1,4 til 5,6 prosentpoeng. Systemet er fortsatt progressivt, og <b>sterkere</b> progressivt enn under (b). Riktig svar er det tredje alternativet.</p>"
            + "<p><b>Trykkfeil i sensorveiledningen.</b> Veiledningen oppgir Pers gjennomsnittsskatt til «22,42 %». Regn selv: (1 000 − 200) × 28 %/1 000 = 224/1 000 = <b>22,40 %</b>. Trykkfeilen endrer ingenting — konklusjonen om sterkere progressivitet står. Du har ikke regnet feil om du fikk 22,4 %.</p>"
            + "<p><b>Kontroll — den generelle formen.</b> Forskjellen i gjennomsnittsskatt mellom to inntekter er t · B · (1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>). Den er <i>proporsjonal med B</i>. Bunnfradraget firedobles (50 → 200), og spredningen firedobles (1,4 → 5,6 pp). ✓ Det er den eneste kontrollen du trenger her.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> «Regressivt» krever fallende gjennomsnittsskatt — den stiger. «Like progressivt» ville krevd at spredningen var uendret, men den er firedoblet. «Svakere» har fortegnet motsatt: et større bunnfradrag skjermer en større andel av den lave inntekten, aldri en mindre.</p>"
            + "<p><b>Regelen:</b> med flat sats og bunnfradrag øker progressiviteten monotont med bunnfradraget. Vil du ha mer omfordeling uten å røre satsen, øk fradraget.</p>" },
      ] },

    /* ---------------------------------------------------------------- 5 */
    { n: 5, title: "Gjennomsnittsskatt i et trinnsystem", points: 2, topic: "Trinnskatt",
      chapters: [1],
      body: "<p>Individ A rapporterer en skattepliktig inntekt på kr 450,000, og individ X har en skattepliktig inntekt på kr 380,000. Individene bor i et land med et skattesystem der:</p>"
        + "<ul><li>Inntekt under kr 100 000 beskattes med 12%;</li>"
        + "<li>Inntekt mellom kr 100 000 og kr 350 000 beskattes med 18%; og</li>"
        + "<li>Inntekt over kr 350 000 beskattes med 28%.</li></ul>"
        + "<p>Hvilken gjennomsnittsskatt har individ A og X (rund av til en desimal etter svaret)</p>",
      options: ["Gjennomsnittsskatten til A er 16,9% og til X er den 15,9%",
                "Gjennomsnittsskatten til A er 14,1% og til X er den 11,3%",
                "Gjennomsnittsskatten til A er 18,9% og til X er den 17,2%",
                "Gjennomsnittsskatten til A er 17,5% og til X er den 15,0%"],
      answer: 2,
      solution: "<p><b>Steg 1 — de to nederste trinnene er like for begge.</b> Begge har inntekt over kr 350 000, så begge fyller de to nederste trinnene helt: 12 % × 100 000 = kr 12 000, og 18 % × 250 000 = kr 45 000. Til sammen <b>kr 57 000</b> for begge.</p>"
        + "<p><b>Steg 2 — toppsjiktet, som er det eneste som skiller dem.</b> A: 28 % × (450 000 − 350 000) = 28 % × 100 000 = kr 28 000. X: 28 % × (380 000 − 350 000) = 28 % × 30 000 = kr 8 400.</p>"
        + "<p><b>Steg 3 — samlet skatt.</b> A: 12 000 + 45 000 + 28 000 = <b>kr 85 000</b>. X: 12 000 + 45 000 + 8 400 = <b>kr 65 400</b>.</p>"
        + "<p><b>Steg 4 — gjennomsnittsskatten.</b> A: 85 000/450 000 = 18,889 % → <b>18,9 %</b>. X: 65 400/380 000 = 17,2105 % → <b>17,2 %</b>.</p>"
        + "<table class=\"data\"><tr><th>Trinn</th><th>Sats</th><th>Individ A (450 000)</th><th>Individ X (380 000)</th></tr>"
        + "<tr><td>0–100 000</td><td class=\"n\">12 %</td><td class=\"n\">12 000</td><td class=\"n\">12 000</td></tr>"
        + "<tr><td>100 000–350 000</td><td class=\"n\">18 %</td><td class=\"n\">45 000</td><td class=\"n\">45 000</td></tr>"
        + "<tr><td>over 350 000</td><td class=\"n\">28 %</td><td class=\"n\">28 000</td><td class=\"n\">8 400</td></tr>"
        + "<tr><td><b>Sum skatt</b></td><td class=\"n\"></td><td class=\"n\"><b>85 000</b></td><td class=\"n\"><b>65 400</b></td></tr>"
        + "<tr><td><b>Gjennomsnittsskatt</b></td><td class=\"n\"></td><td class=\"n\"><b>18,9 %</b></td><td class=\"n\"><b>17,2 %</b></td></tr></table>"
        + "<p><b>Trykkfeil i sensorveiledningen — les dette.</b> Veiledningens siste setning sier at «den effektive skattesatsen for Individ X vil være 17,1 %». Det er feil. 65 400/380 000 = 17,2105 %, som med oppgavens eget krav om én desimal blir <b>17,2 %</b>. Både skatten (65 400) og inntekten (380 000) er korrekt utledet i samme avsnitt; bare siste desimal er skrevet feil. <b>Svaralternativet er riktig.</b> Får du 17,2 %, har du regnet riktig — ikke la deg forvirre av veiledningsteksten.</p>"
        + "<p><b>Elimineringen — den er raskere enn regningen.</b> En person med nøyaktig kr 350 000 betaler kr 57 000, altså 57 000/350 000 = <b>16,29 %</b> i gjennomsnitt. Alt over 350 000 skattlegges med 28 %, som er høyere enn 16,29 %, så gjennomsnittsskatten må <i>stige</i> over 16,29 % for enhver inntekt over terskelen. Begge individene ligger over. Da faller:</p>"
        + "<p>· <b>(i) 16,9 % og 15,9 %</b> — X ligger under 16,29 %. Umulig.</p>"
        + "<p>· <b>(ii) 14,1 % og 11,3 %</b> — begge under 16,29 %. Umulig.</p>"
        + "<p>· <b>(iv) 17,5 % og 15,0 %</b> — X ligger under. Umulig. Og 15,0 % er dessuten nøyaktig 57 000/380 000, altså det du får hvis du glemmer det øverste trinnet helt.</p>"
        + "<p>Bare (iii) har begge tallene over 16,29 %. Med minuspoeng er dette den typen argument som gjør et gjett til et svar.</p>"
        + "<p><b>Kontroll:</b> A har kr 70 000 mer i inntekt enn X, og hele differansen ligger i 28 %-sjiktet. 28 % × 70 000 = 19 600, og 85 000 − 65 400 = 19 600. ✓</p>"
        + "<p><b>Regelen:</b> i et trinnsystem skattlegges hvert trinn for seg, aldri hele inntekten med toppsatsen. Gjennomsnittsskatten ligger alltid mellom laveste sats og marginalsatsen, og nærmer seg marginalsatsen jo mer av inntekten som ligger i toppen.</p>" },

    /* ---------------------------------------------------------------- 6 */
    { n: 6, title: "Formuesskatt: gjeldsfordeling og nettoformue", points: 4, topic: "Formuesskatt",
      chapters: [7],
      body: "<p>Bottolf har 1 800 000 kroner i gjeld per 1. januar 2023. Han har en formue før verdsettingsrabatter ved årsskiftet på 6 000 000 kroner. I formuen inngår en primærbolig med verdi 4,8 mill., aksjer med markedsverdi/formuesverdi kr 1 mill., samt et innskudd i bank på kr 200 000. Primærbolig og aksjer har verdsettingsrabatter på henholdsvis 75% og 20%. Gjeld som henføres til primærbolig skal ikke reduseres med verdsettingsrabatten.</p>",
      parts: [
        { label: "a", points: 2,
          body: "<p>Hvor mye skal gjelden på 1,8 mill. reduseres med siden gjelden skal fordeles forholdsmessige mellom aktiva og reduseres med verdsettingsrabattene.</p>",
          options: ["Kr 165 000", "Kr 150 000", "Kr 145 000", "Kr 60 000"],
          answer: 3,
          solution: "<p><b>Steg 1 — andelene av bruttoformuen.</b> Gjelden fordeles etter aktivaenes verdi <i>før</i> rabatt: primærbolig 4,8/6,0 = <b>80 %</b>, aksjer 1,0/6,0 = <b>16⅔ %</b>, bankinnskudd 0,2/6,0 = <b>3⅓ %</b>.</p>"
            + "<p><b>Steg 2 — gjelden fordeles.</b> 1 800 000 × 80 % = 1 440 000 på boligen, × 16⅔ % = 300 000 på aksjene, × 3⅓ % = 60 000 på banken.</p>"
            + "<p><b>Steg 3 — hvilken gjeld reduseres.</b> Gjeld henført til et rabattert aktivum reduseres med samme rabattsats. Men oppgaven sier uttrykkelig at <i>boliggjelden ikke skal reduseres</i>, og bankinnskudd har ingen rabatt. Bare aksjegjelden treffes: 300 000 × 20 % = <b>kr 60 000</b> i reduksjon, slik at 240 000 blir fradragsberettiget.</p>"
            + "<p><b>Steg 4 — fradragsberettiget gjeld.</b> 1 440 000 + 240 000 + 60 000 = kr 1 740 000. Reduksjonen er 1 800 000 − 1 740 000 = <b>kr 60 000</b>.</p>"
            + "<table class=\"data\"><tr><th></th><th>Primærbolig</th><th>Aksjer</th><th>Bank</th><th>Sum</th></tr>"
            + "<tr><td>Verdi før rabatt</td><td class=\"n\">4 800 000</td><td class=\"n\">1 000 000</td><td class=\"n\">200 000</td><td class=\"n\">6 000 000</td></tr>"
            + "<tr><td>Andel av bruttoformuen</td><td class=\"n\">80 %</td><td class=\"n\">16⅔ %</td><td class=\"n\">3⅓ %</td><td class=\"n\">100 %</td></tr>"
            + "<tr><td>Rabatt</td><td class=\"n\">75 %</td><td class=\"n\">20 %</td><td class=\"n\">0 %</td><td class=\"n\"></td></tr>"
            + "<tr><td>Gjeld fordelt</td><td class=\"n\">1 440 000</td><td class=\"n\">300 000</td><td class=\"n\">60 000</td><td class=\"n\">1 800 000</td></tr>"
            + "<tr><td>Fradragsberettiget gjeld</td><td class=\"n\">1 440 000</td><td class=\"n\">240 000</td><td class=\"n\">60 000</td><td class=\"n\">1 740 000</td></tr>"
            + "<tr><td><b>Reduksjon</b></td><td class=\"n\">0</td><td class=\"n\"><b>60 000</b></td><td class=\"n\">0</td><td class=\"n\"><b>60 000</b></td></tr></table>"
            + "<p><b>Elimineringen — den koster deg ti sekunder.</b> Bare ett aktivum har en rabatt som slår inn på gjelden, nemlig aksjene, og gjelden henført dit er kr 300 000. Reduksjonen kan derfor <i>aldri</i> overstige 20 % × 300 000 = kr 60 000. Alle de tre andre alternativene (145 000, 150 000, 165 000) ligger over dette taket og er umulige. De svarer til at du har redusert mer gjeld enn regelen tillater — typisk ved også å ta rabatt på boliggjelden, eller ved å fordele gjelden etter de rabatterte verdiene i stedet for bruttoverdiene.</p>"
            + "<p><b>Kontroll:</b> 1 740 000/1 800 000 = 96,67 %, altså er 3,33 % av gjelden strøket. Og 3,33 % er nøyaktig 20 % av de 16,67 % som ligger på aksjene. ✓</p>"
            + "<p><b>Regelen:</b> gjelden fordeles forholdsmessig etter aktivaenes <b>bruttoverdi før rabatt</b>; deretter reduseres den delen som er henført til et rabattert aktivum med samme rabattsats. Fordeler du etter de rabatterte verdiene, får du systematisk feil svar.</p>" },

        { label: "b", points: 2,
          body: "<p>Hva er Bottolfs skattepliktige nettoformue</p>",
          options: ["Kr 265 000", "Kr 600 000", "Kr 440 000", "Kr 460 000"],
          answer: 3,
          solution: "<p><b>Steg 1 — de skattemessige formuesverdiene.</b> Primærbolig 4 800 000 × 25 % = 1 200 000. Aksjer 1 000 000 × 80 % = 800 000. Bank 200 000 × 100 % = 200 000. Sum <b>kr 2 200 000</b>.</p>"
            + "<p><b>Steg 2 — fradragsberettiget gjeld</b>, fra deloppgave a: <b>kr 1 740 000</b>.</p>"
            + "<p><b>Steg 3 — nettoformuen.</b> 2 200 000 − 1 740 000 = <b>kr 460 000</b>.</p>"
            + "<p><b>Kontroll — aktivum for aktivum.</b> Boligen: 1 200 000 − 1 440 000 = −240 000. Aksjene: 800 000 − 240 000 = +560 000. Banken: 200 000 − 60 000 = +140 000. Sum: −240 000 + 560 000 + 140 000 = 460 000. ✓ Legg merke til at boligen alene gir negativ nettoformue — det er ikke en feil, det er hele grunnen til at primærboligen er så gunstig i formuesskatten.</p>"
            + "<p><b>Elimineringen.</b> Fradragsberettiget gjeld må ligge mellom 1 740 000 (full tillatt reduksjon) og 1 800 000 (ingen reduksjon i det hele tatt). Nettoformuen må derfor ligge mellom kr 400 000 og kr 460 000. Kr 600 000 og kr 265 000 faller utenfor og kan strykes uten regning.</p>"
            + "<p><b>Hvorfor de andre er gale.</b></p>"
            + "<p>· <b>Kr 600 000</b> er en gjenkjennelig dobbeltfeil: 4 800 000 × 25 % + 1 000 000 + 200 000 − 1 800 000 = 2 400 000 − 1 800 000. Du glemte aksjerabatten på aktivasiden <i>og</i> gjeldsreduksjonen. De to feilene henger sammen — glemmer du rabatten ett sted, glemmer du den gjerne begge steder.</p>"
            + "<p>· <b>Kr 440 000</b> forutsetter fradragsberettiget gjeld på 1 760 000, som ingen regel gir. Tallet ligger så nær riktig svar at det fanger regnefeil, ikke metodefeil.</p>"
            + "<p>· <b>Kr 265 000</b> ligger langt under gulvet på 400 000 og forutsetter at langt mer gjeld enn hele bruttogjelden kommer til fradrag.</p>"
            + "<p><b>Merk hva spørsmålet spør om.</b> Det spør om <i>nettoformuen</i>, ikke om formuesskatten. Bunnfradraget skal derfor ikke trekkes fra, og satsen på 1,0 % skal ikke brukes. Hadde det spurt om skatten, ville nettoformuen på 460 000 vært godt under bunnfradraget og skatten null.</p>"
            + "<p><b>Regelen:</b> nettoformue = sum rabatterte formuesverdier − fradragsberettiget gjeld. Rabatten skal alltid gjøres på begge sider av regnestykket.</p>" },
      ] },

    /* ---------------------------------------------------------------- 7 */
    { n: 7, title: "Utbyttet som skal dekke formuesskatten", points: 1, topic: "Formuesskatt og utbytte",
      chapters: [8],
      body: "<p>Leah Løs eier en bedrift som har formuesverdi på kr 100. Hun må betale 1% i formuesskatt av formuesverdien. Hun har likviditetsutfordringer og må ta utbytte for å betale formuesskatten. Samtidig må hun sikre at utbyttet er stort nok til å betale eierskatten på 37,8%. Hvor stort utbytte må Leah ta for å dekke både formuesskatten og skatt på utbytte (rund av til en desimal)?</p>",
      options: ["Kr 2", "Kr 2,1", "Kr 1,2", "Kr 1,6"],
      answer: 3,
      solution: "<p><b>Steg 1 — hva som må stå igjen.</b> Formuesskatten er 1 % × 100 = <b>kr 1</b>. Det er beløpet som må ligge i lommen hennes <i>etter</i> at eierskatten er betalt.</p>"
        + "<p><b>Steg 2 — sett opp bruttoregningen.</b> Tar hun ut et utbytte D, sitter hun igjen med D × (1 − 0,378) = 0,622D. Kravet er 0,622D = 1.</p>"
        + "<p><b>Steg 3 — løs.</b> D = 1/0,622 = 1,6077 → <b>kr 1,6</b> (oppgaven ber om én desimal).</p>"
        + "<p><b>Kontroll:</b> 1,6077 × 37,8 % = 0,6077 i utbytteskatt, og 1,6077 − 0,6077 = 1,0000, som går rett til formuesskatten. ✓ Med det avrundede tallet: 1,6 × 0,622 = 0,9952 ≈ 1.</p>"
        + "<p><b>Hvorfor de andre er gale — regn ut hvilken sats hvert alternativ forutsetter.</b> Løser du (D − 1)/D, får du den skattesatsen alternativet svarer til:</p>"
        + "<table class=\"data\"><tr><th>Alternativ</th><th>Implisitt skattesats (D − 1)/D</th><th>Hva feilen er</th></tr>"
        + "<tr><td class=\"n\">Kr 1,2</td><td class=\"n\">16,7 %</td><td>Skatten lagt på toppen i stedet for bruttoregnet, og med feil sats: 1 × 1,22 = 1,22. Du gangar, du skal dele.</td></tr>"
        + "<tr><td class=\"n\">Kr 1,6</td><td class=\"n\">37,5 %</td><td><b>Riktig</b> (37,5 % er avrundingsutslaget; eksakt 1,6077 gir 37,8 %).</td></tr>"
        + "<tr><td class=\"n\">Kr 2</td><td class=\"n\">50,0 %</td><td>Forutsetter en eierskatt på 50 %.</td></tr>"
        + "<tr><td class=\"n\">Kr 2,1</td><td class=\"n\">52,4 %</td><td>Forutsetter en eierskatt på 52,4 %.</td></tr></table>"
        + "<p><b>Elimineringen.</b> Eierskatten er 37,8 %, altså <i>under</i> 50 %. Bruttoregning med en sats under 50 % kan aldri mer enn doble beløpet, så D må være mindre enn kr 2. Både kr 2 og kr 2,1 kan strykes uten å regne. Da står du igjen med kr 1,2 og kr 1,6, og siden 1,2 × 0,622 = 0,746 ikke rekker til kr 1, er svaret gitt.</p>"
        + "<p><b>Regelen:</b> D = τ<sub>w</sub>·W/(1 − t<sub>e</sub>). Skal et beløp N være igjen etter en skatt t, må uttaket være N/(1 − t) — ikke N × (1 + t). Å legge skatten på toppen er den klassiske feilen, og den blir grovere jo høyere satsen er.</p>"
        + "<p><b>Poenget bak oppgaven:</b> formuesskatten på et unotert selskap må ofte betales med penger som selv beskattes på veien ut. Den effektive belastningen på eieren er derfor τ<sub>w</sub>/(1 − t<sub>e</sub>) = 1 %/0,622 = 1,61 % av formuesverdien, ikke 1 %. Det er hovedargumentet mot formuesskatten i forelesningene.</p>" },

    /* ---------------------------------------------------------------- 8 */
    { n: 8, title: "Insidens: hvem bærer stykkskatten", points: 9, topic: "Skatteinsidens",
      chapters: [11],
      body: "<p>I et frikonkurransemarked er etterspørselen (D) lik tilbudet (S) slik at likevekt gis ved ligningen</p>"
        + "<p style=\"text-align:center\">D(P) = S(P),</p>"
        + "<p>hvor P er prisen. Anta at myndigheten ilegger en skatt pr enhet solgt på t som skal kreves inn av produsentene slik at vi har sammenhengen P = p + t, hvor p er produsentprisen, P er konsumentprisen og t er stykkskatten. Likevekten blir da:</p>"
        + "<p style=\"text-align:center\">D(P) = S(p + t)</p>",
      solution: "<p>Dette er kursets mest testede enkelttema, og de tre delspørsmålene henger på én derivasjon. Lær den, så er alle ni poengene sikre.</p>"
        + "<p><b>Utledningen.</b> Skriv likevekten som en funksjon av produsentprisen alene. Siden P = p + t er</p>"
        + "<p style=\"text-align:center\">D(p + t) = S(p)</p>"
        + "<p>Deriver begge sider med hensyn på t. Venstresiden er en sammensatt funksjon: argumentet p + t endrer seg med ∂p/∂t + 1 når t øker med én enhet.</p>"
        + "<p style=\"text-align:center\">D′(P) · (∂p/∂t + 1) = S′(p) · ∂p/∂t</p>"
        + "<p style=\"text-align:center\">D′ · ∂p/∂t + D′ = S′ · ∂p/∂t</p>"
        + "<p style=\"text-align:center\">D′ = (S′ − D′) · ∂p/∂t</p>"
        + "<p style=\"text-align:center\"><b>∂p/∂t = D′(P) / (S′(p) − D′(P))</b></p>"
        + "<p>Konsumentprisen følger direkte av P = p + t:</p>"
        + "<p style=\"text-align:center\"><b>∂P/∂t = ∂p/∂t + 1 = D′/(S′ − D′) + (S′ − D′)/(S′ − D′) = S′(p) / (S′(p) − D′(P))</b></p>"
        + "<p><b>Fortegnene — dette er det du faktisk luker ut alternativer med.</b></p>"
        + "<p>· D′ &lt; 0: etterspurt mengde faller når prisen stiger.</p>"
        + "<p>· S′ &gt; 0: tilbudt mengde stiger når prisen stiger.</p>"
        + "<p>· Nevneren S′ − D′ = S′ + |D′| er derfor <b>alltid strengt positiv</b>. Den kan aldri bli null eller negativ, og du trenger aldri bekymre deg for fortegnsskifte i brøken.</p>"
        + "<p>Da følger tre ting du kan bruke som filter på ethvert alternativ:</p>"
        + "<p><b>1.</b> ∂p/∂t = D′/(S′ − D′) har negativ teller og positiv nevner, altså <b>negativ verdi mellom −1 og 0</b>. Produsentprisen faller, men aldri med mer enn hele skatten.</p>"
        + "<p><b>2.</b> ∂P/∂t = S′/(S′ − D′) har positiv teller og positiv nevner, og telleren er mindre enn nevneren, altså <b>positiv verdi mellom 0 og 1</b>. Konsumentprisen stiger, men aldri med mer enn skatten.</p>"
        + "<p><b>3.</b> De to summerer alltid til nøyaktig 1: ∂P/∂t − ∂p/∂t = (S′ − D′)/(S′ − D′) = 1. Skatten deles mellom de to sidene av markedet — aldri mer, aldri mindre.</p>"
        + "<p><b>Elastisitetsregelen bak algebraen.</b> Den siden av markedet som er <i>minst</i> elastisk bærer den største delen av skatten, fordi den har færrest alternativer. Perfekt uelastisk etterspørsel (insulin) → konsumentene bærer alt. Perfekt elastisk etterspørsel → produsentene bærer alt. Symmetrisk på tilbudssiden. Og legg merke til at ingenting i utledningen bruker <i>hvem som innkrever</i> skatten: den formelle og den reelle insidensen er to forskjellige ting.</p>",
      parts: [
        { label: "a", points: 3,
          body: "<p>Hvilket av uttrykkene under viser effekten på produsentprisen når skatten øker marginalt?</p>",
          options: ["∂p/∂t = (D′(P) − S′(p)) / (S′(p) − D′(P))",
                    "∂p/∂t = D′(P) / (S′(p) − D′(P))",
                    "∂p/∂t = D′(P) / S′(p)",
                    "∂p/∂t = S′(P) / (S′(p) − D′(P))"],
          answer: 1,
          solution: "<p>Riktig er <b>∂p/∂t = D′(P)/(S′(p) − D′(P))</b>. Utledningen står under «Samlet kommentar».</p>"
            + "<p><b>Slik luker du ut de tre andre uten å derivere:</b></p>"
            + "<p>· <b>(D′ − S′)/(S′ − D′)</b> har teller = −(nevner). Brøken er derfor <b>identisk lik −1</b>, uansett hvordan kurvene ser ut. Et generelt insidensuttrykk kan ikke være en konstant — da ville skattefordelingen vært den samme i alle markeder, og hele elastisitetsteorien var overflødig. (−1 er forøvrig riktig svar i grensetilfellet perfekt elastisk etterspørsel, der produsentene bærer alt. Alternativet er altså et riktig svar på et annet spørsmål.)</p>"
            + "<p>· <b>D′(P)/S′(p)</b> har riktig fortegn — negativt — men mangler tilbakekoblingen. Er etterspørselen bratt og tilbudet flatt, blir tallverdien større enn 1, og en produsentpris som faller med <i>mer</i> enn hele skatten er umulig. Dette er uttrykket du får hvis du deriverer bare den ene siden av likevekten og glemmer at p endrer seg på begge sider.</p>"
            + "<p>· <b>S′(P)/(S′(p) − D′(P))</b> har positiv teller og positiv nevner, altså positiv verdi. En stykkskatt på produsentene kan ikke løfte produsentprisen. Dette er svaret på deloppgave b — se etter om telleren er D′ eller S′, det er hele forskjellen mellom de to spørsmålene.</p>"
            + "<p><b>Regelen:</b> produsentprisen faller med en brøkdel av skatten, og brøkdelen er etterspørselens helning i forhold til summen av de to helningene.</p>" },

        { label: "b", points: 3,
          body: "<p>Hvilket av uttrykkene under karakteriserer endringen i konsumentprisen når stykkskatten øker marginalt?</p>",
          options: ["∂P/∂t = S′(p) / (S′(p) − D′(P))",
                    "∂P/∂t = D′(p) / (S′(p) − D′(P))",
                    "∂P/∂t = (S′(p) − D′(P)) / S′(p)",
                    "∂P/∂t = S′(p) / (D(p) − S′(P))"],
          answer: 0,
          solution: "<p>Riktig er <b>∂P/∂t = S′(p)/(S′(p) − D′(P))</b>. Den følger av P = p + t: ∂P/∂t = ∂p/∂t + 1, og du legger til 1 ved å skrive 1 som (S′ − D′)/(S′ − D′).</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>D′(p)/(S′(p) − D′(P))</b> er uttrykket fra deloppgave a, altså <i>produsentprisen</i>. Det er negativt, og konsumentprisen stiger når skatten øker. Fortegnet alene avslører alternativet.</p>"
            + "<p>· <b>(S′(p) − D′(P))/S′(p)</b> er den omvendte brøken. Skriv den ut: 1 − D′/S′. Siden D′ &lt; 0 er dette <b>alltid større enn 1</b>, altså en konsumentpris som stiger med mer enn skatten. Umulig i et frikonkurransemarked med stigende tilbudskurve.</p>"
            + "<p>· <b>S′(p)/(D(p) − S′(P))</b> har to feil på én linje: nevneren bruker <i>nivået</i> D(p) der den deriverte D′(P) skal stå, og leddene er byttet om slik at fortegnet snus. Se alltid etter apostrofen — det er den letteste feilen å oppdage under tidspress.</p>"
            + "<p><b>Kontroll:</b> legg sammen svarene fra a og b. S′/(S′ − D′) − D′/(S′ − D′) = (S′ − D′)/(S′ − D′) = 1. Konsumentprisøkningen minus produsentprisfallet er nøyaktig lik skatten. ✓ Denne kontrollen fungerer på ethvert par av alternativer, og bare det riktige paret består den.</p>"
            + "<p><b>Regelen:</b> ∂P/∂t ∈ (0, 1). Konsumentens andel av skatten er S′/(S′ − D′), produsentens er |D′|/(S′ − D′), og de summerer til 1.</p>" },

        { label: "c", points: 3,
          body: "<p>Hvilket av uttrykkene under viser effekten på produsentprisen når skatten øker marginalt hvis etterspørselskurven er perfekt uelastisk?</p>",
          options: ["∂p/∂t = 0",
                    "∂p/∂t = D′(P) / (S′(p) − D′(P))",
                    "∂p/∂t = −1",
                    "∂p/∂t = S′(P) / (S′(p) − D′(P))"],
          answer: 0,
          solution: "<p><b>Steg 1 — hva perfekt uelastisk etterspørsel betyr.</b> Etterspurt mengde reagerer ikke på prisen i det hele tatt: etterspørselskurven er loddrett, og <b>D′(P) = 0</b>. Insulin er standardeksempelet — pasienten kjøper samme mengde uansett hva den koster.</p>"
            + "<p><b>Steg 2 — sett D′ = 0 inn i uttrykket fra deloppgave a.</b> ∂p/∂t = 0/(S′ − 0) = <b>0</b>.</p>"
            + "<p><b>Steg 3 — tolkningen.</b> Produsentprisen rører seg ikke. Produsentene bærer ingenting av skatten; konsumentene bærer alt.</p>"
            + "<p><b>Kontroll med deloppgave b:</b> ∂P/∂t = S′/(S′ − 0) = 1. Konsumentprisen stiger krone for krone med skatten, og summen er fortsatt 1 − 0 = 1. ✓</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>D′/(S′ − D′)</b> er det generelle uttrykket. Det er riktig svar på deloppgave a, men spørsmålet her ber om grensetilfellet — og setter du D′ = 0 i det, får du nettopp 0. Alternativet er ikke <i>galt</i> som formel, men det svarer ikke på spørsmålet.</p>"
            + "<p>· <b>−1</b> er det <i>motsatte</i> grensetilfellet: perfekt <b>elastisk</b> etterspørsel (D′ → −∞), der konsumentene forsvinner ved den minste prisøkning og produsentene må svelge hele skatten. Å bytte om «uelastisk» og «elastisk» er den vanligste feilen på hele temaet. Huskeregel: <b>u</b>elastisk = <b>u</b>rørlig kvantum = den siden betaler.</p>"
            + "<p>· <b>S′(P)/(S′(p) − D′(P))</b> blir 1 når D′ = 0. Det er riktig tall for <i>konsumentprisen</i>, men spørsmålet gjelder produsentprisen. Riktig regning, feil pris.</p>"
            + "<p><b>Regelen:</b> den minst elastiske siden bærer skatten. Perfekt uelastisk etterspørsel → ∂p/∂t = 0 og ∂P/∂t = 1. Perfekt elastisk etterspørsel → ∂p/∂t = −1 og ∂P/∂t = 0. Merk også at et loddrett etterspørselsskjema gir <i>null</i> dødvektstap: omsatt mengde endrer seg ikke, så skatten er en ren overføring fra konsumentene til staten.</p>" },
      ] },

    /* ---------------------------------------------------------------- 9 */
    { n: 9, title: "Skattefri obligasjon og implisitt skatt", points: 2, topic: "Implisitt skatt",
      chapters: [12],
      body: "<p>Finansministeren har utstedt to statsobligasjoner; obligasjon A med rente r og obligasjon B med rente R. Begge obligasjoner har samme risiko. Obligasjon A er fritatt for skatt på rentene mens obligasjon B skattlegges med den alminnelige skattesatsen på 22%. Kapitalmarkedet er velfungerende og effektivt. Med nominell avkastning menes avkastning før skatt.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hva er riktig påstand under:</p>",
          options: ["Obligasjon A har høyere nominell avkastning enn obligasjon B dvs.: r &gt; R",
                    "Obligasjon A har lavere nominell avkastning enn obligasjon B dvs.: r &lt; R",
                    "Begge obligasjonene har samme nominelle (før skatt) avkastning: r = R",
                    "Obligasjonene er ikke sammenliknbare så man kan ikke si noe om nominell avkastning."],
          answer: 1,
          solution: "<p><b>Steg 1 — likevektsbetingelsen.</b> To papirer med <i>lik risiko</i> må i et velfungerende marked gi <i>lik avkastning etter skatt</i>. Gjorde de ikke det, ville alle selge det dårligste og kjøpe det beste til prisene hadde utlignet forskjellen.</p>"
            + "<p><b>Steg 2 — sett opp de to.</b> Obligasjon A er skattefri, så avkastningen etter skatt er r. Obligasjon B skattlegges med 22 %, så avkastningen etter skatt er R(1 − 0,22) = 0,78R.</p>"
            + "<p><b>Steg 3 — løs.</b> r = (1 − t)R = 0,78R. Siden 0,78 &lt; 1 følger <b>r &lt; R</b>.</p>"
            + "<p><b>Tallillustrasjon.</b> Er R = 10 %, må r = 7,8 %. Begge gir 7,8 % etter skatt. Kjøperen av A gir avkall på 2,2 prosentpoeng i nominell avkastning — det er prisen for skattefriheten, og nettopp det som kalles den <i>implisitte skatten</i>.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>r &gt; R</b> ville betydd at det skattefavoriserte papiret både ga mer før skatt <i>og</i> slapp skatt. Det er en pengemaskin: ingen ville eid B, og prisen på A ville steget til fordelen forsvant.</p>"
            + "<p>· <b>r = R</b> ville betydd at A ga strengt høyere avkastning etter skatt enn B ved samme risiko. Samme argument: alle kjøper A, prisen stiger, r faller til 0,78R.</p>"
            + "<p>· <b>«Ikke sammenliknbare»</b> er feil nettopp fordi oppgaven har fjernet den eneste tingen som kunne gjort dem usammenlignbare: risikoen er eksplisitt lik, og markedet er eksplisitt velfungerende. Alternativet fanger den som ikke tør å bruke likevektsargumentet.</p>"
            + "<p><b>Regelen:</b> skattefavorisering prises inn i avkastningen <i>før</i> skatt. Fordelen tilfaller ikke den som kjøper i dag, men den som utstedte eller allerede eide papiret da fordelen ble innført. Det gjelder like fullt for skattefrie obligasjoner, BSU, IPS og verdsettingsrabatter i formuesskatten.</p>" },

        { label: "b", points: 1,
          body: "<p>Hvilket av uttrykkene under angir formelen for den implisitte skatten (variabelen t under) på den skattefrie obligasjonen?</p>",
          options: ["t = (R − r)/R", "t = (R − r)/r", "t = R − r", "t = (R − r × 22%)/R"],
          answer: 0,
          solution: "<p><b>Steg 1 — utgangspunktet er likevekten fra deloppgave a:</b> r = R(1 − t).</p>"
            + "<p><b>Steg 2 — løs for t.</b> 1 − t = r/R, altså t = 1 − r/R = <b>(R − r)/R</b>.</p>"
            + "<p><b>Steg 3 — kontroll med tall.</b> R = 10 %, r = 7,8 % gir t = (10 − 7,8)/10 = <b>22 %</b> — nøyaktig den eksplisitte satsen som den skattlagte obligasjonen bærer. Det er hele poenget: når risikoen er lik, er den implisitte skatten på det skattefrie papiret like stor som den eksplisitte skatten på det skattlagte. Skattefriheten er en illusjon for den marginale kjøperen.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>(R − r)/r</b> har feil nevner. Med tallene over gir den 2,2/7,8 = 28,2 %. En skattesats måles alltid i forhold til grunnlaget <i>før</i> skatt, altså R. Dette er samme feil som å regne en rabatt i prosent av utsalgsprisen etter rabatt.</p>"
            + "<p>· <b>R − r</b> er en differanse i <i>prosentpoeng</i> (2,2 pp), ikke en sats. Prosentpoeng og prosent er ikke det samme, og en skattesats er alltid en andel.</p>"
            + "<p>· <b>(R − r × 22 %)/R</b> blander den eksplisitte satsen inn i formelen. Poenget med den implisitte skatten er at den kan måles helt uten å kjenne noen skattesats — du leser den ut av markedsprisene alene. Det er derfor begrepet er nyttig.</p>"
            + "<p><b>Regelen:</b> implisitt skatt t* = 1 − r<sub>skattefri</sub>/r<sub>skattlagt</sub> = (R − r)/R. Den som har <i>lavere</i> marginalskatt enn den implisitte skatten, bør eie det skattlagte papiret; den som har høyere, bør eie det skattefrie. Skattefavoriserte aktiva ender derfor systematisk hos investorer med høy marginalskatt.</p>" },
      ] },

    /* --------------------------------------------------------------- 10 */
    { n: 10, title: "Super-Radar-Vision AS: internasjonal skatt og exit", points: 9, topic: "Internasjonal skatt",
      chapters: [13, 6],
      body: "<p>Den IT-utdannede investoren Snåza Manni er født, oppvokst og bosatt i Ytre Sandviken i Bergen og har alltid vært interessert i fremtiden. For noen år siden stiftet Manni sitt eget heleide aksjeselskap «Super-Radar-Vision AS» og har gjennom selskapet bygget opp en virksomhet innenfor «Artificial Intelligence» software. Hovedproduktet er en software som med imponerende treffsikkerhet kan forutsi resultater fra fremtidige britiske fotballkamper på elitenivå. Etter omfattende nyhetsdekning i slutten av 2023 i NHH Bulletin, ble saken raskt snappet opp av Financial Times og BBC. Deretter eksploderte etterspørselen etter programvaren globalt.</p>"
        + "<p>Manni stiftet «Super-Radar-Vision AS» med en aksjekapital på NOK 50 000. En nylig verdsettelse indikerer at aksjene i selskapet nå er verdt rundt 4 milliarder. Manni har en datter som ble ferdig på NHH i sommer med spesialisering i skatt. Hun bosatte seg deretter i Sveits og har nå familie der. «Super-Radar-Vision AS» etablerte 1. januar 2024 salgsavdelinger med flotte lokaler og egne salgsteam i USA, British Virgin Islands og Japan, og fikk kjapt stor omsetning gjennom disse avdelingene.</p>"
        + "<p>I 2024 har selskapet hatt totalt kr 100 000 000 i omsetning, hvorav:</p>"
        + "<ul><li>30 000 000 stammer fra omsetning i Norge</li>"
        + "<li>20 000 000 stammer fra omsetning i USA</li>"
        + "<li>10 000 000 stammer fra omsetning British Virgin Islands</li>"
        + "<li>40 000 000 stammer fra omsetning i Japan</li></ul>"
        + "<p>Mandag formiddag dalte en rekke brev ned i postkassen til «Super-Radar-Vision AS» i Ytre Sandviken, deriblant brev fra skattemyndighetene i USA, British Virgin Islands og Japan med beskjed om at skattemyndighetene der mener at de lokale avdelingene til selskapet utgjør såkalte «faste driftssteder» og at den lokale omsetningen derfor vil bli fullt ut skattlagt i de respektive landene. I tillegg gjorde et brev fra Mannis revisor oppmerksom på at Manni måtte huske å oppdatere formuesverdien på sine aksjer til å samsvare med virkelig verdi iht. den siste verdsettelsen.</p>"
        + "<p>Du kan forutsette at:</p>"
        + "<ul><li>Det foreligger skatteavtale mellom Norge og USA og at den bygger på unntaksmetoden med fullstendig unntak.</li>"
        + "<li>Det ikke foreligger skatteavtale mellom Norge og British Virgin Islands.</li>"
        + "<li>Det foreligger skatteavtale mellom Norge og Japan og at den bygger på den vanlige kreditmetoden.</li>"
        + "<li>Norge har bedriftsskattesats på 22%.</li>"
        + "<li>USA har bedriftsskattesats på 35 %.</li>"
        + "<li>British Virgin Islands har bedriftsskattesats på 7,5 %.</li>"
        + "<li>Japan har bedriftsskattesats på 15 %.</li>"
        + "<li>Selskapet «Super-Radar-Vision AS» har ingen kostnader i 2024 knyttet til inntektene nevnt ovenfor.</li></ul>"
        + "<p>Manni har overhørt i køen på Rema ved NHH at du nylig har hatt forelesninger i internasjonal skatterett på masternivå. Han ringer derfor nå til deg og har følgende spørsmål:</p>",
      solution: "<p>Ni delspørsmål, ni poeng, og alle henger på tre regler og ett kart. Tegn kartet først, så svarer delspørsmålene seg selv.</p>"
        + "<table class=\"data\"><tr><th>Marked</th><th>Omsetning</th><th>Skatteavtale</th><th>Metode</th><th>Skatt lokalt</th><th>Skatt i Norge</th><th>Samlet</th></tr>"
        + "<tr><td>Norge</td><td class=\"n\">30 000 000</td><td>—</td><td>Intern rett</td><td class=\"n\">—</td><td class=\"n\">6 600 000</td><td class=\"n\">22,0 %</td></tr>"
        + "<tr><td>USA</td><td class=\"n\">20 000 000</td><td>Ja</td><td>Fullstendig unntak</td><td class=\"n\">7 000 000</td><td class=\"n\">0</td><td class=\"n\">35,0 %</td></tr>"
        + "<tr><td>Japan</td><td class=\"n\">40 000 000</td><td>Ja</td><td>Vanlig kredit</td><td class=\"n\">6 000 000</td><td class=\"n\">2 800 000</td><td class=\"n\">22,0 %</td></tr>"
        + "<tr><td>BVI</td><td class=\"n\">10 000 000</td><td>Nei</td><td>Ingen lettelse</td><td class=\"n\">750 000</td><td class=\"n\">2 200 000</td><td class=\"n\">29,5 %</td></tr>"
        + "<tr><td><b>Sum</b></td><td class=\"n\"><b>100 000 000</b></td><td></td><td></td><td class=\"n\"><b>13 750 000</b></td><td class=\"n\"><b>11 600 000</b></td><td class=\"n\"><b>25,35 %</b></td></tr></table>"
        + "<p><b>Regel 1 — globalskatteplikt.</b> Et selskap hjemmehørende i Norge er etter intern rett skattepliktig hit for hele sin verdensinntekt. Skatteavtaler <i>begrenser</i> denne retten; de utvider den aldri. Derfor er «etter norsk intern rett isolert sett» alltid hele beløpet.</p>"
        + "<p><b>Regel 2 — unntaksmetoden med fullstendig unntak.</b> Norge gir helt avkall på inntekten, uten å spørre om kildestaten faktisk skattlegger den. Er kildestatens sats høyere enn den norske, sitter selskapet igjen med den høyere satsen; er den lavere, med den lavere. Skattlegger kildestaten ikke i det hele tatt, oppstår <b>dobbelt-ikke-beskatning</b>.</p>"
        + "<p><b>Regel 3 — vanlig kreditmetode.</b> Norge skattlegger, men gir fradrag i norsk skatt for skatt betalt i kildestaten, <i>begrenset oppad</i> til den norske skatten på nettopp den inntekten (maksimalt kreditfradrag). Er kildesatsen lavere, betaler du differansen til Norge og ender på norsk nivå. Er den høyere, går det overskytende tapt og du ender på kildestatens nivå.</p>"
        + "<p><b>Og regelen uten regel:</b> uten skatteavtale gjelder ingen av delene. Begge stater skattlegger etter sin egen interne rett, og resultatet er dobbeltbeskatning.</p>"
        + "<p><b>Fast driftssted</b> er terskelen som gir kildestaten beskatningsrett i det hele tatt. «Flotte lokaler og egne salgsteam» er skoleeksempelet på et fast forretningssted som virksomheten drives gjennom. Oppgaven har allerede gitt deg konklusjonen i brevene, så du skal ikke drøfte terskelen — du skal bruke den.</p>"
        + "<p class=\"tiny\">Merknad utenfor pensum for dette settet: Norge har også <i>ensidige</i> kreditregler i skatteloven, som i praksis ville avhjulpet en del av BVI-situasjonen. Oppgaven ber deg holde deg til avtalesituasjonen, og fasiten gjør det samme.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hvor mye av den globale omsetningen til «Super-Radar-Vision AS» vil være skattepliktig til Norge etter norsk intern rett isolert sett?</p>",
          options: ["100 000 000", "90 000 000", "30 000 000", "10 000 000"],
          answer: 0,
          solution: "<p><b>Nøkkelordene er «etter norsk intern rett isolert sett».</b> Da ser du bort fra alle skatteavtaler og alle brev fra utenlandske myndigheter.</p>"
            + "<p>Selskapet er stiftet i Norge og hjemmehørende her. Et norsk selskap har <b>globalskatteplikt</b>: hele verdensinntekten er skattepliktig hit. Svaret er <b>kr 100 000 000</b>.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>30 000 000</b> er den norske omsetningen alene. Det er kildestatsprinsippet, ikke globalskatteplikten — og det er nettopp svaret spørsmålet ber deg <i>ikke</i> gi ved å si «isolert sett». Dette er alternativet som fanger flest.</p>"
            + "<p>· <b>90 000 000</b> tar bort BVI-omsetningen. Ingen regel gjør det; BVI er tvert imot det ene markedet der Norge beholder hele sin rett også etter at avtalene er hensyntatt.</p>"
            + "<p>· <b>10 000 000</b> er BVI alene.</p>"
            + "<p><b>Regelen:</b> bostedsstaten har globalskatteplikt etter intern rett. Fast driftssted i utlandet utvider <i>kildestatens</i> rett, men innskrenker ikke Norges interne rett. Det er skatteavtalen som gjør det — og den kommer inn i neste spørsmål.</p>" },

        { label: "b", points: 1,
          body: "<p>Hvordan fordeles beskatningsretten til omsetningen fra USA mellom Norge og USA, hensyntatt skatteavtalen?</p>",
          options: ["Hele de 20 000 000 fordeles til Norge fordi selskapet har globalskatteplikt til Norge",
                    "Hele de 20 000 000 fordeles til USA fordi fullstendig unntaksmetode gjelder etter skatteavtalen",
                    "De 20 000 000 fordeles 50/50 mellom Norge og USA for å unngå dobbeltbeskatning",
                    "Hverken Norge eller USA får beskatningsrett grunnet unntaksmetoden"],
          answer: 1,
          solution: "<p>Salgsavdelingen med egne lokaler og eget salgsteam utgjør et fast driftssted, så USA har kildestatsrett. Skatteavtalen bygger på <b>unntaksmetoden med fullstendig unntak</b>, og Norge unntar da inntekten helt. Hele kr 20 000 000 beskattes bare i USA: 20 000 000 × 35 % = <b>kr 7 000 000</b>, og null til Norge.</p>"
            + "<p>Legg merke til at selskapet her betaler <i>mer</i> skatt enn det ville gjort i Norge (35 % mot 22 %). Unntaksmetoden gir ingen kompensasjon for det. Metoden fjerner dobbeltbeskatning, den utjevner ikke satser.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Hele til Norge fordi globalskatteplikt»</b> stopper ved forrige spørsmål. Globalskatteplikten er utgangspunktet, ikke konklusjonen — skatteavtalen begrenser den, og her begrenser den den til null.</p>"
            + "<p>· <b>«50/50»</b> finnes ikke i noen skatteavtale. Beskatningsretten deles aldri prosentvis mellom stater; den fordeles ved <i>metode</i> (unntak eller kredit). Alternativet er skrevet for den som gjetter på noe som «høres rettferdig ut».</p>"
            + "<p>· <b>«Hverken Norge eller USA»</b> forveksler unntaksmetoden med dobbelt-ikke-beskatning. Unntaket gjelder Norge, ikke kildestaten. Dobbelt-ikke-beskatning oppstår bare hvis kildestaten <i>selv</i> velger å ikke skattlegge — som er nøyaktig det deloppgave f handler om.</p>"
            + "<p><b>Regelen:</b> fullstendig unntak = kildestaten alene, uansett hvilken sats den bruker.</p>" },

        { label: "c", points: 1,
          body: "<p>Hvordan fordeles beskatningsretten til omsetningen fra Japan mellom Norge og Japan, hensyntatt skatteavtalen?</p>",
          options: ["Japan får eksklusiv beskatningsrett til de 40 000 000",
                    "Norge får beskatte de 40 000 000, men må gi kredit for skatt betalt i Japan",
                    "Japan får beskatte de 40 000 000, men må kredit for skatt betalt i Norge",
                    "Norge får beskatte de 40 000 000, forutsatt at det ble utlignet skatt i Japan som kan gis kredit for i Norge"],
          answer: 1,
          solution: "<p><b>Kreditmetoden lar begge stater skattlegge</b>, men hjemstaten gir fradrag i sin egen skatt for skatten betalt i kildestaten.</p>"
            + "<p><b>Regnestykket:</b> Japan skattlegger 40 000 000 × 15 % = kr 6 000 000. Norge beregner sin skatt på samme inntekt: 40 000 000 × 22 % = kr 8 800 000, og gir kredit for de kr 6 000 000. Restskatt til Norge: <b>kr 2 800 000</b>.</p>"
            + "<p><b>Samlet belastning:</b> 6 000 000 + 2 800 000 = kr 8 800 000, altså 22 % — norsk nivå. Det er kreditmetodens signatur: en lavere kildeskattesats gir ingen varig fordel for selskapet, den flytter bare skattekroner fra den norske til den japanske statskassen.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Japan får eksklusiv beskatningsrett»</b> beskriver unntaksmetoden, ikke kreditmetoden. Alternativet er der for å teste om du kan holde de to metodene fra hverandre.</p>"
            + "<p>· <b>«Japan må gi kredit for skatt betalt i Norge»</b> snur rollene. Det er alltid <b>hjemstaten</b> som gir kreditten — kildestaten skattlegger ubetinget innenfor sin rett.</p>"
            + "<p>· <b>Alternativ (d)</b> er den farlige. Den ser nesten ut som (b), men gjør Norges beskatningsrett <i>betinget</i> av at Japan faktisk lignet skatt. Det er feil: Norges rett følger av globalskatteplikten og består uansett. Hadde Japan ikke skattlagt, ville Norge simpelthen skattlagt hele beløpet med 22 % og ikke hatt noe å kreditere. Les hele setningen i hvert alternativ, ikke bare de fem første ordene.</p>"
            + "<p><b>Regelen:</b> vanlig kredit = begge skattlegger, hjemstaten krediterer opp til sin egen skatt på inntekten.</p>" },

        { label: "d", points: 1,
          body: "<p>Hvordan fordeles beskatningsretten til omsetningen fra Britisk Virgin Island?</p>",
          options: ["Beskatningsretten til hele de 10 000 000 tilfaller British Virgin Islands alene siden det ikke foreligger skatteavtale",
                    "Både Norge og British Virgin Islands har beskatningsrett etter sin interne rett",
                    "Beskatningsretten til hele de 10 000 000 tilfaller Norge alene siden selskapet har globalskatteplikt hit",
                    "Ingen av landene har beskatningsrett til de 10 000 000"],
          answer: 1,
          solution: "<p><b>Uten skatteavtale finnes det ingen mekanisme som fordeler beskatningsretten.</b> Begge stater skattlegger etter sin egen interne rett, og ingen av dem er forpliktet til å vike.</p>"
            + "<p>BVI: fast driftssted der gir kildestatsrett → 10 000 000 × 7,5 % = kr 750 000.<br>"
            + "Norge: globalskatteplikt → 10 000 000 × 22 % = kr 2 200 000.<br>"
            + "Samlet: kr 2 950 000, altså <b>29,5 %</b> — mer enn både den norske og den lokale satsen hver for seg.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«BVI alene siden det ikke foreligger skatteavtale»</b> har det bakvendt. Det er nettopp en skatteavtale som <i>kunne</i> gitt BVI eneretten (unntaksmetoden). Uten avtale er det ingenting som stanser Norge. Alternativet er den vanligste feilen på spørsmålet, fordi «ingen avtale» intuitivt høres ut som «ingen norsk rett».</p>"
            + "<p>· <b>«Norge alene»</b> glemmer at BVI har kildestatsrett etter sin egen interne rett, og at norsk lov ikke binder BVI.</p>"
            + "<p>· <b>«Ingen av landene»</b> er meningsløst når begge har hjemmel i egen lov.</p>"
            + "<p><b>Regelen:</b> ingen skatteavtale = ingen lettelse = dobbeltbeskatning. Det er hele grunnen til at det finnes over 3 000 skatteavtaler i verden.</p>" },

        { label: "e", points: 1,
          body: "<p>Unngår «Super-Radar-Vision AS» fullt ut internasjonal dobbeltbeskatning?</p>",
          options: ["Ja, selskapet unngår dobbeltbeskatning",
                    "Nei, selskapet blir utsatt for dobbeltbeskatning i British Virgin Islands",
                    "Nei, selskapet blir utsatt for dobbeltbeskatning i British Virgin Islands og i Japan siden skattesatsen der er lavere enn i Norge",
                    "Nei, selskapet blir utsatt for dobbeltbeskatning i USA pga unntaksmetoden"],
          answer: 1,
          solution: "<p>Gå gjennom alle fire markedene — det tar tjue sekunder når kartet er tegnet.</p>"
            + "<p>· <b>Norge (30 mill):</b> bare norsk skatt. Ingen dobbeltbeskatning.</p>"
            + "<p>· <b>USA (20 mill):</b> unntaksmetoden fjerner den norske skatten helt. Ingen dobbeltbeskatning — selv om den amerikanske satsen på 35 % er høyere enn den norske.</p>"
            + "<p>· <b>Japan (40 mill):</b> kreditmetoden fjerner dobbeltbeskatningen <i>fullt ut</i>, fordi den japanske satsen (15 %) er lavere enn den norske (22 %). Kreditten på kr 6 000 000 får plass innenfor den norske skatten på kr 8 800 000. Samlet belastning 22 %, nøyaktig som om inntekten var opptjent i Norge.</p>"
            + "<p>· <b>BVI (10 mill):</b> ingen avtale, ingen kredit. 7,5 % + 22 % = 29,5 %. <b>Her, og bare her, er selskapet dobbeltbeskattet.</b></p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Ja, selskapet unngår dobbeltbeskatning»</b> overser BVI.</p>"
            + "<p>· <b>Alternativ (c)</b> tar med Japan «siden skattesatsen der er lavere enn i Norge». Det er en ren tankefeil, og den er verdt å skjønne: lav kildeskattesats er nettopp tilfellet der kreditmetoden virker <i>perfekt</i>. Dobbeltbeskatning under kreditmetoden oppstår først når kildestatens sats er <b>høyere</b> enn hjemstatens, slik at deler av kildeskatten ikke får plass innenfor maksimalt kreditfradrag. Alternativet har fortegnet snudd.</p>"
            + "<p>· <b>Alternativ (d)</b> peker på USA «pga unntaksmetoden». Unntaksmetoden er den metoden som mest fullstendig fjerner dobbeltbeskatning — den fjerner den ene skatten helt.</p>"
            + "<p><b>Regelen:</b> unntaksmetoden avhjelper dobbeltbeskatning alltid. Kreditmetoden avhjelper den fullt ut når kildesatsen ≤ hjemstatens sats, og delvis når den er høyere. Ingen avtale avhjelper ingenting.</p>" },

        { label: "f", points: 1,
          body: "<p>Generelt: Hva blir konsekvensen under unntaksmetoden (med fullstendig unntak) dersom kildestaten ikke beskatter inntekten?</p>",
          options: ["Dobbelt-ikke beskatning, dvs. at inntekten ikke skattlegges i hverken hjemstaten eller kildestaten.",
                    "Unntaksmetoden gjelder ikke dersom kildestaten ikke beskatter inntekten.",
                    "Hjemstaten må da gi kredit i betalbar skatt.",
                    "Hjemstaten får full beskatningsrett til inntekten om kildestaten velger å ikke skattlegge."],
          answer: 0,
          solution: "<p><b>Fullstendig unntak er ubetinget.</b> Hjemstaten gir avkall på beskatningsretten uten å spørre om kildestaten faktisk bruker sin. Skattlegger ikke kildestaten, blir inntekten ikke skattlagt noe sted: <b>dobbelt-ikke-beskatning</b>.</p>"
            + "<p>Dette er den strukturelle svakheten ved metoden, og selve grunnen til at internasjonal skatterett har beveget seg bort fra rene unntaksavtaler. Motmidlene du bør kunne nevne: <i>subject-to-tax</i>-klausuler (unntaket gjelder bare inntekt som faktisk er skattlagt), overgang til kreditmetode i nyere avtaler, OECDs BEPS-arbeid, og den globale minimumsskatten på 15 % (pilar 2).</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Unntaksmetoden gjelder ikke dersom kildestaten ikke beskatter»</b> beskriver et unntak <i>med</i> subject-to-tax-forbehold. Oppgaven sier uttrykkelig «fullstendig unntak», og da finnes ikke forbeholdet.</p>"
            + "<p>· <b>«Hjemstaten må da gi kredit»</b> blander metodene. Under unntak beregnes det ingen norsk skatt på inntekten, så det finnes ikke noe å kreditere mot.</p>"
            + "<p>· <b>«Hjemstaten får full beskatningsrett»</b> beskriver igjen et forbehold avtalen ikke har. Hadde det vært regelen, ville metoden i praksis vært en kreditmetode.</p>"
            + "<p><b>Regelen:</b> unntaket er ubetinget med mindre avtalen sier noe annet. Betingede varianter finnes, men da står betingelsen i teksten — og oppgaven forteller deg alltid hvilken variant som gjelder.</p>" },

        { label: "g", points: 1,
          body: "<p>Generelt: Hva blir konsekvensen under den vanlige kreditmetoden dersom kildestaten beskatter inntekten med høyere sats enn hjemstaten?</p>",
          options: ["Hjemstaten gir kredit for all skatt betalt i kildestaten.",
                    "Kildestaten gir kredit for all skatt betalt i hjemstaten.",
                    "Kildestaten må da sette ned skattesatsen på inntekten for å få kredit.",
                    "Hjemstaten gir kredit for skatt betalt i kildestaten opp til det beløp som ville blitt betalt på kildestatsinntekten om den hadde vært skattepliktig kun i hjemstaten."],
          answer: 3,
          solution: "<p><b>Vanlig kredit har et tak</b> — maksimalt kreditfradrag. Hjemstaten krediterer aldri mer enn den skatten den selv ville krevd på nettopp den inntekten. Blir kildestatens skatt større, går det overskytende tapt.</p>"
            + "<p><b>Regn på USA-tallene som om avtalen hadde bygget på kredit i stedet for unntak:</b> amerikansk skatt 20 000 000 × 35 % = kr 7 000 000. Norsk skatt på samme inntekt: 20 000 000 × 22 % = kr 4 400 000. Kreditten begrenses til kr 4 400 000, den norske skatten blir null, og <b>kr 2 600 000</b> av den amerikanske skatten får ingen kredit. Samlet belastning 35 % — kildestatens nivå.</p>"
            + "<p><b>Symmetrien er verdt å memorere:</b> under vanlig kredit ender du alltid på <i>den høyeste</i> av de to satsene. Er kildesatsen lav (Japan, 15 %), ender du på hjemstatens 22 %. Er den høy (USA, 35 %), ender du på 35 %.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Hjemstaten gir kredit for all skatt betalt i kildestaten»</b> beskriver <b>full kredit</b>, ikke vanlig kredit. Forskjellen mellom de to er nøyaktig taket, og det er den forskjellen spørsmålet tester. Full kredit ville betydd at Norge betalte ut penger for å subsidiere den amerikanske statskassen — ingen stat gjør det.</p>"
            + "<p>· <b>«Kildestaten gir kredit for skatt betalt i hjemstaten»</b> snur rollene, samme feil som i deloppgave c.</p>"
            + "<p>· <b>«Kildestaten må sette ned satsen for å få kredit»</b> finnes ikke. Kildestaten er ikke part i hjemstatens kreditberegning.</p>"
            + "<p><b>Regelen:</b> kredit = min(kildestatens skatt, hjemstatens skatt på samme inntekt).</p>" },

        { label: "h", points: 1,
          body: "<p>Kombinasjonen av høyt skattetrykk i Norge med mye regn og tåke i Ytre Sandviken gjør til at Manni begynner å lure på å «flytte ut», spesielt siden han kjenner litt på om han bare burde selge hele selskapet til en av de store softwaregigantene internasjonalt - noe han helst kunne tenkt seg å gjøre skattefritt. Samtidig har Manni nettopp truffet sin store kjærlighet og hun driver med eiendomsmegling spesifikt begrenset til området Øyjordsveien-Biskopshavn og finner det fullstendig uaktuelt å flytte fra Ytre Sandviken. Manni lurer på følgende:</p>"
            + "<p>Hva blir konsekvensen ift. «exit skatt» iht. norsk intern skatterett dersom Manni nå skulle gi alle sine aksjer i «Super-Radar-Vision AS» til sin datter som er bosatt i Sveits, slik at datteren da ev. senere kan selge aksjene skattefritt etter intern sveitsisk skatterett?</p>",
          options: ["Den norske \"exit tax\" regelen trigges kun dersom Manni selv flytter ut, siden det er han som er norsk skattesubjekt.",
                    "Det vil først oppstå skatt dersom aksjene selges av datteren.",
                    "Den norske \"exit tax\" regelen trigges også dersom Manni gir sine aksjer til datter bosatt i utlandet, fordi \"exit tax\" reglen omfatter gaver til nærstående som bor i utland.",
                    "Den norske \"exit tax\" regelen gjelder ikke når mottakeren av aksjene er bosatt i et land Norge har skatteavtale med."],
          answer: 2,
          solution: "<p><b>Exit-skatten treffer den latente gevinsten på aksjene når de forlater norsk beskatningsområde</b> — enten fordi eieren flytter ut, eller fordi aksjene overføres til en mottaker bosatt i utlandet. Gave til nærstående i utlandet er uttrykkelig omfattet. Uten den regelen ville exit-skatten vært triviell å omgå: du gir bort aksjene i stedet for å flytte selv.</p>"
            + "<p><b>Størrelsen, så du ser hva som står på spill.</b> Latent gevinst = 4 000 000 000 − 50 000 = kr 3 999 950 000. Med eierskatt 37,84 % er den latente skatten i størrelsesorden <b>1,5 milliarder kroner</b>. Betalingen kan fordeles over tolv år etter dagens regler, men den forsvinner ikke.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Trigges kun dersom Manni selv flytter ut»</b> er nøyaktig den omgåelsen regelen er skrevet for å stanse. Legg merke til at oppgaven har bygget hele saken rundt at Manni <i>ikke kan</i> flytte (kjæresten vil ikke) — det er et hint om at spørsmålet handler om aksjene, ikke om personen.</p>"
            + "<p>· <b>«Skatt oppstår først dersom aksjene selges av datteren»</b> ville gitt Norge ingen beskatningsrett i det hele tatt, siden datteren er bosatt i Sveits og selger etter sveitsisk intern rett — som oppgaven sier er skattefritt. Det er hele poenget med gaven, og hele poenget med exit-skatten.</p>"
            + "<p>· <b>«Gjelder ikke når mottakeren bor i et avtaleland»</b> finnes ikke. En skatteavtale fordeler beskatningsretten til en <i>framtidig</i> gevinst; den opphever ikke uttaket fra norsk beskatningsområde i dag.</p>"
            + "<p><b>Regelen:</b> exit-skatt utløses når aksjene forlater norsk beskatningsområde, uansett om det er personen eller aksjene som flytter.</p>" },

        { label: "i", points: 1,
          body: "<p>Kan norsk «exit tax» for Manni unngås dersom han i stedet «flytter ut» selve selskapet «Super-Radar-Vision AS» til Sveits? Dvs. om det ikke er Manni personlig, men selskapet «Super-Radar-Vision AS», som «flytter»?</p>",
          options: ["Ja, da unngår man skatt.",
                    "Nei, da blir det dobbeltbeskatning.",
                    "Manni personlig unngår \"exit tax\" ansvar, men utflytting av \"Super-Radar-Vision AS\" vil trigge beskatning av selskapet som om det hadde blitt likvidert, dvs. realisasjonsbeskatning på selskaps- og aksjonærnivå.",
                    "Dersom selskapet flyttes ut, vil aksjene også anses utflyttet, slik at man uansett trigger \"exit tax\" for Manni personlig."],
          answer: 2,
          solution: "<p>Flytter Manni <i>selskapet</i> i stedet for seg selv, treffes han ikke personlig av exit-skatten — han er fortsatt bosatt i Norge, og aksjene er fortsatt hans. Men selskapet treffes av <b>utflyttingsbeskatning</b>: det anses som om det er likvidert på utflyttingstidspunktet, med realisasjonsbeskatning <b>både på selskapsnivå og på aksjonærnivå</b>.</p>"
            + "<p>Regningen blir derfor ikke mindre — den flyttes bare til et annet ledd, og aksjonærleddet er den samme Manni. Riktig svar er det tredje alternativet.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Ja, da unngår man skatt»</b> er drømmen oppgaven tester. Skattelovgivningen har lukket akkurat denne døren, og det er den mest forutsigbare feilen å gjøre.</p>"
            + "<p>· <b>«Nei, da blir det dobbeltbeskatning»</b> er upresist, ikke helt usant. Beskatningen på selskaps- og aksjonærnivå er ikke <i>internasjonal</i> dobbeltbeskatning (to stater om samme inntekt), men den ordinære toleddede beskatningen av selskapsoverskudd, her utløst av en fingert likvidasjon. Spørsmålet gjelder mekanismen, og alternativ (c) beskriver den; (b) gjør ikke det.</p>"
            + "<p>· <b>Alternativ (d)</b> sier at aksjene «anses utflyttet» slik at Manni personlig får exit-skatt. Det er feil mekanisme: exit-skatten på aksjer forutsetter at <i>eieren</i> eller <i>aksjene</i> forlater norsk område, og her gjør ingen av delene det. Det er selskapets utflytting som utløser likvidasjonsbeskatningen.</p>"
            + "<p><b>Regelen:</b> verken personen eller selskapet slipper ut av norsk beskatningsområde uten et skatteoppgjør på den latente gevinsten. Regelsettene er ulike, resultatet er beslektet — og det er poenget med hele deloppgave h og i sett under ett.</p>" },
      ] },

    /* --------------------------------------------------------------- 11 */
    { n: 11, title: "Forventet nytte og forsikring", points: 4, topic: "Forventet nytte",
      chapters: [17],
      body: "<p>Anta i hele denne oppgaven at du har nyttefunksjon U(W)=√W der W er din totale formue.</p>"
        + "<p class=\"tiny\">√W er konkav, altså er du risikoavers. Hele oppgaven avgjøres av én regel: sammenlign U(sikker formue) med E[U(usikker formue)] — aldri kronene direkte.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Noen tilbyr deg en forsikring på mobiltelefonen din til riktig pris, altså at du må betale det samme i forsikringspremie som den forventede utbetalingen for forsikringsselskapet. Bør du takke ja til å kjøpe forsikringen?</p>",
          options: ["Ja, fordi en risikoavers person alltid bør takke ja til forsikring til riktig pris.",
                    "Ja, fordi du har nyttefunksjon √W men du burde ikke takket ja hvis du hadde hatt logaritmisk nyttefunksjon ln(W).",
                    "Nei, man bør aldri forsikre eiendeler som har lav verdi.",
                    "Nei, man bør kun forsikre eiendeler som har lav verdi hvis prisen på forsikring er mindre enn forventet utbetaling."],
          answer: 0,
          solution: "<p><b>«Riktig pris» betyr aktuarisk rettferdig premie:</b> premien er akkurat lik selskapets forventede utbetaling. Da er forventet formue den samme med og uten forsikring — men risikoen er borte med forsikring.</p>"
            + "<p><b>Steg 1.</b> √W er konkav (den annenderiverte er negativ), altså er du risikoavers.</p>"
            + "<p><b>Steg 2.</b> For en risikoavers person er en <i>sikker</i> formue alltid strengt bedre enn et usikkert utfall med <i>samme forventning</i>. Det er selve definisjonen på risikoaversjon (Jensens ulikhet: E[U(W)] &lt; U(E[W]) for konkav U).</p>"
            + "<p><b>Steg 3.</b> Full forsikring til rettferdig pris gir nøyaktig samme forventede formue, uten risikoen. Altså: <b>ja</b>.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>Alternativ 2</b> påstår at svaret hadde vært et annet med ln(W). Det er feil, og det er den viktigste distinksjonen i hele deloppgaven: <b>ln W er også konkav</b>, altså også risikoavers, og gir samme konklusjon. Det er nyttefunksjonens <i>form</i> som avgjør, ikke hvilken konkav funksjon det er. Graden av risikoaversjon bestemmer hvor mye <i>mer enn</i> rettferdig pris du er villig til å betale — ikke om du sier ja til rettferdig pris.</p>"
            + "<p>· <b>Alternativ 3 og 4</b> knytter svaret til gjenstandens verdi. Verdien er irrelevant for prinsippet. Det som betyr noe er om tapet er stort nok i forhold til formuen din til at krumningen i nyttefunksjonen merkes — og selv et lite tap gir en (liten) gevinst av forsikring til rettferdig pris.</p>"
            + "<p><b>Regelen:</b> til aktuarisk rettferdig pris kjøper enhver risikoavers person forsikring. Ligger premien <i>over</i> rettferdig pris, må du regne — se deloppgave c.</p>" },

        { label: "b", points: 1,
          body: "<p>Anta nå at du kan velge å forsikre deler av mobiltelefonen din til riktig pris. Hvor stor andel av verdien til mobiltelefonen bør du forsikre?</p>",
          options: ["Mindre enn 50% av verdien", "Mellom 50% og 99% av verdien", "100% av verdien", "Umulig å si uten å kjenne den eksakte verdien på telefonen"],
          answer: 2,
          solution: "<p><b>Full dekning er optimalt til aktuarisk rettferdig pris.</b> Dette er Mossins resultat, og det er standardspørsmålet på temaet.</p>"
            + "<p><b>Intuisjonen:</b> hver ekstra krone dekning koster deg nøyaktig det den forventes å gi tilbake, så forventet formue er upåvirket av dekningsgraden. Men risikoen faller monotont med dekningsgraden og blir <i>null</i> først ved 100 %. En risikoavers person tar all risikoreduksjon som er gratis — og her er den gratis.</p>"
            + "<p><b>Hvorfor de andre er gale — og hvorfor de likevel høres fornuftige ut:</b></p>"
            + "<p>· <b>«Mindre enn 50 %» og «mellom 50 og 99 %»</b> ville vært riktig hvis premien inneholdt et påslag (en <i>lasting</i>) over rettferdig pris. Da er den siste kronen dekning dyrere enn den er verdt, og det blir optimalt med en egenandel. Dette er den viktigste nyanseringen her, og den forklarer hvorfor virkelige forsikringer har egenandel: virkelige premier ligger alltid over rettferdig pris, fordi selskapet har kostnader og skal tjene penger.</p>"
            + "<p>· <b>«Umulig å si uten å kjenne verdien»</b> er feil: resultatet er uavhengig av beløpet, og gjelder for enhver konkav nyttefunksjon.</p>"
            + "<p><b>Regelen:</b> rettferdig pris → full dekning. Påslag → delvis dekning. Merk at H2025 oppgave 13 spør motsatt vei: der er premien over rettferdig pris, og halv dekning til samme premie er <i>dårligere</i> enn full dekning.</p>" },

        { label: "c", points: 1,
          body: "<p>Anta nå at du vurderer en forsikring for hele huset ditt, som er din eneste eiendel av større verdi. Huset har en totalverdi på 1 million kroner og har 1 % sannsynlighet for å brenne ned og mister da all sin verdi. Et forsikringsselskap tilbyr deg en forsikring for huset ditt, med en premie på 25 000 kroner. Bør du takke ja til denne forsikringen?</p>",
          options: ["Ja, fordi forventet nytte ved forsikring er høyere enn uten forsikring.",
                    "Ja, fordi en risikoavers person alltid vil forsikre sine dyreste eiendeler.",
                    "Nei, fordi forventet nytte ved forsikring er lavere enn uten forsikring.",
                    "Nei, fordi man aldri bør kjøpe forsikring hvis premien er høyere enn den forventede skaden."],
          answer: 2,
          solution: "<p><b>Steg 1 — med forsikring er formuen sikker.</b> 1 000 000 − 25 000 = 975 000. Nytte: √975 000 = <b>987,42</b>.</p>"
            + "<p><b>Steg 2 — uten forsikring.</b> Formuen er 0 med 1 % sannsynlighet og 1 000 000 med 99 %. Forventet nytte = 0,01 × √0 + 0,99 × √1 000 000 = 0,01 × 0 + 0,99 × 1 000 = <b>990,00</b>.</p>"
            + "<p><b>Steg 3 — sammenlign.</b> 987,42 &lt; 990,00. <b>Nei, du bør ikke kjøpe.</b></p>"
            + "<p><b>Hvorfor svaret snur fra deloppgave a.</b> Premien er ikke rettferdig. Forventet skade er 1 % × 1 000 000 = kr 10 000, mens premien er kr 25 000. Påslaget på kr 15 000 er større enn risikoaversjonen din er verdt (se deloppgave d: du er villig til å betale opptil kr 19 900).</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>Alternativ 1</b> har riktig <i>type</i> begrunnelse — sammenligning av forventet nytte — men snudd konklusjon. Regn ferdig før du velger.</p>"
            + "<p>· <b>Alternativ 2</b> («en risikoavers person vil alltid forsikre sine dyreste eiendeler») er den vanligste feilen på hele temaet. Risikoaversjon betyr at du er villig til å betale <i>noe</i> over forventet skade, ikke hva som helst.</p>"
            + "<p>· <b>Alternativ 4</b> er den lumske: den gir riktig konklusjon med feil regel. «Aldri kjøp hvis premien er høyere enn forventet skade» er direkte galt — en risikoavers person betaler gjerne mer enn forventet skade. Kontroll: ved en premie på kr 15 000 er √985 000 = 992,47 &gt; 990, altså <b>kjøp</b>, med premien fortsatt godt over forventet skade på kr 10 000. Alternativet er lagt inn nettopp for å fange den som sammenligner forventet <i>formue</i> i stedet for forventet <i>nytte</i>.</p>"
            + "<p><b>Regelen:</b> sammenlign U(sikker formue) med E[U(usikker formue)]. Kronene lyver alltid i denne retningen: forventet formue er lavere med forsikring så snart premien overstiger forventet skade, men nytten kan likevel være høyere.</p>" },

        { label: "d", points: 1,
          body: "<p>Hva er det maksimale beløpet du er villig til å betale for forsikringen?</p>",
          options: ["19 900 kroner", "23 100 kroner", "27 100 kroner", "29 900 kroner"],
          answer: 0,
          solution: "<p><b>Maksimal premie X er den som gjør deg akkurat indifferent:</b> nytten med forsikring skal være lik forventet nytte uten.</p>"
            + "<p><b>Steg 1 — sett opp ligningen.</b> √(1 000 000 − X) = 990, der 990 er forventet nytte uten forsikring fra deloppgave c.</p>"
            + "<p><b>Steg 2 — kvadrer begge sider.</b> 1 000 000 − X = 990² = 980 100.</p>"
            + "<p><b>Steg 3 — løs.</b> X = 1 000 000 − 980 100 = <b>kr 19 900</b>.</p>"
            + "<p><b>Hva tallet 980 100 er.</b> Det er <b>sikkerhetsekvivalenten</b> til gamblingen — den sikre formuen som er akkurat like god for deg som lotteriet. Forventet formue uten forsikring er 0,99 × 1 000 000 = 990 000, så <b>risikopremien</b> din er 990 000 − 980 100 = kr 9 900. Det er beløpet du er villig til å betale <i>utover</i> den rettferdige premien på kr 10 000 for å bli kvitt risikoen — og 10 000 + 9 900 = 19 900. ✓ Det er kontrollen.</p>"
            + "<p><b>Elimineringen — bruk deloppgave c.</b> Du avviste nettopp en premie på kr 25 000. Maksimalpremien må derfor være <i>mindre</i> enn 25 000, og både <b>kr 27 100</b> og <b>kr 29 900</b> kan strykes uten en eneste utregning. Motsatt vei: du er risikoavers, så maksimalpremien må være <i>større</i> enn den rettferdige premien på kr 10 000. Riktig svar ligger altså i intervallet 10 000–25 000, der bare 19 900 og 23 100 står igjen. Med minuspoeng er det forskjellen mellom et gjett med 25 % og et gjett med 50 % treffsjanse.</p>"
            + "<p><b>Hvorfor 23 100 er galt:</b> √(1 000 000 − 23 100) = √976 900 = 988,38, som fortsatt er lavere enn 990. Distraktorene er lagt symmetrisk rundt riktig svar (19 900 / 23 100 / 27 100 / 29 900), så det siste steget må du faktisk regne.</p>"
            + "<p><b>Regelen:</b> maksimal premie løses av U(W − X) = E[U uten forsikring]. Med U = √W blir X = W − (E[√W])². Samme ligning løst for p i stedet for X gir «laveste sannsynlighet som gjør forsikringen lønnsom», som er den andre varianten av dette spørsmålet.</p>" },
      ] },

    /* --------------------------------------------------------------- 12 */
    { n: 12, title: "Indeksfond, valutasikring og korrelasjon", points: 4, topic: "Porteføljevalg",
      chapters: [14],
      body: "<p>Oppgaven har fire uavhengige delspørsmål om fond, valuta og portefølje.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hvilken av følgende påstander om indeksfond er feil?</p>",
          options: ["Indeksfond gir generelt bedre diversifisering (lavere risiko) enn enkeltaksjer",
                    "Indeksfond gir generelt høyere avkastning enn et vektet gjennomsnitt av enkeltaksjene på børsen.",
                    "Indeksfond er generelt billigere enn aktivt forvaltede fond.",
                    "Indeksfond gir sannsynligvis bedre avkastning enn enkeltaksjer når mange andre har innsideinformasjon som du ikke har."],
          answer: 1,
          solution: "<p><b>Les spørsmålet to ganger:</b> det ber om påstanden som er <b>feil</b>. Negativt formulerte spørsmål er den billigste måten å kaste bort et poeng på.</p>"
            + "<p><b>Påstand 2 er feil.</b> Et indeksfond eier hele markedet i markedsverdivekter og gir derfor per definisjon nøyaktig avkastningen til det verdivektede gjennomsnittet av aksjene i indeksen — minus forvaltningshonoraret. Det kan ikke gi <i>mer</i>; over tid gir det litt mindre. Det er ren aritmetikk, ikke en empirisk påstand.</p>"
            + "<p><b>De tre andre er riktige:</b></p>"
            + "<p>· <b>1 — diversifisering.</b> Et indeksfond eier hundrevis av selskaper, så den selskapsspesifikke risikoen er nesten borte. Lavere standardavvik enn en enkeltaksje, med samme forventede markedsavkastning.</p>"
            + "<p>· <b>3 — kostnader.</b> Indeksfond koster typisk 0,1–0,3 % i året mot 1–2 % for aktivt forvaltede fond, fordi det ikke kreves analyse. Kostnadsforskjellen er den best dokumenterte grunnen til at indeksfond slår aktive fond over tid — og Forbrukerrådets gjennomganger av norske fond viser det samme.</p>"
            + "<p>· <b>4 — innsideinformasjon.</b> Handler du enkeltaksjer mot noen som vet mer enn deg, taper du systematisk. Kjøper du hele markedet, slipper du å velge, og du kan ikke plukkes ut. Dette er hovedargumentet for indeksfond i et marked som ikke er perfekt effektivt.</p>"
            + "<p><b>Regelen:</b> et indeksfond gir markedsavkastningen med markedsrisikoen, billig. Enhver påstand om at det gir <i>mer</i> enn markedet, er feil per konstruksjon.</p>" },

        { label: "b", points: 1,
          body: "<p>Anta at du vurderer å kjøpe et globalt indeksfond, for eksempel gjennom DNB eller Nordnet. Hvordan er typisk eksponeringen til disse globale indeksfondene på ulike regioner?</p>",
          options: ["Cirka 70 prosent i amerikanske aksjer, 20 prosent i Kina og resten i andre land",
                    "Cirka 40 prosent i amerikanske aksjer, 30 prosent i Kina og resten i andre land.",
                    "Cirka 40 prosent i amerikanske aksjer, lite eller ingen eksponering mot Kina, og resten i andre land.",
                    "Cirka 70 prosent i amerikanske aksjer, lite eller ingen eksponering mot Kina, og resten i andre land."],
          answer: 3,
          solution: "<p>Riktig er <b>cirka 70 prosent i amerikanske aksjer, lite eller ingen eksponering mot Kina</b>.</p>"
            + "<p><b>Hvorfor.</b> Et «globalt» indeksfond følger normalt en indeks over <i>utviklede</i> markeder — MSCI World, FTSE Developed eller tilsvarende — vektet etter markedsverdi. USA utgjør omtrent 70 % av børsverdien i utviklede markeder, og andelen har vokst gjennom hele 2010- og 2020-tallet. Kina er et <i>framvoksende</i> marked og inngår derfor ikke. Vil du ha Kina, må du kjøpe et fond som eksplisitt dekker emerging markets, eller en «all country»-indeks (MSCI ACWI) — der Kina uansett bare utgjør noen få prosent.</p>"
            + "<p><b>Hvorfor de andre er gale.</b> De to alternativene med 20 % og 30 % i Kina overdriver Kina grovt; ingen bredt solgt norsk globalfond har den eksponeringen. De to med «cirka 40 prosent i amerikanske aksjer» undervurderer USA — 40 % var omtrent nivået for tjue år siden, og alternativet fanger den som husker et gammelt tall.</p>"
            + "<p><b>To ting å ta med videre.</b> For det første: et «globalt» indeksfond er i praksis en stor amerikansk posisjon, altså en konsentrasjonsrisiko de fleste ikke er klar over. For det andre: derfor er valutaeksponeringen i et slikt fond i hovedsak dollar — som er nettopp det deloppgave c handler om.</p>" },

        { label: "c", points: 1,
          body: "<p>Du vurderer å kjøpe et globalt indeksfond med valutasikring. Dette betyr at valutasvingningene til fondet fjernes, slik at du kun får avkastningen på aksjene. Anta at du er risikoavers og at arbeidsinntekten din er høyere når kronen er sterk. Din fremtidige inntekt er summen av arbeidsinntekt og inntekt fra dette fondet. Hvilken påstand er riktig?</p>",
          options: ["Du bør valutasikre fondet.",
                    "Du bør ikke valutasikre fondet.",
                    "Du bør vurdere valutasikring kun dersom du er svært risikoavers.",
                    "Siden valutasikring gjør at du får utbetalt samme beløp uansett, så vil du være indifferent til valutasikring."],
          answer: 1,
          solution: "<p>Poenget er <b>samvariasjonen</b> mellom fondet og arbeidsinntekten din, ikke fondets risiko isolert.</p>"
            + "<p><b>Steg 1.</b> Arbeidsinntekten din er <i>høy</i> når kronen er sterk, og lav når kronen er svak.</p>"
            + "<p><b>Steg 2.</b> Et globalt indeksfond er i utenlandsk valuta. Uten valutasikring er fondet verdt <i>mer i kroner</i> når kronen er svak, og mindre når kronen er sterk.</p>"
            + "<p><b>Steg 3.</b> Altså: det usikrede fondet gir deg mest nettopp når arbeidsinntekten er lavest. Det er en <b>naturlig sikring</b> av samlet inntekt, og den jevner ut totalen.</p>"
            + "<p><b>Steg 4.</b> Valutasikrer du, fjerner du denne motsyklikken. Da svinger bare arbeidsinntekten, og samlet inntekt blir <i>mer</i> usikker, ikke mindre. En risikoavers person vil ikke det. Konklusjon: <b>du bør ikke valutasikre</b>.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>«Du bør valutasikre»</b> ser på fondet isolert. Valutasikring senker fondets egen varians, men øker variansen til det du faktisk bryr deg om — summen av arbeidsinntekt og formuesinntekt.</p>"
            + "<p>· <b>«Kun dersom du er svært risikoavers»</b> har fortegnet feil: jo mer risikoavers du er, jo mer verdt er den naturlige sikringen, og jo <i>sterkere</i> er argumentet mot valutasikring.</p>"
            + "<p>· <b>«Indifferent siden valutasikring gir samme beløp uansett»</b> misforstår hva valutasikring er. Den fjerner valutasvingningen, ikke aksjeavkastningen. Utbetalingen er langt fra sikker.</p>"
            + "<p><b>Regelen:</b> vurder et aktivum ut fra hvordan det samvarierer med resten av formuen din — humankapitalen inkludert — ikke ut fra dets eget standardavvik. Det er samme prinsipp som ligger under Mertons formel og under rådet om ikke å eie aksjer i egen arbeidsgiver.</p>" },

        { label: "d", points: 1,
          body: "<p>Det finnes to aksjer A og B. Du kan kun investere i disse to aksjene. Aksje A har forventet avkastning på 10% og standardavvik på 20%, mens aksje B har forventet avkastning på 2% og standardavvik på 30%. Aksjene er positivt korrelerte med korrelasjonskoeffisient 1.</p>"
            + "<p>Hvor stor andel av pengene dine bør du investere i aksje A dersom det eneste du bryr deg om er å lage en portefølje av aksje A og B som har så lavt standardavvik som mulig?</p>",
          options: ["100%", "99%", "69%", "51%"],
          answer: 0,
          solution: "<p><b>Steg 1 — hva ρ = 1 gjør med variansformelen.</b> Generelt er σ<sub>p</sub>² = w²σ<sub>A</sub>² + (1 − w)²σ<sub>B</sub>² + 2w(1 − w)ρσ<sub>A</sub>σ<sub>B</sub>. Med ρ = 1 blir høyresiden et fullstendig kvadrat, og standardavviket blir <b>lineært</b>:</p>"
            + "<p style=\"text-align:center\">σ<sub>p</sub> = w·σ<sub>A</sub> + (1 − w)·σ<sub>B</sub></p>"
            + "<p><b>Steg 2 — et lineært uttrykk har ingen indre minimumsverdi.</b> Minimum ligger i et hjørne, og hjørnet med lavest σ er <b>100 % i aksje A</b> (20 % mot 30 %).</p>"
            + "<p><b>Kontroll — regn på alternativene:</b> w = 0,99 gir 0,99 × 20 % + 0,01 × 30 % = 20,1 %. w = 0,69 gir 23,1 %. w = 0,51 gir 24,9 %. Alle er høyere enn 20 %, som er hva w = 1 gir. ✓</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>69 %</b> er den klassiske fellen og verdt å kjenne igjen: det er minimum-varians-vekten dersom du setter ρ = 0, altså σ<sub>B</sub>²/(σ<sub>A</sub>² + σ<sub>B</sub>²) = 0,09/0,13 = 69,2 %. Alternativet er laget for den som bruker minimumsvariansformelen mekanisk uten å se hva ρ = 1 gjør med den.</p>"
            + "<p>· <b>99 % og 51 %</b> er indre løsninger uten noe grunnlag.</p>"
            + "<p><b>Elimineringsknepet:</b> ved ρ = 1 må svaret være et <b>hjørne</b> — 0 % eller 100 % — aldri en indre andel. Da står bare ett alternativ igjen, og du trenger ikke regne i det hele tatt.</p>"
            + "<p><b>To merknader.</b> (1) Hadde du fått lov til å shortselge, ville ρ = 1 gitt en <i>risikofri</i> portefølje ved w = σ<sub>B</sub>/(σ<sub>B</sub> − σ<sub>A</sub>) = 30/(30 − 20) = 300 % i A og −200 % i B. Alle alternativene ligger mellom 0 og 100 %, så oppgaven forutsetter at shorting ikke er mulig. (2) Her er A dessuten best på forventet avkastning (10 % mot 2 %), så konklusjonen er ekstra opplagt: B har lavere avkastning, høyere risiko og ingen diversifiseringsgevinst å tilby.</p>"
            + "<p><b>Regelen:</b> ved perfekt positiv korrelasjon finnes ingen diversifiseringsgevinst. Standardavviket er et veid gjennomsnitt, og du minimerer det ved å legge alt i aksjen med lavest standardavvik.</p>" },
      ] },

    /* --------------------------------------------------------------- 13 */
    { n: 13, title: "Pensjonsordninger og IPS", points: 2, topic: "Pensjon",
      chapters: [15],
      body: "<p>Oppgaven har to uavhengige delspørsmål om pensjonssparing.</p>",
      parts: [
        { label: "a", points: 1,
          body: "<p>Hva er hovedforskjellen mellom en innskuddspensjonsordning og en ytelsespensjonsordning?</p>",
          options: ["Innskuddspensjon gir fast utbetaling i pensjonstiden, mens ytelsespensjon er avhengig av avkastning.",
                    "Innskuddspensjon betyr at arbeidsgiver sparer et fast beløp på dine vegne, mens ytelsespensjon garanterer en bestemt utbetaling i pensjonstiden.",
                    "Ytelsespensjon er obligatorisk, mens innskuddspensjon er frivillig for ansatte.",
                    "Ytelsespensjon er kun tilgjengelig for private ansatte, mens innskuddspensjon gjelder offentlig ansatte."],
          answer: 1,
          solution: "<p><b>Innskuddspensjon:</b> arbeidsgiver setter av en avtalt prosent av lønnen din hvert år (minimum 2 % av lønn opp til 12 G etter OTP-loven). Pengene investeres, og pensjonen din blir det beholdningen er verdt når du tar den ut. <b>Avkastnings- og levealdersrisikoen er din.</b></p>"
            + "<p><b>Ytelsespensjon:</b> arbeidsgiver garanterer en bestemt utbetaling, typisk en andel av sluttlønnen (for eksempel 66 % inkludert folketrygd). Arbeidsgiver må skyte inn det som trengs for å innfri løftet. <b>Avkastnings- og levealdersrisikoen er arbeidsgiverens.</b></p>"
            + "<p>Påstand 2 sier nøyaktig dette, og er riktig.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>Påstand 1</b> har byttet om de to. Det er ytelsespensjonen som gir fast utbetaling og innskuddspensjonen som avhenger av avkastningen. Dette er standarddistraktoren på temaet, og den er lett å velge om du leser fort.</p>"
            + "<p>· <b>Påstand 3</b> er feil: obligatorisk tjenestepensjon (OTP) er obligatorisk for arbeids<i>giver</i>, uansett om ordningen er innskudds- eller ytelsesbasert. Ingen av dem er frivillig for den ansatte.</p>"
            + "<p>· <b>Påstand 4</b> er feil: begge typer finnes i begge sektorer. Offentlig sektor hadde tradisjonelt ytelsespensjon, og privat sektor har gått nesten helt over til innskudd — men det er en historisk tendens, ikke en regel, og påstanden snur dessuten retningen.</p>"
            + "<p><b>Huskeregelen:</b> navnet forteller hva som er <i>avtalt</i>. Ved <b>innskudd</b> er innskuddet avtalt; ved <b>ytelse</b> er ytelsen avtalt. Den av partene som ikke har fått noe avtalt, bærer risikoen.</p>" },

        { label: "b", points: 1,
          body: "<p>Hvilken påstand om Individuell pensjonssparing (IPS) er riktig?</p>",
          options: ["IPS fungerer på samme måte som BSU, men gir i tillegg fritak for formuesskatt.",
                    "IPS gir mulighet til å utsette skatt, og kan dermed sees som et rentefritt lån fra staten. I tillegg gir IPS fritak for formuesskatt.",
                    "IPS gir fritak for formuesskatt, og du kan ta ut pengene når du er 35 år for å kjøpe bolig.",
                    "Du slipper formuesskatt på hele formuen din hvis du bruker IPS."],
          answer: 1,
          solution: "<p><b>IPS (individuell pensjonssparing) har tre egenskaper du må kunne:</b></p>"
            + "<p><b>1. Utsatt skatt.</b> Du får fradrag i alminnelig inntekt for innskuddet (22 % av beløpet, opp til et årlig maksbeløp), og betaler i stedet skatt på alminnelig inntekt når pengene tas ut. Dette er en <i>utsettelse</i>, ikke et fritak — men fordi du beholder skattekronene og lar dem avkaste i mellomtiden, virker det som et <b>rentefritt lån fra staten</b>. Verdien av ordningen er nettopp avkastningen på de utsatte skattekronene i bindingstiden.</p>"
            + "<p><b>2. Fritak for formuesskatt</b> på beløpet som står på IPS-kontoen.</p>"
            + "<p><b>3. Binding.</b> Pengene er låst til pensjonsalder (fra 62 år) og kan ikke brukes til noe annet.</p>"
            + "<p>Påstand 2 sier nøyaktig punkt 1 og 2, og er riktig.</p>"
            + "<p><b>Hvorfor de andre er gale:</b></p>"
            + "<p>· <b>Påstand 1</b> sammenligner med BSU. BSU virker helt annerledes: der får du et fradrag <i>i skatten</i> (10 % av innskuddet), ikke i inntekten, og pengene er øremerket bolig. De to ordningene har ingen felles mekanikk.</p>"
            + "<p>· <b>Påstand 3</b> limer BSU-egenskapen på IPS: uttak som 35-åring for å kjøpe bolig. IPS er bundet til pensjonsalder.</p>"
            + "<p>· <b>Påstand 4</b> overdriver fritaket. Det gjelder bare IPS-kontoen, ikke hele formuen din. Alternativet fanger den som husker at «IPS har noe med formuesskatt å gjøre» uten å huske hva.</p>"
            + "<p><b>Regelen:</b> IPS = utsatt inntektsskatt + fritak for formuesskatt på selve kontoen + binding til pensjonsalder. Ordningen er mest verdt for den som har lang tid igjen til uttak og høy avkastning i mellomtiden.</p>" },
      ] },

    /* --------------------------------------------------------------- 14 */
    { n: 14, title: "Avdragsfrihet på lån", points: 1, topic: "Lån",
      chapters: [16],
      body: "<p>Hvilken påstand om avdragsfrihet på lån er riktig?</p>",
      options: ["Det kan være lurt å be om avdragsfrihet hvis du har midlertidige problemer med likviditeten.",
                "Det kan være lurt å be om avdragsfrihet fordi det fungerer som et rentefritt lån fra banken.",
                "Det kan være lurt å be om avdragsfrihet fordi dette gjør at staten betaler avdragene på lånet i en periode.",
                "Kostnaden ved lånet blir den samme uansett om man ber om avdragsfrihet eller ikke, så kun ikke-rasjonelle personer bør be om avdragsfrihet."],
      answer: 0,
      solution: "<p><b>Hva avdragsfrihet er.</b> I en periode betaler du bare renter, ikke avdrag. Lånet blir ikke mindre, men den månedlige utbetalingen faller.</p>"
        + "<p><b>Riktig er påstand 1:</b> avdragsfrihet er en likviditetsordning. Har du et <i>midlertidig</i> likviditetsproblem — permittering, sykdom, foreldrepermisjon, en uventet regning — er avdragsfrihet en billig måte å frigjøre kontantstrøm på, langt billigere enn forbrukslån eller kredittkort. Utlånsforskriften åpner for at banken kan innvilge det, men for lån over 60 % av boligverdien skal det normalt betales avdrag.</p>"
        + "<p><b>Regnestykket som viser hvor mye det frigjør.</b> Et annuitetslån på kr 3 000 000 til 5 % nominell rente over 25 år koster kr 17 538 i måneden. Av den første terminen er kr 12 500 renter og kr 5 038 avdrag. Avdragsfrihet frigjør altså om lag kr 5 000 i måneden — men hele beløpet er avdrag, altså <i>sparing</i>, ikke kostnad. Det du «sparer» er penger du senere må betale, med renter i mellomtiden.</p>"
        + "<p><b>Hvorfor de andre er gale:</b></p>"
        + "<p>· <b>Påstand 2 («rentefritt lån fra banken»)</b> er direkte feil. Du betaler renter hele veien, og du betaler renter på et <i>større</i> beløp i <i>lengre</i> tid. Samlet rentekostnad går opp, ikke ned. (Uttrykket «rentefritt lån fra staten» hører hjemme i deloppgave 13b om IPS, der skatten faktisk utsettes uten rente — pass på å ikke blande de to.)</p>"
        + "<p>· <b>Påstand 3 («staten betaler avdragene»)</b> er ren fantasi. Staten har ingen rolle; dette er en avtale mellom deg og banken. Sammenlign med rentefradraget, der staten faktisk dekker 22 % av rentekostnaden — men det gjelder uansett avdragsfrihet eller ikke.</p>"
        + "<p>· <b>Påstand 4</b> er feil på begge sine to punkter: kostnaden blir <i>høyere</i> (mer rente over lengre tid), og det er likevel ikke irrasjonelt å be om det, fordi verdien av likviditet nå kan overstige den ekstra rentekostnaden. Alternativet er skrevet for den som har lært at «avdrag er ikke en kostnad» og trekker konklusjonen én tanke for langt.</p>"
        + "<p><b>Regelen:</b> avdragsfrihet flytter kontantstrøm fra framtiden til nå og øker den samlede rentekostnaden. Den er riktig når likviditetsproblemet er midlertidig, og farlig når det ikke er det — da utsetter du bare et problem som vokser.</p>" },
  ],
},
{
  id: "h2022",
  label: "Høsten 2022",
  date: "2022-12-15",
  minutes: 240,
  points: 35,
  format: "7 oppgaver · 31 flervalgsledd · hjemmeeksamen · 35 poeng",
  note: "Dette var en <b>hjemmeeksamen</b> i Wiseflow, ikke en skoleeksamen: fire timer med alle hjelpemidler tilgjengelig. Det gjør oppgavene tyngre enn skoleeksamenene i 2024 og 2025 — flere regnesteg per spørsmål, lengre faktabeskrivelser og en internasjonal skatteoppgave på åtte delspørsmål. Settet er samtidig det <b>første rene flervalgssettet</b> i kurset, og temaprofilen er den samme som i 2026: skjerming og oppjustering utgjør omtrent en tredel av poengene. Merk at satsene er 2020–2022-satser: skjermingsrente 5 %, eierskatt 25 % og oppjusteringsfaktor 1,6, som gir en effektiv eierskatt på 40 % — ikke dagens 1,72 og 37,84 %. (Aksjerabatten i formuesskatten var 45 % i 2022, men formuesskatt er ikke prøvd i dette settet.) Kildefila har både en bokmåls- og en nynorskversjon; nynorskversjonen har to regnefeil, og bokmålsversjonen er brukt her.",
  facts: [
    "Hjemmeeksamen 15. desember 2022, 09:00–13:00, levert i Wiseflow.",
    "Alle hjelpemidler tillatt — det er en hjemmeeksamen, ikke en skoleeksamen.",
    "35 poeng fordelt på sju oppgaver: aksjonærmodellen 16 p, internasjonal skatt 6 p, personlig finans 13 p.",
    "Fire til sju svaralternativer per spørsmål — flere enn de fire du møter i 2026.",
    "Dette settet hadde ikke minuspoeng. Slå på minuspoeng for å trene 2026-forhold.",
    "Satsene er 2022-satser: skjermingsrente 5 %, eierskatt 25 %, oppjusteringsfaktor 1,6. I 2026 er faktoren 1,72 og eierskatten 37,84 %.",
  ],
  practiceNote: "Hjemmeeksamen med flere regnesteg per spørsmål enn skoleeksamenene. Regn ferdig før du ser på alternativene — halvparten av dem er konstruert for å treffe et mellomresultat.",
  mc: { wrongFactor: 0 },
  exercises: [
    {
      n: 1,
      title: "Kjell Inge og Lugano AS",
      points: 10,
      topic: "Aksjonærmodellen",
      chapters: [5, 1],
      body: "<p>Kjell Inge har kjøpt selskapet Lugano AS. Selskapets aksjekapital består av en aksje som Kjell Inge kjøpte for kr 500 000 i desember måned 2020. Lugano AS har et driftsresultat før skatt på kr 150 000 i 2020. Du kan legge til grunn at den alminnelige skattesatsen er 22%, at skjermingsrenten er 5%, at eierskatten er 25% og oppjusteringsfaktoren 1,6.</p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Spørsmål 1: Hvor mye betaler Lugano i selskapsskatt i 2020?</p>",
          options: ["Kr 33 000", "Kr 37 500", "Kr 30 000", "Kr 110 000", "Kr 47 500"],
          answer: 0,
          solution: "<p><b>Regnestykket.</b></p><p>1. Grunnlaget for selskapsskatten er selskapets <b>driftsresultat før skatt</b>, ikke aksjens kostpris og ikke det som eventuelt deles ut: 150 000.<br>2. Satsen er den alminnelige skattesatsen τ<sub>c</sub> = 22 %.<br>3. Selskapsskatt = 150 000 × 0,22 = <b>kr 33 000</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 37 500</b> = 150 000 × 25 %. Her er <i>eierskatten</i> brukt på selskapets overskudd. Eierskatten treffer aksjonæren når pengene tas ut, ikke selskapet når de tjenes. To satser, to skattesubjekter.<br><b>Kr 30 000</b> = 150 000 × 20 %. En avrundet «cirka 20 %» selskapsskatt. Satsen har vært 22 % siden 2019 og oppgaven oppgir den eksplisitt.<br><b>Kr 110 000</b> = 500 000 × 22 %. Riktig sats på feil grunnlag: aksjens kostpris i stedet for årets overskudd. Kostprisen er grunnlag for <i>skjermingen</i>, aldri for selskapsskatten.<br><b>Kr 47 500</b> lar seg ikke regne fram av oppgavens tall i noen konsistent rutine — et rent støyalternativ. Det er verdt å merke seg som teknikk: når ett alternativ ikke svarer til noen tenkelig feil, er det som regel fyll.</p><p><b>Regelen.</b> Selskapsskatt = alminnelig sats × selskapets skattepliktige overskudd, uavhengig av hva som deles ut og uavhengig av hva aksjen kostet.</p><p><b>Kontroll.</b> Overskudd etter skatt blir 150 000 × 0,78 = 117 000, og 150 000 &minus; 117 000 = 33 000. Samme tall den andre veien.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>Spørsmål 2. Kjell Inge er glad i å ta utbytte og ønsker å ta ut utbytte i 2021 av overskuddet i 2020, men han liker ikke å betale skatt. Han bestemmer seg derfor for å ta ut kun utbytte innenfor skjerming. Hvor mye kan han ta ut i utbytte uten å betale eierskatt?</p>",
          options: ["Kr 20 000", "Kr 25 000", "Kr 5 000", "Kr 30 000", "Kr 7 500"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b></p><p>1. Skjermingsgrunnlaget S er aksjens <b>kostpris</b> pluss eventuell framført ubenyttet skjerming. Aksjen ble kjøpt i desember 2020 for 500 000, og det er ingen framført skjerming ennå, så S = 500 000.<br>2. Skjermingsrenten er r<sub>s</sub> = 5 %.<br>3. Skjermingsfradrag = S × r<sub>s</sub> = 500 000 × 0,05 = <b>kr 25 000</b>.<br>4. Utbytte opp til skjermingsfradraget er skattefritt for eieren, så han kan ta ut kr 25 000 uten eierskatt.</p><p><b>Hvorfor de andre er gale.</b> Tre av dem er riktig grunnlag med feil rente, og én er riktig rente på feil grunnlag:</p><table class=\"data\"><tr><th>Alternativ</th><th>Regnestykket bak</th><th>Feilen</th></tr><tr><td class=\"n\">Kr 5 000</td><td class=\"n\">500 000 × 1 %</td><td>Feil skjermingsrente</td></tr><tr><td class=\"n\">Kr 20 000</td><td class=\"n\">500 000 × 4 %</td><td>Feil skjermingsrente</td></tr><tr><td class=\"n\">Kr 30 000</td><td class=\"n\">500 000 × 6 %</td><td>Feil skjermingsrente</td></tr><tr><td class=\"n\">Kr 7 500</td><td class=\"n\">150 000 × 5 %</td><td>Riktig rente, men på driftsresultatet i stedet for kostprisen</td></tr></table><p>Kr 7 500 er den farlige: den kommer av å blande sammen de to tallene som står i oppgaveteksten. Skjermingen har <b>ingenting</b> med årets overskudd å gjøre — den er en normalavkastning på det du har betalt for aksjen.</p><p><b>Regelen.</b> Skjermingsfradraget = skjermingsgrunnlaget (kostpris + framført ubenyttet skjerming) × skjermingsrenten, beregnet per aksje for den som eier aksjen ved <b>årsskiftet</b>.</p><p><b>Kontroll.</b> 25 000 er 5 % av 500 000 og 16,7 % av det utdelbare overskuddet på 117 000 — det siste tallet har ingen selvstendig betydning, men det viser at skjermingen er en beskjeden del av utbyttet her, som er hele poenget med spørsmål 3.</p>",
        },
        {
          label: "c",
          points: 2,
          body: "<p>Spørsmål 3. Kjell Inge har likevel kommet til at han i 2021 må ta ut mer utbytte enn han opprinnelig hadde tenkt seg da han skal kjøpe seg ny båt. Han bestemmer seg for å ta ut alt overskudd i selskapet som utbytte etter at selskapsskatten er betalt. Hvor mye betaler Kjell Inge i eierskatt?</p>",
          options: ["Kr 30 000", "Kr 23 000", "36 800", "23 200", "32 384"],
          answer: 2,
          solution: "<p><b>Regnestykket — fire steg, og hvert galt alternativ hopper over ett av dem.</b></p><p>1. <b>Utdelbart utbytte.</b> Selskapet har 150 000 før skatt og betaler 33 000 i selskapsskatt, så det som kan deles ut er 150 000 &minus; 33 000 = <b>117 000</b>.<br>2. <b>Trekk skjermingen.</b> Skattepliktig utbytte før oppjustering = 117 000 &minus; 25 000 = <b>92 000</b>.<br>3. <b>Oppjuster grunnlaget.</b> 92 000 × 1,6 = <b>147 200</b>.<br>4. <b>Eierskatt.</b> 147 200 × 0,25 = <b>kr 36 800</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 23 000</b> = 92 000 × 25 %. <b>Oppjusteringen er glemt.</b> Dette er den vanligste feilen på hele eksamen, og den ligger alltid i alternativlisten. Er du usikker, sjekk om ditt svar er nøyaktig 1,6 ganger et av de andre alternativene — da har du eller de hoppet over oppjusteringen.<br><b>32 384</b> = 147 200 × 22 % = 92 000 × 1,6 × 0,22. <b>Riktig grunnlag, feil sats:</b> den alminnelige satsen på 22 % er brukt der eierskatten på 25 % skal stå. Legg merke til at 0,22 × 1,6 = 35,2 %, som dukker opp igjen som feilalternativ i spørsmål 4 — de to feilene henger sammen.<br><b>Kr 30 000</b> = 150 000 × 20 %. Regnet på selskapets bruttooverskudd med en avrundet sats: både selskapsskatten, skjermingen og oppjusteringen er borte. Merk at dette tallet båret videre gir 42 % i spørsmål 5, som også er et alternativ der.<br><b>23 200</b> ligger 200 kroner fra 23 000 og svarer ikke til noen konsistent rutine. Den er der for å straffe den som leser fort og ser «23» først. To alternativer som skiller seg med under én prosent er alltid et signal om at du skal lese hele tallet.</p><p><b>Regelen.</b> Eierskatt på utbytte = (utbytte &minus; skjermingsfradrag) × oppjusteringsfaktor × eierskattesats. Skjermingen trekkes <b>før</b> oppjusteringen, aldri etter.</p><p><b>Kontroll — regn den andre veien.</b> Oppjusteringen kan legges på satsen i stedet for på grunnlaget: effektiv eierskattesats t<sub>e</sub> = 0,25 × 1,6 = 40 %, og 92 000 × 0,40 = 36 800. Samme tall. Denne dobbeltregningen tar ti sekunder og fanger nesten alle oppjusteringsfeil.</p><p><b>Merk satsene.</b> I 2022 var faktoren 1,6 og eierskatten 25 %, som gir t<sub>e</sub> = 40 %. I 2026 er faktoren <b>1,72</b> og den alminnelige satsen 22 %, som gir t<sub>e</sub> = 22 % × 1,72 = <b>37,84 %</b>. Rutinen er identisk, men tallene er ikke — bruk alltid satsene oppgaven selv oppgir.</p>",
        },
        {
          label: "d",
          points: 1,
          body: "<p>Spørsmål 4. Hva blir effektiv skatt på utbyttet når Kjell Inge bestemmer seg for å ta ut alt overskudd i selskapet som utbytte etter at selskapsskatten er betalt?</p>",
          options: ["35,2%", "35%", "25%", "31,5%", "47,6%"],
          answer: 3,
          solution: "<p><b>Regnestykket.</b> «Effektiv skatt på utbyttet» betyr betalt eierskatt delt på <b>hele utbyttet</b>, ikke på det skattepliktige grunnlaget:</p><p>36 800 / 117 000 = 0,31453 = <b>31,5 %</b> (avrundet til én desimal).</p><p>Satsen er lavere enn den nominelle eierskatten fordi de første 25 000 kronene av utbyttet er skjermet. Skjermingen er 25 000/117 000 = 21,4 % av utbyttet, og 40 % × (1 &minus; 0,214) = 31,45 % — det er nøyaktig hele forklaringen på hvorfor svaret ikke er 40 %.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>35,2 %</b> = 0,22 × 1,6. Den alminnelige satsen oppjustert i stedet for eierskatten, og dessuten regnet som en ren sats uten å ta hensyn til skjermingen. Dette er tvillingen til alternativ 32 384 i spørsmål 3.<br><b>35 %</b> er 35,2 % avrundet — et alternativ som bare finnes for å fange den som regnet 0,22 × 1,6 og deretter «ryddet» tallet.<br><b>25 %</b> er den nominelle eierskattesatsen, altså svaret til den som verken oppjusterer eller skjermer. Vær oppmerksom: 25 % er også eierskatten regnet mot det <i>skattepliktige</i> utbyttet hvis oppjusteringen glemmes (23 000/92 000). Begge veier er feil av samme grunn.<br><b>47,6 %</b> ligger i nærheten av den <i>samlede</i> effektive satsen for selskap og eier og er en felle for den som svarer på spørsmål 5 i stedet for spørsmål 4. Den samlede satsen er dessuten 46,5 %, ikke 47,6 %.</p><p><b>Regelen.</b> Effektiv skattesats = betalt skatt / det beløpet skatten måles mot. Les alltid hva nevneren skal være: <i>utbyttet</i> (117 000) i dette spørsmålet, <i>bruttoinntekten</i> (150 000) i det neste.</p><p><b>Kontroll.</b> Målt mot det skattepliktige grunnlaget er satsen 36 800/92 000 = 40 % = t<sub>e</sub>, akkurat som den skal være. Går du fra 40 % til 31,5 % ved å gange med 92 000/117 000 = 0,7863, har du regnet riktig begge veier.</p>",
        },
        {
          label: "e",
          points: 2,
          body: "<p>Spørsmål 5. Hva er effektiv skattesats samlet for eier og selskapet når Kjell Inge bestemmer seg for å ta ut alt overskudd i selskapet som utbytte etter at selskapsskatten er betalt?</p>",
          options: ["47,5%", "46,5%", "50%", "47%", "42%"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b></p><p>1. Samlet betalt skatt = selskapsskatt + eierskatt = 33 000 + 36 800 = <b>69 800</b>.<br>2. Bruttoinntekten er selskapets driftsresultat <b>før</b> all skatt: 150 000.<br>3. Effektiv samlet sats = 69 800 / 150 000 = 0,46533 = <b>46,5 %</b>.</p><p><b>Feil i kilden — les dette.</b> Nynorskversjonen av sensorveiledningen oppgir <b>46,8 %</b> her. Det er en regnefeil: 69 800/150 000 = 46,533 %, som avrundet er 46,5 %. Bokmålsversjonen har 46,5 % og er riktig. Har du regnet 46,5 % og sett 46,8 % et sted, er det veiledningen som tar feil, ikke du.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>47 %</b> = 22 % + 25 %, satsene lagt sammen. Skattesatser i kjede legges aldri sammen — den andre skatten treffer bare det som er igjen etter den første. Samme tall kommer også ut av (33 000 + 37 500)/150 000, altså eierskatt regnet direkte på bruttooverskuddet.<br><b>42 %</b> = (33 000 + 30 000)/150 000. Dette er hva du får hvis du drar det gale svaret 30 000 fra spørsmål 3 videre hit. Én feil forplanter seg gjennom fire delspørsmål — når du har regnet en delverdi, sjekk den før du bygger på den.<br><b>50 %</b> er et rundt tall uten regning bak.<br><b>47,5 %</b> ligger ett hakk over riktig svar og er tvillingen som fanger den som runder feil vei eller husker at «samlet skatt på utbytte er rundt 47–48 %». Det stemmer for en eier <i>uten</i> skjerming, ikke her.</p><p><b>Regelen.</b> Samlet effektiv sats på selskapsoverskudd som deles ut = 1 &minus; (1 &minus; τ<sub>c</sub>)(1 &minus; t<sub>e</sub>) når hele overskuddet deles ut og det ikke er skjerming. Skjermingen trekker satsen ned.</p><p><b>Kontroll — bygg satsen opp fra bunnen.</b> Uten skjerming: 1 &minus; 0,78 × 0,60 = <b>53,2 %</b>. Skjermingen gjør bare 92 000 av de 117 000 skattepliktige, altså 78,63 % av utbyttet:<br>0,22 + 0,78 × 0,7863 × 0,40 = 0,22 + 0,2453 = <b>46,53 %</b>. Samme tall som 69 800/150 000. &#10003;</p><p><b>Merk satsene.</b> Med 2026-satsene ville regnestykket uten skjerming gitt 1 &minus; 0,78 × (1 &minus; 0,3784) = 51,5 %, ikke 53,2 %.</p>",
        },
        {
          label: "f",
          points: 3,
          body: "<p>Spørsmål 6. Kjell sitter med aksjen både i 2021 og 2022, men sommeren 2023 selger han selskapet og aksjen for kr 550 000. Anta han tok ut utbytte i 2021 som oversteg skjermingen. Selskapet betalte ikke ut utbytte i 2022 og skjermingsrenten var 10% i 2022 og 5% i 2023. Hva betaler Kjell Inge i skatt på gevinsten av aksjesalget?</p>",
          options: ["Kr 50 000", "Kr 0", "Kr 100 000", "Kr 22 000", "Kr 25 000"],
          answer: 1,
          solution: "<p>Dette er settets tyngste enkeltspørsmål (3 poeng) og den klassiske skjermingsfellen: <b>ubenyttet skjerming framføres og reduserer gevinsten ved salg</b>.</p><p><b>Regnestykket, år for år.</b></p><table class=\"data\"><tr><th>År</th><th>Skjermings&shy;grunnlag</th><th>Skjermings&shy;rente</th><th>Skjerming</th><th>Utbytte</th><th>Ubenyttet, framført</th></tr><tr><td>2021</td><td class=\"n\">500 000</td><td class=\"n\">5 %</td><td class=\"n\">25 000</td><td>Over skjermingen</td><td class=\"n\">0</td></tr><tr><td>2022</td><td class=\"n\">500 000</td><td class=\"n\">10 %</td><td class=\"n\">50 000</td><td class=\"n\">0</td><td class=\"n\">50 000</td></tr><tr><td>2023</td><td colspan=\"4\">Aksjen selges om sommeren — han eier den ikke ved årsskiftet</td><td class=\"n\">&mdash;</td></tr></table><p>1. <b>2021:</b> utbyttet oversteg skjermingen, så hele årets skjerming på 25 000 ble brukt. Ingenting å framføre.<br>2. <b>2022:</b> ingen utbytte, og skjermingen er 500 000 × 10 % = 50 000. Hele beløpet blir <b>ubenyttet skjerming som framføres</b>.<br>3. <b>2023:</b> skjermingsfradrag tilkommer den som eier aksjen <b>ved utgangen av året</b>. Kjell Inge selger om sommeren og får derfor ingen skjerming for 2023, selv om renten er oppgitt til 5 %. Renten for 2023 er oppgitt nettopp for å friste deg til å bruke den.<br>4. <b>Gevinsten:</b> salgssum &minus; inngangsverdi &minus; ubenyttet skjerming = 550 000 &minus; 500 000 &minus; 50 000 = <b>0</b>.<br>5. Skattepliktig gevinst er null, så oppjustering og eierskatt gir <b>kr 0</b> i skatt.</p><p><b>Hvorfor de andre er gale.</b> Alle fire er tall som opptrer i utregningen, men ingen av dem er skatten:</p><p><b>Kr 50 000</b> = 550 000 &minus; 500 000. Den rå gevinsten <b>før</b> ubenyttet skjerming — den vanligste feilen. Den er dessuten ikke en skatt, men et gevinstbeløp: skatten av den ville vært 50 000 × 1,6 × 0,25 = 20 000.<br><b>Kr 25 000</b> er skjermingsfradraget for 2021 (500 000 × 5 %). Feil år og feil størrelse; det er 2022-skjermingen på 50 000 som er ubenyttet.<br><b>Kr 100 000</b> = 2 × 50 000, altså ubenyttet skjerming talt to ganger, eller skjerming også tilkjent for salgsåret. Merk at selv dette gir null skatt, siden gevinsten da blir negativ og skjermingen aldri kan skape et fradragsberettiget tap.<br><b>Kr 22 000</b> = 22 % av 100 000. Alminnelig sats på en gevinst som verken er riktig beregnet eller riktig oppjustert.</p><p><b>Regelen — tre punkter som må sitte.</b><br>(i) Skattepliktig gevinst = vederlag &minus; inngangsverdi &minus; framført ubenyttet skjerming, deretter oppjustert med f og skattlagt med eierskatten.<br>(ii) Ubenyttet skjerming kan redusere gevinsten <b>til null</b>, men aldri under: den skaper ikke tap.<br>(iii) Skjerming tilkommer bare den som eier aksjen ved <b>årsskiftet</b>. Selger du i løpet av året, får du ingen skjerming for salgsåret.</p><p><b>Kontroll.</b> Salgsvederlaget overstiger kostprisen med 50 000, og den framførte skjermingen er nøyaktig 50 000. De to nuller hverandre ut. Hadde han solgt for 600 000, ville gevinsten vært 600 000 &minus; 500 000 &minus; 50 000 = 50 000, og skatten 50 000 × 1,6 × 0,25 = 20 000.</p>",
        },
      ],
    },
    {
      n: 2,
      title: "Martine og lakseaksjen LAX",
      points: 3,
      topic: "Ubenyttet skjerming",
      chapters: [5],
      body: "<p>Martine har kjøpt en aksje i lakseselskapet LAX med kostpris kr 100 i 2018. Siden hun satt med aksjen over årsskiftet 2018/2019, har hun rett på utbytte i 2018 samt skjerming. Martine sitter på aksjen helt fram til i dag og har ingen planer om å selge aksjen. Anta følgende utbyttepolitikk og skjermingsrente i følgende år:</p><table class=\"data\"><tr><th>År</th><th>Utbytte</th><th>Skjermingsrente</th></tr><tr><td>2018</td><td class=\"n\">Kr 3</td><td class=\"n\">2 %</td></tr><tr><td>2019</td><td class=\"n\">Kr 5</td><td class=\"n\">3 %</td></tr><tr><td>2020</td><td class=\"n\">Kr 1</td><td class=\"n\">5 %</td></tr><tr><td>2021</td><td class=\"n\">Kr 3</td><td class=\"n\">1 %</td></tr></table><p>Hva er skattbart utbytte for Martine i 2021?</p>",
      options: ["0 kr", "1,04 kr", "1,02 kr", "1,1 kr", "4 kr", "3 kr"],
      answer: 0,
      solution: "<p>Dette er flerårsrutinen i ren form. Den må gjøres <b>år for år</b> i én tabell — hopper du rett til 2021, treffer du et av feilalternativene.</p><p><b>Rutinen, i fire kolonner.</b> For hvert år: (1) skjerming = grunnlag × rente; (2) tilgjengelig skjerming = årets skjerming + framført ubenyttet; (3) skattbart utbytte = maks(0, utbytte &minus; tilgjengelig skjerming); (4) ny ubenyttet skjerming = maks(0, tilgjengelig skjerming &minus; utbytte), som <b>legges til grunnlaget</b> neste år.</p><table class=\"data\"><tr><th>År</th><th>Grunnlag S</th><th>Rente</th><th>Årets skjerming</th><th>+ framført</th><th>Utbytte</th><th>Skattbart</th><th>Ny ubenyttet</th></tr><tr><td>2018</td><td class=\"n\">100</td><td class=\"n\">2 %</td><td class=\"n\">2,00</td><td class=\"n\">2,00</td><td class=\"n\">3</td><td class=\"n\">1,00</td><td class=\"n\">0</td></tr><tr><td>2019</td><td class=\"n\">100</td><td class=\"n\">3 %</td><td class=\"n\">3,00</td><td class=\"n\">3,00</td><td class=\"n\">5</td><td class=\"n\">2,00</td><td class=\"n\">0</td></tr><tr><td>2020</td><td class=\"n\">100</td><td class=\"n\">5 %</td><td class=\"n\">5,00</td><td class=\"n\">5,00</td><td class=\"n\">1</td><td class=\"n\">0</td><td class=\"n\">4,00</td></tr><tr><td>2021</td><td class=\"n\">104</td><td class=\"n\">1 %</td><td class=\"n\">1,04</td><td class=\"n\">5,04</td><td class=\"n\">3</td><td class=\"n\"><b>0</b></td><td class=\"n\">2,04</td></tr></table><p><b>Stegene i 2021 skrevet ut.</b></p><p>1. Grunnlaget er kostpris + framført ubenyttet skjerming = 100 + 4 = <b>104</b>. Dette er hele nøkkelen: den ubenyttede skjermingen <i>legges til grunnlaget</i>, den står ikke i en egen bøtte ved siden av.<br>2. Årets skjerming = 104 × 1 % = <b>1,04</b>.<br>3. Tilgjengelig skjerming = 4 (framført) + 1,04 (årets) = <b>5,04</b>.<br>4. Utbyttet er 3, som er mindre enn 5,04, så skattbart utbytte = <b>0 kr</b>.<br>5. Ny ubenyttet skjerming = 5,04 &minus; 3 = <b>2,04</b>, som gir grunnlag 102,04 i 2022.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>1,04 kr</b> er <i>årets skjermingsfradrag</i>, ikke det skattbare utbyttet. Alternativet fanger den som regner riktig og deretter svarer med mellomresultatet — den vanligste enkeltfeilen på et flervalgssett med tidspress.<br><b>1,02 kr</b> = 102 × 1 %. Grunnlaget er da 102 i stedet for 104, altså framført skjerming på 2 i stedet for 4. Det er 2019-tallet (skattbart utbytte 2) forvekslet med ubenyttet skjerming.<br><b>1,1 kr</b> = 110 × 1 %, eller 100 × 1,1 %. Feil grunnlag eller feil rente; et støyalternativ i samme størrelsesorden som de to over, plassert der for å gjøre øyemålet ubrukelig.<br><b>4 kr</b> er den framførte skjermingen fra 2020 alene — riktig mellomresultat, feil spørsmål, og dessuten uten årets 1,04.<br><b>3 kr</b> er utbyttet selv, altså svaret til den som ikke bruker skjerming i det hele tatt.</p><p><b>Merk at fire av seks alternativer er tall som faktisk opptrer i riktig utregning</b> (1,04, 1,02-nabo, 4 og 3). Det er slik disse spørsmålene bygges: distraktorene er <i>dine egne mellomresultater</i>. Skriv derfor alltid ned hva spørsmålet spør om før du leser alternativene.</p><p><b>Regelen.</b> Ubenyttet skjerming framføres på den enkelte aksjen, legges til skjermingsgrunnlaget året etter, og kan bare redusere skattbart utbytte til null — aldri under. Den følger aksjen og aksjonæren, ikke selskapet.</p><p><b>Kontroll.</b> Summen over alle fire år: samlet utbytte 3 + 5 + 1 + 3 = 12; samlet skjerming 2 + 3 + 5 + 1,04 = 11,04; samlet skattbart 1 + 2 + 0 + 0 = 3. Og 12 &minus; 11,04 = 0,96 &ne; 3, som viser at skjerming <b>ikke</b> kan summeres over år uten å ta hensyn til at den ikke kan skape fradrag i år med lite utbytte — 2,04 av skjermingen står fortsatt ubrukt. Regnestykket 12 &minus; 11,04 = 0,96 er nettopp det nynorskversjonen av veiledningen roter til (se under).</p><p><b>Feil i kilden.</b> Nynorskversjonen av dette spørsmålet oppgir <b>0,96 kr</b> som riktig svar og regner ut fra et utbytte på 6 i 2021 — men nynorskoppgavens egen tabell sier fortsatt 3. Fasiten regner altså på andre tall enn oppgaven oppgir. Bokmålsversjonen er konsistent: med utbytte 3 er svaret <b>0 kr</b>, og akkumulert ubenyttet skjerming blir 2,04.</p>",
    },
    {
      n: 3,
      title: "Strømstøtten som fjernes",
      points: 3,
      topic: "Skatteinsidens",
      chapters: [11],
      body: "<p>Det er mange strømleverandører i Norge og konkurransen i markedet blant tilbydere og etterspørrere av strøm kan representeres ved en frikonkurransesituasjon. Under frikonkurranse er tilbudet gitt av summen av grensekostnadene til bedriftene. I strømmarkedet er grensekostnaden konstant og lik for alle. I Norge er klimaet kaldt og husholdningene kan ikke variere strømbruken. Strømprisen har steget og regjeringen har gitt en subsidie pr solgt kwh til produsentene slik at de kan selge kraften billigere. I det siste har strømprisen falt mye fordi høsten har vært regnfull og regjeringen bestemmer seg for å fjerne hele støtten som gis til produsentene. Hva skjer med likevektspris til konsumentene og omsatt mengde kwh når strømstøtten til produsentene fjernes?</p>",
      options: [
        "Prisen husholdningene betaler endres ikke, men kvantum faller",
        "Prisen til husholdningen går opp og kvantum går ned",
        "Prisen husholdningen betaler synker tilsvarende støtten og kvantum øker.",
        "Kvantum kwh omsatt er uforandret, men prisen husholdningen betaler synker",
        "Kvantum kwh omsatt er uforandret, og prisen husholdningen betaler stiger tilsvarende støttebeløpet som fjernes.",
        "Når strømstøtten reduseres faller omsatt kvantum kwh og konsumentprisen går opp mens produsentprisen går ned",
        "Produsent-og konsumentpris endres like mye slik at når støtten fjernes deler de kostnaden mens omsatt kvantum kwh er uforandret.",
      ],
      answer: 4,
      solution: "<p><b>Les de to elastisitetsopplysningene ut av teksten først.</b> Hele oppgaven er å oversette to setninger til to kurver:</p><p>1. «<i>Husholdningene kan ikke variere strømbruken</i>» &rArr; etterspørselen er <b>perfekt uelastisk</b>: etterspørselskurven er loddrett, D&prime;(P) = 0.<br>2. «<i>Grensekostnaden er konstant og lik for alle</i>», og under frikonkurranse er tilbudet summen av grensekostnadene &rArr; tilbudet er <b>perfekt elastisk</b>: tilbudskurven er vannrett ved grensekostnaden, S&prime;(p) = &infin;.</p><p><b>Hva som skjer.</b> Å fjerne en subsidie per kwh til produsentene er det samme som å innføre en stykkskatt t. Den vannrette tilbudskurven flyttes opp med hele beløpet, mens den loddrette etterspørselskurven ikke flytter seg. Skjæringspunktet flytter seg rett opp: <b>kvantum er uendret</b>, og <b>konsumentprisen stiger med hele støttebeløpet</b>. Alternativ (e).</p><p><b>Utledningen, som forelesningen bruker.</b> La P være prisen husholdningene betaler og p prisen produsentene får, med P = p + t. I likevekt er D(P) = S(P &minus; t). Deriver med hensyn på t:</p><p>D&prime;(P)·P&prime;(t) = S&prime;(p)·(P&prime;(t) &minus; 1)&nbsp;&rArr;&nbsp;P&prime;(t) = S&prime;(p) / (S&prime;(p) &minus; D&prime;(P))</p><p>Med D&prime;(P) = 0 blir P&prime;(t) = S&prime;/S&prime; = <b>1</b>: konsumentprisen endres krone for krone med skatten. Tilsvarende er p&prime;(t) = D&prime;/(S&prime; &minus; D&prime;) = <b>0</b>: produsentprisen er uendret. Samme svar får du av det perfekt elastiske tilbudet alene, siden S&prime; &rarr; &infin; gir P&prime;(t) &rarr; 1.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a) Pris uendret, kvantum faller</b> — dette er speilbildet: det er svaret når etterspørselen er perfekt <i>elastisk</i> og tilbudet uelastisk, altså når produsentene bærer alt.<br><b>(b) Pris opp, kvantum ned</b> — riktig retning på prisen, men kvantum kan ikke falle når etterspørselen er loddrett. Dette er standardsvaret for et vanlig marked med begge kurver skrå, og den mest fristende fellen for den som svarer på autopilot.<br><b>(c) Pris synker, kvantum øker</b> — feil retning på begge. Å <i>fjerne</i> en støtte gjør strømmen dyrere, ikke billigere.<br><b>(d) Kvantum uendret, pris synker</b> — riktig om kvantum, feil fortegn på prisen. Dette er svaret på det motsatte spørsmålet (hva skjer når støtten <i>innføres</i>), og er faktisk det spørsmålet nynorskversjonen av settet stiller.<br><b>(f) Kvantum faller, konsumentpris opp og produsentpris ned</b> — beskriver deling av byrden i et marked med to skrå kurver. Med vannrett tilbud kan produsentprisen ikke endre seg: den er låst til grensekostnaden.<br><b>(g) Produsent og konsument deler likt, kvantum uendret</b> — lik deling krever like elastisiteter i tallverdi. Her er de så ulike som de kan bli (0 mot uendelig), så delingen er 100/0.</p><p><b>Regelen, i én setning.</b> <b>Den minst elastiske siden av markedet bærer skatten.</b> Er den ene siden perfekt uelastisk, bærer den alt, og kvantum endres ikke. Det gjelder likt for skatt og subsidie, og likt enten avgiften formelt legges på kjøper eller selger — den formelle skattyteren er irrelevant for hvem som faktisk betaler.</p><p><b>Kontroll.</b> Sett tall på det: grensekostnad 50 øre/kwh, støtte 30 øre, forbruk 20 000 kwh uansett pris. Med støtte betaler husholdningen 20 øre, uten støtte 50 øre — en økning på nøyaktig 30 øre, altså hele støtten. Forbruket er 20 000 kwh i begge tilfeller, og produsenten får 50 øre begge ganger.</p>",
    },
    {
      n: 4,
      title: "Masse Gryn flytter til Kypros og bor i Dubai",
      points: 6,
      topic: "Internasjonal skatt og exit-skatt",
      chapters: [13, 6],
      body: "<p>Investoren Masse Gryn er født, oppvokst og inntil nylig bosatt i Ytre Sandviken. Over flere tiår har han bygget opp et milliardkonsern her til lands. Han er selv daglig leder og styreleder i konsernets øverste holdingselskap, Max Cash Box AS. Masse har fulgt nøye med i Dagens Næringsliv og har der sett at en rekke norske investorer nå «flagger ut». Lut lei kombinasjonen av vedvarende lavtrykk i Ytre-Sandviken og økende skattetrykk i Norge, besluttet Masse å flytte til Kypros i januar 2022 og meldte fra om det til Skatteetaten. Han solgte sin bolig like ved NHH i Ytre-Sandviken og kjøpte seg leilighet på Kypros samme måned. På visningen i Kypros traff Masse uventet en Dubai-basert kvinne med sans for gründere fra Ytre-Sandviken. De to ble hodestups forelsket og det ryktes nå om barn på vei. Masse har bodd med kvinnen i Dubai siden februar 2022 og har flyttet alle sine midler til bank i Dubai. De to planlegger å kjøpe stor leilighet sammen i Dubai til jul. På Kypros har Masse ikke vært siden leilighetskjøpet i januar, da han tilbringer all sin tid i Dubai. Fra utflyttingstidspunktet januar 2022 har han utført sine oppgaver som daglig leder og styreleder i konsernets holdingsselskap via telefon og internett fra nye og flotte kontorlokaler selskapet nå disponerer i Dubai. Alle styremøter holdes fysisk på femstjerners restaurant i Dubai, da selskapet gladelig bekoster reise for resten av styret fra Ytre-Sandviken til Dubai for hvert styremøte.</p><p>Masse har nylig blitt oppringt av sin nevø, Lite Gryn, som tar master på NHH. Lite har nylig hatt forelesninger i det populære faget personlig økonomi og spør Masse om ikke denne flyttingen hans kan få skattemessige implikasjoner. I panikkangst ringer Masse nå til deg, som er hans skatterådgiver, og ber deg svare på spørsmålene nedenfor.</p><p>Legg til grunn følgende:</p><ul><li>Masse er å anse som skattemessig bosatt i Norge, Kypros og De forente arabiske emirater (Dubai) etter disse landenes respektive interne skatterett</li><li>Selskapet Max Cash Box AS er å anse som hjemmehørende i Norge og De forente arabiske emirater (Dubai) i 2022 etter disse landenes respektive interne skatterett</li><li>Selskapet Max Cash Box AS ble stiftet i Norge</li><li>Det foreligger skatteavtale mellom Norge og Kypros. Legg til grunn at avtalen anvender vanlig kreditmetode.</li><li>Det foreligger ikke skatteavtale mellom Norge og De forente arabiske emirater</li><li>Masse tjener kr 2 500 000 i lønn for 2022 for sin stilling som daglig leder i Max Cash Box AS. Forutsett at skattesats for lønnsinntekt i 2022 er 45% i Norge, 25% i Kypros og 15% i Dubai.</li><li>Beregnet urealisert gevinst på Masse sine aksjer i Max Cash Box AS var kr 500 mill på utflyttingstidspunktet og det ble stilt betryggende sikkerhet for skatteforpliktelsen</li><li>Total differanse mellom virkelig verdi på eiendelene til Max Cash Box AS og skattemessige verdier (dvs urealisert skattemessig gevinst på eiendelene) på utflyttingstidspunktet var på kr 1 000 mill</li></ul>",
      parts: [
        {
          label: "a",
          points: 0.5,
          body: "<p>Spørsmål 1: Fra og med hvilket år vil Masse anses som skattemessig utflyttet fra Norge etter norsk intern skatterett?</p>",
          options: ["2022.", "2024.", "2025.", "2026."],
          answer: 3,
          solution: "<p><b>Regelen.</b> Skatteloven skiller mellom to grupper. Har du vært skattemessig bosatt i Norge i <b>mer enn ti år</b> før utflyttingen, opphører bostedet først etter <b>tre hele mellomliggende inntektsår</b> der du verken oppholder deg i Norge mer enn 61 dager i året eller disponerer bolig her. Har du vært bosatt i ti år eller mindre, gjelder det samme kravet allerede for det første året etter utflytting.</p><p><b>Tellingen.</b> Masse er «født, oppvokst og inntil nylig bosatt» i Norge — altså langt over ti år. Utflyttingsåret er 2022.</p><table class=\"data\"><tr><th>År</th><th>Rolle</th><th>Status</th></tr><tr><td>2022</td><td>Utflyttingsåret — telles ikke med</td><td>Bosatt</td></tr><tr><td>2023</td><td>Første mellomliggende år</td><td>Bosatt</td></tr><tr><td>2024</td><td>Andre mellomliggende år</td><td>Bosatt</td></tr><tr><td>2025</td><td>Tredje mellomliggende år</td><td>Bosatt</td></tr><tr><td><b>2026</b></td><td>Bostedet opphører</td><td><b>Utflyttet</b></td></tr></table><p>Svaret er <b>2026</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>2022</b> er svaret til den som tror at melding til Skatteetaten er nok. Å melde flytting er en opplysningsplikt, ikke en skattemessig handling — norsk bosted opphører etter loven, ikke etter meldingen.<br><b>2024</b> teller utflyttingsåret som ett av de tre mellomliggende årene. Utflyttingsåret teller ikke; tellingen starter året etter.<br><b>2025</b> teller bare to mellomliggende år, eller bruker regelen for dem som har vært bosatt i ti år eller mindre.</p><p><b>Poenget bak regelen.</b> Kravet gjør at man ikke kan «flytte ut» skattemessig ved et pennestrøk i desember. Det er også grunnen til at Masse i 2022 fortsatt er norsk skattyter med global skatteplikt — noe spørsmål 5 og 6 bygger videre på.</p>",
        },
        {
          label: "b",
          points: 0.5,
          body: "<p>Spørsmål 2: Medfører det at Masse personlig flytter ut av Norge i 2022 utflyttingsskatt på hans urealiserte aksjegevinst?</p>",
          options: [
            "Ja, men den beregnede skatten bortfaller dersom han ikke selger aksjene innen fem år etter utflytting.",
            "Ja, det blir betalbar skatt i 2022.",
            "Ja, men det blir ikke betalbar skatt før i 2026.",
            "Nei.",
          ],
          answer: 0,
          solution: "<p><b>Slik reglene var i 2022.</b> Utflyttingsskatten i skatteloven § 10-70 gjør utflyttingen til en <i>fiktiv realisasjon</i>: den urealiserte gevinsten på aksjene — her kr 500 mill — beregnes og skattlegges som om aksjene var solgt dagen før utflyttingen. Men skatten var ikke betalbar med det samme. Ved betryggende sikkerhet (som oppgaven forutsetter er stilt) fikk skattyteren <b>utsettelse</b>, og etter den daværende <b>femårsregelen</b> <b>bortfalt</b> hele den beregnede skatten dersom aksjene ikke ble realisert innen fem år etter utflyttingen. Riktig svar er derfor (a): ja, skatt beregnes, men den faller bort hvis han sitter stille i fem år.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>«Ja, det blir betalbar skatt i 2022»</b> — nei. Poenget med sikkerhetsstillelsen er nettopp at betalingen utsettes. Alternativet fanger den som tror at fiktiv realisasjon betyr fiktivt forfall.<br><b>«Ja, men ikke betalbar før i 2026»</b> — blander sammen tidsfristen i spørsmål 1 (når bostedet opphører) med femårsregelen. De to fristene er ulike regler med ulike formål og skal ikke smeltes sammen. 2026 er dessuten fire år etter utflyttingen, ikke fem.<br><b>«Nei»</b> — utflytting av en person med urealisert aksjegevinst utløser alltid beregning av utflyttingsskatt over terskelbeløpet. At skatten kan bortfalle senere, er ikke det samme som at den ikke utløses.</p><p><b>Regelen slik den var, i én setning.</b> Utflyttingsskatt beregnes på urealisert aksjegevinst dagen før utflytting; med sikkerhet utsettes betalingen, og etter fem år uten realisasjon bortfaller kravet.</p><p><b>Viktig: dette er ikke gjeldende rett i 2026.</b> Femårsregelen ble opphevet i 2024. Etter dagens regler faller den beregnede utflyttingsskatten <b>ikke</b> bort ved å vente; skattyteren velger mellom å betale straks, å betale i rater over tolv år, eller å betale ved faktisk realisasjon. Lær rutinen fra denne oppgaven, men ikke femårskonklusjonen — i et 2026-sett ville alternativ (a) vært det gale svaret.</p>",
        },
        {
          label: "c",
          points: 0.5,
          body: "<p>Spørsmål 3: Dersom man forutsetter at skatteavtalen med Kypros er anvendelig, vil den beskytte Masse mot at norske skattemyndigheter pålegger utflyttingsskatt på hans urealiserte aksjegevinst ved utflytting?</p>",
          options: [
            "Ja, fordi det er hjemstaten som etter OECDs mønsteravtale som har eksklusiv rett til å skattlegge aksjegevinster.",
            "Ja, men kun for aksjegevinster over kr 10 000 000.",
            "Ja, men kun for aksjegevinster over kr 50 000 000.",
            "Nei, skatteavtalen med Kypros er ikke relevant for den norske utflyttingsskatten, selv om skatteavtalen som sådan er anvendelig, fordi utflyttingsskatten etter norsk lov inntrer dagen før utflyttingstidspunktet (dvs før skatteavtalen får effekt).",
          ],
          answer: 3,
          solution: "<p><b>Kjernen: tidspunktet.</b> Utflyttingsskatten utløses <b>dagen før</b> utflyttingen. På det tidspunktet er Masse fortsatt utelukkende norsk skattyter, og skatteavtalen med Kypros gir ham ingen beskyttelse ennå — den får virkning fra det øyeblikket han er avtalemessig bosatt på Kypros. Skattekravet er altså allerede oppstått når avtalebeskyttelsen begynner. Riktig svar er (d).</p><p>Dette er konstruksjonens hele hensikt: den er utformet slik at avtalen ikke kan brukes til å gjøre den latente gevinsten skattefri. Uten dette grepet ville enhver aksjonær kunne flytte til et land uten gevinstbeskatning, selge dagen etter, og gevinsten som ble opparbeidet i Norge ville aldri bli beskattet noe sted.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a)</b> gjengir hovedregelen i OECDs mønsteravtale art. 13 (7) riktig — hjemstaten har som utgangspunkt eksklusiv beskatningsrett til aksjegevinster — men bruker den på feil tidspunkt. Regelen forutsetter at avtalen gjelder når gevinsten realiseres; her er skatten utløst før avtalen i det hele tatt trådte i kraft for Masse. Dette er det farligste alternativet, fordi premissen er korrekt.<br><b>(b) og (c)</b> oppfinner beløpsgrenser i skatteavtalen. Skatteavtaler fordeler beskatningsrett; de inneholder ikke terskelbeløp av denne typen. Norsk intern rett har riktignok en bagatellgrense for når utflyttingsskatt beregnes, men det er noe helt annet enn en avtalebestemmelse — og den er langt lavere enn 10 mill.</p><p><b>Regelen.</b> En skatteavtale kan bare begrense beskatningsrett den har fått virkning for. Utflyttingsskatt utløses dagen før utflytting, altså før avtalen får effekt, og avtalen beskytter derfor ikke mot den.</p>",
        },
        {
          label: "d",
          points: 0.5,
          body: "<p>Spørsmål 4: Bør Masse kunne anses bosatt på Kypros iht. skattavtalen mellom Norge-Kypros? Forutsett at bostedsklausulen i avtalen tilsvarer bostedsklausulen i OECD sin modellavtale.</p>",
          options: [
            "Ja, han disponerer jo bolig på Kypros.",
            "Ja, han har meldt flytting til Kypros til den norske Skatteetaten.",
            "Nei, han oppholder seg ikke tilstrekkelig mange dager på Kypros.",
            "Nei, sentrum for Masses personlige og økonomiske livsinteresser synes ikke å være lokalisert på Kypros.",
          ],
          answer: 3,
          solution: "<p><b>Problemet.</b> Masse er bosatt i Norge, på Kypros <i>og</i> i Dubai etter de tre landenes interne rett. Det er nettopp den situasjonen skatteavtalens bostedsklausul (OECD art. 4) skal løse: den peker ut <b>ett</b> hjemland ved hjelp av en rangordnet rekke kriterier — den såkalte tie-breaker-stigen.</p><p><b>Stigen, i rekkefølge.</b><br>1. <b>Fast bolig</b> — hvor har han fast bolig til disposisjon? Han har leilighet på Kypros og bor i Dubai; boligen i Norge er solgt. Kriteriet skiller ikke alene.<br>2. <b>Sentrum for livsinteresser</b> — hvor er hans personlige og økonomiske tilknytning sterkest?<br>3. Vanlig opphold.<br>4. Statsborgerskap.<br>5. Gjensidig avtale mellom statene.</p><p><b>Faktum.</b> Masse har ikke vært på Kypros siden januar. Han bor med samboeren i Dubai, venter barn der, har flyttet alle midler til bank i Dubai, arbeider fra kontorer i Dubai og planlegger felles bolig i Dubai. Både den personlige og den økonomiske tyngden peker på Dubai. <b>Sentrum for livsinteresser er ikke på Kypros</b>, og han bør derfor ikke anses bosatt der etter avtalen. Riktig svar er (d).</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a) «Han disponerer jo bolig på Kypros»</b> — bolig er første trinn på stigen, men det avgjør bare når det peker på ett land alene. Her disponerer han bolig i to land, så man går videre til trinn 2. Å stoppe på trinn 1 er den typiske feilen.<br><b>(b) «Han har meldt flytting»</b> — meldingen er ren opplysningsplikt overfor Skatteetaten og har ingen betydning for avtalens bostedskriterier. Norske myndigheter kan uansett ikke bestemme hvor Kypros anser ham bosatt.<br><b>(c) «Han oppholder seg ikke tilstrekkelig mange dager på Kypros»</b> — konklusjonen er riktig, men begrunnelsen er feil trinn på stigen. Dagtelling («vanlig opphold») kommer først på trinn 3, og bare hvis livsinteressekriteriet ikke lot seg avgjøre. Her <i>lot</i> det seg avgjøre. Eksamen belønner at du bruker riktig kriterium, ikke bare at du lander på riktig ja/nei. Dette er det alternativet flest velger feil.</p><p><b>Regelen.</b> Ved dobbelt bosted brukes OECD art. 4-stigen i rekkefølge: fast bolig &rarr; sentrum for livsinteresser &rarr; vanlig opphold &rarr; statsborgerskap &rarr; gjensidig avtale. Man går videre til neste trinn bare når det forrige ikke gir et entydig svar.</p>",
        },
        {
          label: "e",
          points: 1,
          body: "<p>Spørsmål 5: Dersom man legger til grunn at Kypros-avtalen ikke er anvendelig, hva blir da resultatet ift lønnsbeskatning av Masse for 2022?</p>",
          options: [
            "Kun Norge kan beskatte lønnsinntekten.",
            "Både Norge og Kypros kan skattlegge lønnsinntekten iht til sin interne skatterett, uten noen skatteavtalerettslige begrensninger.",
            "Både Norge, Kypros, og de Forente Arabiske Emirater kan skattlegge lønnsinntekten iht til sin interne skatterett, uten noen skatteavtalerettslige begrensninger.",
            "Ingen av landene kan beskatte lønnsinntekten.",
          ],
          answer: 2,
          solution: "<p><b>Resonnementet i tre ledd.</b></p><p>1. <b>Intern rett gir alle tre landene beskatningsrett.</b> Oppgaven forutsetter at Masse anses skattemessig bosatt i Norge, på Kypros og i De forente arabiske emirater etter hvert lands interne regler. Bosted etter intern rett gir globalskatteplikt — hvert av landene kan derfor skattlegge hele lønnen på kr 2,5 mill.<br>2. <b>Hva kan begrense dette?</b> Bare en skatteavtale. En skatteavtale er en folkerettslig begrensning i staters interne beskatningsrett; uten avtale finnes ingen slik begrensning.<br>3. <b>Her er det ingen avtale i spill.</b> Spørsmålet forutsetter at Kypros-avtalen ikke er anvendelig, og oppgaven opplyser at det ikke finnes skatteavtale mellom Norge og Emiratene. Resultatet er <b>trippelbeskatning</b> — alternativ (c).</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a) «Kun Norge»</b> — Norge kan skattlegge, men det er ikke noe som stenger de to andre. En stat kan ikke ensidig frata en annen stat dens interne beskatningsrett.<br><b>(b) «Norge og Kypros»</b> — glemmer Dubai, som oppgaven uttrykkelig sier anser ham bosatt. Alternativet fanger den som leser «ingen avtale med Emiratene» som «Emiratene skattlegger ikke». Det motsatte er tilfellet: <i>fravær</i> av avtale betyr at Emiratene står helt fritt.<br><b>(d) «Ingen av landene»</b> — dobbelt ikke-beskatning oppstår når en unntaksmetode i en avtale fritar inntekten i hjemstaten og kildestaten heller ikke skattlegger. Her er det ingen avtale i det hele tatt, altså ingen unntaksmetode.</p><p><b>Regelen, i én setning.</b> Intern rett skaper beskatningsrett; skatteavtaler begrenser den. Uten avtale er det ingenting som hindrer at samme inntekt skattlegges fullt ut i flere land samtidig.</p><p><b>Skill de tre metodene.</b> <b>Unntaksmetoden:</b> hjemstaten fritar inntekten (helt eller med progresjonsforbehold). <b>Kreditmetoden:</b> hjemstaten skattlegger, men gir fradrag for skatt betalt i kildestaten, begrenset oppad til hjemstatens egen skatt på inntekten. <b>Ingen avtale:</b> ingen lettelse — full dobbelt- eller trippelbeskatning. Kyprosavtalen bruker vanlig kreditmetode, men den er slått av i dette spørsmålet.</p>",
        },
        {
          label: "f",
          points: 1,
          body: "<p>Spørsmål 6: Dersom man legger til grunn at Kypros-avtalen ikke er anvendelig, hva må Masses totalt betale i lønnsskatt for 2022 til de involverte land?</p>",
          options: [
            "Han må betale kr 1 125 000 til Norge, kr 625 000 til Kypros og 375 000 til Emiratene og ingen av landene vil være forpliktet til å gi kredit eller unntak for å forhindre dobbeltbeskatning.",
            "Han betaler kun skatt til Norge inntil hans status som bosatt i Norge etter intern rett opphører, dvs kun kr 1 125 000 til Norge.",
            "Kun det landet der han har oppholdt seg mest i 2022 kan beskatte inntekten, dvs. kr 375 000 skal betales til Emiratene og ikke noe til de to andre landene.",
            "Han skal kun betale lønnsskatt til det landet han har meldt flytting til Skattetaten om, dvs. kr 625 000 til Kypros.",
          ],
          answer: 0,
          solution: "<p>Dette er tallpåhenget til spørsmål 5: konklusjonen er den samme, og her skal den bare regnes ut.</p><p><b>Regnestykket.</b> Lønnen er kr 2 500 000, og hvert land skattlegger hele beløpet etter sin egen sats:</p><table class=\"data\"><tr><th>Land</th><th>Sats</th><th>Skatt</th></tr><tr><td>Norge</td><td class=\"n\">45 %</td><td class=\"n\">1 125 000</td></tr><tr><td>Kypros</td><td class=\"n\">25 %</td><td class=\"n\">625 000</td></tr><tr><td>Emiratene</td><td class=\"n\">15 %</td><td class=\"n\">375 000</td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>85 %</b></td><td class=\"n\"><b>2 125 000</b></td></tr></table><p>Samlet skatt blir kr 2 125 000 av en lønn på kr 2 500 000 — en effektiv sats på <b>85 %</b>. Masse sitter igjen med kr 375 000. Riktig svar er (a).</p><p><b>Hvorfor de andre er gale.</b> Alle tre gale alternativene regner riktig på ett land og lar de to andre falle bort. Feilen ligger ikke i aritmetikken, men i premisset:</p><p><b>(b)</b> lar bare Norge skattlegge. Norsk bosted opphører først i 2026 (spørsmål 1), men det stopper ikke Kypros og Emiratene fra å skattlegge etter <i>sin</i> interne rett i 2022.<br><b>(c)</b> lar oppholdslengden avgjøre. «Der du har vært mest» er et kriterium som bare finnes i skatteavtalenes tie-breaker-stige — og det er nettopp forutsetningen i dette spørsmålet at ingen avtale gjelder.<br><b>(d)</b> lar flyttemeldingen avgjøre. Melding til Skatteetaten fordeler ikke beskatningsrett mellom stater.</p><p><b>Regelen.</b> Uten skatteavtale skattlegger hver bostedsstat hele den globale inntekten etter egen sats, og satsene summeres. Det er nettopp dette skatteavtalene finnes for å hindre.</p><p><b>Kontroll — hva avtalene ville gjort.</b> Med Kyprosavtalen anvendelig og Norge som hjemstat etter <b>kreditmetoden</b> ville Norge gitt fradrag for skatt betalt på Kypros, begrenset til norsk skatt på inntekten: 1 125 000 &minus; 625 000 = 500 000 til Norge, altså 1 125 000 samlet til de to landene i stedet for 1 750 000. Med <b>unntaksmetoden</b> ville Norge fritatt inntekten helt, og bare de 625 000 til Kypros stått igjen. Forskjellen mellom 2 125 000 og 1 125 000 er hele verdien av én skatteavtale.</p>",
        },
        {
          label: "g",
          points: 1,
          body: "<p>Spørsmål 7: Hvis Kyprosavtalen ikke er anvendelig vil Masses utflytting i 2022 trigge utflyttingsskatt for selskapet Max Cash Box AS?</p>",
          options: [
            "Ja, fordi reell ledelse av selskapet skjer i Dubai etter utflyttingstidspunktet.",
            "Ja, fordi daglig leder har meldt flytting til Skatteetaten.",
            "Nei, selv om reell ledelse av selskapet skjer utenfor Norge (i Dubai), vil selskapets status som hjemmehørende i Norge ikke opphøre fordi selskapet var stiftet her og det ikke foreligger skatteavtale mellom Norge og Dubai.",
            "Nei, utflyttingsskatt er kun aktuelt for fysiske personer.",
          ],
          answer: 2,
          solution: "<p>Settets vanskeligste faktaspørsmål. Sensorveiledningen sier selv at det «gir anledning for de beste til å utmerke seg».</p><p><b>Utflyttingsskatt for et selskap forutsetter at selskapet slutter å være hjemmehørende i Norge.</b> Spørsmålet er derfor ikke om ledelsen har flyttet, men om <i>skatteplikten til Norge opphører</i>.</p><p><b>Hjemmehørende-regelen har to alternative innganger:</b><br>1. Selskapet er <b>stiftet i Norge</b> etter norsk selskapsrett, eller<br>2. selskapet har <b>reell ledelse</b> i Norge.</p><p>Er ett av dem oppfylt, er selskapet hjemmehørende her. Max Cash Box AS er stiftet i Norge, og den betingelsen slutter aldri å være oppfylt uansett hvor styremøtene holdes.</p><p><b>Den ene veien ut</b> går gjennom en skatteavtale: et selskap som er stiftet i Norge, anses likevel ikke hjemmehørende her dersom det etter en <b>skatteavtale</b> er hjemmehørende i en annen stat. Her er det ingen skatteavtale mellom Norge og Emiratene. Døren er altså stengt, selskapet forblir hjemmehørende i Norge, og utflyttingsskatt utløses ikke. Riktig svar er (c).</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a) «Ja, fordi reell ledelse skjer i Dubai»</b> — det farligste alternativet, fordi premisset er riktig: styremøtene, kontorene og den daglige ledelsen er i Dubai, og selskapet er også hjemmehørende der etter emiratisk rett. Men reell ledelse i utlandet er ikke <i>nok</i> når selskapet er stiftet i Norge. Stiftelseskriteriet står alene.<br><b>(b) «Ja, fordi daglig leder har meldt flytting»</b> — en persons flyttemelding sier ingenting om selskapets skattemessige bosted. Selskapet og aksjonæren er to skattesubjekter.<br><b>(d) «Nei, utflyttingsskatt er kun for fysiske personer»</b> — riktig konklusjon, feil begrunnelse, og derfor galt. Skatteloven § 10-71 pålegger nettopp utflyttingsskatt for <i>selskaper</i>; det er hele poenget i spørsmål 8. Alternativet fanger den som gjetter «nei» og griper den første begrunnelsen som ser plausibel ut.</p><p><b>Regelen.</b> Et selskap stiftet i Norge er hjemmehørende her uansett hvor ledelsen sitter, med mindre en skatteavtale gjør det hjemmehørende i en annen stat. Uten avtale kan et norskstiftet selskap ikke «flytte ut» skattemessig.</p><p><b>Det paradoksale.</b> Fraværet av skatteavtale, som i spørsmål 5 og 6 var dyrt for Masse personlig (trippelbeskatning), <i>redder</i> selskapet fra en utflyttingsskatt på urealiserte merverdier på kr 1 000 mill. Ville det vært en avtale med Emiratene, kunne selskapet blitt avtalemessig hjemmehørende der, og hele § 10-71-oppgjøret i spørsmål 8 ville blitt utløst.</p>",
        },
        {
          label: "h",
          points: 1,
          body: "<p>Spørsmål 8: Dersom man forutsetter at det blir utflyttingsskatt for selskapet Max Cash Box AS, hva vil det medføre av skattekonsekvenser?</p>",
          options: [
            "Det betyr at selskapet må betale skatt på urealiserte skattemessige merverdier på sine eiendeler på utflyttingstidspunktet, dvs skatt på inntekt på 1 000 mill på selskapsnivå.",
            "Det betyr at aksjonær i selskapet må betale skatt på urealiserte aksjegevinster på utflyttingstidspunktet, dvs skatt på 500 mill på aksjonærnivå.",
            "Det betyr at skatt som beskrevet i både a) og b) inntrer, dvs skatt på både aksjonær- og selskapsnivå.",
            "At kreditmetoden må anvendes.",
          ],
          answer: 2,
          solution: "<p><b>Regelen.</b> Skatteloven § 10-71 behandler utflytting av et selskap som en <b>total realisasjon</b>. Når selskapet slutter å være hjemmehørende i Norge, mister Norge beskatningsretten til alt selskapet eier og til aksjene i det, og alle skatteposisjoner må derfor gjøres opp samtidig — på <b>begge nivåer</b>:</p><p>1. <b>Selskapsnivå:</b> selskapet skattlegges som om alle eiendeler var realisert til virkelig verdi. Her er differansen mellom virkelig verdi og skattemessige verdier oppgitt til <b>kr 1 000 mill</b>, som blir skattepliktig inntekt for selskapet.<br>2. <b>Aksjonærnivå:</b> aksjonærene skattlegges som om aksjene var realisert. Her er den urealiserte aksjegevinsten <b>kr 500 mill</b>.</p><p>Begge inntrer, altså alternativ <b>(c)</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a)</b> tar bare selskapsnivået og glemmer aksjonærene. <b>(b)</b> tar bare aksjonærnivået og glemmer selskapet. Begge er halve svar, og begge er formulert slik at de ser fullstendige ut fordi de siterer et tall fra oppgaven. Når to alternativer hver dekker halve regelen og et tredje sier «begge», er «begge» nesten alltid svaret — det er et gjenkjennelig mønster i dette faget.<br><b>(d) «Kreditmetoden»</b> hører hjemme i lønnsspørsmålene 5 og 6. Kreditmetoden er en teknikk for å lempe dobbeltbeskatning av inntekt beskattet i to land, ikke en konsekvens av utflytting.</p><p><b>Én viktig forskjell fra spørsmål 2.</b> Når <b>aksjonæren</b> flytter ut personlig, gjaldt i 2022 femårsregelen, slik at skatten kunne bortfalle. Når <b>selskapet</b> flytter ut, finnes ingen slik regel: oppgjøret er endelig. Det er en betydelig strengere behandling, og begrunnelsen er at Norge mister beskatningsretten til hele selskapets verdiskaping, ikke bare til én aksjonærs gevinst.</p><p><b>Kontroll på størrelsesordenen.</b> Med 22 % selskapsskatt ville selskapsnivået alene gitt 1 000 mill × 0,22 = <b>220 mill</b> i skatt, og aksjonærnivået med 2022-satsene 500 mill × 1,6 × 0,25 = <b>200 mill</b>. Til sammen rundt 420 mill — som forklarer hvorfor spørsmål 7 er verdt å svare riktig på.</p>",
        },
      ],
    },
    {
      n: 5,
      title: "Martin velger mellom bank og aksjer",
      points: 5,
      topic: "Forventet nytte og tapsaversjon",
      chapters: [17, 18],
      body: "<p>Martin sparer langsiktig. Han vil investere 500 000 og har en investeringshorisont på 20 år. Martin vurderer to alternativ; banksparing eller aksjer. Vi skal vurdere sparealternativene opp mot hverandre. Vi ser bort fra skatt i oppgaven.</p><p>Det første sparealternativet er bankinnskudd. Etter 20 år forventer Martin å sitte igjen med 903 056.</p>",
      parts: [
        {
          label: "a",
          points: 0.5,
          body: "<p>Spørsmål 1: Hvilken årlig avkastning får Martin på bankinnskuddet?</p>",
          options: ["1,0 %", "2,0 %", "3,0 %", "4,0 %"],
          answer: 2,
          solution: "<p><b>Regnestykket.</b> Dette er en ren CAGR: hvilken konstant årlig rente tar 500 000 til 903 056 på 20 år?</p><p>500 000 × (1 + r)<sup>20</sup> = 903 056&nbsp;&rArr;&nbsp;r = (903 056 / 500 000)<sup>1/20</sup> &minus; 1 = 1,806112<sup>0,05</sup> &minus; 1 = 0,03000 = <b>3,0 %</b></p><p><b>Uten kalkulator med potensfunksjon</b> kan du prøve deg fram på alternativene — det er ofte raskere enn å regne bakover, og det er metoden sensorveiledningene selv legger opp til:</p><table class=\"data\"><tr><th>Rente</th><th>500 000 × (1 + r)<sup>20</sup></th></tr><tr><td class=\"n\">1,0 %</td><td class=\"n\">610 095</td></tr><tr><td class=\"n\">2,0 %</td><td class=\"n\">742 974</td></tr><tr><td class=\"n\">3,0 %</td><td class=\"n\"><b>903 056</b></td></tr><tr><td class=\"n\">4,0 %</td><td class=\"n\">1 095 562</td></tr></table><p><b>Hvorfor de andre er gale.</b> Alle tre gir feil sluttverdi, og tabellen over viser med hvor mye. Den vanligste feilen på denne typen er å regne <i>enkel</i> rente i stedet for rentesrente: 403 056/500 000/20 år = 4,03 % per år, som peker mot 4,0 % — det gale alternativet ligger akkurat der. Rentesrenten gjør at den riktige satsen alltid er <b>lavere</b> enn den enkle årlige veksten.</p><p><b>Regelen.</b> CAGR = (sluttverdi / startverdi)<sup>1/T</sup> &minus; 1. Aldri (sluttverdi &minus; startverdi)/startverdi/T.</p><p><b>Kontroll.</b> Tommelfingerregelen med 72: ved 3 % dobler kapitalen seg på 72/3 = 24 år. Her går det 20 år og kapitalen blir 1,81 ganger — litt mindre enn en dobling. Konsistent.</p>",
        },
        {
          label: "b",
          points: 0.5,
          body: "<p>Det andre sparealternativet er aksjer. Dette er et usikkert alternativ, dvs. Martin vet ikke med sikkerhet hva han får igjen om 20 år. Vi beskriver usikkerheten med at to scenarioer kan inntreffe. Enten blir perioden preget av gode tider i økonomien, og det forventes høy avkastning på investeringene, eller så blir det dårlige tider, og det forventes lav avkastning. Hvis det blir gode tider, vil han få 2 330 479 om tjue år, mens ved dårlige tider, vil han få 333 804. Sannsynligheten for scenarioet med gode tider er 40 %, mens sannsynligheten for dårlige tider er 60 %.</p><p>Spørsmål 2: Hvis Martin velger alternativet med aksjer, hva er forventet sluttverdi på investeringen?</p>",
          options: ["1 032 474", "1 132 474", "1 232 474", "1 332 474"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b> Forventet sluttverdi er det sannsynlighetsveide gjennomsnittet av de to utfallene:</p><p>E[W] = 0,40 × 2 330 479 + 0,60 × 333 804 = 932 191,6 + 200 282,4 = <b>1 132 474</b></p><p><b>Hvorfor de andre er gale.</b> De fire alternativene ligger nøyaktig 100 000 fra hverandre, så det finnes ingen snarvei via øyemål — du må regne. To av dem er verdt å kjenne igjen:</p><p><b>1 332 474</b> ligger tett på 0,5 × 2 330 479 + 0,5 × 333 804 = 1 332 142, altså <b>vektene byttet til 50/50</b>. Det er nøyaktig den feilen spørsmål 4 handler om, plassert her som en felle to spørsmål på forskudd.<br><b>1 032 474</b> og <b>1 232 474</b> er ren avstand fra riktig svar; de tilsvarer vekter på omtrent 45/55 og 35/65.</p><p>Merk også at vektene byttet om helt (60 % gode tider) gir 1 531 809, som ikke er blant alternativene — bare den ene retningen av feilen er fanget opp.</p><p><b>Regelen.</b> Forventet verdi = &Sigma; p<sub>i</sub>W<sub>i</sub>. Sannsynlighetene må summere til 1, og du ganger med utfallet, ikke med avkastningen.</p><p><b>Kontroll — hva scenarioene betyr som årlig avkastning.</b> Regn de to utfallene om til CAGR over 20 år:</p><table class=\"data\"><tr><th>Scenario</th><th>Sluttverdi</th><th>Årlig avkastning</th><th>Sannsynlighet</th></tr><tr><td>Gode tider</td><td class=\"n\">2 330 479</td><td class=\"n\">+8,0 %</td><td class=\"n\">40 %</td></tr><tr><td>Dårlige tider</td><td class=\"n\">333 804</td><td class=\"n\">&minus;2,0 %</td><td class=\"n\">60 %</td></tr><tr><td>Bank</td><td class=\"n\">903 056</td><td class=\"n\">+3,0 %</td><td class=\"n\">sikkert</td></tr></table><p>Tallene i oppgaven er altså ikke tilfeldige: aksjer gir 8 % eller &minus;2 % mot bankens sikre 3 %. Forventet sluttverdi 1 132 474 svarer til 4,17 % årlig — en risikopremie på 1,17 prosentpoeng over banken. Det er denne premien resten av oppgaven spør om er stor nok.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Spørsmål 3: Som nevnt må Martin velge mellom å plassere alt i bankinnskudd eller alt i aksjer. Hvilket alternativ velger han? Vi antar at Martin har en nyttefunksjon lik: ln(W), hvor W er sluttverdi.</p>",
          options: [
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,496 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,496 &lt; nytte aksjer 13,714 =&gt; Velger aksjer",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,690 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,690 &lt; nytte aksjer 13,714 =&gt; Velger aksjer",
          ],
          answer: 0,
          solution: "<p><b>Regnestykket.</b> Bankinnskuddet er sikkert, så nytten er bare ln av sluttverdien. Aksjene er usikre, så nytten er <b>forventet nytte</b>: ln beregnes for hvert utfall <i>først</i>, og deretter veies de sammen.</p><p>1. <b>Bank:</b> U = ln(903 056) = <b>13,7135</b><br>2. <b>Aksjer:</b> ln(2 330 479) = 14,6616 og ln(333 804) = 12,7183<br>3. E[U] = 0,40 × 14,6616 + 0,60 × 12,7183 = 5,8646 + 7,6310 = <b>13,4956</b><br>4. 13,714 &gt; 13,496, altså <b>bankinnskudd</b>. Alternativ (a).</p><p><b>Den avgjørende rekkefølgen.</b> Du må ta ln <i>før</i> du tar forventningen, aldri motsatt. Tar du ln av forventet sluttverdi, får du ln(1 132 474) = 13,940, som ville pekt på aksjer. Forskjellen mellom 13,940 og 13,496 er nøyaktig risikoen — Jensens ulikhet i praksis: for en konkav nyttefunksjon er E[ln W] &lt; ln E[W].</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(b)</b> har de to riktige tallene, men byttet om: den påstår at bankens nytte er 13,496. Les hvilket tall som står ved hvilket alternativ før du krysser av — halvparten av de gale alternativene i denne oppgaven er riktige tall på feil plass.<br><b>(c)</b> bruker 13,690 for aksjer. Det er nytten med <b>50/50-sannsynligheter</b>, altså svaret på spørsmål 5, ikke på dette spørsmålet. Konklusjonen (bank) er riktig, men tallet hører til et annet spørsmål — og på et sett med minuspoeng koster det like mye som et helt galt svar.<br><b>(d)</b> kombinerer feil tall og feil konklusjon.</p><p><b>Regelen.</b> En risikoavers investor rangerer alternativer etter <b>forventet nytte</b> E[U(W)] = &Sigma; p<sub>i</sub>U(W<sub>i</sub>), ikke etter forventet formue. Med U = ln W er investoren risikoavers, og et sikkert alternativ kan slå et usikkert med høyere forventet verdi.</p><p><b>Kontroll — regn om til sikkerhetsekvivalent.</b> Det er langt lettere å tolke enn nyttetall. Sikkerhetsekvivalenten er e<sup>E[U]</sup>:</p><p>CE<sub>aksjer</sub> = e<sup>13,4956</sup> = <b>726 228</b> kroner</p><p>Martin er altså likegyldig mellom aksjeporteføljen og 726 228 kroner sikkert. Banken gir 903 056 sikkert, som er 176 828 kroner mer. Valget er ikke i nærheten av å være tett, selv om nyttetallene 13,714 og 13,496 ser like ut. Med log-nytte er sikkerhetsekvivalenten dessuten det <b>geometriske</b> gjennomsnittet: 2 330 479<sup>0,4</sup> × 333 804<sup>0,6</sup> = 726 228. &#10003;</p>",
        },
        {
          label: "d",
          points: 1,
          body: "<p>Et avvik eller en bias fra forventet nytte er at vi estimerer feile sannsynligheter for de ulike scenarioene. Vi sier at vi bruker subjektive istedenfor objektive sannsynligheter.</p><p>Spørsmål 4: La oss anta at Martin vurderer sannsynligheten for høy avkastning til å være 50 %, og sannsynligheten for lav avkastning til å være 50 %. Hva blir sluttverdi for de ulike alternativene?</p>",
          options: [
            "Sluttverdi for aksjer i gode tider er 2 030 479 og sluttverdi i dårlige tider 333 804. Sluttverdi bankinnskudd er 883 056.",
            "Sluttverdi for aksjer i gode tider er 2 330 479 og sluttverdi i dårlige tider 633 804. Sluttverdi bankinnskudd er 903 056.",
            "Sluttverdi for aksjer i gode tider er 2 030 479 og sluttverdi i dårlige tider 633 804. Sluttverdi bankinnskudd er 903 056.",
            "Sluttverdi for aksjer i gode tider er 2 330 479 og sluttverdi i dårlige tider 333 804. Sluttverdi bankinnskudd er 903 056.",
          ],
          answer: 3,
          solution: "<p><b>Poenget.</b> Spørsmålet ser ut som et regnespørsmål, men er et forståelsesspørsmål. <b>Sannsynligheter og utfall er to helt forskjellige ting.</b> Å endre troen på hvor sannsynlig et scenario er, endrer ikke hva verden gir deg <i>i</i> det scenariet. Sluttverdiene er derfor uendret:</p><table class=\"data\"><tr><th>Alternativ</th><th>Utfall</th><th>Sluttverdi</th><th>Ny sannsynlighet</th></tr><tr><td>Aksjer</td><td>Gode tider</td><td class=\"n\">2 330 479</td><td class=\"n\">50 %</td></tr><tr><td>Aksjer</td><td>Dårlige tider</td><td class=\"n\">333 804</td><td class=\"n\">50 %</td></tr><tr><td>Bank</td><td>Sikkert</td><td class=\"n\">903 056</td><td class=\"n\">100 %</td></tr></table><p>Riktig svar er (d) — de opprinnelige tallene, uendret.</p><p><b>Hvorfor de andre er gale.</b> Hvert galt alternativ endrer på ett eller flere av de tre tallene:</p><p><b>(a)</b> senker gode tider til 2 030 479 <i>og</i> banken til 883 056.<br><b>(b)</b> hever dårlige tider til 633 804.<br><b>(c)</b> endrer begge aksjeutfallene.</p><p>Ingen av endringene har noe grunnlag i oppgaveteksten. Bankinnskuddet er dessuten <b>sikkert</b> — det har ikke sannsynligheter i det hele tatt, og kan ikke endres av at Martin skifter mening om konjunkturene. Alternativ (a) endrer nettopp banktallet, og er derfor lettest å eliminere.</p><p><b>Regelen.</b> Subjektive sannsynligheter erstatter de objektive i <i>vektene</i> i forventningen, ikke i <i>utfallene</i>. E[U] = &Sigma; p<sub>i</sub><sup>subj</sup>U(W<sub>i</sub>) — bare p-ene endres.</p><p><b>Hvorfor spørsmålet er stilt.</b> Det rydder grunnen for spørsmål 5: siden utfallene er uendret, er det bare vektene som skifter, og da kan du gjenbruke ln-verdiene 14,6616 og 12,7183 rett fra spørsmål 3. Det sparer to logaritmer.</p>",
        },
        {
          label: "e",
          points: 1,
          body: "<p>Spørsmål 5: Påvirker endringene av sannsynligheter valget mellom bankinnskudd og aksjefond? Vurder nytte for ulike alternativ.</p>",
          options: [
            "Nytte bankinnskudd 13,496 &lt; nytte aksjer 13,690 =&gt; Velger aksjer",
            "Nytte bankinnskudd 13,690 &gt; nytte aksjer 13,496 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,496 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,690 =&gt; Velger bankinnskudd",
          ],
          answer: 3,
          solution: "<p><b>Regnestykket.</b> Bankens nytte er uendret, siden bankinnskuddet er sikkert:</p><p>1. <b>Bank:</b> U = ln(903 056) = <b>13,7135</b><br>2. <b>Aksjer med 50/50:</b> E[U] = 0,50 × 14,6616 + 0,50 × 12,7183 = 7,3308 + 6,3592 = <b>13,6899</b><br>3. 13,714 &gt; 13,690, altså fortsatt <b>bankinnskudd</b>. Alternativ (d).</p><p><b>Svaret på selve spørsmålet.</b> Nei — den optimistiske troen endrer <i>ikke</i> valget, men den er nær ved. Avstanden i nytte krympet fra 0,218 til 0,024, altså til omtrent en tiendedel. Martin trenger bare litt mer optimisme før aksjer vinner: bryteverdien er der 13,7135 = p × 14,6616 + (1 &minus; p) × 12,7183, som gir p = 51,2 %. Ett prosentpoeng til, og konklusjonen snur.</p><p><b>Hvorfor de andre er gale.</b> Alle fire alternativene er bygget av de samme tre tallene — 13,714, 13,690 og 13,496 — satt sammen på ulike måter. Her må du vite hvilket tall som hører til hva:</p><table class=\"data\"><tr><th>Tall</th><th>Hva det er</th></tr><tr><td class=\"n\">13,714</td><td>ln(903 056) — banken, uendret i hele oppgaven</td></tr><tr><td class=\"n\">13,690</td><td>Aksjer med 50/50-sannsynligheter — dette spørsmålet</td></tr><tr><td class=\"n\">13,496</td><td>Aksjer med 40/60-sannsynligheter — spørsmål 3</td></tr></table><p><b>(a)</b> gir banken 13,496 (aksjetallet fra spørsmål 3) og konkluderer med aksjer.<br><b>(b)</b> gir banken 13,690, altså aksjetallet fra dette spørsmålet.<br><b>(c)</b> har riktig banktall, men bruker 13,496 for aksjer — det er svaret på spørsmål 3, ikke på dette. Dette er det mest fristende gale alternativet, siden konklusjonen er riktig.</p><p><b>Regelen.</b> Endrede sannsynligheter flytter bare nytten til det <i>usikre</i> alternativet. Et sikkert alternativ har samme nytte uansett hva du tror om verden.</p><p><b>Kontroll.</b> Sikkerhetsekvivalenten for aksjer stiger fra 726 228 til e<sup>13,6899</sup> = <b>882 000</b>, fortsatt under bankens 903 056. Differansen er nå bare 21 000 kroner mot 177 000 før — samme historie som nyttetallene forteller, men i kroner.</p>",
        },
        {
          label: "f",
          points: 1,
          body: "<p>En investor med tapsaversjon (loss aversion), vil vektlegge tap mer enn gevinst. Med tapsaversjon misliker man scenarioer som gir lavere avkastning enn et referansepunkt. Måten vi her får frem at vi misliker tap på, er at vi multipliserer scenarioer med lavere avkastning enn referansepunktet med en faktor lavere enn 1. Dermed blir de dårlige utfallene enda dårligere og gir dermed lav nytteverdi.</p><p>Anta at Martin vektlegger nytten av tap med 1/1,03=0,970874 (og ikke som vanlig med 1). Vi bruker fremdeles nyttefunksjonen ln(W). Anta at Martin nå bruker de korrekte (objektive) sannsynlighetene. Referansepunktet er initial investering, altså 500 000.</p><p>Spørsmål 6: Hvordan påvirker Martin sin tapsaversjon valget mellom bankinnskudd og aksjefond?</p>",
          options: [
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,496 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,273 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,690 &gt; nytte aksjer 13,273 =&gt; Velger bankinnskudd",
            "Nytte bankinnskudd 13,714 &gt; nytte aksjer 13,505 =&gt; Velger bankinnskudd",
          ],
          answer: 1,
          solution: "<p><b>Finn først hvilke utfall som er «tap».</b> Referansepunktet er den opprinnelige investeringen på 500 000. Gå gjennom de tre utfallene:</p><table class=\"data\"><tr><th>Utfall</th><th>Sluttverdi</th><th>Mot 500 000</th><th>Vekt på nytten</th></tr><tr><td>Aksjer, gode tider</td><td class=\"n\">2 330 479</td><td>Gevinst</td><td class=\"n\">1</td></tr><tr><td>Aksjer, dårlige tider</td><td class=\"n\">333 804</td><td><b>Tap</b></td><td class=\"n\">0,970874</td></tr><tr><td>Bank</td><td class=\"n\">903 056</td><td>Gevinst</td><td class=\"n\">1</td></tr></table><p>Bare ett utfall er et tap. Bankinnskuddet berøres derfor <b>ikke</b> av tapsaversjonen — dette er hele nøkkelen til spørsmålet.</p><p><b>Regnestykket.</b> Sannsynlighetene er tilbake til de objektive 40/60:</p><p>1. <b>Bank:</b> U = ln(903 056) = <b>13,7135</b> (uendret)<br>2. <b>Aksjer:</b> E[U] = 0,40 × ln(2 330 479) + 0,60 × 0,970874 × ln(333 804)<br>&nbsp;&nbsp;&nbsp;= 0,40 × 14,6616 + 0,60 × 0,970874 × 12,7183<br>&nbsp;&nbsp;&nbsp;= 5,8646 + 7,4087 = <b>13,2734</b><br>3. 13,714 &gt; 13,273, altså <b>bankinnskudd</b> — nå med god margin. Alternativ (b).</p><p>Merk hvordan straffen virker: det dårlige utfallets bidrag faller fra 7,6310 til 7,4087, altså med 0,2223. Det er nøyaktig differansen mellom aksjenyttene 13,496 og 13,273.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>(a)</b> bruker 13,496 for aksjer — nytten <i>uten</i> tapsaversjon, altså svaret på spørsmål 3. Tapsaversjonen er ikke anvendt i det hele tatt.<br><b>(c)</b> bruker 13,690 for banken. Det er aksjetallet fra spørsmål 5, og dessuten er banken uendret på 13,714 gjennom hele oppgaven. Alle fire alternativene sier «velger bankinnskudd», så konklusjonen kan ikke brukes til å skille — bare tallene kan.<br><b>(d)</b> bruker 13,505 for aksjer. Det er verken 13,496 eller 13,273, men ligger tett på det første. Slik ser det ut hvis du bare straffer en liten del av det dårlige utfallet, eller ganger med 0,970874 ett sted for lite.</p><p><b>Regelen.</b> Tapsaversjon vekter nytten av utfall <i>under referansepunktet</i> ekstra tungt. Utfall over referansepunktet — og alle sikre alternativer over det — er uberørt. Man må derfor alltid begynne med å avgjøre hvilke utfall som ligger under referansen.</p><p><b>Kontroll.</b> Sikkerhetsekvivalenten for aksjer faller til e<sup>13,2734</sup> = <b>581 495</b> kroner, mot 726 228 uten tapsaversjon. Martin krever altså 145 000 kroner mer for å bære det samme dårlige utfallet når han er tapsavers.</p><p><b>Historien gjennom oppgave 5.</b> Bank vinner i alle tre variantene, men med svært ulik margin:</p><table class=\"data\"><tr><th>Variant</th><th>Nytte bank</th><th>Nytte aksjer</th><th>Margin</th><th>CE aksjer</th></tr><tr><td>Objektive 40/60 (sp. 3)</td><td class=\"n\">13,714</td><td class=\"n\">13,496</td><td class=\"n\">0,218</td><td class=\"n\">726 228</td></tr><tr><td>Subjektive 50/50 (sp. 5)</td><td class=\"n\">13,714</td><td class=\"n\">13,690</td><td class=\"n\">0,024</td><td class=\"n\">882 000</td></tr><tr><td>Tapsaversjon (sp. 6)</td><td class=\"n\">13,714</td><td class=\"n\">13,273</td><td class=\"n\">0,441</td><td class=\"n\">581 495</td></tr></table><p>Optimisme nesten snur valget; tapsaversjon dobler avstanden i motsatt retning. Det er hele pensumpoenget: atferdsavvikene trekker i hver sin retning og kan begge forklare hvorfor folk holder for lite eller for mye aksjer.</p>",
        },
      ],
    },
    {
      n: 6,
      title: "Bilkjøp med annuitetslån",
      points: 3,
      topic: "Annuitetslån og effektiv rente",
      chapters: [16],
      body: "<p>Vi skal nå vurdere et bilkjøp. Bilen koster 500 000. Av bilselger blir du tilbudt et annuitetslån på 400 000. Nominell renten er 4,99 % og løpetid er 5 år. Vi ser bort fra skatt i oppgaven. Tilbakebetaling skjer etterskuddsvis en gang pr år. Annuiteten er gitt ved følgende formel A der r er nominell rente og T er antall år:</p><p style=\"text-align:center\">A = L · r / (1 &minus; (1 + r)<sup>&minus;T</sup>)</p><p><i>[Merknad: formelen er et bilde i kildefila. Uttrykket over er standard annuitetsformel og gir fasitens tall.]</i></p>",
      parts: [
        {
          label: "a",
          points: 1,
          body: "<p>Spørsmål 1: Hva er årlig tilbakebetaling?</p>",
          options: ["101 815", "94 322", "80 000", "92 364"],
          answer: 3,
          solution: "<p><b>Regnestykket.</b> L = 400 000, r = 4,99 %, T = 5:</p><p>1. (1 + r)<sup>&minus;T</sup> = 1,0499<sup>&minus;5</sup> = 0,784013<br>2. Nevneren: 1 &minus; 0,784013 = 0,215987<br>3. Telleren: 400 000 × 0,0499 = 19 960<br>4. A = 19 960 / 0,215987 = <b>92 364</b> kroner i året</p><p><b>Hvorfor de andre er gale.</b></p><p><b>80 000</b> = 400 000 / 5. Dette er avdragene alene — rentene er glemt helt. Alternativet er verdt å kjenne igjen som en <b>nedre grense</b>: en annuitet må alltid være større enn lånet delt på antall år, siden den også skal dekke renter. Alt under 80 000 kan strykes umiddelbart.<br><b>94 322</b> svarer til en annuitet på 400 000 over fem år med rente rundt <b>5,75 %</b>. Det er feilen å legge gebyrene inn i renten før man i det hele tatt er spurt om dem — gebyrene kommer først i spørsmål 2.<br><b>101 815</b> svarer til rente rundt <b>8,6 %</b> over samme lån og løpetid. Et for høyt tall som fanger den som ganger opp i stedet for å neddiskontere, eller som setter T feil.</p><p><b>Regelen.</b> A = L·r / (1 &minus; (1 + r)<sup>&minus;T</sup>). Annuiteten er lånet delt på annuitetsfaktoren, og annuitetsfaktoren her er 0,215987/0,0499 = 4,3284 — nåverdien av 1 krone i året i fem år ved 4,99 %.</p><p><b>Kontroll — sett opp nedbetalingsplanen.</b> Restgjelden skal treffe null nøyaktig i år 5:</p><table class=\"data\"><tr><th>År</th><th>Termin&shy;beløp</th><th>Renter</th><th>Avdrag</th><th>Restgjeld</th></tr><tr><td>0</td><td class=\"n\">&mdash;</td><td class=\"n\">&mdash;</td><td class=\"n\">&mdash;</td><td class=\"n\">400 000</td></tr><tr><td>1</td><td class=\"n\">92 364</td><td class=\"n\">19 960</td><td class=\"n\">72 404</td><td class=\"n\">327 596</td></tr><tr><td>2</td><td class=\"n\">92 364</td><td class=\"n\">16 347</td><td class=\"n\">76 017</td><td class=\"n\">251 578</td></tr><tr><td>3</td><td class=\"n\">92 364</td><td class=\"n\">12 554</td><td class=\"n\">79 811</td><td class=\"n\">171 768</td></tr><tr><td>4</td><td class=\"n\">92 364</td><td class=\"n\">8 571</td><td class=\"n\">83 793</td><td class=\"n\">87 974</td></tr><tr><td>5</td><td class=\"n\">92 364</td><td class=\"n\">4 390</td><td class=\"n\">87 974</td><td class=\"n\"><b>0</b></td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>461 822</b></td><td class=\"n\"><b>61 822</b></td><td class=\"n\"><b>400 000</b></td><td class=\"n\"></td></tr></table><p>Terminbeløpet er konstant, mens rentedelen faller og avdragsdelen stiger — det er selve definisjonen på et annuitetslån, og skillet mot et serielån, der avdraget er konstant og terminbeløpet faller. Legg merke til rentesummen 61 822: den kommer tilbake som feilalternativ i spørsmål 3.</p>",
        },
        {
          label: "b",
          points: 1,
          body: "<p>I spørsmål 1 er det ikke tatt hensyn til gebyrer. De vanligste gebyrer ved lån er etableringsgebyr og termingebyr. Etableringsgebyr betales samtidig med utbetaling av lån. I dette tilfellet er etableringsgebyret på 5 990. Termingebyr er et gebyr som betales ved hver tilbakebetaling. Det skjer etterskuddsvis en gang i året. Termingebyret er på 1 020.</p><p>Spørsmål 2: Hva er ny effektiv rente? Effektiv rente finner du ved å sette opp kontantstrømmen og regne internrente til kontantstrømmen til lånet.</p>",
          options: ["4,99%", "5,44%", "5,94%", "6,44%"],
          answer: 2,
          solution: "<p><b>Sett opp kontantstrømmen fra låntakerens side.</b> Det er to gebyrer, og de virker på hver sin måte:</p><p>1. <b>Etableringsgebyret</b> på 5 990 betales ved utbetaling, altså i år 0. Låntakeren får derfor bare <b>394 010</b> netto i hånden, ikke 400 000.<br>2. <b>Termingebyret</b> på 1 020 betales sammen med hver termin. Årlig utbetaling blir <b>92 364 + 1 020 = 93 384</b>.</p><table class=\"data\"><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><td>Kontantstrøm</td><td class=\"n\">+394 010</td><td class=\"n\">&minus;93 384</td><td class=\"n\">&minus;93 384</td><td class=\"n\">&minus;93 384</td><td class=\"n\">&minus;93 384</td><td class=\"n\">&minus;93 384</td></tr></table><p>3. <b>Effektiv rente er internrenten</b> til denne strømmen — den r som gjør nåverdien null:</p><p>394 010 = 93 384 × (1 &minus; (1 + r)<sup>&minus;5</sup>) / r&nbsp;&rArr;&nbsp;r = <b>5,94 %</b></p><p><b>Slik finner du den på eksamen.</b> Internrenten kan ikke løses eksplisitt, så prøv alternativene med annuitetsformelen baklengs. Ved 5,94 % er annuitetsfaktoren 4,2192, og 394 010/4,2192 = 93 384 &#10003;. Ved 4,99 % blir den 394 010/4,3284 = 91 030, som er for lite. Én prøve på hvert alternativ er raskere enn å iterere.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>4,99 %</b> er den nominelle renten — svaret til den som ikke gjør noe med gebyrene i det hele tatt. Effektiv rente er per definisjon høyere enn nominell rente når det finnes gebyrer.<br><b>5,44 %</b> er svaret til den som bare tar med <i>ett</i> av gebyrene. Regner du bare med termingebyret, får du 5,39 %; bare etableringsgebyret gir 5,54 %. Begge må med, og de gir 5,94 % til sammen.<br><b>6,44 %</b> er nøyaktig 5,94 % + 0,5 pp — et overskudd som fanger den som legger gebyrene på som en enkel prosentandel av lånet i stedet for å neddiskontere dem. Merk at de fire alternativene ligger med 0,45–0,5 pp mellomrom, så øyemål hjelper ikke.</p><p><b>Regelen.</b> Effektiv rente = internrenten til den faktiske kontantstrømmen. Etableringsgebyr trekkes fra beløpet du mottar i år 0; termingebyr legges til hver innbetaling. Alle gebyrer skal med — det er hele hensikten med begrepet.</p><p><b>Kontroll på størrelsesordenen.</b> Samlede gebyrer er 5 990 + 5 × 1 020 = 11 090 kroner over fem år, altså rundt 2 218 i året på en gjennomsnittlig restgjeld på cirka 230 000. Det er omtrent 0,96 prosentpoeng — og 4,99 % + 0,95 = 5,94 %. Overslaget treffer nøyaktig.</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Kredittkostnader er alle kostnader, herunder stiftelseskostnader, renter, løpende provisjoner og alle andre kostnader, som forbrukeren skal betale for kreditten. Det er ikke vanlig å ta hensyn til tidsverdien av penger, dvs man bare summerer beløpene over tid.</p><p>Spørsmål 3: Hva er kredittkostnad for lånet?</p>",
          options: ["61 822", "472 912", "5 100", "72 912"],
          answer: 3,
          solution: "<p><b>Definisjonen først.</b> Kredittkostnaden er <b>alt du betaler minus det du fikk låne</b>, uten diskontering. Oppgaveteksten sier det eksplisitt: beløpene summeres bare over tid.</p><p><b>Regnestykket.</b></p><p>1. Sum terminbeløp: 5 × 92 364,38 = <b>461 822</b><br>2. Sum termingebyr: 5 × 1 020 = <b>5 100</b><br>3. Etableringsgebyr: <b>5 990</b><br>4. Sum betalt: 461 822 + 5 100 + 5 990 = <b>472 912</b><br>5. Kredittkostnad = 472 912 &minus; 400 000 = <b>72 912</b> kroner</p><p><b>Kontroll — regn den andre veien.</b> Kredittkostnaden er også renter pluss gebyrer, siden avdragene bare er tilbakebetaling av det du fikk:</p><p>61 822 (renter, fra nedbetalingsplanen i spørsmål 1) + 5 100 (termingebyr) + 5 990 (etableringsgebyr) = <b>72 912</b> &#10003;</p><p><b>Presisjonsmerknad.</b> Bruker du den avrundede annuiteten 92 364 i stedet for 92 364,38, blir summen 72 910. Fasitens 72 912 forutsetter uavrundet annuitet gjennom hele regnestykket. Regn med alle desimaler helt til slutt — det er samme fallgruve som i flere andre sett i dette kurset.</p><p><b>Hvorfor de andre er gale — og legg merke til at alle tre er ekte mellomresultater:</b></p><table class=\"data\"><tr><th>Alternativ</th><th>Hva det faktisk er</th><th>Hva som mangler</th></tr><tr><td class=\"n\">61 822</td><td>Rentene alene: 5 × 92 364,38 &minus; 400 000</td><td>Begge gebyrene, til sammen 11 090</td></tr><tr><td class=\"n\">5 100</td><td>Termingebyrene alene: 5 × 1 020</td><td>Renter og etableringsgebyr</td></tr><tr><td class=\"n\">472 912</td><td>Sum av alt som betales inn</td><td>De 400 000 du fikk låne er ikke trukket fra</td></tr></table><p><b>472 912</b> er den farligste: den er nøyaktig riktig sum, men glemmer det siste steget. <b>61 822</b> fanger den som setter likhetstegn mellom «kredittkostnad» og «renter» — og det er nettopp derfor definisjonen står i oppgaveteksten.</p><p><b>Regelen.</b> Kredittkostnad = sum av alle innbetalinger &minus; lånebeløpet, udiskontert. Effektiv rente svarer på det samme spørsmålet <i>med</i> tidsverdi; kredittkostnaden er kroneversjonen uten. De to tallene skal aldri blandes.</p><p><b>I kroner og øre.</b> Bilen koster 500 000. Med 100 000 i egenkapital og dette lånet betaler du 472 912 over fem år for de resterende 400 000 — 72 912 kroner, eller 18,2 % av lånebeløpet, i ren lånekostnad.</p>",
        },
      ],
    },
    {
      n: 7,
      title: "Jonas, Merton og humankapitalen",
      points: 5,
      topic: "Merton og humankapital",
      chapters: [14],
      body: "<p>Jonas kan velge mellom et globalt diversifisert aksjefond (heretter kalt aksjer) og bankinnskudd. Aksjer representerer risikabel investering, mens bankinnskudd representerer en risikofri investering. Gitt en del forutsetninger vil følgende formel angi optimal allokering mellom aksjer og bankinnskudd:</p><p style=\"text-align:center\">w = (E(R) &minus; R<sub>f</sub>) / (&gamma; · &sigma;<sup>2</sup>)</p><p>w er andel av totalformue i aksjer.</p><p>Vi antar at parameterne i formelen har følgende verdier:</p><table class=\"data\"><tr><th>Parameter</th><th>Verdi</th></tr><tr><td>Aksjepremie, E(R) &minus; R<sub>f</sub></td><td class=\"n\">4 %</td></tr><tr><td>Risikoaversjon, &gamma;</td><td class=\"n\">2</td></tr><tr><td>Volatilitet, &sigma;</td><td class=\"n\"></td></tr></table><p><i>[Merknad: cellen for volatilitet er tom i kildefila. Fasitens svar på spørsmål 1 forutsetter &sigma; = 20 %, siden 4 %/(2 × 20 %²) = 50 %. Oppgavens overskrift sier «maks 4 poeng», men delspørsmålene summerer til 5, og poengoversikten bakerst i sensorveiledningen sier 5 poeng. 5 er brukt her.]</i></p>",
      parts: [
        {
          label: "a",
          points: 0.5,
          body: "<p>Spørsmål 1: Regn ut optimal andel av totalformue investert i aksjer, dvs. finn w?</p>",
          options: ["33,3 %", "50 %", "66,7 %", "100 %"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b> Mertons formel med &sigma; = 20 %:</p><p>1. Nevneren: &gamma; · &sigma;² = 2 × (0,20)² = 2 × 0,04 = <b>0,08</b><br>2. w = 0,04 / 0,08 = <b>0,50 = 50 %</b></p><p><b>Fellen som ligger i nevneren.</b> Det er <b>variansen</b> &sigma;², ikke standardavviket &sigma;, som står i formelen. Bruker du 0,20 i stedet for 0,04, får du 0,04/(2 × 0,20) = 10 % — et helt annet svar. Kvadrer alltid volatiliteten før du deler.</p><p><b>Hvorfor de andre er gale.</b> Ingen av dem lar seg regne fram med de oppgitte parameterne. De er de fire faste svaralternativene som går igjen i hele oppgave 7 (33,3 %, 50 %, 66,7 %, 100 %) — det er samme liste i spørsmål 1, 4 og 6, slik at et riktig svar ett sted er et galt svar et annet. <b>66,7 %</b> og <b>100 %</b> er svarene på spørsmål 6 og 4; <b>33,3 %</b> er bankandelen i spørsmål 6.</p><p><b>Regelen.</b> w* = (&mu; &minus; r<sub>f</sub>) / (&gamma;&sigma;²): optimal aksjeandel av <b>totalformuen</b> stiger med risikopremien og faller med risikoaversjon og varians. Formelen sier ingenting om <i>hvor</i> formuen ligger — bare hvor stor andel av alt du eier som skal ha aksjerisiko. Det skillet er hele resten av oppgaven.</p><p><b>Kontroll.</b> Doble risikoaversjonen til &gamma; = 4, og andelen skal halveres: 0,04/(4 × 0,04) = 25 %. Doble volatiliteten til 40 %, og andelen skal falle til en fjerdedel: 0,04/(2 × 0,16) = 12,5 %. Begge stemmer med formelens struktur.</p>",
        },
        {
          label: "b",
          points: 0.5,
          body: "<p>Anta at Jonas har 2000' i finansiell formue. Finansiell formue er i dette eksemplet altså summen av aksjer og bankinnskudd. Det er hans eneste eiendeler. Han har ingen forpliktelser.</p><p>Spørsmål 2: Hvis han følger rådet fra formelen over, hvor stort beløp skal han investere i aksjer?</p>",
          options: ["500'", "1000'", "1500'", "2000'"],
          answer: 1,
          solution: "<p><b>Regnestykket.</b> Her er finansiell formue Jonas' <i>eneste</i> eiendel, så totalformue = finansiell formue = 2 000′.</p><p>Aksjer = w × totalformue = 50 % × 2 000′ = <b>1 000′</b></p><p><b>Balansen.</b></p><table class=\"data\"><tr><th>Eiendeler</th><th>Beløp</th><th>Forpliktelser og egenkapital</th><th>Beløp</th></tr><tr><td>Aksjer</td><td class=\"n\">1 000′</td><td>Netto formue</td><td class=\"n\">2 000′</td></tr><tr><td>Bankinnskudd</td><td class=\"n\">1 000′</td><td></td><td class=\"n\"></td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>2 000′</b></td><td><b>Sum</b></td><td class=\"n\"><b>2 000′</b></td></tr></table><p><b>Hvorfor de andre er gale.</b> <b>500′</b> er 25 % av formuen, altså w halvert en gang for mye. <b>1 500′</b> er 75 %. <b>2 000′</b> er alt i aksjer, som ville krevd w = 100 % — det blir riktig svar i spørsmål 3, men bare fordi formuen der er dobbelt så stor.</p><p><b>Regelen.</b> Beløp i aksjer = w × totalformue. Så lenge det ikke finnes andre eiendeler, er finansiell formue og totalformue det samme, og &alpha; = w. Dette spørsmålet finnes for å etablere <i>utgangspunktet</i> — hele poenget kommer når humankapitalen tas inn i neste spørsmål.</p><p><b>Kontroll.</b> 1 000′ i aksjer og 1 000′ i bank gir en aksjeandel på 1 000/2 000 = 50 % = w. &#10003;</p>",
        },
        {
          label: "c",
          points: 1,
          body: "<p>Anta nå at vi i tillegg til finansielle eiendeler tar med Jonas sin humankapital. Den er per i dag på 2000'. Videre antar vi at den er risikofri. Det kan selvsagt diskuteres om dette er en rimelig antagelse, men vi lar den diskusjonen ligge for nå. Vi kan dermed se på humankapitalen til Jonas som et bankinnskudd. Vi antar fremdeles at Jonas har samme markedssyn, dvs. han vil beholde samme andel av totalformue i aksjer som tidligere funnet.</p><p>Spørsmål 3: Hvor mye skal han nå investere i aksjer?</p>",
          options: ["500'", "1000'", "1500'", "2000'"],
          answer: 3,
          solution: "<p>Dette er kjernen i hele oppgave 7, og et av kursets viktigste enkeltpoeng.</p><p><b>Regnestykket i tre steg.</b></p><p>1. <b>Utvid formuesbegrepet.</b> Totalformue = finansiell formue + humankapital = 2 000′ + 2 000′ = <b>4 000′</b>.<br>2. <b>Behold samme w.</b> Aksjer skal utgjøre 50 % av totalformuen: 0,50 × 4 000′ = <b>2 000′</b>.<br>3. <b>Sjekk om det er gjennomførbart.</b> Han har 2 000′ i finansiell formue, så 2 000′ i aksjer betyr at <i>hele</i> den finansielle formuen står i aksjer og bankinnskuddet er null. Det går akkurat opp — uten giring.</p><p><b>Balansen.</b></p><table class=\"data\"><tr><th>Eiendeler</th><th>Beløp</th><th>Forpliktelser og egenkapital</th><th>Beløp</th></tr><tr><td>Aksjer</td><td class=\"n\">2 000′</td><td>Netto formue</td><td class=\"n\">4 000′</td></tr><tr><td>Bankinnskudd</td><td class=\"n\">0</td><td></td><td class=\"n\"></td></tr><tr><td>Humankapital (implisitt bankinnskudd)</td><td class=\"n\">2 000′</td><td></td><td class=\"n\"></td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>4 000′</b></td><td><b>Sum</b></td><td class=\"n\"><b>4 000′</b></td></tr></table><p><b>Intuisjonen.</b> Humankapitalen er antatt risikofri og virker derfor som et stort bankinnskudd du ikke kan røre. Den risikofrie delen av formuen er allerede dekket av jobben. For å nå 50 % aksjerisiko på <i>hele</i> formuen må derfor hele den finansielle formuen inn i aksjer. Dette er hele begrunnelsen for at unge sparere bør ha høyere aksjeandel enn eldre: den risikofrie humankapitalen er størst når du er ung.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>1 000′</b> er svaret fra spørsmål 2 — altså å ignorere humankapitalen helt. Dette er den feilen spørsmålet er laget for å avdekke.<br><b>1 500′</b> = 50 % × 3 000′, altså å telle med bare halve humankapitalen. Noen kommer hit ved å blande sammen totalformue og finansiell formue underveis.<br><b>500′</b> er en fjerdedel av den finansielle formuen og har ingen tolkning her.</p><p><b>Regelen.</b> Mertons w gjelder <b>totalformuen</b>, humankapital inkludert. Er humankapitalen risikofri, teller den som bankinnskudd, og den finansielle porteføljen må vris mot aksjer for å kompensere: beløp i aksjer = w × (F + H), begrenset oppad av F med mindre du kan låne.</p><p><b>Kontroll — hvor grensen går.</b> Var humankapitalen 3 000′, ville formelen kreve 0,5 × 5 000′ = 2 500′ i aksjer, altså mer enn de 2 000′ han har. Da måtte han <b>låne</b> 500′ for å nå målet. Formelen sier hva som er optimalt, ikke hva som er mulig.</p>",
        },
        {
          label: "d",
          points: 1,
          body: "<p>Spørsmål 4: Vi definerer &alpha; som andel i aksjer av finansiell formue. Hva er &alpha; for alternativet i spørsmål 3?</p>",
          options: ["33,3 %", "50 %", "66,7 %", "100 %"],
          answer: 3,
          solution: "<p><b>Skill de to andelene.</b> Oppgaven innfører nå et andre begrep, og resten av oppgave 7 handler om forskjellen:</p><table class=\"data\"><tr><th>Symbol</th><th>Definisjon</th><th>Nevner</th></tr><tr><td>w</td><td>Andel av <b>totalformuen</b> i aksjer</td><td>Finansiell formue + humankapital</td></tr><tr><td>&alpha;</td><td>Andel av <b>finansiell formue</b> i aksjer</td><td>Bare finansiell formue</td></tr></table><p><b>Regnestykket.</b> Fra spørsmål 3: aksjer 2 000′, finansiell formue 2 000′.</p><p>&alpha; = 2 000′ / 2 000′ = <b>100 %</b></p><p>Hele den finansielle formuen står i aksjer, og bankinnskuddet er null: (1 &minus; &alpha;) = 0 %.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>50 %</b> er w, ikke &alpha;. Dette er det klart mest fristende gale alternativet: den som ikke har lest definisjonen nøye, svarer med tallet fra spørsmål 1. Det er nettopp forskjellen mellom w og &alpha; spørsmålet måler.<br><b>66,7 %</b> er &alpha; i spørsmål 6, altså riktig begrep men feil tidspunkt.<br><b>33,3 %</b> er bankandelen (1 &minus; &alpha;) i spørsmål 6.</p><p><b>Regelen — sammenhengen mellom de to.</b> Med risikofri humankapital H og finansiell formue F:</p><p>&alpha; = w × (F + H) / F = w × (1 + H/F)</p><p>Her: 0,50 × (1 + 2 000/2 000) = 0,50 × 2 = <b>100 %</b>. &#10003; &alpha; er alltid <b>større enn eller lik</b> w når humankapitalen er risikofri og positiv, og de er like bare når H = 0.</p><p><b>Kontroll.</b> I spørsmål 2, uten humankapital, var H/F = 0 og &alpha; = w × 1 = 50 %. Formelen gjengir begge situasjonene riktig.</p>",
        },
        {
          label: "e",
          points: 1,
          body: "<p>Anta nå at det går 10 år. Humankapitalen er redusert til 1000', mens finansielle eiendeler har økt til 3000'. Humankapitalen er fremdeles risikofri. Vi antar at Jonas har samme markedssyn, dvs. vil beholde samme andel av totalformue i aksjer som tidligere funnet.</p><p>Spørsmål 5: Hvor stort beløp skal han nå investere i aksjer?</p>",
          options: ["500'", "1000'", "1500'", "2000'"],
          answer: 3,
          solution: "<p><b>Regnestykket.</b></p><p>1. <b>Totalformue:</b> 3 000′ (finansiell) + 1 000′ (humankapital) = <b>4 000′</b>. Legg merke til at den er <i>uendret</i> fra spørsmål 3 — humankapitalen har blitt til finansiell formue etter hvert som han har jobbet og spart.<br>2. <b>Aksjer:</b> 0,50 × 4 000′ = <b>2 000′</b>. Også uendret.<br>3. <b>Bankinnskudd:</b> 3 000′ &minus; 2 000′ = 1 000′.</p><p><b>Balansen.</b></p><table class=\"data\"><tr><th>Eiendeler</th><th>Beløp</th><th>Forpliktelser og egenkapital</th><th>Beløp</th></tr><tr><td>Aksjer</td><td class=\"n\">2 000′</td><td>Netto formue</td><td class=\"n\">4 000′</td></tr><tr><td>Bankinnskudd</td><td class=\"n\">1 000′</td><td></td><td class=\"n\"></td></tr><tr><td>Humankapital (implisitt bankinnskudd)</td><td class=\"n\">1 000′</td><td></td><td class=\"n\"></td></tr><tr><td><b>Sum</b></td><td class=\"n\"><b>4 000′</b></td><td><b>Sum</b></td><td class=\"n\"><b>4 000′</b></td></tr></table><p><b>Hvorfor de andre er gale.</b></p><p><b>1 500′</b> = 50 % × 3 000′, altså w brukt på finansiell formue alene. Dette er den samme feilen som i spørsmål 3, bare med nye tall — og den er lettere å gjøre nå, fordi 3 000′ er et fristende «totalbeløp». Det er nettopp forskjellen mellom w og &alpha; oppgaven har brukt to spørsmål på å etablere.<br><b>1 000′</b> = 25 % av totalformuen, eller bankbeholdningen forvekslet med aksjebeholdningen.<br><b>500′</b> har ingen tolkning i denne balansen.</p><p><b>Regelen.</b> Kroneandelen i aksjer avhenger bare av <b>totalformuen</b> og w. Når humankapitalen omdannes til finansiell formue krone for krone, endres ikke aksjebeløpet i det hele tatt — bare hvordan resten er plassert.</p><p><b>Poenget for livsløpssparing.</b> Kroneandelen er stabil, men <i>andelen av porteføljen</i> faller: fra 100 % til 66,7 % (spørsmål 6). Det er den klassiske livssyklusanbefalingen — høy aksjeandel når du er ung og humankapitalen er stor, fallende med alderen — og her kommer den ut av Mertons formel uten noen tommelfingerregel om «110 minus alder».</p><p><b>Kontroll.</b> Den risikofrie delen av totalformuen er 1 000′ i bank + 1 000′ humankapital = 2 000′, altså 50 % av 4 000′. Aksjene er de andre 50 %. &#10003;</p>",
        },
        {
          label: "f",
          points: 1,
          body: "<p>Spørsmål 6: Hva er andel i aksjer av finansiell formue, dvs. &alpha;?</p>",
          options: ["33,3 %", "50 %", "66,7 %", "100 %"],
          answer: 2,
          solution: "<p><b>Regnestykket.</b> Fra spørsmål 5: aksjer 2 000′, finansiell formue 3 000′.</p><p>&alpha; = 2 000′ / 3 000′ = 0,6667 = <b>66,7 %</b>, og bankandelen (1 &minus; &alpha;) = 1 000′/3 000′ = <b>33,3 %</b>.</p><p><i>Merk at sensorveiledningen skriver «33,7 % i bankinnskot» her. Det er en skrivefeil: 100 % &minus; 66,7 % = 33,3 %. Riktig svaralternativ (66,7 %) er ikke berørt.</i></p><p><b>Kontroll med formelen.</b> &alpha; = w × (1 + H/F) = 0,50 × (1 + 1 000/3 000) = 0,50 × 1,3333 = <b>66,7 %</b>. &#10003;</p><p><b>Hvorfor de andre er gale.</b></p><p><b>100 %</b> er &alpha; fra spørsmål 4, altså ti år tidligere. Den som ikke oppdaterer H/F-forholdet, blir stående igjen der.<br><b>50 %</b> er w — andelen av totalformuen, ikke av den finansielle. Samme forveksling som i spørsmål 4.<br><b>33,3 %</b> er <b>bankandelen</b>, altså 1 &minus; &alpha;. Dette er den farligste: tallet er riktig regnet, men svarer på det motsatte spørsmålet. Les alltid om det spørres om aksjeandelen eller om resten.</p><p><b>Oppsummering av hele oppgave 7 i én tabell.</b></p><table class=\"data\"><tr><th>Situasjon</th><th>Finansiell F</th><th>Human H</th><th>Total</th><th>Aksjer</th><th>w</th><th>&alpha;</th></tr><tr><td>Sp. 2 — uten humankapital</td><td class=\"n\">2 000′</td><td class=\"n\">0</td><td class=\"n\">2 000′</td><td class=\"n\">1 000′</td><td class=\"n\">50 %</td><td class=\"n\">50 %</td></tr><tr><td>Sp. 3–4 — med humankapital</td><td class=\"n\">2 000′</td><td class=\"n\">2 000′</td><td class=\"n\">4 000′</td><td class=\"n\">2 000′</td><td class=\"n\">50 %</td><td class=\"n\">100 %</td></tr><tr><td>Sp. 5–6 — ti år senere</td><td class=\"n\">3 000′</td><td class=\"n\">1 000′</td><td class=\"n\">4 000′</td><td class=\"n\">2 000′</td><td class=\"n\">50 %</td><td class=\"n\">66,7 %</td></tr></table><p><b>Regelen, i én setning.</b> w er konstant fordi markedssynet og risikoaversjonen er konstante; &alpha; = w(1 + H/F) faller med alderen fordi humankapitalen forbrukes mens den finansielle formuen bygges opp.</p><p><b>Forbeholdet oppgaven selv nevner.</b> Alt dette hviler på at humankapitalen er <i>risikofri</i>. Er den risikabel — og særlig hvis den er positivt korrelert med aksjemarkedet, slik den er for en finansanalytiker eller en gründer — skal aksjeandelen ned, ikke opp. Da må formelen korrigeres med et ledd for korrelasjonen mellom humankapital og aksjer, og &alpha; kan bli lavere enn w.</p>",
        },
      ],
    },
  ],
},
];
