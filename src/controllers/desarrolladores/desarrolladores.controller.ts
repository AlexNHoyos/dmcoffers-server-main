import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { IDesarrolladoresService } from '../../services/interfaces/desarrolladores/IDesarrolladoresService.js';
import { DesarrolladoresService } from '../../services/desarrolladores/desarrolladores.service.js';
import { inject } from 'inversify';
import { validateInputData } from '../../middleware/validation/validation-middleware.js';
import {
  createDesarrolladoresValidationRules,
  deleteDesarrolladoresValidationRules,
  getDesarrolladoresValidationRules,
  updateDesarrolladoresValidationRules,
} from '../../middleware/validation/validations-rules/desarrolladores-validations.js';

@controller('/api/developers', authenticateToken)
export class DesarrolladoresController {
  private desarrollaresService: IDesarrolladoresService;

  constructor(
    @inject(DesarrolladoresService)
    desarrollaresService: IDesarrolladoresService
  ) {
    this.desarrollaresService = desarrollaresService;
  }

  @httpGet('/')
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const desarrollador = await this.desarrollaresService.findAll();
      if (desarrollador.length > 0) {
        res.status(200).json(desarrollador);
      } else {
        res
          .status(404)
          .json({ message: 'No se han encontrado desarrolladores' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/:id', validateInputData(getDesarrolladoresValidationRules))
  // Obtener todos los publicadores de juegos
  public async findOne(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);

    try {
      const desarrollador = await this.desarrollaresService.findOne(id);
      if (desarrollador) {
        res.status(200).json(desarrollador);
      } else {
        res.status(404).json({ message: 'Desarrollador no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpPost('/', validateInputData(createDesarrolladoresValidationRules))
  public async create(req: Request, res: Response, next: NextFunction) {
    const newDev = req.body;

    try {
      const createdDev = await this.desarrollaresService.create(newDev);
      res.status(201).json(createdDev);
    } catch (error) {
      next(error);
    }
  }

  @httpPut('/:id', validateInputData(updateDesarrolladoresValidationRules))
  public async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);
    const devUpdates = req.body;

    try {
      const updatedDev = await this.desarrollaresService.update(id, devUpdates);
      if (updatedDev) {
        res.status(200).json(updatedDev);
      } else {
        res.status(404).json({ message: 'Desarrollador no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpDelete('/:id', validateInputData(deleteDesarrolladoresValidationRules))
  // Eliminar un desarrollador
  public async remove(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);

    try {
      const deletedDesarrollador = await this.desarrollaresService.delete(id);
      if (deletedDesarrollador) {
        res.status(200).json(deletedDesarrollador);
      } else {
        res.status(404).json({ message: 'Desarrollador no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }
}
