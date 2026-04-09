# Studio Tactique FM26

Outil tactique expert pour Football Manager 2026 — entièrement dans le navigateur, sans installation.

**[Ouvrir le Studio](https://cordierarn.github.io/fm26-tactics/)**

---

## Fonctionnalités

- **Formation duale IP / OOP** — deux formations indépendantes avec rôles précis par poste et variantes centre / côté
- **Consignes équipe automatiques** — tempo, ligne défensive, pressing, largeur... calculés depuis le profil réel de ton effectif CSV
- **Notation & Scoring joueurs** — note chaque joueur selon son rôle IP et OOP, identifie le XI optimal
- **Plan mercato** — détecte les postes fragiles, protège les titulaires indispensables, liste les priorités de recrutement avec seuils d'attributs par style de jeu
- **Presets experts** — tactiques prêtes à l'emploi (Pressing, Possession, Contre, Hybride)
- **Coups de pied arrêtés** — configuration détaillée corners, coups-francs, lancers
- **Guide du Gaffer** — 5 piliers FM26, transitions, plans B/C, rituels hebdomadaires

---

## Comment exporter ton effectif FM26

Le tool analyse un fichier CSV exporté depuis FM26. Pour obtenir le bon format :

### Prérequis

1. **BepInEx 6** (Unity IL2CPP) — à installer dans le dossier Football Manager 26
   - Télécharge sur [github.com/BepInEx/BepInEx/releases](https://github.com/BepInEx/BepInEx/releases)
   - Lance FM26 une fois après installation pour générer les dossiers

2. **FM26 Player Export v4** par vinteset — plugin gratuit sur FMScout
   - Place `FM26PlayerExport.dll` dans `BepInEx\plugins\FM26PlayerExport\`
   - Si Windows bloque le fichier : clic droit → Propriétés → cocher "Débloquer"

### Étapes d'export

1. Télécharge le fichier **`all_stats.fmf`** (inclus dans ce repo)
2. Dans FM26, va sur la vue joueurs → icône vue → **Charger vue** → sélectionne `all_stats.fmf`
3. Sélectionne tous tes joueurs
4. Appuie sur **`F9`** (ou `Ctrl+P`) — ne touche pas la souris pendant le défilement automatique
5. Le CSV est sauvegardé dans :
   ```
   Documents\Sports Interactive\Football Manager 2026\FM26PlayerExport by vinteset\
   ```
6. Importe ce fichier dans l'onglet **Notation Joueurs**, **Entraînement** ou **Presets → META CSV**

> La vue `all_stats.fmf` est obligatoire — elle garantit que les colonnes du CSV correspondent aux attributs attendus par le tool.

---

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure HTML + landing page |
| `app.js` | Logique principale (formations, scoring, mercato, consignes) |
| `data.js` | Données FM26 (rôles, formations, presets, attributs) |
| `styles.css` | Styles — thème sombre custom |
| `favicon.svg` | Icône onglet |
| `all_stats.fmf` | Vue FM26 à charger avant l'export CSV |

---

## Notes

Outil non-officiel, non affilié à Sports Interactive ou SEGA.
Plugin FM26 Player Export développé par vinteset — disponible gratuitement sur FMScout.
