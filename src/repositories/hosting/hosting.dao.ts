import { Repository } from 'typeorm';
import { Hosting } from '../../models/hosting/hosting.entity.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumHosting } from '../../middleware/errorHandler/constants/errorConstants.js';
import { AppDataSource } from '../../shared/pg-database/db.js';

export class HostingRepository implements IBaseRepository<Hosting> {
  private repository: Repository<Hosting>;

  constructor() {
    this.repository = AppDataSource.getRepository(Hosting);
  }

  async findAll(): Promise<Hosting[]> {
    try {
      return await this.repository.find({
        order: {
          id: 'ASC', // Ordena por id ascendente
        },
      });
    } catch (error) {
      console.error(errorEnumHosting.hostingsNotFounded, error);
      throw new DatabaseErrorCustom(errorEnumHosting.hostingsNotFounded, 500);
    }
  }

  async findOne(id: number): Promise<Hosting | undefined> {
    try {
      const hosting = await this.repository.findOneBy({ id });
      return hosting ?? undefined;
    } catch (error) {
      console.error(errorEnumHosting.hostingIndicatedNotFound, error);
      throw new DatabaseErrorCustom(
        errorEnumHosting.hostingIndicatedNotFound,
        500
      );
    }
  }

  async create(hosting: Hosting): Promise<Hosting> {
    try {
      return await this.repository.save(hosting);
    } catch (error) {
      console.error(errorEnumHosting.hostingNotCreated, error);
      throw new DatabaseErrorCustom(errorEnumHosting.hostingNotCreated, 500);
    }
  }

  async update(id: number, hosting: Hosting): Promise<Hosting> {
    try {
      const existingHosting = await this.repository.findOneBy({ id });
      if (!existingHosting) {
        throw new DatabaseErrorCustom(
          errorEnumHosting.hostingIndicatedNotFound,
          404
        );
      }
      await this.repository.update(id, hosting);
      return this.repository.findOneOrFail({ where: { id } }); // Retorna la entidad actualizada
    } catch (error) {
      console.error(errorEnumHosting.hostingNotUpdated, error);
      throw new DatabaseErrorCustom(errorEnumHosting.hostingNotUpdated, 500);
    }
  }

  async delete(id: number): Promise<Hosting | undefined> {
    try {
      const hosting = await this.repository.findOneBy({ id });
      if (!hosting) {
        throw new DatabaseErrorCustom(
          errorEnumHosting.hostingIndicatedNotFound,
          404
        );
      }
      await this.repository.remove(hosting);
      return hosting;
    } catch (error) {
      console.error(errorEnumHosting.hostingNotDeleted, error);
      throw new DatabaseErrorCustom(errorEnumHosting.hostingNotDeleted, 500);
    }
  }
}
