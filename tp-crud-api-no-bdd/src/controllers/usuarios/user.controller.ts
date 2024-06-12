import { Router } from 'express';
import pool from '../../shared/pg-database/db';

const router = Router();

// Obtener todos los usuarios

router.get('/users', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM users');
    const users = queryResult.rows;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
});

/*
app.get('/users', async (req, res) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
});
*/

// Obtener un usuario por ID

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const queryResult = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    const user = queryResult.rows[0];
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
});
/*
app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userRepository.findOne(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
});
*/

// Crear un nuevo usuario

router.post('/users', async (req, res) => {
  const newUser = req.body;
  try {
    const queryResult = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [newUser.name, newUser.email]
    );
    const createdUser = queryResult.rows[0];
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});

/*
app.post('/users', async (req, res) => {
  const newUser = req.body;
  try {
    const createdUser = await userRepository.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});
*/

// Actualizar un usuario existente

router.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const userUpdates = req.body;
  try {
    const queryResult = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [userUpdates.name, userUpdates.email, id]
    );
    const updatedUser = queryResult.rows[0];
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
});

/*
app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const userUpdates = req.body;
  try {
    const updatedUser = await userRepository.update(id, userUpdates);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
});
*/
// Eliminar un usuario

router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const queryResult = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    const deletedUser = queryResult.rows[0];
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
});

/*
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await userRepository.delete(id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
});
*/

export default router;
