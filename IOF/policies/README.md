# Policy Beschreibungen

Die Policies beschreiben im Kontext eines Einsatz durch ein Web-Analyse-Tool zur Netzwerküberwachung folgendes:

##  default-economic-policy.json

**Default Economic Policy – Technische Beschreibung**

Die Policy `default-economic-policy` definiert einen umfassenden Überwachungsrahmen für wirtschaftsrelevante Netzwerkdomänen. Im **What**-Bereich werden sechs Domainkategorien erfasst: Infrastruktur, Medien, Behörden, Industrie, Plattformen und X-Initiativen – ergänzt durch vier Weltregionen (EU, Asien, Nordamerika, Afrika). Die **How**-Komponente delegiert die Verarbeitung an ein Standard-Analyseprofil. Die **Selection** aktiviert rekursives Traversieren der Verzeichnisstrukturen sowie Regex-basierte Filterung zur präzisen Zielauswahl.

## /resilience-policy.json

**Global Neutral Governance** ist eine unvoreingenommene Web-Analyse-Governance zur globalen Netzwerküberwachung. Sie kombiniert zwei Kernpolicies – eine ökonomische Standardrichtlinie sowie eine Resilienz-Policy – um ausgewogene Erreichbarkeitsanalysen ohne regionale oder politische Verzerrung sicherzustellen. Drei Views strukturieren die Auswertung: *multiPerspectiveAnalysis* bewertet Domains aus mehreren Blickwinkeln, *domainSpecificEvaluation* analysiert zielgerichtet einzelne Domains, und *resilienceAssessment* prüft die Ausfallsicherheit der Netzwerkinfrastruktur.

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
