import { inject, injectable } from 'inversify';
import { CartRepository } from '../../repositories/juego/cart.dao.js';
import { JuegoRepository } from '../../repositories/juego/juego.dao.js';

@injectable()
export class CartService {
  private _cartRepository: CartRepository;
  private juegoRepository: JuegoRepository;

  constructor(
    @inject(CartRepository) CartRepository: CartRepository,
    @inject(JuegoRepository) juegoRepository: JuegoRepository
  ) {
    this._cartRepository = CartRepository;
    this.juegoRepository = juegoRepository;
  }

  async addToCart(userId: number, gameId: number): Promise<void> {
    await this._cartRepository.addToCart(userId, gameId);
  }

  async removeFromCart(userId: number, gameId: number): Promise<void> {
    await this._cartRepository.removeFromCart(userId, gameId);
  }

  // Método para verificar si un juego está en la Cart
  async isInCart(userId: number, juegoId: number): Promise<boolean> {
    return await this._cartRepository.isInCart(userId, juegoId);
  }

  public async getCart(userId: number) {
    return this.juegoRepository.findCartGames(userId);
  }
}
