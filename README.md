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
2. Dans FM26, charge la vue **`all_stats.fmf`** (fichier inclus dans ce repo) : `Vue joueurs → Charger vue → all_stats.fmf`
3. Exporte l'effectif : **clic droit → Exporter en CSV**
4. Importe le CSV dans l'onglet **Notation Joueurs** ou **Entraînement**
5. Le tool génère automatiquement la meilleure tactique pour ton groupe

> **Important** : la vue `all_stats.fmf` est obligatoire pour que les colonnes du CSV correspondent aux attributs attendus par le tool.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure HTML + landing page |
| `app.js` | Logique principale (formations, scoring, mercato, consignes) |
| `data.js` | Données FM26 (rôles, formations, presets, attributs) |
| `styles.css` | Styles — thème sombre custom |
| `favicon.svg` | Icône onglet |
| `all_stats.fmf` | Vue FM26 à charger pour exporter le bon CSV |

## Notes

Outil non-officiel, non affilié à Sports Interactive ou SEGA.
