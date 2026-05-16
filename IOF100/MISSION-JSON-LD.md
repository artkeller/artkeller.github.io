# Lehrstunde II: Anatomie eines realen Mission-Files (Datengetriebene Governance in der Praxis)

## TL;DR (Das Wichtigste in 30 Sekunden)
* **Was wir hier sehen:** Ein echtes, voll funktionsfähiges `Mission`-Dokument (`open-iof/1.0`) vom 16. Mai 2026 für die DACH-Region.
* **Der Zweck:** Es überwacht die Erreichbarkeit kritischer digitaler Infrastrukturen (Medien, Energie, Behörden, Carrier).
* **Das Ergebnis:** Von 32 geprüften Knoten sind 28 fehlerfrei ("PASS")[cite: 97, 99]. [cite_start]4 Knoten (darunter Großkaliber wie `admin.ch` und `enbw.com`) sind aktuell nicht gut erreichbar und stehen unter "semantischer Quarantäne" (`SuspectedNodes`).
* **Warum das genial ist:** Das Dokument kombiniert die harten Fakten eines Netzwerk-Scans mit den juristischen/organisatorischen Rahmenbedingungen (`Policies`) in einem einzigen, kryptografisch verifizierbaren Graph-Knoten.

---

## Die Sektionen im Tiefen-Audit

Gehen wir Schritt für Schritt durch das [Dokument](./assets/tutorial/iof-mission-dach-regional-2026-05-16.jsonld), um zu verstehen, wie die Maschine diese Daten interpretiert.

### 1. Die Metadaten & Die Semantische Autorität
```json
"@id": "urn:iof:mission:20260516T103351-dach-regional",
"@type": "Mission",
"identity": {
  "profile": "preservation",
  "authority": {
    "@type": "iof:SemanticAuthority",
    "organisation": "secon trust consult",
    "offlineCapable": true,
    "preservationClass": "LTP-A"
  }
}

```

* **Die unerbittliche ID:** Das Dokument hat eine feste URN (`urn:iof:mission:...`). Es ist damit ortsunabhängig und kann auf jedem Server der Welt ohne Adresskonflikte gelagert werden.

* **Langzeit-Zertifizierung:** `"preservationClass": "LTP-A"` deklariert dieses File nach höchsten Archivierungsstandards (Long-Term Preservation, Klasse A). Die Eigenschaft `"offlineCapable": true` erzwingt, dass alle zur Verifizierung notwendigen Schemata lokal auflösbar sein müssen. Es gibt keine externen HTTP-Abhängigkeiten.



### 2. Der Puls-Check: Readiness & Statistics

```json
"readiness": {
  "@type": "Readiness",
  "structural": "PASS",
  "deep": "PASS",
  "colourState": "GRN"
},
"statistics": {
  "@type": "Statistics",
  "resolvedCount": 28,
  "suspectedCount": 4
}

```

* **Der Ampelstatus:** Das System aggregiert den Zustand des gesamten Scans in einen einzigen Wert: `GRN` (Grün). Trotz vier ausgefallener Knoten befindet sich die Gesamt-Infrastruktur innerhalb der erlaubten Toleranzschwellen.


* **Mathematische Validierung:** `"structural": "PASS"` bedeutet, dass die JSON-LD-Struktur fehlerfrei ist; `"deep": "PASS"` bestätigt, dass auch die referenzierten Sub-Richtlinien logisch konsistent sind.



### 3. Das Regelwerk: Policies & Profile

Hier schlägt das Herz der Governance. Das File dokumentiert nicht nur *dass* gemessen wurde, sondern *wie* und unter welchen *Grenzwertevorgaben*.

* **Das Analyse-Profil (`standard-analysis`):** Es definiert die mathematische Gewichtung der Ausfälle. Infrastruktur-Knoten wie Backbone-Router wiegen schwerer (Faktor 5) als länderspezifische Endpunkte (Faktor 1). Die Latenz-Grenzwerte sind strikt: Bis 500ms ist alles "gut", ab 4000ms bricht das System ab (`critical`).

