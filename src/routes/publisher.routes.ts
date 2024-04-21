// Importamos el enrutador desde Express
import { Router } from 'express';

// Importamos los controladores de las operaciones CRUD para los editores
import {
  sanitizePublisherInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/publishers.controller.js';

// Creamos una instancia del enrutador de Express
export const publisherRouter = Router();

// Definimos las rutas y los controladores asociados

publisherRouter.get('/', findAll);
publisherRouter.get('/:id', findOne);

// Ruta para agregar un nuevo editor
// Utilizamos el middleware 'sanitizePublisherInput' para limpiar y validar la entrada del usuario
publisherRouter.post('/', sanitizePublisherInput, add);

// Ruta para actualizar un editor existente por su ID
// También utilizamos 'sanitizePublisherInput' para validar la entrada del usuario
publisherRouter.put('/:id', sanitizePublisherInput, update);

// Ruta para actualizar parcialmente un editor existente por su ID
// También utilizamos 'sanitizePublisherInput' para validar la entrada del usuario
publisherRouter.patch('/:id', sanitizePublisherInput, update);

publisherRouter.delete('/:id', remove);
