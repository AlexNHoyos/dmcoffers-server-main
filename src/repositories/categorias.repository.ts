import { Categorias } from '../models/categorias.entity.js'
import { Repository } from '../shared/repository.js';

const categorias = [
    new Categorias(
        1,
        'prueba',
        new Date(),
        'Esta es una prueba de foros',
        new Date(),
        new Date()
    ),
]

export class CategoriasRepository implements Repository<Categorias> {

    public findAll(): Categorias[] | undefined {
        return categorias
    }

    public findOne(categorias: { id: number }): Categorias | undefined {
        return categorias.find((foroEnt) => categorias.id === foroEnt.id)
    }

    public add(categorias: Categorias): Categorias | undefined {
        categorias.push(categorias)
        return categorias
    }

    public update(categorias: Categorias): Categorias | undefined {
        const categoriaIdx = categorias.findIndex((foroEnt) => categorias.id === foroEnt.id)

        if (categoriaIdx > -1) {
            categoriaIdx[categoriaIdx] = { ...categorias[categoriaIdx], ...categorias }
        }
        return categorias[categoriaIdx]
    }

    public delete(categorias: { id: number }): Categorias | undefined {
        const categoriaIdx = categorias.findIndex((categoriaEnt) => categorias.id === categoriaEnt.id)

        if (categoriaIdx > -1) {
            const deletedCategoria = categorias[categoriaIdx]
            categorias.splice(categoriaIdx, 1)
            return deletedCategoria
        }
    }
}