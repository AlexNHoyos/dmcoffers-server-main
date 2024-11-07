import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { secretKeyJWT } from '../../shared/Utils/Keys.js';

const secretKey = process.env.SECRET_KEY || secretKeyJWT;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err || !decoded) {
      res.sendStatus(403);
      return;
    }
    if (typeof decoded === 'object' && 'id' in decoded) {
      //(req as any).user = { id: (decoded as { id: number }).id };
      res.locals.userId = (decoded as { id: number }).id;
      next();
    } else {
      res.status(403).json({ message: 'Invalid token payload' });
    }
  });
};
