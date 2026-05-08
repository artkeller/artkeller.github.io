# **Warum NOC Ultra Smart Panel?**

Network Level Scouting 

<NEUER_INALT>
Network Level Scouting (auf Deutsch etwa „Scouting auf Netzwerkebene“) im Internet-Kontext bezeichnet die strukturierte Analyse, Überwachung und Aufklärung der Infrastruktur eines Netzwerks, um Informationen über verbundene Geräte, Dienste, Schwachstellen oder Verkehrsmuster zu gewinnen.Es handelt sich um einen Prozess, bei dem Daten über die Architektur und die Zustände eines Netzwerks gesammelt werden, um strategische Vorteile zu erlangen, sei es für Sicherheit, Optimierung oder Marktanalyse.Kernaspekte im Internet-Kontext:Technologie-Scouting & Analyse: Hierbei werden digitale Infrastrukturen aufkommender Technologien beobachtet, um Risiken und Chancen für Unternehmen frühzeitig zu erkennen.Netzwerk-Infrastruktur-Aufklärung: Nutzung von Tools (wie Port-Scanner, Netzwerk-Mapper), um aktive Hosts, offene Ports und laufende Dienste im Internet oder in internen Netzwerken zu identifizieren. Dies dient oft der Bewertung der Sicherheitslage.Strategische Datensammlung: Ziel ist oft ein Matching, also das Herstellen von Verbindungen oder das Finden passender Technologien und Experten im Netzwerk.Automatisierung: Aufgrund der Komplexität moderner Netzwerke erfolgt das Scouting häufig automatisiert durch spezialisierte Software, die kontinuierlich neue Informationen generiert.Unterschiedliche Einsatzgebiete:IT-Sicherheit: Erkennung von Schwachstellen vor Angreifern.Netzwerkmanagement: Überwachung der Leistung und Verfügbarkeit von Diensten (z. B. DNS).Wirtschaftliche Analyse: Technologie-Scouts recherchieren neue digitale Lösungen im Internet.
</NEUER_INALT>



**Große professionelle NOC-Lösungen sind meist nichts für unterwegs.**  
Sie sind schwer, komplex und an feste Arbeitsplätze gebunden. Dabei findet unser Leben heute hauptsächlich auf Smartphones, Tablets und Notebooks statt – oft im Zug, im Meeting, im Auto oder im Funk-Schatten.

**Ist das Netz schlecht? Ist der Service down? Oder ist einfach alles weg?**  
Genau diese Unsicherheit nervt. Man will nicht erst umständlich ein Dashboard starten oder einen Server anfragen – man will **sofort Klarheit**.

**Deshalb gibt es NOC Ultra Smart Panel.**

Eine **leichte, intelligente Info-App**, die komplett im Browser läuft.  
Kein schwerer Server, keine Installation, keine Cloud-Abhängigkeit.  
Einfach öffnen – und sofort sehen, was läuft und was nicht.  
100 % datenschutzkonform, ohne Cookies, ohne Tracking, ohne Fremdzugriffe.  
Open Source und komplett kostenfrei.

**Das Besondere:**  
Die App erkennt automatisch dein Gerät und wählt das passende Profil aus – vom schnellen Handy-Check bis zum großen Wand-Dashboard.

### Die drei Profile von NOC Ultra Smart Panel

**👉 Glance**  
Dein schneller Blick für unterwegs.  
Perfekt fürs Smartphone.  
Ein Fingerwisch – und du siehst sofort: Läuft's oder nicht?  
Ideal für alle, die unter Zeitdruck stehen und eine klare, einfache Antwort wollen – ohne Schnickschnack.

**👉 Smart**  
Der smarte Allrounder für Tablet und Notebook.  
Optimal für 6–15 Zoll Geräte.  
Mehr Details, elegante Übersicht und angenehme Bedienung – ob im Meeting, im Café oder auf dem Sofa.  
Genau richtig, wenn du schon etwas mehr Informationen brauchst, aber noch mobil bleiben willst.

**👉 Panel**  
Das große Kontrollzentrum für den Schreibtisch oder die Wand.  
Für 20–49 Zoll Bildschirme.  
Riesige, übersichtliche Dashboards und ein professionelles Lagebild – perfekt für den Office-PC, das Meeting-Raum-Display oder den Leitstand.  
Hier fühlst du dich wie in einer echten professionellen NOC, nur viel leichter und schöner.

---

### Das Debug-Interface

NOC Ultra Smart Panel enthält ein optionales Debug-Interface (`window.__NOC_DEBUG__`), das sich in den Einstellungen per Toggle aktivieren lässt.

**Was es tut:**  
Bei aktiviertem Debug-Toggle wird ein kontrolliertes Objekt auf `window` gesetzt, über das du in der Browser-Konsole direkten Zugriff auf interne Strukturen bekommst – z. B. den aktuellen Monitor-State oder die Sprachübersetzungen.

```js
// Nur verfügbar wenn Debug-Toggle aktiv:
__NOC_DEBUG__.monitors      // Snapshot des internen Monitor-Arrays
__NOC_DEBUG__.t             // Aktuelle Übersetzungstexte
__NOC_DEBUG__.createAndStart("https://...")  // Monitor programmatisch starten
```

**Was es ausdrücklich nicht tut:**  
Es schränkt F12 nicht ein und ist kein Sicherheitsmerkmal.  
Der Browser-Debugger ist eine Browser-eigene Funktion – JavaScript kann sie grundsätzlich nicht blockieren, und das ist auch gut so.  
Wer F12 öffnet, sieht den Quellcode immer – unabhängig vom Toggle-Status.

**Warum trotzdem sinnvoll:**  
Das Interface definiert eine **explizite, saubere API** für Entwickler und macht sichtbar, was bewusst nach außen gegeben wird. `structuredClone()` stellt sicher, dass der interne State nicht versehentlich von außen mutiert werden kann. Der Toggle dokumentiert die Absicht: *Das hier ist ein Debug-Zugang, kein normaler Betriebsmodus.*

**Die goldene Regel für Browser-Apps:**  
Echte Secrets gehören nicht in den Browser. Sie gehören auf den Server. Alles, was der Browser bekommt, kann der User sehen – mit oder ohne F12-Einschränkung.



--- 

### TODOS

```javascript
await fetch(m.url,{method:"GET",mode:"no-cors",cache:"no-store",signal:controller.signal});

await fetch(m.url,{method:"HEAD",mode:"no-cors",cache:"no-store",signal:controller.signal});


```

Network Level Scouting (CORS-konform) -> Deep Level Rendering (V8 Crawler)
