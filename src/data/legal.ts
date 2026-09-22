/**
 * ============================================================================
 * RECHTSTEXTE – ENTWURF, NICHT RECHTSVERBINDLICH
 * ============================================================================
 * ACHTUNG: Sämtliche Texte in dieser Datei sind STRUKTURVORLAGEN.
 *
 * Sie zeigen, welche Angaben ein in Deutschland/EU betriebener Online-Shop
 * benötigt und wie die Seiten technisch eingebunden werden. Sie sind
 * ausdrücklich KEINE Rechtsberatung und KEINE rechtsverbindlichen Texte.
 *
 * VOR DEM LIVEGANG MUSS JEDER DIESER TEXTE:
 *   1. durch die tatsächlichen Unternehmensdaten ersetzt,
 *   2. an das konkrete Geschäftsmodell angepasst und
 *   3. anwaltlich geprüft werden.
 *
 * Platzhalter sind mit [ECKIGEN KLAMMERN] gekennzeichnet.
 */

import type { Slug } from '@/lib/types';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalPage {
  slug: Slug;
  title: string;
  /** Kurzbeschreibung für Meta-Description und Übersicht. */
  summary: string;
  /** Muss der Text vor Veröffentlichung juristisch geprüft werden? */
  requiresLegalReview: boolean;
  sections: LegalSection[];
}

/** Standard-Warnhinweis, der auf jeder Rechtsseite ausgegeben wird. */
export const legalReviewNotice =
  'Dieser Text ist ein Entwurf und noch nicht rechtsverbindlich. Vor der Veröffentlichung des Shops muss er durch die tatsächlichen Unternehmensangaben ersetzt und anwaltlich geprüft werden. Platzhalter sind in eckigen Klammern gekennzeichnet.';

