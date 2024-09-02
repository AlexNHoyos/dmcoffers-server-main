// Importamos el módulo 'express' para crear un servidor web
// Importamos el enrutador para las rutas relacionadas con los editores
import express, { Request, Response } from 'express';
import errorHandler from './middleware/errorHandler/errorHandler.js';

import swaggerDocs from './swagger.js';
import commonRouter from './routes/common.routes.js';


// Creamos una instancia de la aplicación Express

const app = express();
// Configuramos Express para que pueda analizar solicitudes con formato JSON
app.use(express.json());

app.use(commonRouter);


app.use(errorHandler);

//ruta para utilizar documentacion de swagger

swaggerDocs(app)

// Middleware para manejar solicitudes a rutas no encontradas
app.use((_, res) => {
  return res.status(404).send({ message: 'Recurso no encontrado' });

  // Enviamos una respuesta con estado 404 (Recurso no encontrado)
  // y un mensaje en formato JSON
});


export default app;

