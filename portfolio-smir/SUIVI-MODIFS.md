# SUIVI DES MODIFICATIONS — Portfolio Sagario

## Statut global : TERMINE (14 modifications)

---

## 1. MOBILE — Scroll/Swipe buggé entre les sections
**Fichier :** `src/pages/ClassicPortfolio.jsx`
**Probleme :** `snap-y snap-mandatory` sur le `<main>` cause un scroll saccade. Les sections ont des hauteurs variables (certaines debordent de 100vh), ce qui fait atterrir l'utilisateur au milieu de la section suivante au lieu du haut. Le scroll inertiel du mobile se bat avec le snap obligatoire.
**Correction :**
- Remplacer `snap-mandatory` par `snap-proximity` pour un scroll plus fluide
- Ajouter `scroll-padding-top: 0` pour garantir l'atterrissage en haut
- Changer `snap-center` en `snap-start` sur chaque section pour aligner au haut
- Ajouter `-webkit-overflow-scrolling: touch` pour fluidite iOS
- Optionnel : sur mobile (<768px), desactiver completement le snap pour laisser un scroll natif fluide

**Sections impactees :** AboutSection.css (`.about-section`), BTSSection, ProjectsSection, et toutes les sections avec `snap-center`

---

## 2. DESKTOP — Barre de navigation toujours visible
**Fichier :** `src/components/LeftDockNav.jsx`
**Probleme :** La nav desktop est cachee par defaut, visible seulement au hover. L'utilisateur veut qu'elle soit toujours visible.
**Correction :**
- Supprimer le systeme `onMouseEnter/onMouseLeave` pour la version desktop
- Rendre `isDesktopOpen` toujours `true` ou supprimer cette logique
- Retirer les classes `-translate-x-full opacity-0 pointer-events-none` du state ferme
- Garder le dock compact (icones seules) toujours affiche, avec labels au hover

---

## 3. ABOUT — Retirer "Python 40%"
**Fichier :** `src/pages/sections/AboutSection.jsx` (ligne 38)
**Probleme :** `"Python 40%, Vue.js, Laravel 12, LDAP/AD"` — le "40%" ne veut rien dire pour un visiteur.
**Correction :**
- Changer `desc` de la premiere force en : `"Python, Vue.js, Laravel 12, LDAP/AD"`

---

## 4. ABOUT — Ajouter PostgreSQL dans les bases de donnees
**Fichier :** `src/pages/sections/AboutSection.jsx`
**Probleme :** PostgreSQL manque dans la section Data & SI. Actuellement : MySQL, SQLite, APIs REST, LDAP.
**Corrections :**
- **DOMAINS** (ligne 62) : Ajouter "PostgreSQL" aux chips de "Data & SI" → `["MySQL", "PostgreSQL", "SQLite", "APIs REST", "LDAP"]`
- **TECH_GROUPS** (ligne 83-86) : Ajouter PostgreSQL dans le groupe "Data & SI" → `{ name: "PostgreSQL", color: "#336791" }`
- **TechData.jsx** : Ajouter une entree PostgreSQL avec description et projets

---

## 5. ABOUT — Corriger la force "Livraison documentee"
**Fichier :** `src/pages/sections/AboutSection.jsx` (ligne 53)
**Probleme :** Le texte contient des doubles virgules et espaces : `"+Guides techniques,, tutoriels,  APIs REST,..."`
**Correction :**
- Changer en : `"Guides techniques, tutoriels, APIs REST"`

---

## 6. BTS — Renommer E4/E5/E6 en U4/U5/U6
**Fichier :** `src/pages/sections/BTSSection.jsx` (lignes 22-73)
**Probleme :** Les epreuves utilisent l'ancien nommage E4/E5/E6 au lieu de U4/U5/U6.
**Correction :**
- Renommer `code: "E4"` → `code: "U4"` (+ label et contenu adaptes)
- Renommer `code: "E5"` → `code: "U5"`
- Renommer `code: "E6"` → `code: "U6"`
- Mettre a jour les textes `perso` qui referencent "E4" et "E5" : "Mon projet U4", "Mon projet U5"

---

