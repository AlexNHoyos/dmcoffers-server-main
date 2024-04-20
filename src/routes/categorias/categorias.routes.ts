import { Router } from 'express';
import { sanitizeCategoriaInput, findAll, findOne, add, update, remove } from '../../controllers/categorias.controller';

export const foroRouter = Router();

foroRouter.get('/', findAll);
foroRouter.get('/:id', findOne);
foroRouter.post('/', sanitizeCategoriaInput, add);
foroRouter.put('/:id', sanitizeCategoriaInput, update);
foroRouter.patch('/:id', sanitizeCategoriaInput, update);
foroRouter.delete('/:id', remove);