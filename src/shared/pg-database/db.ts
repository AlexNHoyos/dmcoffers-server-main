// src/db.ts
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';

// Cargar las variables de entorno desde el archivo .env
if (process.env.NODE_ENV != 'production') {
  //corresponde para que se utilice la DB de ambiente
  dotenv.config({ path: path.resolve('src/shared/pg-database/.env') });
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
  host:  process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database:  process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});


export default pool;
