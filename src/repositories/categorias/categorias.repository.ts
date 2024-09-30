// Importamos la entidad Publisher que representa a nuestros publicadores
import { Categorias } from '../../models/categorias/categorias.entity.js';

// Importamos el cliente de PostgreSQL
import pool from '../../shared/pg-database/db.js';

import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumCategories, errorEnumPublisher } from '../../middleware/errorHandler/constants/errorConstants.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';


// Definimos la clase PublisherRepository e implementamos la interfaz Repository<Publisher>
export class CategoriasRepository implements IBaseRepository<Categorias>{
    public async findAll() {
      try {
        const result = await pool.query(
          'SELECT * FROM pub_category pub ORDER BY pub.id ASC'
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
  
    public async findOne(id: number): Promise<Categorias | undefined> {
      try {
        const result = await pool.query(
          'SELECT * FROM pub_category pub WHERE pub.id = $1',
          [id]
        );
        if (result.rows.length > 0) {
          const publisher = result.rows[0] as Categorias;
          return publisher;
        } else {
          return undefined;
        }
      } catch (error) {
        console.error(errorEnumCategories.categoriesNotFounded, error);
        throw new DatabaseErrorCustom(
            errorEnumCategories.categoriesNotFounded,
          500
        );
      }
    }
  
    public async create(pub: Categorias) {
      const {
        descripcion,
        creationtimestamp,
        creationuser,
        modificationtimestamp,
        modificationuser,
      } = pub;
      const query = `INSERT INTO pub_category 
      (description, creationtimestamp, creationuser, modificationtimestamp, modificationuser) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`;
      const values = [
        descripcion,
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
      const {  } = cat;
      const query = `
      UPDATE pub_game_publisher pub 
        SET 
          publishername = $1,  
          modificationuser = current_user,
          modificationtimestamp = current_timestamp,
          status = $2, 
      WHERE pub.id = $3 
      RETURNING *;`;
      const values = [, id];
  
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
  
    public async delete(id: number): Promise<Categorias| undefined> {
      const client = await pool.connect();
  
      try {
        await client.query('BEGIN');
  
        const result = await client.query(
          'DELETE FROM pub_category pub WHERE pub.id = $1 RETURNING *',
          [id]
        );
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

