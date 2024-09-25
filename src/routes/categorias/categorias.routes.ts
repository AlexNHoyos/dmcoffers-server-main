import { Router } from 'express';
import { body, param } from 'express-validator';
import * as categoriasController from '../../controllers/categorias/categorias.controller.js';

const categoriaRouter = Router();

categoriaRouter.get('/', categoriasController.findAll);
categoriaRouter.post(
  '/create',
  [
    body('description')
      .isString()
      .withMessage('La descripcion debe ser un string'),
    body('creationuser')
      .isString()
      .withMessage('CreationUser debe ser un string'),
    body('creationtimestamp')
      .isISO8601()
      .withMessage('CreationTimestamp debe ser una fecha válida'),
  ],
  categoriasController.create
);
categoriaRouter.get(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  categoriasController.findOne
);

categoriaRouter.put(
  '/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
    body('description')
      .optional()
      .isString()
      .withMessage('La descripcion debe ser un string'),
    body('modificationtimestamp')
      .optional()
      .isISO8601()
      .withMessage('modificationtimestamp debe ser una fecha válida'),
    body('modificationuser')
      .optional()
      .isString()
      .withMessage('modificationuser debe ser un string'),
  ],
  categoriasController.update
);
categoriaRouter.delete(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  categoriasController.remove
);

export default categoriaRouter;

//--------DOCUMENTACION DEL ENDPOINT PARA SWAGER ------------//

/**
 * @swagger
 * /api/categories/:
 *    get:
 *      summary: Obtener Listado de Categorias creados
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Categorias
 *      responses:
 *        200:
 *          description: Listado de Categorias obtenidas con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontraron categorias
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/categories/{id}:
 *    get:
 *      summary: Obtener una Categoria creada mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Categorias
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID de la Categoria
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Categoria obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Categoria
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/categories/create:
 *    post:
 *      summary: Crear una Categoria
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Categorias
 *      requestBody:
 *          description: Esquema de Creacion de una Categoria
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CategoriaCreateSchema'
 *      responses:
 *        201:
 *          description: Categoria Creada con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Categoria
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/categories/{id}:
 *    put:
 *      summary: Modificar una Categoria creada mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Categorias
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Categoria
 *          schema:
 *            type: number
 *      requestBody:
 *          description: Esquema de Modificacion de Categoria
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CategoriaUpdateSchema'
 *      responses:
 *        200:
 *          description: Categoria obtenida con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Categoria
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/categories/{id}:
 *    delete:
 *      summary: Borrar una Categoria creada mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Categorias
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Categoria
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Categoria borrada con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Categoria
 *        500:
 *          description: Error Interno del Servidor
 */

//

//----SCHEMAS----//

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaCreateSchema:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: Descripcion de Categoria
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó la Categoria
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la Categoria
 *
 *       required:
 *         - name
 *         - creationuser
 *         - creationtimestamp
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
/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaUpdateSchema:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: Descripcion de Categoria
 *         modificationuser:
 *           type: string
 *           description: Nombre del usuario que creó el Usuario
 *         modificationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de modificacion del Usuario
 *
 *
 *
 *       required:
 *         - description
 *         - modificationuser
 *         - modificationtimestamp
 *
 */
