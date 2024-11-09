import { Request, Response, NextFunction } from 'express';
import { SupportTicketRepository } from '../../repositories/support-ticket/support-ticket.dao.js';
import { validationResult } from 'express-validator';
import { ISupportTicketService } from '../../services/interfaces/support-ticket/ISupport-ticket.js';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { inject } from 'inversify';
import { SupportTicketService } from '../../services/support-ticket/support-ticket.service.js';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { validate } from '../../middleware/validation/validation-middleware.js';
import { createSupportTicketDescriptionValidationRules, createSupportTicketValidationRules, deleteSupportTicketValidationRules, getSupportTicketValidationRules, updateSupportTicketValidationRules } from '../../middleware/validation/validations-rules/support-ticket-validations.js';


    
@controller('/api/supportTicket', authenticateToken)
export class SupportTicketController {

    private _supportTicketService: ISupportTicketService;

    constructor(

        @inject(SupportTicketService) supportTicketService: ISupportTicketService,

    ){
        this._supportTicketService = supportTicketService;
    }

    @httpGet('/findall')
    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const supportTicket = await this._supportTicketService.findAll();
            if (supportTicket.length > 0) {
                res.status(200).json(supportTicket);
            } else {
                res.status(404).json({ message: 'No se han hayado tickets' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpGet('/:id', validate(getSupportTicketValidationRules))
    public async findOne(req: Request, res: Response, next: NextFunction) {
       
        const id = parseInt(req.params.id, 10);

        try {
            const supportTicket = await this._supportTicketService.findOne(id);
            if (supportTicket) {
                res.status(200).json(supportTicket);
            } else {
                res.status(404).json({ message: 'Ticket no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpPost('/create', validate(createSupportTicketValidationRules))
    public async create(req: Request, res: Response, next: NextFunction) {
        
        const newsupportTicket = req.body;

        try {
            const createdSupportTicket = await this._supportTicketService.create(newsupportTicket);
            res.status(201).json(createdSupportTicket);
        } catch (error) {
            next(error);
        }
    };

    @httpPut('/:id',  validate(updateSupportTicketValidationRules))
    public async update(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id, 10);
        const supportTicketUpdates = req.body;
            

        try {
            const updatedSupportTicket = await this._supportTicketService.update(id, supportTicketUpdates);
            if (updatedSupportTicket) {
                res.status(200).json(updatedSupportTicket);
            } else {
                res.status(404).json({ message: 'Ticket no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpDelete('/:id', validate(deleteSupportTicketValidationRules))    
    public async remove(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id, 10);

        try {
            const deletedSupportTicket = await this._supportTicketService.delete(id);
            if (deletedSupportTicket) {
                res.status(200).json(deletedSupportTicket);
            } else {
                res.status(404).json({ message: 'Ticket no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpPost('/createTicket/:username', validate(createSupportTicketDescriptionValidationRules))
    public async createTicket(req: Request, res: Response, next: NextFunction) {
      const username = req.params.username;  
        const newsupportTicket = req.body;

        try {
            const createdSupportTicket = await this._supportTicketService.createTicket(newsupportTicket, username);
            res.status(201).json(createdSupportTicket);
        } catch (error) {
            next(error);
        }
    };
};