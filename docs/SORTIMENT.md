# Sortiment – Analyse und Produktauswahl

Arbeitsgrundlage für die Sortimentsentscheidung von HEAL ACTIVE.
Je Kategorie: welche Produkttypen am Markt am stärksten nachgefragt werden,
worauf es beim Einkauf ankommt, welches Beispielprodukt im Shop den Platz
belegt und welche Hersteller als Lieferanten in Frage kommen.

> **Einordnung:** Die genannten Marken sind **öffentlich bekannte Hersteller
> und Vorbilder am Markt**. Es besteht **keine** Geschäftsbeziehung. Im Katalog
> stehen weiterhin nur Beispieldaten (`MUSTERMARKE A–H`). Kandidaten werden in
> `SUPPLIERS.md` mit Status „Noch nicht kontaktiert“ geführt. Alle Angaben vor
> dem Erstkontakt prüfen.

Stand: 11/2026 · Abdeckung: **74 von 74 Unterkategorien** mit mindestens einem
Produkt (abgesichert durch `tests/data-integrity.test.ts`).

---

## Auswahlkriterien

Ein Produkt kommt ins Sortiment, wenn es

1. **zur Customer Journey passt**: Es lässt sich einer Körperregion, einem Ziel und mindestens einer Übung oder Anleitung zuordnen.
2. **ohne Heilversprechen verkauft werden kann**: Nutzen liegt in Führung, Training, Wahrnehmung oder Komfort.
3. **eine gesunde Kalkulation erlaubt**: Zielmarge ≥ 35 % (siehe Kalkulationsraster in `SUPPLIERS.md`).
4. **sauber dokumentiert geliefert wird**: GPSR-Angaben, deutsche Gebrauchsanweisung, bei Elektrogeräten Konformität bzw. MDR-Klärung.
5. **Folgekäufe erzeugt**: Verbrauchsmaterial wie Tapes, Elektroden und Pads oder Zubehör wie Türanker und Aufsätze.

---

## 1. Bandagen & Support

| Nachgefragter Typ | Worauf es ankommt | Im Shop |
|---|---|---|
| Kniebandage mit Ringpelotte | Gestrick-Zonen, Silikonhaftband, 5+ Größen | `kniebandage-aktiv` |
| Sprunggelenkbandage mit Stabilisierung | seitliche Stäbe oder Gurte, links/rechts | `sprunggelenkbandage-stabil` |
| Fuß-/Gewölbebandage | flach genug für den Laufschuh | `fussbandage-gewoelbe` **neu** |
| Hüft-/Leistenbandage | Taillengurt gegen Verrutschen, Wärme | `hueftbandage-thermo` **neu** |
| Unterarm-Kompressionsärmel | abgestufte Kompression, Haftband | `unterarm-kompressionsaermel` **neu** |
| Daumenbandage mit Schiene | formbare, herausnehmbare Schiene | `daumenbandage-stabil` **neu** |
| Fingerschlaufen (Buddy) | wiederverwendbar statt Tape | `fingerschlaufen-set` **neu** |

**Kandidaten:** Bauerfeind, medi, Push (Nea International), Mueller, McDavid, Zamst.
**Achtung:** Viele Bandagen und Orthesen sind **Medizinprodukte (MDR)**. Status je Artikel beim Hersteller erfragen und Texte entsprechend prüfen (HWG).

## 2. Tapes

| Nachgefragter Typ | Worauf es ankommt | Im Shop |
|---|---|---|
| Kinesiologie-Tape 5 cm × 5 m | Kleber, Wasserresistenz, Farbauswahl | `kinesiologie-tape-classic` |
| Kinesiologie-Tape vorgeschnitten | Anfänger-Zielgruppe, passt zu TAPE YOURSELF | `tape-set-knie-precut` **neu** |
| Rigides Zinkoxid-Tape 3,8 cm | Reißbarkeit, Klebkraft | `sport-tape-rigid` |
| Kohäsive Bandage | latexfrei, von Hand reißbar | `kohaesive-sportbandage` **neu** |
| Tape-Unterzug | dünn, nicht verrutschend | `tape-unterzug-schaum` **neu** |
| Haftspray & Remover | Folgekauf, hohe Marge | `tape-haftspray` **neu** |
| Gürtelhalter | für Vereine und Betreuer | `tape-guertelhalter` **neu** |

