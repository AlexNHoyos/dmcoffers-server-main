import { Router } from 'express';
import { body, param } from 'express-validator';
import  {JuegoController} from '../../controllers/juegos/juego.controller.js';
import { container } from '../../config/dependency-injection/inversify.config.js';
import { Juego } from '../../models/juegos/juegos.entity.js';

const juegoRouter = Router();

const juegoController = container.get<JuegoController>(JuegoController);

juegoRouter.get('/findall', juegoController.findAll);
juegoRouter.get(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  juegoController.findOne
);

// Agregar mas validaciones de ser necesario
juegoRouter.post(
  '/create',
  [
    body('gamename').isString().withMessage('gamename debe ser un string'),
    body('creationuser')
      .isString()
      .withMessage('CreationUser debe ser un string'),
    body('creationtimestamp')
      .isISO8601()
      .withMessage('CreationTimestamp debe ser una fecha válida'),
    body('release_date')
      .optional()
      .isISO8601()
      .withMessage('release_date debe ser una fecha válida'),
    body('id_publisher')
      .isInt({ min: 1 })
      .withMessage('id_publisher debe ser un entero positivo'),
    body('id_developer')
      .isInt({ min: 1 })
      .withMessage('id_developer debe ser un entero positivo'),
    body('categorias')
      .isArray()
      .withMessage('categorias debe ser un array de IDs de categorías'),
  ],
  juegoController.create
);
juegoRouter.put(
  '/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
    body('gamename')
      .optional()
      .isString()
      .withMessage('gamename debe ser un string'),
    body('modificationuser')
      .optional()
      .isString()
      .withMessage('modificationuser debe ser un string'),
    body('modificationtimestamp')
      .optional()
      .isISO8601()
      .withMessage('modificationuser debe ser una fecha válida'),
    body('release_date')
      .optional()
      .isISO8601()
      .withMessage('release_date debe ser una fecha válida'),
  ],
  juegoController.update
);
juegoRouter.delete(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  juegoController.remove
);

export default juegoRouter;

//--------DOCUMENTACION DEL ENDPOINT PARA SWAGER ------------//

/**
 * @swagger
 * /api/juegos/findall:
 *    get:
 *      summary: Obtener Listado de juegos creados
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - juegos
 *      responses:
 *        200:
 *          description: Listado de juegos obtenidos con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontraron juegos
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/juegos/{id}:
 *    get:
 *      summary: Obtener un juego creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - juegos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del juego
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: juego obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró juego
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/juegos/create:
 *    post:
 *      summary: Crear un juego
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - juegos
 *      requestBody:
 *          description: Esquema de Creacion de un juego
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/juegoCreateSchema'
 *      responses:
 *        201:
 *          description: juego Creado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró juego
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/juegos/{id}:
 *    put:
 *      summary: Modificar un juego creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - juegos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del juego
 *          schema:
 *            type: number
 *      requestBody:
 *          description: Esquema de Creacion de juego
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/juegoUpdateSchema'
 *      responses:
 *        200:
 *          description: juego obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró juego
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/juegos/{id}:
 *    delete:
 *      summary: Borrar un juego creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - juegos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del juego
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: juego borrado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró juego
 *        500:
 *          description: Error Interno del Servidor
 */

//

//----SCHEMAS----//

/**
 * @swagger
 * components:
 *   schemas:
 *     juegoCreateSchema:
 *       type: object
 *       properties:
 *         gamename:
 *           type: string
 *           description: Nombre del juego
 *         creationuser:
 *           type: string
 *           description: Usuario que creó el juego
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del juego
 *         release_date:
 *           type: string
 *           format: date
 *           description: Fecha de lanzamiento del juego
 *         id_publisher:
 *           type: integer
 *           description: ID del Publisher asociado al juego
 *         id_developer:
 *           type: integer
 *           description: ID del Developer asociado al juego
 *         categorias:
 *           type: array
 *           items:
 *            type: integer
 *           description: Lista de IDs de las categorías asociadas al juego
 *       required:
 *         - gamename
 *         - creationuser
 *         - creationtimestamp
 *         - id_publisher
 *         - id_developer
 *         - categorias
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     juegoUpdateSchema:
 *       type: object
 *       properties:
 *         gamename:
 *           type: string
 *           description: Nombre del juego
 *         release_date:
 *           type: string
 *           format: date
 *           description: Fecha de lanzamiento
 *         categorias:
 *           type: array
 *           items:
 *           type: integer
 *           description: Lista de IDs de las categorías asociadas al juego
 *       required:
 *         - gamename
 */
