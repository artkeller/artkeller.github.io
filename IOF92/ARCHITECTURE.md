# Architecture

The IOF follows a strict separation of concerns across four layers:

```
Governance  ->  Policy  ->  Domains + Regions  ->  Analysis
   WHY            WHAT          WHERE               HOW
```

All data is stored as plain `.json` files with a consistent, predictable schema. No build step is required to read or extend the data. The one-pager runtime (`index.html`) loads `file-index.json` as its entry point and fetches all further files by reference — it never parses the server directory.

---

## Repository Structure

```
/
├── governance-profiles/          # WHY: purpose + policy references
│   ├── eu-innovation.json
│   ├── global-neutral.json
│   └── ai-global-neutral.json    # AI Extension
│
├── policies/                     # WHAT + HOW selection rules
│   ├── default-economic-policy.json
│   ├── resilience-policy.json
│   └── ai-global-reachability-policy.json   # AI Extension
│
├── analysis-profiles/            # HOW: weights and thresholds
│   ├── standard-analysis.json
│   ├── resilience-analysis.json
│   ├── ai-governance-analysis.json           # AI Extension
│   └── ai-overload-analysis.json             # AI Extension
│
├── domains/                      # WHERE (domain axis): URL nodes by function
│   ├── infrastructure/
│   │   └── global.json
│   ├── media/
│   │   ├── eu/
│   │   │   ├── de.json
│   │   │   ├── fr.json
│   │   │   ├── it.json
│   │   │   └── uk.json
│   │   ├── asia/
│   │   │   ├── in.json
│   │   │   └── jp.json
│   │   ├── americas/
│   │   │   ├── us.json
│   │   │   └── br.json
│   │   └── africa/
│   │       └── za.json
│   ├── government/
│   │   └── global/
│   │       ├── us.json
│   │       ├── uk.json
│   │       ├── de.json
│   │       ├── br.json
│   │       ├── in.json
│   │       └── za.json
│   ├── industrial/
│   │   └── global/
│   │       ├── de.json
│   │       ├── jp.json
│   │       └── us.json
│   ├── platform/
│   │   └── global.json
│   └── x-initiatives/
│       └── global.json
│
├── ai-domains/                   # AI Extension – functional AI system nodes
│   ├── llm/
│   │   ├── global.json
│   │   ├── eu.json
│   │   ├── us.json
│   │   ├── cn.json
│   │   ├── kr.json
│   │   └── br.json
│   ├── embedding/
│   │   └── global.json
│   ├── image/
│   │   └── global.json
│   ├── code/
│   │   └── global.json
│   ├── tts/
│   │   └── global.json
│   ├── video/
│   │   └── global.json
│   ├── overload-detection/
│   │   └── global.json
│   ├── governance/
│   │   └── eu.json
│   └── ai-systems-metadata.json   (optional)
│
├── regions/                      # WHERE (region axis): geographic scopes
│   ├── eu.json
│   ├── na.json
│   ├── sa.json
│   ├── as.json
│   ├── af.json
│   ├── oc.json
│   └── me.json
│
├── ai-regions/                   # AI Extension – governance‑specific regions
│   ├── eu-ai-act.json
│   ├── us-ai-federal.json
│   ├── cn-ai-cyberspace.json
│   ├── kr-ai-basic-act.json
│   └── br-lgpd-proposed.json
│
├── measurement-profiles/         # AI Extension – passive & active measurement
│   ├── ai-entrypoint-measure-passive.json
│   ├── ai-compliance-active.json
│   └── ai-overload-active.json
│
├── docs/                         # Human-readable summaries
│   ├── eu-innovation-doc.json
│   ├── global-neutral-doc.json
│   ├── default-policy-doc.json
│   └── resilience-policy-doc.json
│
├── iof-mission-bridge.js         # AI Extension – Node.js bridge to export missions
├── file-index.json               # AUTO-GENERATED — do not edit manually
├── generate-index.js             # Run to regenerate file-index.json
├── index.html                    # One-pager runtime
├── manifest.json                 # PWA manifest
├── README.md                     # Ontology specification
└── ARCHITECTURE.md               # This document
```

---

