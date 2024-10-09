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
import { SupportTicketController } from '../../controllers/support-ticket/support-ticket.controller.js';
import { SupportTicketService } from '../../services/support-ticket/support-ticket.service.js';
import { ISupportTicketService } from '../../services/interfaces/support-ticket/ISupport-ticket.js';
import { IPublisherService } from '../../services/interfaces/publisher/IPublisherService.js';
import { PublisherService } from '../../services/publisher/publisher.service.js';
import { PublisherController } from '../../controllers/publicadores/publishers.controller.js';
import { PublisherRepository } from '../../repositories/publicadores/publisher.dao.js';
import { CategoriasController } from '../../controllers/categorias/categorias.controller.js';
import { ICategoriasService } from '../../services/interfaces/categorias/ICategoriasService.js';
import { CategoriasService } from '../../services/categorias/categorias.service.js';
import { CategoriasRepository } from '../../repositories/categorias/categorias.dao.js';


// Crear un nuevo contenedor de Inversify
const container = new Container({ defaultScope: "Singleton" });

// Controladores
container.bind<AuthController>(AuthController).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<HostingController>(HostingController).toSelf();
container.bind<SupportTicketController>(SupportTicketController).toSelf();
container.bind<PublisherController>(PublisherController).toSelf();
container.bind<CategoriasController>(CategoriasController).toSelf();

// Repositorios
container.bind<UserAuthRepository>(UserAuthRepository).toSelf();
container.bind<PublisherRepository>(PublisherRepository).toSelf();
container.bind<CategoriasRepository>(CategoriasRepository).toSelf();

// Interfaces
container.bind<IAuthService>(AuthService).to(AuthService);
container.bind<IUserService>(UserService).to(UserService);
container.bind<IPasswordService>(PasswordService).to(PasswordService);
container.bind<IHostingService>(HostingService).to(HostingService);
container.bind<ISupportTicketService>(SupportTicketService).to(SupportTicketService);
container.bind<IPublisherService>(PublisherService).to(PublisherService);
container.bind<ICategoriasService>(CategoriasService).to(CategoriasService);


export { container };