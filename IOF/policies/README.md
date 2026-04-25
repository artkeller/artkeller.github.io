# Policy Beschreibungen

Die Policies beschreiben im Kontext eines Einsatz durch ein Web-Analyse-Tool zur Netzwerküberwachung folgendes:

##  default-economic-policy.json

**Default Economic Policy – Technische Beschreibung**

Die Policy `default-economic-policy` definiert einen umfassenden Überwachungsrahmen für wirtschaftsrelevante Netzwerkdomänen. Im **What**-Bereich werden sechs Domainkategorien erfasst: Infrastruktur, Medien, Behörden, Industrie, Plattformen und X-Initiativen – ergänzt durch vier Weltregionen (EU, Asien, Nordamerika, Afrika). Die **How**-Komponente delegiert die Verarbeitung an ein Standard-Analyseprofil. Die **Selection** aktiviert rekursives Traversieren der Verzeichnisstrukturen sowie Regex-basierte Filterung zur präzisen Zielauswahl.

## resilience-policy.json

**Resilience Policy – Technische Beschreibung**

Die Policy `resilience-policy` analysiert Netzwerkdomänen aus den Bereichen Infrastructure, Media und Industrial über fünf globale Regionen (EU, AS, NA, AF, SA) hinweg. Die Analyse erfolgt mittels `resilience-analysis`-Profil und bewertet Ausfalltoleranz sowie Verfügbarkeit. Die Selektion arbeitet rekursiv mit Regex-Unterstützung und erfordert mindestens 3 Domänen sowie 5 Regionen; eine Fehlertoleranz von 30 % ist zulässig.

---

## PROMPT 

```prompt
Domain: Web Analyzing

Role: Du bist ein Web Spezialist

Query: Erzeuge aus den folgenden JSON Strukturen, die von einem Web Analyse Tool als Policies (das "WHAT" und "HOW")
zur Netzwerküberwachung verwendet werden, einen  technischen Fliesstext mit max. 500 Zeichen, der den 
Funktionsumfang und speziell die Policies, Analysis und Selections erklärt:

{ ... }

```
