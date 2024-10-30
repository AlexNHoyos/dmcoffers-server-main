import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { inject, injectable } from 'inversify';
import { IPrecioService } from '../interfaces/precios/IPrecioService.js';
import { PrecioRepository } from '../../repositories/juego/precios.dao.js';
import { Repository } from 'typeorm';
import { Precio } from '../../models/juegos/precios.entity.js';

@injectable()
export class PrecioService implements IPrecioService {
  private precioRepository: PrecioRepository;

  constructor(@inject(PrecioRepository) precioRepository: PrecioRepository) {
    this.precioRepository = precioRepository;
  }

  async findAll(): Promise<Precio[]> {
    return this.precioRepository.findAll();
  }

  async findOne(
    id_game: number,
    valid_until_date: Date
  ): Promise<Precio | undefined> {
    return this.precioRepository.findOne(id_game, valid_until_date);
  }

  async getLastPrice(id_game: number): Promise<Precio | undefined> {
    try {
      return await this.precioRepository.findLatestPrice(id_game);
    } catch (error) {
      console.error('Error al obtener el precio más reciente:', error);
      throw error;
    }
  }

  async create(newPrecio: Precio): Promise<Precio> {
    return this.precioRepository.create(newPrecio);
  }

  async update(
    id_game: number,
    valid_until_date: Date,
    precio: Precio
  ): Promise<Precio> {
    return this.precioRepository.update(id_game, valid_until_date, precio);
  }

  async delete(
    id_game: number,
    valid_until_date: Date
  ): Promise<Precio | undefined> {
    return this.precioRepository.delete(id_game, valid_until_date);
  }
}
