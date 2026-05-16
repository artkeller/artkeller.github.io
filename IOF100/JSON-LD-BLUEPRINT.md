# Blueprint: JSON-LD für langlebige Ontologien (Long-Term Preservation TROTZ Web)

## Das Problem: Warum das "Standard-Web" Ihre Daten korrumpiert
Wer Daten für kritische Systeme, Governance oder Langzeitarchivierung (Long-Term Preservation) entwirft, stößt unweigerlich auf JSON-LD. Wer dann nach Tutorials sucht, landet in der SEO-Sackgasse von `schema.org`. 

`schema.org` ist ein utilitaristisches, flüchtiges Vokabular, das für die schnelle Indizierung von Suchmaschinen optimiert ist. Es bricht fast jede Regel der mathematischen Wissensrepräsentation: Es ist lax bei Datentypen, instabil über Jahrzehnte und erzwingt einen Vendor Lock-in an die "Predefined World" der großen Tech-Konzerne.

Wenn Sie versuchen, echte, wissenschaftliche oder unternehmensspezifische Ontologien durch diese Validatoren zu jagen, werden Sie als „Schema-Rüpel“ abgewiesen. 

**Die Lösung:** Wir nutzen JSON-LD nicht als SEO-Schminke, sondern als *Schnittmengen-Konverter*. Wir behalten die flache, entwicklerfreundliche JSON-Struktur für unsere APIs, injizieren aber über einen maßgeschneiderten `@context` die unerbittliche Logik des Semantic Web (RDF). Damit machen wir Daten immun gegen das Altern des Webs.

---

## Die historische Weggabelung: Warum Sie im Wald stehen

Um zu verstehen, warum die gängige Dokumentation im Netz Sie im Stich lässt, muss man die Quellen trennen. Es existieren zwei völlig unterschiedliche Welten, die dasselbe Dateiformat nutzen:

