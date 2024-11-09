import { IBaseService } from '../IBaseService.js';
import { SupportTicket} from '../../../models/support-ticket/support-ticket.entity.js';

export interface ISupportTicketService extends IBaseService<SupportTicket | SupportTicket> {
    createTicket(newsupportTicket: SupportTicket, username: string): Promise<SupportTicket>;
    
}
