# Akilis Le Quellec — Portfolio

Portfolio statique bilingue, React 19 + TypeScript + Vite + React Three Fiber / Three.js. Dépôt cible : `akls-lq/akls-lq.github.io`, base `/`. Aucun serveur applicatif, compte, secret ou API payante.

## Développer

Node 24 LTS, npm 11. Depuis la racine du dépôt :

```sh
npm ci
npm run dev
```

`npm run build` vérifie TypeScript puis produit `dist/`. `npm run preview` permet de contrôler ce build. Dans le cloud, si le cache npm du compte est non accessible : `npm ci --cache /tmp/akilis-npm-cache`.

## Tests

```sh
npx playwright install --with-deps chromium
npm run build
npm test
```

Dans une machine ayant déjà Chromium : `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test`.
Les scénarios couvrent bureau et mobile : entrée au clic/clavier, langue sans déclenchement de l’intro, transition, mode mouvement réduit, facettes, projets, cartes de certificats, modales, contact, ressources et absence de documents privés dans le build. Des captures idle/impression/portfolio sont écrites dans `test-results/`. La conformité visuelle du papier exige également une comparaison des captures : un attribut DOM seul ne prouve pas l’origine géométrique de la feuille.

## Structure

- `src/Scene.tsx` : scène originale, géométries du CRT, imprimante, tasse, décor et papier déformable. Papier ancré à la fente, progression par sommet et texture de CV provisoire ; aucune vidéo dans le site.
- `src/App.tsx` : intro, transition de révélation, portfolio, navigation, dialogues et fallback CSS interactif.
- `src/content.ts` : textes et faits publics FR/EN.
- `src/style.css` : direction éditoriale, responsive et mouvement réduit.
- `public/media/` : photos authentiques optimisées WebP, certificats et marques extraites de ces certificats ; aucune capture LinkedIn.
- `tests/` : Playwright ; `.github/workflows/pages.yml` : validation et publication Pages.

La scène est reconstruite depuis les références ; ce n’est pas le modèle Spline original. Les géométries, l’interface écran et le décor sont interprétés dans le code, avec quelques différences de proportions et de matières. Si WebGL est absent ou si le mouvement réduit est demandé, une scène CSS remplace WebGL ; l’impression reste interactive. Aucun son. Polices auto-hébergées via Fontsource (licences OFL incluses dans les paquets). Icônes de marques via Font Awesome et Simple Icons 11 (CC0). Les marques restent la propriété de leurs titulaires.

## CV et confidentialité

Le PDF public final n’est pas fourni. Ajouter **uniquement le PDF public approuvé** à `public/cv/Akilis_Le_Quellec_CV_Public.pdf`. Le site vérifie son existence et son type MIME avant d’activer le lien. Aucune génération d’un faux certificat ou faux PDF personnel. Le CV source privé, les vidéos filmées, les captures LinkedIn et le kit de référence doivent rester **hors du dépôt public**. Instagram, TikTok, YouTube et Snapchat sont des mentions « Bientôt », sans liens. La distinction sportive CBJJE est séparée des certifications.

## Publication après validation

La refonte est préparée sur `feat/portfolio-immersif` ; aucune commande locale ne publie le site.

1. Examiner le rendu, puis enregistrer les changements dans un commit et pousser cette branche : `git push -u origin feat/portfolio-immersif`.
2. Ouvrir une PR vers `main`, attendre les vérifications et valider la refonte.
3. Dans le dépôt GitHub, choisir **Settings → Pages → Source → GitHub Actions**.
4. Après fusion, le workflow construit, teste puis publie sur `https://akls-lq.github.io/`.

Une PR ne déploie pas. Le job de publication s’exécute seulement sur `main`. Les permissions et l’activation Pages doivent être vérifiées dans GitHub ; elles ne sont pas établies par un build local réussi.
