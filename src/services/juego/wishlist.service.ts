import { inject, injectable } from 'inversify';
import { WishlistRepository } from '../../repositories/juego/whislist.dao.js';
import { JuegoRepository } from '../../repositories/juego/juego.dao.js';

@injectable()
export class WishlistService {
  private _wishlistRepository: WishlistRepository;
  private juegoRepository: JuegoRepository;

  constructor(
    @inject(WishlistRepository) wishlistRepository: WishlistRepository,
    @inject(JuegoRepository) juegoRepository: JuegoRepository
  ) {
    this._wishlistRepository = wishlistRepository;
    this.juegoRepository = juegoRepository;
  }

  async addToWishlist(userId: number, gameId: number): Promise<void> {
    await this._wishlistRepository.addToWishlist(userId, gameId);
  }

  async removeFromWishlist(userId: number, gameId: number): Promise<void> {
    await this._wishlistRepository.removeFromWishlist(userId, gameId);
  }

  // Método para verificar si un juego está en la wishlist
  async isInWishlist(userId: number, juegoId: number): Promise<boolean> {
    return await this._wishlistRepository.isInWishlist(userId, juegoId);
  }

  public async getWishlist(userId: number) {
    return this.juegoRepository.findWishlistGames(userId);
  }
}
