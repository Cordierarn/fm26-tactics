# Studio Tactique FM26

Outil tactique expert pour Football Manager 2026 — entièrement dans le navigateur, sans installation.

**[Ouvrir le Studio](https://cordierarn.github.io/fm26-tactics/)**

---

## Fonctionnalités

- **Formation duale IP / OOP** — configure deux formations indépendantes (en possession et hors possession) avec rôles précis par poste et variantes centre / côté
- **Consignes équipe automatiques** — tempo, ligne défensive, pressing, largeur... générés depuis le profil réel de ton effectif CSV
- **Notation & Scoring joueurs** — importe ton export FM26, note chaque joueur selon son rôle IP et OOP
- **Plan mercato** — détecte les postes fragiles, protège les joueurs indispensables, liste les priorités de recrutement avec seuils d'attributs
- **Presets experts** — tactiques prêtes à l'emploi (Pressing, Possession, Contre, Hybride)
- **Coups de pied arrêtés** — configuration détaillée corners, coups-francs, jeux sur lancers
- **Guide du Gaffer** — 5 piliers FM26, transitions, plans B/C, rituels hebdomadaires

## Utilisation

1. Ouvre [le lien](https://cordierarn.github.io/fm26-tactics/)
2. Exporte ton effectif depuis FM26 : **Vue joueurs → Exporter en CSV**
3. Importe le CSV dans l'onglet **Notation Joueurs** ou **Entraînement**
4. Le tool génère automatiquement la meilleure tactique pour ton groupe

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure HTML + landing page |
| `app.js` | Logique principale (formations, scoring, mercato, consignes) |
| `data.js` | Données FM26 (rôles, formations, presets, attributs) |
| `styles.css` | Styles — thème sombre custom |
| `favicon.svg` | Icône onglet |

## Notes

Outil non-officiel, non affilié à Sports Interactive ou SEGA.
