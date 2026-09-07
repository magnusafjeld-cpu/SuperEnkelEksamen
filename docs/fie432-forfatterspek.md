# FIE432 — Forfatterspesifikasjon (LES HELE FØR DU SKRIVER)

Du skriver ett eller flere kapitler av `FIE432_Manual.html`, den eneste sannhetskilden for
et læringsprogram. Programmet parser HTML-en i nettleseren og bygger studieplan, quiz,
flashcards, lynspill og søk oppå den. **Markup-feil sletter innhold i stillhet — følg
spesifikasjonen nøyaktig.**

Skriv kapitlene dine til stien du får oppgitt, som et **fragment**: én
`<section id="kN">…</section>` per kapittel, ingenting annet. Ingen `<html>`, `<head>`,
`<body>`. Byggeverktøyet `tools/fie432-bygg-manual.py` setter fragmentene sammen.

Les `docs/fie432-kursplan.md` sammen med denne: den sier hva kapitlet ditt skal dekke,
hva leseren allerede kan når han kommer dit, og hvilke eksamensspørsmål det må forberede
ham på. Kartleggingene i `docs/fie432-research/` er råstoffet: `02-forelesninger-skatt.md`
og `03-forelesninger-finans.md` for forelesningsinnholdet, `04-pensumartikler.md` og
`04b-ssb-ulikhet.md` for artiklene, `05-satser-2026.md` for de faktiske satsene, og
`01-eksamens-dna.md` for hva som testes.

---

## 1. Språk og leser

- **Alt på norsk (bokmål).** Kurset undervises på norsk og eksamen er på norsk.
  Fagtermer som ikke har et etablert norsk navn beholdes på engelsk i kursiv første
  gang (*implicit tax*, *lock-in*), deretter den norske formen forelesningene bruker.
- Leseren er én person: en masterstudent ved NHH som **følger forelesningene i FIE432
  denne høsten**, men som ikke har lærebok, og som ikke kan regne med å huske alt fra
  auditoriet. Manualen skal kunne stå alene: den som bare leser manualen og gjør
  drillene, skal kunne alt til eksamen. Forklarer du det ikke, kan han det ikke.
- Tiltale: **«du»**. Aktiv form. Direkte. Ingen «i dette kapitlet skal vi se på».
- Forutsett aldri et begrep som ikke er innført i et tidligere kapittel (kapittelkartet i
  kursplanen sier hva som kommer før deg). Trenger du noe fra et senere kapittel: gi
  énsetningsversjonen og legg inn en `.callout.link` som peker fram.

## 2. Påkrevd HTML-skjelett

```html
<section id="k5">
<a class="backtotop" href="#toc">↑ innhold</a>
<h2 class="part">Del II — Aksjonær- og formuesbeskatning</h2>
<h2 class="chap">5 · Aksjonærmodellen: skjerming, utbytte og gevinst</h2>

<p class="lead-in">Ett avsnitt som sier hvorfor kapitlet betyr noe PÅ EKSAMEN, med
konkrete eksamensår eller spørsmålstyper. Ikke «dette kapitlet handler om utbytte».</p>

<h3>5.1 Seksjonstittel</h3>
<p>Brødtekst …</p>

</section>
```

Harde regler — hver av dem sletter innhold uten feilmelding om den brytes:

| Regel | Hvorfor |
|---|---|
| `<section id="kN">` — liten `k`, bare sifre, intet suffiks | filteret er `/^k\d+$/`; `<div>` treffes ikke |
| `<h2 class="chap">N · Tittel</h2>` — skilletegnet må være `·` eller `.` | alt annet etterlater «5 -» i tittelen |
| **Ingenting før `<h2 class="chap">` overlever** utover det som strippes | brødteksten starter etter den |
| `<h3>` må være **direkte barn** av `<section>`, og begynne med `N.M ` | nøstet i en `<div>` = seksjonen forsvinner |
| Seksjoner nummerert `5.1`, `5.2`, … med kapitlets nummer | prefikset parses av |
| Kapittelnumre **sammenhengende** — ingen hull | forrige/neste bruker `num±1` |
| Skriv aldri rå `<` eller `>` i tekst eller formler | DOMParser spiser resten av dokumentet. Bruk `&lt;` `&gt;` |
| Nøst aldri `<section>` | lukker feil nivå |

