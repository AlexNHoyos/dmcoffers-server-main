import { body, param } from 'express-validator';

export const getHostingPublisherValidationRules = [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido')
];

export const createHostingPublisherValidationRules = [
    body('storageType')
        .isString()
        .withMessage('El tipo de almacenamiento debe ser un string'),
    body('storageAmmount')
        .isFloat({ min: 0 })
        .withMessage('El almacenamiento debe ser un número positivo'),
    body('ramAmmount')
        .isInt({ min: 1 })
        .withMessage('La cantidad de memoria ram debe ser un número positivo'),
    body('cpuSpecs')
        .isString()
        .withMessage('Las especificaciones de el cpu debe ser un string'),
    body('uptimePercentage')
        .isInt({ min: 1 })
        .withMessage('El porcentaje uptime debe ser un número positivo')
];

export const updateHostingPublisherValidationRules = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Formato de ID invalido'),
    body('storageType')
        .isString()
        .withMessage('El tipo de almacenamiento debe ser un string'),
    body('storageAmmount')
        .isFloat({ min: 0 })
        .withMessage('El almacenamiento debe ser un número positivo'),
    body('ramAmmount')
        .isInt({ min: 1 })
        .withMessage('La cantidad de memoria ram debe ser un número positivo'),
    body('cpuSpecs')
        .isString()
        .withMessage('Las especificaciones de el cpu debe ser un string'),
    body('uptimePercentage')
        .isInt({ min: 1 })
        .withMessage('El porcentaje uptime debe ser un número positivo')
];

export const deleteHostingPublisherValidationRules = [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido')
];

