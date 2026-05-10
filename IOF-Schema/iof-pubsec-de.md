# pubsec-de

Nachfolgend ein mögliches JSON-LD Schema gemäß der Ontologie von [Schema.org](https://schema.org?utm_source=chatgpt.com), 
das die IOF-Missionsdaten semantisch abbildet. 

Da Schema.org keine direkte Ontologie für KRITIS-/Monitoring-/Cyber-Readiness-Objekte besitzt, erfolgt die Modellierung über:

* `Dataset`
* `DataCatalog`
* `DefinedTermSet`
* `DefinedTerm`
* `Observation`
* `Organization`
* `WebSite`
* `PropertyValue`
* `CreativeWork`

sowie eigene Namespaces (`iof:`) zur Erweiterung.

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "iof": "https://iof.example/ontology#"
  },

  "@type": "Dataset",
  "@id": "iof:mission:20260510T065405:pubsec-de",

  "name": "IOF KRITIS / Public Sector Mission DE",
  "description": "Passive readiness and availability validation for German public sector and KRITIS entities under NIS2 and BSI-KritisV constraints.",

  "version": "open-iof/1.0",

  "dateCreated": "2026-05-10T06:54:05.450Z",

  "creator": {
    "@type": "Organization",
    "name": "IOF Validator",
    "softwareVersion": "9.4"
  },

  "keywords": [
    "KRITIS",
    "NIS2",
    "Public Sector",
    "Cybersecurity",
    "Availability Monitoring",
    "Germany"
  ],

  "spatialCoverage": {
    "@type": "Country",
    "name": "Germany",
    "identifier": "DE"
  },

  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "governance",
      "value": "pubsec-de"
    },
    {
      "@type": "PropertyValue",
      "name": "structuralReadiness",
      "value": "PASS"
    },
    {
      "@type": "PropertyValue",
      "name": "deepReadiness",
      "value": "PASS"
    },
    {
      "@type": "PropertyValue",
      "name": "colourState",
      "value": "GRN"
    },
    {
      "@type": "PropertyValue",
      "name": "resolvedCount",
      "value": 49
    },
    {
      "@type": "PropertyValue",
      "name": "suspectedCount",
      "value": 3
    }
  ],

  "hasPart": [

    {
      "@type": "DefinedTermSet",
      "@id": "#analysis-profile-kritis",
      "name": "KRITIS / NIS2 Critical Infrastructure Analysis",
      "description": "Strict availability analysis for KRITIS-regulated and NIS2 essential entities.",
      "version": "1.0",

      "inDefinedTermSet": {
        "@type": "DefinedTerm",
        "name": "BSI-KritisV §10"
      },

      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "GRN Threshold",
          "value": 0.95
        },
        {
          "@type": "PropertyValue",
          "name": "AMB Threshold",
          "value": 0.85
        },
        {
          "@type": "PropertyValue",
          "name": "TLS Required",
          "value": true
        }
      ]
    },

    {
      "@type": "DefinedTermSet",
      "@id": "#measurement-profile-passive-critical",
      "name": "Passive Critical Infrastructure Measurement",
      "description": "Passive measurement profile for KRITIS and NIS2 essential entities.",
      "version": "1.0",

      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "interval",
          "value": "60 seconds"
        },
        {
          "@type": "PropertyValue",
          "name": "primaryMethod",
          "value": "HEAD"
        },
        {
          "@type": "PropertyValue",
          "name": "fallbackMethod",
          "value": "GET"
        },
        {
          "@type": "PropertyValue",
          "name": "tlsMinVersion",
          "value": "TLS1.2"
        },
        {
          "@type": "PropertyValue",
          "name": "maxRequestsPerMinutePerUrl",
          "value": 1
        }
      ]
    },

    {
      "@type": "DataCatalog",
      "name": "Resolved Nodes",
      "dataset": [

        {
          "@type": "WebSite",
          "url": "https://www.bsi.bund.de",

          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "domain",
              "value": "pubsec"
            },
            {
              "@type": "PropertyValue",
              "name": "policy",
              "value": "pubsec-de-policy"
            },
            {
              "@type": "PropertyValue",
              "name": "country",
              "value": "DE"
            }
          ]
        },

        {
          "@type": "WebSite",
          "url": "https://www.cert-bund.de",

          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "domain",
              "value": "pubsec"
            },
            {
              "@type": "PropertyValue",
              "name": "policy",
              "value": "pubsec-de-policy"
            }
          ]
        },

        {
          "@type": "WebSite",
          "url": "https://www.telekom.de",

          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "domain",
              "value": "kritis"
            },
            {
              "@type": "PropertyValue",
              "name": "policy",
              "value": "kritis-de-policy"
            }
          ]
        },

        {
          "@type": "WebSite",
          "url": "https://www.bundesregierung.de",

          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "domain",
              "value": "kritis"
            },
            {
              "@type": "PropertyValue",
              "name": "policy",
              "value": "kritis-de-policy"
            }
          ]
        }

      ]
    },

    {
      "@type": "DataCatalog",
      "name": "Suspected Nodes",

      "dataset": [
        {
          "@type": "WebSite",
          "url": "https://www.bundesnetzagentur.de",

          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "status",
              "value": "suspected"
            },
            {
              "@type": "PropertyValue",
              "name": "reason",
              "value": "unreachable at validation time"
            },
            {
              "@type": "PropertyValue",
              "name": "testedAt",
              "value": "2026-05-10T06:54:05.450Z"
            }
          ]
        },

        {
          "@type": "WebSite",
          "url": "https://www.enbw.com",

          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "status",
              "value": "suspected"
            }
          ]
        },

        {
          "@type": "WebSite",
          "url": "https://www.e-on.de",

          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "status",
              "value": "suspected"
            }
          ]
        }
      ]
    }

  ]
}
```

Erweiterungsmöglichkeiten für eine vollständige semantische Ontologie:

* eigene IOF-Klassen:

  * `iof:Mission`
  * `iof:ReadinessProfile`
  * `iof:MeasurementProfile`
  * `iof:CriticalInfrastructureNode`
  * `iof:ColourState`

* Mapping auf:

  * DCAT (`dcat:Dataset`)
  * SOSA/SSN für Monitoring/Observations
  * SPDX für Policies/Compliance
  * W3C ODRL für Governance-Regeln
  * NIS2/BSI-KritisV als `Legislation`

Eine RDF/Turtle-Variante wäre für Linked-Data-Interoperabilität meist noch besser geeignet als reines Schema.org-JSON-LD.

```turtle
@prefix schema: <https://schema.org/> .
@prefix dcat:   <http://www.w3.org/ns/dcat#> .
@prefix dct:    <http://purl.org/dc/terms/> .
@prefix sosa:   <http://www.w3.org/ns/sosa/> .
@prefix ssn:    <http://www.w3.org/ns/ssn/> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .
@prefix iof:    <https://iof.example/ontology#> .
@prefix ex:     <https://iof.example/resource/> .