`<h2 class="part">`, `<a class="backtotop">` og `<hr class="sec">` strippes av parseren,
men holder fila lesbar frittstående. Ta dem med.

## 3. Innholdselementene

### Formelblokk
```html
<div class="formula">
  <div class="eq">Skjermingsfradrag<sub>t</sub> = (kostpris + ubenyttet skjerming<sub>t−1</sub>) × r<sub>s,t</sub></div>
  <div class="where">Skjermingsgrunnlaget er aksjens inngangsverdi pluss framført ubenyttet
  skjerming. Skjermingsrenten r<sub>s</sub> fastsettes i januar året etter inntektsåret.</div>
</div>
```
- Flere `<div class="eq">` i én blokk er lov.
- En `.formula` **uten** både `.eq` og `.where` forkastes. Ha alltid minst én av dem.
- Innled en formel med en setning som slutter på kolon, og forklar den rett etter.

### De fem boksene — hver har én jobb
```html
<div class="callout mech"><span class="h">Hvorfor virker formuesskatten som en skatt på avkastning?</span>
Forklaringen av mekanismen.</div>
```
| Klasse | Jobb | Hyppighet |
|---|---|---|
| `mech` | **Hvorfor virker dette?** Mekanismen. Overskriften er ofte et spørsmål. Dette er arbeidshesten | 3–5 per kapittel |
| `tip` | **Slik spørres det.** Hvordan stoffet testes som flervalg: hva et typisk spørsmål ser ut som, hva de gale alternativene pleier å være, hva som skiller dem fra det riktige | 1–2 per kapittel |
| `link` | Kobling til et annet kapittel eller et eksamensspørsmål | 1–2 per kapittel |
| `warn` | Direkte advarsel om en feil som koster poeng — med minuspoeng koster den dobbelt | 1–2 per kapittel |
| `mistake` | Forbeholdt ekte store misforståelser. Sjelden | 0–1 per kapittel |

Hver boks må ha `<span class="h">Overskrift</span>` som første barn.

### Gjennomregnet eksempel — det viktigste elementet i manualen
```html
<div class="worked"><span class="wh">Gjennomregnet: utbytte med ubenyttet skjerming</span>
<p>Oppsettet, med konkrete tall.</p>
<table class="data">
<tr><th>Inndata</th><th>Verdi</th></tr>
<tr><td>Kostpris</td><td class="n">100,00</td></tr>
</table>
<p><b>Steg 1 — skjermingsfradraget i år 1.</b> 100 × 3,5 % = <b>3,50</b>. Ikke utbytte → ubenyttet 3,50.</p>
<p><b>Steg 2 — …</b></p>
<p><b>Kontroll:</b> alternativ vei gir samme tall. ✓</p>
</div>
```
- **Minst 2 gjennomregnede eksempler per regnekapittel**, 3 der kapitlet bærer en
  flertrinnsrutine (skjerming over flere år, gjeldsfordeling ved formuesskatt).
  De er slik leseren lærer å regne, og de er det eksamen faktisk krever.
- Nummerer hvert mellomresultat. Vis hvert steg.
- **Bruk eksamenens egne tallstørrelser.** Eksamen gir satsene i oppgaveteksten
  («anta at eierskatten er 40 %»), ofte *andre* enn dagens. Eksemplene skal derfor
  veksle mellom dagens satser og oppgitte eksempeltall, og alltid si hvilken de bruker.
- Avslutt med **kontrollen** en god kandidat gjør: regn samme tall en annen vei
  (sats × oppjustert grunnlag mot oppjustert sats × grunnlag), sjekk at nettoformuen
  summerer over aktivaene, at etter-skatt-beløpene stemmer med indifferensen.

