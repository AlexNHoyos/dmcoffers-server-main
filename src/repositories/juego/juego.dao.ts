import { Repository } from 'typeorm';
import { Juego } from '../../models/juegos/juegos.entity.js';
import { Publisher } from '../../models/publicadores/publisher.entity.js';
import { Desarrollador } from '../../models/desarrolladores/desarrolladores.entity.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumJuego } from '../../middleware/errorHandler/constants/errorConstants.js';
import { AppDataSource } from '../../shared/pg-database/db.js';

export class JuegoRepository implements IBaseRepository<Juego> {
  private repository: Repository<Juego>;
  private publisherRepository: Repository<Publisher>;
  private developerRepository: Repository<Desarrollador>;

  constructor() {
    this.repository = AppDataSource.getRepository(Juego);
    this.publisherRepository = AppDataSource.getRepository(Publisher);
    this.developerRepository = AppDataSource.getRepository(Desarrollador);
  }

  async findAll(): Promise<Juego[]> {
    try {
      return await this.repository.find({
        order: {
          id: 'ASC', // Ordena por id ascendente
        },
      });
    } catch (error) {
      console.error(errorEnumJuego.juegosNotFounded, error);
      throw new DatabaseErrorCustom(errorEnumJuego.juegosNotFounded, 500);
    }
  }

  async findOne(id: number): Promise<Juego | undefined> {
    try {
      const Juego = await this.repository.findOneBy({ id });
      return Juego ?? undefined;
    } catch (error) {
      console.error(errorEnumJuego.juegoIndicatedNotFound, error);
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

  async findPublisherById(id: number | undefined): Promise<Publisher | null> {
    const publisher = await this.publisherRepository.findOne({ where: { id } });
    return publisher || null;
  }

  async findDeveloperById(
    id: number | undefined
  ): Promise<Desarrollador | null> {
    const developer = await this.developerRepository.findOne({ where: { id } });
    return developer || null;
  }

  async update(id: number, juego: Juego): Promise<Juego> {
    try {
      const existingJuego = await this.repository.findOneBy({ id });
      if (!existingJuego) {
        throw new DatabaseErrorCustom(
          errorEnumJuego.juegoIndicatedNotFound,
          404
        );
      }
      await this.repository.update(id, juego);
      return this.repository.findOneOrFail({ where: { id } }); // Retorna la entidad actualizada
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
