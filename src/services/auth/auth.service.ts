// auth.service.ts
import { UserAuthRepository } from '../../repositories/usuarios/user-auth.dao.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import {verifyPassword} from '../../middleware/auth/authHash.js';
import { UserService } from '../user/user.service.js';
import { generateToken } from '../../shared/Utils/jwtUtils.js';
import { IUserService } from '../interfaces/user/IUserService.js';
import { IAuthService } from '../interfaces/auth/IAuthService.js';
import { inject, injectable } from 'inversify';
import { IPasswordService } from '../interfaces/auth/IPasswordService.js';
import { PasswordService } from './password.service.js';
import { User } from '../../models/usuarios/user.entity.js';
import { UserRolAplService } from '../user/user-rol-apl.service.js';
import { IUserRolAplService } from '../interfaces/user/IUserRolAplService.js';

@injectable()
export class AuthService implements IAuthService {
  private _userAuthRepository: UserAuthRepository;
  private _passwordService: IPasswordService;
  private _userRolAplService: IUserRolAplService;
  
  constructor(
    @inject(UserAuthRepository) userAuthRepository: UserAuthRepository,
    @inject(PasswordService) passwordService: IPasswordService,
    @inject(UserRolAplService) userRolAplService: IUserRolAplService,

  ) {
    this._userAuthRepository = userAuthRepository;
    this._passwordService = passwordService;
    this._userRolAplService = userRolAplService;
  }
 
  async login (user: User , password: string){
   
    const isValidPassword = await this._passwordService.verifyPassword(user.userauth?.password!, password);

    if (!isValidPassword) {
      throw new ValidationError('Contraseña incorrecta' );
    }

    let userRolAplList  =  (await user.userRolApl)?.map(c => c);

    let currentRol = await this._userRolAplService.SearchUserCurrentRol(userRolAplList!);

    user.currentRol = currentRol != undefined ? currentRol : await this._userRolAplService.AsignRolUser(user);

    return generateToken({ username: user.username, id: user.id, rol: user.currentRol?.description});

  }

  async findOne(id: number): Promise<UserAuth | undefined> {
    return this._userAuthRepository.findOne(id);
  }

  
}