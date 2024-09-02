import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HostingService } from '../../services/hosting/hosting.service.js'; 

const hostingService = new HostingService();

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hostings = await hostingService.findAll();
        if (hostings.length > 0) {
            res.status(200).json(hostings);
        } else {
            res.status(404).json({ message: 'No se han hayado hostings' });
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
        const hosting = await hostingService.findOne(id);
        if (hosting) {
            res.status(200).json(hosting);
        } else {
            res.status(404).json({ message: 'Hosting no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
    const newHosting = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const createdHosting = await hostingService.create(newHosting);
        res.status(201).json(createdHosting);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const hostingUpdates = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const updatedHosting = await hostingService.update(id, hostingUpdates);
        if (updatedHosting) {
            res.status(200).json(updatedHosting);
        } else {
            res.status(404).json({ message: 'Hosting no encontrado' });
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
        const deletedHosting = await hostingService.delete(id);
        if (deletedHosting) {
            res.status(200).json(deletedHosting);
        } else {
            res.status(404).json({ message: 'Hosting no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};
