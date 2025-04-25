import { UserService } from "../../services/user/user.service";
import "reflect-metadata";

const mockUserRepository = {
    findByUserName : jest.fn(),
};

//Datos simulados
const mockUser = {
    id: 1,
    realname: 'Alex',
    surname: 'Hoyos',
    username: 'alexhoyos',
    birth_date: new Date('1990-01-01'),
    creationuser: 'admin',
    creationtimestamp: new Date(),
    status: true,
    delete_date: null,
    userauth: { password: 'hashedPassword' },
    userRolApl: [{ id: 1, rolId: 1 }],
  };

  const mockPasswordService = {
    validatePassword: jest.fn(),
    hashPassword: jest.fn(),
  };
  
  const mockUserRolAplService = {
    SearchUserCurrentRol: jest.fn(),
    AsignRolUser: jest.fn(),
  };

  const userService = new UserService (
    mockUserRepository as any,
    mockPasswordService as any,
    mockUserRolAplService as any
  );


describe('UserService - userNameAlredyExist', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Debería devolver algún user con ese username', async () => {
        mockUserRepository.findByUserName.mockResolvedValue('alexhoyos');

        const result = await mockUserRepository.findByUserName('alexhoyos');

        expect(result).toBe(mockUser);
        expect(result).toHaveBeenCalledWith('alexhoyos');
    });

    it('Debería devolver undefined si no encuentra ningún user con ese username', async () => {
        mockUserRepository.findByUserName.mockResolvedValue(undefined);

        const result = await mockUserRepository.findByUserName(undefined);

        expect(result).toBeUndefined();
        expect(mockUserRepository.findByUserName).toHaveBeenCalledWith(undefined);
    });
});