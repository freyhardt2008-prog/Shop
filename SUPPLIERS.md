# SUPPLIERS – Herstellerrecherche HEAL ACTIVE

Arbeitsdatei für die systematische Hersteller- und Lieferantenrecherche.
Ziel: Hersteller strukturiert kontaktieren, Händlerkonditionen erfragen,
Ergebnisse festhalten und den nächsten Schritt nie aus den Augen verlieren.

> **Wichtig:** In diesem Repository sind **keine** echten Hersteller,
> Kontaktdaten oder Konditionen hinterlegt. Die Tabellen unten sind leer und
> werden von dir befüllt. Auch `src/data/manufacturers.ts` enthält
> ausschließlich neutrale Platzhalter mit dem Status „Noch nicht kontaktiert“.

---

## 1. Status-Workflow

Jeder Hersteller durchläuft dieselben Stufen. Dieselben Stufen liegen als
Datentyp in `src/lib/types.ts` (`ManufacturerStatus`) und werden im Admin
unter `/admin/hersteller` als Pipeline angezeigt.

| # | Status | Bedeutung | Nächster Schritt |
| --- | --- | --- | --- |
| 1 | Noch nicht kontaktiert | recherchiert, aber noch kein Kontakt | Anruf oder Erstmail |
| 2 | Kontakt aufgenommen | Erstgespräch geführt | Unterlagen anfordern |
| 3 | Unterlagen angefordert | Katalog/Preisliste/Formular angefragt | nachfassen nach 7 Tagen |
| 4 | Händlerkonditionen erhalten | EK-Preise und Bedingungen liegen vor | kalkulieren |
| 5 | Verhandlung | Konditionen werden verhandelt | Abschluss oder Absage |
| 6 | Freigeschaltet | Lieferant aktiv, Produkte gelistet | Produktdaten einpflegen |
| 7 | Abgelehnt | passt nicht (Konditionen, MBW, Sortiment) | Grund notieren |

---

## 2. Recherchetabelle

Pro Hersteller eine Zeile. Leere Felder bedeuten: noch offen.

| Hersteller | Produktgruppe | Ansprechpartner | Telefon | E-Mail | Website | Händlerregistrierung | Mindestbestellwert | Einkaufskonditionen | Dropshipping | Lieferzeit | Bild-/Medienrechte | Produktdaten vorhanden | Gespräch geführt am | Ergebnis | Nächster Schritt | Notizen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

### Feldbedeutung

| Feld | Was hineingehört |
| --- | --- |
| **Hersteller** | Firmierung wie im Impressum |
| **Produktgruppe** | Bandagen, Tapes, Trainingsbänder, Balance, Massage/Recovery, EMS/TENS, Yoga/Mobility, Sport/Lifestyle |
| **Ansprechpartner** | Name + Funktion (Vertrieb, Key Account, Innendienst) |
| **Telefon** | Durchwahl, nicht die Zentrale |
| **E-Mail** | persönliche Adresse schlägt info@ |
| **Website** | Herstellerseite, ggf. B2B-Portal |
| **Händlerregistrierung** | Formular nötig? Gewerbenachweis? Online-Portal? |
| **Mindestbestellwert** | MBW für Erst- und Folgebestellung |
| **Einkaufskonditionen** | Rabattstaffel, Skonto, Zahlungsziel, Boni |
| **Dropshipping** | ja/nein, Gebühr, Lieferschein neutral? |
| **Lieferzeit** | ab Lager / Vorlaufzeit |
| **Bild-/Medienrechte** | Nutzungsrecht für Shop, Social Media, Werbung |
| **Produktdaten vorhanden** | CSV, PIM, API? Welche Felder? |
| **Gespräch geführt am** | Datum |
| **Ergebnis** | Kurzfazit in einem Satz |
| **Nächster Schritt** | konkrete Aktion mit Datum |
| **Notizen** | alles Weitere |

---

## 3. Gesprächsleitfaden für den Erstkontakt

Ziel des ersten Anrufs: herausfinden, ob eine Zusammenarbeit überhaupt
möglich ist – und den nächsten Schritt vereinbaren.

### Einstieg

> „Guten Tag, mein Name ist **[Name]**. Ich baue gerade **HEAL ACTIVE** auf –
> einen Online-Shop für Produkte rund um Bewegung, Recovery, Rehabilitation und
> Sport. Ihr Sortiment im Bereich **[Produktgruppe]** würde sehr gut dazu
> passen. Können Sie mir sagen, wer bei Ihnen für Neukunden im Fachhandel
> zuständig ist?“

### Die zwölf Fragen

