import * as express from "express";

var app = express();

app.use('/', (req, res) => {
    res.send('Inicia');
});

app.listen(3000, () => {
    console.log("Server running")
});