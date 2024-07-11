// src/routes/hostingRoutes.ts

import { Router } from 'express';
import * as hostingController from '../../controllers/hosting/hosting.controller.js';

const hostingRouter = Router();

hostingRouter.get('/', hostingController.findAll);
hostingRouter.get('/:id', hostingController.findOne);
hostingRouter.post('/', hostingController.create);
hostingRouter.put('/:id', hostingController.update);
hostingRouter.delete('/:id', hostingController.remove);

export default hostingRouter;