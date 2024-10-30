/**
 * @swagger
 * /api/juegos/:
 *    get:
 *      summary: Obtener Listado de juegos creados
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Juegos
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
 *        - Juegos
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
 * /api/juegos/:
 *    post:
 *      summary: Crear un juego
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Juegos
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
 *    patch:
 *      summary: Modificar los datos de un juego mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Juegos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del juego a modificar
 *          schema:
 *            type: number
 *      requestBody:
 *        description: Esquema de actualización [PARCIAL] del juego
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/juegoUpdateSchema'
 *      responses:
 *        200:
 *          description: Juego actualizado con éxito
 *        404:
 *          description: Juego no encontrado
 *        500:
 *          description: Error interno del servidor
 */
/**
 * @swagger
 * /api/juegos/{id}/precio:
 *    patch:
 *      summary: Actualizar el precio de un juego mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Juegos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del juego
 *          schema:
 *            type: number
 *      requestBody:
 *        description: Nuevo precio del juego
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nuevoPrecio:
 *                  type: number
 *                  description: Nuevo precio del juego
 *                  example: 59.99
 *      responses:
 *        200:
 *          description: Precio actualizado con éxito
 *        404:
 *          description: Juego no encontrado
 *        500:
 *          description: Error interno del servidor
 */

/**
 * @swagger
 * /api/juegos/{id}:
 *    delete:
 *      summary: Borrar un juego creado mediante ID
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Juegos
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
 *         initial_price:
 *           type: number
 *           description: Precio inicial del juego
 *           example: 49.99
 *       required:
 *         - gamename
 *         - creationuser
 *         - creationtimestamp
 *         - id_publisher
 *         - id_developer
 *         - categorias
 *         - initial_price
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
 *            type: integer
 *           description: Lista de IDs de las categorías asociadas al juego
 *         id_publisher:
 *           type: integer
 *           description: ID del Publisher asociado al juego (opcional)
 *         id_developer:
 *           type: integer
 *           description: ID del Developer asociado al juego (opcional)
 *         price:
 *           type: number
 *           description: Nuevo precio del juego
 *           example: 59.99
 *       required:
 *         - gamename
 *
 */
