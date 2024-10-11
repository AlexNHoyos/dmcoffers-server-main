import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HostingService } from '../../services/hosting/hosting.service.js'; 
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { IHostingService } from '../../services/interfaces/hosting/IHostingService.js';
import { inject } from 'inversify';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { validate } from '../../middleware/validation/validation-middleware.js';
import { createHostingValidationRules, deleteHostingValidationRules, getHostingValidationRules, updateHostingValidationRules } from '../../middleware/validation/validations-rules/hosting-validations.js';


@controller('/api/hostings', authenticateToken)
export class HostingController {
  private hostingService: IHostingService;

  constructor(
    @inject(HostingService) hostingService: IHostingService,
  ) 
  {
    this.hostingService = hostingService;
  }

    @httpGet('/findall')
    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const hostings = await this.hostingService.findAll();
            if (hostings.length > 0) {
                res.status(200).json(hostings);
            } else {
                res.status(404).json({ message: 'No se han hayado hostings' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpGet('/:id', validate(getHostingValidationRules))
    public async findOne(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id, 10);
        try {
            const hosting = await this.hostingService.findOne(id);
            if (hosting) {
                res.status(200).json(hosting);
            } else {
                res.status(404).json({ message: 'Hosting no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpPost('/create', validate(createHostingValidationRules))
    public async create(req: Request, res: Response, next: NextFunction){
        const newHosting = req.body;

        try {
            const createdHosting = await this.hostingService.create(newHosting);
            res.status(201).json(createdHosting);
        } catch (error) {
            next(error);
        }
    };

    @httpPut('/:id',  validate(updateHostingValidationRules))
    public async update(req: Request, res: Response, next: NextFunction){
        const id = parseInt(req.params.id, 10);
        const hostingUpdates = req.body;
        
        try {
            const updatedHosting = await this.hostingService.update(id, hostingUpdates);
            if (updatedHosting) {
                res.status(200).json(updatedHosting);
            } else {
                res.status(404).json({ message: 'Hosting no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };


    @httpDelete('/:id', validate(deleteHostingValidationRules))    
    public async remove(req: Request, res: Response, next: NextFunction){
        const id = parseInt(req.params.id, 10);
        try {
            const deletedHosting = await this.hostingService.delete(id);
            if (deletedHosting) {
                res.status(200).json(deletedHosting);
            } else {
                res.status(404).json({ message: 'Hosting no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

}
