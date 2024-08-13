import { Router } from 'express';
import * as publisherController from '../../controllers/publicadores/publishers.controller.js';
import { body, param } from 'express-validator';

const publisherRouter = Router();

publisherRouter.get('/findall', publisherController.findAll);
publisherRouter.post(
  '/create',
  [
    body('publishername')
      .isString()
      .withMessage('publisher name debe ser un string'),
    body('foundation_date')
      .isISO8601()
      .withMessage('foundation date debe ser una fecha válida'),
    body('dissolution_date')
      .optional()
      .isISO8601()
      .withMessage('dissolution date debe ser una fecha válida'),
    body('status').isBoolean().withMessage('Status debe ser un booleano'),
    body('creationuser')
      .isString()
      .withMessage('CreationUser debe ser un string'),
    body('creationtimestamp')
      .isISO8601()
      .withMessage('CreationTimestamp debe ser una fecha válida'),
  ],
  publisherController.create
);
publisherRouter.get(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  publisherController.findOne
);
publisherRouter.delete(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  publisherController.remove
);
publisherRouter.put(
  '/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
    body('publishername')
      .optional()
      .isString()
      .withMessage('publishername debe ser un string'),
    body('dissolution_date')
      .optional()
      .isISO8601()
      .withMessage('dissolution date debe ser una fecha válida'),
    body('status')
      .optional()
      .isBoolean()
      .withMessage('Status debe ser un booleano'),
    body('modificationtimestamp')
      .optional()
      .isISO8601()
      .withMessage('modificationuser debe ser una fecha válida'),
    body('modificationuser')
      .optional()
      .isString()
      .withMessage('modificationuser debe ser un string'),
  ],
  publisherController.update
);

export default publisherRouter;

//--------DOCUMENTACION DEL ENDPOINT PARA SWAGER ------------//

/**
 * @swagger
 * /api/publishers/findall:
 *    get:
 *      summary: Obtener Listado de Publicadores creados
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Publishers
 *      responses:
 *        200:
 *          description: Listado de Publicadores obtenidos con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontraron Publicadores
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/publishers/{id}:
 *    get:
 *      summary: Obtener un Publicador creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Publishers
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Publicador
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Publicador obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Publicador
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/publishers/create:
 *    post:
 *      summary: Crear un Publicador
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Publishers
 *      requestBody:
 *          description: Esquema de Creacion de un Publicador
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PublisherCreateSchema'
 *      responses:
 *        201:
 *          description: Publicador Creado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Publicador
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/publishers/{id}:
 *    put:
 *      summary: Modificar un Publicador creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Publishers
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Publicador
 *          schema:
 *            type: number
 *      requestBody:
 *          description: Esquema de Creacion de Publisher
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PublisherUpdateSchema'
 *      responses:
 *        200:
 *          description: Publicador obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Publicador
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/publishers/{id}:
 *    delete:
 *      summary: Borrar un Publicador creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Publishers
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Publicador
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Publicador borrado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró el Publicador
 *        500:
 *          description: Error Interno del Servidor
 */

//

//----SCHEMAS----//

/**
 * @swagger
 * components:
 *   schemas:
 *     PublisherCreateSchema:
 *       type: object
 *       properties:
 *         publishername:
 *           type: string
 *           description: Nombre de Publicador
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó el publicador
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del publicador
 *         status:
 *           type: boolean
 *           description: Estado del Publicador. Activo o inactivo
 *       required:
 *         - publishername
 *         - creationuser
 *         - creationtimestamp
 *         - status
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PublisherUpdateSchema:
 *       type: object
 *       properties:
 *         publishername:
 *           type: string
 *           description: Nombre de Publicador
 *         dissolution_date:
 *            type: string
 *            format: date-time
 *            description: Fecha de disolucion del publiador
 *         status:
 *           type: boolean
 *           description: Estado del Publicador. Activo o inactivo
 *         modificationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de modificacion del publicador
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que modifico el publicador
 *       required:
 *         - modificationuser
 *         - modificationtimestamp
 *         - status
 *
 */
