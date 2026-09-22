/**
 * HEAL ACTIVE GUIDE – redaktionelle Wissensartikel.
 *
 * REDAKTIONSREGEL: keine Heilversprechen, keine Diagnosen, kein Ersatz für
 * ärztliche Untersuchung oder Therapie. Artikel erklären Produkte,
 * Anwendungen und Zusammenhänge – sie geben keine individuellen Empfehlungen.
 */

import type { IconName, Slug } from '@/lib/types';

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Hervorgehobener Hinweiskasten am Ende des Abschnitts. */
  note?: string;
}

export interface GuideArticle {
  slug: Slug;
  title: string;
  teaser: string;
  icon: IconName;
  readingMinutes: number;
  intro: string[];
  sections: GuideSection[];
  faq?: { question: string; answer: string }[];
  relatedProductSlugs: Slug[];
  relatedCategorySlugs: Slug[];
}

export const guideArticles: GuideArticle[] = [
  {
    slug: 'ems-tens',
    title: 'EMS & TENS verständlich erklärt',
    teaser: 'Was ist der Unterschied, wofür wird was genutzt – und wann besser nicht?',
    icon: 'ems',
    readingMinutes: 6,
    intro: [
      'EMS und TENS klingen ähnlich, meinen aber zwei unterschiedliche Anwendungen von elektrischem Strom auf der Haut. Beide arbeiten mit Klebeelektroden und einem kleinen Gerät – der Unterschied liegt in Frequenz, Impulsform und Zielstruktur.',
      'Dieser Artikel erklärt die Grundlagen. Er ersetzt weder die Gebrauchsanweisung deines Geräts noch eine ärztliche Beratung.',
    ],
    sections: [
      {
        heading: 'Was ist EMS?',
        paragraphs: [
          'EMS steht für Elektrische Muskelstimulation. Die Impulse sind so gewählt, dass sie motorische Nerven ansprechen und dadurch eine Muskelkontraktion auslösen. Der Muskel zieht sich zusammen, ohne dass du ihn bewusst anspannst.',
          'Genutzt wird das unter anderem, um die Ansteuerung eines Muskels zu unterstützen – etwa wenn es nach einer längeren Pause schwerfällt, eine bestimmte Muskelgruppe bewusst zu aktivieren.',
        ],
        bullets: [
          'Ziel: Muskelkontraktion auslösen',
          'Typisch: höhere Impulsintensität, rhythmische An- und Entspannungsphasen',
          'Ergänzt aktives Training, ersetzt es nicht',
        ],
      },
      {
        heading: 'Was ist TENS?',
        paragraphs: [
          'TENS steht für Transkutane Elektrische Nervenstimulation. Hier werden sensible Nervenfasern gereizt, ohne dass eine Muskelkontraktion im Vordergrund steht. Viele Anwenderinnen und Anwender beschreiben ein Kribbeln oder Prickeln.',
          'TENS-Geräte werden in Deutschland teils als Medizinprodukte in Verkehr gebracht. Ob und wie eine Anwendung im Einzelfall sinnvoll ist, gehört in ärztliche oder physiotherapeutische Hand.',
        ],
        bullets: [
          'Ziel: Reizung sensibler Nervenfasern',
          'Typisch: höhere Frequenzen, niedrigere Intensität',
          'Keine Selbstbehandlung bei ungeklärten Beschwerden',
        ],
      },
      {
        heading: 'Der Unterschied auf einen Blick',
        paragraphs: [
          'Vereinfacht gesagt: EMS spricht den Muskel an, TENS die Nervenfasern. Viele Geräte können beides und bieten getrennte Programme.',
        ],
        bullets: [
          'EMS: Muskel soll arbeiten – sichtbare Kontraktion',
          'TENS: Wahrnehmung soll sich verändern – meist keine Kontraktion',
          'Kombigeräte decken beide Programme ab',
        ],
      },
      {
        heading: 'Anwendung: worauf es praktisch ankommt',
        paragraphs: [
          'Unabhängig vom Programm gilt: Haut sauber, trocken und unverletzt, Elektroden vollflächig aufkleben, Intensität immer von null aus langsam steigern.',
          'Die Anwendung soll deutlich spürbar, aber nie schmerzhaft sein. Schmerzhaft bedeutet nicht wirksamer.',
        ],
        bullets: [
          'Gerät vor dem Anbringen und Abnehmen der Elektroden ausschalten',
          'Elektroden nicht mit anderen Personen teilen',
          'Abgenutzte Pads ersetzen – sie können die Haut reizen',
          'Anwendungsdauer laut Gebrauchsanweisung einhalten',
        ],
        note: 'Lies vor der ersten Anwendung immer die vollständige Gebrauchsanweisung deines Geräts – insbesondere den Abschnitt zu Gegenanzeigen.',
      },
      {
        heading: 'Sicherheit und Gegenanzeigen',
        paragraphs: [
          'Elektrostimulation ist nicht für alle Menschen und nicht an allen Körperstellen geeignet. Die folgenden Punkte sind die wichtigsten allgemeinen Gegenanzeigen – die Liste deines Geräteherstellers kann weitere enthalten.',
        ],
        bullets: [
          'Nicht bei Herzschrittmacher, implantiertem Defibrillator oder anderen elektronischen Implantaten',
          'Nicht in der Schwangerschaft',
          'Nicht bei Epilepsie oder Herzrhythmusstörungen',
          'Nicht am Hals, im Bereich des Halsschlagadersinus, am Kopf oder über dem Herzen',
          'Nicht auf verletzter, gereizter oder gefühlloser Haut',
          'Nicht während des Führens eines Fahrzeugs oder beim Bedienen von Maschinen',
          'Bei unklaren Beschwerden vorher ärztlich abklären lassen',
        ],
        note: 'Bei Vorerkrankungen oder Unsicherheit: vor der ersten Anwendung ärztlich beraten lassen.',
      },
    ],
    faq: [
      {
        question: 'Ersetzt EMS das Krafttraining?',
        answer:
          'Nein. EMS kann die Ansteuerung eines Muskels unterstützen, ersetzt aber kein aktives Training mit Bewegung, Koordination und progressiver Belastung.',
      },
      {
        question: 'Wie oft darf ich ein EMS- oder TENS-Gerät anwenden?',
        answer:
          'Das richtet sich nach der Gebrauchsanweisung des jeweiligen Geräts und nach der individuellen Situation. Allgemeingültige Angaben sind hier nicht möglich – im Zweifel fachlich abklären lassen.',
      },
    ],
    relatedProductSlugs: ['ems-tens-kombigeraet', 'elektroden-set'],
    relatedCategorySlugs: ['ems-tens'],
  },
  {
    slug: 'bandage-richtig-waehlen',
    title: 'Die richtige Bandage finden',
    teaser: 'Größe, Kompression, Pelotte, Schiene – was bedeutet was?',
    icon: 'shield',
    readingMinutes: 5,
    intro: [
      'Bandagen unterscheiden sich weniger im Aussehen als in der Wirkweise. Wer den Unterschied zwischen Kompression, Pelotte und Führungsschiene kennt, trifft eine deutlich bessere Wahl.',
    ],
    sections: [
      {
        heading: 'Kompression: der Grundbaustein',
        paragraphs: [
          'Fast jede Bandage arbeitet mit Kompression. Das gleichmäßige Anliegen des Gestricks erzeugt einen Reiz auf der Haut, der die Wahrnehmung des Gelenks verändert – viele Menschen beschreiben das als "sicheres Gefühl".',
          'Kompression allein stabilisiert ein Gelenk mechanisch nur wenig. Ihr Nutzen liegt vor allem im Bewegungsgefühl und im Tragekomfort.',
        ],
      },
      {
        heading: 'Pelotten: gezielter Druck und Entlastung',
        paragraphs: [
          'Pelotten sind Einlagen aus Silikon oder Schaumstoff, die an bestimmten Stellen mehr oder weniger Druck erzeugen. Eine ringförmige Pelotte rund um die Kniescheibe hält zum Beispiel Druck von ihr fern.',
          'Wichtig ist die richtige Größe: Sitzt die Pelotte falsch, wirkt sie nicht wie vorgesehen und kann drückten.',
        ],
      },
      {
        heading: 'Führungselemente und Schienen',
        paragraphs: [
          'Seitliche Stäbe oder Gelenkschienen begrenzen Bewegung in definierten Richtungen. Sie kommen vor allem dort zum Einsatz, wo mechanische Führung gewünscht ist – etwa am Sprunggelenk nach einem Umknickereignis.',
          'Je mehr Führung eine Bandage gibt, desto wichtiger wird die passgenaue Größe.',
        ],
      },
      {
        heading: 'Größe richtig messen',
        paragraphs: [
          'Bandagen werden nicht nach Konfektionsgröße, sondern nach Umfang ausgewählt. Jede Größentabelle nennt die Messstelle – halte dich genau daran.',
        ],
        bullets: [
          'Im Stehen messen, außer die Tabelle sagt etwas anderes',
          'Maßband anlegen, ohne einzuschnüren',
          'Im Grenzbereich zwischen zwei Größen: meist die kleinere wählen',
          'Bei Unsicherheit im Sanitätsfachhandel Maß nehmen lassen',
        ],
        note: 'Eine zu große Bandage rutscht und verliert ihre Wirkung. Eine zu kleine kann einschnüren – beides ist kontraproduktiv.',
      },
      {
        heading: 'Tragen und Pflegen',
        paragraphs: [
          'Die Tragezeit sollte schrittweise gesteigert werden. Viele Hersteller empfehlen, mit ein bis zwei Stunden zu beginnen.',
        ],
        bullets: [
          'Nicht über Nacht tragen, sofern nicht anders verordnet',
          'Nach dem Sport abnehmen und die Haut trocknen lassen',
          'Meist Handwäsche oder 30 Grad im Wäschenetz, kein Trockner',
          'Bei Taubheitsgefühl, Kribbeln oder Verfärbung sofort abnehmen',
        ],
      },
    ],
    relatedProductSlugs: ['kniebandage-aktiv', 'sprunggelenkbandage-stabil', 'rueckenbandage-stuetz'],
    relatedCategorySlugs: ['bandagen-support'],
  },
  {
    slug: 'tape-grundlagen',
    title: 'Tape-Grundlagen: Material, Zug, Haltbarkeit',
    teaser: 'Kinesiologie-Tape oder Rigid Tape? Und wie viel Zug ist richtig?',
    icon: 'tape',
    readingMinutes: 5,
    intro: [
      'Tape ist nicht gleich Tape. Die beiden wichtigsten Materialgruppen verhalten sich grundverschieden – und werden entsprechend unterschiedlich angelegt.',
    ],
    sections: [
      {
        heading: 'Kinesiologie-Tape: elastisch, begleitend',
        paragraphs: [
          'Kinesiologie-Tape lässt sich in Längsrichtung dehnen und geht die Bewegung mit. Es begrenzt Bewegung nicht, sondern liefert einen Reiz auf der Haut.',
          'Typische Tragedauer: drei bis sieben Tage, Duschen ist möglich.',
        ],
      },
      {
        heading: 'Rigid Tape: unelastisch, begrenzend',
        paragraphs: [
          'Rigid Tape dehnt sich nicht. Es wird für funktionelle Verbände genutzt, die Bewegung in bestimmten Richtungen begrenzen sollen – etwa am Sprunggelenk vor dem Spiel.',
          'Es wird in der Regel nur für die Dauer der Belastung angelegt und danach entfernt.',
        ],
      },
      {
        heading: 'Wie viel Zug ist richtig?',
        paragraphs: [
          'Die häufigste Fehlerquelle beim Selbsttapen ist zu viel Zug. Als Faustregel gilt: Anfang und Ende immer ohne Zug, der mittlere Teil je nach Anleitung mit leichtem bis mittlerem Zug.',
          'Ein Tape, das sofort nach dem Anlegen stark zieht oder die Haut wellenförmig zusammenschiebt, ist meist zu straff angelegt.',
        ],
        bullets: [
          'Ohne Zug: die ersten und letzten drei bis vier Zentimeter',
          'Leichter Zug: etwa 15 bis 25 Prozent der Dehnbarkeit',
          'Mittlerer Zug: etwa 50 Prozent – nur für kurze Querstreifen',
          'Niemals ringförmig unter Zug anlegen',
        ],
      },
      {
        heading: 'Haltbarkeit verbessern',
        paragraphs: [
          'Die Haftung entscheidet sich in der Vorbereitung, nicht im Kleber.',
        ],
        bullets: [
          'Haut reinigen, trocknen, fettfrei halten',
          'Starke Behaarung kürzen',
          'Alle Ecken abrunden',
          'Nach dem Anlegen kräftig anreiben – Wärme aktiviert den Kleber',
          'Mindestens 20 bis 30 Minuten vor der Belastung anlegen',
        ],
        note: 'Zum Entfernen flach in Haarwuchsrichtung abrollen, am besten unter der Dusche – nicht ruckartig abziehen.',
      },
    ],
    relatedProductSlugs: ['kinesiologie-tape-classic', 'sport-tape-rigid', 'tape-schere-profi'],
    relatedCategorySlugs: ['tapes'],
  },
  {
    slug: 'balance-training-aufbauen',
    title: 'Balancetraining sinnvoll aufbauen',
    teaser: 'Von festem Boden bis Balance-Halbball – in vier Stufen.',
    icon: 'balance',
    readingMinutes: 4,
    intro: [
      'Balancetraining wirkt unspektakulär und ist gerade deshalb oft unterdosiert oder zu schnell gesteigert. Ein klarer Stufenplan hilft.',
    ],
    sections: [
      {
        heading: 'Warum instabile Unterlagen?',
        paragraphs: [
          'Auf einer weichen oder beweglichen Unterlage muss der Körper permanent nachregulieren. Genau diese schnellen, unbewussten Korrekturen sind das, was im Sport über Sicherheit entscheidet.',
          'Der Trainingsreiz entsteht nicht durch Wackeln an sich, sondern durch kontrollierte Korrekturbewegungen.',
        ],
      },
      {
        heading: 'Die vier Stufen',
        paragraphs: ['Steigere erst, wenn die aktuelle Stufe ruhig und kontrolliert gelingt.'],
        bullets: [
          'Stufe 1: fester Boden, barfuß – Einbeinstand 30 Sekunden ruhig',
          'Stufe 2: Balance Pad – weiche Unterlage, erst beidbeinig, dann einbeinig',
          'Stufe 3: Wackelbrett oder Sensomotorikmatte – Bewegung in alle Richtungen',
          'Stufe 4: Balance-Halbball mit Zusatzaufgabe – Ball fangen, Augen schließen, Landungen',
        ],
      },
      {
        heading: 'Dosierung',
        paragraphs: [
          'Kurze, häufige Einheiten schlagen lange, seltene. Drei bis fünf Minuten täglich sind ein realistischer Einstieg – etwa beim Zähneputzen.',
        ],
        bullets: [
          'Täglich 3 bis 5 Minuten reichen zu Beginn',
          'Immer eine Haltemöglichkeit in Reichweite',
          'Barfuß trainieren, damit die Fußmuskulatur mitarbeitet',
          'Qualität vor Dauer: lieber kürzer und kontrolliert',
        ],
        note: 'Bei Schwindel, starker Unsicherheit oder nach einer Verletzung: nicht allein trainieren und die Progression fachlich abstimmen.',
      },
    ],
    relatedProductSlugs: ['balance-pad-sensomotorik', 'wackelbrett-holz', 'balance-halbball-trainer'],
    relatedCategorySlugs: ['balance-koordination'],
  },
  {
    slug: 'recovery-richtig-nutzen',
    title: 'Recovery-Tools richtig nutzen',
    teaser: 'Faszienrolle, Massagepistole, Massageball – wann, wie lange, wie stark?',
    icon: 'massage',
    readingMinutes: 4,
    intro: [
      'Recovery-Tools sind beliebt, weil sie sich gut anfühlen. Damit sie das auch bleiben, lohnt ein Blick auf Intensität, Dauer und Tabuzonen.',
    ],
    sections: [
      {
        heading: 'Intensität: weniger ist mehr',
        paragraphs: [
          'Ein häufiger Irrtum: Je schmerzhafter, desto wirksamer. Tatsächlich führt zu hohe Intensität eher zu Abwehrspannung – der Muskel entspannt dann gerade nicht.',
          'Gute Orientierung: Du kannst während der Anwendung ruhig weiteratmen und ein Gespräch führen.',
        ],
      },
      {
        heading: 'Dauer und Zeitpunkt',
        paragraphs: [
          'Vor der Belastung eignen sich kurze, lockere Anwendungen auf niedriger Stufe. Nach der Belastung darf es länger und etwas intensiver sein.',
        ],
        bullets: [
          '1 bis 2 Minuten pro Muskelgruppe genügen meist',
          'Nicht länger als etwa eine Minute auf einer Stelle',
          'Vor dem Sport: kurz und locker, danach bewegen',
          'Nach dem Sport: in Ruhe, gern mit Dehnen kombiniert',
        ],
      },
      {
        heading: 'Tabuzonen',
        paragraphs: [
          'Manche Bereiche sind für Selbstmassage nicht geeignet – unabhängig vom Gerät.',
        ],
        bullets: [
          'Wirbelsäule, Knochenvorsprünge und Gelenke aussparen',
          'Kniekehle, Leiste, Achselhöhle und Hals meiden',
          'Nicht auf Schwellungen, Blutergüssen oder frischen Verletzungen',
          'Nicht bei akuten Entzündungen, Thrombose oder Krampfadern',
        ],
        note: 'Bei Osteoporose, Gerinnungsstörungen, Herzschrittmacher oder in der Schwangerschaft vorher ärztlich beraten lassen.',
      },
    ],
    relatedProductSlugs: ['massagepistole-pro', 'faszienrolle-standard', 'massageball-duo'],
    relatedCategorySlugs: ['massage-recovery'],
  },
];

export const guideArticleBySlug = new Map(guideArticles.map((article) => [article.slug, article]));
