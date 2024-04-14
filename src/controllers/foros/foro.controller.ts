import { Request, Response, NextFunction } from 'express'
import { ForoRepository } from '../../repositories/foro.repository'
import { Foro } from '../../models/foro.entity'

const repository = new ForoRepository()

function sanitizeForoInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id: req.body.id,
        id_user: req.body.id_user,
        description: req.body.description,
        multimedia: req.body.multimedia,
        creationtimestamp: req.body.creationtimestamp,
        modificationtimestamp: req.body.modificationtimestamp
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    })
    next();
}

function findAll(req: Request, res: Response) {
    res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
    const id: number = 1;
    const foro = repository.findOne({ id });
    if (!foro) {
        return res.status(404).send({ message: 'Foro not found' })
    };
    res.json({ data: foro });
}

function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput

    const foroInput = new Foro(
        input.id,
        input.id_user,
        input.description,
        input.multimedia,
        input.creationtimestamp,
        input.modificationtimestamp
    );

    const foro = repository.add(foroInput);
    return res.status(201).send({ message: 'Foro created', data: foro });
}

function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id;
    const foro = repository.update(req.body.sanitizedInput);

    if (!foro) {
        return res.status(404).send({ message: 'Foro not found' });
    } else {
        return res.status(200).send({ message: 'Foro updated successfully' });
    }

}

function remove(req: Request, res: Response) {
    const id: number = 1;
    const foro = repository.delete({ id });

    if (!foro) {
        res.status(400).send({ message: 'Foro not found' });
    } else {
        res.status(200).send({ message: 'Foro deleted successfully' });
    }
}

export { sanitizeForoInput, findAll, findOne, add, update, remove };