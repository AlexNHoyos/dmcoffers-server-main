import { User } from '../../models/usuarios/user.entity.js';
import pool from '../../config/pg-database/db.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumUser } from '../../middleware/errorHandler/constants/errorConstants.js';
import { IUserRepository } from '../interfaces/user/IUserRepository.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';

export class UserRepository implements IUserRepository {
  async findAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM swe_usrapl su ORDER BY id ASC'
      );
      return result.rows;
    } catch (error) {
      console.error(errorEnumUser.usersNotFounded, error);
      throw new DatabaseErrorCustom(errorEnumUser.usersNotFounded, 500);
    }
  }

  async findOne(id: number): Promise<User | undefined> {
    try {
      const result = await pool.query(
        'SELECT * FROM swe_usrapl su WHERE su.id = $1',
        [id]
      );
      if (result.rows.length > 0) {
        const user = result.rows[0] as User;
        return user;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(errorEnumUser.userIndicatedNotFound, error);
      throw new DatabaseErrorCustom(errorEnumUser.userIndicatedNotFound, 500);
    }
  }

  async create(user: User ) {
    const {
      realname,
      surname,
      username,
      birth_date,
      delete_date,
      creationuser,
      creationtimestamp,
      status,
    } = user;
    const query = `INSERT INTO swe_usrapl 
                (realname, surname, username, birth_date, delete_date, creationuser, creationtimestamp, status) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                RETURNING *;`;
    const values = [
      realname,
      surname,
      username,
      birth_date,
      delete_date,
      creationuser,
      creationtimestamp,
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

  async update(id: number, user: User) {
    const { realname, surname, username, birth_date, delete_date, status } =
      user;
    //arma la query de actualizcion
    const query = `
                UPDATE swe_usrapl su
                SET
                    realname = $1,
                    surname = $2,
                    username = $3,
                    birth_date = $4,
                    delete_date = $5,
                    modificationuser = current_user,
                    modificationtimestamp = current_timestamp,
                    status = $6
                WHERE su.id = $7
                RETURNING *;
            `;
    const values = [
      realname,
      surname,
      username,
      birth_date,
      delete_date,
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

  async delete(id: number): Promise<User | undefined> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      
      await client.query('DELETE FROM swe_usrauth ua WHERE ua.id = $1 RETURNING *',[id]);

      // Ejecutar la query de Delete
      const result = await client.query('DELETE FROM swe_usrapl su WHERE su.id = $1 RETURNING *', [id] );

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

  async findByUserName(userName: string): Promise<User | undefined> {
    try {
      const result = await pool.query(
        'SELECT * FROM swe_usrapl su WHERE su.username = $1',
        [userName]
      );
      if (result.rows.length > 0) {
        const user = result.rows[0] as User;
        return user;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(errorEnumUser.userIndicatedNotFound, error);
      throw new DatabaseErrorCustom(errorEnumUser.userIndicatedNotFound, 500);
    }
  }

  async registerUser(user: User): Promise<User> {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insertar el usuario
        const userInsertQuery = `
            INSERT INTO swe_usrapl (realname, surname, username, birth_date, delete_date, creationuser, creationtimestamp, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *;
        `;
        const userValues = [
            user.realname,
            user.surname,
            user.username,
            user.birth_date,
            user.delete_date,
            user.creationuser,
            user.creationtimestamp,
            user.status,
        ];

        const userResult = await client.query(userInsertQuery, userValues);
        const insertedUser = userResult.rows[0];

        // Insertar la autenticación del usuario
        const userAuthInsertQuery = `
            INSERT INTO swe_usrauth (id, creationuser, creationtimestamp, password, salt) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
        `;
        const userAuthValues = [
            insertedUser.id, // Asumiendo que la tabla swe_usrapl tiene un campo id
            insertedUser.creationuser,
            insertedUser.creationtimestamp,

        ];

        const userAuthResult = await client.query(userAuthInsertQuery, userAuthValues);
        const insertedUserAuth = userAuthResult.rows[0];

        await client.query('COMMIT');

        return insertedUser;

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


}






