

---

## README.md (aktualisiert)

```markdown
# Internet Ontology Framework (IOF)

## A Multi-Perspective Ontology for Internet Reachability, Resilience, and Strategic Functionality

**Extended to include AI system observability and compliance governance.**

---

## Status

This document specifies the Internet Ontology Framework (IOF). Distribution is unlimited.

The IOF defines a conceptual and technical foundation for modeling Internet reachability and functional availability across multiple dimensions. It does not define a wire protocol and does not require IANA actions.

---

## Abstract

The Internet Ontology Framework (IOF) is a structured data model for observing and evaluating Internet reachability, resilience, and functional availability. It replaces binary monitoring approaches with a multi-dimensional model that distinguishes between local observability, global systemic behavior, and strategic functional availability.

The IOF separates semantic classification from measurement endpoints. This enables extensibility, neutrality, and applicability across domains such as industrial systems, public infrastructure, digital platforms, **and AI systems**.

**Scope:** The IOF is explicitly oriented toward availability analysis for economic, industrial, and innovation-driven purposes. It aligns with principles of open innovation, interoperability, and responsible technology development. **AI extensions enable governance‑aware measurement of AI API endpoints, compliance with the EU AI Act, the Korean Basic Act on AI, and other regional frameworks.**

---

## Table of Contents

1. Introduction
2. Terminology
3. Scope and Non-Goals
4. Architectural Overview
5. Perspective Dimension
6. Domain Dimension
7. Meta-Dimensions
8. Data Model
9. Semantic Interpretation
10. Design Considerations
11. Security Considerations
12. IANA Considerations

---

## 1. Introduction

The Internet has evolved into critical infrastructure supporting industrial production, financial systems, governance, and information exchange. Traditional monitoring approaches focus on reachability and uptime but cannot represent:

- Functional dependencies between systems
- Geographic variability and regional fragmentation
- Policy-induced access restrictions
- Sector-specific availability requirements

The IOF provides a structured ontology that enables multi-dimensional modeling of Internet observability. It is designed to support multi-perspective analysis, domain-specific evaluation, resilience assessment, and economic availability analysis.

**AI Extension:** With the proliferation of AI systems as critical infrastructure (LLM APIs, embedding services, real‑time video generation), the IOF has been extended to model AI entry points, their legal compliance frameworks, and governance‑specific measurement profiles. This allows operators and regulators to assess not only reachability but also adherence to emerging AI laws (EU AI Act, Korean Basic Act, China’s Algorithmic Provisions, etc.) and overload resilience.

---

## 2. Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

| Term        | Definition                                                     |
|-------------|----------------------------------------------------------------|
| Node        | An abstract representation of a measurable Internet entity     |
| View        | A projection representing a specific observational perspective |
| Domain      | Functional classification of a node                            |
| Region      | Geographic or geopolitical classification                      |
| Policy      | A rule set combining domains, regions, and analysis method     |
| Governance  | A profile defining which policies apply and why                |
| Measurement | A method for evaluating a node                                 |
| **AI Entry Point** | A URL (API, web UI, SDK) that provides access to an AI system |

---

## 3. Scope and Non-Goals

### 3.1 Scope

The IOF defines a framework for:

- Modeling Internet reachability across multiple perspectives
- Evaluating functional availability of economically relevant systems
- Supporting resilience analysis in industrial and digital ecosystems
- Enabling interoperability across monitoring and observability tools
- **Assessing availability and compliance of AI system endpoints (AI Extension)**

### 3.2 Non-Goals

The IOF does NOT:

- Define network protocols or transport mechanisms
- Provide mechanisms for active interference or control
- Target intelligence gathering, surveillance, or offensive security use cases
- Guarantee completeness of global Internet representation

### 3.3 Ethical Alignment

Implementations SHOULD align with principles of open innovation, interoperability, transparency, and accountability. The framework is designed to be consistent with European approaches to digital sovereignty and collaborative innovation. **AI‑specific measurement profiles include a `conflictClass` (`passive`/`active`/`stress`) and `legal` constraints to avoid unauthorized probing.**

---

## 4. Architectural Overview

The IOF defines three orthogonal dimensions:

| Dimension       | Description                                      |
|-----------------|--------------------------------------------------|
| Perspective     | Observational viewpoint (local/global/strategic) |
| Domain          | Functional classification of nodes               |
| Meta-Dimensions | Geography, access type, protocol, criticality    |

These dimensions are independent and composable.

The runtime is organized as a layered configuration stack:

```
Governance  ->  Policy  ->  Domains + Regions  ->  Analysis + Measurement
   WHY            WHAT          WHERE               HOW
