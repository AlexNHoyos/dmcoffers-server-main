// Importamos el módulo 'express' para crear un servidor web
// Importamos el enrutador para las rutas relacionadas con los editores
import express, { Request, Response } from 'express';
import cors from 'cors';

import errorHandler from './middleware/errorHandler/errorHandler.js';

import swaggerDocs from './swagger.js';
import commonRouter from './routes/common.routes.js';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './config/dependency-injection/inversify.config.js';

// Inicializar el servidor con Inversify y Express
const server = new InversifyExpressServer(container);

// Define origins based on environment
const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? ['https://dmcoffers-client-q3x1.onrender.com'] 
    : ['http://localhost:4200']; // Permitir localhost para desarrollo

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin || '') !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

server.setConfig((app) => {
  // Configuramos Express para que pueda analizar solicitudes con formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  //app.use(commonRouter);

  //ruta para utilizar documentacion de swagger
  swaggerDocs(app);
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