export const legalPages: LegalPage[] = [
  {
    slug: 'impressum',
    title: 'Impressum',
    summary: 'Anbieterkennzeichnung nach § 5 DDG (vormals TMG) – Entwurf.',
    requiresLegalReview: true,
    sections: [
      {
        heading: 'Angaben gemäß § 5 DDG',
        paragraphs: ['[FIRMIERUNG]', '[STRASSE UND HAUSNUMMER]', '[PLZ UND ORT]', '[LAND]'],
      },
      {
        heading: 'Vertreten durch',
        paragraphs: ['[NAME DER VERTRETUNGSBERECHTIGTEN PERSON / GESCHÄFTSFÜHRUNG]'],
      },
      {
        heading: 'Kontakt',
        paragraphs: [
          'Telefon: [TELEFONNUMMER]',
          'E-Mail: [E-MAIL-ADRESSE]',
        ],
      },
      {
        heading: 'Registereintrag',
        paragraphs: [
          'Eintragung im Handelsregister: [REGISTERGERICHT]',
          'Registernummer: [HRB-NUMMER]',
        ],
      },
      {
        heading: 'Umsatzsteuer-Identifikationsnummer',
        paragraphs: ['USt-IdNr. gemäß § 27a Umsatzsteuergesetz: [USt-IdNr.]'],
      },
      {
        heading: 'Verantwortlich für den Inhalt',
        paragraphs: ['[NAME], [ANSCHRIFT]'],
      },
      {
        heading: 'EU-Streitschlichtung',
        paragraphs: [
          'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Die jeweils aktuelle Adresse ist vor Veröffentlichung zu prüfen und hier einzutragen: [OS-PLATTFORM-LINK].',
          'Hinweis: Die Pflicht zur Verlinkung und ihre konkrete Ausgestaltung haben sich in der Vergangenheit geändert – bitte den aktuellen Stand anwaltlich prüfen lassen.',
        ],
      },
      {
        heading: 'Verbraucherstreitbeilegung',
        paragraphs: [
          '[ANGABE, OB EINE TEILNAHME AN EINEM STREITBEILEGUNGSVERFAHREN VOR EINER VERBRAUCHERSCHLICHTUNGSSTELLE ERFOLGT ODER NICHT]',
        ],
      },
    ],
  },
  {
    slug: 'datenschutz',
    title: 'Datenschutzerklärung',
    summary: 'Informationen zur Verarbeitung personenbezogener Daten nach DSGVO – Entwurf.',
    requiresLegalReview: true,
    sections: [
      {
        heading: 'Verantwortliche Stelle',
        paragraphs: [
          'Verantwortlich für die Datenverarbeitung auf dieser Website ist:',
          '[FIRMIERUNG], [ANSCHRIFT], [E-MAIL-ADRESSE]',
          '[GGF. KONTAKTDATEN DES DATENSCHUTZBEAUFTRAGTEN]',
        ],
      },
      {
        heading: 'Welche Daten wir derzeit verarbeiten',
        paragraphs: [
          'Diese Vorschau des Shops funktioniert weitgehend ohne serverseitige Datenverarbeitung. Konkret gilt aktuell:',
        ],
        bullets: [
          'Warenkorb und Favoriten werden ausschließlich lokal im Browser (localStorage) gespeichert und nicht an einen Server übertragen.',
          'Die Auswahl im Cookie-Banner wird ebenfalls nur lokal gespeichert.',
          'Beim Abschicken des Demo-Checkouts werden die eingegebenen Daten an den eigenen Server übertragen, dort geprüft und NICHT gespeichert.',
          'Beim Aufruf der Seiten fallen serverseitige Zugriffsdaten (Server-Logfiles) an: IP-Adresse, Zeitpunkt, aufgerufene Seite, Browsertyp.',
        ],
      },
      {
        heading: 'Rechtsgrundlagen',
        paragraphs: [
          'Die Verarbeitung erfolgt je nach Zweck auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb) oder lit. a DSGVO (Einwilligung, z. B. bei optionalen Cookies).',
          '[KONKRETE ZUORDNUNG DURCH RECHTSBERATUNG PRÜFEN LASSEN]',
        ],
      },
      {
        heading: 'Schriftarten',
        paragraphs: [
          'Die verwendeten Schriftarten werden vom eigenen Server ausgeliefert. Es findet dabei keine Verbindung zu Google-Servern statt.',
        ],
      },
      {
        heading: 'Cookies und lokale Speicherung',
        paragraphs: [
          'Technisch notwendige Speicherung: Warenkorb, Favoriten und Consent-Entscheidung.',
          'Optionale Kategorien (Statistik, Marketing) sind vorbereitet, aktuell aber nicht mit Diensten belegt.',
          '[SOBALD TRACKING ODER MARKETING EINGEBUNDEN WIRD, MUSS DIESER ABSCHNITT VOLLSTÄNDIG ERGÄNZT WERDEN – INKLUSIVE DIENSTEN, EMPFÄNGERN, SPEICHERDAÜR UND DRITTLANDTRANSFER.]',
        ],
      },
      {
        heading: 'Empfänger und Auftragsverarbeitung',
        paragraphs: [
          '[HOSTING-ANBIETER], [ZAHLUNGSDIENSTLEISTER], [VERSANDDIENSTLEISTER], [E-MAIL-DIENSTLEISTER] – jeweils mit Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.',
          'Derzeit ist keiner dieser Dienste angebunden.',
        ],
      },
      {
        heading: 'Speicherdauer',
        paragraphs: [
          '[ANGABE JE VERARBEITUNGSZWECK – insbesondere handels- und steuerrechtliche Aufbewahrungsfristen für Bestelldaten.]',
        ],
      },
      {
        heading: 'Deine Rechte',
        paragraphs: ['Dir stehen nach der DSGVO insbesondere folgende Rechte zu:'],
        bullets: [
          'Auskunft (Art. 15 DSGVO)',
          'Berichtigung (Art. 16 DSGVO)',
          'Löschung (Art. 17 DSGVO)',
          'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
          'Datenübertragbarkeit (Art. 20 DSGVO)',
          'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
          'Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
          'Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)',
        ],
      },
    ],
  },
  {
    slug: 'agb',
    title: 'Allgemeine Geschäftsbedingungen',
    summary: 'Vertragsbedingungen für Bestellungen – Entwurf, nicht rechtsverbindlich.',
    requiresLegalReview: true,
    sections: [
      {
        heading: '§ 1 Geltungsbereich',
        paragraphs: [
          'Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen, die Verbraucherinnen und Verbraucher sowie Unternehmen über den Online-Shop von [FIRMIERUNG] aufgeben.',
        ],
      },
      {
        heading: '§ 2 Vertragsschluss',
        paragraphs: [
          'Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar, sondern eine Aufforderung zur Bestellung.',
          'Mit dem Anklicken der Schaltfläche "Zahlungspflichtig bestellen" gibst du eine verbindliche Bestellung ab. Der Vertrag kommt zustande, sobald wir die Annahme bestätigen oder die Ware versenden.',
          'HINWEIS ZUR AKTUELLEN VORSCHAU: Solange der Shop mit Beispieldaten betrieben wird, kommt kein Vertrag zustande. Es werden keine Bestellungen angenommen und keine Zahlungen ausgelöst.',
        ],
      },
      {
        heading: '§ 3 Preise und Versandkosten',
        paragraphs: [
          'Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Zusätzlich fallen die im Bestellprozess ausgewiesenen Versandkosten an.',
          '[KONKRETE VERSANDKOSTEN UND FREIGRENZEN EINTRAGEN]',
        ],
      },
      {
        heading: '§ 4 Lieferung',
        paragraphs: [
          'Die Lieferung erfolgt an die angegebene Lieferadresse. Angegebene Lieferzeiten sind unverbindliche Richtwerte, sofern nichts anderes vereinbart wurde.',
          '[LIEFERGEBIETE UND AUSSCHLÜSSE EINTRAGEN]',
        ],
      },
      {
        heading: '§ 5 Zahlung',
        paragraphs: [
          'Die im Bestellprozess angebotenen Zahlungsarten stehen zur Verfügung.',
          '[ZAHLUNGSBEDINGUNGEN, FÄLLIGKEIT UND ZAHLUNGSDIENSTLEISTER EINTRAGEN]',
        ],
      },
      {
        heading: '§ 6 Eigentumsvorbehalt',
        paragraphs: ['Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.'],
      },
      {
        heading: '§ 7 Gewährleistung',
        paragraphs: [
          'Es gelten die gesetzlichen Gewährleistungsrechte.',
          '[ERGÄNZENDE REGELUNGEN FÜR UNTERNEHMERINNEN UND UNTERNEHMER PRÜFEN LASSEN]',
        ],
      },
      {
        heading: '§ 8 Hygieneartikel und versiegelte Waren',
        paragraphs: [
          'Bei bestimmten Produkten aus Gründen des Gesundheitsschutzes oder der Hygiene kann das Widerrufsrecht erlöschen, wenn die Versiegelung nach der Lieferung entfernt wurde.',
          '[KONKRETE PRODUKTGRUPPEN UND VERSIEGELUNGSHINWEISE JURISTISCH PRÜFEN LASSEN – relevant z. B. für Elektroden und körpernah getragene Artikel.]',
        ],
      },
    ],
  },
  {
    slug: 'widerruf',
    title: 'Widerrufsrecht',
    summary: 'Widerrufsbelehrung und Muster-Widerrufsformular – Entwurf.',
    requiresLegalReview: true,
    sections: [
      {
        heading: 'Widerrufsrecht für Verbraucherinnen und Verbraucher',
        paragraphs: [
          'Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
          'Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem du oder eine von dir benannte dritte Person, die nicht der Beförderer ist, die Waren in Besitz genommen hast bzw. hat.',
          'Um dein Widerrufsrecht auszuüben, musst du uns ([FIRMIERUNG], [ANSCHRIFT], [E-MAIL], [TELEFON]) mittels einer eindeutigen Erklärung über deinen Entschluss informieren.',
        ],
      },
      {
        heading: 'Folgen des Widerrufs',
        paragraphs: [
          'Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die wir von dir erhalten haben, einschließlich der Lieferkosten (mit Ausnahme zusätzlicher Kosten durch eine andere Lieferart als die günstigste Standardlieferung), unverzüglich und spätestens binnen vierzehn Tagen zurückzuzahlen.',
          '[REGELUNG ZU RÜCKSENDEKOSTEN EINTRAGEN]',
        ],
      },
      {
        heading: 'Ausschluss und vorzeitiges Erlöschen',
        paragraphs: [
          'Das Widerrufsrecht kann bei bestimmten Waren ausgeschlossen sein oder vorzeitig erlöschen – insbesondere bei versiegelten Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn die Versiegelung nach der Lieferung entfernt wurde.',
          '[KONKRETE ZUORDNUNG ZU PRODUKTGRUPPEN JURISTISCH PRÜFEN LASSEN]',
        ],
      },
      {
        heading: 'Muster-Widerrufsformular',
        paragraphs: [
          'Wenn du den Vertrag widerrufen willst, kannst du dieses Formular ausfüllen und zurücksenden:',
          'An [FIRMIERUNG], [ANSCHRIFT], [E-MAIL]:',
          'Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren: ______',
          'Bestellt am ______ / erhalten am ______',
          'Name der/des Verbraucher(s): ______',
          'Anschrift der/des Verbraucher(s): ______',
          'Unterschrift (nur bei Mitteilung auf Papier): ______',
          'Datum: ______',
        ],
      },
    ],
  },
  {
    slug: 'versand',
    title: 'Versand & Lieferung',
    summary: 'Versandarten, Kosten und Lieferzeiten – Entwurf mit Platzhalterkonditionen.',
    requiresLegalReview: true,
    sections: [
      {
        heading: 'Versandarten und Kosten',
        paragraphs: [
          'Die im Checkout angezeigten Versandarten und Preise sind Platzhalter, solange kein Versanddienstleister beauftragt ist.',
        ],
        bullets: [
          'Standardversand: 4,95 € – voraussichtlich 2–4 Werktage',
          'Expressversand: 12,90 € – voraussichtlich 1–2 Werktage',
          'Abholung: kostenfrei, sobald ein Standort verfügbar ist',
          'Versandkostenfrei ab einem Bestellwert von 49 € (Standardversand)',
        ],
      },
      {
        heading: 'Lieferzeiten',
        paragraphs: [
          'Angegebene Lieferzeiten sind unverbindliche Richtwerte und gelten ab Zahlungseingang bzw. Vertragsschluss.',
          'Bei Artikeln im Direktversand des Herstellers (Dropshipping) kann die Lieferzeit abweichen. Solche Artikel sind auf der Produktseite entsprechend gekennzeichnet.',
        ],
      },
      {
        heading: 'Liefergebiete',
        paragraphs: ['[LIEFERLÄNDER, TEILLIEFERUNGEN UND AUSNAHMEN EINTRAGEN]'],
      },
    ],
  },
  {
    slug: 'zahlung',
    title: 'Zahlungsarten',
    summary: 'Vorgesehene Zahlungsarten – aktuell ist kein Anbieter angebunden.',
    requiresLegalReview: true,
    sections: [
      {
        heading: 'Aktueller Stand',
        paragraphs: [
          'Es ist derzeit KEIN Zahlungsanbieter angebunden. Der Checkout zeigt den vorgesehenen Ablauf, löst aber keine Zahlung aus und speichert keine Zahlungsdaten.',
        ],
      },
      {
        heading: 'Vorgesehene Zahlungsarten',
        paragraphs: ['Zum Start sind folgende Zahlungsarten geplant:'],
        bullets: [
          'Kauf auf Rechnung',
          'Kreditkarte (Visa, Mastercard, American Express)',
          'PayPal',
          'Sofortüberweisung',
          'Apple Pay',
          'Vorkasse per Überweisung',
        ],
      },
      {
        heading: 'Sicherheit',
        paragraphs: [
          'Zahlungsdaten werden im Live-Betrieb ausschließlich beim jeweiligen Zahlungsdienstleister verarbeitet. HEAL ACTIVE speichert keine vollständigen Kartendaten.',
          '[KONKRETE ANGABEN ERGÄNZEN, SOBALD DER ANBIETER FESTSTEHT – inkl. Auftragsverarbeitungsvertrag und Datenschutzhinweisen.]',
        ],
      },
    ],
  },
  {
    slug: 'produktsicherheit',
    title: 'Produktsicherheit & Herstellerinformationen',
    summary: 'Angaben nach der EU-Produktsicherheitsverordnung (GPSR) – Entwurf.',
    requiresLegalReview: true,
    sections: [
      {
        heading: 'Warum diese Seite existiert',
        paragraphs: [
          'Die EU-Verordnung über die allgemeine Produktsicherheit (GPSR) verpflichtet Online-Händler, zu jedem Produkt bestimmte Angaben bereitzustellen – unter anderem Hersteller, verantwortliche Person in der EU, Kontaktdaten sowie Warn- und Sicherheitshinweise.',
        ],
      },
      {
        heading: 'Aktueller Stand',
        paragraphs: [
          'Der Shop wird derzeit mit Beispieldaten betrieben. Es bestehen keine Herstellerbeziehungen, und es liegen keine Herstellerangaben vor.',
          'Vor dem Livegang werden zu jedem Produkt folgende Angaben eingepflegt und auf der Produktseite ausgegeben.',
        ],
        bullets: [
          'Name, eingetragener Handelsname oder Marke des Herstellers',
          'Postanschrift und elektronische Adresse des Herstellers',
          'Bei Herstellern außerhalb der EU: verantwortliche Person in der EU mit Kontaktdaten',
          'Angaben zur Produktidentifikation (Typ, Charge, Seriennummer)',
          'Warnhinweise und Sicherheitsinformationen in deutscher Sprache',
          'Gebrauchsanweisung, soweit erforderlich',
          'Konformitätsangaben, soweit einschlägig (z. B. CE-Kennzeichnung bei Elektrogeräten)',
        ],
      },
      {
        heading: 'Besonderheiten bei Elektrostimulationsgeräten',
        paragraphs: [
          'EMS- und TENS-Geräte unterliegen zusätzlichen Anforderungen. Vor der Aufnahme ins Sortiment sind unter anderem Konformitätserklärung, Gebrauchsanweisung in deutscher Sprache und die vollständige Liste der Gegenanzeigen vom Hersteller anzufordern.',
          '[PRÜFEN: Einstufung als Medizinprodukt und daraus folgende Pflichten.]',
        ],
      },
      {
        heading: 'Produktsicherheitsmeldung',
        paragraphs: [
          'Sollte dir ein Sicherheitsproblem an einem Produkt auffallen, melde dich bitte unter [E-MAIL-ADRESSE]. Wir gehen jedem Hinweis nach.',
        ],
      },
    ],
  },
  {
    slug: 'barrierefreiheit',
    title: 'Erklärung zur Barrierefreiheit',
    summary: 'Stand der Zugänglichkeit und geplante Maßnahmen.',
    requiresLegalReview: true,
    sections: [
      {
        heading: 'Unser Anspruch',
        paragraphs: [
          'HEAL ACTIVE richtet sich an Menschen mit sehr unterschiedlichen körperlichen Voraussetzungen. Eine zugängliche Website ist deshalb kein Zusatz, sondern Teil des Produkts.',
          'Ziel ist die Erfüllung der WCAG 2.2 auf Stufe AA. Für den Betrieb in Deutschland ist zusätzlich das Barrierefreiheitsstärkungsgesetz (BFSG) zu berücksichtigen.',
        ],
      },
      {
        heading: 'Was bereits umgesetzt ist',
        paragraphs: ['Im aktuellen Stand sind unter anderem umgesetzt:'],
        bullets: [
          'Durchgängige Tastaturbedienbarkeit inklusive sichtbarem Fokusring',
          'Sprunglink zum Hauptinhalt',
          'Semantische Überschriftenstruktur und Landmarken',
          'Klickbare Körperregionen mit textlicher Alternative als Linkliste',
          'Aufklappbare Inhalte über native details/summary-Elemente',
          'Berücksichtigung von prefers-reduced-motion',
          'Touchflächen von mindestens 44 x 44 Pixeln in der Navigation',
          'Filter und Sortierung funktionieren ohne JavaScript',
        ],
      },
      {
        heading: 'Was noch aussteht',
        paragraphs: ['Vor dem Livegang sind insbesondere noch offen:'],
        bullets: [
          'Prüfung aller Farbkontraste gegen WCAG 2.2 AA mit echten Inhalten',
          'Test mit Screenreadern (NVDA, VoiceOver) über alle Kernprozesse',
          'Alternativtexte für echte Produktfotos und Illustrationen',
          'Untertitel und Transkripte für Übungs- und Tape-Videos',
          'Externer Accessibility-Audit und Feedback-Mechanismus',
        ],
      },
      {
        heading: 'Barriere melden',
        paragraphs: [
          'Wenn dir eine Barriere auffällt, schreib uns an [E-MAIL-ADRESSE]. Wir nehmen Hinweise ernst und bessern nach.',
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie-Einstellungen',
    summary: 'Welche Cookies und lokalen Speicher HEAL ACTIVE verwendet.',
    requiresLegalReview: true,
    sections: [
      {
        heading: 'Aktuell verwendete Speicherung',
        paragraphs: [
          'Der Shop setzt derzeit keine Tracking- oder Marketing-Cookies. Genutzt wird ausschließlich die lokale Speicherung im Browser:',
        ],
        bullets: [
          'heal-active:cart:v1 – Inhalt des Warenkorbs (localStorage, technisch notwendig)',
          'heal-active:favorites:v1 – gemerkte Produkte (localStorage, technisch notwendig)',
          'heal-active:consent:v1 – deine Auswahl im Cookie-Banner (localStorage, technisch notwendig)',
          'heal-active:last-order:v1 – Demo-Bestellbestätigung (sessionStorage, wird beim Schließen des Browsers gelöscht)',
        ],
      },
      {
        heading: 'Auswahl ändern',
        paragraphs: [
          'Deine Consent-Entscheidung liegt im lokalen Speicher deines Browsers. Wenn du sie zurücksetzen möchtest, lösche die Website-Daten in den Browsereinstellungen – der Banner erscheint danach erneut.',
          '[VOR DEM LIVEGANG: Der Banner muss durch eine vollwertige Consent-Lösung ersetzt werden, die das Laden von Skripten tatsächlich steuert und Einwilligungen protokolliert.]',
        ],
      },
    ],
  },
];

export const legalPageBySlug = new Map(legalPages.map((page) => [page.slug, page]));
