import { inject, injectable } from 'inversify';
import { CartRepository } from '../../repositories/juego/cart.dao.js';
import { JuegoRepository } from '../../repositories/juego/juego.dao.js';
import { BibliotecaRepository } from '../../repositories/juego/biblioteca.dao.js';

@injectable()
export class CartService {
  private _cartRepository: CartRepository;
  private juegoRepository: JuegoRepository;
  private bibliotecaRepository: BibliotecaRepository;

  constructor(
    @inject(CartRepository) CartRepository: CartRepository,
    @inject(JuegoRepository) juegoRepository: JuegoRepository,
    @inject(BibliotecaRepository) bibliotecaRepository: BibliotecaRepository
  ) {
    this._cartRepository = CartRepository;
    this.juegoRepository = juegoRepository;
    this.bibliotecaRepository = bibliotecaRepository;
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

  public async checkout(userId: number): Promise<void> {
    const juegos = await this.getCart(userId);


    for (const juego of juegos) {
      if (juego.id !== undefined) {
        await this.bibliotecaRepository.addToBiblioteca(userId, juego.id);
      }
    }

    // Vaciar carrito
    await this._cartRepository.clearCart(userId);
  }
}