## Layer Descriptions

### Governance Profile

Defines the **why** — the purpose of a monitoring configuration. Each governance profile references one or more policies and describes its intended use.

```json
{
  "id": "eu-innovation",
  "name": "European Innovation Governance",
  "policies": [
    "./policies/default-economic-policy.json",
    "./policies/resilience-policy.json"
  ],
  "description": {
    "purpose": "Economic availability and industrial resilience",
    "views": ["multiPerspectiveAnalysis", "resilienceAssessment"]
  }
}
```

All governance profiles MUST have a `policies` array. The runtime iterates this array to build the view tree.

#### AI‑Specific Governance Profiles (Extension)

AI governance profiles follow the same schema and can reference policies that use AI‑specific `what` predicates (e.g. `ai_systems` instead of `domains`). They reside in `./governance-profiles/ai-*.json`.

Example: `ai-global-neutral.json`
```json
{
  "id": "ai-global-neutral",
  "name": "AI Global Neutral Governance",
  "policies": ["./policies/ai-global-reachability-policy.json"],
  "description": {
    "purpose": "Neutral assessment of worldwide AI system reachability and compliance",
    "views": ["aiAvailability", "aiGovernanceMaturity"]
  }
}
```

---

### Policy

Defines the **what** (which data to include) and references the **how** (which analysis to apply).

```json
{
  "id": "default-economic-policy",
  "what": {
    "domains": ["./domains/infrastructure/*", "./domains/media/*"],
    "regions": ["./regions/eu.json", "./regions/na.json"]
  },
  "how": ["./analysis-profiles/standard-analysis.json"],
  "selection": { "regex": true, "recursive": true }
}
```

**View modes via `what`:**

| `what.domains` | `what.regions` | Resulting view            |
|----------------|----------------|---------------------------|
| present        | absent         | Domain-only view          |
| absent         | present        | Region-only view          |
| present        | present        | Combined domain+region view |

Both keys are optional. The runtime MUST handle all three combinations.

`what.regions` contains file paths to region definitions (not bare strings). The runtime loads the referenced region file to resolve the country list.

#### AI‑Specific Policy Extensions

AI policies may use an alternative `what.ai_systems` object instead of `domains`. The `ai_systems` object supports the same match‑predicate engine as `domains` (fields, operators, `matchLogic`). It selects files from the `ai-domains/` directory.

Example `ai-global-reachability-policy.json`:
```json
{
  "id": "ai-global-reachability",
  "what": {
    "ai_systems": {
      "match": [
        { "field": "category", "op": "in", "value": ["llm", "embedding", "tts"] },
        { "field": "access_type", "op": "in", "value": ["api", "web"] }
      ],
      "matchLogic": "AND"
    },
    "jurisdictions": {
      "match": [
        { "field": "legal_framework", "op": "intersects", "value": ["EU AI Act", "Basic Act on AI"] }
      ]
    }
  },
  "how": ["./analysis-profiles/ai-governance-analysis.json", "./measurement-profiles/ai-entrypoint-measure-passive.json"]
}
```

Policies MAY also reference `ai-regions/` files in `what.regions` (same syntax as classic regions).

---

### Domain Files

Domain files contain URL nodes classified by functional domain and optionally by region and country. The path encodes the domain hierarchy:

```
domains/{domain}/{region_or_scope}/{country}.json
```

For globally-scoped domains without regional subdivision, a flat structure is used:

```
domains/infrastructure/global.json
domains/platform/global.json
```

**Schema:**

```json
{
  "domain": "media",
  "region": "EU",
  "country": "DE",
  "nodes": [
    "https://www.spiegel.de",
    "https://www.zeit.de"
  ]
}
```

`domain`, `region`, and `country` are all optional. A file without `domain` belongs to a region-only context. A file without `region` is globally scoped.

#### AI‑Specific Domain Files (Extension)

AI domain files live in `ai-domains/` and follow the same schema, but the `domain` field represents an AI category (e.g. `llm`, `embedding`, `tts`, `video`, `overload_detection`). The `nodes` array contains API endpoints, web interfaces, or SDK URLs.

