
```
🔷 STRUCTURE BACKEND (Back_express.js)
│
├── prisma/
│   └── schema.prisma
│
├── prisma.config.ts
├── .env
│
└── src/
    │
    ├── index.js
    │
    ├── db/
    │   └── prismaClient.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   └── events.controller.js
    │
    ├── services/
    │   ├── auth.service.js
    │   └── events.service.js
    │
    ├── DTO/
    │   └── auth.DTO.js
    │
    ├── routes/
    │   ├── auth.routes.js
    │   └── events.routes.js
    │
    └── middlewares/
        └── requireAuth.js

```
EXPLICATION:

```
🔹prisma/
    schema.prisma
    # ICI =  "models" (User, Event, EventParticipant, etc.)
      prisma.config.ts ==> Config Prisma (où est le schema, migrations, URL DB via DATABASE_URL)

🔹.env
🔹src/
    * db/
        ~ prismaClient.js
            # Ici on créé UNE instance PrismaClient et on l’exportes
            # Objectif : éviter de recréer PrismaClient partout
            # Exemple: export const prisma = new PrismaClient(...)

    * controllers/
        ~ auth.controller.js
            # Reçoit les requêtes HTTP (req) et renvoie les réponses (res)
            # Ex: register(req,res), login(req,res)
            # Il ne doit pas contenir toute la logique métier, la logique métier se trouve dans service.

        ~ events.controller.js
            # Même rôle, mais pour les endpoints d'events
            # Ex: createEvent, listEvents, joinEvent...

    * services/
        ~ auth.service.js
            # La logique métier “pure”
            # Ex: vérifier mot de passe, hasher, générer JWT, etc.
            # Le controller appelle le service

        ~ events.service.js
            # Logique métier events
            # Ex: vérifier places dispo, empêcher double participation...

    * DTO/
        ~ auth.schemas.js
            # Validation des données entrantes 
            # Ex: email valide, mdp min 8 caractères, pseudo requis
            # Évite d’envoyer n’importe quoi en DB

    * routes/
        ~ auth.routes.js
            # Déclare les routes Express
            # Ex: POST /auth/register -> authController.register

        ~ events.routes.js
            # Ex: GET /events -> eventsController.list
            #     POST /events -> eventsController.create

    * middlewares/
        ~ requireAuth.js
            # Middleware de protection
            # Lit le token, le vérifie, met req.user (payload du JWT)
            # Puis appelle next()
```

