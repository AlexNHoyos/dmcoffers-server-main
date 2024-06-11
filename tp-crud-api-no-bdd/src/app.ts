// Importamos el módulo 'express' para crear un servidor web
// Importamos el enrutador para las rutas relacionadas con los editores
import express from 'express';
import userRouter from './routes/usuarios/user.routes.js';
import { publisherRouter } from './routes/publicadores/publisher.routes.js';
import { categoriaRouter } from './routes/categorias/categorias.routes.js';

// Creamos una instancia de la aplicación Express

const app = express();
// Configuramos Express para que pueda analizar solicitudes con formato JSON
app.use(express.json());


app.use('/api/users', userRouter);
app.use('/api/publishers', publisherRouter);
app.use('/api/categories', categoriaRouter);


// Middleware para manejar solicitudes a rutas no encontradas
app.use((_, res) => {

  return res.status(404).send({ message: 'Recurso no encontrado' });

  // Enviamos una respuesta con estado 404 (Recurso no encontrado)
  // y un mensaje en formato JSON

});

// Iniciamos el servidor Express en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/');
});

// Para correr esto hay que hacer npm run start:dev en terminal
