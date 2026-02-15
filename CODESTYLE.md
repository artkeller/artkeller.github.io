# Coding Standards & Security Principles

**Standard:** ARTKELLER Purist Code Policy

## 1. Core Principles
- **No External Dependencies:** No use of package managers or external libraries to prevent supply-chain attacks.
- **Vanilla Only:** Direct use of Web APIs to ensure longevity and auditability.

## 2. Security Patterns (Art. 13 CRA)
- **Input Validation:** All dynamic data (e.g., from `localStorage`) is treated as untrusted.
- **XSS Prevention:** No use of `eval()`. Use of `textContent` over `innerHTML` where possible.
- **Resource Integrity:** All external assets (Fonts/CSS) are targeted for local hosting to eliminate CDN risks.

## 3. Review Process
Every change is manually audited for side effects before being committed to the master branch.
