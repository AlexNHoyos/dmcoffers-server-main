/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaCreateSchema:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: Descripción de la Categoría
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó la Categoría
 *         creationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la Categoría
 *       required:
 *         - description
 *         - creationuser
 *         - creationtimestamp
 *
 *     CategoriaUpdateSchema:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: Descripción de la Categoría
 *         modificationuser:
 *           type: string
 *           description: Nombre del usuario que modificó la Categoría
 *         modificationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de modificación de la Categoría
 *       required:
 *         - description
 *         - modificationuser
 *         - modificationtimestamp
 */

/**
 * @swagger
 * paths:
 *   /api/categories/:
 *     get:
 *       summary: Obtener Listado de Categorías creados
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Categorías
 *       responses:
 *         200:
 *           description: Listado de Categorías obtenidas con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontraron categorías
 *         500:
 *           description: Error Interno del Servidor
 *
 *   /api/categories/{id}:
 *     get:
 *       summary: Obtener una Categoría creada mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Categorías
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID de la Categoría
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Categoría obtenida con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró la Categoría
 *         500:
 *           description: Error Interno del Servidor
 *
 *     put:
 *       summary: Modificar una Categoría creada mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Categorías
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID de la Categoría
 *           schema:
 *             type: number
 *       requestBody:
 *         description: Esquema de Modificación de Categoría
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaUpdateSchema'
 *       responses:
 *         200:
 *           description: Categoría modificada con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró la Categoría
 *         500:
 *           description: Error Interno del Servidor
 *
 *     delete:
 *       summary: Borrar una Categoría creada mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Categorías
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID de la Categoría
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Categoría borrada con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró la Categoría
 *         500:
 *           description: Error Interno del Servidor
 *
 *   /api/categories/create:
 *     post:
 *       summary: Crear una Categoría
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Categorías
 *       requestBody:
 *         description: Esquema de Creación de una Categoría
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaCreateSchema'
 *       responses:
 *         201:
 *           description: Categoría creada con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró la Categoría
 *         500:
 *           description: Error Interno del Servidor
 */
