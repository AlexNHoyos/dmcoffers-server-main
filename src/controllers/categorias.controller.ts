import { Request, Response, NextFunction } from 'express';
import { CategoriasRepository } from '../repositories/categorias.repository.js';
import { Categorias } from '../models/categorias.entity.js';

const repository = new CategoriasRepository();

function sanitizeJuegoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    gamename: req.body.gamename,
    id_publisher: req.body.id_publisher,
    id_developer: req.body.id_developer,
    release_date: req.body.release_date,
    publishment_date: req.body.publishment_date,
    creationtimestamp: req.body.creationtimestamp,
    creationuser: req.body.creationuser,
    modificationtimestamp: req.body.modificationtimestamp,
    modificationuser: req.body.modificationuser,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const juego = repository.findOne({ id: id.toString() });
  if (!juego) {
    return res.status(404).send({ message: 'Juego not found' });
  }
  res.json({ data: juego });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const juegoInput = new Juego(
    input.id,
    input.gamename,
    input.id_publisher,
    input.id_developer,
    input.release_date,
    input.publishment_date,
    input.creationtimestamp,
    input.creationuser,
    input.modificationtimestamp,
    input.modificationuser
  );

  const juego = repository.add(juegoInput);
  return res.status(201).send({ message: 'Juego created', data: Juego });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const juego = repository.update(req.body.sanitizedInput);

  if (!juego) {
    return res.status(404).send({ message: 'Juego not found' });
  }

  return res
    .status(200)
    .send({ message: 'Juego updated successfully', data: juego });
}

function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const juego = repository.delete({ id: id.toString() });

  if (!juego) {
    res.status(404).send({ message: 'Juego not found' });
  } else {
    res.status(200).send({ message: 'Juego deleted successfully' });
  }
}

export { sanitizeJuegoInput, findAll, findOne, add, update, remove };