import { Router } from 'express';
import {
  sanitizeJuegoInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../../controllers/juegos/juegos.controller.ts';

export const JuegoRouter = Router();

JuegoRouter.get('/', findAll);
JuegoRouter.get('/:id', findOne);
JuegoRouter.post('/', sanitizeJuegoInput, add);
JuegoRouter.put('/:id', sanitizeJuegoInput, update);
JuegoRouter.patch('/:id', sanitizeJuegoInput, update);
JuegoRouter.delete('/:id', remove);
