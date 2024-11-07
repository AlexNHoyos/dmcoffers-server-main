import { IBaseService } from '../IBaseService.js';
import { JuegoDto } from '../../../models-dto/juegos/juego-dto.entity.js';

export interface IJuegoService extends IBaseService<JuegoDto | JuegoDto> {
  findByName(gamename: string): Promise<JuegoDto[] | undefined>;
  findWishlistGames(userId: number): Promise<JuegoDto[]>;
}
