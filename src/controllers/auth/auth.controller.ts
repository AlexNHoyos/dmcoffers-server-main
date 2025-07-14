// src/controllers/auth.controller.ts
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../services/auth/auth.service.js'; 

import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { inject} from 'inversify';
import { IAuthService } from '../../services/interfaces/auth/IAuthService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { UserService } from '../../services/user/user.service.js';
import { IUserService } from '../../services/interfaces/user/IUserService.js';
import { validateInputData } from '../../middleware/validation/validation-middleware.js';
import { loginValidationRules } from '../../middleware/validation/validations-rules/auth-validations.js';

@controller('/api/auth')
export class AuthController {

  private _authService: IAuthService;
  private _userService: IUserService;

  constructor(
    @inject(AuthService) authService: IAuthService,
    @inject(UserService) userService: IUserService,
  ) 
  {
    this._authService = authService;
    this._userService = userService;
  }

  @httpPost('/login',validateInputData(loginValidationRules))
  public async login(req: Request, res: Response, next: NextFunction) {
    
    const { username, password } = req.body;

    try {
      const user = await this._userService.findByUserName(username);

      if (!user || !user.id ) {
         throw new ValidationError('Usuario no encontrado' );
      }
      else if (!user.userauth?.password) {
        throw new ValidationError('Usuario no encontrado');
      }
      const accessToken = await this._authService.login(user, password);
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  @httpPost('/forgot-password')
  public async forgotPassword(req: Request, res:Response, next:NextFunction){
    const {email} = req.body;

    try{
      //Busca el usuario por el email
      const user = await this._userService.findByUserName(email);
      if(!user){
        return res.json({ message: 'Si existe se envía un correo de recuperación'});
      }

      //Genero un token aleatorio
      const crypto = await import('crypto');
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 60*60*1000);
    

    }
  }
}