const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let dados = [];

app.get('/dados', (req, res) => {
    res.json(dados);
});

app.post('/dados', (req, res) => {
    dados.push(req.body);
    res.status(201).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
