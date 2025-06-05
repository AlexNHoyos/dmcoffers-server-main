import { inject, injectable } from 'inversify';
import { BibliotecaRepository } from '../../repositories/juego/biblioteca.dao.js';
import { JuegoRepository } from '../../repositories/juego/juego.dao.js';

@injectable()
export class BibliotecaService {
  private _bibliotecaRepository: BibliotecaRepository;
  private juegoRepository: JuegoRepository;

  constructor(
    @inject(BibliotecaRepository) BibliotecaRepository: BibliotecaRepository,
    @inject(JuegoRepository) juegoRepository: JuegoRepository
  ) {
    this._bibliotecaRepository = BibliotecaRepository;
    this.juegoRepository = juegoRepository;
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

  public async getBiblioteca(userId: number) {
    return this.juegoRepository.findPurchasedGames(userId);
  }
}
