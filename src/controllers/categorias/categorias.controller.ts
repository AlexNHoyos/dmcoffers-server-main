import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../../middleware/auth/authToken';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { CategoriasService } from '../../services/categorias/categorias.service.js';
import { ICategoriasService } from '../../services/interfaces/categorias/ICategoriasService.js';
import { inject } from 'inversify';
import { validateInputData } from '../../middleware/validation/validation-middleware.js';
import { createCategoriesValidationRules, deleteCategoriesValidationRules, getCategoriesValidationRules, updateCategoriesValidationRules } from '../../middleware/validation/validations-rules/categorias-validations.js';


@controller('/api/categories', authenticateToken)
export class CategoriasController {
  
  private _categoriasService: ICategoriasService;

  constructor(
    @inject(CategoriasService) categoriasService: ICategoriasService,
  ) 
  {
    this._categoriasService = categoriasService;
  }

  
  @httpGet('/')
  public async findAll(req: Request, res: Response, next: NextFunction) {
    
    try {
      const categorias = await this._categoriasService.findAll();
      if (categorias.length > 0) {
        res.status(200).json(categorias);
      } else {
        res.status(404).json({ message: 'No se han encontrado categorias' });
      }
    } catch (error) {
      next(error);
    }

  };


  @httpGet('/:id', validateInputData(getCategoriesValidationRules))
  public async findOne(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);

    try {
      const categoria = await this._categoriasService.findOne(id);
      if (categoria) {
        res.status(200).json(categoria);
      } else {
        res.status(404).json({ message: 'Categoria no encontrado' });
      }
    } catch (error) {
      next(error);
    }

  };


  @httpPost('/create', validateInputData(createCategoriesValidationRules))
  public async create(req: Request, res: Response,  next: NextFunction) {
    const newCat = req.body;

    try {
      const createdCat = await this._categoriasService.create(newCat);
      res.status(201).json(createdCat);
    } catch (error) {
      next(error);
    }

  };


  @httpPut('/:id',  validateInputData(updateCategoriesValidationRules))
  public async update(req: Request, res: Response, next: NextFunction) {
   
    const id = parseInt(req.params.id, 10);   
    const catUpdate = req.body;

    try {
      const updatedCat = await this._categoriasService.update(id, catUpdate);
      if (updatedCat) {
        res.status(200).json(updatedCat);
      } else {
        res.status(404).json({ message: 'Categoria no encontrada' });
      }
    } catch (error) {
      next(error);
    }

  };

  
  @httpDelete('/:id', validateInputData(deleteCategoriesValidationRules))  
  public async remove(req: Request, res: Response, next: NextFunction) {
    
    const id = parseInt(req.params.id, 10);

    try {
      const deletedCategory = await this._categoriasService.delete(id);
      if (deletedCategory) {
        res.status(200).json(deletedCategory);
      } else {
        res.status(404).json({ message: 'Categoria no encontrada' });
      }
    } catch (error) {
      next(error);
    }

  };

};
