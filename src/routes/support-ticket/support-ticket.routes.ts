// src/routes/supportTicketRoutes.ts

import { Router } from 'express';
import { body, param } from 'express-validator';
import { SupportTicketController } from '../../controllers/support-ticket/support-ticket.controller.js';
import { container } from '../../config/dependency-injection/inversify.config.js';

const supportTicketRouter = Router();

const supportTicketController = container.get<SupportTicketController>(SupportTicketController);

supportTicketRouter.get('/findall', supportTicketController.findAll);
supportTicketRouter.get(
  '/:id',
  param('id')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Formato de ID invalido'),
  supportTicketController.findOne
);
supportTicketRouter.post(
  '/create',
  [
    body('creationuser')
      .notEmpty()
      .isString()
      .withMessage('CreationUser debe ser un string'),
    body('creationtimestamp')
      .notEmpty()
      .isISO8601()
      .withMessage('CreationTimestamp debe ser una fecha válida'),
    body('status').isBoolean().withMessage('Status debe ser un booleano'),
  ],
  supportTicketController.create
);
supportTicketRouter.put(
  '/:id',
  [
    param('id')
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage('Formato de ID invalido'),
    body('modificationuser')
      .notEmpty()
      .isString()
      .withMessage('modificationuser debe ser un string'),
    body('modificationtimestamp')
      .optional()
      .isISO8601()
      .withMessage('modificationuser debe ser una fecha válida'),
    body('status')
      .optional()
      .isBoolean()
      .withMessage('Status debe ser un booleano'),
  ],
  supportTicketController.update
);
supportTicketRouter.delete(
  '/:id',
  param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'),
  supportTicketController.remove
);

export default supportTicketRouter;
