# Studio Tactique FM26

Outil tactique expert pour Football Manager 2026 — entièrement dans le navigateur, sans installation.

**[Ouvrir le Studio](https://cordierarn.github.io/fm26-tactics/)**

---

## Fonctionnalités

- **Formation duale IP / OOP** — deux formations indépendantes avec rôles précis par poste et variantes centre / côté
- **Consignes équipe automatiques** — tempo, ligne défensive, pressing, largeur... calculés depuis le profil réel de ton effectif CSV
- **Baseline ligue** — consignes calibrées vs la moyenne du championnat (top 22 de chaque équipe), pas juste ton effectif
- **Analyse adversaire** — compare le profil adverse à ton XI, génère une tactique anti-adversaire complète en un clic
- **Notation & Scoring joueurs** — note chaque joueur selon son rôle IP et OOP, identifie le XI optimal
- **Instructions individuelles** — PI par joueur avec raisons (role-locked + suggestions basées sur attributs)
- **Plan mercato** — détecte les postes fragiles, protège les titulaires indispensables, liste les priorités de recrutement avec seuils d'attributs par style de jeu
- **Fiche de recrutement** — export scouting brief avec attributs minimum par poste
- **Presets experts** — tactiques prêtes à l'emploi (Pressing, Possession, Contre, Hybride)
- **Snap grid** — drag & drop des joueurs avec accrochage visuel sur les positions de formation
- **Coups de pied arrêtés** — configuration détaillée corners, coups-francs, lancers

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

### Export de ton effectif (CSV équipe)

1. Télécharge le fichier **`all_stats.fmf`** (inclus dans ce repo)
2. Dans FM26, va sur la vue joueurs → icône vue → **Charger vue** → sélectionne `all_stats.fmf`
3. Sélectionne tous tes joueurs
4. Appuie sur **`F9`** (ou `Ctrl+P`) — ne touche pas la souris pendant le défilement automatique
5. Le CSV est sauvegardé dans :
   ```
   Documents\Sports Interactive\Football Manager 2026\FM26PlayerExport by vinteset\
   ```
6. Importe ce fichier dans **CSV de ton effectif** puis clique **Générer et appliquer**

### Export du championnat (CSV ligue — optionnel)

Ce second CSV permet d'obtenir une baseline ligue pour les consignes d'équipe et d'analyser tes adversaires.

1. Dans FM26, va dans l'onglet **Base de données joueurs** (loupe en haut)
2. Charge la vue **`all_stats.fmf`** comme pour l'effectif
3. Mets en filtre :
   - **Division** → le championnat voulu (ex: Ligue 1)
   - **Intéressé par un transfert** → `Pas envisagé` (pour inclure tous les joueurs, pas seulement ceux sur le marché)
4. Sélectionne tous les joueurs affichés
5. Appuie sur **`F9`**
6. Importe ce fichier dans **CSV du championnat** dans le tool

> Le tool détecte automatiquement ton club et l'exclut de la baseline ligue pour éviter les biais.

---

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure HTML + landing page |
| `app.js` | Logique principale (formations, scoring, mercato, consignes, analyse adversaire) |
| `data.js` | Données FM26 (rôles, formations, presets, attributs) |
| `styles.css` | Styles — thème sombre custom |
| `favicon.svg` | Icône onglet |
| `all_stats.fmf` | Vue FM26 à charger avant l'export CSV |

---

## Notes

Outil non-officiel, non affilié à Sports Interactive ou SEGA.
Plugin FM26 Player Export développé par vinteset — disponible gratuitement sur FMScout.
