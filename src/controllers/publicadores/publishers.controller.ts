// pubGamePublisherController.js
import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IPublisherService } from '../../services/interfaces/publisher/IPublisherService.js';
import { PublisherService } from '../../services/publisher/publisher.service.js';
import { validate } from '../../middleware/validation/validation-middleware.js';
import { createPublisherValidationRules, deletePublisherValidationRules, getPublisherValidationRules, updatePublisherValidationRules } from '../../middleware/validation/validations-rules/publisher-validations.js';


@controller('/api/publishers', authenticateToken)
export class PublisherController {

  private publisherService: IPublisherService;

  constructor(
    @inject(PublisherService) publisherService: IPublisherService,
  ) 
  {
    this.publisherService = publisherService;
  }


  @httpGet('/')
  public async findAll( req: Request, res: Response, next: NextFunction) {
    
    try {
      const publishers = await this.publisherService.findAll();
      if (publishers.length > 0) {
        res.status(200).json(publishers);
      } else {
        res.status(404).json({ message: 'No se han encontrado publishers' });
      }
    } catch (error) {
      next(error);
    }
  };


  @httpGet('/:id', validate(getPublisherValidationRules))
  public async findOne(req: Request, res: Response, next: NextFunction) {
    
    const id = parseInt(req.params.id, 10);

    try {
      const publisher = await this.publisherService.findOne(id);
      if (publisher) {
        res.status(200).json(publisher);
      } else {
        res.status(404).json({ message: 'Publisher no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  };


  @httpPost('/create', validate(createPublisherValidationRules))
  public async create(req: Request, res: Response, next: NextFunction) {
    
    const newPub = req.body;

    try {
      const createdPub = await this.publisherService.create(newPub);
      res.status(201).json(createdPub);
    } catch (error) {
      next(error);
    }
  };


  @httpPut('/:id',  validate(updatePublisherValidationRules))
  public async update(req: Request, res: Response,  next: NextFunction) {

    const id = parseInt(req.params.id, 10);
    const pubUpdates = req.body;


    try {
      const updatedPub = await this.publisherService.update(id, pubUpdates);
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
  @httpDelete('/:id', validate(deletePublisherValidationRules))    
  public async remove(req: Request, res: Response, next: NextFunction) {
    
    const id = parseInt(req.params.id, 10);

    try {
      const deletedPublisher = await this.publisherService.delete(id);
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
