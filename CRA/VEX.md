# VEX Statement (Vulnerability Exploitability eXchange)

**Project:** ArtKeller Portfolio
**Standard:** ARTKELLER Standard (CRA-Compliant)
**Date:** 2026-02-15

## 1. Vulnerability Analysis
Im Gegensatz zu modernen Web-Applikationen, die auf tausenden Drittanbieter-Bibliotheken basieren, verzichtet dieses Projekt vollständig auf Paketmanager wie `npm` oder `yarn`.

### 2. Status: Non-Exploitable
Aufgrund der Architektur sind folgende Bedrohungskategorien systembedingt **nicht anwendbar (Not Applicable)**:

| Threat Category | Status | Reasoning |
|:---|:---|:---|
| **Supply Chain Attacks** | **Inert** | Keine `node_modules`. Es gibt keine automatisierten Updates von Drittanbietern, die bösartigen Code einschleusen könnten. |
| **Dependency Hell** | **Inert** | Keine transienten Abhängigkeiten. Jedes Bit im Projekt wurde manuell gesichtet und freigegeben. |
| **Log4Shell Style Risks** | **Inert** | Keine Server-seitige Ausführung von Java oder komplexen Framework-Logiken. |
| **Prototype Pollution** | **Inert** | Keine Verwendung von Frameworks wie jQuery oder komplexen State-Management-Libraries. |

## 3. The "No-NPM" Security Asset
Das Fehlen von `npm` ist unser größtes Sicherheits-Asset. Während ein durchschnittliches Projekt heute ca. 1.000 bis 1.500 transitive Abhängigkeiten besitzt (deren Integrität kaum zu prüfen ist), verfügt dieses Projekt über **Null** Code-Abhängigkeiten.

**Haftungs-Nachweis:**
Da jede Zeile Code direkt kontrolliert und ohne automatisierte Build-Pipelines von Drittanbietern erstellt wurde, kann die Integrität der 12,8 KB Software-Basis zu 100% garantiert werden.

## 4. Assessment Summary
Es liegen keine bekannten Schwachstellen vor. Die Angriffsfläche ist auf das absolute Minimum (statisches HTML/CSS/JS) reduziert.
