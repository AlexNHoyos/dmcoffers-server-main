import { Hosting } from "../../models/hosting/hosting.entity";
import pool from '../../shared/pg-database/db';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import {DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError';
import {errorEnumHosting } from '../../middleware/errorHandler/constants/errorConstants';



export class HostingRepository implements IBaseRepository<Hosting>{

    async findAll() {
        try {
            const result = await pool.query('SELECT * FROM hs_hosting_service hs ORDER BY hs.id ASC')
            return result.rows;
        } catch (error) {
            console.error(errorEnumHosting.hostingsNotFounded, error);
            throw  new DatabaseErrorCustom(errorEnumHosting.hostingsNotFounded, 500);
        }
    }

    async findOne(id: number): Promise<Hosting | undefined> {
        try {
            const result = await pool.query('SELECT * FROM hs_hosting_service hs WHERE hs.id = $1', [id]);
            if (result.rows.length > 0) {
                const hosting = result.rows[0] as Hosting;
                return hosting;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error(errorEnumHosting.hostingIndicatedNotFound, error);
            throw  new DatabaseErrorCustom(errorEnumHosting.hostingIndicatedNotFound, 500);
        }
    }

    async create(hosting: Hosting) {
        const { name, creationuser, creationtimestamp, status } = hosting;
        const query = 
                `INSERT INTO hs_hosting_service
                (name, creationuser, creationtimestamp, status) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *;`;
        const values = [name, creationuser, creationtimestamp, status];
        
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
            console.error(errorEnumHosting.hostingNotCreated, error);
            throw  new DatabaseErrorCustom(errorEnumHosting.hostingNotCreated, 500);
        } finally {
            // Liberar el cliente de nuevo al pool
            client.release();
        }
    }

    async update(id: number, hosting: Hosting) {
            const { name,  status } = hosting;
            //arma la query de actualizcion
            const query = 
            `UPDATE hs_hosting_service hs
                SET
                    name = $1,
                    modificationuser = current_user,
                    modificationtimestamp = current_timestamp,
                    status = $2
                WHERE hs.id = $3
                RETURNING *;`;
            const values = [name, status, id];
    
            const client = await pool.connect();
    
            try {
                await client.query('BEGIN');
                const result = await client.query(query, values);
                await client.query('COMMIT');
                return result.rows[0];
            } catch (error) {
                await client.query('ROLLBACK');
                console.error(errorEnumHosting.hostingNotUpdated, error);
                throw  new DatabaseErrorCustom(errorEnumHosting.hostingNotUpdated, 500);
            } finally {
                client.release();
            }
        }

    async delete(id: number): Promise<Hosting | undefined> {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');

            // Ejecutar la query de Delete
            const result = await client.query("DELETE FROM hs_hosting_service hs WHERE hs.id = $1 RETURNING *", [id]);
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(errorEnumHosting.hostingNotDeleted, error);
            throw  new DatabaseErrorCustom(errorEnumHosting.hostingNotDeleted, 500);
        } finally {
            client.release();
        }
    }
}