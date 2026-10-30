# Lautbrett

Eine kleine Web-App für das **erste Zusammenlauten** im Erstleseunterricht.
Sie ist dem Silbenbrett mit Schiebern aus dem Schulmaterial nachempfunden:
Das Kind schiebt ein blaues Konsonanten-Plättchen zum rosa Vokal und hört die Silbe.

## Funktionen

- **Laute**: Buchstaben antippen und den Laut hören (nicht den Buchstabennamen), mit Anlautbild.
- **Brett**: fünf Schienen. Ein Konsonant wird zum Vokal geschoben; bei der Berührung erscheint ein Silbenbogen und der gezogene Übergang wird einmal gesprochen (z. B. «mmmmaaaa»).
  Stopplaute (T, P, K, D, B) werden als kurze Silbe gesprochen.
  - Plättchen-Vorrat: Zeile antippen, dann ein Plättchen wählen.
  - «Alle zurückschieben», «Mischen», «Gleicher Konsonant überall».
- **Wörter**: Silbenwörter mit farbigen Silbenbögen; das Bild erscheint erst nach dem Lesen.
- **Einstellungen für die Lehrperson**: gelernte Laute auswählen, Schreibweise (GROSS / Gross + klein / klein), Sprechtempo.
  Die Einstellungen werden im Browser gespeichert (`localStorage`).

Enthaltene Laute: M A L O S I R E N U F W H T P K D B AU EI EU.

## Aufbau

```
index.html      die ganze App in einer Datei (Gestaltung, Logik, Laut- und Wortlisten)
.nojekyll       damit GitHub Pages die Datei unverändert ausliefert
```

Keine Abhängigkeiten, kein Build-Schritt. Schriften: Andika und Atkinson Hyperlegible über Google Fonts.

## Starten

- Lokal: `index.html` im Browser öffnen.
- GitHub Pages: Repository → *Settings* → *Pages* → Source «Deploy from a branch», Branch `main`, Ordner `/ (root)`.

## Sprachausgabe

Die App nutzt die Sprachausgabe des Geräts (Web Speech API). Bevorzugt wird eine Stimme `de-CH`, sonst eine andere deutsche Stimme.
Klang und Dehnung der Laute hängen vom Gerät ab. Ohne Sprachausgabe funktioniert die App trotzdem, nur ohne Ton.

## Anpassen

Laute und Wörter stehen im `<script>`-Teil von `index.html` in den Listen `LAUTE` und `WOERTER`.
Wörter werden mit Bindestrich in Silben getrennt, z. B. `["TO-MA-TE","🍅"]`.
