import pool from '../../config/pg-database/db.js';
import { IBaseRepository } from '../interfaces/IBaseRepository.js';
import { DatabaseErrorCustom } from '../../middleware/errorHandler/dataBaseError.js';
import { errorEnumHostingPublisher } from '../../middleware/errorHandler/constants/errorConstants.js';
import { HostingPublisher } from "../../models/hosting/hosting-publisher.entity.js";
import { injectable } from 'inversify';


@injectable()
export class HostingPublisherRepository implements IBaseRepository<HostingPublisher> {

    async findAll(): Promise<HostingPublisher[]> {
        try {
            const result = await pool.query('SELECT * FROM hs_publisher_service hs ORDER BY hs.id ASC')
            return result.rows;
        } catch (error) {
            console.error(errorEnumHostingPublisher.hostingPublisherNotFounded, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherNotFounded, 500);
        }
    }

    async findOne(id: number): Promise<HostingPublisher | undefined> {
        try {
            const result = await pool.query('SELECT * FROM hs_publisher_service hs WHERE hs.id = $1', [id]);
            if (result.rows.length > 0) {
                const hostingpublisher = result.rows[0] as HostingPublisher;
                return hostingpublisher;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error(errorEnumHostingPublisher.hostingPublisherIndicatedNotFound, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherIndicatedNotFound, 500);
        }
    }

    async create(hostingpublisher: HostingPublisher) {
        const { publisher, hosting, storageType, storageAmmount, ramAmmount, cpuSpecs, uptimePercentage } = hostingpublisher;
        const query =
            `INSERT hs_publisher_service
                (id_publisher, id_hosting_service, storage_type, storage_ammount, ram_ammount, cpu_specs, uptime_percentage) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING *;`;
        const values = [publisher, hosting, storageType, storageAmmount, ramAmmount, cpuSpecs, uptimePercentage];

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
            console.error(errorEnumHostingPublisher.hostingPublisherNotCreated, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherNotCreated, 500);
        } finally {
            // Liberar el cliente de nuevo al pool
            client.release();
        }
    }

    async update(id: number, hostingpublisher: HostingPublisher) {
        const { publisher, hosting, storageType, storageAmmount, ramAmmount, cpuSpecs, uptimePercentage } = hostingpublisher;
        //arma la query de actualizcion
        const query =
            `UPDATE hs_hosting_service hs
                SET
                    id_publisher = $1,
                    id_hosting_service = $2,
                    storage_type = $3,
                    storage_ammount = $4,
                    ram_ammount = $5,
                    cpu_specs = $6
                    uptime_percentage = $ 7                    
                WHERE hs.id = $8
                RETURNING *;`;
        const values = [publisher, hosting, storageType, storageAmmount, ramAmmount, cpuSpecs, uptimePercentage, id];

        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const result = await client.query(query, values);
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(errorEnumHostingPublisher.hostingPublisherNotUpdated, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherNotUpdated, 500);
        } finally {
            client.release();
        }
    }

    async delete(id: number): Promise<HostingPublisher | undefined> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Ejecutar la query de Delete
            const result = await client.query("DELETE FROM hs_publisher_service hs WHERE hs.id = $1 RETURNING *", [id]);
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(errorEnumHostingPublisher.hostingPublisherNotDeleted, error);
            throw new DatabaseErrorCustom(errorEnumHostingPublisher.hostingPublisherNotDeleted, 500);
        } finally {
            client.release();
        }
    }
}