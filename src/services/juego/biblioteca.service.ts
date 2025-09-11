import { inject, injectable } from 'inversify';
import { BibliotecaRepository } from '../../repositories/juego/biblioteca.dao.js';
import { JuegoRepository } from '../../repositories/juego/juego.dao.js';
import { JuegoDto } from '../../models-dto/juegos/juego-dto.entity.js';
import { JuegoMapper } from '../../mappers/juegos/juego.mapper.js';


@injectable()
export class BibliotecaService {
  private _bibliotecaRepository: BibliotecaRepository;
  private _juegoRepository: JuegoRepository;
  private _juegoMapper: JuegoMapper

  constructor(
    @inject(BibliotecaRepository) BibliotecaRepository: BibliotecaRepository,
    @inject(JuegoRepository) juegoRepository: JuegoRepository,
    @inject(JuegoMapper) juegoMapper: JuegoMapper,
  ) {
    this._bibliotecaRepository = BibliotecaRepository;
    this._juegoRepository = juegoRepository;
    this._juegoMapper = juegoMapper;
  }

  async addToBiblioteca(userId: number, gameId: number): Promise<void> {
    await this._bibliotecaRepository.addToBiblioteca(userId, gameId);
  }

  async removeFromBiblioteca(userId: number, gameId: number): Promise<void> {
    await this._bibliotecaRepository.removeFromBiblioteca(userId, gameId);
  }

  // Método para verificar si un juego está en la Biblioteca
  async isInBiblioteca(userId: number, juegoId: number): Promise<boolean> {
    return await this._bibliotecaRepository.isInBiblioteca(userId, juegoId);
  }

  public async getBiblioteca(userId: number): Promise<JuegoDto[]> {

    let gamesObtained =  await this._juegoRepository.findPurchasedGames(userId);

    const juegosDto: JuegoDto[] = [];

    for (const game of gamesObtained) {
      const dto = await this._juegoMapper.convertoDto(game);
      juegosDto.push(dto);
    }

    return juegosDto;
  }
  
}
