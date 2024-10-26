// user.service.ts
import { UserRepository } from '../../repositories/usuarios/user.dao.js';
import { User } from '../../models/usuarios/user.entity.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';
import { IUserService } from '../interfaces/user/IUserService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { AuthenticationError } from '../../middleware/errorHandler/authenticationError.js';
import { UserDto } from '../../models-dto/usuarios/user-dto.entity.js';
import { inject, injectable, LazyServiceIdentifer } from 'inversify';
import { IPasswordService } from '../interfaces/auth/IPasswordService.js';
import { PasswordService } from '../auth/password.service.js';
import { UserRolApl } from '../../models/usuarios/user-rol-apl.entity.js';
import { userRolIdCons } from '../../shared/constants/general-constants.js';
import { UserRolAplService } from './user-rol-apl.service.js';
import { IUserRolAplService } from '../interfaces/user/IUserRolAplService.js';

@injectable()
export class UserService implements IUserService {
  private _userRepository: UserRepository;
  private _passwordService: IPasswordService;
  private _userRolAplService: IUserRolAplService;

  constructor(
    @inject(UserRepository) userRepository: UserRepository,
    @inject(PasswordService) passwordService: IPasswordService,
    @inject(UserRolAplService) userRolAplService: IUserRolAplService,
  ) {
    this._userRepository = userRepository;
    this._passwordService = passwordService;
    this._userRolAplService = userRolAplService;

  }

  async findAll(): Promise<User[]> {
    return this._userRepository.findAll();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this._userRepository.findOne(id);
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

    

    const userCreated = await this._userRepository.registerUser(userToCreate);

    const rolAsigned = await this._userRolAplService.AsignRolUser(userCreated);
             
    const userOutput : UserDto = {
      idUser: userCreated.id,
      rolDesc: rolAsigned?.description,
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
    const oldUser = await this._userRepository.findOne(id);
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

    return this._userRepository.update(id, updatedUser);
  }

  async delete(id: number): Promise<User | undefined> {
    return this._userRepository.delete(id);
  }

  async findByUserName(userName: string):  Promise<User | undefined> {
    return this._userRepository.findByUserName(userName);
  }


  private async initializeUser(newUser: UserDto) {

    newUser.creationtimestamp = new Date();

    newUser.password = await this._passwordService.validatePassword(newUser.password!)
                        ? await this._passwordService.hashPassword(newUser.password!)
                        : (() => { throw new ValidationError('La Contraseña es inválida'); })();


    const newUserAuth: UserAuth = new UserAuth(
      newUser.password!,
      newUser.creationuser!,
      newUser.creationtimestamp,

    );


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
      userToCreate.userauth= newUserAuth;
        
    return userToCreate;

  }
}
