import { IBaseService } from '../IBaseService.js';
import { JuegoDto } from '../../../models-dto/juegos/juego-dto.entity.js';

export interface IJuegoService extends IBaseService<JuegoDto> {
  findByName(gamename: string): Promise<JuegoDto[] | undefined>;
  findWishlistGames(userId: number): Promise<JuegoDto[]>;
  findCartGames(userId: number): Promise<JuegoDto[]>;
  createGame (newJuego:JuegoDto, imagePath?: string): Promise<JuegoDto>
}
