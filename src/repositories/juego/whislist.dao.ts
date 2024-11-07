import { Repository } from 'typeorm';

import { User } from '../../models/usuarios/user.entity.js';
import { Juego } from '../../models/juegos/juegos.entity.js';

import { AppDataSource } from '../../config/pg-database/db.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { injectable } from 'inversify';

@injectable()
export class WishlistRepository {
  private userRepository: Repository<User>;
  private juegoRepository: Repository<Juego>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.juegoRepository = AppDataSource.getRepository(Juego);
  }

  async addToWishlist(userId: number, juegoId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['wishlist'],
      });
      const juego = await this.juegoRepository.findOne({
        where: { id: juegoId },
      });

      if (user && juego) {
        const isAlreadyInWishlist = user.wishlist?.some(
          (juego) => juego.id === juegoId
        );
        if (!isAlreadyInWishlist) {
          user.wishlist?.push(juego); // Agrega el juego directamente
          await this.userRepository.save(user);
        }
      } else {
        throw new Error('User or juego not found');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw new DatabaseErrorCustom('Failed to add juego to wishlist', 500);
    }
  }

  async removeFromWishlist(userId: number, juegoId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['wishlist'],
      });

      if (user) {
        user.wishlist = user.wishlist?.filter((juego) => juego.id !== juegoId); // Eliminar el juego por ID
        await this.userRepository.save(user);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw new DatabaseErrorCustom(
        'Failed to remove juego from wishlist',
        500
      );
    }
  }

  async isInWishlist(userId: number, juegoId: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['wishlist'],
      });

      if (user && user.wishlist) {
        return user.wishlist.some((juego) => juego.id === juegoId);
      }
      return false;
    } catch (error) {
      console.error('Error checking wishlist:', error);
      throw new DatabaseErrorCustom('Failed to check wishlist', 500);
    }
  }

  async getWishlistByUserId(userId: number): Promise<Juego[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['wishlist'],
      });

      if (user && user.wishlist) {
        console.log('Wishlist fetched successfully:', user.wishlist);
        return user.wishlist;
      } else {
        throw new Error('Lista de deseos no encontrada para usuario');
      }
    } catch (error) {
      console.error('Problema al buscar wishlist:', error);
      throw new DatabaseErrorCustom('Problema al buscar wishlist', 500);
    }
  }
}
