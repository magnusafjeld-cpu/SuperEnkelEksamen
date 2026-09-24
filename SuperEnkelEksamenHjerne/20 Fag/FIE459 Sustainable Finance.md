---
tags: [fag, fie459, innhold]
oppdatert: 2026-09-24
---

# FIE459 Sustainable Finance

Fag nummer fem. Id `fie459`, aksentfarge `#5b7a19` (mosegrønn, valgt så den
skilles fra FIE402s smaragd), logo «SF». **Fagteksten er på engelsk, appen rundt
er norsk**, som i [[FIE402 Corporate Finance]].

**Bevisst kort.** Magnus ba om at faget skulle være «en god del kortere enn de
andre fagene. Raskt igjennom for å ha en grei forståelse for temaene». Manualen er
20 900 ord, mot 81 500 i [[FIE432 Personlig økonomi]], og studieplanen er rundt
15 timer, mot 57.

## Kursfakta

NHH, høsten 2026, foreleser Jiaying Li. Læreboka er Schoenmaker & Schramade
(2019), *Principles of Sustainable Finance* (OUP). Den ligger ikke i kildene.

| | |
|---|---|
| Eksamen, 70 % | 3 timers digital skoleeksamen, **lukket bok**, 16. desember 2026, **flervalg og sant/usant**, på engelsk |
| Gruppeoppgave, 30 % | Fem bærekraftige aksjer i én av fem bransjer, én strategi fra forelesning 8, maks 5 sider, frist 12. november |
| Undervisning | 13 forelesninger i tre deler, seks gjesteforelesninger (ikke tatt opp) |

Foreleserens egne ord styrer stoffet: «The focus of the course is on economic
intuition, not calculation» og «Memorizing definitions is not the best
strategy!». Det finnes **ingen tidligere eksamener**. Derfor ingen
`examWeights`, og syllabusen er brukt aktivt i stedet.

## Hva faget har, og hva det ikke har

| Modul | Innhold |
|---|---|
| Manual | 14 kapitler: k0 kurs og eksamen, k1–k13 én per forelesning. PwC-gjesteforelesningen ligger i k7 |
| Studieplan | 8 moduler i progresjonsmodus, rundt 15 timer, kalibrert med `tools/rekalibrer-plan.py` |
| Quiz | **95 spørsmål: 58 flervalg og 37 sant/usant**, samme format som eksamen. Fasit 15/15/14/14 og 19 sanne/18 usanne |
| Flashcards | 82 skrevne kort i tre kortstokker: begrep, mekanisme, intuisjon |

Ingen dybdetrening, lynlæring, kapitteloppgaver eller eksamenssett. Det holder
faget kort, og quizen har allerede eksamensformatet. Kapitteloppgaver i
flervalgsformat, som i FIE432, er det naturlige neste steget om Magnus vil ha mer
eksamenstrening.

**k10–k13 er foreløpige.** Foilene til forelesning 10–13 (obligasjoner, bank,
forsikring, myndigheter og omstilling) var ikke ute 24. september. Kapitlene er
skrevet fra syllabus og lærebokas tema, holdt til etablerte begreper uten tall, og
merket med en «Provisional chapter»-boks. De skal skrives om når foilene kommer.
Se [[Åpne spørsmål og neste steg]].

## Kildene og hvordan de ble brukt

`FIE459 Sustainable Finance files/` er gitignorert (234 MB, opphavsrett). Teksten
er hentet ut til `_tekst/` inne i mappen. pptx er en zip med XML, så det er gjort
med standardbiblioteket, uten `python-pptx`.

Foilene er tynne på tekst (15 700 ord for ni forelesninger), og **de viktigste
rammeverkene finnes bare som bilder**: S&S-tabellen over finance as usual og
SF 1.0–3.0, integrated value-figuren, Starks' spekter, etikkrammeverkene, TCFD,
taksonomien, strategitabellene og metodeegnethetstabellen. De er lest som bilder
og transkribert inn i `docs/fie459-forfatterspek.md` §5, så agentene skrev etter
kilden og ikke etter hukommelsen.

Business Ethics-PDF-en (Crane & Matten, kap. 3–4) er skannet og har ingen tekst.
Den er ikke OCR-et; forelesning 2 dekker stoffet.

## Hvordan faget ble bygget

1. Lest alle kildene selv og skrevet spesifikasjonen (`docs/fie459-forfatterspek.md`).
2. Fasitposisjonene trukket på forhånd fra en fast seed (fallgruve 7c), også for sant/usant.
3. Fem agenter skrev kapitlene med quiz og kort parallelt, som fragmenter i
   `fag/fie459/_fragmenter/`. Manualen bygges med `tools/fie459-bygg-manual.py`.
4. Alle 14 kapitler og alle 95 spørsmål ble lest og kontrollert mot kildene
   etterpå. Påstandene fra Starks og Hart & Zingales er sjekket ordrett i
   artiklene, og alle regnestykker er regnet om.

**Rett manualen i fragmentene**, ikke i `FIE459_Manual.html` (fallgruve 7x).
Quizen og kortene ble flettet inn fra agentutkast som ikke er tatt vare på, så
`fag/fie459/quiz.js` og flashcard-blokken i `data.js` er nå selve kilden.

## Feil i kursets egne foiler

Agentene og kontrollen fant fire, og manualen lærer det riktige:

- **Alfa-fortegnet** (forelesning 8 foil 67 og 9 foil 20): E(Ra) = Rf + β(E(Rm) − Rf) − α
  gir feil retning. Med α < 0 for et overpriset aktivum havner det *over* SML.
  Manualen forklarer alfa med ord.
- **«Return on assets»** (forelesning 6 foil 35) er egentlig omløpshastighet,
  salg/eiendeler = 0,58. Egen fellerute i k6.
- Aksje Bs volatilitet er merket σ(A) (forelesning 8 foil 4 og 7), og TCFD er
  skrevet «TFCD».
- Giglio et al.: foilen (2025) sier 48/24/22/6 %, mens Starks siterer en eldre
  versjon med 45/25/25/7 %. Manualen bruker foilens tall.

En påstand som så oppdiktet ut, stemte: at PwC-foredraget sluttet med en
rettferdig omstilling («A just transition is our common goal»).

## Kontrollverktøyene fikk to utvidelser

- `tools/sjekk-drill.js` godtar **sant/usant**: nøyaktig to alternativer,
  «True» og «False». Fasitbalansen måles for seg (andel sanne), ellers ville
  2-alternativs-svarene skjevfordelt posisjonsmålingen for flervalg.
- `tools/sjekk-manual.py` respekterer `refSections: {}`: faget har uttrykkelig
  ingen formelsamling, og da gjetter ikke kontrollen seg fram til en. Før pekte
  den ut k1 og varslet om formelkort som appen aldri lager.
