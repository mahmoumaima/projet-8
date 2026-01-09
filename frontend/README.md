# Kasa Frontend

Kasa est une plateforme de location d'appartements. Ce projet represente le frontend de l'application, developpe avec React. Il permet aux utilisateurs de parcourir les logements disponibles, consulter leurs details et decouvrir les valeurs de l'entreprise. L'interface est responsive et s'adapte a tous les ecrans. Les donnees sont recuperées via une API REST et les composants sont testés avec Jest.

## Fonctionnalites

- **Page Accueil** : Banniere avec texte superpose et galerie de 20 cartes de logements
- **Page Logement** : Carrousel d'images, tags, systeme de notation (etoiles), profil de l'hote et sections depliables (description, equipements)
- **Page A propos** : Banniere et sections collapsibles presentant les valeurs de l'entreprise (Fiabilite, Respect, Service, Securite)
- **Page 404** : Gestion des routes inconnues et des logements introuvables avec redirection

## Stack technique

### Prerequis

- **Node.js** : v18.x ou superieur
- **npm** : v9.x ou superieur
- **Docker** et **Docker Compose** : pour lancer le backend

### Core

| Technologie | Version | Description |
| ----------- | ------- | ----------- |
| React | 18.3.1 | Bibliotheque UI |
| React DOM | 18.3.1 | Rendu React pour le web |
| React Router | 7.0.1 | Routage client-side |
| Vite | 5.4.10 | Build tool et serveur de developpement |

### Outils de developpement

| Technologie | Version | Description |
| ----------- | ------- | ----------- |
| Babel | 7.26.0 | Transpileur JavaScript |
| ESLint | 9.13.0 | Linter de code |
| Jest | 29.7.0 | Framework de tests |
| Testing Library | 16.1.0 | Utilitaires de test React |

### Styles

- **CSS Modules** : Styles isoles par composant (`.module.css`)
- **Police** : Montserrat (Google Fonts)
- **Design responsive** : Mobile-first avec breakpoints

## Structure du projet

```text
.
├── public/
├── src/
│   ├── assets/              # Images et icones SVG
│   ├── composants/          # Composants reutilisables
│   │   ├── banner/          # Banniere avec image et texte
│   │   ├── card/            # Cartes de logements
│   │   ├── carousel/        # Carrousel d'images
│   │   ├── collaps/         # Sections depliables
│   │   ├── footer/          # Pied de page
│   │   ├── header/          # En-tete avec navigation
│   │   ├── profil/          # Profil de l'hote
│   │   ├── rating/          # Notation par etoiles
│   │   └── tags/            # Tags/etiquettes
│   ├── pages/               # Pages de l'application
│   │   ├── acceuil/         # Page d'accueil
│   │   ├── apropos/         # Page A propos
│   │   ├── error/           # Page 404
│   │   └── logement/        # Page detail logement
│   ├── App.jsx              # Composant racine avec routage
│   ├── index.jsx            # Point d'entree
│   └── index.css            # Styles globaux
├── Tests/                   # Tests unitaires Jest
├── coverage/                # Rapports de couverture
├── babel.config.js          # Configuration Babel
├── eslint.config.js         # Configuration ESLint
├── jest.config.js           # Configuration Jest
├── vite.config.js           # Configuration Vite
└── package.json             # Dependances et scripts
```

## Pages et routes

| Route | Composant | Description |
| ----- | --------- | ----------- |
| `/` | Accueil | Page d'accueil avec banniere et galerie de cartes |
| `/apropos` | Apropos | Page A propos avec les valeurs de l'entreprise |
| `/logement/:id` | Logement | Page detail d'un logement (parametre dynamique) |
| `/404` | Error404 | Page d'erreur 404 |
| `*` | Error404 | Redirection pour toutes les routes inconnues |

## Composants

### Banner

Affiche une image de banniere avec un texte optionnel superpose.

**Props :**

- `image` (string, requis) : URL de l'image
- `text` (string, optionnel) : Texte a afficher sur la banniere

### Cards

Affiche une grille de cartes de logements. Recupere les donnees via l'API.

**Props :** Aucune (fetch interne)

### Carrousel

Carousel d'images avec navigation gauche/droite et compteur.

**Props :**

- `images` (array, requis) : Tableau d'URLs d'images

### Collaps

Section depliable/repliable avec animation.

**Props :**

- `title` (string, requis) : Titre de la section
- `children` (JSX, requis) : Contenu a afficher

### Header

Barre de navigation avec logo et liens.

**Props :** Aucune (utilise React Router)

### Footer

Pied de page avec logo et copyright.

**Props :** Aucune

### Profil

Affiche le nom et la photo de l'hote.

**Props :**

- `name` (string, requis) : Nom de l'hote
- `picture` (string, requis) : URL de la photo

### Rating

Affiche une notation de 0 a 5 etoiles.

**Props :**

- `rate` (number, requis) : Note de 0 a 5

### Tags

Affiche une liste de tags/etiquettes.

**Props :**

- `tags` (array, requis) : Tableau de chaines de caracteres

## Architecture et Hooks React

L'application utilise les hooks React suivants :

| Hook | Utilisation |
| ---- | ----------- |
| `useState` | Gestion de l'etat local (Collaps, Carrousel, Cards, Logement) |
| `useEffect` | Appels API et effets de bord (Cards, Logement) |
| `useParams` | Extraction des parametres d'URL (Logement) |
| `useNavigate` | Navigation programmatique (Logement vers 404) |
| `useLocation` | Detection de la route active (Header) |

