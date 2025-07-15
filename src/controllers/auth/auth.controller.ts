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
//Nuevo de aca para abajo
  @httpPost('/forgot-password')
  public async forgotPassword(req: Request, res:Response, next:NextFunction){
    const {email} = req.body;

    try{
      //Busca el usuario por el email
      const user = await this._userService.findByUserName(email);
      if(user){
      //Genero un token aleatorio
      const crypto = await import('crypto');
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 60*60*1000);  

      user.resetPasswordToken = token;
      user.resetPasswordExpires = expires;

      if (user.id === undefined) {
        throw new ValidationError('Usuario no tiene un ID válido');
      }
      await this._userService.update(user.id, user);

      if (!user.email) {
        throw new ValidationError('Usuario no tiene un email válido');
      }
      await this._authService.sendResetPass(user.email, token);
      }

      return res.json({ message:"Si existe, se envio un correo electrónico de recuperación" });
    } catch(error){
      next(error);
    }
  }

  @httpPost('/reset-password')
  public async resetPass(req:Request, res:Response, next:NextFunction){
    const {token, newPassword} = req.body;

    try{
      const user = await this._userService.findByResetToken(token);

      if (
        !user ||
        !user.resetPasswordExpires ||
        user.resetPasswordExpires < new Date()
      ) {
        throw new ValidationError('Token invalido o expirado');
      }

      if (user.id === undefined) {
        throw new ValidationError('Usuario no tiene un ID válido');
      }
      await this._userService.updatePassword(user.id, newPassword);

      user.resetPasswordExpires = undefined;
      user.resetPasswordToken = undefined;

      await this._userService.update(user.id,user);

      return res.json({ message: 'Contraseña actualizada correctamente'});
    } catch(error) {
      next(error);
    }
  }
}