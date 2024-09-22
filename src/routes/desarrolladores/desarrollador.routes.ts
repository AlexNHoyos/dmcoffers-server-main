import { Router } from 'express';
import * as desarrolladorController from '../../controllers/desarrolladores/desarrolladores.controller.js';
import { body, param } from 'express-validator';

const desarrolladorRouter = Router();

desarrolladorRouter.get('/', desarrolladorController.findAll);
desarrolladorRouter.post('/',
    [
        body('developername').isString().withMessage('developer name debe ser un string'),
        body('foundation_date').isISO8601().withMessage('foundation date debe ser una fecha válida'),
        body('dissolution_date').optional().isISO8601().withMessage('dissolution date debe ser una fecha válida'),
        body('status').isBoolean().withMessage('Status debe ser un booleano'),
        body('creationuser').isString().withMessage('CreationUser debe ser un string'),
        body('creationtimestamp').isISO8601().withMessage('CreationTimestamp debe ser una fecha válida')
    ], desarrolladorController.create);
desarrolladorRouter.get('/:id', param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'), desarrolladorController.findOne);
desarrolladorRouter.delete('/:id', param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'), desarrolladorController.remove);
desarrolladorRouter.put('/:id',
    [
        param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
        body('desarrolladorname').optional().isString().withMessage('developer name debe ser un string'),
        body('dissolution_date').optional().isISO8601().withMessage('dissolution date debe ser una fecha válida'),
        body('status').optional().isBoolean().withMessage('Status debe ser un booleano'),
        body('modificationtimestamp').optional().isISO8601().withMessage('modificationuser debe ser una fecha válida'),
        body('modificationuser').optional().isString().withMessage('modificationuser debe ser un string')
    ], desarrolladorController.update);

export default desarrolladorRouter;