#################################################################
# Mission
#################################################################

ex:mission-20260510T065405-pubsec-de
    a iof:Mission ,
      dcat:Dataset ,
      schema:Dataset ;

    dct:identifier "iof:mission:20260510T065405:pubsec-de" ;
    dct:title "IOF KRITIS / Public Sector Mission DE" ;
    dct:description "Passive readiness and availability validation for German public sector and KRITIS entities under NIS2 and BSI-KritisV constraints." ;

    dct:created "2026-05-10T06:54:05.450Z"^^xsd:dateTime ;
    schema:version "open-iof/1.0" ;

    iof:governance "pubsec-de" ;

    iof:hasPolicy
        ex:policy-pubsec-de ,
        ex:policy-kritis-de ;

    iof:hasReadiness ex:readiness-20260510 ;

    dcat:theme
        ex:theme-pubsec ,
        ex:theme-kritis ;

    dct:spatial ex:country-de ;

    iof:resolvedCount 49 ;
    iof:suspectedCount 3 ;

    iof:hasAnalysisProfile ex:kritis-analysis-profile ;
    iof:hasMeasurementProfile ex:passive-critical-profile ;

    iof:hasResolvedNode
        ex:node-bsi ,
        ex:node-certbund ,
        ex:node-telekom ,
        ex:node-bundesregierung ;

    iof:hasSuspectedNode
        ex:node-bundesnetzagentur ,
        ex:node-enbw ,
        ex:node-eon
.

#################################################################
# Readiness
#################################################################

ex:readiness-20260510
    a iof:ReadinessStatus ;

    iof:structuralStatus "PASS" ;
    iof:deepStatus "PASS" ;
    iof:colourState iof:GRN ;

    iof:rftAt "2026-05-10T06:54:05.450Z"^^xsd:dateTime
.

#################################################################
# Country / Scope
#################################################################

ex:country-de
    a schema:Country ;

    schema:name "Germany" ;
    schema:identifier "DE"
.

ex:theme-pubsec
    a skos:Concept ;
    skos:prefLabel "Public Sector"@en
.

ex:theme-kritis
    a skos:Concept ;
    skos:prefLabel "Critical Infrastructure"@en
.

#################################################################
# Policies
#################################################################

ex:policy-pubsec-de
    a iof:Policy ;

    dct:title "Public Sector Germany Policy"
.

ex:policy-kritis-de
    a iof:Policy ;

    dct:title "KRITIS Germany Policy"
.

#################################################################
# Analysis Profile
#################################################################

