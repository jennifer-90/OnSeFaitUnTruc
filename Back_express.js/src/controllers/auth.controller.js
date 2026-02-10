import bcrypt from "bcryptjs";
import { validationRegister, validationLogin } from "../dto/auth.dto.js";
import { registerUser, loginUser } from "../services/auth.service.js";

const AuthController = {

    register: async (req, res) => {

        //hash password, crée user, renvoie token
        try {
            //DTO
            const registerValidationInput = validationRegister(req.body);
            //SERVICE
            const registerVerifyLogic = await registerUser(registerValidationInput);
            //HTTP-CONTROLLER
            return res.status(201).json(registerVerifyLogic)

        } catch (error) {
            const statusCode = error.statusCode ?? 400;
            return res.status(statusCode).json({ message: error.message });
        }
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