### Welt A: Die Marketing- & SEO-Blase
* **Die Anlaufstelle:** [schema.org](https://schema.org)
* **Das Versprechen:** „Strukturiere deine Daten, damit Google deine Event-Termine, Kochrezepte oder Produktpreise mit Sternchen in den Suchergebnissen anzeigt.“
* **Die Realität:** Diese Welt hat das Vokabular monopolisiert. Weil 95 % aller JSON-LD-Dateien im Netz für Google-Bots geschrieben werden, sind 95 % aller Forenbeiträge (StackOverflow, Blogs) rein auf dieses starre Korsett fixiert. Wer hier nach Individualität sucht, erntet Fehlermeldungen von den Validatoren.

### Welt B: Die offizielle W3C-Spezifikation (Ihre Welt)
* **Die Anlaufstellen:** [json-ld.org](https://json-ld.org) und die normative [W3C JSON-LD 1.1 Spezifikation](https://www.w3.org/TR/json-ld11/)
* **Das Versprechen:** „JSON-LD ist eine leichtgewichtige Syntax, um Linked Data in JSON zu serialisieren.“
* **Die Realität:** Auf *json-ld.org* wird die wahre Mächtigkeit zwar theoretisch erklärt, aber oft so akademisch und abstrakt, dass der pragmatische Software-Entwickler den Wald vor lauter Bäumen nicht sieht. Es fehlt die direkte Brücke, die zeigt, wie man sich von der Tyrannei vordefinierter Vokabulare befreit.

---

## Die Architektur: Der Header, der die Macht verschiebt

Ein JSON-LD-Dokument besteht aus zwei Teilen: Dem **semantischen Betriebssystem (Header)** und den **Nutzdaten (Payload)**. Das folgende Pattern entkoppelt Ihre Daten vollständig von externen Plattformen.

```json
{
  "@context": {
    "@version": 1.1,
    "iof": "local:iof:schema:",
    "xsd": "[http://www.w3.org/2001/XMLSchema#](http://www.w3.org/2001/XMLSchema#)",
    "prov": "[http://www.w3.org/ns/prov#](http://www.w3.org/ns/prov#)",
    
    "Mission": "iof:Mission",
    "Generator": "iof:Generator",
    "Governance": "iof:Governance",
    "Policy": "iof:Policy",
    "Readiness": "iof:Readiness",
    "Scope": "iof:Scope",
    "Statistics": "iof:Statistics",
    "AnalysisProfile": "iof:AnalysisProfile",
    "MeasurementProfile": "iof:MeasurementProfile",
    "ResolvedNode": "iof:ResolvedNode",
    "SuspectedNode": "iof:SuspectedNode",
    "SuspectedState": "iof:SuspectedState",
    "ContextEvidence": "iof:ContextEvidence",
    
    "created": {
      "@id": "iof:created",
      "@type": "xsd:dateTime"
    },
    "rftAt": {
      "@id": "iof:rftAt",
      "@type": "xsd:dateTime"
    },
    "url": {
      "@id": "iof:url",
      "@type": "@id"
    },
    "ref": {
      "@id": "iof:ref"
    },
    "policy": {
      "@id": "iof:policy",
      "@type": "@id"
    },
    
    "resolvedNodes": {
      "@id": "iof:resolvedNodes",
      "@container": "@set"
    },
    "suspectedNodes": {
      "@id": "iof:suspectedNodes",
      "@container": "@set"
    },
    "deletedNodes": {
      "@id": "iof:deletedNodes",
      "@container": "@set"
    },
    "profiles": {
      "@id": "iof:profiles",
      "@container": "@set"
    },
    "policies": {
      "@id": "iof:policies",
      "@container": "@set"
    },
    "governanceLineage": {
      "@id": "iof:governanceLineage",
      "@container": "@set"
    }
  }
}

```

---

## Schulmässige Zerlegung des Headers

### 1. Das Fundament (Namensräume & Protokolle)

* `"@version": 1.1`: Schaltet die erweiterten Features von JSON-LD 1.1 frei (u.a. fortgeschrittenes Scoping und Verschachtelung). Unverzichtbar für komplexe Architekturen.
* `"iof": "local:iof:schema:"`: **Der Unabhängigkeitserklärung-Schritt.** Statt auf eine HTTP-URL zu verweisen, die in 10 Jahren einen 404-Fehler liefert, definieren wir einen *lokalen oder URN-artigen Identifikator*. Ihre Daten sind autark. Sie hängen nicht am Tropf eines aktiven Webservers.
* `"xsd": "http://www.w3.org/2001/XMLSchema#"`: Die mathematische Definition von Datentypen (Zahlen, Datumsformate, Booleans). Standardisiert seit Jahrzehnten, unveränderlich.
* `"prov": "http://www.w3.org/ns/prov#"`: Das W3C-Standard-Vokabular für Provenance (Herkunftsnachweis). Damit dokumentieren Sie maschinenlesbar, *wer* Daten wann erzeugt, verändert oder validiert hat (unverzichtbar für Audit-Trails und Governance).

### 2. Das Mapping der Klassen (Die Ontologie)

Die Zeilen wie `"Mission": "iof:Mission"` tun etwas Magisches: Sie erlauben es dem Entwickler, im JSON einfach `"@type": "Mission"` zu schreiben. Ein RDF-Prozessor im Hintergrund übersetzt dies sofort in die global eindeutige URI `local:iof:schema:Mission`.
Dadurch bleibt das JSON für Menschen lesbar, behält aber die mathematische Eindeutigkeit einer formalen Ontologie.

### 3. Strikte Typisierung von Prädikaten (Properties)

Im Standard-JSON ist ein Datum nur ein String (`"2026-05-16"`). Für eine Maschine ist das bedeutungslos.

```json
"created": {
  "@id": "iof:created",
  "@type": "xsd:dateTime"
}

```

Hier zwingen wir den Parser, den Wert von `created` strikt als `xsd:dateTime` zu interpretieren. Keine Fehlinterpretationen bei Zeitzonen oder Formaten möglich.

Besonders elegant:

```json
"url": {
  "@id": "iof:url",
  "@type": "@id"
}

```

Das `"@type": "@id"` besagt: Der Wert dieses Feldes ist kein einfacher Text, sondern eine *Referenz auf eine andere Entität* (ein Graph-Knoten). Damit wird aus einem flachen Datensatz ein verknüpftes Netzwerk (Linked Data).

### 4. Datenintegrität durch Mengenlehre

Der absolute Geniestreich für datengetriebene Systeme sind Deklarationen wie diese:

```json
"resolvedNodes": {
  "@id": "iof:resolvedNodes",
  "@container": "@set"
}

```

In einem normalen JSON-Array `[...]` sind die Elemente geordnet (Index 0, 1, 2). In der realen Welt und in mathematischen Graphen ist die Reihenfolge von Knoten oder Richtlinien meist irrelevant, aber Duplikate sind tödlich.
`"@container": "@set"` zwingt den JSON-LD Prozessor, dieses Array als **mathematische Menge (Set)** zu behandeln: Ungeordnet, aber frei von Duplikaten. Das schützt das System vor logischen Fehlern bei der Datenzusammenführung (Graph Merging).

---

## Die Metamorphose: Vom JSON zum unerbittlichen RDF-Graphen

Um zu beweisen, warum dieses Format die "Predefined World" aushebelt, schauen wir uns die Transformation an. Ein standardkonformer RDF-Prozessor benötigt nur unser JSON-LD und generiert daraus pure, maschinenlesbare Logik.

### Schritt 1: Die pragmatische Payload (Das Eingabe-JSON)

Ein Entwickler schreibt oder ein System generiert folgendes flache Dokument (wir verweisen auf ein fiktives Governance-Subjekt namens `local:mission:42` über die `@id`):

```json
{
  "@context": { ... (Der obige Header) ... },
  "@id": "local:mission:42",
  "@type": "Mission",
  "created": "2026-05-16T15:00:00Z",
  "resolvedNodes": [
    "local:node:alpha",
    "local:node:beta"
  ]
}

```

### Schritt 2: Die Übersetzung (Die Turtle/Triple-Metamorphose)

Wenn dieses Dokument serialisiert wird, löst der Prozessor die Aliase mithilfe des `@context` auf. Das Ergebnis ist pure, standardisierte Semantik (hier im übersichtlichen *Turtle*-Format dargestellt):

```turtle
@prefix xsd: [http://www.w3.org/2001/XMLSchema#](http://www.w3.org/2001/XMLSchema#) .

<local:mission:42> a <local:iof:schema:Mission> ;
    <local:iof:schema:created> "2026-05-16T15:00:00Z"^^xsd:dateTime ;
    <local:iof:schema:resolvedNodes> <local:node:alpha> , <local:node:beta> .

```

### Was ist hier gerade passiert?

1. **Aus dem Datums-String** wurde ein mathematisch exakter, typisierter Wert (`"..."^^xsd:dateTime`). Jede Graph-Datenbank der Welt weiß nun sekundengenau, wie dieser Wert zu sortieren und zu validieren ist.
2. **Aus den Array-Einträgen** unter `resolvedNodes` wurden zwei eigenständige, gerichtete Kanten im Graphen. Da wir sie als `@set` deklariert haben, besitzt die Reihenfolge keine logische Relevanz – die Duplikatssicherheit ist garantiert.
3. **Keine HTTP-Abhängigkeit:** Die URIs beginnen mit `local:`. Sie benötigen keine Internetverbindung und keinen DNS-Server, um die strukturelle Integrität dieses Datensatzes zu prüfen.

---

## Warum dieses Format das Web überlebt (Langzeitstabilität):

1. **Kontext-Injektion:** Selbst wenn dieses Dokument in 50 Jahren isoliert von einer Festplatte gekratzt wird, beschreibt der Header exakt, wie die Daten zu interpretieren sind – ohne dass ein externer Server erreichbar sein muss.
2. **Kanonisierung (RDF-Dataset-Kanonisierung):** Da das Format mathematisch deterministisch auf RDF abbildet, kann man aus diesem JSON einen eindeutigen kryptografischen Hash erzeugen (z.B. via URDNA2015). Ändert sich ein einziges Bit in den Daten oder den zugrundeliegenden Typen, bricht der Hash. Das ist das Fundament für revisionssichere Dokumenten-Archivierung und lückenlose Audit-Trails.
3. **Plattform-Agnostisch:** Es läuft nativ im Browser, in performanten eingebetteten Systemen (C/C++), in Python-Pipelines oder auf Mainframes. Es erfordert keine proprietären Datenbank-Treiber.

---

## Fazit für Entwickler und Architekten

Lassen Sie sich nicht von Validatoren belehren, die für das Marketing-Web gebaut wurden. Wenn Ihr Ziel Datenintegrität, semantische Klarheit und Unabhängigkeit über Dekaden hinweg ist, dann ist dieser `@context`-Blueprint der einzig gangbare Weg. Er kombiniert die Leichtigkeit von JSON mit der unbarmherzigen Präzision des Semantic Web.

---
