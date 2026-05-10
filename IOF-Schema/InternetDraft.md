# Internet-Draft

## Internet Ontology Framework (IOF) v0.1

### Draft Status: Experimental

### Intended Status: Informational / Experimental Standard

---

## Abstract

This document defines version 0.1 of the Internet Ontology Framework (IOF), a lightweight, interoperable representation model for describing cross-domain dependencies in digital infrastructure.

IOF introduces a declarative structure (“Mission File”) that enables consistent situational awareness across heterogeneous monitoring systems, ranging from lightweight scanners to large-scale analytical platforms.

---

## 1. Introduction

Modern critical infrastructure is composed of interconnected digital systems spanning multiple domains, including telecommunications, cloud infrastructure, energy systems, government services, and financial networks.

While monitoring systems exist within each domain, there is no standardised mechanism for representing **cross-domain dependencies and operational state correlations**.

IOF addresses this gap by defining a minimal, graph-oriented representation layer for infrastructure observability.

---

## 2. Terminology

* **Mission File**: A declarative specification describing an observation scope over digital infrastructure.
* **Node**: A resolvable infrastructure endpoint (e.g. service, domain, API).
* **Resolved Node**: A node with confirmed operational state.
* **Suspected Node**: A node with degraded or uncertain state.
* **Domain**: A functional classification of infrastructure (e.g. carrier, energy, government).
* **Scope**: Geographic and functional boundary definition.
* **Profile**: Configurable analysis or measurement behavior definition.

---

## 3. Architecture Overview

IOF defines a layered model:

### 3.1 Governance Layer

Defines constraints, policies, and scope selection rules.

### 3.2 Observation Layer

Defines measurement and analysis profiles applied to infrastructure.

### 3.3 Graph Layer

Represents infrastructure as a structured dependency graph.

### 3.4 State Layer

Represents observed operational states of nodes.

---

## 4. Core Object: Mission File

A Mission File is the central IOF artifact.

It is a machine-readable, tool-neutral representation containing:

* specification metadata
* governance context
* scope definition
* analysis profiles
* measurement profiles
* resolved nodes
* suspected nodes

### 4.1 Minimal Structure (conceptual)

```json
{
  "specVersion": "open-iof/0.1",
  "type": "Mission",
  "created": "timestamp",
  "generator": {
    "tool": "string",
    "version": "string"
  },
  "scope": {},
  "profiles": [],
  "resolvedNodes": [],
  "suspectedNodes": []
}
```

---

## 5. Scope Definition

Scope defines the operational boundary of the Mission.

Includes:

* domains (e.g. carrier, energy, government)
* regions (e.g. EU, DACH, global subsets)
* exclusions (explicitly removed categories)

Scope MUST be explicit. Wildcard usage SHOULD be restricted unless explicitly allowed by governance policy.

---

## 6. Profiles

### 6.1 Analysis Profiles

Define evaluation logic for interpreting observed states.

Includes:

* weighting models
* latency thresholds
* classification rules (e.g. availability states)

### 6.2 Measurement Profiles

Define how data is collected.

Includes:

* protocol selection (HEAD/GET)
* timing constraints
* retry logic
* legal constraints (robots, rate limits)

---

## 7. Node Model

### 7.1 Resolved Node

Represents an operationally reachable endpoint.

Includes:

* URL
* domain classification
* region mapping
* associated analysis and measurement profiles

### 7.2 Suspected Node

Represents an uncertain or degraded endpoint state.

Includes:

* failure reason
* timestamp of observation
* classification hint (temporary, blocked, degraded, unknown)

---

## 8. Dependency Representation

IOF does not explicitly define a fixed dependency ontology in v0.1.

Instead, dependencies are emergent properties of:

* shared scope membership
* correlated measurement profiles
* observed state transitions
* domain adjacency

Future versions MAY formalise dependency graphs explicitly.

---

## 9. Interoperability Requirements

IOF is designed to be consumable by:

* lightweight scanners (partial schema support)
* analytical platforms (full graph interpretation)
* governance systems (policy evaluation layer)

