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

Enthaltene Laute: M A L O S I R E N U F W H T P K D B AU EI EU Ä Ö Ü.

## Aufbau

```
index.html      die ganze App in einer Datei (Gestaltung, Logik, Laut- und Wortlisten)
.nojekyll       damit GitHub Pages die Datei unverändert ausliefert
aufnahmen.json  (optional) eigene Lautaufnahmen für alle Geräte
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

## Eigene Aufnahmen

Unter **Einstellungen für die Lehrperson → Eigene Aufnahmen** kann jeder Laut mit der eigenen Stimme eingesprochen werden.
Aufnahmen haben Vorrang vor dem Klang-Generator. Beim Zusammenlauten werden die beiden Aufnahmen fliessend ineinander übergeblendet.

### So geht's

1. App über **GitHub Pages** öffnen (das Mikrofon funktioniert nur über `https://`, nicht im Claude-Vorschaufenster).
2. Bei einem Laut auf **● Aufnehmen** tippen, das Mikrofon erlauben, Laut sprechen, **■ Stopp** tippen (nach 4 Sekunden stoppt es von selbst).
3. Mit **▶** anhören. Nicht gut? Einfach nochmals aufnehmen. **✕** löscht die eigene Aufnahme.
4. Alternativ mit **Datei** eine fertige Tondatei wählen (z. B. aus der Sprachmemo-App des Handys).

Die App schneidet Stille am Anfang und Ende ab und gleicht die Lautstärke an.
Die Aufnahmen bleiben in diesem Browser gespeichert.

### Silben aufnehmen (Zusammenlauten)

Zusätzlich zu den einzelnen Lauten kann jede Silbe (Konsonant + Vokal) als Ganzes eingesprochen werden,
z. B. «mmmaaa». Das sind 13 Konsonanten × 11 Vokale = 143 Silben.

- **Auf dem Brett:** Sobald ein Plättchen den Vokal berührt, erscheint **● Silbe aufnehmen**. Antippen, Silbe sprechen, **■ Stopp**.
- **In den Einstellungen:** Unter «Silben aufnehmen» zeigt eine Tabelle alle Silben. Grün = aufgenommen. Silbe antippen, dann aufnehmen.

Beim Zusammenschieben gilt diese Reihenfolge:
1. eigene Silbenaufnahme, 2. die beiden einzelnen Laut-Aufnahmen übergeblendet, 3. Klang-Generator bzw. Gerätestimme.

Tipp: Nicht alle 143 Silben sind nötig. Am besten zuerst die Silben der Laute aufnehmen, die gerade geübt werden.

### Für alle Geräte (z. B. alle iPads der Klasse)

1. **Alle exportieren** tippen. Es entsteht die Datei `aufnahmen.json`.
2. Diese Datei im Repository neben `index.html` hochladen.
3. Ab dann lädt jedes Gerät die Aufnahmen (Laute und Silben) automatisch. Eigene Aufnahmen auf einem Gerät haben dort Vorrang.

Mit **Importieren** lässt sich eine `aufnahmen.json` auch direkt auf einem Gerät einlesen.

### Sprechliste

Tipps: ruhiger Raum, 20–30 cm vom Mikrofon, gleichmässig laut. Gedehnte Laute etwa 1–2 Sekunden halten.
Keine Buchstabennamen («em», «es»), sondern den Laut. Kurze Laute ohne «e» danach («t», nicht «te»).

| Laut | so sprechen | wie in |
|---|---|---|
| M | mmmm (summen) | Maus |
| A | aaaa | Affe |
| L | llll | Löwe |
| O | oooo | Ohr |
| S | ssss (stimmlos, wie eine Schlange) | Sonne |
| I | iiii | Igel |
| R | rrrr (gerollt oder gerieben, wie in der Klasse üblich) | Rakete |
| E | eeee (langes e) | Esel |
| N | nnnn | Nase |
| U | uuuu | Ufo |
| F | ffff | Fisch |
| W | wwww | Wal |
| H | hhhh (nur Hauch) | Hase |
| T | t (kurz, ohne e) | Tomate |
| P | p (kurz) | Pilz |
| K | k (kurz) | Kiwi |
| D | d (kurz) | Dose |
| B | b (kurz) | Banane |
| AU | au | Auto |
| EI | ei | Ei |
| EU | eu | Eule |
| Ä | ääää | Äpfel |
| Ö | öööö | Öl |
| Ü | üüüü | Überraschung |

## Passwort für den Lehrerbereich

Beim ersten Öffnen von **Einstellungen für die Lehrperson** legt man ein Passwort fest (mindestens 4 Zeichen).
Danach fragt die App bei jedem Öffnen danach.

- **🔒 Sperren** schliesst den Bereich sofort. Er sperrt sich auch selbst, wenn man ihn zuklappt oder die App verlässt.
- **Passwort ändern** legt ein neues Passwort fest.

Das Passwort gilt zuerst nur auf dem Gerät, auf dem es festgelegt wurde.

### Gleiches Passwort auf allen Geräten

1. Auf einem Gerät das Passwort festlegen und den Lehrerbereich öffnen.
2. Dort steht ein langer Code (der verschlüsselte Fingerabdruck des Passworts, nicht das Passwort selbst).
3. In `index.html` die Zeile `const PASSWORT_HASH="";` suchen und den Code zwischen die Anführungszeichen setzen:
   `const PASSWORT_HASH="28b6990…";`
4. Datei auf GitHub speichern. Ab dann gilt dieses Passwort auf allen Geräten und kann nur noch dort geändert werden.

### Passwort vergessen?

- Ohne festen Code: In den Browser-Einstellungen die Website-Daten der App löschen. Dabei gehen auch die Einstellungen und die Aufnahmen auf diesem Gerät verloren (Aufnahmen aus `aufnahmen.json` bleiben).
- Mit festem Code: In `index.html` wieder `const PASSWORT_HASH="";` eintragen und neu festlegen.

### Wichtig

Der Schutz hält Kinder von den Einstellungen fern. Er ist keine echte Sicherheit: Die App läuft ganz im Browser,
und wer sich mit Webseiten auskennt, kann ihn umgehen. Für eine Lern-App reicht das; schützenswerte Daten gehören nicht hinein.
