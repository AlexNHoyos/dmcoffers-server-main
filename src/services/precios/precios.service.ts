import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { inject, injectable } from 'inversify';
import { IPrecioService } from '../interfaces/precios/IPrecioService.js';
import { Precio } from '../../models/precios/precios.entity.js';
import { PrecioRepository } from '../../repositories/precios/precios.dao.js';

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
