// IUserService.ts

import { IBaseService } from '../IBaseService';
import { User } from '../../../models/usuarios/user.entity';

export interface IUserService extends IBaseService<User> {
  // Métodos adicionales específicos para User, agregar cuando los haya

  findByUserName(userName: string): Promise<User | undefined>;

}
