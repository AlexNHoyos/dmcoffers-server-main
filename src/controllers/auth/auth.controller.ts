// src/controllers/auth.controller.ts
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../services/auth/auth.service.js'; 

import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { inject, injectable, LazyServiceIdentifer } from 'inversify';
import { IAuthService } from '../../services/interfaces/auth/IAuthService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { UserService } from '../../services/user/user.service.js';
import { IUserService } from '../../services/interfaces/user/IUserService.js';
import { validate } from '../../middleware/validation/validation-middleware.js';
import { loginValidationRules } from '../../middleware/validation/validations-rules/auth-validations.js';

@controller('/api/auth')
export class AuthController {

  private authService: IAuthService;
  private userService: IUserService;

  constructor(
    @inject(AuthService) authService: IAuthService,
    @inject(UserService) userService: IUserService,
  ) 
  {
    this.authService = authService;
    this.userService = userService;
  }

  @httpPost('/login',validate(loginValidationRules))
  public async login(req: Request, res: Response, next: NextFunction) {
    
    const { username, password } = req.body;

    try {
      const user = await this.userService.findByUserName(username);

      if (!user || !user.id ) {
         throw new ValidationError('Usuario no encontrado' );
      }
      else if (!user.userauth?.password) {
        throw new ValidationError('Usuario no encontrado');
      }
      const accessToken = await this.authService.login(user, password);
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}