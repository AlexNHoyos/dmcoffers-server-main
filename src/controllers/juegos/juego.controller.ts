import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { JuegoService } from '../../services/juego/juego.service.js';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { inject } from 'inversify';
import { IJuegoService } from '../../services/interfaces/juego/IJuegoService.js';
import { validate } from '../../middleware/validation/validation-middleware.js';
import { createJuegoValidationRules, deleteJuegoValidationRules, getJuegoValidationRules, updateJuegoValidationRules } from '../../middleware/validation/validations-rules/juego-validations.js';


@controller('/api/juegos', authenticateToken)
export class JuegoController{

  private juegoService : IJuegoService;

  constructor(
    @inject(JuegoService) juegoService : IJuegoService
  ){
    this.juegoService = juegoService;
  }

  @httpGet('/')
  public async findAll (req: Request, res: Response, next: NextFunction) {
    try {
      const juegos = await this.juegoService.findAll();
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

  @httpGet('/:id',  validate(getJuegoValidationRules))
  public async findOne( req: Request, res: Response, next: NextFunction ) {
    const id = parseInt(req.params.id, 10);

    try {
      const juego = await this.juegoService.findOne(id);
      if (juego) {
        res.status(200).json(juego);
      } else {
        res.status(404).json({ message: 'juego no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  };

  @httpPost('/', validate(createJuegoValidationRules))
  public async create( req: Request, res: Response, next: NextFunction ) {
    const newJuego = req.body;

    try {
      const createdJuego = await this.juegoService.create(newJuego);
      res.status(201).json(createdJuego);
    } catch (error) {
      next(error);
    }
  };

  @httpPut('/:id', validate(updateJuegoValidationRules))
  public async update(req: Request, res: Response,  next: NextFunction ) {
    
    const id = parseInt(req.params.id, 10);
    const juegoUpdates = req.body;
 
    try {
      const updatedJuego = await this.juegoService.update(id, juegoUpdates);
      if (updatedJuego) {
        res.status(200).json(updatedJuego);
      } else {
        res.status(404).json({ message: 'Juego no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  };
  
  @httpDelete('/:id', validate(deleteJuegoValidationRules))
  public async remove(req: Request, res: Response, next: NextFunction )  {
    const id = parseInt(req.params.id, 10);
 
    try {
      const deletedJuego = await this.juegoService.delete(id);
      if (deletedJuego) {
        res.status(200).json(deletedJuego);
      } else {
        res.status(404).json({ message: 'Juego no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  };

}