import { Router } from 'express';
import { sanitizeForoInput, findAll, findOne, add, update, remove } from '../../controllers/foros/foro.controller';

export const foroRouter = Router();

foroRouter.get('/', findAll);
foroRouter.get('/:id', findOne);
foroRouter.post('/', sanitizeForoInput, add);
foroRouter.put('/:id', sanitizeForoInput, update);
foroRouter.patch('/:id', sanitizeForoInput, update);
foroRouter.delete('/:id', remove);