import { Router } from 'express';
import { UserController } from '../../controllers/usuarios/user.controller.js';
import { body, param } from 'express-validator';
import { container } from '../../config/dependency-injection/inversify.config.js';
import { validateInputData } from '../../middleware/validation/validation-middleware.js';

const userRouter = Router();
const userController = container.get<UserController>(UserController);

userRouter.get('/findall', userController.findAll.bind(userController));

userRouter.get(
  '/:id',
  param('id')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Formato de ID invalido!!!!!!!'),
  userController.findOne.bind(userController)
);

userRouter.post('/forgot-password', validateInputData([
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Email debe ser un email válido'),
]), userController.forgotPassword.bind(userController));

userRouter.post('/reset-password',[
  body('token')
    .notEmpty()
    .withMessage('Token es requerido'),
  body('newPassword')
    .notEmpty()
    .isString()
    .withMessage('Nueva contraseña es requerida'),
], userController.resetPass.bind(userController));

userRouter.post(
  '/register',
  [
    body('realname')
      .notEmpty()
      .isString()
      .withMessage('realname debe ser un string'),
    body('surname')
      .notEmpty()
      .isString()
      .withMessage('surname debe ser un string'),
    body('username')
      .notEmpty()
      .isString()
      .withMessage('username debe ser un string'),
    body('birth_date')
      .notEmpty()
      .isISO8601()
      .withMessage('Fecha de Nacimiento debe ser una fecha válida'),
    body('creationuser')
      .notEmpty()
      .isString()
      .withMessage('CreationUser debe ser un string'),
    body('status')
      .isBoolean()
      .notEmpty()
      .withMessage('Status debe ser un booleano'),
    body('password')
      .notEmpty()
      .isString()
      .withMessage('password debe ser un string'),
  ],
  userController.create.bind(userController)
);

userRouter.put(
  '/:id',
  [
    param('id')
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage('Formato de ID invalido'),
    body('realname')
      .optional()
      .isString()
      .withMessage('realname debe ser un string'),
    body('surname')
      .optional()
      .isString()
      .withMessage('surname debe ser un string'),
    body('username')
      .optional()
      .isString()
      .withMessage('username debe ser un string'),
    body('birth_date')
      .optional()
      .isISO8601()
      .withMessage('Fecha de Nacimiento debe ser una fecha válida'),
    body('modificationuser')
      .optional()
      .isString()
      .withMessage('modificationuser debe ser un string'),
    body('modificationtimestamp')
      .optional()
      .isISO8601()
      .withMessage('modificationuser debe ser una fecha válida'),
    body('password')
      .optional()
      .isString()
      .withMessage('password debe ser un string'),
    body('status')
      .optional()
      .isBoolean()
      .withMessage('Status debe ser un booleano'),
  ],
  userController.update.bind(userController)
);

userRouter.delete(
  '/:id',
  param('id')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Formato de ID invalido'),
  userController.remove.bind(userController)
);

export default userRouter;
