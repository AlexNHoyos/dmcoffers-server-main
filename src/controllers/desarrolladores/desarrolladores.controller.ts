// pubGamePublisherController.js
import { Request, Response, NextFunction } from 'express';
import { DesarrolladoresRepository } from '../../repositories/desarrolladores/desarrolladores.repository.js';
import { validationResult } from 'express-validator';

const desarrolladorRepository = new DesarrolladoresRepository();

export const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const desarrollador = await desarrolladorRepository.findAll();
        if (desarrollador.length > 0) {
            res.status(200).json(desarrollador);
        } else {
            res.status(404).json({ message: 'No se han encontrado desarrolladores' });
        }
    } catch (error) {
        next(error);
    }
};

// Obtener todos los publicadores de juegos
export const findOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id, 10);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const desarrollador = await desarrolladorRepository.findOne(id);
        if (desarrollador) {
            res.status(200).json(desarrollador);
        } else {
            res.status(404).json({ message: 'Desarrollador no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const newDev = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const createdDev = await desarrolladorRepository.create(newDev);
        res.status(201).json(createdDev);
    } catch (error) {
        next(error);
    }
};

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id, 10);
    const devUpdates = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedDev = await desarrolladorRepository.update(id, devUpdates);
        if (updatedDev) {
            res.status(200).json(updatedDev);
        } else {
            res.status(404).json({ message: 'Desarrollador no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

// Eliminar un publicador
export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id, 10);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const deletedDesarrollador = await desarrolladorRepository.delete(id);
        if (deletedDesarrollador) {
            res.status(200).json(deletedDesarrollador);
        } else {
            res.status(404).json({ message: 'Desarrollador no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};
