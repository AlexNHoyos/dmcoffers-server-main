/**
 * @swagger
 * paths:
 *   /api/hostings/findall:
 *     get:
 *       summary: Obtener Listado de Hostings creados
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Hostings
 *       responses:
 *         200:
 *           description: Listado de Hostings obtenidos con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontraron Hostings
 *         500:
 *           description: Error Interno del Servidor
 *
 *   /api/hostings/{id}:
 *     get:
 *       summary: Obtener un Hosting creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Hostings
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Hosting
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Hosting obtenido con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Hosting
 *         500:
 *           description: Error Interno del Servidor
 * 
 *     put:
 *       summary: Modificar un Hosting creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Hostings
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Hosting
 *           schema:
 *             type: number
 *       requestBody:
 *         description: Esquema de Modificación de Hosting
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostingUpdateSchema'
 *       responses:
 *         200:
 *           description: Hosting modificado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Hosting
 *         500:
 *           description: Error Interno del Servidor
 *
 *     delete:
 *       summary: Borrar un Hosting creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Hostings
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Hosting
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Hosting borrado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Hosting
 *         500:
 *           description: Error Interno del Servidor
 *
 *   /api/hostings/create:
 *     post:
 *       summary: Crear un Hosting
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Hostings
 *       requestBody:
 *         description: Esquema de Creación de un Hosting
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostingCreateSchema'
 *       responses:
 *         201:
 *           description: Hosting creado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Hosting
 *         500:
 *           description: Error Interno del Servidor
 *
 * components:
 *   schemas:
 *     HostingCreateSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del Hosting
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó el hosting
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del hosting
 *         status:
 *           type: boolean
 *           description: Estado del Hosting (En servicio o Fuera de Servicio)
 *       required:
 *         - name
 *         - creationuser
 *         - creationtimestamp
 *         - status
 *
 *     HostingUpdateSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del Hosting
 *         status:
 *           type: boolean
 *           description: Estado del Hosting (En servicio o Fuera de Servicio)
 *       required:
 *         - creationuser
 *         - status
 */
