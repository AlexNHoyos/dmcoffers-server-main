import { Repository } from 'typeorm';

import { User } from '../../models/usuarios/user.entity.js';
import { Juego } from '../../models/juegos/juegos.entity.js';

import { AppDataSource } from '../../config/pg-database/db.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { injectable } from 'inversify';

@injectable()
export class BibliotecaRepository {
  private userRepository: Repository<User>;
  private juegoRepository: Repository<Juego>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.juegoRepository = AppDataSource.getRepository(Juego);
  }

  async addToBiblioteca(userId: number, juegoId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['biblioteca'],
      });
      const juego = await this.juegoRepository.findOne({
        where: { id: juegoId },
      });

      if (!user || !juego) throw new Error('User or game not found');

      const alreadyInBiblioteca = user.biblioteca?.some(j => j.id === juegoId);

      if (alreadyInBiblioteca) {
        throw new Error('Este juego ya fue comprado');
      }

      user.biblioteca?.push(juego);
      await this.userRepository.save(user);
    } catch (error) {
      console.error('Error adding to Biblioteca:', error);
      throw new DatabaseErrorCustom('Failed to add juego to Biblioteca', 500);
    }
  }

  async removeFromBiblioteca(userId: number, juegoId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['biblioteca'],
      });

      if (user) {
        user.biblioteca = user.biblioteca?.filter(juego => juego.id !== juegoId);
        await this.userRepository.save(user);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error removing from Biblioteca:', error);
      throw new DatabaseErrorCustom('Failed to remove juego from Biblioteca', 500);
    }
  }

  async isInBiblioteca(userId: number, juegoId: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['biblioteca'],
      });

      if (user?.biblioteca) {
        return user.biblioteca.some(juego => juego.id === juegoId);
      }
      return false;
    } catch (error) {
      console.error('Error checking Biblioteca:', error);
      throw new DatabaseErrorCustom('Failed to check Biblioteca', 500);
    }
  }

  async getBibliotecaByUserId(userId: number): Promise<Juego[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['biblioteca'],
      });

      if (user?.biblioteca) {
        return user.biblioteca;
      } else {
        throw new Error('Biblioteca no encontrada para usuario');
      }
    } catch (error) {
      console.error('Problema al buscar biblioteca:', error);
      throw new DatabaseErrorCustom('Problema al buscar biblioteca', 500);
    }
  }
}