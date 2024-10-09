/**
 * @swagger
 * paths:
 *   /api/supportTicket/findall:
 *     get:
 *       summary: Obtener Listado de Support Tickets creados
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Support Ticket
 *       responses:
 *         200:
 *           description: Listado de Support Tickets obtenidos con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontraron Support Tickets
 *         500:
 *           description: Error Interno del Servidor
 *
 *   /api/supportTicket/{id}:
 *     get:
 *       summary: Obtener un Support Ticket creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Support Ticket
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Support Ticket
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Support Ticket obtenido con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Support Ticket
 *         500:
 *           description: Error Interno del Servidor
 * 
 *     put:
 *       summary: Modificar un Support Ticket creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Support Ticket
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Support Ticket
 *           schema:
 *             type: number
 *       requestBody:
 *         description: Esquema de Modificación de Support Ticket
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportTicketUpdateSchema'
 *       responses:
 *         200:
 *           description: Support Ticket modificado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Support Ticket
 *         500:
 *           description: Error Interno del Servidor
 *
 *     delete:
 *       summary: Borrar un Support Ticket creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Support Ticket
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Support Ticket
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Support Ticket borrado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Support Ticket
 *         500:
 *           description: Error Interno del Servidor
 *
 *   /api/supportTicket/create:
 *     post:
 *       summary: Crear un Support Ticket
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Support Ticket
 *       requestBody:
 *         description: Esquema de Creación de Support Ticket
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportTicketCreateSchema'
 *       responses:
 *         201:
 *           description: Support Ticket creado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se creó Support Ticket
 *         500:
 *           description: Error Interno del Servidor
 *
 * components:
 *   schemas:
 *     SupportTicketCreateSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del Support Ticket
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó el Support Ticket
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del Support Ticket
 *         status:
 *           type: boolean
 *           description: Estado del Support Ticket (Abierto o Cerrado)
 *       required:
 *         - name
 *         - creationuser
 *         - creationtimestamp
 *         - status
 *
 *     SupportTicketUpdateSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del Support Ticket
 *         status:
 *           type: boolean
 *           description: Estado del Support Ticket (Abierto o Cerrado)
 *       required:
 *         - creationuser
 *         - status
 */
