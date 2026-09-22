import type { Goal } from '@/lib/types';

/**
 * "DEIN ZIEL" – der zweite Einstieg in den Shop neben der Körperregion.
 * Jedes Ziel mappt auf Verwendungszwecke (`purposes`), über die Produkte
 * gefunden werden. Neue Ziele können jederzeit ergänzt werden.
 */
export const goals: Goal[] = [
  {
    slug: 'schmerzen-entlastung',
    name: 'Schmerzen & Entlastung',
    claim: 'Belastung herausnehmen, Bewegung angenehmer machen.',
    description:
      'Produkte, die Körperregionen entlasten oder ein angenehmeres Bewegungsgefühl unterstützen – von Bandagen über Tapes bis zu Recovery-Tools.',
    icon: 'shield',
    purposes: ['entlasten', 'regeneration', 'taping'],
  },
  {
    slug: 'stabilisieren',
    name: 'Stabilisieren',
    claim: 'Mehr Führung, mehr Sicherheitsgefühl.',
    description:
      'Bandagen, Tapes und Trainingsmittel, die Gelenke führen und die stabilisierende Muskulatur ansprechen.',
    icon: 'shield',
    purposes: ['stabilisieren', 'taping', 'balance'],
  },
  {
    slug: 'mobilitaet-verbessern',
    name: 'Mobilität verbessern',
    claim: 'Beweglichkeit zurückholen.',
    description:
      'Mobility Tools, Faszienrollen, Stretching-Gurte und Matten für mehr Bewegungsspielraum.',
    icon: 'yoga',
    purposes: ['mobilisieren', 'regeneration'],
  },
  {
    slug: 'muskeln-aktivieren',
    name: 'Muskeln aktivieren',
    claim: 'Ansteuerung vor Belastung.',
    description:
      'Minibands, Loops und EMS-Geräte, mit denen du Muskulatur vor dem Training oder im Alltag ansprichst.',
    icon: 'ems',
    purposes: ['aktivieren', 'kraeftigen'],
  },
  {
    slug: 'kraft-aufbauen',
    name: 'Kraft aufbauen',
    claim: 'Belastbarkeit Schritt für Schritt steigern.',
    description:
      'Widerstandsbänder, Türankersysteme und Trainingssets für progressiven Kraftaufbau zu Hause und unterwegs.',
    icon: 'strength',
    purposes: ['kraeftigen', 'heimtraining'],
  },
  {
    slug: 'balance-verbessern',
    name: 'Balance verbessern',
    claim: 'Stabil stehen, sicher landen.',
    description:
      'Balance Pads, Wackelbretter, Balance Trainer und weiche Matten für Gleichgewicht und Standsicherheit.',
    icon: 'balance',
    purposes: ['balance', 'stabilisieren', 'praevention'],
  },
  {
    slug: 'koordination-trainieren',
    name: 'Koordination trainieren',
    claim: 'Bewegungen wieder präzise steuern.',
    description:
      'Sensomotorische Trainingsmittel, Koordinationsmatten und Fußtrainer für feine Bewegungssteuerung.',
    icon: 'move',
    purposes: ['koordination', 'balance'],
  },
  {
    slug: 'regeneration',
    name: 'Regeneration',
    claim: 'Erholung ist Teil des Trainings.',
    description:
      'Massagepistolen, Faszienrollen, Triggerpunkt-Tools und Recovery-Zubehör für die Zeit nach der Belastung.',
    icon: 'massage',
    purposes: ['regeneration', 'mobilisieren'],
  },
  {
    slug: 'return-to-sport',
    name: 'Return to Sport',
    claim: 'Der strukturierte Weg zurück.',
    description:
      'Produkte und Inhalte für den schrittweisen Wiedereinstieg in dein Training – kombiniert mit unseren BACK TO SPORT Programmen.',
    icon: 'run',
    purposes: ['return-to-sport', 'stabilisieren', 'koordination'],
  },
  {
    slug: 'verletzungspraevention',
    name: 'Verletzungsprävention',
    claim: 'Vorher investieren statt nachher pausieren.',
    description:
      'Präventives Training für Sprunggelenk, Knie, Schulter und Rumpf – mit Bändern, Balanceprodukten und Tapes.',
    icon: 'spark',
    purposes: ['praevention', 'balance', 'kraeftigen'],
  },
  {
    slug: 'selbst-tapen',
    name: 'Selbst tapen',
    claim: 'Tape-Anlagen, die du selbst hinbekommst.',
    description:
      'Kinesiologie-Tapes, Sport-Tapes, Scheren und Zubehör – begleitet von unseren TAPE YOURSELF Anleitungen.',
    icon: 'tape',
    purposes: ['taping', 'stabilisieren'],
  },
  {
    slug: 'zu-hause-trainieren',
    name: 'Zu Hause trainieren',
    claim: 'Dein Wohnzimmer als Trainingsraum.',
    description:
      'Kompaktes Equipment mit kleinem Platzbedarf: Bänder, Matten, Balanceprodukte und Recovery-Tools.',
    icon: 'fitness',
    purposes: ['heimtraining', 'kraeftigen', 'mobilisieren'],
  },
  {
    slug: 'yoga-mobility',
    name: 'Yoga & Mobility',
    claim: 'Beweglichkeit mit System.',
    description:
      'Matten, Blöcke, Gurte und Programme für eine regelmäßige Mobility-Routine.',
    icon: 'yoga',
    purposes: ['mobilisieren', 'regeneration', 'heimtraining'],
  },
];

export const goalBySlug = new Map(goals.map((goal) => [goal.slug, goal]));
