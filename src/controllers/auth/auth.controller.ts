// src/controllers/auth.controller.ts
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../services/user/user.service.js'; 
import { AuthService } from '../../services/auth/auth.service.js'; 
import { IUserService } from '../../services/interfaces/user/IUserService.js';
import { generateToken } from '../../shared/Utils/jwtUtils.js';
import { validationResult } from 'express-validator';

const userService: IUserService = new UserService();
const authService = new AuthService();

export const login = async (req: Request, res: Response, next: NextFunction) => {

  const { username, password } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  

  try {
    const user = await userService.findByUserName(username);
    if (!user || !user.id ) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    
    const authUser = await authService.findOne(user.userauth?.id!);


    if (!authUser) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isValidPassword = await authService.verifyPassword(authUser.password, password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const accessToken = generateToken({ username: user.username, id: user.id});

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

