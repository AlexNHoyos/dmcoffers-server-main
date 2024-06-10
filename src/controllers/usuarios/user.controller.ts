import express from 'express';
import bodyParser from 'body-parser';
import { UserRepository } from '../../repositories/usuarios/user.repository.js'; // Ajusta la ruta según tu estructura de proyecto

const app = express();
const userRepository = new UserRepository();

app.use(bodyParser.json());

// Obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
});

// Obtener un usuario por ID
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

// Crear un nuevo usuario
app.post('/users', async (req, res) => {
    const newUser = req.body;
    try {
        const createdUser = await userRepository.create(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
});

// Actualizar un usuario existente
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

// Eliminar un usuario
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

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
