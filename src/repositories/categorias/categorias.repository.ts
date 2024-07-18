import { Categorias } from '../../models/categorias/categorias.entity.js';

const categorias = [
  new Categorias(
    '1',
    'prueba',
    new Date(),
    'Esta es una prueba de categorias',
    new Date(),
    new Date()
  ),
];
export class CategoriasRepository {
  public findAll(): Categorias[] | undefined {
    return categorias;
  }

  public findOne(categoria: { id: string }): Categorias | undefined {
    return categorias.find(
      (categoriasEnt) => categoria.id === categoriasEnt.id
    );
  }

  public add(categoria: Categorias): Categorias | undefined {
    categorias.push(categoria);
    return categoria;
  }

  public update(categoria: Categorias): Categorias | undefined {
    const categoriaIdx = categorias.findIndex(
      (categoriaEnt) => categoria.id === categoriaEnt.id
    );

    if (categoriaIdx > -1) {
      categorias[categoriaIdx] = { ...categorias[categoriaIdx], ...categoria };
    }
    return categorias[categoriaIdx];
  }

  public delete(categoria: { id: string }): Categorias | undefined {
    const categoriaIdx = categorias.findIndex(
      (categoriaEnt) => categoria.id === categoriaEnt.id
    );

    if (categoriaIdx > -1) {
      const deletedCategoria = categorias[categoriaIdx];
      categorias.splice(categoriaIdx, 1);
      return deletedCategoria;
    }
  }
}