Implementations MUST tolerate unknown fields.

Implementations SHOULD ignore unsupported profile types gracefully.

---

## 10. Security Considerations

IOF data may reference critical infrastructure.

Implementations SHOULD:

* control access to resolved/suspected node data
* avoid inference-based misuse of partial datasets
* apply context-sensitive access policies where applicable

IOF does not define an authentication or transport layer.

---

## 11. Privacy Considerations

IOF operates on infrastructure-level metadata only.

It does not require or define processing of personal data.

However, implementations MUST ensure that:

* no unintended inference of personal data occurs via infrastructure correlation
* aggregation outputs comply with applicable data protection regulations

---

## 12. Open Issues (v0.1 Known Limitations)

* No formal dependency ontology
* No standard graph serialization binding beyond JSON(-LD potential)
* No canonical scoring model for cross-domain risk correlation
* No trust model for external node inclusion
* No normative validation schema yet defined

---

## 13. Future Work

Planned directions:

* formal JSON-LD context specification
* dependency graph formalisation
* trust and provenance model (PROV-O alignment)
* standardised colour/state model for interoperability
* minimal compliance profile for lightweight scanners

---

## 14. References (Informative)

* Critical Infrastructure Resilience frameworks (EU/NIS2-aligned concepts)
* Graph-based observability models
* Distributed systems monitoring architectures
* Semantic Web / RDF / JSON-LD principles

---

## 15. Authors' Note

IOF is intentionally designed as a **progressive specification**:

It does not assume a single implementation scale.

Instead, it defines a shared representation space between:

* minimal observation tools
* and large-scale analytical infrastructures

---

## 16. Closing Statement

> IOF does not define another monitoring system.
> It defines a shared way to describe what monitoring systems observe.

## APPENDIX

Formal JSON-LD normative specification (IOF Core Context v0.1)

