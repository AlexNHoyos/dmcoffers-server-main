// src/routes/supportTicketRoutes.ts

import { Router } from 'express';
import * as supportTicketController from '../../controllers/support-ticket/support-ticket.controller.js';

const supportTicketRouter = Router();;

supportTicketRouter.get('/', supportTicketController.findAll);
supportTicketRouter.get('/:id', supportTicketController.findOne);
supportTicketRouter.post('/', supportTicketController.create);
supportTicketRouter.put('/:id', supportTicketController.update);
supportTicketRouter.delete('/:id', supportTicketController.remove);

export default supportTicketRouter;
