// pubGamePublisherController.js
import { Request, Response } from 'express';
import pool from '../../shared/pg-database/db';
import * as queries from '../../queries/publisher.queries';

// Obtener todos los publicadores de juegos
const getPublishers = (req: Request, res: Response): void => {
  pool.query(queries.getPublishers, (error: Error, results: any) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Agregar un nuevo publicador de juegos
const addPublisher = (req: Request, res: Response): void => {
  const {
    publishername,
    foundation_date,
    dissolution_date,
    status,
    creationtimestamp,
    creationuser,
    modificationtimestamp,
    modificationuser,
  } = req.body;
  pool.query(
    queries.addPublisher,
    [
      publishername,
      foundation_date,
      dissolution_date,
      status,
      creationtimestamp,
      creationuser,
      modificationtimestamp,
      modificationuser,
    ],
    (error: Error, results: any) => {
      if (error) throw error;
      res.status(201).send('Publisher Created Successfully!');
    }
  );
};
// Obtener un publicador por id
const getPublisherById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPublisherById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Eliminar un publicador
const removePublisher = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);

  pool.query(queries.getPublisherById, [id], (error, results) => {
    const noPublisherFound = !results.rows.length;
    if (noPublisherFound) {
      res.send('Publisher does not exist in the database');
    }

    pool.query(queries.removePublisher, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send('Publisher removed successfully.');
    });
  });
};

export { getPublishers, addPublisher, getPublisherById, removePublisher };
