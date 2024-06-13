import { Request, Response, Application } from 'express';
import express from 'express';
import publisherRoutes from './src/routes/publicadores/publisher.routes';

var app: Application = express();
const PORT = 3000;

app.use(express.json());

// Iniciar el servidor

app.get('/', function (req: Request, res: Response) {
  res.send('Hello world');
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use('/api/v1/game_offers', publisherRoutes);

export default app;
