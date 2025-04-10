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
import { HostingRepository } from '../../repositories/hosting/hosting.dao.js';
import { IUserRolAplService } from '../../services/interfaces/user/IUserRolAplService.js';
import { UserRolAplService } from '../../services/user/user-rol-apl.service.js';
import { UserRepository } from '../../repositories/usuarios/user.dao.js';
import { SupportTicketRepository } from '../../repositories/support-ticket/support-ticket.dao.js';
import { UserRolRepository } from '../../repositories/usuarios/user-rol-apl.dao.js';

import { JuegoRepository } from '../../repositories/juego/juego.dao.js';
import { JuegoController } from '../../controllers/juegos/juego.controller.js';
import { IJuegoService } from '../../services/interfaces/juego/IJuegoService.js';
import { JuegoService } from '../../services/juego/juego.service.js';
import { DesarrolladoresRepository } from '../../repositories/desarrolladores/desarrolladores.dao.js';
import { IDesarrolladoresService } from '../../services/interfaces/desarrolladores/IDesarrolladoresService.js';
import { DesarrolladoresService } from '../../services/desarrolladores/desarrolladores.service.js';
import { DesarrolladoresController } from '../../controllers/desarrolladores/desarrolladores.controller.js';
import { PrecioController } from '../../controllers/precios/precios.controller.js';
import { PrecioRepository } from '../../repositories/juego/precios.dao.js';
import { PrecioService } from '../../services/juego/precios.service.js';
import { IPrecioService } from '../../services/interfaces/precios/IPrecioService.js';
import { WishlistRepository } from '../../repositories/juego/whislist.dao.js';
import { WishlistService } from '../../services/juego/wishlist.service.js';
import { IWishlistService } from '../../services/interfaces/wishlist/IWishlistService.js';
import { RolAplRepository } from '../../repositories/rol/rol-apl.dao.js';
import { SweItemMenuController } from '../../controllers/sweitemmenu/sweitemmenu.controller.js';
import { SideMenuRepository } from '../../repositories/sweitemmenu/sweitemmenu.repository.js';
import { ISweItemMenuService } from '../../services/interfaces/sweitemmenu/ISweItemMenu.js';
import { SweItemMenuService } from '../../services/sweitemmenu/sweitemmenu.service.js';

// Crear un nuevo contenedor de Inversify
const container = new Container({ defaultScope: 'Singleton' });

// Controladores
container.bind<AuthController>(AuthController).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<HostingController>(HostingController).toSelf();
container.bind<SupportTicketController>(SupportTicketController).toSelf();
container.bind<PublisherController>(PublisherController).toSelf();
container.bind<CategoriasController>(CategoriasController).toSelf();
container.bind<JuegoController>(JuegoController).toSelf();
container.bind<DesarrolladoresController>(DesarrolladoresController).toSelf();
container.bind<PrecioController>(PrecioController).toSelf();
container.bind<SweItemMenuController>(SweItemMenuController).toSelf();

// Repositorios
container.bind<UserAuthRepository>(UserAuthRepository).toSelf();
container.bind<PublisherRepository>(PublisherRepository).toSelf();
container.bind<CategoriasRepository>(CategoriasRepository).toSelf();
container.bind<HostingRepository>(HostingRepository).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<SupportTicketRepository>(SupportTicketRepository).toSelf();
container.bind<UserRolRepository>(UserRolRepository).toSelf();
container.bind<JuegoRepository>(JuegoRepository).toSelf();
container.bind<DesarrolladoresRepository>(DesarrolladoresRepository).toSelf();
container.bind<PrecioRepository>(PrecioRepository).toSelf();
container.bind<WishlistRepository>(WishlistRepository).toSelf();
container.bind<RolAplRepository>(RolAplRepository).toSelf();
container.bind<SideMenuRepository>(SideMenuRepository).toSelf();

// Interfaces
container.bind<IAuthService>(AuthService).to(AuthService);
container.bind<IUserService>(UserService).to(UserService);
container.bind<IPasswordService>(PasswordService).to(PasswordService);
container.bind<IHostingService>(HostingService).to(HostingService);
container
  .bind<ISupportTicketService>(SupportTicketService)
  .to(SupportTicketService);
container.bind<IPublisherService>(PublisherService).to(PublisherService);
container.bind<ICategoriasService>(CategoriasService).to(CategoriasService);
container.bind<IUserRolAplService>(UserRolAplService).to(UserRolAplService);
container.bind<IJuegoService>(JuegoService).to(JuegoService);
container
  .bind<IDesarrolladoresService>(DesarrolladoresService)
  .to(DesarrolladoresService);
container.bind<IPrecioService>(PrecioService).to(PrecioService);
container.bind<IWishlistService>(WishlistService).to(WishlistService);
container.bind<ISweItemMenuService>(SweItemMenuService).to(SweItemMenuService);
export { container };
