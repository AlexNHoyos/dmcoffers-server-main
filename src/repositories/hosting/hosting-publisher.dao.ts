import { Repository } from 'typeorm';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumHostingPublisher } from '../../middleware/errorHandler/constants/errorConstants.js';
import { AppDataSource } from '../../config/pg-database/db.js';
import { injectable } from 'inversify';
import { HostingPublisher } from '../../models/hosting/hosting-publisher.entity.js';

@injectable()
export class HostingPublisherRepository implements IBaseRepository<HostingPublisher> {
    private repository: Repository<HostingPublisher>;

    constructor() {
        this.repository = AppDataSource.getRepository(HostingPublisher);
    }

    async findAll(): Promise<HostingPublisher[]> {
        try {
            return await this.repository.find({
                relations: ['publisher', 'hosting'],
                order: {
                    id: 'ASC', // Ordena por id ascendente
                },
            });
        } catch (error) {
            console.error(errorEnumHostingPublisher.hostingPublisherNotFounded, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherNotFounded, 500);
        }
    }

    async findOne(id: number): Promise<HostingPublisher | undefined> {
        try {
            const hostingpublisher = await this.repository.findOneBy({ id });
            return hostingpublisher ?? undefined;
        } catch (error) {
            console.error(errorEnumHostingPublisher.hostingPublisherIndicatedNotFound, error);
            throw new DatabaseErrorCustom(
                errorEnumHostingPublisher.hostingPublisherIndicatedNotFound,
                500
            );
        }
    }

    async create(hostingpublisher: HostingPublisher): Promise<HostingPublisher> {
        try {
            return await this.repository.save(hostingpublisher);
        } catch (error) {
            console.error(errorEnumHostingPublisher.hostingPublisherNotCreated, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherNotCreated, 500);
        }
    }

    async update(id: number, hostingpublisher: HostingPublisher): Promise<HostingPublisher> {
        try {
            const existingHosting = await this.repository.findOneBy({ id });
            if (!existingHosting) {
                throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherIndicatedNotFound, 404);
            }
            await this.repository.update(id, hostingpublisher);
            return this.repository.findOneOrFail({ where: { id } }); // Retorna la entidad actualizada
        } catch (error) {
            console.error(errorEnumHostingPublisher.hostingPublisherNotUpdated, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherNotUpdated, 500);
        }
    }

    async delete(id: number): Promise<HostingPublisher | undefined> {
        try {
            const hostingpublisher = await this.repository.findOneBy({ id });
            if (!hostingpublisher) {
                throw new DatabaseErrorCustom(
                    errorEnumHostingPublisher.hostingPublisherIndicatedNotFound,
                    404
                );
            }
            await this.repository.remove(hostingpublisher);
            return hostingpublisher;
        } catch (error) {
            console.error(errorEnumHostingPublisher.hostingPublisherNotDeleted, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherNotDeleted, 500);
        }
    }
}
