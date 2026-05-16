# Open-IOF Architecture Framework: JSON-LD Design Rules (v1.0.0)

## Status: Normativ / Mandatorisch
Dieses Dokument definiert die architektonischen Restriktionen für alle Datenstrukturen innerhalb dieses Ökosystems. Die strikte Einhaltung ist zwingende Voraussetzung für die deterministische Konvertierung in RDF-Datasets und die Gewährleistung der Langzeitstabilität (Long-Term Preservation, Klasse LTP-A).

---

## RULE #1: Das absolute "No-Vocab"-Prinzip (Garantie der Eindeutigkeit)

### 1.1 Die Restriktion
Die Verwendung des Keywords `@vocab` innerhalb eines `@context` ist im gesamten Ökosystem **strikt verboten**. Jede zugelassene Klasse und jedes Prädikat (Property) **muss** einzeln, explizit und schlüsselfertig im Header auf eine eindeutige URI/URN abgebildet werden.

### 1.2 Technische Begründung
Die Aktivierung von `@vocab` führt dazu, dass nicht deklarierte Eigenschaften oder syntaktische Tippfehler (z. B. `"Mision"` statt `"Mission"`) beim Parsing stumm in den Standard-Namensraum übernommen werden. Dies kompromittiert die semantische Validierung. Ohne `@vocab` führt jede unregistrierte Property zwingend zu einem Abbruch des Parsers (Semantik-Vakuum).

---

## RULE #2: Lokale Autarkie (Offline-Capability)

### 2.1 Die Restriktion
Namensräume dürfen im `@context` nicht an flüchtige HTTP-Webadressen gekoppelt werden. Schema-Zuweisungen müssen über lokale Präfixe oder unzerstörbare URN-Strukturen erfolgen:
* **Zulässig:** `"iof": "urn:iof:schema:"` oder `"iof": "local:iof:schema:"`
* **Unzulässig:** `"iof": "https://standards.iof.org/schema/v1/"`

### 2.2 Technische Begründung
Die strukturelle Integrität des Dokuments darf nicht vom Zustand eines DNS-Servers oder der Verfügbarkeit externer Web-Hosts abhängen. Die Konvertierung in formale RDF-Tripel muss lokal und vollständig isoliert ausführbar sein.

---

## RULE #3: Datenintegrität durch Mengenlehre (`@set`)

### 3.1 Die Restriktion
Arrays, deren Elemente in der realen Welt keine logische Reihenfolge besitzen (z. B. `resolvedNodes`, `suspectedNodes`, `policies`), **müssen** im Header explizit als mathematische Menge deklariert werden:
```json
"resolvedNodes": {
  "@id": "iof:resolvedNodes",
  "@container": "@set"
}

```

### 3.2 Technische Begründung

Standard-JSON-Arrays implizieren eine Ordnung (Index 0, 1, 2). Beim Mergen von Graphen führt dies zu unvorhersehbaren Index-Konflikten und Duplikaten. `Subjekt -> Prädikat -> Objekt`-Beziehungen sind per Definition ungeordnet. `@set` erzwingt die Duplikatssicherheit auf Parser-Ebene.

---

## RULE #4: Namensraum-Isolierung für Generatoren (Generator-Namespace Isolation)

### 4.1 Die Restriktion

Dokumente, die von automatisierten Systemen (Scannern, Generatoren) erzeugt werden, müssen eine strikte Trennung zwischen dem **Metadaten-Namensraum** und dem **Instanzen-Namensraum** vollziehen.

* Der `@context` definiert das Vokabular (`urn:iof:schema:`).
* Die `@id` des Dokuments und der Knoten muss zwingend im Instanzen-Namensraum des spezifischen Laufzeit-Generators liegen (z. B. `urn:iof:mission:20260516T103351-dach-regional`).

### 4.2 Technische Begründung

Wird diese Trennung aufgeweicht, kollidieren die Strukturdefinitionen (Klassen) mit den transienten Laufzeitdaten (Instanzen) innerhalb der Graph-Datenbank.

---

## RULE #5: Restriktionen für Daten-Embeddings (Sub-Graph-Verschachtelung)

### 5.1 Die Restriktion

Wenn Objekte innerhalb eines Dokuments verschachtelt eingebettet werden (z. B. das `identity`- oder `suspect`-Objekt innerhalb einer `Mission`), gelten folgende Regeln:

1. Jedes eingebettete Objekt muss einen expliziten `@type` besitzen, der im Haupt-Header deklariert ist.
2. Besitzt das Sub-Objekt eine eigene Relevanz im Graphen, **muss** es eine eigene `@id` (URN) erhalten. Ist es rein struktureller Natur, ist ein anonymer Knoten (Blank Node) zulässig, erfordert aber die strikte Einkapselung über das übergeordnete Prädikat.

```json
"suspect": {
  "@type": "SuspectedState",
  "reason": "unreachable at validation time",
  "testedAt": "2026-05-16T10:33:34.036Z"
}

```

### 5.2 Technische Begründung

Verschachtelte JSON-Strukturen verleiten dazu, Daten hierarchisch zu denken. Ein RDF-Graph kennt keine Hierarchien, sondern nur gerichtete Kanten. Jedes Embedding wird bei der Kanonisierung in flache Tripel aufgelöst. Fehlt der `@type` oder die klare Zuordnung der Kante, verwaist der Sub-Graph nach der Transformation.

---

## RULE #6: Das Postulat der Kanonisierung (The Graph Truth)

### 6.1 Die Restriktion

Kein JSON-LD-Dokument darf Strukturen enthalten, die eine Konvertierung nach dem W3C-Standard *RDF Dataset Canonicalization* (URDNA2015/W3C rdf-canon) verhindern. JSON-LD fungiert ausschließlich als maschinen- und menschenlesbares Transportmedium; die normative Wahrheit existiert nur in der kanonisierten Kantenstruktur.

### 6.2 Technische Begründung

Nur ein vollständig kanonisiertes Dokument lässt sich deterministisch und plattformunabhängig hashen (SHA-256). Jede syntaktische Schachtelung, jede Formatierung (Whitespace, Property-Reihenfolge) wird im Zuge der Kanonisierung eliminiert, um die kryptografische Unveränderlichkeit des Audit-Trails zu sichern.

---
