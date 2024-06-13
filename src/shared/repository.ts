export interface Repository<T> {
  findAll(): Promise<T[] | undefined>;
  findOne(obj: { id: string }): Promise<T | undefined>;
  add(obj: T): Promise<T | undefined>;
  update(obj: T): Promise<T | undefined>;
  delete(obj: { id: string }): Promise<T | undefined>;
}
