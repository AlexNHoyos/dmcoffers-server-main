import { Router } from 'express';
import * as userController from '../../controllers/usuarios/user.controller.js';


const userRouter = Router();

userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

export default userRouter;
