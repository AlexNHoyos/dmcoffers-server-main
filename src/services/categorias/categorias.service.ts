// user.service.ts
import { HostingRepository } from '../../repositories/hosting/hosting.dao.js';
import { Hosting } from '../../models/hosting/hosting.entity.js';
import { IHostingService } from '../interfaces/hosting/IHostingService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { inject, injectable } from 'inversify';
import { ICategoriasService } from '../interfaces/categorias/ICategoriasService.js';
import { Categorias } from '../../models/categorias/categorias.entity.js';
import { CategoriasRepository } from '../../repositories/categorias/categorias.dao.js';

@injectable()
export class CategoriasService implements ICategoriasService {
  
  private categoriasRepository: CategoriasRepository;

  constructor(
    @inject(CategoriasRepository) categoriasRepository: CategoriasRepository,
  ) {
    this.categoriasRepository = categoriasRepository;   
  }


  async findAll(): Promise<Categorias[]> {
    return this.categoriasRepository.findAll();
  }

  async findOne(id: number): Promise<Categorias | undefined> {
    return this.categoriasRepository.findOne(id);
  }

  async create(newCategoria: Categorias): Promise<Categorias> {

   return this.categoriasRepository.create(newCategoria);
  }


  async update(id: number, categorias: Categorias): Promise<Categorias> {

    return this.categoriasRepository.update(id, categorias);
  }

  async delete(id: number): Promise<Categorias | undefined> {
    return this.categoriasRepository.delete(id);
  }

}


