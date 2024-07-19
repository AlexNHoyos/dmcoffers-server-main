// user.service.ts
import { UserRepository } from '../../repositories/usuarios/user.repository';
import { User } from '../../models/usuarios/user.entity';
import { UserAuth } from '../../models/auth/user-auth.entity';
import { IUserService } from '../interfaces/user/IUserService';
import { ValidationError } from '../../middleware/errorHandler/validationError';
import { AuthService } from '../auth/auth.service';
import { UserAuthRepository } from '../../repositories/usuarios/user-auth.repository';
import { AuthenticationError } from '../../middleware/errorHandler/authenticationError';

export class UserService implements IUserService {
  private authService: AuthService = new AuthService;
  private userRepository: UserRepository;
  private userAuthRepository: UserAuthRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.userAuthRepository = new UserAuthRepository();
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async create(newUser: UserAuth): Promise<UserAuth> {

    if (!newUser || !newUser.username) {
      throw new ValidationError('Usuario no posee userName', 404);
   }
    const userExisted = await this.findByUserName(newUser.username);

    if (userExisted) {
      throw new AuthenticationError('El Usuario ya existe', 404);
    }
    newUser.creationtimestamp = new Date();

    const userAuthValidated = await this.authService.validateUserAuthOnCreate(newUser);

    const userCreated = await this.userRepository.create(newUser); 
    
    const userAuthCreated = await this.userAuthRepository.create(userAuthValidated);
        
    
      
    return userCreated;
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

  async findByUserName(userName: string):  Promise<User | undefined> {
    return this.userRepository.findByUserName(userName);
  }
}
