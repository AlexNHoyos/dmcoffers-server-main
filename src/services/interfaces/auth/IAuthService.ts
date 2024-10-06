import { IBaseService } from '../IBaseService.js';
import { UserAuth } from '../../../models/usuarios/user-auth.entity.js';

export interface IAuthService {
  
  login(user: string, password: string): Promise <string>;

  validateUserAuthOnCreate(userAuth: UserAuth): Promise<UserAuth>
}
