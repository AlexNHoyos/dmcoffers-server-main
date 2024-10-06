// src/controllers/auth.controller.ts
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../services/auth/auth.service.js'; 
import { validationResult } from 'express-validator';


const authService = new AuthService();

export const login = async (req: Request, res: Response, next: NextFunction) => {

  const { username, password } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    let accessToken = await authService.login(username, password)

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

