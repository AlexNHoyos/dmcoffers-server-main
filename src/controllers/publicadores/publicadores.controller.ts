// pubGamePublisherController.js
import { Request, Response, NextFunction } from 'express';
import { PublisherRepository } from '../../repositories/publicadores/publisher.repository.js';

const publisherRepository = new PublisherRepository();

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const publishers = await publisherRepository.findAll();
    if (publishers.length > 0) {
      res.status(200).json(publishers);
    } else {
      res.status(404).json({ message: 'No se han encontrado publishers' });
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
  const id = req.params.id;
  try {
    const publisher = await publisherRepository.findOne(id);
    if (publisher) {
      res.status(200).json(publisher);
    } else {
      res.status(404).json({ message: 'Publisher no encontrado' });
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
  const newPub = req.body;
  try {
    const createdPub = await publisherRepository.create(newPub);
    res.status(201).json(createdPub);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const pubUpdates = req.body;
  try {
    const updatedPub = await publisherRepository.update(id, pubUpdates);
    if (updatedPub) {
      res.status(200).json(updatedPub);
    } else {
      res.status(404).json({ message: 'Publisher no encontrado' });
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
  const id = req.params.id;
  try {
    const deletedPublisher = await publisherRepository.delete(id);
    if (deletedPublisher) {
      res.status(200).json(deletedPublisher);
    } else {
      res.status(404).json({ message: 'Publisher no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};