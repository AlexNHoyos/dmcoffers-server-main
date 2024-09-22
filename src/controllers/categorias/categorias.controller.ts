import { Request, Response, NextFunction, response } from 'express';
import { CategoriasRepository } from '../../repositories/categorias/categorias.repository.js';
import { Categorias } from '../../models/categorias/categorias.entity.js';

const repository = new CategoriasRepository();

function sanitizeCategoriaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    descripcion: req.body.descripcion,
    creationtimestamp: req.body.creationtimestamp,
    creationuser: req.body.creationuser,
    modificationtimestamp: req.body.modificationtimestamp,
    modificationuser: req.body.modificationuser,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

function findAll(req: Request, res: Response) {
  const categorias = repository.findAll();
  res.json(categorias);
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const categoria = repository.findOne({ id });

  if (!categoria) {
    return res.status(404).send({ message: 'Categoria No Eencontrada' });
  }
  res.json(categoria);
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const categoriaInput = new Categorias(
    input.id,
    input.descripcion,
    input.creationtimestamp,
    input.creationuser,
    input.modificationtimestamp,
    input.modificationuser
  );

  const categoria = repository.add(categoriaInput);
  return res.status(201).send({ message: 'Categoria creada', data: categoria });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const categoria = repository.update(req.body.sanitizedInput);

  if (!categoria) {
    return res.status(404).send({ message: 'Categoria No Encontrado' });
  } else {
    return res
      .status(200)
      .send({ message: 'Categoria Actualizada Correctamente' });
  }
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const categoria = repository.delete({ id });

  if (!categoria) {
    res.status(400).send({ message: 'Categoria No Encontrada' });
  } else {
    res.status(200).send({ message: 'Categoria Eliminada Exitosamente' });
  }
}

export { sanitizeCategoriaInput, findAll, findOne, add, update, remove };
