/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioRegisterSchema:
 *       type: object
 *       properties:
 *         realname:
 *           type: string
 *           description: Nombre de Usuario
 *         surname:
 *           type: string
 *           description: Apellido de Usuario
 *         username:
 *           type: string
 *           description: Nick o User name de Usuario
 *         birth_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de Nacimiento del Usuario
 *         creationuser:
 *           type: string
 *           description: Nombre de usuario que creó el Usuario
 *         status:
 *           type: boolean
 *           description: Estado del Usuario. Activo o Inactivo
 *         password:
 *           type: string
 *           description: Password del Usuario. Debe contener mayúsculas, minúsculas y números.
 *       required:
 *         - realname
 *         - surname
 *         - username
 *         - birth_date
 *         - creationuser
 *         - status
 *         - password 
 * 
 *     UsuarioUpdateSchema:
 *       type: object
 *       properties:
 *         realname:
 *           type: string
 *           description: Nombre de Usuario
 *         surname:
 *           type: string
 *           description: Apellido de Usuario
 *         modificationuser:
 *           type: string
 *           description: Nombre del usuario que modificó el Usuario
 *         modificationtimestamp:
 *           type: string
 *           format: date-time
 *           description: Fecha de modificación del Usuario
 *         status:
 *           type: boolean
 *           description: Estado del Usuario. Activo o Inactivo
 *       required:
 *         - realname
 *         - surname
 *         - modificationuser
 *         - modificationtimestamp
 *         - status
 * 
 * paths:
 *   /api/users/findall:
 *     get:
 *       summary: Obtener Listado de Usuarios creados
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Usuarios
 *       responses:
 *         200:
 *           description: Listado de Usuarios obtenidos con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontraron Usuarios
 *         500:
 *           description: Error Interno del Servidor
 *  
 *   /api/users/{id}:
 *     get:
 *       summary: Obtener un Usuario creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Usuarios
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Usuario
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Usuario obtenido con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Usuario
 *         500:
 *           description: Error Interno del Servidor
 * 
 *     put:
 *       summary: Modificar un Usuario creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Usuarios
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Usuario
 *           schema:
 *             type: number
 *       requestBody:
 *         description: Esquema de Modificación de Usuario
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioUpdateSchema'
 *       responses:
 *         200:
 *           description: Usuario modificado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Usuario
 *         500:
 *           description: Error Interno del Servidor
 * 
 *     delete:
 *       summary: Borrar un Usuario creado mediante ID
 *       security:
 *         - apiAuth: []
 *       tags:
 *         - Usuarios
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del Usuario
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Usuario borrado con éxito
 *         401:
 *           description: No autorizado (NOT AUTHORIZED)
 *         404:
 *           description: No se encontró Usuario
 *         500:
 *           description: Error Interno del Servidor
 * 
 *   /api/users/register:
 *     post:
 *       summary: Crear un Usuario
 *       tags:
 *         - Usuarios
 *       requestBody:
 *         description: Esquema de Creación de Usuarios
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioRegisterSchema'
 *       responses:
 *         201:
 *           description: Usuario Creado con éxito
 *         404:
 *           description: No se creó Usuario
 *         500:
 *           description: Error Interno del Servidor
 */