### Tabeller
`<table class="data">` med en `<tr><th>…</th></tr>`-rad. Tallceller får `class="n"`.

### Figurer — bare inline SVG
```html
<figure>
<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Kort beskrivelse for skjermleser"
     font-family="Georgia,serif" font-size="13">
  <line x1="60" y1="270" x2="490" y2="270" stroke="#333" stroke-width="1.4"/>
  <line x1="60" y1="270" x2="60"  y2="30"  stroke="#333" stroke-width="1.4"/>
  <text x="275" y="300" text-anchor="middle">Kvantum</text>
  <text x="22" y="150" text-anchor="middle" transform="rotate(-90 22 150)">Pris</text>
  <path d="M60,240 L480,70" stroke="#6b1f2a" stroke-width="2.3" fill="none"/>
  <text x="430" y="62" fill="#6b1f2a" font-weight="bold">Tilbud</text>
</svg>
<figcaption>Figur 11.1 — To til fire setninger om hva figuren viser og hva leseren skal ta med seg.</figcaption>
</figure>
```
- Bruk `<figure>`, **aldri** `<div class="figure">`.
- Fast palett: `#6b1f2a` primærkurve, `#2f5a3f` sekundær, `#1f3a5f` tertiær,
  `#b06000` annotasjon, `#999` hjelpelinjer, `#555` liten tekst, `#333` akser.
- Stiplet (`stroke-dasharray="5 4"`) = forskjøvet eller alternativ kurve. Merk kurvene i enden.
- Tegn det som er visuelt: insidens med elastisiteter, budsjettlinjen i to-periodemodellen,
  effektiv skattesats langs inntektsfordelingen, kapitalmarkedslinjen, forventet nytte
  og sikkerhetsekvivalent, gjeldsfordelingen som stablet søyle. Sikt på **1 figur per
  kapittel** der stoffet er grafisk; ikke tegn for å tegne.

## 4. Notasjon — bruk denne, i hvert kapittel

| Symbol | Betydning | Skrives |
|---|---|---|
| t | skatt på alminnelig inntekt (22 %) | `t` |
| f | oppjusteringsfaktor for utbytte og gevinst (1,72) | `f` |
| t<sub>e</sub> | eierskatt, effektiv sats = t × f (37,84 %) | `t<sub>e</sub>` |
| r<sub>s</sub> | skjermingsrenten | `r<sub>s</sub>` |
| S | skjermingsgrunnlag (kostpris + framført ubenyttet skjerming) | `S` |
| τ<sub>w</sub> | formuesskattesats (1,0 % / 1,1 %) | `τ<sub>w</sub>` |
| W | netto formuesverdi (etter rabatter og gjeld) | `W` |
| ρ | verdsettingsrabatt (20 % aksjer, 75 % primærbolig …) | `ρ` |
| B | bunnfradrag | `B` |
| r | avkastning før skatt; r<sub>f</sub> risikofri | `r`, `r<sub>f</sub>` |
| π | inflasjon | `π` |
| τ<sub>c</sub> | selskapsskatt (22 %) | `τ<sub>c</sub>` |
| P, p | konsumentpris, produsentpris (insidens) | `P`, `p` |
| ε<sub>D</sub>, ε<sub>S</sub> | etterspørsels- og tilbudselastisitet | |
| U(W), E[U] | nyttefunksjon, forventet nytte | |
| γ, σ², μ | risikoaversjon, varians, forventet avkastning (Merton) | |
| w* | optimal aksjeandel | `w*` |

Bruk **`−`** (U+2212) som minus i matematikk, ikke bindestrek. `×` for multiplikasjon.
**Desimalkomma og mellomrom som tusenskille**: `37,84 %`, `1 467 200 kr`. Prosent med
mellomrom før tegnet: `22 %`. Kroner skrives `kr 500 000` i løpende tekst og `500 000`
i tabellceller merket i overskriften.

