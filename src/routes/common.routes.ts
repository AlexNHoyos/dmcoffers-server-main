import { Router } from 'express';
import userRouter from './usuarios/user.routes.js';
import categoriaRouter from './categorias/categorias.routes.js';
import hostingRouter from './hosting/hosting.routes.js';
import supportTicketRouter from './support-ticket/support-ticket.routes.js';
import publisherRouter from './publicadores/publisher.routes.js';
import desarrolladorRouter from './desarrolladores/desarrollador.routes.js';
import authRouter from './auth/auth.routes.js';
import { authenticateToken } from '../middleware/auth/authToken.js';

const commonRouter = Router();

commonRouter.use('/api/users', authenticateToken, userRouter);
commonRouter.use('/api/publishers', publisherRouter);
commonRouter.use('/api/developers', desarrolladorRouter);
commonRouter.use('/api/categories', categoriaRouter);
commonRouter.use('/api/hostings', hostingRouter);
commonRouter.use('/api/supportTicket', supportTicketRouter);
commonRouter.use('/api/auth', authRouter);

export default commonRouter;