ex:kritis-analysis-profile
    a iof:AnalysisProfile ;

    dct:title "KRITIS / NIS2 Critical Infrastructure Analysis" ;
    schema:version "1.0" ;

    dct:description """
Strict availability analysis for KRITIS-regulated and
NIS2 essential entities.
""" ;

    iof:standard
        "BSI-KritisV §10 / EU NIS2 Directive 2022/2555 Art.21 / IOF-ANALYSIS-v1" ;

    iof:thresholdGRN "0.95"^^xsd:decimal ;
    iof:thresholdAMB "0.85"^^xsd:decimal ;
    iof:thresholdRED "0.0"^^xsd:decimal ;

    iof:latencyGood 300 ;
    iof:latencyAcceptable 800 ;
    iof:latencyCritical 2000 ;

    iof:requiresTLSValidation true ;

    iof:control
        "TLS certificate validity must be checked" ,
        "Latency above critical threshold triggers AMB regardless of availability count" ,
        "Any node classified as essential (criticality >= 4) must individually respond"
.

#################################################################
# Measurement Profile
#################################################################

ex:passive-critical-profile
    a iof:MeasurementProfile ,
      sosa:Procedure ;

    dct:title "Passive Critical Infrastructure Measurement" ;
    schema:version "1.0" ;

    dct:description """
Passive measurement profile for KRITIS and NIS2 essential entities.
""" ;

    iof:conflictClass "passive" ;

    iof:interval 60 ;
    iof:intervalUnit "seconds" ;

    iof:primaryMethod "HEAD" ;
    iof:fallbackMethod "GET" ;

    iof:followRedirects 2 ;

    iof:tlsValidation true ;
    iof:tlsMinVersion "TLS1.2" ;
    iof:tlsExpiryWarningDays 30 ;

    iof:connectTimeout 3000 ;
    iof:responseTimeout 6000 ;
    iof:totalTimeout 8000 ;

    iof:maxRequestsPerMinutePerUrl 1 ;

    iof:recordMetric
        "latency_ms" ,
        "status_code" ,
        "tls_valid" ,
        "tls_expiry_days" ,
        "redirect_count" ,
        "dns_ms"
.

#################################################################
# Resolved Nodes
#################################################################

ex:node-bsi
    a iof:CriticalInfrastructureNode ,
      schema:WebSite ;

    schema:url <https://www.bsi.bund.de> ;

    iof:domain "pubsec" ;
    iof:country "DE" ;

    iof:sourceFile "./domains/pubsec/de/cyber.json" ;

    iof:policy ex:policy-pubsec-de ;

    iof:analysisProfile ex:kritis-analysis-profile ;
    iof:measurementProfile ex:passive-critical-profile ;

    iof:status iof:RESOLVED
.

ex:node-certbund
    a iof:CriticalInfrastructureNode ,
      schema:WebSite ;

    schema:url <https://www.cert-bund.de> ;

    iof:domain "pubsec" ;
    iof:country "DE" ;

    iof:status iof:RESOLVED
.

ex:node-telekom
    a iof:CriticalInfrastructureNode ,
      schema:WebSite ;

    schema:url <https://www.telekom.de> ;

    iof:domain "kritis" ;
    iof:country "DE" ;

    iof:status iof:RESOLVED
.

ex:node-bundesregierung
    a iof:CriticalInfrastructureNode ,
      schema:WebSite ;

    schema:url <https://www.bundesregierung.de> ;

    iof:domain "kritis" ;
    iof:country "DE" ;

    iof:status iof:RESOLVED
.

#################################################################
# Suspected Nodes
#################################################################

ex:node-bundesnetzagentur
    a iof:CriticalInfrastructureNode ,
      schema:WebSite ;

    schema:url <https://www.bundesnetzagentur.de> ;

    iof:domain "kritis" ;
    iof:country "DE" ;

    iof:status iof:SUSPECTED ;

    iof:suspectReason "unreachable at validation time" ;

    iof:suspectNote """
Transient conditions possible: DDoS, rate-limiting,
scan-blocking, maintenance.
""" ;

    iof:testedAt "2026-05-10T06:54:05.450Z"^^xsd:dateTime
.

ex:node-enbw
    a iof:CriticalInfrastructureNode ,
      schema:WebSite ;

    schema:url <https://www.enbw.com> ;

    iof:status iof:SUSPECTED
.

ex:node-eon
    a iof:CriticalInfrastructureNode ,
      schema:WebSite ;

    schema:url <https://www.e-on.de> ;

    iof:status iof:SUSPECTED
.

#################################################################
# Enumerations
#################################################################

iof:GRN a iof:ColourState .
iof:AMB a iof:ColourState .
iof:RED a iof:ColourState .
iof:BLU a iof:ColourState .

iof:RESOLVED a iof:NodeStatus .
iof:SUSPECTED a iof:NodeStatus .
```
