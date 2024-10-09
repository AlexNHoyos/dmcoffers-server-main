/**
 * @swagger
 * components:
 *   schemas:
 *     DeveloperCreateSchema:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: Descripción del Desarrollador
 *         creationuser:
 *           type: string
 *           description: Nombre del usuario que creó el Desarrollador
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de creación del Desarrollador
 *       required:
 *         - description
 *         - creationuser
 *         - creationtimestamp
 * 
 *     DeveloperUpdateSchema:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: Descripción del Desarrollador
 *         modificationuser:
 *           type: string
 *           description: Nombre del usuario que modificó el Desarrollador
 *         modificationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de modificación del Desarrollador
 *       required:
 *         - description
 *         - modificationuser
 *         - modificationtimestamp
 * 
 * paths:
 *   /api/developers/:
 *     get:
 *       summary: Obtener Listado de Desarrolladores
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Desarrolladores
 *       responses:
 *         200:
 *           description: Listado de Desarrolladores obtenido con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontraron desarrolladores
 *         500:
 *           description: Error Interno del Servidor
 * 
 *   /api/developers/{id}:
 *     get:
 *       summary: Obtener un Desarrollador mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Desarrolladores
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Desarrollador
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Desarrollador obtenido con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró el Desarrollador
 *         500:
 *           description: Error Interno del Servidor
 * 
 *     put:
 *       summary: Modificar un Desarrollador mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Desarrolladores
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Desarrollador
 *           schema:
 *             type: number
 *       requestBody:
 *         description: Esquema de Modificación del Desarrollador
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeveloperUpdateSchema'
 *       responses:
 *         200:
 *           description: Desarrollador modificado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró el Desarrollador
 *         500:
 *           description: Error Interno del Servidor
 * 
 *     delete:
 *       summary: Borrar un Desarrollador mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Desarrolladores
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Desarrollador
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Desarrollador borrado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró el Desarrollador
 *         500:
 *           description: Error Interno del Servidor
 * 
 *   /api/developers/create:
 *     post:
 *       summary: Crear un Desarrollador
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Desarrolladores
 *       requestBody:
 *         description: Esquema de Creación de un Desarrollador
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeveloperCreateSchema'
 *       responses:
 *         201:
 *           description: Desarrollador creado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró el Desarrollador
 *         500:
 *           description: Error Interno del Servidor
 */
