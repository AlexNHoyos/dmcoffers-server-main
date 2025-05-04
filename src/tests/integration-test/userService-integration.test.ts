import { UserService } from '../../services/user/user.service.js';
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository.js';
import request from 'supertest';
import app from '../../app.js';
import { IPasswordService } from '../../services/interfaces/auth/IPasswordService.js';
import { IUserRolAplService } from '../../services/interfaces/user/IUserRolAplService.js';
import { User } from '../../models/usuarios/user.entity.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';
import { UserDto } from '../../models-dto/usuarios/user-dto.entity.js';
import { AuthCryptography } from '../../middleware/auth/authCryptography.js';

const mockUserRepository: jest.Mocked<IUserRepository> = {
  create: jest.fn(),
  findByUsername: jest.fn(),
  findByUserName: jest.fn(),
  registerUser: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as jest.Mocked<IUserRepository>;

const mockPasswordService = {
  validatePassword: jest.fn(),
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
} as jest.Mocked<IPasswordService>;

const mockUserRolAplService = {
  SearchUserCurrentRol: jest.fn(),
  AsignRolUser: jest.fn(),
} as jest.Mocked<IUserRolAplService>;

describe('User Service - Integration Tests', () => {
  let userService: UserService;
  const authCryptography = new AuthCryptography();

  beforeAll(() => {
    userService = new UserService(mockUserRepository, mockPasswordService, mockUserRolAplService);
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
    console.log('Encrypted password:', encryptedPassword); // Agregar log para depuración

    const newUserDto: UserDto = {
      idUser: undefined,
      rolDesc: undefined,
      username: 'testUser',
      realname: 'Test',
      surname: 'User',
      birth_date: new Date(),
      creationuser,
      creationtimestamp,
      password: encryptedPassword, // Usar contraseña cifrada
      status,
      delete_date: undefined,
      modificationuser: undefined,
      modificationtimestamp: undefined,
    };

    // Configurar mocks
    mockPasswordService.hashPassword.mockResolvedValue('hashedPassword');
    mockUserRepository.create.mockResolvedValue(newUser);

    const response = await request(app)
      .post('/api/users/register')
      .send(newUserDto);

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(newUser.username);

    expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      username: newUser.username,
      realname: newUser.realname,
      surname: newUser.surname,
      birth_date: expect.any(Date),
      creationuser,
      creationtimestamp: expect.any(Date),
      status,
    }));
  });
});