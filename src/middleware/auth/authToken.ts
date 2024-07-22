import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretKeyJWT } from '../../shared/Utils/Keys.js';


const secretKey = process.env.SECRET_KEY || secretKeyJWT;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    (req as any).user = user;
    next();
  });
};
