import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { validate } from '../../middleware/validation/validation-middleware.js';
import { IPrecioService } from '../../services/interfaces/precios/IPrecioService.js';
import { PrecioService } from '../../services/juego/precios.service.js';
import {
  createPrecioValidationRules,
  deletePrecioValidationRules,
  getPrecioValidationRules,
  updatePrecioValidationRules,
} from '../../middleware/validation/validations-rules/precios-validations.js';

@controller('/api/precios', authenticateToken)
export class PrecioController {
  private precioService: IPrecioService;

  constructor(
    @inject(PrecioService)
    precioService: IPrecioService
  ) {
    this.precioService = precioService;
  }

  @httpGet('/')
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const precio = await this.precioService.findAll();
      if (precio.length > 0) {
        res.status(200).json(precio);
      } else {
        res.status(404).json({ message: 'No se han encontrado precios' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/:id_game/:valid_until_date', validate(getPrecioValidationRules))
  public async findOne(req: Request, res: Response, next: NextFunction) {
    const id_game = parseInt(req.params.id, 10);
    const valid_until_date = new Date(req.params.valid_until_date);

    try {
      const precio = await this.precioService.findOne(
        id_game,
        valid_until_date
      );
      if (precio) {
        res.status(200).json(precio);
      } else {
        res.status(404).json({ message: 'Precio no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpPost('/', validate(createPrecioValidationRules))
  public async create(req: Request, res: Response, next: NextFunction) {
    const newDev = req.body;

    try {
      const createdDev = await this.precioService.create(newDev);
      res.status(201).json(createdDev);
    } catch (error) {
      next(error);
    }
  }

  @httpPut('/:id_game/:valid_until_date', validate(updatePrecioValidationRules))
  public async update(req: Request, res: Response, next: NextFunction) {
    const id_game = parseInt(req.params.id, 10);
    const valid_until_date = new Date(req.params.valid_until_date);
    const precioUpdates = req.body;

    try {
      const updatedPrecio = await this.precioService.update(
        id_game,
        valid_until_date,
        precioUpdates
      );
      if (updatedPrecio) {
        res.status(200).json(updatedPrecio);
      } else {
        res.status(404).json({ message: 'Precio no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpDelete(
    '/:id_game/:valid_until_date',
    validate(deletePrecioValidationRules)
  )
  // Eliminar un precio
  public async remove(req: Request, res: Response, next: NextFunction) {
    const id_game = parseInt(req.params.id, 10);
    const valid_until_date = new Date(req.params.valid_until_date);

    try {
      const deletedPrecio = await this.precioService.delete(
        id_game,
        valid_until_date
      );
      if (deletedPrecio) {
        res.status(200).json(deletedPrecio);
      } else {
        res.status(404).json({ message: 'Precio no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }
}
