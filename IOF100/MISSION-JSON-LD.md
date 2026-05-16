# Lehrstunde II: Anatomie eines realen Mission-Files (Datengetriebene Governance in der Praxis)

## TL;DR (Das Wichtigste in 30 Sekunden)
* [cite_start]**Was wir hier sehen:** Ein echtes, voll funktionsfähiges `Mission`-Dokument (`open-iof/1.0`) vom 16. Mai 2026 für die DACH-Region[cite: 92, 95].
* [cite_start]**Der Zweck:** Es überwacht die Erreichbarkeit kritischer digitaler Infrastrukturen (Medien, Energie, Behörden, Carrier)[cite: 98, 99].
* [cite_start]**Das Ergebnis:** Von 32 geprüften Knoten sind 28 fehlerfrei ("PASS"). [cite_start]4 Knoten (darunter Großkaliber wie `admin.ch` und `enbw.com`) sind aktuell nicht erreichbar und stehen unter "semantischer Quarantäne" (`SuspectedNodes`)[cite: 99, 177, 180].
* [cite_start]**Warum das genial ist:** Das Dokument kombiniert die harten Fakten eines Netzwerk-Scans mit den juristischen/organisatorischen Rahmenbedingungen (`Policies`) in einem einzigen, kryptografisch verifizierbaren Graph-Knoten[cite: 92, 95].

---

## Die Sektionen im Tiefen-Audit

Gehen wir Schritt für Schritt durch das hochgeladene Dokument, um zu verstehen, wie die Maschine diese Daten interpretiert.

### 1. Die Metadaten & Die Semantische Autorität
```json
"@id": "urn:iof:mission:20260516T103351-dach-regional",
"@type": "Mission",
"identity": {
  "profile": "preservation",
  "authority": {
    "@type": "iof:SemanticAuthority",
    "organisation": "Sevon Trust Consult",
    "offlineCapable": true,
    "preservationClass": "LTP-A"
  }
}
