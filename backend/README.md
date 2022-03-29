Contexte :

La marque PIIQUANTE veut développer une application web de critique des sauces piquantes appelée ' Hot Takes'. À terme transformer l'application d'évaluation en une boutique en ligne. 

La première version sera une galerie de sauces permettant aux utilisateurs : 
- d'avoir un compte utilisateur  
- l'ajout/supression de sauces
- liker/disliker les sauces

L'application a été développer à l'aide d'Angular et a été précompilé après des tests interne. 

Mission : 

Développer le backend et de créer l'API.

                                 Réalisation de l'API  

lien du repos pour l'interface : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

lien des spécification pour l'API : https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf

Point de vigilance :

L'entrepise a été victimes d'attaques sur le site web. L'API doit être construite selon les pratiques de code sécurisées. Les mots de passes des utilisateurs recueillis par l'application doivent être protégés. 

Exigences pour la sécurité : 

- l'API doit respecter le RGPD et les standars OWASP;
- le mot de passe doit être haché;
- l'authentification doit être renforcée sur toutes les routes sauce requises;
- les adresses électronique dans la base de données sont unique et un plugin Mongoose pour garantir leur unicité et signaler les erreurs;
- la sécurité de la base de données MongoDB( à partir d'un service tel que MngoDB Atlas) ne doit pas empêcher l'application de se lancer sut la machine d'un utilisateur;
- les version les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés;
- le contenu du dossier images ne dpit pas être téléchargé sur GitHUb;

Technologie utilisé : 

- Framework : Express; 
- Serveur : NodeJS;
- Base de données : MongoDB;

Packages: 

- bcrypt
- cors
- crypto-js
- dotenv
- express
- express-rate-limit
- helmet
- mongoose
- mongoose-unique-validator
- multer
- password-validator

Installation

ouvrir un premier terminal:

1. taper cd frontend
2. npm install 
3. npm run start

ouvrir un deuxième terminal: 

1. Taper cd backend
2. npm install
3. node server

Configuration du fichier .env 

Crée un fichier .env à la racine du projet
mettre les clés de chiffrement de : 
- JWT_SECRET 
- CRYTOJS_EMAIL 
- MONGO_URL 

Crée un dossier image

Exécuter le backend sur http://localhost/3000 seulement 
