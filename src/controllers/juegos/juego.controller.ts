import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { JuegoService } from '../../services/juego/juego.service.js';

const juegoService = new JuegoService();

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const juegos = await juegoService.findAll();
    console.log(juegos);
    if (juegos.length > 0) {
      res.status(200).json(juegos);
    } else {
      res.status(404).json({ message: 'No se han hayado juegos' });
    }
  } catch (error) {
    next(error);
  }
};

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
    const juego = await juegoService.findOne(id);
    if (juego) {
      res.status(200).json(juego);
    } else {
      res.status(404).json({ message: 'juego no encontrado' });
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
  const newJuego = req.body;
  console.log(newJuego);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const createdJuego = await juegoService.create(newJuego);
    res.status(201).json(createdJuego);
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
  const juegoUpdates = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedJuego = await juegoService.update(id, juegoUpdates);
    if (updatedJuego) {
      res.status(200).json(updatedJuego);
    } else {
      res.status(404).json({ message: 'Juego no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

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
    const deletedJuego = await juegoService.delete(id);
    if (deletedJuego) {
      res.status(200).json(deletedJuego);
    } else {
      res.status(404).json({ message: 'Juego no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};
