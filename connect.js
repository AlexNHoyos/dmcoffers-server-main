/* 
Este archivo configura la conexion a la base de datos de 
Postgres, utilizando las variables de entorno creadas en 
el archivo .env en el directorio del proyecto.
*/
const { Client } = require('pg');
require('dotenv').config();

(async () => {
    const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: true,
    });
    await client.connect();
    const res = await client.query('SELECT $1::text as connected', ['Conexion con DB correcta']);
    crossOriginIsolated.log(res.rows[0].connected);
    await client.end();
})();