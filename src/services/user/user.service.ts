// user.service.ts
import { UserRepository } from '../../repositories/usuarios/user.dao.js';
import { User } from '../../models/usuarios/user.entity.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';
import { IUserService } from '../interfaces/user/IUserService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { AuthService } from '../auth/auth.service.js';
import { UserAuthRepository } from '../../repositories/usuarios/user-auth.repository.js';
import { AuthenticationError } from '../../middleware/errorHandler/authenticationError.js';
import { UserDto } from '../../models-dto/usuarios/user-dto.entity.js';

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

  async create(newUser: UserDto): Promise<UserDto> {

    if (!newUser || !newUser.username) {
      throw new ValidationError('Usuario no posee userName', 404);
    }
    const userExisted = await this.findByUserName(newUser.username);

    if (userExisted) {
      throw new AuthenticationError('El Usuario ya existe', 404);
    }


    const userToCreate = await this.initializeUser(newUser);

    const userCreated = await this.userRepository.registerUser(userToCreate);
           
    const userOutput : UserDto = {
      idUser: userCreated.id,
      idUserAuth: userCreated.userauth?.id,
      realname: userCreated.realname,
      surname: userCreated.surname,
      username: userCreated.username,
      birth_date: userCreated.birth_date,
      creationuser: userCreated.creationuser,
      creationtimestamp: userCreated.creationtimestamp,
      password: userCreated.userauth?.password,
      status: userCreated.status,
      delete_date: userCreated.delete_date,
      modificationuser: undefined,
      modificationtimestamp: undefined,
    }
      
 
    return userOutput;
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
      modificationtimestamp: user.modificationtimestamp ?? new Date(), // Fecha de modificación actual
  };

    return this.userRepository.update(id, updatedUser);
  }

  async delete(id: number): Promise<User | undefined> {
    return this.userRepository.delete(id);
  }

  async findByUserName(userName: string):  Promise<User | undefined> {
    return this.userRepository.findByUserName(userName);
  }


  private async initializeUser(newUser: UserDto) {

    newUser.creationtimestamp = new Date();

    const userToValidate: UserAuth = new UserAuth(
      newUser.password!,
      newUser.creationuser!,
      newUser.creationtimestamp,

    );

    const userAuthValidated = await this.authService.validateUserAuthOnCreate(userToValidate);

    const userToCreate: User = new User ();
      userToCreate.id= undefined;
      userToCreate.realname= newUser.realname;
      userToCreate.surname= newUser.surname;
      userToCreate.username= newUser.username;
      userToCreate.birth_date= newUser.birth_date;
      userToCreate.delete_date= newUser.delete_date;
      userToCreate.status= newUser.status;
      userToCreate.creationuser= newUser.creationuser;
      userToCreate.creationtimestamp= newUser.creationtimestamp;
      userToCreate.modificationuser= newUser.modificationuser;
      userToCreate.modificationtimestamp= newUser.modificationtimestamp;
      userToCreate.userauth= userAuthValidated?? undefined;
  
    
    
    return userToCreate;

  }
}
