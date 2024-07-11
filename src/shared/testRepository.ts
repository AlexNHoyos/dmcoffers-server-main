export interface Repository<T> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | undefined>;
    create(entity: T): Promise<T>;
    update(id: string, entity: T): Promise<T | undefined>;
    delete(id: string): Promise<T | undefined>;
  }