import { Precio } from '../../../models/juegos/precios.entity.js';
import { IBaseService } from '../IBaseService.js';

export interface IPrecioService {
  findAll(): Promise<Precio[]>;
  findOne(id_game: number, valid_until_date: Date): Promise<Precio | undefined>;
  create(entity: Precio): Promise<Precio>;
  update(
    id_game: number,
    valid_until_date: Date,
    entity: Partial<Precio>
  ): Promise<Precio>;
  delete(id_game: number, valid_until_date: Date): Promise<Precio | undefined>;
}
