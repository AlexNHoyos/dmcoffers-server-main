import { IBaseService } from '../IBaseService';
import { UserAuth } from '../../../models/usuarios/user-auth.entity.js';

export interface IAuthService extends IBaseService<UserAuth> {
  // Métodos adicionales específicos para Auth, agregar cuando los haya
}
