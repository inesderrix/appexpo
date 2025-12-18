# AppExpo - Gestion de liste de courses

## Description
AppExpo est une application mobile pour gérer vos listes de courses. Elle propose une interface fluide avec animations, recherche, historique et gestion avancée des items. Chaque utilisateur a son propre compte sécurisé avec authentification et token JWT.

---

## Fonctionnalités

### Authentification
- **Création de compte** (`/signup`)  
  - Hashage des mots de passe avec MD5 pour la sécurité.
  - Les utilisateurs créés avant l’implémentation du hashage doivent recréer leur compte.
- **Connexion** (`/login`)  
  - Retourne un **token JWT** pour sécuriser les routes protégées.
- **Déconnexion**
  - Localement, suppression du token côté client.
- **Page Profil**
  - Affichage des informations de l’utilisateur connecté.
- **Suppression de compte**
  - Endpoint : `DELETE /users/:id` (protégé par JWT)

### Gestion des items
- **Liste des items actifs** (`GET /items/active`)  
  - Affiche tous les items en cours.
- **Liste des items pris / historique** (`GET /items/history`)  
  - Affiche les items déjà cochés/pris.
- **Ajout d’un item** (`POST /items`)  
  - Ajoute un item à la liste active.
- **Suppression individuelle d’un item** (`DELETE /items/:id`)  
  - Active ou historique.
- **Suppression en masse** (`DELETE /items/clear/:userId?type=<type>`)  
  - Par type : `active`, `history` ou `all`.
- **Cochage d’un item** (`PATCH /items/:id/check`)  
  - Marque un item comme "pris" et le déplace dans l’historique.
- **Barre de recherche**
  - Recherche dynamique dans les listes actives et historiques.

### Interface utilisateur
- **Animation de bulles en fond**
- **Modal pour ajouter / supprimer des items**
- **Suppression massive via modal**
  - Choix entre supprimer uniquement les items actifs, l’historique ou tout.

---

## Sécurité
- **Token JWT**  
  - Toutes les routes sensibles sont protégées via JWT.
- **Hashage des mots de passe**  
  - MD5 pour sécuriser le stockage.

---

## Installation

1. **Cloner le dépôt**
```bash
git clone <URL_DU_DEPOT>
cd appexpo/api
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Créer le fichier `.env`**  
Exemple :
```
MONGODB_ENDPOINT=<URL_MONGODB>
SECRET=<SECRET_JWT>
```

4. **Lancer le serveur**
```bash
npm start
```

5. **Lancer l’application mobile**
```bash
expo start
```

---

## Notes
- Il y a une colllection Postman afin de tester les différentes api
- Les anciens utilisateurs créés avant l’implémentation du hashage MD5 ne pourront plus se connecter.
- L’application mobile utilise **React Native**, **Expo**, et **Expo Checkbox** pour la gestion des items.
- Les routes protégées nécessitent un **JWT dans l’en-tête Authorization** au format :
```
Authorization: Bearer <token>
```

