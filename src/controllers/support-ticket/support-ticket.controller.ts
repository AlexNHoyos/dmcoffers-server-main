import { Request, Response, NextFunction } from 'express';
import { SupportTicketRepository } from '../../repositories/support-ticket/support-ticket.repository.js';


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
    const id = req.params.id;
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
    try {
        const createdSupportTicket = await supportTicketRepository.create(newsupportTicket);
        res.status(201).json(createdSupportTicket);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const supportTicketUpdates = req.body;
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
    const id = req.params.id;
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
