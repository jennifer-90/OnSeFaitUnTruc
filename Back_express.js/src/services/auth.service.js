import bcrypt from "bcrypt";
import { prisma } from "../db/prismaClient.js";
import { generateToken } from "../utils/jwt.utils.js";
import jwt from jsonwebtoken;


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