import * as express from "express";
import { foroRouter } from './routes/foros/foro.routes';

var app = express();

app.use(express.json())

app.use('/api/foros', foroRouter);

app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
})

app.listen(3000, () => {
    console.log("Server running")
});