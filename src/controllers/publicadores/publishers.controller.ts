// pubGamePublisherController.js
import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IPublisherService } from '../../services/interfaces/publisher/IPublisherService.js';
import { PublisherService } from '../../services/publisher/publisher.service.js';
import { validateInputData } from '../../middleware/validation/validation-middleware.js';
import { createPublisherValidationRules, deletePublisherValidationRules, getPublisherValidationRules, updatePublisherValidationRules } from '../../middleware/validation/validations-rules/publisher-validations.js';


@controller('/api/publishers', authenticateToken)
export class PublisherController {

  private _publisherService: IPublisherService;

  constructor(
    @inject(PublisherService) publisherService: IPublisherService,
  ) 
  {
    this._publisherService = publisherService;
  }


  @httpGet('/')
  public async findAll( req: Request, res: Response, next: NextFunction) {
    
    try {
      const publishers = await this._publisherService.findAll();
      if (publishers.length > 0) {
        res.status(200).json(publishers);
      } else {
        res.status(404).json({ message: 'No se han encontrado publishers' });
      }
    } catch (error) {
      next(error);
    }
  };


  @httpGet('/:id', validateInputData(getPublisherValidationRules))
  public async findOne(req: Request, res: Response, next: NextFunction) {
    
    const id = parseInt(req.params.id, 10);

    try {
      const publisher = await this._publisherService.findOne(id);
      if (publisher) {
        res.status(200).json(publisher);
      } else {
        res.status(404).json({ message: 'Publisher no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  };


  @httpPost('/create', validateInputData(createPublisherValidationRules))
  public async create(req: Request, res: Response, next: NextFunction) {
    
    const newPub = req.body;

    try {
      const createdPub = await this._publisherService.create(newPub);
      res.status(201).json(createdPub);
    } catch (error) {
      next(error);
    }
  };


  @httpPut('/:id',  validateInputData(updatePublisherValidationRules))
  public async update(req: Request, res: Response,  next: NextFunction) {

    const id = parseInt(req.params.id, 10);
    const pubUpdates = req.body;


    try {
      const updatedPub = await this._publisherService.update(id, pubUpdates);
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
  @httpDelete('/:id', validateInputData(deletePublisherValidationRules))    
  public async remove(req: Request, res: Response, next: NextFunction) {
    
    const id = parseInt(req.params.id, 10);

    try {
      const deletedPublisher = await this._publisherService.delete(id);
      if (deletedPublisher) {
        res.status(200).json(deletedPublisher);
      } else {
        res.status(404).json({ message: 'Publisher no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  };
};
