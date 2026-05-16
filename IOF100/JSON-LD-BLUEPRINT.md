# Blueprint: JSON-LD für langlebige Ontologien (Long-Term Preservation TROTZ Web)

## TL;DR (Too Long; Didn't Read)
* **Das Problem:** 99 % aller JSON-LD-Tutorials im Netz behandeln ausschließlich `schema.org` für SEO (Suchmaschinen-Marketing). Das ist eine "Homebrew"-Welt mit laxen Datentypen und vollem Vendor Lock-in. Wenn Sie dort eigene, präzise Ontologien validieren wollen, stürzen die Tools ab und Sie werden als „Schema-Rüpel“ beschimpft.
* **Die Wahrheit:** JSON-LD wurde vom W3C nicht für SEO erfunden, sondern als leichtgewichtige Brücke zu echten, mathematisch präzisen Graphen (RDF).
* **Die Lösung:** Dieses Dokument zeigt, wie Sie sich über einen maßgeschneiderten `@context` vollständig von der vordefinierten Web-Welt entkoppeln. Sie behalten die flache JSON-Struktur für Ihre APIs, injizieren aber unzerstörbare, langzeitstabile Semantik nach wissenschaftlichen Standards.

---

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
* **Die Reality:** Diese Welt hat das Vokabular monopolisiert. Weil 95 % aller JSON-LD-Dateien im Netz für Google-Bots geschrieben werden, sind 95 % aller Forenbeiträge (StackOverflow, Blogs) rein auf dieses starre Korsett fixiert. Wer hier nach Individualität sucht, erntet Fehlermeldungen von den Validatoren.

