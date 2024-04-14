import { Juego } from '../models/juego.entity.js';
import { Repository } from '../shared/repository.js';

const juegos = [
  new Juego(
    1,
    'Fallout',
    12345,
    303,
    new Date(),
    new Date(),
    new Date(),
    'Re-Logic',
    new Date(),
    'Mauro'
  ),
];

export class JuegoRepository implements Repository<Juego> {
  public findAll(): Juego[] | undefined {
    return juegos;
  }

  public findOne(item: { id: string }): Juego | undefined {
    const id = parseInt(item.id);
    if (!isNaN(id)) {
      return juegos.find((juego) => juego.id === id);
    }
    // En caso de que la conversión falle, no se encuentra el juego
    return undefined;
  }

  public add(item: Juego): Juego | undefined {
    juegos.push(item);
    return item;
  }

  public update(item: Juego): Juego | undefined {
    const juegoIdx = juegos.findIndex((juego) => juego.id === item.id);

    if (juegoIdx !== -1) {
      juegos[juegoIdx] = { ...juegos[juegoIdx], ...item };
    }
    return juegos[juegoIdx];
  }

  public delete(item: { id: string }): Juego | undefined {
    const id = parseInt(item.id);
    // Verificar si la conversión fue exitosa
    if (!isNaN(id)) {
      const juegoIdx = juegos.findIndex((juego) => juego.id === id);
      if (juegoIdx !== -1) {
        const deletedJuegos = juegos[juegoIdx];
        juegos.splice(juegoIdx, 1);
        return deletedJuegos;
      }
    }
    // En caso de que la conversión falle o no se encuentre el juego
    return undefined;
  }

  /*public delete(item: { id: number }): Juego | undefined {
    const juegoIdx = juegos.findIndex((juego) => juego.id === item.id);

    if (juegoIdx !== -1) {
      const deletedJuegos = juegos[juegoIdx];
      juegos.splice(juegoIdx, 1);
      return deletedJuegos;
    }
  }*/
}
