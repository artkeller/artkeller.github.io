# Internet Ontology Framework (IOF)

## A Multi-Perspective Ontology for Internet Reachability, Resilience, and Strategic Functionality

---

## Status of This Document

This document specifies the Internet Ontology Framework (IOF). Distribution of this document is unlimited.

This document is intended to provide a conceptual and technical foundation for modeling Internet reachability and functionality across multiple perspectives. It does not define a wire protocol and does not require IANA actions.

---

## Abstract

This document defines a formal ontology for the structured observation and evaluation of Internet reachability, resilience, and functional availability. Conventional monitoring approaches reduce Internet state to binary reachability or service uptime, which is insufficient for modern distributed systems and socio-technical dependencies.

The Internet Ontology Framework (IOF) introduces a multi-dimensional model that distinguishes between local observability, global systemic behavior, and strategic functional availability. It further defines a domain classification system and associated meta-dimensions to enable semantically meaningful interpretation of measurement results.

The IOF separates semantic classification from measurement endpoints, enabling extensibility, neutrality, and applicability across domains such as industrial systems, public infrastructure, digital platforms, and federated data ecosystems.

**The IOF is explicitly scoped to availability analysis for economic, industrial, and innovation-driven purposes. While the framework could be applied to other domains (e.g., security or intelligence analysis), such uses are out of scope. The framework aligns with principles of open innovation, interoperability, and responsible technology development as promoted within European research and innovation ecosystems.**

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
13. References

---

## 1. Introduction

The Internet has evolved into a critical infrastructure supporting industrial production, financial systems, governance, and information exchange. Traditional monitoring approaches focus on technical metrics such as reachability, latency, and uptime, but lack the ability to represent:

* Functional dependencies
* Geographic variability
* Policy-induced fragmentation
* Sector-specific availability

This document defines an ontology that enables structured modeling of Internet observability across multiple dimensions. The framework is designed to support:

* Multi-perspective analysis
* Domain-specific evaluation
* Resilience and fragmentation assessment
* Economic and industrial availability analysis

---

## 2. Terminology

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”,
“SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “NOT RECOMMENDED”,
“MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

### 2.1 Definitions

| Term        | Definition                                                     |
| ----------- | -------------------------------------------------------------- |
| Node        | An abstract representation of a measurable Internet entity     |
| View        | A projection representing a specific observational perspective |
| Domain      | Functional classification of a node                            |
| Measurement | A method for evaluating a node                                 |
| Region      | Geographic or geopolitical classification                      |

---

## 3. Scope and Non-Goals

### 3.1 Scope

The IOF defines a conceptual and technical framework for:

* Modeling Internet reachability across multiple perspectives
* Evaluating functional availability of economically relevant systems
* Supporting resilience analysis in industrial and digital ecosystems
* Enabling interoperability across monitoring and observability systems

The framework is explicitly oriented toward:

* Economic processes
* Industrial supply chains
* Digital platforms and ecosystems
* Innovation infrastructures

---

### 3.2 Non-Goals

The IOF does NOT:

* Define network protocols or transport mechanisms
* Provide mechanisms for active interference or control of systems
* Target intelligence gathering, surveillance, or offensive security use cases
* Guarantee completeness of global Internet representation

---

### 3.3 Ethical and Regulatory Alignment

Implementations of the IOF SHOULD align with:

* Principles of open innovation
* Interoperability and standardization
* Transparency and accountability
* Respect for legal and regulatory constraints

The framework is designed to be consistent with European approaches to digital sovereignty, industrial data spaces, and collaborative innovation ecosystems.

---

## 4. Architectural Overview

The IOF defines three orthogonal dimensions:

| Dimension       | Description                                  |
| --------------- | -------------------------------------------- |
| Perspective     | Observational viewpoint                      |
| Domain          | Functional classification                    |
| Meta-Dimensions | Attributes for evaluation and interpretation |

These dimensions are independent and composable.

---

## 5. Perspective Dimension

### 5.1 Overview

The framework defines three primary views:

| View      | Description                                     |
| --------- | ----------------------------------------------- |
| Local     | Observability from a specific execution context |
| Global    | System-wide behavior of the Internet            |
| Strategic | Availability of functionally critical domains   |

---

### 5.2 Local View

The Local View describes reachability from the perspective of a specific node or network environment.

#### 5.2.1 Scope Classification

| Scope    | Description                      |
| -------- | -------------------------------- |
| Loopback | Local host communication         |
| LAN      | Local network                    |
| Intranet | Organizational internal services |
| Edge     | Gateway and boundary devices     |
| Internet | External connectivity            |

Implementations SHOULD use the Local View to diagnose segmentation, routing, and policy enforcement effects.

---

### 5.3 Global View

The Global View models the Internet as a distributed system.

#### 5.3.1 Aspects

