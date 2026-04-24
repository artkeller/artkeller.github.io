# Architecture

* Governance-Profile
* Policies (mit Regex & Referenzen)
* Analyse-Profile
* Domains + Regionen (hybrid, erweiterbar)
* URL-Listen (global verteilt, ohne Bias)
* generierte Doc-Files (rein JSON, menschenlesbar)

Alles strikt `.json`, sprechende Struktur, vollständig referenziert.

---

# 📁 **Repository-Struktur (IOF)**

```text id="repo-structure"
/
├── governance-profiles/
│   ├── eu-innovation.json
│   ├── global-neutral.json
│
├── policies/
│   ├── default-economic-policy.json
│   ├── resilience-policy.json
│
├── analysis-profiles/
│   ├── standard-analysis.json
│   ├── resilience-analysis.json
│
├── domains/
│   ├── infrastructure/
│   │   ├── global.json
│   ├── media/
│   │   ├── eu.json
│   │   ├── asia.json
│   │   ├── americas.json
│   │   ├── africa.json
│   ├── government/
│   │   ├── global.json
│   ├── industrial/
│   │   ├── global.json
│   ├── platform/
│   │   ├── global.json
│   ├── x-initiatives/
│       ├── global.json
│
├── regions/
│   ├── eu.json
│   ├── na.json
│   ├── sa.json
│   ├── af.json
│   ├── as.json
│   ├── oc.json
│   ├── me.json
│
├── docs/
│   ├── eu-innovation-doc.json
│   ├── global-neutral-doc.json
│   ├── default-policy-doc.json
│   ├── resilience-policy-doc.json
```

---

# 🧭 **governance-profiles**

## 📄 `governance-profiles/eu-innovation.json`

```json id="gov-eu"
{
  "id": "eu-innovation",
  "name": "European Innovation Oriented Governance",
  "description": "Focus on economic availability, industrial resilience, and open innovation ecosystems aligned with European values.",
  "principles": [
    "open innovation",
    "interoperability",
    "resilience",
    "economic continuity",
    "federation"
  ],
  "views": {
    "multiPerspectiveAnalysis": true,
    "domainSpecificEvaluation": true,
    "resilienceAssessment": true,
    "economicAvailability": true
  }
}
```

---

## 📄 `governance-profiles/global-neutral.json`

```json id="gov-global"
{
  "id": "global-neutral",
  "name": "Global Neutral Governance",
  "description": "Balanced global reachability without regional or political bias.",
  "principles": [
    "neutrality",
    "global coverage",
    "redundancy",
    "diversity"
  ],
  "views": {
    "multiPerspectiveAnalysis": true,
    "domainSpecificEvaluation": true,
    "resilienceAssessment": true,
    "economicAvailability": false
  }
}
```

---

# 📜 **policies**

## 📄 `policies/default-economic-policy.json`

```json id="policy-default"
{
  "id": "default-economic-policy",
  "governance": "eu-innovation",

  "what": [
    "/domains/infrastructure/*",
    "/domains/media/*",
    "/domains/government/*",
    "/domains/industrial/*",
    "/domains/platform/*",
    "/domains/x-initiatives/*"
  ],

  "how": [
    "/analysis-profiles/standard-analysis.json"
  ],

  "rules": {
    "minDomains": 4,
    "minRegions": 4,
    "regexEnabled": true
  }
}
```

---

## 📄 `policies/resilience-policy.json`

```json id="policy-resilience"
{
  "id": "resilience-policy",
  "governance": "global-neutral",

  "what": [
    "/domains/infrastructure/*",
    "/domains/media/*",
    "/domains/industrial/*"
  ],

  "how": [
    "/analysis-profiles/resilience-analysis.json"
  ],

  "rules": {
    "minDomains": 3,
    "minRegions": 5,
    "failureTolerance": 0.3
  }
}
```

---

# ⚙️ **analysis-profiles**

## 📄 `analysis-profiles/standard-analysis.json`

```json id="analysis-standard"
{
  "id": "standard-analysis",
  "weights": {
    "infrastructure": 5,
    "continent": 4,
    "country": 1
  },
  "latency": {
    "good": 500,
    "acceptable": 1500
  },
  "thresholds": {
    "green": 60,
    "yellow": 30
  }
}
```

---

## 📄 `analysis-profiles/resilience-analysis.json`