**Kandidaten:** Kinesio (Original-Methode), Leukotape bzw. Leukoplast (Essity), Mueller, K-Active, Kintex.
**Tipp:** Vorgeschnittene Sets plus Anleitung sind der ideale Einstieg und koppeln den Shop direkt an die TAPE-YOURSELF-Inhalte.

## 3. Trainingsbänder

| Nachgefragter Typ | Worauf es ankommt | Im Shop |
|---|---|---|
| Übungsband als Meterware | Farbsystem, latexfreie Alternative | `theraband-uebungsband` |
| Textil-Minibands | rutschen nicht, rollen sich nicht ein | `miniband-set-textil` |
| Powerband 208 cm | laminiert, 4 Stärken, Klimmzughilfe | `powerband-lang` **neu** |
| Systemband mit Schlaufen | fein dosierbar, latexfrei | `systemband-loop-stufen` **neu** |
| Tube mit Griffen | Schutzmantel gegen Zurückschnellen | `tube-mit-griffen` **neu** |
| Türanker | Pflichtzubehör mit hohem Folgekauf-Potenzial | `tueranker-sicher` **neu** |
| Manschetten/Karabiner | Zubehör für Hüfttraining | `fussmanschetten-set` **neu** |

**Kandidaten:** TheraBand (Performance Health), Thera-Band-Vertrieb über Artzt, Sissel, Blackroll (Loop/Super Band), Bodylastics.
**Tipp:** Türanker und Manschetten als „passendes Zubehör“ verknüpfen. Das ist einer der einfachsten Hebel für einen höheren Warenkorbwert.

## 4. Balance & Koordination

| Nachgefragter Typ | Worauf es ankommt | Im Shop |
|---|---|---|
| Balance Pad (Schaum) | Einstiegsprodukt, Härte, Größe | `balance-pad-sensomotorik` |
| Balance-Halbkugel | Belastbarkeit, Pumpe | `balance-halbball-trainer` |
| Kuppel-Set in 3 Stufen | Progression in einem Produkt | `balance-trainer-stufenset` **neu** |
| Balance Board mit Rolle | Fortgeschrittene, Wintersport | `balance-board-rolle` **neu** |
| Fuß-Balance-Pads | STRONG FEET, Büro | `fuss-balance-pads-duo` **neu** |
| Koordinationsmatte | verrutscht nicht (vs. Seilleiter) | `koordinationsleiter-matte` **neu** |
| Massageball-Set Fuß | drei Härten | `reflexball-set-fuss` **neu** |
| Propriozeptions-System | Praxen und Return-to-Sport | `propriozeption-plattenset` **neu** |

**Kandidaten:** TOGU, Airex, Pinofit, Sissel, Artzt vitality.

## 5. Massage & Recovery

| Nachgefragter Typ | Worauf es ankommt | Im Shop |
|---|---|---|
| Massagepistole | Lautstärke, Akku, Aufsätze, Garantie | `massagepistole-pro` |
| Faszienrolle | Härtegrade, Oberfläche | `faszienrolle-standard` |
| Faszienball Ø 8 cm | günstiger Zusatzartikel | `faszienball-einzeln` **neu** |
| Triggerpunkt-Haken | Nacken/Schulter ohne Partner | `triggerpunkt-stick` **neu** |
| Hot/Cold-Pack | Fixierbandage, Bezug | `hot-cold-pack-set` **neu** |

**Kandidaten:** Blackroll, Hyperice, Therabody, Sissel, Beurer.

