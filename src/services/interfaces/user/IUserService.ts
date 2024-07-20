// IUserService.ts

import { IBaseService } from '../IBaseService';
import { User } from '../../../models/usuarios/user.entity';
import { UserDto } from '../../../models-dto/usuarios/user-dto.entity';

export interface IUserService extends IBaseService<User | UserDto> {
  // Métodos adicionales específicos para User, agregar cuando los haya

  findByUserName(userName: string): Promise<User | undefined>;

}
