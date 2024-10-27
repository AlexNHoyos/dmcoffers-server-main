import { Juego } from '../../../models/juegos/juegos.entity.js';
import { IBaseRepository } from '../IBaseRepository.js';

export interface IJuegoRepository extends IBaseRepository<Juego> {
  findByName(gamename: string): Promise<Juego | undefined>;
}
