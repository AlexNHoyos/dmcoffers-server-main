// IUserService.ts

import { IBaseService } from '../IBaseService.js';
import { User } from '../../../models/usuarios/user.entity.js';
import { UserDto } from '../../../models-dto/usuarios/user-dto.entity.js';

export interface IUserService extends IBaseService<User | UserDto> {

  findByUserName(userName: string): Promise<User | undefined>;

  updateUserByAdmin(id: number, user: User, rolToAsign?: string): Promise<User | undefined> ;

  updatePassword(id: number, newPassword:string): Promise<void>; //Nuevo

  findByResetToken(token: string): Promise<User | null>;
}
