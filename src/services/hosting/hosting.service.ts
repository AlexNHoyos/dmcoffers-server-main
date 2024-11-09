// user.service.ts
import { HostingRepository } from '../../repositories/hosting/hosting.dao.js';
import { Hosting } from '../../models/hosting/hosting.entity.js';
import { IHostingService } from '../interfaces/hosting/IHostingService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { inject, injectable } from 'inversify';

@injectable()
export class HostingService implements IHostingService {
  
  private _hostingRepository: HostingRepository;

  constructor(
    @inject(HostingRepository) hostingRepository: HostingRepository,
  ) {
    this._hostingRepository = hostingRepository;
  }


  async findAll(): Promise<Hosting[]> {
    return this._hostingRepository.findAll();
  }

  async findOne(id: number): Promise<Hosting | undefined> {
    return this._hostingRepository.findOne(id);
  }

  async create(newHosting: Hosting): Promise<Hosting> {

   return this._hostingRepository.create(newHosting);
  }


  async update(id: number, hosting: Hosting): Promise<Hosting> {

    return this._hostingRepository.update(id, hosting);
  }

  async delete(id: number): Promise<Hosting | undefined> {
    return this._hostingRepository.delete(id);
  }

}


