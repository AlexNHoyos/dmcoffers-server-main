// IUserService.ts

import { IService } from '../IService.interface';
import { User } from '../../../models/usuarios/user.entity';

export interface IUserService extends IService<User> {
  // Métodos adicionales específicos para User, agregar cuando los haya
}
