import { IBaseService } from '../IBaseService.js';
import { SupportTicket} from '../../../models/support-ticket/support-ticket.entity.js';

export interface ISupportTicketService extends IBaseService<SupportTicket> {
  // Métodos adicionales específicos para Auth, agregar cuando los haya
}
