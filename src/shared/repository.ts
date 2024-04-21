export interface Repository<T> {
<<<<<<< HEAD
  findAll(): T[] | undefined;
  findOne(obj: { id: string }): T | undefined;
  add(obj: T): T | undefined;
  update(obj: T): T | undefined;
  delete(obj: { id: string }): T | undefined;
}
=======
    findAll(): T[] | undefined
    findOne(item: { id: number }): T | undefined
    add(item: T): T | undefined
    update(item: T): T | undefined
    delete(item: { id: number }): T | undefined
}
>>>>>>> crudCategorias
