// user.service.ts
import { UserRepository } from '../../repositories/usuarios/user.repository';
import { User } from '../../models/usuarios/user.entity';
import { IUserService } from '../interfaces/user.service.interface';
import { ValidationError } from '../../middleware/errorHandler/authenticationError';

export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async update(id: number, user: User): Promise<User> {
    const oldUser = await this.userRepository.findOne(id);
    if (!oldUser) {
      throw new ValidationError('Usuario no encontrado', 400);
   }

    const updatedUser: User = {
      id: oldUser.id, 
      realname: user.realname ?? oldUser.realname,
      surname: user.surname ?? oldUser.surname,
      username: user.username ?? oldUser.username,
      birth_date: user.birth_date ?? oldUser.birth_date,
      delete_date: user.delete_date ?? oldUser.delete_date,
      status: user.status ?? oldUser.status,
      creationuser: oldUser.creationuser, // No debe cambiar en la actualización
      creationtimestamp: oldUser.creationtimestamp, // No debe cambiar en la actualización
      modificationuser: user.modificationuser ?? oldUser?.modificationuser,
      modificationtimestamp: user.modificationtimestamp ?? new Date() // Fecha de modificación actual
  };

    return this.userRepository.update(id, updatedUser);
  }

  async delete(id: number): Promise<User | undefined> {
    return this.userRepository.delete(id);
  }
}
