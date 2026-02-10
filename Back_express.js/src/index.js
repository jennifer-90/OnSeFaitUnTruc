import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';

import { authRouter } from './routers/auth.router.js';

// L'ORDRE EST IMPORTANT

//! (1) -- CREATION & CONFIGURATION DU WEB API
const { NODE_ENV, PORT } = process.env;
const app = express();


//! (2) --  MIDDLEWARES - un middleware est une fonction qui s’exécute à chaque requête HTTP OU sur certaines route
//*** - Logger (morgan) - middleware qui log chaque requête HTTP reçue du serveur.
app.use(morgan('common'));

//*** - Gestion des données du "body" - middleware qui lit le corps (body) des requêtes et le parse en JSON.
app.use(express.json());


//! (3) -- ROUTING
app.use('/api/auth', authRouter)


//! (4) -- DEMARRER LE WEB API - LE SERVER - L'APPLICATION
app.listen(PORT, (err) => {
    if (err) {
        console.log(chalk.magentaBright(`Une erreur s\est produite ${err.message} !`))
        console.error(chalk.redBright(err.stack));
        process.exit(1);
    }
    console.log(chalk.bgCyanBright(`La web API a démarré sur le port ${PORT} [${NODE_ENV}]`))
});