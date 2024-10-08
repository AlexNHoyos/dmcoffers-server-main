import { Repository } from 'typeorm';
import { Desarrollador } from '../../models/desarrolladores/desarrolladores.entity.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumDesarrollador } from '../../middleware/errorHandler/constants/errorConstants.js';
import { AppDataSource } from '../../config/pg-database/db.js';

export class DesarrolladoresRepository implements IBaseRepository<Desarrollador> {
  private repository: Repository<Desarrollador>;

  constructor() {
    this.repository = AppDataSource.getRepository(Desarrollador);
  }

  async findAll(): Promise<Desarrollador[]> {
    try {
      return await this.repository.find();
    } catch (error) {
        console.error(errorEnumDesarrollador.desarrolladorNotFounded, error);
        throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorNotFounded, 500);
    }
  }

  async findOne(id: number): Promise<Desarrollador | undefined> {
    try {
        const hosting = await this.repository.findOneBy({ id });
        return hosting?? undefined;
    } catch (error) {
        console.error(errorEnumDesarrollador.desarrolladorIndicatedNotFound, error);
        throw new DatabaseErrorCustom( errorEnumDesarrollador.desarrolladorIndicatedNotFound, 500);
    }
  }

  async create(desarrollador: Desarrollador): Promise<Desarrollador> {
    try {
      return await this.repository.save(desarrollador);
    } catch (error) {
        console.error(errorEnumDesarrollador.desarrolladorNotCreated, error);
        throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorNotCreated, 500);
    }
  }

  async update(id: number, desarrollador: Desarrollador): Promise<Desarrollador> {
    try {
      const existingdesarrollador = await this.repository.findOneBy({ id });
      if (!existingdesarrollador) {
        throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorIndicatedNotFound, 404);
      }
      await this.repository.update(id, desarrollador);
      return this.repository.findOneOrFail({ where: { id } }); // Retorna la entidad actualizada
    } catch (error) {
        console.error(errorEnumDesarrollador.desarrolladorNotUpdated, error);
        throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorNotUpdated, 500);
    }
  }

  async delete(id: number): Promise<Desarrollador | undefined> {
    try {
      const desarrollador = await this.repository.findOneBy({ id });
      if (!desarrollador) {
        throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorIndicatedNotFound, 404);
      }
      await this.repository.remove(desarrollador);
      return desarrollador;
    } catch (error) {
        console.error(errorEnumDesarrollador.desarrolladorNotDeleted, error);
        throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorNotDeleted, 500);
    }
  }
}
