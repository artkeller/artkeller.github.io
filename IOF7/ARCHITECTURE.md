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
│   └── global-neutral.json
│
├── policies/                     # WHAT + HOW selection rules
│   ├── default-economic-policy.json
│   └── resilience-policy.json
│
├── analysis-profiles/            # HOW: weights and thresholds
│   ├── standard-analysis.json
│   └── resilience-analysis.json
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
│   │       ├── de.json  (placeholder — to be added)
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
├── regions/                      # WHERE (region axis): geographic scopes
│   ├── eu.json
│   ├── na.json
│   ├── sa.json
│   ├── as.json
│   ├── af.json
│   ├── oc.json
│   └── me.json
│
├── docs/                         # Human-readable summaries (generated or curated)
│   ├── eu-innovation-doc.json
│   ├── global-neutral-doc.json
│   ├── default-policy-doc.json
│   └── resilience-policy-doc.json
│
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

---

## file-index.json — The Index Contract

The one-pager runtime (`index.html`) cannot query the server for a directory listing. The file `file-index.json` is the **single source of truth** for all loadable data files.

**Rules:**

1. `file-index.json` is generated by `node generate-index.js` — never edited by hand.
2. After adding, removing, or renaming any `.json` data file, run `generate-index.js` to update the index.
3. The index contains all files under `governance-profiles/`, `policies/`, `analysis-profiles/`, `domains/`, `regions/`, and `docs/`.
4. The index includes a `generated` timestamp for traceability.

```json
{
  "generated": "2026-04-25T00:00:00.000Z",
  "files": [
    "./governance-profiles/eu-innovation.json",
    "..."
  ]
}
```

---

## Schema Constraints

These rules apply to all data files and MUST be respected when extending the framework:

- Every governance profile MUST have a `policies` array (may be empty).
- Every policy MUST have a `what` object with at least one of `domains` or `regions`.
- Every policy MUST have a `how` array referencing at least one analysis profile.
- Region references in `what.regions` MUST be relative file paths (e.g. `./regions/eu.json`), not bare strings.
- Domain references in `what.domains` MAY use glob patterns (`*`) which the runtime resolves against the file index.
- Domain node files MUST have a `nodes` array (may be empty).
- Region files MUST have a `region` code, a `name`, and a `countries` array.
- `file-index.json` MUST be regenerated after any structural change.

---

## Extending the Framework

**Adding a new domain:**

1. Create `domains/{new-domain}/` directory.
2. Add node files following the schema.
3. Add the domain constant to the TypeScript type in README.md.
4. Run `node generate-index.js`.
5. Reference the domain in a policy if desired.

**Adding a new region:**

1. Create `regions/{code}.json` with the region schema.
2. Run `node generate-index.js`.
3. Reference the region file path in a policy if desired.

**Adding a new policy:**

1. Create `policies/{id}.json` with the policy schema.
2. Reference it from a governance profile's `policies` array.
3. Run `node generate-index.js`.

**Adding a new governance profile:**

1. Create `governance-profiles/{id}.json`.
2. Run `node generate-index.js`.
3. The runtime will offer it in the governance selector automatically.

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
