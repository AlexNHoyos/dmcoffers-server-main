// Importamos la entidad Categorias que representa a nuestras categorias
import { Categorias } from '../../models/categorias/categorias.entity.js';

// Importamos el cliente de PostgreSQL
import pool from '../../config/pg-database/db.js';

import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumCategories } from '../../middleware/errorHandler/constants/errorConstants.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';

export class CategoriasRepository implements IBaseRepository<Categorias> {
  async findAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM pub_category pc ORDER BY pc.id ASC'
      );
      return result.rows;
    } catch (error) {
      console.error(errorEnumCategories.categoriesNotFounded, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoriesNotFounded,
        500
      );
    }
  }

  async findOne(id: number): Promise<Categorias | undefined> {
    try {
      const result = await pool.query(
        'SELECT * FROM pub_category pc WHERE pc.id = $1',
        [id]
      );
      if (result.rows.length > 0) {
        const categoria = result.rows[0] as Categorias;
        return categoria;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(errorEnumCategories.categoryIndicatedNotFound, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoryIndicatedNotFound,
        500
      );
    }
  }

  async create(cat: Categorias) {
    const {
      description,
      creationtimestamp,
      creationuser,
      modificationtimestamp,
      modificationuser,
    } = cat;
    const query = `INSERT INTO pub_category
    (description, creationtimestamp, creationuser, modificationtimestamp, modificationuser) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;
    const values = [
      description,
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
      console.error(errorEnumCategories.categoryNotCreated, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoryNotCreated,
        500
      );
    } finally {
      // Liberar el cliente de nuevo al pool
      client.release();
    }
  }

  async update(id: number, cat: Categorias) {
    const { description, modificationuser } = cat;
    const query = `
    UPDATE pub_category pc 
      SET 
        description = $1,
        modificationuser = $2,
        modificationtimestamp = current_timestamp
    WHERE pc.id = $3 
    RETURNING *;`;
    const values = [description, modificationuser, id];

    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const result = await client.query(query, values);
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(errorEnumCategories.categoryNotUpdated, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoryNotUpdated,
        500
      );
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<Categorias | undefined> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const result = await client.query(
        'DELETE FROM pub_category pc WHERE pc.id = $1 RETURNING *',
        [id]
      );
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(errorEnumCategories.categoryNotDeleted, error);
      throw new DatabaseErrorCustom(
        errorEnumCategories.categoryNotDeleted,
        500
      );
    } finally {
      client.release();
    }
  }
}
