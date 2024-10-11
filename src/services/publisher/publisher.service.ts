import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { inject, injectable } from 'inversify';
import { PublisherRepository } from '../../repositories/publicadores/publisher.dao.js';
import { Publisher } from '../../models/publicadores/publisher.entity.js';
import { IPublisherService } from '../interfaces/publisher/IPublisherService.js';

@injectable()
export class PublisherService implements IPublisherService {
  
  private publisherRepository: PublisherRepository;

  constructor(
    @inject(PublisherRepository) publisherRepository: PublisherRepository,
  ){    
    this.publisherRepository = publisherRepository;
  }

  async findAll(): Promise<Publisher[]> {
    return this.publisherRepository.findAll();
  }

  async findOne(id: number): Promise<Publisher | undefined> {
    return this.publisherRepository.findOne(id);
  }

  async create(newpublisher: Publisher): Promise<Publisher> {

   return this.publisherRepository.create(newpublisher);
  }


  async update(id: number, publisher: Publisher): Promise<Publisher> {

    return this.publisherRepository.update(id, publisher);
  }

  async delete(id: number): Promise<Publisher | undefined> {
    return this.publisherRepository.delete(id);
  }

}


