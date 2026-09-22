import type { Condition } from '@/lib/types';

/**
 * BESCHWERDEBILDER
 * ---------------------------------------------------------------------------
 * Redaktionelle Einstiegsthemen je Körperregion. Die Struktur ist bewusst
 * offen gehalten: Neue Themen brauchen nur einen weiteren Eintrag in diesem
 * Array – Routen (`/beschwerden/[slug]`), Navigation, Suche und Produkt-
 * verknüpfung entstehen automatisch.
 *
 * REDAKTIONSREGEL (verbindlich):
 * - keine Heilversprechen
 * - keine Diagnosen
 * - kein Ersatz für ärztliche Untersuchung oder Therapie
 * Alle Texte sind beschreibend formuliert ("häufig Thema ist ...",
 * "viele arbeiten mit ...") statt anweisend ("Sie müssen ...").
 */
export const conditions: Condition[] = [
  /* ---------------------------------------------------------- Kopf & Nacken */
  {
    slug: 'nacken-verspannung',
    name: 'Nackenverspannung',
    regionSlug: 'kopf-nacken',
    teaser: 'Das Ziehen zwischen Schulter und Nacken nach langen Sitztagen.',
    description: [
      'Ein verspannter Nacken gehört zu den häufigsten Gründen, warum Menschen ihre Bewegung im Alltag einschränken. Lange Bildschirmarbeit, wenig Positionswechsel und Stress treffen dabei oft zusammen.',
      'Viele arbeiten mit einer Kombination aus regelmäßigen Positionswechseln, sanfter Mobilisation der Brustwirbelsäule und punktueller Selbstmassage.',
    ],
    focusPoints: [
      'Häufige Positionswechsel statt einer "perfekten" Dauerhaltung',
      'Brustwirbelsäule beweglich halten – sie entlastet den Nacken',
      'Selbstmassage mit Ball oder Massagepistole an gut zugänglichen Stellen',
      'Kräftigung der tiefen Nacken- und Schulterblattmuskulatur',
    ],
    goalSlugs: ['regeneration', 'mobilitaet-verbessern', 'schmerzen-entlastung'],
    sportSlugs: ['radfahren', 'schwimmen', 'krafttraining'],
    purposes: ['regeneration', 'mobilisieren', 'entlasten'],
    exerciseSlugs: ['nacken-mobilisation', 'brustwirbelsaeule-rotation', 'wandrutschen-schulter'],
    tapeGuideSlugs: ['schulter-tapen'],
    faq: [
      {
        question: 'Kann ich bei Nackenverspannung trainieren?',
        answer:
          'Das lässt sich pauschal nicht beantworten und hängt von der Ursache ab. Viele Menschen empfinden moderate Bewegung als angenehm. Bei anhaltenden, starken oder ungewohnten Beschwerden – insbesondere mit Ausstrahlung, Taubheitsgefühl oder nach einem Unfall – ist eine ärztliche Abklärung der richtige erste Schritt.',
      },
    ],
  },
  {
    slug: 'nacken-mobilitaet',
    name: 'Beweglichkeit im Nacken',
    regionSlug: 'kopf-nacken',
    teaser: 'Schulterblick, Überkopfbewegung, Rotation – wieder freier werden.',
    description: [
      'Beweglichkeit im Nacken hängt eng mit der Beweglichkeit der Brustwirbelsäule zusammen. Wenn der Brustkorb steif ist, muss der Nacken die Rotation übernehmen.',
      'Mobility-Routinen setzen deshalb meist eine Etage tiefer an und kombinieren Rotation, Extension und Atmung.',
    ],
    focusPoints: [
      'Rotation aus dem Brustkorb statt nur aus dem Nacken',
      'Kurze, häufige Mobility-Einheiten statt seltener langer Sessions',
      'Faszienrolle längs der Brustwirbelsäule',
      'Atmung bewusst in die Flanken lenken',
    ],
    goalSlugs: ['mobilitaet-verbessern', 'yoga-mobility'],
    sportSlugs: ['golf', 'schwimmen', 'yoga'],
    purposes: ['mobilisieren', 'regeneration'],
    exerciseSlugs: ['nacken-mobilisation', 'brustwirbelsaeule-rotation'],
    tapeGuideSlugs: [],
  },

  /* --------------------------------------------------------------- Schulter */
  {
    slug: 'schulter-ueberlastung',
    name: 'Schulter-Überlastung',
    regionSlug: 'schulter',
    teaser: 'Wenn Überkopfbewegungen plotzlich anstrengender werden.',
    description: [
      'Die Schulter reagiert empfindlich auf schnelle Steigerungen im Trainingsumfang – besonders bei Überkopfsportarten wie Schwimmen, Volleyball oder beim Bankdrücken.',
      'Im Mittelpunkt stehen meist Belastungsdosierung, die Ansteuerung der Rotatorenmanschette und die Beweglichkeit der Brustwirbelsäule.',
    ],
    focusPoints: [
      'Belastung schrittweise steigern statt in Sprüngen',
      'Außenrotatoren regelmäßig ansteuern',
      'Schulterblattkontrolle vor Maximalkraft',
      'Ausreichend Regeneration zwischen intensiven Einheiten',
    ],
    goalSlugs: ['schmerzen-entlastung', 'stabilisieren', 'regeneration'],
    sportSlugs: ['schwimmen', 'krafttraining', 'tennis', 'teamsport'],
    purposes: ['entlasten', 'stabilisieren', 'regeneration', 'aktivieren'],
    exerciseSlugs: ['aussenrotation-theraband', 'wandrutschen-schulter', 'brustwirbelsaeule-rotation'],
    tapeGuideSlugs: ['schulter-tapen'],
  },
  {
    slug: 'schulter-beweglichkeit',
    name: 'Beweglichkeit der Schulter',
    regionSlug: 'schulter',
    teaser: 'Wieder frei nach oben greifen.',
    description: [
      'Eingeschränkte Überkopfbeweglichkeit entsteht selten nur in der Schulter selbst. Brustwirbelsäule, Schulterblatt und Rumpf arbeiten immer mit.',
      'Mobility-Arbeit kombiniert deshalb Dehnung, aktive Ansteuerung und Positionen, die den Brustkorb aufrichten.',
    ],
    focusPoints: [
      'Aktive Beweglichkeit vor passiver Dehnung',
      'Schulterblatt bewusst mitbewegen',
      'Brustwirbelsäule täglich mobilisieren',
      'Stretching-Gurt für kontrollierte Endpositionen',
    ],
    goalSlugs: ['mobilitaet-verbessern', 'yoga-mobility'],
    sportSlugs: ['schwimmen', 'yoga', 'krafttraining'],
    purposes: ['mobilisieren', 'aktivieren'],
    exerciseSlugs: ['wandrutschen-schulter', 'brustwirbelsaeule-rotation', 'aussenrotation-theraband'],
    tapeGuideSlugs: [],
  },
  {
    slug: 'schulter-stabilisierung',
    name: 'Schulter stabilisieren',
    regionSlug: 'schulter',
    teaser: 'Mehr Kontrolle in Wurf-, Schlag- und Stützbewegungen.',
    description: [
      'Weil die Schulter knöchern wenig geführt ist, übernimmt die Muskulatur einen großen Teil der Stabilisierung.',
      'Träger dieser Stabilität sind Rotatorenmanschette, schulterblattführende Muskulatur und eine gute Rumpfspannung.',
    ],
    focusPoints: [
      'Außenrotation mit Band in mehreren Winkeln',
      'Stützpositionen kontrolliert aufbauen',
      'Schulterblattkontrolle in jeder Übung mitdenken',
      'Bandagen oder Tapes können das Körpergefühl unterstützen',
    ],
    goalSlugs: ['stabilisieren', 'muskeln-aktivieren', 'verletzungspraevention'],
    sportSlugs: ['teamsport', 'krafttraining', 'tennis'],
    purposes: ['stabilisieren', 'aktivieren', 'kraeftigen', 'taping'],
    exerciseSlugs: ['aussenrotation-theraband', 'wandrutschen-schulter'],
    tapeGuideSlugs: ['schulter-tapen'],
  },

  /* ---------------------------------------------------------------- Oberarm */
  {
    slug: 'oberarm-ueberlastung',
    name: 'Muskelbelastung im Oberarm',
    regionSlug: 'oberarm',
    teaser: 'Nach intensiven Zug- und Druckeinheiten.',
    description: [
      'Bizeps und Trizeps melden sich nach ungewohnten oder besonders intensiven Einheiten häufig mit Spannungsgefühl.',
      'Regeneration, leichte Bewegung und dosierter Wiedereinstieg sind hier die gängigen Bausteine.',
    ],
    focusPoints: [
      'Leichte Bewegung statt kompletter Pause',
      'Faszienrolle oder Massagepistole in angenehmer Intensität',
      'Belastung beim Wiedereinstieg reduzieren',
      'Schlaf und Ernährung als Teil der Erholung',
    ],
    goalSlugs: ['regeneration', 'kraft-aufbauen'],
    sportSlugs: ['krafttraining', 'fitness', 'schwimmen'],
    purposes: ['regeneration', 'kraeftigen'],
    exerciseSlugs: ['faszienrolle-oberschenkel', 'aussenrotation-theraband'],
    tapeGuideSlugs: [],
  },

  /* -------------------------------------------------------------- Ellenbogen */
  {
    slug: 'ellenbogen-ueberlastung',
    name: 'Ellenbogen-Überlastung',
    regionSlug: 'ellenbogen',
    teaser: 'Das klassische Thema bei Schlag-, Griff- und Zugbelastung.',
    description: [
      'Wiederholte Griff- und Schlagbelastung setzt an den Sehnenansätzen des Ellenbogens an. Tennis, Padel, Klettern, Handwerk und Krafttraining teilen sich dieses Muster.',
      'Viele arbeiten mit Belastungsanpassung, exzentrischem Unterarmtraining und entlastenden Spangen oder Bandagen.',
    ],
    focusPoints: [
      'Griffkraft dosieren – auch im Alltag',
      'Exzentrisches Unterarmtraining mit Band',
      'Ellenbogenspange als punktuelle Entlastung',
      'Schläger-, Griff- und Trainingsgestaltung prüfen',
    ],
    goalSlugs: ['schmerzen-entlastung', 'stabilisieren', 'return-to-sport'],
    sportSlugs: ['tennis', 'padel', 'golf', 'krafttraining'],
    purposes: ['entlasten', 'stabilisieren', 'taping', 'kraeftigen'],
    exerciseSlugs: ['unterarm-exzentrik-band'],
    tapeGuideSlugs: ['ellenbogen-tapen'],
    faq: [
      {
        question: 'Bandage oder Tape am Ellenbogen?',
        answer:
          'Beides wird genutzt und schließt sich nicht aus. Spangen und Bandagen sind schnell angelegt und wiederverwendbar, Tapes lassen sich individueller anpassen. Welche Variante sich angenehmer anfühlt, ist sehr individuell – probiere es in Ruhe aus und lass anhaltende Beschwerden ärztlich abklären.',
      },
    ],
  },

  /* ---------------------------------------------------------------- Unterarm */
  {
    slug: 'unterarm-ueberlastung',
    name: 'Unterarm & Griffkraft',
    regionSlug: 'unterarm',
    teaser: 'Wenn Zugreifen und Halten anstrengender werden.',
    description: [
      'Die Unterarmmuskulatur arbeitet bei jedem Griff mit. Kletternde, Kraftsportlerinnen und Schlagsportler belasten sie besonders häufig.',
      'Dehnung, Selbstmassage und dosierter Kraftaufbau sind die gängigen Bausteine.',
    ],
    focusPoints: [
      'Beugen und Strecken gleichermaßen trainieren',
      'Mini-Faszienrolle für die Unterarmmuskulatur',
      'Griffpausen in langen Belastungen einplanen',
      'Handgelenksposition im Training prüfen',
    ],
    goalSlugs: ['regeneration', 'kraft-aufbauen', 'schmerzen-entlastung'],
    sportSlugs: ['krafttraining', 'tennis', 'padel'],
    purposes: ['regeneration', 'kraeftigen', 'entlasten'],
    exerciseSlugs: ['unterarm-exzentrik-band', 'handgelenk-stuetzbelastung'],
    tapeGuideSlugs: ['ellenbogen-tapen', 'handgelenk-tapen'],
  },

  /* ------------------------------------------------------------- Handgelenk */
  {
    slug: 'handgelenk-instabilitaet',
    name: 'Unsicheres Handgelenk',
    regionSlug: 'handgelenk',
    teaser: 'Wenn Stützbelastung unangenehm wird.',
    description: [
      'Liegestütz, Yoga-Positionen oder Frontkniebeugen bringen das Handgelenk in Endpositionen. Fehlt dort Kraft oder Beweglichkeit, entsteht ein unsicheres Gefühl.',
      'Aufbau erfolgt typischerweise über kurze, häufige Stützbelastungen mit langsam steigender Dauer.',
    ],
    focusPoints: [
      'Stützbelastung in kleinen Dosen steigern',
      'Handgelenksbandage bei hoher Last',
      'Unterarmmuskulatur kräftigen',
      'Alternativgriffe nutzen (Faust, Griffe, Parallettes)',
    ],
    goalSlugs: ['stabilisieren', 'kraft-aufbauen'],
    sportSlugs: ['krafttraining', 'yoga', 'fitness'],
    purposes: ['stabilisieren', 'kraeftigen', 'taping'],
    exerciseSlugs: ['handgelenk-stuetzbelastung', 'unterarm-exzentrik-band'],
    tapeGuideSlugs: ['handgelenk-tapen'],
  },
  {
    slug: 'handgelenk-ueberlastung',
    name: 'Handgelenk-Überlastung',
    regionSlug: 'handgelenk',
    teaser: 'Nach intensiven Trainingsphasen oder viel Mausarbeit.',
    description: [
      'Das Handgelenk verbindet hohe Beweglichkeit mit kleiner Auflagefläche. Wiederholte Belastung summiert sich hier schnell.',
      'Entlastung, Positionsvariation und gezielte Kräftigung gehören typischerweise zusammen.',
    ],
    focusPoints: [
      'Belastungsspitzen über die Woche verteilen',
      'Bandage für besonders belastende Einheiten',
      'Regelmäßige Mobilisation des Handgelenks',
      'Arbeitsplatz und Griffposition prüfen',
    ],
    goalSlugs: ['schmerzen-entlastung', 'regeneration'],
    sportSlugs: ['krafttraining', 'padel', 'yoga'],
    purposes: ['entlasten', 'regeneration', 'taping'],
    exerciseSlugs: ['handgelenk-stuetzbelastung'],
    tapeGuideSlugs: ['handgelenk-tapen'],
  },

  /* ----------------------------------------------------------- Hand & Finger */
  {
    slug: 'daumen-stabilitaet',
    name: 'Daumen stabilisieren',
    regionSlug: 'hand-finger',
    teaser: 'Greifen, halten, stützen – der Daumen macht alles mit.',
    description: [
      'Das Daumensattelgelenk ist an fast jeder Greifbewegung beteiligt. Im Ballsport kommt zusätzlich eine Sturz- und Anprallbelastung dazu.',
      'Stützbandagen und Tape-Anlagen werden häufig genutzt, um dem Gelenk mehr Führung zu geben.',
    ],
    focusPoints: [
      'Daumenbandage für belastende Tätigkeiten',
      'Griffvarianten im Alltag wechseln',
      'Handmuskulatur gezielt ansteuern',
      'Taping bei Sportarten mit Anprallrisiko',
    ],
    goalSlugs: ['stabilisieren', 'selbst-tapen'],
    sportSlugs: ['teamsport', 'krafttraining'],
    purposes: ['stabilisieren', 'taping', 'entlasten'],
    exerciseSlugs: ['handgelenk-stuetzbelastung'],
    tapeGuideSlugs: ['handgelenk-tapen'],
  },
  {
    slug: 'finger-belastung',
    name: 'Fingerbelastung im Sport',
    regionSlug: 'hand-finger',
    teaser: 'Ballsport, Klettern, Kampfsport – kleine Gelenke, große Last.',
    description: [
      'Finger sind im Sport punktuell extrem belastet. Taping ist hier eine verbreitete Methode, um Nachbarfinger zu koppeln oder Gelenke zu führen.',
      'Wichtig ist, dass Tape-Anlagen die Durchblutung nicht einschränken.',
    ],
    focusPoints: [
      'Schmale Tapes für Finger verwenden',
      'Nie zirkulär unter Zug anlegen',
      'Auf Gefühl und Hautfarbe achten',
      'Nach dem Sport wieder abnehmen',
    ],
    goalSlugs: ['selbst-tapen', 'stabilisieren'],
    sportSlugs: ['teamsport'],
    purposes: ['taping', 'stabilisieren'],
    exerciseSlugs: [],
    tapeGuideSlugs: ['handgelenk-tapen'],
  },

  /* -------------------------------------------------------------- Brustkorb */
  {
    slug: 'brustwirbelsaeule-mobilitaet',
    name: 'Brustwirbelsäule mobilisieren',
    regionSlug: 'brustkorb',
    teaser: 'Die Etage, die Nacken und Schulter entlastet.',
    description: [
      'Eine bewegliche Brustwirbelsäule ist die Voraussetzung für freie Überkopfbewegung und entspannte Nackenmuskulatur.',
      'Rotationsübungen, Extension über die Faszienrolle und bewusste Atmung sind die verbreitetsten Werkzeuge.',
    ],
    focusPoints: [
      'Tägliche kurze Mobility-Routine',
      'Faszienrolle quer unter der Brustwirbelsäule',
      'Rotation im Sitz oder Vierfüsslerstand',
      'Atmung in die Flanken lenken',
    ],
    goalSlugs: ['mobilitaet-verbessern', 'yoga-mobility', 'regeneration'],
    sportSlugs: ['golf', 'schwimmen', 'radfahren', 'yoga'],
    purposes: ['mobilisieren', 'regeneration'],
    exerciseSlugs: ['brustwirbelsaeule-rotation', 'wandrutschen-schulter'],
    tapeGuideSlugs: [],
  },

  /* ----------------------------------------------------------------- Rücken */
  {
    slug: 'ruecken-verspannung',
    name: 'Rückenverspannung',
    regionSlug: 'ruecken',
    teaser: 'Das häufigste Bewegungsthema überhaupt.',
    description: [
      'Rückenbeschwerden sind selten auf eine einzelne Ursache zurückzuführen. Bewegungsarmut, einseitige Belastung und Stress spielen häufig zusammen.',
      'Was vielen hilft: in Bewegung bleiben, Positionen wechseln und den Rumpf regelmäßig fordern.',
    ],
    focusPoints: [
      'Bewegung dosieren statt vermeiden',
      'Faszienrolle und Massageball für die Rückenmuskulatur',
      'Rumpfkraft regelmäßig trainieren',
      'Hüftbeweglichkeit mitdenken',
    ],
    goalSlugs: ['schmerzen-entlastung', 'regeneration', 'mobilitaet-verbessern'],
    sportSlugs: ['fitness', 'yoga', 'walking'],
    purposes: ['entlasten', 'regeneration', 'mobilisieren'],
    exerciseSlugs: ['dead-bug', 'unterarmstuetz-plank', 'brustwirbelsaeule-rotation'],
    tapeGuideSlugs: ['ruecken-tapen'],
    faq: [
      {
        question: 'Wann sollte ich mit Rückenbeschwerden ärztlichen Rat suchen?',
        answer:
          'Unter anderem bei starken oder anhaltenden Beschwerden, bei Ausstrahlung ins Bein, Taubheitsgefühl, Kraftverlust, Fieber oder nach einem Unfall. HEAL ACTIVE ersetzt keine ärztliche Untersuchung und stellt keine Diagnosen.',
      },
    ],
  },
  {
    slug: 'ruecken-rumpfkraft',
    name: 'Rumpfkraft aufbauen',
    regionSlug: 'ruecken',
    teaser: 'Stabilität aus der Mitte statt Anspannung im Nacken.',
    description: [
      'Rumpfkraft bedeutet nicht nur Bauchmuskeln: Rücken-, Bauch-, Zwerchfell- und Hüftmuskulatur arbeiten als System.',
      'Übungen wie Dead Bug, Unterarmstütz und einbeiniges Bridging kombinieren Kontrolle mit Kraft.',
    ],
    focusPoints: [
      'Qualität vor Wiederholungszahl',
      'Atmung während der Übung nicht anhalten',
      'Progression über Hebel statt über Zeit',
      'Zwei- bis dreimal wöchentlich einplanen',
    ],
    goalSlugs: ['kraft-aufbauen', 'stabilisieren', 'zu-hause-trainieren'],
    sportSlugs: ['fitness', 'krafttraining', 'laufen'],
    purposes: ['kraeftigen', 'stabilisieren', 'heimtraining'],
    exerciseSlugs: ['dead-bug', 'unterarmstuetz-plank', 'bridging-einbeinig'],
    tapeGuideSlugs: [],
  },

  /* ------------------------------------------------------ Lendenwirbelsäule */
  {
    slug: 'lws-entlastung',
    name: 'Unteren Rücken entlasten',
    regionSlug: 'lendenwirbelsaeule',
    teaser: 'Sitzen, Heben, Tragen – und was danach hilft.',
    description: [
      'Der untere Rücken trägt viel. Wer lange sitzt oder schwer hebt, kennt das Gefühl von Druck und Steifigkeit.',
      'Stützgürtel, Wärme und Entlastungspositionen werden häufig genutzt – ergänzt durch Bewegung und Rumpftraining.',
    ],
    focusPoints: [
      'Positionswechsel alle 30 bis 45 Minuten',
      'Rückenbandage gezielt für belastende Tätigkeiten',
      'Hüftbeuger mobilisieren',
      'Hebetechnik überdenken',
    ],
    goalSlugs: ['schmerzen-entlastung', 'stabilisieren'],
    sportSlugs: ['radfahren', 'krafttraining', 'golf'],
    purposes: ['entlasten', 'stabilisieren', 'regeneration'],
    exerciseSlugs: ['dead-bug', 'huefte-mobilisation-ausfallschritt', 'bridging-einbeinig'],
    tapeGuideSlugs: ['ruecken-tapen'],
  },
  {
    slug: 'lws-stabilisierung',
    name: 'LWS stabilisieren',
    regionSlug: 'lendenwirbelsaeule',
    teaser: 'Kontrolle in Alltagsbewegungen zurückgewinnen.',
    description: [
      'Stabilität im unteren Rücken entsteht aus dem Zusammenspiel von Rumpf, Hüfte und Atmung.',
      'Übungen mit langem Hebel und ruhiger Atmung fordern genau dieses Zusammenspiel.',
    ],
    focusPoints: [
      'Neutralposition halten statt maximal anspannen',
      'Einbeinige Übungen fordern die Stabilität zusätzlich',
      'Gesässmuskulatur gezielt ansteuern',
      'EMS/TENS nur nach Anleitung und Kontraindikationsprüfung',
    ],
    goalSlugs: ['stabilisieren', 'kraft-aufbauen', 'muskeln-aktivieren'],
    sportSlugs: ['fitness', 'krafttraining', 'ski'],
    purposes: ['stabilisieren', 'kraeftigen', 'aktivieren'],
    exerciseSlugs: ['dead-bug', 'bridging-einbeinig', 'unterarmstuetz-plank'],
    tapeGuideSlugs: ['ruecken-tapen'],
  },

  /* ------------------------------------------------------------------ Hüfte */
  {
    slug: 'huefte-beweglichkeit',
    name: 'Hüftbeweglichkeit',
    regionSlug: 'huefte',
    teaser: 'Wer viel sitzt, kennt den steifen Hüftbeuger.',
    description: [
      'Die Hüfte verliert Beweglichkeit vor allem durch fehlende Nutzung. Langes Sitzen hält den Hüftbeuger dauerhaft verkürzt positioniert.',
      'Ausfallschritt-Mobilisation, aktive Endpositionen und Rollen der Oberschenkelmuskulatur sind typische Bausteine.',
    ],
    focusPoints: [
      'Endpositionen aktiv halten statt nur passiv dehnen',
      'Täglich kurze Mobility-Einheiten',
      'Gesässmuskulatur ansteuern',
      'Sitzposition regelmäßig wechseln',
    ],
    goalSlugs: ['mobilitaet-verbessern', 'yoga-mobility'],
    sportSlugs: ['laufen', 'radfahren', 'yoga', 'fussball'],
    purposes: ['mobilisieren', 'regeneration'],
    exerciseSlugs: ['huefte-mobilisation-ausfallschritt', 'faszienrolle-oberschenkel'],
    tapeGuideSlugs: [],
  },
  {
    slug: 'huefte-stabilisierung',
    name: 'Hüfte stabilisieren',
    regionSlug: 'huefte',
    teaser: 'Die Gesässmuskulatur schützt Knie und Rücken gleichermaßen.',
    description: [
      'Eine stabile Hüfte hält die Beinachse zusammen. Fällt das Becken beim Einbeinstand ab, wirkt sich das direkt auf Knie und unteren Rücken aus.',
      'Minibands, einbeiniges Bridging und Seitwärtsschritte sind die Klassiker im Hüftstabilitätstraining.',
    ],
    focusPoints: [
      'Becken beim Einbeinstand waagerecht halten',
      'Miniband oberhalb der Knie positionieren',
      'Zwei- bis dreimal wöchentlich trainieren',
      'Bewegungsqualität vor Widerstand',
    ],
    goalSlugs: ['stabilisieren', 'verletzungspraevention', 'kraft-aufbauen'],
    sportSlugs: ['laufen', 'fussball', 'ski', 'wandern'],
    purposes: ['stabilisieren', 'kraeftigen', 'aktivieren', 'praevention'],
    exerciseSlugs: ['seitliches-gehen-miniband', 'bridging-einbeinig', 'kniebeuge-mit-miniband'],
    tapeGuideSlugs: [],
  },

  /* ------------------------------------------------------------------ Leiste */
  {
    slug: 'leiste-adduktoren',
    name: 'Adduktoren & Leiste',
    regionSlug: 'leiste',
    teaser: 'Richtungswechsel, Schuss, Sprint – die Leiste hält dagegen.',
    description: [
      'Adduktorenbeschwerden treten besonders in Sportarten mit schnellen Richtungswechseln auf.',
      'Kräftigung in verschiedenen Hüftwinkeln und ein schrittweiser Wiedereinstieg in sportartspezifische Belastung sind die gängigen Bausteine.',
    ],
    focusPoints: [
      'Adduktoren isometrisch und dynamisch kräftigen',
      'Sprint- und Richtungswechselbelastung dosiert steigern',
      'Hüftbeweglichkeit parallel mitentwickeln',
      'Auf Seitenunterschiede achten',
    ],
    goalSlugs: ['kraft-aufbauen', 'return-to-sport', 'verletzungspraevention'],
    sportSlugs: ['fussball', 'teamsport', 'ski'],
    purposes: ['kraeftigen', 'return-to-sport', 'praevention'],
    exerciseSlugs: ['adduktoren-squeeze', 'huefte-mobilisation-ausfallschritt'],
    tapeGuideSlugs: ['oberschenkel-tapen'],
  },

  /* ------------------------------------------------------------ Oberschenkel */
  {
    slug: 'oberschenkel-muskelbelastung',
    name: 'Muskelbelastung im Oberschenkel',
    regionSlug: 'oberschenkel',
    teaser: 'Sprint, Bergablaufen, Sprungtraining – der Oberschenkel bremst mit.',
    description: [
      'Die ischiocrurale Muskulatur arbeitet beim schnellen Laufen stark exzentrisch. Der Quadrizeps bremst beim Bergablaufen und bei Landungen.',
      'Exzentrische Kräftigung und gute Regeneration sind hier die zentralen Themen.',
    ],
    focusPoints: [
      'Exzentrische Übungen langsam steigern',
      'Faszienrolle nach intensiven Einheiten',
      'Kompression zur Unterstützung des Belastungsgefühls',
      'Sprintbelastung mit Vorlauf aufbauen',
    ],
    goalSlugs: ['regeneration', 'kraft-aufbauen', 'return-to-sport'],
    sportSlugs: ['laufen', 'fussball', 'teamsport', 'ski'],
    purposes: ['regeneration', 'kraeftigen', 'entlasten', 'return-to-sport'],
    exerciseSlugs: ['faszienrolle-oberschenkel', 'bridging-einbeinig', 'sprungtraining-landung'],
    tapeGuideSlugs: ['oberschenkel-tapen'],
  },

  /* -------------------------------------------------------------------- Knie */
  {
    slug: 'knie-vorderer-schmerz',
    name: 'Vorderer Knieschmerz',
    regionSlug: 'knie',
    teaser: 'Treppe, Bergablaufen, langes Sitzen – typische Situationen.',
    description: [
      'Beschwerden an der Kniescheibenvorderseite gehören zu den häufigsten Themen im Sport. Belastungsdosierung, Beinachse und Hüftkraft stehen meist im Mittelpunkt.',
      'Viele arbeiten mit einer Kombination aus Trainingsanpassung, Kräftigung der Hüfte und Übungen zur Beinachsenkontrolle.',
    ],
    focusPoints: [
      'Belastung reduzieren, nicht komplett pausieren',
      'Hüft- und Gesässmuskulatur kräftigen',
      'Beinachse in Kniebeuge und Step-down kontrollieren',
      'Kniebandage kann das Bewegungsgefühl unterstützen',
    ],
    goalSlugs: ['schmerzen-entlastung', 'stabilisieren', 'return-to-sport'],
    sportSlugs: ['laufen', 'wandern', 'radfahren', 'fitness'],
    purposes: ['entlasten', 'stabilisieren', 'kraeftigen', 'taping'],
    exerciseSlugs: ['beinachsentraining-step-down', 'seitliches-gehen-miniband', 'kniebeuge-mit-miniband'],
    tapeGuideSlugs: ['knie-tapen', 'patella-tapen'],
    faq: [
      {
        question: 'Hilft eine Kniebandage bei vorderem Knieschmerz?',
        answer:
          'Viele Menschen empfinden Kompression und Führung als angenehm. Eine Bandage ersetzt jedoch kein Training und keine ärztliche Abklärung. Wenn Beschwerden länger anhalten, zunehmen oder das Knie blockiert oder anschwillt, ist eine ärztliche Untersuchung der richtige Weg.',
      },
    ],
  },
  {
    slug: 'knie-patella',
    name: 'Patellabeschwerden',
    regionSlug: 'knie',
    teaser: 'Die Kniescheibe braucht eine saubere Führung.',
    description: [
      'Die Kniescheibe gleitet in einer knöchernen Rinne. Muskuläre Führung, Beinachse und Belastungshöhe bestimmen, wie angenehm sich das anfühlt.',
      'Patellagurte, Bandagen mit Aussparung und Taping werden häufig als unterstützende Maßnahmen eingesetzt.',
    ],
    focusPoints: [
      'Oberschenkelmuskulatur dosiert kräftigen',
      'Sprung- und Landetechnik überprüfen',
      'Patellagurt oder Bandage ausprobieren',
      'Trainingsumfänge schrittweise steigern',
    ],
    goalSlugs: ['stabilisieren', 'schmerzen-entlastung', 'selbst-tapen'],
    sportSlugs: ['laufen', 'teamsport', 'fitness'],
    purposes: ['stabilisieren', 'entlasten', 'taping'],
    exerciseSlugs: ['beinachsentraining-step-down', 'kniebeuge-mit-miniband'],
    tapeGuideSlugs: ['patella-tapen', 'knie-tapen'],
  },
  {
    slug: 'knie-instabilitaet',
    name: 'Instabilitätsgefühl im Knie',
    regionSlug: 'knie',
    teaser: 'Wenn das Knie sich nicht mehr verlässlich anfühlt.',
    description: [
      'Ein unsicheres Kniegefühl kann verschiedene Ursachen haben und gehört ärztlich abgeklärt – besonders nach einem Verletzungsereignis.',
      'Begleitend arbeiten viele mit Stabilisationstraining, Balanceübungen und führenden Bandagen.',
    ],
    focusPoints: [
      'Ärztliche Abklärung bei Instabilität nach Verletzung',
      'Propriozeptives Training auf instabiler Unterlage',
      'Bandage mit seitlicher Führung',
      'Beinachsenkontrolle unter Ermüdung üben',
    ],
    goalSlugs: ['stabilisieren', 'balance-verbessern', 'return-to-sport'],
    sportSlugs: ['fussball', 'ski', 'teamsport'],
    purposes: ['stabilisieren', 'balance', 'koordination', 'taping'],
    exerciseSlugs: ['einbeinstand-balance-pad', 'beinachsentraining-step-down', 'sprungtraining-landung'],
    tapeGuideSlugs: ['knie-tapen'],
  },
  {
    slug: 'knie-meniskus',
    name: 'Meniskusthemen',
    regionSlug: 'knie',
    teaser: 'Belastung dosieren und Bewegung erhalten.',
    description: [
      'Meniskusbeschwerden sind ein häufiges Thema in Dreh- und Beugebelastungen. Sie gehören immer ärztlich abgeklärt.',
      'Begleitend stehen Belastungssteuerung, Kräftigung der Oberschenkelmuskulatur und schrittweise Rückkehr zu Drehbewegungen im Mittelpunkt.',
    ],
    focusPoints: [
      'Ärztliche Abklärung vor dem Trainingsaufbau',
      'Tiefe Beugung unter Last zunächst begrenzen',
      'Muskuläre Führung des Knies aufbauen',
      'Drehbelastung kontrolliert wieder einführen',
    ],
    goalSlugs: ['schmerzen-entlastung', 'stabilisieren', 'return-to-sport'],
    sportSlugs: ['fussball', 'ski', 'wandern'],
    purposes: ['entlasten', 'stabilisieren', 'return-to-sport'],
    exerciseSlugs: ['beinachsentraining-step-down', 'einbeinstand-balance-pad'],
    tapeGuideSlugs: ['knie-tapen'],
  },
  {
    slug: 'knie-return-to-sport',
    name: 'Knie: Return to Sport',
    regionSlug: 'knie',
    teaser: 'Vom Reha-Ende zurück ins echte Training.',
    description: [
      'Zwischen "beschwerdefrei im Alltag" und "wieder voll im Sport" liegt oft eine lange Strecke. Sprung-, Lande- und Richtungswechselbelastung müssen dabei systematisch aufgebaut werden.',
      'Unsere BACK TO SPORT Programme zeigen, wie sich Produkte, Übungen und Belastungsaufbau sinnvoll kombinieren lassen.',
    ],
    focusPoints: [
      'Seitenvergleich als Orientierung nutzen',
      'Sprung- und Landetechnik vor Sprintbelastung',
      'Belastung in Wochenschritten steigern',
      'Betreuung durch Fachpersonal einbeziehen',
    ],
    goalSlugs: ['return-to-sport', 'balance-verbessern', 'kraft-aufbauen'],
    sportSlugs: ['fussball', 'laufen', 'ski', 'teamsport'],
    purposes: ['return-to-sport', 'balance', 'kraeftigen', 'koordination'],
    exerciseSlugs: ['sprungtraining-landung', 'beinachsentraining-step-down', 'einbeinstand-balance-pad'],
    tapeGuideSlugs: ['knie-tapen'],
  },

  /* ----------------------------------------------------------- Unterschenkel */
  {
    slug: 'unterschenkel-laufbelastung',
    name: 'Schienbein & Laufbelastung',
    regionSlug: 'unterschenkel',
    teaser: 'Wenn die Schienbeinkante beim Laufeinstieg meckert.',
    description: [
      'Beschwerden an der Schienbeinkante treten häufig beim schnellen Aufbau von Laufumfängen auf – besonders auf hartem Untergrund.',
      'Belastungssteuerung, Schrittfrequenz, Schuhwerk und Wadenkraft sind die gängigen Ansatzpunkte.',
    ],
    focusPoints: [
      'Umfang pro Woche nur moderat steigern',
      'Untergrund variieren',
      'Wadenkraft und Fußmuskulatur aufbauen',
      'Faszienrolle für die Unterschenkelmuskulatur',
    ],
    goalSlugs: ['schmerzen-entlastung', 'regeneration', 'return-to-sport'],
    sportSlugs: ['laufen', 'teamsport', 'walking'],
    purposes: ['entlasten', 'regeneration', 'kraeftigen'],
    exerciseSlugs: ['wadenheben-exzentrisch', 'zehenspreizen-fussgewoelbe'],
    tapeGuideSlugs: ['wade-tapen'],
  },

  /* -------------------------------------------------------------------- Wade */
  {
    slug: 'wade-verhaertung',
    name: 'Wadenverhärtung',
    regionSlug: 'wade',
    teaser: 'Das Ziehen nach intensiven Lauf- oder Sprungeinheiten.',
    description: [
      'Die Wadenmuskulatur arbeitet bei jedem Schritt. Nach intensiven Einheiten bleibt häufig ein Spannungsgefühl zurück.',
      'Selbstmassage, Dehnung und ausreichende Flüssigkeitszufuhr sind die gängigen Bausteine.',
    ],
    focusPoints: [
      'Faszienrolle oder Massagepistole in angenehmer Intensität',
      'Wadenkraft exzentrisch aufbauen',
      'Kompression bei langen Belastungen',
      'Sprunggelenksbeweglichkeit prüfen',
    ],
    goalSlugs: ['regeneration', 'schmerzen-entlastung'],
    sportSlugs: ['laufen', 'fussball', 'wandern', 'teamsport'],
    purposes: ['regeneration', 'entlasten', 'taping'],
    exerciseSlugs: ['wadenmassage-massagepistole', 'wadenheben-exzentrisch'],
    tapeGuideSlugs: ['wade-tapen'],
  },

  /* ------------------------------------------------------------ Achillessehne */
  {
    slug: 'achillessehne-beschwerden',
    name: 'Achillessehnenbeschwerden',
    regionSlug: 'achillessehne',
    teaser: 'Steifes Gefühl am Morgen, Wärmegefühl nach dem Laufen.',
    description: [
      'Die Achillessehne reagiert auf Belastungssprünge. Typisch ist ein steifes Gefühl nach Ruhephasen, das sich mit Bewegung verändert.',
      'Ein schrittweiser, planbarer Belastungsaufbau mit exzentrischem Wadentraining ist der am besten etablierte Weg – idealerweise fachlich begleitet.',
    ],
    focusPoints: [
      'Belastung reduzieren, aber Bewegung beibehalten',
      'Exzentrisches Wadenheben über Wochen aufbauen',
      'Fersenkeil oder Bandage zur Entlastung ausprobieren',
      'Fachliche Begleitung bei längerem Verlauf',
    ],
    goalSlugs: ['schmerzen-entlastung', 'return-to-sport', 'regeneration'],
    sportSlugs: ['laufen', 'teamsport', 'fussball'],
    purposes: ['entlasten', 'return-to-sport', 'kraeftigen', 'taping'],
    exerciseSlugs: ['wadenheben-exzentrisch', 'einbeinstand-balance-pad', 'zehenspreizen-fussgewoelbe'],
    tapeGuideSlugs: ['achillessehne-tapen'],
    faq: [
      {
        question: 'Darf ich mit Achillessehnenbeschwerden weiterlaufen?',
        answer:
          'Das lässt sich nur individuell beurteilen und gehört in fachliche Hände. Viele reduzieren zunächst Umfang und Intensität, statt komplett zu pausieren. Bei plötzlichem, stechendem Schmerz oder Kraftverlust ist eine sofortige ärztliche Abklärung notwendig.',
      },
    ],
  },
  {
    slug: 'achillessehne-ueberlastung',
    name: 'Achillessehne: Überlastung',
    regionSlug: 'achillessehne',
    teaser: 'Zu schnell zu viel – der häufigste Auslöser.',
    description: [
      'Steigerungen im Trainingsumfang, neue Schuhe, mehr Tempotraining oder häufigeres Bergauflaufen sind typische Auslöser für Überlastungsgefühle.',
      'Ein Belastungsprotokoll hilft vielen, Zusammenhänge zu erkennen.',
    ],
    focusPoints: [
      'Nur eine Trainingsvariable gleichzeitig verändern',
      'Wadenkraft als Grundlage aufbauen',
      'Regenerationstage bewusst einplanen',
      'Schuhwechsel schrittweise vollziehen',
    ],
    goalSlugs: ['schmerzen-entlastung', 'verletzungspraevention'],
    sportSlugs: ['laufen', 'walking', 'teamsport'],
    purposes: ['entlasten', 'praevention', 'regeneration'],
    exerciseSlugs: ['wadenheben-exzentrisch', 'wadenmassage-massagepistole'],
    tapeGuideSlugs: ['achillessehne-tapen'],
  },
  {
    slug: 'achillessehne-wiedereinstieg',
    name: 'Wiedereinstieg ins Lauftraining',
    regionSlug: 'achillessehne',
    teaser: 'Struktur schlägt Ungeduld.',
    description: [
      'Der Wiedereinstieg gelingt meist über Geh-Lauf-Intervalle, regelmäßige Wadenkräfteinheiten und klare Steigerungsregeln.',
      'Unser Programm BACK TO RUNNING zeigt eine mögliche Struktur – als Orientierung, nicht als Therapieplan.',
    ],
    focusPoints: [
      'Geh-Lauf-Intervalle als Einstieg',
      'Zwei Krafteinheiten für die Wade pro Woche',
      'Belastung um maximal etwa zehn Prozent pro Woche steigern',
      'Reaktion am Folgetag als Orientierung nutzen',
    ],
    goalSlugs: ['return-to-sport', 'kraft-aufbauen'],
    sportSlugs: ['laufen'],
    purposes: ['return-to-sport', 'kraeftigen', 'balance'],
    exerciseSlugs: ['wadenheben-exzentrisch', 'einbeinstand-balance-pad', 'sprungtraining-landung'],
    tapeGuideSlugs: ['achillessehne-tapen'],
  },

  /* ------------------------------------------------------------ Sprunggelenk */
  {
    slug: 'sprunggelenk-umknickverletzung',
    name: 'Umknickverletzung',
    regionSlug: 'sprunggelenk',
    teaser: 'Die häufigste Sportverletzung – und die am häufigsten unterschätzte.',
    description: [
      'Nach einem Umknickereignis gehört das Sprunggelenk ärztlich abgeklärt. Danach folgt in der Regel ein strukturierter Aufbau aus Beweglichkeit, Kraft und Propriozeption.',
      'Gerade der letzte Baustein wird häufig zu früh beendet – genau deshalb hat HEAL ACTIVE den Bereich Balance & Koordination so prominent aufgebaut.',
    ],
    focusPoints: [
      'Ärztliche Abklärung nach dem Ereignis',
      'Frühzeitig Beweglichkeit und Belastung aufbauen',
      'Propriozeptives Training über mehrere Wochen fortführen',
      'Bandage oder Tape für die Rückkehr in den Sport',
    ],
    goalSlugs: ['stabilisieren', 'balance-verbessern', 'return-to-sport'],
    sportSlugs: ['fussball', 'teamsport', 'laufen', 'wandern'],
    purposes: ['stabilisieren', 'balance', 'koordination', 'taping', 'return-to-sport'],
    exerciseSlugs: ['einbeinstand-balance-pad', 'wackelbrett-kreisen', 'sprungtraining-landung'],
    tapeGuideSlugs: ['sprunggelenk-tapen'],
    faq: [
      {
        question: 'Wie lange sollte ich nach dem Umknicken Balance trainieren?',
        answer:
          'In der Praxis wird propriozeptives Training häufig über mehrere Wochen bis Monate fortgeführt, auch wenn keine Beschwerden mehr bestehen. Die individuelle Dauer besprichst du am besten mit der Person, die dich betreut.',
      },
    ],
  },
  {
    slug: 'sprunggelenk-instabilitaet',
    name: 'Instabiles Sprunggelenk',
    regionSlug: 'sprunggelenk',
    teaser: 'Das Gefühl, dem eigenen Fuß nicht zu vertrauen.',
    description: [
      'Nach wiederholtem Umknicken bleibt oft ein Unsicherheitsgefühl auf unebenem Untergrund zurück.',
      'Training auf instabilen Unterlagen, Kräftigung der Peronealmuskulatur und stabilisierende Bandagen werden hier häufig kombiniert.',
    ],
    focusPoints: [
      'Einbeinstand täglich üben – auch beim Zähneputzen',
      'Untergrund progressiv instabiler gestalten',
      'Peronealmuskulatur mit Band kräftigen',
      'Bandage für Sport auf unebenem Gelände',
    ],
    goalSlugs: ['stabilisieren', 'balance-verbessern', 'verletzungspraevention'],
    sportSlugs: ['fussball', 'teamsport', 'wandern', 'laufen'],
    purposes: ['stabilisieren', 'balance', 'koordination', 'praevention'],
    exerciseSlugs: ['einbeinstand-balance-pad', 'wackelbrett-kreisen', 'zehenspreizen-fussgewoelbe'],
    tapeGuideSlugs: ['sprunggelenk-tapen'],
  },
  {
    slug: 'sprunggelenk-ueberlastung',
    name: 'Sprunggelenk: Überlastung',
    regionSlug: 'sprunggelenk',
    teaser: 'Viel Sprung- und Landebelastung summiert sich.',
    description: [
      'Hallensportarten und Sprungtraining belasten das Sprunggelenk intensiv. Ein Spannungs- oder Druckgefühl nach intensiven Wochen ist ein häufiges Thema.',
      'Belastungssteuerung, Beweglichkeit und Regeneration bilden hier die Basis.',
    ],
    focusPoints: [
      'Sprungbelastung über die Woche verteilen',
      'Sprunggelenksbeweglichkeit regelmäßig prüfen',
      'Fußmuskulatur kräftigen',
      'Recovery-Tools nach intensiven Einheiten',
    ],
    goalSlugs: ['regeneration', 'schmerzen-entlastung', 'verletzungspraevention'],
    sportSlugs: ['teamsport', 'fussball', 'fitness'],
    purposes: ['regeneration', 'entlasten', 'praevention'],
    exerciseSlugs: ['wackelbrett-kreisen', 'igelball-fusssohle', 'wadenheben-exzentrisch'],
    tapeGuideSlugs: ['sprunggelenk-tapen'],
  },
  {
    slug: 'sprunggelenk-return-to-sport',
    name: 'Sprunggelenk: Return to Sport',
    regionSlug: 'sprunggelenk',
    teaser: 'Von der Balanceübung zurück auf den Platz.',
    description: [
      'Der Übergang zurück in den Sport braucht sportartspezifische Belastung: Sprung, Landung, Richtungswechsel und Reaktion auf äußere Reize.',
      'Balanceprodukte bilden dabei die Zwischenstufe zwischen kontrolliertem Training und offener Spielsituation.',
    ],
    focusPoints: [
      'Von stabil zu instabil, von langsam zu schnell',
      'Landungen beidbeinig vor einbeinig',
      'Reaktive Aufgaben ergänzen',
      'Bandage oder Tape für die ersten Wettkampfeinheiten',
    ],
    goalSlugs: ['return-to-sport', 'balance-verbessern', 'koordination-trainieren'],
    sportSlugs: ['fussball', 'teamsport', 'laufen'],
    purposes: ['return-to-sport', 'balance', 'koordination', 'taping'],
    exerciseSlugs: ['sprungtraining-landung', 'wackelbrett-kreisen', 'einbeinstand-balance-pad'],
    tapeGuideSlugs: ['sprunggelenk-tapen'],
  },

  /* -------------------------------------------------------------------- Fuß */
  {
    slug: 'fuss-fussmuskulatur',
    name: 'Fußmuskulatur aufbauen',
    regionSlug: 'fuss',
    teaser: 'Strong Feet – Strong Body. Hier fängt alles an.',
    description: [
      'Die kleinen Fußmuskeln tragen das Gewölbe und liefern Informationen über den Untergrund. In festen Schuhen kommen sie selten zum Einsatz.',
      'Zehenübungen, Barfußzeiten und weiche Sensomotorikmatten sind der Einstieg in ein Training, das die gesamte Beinachse beeinflusst.',
    ],
    focusPoints: [
      'Täglich wenige Minuten sind wirksamer als seltene lange Einheiten',
      'Zehen einzeln ansteuern lernen',
      'Barfußzeiten zu Hause ausdehnen',
      'Weiche instabile Unterlagen als Steigerung',
    ],
    goalSlugs: ['koordination-trainieren', 'balance-verbessern', 'verletzungspraevention'],
    sportSlugs: ['laufen', 'fussball', 'wandern', 'yoga'],
    purposes: ['koordination', 'balance', 'kraeftigen', 'praevention'],
    exerciseSlugs: ['zehenspreizen-fussgewoelbe', 'igelball-fusssohle', 'einbeinstand-balance-pad'],
    tapeGuideSlugs: [],
  },
  {
    slug: 'fuss-belastung',
    name: 'Fußbelastung im Alltag',
    regionSlug: 'fuss',
    teaser: 'Stehberufe, lange Wege, harter Untergrund.',
    description: [
      'Wer viel steht oder geht, belastet den Fuß über Stunden gleichmäßig. Ein Druck- oder Ermüdungsgefühl am Abend ist dabei häufig.',
      'Selbstmassage der Fußsohle, Fußtraining und Entlastungsphasen sind die gängigen Bausteine.',
    ],
    focusPoints: [
      'Igelball für die Fußsohle am Abend',
      'Schuhwerk und Einlagensituation prüfen',
      'Fußmuskulatur regelmäßig ansteuern',
      'Beine gelegentlich hochlegen',
    ],
    goalSlugs: ['regeneration', 'schmerzen-entlastung'],
    sportSlugs: ['walking', 'wandern'],
    purposes: ['regeneration', 'entlasten', 'koordination'],
    exerciseSlugs: ['igelball-fusssohle', 'zehenspreizen-fussgewoelbe'],
    tapeGuideSlugs: [],
  },

  /* ------------------------------------------------------------------- Ferse */
  {
    slug: 'ferse-belastung',
    name: 'Fersenbelastung',
    regionSlug: 'ferse',
    teaser: 'Die ersten Schritte am Morgen erzählen viel.',
    description: [
      'Fersenbeschwerden betreffen Laufende und Menschen in Stehberufen gleichermaßen. Ein typisches Muster ist ein unangenehmes Gefühl bei den ersten Schritten nach Ruhephasen.',
      'Entlastung, Faszienarbeit an der Fußsohle und Kräftigung der Fußmuskulatur werden häufig kombiniert – eine ärztliche Abklärung ist bei längerem Verlauf sinnvoll.',
    ],
    focusPoints: [
      'Fußsohle sanft mit Ball ausrollen',
      'Wadenmuskulatur dehnen und kräftigen',
      'Stehbelastung über den Tag verteilen',
      'Schuhwerk mit ausreichender Dämpfung prüfen',
    ],
    goalSlugs: ['schmerzen-entlastung', 'regeneration'],
    sportSlugs: ['laufen', 'walking', 'wandern'],
    purposes: ['entlasten', 'regeneration', 'koordination'],
    exerciseSlugs: ['igelball-fusssohle', 'wadenheben-exzentrisch', 'zehenspreizen-fussgewoelbe'],
    tapeGuideSlugs: [],
  },
];

export const conditionBySlug = new Map(conditions.map((condition) => [condition.slug, condition]));
