import jwt from 'jsonwebtoken';

//! La secret key (JWT_SECRET) et les options (issuer, audience, etc.) servent juste à vérifier le token.

//? >> FONCTION QUI GENERE UN TOKEN JWT:
export function generateToken({ id, pseudo }) {

    const payload = { id, pseudo }; //le token contient un payload JSON avec id et pseudo.
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error("JWT_SECRET manquant");

    const option = {
        // algorithm/expireIn/issuer/audience => vient de la lib jwt
        algorithm: 'HS512',
        expiresIn: '3h',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
    }

    //-----

    try {
        return jwt.sign(payload, secretKey, option)

    } catch (error) {
        throw new Error("Token non généré");
    }
}


//? >> FONCTION QUI CONTROLE LE TOKEN ENVOYE PAR LE CLIENT SI IL EST AUTHENTIQUE ET NON EXPIRE
export function decodeToken(token) {

    const secretKey = process.env.JWT_SECRET
    if (!secretKey) throw new Error("JWT_SECRET manquant");

    const options = {
        issuer: process.env.JWT_ISSUER, //Qui a créé le token? 
        audience: process.env.JWT_AUDIENCE //Pour qui est le token?
    }

    //-----

    try {
        return jwt.verify(token, secretKey, options);
    } catch (error) {
        /**
        Error = classe JS standard pour créer une erreur
        error = juste un nom de variable (souvent utilisé dans catch (error)), pas une classe 
        */
        throw new Error("Token invalide ou expiré")
    }
};
