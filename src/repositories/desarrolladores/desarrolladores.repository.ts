// Importamos la entidad developer que representa a nuestros publicadores
import { Desarrollador } from '../../models/desarrolladores/desarrolladores.entity.js';

// Importamos el cliente de PostgreSQL
import pool from '../../config/pg-database/db.js';

import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumDesarrollador } from '../../middleware/errorHandler/constants/errorConstants.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';

// Definimos la clase DesarrolladorRepository e implementamos la interfaz Repository<Desarrollador>
export class DesarrolladoresRepository implements IBaseRepository<Desarrollador> {
    public async findAll() {
        try {
            const result = await pool.query(
                'SELECT * FROM pub_game_developer dev ORDER BY dev.id ASC'
            );
            return result.rows;
        } catch (error) {
            console.error(errorEnumDesarrollador.desarrolladorNotFounded, error);
            throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorNotFounded, 500);
        }
    }

    public async findOne(id: number): Promise<Desarrollador | undefined> {
        try {
            const result = await pool.query(
                'SELECT * FROM pub_game_developer dev WHERE dev.id = $1',
                [id]
            );
            if (result.rows.length > 0) {
                const desarrollador = result.rows[0] as Desarrollador;
                return desarrollador;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error(errorEnumDesarrollador.desarrolladorIndicatedNotFound, error);
            throw new DatabaseErrorCustom( errorEnumDesarrollador.desarrolladorIndicatedNotFound, 500);
        }
    }

    public async create(dev: Desarrollador) {
        const {
            developername,
            foundation_date,
            dissolution_date,
            status,
            creationtimestamp,
            creationuser,
            modificationtimestamp,
            modificationuser,
        } = dev;
        const query = `INSERT INTO pub_game_developer 
    (developername, foundation_date, dissolution_date, status, creationtimestamp, creationuser, modificationtimestamp, modificationuser)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *`;
        const values = [
            developername,
            foundation_date,
            dissolution_date,
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
            console.error(errorEnumDesarrollador.desarrolladorNotCreated, error);
            throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorNotCreated, 500);
        } finally {
            // Liberar el cliente de nuevo al pool
            client.release();
        }
    }

    async update(id: number, dev: Desarrollador) {
        const { developername, status } = dev;
        const query = `
    UPDATE pub_game_developer 
      SET 
        developername = $1,  
        modificationuser = current_user,
        modificationtimestamp = current_timestamp,
        status = $2 
    WHERE id = $3 
    RETURNING *;`;

        const values = [developername, status, id];

        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const result = await client.query(query, values);
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(errorEnumDesarrollador.desarrolladorNotUpdated, error);
            throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorNotUpdated, 500);
        } finally {
            client.release();
        }
    }

    public async delete(id: number): Promise<Desarrollador | undefined> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Eliminamos el alias 'dev' del DELETE
            const result = await client.query(
                'DELETE FROM pub_game_developer WHERE id = $1 RETURNING *',
                [id]
            );

            if (result.rows.length > 0) {
                await client.query('COMMIT');
                return result.rows[0];
            } else {
                await client.query('ROLLBACK');
                return undefined; // No se encontró el registro
            }
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(errorEnumDesarrollador.desarrolladorNotDeleted, error);
            throw new DatabaseErrorCustom(errorEnumDesarrollador.desarrolladorNotDeleted, 500);
        } finally {
            client.release();
        }
    }

}
