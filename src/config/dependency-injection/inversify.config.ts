import { Container } from 'inversify';
import { UserService } from '../../services/user/user.service.js';
import { AuthService } from '../../services/auth/auth.service.js';
import { UserAuthRepository } from '../../repositories/usuarios/user-auth.dao.js';
import { AuthController } from '../../controllers/auth/auth.controller.js';
import { UserController } from '../../controllers/usuarios/user.controller.js';
import { IUserService } from '../../services/interfaces/user/IUserService.js';
import { IAuthService } from '../../services/interfaces/auth/IAuthService.js';
import { IPasswordService } from '../../services/interfaces/auth/IPasswordService.js';
import { PasswordService } from '../../services/auth/password.service.js';
import { HostingController } from '../../controllers/hosting/hosting.controller.js';
import { IHostingService } from '../../services/interfaces/hosting/IHostingService.js';
import { HostingService } from '../../services/hosting/hosting.service.js';


// Crear un nuevo contenedor de Inversify
const container = new Container();

// Controladores
container.bind<AuthController>(AuthController).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<HostingController>(HostingController).toSelf();

// Repositorios
container.bind<UserAuthRepository>(UserAuthRepository).toSelf();


// Interfaces
container.bind<IAuthService>(AuthService).to(AuthService);
container.bind<IUserService>(UserService).to(UserService);
container.bind<IPasswordService>(PasswordService).to(PasswordService);
container.bind<IHostingService>(HostingService).to(HostingService);



export { container };