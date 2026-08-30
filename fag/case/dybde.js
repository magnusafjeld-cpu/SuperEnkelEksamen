/* ===================== CASETRENING · DYBDETRENING =====================
   Selvrettet trening. Du skriver svaret, avslører fasiten, og markerer selv
   om du kunne det. Rene data — visningen ligger i js/bundle-dybde.js.
   ====================================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.dybde = {
  "struktur": {
    "cats": ["Nedbrytning", "Hypotese", "Casetyper"],
    "lvl": {
      "1": ["Nivå 1", "Definisjoner — si hva det er"],
      "2": ["Nivå 2", "Anvendelse — bruk det på et konkret tilfelle"],
      "3": ["Nivå 3", "Skreddersøm — bygg strukturen fra bunnen"],
      "4": ["Nivå 4", "Under press — gjør det på tid, høyt"]
    },
    "items": [
      { "n": 1, "k": "Nedbrytning", "lvl": 1,
        "s": "Hva betyr MECE, og hvorfor er den andre halvdelen av kravet vanskeligere enn den første?",
        "f": "<b>Mutually Exclusive, Collectively Exhaustive</b> — grenene skal ikke overlappe, og til sammen skal de dekke hele problemet.<br><br>Den første halvdelen er lett å sjekke: legger to grener beslag på det samme? Den andre er vanskelig, for den krever at du vet hva du <i>ikke</i> har tenkt på. Den praktiske testen er å spørre: «hvis alle grenene mine var uendret, kunne resultatet likevel ha falt?» Er svaret ja, mangler du en gren.<br><br>Et profitt-tre er MECE av konstruksjon, fordi det bygger på en identitet: resultat = inntekter − kostnader. Det er derfor identiteter er tryggere utgangspunkt enn temalister." },
      { "n": 2, "k": "Hypotese", "lvl": 2,
        "s": "Du har strukturert en lønnsomhetscase. Intervjueren sier «hvor vil du begynne?». Hva er et sterkt svar, og hva er et svakt?",
        "f": "<b>Svakt:</b> «Jeg vil gjerne se på inntektene først.» Det er en rekkefølge, ikke en hypotese.<br><br><b>Sterkt:</b> «Besøket er oppgitt som flatt, så volumleddet kan jeg utelukke. Da må fallet ligge i pris eller i kostnad per enhet. Jeg vil begynne med de største kostnadspostene, fordi et fall på 30 prosent er for stort til å komme fra en liten post. Hypotesen min er at en variabel kostnad har vokst raskere enn inntekten.»<br><br>Forskjellen: du sier <i>hva du tror</i>, <i>hvorfor</i>, og <i>hva som ville avkreftet det</i>. Det gjør resten av casen til en test av hypotesen i stedet for en rundtur." },
      { "n": 3, "k": "Casetyper", "lvl": 2,
        "s": "Nevn de fem vanligste casetypene, og den ene setningen som fanger hva hver av dem egentlig spør om.",
        "f": "<b>Lønnsomhet:</b> hvilken del av resultatregnskapet har flyttet seg, og hvorfor?<br><b>Markedsinngang:</b> er markedet attraktivt, kan vi vinne i det, og er det verdt det sammenlignet med alternativene?<br><b>M&amp;A:</b> hva er målselskapet verdt for oss — som er noe annet enn hva det er verdt i seg selv?<br><b>Prising:</b> hva er kundens alternativ, og hvor mye av verdien vi skaper kan vi ta?<br><b>Estimering:</b> kan du bygge et forsvarlig tall fra noe du faktisk vet?<br><br>Legg merke til at ingen av dem er et rammeverk. Det er spørsmål — og strukturen skal bygges for å svare på nettopp det spørsmålet." }
    ]
  }
};
