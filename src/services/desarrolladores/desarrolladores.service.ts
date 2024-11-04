import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { inject, injectable } from 'inversify';
import { DesarrolladoresRepository } from '../../repositories/desarrolladores/desarrolladores.dao.js';
import { Desarrollador } from '../../models/desarrolladores/desarrolladores.entity.js';
import { IDesarrolladoresService } from '../interfaces/desarrolladores/IDesarrolladoresService.js';

@injectable()
export class DesarrolladoresService implements IDesarrolladoresService {
  private desarrolladoresRepository: DesarrolladoresRepository;

  constructor(
    @inject(DesarrolladoresRepository)
    desarrolladoresRepository: DesarrolladoresRepository
  ) {
    this.desarrolladoresRepository = desarrolladoresRepository;
  }

  async findAll(): Promise<Desarrollador[]> {
    return this.desarrolladoresRepository.findAll();
  }

  async findOne(id: number): Promise<Desarrollador | undefined> {
    return this.desarrolladoresRepository.findOne(id);
  }

  async create(newDesarrolladores: Desarrollador): Promise<Desarrollador> {
    return this.desarrolladoresRepository.create(newDesarrolladores);
  }

  async update(
    id: number,
    desarrolladores: Desarrollador
  ): Promise<Desarrollador> {
    if (
      desarrolladores.dissolution_date &&
      new Date(desarrolladores.dissolution_date) <= new Date()
    ) {
      desarrolladores.status = false;
    }

    return this.desarrolladoresRepository.update(id, desarrolladores);
  }

  async delete(id: number): Promise<Desarrollador | undefined> {
    return this.desarrolladoresRepository.delete(id);
  }
}
