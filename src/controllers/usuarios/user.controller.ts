import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repositories/usuarios/user.repository';
import { User } from '../../models/usuarios/user.entity';

const repository = new UserRepository();

function sanitizeUserInput(
    req: Request,
    res: Response,
    next: NextFunction
) {
    req.body.sanitizedInput = {
        id: req.body.id,
        realname: req.body.realname,
        surname: req.body.surname,
        username: req.body.username,
        birth_date: req.body.birth_date,
        creationuser: req.body.creationuser,
        creationtimestamp: req.body.creationtimestamp,
        modificationuser: req.body.modificationuser,
        modificationtimestamp: req.body.modificationtimestamp,
        state: req.body.state,
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}

function findAll(req: Request, res: Response) {
    res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
    const id = req.params.id;
    const user = repository.findOne({ id });
    if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.json({ data: user });
}

function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;

    const userInput = new User(
        input.id,
        input.realname,
        input.surname,
        input.username,
        input.birth_date,
        input.creationuser,
        input.creationtimestamp,
        input.modificationuser,
        input.modificationtimestamp,
        input.state
    );

    const user = repository.add(userInput);
    return res
        .status(201)
        .send({ message: 'Usuario creado', data: user });
}

function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id;
    const user = repository.update(req.body.sanitizedInput);

    if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    return res
        .status(200)
        .send({ message: 'Usuario actualizado exitosamente', data: user });
}

function remove(req: Request, res: Response) {
    const id = req.params.id;
    const user = repository.delete({ id });

    if (!user) {
        res.status(404).send({ message: 'Usuario no encontrado' });
    } else {
        res.status(200).send({ message: 'Usuario eliminado exitosamente' });
    }
}

export { sanitizeUserInput, findAll, findOne, add, update, remove };