```json
{
  "@context": {
    "@version": 1.1,

    "iof": "https://iof.example/schema#",
    "prov": "http://www.w3.org/ns/prov#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",

    /* =========================
       CORE TYPES
       ========================= */

    "Mission": "iof:Mission",
    "Generator": "iof:Generator",
    "Scope": "iof:Scope",
    "Readiness": "iof:Readiness",
    "Statistics": "iof:Statistics",

    "AnalysisProfile": "iof:AnalysisProfile",
    "MeasurementProfile": "iof:MeasurementProfile",
    "Policy": "iof:Policy",

    "ResolvedNode": "iof:ResolvedNode",
    "SuspectedNode": "iof:SuspectedNode",
    "Node": "iof:Node",

    "Domain": "iof:Domain",
    "Region": "iof:Region",

    /* =========================
       CORE IDENTIFIERS
       ========================= */

    "id": "@id",
    "type": "@type",

    "specVersion": {
      "@id": "iof:specVersion",
      "@type": "xsd:string"
    },

    "created": {
      "@id": "prov:generatedAtTime",
      "@type": "xsd:dateTime"
    },

    "updated": {
      "@id": "iof:updated",
      "@type": "xsd:dateTime"
    },

    "rftAt": {
      "@id": "iof:rftAt",
      "@type": "xsd:dateTime"
    },

    "testedAt": {
      "@id": "iof:testedAt",
      "@type": "xsd:dateTime"
    },

    /* =========================
       STRUCTURAL RELATIONS
       ========================= */

    "scope": {
      "@id": "iof:scope",
      "@type": "@id"
    },

    "profiles": {
      "@id": "iof:profiles",
      "@container": "@set"
    },

    "analysis": {
      "@id": "iof:analysis",
      "@container": "@set",
      "@type": "@id"
    },

    "measurement": {
      "@id": "iof:measurement",
      "@container": "@set",
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

    /* =========================
       NODE MODEL
       ========================= */

    "url": {
      "@id": "iof:url",
      "@type": "@id"
    },

    "domain": {
      "@id": "iof:domain",
      "@type": "xsd:string"
    },

    "countries": {
      "@id": "iof:countries",
      "@container": "@set",
      "@type": "xsd:string"
    },

    "sourceFile": {
      "@id": "iof:sourceFile",
      "@type": "xsd:string"
    },

    "policy": {
      "@id": "iof:policy",
      "@type": "@id"
    },

    "alsoIn": {
      "@id": "iof:alsoIn",
      "@container": "@set"
    },

    /* =========================
       GENERATOR METADATA
       ========================= */

    "generator": {
      "@id": "prov:wasGeneratedBy",
      "@type": "@id"
    },

    "tool": {
      "@id": "iof:tool",
      "@type": "xsd:string"
    },

    "version": {
      "@id": "iof:version",
      "@type": "xsd:string"
    },

    "governance": {
      "@id": "iof:governance",
      "@type": "xsd:string"
    },

    "policies": {
      "@id": "iof:policies",
      "@container": "@set",
      "@type": "@id"
    },

    /* =========================
       READINESS MODEL
       ========================= */

    "readiness": {
      "@id": "iof:readiness",
      "@type": "@id"
    },

    "structural": {
      "@id": "iof:structural",
      "@type": "xsd:string"
    },

    "deep": {
      "@id": "iof:deep",
      "@type": "xsd:string"
    },

    "colourState": {
      "@id": "iof:colourState",
      "@type": "xsd:string"
    },

    /* =========================
       STATISTICS
       ========================= */

    "statistics": {
      "@id": "iof:statistics",
      "@type": "@id"
    },

    "resolvedCount": {
      "@id": "iof:resolvedCount",
      "@type": "xsd:integer"
    },

    "suspectedCount": {
      "@id": "iof:suspectedCount",
      "@type": "xsd:integer"
    },

    "suspectedNote": {
      "@id": "iof:suspectedNote",
      "@type": "xsd:string"
    },

    /* =========================
       SCOPE MODEL
       ========================= */

    "domains": {
      "@id": "iof:domains",
      "@container": "@set"
    },

    "regions": {
      "@id": "iof:regions",
      "@container": "@set"
    },

    "excludes": {
      "@id": "iof:excludes",
      "@container": "@set"
    },

    /* =========================
       PROFILE MODELS
       ========================= */

    "weights": {
      "@id": "iof:weights",
      "@type": "@json"
    },

    "latency": {
      "@id": "iof:latency",
      "@type": "@json"
    },

    "thresholds": {
      "@id": "iof:thresholds",
      "@type": "@json"
    },

    "schedule": {
      "@id": "iof:schedule",
      "@type": "@json"
    },

    "method": {
      "@id": "iof:method",
      "@type": "@json"
    },

    "timeouts": {
      "@id": "iof:timeouts",
      "@type": "@json"
    },

    "metrics": {
      "@id": "iof:metrics",
      "@type": "@json"
    },

    "alerting": {
      "@id": "iof:alerting",
      "@type": "@json"
    },

    "legal": {
      "@id": "iof:legal",
      "@type": "@json"
    },

    "sources": {
      "@id": "iof:sources",
      "@type": "@json"
    },

    /* =========================
       SUSPECT STATE MODEL
       ========================= */

    "suspect": {
      "@id": "iof:suspect",
      "@type": "@id"
    },

    "reason": {
      "@id": "iof:reason",
      "@type": "xsd:string"
    },

    "note": {
      "@id": "iof:note",
      "@type": "xsd:string"
    },

    "status": {
      "@id": "iof:status",
      "@type": "xsd:string"
    },

    "includeGlobal": {
      "@id": "iof:includeGlobal",
      "@type": "xsd:boolean"
    },

    "matchLogic": {
      "@id": "iof:matchLogic",
      "@type": "xsd:string"
    },

    "match": {
      "@id": "iof:match",
      "@container": "@set"
    },

    "field": {
      "@id": "iof:field",
      "@type": "xsd:string"
    },

    "op": {
      "@id": "iof:op",
      "@type": "xsd:string"
    },

    "value": {
      "@id": "iof:value",
      "@type": "@json"
    }
  }
}
```
