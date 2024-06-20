import { Request, Response, NextFunction } from 'express';
import { HostingRepository } from '../../repositories/hosting/hosting.repository.js'; 

const hostingRepository = new HostingRepository();

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hostings = await hostingRepository.findAll();
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
    const id = req.params.id;
    try {
        const hosting = await hostingRepository.findOne(id);
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
    try {
        const createdHosting = await hostingRepository.create(newHosting);
        res.status(201).json(createdHosting);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const hostingUpdates = req.body;
    try {
        const updatedHosting = await hostingRepository.update(id, hostingUpdates);
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
    const id = req.params.id;
    try {
        const deletedHosting = await hostingRepository.delete(id);
        if (deletedHosting) {
            res.status(200).json(deletedHosting);
        } else {
            res.status(404).json({ message: 'Hosting no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};
