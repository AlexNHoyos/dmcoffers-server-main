// Importamos la entidad Publisher que representa a nuestros publicadores
import { Publisher } from '../../models/publicadores/publisher.entity.js';

// Importamos el cliente de PostgreSQL
import pool from '../../shared/pg-database/db.js';

import { DatabaseErrorCustom } from '../../middleware/dataBaseError.js';
import { errorEnumPublisher } from '../../middleware/errorHandler.ts/constants/errorConstants.js';

// Definimos la clase PublisherRepository e implementamos la interfaz Repository<Publisher>
export class PublisherRepository {
  public async findAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM pub_game_publisher pub ORDER BY pub.id ASC'
      );
      return result.rows;
    } catch (error) {
      console.error(errorEnumPublisher.publishersNotFounded, error);
      throw new DatabaseErrorCustom(
        errorEnumPublisher.publishersNotFounded,
        500
      );
    }
  }

  public async findOne(id: string): Promise<Publisher | undefined> {
    try {
      const result = await pool.query(
        'SELECT * FROM pub_game_publisher pub WHERE pub.id = $1',
        [id]
      );
      if (result.rows.length > 0) {
        const publisher = result.rows[0] as Publisher;
        return publisher;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(errorEnumPublisher.publisherIndicatedNotFound, error);
      throw new DatabaseErrorCustom(
        errorEnumPublisher.publisherIndicatedNotFound,
        500
      );
    }
  }

  public async create(pub: Publisher) {
    const {
      publishername,
      foundation_date,
      status,
      creationtimestamp,
      creationuser,
      modificationtimestamp,
      modificationuser,
    } = pub;
    const query = `INSERT INTO pub_game_publisher 
    (publishername, foundation_date, status, creationtimestamp, creationuser, modificationtimestamp, modificationuser) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *`;
    const values = [
      publishername,
      foundation_date,
      status,
      creationtimestamp,
      creationuser,
      modificationtimestamp,
      modificationuser,
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
      console.error(errorEnumPublisher.publisherNotCreated, error);
      throw new DatabaseErrorCustom(
        errorEnumPublisher.publisherNotCreated,
        500
      );
    } finally {
      // Liberar el cliente de nuevo al pool
      client.release();
    }
  }

  async update(id: string, pub: Publisher) {
    const { publishername, status } = pub;
    const query = `
    UPDATE pub_game_publisher pub 
      SET 
        publishername = $1,  
        modificationuser = current_user,
        modificationtimestamp = current_timestamp,
        status = $2, 
    WHERE pub.id = $3 
    RETURNING *;`;
    const values = [publishername, status, id];

    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const result = await client.query(query, values);
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(errorEnumPublisher.publisherNotUpdated, error);
      throw new DatabaseErrorCustom(
        errorEnumPublisher.publisherNotUpdated,
        500
      );
    } finally {
      client.release();
    }
  }

  public async delete(id: string): Promise<Publisher | undefined> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const result = await client.query(
        'DELETE FROM pub_game_publisher pub WHERE pub.id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(errorEnumPublisher.publisherNotDeleted, error);
      throw new DatabaseErrorCustom(
        errorEnumPublisher.publisherNotDeleted,
        500
      );
    } finally {
      client.release();
    }
  }
}