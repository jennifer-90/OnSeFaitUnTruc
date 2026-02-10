import { decodeToken } from "../utils/jwt.utils.js";

export function authMiddleware() {
    /**
       * Middleware d'authentification JWT
       * - Attend un header(ici, provient de react native):=> ex : Authorization: Bearer eyJhbGciOiJIUzUxMiIs...
       * - Si OK : req.user = { id, pseudo } puis next()
       * - Si KO : 401 Unauthorized
       */
    return (req, res, next) => {

        let authData = req.headers['authorization'];
        if (!authData) authData = '';
        const [prefix, token] = authData.split(' ')//ex=> prefix = "Bearer" && token= "eyJhbGciOi..."

        if (prefix?.toLowerCase() !== 'bearer' || !token) {
            req.user = null;
            console.log("401 - Authorisation invalide - Pas d'accès possible avec ce user");
            return res.status(401).json({ message: "Authorisation invalide - Pas d'accès possible avec ce user" })
        };

        //! La secret key (JWT_SECRET) et les options (issuer, audience, etc.) servent juste à vérifier le token.
        try {
            const payload = decodeToken(token); //le token contient un payload JSON avec id et pseudo.
            req.user = { id: payload.id, pseudo: payload.pseudo }
            return next();

        } catch {
            req.user = null;
            console.log("401 - Token invalide/expiré");
            return res.status(401).json({ message: "Token invalide ou expiré" })
        };
    }
}