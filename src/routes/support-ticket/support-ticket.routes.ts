// src/routes/supportTicketRoutes.ts

import { Router } from 'express';
import * as supportTicketController from '../../controllers/support-ticket/support-ticket.controller.js';
import { body, param } from 'express-validator';

const supportTicketRouter = Router();

supportTicketRouter.get('/findall', supportTicketController.findAll);
supportTicketRouter.get(
  '/:id',
  param('id')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Formato de ID invalido'),
  supportTicketController.findOne
);
supportTicketRouter.post(
  '/create',
  [
    body('creationuser')
      .notEmpty()
      .isString()
      .withMessage('CreationUser debe ser un string'),
    body('creationtimestamp')
      .notEmpty()
      .isISO8601()
      .withMessage('CreationTimestamp debe ser una fecha válida'),
    body('status').isBoolean().withMessage('Status debe ser un booleano'),
  ],
  supportTicketController.create
);
supportTicketRouter.put(
  '/:id',
  [
    param('id')
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage('Formato de ID invalido'),
    body('modificationuser')
      .notEmpty()
      .isString()
      .withMessage('modificationuser debe ser un string'),
    body('modificationtimestamp')
      .optional()
      .isISO8601()
      .withMessage('modificationuser debe ser una fecha válida'),
    body('status')
      .optional()
      .isBoolean()
      .withMessage('Status debe ser un booleano'),
  ],
  supportTicketController.update
);
supportTicketRouter.delete(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  supportTicketController.remove
);

export default supportTicketRouter;

//--------DOCUMENTACION DEL ENDPOINT PARA SWAGER ------------//

/**
 * @swagger
 * /api/supportTicket/findall:
 *    get:
 *      summary: Obtener Listado de Support Tickets creados
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Support Ticket
 *      responses:
 *        200:
 *          description: Listado de Support Tickets obtenidos con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontraron Support Tickets
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/supportTicket/{id}:
 *    get:
 *      summary: Obtener un Support Ticket creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Support Ticket
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Hosting
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Support Ticket obtenido con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Support Tickets
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/supportTicket/create:
 *    post:
 *      summary: Crear un Support Ticket
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Support Ticket
 *      requestBody:
 *          description: Esquema de Creacion de Support Ticket
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SupportTicketCreateSchema'
 *      responses:
 *        201:
 *          description: Support Ticket Creado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se creó Support Ticket
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/supportTicket/{id}:
 *    put:
 *      summary: Modificar un Support Ticket creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Support Ticket
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Support Ticket
 *          schema:
 *            type: number
 *      requestBody:
 *          description: Esquema de Modificación de Support Ticket
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SupportTicketUpdateSchema'
 *      responses:
 *        200:
 *          description: Support Tickets modificado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encotró Support Ticket
 *        500:
 *          description: Error Interno del Servidor
 */

/**
 * @swagger
 * /api/supportTicket/{id}:
 *    delete:
 *      summary: Borrar un Support Ticket creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Support Ticket
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del Support Tickets
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Support Ticket borrado con éxito
 *        401:
 *          description: No autorizado (NOT AUTHORIZED)
 *        404:
 *          description: No se encontró Support Ticket
 *        500:
 *          description: Error Interno del Servidor
 */

//

//----SCHEMAS----//

/**
 * @swagger
 * components:
 *   schemas:
 *     SupportTicketCreateSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de SupportTicket
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó el SupportTicket
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del SupportTicket
 *         status:
 *           type: boolean
 *           description: Estado del SupportTicket. Abierto o Cerrado
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
 *     SupportTicketUpdateSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de Support Ticket
 *         status:
 *           type: boolean
 *           description: Estado del Support Ticket. Abierto o Cerrado
 *       required:
 *         - creationuser
 *         - status
 */