Example `ai-domains/llm/global.json`:
```json
{
  "domain": "llm",
  "description": "Large Language Models with global API access",
  "countries": ["*"],
  "nodes": [
    "https://api.openai.com/v1",
    "https://chat.openai.com",
    "https://api.anthropic.com",
    "https://api.x.ai/v1"
  ]
}
```

Optionally, a companion metadata file `ai-domains/ai-systems-metadata.json` can store additional attributes (provider, jurisdiction, legal framework) for advanced filtering.

---

### Region Files

Region files define geographic scopes independently of any domain. They live in `regions/` and are referenced by policies.

```json
{
  "region": "EU",
  "name": "Europe",
  "countries": ["DE", "FR", "IT", "ES", "NL", "UK", "PL", "SE", "NO", "CH"]
}
```

Defined regions: EU, NA, SA, AS, AF, OC, ME.

Region files are the basis for the **region view** — a policy can select nodes by geographic scope without specifying any domain. This allows, for example, a policy that evaluates all known nodes within a given region regardless of their functional classification.

#### AI‑Specific Region Files (Extension)

AI governance region files reside in `ai-regions/` and extend the classic region concept with legal framework metadata. They are referenced the same way as classic regions but can also be used inside `jurisdictions` match predicates.

Example `ai-regions/eu-ai-act.json`:
```json
{
  "region": "eu-ai-act",
  "name": "EU AI Act Jurisdiction",
  "governance_framework": "EU AI Act",
  "risk_classes": ["unacceptable", "high", "limited", "minimal"],
  "countries": ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","NO","IS","LI"]
}
```

---

### Analysis Profiles

Define the **how** — weights, thresholds, and simulation parameters for evaluation.

