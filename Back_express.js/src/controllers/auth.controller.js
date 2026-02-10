import bcrypt from "bcryptjs";
import { validationLogin } from "../dto/auth.DTO";

const AuthController = {

    register: async (req, res) => {
        //hash password, crée user, renvoie token
        res.sendStatus(501);
    },

    login: async (req, res) => {
        //vérifie user + password, renvoie token
        try {
            const input = validationLogin(req.body);
            const result = await loginUser(input);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        res.sendStatus(501);
    },

    delete: async (req, res) => {
        res.sendStatus(501);
    },
};

export default AuthController;
