import { Router } from 'express';
import { UserController } from '../../controllers/usuarios/user.controller.js';
import { body, param } from 'express-validator';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { container } from '../../config/dependency-injection/inversify.config.js';

const userRouter = Router();
const userController = container.get<UserController>(UserController);

userRouter.get('/findall', userController.findAll.bind(userController));

userRouter.get('/:id', param('id').notEmpty().isInt({ min: 1 }).withMessage('Formato de ID invalido'), userController.findOne.bind(userController));

userRouter.post('/register',
    [
      body('realname').notEmpty().isString().withMessage('realname debe ser un string'),
      body('surname').notEmpty().isString().withMessage('surname debe ser un string'),
      body('username').notEmpty().isString().withMessage('username debe ser un string'),
      body('birth_date').notEmpty().isISO8601().withMessage('Fecha de Nacimiento debe ser una fecha válida'),
      body('creationuser').notEmpty().isString().withMessage('CreationUser debe ser un string'),
      body('status').isBoolean().notEmpty().withMessage('Status debe ser un booleano'),
      body('password').notEmpty().isString().withMessage('password debe ser un string'),
    ], userController.create.bind(userController));

userRouter.put('/:id',
    [
      param('id').notEmpty().isInt({ min: 1 }).withMessage('Formato de ID invalido'),
      body('realname').optional().isString().withMessage('realname debe ser un string'),
      body('surname').optional().isString().withMessage('surname debe ser un string'),
      body('username').optional().isString().withMessage('username debe ser un string'),
      body('birth_date').optional().isISO8601().withMessage('Fecha de Nacimiento debe ser una fecha válida'),
      body('modificationuser').optional().isString().withMessage('modificationuser debe ser un string'),
      body('modificationtimestamp').optional().isISO8601().withMessage('modificationuser debe ser una fecha válida'),
      body('password').optional().isString().withMessage('password debe ser un string'),
      body('status').optional().isBoolean().withMessage('Status debe ser un booleano')
    ], userController.update.bind(userController))

userRouter.delete('/:id', param('id').notEmpty().isInt({ min: 1 }).withMessage('Formato de ID invalido'), userController.remove.bind(userController));

export default userRouter;

//--------DOCUMENTACION DEL ENDPOINT PARA SWAGER ------------//

/**
 * @swagger
 * /api/users/findall:
 *    get:
 *      summary: Obtener Listado de Usuarios creados
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Usuarios
 *      responses:
 *        200:
 *          description: Listado de Usuarios obtenidos con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontraron Usuarios
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/users/{id}:
 *    get:
 *      summary: Obtener un Usuario creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Usuarios
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Usuario
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Usuario obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Usuario
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/users/register:
 *    post:
 *      summary: Crear un Usuario
 *      tags:
 *        - Usuarios
 *      requestBody:
 *          description: Esquema de Creacion de Usuarios
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UsuarioRegisterSchema'
 *      responses:
 *        201:
 *          description: Usuario Creado con éxito
 *        404:
 *          description: No se creó Usuario
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/users/{id}:
 *    put:
 *      summary: Modificar un Usuario creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Usuarios
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Usuario
 *          schema:
 *            type: number
 *      requestBody:
 *          description: Esquema de Modificación de Usuario
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UsuarioUpdateSchema'
 *      responses:
 *        200:
 *          description: Usuario modificado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encotró Usuario
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/users/{id}:
 *    delete:
 *      summary: Borrar un Usuario creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Usuarios
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Usuario
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Usuario borrado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Usuario
 *        500:
 *          description: Error Interno del Servidor
 */

//----SCHEMAS----//

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioRegisterSchema:
 *       type: object
 *       properties:
 *         realname:
 *           type: string
 *           description: Nombre de Usuario
 *         surname:
 *           type: string
 *           description: Apellido de Usuario
 *         username:
 *           type: string
 *           description: Nick o User name de Usuario
 *         birth_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de Nacimiento del Usuario
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó el Usuario
 *         status:
 *           type: boolean
 *           description: Estado del Usuario. Activo o Inactivo
 *         password:
 *           type: string
 *           description: Password del Usuario. Debe Contener Mayúsculas, Minúsculas y números.

 *       required:
 *         - realname
 *         - surname
 *         - username
 *         - birth_date
 *         - creationuser
 *         - status
 *         - password 
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioUpdateSchema:
 *       type: object
 *       properties:
 *         realname:
 *           type: string
 *           description: Nombre de Usuario
 *         surname:
 *           type: string
 *           description: apellido de Usuario
 *         modificationuser:
 *           type: string
 *           description: Nombre del usuario que creó el Usuario
 *         modificationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de modificacion del Usuario
 *         status:
 *           type: boolean
 *           description: Estado del Usuario. Activo o Inactivo
 *       required:
 *         - realname
 *         - surname
 *         - modificationuser
 *         - modificationtimestamp
 *         - status
 */
