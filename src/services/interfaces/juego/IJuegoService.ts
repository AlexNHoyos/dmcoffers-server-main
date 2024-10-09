import { IBaseService } from '../IBaseService.js';
import { Juego } from '../../../models/juegos/juegos.entity.js';
import { JuegoDto } from '../../../models-dto/juegos/juego-dto.entity.js';

export interface IJuegoService extends IBaseService<Juego | JuegoDto> {
  // Métodos adicionales específicos para Auth, agregar cuando los haya
}
