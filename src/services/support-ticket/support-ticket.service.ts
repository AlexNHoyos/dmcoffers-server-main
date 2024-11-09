// user.service.ts
import { inject, injectable } from 'inversify';
import { ISupportTicketService } from '../interfaces/support-ticket/ISupport-ticket.js';
import { SupportTicket } from '../../models/support-ticket/support-ticket.entity.js';
import { SupportTicketRepository } from '../../repositories/support-ticket/support-ticket.dao.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { UserController } from '../../controllers/usuarios/user.controller.js';
import { UserRepository } from '../../repositories/usuarios/user.dao.js';
import { IUserService } from '../interfaces/user/IUserService.js';
import { UserService } from '../user/user.service.js';
import { AuthenticationError } from '../../middleware/errorHandler/authenticationError.js';


@injectable()
export class SupportTicketService implements ISupportTicketService {
  private _supportTicketRepository: SupportTicketRepository;
  private _userService: IUserService ;

  constructor(
    @inject(SupportTicketRepository) supportTicketRepository: SupportTicketRepository,
    @inject(UserService) userservice: IUserService,


  ) {
    this._supportTicketRepository = supportTicketRepository;
    this._userService = userservice;
  }


  async findAll(): Promise<SupportTicket[]> {
    return this._supportTicketRepository.findAll();
  }

  async findOne(id: number): Promise<SupportTicket | undefined> {
    return this._supportTicketRepository.findOne(id);
  }

  async create(newSupportTicket: SupportTicket): Promise<SupportTicket> {

   return this._supportTicketRepository.create(newSupportTicket);
  }

  //crear ticket tabla intermedia
  async createTicket(newSupportTicket: SupportTicket, userName: string): Promise<SupportTicket> {
    const userLog = await this._userService.findByUserName(userName);

    if (!userLog) {
      throw new AuthenticationError('El Usuario no fue encontrado', 404);
    }

    return this._supportTicketRepository.create(newSupportTicket);
  }

  async update(id: number, supportTicket: SupportTicket): Promise<SupportTicket> {

    return this._supportTicketRepository.update(id, supportTicket);
  }

  async delete(id: number): Promise<SupportTicket | undefined> {
    return this._supportTicketRepository.delete(id);
  }

}


