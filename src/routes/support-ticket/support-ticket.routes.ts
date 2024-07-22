// src/routes/supportTicketRoutes.ts

import { Router } from 'express';
import * as supportTicketController from '../../controllers/support-ticket/support-ticket.controller.js';
import {body, param } from 'express-validator';

const supportTicketRouter = Router();;

supportTicketRouter.get('/', supportTicketController.findAll);
supportTicketRouter.get('/:id', param('id').notEmpty().isInt({ min: 1 }).withMessage('Formato de ID invalido'), supportTicketController.findOne);
supportTicketRouter.post('/',
    [
      body('name').isString().withMessage('Name debe ser un string'),
      body('creationuser').notEmpty().isString().withMessage('CreationUser debe ser un string'),
      body('creationtimestamp').notEmpty().isISO8601().withMessage('CreationTimestamp debe ser una fecha válida'),
      body('status').isBoolean().withMessage('Status debe ser un booleano')
    ], supportTicketController.create);
supportTicketRouter.put('/:id',
    [
      param('id').notEmpty().isInt({ min: 1 }).withMessage('Formato de ID invalido'),
      body('modificationuser').notEmpty().isString().withMessage('modificationuser debe ser un string'),
      body('modificationtimestamp').optional().isISO8601().withMessage('modificationuser debe ser una fecha válida'),
      body('status').optional().isBoolean().withMessage('Status debe ser un booleano')
    ], supportTicketController.update);
supportTicketRouter.delete('/:id', param('id').isInt({ min: 1 }).withMessage('Formato de ID invalido'), supportTicketController.remove);

export default supportTicketRouter;