**Flux de donnees :**

- Pas de gestion d'etat global (pas de Redux/Context API)
- Donnees recuperees directement dans les composants via `fetch`
- Props drilling pour la communication parent-enfant

## Design Responsive

L'application utilise une approche mobile-first avec les breakpoints suivants :

| Device | Breakpoint | Description |
| ------ | ---------- | ----------- |
| Mobile | max 480px | Disposition en colonne, elements empiles |
| Tablet | 481px - 1024px | Disposition intermediaire |
| Desktop | > 1024px | Disposition complete, grille de cartes |

## API

Le frontend attend un backend sur `http://localhost:8080`.

| Methode | Endpoint | Description | Reponse |
| ------- | -------- | ----------- | ------- |
| GET | `/api/properties` | Liste de tous les logements | Array de 20 objets |
| GET | `/api/properties/:id` | Details d'un logement | Objet ou 404 |

## Structure des donnees

```json
{
  "id": "c67ab8a7",
  "title": "Appartement cosy",
  "cover": "https://s3-eu-west-1.amazonaws.com/.../accommodation-20-1.jpg",
  "pictures": [
    "https://s3-eu-west-1.amazonaws.com/.../accommodation-20-1.jpg",
    "https://s3-eu-west-1.amazonaws.com/.../accommodation-20-2.jpg"
  ],
  "description": "Votre maison loin de chez vous...",
  "host": {
    "name": "Nathalie Jean",
    "picture": "https://s3-eu-west-1.amazonaws.com/.../profile-picture-12.jpg"
  },
  "rating": "5",
  "location": "Ile de France - Paris 17e",
  "equipments": [
    "Equipements de base",
    "Micro-Ondes",
    "Douche italienne",
    "Frigo",
    "WIFI"
  ],
  "tags": [
    "Batignolle",
    "Montmartre"
  ]
}
```

### Details des champs

| Champ | Type | Description | Exemple |
| ----- | ---- | ----------- | ------- |
| `id` | string | Identifiant unique (8 caracteres hex) | `"c67ab8a7"` |
| `title` | string | Nom du logement | `"Appartement cosy"` |
| `cover` | string | URL de l'image principale | URL S3 |
| `pictures` | string[] | Tableau d'URLs des images (1-6 images) | Array d'URLs S3 |
| `description` | string | Description detaillee du logement | Texte libre |
| `host.name` | string | Nom de l'hote | `"Nathalie Jean"` |
| `host.picture` | string | URL de la photo de l'hote | URL S3 |
| `rating` | string | Note de 1 a 5 | `"5"` |
| `location` | string | Localisation | `"Ile de France - Paris 17e"` |
| `equipments` | string[] | Liste des equipements | `["Wi-fi", "Parking"]` |
| `tags` | string[] | Tags/mots-cles | `["Montmartre", "Charme"]` |

## Tests

Les tests sont dans `Tests/` et couvrent les composants UI principaux.

### Suites de tests

| Fichier | Couverture |
| ------- | ---------- |
| `Banner.test.js` | Image et texte de la banniere |
| `Cards.test.js` | Rendu des cartes, navigation, gestion d'erreur fetch |
| `Carrousel.test.js` | Navigation, compteur, conditions d'affichage |
| `Collaps.test.js` | Etat ouvert/ferme, contenu children |
| `Footer.test.js` | Logo et copyright |
| `Header.test.js` | Liens, classe active, structure nav |
| `Profil.test.js` | Nom et image du profil |
| `Rating.test.js` | Rendu des etoiles selon la note |
| `Tags.test.js` | Rendu et ordre des tags |

### Configuration Jest

```javascript
{
  testEnvironment: "jsdom",           // Simulation DOM navigateur
  transform: { "babel-jest" },        // Transpilation Babel
  moduleNameMapper: {
    "*.css": "identity-obj-proxy",    // Mock CSS Modules
    "*.svg": "jest-transform-stub"    // Mock images/SVG
  }
}
```

### Resultats de couverture

Derniere couverture generee (voir `coverage/lcov-report/index.html`) :

| Metrique | Couverture | Details |
| -------- | ---------- | ------- |
| Statements | 100% | 51/51 |
| Branches | 95.83% | 23/24 |
| Functions | 100% | 20/20 |
| Lines | 100% | 48/48 |

## Scripts disponibles

```bash
# Developpement
npm run dev              # Demarrer le serveur de developpement Vite

# Build
npm run build            # Construire pour la production
npm run preview          # Previsualiser le build de production

# Qualite de code
npm run lint             # Executer ESLint

# Tests
npm run test             # Executer les tests une fois
npm run test:watch       # Executer les tests en mode watch
npm run test:coverage    # Generer le rapport de couverture
npm run test:verbose     # Tests avec sortie detaillee
npm run test:clear       # Vider le cache Jest
```

## Installation et demarrage

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd projet-8-main
```

### 2. Lancer le backend avec Docker Compose

```bash
docker-compose up -d
```

Le backend sera accessible sur `http://localhost:8080`.

### 3. Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### 4. Arreter le backend

```bash
docker-compose down
```

## Licence

Projet realise dans le cadre de la formation OpenClassrooms - Developpeur d'application JavaScript React.
