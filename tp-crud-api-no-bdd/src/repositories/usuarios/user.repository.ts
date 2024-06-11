import { User } from "../../models/usuarios/user.entity.js";
import { Repository } from "../../shared/testRepository";
const pool = require('./db');

export class UserRepository implements Repository<User> {

    async findAll() {
        try {
            const result = await pool.query('SELECT * FROM swe_usrapl su ORDER BY id ASC')
            return result.rows;
        } catch (error) {
            console.error("Error al obtener los usuarios", error);
            throw error;
        }
    }

    async findOne(id: string) {
        try {
            const result = await pool.query('SELECT * FROM swe_usrapl su WHERE su.id = $1');
            return result;
        } catch (error) {
            console.error("Error al obtener el usuario indicado", error);
            throw error;
        }
    }

    async create(user: User) {
        const { realname, surname, username, birth_date, delete_date, creationuser, creationtimestamp, status } = user;
        const query = 'INSERT INTO swe_usrapl (realname, surname, username, birth_date, delete_date, creationuser, creationtimestamp, status) VALUE(user.realname, user.surname, user.username, user.birth_date, user.delete_date, creationuser, creationtimestamp, status);';
        const values = [realname, surname, username, birth_date, delete_date, creationuser, creationtimestamp, status];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error al crear el usuario", error);
            throw error;
        }
    }

    async update(id: string, user: User) {
        const { realname, surname, username, birth_date, delete_date, status } = user;
        const query = 'UPDATE swe_usrapl su SET realname = $1, surname = $2, username = $3, birth_date = $4, delete_date = $5, creationuser = current_user, creationtimestamp = current_timestamp, modificationuser = current_user, modificationtimestamp = current_timestamp, status = status RETURNING *;';
        const values = [realname, surname, username, birth_date, delete_date, status]

        try {
            const result = await pool.query(query, values)
            return result.rows[0];
        } catch (error) {
            console.error("Error al actualizar usuario", error)
            throw error;
        }
    }

    async delete(id: string): Promise<User | undefined> {
        try {
            const result = await pool.query("DELETE FROM swe_usrapl su WHERE si.id = $1 RETURNING *", [id]);
            return result.rows[0];
        } catch (error) {
            console.error("Error al eliminar usuario")
            throw error;
        }
    }
}