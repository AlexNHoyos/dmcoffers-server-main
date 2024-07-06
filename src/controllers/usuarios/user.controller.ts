import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repositories/usuarios/user.repository.js'; 

const userRepository = new UserRepository();

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userRepository.findAll();
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No se han encontrado usuarios' });
        }
    } catch (error) {
        next(error);
    }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const user = await userRepository.findOne(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    try {
        const createdUser = await userRepository.create(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userUpdates = req.body;
    try {
        const updatedUser = await userRepository.update(id, userUpdates);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const deletedUser = await userRepository.delete(id);
        if (deletedUser) {
            res.status(200).json(deletedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};
