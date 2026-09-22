import type { Category } from '@/lib/types';

/**
 * Produktkategorien des Shops.
 *
 * `filterKeys` definiert, welche Filter in einer Kategorie überhaupt
 * angeboten werden ("intelligente Filter"). Die Filterleiste blendet
 * zusätzlich dynamisch alle Filter aus, die im aktuellen Ergebnis keine
 * sinnvolle Auswahl bieten (weniger als zwei Ausprägungen).
 */
export const categories: Category[] = [
  {
    slug: 'bandagen-support',
    name: 'Bandagen & Support',
    tagline: 'Führung und Entlastung für jedes Gelenk',
    description:
      'Von der Fußbandage bis zur Schulterorthese: Produkte, die Gelenke führen, Kompression geben und dir ein sicheres Bewegungsgefühl zurückgeben sollen.',
    icon: 'shield',
    order: 1,
    filterKeys: ['bodyRegion', 'size', 'gender', 'purpose', 'sport', 'brand', 'price', 'material'],
    subcategories: [
      { slug: 'fuss', name: 'Fuß', teaser: 'Bandagen für Mittelfuß und Fußgewölbe.', bodyRegionSlug: 'fuss' },
      { slug: 'sprunggelenk', name: 'Sprunggelenk', teaser: 'Stabilisierung nach Umknickereignissen und im Sport.', bodyRegionSlug: 'sprunggelenk' },
      { slug: 'achillessehne', name: 'Achillessehne', teaser: 'Entlastung und Kompression im Sehnenverlauf.', bodyRegionSlug: 'achillessehne' },
      { slug: 'wade', name: 'Wade', teaser: 'Kompression für Belastung und Regeneration.', bodyRegionSlug: 'wade' },
      { slug: 'knie', name: 'Knie', teaser: 'Von leichter Kompression bis zur geführten Schiene.', bodyRegionSlug: 'knie' },
      { slug: 'oberschenkel', name: 'Oberschenkel', teaser: 'Kompression für die große Muskulatur.', bodyRegionSlug: 'oberschenkel' },
      { slug: 'huefte', name: 'Hüfte', teaser: 'Stützung und Wärme im Hüftbereich.', bodyRegionSlug: 'huefte' },
      { slug: 'ruecken', name: 'Rücken', teaser: 'Rückenbandagen und Stützgürtel.', bodyRegionSlug: 'ruecken' },
      { slug: 'schulter', name: 'Schulter', teaser: 'Führung für das beweglichste Gelenk.', bodyRegionSlug: 'schulter' },
      { slug: 'ellenbogen', name: 'Ellenbogen', teaser: 'Spangen und Bandagen bei Schlag- und Griffbelastung.', bodyRegionSlug: 'ellenbogen' },
      { slug: 'unterarm', name: 'Unterarm', teaser: 'Kompression und Entlastung der Unterarmmuskulatur.', bodyRegionSlug: 'unterarm' },
      { slug: 'handgelenk', name: 'Handgelenk', teaser: 'Stützbandagen für Training und Alltag.', bodyRegionSlug: 'handgelenk' },
      { slug: 'daumen', name: 'Daumen', teaser: 'Stabilisierung des Daumensattelgelenks.', bodyRegionSlug: 'hand-finger' },
      { slug: 'finger', name: 'Finger', teaser: 'Schienen, Schlaufen und Fingertapes.', bodyRegionSlug: 'hand-finger' },
    ],
  },
  {
    slug: 'tapes',
    name: 'Tapes',
    tagline: 'Kinesiologie, Sporttape und alles drumherum',
    description:
      'Tapes für Stabilisierung, Entlastung und Körperwahrnehmung – inklusive Zubehör, Scheren und Hautschutz. Passend dazu: unsere TAPE YOURSELF Anleitungen.',
    icon: 'tape',
    order: 2,
    filterKeys: ['bodyRegion', 'color', 'purpose', 'sport', 'brand', 'price', 'material'],
    subcategories: [
      { slug: 'kinesiologie-tapes', name: 'Kinesiologie-Tapes', teaser: 'Elastische Tapes für Bewegung mit Körperwahrnehmung.' },
      { slug: 'sport-tapes', name: 'Sport-Tapes', teaser: 'Unelastische Tapes für feste Anlagen.' },
      { slug: 'rigid-tapes', name: 'Rigid Tapes', teaser: 'Maximale Führung für funktionelle Verbände.' },
      { slug: 'tape-unterzug', name: 'Tape-Unterzug', teaser: 'Schaumstoff-Unterzug für hautfreundliche Anlagen.' },
      { slug: 'tape-scheren', name: 'Tape-Scheren', teaser: 'Beschichtete Scheren für sauberen Zuschnitt.' },
      { slug: 'hautschutz', name: 'Hautschutz', teaser: 'Haftspray, Reinigung und Pflege rund ums Tapen.' },
      { slug: 'tape-sets', name: 'Tape-Sets', teaser: 'Fertige Sets für typische Anwendungen.' },
      { slug: 'tape-zubehoer', name: 'Tape-Zubehör', teaser: 'Aufbewahrung, Spender und Kleinteile.' },
    ],
  },
  {
    slug: 'trainingsbaender',
    name: 'Trainingsbänder',
    tagline: 'Widerstand, der mitwächst',
    description:
      'Von der leichten Aktivierung bis zum schweren Zugtraining: Bänder sind das vielseitigste Trainingsmittel für Reha, Kraftaufbau und Heimtraining.',
    icon: 'band',
    order: 3,
    filterKeys: ['resistance', 'length', 'trainingLevel', 'purpose', 'bodyRegion', 'brand', 'price', 'color'],
    subcategories: [
      { slug: 'therabaender', name: 'Therabänder / Resistance Bands', teaser: 'Klassische Übungsbänder als Meterware oder Rolle.' },
      { slug: 'minibands', name: 'Minibands', teaser: 'Kurze Textil- oder Latexbänder für Hüfte und Schulter.' },
      { slug: 'loops', name: 'Loops', teaser: 'Geschlossene Bänder für Aktivierung und Stabilisation.' },
      { slug: 'lange-resistance-bands', name: 'Lange Resistance Bands', teaser: 'Powerbands für Klimmzughilfe und Zugtraining.' },
      { slug: 'terra-x-baender', name: 'Terra-X-Bänder & vergleichbare Systeme', teaser: 'Systembänder mit definierten Widerstandsstufen.' },
      { slug: 'baender-mit-griffen', name: 'Trainingsbänder mit Griffen', teaser: 'Tubes mit Griffen für Zug- und Druckübungen.' },
      { slug: 'tueranker', name: 'Türanker', teaser: 'Sichere Umlenkung für das Training zu Hause.' },
      { slug: 'befestigungen', name: 'Befestigungen', teaser: 'Schlaufen, Karabiner und Fußmanschetten.' },
      { slug: 'trainingsband-sets', name: 'Trainingsband-Sets', teaser: 'Abgestimmte Sets mit mehreren Stärken.' },
    ],
  },
  {
    slug: 'balance-koordination',
    name: 'Balance & Koordination',
    tagline: 'Strong Feet – Strong Body',
    description:
      'Der Herzbereich von HEAL ACTIVE: sensomotorisches Training für Fuß, Sprunggelenk und Knie. Instabile Unterlagen fordern genau die Muskulatur, die im Alltag oft zu kurz kommt.',
    icon: 'balance',
    order: 4,
    filterKeys: ['purpose', 'trainingLevel', 'bodyRegion', 'size', 'brand', 'price', 'color', 'material'],
    subcategories: [
      { slug: 'pezzibaelle', name: 'Pezzibälle', teaser: 'Gymnastikbälle für Rumpf, Haltung und Mobilisation.' },
      { slug: 'balance-halbbaelle', name: 'Balance-Halbbälle', teaser: 'Halbe Pezzibälle für Stand- und Sprungtraining.' },
      { slug: 'balance-trainer', name: 'Balance Trainer', teaser: 'Trainingsgeräte für progressive Instabilität.' },
      { slug: 'balance-boards', name: 'Balance Boards', teaser: 'Boards mit Rolle oder Kugel für fortgeschrittene Kontrolle.' },
      { slug: 'wackelbretter', name: 'Wackelbretter', teaser: 'Kreisel für Sprunggelenk und Propriozeption.' },
      { slug: 'balance-pads', name: 'Balance Pads', teaser: 'Weiche Schaumkissen als Einstieg in instabile Unterlagen.' },
      { slug: 'sensomotorikmatten', name: 'Weiche Sensomotorikmatten', teaser: 'Instabile Matten für Fuß- und Standtraining.' },
      { slug: 'fuss-balance-pads', name: 'Fuß-Balance-Pads', teaser: 'Kleine Pads speziell für das Fußtraining.' },
      { slug: 'koordinationsmatten', name: 'Koordinationsmatten', teaser: 'Strukturierte Matten für Schritt- und Sprungmuster.' },
      { slug: 'igelbaelle', name: 'Igelbälle', teaser: 'Noppenbälle für Fußsohle und Körperwahrnehmung.' },
      { slug: 'massagebaelle', name: 'Massagebälle', teaser: 'Punktuelle Arbeit an Fuß, Wade und Rücken.' },
      { slug: 'fusstrainer', name: 'Fußtrainer', teaser: 'Geräte für Zehen-, Fuß- und Gewölbemuskulatur.' },
      { slug: 'propriozeptionstrainer', name: 'Propriozeptionstrainer', teaser: 'Systeme für gezieltes Wahrnehmungstraining.' },
    ],
  },
  {
    slug: 'massage-recovery',
    name: 'Massage & Recovery',
    tagline: 'Erholung ist Teil des Trainings',
    description:
      'Massagepistolen, Faszienrollen und Triggerpunkt-Tools für die Zeit nach der Belastung – und für die Vorbereitung darauf.',
    icon: 'massage',
    order: 5,
    filterKeys: ['purpose', 'bodyRegion', 'brand', 'price', 'color', 'material', 'trainingLevel'],
    subcategories: [
      { slug: 'massagepistolen', name: 'Massagepistolen', teaser: 'Perkussionsgeräte für großflächige Muskulatur.' },
      { slug: 'mini-massagepistolen', name: 'Mini-Massagepistolen', teaser: 'Kompakt für Sporttasche und Reise.' },
      { slug: 'massagepistolen-aufsaetze', name: 'Massagepistolen-Aufsätze', teaser: 'Ersatz- und Spezialaufsätze.' },
      { slug: 'massagebaelle', name: 'Massagebälle', teaser: 'Einzeln oder als Duoball für die Wirbelsäule.' },
      { slug: 'faszienrollen', name: 'Faszienrollen', teaser: 'Von weich bis strukturiert.' },
      { slug: 'mini-faszienrollen', name: 'Mini-Faszienrollen', teaser: 'Für Unterarm, Wade und unterwegs.' },
      { slug: 'faszienbaelle', name: 'Faszienbälle', teaser: 'Punktgenaue Arbeit an kleinen Arealen.' },
      { slug: 'triggerpunkt-produkte', name: 'Triggerpunkt-Produkte', teaser: 'Sticks, Haken und Druckpunkt-Tools.' },
      { slug: 'recovery-tools', name: 'Recovery Tools', teaser: 'Zubehör rund um Erholung und Schlafqualität.' },
    ],
  },
  {
    slug: 'ems-tens',
    name: 'EMS & TENS',
    tagline: 'Elektrostimulation verständlich erklärt',
    description:
      'Geräte, Elektroden und Zubehör – mit verständlichen Erklärungen zum Unterschied zwischen EMS und TENS, zur Anwendung und zu den Sicherheitshinweisen.',
    icon: 'ems',
    order: 6,
    filterKeys: ['purpose', 'bodyRegion', 'brand', 'price', 'trainingLevel'],
    subcategories: [
      { slug: 'ems-geraete', name: 'EMS-Geräte', teaser: 'Elektrische Muskelstimulation für Ansteuerung und Training.' },
      { slug: 'tens-geraete', name: 'TENS-Geräte', teaser: 'Transkutane elektrische Nervenstimulation.' },
      { slug: 'kombigeraete', name: 'EMS/TENS-Kombigeräte', teaser: 'Beide Programme in einem Gerät.' },
      { slug: 'elektroden', name: 'Elektroden', teaser: 'Klebeelektroden in verschiedenen Größen.' },
      { slug: 'ersatzpads', name: 'Ersatzpads', teaser: 'Nachschub für regelmäßige Anwendung.' },
      { slug: 'kabel', name: 'Kabel', teaser: 'Ersatz- und Verlängerungskabel.' },
      { slug: 'aufbewahrung', name: 'Aufbewahrung', teaser: 'Taschen und Cases für Gerät und Zubehör.' },
      { slug: 'ems-zubehoer', name: 'Zubehör', teaser: 'Kleinteile rund um die Elektrostimulation.' },
    ],
  },
  {
    slug: 'yoga-mobility',
    name: 'Yoga & Mobility',
    tagline: 'Beweglichkeit mit System',
    description:
      'Matten, Blöcke, Gurte und Programme für eine Mobility-Routine, die du wirklich durchhältst.',
    icon: 'yoga',
    order: 7,
    filterKeys: ['purpose', 'size', 'color', 'material', 'trainingLevel', 'brand', 'price', 'bodyRegion'],
    subcategories: [
      { slug: 'yogamatten', name: 'Yogamatten', teaser: 'Rutschfeste Matten in verschiedenen Stärken.' },
      { slug: 'trainingsmatten', name: 'Trainingsmatten', teaser: 'Gepolsterte Matten für Boden- und Reha-Übungen.' },
      { slug: 'mobility-tools', name: 'Mobility Tools', teaser: 'Sticks, Bälle und Hilfsmittel für Beweglichkeit.' },
      { slug: 'stretching-gurte', name: 'Stretching-Gurte', teaser: 'Gurte mit Schlaufen für kontrolliertes Dehnen.' },
      { slug: 'yoga-bloecke', name: 'Yoga-Blöcke', teaser: 'Kork- und Schaumblöcke als Hilfsmittel.' },
      { slug: 'balanceprodukte', name: 'Balanceprodukte', teaser: 'Balance-Zubehör für Yoga und Mobility.' },
      { slug: 'uebungsbuecher', name: 'Übungsbücher', teaser: 'Nachschlagewerke für Training und Reha.' },
      { slug: 'mobility-buecher', name: 'Mobility-Bücher', teaser: 'Fachbücher rund um Beweglichkeit.' },
      { slug: 'trainingsprogramme', name: 'Trainingsprogramme', teaser: 'Strukturierte Programme als Karten oder Buch.' },
    ],
  },
  {
    slug: 'sport-lifestyle',
    name: 'Sport & Lifestyle',
    tagline: 'Begleiter für jeden Tag in Bewegung',
    description:
      'Trinkflaschen, Funktionsshirts und Recovery-Zubehör – die Produkte, die dich zwischen Training und Alltag begleiten.',
    icon: 'lifestyle',
    order: 8,
    filterKeys: ['gender', 'size', 'color', 'material', 'brand', 'price', 'sport'],
    subcategories: [
      { slug: 'trinkflaschen', name: 'Trinkflaschen', teaser: 'Auslaufsichere Flaschen für Training und Büro.' },
      { slug: 'sportshirts', name: 'Sportshirts', teaser: 'Shirts für Training und Alltag.' },
      { slug: 'funktionsshirts', name: 'Funktionsshirts', teaser: 'Feuchtigkeitsregulierende Materialien.' },
      { slug: 'trainingsbekleidung', name: 'Trainingsbekleidung', teaser: 'Hosen, Jacken und mehr.' },
      { slug: 'recovery-zubehoer', name: 'Recovery-Zubehör', teaser: 'Kleinigkeiten, die die Erholung leichter machen.' },
    ],
  },
];

export const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

/** Kategorien in Navigationsreihenfolge. */
export const orderedCategories = [...categories].sort((a, b) => a.order - b.order);