1. Beliefern Sie Online-Händler – und gibt es dafür Auflagen?
2. Wie läuft die Händlerregistrierung ab, welche Nachweise brauchen Sie?
3. Wie sehen die Einkaufskonditionen aus (Rabattstaffel, Skonto, Zahlungsziel)?
4. Gibt es einen Mindestbestellwert – für die Erst- und für Folgebestellungen?
5. Bieten Sie Dropshipping an? Mit welcher Gebühr, und ist der Lieferschein neutral?
6. Wie lang sind Ihre Lieferzeiten, und was ist ab Lager verfügbar?
7. Stellen Sie Produktdaten bereit (Texte, Maße, EAN, Bilder) – in welchem Format?
8. Erhalte ich die Nutzungsrechte an den Produktbildern für Shop und Werbung?
9. Gibt es Preisbindung, UVP-Vorgaben oder Vorgaben zu Marktplätzen?
10. Wie handhaben Sie Retouren und Gewährleistung gegenüber Händlern?
11. Welche Unterlagen gibt es zur Produktsicherheit (GPSR, Konformität, CE)?
12. Gibt es Gebietsschutz oder eine Begrenzung der Händlerzahl?

### Abschluss

> „Vielen Dank. Können Sie mir die Unterlagen per E-Mail an **[E-Mail]**
> schicken? Ich melde mich dann bis **[Datum]** mit einer Rückmeldung.“

Danach sofort: Status auf **Unterlagen angefordert** setzen und den nächsten
Schritt mit Datum eintragen.

---

## 4. Unterlagen-Checkliste je Hersteller

- [ ] Händlerregistrierungsformular ausgefüllt
- [ ] Gewerbeanmeldung / Handelsregisterauszug übermittelt
- [ ] USt-IdNr. hinterlegt
- [ ] Aktuelle Preisliste (EK) erhalten
- [ ] Rabattstaffel und Zahlungsziel schriftlich
- [ ] Mindestbestellwert schriftlich
- [ ] Dropshipping-Bedingungen schriftlich
- [ ] Produktdatenblatt / CSV / API-Zugang
- [ ] Bildmaterial inkl. **schriftlicher** Nutzungsrechte
- [ ] Sicherheitsdatenblätter und Gebrauchsanweisungen (deutsch)
- [ ] GPSR-Angaben: Hersteller, EU-Verantwortlicher, Kontaktdaten
- [ ] Konformitätserklärung bei Elektrogeräten (EMS/TENS)
- [ ] Klärung: Medizinprodukt ja/nein (MDR-Relevanz)
- [ ] Retouren- und Gewährleistungsregelung

---

## 5. Kalkulationsraster

Für jedes Produkt vor der Listung durchrechnen:

| Position | Formel | Beispiel |
| --- | --- | --- |
| EK netto | vom Hersteller | 18,90 € |
| + Versandkostenanteil Wareneingang | EK × Faktor | 0,60 € |
| = Einstandspreis | | 19,50 € |
| VK netto | VK brutto ÷ 1,19 | 33,57 € |
| Rohertrag | VK netto − Einstandspreis | 14,07 € |
| Marge | Rohertrag ÷ VK netto | 42 % |
| VK brutto | | 39,95 € |
| UVP Hersteller | | 44,95 € |

**Faustregeln für die Sortimentsentscheidung**

* Marge unter 35 % → nur bei sehr hoher Drehung oder als Ergänzungsartikel
* Mindestbestellwert über dem geplanten Monatsumsatz der Gruppe → zunächst Dropshipping prüfen
* Keine Bildrechte → nur listen, wenn eigene Fotos produziert werden
* Keine GPSR-Angaben → **nicht listen**

---

## 6. Priorisierung nach Kategorie

Reihenfolge der Recherche, abgeleitet aus der Bedeutung im Shopkonzept:

| Priorität | Kategorie | Begründung |
| --- | --- | --- |
| 1 | Bandagen & Support | Einstiegskategorie, höchste Nachfrage über den Körpernavigator |
| 2 | Balance & Koordination | Kern des Bereichs STRONG FEET – STRONG BODY |
| 3 | Tapes | Verbindung zu TAPE YOURSELF, hohe Wiederkaufrate |
| 4 | Trainingsbänder | günstiger Einstieg, gute Marge, kleine Logistik |
| 5 | Massage & Recovery | hohe Warenkörbe, starke Bildsprache |
| 6 | Yoga & Mobility | ergänzt Übungsbibliothek |
| 7 | EMS & TENS | höchster regulatorischer Aufwand, später angehen |
| 8 | Sport & Lifestyle | Ergänzung, ggf. später als Eigenmarke |

---

## 7. Fortschritt

| Kategorie | Recherchiert | Kontaktiert | Konditionen | Freigeschaltet |
| --- | --- | --- | --- | --- |
| Bandagen & Support | 0 | 0 | 0 | 0 |
| Tapes | 0 | 0 | 0 | 0 |
| Trainingsbänder | 0 | 0 | 0 | 0 |
| Balance & Koordination | 0 | 0 | 0 | 0 |
| Massage & Recovery | 0 | 0 | 0 | 0 |
| EMS & TENS | 0 | 0 | 0 | 0 |
| Yoga & Mobility | 0 | 0 | 0 | 0 |
| Sport & Lifestyle | 0 | 0 | 0 | 0 |

---

## 8. Wiedervorlage

| Datum | Hersteller | Worum geht es | Erledigt |
| --- | --- | --- | --- |
|  |  |  | ☐ |
|  |  |  | ☐ |
|  |  |  | ☐ |
|  |  |  | ☐ |
|  |  |  | ☐ |
