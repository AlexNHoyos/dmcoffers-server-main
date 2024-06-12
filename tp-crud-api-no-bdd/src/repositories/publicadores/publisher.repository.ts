// Importamos el cliente de PostgreSQL
import pool from '../../shared/pg-database/db';

// Importamos la interfaz Repository desde nuestro módulo compartido
import { Repository } from '../../shared/repository.js';

// Importamos la entidad Publisher que representa a nuestros publicadores
import { Publisher } from '../../models/publicadores/publisher.entity.js';

// Definimos la clase PublisherRepository e implementamos la interfaz Repository<Publisher>
export class PublisherRepository implements Repository<Publisher> {
  public async findAll(): Promise<Publisher[] | undefined> {
    try {
      const queryResult = await pool.query('SELECT * FROM pub_game_publisher');
      return queryResult.rows;
    } catch (error: any) {
      throw new Error('Error al obtener los publicadores: ' + error.message);
    }
  }

  public async findOne(pub: { id: string }): Promise<Publisher | undefined> {
    try {
      const queryResult = await pool.query(
        'SELECT * FROM pub_game_publisher WHERE id = $1',
        [pub.id]
      );
      return queryResult.rows[0];
    } catch (error: any) {
      throw new Error('Error al obtener el publicador: ' + error.message);
    }
  }

  public async add(pub: Publisher): Promise<Publisher | undefined> {
    try {
      const {
        publishername,
        foundation_date,
        dissolution_date,
        status,
        creationtimestamp,
        creationuser,
        modificationtimestamp,
        modificationuser,
      } = pub;
      const queryResult = await pool.query(
        'INSERT INTO pub_game_publisher (publishername, foundation_date, dissolution_date, status, creationtimestamp, creationuser, modificationtimestamp, modificationuser) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [
          publishername,
          foundation_date,
          dissolution_date,
          status,
          creationtimestamp,
          creationuser,
          modificationtimestamp,
          modificationuser,
        ]
      );
      return queryResult.rows[0];
    } catch (error: any) {
      throw new Error('Error al agregar el publicador: ' + error.message);
    }
  }

  public async update(pub: Publisher): Promise<Publisher | undefined> {
    try {
      const {
        id,
        publishername,
        foundation_date,
        dissolution_date,
        status,
        creationtimestamp,
        creationuser,
        modificationtimestamp,
        modificationuser,
      } = pub;
      const queryResult = await pool.query(
        'UPDATE pub_game_publisher SET publishername = $1, foundation_date = $2, dissolution_date = $3, status = $4, creationtimestamp = $5, creationuser = $6, modificationtimestamp = $7, modificationuser = $8 WHERE id = $9 RETURNING *',
        [
          publishername,
          foundation_date,
          dissolution_date,
          status,
          creationtimestamp,
          creationuser,
          modificationtimestamp,
          modificationuser,
          id,
        ]
      );
      return queryResult.rows[0];
    } catch (error: any) {
      throw new Error('Error al actualizar el publicador: ' + error.message);
    }
  }

  public async delete(pub: { id: string }): Promise<Publisher | undefined> {
    try {
      const queryResult = await pool.query(
        'DELETE FROM pub_game_publisher WHERE id = $1 RETURNING *',
        [pub.id]
      );
      return queryResult.rows[0];
    } catch (error: any) {
      throw new Error('Error al eliminar el publicador: ' + error.message);
    }
  }
}
