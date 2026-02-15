# Security Policy & Compliance (CRA Art. 14 Compliant)

## 🛡️ Cyber Resilience Act (CRA) Statement
This project is an open-source software asset developed under the **ARTKELLER Purist Standard**. It is designed for maximum transparency and security by design. While it is a non-commercial project, it follows the security and documentation requirements outlined in the EU Cyber Resilience Act (CRA) to ensure auditability and resilience.

## 🔒 Security Architecture (Security by Design)
The security of this project is guaranteed by its architectural constraints:
1. **Zero-Dependency Policy:** No third-party package managers (`npm`, `yarn`, etc.) or external libraries are utilized. This completely eliminates Supply-Chain-Vulnerabilities.
2. **Client-Side Integrity:** The application executes exclusively in the user's browser. There is no server-side logic, preventing remote code execution (RCE) on the infrastructure level.
3. **Data Isolation:** All configuration and state are stored in the browser's `localStorage`. No data is transmitted to external endpoints.
4. **Transport Security:** Served exclusively via TLS-encrypted GitHub Pages. Integrity is tracked through Git commit hashes.

## 🤝 Coordinated Vulnerability Disclosure (CVD)
In compliance with Art. 14 of the Cyber Resilience Act, this project maintains a formal process for handling potential security concerns.

### Reporting a Vulnerability
Please report any security-related findings directly to: **thomas@artkeller.io**

### Incident Handling Process (Art. 14(1) & (2))
1. **Response:** Acknowledgement of receipt within 48 hours.
2. **Remediation:** Direct code intervention (100% internal code ownership) without third-party delay.
3. **Communication:** Updates on vulnerability status and fixes are published via VEX (Vulnerability Exploitability eXchange) in the `/CRA` directory.

## 🌐 Infrastructure & Compliance
- **Hosting:** Hosted on GitHub Pages (USA). 
- **Privacy:** No personal user data is collected, stored, or processed.