| Aspect        | Description                          |
| ------------- | ------------------------------------ |
| Connectivity  | Reachability across regions          |
| Fragmentation | Regional accessibility differences   |
| Latency       | Temporal performance characteristics |
| Resilience    | Behavior under failure conditions    |
| Censorship    | Presence of filtering or blocking    |

Implementations SHOULD consider regional diversity when evaluating Global View results.

---

### 5.4 Strategic View

The Strategic View evaluates the availability of systems that are critical to societal and economic functions.

This view abstracts from pure connectivity and focuses on functional operability.

---

## 6. Domain Dimension

### 6.1 Overview

Domains classify nodes based on functional role.

| Domain         | Description                         |
| -------------- | ----------------------------------- |
| Infrastructure | Core Internet services              |
| Industrial     | Production and supply chain systems |
| Science        | Research and knowledge systems      |
| Media          | Information dissemination systems   |
| Government     | Public administration               |
| Finance        | Financial systems                   |
| Platform       | Digital ecosystems                  |
| X-Initiatives  | Cross-industry federations          |

---

### 6.2 Domain Requirements

Implementations SHOULD assign nodes to at least one domain.
Nodes MAY belong to multiple domains if functionally justified.

---

## 7. Meta-Dimensions

### 7.1 Geography

| Attribute | Description               |
| --------- | ------------------------- |
| Region    | Geographic classification |

Regions SHOULD be defined consistently across implementations.

---

### 7.2 Access Type

| Type       | Description                          |
| ---------- | ------------------------------------ |
| Open       | Publicly accessible                  |
| Restricted | Limited by policy or region          |
| Internal   | Private network                      |
| Federated  | Requires identity or trust framework |

---

### 7.3 Protocol

| Protocol | Description               |
| -------- | ------------------------- |
| HTTPS    | Web access                |
| DNS      | Name resolution           |
| API      | Programmatic access       |
| Custom   | Domain-specific protocols |

---

### 7.4 Measurement Type

| Type         | Description         |
| ------------ | ------------------- |
| Reachability | Accessibility       |
| Latency      | Response time       |
| Availability | Stability over time |
| Consistency  | Result uniformity   |

---

### 7.5 Criticality

| Level | Description        |
| ----- | ------------------ |
| 1     | Low relevance      |
| 2     | Moderate relevance |
| 3     | Important          |
| 4     | High importance    |
| 5     | System-critical    |

Criticality SHOULD be used for weighting and prioritization.

---

## 8. Data Model

The following abstract data model is RECOMMENDED:

```ts
type OntologyNode = {
  id: string;

  view: "local" | "global" | "strategic";

  domain:
    | "infrastructure"
    | "industrial"
    | "media"
    | "government"
    | "finance"
    | "science"
    | "platform"
    | "x-initiatives";

  region?: string;

  access: "open" | "restricted" | "internal" | "federated";

  protocol: "https" | "dns" | "api" | "custom";

  measurement:
    | "reachability"
    | "latency"
    | "availability"
    | "consistency";

  criticality: 1 | 2 | 3 | 4 | 5;
};
```

Implementations MAY extend this model.

---

## 9. Semantic Interpretation

The IOF enables interpretation across three layers:

| Layer      | Description                                    |
| ---------- | ---------------------------------------------- |
| Physical   | Network reachability                           |
| Functional | Service operability                            |
| Systemic   | Preservation of societal and economic function |

Implementations SHOULD distinguish between these layers to avoid misinterpretation.

---

## 10. Design Considerations

### 10.1 Separation of Concerns

Semantic classification MUST be independent of measurement endpoints.

### 10.2 Extensibility

The ontology MUST allow addition of new domains and attributes.

### 10.3 Neutrality

The framework MUST NOT assume geographic or political bias.

### 10.4 Partial Failure

The model MUST support partial connectivity scenarios.

### 10.5 Purpose Limitation

Implementations SHOULD ensure that the framework is used for availability and resilience analysis in economic and innovation contexts.

---

## 11. Security Considerations

The IOF itself does not introduce new network protocols. However:

* Measurement endpoints MAY expose sensitive metadata
* Active probing MAY be interpreted as scanning
* Access-restricted systems MUST NOT be probed without authorization

Implementations SHOULD respect legal and policy constraints.

---

## 12. IANA Considerations

This document has no IANA actions.

---

## 13. References

* RFC 2119

---

## 14. Conclusion

The Internet Ontology Framework (IOF) provides a structured approach to modeling Internet observability beyond binary connectivity. By integrating multiple perspectives, domains, and meta-dimensions, it enables a comprehensive understanding of Internet state in technical, functional, and systemic terms.

The framework explicitly focuses on economic and industrial availability analysis, aligned with principles of responsible innovation and interoperability.

Future work includes mapping ontology nodes to concrete measurement endpoints and defining standardized evaluation procedures.

---
