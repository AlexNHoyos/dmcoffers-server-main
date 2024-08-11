

import { Router } from 'express';
import { body, param } from 'express-validator';
import * as hostingController from '../../controllers/hosting/hosting.controller.js';

const hostingRouter = Router();

hostingRouter.get('/findall', hostingController.findAll);
hostingRouter.get('/:id', param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'), hostingController.findOne);
hostingRouter.post(
  '/create',
  [
    body('name').isString().withMessage('Name debe ser un string'),
    body('creationuser').isString().withMessage('CreationUser debe ser un string'),
    body('creationtimestamp').isISO8601().withMessage('CreationTimestamp debe ser una fecha válida'),
    body('status').isBoolean().withMessage('Status debe ser un booleano')
  ],
  hostingController.create
);
hostingRouter.put(
  '/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
    body('name').optional().isString().withMessage('Name debe ser un string'),
    body('modificationuser').optional().isString().withMessage('modificationuser debe ser un string'),
    body('modificationtimestamp').optional().isISO8601().withMessage('modificationuser debe ser una fecha válida'),
    body('status').optional().isBoolean().withMessage('Status debe ser un booleano')
  ],
  hostingController.update
);
hostingRouter.delete('/:id', param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'), hostingController.remove);

export default hostingRouter;


//--------DOCUMENTACION DEL ENDPOINT PARA SWAGER ------------// 

/**
 * @swagger
 * /api/hostings/findall:
 *    get:
 *      summary: Obtener Listado de Hostings creados
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Hostings
 *      responses:
 *        200:
 *          description: Listado de Hostings obtenidos con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontraron Hostings
 *        500:
 *          description: Error Interno del Servidor     
 */

/**
 * @swagger
 * /api/hostings/{id}:
 *    get:
 *      summary: Obtener un Hosting creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Hostings
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Hosting
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Hosting obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Hosting
 *        500:
 *          description: Error Interno del Servidor     
 */

/**
 * @swagger
 * /api/hostings/create:
 *    post:
 *      summary: Crear un Hosting
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Hostings
 *      requestBody:
 *          description: Esquema de Creacion de un Hosting
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HostingCreateSchema'
 *      responses:
 *        201:
 *          description: Hosting Creado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Hosting
 *        500:
 *          description: Error Interno del Servidor     
 */


/**
 * @swagger
 * /api/hostings/{id}:
 *    put:
 *      summary: Modificar un Hosting creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Hostings
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Hosting
 *          schema:
 *            type: number
 *      requestBody:
 *          description: Esquema de Creacion de Usuario
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HostingUpdateSchema'
 *      responses:
 *        200:
 *          description: Hosting obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Hosting
 *        500:
 *          description: Error Interno del Servidor     
 */

/**
 * @swagger
 * /api/hostings/{id}:
 *    delete:
 *      summary: Borrar un Hosting creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Hostings
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Hosting
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Hosting borrado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Hosting
 *        500:
 *          description: Error Interno del Servidor     
 */



//


//----SCHEMAS----//

/**
 * @swagger
 * components:
 *   schemas:
 *     HostingCreateSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de Hosting
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó el hosting
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del hosting
 *         status:
 *           type: boolean
 *           description: Estado del Hosting. En servicio o Fuera de Servicio
 *       required:
 *         - name
 *         - creationuser
 *         - creationtimestamp
 *         - status
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HostingUpdateSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de Hosting
 *         status:
 *           type: boolean
 *           description: Estado del Hosting. En servicio o Fuera de Servicio
 *       required:
 *         - creationuser
 *         - status
 */
