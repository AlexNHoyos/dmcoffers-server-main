import { Request, Response, NextFunction } from 'express';
import { SupportTicketRepository } from '../../repositories/support-ticket/support-ticket.repository';
import { validationResult } from 'express-validator';


const supportTicketRepository = new SupportTicketRepository();

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const supportTicket = await supportTicketRepository.findAll();
        if (supportTicket.length > 0) {
            res.status(200).json(supportTicket);
        } else {
            res.status(404).json({ message: 'No se han hayado tickets' });
        }
    } catch (error) {
        next(error);
    }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const supportTicket = await supportTicketRepository.findOne(id);
        if (supportTicket) {
            res.status(200).json(supportTicket);
        } else {
            res.status(404).json({ message: 'Ticket no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const newsupportTicket = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const createdSupportTicket = await supportTicketRepository.create(newsupportTicket);
        res.status(201).json(createdSupportTicket);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const supportTicketUpdates = req.body;
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const updatedSupportTicket = await supportTicketRepository.update(id, supportTicketUpdates);
        if (updatedSupportTicket) {
            res.status(200).json(updatedSupportTicket);
        } else {
            res.status(404).json({ message: 'Ticket no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const deletedSupportTicket = await supportTicketRepository.delete(id);
        if (deletedSupportTicket) {
            res.status(200).json(deletedSupportTicket);
        } else {
            res.status(404).json({ message: 'Ticket no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};