```

A **Governance profile** defines the purpose and references one or more policies.
A **Policy** selects domains and/or regions and references an analysis and/or measurement profile.
**Domain files** contain URL nodes classified by functional role.
**Region files** define geographic scopes with country lists.
**Analysis profiles** define evaluation weights and thresholds.
**Measurement profiles** (AI Extension) define operational probing methods (passive/active/stress).

---

## 5. Perspective Dimension

### 5.1 Views

| View      | Description                                     |
|-----------|-------------------------------------------------|
| Local     | Observability from a specific execution context |
| Global    | System-wide behavior of the Internet            |
| Strategic | Availability of functionally critical domains   |

### 5.2 Local View

Describes reachability from a specific node or network environment.

| Scope    | Description                      |
|----------|----------------------------------|
| Loopback | Local host communication         |
| LAN      | Local network                    |
| Intranet | Organizational internal services |
| Edge     | Gateway and boundary devices     |
| Internet | External connectivity            |

### 5.3 Global View

Models the Internet as a distributed system.

| Aspect        | Description                          |
|---------------|--------------------------------------|
| Connectivity  | Reachability across regions          |
| Fragmentation | Regional accessibility differences   |
| Latency       | Temporal performance characteristics |
| Resilience    | Behavior under failure conditions    |
| Censorship    | Presence of filtering or blocking    |

### 5.4 Strategic View

Evaluates availability of systems critical to societal and economic functions. Abstracts from pure connectivity and focuses on functional operability.

**AI Extension:** In the strategic view, AI systems (especially large language models, embedding APIs, and real‑time media generators) are treated as critical infrastructure. Their availability directly affects economic sectors such as finance, health, logistics, and public administration.

---

## 6. Domain Dimension

Domains classify nodes by functional role. A policy may reference any combination of domains or none (region-only mode).

| Domain         | Description                         |
|----------------|-------------------------------------|
| infrastructure | Core Internet services              |
| industrial     | Production and supply chain systems |
| media          | Information dissemination systems   |
| government     | Public administration               |
| platform       | Digital ecosystems and dev tools    |
| x-initiatives  | Cross-industry federations          |
| science        | Research and knowledge systems      |
| finance        | Financial systems                   |

**AI Extension – AI‑specific domains:**  
To model AI systems, the following additional domains are defined and stored in the separate `ai-domains/` folder:

| AI Domain         | Description                                   |
|-------------------|-----------------------------------------------|
| llm               | Large Language Model APIs (chat, completion)  |
| embedding         | Vector embedding services                     |
| image             | Image generation and editing APIs             |
| code              | Code generation and analysis APIs             |
| tts               | Text‑to‑Speech and voice synthesis            |
| video             | Video generation, avatar platforms            |
| overload_detection| Public endpoints reporting network overload   |
| governance        | Regulatory portals, compliance checkers       |

Nodes SHOULD be assigned to at least one domain. Nodes MAY belong to multiple domains if functionally justified.

---

## 7. Meta-Dimensions

### 7.1 Geography

Regions classify nodes geographically. A policy may reference any combination of regions or none (domain-only mode). The following region codes are defined:

| Code | Name          |
|------|---------------|
| EU   | Europe        |
| NA   | North America |
| SA   | South America |
| AS   | Asia          |
| AF   | Africa        |
| OC   | Oceania       |
| ME   | Middle East   |

Region files live in `regions/{code}.json` and define the member country list.

**AI Extension – Governance‑specific regions:**  
For AI compliance, additional region files reside in `ai-regions/`. They include legal framework metadata and are used in policies that filter by `jurisdiction` or `legal_framework`.

| Region file            | Governance Framework                   |
|------------------------|----------------------------------------|
| `eu-ai-act.json`       | EU AI Act + GDPR                       |
| `us-ai-federal.json`   | US Executive Order + state laws (CA/NY)|
| `cn-ai-cyberspace.json`| China’s Algorithmic Provisions, PIPL   |
| `kr-ai-basic-act.json` | South Korea Basic Act on AI (2026)     |
| `br-lgpd-proposed.json`| Brazil LGPD + proposed AI Act          |

### 7.2 Access Type

| Type       | Description                          |
|------------|--------------------------------------|
| open       | Publicly accessible                  |
| restricted | Limited by policy or region          |
| internal   | Private network                      |
| federated  | Requires identity or trust framework |

**AI Extension – AI‑specific access classes:**
| Class      | Description                                         |
|------------|-----------------------------------------------------|
| public     | No authentication required (e.g. public chat UI)    |
| api_key    | API key required (typical for LLM APIs)             |
| restricted | Only available in certain jurisdictions             |
| regulated  | Subject to specific legal audit (EU AI Act high‑risk)|

### 7.3 Protocol

| Protocol | Description               |
|----------|---------------------------|
| https    | Web access                |
| dns      | Name resolution           |
| api      | Programmatic access       |
| custom   | Domain-specific protocols |

### 7.4 Measurement Type

| Type         | Description         |
|--------------|---------------------|
| reachability | Accessibility       |
| latency      | Response time       |
| availability | Stability over time |
| consistency  | Result uniformity   |

**AI Extension – Measurement profiles:**  
For AI entry points, the IOF introduces dedicated measurement profiles that define how (and how often) to probe an endpoint, including legal constraints. They are referenced in a policy’s `how` array and may be of class `passive`, `active`, or `stress`.

### 7.5 Criticality

| Level | Description        |
|-------|--------------------|
| 1     | Low relevance      |
| 2     | Moderate relevance |
| 3     | Important          |
| 4     | High importance    |
| 5     | System-critical    |

---

## 8. Data Model

### 8.1 Node File (domain data)

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

`domain` and `region` are optional depending on view context.

**AI‑specific node file example** (`ai-domains/llm/global.json`):
```json
{
  "domain": "llm",
  "description": "Large Language Models with global API access",
  "countries": ["*"],
  "nodes": [
    "https://api.openai.com/v1",
    "https://api.anthropic.com",
    "https://api.x.ai/v1"
  ]
}
```

### 8.2 Region File

```json
{
  "region": "EU",
  "name": "Europe",
  "countries": ["DE", "FR", "IT", "ES", "NL", "UK"]
}
```

**AI‑specific region file** (`ai-regions/eu-ai-act.json`):
```json
{
  "region": "eu-ai-act",
  "name": "EU AI Act Jurisdiction",
  "governance_framework": "EU AI Act",
  "risk_classes": ["unacceptable", "high", "limited", "minimal"],
  "countries": ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","NO","IS","LI"]
}
```

### 8.3 Policy File

```json
{
  "id": "default-economic-policy",
  "what": {
    "domains": ["./domains/infrastructure/*", "./domains/media/*"],
    "regions": ["./regions/eu.json", "./regions/na.json"]
  },
  "how": ["./analysis-profiles/standard-analysis.json"],
  "selection": {
    "regex": true,
    "recursive": true
  }
}
```

`what.domains` and `what.regions` are both optional. A policy with only `domains` performs a domain-only view. A policy with only `regions` performs a region-only view. Both together gives a combined view.

**AI policy with match predicates** (`ai-global-reachability-policy.json`):
```json
{
  "id": "ai-global-reachability",
  "what": {
    "ai_systems": {
      "match": [
        { "field": "category", "op": "in", "value": ["llm", "embedding"] },
        { "field": "access_type", "op": "in", "value": ["api", "web"] }
      ],
      "matchLogic": "AND"
    }
  },
  "how": [
    "./analysis-profiles/ai-governance-analysis.json",
    "./measurement-profiles/ai-entrypoint-measure-passive.json"
  ]
}
```

### 8.4 Governance File

```json
{
  "id": "eu-innovation",
  "name": "European Innovation Governance",
  "policies": [
    "./policies/default-economic-policy.json"
  ],
  "description": {
    "purpose": "Economic availability and industrial resilience",
    "views": ["multiPerspectiveAnalysis", "resilienceAssessment"]
  }
}
```

### 8.5 Analysis Profile

```json
{
  "id": "standard-analysis",
  "weights": { "infrastructure": 5, "continent": 4, "country": 1 },
  "latency": { "good": 500, "acceptable": 1500 },
  "thresholds": { "green": 60, "yellow": 30 }
}
```

**AI‑specific analysis profile** (`ai-governance-analysis.json`):
```json
{
  "id": "ai-governance-analysis",
  "weights": { "security": 5, "compliance": 5, "transparency": 4, "data_residency": 4 },
  "compliance_scoring": {
    "EU AI Act": { "high_risk_penalty": 35, "weight": 5 }
  },
  "thresholds": { "BLU": 0.95, "GRN": 0.80, "AMB": 0.60, "RED": 0.0 }
}
```

### 8.6 Measurement Profile (AI Extension)

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

### 8.7 TypeScript Reference Type

```ts
type OntologyNode = {
  id: string;
  view: "local" | "global" | "strategic";
  domain?: "infrastructure" | "industrial" | "media" | "government"
         | "finance" | "science" | "platform" | "x-initiatives"
         | "llm" | "embedding" | "image" | "code" | "tts" | "video" | "overload_detection" | "governance";
  region?: "EU" | "NA" | "SA" | "AS" | "AF" | "OC" | "ME" | "eu-ai-act" | "us-ai-federal" | "cn-ai-cyberspace" | "kr-ai-basic-act" | "br-lgpd-proposed";
  country?: string;            // ISO 3166-1 alpha-2
  access?: "open" | "restricted" | "internal" | "federated" | "api_key" | "regulated";
  protocol?: "https" | "dns" | "api" | "custom";
  measurement?: "reachability" | "latency" | "availability" | "consistency";
  criticality?: 1 | 2 | 3 | 4 | 5;
  // AI Extension fields
  ai_category?: "llm" | "embedding" | "image" | "code" | "tts" | "video";
  legal_framework?: string[];
  data_residency?: string;
};
```

Both `domain` and `region` are optional to allow pure domain-views, pure region-views, and combined views.

---

## 9. Semantic Interpretation

| Layer      | Description                                    |
|------------|------------------------------------------------|
| Physical   | Network reachability                           |
| Functional | Service operability                            |
| Systemic   | Preservation of societal and economic function |

Implementations SHOULD distinguish between layers to avoid misinterpretation.

**AI Extension – Compliance layer:** For AI systems, an additional interpretative layer is defined: *Governance compliance* – measures whether an AI endpoint adheres to applicable legal frameworks (e.g., EU AI Act transparency, Korean audit requirements). This is reflected in analysis profiles that assign penalty scores for missing compliance features.

---

## 10. Design Considerations

**Separation of concerns** — semantic classification MUST be independent of measurement endpoints.

**Extensibility** — the ontology MUST allow addition of new domains, regions, and attributes without structural changes to existing files.

**View flexibility** — a policy MUST support domain-only, region-only, and combined domain+region views. For AI systems, the same principle applies using `ai_systems` instead of `domains`.

**Neutrality** — the framework MUST NOT assume geographic or political bias.

**Partial failure** — the model MUST support partial connectivity scenarios.

**file-index.json** — the one-pager runtime cannot parse the server directory. `file-index.json` is the authoritative list of all data files. It is generated by `generate-index.js` and MUST NOT be edited manually. Run `node generate-index.js` after any structural change.

**Legal‑aware measurement** — For AI endpoints, measurement profiles include `conflictClass` and `legal` constraints to ensure that probing respects robots.txt, rate limits, and jurisdictional consent requirements. Active and stress profiles require explicit authorization.

---

## 11. Security Considerations

The IOF itself does not introduce new network protocols. However:

- Measurement endpoints MAY expose sensitive metadata
- Active probing MAY be interpreted as scanning
- Access-restricted systems MUST NOT be probed without authorization

Implementations SHOULD respect legal and policy constraints.

**AI‑specific considerations:**

- Active compliance probes (e.g., sending test prompts to an LLM API) may be subject to terms of service. Measurement profiles with `conflictClass: "active"` MUST NOT be used without explicit written permission.
- Stress profiles (`conflictClass: "stress"`) may cause service degradation and SHALL only be used in isolated test environments or with the explicit consent of the API provider.
- Passive monitoring (HEAD requests) is generally considered safe and is the default for public AI entry points.

---

## 12. IANA Considerations

This document has no IANA actions.

---

## References

- RFC 2119 — Key words for use in RFCs
- EU AI Act (Regulation (EU) 2024/1689)
- Republic of Korea Basic Act on Artificial Intelligence (2026)
