import { body, param } from 'express-validator';

export const getUserValidationRules = [
    param('id').notEmpty().isInt({ min: 1 }).withMessage('Formato de ID invalido')
];

export const createUserValidationRules =     [
    body('realname').notEmpty().isString().withMessage('realname debe ser un string'),
    body('surname').notEmpty().isString().withMessage('surname debe ser un string'),
    body('username').notEmpty().isString().withMessage('username debe ser un string'),
    body('birth_date').notEmpty().isISO8601().withMessage('Fecha de Nacimiento debe ser una fecha válida'),
    body('creationuser').notEmpty().isString().withMessage('CreationUser debe ser un string'),
    body('status').isBoolean().notEmpty().withMessage('Status debe ser un booleano'),
    body('password').notEmpty().isString().withMessage('password debe ser un string'),
  ];

export const updateUserValidationRules = [
    param('id').notEmpty().isInt({ min: 1 }).withMessage('Formato de ID invalido'),
    body('realname').optional().isString().withMessage('realname debe ser un string'),
    body('surname').optional().isString().withMessage('surname debe ser un string'),
    body('username').optional().isString().withMessage('username debe ser un string'),
    body('birth_date').optional().isISO8601().withMessage('Fecha de Nacimiento debe ser una fecha válida'),
    body('modificationuser').optional().isString().withMessage('modificationuser debe ser un string'),
    body('modificationtimestamp').optional().isISO8601().withMessage('modificationuser debe ser una fecha válida'),
    body('password').optional().isString().withMessage('password debe ser un string'),
    body('status').optional().isBoolean().withMessage('Status debe ser un booleano')
];

export const deleteUserValidationRules = [
    param('id').notEmpty().isInt({ min: 1 }).withMessage('Formato de ID invalido')
];

