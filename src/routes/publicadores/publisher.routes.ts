import { Router, Request, Response } from 'express';
import {
  getPublishers,
  addPublisher,
  getPublisherById,
  removePublisher,
} from '../../controllers/publicadores/publishers.controller';

const publisherRouter = Router();

publisherRouter.get('/', (req: Request, res: Response) => {
  getPublishers(req, res);
});
publisherRouter.post('/', (req: Request, res: Response) => {
  addPublisher(req, res);
});
publisherRouter.get('/:id', (req: Request, res: Response) => {
  getPublisherById(req, res);
});
publisherRouter.delete('/:id', (req: Request, res: Response) => {
  removePublisher(req, res);
});

export default publisherRouter;
