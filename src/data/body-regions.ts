import type { BodyRegion } from '@/lib/types';

/**
 * Die 20 Körperregionen des HEAL ACTIVE Körpernavigators ("Wo tut es weh?").
 *
 * `view` steuert, auf welcher Silhouette (Vorder-/Rückansicht) die Region im
 * interaktiven Körpernavigator liegt. Die Geometrie der Klickflächen liegt
 * bewusst in der Komponente (`components/body-map/geometry.ts`), damit die
 * Inhaltsdaten später aus einem CMS kommen können.
 *
 * Formulierungen sind bewusst beschreibend und ohne Diagnosecharakter.
 */
export const bodyRegions: BodyRegion[] = [
  {
    slug: 'kopf-nacken',
    name: 'Kopf & Nacken',
    shortName: 'Nacken',
    group: 'rumpf',
    view: 'front',
    teaser: 'Verspannter Nacken nach langen Schreibtischtagen oder Trainingsphasen.',
    intro:
      'Der Nacken reagiert sensibel auf Haltung, Stress und einseitige Belastung. Mobilisation, Entspannung und kräftigende Übungen für die Schulter-Nacken-Region gehören für viele Sportlerinnen und Sportler zum Alltag.',
    typicalTopics: ['Verspannungsgefühl', 'Beweglichkeit', 'Bildschirmarbeit', 'Regeneration'],
    conditionSlugs: ['nacken-verspannung', 'nacken-mobilitaet'],
    highlightCategorySlugs: ['massage-recovery', 'yoga-mobility', 'ems-tens'],
  },
  {
    slug: 'schulter',
    name: 'Schulter',
    shortName: 'Schulter',
    group: 'obere-extremitaet',
    view: 'front',
    teaser: 'Das beweglichste Gelenk des Körpers – und damit besonders auf Stabilität angewiesen.',
    intro:
      'Die Schulter verbindet sehr große Beweglichkeit mit vergleichsweise wenig knöcherner Führung. Genau deshalb sind Stabilisation, Ansteuerung der Rotatorenmanschette und eine gute Beweglichkeit der Brustwirbelsäule zentrale Themen.',
    typicalTopics: ['Überkopfbelastung', 'Stabilisierung', 'Beweglichkeit', 'Muskelaufbau'],
    conditionSlugs: ['schulter-ueberlastung', 'schulter-beweglichkeit', 'schulter-stabilisierung'],
    highlightCategorySlugs: ['bandagen-support', 'trainingsbaender', 'tapes'],
  },
  {
    slug: 'oberarm',
    name: 'Oberarm',
    shortName: 'Oberarm',
    group: 'obere-extremitaet',
    view: 'front',
    teaser: 'Muskuläre Belastung zwischen Schulter und Ellenbogen.',
    intro:
      'Bizeps und Trizeps arbeiten bei fast jeder Zug- und Druckbewegung mit. Nach intensiven Trainingsphasen stehen Regeneration und dosierter Wiedereinstieg im Vordergrund.',
    typicalTopics: ['Muskelkater', 'Regeneration', 'Kraftaufbau'],
    conditionSlugs: ['oberarm-ueberlastung'],
    highlightCategorySlugs: ['massage-recovery', 'trainingsbaender'],
  },
  {
    slug: 'ellenbogen',
    name: 'Ellenbogen',
    shortName: 'Ellenbogen',
    group: 'obere-extremitaet',
    view: 'front',
    teaser: 'Klassischer Belastungspunkt bei Schlag-, Griff- und Zugsportarten.',
    intro:
      'Der Ellenbogen ist bei Tennis, Padel, Golf, Klettern und Krafttraining stark gefordert. Griffkraft, Unterarmmuskulatur und Belastungssteuerung sind hier die wiederkehrenden Themen.',
    typicalTopics: ['Überlastung', 'Griffbelastung', 'Entlastung', 'Return to Sport'],
    conditionSlugs: ['ellenbogen-ueberlastung'],
    highlightCategorySlugs: ['bandagen-support', 'tapes', 'trainingsbaender'],
  },
  {
    slug: 'unterarm',
    name: 'Unterarm',
    shortName: 'Unterarm',
    group: 'obere-extremitaet',
    view: 'front',
    teaser: 'Griffkraft, Handgelenkstabilität und Feinmotorik haben hier ihren Ursprung.',
    intro:
      'Die Unterarmmuskulatur steuert Hand und Finger. Viele Beschwerden rund um Ellenbogen und Handgelenk haben hier ihren Ausgangspunkt – entsprechend wichtig sind Dehnung, Ansteuerung und Regeneration.',
    typicalTopics: ['Griffkraft', 'Überlastung', 'Regeneration'],
    conditionSlugs: ['unterarm-ueberlastung'],
    highlightCategorySlugs: ['massage-recovery', 'trainingsbaender', 'tapes'],
  },
  {
    slug: 'handgelenk',
    name: 'Handgelenk',
    shortName: 'Handgelenk',
    group: 'obere-extremitaet',
    view: 'front',
    teaser: 'Stützbelastung beim Training, Sturzrisiko im Sport.',
    intro:
      'Ob Liegestütz, Yoga, Handball oder Krafttraining: Das Handgelenk trägt viel Last auf kleiner Fläche. Stabilisierung und dosierter Belastungsaufbau stehen im Mittelpunkt.',
    typicalTopics: ['Stützbelastung', 'Stabilisierung', 'Instabilitätsgefühl'],
    conditionSlugs: ['handgelenk-instabilitaet', 'handgelenk-ueberlastung'],
    highlightCategorySlugs: ['bandagen-support', 'tapes'],
  },
  {
    slug: 'hand-finger',
    name: 'Hand & Finger',
    shortName: 'Hand',
    group: 'obere-extremitaet',
    view: 'front',
    teaser: 'Daumen und Finger – klein, aber im Sport oft entscheidend.',
    intro:
      'Ballsportarten, Klettern und Kampfsport belasten Finger und Daumen punktuell sehr stark. Taping und gezielte Stützprodukte sind hier häufig Thema.',
    typicalTopics: ['Daumenstabilität', 'Fingertaping', 'Griffbelastung'],
    conditionSlugs: ['daumen-stabilitaet', 'finger-belastung'],
    highlightCategorySlugs: ['bandagen-support', 'tapes'],
  },
  {
    slug: 'brustkorb',
    name: 'Brustkorb',
    shortName: 'Brust',
    group: 'rumpf',
    view: 'front',
    teaser: 'Atmung, Brustwirbelsäule und Überkopfbeweglichkeit hängen zusammen.',
    intro:
      'Eine bewegliche Brustwirbelsäule entlastet Nacken und Schulter. Mobility-Tools, Faszienrollen und Atemübungen sind hier die naheliegenden Begleiter.',
    typicalTopics: ['Brustwirbelsäule mobilisieren', 'Atmung', 'Haltung'],
    conditionSlugs: ['brustwirbelsaeule-mobilitaet'],
    highlightCategorySlugs: ['yoga-mobility', 'massage-recovery'],
  },
  {
    slug: 'ruecken',
    name: 'Rücken',
    shortName: 'Rücken',
    group: 'rumpf',
    view: 'back',
    teaser: 'Der häufigste Grund, warum Menschen ihre Bewegung verändern.',
    intro:
      'Rückenthemen sind selten eindimensional: Beweglichkeit, Rumpfkraft, Alltagshaltung und Regeneration spielen zusammen. HEAL ACTIVE bündelt hier Produkte und Übungen, die Bewegung wieder angenehmer machen sollen.',
    typicalTopics: ['Verspannung', 'Rumpfkraft', 'Haltung', 'Beweglichkeit'],
    conditionSlugs: ['ruecken-verspannung', 'ruecken-rumpfkraft'],
    highlightCategorySlugs: ['bandagen-support', 'massage-recovery', 'yoga-mobility'],
  },
  {
    slug: 'lendenwirbelsaeule',
    name: 'Lendenwirbelsäule',
    shortName: 'LWS',
    group: 'rumpf',
    view: 'back',
    teaser: 'Unterer Rücken: Stabilität, Entlastung und dosierte Belastung.',
    intro:
      'Der untere Rücken reagiert auf langes Sitzen, schweres Heben und einseitige Belastung. Rumpfstabilität, Hüftbeweglichkeit und eine gute Belastungsdosierung sind die wiederkehrenden Bausteine.',
    typicalTopics: ['Entlastung', 'Rumpfstabilität', 'Sitzbelastung', 'Heben & Tragen'],
    conditionSlugs: ['lws-entlastung', 'lws-stabilisierung'],
    highlightCategorySlugs: ['bandagen-support', 'trainingsbaender', 'ems-tens'],
  },
  {
    slug: 'huefte',
    name: 'Hüfte',
    shortName: 'Hüfte',
    group: 'untere-extremitaet',
    view: 'front',
    teaser: 'Kraftzentrum zwischen Rumpf und Bein.',
    intro:
      'Die Hüfte überträgt Kraft zwischen Rumpf und Beinen. Beweglichkeit der Hüftbeuger und Kraft der Gesässmuskulatur beeinflussen Knie, Rücken und Laufbild gleichermaßen.',
    typicalTopics: ['Hüftbeuger', 'Gesässmuskulatur', 'Beweglichkeit', 'Laufökonomie'],
    conditionSlugs: ['huefte-beweglichkeit', 'huefte-stabilisierung'],
    highlightCategorySlugs: ['trainingsbaender', 'yoga-mobility', 'massage-recovery'],
  },
  {
    slug: 'leiste',
    name: 'Leiste',
    shortName: 'Leiste',
    group: 'untere-extremitaet',
    view: 'front',
    teaser: 'Adduktoren – im Teamsport besonders gefordert.',
    intro:
      'Richtungswechsel, Schuss- und Sprintbewegungen belasten die Adduktoren stark. Kräftigung und dosierter Wiedereinstieg sind hier die zentralen Themen.',
    typicalTopics: ['Adduktoren', 'Richtungswechsel', 'Return to Sport'],
    conditionSlugs: ['leiste-adduktoren'],
    highlightCategorySlugs: ['trainingsbaender', 'bandagen-support', 'massage-recovery'],
  },
  {
    slug: 'oberschenkel',
    name: 'Oberschenkel',
    shortName: 'Oberschenkel',
    group: 'untere-extremitaet',
    view: 'front',
    teaser: 'Quadrizeps und ischiocrurale Muskulatur – der Motor beim Laufen.',
    intro:
      'Der Oberschenkel liefert Antrieb und Abbremskraft. Nach intensiven Einheiten stehen Regeneration, Dehnfähigkeit und exzentrische Kraft im Mittelpunkt.',
    typicalTopics: ['Muskelbelastung', 'Regeneration', 'Exzentrische Kraft', 'Sprintbelastung'],
    conditionSlugs: ['oberschenkel-muskelbelastung'],
    highlightCategorySlugs: ['massage-recovery', 'bandagen-support', 'trainingsbaender'],
  },
  {
    slug: 'knie',
    name: 'Knie',
    shortName: 'Knie',
    group: 'untere-extremitaet',
    view: 'front',
    teaser: 'Die meistgesuchte Region im Shop – Stabilität, Führung, Rückkehr zum Sport.',
    intro:
      'Das Knie steht zwischen zwei langen Hebeln und lebt von guter muskulärer Führung. Hüfte, Fuß und Rumpf beeinflussen es unmittelbar – deshalb verbindet HEAL ACTIVE Kniethemen immer mit Bein-Achse und Balance.',
    typicalTopics: [
      'Vorderer Knieschmerz',
      'Patella',
      'Instabilitätsgefühl',
      'Meniskusthemen',
      'Return to Sport',
    ],
    conditionSlugs: [
      'knie-vorderer-schmerz',
      'knie-patella',
      'knie-instabilitaet',
      'knie-meniskus',
      'knie-return-to-sport',
    ],
    highlightCategorySlugs: ['bandagen-support', 'trainingsbaender', 'balance-koordination'],
  },
  {
    slug: 'unterschenkel',
    name: 'Unterschenkel',
    shortName: 'Unterschenkel',
    group: 'untere-extremitaet',
    view: 'front',
    teaser: 'Schienbeinkante und Wadenmuskulatur bei Laufbelastung.',
    intro:
      'Beim Laufen wirkt bei jedem Schritt ein Vielfaches des Körpergewichts. Belastungssteuerung, Wadenkraft und Regeneration sind die drei Stellschrauben.',
    typicalTopics: ['Laufbelastung', 'Schienbeinkante', 'Wadenkraft'],
    conditionSlugs: ['unterschenkel-laufbelastung'],
    highlightCategorySlugs: ['massage-recovery', 'bandagen-support', 'balance-koordination'],
  },
  {
    slug: 'wade',
    name: 'Wade',
    shortName: 'Wade',
    group: 'untere-extremitaet',
    view: 'back',
    teaser: 'Wadenkraft ist der Schlüssel für Abdruck und Landung.',
    intro:
      'Die Wadenmuskulatur arbeitet beim Laufen, Springen und Abbremsen auf Hochtouren. Kräftigung, Dehnfähigkeit und Faszienarbeit gehören hier zusammen.',
    typicalTopics: ['Wadenkraft', 'Verhärtung', 'Kompression', 'Regeneration'],
    conditionSlugs: ['wade-verhaertung'],
    highlightCategorySlugs: ['bandagen-support', 'massage-recovery', 'tapes'],
  },
  {
    slug: 'achillessehne',
    name: 'Achillessehne',
    shortName: 'Achilles',
    group: 'untere-extremitaet',
    view: 'back',
    teaser: 'Stark belastbar – aber empfindlich gegenüber schnellen Belastungssprüngen.',
    intro:
      'Die Achillessehne liebt Regelmäßigkeit. Langsam steigende Belastung, exzentrisches Wadentraining und gute Fußmuskulatur sind die Bausteine, mit denen Läuferinnen und Läufer hier typischerweise arbeiten.',
    typicalTopics: [
      'Achillessehnenbeschwerden',
      'Überlastung',
      'Wiedereinstieg ins Lauftraining',
      'Exzentrisches Training',
    ],
    conditionSlugs: [
      'achillessehne-beschwerden',
      'achillessehne-ueberlastung',
      'achillessehne-wiedereinstieg',
    ],
    highlightCategorySlugs: ['bandagen-support', 'balance-koordination', 'tapes'],
  },
  {
    slug: 'sprunggelenk',
    name: 'Sprunggelenk',
    shortName: 'Sprunggelenk',
    group: 'untere-extremitaet',
    view: 'front',
    teaser: 'Umknicken ist die häufigste Sportverletzung überhaupt.',
    intro:
      'Nach einem Umknickereignis bleibt häufig ein Unsicherheitsgefühl zurück. Propriozeption, Balance und Sprunggelenkstabilität sind deshalb der Kern des HEAL ACTIVE Bereichs "Strong Feet – Strong Body".',
    typicalTopics: [
      'Umknickverletzung',
      'Instabilität',
      'Überlastung',
      'Return to Sport',
      'Propriozeption',
    ],
    conditionSlugs: [
      'sprunggelenk-umknickverletzung',
      'sprunggelenk-instabilitaet',
      'sprunggelenk-ueberlastung',
      'sprunggelenk-return-to-sport',
    ],
    highlightCategorySlugs: ['bandagen-support', 'balance-koordination', 'tapes'],
  },
  {
    slug: 'fuss',
    name: 'Fuß',
    shortName: 'Fuß',
    group: 'untere-extremitaet',
    view: 'front',
    teaser: 'Das Fundament: 26 Knochen, die deine gesamte Bewegung tragen.',
    intro:
      'Starke Füße verändern die gesamte Bewegungskette. Sensomotorisches Training auf weichen Matten, Igelbälle und Fußtrainer sind der Einstieg in "Strong Feet – Strong Body".',
    typicalTopics: ['Fußmuskulatur', 'Sensomotorik', 'Fußgewölbe', 'Barfußtraining'],
    conditionSlugs: ['fuss-fussmuskulatur', 'fuss-belastung'],
    highlightCategorySlugs: ['balance-koordination', 'bandagen-support', 'massage-recovery'],
  },
  {
    slug: 'ferse',
    name: 'Ferse',
    shortName: 'Ferse',
    group: 'untere-extremitaet',
    view: 'back',
    teaser: 'Fersenbelastung betrifft Laufende und Stehberufe gleichermaßen.',
    intro:
      'Die Ferse trägt beim Aufsetzen einen Großteil der Last. Entlastung, Fußmuskulatur und Faszienarbeit an der Fußsohle sind hier die häufigsten Ansatzpunkte.',
    typicalTopics: ['Fersenbelastung', 'Fußsohle', 'Entlastung', 'Stehberufe'],
    conditionSlugs: ['ferse-belastung'],
    highlightCategorySlugs: ['massage-recovery', 'balance-koordination', 'bandagen-support'],
  },
];

export const bodyRegionBySlug = new Map(bodyRegions.map((region) => [region.slug, region]));