```json
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

#### AI‑Specific Analysis Profiles (Extension)

AI analysis profiles add fields for compliance scoring, security, transparency, and overload detection. They are stored in `analysis-profiles/` alongside classic profiles.

Example `ai-governance-analysis.json` (excerpt):
```json
{
  "id": "ai-governance-analysis",
  "weights": {
    "security": 5,
    "compliance": 5,
    "transparency": 4,
    "data_residency": 4,
    "latency": 2,
    "availability": 3
  },
  "compliance_scoring": {
    "EU AI Act": { "high_risk_penalty": 35, "weight": 5 },
    "Basic Act on AI (KR)": { "extraterritorial_penalty": 10, "weight": 4 }
  },
  "thresholds": { "BLU": 0.95, "GRN": 0.80, "AMB": 0.60, "RED": 0.0 }
}
```

---

### Measurement Profiles (Extension)

Measurement profiles are a new file type (not present in the original IOF). They define **operational measurement methods** for active and passive probing. They are stored in `measurement-profiles/` and referenced from a policy's `how` array.

**Passive profile example** (`ai-entrypoint-measure-passive.json`):
```json
{
  "id": "ai-entrypoint-passive",
  "conflictClass": "passive",
  "access_class": "public",
  "schedule": { "interval": 600, "unit": "seconds" },
  "method": { "primary": "HEAD", "fallback": "GET" },
  "legal": { "robotsTxtRespect": true, "maxRequestsPerMinute": 2 }
}
```

**Active compliance profile** (`ai-compliance-active.json`):
```json
{
  "id": "ai-compliance-active",
  "conflictClass": "active",
  "authorization_required": true,
  "method": { "primary": "POST", "payload_template": { "model": "{{model_name}}" } },
  "legal": { "requires_consent": true, "compliance_frameworks": ["EU AI Act Art. 53"] }
}
```

---

## file-index.json — The Index Contract

The one-pager runtime (`index.html`) cannot query the server for a directory listing. The file `file-index.json` is the **single source of truth** for all loadable data files.

**Rules:**

1. `file-index.json` is generated by `node generate-index.js` — never edited by hand.
2. After adding, removing, or renaming any `.json` data file, run `generate-index.js` to update the index.
3. The index contains all files under `governance-profiles/`, `policies/`, `analysis-profiles/`, `domains/`, `regions/`, `ai-domains/`, `ai-regions/`, `measurement-profiles/`, and `docs/`.
4. The index includes a `generated` timestamp for traceability.

```json
{
  "generated": "2026-05-03T00:00:00.000Z",
  "files": [
    "./governance-profiles/eu-innovation.json",
    "./ai-domains/llm/global.json",
    "..."
  ]
}
```

---

## Schema Constraints

These rules apply to all data files and MUST be respected when extending the framework:

- Every governance profile MUST have a `policies` array (may be empty).
- Every policy MUST have a `what` object with at least one of `domains`, `regions`, or `ai_systems`.
- Every policy MUST have a `how` array referencing at least one analysis profile or measurement profile.
- Region references in `what.regions` MUST be relative file paths (e.g. `./regions/eu.json`), not bare strings.
- Domain references in `what.domains` MAY use glob patterns (`*`) which the runtime resolves against the file index.
- AI‑specific `what.ai_systems` references MUST resolve to files under `ai-domains/`.
- Domain node files MUST have a `nodes` array (may be empty).
- Region files MUST have a `region` code, a `name`, and a `countries` array.
- Measurement profiles MUST have a `conflictClass` (`passive`/`active`/`stress`), a `schedule`, a `method`, and a `legal` object.
- `file-index.json` MUST be regenerated after any structural change.

---

## Extending the Framework

**Adding a new domain:**

1. Create `domains/{new-domain}/` directory.
2. Add node files following the schema.
3. Add the domain constant to the TypeScript type in README.md.
4. Run `node generate-index.js`.
5. Reference the domain in a policy if desired.

**Adding a new AI domain (e.g. `llm`):**

1. Create `ai-domains/llm/` and add JSON files (e.g. `global.json`, `eu.json`).
2. Optionally add `ai-domains/ai-systems-metadata.json`.
3. Run `node generate-index.js`.
4. Reference the AI domain via `what.ai_systems.match` in a policy.

**Adding a new region:**

1. Create `regions/{code}.json` with the region schema.
2. Run `node generate-index.js`.
3. Reference the region file path in a policy if desired.

**Adding an AI governance region (legal framework):**

1. Create `ai-regions/{name}.json` (e.g. `eu-ai-act.json`).
2. Run `node generate-index.js`.
3. Reference it in a policy’s `what.regions` or in a `jurisdictions` match predicate.

**Adding a new policy:**

1. Create `policies/{id}.json` with the policy schema.
2. Reference it from a governance profile's `policies` array.
3. Run `node generate-index.js`.

**Adding a new governance profile:**

1. Create `governance-profiles/{id}.json`.
2. Run `node generate-index.js`.
3. The runtime will offer it in the governance selector automatically.

**Adding a measurement profile:**

1. Create `measurement-profiles/{id}.json` with the required fields.
2. Reference it in a policy’s `how` array.
3. Run `node generate-index.js`.

---

## Design Decisions

**Why separate domain and region axes?**
A domain node (e.g. a media outlet in Germany) has both a functional classification (media) and a geographic location (EU/DE). These are independent attributes. A policy should be able to filter on either or both. Merging them into a single hierarchy would prevent region-only views and make cross-domain regional analysis impossible.

**Why no aggregator files (e.g. `media/eu.json`)?**
Aggregator files at the region level were removed because they duplicate country-level data and create inconsistency. The file index and runtime resolve domain files by path pattern — aggregation happens at runtime, not in the file system.

**Why `file-index.json` instead of dynamic directory listing?**
The runtime is a static one-pager with no server-side logic. Server directory listings are not available in this deployment model. A generated index file is the minimal, reliable solution that keeps the runtime dependency-free.

**Why relative file paths in policies?**
Policies reference governance profiles, analysis profiles, and region files by relative path (e.g. `./regions/eu.json`). This makes the repository self-contained and portable — no base URL configuration is needed.

**Why separate AI‑specific folders (`ai-domains/`, `ai-regions/`, `measurement-profiles/`)?**
AI systems introduce new functional categories (LLM, TTS, embedding) and legal frameworks (EU AI Act, Basic Act on AI) that are not easily mapped to classic internet domains. Separate folders keep the ontology clean while still following the same query and evaluation logic. Measurement profiles are a new concept that was not required for classic URL reachability but is essential for AI API monitoring.

