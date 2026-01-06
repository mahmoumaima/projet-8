# Kasa Frontend

Frontend React pour le projet Kasa. L'application affiche une liste de logements, un detail de logement, une page A propos et une page 404. Le routage est gere par React Router et les styles utilisent des CSS Modules.

## Fonctionnalites
- Page Accueil avec banniere et galerie de cartes
- Page Logement avec carrousel, tags, notes, profil hote et details repliables
- Page A propos avec banniere et sections de valeurs
- Page 404 pour les routes inconnues et les logements introuvables

## Stack technique
- React 18 + Vite
- React Router
- CSS Modules
- Jest + Testing Library
- ESLint

## Structure du projet
```
.
├── public/
├── src/
│   ├── assets/
│   ├── composants/
│   │   ├── banner/
│   │   ├── card/
│   │   ├── carousel/
│   │   ├── collaps/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── profil/
│   │   ├── rating/
│   │   └── tags/
│   ├── pages/
│   │   ├── acceuil/
│   │   ├── apropos/
│   │   ├── error/
│   │   └── logement/
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── test/
├── coverage/
├── babel.config.js
├── jest.config.js
├── vite.config.js
└── package.json
```

## Pages et routes
- `/` : Accueil (banniere + cartes de logements)
- `/apropos` : A propos (banniere + valeurs)
- `/logement/:id` : Detail logement
- `/404` et `*` : Page 404

## Regles techniques et conventions
- Donnees dynamiques via `fetch` vers un backend local.
- Styles isoles par composant avec CSS Modules.
- Header et Footer rendent la navigation commune dans `App.jsx`.
- La page Logement redirige vers `/404` si le logement est introuvable.

## API attendue
Le frontend attend un backend sur `http://localhost:8080` :
- `GET /api/properties` : liste des logements (utilise par `Cards`).
- `GET /api/properties/:id` : detail d'un logement (utilise par `Logement`).

## Tests et suites de tests
Les tests sont dans `test/` et couvrent les composants UI principaux.

Suites de tests presentes :
- `test/Banner.test.js` : image et texte de la banniere.
- `test/Cards.test.js` : rendu des cartes, navigation, gestion d'erreur fetch.
- `test/Carrousel.test.js` : navigation, compteur, conditions d'affichage.
- `test/Collaps.test.js` : etat ouvert/ferme, contenu children.
- `test/Footer.test.js` : logo et copyright.
- `test/Header.test.js` : liens, classe active, structure nav.
- `test/Profil.test.js` : nom et image du profil.
- `test/Rating.test.js` : rendu des etoiles selon la note.
- `test/Tags.test.js` : rendu et ordre des tags.

Configuration Jest (resume) :
- `testEnvironment: "jsdom"`
- Transform Babel via `babel-jest`.
- Mock des CSS via `identity-obj-proxy`.
- Mock des images via `jest-transform-stub`.

## Resultats de couverture
Derniere couverture generee (voir `coverage/lcov-report/index.html`) :
- Statements: 100% (51/51)
- Branches: 95.83% (23/24)
- Functions: 100% (20/20)
- Lines: 100% (48/48)

## Scripts utiles
```
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run test:watch
npm run test:coverage
npm run test:verbose
npm run test:clear
```

## Lancer le projet en local
1. Installer les dependances : `npm install`
2. Lancer le backend (attendu sur `http://localhost:8080`)
3. Demarrer le frontend : `npm run dev`
