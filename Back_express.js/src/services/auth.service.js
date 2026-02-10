import bcrypt from "bcrypt";
import { prisma } from "../db/prismaClient.js";
import { generateToken } from "../utils/jwt.utils.js";





export async function loginUser({ email, password }) {

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Identifiants invalides");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error("Identifiants invalides");

    const token = generateToken({ id: user.id, pseudo: user.pseudo });

    return {
        token,
        user: { id: user.id, email: user.email, pseudo: user.pseudo },
    };
}

export async function registerUser({ email, pseudo, password }) {

    //verifie si l'email existe?
    const existEmail = await prisma.user.findUnique({ where: { email } })
    if (existEmail) {
        const error = new Error("Email déjà utilisé");
        error.statusCode = 409;
        throw error;
    }

    //verifie si le pseudo existe?
    const existPseudo = await prisma.user.findUnique({ where: { pseudo } });
    if (existPseudo) {
        const error = new Error("Pseudo déjà utilisé");
        error.statusCode = 409;
        throw error;
    }

    //hasher le mdp
    const passwordHash = await bcrypt.hash(password, 10);

    //créer le user en db
    const createdUser = await prisma.user.create({
        data: {
            email,
            pseudo, passwordHash,
        },
    });

    //Génère un token JWT
    const token = generateToken({ id: createdUser.id, pseudo: createdUser.pseudo });

    //retourne un user
    return {
        token,
        user: {
            id: createdUser.id,
            email: createdUser.email,
            peudo: createdUser.pseudo,
        }
    }
}