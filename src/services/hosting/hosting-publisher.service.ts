// user.service.ts
import { HostingRepository } from '../../repositories/hosting/hosting.dao.js';
import { Hosting } from '../../models/hosting/hosting.entity.js';
import { IHostingService } from '../interfaces/hosting/IHostingService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { inject, injectable } from 'inversify';
import { IHostingPublisherService } from '../../services/interfaces/hosting/IHostingPublisherService.js';
import { HostingPublisherRepository } from '../../repositories/hosting/hosting-publisher.repository.js';
import { HostingPublisher } from '../../models/hosting/hosting-publisher.entity.js';

@injectable()
export class HostingPublisherService implements IHostingPublisherService {

    private _hostingPublisherRepository: HostingPublisherRepository;

    constructor(
        @inject(HostingPublisherRepository) hostingPublisherRepository: HostingPublisherRepository,
    ) {
        this._hostingPublisherRepository = hostingPublisherRepository;
    }


    async findAll(): Promise<HostingPublisher[]> {
        return this._hostingPublisherRepository.findAll();
    }

    async findOne(id: number): Promise<HostingPublisher | undefined> {
        return this._hostingPublisherRepository.findOne(id);
    }

    async create(newHostingPublisher: HostingPublisher): Promise<HostingPublisher> {

        return this._hostingPublisherRepository.create(newHostingPublisher);
    }


    async update(id: number, hostingPublisher: HostingPublisher): Promise<HostingPublisher> {

        return this._hostingPublisherRepository.update(id, hostingPublisher);
    }

    async delete(id: number): Promise<HostingPublisher | undefined> {
        return this._hostingPublisherRepository.delete(id);
    }

}