Kursets konvensjoner, som forelesningene bruker og eksamen forutsetter:
- **Skjermingsfradraget er personlig og aksjevis**: ubenyttet skjerming framføres på den
  enkelte aksjen og *legges til skjermingsgrunnlaget* neste år. Det er dette som gjør
  tredje-års-oppgavene til en felle.
- **Oppjusteringen kan gjøres på grunnlaget eller på satsen** — begge er riktige og skal
  vises som kontroll av hverandre.
- **Gjeld fordeles forholdsmessig etter aktivaenes bruttoverdi** før rabatt, og gjelden
  som er henført til rabatterte aktiva reduseres med samme rabatt — men **ikke** gjelden
  henført til primærbolig.
- **Formuesskatten faller på formuen ved inngangen til året**, så ekvivalent
  avkastningsskatt er τ<sub>w</sub>/r.
- **Effektiv skattesats** = betalt skatt / bruttoinntekt, og for en eier regnes selskapets
  skatt og selskapets overskudd med.

## 5. Lengde og form per kapittel

**Dekning først. Det finnes ingen ordgrense.**

Leseren har ingen lærebok. Utelater et kapittel noe, har han ingen annen kilde, og eksamen
bryr seg ikke om at kapitlet var ryddig. Den bindende betingelsen er fullstendighet mot
kapittelbeskrivelsen i kursplanen: hver mekanisme, hver formel, hvert faktum og hver
spørsmålstype som står der, skal være lært godt nok til å svare på et flervalgsspørsmål
om det — **og til å gjenkjenne det gale alternativet**.

Som en rettesnor lander de fleste kapitlene mellom 1 200 og 2 200 ord, og de tyngste
regnekapitlene (aksjonærmodellen, formuesskatt) mer. Behandle det som beskrivelse, ikke
mål. **Dropp aldri stoff for å treffe et tall.**

Form per kapittel: 4–6 `<h3>`-seksjoner, 2–5 formelblokker, **minst 2 gjennomregnede
eksempler** i regnekapitler, 4–8 bokser, 0–1 figur, 1–2 tabeller.

Seksjonsrytme: kort oppsett → formel → `.callout.mech` som forklarer hvorfor →
gjennomregnede tall. Sjelden mer enn to avsnitt sammenhengende prosa.

### Hva du skal bruke ord på, og hva du skal kutte

Bruk dem på: stegene i et gjennomregnet eksempel, kontrollen som lukker det, mekanismen
bak et resultat, og de navngitte feilene som koster poeng. Det er det flervalg belønner.

Kutt: prosa som gjentar en formel som alt er vist, eksamenskonteksten gjentatt tre steder,
og mekanismebokser som stille har blitt to ideer. Stram skrivingen før du kutter læringen.

## 6. Eksamensforankring — ufravikelig

Hvert kapittel må kobles til den ekte eksamenen. Kurset eksamineres som **flervalg i
Wiseflow, 4 timer, fire alternativer, kalkulator tillatt**, og fra høsten 2026 **med
minuspoeng for feil svar** (3 for rett, −1 for feil; ubesvart 0). Kursansvarlig er
Guttorm Schjelderup, som også lager eksamen; finansdelen lages av Ole-Andreas Næss.

I hvert kapittel: minst én `.callout.tip` som sier konkret hvordan stoffet har vært testet —
med henvisning til reelle eksamenssett (H2025 oppgave 4, H2024 oppgave 6b, og så videre)
slik `docs/fie432-kursplan.md` og `docs/fie432-research/01-eksamens-dna.md` lister dem.
**Ikke dikt opp eksamenshenvisninger.** Kan du ikke peke på et listet spørsmål, si det
generelt.

