// Importamos el módulo 'express' para crear un servidor web
// Importamos el enrutador para las rutas relacionadas con los editores
import express, { Request, Response } from 'express';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';

import errorHandler from './middleware/errorHandler/errorHandler.js';

import 'reflect-metadata';

import swaggerDocs from './swagger';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './config/dependency-injection/inversify.config.js';

// Inicializar el servidor con Inversify y Express
const server = new InversifyExpressServer(container);

server.setConfig(async (app) => {
  // Configuramos Express para que pueda analizar solicitudes con formato JSON
  app.use(express.json());
  app.use(cors());

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Si tu carpeta "uploads" está en la raíz del proyecto
  app.use('/uploads', express.static(path.resolve('uploads')));

  //app.use(commonRouter);

  //ruta para utilizar documentacion de swagger
  // Solo cargar Swagger si no estamos en el entorno de prueba para UnitTesting o Integration Testing
  let swaggerDocs: any;
  if (process.env.NODE_ENV !== 'test') {
    swaggerDocs = (await import('./swagger.js')).default;
  }
  if (process.env.NODE_ENV !== 'test' && swaggerDocs) {
    swaggerDocs(app);
  }
});

server.setErrorConfig((app) => {
  app.use(errorHandler); // Middleware para manejar errores
  // Ruta para manejar 404
  app.use((_: Request, res: Response) => {
    return res.status(404).send({ message: 'Recurso no encontrado' });
  });
});

const appConfigured = server.build(); // Construye la app con Inversify

export default appConfigured;