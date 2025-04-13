import { Repository } from 'typeorm';

import { User } from '../../models/usuarios/user.entity.js';
import { Juego } from '../../models/juegos/juegos.entity.js';

import { AppDataSource } from '../../config/pg-database/db.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { injectable } from 'inversify';

@injectable()
export class CartRepository {
  private userRepository: Repository<User>;
  private juegoRepository: Repository<Juego>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.juegoRepository = AppDataSource.getRepository(Juego);
  }

  async addToCart(userId: number, juegoId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['cart', 'biblioteca'],
      });
      const juego = await this.juegoRepository.findOne({
        where: { id: juegoId },
      });

      if (!user || !juego) throw new Error('User or game not found');

      const alreadyInCart = user.cart?.some(j => j.id === juegoId);
      const alreadyPurchased = user.biblioteca?.some(j => j.id === juegoId);

      if (alreadyPurchased) {
        throw new Error('Este juego ya fue comprado');
      }

      if (!alreadyInCart) {
        user.cart?.push(juego);
        await this.userRepository.save(user);
      }
    } catch (error) {
      console.error('Error adding to Cart:', error);
      throw new DatabaseErrorCustom('Failed to add juego to Cart', 500);
    }
  }

  async removeFromCart(userId: number, juegoId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['cart'],
      });

      if (user) {
        user.cart = user.cart?.filter((juego) => juego.id !== juegoId); // Eliminar el juego por ID
        await this.userRepository.save(user);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new DatabaseErrorCustom(
        'Failed to remove juego from cart',
        500
      );
    }
  }

  async isInCart(userId: number, juegoId: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['cart'],
      });

      if (user && user.cart) {
        return user.cart.some((juego) => juego.id === juegoId);
      }
      return false;
    } catch (error) {
      console.error('Error checking Cart:', error);
      throw new DatabaseErrorCustom('Failed to check Cart', 500);
    }
  }

  async getCartByUserId(userId: number): Promise<Juego[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['cart'],
      });

      if (user && user.cart) {
        console.log('Cart fetched successfully:', user.cart);
        return user.cart;
      } else {
        throw new Error('Carrito no encontrado para usuario');
      }
    } catch (error) {
      console.error('Problema al buscar carrito:', error);
      throw new DatabaseErrorCustom('Problema al buscar carrito', 500);
    }
  }
}
