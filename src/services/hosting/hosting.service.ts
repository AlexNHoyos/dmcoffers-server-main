// user.service.ts
import { HostingRepository } from '../../repositories/hosting/hosting.dao.js';
import { Hosting } from '../../models/hosting/hosting.entity.js';
import { IHostingService } from '../interfaces/hosting/IHostingService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';


export class HostingService implements IHostingService {
  
  private hostingRepository: HostingRepository;

  constructor() {
    this.hostingRepository = new HostingRepository();
  }


  async findAll(): Promise<Hosting[]> {
    return this.hostingRepository.findAll();
  }

  async findOne(id: number): Promise<Hosting | undefined> {
    return this.hostingRepository.findOne(id);
  }

  async create(newHosting: Hosting): Promise<Hosting> {

   return this.hostingRepository.create(newHosting);
  }


  async update(id: number, hosting: Hosting): Promise<Hosting> {

    return this.hostingRepository.update(id, hosting);
  }

  async delete(id: number): Promise<Hosting | undefined> {
    return this.hostingRepository.delete(id);
  }

}


