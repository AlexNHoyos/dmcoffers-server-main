import { UserService } from '../../services/user/user.service.js';
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository.js';
import request from 'supertest';
import { createApp } from '../../app.js';
import { IPasswordService } from '../../services/interfaces/auth/IPasswordService.js';
import { IUserRolAplService } from '../../services/interfaces/user/IUserRolAplService.js';
import { User } from '../../models/usuarios/user.entity.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';
import { UserDto } from '../../models-dto/usuarios/user-dto.entity.js';
import { AuthCryptography } from '../../middleware/auth/authCryptography.js';
import { Container } from 'inversify';
import { UserController } from '../../controllers/usuarios/user.controller.js';
import { UserRepository } from '../../repositories/usuarios/user.dao.js';
import { PasswordService } from '../../services/auth/password.service.js';
import { UserRolAplService } from '../../services/user/user-rol-apl.service.js';
import { userRolIdCons } from '../../shared/constants/general-constants.js';

// Importar controladores explícitamente
import '../../controllers/usuarios/user.controller.js';

class MockUserRepository extends UserRepository {
  create = jest.fn();
  findByUsername = jest.fn();
  findByUserName = jest.fn();
  registerUser = jest.fn();
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  delete = jest.fn();
}

const mockUserRepository = new MockUserRepository();

const mockPasswordService = {
  validatePassword: jest.fn(),
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
} as jest.Mocked<IPasswordService>;

const mockUserRolAplService = {
  SearchUserCurrentRol: jest.fn(),
  AsignRolUser: jest.fn().mockResolvedValue({
    id: 1,
    description: 'public',
    creationuser: 'testUser',
    creationtimestamp: new Date(),
    modificationuser: undefined,
    modificationtimestamp: undefined,
    status: true,
  }),
  _userRolRepository: jest.fn(), // Mocking the missing property
  _rolAplRepository: jest.fn(), // Mocking the missing property
} as unknown as UserRolAplService;

describe('User Service - Integration Tests', () => {
  let app: any;
  let userService: UserService;
  const authCryptography = new AuthCryptography();
  const container = new Container();

  beforeAll(() => {
    container.bind(UserService).to(UserService);
    container.bind(UserRepository).toConstantValue(mockUserRepository);
    container.bind(PasswordService).toConstantValue(mockPasswordService);
    container.bind(UserRolAplService).toConstantValue(mockUserRolAplService);
    container.bind(UserController).to(UserController);

    console.log('Container bindings:', container['_bindingDictionary']);
    console.log('Resolved UserController:', container.get(UserController));

    userService = container.get(UserService);
    app = createApp(container);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Debería registrar un usuario correctamente (usando mock)', async () => {
    const password = 'TestPasswrd123';
    const creationuser = 'UsuarioTest';
    const creationtimestamp = new Date();
    const status = true;

    const newUserAuth: UserAuth = new UserAuth(
      password,
      creationuser,
      creationtimestamp
    );

    const newUser: User = {
      id: 1,
      username: 'testUser',
      realname: 'Test',
      surname: 'User',
      birth_date: new Date(),
      creationuser,
      creationtimestamp,
      status,
      delete_date: undefined,
      modificationuser: undefined,
      modificationtimestamp: undefined,
      userauth: newUserAuth,
    };

    const encryptedPassword = authCryptography.encrypt(password);
    console.log('Encrypted password:', encryptedPassword);

    const newUserDto: UserDto = {
      idUser: undefined,
      rolDesc: undefined,
      username: 'testUser',
      realname: 'Test',
      surname: 'User',
      birth_date: new Date(),
      creationuser,
      creationtimestamp,
      password: encryptedPassword,
      status,
      delete_date: undefined,
      modificationuser: undefined,
      modificationtimestamp: undefined,
    };

    mockUserRepository.findByUserName.mockResolvedValue(undefined); // Simulando que no existe el usuario
    mockPasswordService.validatePassword.mockReturnValue(Promise.resolve(true));
    mockPasswordService.hashPassword.mockResolvedValue('hashedPassword');
    mockUserRepository.registerUser.mockResolvedValue(newUser);

    const response = await request(app)
      .post('/api/users/register')
      .send(newUserDto);

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(newUser.username);

    expect(mockUserRepository.registerUser).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.registerUser).toHaveBeenCalledWith(
      expect.objectContaining({
        username: newUser.username,
        realname: newUser.realname,
        surname: newUser.surname,
        birth_date: expect.any(Date),
        creationuser,
        creationtimestamp: expect.any(Date),
        status,
      })
    );
  });
});