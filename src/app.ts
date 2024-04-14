import express from 'express';
import { JuegoRouter } from './routes/juegos/juego.routes.ts';

var app = express();

app.use(express.json());
app.use('/api/juegos', JuegoRouter);

/*app.use('/', (req, res) => {
    res.send('Inicia');
});

app.listen(3000, () => {
    console.log("Server running")
});*/

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
