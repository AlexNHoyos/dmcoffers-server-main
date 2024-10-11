import { Router } from 'express';
import { AuthController} from '../../controllers/auth/auth.controller.js';
import { body, param } from 'express-validator';
import { container } from '../../config/dependency-injection/inversify.config.js';

const authRouter = Router();

const authController = container.get<AuthController>(AuthController);

authRouter.post(
  '/login',  [
    body('username')
      .notEmpty()
      .isString()
      .withMessage('username debe ser un string'),
    body('password')
      .notEmpty()
      .isString()
      .withMessage('password debe ser un string'),
  ],
  authController.login.bind(authController)
);

export default authRouter;
