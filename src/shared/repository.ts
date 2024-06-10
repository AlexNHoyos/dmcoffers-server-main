

export interface Repository<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | undefined>;
  create(entity: T): Promise<T>;
  update(id: number, entity: T): Promise<T | undefined>;
  delete(id: number): Promise<T | undefined>;
}
