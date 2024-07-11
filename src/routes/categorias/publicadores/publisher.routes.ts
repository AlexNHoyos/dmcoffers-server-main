import { Router } from 'express';
import * as publisherController from '../../controllers/publicadores/publishers.controller.js';

const publisherRouter = Router();

publisherRouter.get('/', publisherController.findAll);
publisherRouter.post('/', publisherController.create);
publisherRouter.get('/:id', publisherController.findOne);
publisherRouter.delete('/:id', publisherController.remove);
publisherRouter.put('/:id', publisherController.update);

export default publisherRouter;