### Welt B: Die offizielle W3C-Spezifikation (Ihre Welt)
* **Die Anlaufstellen:** [json-ld.org](https://json-ld.org) und die normative [W3C JSON-LD 1.1 Spezifikation](https://www.w3.org/TR/json-ld11/)
* **Das Versprechen:** „JSON-LD ist eine leichtgewichtige Syntax, um Linked Data in JSON zu serialisieren.“
* **Die Reality:** Auf *json-ld.org* wird die wahre Mächtigkeit zwar theoretisch erklärt, aber oft so akademisch und abstrakt, dass der pragmatische Software-Entwickler den Wald vor lauter Bäumen nicht sieht. Es fehlt die direkte Brücke, die zeigt, wie man sich von der Tyrannei vordefinierter Vokabulare befreit.

---

## Die Architektur: Der Header, der die Macht verschiebt

Ein JSON-LD-Dokument besteht aus zwei Teilen: Dem **semantischen Betriebssystem (Header)** und den **Nutzdaten (Payload)**. Das folgende Pattern entkoppelt Ihre Daten vollständig von externen Plattformen. (see [5])

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

## Achtung, Falle: Warum selbst das W3C in Beispielen "schema.org" nutzt

Wer tief in die neuesten W3C-Entwürfe eintaucht (wie z.B. *JSON-LD Streaming 1.1*), wird feststellen, dass selbst dort in den offiziellen Validierungs-Beispielen `schema.org` als `@context` hinterlegt ist. 

**Lassen Sie sich davon nicht verwirren!** Das W3C nutzt `schema.org` in Spezifikationen ausschließlich als didaktisches „Hello World“-Vokabular, weil jeder Webentwickler eine Entität wie `Person` oder `Movie` sofort versteht. 

Der eigentliche Witz ist: Die Existenz von *JSON-LD Streaming* beweist unsere Erzählung. Man benötigt kein Streaming, um 2 Kilobyte SEO-Daten für Google bereitzustellen. Streaming wird genau dann benötigt, wenn gigantische, unerbittliche Graphenströme aus der Industrie, der Logistik oder der Governance live verarbeitet werden müssen, ohne den Speicher zu sprengen. Das W3C baut die Werkzeuge für die wissenschaftliche Welt, leiht sich aber die Wörter der Marketingwelt für die Schautafeln.

---

---

## Quellennachweise & Weiterführende Literatur (IEEE-Struktur)

Im Gegensatz zur unpräzisen Strukturierung im kommerziellen Web basiert die Architektur langlebiger Daten auf den formalen, international standardisierten Spezifikationen des World Wide Web Consortiums (W3C) sowie führender datenwissenschaftlicher Konsortien.

### [1] Die normative Syntax (W3C Standard)
* **Referenz:** P. Champion, G. Kellogg, and D. Longley, *JSON-LD 1.1: A JSON-based Serialization for Linked Data*, W3C Recommendation, Feb. 2020.
* **Online verfügbar:** [https://www.w3.org/TR/json-ld11/](https://www.w3.org/TR/json-ld11/)
* **Bedeutung für die Praxis:** Dies ist das unbarmherzige Regelwerk für JSON-LD 1.1. Hier sind Kern-Mechanismen wie `@context`, `@set`-Container sowie die algorithmischen Operationen des *Framing*, *Flattening* und *Compacting* völkerrechtlich (im Sinne des Webs) definiert.

### [2] Das offizielle Entwickler-Portal
* **Referenz:** JSON-LD Community Group, *JSON-LD - Dawn of the Flexible Data*, W3C Community Portal, 2026.
* **Online verfügbar:** [https://json-ld.org](https://json-ld.org)
* **Bedeutung für die Praxis:** Das zentrale Einstiegsportal für die "Welt B". Abseits der rein akademischen Spezifikation bietet diese Seite den *JSON-LD Playground* – ein unverzichtbares Werkzeug, um die Metamorphose von flachem JSON in visuelle RDF-Graphenstrukturen live zu simulieren.

### [3] Fortgeschrittenes API-Design und Best Practices
* **Referenz:** G. Kellogg, M. Sporny, and D. Longley, *JSON-LD 1.1 Best Practices*, W3C Working Group Note, Mar. 2020.
* **Online verfügbar:** [https://w3c.github.io/json-ld-bp/](https://w3c.github.io/json-ld-bp/)
* **Bedeutung für die Praxis:** Das Handbuch für Software-Architekten. Es beschreibt explizit, wie man produktive, hochperformante Web-APIs baut, die im Kern reines JSON ausliefern, aber über entkoppelte `@context`-Injektionen vollständig Semantic-Web-fähig sind.

### [4] Hochvolumige Graphen-Architekturen & Streaming
* **Referenz:** W3C JSON-LD Working Group, *JSON-LD Streaming 1.1*, W3C Editor's Draft, 2026.
* **Online verfügbar:** [https://w3c.github.io/json-ld-streaming/](https://w3c.github.io/json-ld-streaming/)
* **Bedeutung für die Praxis:** Der Gegenbeweis zur SEO-Erzählung. Diese Spezifikation definiert, wie massive semantische Datenströme (z.B. aus der Industrie- oder Netzwerk-Governance) sequenziell verarbeitet und validiert werden, ohne den Arbeitsspeicher moderner Systeme zu sprengen.

### [5] Wissenschaftliche Datenmodellierung (Klasse statt Masse)
* **Referenz:** LinkML Project Team, *Using JSON-LD within the Linked Data Modeling Language (LinkML)*, Lawrence Berkeley National Laboratory, 2025.
* **Online verfügbar:** [https://linkml.io/linkml/howtos/using-jsonld.html](https://linkml.io/linkml/howtos/using-jsonld.html)
* **Bedeutung für die Praxis:** Ein Praxis-Blueprint aus der datenwissenschaftlichen Oberliga (Bioinformatik und semantisches Daten-Engineering). Es zeigt, wie man aus abstrakten Datenmodellen simultan JSON-Schema-Validatoren (für die Struktur) und JSON-LD-Kontexte (für die Semantik) generiert.

### [6] Datenintegrität durch mathematische Kanonisierung
* **Referenz:** D. Longley and M. Sporny, *RDF Dataset Canonicalization*, W3C Proposed Recommendation, 2024.
* **Online verfügbar:** [https://www.w3.org/TR/rdf-canon/](https://www.w3.org/TR/rdf-canon/)
* **Bedeutung für die Praxis:** Das mathematische Fundament für die Langzeitarchivierung (Long-Term Preservation). Der dort definierte Algorithmus (URDNA2015) erlaubt es, ein JSON-LD-Dokument unabhängig von seiner äußeren Formatierung (Leerzeichen, Zeilenumbrüche) in eine deterministische logische Form zu bringen, um daraus einen unbestechlichen kryptografischen Hash (Prüfsumme) für Audits und Herkunftsnachweise (Provenance) zu erzeugen.
