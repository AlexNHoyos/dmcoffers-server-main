

import { Router } from 'express';
import { body, param } from 'express-validator';
import * as hostingController from '../../controllers/hosting/hosting.controller.js';

const hostingRouter = Router();

hostingRouter.get('/', hostingController.findAll);
hostingRouter.get('/:id', param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'), hostingController.findOne);
hostingRouter.post(
  '/',
  [
    body('name').isString().withMessage('Name debe ser un string'),
    body('creationuser').isString().withMessage('CreationUser debe ser un string'),
    body('creationtimestamp').isISO8601().withMessage('CreationTimestamp debe ser una fecha válida'),
    body('status').isBoolean().withMessage('Status debe ser un booleano')
  ],
  hostingController.create
);
hostingRouter.put(
  '/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
    body('name').optional().isString().withMessage('Name debe ser un string'),
    body('modificationuser').optional().isString().withMessage('modificationuser debe ser un string'),
    body('modificationtimestamp').optional().isISO8601().withMessage('modificationuser debe ser una fecha válida'),
    body('status').optional().isBoolean().withMessage('Status debe ser un booleano')
  ],
  hostingController.update
);
hostingRouter.delete('/:id', param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'), hostingController.remove);

export default hostingRouter;
