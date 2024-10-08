// auth.service.ts
import { UserAuthRepository } from '../../repositories/usuarios/user-auth.dao.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';
import { hashPassword }  from '../../middleware/auth/authHash.js'
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import {verifyPassword} from '../../middleware/auth/authHash.js';
import { UserService } from '../user/user.service.js';
import { generateToken } from '../../shared/Utils/jwtUtils.js';
import { IUserService } from '../interfaces/user/IUserService.js';
import { IAuthService } from '../interfaces/auth/IAuthService.js';
import { inject, injectable, LazyServiceIdentifer } from 'inversify';
import { IPasswordService } from '../interfaces/auth/IPasswordService.js';
import { PasswordService } from './password.service.js';
import { User } from '../../models/usuarios/user.entity.js';

@injectable()
export class AuthService implements IAuthService {
  private userAuthRepository: UserAuthRepository;
  private passwordService: IPasswordService
  
  constructor(
    @inject(UserAuthRepository) userAuthRepository: UserAuthRepository,
    @inject(PasswordService) passwordService: IPasswordService,

  ) {
    this.userAuthRepository = userAuthRepository;
    this.passwordService = passwordService;
  }
 
  async login (user: User , password: string){
   
    const isValidPassword = await this.passwordService.verifyPassword(user.userauth?.password!, password);

    if (!isValidPassword) {
      throw new ValidationError('Contraseña incorrecta' );
    }

    return generateToken({ username: user.username, id: user.id, rol: user.userRolApl?.id_rolapl});

  }

  async findOne(id: number): Promise<UserAuth | undefined> {
    return this.userAuthRepository.findOne(id);
  }



  async validateUserAuthOnCreate(userAuth: UserAuth): Promise<UserAuth> {

  if (!userAuth.password   ) {  
       throw new ValidationError('Usuario no tiene contraseña definida', 401);
  }
  else if (!this.passwordService.validatePassword(userAuth.password)) {
    throw new ValidationError('Usuario no tiene contraseña valida', 401)
  }
    userAuth.password = await hashPassword(userAuth.password);
   
    const validatedUserAuth : UserAuth = new UserAuth( 
      userAuth.password,
      userAuth.creationuser,
      userAuth.creationtimestamp,

    );  
    
    return validatedUserAuth;
  }
  
}