## 7. BTS — Intranet CPMS : mentionner V1 (prod) et V2 (dev)
**Fichier :** `src/pages/sections/BTSSection.jsx` (ligne 37)
**Probleme :** Le texte du projet U4 ne mentionne que "Intranet CPMS" sans preciser les deux versions.
**Correction :**
- Modifier `perso` de U4 en : `"Mon projet U4 : Intranet CPMS — V1 en production, V2 en developpement (Laravel 12, Vue 3, LDAP, AS400)."`

---

## 8. PROJETS — CPMS : choix V1/V2 + acces PDF sur V1
**Fichier :** `src/pages/sections/ProjectsSection.jsx` (lignes 37-47)
**Probleme :** Le projet CPMS n'a qu'un seul lien doc (`cpms-doc.html`). L'utilisateur veut :
- Un choix V1 / V2 pour la documentation
- Sur la page V1, un lien vers le PDF (`/docs/CPMS.pdf`)
**Correction :**
- Modifier l'objet CPMS dans PROJECTS pour avoir `docV1: "/docs/cpms_v1.html"`, `docV2: "/docs/cpms_v2.html"`, `pdfUrl: "/docs/CPMS.pdf"`
- Supprimer `docUrl: "/docs/cpms-doc.html"` (remplace par v1/v2)
- Modifier le composant `ProjectCard` pour gerer le cas CPMS :
  - Au verso, afficher 2 boutons "Doc V1" / "Doc V2" au lieu d'un seul "Documentation"
  - Sur le bouton V1, ajouter un lien/icone PDF a cote ou integrer le PDF dans la page cpms_v1.html
- **Fichier** `public/docs/cpms_v1.html` : ajouter un lien/bouton vers `/docs/CPMS.pdf` dans la page

---

## 9. MOBILE — Responsive general a corriger
**Fichiers :** Tous les fichiers sections
**Problemes identifies :**
- Les sections avec `min-h-[100svh]` + contenu debordant cassent le snap scroll
- Les tooltips tech badges ne fonctionnent pas bien sur mobile (hover-based)
- Les grilles 3 colonnes (epreuves BTS) s'ecrasent sur petit ecran
**Corrections :**
- Verifier que `min-h-[100svh]` est remplace par `min-h-fit` ou ajuste sur mobile
- Les tooltips sur mobile devraient etre en click au lieu de hover (deja ok via TechBadge)
- Les grilles d'epreuves `sm:grid-cols-3` sont deja responsives (1 col par defaut)

---

## ORDRE D'EXECUTION RECOMMANDE

1. **#1** Scroll/snap mobile (impact UX majeur)
2. **#2** Nav desktop visible
3. **#3** Retirer "Python 40%"
4. **#5** Corriger texte "Livraison documentee"
5. **#4** Ajouter PostgreSQL
6. **#6** Renommer E→U (BTS)
7. **#7** Intranet V1/V2 dans BTS
8. **#8** CPMS choix V1/V2 + PDF
9. **#9** Ajustements responsive restants

---

## FICHIERS TOUCHES (recapitulatif)

| Fichier | Modifs |
|---------|--------|
| `src/pages/ClassicPortfolio.jsx` | #1 snap scroll |
| `src/components/LeftDockNav.jsx` | #2 nav visible |
| `src/pages/sections/AboutSection.jsx` | #3 #4 #5 |
| `src/pages/sections/AboutSection.css` | #1 #9 snap-start |
| `src/components/TechData.jsx` | #4 PostgreSQL |
| `src/pages/sections/BTSSection.jsx` | #6 #7 |
| `src/pages/sections/ProjectsSection.jsx` | #8 #11 #12 #13 #14 |
| `public/docs/cpms_v1.html` | #8 lien PDF, #10 nettoyage V2/NEW |
| `public/docs/cpms_v2.html` | Fichier distinct V2 (deja separe) |
| `public/docs/cdc-*.html` (x10) | #11 Cahiers des charges generes |
| `public/docs/guide-injection-sql.html` | #13 TP SQL Injection (ex SQL.pdf) |
| `public/docs/guide-lab-linux.html` | #13 Lab Linux (ex linux.pdf) |
| `public/docs/guide-cles-bootables.html` | #13 Cles USB (ex usb.pdf) |
| `public/docs/guide-active-directory.html` | #13 Active Directory (ex win22.pdf) |
| `public/docs/guide-virtualisation.html` | #13 Virtualisation (ex VM.pdf) |
| `public/docs/guide-docker.html` | #14 Nouveau guide Docker |
| `public/docs/guide-git.html` | #14 Nouveau guide Git |

