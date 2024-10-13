import {  Repository } from 'typeorm';
import { AppDataSource } from '../../config/pg-database/db.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumUser } from '../../middleware/errorHandler/constants/errorConstants.js';
import { injectable } from 'inversify';
import { UserRolApl } from '../../models/usuarios/user-rol-apl.entity.js';

@injectable()
export class UserRolRepository {
  private _userRepo: Repository<UserRolApl>;

  constructor() {
    this._userRepo = AppDataSource.getRepository(UserRolApl);
  }

  async create(userRolApl: UserRolApl): Promise<UserRolApl> {
    try {
      // TypeORM gestiona automáticamente la transacción aquí
      const createdUserRolApl = await this._userRepo.save(userRolApl);
      return createdUserRolApl;
    } catch (error) {
      console.error(errorEnumUser.userNotCreated, error);
      throw new DatabaseErrorCustom(errorEnumUser.userNotCreated, 500);
    }
  }

}