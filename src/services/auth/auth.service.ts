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

export class AuthService implements IAuthService {
  private userAuthRepository: UserAuthRepository;
  private userService: IUserService;

  constructor() {
    this.userAuthRepository = new UserAuthRepository();
    this.userService = new UserService();
  }
 
  async login (username: string , password: string){

    const user = await this.userService.findByUserName(username);

    if (!user || !user.id ) {
       throw new ValidationError('Usuario no encontrado' );
    }
    else if (!user.userauth?.password) {
      throw new ValidationError('Usuario no encontrado');
    }

    const isValidPassword = await this.verifyPassword(user.userauth?.password, password);

    if (!isValidPassword) {
      throw new ValidationError('Contraseña incorrecta' );
    }

    return generateToken({ username: user.username, id: user.id, rol: user.userRolApl?.id_rolapl});

  }

  async findOne(id: number): Promise<UserAuth | undefined> {
    return this.userAuthRepository.findOne(id);
  }

  async verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return verifyPassword(hashedPassword,password);
  }


  async validateUserAuthOnCreate(userAuth: UserAuth): Promise<UserAuth> {

  if (!userAuth.password   ) {  
       throw new ValidationError('Usuario no tiene contraseña definida', 401);
  }
  else if (!this.isRegExPassword(userAuth.password)) {
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

//  async update(id: number, user: UserAuth): Promise<UserAuth> {
//    const oldUser = await this.userAuthRepository.findOne(id);
//    if (!oldUser) {
//      throw new ValidationError('Usuario no encontrado', 400);
//   }
//
//    return this.userAuthRepository.update(id, updatedUserAuth);
//  }


  private isRegExPassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!password) {
      return false;
    }
    return passwordPattern.test(password);
  }
}