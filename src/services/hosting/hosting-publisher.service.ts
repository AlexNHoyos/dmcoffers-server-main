// user.service.ts
import { HostingRepository } from '../../repositories/hosting/hosting.dao.js';
import { Hosting } from '../../models/hosting/hosting.entity.js';
import { IHostingService } from '../interfaces/hosting/IHostingService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { inject, injectable } from 'inversify';
import { IHostingPublisherService } from '../../services/interfaces/hosting/IHostingPublisherService.js';
import { HostingPublisherRepository } from '../../repositories/hosting/hosting-publisher.dao.js';
import { HostingPublisher } from '../../models/hosting/hosting-publisher.entity.js';
import { HostingPublisherDto } from '../../models-dto/hosting-publisher/hosting-publisher-dto.entity.js';
import { HostingService } from './hosting.service.js';

@injectable()
export class HostingPublisherService implements IHostingPublisherService {

    private _hostingPublisherRepository: HostingPublisherRepository;
    constructor(
        @inject(HostingPublisherRepository) hostingPublisherRepository: HostingPublisherRepository,

    ) {
        this._hostingPublisherRepository = hostingPublisherRepository;
    }

    async findAll(): Promise<HostingPublisherDto[]> {
        const hostingPublishers = await this._hostingPublisherRepository.findAll();
        const hostingPublishersDto: HostingPublisherDto[] = await Promise.all(
            hostingPublishers.map(async (hosting) => {

                return this.convertToDto(hosting);
            })
        );
        return hostingPublishersDto;
    }

    async findOne(id: number): Promise<HostingPublisherDto | undefined> {
        return this._hostingPublisherRepository.findOne(id);
    }

    async create(newHostingPublisher: HostingPublisher): Promise<HostingPublisherDto> {

        return this._hostingPublisherRepository.create(newHostingPublisher);
    }


    async update(id: number, hostingPublisher: HostingPublisher): Promise<HostingPublisherDto> {
        return this._hostingPublisherRepository.update(id, hostingPublisher);
    }

    async delete(id: number): Promise<HostingPublisher | undefined> {
        return this._hostingPublisherRepository.delete(id);
    }

    private async convertToDto(hostingPublisher: HostingPublisher): Promise<HostingPublisherDto> {
        return {
            id: hostingPublisher.id,
            storageAmmount: hostingPublisher.storageAmmount,
            storageType: hostingPublisher.storageType,
            ramAmmount: hostingPublisher.ramAmmount,
            cpuSpecs: hostingPublisher.cpuSpecs,
            uptimePercentage: hostingPublisher.uptimePercentage,
            publisher: hostingPublisher.publisher,
            hosting: hostingPublisher.hosting
        };
    }


}


