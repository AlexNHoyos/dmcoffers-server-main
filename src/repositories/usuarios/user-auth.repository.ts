import { UserAuth } from '../../models/auth/user-auth.entity';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import pool from '../../shared/pg-database/db';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError';
import { errorEnumUser } from '../../middleware/errorHandler/constants/errorConstants';

export class UserAuthRepository implements IBaseRepository<UserAuth> {
  async findAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM swe_usrauth au ORDER BY au ASC'
      );
      return result.rows;
    } catch (error) {
      console.error(errorEnumUser.usersNotFounded, error);
      throw new DatabaseErrorCustom(errorEnumUser.usersNotFounded, 500);
    }
  }

  async findOne(id: number): Promise<UserAuth | undefined> {
    try {
      const result = await pool.query(
        'SELECT * FROM swe_usrauth au WHERE au.id = $1',
        [id]
      );
      if (result.rows.length > 0) {
        const user = result.rows[0] as UserAuth;
        return user;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(errorEnumUser.userIndicatedNotFound, error);
      throw new DatabaseErrorCustom(errorEnumUser.userIndicatedNotFound, 500);
    }
  }

  async create(user: UserAuth) {
    const {
      username,
      password,
      creationuser,
      creationtimestamp,
      salt,
      status,
    } = user;
    const query = `INSERT INTO swe_usrauth 
                ( username, password, creationuser, creationtimestamp, salt, status) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *;`;
    const values = [
      username,
      password,
      creationuser,
      creationtimestamp,
      salt,
      status,
    ];

    const client = await pool.connect();

    try {
      // Iniciar una transacción
      await client.query('BEGIN');

      const result = await client.query(query, values);

      // Hacer commit de la transacción
      await client.query('COMMIT');

      return result.rows[0];
    } catch (error) {
      // Hacer rollback de la transacción en caso de error
      await client.query('ROLLBACK');
      console.error(errorEnumUser.userNotCreated, error);
      throw new DatabaseErrorCustom(errorEnumUser.userNotCreated, 500);
    } finally {
      // Liberar el cliente de nuevo al pool
      client.release();
    }
  }

  async update(id: number, user: UserAuth) {
    const {  username,password, salt, status } =
      user;
    //arma la query de actualizcion
    const query = `
                UPDATE swe_usrauth ua
                SET
                    username = $1,
                    password = $2,
                    salt = $3,
                    modificationuser = current_user,
                    modificationtimestamp = current_timestamp,
                    status = $4,
                WHERE ua.id = $5
                RETURNING *;
            `;
    const values = [
      username,
      password,
      salt,
      status,
      id,
    ];

    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const result = await client.query(query, values);
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(errorEnumUser.userNotUpdated, error);
      throw new DatabaseErrorCustom(errorEnumUser.userNotUpdated, 500);
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<UserAuth | undefined> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Ejecutar la query de Delete
      const result = await client.query(
        'DELETE FROM swe_usrapl su WHERE su.id = $1 RETURNING *',
        [id]
      );
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(errorEnumUser.userNotDeleted, error);
      throw new DatabaseErrorCustom(errorEnumUser.userNotDeleted, 500);
    } finally {
      client.release();
    }
  }
}
