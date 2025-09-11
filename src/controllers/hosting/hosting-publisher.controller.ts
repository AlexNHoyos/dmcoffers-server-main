import { Request, Response, NextFunction } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { inject } from 'inversify';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { validateInputData } from '../../middleware/validation/validation-middleware.js';
import { createHostingPublisherValidationRules, deleteHostingPublisherValidationRules, getHostingPublisherValidationRules, updateHostingPublisherValidationRules } from '../../middleware/validation/validations-rules/hosting-publisher-validations.js';
import { IHostingPublisherService } from '../../services/interfaces/hosting/IHostingPublisherService.js';
import { HostingPublisherService } from '../../services/hosting/hosting-publisher.service.js';


@controller('/api/hostingPublisher', authenticateToken)
export class HostingPublisherController {
    private _hostingPublisherService: IHostingPublisherService;

    constructor(
        @inject(HostingPublisherService) hostingPublisherService: IHostingPublisherService,
    ) {
        this._hostingPublisherService = hostingPublisherService;
    }

    @httpGet('/findall')
    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const hostingspublisher = await this._hostingPublisherService.findAll();
            if (hostingspublisher.length > 0) {

                res.status(200).json(hostingspublisher);
            } else {
                res.status(404).json({ message: 'No se ha encontrado ninguna especificacion para hostings' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpGet('/:id', validateInputData(getHostingPublisherValidationRules))
    public async findOne(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id, 10);
        try {
            const hostingspublisher = await this._hostingPublisherService.findOne(id);
            if (hostingspublisher) {
                res.status(200).json(hostingspublisher);
            } else {
                res.status(404).json({ message: 'No se han encontrado las especificaciones del hosting indicado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpPost('/create', validateInputData(createHostingPublisherValidationRules))
    public async create(req: Request, res: Response, next: NextFunction) {
        const newHostingspublisher = req.body;

        try {
            const createdHosting = await this._hostingPublisherService.create(newHostingspublisher);
            res.status(201).json(createdHosting);
        } catch (error) {
            next(error);
        }
    };

    @httpPut('/:id', validateInputData(updateHostingPublisherValidationRules))
    public async update(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id, 10);
        const hostingPublisherUpdates = req.body;

        try {
            const updatedHostingPublisher = await this._hostingPublisherService.update(id, hostingPublisherUpdates);
            if (updatedHostingPublisher) {
                res.status(200).json(updatedHostingPublisher);
            } else {
                res.status(404).json({ message: 'Especificaciones de hosting no encontradas' });
            }
        } catch (error) {
            next(error);
        }
    };


    @httpDelete('/:id', validateInputData(deleteHostingPublisherValidationRules))
    public async remove(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id, 10);
        try {
            const deletedHostingPublisher = await this._hostingPublisherService.delete(id);
            if (deletedHostingPublisher) {
                res.status(200).json(deletedHostingPublisher);
            } else {
                res.status(404).json({ message: 'Especificaciones de hosting no encontradas' });
            }
        } catch (error) {
            next(error);
        }
    };

}
