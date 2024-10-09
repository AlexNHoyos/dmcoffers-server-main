import { Router } from 'express';
import { body, param } from 'express-validator';
import { container } from '../../config/dependency-injection/inversify.config.js';
import { CategoriasController } from '../../controllers/categorias/categorias.controller.js';

const categoriaRouter = Router();

const categoriasController = container.get<CategoriasController>(CategoriasController);

categoriaRouter.get('/', categoriasController.findAll);
categoriaRouter.post(
  '/create',
  [
    body('description')
      .isString()
      .withMessage('La descripcion debe ser un string'),
    body('creationuser')
      .isString()
      .withMessage('CreationUser debe ser un string'),
    body('creationtimestamp')
      .isISO8601()
      .withMessage('CreationTimestamp debe ser una fecha válida'),
  ],
  categoriasController.create
);
categoriaRouter.get(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  categoriasController.findOne
);

categoriaRouter.put(
  '/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
    body('description')
      .optional()
      .isString()
      .withMessage('La descripcion debe ser un string'),
    body('modificationtimestamp')
      .optional()
      .isISO8601()
      .withMessage('modificationtimestamp debe ser una fecha válida'),
    body('modificationuser')
      .optional()
      .isString()
      .withMessage('modificationuser debe ser un string'),
  ],
  categoriasController.update
);
categoriaRouter.delete(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  categoriasController.remove
);

export default categoriaRouter;

