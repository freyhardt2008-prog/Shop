import {
  getBackToSportPrograms,
  getBodyRegions,
  getCategories,
  getGoals,
  getSports,
  getTapeGuides,
} from '@/lib/catalog';
import type { HeaderNavItem } from './SiteHeader';

/**
 * Baut die Kopfnavigation aus den Katalogdaten.
 * Läuft in einer Server Component – dadurch landet der Katalog nicht im
 * Client-Bundle, sondern nur die fertigen Links.
 */
export function buildHeaderNavigation(): HeaderNavItem[] {
  const categories = getCategories();
  const regions = getBodyRegions();
  const goals = getGoals();
  const sports = getSports();
  const tapeGuides = getTapeGuides();
  const programs = getBackToSportPrograms();

  const regionsByGroup = {
    obere: regions.filter((region) => region.group === 'obere-extremitaet'),
    rumpf: regions.filter((region) => region.group === 'rumpf'),
    untere: regions.filter((region) => region.group === 'untere-extremitaet'),
  };

  return [
    {
      label: 'Shop',
      href: '/shop',
      columns: [
        {
          title: 'Kategorien',
          links: categories.slice(0, 4).map((category) => ({
            label: category.name,
            href: `/shop/${category.slug}`,
            icon: category.icon,
          })),
        },
        {
          title: 'Weitere Kategorien',
          links: categories.slice(4).map((category) => ({
            label: category.name,
            href: `/shop/${category.slug}`,
            icon: category.icon,
          })),
        },
        {
          title: 'Schnell finden',
          links: [
            { label: 'Alle Produkte A–Z', href: '/produkte-a-z', icon: 'search' },
            { label: 'HEAL ACTIVE Finder', href: '/finder', icon: 'target' },
            { label: 'HEAL ACTIVE Favorites', href: '/favorites', icon: 'spark' },
            { label: 'Strong Feet – Strong Body', href: '/strong-feet', icon: 'foot' },
          ],
        },
      ],
      feature: {
        title: 'Du weißt nicht, wo du anfangen sollst?',
        text: 'Vier Fragen – und du siehst Produkte, die zu deiner Situation passen könnten.',
        href: '/finder',
        cta: 'Zum Finder',
      },
    },
    {
      label: 'Körper & Beschwerden',
      href: '/koerper',
      columns: [
        {
          title: 'Obere Extremität',
          links: regionsByGroup.obere.map((region) => ({
            label: region.name,
            href: `/koerper/${region.slug}`,
          })),
        },
        {
          title: 'Rumpf',
          links: regionsByGroup.rumpf.map((region) => ({
            label: region.name,
            href: `/koerper/${region.slug}`,
          })),
        },
        {
          title: 'Untere Extremität',
          links: regionsByGroup.untere.map((region) => ({
            label: region.name,
            href: `/koerper/${region.slug}`,
          })),
        },
      ],
      feature: {
        title: 'Wo tut es weh?',
        text: 'Wähle deine Körperregion auf der interaktiven Figur und finde passende Themen, Übungen und Produkte.',
        href: '/koerper',
        cta: 'Körper auswählen',
      },
    },
    {
      label: 'Dein Ziel',
      href: '/ziel',
      columns: [
        {
          title: 'Ziele',
          links: goals.slice(0, 7).map((goal) => ({
            label: goal.name,
            href: `/ziel/${goal.slug}`,
            icon: goal.icon,
          })),
        },
        {
          title: 'Weitere Ziele',
          links: goals.slice(7).map((goal) => ({
            label: goal.name,
            href: `/ziel/${goal.slug}`,
            icon: goal.icon,
          })),
        },
      ],
      feature: {
        title: 'Vom Ziel zum Produkt',
        text: 'Stabilisieren, mobilisieren, regenerieren – jedes Ziel führt dich zu passenden Produkten und Übungen.',
        href: '/ziel',
        cta: 'Alle Ziele',
      },
    },
    {
      label: 'Sportart',
      href: '/sport',
      columns: [
        {
          title: 'Ausdauer',
          links: sports
            .filter((sport) => ['laufen', 'walking', 'radfahren', 'schwimmen', 'wandern'].includes(sport.slug))
            .map((sport) => ({ label: sport.name, href: `/sport/${sport.slug}`, icon: sport.icon })),
        },
        {
          title: 'Ballsport',
          links: sports
            .filter((sport) => ['fussball', 'tennis', 'padel', 'golf', 'teamsport'].includes(sport.slug))
            .map((sport) => ({ label: sport.name, href: `/sport/${sport.slug}`, icon: sport.icon })),
        },
        {
          title: 'Kraft & Mobility',
          links: sports
            .filter((sport) => ['fitness', 'krafttraining', 'yoga', 'ski'].includes(sport.slug))
            .map((sport) => ({ label: sport.name, href: `/sport/${sport.slug}`, icon: sport.icon })),
        },
      ],
    },
    {
      label: 'Tape Yourself',
      href: '/tape-yourself',
      columns: [
        {
          title: 'Bein & Fuß',
          links: tapeGuides
            .filter((guide) =>
              ['sprunggelenk', 'achillessehne', 'knie', 'wade', 'oberschenkel'].includes(
                guide.bodyRegionSlug,
              ),
            )
            .map((guide) => ({ label: guide.name, href: `/tape-yourself/${guide.slug}` })),
        },
        {
          title: 'Rumpf & Arm',
          links: tapeGuides
            .filter((guide) =>
              ['ruecken', 'schulter', 'ellenbogen', 'handgelenk'].includes(guide.bodyRegionSlug),
            )
            .map((guide) => ({ label: guide.name, href: `/tape-yourself/${guide.slug}` })),
        },
        {
          title: 'Material',
          links: [
            { label: 'Kinesiologie-Tapes', href: '/shop/tapes/kinesiologie-tapes', icon: 'tape' },
            { label: 'Sport- & Rigid Tapes', href: '/shop/tapes/rigid-tapes', icon: 'tape' },
            { label: 'Tape-Scheren', href: '/shop/tapes/tape-scheren', icon: 'tape' },
            { label: 'Alle Tapes', href: '/shop/tapes', icon: 'tape' },
          ],
        },
      ],
      feature: {
        title: 'Tape dich selbst',
        text: 'Schritt für Schritt erklärt – mit Materialliste, Hinweisen und Kontraindikationen.',
        href: '/tape-yourself',
        cta: 'Alle Anleitungen',
      },
    },
    {
      label: 'Übungen',
      href: '/uebungen',
    },
    {
      label: 'Recovery',
      href: '/recovery',
    },
    {
      label: 'Back to Sport',
      href: '/back-to-sport',
      columns: [
        {
          title: 'Programme',
          links: programs.map((program) => ({
            label: program.name,
            href: `/back-to-sport/${program.slug}`,
          })),
        },
      ],
      feature: {
        title: 'Der Weg zurück',
        text: 'Vier Phasen, klare Checkliste – so verbindest du Produkte, Übungen und Belastungsaufbau.',
        href: '/back-to-sport',
        cta: 'Programme ansehen',
      },
    },
    {
      label: 'Guide',
      href: '/guide',
    },
  ];
}
