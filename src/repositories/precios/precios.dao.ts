import { Repository } from 'typeorm';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { AppDataSource } from '../../config/pg-database/db.js';
import { injectable } from 'inversify';
import { Precio } from '../../models/precios/precios.entity.js';
import { errorEnumPrecio } from '../../middleware/errorHandler/constants/errorConstants.js';

@injectable()
export class PrecioRepository {
  private repository: Repository<Precio>;

  constructor() {
    this.repository = AppDataSource.getRepository(Precio);
  }

  async findAll(): Promise<Precio[]> {
    try {
      return await this.repository.find({
        order: {
          id_game: 'ASC', // Ordena por id ascendente
          valid_until_date: 'ASC',
        },
      });
    } catch (error) {
      console.error(errorEnumPrecio.preciosNotFounded, error);
      throw new DatabaseErrorCustom(errorEnumPrecio.preciosNotFounded, 500);
    }
  }

  async findOne(
    id_game: number,
    valid_until_date: Date
  ): Promise<Precio | undefined> {
    try {
      const precio = await this.repository.findOneBy({
        id_game,
        valid_until_date,
      });
      return precio ?? undefined;
    } catch (error) {
      console.error(errorEnumPrecio.precioIndicatedNotFound, error);
      throw new DatabaseErrorCustom(
        errorEnumPrecio.precioIndicatedNotFound,
        500
      );
    }
  }

  async create(precio: Precio): Promise<Precio> {
    try {
      return await this.repository.save(precio);
    } catch (error) {
      console.error(errorEnumPrecio.precioNotCreated, error);
      throw new DatabaseErrorCustom(errorEnumPrecio.precioNotCreated, 500);
    }
  }

  async update(
    id_game: number,
    valid_until_date: Date,
    precio: Precio
  ): Promise<Precio> {
    try {
      const existingPrecio = await this.repository.findOneBy({
        id_game,
        valid_until_date,
      });
      if (!existingPrecio) {
        throw new DatabaseErrorCustom(
          errorEnumPrecio.precioIndicatedNotFound,
          404
        );
      }
      await this.repository.update({ id_game, valid_until_date }, precio);
      return this.repository.findOneOrFail({
        where: { id_game, valid_until_date },
      }); // Retorna la entidad actualizada
    } catch (error) {
      console.error(errorEnumPrecio.precioNotUpdated, error);
      throw new DatabaseErrorCustom(errorEnumPrecio.precioNotUpdated, 500);
    }
  }

  async delete(
    id_game: number,
    valid_until_date: Date
  ): Promise<Precio | undefined> {
    try {
      const precio = await this.repository.findOneBy({
        id_game,
        valid_until_date,
      });
      if (!precio) {
        throw new DatabaseErrorCustom(
          errorEnumPrecio.precioIndicatedNotFound,
          404
        );
      }
      await this.repository.remove(precio);
      return precio;
    } catch (error) {
      console.error(errorEnumPrecio.precioNotDeleted, error);
      throw new DatabaseErrorCustom(errorEnumPrecio.precioNotDeleted, 500);
    }
  }
}
