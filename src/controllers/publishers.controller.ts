import { Request, Response, NextFunction } from 'express';
import { PublisherRepository } from '../repositories/publisher.repository.js';
import { Publisher } from '../models/publisher.entity.js';

const repository = new PublisherRepository();

function sanitizePublisherInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    publishername: req.body.publishername,
    foundation_date: req.body.foundation_date,
    dissolution_date: req.body.dissolution_date,
    status: req.body.status,
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
  const id = req.params.id;
  const publisher = repository.findOne({ id });
  if (!publisher) {
    return res.status(404).send({ message: 'Publisher not found' });
  }
  res.json({ data: publisher });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const publisherInput = new Publisher(
    input.id,
    input.publishername,
    input.foundation_date,
    input.dissolution_date,
    input.status,
    input.creationtimestamp,
    input.creationuser,
    input.modificationtimestamp,
    input.modificationuser
  );

  const publisher = repository.add(publisherInput);
  return res
    .status(201)
    .send({ message: 'Publisher created', data: publisher });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const publisher = repository.update(req.body.sanitizedInput);

  if (!publisher) {
    return res.status(404).send({ message: 'Publisher not found' });
  }

  return res
    .status(200)
    .send({ message: 'Publisher updated successfully', data: publisher });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const publisher = repository.delete({ id });

  if (!publisher) {
    res.status(404).send({ message: 'Publisher not found' });
  } else {
    res.status(200).send({ message: 'Publisher deleted successfully' });
  }
}

export { sanitizePublisherInput, findAll, findOne, add, update, remove };