Flervalg endrer hva undervisningen må gjøre: leseren skal ikke bare kunne regne fram
svaret, men **kjenne igjen hvordan de tre gale alternativene er laget**. Fasitene viser
mønsteret: glemt ubenyttet skjerming; oppjustering utelatt eller gjort to ganger;
gjeld ikke redusert med rabatten, eller redusert også for primærbolig; formuesskatt
regnet av markedsverdi i stedet for formuesverdi; effektiv sats regnet av skattepliktig
i stedet for brutto inntekt. Når du skriver et gjennomregnet eksempel, si hvilke gale
tall en slik feil ville gitt — det er nøyaktig de tallene som står som alternativ B, C og D.

## 7. Nøyaktighet

Hvert tall du skriver vil bli regnet om av en uavhengig kontrollagent. Før du skriver et
gjennomregnet eksempel, **regn det selv** (du har Bash — bruk `python3`). Avrund
konsekvent: satser til to desimaler i prosent, kroner til hele kroner der eksempelet er i
kroner, to desimaler der eksamen ber om det. Feiler en kontroll, rett tallene, ikke
kontrollen.

**Satsene skal være riktige for 2026** der du oppgir dem som dagens regler — hent dem
fra `docs/fie432-research/05-satser-2026.md`, ikke fra hukommelsen. Der forelesningen
bruker et annet tall enn 2026-satsen, si hvilket år tallet gjelder.

## 8. Det du IKKE skal gjøre

- Ikke gjengi tekst fra Døskeland, Sandmo, Bjerksund–Schjelderup eller andre kilder.
  Skriv egne forklaringer. Kartleggingene i `docs/fie432-research/` er egne formuleringer
  og kan brukes fritt.
- Ikke bruk Markdown. Dette er et HTML-fragment.
- Ikke legg inn `<script>`, `<style>`, eksterne bilder eller lenker til eksterne nettsteder.
- Ikke bruk tankestrek som setningsbinder; foretrekk komma, kolon eller ny setning.
- Ikke skriv «I dette kapitlet skal vi …». Start med substansen.
- Ikke ta politisk parti. Forelesningene er polemiske om formuesskatt og media; manualen
  gjengir argumentene **som argumenter** («forelesningens påstand er …», «motargumentet
  er …»), fordi eksamen tester at du kjenner dem, ikke at du er enig.

---

# 9. Lærdommer fra kontrollen — fylles inn etter første bølge

Denne delen skrives etter at bølge 1 er kontrollert, slik som i FIE402-spesifikasjonen.
Inntil da gjelder lærdommene derfra som er overførbare:

## 9.1 Regn alltid begge veier, og vis begge

Oppjustering på grunnlag og på sats gir samme svar. Gjeldsfordeling regnet per aktivum
og som sum gir samme nettoformue. Et eksempel som bare viser én vei, lærer ikke leseren
kontrollen — og kontrollen er det som avslører et galt alternativ på eksamen.

## 9.2 Et tall må stemme med det som står tre linjer under

Mellomresultatene du skriver må summere til totalen du skriver. Skriver du 2 500 000 og
2 000 000 som fradragsberettiget gjeld, skal summen være 4 500 000, ikke «ca. 4,5 mill.».

## 9.3 Si hvilke satser du bruker, hver gang

Eksamen gir satsene i teksten, og de er ofte ikke dagens. Et eksempel som bruker eierskatt
40 % uten å si at det er et eksempeltall, lærer leseren feil regel. Merk **[dagens regel]**
og **[eksempeltall]** eksplisitt i prosa: «med eierskatten 37,84 % (2026)».

## 9.4 Én mekanisme per boks

En `.callout.mech` som forklarer både hvorfor formuesskatten virker som avkastningsskatt
*og* hvorfor rabatten på unoterte aksjer gjør den regressiv, er to bokser.

## 9.5 Aldri en oppdiktet eksamenshenvisning

FIE402-bølge 1 produserte én oppdiktet henvisning blant tjueen ekte, og den var umulig å
skille fra de andre. Bruk bare det kursplanen og eksamens-DNA-et lister.
