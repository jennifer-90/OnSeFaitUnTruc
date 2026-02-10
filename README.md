- Lancer le front : npm run android
- Lancer le back en développement : npm run dev 


# OnSeFaitUnTruc

Application mobile (React Native) + API (Express.js) avec authentification JWT, base de données SQLite et ORM Prisma.

## A..Prérequis

- Node.js (version récente recommandée)
- npm
- Git
- (Optionnel) Un émulateur Android/iOS ou l’application Expo Go sur téléphone

## B..Structure du projet

### 🔹**Back_express.js/ : API Express + Prisma**
#### ____1.___ **INSTALLATION DU BAKCKEND (API EXPRESS)**__

**1.1... <i> Aller dans le dossier backend:</i>**
``` 
cd Back_express.js
```
**1.2... <i> Installer les dépendances:</i>**
``` 
npm install
```
**1.3... <i> Créer le fichier .env:</i>**
```
cp .env.example .env
```
```
NODE_ENV="dev"
PORT="8080"

JWT_SECRET="change_me"
JWT_ISSUER="localhost"
JWT_AUDIENCE="localhost"

DATABASE_URL="file:./prisma/dbOnSeFaitUnTruc.db"
```
**1.4... <i> Générer le client Prisma:</i>**
``` 
npx prisma generate
```
**1.5... <i> Créer la base de données et les tables (migration)</i>**
``` 
npx prisma migrate dev --name init
```
**1.6... <i>Démarrer l’API En mode dévelopement </i>**
``` 
npm run dev
```
**1.6²... <i> [ OU  ]  ==> Démarrer l’API En mode production</i>**
``` 
npm start
```

*  > L’API écoute par défaut sur http://localhost:8080.<br><br>
### 🔹**Front_OnSeFaitUnTruc_react_native/ : application mobile React Native (Expo)**