* **Das Mess-Profil (`passive-standard`):** Das ist der rechtliche Schutzschild des Monitors. Es wird dokumentiert, dass sich der Scanner strikt an die `robots.txt` hält, keine Authentifizierung umgeht (`No authentication bypass`) und maximal 1 Request pro Minute pro URL abfeuert, um nicht als DDoS-Angriff gewertet zu werden.



---

## Der Graph in Aktion: Gut vs. Böse

Die semantische Trennung zwischen funktionierenden und korrupten Knoten ist im Dokument meisterhaft gelöst.

### Der Normalfall: `ResolvedNodes`

Ein funktionierender Knoten wie die Telekom oder ARTE wird flach indiziert:

```json
{
  "@id": "urn:iof:node:www.telekom.de",
  "@type": "ResolvedNode",
  "url": "[https://www.telekom.de](https://www.telekom.de)",
  "domain": "carrier",
  "countries": ["DE"]
}

```

**Was passiert im Hintergrund?** Der RDF-Graph zieht eine unzerbrechliche Linie: `www.telekom.de` -> gehört zu Domain -> `carrier`. Wenn morgen die Webseite offline geht, wandert dieser Knoten in die nächste Sektion.

### Die Quarantäne: `SuspectedNodes`

Vier Knoten haben den Validierungszeitpunkt verpasst, darunter das Schweizer Regierungsportal `www.admin.ch`. Das System stößt sie nicht aus (denn das würde die historische Dokumentation verfälschen), sondern belegt sie mit einem **Verdachts-Zustand**:

```json
{
  "@id": "urn:iof:node:www.admin.ch",
  "@type": "SuspectedNode",
  "url": "[https://www.admin.ch](https://www.admin.ch)",
  "suspect": {
    "@type": "SuspectedState",
    "reason": "unreachable at validation time",
    "note": "Transient conditions possible. Scanner may re-evaluate independently."
  }
}

```

**Die semantische Relevanz:** Durch den Typ `SuspectedNode` wissen nachfolgende Systeme sofort, dass die Daten dieses Knotens mit Vorsicht zu genießen sind. Der Eintrag `"testedAt"` liefert den zeitlichen Anker für den Ausfall. Es wird festgehalten: Es könnte ein temporäres Netzwerkproblem sein (`Transient conditions possible`), weshalb eine automatische Nachprüfung erlaubt ist.

---

## Fazit für die Praxis

Dieses `jsonld`-Dokument ist das perfekte Gegenbeispiel zum flüchtigen SEO-Web. Es liefert eine Momentaufnahme digitaler Souveränität. Weil es vollständig in sich geschlossen ist, kann dieses File in 100 Jahren von einem Archiv-Server geladen werden , und die historische Software wird ohne einen einzigen externen API-Aufruf exakt rekonstruieren können, welche kritische Infrastruktur am 16. Mai 2026 im DACH-Raum verfügbar war – und wer damals dafür die Verantwortung trug.

---

### Das "Turtle-Geständnis" des W3C (Warum JSON nur die Fassade ist)

Wer die offizielle Spezifikation zur RDF-Dataset-Kanonisierung (*W3C RDF-canon*) studiert, stößt auf einen bemerkenswerten Satz der Autoren:

> *"Code examples are generally given in a Turtle or TriG format for brevity, where each line represents a single triple or quad."*

Das ist das ultimative Eingeständnis der Standardisierer: JSON ist ein fantastisches Transportmedium für Software-Entwickler, aber für die unerbittliche mathematische Beweisführung und die kryptografische Absicherung ist es strukturell zu unpräzise. 

Wenn Sie ein JSON-LD-Dokument (wie unser `Mission`-File) revisionssicher archivieren, passiert im Hintergrund folgendes:
1. Der `@context` bügelt alle syntaktischen Eigenheiten des JSON glatt.
2. Das Dokument wird in pure, flache Subjekt-Prädikat-Objekt-Tripel (Turtle) zerlegt.
3. Jede Zeile repräsentiert eine eigenständige, unumstößliche logische Aussage.
4. Diese Zeilen werden deterministisch sortiert und gehasht.

Das bedeutet: Ihre Daten überleben das Web, weil sie im Moment der Kanonisierung ihre flüchtige JSON-Hülle abstreifen und zu reiner, zeitloser mathematischer Logik werden.

---
