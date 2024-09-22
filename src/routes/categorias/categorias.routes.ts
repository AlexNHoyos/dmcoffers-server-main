import { Router } from 'express';
import * as categoriasController from '../../controllers/categorias/categorias.controller.js';
import { body, param } from 'express-validator';

const categoriaRouter = Router();

categoriaRouter.get('/', categoriasController.findAll);
categoriaRouter.get(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  categoriasController.findOne
);
categoriaRouter.post('/create', categoriasController.create);
categoriaRouter.put('/:id', categoriasController.update);
categoriaRouter.delete('/:id', categoriasController.remove);

export default categoriaRouter;
