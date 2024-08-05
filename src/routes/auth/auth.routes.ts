import { Router } from 'express';
import * as authController from '../../controllers/auth/auth.controller.js';
import { body , param } from 'express-validator';


const authRouter = Router();

authRouter.post('/login',
    [
      body('username').notEmpty().isString().withMessage('username debe ser un string'),
      body('password').notEmpty().isString().withMessage('password debe ser un string')
    ], authController.login);

export default authRouter;