// user.service.ts
import { inject, injectable } from 'inversify';
import { ISupportTicketService } from '../interfaces/support-ticket/ISupport-ticket.js';
import { SupportTicket } from '../../models/support-ticket/support-ticket.entity.js';
import { SupportTicketRepository } from '../../repositories/support-ticket/support-ticket.dao.js';

@injectable()
export class SupportTicketService implements ISupportTicketService {
  
  private _supportTicketRepository: SupportTicketRepository;

  constructor(
    @inject(SupportTicketRepository) supportTicketRepository: SupportTicketRepository,
  ) {
    this._supportTicketRepository = supportTicketRepository;
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


  async update(id: number, supportTicket: SupportTicket): Promise<SupportTicket> {

    return this._supportTicketRepository.update(id, supportTicket);
  }

  async delete(id: number): Promise<SupportTicket | undefined> {
    return this._supportTicketRepository.delete(id);
  }

}


