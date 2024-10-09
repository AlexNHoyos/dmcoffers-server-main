/**
 * @swagger
 * paths:
 *   /api/publishers/:
 *     get:
 *       summary: Obtener Listado de Publicadores creados
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Publishers
 *       responses:
 *         200:
 *           description: Listado de Publicadores obtenidos con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontraron Publicadores
 *         500:
 *           description: Error Interno del Servidor
 *
 *   /api/publishers/{id}:
 *     get:
 *       summary: Obtener un Publicador creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Publishers
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Publicador
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Publicador obtenido con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Publicador
 *         500:
 *           description: Error Interno del Servidor
 *
 *     put:
 *       summary: Modificar un Publicador creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Publishers
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Publicador
 *           schema:
 *             type: number
 *       requestBody:
 *         description: Esquema de Modificación de un Publicador
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PublisherUpdateSchema'
 *       responses:
 *         200:
 *           description: Publicador modificado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Publicador
 *         500:
 *           description: Error Interno del Servidor
 *
 *     delete:
 *       summary: Borrar un Publicador creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Publishers
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Publicador
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Publicador borrado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró el Publicador
 *         500:
 *           description: Error Interno del Servidor
 *
 *   /api/publishers/create:
 *     post:
 *       summary: Crear un Publicador
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Publishers
 *       requestBody:
 *         description: Esquema de Creación de un Publicador
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PublisherCreateSchema'
 *       responses:
 *         201:
 *           description: Publicador creado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Publicador
 *         500:
 *           description: Error Interno del Servidor
 *
 * components:
 *   schemas:
 *     PublisherCreateSchema:
 *       type: object
 *       properties:
 *         publishername:
 *           type: string
 *           description: Nombre del Publicador
 *         foundation_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de fundación del publicador
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó el publicador
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del publicador
 *         status:
 *           type: boolean
 *           description: Estado del Publicador (Activo o Inactivo)
 *       required:
 *         - foundation_date
 *         - publishername
 *         - creationuser
 *         - creationtimestamp
 *         - status
 *
 *     PublisherUpdateSchema:
 *       type: object
 *       properties:
 *         publishername:
 *           type: string
 *           description: Nombre del Publicador
 *         dissolution_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de disolución del publicador
 *         status:
 *           type: boolean
 *           description: Estado del Publicador (Activo o Inactivo)
 *         modificationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de modificación del publicador
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que modificó el publicador
 *       required:
 *         - modificationtimestamp
 *         - status
 */
