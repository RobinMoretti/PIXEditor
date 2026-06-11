# Pix Editor [![Build Status](https://travis-ci.com/RobinMoretti/PIXEditor.svg?branch=main)](https://travis-ci.com/RobinMoretti/PIXEditor)

![Pix Editor Screenshot](https://github.com/RobinMoretti/PIXEditor/blob/main/src/assets/images/readme-image-header.png?raw=true)

Pix Editor est un outil web de création de [logimage](https://fr.wikipedia.org/wiki/Picross).
Le but: créer des grilles imprimables avec un vrai parti-pris graphique.

#### [PIX EST ACCESSIBLE DIRECTEMENT SUR ITCH](https://robinmoretti.itch.io/pix-editor)

PIX Editor est un projet open source en cours de développement*.

> C'est une premiere pour moi en open source. Je ne sais pas encore tout ce que ca implique, mais je vais y travailler 😀

### Fonctionnalites actuelles

* creation de grilles de logimage
* edition cellule par cellule
* zoom
* import / export
* sauvegarde locale des donnees

### Lancer le projet en local

```bash
npm install
npm run dev
```

Puis ouvrir l'URL locale affichee par Vite.

### Scripts utiles

```bash
npm run dev      # demarrage local
npm run build    # build de production
npm run preview  # preview du build
npm run lint     # lint JS / Vue
```

### Stack

* Vue 3
* Vite
* Pinia
* Vue Router
* Sass

##### TODO:
* ~~données persistantes~~
* ~~import/export~~
* ~~effacer le dessin~~
* ~~zoom~~
* ~~gomme et crayon~~
* cercle
* rectangle
* remplir la grille avec une photo
* ajout d'une image de fond pour dessiner facilement

------------------------------

Pix Editor is a web-based [nonogram](https://en.wikipedia.org/wiki/Nonogram) creation tool.
The idea is simple: build printable grids with a strong visual identity.

### [PIX IS AVAILABLE ON ITCH](https://robinmoretti.itch.io/pix-editor)


PIX Editor is an open source project under development*.

> This is my first open source project. I don't fully know what that means yet, but I'll keep building and improving it 😀.

### Current features

* nonogram grid creation
* cell-by-cell editing
* zoom tools
* import / export
* local data persistence

### Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

### Useful scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview build output
npm run lint     # lint JS / Vue files
```

### Tech stack

* Vue 3
* Vite
* Pinia
* Vue Router
* Sass

##### TODO:
* ~~persistent data~~
* ~~import/export~~
* ~~clear~~
* ~~zoom~~
* ~~eraser and pencil~~
* circle
* rectangle
* fill the grid with a picture