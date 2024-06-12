import express from 'express';
import { PublisherRepository } from '../../repositories/publicadores/publisher.repository.js'; // Ajusta la ruta según tu estructura de proyecto

const publisherRouter = express.Router();
const publisherRepository = new PublisherRepository();

// Obtener todos los publishers
publisherRouter.get('/', async (req, res) => {
  try {
    const publishers = await publisherRepository.findAll();
    res.status(200).json(publishers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los publishers', error });
  }
});

// Obtener un publisher por ID
publisherRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const publisher = await publisherRepository.findOne(id);
    if (publisher) {
      res.status(200).json(publisher);
    } else {
      res.status(404).json({ message: 'Publisher no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el publisher', error });
  }
});

// Crear un nuevo publisher
publisherRouter.post('/', async (req, res) => {
  const newPublisher = req.body;
  try {
    const createdPublisher = await publisherRepository.create(newPublisher);
    res.status(201).json(createdPublisher);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el publisher', error });
  }
});

// Actualizar un publisher existente
publisherRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const publisherUpdates = req.body;
  try {
    const updatedPublisher = await publisherRepository.update(
      id,
      publisherUpdates
    );
    if (updatedPublisher) {
      res.status(200).json(updatedPublisher);
    } else {
      res.status(404).json({ message: 'Publisher no encontrado' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar el publisher', error });
  }
});

// Eliminar un publisher
publisherRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPublisher = await publisherRepository.delete(id);
    if (deletedPublisher) {
      res.status(200).json(deletedPublisher);
    } else {
      res.status(404).json({ message: 'Publisher no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el publisher', error });
  }
});

export default publisherRouter;
