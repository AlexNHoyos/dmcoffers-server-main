import { Repository } from 'typeorm';
import { Publisher } from '../../models/publicadores/publisher.entity.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumPublisher } from '../../middleware/errorHandler/constants/errorConstants.js';
import { AppDataSource } from '../../shared/pg-database/db.js';

export class PublisherRepository implements IBaseRepository<Publisher> {
  private repository: Repository<Publisher>;

  constructor() {
    this.repository = AppDataSource.getRepository(Publisher);
  }

  async findAll(): Promise<Publisher[]> {
    try {
      return await this.repository.find();
    } catch (error) {
        console.error(errorEnumPublisher.publishersNotFounded, error);
        throw new DatabaseErrorCustom(errorEnumPublisher.publishersNotFounded, 500);
    }
  }

  async findOne(id: number): Promise<Publisher | undefined> {
    try {
        const publisher = await this.repository.findOneBy({ id });
        return publisher?? undefined;
    } catch (error) {
        console.error(errorEnumPublisher.publisherIndicatedNotFound, error);
        throw new DatabaseErrorCustom(errorEnumPublisher.publisherIndicatedNotFound, 500);
    }
  }

  async create(publisher: Publisher): Promise<Publisher> {
    try {
      return await this.repository.save(publisher);
    } catch (error) {
        console.error(errorEnumPublisher.publisherNotCreated, error);
        throw new DatabaseErrorCustom(errorEnumPublisher.publisherNotCreated, 500);
    }
  }

  async update(id: number, publisher: Publisher): Promise<Publisher> {
    try {
      const existingpublisher = await this.repository.findOneBy({ id });
      if (!existingpublisher) {
        throw new DatabaseErrorCustom(errorEnumPublisher.publisherIndicatedNotFound, 404);
      }
      await this.repository.update(id, publisher);
      return this.repository.findOneOrFail({ where: { id } }); // Retorna la entidad actualizada
    } catch (error) {
        console.error(errorEnumPublisher.publisherNotUpdated, error);
        throw new DatabaseErrorCustom(errorEnumPublisher.publisherNotUpdated, 500);
    }
  }

  async delete(id: number): Promise<Publisher | undefined> {
    try {
      const publisher = await this.repository.findOneBy({ id });
      if (!publisher) {
        throw new DatabaseErrorCustom(errorEnumPublisher.publisherIndicatedNotFound, 404);
      }
      await this.repository.remove(publisher);
      return publisher;
    } catch (error) {
        console.error(errorEnumPublisher.publisherNotDeleted, error);
        throw new DatabaseErrorCustom(errorEnumPublisher.publisherNotDeleted, 500);
    }
  }
}