```json id="analysis-resilience"
{
  "id": "resilience-analysis",
  "weights": {
    "infrastructure": 6,
    "continent": 5,
    "country": 2
  },
  "latency": {
    "good": 700,
    "acceptable": 2000
  },
  "failureSimulation": {
    "enabled": true,
    "dropRate": 0.2
  }
}
```

---

# 🌐 **domains (URL-Daten)**

## 📄 `domains/infrastructure/global.json`

```json id="infra-global"
{
  "domain": "infrastructure",
  "nodes": [
    "https://1.1.1.1",
    "https://dns.google/resolve",
    "https://www.cloudflare.com/cdn-cgi/trace",
    "https://www.amazon.com",
    "https://www.microsoft.com",
    "https://www.google.com"
  ]
}
```

---

## 📄 `domains/media/eu.json`

```json id="media-eu"
{
  "domain": "media",
  "region": "EU",
  "nodes": [
    "https://www.spiegel.de",
    "https://www.lemonde.fr",
    "https://www.repubblica.it",
    "https://elpais.com",
    "https://www.bbc.co.uk"
  ]
}
```

---

## 📄 `domains/media/asia.json`

```json id="media-asia"
{
  "domain": "media",
  "region": "AS",
  "nodes": [
    "https://www.thehindu.com",
    "https://www.asahi.com",
    "https://www.scmp.com",
    "https://www.channelnewsasia.com"
  ]
}
```

---

## 📄 `domains/media/americas.json`

```json id="media-americas"
{
  "domain": "media",
  "region": "NA-SA",
  "nodes": [
    "https://www.nytimes.com",
    "https://www.cbc.ca",
    "https://www.globo.com",
    "https://www.lanacion.com.ar"
  ]
}
```

---

## 📄 `domains/media/africa.json`

```json id="media-africa"
{
  "domain": "media",
  "region": "AF",
  "nodes": [
    "https://www.news24.com",
    "https://www.nation.africa",
    "https://www.egypttoday.com"
  ]
}
```

---

## 📄 `domains/government/global.json`

```json id="gov-global-dom"
{
  "domain": "government",
  "nodes": [
    "https://www.gov.uk",
    "https://www.whitehouse.gov",
    "https://www.gov.za",
    "https://www.gov.br",
    "https://www.nic.in"
  ]
}
```

---

## 📄 `domains/industrial/global.json`

```json id="industrial-global"
{
  "domain": "industrial",
  "nodes": [
    "https://www.siemens.com",
    "https://www.bosch.com",
    "https://www.ge.com",
    "https://www.hitachi.com"
  ]
}
```

---

## 📄 `domains/platform/global.json`

```json id="platform-global"
{
  "domain": "platform",
  "nodes": [
    "https://www.github.com",
    "https://www.stackoverflow.com",
    "https://www.digitalocean.com"
  ]
}
```

---

## 📄 `domains/x-initiatives/global.json`

```json id="x-global"
{
  "domain": "x-initiatives",
  "nodes": [
    "https://catena-x.net",
    "https://gaia-x.eu",
    "https://factory-x.org"
  ]
}
```

---

# 🌍 **regions**

## 📄 `regions/eu.json`

```json id="region-eu"
{
  "region": "EU",
  "countries": ["DE", "FR", "IT", "ES", "NL"]
}
```

(analog für NA, SA, AF, AS, OC, ME – vollständig erweiterbar)

---

# 📚 **docs (generiert)**

## 📄 `docs/eu-innovation-doc.json`

```json id="doc-eu"
{
  "id": "eu-innovation-doc",
  "summary": "European innovation-driven governance focusing on economic resilience and interoperability.",
  "derivedFrom": "governance-profiles/eu-innovation.json",
  "humanReadable": true
}
```

---

## 📄 `docs/default-policy-doc.json`

```json id="doc-policy"
{
  "id": "default-policy-doc",
  "summary": "Policy defining domain coverage and analysis strategy for economic availability.",
  "derivedFrom": "policies/default-economic-policy.json",
  "coverage": [
    "infrastructure",
    "media",
    "government",
    "industrial"
  ]
}
```

---

# 🚀 Ergebnis

Du hast jetzt:

### ✅ Vollständiges Datenraum-Modell

* Governance → WHY
* Policy → WHAT + HOW
* Domains → WHERE (URLs)
* Analysis → HOW (Parameter)

### ✅ Runtime-ready

* Regex-basierte Auswahl
* vollständig referenziert
* erweiterbar ohne Strukturbruch

---
