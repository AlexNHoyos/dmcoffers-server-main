// Importamos los tipos Request, Response y NextFunction desde Express
import { Request, Response, NextFunction } from 'express';
import { PublisherRepository } from '../../repositories/publicadores/publisher.repository.js';
import { Publisher } from '../../models/publicadores/publisher.entity.js';

// Creamos una instancia del repositorio de publicadores
const repository = new PublisherRepository();

// Middleware para limpiar y validar la entrada del usuario
function sanitizePublisherInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    publishername: req.body.publishername,
    foundation_date: req.body.foundation_date,
    dissolution_date: req.body.dissolution_date,
    status: req.body.status,
    creationtimestamp: req.body.creationtimestamp,
    creationuser: req.body.creationuser,
    modificationtimestamp: req.body.modificationtimestamp,
    modificationuser: req.body.modificationuser,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

// A continuacion defino todos los controladores

// Controlador para obtener todos los publicadores
function findAll(req: Request, res: Response) {
  // Enviamos una respuesta JSON con todos los publicadores obtenidos del repositorio
  res.json({ data: repository.findAll() });
}

// Controlador para obtener un publicador por su ID
function findOne(req: Request, res: Response) {
  // Obtenemos el ID del parámetro de la solicitud
  const id = req.params.id;
  // Buscamos el publicador por su ID en el repositorio
  const publisher = repository.findOne({ id });
  if (!publisher) {
    // Si no se encuentra el publicador, enviamos una respuesta con estado 404
    return res.status(404).send({ message: 'Publisher no encontrado' });
  }
  // Enviamos una respuesta JSON con el publicador encontrado
  res.json({ data: publisher });
}

// Controlador para agregar un nuevo publicador
function add(req: Request, res: Response) {
  // Obtenemos los datos del publicador del cuerpo de la solicitud
  const input = req.body.sanitizedInput;
  // Creamos una nueva instancia de Publisher con los datos del cuerpo de la solicitud
  const publisherInput = new Publisher(
    input.id,
    input.publishername,
    input.foundation_date,
    input.dissolution_date,
    input.status,
    input.creationtimestamp,
    input.creationuser,
    input.modificationtimestamp,
    input.modificationuser
  );

  // Agregamos el nuevo editor al repositorio
  const publisher = repository.add(publisherInput);
  // Enviamos una respuesta con estado 201 y el publicador creado
  return res.status(201).send({ message: 'Publisher creado', data: publisher });
}

// Controlador para actualizar un publicador existente
function update(req: Request, res: Response) {
  // Asignamos el ID del publicador al objeto 'sanitizedInput' en el cuerpo de la solicitud
  req.body.sanitizedInput.id = req.params.id;

  // Actualizamos el publicador en el repositorio
  const publisher = repository.update(req.body.sanitizedInput);

  // Si no se encuentra el publicador, enviamos una respuesta con estado 404
  if (!publisher) {
    return res.status(404).send({ message: 'Publicador no encontrado' });
  }

  // Enviamos una respuesta con estado 200 y el publicador actualizado
  return res
    .status(200)
    .send({ message: 'Publicador actualizado correctamente', data: publisher });
}

// Controlador para eliminar un publicador por su ID
function remove(req: Request, res: Response) {
  // Obtenemos el ID del parámetro de la solicitud
  const id = req.params.id;

  // Eliminamos el publicador del repositorio
  const publisher = repository.delete({ id });

  // Si no se encuentra el publicador, enviamos una respuesta con estado 404
  if (!publisher) {
    res.status(404).send({ message: 'Publicador no encontrado' });
  } else {
    // Si se encuentra y se elimina correctamente, enviamos una respuesta con estado 200
    res.status(200).send({ message: 'Publicador eliminado correctamente' });
  }
}
// Exportamos los controladores y el middleware
export { sanitizePublisherInput, findAll, findOne, add, update, remove };
