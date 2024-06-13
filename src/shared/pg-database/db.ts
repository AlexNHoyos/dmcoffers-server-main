// src/db.ts
import  pkg  from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Cargar las variables de entorno desde el archivo .env
if (process.env.NODE_ENV != 'production') { //corresponde para que se utilice la DB de ambiente
    dotenv.config({ path: path.resolve('src/shared/pg-database/.env') });
}
const { Pool } = pkg;



const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
});

pool.query('SELECT 1', (err, res) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos exitosa:', res);
    }
    // pool.end();
  });

export default pool;
