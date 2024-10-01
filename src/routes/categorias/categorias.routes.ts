import { Router } from 'express';
import * as categoriaController from '../../controllers/categorias/categorias.controller';
import { body, param } from 'express-validator';

export const categoriaRouter = Router();

categoriaRouter.get('/', categoriaController.findAll);
categoriaRouter.get('/:id',param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'), categoriaController.findOne);
categoriaRouter.post('/', [
      body('description').isString().withMessage('description debe ser un string'),
      body('creationuser').isString().withMessage('CreationUser debe ser un string'),
      body('creationtimestamp').isISO8601().withMessage('CreationTimestamp debe ser una fecha válida')
    ], categoriaController.create);
categoriaRouter.delete('/:id', param('id').isInt({ min: 1}).withMessage('Formato de ID invalido'), categoriaController.remove);
categoriaRouter.put('/:id', [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
      body('description').optional().isString().withMessage('description debe ser un string'),
      body('modificationtimestamp').optional().isISO8601().withMessage('modificationuser debe ser una fecha válida'),
      body('modificationuser').optional().isString().withMessage('modificationuser debe ser un string')
], categoriaController.update);

export default categoriaRouter;
