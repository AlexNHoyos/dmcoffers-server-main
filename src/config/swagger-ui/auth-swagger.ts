/**
 * @swagger
 * components:
 *     schemas:
 *         LoginSchema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      description: Nombre de Usuario
 *                  password:
 *                      type: string
 *                      description: Password del Usuario
 *              required:
 *                  - username
 *                  - password
 * paths:
 *   /api/auth/login:
 *      post:
 *        summary: Login de Usuario
 *        tags:
 *          - Auth
 *        requestBody:
 *            description: Esquema de login
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/LoginSchema'
 *        responses:
 *          200:
 *            description: Login Exitoso
 *          400:
 *            description: Credenciales incorrectas
 *          401:
 *            description: Credenciales incorrectas
 *          404:
 *            description: No se encontró Usuario
 *          500:
 *            description: Error Interno del Servidor
 */ 
 