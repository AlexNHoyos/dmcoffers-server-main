import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { UserService } from '../../services/user/user.service';
import { IUserService } from '../../services/interfaces/user/IUserService.Interface';

const userService: IUserService = new UserService();

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.findAll();
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
    const id = parseInt(req.params.id, 10);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await userService.findOne(id);
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const createdUser = await userService.create(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const userUpdates = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedUser = await userService.update(id, userUpdates);
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
    const id = parseInt(req.params.id, 10);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const deletedUser = await userService.delete(id);
        if (deletedUser) {
            res.status(200).json(deletedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};
