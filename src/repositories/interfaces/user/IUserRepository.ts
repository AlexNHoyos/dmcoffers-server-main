
import { User } from '../../../models/usuarios/user.entity';
import { IBaseRepository } from '../IBaseRepository';

export interface IUserRepository extends IBaseRepository<User> {
    findByUserName(userName: string): Promise<User | undefined>;
  }
  