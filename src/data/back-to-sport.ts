import type { BackToSportProgram } from '@/lib/types';

/**
 * BACK TO SPORT – redaktionelle Programme.
 *
 * Kombinieren Information, Übungen, Produkte und eine Checkliste zu einem
 * nachvollziehbaren Weg zurück in die jeweilige Sportart.
 *
 * WICHTIG: Diese Programme sind allgemeine Orientierung, kein Therapieplan.
 * Sie ersetzen keine ärztliche Untersuchung, keine Diagnose und keine
 * individuelle Betreuung durch Fachpersonal.
 */
export const backToSportPrograms: BackToSportProgram[] = [
  {
    slug: 'back-to-running',
    name: 'BACK TO RUNNING',
    sportSlug: 'laufen',
    claim: 'Vom ersten Gehen bis zum ersten richtigen Lauf.',
    intro: [
      'Der Wiedereinstieg ins Laufen scheitert selten am Willen – sondern an zu schnellen Steigerungen. Laufen bedeutet, dieselbe Bewegung tausendfach zu wiederholen. Genau deshalb reagiert der Körper so empfindlich auf Sprünge im Umfang.',
      'Dieses Programm zeigt eine mögliche Struktur in vier Phasen. Wie schnell du die Phasen durchläufst, hängt von deiner Ausgangssituation ab – im Zweifel gemeinsam mit der Person besprechen, die dich betreut.',
    ],
    phases: [
      {
        name: 'Phase 1 – Fundament',
        focus: 'Fuß, Sprunggelenk und Wade belastbar machen',
        description:
          'Bevor du läufst, sollte der Einbeinstand ruhig gelingen und Wadenheben ohne Probleme möglich sein. Zwei bis drei kurze Einheiten pro Woche reichen aus.',
        exerciseSlugs: ['einbeinstand-balance-pad', 'wadenheben-exzentrisch', 'zehenspreizen-fussgewoelbe'],
        productSlugs: ['balance-pad-sensomotorik', 'igelball-sensorik', 'sensomotorikmatte-weich'],
      },
      {
        name: 'Phase 2 – Geh-Lauf-Intervalle',
        focus: 'Belastung in kleinen Portionen einführen',
        description:
          'Starte mit Intervallen wie 1 Minute laufen, 2 Minuten gehen. Wichtig ist die Reaktion am Folgetag: Fühlt sich alles unverändert an, kann der Laufanteil in der nächsten Woche leicht steigen.',
        exerciseSlugs: ['wadenheben-exzentrisch', 'seitliches-gehen-miniband'],
        productSlugs: ['achillessehnenbandage-support', 'miniband-set-textil', 'kinesiologie-tape-classic'],
      },
      {
        name: 'Phase 3 – Kraft & Beinachse',
        focus: 'Hüfte und Knie für längere Strecken vorbereiten',
        description:
          'Mit steigendem Umfang wird Rumpf- und Hüftkraft wichtiger. Step-downs und einbeiniges Bridging sind die Standardbausteine.',
        exerciseSlugs: ['beinachsentraining-step-down', 'bridging-einbeinig', 'dead-bug'],
        productSlugs: ['miniband-set-textil', 'trainingsmatte-komfort', 'kniebandage-aktiv'],
      },
      {
        name: 'Phase 4 – Tempo & Gelände',
        focus: 'Intensität und Untergrund variieren',
        description:
          'Erst wenn ruhige Dauerläufe problemlos gelingen, kommen Tempowechsel, Anstiege und unebener Untergrund dazu – jeweils einzeln eingeführt.',
        exerciseSlugs: ['sprungtraining-landung', 'wackelbrett-kreisen', 'faszienrolle-oberschenkel'],
        productSlugs: ['wackelbrett-holz', 'faszienrolle-standard', 'massagepistole-pro'],
      },
    ],
    checklist: [
      'Einbeinstand 30 Sekunden ruhig möglich',
      '3 x 15 Wadenheben einbeinig ohne Nachwirkungen',
      'Gehen über 45 Minuten beschwerdefrei',
      'Kein verändertes Gefühl am Tag nach der Belastung',
      'Steigerung des Wochenumfangs um maximal etwa zehn Prozent',
    ],
    relatedRegionSlugs: ['achillessehne', 'wade', 'knie', 'fuss', 'sprunggelenk'],
  },
  {
    slug: 'back-to-tennis',
    name: 'BACK TO TENNIS',
    sportSlug: 'tennis',
    claim: 'Schlagbelastung schrittweise wieder aufbauen.',
    intro: [
      'Tennis kombiniert Schlagbelastung für Arm und Schulter mit schnellen Antritten und Stopps für die Beine. Ein Wiedereinstieg, der nur den Arm betrachtet, greift zu kurz.',
      'Dieses Programm baut beides parallel auf – mit klarem Fokus auf Griffkraft, Schulterstabilität und Beinarbeit.',
    ],
    phases: [
      {
        name: 'Phase 1 – Griff & Unterarm',
        focus: 'Belastbarkeit von Unterarm und Ellenbogen',
        description:
          'Exzentrisches Handgelenkstrecken und dosierte Griffbelastung bilden die Basis. Zwei bis drei Einheiten pro Woche über mehrere Wochen.',
        exerciseSlugs: ['unterarm-exzentrik-band', 'handgelenk-stuetzbelastung'],
        productSlugs: ['theraband-uebungsband', 'ellenbogenspange-support', 'mini-faszienrolle'],
      },
      {
        name: 'Phase 2 – Schulter & Rumpf',
        focus: 'Stabilität für den Schlag',
        description:
          'Außenrotation, Wall Slides und Rumpfübungen bereiten Aufschlag und Überkopfschlag vor.',
        exerciseSlugs: ['aussenrotation-theraband', 'wandrutschen-schulter', 'unterarmstuetz-plank'],
        productSlugs: ['theraband-uebungsband', 'schulterbandage-fuehrung', 'trainingsmatte-komfort'],
      },
      {
        name: 'Phase 3 – Beinarbeit',
        focus: 'Antritt, Stopp, Richtungswechsel',
        description:
          'Seitwärtsschritte, Landetechnik und Balanceaufgaben bereiten auf die Platzbelastung vor.',
        exerciseSlugs: ['seitliches-gehen-miniband', 'sprungtraining-landung', 'einbeinstand-balance-pad'],
        productSlugs: ['miniband-set-textil', 'balance-pad-sensomotorik', 'sprunggelenkbandage-stabil'],
      },
      {
        name: 'Phase 4 – Zurück auf den Platz',
        focus: 'Sportartspezifische Belastung',
        description:
          'Beginne mit kurzen, lockeren Einheiten ohne Aufschlag. Aufschlag und Tempo kommen zuletzt dazu.',
        exerciseSlugs: ['aussenrotation-theraband', 'unterarm-exzentrik-band'],
        productSlugs: ['ellenbogenspange-support', 'kinesiologie-tape-classic', 'massagepistole-pro'],
      },
    ],
    checklist: [
      'Griffbelastung im Alltag unauffällig',
      'Außenrotation mit Band 3 x 15 beidseits möglich',
      'Seitwärtsbewegungen ohne Unsicherheitsgefühl',
      'Erste Einheit ohne Aufschlag gut vertragen',
    ],
    relatedRegionSlugs: ['ellenbogen', 'schulter', 'handgelenk', 'sprunggelenk'],
  },
  {
    slug: 'back-to-football',
    name: 'BACK TO FOOTBALL',
    sportSlug: 'fussball',
    claim: 'Richtungswechsel, Zweikampf, Sprint – in dieser Reihenfolge.',
    intro: [
      'Fußball verlangt Sprints, abrupte Stopps und Zweikämpfe. Der Übergang vom Reha-Training zurück in die Mannschaft ist der kritischste Abschnitt.',
      'Dieses Programm strukturiert diesen Übergang in vier Phasen – mit besonderem Fokus auf Sprunggelenk, Knie und Adduktoren.',
    ],
    phases: [
      {
        name: 'Phase 1 – Stabilität',
        focus: 'Sprunggelenk und Knie kontrollieren',
        description:
          'Propriozeptives Training auf instabiler Unterlage sowie Beinachsenkontrolle bilden die Grundlage.',
        exerciseSlugs: ['einbeinstand-balance-pad', 'wackelbrett-kreisen', 'beinachsentraining-step-down'],
        productSlugs: ['balance-pad-sensomotorik', 'wackelbrett-holz', 'sprunggelenkbandage-stabil'],
      },
      {
        name: 'Phase 2 – Kraft',
        focus: 'Hüfte, Adduktoren und Oberschenkel',
        description:
          'Adduktoren-Squeeze, Bridging und Kniebeugen mit Band bereiten die Muskulatur auf Zweikampfbelastung vor.',
        exerciseSlugs: ['adduktoren-squeeze', 'bridging-einbeinig', 'kniebeuge-mit-miniband'],
        productSlugs: ['miniband-set-textil', 'pezziball-gymnastik', 'trainingsband-set-3'],
      },
      {
        name: 'Phase 3 – Sprung & Landung',
        focus: 'Reaktive Belastung einführen',
        description:
          'Beidbeinige Landungen vor einbeinigen, gerade Sprungrichtung vor Richtungswechsel.',
        exerciseSlugs: ['sprungtraining-landung', 'wackelbrett-kreisen'],
        productSlugs: ['balance-halbball-trainer', 'kniebandage-aktiv', 'sprunggelenkbandage-stabil'],
      },
      {
        name: 'Phase 4 – Zurück ins Team',
        focus: 'Sportartspezifische Belastung',
        description:
          'Erst Individualtraining mit Ball, dann Teiltraining, dann Vollbelastung. Zwischen den Stufen jeweils mindestens eine gut vertragene Woche.',
        exerciseSlugs: ['sprungtraining-landung', 'seitliches-gehen-miniband'],
        productSlugs: ['sprunggelenkbandage-stabil', 'kinesiologie-tape-classic', 'massagepistole-pro'],
      },
    ],
    checklist: [
      'Einbeiniges Landen sicher und leise',
      'Sprint auf 80 Prozent ohne Unsicherheitsgefühl',
      'Richtungswechsel beidseits gleichwertig',
      'Seitenunterschied in Kraft und Balance deutlich reduziert',
    ],
    relatedRegionSlugs: ['sprunggelenk', 'knie', 'leiste', 'oberschenkel'],
  },
  {
    slug: 'back-to-fitness',
    name: 'BACK TO FITNESS',
    sportSlug: 'fitness',
    claim: 'Zurück ins Studio – mit Technik statt Gewicht.',
    intro: [
      'Nach einer Trainingspause ist die Versuchung groß, dort weiterzumachen, wo man aufgehört hat. Genau das führt häufig zu Rückschlägen.',
      'Dieses Programm setzt auf Bewegungsqualität, Ansteuerung und einen planbaren Lastaufbau.',
    ],
    phases: [
      {
        name: 'Phase 1 – Ansteuerung',
        focus: 'Muskulatur wieder aktivieren',
        description:
          'Minibands, Rumpfübungen und Mobility bringen den Körper zurück in die Bewegungsmuster.',
        exerciseSlugs: ['seitliches-gehen-miniband', 'dead-bug', 'huefte-mobilisation-ausfallschritt'],
        productSlugs: ['miniband-set-textil', 'trainingsmatte-komfort', 'yogamatte-grip'],
      },
      {
        name: 'Phase 2 – Technik',
        focus: 'Grundmuster mit wenig Last',
        description:
          'Kniebeuge, Hüftstreckung und Stützpositionen mit geringer Belastung und hoher Wiederholungsqualität.',
        exerciseSlugs: ['kniebeuge-mit-miniband', 'bridging-einbeinig', 'handgelenk-stuetzbelastung'],
        productSlugs: ['trainingsband-set-3', 'handgelenkbandage-stuetz', 'trainingsmatte-komfort'],
      },
      {
        name: 'Phase 3 – Last',
        focus: 'Gewicht planbar steigern',
        description:
          'Steigere zuerst die Wiederholungszahl, dann das Gewicht. Nur eine Variable pro Woche verändern.',
        exerciseSlugs: ['unterarmstuetz-plank', 'kniebeuge-mit-miniband', 'aussenrotation-theraband'],
        productSlugs: ['theraband-uebungsband', 'handgelenkbandage-stuetz', 'kniebandage-aktiv'],
      },
      {
        name: 'Phase 4 – Regeneration einplanen',
        focus: 'Erholung als Trainingsbestandteil',
        description:
          'Faszienrolle, Massagepistole und Mobility-Routinen halten die Frequenz langfristig durch.',
        exerciseSlugs: ['faszienrolle-oberschenkel', 'brustwirbelsaeule-rotation', 'nacken-mobilisation'],
        productSlugs: ['faszienrolle-standard', 'massagepistole-pro', 'massageball-duo'],
      },
    ],
    checklist: [
      'Grundübungen technisch sauber bei moderater Last',
      'Keine anhaltenden Nachwirkungen am Folgetag',
      'Mindestens eine Mobility-Einheit pro Woche etabliert',
      'Trainingsplan mit klarer Steigerungslogik vorhanden',
    ],
    relatedRegionSlugs: ['schulter', 'knie', 'lendenwirbelsaeule', 'handgelenk'],
  },
  {
    slug: 'back-to-swimming',
    name: 'BACK TO SWIMMING',
    sportSlug: 'schwimmen',
    claim: 'Überkopfbewegung braucht Beweglichkeit und Stabilität.',
    intro: [
      'Schwimmen ist gelenkschonend – aber für die Schulter sehr repetitiv. Ein Wiedereinstieg profitiert davon, wenn Beweglichkeit und Stabilität vorher an Land aufgebaut werden.',
      'Dieses Programm kombiniert Mobility der Brustwirbelsäule mit Schulterstabilität und einem schrittweisen Umfangsaufbau im Wasser.',
    ],
    phases: [
      {
        name: 'Phase 1 – Mobilität an Land',
        focus: 'Brustwirbelsäule und Schulter öffnen',
        description:
          'Rotation und Wall Slides bereiten die Überkopfposition vor.',
        exerciseSlugs: ['brustwirbelsaeule-rotation', 'wandrutschen-schulter', 'nacken-mobilisation'],
        productSlugs: ['faszienrolle-standard', 'yogamatte-grip', 'stretching-gurt'],
      },
      {
        name: 'Phase 2 – Schulterstabilität',
        focus: 'Rotatorenmanschette ansteuern',
        description:
          'Außenrotation mit Band in mehreren Winkeln, zwei- bis dreimal pro Woche.',
        exerciseSlugs: ['aussenrotation-theraband', 'unterarmstuetz-plank'],
        productSlugs: ['theraband-uebungsband', 'trainingsband-set-3', 'schulterbandage-fuehrung'],
      },
      {
        name: 'Phase 3 – Wassereinstieg',
        focus: 'Kurze Einheiten, technikorientiert',
        description:
          'Beginne mit kurzen Serien und Technikübungen. Beinarbeit und Wechselzug lassen sich gut einzeln dosieren.',
        exerciseSlugs: ['wandrutschen-schulter', 'brustwirbelsaeule-rotation'],
        productSlugs: ['stretching-gurt', 'trinkflasche-sport', 'funktionsshirt-active'],
      },
      {
        name: 'Phase 4 – Umfang aufbauen',
        focus: 'Distanz vor Intensität',
        description:
          'Steigere zunächst die Gesamtstrecke, erst danach Tempoanteile und Paddles.',
        exerciseSlugs: ['aussenrotation-theraband', 'nacken-mobilisation'],
        productSlugs: ['massagepistole-pro', 'massageball-duo', 'kinesiologie-tape-classic'],
      },
    ],
    checklist: [
      'Überkopfbewegung an Land frei und beschwerdefrei',
      'Außenrotation mit Band ohne Ausweichbewegung',
      'Erste Wassereinheiten gut vertragen',
      'Kein Spannungsgefühl im Nacken nach dem Training',
    ],
    relatedRegionSlugs: ['schulter', 'brustkorb', 'kopf-nacken'],
  },
];

export const backToSportBySlug = new Map(backToSportPrograms.map((p) => [p.slug, p]));
