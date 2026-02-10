import {Router} from 'express';
import AuthController from '../controllers/auth.controller.js';

export const authRouter = Router();


//* LES ROUTES:

authRouter.route('/register').post(AuthController.register);

authRouter.route('/login').post(AuthController.login);

authRouter.route('/update').put(AuthController.update);