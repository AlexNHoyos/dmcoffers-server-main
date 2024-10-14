// src/repositories/usuarios/user.repository.ts
import {  Repository } from 'typeorm';
import { AppDataSource } from '../../config/pg-database/db.js';
import { User } from '../../models/usuarios/user.entity.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';
import { IUserRepository } from '../interfaces/user/IUserRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumUser } from '../../middleware/errorHandler/constants/errorConstants.js';
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
  private userRepo: Repository<User>;
  private userAuthRepo: Repository<UserAuth>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.userAuthRepo = AppDataSource.getRepository(UserAuth);
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepo.find();
    } catch (error) {
      console.error(errorEnumUser.usersNotFounded, error);
      throw new DatabaseErrorCustom(errorEnumUser.usersNotFounded, 500);
    }
  }

  async findOne(id: number): Promise<User | undefined> {
    try {
      const user = await this.userRepo.findOneBy({id});
      return user?? undefined;
    } catch (error) {
      console.error(errorEnumUser.userIndicatedNotFound, error);
      throw new DatabaseErrorCustom(errorEnumUser.userIndicatedNotFound, 500);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const newUser = this.userRepo.create(user);
      return await this.userRepo.save(newUser);
    } catch (error) {
      console.error(errorEnumUser.userNotCreated, error);
      throw new DatabaseErrorCustom(errorEnumUser.userNotCreated, 500);
    }
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    try {

      const existinguser = await this.userRepo.findOneBy({ id });
      if (!existinguser) {
        throw new DatabaseErrorCustom(errorEnumUser.userIndicatedNotFound, 404);
      }
      await this.userRepo.update(id, user);
      
      return await this.userRepo.findOneByOrFail({id});
    } catch (error) {
      console.error(errorEnumUser.userNotUpdated, error);
      throw new DatabaseErrorCustom(errorEnumUser.userNotUpdated, 500);
    }
  }

  async delete(id: number): Promise<User | undefined> {
    try {
      const userToRemove = await this.findOne(id);
      if (!userToRemove) {
        return undefined;
      }
      await this.userRepo.remove(userToRemove);
      return userToRemove;
    } catch (error) {
      console.error(errorEnumUser.userNotDeleted, error);

      throw new DatabaseErrorCustom(errorEnumUser.userNotDeleted, 500);
    }
  }

  async findByUserName(userName: string): Promise<User | undefined> {
    try {
      const user =  await this.userRepo.findOne({ where: { username: userName } });
      return user?? undefined;
    } catch (error) {
      console.error(errorEnumUser.userIndicatedNotFound, error);
      throw new DatabaseErrorCustom(errorEnumUser.userIndicatedNotFound, 404);
    }
  }

  async registerUser(user: User): Promise<User> {
    // Asignar el objeto `UserAuth` al `User` antes de iniciar la transacción

  
    const queryRunner = this.userRepo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
  
    try {
      // Guardar el usuario con la entidad relacionada
      const savedUser = await queryRunner.manager.save(User, user);
  
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(errorEnumUser.userNotCreated, error);
      throw new DatabaseErrorCustom(errorEnumUser.userNotCreated, 500);
    } finally {
      await queryRunner.release();
    }
  }
  
}
