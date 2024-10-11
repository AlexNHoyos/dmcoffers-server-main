import { Router } from 'express';
import userRouter from './usuarios/user.routes.js';
import categoriaRouter from './categorias/categorias.routes.js';
import hostingRouter from './hosting/hosting.routes.js';
import supportTicketRouter from './support-ticket/support-ticket.routes.js';
import publisherRouter from './publicadores/publisher.routes.js';
import desarrolladorRouter from './desarrolladores/desarrollador.routes.js';
import juegoRouter from './juegos/juego.routes.js';

import authRouter from './auth/auth.routes.js';

import { authenticateToken } from '../middleware/auth/authToken.js';

const commonRouter = Router();

//commonRouter.use('/api/users', userRouter);
//commonRouter.use('/api/publishers', authenticateToken, publisherRouter);
commonRouter.use('/api/developers', authenticateToken, desarrolladorRouter);
//commonRouter.use('/api/categories', authenticateToken, categoriaRouter);
//commonRouter.use('/api/hostings', authenticateToken, hostingRouter);
//commonRouter.use('/api/supportTicket', authenticateToken, supportTicketRouter);
//commonRouter.use('/api/auth', authRouter);
//commonRouter.use('/api/juegos', juegoRouter);

export default commonRouter;
