// user.service.ts
import { injectable } from 'inversify';
import { ISupportTicketService } from '../interfaces/support-ticket/ISupport-ticket.js';
import { SupportTicket } from '../../models/support-ticket/support-ticket.entity.js';
import { SupportTicketRepository } from '../../repositories/support-ticket/support-ticket.dao.js';

@injectable()
export class SupportTicketService implements ISupportTicketService {
  
  private supportTicketRepository: SupportTicketRepository;

  constructor() {
    this.supportTicketRepository = new SupportTicketRepository();
  }


  async findAll(): Promise<SupportTicket[]> {
    return this.supportTicketRepository.findAll();
  }

  async findOne(id: number): Promise<SupportTicket | undefined> {
    return this.supportTicketRepository.findOne(id);
  }

  async create(newSupportTicket: SupportTicket): Promise<SupportTicket> {

   return this.supportTicketRepository.create(newSupportTicket);
  }


  async update(id: number, supportTicket: SupportTicket): Promise<SupportTicket> {

    return this.supportTicketRepository.update(id, supportTicket);
  }

  async delete(id: number): Promise<SupportTicket | undefined> {
    return this.supportTicketRepository.delete(id);
  }

}


