import type { Sport } from '@/lib/types';

/**
 * Navigation nach Sportart. Weitere Sportarten können einfach ergänzt
 * werden – es genügt ein neuer Eintrag in dieser Liste (die Routen unter
 * `/sport/[slug]` werden daraus statisch generiert).
 */
export const sports: Sport[] = [
  {
    slug: 'laufen',
    name: 'Laufen',
    icon: 'run',
    teaser: 'Sprunggelenk, Achillessehne, Knie – die Laufkette im Blick.',
    description:
      'Beim Laufen wiederholt sich dieselbe Bewegung tausendfach. Deshalb zahlen sich Fußmuskulatur, Wadenkraft und eine saubere Belastungssteuerung besonders aus.',
    focusRegionSlugs: ['fuss', 'sprunggelenk', 'achillessehne', 'wade', 'knie', 'unterschenkel'],
    backToSportSlug: 'back-to-running',
  },
  {
    slug: 'walking',
    name: 'Walking',
    icon: 'walk',
    teaser: 'Gelenkschonender Einstieg zurück in regelmäßige Bewegung.',
    description:
      'Walking ist für viele der erste Schritt zurück in den Alltag. Gute Schuhe, stabile Füße und eine aufrechte Haltung machen den Unterschied.',
    focusRegionSlugs: ['fuss', 'knie', 'huefte', 'lendenwirbelsaeule'],
  },
  {
    slug: 'fussball',
    name: 'Fußball',
    icon: 'football',
    teaser: 'Richtungswechsel, Zweikampf, Sprint – hohe Anforderung an Knie und Sprunggelenk.',
    description:
      'Fußball fordert schnelle Richtungswechsel und abrupte Stopps. Sprunggelenkstabilität, Adduktorenkraft und Landetechnik sind zentrale Präventionsthemen.',
    focusRegionSlugs: ['sprunggelenk', 'knie', 'leiste', 'oberschenkel', 'wade'],
    backToSportSlug: 'back-to-football',
  },
  {
    slug: 'tennis',
    name: 'Tennis',
    icon: 'tennis',
    teaser: 'Schlagbelastung für Ellenbogen, Schulter und Handgelenk.',
    description:
      'Wiederholte Schlagbelastung trifft Ellenbogen und Schulter. Griffkraft, Rumpfrotation und Beinarbeit verteilen die Last besser.',
    focusRegionSlugs: ['ellenbogen', 'schulter', 'handgelenk', 'sprunggelenk', 'ruecken'],
    backToSportSlug: 'back-to-tennis',
  },
  {
    slug: 'padel',
    name: 'Padel',
    icon: 'padel',
    teaser: 'Kurze Wege, viele Richtungswechsel, hohe Handgelenksbelastung.',
    description:
      'Padel kombiniert Schlagsport mit engen Richtungswechseln auf kleinem Feld – eine besondere Anforderung an Sprunggelenk und Handgelenk.',
    focusRegionSlugs: ['handgelenk', 'ellenbogen', 'sprunggelenk', 'knie'],
  },
  {
    slug: 'golf',
    name: 'Golf',
    icon: 'golf',
    teaser: 'Rotation aus Rumpf und Hüfte – Ellenbogen und Rücken profitieren.',
    description:
      'Der Golfschwung lebt von Rotationsfähigkeit in Brustwirbelsäule und Hüfte. Fehlende Mobilität landet schnell im unteren Rücken.',
    focusRegionSlugs: ['ruecken', 'lendenwirbelsaeule', 'ellenbogen', 'huefte', 'brustkorb'],
  },
  {
    slug: 'schwimmen',
    name: 'Schwimmen',
    icon: 'swim',
    teaser: 'Überkopfsport mit hoher Schulterbelastung.',
    description:
      'Beim Schwimmen arbeitet die Schulter überkopf und repetitiv. Rotatorenmanschette, Brustwirbelsäulen-Mobilität und Rumpfspannung sind die Schlüsselthemen.',
    focusRegionSlugs: ['schulter', 'brustkorb', 'kopf-nacken', 'ruecken'],
    backToSportSlug: 'back-to-swimming',
  },
  {
    slug: 'radfahren',
    name: 'Radfahren',
    icon: 'bike',
    teaser: 'Gelenkschonend – mit Themen an Knie, Nacken und unterem Rücken.',
    description:
      'Radfahren ist gelenkschonend, aber positionsintensiv. Sitzposition, Hüftbeweglichkeit und Nackenentlastung sind die typischen Stellschrauben.',
    focusRegionSlugs: ['knie', 'lendenwirbelsaeule', 'kopf-nacken', 'huefte'],
  },
  {
    slug: 'fitness',
    name: 'Fitness',
    icon: 'fitness',
    teaser: 'Ganzkörpertraining mit Fokus auf saubere Technik.',
    description:
      'Im Studio oder zu Hause: Aktivierung vor der Belastung, saubere Technik und Regeneration danach halten das Training langfristig möglich.',
    focusRegionSlugs: ['schulter', 'knie', 'lendenwirbelsaeule', 'handgelenk'],
    backToSportSlug: 'back-to-fitness',
  },
  {
    slug: 'krafttraining',
    name: 'Krafttraining',
    icon: 'strength',
    teaser: 'Hohe Lasten brauchen stabile Gelenke und gute Vorbereitung.',
    description:
      'Bei schweren Grundübungen zählen Handgelenks- und Rumpfstabilität ebenso wie eine strukturierte Aufwärmroutine.',
    focusRegionSlugs: ['handgelenk', 'schulter', 'lendenwirbelsaeule', 'knie', 'ellenbogen'],
  },
  {
    slug: 'yoga',
    name: 'Yoga',
    icon: 'yoga',
    teaser: 'Beweglichkeit, Balance und Körperwahrnehmung.',
    description:
      'Yoga verbindet Mobilität mit Stabilität. Handgelenke, Schultern und Füße tragen dabei mehr Last, als viele erwarten.',
    focusRegionSlugs: ['handgelenk', 'schulter', 'huefte', 'ruecken', 'fuss'],
  },
  {
    slug: 'wandern',
    name: 'Wandern',
    icon: 'hike',
    teaser: 'Lange Belastung bergauf und bergab – besonders für Knie und Sprunggelenk.',
    description:
      'Bergab wirkt ein Vielfaches des Körpergewichts auf das Knie. Wadenkraft, Trittsicherheit und Balance zahlen direkt auf Sicherheit ein.',
    focusRegionSlugs: ['knie', 'sprunggelenk', 'fuss', 'wade', 'huefte'],
  },
  {
    slug: 'ski',
    name: 'Ski',
    icon: 'ski',
    teaser: 'Kniestabilität und Beinachse stehen im Mittelpunkt.',
    description:
      'Skifahren verlangt exzentrische Beinkraft und schnelle Stabilisation. Vorbereitung in der Vorsaison ist der wirksamste Hebel.',
    focusRegionSlugs: ['knie', 'oberschenkel', 'lendenwirbelsaeule', 'sprunggelenk'],
  },
  {
    slug: 'teamsport',
    name: 'Teamsport',
    icon: 'team',
    teaser: 'Handball, Basketball, Volleyball: Sprung, Landung, Richtungswechsel.',
    description:
      'Sprung- und Landetechnik sowie Sprunggelenk- und Kniestabilität sind in allen Hallensportarten die gemeinsamen Nenner.',
    focusRegionSlugs: ['sprunggelenk', 'knie', 'schulter', 'hand-finger'],
  },
];

export const sportBySlug = new Map(sports.map((sport) => [sport.slug, sport]));
