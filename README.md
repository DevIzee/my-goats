# My Greatests Of All Times (My GOATS)

**Projet personnel** pour gérer et consulter mes œuvres préférées (films, séries, animés, documentaires, vidéos YouTube).

## Fonctionnalités

- Liste consultable en **cartes** ou **tableau** avec toggle
- **Recherche** par nom
- **Filtres** par type, classe, genre, statut, plateforme
- **Tri** par nom, année ou classe
- Bouton **Refresh** pour recharger les données depuis `goats.json`
- Liens cliquables vers vidéos externes (YouTube, etc.)
- Gestion manuelle des données via `goats.json`

## Structure du projet

```
my-goats/
│
├── index.html       ← page principale
├── script.js        ← logique JS (render, filtres, toggle)
├── goats.json       ← données des œuvres (lecture seule)
├── style.css        ← optionnel si Tailwind CDN non utilisé
└── README.md
```

## Installation & lancement

### Prérequis

- **Python 3** installé sur votre machine
- Navigateur moderne (Chrome, Firefox, Edge…)

### Étapes

1. Ouvrir un terminal dans le dossier du projet `my-goats`
2. Lancer le serveur local :

```bash
python -m http.server 8000
```

3. Ouvrir votre navigateur à l’adresse :

```
http://localhost:8000
```
