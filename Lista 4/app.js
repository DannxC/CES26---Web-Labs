const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

// Server static files
app.use(express.static('public'));


// Rota POST para upload de arquivo
app.post('/upload', upload.single('file'), (req, res) => {
  // O objeto `req.file` contém informações sobre o arquivo enviado
  if (req.file) {
    res.send('Arquivo salvo com sucesso.');
  } else {
    res.status(400).send('Nenhum arquivo foi enviado.');
  }
});


// Rota GET para processar dados de formulário
app.get('/get_form', (req, res) => {
  const response = {
    nome: req.query.name,
    idade: req.query.age
  };
  res.send(JSON.stringify(response));
});


// Rota GET para retornar um JSON
app.get('/get_json', (req, res) => {
  const data = {
    "nome": "Daniel",
    "idade": 24
  };
  res.json(data);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
