import { User } from '../../models/usuarios/user.entity';

export interface IUserService {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | undefined>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<User | undefined>;
}
