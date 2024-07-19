// IUserService.ts

import { IBaseService } from '../IBaseService';
import { User } from '../../../models/usuarios/user.entity';
import { UserViewModel } from '../../../models-view/usuarios/user-view.entity';

export interface IUserService extends IBaseService<User | UserViewModel> {
  // Métodos adicionales específicos para User, agregar cuando los haya

  findByUserName(userName: string): Promise<User | undefined>;

}
