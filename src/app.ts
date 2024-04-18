import express from 'express';
import { userRouter } from './routes/usuarios/user.routes.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);

app.use((_, res) => {
  return res.status(404).send({ message: 'Recurso no encontrado' });
});

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/');
});

