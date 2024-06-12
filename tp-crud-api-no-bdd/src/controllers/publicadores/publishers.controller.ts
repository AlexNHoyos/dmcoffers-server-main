// pubGamePublisherController.js
import express from 'express';
import pool from '../../shared/pg-database/db';

const router = express.Router();

// Obtener todos los editores de juegos
router.get('/publishers', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM pub_game_publisher');
    const publishers = queryResult.rows;
    res.status(200).json(publishers);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener los editores de juegos', error });
  }
});

// Agregar un nuevo editor de juegos
router.post('/publishers', async (req, res) => {
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
  try {
    const queryResult = await pool.query(
      'INSERT INTO pub_game_publisher (publishername, foundation_date, dissolution_date, status, creationtimestamp, creationuser, modificationtimestamp, modificationuser) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        publishername,
        foundation_date,
        dissolution_date,
        status,
        creationtimestamp,
        creationuser,
        modificationtimestamp,
        modificationuser,
      ]
    );
    const newPublisher = queryResult.rows[0];
    res.status(201).json(newPublisher);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al agregar el editor de juegos', error });
  }
});

// Otros métodos CRUD: actualizar, eliminar, etc.

export default router;
