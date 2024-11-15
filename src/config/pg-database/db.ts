// src/db.ts
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';
import { Hosting } from '../../models/hosting/hosting.entity.js';
import { User } from '../../models/usuarios/user.entity.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';
import { Categorias } from '../../models/categorias/categorias.entity.js';
import { Publisher } from '../../models/publicadores/publisher.entity.js';
import { SupportTicket } from '../../models/support-ticket/support-ticket.entity.js';
import { Desarrollador } from '../../models/desarrolladores/desarrolladores.entity.js';
import { UserRolApl } from '../../models/usuarios/user-rol-apl.entity.js';
import { RolApl } from '../../models/roles/rol-apl.entity.js';
import { Juego } from '../../models/juegos/juegos.entity.js';
import { Oferta } from '../../models/ofertas/ofertas.entity.js';
import { Precio } from '../../models/juegos/precios.entity.js';

// Cargar las variables de entorno desde el archivo .env
if (process.env.NODE_ENV != 'production') {
  //corresponde para que se utilice la DB de ambiente
  dotenv.config({ path: path.resolve('src/config/pg-database/.env') });
}
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false, // tiene que estar en true momentaneamente se deja en false por cuestiones funcionales
  //logging: true,
  entities: [
    process.env.NODE_ENV === 'development'
      ? 'src/models/**/*.ts' // en desarrollo
      : 'dist/models/**/*.js', // después de compilar
  ],
  migrations: ['src/migrations/**/*.js'],
  subscribers: ['src/subscribers/**/*.js'],
});

export default pool;
