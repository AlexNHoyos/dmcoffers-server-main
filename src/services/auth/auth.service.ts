// auth.service.ts
import { UserAuthRepository } from '../../repositories/usuarios/user-auth.repository';
import { UserAuth } from '../../models/auth/user-auth.entity';
import { hashPassword }  from '../../middleware/auth/authHash'
import { ValidationError } from '../../middleware/errorHandler/validationError';

export class AuthService  {
  private userAuthRepository: UserAuthRepository;

  constructor() {
    this.userAuthRepository = new UserAuthRepository();
  }
 

  async validateUserAuthOnCreate(userAuth: UserAuth): Promise<UserAuth> {

  if (!userAuth.password  || !userAuth.salt ) {  
       throw new ValidationError('Usuario no tiene contraseña definida', 401);
  }
  else if (!this.isRegExPassword(userAuth.password)) {
    throw new ValidationError('Usuario no tiene contraseña valida', 401)
  }
    userAuth.password = await hashPassword(userAuth.password);
    userAuth.salt = await hashPassword(userAuth.salt)


    const validatedUserAuth = new UserAuth(
      userAuth.username!,
      userAuth.creationuser!,
      userAuth.status!,
      userAuth.password,
      userAuth.salt
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


  isRegExPassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!password) {
      return false;
    }
    return passwordPattern.test(password);
}
}