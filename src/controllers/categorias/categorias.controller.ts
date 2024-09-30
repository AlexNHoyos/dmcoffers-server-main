import { Request, Response, NextFunction, response } from 'express';
import { CategoriasRepository } from '../../repositories/categorias/categorias.repository.js';
import { validationResult } from 'express-validator';

const categoriasRepository = new CategoriasRepository();
export const findAll = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try {
    const categorias = await categoriasRepository.findAll();
        if (categorias.length > 0) {
      res.status(200).json(categorias);
    } else {
      res.status(404).json({ message: 'No se han encontrado categorias' });
    }
    } catch (error) {
        next(error)
    }
};

//Obtener todas las categorias
export const findOne = async (
    req: Request,
  res: Response,
  next: NextFunction
)=>{
    const id = parseInt(req.params.id, 10);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
    try {
      const categorias = await categoriasRepository.findOne(id);
      if (categorias) {
        res.status(200).json(categorias);
      } else {
        res.status(404).json({ message: 'Categoría no encontrada' });
      }
    } catch (error) {
      next(error);
    }
  };

  //Crear una categoría
  export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const newCat = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
      const createdCat = await categoriasRepository.create(newCat);
      res.status(201).json(createdCat);
    } catch (error) {
      next(error);
    }
  };

  //Actualizar una categoría
  export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = parseInt(req.params.id, 10);
    const catUpdates = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const updatedCat = await categoriasRepository.update(id, catUpdates);
      if (updatedCat) {
        res.status(200).json(updatedCat);
      } else {
        res.status(404).json({ message: 'Categoría no encontrada' });
      }
    } catch (error) {
      next(error);
    }
  };
  
  // Eliminar una categoría
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
      const deletedCategoria = await categoriasRepository.delete(id);
      if (deletedCategoria) {
        res.status(200).json(deletedCategoria);
      } else {
        res.status(404).json({ message: 'Categoría no encontrada' });
      }
    } catch (error) {
      next(error);
    }
  };
  