# LEAFLET TEST
Un simple test pour la lib leaflet et la création de visualiseurs(?) d'images en haute définition.

Marche à suivre pour voir quelque-chose à l'ecran....
* clonez le repo sur votre machine
* ouvrez un terminal dans le dossier /leafback et /tool et installez les dépendances 
```npm install```
dans les 2 dossiers.

Pour commencer, il faut des images à visualiser, de préférence en hautes résolutions (par exemple, si vous aimez l'espace: http://www.eso.org/public/images/)
* Téléchargez les images dans un dossier sur votre machine
* ouvrez un terminal dans le dossier /tool
* lancer le script "tilify.js" pour préparer les images
```
node tilify.js path/to/your/image.[png|jpeg|tiff]
```
Le script ajoutera un nouveau dossier dans '/leafback/public/images/dzi/nom-de-l-image' qui contiend les tiles générées.
* lancer le serveur express 
  * ouvrez un terminal dans /leafback
  ```
  npm start
  ```
* ouvrez votre navigateur -testé avec chromium- a l'url http://localhost:3000/ 
* profitez.

Note:
  Il se peut que j'ai oublié de --save quelques dependances... 
