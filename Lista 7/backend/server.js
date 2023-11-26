const express = require('express');
const app = express();
const port = 3000;

// Importando o módulo cors para ajudar na comunicação entre o frontend e o backend
const cors = require('cors');
app.use(cors());


// Lista para armazenar os nomes
let nomes = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Express!');
});

// Rota para receber um nome e adicioná-lo à lista
app.post('/api/nomes', (req, res) => {
  const nome = req.body.nome;
  if (nome) {
    nomes.push(nome);
    console.log(nomes);
    res.status(201).send({ message: 'Nome adicionado com sucesso!' });
  } else {
    res.status(400).send({ message: 'Nome é necessário!' });
  }
});

// Rota para listar todos os nomes
app.get('/api/nomes', (req, res) => {
  res.json(nomes);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
