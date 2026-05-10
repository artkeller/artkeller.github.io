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
