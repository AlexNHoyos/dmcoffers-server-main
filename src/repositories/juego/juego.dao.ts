import { Repository, FindOneOptions, ILike } from 'typeorm';
import { Juego } from '../../models/juegos/juegos.entity.js';
import { Publisher } from '../../models/publicadores/publisher.entity.js';
import { Desarrollador } from '../../models/desarrolladores/desarrolladores.entity.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumJuego } from '../../middleware/errorHandler/constants/errorConstants.js';
import { AppDataSource } from '../../config/pg-database/db.js';
import { Categorias } from '../../models/categorias/categorias.entity.js';
import { injectable } from 'inversify';
import { IJuegoRepository } from '../interfaces/juegos/IJuegoRepository.js';

@injectable()
export class JuegoRepository implements IJuegoRepository {
  private repository: Repository<Juego>;

  constructor() {
    this.repository = AppDataSource.getRepository(Juego);
  }

  async findAll(): Promise<Juego[]> {
    try {
      return await this.repository.find({
        relations: ['publisher', 'developer', 'categorias', 'precios'],
        order: {
          id: 'ASC', // Ordena por id ascendente
        },
      });
    } catch (error) {
      console.error(errorEnumJuego.juegosNotFounded, error);
      throw new DatabaseErrorCustom(errorEnumJuego.juegosNotFounded, 500);
    }
  }

  // Metodo actualizado para buscar por id o por nombre
  async findOne(
    optionsOrId: number | FindOneOptions<Juego>
  ): Promise<Juego | undefined> {
    try {
      const juego =
        typeof optionsOrId === 'number'
          ? await this.repository.findOne({
              where: { id: optionsOrId },
              relations: ['publisher', 'developer', 'categorias', 'precios'],
            })
          : await this.repository.findOne({
              ...optionsOrId,
              relations: ['publisher', 'developer', 'categorias', 'precios'],
            });

      return juego ?? undefined;
    } catch (error) {
      console.error(errorEnumJuego.juegoIndicatedNotFound, error);
      throw new DatabaseErrorCustom(errorEnumJuego.juegoIndicatedNotFound, 500);
    }
  }

  async findByName(gamename: string): Promise<Juego[] | undefined> {
    try {
      console.log(gamename);
      return await this.repository.find({
        where: { gamename: ILike(`%${gamename}%`) },
        relations: ['publisher', 'developer', 'categorias', 'precios'],
      });
    } catch (error) {
      console.error('Error buscando juegos por nombre:', error);
      throw new DatabaseErrorCustom(errorEnumJuego.juegoIndicatedNotFound, 500);
    }
  }

  async create(juego: Juego): Promise<Juego> {
    try {
      return await this.repository.save(juego);
    } catch (error) {
      console.error(errorEnumJuego.juegoNotCreated, error);
      throw new DatabaseErrorCustom(errorEnumJuego.juegoNotCreated, 500);
    }
  }

  async update(id: number, juego: Partial<Juego>): Promise<Juego> {
    try {
      const existingJuego = await this.repository.findOne({
        where: { id },
        relations: ['categorias', 'publisher', 'developer', 'precios'],
      });

      if (!existingJuego) {
        throw new DatabaseErrorCustom(
          errorEnumJuego.juegoIndicatedNotFound,
          404
        );
      }

      // Merge para aplicar actualizaciones parciales
      this.repository.merge(existingJuego, juego);

      // Actualizar categorías solo si se insertan en el patch
      if (juego.categorias) {
        existingJuego.categorias = Promise.resolve([]); // Elimino categorías actuales asignando array vacío
        await this.repository.save(existingJuego); // Guardo las nuevas relaciones vacias (categorias-juegos)
        existingJuego.categorias = juego.categorias; // Asigna las nuevas categorías
      }

      return this.repository.save(existingJuego); // Retorna la entidad actualizada
    } catch (error) {
      console.error(errorEnumJuego.juegoNotUpdated, error);
      throw new DatabaseErrorCustom(errorEnumJuego.juegoNotUpdated, 500);
    }
  }

  async delete(id: number): Promise<Juego | undefined> {
    try {
      const juego = await this.repository.findOneBy({ id });
      if (!juego) {
        throw new DatabaseErrorCustom(
          errorEnumJuego.juegoIndicatedNotFound,
          404
        );
      }
      await this.repository.remove(juego);
      return juego;
    } catch (error) {
      console.error(errorEnumJuego.juegoNotDeleted, error);
      throw new DatabaseErrorCustom(errorEnumJuego.juegoNotDeleted, 500);
    }
  }
}
