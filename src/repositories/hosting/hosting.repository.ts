import { Hosting } from "../../models/hosting/hosting.entity.js";
import pool from '../../shared/pg-database/db.js';


export class HostingRepository {

    async findAll() {
        try {
            const result = await pool.query('SELECT * FROM hs_hosting_service hs ORDER BY hs.id ASC')
            return result.rows;
        } catch (error) {
            console.error("Error al obtener los Hostings", error);
            throw error;
        }
    }

    async findOne(id: string): Promise<Hosting | undefined> {
        try {
            const result = await pool.query('SELECT * FROM hs_hosting_service hs WHERE hs.id = $1', [id]);
            if (result.rows.length > 0) {
                const hosting = result.rows[0] as Hosting;
                return hosting;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error("Error al obtener el hosting indicado", error);
            throw error;
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
            console.error("Error al crear el hosting", error);
            throw error;
        } finally {
            // Liberar el cliente de nuevo al pool
            client.release();
        }
    }

    async update(id: string, hosting: Hosting) {
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
                console.error("Error al actualizar el Hosting", error);
                throw error;
            } finally {
                client.release();
            }
        }

    async delete(id: string): Promise<Hosting | undefined> {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');

            // Ejecutar la query de Delete
            const result = await client.query("DELETE FROM hs_hosting_service hs WHERE hs.id = $1 RETURNING *", [id]);
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Error al eliminar Hosting", error);
            throw error;
        } finally {
            client.release();
        }
    }
}