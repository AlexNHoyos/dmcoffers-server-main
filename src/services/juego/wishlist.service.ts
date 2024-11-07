import { inject, injectable } from 'inversify';
import { WishlistRepository } from '../../repositories/juego/whislist.dao.js';

@injectable()
export class WishlistService {
  private _wishlistRepository: WishlistRepository;

  constructor(
    @inject(WishlistRepository) wishlistRepository: WishlistRepository
  ) {
    this._wishlistRepository = wishlistRepository;
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
}
