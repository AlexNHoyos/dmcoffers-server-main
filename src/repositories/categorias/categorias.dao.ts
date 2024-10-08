import { Repository } from 'typeorm';
import { Categorias } from '../../models/categorias/categorias.entity.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumCategories } from '../../middleware/errorHandler/constants/errorConstants.js';
import { AppDataSource } from '../../config/pg-database/db.js';

export class CategoriasRepository implements IBaseRepository<Categorias> {
  private repository: Repository<Categorias>;

  constructor() {
    this.repository = AppDataSource.getRepository(Categorias);
  }

  async findAll(): Promise<Categorias[]> {
    try {
      return await this.repository.find({
        order: {
          id: 'ASC', // Ordenar por id ascendente
        },
      });
    } catch (error) {
      console.error(errorEnumCategories.categoriesNotFounded, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoriesNotFounded,
        500
      );
    }
  }

  async findOne(id: number): Promise<Categorias | undefined> {
    try {
      const category = await this.repository.findOneBy({ id });
      return category ?? undefined;
    } catch (error) {
      console.error(errorEnumCategories.categoryIndicatedNotFound, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoryIndicatedNotFound,
        500
      );
    }
  }

  async create(Categorias: Categorias): Promise<Categorias> {
    try {
      return await this.repository.save(Categorias);
    } catch (error) {
      console.error(errorEnumCategories.categoryNotCreated, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoryNotCreated,
        500
      );
    }
  }

  async update(id: number, category: Categorias): Promise<Categorias> {
    try {
      const existingCategory = await this.repository.findOneBy({ id });
      if (!existingCategory) {
        throw new DatabaseErrorCustom(
          errorEnumCategories.categoryIndicatedNotFound,
          404
        );
      }
      await this.repository.update(id, category);
      return this.repository.findOneOrFail({ where: { id } }); // Retorna la entidad actualizada
    } catch (error) {
      console.error(errorEnumCategories.categoryNotUpdated, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoryNotUpdated,
        500
      );
    }
  }

  async delete(id: number): Promise<Categorias | undefined> {
    try {
      const category = await this.repository.findOneBy({ id });
      if (!category) {
        throw new DatabaseErrorCustom(
          errorEnumCategories.categoryIndicatedNotFound,
          404
        );
      }
      await this.repository.remove(category);
      return category;
    } catch (error) {
      console.error(errorEnumCategories.categoryNotDeleted, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoryNotDeleted,
        500
      );
    }
  }
}
