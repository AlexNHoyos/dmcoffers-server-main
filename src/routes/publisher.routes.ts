import { Router } from 'express';
import {
  sanitizePublisherInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/publishers.controller.js';

export const publisherRouter = Router();

publisherRouter.get('/', findAll);
publisherRouter.get('/:id', findOne);
publisherRouter.post('/', sanitizePublisherInput, add);
publisherRouter.put('/:id', sanitizePublisherInput, update);
publisherRouter.patch('/:id', sanitizePublisherInput, update);
publisherRouter.delete('/:id', remove);