---

## 10. CPMS V1 — Nettoyage contenu V2/NEW
**Fichier :** `public/docs/cpms_v1.html`
**Probleme :** Le fichier V1 contenait encore des elements de la V2 (badges NEW, module RH, stats mixees V1+V2).
**Correction :**
- Suppression de tous les badges `NEW`
- Suppression du module RH (specifique V2)
- Mise a jour des stats : 22 vues, 10 composants, 14 endpoints, 7 tables (V1 uniquement)
- Suppression des classes CSS `.v2` et `.new-badge`
- Le fichier V2 (`cpms_v2.html`) reste inchange, deja distinct

---

## 11. CAHIERS DES CHARGES — Generation pour tous les projets
**Fichiers :** 10 fichiers HTML crees dans `public/docs/`
**Probleme :** Le bouton PDF CPMS etait etiquete "Cahier des charges" alors que c'est un document explicatif. Il manquait de vrais cahiers des charges.
**Correction :**
- Renommage du bouton PDF : "Document explicatif (PDF)"
- Creation de 10 cahiers des charges en format tableau HTML :
  - `cdc-familidocs.html`, `cdc-cpms.html`, `cdc-earth-sanitation.html`
  - `cdc-drainage-academy.html`, `cdc-discord-bot.html`, `cdc-alafrench-care.html`
  - `cdc-alafrench.html`, `cdc-portfolio-3d.html`, `cdc-flipper-zero.html`, `cdc-annonz.html`
- Ajout de `cdcUrl` dans chaque projet du tableau PROJECTS
- Ajout du bouton "Cahier des charges" (violet) sur chaque carte projet

---

## 12. PROJETS — Correction E5 residuel dans FamiliDocs
**Fichier :** `src/pages/sections/ProjectsSection.jsx`
**Probleme :** Le projet FamiliDocs referencait encore "E5" au lieu de "U5" dans description, detail et highlight.
**Correction :**
- `description` : "Projet E5" → "Projet U5"
- `detail` : "epreuve E5" → "epreuve U5"
- `highlight` : "Projet E5" → "Projet U5"

---

## 13. GUIDES — Conversion PDF → HTML
**Fichiers :** `public/docs/guide-*.html` + `src/pages/sections/ProjectsSection.jsx`
**Probleme :** Les 5 guides de la categorie "Guides & Installations" pointaient vers des fichiers PDF. Conversion en pages HTML completes avec theme dark assorti au portfolio.
**Correction :**
- `guide-injection-sql.html` (accent violet #7c3aed) — TP Injection SQL complet (UNION, Blind, Time-based)
- `guide-lab-linux.html` (accent teal #0d9488) — Lab virtualise Kali/Ubuntu/Lubuntu
- `guide-cles-bootables.html` (accent jaune #ca8a04) — Cles USB bootables (Rufus, Ventoy, dd)
- `guide-active-directory.html` (accent cyan #0891b2) — Active Directory (AD DS, DNS, DHCP, GPO, Sysprep)
- `guide-virtualisation.html` (accent indigo #4f46e5) — VirtualBox vs VMware
- Mise a jour des `docUrl` dans PROJECTS : `.pdf` → `.html`

---

## 14. GUIDES — Ajout Docker & Git
**Fichiers :** `public/docs/guide-docker.html`, `public/docs/guide-git.html`, `src/pages/sections/ProjectsSection.jsx`
**Probleme :** Deux sujets essentiels manquaient dans les guides : Docker et Git/GitHub.
**Correction :**
- Creation de `guide-docker.html` (accent sky #0ea5e9) — Dockerfile, Compose, volumes, reseaux
- Creation de `guide-git.html` (accent orange #f97316) — Branches, merge, PR, GitHub Actions
- Ajout de 2 entrees dans PROJECTS (categorie "guides") avec docUrl correspondants
