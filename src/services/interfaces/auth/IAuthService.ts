import { IBaseService } from '../IBaseService';
import { UserAuth } from '../../../models/auth/user-auth.entity';

export interface IAuthService extends IBaseService<UserAuth> {
  // Métodos adicionales específicos para Auth, agregar cuando los haya
}
