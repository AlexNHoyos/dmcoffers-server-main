import { Repository } from '../shared/repository.js'
import { Foro } from '../models/foro.entity.js'

const foros = [
    new Foro(
        1,
        1,
        'Esta es una prueba de foros',
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad',
        new Date(),
        new Date()
    ),
]

export class ForoRepository implements Repository<Foro> {

    public findAll(): Foro[] | undefined {
        return foros
    }

    public findOne(foro: { id: number }): Foro | undefined {
        return foros.find((foroEnt) => foro.id === foroEnt.id)
    }

    public add(foro: Foro): Foro | undefined {
        foros.push(foro)
        return foro
    }

    public update(foro: Foro): Foro | undefined {
        const foroIdx = foros.findIndex((foroEnt) => foro.id === foroEnt.id)

        if (foroIdx > -1) {
            foros[foroIdx] = { ...foros[foroIdx], ...foro }
        }
        return foros[foroIdx]
    }

    public delete(foro: { id: number }): Foro | undefined {
        const foroIdx = foros.findIndex((foroEnt) => foro.id === foroEnt.id)

        if (foroIdx > -1) {
            const deletedForos = foros[foroIdx]
            foros.splice(foroIdx, 1)
            return deletedForos
        }
    }
}