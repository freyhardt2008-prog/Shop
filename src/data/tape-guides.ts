import type { TapeGuide } from '@/lib/types';

/**
 * TAPE YOURSELF – Selbstanlagen für typische Körperregionen.
 *
 * WICHTIGER HINWEIS (gilt für alle Anleitungen):
 * Diese Anleitungen sind allgemeine Informationen zur Selbstanwendung von
 * Tapes im Sport- und Alltagskontext. Sie stellen keine Diagnose, keine
 * Therapieempfehlung und keinen Ersatz für eine ärztliche oder
 * physiotherapeutische Behandlung dar. Bei unklaren, starken oder anhaltenden
 * Beschwerden sowie nach Verletzungen: erst abklären lassen, dann tapen.
 *
 * `mediaHint` ist das Briefing für die spätere Bild-/Illustrationsproduktion.
 */
export const tapeGuides: TapeGuide[] = [
  {
    slug: 'sprunggelenk-tapen',
    name: 'Sprunggelenk tapen',
    bodyRegionSlug: 'sprunggelenk',
    teaser: 'Die meistgesuchte Tape-Anlage – Führung für das Sprunggelenk.',
    material: [
      'Kinesiologie-Tape 5 cm breit',
      'optional: Tape-Unterzug',
      'Tape-Schere',
      'optional: Haftspray bei starkem Schwitzen',
    ],
    tapeLength: '2 Streifen à ca. 25 cm, 1 Streifen à ca. 20 cm',
    preparation: [
      'Haut reinigen, trocknen und fettfrei halten.',
      'Starke Behaarung vorher kürzen – das erhöht die Haftung deutlich.',
      'Tape-Enden an den Ecken abrunden, damit sie sich nicht ablösen.',
      'Tape mindestens 20 bis 30 Minuten vor der Belastung anlegen.',
    ],
    startPosition:
      'Setze dich, strecke das Bein aus und halte das Sprunggelenk in neutraler Position (ca. 90 Grad).',
    steps: [
      {
        title: 'Schritt 1 – Erster Zügel außen',
        body: 'Klebe das Tape-Ende ohne Zug an der Fußsohle unterhalb des Außenknöchels an. Führe den Streifen mit leichtem bis mittlerem Zug schräg über den Fußrücken nach innen oben und lege die letzten drei Zentimeter wieder ohne Zug ab.',
        mediaHint: 'Illustration Fuß von vorne, erster Zügel von außen nach innen.',
      },
      {
        title: 'Schritt 2 – Gegenzügel innen',
        body: 'Setze den zweiten Streifen spiegelbildlich an: Start unterhalb des Innenknöchels, mit leichtem Zug über den Fußrücken nach außen oben. Auch hier enden die letzten Zentimeter zugfrei.',
        mediaHint: 'Illustration Fuß von vorne, zweiter Zügel gekreuzt zum ersten.',
      },
      {
        title: 'Schritt 3 – Stabilisierender Anker',
        body: 'Lege den kurzen Streifen ohne Zug quer oberhalb des Sprunggelenks um den Unterschenkel. Er fixiert die Enden der beiden Zügel. Achte darauf, dass dieser Streifen nicht einschnürt – du musst noch bequem einen Finger darunterschieben können.',
        mediaHint: 'Illustration Unterschenkel von vorne mit querem Ankerstreifen.',
      },
      {
        title: 'Schritt 4 – Aktivieren',
        body: 'Reibe alle Streifen kräftig mit der Handfläche an. Die Wärme aktiviert den Kleber. Bewege das Sprunggelenk danach langsam durch und prüfe, ob sich das Tape angenehm anfühlt.',
        mediaHint: 'Hand reibt Tape an, Nahaufnahme.',
      },
    ],
    notes: [
      'Das Tape soll Führung geben, aber nie einschnüren.',
      'Ein leichtes Ziehgefühl ist normal, ein Taubheitsgefühl nicht.',
      'Bei Nässe von außen trocken tupfen statt reiben.',
      'Zum Entfernen in Haarwuchsrichtung und flach abrollen – am besten unter der Dusche.',
    ],
    contraindications: [
      'Offene Wunden, frische Operationsnarben oder Hauterkrankungen im Klebebereich',
      'Bekannte Allergie gegen Acrylatkleber',
      'Unklare Schwellung, starke Schmerzen oder Verdacht auf eine Fraktur – bitte erst ärztlich abklären lassen',
      'Durchblutungs- oder Sensibilitätsstörungen ohne ärztliche Rücksprache',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'sport-tape-rigid', 'tape-schere-profi'],
    difficulty: 'mittel',
    durationMinutes: 8,
  },
  {
    slug: 'achillessehne-tapen',
    name: 'Achillessehne tapen',
    bodyRegionSlug: 'achillessehne',
    teaser: 'Entlastende Anlage entlang des Sehnenverlaufs.',
    material: ['Kinesiologie-Tape 5 cm breit', 'Tape-Schere'],
    tapeLength: '1 Streifen à ca. 30 cm (Y-Form), 1 Streifen à ca. 15 cm',
    preparation: [
      'Haut reinigen und trocknen.',
      'Y-Streifen vorbereiten: einen 30-cm-Streifen mittig bis ca. 8 cm vom Ende einschneiden.',
      'Alle Ecken abrunden.',
      'Anlage in Ruhe und vor der Belastung durchführen.',
    ],
    startPosition:
      'Lege dich auf den Bauch, lasse den Fuß über die Kante hängen und ziehe ihn leicht Richtung Schienbein.',
    steps: [
      {
        title: 'Schritt 1 – Basis an der Ferse',
        body: 'Klebe die ungeschnittene Basis des Y-Streifens ohne Zug an der Fußsohle direkt unter der Ferse an.',
        mediaHint: 'Illustration Fußsohle mit angesetzter Tape-Basis.',
      },
      {
        title: 'Schritt 2 – Zügel entlang der Sehne',
        body: 'Führe die beiden Y-Schenkel mit ganz leichtem Zug links und rechts an der Achillessehne entlang nach oben aus. Die Sehne selbst bleibt zwischen den Streifen frei.',
        mediaHint: 'Illustration Wade von hinten, zwei Zügel beidseits der Achillessehne.',
      },
      {
        title: 'Schritt 3 – Querstreifen',
        body: 'Lege den kurzen Streifen mit mittlerem Zug in der Mitte quer über die Sehne. Die Enden werden zugfrei abgelegt.',
        mediaHint: 'Illustration Querstreifen über Achillessehne.',
      },
      {
        title: 'Schritt 4 – Anreiben und prüfen',
        body: 'Reibe alle Streifen an und gehe anschließend einige Schritte. Das Tape darf sich straff, aber nicht einengend anfühlen.',
        mediaHint: 'Person geht einige Schritte, Tape sichtbar.',
      },
    ],
    notes: [
      'Der Querstreifen darf die Wade nicht ringförmig einschnüren.',
      'Bei Rasur maximal alle paar Tage tapen, um die Haut zu schonen.',
      'Tape nach dem Sport nicht länger als nötig tragen, wenn die Haut gereizt reagiert.',
    ],
    contraindications: [
      'Verdacht auf einen Sehnenriss (plötzlicher stechender Schmerz, Kraftverlust) – sofort ärztlich abklären',
      'Offene oder gereizte Haut im Klebebereich',
      'Bekannte Klebstoffallergie',
      'Akute starke Schwellung',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'achillessehnenbandage-support', 'tape-schere-profi'],
    difficulty: 'mittel',
    durationMinutes: 7,
  },
  {
    slug: 'knie-tapen',
    name: 'Knie tapen',
    bodyRegionSlug: 'knie',
    teaser: 'Allgemeine Anlage für mehr Bewegungsgefühl am Knie.',
    material: ['Kinesiologie-Tape 5 cm breit', 'Tape-Schere'],
    tapeLength: '2 Streifen à ca. 25 cm, 1 Streifen à ca. 12 cm',
    preparation: [
      'Haut reinigen, trocknen und fettfrei halten.',
      'Ecken abrunden.',
      'Knie auf ca. 60 bis 90 Grad beugen – so liegt das Tape später in Bewegung richtig.',
    ],
    startPosition: 'Sitze auf einem Stuhl oder der Behandlungsliege, Knie gebeugt, Fuß steht auf.',
    steps: [
      {
        title: 'Schritt 1 – Erster Zügel seitlich',
        body: 'Setze das Tape-Ende ohne Zug etwa eine Handbreit unterhalb des Knies an der Außenseite an. Führe es mit leichtem Zug seitlich am Kniegelenk vorbei nach oben und ende zugfrei am Oberschenkel.',
        mediaHint: 'Illustration Knie von vorne, seitlicher Zügel außen.',
      },
      {
        title: 'Schritt 2 – Gegenzügel innen',
        body: 'Wiederhole den Vorgang spiegelbildlich an der Innenseite. Beide Streifen umrahmen die Kniescheibe.',
        mediaHint: 'Illustration Knie von vorne, beide Zügel sichtbar.',
      },
      {
        title: 'Schritt 3 – Querstreifen unterhalb der Kniescheibe',
        body: 'Lege den kurzen Streifen mit mittlerem Zug quer unterhalb der Kniescheibe. Enden zugfrei ablegen.',
        mediaHint: 'Illustration Querstreifen unter der Patella.',
      },
      {
        title: 'Schritt 4 – Anreiben und testen',
        body: 'Reibe die Streifen an und beuge und strecke das Knie mehrfach. Das Tape soll die Bewegung begleiten, nicht blockieren.',
        mediaHint: 'Beugung und Streckung mit angelegtem Tape.',
      },
    ],
    notes: [
      'Die Kniekehle bleibt frei – dort schnürt Tape schnell ein.',
      'Bei starker Schwellung oder Blockierung des Knies nicht tapen, sondern abklären lassen.',
      'Vor sportlicher Belastung ausreichend Zeit zum Anhaften einplanen.',
    ],
    contraindications: [
      'Unklare Schwellung, Blockierung oder Instabilität nach einem Unfall',
      'Offene Wunden oder frische Narben',
      'Bekannte Klebstoffallergie',
      'Fieber oder Entzündungszeichen im Gelenkbereich',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'kniebandage-aktiv', 'tape-schere-profi'],
    difficulty: 'mittel',
    durationMinutes: 8,
  },
  {
    slug: 'patella-tapen',
    name: 'Patella tapen',
    bodyRegionSlug: 'knie',
    teaser: 'Gezielte Anlage rund um die Kniescheibe.',
    material: ['Kinesiologie-Tape 5 cm breit', 'Tape-Schere'],
    tapeLength: '1 Streifen à ca. 20 cm (Y-Form), 1 Streifen à ca. 10 cm',
    preparation: [
      'Y-Streifen vorbereiten (mittig einschneiden, ca. 6 cm Basis stehen lassen).',
      'Haut reinigen und trocknen.',
      'Knie gebeugt lagern.',
    ],
    startPosition: 'Sitzend, Knie ca. 70 Grad gebeugt, Fuß steht flach auf dem Boden.',
    steps: [
      {
        title: 'Schritt 1 – Basis unterhalb der Kniescheibe',
        body: 'Klebe die Basis des Y-Streifens ohne Zug unterhalb der Kniescheibe an.',
        mediaHint: 'Illustration Patella mit Y-Basis unterhalb.',
      },
      {
        title: 'Schritt 2 – Kniescheibe umrahmen',
        body: 'Führe die beiden Schenkel mit leichtem Zug links und rechts um die Kniescheibe herum und lege sie oberhalb zugfrei ab.',
        mediaHint: 'Illustration Y-Schenkel umrahmen die Patella.',
      },
      {
        title: 'Schritt 3 – Querstreifen',
        body: 'Setze den kurzen Streifen mit mittlerem Zug quer unter der Kniescheibe an, Enden zugfrei.',
        mediaHint: 'Illustration Querstreifen unter Patella.',
      },
      {
        title: 'Schritt 4 – Anreiben',
        body: 'Reibe das Tape an und teste die Bewegung. Es soll sich unterstützend anfühlen, ohne die Kniescheibe zu verschieben.',
        mediaHint: 'Nahaufnahme angeriebenes Patella-Tape.',
      },
    ],
    notes: [
      'Die Kniescheibe selbst bleibt zwischen den Streifen frei.',
      'Wenn die Anlage drückt, lieber neu anlegen als "durchhalten".',
      'Patellagurte sind eine wiederverwendbare Alternative.',
    ],
    contraindications: [
      'Akute Schwellung oder Ergussbildung im Knie',
      'Instabilität nach Verletzung ohne ärztliche Abklärung',
      'Hautreizungen im Klebebereich',
      'Bekannte Klebstoffallergie',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'kniebandage-aktiv'],
    difficulty: 'anspruchsvoll',
    durationMinutes: 9,
  },
  {
    slug: 'wade-tapen',
    name: 'Wade tapen',
    bodyRegionSlug: 'wade',
    teaser: 'Längsanlage für die Wadenmuskulatur.',
    material: ['Kinesiologie-Tape 5 cm breit', 'Tape-Schere'],
    tapeLength: '1 Streifen à ca. 35 cm (Y-Form)',
    preparation: [
      'Y-Streifen vorbereiten.',
      'Haut reinigen und trocknen.',
      'Wade in leichter Vordehnung positionieren.',
    ],
    startPosition:
      'Stelle dich in einen leichten Ausfallschritt oder lege dich auf den Bauch und ziehe den Fuß Richtung Schienbein.',
    steps: [
      {
        title: 'Schritt 1 – Basis an der Ferse',
        body: 'Klebe die Basis des Y-Streifens ohne Zug oberhalb der Ferse an.',
        mediaHint: 'Illustration Wade von hinten, Basis oberhalb der Ferse.',
      },
      {
        title: 'Schritt 2 – Zügel um die Wadenmuskulatur',
        body: 'Führe die beiden Schenkel mit leichtem Zug links und rechts um die beiden Wadenbäuche herum nach oben.',
        mediaHint: 'Illustration zwei Zügel umrahmen die Wadenmuskulatur.',
      },
      {
        title: 'Schritt 3 – Enden ablegen',
        body: 'Lege die letzten drei bis vier Zentimeter beider Streifen unterhalb der Kniekehle zugfrei ab. Die Kniekehle selbst bleibt frei.',
        mediaHint: 'Illustration Tape-Enden unterhalb der Kniekehle.',
      },
      {
        title: 'Schritt 4 – Anreiben und gehen',
        body: 'Reibe das Tape an und gehe einige Schritte, um die Anlage zu prüfen.',
        mediaHint: 'Person geht, Tape an der Wade sichtbar.',
      },
    ],
    notes: [
      'Nie ringförmig um die Wade kleben.',
      'Bei einseitiger Schwellung, Wärme und Schmerz in der Wade: keine Selbstbehandlung, sondern zeitnah ärztlich abklären lassen.',
    ],
    contraindications: [
      'Verdacht auf eine Thrombose (einseitige Schwellung, Überwärmung, Spannungsschmerz) – umgehend ärztlich abklären',
      'Offene oder gereizte Haut',
      'Bekannte Klebstoffallergie',
      'Frischer Muskelfaserriss ohne ärztliche Abklärung',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'wadenbandage-kompression'],
    difficulty: 'leicht',
    durationMinutes: 6,
  },
  {
    slug: 'oberschenkel-tapen',
    name: 'Oberschenkel tapen',
    bodyRegionSlug: 'oberschenkel',
    teaser: 'Großflächige Anlage für die Oberschenkelmuskulatur.',
    material: ['Kinesiologie-Tape 5 cm breit', 'Tape-Schere'],
    tapeLength: '2 Streifen à ca. 40 cm',
    preparation: [
      'Haut reinigen und trocknen.',
      'Ecken abrunden.',
      'Muskulatur in leichter Vordehnung positionieren.',
    ],
    startPosition:
      'Für die Rückseite: Stand mit leicht vorgebeugtem Oberkörper. Für die Vorderseite: Bauchlage mit angewinkeltem Knie.',
    steps: [
      {
        title: 'Schritt 1 – Erster Längsstreifen',
        body: 'Setze das Tape ohne Zug am unteren Ende der Muskulatur an und führe es mit leichtem Zug längs nach oben.',
        mediaHint: 'Illustration Oberschenkelrückseite mit Längsstreifen.',
      },
      {
        title: 'Schritt 2 – Zweiter Streifen parallel',
        body: 'Klebe den zweiten Streifen leicht versetzt parallel dazu, sodass die Muskulatur flächig abgedeckt ist.',
        mediaHint: 'Illustration zweiter paralleler Streifen.',
      },
      {
        title: 'Schritt 3 – Enden sichern',
        body: 'Lege die letzten Zentimeter beider Streifen zugfrei ab und reibe alles gut an.',
        mediaHint: 'Nahaufnahme Tape-Enden am Oberschenkel.',
      },
    ],
    notes: [
      'Großflächige Anlagen brauchen besonders sauber vorbereitete Haut.',
      'Bei ausgeprägtem Haarwuchs vorher kürzen.',
      'Tape nicht über frische Blutergusszonen kleben.',
    ],
    contraindications: [
      'Frischer Muskelfaserriss ohne ärztliche Abklärung',
      'Ausgedehnter Bluterguss',
      'Offene oder gereizte Haut',
      'Bekannte Klebstoffallergie',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'oberschenkelbandage-kompression'],
    difficulty: 'leicht',
    durationMinutes: 6,
  },
  {
    slug: 'ruecken-tapen',
    name: 'Rücken tapen',
    bodyRegionSlug: 'ruecken',
    teaser: 'Anlage für den unteren Rücken – am besten zu zweit.',
    material: ['Kinesiologie-Tape 5 cm breit', 'Tape-Schere', 'helfende Person'],
    tapeLength: '2 Streifen à ca. 25 cm, 1 Streifen à ca. 15 cm',
    preparation: [
      'Haut reinigen und trocknen.',
      'Ecken abrunden.',
      'Diese Anlage lässt sich allein nur schwer sauber durchführen – plane eine helfende Person ein.',
    ],
    startPosition: 'Stehe aufrecht und beuge dich leicht nach vorne, sodass der untere Rücken vorgedehnt ist.',
    steps: [
      {
        title: 'Schritt 1 – Erster Längsstreifen',
        body: 'Setze den ersten Streifen ohne Zug am Beckenkamm an und führe ihn mit leichtem Zug parallel zur Wirbelsäule nach oben.',
        mediaHint: 'Illustration unterer Rücken, Längsstreifen links der Wirbelsäule.',
      },
      {
        title: 'Schritt 2 – Gegenstück',
        body: 'Klebe den zweiten Streifen spiegelbildlich auf der anderen Seite der Wirbelsäule.',
        mediaHint: 'Illustration beide Längsstreifen.',
      },
      {
        title: 'Schritt 3 – Querstreifen',
        body: 'Lege den kurzen Streifen mit mittlerem Zug quer über die Stelle mit dem stärksten Spannungsgefühl. Enden zugfrei ablegen.',
        mediaHint: 'Illustration Querstreifen im unteren Rücken.',
      },
      {
        title: 'Schritt 4 – Anreiben',
        body: 'Anreiben und anschließend aufrichten. Die Anlage sollte sich beim Bewegen unterstützend anfühlen.',
        mediaHint: 'Person richtet sich auf, Tape sichtbar.',
      },
    ],
    notes: [
      'Direkt über der Wirbelsäule wird nicht geklebt.',
      'Bei Ausstrahlung ins Bein, Taubheitsgefühl oder Kraftverlust nicht tapen, sondern ärztlich abklären lassen.',
    ],
    contraindications: [
      'Ausstrahlende Beschwerden, Taubheitsgefühl oder Kraftverlust im Bein',
      'Unklare, starke oder plötzlich aufgetretene Rückenbeschwerden',
      'Fieber oder Allgemeinsymptome',
      'Hautprobleme im Klebebereich',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'rueckenbandage-stuetz'],
    difficulty: 'mittel',
    durationMinutes: 10,
  },
  {
    slug: 'schulter-tapen',
    name: 'Schulter tapen',
    bodyRegionSlug: 'schulter',
    teaser: 'Anlage für Schulter und Nackenbereich.',
    material: ['Kinesiologie-Tape 5 cm breit', 'Tape-Schere', 'optional: helfende Person'],
    tapeLength: '1 Streifen à ca. 25 cm (Y-Form), 1 Streifen à ca. 20 cm',
    preparation: [
      'Y-Streifen vorbereiten.',
      'Haut reinigen und trocknen.',
      'Schulter locker hängen lassen.',
    ],
    startPosition:
      'Stehe oder sitze aufrecht. Für die Anlage wird der Arm leicht nach vorne oder zur Gegenseite geführt.',
    steps: [
      {
        title: 'Schritt 1 – Basis am Oberarm',
        body: 'Klebe die Basis des Y-Streifens ohne Zug am seitlichen Oberarm unterhalb des Schultergelenks an.',
        mediaHint: 'Illustration Schulter seitlich, Y-Basis am Oberarm.',
      },
      {
        title: 'Schritt 2 – Schulter umrahmen',
        body: 'Führe einen Schenkel mit leichtem Zug über die Vorderseite und den anderen über die Rückseite der Schulter. Beide enden zugfrei.',
        mediaHint: 'Illustration beide Schenkel umrahmen den Deltamuskel.',
      },
      {
        title: 'Schritt 3 – Querstreifen',
        body: 'Lege den zweiten Streifen mit mittlerem Zug quer über den Bereich mit dem stärksten Spannungsgefühl.',
        mediaHint: 'Illustration Querstreifen über der Schulter.',
      },
      {
        title: 'Schritt 4 – Anreiben und bewegen',
        body: 'Reibe alles an und führe den Arm mehrfach langsam nach oben und zur Seite.',
        mediaHint: 'Armbewegung mit angelegtem Tape.',
      },
    ],
    notes: [
      'Die Achselhöhle bleibt frei.',
      'Bei Überkopfsport das Tape vorher im Training testen.',
    ],
    contraindications: [
      'Instabilitätsgefühl nach Schulterluxation ohne ärztliche Abklärung',
      'Akute starke Schmerzen oder Bewegungsunfähigkeit',
      'Hautprobleme im Klebebereich',
      'Bekannte Klebstoffallergie',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'schulterbandage-fuehrung'],
    difficulty: 'mittel',
    durationMinutes: 9,
  },
  {
    slug: 'ellenbogen-tapen',
    name: 'Ellenbogen tapen',
    bodyRegionSlug: 'ellenbogen',
    teaser: 'Entlastende Anlage bei Griff- und Schlagbelastung.',
    material: ['Kinesiologie-Tape 5 cm breit', 'Tape-Schere'],
    tapeLength: '1 Streifen à ca. 25 cm, 1 Streifen à ca. 10 cm',
    preparation: [
      'Haut reinigen und trocknen.',
      'Ecken abrunden.',
      'Arm locker ausstrecken.',
    ],
    startPosition:
      'Strecke den Arm aus und beuge das Handgelenk leicht nach unten, sodass die Unterarmmuskulatur vorgedehnt ist.',
    steps: [
      {
        title: 'Schritt 1 – Längsstreifen über die Unterarmmuskulatur',
        body: 'Setze das Tape ohne Zug am Handgelenk an und führe es mit leichtem Zug über die Unterarmmuskulatur bis oberhalb des Ellenbogens.',
        mediaHint: 'Illustration Unterarm mit Längsstreifen.',
      },
      {
        title: 'Schritt 2 – Querstreifen am Muskelansatz',
        body: 'Lege den kurzen Streifen mit mittlerem Zug quer über den Bereich mit dem stärksten Spannungsgefühl, ohne den Arm ringförmig zu umschließen.',
        mediaHint: 'Illustration Querstreifen am Ellenbogen.',
      },
      {
        title: 'Schritt 3 – Anreiben und testen',
        body: 'Reibe alles an und teste eine typische Griffbewegung.',
        mediaHint: 'Person greift Gegenstand, Tape sichtbar.',
      },
    ],
    notes: [
      'Eine Ellenbogenspange ist die wiederverwendbare Alternative.',
      'Nie zirkulär und straff um den Unterarm kleben.',
    ],
    contraindications: [
      'Taubheitsgefühl oder Kribbeln in der Hand',
      'Starke, anhaltende Beschwerden ohne ärztliche Abklärung',
      'Hautprobleme im Klebebereich',
      'Bekannte Klebstoffallergie',
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'ellenbogenspange-support'],
    difficulty: 'leicht',
    durationMinutes: 5,
  },
  {
    slug: 'handgelenk-tapen',
    name: 'Handgelenk tapen',
    bodyRegionSlug: 'handgelenk',
    teaser: 'Schnelle Anlage für Stütz- und Griffbelastung.',
    material: ['Kinesiologie-Tape 2,5 oder 5 cm breit', 'alternativ: Sport-Tape', 'Tape-Schere'],
    tapeLength: '1 Streifen à ca. 20 cm, 1 Streifen à ca. 12 cm',
    preparation: [
      'Haut reinigen und trocknen.',
      'Schmuck und Uhr ablegen.',
      'Ecken abrunden.',
    ],
    startPosition: 'Halte die Hand in neutraler Position, Finger leicht gespreizt.',
    steps: [
      {
        title: 'Schritt 1 – Längszügel',
        body: 'Setze das Tape ohne Zug am Handrücken an und führe es mit leichtem Zug über das Handgelenk auf den Unterarm.',
        mediaHint: 'Illustration Handrücken mit Längszügel.',
      },
      {
        title: 'Schritt 2 – Querstreifen',
        body: 'Lege den kurzen Streifen locker quer über das Handgelenk. Er darf nicht einschnüren – ein Finger muss bequem darunterpassen.',
        mediaHint: 'Illustration Querstreifen am Handgelenk.',
      },
      {
        title: 'Schritt 3 – Anreiben und prüfen',
        body: 'Reibe das Tape an, balle die Faust und öffne sie wieder. Finger sollen normal durchblutet und beweglich bleiben.',
        mediaHint: 'Faust schließen und öffnen mit Tape.',
      },
    ],
    notes: [
      'Zirkuläre Anlagen immer locker halten.',
      'Bei Kribbeln, Taubheit oder Verfärbung der Finger sofort entfernen.',
    ],
    contraindications: [
      'Verdacht auf Fraktur nach Sturz – sofort ärztlich abklären',
      'Taubheitsgefühl oder Kribbeln in den Fingern',
      'Hautprobleme im Klebebereich',
      'Bekannte Klebstoffallergie',
    ],
    relatedProductSlugs: ['sport-tape-rigid', 'kinesiologie-tape-classic', 'handgelenkbandage-stuetz'],
    difficulty: 'leicht',
    durationMinutes: 5,
  },
];

export const tapeGuideBySlug = new Map(tapeGuides.map((guide) => [guide.slug, guide]));
