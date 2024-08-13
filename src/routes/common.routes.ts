import { Router } from 'express';
import userRouter from './usuarios/user.routes.js';
import { categoriaRouter } from './categorias/categorias.routes.js';
import hostingRouter from './hosting/hosting.routes.js';
import supportTicketRouter from './support-ticket/support-ticket.routes.js';
import publisherRouter from './publicadores/publisher.routes.js';
import authRouter from './auth/auth.routes.js';
import { authenticateToken } from '../middleware/auth/authToken.js';

const commonRouter = Router();

commonRouter.use('/api/users', userRouter);
commonRouter.use('/api/publishers', authenticateToken, publisherRouter);
commonRouter.use('/api/categories', categoriaRouter);
commonRouter.use('/api/hostings', authenticateToken, hostingRouter);
commonRouter.use('/api/supportTicket', authenticateToken, supportTicketRouter);
commonRouter.use('/api/auth', authRouter);

export default commonRouter;