## 6. EMS / TENS

| Nachgefragter Typ | Worauf es ankommt | Im Shop |
|---|---|---|
| Kombigerät EMS/TENS | Programme, Akku, Elektroden | `ems-tens-kombigeraet` |
| EMS-Gerät 4 Kanäle | getrennt regelbare Kanäle | `ems-geraet-4-kanal` **neu** |
| TENS-Gerät 2 Kanäle | einfache Bedienung | `tens-geraet-2-kanal` **neu** |
| Elektroden/Langzeitpads | **wichtigster Folgekauf** | `elektroden-set`, `ems-langzeitpads` **neu** |
| Kabel, Case, Pflegespray | Zubehör, hohe Marge | `ems-ersatzkabel`, `ems-aufbewahrungscase`, `elektroden-kontaktspray` **neu** |

**Kandidaten:** Compex, Beurer, Sanitas, Prorelax, axion.
**Achtung:** TENS-Geräte sind in der Regel **Medizinprodukte**, EMS-Geräte teils ebenfalls. Vor der Listung sind CE- und MDR-Klasse, Konformitätserklärung und deutsche Gebrauchsanweisung zu klären. Werbeaussagen streng prüfen (HWG).

## 7. Yoga & Mobility

| Nachgefragter Typ | Worauf es ankommt | Im Shop |
|---|---|---|
| Yogamatte mit Grip | Material (PU/Naturkautschuk/TPE), Stärke | `yogamatte-grip` |
| Kork-Block | Nachhaltigkeit | `yoga-block-kork` |
| Mobility-Stab | Griffmarkierung, teilbar | `mobility-stick` **neu** |
| Yoga-Rad | Belastbarkeit, Polsterung | `yoga-rad` **neu** |
| Mobility-Buch | 7 % MwSt., Dropshipping über Verlag/Barsortiment | `mobility-buch-alltag` **neu** |
| Übungskarten | koppelt Bänder, Bälle und Übungen | `uebungskarten-set` **neu** |

**Kandidaten:** Manduka, Liforme, Yogistar, Bodhi, Lotuscrafts. Bücher über ein Barsortiment (z. B. Libri, KNV-Zeitfracht) oder direkt beim Verlag.

## 8. Sport & Lifestyle

| Nachgefragter Typ | Worauf es ankommt | Im Shop |
|---|---|---|
| Trinkflasche | BPA-frei, auslaufsicher | `trinkflasche-sport` |
| Funktionsshirt | Material, Passform | `funktionsshirt-active` |
| Trainingshose | Stretch, Tasche, Bund | `trainingshose-move` **neu** |
| Recovery-Slides | stoßdämpfender Schaum | `recovery-slides` **neu** |

**Kandidaten:** Eigenmarke über Textil-Veredler (Branding mit dem laufenden Skelett), für Slides etablierte Recovery-Schuhmarken (z. B. OOFOS, Hoka).
**Tipp:** Hier lohnt sich eine **Eigenmarke**. Shirts, Hosen und Flaschen mit dem HEAL-ACTIVE-Logo machen die Marke sichtbar und erzielen höhere Margen.

---

## Prioritäten für den Einkauf (Vorschlag)

1. **Tapes und Elektroden/Pads**: wenig Kapital, hoher Folgekauf, passt zu TAPE YOURSELF.
2. **Bänder plus Zubehör** (Türanker, Manschetten): günstig, gut zu bündeln, ideal für Dropshipping.
3. **Bandagen Knie, Sprunggelenk, Fuß**: Kernsortiment der Customer Journey. MDR-Status klären.
4. **Balance-Einstieg** (Pad, Kuppel-Set): verbindet Shop und Übungsbibliothek.
5. **Recovery-Geräte**: hoher Warenkorbwert, aber Garantie, Retouren und Elektro-Pflichten (ElektroG, WEEE-Registrierung) beachten.
